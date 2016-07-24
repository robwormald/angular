/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var testing_1 = require('@angular/core/testing');
var spies_1 = require('./spies');
var forms_1 = require('@angular/forms');
var shared_1 = require('@angular/forms/src/directives/shared');
var async_1 = require('../src/facade/async');
var promise_1 = require('../src/facade/promise');
var change_detection_1 = require('@angular/core/src/change_detection');
var DummyControlValueAccessor = (function () {
    function DummyControlValueAccessor() {
    }
    DummyControlValueAccessor.prototype.registerOnChange = function (fn /** TODO #9100 */) { };
    DummyControlValueAccessor.prototype.registerOnTouched = function (fn /** TODO #9100 */) { };
    DummyControlValueAccessor.prototype.writeValue = function (obj) { this.writtenValue = obj; };
    return DummyControlValueAccessor;
}());
var CustomValidatorDirective = (function () {
    function CustomValidatorDirective() {
    }
    CustomValidatorDirective.prototype.validate = function (c) { return { 'custom': true }; };
    return CustomValidatorDirective;
}());
function asyncValidator(expected /** TODO #9100 */, timeout) {
    if (timeout === void 0) { timeout = 0; }
    return function (c /** TODO #9100 */) {
        var completer = promise_1.PromiseWrapper.completer();
        var res = c.value != expected ? { 'async': true } : null;
        if (timeout == 0) {
            completer.resolve(res);
        }
        else {
            async_1.TimerWrapper.setTimeout(function () { completer.resolve(res); }, timeout);
        }
        return completer.promise;
    };
}
function main() {
    testing_internal_1.describe('Form Directives', function () {
        var defaultAccessor;
        testing_internal_1.beforeEach(function () { defaultAccessor = new forms_1.DefaultValueAccessor(null, null); });
        testing_internal_1.describe('shared', function () {
            testing_internal_1.describe('selectValueAccessor', function () {
                var dir;
                testing_internal_1.beforeEach(function () { dir = new spies_1.SpyNgControl(); });
                testing_internal_1.it('should throw when given an empty array', function () { testing_internal_1.expect(function () { return shared_1.selectValueAccessor(dir, []); }).toThrowError(); });
                testing_internal_1.it('should return the default value accessor when no other provided', function () { testing_internal_1.expect(shared_1.selectValueAccessor(dir, [defaultAccessor])).toEqual(defaultAccessor); });
                testing_internal_1.it('should return checkbox accessor when provided', function () {
                    var checkboxAccessor = new forms_1.CheckboxControlValueAccessor(null, null);
                    testing_internal_1.expect(shared_1.selectValueAccessor(dir, [
                        defaultAccessor, checkboxAccessor
                    ])).toEqual(checkboxAccessor);
                });
                testing_internal_1.it('should return select accessor when provided', function () {
                    var selectAccessor = new forms_1.SelectControlValueAccessor(null, null);
                    testing_internal_1.expect(shared_1.selectValueAccessor(dir, [
                        defaultAccessor, selectAccessor
                    ])).toEqual(selectAccessor);
                });
                testing_internal_1.it('should return select multiple accessor when provided', function () {
                    var selectMultipleAccessor = new forms_1.SelectMultipleControlValueAccessor();
                    testing_internal_1.expect(shared_1.selectValueAccessor(dir, [
                        defaultAccessor, selectMultipleAccessor
                    ])).toEqual(selectMultipleAccessor);
                });
                testing_internal_1.it('should throw when more than one build-in accessor is provided', function () {
                    var checkboxAccessor = new forms_1.CheckboxControlValueAccessor(null, null);
                    var selectAccessor = new forms_1.SelectControlValueAccessor(null, null);
                    testing_internal_1.expect(function () { return shared_1.selectValueAccessor(dir, [checkboxAccessor, selectAccessor]); }).toThrowError();
                });
                testing_internal_1.it('should return custom accessor when provided', function () {
                    var customAccessor = new spies_1.SpyValueAccessor();
                    var checkboxAccessor = new forms_1.CheckboxControlValueAccessor(null, null);
                    testing_internal_1.expect(shared_1.selectValueAccessor(dir, [defaultAccessor, customAccessor, checkboxAccessor]))
                        .toEqual(customAccessor);
                });
                testing_internal_1.it('should return custom accessor when provided with select multiple', function () {
                    var customAccessor = new spies_1.SpyValueAccessor();
                    var selectMultipleAccessor = new forms_1.SelectMultipleControlValueAccessor();
                    testing_internal_1.expect(shared_1.selectValueAccessor(dir, [defaultAccessor, customAccessor, selectMultipleAccessor]))
                        .toEqual(customAccessor);
                });
                testing_internal_1.it('should throw when more than one custom accessor is provided', function () {
                    var customAccessor = new spies_1.SpyValueAccessor();
                    testing_internal_1.expect(function () { return shared_1.selectValueAccessor(dir, [customAccessor, customAccessor]); }).toThrowError();
                });
            });
            testing_internal_1.describe('composeValidators', function () {
                testing_internal_1.it('should compose functions', function () {
                    var dummy1 = function (_ /** TODO #9100 */) { return ({ 'dummy1': true }); };
                    var dummy2 = function (_ /** TODO #9100 */) { return ({ 'dummy2': true }); };
                    var v = shared_1.composeValidators([dummy1, dummy2]);
                    testing_internal_1.expect(v(new forms_1.FormControl(''))).toEqual({ 'dummy1': true, 'dummy2': true });
                });
                testing_internal_1.it('should compose validator directives', function () {
                    var dummy1 = function (_ /** TODO #9100 */) { return ({ 'dummy1': true }); };
                    var v = shared_1.composeValidators([dummy1, new CustomValidatorDirective()]);
                    testing_internal_1.expect(v(new forms_1.FormControl(''))).toEqual({ 'dummy1': true, 'custom': true });
                });
            });
        });
        testing_internal_1.describe('formGroup', function () {
            var form;
            var formModel;
            var loginControlDir;
            testing_internal_1.beforeEach(function () {
                form = new forms_1.FormGroupDirective([], []);
                formModel = new forms_1.FormGroup({
                    'login': new forms_1.FormControl(),
                    'passwords': new forms_1.FormGroup({ 'password': new forms_1.FormControl(), 'passwordConfirm': new forms_1.FormControl() })
                });
                form.form = formModel;
                loginControlDir = new forms_1.FormControlName(form, [forms_1.Validators.required], [asyncValidator('expected')], [defaultAccessor]);
                loginControlDir.name = 'login';
                loginControlDir.valueAccessor = new DummyControlValueAccessor();
            });
            testing_internal_1.it('should reexport control properties', function () {
                testing_internal_1.expect(form.control).toBe(formModel);
                testing_internal_1.expect(form.value).toBe(formModel.value);
                testing_internal_1.expect(form.valid).toBe(formModel.valid);
                testing_internal_1.expect(form.errors).toBe(formModel.errors);
                testing_internal_1.expect(form.pristine).toBe(formModel.pristine);
                testing_internal_1.expect(form.dirty).toBe(formModel.dirty);
                testing_internal_1.expect(form.touched).toBe(formModel.touched);
                testing_internal_1.expect(form.untouched).toBe(formModel.untouched);
                testing_internal_1.expect(form.statusChanges).toBe(formModel.statusChanges);
                testing_internal_1.expect(form.valueChanges).toBe(formModel.valueChanges);
            });
            testing_internal_1.describe('addControl', function () {
                testing_internal_1.it('should throw when no control found', function () {
                    var dir = new forms_1.FormControlName(form, null, null, [defaultAccessor]);
                    dir.name = 'invalidName';
                    testing_internal_1.expect(function () { return form.addControl(dir); })
                        .toThrowError(new RegExp("Cannot find control with name: 'invalidName'"));
                });
                testing_internal_1.it('should throw for a named control when no value accessor', function () {
                    var dir = new forms_1.FormControlName(form, null, null, null);
                    dir.name = 'login';
                    testing_internal_1.expect(function () { return form.addControl(dir); })
                        .toThrowError(new RegExp("No value accessor for form control with name: 'login'"));
                });
                testing_internal_1.it('should throw when no value accessor with path', function () {
                    var group = new forms_1.FormGroupName(form, null, null);
                    var dir = new forms_1.FormControlName(group, null, null, null);
                    group.name = 'passwords';
                    dir.name = 'password';
                    testing_internal_1.expect(function () { return form.addControl(dir); })
                        .toThrowError(new RegExp("No value accessor for form control with path: 'passwords -> password'"));
                });
                testing_internal_1.it('should set up validators', testing_1.fakeAsync(function () {
                    form.addControl(loginControlDir);
                    // sync validators are set
                    testing_internal_1.expect(formModel.hasError('required', ['login'])).toBe(true);
                    testing_internal_1.expect(formModel.hasError('async', ['login'])).toBe(false);
                    formModel.find(['login']).updateValue('invalid value');
                    // sync validator passes, running async validators
                    testing_internal_1.expect(formModel.pending).toBe(true);
                    testing_1.tick();
                    testing_internal_1.expect(formModel.hasError('required', ['login'])).toBe(false);
                    testing_internal_1.expect(formModel.hasError('async', ['login'])).toBe(true);
                }));
                testing_internal_1.it('should write value to the DOM', function () {
                    formModel.find(['login']).updateValue('initValue');
                    form.addControl(loginControlDir);
                    testing_internal_1.expect(loginControlDir.valueAccessor.writtenValue).toEqual('initValue');
                });
                testing_internal_1.it('should add the directive to the list of directives included in the form', function () {
                    form.addControl(loginControlDir);
                    testing_internal_1.expect(form.directives).toEqual([loginControlDir]);
                });
            });
            testing_internal_1.describe('addFormGroup', function () {
                var matchingPasswordsValidator = function (g /** TODO #9100 */) {
                    if (g.controls['password'].value != g.controls['passwordConfirm'].value) {
                        return { 'differentPasswords': true };
                    }
                    else {
                        return null;
                    }
                };
                testing_internal_1.it('should set up validator', testing_1.fakeAsync(function () {
                    var group = new forms_1.FormGroupName(form, [matchingPasswordsValidator], [asyncValidator('expected')]);
                    group.name = 'passwords';
                    form.addFormGroup(group);
                    formModel.find(['passwords', 'password']).updateValue('somePassword');
                    formModel.find([
                        'passwords', 'passwordConfirm'
                    ]).updateValue('someOtherPassword');
                    // sync validators are set
                    testing_internal_1.expect(formModel.hasError('differentPasswords', ['passwords'])).toEqual(true);
                    formModel.find([
                        'passwords', 'passwordConfirm'
                    ]).updateValue('somePassword');
                    // sync validators pass, running async validators
                    testing_internal_1.expect(formModel.pending).toBe(true);
                    testing_1.tick();
                    testing_internal_1.expect(formModel.hasError('async', ['passwords'])).toBe(true);
                }));
            });
            testing_internal_1.describe('removeControl', function () {
                testing_internal_1.it('should remove the directive to the list of directives included in the form', function () {
                    form.addControl(loginControlDir);
                    form.removeControl(loginControlDir);
                    testing_internal_1.expect(form.directives).toEqual([]);
                });
            });
            testing_internal_1.describe('ngOnChanges', function () {
                testing_internal_1.it('should update dom values of all the directives', function () {
                    form.addControl(loginControlDir);
                    formModel.find(['login']).updateValue('new value');
                    form.ngOnChanges({});
                    testing_internal_1.expect(loginControlDir.valueAccessor.writtenValue).toEqual('new value');
                });
                testing_internal_1.it('should set up a sync validator', function () {
                    var formValidator = function (c /** TODO #9100 */) { return ({ 'custom': true }); };
                    var f = new forms_1.FormGroupDirective([formValidator], []);
                    f.form = formModel;
                    f.ngOnChanges({ 'form': new change_detection_1.SimpleChange(null, null) });
                    testing_internal_1.expect(formModel.errors).toEqual({ 'custom': true });
                });
                testing_internal_1.it('should set up an async validator', testing_1.fakeAsync(function () {
                    var f = new forms_1.FormGroupDirective([], [asyncValidator('expected')]);
                    f.form = formModel;
                    f.ngOnChanges({ 'form': new change_detection_1.SimpleChange(null, null) });
                    testing_1.tick();
                    testing_internal_1.expect(formModel.errors).toEqual({ 'async': true });
                }));
            });
        });
        testing_internal_1.describe('NgForm', function () {
            var form;
            var formModel;
            var loginControlDir;
            var personControlGroupDir;
            testing_internal_1.beforeEach(function () {
                form = new forms_1.NgForm([], []);
                formModel = form.form;
                personControlGroupDir = new forms_1.NgModelGroup(form, [], []);
                personControlGroupDir.name = 'person';
                loginControlDir = new forms_1.NgModel(personControlGroupDir, null, null, [defaultAccessor]);
                loginControlDir.name = 'login';
                loginControlDir.valueAccessor = new DummyControlValueAccessor();
            });
            testing_internal_1.it('should reexport control properties', function () {
                testing_internal_1.expect(form.control).toBe(formModel);
                testing_internal_1.expect(form.value).toBe(formModel.value);
                testing_internal_1.expect(form.valid).toBe(formModel.valid);
                testing_internal_1.expect(form.errors).toBe(formModel.errors);
                testing_internal_1.expect(form.pristine).toBe(formModel.pristine);
                testing_internal_1.expect(form.dirty).toBe(formModel.dirty);
                testing_internal_1.expect(form.touched).toBe(formModel.touched);
                testing_internal_1.expect(form.untouched).toBe(formModel.untouched);
                testing_internal_1.expect(form.statusChanges).toBe(formModel.statusChanges);
                testing_internal_1.expect(form.valueChanges).toBe(formModel.valueChanges);
            });
            testing_internal_1.describe('addControl & addFormGroup', function () {
                testing_internal_1.it('should create a control with the given name', testing_1.fakeAsync(function () {
                    form.addFormGroup(personControlGroupDir);
                    form.addControl(loginControlDir);
                    testing_1.flushMicrotasks();
                    testing_internal_1.expect(formModel.find(['person', 'login'])).not.toBeNull;
                }));
                // should update the form's value and validity
            });
            testing_internal_1.describe('removeControl & removeFormGroup', function () {
                testing_internal_1.it('should remove control', testing_1.fakeAsync(function () {
                    form.addFormGroup(personControlGroupDir);
                    form.addControl(loginControlDir);
                    form.removeFormGroup(personControlGroupDir);
                    form.removeControl(loginControlDir);
                    testing_1.flushMicrotasks();
                    testing_internal_1.expect(formModel.find(['person'])).toBeNull();
                    testing_internal_1.expect(formModel.find(['person', 'login'])).toBeNull();
                }));
                // should update the form's value and validity
            });
            testing_internal_1.it('should set up sync validator', testing_1.fakeAsync(function () {
                var formValidator = function (c /** TODO #9100 */) { return ({ 'custom': true }); };
                var f = new forms_1.NgForm([formValidator], []);
                testing_1.tick();
                testing_internal_1.expect(f.form.errors).toEqual({ 'custom': true });
            }));
            testing_internal_1.it('should set up async validator', testing_1.fakeAsync(function () {
                var f = new forms_1.NgForm([], [asyncValidator('expected')]);
                testing_1.tick();
                testing_internal_1.expect(f.form.errors).toEqual({ 'async': true });
            }));
        });
        testing_internal_1.describe('FormGroupName', function () {
            var formModel;
            var controlGroupDir;
            testing_internal_1.beforeEach(function () {
                formModel = new forms_1.FormGroup({ 'login': new forms_1.FormControl(null) });
                var parent = new forms_1.FormGroupDirective([], []);
                parent.form = new forms_1.FormGroup({ 'group': formModel });
                controlGroupDir = new forms_1.FormGroupName(parent, [], []);
                controlGroupDir.name = 'group';
            });
            testing_internal_1.it('should reexport control properties', function () {
                testing_internal_1.expect(controlGroupDir.control).toBe(formModel);
                testing_internal_1.expect(controlGroupDir.value).toBe(formModel.value);
                testing_internal_1.expect(controlGroupDir.valid).toBe(formModel.valid);
                testing_internal_1.expect(controlGroupDir.errors).toBe(formModel.errors);
                testing_internal_1.expect(controlGroupDir.pristine).toBe(formModel.pristine);
                testing_internal_1.expect(controlGroupDir.dirty).toBe(formModel.dirty);
                testing_internal_1.expect(controlGroupDir.touched).toBe(formModel.touched);
                testing_internal_1.expect(controlGroupDir.untouched).toBe(formModel.untouched);
                testing_internal_1.expect(controlGroupDir.statusChanges).toBe(formModel.statusChanges);
                testing_internal_1.expect(controlGroupDir.valueChanges).toBe(formModel.valueChanges);
            });
        });
        testing_internal_1.describe('FormArrayName', function () {
            var formModel;
            var formArrayDir;
            testing_internal_1.beforeEach(function () {
                var parent = new forms_1.FormGroupDirective([], []);
                formModel = new forms_1.FormArray([new forms_1.FormControl('')]);
                parent.form = new forms_1.FormGroup({ 'array': formModel });
                formArrayDir = new forms_1.FormArrayName(parent, [], []);
                formArrayDir.name = 'array';
            });
            testing_internal_1.it('should reexport control properties', function () {
                testing_internal_1.expect(formArrayDir.control).toBe(formModel);
                testing_internal_1.expect(formArrayDir.value).toBe(formModel.value);
                testing_internal_1.expect(formArrayDir.valid).toBe(formModel.valid);
                testing_internal_1.expect(formArrayDir.errors).toBe(formModel.errors);
                testing_internal_1.expect(formArrayDir.pristine).toBe(formModel.pristine);
                testing_internal_1.expect(formArrayDir.dirty).toBe(formModel.dirty);
                testing_internal_1.expect(formArrayDir.touched).toBe(formModel.touched);
                testing_internal_1.expect(formArrayDir.untouched).toBe(formModel.untouched);
            });
        });
        testing_internal_1.describe('FormControlDirective', function () {
            var controlDir;
            var control;
            var checkProperties = function (control /** TODO #9100 */) {
                testing_internal_1.expect(controlDir.control).toBe(control);
                testing_internal_1.expect(controlDir.value).toBe(control.value);
                testing_internal_1.expect(controlDir.valid).toBe(control.valid);
                testing_internal_1.expect(controlDir.errors).toBe(control.errors);
                testing_internal_1.expect(controlDir.pristine).toBe(control.pristine);
                testing_internal_1.expect(controlDir.dirty).toBe(control.dirty);
                testing_internal_1.expect(controlDir.touched).toBe(control.touched);
                testing_internal_1.expect(controlDir.untouched).toBe(control.untouched);
                testing_internal_1.expect(controlDir.statusChanges).toBe(control.statusChanges);
                testing_internal_1.expect(controlDir.valueChanges).toBe(control.valueChanges);
            };
            testing_internal_1.beforeEach(function () {
                controlDir = new forms_1.FormControlDirective([forms_1.Validators.required], [], [defaultAccessor]);
                controlDir.valueAccessor = new DummyControlValueAccessor();
                control = new forms_1.FormControl(null);
                controlDir.form = control;
            });
            testing_internal_1.it('should reexport control properties', function () { checkProperties(control); });
            testing_internal_1.it('should reexport new control properties', function () {
                var newControl = new forms_1.FormControl(null);
                controlDir.form = newControl;
                controlDir.ngOnChanges({ 'form': new change_detection_1.SimpleChange(control, newControl) });
                checkProperties(newControl);
            });
            testing_internal_1.it('should set up validator', function () {
                testing_internal_1.expect(control.valid).toBe(true);
                // this will add the required validator and recalculate the validity
                controlDir.ngOnChanges({ 'form': new change_detection_1.SimpleChange(null, control) });
                testing_internal_1.expect(control.valid).toBe(false);
            });
        });
        testing_internal_1.describe('NgModel', function () {
            var ngModel;
            testing_internal_1.beforeEach(function () {
                ngModel = new forms_1.NgModel(null, [forms_1.Validators.required], [asyncValidator('expected')], [defaultAccessor]);
                ngModel.valueAccessor = new DummyControlValueAccessor();
            });
            testing_internal_1.it('should reexport control properties', function () {
                var control = ngModel.control;
                testing_internal_1.expect(ngModel.control).toBe(control);
                testing_internal_1.expect(ngModel.value).toBe(control.value);
                testing_internal_1.expect(ngModel.valid).toBe(control.valid);
                testing_internal_1.expect(ngModel.errors).toBe(control.errors);
                testing_internal_1.expect(ngModel.pristine).toBe(control.pristine);
                testing_internal_1.expect(ngModel.dirty).toBe(control.dirty);
                testing_internal_1.expect(ngModel.touched).toBe(control.touched);
                testing_internal_1.expect(ngModel.untouched).toBe(control.untouched);
                testing_internal_1.expect(ngModel.statusChanges).toBe(control.statusChanges);
                testing_internal_1.expect(ngModel.valueChanges).toBe(control.valueChanges);
            });
            testing_internal_1.it('should throw when no value accessor with named control', function () {
                var namedDir = new forms_1.NgModel(null, null, null, null);
                namedDir.name = 'one';
                testing_internal_1.expect(function () { return namedDir.ngOnChanges({}); })
                    .toThrowError(new RegExp("No value accessor for form control with name: 'one'"));
            });
            testing_internal_1.it('should throw when no value accessor with unnamed control', function () {
                var unnamedDir = new forms_1.NgModel(null, null, null, null);
                testing_internal_1.expect(function () { return unnamedDir.ngOnChanges({}); })
                    .toThrowError(new RegExp("No value accessor for form control with unspecified name attribute"));
            });
            testing_internal_1.it('should set up validator', testing_1.fakeAsync(function () {
                // this will add the required validator and recalculate the validity
                ngModel.ngOnChanges({});
                testing_1.tick();
                testing_internal_1.expect(ngModel.control.errors).toEqual({ 'required': true });
                ngModel.control.updateValue('someValue');
                testing_1.tick();
                testing_internal_1.expect(ngModel.control.errors).toEqual({ 'async': true });
            }));
        });
        testing_internal_1.describe('FormControlName', function () {
            var formModel;
            var controlNameDir;
            testing_internal_1.beforeEach(function () {
                formModel = new forms_1.FormControl('name');
                var parent = new forms_1.FormGroupDirective([], []);
                parent.form = new forms_1.FormGroup({ 'name': formModel });
                controlNameDir = new forms_1.FormControlName(parent, [], [], [defaultAccessor]);
                controlNameDir.name = 'name';
            });
            testing_internal_1.it('should reexport control properties', function () {
                testing_internal_1.expect(controlNameDir.control).toBe(formModel);
                testing_internal_1.expect(controlNameDir.value).toBe(formModel.value);
                testing_internal_1.expect(controlNameDir.valid).toBe(formModel.valid);
                testing_internal_1.expect(controlNameDir.errors).toBe(formModel.errors);
                testing_internal_1.expect(controlNameDir.pristine).toBe(formModel.pristine);
                testing_internal_1.expect(controlNameDir.dirty).toBe(formModel.dirty);
                testing_internal_1.expect(controlNameDir.touched).toBe(formModel.touched);
                testing_internal_1.expect(controlNameDir.untouched).toBe(formModel.untouched);
                testing_internal_1.expect(controlNameDir.statusChanges).toBe(formModel.statusChanges);
                testing_internal_1.expect(controlNameDir.valueChanges).toBe(formModel.valueChanges);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlc19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9mb3Jtcy90ZXN0L2RpcmVjdGl2ZXNfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQTRGLHdDQUF3QyxDQUFDLENBQUE7QUFFckksd0JBQWdELHVCQUF1QixDQUFDLENBQUE7QUFFeEUsc0JBQTZDLFNBQVMsQ0FBQyxDQUFBO0FBRXZELHNCQUFvVixnQkFBZ0IsQ0FBQyxDQUFBO0FBRXJXLHVCQUFxRCxzQ0FBc0MsQ0FBQyxDQUFBO0FBQzVGLHNCQUEyQixxQkFBcUIsQ0FBQyxDQUFBO0FBQ2pELHdCQUE2Qix1QkFBdUIsQ0FBQyxDQUFBO0FBQ3JELGlDQUEyQixvQ0FBb0MsQ0FBQyxDQUFBO0FBRWhFO0lBQUE7SUFPQSxDQUFDO0lBSkMsb0RBQWdCLEdBQWhCLFVBQWlCLEVBQU8sQ0FBQyxpQkFBaUIsSUFBRyxDQUFDO0lBQzlDLHFEQUFpQixHQUFqQixVQUFrQixFQUFPLENBQUMsaUJBQWlCLElBQUcsQ0FBQztJQUUvQyw4Q0FBVSxHQUFWLFVBQVcsR0FBUSxJQUFVLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6RCxnQ0FBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBRUQ7SUFBQTtJQUVBLENBQUM7SUFEQywyQ0FBUSxHQUFSLFVBQVMsQ0FBYyxJQUEwQixNQUFNLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdFLCtCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFFRCx3QkFBd0IsUUFBYSxDQUFDLGlCQUFpQixFQUFFLE9BQVc7SUFBWCx1QkFBVyxHQUFYLFdBQVc7SUFDbEUsTUFBTSxDQUFDLFVBQUMsQ0FBTSxDQUFDLGlCQUFpQjtRQUM5QixJQUFJLFNBQVMsR0FBRyx3QkFBYyxDQUFD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