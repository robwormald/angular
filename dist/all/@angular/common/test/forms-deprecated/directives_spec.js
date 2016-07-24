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
var spies_1 = require('../spies');
var forms_deprecated_1 = require('@angular/common/src/forms-deprecated');
var shared_1 = require('@angular/common/src/forms-deprecated/directives/shared');
var async_1 = require('../../src/facade/async');
var promise_1 = require('../../src/facade/promise');
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
        testing_internal_1.beforeEach(function () { defaultAccessor = new forms_deprecated_1.DefaultValueAccessor(null, null); });
        testing_internal_1.describe('shared', function () {
            testing_internal_1.describe('selectValueAccessor', function () {
                var dir;
                testing_internal_1.beforeEach(function () { dir = new spies_1.SpyNgControl(); });
                testing_internal_1.it('should throw when given an empty array', function () { testing_internal_1.expect(function () { return shared_1.selectValueAccessor(dir, []); }).toThrowError(); });
                testing_internal_1.it('should return the default value accessor when no other provided', function () { testing_internal_1.expect(shared_1.selectValueAccessor(dir, [defaultAccessor])).toEqual(defaultAccessor); });
                testing_internal_1.it('should return checkbox accessor when provided', function () {
                    var checkboxAccessor = new forms_deprecated_1.CheckboxControlValueAccessor(null, null);
                    testing_internal_1.expect(shared_1.selectValueAccessor(dir, [
                        defaultAccessor, checkboxAccessor
                    ])).toEqual(checkboxAccessor);
                });
                testing_internal_1.it('should return select accessor when provided', function () {
                    var selectAccessor = new forms_deprecated_1.SelectControlValueAccessor(null, null);
                    testing_internal_1.expect(shared_1.selectValueAccessor(dir, [
                        defaultAccessor, selectAccessor
                    ])).toEqual(selectAccessor);
                });
                testing_internal_1.it('should throw when more than one build-in accessor is provided', function () {
                    var checkboxAccessor = new forms_deprecated_1.CheckboxControlValueAccessor(null, null);
                    var selectAccessor = new forms_deprecated_1.SelectControlValueAccessor(null, null);
                    testing_internal_1.expect(function () { return shared_1.selectValueAccessor(dir, [checkboxAccessor, selectAccessor]); }).toThrowError();
                });
                testing_internal_1.it('should return custom accessor when provided', function () {
                    var customAccessor = new spies_1.SpyValueAccessor();
                    var checkboxAccessor = new forms_deprecated_1.CheckboxControlValueAccessor(null, null);
                    testing_internal_1.expect(shared_1.selectValueAccessor(dir, [defaultAccessor, customAccessor, checkboxAccessor]))
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
                    testing_internal_1.expect(v(new forms_deprecated_1.Control(''))).toEqual({ 'dummy1': true, 'dummy2': true });
                });
                testing_internal_1.it('should compose validator directives', function () {
                    var dummy1 = function (_ /** TODO #9100 */) { return ({ 'dummy1': true }); };
                    var v = shared_1.composeValidators([dummy1, new CustomValidatorDirective()]);
                    testing_internal_1.expect(v(new forms_deprecated_1.Control(''))).toEqual({ 'dummy1': true, 'custom': true });
                });
            });
        });
        testing_internal_1.describe('NgFormModel', function () {
            var form;
            var formModel;
            var loginControlDir;
            testing_internal_1.beforeEach(function () {
                form = new forms_deprecated_1.NgFormModel([], []);
                formModel = new forms_deprecated_1.ControlGroup({
                    'login': new forms_deprecated_1.Control(),
                    'passwords': new forms_deprecated_1.ControlGroup({ 'password': new forms_deprecated_1.Control(), 'passwordConfirm': new forms_deprecated_1.Control() })
                });
                form.form = formModel;
                loginControlDir = new forms_deprecated_1.NgControlName(form, [forms_deprecated_1.Validators.required], [asyncValidator('expected')], [defaultAccessor]);
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
            });
            testing_internal_1.describe('addControl', function () {
                testing_internal_1.it('should throw when no control found', function () {
                    var dir = new forms_deprecated_1.NgControlName(form, null, null, [defaultAccessor]);
                    dir.name = 'invalidName';
                    testing_internal_1.expect(function () { return form.addControl(dir); })
                        .toThrowError(new RegExp("Cannot find control with name: 'invalidName'"));
                });
                testing_internal_1.it('should throw when no value accessor', function () {
                    var dir = new forms_deprecated_1.NgControlName(form, null, null, null);
                    dir.name = 'login';
                    testing_internal_1.expect(function () { return form.addControl(dir); })
                        .toThrowError(new RegExp("No value accessor for form control with name: 'login'"));
                });
                testing_internal_1.it('should throw when no value accessor with path', function () {
                    var group = new forms_deprecated_1.NgControlGroup(form, null, null);
                    var dir = new forms_deprecated_1.NgControlName(group, null, null, null);
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
            testing_internal_1.describe('addControlGroup', function () {
                var matchingPasswordsValidator = function (g /** TODO #9100 */) {
                    if (g.controls['password'].value != g.controls['passwordConfirm'].value) {
                        return { 'differentPasswords': true };
                    }
                    else {
                        return null;
                    }
                };
                testing_internal_1.it('should set up validator', testing_1.fakeAsync(function () {
                    var group = new forms_deprecated_1.NgControlGroup(form, [matchingPasswordsValidator], [asyncValidator('expected')]);
                    group.name = 'passwords';
                    form.addControlGroup(group);
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
                    var f = new forms_deprecated_1.NgFormModel([formValidator], []);
                    f.form = formModel;
                    f.ngOnChanges({ 'form': new change_detection_1.SimpleChange(null, null) });
                    testing_internal_1.expect(formModel.errors).toEqual({ 'custom': true });
                });
                testing_internal_1.it('should set up an async validator', testing_1.fakeAsync(function () {
                    var f = new forms_deprecated_1.NgFormModel([], [asyncValidator('expected')]);
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
                form = new forms_deprecated_1.NgForm([], []);
                formModel = form.form;
                personControlGroupDir = new forms_deprecated_1.NgControlGroup(form, [], []);
                personControlGroupDir.name = 'person';
                loginControlDir = new forms_deprecated_1.NgControlName(personControlGroupDir, null, null, [defaultAccessor]);
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
            });
            testing_internal_1.describe('addControl & addControlGroup', function () {
                testing_internal_1.it('should create a control with the given name', testing_1.fakeAsync(function () {
                    form.addControlGroup(personControlGroupDir);
                    form.addControl(loginControlDir);
                    testing_1.flushMicrotasks();
                    testing_internal_1.expect(formModel.find(['person', 'login'])).not.toBeNull;
                }));
                // should update the form's value and validity
            });
            testing_internal_1.describe('removeControl & removeControlGroup', function () {
                testing_internal_1.it('should remove control', testing_1.fakeAsync(function () {
                    form.addControlGroup(personControlGroupDir);
                    form.addControl(loginControlDir);
                    form.removeControlGroup(personControlGroupDir);
                    form.removeControl(loginControlDir);
                    testing_1.flushMicrotasks();
                    testing_internal_1.expect(formModel.find(['person'])).toBeNull();
                    testing_internal_1.expect(formModel.find(['person', 'login'])).toBeNull();
                }));
                // should update the form's value and validity
            });
            testing_internal_1.it('should set up sync validator', testing_1.fakeAsync(function () {
                var formValidator = function (c /** TODO #9100 */) { return ({ 'custom': true }); };
                var f = new forms_deprecated_1.NgForm([formValidator], []);
                testing_1.tick();
                testing_internal_1.expect(f.form.errors).toEqual({ 'custom': true });
            }));
            testing_internal_1.it('should set up async validator', testing_1.fakeAsync(function () {
                var f = new forms_deprecated_1.NgForm([], [asyncValidator('expected')]);
                testing_1.tick();
                testing_internal_1.expect(f.form.errors).toEqual({ 'async': true });
            }));
        });
        testing_internal_1.describe('NgControlGroup', function () {
            var formModel;
            var controlGroupDir;
            testing_internal_1.beforeEach(function () {
                formModel = new forms_deprecated_1.ControlGroup({ 'login': new forms_deprecated_1.Control(null) });
                var parent = new forms_deprecated_1.NgFormModel([], []);
                parent.form = new forms_deprecated_1.ControlGroup({ 'group': formModel });
                controlGroupDir = new forms_deprecated_1.NgControlGroup(parent, [], []);
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
            });
        });
        testing_internal_1.describe('NgFormControl', function () {
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
            };
            testing_internal_1.beforeEach(function () {
                controlDir = new forms_deprecated_1.NgFormControl([forms_deprecated_1.Validators.required], [], [defaultAccessor]);
                controlDir.valueAccessor = new DummyControlValueAccessor();
                control = new forms_deprecated_1.Control(null);
                controlDir.form = control;
            });
            testing_internal_1.it('should reexport control properties', function () { checkProperties(control); });
            testing_internal_1.it('should reexport new control properties', function () {
                var newControl = new forms_deprecated_1.Control(null);
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
                ngModel =
                    new forms_deprecated_1.NgModel([forms_deprecated_1.Validators.required], [asyncValidator('expected')], [defaultAccessor]);
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
            });
            testing_internal_1.it('should throw when no value accessor with unnamed control', function () {
                var unnamedDir = new forms_deprecated_1.NgModel(null, null, null);
                testing_internal_1.expect(function () { return unnamedDir.ngOnChanges({}); })
                    .toThrowError(new RegExp("No value accessor for form control with unspecified name"));
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
        testing_internal_1.describe('NgControlName', function () {
            var formModel;
            var controlNameDir;
            testing_internal_1.beforeEach(function () {
                formModel = new forms_deprecated_1.Control('name');
                var parent = new forms_deprecated_1.NgFormModel([], []);
                parent.form = new forms_deprecated_1.ControlGroup({ 'name': formModel });
                controlNameDir = new forms_deprecated_1.NgControlName(parent, [], [], [defaultAccessor]);
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
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlc19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vdGVzdC9mb3Jtcy1kZXByZWNhdGVkL2RpcmVjdGl2ZXNfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQXVGLHdDQUF3QyxDQUFDLENBQUE7QUFFaEksd0JBQWdELHVCQUF1QixDQUFDLENBQUE7QUFFeEUsc0JBQTZDLFVBQVUsQ0FBQyxDQUFBO0FBRXhELGlDQUF3UCxzQ0FBc0MsQ0FBQyxDQUFBO0FBRy9SLHVCQUFxRCx3REFBd0QsQ0FBQyxDQUFBO0FBQzlHLHNCQUEyQix3QkFBd0IsQ0FBQyxDQUFBO0FBQ3BELHdCQUE2QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3hELGlDQUEyQixvQ0FBb0MsQ0FBQyxDQUFBO0FBRWhFO0lBQUE7SUFPQSxDQUFDO0lBSkMsb0RBQWdCLEdBQWhCLFVBQWlCLEVBQU8sQ0FBQyxpQkFBaUIsSUFBRyxDQUFDO0lBQzlDLHFEQUFpQixHQUFqQixVQUFrQixFQUFPLENBQUMsaUJBQWlCLElBQUcsQ0FBQztJQUUvQyw4Q0FBVSxHQUFWLFVBQVcsR0FBUSxJQUFVLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUN6RCxnQ0FBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBRUQ7SUFBQTtJQUVBLENBQUM7SUFEQywyQ0FBUSxHQUFSLFVBQVMsQ0FBVSxJQUEwQixNQUFNLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLCtCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFFRCx3QkFBd0IsUUFBYSxDQUFDLGlCQUFpQixFQUFFLE9BQVc7SUFBWCx1QkFBVyxHQUFYLFdBQVc7SUFDbEUsTUFBTSxDQUFDLFVBQUMsQ0FBTSxDQUFDLGlCQUFpQjtRQUM5QixJQUFJ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