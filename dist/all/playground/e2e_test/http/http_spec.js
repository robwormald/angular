/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var e2e_util_1 = require('e2e_util/e2e_util');
describe('http', function () {
    afterEach(e2e_util_1.verifyNoBrowserErrors);
    describe('fetching', function () {
        var URL = 'all/playground/src/http/index.html';
        it('should fetch and display people', function () {
            browser.get(URL);
            expect(getComponentText('http-app', '.people')).toEqual('hello, Jeff');
        });
    });
});
function getComponentText(selector /** TODO #9100 */, innerSelector /** TODO #9100 */) {
    return browser.executeScript('return document.querySelector("' + selector + '").querySelector("' +
        innerSelector + '").textContent.trim()');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL2UyZV90ZXN0L2h0dHAvaHR0cF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBb0MsbUJBQW1CLENBQUMsQ0FBQTtBQUV4RCxRQUFRLENBQUMsTUFBTSxFQUFFO0lBRWYsU0FBUyxDQUFDLGdDQUFxQixDQUFDLENBQUM7SUFFakMsUUFBUSxDQUFDLFVBQVUsRUFBRTtRQUNuQixJQUFJLEdBQUcsR0FBRyxvQ0FBb0MsQ0FBQztRQUUvQyxFQUFFLENBQUMsaUNBQWlDLEVBQUU7WUFDcEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILDBCQUEwQixRQUFhLENBQUMsaUJBQWlCLEVBQUUsYUFBa0IsQ0FBQyxpQkFBaUI7SUFDN0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsaUNBQWlDLEdBQUcsUUFBUSxHQUFHLG9CQUFvQjtRQUNuRSxhQUFhLEdBQUcsdUJBQXVCLENBQUMsQ0FBQztBQUN4RSxDQUFDIn0=