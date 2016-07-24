/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var forms_1 = require('@angular/forms');
var by_1 = require('@angular/platform-browser/src/dom/debug/by');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var async_1 = require('../src/facade/async');
var collection_1 = require('../src/facade/collection');
var promise_1 = require('../src/facade/promise');
function main() {
    testing_internal_1.describe('integration tests', function () {
        testing_internal_1.beforeEach(function () { testing_1.configureModule({ imports: [forms_1.FormsModule, forms_1.ReactiveFormsModule] }); });
        testing_internal_1.it('should initialize DOM elements with the given form object', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var t = "<div [formGroup]=\"form\">\n                <input type=\"text\" formControlName=\"login\">\n               </div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                fixture.debugElement.componentInstance.form =
                    new forms_1.FormGroup({ 'login': new forms_1.FormControl('loginValue') });
                fixture.detectChanges();
                var input = fixture.debugElement.query(by_1.By.css('input'));
                testing_internal_1.expect(input.nativeElement.value).toEqual('loginValue');
                async.done();
            });
        }));
        testing_internal_1.it('should throw if a form isn\'t passed into formGroup', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var t = "<div [formGroup]=\"form\">\n                <input type=\"text\" formControlName=\"login\">\n               </div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                testing_internal_1.expect(function () { return fixture.detectChanges(); })
                    .toThrowError(new RegExp("formGroup expects a FormGroup instance"));
                async.done();
            });
        }));
        testing_internal_1.it('should update the form group values on DOM change', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var form = new forms_1.FormGroup({ 'login': new forms_1.FormControl('oldValue') });
            var t = "<div [formGroup]=\"form\">\n                <input type=\"text\" formControlName=\"login\">\n              </div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                fixture.debugElement.componentInstance.form = form;
                fixture.detectChanges();
                var input = fixture.debugElement.query(by_1.By.css('input'));
                input.nativeElement.value = 'updatedValue';
                browser_util_1.dispatchEvent(input.nativeElement, 'input');
                testing_internal_1.expect(form.value).toEqual({ 'login': 'updatedValue' });
                async.done();
            });
        }));
        testing_internal_1.it('should ignore the change event for <input type=text>', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var form = new forms_1.FormGroup({ 'login': new forms_1.FormControl('oldValue') });
            var t = "<div [formGroup]=\"form\">\n                <input type=\"text\" formControlName=\"login\">\n              </div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                fixture.debugElement.componentInstance.form = form;
                fixture.detectChanges();
                var input = fixture.debugElement.query(by_1.By.css('input'));
                input.nativeElement.value = 'updatedValue';
                async_1.ObservableWrapper.subscribe(form.valueChanges, function (value) { throw 'Should not happen'; });
                browser_util_1.dispatchEvent(input.nativeElement, 'change');
                async.done();
            });
        }));
        testing_internal_1.it('should emit ngSubmit event on submit', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            var t = "<div>\n                      <form [formGroup]=\"form\" (ngSubmit)=\"name='updated'\"></form>\n                      <span>{{name}}</span>\n                    </div>";
            var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
            testing_1.tick();
            fixture.debugElement.componentInstance.form = new forms_1.FormGroup({});
            fixture.debugElement.componentInstance.name = 'old';
            testing_1.tick();
            var form = fixture.debugElement.query(by_1.By.css('form'));
            browser_util_1.dispatchEvent(form.nativeElement, 'submit');
            testing_1.tick();
            testing_internal_1.expect(fixture.debugElement.componentInstance.name).toEqual('updated');
        })));
        testing_internal_1.it('should mark NgForm as submitted on submit event', testing_internal_1.inject([testing_1.TestComponentBuilder], testing_1.fakeAsync(function (tcb) {
            var t = "<div>\n                      <form #f=\"ngForm\" (ngSubmit)=\"data=f.submitted\"></form>\n                      <span>{{data}}</span>\n                    </div>";
            var fixture;
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (root) {
                fixture = root;
            });
            testing_1.tick();
            fixture.debugElement.componentInstance.data = false;
            testing_1.tick();
            var form = fixture.debugElement.query(by_1.By.css('form'));
            browser_util_1.dispatchEvent(form.nativeElement, 'submit');
            testing_1.tick();
            testing_internal_1.expect(fixture.debugElement.componentInstance.data).toEqual(true);
        })));
        testing_internal_1.it('should mark formGroup as submitted on submit event', testing_internal_1.inject([testing_1.TestComponentBuilder], testing_1.fakeAsync(function (tcb) {
            var t = "<div>\n                      <form #f=\"ngForm\" [formGroup]=\"form\" (ngSubmit)=\"data=f.submitted\"></form>\n                      <span>{{data}}</span>\n                    </div>";
            var fixture;
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (root) {
                fixture = root;
            });
            testing_1.tick();
            fixture.debugElement.componentInstance.form = new forms_1.FormGroup({});
            fixture.debugElement.componentInstance.data = false;
            testing_1.tick();
            var form = fixture.debugElement.query(by_1.By.css('form'));
            browser_util_1.dispatchEvent(form.nativeElement, 'submit');
            testing_1.tick();
            testing_internal_1.expect(fixture.debugElement.componentInstance.data).toEqual(true);
        })));
        testing_internal_1.it('should work with single controls', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var control = new forms_1.FormControl('loginValue');
            var t = "<div><input type=\"text\" [formControl]=\"form\"></div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                fixture.debugElement.componentInstance.form = control;
                fixture.detectChanges();
                var input = fixture.debugElement.query(by_1.By.css('input'));
                testing_internal_1.expect(input.nativeElement.value).toEqual('loginValue');
                input.nativeElement.value = 'updatedValue';
                browser_util_1.dispatchEvent(input.nativeElement, 'input');
                testing_internal_1.expect(control.value).toEqual('updatedValue');
                async.done();
            });
        }));
        testing_internal_1.it('should update DOM elements when rebinding the form group', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var t = "<div [formGroup]=\"form\">\n                <input type=\"text\" formControlName=\"login\">\n               </div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                fixture.debugElement.componentInstance.form =
                    new forms_1.FormGroup({ 'login': new forms_1.FormControl('oldValue') });
                fixture.detectChanges();
                fixture.debugElement.componentInstance.form =
                    new forms_1.FormGroup({ 'login': new forms_1.FormControl('newValue') });
                fixture.detectChanges();
                var input = fixture.debugElement.query(by_1.By.css('input'));
                testing_internal_1.expect(input.nativeElement.value).toEqual('newValue');
                async.done();
            });
        }));
        testing_internal_1.it('should update DOM elements when updating the value of a control', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var login = new forms_1.FormControl('oldValue');
            var form = new forms_1.FormGroup({ 'login': login });
            var t = "<div [formGroup]=\"form\">\n                <input type=\"text\" formControlName=\"login\">\n               </div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                fixture.debugElement.componentInstance.form = form;
                fixture.detectChanges();
                login.updateValue('newValue');
                fixture.detectChanges();
                var input = fixture.debugElement.query(by_1.By.css('input'));
                testing_internal_1.expect(input.nativeElement.value).toEqual('newValue');
                async.done();
            });
        }));
        testing_internal_1.it('should mark controls as touched after interacting with the DOM control', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var login = new forms_1.FormControl('oldValue');
            var form = new forms_1.FormGroup({ 'login': login });
            var t = "<div [formGroup]=\"form\">\n                <input type=\"text\" formControlName=\"login\">\n               </div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                fixture.debugElement.componentInstance.form = form;
                fixture.detectChanges();
                var loginEl = fixture.debugElement.query(by_1.By.css('input'));
                testing_internal_1.expect(login.touched).toBe(false);
                browser_util_1.dispatchEvent(loginEl.nativeElement, 'blur');
                testing_internal_1.expect(login.touched).toBe(true);
                async.done();
            });
        }));
        testing_internal_1.it('should clear value in UI when form resets programmatically', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var login = new forms_1.FormControl('oldValue');
            var form = new forms_1.FormGroup({ 'login': login });
            var t = "<div [formGroup]=\"form\">\n                <input type=\"text\" formControlName=\"login\">\n               </div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                fixture.debugElement.componentInstance.form = form;
                fixture.detectChanges();
                login.updateValue('new value');
                var loginEl = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                testing_internal_1.expect(loginEl.value).toBe('new value');
                form.reset();
                testing_internal_1.expect(loginEl.value).toBe('');
                async.done();
            });
        }));
        testing_internal_1.it('should set value in UI when form resets to that value programmatically', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var login = new forms_1.FormControl('oldValue');
            var form = new forms_1.FormGroup({ 'login': login });
            var t = "<div [formGroup]=\"form\">\n                <input type=\"text\" formControlName=\"login\">\n               </div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                fixture.debugElement.componentInstance.form = form;
                fixture.detectChanges();
                login.updateValue('new value');
                var loginEl = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                testing_internal_1.expect(loginEl.value).toBe('new value');
                form.reset({ 'login': 'oldValue' });
                testing_internal_1.expect(loginEl.value).toBe('oldValue');
                async.done();
            });
        }));
        testing_internal_1.it('should support form arrays', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            var cityArray = new forms_1.FormArray([new forms_1.FormControl('SF'), new forms_1.FormControl('NY')]);
            var form = new forms_1.FormGroup({ cities: cityArray });
            var t = "<div [formGroup]=\"form\">\n                <div formArrayName=\"cities\">\n                  <div *ngFor=\"let city of cityArray.controls; let i=index\">\n                    <input [formControlName]=\"i\">\n                  </div>\n                </div>\n               </div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                fixture.debugElement.componentInstance.form = form;
                fixture.debugElement.componentInstance.cityArray = cityArray;
                fixture.detectChanges();
                testing_1.tick();
                var inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                testing_internal_1.expect(inputs[0].nativeElement.value).toEqual('SF');
                testing_internal_1.expect(inputs[1].nativeElement.value).toEqual('NY');
                testing_internal_1.expect(fixture.componentInstance.form.value).toEqual({ cities: ['SF', 'NY'] });
                inputs[0].nativeElement.value = 'LA';
                browser_util_1.dispatchEvent(inputs[0].nativeElement, 'input');
                fixture.detectChanges();
                testing_1.tick();
                testing_internal_1.expect(fixture.componentInstance.form.value).toEqual({ cities: ['LA', 'NY'] });
            });
        })));
        testing_internal_1.it('should support pushing new controls to form arrays', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            var cityArray = new forms_1.FormArray([new forms_1.FormControl('SF'), new forms_1.FormControl('NY')]);
            var form = new forms_1.FormGroup({ cities: cityArray });
            var t = "<div [formGroup]=\"form\">\n                <div formArrayName=\"cities\">\n                  <div *ngFor=\"let city of cityArray.controls; let i=index\">\n                    <input [formControlName]=\"i\">\n                  </div>\n                </div>\n               </div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                fixture.debugElement.componentInstance.form = form;
                fixture.debugElement.componentInstance.cityArray = cityArray;
                fixture.detectChanges();
                testing_1.tick();
                cityArray.push(new forms_1.FormControl('LA'));
                fixture.detectChanges();
                testing_1.tick();
                var inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                testing_internal_1.expect(inputs[2].nativeElement.value).toEqual('LA');
                testing_internal_1.expect(fixture.componentInstance.form.value).toEqual({ cities: ['SF', 'NY', 'LA'] });
            });
        })));
        testing_internal_1.describe('different control types', function () {
            testing_internal_1.it('should support <input type=text>', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [formGroup]=\"form\">\n                  <input type=\"text\" formControlName=\"text\">\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_1.FormGroup({ 'text': new forms_1.FormControl('old') });
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('input'));
                    testing_internal_1.expect(input.nativeElement.value).toEqual('old');
                    input.nativeElement.value = 'new';
                    browser_util_1.dispatchEvent(input.nativeElement, 'input');
                    testing_internal_1.expect(fixture.debugElement.componentInstance.form.value).toEqual({ 'text': 'new' });
                    async.done();
                });
            }));
            testing_internal_1.it('should support <input> without type', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [formGroup]=\"form\">\n                  <input formControlName=\"text\">\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_1.FormGroup({ 'text': new forms_1.FormControl('old') });
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('input'));
                    testing_internal_1.expect(input.nativeElement.value).toEqual('old');
                    input.nativeElement.value = 'new';
                    browser_util_1.dispatchEvent(input.nativeElement, 'input');
                    testing_internal_1.expect(fixture.debugElement.componentInstance.form.value).toEqual({ 'text': 'new' });
                    async.done();
                });
            }));
            testing_internal_1.it('should support <textarea>', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [formGroup]=\"form\">\n                  <textarea formControlName=\"text\"></textarea>\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_1.FormGroup({ 'text': new forms_1.FormControl('old') });
                    fixture.detectChanges();
                    var textarea = fixture.debugElement.query(by_1.By.css('textarea'));
                    testing_internal_1.expect(textarea.nativeElement.value).toEqual('old');
                    textarea.nativeElement.value = 'new';
                    browser_util_1.dispatchEvent(textarea.nativeElement, 'input');
                    testing_internal_1.expect(fixture.debugElement.componentInstance.form.value).toEqual({ 'text': 'new' });
                    async.done();
                });
            }));
            testing_internal_1.it('should support <type=checkbox>', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [formGroup]=\"form\">\n                  <input type=\"checkbox\" formControlName=\"checkbox\">\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_1.FormGroup({ 'checkbox': new forms_1.FormControl(true) });
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('input'));
                    testing_internal_1.expect(input.nativeElement.checked).toBe(true);
                    input.nativeElement.checked = false;
                    browser_util_1.dispatchEvent(input.nativeElement, 'change');
                    testing_internal_1.expect(fixture.debugElement.componentInstance.form.value).toEqual({
                        'checkbox': false
                    });
                    async.done();
                });
            }));
            testing_internal_1.it('should support <type=number>', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [formGroup]=\"form\">\n                  <input type=\"number\" formControlName=\"num\">\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_1.FormGroup({ 'num': new forms_1.FormControl(10) });
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('input'));
                    testing_internal_1.expect(input.nativeElement.value).toEqual('10');
                    input.nativeElement.value = '20';
                    browser_util_1.dispatchEvent(input.nativeElement, 'input');
                    testing_internal_1.expect(fixture.debugElement.componentInstance.form.value).toEqual({ 'num': 20 });
                    async.done();
                });
            }));
            testing_internal_1.it('should support <type=number> when value is cleared in the UI', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [formGroup]=\"form\">\n                  <input type=\"number\" formControlName=\"num\" required>\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_1.FormGroup({ 'num': new forms_1.FormControl(10) });
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('input'));
                    input.nativeElement.value = '';
                    browser_util_1.dispatchEvent(input.nativeElement, 'input');
                    testing_internal_1.expect(fixture.debugElement.componentInstance.form.valid).toBe(false);
                    testing_internal_1.expect(fixture.debugElement.componentInstance.form.value).toEqual({ 'num': null });
                    input.nativeElement.value = '0';
                    browser_util_1.dispatchEvent(input.nativeElement, 'input');
                    testing_internal_1.expect(fixture.debugElement.componentInstance.form.valid).toBe(true);
                    testing_internal_1.expect(fixture.debugElement.componentInstance.form.value).toEqual({ 'num': 0 });
                    async.done();
                });
            }));
            testing_internal_1.it('should support <type=number> when value is cleared programmatically', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var form = new forms_1.FormGroup({ 'num': new forms_1.FormControl(10) });
                var t = "<div [formGroup]=\"form\">\n                  <input type=\"number\" formControlName=\"num\" [(ngModel)]=\"data\">\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form = form;
                    fixture.debugElement.componentInstance.data = null;
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('input'));
                    testing_internal_1.expect(input.nativeElement.value).toEqual('');
                    async.done();
                });
            }));
            testing_internal_1.it('should support <type=radio>', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<form [formGroup]=\"form\">\n                  <input type=\"radio\" formControlName=\"food\" value=\"chicken\">\n                  <input type=\"radio\" formControlName=\"food\" value=\"fish\">\n                </form>";
                var ctrl = new forms_1.FormControl('fish');
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form = new forms_1.FormGroup({ 'food': ctrl });
                    fixture.detectChanges();
                    var inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                    testing_internal_1.expect(inputs[0].nativeElement.checked).toEqual(false);
                    testing_internal_1.expect(inputs[1].nativeElement.checked).toEqual(true);
                    browser_util_1.dispatchEvent(inputs[0].nativeElement, 'change');
                    fixture.detectChanges();
                    var value = fixture.debugElement.componentInstance.form.value;
                    testing_internal_1.expect(value.food).toEqual('chicken');
                    testing_internal_1.expect(inputs[1].nativeElement.checked).toEqual(false);
                    ctrl.updateValue('fish');
                    fixture.detectChanges();
                    testing_internal_1.expect(inputs[0].nativeElement.checked).toEqual(false);
                    testing_internal_1.expect(inputs[1].nativeElement.checked).toEqual(true);
                    async.done();
                });
            }));
            testing_internal_1.it('should use formControlName to group radio buttons when name is absent', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<form [formGroup]=\"form\">\n                  <input type=\"radio\" formControlName=\"food\" value=\"chicken\">\n                  <input type=\"radio\" formControlName=\"food\" value=\"fish\">\n                  <input type=\"radio\" formControlName=\"drink\" value=\"cola\">\n                  <input type=\"radio\" formControlName=\"drink\" value=\"sprite\">\n                </form>";
                var foodCtrl = new forms_1.FormControl('fish');
                var drinkCtrl = new forms_1.FormControl('sprite');
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_1.FormGroup({ 'food': foodCtrl, 'drink': drinkCtrl });
                    fixture.detectChanges();
                    var inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                    testing_internal_1.expect(inputs[0].nativeElement.checked).toEqual(false);
                    testing_internal_1.expect(inputs[1].nativeElement.checked).toEqual(true);
                    testing_internal_1.expect(inputs[2].nativeElement.checked).toEqual(false);
                    testing_internal_1.expect(inputs[3].nativeElement.checked).toEqual(true);
                    browser_util_1.dispatchEvent(inputs[0].nativeElement, 'change');
                    inputs[0].nativeElement.checked = true;
                    fixture.detectChanges();
                    var value = fixture.debugElement.componentInstance.form.value;
                    testing_internal_1.expect(value.food).toEqual('chicken');
                    testing_internal_1.expect(inputs[1].nativeElement.checked).toEqual(false);
                    testing_internal_1.expect(inputs[2].nativeElement.checked).toEqual(false);
                    testing_internal_1.expect(inputs[3].nativeElement.checked).toEqual(true);
                    drinkCtrl.updateValue('cola');
                    fixture.detectChanges();
                    testing_internal_1.expect(inputs[0].nativeElement.checked).toEqual(true);
                    testing_internal_1.expect(inputs[1].nativeElement.checked).toEqual(false);
                    testing_internal_1.expect(inputs[2].nativeElement.checked).toEqual(true);
                    testing_internal_1.expect(inputs[3].nativeElement.checked).toEqual(false);
                    async.done();
                });
            }));
            testing_internal_1.it('should throw if radio button name does not match formControlName attr', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<form [formGroup]=\"form\">\n                  <input type=\"radio\" formControlName=\"food\" name=\"drink\" value=\"chicken\">\n                </form>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_1.FormGroup({ 'food': new forms_1.FormControl('fish') });
                    testing_internal_1.expect(function () { return fixture.detectChanges(); })
                        .toThrowError(new RegExp('If you define both a name and a formControlName'));
                    async.done();
                });
            }));
            testing_internal_1.it('should support removing controls from <type=radio>', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "\n                <input type=\"radio\" [formControl]=\"showRadio\" value=\"yes\">\n                <input type=\"radio\" [formControl]=\"showRadio\" value=\"no\">\n                <form [formGroup]=\"form\">\n                  <div *ngIf=\"showRadio.value === 'yes'\">\n                    <input type=\"radio\" formControlName=\"food\" value=\"chicken\">\n                    <input type=\"radio\" formControlName=\"food\" value=\"fish\">\n                  </div>\n                </form>";
                var ctrl = new forms_1.FormControl('fish');
                var showRadio = new forms_1.FormControl('yes');
                var form = new forms_1.FormGroup({ 'food': ctrl });
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form = form;
                    fixture.debugElement.componentInstance.showRadio = showRadio;
                    showRadio.valueChanges.subscribe(function (change) {
                        (change === 'yes') ? form.addControl('food', new forms_1.FormControl('fish')) :
                            form.removeControl('food');
                    });
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('[value="no"]'));
                    browser_util_1.dispatchEvent(input.nativeElement, 'change');
                    fixture.detectChanges();
                    testing_internal_1.expect(form.value).toEqual({});
                    async.done();
                });
            }));
            testing_internal_1.describe('should support <select>', function () {
                testing_internal_1.it('with basic selection', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    var t = "<select>\n                      <option value=\"SF\"></option>\n                      <option value=\"NYC\"></option>\n                    </select>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        fixture.detectChanges();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        var sfOption = fixture.debugElement.query(by_1.By.css('option'));
                        testing_internal_1.expect(select.nativeElement.value).toEqual('SF');
                        testing_internal_1.expect(sfOption.nativeElement.selected).toBe(true);
                        async.done();
                    });
                }));
                testing_internal_1.it('with basic selection and value bindings', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    var t = "<select>\n                      <option *ngFor=\"let city of list\" [value]=\"city['id']\">\n                        {{ city['name'] }}\n                      </option>\n                    </select>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        var testComp = fixture.debugElement.componentInstance;
                        testComp.list = [{ 'id': '0', 'name': 'SF' }, { 'id': '1', 'name': 'NYC' }];
                        fixture.detectChanges();
                        var sfOption = fixture.debugElement.query(by_1.By.css('option'));
                        testing_internal_1.expect(sfOption.nativeElement.value).toEqual('0');
                        testComp.list[0]['id'] = '2';
                        fixture.detectChanges();
                        testing_internal_1.expect(sfOption.nativeElement.value).toEqual('2');
                        async.done();
                    });
                }));
                testing_internal_1.it('with ngControl', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    var t = "<div [formGroup]=\"form\">\n                    <select formControlName=\"city\">\n                      <option value=\"SF\"></option>\n                      <option value=\"NYC\"></option>\n                    </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        fixture.debugElement.componentInstance.form =
                            new forms_1.FormGroup({ 'city': new forms_1.FormControl('SF') });
                        fixture.detectChanges();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        var sfOption = fixture.debugElement.query(by_1.By.css('option'));
                        testing_internal_1.expect(select.nativeElement.value).toEqual('SF');
                        testing_internal_1.expect(sfOption.nativeElement.selected).toBe(true);
                        select.nativeElement.value = 'NYC';
                        browser_util_1.dispatchEvent(select.nativeElement, 'change');
                        testing_internal_1.expect(fixture.debugElement.componentInstance.form.value).toEqual({
                            'city': 'NYC'
                        });
                        testing_internal_1.expect(sfOption.nativeElement.selected).toBe(false);
                        async.done();
                    });
                }));
                testing_internal_1.it('with a dynamic list of options', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                    var t = "<div [formGroup]=\"form\">\n                      <select formControlName=\"city\">\n                        <option *ngFor=\"let c of data\" [value]=\"c\"></option>\n                      </select>\n                  </div>";
                    var fixture;
                    tcb.overrideTemplate(MyComp8, t)
                        .createAsync(MyComp8)
                        .then(function (compFixture) { return fixture = compFixture; });
                    testing_1.tick();
                    fixture.debugElement.componentInstance.form =
                        new forms_1.FormGroup({ 'city': new forms_1.FormControl('NYC') });
                    fixture.debugElement.componentInstance.data = ['SF', 'NYC'];
                    fixture.detectChanges();
                    testing_1.tick();
                    var select = fixture.debugElement.query(by_1.By.css('select'));
                    testing_internal_1.expect(select.nativeElement.value).toEqual('NYC');
                })));
                testing_internal_1.it('with option values that are objects', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                    var t = "<div>\n                      <select [(ngModel)]=\"selectedCity\">\n                        <option *ngFor=\"let c of list\" [ngValue]=\"c\">{{c['name']}}</option>\n                      </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        var testComp = fixture.debugElement.componentInstance;
                        testComp.list = [{ 'name': 'SF' }, { 'name': 'NYC' }, { 'name': 'Buffalo' }];
                        testComp.selectedCity = testComp.list[1];
                        fixture.detectChanges();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        var nycOption = fixture.debugElement.queryAll(by_1.By.css('option'))[1];
                        testing_1.tick();
                        testing_internal_1.expect(select.nativeElement.value).toEqual('1: Object');
                        testing_internal_1.expect(nycOption.nativeElement.selected).toBe(true);
                        select.nativeElement.value = '2: Object';
                        browser_util_1.dispatchEvent(select.nativeElement, 'change');
                        fixture.detectChanges();
                        testing_1.tick();
                        testing_internal_1.expect(testComp.selectedCity['name']).toEqual('Buffalo');
                    });
                })));
                testing_internal_1.it('when new options are added (selection through the model)', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                    var t = "<div>\n                      <select [(ngModel)]=\"selectedCity\">\n                        <option *ngFor=\"let c of list\" [ngValue]=\"c\">{{c['name']}}</option>\n                      </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        var testComp = fixture.debugElement.componentInstance;
                        testComp.list = [{ 'name': 'SF' }, { 'name': 'NYC' }];
                        testComp.selectedCity = testComp.list[1];
                        fixture.detectChanges();
                        testComp.list.push({ 'name': 'Buffalo' });
                        testComp.selectedCity = testComp.list[2];
                        fixture.detectChanges();
                        testing_1.tick();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        var buffalo = fixture.debugElement.queryAll(by_1.By.css('option'))[2];
                        testing_internal_1.expect(select.nativeElement.value).toEqual('2: Object');
                        testing_internal_1.expect(buffalo.nativeElement.selected).toBe(true);
                    });
                })));
                testing_internal_1.it('when new options are added (selection through the UI)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    var t = "<div>\n                      <select [(ngModel)]=\"selectedCity\">\n                        <option *ngFor=\"let c of list\" [ngValue]=\"c\">{{c['name']}}</option>\n                      </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        var testComp = fixture.debugElement.componentInstance;
                        testComp.list = [{ 'name': 'SF' }, { 'name': 'NYC' }];
                        testComp.selectedCity = testComp.list[0];
                        fixture.detectChanges();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        var ny = fixture.debugElement.queryAll(by_1.By.css('option'))[1];
                        select.nativeElement.value = '1: Object';
                        browser_util_1.dispatchEvent(select.nativeElement, 'change');
                        testComp.list.push({ 'name': 'Buffalo' });
                        fixture.detectChanges();
                        testing_internal_1.expect(select.nativeElement.value).toEqual('1: Object');
                        testing_internal_1.expect(ny.nativeElement.selected).toBe(true);
                        async.done();
                    });
                }));
                testing_internal_1.it('when options are removed', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                    var t = "<div>\n                      <select [(ngModel)]=\"selectedCity\">\n                        <option *ngFor=\"let c of list\" [ngValue]=\"c\">{{c}}</option>\n                      </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        var testComp = fixture.debugElement.componentInstance;
                        testComp.list = [{ 'name': 'SF' }, { 'name': 'NYC' }];
                        testComp.selectedCity = testComp.list[1];
                        fixture.detectChanges();
                        testing_1.tick();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        testing_internal_1.expect(select.nativeElement.value).toEqual('1: Object');
                        testComp.list.pop();
                        fixture.detectChanges();
                        testing_1.tick();
                        testing_internal_1.expect(select.nativeElement.value).not.toEqual('1: Object');
                    });
                })));
                testing_internal_1.it('when option values change identity while tracking by index', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                    var t = "<div>\n                      <select [(ngModel)]=\"selectedCity\">\n                        <option *ngFor=\"let c of list; trackBy:customTrackBy\" [ngValue]=\"c\">{{c}}</option>\n                      </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        var testComp = fixture.debugElement.componentInstance;
                        testComp.list = [{ 'name': 'SF' }, { 'name': 'NYC' }];
                        testComp.selectedCity = testComp.list[0];
                        fixture.detectChanges();
                        testComp.list[1] = 'Buffalo';
                        testComp.selectedCity = testComp.list[1];
                        fixture.detectChanges();
                        testing_1.tick();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        var buffalo = fixture.debugElement.queryAll(by_1.By.css('option'))[1];
                        testing_internal_1.expect(select.nativeElement.value).toEqual('1: Buffalo');
                        testing_internal_1.expect(buffalo.nativeElement.selected).toBe(true);
                    });
                })));
                testing_internal_1.it('with duplicate option values', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                    var t = "<div>\n                      <select [(ngModel)]=\"selectedCity\">\n                        <option *ngFor=\"let c of list\" [ngValue]=\"c\">{{c.name}}</option>\n                      </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        var testComp = fixture.debugElement.componentInstance;
                        testComp.list = [{ 'name': 'NYC' }, { 'name': 'SF' }, { 'name': 'SF' }];
                        testComp.selectedCity = testComp.list[0];
                        fixture.detectChanges();
                        testComp.selectedCity = testComp.list[1];
                        fixture.detectChanges();
                        testing_1.tick();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        var firstSF = fixture.debugElement.queryAll(by_1.By.css('option'))[1];
                        testing_internal_1.expect(select.nativeElement.value).toEqual('1: Object');
                        testing_internal_1.expect(firstSF.nativeElement.selected).toBe(true);
                    });
                })));
                testing_internal_1.it('when option values have same content, but different identities', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                    var t = "<div>\n                      <select [(ngModel)]=\"selectedCity\">\n                        <option *ngFor=\"let c of list\" [ngValue]=\"c\">{{c['name']}}</option>\n                      </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        var testComp = fixture.debugElement.componentInstance;
                        testComp.list = [{ 'name': 'SF' }, { 'name': 'NYC' }, { 'name': 'NYC' }];
                        testComp.selectedCity = testComp.list[0];
                        fixture.detectChanges();
                        testComp.selectedCity = testComp.list[2];
                        fixture.detectChanges();
                        testing_1.tick();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        var secondNYC = fixture.debugElement.queryAll(by_1.By.css('option'))[2];
                        testing_internal_1.expect(select.nativeElement.value).toEqual('2: Object');
                        testing_internal_1.expect(secondNYC.nativeElement.selected).toBe(true);
                    });
                })));
            });
            testing_internal_1.it('should support custom value accessors', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [formGroup]=\"form\">\n                  <input type=\"text\" formControlName=\"name\" wrapped-value>\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_1.FormGroup({ 'name': new forms_1.FormControl('aa') });
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('input'));
                    testing_internal_1.expect(input.nativeElement.value).toEqual('!aa!');
                    input.nativeElement.value = '!bb!';
                    browser_util_1.dispatchEvent(input.nativeElement, 'input');
                    testing_internal_1.expect(fixture.debugElement.componentInstance.form.value).toEqual({ 'name': 'bb' });
                    async.done();
                });
            }));
            testing_internal_1.it('should support custom value accessors on non builtin input elements that fire a change event without a \'target\' property', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [formGroup]=\"form\">\n                  <my-input formControlName=\"name\"></my-input>\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_1.FormGroup({ 'name': new forms_1.FormControl('aa') });
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('my-input'));
                    testing_internal_1.expect(input.componentInstance.value).toEqual('!aa!');
                    input.componentInstance.value = '!bb!';
                    async_1.ObservableWrapper.subscribe(input.componentInstance.onInput, function (value) {
                        testing_internal_1.expect(fixture.debugElement.componentInstance.form.value).toEqual({
                            'name': 'bb'
                        });
                        async.done();
                    });
                    input.componentInstance.dispatchChangeEvent();
                });
            }));
        });
        testing_internal_1.describe('validations', function () {
            testing_internal_1.it('should use sync validators defined in html', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var form = new forms_1.FormGroup({
                    'login': new forms_1.FormControl(''),
                    'min': new forms_1.FormControl(''),
                    'max': new forms_1.FormControl('')
                });
                var t = "<div [formGroup]=\"form\" login-is-empty-validator>\n                    <input type=\"text\" formControlName=\"login\" required>\n                    <input type=\"text\" formControlName=\"min\" minlength=\"3\">\n                    <input type=\"text\" formControlName=\"max\" maxlength=\"3\">\n                 </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form = form;
                    fixture.detectChanges();
                    var required = fixture.debugElement.query(by_1.By.css('[required]'));
                    var minLength = fixture.debugElement.query(by_1.By.css('[minlength]'));
                    var maxLength = fixture.debugElement.query(by_1.By.css('[maxlength]'));
                    required.nativeElement.value = '';
                    minLength.nativeElement.value = '1';
                    maxLength.nativeElement.value = '1234';
                    browser_util_1.dispatchEvent(required.nativeElement, 'input');
                    browser_util_1.dispatchEvent(minLength.nativeElement, 'input');
                    browser_util_1.dispatchEvent(maxLength.nativeElement, 'input');
                    testing_internal_1.expect(form.hasError('required', ['login'])).toEqual(true);
                    testing_internal_1.expect(form.hasError('minlength', ['min'])).toEqual(true);
                    testing_internal_1.expect(form.hasError('maxlength', ['max'])).toEqual(true);
                    testing_internal_1.expect(form.hasError('loginIsEmpty')).toEqual(true);
                    required.nativeElement.value = '1';
                    minLength.nativeElement.value = '123';
                    maxLength.nativeElement.value = '123';
                    browser_util_1.dispatchEvent(required.nativeElement, 'input');
                    browser_util_1.dispatchEvent(minLength.nativeElement, 'input');
                    browser_util_1.dispatchEvent(maxLength.nativeElement, 'input');
                    testing_internal_1.expect(form.valid).toEqual(true);
                    async.done();
                });
            }));
            testing_internal_1.it('should use async validators defined in the html', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var form = new forms_1.FormGroup({ 'login': new forms_1.FormControl('') });
                var t = "<div [formGroup]=\"form\">\n                    <input type=\"text\" formControlName=\"login\" uniq-login-validator=\"expected\">\n                 </div>";
                var rootTC;
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (root) { return rootTC = root; });
                testing_1.tick();
                rootTC.debugElement.componentInstance.form = form;
                rootTC.detectChanges();
                testing_internal_1.expect(form.pending).toEqual(true);
                testing_1.tick(100);
                testing_internal_1.expect(form.hasError('uniqLogin', ['login'])).toEqual(true);
                var input = rootTC.debugElement.query(by_1.By.css('input'));
                input.nativeElement.value = 'expected';
                browser_util_1.dispatchEvent(input.nativeElement, 'input');
                testing_1.tick(100);
                testing_internal_1.expect(form.valid).toEqual(true);
            })));
            testing_internal_1.it('should use sync validators defined in the model', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var form = new forms_1.FormGroup({ 'login': new forms_1.FormControl('aa', forms_1.Validators.required) });
                var t = "<div [formGroup]=\"form\">\n                  <input type=\"text\" formControlName=\"login\">\n                 </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form = form;
                    fixture.detectChanges();
                    testing_internal_1.expect(form.valid).toEqual(true);
                    var input = fixture.debugElement.query(by_1.By.css('input'));
                    input.nativeElement.value = '';
                    browser_util_1.dispatchEvent(input.nativeElement, 'input');
                    testing_internal_1.expect(form.valid).toEqual(false);
                    async.done();
                });
            }));
            testing_internal_1.it('should use async validators defined in the model', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var control = new forms_1.FormControl('', forms_1.Validators.required, uniqLoginAsyncValidator('expected'));
                var form = new forms_1.FormGroup({ 'login': control });
                var t = "<div [formGroup]=\"form\">\n                  <input type=\"text\" formControlName=\"login\">\n                 </div>";
                var fixture;
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (root) { return fixture = root; });
                testing_1.tick();
                fixture.debugElement.componentInstance.form = form;
                fixture.detectChanges();
                testing_internal_1.expect(form.hasError('required', ['login'])).toEqual(true);
                var input = fixture.debugElement.query(by_1.By.css('input'));
                input.nativeElement.value = 'wrong value';
                browser_util_1.dispatchEvent(input.nativeElement, 'input');
                testing_internal_1.expect(form.pending).toEqual(true);
                testing_1.tick();
                testing_internal_1.expect(form.hasError('uniqLogin', ['login'])).toEqual(true);
                input.nativeElement.value = 'expected';
                browser_util_1.dispatchEvent(input.nativeElement, 'input');
                testing_1.tick();
                testing_internal_1.expect(form.valid).toEqual(true);
            })));
        });
        testing_internal_1.describe('nested forms', function () {
            testing_internal_1.it('should init DOM with the given form object', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var form = new forms_1.FormGroup({ 'nested': new forms_1.FormGroup({ 'login': new forms_1.FormControl('value') }) });
                var t = "<div [formGroup]=\"form\">\n                  <div formGroupName=\"nested\">\n                    <input type=\"text\" formControlName=\"login\">\n                  </div>\n              </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form = form;
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('input'));
                    testing_internal_1.expect(input.nativeElement.value).toEqual('value');
                    async.done();
                });
            }));
            testing_internal_1.it('should update the control group values on DOM change', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var form = new forms_1.FormGroup({ 'nested': new forms_1.FormGroup({ 'login': new forms_1.FormControl('value') }) });
                var t = "<div [formGroup]=\"form\">\n                    <div formGroupName=\"nested\">\n                      <input type=\"text\" formControlName=\"login\">\n                    </div>\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form = form;
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('input'));
                    input.nativeElement.value = 'updatedValue';
                    browser_util_1.dispatchEvent(input.nativeElement, 'input');
                    testing_internal_1.expect(form.value).toEqual({ 'nested': { 'login': 'updatedValue' } });
                    async.done();
                });
            }));
        });
        testing_internal_1.it('should support ngModel for complex forms', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            var form = new forms_1.FormGroup({ 'name': new forms_1.FormControl('') });
            var t = "<div [formGroup]=\"form\"><input type=\"text\" formControlName=\"name\" [(ngModel)]=\"name\"></div>";
            var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
            testing_1.tick();
            fixture.debugElement.componentInstance.name = 'oldValue';
            fixture.debugElement.componentInstance.form = form;
            fixture.detectChanges();
            var input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            testing_internal_1.expect(input.value).toEqual('oldValue');
            input.value = 'updatedValue';
            browser_util_1.dispatchEvent(input, 'input');
            testing_1.tick();
            testing_internal_1.expect(fixture.debugElement.componentInstance.name).toEqual('updatedValue');
        })));
        testing_internal_1.it('should support ngModel for single fields', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            var form = new forms_1.FormControl('');
            var t = "<div><input type=\"text\" [formControl]=\"form\" [(ngModel)]=\"name\"></div>";
            var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
            testing_1.tick();
            fixture.debugElement.componentInstance.form = form;
            fixture.debugElement.componentInstance.name = 'oldValue';
            fixture.detectChanges();
            var input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
            testing_internal_1.expect(input.value).toEqual('oldValue');
            input.value = 'updatedValue';
            browser_util_1.dispatchEvent(input, 'input');
            testing_1.tick();
            testing_internal_1.expect(fixture.debugElement.componentInstance.name).toEqual('updatedValue');
        })));
        testing_internal_1.describe('template-driven forms', function () {
            testing_internal_1.it('should add new controls and control groups', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "<form>\n                     <div ngModelGroup=\"user\">\n                      <input type=\"text\" name=\"login\" ngModel>\n                     </div>\n               </form>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.name = null;
                fixture.detectChanges();
                var form = fixture.debugElement.children[0].injector.get(forms_1.NgForm);
                testing_internal_1.expect(form.controls['user']).not.toBeDefined();
                testing_1.tick();
                testing_internal_1.expect(form.controls['user']).toBeDefined();
                testing_internal_1.expect(form.controls['user'].controls['login']).toBeDefined();
            })));
            testing_internal_1.it('should emit ngSubmit event on submit', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "<div><form (ngSubmit)=\"name='updated'\"></form></div>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.name = 'old';
                var form = fixture.debugElement.query(by_1.By.css('form'));
                browser_util_1.dispatchEvent(form.nativeElement, 'submit');
                testing_1.tick();
                testing_internal_1.expect(fixture.debugElement.componentInstance.name).toEqual('updated');
            })));
            testing_internal_1.it('should reset the form to empty when reset button is clicked', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "\n            <form>\n              <input name=\"name\" [(ngModel)]=\"name\">\n            </form>\n           ";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.name = 'should be cleared';
                fixture.detectChanges();
                testing_1.tick();
                var form = fixture.debugElement.children[0].injector.get(forms_1.NgForm);
                var formEl = fixture.debugElement.query(by_1.By.css('form'));
                browser_util_1.dispatchEvent(formEl.nativeElement, 'reset');
                fixture.detectChanges();
                testing_1.tick();
                testing_internal_1.expect(fixture.debugElement.componentInstance.name).toBe(null);
                testing_internal_1.expect(form.value.name).toEqual(null);
            })));
            testing_internal_1.it('should emit valueChanges and statusChanges on init', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "<form>\n                  <input type=\"text\" name=\"first\" [ngModel]=\"name\" minlength=\"3\">\n                </form>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                var form = fixture.debugElement.children[0].injector.get(forms_1.NgForm);
                fixture.debugElement.componentInstance.name = 'aa';
                fixture.detectChanges();
                testing_internal_1.expect(form.valid).toEqual(true);
                testing_internal_1.expect(form.value).toEqual({});
                var formValidity;
                var formValue;
                async_1.ObservableWrapper.subscribe(form.statusChanges, function (status) { formValidity = status; });
                async_1.ObservableWrapper.subscribe(form.valueChanges, function (value) { formValue = value; });
                testing_1.tick();
                testing_internal_1.expect(formValidity).toEqual('INVALID');
                testing_internal_1.expect(formValue).toEqual({ first: 'aa' });
            })));
            testing_internal_1.it('should not create a template-driven form when ngNoForm is used', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<form ngNoForm>\n               </form>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.name = null;
                    fixture.detectChanges();
                    testing_internal_1.expect(fixture.debugElement.children[0].providerTokens.length).toEqual(0);
                    async.done();
                });
            }));
            testing_internal_1.it('should remove controls', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "<form>\n                    <div *ngIf=\"name == 'show'\">\n                      <input type=\"text\" name=\"login\" ngModel>\n                    </div>\n                  </form>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.name = 'show';
                fixture.detectChanges();
                testing_1.tick();
                var form = fixture.debugElement.children[0].injector.get(forms_1.NgForm);
                testing_internal_1.expect(form.controls['login']).toBeDefined();
                fixture.debugElement.componentInstance.name = 'hide';
                fixture.detectChanges();
                testing_1.tick();
                testing_internal_1.expect(form.controls['login']).not.toBeDefined();
            })));
            testing_internal_1.it('should remove control groups', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "<form>\n                     <div *ngIf=\"name=='show'\" ngModelGroup=\"user\">\n                      <input type=\"text\" name=\"login\" ngModel>\n                     </div>\n               </form>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.name = 'show';
                fixture.detectChanges();
                testing_1.tick();
                var form = fixture.debugElement.children[0].injector.get(forms_1.NgForm);
                testing_internal_1.expect(form.controls['user']).toBeDefined();
                fixture.debugElement.componentInstance.name = 'hide';
                fixture.detectChanges();
                testing_1.tick();
                testing_internal_1.expect(form.controls['user']).not.toBeDefined();
            })));
            testing_internal_1.it('should support ngModel for complex forms', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "<form>\n                      <input type=\"text\" name=\"name\" [(ngModel)]=\"name\">\n               </form>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.name = 'oldValue';
                fixture.detectChanges();
                testing_1.tick();
                var input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                testing_internal_1.expect(input.value).toEqual('oldValue');
                input.value = 'updatedValue';
                browser_util_1.dispatchEvent(input, 'input');
                testing_1.tick();
                testing_internal_1.expect(fixture.debugElement.componentInstance.name).toEqual('updatedValue');
            })));
            testing_internal_1.it('should support ngModel for single fields', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "<div><input type=\"text\" [(ngModel)]=\"name\"></div>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.name = 'oldValue';
                fixture.detectChanges();
                var input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                testing_1.tick();
                testing_internal_1.expect(input.value).toEqual('oldValue');
                input.value = 'updatedValue';
                browser_util_1.dispatchEvent(input, 'input');
                testing_1.tick();
                testing_internal_1.expect(fixture.debugElement.componentInstance.name).toEqual('updatedValue');
            })));
            testing_internal_1.it('should support ngModel registration with a parent form', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "\n            <form>\n              <input name=\"first\" [(ngModel)]=\"name\" maxlength=\"4\">\n            </form>\n            ";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.name = 'Nancy';
                fixture.detectChanges();
                var form = fixture.debugElement.children[0].injector.get(forms_1.NgForm);
                testing_1.tick();
                testing_internal_1.expect(form.value).toEqual({ first: 'Nancy' });
                testing_internal_1.expect(form.valid).toBe(false);
            })));
            testing_internal_1.it('should throw if ngModel has a parent form but no name attr or standalone label', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<form>\n                  <input [(ngModel)]=\"name\">\n                </form>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    testing_internal_1.expect(function () { return fixture.detectChanges(); })
                        .toThrowError(new RegExp("name attribute must be set"));
                    async.done();
                });
            }));
            testing_internal_1.it('should not throw if ngModel has a parent form, no name attr, and a standalone label', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<form>\n                  <input [(ngModel)]=\"name\" [ngModelOptions]=\"{standalone: true}\">\n                </form>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    testing_internal_1.expect(function () { return fixture.detectChanges(); }).not.toThrow();
                    async.done();
                });
            }));
            testing_internal_1.it('should override name attribute with ngModelOptions name if provided', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "\n            <form>\n              <input name=\"one\" [(ngModel)]=\"data\" [ngModelOptions]=\"{name: 'two'}\">\n            </form>\n            ";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.data = 'some data';
                fixture.detectChanges();
                var form = fixture.debugElement.children[0].injector.get(forms_1.NgForm);
                testing_1.tick();
                testing_internal_1.expect(form.value).toEqual({ two: 'some data' });
            })));
            testing_internal_1.it('should not register standalone ngModels with parent form', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "\n            <form>\n              <input name=\"one\" [(ngModel)]=\"data\">\n              <input [(ngModel)]=\"list\" [ngModelOptions]=\"{standalone: true}\">\n            </form>\n            ";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.data = 'some data';
                fixture.debugElement.componentInstance.list = 'should not show';
                fixture.detectChanges();
                var form = fixture.debugElement.children[0].injector.get(forms_1.NgForm);
                var inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                testing_1.tick();
                testing_internal_1.expect(form.value).toEqual({ one: 'some data' });
                testing_internal_1.expect(inputs[1].nativeElement.value).toEqual('should not show');
            })));
            testing_internal_1.it('should support <type=radio>', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "<form>\n                  <input type=\"radio\" name=\"food\" [(ngModel)]=\"data.food\" value=\"chicken\">\n                  <input type=\"radio\" name=\"food\" [(ngModel)]=\"data.food\" value=\"fish\">\n                </form>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.data = { food: 'fish' };
                fixture.detectChanges();
                testing_1.tick();
                var inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                testing_internal_1.expect(inputs[0].nativeElement.checked).toEqual(false);
                testing_internal_1.expect(inputs[1].nativeElement.checked).toEqual(true);
                browser_util_1.dispatchEvent(inputs[0].nativeElement, 'change');
                testing_1.tick();
                var data = fixture.debugElement.componentInstance.data;
                testing_internal_1.expect(data.food).toEqual('chicken');
                testing_internal_1.expect(inputs[1].nativeElement.checked).toEqual(false);
            })));
            testing_internal_1.it('should support multiple named <type=radio> groups', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "<form>\n                  <input type=\"radio\" name=\"food\" [(ngModel)]=\"data.food\" value=\"chicken\">\n                  <input type=\"radio\" name=\"food\"  [(ngModel)]=\"data.food\" value=\"fish\">\n                  <input type=\"radio\" name=\"drink\" [(ngModel)]=\"data.drink\" value=\"cola\">\n                  <input type=\"radio\" name=\"drink\" [(ngModel)]=\"data.drink\" value=\"sprite\">\n                </form>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.data = { food: 'fish', drink: 'sprite' };
                fixture.detectChanges();
                testing_1.tick();
                var inputs = fixture.debugElement.queryAll(by_1.By.css('input'));
                testing_internal_1.expect(inputs[0].nativeElement.checked).toEqual(false);
                testing_internal_1.expect(inputs[1].nativeElement.checked).toEqual(true);
                testing_internal_1.expect(inputs[2].nativeElement.checked).toEqual(false);
                testing_internal_1.expect(inputs[3].nativeElement.checked).toEqual(true);
                browser_util_1.dispatchEvent(inputs[0].nativeElement, 'change');
                testing_1.tick();
                var data = fixture.debugElement.componentInstance.data;
                testing_internal_1.expect(data.food).toEqual('chicken');
                testing_internal_1.expect(data.drink).toEqual('sprite');
                testing_internal_1.expect(inputs[1].nativeElement.checked).toEqual(false);
                testing_internal_1.expect(inputs[2].nativeElement.checked).toEqual(false);
                testing_internal_1.expect(inputs[3].nativeElement.checked).toEqual(true);
            })));
        });
        testing_internal_1.describe('setting status classes', function () {
            testing_internal_1.it('should work with single fields', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var form = new forms_1.FormControl('', forms_1.Validators.required);
                var t = "<div><input type=\"text\" [formControl]=\"form\"></div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form = form;
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                    testing_internal_1.expect(sortedClassList(input)).toEqual([
                        'ng-invalid', 'ng-pristine', 'ng-untouched'
                    ]);
                    browser_util_1.dispatchEvent(input, 'blur');
                    fixture.detectChanges();
                    testing_internal_1.expect(sortedClassList(input)).toEqual([
                        'ng-invalid', 'ng-pristine', 'ng-touched'
                    ]);
                    input.value = 'updatedValue';
                    browser_util_1.dispatchEvent(input, 'input');
                    fixture.detectChanges();
                    testing_internal_1.expect(sortedClassList(input)).toEqual(['ng-dirty', 'ng-touched', 'ng-valid']);
                    async.done();
                });
            }));
            testing_internal_1.it('should work with complex model-driven forms', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var form = new forms_1.FormGroup({ 'name': new forms_1.FormControl('', forms_1.Validators.required) });
                var t = "<form [formGroup]=\"form\"><input type=\"text\" formControlName=\"name\"></form>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form = form;
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                    testing_internal_1.expect(sortedClassList(input)).toEqual([
                        'ng-invalid', 'ng-pristine', 'ng-untouched'
                    ]);
                    browser_util_1.dispatchEvent(input, 'blur');
                    fixture.detectChanges();
                    testing_internal_1.expect(sortedClassList(input)).toEqual([
                        'ng-invalid', 'ng-pristine', 'ng-touched'
                    ]);
                    input.value = 'updatedValue';
                    browser_util_1.dispatchEvent(input, 'input');
                    fixture.detectChanges();
                    testing_internal_1.expect(sortedClassList(input)).toEqual(['ng-dirty', 'ng-touched', 'ng-valid']);
                    async.done();
                });
            }));
            testing_internal_1.it('should work with ngModel', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div><input [(ngModel)]=\"name\" required></div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.name = '';
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                    testing_internal_1.expect(sortedClassList(input)).toEqual([
                        'ng-invalid', 'ng-pristine', 'ng-untouched'
                    ]);
                    browser_util_1.dispatchEvent(input, 'blur');
                    fixture.detectChanges();
                    testing_internal_1.expect(sortedClassList(input)).toEqual([
                        'ng-invalid', 'ng-pristine', 'ng-touched'
                    ]);
                    input.value = 'updatedValue';
                    browser_util_1.dispatchEvent(input, 'input');
                    fixture.detectChanges();
                    testing_internal_1.expect(sortedClassList(input)).toEqual(['ng-dirty', 'ng-touched', 'ng-valid']);
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('ngModel corner cases', function () {
            testing_internal_1.it('should not update the view when the value initially came from the view', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var form = new forms_1.FormControl('');
                var t = "<div><input type=\"text\" [formControl]=\"form\" [(ngModel)]=\"name\"></div>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.form = form;
                fixture.detectChanges();
                var input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'aa';
                input.setSelectionRange(1, 2);
                browser_util_1.dispatchEvent(input, 'input');
                testing_1.tick();
                fixture.detectChanges();
                // selection start has not changed because we did not reset the value
                testing_internal_1.expect(input.selectionStart).toEqual(1);
            })));
            testing_internal_1.it('should update the view when the model is set back to what used to be in the view', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "<input type=\"text\" [(ngModel)]=\"name\">";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.name = '';
                fixture.detectChanges();
                // Type "aa" into the input.
                var input = fixture.debugElement.query(by_1.By.css('input')).nativeElement;
                input.value = 'aa';
                input.selectionStart = 1;
                browser_util_1.dispatchEvent(input, 'input');
                fixture.detectChanges();
                testing_1.tick();
                testing_internal_1.expect(fixture.debugElement.componentInstance.name).toEqual('aa');
                // Programmatically update the input value to be "bb".
                fixture.debugElement.componentInstance.name = 'bb';
                fixture.detectChanges();
                testing_1.tick();
                testing_internal_1.expect(input.value).toEqual('bb');
                // Programatically set it back to "aa".
                fixture.debugElement.componentInstance.name = 'aa';
                fixture.detectChanges();
                testing_1.tick();
                testing_internal_1.expect(input.value).toEqual('aa');
            })));
            testing_internal_1.it('should not crash when validity is checked from a binding', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                // {{x.valid}} used to crash because valid() tried to read a property
                // from form.control before it was set. This test verifies this bug is
                // fixed.
                var t = "<form><div ngModelGroup=\"x\" #x=\"ngModelGroup\">\n                  <input type=\"text\" name=\"test\" ngModel></div>{{x.valid}}</form>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.detectChanges();
            })));
        });
    });
}
exports.main = main;
var WrappedValue = (function () {
    function WrappedValue(cd) {
        cd.valueAccessor = this;
    }
    WrappedValue.prototype.writeValue = function (value /** TODO #9100 */) { this.value = "!" + value + "!"; };
    WrappedValue.prototype.registerOnChange = function (fn /** TODO #9100 */) { this.onChange = fn; };
    WrappedValue.prototype.registerOnTouched = function (fn /** TODO #9100 */) { };
    WrappedValue.prototype.handleOnInput = function (value /** TODO #9100 */) {
        this.onChange(value.substring(1, value.length - 1));
    };
    /** @nocollapse */
    WrappedValue.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[wrapped-value]',
                    host: { '(input)': 'handleOnInput($event.target.value)', '[value]': 'value' }
                },] },
    ];
    /** @nocollapse */
    WrappedValue.ctorParameters = [
        { type: forms_1.NgControl, },
    ];
    return WrappedValue;
}());
var MyInput = (function () {
    function MyInput(cd) {
        this.onInput = new core_1.EventEmitter();
        cd.valueAccessor = this;
    }
    MyInput.prototype.writeValue = function (value /** TODO #9100 */) { this.value = "!" + value + "!"; };
    MyInput.prototype.registerOnChange = function (fn /** TODO #9100 */) { async_1.ObservableWrapper.subscribe(this.onInput, fn); };
    MyInput.prototype.registerOnTouched = function (fn /** TODO #9100 */) { };
    MyInput.prototype.dispatchChangeEvent = function () {
        async_1.ObservableWrapper.callEmit(this.onInput, this.value.substring(1, this.value.length - 1));
    };
    /** @nocollapse */
    MyInput.decorators = [
        { type: core_1.Component, args: [{ selector: 'my-input', template: '' },] },
    ];
    /** @nocollapse */
    MyInput.ctorParameters = [
        { type: forms_1.NgControl, },
    ];
    /** @nocollapse */
    MyInput.propDecorators = {
        'onInput': [{ type: core_1.Output, args: ['input',] },],
    };
    return MyInput;
}());
function uniqLoginAsyncValidator(expectedValue) {
    return function (c /** TODO #9100 */) {
        var completer = promise_1.PromiseWrapper.completer();
        var res = (c.value == expectedValue) ? null : { 'uniqLogin': true };
        completer.resolve(res);
        return completer.promise;
    };
}
function loginIsEmptyGroupValidator(c) {
    return c.controls['login'].value == '' ? { 'loginIsEmpty': true } : null;
}
var LoginIsEmptyValidator = (function () {
    function LoginIsEmptyValidator() {
    }
    /** @nocollapse */
    LoginIsEmptyValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[login-is-empty-validator]',
                    providers: [
                        /* @ts2dart_Provider */ {
                            provide: forms_1.NG_VALIDATORS,
                            useValue: loginIsEmptyGroupValidator,
                            multi: true
                        }
                    ]
                },] },
    ];
    return LoginIsEmptyValidator;
}());
var UniqLoginValidator = (function () {
    function UniqLoginValidator() {
    }
    UniqLoginValidator.prototype.validate = function (c /** TODO #9100 */) { return uniqLoginAsyncValidator(this.expected)(c); };
    /** @nocollapse */
    UniqLoginValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[uniq-login-validator]',
                    providers: [{
                            provide: forms_1.NG_ASYNC_VALIDATORS,
                            useExisting: core_1.forwardRef(function () { return UniqLoginValidator; }),
                            multi: true
                        }]
                },] },
    ];
    /** @nocollapse */
    UniqLoginValidator.propDecorators = {
        'expected': [{ type: core_1.Input, args: ['uniq-login-validator',] },],
    };
    return UniqLoginValidator;
}());
var MyComp8 = (function () {
    function MyComp8() {
    }
    MyComp8.prototype.customTrackBy = function (index, obj) { return index; };
    ;
    /** @nocollapse */
    MyComp8.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'my-comp',
                    template: '',
                    directives: [WrappedValue, MyInput, common_1.NgIf, common_1.NgFor, LoginIsEmptyValidator, UniqLoginValidator]
                },] },
    ];
    return MyComp8;
}());
function sortedClassList(el /** TODO #9100 */) {
    var l = dom_adapter_1.getDOM().classList(el);
    collection_1.ListWrapper.sort(l);
    return l;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdyYXRpb25fc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZm9ybXMvdGVzdC9pbnRlZ3JhdGlvbl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx1QkFBMEIsaUJBQWlCLENBQUMsQ0FBQTtBQUM1QyxxQkFBNEUsZUFBZSxDQUFDLENBQUE7QUFDNUYsd0JBQXdHLHVCQUF1QixDQUFDLENBQUE7QUFDaEksaUNBQXNILHdDQUF3QyxDQUFDLENBQUE7QUFDL0osc0JBQXNMLGdCQUFnQixDQUFDLENBQUE7QUFDdk0sbUJBQWlCLDRDQUE0QyxDQUFDLENBQUE7QUFDOUQsNEJBQXFCLCtDQUErQyxDQUFDLENBQUE7QUFDckUsNkJBQTRCLGdEQUFnRCxDQUFDLENBQUE7QUFFN0Usc0JBQWdDLHFCQUFxQixDQUFDLENBQUE7QUFDdEQsMkJBQTBCLDBCQUEwQixDQUFDLENBQUE7QUFDckQsd0JBQTZCLHVCQUF1QixDQUFDLENBQUE7QUFFckQ7SUFDRSwyQkFBUSxDQUFDLG1CQUFtQixFQUFFO1FBRTVCLDZCQUFVLENBQUMsY0FBUSx5QkFBZSxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsbUJBQVcsRUFBRSwyQkFBbUIsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXRGLHFCQUFFLENBQUMsMkRBQTJELEVBQzNELHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsSUFBTSxDQUFDLEdBQUcsb0hBRUQsQ0FBQztZQUVWLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ2pFLE9BQU8sQ0FBQyxZQUFZLENBQUMs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