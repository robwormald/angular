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
var browser_1 = require('./browser');
var lang_1 = require('./facade/lang');
var api_1 = require('./web_workers/shared/api');
var client_message_broker_1 = require('./web_workers/shared/client_message_broker');
var message_bus_1 = require('./web_workers/shared/message_bus');
var post_message_bus_1 = require('./web_workers/shared/post_message_bus');
var render_store_1 = require('./web_workers/shared/render_store');
var serializer_1 = require('./web_workers/shared/serializer');
var service_message_broker_1 = require('./web_workers/shared/service_message_broker');
var renderer_1 = require('./web_workers/worker/renderer');
var worker_adapter_1 = require('./web_workers/worker/worker_adapter');
var PrintLogger = (function () {
    function PrintLogger() {
        this.log = lang_1.print;
        this.logError = lang_1.print;
        this.logGroup = lang_1.print;
    }
    PrintLogger.prototype.logGroupEnd = function () { };
    return PrintLogger;
}());
/**
 * @experimental
 */
exports.WORKER_APP_PLATFORM_PROVIDERS = core_1.PLATFORM_CORE_PROVIDERS;
/**
 * @deprecated Create a module that included `WorkerAppModule` instead.
 */
exports.WORKER_APP_APPLICATION_PROVIDERS = [];
/**
 * @experimental
 */
exports.workerAppPlatform = core_1.createPlatformFactory('workerApp', exports.WORKER_APP_PLATFORM_PROVIDERS);
function _exceptionHandler() {
    return new core_1.ExceptionHandler(new PrintLogger());
}
// TODO(jteplitz602) remove this and compile with lib.webworker.d.ts (#3492)
var _postMessage = {
    postMessage: function (message, transferrables) {
        postMessage(message, transferrables);
    }
};
function createMessageBus(zone) {
    var sink = new post_message_bus_1.PostMessageBusSink(_postMessage);
    var source = new post_message_bus_1.PostMessageBusSource();
    var bus = new post_message_bus_1.PostMessageBus(sink, source);
    bus.attachToZone(zone);
    return bus;
}
function setupWebWorker() {
    worker_adapter_1.WorkerDomAdapter.makeCurrent();
}
var WorkerAppModule = (function () {
    function WorkerAppModule() {
    }
    /** @nocollapse */
    WorkerAppModule.decorators = [
        { type: core_1.NgModule, args: [{
                    providers: [
                        common_1.FORM_PROVIDERS, browser_1.BROWSER_SANITIZATION_PROVIDERS, serializer_1.Serializer,
                        { provide: client_message_broker_1.ClientMessageBrokerFactory, useClass: client_message_broker_1.ClientMessageBrokerFactory_ },
                        { provide: service_message_broker_1.ServiceMessageBrokerFactory, useClass: service_message_broker_1.ServiceMessageBrokerFactory_ },
                        renderer_1.WebWorkerRootRenderer, { provide: core_1.RootRenderer, useExisting: renderer_1.WebWorkerRootRenderer },
                        { provide: api_1.ON_WEB_WORKER, useValue: true }, render_store_1.RenderStore,
                        { provide: core_1.ExceptionHandler, useFactory: _exceptionHandler, deps: [] },
                        { provide: message_bus_1.MessageBus, useFactory: createMessageBus, deps: [core_1.NgZone] },
                        { provide: core_1.APP_INITIALIZER, useValue: setupWebWorker, multi: true }
                    ],
                    exports: [common_1.CommonModule, core_1.ApplicationModule]
                },] },
    ];
    return WorkerAppModule;
}());
exports.WorkerAppModule = WorkerAppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FwcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9zcmMvd29ya2VyX2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUJBQTJDLGlCQUFpQixDQUFDLENBQUE7QUFDN0QscUJBQThPLGVBQWUsQ0FBQyxDQUFBO0FBRTlQLHdCQUE2QyxXQUFXLENBQUMsQ0FBQTtBQUN6RCxxQkFBNkIsZUFBZSxDQUFDLENBQUE7QUFDN0Msb0JBQTRCLDBCQUEwQixDQUFDLENBQUE7QUFDdkQsc0NBQXNFLDRDQUE0QyxDQUFDLENBQUE7QUFDbkgsNEJBQXlCLGtDQUFrQyxDQUFDLENBQUE7QUFDNUQsaUNBQXVFLHVDQUF1QyxDQUFDLENBQUE7QUFDL0csNkJBQTBCLG1DQUFtQyxDQUFDLENBQUE7QUFDOUQsMkJBQXlCLGlDQUFpQyxDQUFDLENBQUE7QUFDM0QsdUNBQXdFLDZDQUE2QyxDQUFDLENBQUE7QUFDdEgseUJBQW9DLCtCQUErQixDQUFDLENBQUE7QUFDcEUsK0JBQStCLHFDQUFxQyxDQUFDLENBQUE7QUFFckU7SUFBQTtRQUNFLFFBQUcsR0FBRyxZQUFLLENBQUM7UUFDWixhQUFRLEdBQUcsWUFBSyxDQUFDO1FBQ2pCLGFBQVEsR0FBRyxZQUFLLENBQUM7SUFFbkIsQ0FBQztJQURDLGlDQUFXLEdBQVgsY0FBZSxDQUFDO0lBQ2xCLGtCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFFRDs7R0FFRztBQUNVLHFDQUE2QixHQUN0Qyw4QkFBdUIsQ0FBQztBQUU1Qjs7R0FFRztBQUNVLHdDQUFnQyxHQUEyQyxFQUFFLENBQUM7QUFFM0Y7O0dBRUc7QUFDVSx5QkFBaUIsR0FBRyw0QkFBcUIsQ0FBQyxXQUFXLEVBQUUscUNBQTZCLENBQUMsQ0FBQztBQUVuRztJQUNFLE1BQU0sQ0FBQyxJQUFJLHVCQUFnQixDQUFDLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRUQsNEVBQTRFO0FBQzVFLElBQUksWUFBWSxHQUFHO0lBQ2pCLFdBQVcsRUFBRSxVQUFDLE9BQVksRUFBRSxjQUE4QjtRQUNsRCxXQUFZLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7Q0FDRixDQUFDO0FBRUYsMEJBQTBCLElBQVk7SUFDcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxxQ0FBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCxJQUFJLE1BQU0sR0FBRyxJQUFJLHVDQUFvQixFQUFFLENBQUM7SUFDeEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxpQ0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzQyxHQUFHLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRUQ7SUFDRSxpQ0FBZ0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNqQyxDQUFDO0FBQ0Q7SUFBQTtJQWlCQSxDQUFDO0lBaEJELGtCQUFrQjtJQUNYLDBCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGVBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdkIsU0FBUyxFQUFFO3dCQUNULHVCQUFjLEVBQUUsd0NBQThCLEVBQUUsdUJBQVU7d0JBQzFELEVBQUMsT0FBTyxFQUFFLGtEQUEwQixFQUFFLFFBQVEsRUFBRSxtREFBMkIsRUFBQzt3QkFDNUUsRUFBQyxPQUFPLEVBQUUsb0RBQTJCLEVBQUUsUUFBUSxFQUFFLHFEQUE0QixFQUFDO3dCQUM5RSxnQ0FBcUIsRUFBRSxFQUFDLE9BQU8sRUFBRSxtQkFBWSxFQUFFLFdBQVcsRUFBRSxnQ0FBcUIsRUFBQzt3QkFDbEYsRUFBQyxPQUFPLEVBQUUsbUJBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLEVBQUUsMEJBQVc7d0JBQ3JELEVBQUMsT0FBTyxFQUFFLHVCQUFnQixFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO3dCQUNwRSxFQUFDLE9BQU8sRUFBRSx3QkFBVSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxhQUFNLENBQUMsRUFBQzt3QkFDbkUsRUFBQyxPQUFPLEVBQUUsc0JBQWUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUM7cUJBQ2xFO29CQUNELE9BQU8sRUFBRSxDQUFDLHFCQUFZLEVBQUUsd0JBQWlCLENBQUM7aUJBQzNDLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFqQlksdUJBQWUsa0JBaUIzQixDQUFBIn0=