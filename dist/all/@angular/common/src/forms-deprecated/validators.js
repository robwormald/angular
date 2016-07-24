/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var async_1 = require('../facade/async');
var collection_1 = require('../facade/collection');
var lang_1 = require('../facade/lang');
var promise_1 = require('../facade/promise');
/**
 * Providers for validators to be used for {@link Control}s in a form.
 *
 * Provide this using `multi: true` to add validators.
 *
 * ### Example
 *
 * {@example core/forms/ts/ng_validators/ng_validators.ts region='ng_validators'}
 * @experimental
 */
exports.NG_VALIDATORS = new core_1.OpaqueToken('NgValidators');
/**
 * Providers for asynchronous validators to be used for {@link Control}s
 * in a form.
 *
 * Provide this using `multi: true` to add validators.
 *
 * See {@link NG_VALIDATORS} for more details.
 *
 * @experimental
 */
exports.NG_ASYNC_VALIDATORS = 
/*@ts2dart_const*/ new core_1.OpaqueToken('NgAsyncValidators');
/**
 * Provides a set of validators used by form controls.
 *
 * A validator is a function that processes a {@link Control} or collection of
 * controls and returns a map of errors. A null map means that validation has passed.
 *
 * ### Example
 *
 * ```typescript
 * var loginControl = new Control("", Validators.required)
 * ```
 *
 * @experimental
 */
var Validators = (function () {
    function Validators() {
    }
    /**
     * Validator that requires controls to have a non-empty value.
     */
    Validators.required = function (control) {
        return lang_1.isBlank(control.value) || (lang_1.isString(control.value) && control.value == '') ?
            { 'required': true } :
            null;
    };
    /**
     * Validator that requires controls to have a value of a minimum length.
     */
    Validators.minLength = function (minLength) {
        return function (control) {
            if (lang_1.isPresent(Validators.required(control)))
                return null;
            var v = control.value;
            return v.length < minLength ?
                { 'minlength': { 'requiredLength': minLength, 'actualLength': v.length } } :
                null;
        };
    };
    /**
     * Validator that requires controls to have a value of a maximum length.
     */
    Validators.maxLength = function (maxLength) {
        return function (control) {
            if (lang_1.isPresent(Validators.required(control)))
                return null;
            var v = control.value;
            return v.length > maxLength ?
                { 'maxlength': { 'requiredLength': maxLength, 'actualLength': v.length } } :
                null;
        };
    };
    /**
     * Validator that requires a control to match a regex to its value.
     */
    Validators.pattern = function (pattern) {
        return function (control) {
            if (lang_1.isPresent(Validators.required(control)))
                return null;
            var regex = new RegExp("^" + pattern + "$");
            var v = control.value;
            return regex.test(v) ? null :
                { 'pattern': { 'requiredPattern': "^" + pattern + "$", 'actualValue': v } };
        };
    };
    /**
     * No-op validator.
     */
    Validators.nullValidator = function (c) { return null; };
    /**
     * Compose multiple validators into a single function that returns the union
     * of the individual error maps.
     */
    Validators.compose = function (validators) {
        if (lang_1.isBlank(validators))
            return null;
        var presentValidators = validators.filter(lang_1.isPresent);
        if (presentValidators.length == 0)
            return null;
        return function (control) {
            return _mergeErrors(_executeValidators(control, presentValidators));
        };
    };
    Validators.composeAsync = function (validators) {
        if (lang_1.isBlank(validators))
            return null;
        var presentValidators = validators.filter(lang_1.isPresent);
        if (presentValidators.length == 0)
            return null;
        return function (control) {
            var promises = _executeAsyncValidators(control, presentValidators).map(_convertToPromise);
            return promise_1.PromiseWrapper.all(promises).then(_mergeErrors);
        };
    };
    return Validators;
}());
exports.Validators = Validators;
function _convertToPromise(obj) {
    return lang_1.isPromise(obj) ? obj : async_1.ObservableWrapper.toPromise(obj);
}
function _executeValidators(control, validators) {
    return validators.map(function (v) { return v(control); });
}
function _executeAsyncValidators(control, validators) {
    return validators.map(function (v) { return v(control); });
}
function _mergeErrors(arrayOfErrors) {
    var res = arrayOfErrors.reduce(function (res, errors) {
        return lang_1.isPresent(errors) ? collection_1.StringMapWrapper.merge(res, errors) : res;
    }, {});
    return collection_1.StringMapWrapper.isEmpty(res) ? null : res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3NyYy9mb3Jtcy1kZXByZWNhdGVkL3ZhbGlkYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUEwQixlQUFlLENBQUMsQ0FBQTtBQUMxQyxzQkFBZ0MsaUJBQWlCLENBQUMsQ0FBQTtBQUNsRCwyQkFBK0Isc0JBQXNCLENBQUMsQ0FBQTtBQUN0RCxxQkFBc0QsZ0JBQWdCLENBQUMsQ0FBQTtBQUN2RSx3QkFBNkIsbUJBQW1CLENBQUMsQ0FBQTtBQUlqRDs7Ozs7Ozs7O0dBU0c7QUFDVSxxQkFBYSxHQUFtQyxJQUFJLGtCQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7QUFFN0Y7Ozs7Ozs7OztHQVNHO0FBQ1UsMkJBQW1CO0FBQzVCLGtCQUFrQixDQUFDLElBQUksa0JBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRTVEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSDtJQUFBO0lBOEVBLENBQUM7SUE3RUM7O09BRUc7SUFDSSxtQkFBUSxHQUFmLFVBQWdCLE9BQXdCO1FBQ3RDLE1BQU0sQ0FBQyxjQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBUSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUM3RSxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUM7WUFDbEIsSUFBSSxDQUFDO0lBQ1gsQ0FBQztJQUVEOztPQUVHO0lBQ0ksb0JBQVMsR0FBaEIsVUFBaUIsU0FBaUI7UUFDaEMsTUFBTSxDQUFDLFVBQUMsT0FBd0I7WUFDOUIsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsTUFBTSxDQUFDLElBQUks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