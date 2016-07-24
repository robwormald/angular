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
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var lang_1 = require('../../src/facade/lang');
function main() {
    testing_internal_1.describe('ngIf directive', function () {
        testing_internal_1.it('should work in a template attribute', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var html = '<div><copy-me template="ngIf booleanCondition">hello</copy-me></div>';
            tcb.overrideTemplate(TestComponent, html)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM()
                    .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                    .length)
                    .toEqual(1);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello');
                async.done();
            });
        }));
        testing_internal_1.it('should work in a template element', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var html = '<div><template [ngIf]="booleanCondition"><copy-me>hello2</copy-me></template></div>';
            tcb.overrideTemplate(TestComponent, html)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM()
                    .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                    .length)
                    .toEqual(1);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello2');
                async.done();
            });
        }));
        testing_internal_1.it('should toggle node when condition changes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var html = '<div><copy-me template="ngIf booleanCondition">hello</copy-me></div>';
            tcb.overrideTemplate(TestComponent, html)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.booleanCondition = false;
                fixture.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM()
                    .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                    .length)
                    .toEqual(0);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
                fixture.debugElement.componentInstance.booleanCondition = true;
                fixture.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM()
                    .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                    .length)
                    .toEqual(1);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello');
                fixture.debugElement.componentInstance.booleanCondition = false;
                fixture.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM()
                    .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                    .length)
                    .toEqual(0);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
                async.done();
            });
        }));
        testing_internal_1.it('should handle nested if correctly', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var html = '<div><template [ngIf]="booleanCondition"><copy-me *ngIf="nestedBooleanCondition">hello</copy-me></template></div>';
            tcb.overrideTemplate(TestComponent, html)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.booleanCondition = false;
                fixture.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM()
                    .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                    .length)
                    .toEqual(0);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
                fixture.debugElement.componentInstance.booleanCondition = true;
                fixture.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM()
                    .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                    .length)
                    .toEqual(1);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello');
                fixture.debugElement.componentInstance.nestedBooleanCondition = false;
                fixture.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM()
                    .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                    .length)
                    .toEqual(0);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
                fixture.debugElement.componentInstance.nestedBooleanCondition = true;
                fixture.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM()
                    .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                    .length)
                    .toEqual(1);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello');
                fixture.debugElement.componentInstance.booleanCondition = false;
                fixture.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM()
                    .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                    .length)
                    .toEqual(0);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
                async.done();
            });
        }));
        testing_internal_1.it('should update several nodes with if', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var html = '<div>' +
                '<copy-me template="ngIf numberCondition + 1 >= 2">helloNumber</copy-me>' +
                '<copy-me template="ngIf stringCondition == \'foo\'">helloString</copy-me>' +
                '<copy-me template="ngIf functionCondition(stringCondition, numberCondition)">helloFunction</copy-me>' +
                '</div>';
            tcb.overrideTemplate(TestComponent, html)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM()
                    .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                    .length)
                    .toEqual(3);
                matchers_1.expect(dom_adapter_1.getDOM().getText(fixture.debugElement.nativeElement))
                    .toEqual('helloNumberhelloStringhelloFunction');
                fixture.debugElement.componentInstance.numberCondition = 0;
                fixture.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM()
                    .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                    .length)
                    .toEqual(1);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('helloString');
                fixture.debugElement.componentInstance.numberCondition = 1;
                fixture.debugElement.componentInstance.stringCondition = 'bar';
                fixture.detectChanges();
                matchers_1.expect(dom_adapter_1.getDOM()
                    .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                    .length)
                    .toEqual(1);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('helloNumber');
                async.done();
            });
        }));
        if (!lang_1.IS_DART) {
            testing_internal_1.it('should not add the element twice if the condition goes from true to true (JS)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var html = '<div><copy-me template="ngIf numberCondition">hello</copy-me></div>';
                tcb.overrideTemplate(TestComponent, html)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM()
                        .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                        .length)
                        .toEqual(1);
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello');
                    fixture.debugElement.componentInstance.numberCondition = 2;
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM()
                        .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                        .length)
                        .toEqual(1);
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello');
                    async.done();
                });
            }));
            testing_internal_1.it('should not recreate the element if the condition goes from true to true (JS)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var html = '<div><copy-me template="ngIf numberCondition">hello</copy-me></div>';
                tcb.overrideTemplate(TestComponent, html)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    dom_adapter_1.getDOM().addClass(dom_adapter_1.getDOM().querySelector(fixture.debugElement.nativeElement, 'copy-me'), 'foo');
                    fixture.debugElement.componentInstance.numberCondition = 2;
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM().hasClass(dom_adapter_1.getDOM().querySelector(fixture.debugElement.nativeElement, 'copy-me'), 'foo'))
                        .toBe(true);
                    async.done();
                });
            }));
        }
        if (lang_1.IS_DART) {
            testing_internal_1.it('should not create the element if the condition is not a boolean (DART)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var html = '<div><copy-me template="ngIf numberCondition">hello</copy-me></div>';
                tcb.overrideTemplate(TestComponent, html)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    matchers_1.expect(function () { return fixture.detectChanges(); }).toThrowError();
                    matchers_1.expect(dom_adapter_1.getDOM()
                        .querySelectorAll(fixture.debugElement.nativeElement, 'copy-me')
                        .length)
                        .toEqual(0);
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
                    async.done();
                });
            }));
        }
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
        this.booleanCondition = true;
        this.nestedBooleanCondition = true;
        this.numberCondition = 1;
        this.stringCondition = 'foo';
        this.functionCondition = function (s, n) { return s == 'foo' && n == 1; };
    }
    /** @nocollapse */
    TestComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'test-cmp', directives: [common_1.NgIf], template: '' },] },
    ];
    /** @nocollapse */
    TestComponent.ctorParameters = [];
    return TestComponent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfaWZfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3Rlc3QvZGlyZWN0aXZlcy9uZ19pZl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBeUYsd0NBQXdDLENBQUMsQ0FBQTtBQUNsSSx3QkFBbUMsdUJBQXVCLENBQUMsQ0FBQTtBQUMzRCx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUNsRSw0QkFBcUIsK0NBQStDLENBQUMsQ0FBQTtBQUVyRSxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsdUJBQW1CLGlCQUFpQixDQUFDLENBQUE7QUFFckMscUJBQXNCLHVCQUF1QixDQUFDLENBQUE7QUFFOUM7SUFDRSwyQkFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQ3pCLHFCQUFFLENBQUMscUNBQXFDLEVBQ3JDLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsSUFBSSxJQUFJLEdBQUcsc0VBQXNFLENBQUM7WUFFbEYsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUM7aUJBQ3BDLFdBQVcsQ0FBQyxhQUFhLENBQUM7aUJBQzFCLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ1osT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QixpQkFBTSxDQUFDLG9CQUFNLEVBQUU7cUJBQ0gsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDO3FCQUMvRCxNQUFNLENBQUM7cUJBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixpQkFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMv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