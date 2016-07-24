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
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
function main() {
    testing_internal_1.describe('insert', function () {
        testing_internal_1.it('should do nothing if templateRef is null', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<template [ngTemplateOutlet]=\"null\"></template>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.nativeElement).toHaveText('');
                async.done();
            });
        }));
        testing_internal_1.it('should insert content specified by TemplateRef', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<tpl-refs #refs=\"tplRefs\"><template>foo</template></tpl-refs><template [ngTemplateOutlet]=\"currentTplRef\"></template>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.nativeElement).toHaveText('');
                var refs = fixture.debugElement.children[0].references['refs'];
                fixture.componentInstance.currentTplRef = refs.tplRefs.first;
                fixture.detectChanges();
                matchers_1.expect(fixture.nativeElement).toHaveText('foo');
                async.done();
            });
        }));
        testing_internal_1.it('should clear content if TemplateRef becomes null', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<tpl-refs #refs=\"tplRefs\"><template>foo</template></tpl-refs><template [ngTemplateOutlet]=\"currentTplRef\"></template>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                var refs = fixture.debugElement.children[0].references['refs'];
                fixture.componentInstance.currentTplRef = refs.tplRefs.first;
                fixture.detectChanges();
                matchers_1.expect(fixture.nativeElement).toHaveText('foo');
                fixture.componentInstance.currentTplRef = null;
                fixture.detectChanges();
                matchers_1.expect(fixture.nativeElement).toHaveText('');
                async.done();
            });
        }));
        testing_internal_1.it('should swap content if TemplateRef changes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<tpl-refs #refs=\"tplRefs\"><template>foo</template><template>bar</template></tpl-refs><template [ngTemplateOutlet]=\"currentTplRef\"></template>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                var refs = fixture.debugElement.children[0].references['refs'];
                fixture.componentInstance.currentTplRef = refs.tplRefs.first;
                fixture.detectChanges();
                matchers_1.expect(fixture.nativeElement).toHaveText('foo');
                fixture.componentInstance.currentTplRef = refs.tplRefs.last;
                fixture.detectChanges();
                matchers_1.expect(fixture.nativeElement).toHaveText('bar');
                async.done();
            });
        }));
        testing_internal_1.it('should display template if context is null', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<tpl-refs #refs=\"tplRefs\"><template>foo</template></tpl-refs><template [ngTemplateOutlet]=\"currentTplRef\" [ngOutletContext]=\"null\"></template>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.nativeElement).toHaveText('');
                var refs = fixture.debugElement.children[0].references['refs'];
                fixture.componentInstance.currentTplRef = refs.tplRefs.first;
                fixture.detectChanges();
                matchers_1.expect(fixture.nativeElement).toHaveText('foo');
                async.done();
            });
        }));
        testing_internal_1.it('should reflect initial context and changes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<tpl-refs #refs=\"tplRefs\"><template let-foo=\"foo\"><span>{{foo}}</span></template></tpl-refs><template [ngTemplateOutlet]=\"currentTplRef\" [ngOutletContext]=\"context\"></template>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                var refs = fixture.debugElement.children[0].references['refs'];
                fixture.componentInstance.currentTplRef = refs.tplRefs.first;
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('bar');
                fixture.componentInstance.context.foo = 'alter-bar';
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('alter-bar');
                async.done();
            });
        }));
        testing_internal_1.it('should reflect user defined $implicit property in the context', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<tpl-refs #refs=\"tplRefs\"><template let-ctx><span>{{ctx.foo}}</span></template></tpl-refs><template [ngTemplateOutlet]=\"currentTplRef\" [ngOutletContext]=\"context\"></template>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                var refs = fixture.debugElement.children[0].references['refs'];
                fixture.componentInstance.currentTplRef = refs.tplRefs.first;
                fixture.componentInstance.context = {
                    $implicit: fixture.componentInstance.context
                };
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('bar');
                async.done();
            });
        }));
        testing_internal_1.it('should reflect context re-binding', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<tpl-refs #refs=\"tplRefs\"><template let-shawshank=\"shawshank\"><span>{{shawshank}}</span></template></tpl-refs><template [ngTemplateOutlet]=\"currentTplRef\" [ngOutletContext]=\"context\"></template>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                var refs = fixture.debugElement.children[0].references['refs'];
                fixture.componentInstance.currentTplRef = refs.tplRefs.first;
                fixture.componentInstance.context = { shawshank: 'brooks' };
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('brooks');
                fixture.componentInstance.context = { shawshank: 'was here' };
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('was here');
                async.done();
            });
        }));
    });
}
exports.main = main;
var CaptureTplRefs = (function () {
    function CaptureTplRefs() {
    }
    /** @nocollapse */
    CaptureTplRefs.decorators = [
        { type: core_1.Directive, args: [{ selector: 'tpl-refs', exportAs: 'tplRefs' },] },
    ];
    /** @nocollapse */
    CaptureTplRefs.propDecorators = {
        'tplRefs': [{ type: core_1.ContentChildren, args: [core_1.TemplateRef,] },],
    };
    return CaptureTplRefs;
}());
var TestComponent = (function () {
    function TestComponent() {
        this.context = { foo: 'bar' };
    }
    /** @nocollapse */
    TestComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'test-cmp', directives: [common_1.NgTemplateOutlet, CaptureTplRefs], template: '' },] },
    ];
    return TestComponent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfdGVtcGxhdGVfb3V0bGV0X3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbW1vbi90ZXN0L2RpcmVjdGl2ZXMvbmdfdGVtcGxhdGVfb3V0bGV0X3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUF5Rix3Q0FBd0MsQ0FBQyxDQUFBO0FBQ2xJLHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ2xFLHdCQUFtQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQzNELHFCQUE0RSxlQUFlLENBQUMsQ0FBQTtBQUM1Rix1QkFBK0IsaUJBQWlCLENBQUMsQ0FBQTtBQUVqRDtJQUNFLDJCQUFRLENBQUMsUUFBUSxFQUFFO1FBQ2pCLHFCQUFFLENBQUMsMENBQTBDLEVBQzFDLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsSUFBSSxRQUFRLEdBQUcsbURBQWlELENBQUM7WUFDakUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7aUJBQ3hDLFdBQVcsQ0FBQyxhQUFhLENBQUM7aUJBQzFCLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBRVosT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QixpQkFBTSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRTdDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVYLHFCQUFFLENBQUMsZ0RBQWdELEVBQ2hELHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsSUFBSSxR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