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
var application_ref_1 = require('@angular/core/src/application_ref');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var lang_1 = require('../../../src/facade/lang');
var SpyApplicationRef = (function (_super) {
    __extends(SpyApplicationRef, _super);
    function SpyApplicationRef() {
        _super.call(this, application_ref_1.ApplicationRef_);
    }
    return SpyApplicationRef;
}(testing_internal_1.SpyObject));
exports.SpyApplicationRef = SpyApplicationRef;
var SpyComponentRef = (function (_super) {
    __extends(SpyComponentRef, _super);
    function SpyComponentRef() {
        _super.call(this);
        this.injector = core_1.ReflectiveInjector.resolveAndCreate([{ provide: application_ref_1.ApplicationRef, useClass: SpyApplicationRef }]);
    }
    return SpyComponentRef;
}(testing_internal_1.SpyObject));
exports.SpyComponentRef = SpyComponentRef;
function callNgProfilerTimeChangeDetection(config /** TODO #9100 */) {
    lang_1.global.ng.profiler.timeChangeDetection(config);
}
exports.callNgProfilerTimeChangeDetection = callNgProfilerTimeChangeDetection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdC9icm93c2VyL3Rvb2xzL3NwaWVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILHFCQUEwQyxlQUFlLENBQUMsQ0FBQTtBQUMxRCxnQ0FBOEMsbUNBQW1DLENBQUMsQ0FBQTtBQUNsRixpQ0FBd0Isd0NBQXdDLENBQUMsQ0FBQTtBQUVqRSxxQkFBcUIsMEJBQTBCLENBQUMsQ0FBQTtBQUVoRDtJQUF1QyxxQ0FBUztJQUM5QztRQUFnQixrQkFBTSxpQ0FBZSxDQUFDLENBQUM7SUFBQyxDQUFDO0lBQzNDLHdCQUFDO0FBQUQsQ0FBQyxBQUZELENBQXVDLDRCQUFTLEdBRS9DO0FBRlkseUJBQWlCLG9CQUU3QixDQUFBO0FBRUQ7SUFBcUMsbUNBQVM7SUFFNUM7UUFDRSxpQkFBTyxDQUFDO1FBQ1IsSUFBSSxDQUFDLFFBQVEsR0FBRyx5QkFBa0IsQ0FBQyxnQkFBZ0IsQ0FDL0MsQ0FBQyxFQUFDLE9BQU8sRUFBRSxnQ0FBYyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBUEQsQ0FBcUMsNEJBQVMsR0FPN0M7QUFQWSx1QkFBZSxrQkFPM0IsQ0FBQTtBQUVELDJDQUFrRCxNQUFZLENBQUMsaUJBQWlCO0lBQ3hFLGFBQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hELENBQUM7QUFGZSx5Q0FBaUMsb0NBRWhELENBQUEifQ==