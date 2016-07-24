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
var JsonPipe = (function () {
    function JsonPipe() {
    }
    JsonPipe.prototype.transform = function (value) { return lang_1.Json.stringify(value); };
    /** @nocollapse */
    JsonPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'json', pure: false },] },
    ];
    return JsonPipe;
}());
exports.JsonPipe = JsonPipe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9waXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vc3JjL3BpcGVzL2pzb25fcGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQWtDLGVBQWUsQ0FBQyxDQUFBO0FBRWxELHFCQUFtQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3BDO0lBQUE7SUFNQSxDQUFDO0lBTEMsNEJBQVMsR0FBVCxVQUFVLEtBQVUsSUFBWSxNQUFNLENBQUMsV0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakUsa0JBQWtCO0lBQ1gsbUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsV0FBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLEVBQUcsRUFBRTtLQUNwRCxDQUFDO0lBQ0YsZUFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBTlksZ0JBQVEsV0FNcEIsQ0FBQSJ9