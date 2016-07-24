/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var checkbox_value_accessor_1 = require('./directives/checkbox_value_accessor');
var default_value_accessor_1 = require('./directives/default_value_accessor');
var ng_control_status_1 = require('./directives/ng_control_status');
var ng_form_1 = require('./directives/ng_form');
var ng_model_1 = require('./directives/ng_model');
var ng_model_group_1 = require('./directives/ng_model_group');
var number_value_accessor_1 = require('./directives/number_value_accessor');
var radio_control_value_accessor_1 = require('./directives/radio_control_value_accessor');
var form_array_name_1 = require('./directives/reactive_directives/form_array_name');
var form_control_directive_1 = require('./directives/reactive_directives/form_control_directive');
var form_control_name_1 = require('./directives/reactive_directives/form_control_name');
var form_group_directive_1 = require('./directives/reactive_directives/form_group_directive');
var form_group_name_1 = require('./directives/reactive_directives/form_group_name');
var select_control_value_accessor_1 = require('./directives/select_control_value_accessor');
var select_multiple_control_value_accessor_1 = require('./directives/select_multiple_control_value_accessor');
var validators_1 = require('./directives/validators');
var checkbox_value_accessor_2 = require('./directives/checkbox_value_accessor');
exports.CheckboxControlValueAccessor = checkbox_value_accessor_2.CheckboxControlValueAccessor;
var default_value_accessor_2 = require('./directives/default_value_accessor');
exports.DefaultValueAccessor = default_value_accessor_2.DefaultValueAccessor;
var ng_control_1 = require('./directives/ng_control');
exports.NgControl = ng_control_1.NgControl;
var ng_control_status_2 = require('./directives/ng_control_status');
exports.NgControlStatus = ng_control_status_2.NgControlStatus;
var ng_form_2 = require('./directives/ng_form');
exports.NgForm = ng_form_2.NgForm;
var ng_model_2 = require('./directives/ng_model');
exports.NgModel = ng_model_2.NgModel;
var ng_model_group_2 = require('./directives/ng_model_group');
exports.NgModelGroup = ng_model_group_2.NgModelGroup;
var number_value_accessor_2 = require('./directives/number_value_accessor');
exports.NumberValueAccessor = number_value_accessor_2.NumberValueAccessor;
var radio_control_value_accessor_2 = require('./directives/radio_control_value_accessor');
exports.RadioControlValueAccessor = radio_control_value_accessor_2.RadioControlValueAccessor;
var form_array_name_2 = require('./directives/reactive_directives/form_array_name');
exports.FormArrayName = form_array_name_2.FormArrayName;
var form_control_directive_2 = require('./directives/reactive_directives/form_control_directive');
exports.FormControlDirective = form_control_directive_2.FormControlDirective;
var form_control_name_2 = require('./directives/reactive_directives/form_control_name');
exports.FormControlName = form_control_name_2.FormControlName;
var form_group_directive_2 = require('./directives/reactive_directives/form_group_directive');
exports.FormGroupDirective = form_group_directive_2.FormGroupDirective;
var form_group_name_2 = require('./directives/reactive_directives/form_group_name');
exports.FormGroupName = form_group_name_2.FormGroupName;
var select_control_value_accessor_2 = require('./directives/select_control_value_accessor');
exports.NgSelectOption = select_control_value_accessor_2.NgSelectOption;
exports.SelectControlValueAccessor = select_control_value_accessor_2.SelectControlValueAccessor;
var select_multiple_control_value_accessor_2 = require('./directives/select_multiple_control_value_accessor');
exports.NgSelectMultipleOption = select_multiple_control_value_accessor_2.NgSelectMultipleOption;
exports.SelectMultipleControlValueAccessor = select_multiple_control_value_accessor_2.SelectMultipleControlValueAccessor;
var validators_2 = require('./directives/validators');
exports.MaxLengthValidator = validators_2.MaxLengthValidator;
exports.MinLengthValidator = validators_2.MinLengthValidator;
exports.PatternValidator = validators_2.PatternValidator;
exports.RequiredValidator = validators_2.RequiredValidator;
exports.SHARED_FORM_DIRECTIVES = [
    select_control_value_accessor_1.NgSelectOption, select_multiple_control_value_accessor_1.NgSelectMultipleOption, default_value_accessor_1.DefaultValueAccessor, number_value_accessor_1.NumberValueAccessor,
    checkbox_value_accessor_1.CheckboxControlValueAccessor, select_control_value_accessor_1.SelectControlValueAccessor, select_multiple_control_value_accessor_1.SelectMultipleControlValueAccessor,
    radio_control_value_accessor_1.RadioControlValueAccessor, ng_control_status_1.NgControlStatus, validators_1.RequiredValidator, validators_1.MinLengthValidator,
    validators_1.MaxLengthValidator, validators_1.PatternValidator
];
exports.TEMPLATE_DRIVEN_DIRECTIVES = [ng_model_1.NgModel, ng_model_group_1.NgModelGroup, ng_form_1.NgForm];
exports.REACTIVE_DRIVEN_DIRECTIVES = [
    form_control_directive_1.FormControlDirective, form_group_directive_1.FormGroupDirective, form_control_name_1.FormControlName, form_group_name_1.FormGroupName, form_array_name_1.FormArrayName
];
/**
 *
 * A list of all the form directives used as part of a `@Component` annotation.
 *
 *  This is a shorthand for importing them each individually.
 *
 * ### Example
 *
 * ```typescript
 * @Component({
 *   selector: 'my-app',
 *   directives: [FORM_DIRECTIVES]
 * })
 * class MyApp {}
 * ```
 * @experimental
 */
exports.FORM_DIRECTIVES = 
/*@ts2dart_const*/ [exports.TEMPLATE_DRIVEN_DIRECTIVES, exports.SHARED_FORM_DIRECTIVES];
/**
 * @experimental
 */
exports.REACTIVE_FORM_DIRECTIVES = 
/*@ts2dart_const*/ [exports.REACTIVE_DRIVEN_DIRECTIVES, exports.SHARED_FORM_DIRECTIVES];
var InternalFormsSharedModule = (function () {
    function InternalFormsSharedModule() {
    }
    /** @nocollapse */
    InternalFormsSharedModule.decorators = [
        { type: core_1.NgModule, args: [{ declarations: exports.SHARED_FORM_DIRECTIVES, exports: exports.SHARED_FORM_DIRECTIVES },] },
    ];
    return InternalFormsSharedModule;
}());
exports.InternalFormsSharedModule = InternalFormsSharedModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZm9ybXMvc3JjL2RpcmVjdGl2ZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUE2QixlQUFlLENBQUMsQ0FBQTtBQUU3Qyx3Q0FBMkMsc0NBQXNDLENBQUMsQ0FBQTtBQUNsRix1Q0FBbUMscUNBQXFDLENBQUMsQ0FBQTtBQUN6RSxrQ0FBOEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUMvRCx3QkFBcUIsc0JBQXNCLENBQUMsQ0FBQTtBQUM1Qyx5QkFBc0IsdUJBQXVCLENBQUMsQ0FBQTtBQUM5QywrQkFBMkIsNkJBQTZCLENBQUMsQ0FBQTtBQUN6RCxzQ0FBa0Msb0NBQW9DLENBQUMsQ0FBQTtBQUN2RSw2Q0FBd0MsMkNBQTJDLENBQUMsQ0FBQTtBQUNwRixnQ0FBNEIsa0RBQWtELENBQUMsQ0FBQTtBQUMvRSx1Q0FBbUMseURBQXlELENBQUMsQ0FBQTtBQUM3RixrQ0FBOEIsb0RBQW9ELENBQUMsQ0FBQTtBQUNuRixxQ0FBaUMsdURBQXVELENBQUMsQ0FBQTtBQUN6RixnQ0FBNEIsa0RBQWtELENBQUMsQ0FBQTtBQUMvRSw4Q0FBeUQsNENBQTRDLENBQUMsQ0FBQTtBQUN0Ryx1REFBeUUscURBQXFELENBQUMsQ0FBQTtBQUMvSCwyQkFBMEYseUJBQXlCLENBQUMsQ0FBQTtBQUVwSCx3Q0FBMkMsc0NBQXNDLENBQUM7QUFBMUUsOEZBQTBFO0FBRWxGLHVDQUFtQyxxQ0FBcUMsQ0FBQztBQUFqRSw2RUFBaUU7QUFDekUsMkJBQXdCLHlCQUF5QixDQUFDO0FBQTFDLDJDQUEwQztBQUNsRCxrQ0FBOEIsZ0NBQWdDLENBQUM7QUFBdkQsOERBQXVEO0FBQy9ELHdCQUFxQixzQkFBc0IsQ0FBQztBQUFwQyxrQ0FBb0M7QUFDNUMseUJBQXNCLHVCQUF1QixDQUFDO0FBQXRDLHFDQUFzQztBQUM5QywrQkFBMkIsNkJBQTZCLENBQUM7QUFBakQscURBQWlEO0FBQ3pELHNDQUFrQyxvQ0FBb0MsQ0FBQztBQUEvRCwwRUFBK0Q7QUFDdkUsNkNBQXdDLDJDQUEyQyxDQUFDO0FBQTVFLDZGQUE0RTtBQUNwRixnQ0FBNEIsa0RBQWtELENBQUM7QUFBdkUsd0RBQXVFO0FBQy9FLHVDQUFtQyx5REFBeUQsQ0FBQztBQUFyRiw2RUFBcUY7QUFDN0Ysa0NBQThCLG9EQUFvRCxDQUFDO0FBQTNFLDhEQUEyRTtBQUNuRixxQ0FBaUMsdURBQXVELENBQUM7QUFBakYsdUVBQWlGO0FBQ3pGLGdDQUE0QixrREFBa0QsQ0FBQztBQUF2RSx3REFBdUU7QUFDL0UsOENBQXlELDRDQUE0QyxDQUFDO0FBQTlGLHdFQUFjO0FBQUUsZ0dBQThFO0FBQ3RHLHVEQUF5RSxxREFBcUQsQ0FBQztBQUF2SCxpR0FBc0I7QUFBRSx5SEFBK0Y7QUFDL0gsMkJBQTBGLHlCQUF5QixDQUFDO0FBQTVHLDZEQUFrQjtBQUFFLDZEQUFrQjtBQUFFLHlEQUFnQjtBQUFFLDJEQUFrRDtBQUV2Ryw4QkFBc0IsR0FBNkI7SUFDOUQsOENBQWMsRUFBRSwrREFBc0IsRUFBRSw2Q0FBb0IsRUFBRSwyQ0FBbUI7SUFDakYsc0RBQTRCLEVBQUUsMERBQTBCLEVBQUUsMkVBQWtDO0lBQzVGLHdEQUF5QixFQUFFLG1DQUFlLEVBQUUsOEJBQWlCLEVBQUUsK0JBQWtCO0lBQ2pGLCtCQUFrQixFQUFFLDZCQUFnQjtDQUNyQyxDQUFDO0FBRVcsa0NBQTBCLEdBQTZCLENBQUMsa0JBQU8sRUFBRSw2QkFBWSxFQUFFLGdCQUFNLENBQUMsQ0FBQztBQUV2RixrQ0FBMEIsR0FBNkI7SUFDbEUsNkNBQW9CLEVBQUUseUNBQWtCLEVBQUUsbUNBQWUsRUFBRSwrQkFBYSxFQUFFLCtCQUFhO0NBQ3hGLENBQUM7QUFFRjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNVLHVCQUFlO0FBQ3hCLGtCQUFrQixDQUFBLENBQUMsa0NBQTBCLEVBQUUsOEJBQXNCLENBQUMsQ0FBQztBQUUzRTs7R0FFRztBQUVVLGdDQUF3QjtBQUNqQyxrQkFBa0IsQ0FBQSxDQUFDLGtDQUEwQixFQUFFLDhCQUFzQixDQUFDLENBQUM7QUFDM0U7SUFBQTtJQUtBLENBQUM7SUFKRCxrQkFBa0I7SUFDWCxvQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxlQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxZQUFZLEVBQUUsOEJBQXNCLEVBQUUsT0FBTyxFQUFFLDhCQUFzQixFQUFDLEVBQUcsRUFBRTtLQUNwRyxDQUFDO0lBQ0YsZ0NBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLGlDQUF5Qiw0QkFLckMsQ0FBQSJ9