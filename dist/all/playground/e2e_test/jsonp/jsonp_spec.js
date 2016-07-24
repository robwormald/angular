/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var e2e_util_1 = require('e2e_util/e2e_util');
describe('jsonp', function () {
    afterEach(e2e_util_1.verifyNoBrowserErrors);
    describe('fetching', function () {
        var URL = 'all/playground/src/jsonp/index.html';
        it('should fetch and display people', function () {
            browser.get(URL);
            expect(getComponentText('jsonp-app', '.people')).toEqual('hello, caitp');
        });
    });
});
function getComponentText(selector /** TODO #9100 */, innerSelector /** TODO #9100 */) {
    return browser.executeScript('return document.querySelector("' + selector + '").querySelector("' +
        innerSelector + '").textContent.trim()');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnBfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvcGxheWdyb3VuZC9lMmVfdGVzdC9qc29ucC9qc29ucF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBb0MsbUJBQW1CLENBQUMsQ0FBQTtBQUV4RCxRQUFRLENBQUMsT0FBTyxFQUFFO0lBRWhCLFNBQVMsQ0FBQyxnQ0FBcUIsQ0FBQyxDQUFDO0lBRWpDLFFBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDbkIsSUFBSSxHQUFHLEdBQUcscUNBQXFDLENBQUM7UUFFaEQsRUFBRSxDQUFDLGlDQUFpQyxFQUFFO1lBQ3BDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMzRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSCwwQkFBMEIsUUFBYSxDQUFDLGlCQUFpQixFQUFFLGFBQWtCLENBQUMsaUJBQWlCO0lBQzdGLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLGlDQUFpQyxHQUFHLFFBQVEsR0FBRyxvQkFBb0I7UUFDbkUsYUFBYSxHQUFHLHVCQUF1QixDQUFDLENBQUM7QUFDeEUsQ0FBQyJ9