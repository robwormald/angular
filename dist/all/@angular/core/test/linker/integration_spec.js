/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var testing_1 = require('@angular/core/testing');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var lang_1 = require('../../src/facade/lang');
var exceptions_1 = require('../../src/facade/exceptions');
var async_1 = require('../../src/facade/async');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var change_detection_1 = require('@angular/core/src/change_detection/change_detection');
var metadata_1 = require('@angular/core/src/metadata');
var query_list_1 = require('@angular/core/src/linker/query_list');
var view_container_ref_1 = require('@angular/core/src/linker/view_container_ref');
var component_resolver_1 = require('@angular/core/src/linker/component_resolver');
var element_ref_1 = require('@angular/core/src/linker/element_ref');
var template_ref_1 = require('@angular/core/src/linker/template_ref');
var render_1 = require('@angular/core/src/render');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var ANCHOR_ELEMENT = new core_1.OpaqueToken('AnchorElement');
function main() {
    testing_internal_1.describe('jit', function () { declareTests({ useJit: true }); });
    testing_internal_1.describe('no jit', function () { declareTests({ useJit: false }); });
}
exports.main = main;
function declareTests(_a) {
    var useJit = _a.useJit;
    testing_internal_1.describe('integration tests', function () {
        testing_internal_1.beforeEach(function () {
            testing_1.configureCompiler({ useJit: useJit });
            testing_1.configureModule({ providers: [{ provide: ANCHOR_ELEMENT, useValue: browser_util_1.el('<div></div>') }] });
        });
        testing_internal_1.describe('react to record changes', function () {
            testing_internal_1.it('should consume text node changes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<div>{{ctxProp}}</div>' }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxProp = 'Hello World!';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('Hello World!');
                    async.done();
                });
            }));
            testing_internal_1.it('should update text node with a blank string when interpolation evaluates to null', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<div>{{null}}{{ctxProp}}</div>' }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxProp = null;
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
                    async.done();
                });
            }));
            testing_internal_1.it('should consume element binding changes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<div [id]="ctxProp"></div>' }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxProp = 'Hello World!';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.children[0].nativeElement.id)
                        .toEqual('Hello World!');
                    async.done();
                });
            }));
            testing_internal_1.it('should consume binding to aria-* attributes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<div [attr.aria-label]="ctxProp"></div>' }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxProp = 'Initial aria label';
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM().getAttribute(fixture.debugElement.children[0].nativeElement, 'aria-label'))
                        .toEqual('Initial aria label');
                    fixture.debugElement.componentInstance.ctxProp = 'Changed aria label';
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM().getAttribute(fixture.debugElement.children[0].nativeElement, 'aria-label'))
                        .toEqual('Changed aria label');
                    async.done();
                });
            }));
            testing_internal_1.it('should remove an attribute when attribute expression evaluates to null', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<div [attr.foo]="ctxProp"></div>' }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxProp = 'bar';
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM().getAttribute(fixture.debugElement.children[0].nativeElement, 'foo'))
                        .toEqual('bar');
                    fixture.debugElement.componentInstance.ctxProp = null;
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM().hasAttribute(fixture.debugElement.children[0].nativeElement, 'foo'))
                        .toBeFalsy();
                    async.done();
                });
            }));
            testing_internal_1.it('should remove style when when style expression evaluates to null', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<div [style.height.px]="ctxProp"></div>' }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxProp = '10';
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'height'))
                        .toEqual('10px');
                    fixture.debugElement.componentInstance.ctxProp = null;
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'height'))
                        .toEqual('');
                    async.done();
                });
            }));
            testing_internal_1.it('should consume binding to property names where attr name and property name do not match', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<div [tabindex]="ctxNumProp"></div>' }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.children[0].nativeElement.tabIndex).toEqual(0);
                    fixture.debugElement.componentInstance.ctxNumProp = 5;
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.children[0].nativeElement.tabIndex).toEqual(5);
                    async.done();
                });
            }));
            testing_internal_1.it('should consume binding to camel-cased properties', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<input [readOnly]="ctxBoolProp">' }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.children[0].nativeElement.readOnly).toBeFalsy();
                    fixture.debugElement.componentInstance.ctxBoolProp = true;
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.children[0].nativeElement.readOnly).toBeTruthy();
                    async.done();
                });
            }));
            testing_internal_1.it('should consume binding to innerHtml', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<div innerHtml="{{ctxProp}}"></div>' }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxProp = 'Some <span>HTML</span>';
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM().getInnerHTML(fixture.debugElement.children[0].nativeElement))
                        .toEqual('Some <span>HTML</span>');
                    fixture.debugElement.componentInstance.ctxProp = 'Some other <div>HTML</div>';
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM().getInnerHTML(fixture.debugElement.children[0].nativeElement))
                        .toEqual('Some other <div>HTML</div>');
                    async.done();
                });
            }));
            testing_internal_1.it('should consume binding to className using class alias', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<div class="initial" [class]="ctxProp"></div>' }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var nativeEl = fixture.debugElement.children[0].nativeElement;
                    fixture.debugElement.componentInstance.ctxProp = 'foo bar';
                    fixture.detectChanges();
                    matchers_1.expect(nativeEl).toHaveCssClass('foo');
                    matchers_1.expect(nativeEl).toHaveCssClass('bar');
                    matchers_1.expect(nativeEl).not.toHaveCssClass('initial');
                    async.done();
                });
            }));
            testing_internal_1.it('should consume directive watch expression change.', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var tpl = '<span>' +
                    '<div my-dir [elprop]="ctxProp"></div>' +
                    '<div my-dir elprop="Hi there!"></div>' +
                    '<div my-dir elprop="Hi {{\'there!\'}}"></div>' +
                    '<div my-dir elprop="One more {{ctxProp}}"></div>' +
                    '</span>';
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: tpl, directives: [MyDir] }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxProp = 'Hello World!';
                    fixture.detectChanges();
                    var containerSpan = fixture.debugElement.children[0];
                    matchers_1.expect(containerSpan.children[0].injector.get(MyDir).dirProp)
                        .toEqual('Hello World!');
                    matchers_1.expect(containerSpan.children[1].injector.get(MyDir).dirProp)
                        .toEqual('Hi there!');
                    matchers_1.expect(containerSpan.children[2].injector.get(MyDir).dirProp)
                        .toEqual('Hi there!');
                    matchers_1.expect(containerSpan.children[3].injector.get(MyDir).dirProp)
                        .toEqual('One more Hello World!');
                    async.done();
                });
            }));
            testing_internal_1.describe('pipes', function () {
                testing_internal_1.it('should support pipes in bindings', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<div my-dir #dir="mydir" [elprop]="ctxProp | double"></div>',
                        directives: [MyDir],
                        pipes: [DoublePipe]
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        fixture.debugElement.componentInstance.ctxProp = 'a';
                        fixture.detectChanges();
                        var dir = fixture.debugElement.children[0].references['dir'];
                        matchers_1.expect(dir.dirProp).toEqual('aa');
                        async.done();
                    });
                }));
            });
            testing_internal_1.it('should support nested components.', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<child-cmp></child-cmp>', directives: [ChildComp] }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello');
                    async.done();
                });
            }));
            // GH issue 328 - https://github.com/angular/angular/issues/328
            testing_internal_1.it('should support different directive types on a single node', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<child-cmp my-dir [elprop]="ctxProp"></child-cmp>',
                    directives: [MyDir, ChildComp]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxProp = 'Hello World!';
                    fixture.detectChanges();
                    var tc = fixture.debugElement.children[0];
                    matchers_1.expect(tc.injector.get(MyDir).dirProp).toEqual('Hello World!');
                    matchers_1.expect(tc.injector.get(ChildComp).dirProp).toEqual(null);
                    async.done();
                });
            }));
            testing_internal_1.it('should support directives where a binding attribute is not given', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    // No attribute "el-prop" specified.
                    template: '<p my-dir></p>',
                    directives: [MyDir]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) { async.done(); });
            }));
            testing_internal_1.it('should execute a given directive once, even if specified multiple times', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<p no-duplicate></p>',
                    directives: [DuplicateDir, DuplicateDir, [DuplicateDir, [DuplicateDir]]]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('noduplicate');
                    async.done();
                });
            }));
            testing_internal_1.it('should support directives where a selector matches property binding', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<p [id]="ctxProp"></p>', directives: [IdDir] }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var tc = fixture.debugElement.children[0];
                    var idDir = tc.injector.get(IdDir);
                    fixture.debugElement.componentInstance.ctxProp = 'some_id';
                    fixture.detectChanges();
                    matchers_1.expect(idDir.id).toEqual('some_id');
                    fixture.debugElement.componentInstance.ctxProp = 'other_id';
                    fixture.detectChanges();
                    matchers_1.expect(idDir.id).toEqual('other_id');
                    async.done();
                });
            }));
            testing_internal_1.it('should support directives where a selector matches event binding', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<p (customEvent)="doNothing()"></p>',
                    directives: [EventDir]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var tc = fixture.debugElement.children[0];
                    matchers_1.expect(tc.injector.get(EventDir)).not.toBe(null);
                    async.done();
                });
            }));
            testing_internal_1.it('should read directives metadata from their binding token', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<div public-api><div needs-public-api></div></div>',
                    directives: [PrivateImpl, NeedsPublicApi]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) { async.done(); });
            }));
            testing_internal_1.it('should support template directives via `<template>` elements.', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<template some-viewport let-greeting="someTmpl"><copy-me>{{greeting}}</copy-me></template>',
                    directives: [SomeViewport]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    var childNodesOfWrapper = dom_adapter_1.getDOM().childNodes(fixture.debugElement.nativeElement);
                    // 1 template + 2 copies.
                    matchers_1.expect(childNodesOfWrapper.length).toBe(3);
                    matchers_1.expect(childNodesOfWrapper[1]).toHaveText('hello');
                    matchers_1.expect(childNodesOfWrapper[2]).toHaveText('again');
                    async.done();
                });
            }));
            testing_internal_1.it('should not detach views in ViewContainers when the parent view is destroyed.', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<div *ngIf="ctxBoolProp"><template some-viewport let-greeting="someTmpl"><span>{{greeting}}</span></template></div>',
                    directives: [common_1.NgIf, SomeViewport]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxBoolProp = true;
                    fixture.detectChanges();
                    var ngIfEl = fixture.debugElement.children[0];
                    var someViewport = ngIfEl.childNodes[0].injector.get(SomeViewport);
                    matchers_1.expect(someViewport.container.length).toBe(2);
                    matchers_1.expect(ngIfEl.children.length).toBe(2);
                    fixture.debugElement.componentInstance.ctxBoolProp = false;
                    fixture.detectChanges();
                    matchers_1.expect(someViewport.container.length).toBe(2);
                    matchers_1.expect(fixture.debugElement.children.length).toBe(0);
                    async.done();
                });
            }));
            testing_internal_1.it('should use a comment while stamping out `<template>` elements.', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<template></template>' }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var childNodesOfWrapper = dom_adapter_1.getDOM().childNodes(fixture.debugElement.nativeElement);
                    matchers_1.expect(childNodesOfWrapper.length).toBe(1);
                    matchers_1.expect(dom_adapter_1.getDOM().isCommentNode(childNodesOfWrapper[0])).toBe(true);
                    async.done();
                });
            }));
            testing_internal_1.it('should support template directives via `template` attribute.', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<copy-me template="some-viewport: let greeting=someTmpl">{{greeting}}</copy-me>',
                    directives: [SomeViewport]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    var childNodesOfWrapper = dom_adapter_1.getDOM().childNodes(fixture.debugElement.nativeElement);
                    // 1 template + 2 copies.
                    matchers_1.expect(childNodesOfWrapper.length).toBe(3);
                    matchers_1.expect(childNodesOfWrapper[1]).toHaveText('hello');
                    matchers_1.expect(childNodesOfWrapper[2]).toHaveText('again');
                    async.done();
                });
            }));
            testing_internal_1.it('should allow to transplant TemplateRefs into other ViewContainers', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<some-directive><toolbar><template toolbarpart let-toolbarProp="toolbarProp">{{ctxProp}},{{toolbarProp}},<cmp-with-host></cmp-with-host></template></toolbar></some-directive>',
                    directives: [SomeDirective, CompWithHost, ToolbarComponent, ToolbarPart]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxProp = 'From myComp';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement)
                        .toHaveText('TOOLBAR(From myComp,From toolbar,Component with an injected host)');
                    async.done();
                });
            }));
            testing_internal_1.describe('reference bindings', function () {
                testing_internal_1.it('should assign a component to a ref-', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<p><child-cmp ref-alice></child-cmp></p>',
                        directives: [ChildComp]
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        matchers_1.expect(fixture.debugElement.children[0].children[0].references['alice'])
                            .toBeAnInstanceOf(ChildComp);
                        async.done();
                    });
                }));
                testing_internal_1.it('should assign a directive to a ref-', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<div><div export-dir #localdir="dir"></div></div>',
                        directives: [ExportDir]
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        matchers_1.expect(fixture.debugElement.children[0].children[0].references['localdir'])
                            .toBeAnInstanceOf(ExportDir);
                        async.done();
                    });
                }));
                testing_internal_1.it('should make the assigned component accessible in property bindings, even if they were declared before the component', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<template [ngIf]="true">{{alice.ctxProp}}</template>|{{alice.ctxProp}}|<child-cmp ref-alice></child-cmp>',
                        directives: [ChildComp, common_1.NgIf]
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        fixture.detectChanges();
                        matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello|hello|hello');
                        async.done();
                    });
                }));
                testing_internal_1.it('should assign two component instances each with a ref-', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<p><child-cmp ref-alice></child-cmp><child-cmp ref-bob></child-cmp></p>',
                        directives: [ChildComp]
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        var pEl = fixture.debugElement.children[0];
                        var alice = pEl.children[0].references['alice'];
                        var bob = pEl.children[1].references['bob'];
                        matchers_1.expect(alice).toBeAnInstanceOf(ChildComp);
                        matchers_1.expect(bob).toBeAnInstanceOf(ChildComp);
                        matchers_1.expect(alice).not.toBe(bob);
                        async.done();
                    });
                }));
                testing_internal_1.it('should assign the component instance to a ref- with shorthand syntax', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<child-cmp #alice></child-cmp>', directives: [ChildComp] }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        matchers_1.expect(fixture.debugElement.children[0].references['alice'])
                            .toBeAnInstanceOf(ChildComp);
                        async.done();
                    });
                }));
                testing_internal_1.it('should assign the element instance to a user-defined variable', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<div><div ref-alice><i>Hello</i></div></div>' }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        var value = fixture.debugElement.children[0].children[0].references['alice'];
                        matchers_1.expect(value).not.toBe(null);
                        matchers_1.expect(value.tagName.toLowerCase()).toEqual('div');
                        async.done();
                    });
                }));
                testing_internal_1.it('should assign the TemplateRef to a user-defined variable', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<template ref-alice></template>' }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        var value = fixture.debugElement.childNodes[0].references['alice'];
                        matchers_1.expect(value).toBeAnInstanceOf(template_ref_1.TemplateRef_);
                        async.done();
                    });
                }));
                testing_internal_1.it('should preserve case', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<p><child-cmp ref-superAlice></child-cmp></p>',
                        directives: [ChildComp]
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        matchers_1.expect(fixture.debugElement.children[0].children[0].references['superAlice'])
                            .toBeAnInstanceOf(ChildComp);
                        async.done();
                    });
                }));
            });
            testing_internal_1.describe('variables', function () {
                testing_internal_1.it('should allow to use variables in a for loop', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<template ngFor [ngForOf]="[1]" let-i><child-cmp-no-template #cmp></child-cmp-no-template>{{i}}-{{cmp.ctxProp}}</template>',
                        directives: [ChildCompNoTemplate, common_1.NgFor]
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        fixture.detectChanges();
                        // Get the element at index 2, since index 0 is the <template>.
                        matchers_1.expect(dom_adapter_1.getDOM().childNodes(fixture.debugElement.nativeElement)[2])
                            .toHaveText('1-hello');
                        async.done();
                    });
                }));
            });
            testing_internal_1.describe('OnPush components', function () {
                testing_internal_1.it('should use ChangeDetectorRef to manually request a check', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<push-cmp-with-ref #cmp></push-cmp-with-ref>',
                        directives: [[[PushCmpWithRef]]]
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        var cmp = fixture.debugElement.children[0].references['cmp'];
                        fixture.detectChanges();
                        matchers_1.expect(cmp.numberOfChecks).toEqual(1);
                        fixture.detectChanges();
                        matchers_1.expect(cmp.numberOfChecks).toEqual(1);
                        cmp.propagate();
                        fixture.detectChanges();
                        matchers_1.expect(cmp.numberOfChecks).toEqual(2);
                        async.done();
                    });
                }));
                testing_internal_1.it('should be checked when its bindings got updated', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<push-cmp [prop]="ctxProp" #cmp></push-cmp>',
                        directives: [[[PushCmp]]]
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        var cmp = fixture.debugElement.children[0].references['cmp'];
                        fixture.debugElement.componentInstance.ctxProp = 'one';
                        fixture.detectChanges();
                        matchers_1.expect(cmp.numberOfChecks).toEqual(1);
                        fixture.debugElement.componentInstance.ctxProp = 'two';
                        fixture.detectChanges();
                        matchers_1.expect(cmp.numberOfChecks).toEqual(2);
                        async.done();
                    });
                }));
                if (dom_adapter_1.getDOM().supportsDOMEvents()) {
                    testing_internal_1.it('should allow to destroy a component from within a host event handler', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                        var fixture = tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                            template: '<push-cmp-with-host-event></push-cmp-with-host-event>',
                            directives: [[[PushCmpWithHostEvent]]]
                        }))
                            .createFakeAsync(MyComp);
                        testing_1.tick();
                        fixture.detectChanges();
                        var cmpEl = fixture.debugElement.children[0];
                        var cmp = cmpEl.injector.get(PushCmpWithHostEvent);
                        cmp.ctxCallback = function (_) { return fixture.destroy(); };
                        matchers_1.expect(function () { return cmpEl.triggerEventHandler('click', {}); }).not.toThrow();
                    })));
                }
                testing_internal_1.it('should be checked when an event is fired', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<push-cmp [prop]="ctxProp" #cmp></push-cmp>',
                        directives: [[[PushCmp]]]
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        var cmpEl = fixture.debugElement.children[0];
                        var cmp = cmpEl.componentInstance;
                        fixture.detectChanges();
                        fixture.detectChanges();
                        matchers_1.expect(cmp.numberOfChecks).toEqual(1);
                        cmpEl.children[0].triggerEventHandler('click', {});
                        // regular element
                        fixture.detectChanges();
                        fixture.detectChanges();
                        matchers_1.expect(cmp.numberOfChecks).toEqual(2);
                        // element inside of an *ngIf
                        cmpEl.children[1].triggerEventHandler('click', {});
                        fixture.detectChanges();
                        fixture.detectChanges();
                        matchers_1.expect(cmp.numberOfChecks).toEqual(3);
                        // element inside a nested component
                        cmpEl.children[2].children[0].triggerEventHandler('click', {});
                        fixture.detectChanges();
                        fixture.detectChanges();
                        matchers_1.expect(cmp.numberOfChecks).toEqual(4);
                        async.done();
                    });
                }));
                testing_internal_1.it('should not affect updating properties on the component', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<push-cmp-with-ref [prop]="ctxProp" #cmp></push-cmp-with-ref>',
                        directives: [[[PushCmpWithRef]]]
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        var cmp = fixture.debugElement.children[0].references['cmp'];
                        fixture.debugElement.componentInstance.ctxProp = 'one';
                        fixture.detectChanges();
                        matchers_1.expect(cmp.prop).toEqual('one');
                        fixture.debugElement.componentInstance.ctxProp = 'two';
                        fixture.detectChanges();
                        matchers_1.expect(cmp.prop).toEqual('two');
                        async.done();
                    });
                }));
                if (dom_adapter_1.getDOM().supportsDOMEvents()) {
                    testing_internal_1.it('should be checked when an async pipe requests a check', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                        tcb =
                            tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                                template: '<push-cmp-with-async #cmp></push-cmp-with-async>',
                                directives: [[[PushCmpWithAsyncPipe]]]
                            }));
                        var fixture = tcb.createFakeAsync(MyComp);
                        testing_1.tick();
                        var cmp = fixture.debugElement.children[0].references['cmp'];
                        fixture.detectChanges();
                        matchers_1.expect(cmp.numberOfChecks).toEqual(1);
                        fixture.detectChanges();
                        fixture.detectChanges();
                        matchers_1.expect(cmp.numberOfChecks).toEqual(1);
                        cmp.resolve(2);
                        testing_1.tick();
                        fixture.detectChanges();
                        matchers_1.expect(cmp.numberOfChecks).toEqual(2);
                    })));
                }
            });
            testing_internal_1.it('should create a component that injects an @Host', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: "\n            <some-directive>\n              <p>\n                <cmp-with-host #child></cmp-with-host>\n              </p>\n            </some-directive>",
                    directives: [SomeDirective, CompWithHost]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var childComponent = fixture.debugElement.children[0]
                        .children[0]
                        .children[0]
                        .references['child'];
                    matchers_1.expect(childComponent.myHost).toBeAnInstanceOf(SomeDirective);
                    async.done();
                });
            }));
            testing_internal_1.it('should create a component that injects an @Host through viewcontainer directive', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: "\n            <some-directive>\n              <p *ngIf=\"true\">\n                <cmp-with-host #child></cmp-with-host>\n              </p>\n            </some-directive>",
                    directives: [SomeDirective, CompWithHost, common_1.NgIf]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    var tc = fixture.debugElement.children[0].children[0].children[0];
                    var childComponent = tc.references['child'];
                    matchers_1.expect(childComponent.myHost).toBeAnInstanceOf(SomeDirective);
                    async.done();
                });
            }));
            testing_internal_1.it('should support events via EventEmitter on regular elements', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<div emitter listener></div>',
                    directives: [DirectiveEmittingEvent, DirectiveListeningEvent]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var tc = fixture.debugElement.children[0];
                    var emitter = tc.injector.get(DirectiveEmittingEvent);
                    var listener = tc.injector.get(DirectiveListeningEvent);
                    matchers_1.expect(listener.msg).toEqual('');
                    var eventCount = 0;
                    async_1.ObservableWrapper.subscribe(emitter.event, function (_) {
                        eventCount++;
                        if (eventCount === 1) {
                            matchers_1.expect(listener.msg).toEqual('fired !');
                            fixture.destroy();
                            emitter.fireEvent('fired again !');
                        }
                        else {
                            matchers_1.expect(listener.msg).toEqual('fired !');
                            async.done();
                        }
                    });
                    emitter.fireEvent('fired !');
                });
            }));
            testing_internal_1.it('should support events via EventEmitter on template elements', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<template emitter listener (event)="ctxProp=$event"></template>',
                    directives: [DirectiveEmittingEvent, DirectiveListeningEvent]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var tc = fixture.debugElement.childNodes[0];
                    var emitter = tc.injector.get(DirectiveEmittingEvent);
                    var myComp = fixture.debugElement.injector.get(MyComp);
                    var listener = tc.injector.get(DirectiveListeningEvent);
                    myComp.ctxProp = '';
                    matchers_1.expect(listener.msg).toEqual('');
                    async_1.ObservableWrapper.subscribe(emitter.event, function (_) {
                        matchers_1.expect(listener.msg).toEqual('fired !');
                        matchers_1.expect(myComp.ctxProp).toEqual('fired !');
                        async.done();
                    });
                    emitter.fireEvent('fired !');
                });
            }));
            testing_internal_1.it('should support [()] syntax', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<div [(control)]="ctxProp" two-way></div>',
                    directives: [DirectiveWithTwoWayBinding]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var tc = fixture.debugElement.children[0];
                    var dir = tc.injector.get(DirectiveWithTwoWayBinding);
                    fixture.debugElement.componentInstance.ctxProp = 'one';
                    fixture.detectChanges();
                    matchers_1.expect(dir.control).toEqual('one');
                    async_1.ObservableWrapper.subscribe(dir.controlChange, function (_) {
                        matchers_1.expect(fixture.debugElement.componentInstance.ctxProp).toEqual('two');
                        async.done();
                    });
                    dir.triggerChange('two');
                });
            }));
            testing_internal_1.it('should support render events', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<div listener></div>',
                    directives: [DirectiveListeningDomEvent]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var tc = fixture.debugElement.children[0];
                    var listener = tc.injector.get(DirectiveListeningDomEvent);
                    browser_util_1.dispatchEvent(tc.nativeElement, 'domEvent');
                    matchers_1.expect(listener.eventTypes).toEqual([
                        'domEvent', 'body_domEvent', 'document_domEvent', 'window_domEvent'
                    ]);
                    fixture.destroy();
                    listener.eventTypes = [];
                    browser_util_1.dispatchEvent(tc.nativeElement, 'domEvent');
                    matchers_1.expect(listener.eventTypes).toEqual([]);
                    async.done();
                });
            }));
            testing_internal_1.it('should support render global events', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<div listener></div>',
                    directives: [DirectiveListeningDomEvent]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var tc = fixture.debugElement.children[0];
                    var listener = tc.injector.get(DirectiveListeningDomEvent);
                    browser_util_1.dispatchEvent(dom_adapter_1.getDOM().getGlobalEventTarget('window'), 'domEvent');
                    matchers_1.expect(listener.eventTypes).toEqual(['window_domEvent']);
                    listener.eventTypes = [];
                    browser_util_1.dispatchEvent(dom_adapter_1.getDOM().getGlobalEventTarget('document'), 'domEvent');
                    matchers_1.expect(listener.eventTypes).toEqual(['document_domEvent', 'window_domEvent']);
                    fixture.destroy();
                    listener.eventTypes = [];
                    browser_util_1.dispatchEvent(dom_adapter_1.getDOM().getGlobalEventTarget('body'), 'domEvent');
                    matchers_1.expect(listener.eventTypes).toEqual([]);
                    async.done();
                });
            }));
            testing_internal_1.it('should support updating host element via hostAttributes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<div update-host-attributes></div>',
                    directives: [DirectiveUpdatingHostAttributes]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM().getAttribute(fixture.debugElement.children[0].nativeElement, 'role'))
                        .toEqual('button');
                    async.done();
                });
            }));
            testing_internal_1.it('should support updating host element via hostProperties', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<div update-host-properties></div>',
                    directives: [DirectiveUpdatingHostProperties]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var tc = fixture.debugElement.children[0];
                    var updateHost = tc.injector.get(DirectiveUpdatingHostProperties);
                    updateHost.id = 'newId';
                    fixture.detectChanges();
                    matchers_1.expect(tc.nativeElement.id).toEqual('newId');
                    async.done();
                });
            }));
            if (dom_adapter_1.getDOM().supportsDOMEvents()) {
                testing_internal_1.it('should support preventing default on render events', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<input type="checkbox" listenerprevent><input type="checkbox" listenernoprevent>',
                        directives: [
                            DirectiveListeningDomEventPrevent, DirectiveListeningDomEventNoPrevent
                        ]
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        var dispatchedEvent = dom_adapter_1.getDOM().createMouseEvent('click');
                        var dispatchedEvent2 = dom_adapter_1.getDOM().createMouseEvent('click');
                        dom_adapter_1.getDOM().dispatchEvent(fixture.debugElement.children[0].nativeElement, dispatchedEvent);
                        dom_adapter_1.getDOM().dispatchEvent(fixture.debugElement.children[1].nativeElement, dispatchedEvent2);
                        matchers_1.expect(dom_adapter_1.getDOM().isPrevented(dispatchedEvent)).toBe(true);
                        matchers_1.expect(dom_adapter_1.getDOM().isPrevented(dispatchedEvent2)).toBe(false);
                        matchers_1.expect(dom_adapter_1.getDOM().getChecked(fixture.debugElement.children[0].nativeElement))
                            .toBeFalsy();
                        matchers_1.expect(dom_adapter_1.getDOM().getChecked(fixture.debugElement.children[1].nativeElement))
                            .toBeTruthy();
                        async.done();
                    });
                }));
            }
            testing_internal_1.it('should support render global events from multiple directives', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<div *ngIf="ctxBoolProp" listener listenerother></div>',
                    directives: [common_1.NgIf, DirectiveListeningDomEvent, DirectiveListeningDomEventOther]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    globalCounter = 0;
                    fixture.debugElement.componentInstance.ctxBoolProp = true;
                    fixture.detectChanges();
                    var tc = fixture.debugElement.children[0];
                    var listener = tc.injector.get(DirectiveListeningDomEvent);
                    var listenerother = tc.injector.get(DirectiveListeningDomEventOther);
                    browser_util_1.dispatchEvent(dom_adapter_1.getDOM().getGlobalEventTarget('window'), 'domEvent');
                    matchers_1.expect(listener.eventTypes).toEqual(['window_domEvent']);
                    matchers_1.expect(listenerother.eventType).toEqual('other_domEvent');
                    matchers_1.expect(globalCounter).toEqual(1);
                    fixture.debugElement.componentInstance.ctxBoolProp = false;
                    fixture.detectChanges();
                    browser_util_1.dispatchEvent(dom_adapter_1.getDOM().getGlobalEventTarget('window'), 'domEvent');
                    matchers_1.expect(globalCounter).toEqual(1);
                    fixture.debugElement.componentInstance.ctxBoolProp = true;
                    fixture.detectChanges();
                    browser_util_1.dispatchEvent(dom_adapter_1.getDOM().getGlobalEventTarget('window'), 'domEvent');
                    matchers_1.expect(globalCounter).toEqual(2);
                    // need to destroy to release all remaining global event listeners
                    fixture.destroy();
                    async.done();
                });
            }));
            testing_internal_1.describe('dynamic ViewContainers', function () {
                testing_internal_1.it('should allow to create a ViewContainerRef at any bound location', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter, component_resolver_1.ComponentResolver], function (tcb, async, compiler) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<div><dynamic-vp #dynamic></dynamic-vp></div>',
                        directives: [DynamicViewport]
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        var tc = fixture.debugElement.children[0].children[0];
                        var dynamicVp = tc.injector.get(DynamicViewport);
                        dynamicVp.done.then(function (_) {
                            fixture.detectChanges();
                            matchers_1.expect(fixture.debugElement.children[0].children[1].nativeElement)
                                .toHaveText('dynamic greet');
                            async.done();
                        });
                    });
                }));
            });
            testing_internal_1.it('should support static attributes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<input static type="text" title>',
                    directives: [NeedsAttribute]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var tc = fixture.debugElement.children[0];
                    var needsAttribute = tc.injector.get(NeedsAttribute);
                    matchers_1.expect(needsAttribute.typeAttribute).toEqual('text');
                    matchers_1.expect(needsAttribute.staticAttribute).toEqual('');
                    matchers_1.expect(needsAttribute.fooAttribute).toEqual(null);
                    async.done();
                });
            }));
            testing_internal_1.it('should support custom interpolation', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: "<div>{{ctxProp}}</div>\n<cmp-with-custom-interpolation-a></cmp-with-custom-interpolation-a>\n<cmp-with-custom-interpolation-b></cmp-with-custom-interpolation-b>",
                    directives: [
                        ComponentWithCustomInterpolationA, ComponentWithCustomInterpolationB
                    ]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxProp = 'Default Interpolation';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement)
                        .toHaveText('Default Interpolation\nCustom Interpolation A\nCustom Interpolation B (Default Interpolation)');
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('dependency injection', function () {
            testing_internal_1.it('should support bindings', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: "\n            <directive-providing-injectable >\n              <directive-consuming-injectable #consuming>\n              </directive-consuming-injectable>\n            </directive-providing-injectable>\n          ",
                    directives: [DirectiveProvidingInjectable, DirectiveConsumingInjectable]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var comp = fixture.debugElement.children[0].children[0].references['consuming'];
                    matchers_1.expect(comp.injectable).toBeAnInstanceOf(InjectableService);
                    async.done();
                });
            }));
            testing_internal_1.it('should support viewProviders', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(DirectiveProvidingInjectableInView, new metadata_1.ViewMetadata({
                    template: "\n              <directive-consuming-injectable #consuming>\n              </directive-consuming-injectable>\n          ",
                    directives: [DirectiveConsumingInjectable]
                }))
                    .createAsync(DirectiveProvidingInjectableInView)
                    .then(function (fixture) {
                    var comp = fixture.debugElement.children[0].references['consuming'];
                    matchers_1.expect(comp.injectable).toBeAnInstanceOf(InjectableService);
                    async.done();
                });
            }));
            testing_internal_1.it('should support unbounded lookup', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: "\n            <directive-providing-injectable>\n              <directive-containing-directive-consuming-an-injectable #dir>\n              </directive-containing-directive-consuming-an-injectable>\n            </directive-providing-injectable>\n          ",
                    directives: [
                        DirectiveProvidingInjectable,
                        DirectiveContainingDirectiveConsumingAnInjectable
                    ]
                }))
                    .overrideView(DirectiveContainingDirectiveConsumingAnInjectable, new metadata_1.ViewMetadata({
                    template: "\n            <directive-consuming-injectable-unbounded></directive-consuming-injectable-unbounded>\n          ",
                    directives: [DirectiveConsumingInjectableUnbounded]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var comp = fixture.debugElement.children[0].children[0].references['dir'];
                    matchers_1.expect(comp.directive.injectable).toBeAnInstanceOf(InjectableService);
                    async.done();
                });
            }));
            testing_internal_1.it('should support the event-bus scenario', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: "\n            <grand-parent-providing-event-bus>\n              <parent-providing-event-bus>\n                <child-consuming-event-bus>\n                </child-consuming-event-bus>\n              </parent-providing-event-bus>\n            </grand-parent-providing-event-bus>\n          ",
                    directives: [
                        GrandParentProvidingEventBus, ParentProvidingEventBus,
                        ChildConsumingEventBus
                    ]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var gpComp = fixture.debugElement.children[0];
                    var parentComp = gpComp.children[0];
                    var childComp = parentComp.children[0];
                    var grandParent = gpComp.injector.get(GrandParentProvidingEventBus);
                    var parent = parentComp.injector.get(ParentProvidingEventBus);
                    var child = childComp.injector.get(ChildConsumingEventBus);
                    matchers_1.expect(grandParent.bus.name).toEqual('grandparent');
                    matchers_1.expect(parent.bus.name).toEqual('parent');
                    matchers_1.expect(parent.grandParentBus).toBe(grandParent.bus);
                    matchers_1.expect(child.bus).toBe(parent.bus);
                    async.done();
                });
            }));
            testing_internal_1.it('should instantiate bindings lazily', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: "\n              <component-providing-logging-injectable #providing>\n                <directive-consuming-injectable *ngIf=\"ctxBoolProp\">\n                </directive-consuming-injectable>\n              </component-providing-logging-injectable>\n          ",
                    directives: [
                        DirectiveConsumingInjectable, ComponentProvidingLoggingInjectable, common_1.NgIf
                    ]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    var providing = fixture.debugElement.children[0].references['providing'];
                    matchers_1.expect(providing.created).toBe(false);
                    fixture.debugElement.componentInstance.ctxBoolProp = true;
                    fixture.detectChanges();
                    matchers_1.expect(providing.created).toBe(true);
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('corner cases', function () {
            testing_internal_1.it('should remove script tags from templates', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: "\n            <script>alert(\"Ooops\");</script>\n            <div>before<script>alert(\"Ooops\");</script><span>inside</span>after</div>"
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    matchers_1.expect(dom_adapter_1.getDOM()
                        .querySelectorAll(fixture.debugElement.nativeElement, 'script')
                        .length)
                        .toEqual(0);
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('error handling', function () {
            testing_internal_1.it('should report a meaningful error when a directive is missing annotation', testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                tcb = tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '', directives: [SomeDirectiveMissingAnnotation] }));
                matchers_1.expect(function () { return tcb.createAsync(MyComp); })
                    .toThrowError("No Directive annotation found on " + lang_1.stringify(SomeDirectiveMissingAnnotation));
            }));
            testing_internal_1.it('should report a meaningful error when a component is missing view annotation', testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                try {
                    tcb.createAsync(ComponentWithoutView);
                    matchers_1.expect(true).toBe(false);
                }
                catch (e) {
                    matchers_1.expect(e.message).toContain("must have either 'template' or 'templateUrl' set.");
                }
            }));
            testing_internal_1.it('should report a meaningful error when a directive is null', testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                tcb = tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ directives: [[null]], template: '' }));
                matchers_1.expect(function () { return tcb.createAsync(MyComp); })
                    .toThrowError("Unexpected directive value 'null' on the View of component '" + lang_1.stringify(MyComp) + "'");
            }));
            testing_internal_1.it('should provide an error context when an error happens in DI', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb = tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    directives: [DirectiveThrowingAnError],
                    template: "<directive-throwing-error></directive-throwing-error>"
                }));
                async_1.PromiseWrapper.catchError(tcb.createAsync(MyComp), function (e) {
                    var c = e.context;
                    matchers_1.expect(dom_adapter_1.getDOM().nodeName(c.componentRenderElement).toUpperCase()).toEqual('DIV');
                    matchers_1.expect(c.injector.get).toBeTruthy();
                    async.done();
                    return null;
                });
            }));
            testing_internal_1.it('should provide an error context when an error happens in change detection', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb = tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: "<input [value]=\"one.two.three\" #local>" }));
                tcb.createAsync(MyComp).then(function (fixture) {
                    try {
                        fixture.detectChanges();
                        throw 'Should throw';
                    }
                    catch (e) {
                        var c = e.context;
                        matchers_1.expect(dom_adapter_1.getDOM().nodeName(c.renderNode).toUpperCase()).toEqual('INPUT');
                        matchers_1.expect(dom_adapter_1.getDOM().nodeName(c.componentRenderElement).toUpperCase()).toEqual('DIV');
                        matchers_1.expect(c.injector.get).toBeTruthy();
                        matchers_1.expect(c.source).toContain(':0:7');
                        matchers_1.expect(c.context).toBe(fixture.debugElement.componentInstance);
                        matchers_1.expect(c.references['local']).toBeDefined();
                    }
                    async.done();
                });
            }));
            testing_internal_1.it('should provide an error context when an error happens in change detection (text node)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb = tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: "<div>{{one.two.three}}</div>" }));
                tcb.createAsync(MyComp).then(function (fixture) {
                    try {
                        fixture.detectChanges();
                        throw 'Should throw';
                    }
                    catch (e) {
                        var c = e.context;
                        matchers_1.expect(c.renderNode).toBeTruthy();
                        matchers_1.expect(c.source).toContain(':0:5');
                    }
                    async.done();
                });
            }));
            if (dom_adapter_1.getDOM().supportsDOMEvents()) {
                testing_internal_1.it('should provide an error context when an error happens in an event handler', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                    tcb = tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: "<span emitter listener (event)=\"throwError()\" #local></span>",
                        directives: [DirectiveEmittingEvent, DirectiveListeningEvent]
                    }));
                    var fixture = tcb.createFakeAsync(MyComp);
                    testing_1.tick();
                    var tc = fixture.debugElement.children[0];
                    try {
                        tc.injector.get(DirectiveEmittingEvent).fireEvent('boom');
                    }
                    catch (e) {
                        var c = e.context;
                        matchers_1.expect(dom_adapter_1.getDOM().nodeName(c.renderNode).toUpperCase()).toEqual('SPAN');
                        matchers_1.expect(dom_adapter_1.getDOM().nodeName(c.componentRenderElement).toUpperCase()).toEqual('DIV');
                        matchers_1.expect(c.injector.get).toBeTruthy();
                        matchers_1.expect(c.context).toBe(fixture.debugElement.componentInstance);
                        matchers_1.expect(c.references['local']).toBeDefined();
                    }
                })));
            }
            testing_internal_1.it('should report a meaningful error when a directive is undefined', testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var undefinedValue = void (0);
                tcb = tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ directives: [undefinedValue], template: '' }));
                matchers_1.expect(function () { return tcb.createAsync(MyComp); })
                    .toThrowError("Unexpected directive value 'undefined' on the View of component '" + lang_1.stringify(MyComp) + "'");
            }));
            testing_internal_1.it('should specify a location of an error that happened during change detection (text)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<div>{{a.b}}</div>' }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    matchers_1.expect(function () { return fixture.detectChanges(); }).toThrowError(/:0:5/);
                    async.done();
                });
            }));
            testing_internal_1.it('should specify a location of an error that happened during change detection (element property)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<div [title]="a.b"></div>' }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    matchers_1.expect(function () { return fixture.detectChanges(); }).toThrowError(/:0:5/);
                    async.done();
                });
            }));
            testing_internal_1.it('should specify a location of an error that happened during change detection (directive property)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<child-cmp [title]="a.b"></child-cmp>',
                    directives: [ChildComp]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    matchers_1.expect(function () { return fixture.detectChanges(); }).toThrowError(/:0:11/);
                    async.done();
                });
            }));
        });
        testing_internal_1.it('should support imperative views', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                template: '<simple-imp-cmp></simple-imp-cmp>',
                directives: [SimpleImperativeViewComponent]
            }))
                .createAsync(MyComp)
                .then(function (fixture) {
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello imp view');
                async.done();
            });
        }));
        testing_internal_1.it('should support moving embedded views around', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter, ANCHOR_ELEMENT], function (tcb, async, anchorElement) {
            tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                template: '<div><div *someImpvp="ctxBoolProp">hello</div></div>',
                directives: [SomeImperativeViewport]
            }))
                .createAsync(MyComp)
                .then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(anchorElement).toHaveText('');
                fixture.debugElement.componentInstance.ctxBoolProp = true;
                fixture.detectChanges();
                matchers_1.expect(anchorElement).toHaveText('hello');
                fixture.debugElement.componentInstance.ctxBoolProp = false;
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
                async.done();
            });
        }));
        testing_internal_1.describe('Property bindings', function () {
            testing_internal_1.it('should throw on bindings to unknown properties', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb = tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<div unknown="{{ctxProp}}"></div>' }));
                async_1.PromiseWrapper.catchError(tcb.createAsync(MyComp), function (e) {
                    matchers_1.expect(e.message).toEqual("Template parse errors:\nCan't bind to 'unknown' since it isn't a known native property (\"<div [ERROR ->]unknown=\"{{ctxProp}}\"></div>\"): MyComp@0:5");
                    async.done();
                    return null;
                });
            }));
            testing_internal_1.it('should not throw for property binding to a non-existing property when there is a matching directive property', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<div my-dir [elprop]="ctxProp"></div>', directives: [MyDir] }))
                    .createAsync(MyComp)
                    .then(function (val) { async.done(); });
            }));
            testing_internal_1.it('should not be created when there is a directive with the same property', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<span [title]="ctxProp"></span>',
                    directives: [DirectiveWithTitle]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxProp = 'TITLE';
                    fixture.detectChanges();
                    var el = dom_adapter_1.getDOM().querySelector(fixture.debugElement.nativeElement, 'span');
                    matchers_1.expect(lang_1.isBlank(el.title) || el.title == '').toBeTruthy();
                    async.done();
                });
            }));
            testing_internal_1.it('should work when a directive uses hostProperty to update the DOM element', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<span [title]="ctxProp"></span>',
                    directives: [DirectiveWithTitleAndHostProperty]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxProp = 'TITLE';
                    fixture.detectChanges();
                    var el = dom_adapter_1.getDOM().querySelector(fixture.debugElement.nativeElement, 'span');
                    matchers_1.expect(el.title).toEqual('TITLE');
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('logging property updates', function () {
            testing_internal_1.it('should reflect property values as attributes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var tpl = '<div>' +
                    '<div my-dir [elprop]="ctxProp"></div>' +
                    '</div>';
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: tpl, directives: [MyDir] }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxProp = 'hello';
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM().getInnerHTML(fixture.debugElement.nativeElement))
                        .toContain('ng-reflect-dir-prop="hello"');
                    async.done();
                });
            }));
            testing_internal_1.it('should reflect property values on template comments', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var tpl = '<template [ngIf]="ctxBoolProp"></template>';
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: tpl, directives: [common_1.NgIf] }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.ctxBoolProp = true;
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM().getInnerHTML(fixture.debugElement.nativeElement))
                        .toContain('"ng\-reflect\-ng\-if"\: "true"');
                    async.done();
                });
            }));
            testing_internal_1.it('should indicate when toString() throws', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var tpl = '<div my-dir [elprop]="toStringThrow"></div>';
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: tpl, directives: [MyDir] }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM().getInnerHTML(fixture.debugElement.nativeElement))
                        .toContain('[ERROR]');
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('property decorators', function () {
            testing_internal_1.it('should support property decorators', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<with-prop-decorators elProp="aaa"></with-prop-decorators>',
                    directives: [DirectiveWithPropDecorators]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    var dir = fixture.debugElement.children[0].injector.get(DirectiveWithPropDecorators);
                    matchers_1.expect(dir.dirProp).toEqual('aaa');
                    async.done();
                });
            }));
            testing_internal_1.it('should support host binding decorators', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<with-prop-decorators></with-prop-decorators>',
                    directives: [DirectiveWithPropDecorators]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    var dir = fixture.debugElement.children[0].injector.get(DirectiveWithPropDecorators);
                    dir.myAttr = 'aaa';
                    fixture.detectChanges();
                    matchers_1.expect(dom_adapter_1.getDOM().getOuterHTML(fixture.debugElement.children[0].nativeElement))
                        .toContain('my-attr="aaa"');
                    async.done();
                });
            }));
            if (dom_adapter_1.getDOM().supportsDOMEvents()) {
                testing_internal_1.it('should support event decorators', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                    tcb =
                        tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                            template: "<with-prop-decorators (elEvent)=\"ctxProp='called'\">",
                            directives: [DirectiveWithPropDecorators]
                        }));
                    var fixture = tcb.createFakeAsync(MyComp);
                    testing_1.tick();
                    var emitter = fixture.debugElement.children[0].injector.get(DirectiveWithPropDecorators);
                    emitter.fireEvent('fired !');
                    testing_1.tick();
                    matchers_1.expect(fixture.debugElement.componentInstance.ctxProp).toEqual('called');
                })));
                testing_internal_1.it('should support host listener decorators', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<with-prop-decorators></with-prop-decorators>',
                        directives: [DirectiveWithPropDecorators]
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        fixture.detectChanges();
                        var dir = fixture.debugElement.children[0].injector.get(DirectiveWithPropDecorators);
                        var native = fixture.debugElement.children[0].nativeElement;
                        dom_adapter_1.getDOM().dispatchEvent(native, dom_adapter_1.getDOM().createMouseEvent('click'));
                        matchers_1.expect(dir.target).toBe(native);
                        async.done();
                    });
                }));
            }
            testing_internal_1.it('should support defining views in the component decorator', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                    template: '<component-with-template></component-with-template>',
                    directives: [ComponentWithTemplate]
                }))
                    .createAsync(MyComp)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    var native = fixture.debugElement.children[0].nativeElement;
                    matchers_1.expect(native).toHaveText('No View Decorator: 123');
                    async.done();
                });
            }));
        });
        if (dom_adapter_1.getDOM().supportsDOMEvents()) {
            testing_internal_1.describe('svg', function () {
                testing_internal_1.it('should support svg elements', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({ template: '<svg><use xlink:href="Port" /></svg>' }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        var el = fixture.debugElement.nativeElement;
                        var svg = dom_adapter_1.getDOM().childNodes(el)[0];
                        var use = dom_adapter_1.getDOM().childNodes(svg)[0];
                        matchers_1.expect(dom_adapter_1.getDOM().getProperty(svg, 'namespaceURI'))
                            .toEqual('http://www.w3.org/2000/svg');
                        matchers_1.expect(dom_adapter_1.getDOM().getProperty(use, 'namespaceURI'))
                            .toEqual('http://www.w3.org/2000/svg');
                        var firstAttribute = dom_adapter_1.getDOM().getProperty(use, 'attributes')[0];
                        matchers_1.expect(firstAttribute.name).toEqual('xlink:href');
                        matchers_1.expect(firstAttribute.namespaceURI).toEqual('http://www.w3.org/1999/xlink');
                        async.done();
                    });
                }));
                testing_internal_1.it('should support foreignObjects with document fragments', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(MyComp, new metadata_1.ViewMetadata({
                        template: '<svg><foreignObject><xhtml:div><p>Test</p></xhtml:div></foreignObject></svg>'
                    }))
                        .createAsync(MyComp)
                        .then(function (fixture) {
                        var el = fixture.debugElement.nativeElement;
                        var svg = dom_adapter_1.getDOM().childNodes(el)[0];
                        var foreignObject = dom_adapter_1.getDOM().childNodes(svg)[0];
                        var p = dom_adapter_1.getDOM().childNodes(foreignObject)[0];
                        matchers_1.expect(dom_adapter_1.getDOM().getProperty(svg, 'namespaceURI'))
                            .toEqual('http://www.w3.org/2000/svg');
                        matchers_1.expect(dom_adapter_1.getDOM().getProperty(foreignObject, 'namespaceURI'))
                            .toEqual('http://www.w3.org/2000/svg');
                        matchers_1.expect(dom_adapter_1.getDOM().getProperty(p, 'namespaceURI'))
                            .toEqual('http://www.w3.org/1999/xhtml');
                        async.done();
                    });
                }));
            });
            testing_internal_1.describe('attributes', function () {
                testing_internal_1.it('should support attributes with namespace', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(SomeCmp, new metadata_1.ViewMetadata({ template: '<svg:use xlink:href="#id" />' }))
                        .createAsync(SomeCmp)
                        .then(function (fixture) {
                        var useEl = dom_adapter_1.getDOM().firstChild(fixture.debugElement.nativeElement);
                        matchers_1.expect(dom_adapter_1.getDOM().getAttributeNS(useEl, 'http://www.w3.org/1999/xlink', 'href'))
                            .toEqual('#id');
                        async.done();
                    });
                }));
                testing_internal_1.it('should support binding to attributes with namespace', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.overrideView(SomeCmp, new metadata_1.ViewMetadata({ template: '<svg:use [attr.xlink:href]="value" />' }))
                        .createAsync(SomeCmp)
                        .then(function (fixture) {
                        var cmp = fixture.debugElement.componentInstance;
                        var useEl = dom_adapter_1.getDOM().firstChild(fixture.debugElement.nativeElement);
                        cmp.value = '#id';
                        fixture.detectChanges();
                        matchers_1.expect(dom_adapter_1.getDOM().getAttributeNS(useEl, 'http://www.w3.org/1999/xlink', 'href'))
                            .toEqual('#id');
                        cmp.value = null;
                        fixture.detectChanges();
                        matchers_1.expect(dom_adapter_1.getDOM().hasAttributeNS(useEl, 'http://www.w3.org/1999/xlink', 'href'))
                            .toEqual(false);
                        async.done();
                    });
                }));
            });
        }
    });
}
var ComponentWithDefaultInterpolation = (function () {
    function ComponentWithDefaultInterpolation() {
        this.text = 'Default Interpolation';
    }
    /** @nocollapse */
    ComponentWithDefaultInterpolation.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'cmp-with-default-interpolation', template: "{{text}}" },] },
    ];
    return ComponentWithDefaultInterpolation;
}());
var ComponentWithCustomInterpolationA = (function () {
    function ComponentWithCustomInterpolationA() {
        this.text = 'Custom Interpolation A';
    }
    /** @nocollapse */
    ComponentWithCustomInterpolationA.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'cmp-with-custom-interpolation-a',
                    template: "<div>{%text%}</div>",
                    interpolation: ['{%', '%}']
                },] },
    ];
    return ComponentWithCustomInterpolationA;
}());
var ComponentWithCustomInterpolationB = (function () {
    function ComponentWithCustomInterpolationB() {
        this.text = 'Custom Interpolation B';
    }
    /** @nocollapse */
    ComponentWithCustomInterpolationB.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'cmp-with-custom-interpolation-b',
                    template: "<div>{**text%}</div> (<cmp-with-default-interpolation></cmp-with-default-interpolation>)",
                    interpolation: ['{**', '%}'],
                    directives: [ComponentWithDefaultInterpolation]
                },] },
    ];
    return ComponentWithCustomInterpolationB;
}());
var MyService = (function () {
    function MyService() {
        this.greeting = 'hello';
    }
    /** @nocollapse */
    MyService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MyService.ctorParameters = [];
    return MyService;
}());
var SimpleImperativeViewComponent = (function () {
    function SimpleImperativeViewComponent(self, renderer) {
        var hostElement = self.nativeElement;
        dom_adapter_1.getDOM().appendChild(hostElement, browser_util_1.el('hello imp view'));
    }
    /** @nocollapse */
    SimpleImperativeViewComponent.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'simple-imp-cmp', template: '' },] },
    ];
    /** @nocollapse */
    SimpleImperativeViewComponent.ctorParameters = [
        { type: element_ref_1.ElementRef, },
        { type: render_1.Renderer, },
    ];
    return SimpleImperativeViewComponent;
}());
var DynamicViewport = (function () {
    function DynamicViewport(vc, compiler) {
        var myService = new MyService();
        myService.greeting = 'dynamic greet';
        var injector = core_1.ReflectiveInjector.resolveAndCreate([{ provide: MyService, useValue: myService }], vc.injector);
        this.done = compiler.resolveComponent(ChildCompUsingService)
            .then(function (componentFactory) { return vc.createComponent(componentFactory, 0, injector); });
    }
    /** @nocollapse */
    DynamicViewport.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'dynamic-vp' },] },
    ];
    /** @nocollapse */
    DynamicViewport.ctorParameters = [
        { type: view_container_ref_1.ViewContainerRef, },
        { type: component_resolver_1.ComponentResolver, },
    ];
    return DynamicViewport;
}());
var MyDir = (function () {
    function MyDir() {
        this.dirProp = '';
    }
    /** @nocollapse */
    MyDir.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[my-dir]', inputs: ['dirProp: elprop'], exportAs: 'mydir' },] },
    ];
    /** @nocollapse */
    MyDir.ctorParameters = [];
    return MyDir;
}());
var DirectiveWithTitle = (function () {
    function DirectiveWithTitle() {
    }
    /** @nocollapse */
    DirectiveWithTitle.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[title]', inputs: ['title'] },] },
    ];
    return DirectiveWithTitle;
}());
var DirectiveWithTitleAndHostProperty = (function () {
    function DirectiveWithTitleAndHostProperty() {
    }
    /** @nocollapse */
    DirectiveWithTitleAndHostProperty.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[title]', inputs: ['title'], host: { '[title]': 'title' } },] },
    ];
    return DirectiveWithTitleAndHostProperty;
}());
var EventCmp = (function () {
    function EventCmp() {
    }
    EventCmp.prototype.noop = function () { };
    /** @nocollapse */
    EventCmp.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'event-cmp', template: '<div (click)="noop()"></div>' },] },
    ];
    return EventCmp;
}());
var PushCmp = (function () {
    function PushCmp() {
        this.numberOfChecks = 0;
    }
    PushCmp.prototype.noop = function () { };
    Object.defineProperty(PushCmp.prototype, "field", {
        get: function () {
            this.numberOfChecks++;
            return 'fixed';
        },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    PushCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'push-cmp',
                    inputs: ['prop'],
                    changeDetection: change_detection_1.ChangeDetectionStrategy.OnPush,
                    template: '{{field}}<div (click)="noop()"></div><div *ngIf="true" (click)="noop()"></div><event-cmp></event-cmp>',
                    directives: [EventCmp, common_1.NgIf]
                },] },
    ];
    /** @nocollapse */
    PushCmp.ctorParameters = [];
    return PushCmp;
}());
var PushCmpWithRef = (function () {
    function PushCmpWithRef(ref) {
        this.numberOfChecks = 0;
        this.ref = ref;
    }
    Object.defineProperty(PushCmpWithRef.prototype, "field", {
        get: function () {
            this.numberOfChecks++;
            return 'fixed';
        },
        enumerable: true,
        configurable: true
    });
    PushCmpWithRef.prototype.propagate = function () { this.ref.markForCheck(); };
    /** @nocollapse */
    PushCmpWithRef.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'push-cmp-with-ref',
                    inputs: ['prop'],
                    changeDetection: change_detection_1.ChangeDetectionStrategy.OnPush,
                    template: '{{field}}'
                },] },
    ];
    /** @nocollapse */
    PushCmpWithRef.ctorParameters = [
        { type: change_detection_1.ChangeDetectorRef, },
    ];
    return PushCmpWithRef;
}());
var PushCmpWithHostEvent = (function () {
    function PushCmpWithHostEvent() {
        this.ctxCallback = function (_) { };
    }
    /** @nocollapse */
    PushCmpWithHostEvent.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'push-cmp-with-host-event',
                    host: { '(click)': 'ctxCallback($event)' },
                    changeDetection: change_detection_1.ChangeDetectionStrategy.OnPush,
                    template: ''
                },] },
    ];
    return PushCmpWithHostEvent;
}());
var PushCmpWithAsyncPipe = (function () {
    function PushCmpWithAsyncPipe() {
        this.numberOfChecks = 0;
        this.completer = async_1.PromiseWrapper.completer();
        this.promise = this.completer.promise;
    }
    Object.defineProperty(PushCmpWithAsyncPipe.prototype, "field", {
        get: function () {
            this.numberOfChecks++;
            return this.promise;
        },
        enumerable: true,
        configurable: true
    });
    PushCmpWithAsyncPipe.prototype.resolve = function (value) { this.completer.resolve(value); };
    /** @nocollapse */
    PushCmpWithAsyncPipe.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'push-cmp-with-async',
                    changeDetection: change_detection_1.ChangeDetectionStrategy.OnPush,
                    template: '{{field | async}}',
                    pipes: [common_1.AsyncPipe]
                },] },
    ];
    /** @nocollapse */
    PushCmpWithAsyncPipe.ctorParameters = [];
    return PushCmpWithAsyncPipe;
}());
var MyComp = (function () {
    function MyComp() {
        this.toStringThrow = { toString: function () { throw 'boom'; } };
        this.ctxProp = 'initial value';
        this.ctxNumProp = 0;
        this.ctxBoolProp = false;
    }
    MyComp.prototype.throwError = function () { throw 'boom'; };
    /** @nocollapse */
    MyComp.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'my-comp', directives: [] },] },
    ];
    /** @nocollapse */
    MyComp.ctorParameters = [];
    return MyComp;
}());
var ChildComp = (function () {
    function ChildComp(service) {
        this.ctxProp = service.greeting;
        this.dirProp = null;
    }
    /** @nocollapse */
    ChildComp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'child-cmp',
                    inputs: ['dirProp'],
                    viewProviders: [MyService],
                    directives: [MyDir],
                    template: '{{ctxProp}}'
                },] },
    ];
    /** @nocollapse */
    ChildComp.ctorParameters = [
        { type: MyService, },
    ];
    return ChildComp;
}());
var ChildCompNoTemplate = (function () {
    function ChildCompNoTemplate() {
        this.ctxProp = 'hello';
    }
    /** @nocollapse */
    ChildCompNoTemplate.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'child-cmp-no-template', directives: [], template: '' },] },
    ];
    return ChildCompNoTemplate;
}());
var ChildCompUsingService = (function () {
    function ChildCompUsingService(service) {
        this.ctxProp = service.greeting;
    }
    /** @nocollapse */
    ChildCompUsingService.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'child-cmp-svc', template: '{{ctxProp}}' },] },
    ];
    /** @nocollapse */
    ChildCompUsingService.ctorParameters = [
        { type: MyService, },
    ];
    return ChildCompUsingService;
}());
var SomeDirective = (function () {
    function SomeDirective() {
    }
    /** @nocollapse */
    SomeDirective.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'some-directive' },] },
    ];
    return SomeDirective;
}());
var SomeDirectiveMissingAnnotation = (function () {
    function SomeDirectiveMissingAnnotation() {
    }
    return SomeDirectiveMissingAnnotation;
}());
var CompWithHost = (function () {
    function CompWithHost(someComp) {
        this.myHost = someComp;
    }
    /** @nocollapse */
    CompWithHost.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'cmp-with-host',
                    template: '<p>Component with an injected host</p>',
                    directives: [SomeDirective]
                },] },
    ];
    /** @nocollapse */
    CompWithHost.ctorParameters = [
        { type: SomeDirective, decorators: [{ type: core_1.Host },] },
    ];
    return CompWithHost;
}());
var ChildComp2 = (function () {
    function ChildComp2(service) {
        this.ctxProp = service.greeting;
        this.dirProp = null;
    }
    /** @nocollapse */
    ChildComp2.decorators = [
        { type: metadata_1.Component, args: [{ selector: '[child-cmp2]', viewProviders: [MyService] },] },
    ];
    /** @nocollapse */
    ChildComp2.ctorParameters = [
        { type: MyService, },
    ];
    return ChildComp2;
}());
var SomeViewportContext = (function () {
    function SomeViewportContext(someTmpl) {
        this.someTmpl = someTmpl;
    }
    return SomeViewportContext;
}());
var SomeViewport = (function () {
    function SomeViewport(container, templateRef) {
        this.container = container;
        container.createEmbeddedView(templateRef, new SomeViewportContext('hello'));
        container.createEmbeddedView(templateRef, new SomeViewportContext('again'));
    }
    /** @nocollapse */
    SomeViewport.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[some-viewport]' },] },
    ];
    /** @nocollapse */
    SomeViewport.ctorParameters = [
        { type: view_container_ref_1.ViewContainerRef, },
        { type: template_ref_1.TemplateRef, },
    ];
    return SomeViewport;
}());
var DoublePipe = (function () {
    function DoublePipe() {
    }
    DoublePipe.prototype.ngOnDestroy = function () { };
    DoublePipe.prototype.transform = function (value) { return "" + value + value; };
    /** @nocollapse */
    DoublePipe.decorators = [
        { type: metadata_1.Pipe, args: [{ name: 'double' },] },
    ];
    return DoublePipe;
}());
var DirectiveEmittingEvent = (function () {
    function DirectiveEmittingEvent() {
        this.msg = '';
        this.event = new async_1.EventEmitter();
    }
    DirectiveEmittingEvent.prototype.fireEvent = function (msg) { async_1.ObservableWrapper.callEmit(this.event, msg); };
    /** @nocollapse */
    DirectiveEmittingEvent.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[emitter]', outputs: ['event'] },] },
    ];
    /** @nocollapse */
    DirectiveEmittingEvent.ctorParameters = [];
    return DirectiveEmittingEvent;
}());
var DirectiveUpdatingHostAttributes = (function () {
    function DirectiveUpdatingHostAttributes() {
    }
    /** @nocollapse */
    DirectiveUpdatingHostAttributes.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[update-host-attributes]', host: { 'role': 'button' } },] },
    ];
    return DirectiveUpdatingHostAttributes;
}());
var DirectiveUpdatingHostProperties = (function () {
    function DirectiveUpdatingHostProperties() {
        this.id = 'one';
    }
    /** @nocollapse */
    DirectiveUpdatingHostProperties.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[update-host-properties]', host: { '[id]': 'id' } },] },
    ];
    /** @nocollapse */
    DirectiveUpdatingHostProperties.ctorParameters = [];
    return DirectiveUpdatingHostProperties;
}());
var DirectiveListeningEvent = (function () {
    function DirectiveListeningEvent() {
        this.msg = '';
    }
    DirectiveListeningEvent.prototype.onEvent = function (msg) { this.msg = msg; };
    /** @nocollapse */
    DirectiveListeningEvent.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[listener]', host: { '(event)': 'onEvent($event)' } },] },
    ];
    /** @nocollapse */
    DirectiveListeningEvent.ctorParameters = [];
    return DirectiveListeningEvent;
}());
var DirectiveListeningDomEvent = (function () {
    function DirectiveListeningDomEvent() {
        this.eventTypes = [];
    }
    DirectiveListeningDomEvent.prototype.onEvent = function (eventType) { this.eventTypes.push(eventType); };
    DirectiveListeningDomEvent.prototype.onWindowEvent = function (eventType) { this.eventTypes.push('window_' + eventType); };
    DirectiveListeningDomEvent.prototype.onDocumentEvent = function (eventType) { this.eventTypes.push('document_' + eventType); };
    DirectiveListeningDomEvent.prototype.onBodyEvent = function (eventType) { this.eventTypes.push('body_' + eventType); };
    /** @nocollapse */
    DirectiveListeningDomEvent.decorators = [
        { type: metadata_1.Directive, args: [{
                    selector: '[listener]',
                    host: {
                        '(domEvent)': 'onEvent($event.type)',
                        '(window:domEvent)': 'onWindowEvent($event.type)',
                        '(document:domEvent)': 'onDocumentEvent($event.type)',
                        '(body:domEvent)': 'onBodyEvent($event.type)'
                    }
                },] },
    ];
    return DirectiveListeningDomEvent;
}());
var globalCounter = 0;
var DirectiveListeningDomEventOther = (function () {
    function DirectiveListeningDomEventOther() {
        this.eventType = '';
    }
    DirectiveListeningDomEventOther.prototype.onEvent = function (eventType) {
        globalCounter++;
        this.eventType = 'other_' + eventType;
    };
    /** @nocollapse */
    DirectiveListeningDomEventOther.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[listenerother]', host: { '(window:domEvent)': 'onEvent($event.type)' } },] },
    ];
    /** @nocollapse */
    DirectiveListeningDomEventOther.ctorParameters = [];
    return DirectiveListeningDomEventOther;
}());
var DirectiveListeningDomEventPrevent = (function () {
    function DirectiveListeningDomEventPrevent() {
    }
    DirectiveListeningDomEventPrevent.prototype.onEvent = function (event) { return false; };
    /** @nocollapse */
    DirectiveListeningDomEventPrevent.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[listenerprevent]', host: { '(click)': 'onEvent($event)' } },] },
    ];
    return DirectiveListeningDomEventPrevent;
}());
var DirectiveListeningDomEventNoPrevent = (function () {
    function DirectiveListeningDomEventNoPrevent() {
    }
    DirectiveListeningDomEventNoPrevent.prototype.onEvent = function (event) { return true; };
    /** @nocollapse */
    DirectiveListeningDomEventNoPrevent.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[listenernoprevent]', host: { '(click)': 'onEvent($event)' } },] },
    ];
    return DirectiveListeningDomEventNoPrevent;
}());
var IdDir = (function () {
    function IdDir() {
    }
    /** @nocollapse */
    IdDir.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[id]', inputs: ['id'] },] },
    ];
    return IdDir;
}());
var EventDir = (function () {
    function EventDir() {
        this.customEvent = new async_1.EventEmitter();
    }
    EventDir.prototype.doSomething = function () { };
    /** @nocollapse */
    EventDir.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[customEvent]' },] },
    ];
    /** @nocollapse */
    EventDir.propDecorators = {
        'customEvent': [{ type: metadata_1.Output },],
    };
    return EventDir;
}());
var NeedsAttribute = (function () {
    function NeedsAttribute(typeAttribute, staticAttribute, fooAttribute) {
        this.typeAttribute = typeAttribute;
        this.staticAttribute = staticAttribute;
        this.fooAttribute = fooAttribute;
    }
    /** @nocollapse */
    NeedsAttribute.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[static]' },] },
    ];
    /** @nocollapse */
    NeedsAttribute.ctorParameters = [
        { type: undefined, decorators: [{ type: metadata_1.Attribute, args: ['type',] },] },
        { type: undefined, decorators: [{ type: metadata_1.Attribute, args: ['static',] },] },
        { type: undefined, decorators: [{ type: metadata_1.Attribute, args: ['foo',] },] },
    ];
    return NeedsAttribute;
}());
var PublicApi = (function () {
    function PublicApi() {
    }
    /** @nocollapse */
    PublicApi.decorators = [
        { type: core_1.Injectable },
    ];
    return PublicApi;
}());
var PrivateImpl = (function (_super) {
    __extends(PrivateImpl, _super);
    function PrivateImpl() {
        _super.apply(this, arguments);
    }
    /** @nocollapse */
    PrivateImpl.decorators = [
        { type: metadata_1.Directive, args: [{
                    selector: '[public-api]',
                    providers: [
                        /* @ts2dart_Provider */ { provide: PublicApi, useExisting: PrivateImpl, deps: [] }
                    ]
                },] },
    ];
    return PrivateImpl;
}(PublicApi));
var NeedsPublicApi = (function () {
    function NeedsPublicApi(api) {
        matchers_1.expect(api instanceof PrivateImpl).toBe(true);
    }
    /** @nocollapse */
    NeedsPublicApi.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[needs-public-api]' },] },
    ];
    /** @nocollapse */
    NeedsPublicApi.ctorParameters = [
        { type: PublicApi, decorators: [{ type: core_1.Host },] },
    ];
    return NeedsPublicApi;
}());
var ToolbarContext = (function () {
    function ToolbarContext(toolbarProp) {
        this.toolbarProp = toolbarProp;
    }
    return ToolbarContext;
}());
var ToolbarPart = (function () {
    function ToolbarPart(templateRef) {
        this.templateRef = templateRef;
    }
    /** @nocollapse */
    ToolbarPart.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[toolbarpart]' },] },
    ];
    /** @nocollapse */
    ToolbarPart.ctorParameters = [
        { type: template_ref_1.TemplateRef, },
    ];
    return ToolbarPart;
}());
var ToolbarViewContainer = (function () {
    function ToolbarViewContainer(vc) {
        this.vc = vc;
    }
    Object.defineProperty(ToolbarViewContainer.prototype, "toolbarVc", {
        set: function (part) {
            this.vc.createEmbeddedView(part.templateRef, new ToolbarContext('From toolbar'), 0);
        },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    ToolbarViewContainer.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[toolbarVc]', inputs: ['toolbarVc'] },] },
    ];
    /** @nocollapse */
    ToolbarViewContainer.ctorParameters = [
        { type: view_container_ref_1.ViewContainerRef, },
    ];
    return ToolbarViewContainer;
}());
var ToolbarComponent = (function () {
    function ToolbarComponent(query) {
        this.ctxProp = 'hello world';
        this.query = query;
    }
    /** @nocollapse */
    ToolbarComponent.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'toolbar',
                    template: 'TOOLBAR(<div *ngFor="let  part of query" [toolbarVc]="part"></div>)',
                    directives: [ToolbarViewContainer, common_1.NgFor]
                },] },
    ];
    /** @nocollapse */
    ToolbarComponent.ctorParameters = [
        { type: query_list_1.QueryList, decorators: [{ type: metadata_1.Query, args: [ToolbarPart,] },] },
    ];
    return ToolbarComponent;
}());
var DirectiveWithTwoWayBinding = (function () {
    function DirectiveWithTwoWayBinding() {
        this.controlChange = new async_1.EventEmitter();
        this.control = null;
    }
    DirectiveWithTwoWayBinding.prototype.triggerChange = function (value) { async_1.ObservableWrapper.callEmit(this.controlChange, value); };
    /** @nocollapse */
    DirectiveWithTwoWayBinding.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[two-way]', inputs: ['control'], outputs: ['controlChange'] },] },
    ];
    return DirectiveWithTwoWayBinding;
}());
var InjectableService = (function () {
    function InjectableService() {
    }
    /** @nocollapse */
    InjectableService.decorators = [
        { type: core_1.Injectable },
    ];
    return InjectableService;
}());
function createInjectableWithLogging(inj) {
    inj.get(ComponentProvidingLoggingInjectable).created = true;
    return new InjectableService();
}
var ComponentProvidingLoggingInjectable = (function () {
    function ComponentProvidingLoggingInjectable() {
        this.created = false;
    }
    /** @nocollapse */
    ComponentProvidingLoggingInjectable.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'component-providing-logging-injectable',
                    providers: [
                        /* @ts2dart_Provider */ {
                            provide: InjectableService,
                            useFactory: createInjectableWithLogging,
                            deps: [core_1.Injector]
                        }
                    ],
                    template: ''
                },] },
    ];
    return ComponentProvidingLoggingInjectable;
}());
var DirectiveProvidingInjectable = (function () {
    function DirectiveProvidingInjectable() {
    }
    /** @nocollapse */
    DirectiveProvidingInjectable.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'directive-providing-injectable', providers: [[InjectableService]] },] },
    ];
    return DirectiveProvidingInjectable;
}());
var DirectiveProvidingInjectableInView = (function () {
    function DirectiveProvidingInjectableInView() {
    }
    /** @nocollapse */
    DirectiveProvidingInjectableInView.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'directive-providing-injectable',
                    viewProviders: [[InjectableService]],
                    template: ''
                },] },
    ];
    return DirectiveProvidingInjectableInView;
}());
var DirectiveProvidingInjectableInHostAndView = (function () {
    function DirectiveProvidingInjectableInHostAndView() {
    }
    /** @nocollapse */
    DirectiveProvidingInjectableInHostAndView.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'directive-providing-injectable',
                    providers: [{ provide: InjectableService, useValue: 'host' }],
                    viewProviders: [{ provide: InjectableService, useValue: 'view' }],
                    template: ''
                },] },
    ];
    return DirectiveProvidingInjectableInHostAndView;
}());
var DirectiveConsumingInjectable = (function () {
    function DirectiveConsumingInjectable(injectable) {
        this.injectable = injectable;
    }
    /** @nocollapse */
    DirectiveConsumingInjectable.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'directive-consuming-injectable', template: '' },] },
    ];
    /** @nocollapse */
    DirectiveConsumingInjectable.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Host }, { type: core_1.Inject, args: [InjectableService,] },] },
    ];
    return DirectiveConsumingInjectable;
}());
var DirectiveContainingDirectiveConsumingAnInjectable = (function () {
    function DirectiveContainingDirectiveConsumingAnInjectable() {
    }
    /** @nocollapse */
    DirectiveContainingDirectiveConsumingAnInjectable.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'directive-containing-directive-consuming-an-injectable' },] },
    ];
    return DirectiveContainingDirectiveConsumingAnInjectable;
}());
var DirectiveConsumingInjectableUnbounded = (function () {
    function DirectiveConsumingInjectableUnbounded(injectable, parent) {
        this.injectable = injectable;
        parent.directive = this;
    }
    /** @nocollapse */
    DirectiveConsumingInjectableUnbounded.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'directive-consuming-injectable-unbounded', template: '' },] },
    ];
    /** @nocollapse */
    DirectiveConsumingInjectableUnbounded.ctorParameters = [
        { type: InjectableService, },
        { type: DirectiveContainingDirectiveConsumingAnInjectable, decorators: [{ type: core_1.SkipSelf },] },
    ];
    return DirectiveConsumingInjectableUnbounded;
}());
/* @ts2dart_const */
var EventBus = (function () {
    function EventBus(parentEventBus, name) {
        this.parentEventBus = parentEventBus;
        this.name = name;
    }
    return EventBus;
}());
var GrandParentProvidingEventBus = (function () {
    function GrandParentProvidingEventBus(bus) {
        this.bus = bus;
    }
    /** @nocollapse */
    GrandParentProvidingEventBus.decorators = [
        { type: metadata_1.Directive, args: [{
                    selector: 'grand-parent-providing-event-bus',
                    providers: [
                        /* @ts2dart_Provider */ { provide: EventBus, useValue: new EventBus(null, 'grandparent') }
                    ]
                },] },
    ];
    /** @nocollapse */
    GrandParentProvidingEventBus.ctorParameters = [
        { type: EventBus, },
    ];
    return GrandParentProvidingEventBus;
}());
function createParentBus(peb) {
    return new EventBus(peb, 'parent');
}
var ParentProvidingEventBus = (function () {
    function ParentProvidingEventBus(bus, grandParentBus) {
        this.bus = bus;
        this.grandParentBus = grandParentBus;
    }
    /** @nocollapse */
    ParentProvidingEventBus.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'parent-providing-event-bus',
                    providers: [
                        { provide: EventBus, useFactory: createParentBus, deps: [[EventBus, new core_1.SkipSelfMetadata()]] }
                    ],
                    directives: [core_1.forwardRef(function () { return ChildConsumingEventBus; })],
                    template: "<child-consuming-event-bus></child-consuming-event-bus>"
                },] },
    ];
    /** @nocollapse */
    ParentProvidingEventBus.ctorParameters = [
        { type: EventBus, },
        { type: EventBus, decorators: [{ type: core_1.SkipSelf },] },
    ];
    return ParentProvidingEventBus;
}());
var ChildConsumingEventBus = (function () {
    function ChildConsumingEventBus(bus) {
        this.bus = bus;
    }
    /** @nocollapse */
    ChildConsumingEventBus.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'child-consuming-event-bus' },] },
    ];
    /** @nocollapse */
    ChildConsumingEventBus.ctorParameters = [
        { type: EventBus, decorators: [{ type: core_1.SkipSelf },] },
    ];
    return ChildConsumingEventBus;
}());
var SomeImperativeViewport = (function () {
    function SomeImperativeViewport(vc, templateRef, anchor) {
        this.vc = vc;
        this.templateRef = templateRef;
        this.view = null;
        this.anchor = anchor;
    }
    Object.defineProperty(SomeImperativeViewport.prototype, "someImpvp", {
        set: function (value) {
            if (lang_1.isPresent(this.view)) {
                this.vc.clear();
                this.view = null;
            }
            if (value) {
                this.view = this.vc.createEmbeddedView(this.templateRef);
                var nodes = this.view.rootNodes;
                for (var i = 0; i < nodes.length; i++) {
                    dom_adapter_1.getDOM().appendChild(this.anchor, nodes[i]);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    SomeImperativeViewport.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[someImpvp]', inputs: ['someImpvp'] },] },
    ];
    /** @nocollapse */
    SomeImperativeViewport.ctorParameters = [
        { type: view_container_ref_1.ViewContainerRef, },
        { type: template_ref_1.TemplateRef, },
        { type: undefined, decorators: [{ type: core_1.Inject, args: [ANCHOR_ELEMENT,] },] },
    ];
    return SomeImperativeViewport;
}());
var ExportDir = (function () {
    function ExportDir() {
    }
    /** @nocollapse */
    ExportDir.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[export-dir]', exportAs: 'dir' },] },
    ];
    return ExportDir;
}());
var ComponentWithoutView = (function () {
    function ComponentWithoutView() {
    }
    /** @nocollapse */
    ComponentWithoutView.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'comp' },] },
    ];
    return ComponentWithoutView;
}());
var DuplicateDir = (function () {
    function DuplicateDir(elRef) {
        dom_adapter_1.getDOM().setText(elRef.nativeElement, dom_adapter_1.getDOM().getText(elRef.nativeElement) + 'noduplicate');
    }
    /** @nocollapse */
    DuplicateDir.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[no-duplicate]' },] },
    ];
    /** @nocollapse */
    DuplicateDir.ctorParameters = [
        { type: element_ref_1.ElementRef, },
    ];
    return DuplicateDir;
}());
var OtherDuplicateDir = (function () {
    function OtherDuplicateDir(elRef) {
        dom_adapter_1.getDOM().setText(elRef.nativeElement, dom_adapter_1.getDOM().getText(elRef.nativeElement) + 'othernoduplicate');
    }
    /** @nocollapse */
    OtherDuplicateDir.decorators = [
        { type: metadata_1.Directive, args: [{ selector: '[no-duplicate]' },] },
    ];
    /** @nocollapse */
    OtherDuplicateDir.ctorParameters = [
        { type: element_ref_1.ElementRef, },
    ];
    return OtherDuplicateDir;
}());
var DirectiveThrowingAnError = (function () {
    function DirectiveThrowingAnError() {
        throw new exceptions_1.BaseException('BOOM');
    }
    /** @nocollapse */
    DirectiveThrowingAnError.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'directive-throwing-error' },] },
    ];
    /** @nocollapse */
    DirectiveThrowingAnError.ctorParameters = [];
    return DirectiveThrowingAnError;
}());
var ComponentWithTemplate = (function () {
    function ComponentWithTemplate() {
        this.items = [1, 2, 3];
    }
    /** @nocollapse */
    ComponentWithTemplate.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'component-with-template',
                    directives: [common_1.NgFor],
                    template: "No View Decorator: <div *ngFor=\"let item of items\">{{item}}</div>"
                },] },
    ];
    return ComponentWithTemplate;
}());
var DirectiveWithPropDecorators = (function () {
    function DirectiveWithPropDecorators() {
        this.event = new async_1.EventEmitter();
    }
    DirectiveWithPropDecorators.prototype.onClick = function (target) { this.target = target; };
    DirectiveWithPropDecorators.prototype.fireEvent = function (msg) { async_1.ObservableWrapper.callEmit(this.event, msg); };
    /** @nocollapse */
    DirectiveWithPropDecorators.decorators = [
        { type: metadata_1.Directive, args: [{ selector: 'with-prop-decorators' },] },
    ];
    /** @nocollapse */
    DirectiveWithPropDecorators.propDecorators = {
        'dirProp': [{ type: metadata_1.Input, args: ['elProp',] },],
        'event': [{ type: metadata_1.Output, args: ['elEvent',] },],
        'myAttr': [{ type: metadata_1.HostBinding, args: ['attr.my-attr',] },],
        'onClick': [{ type: metadata_1.HostListener, args: ['click', ['$event.target'],] },],
    };
    return DirectiveWithPropDecorators;
}());
var SomeCmp = (function () {
    function SomeCmp() {
    }
    /** @nocollapse */
    SomeCmp.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'some-cmp' },] },
    ];
    return SomeCmp;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdyYXRpb25fc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L2xpbmtlci9pbnRlZ3JhdGlvbl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILGlDQUF5SCx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ2xLLHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ2xFLHdCQUEwRyx1QkFBdUIsQ0FBQyxDQUFBO0FBQ2xJLDRCQUFxQiwrQ0FBK0MsQ0FBQyxDQUFBO0FBQ3JFLHFCQUE2Qyx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3JFLDJCQUE0Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBQzFELHNCQUFpRix3QkFBd0IsQ0FBQyxDQUFBO0FBRTFHLHFCQUFxSSxlQUFlLENBQUMsQ0FBQTtBQUVySix1QkFBcUMsaUJBQWlCLENBQUMsQ0FBQTtBQUV2RCxpQ0FBd0UscURBQXFELENBQUMsQ0FBQTtBQUk5SCx5QkFBbUgsNEJBQTRCLENBQUMsQ0FBQTtBQUVoSiwyQkFBd0IscUNBQXFDLENBQUMsQ0FBQTtBQUU5RCxtQ0FBK0IsNkNBQTZDLENBQUMsQ0FBQTtBQUc3RSxtQ0FBZ0MsNkNBQTZDLENBQUMsQ0FBQTtBQUM5RSw0QkFBeUIsc0NBQXNDLENBQUMsQ0FBQTtBQUNoRSw2QkFBd0MsdUNBQXVDLENBQUMsQ0FBQTtBQUVoRix1QkFBdUIsMEJBQTBCLENBQUMsQ0FBQTtBQUNsRCw2QkFBZ0MsZ0RBQWdELENBQUMsQ0FBQTtBQUVqRixJQUFNLGNBQWMsR0FBc0IsSUFBSSxrQkFBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBRTNFO0lBQ0UsMkJBQVEsQ0FBQyxLQUFLLEVBQUUsY0FBUSxZQUFZLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXpELDJCQUFRLENBQUMsUUFB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