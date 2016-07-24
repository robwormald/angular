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
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
function main() {
    testing_internal_1.describe('switch', function () {
        testing_internal_1.beforeEachProviders(function () { return [{ provide: common_1.NgLocalization, useClass: TestLocalization }]; });
        testing_internal_1.it('should display the template according to the exact value', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div>' +
                '<ul [ngPlural]="switchValue">' +
                '<template ngPluralCase="=0"><li>you have no messages.</li></template>' +
                '<template ngPluralCase="=1"><li>you have one message.</li></template>' +
                '</ul></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.switchValue = 0;
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('you have no messages.');
                fixture.debugElement.componentInstance.switchValue = 1;
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('you have one message.');
                async.done();
            });
        }));
        // https://github.com/angular/angular/issues/9868
        // https://github.com/angular/angular/issues/9882
        testing_internal_1.it('should not throw when ngPluralCase contains expressions', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div>' +
                '<ul [ngPlural]="switchValue">' +
                '<template ngPluralCase="=0"><li>{{ switchValue }}</li></template>' +
                '</ul></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.switchValue = 0;
                matchers_1.expect(function () { return fixture.detectChanges(); }).not.toThrow();
                async.done();
            });
        }));
        testing_internal_1.it('should be applicable to <ng-container> elements', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div>' +
                '<ng-container [ngPlural]="switchValue">' +
                '<template ngPluralCase="=0">you have no messages.</template>' +
                '<template ngPluralCase="=1">you have one message.</template>' +
                '</ng-container></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.switchValue = 0;
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('you have no messages.');
                fixture.debugElement.componentInstance.switchValue = 1;
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('you have one message.');
                async.done();
            });
        }));
        testing_internal_1.it('should display the template according to the category', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div>' +
                '<ul [ngPlural]="switchValue">' +
                '<template ngPluralCase="few"><li>you have a few messages.</li></template>' +
                '<template ngPluralCase="many"><li>you have many messages.</li></template>' +
                '</ul></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.switchValue = 2;
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement)
                    .toHaveText('you have a few messages.');
                fixture.debugElement.componentInstance.switchValue = 8;
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('you have many messages.');
                async.done();
            });
        }));
        testing_internal_1.it('should default to other when no matches are found', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div>' +
                '<ul [ngPlural]="switchValue">' +
                '<template ngPluralCase="few"><li>you have a few messages.</li></template>' +
                '<template ngPluralCase="other"><li>default message.</li></template>' +
                '</ul></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.switchValue = 100;
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('default message.');
                async.done();
            });
        }));
        testing_internal_1.it('should prioritize value matches over category matches', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var template = '<div>' +
                '<ul [ngPlural]="switchValue">' +
                '<template ngPluralCase="few"><li>you have a few messages.</li></template>' +
                '<template ngPluralCase="=2">you have two messages.</template>' +
                '</ul></div>';
            tcb.overrideTemplate(TestComponent, template)
                .createAsync(TestComponent)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.switchValue = 2;
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('you have two messages.');
                fixture.debugElement.componentInstance.switchValue = 3;
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement)
                    .toHaveText('you have a few messages.');
                async.done();
            });
        }));
    });
}
exports.main = main;
var TestLocalization = (function (_super) {
    __extends(TestLocalization, _super);
    function TestLocalization() {
        _super.apply(this, arguments);
    }
    TestLocalization.prototype.getPluralCategory = function (value) {
        if (value > 1 && value < 4) {
            return 'few';
        }
        if (value >= 4 && value < 10) {
            return 'many';
        }
        return 'other';
    };
    /** @nocollapse */
    TestLocalization.decorators = [
        { type: core_1.Injectable },
    ];
    return TestLocalization;
}(common_1.NgLocalization));
var TestComponent = (function () {
    function TestComponent() {
        this.switchValue = null;
    }
    /** @nocollapse */
    TestComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'test-cmp', directives: [common_1.NgPlural, common_1.NgPluralCase], template: '' },] },
    ];
    return TestComponent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfcGx1cmFsX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbW1vbi90ZXN0L2RpcmVjdGl2ZXMvbmdfcGx1cmFsX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsaUNBQThHLHdDQUF3QyxDQUFDLENBQUE7QUFDdkoseUJBQXFCLDRDQUE0QyxDQUFDLENBQUE7QUFDbEUsd0JBQW1DLHVCQUF1QixDQUFDLENBQUE7QUFFM0QscUJBQW9DLGVBQWUsQ0FBQyxDQUFBO0FBQ3BELHVCQUFxRCxpQkFBaUIsQ0FBQyxDQUFBO0FBRXZFO0lBQ0UsMkJBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDakIsc0NBQW1CLENBQUMsY0FBTSxPQUFBLENBQUMsRUFBQyxPQUFPLEVBQUUsdUJBQWMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQyxFQUF2RCxDQUF1RCxDQUFDLENBQUM7UUFFbkYscUJBQUUsQ0FBQywwREFBMEQsRUFDMUQseUJBQU0sQ0FDRixDQUFDLDhCQUFvQixFQUFFLHFDQUFrQixDQUFDLEVBQzFDLFVBQUMsR0FBeUIsRUFBRSxLQUF5QjtZQUNuRCxJQUFJLFFBQVEsR0FBRyxPQUFPO2dCQUNsQiwrQkFBK0I7Z0JBQy9CLHVFQUF1RTtnQkFDdkUsdUVBQXVFO2dCQUN2RSxhQUFhLENBQUM7WUFFbEIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsRUFBRSxRQUFRLENBQUM7aUJBQ3hDLFdBQVcsQ0FBQyxhQUFhLENBQUM7aUJBQzFCLElBQUksQ0FBQyxVQUFDLE9BQU87Z0JBQ1osT0FBTyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2dCQUN2RCxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3hCLGlCQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMs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