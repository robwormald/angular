/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var compile_metadata_1 = require('./compile_metadata');
var collection_1 = require('./facade/collection');
var exceptions_1 = require('./facade/exceptions');
var identifiers_1 = require('./identifiers');
var o = require('./output/output_ast');
var view_compiler_1 = require('./view_compiler/view_compiler');
var SourceModule = (function () {
    function SourceModule(moduleUrl, source) {
        this.moduleUrl = moduleUrl;
        this.source = source;
    }
    return SourceModule;
}());
exports.SourceModule = SourceModule;
var NgModulesSummary = (function () {
    function NgModulesSummary(ngModuleByComponent) {
        this.ngModuleByComponent = ngModuleByComponent;
    }
    return NgModulesSummary;
}());
exports.NgModulesSummary = NgModulesSummary;
var OfflineCompiler = (function () {
    function OfflineCompiler(_metadataResolver, _directiveNormalizer, _templateParser, _styleCompiler, _viewCompiler, _ngModuleCompiler, _outputEmitter) {
        this._metadataResolver = _metadataResolver;
        this._directiveNormalizer = _directiveNormalizer;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._ngModuleCompiler = _ngModuleCompiler;
        this._outputEmitter = _outputEmitter;
    }
    OfflineCompiler.prototype.analyzeModules = function (ngModules) {
        var _this = this;
        var ngModuleByComponent = new Map();
        ngModules.forEach(function (ngModule) {
            var ngModuleMeta = _this._metadataResolver.getNgModuleMetadata(ngModule);
            ngModuleMeta.declaredDirectives.forEach(function (dirMeta) {
                if (dirMeta.isComponent) {
                    ngModuleByComponent.set(dirMeta.type.runtime, ngModuleMeta);
                }
            });
            ngModuleMeta.exportedDirectives.forEach(function (dirMeta) {
                if (dirMeta.isComponent) {
                    ngModuleByComponent.set(dirMeta.type.runtime, ngModuleMeta);
                }
            });
        });
        return new NgModulesSummary(ngModuleByComponent);
    };
    OfflineCompiler.prototype.clearCache = function () {
        this._directiveNormalizer.clearCache();
        this._metadataResolver.clearCache();
    };
    OfflineCompiler.prototype.compile = function (moduleUrl, ngModulesSummary, components, ngModules) {
        var _this = this;
        var fileSuffix = _splitLastSuffix(moduleUrl)[1];
        var statements = [];
        var exportedVars = [];
        var outputSourceModules = [];
        // compile all ng modules
        exportedVars.push.apply(exportedVars, ngModules.map(function (ngModuleType) { return _this._compileNgModule(ngModuleType, statements); }));
        // compile components
        return Promise
            .all(components.map(function (compType) {
            var compMeta = _this._metadataResolver.getDirectiveMetadata(compType);
            var ngModule = ngModulesSummary.ngModuleByComponent.get(compType);
            if (!ngModule) {
                throw new exceptions_1.BaseException("Cannot determine the module for component " + compMeta.type.name + "!");
            }
            return Promise
                .all([compMeta].concat(ngModule.transitiveModule.directives).map(function (dirMeta) { return _this._directiveNormalizer.normalizeDirective(dirMeta).asyncResult; }))
                .then(function (normalizedCompWithDirectives) {
                var compMeta = normalizedCompWithDirectives[0];
                var dirMetas = normalizedCompWithDirectives.slice(1);
                _assertComponent(compMeta);
                // compile styles
                var stylesCompileResults = _this._styleCompiler.compileComponent(compMeta);
                stylesCompileResults.externalStylesheets.forEach(function (compiledStyleSheet) {
                    outputSourceModules.push(_this._codgenStyles(compiledStyleSheet, fileSuffix));
                });
                // compile components
                exportedVars.push(_this._compileComponentFactory(compMeta, fileSuffix, statements));
                exportedVars.push(_this._compileComponent(compMeta, dirMetas, ngModule.transitiveModule.pipes, stylesCompileResults.componentStylesheet, fileSuffix, statements));
            });
        }))
            .then(function () {
            if (statements.length > 0) {
                outputSourceModules.unshift(_this._codegenSourceModule(_ngfactoryModuleUrl(moduleUrl), statements, exportedVars));
            }
            return outputSourceModules;
        });
    };
    OfflineCompiler.prototype._compileNgModule = function (ngModuleType, targetStatements) {
        var ngModule = this._metadataResolver.getNgModuleMetadata(ngModuleType);
        var appCompileResult = this._ngModuleCompiler.compile(ngModule, []);
        appCompileResult.dependencies.forEach(function (dep) {
            dep.placeholder.name = _componentFactoryName(dep.comp);
            dep.placeholder.moduleUrl = _ngfactoryModuleUrl(dep.comp.moduleUrl);
        });
        targetStatements.push.apply(targetStatements, appCompileResult.statements);
        return appCompileResult.ngModuleFactoryVar;
    };
    OfflineCompiler.prototype._compileComponentFactory = function (compMeta, fileSuffix, targetStatements) {
        var hostMeta = compile_metadata_1.createHostComponentMeta(compMeta);
        var hostViewFactoryVar = this._compileComponent(hostMeta, [compMeta], [], null, fileSuffix, targetStatements);
        var compFactoryVar = _componentFactoryName(compMeta.type);
        targetStatements.push(o.variable(compFactoryVar)
            .set(o.importExpr(identifiers_1.Identifiers.ComponentFactory, [o.importType(compMeta.type)])
            .instantiate([
            o.literal(compMeta.selector), o.variable(hostViewFactoryVar),
            o.importExpr(compMeta.type)
        ], o.importType(identifiers_1.Identifiers.ComponentFactory, [o.importType(compMeta.type)], [o.TypeModifier.Const])))
            .toDeclStmt(null, [o.StmtModifier.Final]));
        return compFactoryVar;
    };
    OfflineCompiler.prototype._compileComponent = function (compMeta, directives, pipes, componentStyles, fileSuffix, targetStatements) {
        var parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, directives, pipes, compMeta.type.name);
        var stylesExpr = componentStyles ? o.variable(componentStyles.stylesVar) : o.literalArr([]);
        var viewResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, stylesExpr, pipes);
        if (componentStyles) {
            collection_1.ListWrapper.addAll(targetStatements, _resolveStyleStatements(componentStyles, fileSuffix));
        }
        collection_1.ListWrapper.addAll(targetStatements, _resolveViewStatements(viewResult));
        return viewResult.viewFactoryVar;
    };
    OfflineCompiler.prototype._codgenStyles = function (stylesCompileResult, fileSuffix) {
        _resolveStyleStatements(stylesCompileResult, fileSuffix);
        return this._codegenSourceModule(_stylesModuleUrl(stylesCompileResult.meta.moduleUrl, stylesCompileResult.isShimmed, fileSuffix), stylesCompileResult.statements, [stylesCompileResult.stylesVar]);
    };
    OfflineCompiler.prototype._codegenSourceModule = function (moduleUrl, statements, exportedVars) {
        return new SourceModule(moduleUrl, this._outputEmitter.emitStatements(moduleUrl, statements, exportedVars));
    };
    return OfflineCompiler;
}());
exports.OfflineCompiler = OfflineCompiler;
function _resolveViewStatements(compileResult) {
    compileResult.dependencies.forEach(function (dep) {
        if (dep instanceof view_compiler_1.ViewFactoryDependency) {
            var vfd = dep;
            vfd.placeholder.moduleUrl = _ngfactoryModuleUrl(vfd.comp.moduleUrl);
        }
        else if (dep instanceof view_compiler_1.ComponentFactoryDependency) {
            var cfd = dep;
            cfd.placeholder.name = _componentFactoryName(cfd.comp);
            cfd.placeholder.moduleUrl = _ngfactoryModuleUrl(cfd.comp.moduleUrl);
        }
    });
    return compileResult.statements;
}
function _resolveStyleStatements(compileResult, fileSuffix) {
    compileResult.dependencies.forEach(function (dep) {
        dep.valuePlaceholder.moduleUrl = _stylesModuleUrl(dep.moduleUrl, dep.isShimmed, fileSuffix);
    });
    return compileResult.statements;
}
function _ngfactoryModuleUrl(compUrl) {
    var urlWithSuffix = _splitLastSuffix(compUrl);
    return urlWithSuffix[0] + ".ngfactory" + urlWithSuffix[1];
}
function _componentFactoryName(comp) {
    return comp.name + "NgFactory";
}
function _stylesModuleUrl(stylesheetUrl, shim, suffix) {
    return shim ? stylesheetUrl + ".shim" + suffix : "" + stylesheetUrl + suffix;
}
function _assertComponent(meta) {
    if (!meta.isComponent) {
        throw new exceptions_1.BaseException("Could not compile '" + meta.type.name + "' because it is not a component.");
    }
}
function _splitLastSuffix(path) {
    var lastDot = path.lastIndexOf('.');
    if (lastDot !== -1) {
        return [path.substring(0, lastDot), path.substring(lastDot)];
    }
    else {
        return [path, ''];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmbGluZV9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL29mZmxpbmVfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUF1SixvQkFBb0IsQ0FBQyxDQUFBO0FBRTVLLDJCQUEwQixxQkFBcUIsQ0FBQyxDQUFBO0FBQ2hELDJCQUE0QixxQkFBcUIsQ0FBQyxDQUFBO0FBQ2xELDRCQUEwQixlQUFlLENBQUMsQ0FBQTtBQUkxQyxJQUFZLENBQUMsV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBR3pDLDhCQUFpRywrQkFBK0IsQ0FBQyxDQUFBO0FBRWpJO0lBQ0Usc0JBQW1CLFNBQWlCLEVBQVMsTUFBYztRQUF4QyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtJQUFHLENBQUM7SUFDakUsbUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLG9CQUFZLGVBRXhCLENBQUE7QUFFRDtJQUNFLDBCQUFtQixtQkFBK0Q7UUFBL0Qsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUE0QztJQUFHLENBQUM7SUFDeEYsdUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLHdCQUFnQixtQkFFNUIsQ0FBQTtBQUVEO0lBQ0UseUJBQ1ksaUJBQTBDLEVBQzFDLG9CQUF5QyxFQUFVLGVBQStCLEVBQ2xGLGNBQTZCLEVBQVUsYUFBMkIsRUFDbEUsaUJBQW1DLEVBQVUsY0FBNkI7UUFIMUUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUF5QjtRQUMxQyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO1FBQVUsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQ2xGLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQVUsa0JBQWEsR0FBYixhQUFhLENBQWM7UUFDbEUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFr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