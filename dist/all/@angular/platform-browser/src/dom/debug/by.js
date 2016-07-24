/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var dom_adapter_1 = require('../../dom/dom_adapter');
var lang_1 = require('../../facade/lang');
/**
 * Predicates for use with {@link DebugElement}'s query functions.
 *
 * @experimental All debugging apis are currently experimental.
 */
var By = (function () {
    function By() {
    }
    /**
     * Match all elements.
     *
     * ## Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_all'}
     */
    By.all = function () { return function (debugElement) { return true; }; };
    /**
     * Match elements by the given CSS selector.
     *
     * ## Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_css'}
     */
    By.css = function (selector) {
        return function (debugElement) {
            return lang_1.isPresent(debugElement.nativeElement) ?
                dom_adapter_1.getDOM().elementMatches(debugElement.nativeElement, selector) :
                false;
        };
    };
    /**
     * Match elements that have the given directive present.
     *
     * ## Example
     *
     * {@example platform-browser/dom/debug/ts/by/by.ts region='by_directive'}
     */
    By.directive = function (type) {
        return function (debugElement) { return debugElement.providerTokens.indexOf(type) !== -1; };
    };
    return By;
}());
exports.By = By;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9kZWJ1Zy9ieS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBSUgsNEJBQXFCLHVCQUF1QixDQUFDLENBQUE7QUFFN0MscUJBQThCLG1CQUFtQixDQUFDLENBQUE7QUFJbEQ7Ozs7R0FJRztBQUNIO0lBQUE7SUFtQ0EsQ0FBQztJQWxDQzs7Ozs7O09BTUc7SUFDSSxNQUFHLEdBQVYsY0FBd0MsTUFBTSxDQUFDLFVBQUMsWUFBWSxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQyxDQUFDLENBQUM7SUFFeEU7Ozs7OztPQU1HO0lBQ0ksTUFBRyxHQUFWLFVBQVcsUUFBZ0I7UUFDekIsTUFBTSxDQUFDLFVBQUMsWUFBWTtZQUNsQixNQUFNLENBQUMsZ0JBQVMsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO2dCQUN4QyxvQkFBTSxFQUFFLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsUUFBUSxDQUFDO2dCQUM3RCxLQUFLLENBQUM7UUFDWixDQUFDLENBQUM7SUFDSixDQUFDO0lBRUQ7Ozs7OztPQU1HO0lBQ0ksWUFBUyxHQUFoQixVQUFpQixJQUFVO1FBQ3pCLE1BQU0sQ0FBQyxVQUFDLFlBQVksSUFBTyxNQUFNLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEYsQ0FBQztJQUNILFNBQUM7QUFBRCxDQUFDLEFBbkNELElBbUNDO0FBbkNZLFVBQUUsS0FtQ2QsQ0FBQSJ9