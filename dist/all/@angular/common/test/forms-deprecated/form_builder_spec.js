/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var forms_deprecated_1 = require('@angular/common/src/forms-deprecated');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var promise_1 = require('../../src/facade/promise');
function main() {
    function syncValidator(_) { return null; }
    function asyncValidator(_) { return promise_1.PromiseWrapper.resolve(null); }
    testing_internal_1.describe('Form Builder', function () {
        var b;
        testing_internal_1.beforeEach(function () { b = new forms_deprecated_1.FormBuilder(); });
        testing_internal_1.it('should create controls from a value', function () {
            var g = b.group({ 'login': 'some value' });
            testing_internal_1.expect(g.controls['login'].value).toEqual('some value');
        });
        testing_internal_1.it('should create controls from an array', function () {
            var g = b.group({ 'login': ['some value'], 'password': ['some value', syncValidator, asyncValidator] });
            testing_internal_1.expect(g.controls['login'].value).toEqual('some value');
            testing_internal_1.expect(g.controls['password'].value).toEqual('some value');
            testing_internal_1.expect(g.controls['password'].validator).toEqual(syncValidator);
            testing_internal_1.expect(g.controls['password'].asyncValidator).toEqual(asyncValidator);
        });
        testing_internal_1.it('should use controls', function () {
            var g = b.group({ 'login': b.control('some value', syncValidator, asyncValidator) });
            testing_internal_1.expect(g.controls['login'].value).toEqual('some value');
            testing_internal_1.expect(g.controls['login'].validator).toBe(syncValidator);
            testing_internal_1.expect(g.controls['login'].asyncValidator).toBe(asyncValidator);
        });
        testing_internal_1.it('should create groups with optional controls', function () {
            var g = b.group({ 'login': 'some value' }, { 'optionals': { 'login': false } });
            testing_internal_1.expect(g.contains('login')).toEqual(false);
        });
        testing_internal_1.it('should create groups with a custom validator', function () {
            var g = b.group({ 'login': 'some value' }, { 'validator': syncValidator, 'asyncValidator': asyncValidator });
            testing_internal_1.expect(g.validator).toBe(syncValidator);
            testing_internal_1.expect(g.asyncValidator).toBe(asyncValidator);
        });
        testing_internal_1.it('should create control arrays', function () {
            var c = b.control('three');
            var a = b.array(['one', ['two', syncValidator], c, b.array(['four'])], syncValidator, asyncValidator);
            testing_internal_1.expect(a.value).toEqual(['one', 'two', 'three', ['four']]);
            testing_internal_1.expect(a.validator).toBe(syncValidator);
            testing_internal_1.expect(a.asyncValidator).toBe(asyncValidator);
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9idWlsZGVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbW1vbi90ZXN0L2Zvcm1zLWRlcHJlY2F0ZWQvZm9ybV9idWlsZGVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUFtQyxzQ0FBc0MsQ0FBQyxDQUFBO0FBQzFFLGlDQUErRSx3Q0FBd0MsQ0FBQyxDQUFBO0FBRXhILHdCQUE2QiwwQkFBMEIsQ0FBQyxDQUFBO0FBRXhEO0lBQ0UsdUJBQXVCLENBQU0sSUFBUyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwRCx3QkFBd0IsQ0FBTSxJQUFJLE1BQU0sQ0FBQyx3QkFBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFeEUsMkJBQVEsQ0FBQyxjQUFjLEVBQUU7UUFDdkIsSUFBSSxDQUFNLENBQW1CO1FBRTdCLDZCQUFVLENBQUMsY0FBUSxDQUFDLEdBQUcsSUFBSSw4QkFBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU3QyxxQkFBRSxDQUFDLHFDQUFxQyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQztZQUV6Qyx5QkFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFELENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtZQUN6QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUNYLEVBQUMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsWUFBWSxFQUFFLGFBQWEsRUFB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