/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var core_1 = require('@angular/core');
var metadata_1 = require('@angular/upgrade/src/metadata');
function main() {
    testing_internal_1.describe('upgrade metadata', function () {
        testing_internal_1.it('should extract component selector', function () {
            testing_internal_1.expect(metadata_1.getComponentInfo(ElementNameComponent).selector).toEqual('elementNameDashed');
        });
        testing_internal_1.describe('errors', function () {
            testing_internal_1.it('should throw on missing selector', function () {
                testing_internal_1.expect(function () { return metadata_1.getComponentInfo(AttributeNameComponent); })
                    .toThrowError('Only selectors matching element names are supported, got: [attr-name]');
            });
            testing_internal_1.it('should throw on non element names', function () {
                testing_internal_1.expect(function () { return metadata_1.getComponentInfo(NoAnnotationComponent); })
                    .toThrowError('No Directive annotation found on NoAnnotationComponent');
            });
        });
        testing_internal_1.describe('parseFields', function () {
            testing_internal_1.it('should process nulls', function () { testing_internal_1.expect(metadata_1.parseFields(null)).toEqual([]); });
            testing_internal_1.it('should process values', function () {
                testing_internal_1.expect(metadata_1.parseFields([' name ', ' prop :  attr '])).toEqual([
                    {
                        prop: 'name',
                        attr: 'name',
                        bracketAttr: '[name]',
                        parenAttr: '(name)',
                        bracketParenAttr: '[(name)]',
                        onAttr: 'onName',
                        bindAttr: 'bindName',
                        bindonAttr: 'bindonName'
                    },
                    {
                        prop: 'prop',
                        attr: 'attr',
                        bracketAttr: '[attr]',
                        parenAttr: '(attr)',
                        bracketParenAttr: '[(attr)]',
                        onAttr: 'onAttr',
                        bindAttr: 'bindAttr',
                        bindonAttr: 'bindonAttr'
                    }
                ]);
            });
        });
    });
}
exports.main = main;
var ElementNameComponent = (function () {
    function ElementNameComponent() {
    }
    /** @nocollapse */
    ElementNameComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'element-name-dashed', template: "" },] },
    ];
    return ElementNameComponent;
}());
var AttributeNameComponent = (function () {
    function AttributeNameComponent() {
    }
    /** @nocollapse */
    AttributeNameComponent.decorators = [
        { type: core_1.Component, args: [{ selector: '[attr-name]', template: "" },] },
    ];
    return AttributeNameComponent;
}());
var NoAnnotationComponent = (function () {
    function NoAnnotationComponent() {
    }
    return NoAnnotationComponent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGFfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvdXBncmFkZS90ZXN0L21ldGFkYXRhX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUF3Rix3Q0FBd0MsQ0FBQyxDQUFBO0FBRWpJLHFCQUE4QixlQUFlLENBQUMsQ0FBQTtBQUM5Qyx5QkFBNEMsK0JBQStCLENBQUMsQ0FBQTtBQUU1RTtJQUNFLDJCQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDM0IscUJBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtZQUN0Qyx5QkFBTSxDQUFDLDJCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUM7UUFHSCwyQkFBUSxDQUFDLFFBQVEsRUFBRTtZQUNqQixxQkFBRSxDQUFDLGtDQUFrQyxFQUFFO2dCQUNyQyx5QkFBTSxDQUFDLGNBQU0sT0FBQSwyQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxFQUF4QyxDQUF3QyxDQUFDO3FCQUNqRCxZQUFZLENBQUMsdUVBQXVFLENBQUMsQ0FBQztZQUM3RixDQUFDLENBQUMsQ0FBQztZQUVILHFCQUFFLENBQUMsbUNBQW1DLEVBQUU7Z0JBQ3RDLHlCQUFNLENBQUMsY0FBTSxPQUFBLDJCQUFnQixDQUFDLHFCQUFxQixDQUFDLEVBQXZDLENBQXVDLENBQUM7cUJBQ2hELFlBQVksQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO1lBQzlFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBUSxDQUFDLGFBQWEsRUFBRTtZQUN0QixxQkFBRSxDQUFDLHNCQUFzQixFQUFFLGNBQVEseUJBQU0sQ0FBQyxzQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0UscUJBQUUsQ0FBQyx1QkFBdUIsRUFBRTtnQkFDMUIseUJBQU0sQ0FBQyxzQkFBVyxDQUFDLENBQUMsUUFBUSxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFDeEQ7d0JBQ0UsSUFBSSxFQUFFLE1BQU07d0JBQ1osSUFBSSxFQUFFLE1BQU07d0JBQ1osV0FBVyxFQUFFLFFBQVE7d0JBQ3JCLFNBQVMsRUFBRSxRQUFRO3dCQUNuQixnQkFBZ0IsRUFBRSxVQUFVO3dCQUM1QixNQUFNLEVBQUUsUUFBUTt3QkFDaEIsUUFBUSxFQUFFLFVBQVU7d0JBQ3BCLFVBQVUsRUFBRSxZQUFZO3FCQUN6QjtvQkFDRDt3QkFDRSxJQUFJLEVBQUUsTUFBTTt3QkFDWixJQUFJLEVBQUUsTUFBTTt3QkFDWixXQUFXLEVBQUUsUUFBUTt3QkFDckIsU0FBUyxFQUFFLFFBQVE7d0JBQ25CLGdCQUFnQixFQUFFLFVBQVU7d0JBQzVCLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixRQUFRLEVBQUUsVUFBVTt3QkFDcEIsVUFBVSxFQUFFLFlBQVk7cUJBQ3pCO2lCQUNGLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFoRGUsWUFBSSxPQWdEbkIsQ0FBQTtBQUNEO0lBQUE7SUFLQSxDQUFDO0lBSkQsa0JBQWtCO0lBQ1gsK0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFDLEVBQUcsRUFBRTtLQUM3RSxDQUFDO0lBQ0YsMkJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUNEO0lBQUE7SUFLQSxDQUFDO0lBSkQsa0JBQWtCO0lBQ1gsaUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLEVBQUUsRUFBQyxFQUFHLEVBQUU7S0FDckUsQ0FBQztJQUNGLDZCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFFRDtJQUFBO0lBQTZCLENBQUM7SUFBRCw0QkFBQztBQUFELENBQUMsQUFBOUIsSUFBOEIifQ==