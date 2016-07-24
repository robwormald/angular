/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var e2e_util_1 = require('e2e_util/e2e_util');
function waitForElement(selector /** TODO #9100 */) {
    var EC = protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be present on the dom.
    browser.wait(EC.presenceOf($(selector)), 20000);
}
describe('deprecated routing inbox-app', function () {
    afterEach(e2e_util_1.verifyNoBrowserErrors);
    describe('index view', function () {
        var URL = 'all/playground/src/routing_deprecated/';
        it('should list out the current collection of items', function () {
            browser.get(URL);
            waitForElement('.inbox-item-record');
            expect(element.all(by.css('.inbox-item-record')).count()).toEqual(200);
        });
        it('should build a link which points to the detail page', function () {
            browser.get(URL);
            waitForElement('#item-15');
            expect(element(by.css('#item-15')).getAttribute('href')).toMatch(/#\/detail\/15$/);
            element(by.css('#item-15')).click();
            waitForElement('#record-id');
            expect(browser.getCurrentUrl()).toMatch(/\/detail\/15$/);
        });
    });
    describe('drafts view', function () {
        var URL = 'all/playground/src/routing_deprecated/#/drafts';
        it('should navigate to the drafts view when the drafts link is clicked', function () {
            browser.get(URL);
            waitForElement('.inbox-item-record');
            element(by.linkText('Drafts')).click();
            waitForElement('.page-title');
            expect(element(by.css('.page-title')).getText()).toEqual('Drafts');
        });
        it('should navigate to email details', function () {
            browser.get(URL);
            element(by.linkText('Drafts')).click();
            waitForElement('.inbox-item-record');
            expect(element.all(by.css('.inbox-item-record')).count()).toEqual(2);
            expect(element(by.css('#item-201')).getAttribute('href')).toMatch(/#\/detail\/201$/);
            element(by.css('#item-201')).click();
            waitForElement('#record-id');
            expect(browser.getCurrentUrl()).toMatch(/\/detail\/201$/);
        });
    });
    describe('detail view', function () {
        var URL = 'all/playground/src/routing_deprecated/';
        it('should navigate to the detail view when an email is clicked', function () {
            browser.get(URL);
            waitForElement('#item-10');
            element(by.css('#item-10')).click();
            waitForElement('#record-id');
            var recordId = element(by.css("#record-id"));
            browser.wait(protractor.until.elementTextIs(recordId, "ID: 10"), 5000);
            expect(recordId.getText()).toEqual('ID: 10');
        });
        it('should navigate back to the email inbox page when the back button is clicked', function () {
            browser.get(URL);
            waitForElement('#item-10');
            element(by.css('#item-10')).click();
            waitForElement('.back-button');
            element(by.css('.back-button')).click();
            expect(browser.getCurrentUrl()).toMatch(/\/$/);
        });
        it('should navigate back to index and sort the page items based on the provided querystring param', function () {
            browser.get(URL);
            waitForElement('#item-10');
            element(by.css('#item-10')).click();
            waitForElement('.sort-button');
            element(by.css('.sort-button')).click();
            expect(browser.getCurrentUrl()).toMatch(/\/#\?sort=date$/);
            waitForElement('.inbox-item-record');
            expect(element(by.css(".inbox-item-record > a")).getAttribute("id")).toEqual("item-137");
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZ19kZXByZWNhdGVkX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvZTJlX3Rlc3Qvcm91dGluZ19kZXByZWNhdGVkL3JvdXRpbmdfZGVwcmVjYXRlZF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBb0MsbUJBQW1CLENBQUMsQ0FBQTtBQUV4RCx3QkFBd0IsUUFBYSxDQUFDLGlCQUFpQjtJQUNyRCxJQUFJLEVBQUUsR0FBUyxVQUFXLENBQUMsa0JBQWtCLENBQUM7SUFDOUMsZ0VBQWdFO0lBQ2hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBRUQsUUFBUSxDQUFDLDhCQUE4QixFQUFFO0lBRXZDLFNBQVMsQ0FBQyxnQ0FBcUIsQ0FBQyxDQUFDO0lBRWpDLFFBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDckIsSUFBSSxHQUFHLEdBQUcsd0NBQXdDLENBQUM7UUFFbkQsRUFBRSxDQUFDLGlEQUFpRCxFQUFFO1lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsY0FBYyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDekUsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMscURBQXFELEVBQUU7WUFDeEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDM0IsTUFBTSxD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