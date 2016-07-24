/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var _global = (typeof window === 'undefined' ? global : window);
/**
 * Wraps a test function in an asynchronous test zone. The test will automatically
 * complete when all asynchronous calls within this zone are done. Can be used
 * to wrap an {@link inject} call.
 *
 * Example:
 *
 * ```
 * it('...', async(inject([AClass], (object) => {
 *   object.doSomething.then(() => {
 *     expect(...);
 *   })
 * });
 * ```
 *
 * @stable
 */
function async(fn) {
    // If we're running using the Jasmine test framework, adapt to call the 'done'
    // function when asynchronous activity is finished.
    if (_global.jasmine) {
        return function (done) {
            runInTestZone(fn, done, function (err) {
                if (typeof err === 'string') {
                    return done.fail(new Error(err));
                }
                else {
                    done.fail(err);
                }
            });
        };
    }
    // Otherwise, return a promise which will resolve when asynchronous activity
    // is finished. This will be correctly consumed by the Mocha framework with
    // it('...', async(myFn)); or can be used in a custom framework.
    return function () { return new Promise(function (finishCallback, failCallback) {
        runInTestZone(fn, finishCallback, failCallback);
    }); };
}
exports.async = async;
function runInTestZone(fn, finishCallback, failCallback) {
    var AsyncTestZoneSpec = Zone['AsyncTestZoneSpec'];
    if (AsyncTestZoneSpec === undefined) {
        throw new Error('AsyncTestZoneSpec is needed for the async() test helper but could not be found. ' +
            'Please make sure that your environment includes zone.js/dist/async-test.js');
    }
    var testZoneSpec = new AsyncTestZoneSpec(finishCallback, failCallback, 'test');
    var testZone = Zone.current.fork(testZoneSpec);
    return testZone.run(fn);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvdGVzdGluZy9hc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBSUgsSUFBSSxPQUFPLEdBQVEsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBRXJFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsZUFBc0IsRUFBWTtJQUNoQyw4RUFBOEU7SUFDOUUsbURBQW1EO0lBQ25ELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxVQUFDLElBQVM7WUFDZixhQUFhLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFDLEdBQW1CO2dCQUMxQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUM1QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRCw0RUFBNEU7SUFDNUUsMkVBQTJFO0lBQzNFLGdFQUFnRTtJQUNoRSxNQUFNLENBQUMsY0FBTSxPQUFBLElBQUksT0FBTyxDQUFPLFVBQUMsY0FBYyxFQUFFLFlBQVk7UUFDbkQsYUFBYSxDQUFDLEVBQUUsRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFDbEQsQ0FBQyxDQUFDLEVBRkksQ0FFSixDQUFDO0FBQ1osQ0FBQztBQXBCZSxhQUFLLFFBb0JwQixDQUFBO0FBRUQsdUJBQXVCLEVBQVksRUFBRSxjQUF3QixFQUFFLFlBQXNCO0lBQ25GLElBQUksaUJBQWlCLEdBQUksSUFBOEIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQzdFLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsTUFBTSxJQUFJLEtBQUssQ0FDWCxrRkFBa0Y7WUFDbEYsNEVBQTRFLENBQUMsQ0FBQztJQUNwRixDQUFDO0lBQ0QsSUFBSSxZQUFZLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsWUFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQy9FLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==