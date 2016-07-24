/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var e2e_util_1 = require('e2e_util/e2e_util');
function waitForElement(selector) {
    var EC = protractor.ExpectedConditions;
    // Waits for the element with id 'abc' to be present on the dom.
    browser.wait(EC.presenceOf($(selector)), 20000);
}
describe('reuse example app', function () {
    afterEach(e2e_util_1.verifyNoBrowserErrors);
    var URL = '@angular/examples/router/ts/reuse/';
    it('should build a link which points to the detail page', function () {
        browser.get(URL);
        waitForElement('my-cmp');
        element(by.css('#naomi-link')).click();
        waitForElement('my-cmp');
        expect(browser.getCurrentUrl()).toMatch(/\/naomi$/);
        // type something into input
        element(by.css('#message')).sendKeys('long time no see!');
        // navigate to Brad
        element(by.css('#brad-link')).click();
        waitForElement('my-cmp');
        expect(browser.getCurrentUrl()).toMatch(/\/brad$/);
        // check that typed input is the same
        expect(element(by.css('#message')).getAttribute('value')).toEqual('long time no see!');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV1c2Vfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZXhhbXBsZXMvcm91dGVyX2RlcHJlY2F0ZWQvdHMvcmV1c2UvcmV1c2Vfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgseUJBQW9DLG1CQUFtQixDQUFDLENBQUE7QUFFeEQsd0JBQXdCLFFBQWdCO0lBQ3RDLElBQUksRUFBRSxHQUFTLFVBQVcsQ0FBQyxrQkFBa0IsQ0FBQztJQUM5QyxnRUFBZ0U7SUFDaEUsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ2xELENBQUM7QUFFRCxRQUFRLENBQUMsbUJBQW1CLEVBQUU7SUFFNUIsU0FBUyxDQUFDLGdDQUFxQixDQUFDLENBQUM7SUFFakMsSUFBSSxHQUFHLEdBQUcsb0NBQW9DLENBQUM7SUFFL0MsRUFBRSxDQUFDLHFEQUFxRCxFQUFFO1FBQ3hELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDakIsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXpCLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdkMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFcEQsNEJBQTRCO1FBQzVCLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFFMUQsbUJBQW1CO1FBQ25CLE9BQU8sQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDdEMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbkQscUNBQXFDO1FBQ3JDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQ3pGLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUMifQ==