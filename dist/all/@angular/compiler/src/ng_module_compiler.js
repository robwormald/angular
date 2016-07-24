/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var compile_metadata_1 = require('./compile_metadata');
var lang_1 = require('./facade/lang');
var identifiers_1 = require('./identifiers');
var o = require('./output/output_ast');
var value_util_1 = require('./output/value_util');
var parse_util_1 = require('./parse_util');
var provider_parser_1 = require('./provider_parser');
var util_1 = require('./util');
var ComponentFactoryDependency = (function () {
    function ComponentFactoryDependency(comp, placeholder) {
        this.comp = comp;
        this.placeholder = placeholder;
    }
    return ComponentFactoryDependency;
}());
exports.ComponentFactoryDependency = ComponentFactoryDependency;
var NgModuleCompileResult = (function () {
    function NgModuleCompileResult(statements, ngModuleFactoryVar, dependencies) {
        this.statements = statements;
        this.ngModuleFactoryVar = ngModuleFactoryVar;
        this.dependencies = dependencies;
    }
    return NgModuleCompileResult;
}());
exports.NgModuleCompileResult = NgModuleCompileResult;
var NgModuleCompiler = (function () {
    function NgModuleCompiler() {
    }
    NgModuleCompiler.prototype.compile = function (ngModuleMeta, extraProviders) {
        var sourceFileName = lang_1.isPresent(ngModuleMeta.type.moduleUrl) ?
            "in NgModule " + ngModuleMeta.type.name + " in " + ngModuleMeta.type.moduleUrl :
            "in NgModule " + ngModuleMeta.type.name;
        var sourceFile = new parse_util_1.ParseSourceFile('', sourceFileName);
        var sourceSpan = new parse_util_1.ParseSourceSpan(new parse_util_1.ParseLocation(sourceFile, null, null, null), new parse_util_1.ParseLocation(sourceFile, null, null, null));
        var deps = [];
        var precompileComponents = ngModuleMeta.transitiveModule.precompile.map(function (precompileComp) {
            var id = new compile_metadata_1.CompileIdentifierMetadata({ name: precompileComp.name });
            deps.push(new ComponentFactoryDependency(precompileComp, id));
            return id;
        });
        var builder = new _InjectorBuilder(ngModuleMeta, precompileComponents, sourceSpan);
        var providerParser = new provider_parser_1.NgModuleProviderParser(ngModuleMeta, extraProviders, sourceSpan);
        providerParser.parse().forEach(function (provider) { return builder.addProvider(provider); });
        var injectorClass = builder.build();
        var ngModuleFactoryVar = ngModuleMeta.type.name + "NgFactory";
        var ngModuleFactoryStmt = o.variable(ngModuleFactoryVar)
            .set(o.importExpr(identifiers_1.Identifiers.NgModuleFactory)
            .instantiate([o.variable(injectorClass.name), o.importExpr(ngModuleMeta.type)], o.importType(identifiers_1.Identifiers.NgModuleFactory, [o.importType(ngModuleMeta.type)], [o.TypeModifier.Const])))
            .toDeclStmt(null, [o.StmtModifier.Final]);
        return new NgModuleCompileResult([injectorClass, ngModuleFactoryStmt], ngModuleFactoryVar, deps);
    };
    /** @nocollapse */
    NgModuleCompiler.decorators = [
        { type: core_1.Injectable },
    ];
    return NgModuleCompiler;
}());
exports.NgModuleCompiler = NgModuleCompiler;
var _InjectorBuilder = (function () {
    function _InjectorBuilder(_ngModuleMeta, _precompileComponents, _sourceSpan) {
        this._ngModuleMeta = _ngModuleMeta;
        this._precompileComponents = _precompileComponents;
        this._sourceSpan = _sourceSpan;
        this._instances = new compile_metadata_1.CompileIdentifierMap();
        this._fields = [];
        this._createStmts = [];
        this._getters = [];
    }
    _InjectorBuilder.prototype.addProvider = function (resolvedProvider) {
        var _this = this;
        var providerValueExpressions = resolvedProvider.providers.map(function (provider) { return _this._getProviderValue(provider); });
        var propName = "_" + resolvedProvider.token.name + "_" + this._instances.size;
        var instance = this._createProviderProperty(propName, resolvedProvider, providerValueExpressions, resolvedProvider.multiProvider, resolvedProvider.eager);
        this._instances.add(resolvedProvider.token, instance);
    };
    _InjectorBuilder.prototype.build = function () {
        var _this = this;
        var getMethodStmts = this._instances.keys().map(function (token) {
            var providerExpr = _this._instances.get(token);
            return new o.IfStmt(InjectMethodVars.token.identical(util_1.createDiTokenExpression(token)), [new o.ReturnStatement(providerExpr)]);
        });
        var methods = [
            new o.ClassMethod('createInternal', [], this._createStmts.concat(new o.ReturnStatement(this._instances.get(identifiers_1.identifierToken(this._ngModuleMeta.type)))), o.importType(this._ngModuleMeta.type)),
            new o.ClassMethod('getInternal', [
                new o.FnParam(InjectMethodVars.token.name, o.DYNAMIC_TYPE),
                new o.FnParam(InjectMethodVars.notFoundResult.name, o.DYNAMIC_TYPE)
            ], getMethodStmts.concat([new o.ReturnStatement(InjectMethodVars.notFoundResult)]), o.DYNAMIC_TYPE)
        ];
        var ctor = new o.ClassMethod(null, [new o.FnParam(InjectorProps.parent.name, o.importType(identifiers_1.Identifiers.Injector))], [o.SUPER_EXPR
                .callFn([
                o.variable(InjectorProps.parent.name),
                o.literalArr(this._precompileComponents.map(function (precompiledComponent) { return o.importExpr(precompiledComponent); }))
            ])
                .toStmt()]);
        var injClassName = this._ngModuleMeta.type.name + "Injector";
        return new o.ClassStmt(injClassName, o.importExpr(identifiers_1.Identifiers.NgModuleInjector, [o.importType(this._ngModuleMeta.type)]), this._fields, this._getters, ctor, methods);
    };
    _InjectorBuilder.prototype._getProviderValue = function (provider) {
        var _this = this;
        var result;
        if (lang_1.isPresent(provider.useExisting)) {
            result = this._getDependency(new compile_metadata_1.CompileDiDependencyMetadata({ token: provider.useExisting }));
        }
        else if (lang_1.isPresent(provider.useFactory)) {
            var deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useFactory.diDeps;
            var depsExpr = deps.map(function (dep) { return _this._getDependency(dep); });
            result = o.importExpr(provider.useFactory).callFn(depsExpr);
        }
        else if (lang_1.isPresent(provider.useClass)) {
            var deps = lang_1.isPresent(provider.deps) ? provider.deps : provider.useClass.diDeps;
            var depsExpr = deps.map(function (dep) { return _this._getDependency(dep); });
            result =
                o.importExpr(provider.useClass).instantiate(depsExpr, o.importType(provider.useClass));
        }
        else {
            result = value_util_1.convertValueToOutputAst(provider.useValue);
        }
        return result;
    };
    _InjectorBuilder.prototype._createProviderProperty = function (propName, provider, providerValueExpressions, isMulti, isEager) {
        var resolvedProviderValueExpr;
        var type;
        if (isMulti) {
            resolvedProviderValueExpr = o.literalArr(providerValueExpressions);
            type = new o.ArrayType(o.DYNAMIC_TYPE);
        }
        else {
            resolvedProviderValueExpr = providerValueExpressions[0];
            type = providerValueExpressions[0].type;
        }
        if (lang_1.isBlank(type)) {
            type = o.DYNAMIC_TYPE;
        }
        if (isEager) {
            this._fields.push(new o.ClassField(propName, type));
            this._createStmts.push(o.THIS_EXPR.prop(propName).set(resolvedProviderValueExpr).toStmt());
        }
        else {
            var internalField = "_" + propName;
            this._fields.push(new o.ClassField(internalField, type));
            // Note: Equals is important for JS so that it also checks the undefined case!
            var getterStmts = [
                new o.IfStmt(o.THIS_EXPR.prop(internalField).isBlank(), [o.THIS_EXPR.prop(internalField).set(resolvedProviderValueExpr).toStmt()]),
                new o.ReturnStatement(o.THIS_EXPR.prop(internalField))
            ];
            this._getters.push(new o.ClassGetter(propName, getterStmts, type));
        }
        return o.THIS_EXPR.prop(propName);
    };
    _InjectorBuilder.prototype._getDependency = function (dep) {
        var result = null;
        if (dep.isValue) {
            result = o.literal(dep.value);
        }
        if (!dep.isSkipSelf) {
            if (dep.token &&
                (dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.Injector)) ||
                    dep.token.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ComponentFactoryResolver)))) {
                result = o.THIS_EXPR;
            }
            if (lang_1.isBlank(result)) {
                result = this._instances.get(dep.token);
            }
        }
        if (lang_1.isBlank(result)) {
            var args = [util_1.createDiTokenExpression(dep.token)];
            if (dep.isOptional) {
                args.push(o.NULL_EXPR);
            }
            result = InjectorProps.parent.callMethod('get', args);
        }
        return result;
    };
    return _InjectorBuilder;
}());
var InjectorProps = (function () {
    function InjectorProps() {
    }
    InjectorProps.parent = o.THIS_EXPR.prop('parent');
    return InjectorProps;
}());
var InjectMethodVars = (function () {
    function InjectMethodVars() {
    }
    InjectMethodVars.token = o.variable('token');
    InjectMethodVars.notFoundResult = o.variable('notFoundResult');
    return InjectMethodVars;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlX2NvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci9zcmMvbmdfbW9kdWxlX2NvbXBpbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFFekMsaUNBQXdMLG9CQUFvQixDQUFDLENBQUE7QUFDN00scUJBQWlDLGVBQWUsQ0FBQyxDQUFBO0FBQ2pELDRCQUEyQyxlQUFlLENBQUMsQ0FBQTtBQUMzRCxJQUFZLENBQUMsV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBQ3pDLDJCQUFzQyxxQkFBcUIsQ0FBQyxDQUFBO0FBQzVELDJCQUE4RCxjQUFjLENBQUMsQ0FBQTtBQUM3RSxnQ0FBcUMsbUJBQW1CLENBQUMsQ0FBQTtBQUV6RCxxQkFBc0MsUUFBUSxDQUFDLENBQUE7QUFFL0M7SUFDRSxvQ0FDVyxJQUErQixFQUFTLFdBQXNDO1FBQTlFLFNBQUksR0FBSixJQUFJLENBQTJCO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQTJCO0lBQUcsQ0FBQztJQUMvRixpQ0FBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSFksa0NBQTBCLDZCQUd0QyxDQUFBO0FBRUQ7SUFDRSwrQkFDVyxVQUF5QixFQUFTLGtCQUEwQixFQUM1RCxZQUEwQztRQUQxQyxlQUFVLEdBQVYsVUFBVSxDQUFlO1FBQVMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFRO1FBQzVELGlCQUFZLEdBQVosWUFBWSxDQUE4QjtJQUFHLENBQUM7SUFDM0QsNEJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLDZCQUFxQix3QkFJakMsQ0FBQTtBQUNEO0lBQUE7SUF1Q0EsQ0FBQztJQXRDQyxrQ0FBTyxHQUFQLFVBQVEsWUFBcUMsRUFBRSxjQUF5QztRQUV0RixJQUFJLGNBQWMsR0FBRyxnQkFBUyxDQUFDLFlBQVksQ0FBQyxJ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