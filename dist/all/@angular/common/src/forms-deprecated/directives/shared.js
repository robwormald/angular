/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var collection_1 = require('../../facade/collection');
var exceptions_1 = require('../../facade/exceptions');
var lang_1 = require('../../facade/lang');
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
    // model -> view
    control.registerOnChange(function (newValue) { return dir.valueAccessor.writeValue(newValue); });
    // touched
    dir.valueAccessor.registerOnTouched(function () { return control.markAsTouched(); });
}
exports.setUpControl = setUpControl;
function setUpControlGroup(control, dir) {
    if (lang_1.isBlank(control))
        _throwError(dir, 'Cannot find control with');
    control.validator = validators_1.Validators.compose([control.validator, dir.validator]);
    control.asyncValidator = validators_1.Validators.composeAsync([control.asyncValidator, dir.asyncValidator]);
}
exports.setUpControlGroup = setUpControlGroup;
function _throwError(dir, message) {
    var messageEnd;
    if (dir.path.length > 1) {
        messageEnd = "path: '" + dir.path.join(' -> ') + "'";
    }
    else if (dir.path[0]) {
        messageEnd = "name: '" + dir.path + "'";
    }
    else {
        messageEnd = 'unspecified name';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vc3JjL2Zvcm1zLWRlcHJlY2F0ZWQvZGlyZWN0aXZlcy9zaGFyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILDJCQUE0Qyx5QkFBeUIsQ0FBQyxDQUFBO0FBQ3RFLDJCQUE0Qix5QkFBeUIsQ0FBQyxDQUFBO0FBQ3RELHFCQUFpRSxtQkFBbUIsQ0FBQyxDQUFBO0FBRXJGLDJCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUd6Qyx3Q0FBMkMsMkJBQTJCLENBQUMsQ0FBQTtBQUd2RSx1Q0FBbUMsMEJBQTBCLENBQUMsQ0FBQTtBQUc5RCxvQ0FBMEQsdUJBQXVCLENBQUMsQ0FBQTtBQUNsRixzQ0FBa0MseUJBQXlCLENBQUMsQ0FBQTtBQUM1RCw2Q0FBd0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUN6RSw4Q0FBeUMsaUNBQWlDLENBQUMsQ0FBQTtBQUMzRSx1REFBaUQsMENBQTBDLENBQUMsQ0FBQTtBQUk1RixxQkFBNEIsSUFBWSxFQUFFLE1BQXdCO0lBQ2hFLElBQUksQ0FBQyxHQUFHLHdCQUFXLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2IsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNYLENBQUM7QUFKZSxtQkFBVyxjQUkxQixDQUFBO0FBRUQsc0JBQTZCLE9BQWdCLEVBQUUsR0FBYztJQUMzRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFBQyxXQUFXLENBQUMsR0FBRyxFQUFFLDBCQUEwQixDQUFDLENBQUM7SUFDbkUsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUFDLFdBQVcsQ0FBQyxHQUFH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