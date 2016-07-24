/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var e2e_util_1 = require('e2e_util/e2e_util');
describe('WebWorkers Todo', function () {
    afterEach(function () {
        e2e_util_1.verifyNoBrowserErrors();
        browser.ignoreSynchronization = false;
    });
    var URL = 'all/playground/src/web_workers/todo/index.html';
    it('should bootstrap', function () {
        // This test can't wait for Angular 2 as Testability is not available when using WebWorker
        browser.ignoreSynchronization = true;
        browser.get(URL);
        waitForBootstrap();
        expect(element(by.css("#todoapp header")).getText()).toEqual("todos");
    });
});
function waitForBootstrap() {
    browser.wait(protractor.until.elementLocated(by.css("todo-app #todoapp")), 15000);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9kb19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL2UyZV90ZXN0L3dlYl93b3JrZXJzL3RvZG8vdG9kb19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBb0MsbUJBQW1CLENBQUMsQ0FBQTtBQUV4RCxRQUFRLENBQUMsaUJBQWlCLEVBQUU7SUFDMUIsU0FBUyxDQUFDO1FBQ1IsZ0NBQXFCLEVBQUUsQ0FBQztRQUN4QixPQUFPLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO0lBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxHQUFHLEdBQUcsZ0RBQWdELENBQUM7SUFFM0QsRUFBRSxDQUFDLGtCQUFrQixFQUFFO1FBQ3JCLDBGQUEwRjtRQUMxRixPQUFPLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFakIsZ0JBQWdCLEVBQUUsQ0FBQztRQUNuQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3hFLENBQUMsQ0FBQyxDQUFDO0FBRUwsQ0FBQyxDQUFDLENBQUM7QUFFSDtJQUNFLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDcEYsQ0FBQyJ9