/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { PlatformLocation } from '@angular/common';
import { analyzeAppProvidersForDeprecatedConfiguration } from '@angular/compiler';
import { ApplicationRef, CompilerFactory, NgModule, PLATFORM_CORE_PROVIDERS, PLATFORM_INITIALIZER, bootstrapModule, createPlatformFactory } from '@angular/core';
import { BROWSER_DYNAMIC_TEST_COMPILER_FACTORY, BrowserDynamicTestModule } from '@angular/platform-browser-dynamic/testing';
import { Console, ReflectionCapabilities, reflector, wtfInit } from '../core_private';
import { Parse5DomAdapter } from './parse5_adapter';
function notSupported(feature) {
    throw new Error(`platform-server does not support '${feature}'.`);
}
class ServerPlatformLocation extends PlatformLocation {
    getBaseHrefFromDOM() { throw notSupported('getBaseHrefFromDOM'); }
    ;
    onPopState(fn) { notSupported('onPopState'); }
    ;
    onHashChange(fn) { notSupported('onHashChange'); }
    ;
    get pathname() { throw notSupported('pathname'); }
    get search() { throw notSupported('search'); }
    get hash() { throw notSupported('hash'); }
    replaceState(state, title, url) { notSupported('replaceState'); }
    ;
    pushState(state, title, url) { notSupported('pushState'); }
    ;
    forward() { notSupported('forward'); }
    ;
    back() { notSupported('back'); }
    ;
}
/**
 * A set of providers to initialize the Angular platform in a server.
 *
 * Used automatically by `serverBootstrap`, or can be passed to `platform`.
 * @experimental
 */
export const SERVER_PLATFORM_PROVIDERS = [
    PLATFORM_CORE_PROVIDERS,
    { provide: PLATFORM_INITIALIZER, useValue: initParse5Adapter, multi: true },
    { provide: PlatformLocation, useClass: ServerPlatformLocation },
];
const SERVER_DYNAMIC_PROVIDERS = [
    SERVER_PLATFORM_PROVIDERS,
    { provide: CompilerFactory, useValue: BROWSER_DYNAMIC_TEST_COMPILER_FACTORY },
];
function initParse5Adapter() {
    Parse5DomAdapter.makeCurrent();
    wtfInit();
}
/**
 * @experimental
 */
export const serverPlatform = createPlatformFactory('server', SERVER_PLATFORM_PROVIDERS);
/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export const serverDynamicPlatform = createPlatformFactory('serverDynamic', SERVER_DYNAMIC_PROVIDERS);
/**
 * Used to bootstrap Angular in server environment (such as node).
 *
 * This version of bootstrap only creates platform injector and does not define anything for
 * application injector. It is expected that application providers are imported from other
 * packages such as `@angular/platform-browser` or `@angular/platform-browser-dynamic`.
 *
 * ```
 * import {BROWSER_APP_PROVIDERS} from '@angular/platform-browser';
 * import {BROWSER_APP_COMPILER_PROVIDERS} from '@angular/platform-browser-dynamic';
 *
 * serverBootstrap(..., [BROWSER_APP_PROVIDERS, BROWSER_APP_COMPILER_PROVIDERS])
 * ```
 *
 * @deprecated create an {@link NgModule} and use {@link bootstrapModule} with the {@link
 * serverDynamicPlatform}()
 * instead.
 */
export function serverBootstrap(appComponentType, customProviders) {
    console.warn('serverBootstrap is deprecated. Create an @NgModule and use `bootstrapModule` with the `serverDynamicPlatform()` instead.');
    reflector.reflectionCapabilities = new ReflectionCapabilities();
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
                    imports: [BrowserDynamicTestModule],
                    precompile: [appComponentType]
                },] },
    ];
    return bootstrapModule(DynamicModule, serverDynamicPlatform(), compilerOptions)
        .then((moduleRef) => {
        const console = moduleRef.injector.get(Console);
        deprecatedConfiguration.deprecationMessages.forEach((msg) => console.warn(msg));
        const appRef = moduleRef.injector.get(ApplicationRef);
        return appRef.bootstrap(appComponentType);
    });
}
//# sourceMappingURL=server.js.map