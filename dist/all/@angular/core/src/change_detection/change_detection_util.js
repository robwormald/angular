/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var collection_1 = require('../facade/collection');
var lang_1 = require('../facade/lang');
var lang_2 = require('../facade/lang');
exports.looseIdentical = lang_2.looseIdentical;
exports.UNINITIALIZED = {
    toString: function () { return 'CD_INIT_VALUE'; }
};
function devModeEqual(a, b) {
    if (collection_1.isListLikeIterable(a) && collection_1.isListLikeIterable(b)) {
        return collection_1.areIterablesEqual(a, b, devModeEqual);
    }
    else if (!collection_1.isListLikeIterable(a) && !lang_1.isPrimitive(a) && !collection_1.isListLikeIterable(b) && !lang_1.isPrimitive(b)) {
        return true;
    }
    else {
        return lang_1.looseIdentical(a, b);
    }
}
exports.devModeEqual = devModeEqual;
/**
 * Indicates that the result of a {@link PipeMetadata} transformation has changed even though the
 * reference
 * has not changed.
 *
 * The wrapped value will be unwrapped by change detection, and the unwrapped value will be stored.
 *
 * Example:
 *
 * ```
 * if (this._latestValue === this._latestReturnedValue) {
 *    return this._latestReturnedValue;
 *  } else {
 *    this._latestReturnedValue = this._latestValue;
 *    return WrappedValue.wrap(this._latestValue); // this will force update
 *  }
 * ```
 * @stable
 */
var WrappedValue = (function () {
    function WrappedValue(wrapped) {
        this.wrapped = wrapped;
    }
    WrappedValue.wrap = function (value) { return new WrappedValue(value); };
    return WrappedValue;
}());
exports.WrappedValue = WrappedValue;
/**
 * Helper class for unwrapping WrappedValue s
 */
var ValueUnwrapper = (function () {
    function ValueUnwrapper() {
        this.hasWrappedValue = false;
    }
    ValueUnwrapper.prototype.unwrap = function (value) {
        if (value instanceof WrappedValue) {
            this.hasWrappedValue = true;
            return value.wrapped;
        }
        return value;
    };
    ValueUnwrapper.prototype.reset = function () { this.hasWrappedValue = false; };
    return ValueUnwrapper;
}());
exports.ValueUnwrapper = ValueUnwrapper;
/**
 * Represents a basic change from a previous to a new value.
 * @stable
 */
var SimpleChange = (function () {
    function SimpleChange(previousValue, currentValue) {
        this.previousValue = previousValue;
        this.currentValue = currentValue;
    }
    /**
     * Check whether the new value is the first value assigned.
     */
    SimpleChange.prototype.isFirstChange = function () { return this.previousValue === exports.UNINITIALIZED; };
    return SimpleChange;
}());
exports.SimpleChange = SimpleChange;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdGlvbl91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3NyYy9jaGFuZ2VfZGV0ZWN0aW9uL2NoYW5nZV9kZXRlY3Rpb25fdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsMkJBQW9ELHNCQUFzQixDQUFDLENBQUE7QUFDM0UscUJBQTBDLGdCQUFnQixDQUFDLENBQUE7QUFFM0QscUJBQTZCLGdCQUFnQixDQUFDO0FBQXRDLCtDQUFzQztBQUVqQyxxQkFBYSxHQUFHO0lBQzNCLFFBQVEsRUFBRSxjQUFNLE9BQUEsZUFBZSxFQUFmLENBQWU7Q0FDaEMsQ0FBQztBQUVGLHNCQUE2QixDQUFNLEVBQUUsQ0FBTTtJQUN6QyxFQUFFLENBQUMsQ0FBQywrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSwrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLDhCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFFL0MsQ0FBQztJQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FDTixDQUFDLCtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLCtCQUFrQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0YsTUFBTSxDQUFDLElBQUksQ0FBQztJQUVkLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxxQkFBYyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUM5QixDQUFDO0FBQ0gsQ0FBQztBQVhlLG9CQUFZLGVBVzNCLENBQUE7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0g7SUFDRSxzQkFBbUIsT0FBWTtRQUFaLFlBQU8sR0FBUCxPQUFPLENBQUs7SUFBRyxDQUFDO0lBRTVCLGlCQUFJLEdBQVgsVUFBWSxLQUFVLElBQWtCLE1BQU0sQ0FBQyxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsbUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLG9CQUFZLGVBSXhCLENBQUE7QUFFRDs7R0FFRztBQUNIO0lBQUE7UUFDUyxvQkFBZSxHQUFHLEtBQUssQ0FBQztJQVdqQyxDQUFDO0lBVEMsK0JBQU0sR0FBTixVQUFPLEtBQVU7UUFDZixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksWUFBWSxDQUFDLENBQUMsQ0FBQztZQUNsQyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztZQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztRQUN2QixDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCw4QkFBSyxHQUFMLGNBQVUsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNDLHFCQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFaWSxzQkFBYyxpQkFZMUIsQ0FBQTtBQUVEOzs7R0FHRztBQUNIO0lBQ0Usc0JBQW1CLGFBQWtCLEVBQVMsWUFBaUI7UUFBNUMsa0JBQWEsR0FBYixhQUFhLENBQUs7UUFBUyxpQkFBWSxHQUFaLFlBQVksQ0FBSztJQUFHLENBQUM7SUFFbkU7O09BRUc7SUFDSCxvQ0FBYSxHQUFiLGNBQTJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxLQUFLLHFCQUFhLENBQUMsQ0FBQyxDQUFDO0lBQzNFLG1CQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFQWSxvQkFBWSxlQU94QixDQUFBIn0=