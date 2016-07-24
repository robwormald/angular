/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var change_detection_util_1 = require('@angular/core/src/change_detection/change_detection_util');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
function main() {
    testing_internal_1.describe('ChangeDetectionUtil', function () {
        testing_internal_1.describe('devModeEqual', function () {
            testing_internal_1.it('should do the deep comparison of iterables', function () {
                testing_internal_1.expect(change_detection_util_1.devModeEqual([['one']], [['one']])).toBe(true);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(['one'], ['one', 'two'])).toBe(false);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(['one', 'two'], ['one'])).toBe(false);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(['one'], 'one')).toBe(false);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(['one'], new Object())).toBe(false);
                testing_internal_1.expect(change_detection_util_1.devModeEqual('one', ['one'])).toBe(false);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(new Object(), ['one'])).toBe(false);
            });
            testing_internal_1.it('should compare primitive numbers', function () {
                testing_internal_1.expect(change_detection_util_1.devModeEqual(1, 1)).toBe(true);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(1, 2)).toBe(false);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(new Object(), 2)).toBe(false);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(1, new Object())).toBe(false);
            });
            testing_internal_1.it('should compare primitive strings', function () {
                testing_internal_1.expect(change_detection_util_1.devModeEqual('one', 'one')).toBe(true);
                testing_internal_1.expect(change_detection_util_1.devModeEqual('one', 'two')).toBe(false);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(new Object(), 'one')).toBe(false);
                testing_internal_1.expect(change_detection_util_1.devModeEqual('one', new Object())).toBe(false);
            });
            testing_internal_1.it('should compare primitive booleans', function () {
                testing_internal_1.expect(change_detection_util_1.devModeEqual(true, true)).toBe(true);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(true, false)).toBe(false);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(new Object(), true)).toBe(false);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(true, new Object())).toBe(false);
            });
            testing_internal_1.it('should compare null', function () {
                testing_internal_1.expect(change_detection_util_1.devModeEqual(null, null)).toBe(true);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(null, 1)).toBe(false);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(new Object(), null)).toBe(false);
                testing_internal_1.expect(change_detection_util_1.devModeEqual(null, new Object())).toBe(false);
            });
            testing_internal_1.it('should return true for other objects', function () { testing_internal_1.expect(change_detection_util_1.devModeEqual(new Object(), new Object())).toBe(true); });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdG9yX3V0aWxfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L2NoYW5nZV9kZXRlY3Rpb24vY2hhbmdlX2RldGVjdG9yX3V0aWxfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsc0NBQTJCLDBEQUEwRCxDQUFDLENBQUE7QUFDdEYsaUNBQStFLHdDQUF3QyxDQUFDLENBQUE7QUFFeEg7SUFDRSwyQkFBUSxDQUFDLHFCQUFxQixFQUFFO1FBQzlCLDJCQUFRLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLHFCQUFFLENBQUMsNENBQTRDLEVBQUU7Z0JBQy9DLHlCQUFNLENBQUMsb0NBQVksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN0RCx5QkFBTSxDQUFDLG9DQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxRCx5QkFBTSxDQUFDLG9DQUFZLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxRCx5QkFBTSxDQUFDLG9DQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakQseUJBQU0sQ0FBQyxvQ0FBWSxDQUFDLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUss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