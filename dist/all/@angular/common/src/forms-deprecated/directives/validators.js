/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../../facade/lang');
var validators_1 = require('../validators');
var REQUIRED = validators_1.Validators.required;
exports.REQUIRED_VALIDATOR = {
    provide: validators_1.NG_VALIDATORS,
    useValue: REQUIRED,
    multi: true
};
var RequiredValidator = (function () {
    function RequiredValidator() {
    }
    /** @nocollapse */
    RequiredValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[required][ngControl],[required][ngFormControl],[required][ngModel]',
                    providers: [exports.REQUIRED_VALIDATOR]
                },] },
    ];
    return RequiredValidator;
}());
exports.RequiredValidator = RequiredValidator;
/**
 * Provivder which adds {@link MinLengthValidator} to {@link NG_VALIDATORS}.
 *
 * ## Example:
 *
 * {@example common/forms/ts/validators/validators.ts region='min'}
 */
exports.MIN_LENGTH_VALIDATOR = {
    provide: validators_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return MinLengthValidator; }),
    multi: true
};
var MinLengthValidator = (function () {
    function MinLengthValidator(minLength) {
        this._validator = validators_1.Validators.minLength(lang_1.NumberWrapper.parseInt(minLength, 10));
    }
    MinLengthValidator.prototype.validate = function (c) { return this._validator(c); };
    /** @nocollapse */
    MinLengthValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[minlength][ngControl],[minlength][ngFormControl],[minlength][ngModel]',
                    providers: [exports.MIN_LENGTH_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    MinLengthValidator.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['minlength',] },] },
    ];
    return MinLengthValidator;
}());
exports.MinLengthValidator = MinLengthValidator;
/**
 * Provider which adds {@link MaxLengthValidator} to {@link NG_VALIDATORS}.
 *
 * ## Example:
 *
 * {@example common/forms/ts/validators/validators.ts region='max'}
 */
exports.MAX_LENGTH_VALIDATOR = {
    provide: validators_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return MaxLengthValidator; }),
    multi: true
};
var MaxLengthValidator = (function () {
    function MaxLengthValidator(maxLength) {
        this._validator = validators_1.Validators.maxLength(lang_1.NumberWrapper.parseInt(maxLength, 10));
    }
    MaxLengthValidator.prototype.validate = function (c) { return this._validator(c); };
    /** @nocollapse */
    MaxLengthValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[maxlength][ngControl],[maxlength][ngFormControl],[maxlength][ngModel]',
                    providers: [exports.MAX_LENGTH_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    MaxLengthValidator.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['maxlength',] },] },
    ];
    return MaxLengthValidator;
}());
exports.MaxLengthValidator = MaxLengthValidator;
exports.PATTERN_VALIDATOR = {
    provide: validators_1.NG_VALIDATORS,
    useExisting: core_1.forwardRef(function () { return PatternValidator; }),
    multi: true
};
var PatternValidator = (function () {
    function PatternValidator(pattern) {
        this._validator = validators_1.Validators.pattern(pattern);
    }
    PatternValidator.prototype.validate = function (c) { return this._validator(c); };
    /** @nocollapse */
    PatternValidator.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[pattern][ngControl],[pattern][ngFormControl],[pattern][ngModel]',
                    providers: [exports.PATTERN_VALIDATOR]
                },] },
    ];
    /** @nocollapse */
    PatternValidator.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['pattern',] },] },
    ];
    return PatternValidator;
}());
exports.PatternValidator = PatternValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3NyYy9mb3Jtcy1kZXByZWNhdGVkL2RpcmVjdGl2ZXMvdmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQStDLGVBQWUsQ0FBQyxDQUFBO0FBRS9ELHFCQUE0QixtQkFBbUIsQ0FBQyxDQUFBO0FBRWhELDJCQUF3QyxlQUFlLENBQUMsQ0FBQTtBQXlCeEQsSUFBTSxRQUFRLEdBQXNCLHVCQUFVLENBQUMsUUFBUSxDQUFDO0FBRTNDLDBCQUFrQixHQUFpRDtJQUM5RSxPQUFPLEVBQUUsMEJBQWE7SUFDdEIsUUFBUSxFQUFFLFFBQVE7SUFDbEIsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBQ0Y7SUFBQTtJQVFBLENBQUM7SUFQRCxrQkFBa0I7SUFDWCw0QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUscUVBQXFFO29CQUMvRSxTQUFTLEVBQUUsQ0FBQywwQkFBa0IsQ0FBQztpQkFDaEMsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLHdCQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFSWSx5QkFBaUIsb0JBUTdCLENBQUE7QUFPRDs7Ozs7O0dBTUc7QUFDVSw0QkFBb0IsR0FBaUQ7SUFDaEYsT0FBTyxFQUFFLDBCQUFhO0lBQ3RCLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQztJQUNqRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFDRjtJQUdFLDRCQUFhLFNBQWlCO1FBQzVCLElBQUksQ0FBQyxVQUFVLEdBQUcsdUJBQVUsQ0FBQyxTQUFTLENBQUMsb0JBQWEsQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFF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