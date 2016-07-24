/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var serialized_types_1 = require('@angular/platform-browser/src/web_workers/shared/serialized_types');
var platform_location_1 = require('@angular/platform-browser/src/web_workers/worker/platform_location');
var async_1 = require('../../../src/facade/async');
var web_worker_test_util_1 = require('../shared/web_worker_test_util');
var spies_1 = require('./spies');
function main() {
    testing_internal_1.describe('WebWorkerPlatformLocation', function () {
        var uiBus = null;
        var workerBus = null;
        var broker = null;
        var TEST_LOCATION = new serialized_types_1.LocationType('http://www.example.com', 'http', 'example.com', 'example.com', '80', '/', '', '', 'http://www.example.com');
        function createWebWorkerPlatformLocation(loc) {
            broker.spy('runOnService').andCallFake(function (args, returnType) {
                if (args.method === 'getLocation') {
                    return async_1.PromiseWrapper.resolve(loc);
                }
            });
            var factory = new web_worker_test_util_1.MockMessageBrokerFactory(broker);
            return new platform_location_1.WebWorkerPlatformLocation(factory, workerBus, null);
        }
        function testPushOrReplaceState(pushState) {
            var platformLocation = createWebWorkerPlatformLocation(null);
            var TITLE = 'foo';
            var URL = 'http://www.example.com/foo';
            web_worker_test_util_1.expectBrokerCall(broker, pushState ? 'pushState' : 'replaceState', [null, TITLE, URL]);
            if (pushState) {
                platformLocation.pushState(null, TITLE, URL);
            }
            else {
                platformLocation.replaceState(null, TITLE, URL);
            }
        }
        testing_internal_1.beforeEach(function () {
            var buses = web_worker_test_util_1.createPairedMessageBuses();
            uiBus = buses.ui;
            workerBus = buses.worker;
            workerBus.initChannel('ng-Router');
            uiBus.initChannel('ng-Router');
            broker = new spies_1.SpyMessageBroker();
        });
        testing_internal_1.it('should throw if getBaseHrefFromDOM is called', function () {
            var platformLocation = createWebWorkerPlatformLocation(null);
            testing_internal_1.expect(function () { return platformLocation.getBaseHrefFromDOM(); }).toThrowError();
        });
        testing_internal_1.it('should get location on init', function () {
            var platformLocation = createWebWorkerPlatformLocation(null);
            web_worker_test_util_1.expectBrokerCall(broker, 'getLocation');
            platformLocation.init();
        });
        testing_internal_1.it('should throw if set pathname is called before init finishes', function () {
            var platformLocation = createWebWorkerPlatformLocation(null);
            platformLocation.init();
            testing_internal_1.expect(function () { return platformLocation.pathname = 'TEST'; }).toThrowError();
        });
        testing_internal_1.it('should send pathname to render thread', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var platformLocation = createWebWorkerPlatformLocation(TEST_LOCATION);
            platformLocation.init().then(function (_) {
                var PATHNAME = '/test';
                web_worker_test_util_1.expectBrokerCall(broker, 'setPathname', [PATHNAME]);
                platformLocation.pathname = PATHNAME;
                async.done();
            });
        }));
        testing_internal_1.it('should send pushState to render thread', function () { testPushOrReplaceState(true); });
        testing_internal_1.it('should send replaceState to render thread', function () { testPushOrReplaceState(false); });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fbG9jYXRpb25fc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci90ZXN0L3dlYl93b3JrZXJzL3dvcmtlci9wbGF0Zm9ybV9sb2NhdGlvbl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBZ0csd0NBQXdDLENBQUMsQ0FBQTtBQUd6SSxpQ0FBMkIsbUVBQW1FLENBQUMsQ0FBQTtBQUMvRixrQ0FBd0Msb0VBQW9FLENBQUMsQ0FBQTtBQUU3RyxzQkFBNkIsMkJBQTJCLENBQUMsQ0FBQTtBQUV6RCxxQ0FBbUYsZ0NBQWdDLENBQUMsQ0FBQTtBQUVwSCxzQkFBK0IsU0FBUyxDQUFDLENBQUE7QUFFekM7SUFDRSwyQkFBUSxDQUFDLDJCQUEyQixFQUFFO1FBQ3BDLElBQUksS0FBSyxHQUFlLElBQUksQ0FBQztRQUM3QixJQUFJLFNBQVMsR0FBZSxJQUFJLENBQUM7UUFDakMsSUFBSSxNQUFNLEdBQVEsSUFBSSxDQUFDO1FBQ3ZCLElBQUksYUFBYSxHQUFHLElBQUksK0JBQVksQ0FDaEMsd0JBQXdCLEVBQUUsTUFBTSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUNqRix3QkFBd0IsQ0FBQyxDQUFDO1FBRzlCLHlDQUF5QyxHQUFpQjtZQUN4RCxNQUFNLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxVQUFDLElBQWlCLEVBQUUsVUFBZ0I7Z0JBQ3pFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDbEMsTUFBTSxDQUFDLHNCQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO1lBQ0gsQ0FBQyxDQUFDLENB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