/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
__export(require('./template_ast'));
var template_parser_1 = require('./template_parser');
exports.TEMPLATE_TRANSFORMS = template_parser_1.TEMPLATE_TRANSFORMS;
var config_1 = require('./config');
exports.CompilerConfig = config_1.CompilerConfig;
exports.RenderTypes = config_1.RenderTypes;
__export(require('./compile_metadata'));
__export(require('./offline_compiler'));
var runtime_compiler_1 = require('./runtime_compiler');
exports.RuntimeCompiler = runtime_compiler_1.RuntimeCompiler;
__export(require('./url_resolver'));
__export(require('./xhr'));
var view_resolver_1 = require('./view_resolver');
exports.ViewResolver = view_resolver_1.ViewResolver;
var directive_resolver_1 = require('./directive_resolver');
exports.DirectiveResolver = directive_resolver_1.DirectiveResolver;
var pipe_resolver_1 = require('./pipe_resolver');
exports.PipeResolver = pipe_resolver_1.PipeResolver;
var ng_module_resolver_1 = require('./ng_module_resolver');
exports.NgModuleResolver = ng_module_resolver_1.NgModuleResolver;
var lang_1 = require('./facade/lang');
var collection_1 = require('./facade/collection');
var template_parser_2 = require('./template_parser');
var html_parser_1 = require('./html_parser');
var directive_normalizer_1 = require('./directive_normalizer');
var metadata_resolver_1 = require('./metadata_resolver');
var style_compiler_1 = require('./style_compiler');
var view_compiler_1 = require('./view_compiler/view_compiler');
var ng_module_compiler_1 = require('./ng_module_compiler');
var config_2 = require('./config');
var runtime_compiler_2 = require('./runtime_compiler');
var element_schema_registry_1 = require('./schema/element_schema_registry');
var dom_element_schema_registry_1 = require('./schema/dom_element_schema_registry');
var url_resolver_2 = require('./url_resolver');
var parser_1 = require('./expression_parser/parser');
var lexer_1 = require('./expression_parser/lexer');
var view_resolver_2 = require('./view_resolver');
var directive_resolver_2 = require('./directive_resolver');
var pipe_resolver_2 = require('./pipe_resolver');
var ng_module_resolver_2 = require('./ng_module_resolver');
var core_private_1 = require('../core_private');
var xhr_2 = require('./xhr');
/**
 * A set of providers that provide `RuntimeCompiler` and its dependencies to use for
 * template compilation.
 */
exports.COMPILER_PROVIDERS = 
/*@ts2dart_const*/ [
    { provide: core_private_1.Reflector, useValue: core_private_1.reflector },
    { provide: core_private_1.ReflectorReader, useExisting: core_private_1.Reflector },
    core_private_1.Console,
    lexer_1.Lexer,
    parser_1.Parser,
    html_parser_1.HtmlParser,
    template_parser_2.TemplateParser,
    directive_normalizer_1.DirectiveNormalizer,
    metadata_resolver_1.CompileMetadataResolver,
    url_resolver_2.DEFAULT_PACKAGE_URL_PROVIDER,
    style_compiler_1.StyleCompiler,
    view_compiler_1.ViewCompiler,
    ng_module_compiler_1.NgModuleCompiler,
    /*@ts2dart_Provider*/ { provide: config_2.CompilerConfig, useValue: new config_2.CompilerConfig() },
    runtime_compiler_2.RuntimeCompiler,
    /*@ts2dart_Provider*/ { provide: core_1.ComponentResolver, useExisting: runtime_compiler_2.RuntimeCompiler },
    /*@ts2dart_Provider*/ { provide: core_1.Compiler, useExisting: runtime_compiler_2.RuntimeCompiler },
    dom_element_schema_registry_1.DomElementSchemaRegistry,
    /*@ts2dart_Provider*/ { provide: element_schema_registry_1.ElementSchemaRegistry, useExisting: dom_element_schema_registry_1.DomElementSchemaRegistry },
    url_resolver_2.UrlResolver,
    view_resolver_2.ViewResolver,
    directive_resolver_2.DirectiveResolver,
    pipe_resolver_2.PipeResolver,
    ng_module_resolver_2.NgModuleResolver
];
function analyzeAppProvidersForDeprecatedConfiguration(appProviders) {
    if (appProviders === void 0) { appProviders = []; }
    var platformDirectives = [];
    var platformPipes = [];
    var compilerProviders = [];
    var useDebug;
    var useJit;
    var defaultEncapsulation;
    var deprecationMessages = [];
    // Note: This is a hack to still support the old way
    // of configuring platform directives / pipes and the compiler xhr.
    // This will soon be deprecated!
    var tempInj = core_1.ReflectiveInjector.resolveAndCreate(appProviders);
    var compilerConfig = tempInj.get(config_2.CompilerConfig, null);
    if (compilerConfig) {
        platformDirectives = compilerConfig.platformDirectives;
        platformPipes = compilerConfig.platformPipes;
        useJit = compilerConfig.useJit;
        useDebug = compilerConfig.genDebugInfo;
        defaultEncapsulation = compilerConfig.defaultEncapsulation;
        deprecationMessages.push("Passing CompilerConfig as a regular provider is deprecated. Use the \"compilerOptions\" parameter of \"bootstrap()\" or use a custom \"CompilerFactory\" platform provider instead.");
    }
    else {
        // If nobody provided a CompilerConfig, use the
        // PLATFORM_DIRECTIVES / PLATFORM_PIPES values directly if existing
        platformDirectives = tempInj.get(core_1.PLATFORM_DIRECTIVES, []);
        platformPipes = tempInj.get(core_1.PLATFORM_PIPES, []);
    }
    platformDirectives = collection_1.ListWrapper.flatten(platformDirectives);
    platformPipes = collection_1.ListWrapper.flatten(platformPipes);
    var xhr = tempInj.get(xhr_2.XHR, null);
    if (xhr) {
        compilerProviders.push([{ provide: xhr_2.XHR, useValue: xhr }]);
        deprecationMessages.push("Passing XHR as regular provider is deprecated. Pass the provider via \"compilerOptions\" instead.");
    }
    if (platformDirectives.length > 0) {
        deprecationMessages.push("The PLATFORM_DIRECTIVES provider and CompilerConfig.platformDirectives is deprecated. Add the directives to an NgModule instead! " +
            ("(Directives: " + platformDirectives.map(function (type) { return lang_1.stringify(type); }) + ")"));
    }
    if (platformPipes.length > 0) {
        deprecationMessages.push("The PLATFORM_PIPES provider and CompilerConfig.platformPipes is deprecated. Add the pipes to an NgModule instead! " +
            ("(Pipes: " + platformPipes.map(function (type) { return lang_1.stringify(type); }) + ")"));
    }
    var compilerOptions = {
        useJit: useJit,
        useDebug: useDebug,
        defaultEncapsulation: defaultEncapsulation,
        providers: compilerProviders
    };
    var DynamicComponent = (function () {
        function DynamicComponent() {
        }
        /** @nocollapse */
        DynamicComponent.decorators = [
            { type: core_1.Component, args: [{ directives: platformDirectives, pipes: platformPipes, template: '' },] },
        ];
        return DynamicComponent;
    }());
    return {
        compilerOptions: compilerOptions,
        moduleDeclarations: [DynamicComponent],
        deprecationMessages: deprecationMessages
    };
}
exports.analyzeAppProvidersForDeprecatedConfiguration = analyzeAppProvidersForDeprecatedConfiguration;
var _RuntimeCompilerFactory = (function (_super) {
    __extends(_RuntimeCompilerFactory, _super);
    function _RuntimeCompilerFactory() {
        _super.apply(this, arguments);
    }
    _RuntimeCompilerFactory.prototype.createCompiler = function (options) {
        var injector = core_1.ReflectiveInjector.resolveAndCreate([
            exports.COMPILER_PROVIDERS, {
                provide: config_2.CompilerConfig,
                useFactory: function () {
                    return new config_2.CompilerConfig({
                        // let explicit values from the compiler options overwrite options
                        // from the app providers. E.g. important for the testing platform.
                        genDebugInfo: _firstDefined(options.useDebug, core_1.isDevMode()),
                        // let explicit values from the compiler options overwrite options
                        // from the app providers
                        useJit: _firstDefined(options.useJit, true),
                        // let explicit values from the compiler options overwrite options
                        // from the app providers
                        defaultEncapsulation: _firstDefined(options.defaultEncapsulation, core_1.ViewEncapsulation.Emulated),
                        logBindingUpdate: _firstDefined(options.useDebug, core_1.isDevMode())
                    });
                },
                deps: []
            },
            // options.providers will always contain a provider for XHR as well
            // (added by platforms). So allow compilerProviders to overwrite this
            options.providers ? options.providers : []
        ]);
        return injector.get(core_1.Compiler);
    };
    /** @nocollapse */
    _RuntimeCompilerFactory.decorators = [
        { type: core_1.Injectable },
    ];
    return _RuntimeCompilerFactory;
}(core_1.CompilerFactory));
exports._RuntimeCompilerFactory = _RuntimeCompilerFactory;
exports.RUNTIME_COMPILER_FACTORY = new _RuntimeCompilerFactory();
function _firstDefined() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    for (var i = 0; i < args.length; i++) {
        if (args[i] !== undefined) {
            return args[i];
        }
    }
    return undefined;
}
function _mergeArrays() {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i - 0] = arguments[_i];
    }
    var result = [];
    parts.forEach(function (part) { return result.push.apply(result, part); });
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7QUFFSCxxQkFBK1AsZUFBZSxDQUFDLENBQUE7QUFFL1EsaUJBQWMsZ0JBQWdCLENBQUMsRUFBQTtBQUMvQixnQ0FBa0MsbUJBQW1CLENBQUM7QUFBOUMsb0VBQThDO0FBQ3RELHVCQUEwQyxVQUFVLENBQUM7QUFBN0MsaURBQWM7QUFBRSwyQ0FBNkI7QUFDckQsaUJBQWMsb0JBQW9CLENBQUMsRUFBQTtBQUNuQyxpQkFBYyxvQkFBb0IsQ0FBQyxFQUFBO0FBQ25DLGlDQUE4QixvQkFBb0IsQ0FBQztBQUEzQyw2REFBMkM7QUFDbkQsaUJBQWMsZ0JBQWdCLENBQUMsRUFBQTtBQUMvQixpQkFBYyxPQUFPLENBQUMsRUFBQTtBQUV0Qiw4QkFBMkIsaUJBQWlCLENBQUM7QUFBckMsb0RBQXFDO0FBQzdDLG1DQUFnQyxzQkFBc0IsQ0FBQztBQUEvQyxtRUFBK0M7QUFDdkQsOEJBQTJCLGlCQUFpQixDQUFDO0FBQXJDLG9EQUFxQztBQUM3QyxtQ0FBK0Isc0JBQXNCLENBQUM7QUFBOUMsaUVBQThDO0FBRXRELHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4QywyQkFBMEIscUJBQXFCLENBQUMsQ0FBQTtBQUNoRCxnQ0FBNkIsbUJBQW1CLENBQUMsQ0FBQTtBQUNqRCw0QkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMscUNBQWtDLHdCQUF3QixDQUFDLENBQUE7QUFDM0Qsa0NBQXNDLHFCQUFxQixDQUFDLENBQUE7QUFDNUQsK0JBQTRCLGtCQUFrQixDQUFDLENBQUE7QUFDL0MsOEJBQTJCLCtCQUErQixDQUFDLENBQUE7QUFDM0QsbUNBQStCLHNCQUFzQixDQUFDLENBQUE7QUFDdEQsdUJBQTZCLFVBQVUsQ0FB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