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
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
function main() {
    testing_internal_1.describe('jit', function () { declareTests({ useJit: true }); });
    testing_internal_1.describe('no jit', function () { declareTests({ useJit: false }); });
}
exports.main = main;
function declareTests(_a) {
    var useJit = _a.useJit;
    testing_internal_1.describe('<ng-container>', function () {
        testing_internal_1.beforeEach(function () { testing_1.configureCompiler({ useJit: useJit }); });
        testing_internal_1.it('should be rendered as comment with children as siblings', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(MyComp, '<ng-container><p></p></ng-container>')
                .createAsync(MyComp)
                .then(function (fixture) {
                fixture.detectChanges();
                var el = fixture.debugElement.nativeElement;
                var children = dom_adapter_1.getDOM().childNodes(el);
                matchers_1.expect(children.length).toBe(2);
                matchers_1.expect(dom_adapter_1.getDOM().isCommentNode(children[0])).toBe(true);
                matchers_1.expect(dom_adapter_1.getDOM().tagName(children[1]).toUpperCase()).toEqual('P');
                async.done();
            });
        }));
        testing_internal_1.it('should support nesting', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(MyComp, '<ng-container>1</ng-container><ng-container><ng-container>2</ng-container></ng-container>')
                .createAsync(MyComp)
                .then(function (fixture) {
                fixture.detectChanges();
                var el = fixture.debugElement.nativeElement;
                var children = dom_adapter_1.getDOM().childNodes(el);
                matchers_1.expect(children.length).toBe(5);
                matchers_1.expect(dom_adapter_1.getDOM().isCommentNode(children[0])).toBe(true);
                matchers_1.expect(children[1]).toHaveText('1');
                matchers_1.expect(dom_adapter_1.getDOM().isCommentNode(children[2])).toBe(true);
                matchers_1.expect(dom_adapter_1.getDOM().isCommentNode(children[3])).toBe(true);
                matchers_1.expect(children[4]).toHaveText('2');
                async.done();
            });
        }));
        testing_internal_1.it('should group inner nodes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(MyComp, '<ng-container *ngIf="ctxBoolProp"><p></p><b></b></ng-container>')
                .createAsync(MyComp)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.ctxBoolProp = true;
                fixture.detectChanges();
                var el = fixture.debugElement.nativeElement;
                var children = dom_adapter_1.getDOM().childNodes(el);
                matchers_1.expect(children.length).toBe(4);
                // ngIf anchor
                matchers_1.expect(dom_adapter_1.getDOM().isCommentNode(children[0])).toBe(true);
                // ng-container anchor
                matchers_1.expect(dom_adapter_1.getDOM().isCommentNode(children[1])).toBe(true);
                matchers_1.expect(dom_adapter_1.getDOM().tagName(children[2]).toUpperCase()).toEqual('P');
                matchers_1.expect(dom_adapter_1.getDOM().tagName(children[3]).toUpperCase()).toEqual('B');
                fixture.debugElement.componentInstance.ctxBoolProp = false;
                fixture.detectChanges();
                matchers_1.expect(children.length).toBe(1);
                matchers_1.expect(dom_adapter_1.getDOM().isCommentNode(children[0])).toBe(true);
                async.done();
            });
        }));
        testing_internal_1.it('should work with static content projection', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(MyComp, "<simple><ng-container><p>1</p><p>2</p></ng-container></simple>")
                .createAsync(MyComp)
                .then(function (fixture) {
                fixture.detectChanges();
                var el = fixture.debugElement.nativeElement;
                matchers_1.expect(el).toHaveText('SIMPLE(12)');
                async.done();
            });
        }));
        testing_internal_1.it('should support injecting the container from children', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(MyComp, "<ng-container [text]=\"'container'\"><p></p></ng-container>")
                .createAsync(MyComp)
                .then(function (fixture) {
                fixture.detectChanges();
                var dir = fixture.debugElement.children[0].injector.get(TextDirective);
                matchers_1.expect(dir).toBeAnInstanceOf(TextDirective);
                matchers_1.expect(dir.text).toEqual('container');
                async.done();
            });
        }));
        testing_internal_1.it('should contain all direct child directives in a <ng-container> (content dom)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<needs-content-children #q><ng-container><div text="foo"></div></ng-container></needs-content-children>';
            tcb.overrideTemplate(MyComp, template).createAsync(MyComp).then(function (view) {
                view.detectChanges();
                var q = view.debugElement.children[0].references['q'];
                view.detectChanges();
                matchers_1.expect(q.textDirChildren.length).toEqual(1);
                matchers_1.expect(q.numberOfChildrenAfterContentInit).toEqual(1);
                async.done();
            });
        }));
        testing_internal_1.it('should contain all child directives in a <ng-container> (view dom)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<needs-view-children #q></needs-view-children>';
            tcb.overrideTemplate(MyComp, template).createAsync(MyComp).then(function (view) {
                view.detectChanges();
                var q = view.debugElement.children[0].references['q'];
                view.detectChanges();
                matchers_1.expect(q.textDirChildren.length).toEqual(1);
                matchers_1.expect(q.numberOfChildrenAfterViewInit).toEqual(1);
                async.done();
            });
        }));
    });
}
var TextDirective = (function () {
    function TextDirective() {
        this.text = null;
    }
    /** @nocollapse */
    TextDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[text]' },] },
    ];
    /** @nocollapse */
    TextDirective.propDecorators = {
        'text': [{ type: core_1.Input },],
    };
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
var Simple = (function () {
    function Simple() {
    }
    /** @nocollapse */
    Simple.decorators = [
        { type: core_1.Component, args: [{ selector: 'simple', template: 'SIMPLE(<ng-content></ng-content>)', directives: [] },] },
    ];
    return Simple;
}());
var MyComp = (function () {
    function MyComp() {
        this.ctxBoolProp = false;
    }
    /** @nocollapse */
    MyComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'my-comp',
                    directives: [NeedsContentChildren, NeedsViewChildren, TextDirective, common_1.NgIf, Simple],
                    template: ''
                },] },
    ];
    return MyComp;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfY29udGFpbmVyX2ludGVncmF0aW9uX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvdGVzdC9saW5rZXIvbmdfY29udGFpbmVyX2ludGVncmF0aW9uX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUF5SCx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ2xLLHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ2xFLHdCQUFzRCx1QkFBdUIsQ0FBQyxDQUFBO0FBQzlFLDRCQUFxQiwrQ0FBK0MsQ0FBQyxDQUFBO0FBQ3JFLHFCQUFxSCxlQUFlLENBQUMsQ0FBQTtBQUNySSx1QkFBbUIsaUJBQWlCLENBQUMsQ0FBQTtBQUVyQztJQUNFLDJCQUFRLENBQUMsS0FBSyxFQUFFLGNBQVEsWUFBWSxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RCwyQkFBUSxDQUFDLFFBQVEsRUFBRSxjQUFRLFlBQVksQ0FBQyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUhlLFlBQUksT0FHbkIsQ0FBQTtBQUVELHNCQUFzQixFQUEyQjtRQUExQixrQkFBTTtJQUMzQiwyQkFBUSxDQUFDLGdCQUFnQixFQUFFO1FBRXpCLDZCQUFVLENBQUMsY0FBUSwyQkFBaUIsQ0FBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFM0QscUJBQUUsQ0FBQyx5REFBeUQsRUFDekQseUJBQU0sQ0FDRixDQUFDLDhCQUFvQixFQUFFLHFDQUFrQixDQUFDLEVBQzFDLFVBQUMsR0FBeUIsRUFBRSxLQUF5QjtZQUNuRCxHQUFHLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFF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