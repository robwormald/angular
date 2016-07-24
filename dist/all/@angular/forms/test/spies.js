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
var change_detector_ref_1 = require('@angular/core/src/change_detection/change_detector_ref');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var SpyChangeDetectorRef = (function (_super) {
    __extends(SpyChangeDetectorRef, _super);
    function SpyChangeDetectorRef() {
        _super.call(this, change_detector_ref_1.ChangeDetectorRef);
        this.spy('markForCheck');
    }
    return SpyChangeDetectorRef;
}(testing_internal_1.SpyObject));
exports.SpyChangeDetectorRef = SpyChangeDetectorRef;
var SpyNgControl = (function (_super) {
    __extends(SpyNgControl, _super);
    function SpyNgControl() {
        _super.apply(this, arguments);
    }
    return SpyNgControl;
}(testing_internal_1.SpyObject));
exports.SpyNgControl = SpyNgControl;
var SpyValueAccessor = (function (_super) {
    __extends(SpyValueAccessor, _super);
    function SpyValueAccessor() {
        _super.apply(this, arguments);
    }
    return SpyValueAccessor;
}(testing_internal_1.SpyObject));
exports.SpyValueAccessor = SpyValueAccessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2Zvcm1zL3Rlc3Qvc3BpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsb0NBQWdDLHdEQUF3RCxDQUFDLENBQUE7QUFDekYsaUNBQStCLHdDQUF3QyxDQUFDLENBQUE7QUFFeEU7SUFBMEMsd0NBQVM7SUFDakQ7UUFDRSxrQkFBTSx1Q0FBaUIsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQUxELENBQTBDLDRCQUFTLEdBS2xEO0FBTFksNEJBQW9CLHVCQUtoQyxDQUFBO0FBRUQ7SUFBa0MsZ0NBQVM7SUFBM0M7UUFBa0MsOEJBQVM7SUFBRSxDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUFDLEFBQTlDLENBQWtDLDRCQUFTLEdBQUc7QUFBakMsb0JBQVksZUFBcUIsQ0FBQTtBQUU5QztJQUFzQyxvQ0FBUztJQUEvQztRQUFzQyw4QkFBUztJQUFvQixDQUFDO0lBQUQsdUJBQUM7QUFBRCxDQUFDLEFBQXBFLENBQXNDLDRCQUFTLEdBQXFCO0FBQXZELHdCQUFnQixtQkFBdUMsQ0FBQSJ9