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
var base_wrapped_exception_1 = require('./base_wrapped_exception');
var exception_handler_1 = require('./exception_handler');
var exception_handler_2 = require('./exception_handler');
exports.ExceptionHandler = exception_handler_2.ExceptionHandler;
/**
 * @stable
 */
var BaseException = (function (_super) {
    __extends(BaseException, _super);
    function BaseException(message) {
        if (message === void 0) { message = '--'; }
        _super.call(this, message);
        this.message = message;
        this.stack = (new Error(message)).stack;
    }
    BaseException.prototype.toString = function () { return this.message; };
    return BaseException;
}(Error));
exports.BaseException = BaseException;
/**
 * Wraps an exception and provides additional context or information.
 * @stable
 */
var WrappedException = (function (_super) {
    __extends(WrappedException, _super);
    function WrappedException(_wrapperMessage, _originalException /** TODO #9100 */, _originalStack /** TODO #9100 */, _context /** TODO #9100 */) {
        _super.call(this, _wrapperMessage);
        this._wrapperMessage = _wrapperMessage;
        this._originalException = _originalException;
        this._originalStack = _originalStack;
        this._context = _context;
        this._wrapperStack = (new Error(_wrapperMessage)).stack;
    }
    Object.defineProperty(WrappedException.prototype, "wrapperMessage", {
        get: function () { return this._wrapperMessage; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "wrapperStack", {
        get: function () { return this._wrapperStack; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "originalException", {
        get: function () { return this._originalException; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "originalStack", {
        get: function () { return this._originalStack; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "context", {
        get: function () { return this._context; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WrappedException.prototype, "message", {
        get: function () { return exception_handler_1.ExceptionHandler.exceptionToString(this); },
        enumerable: true,
        configurable: true
    });
    WrappedException.prototype.toString = function () { return this.message; };
    return WrappedException;
}(base_wrapped_exception_1.BaseWrappedException));
exports.WrappedException = WrappedException;
function makeTypeError(message) {
    return new TypeError(message);
}
exports.makeTypeError = makeTypeError;
function unimplemented() {
    throw new BaseException('unimplemented');
}
exports.unimplemented = unimplemented;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tc2VydmVyL3NyYy9mYWNhZGUvZXhjZXB0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCx1Q0FBbUMsMEJBQTBCLENBQUMsQ0FBQTtBQUM5RCxrQ0FBK0IscUJBQXFCLENBQUMsQ0FBQTtBQUVyRCxrQ0FBK0IscUJBQXFCLENBQUM7QUFBN0MsZ0VBQTZDO0FBRXJEOztHQUVHO0FBQ0g7SUFBbUMsaUNBQUs7SUFFdEMsdUJBQW1CLE9BQXNCO1FBQTdCLHVCQUE2QixHQUE3QixjQUE2QjtRQUN2QyxrQkFBTSxPQUFPLENBQUMsQ0FBQztRQURFLFlBQU8sR0FBUCxPQUFPLENBQWU7UUFFdkMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQy9DLENBQUM7SUFFRCxnQ0FBUSxHQUFSLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM3QyxvQkFBQztBQUFELENBQUMsQUFSRCxDQUFtQyxLQUFLLEdBUXZDO0FBUlkscUJBQWEsZ0JBUXpCLENBQUE7QUFFRDs7O0dBR0c7QUFDSDtJQUFzQyxvQ0FBb0I7SUFHeEQsMEJBQ1ksZUFBdUIsRUFBVSxrQkFBdUIsQ0FBQyxpQkFBaUIsRUFDMUUsY0FBb0IsQ0FBQyxpQkFBaUIsRUFBVSxRQUFjLENBQUMsaUJBQWlCO1FBQzFGLGtCQUFNLGVBQWUsQ0FBQyxDQUFDO1FBRmIsb0JBQWUsR0FBZixlQUFlLENBQVE7UUFBVSx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQUs7UUFDeEQsbUJBQWMsR0FBZCxjQUFjLENBQU07UUFBNEIsYUFBUSxHQUFSLFFBQVEsQ0FBTTtRQUV4RSxJQUFJLENBQUMsYUFBYSxHQUFHLENBQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDL0QsQ0FBQztJQUVELHNCQUFJLDRDQUFjO2FBQWxCLGNBQStCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFN0Qsc0JBQUksMENBQVk7YUFBaEIsY0FBMEIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUd0RCxzQkFBSSwrQ0FBaUI7YUFBckIsY0FBK0IsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRWhFLHNCQUFJLDJDQUFhO2FBQWpCLGNBQTJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFHeEQsc0JBQUkscUNBQU87YUFBWCxjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTVDLHNCQUFJLHFDQUFPO2FBQVgsY0FBd0IsTUFBTSxDQUFDLG9DQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFMUUsbUNBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDN0MsdUJBQUM7QUFBRCxDQUFDLEFBekJELENBQXNDLDZDQUFvQixHQXlCekQ7QUF6Qlksd0JBQWdCLG1CQXlCNUIsQ0FBQTtBQUVELHVCQUE4QixPQUFnQjtJQUM1QyxNQUFNLENBQUMsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQUZlLHFCQUFhLGdCQUU1QixDQUFBO0FBRUQ7SUFDRSxNQUFNLElBQUksYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzNDLENBQUM7QUFGZSxxQkFBYSxnQkFFNUIsQ0FBQSJ9