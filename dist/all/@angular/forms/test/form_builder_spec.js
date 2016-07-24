/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var forms_1 = require('@angular/forms');
var promise_1 = require('../src/facade/promise');
function main() {
    function syncValidator(_ /** TODO #9100 */) { return null; }
    function asyncValidator(_ /** TODO #9100 */) { return promise_1.PromiseWrapper.resolve(null); }
    testing_internal_1.describe('Form Builder', function () {
        var b;
        testing_internal_1.beforeEach(function () { b = new forms_1.FormBuilder(); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9idWlsZGVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2Zvcm1zL3Rlc3QvZm9ybV9idWlsZGVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUErRSx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3hILHNCQUF1QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBRXhELHdCQUE2Qix1QkFBdUIsQ0FBQyxDQUFBO0FBRXJEO0lBQ0UsdUJBQXVCLENBQU0sQ0FBQyxpQkFBaUIsSUFBMkIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDeEYsd0JBQXdCLENBQU0sQ0FBQyxpQkFBaUIsSUFBSSxNQUFNLENBQUMsd0JBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTFGLDJCQUFRLENBQUMsY0FBYyxFQUFFO1FBQ3ZCLElBQUksQ0FBTSxDQUFtQjtRQUU3Qiw2QkFBVSxDQUFDLGNBQVEsQ0FBQyxHQUFHLElBQUksbUJBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0MscUJBQUUsQ0FBQyxxQ0FBcUMsRUFBRTtZQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLFlBQVksRUFBQyxDQUFDLENBQUM7WUFFekMseUJBQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsc0NBQXNDLEVBQUU7WUFDekMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FDWCxFQUFDLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLFlBQVksRUFBRSxhQUFh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