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
var element_ref_1 = require('@angular/core/src/linker/element_ref');
function main() {
    testing_internal_1.describe('non-bindable', function () {
        testing_internal_1.it('should not interpolate children', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div>{{text}}<span ngNonBindable>{{text}}</span></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('foo{{text}}');
                async.done();
            });
        }));
        testing_internal_1.it('should ignore directives on child nodes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div ngNonBindable><span id=child test-dec>{{text}}</span></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                // We must use getDOM().querySelector instead of fixture.query here
                // since the elements inside are not compiled.
                var span = dom_adapter_1.getDOM().querySelector(fixture.debugElement.nativeElement, '#child');
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(span, 'compiled')).toBeFalsy();
                async.done();
            });
        }));
        testing_internal_1.it('should trigger directives on the same node', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div><span id=child ngNonBindable test-dec>{{text}}</span></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                var span = dom_adapter_1.getDOM().querySelector(fixture.debugElement.nativeElement, '#child');
                matchers_1.expect(dom_adapter_1.getDOM().hasClass(span, 'compiled')).toBeTruthy();
                async.done();
            });
        }));
    });
}
exports.main = main;
var TestDirective = (function () {
    function TestDirective(el) {
        dom_adapter_1.getDOM().addClass(el.nativeElement, 'compiled');
    }
    /** @nocollapse */
    TestDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[test-dec]' },] },
    ];
    /** @nocollapse */
    TestDirective.ctorParameters = [
        { type: element_ref_1.ElementRef, },
    ];
    return TestDirective;
}());
var TestComponent = (function () {
    function TestComponent() {
        this.text = 'foo';
    }
    /** @nocollapse */
    TestComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'test-cmp', directives: [TestDirective], template: '' },] },
    ];
    /** @nocollapse */
    TestComponent.ctorParameters = [];
    return TestComponent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9uX2JpbmRhYmxlX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbW1vbi90ZXN0L2RpcmVjdGl2ZXMvbm9uX2JpbmRhYmxlX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUF5Rix3Q0FBd0MsQ0FBQyxDQUFBO0FBQ2xJLHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ2xFLHdCQUFtQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQzNELDRCQUFxQiwrQ0FBK0MsQ0FBQyxDQUFBO0FBQ3JFLHFCQUFtQyxlQUFlLENBQUMsQ0FBQTtBQUNuRCw0QkFBeUIsc0NBQXNDLENBQUMsQ0FBQTtBQUVoRTtJQUNFLDJCQUFRLENBQUMsY0FBYyxFQUFFO1FBQ3ZCLHFCQUFFLENBQUMsaUNBQWlDLEVBQ2pDLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsSUFBSSxRQUFRLEdBQUcsd0RBQXdELENBQUM7WUFDeEUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7aUJBQ3hDLFdBQVcsQ0FBQyxhQUFhLENBQUM7aUJBQzFCLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ1osT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QixpQkFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUNyRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFWCxxQkFBRSxDQUFDLHlDQUF5QyxFQUN6Qyx5QkFBTSxDQUNGLENBQUMsOEJBQW9CLEVBQUUscUNBQWtCLENBQUMsRUFDMUMsVUFBQyxH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