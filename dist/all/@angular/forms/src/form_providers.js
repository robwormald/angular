/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var directives_1 = require('./directives');
var radio_control_value_accessor_1 = require('./directives/radio_control_value_accessor');
var form_builder_1 = require('./form_builder');
/**
 * Shorthand set of providers used for building Angular forms.
 * @experimental
 */
exports.FORM_PROVIDERS = [radio_control_value_accessor_1.RadioControlRegistry];
/**
 * Shorthand set of providers used for building reactive Angular forms.
 * @experimental
 */
exports.REACTIVE_FORM_PROVIDERS = 
/*@ts2dart_const*/ [form_builder_1.FormBuilder, radio_control_value_accessor_1.RadioControlRegistry];
var FormsModule = (function () {
    function FormsModule() {
    }
    /** @nocollapse */
    FormsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: directives_1.TEMPLATE_DRIVEN_DIRECTIVES,
                    providers: [exports.FORM_PROVIDERS],
                    exports: [directives_1.InternalFormsSharedModule, directives_1.TEMPLATE_DRIVEN_DIRECTIVES]
                },] },
    ];
    return FormsModule;
}());
exports.FormsModule = FormsModule;
var ReactiveFormsModule = (function () {
    function ReactiveFormsModule() {
    }
    /** @nocollapse */
    ReactiveFormsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [directives_1.REACTIVE_DRIVEN_DIRECTIVES],
                    providers: [exports.REACTIVE_FORM_PROVIDERS],
                    exports: [directives_1.InternalFormsSharedModule, directives_1.REACTIVE_DRIVEN_DIRECTIVES]
                },] },
    ];
    return ReactiveFormsModule;
}());
exports.ReactiveFormsModule = ReactiveFormsModule;
/**
 * @deprecated
 */
function disableDeprecatedForms() {
    return [];
}
exports.disableDeprecatedForms = disableDeprecatedForms;
/**
 * @deprecated
 */
function provideForms() {
    return [
        { provide: core_1.PLATFORM_DIRECTIVES, useValue: directives_1.FORM_DIRECTIVES, multi: true }, exports.REACTIVE_FORM_PROVIDERS
    ];
}
exports.provideForms = provideForms;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2Zvcm1zL3NyYy9mb3JtX3Byb3ZpZGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQWtELGVBQWUsQ0FBQyxDQUFBO0FBRWxFLDJCQUFtSyxjQUFjLENBQUMsQ0FBQTtBQUNsTCw2Q0FBbUMsMkNBQTJDLENBQUMsQ0FBQTtBQUMvRSw2QkFBMEIsZ0JBQWdCLENBQUMsQ0FBQTtBQUkzQzs7O0dBR0c7QUFDVSxzQkFBYyxHQUE2QixDQUFDLG1EQUFvQixDQUFDLENBQUM7QUFFL0U7OztHQUdHO0FBQ1UsK0JBQXVCO0FBQ2hDLGtCQUFrQixDQUFBLENBQUMsMEJBQVcsRUFBRSxtREFBb0IsQ0FBQyxDQUFDO0FBQzFEO0lBQUE7SUFTQSxDQUFDO0lBUkQsa0JBQWtCO0lBQ1gsc0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZUFBUSxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN2QixZQUFZLEVBQUUsdUNBQTBCO29CQUN4QyxTQUFTLEVBQUUsQ0FBQyxzQkFBYyxDQUFDO29CQUMzQixPQUFPLEVBQUUsQ0FBQyxzQ0FBeUIsRUFBRSx1Q0FBMEIsQ0FBQztpQkFDakUsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFUWSxtQkFBVyxjQVN2QixDQUFBO0FBQ0Q7SUFBQTtJQVNBLENBQUM7SUFSRCxrQkFBa0I7SUFDWCw4QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxlQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3ZCLFlBQVksRUFBRSxDQUFDLHVDQUEwQixDQUFDO29CQUMxQyxTQUFTLEVBQUUsQ0FBQywrQkFBdUIsQ0FBQztvQkFDcEMsT0FBTyxFQUFFLENBQUMsc0NBQXlCLEVBQUUsdUNBQTBCLENBQUM7aUJBQ2pFLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRiwwQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVFksMkJBQW1CLHNCQVMvQixDQUFBO0FBRUQ7O0dBRUc7QUFDSDtJQUNFLE1BQU0sQ0FBQyxFQUFFLENBQUM7QUFDWixDQUFDO0FBRmUsOEJBQXNCLHlCQUVyQyxDQUFBO0FBRUQ7O0dBRUc7QUFDSDtJQUNFLE1BQU0sQ0FBQztRQUNMLEVBQUMsT0FBTyxFQUFFLDBCQUFtQixFQUFFLFFBQVEsRUFBRSw0QkFBZSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsRUFBRSwrQkFBdUI7S0FDaEcsQ0FBQztBQUNKLENBQUM7QUFKZSxvQkFBWSxlQUkzQixDQUFBIn0=