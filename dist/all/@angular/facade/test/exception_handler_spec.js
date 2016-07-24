/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var exceptions_1 = require('../src/exceptions');
var _CustomException = (function () {
    function _CustomException() {
        this.context = 'some context';
    }
    _CustomException.prototype.toString = function () { return 'custom'; };
    return _CustomException;
}());
function main() {
    testing_internal_1.describe('ExceptionHandler', function () {
        testing_internal_1.it('should output exception', function () {
            var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.BaseException('message!'));
            testing_internal_1.expect(e).toContain('message!');
        });
        testing_internal_1.it('should output stackTrace', function () {
            var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.BaseException('message!'), 'stack!');
            testing_internal_1.expect(e).toContain('stack!');
        });
        testing_internal_1.it('should join a long stackTrace', function () {
            var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.BaseException('message!'), ['stack1', 'stack2']);
            testing_internal_1.expect(e).toContain('stack1');
            testing_internal_1.expect(e).toContain('stack2');
        });
        testing_internal_1.it('should output reason when present', function () {
            var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.BaseException('message!'), null, 'reason!');
            testing_internal_1.expect(e).toContain('reason!');
        });
        testing_internal_1.describe('context', function () {
            testing_internal_1.it('should print context', function () {
                var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.WrappedException('message!', null, null, 'context!'));
                testing_internal_1.expect(e).toContain('context!');
            });
            testing_internal_1.it('should print nested context', function () {
                var original = new exceptions_1.WrappedException('message!', null, null, 'context!');
                var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.WrappedException('message', original));
                testing_internal_1.expect(e).toContain('context!');
            });
            testing_internal_1.it('should not print context when the passed-in exception is not a BaseException', function () {
                var e = exceptions_1.ExceptionHandler.exceptionToString(new _CustomException());
                testing_internal_1.expect(e).not.toContain('context');
            });
        });
        testing_internal_1.describe('original exception', function () {
            testing_internal_1.it('should print original exception message if available (original is BaseException)', function () {
                var realOriginal = new exceptions_1.BaseException('inner');
                var original = new exceptions_1.WrappedException('wrapped', realOriginal);
                var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.WrappedException('wrappedwrapped', original));
                testing_internal_1.expect(e).toContain('inner');
            });
            testing_internal_1.it('should print original exception message if available (original is not BaseException)', function () {
                var realOriginal = new _CustomException();
                var original = new exceptions_1.WrappedException('wrapped', realOriginal);
                var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.WrappedException('wrappedwrapped', original));
                testing_internal_1.expect(e).toContain('custom');
            });
        });
        testing_internal_1.describe('original stack', function () {
            testing_internal_1.it('should print original stack if available', function () {
                var realOriginal = new exceptions_1.BaseException('inner');
                var original = new exceptions_1.WrappedException('wrapped', realOriginal, 'originalStack');
                var e = exceptions_1.ExceptionHandler.exceptionToString(new exceptions_1.WrappedException('wrappedwrapped', original, 'wrappedStack'));
                testing_internal_1.expect(e).toContain('originalStack');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9uX2hhbmRsZXJfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZmFjYWRlL3Rlc3QvZXhjZXB0aW9uX2hhbmRsZXJfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQXdGLHdDQUF3QyxDQUFDLENBQUE7QUFDakksMkJBQWdFLG1CQUFtQixDQUFDLENBQUE7QUFFcEY7SUFBQTtRQUNFLFlBQU8sR0FBRyxjQUFjLENBQUM7SUFFM0IsQ0FBQztJQURDLG1DQUFRLEdBQVIsY0FBcUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDekMsdUJBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUVEO0lBQ0UsMkJBQVEsQ0FBQyxrQkFBa0IsRUFBRTtRQUMzQixxQkFBRSxDQUFDLHlCQUF5QixFQUFFO1lBQzVCLElBQUksQ0FBQyxHQUFHLDZCQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUksMEJBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQzFFLHlCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQywwQkFBMEIsRUFBRTtZQUM3QixJQUFJLENBQUMsR0FBRyw2QkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLDBCQUFhLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDcEYseUJBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLCtCQUErQixFQUFFO1lBQ2xDLElBQUksQ0FBQyxHQUNELDZCQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUksMEJBQWEsQ0FBQyxVQUFVLENBQUMsRUFBRSxD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