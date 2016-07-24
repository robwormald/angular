/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var animation_driver_1 = require('../src/dom/animation_driver');
var web_animations_driver_1 = require('../src/dom/web_animations_driver');
var browser_adapter_1 = require('./browser/browser_adapter');
var browser_platform_location_1 = require('./browser/location/browser_platform_location');
var testability_1 = require('./browser/testability');
var ng_probe_1 = require('./dom/debug/ng_probe');
var dom_adapter_1 = require('./dom/dom_adapter');
var dom_renderer_1 = require('./dom/dom_renderer');
var dom_tokens_1 = require('./dom/dom_tokens');
var dom_events_1 = require('./dom/events/dom_events');
var event_manager_1 = require('./dom/events/event_manager');
var hammer_gestures_1 = require('./dom/events/hammer_gestures');
var key_events_1 = require('./dom/events/key_events');
var shared_styles_host_1 = require('./dom/shared_styles_host');
var dom_sanitization_service_1 = require('./security/dom_sanitization_service');
/**
 * A set of providers to initialize the Angular platform in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to `platform`.
 *
 * @experimental API related to bootstrapping are still under review.
 */
exports.BROWSER_PLATFORM_PROVIDERS = [
    core_1.PLATFORM_CORE_PROVIDERS, { provide: core_1.PLATFORM_INITIALIZER, useValue: initDomAdapter, multi: true },
    { provide: common_1.PlatformLocation, useClass: browser_platform_location_1.BrowserPlatformLocation }
];
/**
 * @security Replacing built-in sanitization providers exposes the application to XSS risks.
 * Attacker-controlled data introduced by an unsanitized provider could expose your
 * application to XSS risks. For more detail, see the [Security Guide](http://g.co/ng/security).
 * @experimental
 */
exports.BROWSER_SANITIZATION_PROVIDERS = [
    { provide: core_1.SanitizationService, useExisting: dom_sanitization_service_1.DomSanitizationService },
    { provide: dom_sanitization_service_1.DomSanitizationService, useClass: dom_sanitization_service_1.DomSanitizationServiceImpl },
];
/**
 * A set of providers to initialize an Angular application in a web browser.
 *
 * Used automatically by `bootstrap`, or can be passed to {@link PlatformRef
 * PlatformRef.application}.
 *
 * @experimental API related to bootstrapping are still under review.
 */
exports.BROWSER_APP_PROVIDERS = [];
/**
 * @experimental API related to bootstrapping are still under review.
 */
exports.browserPlatform = core_1.createPlatformFactory('browser', exports.BROWSER_PLATFORM_PROVIDERS);
function initDomAdapter() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    core_private_1.wtfInit();
    testability_1.BrowserGetTestability.init();
}
exports.initDomAdapter = initDomAdapter;
function _exceptionHandler() {
    return new core_1.ExceptionHandler(dom_adapter_1.getDOM());
}
exports._exceptionHandler = _exceptionHandler;
function _document() {
    return dom_adapter_1.getDOM().defaultDoc();
}
exports._document = _document;
function _resolveDefaultAnimationDriver() {
    if (dom_adapter_1.getDOM().supportsWebAnimation()) {
        return new web_animations_driver_1.WebAnimationsDriver();
    }
    return animation_driver_1.AnimationDriver.NOOP;
}
exports._resolveDefaultAnimationDriver = _resolveDefaultAnimationDriver;
var BrowserModule = (function () {
    function BrowserModule() {
    }
    /** @nocollapse */
    BrowserModule.decorators = [
        { type: core_1.NgModule, args: [{
                    providers: [
                        exports.BROWSER_SANITIZATION_PROVIDERS,
                        { provide: core_1.ExceptionHandler, useFactory: _exceptionHandler, deps: [] },
                        { provide: dom_tokens_1.DOCUMENT, useFactory: _document, deps: [] },
                        { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: dom_events_1.DomEventsPlugin, multi: true },
                        { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: key_events_1.KeyEventsPlugin, multi: true },
                        { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true },
                        { provide: hammer_gestures_1.HAMMER_GESTURE_CONFIG, useClass: hammer_gestures_1.HammerGestureConfig },
                        { provide: dom_renderer_1.DomRootRenderer, useClass: dom_renderer_1.DomRootRenderer_ },
                        { provide: core_1.RootRenderer, useExisting: dom_renderer_1.DomRootRenderer },
                        { provide: shared_styles_host_1.SharedStylesHost, useExisting: shared_styles_host_1.DomSharedStylesHost },
                        { provide: animation_driver_1.AnimationDriver, useFactory: _resolveDefaultAnimationDriver }, shared_styles_host_1.DomSharedStylesHost,
                        core_1.Testability, event_manager_1.EventManager, ng_probe_1.ELEMENT_PROBE_PROVIDERS
                    ],
                    exports: [common_1.CommonModule, core_1.ApplicationModule]
                },] },
    ];
    return BrowserModule;
}());
exports.BrowserModule = BrowserModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9zcmMvYnJvd3Nlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUJBQTZDLGlCQUFpQixDQUFDLENBQUE7QUFDL0QscUJBQThULGVBQWUsQ0FBQyxDQUFBO0FBRTlVLDZCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hDLGlDQUE4Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBQzVELHNDQUFrQyxrQ0FBa0MsQ0FBQyxDQUFBO0FBRXJFLGdDQUFnQywyQkFBMkIsQ0FBQyxDQUFBO0FBQzVELDBDQUFzQyw4Q0FBOEMsQ0FBQyxDQUFBO0FBQ3JGLDRCQUFvQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQzVELHlCQUFzQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQzdELDRCQUFxQixtQkFBbUIsQ0FBQyxDQUFBO0FBQ3pDLDZCQUFnRCxvQkFBb0IsQ0FBQyxDQUFBO0FBQ3JFLDJCQUF1QixrQkFBa0IsQ0FBQyxDQUFBO0FBQzFDLDJCQUE4Qix5QkFBeUIsQ0FBQyxDQUFBO0FBQ3hELDhCQUFrRCw0QkFBNEIsQ0FBQyxDQUFBO0FBQy9FLGdDQUErRSw4QkFBOEIsQ0FBQyxDQUFBO0FBQzlHLDJCQUE4Qix5QkFBeUIsQ0FBQyxDQUFBO0FBQ3hELG1DQUFvRCwwQkFBMEIsQ0FBQyxDQUFBO0FBRS9FLHlDQUFpRSxxQ0FBcUMsQ0FBQyxDQUFBO0FBR3ZHOzs7Ozs7R0FNRztBQUNVLGtDQUEwQixHQUEyQztJQUNoRiw4QkFBdUIsRUFBRSxFQUFDLE9BQU8sRUFBRSwyQkFBb0IsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7SUFDL0YsRUFBQyxPQUFPLEVBQUUseUJBQWdCLEVBQUUsUUFBUSxFQUFFLG1EQUF1QixFQUFDO0NBQy9ELENBQUM7QUFFRjs7Ozs7R0FL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