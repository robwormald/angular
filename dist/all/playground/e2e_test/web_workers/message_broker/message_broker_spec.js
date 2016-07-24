/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var e2e_util_1 = require('e2e_util/e2e_util');
var URL = 'all/playground/src/web_workers/message_broker/index.html';
describe("MessageBroker", function () {
    afterEach(function () {
        e2e_util_1.verifyNoBrowserErrors();
        browser.ignoreSynchronization = false;
    });
    it("should bootstrap", function () {
        // This test can't wait for Angular 2 as Testability is not available when using WebWorker
        browser.ignoreSynchronization = true;
        browser.get(URL);
        waitForBootstrap();
        expect(element(by.css("app h1")).getText()).toEqual("WebWorker MessageBroker Test");
    });
    it("should echo messages", function () {
        var VALUE = "Hi There";
        // This test can't wait for Angular 2 as Testability is not available when using WebWorker
        browser.ignoreSynchronization = true;
        browser.get(URL);
        waitForBootstrap();
        var input = element.all(by.css("#echo_input")).first();
        input.sendKeys(VALUE);
        element(by.css("#send_echo")).click();
        var area = element(by.css("#echo_result"));
        browser.wait(protractor.until.elementTextIs(area, VALUE), 5000);
        expect(area.getText()).toEqual(VALUE);
    });
});
function waitForBootstrap() {
    browser.wait(protractor.until.elementLocated(by.css("app h1")), 15000);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9icm9rZXJfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvcGxheWdyb3VuZC9lMmVfdGVzdC93ZWJfd29ya2Vycy9tZXNzYWdlX2Jyb2tlci9tZXNzYWdlX2Jyb2tlcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBb0MsbUJBQW1CLENBQUMsQ0FBQTtBQUV4RCxJQUFJLEdBQUcsR0FBRywwREFBMEQsQ0FBQztBQUVyRSxRQUFRLENBQUMsZUFBZSxFQUFFO0lBRXhCLFNBQVMsQ0FBQztRQUNSLGdDQUFxQixFQUFFLENBQUM7UUFDeEIsT0FBTyxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrQkFBa0IsRUFBRTtRQUNyQiwwRkFBMEY7UUFDMUYsT0FBTyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLGdCQUFnQixFQUFFLENBQUM7UUFDbkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUN0RixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxzQkFBc0IsRUFBRTtRQUN6QixJQUFNLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDekIsMEZBQTBGO1FBQzFGLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixnQkFBZ0IsRUFBRSxDQUFDO1FBRW5CLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZELEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEIsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUN0QyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1FBQzNDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVIO0lBQ0UsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDekUsQ0FBQyJ9