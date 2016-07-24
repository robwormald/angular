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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvaHR0cC9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsdUNBQW1DLDBCQUEwQixDQUFDLENBQUE7QUFDOUQsa0NBQStCLHFCQUFxQixDQUFDLENBQUE7QUFFckQsa0NBQStCLHFCQUFxQixDQUFDO0FBQTdDLGdFQUE2QztBQUVyRDs7R0FFRztBQUNIO0lBQW1DLGlDQUFLO0lBRXRDLHVCQUFtQixPQUFzQjtRQUE3Qix1QkFBNkIsR0FBN0IsY0FBNkI7UUFDdkMsa0JBQU0sT0FBTyxDQUFDLENBQUM7UUFERSxZQUFPLEdBQVAsT0FBTyxDQUFlO1FBRXZDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUMvQyxDQUFDO0lBRUQsZ0NBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDN0Msb0JBQUM7QUFBRCxDQUFDLEFBUkQsQ0FBbUMsS0FBSyxHQVF2QztBQVJZLHFCQUFhLGdCQVF6QixDQUFBO0FBRUQ7OztHQUdHO0FBQ0g7SUFBc0Msb0NBQW9CO0lBR3hELDBCQUNZLGVBQXVCLEVBQVUsa0JBQXVCLENBQUMsaUJBQWlCLEVBQzFFLGNBQW9CLENBQUMsaUJBQWlCLEVBQVUsUUFBYyxDQUFDLGlCQUFpQjtRQUMxRixrQkFBTSxlQUFlLENBQUMsQ0FBQztRQUZiLG9CQUFlLEdBQWYsZUFBZSxDQUFRO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFLO1FBQ3hELG1CQUFjLEdBQWQsY0FBYyxDQUFNO1FBQTRCLGFBQVEsR0FBUixRQUFRLENBQU07UUFFeEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO0lBQy9ELENBQUM7SUFFRCxzQkFBSSw0Q0FBYzthQUFsQixjQUErQixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTdELHNCQUFJLDBDQUFZO2FBQWhCLGNBQTBCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFHdEQsc0JBQUksK0NBQWlCO2FBQXJCLGNBQStCLE1BQU0sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVoRSxzQkFBSSwyQ0FBYTthQUFqQixjQUEyQixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBR3hELHNCQUFJLHFDQUFPO2FBQVgsY0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUU1QyxzQkFBSSxxQ0FBTzthQUFYLGNBQXdCLE1BQU0sQ0FBQyxvQ0FBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTFFLG1DQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzdDLHVCQUFDO0FBQUQsQ0FBQyxBQXpCRCxDQUFzQyw2Q0FBb0IsR0F5QnpEO0FBekJZLHdCQUFnQixtQkF5QjVCLENBQUE7QUFFRCx1QkFBOEIsT0FBZ0I7SUFDNUMsTUFBTSxDQUFDLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFGZSxxQkFBYSxnQkFFNUIsQ0FBQTtBQUVEO0lBQ0UsTUFBTSxJQUFJLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBRmUscUJBQWEsZ0JBRTVCLENBQUEifQ==