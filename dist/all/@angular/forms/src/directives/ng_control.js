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
var abstract_control_directive_1 = require('./abstract_control_directive');
/**
 * A base class that all control directive extend.
 * It binds a {@link Control} object to a DOM element.
 *
 * Used internally by Angular forms.
 *
 * @experimental
 */
var NgControl = (function (_super) {
    __extends(NgControl, _super);
    function NgControl() {
        _super.apply(this, arguments);
        this.name = null;
        this.valueAccessor = null;
    }
    Object.defineProperty(NgControl.prototype, "validator", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgControl.prototype, "asyncValidator", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return NgControl;
}(abstract_control_directive_1.AbstractControlDirective));
exports.NgControl = NgControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZm9ybXMvc3JjL2RpcmVjdGl2ZXMvbmdfY29udHJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCwyQkFBNEIsc0JBQXNCLENBQUMsQ0FBQTtBQUVuRCwyQ0FBdUMsOEJBQThCLENBQUMsQ0FBQTtBQUt0RTs7Ozs7OztHQU9HO0FBQ0g7SUFBd0MsNkJBQXdCO0lBQWhFO1FBQXdDLDhCQUF3QjtRQUM5RCxTQUFJLEdBQVcsSUFBSSxDQUFDO1FBQ3BCLGtCQUFhLEdBQXlCLElBQUksQ0FBQztJQU03QyxDQUFDO0lBSkMsc0JBQUksZ0NBQVM7YUFBYixjQUErQixNQUFNLENBQWMsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDckUsc0JBQUkscUNBQWM7YUFBbEIsY0FBeUMsTUFBTSxDQUFtQiwwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUd0RixnQkFBQztBQUFELENBQUMsQUFSRCxDQUF3QyxxREFBd0IsR0FRL0Q7QUFScUIsaUJBQVMsWUFROUIsQ0FBQSJ9