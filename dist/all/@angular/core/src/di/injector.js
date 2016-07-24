/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
var _THROW_IF_NOT_FOUND = new Object();
exports.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
var _NullInjector = (function () {
    function _NullInjector() {
    }
    _NullInjector.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = _THROW_IF_NOT_FOUND; }
        if (notFoundValue === _THROW_IF_NOT_FOUND) {
            throw new exceptions_1.BaseException("No provider for " + lang_1.stringify(token) + "!");
        }
        return notFoundValue;
    };
    return _NullInjector;
}());
/**
 * @stable
 */
var Injector = (function () {
    function Injector() {
    }
    /**
     * Retrieves an instance from the injector based on the provided token.
     * If not found:
     * - Throws {@link NoProviderError} if no `notFoundValue` that is not equal to
     * Injector.THROW_IF_NOT_FOUND is given
     * - Returns the `notFoundValue` otherwise
     *
     * ### Example ([live demo](http://plnkr.co/edit/HeXSHg?p=preview))
     *
     * ```typescript
     * var injector = ReflectiveInjector.resolveAndCreate([
     *   {provide: "validToken", useValue: "Value"}
     * ]);
     * expect(injector.get("validToken")).toEqual("Value");
     * expect(() => injector.get("invalidToken")).toThrowError();
     * ```
     *
     * `Injector` returns itself when given `Injector` as a token.
     *
     * ```typescript
     * var injector = ReflectiveInjector.resolveAndCreate([]);
     * expect(injector.get(Injector)).toBe(injector);
     * ```
     */
    Injector.prototype.get = function (token, notFoundValue) { return exceptions_1.unimplemented(); };
    Injector.THROW_IF_NOT_FOUND = _THROW_IF_NOT_FOUND;
    Injector.NULL = new _NullInjector();
    return Injector;
}());
exports.Injector = Injector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvc3JjL2RpL2luamVjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCwyQkFBMkMsc0JBQXNCLENBQUMsQ0FBQTtBQUNsRSxxQkFBd0IsZ0JBQWdCLENBQUMsQ0FBQTtBQUV6QyxJQUFNLG1CQUFtQixHQUFzQixJQUFJLE1BQU0sRUFBRSxDQUFDO0FBQy9DLDBCQUFrQixHQUFzQixtQkFBbUIsQ0FBQztBQUV6RTtJQUFBO0lBT0EsQ0FBQztJQU5DLDJCQUFHLEdBQUgsVUFBSSxLQUFVLEVBQUUsYUFBd0M7UUFBeEMsNkJBQXdDLEdBQXhDLG1DQUF3QztRQUN0RCxFQUFFLENBQUMsQ0FBQyxhQUFhLEtBQUssbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQzFDLE1BQU0sSUFBSSwwQkFBYSxDQUFDLHFCQUFtQixnQkFBUyxDQUFDLEtBQUssQ0FBQyxNQUFHLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBQ0QsTUFBTSxDQUFDLGFBQWEsQ0FBQztJQUN2QixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQUVEOztHQUVHO0FBQ0g7SUFBQTtJQTZCQSxDQUFDO0lBekJDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVCRztJQUNILHNCQUFHLEdBQUgsVUFBSSxLQUFVLEVBQUUsYUFBbUIsSUFBUyxNQUFNLENBQUMsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQTNCOUQsMkJBQWtCLEdBQUcsbUJBQW1CLENBQUM7SUFDekMsYUFBSSxHQUFhLElBQUksYUFBYSxFQUFFLENBQUM7SUEyQjlDLGVBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBN0JxQixnQkFBUSxXQTZCN0IsQ0FBQSJ9