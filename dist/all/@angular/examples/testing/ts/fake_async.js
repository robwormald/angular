/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_1 = require('@angular/core/testing');
// #docregion basic
describe('this test', function () {
    it('looks async but is synchronous', testing_1.fakeAsync(function () {
        var flag = false;
        setTimeout(function () { flag = true; }, 100);
        expect(flag).toBe(false);
        testing_1.tick(50);
        expect(flag).toBe(false);
        testing_1.tick(50);
        expect(flag).toBe(true);
    }));
});
// #enddocregion
// #docregion pending
describe('this test', function () {
    it('aborts a periodic timer', testing_1.fakeAsync(function () {
        // This timer is scheduled but doesn't need to complete for the
        // test to pass (maybe it's a timeout for some operation).
        // Leaving it will cause the test to fail...
        setInterval(function () { }, 100);
        // Unless we clean it up first.
        testing_1.discardPeriodicTasks();
    }));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZV9hc3luYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZXhhbXBsZXMvdGVzdGluZy90cy9mYWtlX2FzeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx3QkFBb0QsdUJBQXVCLENBQUMsQ0FBQTtBQUc1RSxtQkFBbUI7QUFDbkIsUUFBUSxDQUFDLFdBQVcsRUFBRTtJQUNwQixFQUFFLENBQUMsZ0NBQWdDLEVBQU8sbUJBQVMsQ0FBQztRQUMvQyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFDakIsVUFBVSxDQUFDLGNBQVEsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLGNBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsY0FBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ1QsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQixDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDSCxnQkFBZ0I7QUFFaEIscUJBQXFCO0FBQ3JCLFFBQVEsQ0FBQyxXQUFXLEVBQUU7SUFDcEIsRUFBRSxDQUFDLHlCQUF5QixFQUFPLG1CQUFTLENBQUM7UUFDeEMsK0RBQStEO1FBQy9ELDBEQUEwRDtRQUMxRCw0Q0FBNEM7UUFDNUMsV0FBVyxDQUFDLGNBQU8sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRTNCLCtCQUErQjtRQUMvQiw4QkFBb0IsRUFBRSxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDVCxDQUFDLENBQUMsQ0FBQyJ9