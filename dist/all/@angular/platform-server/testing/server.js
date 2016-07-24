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
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/platform-browser-dynamic/testing');
var core_private_1 = require('../core_private');
var parse5_adapter_1 = require('../src/parse5_adapter');
function initServerTests() {
    parse5_adapter_1.Parse5DomAdapter.makeCurrent();
}
var SERVER_TEST_PLATFORM_PROVIDERS = 
/*@ts2dart_const*/ [
    core_1.PLATFORM_CORE_PROVIDERS,
    /*@ts2dart_Provider*/ { provide: core_1.PLATFORM_INITIALIZER, useValue: initServerTests, multi: true },
    { provide: core_1.CompilerFactory, useValue: testing_2.BROWSER_DYNAMIC_TEST_COMPILER_FACTORY },
];
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
exports.serverTestPlatform = core_1.createPlatformFactory('serverTest', SERVER_TEST_PLATFORM_PROVIDERS);
var ServerTestModule = (function () {
    function ServerTestModule() {
    }
    /** @nocollapse */
    ServerTestModule.decorators = [
        { type: core_1.NgModule, args: [{ exports: [testing_2.BrowserDynamicTestModule] },] },
    ];
    return ServerTestModule;
}());
exports.ServerTestModule = ServerTestModule;
/**
 * @deprecated Use initTestEnvironment with serverTestPlatform instead.
 */
exports.TEST_SERVER_PLATFORM_PROVIDERS = 
// Note: This is not a real provider but a hack to still support the deprecated
// `setBaseTestProviders` method!
[function (appProviders) {
        var deprecatedConfiguration = compiler_1.analyzeAppProvidersForDeprecatedConfiguration(appProviders);
        var platformRef = core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate([
            SERVER_TEST_PLATFORM_PROVIDERS, {
                provide: core_1.CompilerFactory,
                useValue: testing_2.BROWSER_DYNAMIC_TEST_COMPILER_FACTORY.withDefaults(deprecatedConfiguration.compilerOptions)
            }
        ]));
        var DynamicTestModule = (function () {
            function DynamicTestModule() {
            }
            /** @nocollapse */
            DynamicTestModule.decorators = [
                { type: core_1.NgModule, args: [{ exports: [ServerTestModule], declarations: [deprecatedConfiguration.moduleDeclarations] },] },
            ];
            return DynamicTestModule;
        }());
        var testInjector = testing_1.initTestEnvironment(DynamicTestModule, platformRef);
        var console = testInjector.get(core_private_1.Console);
        deprecatedConfiguration.deprecationMessages.forEach(function (msg) { return console.warn(msg); });
    }];
/**
 * @deprecated Use initTestEnvironment with ServerTestModule instead.
 */
exports.TEST_SERVER_APPLICATION_PROVIDERS = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1zZXJ2ZXIvdGVzdGluZy9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHlCQUE0RCxtQkFBbUIsQ0FBQyxDQUFBO0FBQ2hGLHFCQUF5TSxlQUFlLENBQUMsQ0FBQTtBQUN6Tix3QkFBa0MsdUJBQXVCLENBQUMsQ0FBQTtBQUMxRCx3QkFBMEgsMkNBQTJDLENBQUMsQ0FBQTtBQUV0Syw2QkFBc0IsaUJBQWlCLENBQUMsQ0FBQTtBQUN4QywrQkFBK0IsdUJBQXVCLENBQUMsQ0FBQTtBQUV2RDtJQUNFLGlDQUFnQixDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQ2pDLENBQUM7QUFFRCxJQUFNLDhCQUE4QjtBQUNoQyxrQkFBa0IsQ0FBQTtJQUNoQiw4QkFBdUI7SUFDdkIscUJBQXFCLENBQUMsRUFBQyxPQUFPLEVBQUUsMkJBQW9CLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO0lBQzdGLEVBQUMsT0FBTyxFQUFFLHNCQUFlLEVBQUUsUUFBUSxFQUFFLCtDQUFxQyxFQUFDO0NBQzVFLENBQUM7QUFFTjs7OztHQUlHO0FBQ1UsMEJBQWtCLEdBQzNCLDRCQUFxQixDQUFDLFlBQVksRUFBRSw4QkFBOEIsQ0FBQyxDQUFDO0FBQ3hFO0lBQUE7SUFLQSxDQUFDO0lBSkQsa0JBQWtCO0lBQ1gsMkJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsa0NBQXdCLENBQUMsRUFBQyxFQUFHLEVBQUU7S0FDbEUsQ0FBQztJQUNGLHVCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFMWSx3QkFBZ0IsbUJBSzVCLENBQUE7QUFFRDs7R0FFRztBQUNVLHNDQUE4QjtBQUN2QywrRUFBK0U7QUFDL0UsaUNBQWlDO0FBQ2pDLENBQUMsVUFBQyxZQUFtQjtRQUNuQixJQUFNLHVCQUF1QixHQUFHLHdEQUE2QyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzVGLElBQU0sV0FBVyxHQUFHLHFCQUFjLENBQUMseUJBQWtCLENBQUMsZ0JBQWdCLENBQUM7WUFDckUsOEJBQThCLEVBQUU7Z0JBQzlCLE9BQU8sRUFBRSxzQkFBZTtnQkFDeEIsUUFBUSxFQUFFLCtDQUFxQyxDQUFDLFlBQVksQ0FDeEQsdUJBQXVCLENBQUMsZUFBZSxDQUFDO2FBQzdDO1NBQ0YsQ0FBQyxDQUFDLENBQUM7UUFDSjtZQUFBO1lBS04sQ0FBQztZQUpLLGtCQUFrQjtZQUNqQiw0QkFBVSxHQUEwQjtnQkFDM0MsRUFBRSxJQUFJLEVBQUUsZUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFDLEVBQUcsRUFBRTthQUN0SCxDQUFDO1lBQ0Ysd0JBQUM7UUFBRCxDQUFDLEFBTEssSUFLTDtRQUVLLElBQU0sWUFBWSxHQUFHLDZCQUFtQixDQUFDLGlCQUFpQixFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3pFLElBQU0sT0FBTyxHQUFZLFlBQVksQ0FBQyxHQUFHLENBQUMsc0JBQU8sQ0FBQyxDQUFDO1FBQ25ELHVCQUF1QixDQUFDLG1CQUFtQixDQUFDLE9BQU8sQ0FBQyxVQUFDLEdBQUcsSUFBSyxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUNsRixDQUFDLENBQUMsQ0FBQztBQUVQOztHQUVHO0FBQ1UseUNBQWlDLEdBQTJDLEVBQUUsQ0FBQyJ9