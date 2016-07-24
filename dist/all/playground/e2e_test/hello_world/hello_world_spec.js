/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var e2e_util_1 = require('e2e_util/e2e_util');
describe('hello world', function () {
    afterEach(e2e_util_1.verifyNoBrowserErrors);
    describe('hello world app', function () {
        var URL = 'all/playground/src/hello_world/index.html';
        it('should greet', function () {
            browser.get(URL);
            expect(getComponentText('hello-app', '.greeting')).toEqual('hello world!');
        });
        it('should change greeting', function () {
            browser.get(URL);
            clickComponentButton('hello-app', '.changeButton');
            expect(getComponentText('hello-app', '.greeting')).toEqual('howdy world!');
        });
    });
});
function getComponentText(selector /** TODO #9100 */, innerSelector /** TODO #9100 */) {
    return browser.executeScript('return document.querySelector("' + selector + '").querySelector("' +
        innerSelector + '").textContent');
}
function clickComponentButton(selector /** TODO #9100 */, innerSelector /** TODO #9100 */) {
    return browser.executeScript('return document.querySelector("' + selector + '").querySelector("' +
        innerSelector + '").click()');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVsbG9fd29ybGRfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvcGxheWdyb3VuZC9lMmVfdGVzdC9oZWxsb193b3JsZC9oZWxsb193b3JsZF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBb0MsbUJBQW1CLENBQUMsQ0FBQTtBQUV4RCxRQUFRLENBQUMsYUFBYSxFQUFFO0lBRXRCLFNBQVMsQ0FBQyxnQ0FBcUIsQ0FBQyxDQUFDO0lBRWpDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixJQUFJLEdBQUcsR0FBRywyQ0FBMkMsQ0FBQztRQUV0RCxFQUFFLENBQUMsY0FBYyxFQUFFO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFakIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyx3QkFBd0IsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWpCLG9CQUFvQixDQUFDLFdBQVcsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUNuRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzdFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQztBQUVILDBCQUEwQixRQUFhLENBQUMsaUJBQWlCLEVBQUUsYUFBa0IsQ0FBQyxpQkFBaUI7SUFDN0YsTUFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsaUNBQWlDLEdBQUcsUUFBUSxHQUFHLG9CQUFvQjtRQUNuRSxhQUFhLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQztBQUNqRSxDQUFDO0FBRUQsOEJBQThCLFFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxhQUFrQixDQUFDLGlCQUFpQjtJQUNqRyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxpQ0FBaUMsR0FBRyxRQUFRLEdBQUcsb0JBQW9CO1FBQ25FLGFBQWEsR0FBRyxZQUFZLENBQUMsQ0FBQztBQUM3RCxDQUFDIn0=