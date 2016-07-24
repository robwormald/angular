/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var browser_platform_location_1 = require('../../browser/location/browser_platform_location');
var async_1 = require('../../facade/async');
var lang_1 = require('../../facade/lang');
var message_bus_1 = require('../shared/message_bus');
var messaging_api_1 = require('../shared/messaging_api');
var serialized_types_1 = require('../shared/serialized_types');
var serializer_1 = require('../shared/serializer');
var service_message_broker_1 = require('../shared/service_message_broker');
var MessageBasedPlatformLocation = (function () {
    function MessageBasedPlatformLocation(_brokerFactory, _platformLocation, bus, _serializer) {
        this._brokerFactory = _brokerFactory;
        this._platformLocation = _platformLocation;
        this._serializer = _serializer;
        this._platformLocation.onPopState(lang_1.FunctionWrapper.bind(this._sendUrlChangeEvent, this));
        this._platformLocation.onHashChange(lang_1.FunctionWrapper.bind(this._sendUrlChangeEvent, this));
        this._broker = this._brokerFactory.createMessageBroker(messaging_api_1.ROUTER_CHANNEL);
        this._channelSink = bus.to(messaging_api_1.ROUTER_CHANNEL);
    }
    MessageBasedPlatformLocation.prototype.start = function () {
        this._broker.registerMethod('getLocation', null, lang_1.FunctionWrapper.bind(this._getLocation, this), serialized_types_1.LocationType);
        this._broker.registerMethod('setPathname', [serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._setPathname, this));
        this._broker.registerMethod('pushState', [serializer_1.PRIMITIVE, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._platformLocation.pushState, this._platformLocation));
        this._broker.registerMethod('replaceState', [serializer_1.PRIMITIVE, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._platformLocation.replaceState, this._platformLocation));
        this._broker.registerMethod('forward', null, lang_1.FunctionWrapper.bind(this._platformLocation.forward, this._platformLocation));
        this._broker.registerMethod('back', null, lang_1.FunctionWrapper.bind(this._platformLocation.back, this._platformLocation));
    };
    MessageBasedPlatformLocation.prototype._getLocation = function () {
        return async_1.PromiseWrapper.resolve(this._platformLocation.location);
    };
    MessageBasedPlatformLocation.prototype._sendUrlChangeEvent = function (e) {
        var loc = this._serializer.serialize(this._platformLocation.location, serialized_types_1.LocationType);
        var serializedEvent = { 'type': e.type };
        async_1.ObservableWrapper.callEmit(this._channelSink, { 'event': serializedEvent, 'location': loc });
    };
    MessageBasedPlatformLocation.prototype._setPathname = function (pathname) { this._platformLocation.pathname = pathname; };
    /** @nocollapse */
    MessageBasedPlatformLocation.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MessageBasedPlatformLocation.ctorParameters = [
        { type: service_message_broker_1.ServiceMessageBrokerFactory, },
        { type: browser_platform_location_1.BrowserPlatformLocation, },
        { type: message_bus_1.MessageBus, },
        { type: serializer_1.Serializer, },
    ];
    return MessageBasedPlatformLocation;
}());
exports.MessageBasedPlatformLocation = MessageBasedPlatformLocation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvc3JjL3dlYl93b3JrZXJzL3VpL3BsYXRmb3JtX2xvY2F0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFHSCxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFFekMsMENBQXNDLGtEQUFrRCxDQUFDLENBQUE7QUFDekYsc0JBQThELG9CQUFvQixDQUFDLENBQUE7QUFDbkYscUJBQThCLG1CQUFtQixDQUFDLENBQUE7QUFDbEQsNEJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFDakQsOEJBQTZCLHlCQUF5QixDQUFDLENBQUE7QUFDdkQsaUNBQTJCLDRCQUE0QixDQUFDLENBQUE7QUFDeEQsMkJBQW9DLHNCQUFzQixDQUFDLENBQUE7QUFDM0QsdUNBQWdFLGtDQUFrQyxDQUFDLENBQUE7QUFDbkc7SUFJRSxzQ0FDWSxjQUEyQyxFQUMzQyxpQkFBMEMsRUFBRSxHQUFlLEVBQzNELFdBQXVCO1FBRnZCLG1CQUFjLEdBQWQsY0FBYyxDQUE2QjtRQUMzQyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQXlCO1FBQzFDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQ2pDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQ1Ysc0JBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDN0UsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FDWixzQkFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM3RSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsOEJBQWMsQ0FBQyxDQUFDO1FBQ3ZF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