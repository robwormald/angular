/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var collection_1 = require('../facade/collection');
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
var validators_1 = require('../validators');
var checkbox_value_accessor_1 = require('./checkbox_value_accessor');
var default_value_accessor_1 = require('./default_value_accessor');
var normalize_validator_1 = require('./normalize_validator');
var number_value_accessor_1 = require('./number_value_accessor');
var radio_control_value_accessor_1 = require('./radio_control_value_accessor');
var select_control_value_accessor_1 = require('./select_control_value_accessor');
var select_multiple_control_value_accessor_1 = require('./select_multiple_control_value_accessor');
function controlPath(name, parent) {
    var p = collection_1.ListWrapper.clone(parent.path);
    p.push(name);
    return p;
}
exports.controlPath = controlPath;
function setUpControl(control, dir) {
    if (lang_1.isBlank(control))
        _throwError(dir, 'Cannot find control with');
    if (lang_1.isBlank(dir.valueAccessor))
        _throwError(dir, 'No value accessor for form control with');
    control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
    dir.valueAccessor.writeValue(control.value);
    // view -> model
    dir.valueAccessor.registerOnChange(function (newValue) {
        dir.viewToModelUpdate(newValue);
        control.updateValue(newValue, { emitModelToViewChange: false });
        control.markAsDirty();
    });
    control.registerOnChange(function (newValue, emitModelEvent) {
        // control -> view
        dir.valueAccessor.writeValue(newValue);
        // control -> ngModel
        if (emitModelEvent)
            dir.viewToModelUpdate(newValue);
    });
    // touched
    dir.valueAccessor.registerOnTouched(function () { return control.markAsTouched(); });
}
exports.setUpControl = setUpControl;
function setUpFormContainer(control, dir) {
    if (lang_1.isBlank(control))
        _throwError(dir, 'Cannot find control with');
    control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
}
exports.setUpFormContainer = setUpFormContainer;
function _throwError(dir, message) {
    var messageEnd;
    if (dir.path.length > 1) {
        messageEnd = "path: '" + dir.path.join(' -> ') + "'";
    }
    else if (dir.path[0]) {
        messageEnd = "name: '" + dir.path + "'";
    }
    else {
        messageEnd = 'unspecified name attribute';
    }
    throw new exceptions_1.BaseException(message + " " + messageEnd);
}
function composeValidators(validators) {
    return lang_1.isPresent(validators) ? validators_1.Validators.compose(validators.map(normalize_validator_1.normalizeValidator)) : null;
}
exports.composeValidators = composeValidators;
function composeAsyncValidators(validators) {
    return lang_1.isPresent(validators) ? validators_1.Validators.composeAsync(validators.map(normalize_validator_1.normalizeAsyncValidator)) :
        null;
}
exports.composeAsyncValidators = composeAsyncValidators;
function isPropertyUpdated(changes, viewModel) {
    if (!collection_1.StringMapWrapper.contains(changes, 'model'))
        return false;
    var change = changes['model'];
    if (change.isFirstChange())
        return true;
    return !lang_1.looseIdentical(viewModel, change.currentValue);
}
exports.isPropertyUpdated = isPropertyUpdated;
// TODO: vsavkin remove it once https://github.com/angular/angular/issues/3011 is implemented
function selectValueAccessor(dir, valueAccessors) {
    if (lang_1.isBlank(valueAccessors))
        return null;
    var defaultAccessor;
    var builtinAccessor;
    var customAccessor;
    valueAccessors.forEach(function (v) {
        if (lang_1.hasConstructor(v, default_value_accessor_1.DefaultValueAccessor)) {
            defaultAccessor = v;
        }
        else if (lang_1.hasConstructor(v, checkbox_value_accessor_1.CheckboxControlValueAccessor) || lang_1.hasConstructor(v, number_value_accessor_1.NumberValueAccessor) ||
            lang_1.hasConstructor(v, select_control_value_accessor_1.SelectControlValueAccessor) ||
            lang_1.hasConstructor(v, select_multiple_control_value_accessor_1.SelectMultipleControlValueAccessor) ||
            lang_1.hasConstructor(v, radio_control_value_accessor_1.RadioControlValueAccessor)) {
            if (lang_1.isPresent(builtinAccessor))
                _throwError(dir, 'More than one built-in value accessor matches form control with');
            builtinAccessor = v;
        }
        else {
            if (lang_1.isPresent(customAccessor))
                _throwError(dir, 'More than one custom value accessor matches form control with');
            customAccessor = v;
        }
    });
    if (lang_1.isPresent(customAccessor))
        return customAccessor;
    if (lang_1.isPresent(builtinAccessor))
        return builtinAccessor;
    if (lang_1.isPresent(defaultAccessor))
        return defaultAccessor;
    _throwError(dir, 'No valid value accessor for form control with');
    return null;
}
exports.selectValueAccessor = selectValueAccessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9mb3Jtcy9zcmMvZGlyZWN0aXZlcy9zaGFyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILDJCQUE0QyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ25FLDJCQUE0QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ25ELHFCQUFpRSxnQkFBZ0IsQ0FBQyxDQUFBO0FBRWxGLDJCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUl6Qyx3Q0FBMkMsMkJBQTJCLENBQUMsQ0FBQTtBQUd2RSx1Q0FBbUMsMEJBQTBCLENBQUMsQ0FBQTtBQUU5RCxvQ0FBMEQsdUJBQXVCLENBQUMsQ0FBQTtBQUNsRixzQ0FBa0MseUJBQXlCLENBQUMsQ0FBQTtBQUM1RCw2Q0FBd0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUV6RSw4Q0FBeUMsaUNBQWlDLENBQUMsQ0FBQTtBQUMzRSx1REFBaUQsMENBQTBDLENBQUMsQ0FBQTtBQUk1RixxQkFBNEIsSUFBWSxFQUFFLE1BQXdCO0lBQ2hFLElBQUksQ0FBQyxHQUFHLHdCQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2IsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNYLENBQUM7QUFKZSxtQkFBVyxjQUkxQixDQUFBO0FBRUQsc0JBQTZCLE9BQW9CLEVBQUUsR0FBYztJQUMvRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFBQyxXQUFXLENBQUMsR0FBRyxFQUFFLDBCQUEwQixDQUFDLENBQUM7SUFDbkUsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUseUNBQXlDLENBQUMsQ0FB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