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
var async_1 = require('../src/facade/async');
var lang_1 = require('../src/facade/lang');
var promise_1 = require('../src/facade/promise');
function main() {
    function asyncValidator(expected /** TODO #9100 */, timeouts) {
        if (timeouts === void 0) { timeouts = {}; }
        return function (c /** TODO #9100 */) {
            var completer = promise_1.PromiseWrapper.completer();
            var t = lang_1.isPresent(timeouts[c.value]) ?
                timeouts[c.value] :
                0;
            var res = c.value != expected ? { 'async': true } : null;
            if (t == 0) {
                completer.resolve(res);
            }
            else {
                async_1.TimerWrapper.setTimeout(function () { completer.resolve(res); }, t);
            }
            return completer.promise;
        };
    }
    function asyncValidatorReturningObservable(c) {
        var e = new async_1.EventEmitter();
        promise_1.PromiseWrapper.scheduleMicrotask(function () { return async_1.ObservableWrapper.callEmit(e, { 'async': true }); });
        return e;
    }
    function otherAsyncValidator() { return promise_1.PromiseWrapper.resolve({ 'other': true }); }
    testing_internal_1.describe('Form Model', function () {
        testing_internal_1.describe('FormControl', function () {
            testing_internal_1.it('should default the value to null', function () {
                var c = new forms_1.FormControl();
                expect(c.value).toBe(null);
            });
            testing_internal_1.describe('validator', function () {
                testing_internal_1.it('should run validator with the initial value', function () {
                    var c = new forms_1.FormControl('value', forms_1.Validators.required);
                    expect(c.valid).toEqual(true);
                });
                testing_internal_1.it('should rerun the validator when the value changes', function () {
                    var c = new forms_1.FormControl('value', forms_1.Validators.required);
                    c.updateValue(null);
                    expect(c.valid).toEqual(false);
                });
                testing_internal_1.it('should support arrays of validator functions if passed', function () {
                    var c = new forms_1.FormControl('value', [forms_1.Validators.required, forms_1.Validators.minLength(3)]);
                    c.updateValue('a');
                    expect(c.valid).toEqual(false);
                    c.updateValue('aaa');
                    expect(c.valid).toEqual(true);
                });
                testing_internal_1.it('should return errors', function () {
                    var c = new forms_1.FormControl(null, forms_1.Validators.required);
                    expect(c.errors).toEqual({ 'required': true });
                });
                testing_internal_1.it('should set single validator', function () {
                    var c = new forms_1.FormControl(null);
                    expect(c.valid).toEqual(true);
                    c.setValidators(forms_1.Validators.required);
                    c.updateValue(null);
                    expect(c.valid).toEqual(false);
                    c.updateValue('abc');
                    expect(c.valid).toEqual(true);
                });
                testing_internal_1.it('should set multiple validators from array', function () {
                    var c = new forms_1.FormControl('');
                    expect(c.valid).toEqual(true);
                    c.setValidators([forms_1.Validators.minLength(5), forms_1.Validators.required]);
                    c.updateValue('');
                    expect(c.valid).toEqual(false);
                    c.updateValue('abc');
                    expect(c.valid).toEqual(false);
                    c.updateValue('abcde');
                    expect(c.valid).toEqual(true);
                });
                testing_internal_1.it('should clear validators', function () {
                    var c = new forms_1.FormControl('', forms_1.Validators.required);
                    expect(c.valid).toEqual(false);
                    c.clearValidators();
                    expect(c.validator).toEqual(null);
                    c.updateValue('');
                    expect(c.valid).toEqual(true);
                });
                testing_internal_1.it('should add after clearing', function () {
                    var c = new forms_1.FormControl('', forms_1.Validators.required);
                    expect(c.valid).toEqual(false);
                    c.clearValidators();
                    expect(c.validator).toEqual(null);
                    c.setValidators([forms_1.Validators.required]);
                    expect(c.validator).not.toBe(null);
                });
            });
            testing_internal_1.describe('asyncValidator', function () {
                testing_internal_1.it('should run validator with the initial value', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('value', null, asyncValidator('expected'));
                    testing_1.tick();
                    expect(c.valid).toEqual(false);
                    expect(c.errors).toEqual({ 'async': true });
                }));
                testing_internal_1.it('should support validators returning observables', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('value', null, asyncValidatorReturningObservable);
                    testing_1.tick();
                    expect(c.valid).toEqual(false);
                    expect(c.errors).toEqual({ 'async': true });
                }));
                testing_internal_1.it('should rerun the validator when the value changes', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('value', null, asyncValidator('expected'));
                    c.updateValue('expected');
                    testing_1.tick();
                    expect(c.valid).toEqual(true);
                }));
                testing_internal_1.it('should run the async validator only when the sync validator passes', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('', forms_1.Validators.required, asyncValidator('expected'));
                    testing_1.tick();
                    expect(c.errors).toEqual({ 'required': true });
                    c.updateValue('some value');
                    testing_1.tick();
                    expect(c.errors).toEqual({ 'async': true });
                }));
                testing_internal_1.it('should mark the control as pending while running the async validation', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('', null, asyncValidator('expected'));
                    expect(c.pending).toEqual(true);
                    testing_1.tick();
                    expect(c.pending).toEqual(false);
                }));
                testing_internal_1.it('should only use the latest async validation run', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('', null, asyncValidator('expected', { 'long': 200, 'expected': 100 }));
                    c.updateValue('long');
                    c.updateValue('expected');
                    testing_1.tick(300);
                    expect(c.valid).toEqual(true);
                }));
                testing_internal_1.it('should support arrays of async validator functions if passed', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('value', null, [asyncValidator('expected'), otherAsyncValidator]);
                    testing_1.tick();
                    expect(c.errors).toEqual({ 'async': true, 'other': true });
                }));
                testing_internal_1.it('should add single async validator', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('value', null);
                    c.setAsyncValidators(asyncValidator('expected'));
                    expect(c.asyncValidator).not.toEqual(null);
                    c.updateValue('expected');
                    testing_1.tick();
                    expect(c.valid).toEqual(true);
                }));
                testing_internal_1.it('should add async validator from array', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('value', null);
                    c.setAsyncValidators([asyncValidator('expected')]);
                    expect(c.asyncValidator).not.toEqual(null);
                    c.updateValue('expected');
                    testing_1.tick();
                    expect(c.valid).toEqual(true);
                }));
                testing_internal_1.it('should clear async validators', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('value', [asyncValidator('expected'), otherAsyncValidator]);
                    c.clearValidators();
                    expect(c.asyncValidator).toEqual(null);
                }));
            });
            testing_internal_1.describe('dirty', function () {
                testing_internal_1.it('should be false after creating a control', function () {
                    var c = new forms_1.FormControl('value');
                    expect(c.dirty).toEqual(false);
                });
                testing_internal_1.it('should be true after changing the value of the control', function () {
                    var c = new forms_1.FormControl('value');
                    c.markAsDirty();
                    expect(c.dirty).toEqual(true);
                });
            });
            testing_internal_1.describe('touched', function () {
                testing_internal_1.it('should be false after creating a control', function () {
                    var c = new forms_1.FormControl('value');
                    expect(c.touched).toEqual(false);
                });
                testing_internal_1.it('should be true after markAsTouched runs', function () {
                    var c = new forms_1.FormControl('value');
                    c.markAsTouched();
                    expect(c.touched).toEqual(true);
                });
            });
            testing_internal_1.describe('updateValue', function () {
                var g /** TODO #9100 */, c;
                testing_internal_1.beforeEach(function () {
                    c = new forms_1.FormControl('oldValue');
                    g = new forms_1.FormGroup({ 'one': c });
                });
                testing_internal_1.it('should update the value of the control', function () {
                    c.updateValue('newValue');
                    expect(c.value).toEqual('newValue');
                });
                testing_internal_1.it('should invoke ngOnChanges if it is present', function () {
                    var ngOnChanges;
                    c.registerOnChange(function (v /** TODO #9100 */) { return ngOnChanges = ['invoked', v]; });
                    c.updateValue('newValue');
                    expect(ngOnChanges).toEqual(['invoked', 'newValue']);
                });
                testing_internal_1.it('should not invoke on change when explicitly specified', function () {
                    var onChange = null;
                    c.registerOnChange(function (v /** TODO #9100 */) { return onChange = ['invoked', v]; });
                    c.updateValue('newValue', { emitModelToViewChange: false });
                    expect(onChange).toBeNull();
                });
                testing_internal_1.it('should update the parent', function () {
                    c.updateValue('newValue');
                    expect(g.value).toEqual({ 'one': 'newValue' });
                });
                testing_internal_1.it('should not update the parent when explicitly specified', function () {
                    c.updateValue('newValue', { onlySelf: true });
                    expect(g.value).toEqual({ 'one': 'oldValue' });
                });
                testing_internal_1.it('should fire an event', testing_1.fakeAsync(function () {
                    async_1.ObservableWrapper.subscribe(c.valueChanges, function (value) { expect(value).toEqual('newValue'); });
                    c.updateValue('newValue');
                    testing_1.tick();
                }));
                testing_internal_1.it('should not fire an event when explicitly specified', testing_1.fakeAsync(function () {
                    async_1.ObservableWrapper.subscribe(c.valueChanges, function (value) { throw 'Should not happen'; });
                    c.updateValue('newValue', { emitEvent: false });
                    testing_1.tick();
                }));
            });
            testing_internal_1.describe('reset()', function () {
                var c;
                testing_internal_1.beforeEach(function () { c = new forms_1.FormControl('initial value'); });
                testing_internal_1.it('should restore the initial value of the control if passed', function () {
                    c.updateValue('new value');
                    expect(c.value).toBe('new value');
                    c.reset('initial value');
                    expect(c.value).toBe('initial value');
                });
                testing_internal_1.it('should clear the control value if no value is passed', function () {
                    c.updateValue('new value');
                    expect(c.value).toBe('new value');
                    c.reset();
                    expect(c.value).toBe(null);
                });
                testing_internal_1.it('should update the value of any parent controls with passed value', function () {
                    var g = new forms_1.FormGroup({ 'one': c });
                    c.updateValue('new value');
                    expect(g.value).toEqual({ 'one': 'new value' });
                    c.reset('initial value');
                    expect(g.value).toEqual({ 'one': 'initial value' });
                });
                testing_internal_1.it('should update the value of any parent controls with null value', function () {
                    var g = new forms_1.FormGroup({ 'one': c });
                    c.updateValue('new value');
                    expect(g.value).toEqual({ 'one': 'new value' });
                    c.reset();
                    expect(g.value).toEqual({ 'one': null });
                });
                testing_internal_1.it('should mark the control as pristine', function () {
                    c.markAsDirty();
                    expect(c.pristine).toBe(false);
                    c.reset();
                    expect(c.pristine).toBe(true);
                });
                testing_internal_1.it('should set the parent pristine state if all pristine', function () {
                    var g = new forms_1.FormGroup({ 'one': c });
                    c.markAsDirty();
                    expect(g.pristine).toBe(false);
                    c.reset();
                    expect(g.pristine).toBe(true);
                });
                testing_internal_1.it('should not set the parent pristine state if it has other dirty controls', function () {
                    var c2 = new forms_1.FormControl('two');
                    var g = new forms_1.FormGroup({ 'one': c, 'two': c2 });
                    c.markAsDirty();
                    c2.markAsDirty();
                    c.reset();
                    expect(g.pristine).toBe(false);
                });
                testing_internal_1.it('should mark the control as untouched', function () {
                    c.markAsTouched();
                    expect(c.untouched).toBe(false);
                    c.reset();
                    expect(c.untouched).toBe(true);
                });
                testing_internal_1.it('should set the parent untouched state if all untouched', function () {
                    var g = new forms_1.FormGroup({ 'one': c });
                    c.markAsTouched();
                    expect(g.untouched).toBe(false);
                    c.reset();
                    expect(g.untouched).toBe(true);
                });
                testing_internal_1.it('should not set the parent untouched state if other touched controls', function () {
                    var c2 = new forms_1.FormControl('two');
                    var g = new forms_1.FormGroup({ 'one': c, 'two': c2 });
                    c.markAsTouched();
                    c2.markAsTouched();
                    c.reset();
                    expect(g.untouched).toBe(false);
                });
                testing_internal_1.describe('reset() events', function () {
                    var g, c2, logger;
                    testing_internal_1.beforeEach(function () {
                        c2 = new forms_1.FormControl('two');
                        g = new forms_1.FormGroup({ 'one': c, 'two': c2 });
                        logger = [];
                    });
                    testing_internal_1.it('should emit one valueChange event per reset control', function () {
                        g.valueChanges.subscribe(function () { return logger.push('group'); });
                        c.valueChanges.subscribe(function () { return logger.push('control1'); });
                        c2.valueChanges.subscribe(function () { return logger.push('control2'); });
                        c.reset();
                        expect(logger).toEqual(['control1', 'group']);
                    });
                    testing_internal_1.it('should emit one statusChange event per reset control', function () {
                        g.statusChanges.subscribe(function () { return logger.push('group'); });
                        c.statusChanges.subscribe(function () { return logger.push('control1'); });
                        c2.statusChanges.subscribe(function () { return logger.push('control2'); });
                        c.reset();
                        expect(logger).toEqual(['control1', 'group']);
                    });
                });
            });
            testing_internal_1.describe('valueChanges & statusChanges', function () {
                var c;
                testing_internal_1.beforeEach(function () { c = new forms_1.FormControl('old', forms_1.Validators.required); });
                testing_internal_1.it('should fire an event after the value has been updated', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(c.valueChanges, function (value) {
                        expect(c.value).toEqual('new');
                        expect(value).toEqual('new');
                        async.done();
                    });
                    c.updateValue('new');
                }));
                testing_internal_1.it('should fire an event after the status has been updated to invalid', testing_1.fakeAsync(function () {
                    async_1.ObservableWrapper.subscribe(c.statusChanges, function (status) {
                        expect(c.status).toEqual('INVALID');
                        expect(status).toEqual('INVALID');
                    });
                    c.updateValue('');
                    testing_1.tick();
                }));
                testing_internal_1.it('should fire an event after the status has been updated to pending', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('old', forms_1.Validators.required, asyncValidator('expected'));
                    var log = [];
                    async_1.ObservableWrapper.subscribe(c.valueChanges, function (value) { return log.push("value: '" + value + "'"); });
                    async_1.ObservableWrapper.subscribe(c.statusChanges, function (status) { return log.push("status: '" + status + "'"); });
                    c.updateValue('');
                    testing_1.tick();
                    c.updateValue('nonEmpty');
                    testing_1.tick();
                    c.updateValue('expected');
                    testing_1.tick();
                    expect(log).toEqual([
                        '' +
                            'value: \'\'',
                        'status: \'INVALID\'',
                        'value: \'nonEmpty\'',
                        'status: \'PENDING\'',
                        'status: \'INVALID\'',
                        'value: \'expected\'',
                        'status: \'PENDING\'',
                        'status: \'VALID\'',
                    ]);
                }));
                // TODO: remove the if statement after making observable delivery sync
                testing_internal_1.it('should update set errors and status before emitting an event', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    c.valueChanges.subscribe(function (value /** TODO #9100 */) {
                        expect(c.valid).toEqual(false);
                        expect(c.errors).toEqual({ 'required': true });
                        async.done();
                    });
                    c.updateValue('');
                }));
                testing_internal_1.it('should return a cold observable', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    c.updateValue('will be ignored');
                    async_1.ObservableWrapper.subscribe(c.valueChanges, function (value) {
                        expect(value).toEqual('new');
                        async.done();
                    });
                    c.updateValue('new');
                }));
            });
            testing_internal_1.describe('setErrors', function () {
                testing_internal_1.it('should set errors on a control', function () {
                    var c = new forms_1.FormControl('someValue');
                    c.setErrors({ 'someError': true });
                    expect(c.valid).toEqual(false);
                    expect(c.errors).toEqual({ 'someError': true });
                });
                testing_internal_1.it('should reset the errors and validity when the value changes', function () {
                    var c = new forms_1.FormControl('someValue', forms_1.Validators.required);
                    c.setErrors({ 'someError': true });
                    c.updateValue('');
                    expect(c.errors).toEqual({ 'required': true });
                });
                testing_internal_1.it('should update the parent group\'s validity', function () {
                    var c = new forms_1.FormControl('someValue');
                    var g = new forms_1.FormGroup({ 'one': c });
                    expect(g.valid).toEqual(true);
                    c.setErrors({ 'someError': true });
                    expect(g.valid).toEqual(false);
                });
                testing_internal_1.it('should not reset parent\'s errors', function () {
                    var c = new forms_1.FormControl('someValue');
                    var g = new forms_1.FormGroup({ 'one': c });
                    g.setErrors({ 'someGroupError': true });
                    c.setErrors({ 'someError': true });
                    expect(g.errors).toEqual({ 'someGroupError': true });
                });
                testing_internal_1.it('should reset errors when updating a value', function () {
                    var c = new forms_1.FormControl('oldValue');
                    var g = new forms_1.FormGroup({ 'one': c });
                    g.setErrors({ 'someGroupError': true });
                    c.setErrors({ 'someError': true });
                    c.updateValue('newValue');
                    expect(c.errors).toEqual(null);
                    expect(g.errors).toEqual(null);
                });
            });
        });
        testing_internal_1.describe('FormGroup', function () {
            testing_internal_1.describe('value', function () {
                testing_internal_1.it('should be the reduced value of the child controls', function () {
                    var g = new forms_1.FormGroup({ 'one': new forms_1.FormControl('111'), 'two': new forms_1.FormControl('222') });
                    expect(g.value).toEqual({ 'one': '111', 'two': '222' });
                });
                testing_internal_1.it('should be empty when there are no child controls', function () {
                    var g = new forms_1.FormGroup({});
                    expect(g.value).toEqual({});
                });
                testing_internal_1.it('should support nested groups', function () {
                    var g = new forms_1.FormGroup({
                        'one': new forms_1.FormControl('111'),
                        'nested': new forms_1.FormGroup({ 'two': new forms_1.FormControl('222') })
                    });
                    expect(g.value).toEqual({ 'one': '111', 'nested': { 'two': '222' } });
                    (g.controls['nested'].find('two')).updateValue('333');
                    expect(g.value).toEqual({ 'one': '111', 'nested': { 'two': '333' } });
                });
            });
            testing_internal_1.describe('adding and removing controls', function () {
                testing_internal_1.it('should update value and validity when control is added', function () {
                    var g = new forms_1.FormGroup({ 'one': new forms_1.FormControl('1') });
                    expect(g.value).toEqual({ 'one': '1' });
                    expect(g.valid).toBe(true);
                    g.addControl('two', new forms_1.FormControl('2', forms_1.Validators.minLength(10)));
                    expect(g.value).toEqual({ 'one': '1', 'two': '2' });
                    expect(g.valid).toBe(false);
                });
                testing_internal_1.it('should update value and validity when control is removed', function () {
                    var g = new forms_1.FormGroup({ 'one': new forms_1.FormControl('1'), 'two': new forms_1.FormControl('2', forms_1.Validators.minLength(10)) });
                    expect(g.value).toEqual({ 'one': '1', 'two': '2' });
                    expect(g.valid).toBe(false);
                    g.removeControl('two');
                    expect(g.value).toEqual({ 'one': '1' });
                    expect(g.valid).toBe(true);
                });
            });
            testing_internal_1.describe('errors', function () {
                testing_internal_1.it('should run the validator when the value changes', function () {
                    var simpleValidator = function (c /** TODO #9100 */) {
                        return c.controls['one'].value != 'correct' ? { 'broken': true } : null;
                    };
                    var c = new forms_1.FormControl(null);
                    var g = new forms_1.FormGroup({ 'one': c }, null, simpleValidator);
                    c.updateValue('correct');
                    expect(g.valid).toEqual(true);
                    expect(g.errors).toEqual(null);
                    c.updateValue('incorrect');
                    expect(g.valid).toEqual(false);
                    expect(g.errors).toEqual({ 'broken': true });
                });
            });
            testing_internal_1.describe('dirty', function () {
                var c, g;
                testing_internal_1.beforeEach(function () {
                    c = new forms_1.FormControl('value');
                    g = new forms_1.FormGroup({ 'one': c });
                });
                testing_internal_1.it('should be false after creating a control', function () { expect(g.dirty).toEqual(false); });
                testing_internal_1.it('should be true after changing the value of the control', function () {
                    c.markAsDirty();
                    expect(g.dirty).toEqual(true);
                });
            });
            testing_internal_1.describe('touched', function () {
                var c, g;
                testing_internal_1.beforeEach(function () {
                    c = new forms_1.FormControl('value');
                    g = new forms_1.FormGroup({ 'one': c });
                });
                testing_internal_1.it('should be false after creating a control', function () { expect(g.touched).toEqual(false); });
                testing_internal_1.it('should be true after control is marked as touched', function () {
                    c.markAsTouched();
                    expect(g.touched).toEqual(true);
                });
            });
            testing_internal_1.describe('updateValue', function () {
                var c, c2, g;
                testing_internal_1.beforeEach(function () {
                    c = new forms_1.FormControl('');
                    c2 = new forms_1.FormControl('');
                    g = new forms_1.FormGroup({ 'one': c, 'two': c2 });
                });
                testing_internal_1.it('should update its own value', function () {
                    g.updateValue({ 'one': 'one', 'two': 'two' });
                    expect(g.value).toEqual({ 'one': 'one', 'two': 'two' });
                });
                testing_internal_1.it('should update child values', function () {
                    g.updateValue({ 'one': 'one', 'two': 'two' });
                    expect(c.value).toEqual('one');
                    expect(c2.value).toEqual('two');
                });
                testing_internal_1.it('should update parent values', function () {
                    var form = new forms_1.FormGroup({ 'parent': g });
                    g.updateValue({ 'one': 'one', 'two': 'two' });
                    expect(form.value).toEqual({ 'parent': { 'one': 'one', 'two': 'two' } });
                });
                testing_internal_1.it('should ignore fields that are missing from supplied value', function () {
                    g.updateValue({ 'one': 'one' });
                    expect(g.value).toEqual({ 'one': 'one', 'two': '' });
                });
                testing_internal_1.it('should not ignore fields that are null', function () {
                    g.updateValue({ 'one': null });
                    expect(g.value).toEqual({ 'one': null, 'two': '' });
                });
                testing_internal_1.it('should throw if a value is provided for a missing control', function () {
                    expect(function () { return g.updateValue({
                        'three': 'three'
                    }); }).toThrowError(new RegExp("Cannot find form control with name: three"));
                });
                testing_internal_1.describe('updateValue() events', function () {
                    var form;
                    var logger;
                    testing_internal_1.beforeEach(function () {
                        form = new forms_1.FormGroup({ 'parent': g });
                        logger = [];
                    });
                    testing_internal_1.it('should emit one valueChange event per control', function () {
                        form.valueChanges.subscribe(function () { return logger.push('form'); });
                        g.valueChanges.subscribe(function () { return logger.push('group'); });
                        c.valueChanges.subscribe(function () { return logger.push('control1'); });
                        c2.valueChanges.subscribe(function () { return logger.push('control2'); });
                        g.updateValue({ 'one': 'one', 'two': 'two' });
                        expect(logger).toEqual(['control1', 'control2', 'group', 'form']);
                    });
                    testing_internal_1.it('should not emit valueChange events for skipped controls', function () {
                        form.valueChanges.subscribe(function () { return logger.push('form'); });
                        g.valueChanges.subscribe(function () { return logger.push('group'); });
                        c.valueChanges.subscribe(function () { return logger.push('control1'); });
                        c2.valueChanges.subscribe(function () { return logger.push('control2'); });
                        g.updateValue({ 'one': 'one' });
                        expect(logger).toEqual(['control1', 'group', 'form']);
                    });
                    testing_internal_1.it('should emit one statusChange event per control', function () {
                        form.statusChanges.subscribe(function () { return logger.push('form'); });
                        g.statusChanges.subscribe(function () { return logger.push('group'); });
                        c.statusChanges.subscribe(function () { return logger.push('control1'); });
                        c2.statusChanges.subscribe(function () { return logger.push('control2'); });
                        g.updateValue({ 'one': 'one', 'two': 'two' });
                        expect(logger).toEqual(['control1', 'control2', 'group', 'form']);
                    });
                });
            });
            testing_internal_1.describe('reset()', function () {
                var c, c2, g;
                testing_internal_1.beforeEach(function () {
                    c = new forms_1.FormControl('initial value');
                    c2 = new forms_1.FormControl('');
                    g = new forms_1.FormGroup({ 'one': c, 'two': c2 });
                });
                testing_internal_1.it('should set its own value if value passed', function () {
                    g.updateValue({ 'one': 'new value', 'two': 'new value' });
                    g.reset({ 'one': 'initial value', 'two': '' });
                    expect(g.value).toEqual({ 'one': 'initial value', 'two': '' });
                });
                testing_internal_1.it('should clear its own value if no value passed', function () {
                    g.updateValue({ 'one': 'new value', 'two': 'new value' });
                    g.reset();
                    expect(g.value).toEqual({ 'one': null, 'two': null });
                });
                testing_internal_1.it('should set the value of each of its child controls if value passed', function () {
                    g.updateValue({ 'one': 'new value', 'two': 'new value' });
                    g.reset({ 'one': 'initial value', 'two': '' });
                    expect(c.value).toBe('initial value');
                    expect(c2.value).toBe('');
                });
                testing_internal_1.it('should clear the value of each of its child controls if no value passed', function () {
                    g.updateValue({ 'one': 'new value', 'two': 'new value' });
                    g.reset();
                    expect(c.value).toBe(null);
                    expect(c2.value).toBe(null);
                });
                testing_internal_1.it('should set the value of its parent if value passed', function () {
                    var form = new forms_1.FormGroup({ 'g': g });
                    g.updateValue({ 'one': 'new value', 'two': 'new value' });
                    g.reset({ 'one': 'initial value', 'two': '' });
                    expect(form.value).toEqual({ 'g': { 'one': 'initial value', 'two': '' } });
                });
                testing_internal_1.it('should clear the value of its parent if no value passed', function () {
                    var form = new forms_1.FormGroup({ 'g': g });
                    g.updateValue({ 'one': 'new value', 'two': 'new value' });
                    g.reset();
                    expect(form.value).toEqual({ 'g': { 'one': null, 'two': null } });
                });
                testing_internal_1.it('should mark itself as pristine', function () {
                    g.markAsDirty();
                    expect(g.pristine).toBe(false);
                    g.reset();
                    expect(g.pristine).toBe(true);
                });
                testing_internal_1.it('should mark all child controls as pristine', function () {
                    c.markAsDirty();
                    c2.markAsDirty();
                    expect(c.pristine).toBe(false);
                    expect(c2.pristine).toBe(false);
                    g.reset();
                    expect(c.pristine).toBe(true);
                    expect(c2.pristine).toBe(true);
                });
                testing_internal_1.it('should mark the parent as pristine if all siblings pristine', function () {
                    var c3 = new forms_1.FormControl('');
                    var form = new forms_1.FormGroup({ 'g': g, 'c3': c3 });
                    g.markAsDirty();
                    expect(form.pristine).toBe(false);
                    g.reset();
                    expect(form.pristine).toBe(true);
                });
                testing_internal_1.it('should not mark the parent pristine if any dirty siblings', function () {
                    var c3 = new forms_1.FormControl('');
                    var form = new forms_1.FormGroup({ 'g': g, 'c3': c3 });
                    g.markAsDirty();
                    c3.markAsDirty();
                    expect(form.pristine).toBe(false);
                    g.reset();
                    expect(form.pristine).toBe(false);
                });
                testing_internal_1.it('should mark itself as untouched', function () {
                    g.markAsTouched();
                    expect(g.untouched).toBe(false);
                    g.reset();
                    expect(g.untouched).toBe(true);
                });
                testing_internal_1.it('should mark all child controls as untouched', function () {
                    c.markAsTouched();
                    c2.markAsTouched();
                    expect(c.untouched).toBe(false);
                    expect(c2.untouched).toBe(false);
                    g.reset();
                    expect(c.untouched).toBe(true);
                    expect(c2.untouched).toBe(true);
                });
                testing_internal_1.it('should mark the parent untouched if all siblings untouched', function () {
                    var c3 = new forms_1.FormControl('');
                    var form = new forms_1.FormGroup({ 'g': g, 'c3': c3 });
                    g.markAsTouched();
                    expect(form.untouched).toBe(false);
                    g.reset();
                    expect(form.untouched).toBe(true);
                });
                testing_internal_1.it('should not mark the parent untouched if any touched siblings', function () {
                    var c3 = new forms_1.FormControl('');
                    var form = new forms_1.FormGroup({ 'g': g, 'c3': c3 });
                    g.markAsTouched();
                    c3.markAsTouched();
                    expect(form.untouched).toBe(false);
                    g.reset();
                    expect(form.untouched).toBe(false);
                });
                testing_internal_1.describe('reset() events', function () {
                    var form, c3, logger;
                    testing_internal_1.beforeEach(function () {
                        c3 = new forms_1.FormControl('');
                        form = new forms_1.FormGroup({ 'g': g, 'c3': c3 });
                        logger = [];
                    });
                    testing_internal_1.it('should emit one valueChange event per reset control', function () {
                        form.valueChanges.subscribe(function () { return logger.push('form'); });
                        g.valueChanges.subscribe(function () { return logger.push('group'); });
                        c.valueChanges.subscribe(function () { return logger.push('control1'); });
                        c2.valueChanges.subscribe(function () { return logger.push('control2'); });
                        c3.valueChanges.subscribe(function () { return logger.push('control3'); });
                        g.reset();
                        expect(logger).toEqual(['control1', 'control2', 'group', 'form']);
                    });
                    testing_internal_1.it('should emit one statusChange event per reset control', function () {
                        form.statusChanges.subscribe(function () { return logger.push('form'); });
                        g.statusChanges.subscribe(function () { return logger.push('group'); });
                        c.statusChanges.subscribe(function () { return logger.push('control1'); });
                        c2.statusChanges.subscribe(function () { return logger.push('control2'); });
                        c3.statusChanges.subscribe(function () { return logger.push('control3'); });
                        g.reset();
                        expect(logger).toEqual(['control1', 'control2', 'group', 'form']);
                    });
                });
            });
            testing_internal_1.describe('optional components', function () {
                testing_internal_1.describe('contains', function () {
                    var group;
                    testing_internal_1.beforeEach(function () {
                        group = new forms_1.FormGroup({
                            'required': new forms_1.FormControl('requiredValue'),
                            'optional': new forms_1.FormControl('optionalValue')
                        }, { 'optional': false });
                    });
                    // rename contains into has
                    testing_internal_1.it('should return false when the component is not included', function () { expect(group.contains('optional')).toEqual(false); });
                    testing_internal_1.it('should return false when there is no component with the given name', function () { expect(group.contains('something else')).toEqual(false); });
                    testing_internal_1.it('should return true when the component is included', function () {
                        expect(group.contains('required')).toEqual(true);
                        group.include('optional');
                        expect(group.contains('optional')).toEqual(true);
                    });
                });
                testing_internal_1.it('should not include an inactive component into the group value', function () {
                    var group = new forms_1.FormGroup({
                        'required': new forms_1.FormControl('requiredValue'),
                        'optional': new forms_1.FormControl('optionalValue')
                    }, { 'optional': false });
                    expect(group.value).toEqual({ 'required': 'requiredValue' });
                    group.include('optional');
                    expect(group.value).toEqual({ 'required': 'requiredValue', 'optional': 'optionalValue' });
                });
                testing_internal_1.it('should not run Validators on an inactive component', function () {
                    var group = new forms_1.FormGroup({
                        'required': new forms_1.FormControl('requiredValue', forms_1.Validators.required),
                        'optional': new forms_1.FormControl('', forms_1.Validators.required)
                    }, { 'optional': false });
                    expect(group.valid).toEqual(true);
                    group.include('optional');
                    expect(group.valid).toEqual(false);
                });
            });
            testing_internal_1.describe('valueChanges', function () {
                var g, c1, c2;
                testing_internal_1.beforeEach(function () {
                    c1 = new forms_1.FormControl('old1');
                    c2 = new forms_1.FormControl('old2');
                    g = new forms_1.FormGroup({ 'one': c1, 'two': c2 }, { 'two': true });
                });
                testing_internal_1.it('should fire an event after the value has been updated', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                        expect(g.value).toEqual({ 'one': 'new1', 'two': 'old2' });
                        expect(value).toEqual({ 'one': 'new1', 'two': 'old2' });
                        async.done();
                    });
                    c1.updateValue('new1');
                }));
                testing_internal_1.it('should fire an event after the control\'s observable fired an event', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    var controlCallbackIsCalled = false;
                    async_1.ObservableWrapper.subscribe(c1.valueChanges, function (value) { controlCallbackIsCalled = true; });
                    async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                        expect(controlCallbackIsCalled).toBe(true);
                        async.done();
                    });
                    c1.updateValue('new1');
                }));
                testing_internal_1.it('should fire an event when a control is excluded', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                        expect(value).toEqual({ 'one': 'old1' });
                        async.done();
                    });
                    g.exclude('two');
                }));
                testing_internal_1.it('should fire an event when a control is included', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    g.exclude('two');
                    async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                        expect(value).toEqual({ 'one': 'old1', 'two': 'old2' });
                        async.done();
                    });
                    g.include('two');
                }));
                testing_internal_1.it('should fire an event every time a control is updated', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    var loggedValues = [];
                    async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                        loggedValues.push(value);
                        if (loggedValues.length == 2) {
                            expect(loggedValues).toEqual([
                                { 'one': 'new1', 'two': 'old2' }, { 'one': 'new1', 'two': 'new2' }
                            ]);
                            async.done();
                        }
                    });
                    c1.updateValue('new1');
                    c2.updateValue('new2');
                }));
                // hard to test without hacking zones
                // xit('should not fire an event when an excluded control is updated', () => null);
            });
            testing_internal_1.describe('statusChanges', function () {
                var control = new forms_1.FormControl('', asyncValidatorReturningObservable);
                var group = new forms_1.FormGroup({ 'one': control });
                // TODO(kara): update these tests to use fake Async
                testing_internal_1.it('should fire a statusChange if child has async validation change', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    var loggedValues = [];
                    async_1.ObservableWrapper.subscribe(group.statusChanges, function (status) {
                        loggedValues.push(status);
                        if (loggedValues.length === 2) {
                            expect(loggedValues).toEqual(['PENDING', 'INVALID']);
                        }
                        async.done();
                    });
                    control.updateValue('');
                }));
            });
            testing_internal_1.describe('getError', function () {
                testing_internal_1.it('should return the error when it is present', function () {
                    var c = new forms_1.FormControl('', forms_1.Validators.required);
                    var g = new forms_1.FormGroup({ 'one': c });
                    expect(c.getError('required')).toEqual(true);
                    expect(g.getError('required', ['one'])).toEqual(true);
                });
                testing_internal_1.it('should return null otherwise', function () {
                    var c = new forms_1.FormControl('not empty', forms_1.Validators.required);
                    var g = new forms_1.FormGroup({ 'one': c });
                    expect(c.getError('invalid')).toEqual(null);
                    expect(g.getError('required', ['one'])).toEqual(null);
                    expect(g.getError('required', ['invalid'])).toEqual(null);
                });
            });
            testing_internal_1.describe('asyncValidator', function () {
                testing_internal_1.it('should run the async validator', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('value');
                    var g = new forms_1.FormGroup({ 'one': c }, null, null, asyncValidator('expected'));
                    expect(g.pending).toEqual(true);
                    testing_1.tick(1);
                    expect(g.errors).toEqual({ 'async': true });
                    expect(g.pending).toEqual(false);
                }));
                testing_internal_1.it('should set the parent group\'s status to pending', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('value', null, asyncValidator('expected'));
                    var g = new forms_1.FormGroup({ 'one': c });
                    expect(g.pending).toEqual(true);
                    testing_1.tick(1);
                    expect(g.pending).toEqual(false);
                }));
                testing_internal_1.it('should run the parent group\'s async validator when children are pending', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('value', null, asyncValidator('expected'));
                    var g = new forms_1.FormGroup({ 'one': c }, null, null, asyncValidator('expected'));
                    testing_1.tick(1);
                    expect(g.errors).toEqual({ 'async': true });
                    expect(g.find(['one']).errors).toEqual({ 'async': true });
                }));
            });
        });
        testing_internal_1.describe('FormArray', function () {
            testing_internal_1.describe('adding/removing', function () {
                var a;
                var c1 /** TODO #9100 */, c2 /** TODO #9100 */, c3;
                testing_internal_1.beforeEach(function () {
                    a = new forms_1.FormArray([]);
                    c1 = new forms_1.FormControl(1);
                    c2 = new forms_1.FormControl(2);
                    c3 = new forms_1.FormControl(3);
                });
                testing_internal_1.it('should support pushing', function () {
                    a.push(c1);
                    expect(a.length).toEqual(1);
                    expect(a.controls).toEqual([c1]);
                });
                testing_internal_1.it('should support removing', function () {
                    a.push(c1);
                    a.push(c2);
                    a.push(c3);
                    a.removeAt(1);
                    expect(a.controls).toEqual([c1, c3]);
                });
                testing_internal_1.it('should support inserting', function () {
                    a.push(c1);
                    a.push(c3);
                    a.insert(1, c2);
                    expect(a.controls).toEqual([c1, c2, c3]);
                });
            });
            testing_internal_1.describe('value', function () {
                testing_internal_1.it('should be the reduced value of the child controls', function () {
                    var a = new forms_1.FormArray([new forms_1.FormControl(1), new forms_1.FormControl(2)]);
                    expect(a.value).toEqual([1, 2]);
                });
                testing_internal_1.it('should be an empty array when there are no child controls', function () {
                    var a = new forms_1.FormArray([]);
                    expect(a.value).toEqual([]);
                });
            });
            testing_internal_1.describe('updateValue', function () {
                var c, c2, a;
                testing_internal_1.beforeEach(function () {
                    c = new forms_1.FormControl('');
                    c2 = new forms_1.FormControl('');
                    a = new forms_1.FormArray([c, c2]);
                });
                testing_internal_1.it('should update its own value', function () {
                    a.updateValue(['one', 'two']);
                    expect(a.value).toEqual(['one', 'two']);
                });
                testing_internal_1.it('should update child values', function () {
                    a.updateValue(['one', 'two']);
                    expect(c.value).toEqual('one');
                    expect(c2.value).toEqual('two');
                });
                testing_internal_1.it('should update parent values', function () {
                    var form = new forms_1.FormGroup({ 'parent': a });
                    a.updateValue(['one', 'two']);
                    expect(form.value).toEqual({ 'parent': ['one', 'two'] });
                });
                testing_internal_1.it('should ignore fields that are missing from supplied value', function () {
                    a.updateValue([, 'two']);
                    expect(a.value).toEqual(['', 'two']);
                });
                testing_internal_1.it('should not ignore fields that are null', function () {
                    a.updateValue([null]);
                    expect(a.value).toEqual([null, '']);
                });
                testing_internal_1.it('should throw if a value is provided for a missing control', function () {
                    expect(function () { return a.updateValue([
                        ,
                        , 'three'
                    ]); }).toThrowError(new RegExp("Cannot find form control at index 2"));
                });
                testing_internal_1.describe('updateValue() events', function () {
                    var form;
                    var logger;
                    testing_internal_1.beforeEach(function () {
                        form = new forms_1.FormGroup({ 'parent': a });
                        logger = [];
                    });
                    testing_internal_1.it('should emit one valueChange event per control', function () {
                        form.valueChanges.subscribe(function () { return logger.push('form'); });
                        a.valueChanges.subscribe(function () { return logger.push('array'); });
                        c.valueChanges.subscribe(function () { return logger.push('control1'); });
                        c2.valueChanges.subscribe(function () { return logger.push('control2'); });
                        a.updateValue(['one', 'two']);
                        expect(logger).toEqual(['control1', 'control2', 'array', 'form']);
                    });
                    testing_internal_1.it('should not emit valueChange events for skipped controls', function () {
                        form.valueChanges.subscribe(function () { return logger.push('form'); });
                        a.valueChanges.subscribe(function () { return logger.push('array'); });
                        c.valueChanges.subscribe(function () { return logger.push('control1'); });
                        c2.valueChanges.subscribe(function () { return logger.push('control2'); });
                        a.updateValue(['one']);
                        expect(logger).toEqual(['control1', 'array', 'form']);
                    });
                    testing_internal_1.it('should emit one statusChange event per control', function () {
                        form.statusChanges.subscribe(function () { return logger.push('form'); });
                        a.statusChanges.subscribe(function () { return logger.push('array'); });
                        c.statusChanges.subscribe(function () { return logger.push('control1'); });
                        c2.statusChanges.subscribe(function () { return logger.push('control2'); });
                        a.updateValue(['one', 'two']);
                        expect(logger).toEqual(['control1', 'control2', 'array', 'form']);
                    });
                });
            });
            testing_internal_1.describe('reset()', function () {
                var c, c2, a;
                testing_internal_1.beforeEach(function () {
                    c = new forms_1.FormControl('initial value');
                    c2 = new forms_1.FormControl('');
                    a = new forms_1.FormArray([c, c2]);
                });
                testing_internal_1.it('should set its own value if value passed', function () {
                    a.updateValue(['new value', 'new value']);
                    a.reset(['initial value', '']);
                    expect(a.value).toEqual(['initial value', '']);
                });
                testing_internal_1.it('should clear its own value if no value passed', function () {
                    a.updateValue(['new value', 'new value']);
                    a.reset();
                    expect(a.value).toEqual([null, null]);
                });
                testing_internal_1.it('should set the value of each of its child controls if value passed', function () {
                    a.updateValue(['new value', 'new value']);
                    a.reset(['initial value', '']);
                    expect(c.value).toBe('initial value');
                    expect(c2.value).toBe('');
                });
                testing_internal_1.it('should clear the value of each of its child controls if no value', function () {
                    a.updateValue(['new value', 'new value']);
                    a.reset();
                    expect(c.value).toBe(null);
                    expect(c2.value).toBe(null);
                });
                testing_internal_1.it('should set the value of its parent if value passed', function () {
                    var form = new forms_1.FormGroup({ 'a': a });
                    a.updateValue(['new value', 'new value']);
                    a.reset(['initial value', '']);
                    expect(form.value).toEqual({ 'a': ['initial value', ''] });
                });
                testing_internal_1.it('should clear the value of its parent if no value passed', function () {
                    var form = new forms_1.FormGroup({ 'a': a });
                    a.updateValue(['new value', 'new value']);
                    a.reset();
                    expect(form.value).toEqual({ 'a': [null, null] });
                });
                testing_internal_1.it('should mark itself as pristine', function () {
                    a.markAsDirty();
                    expect(a.pristine).toBe(false);
                    a.reset();
                    expect(a.pristine).toBe(true);
                });
                testing_internal_1.it('should mark all child controls as pristine', function () {
                    c.markAsDirty();
                    c2.markAsDirty();
                    expect(c.pristine).toBe(false);
                    expect(c2.pristine).toBe(false);
                    a.reset();
                    expect(c.pristine).toBe(true);
                    expect(c2.pristine).toBe(true);
                });
                testing_internal_1.it('should mark the parent as pristine if all siblings pristine', function () {
                    var c3 = new forms_1.FormControl('');
                    var form = new forms_1.FormGroup({ 'a': a, 'c3': c3 });
                    a.markAsDirty();
                    expect(form.pristine).toBe(false);
                    a.reset();
                    expect(form.pristine).toBe(true);
                });
                testing_internal_1.it('should not mark the parent pristine if any dirty siblings', function () {
                    var c3 = new forms_1.FormControl('');
                    var form = new forms_1.FormGroup({ 'a': a, 'c3': c3 });
                    a.markAsDirty();
                    c3.markAsDirty();
                    expect(form.pristine).toBe(false);
                    a.reset();
                    expect(form.pristine).toBe(false);
                });
                testing_internal_1.it('should mark itself as untouched', function () {
                    a.markAsTouched();
                    expect(a.untouched).toBe(false);
                    a.reset();
                    expect(a.untouched).toBe(true);
                });
                testing_internal_1.it('should mark all child controls as untouched', function () {
                    c.markAsTouched();
                    c2.markAsTouched();
                    expect(c.untouched).toBe(false);
                    expect(c2.untouched).toBe(false);
                    a.reset();
                    expect(c.untouched).toBe(true);
                    expect(c2.untouched).toBe(true);
                });
                testing_internal_1.it('should mark the parent untouched if all siblings untouched', function () {
                    var c3 = new forms_1.FormControl('');
                    var form = new forms_1.FormGroup({ 'a': a, 'c3': c3 });
                    a.markAsTouched();
                    expect(form.untouched).toBe(false);
                    a.reset();
                    expect(form.untouched).toBe(true);
                });
                testing_internal_1.it('should not mark the parent untouched if any touched siblings', function () {
                    var c3 = new forms_1.FormControl('');
                    var form = new forms_1.FormGroup({ 'a': a, 'c3': c3 });
                    a.markAsTouched();
                    c3.markAsTouched();
                    expect(form.untouched).toBe(false);
                    a.reset();
                    expect(form.untouched).toBe(false);
                });
                testing_internal_1.describe('reset() events', function () {
                    var form, c3, logger;
                    testing_internal_1.beforeEach(function () {
                        c3 = new forms_1.FormControl('');
                        form = new forms_1.FormGroup({ 'a': a, 'c3': c3 });
                        logger = [];
                    });
                    testing_internal_1.it('should emit one valueChange event per reset control', function () {
                        form.valueChanges.subscribe(function () { return logger.push('form'); });
                        a.valueChanges.subscribe(function () { return logger.push('array'); });
                        c.valueChanges.subscribe(function () { return logger.push('control1'); });
                        c2.valueChanges.subscribe(function () { return logger.push('control2'); });
                        c3.valueChanges.subscribe(function () { return logger.push('control3'); });
                        a.reset();
                        expect(logger).toEqual(['control1', 'control2', 'array', 'form']);
                    });
                    testing_internal_1.it('should emit one statusChange event per reset control', function () {
                        form.statusChanges.subscribe(function () { return logger.push('form'); });
                        a.statusChanges.subscribe(function () { return logger.push('array'); });
                        c.statusChanges.subscribe(function () { return logger.push('control1'); });
                        c2.statusChanges.subscribe(function () { return logger.push('control2'); });
                        c3.statusChanges.subscribe(function () { return logger.push('control3'); });
                        a.reset();
                        expect(logger).toEqual(['control1', 'control2', 'array', 'form']);
                    });
                });
            });
            testing_internal_1.describe('errors', function () {
                testing_internal_1.it('should run the validator when the value changes', function () {
                    var simpleValidator = function (c /** TODO #9100 */) {
                        return c.controls[0].value != 'correct' ? { 'broken': true } : null;
                    };
                    var c = new forms_1.FormControl(null);
                    var g = new forms_1.FormArray([c], simpleValidator);
                    c.updateValue('correct');
                    expect(g.valid).toEqual(true);
                    expect(g.errors).toEqual(null);
                    c.updateValue('incorrect');
                    expect(g.valid).toEqual(false);
                    expect(g.errors).toEqual({ 'broken': true });
                });
            });
            testing_internal_1.describe('dirty', function () {
                var c;
                var a;
                testing_internal_1.beforeEach(function () {
                    c = new forms_1.FormControl('value');
                    a = new forms_1.FormArray([c]);
                });
                testing_internal_1.it('should be false after creating a control', function () { expect(a.dirty).toEqual(false); });
                testing_internal_1.it('should be true after changing the value of the control', function () {
                    c.markAsDirty();
                    expect(a.dirty).toEqual(true);
                });
            });
            testing_internal_1.describe('touched', function () {
                var c;
                var a;
                testing_internal_1.beforeEach(function () {
                    c = new forms_1.FormControl('value');
                    a = new forms_1.FormArray([c]);
                });
                testing_internal_1.it('should be false after creating a control', function () { expect(a.touched).toEqual(false); });
                testing_internal_1.it('should be true after child control is marked as touched', function () {
                    c.markAsTouched();
                    expect(a.touched).toEqual(true);
                });
            });
            testing_internal_1.describe('pending', function () {
                var c;
                var a;
                testing_internal_1.beforeEach(function () {
                    c = new forms_1.FormControl('value');
                    a = new forms_1.FormArray([c]);
                });
                testing_internal_1.it('should be false after creating a control', function () {
                    expect(c.pending).toEqual(false);
                    expect(a.pending).toEqual(false);
                });
                testing_internal_1.it('should be true after changing the value of the control', function () {
                    c.markAsPending();
                    expect(c.pending).toEqual(true);
                    expect(a.pending).toEqual(true);
                });
                testing_internal_1.it('should not update the parent when onlySelf = true', function () {
                    c.markAsPending({ onlySelf: true });
                    expect(c.pending).toEqual(true);
                    expect(a.pending).toEqual(false);
                });
            });
            testing_internal_1.describe('valueChanges', function () {
                var a;
                var c1 /** TODO #9100 */, c2;
                testing_internal_1.beforeEach(function () {
                    c1 = new forms_1.FormControl('old1');
                    c2 = new forms_1.FormControl('old2');
                    a = new forms_1.FormArray([c1, c2]);
                });
                testing_internal_1.it('should fire an event after the value has been updated', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(a.valueChanges, function (value) {
                        expect(a.value).toEqual(['new1', 'old2']);
                        expect(value).toEqual(['new1', 'old2']);
                        async.done();
                    });
                    c1.updateValue('new1');
                }));
                testing_internal_1.it('should fire an event after the control\'s observable fired an event', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    var controlCallbackIsCalled = false;
                    async_1.ObservableWrapper.subscribe(c1.valueChanges, function (value) { controlCallbackIsCalled = true; });
                    async_1.ObservableWrapper.subscribe(a.valueChanges, function (value) {
                        expect(controlCallbackIsCalled).toBe(true);
                        async.done();
                    });
                    c1.updateValue('new1');
                }));
                testing_internal_1.it('should fire an event when a control is removed', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(a.valueChanges, function (value) {
                        expect(value).toEqual(['old1']);
                        async.done();
                    });
                    a.removeAt(1);
                }));
                testing_internal_1.it('should fire an event when a control is added', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    a.removeAt(1);
                    async_1.ObservableWrapper.subscribe(a.valueChanges, function (value) {
                        expect(value).toEqual(['old1', 'old2']);
                        async.done();
                    });
                    a.push(c2);
                }));
            });
            testing_internal_1.describe('find', function () {
                testing_internal_1.it('should return null when path is null', function () {
                    var g = new forms_1.FormGroup({});
                    expect(g.find(null)).toEqual(null);
                });
                testing_internal_1.it('should return null when path is empty', function () {
                    var g = new forms_1.FormGroup({});
                    expect(g.find([])).toEqual(null);
                });
                testing_internal_1.it('should return null when path is invalid', function () {
                    var g = new forms_1.FormGroup({});
                    expect(g.find(['one', 'two'])).toEqual(null);
                });
                testing_internal_1.it('should return a child of a control group', function () {
                    var g = new forms_1.FormGroup({
                        'one': new forms_1.FormControl('111'),
                        'nested': new forms_1.FormGroup({ 'two': new forms_1.FormControl('222') })
                    });
                    expect(g.find(['nested', 'two']).value).toEqual('222');
                    expect(g.find(['one']).value).toEqual('111');
                    expect(g.find('nested/two').value).toEqual('222');
                    expect(g.find('one').value).toEqual('111');
                });
                testing_internal_1.it('should return an element of an array', function () {
                    var g = new forms_1.FormGroup({ 'array': new forms_1.FormArray([new forms_1.FormControl('111')]) });
                    expect(g.find(['array', 0]).value).toEqual('111');
                });
            });
            testing_internal_1.describe('asyncValidator', function () {
                testing_internal_1.it('should run the async validator', testing_1.fakeAsync(function () {
                    var c = new forms_1.FormControl('value');
                    var g = new forms_1.FormArray([c], null, asyncValidator('expected'));
                    expect(g.pending).toEqual(true);
                    testing_1.tick(1);
                    expect(g.errors).toEqual({ 'async': true });
                    expect(g.pending).toEqual(false);
                }));
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZm9ybXMvdGVzdC9tb2RlbF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx3QkFBK0MsdUJBQXVCLENBQUMsQ0FBQTtBQUN2RSxpQ0FBbUcsd0NBQXdDLENBQUMsQ0FBQTtBQUM1SSxzQkFBNEQsZ0JBQWdCLENBQUMsQ0FBQTtBQUU3RSxzQkFBNEQscUJBQXFCLENBQUMsQ0FBQTtBQUNsRixxQkFBd0Isb0JBQW9CLENBQUMsQ0FBQTtBQUM3Qyx3QkFBNkIsdUJBQXVCLENBQUMsQ0FBQTtBQUVyRDtJQUNFLHdCQUF3QixRQUFhLENBQUMsaUJBQWlCLEVBQUUsUUFBZ0M7UUFBaEMsd0JBQWdDLEdBQWhDLGFBQWdDO1FBQ3ZGLE1BQU0sQ0FBQyxVQUFDLENBQU0sQ0FBQyxpQkFBaUI7WUFDOUIsSUFBSSxTQUFTLEdBQUcsd0JBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsR0FBRyxnQkFBUyxDQUFFLFFBQWtDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxRCxRQUFrQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzVDLENBQUMsQ0FBQztZQUNOLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksUUFBUSxHQUFHLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxHQUFHLElBQUksQ0FBQztZQUV2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDWCxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixvQkFBWSxDQUFDLFVBQVUsQ0FBQyxjQUFRLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMs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