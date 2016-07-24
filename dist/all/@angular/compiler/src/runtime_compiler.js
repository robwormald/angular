/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var exceptions_1 = require('../src/facade/exceptions');
var lang_1 = require('../src/facade/lang');
var async_1 = require('../src/facade/async');
var compile_metadata_1 = require('./compile_metadata');
var style_compiler_1 = require('./style_compiler');
var view_compiler_1 = require('./view_compiler/view_compiler');
var ng_module_compiler_1 = require('./ng_module_compiler');
var template_parser_1 = require('./template_parser');
var directive_normalizer_1 = require('./directive_normalizer');
var metadata_resolver_1 = require('./metadata_resolver');
var config_1 = require('./config');
var ir = require('./output/output_ast');
var output_jit_1 = require('./output/output_jit');
var output_interpreter_1 = require('./output/output_interpreter');
var util_1 = require('./util');
var RuntimeCompiler = (function () {
    function RuntimeCompiler(_injector, _metadataResolver, _templateNormalizer, _templateParser, _styleCompiler, _viewCompiler, _ngModuleCompiler, _compilerConfig, _console) {
        this._injector = _injector;
        this._metadataResolver = _metadataResolver;
        this._templateNormalizer = _templateNormalizer;
        this._templateParser = _templateParser;
        this._styleCompiler = _styleCompiler;
        this._viewCompiler = _viewCompiler;
        this._ngModuleCompiler = _ngModuleCompiler;
        this._compilerConfig = _compilerConfig;
        this._console = _console;
        this._compiledTemplateCache = new Map();
        this._compiledHostTemplateCache = new Map();
        this._compiledNgModuleCache = new Map();
    }
    Object.defineProperty(RuntimeCompiler.prototype, "injector", {
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    RuntimeCompiler.prototype.compileNgModuleSync = function (moduleType, metadata) {
        if (metadata === void 0) { metadata = null; }
        return this._compileNgModuleAndComponents(moduleType, true).syncResult;
    };
    RuntimeCompiler.prototype.compileNgModuleAsync = function (moduleType, metadata) {
        if (metadata === void 0) { metadata = null; }
        return this._compileNgModuleAndComponents(moduleType, false).asyncResult;
    };
    RuntimeCompiler.prototype._compileNgModuleAndComponents = function (moduleType, isSync) {
        var componentPromise = this._compileComponents(moduleType, isSync);
        var ngModuleFactory = this._compileNgModule(moduleType);
        return new util_1.SyncAsyncResult(ngModuleFactory, componentPromise.then(function () { return ngModuleFactory; }));
    };
    RuntimeCompiler.prototype._compileNgModule = function (moduleType) {
        var _this = this;
        var ngModuleFactory = this._compiledNgModuleCache.get(moduleType);
        if (!ngModuleFactory) {
            var moduleMeta_1 = this._metadataResolver.getNgModuleMetadata(moduleType);
            var transitiveModuleMeta = moduleMeta_1.transitiveModule;
            var boundCompilerFactory = function (parentResolver) {
                return new CoreCompiler(_this, moduleMeta_1.type.runtime, parentResolver, _this._console);
            };
            // Always provide a bound Compiler and ComponentResolver
            var extraProviders = [
                this._metadataResolver.getProviderMetadata(new core_1.Provider(core_1.Compiler, {
                    useFactory: boundCompilerFactory,
                    deps: [[new core_1.OptionalMetadata(), new core_1.SkipSelfMetadata(), core_1.ComponentResolver]]
                })),
                this._metadataResolver.getProviderMetadata(new core_1.Provider(core_1.ComponentResolver, { useExisting: core_1.Compiler }))
            ];
            var compileResult = this._ngModuleCompiler.compile(moduleMeta_1, extraProviders);
            compileResult.dependencies.forEach(function (dep) {
                dep.placeholder.runtime =
                    _this._assertComponentLoaded(dep.comp.runtime, true).proxyComponentFactory;
                dep.placeholder.name = "compFactory_" + dep.comp.name;
            });
            if (lang_1.IS_DART || !this._compilerConfig.useJit) {
                ngModuleFactory =
                    output_interpreter_1.interpretStatements(compileResult.statements, compileResult.ngModuleFactoryVar);
            }
            else {
                ngModuleFactory = output_jit_1.jitStatements(moduleMeta_1.type.name + ".ngfactory.js", compileResult.statements, compileResult.ngModuleFactoryVar);
            }
            this._compiledNgModuleCache.set(moduleMeta_1.type.runtime, ngModuleFactory);
        }
        return ngModuleFactory;
    };
    /**
     * @internal
     */
    RuntimeCompiler.prototype._compileComponentInModule = function (compType, isSync, moduleType) {
        this._metadataResolver.addComponentToModule(moduleType, compType);
        var componentPromise = this._compileComponents(moduleType, isSync);
        var componentFactory = this._assertComponentLoaded(compType, true).proxyComponentFactory;
        return new util_1.SyncAsyncResult(componentFactory, componentPromise.then(function () { return componentFactory; }));
    };
    /**
     * @internal
     */
    RuntimeCompiler.prototype._compileComponents = function (mainModule, isSync) {
        var _this = this;
        var templates = new Set();
        var loadingPromises = [];
        var ngModule = this._metadataResolver.getNgModuleMetadata(mainModule);
        ngModule.transitiveModule.modules.forEach(function (localModuleMeta) {
            localModuleMeta.declaredDirectives.forEach(function (dirMeta) {
                if (dirMeta.isComponent) {
                    var template = _this._createCompiledTemplate(dirMeta, localModuleMeta.transitiveModule.directives, localModuleMeta.transitiveModule.pipes);
                    if (!templates.has(template)) {
                        templates.add(template);
                    }
                    dirMeta.precompile.forEach(function (precompileType) {
                        var template = _this._createCompiledHostTemplate(precompileType.runtime);
                        if (!templates.has(template)) {
                            templates.add(template);
                        }
                    });
                }
            });
            localModuleMeta.precompile.forEach(function (precompileType) {
                var template = _this._createCompiledHostTemplate(precompileType.runtime);
                if (!templates.has(template)) {
                    templates.add(template);
                }
            });
        });
        templates.forEach(function (template) {
            if (template.loading) {
                if (isSync) {
                    throw new core_1.ComponentStillLoadingError(template.compType.runtime);
                }
                else {
                    loadingPromises.push(template.loading);
                }
            }
        });
        var compile = function () { templates.forEach(function (template) { _this._compileTemplate(template); }); };
        if (isSync) {
            compile();
            return Promise.resolve(null);
        }
        else {
            return Promise.all(loadingPromises).then(compile);
        }
    };
    RuntimeCompiler.prototype.clearCacheFor = function (type) {
        this._compiledNgModuleCache.delete(type);
        this._metadataResolver.clearCacheFor(type);
        this._compiledHostTemplateCache.delete(type);
        var compiledTemplate = this._compiledTemplateCache.get(type);
        if (compiledTemplate) {
            this._templateNormalizer.clearCacheFor(compiledTemplate.normalizedCompMeta);
            this._compiledTemplateCache.delete(type);
        }
    };
    RuntimeCompiler.prototype.clearCache = function () {
        this._metadataResolver.clearCache();
        this._compiledTemplateCache.clear();
        this._compiledHostTemplateCache.clear();
        this._templateNormalizer.clearCache();
        this._compiledNgModuleCache.clear();
    };
    RuntimeCompiler.prototype._createCompiledHostTemplate = function (compType) {
        var compiledTemplate = this._compiledHostTemplateCache.get(compType);
        if (lang_1.isBlank(compiledTemplate)) {
            var compMeta = this._metadataResolver.getDirectiveMetadata(compType);
            assertComponent(compMeta);
            var hostMeta = compile_metadata_1.createHostComponentMeta(compMeta);
            compiledTemplate = new CompiledTemplate(true, compMeta.selector, compMeta.type, [compMeta], [], this._templateNormalizer.normalizeDirective(hostMeta));
            this._compiledHostTemplateCache.set(compType, compiledTemplate);
        }
        return compiledTemplate;
    };
    RuntimeCompiler.prototype._createCompiledTemplate = function (compMeta, directives, pipes) {
        var compiledTemplate = this._compiledTemplateCache.get(compMeta.type.runtime);
        if (lang_1.isBlank(compiledTemplate)) {
            assertComponent(compMeta);
            compiledTemplate = new CompiledTemplate(false, compMeta.selector, compMeta.type, directives, pipes, this._templateNormalizer.normalizeDirective(compMeta));
            this._compiledTemplateCache.set(compMeta.type.runtime, compiledTemplate);
        }
        return compiledTemplate;
    };
    RuntimeCompiler.prototype._assertComponentLoaded = function (compType, isHost) {
        var compiledTemplate = isHost ? this._compiledHostTemplateCache.get(compType) :
            this._compiledTemplateCache.get(compType);
        if (!compiledTemplate) {
            throw new exceptions_1.BaseException("Illegal state: CompiledTemplate for " + lang_1.stringify(compType) + " (isHost: " + isHost + ") does not exist!");
        }
        if (compiledTemplate.loading) {
            throw new exceptions_1.BaseException("Illegal state: CompiledTemplate for " + lang_1.stringify(compType) + " (isHost: " + isHost + ") is still loading!");
        }
        return compiledTemplate;
    };
    RuntimeCompiler.prototype._compileTemplate = function (template) {
        var _this = this;
        if (template.isCompiled) {
            return;
        }
        var compMeta = template.normalizedCompMeta;
        var externalStylesheetsByModuleUrl = new Map();
        var stylesCompileResult = this._styleCompiler.compileComponent(compMeta);
        stylesCompileResult.externalStylesheets.forEach(function (r) { externalStylesheetsByModuleUrl.set(r.meta.moduleUrl, r); });
        this._resolveStylesCompileResult(stylesCompileResult.componentStylesheet, externalStylesheetsByModuleUrl);
        var viewCompMetas = template.viewComponentTypes.map(function (compType) { return _this._assertComponentLoaded(compType, false).normalizedCompMeta; });
        var parsedTemplate = this._templateParser.parse(compMeta, compMeta.template.template, template.viewDirectives.concat(viewCompMetas), template.viewPipes, compMeta.type.name);
        var compileResult = this._viewCompiler.compileComponent(compMeta, parsedTemplate, ir.variable(stylesCompileResult.componentStylesheet.stylesVar), template.viewPipes);
        compileResult.dependencies.forEach(function (dep) {
            var depTemplate;
            if (dep instanceof view_compiler_1.ViewFactoryDependency) {
                var vfd = dep;
                depTemplate = _this._assertComponentLoaded(vfd.comp.runtime, false);
                vfd.placeholder.runtime = depTemplate.proxyViewFactory;
                vfd.placeholder.name = "viewFactory_" + vfd.comp.name;
            }
            else if (dep instanceof view_compiler_1.ComponentFactoryDependency) {
                var cfd = dep;
                depTemplate = _this._assertComponentLoaded(cfd.comp.runtime, true);
                cfd.placeholder.runtime = depTemplate.proxyComponentFactory;
                cfd.placeholder.name = "compFactory_" + cfd.comp.name;
            }
        });
        var statements = stylesCompileResult.componentStylesheet.statements.concat(compileResult.statements);
        var factory;
        if (lang_1.IS_DART || !this._compilerConfig.useJit) {
            factory = output_interpreter_1.interpretStatements(statements, compileResult.viewFactoryVar);
        }
        else {
            factory = output_jit_1.jitStatements(template.compType.name + ".ngfactory.js", statements, compileResult.viewFactoryVar);
        }
        template.compiled(factory);
    };
    RuntimeCompiler.prototype._resolveStylesCompileResult = function (result, externalStylesheetsByModuleUrl) {
        var _this = this;
        result.dependencies.forEach(function (dep, i) {
            var nestedCompileResult = externalStylesheetsByModuleUrl.get(dep.moduleUrl);
            var nestedStylesArr = _this._resolveAndEvalStylesCompileResult(nestedCompileResult, externalStylesheetsByModuleUrl);
            dep.valuePlaceholder.runtime = nestedStylesArr;
            dep.valuePlaceholder.name = "importedStyles" + i;
        });
    };
    RuntimeCompiler.prototype._resolveAndEvalStylesCompileResult = function (result, externalStylesheetsByModuleUrl) {
        this._resolveStylesCompileResult(result, externalStylesheetsByModuleUrl);
        if (lang_1.IS_DART || !this._compilerConfig.useJit) {
            return output_interpreter_1.interpretStatements(result.statements, result.stylesVar);
        }
        else {
            return output_jit_1.jitStatements(result.meta.moduleUrl + ".css.js", result.statements, result.stylesVar);
        }
    };
    /** @nocollapse */
    RuntimeCompiler.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    RuntimeCompiler.ctorParameters = [
        { type: core_1.Injector, },
        { type: metadata_resolver_1.CompileMetadataResolver, },
        { type: directive_normalizer_1.DirectiveNormalizer, },
        { type: template_parser_1.TemplateParser, },
        { type: style_compiler_1.StyleCompiler, },
        { type: view_compiler_1.ViewCompiler, },
        { type: ng_module_compiler_1.NgModuleCompiler, },
        { type: config_1.CompilerConfig, },
        { type: core_private_1.Console, },
    ];
    return RuntimeCompiler;
}());
exports.RuntimeCompiler = RuntimeCompiler;
var CompiledTemplate = (function () {
    function CompiledTemplate(isHost, selector, compType, viewDirectivesAndComponents, viewPipes, _normalizeResult) {
        var _this = this;
        this.isHost = isHost;
        this.compType = compType;
        this.viewPipes = viewPipes;
        this._viewFactory = null;
        this.loading = null;
        this._normalizedCompMeta = null;
        this.isCompiled = false;
        this.isCompiledWithDeps = false;
        this.viewComponentTypes = [];
        this.viewDirectives = [];
        viewDirectivesAndComponents.forEach(function (dirMeta) {
            if (dirMeta.isComponent) {
                _this.viewComponentTypes.push(dirMeta.type.runtime);
            }
            else {
                _this.viewDirectives.push(dirMeta);
            }
        });
        this.proxyViewFactory = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (!_this._viewFactory) {
                throw new exceptions_1.BaseException("Illegal state: CompiledTemplate for " + lang_1.stringify(_this.compType) + " is not compiled yet!");
            }
            return _this._viewFactory.apply(null, args);
        };
        this.proxyComponentFactory = isHost ?
            new core_1.ComponentFactory(selector, this.proxyViewFactory, compType.runtime) :
            null;
        if (_normalizeResult.syncResult) {
            this._normalizedCompMeta = _normalizeResult.syncResult;
        }
        else {
            this.loading = _normalizeResult.asyncResult.then(function (normalizedCompMeta) {
                _this._normalizedCompMeta = normalizedCompMeta;
                _this.loading = null;
            });
        }
    }
    Object.defineProperty(CompiledTemplate.prototype, "normalizedCompMeta", {
        get: function () {
            if (this.loading) {
                throw new exceptions_1.BaseException("Template is still loading for " + this.compType.name + "!");
            }
            return this._normalizedCompMeta;
        },
        enumerable: true,
        configurable: true
    });
    CompiledTemplate.prototype.compiled = function (viewFactory) {
        this._viewFactory = viewFactory;
        this.isCompiled = true;
    };
    CompiledTemplate.prototype.depsCompiled = function () { this.isCompiledWithDeps = true; };
    return CompiledTemplate;
}());
function assertComponent(meta) {
    if (!meta.isComponent) {
        throw new exceptions_1.BaseException("Could not compile '" + meta.type.name + "' because it is not a component.");
    }
}
/**
 * Implements `Compiler` and `ComponentResolver` by delegating
 * to the RuntimeCompiler using a known module.
 */
var CoreCompiler = (function () {
    function CoreCompiler(_delegate, _ngModule, _parentComponentResolver, _console) {
        this._delegate = _delegate;
        this._ngModule = _ngModule;
        this._parentComponentResolver = _parentComponentResolver;
        this._console = _console;
        this._warnOnComponentResolver = true;
    }
    Object.defineProperty(CoreCompiler.prototype, "injector", {
        get: function () { return this._delegate.injector; },
        enumerable: true,
        configurable: true
    });
    CoreCompiler.prototype.resolveComponent = function (component) {
        if (lang_1.isString(component)) {
            if (this._parentComponentResolver) {
                return this._parentComponentResolver.resolveComponent(component);
            }
            else {
                return async_1.PromiseWrapper.reject(new exceptions_1.BaseException("Cannot resolve component using '" + component + "'."), null);
            }
        }
        if (this._warnOnComponentResolver) {
            this._console.warn(core_1.ComponentResolver.DynamicCompilationDeprecationMsg);
            this._warnOnComponentResolver = false;
        }
        return this.compileComponentAsync(component);
    };
    CoreCompiler.prototype.compileComponentAsync = function (compType) {
        return this._delegate._compileComponentInModule(compType, false, this._ngModule).asyncResult;
    };
    CoreCompiler.prototype.compileComponentSync = function (compType) {
        return this._delegate._compileComponentInModule(compType, true, this._ngModule).syncResult;
    };
    CoreCompiler.prototype.compileNgModuleSync = function (moduleType, metadata) {
        if (metadata === void 0) { metadata = null; }
        return this._delegate.compileNgModuleSync(moduleType, metadata);
    };
    CoreCompiler.prototype.compileNgModuleAsync = function (moduleType, metadata) {
        if (metadata === void 0) { metadata = null; }
        return this._delegate.compileNgModuleAsync(moduleType, metadata);
    };
    /**
     * Clears all caches
     */
    CoreCompiler.prototype.clearCache = function () {
        this._delegate.clearCache();
        if (this._parentComponentResolver) {
            this._parentComponentResolver.clearCache();
        }
    };
    /**
     * Clears the cache for the given component/ngModule.
     */
    CoreCompiler.prototype.clearCacheFor = function (type) { this._delegate.clearCacheFor(type); };
    return CoreCompiler;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jb21waWxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL3J1bnRpbWVfY29tcGlsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUF5TSxlQUFlLENBQUMsQ0FBQTtBQUV6Tiw2QkFBc0IsaUJBQWlCLENBQUMsQ0FBQTtBQUN4QywyQkFBNEIsMEJBQTBCLENBQUMsQ0FBQTtBQUN2RCxxQkFBd0Usb0JBQW9CLENBQUMsQ0FBQTtBQUc3RixzQkFBNkIscUJBQXFCLENBQUMsQ0FBQTtBQUNuRCxpQ0FBeUksb0JBQW9CLENBQUMsQ0FBQTtBQUU5SiwrQkFBeUUsa0JBQWtCLENBQUMsQ0FBQTtBQUM1Riw4QkFBaUcsK0JBQStCLENBQUMsQ0FBQTtBQUNqSSxtQ0FBK0Isc0JBQXNCLENBQUMsQ0FBQTtBQUN0RCxnQ0FBNkIsbUJBQW1CLENBQUMsQ0FBQTtBQUNqRCxxQ0FBa0Msd0JBQXdCLENBQUMsQ0FBQTtBQUMzRCxrQ0FBc0MscUJBQXFCLENBQUMsQ0FBQTtBQUM1RCx1QkFBNkIsVUFBVSxDQUFDLENBQUE7QUFDeEMsSUFBWSxFQUFFLFdBQU0scUJBQXFCLENBQUMsQ0FBQTtBQUMxQywyQkFBNEIscUJBQXFCLENBQUMsQ0FBQTtBQUNsRCxtQ0FBa0MsNkJBQTZCLENBQUMsQ0FBQTtBQUNoRSxxQkFBOEIsUUFBUSxDQUFDLENBQUE7QUFDdkM7SUFLRSx5QkFDWSxTQUFtQixFQUFVLGlCQUEwQyxFQUN2RSxtQkFBd0MsRUFBVSxlQUErQixFQUNqRixjQUE2QixFQUFVLGFBQTJCLEVBQ2xFLGlCQUFtQyxFQUFVLGVBQStCLEVBQzVFLFFBQWlCO1FBSmpCLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFBVSxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXlCO1FBQ3ZFLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBcUI7UUFBVSxv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