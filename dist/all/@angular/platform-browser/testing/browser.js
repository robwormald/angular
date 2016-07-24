/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var browser_1 = require('../src/browser');
var browser_adapter_1 = require('../src/browser/browser_adapter');
var animation_driver_1 = require('../src/dom/animation_driver');
var ng_probe_1 = require('../src/dom/debug/ng_probe');
var browser_util_1 = require('./browser_util');
function initBrowserTests() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    browser_util_1.BrowserDetection.setup();
}
function createNgZone() {
    return new core_1.NgZone({ enableLongStackTrace: true });
}
/**
 * Providers for the browser test platform
 *
 * @experimental
 */
exports.TEST_BROWSER_PLATFORM_PROVIDERS = [
    core_1.PLATFORM_CORE_PROVIDERS,
    { provide: core_1.PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true }
];
/**
 * @deprecated Use initTestEnvironment with BrowserTestModule instead.
 */
exports.TEST_BROWSER_APPLICATION_PROVIDERS = [];
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
exports.browserTestPlatform = core_1.createPlatformFactory('browserTest', exports.TEST_BROWSER_PLATFORM_PROVIDERS);
var BrowserTestModule = (function () {
    function BrowserTestModule() {
    }
    /** @nocollapse */
    BrowserTestModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [browser_1.BrowserModule],
                    providers: [
                        { provide: core_1.APP_ID, useValue: 'a' }, ng_probe_1.ELEMENT_PROBE_PROVIDERS,
                        { provide: core_1.NgZone, useFactory: createNgZone },
                        { provide: animation_driver_1.AnimationDriver, useValue: animation_driver_1.AnimationDriver.NOOP }
                    ]
                },] },
    ];
    return BrowserTestModule;
}());
exports.BrowserTestModule = BrowserTestModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci90ZXN0aW5nL2Jyb3dzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUdILHFCQUF3TSxlQUFlLENBQUMsQ0FBQTtBQUV4Tix3QkFBNEIsZ0JBQWdCLENBQUMsQ0FBQTtBQUM3QyxnQ0FBZ0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUNqRSxpQ0FBOEIsNkJBQTZCLENBQUMsQ0FBQTtBQUM1RCx5QkFBc0MsMkJBQTJCLENBQUMsQ0FBQTtBQUVsRSw2QkFBK0IsZ0JBQWdCLENBQUMsQ0FBQTtBQUVoRDtJQUNFLG1DQUFpQixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLCtCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO0FBQzNCLENBQUM7QUFFRDtJQUNFLE1BQU0sQ0FBQyxJQUFJLGFBQU0sQ0FBQyxFQUFDLG9CQUFvQixFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7QUFDbEQsQ0FBQztBQUVEOzs7O0dBSUc7QUFDVSx1Q0FBK0IsR0FBMkM7SUFDckYsOEJBQXVCO0lBQ3ZCLEVBQUMsT0FBTyxFQUFFLDJCQUFvQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDO0NBQ3pFLENBQUM7QUFFRjs7R0FFRztBQUNVLDBDQUFrQyxHQUEyQyxFQUFFLENBQUM7QUFFN0Y7Ozs7R0FJRztBQUNVLDJCQUFtQixHQUM1Qiw0QkFBcUIsQ0FBQyxhQUFhLEVBQUUsdUNBQStCLENBQUMsQ0FBQztBQUMxRTtJQUFBO0lBWUEsQ0FBQztJQVhELGtCQUFrQjtJQUNYLDRCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGVBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdkIsT0FBTyxFQUFFLENBQUMsdUJBQWEsQ0FBQztvQkFDeEIsU0FBUyxFQUFFO3dCQUNULEVBQUMsT0FBTyxFQUFFLGFBQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDLEVBQUUsa0NBQXVCO3dCQUN6RCxFQUFDLE9BQU8sRUFBRSxhQUFNLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBQzt3QkFDM0MsRUFBQyxPQUFPLEVBQUUsa0NBQWUsRUFBRSxRQUFRLEVBQUUsa0NBQWUsQ0FBQyxJQUFJLEVBQUM7cUJBQzNEO2lCQUNGLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRix3QkFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBWlkseUJBQWlCLG9CQVk3QixDQUFBIn0=