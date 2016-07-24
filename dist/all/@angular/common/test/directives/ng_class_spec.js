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
var collection_1 = require('../../src/facade/collection');
function detectChangesAndCheck(fixture, classes) {
    fixture.detectChanges();
    testing_internal_1.expect(fixture.debugElement.children[0].nativeElement.className).toEqual(classes);
}
function main() {
    testing_internal_1.describe('binding to CSS class list', function () {
        testing_internal_1.it('should clean up when the directive is destroyed', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div *ngFor="let item of items" [ngClass]="item"></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.items = [['0']];
                fixture.detectChanges();
                fixture.debugElement.componentInstance.items = [['1']];
                detectChangesAndCheck(fixture, '1');
                async.done();
            });
        }));
        testing_internal_1.describe('expressions evaluating to objects', function () {
            testing_internal_1.it('should add classes specified in an object literal', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ngClass]="{foo: true, bar: false}"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'foo');
                    async.done();
                });
            }));
            testing_internal_1.it('should add classes specified in an object literal without change in class names', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ngClass]=\"{'foo-bar': true, 'fooBar': true}\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'foo-bar fooBar');
                    async.done();
                });
            }));
            testing_internal_1.it('should add and remove classes based on changes in object literal values', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ngClass]="{foo: condition, bar: !condition}"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'foo');
                    fixture.debugElement.componentInstance.condition = false;
                    detectChangesAndCheck(fixture, 'bar');
                    async.done();
                });
            }));
            testing_internal_1.it('should add and remove classes based on changes to the expression object', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ngClass]="objExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'foo');
                    collection_1.StringMapWrapper.set(fixture.debugElement.componentInstance.objExpr, 'bar', true);
                    detectChangesAndCheck(fixture, 'foo bar');
                    collection_1.StringMapWrapper.set(fixture.debugElement.componentInstance.objExpr, 'baz', true);
                    detectChangesAndCheck(fixture, 'foo bar baz');
                    collection_1.StringMapWrapper.delete(fixture.debugElement.componentInstance.objExpr, 'bar');
                    detectChangesAndCheck(fixture, 'foo baz');
                    async.done();
                });
            }));
            testing_internal_1.it('should add and remove classes based on reference changes to the expression object', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ngClass]="objExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'foo');
                    fixture.debugElement.componentInstance.objExpr = { foo: true, bar: true };
                    detectChangesAndCheck(fixture, 'foo bar');
                    fixture.debugElement.componentInstance.objExpr = { baz: true };
                    detectChangesAndCheck(fixture, 'baz');
                    async.done();
                });
            }));
            testing_internal_1.it('should remove active classes when expression evaluates to null', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ngClass]="objExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'foo');
                    fixture.debugElement.componentInstance.objExpr = null;
                    detectChangesAndCheck(fixture, '');
                    fixture.debugElement.componentInstance.objExpr = { 'foo': false, 'bar': true };
                    detectChangesAndCheck(fixture, 'bar');
                    async.done();
                });
            }));
            testing_internal_1.it('should allow multiple classes per expression', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ngClass]="objExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.objExpr = {
                        'bar baz': true,
                        'bar1 baz1': true
                    };
                    detectChangesAndCheck(fixture, 'bar baz bar1 baz1');
                    fixture.debugElement.componentInstance.objExpr = {
                        'bar baz': false,
                        'bar1 baz1': true
                    };
                    detectChangesAndCheck(fixture, 'bar1 baz1');
                    async.done();
                });
            }));
            testing_internal_1.it('should split by one or more spaces between classes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ngClass]="objExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.objExpr = { 'foo bar     baz': true };
                    detectChangesAndCheck(fixture, 'foo bar baz');
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('expressions evaluating to lists', function () {
            testing_internal_1.it('should add classes specified in a list literal', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ngClass]=\"['foo', 'bar', 'foo-bar', 'fooBar']\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'foo bar foo-bar fooBar');
                    async.done();
                });
            }));
            testing_internal_1.it('should add and remove classes based on changes to the expression', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ngClass]="arrExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    var arrExpr = fixture.debugElement.componentInstance.arrExpr;
                    detectChangesAndCheck(fixture, 'foo');
                    arrExpr.push('bar');
                    detectChangesAndCheck(fixture, 'foo bar');
                    arrExpr[1] = 'baz';
                    detectChangesAndCheck(fixture, 'foo baz');
                    collection_1.ListWrapper.remove(fixture.debugElement.componentInstance.arrExpr, 'baz');
                    detectChangesAndCheck(fixture, 'foo');
                    async.done();
                });
            }));
            testing_internal_1.it('should add and remove classes when a reference changes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ngClass]="arrExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'foo');
                    fixture.debugElement.componentInstance.arrExpr = ['bar'];
                    detectChangesAndCheck(fixture, 'bar');
                    async.done();
                });
            }));
            testing_internal_1.it('should take initial classes into account when a reference changes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div class="foo" [ngClass]="arrExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'foo');
                    fixture.debugElement.componentInstance.arrExpr = ['bar'];
                    detectChangesAndCheck(fixture, 'foo bar');
                    async.done();
                });
            }));
            testing_internal_1.it('should ignore empty or blank class names', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div class="foo" [ngClass]="arrExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.arrExpr = ['', '  '];
                    detectChangesAndCheck(fixture, 'foo');
                    async.done();
                });
            }));
            testing_internal_1.it('should trim blanks from class names', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div class="foo" [ngClass]="arrExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.arrExpr = [' bar  '];
                    detectChangesAndCheck(fixture, 'foo bar');
                    async.done();
                });
            }));
            testing_internal_1.it('should allow multiple classes per item in arrays', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ngClass]="arrExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.arrExpr =
                        ['foo bar baz', 'foo1 bar1   baz1'];
                    detectChangesAndCheck(fixture, 'foo bar baz foo1 bar1 baz1');
                    fixture.debugElement.componentInstance.arrExpr = ['foo bar   baz foobar'];
                    detectChangesAndCheck(fixture, 'foo bar baz foobar');
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('expressions evaluating to sets', function () {
            testing_internal_1.it('should add and remove classes if the set instance changed', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ngClass]="setExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    var setExpr = new Set();
                    setExpr.add('bar');
                    fixture.debugElement.componentInstance.setExpr = setExpr;
                    detectChangesAndCheck(fixture, 'bar');
                    setExpr = new Set();
                    setExpr.add('baz');
                    fixture.debugElement.componentInstance.setExpr = setExpr;
                    detectChangesAndCheck(fixture, 'baz');
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('expressions evaluating to string', function () {
            testing_internal_1.it('should add classes specified in a string literal', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ngClass]=\"'foo bar foo-bar fooBar'\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'foo bar foo-bar fooBar');
                    async.done();
                });
            }));
            testing_internal_1.it('should add and remove classes based on changes to the expression', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ngClass]="strExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'foo');
                    fixture.debugElement.componentInstance.strExpr = 'foo bar';
                    detectChangesAndCheck(fixture, 'foo bar');
                    fixture.debugElement.componentInstance.strExpr = 'baz';
                    detectChangesAndCheck(fixture, 'baz');
                    async.done();
                });
            }));
            testing_internal_1.it('should remove active classes when switching from string to null', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ngClass]=\"strExpr\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'foo');
                    fixture.debugElement.componentInstance.strExpr = null;
                    detectChangesAndCheck(fixture, '');
                    async.done();
                });
            }));
            testing_internal_1.it('should take initial classes into account when switching from string to null', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div class=\"foo\" [ngClass]=\"strExpr\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'foo');
                    fixture.debugElement.componentInstance.strExpr = null;
                    detectChangesAndCheck(fixture, 'foo');
                    async.done();
                });
            }));
            testing_internal_1.it('should ignore empty and blank strings', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div class=\"foo\" [ngClass]=\"strExpr\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.strExpr = '';
                    detectChangesAndCheck(fixture, 'foo');
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('cooperation with other class-changing constructs', function () {
            testing_internal_1.it('should co-operate with the class attribute', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div [ngClass]="objExpr" class="init foo"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    collection_1.StringMapWrapper.set(fixture.debugElement.componentInstance.objExpr, 'bar', true);
                    detectChangesAndCheck(fixture, 'init foo bar');
                    collection_1.StringMapWrapper.set(fixture.debugElement.componentInstance.objExpr, 'foo', false);
                    detectChangesAndCheck(fixture, 'init bar');
                    fixture.debugElement.componentInstance.objExpr = null;
                    detectChangesAndCheck(fixture, 'init foo');
                    async.done();
                });
            }));
            testing_internal_1.it('should co-operate with the interpolated class attribute', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ngClass]=\"objExpr\" class=\"{{'init foo'}}\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    collection_1.StringMapWrapper.set(fixture.debugElement.componentInstance.objExpr, 'bar', true);
                    detectChangesAndCheck(fixture, "init foo bar");
                    collection_1.StringMapWrapper.set(fixture.debugElement.componentInstance.objExpr, 'foo', false);
                    detectChangesAndCheck(fixture, "init bar");
                    fixture.debugElement.componentInstance.objExpr = null;
                    detectChangesAndCheck(fixture, "init foo");
                    async.done();
                });
            }));
            testing_internal_1.it('should co-operate with the class attribute and binding to it', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = "<div [ngClass]=\"objExpr\" class=\"init\" [class]=\"'foo'\"></div>";
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    collection_1.StringMapWrapper.set(fixture.debugElement.componentInstance.objExpr, 'bar', true);
                    detectChangesAndCheck(fixture, "init foo bar");
                    collection_1.StringMapWrapper.set(fixture.debugElement.componentInstance.objExpr, 'foo', false);
                    detectChangesAndCheck(fixture, "init bar");
                    fixture.debugElement.componentInstance.objExpr = null;
                    detectChangesAndCheck(fixture, "init foo");
                    async.done();
                });
            }));
            testing_internal_1.it('should co-operate with the class attribute and class.name binding', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div class="init foo" [ngClass]="objExpr" [class.baz]="condition"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'init foo baz');
                    collection_1.StringMapWrapper.set(fixture.debugElement.componentInstance.objExpr, 'bar', true);
                    detectChangesAndCheck(fixture, 'init foo baz bar');
                    collection_1.StringMapWrapper.set(fixture.debugElement.componentInstance.objExpr, 'foo', false);
                    detectChangesAndCheck(fixture, 'init baz bar');
                    fixture.debugElement.componentInstance.condition = false;
                    detectChangesAndCheck(fixture, 'init bar');
                    async.done();
                });
            }));
            testing_internal_1.it('should co-operate with initial class and class attribute binding when binding changes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div class="init" [ngClass]="objExpr" [class]="strExpr"></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    detectChangesAndCheck(fixture, 'init foo');
                    collection_1.StringMapWrapper.set(fixture.debugElement.componentInstance.objExpr, 'bar', true);
                    detectChangesAndCheck(fixture, 'init foo bar');
                    fixture.debugElement.componentInstance.strExpr = 'baz';
                    detectChangesAndCheck(fixture, 'init bar baz foo');
                    fixture.debugElement.componentInstance.objExpr = null;
                    detectChangesAndCheck(fixture, 'init baz');
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
        this.condition = true;
        this.arrExpr = ['foo'];
        this.setExpr = new Set();
        this.objExpr = { 'foo': true, 'bar': false };
        this.strExpr = 'foo';
        this.setExpr.add('foo');
    }
    /** @nocollapse */
    TestComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'test-cmp', directives: [common_1.NgClass, common_1.NgFor], template: '' },] },
    ];
    /** @nocollapse */
    TestComponent.ctorParameters = [];
    return TestComponent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfY2xhc3Nfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3Rlc3QvZGlyZWN0aXZlcy9uZ19jbGFzc19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx1QkFBNkIsaUJBQWlCLENBQUMsQ0FBQTtBQUMvQyxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsd0JBQXFELHVCQUF1QixDQUFDLENBQUE7QUFDN0UsaUNBQWdJLHdDQUF3QyxDQUFDLENBQUE7QUFDekssMkJBQTRDLDZCQUE2QixDQUFDLENBQUE7QUFFMUUsK0JBQStCLE9BQThCLEVBQUUsT0FBZTtJQUM1RSxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7SUFDeEIseUJBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BGLENBQUM7QUFFRDtJQUNFLDJCQUFRLENBQUMsMkJBQTJCLEVBQUU7UUFFcEMscUJBQUUsQ0FBQyxpREFBaUQsRUFDakQseUJBQU0sQ0FDRixDQUFDLDhCQUFvQixFQUFFLHFDQUFrQixDQUFDLEVBQzFDLFVBQUMsR0FBeUIsRUFBRSxLQUF5QjtZQUNuRCxJQUFJLFFBQVEsR0FBRyx5REFBeUQsQ0FBQztZQUN6RSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQztpQkFDeEMsV0FBVyxDQUFDLGFBQWEsQ0FBQztpQkFDMUIsSUFBSSxDQUFDLFVBQUMsT0FBd0M7Z0JBQzdDLE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3hCLE9B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