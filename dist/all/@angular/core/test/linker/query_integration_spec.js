/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var testing_1 = require('@angular/core/testing');
var lang_1 = require('../../src/facade/lang');
var async_1 = require('../../src/facade/async');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
function main() {
    testing_internal_1.describe('Query API', function () {
        testing_internal_1.describe('querying by directive type', function () {
            testing_internal_1.it('should contain all direct child directives in the light dom (constructor)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div text="1"></div>' +
                    '<needs-query text="2"><div text="3">' +
                    '<div text="too-deep"></div>' +
                    '</div></needs-query>' +
                    '<div text="4"></div>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    matchers_1.expect(core_1.asNativeElements(view.debugElement.children)).toHaveText('2|3|');
                    async.done();
                });
            }));
            testing_internal_1.it('should contain all direct child directives in the content dom', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-content-children #q><div text="foo"></div></needs-content-children>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    var q = view.debugElement.children[0].references['q'];
                    view.detectChanges();
                    matchers_1.expect(q.textDirChildren.length).toEqual(1);
                    matchers_1.expect(q.numberOfChildrenAfterContentInit).toEqual(1);
                    async.done();
                });
            }));
            testing_internal_1.it('should contain the first content child', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-content-child #q><div *ngIf="shouldShow" text="foo"></div></needs-content-child>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.debugElement.componentInstance.shouldShow = true;
                    view.detectChanges();
                    var q = view.debugElement.children[0].references['q'];
                    matchers_1.expect(q.logs).toEqual([['setter', 'foo'], ['init', 'foo'], ['check', 'foo']]);
                    view.debugElement.componentInstance.shouldShow = false;
                    view.detectChanges();
                    matchers_1.expect(q.logs).toEqual([
                        ['setter', 'foo'], ['init', 'foo'], ['check', 'foo'], ['setter', null],
                        ['check', null]
                    ]);
                    async.done();
                });
            }));
            testing_internal_1.it('should contain the first view child', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-child #q></needs-view-child>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    var q = view.debugElement.children[0].references['q'];
                    matchers_1.expect(q.logs).toEqual([['setter', 'foo'], ['init', 'foo'], ['check', 'foo']]);
                    q.shouldShow = false;
                    view.detectChanges();
                    matchers_1.expect(q.logs).toEqual([
                        ['setter', 'foo'], ['init', 'foo'], ['check', 'foo'], ['setter', null],
                        ['check', null]
                    ]);
                    async.done();
                });
            }));
            testing_internal_1.it('should set static view and content children already after the constructor call', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-static-content-view-child #q><div text="contentFoo"></div></needs-static-content-view-child>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q = view.debugElement.children[0].references['q'];
                    matchers_1.expect(q.contentChild.text).toBeFalsy();
                    matchers_1.expect(q.viewChild.text).toBeFalsy();
                    view.detectChanges();
                    matchers_1.expect(q.contentChild.text).toEqual('contentFoo');
                    matchers_1.expect(q.viewChild.text).toEqual('viewFoo');
                    async.done();
                });
            }));
            testing_internal_1.it('should contain the first view child accross embedded views', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-child #q></needs-view-child>';
                tcb.overrideTemplate(MyComp0, template)
                    .overrideTemplate(NeedsViewChild, '<div *ngIf="true"><div *ngIf="shouldShow" text="foo"></div></div><div *ngIf="shouldShow2" text="bar"></div>')
                    .createAsync(MyComp0)
                    .then(function (view) {
                    view.detectChanges();
                    var q = view.debugElement.children[0].references['q'];
                    matchers_1.expect(q.logs).toEqual([['setter', 'foo'], ['init', 'foo'], ['check', 'foo']]);
                    q.shouldShow = false;
                    q.shouldShow2 = true;
                    q.logs = [];
                    view.detectChanges();
                    matchers_1.expect(q.logs).toEqual([['setter', 'bar'], ['check', 'bar']]);
                    q.shouldShow = false;
                    q.shouldShow2 = false;
                    q.logs = [];
                    view.detectChanges();
                    matchers_1.expect(q.logs).toEqual([['setter', null], ['check', null]]);
                    async.done();
                });
            }));
            testing_internal_1.it('should contain all directives in the light dom when descendants flag is used', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div text="1"></div>' +
                    '<needs-query-desc text="2"><div text="3">' +
                    '<div text="4"></div>' +
                    '</div></needs-query-desc>' +
                    '<div text="5"></div>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    matchers_1.expect(core_1.asNativeElements(view.debugElement.children)).toHaveText('2|3|4|');
                    async.done();
                });
            }));
            testing_internal_1.it('should contain all directives in the light dom', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div text="1"></div>' +
                    '<needs-query text="2"><div text="3"></div></needs-query>' +
                    '<div text="4"></div>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    matchers_1.expect(core_1.asNativeElements(view.debugElement.children)).toHaveText('2|3|');
                    async.done();
                });
            }));
            testing_internal_1.it('should reflect dynamically inserted directives', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div text="1"></div>' +
                    '<needs-query text="2"><div *ngIf="shouldShow" [text]="\'3\'"></div></needs-query>' +
                    '<div text="4"></div>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    matchers_1.expect(core_1.asNativeElements(view.debugElement.children)).toHaveText('2|');
                    view.debugElement.componentInstance.shouldShow = true;
                    view.detectChanges();
                    matchers_1.expect(core_1.asNativeElements(view.debugElement.children)).toHaveText('2|3|');
                    async.done();
                });
            }));
            testing_internal_1.it('should be cleanly destroyed when a query crosses view boundaries', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div text="1"></div>' +
                    '<needs-query text="2"><div *ngIf="shouldShow" [text]="\'3\'"></div></needs-query>' +
                    '<div text="4"></div>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (fixture) {
                    fixture.debugElement.componentInstance.shouldShow = true;
                    fixture.detectChanges();
                    fixture.destroy();
                    async.done();
                });
            }));
            testing_internal_1.it('should reflect moved directives', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div text="1"></div>' +
                    '<needs-query text="2"><div *ngFor="let  i of list" [text]="i"></div></needs-query>' +
                    '<div text="4"></div>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    matchers_1.expect(core_1.asNativeElements(view.debugElement.children)).toHaveText('2|1d|2d|3d|');
                    view.debugElement.componentInstance.list = ['3d', '2d'];
                    view.detectChanges();
                    matchers_1.expect(core_1.asNativeElements(view.debugElement.children)).toHaveText('2|3d|2d|');
                    async.done();
                });
            }));
            testing_internal_1.it('should throw with descriptive error when query selectors are not present', testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                matchers_1.expect(function () { return tcb.overrideTemplate(MyCompBroken0, '<has-null-query-condition></has-null-query-condition>')
                    .createAsync(MyCompBroken0); })
                    .toThrowError("Can't construct a query for the property \"errorTrigger\" of \"" + lang_1.stringify(HasNullQueryCondition) + "\" since the query selector wasn't defined.");
            }));
        });
        testing_internal_1.describe('query for TemplateRef', function () {
            testing_internal_1.it('should find TemplateRefs in the light and shadow dom', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-tpl><template><div>light</div></template></needs-tpl>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    var needsTpl = view.debugElement.children[0].injector.get(NeedsTpl);
                    matchers_1.expect(needsTpl.vc.createEmbeddedView(needsTpl.query.first).rootNodes[0])
                        .toHaveText('light');
                    matchers_1.expect(needsTpl.vc.createEmbeddedView(needsTpl.viewQuery.first).rootNodes[0])
                        .toHaveText('shadow');
                    async.done();
                });
            }));
            testing_internal_1.it('should find named TemplateRefs', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-named-tpl><template #tpl><div>light</div></template></needs-named-tpl>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    var needsTpl = view.debugElement.children[0].injector.get(NeedsNamedTpl);
                    matchers_1.expect(needsTpl.vc.createEmbeddedView(needsTpl.contentTpl).rootNodes[0])
                        .toHaveText('light');
                    matchers_1.expect(needsTpl.vc.createEmbeddedView(needsTpl.viewTpl).rootNodes[0])
                        .toHaveText('shadow');
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('read a different token', function () {
            testing_internal_1.it('should contain all content children', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-content-children-read #q text="ca"><div #q text="cb"></div></needs-content-children-read>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    var comp = view.debugElement.children[0].injector.get(NeedsContentChildrenWithRead);
                    matchers_1.expect(comp.textDirChildren.map(function (textDirective) { return textDirective.text; })).toEqual([
                        'ca', 'cb'
                    ]);
                    async.done();
                });
            }));
            testing_internal_1.it('should contain the first content child', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-content-child-read><div #q text="ca"></div></needs-content-child-read>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    var comp = view.debugElement.children[0].injector.get(NeedsContentChildWithRead);
                    matchers_1.expect(comp.textDirChild.text).toEqual('ca');
                    async.done();
                });
            }));
            testing_internal_1.it('should contain the first view child', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-child-read></needs-view-child-read>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    var comp = view.debugElement.children[0].injector.get(NeedsViewChildWithRead);
                    matchers_1.expect(comp.textDirChild.text).toEqual('va');
                    async.done();
                });
            }));
            testing_internal_1.it('should contain all child directives in the view', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-children-read></needs-view-children-read>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    var comp = view.debugElement.children[0].injector.get(NeedsViewChildrenWithRead);
                    matchers_1.expect(comp.textDirChildren.map(function (textDirective) { return textDirective.text; })).toEqual([
                        'va', 'vb'
                    ]);
                    async.done();
                });
            }));
            testing_internal_1.it('should support reading a ViewContainer', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-viewcontainer-read><template>hello</template></needs-viewcontainer-read>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    var comp = view.debugElement.children[0].injector.get(NeedsViewContainerWithRead);
                    comp.createView();
                    matchers_1.expect(view.debugElement.children[0].nativeElement).toHaveText('hello');
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('changes', function () {
            testing_internal_1.it('should notify query on change', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query #q>' +
                    '<div text="1"></div>' +
                    '<div *ngIf="shouldShow" text="2"></div>' +
                    '</needs-query>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q = view.debugElement.children[0].references['q'];
                    view.detectChanges();
                    async_1.ObservableWrapper.subscribe(q.query.changes, function (_) {
                        matchers_1.expect(q.query.first.text).toEqual('1');
                        matchers_1.expect(q.query.last.text).toEqual('2');
                        async.done();
                    });
                    view.debugElement.componentInstance.shouldShow = true;
                    view.detectChanges();
                });
            }));
            testing_internal_1.it('should notify child\'s query before notifying parent\'s query', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query-desc #q1>' +
                    '<needs-query-desc #q2>' +
                    '<div text="1"></div>' +
                    '</needs-query-desc>' +
                    '</needs-query-desc>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q1 = view.debugElement.children[0].references['q1'];
                    var q2 = view.debugElement.children[0].children[0].references['q2'];
                    var firedQ2 = false;
                    async_1.ObservableWrapper.subscribe(q2.query.changes, function (_) { firedQ2 = true; });
                    async_1.ObservableWrapper.subscribe(q1.query.changes, function (_) {
                        matchers_1.expect(firedQ2).toBe(true);
                        async.done();
                    });
                    view.detectChanges();
                });
            }));
            testing_internal_1.it('should correctly clean-up when destroyed together with the directives it is querying', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query #q *ngIf="shouldShow"><div text="foo"></div></needs-query>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.debugElement.componentInstance.shouldShow = true;
                    view.detectChanges();
                    var q = view.debugElement.children[0].references['q'];
                    matchers_1.expect(q.query.length).toEqual(1);
                    view.debugElement.componentInstance.shouldShow = false;
                    view.detectChanges();
                    view.debugElement.componentInstance.shouldShow = true;
                    view.detectChanges();
                    var q2 = view.debugElement.children[0].references['q'];
                    matchers_1.expect(q2.query.length).toEqual(1);
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('querying by var binding', function () {
            testing_internal_1.it('should contain all the child directives in the light dom with the given var binding', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query-by-ref-binding #q>' +
                    '<div *ngFor="let item of list" [text]="item" #textLabel="textDir"></div>' +
                    '</needs-query-by-ref-binding>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q = view.debugElement.children[0].references['q'];
                    view.debugElement.componentInstance.list = ['1d', '2d'];
                    view.detectChanges();
                    matchers_1.expect(q.query.first.text).toEqual('1d');
                    matchers_1.expect(q.query.last.text).toEqual('2d');
                    async.done();
                });
            }));
            testing_internal_1.it('should support querying by multiple var bindings', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query-by-ref-bindings #q>' +
                    '<div text="one" #textLabel1="textDir"></div>' +
                    '<div text="two" #textLabel2="textDir"></div>' +
                    '</needs-query-by-ref-bindings>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q = view.debugElement.children[0].references['q'];
                    view.detectChanges();
                    matchers_1.expect(q.query.first.text).toEqual('one');
                    matchers_1.expect(q.query.last.text).toEqual('two');
                    async.done();
                });
            }));
            testing_internal_1.it('should support dynamically inserted directives', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query-by-ref-binding #q>' +
                    '<div *ngFor="let item of list" [text]="item" #textLabel="textDir"></div>' +
                    '</needs-query-by-ref-binding>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q = view.debugElement.children[0].references['q'];
                    view.debugElement.componentInstance.list = ['1d', '2d'];
                    view.detectChanges();
                    view.debugElement.componentInstance.list = ['2d', '1d'];
                    view.detectChanges();
                    matchers_1.expect(q.query.last.text).toEqual('1d');
                    async.done();
                });
            }));
            testing_internal_1.it('should contain all the elements in the light dom with the given var binding', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query-by-ref-binding #q>' +
                    '<div template="ngFor: let item of list">' +
                    '<div #textLabel>{{item}}</div>' +
                    '</div>' +
                    '</needs-query-by-ref-binding>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q = view.debugElement.children[0].references['q'];
                    view.debugElement.componentInstance.list = ['1d', '2d'];
                    view.detectChanges();
                    matchers_1.expect(q.query.first.nativeElement).toHaveText('1d');
                    matchers_1.expect(q.query.last.nativeElement).toHaveText('2d');
                    async.done();
                });
            }));
            testing_internal_1.it('should contain all the elements in the light dom even if they get projected', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-query-and-project #q>' +
                    '<div text="hello"></div><div text="world"></div>' +
                    '</needs-query-and-project>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    matchers_1.expect(core_1.asNativeElements(view.debugElement.children)).toHaveText('hello|world|');
                    async.done();
                });
            }));
            testing_internal_1.it('should support querying the view by using a view query', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-query-by-ref-binding #q></needs-view-query-by-ref-binding>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q = view.debugElement.children[0].references['q'];
                    view.detectChanges();
                    matchers_1.expect(q.query.first.nativeElement).toHaveText('text');
                    async.done();
                });
            }));
            testing_internal_1.it('should contain all child directives in the view dom', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-children #q></needs-view-children>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    var q = view.debugElement.children[0].references['q'];
                    view.detectChanges();
                    matchers_1.expect(q.textDirChildren.length).toEqual(1);
                    matchers_1.expect(q.numberOfChildrenAfterViewInit).toEqual(1);
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('querying in the view', function () {
            testing_internal_1.it('should contain all the elements in the view with that have the given directive', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-query #q><div text="ignoreme"></div></needs-view-query>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q = view.debugElement.children[0].references['q'];
                    view.detectChanges();
                    matchers_1.expect(q.query.map(function (d) { return d.text; })).toEqual(['1', '2', '3', '4']);
                    async.done();
                });
            }));
            testing_internal_1.it('should not include directive present on the host element', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-query #q text="self"></needs-view-query>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q = view.debugElement.children[0].references['q'];
                    view.detectChanges();
                    matchers_1.expect(q.query.map(function (d) { return d.text; })).toEqual(['1', '2', '3', '4']);
                    async.done();
                });
            }));
            testing_internal_1.it('should reflect changes in the component', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-query-if #q></needs-view-query-if>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q = view.debugElement.children[0].references['q'];
                    view.detectChanges();
                    matchers_1.expect(q.query.length).toBe(0);
                    q.show = true;
                    view.detectChanges();
                    matchers_1.expect(q.query.length).toBe(1);
                    matchers_1.expect(q.query.first.text).toEqual('1');
                    async.done();
                });
            }));
            testing_internal_1.it('should not be affected by other changes in the component', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-query-nested-if #q></needs-view-query-nested-if>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q = view.debugElement.children[0].references['q'];
                    view.detectChanges();
                    matchers_1.expect(q.query.length).toEqual(1);
                    matchers_1.expect(q.query.first.text).toEqual('1');
                    q.show = false;
                    view.detectChanges();
                    matchers_1.expect(q.query.length).toEqual(1);
                    matchers_1.expect(q.query.first.text).toEqual('1');
                    async.done();
                });
            }));
            testing_internal_1.it('should maintain directives in pre-order depth-first DOM order after dynamic insertion', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-query-order #q></needs-view-query-order>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q = view.debugElement.children[0].references['q'];
                    view.detectChanges();
                    matchers_1.expect(q.query.map(function (d) { return d.text; })).toEqual(['1', '2', '3', '4']);
                    q.list = ['-3', '2'];
                    view.detectChanges();
                    matchers_1.expect(q.query.map(function (d) { return d.text; })).toEqual(['1', '-3', '2', '4']);
                    async.done();
                });
            }));
            testing_internal_1.it('should maintain directives in pre-order depth-first DOM order after dynamic insertion', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-query-order-with-p #q></needs-view-query-order-with-p>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q = view.debugElement.children[0].references['q'];
                    view.detectChanges();
                    matchers_1.expect(q.query.map(function (d) { return d.text; })).toEqual(['1', '2', '3', '4']);
                    q.list = ['-3', '2'];
                    view.detectChanges();
                    matchers_1.expect(q.query.map(function (d) { return d.text; })).toEqual(['1', '-3', '2', '4']);
                    async.done();
                });
            }));
            testing_internal_1.it('should handle long ngFor cycles', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-view-query-order #q></needs-view-query-order>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    var q = view.debugElement.children[0].references['q'];
                    // no significance to 50, just a reasonably large cycle.
                    for (var i = 0; i < 50; i++) {
                        var newString = i.toString();
                        q.list = [newString];
                        view.detectChanges();
                        matchers_1.expect(q.query.map(function (d) { return d.text; })).toEqual(['1', newString, '4']);
                    }
                    async.done();
                });
            }));
            testing_internal_1.it('should support more than three queries', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<needs-four-queries #q><div text="1"></div></needs-four-queries>';
                tcb.overrideTemplate(MyComp0, template).createAsync(MyComp0).then(function (view) {
                    view.detectChanges();
                    var q = view.debugElement.children[0].references['q'];
                    matchers_1.expect(q.query1).toBeDefined();
                    matchers_1.expect(q.query2).toBeDefined();
                    matchers_1.expect(q.query3).toBeDefined();
                    matchers_1.expect(q.query4).toBeDefined();
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
var TextDirective = (function () {
    function TextDirective() {
    }
    /** @nocollapse */
    TextDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[text]', inputs: ['text'], exportAs: 'textDir' },] },
    ];
    /** @nocollapse */
    TextDirective.ctorParameters = [];
    return TextDirective;
}());
var NeedsContentChildren = (function () {
    function NeedsContentChildren() {
    }
    NeedsContentChildren.prototype.ngAfterContentInit = function () { this.numberOfChildrenAfterContentInit = this.textDirChildren.length; };
    /** @nocollapse */
    NeedsContentChildren.decorators = [
        { type: core_1.Component, args: [{ selector: 'needs-content-children', template: '' },] },
    ];
    /** @nocollapse */
    NeedsContentChildren.propDecorators = {
        'textDirChildren': [{ type: core_1.ContentChildren, args: [TextDirective,] },],
    };
    return NeedsContentChildren;
}());
var NeedsViewChildren = (function () {
    function NeedsViewChildren() {
    }
    NeedsViewChildren.prototype.ngAfterViewInit = function () { this.numberOfChildrenAfterViewInit = this.textDirChildren.length; };
    /** @nocollapse */
    NeedsViewChildren.decorators = [
        { type: core_1.Component, args: [{ selector: 'needs-view-children', template: '<div text></div>', directives: [TextDirective] },] },
    ];
    /** @nocollapse */
    NeedsViewChildren.propDecorators = {
        'textDirChildren': [{ type: core_1.ViewChildren, args: [TextDirective,] },],
    };
    return NeedsViewChildren;
}());
var NeedsContentChild = (function () {
    function NeedsContentChild() {
        this.logs = [];
    }
    Object.defineProperty(NeedsContentChild.prototype, "child", {
        get: function () { return this._child; },
        set: function (value) {
            this._child = value;
            this.logs.push(['setter', lang_1.isPresent(value) ? value.text : null]);
        },
        enumerable: true,
        configurable: true
    });
    NeedsContentChild.prototype.ngAfterContentInit = function () { this.logs.push(['init', lang_1.isPresent(this.child) ? this.child.text : null]); };
    NeedsContentChild.prototype.ngAfterContentChecked = function () {
        this.logs.push(['check', lang_1.isPresent(this.child) ? this.child.text : null]);
    };
    /** @nocollapse */
    NeedsContentChild.decorators = [
        { type: core_1.Component, args: [{ selector: 'needs-content-child', template: '' },] },
    ];
    /** @nocollapse */
    NeedsContentChild.propDecorators = {
        'child': [{ type: core_1.ContentChild, args: [TextDirective,] },],
    };
    return NeedsContentChild;
}());
var NeedsViewChild = (function () {
    function NeedsViewChild() {
        this.shouldShow = true;
        this.shouldShow2 = false;
        this.logs = [];
    }
    Object.defineProperty(NeedsViewChild.prototype, "child", {
        get: function () { return this._child; },
        set: function (value) {
            this._child = value;
            this.logs.push(['setter', lang_1.isPresent(value) ? value.text : null]);
        },
        enumerable: true,
        configurable: true
    });
    NeedsViewChild.prototype.ngAfterViewInit = function () { this.logs.push(['init', lang_1.isPresent(this.child) ? this.child.text : null]); };
    NeedsViewChild.prototype.ngAfterViewChecked = function () {
        this.logs.push(['check', lang_1.isPresent(this.child) ? this.child.text : null]);
    };
    /** @nocollapse */
    NeedsViewChild.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'needs-view-child',
                    template: "\n    <div *ngIf=\"shouldShow\" text=\"foo\"></div>\n  ",
                    directives: [common_1.NgIf, TextDirective]
                },] },
    ];
    /** @nocollapse */
    NeedsViewChild.propDecorators = {
        'child': [{ type: core_1.ViewChild, args: [TextDirective,] },],
    };
    return NeedsViewChild;
}());
var NeedsStaticContentAndViewChild = (function () {
    function NeedsStaticContentAndViewChild() {
    }
    /** @nocollapse */
    NeedsStaticContentAndViewChild.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'needs-static-content-view-child',
                    template: "\n    <div text=\"viewFoo\"></div>\n  ",
                    directives: [TextDirective]
                },] },
    ];
    /** @nocollapse */
    NeedsStaticContentAndViewChild.propDecorators = {
        'contentChild': [{ type: core_1.ContentChild, args: [TextDirective,] },],
        'viewChild': [{ type: core_1.ViewChild, args: [TextDirective,] },],
    };
    return NeedsStaticContentAndViewChild;
}());
var InertDirective = (function () {
    function InertDirective() {
    }
    /** @nocollapse */
    InertDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[dir]' },] },
    ];
    /** @nocollapse */
    InertDirective.ctorParameters = [];
    return InertDirective;
}());
var NeedsQuery = (function () {
    function NeedsQuery(query) {
        this.query = query;
    }
    /** @nocollapse */
    NeedsQuery.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'needs-query',
                    directives: [common_1.NgFor, TextDirective],
                    template: '<div text="ignoreme"></div><b *ngFor="let  dir of query">{{dir.text}}|</b>'
                },] },
    ];
    /** @nocollapse */
    NeedsQuery.ctorParameters = [
        { type: core_1.QueryList, decorators: [{ type: core_1.Query, args: [TextDirective,] },] },
    ];
    return NeedsQuery;
}());
var NeedsFourQueries = (function () {
    function NeedsFourQueries() {
    }
    /** @nocollapse */
    NeedsFourQueries.decorators = [
        { type: core_1.Component, args: [{ selector: 'needs-four-queries', template: '' },] },
    ];
    /** @nocollapse */
    NeedsFourQueries.propDecorators = {
        'query1': [{ type: core_1.ContentChild, args: [TextDirective,] },],
        'query2': [{ type: core_1.ContentChild, args: [TextDirective,] },],
        'query3': [{ type: core_1.ContentChild, args: [TextDirective,] },],
        'query4': [{ type: core_1.ContentChild, args: [TextDirective,] },],
    };
    return NeedsFourQueries;
}());
var NeedsQueryDesc = (function () {
    function NeedsQueryDesc(query) {
        this.query = query;
    }
    /** @nocollapse */
    NeedsQueryDesc.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'needs-query-desc',
                    directives: [common_1.NgFor],
                    template: '<ng-content></ng-content><div *ngFor="let  dir of query">{{dir.text}}|</div>'
                },] },
    ];
    /** @nocollapse */
    NeedsQueryDesc.ctorParameters = [
        { type: core_1.QueryList, decorators: [{ type: core_1.Query, args: [TextDirective, { descendants: true },] },] },
    ];
    return NeedsQueryDesc;
}());
var NeedsQueryByLabel = (function () {
    function NeedsQueryByLabel(query) {
        this.query = query;
    }
    /** @nocollapse */
    NeedsQueryByLabel.decorators = [
        { type: core_1.Component, args: [{ selector: 'needs-query-by-ref-binding', directives: [], template: '<ng-content>' },] },
    ];
    /** @nocollapse */
    NeedsQueryByLabel.ctorParameters = [
        { type: core_1.QueryList, decorators: [{ type: core_1.Query, args: ['textLabel', { descendants: true },] },] },
    ];
    return NeedsQueryByLabel;
}());
var NeedsViewQueryByLabel = (function () {
    function NeedsViewQueryByLabel(query) {
        this.query = query;
    }
    /** @nocollapse */
    NeedsViewQueryByLabel.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'needs-view-query-by-ref-binding',
                    directives: [],
                    template: '<div #textLabel>text</div>'
                },] },
    ];
    /** @nocollapse */
    NeedsViewQueryByLabel.ctorParameters = [
        { type: core_1.QueryList, decorators: [{ type: core_1.ViewQuery, args: ['textLabel',] },] },
    ];
    return NeedsViewQueryByLabel;
}());
var NeedsQueryByTwoLabels = (function () {
    function NeedsQueryByTwoLabels(query) {
        this.query = query;
    }
    /** @nocollapse */
    NeedsQueryByTwoLabels.decorators = [
        { type: core_1.Component, args: [{ selector: 'needs-query-by-ref-bindings', directives: [], template: '<ng-content>' },] },
    ];
    /** @nocollapse */
    NeedsQueryByTwoLabels.ctorParameters = [
        { type: core_1.QueryList, decorators: [{ type: core_1.Query, args: ['textLabel1,textLabel2', { descendants: true },] },] },
    ];
    return NeedsQueryByTwoLabels;
}());
var NeedsQueryAndProject = (function () {
    function NeedsQueryAndProject(query) {
        this.query = query;
    }
    /** @nocollapse */
    NeedsQueryAndProject.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'needs-query-and-project',
                    directives: [common_1.NgFor],
                    template: '<div *ngFor="let  dir of query">{{dir.text}}|</div><ng-content></ng-content>'
                },] },
    ];
    /** @nocollapse */
    NeedsQueryAndProject.ctorParameters = [
        { type: core_1.QueryList, decorators: [{ type: core_1.Query, args: [TextDirective,] },] },
    ];
    return NeedsQueryAndProject;
}());
var NeedsViewQuery = (function () {
    function NeedsViewQuery(query) {
        this.query = query;
    }
    /** @nocollapse */
    NeedsViewQuery.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'needs-view-query',
                    directives: [TextDirective],
                    template: '<div text="1"><div text="2"></div></div>' +
                        '<div text="3"></div><div text="4"></div>'
                },] },
    ];
    /** @nocollapse */
    NeedsViewQuery.ctorParameters = [
        { type: core_1.QueryList, decorators: [{ type: core_1.ViewQuery, args: [TextDirective,] },] },
    ];
    return NeedsViewQuery;
}());
var NeedsViewQueryIf = (function () {
    function NeedsViewQueryIf(query) {
        this.query = query;
        this.show = false;
    }
    /** @nocollapse */
    NeedsViewQueryIf.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'needs-view-query-if',
                    directives: [common_1.NgIf, TextDirective],
                    template: '<div *ngIf="show" text="1"></div>'
                },] },
    ];
    /** @nocollapse */
    NeedsViewQueryIf.ctorParameters = [
        { type: core_1.QueryList, decorators: [{ type: core_1.ViewQuery, args: [TextDirective,] },] },
    ];
    return NeedsViewQueryIf;
}());
var NeedsViewQueryNestedIf = (function () {
    function NeedsViewQueryNestedIf(query) {
        this.query = query;
        this.show = true;
    }
    /** @nocollapse */
    NeedsViewQueryNestedIf.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'needs-view-query-nested-if',
                    directives: [common_1.NgIf, InertDirective, TextDirective],
                    template: '<div text="1"><div *ngIf="show"><div dir></div></div></div>'
                },] },
    ];
    /** @nocollapse */
    NeedsViewQueryNestedIf.ctorParameters = [
        { type: core_1.QueryList, decorators: [{ type: core_1.ViewQuery, args: [TextDirective,] },] },
    ];
    return NeedsViewQueryNestedIf;
}());
var NeedsViewQueryOrder = (function () {
    function NeedsViewQueryOrder(query) {
        this.query = query;
        this.list = ['2', '3'];
    }
    /** @nocollapse */
    NeedsViewQueryOrder.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'needs-view-query-order',
                    directives: [common_1.NgFor, TextDirective, InertDirective],
                    template: '<div text="1"></div>' +
                        '<div *ngFor="let  i of list" [text]="i"></div>' +
                        '<div text="4"></div>'
                },] },
    ];
    /** @nocollapse */
    NeedsViewQueryOrder.ctorParameters = [
        { type: core_1.QueryList, decorators: [{ type: core_1.ViewQuery, args: [TextDirective,] },] },
    ];
    return NeedsViewQueryOrder;
}());
var NeedsViewQueryOrderWithParent = (function () {
    function NeedsViewQueryOrderWithParent(query) {
        this.query = query;
        this.list = ['2', '3'];
    }
    /** @nocollapse */
    NeedsViewQueryOrderWithParent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'needs-view-query-order-with-p',
                    directives: [common_1.NgFor, TextDirective, InertDirective],
                    template: '<div dir><div text="1"></div>' +
                        '<div *ngFor="let  i of list" [text]="i"></div>' +
                        '<div text="4"></div></div>'
                },] },
    ];
    /** @nocollapse */
    NeedsViewQueryOrderWithParent.ctorParameters = [
        { type: core_1.QueryList, decorators: [{ type: core_1.ViewQuery, args: [TextDirective,] },] },
    ];
    return NeedsViewQueryOrderWithParent;
}());
var NeedsTpl = (function () {
    function NeedsTpl(viewQuery, query, vc) {
        this.vc = vc;
        this.viewQuery = viewQuery;
        this.query = query;
    }
    /** @nocollapse */
    NeedsTpl.decorators = [
        { type: core_1.Component, args: [{ selector: 'needs-tpl', template: '<template><div>shadow</div></template>' },] },
    ];
    /** @nocollapse */
    NeedsTpl.ctorParameters = [
        { type: core_1.QueryList, decorators: [{ type: core_1.ViewQuery, args: [core_1.TemplateRef,] },] },
        { type: core_1.QueryList, decorators: [{ type: core_1.Query, args: [core_1.TemplateRef,] },] },
        { type: core_1.ViewContainerRef, },
    ];
    return NeedsTpl;
}());
var NeedsNamedTpl = (function () {
    function NeedsNamedTpl(vc) {
        this.vc = vc;
    }
    /** @nocollapse */
    NeedsNamedTpl.decorators = [
        { type: core_1.Component, args: [{ selector: 'needs-named-tpl', template: '<template #tpl><div>shadow</div></template>' },] },
    ];
    /** @nocollapse */
    NeedsNamedTpl.ctorParameters = [
        { type: core_1.ViewContainerRef, },
    ];
    /** @nocollapse */
    NeedsNamedTpl.propDecorators = {
        'viewTpl': [{ type: core_1.ViewChild, args: ['tpl',] },],
        'contentTpl': [{ type: core_1.ContentChild, args: ['tpl',] },],
    };
    return NeedsNamedTpl;
}());
var NeedsContentChildrenWithRead = (function () {
    function NeedsContentChildrenWithRead() {
    }
    /** @nocollapse */
    NeedsContentChildrenWithRead.decorators = [
        { type: core_1.Component, args: [{ selector: 'needs-content-children-read', template: '' },] },
    ];
    /** @nocollapse */
    NeedsContentChildrenWithRead.propDecorators = {
        'textDirChildren': [{ type: core_1.ContentChildren, args: ['q', { read: TextDirective },] },],
        'nonExistingVar': [{ type: core_1.ContentChildren, args: ['nonExisting', { read: TextDirective },] },],
    };
    return NeedsContentChildrenWithRead;
}());
var NeedsContentChildWithRead = (function () {
    function NeedsContentChildWithRead() {
    }
    /** @nocollapse */
    NeedsContentChildWithRead.decorators = [
        { type: core_1.Component, args: [{ selector: 'needs-content-child-read', template: '' },] },
    ];
    /** @nocollapse */
    NeedsContentChildWithRead.propDecorators = {
        'textDirChild': [{ type: core_1.ContentChild, args: ['q', { read: TextDirective },] },],
        'nonExistingVar': [{ type: core_1.ContentChild, args: ['nonExisting', { read: TextDirective },] },],
    };
    return NeedsContentChildWithRead;
}());
var NeedsViewChildrenWithRead = (function () {
    function NeedsViewChildrenWithRead() {
    }
    /** @nocollapse */
    NeedsViewChildrenWithRead.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'needs-view-children-read',
                    template: '<div #q text="va"></div><div #w text="vb"></div>',
                    directives: [TextDirective]
                },] },
    ];
    /** @nocollapse */
    NeedsViewChildrenWithRead.propDecorators = {
        'textDirChildren': [{ type: core_1.ViewChildren, args: ['q,w', { read: TextDirective },] },],
        'nonExistingVar': [{ type: core_1.ViewChildren, args: ['nonExisting', { read: TextDirective },] },],
    };
    return NeedsViewChildrenWithRead;
}());
var NeedsViewChildWithRead = (function () {
    function NeedsViewChildWithRead() {
    }
    /** @nocollapse */
    NeedsViewChildWithRead.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'needs-view-child-read',
                    template: '<div #q text="va"></div>',
                    directives: [TextDirective]
                },] },
    ];
    /** @nocollapse */
    NeedsViewChildWithRead.propDecorators = {
        'textDirChild': [{ type: core_1.ViewChild, args: ['q', { read: TextDirective },] },],
        'nonExistingVar': [{ type: core_1.ViewChild, args: ['nonExisting', { read: TextDirective },] },],
    };
    return NeedsViewChildWithRead;
}());
var NeedsViewContainerWithRead = (function () {
    function NeedsViewContainerWithRead() {
    }
    NeedsViewContainerWithRead.prototype.createView = function () { this.vc.createEmbeddedView(this.template); };
    /** @nocollapse */
    NeedsViewContainerWithRead.decorators = [
        { type: core_1.Component, args: [{ selector: 'needs-viewcontainer-read', template: '<div #q></div>' },] },
    ];
    /** @nocollapse */
    NeedsViewContainerWithRead.propDecorators = {
        'vc': [{ type: core_1.ViewChild, args: ['q', { read: core_1.ViewContainerRef },] },],
        'nonExistingVar': [{ type: core_1.ViewChild, args: ['nonExisting', { read: core_1.ViewContainerRef },] },],
        'template': [{ type: core_1.ContentChild, args: [core_1.TemplateRef,] },],
    };
    return NeedsViewContainerWithRead;
}());
var HasNullQueryCondition = (function () {
    function HasNullQueryCondition() {
    }
    /** @nocollapse */
    HasNullQueryCondition.decorators = [
        { type: core_1.Component, args: [{ selector: 'has-null-query-condition', template: '<div></div>' },] },
    ];
    /** @nocollapse */
    HasNullQueryCondition.propDecorators = {
        'errorTrigger': [{ type: core_1.ContentChildren, args: [null,] },],
    };
    return HasNullQueryCondition;
}());
var MyComp0 = (function () {
    function MyComp0() {
        this.shouldShow = false;
        this.list = ['1d', '2d', '3d'];
    }
    /** @nocollapse */
    MyComp0.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'my-comp',
                    directives: [
                        NeedsQuery,
                        NeedsQueryDesc,
                        NeedsQueryByLabel,
                        NeedsQueryByTwoLabels,
                        NeedsQueryAndProject,
                        NeedsViewQuery,
                        NeedsViewQueryIf,
                        NeedsViewQueryNestedIf,
                        NeedsViewQueryOrder,
                        NeedsViewQueryByLabel,
                        NeedsViewQueryOrderWithParent,
                        NeedsContentChildren,
                        NeedsViewChildren,
                        NeedsViewChild,
                        NeedsStaticContentAndViewChild,
                        NeedsContentChild,
                        NeedsTpl,
                        NeedsNamedTpl,
                        TextDirective,
                        InertDirective,
                        common_1.NgIf,
                        common_1.NgFor,
                        NeedsFourQueries,
                        NeedsContentChildrenWithRead,
                        NeedsContentChildWithRead,
                        NeedsViewChildrenWithRead,
                        NeedsViewChildWithRead,
                        NeedsViewContainerWithRead
                    ],
                    template: ''
                },] },
    ];
    /** @nocollapse */
    MyComp0.ctorParameters = [];
    return MyComp0;
}());
var MyCompBroken0 = (function () {
    function MyCompBroken0() {
    }
    /** @nocollapse */
    MyCompBroken0.decorators = [
        { type: core_1.Component, args: [{ selector: 'my-comp', directives: [HasNullQueryCondition], template: '' },] },
    ];
    return MyCompBroken0;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlfaW50ZWdyYXRpb25fc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L2xpbmtlci9xdWVyeV9pbnRlZ3JhdGlvbl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBeUYsd0NBQXdDLENBQUMsQ0FBQTtBQUNsSSx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUNsRSx3QkFBbUMsdUJBQXVCLENBQUMsQ0FBQTtBQUUzRCxxQkFBbUMsdUJBQXVCLENBQUMsQ0FBQTtBQUMzRCxzQkFBZ0Msd0JBQXdCLENBQUMsQ0FBQTtBQUV6RCxxQkFBaVAsZUFBZSxDQUFDLENBQUE7QUFDalEsdUJBQTBCLGlCQUFpQixDQUFDLENBQUE7QUFFNUM7SUFDRSwyQkFBUSxDQUFDLFdBQVcsRUFBRTtRQUNwQiwyQkFBUSxDQUFDLDRCQUE0QixFQUFFO1lBQ3JDLHFCQUFFLENBQUMsMkVBQTJFLEVBQzNFLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7Z0JBQ25ELElBQUksUUFBUSxHQUFHLHNCQUFzQjtvQkFDakMsc0NBQXNDO29CQUN0Qyw2QkFBNkI7b0JBQzdCLHNCQUFzQjtvQkFDdEIsc0JBQXNCLENBQUM7Z0JBRTNCLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLElBQUk7b0JBQ3JFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFFckIsaUJBQU0sQ0FBQyx1QkFBZ0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUV4RSxLQUFLLENBQUMsSUFBSSxF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