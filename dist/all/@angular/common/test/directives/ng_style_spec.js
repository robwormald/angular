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
var collection_1 = require('../../src/facade/collection');
var core_1 = require('@angular/core');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var ng_style_1 = require('@angular/common/src/directives/ng_style');
function main() {
    testing_internal_1.describe('binding to CSS styles', function () {
        testing_internal_1.it('should add styles specified in an object literal', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<div [ngStyle]=\"{'max-width': '40px'}\"></div>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.detectChanges();
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'max-width'))
                    .toEqual('40px');
                async.done();
            });
        }));
        testing_internal_1.it('should add and change styles specified in an object expression', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<div [ngStyle]=\"expr\"></div>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                var expr;
                fixture.debugElement.componentInstance.expr = { 'max-width': '40px' };
                fixture.detectChanges();
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'max-width'))
                    .toEqual('40px');
                expr = fixture.debugElement.componentInstance.expr;
                expr['max-width'] = '30%';
                fixture.detectChanges();
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'max-width'))
                    .toEqual('30%');
                async.done();
            });
        }));
        // keyValueDiffer is sensitive to key order #9115
        testing_internal_1.it('should change styles specified in an object expression', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<div [ngStyle]=\"expr\"></div>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.expr = {
                    // height, width order is important here
                    height: '10px',
                    width: '10px'
                };
                fixture.detectChanges();
                var el = fixture.debugElement.children[0].nativeElement;
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(el, 'height')).toEqual('10px');
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(el, 'width')).toEqual('10px');
                fixture.debugElement.componentInstance.expr = {
                    // width, height order is important here
                    width: '5px',
                    height: '5px',
                };
                fixture.detectChanges();
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(el, 'height')).toEqual('5px');
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(el, 'width')).toEqual('5px');
                async.done();
            });
        }));
        testing_internal_1.it('should remove styles when deleting a key in an object expression', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<div [ngStyle]=\"expr\"></div>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.expr = { 'max-width': '40px' };
                fixture.detectChanges();
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'max-width'))
                    .toEqual('40px');
                collection_1.StringMapWrapper.delete(fixture.debugElement.componentInstance.expr, 'max-width');
                fixture.detectChanges();
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'max-width'))
                    .toEqual('');
                async.done();
            });
        }));
        testing_internal_1.it('should co-operate with the style attribute', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<div style=\"font-size: 12px\" [ngStyle]=\"expr\"></div>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.expr = { 'max-width': '40px' };
                fixture.detectChanges();
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'max-width'))
                    .toEqual('40px');
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'font-size'))
                    .toEqual('12px');
                collection_1.StringMapWrapper.delete(fixture.debugElement.componentInstance.expr, 'max-width');
                fixture.detectChanges();
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'max-width'))
                    .toEqual('');
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'font-size'))
                    .toEqual('12px');
                async.done();
            });
        }));
        testing_internal_1.it('should co-operate with the style.[styleName]="expr" special-case in the compiler', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = "<div [style.font-size.px]=\"12\" [ngStyle]=\"expr\"></div>";
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.expr = { 'max-width': '40px' };
                fixture.detectChanges();
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'max-width'))
                    .toEqual('40px');
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'font-size'))
                    .toEqual('12px');
                collection_1.StringMapWrapper.delete(fixture.debugElement.componentInstance.expr, 'max-width');
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'font-size'))
                    .toEqual('12px');
                fixture.detectChanges();
                testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(fixture.debugElement.children[0].nativeElement, 'max-width'))
                    .toEqual('');
                async.done();
            });
        }));
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
    }
    /** @nocollapse */
    TestComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'test-cmp', directives: [ng_style_1.NgStyle], template: '' },] },
    ];
    return TestComponent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfc3R5bGVfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3Rlc3QvZGlyZWN0aXZlcy9uZ19zdHlsZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBaUksd0NBQXdDLENBQUMsQ0FBQTtBQUMxSyx3QkFBbUMsdUJBQXVCLENBQUMsQ0FBQTtBQUUzRCwyQkFBK0IsNkJBQTZCLENBQUMsQ0FBQTtBQUU3RCxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFFeEMsNEJBQXFCLCtDQUErQyxDQUFDLENBQUE7QUFDckUseUJBQXNCLHlDQUF5QyxDQUFDLENBQUE7QUFFaEU7SUFDRSwyQkFBUSxDQUFDLHVCQUF1QixFQUFFO1FBRWhDLHFCQUFFLENBQUMsa0RBQWtELEVBQ2xELHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsSUFBSSxRQUFRLEdBQUcsaURBQStDLENBQUM7WUFFL0QsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7aUJBQ3hDLFdBQVcsQ0FBQyxhQUFhLENBQUM7aUJBQzFCLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ1osT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4Qix5QkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQ2IsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUNuRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXJCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVYLHFCQUFFLENBQUMsZ0VBQWdFLEVBQ2hFLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsSUFBSSxRQUFRLEdBQUcsZ0NBQThCLENBQUM7WUFFOUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7aUJBQ3hDLFdBQVcsQ0FBQyxhQUFhLENBQUM7aUJBQzFCLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ1osSUFBSSxJQUFzQixDQUFDO2dCQUUzQixPQUFPLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksR0FBRyxFQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUMsQ0FBQztnQkFDcEUsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4Qix5QkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQ2IsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUNuRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXJCLElBQUksR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztnQkFDbEQsSUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDbkMsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4Qix5QkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQ2IsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUNuRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXBCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVYLGlEQUFpRDtRQUNqRCxxQkFBRSxDQUFDLHdEQUF3RCxFQUN4RCx5QkFBTSxDQUNGLENBQUMsOEJBQW9CLEVBQUUscUNBQWtCLENBQUMsRUFDMUMsVUFBQyxHQUF5QixFQUFFLEtBQXlCO1lBQ25ELElBQU0sUUFBUSxHQUFHLGdDQUE4QixDQUFDO1lBRWhELEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO2lCQUN4QyxXQUFXLENBQUMsYUFBYSxDQUFDO2lCQUMxQixJQUFJLENBQUMsVUFBQyxPQUFPO2dCQUNaLE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxHQUFHO29CQUM1Qyx3Q0FBd0M7b0JBQ3hDLE1BQU0sRUFBRSxNQUFNO29CQUNkLEtBQUssRUFBRSxNQUFNO2lCQUNkLENBQUM7Z0JBRUYsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QixJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7Z0JBQ3hELHlCQUFNLENBQUMsb0JBQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ3hELHlCQUFNLENBQUMsb0JBQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXZELE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxHQUFHO29CQUM1Qyx3Q0FBd0M7b0JBQ3hDLEtBQUssRUFBRSxLQUFLO29CQUNaLE1BQU0sRUFBRSxLQUFLO2lCQUNkLENBQUM7Z0JBRUYsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4Qix5QkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2RCx5QkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV0RCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFWCxxQkFBRSxDQUFDLGtFQUFrRSxFQUNsRSx5QkFBTSxDQUNGLENBQUMsOEJBQW9CLEVBQUUscUNBQWtCLENBQUMsRUFDMUMsVUFBQyxHQUF5QixFQUFFLEtBQXlCO1lBQ25ELElBQUksUUFBUSxHQUFHLGdDQUE4QixDQUFDO1lBRTlDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO2lCQUN4QyxXQUFXLENBQUMsYUFBYSxDQUFDO2lCQUMxQixJQUFJLENBQUMsVUFBQyxPQUFPO2dCQUNaLE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLEVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBQyxDQUFDO2dCQUNwRSxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3hCLHlCQUFNLENBQUMsb0JBQU0sRUFBRSxDQUFDLFFBQVEsQ0FDYixPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7cUJBQ25FLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFckIsNkJBQWdCLENBQUMsTUFBTSxDQUNuQixPQUFPLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDOUQsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4Qix5QkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQ2IsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUNuRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRWpCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVYLHFCQUFFLENBQUMsNENBQTRDLEVBQzVDLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsSUFBSSxRQUFRLEdBQUcsMERBQXNELENBQUM7WUFFdEUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7aUJBQ3hDLFdBQVcsQ0FBQyxhQUFhLENBQUM7aUJBQzFCLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ1osT0FBTyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFDLENBQUM7Z0JBQ3BFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEIseUJBQU0sQ0FBQyxvQkFBTSxFQUFFLENBQUMsUUFBUSxDQUNiLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztxQkFDbkUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQix5QkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQ2IsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUNuRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXJCLDZCQUFnQixDQUFDLE1BQU0sQ0FDbkIsT0FBTyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQzlELE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEIseUJBQU0sQ0FBQyxvQkFBTSxFQUFFLENBQUMsUUFBUSxDQUNiLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztxQkFDbkUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNqQix5QkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQ2IsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUNuRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXJCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVYLHFCQUFFLENBQUMsa0ZBQWtGLEVBQ2xGLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsSUFBSSxRQUFRLEdBQUcsNERBQXdELENBQUM7WUFFeEUsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7aUJBQ3hDLFdBQVcsQ0FBQyxhQUFhLENBQUM7aUJBQzFCLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ1osT0FBTyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsRUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFDLENBQUM7Z0JBQ3BFLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEIseUJBQU0sQ0FBQyxvQkFBTSxFQUFFLENBQUMsUUFBUSxDQUNiLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQztxQkFDbkUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNyQix5QkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQ2IsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUNuRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBRXJCLDZCQUFnQixDQUFDLE1BQU0sQ0FDbkIsT0FBTyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQzlELHlCQUFNLENBQUMsb0JBQU0sRUFBRSxDQUFDLFFBQVEsQ0FDYixPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7cUJBQ25FLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFckIsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4Qix5QkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLENBQ2IsT0FBTyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUNuRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRWpCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQS9LZSxZQUFJLE9BK0tuQixDQUFBO0FBQ0Q7SUFBQTtJQU1BLENBQUM7SUFKRCxrQkFBa0I7SUFDWCx3QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxrQkFBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBQyxFQUFHLEVBQUU7S0FDekYsQ0FBQztJQUNGLG9CQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUMifQ==