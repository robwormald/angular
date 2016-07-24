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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbW1vbi90ZXN0L3NwaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILG9DQUFnQyx3REFBd0QsQ0FBQyxDQUFBO0FBQ3pGLGlDQUErQix3Q0FBd0MsQ0FBQyxDQUFBO0FBRXhFO0lBQTBDLHdDQUFTO0lBQ2pEO1FBQ0Usa0JBQU0sdUNBQWlCLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUFMRCxDQUEwQyw0QkFBUyxHQUtsRDtBQUxZLDRCQUFvQix1QkFLaEMsQ0FBQTtBQUVEO0lBQWtDLGdDQUFTO0lBQTNDO1FBQWtDLDhCQUFTO0lBQUUsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQUE5QyxDQUFrQyw0QkFBUyxHQUFHO0FBQWpDLG9CQUFZLGVBQXFCLENBQUE7QUFFOUM7SUFBc0Msb0NBQVM7SUFBL0M7UUFBc0MsOEJBQVM7SUFBb0IsQ0FBQztJQUFELHVCQUFDO0FBQUQsQ0FBQyxBQUFwRSxDQUFzQyw0QkFBUyxHQUFxQjtBQUF2RCx3QkFBZ0IsbUJBQXVDLENBQUEifQ==