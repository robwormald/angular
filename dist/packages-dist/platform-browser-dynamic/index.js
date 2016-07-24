/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var compiler_1 = require('@angular/compiler');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var core_private_1 = require('./core_private');
var xhr_cache_1 = require('./src/xhr/xhr_cache');
var xhr_impl_1 = require('./src/xhr/xhr_impl');
/**
 * @deprecated The compiler providers are already included in the {@link CompilerFactory} that is
 * contained the {@link browserDynamicPlatform}()`.
 */
exports.BROWSER_APP_COMPILER_PROVIDERS = [];
/**
 * @experimental
 */
exports.CACHED_TEMPLATE_PROVIDER = [{ provide: compiler_1.XHR, useClass: xhr_cache_1.CachedXHR }];
function initReflector() {
    core_private_1.reflector.reflectionCapabilities = new core_private_1.ReflectionCapabilities();
}
/**
 * CompilerFactory for the browser dynamic platform
 *
 * @experimental
 */
exports.BROWSER_DYNAMIC_COMPILER_FACTORY = compiler_1.RUNTIME_COMPILER_FACTORY.withDefaults({ providers: [{ provide: compiler_1.XHR, useClass: xhr_impl_1.XHRImpl }] });
/**
 * Providers for the browser dynamic platform
 *
 * @experimental
 */
exports.BROWSER_DYNAMIC_PLATFORM_PROVIDERS = [
    platform_browser_1.BROWSER_PLATFORM_PROVIDERS,
    { provide: core_1.CompilerFactory, useValue: exports.BROWSER_DYNAMIC_COMPILER_FACTORY },
    { provide: core_1.PLATFORM_INITIALIZER, useValue: initReflector, multi: true },
];
/**
 * @experimental API related to bootstrapping are still under review.
 */
exports.browserDynamicPlatform = core_1.createPlatformFactory('browserDynamic', exports.BROWSER_DYNAMIC_PLATFORM_PROVIDERS);
function bootstrap(appComponentType, customProvidersOrDynamicModule) {
    var compilerOptions;
    var providers = [];
    var declarations = [];
    var imports = [];
    var precompile = [];
    if (customProvidersOrDynamicModule instanceof Array) {
        providers = customProvidersOrDynamicModule;
    }
    else if (customProvidersOrDynamicModule) {
        providers = normalizeArray(customProvidersOrDynamicModule.providers);
        declarations = normalizeArray(customProvidersOrDynamicModule.declarations);
        imports = normalizeArray(customProvidersOrDynamicModule.imports);
        precompile = normalizeArray(customProvidersOrDynamicModule.precompile);
        compilerOptions = customProvidersOrDynamicModule.compilerOptions;
    }
    var deprecatedConfiguration = compiler_1.analyzeAppProvidersForDeprecatedConfiguration(providers);
    compilerOptions =
        core_1.CompilerFactory.mergeOptions(deprecatedConfiguration.compilerOptions, compilerOptions);
    declarations = deprecatedConfiguration.moduleDeclarations.concat(declarations);
    var DynamicModule = (function () {
        function DynamicModule() {
        }
        /** @nocollapse */
        DynamicModule.decorators = [
            { type: core_1.NgModule, args: [{
                        providers: providers,
                        declarations: declarations.concat([appComponentType]),
                        imports: [platform_browser_1.BrowserModule, imports],
                        precompile: precompile.concat([appComponentType])
                    },] },
        ];
        return DynamicModule;
    }());
    return core_1.bootstrapModule(DynamicModule, exports.browserDynamicPlatform(), compilerOptions)
        .then(function (moduleRef) {
        var console = moduleRef.injector.get(core_private_1.Console);
        deprecatedConfiguration.deprecationMessages.forEach(function (msg) { return console.warn(msg); });
        var appRef = moduleRef.injector.get(core_1.ApplicationRef);
        return appRef.bootstrap(appComponentType);
    });
}
exports.bootstrap = bootstrap;
/**
 * @deprecated Call {@link workerUiPlatform}(workerScriptUi, customProviders) instead.
 */
function bootstrapWorkerUi(workerScriptUri, customProviders) {
    console.warn('bootstrapWorkerUi is deprecated. Call workerUiPlatform(workerScriptUi, customProviders) instead.');
    return Promise.resolve(platform_browser_1.workerUiPlatform(workerScriptUri, customProviders));
}
exports.bootstrapWorkerUi = bootstrapWorkerUi;
/**
 * @deprecated The compiler providers are already included in the {@link CompilerFactory} that is
 * contained the {@link workerAppPlatform}().
 */
var WORKER_APP_COMPILER_PROVIDERS = [];
var WORKER_APP_DYNAMIC_PLATFORM_PROVIDERS = [
    platform_browser_1.WORKER_APP_PLATFORM_PROVIDERS,
    { provide: core_1.CompilerFactory, useValue: exports.BROWSER_DYNAMIC_COMPILER_FACTORY },
    { provide: core_1.PLATFORM_INITIALIZER, useValue: initReflector, multi: true },
];
/**
 * @experimental API related to bootstrapping are still under review.
 */
exports.workerAppDynamicPlatform = core_1.createPlatformFactory('workerAppDynamic', WORKER_APP_DYNAMIC_PLATFORM_PROVIDERS);
/**
 * @deprecated Create an {@link NgModule} that includes the {@link WorkerAppModule} and use {@link
 * bootstrapModule}
 * with the {@link workerAppDynamicPlatform}() instead.
 */
function bootstrapWorkerApp(appComponentType, customProviders) {
    console.warn('bootstrapWorkerApp is deprecated. Create an @NgModule that includes the `WorkerAppModule` and use `bootstrapModule` with the `workerAppDynamicPlatform()` instead.');
    var deprecatedConfiguration = compiler_1.analyzeAppProvidersForDeprecatedConfiguration(customProviders);
    var compilerOptions = core_1.CompilerFactory.mergeOptions(deprecatedConfiguration.compilerOptions);
    var declarations = [deprecatedConfiguration.moduleDeclarations.concat([appComponentType])];
    var DynamicModule = (function () {
        function DynamicModule() {
        }
        /** @nocollapse */
        DynamicModule.decorators = [
            { type: core_1.NgModule, args: [{
                        providers: customProviders,
                        declarations: declarations,
                        imports: [platform_browser_1.WorkerAppModule],
                        precompile: [appComponentType]
                    },] },
        ];
        return DynamicModule;
    }());
    return core_1.bootstrapModule(DynamicModule, exports.workerAppDynamicPlatform(), compilerOptions)
        .then(function (moduleRef) {
        var console = moduleRef.injector.get(core_private_1.Console);
        deprecatedConfiguration.deprecationMessages.forEach(function (msg) { return console.warn(msg); });
        var appRef = moduleRef.injector.get(core_1.ApplicationRef);
        return appRef.bootstrap(appComponentType);
    });
}
exports.bootstrapWorkerApp = bootstrapWorkerApp;
function normalizeArray(arr) {
    return arr ? arr : [];
}
//# sourceMappingURL=index.js.map