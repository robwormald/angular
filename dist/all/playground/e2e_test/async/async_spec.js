/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var e2e_util_1 = require('e2e_util/e2e_util');
describe('async', function () {
    var URL = 'all/playground/src/async/index.html';
    beforeEach(function () { return browser.get(URL); });
    it('should work with synchronous actions', function () {
        var increment = $('#increment');
        increment.$('.action').click();
        expect(increment.$('.val').getText()).toEqual('1');
    });
    it('should wait for asynchronous actions', function () {
        var timeout = $('#delayedIncrement');
        // At this point, the async action is still pending, so the count should
        // still be 0.
        expect(timeout.$('.val').getText()).toEqual('0');
        timeout.$('.action').click();
        // whenStable should only be called when the async action finished,
        // so the count should be 1 at this point.
        expect(timeout.$('.val').getText()).toEqual('1');
    });
    it('should notice when asynchronous actions are cancelled', function () {
        var timeout = $('#delayedIncrement');
        // At this point, the async action is still pending, so the count should
        // still be 0.
        expect(timeout.$('.val').getText()).toEqual('0');
        browser.ignoreSynchronization = true;
        timeout.$('.action').click();
        timeout.$('.cancel').click();
        browser.ignoreSynchronization = false;
        // whenStable should be called since the async action is cancelled. The
        // count should still be 0;
        expect(timeout.$('.val').getText()).toEqual('0');
    });
    it('should wait for a series of asynchronous actions', function () {
        var timeout = $('#multiDelayedIncrements');
        // At this point, the async action is still pending, so the count should
        // still be 0.
        expect(timeout.$('.val').getText()).toEqual('0');
        timeout.$('.action').click();
        // whenStable should only be called when all the async actions
        // finished, so the count should be 10 at this point.
        expect(timeout.$('.val').getText()).toEqual('10');
    });
    it('should wait via frameworkStabilizer', function () {
        var whenAllStable = function () {
            return browser.executeAsyncScript('window.frameworkStabilizers[0](arguments[0]);');
        };
        // This disables protractor's wait mechanism
        browser.ignoreSynchronization = true;
        var timeout = $('#multiDelayedIncrements');
        // At this point, the async action is still pending, so the count should
        // still be 0.
        expect(timeout.$('.val').getText()).toEqual('0');
        timeout.$('.action').click();
        whenAllStable().then(function (didWork) {
            // whenAllStable should only be called when all the async actions
            // finished, so the count should be 10 at this point.
            expect(timeout.$('.val').getText()).toEqual('10');
            expect(didWork).toBeTruthy(); // Work was done.
        });
        whenAllStable().then(function (didWork) {
            // whenAllStable should be called immediately since nothing is pending.
            expect(didWork).toBeFalsy(); // No work was done.
            browser.ignoreSynchronization = false;
        });
    });
    afterEach(e2e_util_1.verifyNoBrowserErrors);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvcGxheWdyb3VuZC9lMmVfdGVzdC9hc3luYy9hc3luY19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBb0MsbUJBQW1CLENBQUMsQ0FBQTtBQUV4RCxRQUFRLENBQUMsT0FBTyxFQUFFO0lBQ2hCLElBQUksR0FBRyxHQUFHLHFDQUFxQyxDQUFDO0lBRWhELFVBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO0lBRW5DLEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtRQUN6QyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUUvQixNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtRQUN6QyxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVyQyx3RUFBd0U7UUFDeEUsY0FBYztRQUNkLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpELE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFN0IsbUVBQW1FO1FBQ25FLDBDQUEwQztRQUMxQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx1REFBdUQsRUFBRTtRQUMxRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUVyQyx3RUFBd0U7UUFDeEUsY0FBYztRQUNkLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpELE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDckMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUU3QixPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzdCLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFFdEMsdUVBQXVFO1FBQ3ZFLDJCQUEyQjtRQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrREFBa0QsRUFBRTtRQUNyRCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQztRQUUzQyx3RUFBd0U7UUFDeEUsY0FBYztRQUNkLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpELE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFFN0IsOERBQThEO1FBQzlELHFEQUFxRDtRQUNyRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxxQ0FBcUMsRUFBRTtRQUN4QyxJQUFJLGFBQWEsR0FBRztZQUNsQixNQUFNLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLCtDQUErQyxDQUFDLENBQUM7UUFDckYsQ0FBQyxDQUFDO1FBRUYsNENBQTRDO1FBQzVDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFFckMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUM7UUFFM0Msd0VBQXdFO1FBQ3hFLGNBQWM7UUFDZCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqRCxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRTdCLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87WUFDM0IsaUVBQWlFO1lBQ2pFLHFEQUFxRDtZQUNyRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBRSxpQkFBaUI7UUFDbEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxhQUFhLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxPQUFPO1lBQzNCLHVFQUF1RTtZQUN2RSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBRSxvQkFBb0I7WUFDbEQsT0FBTyxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsU0FBUyxDQUFDLGdDQUFxQixDQUFDLENBQUM7QUFDbkMsQ0FBQyxDQUFDLENBQUMifQ==