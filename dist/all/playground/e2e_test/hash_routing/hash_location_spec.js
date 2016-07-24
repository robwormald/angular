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
describe('hash routing example app', function () {
    afterEach(e2e_util_1.verifyNoBrowserErrors);
    var URL = 'all/playground/src/hash_routing/index.html';
    it('should navigate between routes', function () {
        browser.get(URL + '#/bye');
        waitForElement('goodbye-cmp');
        element(by.css('#hello-link')).click();
        waitForElement('hello-cmp');
        expect(element(by.css('hello-cmp')).getText()).toContain('hello');
        browser.navigate().back();
        waitForElement('goodbye-cmp');
        expect(element(by.css('goodbye-cmp')).getText()).toContain('goodbye');
    });
    it('should open in new window if target is _blank', function () {
        var URL = 'all/playground/src/hash_routing/index.html';
        browser.get(URL + '#/');
        waitForElement('hello-cmp');
        element(by.css('#goodbye-link-blank')).click();
        expect(browser.driver.getCurrentUrl()).not.toContain('#/bye');
        browser.getAllWindowHandles().then(function (windows) {
            browser.switchTo()
                .window(windows[1])
                .then(function () { expect(browser.driver.getCurrentUrl()).toContain("#/bye"); });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaF9sb2NhdGlvbl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL2UyZV90ZXN0L2hhc2hfcm91dGluZy9oYXNoX2xvY2F0aW9uX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHlCQUFvQyxtQkFBbUIsQ0FBQyxDQUFBO0FBRXhELHdCQUF3QixRQUFhLENBQUMsaUJBQWlCO0lBQ3JELElBQUksRUFBRSxHQUFTLFVBQVcsQ0FBQyxrQkFBa0IsQ0FBQztJQUM5QyxnRUFBZ0U7SUFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxRQUFRLENBQUMsMEJBQTBCLEVBQUU7SUFDbkMsU0FBUyxDQUFDLGdDQUFxQixDQUFDLENBQUM7SUFFakMsSUFBSSxHQUFHLEdBQUcsNENBQTRDLENBQUM7SUFFdkQsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1FBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDO1FBQzNCLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU5QixPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3ZDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU1QixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsRSxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDMUIsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTlCLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hFLENBQUMsQ0FBQyxDQUFDO0lBR0gsRUFBRSxDQUFDLCtDQUErQyxFQUFFO1FBQ2xELElBQUksR0FBRyxHQUFHLDRDQUE0QyxDQUFDO1FBQ3ZELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3hCLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU1QixPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDL0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlELE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFTLE9BQU87WUFDakQsT0FBTyxDQUFDLFFBQVEsRUFBRTtpQkFDYixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsQixJQUFJLENBQUMsY0FBYSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9