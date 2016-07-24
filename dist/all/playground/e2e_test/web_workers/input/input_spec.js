/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var e2e_util_1 = require('e2e_util/e2e_util');
describe('WebWorkers Input', function () {
    afterEach(function () {
        e2e_util_1.verifyNoBrowserErrors();
        browser.ignoreSynchronization = false;
    });
    var selector = 'input-app';
    var URL = 'all/playground/src/web_workers/input/index.html';
    var VALUE = 'test val';
    it('should bootstrap', function () {
        // This test can't wait for Angular 2 as Testability is not available when using WebWorker
        browser.ignoreSynchronization = true;
        browser.get(URL);
        waitForBootstrap();
        var elem = element(by.css(selector + ' h2'));
        expect(elem.getText()).toEqual('Input App');
    });
    it('should bind to input value', function () {
        // This test can't wait for Angular 2 as Testability is not available when using WebWorker
        browser.ignoreSynchronization = true;
        browser.get(URL);
        waitForBootstrap();
        var input = element(by.css(selector + ' input'));
        input.sendKeys(VALUE);
        var displayElem = element(by.css(selector + ' .input-val'));
        var expectedVal = "Input val is " + VALUE + ".";
        browser.wait(protractor.until.elementTextIs(displayElem, expectedVal), 5000);
        expect(displayElem.getText()).toEqual(expectedVal);
    });
    it('should bind to textarea value', function () {
        // This test can't wait for Angular 2 as Testability is not available when using WebWorker
        browser.ignoreSynchronization = true;
        browser.get(URL);
        waitForBootstrap();
        var input = element(by.css(selector + ' textarea'));
        input.sendKeys(VALUE);
        var displayElem = element(by.css(selector + ' .textarea-val'));
        var expectedVal = "Textarea val is " + VALUE + ".";
        browser.wait(protractor.until.elementTextIs(displayElem, expectedVal), 5000);
        expect(displayElem.getText()).toEqual(expectedVal);
    });
    function waitForBootstrap() {
        browser
            .wait(protractor.until.elementLocated(by.css(selector + ' h2')), 5000)
            .then(function (_) {
            var elem = element(by.css(selector + ' h2'));
            browser.wait(protractor.until.elementTextIs(elem, 'Input App'), 5000);
        }, function (_) {
            // jasmine will timeout if this gets called too many times
            console.log('>> unexpected timeout -> browser.refresh()');
            browser.refresh();
            waitForBootstrap();
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXRfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvcGxheWdyb3VuZC9lMmVfdGVzdC93ZWJfd29ya2Vycy9pbnB1dC9pbnB1dF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBb0MsbUJBQW1CLENBQUMsQ0FBQTtBQUV4RCxRQUFRLENBQUMsa0JBQWtCLEVBQUU7SUFDM0IsU0FBUyxDQUFDO1FBQ1IsZ0NBQXFCLEVBQUUsQ0FBQztRQUN4QixPQUFPLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDO0lBQzdCLElBQU0sR0FBRyxHQUFHLGlEQUFpRCxDQUFDO0lBQzlELElBQU0sS0FBSyxHQUFHLFVBQVUsQ0FBQztJQUV6QixFQUFFLENBQUMsa0JBQWtCLEVBQUU7UUFDckIsMEZBQTBGO1FBQzFGLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQixnQkFBZ0IsRUFBRSxDQUFDO1FBQ25CLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNEJBQTRCLEVBQUU7UUFDL0IsMEZBQTBGO1FBQzFGLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVqQixnQkFBZ0IsRUFBRSxDQUFDO1FBQ25CLElBQUks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