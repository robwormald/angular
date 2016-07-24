/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../src/facade/lang');
function assertArrayOfStrings(identifier, value) {
    if (!core_1.isDevMode() || lang_1.isBlank(value)) {
        return;
    }
    if (!lang_1.isArray(value)) {
        throw new Error("Expected '" + identifier + "' to be an array of strings.");
    }
    for (var i = 0; i < value.length; i += 1) {
        if (!lang_1.isString(value[i])) {
            throw new Error("Expected '" + identifier + "' to be an array of strings.");
        }
    }
}
exports.assertArrayOfStrings = assertArrayOfStrings;
var INTERPOLATION_BLACKLIST_REGEXPS = [
    /^\s*$/,
    /[<>]/,
    /^[{}]$/,
    /&(#|[a-z])/i,
    /^\/\//,
];
function assertInterpolationSymbols(identifier, value) {
    if (lang_1.isPresent(value) && !(lang_1.isArray(value) && value.length == 2)) {
        throw new Error("Expected '" + identifier + "' to be an array, [start, end].");
    }
    else if (core_1.isDevMode() && !lang_1.isBlank(value)) {
        var start_1 = value[0];
        var end_1 = value[1];
        // black list checking
        INTERPOLATION_BLACKLIST_REGEXPS.forEach(function (regexp) {
            if (regexp.test(start_1) || regexp.test(end_1)) {
                throw new Error("['" + start_1 + "', '" + end_1 + "'] contains unusable interpolation symbol.");
            }
        });
    }
}
exports.assertInterpolationSymbols = assertInterpolationSymbols;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXJ0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2Fzc2VydGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUV4QyxxQkFBb0Qsb0JBQW9CLENBQUMsQ0FBQTtBQUV6RSw4QkFBcUMsVUFBa0IsRUFBRSxLQUFVO0lBQ2pFLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQVMsRUFBRSxJQUFJLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkMsTUFBTSxDQUFDO0lBQ1QsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWEsVUFBVSxpQ0FBOEIsQ0FBQyxDQUFDO0lBQ3pFLENBQUM7SUFDRCxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1FBQ3pDLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLGVBQWEsVUFBVSxpQ0FBOEIsQ0FBQyxDQUFDO1FBQ3pFLENBQUM7SUFDSCxDQUFDO0FBQ0gsQ0FBQztBQVplLDRCQUFvQix1QkFZbkMsQ0FBQTtBQUVELElBQU0sK0JBQStCLEdBQUc7SUFDdEMsT0FBTztJQUNQLE1BQU07SUFDTixRQUFRO0lBQ1IsYUFBYTtJQUNiLE9BQU87Q0FDUixDQUFDO0FBRUYsb0NBQTJDLFVBQWtCLEVBQUUsS0FBVTtJQUN2RSxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0QsTUFBTSxJQUFJLEtBQUssQ0FBQyxlQUFhLFVBQVUsb0NBQWlDLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLEVBQUUsSUFBSSxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBTSxPQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBVyxDQUFDO1FBQ2pDLElBQU0sS0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQVcsQ0FBQztRQUMvQixzQkFBc0I7UUFDdEIsK0JBQStCLENBQUMsT0FBTyxDQUFDLFVBQUEsTUFBTTtZQUM1QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQUssT0FBSyxZQUFPLEtBQUcsK0NBQTRDLENBQUMsQ0FBQztZQUNwRixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0FBQ0gsQ0FBQztBQWJlLGtDQUEwQiw2QkFhekMsQ0FBQSJ9