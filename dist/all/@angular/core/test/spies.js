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
var core_1 = require('@angular/core');
var change_detection_1 = require('@angular/core/src/change_detection/change_detection');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var SpyChangeDetectorRef = (function (_super) {
    __extends(SpyChangeDetectorRef, _super);
    function SpyChangeDetectorRef() {
        _super.call(this, change_detection_1.ChangeDetectorRef);
        this.spy('detectChanges');
        this.spy('checkNoChanges');
    }
    return SpyChangeDetectorRef;
}(testing_internal_1.SpyObject));
exports.SpyChangeDetectorRef = SpyChangeDetectorRef;
var SpyIterableDifferFactory = (function (_super) {
    __extends(SpyIterableDifferFactory, _super);
    function SpyIterableDifferFactory() {
        _super.apply(this, arguments);
    }
    return SpyIterableDifferFactory;
}(testing_internal_1.SpyObject));
exports.SpyIterableDifferFactory = SpyIterableDifferFactory;
var SpyElementRef = (function (_super) {
    __extends(SpyElementRef, _super);
    function SpyElementRef() {
        _super.call(this, core_1.ElementRef);
    }
    return SpyElementRef;
}(testing_internal_1.SpyObject));
exports.SpyElementRef = SpyElementRef;
var SpyDomAdapter = (function (_super) {
    __extends(SpyDomAdapter, _super);
    function SpyDomAdapter() {
        _super.call(this, dom_adapter_1.DomAdapter);
    }
    return SpyDomAdapter;
}(testing_internal_1.SpyObject));
exports.SpyDomAdapter = SpyDomAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvdGVzdC9zcGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsaUNBQWdDLHFEQUFxRCxDQUFDLENBQUE7QUFDdEYsaUNBQXdCLHdDQUF3QyxDQUFDLENBQUE7QUFDakUsNEJBQXlCLCtDQUErQyxDQUFDLENBQUE7QUFFekU7SUFBMEMsd0NBQVM7SUFDakQ7UUFDRSxrQkFBTSxvQ0FBaUIsQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFDSCwyQkFBQztBQUFELENBQUMsQUFORCxDQUEwQyw0QkFBUyxHQU1sRDtBQU5ZLDRCQUFvQix1QkFNaEMsQ0FBQTtBQUVEO0lBQThDLDRDQUFTO0lBQXZEO1FBQThDLDhCQUFTO0lBQUUsQ0FBQztJQUFELCtCQUFDO0FBQUQsQ0FBQyxBQUExRCxDQUE4Qyw0QkFBUyxHQUFHO0FBQTdDLGdDQUF3QiwyQkFBcUIsQ0FBQTtBQUUxRDtJQUFtQyxpQ0FBUztJQUMxQztRQUFnQixrQkFBTSxpQkFBVSxDQUFDLENBQUM7SUFBQyxDQUFDO0lBQ3RDLG9CQUFDO0FBQUQsQ0FBQyxBQUZELENBQW1DLDRCQUFTLEdBRTNDO0FBRlkscUJBQWEsZ0JBRXpCLENBQUE7QUFFRDtJQUFtQyxpQ0FBUztJQUMxQztRQUFnQixrQkFBTSx3QkFBVSxDQUFDLENBQUM7SUFBQyxDQUFDO0lBQ3RDLG9CQUFDO0FBQUQsQ0FBQyxBQUZELENBQW1DLDRCQUFTLEdBRTNDO0FBRlkscUJBQWEsZ0JBRXpCLENBQUEifQ==