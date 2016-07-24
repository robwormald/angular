/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RUNTIME_COMPILER_FACTORY, XHR, analyzeAppProvidersForDeprecatedConfiguration } from '@angular/compiler';
import { ApplicationRef, CompilerFactory, NgModule, PLATFORM_INITIALIZER, bootstrapModule, createPlatformFactory } from '@angular/core';
import { BROWSER_PLATFORM_PROVIDERS, BrowserModule, WORKER_APP_PLATFORM_PROVIDERS, WorkerAppModule, workerUiPlatform } from '@angular/platform-browser';
import { Console, ReflectionCapabilities, reflector } from './core_private';
import { CachedXHR } from './src/xhr/xhr_cache';
import { XHRImpl } from './src/xhr/xhr_impl';
/**
 * @deprecated The compiler providers are already included in the {@link CompilerFactory} that is
 * contained the {@link browserDynamicPlatform}()`.
 */
export const BROWSER_APP_COMPILER_PROVIDERS = [];
/**
 * @experimental
 */
export const CACHED_TEMPLATE_PROVIDER = [{ provide: XHR, useClass: CachedXHR }];
function initReflector() {
    reflector.reflectionCapabilities = new ReflectionCapabilities();
}
/**
 * CompilerFactory for the browser dynamic platform
 *
 * @experimental
 */
export const BROWSER_DYNAMIC_COMPILER_FACTORY = RUNTIME_COMPILER_FACTORY.withDefaults({ providers: [{ provide: XHR, useClass: XHRImpl }] });
/**
 * Providers for the browser dynamic platform
 *
 * @experimental
 */
export const BROWSER_DYNAMIC_PLATFORM_PROVIDERS = [
    BROWSER_PLATFORM_PROVIDERS,
    { provide: CompilerFactory, useValue: BROWSER_DYNAMIC_COMPILER_FACTORY },
    { provide: PLATFORM_INITIALIZER, useValue: initReflector, multi: true },
];
/**
 * @experimental API related to bootstrapping are still under review.
 */
export const browserDynamicPlatform = createPlatformFactory('browserDynamic', BROWSER_DYNAMIC_PLATFORM_PROVIDERS);
export function bootstrap(appComponentType, customProvidersOrDynamicModule) {
    let compilerOptions;
    let providers = [];
    let declarations = [];
    let imports = [];
    let precompile = [];
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
    const deprecatedConfiguration = analyzeAppProvidersForDeprecatedConfiguration(providers);
    compilerOptions =
        CompilerFactory.mergeOptions(deprecatedConfiguration.compilerOptions, compilerOptions);
    declarations = deprecatedConfiguration.moduleDeclarations.concat(declarations);
    class DynamicModule {
    }
    /** @nocollapse */
    DynamicModule.decorators = [
        { type: NgModule, args: [{
                    providers: providers,
                    declarations: declarations.concat([appComponentType]),
                    imports: [BrowserModule, imports],
                    precompile: precompile.concat([appComponentType])
                },] },
    ];
    return bootstrapModule(DynamicModule, browserDynamicPlatform(), compilerOptions)
        .then((moduleRef) => {
        const console = moduleRef.injector.get(Console);
        deprecatedConfiguration.deprecationMessages.forEach((msg) => console.warn(msg));
        const appRef = moduleRef.injector.get(ApplicationRef);
        return appRef.bootstrap(appComponentType);
    });
}
/**
 * @deprecated Call {@link workerUiPlatform}(workerScriptUi, customProviders) instead.
 */
export function bootstrapWorkerUi(workerScriptUri, customProviders) {
    console.warn('bootstrapWorkerUi is deprecated. Call workerUiPlatform(workerScriptUi, customProviders) instead.');
    return Promise.resolve(workerUiPlatform(workerScriptUri, customProviders));
}
/**
 * @deprecated The compiler providers are already included in the {@link CompilerFactory} that is
 * contained the {@link workerAppPlatform}().
 */
const WORKER_APP_COMPILER_PROVIDERS = [];
const WORKER_APP_DYNAMIC_PLATFORM_PROVIDERS = [
    WORKER_APP_PLATFORM_PROVIDERS,
    { provide: CompilerFactory, useValue: BROWSER_DYNAMIC_COMPILER_FACTORY },
    { provide: PLATFORM_INITIALIZER, useValue: initReflector, multi: true },
];
/**
 * @experimental API related to bootstrapping are still under review.
 */
export const workerAppDynamicPlatform = createPlatformFactory('workerAppDynamic', WORKER_APP_DYNAMIC_PLATFORM_PROVIDERS);
/**
 * @deprecated Create an {@link NgModule} that includes the {@link WorkerAppModule} and use {@link
 * bootstrapModule}
 * with the {@link workerAppDynamicPlatform}() instead.
 */
export function bootstrapWorkerApp(appComponentType, customProviders) {
    console.warn('bootstrapWorkerApp is deprecated. Create an @NgModule that includes the `WorkerAppModule` and use `bootstrapModule` with the `workerAppDynamicPlatform()` instead.');
    const deprecatedConfiguration = analyzeAppProvidersForDeprecatedConfiguration(customProviders);
    const compilerOptions = CompilerFactory.mergeOptions(deprecatedConfiguration.compilerOptions);
    const declarations = [deprecatedConfiguration.moduleDeclarations.concat([appComponentType])];
    class DynamicModule {
    }
    /** @nocollapse */
    DynamicModule.decorators = [
        { type: NgModule, args: [{
                    providers: customProviders,
                    declarations: declarations,
                    imports: [WorkerAppModule],
                    precompile: [appComponentType]
                },] },
    ];
    return bootstrapModule(DynamicModule, workerAppDynamicPlatform(), compilerOptions)
        .then((moduleRef) => {
        const console = moduleRef.injector.get(Console);
        deprecatedConfiguration.deprecationMessages.forEach((msg) => console.warn(msg));
        const appRef = moduleRef.injector.get(ApplicationRef);
        return appRef.bootstrap(appComponentType);
    });
}
function normalizeArray(arr) {
    return arr ? arr : [];
}
//# sourceMappingURL=index.js.map