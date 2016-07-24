/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var forms_deprecated_1 = require('@angular/common/src/forms-deprecated');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var Observable_1 = require('rxjs/Observable');
var async_1 = require('../../src/facade/async');
var promise_1 = require('../../src/facade/promise');
var normalize_validator_1 = require('../../src/forms-deprecated/directives/normalize_validator');
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
            testing_internal_1.it('should error on an empty string', function () { testing_internal_1.expect(forms_deprecated_1.Validators.required(new forms_deprecated_1.Control(''))).toEqual({ 'required': true }); });
            testing_internal_1.it('should error on null', function () { testing_internal_1.expect(forms_deprecated_1.Validators.required(new forms_deprecated_1.Control(null))).toEqual({ 'required': true }); });
            testing_internal_1.it('should not error on a non-empty string', function () { testing_internal_1.expect(forms_deprecated_1.Validators.required(new forms_deprecated_1.Control('not empty'))).toEqual(null); });
            testing_internal_1.it('should accept zero as valid', function () { testing_internal_1.expect(forms_deprecated_1.Validators.required(new forms_deprecated_1.Control(0))).toEqual(null); });
        });
        testing_internal_1.describe('minLength', function () {
            testing_internal_1.it('should not error on an empty string', function () { testing_internal_1.expect(forms_deprecated_1.Validators.minLength(2)(new forms_deprecated_1.Control(''))).toEqual(null); });
            testing_internal_1.it('should not error on null', function () { testing_internal_1.expect(forms_deprecated_1.Validators.minLength(2)(new forms_deprecated_1.Control(null))).toEqual(null); });
            testing_internal_1.it('should not error on valid strings', function () { testing_internal_1.expect(forms_deprecated_1.Validators.minLength(2)(new forms_deprecated_1.Control('aa'))).toEqual(null); });
            testing_internal_1.it('should error on short strings', function () {
                testing_internal_1.expect(forms_deprecated_1.Validators.minLength(2)(new forms_deprecated_1.Control('a'))).toEqual({
                    'minlength': { 'requiredLength': 2, 'actualLength': 1 }
                });
            });
        });
        testing_internal_1.describe('maxLength', function () {
            testing_internal_1.it('should not error on an empty string', function () { testing_internal_1.expect(forms_deprecated_1.Validators.maxLength(2)(new forms_deprecated_1.Control(''))).toEqual(null); });
            testing_internal_1.it('should not error on null', function () { testing_internal_1.expect(forms_deprecated_1.Validators.maxLength(2)(new forms_deprecated_1.Control(null))).toEqual(null); });
            testing_internal_1.it('should not error on valid strings', function () { testing_internal_1.expect(forms_deprecated_1.Validators.maxLength(2)(new forms_deprecated_1.Control('aa'))).toEqual(null); });
            testing_internal_1.it('should error on long strings', function () {
                testing_internal_1.expect(forms_deprecated_1.Validators.maxLength(2)(new forms_deprecated_1.Control('aaa'))).toEqual({
                    'maxlength': { 'requiredLength': 2, 'actualLength': 3 }
                });
            });
        });
        testing_internal_1.describe('pattern', function () {
            testing_internal_1.it('should not error on an empty string', function () { testing_internal_1.expect(forms_deprecated_1.Validators.pattern('[a-zA-Z ]*')(new forms_deprecated_1.Control(''))).toEqual(null); });
            testing_internal_1.it('should not error on null', function () { testing_internal_1.expect(forms_deprecated_1.Validators.pattern('[a-zA-Z ]*')(new forms_deprecated_1.Control(null))).toEqual(null); });
            testing_internal_1.it('should not error on valid strings', function () { testing_internal_1.expect(forms_deprecated_1.Validators.pattern('[a-zA-Z ]*')(new forms_deprecated_1.Control('aaAA'))).toEqual(null); });
            testing_internal_1.it('should error on failure to match string', function () {
                testing_internal_1.expect(forms_deprecated_1.Validators.pattern('[a-zA-Z ]*')(new forms_deprecated_1.Control('aaa0'))).toEqual({
                    'pattern': { 'requiredPattern': '^[a-zA-Z ]*$', 'actualValue': 'aaa0' }
                });
            });
        });
        testing_internal_1.it('should normalize and evaluate async validator-directives correctly', testing_1.fakeAsync(function () {
            var c = forms_deprecated_1.Validators.composeAsync([normalize_validator_1.normalizeAsyncValidator(new AsyncValidatorDirective('expected', { 'one': true }))]);
            var value = null;
            c(new forms_deprecated_1.Control()).then(function (v) { return value = v; });
            testing_1.tick(1);
            testing_internal_1.expect(value).toEqual({ 'one': true });
        }));
        testing_internal_1.describe('compose', function () {
            testing_internal_1.it('should return null when given null', function () { testing_internal_1.expect(forms_deprecated_1.Validators.compose(null)).toBe(null); });
            testing_internal_1.it('should collect errors from all the validators', function () {
                var c = forms_deprecated_1.Validators.compose([validator('a', true), validator('b', true)]);
                testing_internal_1.expect(c(new forms_deprecated_1.Control(''))).toEqual({ 'a': true, 'b': true });
            });
            testing_internal_1.it('should run validators left to right', function () {
                var c = forms_deprecated_1.Validators.compose([validator('a', 1), validator('a', 2)]);
                testing_internal_1.expect(c(new forms_deprecated_1.Control(''))).toEqual({ 'a': 2 });
            });
            testing_internal_1.it('should return null when no errors', function () {
                var c = forms_deprecated_1.Validators.compose([forms_deprecated_1.Validators.nullValidator, forms_deprecated_1.Validators.nullValidator]);
                testing_internal_1.expect(c(new forms_deprecated_1.Control(''))).toEqual(null);
            });
            testing_internal_1.it('should ignore nulls', function () {
                var c = forms_deprecated_1.Validators.compose([null, forms_deprecated_1.Validators.required]);
                testing_internal_1.expect(c(new forms_deprecated_1.Control(''))).toEqual({ 'required': true });
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
            testing_internal_1.it('should return null when given null', function () { testing_internal_1.expect(forms_deprecated_1.Validators.composeAsync(null)).toEqual(null); });
            testing_internal_1.it('should collect errors from all the validators', testing_1.fakeAsync(function () {
                var c = forms_deprecated_1.Validators.composeAsync([
                    asyncValidator('expected', { 'one': true }), asyncValidator('expected', { 'two': true })
                ]);
                var value = null;
                c(new forms_deprecated_1.Control('invalid')).then(function (v) { return value = v; });
                testing_1.tick(1);
                testing_internal_1.expect(value).toEqual({ 'one': true, 'two': true });
            }));
            testing_internal_1.it('should return null when no errors', testing_1.fakeAsync(function () {
                var c = forms_deprecated_1.Validators.composeAsync([asyncValidator('expected', { 'one': true })]);
                var value = null;
                c(new forms_deprecated_1.Control('expected')).then(function (v) { return value = v; });
                testing_1.tick(1);
                testing_internal_1.expect(value).toEqual(null);
            }));
            testing_internal_1.it('should ignore nulls', testing_1.fakeAsync(function () {
                var c = forms_deprecated_1.Validators.composeAsync([asyncValidator('expected', { 'one': true }), null]);
                var value = null;
                c(new forms_deprecated_1.Control('invalid')).then(function (v) { return value = v; });
                testing_1.tick(1);
                testing_internal_1.expect(value).toEqual({ 'one': true });
            }));
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yc19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vdGVzdC9mb3Jtcy1kZXByZWNhdGVkL3ZhbGlkYXRvcnNfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQStFLHNDQUFzQyxDQUFDLENBQUE7QUFDdEgsd0JBQStDLHVCQUF1QixDQUFDLENBQUE7QUFDdkUsaUNBQStFLHdDQUF3QyxDQUFDLENBQUE7QUFDeEgsMkJBQXlCLGlCQUFpQixDQUFDLENBQUE7QUFFM0Msc0JBQTRELHdCQUF3QixDQUFDLENBQUE7QUFDckYsd0JBQTZCLDBCQUEwQixDQUFDLENBQUE7QUFDeEQsb0NBQXNDLDJEQUEyRCxDQUFDLENBQUE7QUFFbEc7SUFDRSxtQkFBbUIsR0FBVyxFQUFFLEtBQVU7UUFDeEMsTUFBTSxDQUFDLFVBQVMsQ0FBa0I7WUFDaEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ1YsQ0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUN4QixNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVEO1FBQ0UsaUNBQW9CLFFBQWdCLEVBQVUsS0FBVTtZQUFwQyxhQUFRLEdBQVIsUUFBUSxDQUFRO1lBQVUsVUFBSyxHQUFMLEtBQUssQ0FBSztRQUFHLENBQUM7UUFFNUQsMENBQVEsR0FBUixVQUFTLENBQU07WUFBZixpQkFNQztZQUxDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEdBQVE7Z0JBQ2hDLElBQU0sS0FBSyxHQUFHLEtBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxLQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDNUQsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFD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