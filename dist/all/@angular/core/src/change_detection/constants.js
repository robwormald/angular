/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var lang_1 = require('../facade/lang');
/**
 * Describes within the change detector which strategy will be used the next time change
 * detection is triggered.
 * @stable
 */
(function (ChangeDetectionStrategy) {
    /**
     * `OnPush` means that the change detector's mode will be set to `CheckOnce` during hydration.
     */
    ChangeDetectionStrategy[ChangeDetectionStrategy["OnPush"] = 0] = "OnPush";
    /**
     * `Default` means that the change detector's mode will be set to `CheckAlways` during hydration.
     */
    ChangeDetectionStrategy[ChangeDetectionStrategy["Default"] = 1] = "Default";
})(exports.ChangeDetectionStrategy || (exports.ChangeDetectionStrategy = {}));
var ChangeDetectionStrategy = exports.ChangeDetectionStrategy;
/**
 * Describes the status of the detector.
 */
(function (ChangeDetectorStatus) {
    /**
     * `CheckedOnce` means that after calling detectChanges the mode of the change detector
     * will become `Checked`.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["CheckOnce"] = 0] = "CheckOnce";
    /**
     * `Checked` means that the change detector should be skipped until its mode changes to
     * `CheckOnce`.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Checked"] = 1] = "Checked";
    /**
     * `CheckAlways` means that after calling detectChanges the mode of the change detector
     * will remain `CheckAlways`.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["CheckAlways"] = 2] = "CheckAlways";
    /**
     * `Detached` means that the change detector sub tree is not a part of the main tree and
     * should be skipped.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Detached"] = 3] = "Detached";
    /**
     * `Errored` means that the change detector encountered an error checking a binding
     * or calling a directive lifecycle method and is now in an inconsistent state. Change
     * detectors in this state will no longer detect changes.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Errored"] = 4] = "Errored";
    /**
     * `Destroyed` means that the change detector is destroyed.
     */
    ChangeDetectorStatus[ChangeDetectorStatus["Destroyed"] = 5] = "Destroyed";
})(exports.ChangeDetectorStatus || (exports.ChangeDetectorStatus = {}));
var ChangeDetectorStatus = exports.ChangeDetectorStatus;
/**
 * List of possible {@link ChangeDetectionStrategy} values.
 */
exports.CHANGE_DETECTION_STRATEGY_VALUES = [
    ChangeDetectionStrategy.OnPush,
    ChangeDetectionStrategy.Default,
];
/**
 * List of possible {@link ChangeDetectorStatus} values.
 */
exports.CHANGE_DETECTOR_STATUS_VALUES = [
    ChangeDetectorStatus.CheckOnce,
    ChangeDetectorStatus.Checked,
    ChangeDetectorStatus.CheckAlways,
    ChangeDetectorStatus.Detached,
    ChangeDetectorStatus.Errored,
    ChangeDetectorStatus.Destroyed,
];
function isDefaultChangeDetectionStrategy(changeDetectionStrategy) {
    return lang_1.isBlank(changeDetectionStrategy) ||
        changeDetectionStrategy === ChangeDetectionStrategy.Default;
}
exports.isDefaultChangeDetectionStrategy = isDefaultChangeDetectionStrategy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3NyYy9jaGFuZ2VfZGV0ZWN0aW9uL2NvbnN0YW50cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQXNCLGdCQUFnQixDQUFDLENBQUE7QUFFdkM7Ozs7R0FJRztBQUNILFdBQVksdUJBQXVCO0lBQ2pDOztPQUVHO0lBQ0gseUVBQU0sQ0FBQTtJQUVOOztPQUVHO0lBQ0gsMkVBQU8sQ0FBQTtBQUNULENBQUMsRUFWVywrQkFBdUIsS0FBdkIsK0JBQXVCLFFBVWxDO0FBVkQsSUFBWSx1QkFBdUIsR0FBdkIsK0JBVVgsQ0FBQTtBQUVEOztHQUVHO0FBQ0gsV0FBWSxvQkFBb0I7SUFDOUI7OztPQUdHO0lBQ0gseUVBQVMsQ0FBQTtJQUVUOzs7T0FHRztJQUNILHFFQUFPLENBQUE7SUFFUDs7O09BR0c7SUFDSCw2RUFBVyxDQUFBO0lBRVg7OztPQUdHO0lBQ0gsdUVBQVEsQ0FBQTtJQUVSOzs7O09BSUc7SUFDSCxxRUFBTyxDQUFBO0lBRVA7O09BRUc7SUFDSCx5RUFBUyxDQUFBO0FBQ1gsQ0FBQyxFQXBDVyw0QkFBb0IsS0FBcEIsNEJBQW9CLFFBb0MvQjtBQXBDRCxJQUFZLG9CQUFvQixHQUFwQiw0QkFvQ1gsQ0FBQTtBQUVEOztHQUVHO0FBQ1Esd0NBQWdDLEdBQUc7SUFDNUMsdUJBQXVCLENBQUMsTUFBTTtJQUM5Qix1QkFBdUIsQ0FBQyxPQUFPO0NBQ2hDLENBQUM7QUFDRjs7R0FFRztBQUNRLHFDQUE2QixHQUFHO0lBQ3pDLG9CQUFvQixDQUFDLFNBQVM7SUFDOUIsb0JBQW9CLENBQUMsT0FBTztJQUM1QixvQkFBb0IsQ0FBQyxXQUFXO0lBQ2hDLG9CQUFvQixDQUFDLFFBQVE7SUFDN0Isb0JBQW9CLENBQUMsT0FBTztJQUM1QixvQkFBb0IsQ0FBQyxTQUFTO0NBQy9CLENBQUM7QUFFRiwwQ0FBaUQsdUJBQWdEO0lBRS9GLE1BQU0sQ0FBQyxjQUFPLENBQUMsdUJBQXVCLENBQUM7UUFDbkMsdUJBQXVCLEtBQUssdUJBQXVCLENBQUMsT0FBTyxDQUFDO0FBQ2xFLENBQUM7QUFKZSx3Q0FBZ0MsbUNBSS9DLENBQUEifQ==