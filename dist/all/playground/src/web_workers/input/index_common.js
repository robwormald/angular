/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var InputCmp = (function () {
    function InputCmp() {
        this.inputVal = "";
        this.textareaVal = "";
    }
    InputCmp.prototype.inputChanged = function (e /** TODO #9100 */) { this.inputVal = e.target.value; };
    InputCmp.prototype.textAreaChanged = function (e /** TODO #9100 */) { this.textareaVal = e.target.value; };
    /** @nocollapse */
    InputCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'input-app',
                    template: "\n    <h2>Input App</h2>\n    <div id=\"input-container\">\n      <input type=\"text\" (input)=\"inputChanged($event)\">\n      <textarea (input)=\"textAreaChanged($event)\"></textarea>\n      <div class=\"input-val\">Input val is {{inputVal}}.</div>\n      <div class=\"textarea-val\">Textarea val is {{textareaVal}}.</div>\n    </div>\n    <div id=\"ng-model-container\">\n    </div>\n  "
                },] },
    ];
    return InputCmp;
}());
exports.InputCmp = InputCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhfY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL3NyYy93ZWJfd29ya2Vycy9pbnB1dC9pbmRleF9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4QztJQUFBO1FBQ0UsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLGdCQUFXLEdBQUcsRUFBRSxDQUFDO0lBc0JuQixDQUFDO0lBcEJDLCtCQUFZLEdBQVosVUFBYSxDQUFNLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFMUUsa0NBQWUsR0FBZixVQUFnQixDQUFNLENBQUMsaUJBQWlCLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDbEYsa0JBQWtCO0lBQ1gsbUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSx1WUFVVDtpQkFDRixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0YsZUFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4QlksZ0JBQVEsV0F3QnBCLENBQUEifQ==