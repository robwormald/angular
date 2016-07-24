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
var client_message_broker_1 = require('@angular/platform-browser/src/web_workers/shared/client_message_broker');
var message_bus_1 = require('@angular/platform-browser/src/web_workers/shared/message_bus');
var async_1 = require('../../../src/facade/async');
var collection_1 = require('../../../src/facade/collection');
var exceptions_1 = require('../../../src/facade/exceptions');
var lang_1 = require('../../../src/facade/lang');
var mock_event_emitter_1 = require('./mock_event_emitter');
var __unused; // avoid unused import when Promise union types are erased
/**
 * Returns two MessageBus instances that are attached to each other.
 * Such that whatever goes into one's sink comes out the others source.
 */
function createPairedMessageBuses() {
    var firstChannels = {};
    var workerMessageBusSink = new MockMessageBusSink(firstChannels);
    var uiMessageBusSource = new MockMessageBusSource(firstChannels);
    var secondChannels = {};
    var uiMessageBusSink = new MockMessageBusSink(secondChannels);
    var workerMessageBusSource = new MockMessageBusSource(secondChannels);
    return new PairedMessageBuses(new MockMessageBus(uiMessageBusSink, uiMessageBusSource), new MockMessageBus(workerMessageBusSink, workerMessageBusSource));
}
exports.createPairedMessageBuses = createPairedMessageBuses;
/**
 * Spies on the given {@link SpyMessageBroker} and expects a call with the given methodName
 * andvalues.
 * If a handler is provided it will be called to handle the request.
 * Only intended to be called on a given broker instance once.
 */
function expectBrokerCall(broker, methodName, vals, handler) {
    broker.spy('runOnService').andCallFake(function (args, returnType) {
        expect(args.method).toEqual(methodName);
        if (lang_1.isPresent(vals)) {
            expect(args.args.length).toEqual(vals.length);
            collection_1.ListWrapper.forEachWithIndex(vals, function (v, i) { expect(v).toEqual(args.args[i].value); });
        }
        var promise = null;
        if (lang_1.isPresent(handler)) {
            var givenValues = args.args.map(function (arg) { return arg.value; });
            if (givenValues.length > 0) {
                promise = handler(givenValues);
            }
            else {
                promise = handler();
            }
        }
        if (promise == null) {
            promise = async_1.PromiseWrapper.wrap(function () { });
        }
        return promise;
    });
}
exports.expectBrokerCall = expectBrokerCall;
var PairedMessageBuses = (function () {
    function PairedMessageBuses(ui, worker) {
        this.ui = ui;
        this.worker = worker;
    }
    return PairedMessageBuses;
}());
exports.PairedMessageBuses = PairedMessageBuses;
var MockMessageBusSource = (function () {
    function MockMessageBusSource(_channels) {
        this._channels = _channels;
    }
    MockMessageBusSource.prototype.initChannel = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        if (!collection_1.StringMapWrapper.contains(this._channels, channel)) {
            this._channels[channel] = new mock_event_emitter_1.MockEventEmitter();
        }
    };
    MockMessageBusSource.prototype.from = function (channel) {
        if (!collection_1.StringMapWrapper.contains(this._channels, channel)) {
            throw new exceptions_1.BaseException(channel + " is not set up. Did you forget to call initChannel?");
        }
        return this._channels[channel];
    };
    MockMessageBusSource.prototype.attachToZone = function (zone) { };
    return MockMessageBusSource;
}());
exports.MockMessageBusSource = MockMessageBusSource;
var MockMessageBusSink = (function () {
    function MockMessageBusSink(_channels) {
        this._channels = _channels;
    }
    MockMessageBusSink.prototype.initChannel = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        if (!collection_1.StringMapWrapper.contains(this._channels, channel)) {
            this._channels[channel] = new mock_event_emitter_1.MockEventEmitter();
        }
    };
    MockMessageBusSink.prototype.to = function (channel) {
        if (!collection_1.StringMapWrapper.contains(this._channels, channel)) {
            this._channels[channel] = new mock_event_emitter_1.MockEventEmitter();
        }
        return this._channels[channel];
    };
    MockMessageBusSink.prototype.attachToZone = function (zone) { };
    return MockMessageBusSink;
}());
exports.MockMessageBusSink = MockMessageBusSink;
/**
 * Mock implementation of the {@link MessageBus} for tests.
 * Runs syncronously, and does not support running within the zone.
 */
var MockMessageBus = (function (_super) {
    __extends(MockMessageBus, _super);
    function MockMessageBus(sink, source) {
        _super.call(this);
        this.sink = sink;
        this.source = source;
    }
    MockMessageBus.prototype.initChannel = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        this.sink.initChannel(channel, runInZone);
        this.source.initChannel(channel, runInZone);
    };
    MockMessageBus.prototype.to = function (channel) { return this.sink.to(channel); };
    MockMessageBus.prototype.from = function (channel) { return this.source.from(channel); };
    MockMessageBus.prototype.attachToZone = function (zone) { };
    return MockMessageBus;
}(message_bus_1.MessageBus));
exports.MockMessageBus = MockMessageBus;
var MockMessageBrokerFactory = (function (_super) {
    __extends(MockMessageBrokerFactory, _super);
    function MockMessageBrokerFactory(_messageBroker) {
        _super.call(this, null, null);
        this._messageBroker = _messageBroker;
    }
    MockMessageBrokerFactory.prototype.createMessageBroker = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        return this._messageBroker;
    };
    return MockMessageBrokerFactory;
}(client_message_broker_1.ClientMessageBrokerFactory_));
exports.MockMessageBrokerFactory = MockMessageBrokerFactory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViX3dvcmtlcl90ZXN0X3V0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdC93ZWJfd29ya2Vycy9zaGFyZWQvd2ViX3dvcmtlcl90ZXN0X3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBR0gsc0NBQTRFLHdFQUF3RSxDQUFDLENBQUE7QUFDckosNEJBQTJELDhEQUE4RCxDQUFDLENBQUE7QUFFMUgsc0JBQTZCLDJCQUEyQixDQUFDLENBQUE7QUFDekQsMkJBQTRDLGdDQUFnQyxDQUFDLENBQUE7QUFDN0UsMkJBQTRCLGdDQUFnQyxDQUFDLENBQUE7QUFDN0QscUJBQThCLDBCQUEwQixDQUFDLENBQUE7QUFHekQsbUNBQStCLHNCQUFzQixDQUFDLENBQUE7QUFFdEQsSUFBSSxRQUFzQixDQUFDLENBQUUsMERBQTBEO0FBRXZGOzs7R0FHRztBQUNIO0lBQ0UsSUFBSSxhQUFhLEdBQTJDLEVBQUUsQ0FBQztJQUMvRCxJQUFJLG9CQUFvQixHQUFHLElBQUksa0JBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7SUFDakUsSUFBSSxrQkFBa0IsR0FBRyxJQUFJLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBRWpFLElBQUksY0FBYyxHQUEyQyxFQUFFLENBQUM7SUFDaEUsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzlELElBQUksc0JBQXNCLEdBQUcsSUFBSSxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUV0RSxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FDekIsSUFBSSxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsa0JBQWtCLENBQUMsRUFDeEQsSUFBSSxjQUFjLENBQUMsb0JBQW9CLEVBQUUsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO0FBQ3hF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