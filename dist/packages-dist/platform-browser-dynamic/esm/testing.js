/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DirectiveResolver, NgModuleResolver, ViewResolver, analyzeAppProvidersForDeprecatedConfiguration } from '@angular/compiler';
import { MockDirectiveResolver, MockNgModuleResolver, MockViewResolver, OverridingTestComponentBuilder } from '@angular/compiler/testing';
import { CompilerFactory, NgModule, ReflectiveInjector, createPlatform, createPlatformFactory } from '@angular/core';
import { TestComponentBuilder, TestComponentRenderer, initTestEnvironment } from '@angular/core/testing';
import { BrowserTestModule, TEST_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser/testing';
import { Console } from './core_private';
import { BROWSER_DYNAMIC_COMPILER_FACTORY, BROWSER_DYNAMIC_PLATFORM_PROVIDERS } from './index';
import { DOMTestComponentRenderer } from './testing/dom_test_component_renderer';
export * from './private_export_testing';
/**
 * CompilerFactory for browser dynamic test platform
 *
 * @experimental
 */
export const BROWSER_DYNAMIC_TEST_COMPILER_FACTORY = BROWSER_DYNAMIC_COMPILER_FACTORY.withDefaults({
    providers: [
        { provide: DirectiveResolver, useClass: MockDirectiveResolver },
        { provide: ViewResolver, useClass: MockViewResolver },
        { provide: NgModuleResolver, useClass: MockNgModuleResolver }
    ]
});
/**
 * Providers for the browser dynamic platform
 *
 * @experimental
 */
const BROWSER_DYNAMIC_TEST_PLATFORM_PROVIDERS = [
    TEST_BROWSER_PLATFORM_PROVIDERS,
    BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
    { provide: CompilerFactory, useValue: BROWSER_DYNAMIC_TEST_COMPILER_FACTORY },
];
/**
 * @experimental API related to bootstrapping are still under review.
 */
export const browserDynamicTestPlatform = createPlatformFactory('browserDynamicTest', BROWSER_DYNAMIC_TEST_PLATFORM_PROVIDERS);
export class BrowserDynamicTestModule {
}
/** @nocollapse */
BrowserDynamicTestModule.decorators = [
    { type: NgModule, args: [{
                exports: [BrowserTestModule],
                providers: [
                    { provide: TestComponentBuilder, useClass: OverridingTestComponentBuilder },
                    { provide: TestComponentRenderer, useClass: DOMTestComponentRenderer },
                ]
            },] },
];
/**
 * @deprecated Use initTestEnvironment with browserDynamicTestPlatform instead.
 */
export const TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = 
// Note: This is not a real provider but a hack to still support the deprecated
// `setBaseTestProviders` method!
[(appProviders) => {
        const deprecatedConfiguration = analyzeAppProvidersForDeprecatedConfiguration(appProviders);
        const platformRef = createPlatform(ReflectiveInjector.resolveAndCreate([
            BROWSER_DYNAMIC_TEST_PLATFORM_PROVIDERS, {
                provide: CompilerFactory,
                useValue: BROWSER_DYNAMIC_TEST_COMPILER_FACTORY.withDefaults(deprecatedConfiguration.compilerOptions)
            }
        ]));
        class DynamicTestModule {
        }
        /** @nocollapse */
        DynamicTestModule.decorators = [
            { type: NgModule, args: [{
                        exports: [BrowserDynamicTestModule],
                        declarations: [deprecatedConfiguration.moduleDeclarations]
                    },] },
        ];
        const testInjector = initTestEnvironment(DynamicTestModule, platformRef);
        const console = testInjector.get(Console);
        deprecatedConfiguration.deprecationMessages.forEach((msg) => console.warn(msg));
    }];
/**
 * @deprecated Use initTestEnvironment with BrowserDynamicTestModule instead.
 */
export const TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS = [];
//# sourceMappingURL=testing.js.map