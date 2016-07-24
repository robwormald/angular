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
var forms_deprecated_1 = require('@angular/common/src/forms-deprecated');
var lang_1 = require('../../src/facade/lang');
var promise_1 = require('../../src/facade/promise');
var async_1 = require('../../src/facade/async');
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
    function asyncValidatorReturningObservable(c /** TODO #9100 */) {
        var e = new async_1.EventEmitter();
        promise_1.PromiseWrapper.scheduleMicrotask(function () { return async_1.ObservableWrapper.callEmit(e, { 'async': true }); });
        return e;
    }
    testing_internal_1.describe('Form Model', function () {
        testing_internal_1.describe('Control', function () {
            testing_internal_1.it('should default the value to null', function () {
                var c = new forms_deprecated_1.Control();
                testing_internal_1.expect(c.value).toBe(null);
            });
            testing_internal_1.describe('validator', function () {
                testing_internal_1.it('should run validator with the initial value', function () {
                    var c = new forms_deprecated_1.Control('value', forms_deprecated_1.Validators.required);
                    testing_internal_1.expect(c.valid).toEqual(true);
                });
                testing_internal_1.it('should rerun the validator when the value changes', function () {
                    var c = new forms_deprecated_1.Control('value', forms_deprecated_1.Validators.required);
                    c.updateValue(null);
                    testing_internal_1.expect(c.valid).toEqual(false);
                });
                testing_internal_1.it('should return errors', function () {
                    var c = new forms_deprecated_1.Control(null, forms_deprecated_1.Validators.required);
                    testing_internal_1.expect(c.errors).toEqual({ 'required': true });
                });
            });
            testing_internal_1.describe('asyncValidator', function () {
                testing_internal_1.it('should run validator with the initial value', testing_1.fakeAsync(function () {
                    var c = new forms_deprecated_1.Control('value', null, asyncValidator('expected'));
                    testing_1.tick();
                    testing_internal_1.expect(c.valid).toEqual(false);
                    testing_internal_1.expect(c.errors).toEqual({ 'async': true });
                }));
                testing_internal_1.it('should support validators returning observables', testing_1.fakeAsync(function () {
                    var c = new forms_deprecated_1.Control('value', null, asyncValidatorReturningObservable);
                    testing_1.tick();
                    testing_internal_1.expect(c.valid).toEqual(false);
                    testing_internal_1.expect(c.errors).toEqual({ 'async': true });
                }));
                testing_internal_1.it('should rerun the validator when the value changes', testing_1.fakeAsync(function () {
                    var c = new forms_deprecated_1.Control('value', null, asyncValidator('expected'));
                    c.updateValue('expected');
                    testing_1.tick();
                    testing_internal_1.expect(c.valid).toEqual(true);
                }));
                testing_internal_1.it('should run the async validator only when the sync validator passes', testing_1.fakeAsync(function () {
                    var c = new forms_deprecated_1.Control('', forms_deprecated_1.Validators.required, asyncValidator('expected'));
                    testing_1.tick();
                    testing_internal_1.expect(c.errors).toEqual({ 'required': true });
                    c.updateValue('some value');
                    testing_1.tick();
                    testing_internal_1.expect(c.errors).toEqual({ 'async': true });
                }));
                testing_internal_1.it('should mark the control as pending while running the async validation', testing_1.fakeAsync(function () {
                    var c = new forms_deprecated_1.Control('', null, asyncValidator('expected'));
                    testing_internal_1.expect(c.pending).toEqual(true);
                    testing_1.tick();
                    testing_internal_1.expect(c.pending).toEqual(false);
                }));
                testing_internal_1.it('should only use the latest async validation run', testing_1.fakeAsync(function () {
                    var c = new forms_deprecated_1.Control('', null, asyncValidator('expected', { 'long': 200, 'expected': 100 }));
                    c.updateValue('long');
                    c.updateValue('expected');
                    testing_1.tick(300);
                    testing_internal_1.expect(c.valid).toEqual(true);
                }));
            });
            testing_internal_1.describe('dirty', function () {
                testing_internal_1.it('should be false after creating a control', function () {
                    var c = new forms_deprecated_1.Control('value');
                    testing_internal_1.expect(c.dirty).toEqual(false);
                });
                testing_internal_1.it('should be true after changing the value of the control', function () {
                    var c = new forms_deprecated_1.Control('value');
                    c.markAsDirty();
                    testing_internal_1.expect(c.dirty).toEqual(true);
                });
            });
            testing_internal_1.describe('updateValue', function () {
                var g /** TODO #9100 */, c;
                testing_internal_1.beforeEach(function () {
                    c = new forms_deprecated_1.Control('oldValue');
                    g = new forms_deprecated_1.ControlGroup({ 'one': c });
                });
                testing_internal_1.it('should update the value of the control', function () {
                    c.updateValue('newValue');
                    testing_internal_1.expect(c.value).toEqual('newValue');
                });
                testing_internal_1.it('should invoke ngOnChanges if it is present', function () {
                    var ngOnChanges;
                    c.registerOnChange(function (v /** TODO #9100 */) { return ngOnChanges = ['invoked', v]; });
                    c.updateValue('newValue');
                    testing_internal_1.expect(ngOnChanges).toEqual(['invoked', 'newValue']);
                });
                testing_internal_1.it('should not invoke on change when explicitly specified', function () {
                    var onChange = null;
                    c.registerOnChange(function (v /** TODO #9100 */) { return onChange = ['invoked', v]; });
                    c.updateValue('newValue', { emitModelToViewChange: false });
                    testing_internal_1.expect(onChange).toBeNull();
                });
                testing_internal_1.it('should update the parent', function () {
                    c.updateValue('newValue');
                    testing_internal_1.expect(g.value).toEqual({ 'one': 'newValue' });
                });
                testing_internal_1.it('should not update the parent when explicitly specified', function () {
                    c.updateValue('newValue', { onlySelf: true });
                    testing_internal_1.expect(g.value).toEqual({ 'one': 'oldValue' });
                });
                testing_internal_1.it('should fire an event', testing_1.fakeAsync(function () {
                    async_1.ObservableWrapper.subscribe(c.valueChanges, function (value) { testing_internal_1.expect(value).toEqual('newValue'); });
                    c.updateValue('newValue');
                    testing_1.tick();
                }));
                testing_internal_1.it('should not fire an event when explicitly specified', testing_1.fakeAsync(function () {
                    async_1.ObservableWrapper.subscribe(c.valueChanges, function (value) { throw 'Should not happen'; });
                    c.updateValue('newValue', { emitEvent: false });
                    testing_1.tick();
                }));
            });
            testing_internal_1.describe('valueChanges & statusChanges', function () {
                var c;
                testing_internal_1.beforeEach(function () { c = new forms_deprecated_1.Control('old', forms_deprecated_1.Validators.required); });
                testing_internal_1.it('should fire an event after the value has been updated', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(c.valueChanges, function (value) {
                        testing_internal_1.expect(c.value).toEqual('new');
                        testing_internal_1.expect(value).toEqual('new');
                        async.done();
                    });
                    c.updateValue('new');
                }));
                testing_internal_1.it('should fire an event after the status has been updated to invalid', testing_1.fakeAsync(function () {
                    async_1.ObservableWrapper.subscribe(c.statusChanges, function (status) {
                        testing_internal_1.expect(c.status).toEqual('INVALID');
                        testing_internal_1.expect(status).toEqual('INVALID');
                    });
                    c.updateValue('');
                    testing_1.tick();
                }));
                testing_internal_1.it('should fire an event after the status has been updated to pending', testing_1.fakeAsync(function () {
                    var c = new forms_deprecated_1.Control('old', forms_deprecated_1.Validators.required, asyncValidator('expected'));
                    var log = [];
                    async_1.ObservableWrapper.subscribe(c.valueChanges, function (value) { return log.push("value: '" + value + "'"); });
                    async_1.ObservableWrapper.subscribe(c.statusChanges, function (status) { return log.push("status: '" + status + "'"); });
                    c.updateValue('');
                    testing_1.tick();
                    c.updateValue('nonEmpty');
                    testing_1.tick();
                    c.updateValue('expected');
                    testing_1.tick();
                    testing_internal_1.expect(log).toEqual([
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
                if (!lang_1.IS_DART) {
                    testing_internal_1.it('should update set errors and status before emitting an event', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                        c.valueChanges.subscribe(function (value /** TODO #9100 */) {
                            testing_internal_1.expect(c.valid).toEqual(false);
                            testing_internal_1.expect(c.errors).toEqual({ 'required': true });
                            async.done();
                        });
                        c.updateValue('');
                    }));
                }
                testing_internal_1.it('should return a cold observable', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    c.updateValue('will be ignored');
                    async_1.ObservableWrapper.subscribe(c.valueChanges, function (value) {
                        testing_internal_1.expect(value).toEqual('new');
                        async.done();
                    });
                    c.updateValue('new');
                }));
            });
            testing_internal_1.describe('setErrors', function () {
                testing_internal_1.it('should set errors on a control', function () {
                    var c = new forms_deprecated_1.Control('someValue');
                    c.setErrors({ 'someError': true });
                    testing_internal_1.expect(c.valid).toEqual(false);
                    testing_internal_1.expect(c.errors).toEqual({ 'someError': true });
                });
                testing_internal_1.it('should reset the errors and validity when the value changes', function () {
                    var c = new forms_deprecated_1.Control('someValue', forms_deprecated_1.Validators.required);
                    c.setErrors({ 'someError': true });
                    c.updateValue('');
                    testing_internal_1.expect(c.errors).toEqual({ 'required': true });
                });
                testing_internal_1.it('should update the parent group\'s validity', function () {
                    var c = new forms_deprecated_1.Control('someValue');
                    var g = new forms_deprecated_1.ControlGroup({ 'one': c });
                    testing_internal_1.expect(g.valid).toEqual(true);
                    c.setErrors({ 'someError': true });
                    testing_internal_1.expect(g.valid).toEqual(false);
                });
                testing_internal_1.it('should not reset parent\'s errors', function () {
                    var c = new forms_deprecated_1.Control('someValue');
                    var g = new forms_deprecated_1.ControlGroup({ 'one': c });
                    g.setErrors({ 'someGroupError': true });
                    c.setErrors({ 'someError': true });
                    testing_internal_1.expect(g.errors).toEqual({ 'someGroupError': true });
                });
                testing_internal_1.it('should reset errors when updating a value', function () {
                    var c = new forms_deprecated_1.Control('oldValue');
                    var g = new forms_deprecated_1.ControlGroup({ 'one': c });
                    g.setErrors({ 'someGroupError': true });
                    c.setErrors({ 'someError': true });
                    c.updateValue('newValue');
                    testing_internal_1.expect(c.errors).toEqual(null);
                    testing_internal_1.expect(g.errors).toEqual(null);
                });
            });
        });
        testing_internal_1.describe('ControlGroup', function () {
            testing_internal_1.describe('value', function () {
                testing_internal_1.it('should be the reduced value of the child controls', function () {
                    var g = new forms_deprecated_1.ControlGroup({ 'one': new forms_deprecated_1.Control('111'), 'two': new forms_deprecated_1.Control('222') });
                    testing_internal_1.expect(g.value).toEqual({ 'one': '111', 'two': '222' });
                });
                testing_internal_1.it('should be empty when there are no child controls', function () {
                    var g = new forms_deprecated_1.ControlGroup({});
                    testing_internal_1.expect(g.value).toEqual({});
                });
                testing_internal_1.it('should support nested groups', function () {
                    var g = new forms_deprecated_1.ControlGroup({ 'one': new forms_deprecated_1.Control('111'), 'nested': new forms_deprecated_1.ControlGroup({ 'two': new forms_deprecated_1.Control('222') }) });
                    testing_internal_1.expect(g.value).toEqual({ 'one': '111', 'nested': { 'two': '222' } });
                    (g.controls['nested'].find('two')).updateValue('333');
                    testing_internal_1.expect(g.value).toEqual({ 'one': '111', 'nested': { 'two': '333' } });
                });
            });
            testing_internal_1.describe('adding and removing controls', function () {
                testing_internal_1.it('should update value and validity when control is added', function () {
                    var g = new forms_deprecated_1.ControlGroup({ 'one': new forms_deprecated_1.Control('1') });
                    testing_internal_1.expect(g.value).toEqual({ 'one': '1' });
                    testing_internal_1.expect(g.valid).toBe(true);
                    g.addControl('two', new forms_deprecated_1.Control('2', forms_deprecated_1.Validators.minLength(10)));
                    testing_internal_1.expect(g.value).toEqual({ 'one': '1', 'two': '2' });
                    testing_internal_1.expect(g.valid).toBe(false);
                });
                testing_internal_1.it('should update value and validity when control is removed', function () {
                    var g = new forms_deprecated_1.ControlGroup({ 'one': new forms_deprecated_1.Control('1'), 'two': new forms_deprecated_1.Control('2', forms_deprecated_1.Validators.minLength(10)) });
                    testing_internal_1.expect(g.value).toEqual({ 'one': '1', 'two': '2' });
                    testing_internal_1.expect(g.valid).toBe(false);
                    g.removeControl('two');
                    testing_internal_1.expect(g.value).toEqual({ 'one': '1' });
                    testing_internal_1.expect(g.valid).toBe(true);
                });
            });
            testing_internal_1.describe('errors', function () {
                testing_internal_1.it('should run the validator when the value changes', function () {
                    var simpleValidator = function (c /** TODO #9100 */) {
                        return c.controls['one'].value != 'correct' ? { 'broken': true } : null;
                    };
                    var c = new forms_deprecated_1.Control(null);
                    var g = new forms_deprecated_1.ControlGroup({ 'one': c }, null, simpleValidator);
                    c.updateValue('correct');
                    testing_internal_1.expect(g.valid).toEqual(true);
                    testing_internal_1.expect(g.errors).toEqual(null);
                    c.updateValue('incorrect');
                    testing_internal_1.expect(g.valid).toEqual(false);
                    testing_internal_1.expect(g.errors).toEqual({ 'broken': true });
                });
            });
            testing_internal_1.describe('dirty', function () {
                var c /** TODO #9100 */, g;
                testing_internal_1.beforeEach(function () {
                    c = new forms_deprecated_1.Control('value');
                    g = new forms_deprecated_1.ControlGroup({ 'one': c });
                });
                testing_internal_1.it('should be false after creating a control', function () { testing_internal_1.expect(g.dirty).toEqual(false); });
                testing_internal_1.it('should be false after changing the value of the control', function () {
                    c.markAsDirty();
                    testing_internal_1.expect(g.dirty).toEqual(true);
                });
            });
            testing_internal_1.describe('optional components', function () {
                testing_internal_1.describe('contains', function () {
                    var group;
                    testing_internal_1.beforeEach(function () {
                        group = new forms_deprecated_1.ControlGroup({
                            'required': new forms_deprecated_1.Control('requiredValue'),
                            'optional': new forms_deprecated_1.Control('optionalValue')
                        }, { 'optional': false });
                    });
                    // rename contains into has
                    testing_internal_1.it('should return false when the component is not included', function () { testing_internal_1.expect(group.contains('optional')).toEqual(false); });
                    testing_internal_1.it('should return false when there is no component with the given name', function () { testing_internal_1.expect(group.contains('something else')).toEqual(false); });
                    testing_internal_1.it('should return true when the component is included', function () {
                        testing_internal_1.expect(group.contains('required')).toEqual(true);
                        group.include('optional');
                        testing_internal_1.expect(group.contains('optional')).toEqual(true);
                    });
                });
                testing_internal_1.it('should not include an inactive component into the group value', function () {
                    var group = new forms_deprecated_1.ControlGroup({ 'required': new forms_deprecated_1.Control('requiredValue'), 'optional': new forms_deprecated_1.Control('optionalValue') }, { 'optional': false });
                    testing_internal_1.expect(group.value).toEqual({ 'required': 'requiredValue' });
                    group.include('optional');
                    testing_internal_1.expect(group.value).toEqual({ 'required': 'requiredValue', 'optional': 'optionalValue' });
                });
                testing_internal_1.it('should not run Validators on an inactive component', function () {
                    var group = new forms_deprecated_1.ControlGroup({
                        'required': new forms_deprecated_1.Control('requiredValue', forms_deprecated_1.Validators.required),
                        'optional': new forms_deprecated_1.Control('', forms_deprecated_1.Validators.required)
                    }, { 'optional': false });
                    testing_internal_1.expect(group.valid).toEqual(true);
                    group.include('optional');
                    testing_internal_1.expect(group.valid).toEqual(false);
                });
            });
            testing_internal_1.describe('valueChanges', function () {
                var g /** TODO #9100 */, c1 /** TODO #9100 */, c2;
                testing_internal_1.beforeEach(function () {
                    c1 = new forms_deprecated_1.Control('old1');
                    c2 = new forms_deprecated_1.Control('old2');
                    g = new forms_deprecated_1.ControlGroup({ 'one': c1, 'two': c2 }, { 'two': true });
                });
                testing_internal_1.it('should fire an event after the value has been updated', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                        testing_internal_1.expect(g.value).toEqual({ 'one': 'new1', 'two': 'old2' });
                        testing_internal_1.expect(value).toEqual({ 'one': 'new1', 'two': 'old2' });
                        async.done();
                    });
                    c1.updateValue('new1');
                }));
                testing_internal_1.it('should fire an event after the control\'s observable fired an event', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    var controlCallbackIsCalled = false;
                    async_1.ObservableWrapper.subscribe(c1.valueChanges, function (value) { controlCallbackIsCalled = true; });
                    async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                        testing_internal_1.expect(controlCallbackIsCalled).toBe(true);
                        async.done();
                    });
                    c1.updateValue('new1');
                }));
                testing_internal_1.it('should fire an event when a control is excluded', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                        testing_internal_1.expect(value).toEqual({ 'one': 'old1' });
                        async.done();
                    });
                    g.exclude('two');
                }));
                testing_internal_1.it('should fire an event when a control is included', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    g.exclude('two');
                    async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                        testing_internal_1.expect(value).toEqual({ 'one': 'old1', 'two': 'old2' });
                        async.done();
                    });
                    g.include('two');
                }));
                testing_internal_1.it('should fire an event every time a control is updated', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    var loggedValues = [];
                    async_1.ObservableWrapper.subscribe(g.valueChanges, function (value) {
                        loggedValues.push(value);
                        if (loggedValues.length == 2) {
                            testing_internal_1.expect(loggedValues).toEqual([
                                { 'one': 'new1', 'two': 'old2' }, { 'one': 'new1', 'two': 'new2' }
                            ]);
                            async.done();
                        }
                    });
                    c1.updateValue('new1');
                    c2.updateValue('new2');
                }));
                testing_internal_1.xit('should not fire an event when an excluded control is updated', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    // hard to test without hacking zones
                }));
            });
            testing_internal_1.describe('getError', function () {
                testing_internal_1.it('should return the error when it is present', function () {
                    var c = new forms_deprecated_1.Control('', forms_deprecated_1.Validators.required);
                    var g = new forms_deprecated_1.ControlGroup({ 'one': c });
                    testing_internal_1.expect(c.getError('required')).toEqual(true);
                    testing_internal_1.expect(g.getError('required', ['one'])).toEqual(true);
                });
                testing_internal_1.it('should return null otherwise', function () {
                    var c = new forms_deprecated_1.Control('not empty', forms_deprecated_1.Validators.required);
                    var g = new forms_deprecated_1.ControlGroup({ 'one': c });
                    testing_internal_1.expect(c.getError('invalid')).toEqual(null);
                    testing_internal_1.expect(g.getError('required', ['one'])).toEqual(null);
                    testing_internal_1.expect(g.getError('required', ['invalid'])).toEqual(null);
                });
            });
            testing_internal_1.describe('asyncValidator', function () {
                testing_internal_1.it('should run the async validator', testing_1.fakeAsync(function () {
                    var c = new forms_deprecated_1.Control('value');
                    var g = new forms_deprecated_1.ControlGroup({ 'one': c }, null, null, asyncValidator('expected'));
                    testing_internal_1.expect(g.pending).toEqual(true);
                    testing_1.tick(1);
                    testing_internal_1.expect(g.errors).toEqual({ 'async': true });
                    testing_internal_1.expect(g.pending).toEqual(false);
                }));
                testing_internal_1.it('should set the parent group\'s status to pending', testing_1.fakeAsync(function () {
                    var c = new forms_deprecated_1.Control('value', null, asyncValidator('expected'));
                    var g = new forms_deprecated_1.ControlGroup({ 'one': c });
                    testing_internal_1.expect(g.pending).toEqual(true);
                    testing_1.tick(1);
                    testing_internal_1.expect(g.pending).toEqual(false);
                }));
                testing_internal_1.it('should run the parent group\'s async validator when children are pending', testing_1.fakeAsync(function () {
                    var c = new forms_deprecated_1.Control('value', null, asyncValidator('expected'));
                    var g = new forms_deprecated_1.ControlGroup({ 'one': c }, null, null, asyncValidator('expected'));
                    testing_1.tick(1);
                    testing_internal_1.expect(g.errors).toEqual({ 'async': true });
                    testing_internal_1.expect(g.find(['one']).errors).toEqual({ 'async': true });
                }));
            });
        });
        testing_internal_1.describe('ControlArray', function () {
            testing_internal_1.describe('adding/removing', function () {
                var a;
                var c1 /** TODO #9100 */, c2 /** TODO #9100 */, c3;
                testing_internal_1.beforeEach(function () {
                    a = new forms_deprecated_1.ControlArray([]);
                    c1 = new forms_deprecated_1.Control(1);
                    c2 = new forms_deprecated_1.Control(2);
                    c3 = new forms_deprecated_1.Control(3);
                });
                testing_internal_1.it('should support pushing', function () {
                    a.push(c1);
                    testing_internal_1.expect(a.length).toEqual(1);
                    testing_internal_1.expect(a.controls).toEqual([c1]);
                });
                testing_internal_1.it('should support removing', function () {
                    a.push(c1);
                    a.push(c2);
                    a.push(c3);
                    a.removeAt(1);
                    testing_internal_1.expect(a.controls).toEqual([c1, c3]);
                });
                testing_internal_1.it('should support inserting', function () {
                    a.push(c1);
                    a.push(c3);
                    a.insert(1, c2);
                    testing_internal_1.expect(a.controls).toEqual([c1, c2, c3]);
                });
            });
            testing_internal_1.describe('value', function () {
                testing_internal_1.it('should be the reduced value of the child controls', function () {
                    var a = new forms_deprecated_1.ControlArray([new forms_deprecated_1.Control(1), new forms_deprecated_1.Control(2)]);
                    testing_internal_1.expect(a.value).toEqual([1, 2]);
                });
                testing_internal_1.it('should be an empty array when there are no child controls', function () {
                    var a = new forms_deprecated_1.ControlArray([]);
                    testing_internal_1.expect(a.value).toEqual([]);
                });
            });
            testing_internal_1.describe('errors', function () {
                testing_internal_1.it('should run the validator when the value changes', function () {
                    var simpleValidator = function (c /** TODO #9100 */) {
                        return c.controls[0].value != 'correct' ? { 'broken': true } : null;
                    };
                    var c = new forms_deprecated_1.Control(null);
                    var g = new forms_deprecated_1.ControlArray([c], simpleValidator);
                    c.updateValue('correct');
                    testing_internal_1.expect(g.valid).toEqual(true);
                    testing_internal_1.expect(g.errors).toEqual(null);
                    c.updateValue('incorrect');
                    testing_internal_1.expect(g.valid).toEqual(false);
                    testing_internal_1.expect(g.errors).toEqual({ 'broken': true });
                });
            });
            testing_internal_1.describe('dirty', function () {
                var c;
                var a;
                testing_internal_1.beforeEach(function () {
                    c = new forms_deprecated_1.Control('value');
                    a = new forms_deprecated_1.ControlArray([c]);
                });
                testing_internal_1.it('should be false after creating a control', function () { testing_internal_1.expect(a.dirty).toEqual(false); });
                testing_internal_1.it('should be false after changing the value of the control', function () {
                    c.markAsDirty();
                    testing_internal_1.expect(a.dirty).toEqual(true);
                });
            });
            testing_internal_1.describe('pending', function () {
                var c;
                var a;
                testing_internal_1.beforeEach(function () {
                    c = new forms_deprecated_1.Control('value');
                    a = new forms_deprecated_1.ControlArray([c]);
                });
                testing_internal_1.it('should be false after creating a control', function () {
                    testing_internal_1.expect(c.pending).toEqual(false);
                    testing_internal_1.expect(a.pending).toEqual(false);
                });
                testing_internal_1.it('should be true after changing the value of the control', function () {
                    c.markAsPending();
                    testing_internal_1.expect(c.pending).toEqual(true);
                    testing_internal_1.expect(a.pending).toEqual(true);
                });
                testing_internal_1.it('should not update the parent when onlySelf = true', function () {
                    c.markAsPending({ onlySelf: true });
                    testing_internal_1.expect(c.pending).toEqual(true);
                    testing_internal_1.expect(a.pending).toEqual(false);
                });
            });
            testing_internal_1.describe('valueChanges', function () {
                var a;
                var c1 /** TODO #9100 */, c2;
                testing_internal_1.beforeEach(function () {
                    c1 = new forms_deprecated_1.Control('old1');
                    c2 = new forms_deprecated_1.Control('old2');
                    a = new forms_deprecated_1.ControlArray([c1, c2]);
                });
                testing_internal_1.it('should fire an event after the value has been updated', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(a.valueChanges, function (value) {
                        testing_internal_1.expect(a.value).toEqual(['new1', 'old2']);
                        testing_internal_1.expect(value).toEqual(['new1', 'old2']);
                        async.done();
                    });
                    c1.updateValue('new1');
                }));
                testing_internal_1.it('should fire an event after the control\'s observable fired an event', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    var controlCallbackIsCalled = false;
                    async_1.ObservableWrapper.subscribe(c1.valueChanges, function (value) { controlCallbackIsCalled = true; });
                    async_1.ObservableWrapper.subscribe(a.valueChanges, function (value) {
                        testing_internal_1.expect(controlCallbackIsCalled).toBe(true);
                        async.done();
                    });
                    c1.updateValue('new1');
                }));
                testing_internal_1.it('should fire an event when a control is removed', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    async_1.ObservableWrapper.subscribe(a.valueChanges, function (value) {
                        testing_internal_1.expect(value).toEqual(['old1']);
                        async.done();
                    });
                    a.removeAt(1);
                }));
                testing_internal_1.it('should fire an event when a control is added', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    a.removeAt(1);
                    async_1.ObservableWrapper.subscribe(a.valueChanges, function (value) {
                        testing_internal_1.expect(value).toEqual(['old1', 'old2']);
                        async.done();
                    });
                    a.push(c2);
                }));
            });
            testing_internal_1.describe('find', function () {
                testing_internal_1.it('should return null when path is null', function () {
                    var g = new forms_deprecated_1.ControlGroup({});
                    testing_internal_1.expect(g.find(null)).toEqual(null);
                });
                testing_internal_1.it('should return null when path is empty', function () {
                    var g = new forms_deprecated_1.ControlGroup({});
                    testing_internal_1.expect(g.find([])).toEqual(null);
                });
                testing_internal_1.it('should return null when path is invalid', function () {
                    var g = new forms_deprecated_1.ControlGroup({});
                    testing_internal_1.expect(g.find(['one', 'two'])).toEqual(null);
                });
                testing_internal_1.it('should return a child of a control group', function () {
                    var g = new forms_deprecated_1.ControlGroup({ 'one': new forms_deprecated_1.Control('111'), 'nested': new forms_deprecated_1.ControlGroup({ 'two': new forms_deprecated_1.Control('222') }) });
                    testing_internal_1.expect(g.find(['nested', 'two']).value).toEqual('222');
                    testing_internal_1.expect(g.find(['one']).value).toEqual('111');
                    testing_internal_1.expect(g.find('nested/two').value).toEqual('222');
                    testing_internal_1.expect(g.find('one').value).toEqual('111');
                });
                testing_internal_1.it('should return an element of an array', function () {
                    var g = new forms_deprecated_1.ControlGroup({ 'array': new forms_deprecated_1.ControlArray([new forms_deprecated_1.Control('111')]) });
                    testing_internal_1.expect(g.find(['array', 0]).value).toEqual('111');
                });
            });
            testing_internal_1.describe('asyncValidator', function () {
                testing_internal_1.it('should run the async validator', testing_1.fakeAsync(function () {
                    var c = new forms_deprecated_1.Control('value');
                    var g = new forms_deprecated_1.ControlArray([c], null, asyncValidator('expected'));
                    testing_internal_1.expect(g.pending).toEqual(true);
                    testing_1.tick(1);
                    testing_internal_1.expect(g.errors).toEqual({ 'async': true });
                    testing_internal_1.expect(g.pending).toEqual(false);
                }));
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3Rlc3QvZm9ybXMtZGVwcmVjYXRlZC9tb2RlbF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBNEcsd0NBQXdDLENBQUMsQ0FBQTtBQUNySix3QkFBK0MsdUJBQXVCLENBQUMsQ0FBQTtBQUN2RSxpQ0FBOEQsc0NBQXNDLENBQUMsQ0FBQTtBQUNyRyxxQkFBaUMsdUJBQXVCLENBQUMsQ0FBQTtBQUN6RCx3QkFBNkIsMEJBQTBCLENBQUMsQ0FBQTtBQUN4RCxzQkFBNEQsd0JBQXdCLENBQUMsQ0FBQTtBQUVyRjtJQUNFLHdCQUF3QixRQUFhLENBQUMsaUJBQWlCLEVBQUUsUUFBZ0M7UUFBaEMsd0JBQWdDLEdBQWhDLGFBQWdDO1FBQ3ZGLE1BQU0sQ0FBQyxVQUFDLENBQU0sQ0FBQyxpQkFBaUI7WUFDOUIsSUFBSSxTQUFTLEdBQUcsd0JBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsR0FBRyxnQkFBUyxDQUFFLFFBQWtDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxRCxRQUFrQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQzVDLENBQUMsQ0FBQztZQUNOLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxLQUFLLElBQUksUUFBUSxHQUFHLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxHQUFHLElBQUksQ0FBQztZQUV2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDWCxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixvQkFBWSxDQUFDLFVBQVUsQ0FBQyxjQUFRLFNBQVMsQ0FBQyxPQUFP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