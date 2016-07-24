/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var browser_1 = require('./browser');
var browser_adapter_1 = require('./browser/browser_adapter');
var testability_1 = require('./browser/testability');
var animation_driver_1 = require('./dom/animation_driver');
var dom_adapter_1 = require('./dom/dom_adapter');
var dom_renderer_1 = require('./dom/dom_renderer');
var dom_tokens_1 = require('./dom/dom_tokens');
var dom_events_1 = require('./dom/events/dom_events');
var event_manager_1 = require('./dom/events/event_manager');
var hammer_gestures_1 = require('./dom/events/hammer_gestures');
var key_events_1 = require('./dom/events/key_events');
var shared_styles_host_1 = require('./dom/shared_styles_host');
var exceptions_1 = require('./facade/exceptions');
var api_1 = require('./web_workers/shared/api');
var client_message_broker_1 = require('./web_workers/shared/client_message_broker');
var message_bus_1 = require('./web_workers/shared/message_bus');
var post_message_bus_1 = require('./web_workers/shared/post_message_bus');
var render_store_1 = require('./web_workers/shared/render_store');
var serializer_1 = require('./web_workers/shared/serializer');
var service_message_broker_1 = require('./web_workers/shared/service_message_broker');
var renderer_1 = require('./web_workers/ui/renderer');
var WebWorkerInstance = (function () {
    function WebWorkerInstance() {
    }
    /** @internal */
    WebWorkerInstance.prototype.init = function (worker, bus) {
        this.worker = worker;
        this.bus = bus;
    };
    /** @nocollapse */
    WebWorkerInstance.decorators = [
        { type: core_1.Injectable },
    ];
    return WebWorkerInstance;
}());
exports.WebWorkerInstance = WebWorkerInstance;
/**
 * @experimental WebWorker support is currently experimental.
 */
exports.WORKER_SCRIPT = new core_1.OpaqueToken('WebWorkerScript');
/**
 * A multiple providers used to automatically call the `start()` method after the service is
 * created.
 *
 * TODO(vicb): create an interface for startable services to implement
 * @experimental WebWorker support is currently experimental.
 */
exports.WORKER_UI_STARTABLE_MESSAGING_SERVICE = new core_1.OpaqueToken('WorkerRenderStartableMsgService');
/**
 * @experimental WebWorker support is currently experimental.
 */
exports.WORKER_UI_PLATFORM_PROVIDERS = [
    core_1.PLATFORM_CORE_PROVIDERS,
    { provide: core_1.NgZone, useFactory: createNgZone, deps: [] },
    renderer_1.MessageBasedRenderer,
    { provide: exports.WORKER_UI_STARTABLE_MESSAGING_SERVICE, useExisting: renderer_1.MessageBasedRenderer, multi: true },
    browser_1.BROWSER_SANITIZATION_PROVIDERS,
    { provide: core_1.ExceptionHandler, useFactory: _exceptionHandler, deps: [] },
    { provide: dom_tokens_1.DOCUMENT, useFactory: _document, deps: [] },
    // TODO(jteplitz602): Investigate if we definitely need EVENT_MANAGER on the render thread
    // #5298
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: dom_events_1.DomEventsPlugin, multi: true },
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: key_events_1.KeyEventsPlugin, multi: true },
    { provide: event_manager_1.EVENT_MANAGER_PLUGINS, useClass: hammer_gestures_1.HammerGesturesPlugin, multi: true },
    { provide: hammer_gestures_1.HAMMER_GESTURE_CONFIG, useClass: hammer_gestures_1.HammerGestureConfig },
    { provide: dom_renderer_1.DomRootRenderer, useClass: dom_renderer_1.DomRootRenderer_ },
    { provide: core_1.RootRenderer, useExisting: dom_renderer_1.DomRootRenderer },
    { provide: shared_styles_host_1.SharedStylesHost, useExisting: shared_styles_host_1.DomSharedStylesHost },
    { provide: service_message_broker_1.ServiceMessageBrokerFactory, useClass: service_message_broker_1.ServiceMessageBrokerFactory_ },
    { provide: client_message_broker_1.ClientMessageBrokerFactory, useClass: client_message_broker_1.ClientMessageBrokerFactory_ },
    { provide: animation_driver_1.AnimationDriver, useFactory: _resolveDefaultAnimationDriver },
    serializer_1.Serializer,
    { provide: api_1.ON_WEB_WORKER, useValue: false },
    render_store_1.RenderStore,
    shared_styles_host_1.DomSharedStylesHost,
    core_1.Testability,
    event_manager_1.EventManager,
    WebWorkerInstance,
    {
        provide: core_1.PLATFORM_INITIALIZER,
        useFactory: initWebWorkerRenderPlatform,
        multi: true,
        deps: [core_1.Injector]
    },
    { provide: message_bus_1.MessageBus, useFactory: messageBusFactory, deps: [WebWorkerInstance] }
];
/**
 * @deprecated Worker UI only has a platform but not application
 */
exports.WORKER_UI_APPLICATION_PROVIDERS = [];
function initializeGenericWorkerRenderer(injector) {
    var bus = injector.get(message_bus_1.MessageBus);
    var zone = injector.get(core_1.NgZone);
    bus.attachToZone(zone);
    // initialize message services after the bus has been created
    var services = injector.get(exports.WORKER_UI_STARTABLE_MESSAGING_SERVICE);
    zone.runGuarded(function () { services.forEach(function (svc) { svc.start(); }); });
}
function messageBusFactory(instance) {
    return instance.bus;
}
function initWebWorkerRenderPlatform(injector) {
    return function () {
        browser_adapter_1.BrowserDomAdapter.makeCurrent();
        core_private_1.wtfInit();
        testability_1.BrowserGetTestability.init();
        var scriptUri;
        try {
            scriptUri = injector.get(exports.WORKER_SCRIPT);
        }
        catch (e) {
            throw new exceptions_1.BaseException('You must provide your WebWorker\'s initialization script with the WORKER_SCRIPT token');
        }
        var instance = injector.get(WebWorkerInstance);
        spawnWebWorker(scriptUri, instance);
        initializeGenericWorkerRenderer(injector);
    };
}
var _workerUiPlatform = core_1.createPlatformFactory('workerUi', exports.WORKER_UI_PLATFORM_PROVIDERS);
/**
 * @experimental WebWorker support is currently experimental.
 */
exports.workerUiPlatform = function (workerScriptUri, extraProviders) {
    if (extraProviders === void 0) { extraProviders = []; }
    return _workerUiPlatform([{ provide: exports.WORKER_SCRIPT, useValue: workerScriptUri }, extraProviders]);
};
function _exceptionHandler() {
    return new core_1.ExceptionHandler(dom_adapter_1.getDOM());
}
function _document() {
    return dom_adapter_1.getDOM().defaultDoc();
}
function createNgZone() {
    return new core_1.NgZone({ enableLongStackTrace: core_1.isDevMode() });
}
/**
 * Spawns a new class and initializes the WebWorkerInstance
 */
function spawnWebWorker(uri, instance) {
    var webWorker = new Worker(uri);
    var sink = new post_message_bus_1.PostMessageBusSink(webWorker);
    var source = new post_message_bus_1.PostMessageBusSource(webWorker);
    var bus = new post_message_bus_1.PostMessageBus(sink, source);
    instance.init(webWorker, bus);
}
function _resolveDefaultAnimationDriver() {
    // web workers have not been tested or configured to
    // work with animations just yet...
    return animation_driver_1.AnimationDriver.NOOP;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX3JlbmRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9zcmMvd29ya2VyX3JlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQW9RLGVBQWUsQ0FBQyxDQUFBO0FBRXBSLDZCQUFzQixpQkFBaUIsQ0FBQyxDQUFBO0FBRXhDLHdCQUE2QyxXQUFXLENBQUMsQ0FBQTtBQUN6RCxnQ0FBZ0MsMkJBQTJCLENBQUMsQ0FBQTtBQUM1RCw0QkFBb0MsdUJBQXVCLENBQUMsQ0FBQTtBQUM1RCxpQ0FBOEIsd0JBQXdCLENBQUMsQ0FBQTtBQUN2RCw0QkFBcUIsbUJBQW1CLENBQUMsQ0FBQTtBQUN6Qyw2QkFBZ0Qsb0JBQW9CLENBQUMsQ0FBQTtBQUNyRSwyQkFBdUIsa0JBQWtCLENBQUMsQ0FBQTtBQUMxQywyQkFBOEIseUJBQXlCLENBQUMsQ0FBQTtBQUN4RCw4QkFBa0QsNEJBQTRCLENBQUMsQ0FBQTtBQUMvRSxnQ0FBK0UsOEJBQThCLENBQUMsQ0FBQTtBQUM5RywyQkFBOEIseUJBQXlCLENBQUMsQ0FBQTtBQUN4RCxtQ0FBb0QsMEJBQTBCLENBQUMsQ0FBQTtBQUMvRSwyQkFBNEIscUJBQXFCLENBQUMsQ0FBQTtBQUVsRCxvQkFBNEIsMEJBQTBCLENBQUMsQ0FBQTtBQUN2RCxzQ0FBc0UsNENBQTRDLENBQUMsQ0FBQTtBQUNuSCw0QkFBeUIsa0NBQWtDLENBQUMsQ0FBQTtBQUM1RCxpQ0FBdUUsdUNBQXVDLENBQUMsQ0FBQTtBQUMvRyw2QkFBMEIsbUNBQW1DLENBQUMsQ0FBQTtBQUM5RCwyQkFBeUIsaUNBQWlDLENBQUMsQ0FBQTtBQUMzRCx1Q0FBd0UsNkNBQTZDLENBQUMsQ0FBQTtBQUN0SCx5QkFBbUMsMkJBQTJCLENBQUMsQ0FBQTtBQUMvRDtJQUFBO0lBYUEsQ0FBQztJQVRDLGdCQUFnQjtJQUNU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