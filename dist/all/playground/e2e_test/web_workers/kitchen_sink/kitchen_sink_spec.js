/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var e2e_util_1 = require('e2e_util/e2e_util');
describe('WebWorkers Kitchen Sink', function () {
    afterEach(function () {
        e2e_util_1.verifyNoBrowserErrors();
        browser.ignoreSynchronization = false;
    });
    var selector = "hello-app .greeting";
    var URL = 'all/playground/src/web_workers/kitchen_sink/index.html';
    it('should greet', function () {
        // This test can't wait for Angular 2 as Testability is not available when using WebWorker
        browser.ignoreSynchronization = true;
        browser.get(URL);
        browser.wait(protractor.until.elementLocated(by.css(selector)), 15000);
        var elem = element(by.css(selector));
        browser.wait(protractor.until.elementTextIs(elem, 'hello world!'), 5000);
        expect(elem.getText()).toEqual("hello world!");
    });
    it('should change greeting', function () {
        // This test can't wait for Angular 2 as Testability is not available when using WebWorker
        browser.ignoreSynchronization = true;
        browser.get(URL);
        var changeButtonSelector = 'hello-app .changeButton';
        browser.wait(protractor.until.elementLocated(by.css(changeButtonSelector)), 15000);
        element(by.css(changeButtonSelector)).click();
        var elem = element(by.css(selector));
        browser.wait(protractor.until.elementTextIs(elem, "howdy world!"), 5000);
        expect(elem.getText()).toEqual("howdy world!");
    });
    it("should display correct key names", function () {
        // This test can't wait for Angular 2 as Testability is not available when using WebWorker
        browser.ignoreSynchronization = true;
        browser.get(URL);
        browser.wait(protractor.until.elementLocated(by.css(".sample-area")), 15000);
        var area = element.all(by.css(".sample-area")).first();
        expect(area.getText()).toEqual('(none)');
        area.sendKeys('u');
        browser.wait(protractor.until.elementTextIs(area, "U"), 5000);
        expect(area.getText()).toEqual("U");
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2l0Y2hlbl9zaW5rX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvZTJlX3Rlc3Qvd2ViX3dvcmtlcnMva2l0Y2hlbl9zaW5rL2tpdGNoZW5fc2lua19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBb0MsbUJBQW1CLENBQUMsQ0FBQTtBQUV4RCxRQUFRLENBQUMseUJBQXlCLEVBQUU7SUFDbEMsU0FBUyxDQUFDO1FBQ1IsZ0NBQXFCLEVBQUUsQ0FBQztRQUN4QixPQUFPLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxRQUFRLEdBQUcscUJBQXFCLENBQUM7SUFDckMsSUFBSSxHQUFHLEdBQUcsd0RBQXdELENBQUM7SUFFbkUsRUFBRSxDQUFDLGNBQWMsRUFBRTtRQUNqQiwwRkFBMEY7UUFDMUYsT0FBTyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZFLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVqRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3QkFBd0IsRUFBRTtRQUMzQiwwRkFBMEY7UUFDMUYsT0FBTyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pCLElBQUksb0JBQW9CLEdBQUcseUJBQXlCLENBQUM7UUFFckQsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNuRixPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDOUMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUNyQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN6RSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtDQUFrQyxFQUFFO1FBQ3JDLDBGQUEwRjtRQUMxRixPQUFPLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFN0UsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUV6QyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9