/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var e2e_util_1 = require('e2e_util/e2e_util');
describe("WebWorker Router", function () {
    beforeEach(function () {
        // This test can't wait for Angular 2 as Testability is not available when using WebWorker
        browser.ignoreSynchronization = true;
        browser.get('/');
    });
    afterEach(function () {
        e2e_util_1.verifyNoBrowserErrors();
        browser.ignoreSynchronization = false;
    });
    var contentSelector = "app main h1";
    var navSelector = "app nav ul";
    var baseUrl = 'all/playground/src/web_workers/router/index.html';
    it("should route on click", function () {
        browser.get(baseUrl);
        waitForElement(contentSelector);
        var content = element(by.css(contentSelector));
        expect(content.getText()).toEqual("Start");
        var aboutBtn = element(by.css(navSelector + " .about"));
        aboutBtn.click();
        waitForUrl(/\/about/);
        waitForElement(contentSelector);
        waitForElementText(contentSelector, "About");
        content = element(by.css(contentSelector));
        expect(content.getText()).toEqual("About");
        expect(browser.getCurrentUrl()).toMatch(/\/about/);
        var contactBtn = element(by.css(navSelector + " .contact"));
        contactBtn.click();
        waitForUrl(/\/contact/);
        waitForElement(contentSelector);
        waitForElementText(contentSelector, "Contact");
        content = element(by.css(contentSelector));
        expect(content.getText()).toEqual("Contact");
        expect(browser.getCurrentUrl()).toMatch(/\/contact/);
    });
    it("should load the correct route from the URL", function () {
        browser.get(baseUrl + "#/about");
        waitForElement(contentSelector);
        waitForElementText(contentSelector, "About");
        var content = element(by.css(contentSelector));
        expect(content.getText()).toEqual("About");
    });
    function waitForElement(selector) {
        browser.wait(protractor.until.elementLocated(by.css(selector)), 15000);
    }
    function waitForElementText(contentSelector, expected) {
        browser.wait(function () {
            var deferred = protractor.promise.defer();
            var elem = element(by.css(contentSelector));
            elem.getText().then(function (text) { return deferred.fulfill(text === expected); });
            return deferred.promise;
        }, 5000);
    }
    function waitForUrl(regex /** TODO #9100 */) {
        browser.wait(function () {
            var deferred = protractor.promise.defer();
            browser.getCurrentUrl().then(function (url) { return deferred.fulfill(url.match(regex) !== null); });
            return deferred.promise;
        }, 5000);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvZTJlX3Rlc3Qvd2ViX3dvcmtlcnMvcm91dGVyL3JvdXRlcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBb0MsbUJBQW1CLENBQUMsQ0FBQTtBQUV4RCxRQUFRLENBQUMsa0JBQWtCLEVBQUU7SUFDM0IsVUFBVSxDQUFDO1FBQ1QsMEZBQTBGO1FBQzFGLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxJQUFJLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUVILFNBQVMsQ0FBQztRQUNSLGdDQUFxQixFQUFFLENBQUM7UUFDeEIsT0FBTyxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksZUFBZSxHQUFHLGFBQWEsQ0FBQztJQUNwQyxJQUFJLFdBQVcsR0FBRyxZQUFZLENBQUM7SUFDL0IsSUFBSSxPQUFPLEdBQUcsa0RBQWtELENBQUM7SUFFakUsRUFBRSxDQUFDLHVCQUF1QixFQUFFO1FBQzFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckIsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUUzQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUN4RCxRQUFRLENBQUMs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