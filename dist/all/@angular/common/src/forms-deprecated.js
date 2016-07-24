/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * @module
 * @description
 * This module is used for handling user input, by defining and building a {@link ControlGroup} that
 * consists of
 * {@link Control} objects, and mapping them onto the DOM. {@link Control} objects can then be used
 * to read information
 * from the form DOM elements.
 *
 * Forms providers are not included in default providers; you must import these providers
 * explicitly.
 */
var core_1 = require('@angular/core');
var directives_1 = require('./forms-deprecated/directives');
var radio_control_value_accessor_1 = require('./forms-deprecated/directives/radio_control_value_accessor');
var form_builder_1 = require('./forms-deprecated/form_builder');
var directives_2 = require('./forms-deprecated/directives');
exports.FORM_DIRECTIVES = directives_2.FORM_DIRECTIVES;
exports.RadioButtonState = directives_2.RadioButtonState;
var abstract_control_directive_1 = require('./forms-deprecated/directives/abstract_control_directive');
exports.AbstractControlDirective = abstract_control_directive_1.AbstractControlDirective;
var checkbox_value_accessor_1 = require('./forms-deprecated/directives/checkbox_value_accessor');
exports.CheckboxControlValueAccessor = checkbox_value_accessor_1.CheckboxControlValueAccessor;
var control_container_1 = require('./forms-deprecated/directives/control_container');
exports.ControlContainer = control_container_1.ControlContainer;
var control_value_accessor_1 = require('./forms-deprecated/directives/control_value_accessor');
exports.NG_VALUE_ACCESSOR = control_value_accessor_1.NG_VALUE_ACCESSOR;
var default_value_accessor_1 = require('./forms-deprecated/directives/default_value_accessor');
exports.DefaultValueAccessor = default_value_accessor_1.DefaultValueAccessor;
var ng_control_1 = require('./forms-deprecated/directives/ng_control');
exports.NgControl = ng_control_1.NgControl;
var ng_control_group_1 = require('./forms-deprecated/directives/ng_control_group');
exports.NgControlGroup = ng_control_group_1.NgControlGroup;
var ng_control_name_1 = require('./forms-deprecated/directives/ng_control_name');
exports.NgControlName = ng_control_name_1.NgControlName;
var ng_control_status_1 = require('./forms-deprecated/directives/ng_control_status');
exports.NgControlStatus = ng_control_status_1.NgControlStatus;
var ng_form_1 = require('./forms-deprecated/directives/ng_form');
exports.NgForm = ng_form_1.NgForm;
var ng_form_control_1 = require('./forms-deprecated/directives/ng_form_control');
exports.NgFormControl = ng_form_control_1.NgFormControl;
var ng_form_model_1 = require('./forms-deprecated/directives/ng_form_model');
exports.NgFormModel = ng_form_model_1.NgFormModel;
var ng_model_1 = require('./forms-deprecated/directives/ng_model');
exports.NgModel = ng_model_1.NgModel;
var select_control_value_accessor_1 = require('./forms-deprecated/directives/select_control_value_accessor');
exports.NgSelectOption = select_control_value_accessor_1.NgSelectOption;
exports.SelectControlValueAccessor = select_control_value_accessor_1.SelectControlValueAccessor;
var validators_1 = require('./forms-deprecated/directives/validators');
exports.MaxLengthValidator = validators_1.MaxLengthValidator;
exports.MinLengthValidator = validators_1.MinLengthValidator;
exports.PatternValidator = validators_1.PatternValidator;
exports.RequiredValidator = validators_1.RequiredValidator;
var form_builder_2 = require('./forms-deprecated/form_builder');
exports.FormBuilder = form_builder_2.FormBuilder;
var model_1 = require('./forms-deprecated/model');
exports.AbstractControl = model_1.AbstractControl;
exports.Control = model_1.Control;
exports.ControlArray = model_1.ControlArray;
exports.ControlGroup = model_1.ControlGroup;
var validators_2 = require('./forms-deprecated/validators');
exports.NG_ASYNC_VALIDATORS = validators_2.NG_ASYNC_VALIDATORS;
exports.NG_VALIDATORS = validators_2.NG_VALIDATORS;
exports.Validators = validators_2.Validators;
/**
 * Shorthand set of providers used for building Angular forms.
 *
 * ### Example
 *
 * ```typescript
 * bootstrap(MyApp, [FORM_PROVIDERS]);
 * ```
 *
 * @experimental
 */
exports.FORM_PROVIDERS = [form_builder_1.FormBuilder, radio_control_value_accessor_1.RadioControlRegistry];
var DeprecatedFormsModule = (function () {
    function DeprecatedFormsModule() {
    }
    /** @nocollapse */
    DeprecatedFormsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    providers: [
                        exports.FORM_PROVIDERS,
                    ],
                    declarations: directives_1.FORM_DIRECTIVES,
                    exports: directives_1.FORM_DIRECTIVES
                },] },
    ];
    return DeprecatedFormsModule;
}());
exports.DeprecatedFormsModule = DeprecatedFormsModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybXMtZGVwcmVjYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3NyYy9mb3Jtcy1kZXByZWNhdGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSDs7Ozs7Ozs7Ozs7R0FXRztBQUNILHFCQUE2QixlQUFlLENBQUMsQ0FBQTtBQUU3QywyQkFBOEIsK0JBQStCLENBQUMsQ0FBQTtBQUM5RCw2Q0FBbUMsNERBQTRELENBQUMsQ0FBQTtBQUNoRyw2QkFBMEIsaUNBQWlDLENBQUMsQ0FBQTtBQUU1RCwyQkFBZ0QsK0JBQStCLENBQUM7QUFBeEUsdURBQWU7QUFBRSx5REFBdUQ7QUFDaEYsMkNBQXVDLDBEQUEwRCxDQUFDO0FBQTFGLHlGQUEwRjtBQUNsRyx3Q0FBMkMsdURBQXVELENBQUM7QUFBM0YsOEZBQTJGO0FBQ25HLGtDQUErQixpREFBaUQsQ0FBQztBQUF6RSxnRUFBeUU7QUFDakYsdUNBQXNELHNEQUFzRCxDQUFDO0FBQS9FLHVFQUErRTtBQUM3Ryx1Q0FBbUMsc0RBQXNELENBQUM7QUFBbEYsNkVBQWtGO0FBRTFGLDJCQUF3QiwwQ0FBMEMsQ0FBQztBQUEzRCwyQ0FBMkQ7QUFDbkUsaUNBQTZCLGdEQUFnRCxDQUFDO0FBQXRFLDJEQUFzRTtBQUM5RSxnQ0FBNEIsK0NBQStDLENBQUM7QUFBcEUsd0RBQW9FO0FBQzVFLGtDQUE4QixpREFBaUQsQ0FBQztBQUF4RSw4REFBd0U7QUFDaEYsd0JBQXFCLHVDQUF1QyxDQUFDO0FBQXJELGtDQUFxRDtBQUM3RCxnQ0FBNEIsK0NBQStDLENBQUM7QUFBcEUsd0RBQW9FO0FBQzVFLDhCQUEwQiw2Q0FBNkMsQ0FBQztBQUFoRSxrREFBZ0U7QUFDeEUseUJBQXNCLHdDQUF3QyxDQUFDO0FBQXZELHFDQUF1RDtBQUMvRCw4Q0FBeUQsNkRBQTZELENBQUM7QUFBL0csd0VBQWM7QUFBRSxnR0FBK0Y7QUFDdkgsMkJBQXFHLDBDQUEwQyxDQUFDO0FBQXhJLDZEQUFrQjtBQUFFLDZEQUFrQjtBQUFFLHlEQUFnQjtBQUFFLDJEQUE4RTtBQUNoSiw2QkFBMEIsaUNBQWlDLENBQUM7QUFBcEQsaURBQW9EO0FBQzVELHNCQUFtRSwwQkFBMEIsQ0FBQztBQUF0RixrREFBZTtBQUFFLGtDQUFPO0FBQUUsNENBQVk7QUFBRSw0Q0FBOEM7QUFDOUYsMkJBQTZELCtCQUErQixDQUFDO0FBQXJGLCtEQUFtQjtBQUFFLG1EQUFhO0FBQUUsNkNBQWlEO0FBRzdGOzs7Ozs7Ozs7O0dBVUc7QUFDVSxzQkFBYyxHQUE2QixDQUFDLDBCQUFXLEVBQUUsbURBQW9CLENBQUMsQ0FBQztBQUM1RjtJQUFBO0lBV0EsQ0FBQztJQVZELGtCQUFrQjtJQUNYLGdDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGVBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdkIsU0FBUyxFQUFFO3dCQUNULHNCQUFjO3FCQUNmO29CQUNELFlBQVksRUFBRSw0QkFBZTtvQkFDN0IsT0FBTyxFQUFFLDRCQUFlO2lCQUN6QixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0YsNEJBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQVhZLDZCQUFxQix3QkFXakMsQ0FBQSJ9