/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var test_bed_1 = require('@angular/core/testing/test_bed');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var async_1 = require('../../../src/facade/async');
var message_bus_util_1 = require('./message_bus_util');
function main() {
    /**
     * Tests the PostMessageBus in TypeScript and the IsolateMessageBus in Dart
     */
    testing_internal_1.describe('MessageBus', function () {
        var bus;
        testing_internal_1.beforeEach(function () { bus = message_bus_util_1.createConnectedMessageBus(); });
        testing_internal_1.it('should pass messages in the same channel from sink to source', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var CHANNEL = 'CHANNEL 1';
            var MESSAGE = 'Test message';
            bus.initChannel(CHANNEL, false);
            var fromEmitter = bus.from(CHANNEL);
            async_1.ObservableWrapper.subscribe(fromEmitter, function (message) {
                testing_internal_1.expect(message).toEqual(MESSAGE);
                async.done();
            });
            var toEmitter = bus.to(CHANNEL);
            async_1.ObservableWrapper.callEmit(toEmitter, MESSAGE);
        }));
        testing_internal_1.it('should broadcast', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var CHANNEL = 'CHANNEL 1';
            var MESSAGE = 'TESTING';
            var NUM_LISTENERS = 2;
            bus.initChannel(CHANNEL, false);
            var callCount = 0;
            var emitHandler = function (message) {
                testing_internal_1.expect(message).toEqual(MESSAGE);
                callCount++;
                if (callCount == NUM_LISTENERS) {
                    async.done();
                }
            };
            for (var i = 0; i < NUM_LISTENERS; i++) {
                var emitter = bus.from(CHANNEL);
                async_1.ObservableWrapper.subscribe(emitter, emitHandler);
            }
            var toEmitter = bus.to(CHANNEL);
            async_1.ObservableWrapper.callEmit(toEmitter, MESSAGE);
        }));
        testing_internal_1.it('should keep channels independent', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var CHANNEL_ONE = 'CHANNEL 1';
            var CHANNEL_TWO = 'CHANNEL 2';
            var MESSAGE_ONE = 'This is a message on CHANNEL 1';
            var MESSAGE_TWO = 'This is a message on CHANNEL 2';
            var callCount = 0;
            bus.initChannel(CHANNEL_ONE, false);
            bus.initChannel(CHANNEL_TWO, false);
            var firstFromEmitter = bus.from(CHANNEL_ONE);
            async_1.ObservableWrapper.subscribe(firstFromEmitter, function (message) {
                testing_internal_1.expect(message).toEqual(MESSAGE_ONE);
                callCount++;
                if (callCount == 2) {
                    async.done();
                }
            });
            var secondFromEmitter = bus.from(CHANNEL_TWO);
            async_1.ObservableWrapper.subscribe(secondFromEmitter, function (message) {
                testing_internal_1.expect(message).toEqual(MESSAGE_TWO);
                callCount++;
                if (callCount == 2) {
                    async.done();
                }
            });
            var firstToEmitter = bus.to(CHANNEL_ONE);
            async_1.ObservableWrapper.callEmit(firstToEmitter, MESSAGE_ONE);
            var secondToEmitter = bus.to(CHANNEL_TWO);
            async_1.ObservableWrapper.callEmit(secondToEmitter, MESSAGE_TWO);
        }));
    });
    testing_internal_1.describe('PostMessageBusSink', function () {
        var bus;
        var CHANNEL = 'Test Channel';
        function setup(runInZone, zone) {
            bus.attachToZone(zone);
            bus.initChannel(CHANNEL, runInZone);
        }
        /**
         * Flushes pending messages and then runs the given function.
         */
        // TODO(mlaval): timeout is fragile, test to be rewritten
        function flushMessages(fn) { async_1.TimerWrapper.setTimeout(fn, 50); }
        testing_internal_1.it('should buffer messages and wait for the zone to exit before sending', test_bed_1.withProviders(function () { return [{ provide: core_1.NgZone, useClass: testing_internal_1.MockNgZone }]; })
            .inject([testing_internal_1.AsyncTestCompleter, core_1.NgZone], function (async, zone) {
            bus = message_bus_util_1.createConnectedMessageBus();
            setup(true, zone);
            var wasCalled = false;
            async_1.ObservableWrapper.subscribe(bus.from(CHANNEL), function (message) { wasCalled = true; });
            async_1.ObservableWrapper.callEmit(bus.to(CHANNEL), 'hi');
            flushMessages(function () {
                testing_internal_1.expect(wasCalled).toBeFalsy();
                zone.simulateZoneExit();
                flushMessages(function () {
                    testing_internal_1.expect(wasCalled).toBeTruthy();
                    async.done();
                });
            });
        }), 500);
        testing_internal_1.it('should send messages immediatly when run outside the zone', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, core_1.NgZone], function (async, zone) {
            bus = message_bus_util_1.createConnectedMessageBus();
            setup(false, zone);
            var wasCalled = false;
            async_1.ObservableWrapper.subscribe(bus.from(CHANNEL), function (message) { wasCalled = true; });
            async_1.ObservableWrapper.callEmit(bus.to(CHANNEL), 'hi');
            flushMessages(function () {
                testing_internal_1.expect(wasCalled).toBeTruthy();
                async.done();
            });
        }), 10000);
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9idXNfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci90ZXN0L3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1c19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBcUIsZUFBZSxDQUFDLENBQUE7QUFDckMseUJBQTRCLGdDQUFnQyxDQUFDLENBQUE7QUFDN0QsaUNBQTRHLHdDQUF3QyxDQUFDLENBQUE7QUFHckosc0JBQThDLDJCQUEyQixDQUFDLENBQUE7QUFFMUUsaUNBQXdDLG9CQUFvQixDQUFDLENBQUE7QUFFN0Q7SUFDRTs7T0FFRztJQUNILDJCQUFRLENBQUMsWUFBWSxFQUFFO1FBQ3JCLElBQUksR0FBZSxDQUFDO1FBRXBCLDZCQUFVLENBQUMsY0FBUSxHQUFHLEdBQUcsNENBQXlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpELHFCQUFFLENBQUMsOERBQThELEVBQzlELHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsSUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDO1lBQzVCLElBQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQztZQUMvQixHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUVoQyxJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BDLHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsVUFBQyxPQUFZO2dCQUNwRCx5QkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJ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