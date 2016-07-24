/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var intl_1 = require('../facade/intl');
var lang_1 = require('../facade/lang');
var invalid_pipe_argument_exception_1 = require('./invalid_pipe_argument_exception');
var defaultLocale = 'en-US';
var _NUMBER_FORMAT_REGEXP = /^(\d+)?\.((\d+)(\-(\d+))?)?$/g;
function formatNumber(pipe, value, style, digits, currency, currencyAsSymbol) {
    if (currency === void 0) { currency = null; }
    if (currencyAsSymbol === void 0) { currencyAsSymbol = false; }
    if (lang_1.isBlank(value))
        return null;
    // Convert strings to numbers
    value = lang_1.isString(value) && lang_1.NumberWrapper.isNumeric(value) ? +value : value;
    if (!lang_1.isNumber(value)) {
        throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(pipe, value);
    }
    var minInt;
    var minFraction;
    var maxFraction;
    if (style !== intl_1.NumberFormatStyle.Currency) {
        // rely on Intl default for currency
        minInt = 1;
        minFraction = 0;
        maxFraction = 3;
    }
    if (lang_1.isPresent(digits)) {
        var parts = lang_1.RegExpWrapper.firstMatch(_NUMBER_FORMAT_REGEXP, digits);
        if (!parts) {
            throw new Error(digits + " is not a valid digit info for number pipes");
        }
        if (lang_1.isPresent(parts[1])) {
            minInt = lang_1.NumberWrapper.parseIntAutoRadix(parts[1]);
        }
        if (lang_1.isPresent(parts[3])) {
            minFraction = lang_1.NumberWrapper.parseIntAutoRadix(parts[3]);
        }
        if (lang_1.isPresent(parts[5])) {
            maxFraction = lang_1.NumberWrapper.parseIntAutoRadix(parts[5]);
        }
    }
    return intl_1.NumberFormatter.format(value, defaultLocale, style, {
        minimumIntegerDigits: minInt,
        minimumFractionDigits: minFraction,
        maximumFractionDigits: maxFraction,
        currency: currency,
        currencyAsSymbol: currencyAsSymbol
    });
}
var DecimalPipe = (function () {
    function DecimalPipe() {
    }
    DecimalPipe.prototype.transform = function (value, digits) {
        if (digits === void 0) { digits = null; }
        return formatNumber(DecimalPipe, value, intl_1.NumberFormatStyle.Decimal, digits);
    };
    /** @nocollapse */
    DecimalPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'number' },] },
    ];
    return DecimalPipe;
}());
exports.DecimalPipe = DecimalPipe;
var PercentPipe = (function () {
    function PercentPipe() {
    }
    PercentPipe.prototype.transform = function (value, digits) {
        if (digits === void 0) { digits = null; }
        return formatNumber(PercentPipe, value, intl_1.NumberFormatStyle.Percent, digits);
    };
    /** @nocollapse */
    PercentPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'percent' },] },
    ];
    return PercentPipe;
}());
exports.PercentPipe = PercentPipe;
var CurrencyPipe = (function () {
    function CurrencyPipe() {
    }
    CurrencyPipe.prototype.transform = function (value, currencyCode, symbolDisplay, digits) {
        if (currencyCode === void 0) { currencyCode = 'USD'; }
        if (symbolDisplay === void 0) { symbolDisplay = false; }
        if (digits === void 0) { digits = null; }
        return formatNumber(CurrencyPipe, value, intl_1.NumberFormatStyle.Currency, digits, currencyCode, symbolDisplay);
    };
    /** @nocollapse */
    CurrencyPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'currency' },] },
    ];
    return CurrencyPipe;
}());
exports.CurrencyPipe = CurrencyPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyX3BpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbW1vbi9zcmMvcGlwZXMvbnVtYmVyX3BpcGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUFrQyxlQUFlLENBQUMsQ0FBQTtBQUVsRCxxQkFBaUQsZ0JBQWdCLENBQUMsQ0FBQTtBQUNsRSxxQkFBeUYsZ0JBQWdCLENBQUMsQ0FBQTtBQUUxRyxnREFBMkMsbUNBQW1DLENBQUMsQ0FBQTtBQUUvRSxJQUFJLGFBQWEsR0FBVyxPQUFPLENBQUM7QUFDcEMsSUFBTSxxQkFBcUIsR0FBRywrQkFBK0IsQ0FBQztBQUU5RCxzQkFDSSxJQUFVLEVBQUUsS0FBc0IsRUFBRSxLQUF3QixFQUFFLE1BQWMsRUFDNUUsUUFBdUIsRUFBRSxnQkFBaUM7SUFBMUQsd0JBQXVCLEdBQXZCLGVBQXVCO0lBQUUsZ0NBQWlDLEdBQWpDLHdCQUFpQztJQUM1RCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hDLDZCQUE2QjtJQUM3QixLQUFLLEdBQUcsZUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLG9CQUFhLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUMzRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckIsTUFBTSxJQUFJLDhEQUE0QixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBQ0QsSUFBSSxNQUFjLENBQUM7SUFDbkIsSUFBSSxXQUFtQixDQUFDO0lBQ3hCLElBQUksV0FBbUIsQ0FBQztJQUN4QixFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssd0JBQWlCLENBQUMsUUFB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