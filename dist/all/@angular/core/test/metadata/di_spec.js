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
var core_1 = require('@angular/core');
function main() {
    testing_internal_1.describe('ViewChild', function () {
        testing_internal_1.it('should support type selector', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(ViewChildTypeSelectorComponent, new core_1.ViewMetadata({
                template: "<simple [marker]=\"'1'\"></simple><simple [marker]=\"'2'\"></simple>",
                directives: [Simple]
            }))
                .createAsync(ViewChildTypeSelectorComponent)
                .then(function (view) {
                view.detectChanges();
                testing_internal_1.expect(view.componentInstance.child).toBeDefined();
                testing_internal_1.expect(view.componentInstance.child.marker).toBe('1');
                async.done();
            });
        }));
        testing_internal_1.it('should support string selector', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(ViewChildStringSelectorComponent, new core_1.ViewMetadata({ template: "<simple #child></simple>", directives: [Simple] }))
                .createAsync(ViewChildStringSelectorComponent)
                .then(function (view) {
                view.detectChanges();
                testing_internal_1.expect(view.componentInstance.child).toBeDefined();
                async.done();
            });
        }));
    });
    testing_internal_1.describe('ViewChildren', function () {
        testing_internal_1.it('should support type selector', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(ViewChildrenTypeSelectorComponent, new core_1.ViewMetadata({ template: "<simple></simple><simple></simple>", directives: [Simple] }))
                .createAsync(ViewChildrenTypeSelectorComponent)
                .then(function (view) {
                view.detectChanges();
                testing_internal_1.expect(view.componentInstance.children).toBeDefined();
                testing_internal_1.expect(view.componentInstance.children.length).toBe(2);
                async.done();
            });
        }));
        testing_internal_1.it('should support string selector', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(ViewChildrenStringSelectorComponent, new core_1.ViewMetadata({
                template: "<simple #child1></simple><simple #child2></simple>",
                directives: [Simple]
            }))
                .createAsync(ViewChildrenStringSelectorComponent)
                .then(function (view) {
                view.detectChanges();
                testing_internal_1.expect(view.componentInstance.children).toBeDefined();
                testing_internal_1.expect(view.componentInstance.children.length).toBe(2);
                async.done();
            });
        }));
    });
}
exports.main = main;
var Simple = (function () {
    function Simple() {
    }
    /** @nocollapse */
    Simple.decorators = [
        { type: core_1.Directive, args: [{ selector: 'simple' },] },
    ];
    /** @nocollapse */
    Simple.propDecorators = {
        'marker': [{ type: core_1.Input },],
    };
    return Simple;
}());
var ViewChildTypeSelectorComponent = (function () {
    function ViewChildTypeSelectorComponent() {
    }
    /** @nocollapse */
    ViewChildTypeSelectorComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'view-child-type-selector' },] },
    ];
    /** @nocollapse */
    ViewChildTypeSelectorComponent.propDecorators = {
        'child': [{ type: core_1.ViewChild, args: [Simple,] },],
    };
    return ViewChildTypeSelectorComponent;
}());
var ViewChildStringSelectorComponent = (function () {
    function ViewChildStringSelectorComponent() {
    }
    /** @nocollapse */
    ViewChildStringSelectorComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'view-child-string-selector' },] },
    ];
    /** @nocollapse */
    ViewChildStringSelectorComponent.propDecorators = {
        'child': [{ type: core_1.ViewChild, args: ['child',] },],
    };
    return ViewChildStringSelectorComponent;
}());
var ViewChildrenTypeSelectorComponent = (function () {
    function ViewChildrenTypeSelectorComponent() {
    }
    /** @nocollapse */
    ViewChildrenTypeSelectorComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'view-children-type-selector' },] },
    ];
    /** @nocollapse */
    ViewChildrenTypeSelectorComponent.propDecorators = {
        'children': [{ type: core_1.ViewChildren, args: [Simple,] },],
    };
    return ViewChildrenTypeSelectorComponent;
}());
var ViewChildrenStringSelectorComponent = (function () {
    function ViewChildrenStringSelectorComponent() {
    }
    /** @nocollapse */
    ViewChildrenStringSelectorComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'view-child-string-selector' },] },
    ];
    /** @nocollapse */
    ViewChildrenStringSelectorComponent.propDecorators = {
        'children': [{ type: core_1.ViewChildren, args: ['child1 , child2',] },],
    };
    return ViewChildrenStringSelectorComponent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L21ldGFkYXRhL2RpX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUFpRyx3Q0FBd0MsQ0FBQyxDQUFBO0FBQzFJLHdCQUFtQyx1QkFBdUIsQ0FBQyxDQUFBO0FBRTNELHFCQUF3RyxlQUFlLENBQUMsQ0FBQTtBQUV4SDtJQUNFLDJCQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3BCLHFCQUFFLENBQUMsOEJBQThCLEVBQzlCLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FBQyxFQUMxQyxVQUFDLEdBQXlCLEVBQUUsS0FBeUI7WUFDbkQsR0FBRyxDQUFDLFlBQVksQ0FDVCw4QkFBOEIsRUFBRSxJQUFJLG1CQUFZLENBQUM7Z0JBQy9DLFFBQVEsRUFBRSxzRUFBa0U7Z0JBQzVFLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQzthQUNyQixDQUFDLENBQUM7aUJBQ0wsV0FBVyxDQUFDLDhCQUE4QixDQUFDO2lCQUMzQyxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUNULElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDckIseUJBQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ25ELHlCQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3RELEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNYLHFCQUFFLENBQUMsZ0NBQWdDLEVBQ2hDLHlCQUFNLENBQ0YsQ0FBQyw4QkFBb0IsRUFBRSxxQ0FBa0IsQ0FB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