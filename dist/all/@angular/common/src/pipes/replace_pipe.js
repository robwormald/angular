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
var invalid_pipe_argument_exception_1 = require('./invalid_pipe_argument_exception');
var ReplacePipe = (function () {
    function ReplacePipe() {
    }
    ReplacePipe.prototype.transform = function (value, pattern, replacement) {
        if (lang_1.isBlank(value)) {
            return value;
        }
        if (!this._supportedInput(value)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, value);
        }
        var input = value.toString();
        if (!this._supportedPattern(pattern)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, pattern);
        }
        if (!this._supportedReplacement(replacement)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(ReplacePipe, replacement);
        }
        if (lang_1.isFunction(replacement)) {
            var rgxPattern = lang_1.isString(pattern) ? lang_1.RegExpWrapper.create(pattern) : pattern;
            return lang_1.StringWrapper.replaceAllMapped(input, rgxPattern, replacement);
        }
        if (pattern instanceof RegExp) {
            // use the replaceAll variant
            return lang_1.StringWrapper.replaceAll(input, pattern, replacement);
        }
        return lang_1.StringWrapper.replace(input, pattern, replacement);
    };
    ReplacePipe.prototype._supportedInput = function (input) { return lang_1.isString(input) || lang_1.isNumber(input); };
    ReplacePipe.prototype._supportedPattern = function (pattern) {
        return lang_1.isString(pattern) || pattern instanceof RegExp;
    };
    ReplacePipe.prototype._supportedReplacement = function (replacement) {
        return lang_1.isString(replacement) || lang_1.isFunction(replacement);
    };
    /** @nocollapse */
    ReplacePipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'replace' },] },
    ];
    return ReplacePipe;
}());
exports.ReplacePipe = ReplacePipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZV9waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vc3JjL3BpcGVzL3JlcGxhY2VfcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQWtDLGVBQWUsQ0FBQyxDQUFBO0FBQ2xELHFCQUFvRixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3JHLGdEQUEyQyxtQ0FBbUMsQ0FBQyxDQUFBO0FBQy9FO0lBQUE7SUErQ0EsQ0FBQztJQTlDQywrQkFBUyxHQUFULFVBQVUsS0FBVSxFQUFFLE9BQXNCLEVBQUUsV0FBNEI7UUFDeEUsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsTUFBTSxJQUFJLDhEQUE0QixDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBRUQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxNQUFNLElBQUksOERBQTRCLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MsTUFBTSxJQUFJLDhEQUE0QixDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNuRSxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsaUJBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBTSxVQUFVLEdBQUcsZUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLG9CQUFhLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLE9BQU8sQ0FBQztZQUUvRSxNQUFNLENBQUMsb0JBQWEsQ0FBQyxnQkFBZ0IsQ0FDakMsS0FBSyxFQUFFLFVBQVUsRUFBMkIsV0FBVyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sWUFBWSxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzlCLDZCQUE2QjtZQUM3QixNQUFNLENBQUMsb0JBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBVSxXQUFXLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBRUQsTUFBTSxDQUFDLG9CQUFhLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBVSxPQUFPLEVBQVUsV0FBVyxDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVPLHFDQUFlLEdBQXZCLFVBQXdCLEtBQVUsSUFBYSxNQUFNLENBQUMsZUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLGVBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbkYsdUNBQWlCLEdBQXpCLFVBQTBCLE9BQVk7UUFDcEMsTUFBTSxDQUFDLGVBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxPQUFPLFlBQVksTUFBTSxDQUFDO0lBQ3hELENBQUM7SUFFTywyQ0FBcUIsR0FBN0IsVUFBOEIsV0FBZ0I7UUFDNUMsTUFBTSxDQUFDLGVBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxpQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDSCxrQkFBa0I7SUFDWCxzQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxXQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLEVBQUcsRUFBRTtLQUMxQyxDQUFDO0lBQ0Ysa0JBQUM7QUFBRCxDQUFDLEFBL0NELElBK0NDO0FBL0NZLG1CQUFXLGNBK0N2QixDQUFBIn0=