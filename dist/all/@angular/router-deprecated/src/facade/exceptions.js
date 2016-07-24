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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyLWRlcHJlY2F0ZWQvc3JjL2ZhY2FkZS9leGNlcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILHVDQUFtQywwQkFBMEIsQ0FBQyxDQUFBO0FBQzlELGtDQUErQixxQkFBcUIsQ0FBQyxDQUFBO0FBRXJELGtDQUErQixxQkFBcUIsQ0FBQztBQUE3QyxnRUFBNkM7QUFFckQ7O0dBRUc7QUFDSDtJQUFtQyxpQ0FBSztJQUV0Qyx1QkFBbUIsT0FBc0I7UUFBN0IsdUJBQTZCLEdBQTdCLGNBQTZCO1FBQ3ZDLGtCQUFNLE9BQU8sQ0FBQyxDQUFDO1FBREUsWUFBTyxHQUFQLE9BQU8sQ0FBZTtRQUV2QyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDL0MsQ0FBQztJQUVELGdDQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzdDLG9CQUFDO0FBQUQsQ0FBQyxBQVJELENBQW1DLEtBQUssR0FRdkM7QUFSWSxxQkFBYSxnQkFRekIsQ0FBQTtBQUVEOzs7R0FHRztBQUNIO0lBQXNDLG9DQUFvQjtJQUd4RCwwQkFDWSxlQUF1QixFQUFVLGtCQUF1QixDQUFDLGlCQUFpQixFQUMxRSxjQUFvQixDQUFDLGlCQUFpQixFQUFVLFFBQWMsQ0FBQyxpQkFBaUI7UUFDMUYsa0JBQU0sZUFBZSxDQUFDLENBQUM7UUFGYixvQkFBZSxHQUFmLGVBQWUsQ0FBUTtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBSztRQUN4RCxtQkFBYyxHQUFkLGNBQWMsQ0FBTTtRQUE0QixhQUFRLEdBQVIsUUFBUSxDQUFNO1FBRXhFLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBTSxJQUFJLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMvRCxDQUFDO0lBRUQsc0JBQUksNENBQWM7YUFBbEIsY0FBK0IsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUU3RCxzQkFBSSwwQ0FBWTthQUFoQixjQUEwQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBR3RELHNCQUFJLCtDQUFpQjthQUFyQixjQUErQixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFaEUsc0JBQUksMkNBQWE7YUFBakIsY0FBMkIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUd4RCxzQkFBSSxxQ0FBTzthQUFYLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFNUMsc0JBQUkscUNBQU87YUFBWCxjQUF3QixNQUFNLENBQUMsb0NBQWdCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUUxRSxtQ0FBUSxHQUFSLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUM3Qyx1QkFBQztBQUFELENBQUMsQUF6QkQsQ0FBc0MsNkNBQW9CLEdBeUJ6RDtBQXpCWSx3QkFBZ0IsbUJBeUI1QixDQUFBO0FBRUQsdUJBQThCLE9BQWdCO0lBQzVDLE1BQU0sQ0FBQyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRmUscUJBQWEsZ0JBRTVCLENBQUE7QUFFRDtJQUNFLE1BQU0sSUFBSSxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDM0MsQ0FBQztBQUZlLHFCQUFhLGdCQUU1QixDQUFBIn0=