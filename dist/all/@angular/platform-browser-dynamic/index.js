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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgseUJBQTJGLG1CQUFtQixDQUFDLENBQUE7QUFDL0cscUJBQTBYLGVBQWUsQ0FBQyxDQUFBO0FBQzFZLGlDQUE2SywyQkFBMkIsQ0FBQyxDQUFBO0FBRXpNLDZCQUF5RCxnQkFBZ0IsQ0FBQyxDQUFBO0FBSTFFLDBCQUF3QixxQkFBcUIsQ0FBQyxDQUFBO0FBQzlDLHlCQUFzQixvQkFBb0IsQ0FBQyxDQUFBO0FBSTNDOzs7R0FHRztBQUNVLHNDQUE4QixHQUEyQyxFQUFFLENBQUM7QUFFekY7O0dBRUc7QUFDVSxnQ0FBd0IsR0FDakMsQ0FBQyxFQUFDLE9BQU8sRUFBRSxjQUFHLEVBQUUsUUFBUSxFQUFFLHFCQUFTLEVBQUMsQ0FBQyxDQUFDO0FBRTFDO0lBQ0Usd0JBQVMsQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLHFDQUFzQixFQUFFLENBQUM7QUFDbEUsQ0FBQztBQUVEOzs7O0dBSUc7QUFDVSx3Q0FBZ0MsR0FDekMsbUNBQXdCLENBQUMsWUFBWSxDQUFDLEVBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsY0FBRyxFQUFFLFFBQVEsRUFBRSxrQkFBTyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7QUFFNUY7Ozs7R0FJRztBQUNVLDBDQUFrQyxHQUEyQztJQUN4Riw2Q0FBMEI7SUFDMUIsRUFBQyxPQUFPLEVBQUUsc0JBQWUsRUFBRSxRQUFRLEVBQUUsd0NBQWdDLEVBQUM7SUFDdEUsRUFBQyxPQUFPLEVBQUUsMkJBQW9CLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO0NBQ3RFLENBQUM7QUFFRjs7R0FFRztBQUNVLDhCQUFzQixHQUMvQiw0QkFBcUIsQ0FB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