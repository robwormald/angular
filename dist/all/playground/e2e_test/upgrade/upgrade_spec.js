/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var e2e_util_1 = require("e2e_util/e2e_util");
// TODO(i): reenable once we fix issue with exposing testability to protractor when using ngUpgrade
// https://github.com/angular/angular/issues/9407
xdescribe('ngUpgrade', function () {
    var URL = 'all/playground/src/upgrade/index.html';
    beforeEach(function () { browser.get(URL); });
    afterEach(e2e_util_1.verifyNoBrowserErrors);
    it('should bootstrap Angular 1 and Angular 2 apps together', function () {
        var ng1NameInput = element(by.css('input[ng-model]=name'));
        expect(ng1NameInput.getAttribute('value')).toEqual('World');
        var userSpan = element(by.css('user span'));
        expect(userSpan.getText()).toMatch('/World$/');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBncmFkZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL2UyZV90ZXN0L3VwZ3JhZGUvdXBncmFkZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBb0MsbUJBQW1CLENBQUMsQ0FBQTtBQUV4RCxtR0FBbUc7QUFDbkcsaURBQWlEO0FBQ2pELFNBQVMsQ0FBQyxXQUFXLEVBQUU7SUFDckIsSUFBSSxHQUFHLEdBQUcsdUNBQXVDLENBQUM7SUFFbEQsVUFBVSxDQUFDLGNBQWEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTdDLFNBQVMsQ0FBQyxnQ0FBcUIsQ0FBQyxDQUFDO0lBRWpDLEVBQUUsQ0FBQyx3REFBd0QsRUFBRTtRQUMzRCxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFNUQsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==