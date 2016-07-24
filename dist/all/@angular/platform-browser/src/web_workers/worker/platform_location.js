/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var async_1 = require('../../facade/async');
var collection_1 = require('../../facade/collection');
var exceptions_1 = require('../../facade/exceptions');
var lang_1 = require('../../facade/lang');
var client_message_broker_1 = require('../shared/client_message_broker');
var message_bus_1 = require('../shared/message_bus');
var messaging_api_1 = require('../shared/messaging_api');
var serialized_types_1 = require('../shared/serialized_types');
var serializer_1 = require('../shared/serializer');
var event_deserializer_1 = require('./event_deserializer');
var WebWorkerPlatformLocation = (function (_super) {
    __extends(WebWorkerPlatformLocation, _super);
    function WebWorkerPlatformLocation(brokerFactory, bus, _serializer) {
        var _this = this;
        _super.call(this);
        this._serializer = _serializer;
        this._popStateListeners = [];
        this._hashChangeListeners = [];
        this._location = null;
        this._broker = brokerFactory.createMessageBroker(messaging_api_1.ROUTER_CHANNEL);
        this._channelSource = bus.from(messaging_api_1.ROUTER_CHANNEL);
        async_1.ObservableWrapper.subscribe(this._channelSource, function (msg) {
            var listeners = null;
            if (collection_1.StringMapWrapper.contains(msg, 'event')) {
                var type = msg['event']['type'];
                if (lang_1.StringWrapper.equals(type, 'popstate')) {
                    listeners = _this._popStateListeners;
                }
                else if (lang_1.StringWrapper.equals(type, 'hashchange')) {
                    listeners = _this._hashChangeListeners;
                }
                if (listeners !== null) {
                    var e_1 = event_deserializer_1.deserializeGenericEvent(msg['event']);
                    // There was a popState or hashChange event, so the location object thas been updated
                    _this._location = _this._serializer.deserialize(msg['location'], serialized_types_1.LocationType);
                    listeners.forEach(function (fn) { return fn(e_1); });
                }
            }
        });
    }
    /** @internal **/
    WebWorkerPlatformLocation.prototype.init = function () {
        var _this = this;
        var args = new client_message_broker_1.UiArguments('getLocation');
        var locationPromise = this._broker.runOnService(args, serialized_types_1.LocationType);
        return async_1.PromiseWrapper.then(locationPromise, function (val) {
            _this._location = val;
            return true;
        }, function (err) { throw new exceptions_1.BaseException(err); });
    };
    WebWorkerPlatformLocation.prototype.getBaseHrefFromDOM = function () {
        throw new exceptions_1.BaseException('Attempt to get base href from DOM from WebWorker. You must either provide a value for the APP_BASE_HREF token through DI or use the hash location strategy.');
    };
    WebWorkerPlatformLocation.prototype.onPopState = function (fn) { this._popStateListeners.push(fn); };
    WebWorkerPlatformLocation.prototype.onHashChange = function (fn) { this._hashChangeListeners.push(fn); };
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "pathname", {
        get: function () {
            if (this._location === null) {
                return null;
            }
            return this._location.pathname;
        },
        set: function (newPath) {
            if (this._location === null) {
                throw new exceptions_1.BaseException('Attempt to set pathname before value is obtained from UI');
            }
            this._location.pathname = newPath;
            var fnArgs = [new client_message_broker_1.FnArg(newPath, serializer_1.PRIMITIVE)];
            var args = new client_message_broker_1.UiArguments('setPathname', fnArgs);
            this._broker.runOnService(args, null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "search", {
        get: function () {
            if (this._location === null) {
                return null;
            }
            return this._location.search;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WebWorkerPlatformLocation.prototype, "hash", {
        get: function () {
            if (this._location === null) {
                return null;
            }
            return this._location.hash;
        },
        enumerable: true,
        configurable: true
    });
    WebWorkerPlatformLocation.prototype.pushState = function (state, title, url) {
        var fnArgs = [new client_message_broker_1.FnArg(state, serializer_1.PRIMITIVE), new client_message_broker_1.FnArg(title, serializer_1.PRIMITIVE), new client_message_broker_1.FnArg(url, serializer_1.PRIMITIVE)];
        var args = new client_message_broker_1.UiArguments('pushState', fnArgs);
        this._broker.runOnService(args, null);
    };
    WebWorkerPlatformLocation.prototype.replaceState = function (state, title, url) {
        var fnArgs = [new client_message_broker_1.FnArg(state, serializer_1.PRIMITIVE), new client_message_broker_1.FnArg(title, serializer_1.PRIMITIVE), new client_message_broker_1.FnArg(url, serializer_1.PRIMITIVE)];
        var args = new client_message_broker_1.UiArguments('replaceState', fnArgs);
        this._broker.runOnService(args, null);
    };
    WebWorkerPlatformLocation.prototype.forward = function () {
        var args = new client_message_broker_1.UiArguments('forward');
        this._broker.runOnService(args, null);
    };
    WebWorkerPlatformLocation.prototype.back = function () {
        var args = new client_message_broker_1.UiArguments('back');
        this._broker.runOnService(args, null);
    };
    /** @nocollapse */
    WebWorkerPlatformLocation.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    WebWorkerPlatformLocation.ctorParameters = [
        { type: client_message_broker_1.ClientMessageBrokerFactory, },
        { type: message_bus_1.MessageBus, },
        { type: serializer_1.Serializer, },
    ];
    return WebWorkerPlatformLocation;
}(common_1.PlatformLocation));
exports.WebWorkerPlatformLocation = WebWorkerPlatformLocation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9wbGF0Zm9ybV9sb2NhdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCx1QkFBa0QsaUJBQWlCLENBQUMsQ0FBQTtBQUNwRSxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFFekMsc0JBQThELG9CQUFvQixDQUFDLENBQUE7QUFDbkYsMkJBQStCLHlCQUF5QixDQUFDLENBQUE7QUFDekQsMkJBQTRCLHlCQUF5QixDQUFDLENBQUE7QUFDdEQscUJBQTRCLG1CQUFtQixDQUFDLENBQUE7QUFDaEQsc0NBQWtGLGlDQUFpQyxDQUFDLENBQUE7QUFDcEgsNEJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFDakQsOEJBQTZCLHlCQUF5QixDQUFDLENBQUE7QUFDdkQsaUNBQTJCLDRCQUE0QixDQUFDLENBQUE7QUFDeEQsMkJBQW9DLHNCQUFzQixDQUFDLENBQUE7QUFFM0QsbUNBQXNDLHNCQUFzQixDQUFDLENBQUE7QUFDN0Q7SUFBK0MsNkNBQWdCO0lBTzdELG1DQUNJLGFBQXlDLEVBQUUsR0FBZSxFQUFVLFdBQXVCO1FBUmpHLGlCQTZIQztRQXBIRyxpQkFBTyxDQUFDO1FBRDhELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBTnZGLHVCQUFrQixHQUFvQixFQUFFLENBQUM7UUFDekMseUJBQW9CLEdBQW9CLEVBQUUsQ0FBQztRQUMzQyxjQUFTLEdBQWlCLElBQUksQ0FBQztRQU1yQyxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyw4QkFBYyxDQUFDLENBQUM7UUFFakUsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLDhCQUFjLENBQUMsQ0FBQztR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