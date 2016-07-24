/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var forms_1 = require('@angular/forms');
var Observable_1 = require('rxjs/Observable');
var normalize_validator_1 = require('../src/directives/normalize_validator');
var async_1 = require('../src/facade/async');
var promise_1 = require('../src/facade/promise');
function main() {
    function validator(key, error) {
        return function (c) {
            var r = {};
            r[key] = error;
            return r;
        };
    }
    var AsyncValidatorDirective = (function () {
        function AsyncValidatorDirective(expected, error) {
            this.expected = expected;
            this.error = error;
        }
        AsyncValidatorDirective.prototype.validate = function (c) {
            var _this = this;
            return Observable_1.Observable.create(function (obs) {
                var error = _this.expected !== c.value ? _this.error : null;
                obs.next(error);
                obs.complete();
            });
        };
        return AsyncValidatorDirective;
    }());
    testing_internal_1.describe('Validators', function () {
        testing_internal_1.describe('required', function () {
            testing_internal_1.it('should error on an empty string', function () { testing_internal_1.expect(forms_1.Validators.required(new forms_1.FormControl(''))).toEqual({ 'required': true }); });
            testing_internal_1.it('should error on null', function () { testing_internal_1.expect(forms_1.Validators.required(new forms_1.FormControl(null))).toEqual({ 'required': true }); });
            testing_internal_1.it('should not error on a non-empty string', function () { testing_internal_1.expect(forms_1.Validators.required(new forms_1.FormControl('not empty'))).toEqual(null); });
            testing_internal_1.it('should accept zero as valid', function () { testing_internal_1.expect(forms_1.Validators.required(new forms_1.FormControl(0))).toEqual(null); });
        });
        testing_internal_1.describe('minLength', function () {
            testing_internal_1.it('should not error on an empty string', function () { testing_internal_1.expect(forms_1.Validators.minLength(2)(new forms_1.FormControl(''))).toEqual(null); });
            testing_internal_1.it('should not error on null', function () { testing_internal_1.expect(forms_1.Validators.minLength(2)(new forms_1.FormControl(null))).toEqual(null); });
            testing_internal_1.it('should not error on valid strings', function () { testing_internal_1.expect(forms_1.Validators.minLength(2)(new forms_1.FormControl('aa'))).toEqual(null); });
            testing_internal_1.it('should error on short strings', function () {
                testing_internal_1.expect(forms_1.Validators.minLength(2)(new forms_1.FormControl('a'))).toEqual({
                    'minlength': { 'requiredLength': 2, 'actualLength': 1 }
                });
            });
        });
        testing_internal_1.describe('maxLength', function () {
            testing_internal_1.it('should not error on an empty string', function () { testing_internal_1.expect(forms_1.Validators.maxLength(2)(new forms_1.FormControl(''))).toEqual(null); });
            testing_internal_1.it('should not error on null', function () { testing_internal_1.expect(forms_1.Validators.maxLength(2)(new forms_1.FormControl(null))).toEqual(null); });
            testing_internal_1.it('should not error on valid strings', function () { testing_internal_1.expect(forms_1.Validators.maxLength(2)(new forms_1.FormControl('aa'))).toEqual(null); });
            testing_internal_1.it('should error on long strings', function () {
                testing_internal_1.expect(forms_1.Validators.maxLength(2)(new forms_1.FormControl('aaa'))).toEqual({
                    'maxlength': { 'requiredLength': 2, 'actualLength': 3 }
                });
            });
        });
        testing_internal_1.describe('pattern', function () {
            testing_internal_1.it('should not error on an empty string', function () { testing_internal_1.expect(forms_1.Validators.pattern('[a-zA-Z ]*')(new forms_1.FormControl(''))).toEqual(null); });
            testing_internal_1.it('should not error on null', function () { testing_internal_1.expect(forms_1.Validators.pattern('[a-zA-Z ]*')(new forms_1.FormControl(null))).toEqual(null); });
            testing_internal_1.it('should not error on valid strings', function () {
                testing_internal_1.expect(forms_1.Validators.pattern('[a-zA-Z ]*')(new forms_1.FormControl('aaAA'))).toEqual(null);
            });
            testing_internal_1.it('should error on failure to match string', function () {
                testing_internal_1.expect(forms_1.Validators.pattern('[a-zA-Z ]*')(new forms_1.FormControl('aaa0'))).toEqual({
                    'pattern': { 'requiredPattern': '^[a-zA-Z ]*$', 'actualValue': 'aaa0' }
                });
            });
        });
        testing_internal_1.describe('compose', function () {
            testing_internal_1.it('should return null when given null', function () { testing_internal_1.expect(forms_1.Validators.compose(null)).toBe(null); });
            testing_internal_1.it('should collect errors from all the validators', function () {
                var c = forms_1.Validators.compose([validator('a', true), validator('b', true)]);
                testing_internal_1.expect(c(new forms_1.FormControl(''))).toEqual({ 'a': true, 'b': true });
            });
            testing_internal_1.it('should run validators left to right', function () {
                var c = forms_1.Validators.compose([validator('a', 1), validator('a', 2)]);
                testing_internal_1.expect(c(new forms_1.FormControl(''))).toEqual({ 'a': 2 });
            });
            testing_internal_1.it('should return null when no errors', function () {
                var c = forms_1.Validators.compose([forms_1.Validators.nullValidator, forms_1.Validators.nullValidator]);
                testing_internal_1.expect(c(new forms_1.FormControl(''))).toEqual(null);
            });
            testing_internal_1.it('should ignore nulls', function () {
                var c = forms_1.Validators.compose([null, forms_1.Validators.required]);
                testing_internal_1.expect(c(new forms_1.FormControl(''))).toEqual({ 'required': true });
            });
        });
        testing_internal_1.describe('composeAsync', function () {
            function asyncValidator(expected /** TODO #9100 */, response /** TODO #9100 */) {
                return function (c /** TODO #9100 */) {
                    var emitter = new async_1.EventEmitter();
                    var res = c.value != expected ? response : null;
                    promise_1.PromiseWrapper.scheduleMicrotask(function () {
                        async_1.ObservableWrapper.callEmit(emitter, res);
                        // this is required because of a bug in ObservableWrapper
                        // where callComplete can fire before callEmit
                        // remove this one the bug is fixed
                        async_1.TimerWrapper.setTimeout(function () { async_1.ObservableWrapper.callComplete(emitter); }, 0);
                    });
                    return emitter;
                };
            }
            testing_internal_1.it('should return null when given null', function () { testing_internal_1.expect(forms_1.Validators.composeAsync(null)).toEqual(null); });
            testing_internal_1.it('should collect errors from all the validators', testing_1.fakeAsync(function () {
                var c = forms_1.Validators.composeAsync([
                    asyncValidator('expected', { 'one': true }), asyncValidator('expected', { 'two': true })
                ]);
                var value = null;
                c(new forms_1.FormControl('invalid')).then(function (v) { return value = v; });
                testing_1.tick(1);
                testing_internal_1.expect(value).toEqual({ 'one': true, 'two': true });
            }));
            testing_internal_1.it('should normalize and evaluate async validator-directives correctly', testing_1.fakeAsync(function () {
                var c = forms_1.Validators.composeAsync([normalize_validator_1.normalizeAsyncValidator(new AsyncValidatorDirective('expected', { 'one': true }))]);
                var value = null;
                c(new forms_1.FormControl()).then(function (v) { return value = v; });
                testing_1.tick(1);
                testing_internal_1.expect(value).toEqual({ 'one': true });
            }));
            testing_internal_1.it('should return null when no errors', testing_1.fakeAsync(function () {
                var c = forms_1.Validators.composeAsync([asyncValidator('expected', { 'one': true })]);
                var value = null;
                c(new forms_1.FormControl('expected')).then(function (v) { return value = v; });
                testing_1.tick(1);
                testing_internal_1.expect(value).toEqual(null);
            }));
            testing_internal_1.it('should ignore nulls', testing_1.fakeAsync(function () {
                var c = forms_1.Validators.composeAsync([asyncValidator('expected', { 'one': true }), null]);
                var value = null;
                c(new forms_1.FormControl('invalid')).then(function (v) { return value = v; });
                testing_1.tick(1);
                testing_internal_1.expect(value).toEqual({ 'one': true });
            }));
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yc19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9mb3Jtcy90ZXN0L3ZhbGlkYXRvcnNfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsd0JBQThCLHVCQUF1QixDQUFDLENBQUE7QUFDdEQsaUNBQStFLHdDQUF3QyxDQUFDLENBQUE7QUFDeEgsc0JBQXVELGdCQUFnQixDQUFDLENBQUE7QUFDeEUsMkJBQXlCLGlCQUFpQixDQUFDLENBQUE7QUFFM0Msb0NBQXNDLHVDQUF1QyxDQUFDLENBQUE7QUFDOUUsc0JBQTRELHFCQUFxQixDQUFDLENBQUE7QUFDbEYsd0JBQTZCLHVCQUF1QixDQUFDLENBQUE7QUFFckQ7SUFDRSxtQkFBbUIsR0FBVyxFQUFFLEtBQVU7UUFDeEMsTUFBTSxDQUFDLFVBQVMsQ0FBa0I7WUFDaEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1YsQ0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUN4QixNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEO1FBQ0UsaUNBQW9CLFFBQWdCLEVBQVUsS0FBVTtZQUFwQyxhQUFRLEdBQVIsUUFBUSxDQUFRO1lBQVUsVUFBSyxHQUFMLEtBQUssQ0FBSztRQUFHLENBQUM7UUFFNUQsMENBQVEsR0FBUixVQUFTLENBQU07WUFBZixpQkFNQztZQUxDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQVE7Z0JBQ2hDLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDNUQsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEIsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNILDhCQUFDO0lBQUQsQ0FBQyxBQVZELElBVUM7SUFFRCwyQkFBUSxDQUFDLFlBQVksRUFBRTtRQUNyQiwyQkFBUSxDQUFDLFVBQVUsRUFBRTtZQUNuQixxQkFBRSxDQUFDLGlDQUFpQyxFQUNqQyxjQUFRLHlCQUFNLENBQUMsa0JBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxtQkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTVGLHFCQUFFLENBQUMsc0JBQXNCLEVBQ3RCLGNBQVEseUJBQU0sQ0FBQyxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLG1CQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFOUYscUJBQUUsQ0FBQyx3Q0FBd0MsRUFDeEMsY0FBUSx5QkFBTSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLElBQUksbUJBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdkYscUJBQUUsQ0FBQyw2QkFBNkIsRUFDN0IsY0FBUSx5QkFBTSxDQUFDLGtCQUFVLENBQUMsUUFBUSxDQUFDLElBQUksbUJBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwQixxQkFBRSxDQUFDLHFDQUFxQyxFQUNyQyxjQUFRLHlCQUFNLENBQUMsa0JBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsRixxQkFBRSxDQUFDLDBCQUEwQixFQUMxQixjQUFRLHlCQUFNLENBQUMsa0JBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwRixxQkFBRSxDQUFDLG1DQUFtQyxFQUNuQyxjQUFRLHlCQUFNLENBQUMsa0JBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwRixxQkFBRSxDQUFDLCtCQUErQixFQUFFO2dCQUNsQyx5QkFBTSxDQUFDLGtCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksbUJBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO29CQUM1RCxXQUFXLEVBQUUsRUFBQyxnQkFBZ0IsRUFBRSxDQUFDLEVBQUUsY0FBYyxFQUFFLENBQUMsRUFBQztpQkFDdEQsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILDJCQUFRLENBQUMsV0FBVyxFQUFFO1lBQ3BCLHFCQUFFLENBQUMscUNBQXFDLEVBQ3JDLGNBQVEseUJBQU0sQ0FBQyxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLG1CQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWxGLHFCQUFFLENBQUMsMEJBQTBCLEVBQzFCLGNBQVEseUJBQU0sQ0FBQyxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLG1CQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBGLHFCQUFFLENBQUMsbUNBQW1DLEVBQ25DLGNBQVEseUJBQU0sQ0FBQyxrQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLG1CQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXBGLHFCQUFFLENBQUMsOEJBQThCLEVBQUU7Z0JBQ2pDLHlCQUFNLENBQUMsa0JBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQzlELFdBQVcsRUFBRSxFQUFDLGdCQUFnQixFQUFFLENBQUMsRUFBRSxjQUFjLEVBQUUsQ0FBQyxFQUFDO2lCQUN0RCxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsMkJBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDbEIscUJBQUUsQ0FBQyxxQ0FBcUMsRUFDckMsY0FBUSx5QkFBTSxDQUFDLGtCQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksbUJBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0YscUJBQUUsQ0FBQywwQkFBMEIsRUFDMUIsY0FBUSx5QkFBTSxDQUFDLGtCQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksbUJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0YscUJBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtnQkFDdEMseUJBQU0sQ0FBQyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLG1CQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRixDQUFDLENBQUMsQ0FBQztZQUVILHFCQUFFLENBQUMseUNBQXlDLEVBQUU7Z0JBQzVDLHlCQUFNLENBQUMsa0JBQVUsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxtQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQ3hFLFNBQVMsRUFBRSxFQUFDLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFDO2lCQUN0RSxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsMkJBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDbEIscUJBQUUsQ0FBQyxvQ0FBb0MsRUFDcEMsY0FBUSx5QkFBTSxDQUFDLGtCQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFM0QscUJBQUUsQ0FBQywrQ0FBK0MsRUFBRTtnQkFDbEQsSUFBSSxDQUFDLEdBQUcsa0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxFQUFFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RSx5QkFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLG1CQUFXLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7WUFDakUsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLHFDQUFxQyxFQUFFO2dCQUN4QyxJQUFJLENBQUMsR0FBRyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25FLHlCQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksbUJBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUMsR0FBRyxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLG1DQUFtQyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsR0FBRyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGtCQUFVLENBQUMsYUFBYSxFQUFFLGtCQUFVLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDakYseUJBQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxtQkFBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLHFCQUFxQixFQUFFO2dCQUN4QixJQUFJLENBQUMsR0FBRyxrQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxrQkFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELHlCQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksbUJBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7WUFDN0QsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILDJCQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLHdCQUF3QixRQUFhLENBQUMsaUJBQWlCLEVBQUUsUUFBYSxDQUFDLGlCQUFpQjtnQkFDdEYsTUFBTSxDQUFDLFVBQUMsQ0FBTSxDQUFDLGlCQUFpQjtvQkFDOUIsSUFBSSxPQUFPLEdBQUcsSUFBSSxvQkFBWSxFQUFFLENBQUM7b0JBQ2pDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksUUFBUSxHQUFHLFFBQVEsR0FBRyxJQUFJLENBQUM7b0JBRWhELHdCQUFjLENBQUMsaUJBQWlCLENBQUM7d0JBQy9CLHlCQUFpQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7d0JBQ3pDLHlEQUF5RDt3QkFDekQsOENBQThDO3dCQUM5QyxtQ0FBbUM7d0JBQ25DLG9CQUFZLENBQUMsVUFBVSxDQUFDLGNBQVEseUJBQWlCLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNqRixDQUFDLENBQUMsQ0FBQztvQkFDSCxNQUFNLENBQUMsT0FBTyxDQUFDO2dCQUNqQixDQUFDLENBQUM7WUFDSixDQUFDO1lBRUQscUJBQUUsQ0FBQyxvQ0FBb0MsRUFDcEMsY0FBUSx5QkFBTSxDQUFDLGtCQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkUscUJBQUUsQ0FBQywrQ0FBK0MsRUFBRSxtQkFBUyxDQUFDO2dCQUN6RCxJQUFJLENBQUMsR0FBRyxrQkFBVSxDQUFDLFlBQVksQ0FBQztvQkFDOUIsY0FBYyxDQUFDLFVBQVUsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxFQUFFLGNBQWMsQ0FBQyxVQUFVLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7aUJBQ3JGLENBQUMsQ0FBQztnQkFFSCxJQUFJLEtBQUssR0FBMEIsSUFBSSxDQUFDO2dCQUN6QixDQUFDLENBQUMsSUFBSSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSyxHQUFHLENBQUMsRUFBVCxDQUFTLENBQUMsQ0FBQztnQkFFbkUsY0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVSLHlCQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyxvRUFBb0UsRUFBRSxtQkFBUyxDQUFDO2dCQUM5RSxJQUFNLENBQUMsR0FBRyxrQkFBVSxDQUFDLFlBQVksQ0FDN0IsQ0FBQyw2Q0FBdUIsQ0FBQyxJQUFJLHVCQUF1QixDQUFDLFVBQVUsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUV2RixJQUFJLEtBQUssR0FBUSxJQUFJLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxJQUFJLG1CQUFXLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQU0sSUFBSyxPQUFBLEtBQUssR0FBRyxDQUFDLEVBQVQsQ0FBUyxDQUFDLENBQUM7Z0JBQ2pELGNBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUix5QkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBQ3ZDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLG1DQUFtQyxFQUFFLG1CQUFTLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxHQUFHLGtCQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFN0UsSUFBSSxLQUFLLEdBQTBCLElBQUksQ0FBQztnQkFDekIsQ0FBQyxDQUFDLElBQUksbUJBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUssR0FBRyxDQUFDLEVBQVQsQ0FBUyxDQUFDLENBQUM7Z0JBQ3BFLGNBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUix5QkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyxxQkFBcUIsRUFBRSxtQkFBUyxDQUFDO2dCQUMvQixJQUFJLENBQUMsR0FBRyxrQkFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUVuRixJQUFJLEtBQUssR0FBMEIsSUFBSSxDQUFDO2dCQUN6QixDQUFDLENBQUMsSUFBSSxtQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFFLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSyxHQUFHLENBQUMsRUFBVCxDQUFTLENBQUMsQ0FBQztnQkFFbkUsY0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVSLHlCQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7WUFDdkMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBbkxlLFlBQUksT0FtTG5CLENBQUEifQ==