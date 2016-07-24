/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
var InvalidPipeArgumentException = (function (_super) {
    __extends(InvalidPipeArgumentException, _super);
    function InvalidPipeArgumentException(type, value) {
        _super.call(this, "Invalid argument '" + value + "' for pipe '" + lang_1.stringify(type) + "'");
    }
    return InvalidPipeArgumentException;
}(exceptions_1.BaseException));
exports.InvalidPipeArgumentException = InvalidPipeArgumentException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52YWxpZF9waXBlX2FyZ3VtZW50X2V4Y2VwdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3NyYy9waXBlcy9pbnZhbGlkX3BpcGVfYXJndW1lbnRfZXhjZXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILDJCQUE0QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ25ELHFCQUE4QixnQkFBZ0IsQ0FBQyxDQUFBO0FBRS9DO0lBQWtELGdEQUFhO0lBQzdELHNDQUFZLElBQVUsRUFBRSxLQUFhO1FBQ25DLGtCQUFNLHVCQUFxQixLQUFLLG9CQUFlLGdCQUFTLENBQUMsSUFBSSxDQUFDLE1BQUcsQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDSCxtQ0FBQztBQUFELENBQUMsQUFKRCxDQUFrRCwwQkFBYSxHQUk5RDtBQUpZLG9DQUE0QiwrQkFJeEMsQ0FBQSJ9