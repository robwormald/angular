/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var compiler_1 = require('@angular/compiler');
var testing_1 = require('@angular/compiler/testing');
var core_1 = require('@angular/core');
var testing_2 = require('@angular/core/testing');
var testing_3 = require('@angular/platform-browser/testing');
var core_private_1 = require('./core_private');
var index_1 = require('./index');
var dom_test_component_renderer_1 = require('./testing/dom_test_component_renderer');
__export(require('./private_export_testing'));
/**
 * CompilerFactory for browser dynamic test platform
 *
 * @experimental
 */
exports.BROWSER_DYNAMIC_TEST_COMPILER_FACTORY = index_1.BROWSER_DYNAMIC_COMPILER_FACTORY.withDefaults({
    providers: [
        { provide: compiler_1.DirectiveResolver, useClass: testing_1.MockDirectiveResolver },
        { provide: compiler_1.ViewResolver, useClass: testing_1.MockViewResolver },
        { provide: compiler_1.NgModuleResolver, useClass: testing_1.MockNgModuleResolver }
    ]
});
/**
 * Providers for the browser dynamic platform
 *
 * @experimental
 */
var BROWSER_DYNAMIC_TEST_PLATFORM_PROVIDERS = [
    testing_3.TEST_BROWSER_PLATFORM_PROVIDERS,
    index_1.BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
    { provide: core_1.CompilerFactory, useValue: exports.BROWSER_DYNAMIC_TEST_COMPILER_FACTORY },
];
/**
 * @experimental API related to bootstrapping are still under review.
 */
exports.browserDynamicTestPlatform = core_1.createPlatformFactory('browserDynamicTest', BROWSER_DYNAMIC_TEST_PLATFORM_PROVIDERS);
var BrowserDynamicTestModule = (function () {
    function BrowserDynamicTestModule() {
    }
    /** @nocollapse */
    BrowserDynamicTestModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [testing_3.BrowserTestModule],
                    providers: [
                        { provide: testing_2.TestComponentBuilder, useClass: testing_1.OverridingTestComponentBuilder },
                        { provide: testing_2.TestComponentRenderer, useClass: dom_test_component_renderer_1.DOMTestComponentRenderer },
                    ]
                },] },
    ];
    return BrowserDynamicTestModule;
}());
exports.BrowserDynamicTestModule = BrowserDynamicTestModule;
/**
 * @deprecated Use initTestEnvironment with browserDynamicTestPlatform instead.
 */
exports.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS = 
// Note: This is not a real provider but a hack to still support the deprecated
// `setBaseTestProviders` method!
[function (appProviders) {
        var deprecatedConfiguration = compiler_1.analyzeAppProvidersForDeprecatedConfiguration(appProviders);
        var platformRef = core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate([
            BROWSER_DYNAMIC_TEST_PLATFORM_PROVIDERS, {
                provide: core_1.CompilerFactory,
                useValue: exports.BROWSER_DYNAMIC_TEST_COMPILER_FACTORY.withDefaults(deprecatedConfiguration.compilerOptions)
            }
        ]));
        var DynamicTestModule = (function () {
            function DynamicTestModule() {
            }
            /** @nocollapse */
            DynamicTestModule.decorators = [
                { type: core_1.NgModule, args: [{
                            exports: [BrowserDynamicTestModule],
                            declarations: [deprecatedConfiguration.moduleDeclarations]
                        },] },
            ];
            return DynamicTestModule;
        }());
        var testInjector = testing_2.initTestEnvironment(DynamicTestModule, platformRef);
        var console = testInjector.get(core_private_1.Console);
        deprecatedConfiguration.deprecationMessages.forEach(function (msg) { return console.warn(msg); });
    }];
/**
 * @deprecated Use initTestEnvironment with BrowserDynamicTestModule instead.
 */
exports.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3Rlc3RpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7OztBQUVILHlCQUErSCxtQkFBbUIsQ0FBQyxDQUFBO0FBQ25KLHdCQUE0RywyQkFBMkIsQ0FBQyxDQUFBO0FBQ3hJLHFCQUEwSSxlQUFlLENBQUMsQ0FBQTtBQUMxSix3QkFBK0UsdUJBQXVCLENBQUMsQ0FBQTtBQUN2Ryx3QkFBaUUsbUNBQW1DLENBQUMsQ0FBQTtBQUVyRyw2QkFBc0IsZ0JBQWdCLENBQUMsQ0FBQTtBQUN2QyxzQkFBbUYsU0FBUyxDQUFDLENBQUE7QUFDN0YsNENBQXVDLHVDQUF1QyxDQUFDLENBQUE7QUFFL0UsaUJBQWMsMEJBT2QsQ0FBQyxFQVB1QztBQUV4Qzs7OztHQUlHO0FBQ1UsNkNBQXFDLEdBQUcsd0NBQWdDLENBQUMsWUFBWSxDQUFDO0lBQ2pHLFNBQVMsRUFBRTtRQUNULEVBQUMsT0FBTyxFQUFFLDRCQUFpQixFQUFFLFFBQVEsRUFBRSwrQkFBcUIsRUFBQztRQUM3RCxFQUFDLE9BQU8sRUFBRSx1QkFBWSxFQUFFLFFBQVEsRUFBRSwwQkFBZ0IsRUFBQztRQUNuRCxFQUFDLE9BQU8sRUFBRSwyQkFBZ0IsRUFBRSxRQUFRLEVBQUUsOEJBQW9CLEVBQUM7S0FDNUQ7Q0FDRixDQUFDLENBQUM7QUFHSDs7OztHQUlHO0FBQ0gsSUFBTSx1Q0FBdUMsR0FBMkM7SUFDdEYseUNBQStCO0lBQy9CLDBDQUFrQztJQUNsQyxFQUFDLE9BQU8sRUFBRSxzQkFBZSxFQUFFLFFBQVEsRUFBRSw2Q0FBcUMsRUFBQztDQUM1RSxDQUFDO0FBRUY7O0dBRUc7QUFDVSxrQ0FBMEIsR0FDbkMsNEJBQXFCLENBQUMsb0JBQW9CLEVBQUUsdUNBQXVDLENBQUMsQ0FBQztBQUN6RjtJQUFBO0lBV0EsQ0FBQztJQVZELGtCQUFrQjtJQUNYLG1DQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGVBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsMkJBQWlCLENBQUM7b0JBQzVCLFNBQVMsRUFBRTt3QkFDVCxFQUFDLE9BQU8sRUFBRSw4QkFBb0IsRUFBRSxRQUFRLEVBQUUsd0NBQThCLEVBQUM7d0JBQ3pFLEVBQUMsT0FBTyxFQUFFLCtCQUFxQixFQUFFLFFBQVEsRUFBRSxzREFBd0IsRUFBQztxQkFDckU7aUJBQ0YsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLCtCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFYWSxnQ0FBd0IsMkJBV3BDLENBQUE7QUFFRDs7R0FFRztBQUNVLCtDQUF1QztBQUNoRCwrRUFBK0U7QUFDL0UsaUNBQWlDO0FBQ2pDLENBQUMsVUFBQyxZQUFtQjtRQUNuQixJQUFNLHVCQUF1QixHQUFHLHdEQUE2QyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVGLElBQU0sV0FBVyxHQUFHLHFCQUFjLENBQUMseUJBQWtCLENBQUMsZ0JBQWdCLENBQUM7WUFDckUsdUNBQXVDLEVBQUU7Z0JBQ3ZDLE9BQU8sRUFBRSxzQkFBZTtnQkFDeEIsUUFBUSxFQUFFLDZDQUFxQyxDQUFDLFlBQVksQ0FDeEQsdUJBQXVCLENBQUMsZUFBZSxDQUFDO2FBQzdDO1NBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSjtZQUFBO1lBUU4sQ0FBQztZQVBLLGtCQUFrQjtZQUNqQiw0QkFBVSxHQUEwQjtnQkFDM0MsRUFBRSxJQUFJLEVBQUUsZUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOzRCQUNqQixPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQzs0QkFDbkMsWUFBWSxFQUFFLENBQUMsdUJBQXVCLENBQUMsa0JBQWtCLENBQUM7eUJBQzNELEVBQUcsRUFBRTthQUNYLENBQUM7WUFDRix3QkFBQztRQUFELENBQUMsQUFSSyxJQVFMO1FBRUssSUFBTSxZQUFZLEdBQUcsNkJBQW1CLENBQUMsaUJBQWlCLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDekUsSUFBTSxPQUFPLEdBQVksWUFBWSxDQUFDLEdBQUcsQ0FBQyxzQkFBTyxDQUFDLENBQUM7UUFDbkQsdUJBQXVCLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO0lBQ2xGLENBQUMsQ0FBQyxDQUFDO0FBRVA7O0dBRUc7QUFDVSxrREFBMEMsR0FDbkQsRUFBRSxDQUFDIn0=