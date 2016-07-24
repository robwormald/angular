/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var forms_deprecated_1 = require('@angular/common/src/forms-deprecated');
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var by_1 = require('@angular/platform-browser/src/dom/debug/by');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var async_1 = require('../../src/facade/async');
var collection_1 = require('../../src/facade/collection');
var promise_1 = require('../../src/facade/promise');
function main() {
    testing_internal_1.describe('integration tests', function () {
        testing_internal_1.beforeEach(function () { return testing_1.configureModule({ imports: [forms_deprecated_1.DeprecatedFormsModule] }); });
        testing_internal_1.it('should initialize DOM elements with the given form object', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var t = "<div [ngFormModel]=\"form\">\n                <input type=\"text\" ngControl=\"login\">\n               </div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                fixture.debugElement.componentInstance.form =
                    new forms_deprecated_1.ControlGroup({ 'login': new forms_deprecated_1.Control('loginValue') });
                fixture.detectChanges();
                var input = fixture.debugElement.query(by_1.By.css('input'));
                testing_internal_1.expect(input.nativeElement.value).toEqual('loginValue');
                async.done();
            });
        }));
        testing_internal_1.it('should throw if a form isn\'t passed into ngFormModel', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var t = "<div [ngFormModel]=\"form\">\n                <input type=\"text\" ngControl=\"login\">\n               </div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                testing_internal_1.expect(function () { return fixture.detectChanges(); })
                    .toThrowError(/ngFormModel expects a form\. Please pass one in/);
                async.done();
            });
        }));
        testing_internal_1.it('should update the control group values on DOM change', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var form = new forms_deprecated_1.ControlGroup({ 'login': new forms_deprecated_1.Control('oldValue') });
            var t = "<div [ngFormModel]=\"form\">\n                <input type=\"text\" ngControl=\"login\">\n              </div>";
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
            var form = new forms_deprecated_1.ControlGroup({ 'login': new forms_deprecated_1.Control('oldValue') });
            var t = "<div [ngFormModel]=\"form\">\n                <input type=\"text\" ngControl=\"login\">\n              </div>";
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
            var t = "<div>\n                      <form [ngFormModel]=\"form\" (ngSubmit)=\"name='updated'\"></form>\n                      <span>{{name}}</span>\n                    </div>";
            var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
            testing_1.tick();
            fixture.debugElement.componentInstance.form = new forms_deprecated_1.ControlGroup({});
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
        testing_internal_1.it('should mark NgFormModel as submitted on submit event', testing_internal_1.inject([testing_1.TestComponentBuilder], testing_1.fakeAsync(function (tcb) {
            var t = "<div>\n                      <form #f=\"ngForm\" [ngFormModel]=\"form\" (ngSubmit)=\"data=f.submitted\"></form>\n                      <span>{{data}}</span>\n                    </div>";
            var fixture;
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (root) {
                fixture = root;
            });
            testing_1.tick();
            fixture.debugElement.componentInstance.form = new forms_deprecated_1.ControlGroup({});
            fixture.debugElement.componentInstance.data = false;
            testing_1.tick();
            var form = fixture.debugElement.query(by_1.By.css('form'));
            browser_util_1.dispatchEvent(form.nativeElement, 'submit');
            testing_1.tick();
            testing_internal_1.expect(fixture.debugElement.componentInstance.data).toEqual(true);
        })));
        testing_internal_1.it('should work with single controls', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var control = new forms_deprecated_1.Control('loginValue');
            var t = "<div><input type=\"text\" [ngFormControl]=\"form\"></div>";
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
        testing_internal_1.it('should update DOM elements when rebinding the control group', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var t = "<div [ngFormModel]=\"form\">\n                <input type=\"text\" ngControl=\"login\">\n               </div>";
            tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                fixture.debugElement.componentInstance.form =
                    new forms_deprecated_1.ControlGroup({ 'login': new forms_deprecated_1.Control('oldValue') });
                fixture.detectChanges();
                fixture.debugElement.componentInstance.form =
                    new forms_deprecated_1.ControlGroup({ 'login': new forms_deprecated_1.Control('newValue') });
                fixture.detectChanges();
                var input = fixture.debugElement.query(by_1.By.css('input'));
                testing_internal_1.expect(input.nativeElement.value).toEqual('newValue');
                async.done();
            });
        }));
        testing_internal_1.it('should update DOM elements when updating the value of a control', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var login = new forms_deprecated_1.Control('oldValue');
            var form = new forms_deprecated_1.ControlGroup({ 'login': login });
            var t = "<div [ngFormModel]=\"form\">\n                <input type=\"text\" ngControl=\"login\">\n               </div>";
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
            var login = new forms_deprecated_1.Control('oldValue');
            var form = new forms_deprecated_1.ControlGroup({ 'login': login });
            var t = "<div [ngFormModel]=\"form\">\n                <input type=\"text\" ngControl=\"login\">\n               </div>";
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
        testing_internal_1.describe('different control types', function () {
            testing_internal_1.it('should support <input type=text>', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [ngFormModel]=\"form\">\n                  <input type=\"text\" ngControl=\"text\">\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_deprecated_1.ControlGroup({ 'text': new forms_deprecated_1.Control('old') });
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
                var t = "<div [ngFormModel]=\"form\">\n                  <input ngControl=\"text\">\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_deprecated_1.ControlGroup({ 'text': new forms_deprecated_1.Control('old') });
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
                var t = "<div [ngFormModel]=\"form\">\n                  <textarea ngControl=\"text\"></textarea>\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_deprecated_1.ControlGroup({ 'text': new forms_deprecated_1.Control('old') });
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
                var t = "<div [ngFormModel]=\"form\">\n                  <input type=\"checkbox\" ngControl=\"checkbox\">\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_deprecated_1.ControlGroup({ 'checkbox': new forms_deprecated_1.Control(true) });
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
                var t = "<div [ngFormModel]=\"form\">\n                  <input type=\"number\" ngControl=\"num\">\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_deprecated_1.ControlGroup({ 'num': new forms_deprecated_1.Control(10) });
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
                var t = "<div [ngFormModel]=\"form\">\n                  <input type=\"number\" ngControl=\"num\" required>\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_deprecated_1.ControlGroup({ 'num': new forms_deprecated_1.Control(10) });
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
                var form = new forms_deprecated_1.ControlGroup({ 'num': new forms_deprecated_1.Control(10) });
                var t = "<div [ngFormModel]=\"form\">\n                  <input type=\"number\" ngControl=\"num\" [(ngModel)]=\"data\">\n                </div>";
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
                var t = "<form [ngFormModel]=\"form\">\n                  <input type=\"radio\" ngControl=\"foodChicken\" name=\"food\">\n                  <input type=\"radio\" ngControl=\"foodFish\" name=\"food\">\n                </form>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form = new forms_deprecated_1.ControlGroup({
                        'foodChicken': new forms_deprecated_1.Control(new forms_deprecated_1.RadioButtonState(false, 'chicken')),
                        'foodFish': new forms_deprecated_1.Control(new forms_deprecated_1.RadioButtonState(true, 'fish'))
                    });
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('input'));
                    testing_internal_1.expect(input.nativeElement.checked).toEqual(false);
                    browser_util_1.dispatchEvent(input.nativeElement, 'change');
                    fixture.detectChanges();
                    var value = fixture.debugElement.componentInstance.form.value;
                    testing_internal_1.expect(value['foodChicken'].checked).toEqual(true);
                    testing_internal_1.expect(value['foodFish'].checked).toEqual(false);
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
                    var t = "<div [ngFormModel]=\"form\">\n                    <select ngControl=\"city\">\n                      <option value=\"SF\"></option>\n                      <option value=\"NYC\"></option>\n                    </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        fixture.debugElement.componentInstance.form =
                            new forms_deprecated_1.ControlGroup({ 'city': new forms_deprecated_1.Control('SF') });
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
                    var t = "<div [ngFormModel]=\"form\">\n                      <select ngControl=\"city\">\n                        <option *ngFor=\"let c of data\" [value]=\"c\"></option>\n                      </select>\n                  </div>";
                    var fixture;
                    tcb.overrideTemplate(MyComp8, t)
                        .createAsync(MyComp8)
                        .then(function (compFixture) { return fixture = compFixture; });
                    testing_1.tick();
                    fixture.debugElement.componentInstance.form =
                        new forms_deprecated_1.ControlGroup({ 'city': new forms_deprecated_1.Control('NYC') });
                    fixture.debugElement.componentInstance.data = ['SF', 'NYC'];
                    fixture.detectChanges();
                    testing_1.tick();
                    var select = fixture.debugElement.query(by_1.By.css('select'));
                    testing_internal_1.expect(select.nativeElement.value).toEqual('NYC');
                })));
                testing_internal_1.it('with option values that are objects', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    var t = "<div>\n                      <select [(ngModel)]=\"selectedCity\">\n                        <option *ngFor=\"let c of list\" [ngValue]=\"c\">{{c['name']}}</option>\n                      </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        var testComp = fixture.debugElement.componentInstance;
                        testComp.list = [{ 'name': 'SF' }, { 'name': 'NYC' }, { 'name': 'Buffalo' }];
                        testComp.selectedCity = testComp.list[1];
                        fixture.detectChanges();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        var nycOption = fixture.debugElement.queryAll(by_1.By.css('option'))[1];
                        testing_internal_1.expect(select.nativeElement.value).toEqual('1: Object');
                        testing_internal_1.expect(nycOption.nativeElement.selected).toBe(true);
                        select.nativeElement.value = '2: Object';
                        browser_util_1.dispatchEvent(select.nativeElement, 'change');
                        fixture.detectChanges();
                        async_1.TimerWrapper.setTimeout(function () {
                            testing_internal_1.expect(testComp.selectedCity['name']).toEqual('Buffalo');
                            async.done();
                        }, 0);
                    });
                }));
                testing_internal_1.it('when new options are added (selection through the model)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    var t = "<div>\n                      <select [(ngModel)]=\"selectedCity\">\n                        <option *ngFor=\"let c of list\" [ngValue]=\"c\">{{c['name']}}</option>\n                      </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        var testComp = fixture.debugElement.componentInstance;
                        testComp.list = [{ 'name': 'SF' }, { 'name': 'NYC' }];
                        testComp.selectedCity = testComp.list[1];
                        fixture.detectChanges();
                        testComp.list.push({ 'name': 'Buffalo' });
                        testComp.selectedCity = testComp.list[2];
                        fixture.detectChanges();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        var buffalo = fixture.debugElement.queryAll(by_1.By.css('option'))[2];
                        testing_internal_1.expect(select.nativeElement.value).toEqual('2: Object');
                        testing_internal_1.expect(buffalo.nativeElement.selected).toBe(true);
                        async.done();
                    });
                }));
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
                testing_internal_1.it('when options are removed', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    var t = "<div>\n                      <select [(ngModel)]=\"selectedCity\">\n                        <option *ngFor=\"let c of list\" [ngValue]=\"c\">{{c}}</option>\n                      </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        var testComp = fixture.debugElement.componentInstance;
                        testComp.list = [{ 'name': 'SF' }, { 'name': 'NYC' }];
                        testComp.selectedCity = testComp.list[1];
                        fixture.detectChanges();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        testing_internal_1.expect(select.nativeElement.value).toEqual('1: Object');
                        testComp.list.pop();
                        fixture.detectChanges();
                        testing_internal_1.expect(select.nativeElement.value).not.toEqual('1: Object');
                        async.done();
                    });
                }));
                testing_internal_1.it('when option values change identity while tracking by index', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    var t = "<div>\n                      <select [(ngModel)]=\"selectedCity\">\n                        <option *ngFor=\"let c of list; trackBy:customTrackBy\" [ngValue]=\"c\">{{c}}</option>\n                      </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        var testComp = fixture.debugElement.componentInstance;
                        testComp.list = [{ 'name': 'SF' }, { 'name': 'NYC' }];
                        testComp.selectedCity = testComp.list[0];
                        fixture.detectChanges();
                        testComp.list[1] = 'Buffalo';
                        testComp.selectedCity = testComp.list[1];
                        fixture.detectChanges();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        var buffalo = fixture.debugElement.queryAll(by_1.By.css('option'))[1];
                        testing_internal_1.expect(select.nativeElement.value).toEqual('1: Buffalo');
                        testing_internal_1.expect(buffalo.nativeElement.selected).toBe(true);
                        async.done();
                    });
                }));
                testing_internal_1.it('with duplicate option values', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    var t = "<div>\n                      <select [(ngModel)]=\"selectedCity\">\n                        <option *ngFor=\"let c of list\" [ngValue]=\"c\">{{c}}</option>\n                      </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        var testComp = fixture.debugElement.componentInstance;
                        testComp.list = [{ 'name': 'NYC' }, { 'name': 'SF' }, { 'name': 'SF' }];
                        testComp.selectedCity = testComp.list[0];
                        fixture.detectChanges();
                        testComp.selectedCity = testComp.list[1];
                        fixture.detectChanges();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        var firstSF = fixture.debugElement.queryAll(by_1.By.css('option'))[1];
                        testing_internal_1.expect(select.nativeElement.value).toEqual('1: Object');
                        testing_internal_1.expect(firstSF.nativeElement.selected).toBe(true);
                        async.done();
                    });
                }));
                testing_internal_1.it('when option values have same content, but different identities', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    var t = "<div>\n                      <select [(ngModel)]=\"selectedCity\">\n                        <option *ngFor=\"let c of list\" [ngValue]=\"c\">{{c['name']}}</option>\n                      </select>\n                  </div>";
                    tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                        var testComp = fixture.debugElement.componentInstance;
                        testComp.list = [{ 'name': 'SF' }, { 'name': 'NYC' }, { 'name': 'NYC' }];
                        testComp.selectedCity = testComp.list[0];
                        fixture.detectChanges();
                        testComp.selectedCity = testComp.list[2];
                        fixture.detectChanges();
                        var select = fixture.debugElement.query(by_1.By.css('select'));
                        var secondNYC = fixture.debugElement.queryAll(by_1.By.css('option'))[2];
                        testing_internal_1.expect(select.nativeElement.value).toEqual('2: Object');
                        testing_internal_1.expect(secondNYC.nativeElement.selected).toBe(true);
                        async.done();
                    });
                }));
            });
            testing_internal_1.it('should support custom value accessors', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var t = "<div [ngFormModel]=\"form\">\n                  <input type=\"text\" ngControl=\"name\" wrapped-value>\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_deprecated_1.ControlGroup({ 'name': new forms_deprecated_1.Control('aa') });
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
                var t = "<div [ngFormModel]=\"form\">\n                  <my-input ngControl=\"name\"></my-input>\n                </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form =
                        new forms_deprecated_1.ControlGroup({ 'name': new forms_deprecated_1.Control('aa') });
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
                var form = new forms_deprecated_1.ControlGroup({ 'login': new forms_deprecated_1.Control(''), 'min': new forms_deprecated_1.Control(''), 'max': new forms_deprecated_1.Control('') });
                var t = "<div [ngFormModel]=\"form\" login-is-empty-validator>\n                    <input type=\"text\" ngControl=\"login\" required>\n                    <input type=\"text\" ngControl=\"min\" minlength=\"3\">\n                    <input type=\"text\" ngControl=\"max\" maxlength=\"3\">\n                 </div>";
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
                var form = new forms_deprecated_1.ControlGroup({ 'login': new forms_deprecated_1.Control('') });
                var t = "<div [ngFormModel]=\"form\">\n                    <input type=\"text\" ngControl=\"login\" uniq-login-validator=\"expected\">\n                 </div>";
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
                var form = new forms_deprecated_1.ControlGroup({ 'login': new forms_deprecated_1.Control('aa', forms_deprecated_1.Validators.required) });
                var t = "<div [ngFormModel]=\"form\">\n                  <input type=\"text\" ngControl=\"login\">\n                 </div>";
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
                var control = new forms_deprecated_1.Control('', forms_deprecated_1.Validators.required, uniqLoginAsyncValidator('expected'));
                var form = new forms_deprecated_1.ControlGroup({ 'login': control });
                var t = "<div [ngFormModel]=\"form\">\n                  <input type=\"text\" ngControl=\"login\">\n                 </div>";
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
                var form = new forms_deprecated_1.ControlGroup({ 'nested': new forms_deprecated_1.ControlGroup({ 'login': new forms_deprecated_1.Control('value') }) });
                var t = "<div [ngFormModel]=\"form\">\n                  <div ngControlGroup=\"nested\">\n                    <input type=\"text\" ngControl=\"login\">\n                  </div>\n              </div>";
                tcb.overrideTemplate(MyComp8, t).createAsync(MyComp8).then(function (fixture) {
                    fixture.debugElement.componentInstance.form = form;
                    fixture.detectChanges();
                    var input = fixture.debugElement.query(by_1.By.css('input'));
                    testing_internal_1.expect(input.nativeElement.value).toEqual('value');
                    async.done();
                });
            }));
            testing_internal_1.it('should update the control group values on DOM change', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var form = new forms_deprecated_1.ControlGroup({ 'nested': new forms_deprecated_1.ControlGroup({ 'login': new forms_deprecated_1.Control('value') }) });
                var t = "<div [ngFormModel]=\"form\">\n                    <div ngControlGroup=\"nested\">\n                      <input type=\"text\" ngControl=\"login\">\n                    </div>\n                </div>";
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
            var form = new forms_deprecated_1.ControlGroup({ 'name': new forms_deprecated_1.Control('') });
            var t = "<div [ngFormModel]=\"form\"><input type=\"text\" ngControl=\"name\" [(ngModel)]=\"name\"></div>";
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
            var form = new forms_deprecated_1.Control('');
            var t = "<div><input type=\"text\" [ngFormControl]=\"form\" [(ngModel)]=\"name\"></div>";
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
                var t = "<form>\n                     <div ngControlGroup=\"user\">\n                      <input type=\"text\" ngControl=\"login\">\n                     </div>\n               </form>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.name = null;
                fixture.detectChanges();
                var form = fixture.debugElement.children[0].injector.get(forms_deprecated_1.NgForm);
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
                var t = "<form>\n                    <div *ngIf=\"name == 'show'\">\n                      <input type=\"text\" ngControl=\"login\">\n                    </div>\n                  </form>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.name = 'show';
                fixture.detectChanges();
                testing_1.tick();
                var form = fixture.debugElement.children[0].injector.get(forms_deprecated_1.NgForm);
                testing_internal_1.expect(form.controls['login']).toBeDefined();
                fixture.debugElement.componentInstance.name = 'hide';
                fixture.detectChanges();
                testing_1.tick();
                testing_internal_1.expect(form.controls['login']).not.toBeDefined();
            })));
            testing_internal_1.it('should remove control groups', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "<form>\n                     <div *ngIf=\"name=='show'\" ngControlGroup=\"user\">\n                      <input type=\"text\" ngControl=\"login\">\n                     </div>\n               </form>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.name = 'show';
                fixture.detectChanges();
                testing_1.tick();
                var form = fixture.debugElement.children[0].injector.get(forms_deprecated_1.NgForm);
                testing_internal_1.expect(form.controls['user']).toBeDefined();
                fixture.debugElement.componentInstance.name = 'hide';
                fixture.detectChanges();
                testing_1.tick();
                testing_internal_1.expect(form.controls['user']).not.toBeDefined();
            })));
            testing_internal_1.it('should support ngModel for complex forms', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "<form>\n                      <input type=\"text\" ngControl=\"name\" [(ngModel)]=\"name\">\n               </form>";
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
                testing_internal_1.expect(input.value).toEqual('oldValue');
                input.value = 'updatedValue';
                browser_util_1.dispatchEvent(input, 'input');
                testing_1.tick();
                testing_internal_1.expect(fixture.debugElement.componentInstance.name).toEqual('updatedValue');
            })));
            testing_internal_1.it('should support <type=radio>', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var t = "<form>\n                  <input type=\"radio\" name=\"food\" ngControl=\"chicken\" [(ngModel)]=\"data['chicken']\">\n                  <input type=\"radio\" name=\"food\" ngControl=\"fish\" [(ngModel)]=\"data['fish']\">\n                  <input type=\"radio\" name=\"food\" ngControl=\"beef\" [(ngModel)]=\"data['beef']\">\n                  <input type=\"radio\" name=\"food\" ngControl=\"pork\" [(ngModel)]=\"data['pork']\">\n                </form>";
                var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
                testing_1.tick();
                fixture.debugElement.componentInstance.data = {
                    'chicken': new forms_deprecated_1.RadioButtonState(false, 'chicken'),
                    'fish': new forms_deprecated_1.RadioButtonState(true, 'fish'),
                    'beef': new forms_deprecated_1.RadioButtonState(false, 'beef'),
                    'pork': new forms_deprecated_1.RadioButtonState(true, 'pork')
                };
                fixture.detectChanges();
                testing_1.tick();
                var input = fixture.debugElement.query(by_1.By.css('input'));
                testing_internal_1.expect(input.nativeElement.checked).toEqual(false);
                browser_util_1.dispatchEvent(input.nativeElement, 'change');
                testing_1.tick();
                var data = fixture.debugElement.componentInstance.data;
                testing_internal_1.expect(data['chicken']).toEqual(new forms_deprecated_1.RadioButtonState(true, 'chicken'));
                testing_internal_1.expect(data['fish']).toEqual(new forms_deprecated_1.RadioButtonState(false, 'fish'));
                testing_internal_1.expect(data['beef']).toEqual(new forms_deprecated_1.RadioButtonState(false, 'beef'));
                testing_internal_1.expect(data['pork']).toEqual(new forms_deprecated_1.RadioButtonState(false, 'pork'));
            })));
        });
        testing_internal_1.it('should support multiple named <type=radio> groups', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            var t = "<form>\n                  <input type=\"radio\" name=\"food\" ngControl=\"chicken\" [(ngModel)]=\"data['chicken']\">\n                  <input type=\"radio\" name=\"food\" ngControl=\"fish\" [(ngModel)]=\"data['fish']\">\n                  <input type=\"radio\" name=\"drink\" ngControl=\"cola\" [(ngModel)]=\"data['cola']\">\n                  <input type=\"radio\" name=\"drink\" ngControl=\"sprite\" [(ngModel)]=\"data['sprite']\">\n                </form>";
            var fixture = tcb.overrideTemplate(MyComp8, t).createFakeAsync(MyComp8);
            testing_1.tick();
            fixture.debugElement.componentInstance.data = {
                'chicken': new forms_deprecated_1.RadioButtonState(false, 'chicken'),
                'fish': new forms_deprecated_1.RadioButtonState(true, 'fish'),
                'cola': new forms_deprecated_1.RadioButtonState(false, 'cola'),
                'sprite': new forms_deprecated_1.RadioButtonState(true, 'sprite')
            };
            fixture.detectChanges();
            testing_1.tick();
            var input = fixture.debugElement.query(by_1.By.css('input'));
            testing_internal_1.expect(input.nativeElement.checked).toEqual(false);
            browser_util_1.dispatchEvent(input.nativeElement, 'change');
            testing_1.tick();
            var data = fixture.debugElement.componentInstance.data;
            testing_internal_1.expect(data['chicken']).toEqual(new forms_deprecated_1.RadioButtonState(true, 'chicken'));
            testing_internal_1.expect(data['fish']).toEqual(new forms_deprecated_1.RadioButtonState(false, 'fish'));
            testing_internal_1.expect(data['cola']).toEqual(new forms_deprecated_1.RadioButtonState(false, 'cola'));
            testing_internal_1.expect(data['sprite']).toEqual(new forms_deprecated_1.RadioButtonState(true, 'sprite'));
        })));
        testing_internal_1.describe('setting status classes', function () {
            testing_internal_1.it('should work with single fields', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var form = new forms_deprecated_1.Control('', forms_deprecated_1.Validators.required);
                var t = "<div><input type=\"text\" [ngFormControl]=\"form\"></div>";
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
                var form = new forms_deprecated_1.ControlGroup({ 'name': new forms_deprecated_1.Control('', forms_deprecated_1.Validators.required) });
                var t = "<form [ngFormModel]=\"form\"><input type=\"text\" ngControl=\"name\"></form>";
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
                var form = new forms_deprecated_1.Control('');
                var t = "<div><input type=\"text\" [ngFormControl]=\"form\" [(ngModel)]=\"name\"></div>";
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
                testing_1.tick();
                fixture.detectChanges();
                testing_internal_1.expect(fixture.debugElement.componentInstance.name).toEqual('aa');
                // Programatically update the input value to be "bb".
                fixture.debugElement.componentInstance.name = 'bb';
                testing_1.tick();
                fixture.detectChanges();
                testing_internal_1.expect(input.value).toEqual('bb');
                // Programatically set it back to "aa".
                fixture.debugElement.componentInstance.name = 'aa';
                testing_1.tick();
                fixture.detectChanges();
                testing_internal_1.expect(input.value).toEqual('aa');
            })));
            testing_internal_1.it('should not crash when validity is checked from a binding', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                // {{x.valid}} used to crash because valid() tried to read a property
                // from form.control before it was set. This test verifies this bug is
                // fixed.
                var t = "<form><div ngControlGroup=\"x\" #x=\"ngForm\">\n                  <input type=\"text\" ngControl=\"test\"></div>{{x.valid}}</form>";
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
        { type: forms_deprecated_1.NgControl, },
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
        { type: forms_deprecated_1.NgControl, },
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
                            provide: forms_deprecated_1.NG_VALIDATORS,
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
                            provide: forms_deprecated_1.NG_ASYNC_VALIDATORS,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdyYXRpb25fc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3Rlc3QvZm9ybXMtZGVwcmVjYXRlZC9pbnRlZ3JhdGlvbl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx1QkFBMEIsaUJBQWlCLENBQUMsQ0FBQTtBQUM1QyxpQ0FBaUwsc0NBQXNDLENBQUMsQ0FBQTtBQUN4TixxQkFBc0YsZUFBZSxDQUFDLENBQUE7QUFDdEcsd0JBQXdHLHVCQUF1QixDQUFDLENBQUE7QUFDaEksaUNBQTJHLHdDQUF3QyxDQUFDLENBQUE7QUFDcEosbUJBQWlCLDRDQUE0QyxDQUFDLENBQUE7QUFDOUQsNEJBQXFCLCtDQUErQyxDQUFDLENBQUE7QUFDckUsNkJBQTRCLGdEQUFnRCxDQUFDLENBQUE7QUFFN0Usc0JBQThDLHdCQUF3QixDQUFDLENBQUE7QUFDdkUsMkJBQTBCLDZCQUE2QixDQUFDLENBQUE7QUFDeEQsd0JBQTZCLDBCQUEwQixDQUFDLENBQUE7QUFFeEQ7SUFDRSwyQkFBUSxDQUFDLG1CQUFtQixFQUFFO1FBRTVCLDZCQUFVLENBQUMsY0FBTSxPQUFBLHlCQUFlLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyx3Q0FBcUIsQ0FBQyxFQUFDLENBQUMsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO1FBRXRFLHFCQUFFLENBQUMsMkRBQTJELEVBQzNELHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsSUFBSSxDQUFDLEdBQUcsZ0hBRUMsQ0FBQztZQUVWLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ2pFLE9BQU8sQ0FB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