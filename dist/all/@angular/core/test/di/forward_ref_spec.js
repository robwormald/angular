/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var di_1 = require('@angular/core/src/di');
var lang_1 = require('../../src/facade/lang');
function main() {
    testing_internal_1.describe('forwardRef', function () {
        testing_internal_1.it('should wrap and unwrap the reference', function () {
            var ref = di_1.forwardRef(function () { return String; });
            testing_internal_1.expect(ref instanceof lang_1.Type).toBe(true);
            testing_internal_1.expect(di_1.resolveForwardRef(ref)).toBe(String);
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9yd2FyZF9yZWZfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L2RpL2ZvcndhcmRfcmVmX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUE2RSx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3RILG1CQUE0QyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ25FLHFCQUFtQix1QkFBdUIsQ0FBQyxDQUFBO0FBRTNDO0lBQ0UsMkJBQVEsQ0FBQyxZQUFZLEVBQUU7UUFDckIscUJBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtZQUN6QyxJQUFJLEdBQUcsR0FBRyxlQUFVLENBQUMsY0FBTSxPQUFBLE1BQU0sRUFBTixDQUFNLENBQUMsQ0FBQztZQUNuQyx5QkFBTSxDQUFDLEdBQUcsWUFBWSxXQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMseUJBQU0sQ0FBQyxzQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVJlLFlBQUksT0FRbkIsQ0FBQSJ9