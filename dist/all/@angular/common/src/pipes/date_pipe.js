/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var collection_1 = require('../facade/collection');
var intl_1 = require('../facade/intl');
var lang_1 = require('../facade/lang');
var invalid_pipe_argument_exception_1 = require('./invalid_pipe_argument_exception');
// TODO: move to a global configurable location along with other i18n components.
var defaultLocale = 'en-US';
var DatePipe = (function () {
    function DatePipe() {
    }
    DatePipe.prototype.transform = function (value, pattern) {
        if (pattern === void 0) { pattern = 'mediumDate'; }
        if (lang_1.isBlank(value))
            return null;
        if (!this.supports(value)) {
            throw new invalid_pipe_argument_exception_1.InvalidPipeArgumentException(DatePipe, value);
        }
        if (lang_1.NumberWrapper.isNumeric(value)) {
            value = lang_1.DateWrapper.fromMillis(lang_1.NumberWrapper.parseInt(value, 10));
        }
        else if (lang_1.isString(value)) {
            value = lang_1.DateWrapper.fromISOString(value);
        }
        if (collection_1.StringMapWrapper.contains(DatePipe._ALIASES, pattern)) {
            pattern = collection_1.StringMapWrapper.get(DatePipe._ALIASES, pattern);
        }
        return intl_1.DateFormatter.format(value, defaultLocale, pattern);
    };
    DatePipe.prototype.supports = function (obj) {
        if (lang_1.isDate(obj) || lang_1.NumberWrapper.isNumeric(obj)) {
            return true;
        }
        if (lang_1.isString(obj) && lang_1.isDate(lang_1.DateWrapper.fromISOString(obj))) {
            return true;
        }
        return false;
    };
    /** @internal */
    DatePipe._ALIASES = {
        'medium': 'yMMMdjms',
        'short': 'yMdjm',
        'fullDate': 'yMMMMEEEEd',
        'longDate': 'yMMMMd',
        'mediumDate': 'yMMMd',
        'shortDate': 'yMd',
        'mediumTime': 'jms',
        'shortTime': 'jm'
    };
    /** @nocollapse */
    DatePipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'date', pure: true },] },
    ];
    return DatePipe;
}());
exports.DatePipe = DatePipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZV9waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vc3JjL3BpcGVzL2RhdGVfcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQWtDLGVBQWUsQ0FBQyxDQUFBO0FBQ2xELDJCQUErQixzQkFBc0IsQ0FBQyxDQUFBO0FBQ3RELHFCQUE0QixnQkFBZ0IsQ0FBQyxDQUFBO0FBQzdDLHFCQUFvRSxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3JGLGdEQUEyQyxtQ0FBbUMsQ0FBQyxDQUFBO0FBRS9FLGlGQUFpRjtBQUNqRixJQUFJLGFBQWEsR0FBVyxPQUFPLENBQUM7QUFDcEM7SUFBQTtJQTZDQSxDQUFDO0lBL0JDLDRCQUFTLEdBQVQsVUFBVSxLQUFVLEVBQUUsT0FBOEI7UUFBOUIsdUJBQThCLEdBQTlCLHNCQUE4QjtRQUNsRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBRWhDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsTUFBTSxJQUFJLDhEQUE0QixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsb0JBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLEtBQUssR0FBRyxrQkFBVyxDQUFDLFVBQVUsQ0FBQyxvQkFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsS0FBSyxHQUFHLGtCQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyw2QkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsT0FBTyxHQUFXLDZCQUFnQixDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFDRCxNQUFNLENBQUMsb0JBQWEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBRU8sMkJBQVEsR0FBaEIsVUFBaUIsR0FBUTtRQUN2QixFQUFFLENBQUMsQ0FBQyxhQUFNLENBQUMsR0FBRyxDQUFDLElBQUksb0JBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsZUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLGFBQU0sQ0FBQyxrQkFBVyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBdkNELGdCQUFnQjtJQUNULGlCQUFRLEdBQTRCO1FBQ3pDLFFBQVEsRUFBRSxVQUFVO1FBQ3BCLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLFVBQVUsRUFBRSxZQUFZO1FBQ3hCLFVBQVUsRUFBRSxRQUFRO1FBQ3BCLFlBQVksRUFBRSxPQUFPO1FBQ3JCLFdBQVcsRUFBRSxLQUFLO1FBQ2xCLFlBQVksRUFBRSxLQUFLO1FBQ25CLFdBQVcsRUFBRSxJQUFJO0tBQ2xCLENBQUM7SUE4Qkosa0JBQWtCO0lBQ1gsbUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsV0FBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEVBQUcsRUFBRTtLQUNuRCxDQUFDO0lBQ0YsZUFBQztBQUFELENBQUMsQUE3Q0QsSUE2Q0M7QUE3Q1ksZ0JBQVEsV0E2Q3BCLENBQUEifQ==