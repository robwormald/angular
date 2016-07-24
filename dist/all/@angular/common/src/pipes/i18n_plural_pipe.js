/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../facade/lang');
var localization_1 = require('../localization');
var invalid_pipe_argument_exception_1 = require('./invalid_pipe_argument_exception');
var _INTERPOLATION_REGEXP = /#/g;
var I18nPluralPipe = (function () {
    function I18nPluralPipe(_localization) {
        this._localization = _localization;
    }
    I18nPluralPipe.prototype.transform = function (value, pluralMap) {
        if (lang_1.isBlank(value))
            return '';
        if (!lang_1.isStringMap(pluralMap)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(I18nPluralPipe, pluralMap);
        }
        var key = localization_1.getPluralCategory(value, Object.getOwnPropertyNames(pluralMap), this._localization);
        return lang_1.StringWrapper.replaceAll(pluralMap[key], _INTERPOLATION_REGEXP, value.toString());
    };
    /** @nocollapse */
    I18nPluralPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'i18nPlural', pure: true },] },
    ];
    /** @nocollapse */
    I18nPluralPipe.ctorParameters = [
        { type: localization_1.NgLocalization, },
    ];
    return I18nPluralPipe;
}());
exports.I18nPluralPipe = I18nPluralPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9wbHVyYWxfcGlwZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3NyYy9waXBlcy9pMThuX3BsdXJhbF9waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBa0MsZUFBZSxDQUFDLENBQUE7QUFDbEQscUJBQWtELGdCQUFnQixDQUFDLENBQUE7QUFDbkUsNkJBQWdELGlCQUFpQixDQUFDLENBQUE7QUFDbEUsZ0RBQTJDLG1DQUFtQyxDQUFDLENBQUE7QUFFL0UsSUFBTSxxQkFBcUIsR0FBVyxJQUFJLENBQUM7QUFDM0M7SUFDRSx3QkFBb0IsYUFBNkI7UUFBN0Isa0JBQWEsR0FBYixhQUFhLENBQWdCO0lBQUcsQ0FBQztJQUVyRCxrQ0FBUyxHQUFULFVBQVUsS0FBYSxFQUFFLFNBQW9DO1FBQzNELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxrQkFBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixNQUFNLElBQUksOERBQTRCLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7UUFFRCxJQUFNLEdBQUcsR0FBRyxnQ0FBaUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVoRyxNQUFNLENBQUMsb0JBQWEsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFDSCxrQkFBa0I7SUFDWCx5QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxXQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsRUFBRyxFQUFFO0tBQ3pELENBQUM7SUFDRixrQkFBa0I7SUFDWCw2QkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSw2QkFBYyxHQUFHO0tBQ3ZCLENBQUM7SUFDRixxQkFBQztBQUFELENBQUMsQUF0QkQsSUFzQkM7QUF0Qlksc0JBQWMsaUJBc0IxQixDQUFBIn0=