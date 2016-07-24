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
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var common_1 = require('@angular/common');
function main() {
    testing_internal_1.describe('switch', function () {
        testing_internal_1.describe('switch value changes', function () {
            testing_internal_1.it('should switch amongst when values', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div>' +
                    '<ul [ngSwitch]="switchValue">' +
                    '<template ngSwitchCase="a"><li>when a</li></template>' +
                    '<template ngSwitchCase="b"><li>when b</li></template>' +
                    '</ul></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
                    fixture.debugElement.componentInstance.switchValue = 'a';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('when a');
                    fixture.debugElement.componentInstance.switchValue = 'b';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('when b');
                    async.done();
                });
            }));
            // TODO(robwormald): deprecate and remove
            testing_internal_1.it('should switch amongst when values using switchWhen', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div>' +
                    '<ul [ngSwitch]="switchValue">' +
                    '<template ngSwitchWhen="a"><li>when a</li></template>' +
                    '<template ngSwitchWhen="b"><li>when b</li></template>' +
                    '</ul></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
                    fixture.debugElement.componentInstance.switchValue = 'a';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('when a');
                    fixture.debugElement.componentInstance.switchValue = 'b';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('when b');
                    async.done();
                });
            }));
            testing_internal_1.it('should switch amongst when values with fallback to default', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div>' +
                    '<ul [ngSwitch]="switchValue">' +
                    '<li template="ngSwitchCase \'a\'">when a</li>' +
                    '<li template="ngSwitchDefault">when default</li>' +
                    '</ul></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('when default');
                    fixture.debugElement.componentInstance.switchValue = 'a';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('when a');
                    fixture.debugElement.componentInstance.switchValue = 'b';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('when default');
                    async.done();
                });
            }));
            testing_internal_1.it('should support multiple whens with the same value', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div>' +
                    '<ul [ngSwitch]="switchValue">' +
                    '<template ngSwitchCase="a"><li>when a1;</li></template>' +
                    '<template ngSwitchCase="b"><li>when b1;</li></template>' +
                    '<template ngSwitchCase="a"><li>when a2;</li></template>' +
                    '<template ngSwitchCase="b"><li>when b2;</li></template>' +
                    '<template ngSwitchDefault><li>when default1;</li></template>' +
                    '<template ngSwitchDefault><li>when default2;</li></template>' +
                    '</ul></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement)
                        .toHaveText('when default1;when default2;');
                    fixture.debugElement.componentInstance.switchValue = 'a';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('when a1;when a2;');
                    fixture.debugElement.componentInstance.switchValue = 'b';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('when b1;when b2;');
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('when values changes', function () {
            testing_internal_1.it('should switch amongst when values', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                var template = '<div>' +
                    '<ul [ngSwitch]="switchValue">' +
                    '<template [ngSwitchCase]="when1"><li>when 1;</li></template>' +
                    '<template [ngSwitchCase]="when2"><li>when 2;</li></template>' +
                    '<template ngSwitchDefault><li>when default;</li></template>' +
                    '</ul></div>';
                tcb.overrideTemplate(TestComponent, template)
                    .createAsync(TestComponent)
                    .then(function (fixture) {
                    fixture.debugElement.componentInstance.when1 = 'a';
                    fixture.debugElement.componentInstance.when2 = 'b';
                    fixture.debugElement.componentInstance.switchValue = 'a';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('when 1;');
                    fixture.debugElement.componentInstance.switchValue = 'b';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('when 2;');
                    fixture.debugElement.componentInstance.switchValue = 'c';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('when default;');
                    fixture.debugElement.componentInstance.when1 = 'c';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('when 1;');
                    fixture.debugElement.componentInstance.when1 = 'd';
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('when default;');
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
        this.switchValue = null;
        this.when1 = null;
        this.when2 = null;
    }
    /** @nocollapse */
    TestComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'test-cmp', directives: [common_1.NgSwitch, common_1.NgSwitchCase, common_1.NgSwitchDefault], template: '' },] },
    ];
    /** @nocollapse */
    TestComponent.ctorParameters = [];
    return TestComponent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfc3dpdGNoX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbW1vbi90ZXN0L2RpcmVjdGl2ZXMvbmdfc3dpdGNoX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUF5Rix3Q0FBd0MsQ0FBQyxDQUFBO0FBQ2xJLHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ2xFLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyx3QkFBbUMsdUJBQXVCLENBQUMsQ0FBQTtBQUUzRCx1QkFBc0QsaUJBQWlCLENBQUMsQ0FBQTtBQUV4RTtJQUNFLDJCQUFRLENBQUMsUUFBUSxFQUFFO1FBQ2pCLDJCQUFRLENBQUMsc0JBQXNCLEVBQUU7WUFDL0IscUJBQUUsQ0FBQyxtQ0FBbUMsRUFDbkMseUJBQU0sQ0FDRixDQUFDLDhCQUFvQixFQUFFLHFDQUFrQixDQUFDLEVBQzFDLFVBQUMsR0FBeUIsRUFBRSxLQUF5QjtnQkFDbkQsSUFBSSxRQUFRLEdBQUcsT0FBTztvQkFDbEIsK0JBQStCO29CQUMvQix1REFBdUQ7b0JBQ3ZELHVEQUF1RDtvQkFDdkQsYUFBYSxDQUFDO2dCQUVsQixHQUFHLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQztxQkFDeEMsV0FBVyxDQUFDLGFBQWEsQ0FBQztxQkFDMUIsSUFBSSxDQUFDLFVBQUMsT0FBTztvQkFDWixPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7b0JBQ3hCLGlCQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBRTFELE9BQU8sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztvQkFDekQsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO29CQUN4QixpQkFBTSxDQUFDLE9B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