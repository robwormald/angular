/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { analyzeAppProvidersForDeprecatedConfiguration } from '@angular/compiler';
import { CompilerFactory, NgModule, PLATFORM_CORE_PROVIDERS, PLATFORM_INITIALIZER, ReflectiveInjector, createPlatform, createPlatformFactory } from '@angular/core';
import { initTestEnvironment } from '@angular/core/testing';
import { BROWSER_DYNAMIC_TEST_COMPILER_FACTORY, BrowserDynamicTestModule } from '@angular/platform-browser-dynamic/testing';
import { Console } from '../core_private';
import { Parse5DomAdapter } from '../src/parse5_adapter';
function initServerTests() {
    Parse5DomAdapter.makeCurrent();
}
const SERVER_TEST_PLATFORM_PROVIDERS = 
/*@ts2dart_const*/ [
    PLATFORM_CORE_PROVIDERS,
    /*@ts2dart_Provider*/ { provide: PLATFORM_INITIALIZER, useValue: initServerTests, multi: true },
    { provide: CompilerFactory, useValue: BROWSER_DYNAMIC_TEST_COMPILER_FACTORY },
];
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export const serverTestPlatform = createPlatformFactory('serverTest', SERVER_TEST_PLATFORM_PROVIDERS);
export class ServerTestModule {
}
/** @nocollapse */
ServerTestModule.decorators = [
    { type: NgModule, args: [{ exports: [BrowserDynamicTestModule] },] },
];
/**
 * @deprecated Use initTestEnvironment with serverTestPlatform instead.
 */
export const TEST_SERVER_PLATFORM_PROVIDERS = 
// Note: This is not a real provider but a hack to still support the deprecated
// `setBaseTestProviders` method!
[(appProviders) => {
        const deprecatedConfiguration = analyzeAppProvidersForDeprecatedConfiguration(appProviders);
        const platformRef = createPlatform(ReflectiveInjector.resolveAndCreate([
            SERVER_TEST_PLATFORM_PROVIDERS, {
                provide: CompilerFactory,
                useValue: BROWSER_DYNAMIC_TEST_COMPILER_FACTORY.withDefaults(deprecatedConfiguration.compilerOptions)
            }
        ]));
        class DynamicTestModule {
        }
        /** @nocollapse */
        DynamicTestModule.decorators = [
            { type: NgModule, args: [{ exports: [ServerTestModule], declarations: [deprecatedConfiguration.moduleDeclarations] },] },
        ];
        const testInjector = initTestEnvironment(DynamicTestModule, platformRef);
        const console = testInjector.get(Console);
        deprecatedConfiguration.deprecationMessages.forEach((msg) => console.warn(msg));
    }];
/**
 * @deprecated Use initTestEnvironment with ServerTestModule instead.
 */
export const TEST_SERVER_APPLICATION_PROVIDERS = [];
//# sourceMappingURL=server.js.map