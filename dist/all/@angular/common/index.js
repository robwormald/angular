/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var core_1 = require('@angular/core');
var common_directives_1 = require('./src/common_directives');
var pipes_1 = require('./src/pipes');
__export(require('./src/pipes'));
__export(require('./src/directives'));
__export(require('./src/forms-deprecated'));
__export(require('./src/common_directives'));
__export(require('./src/location'));
var localization_1 = require('./src/localization');
exports.NgLocalization = localization_1.NgLocalization;
var CommonModule = (function () {
    function CommonModule() {
    }
    /** @nocollapse */
    CommonModule.decorators = [
        { type: core_1.NgModule, args: [{ declarations: [common_directives_1.COMMON_DIRECTIVES, pipes_1.COMMON_PIPES], exports: [common_directives_1.COMMON_DIRECTIVES, pipes_1.COMMON_PIPES] },] },
    ];
    return CommonModule;
}());
exports.CommonModule = CommonModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbW1vbi9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7O0FBRUgscUJBQXVCLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZDLGtDQUFnQyx5QkFBeUIsQ0FBQyxDQUFBO0FBQzFELHNCQUEyQixhQUFhLENBQUMsQ0FBQTtBQUV6QyxpQkFBYyxhQUFhLENBQUMsRUFBQTtBQUM1QixpQkFBYyxrQkFBa0IsQ0FBQyxFQUFBO0FBQ2pDLGlCQUFjLHdCQUF3QixDQUFDLEVBQUE7QUFDdkMsaUJBQWMseUJBQXlCLENBQUMsRUFBQTtBQUN4QyxpQkFBYyxnQkFBZ0IsQ0FBQyxFQUFBO0FBQy9CLDZCQUE2QixvQkFBb0IsQ0FBQztBQUExQyx1REFBMEM7QUFDbEQ7SUFBQTtJQUtBLENBQUM7SUFKRCxrQkFBa0I7SUFDWCx1QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxlQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxZQUFZLEVBQUUsQ0FBQyxxQ0FBaUIsRUFBRSxvQkFBWSxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMscUNBQWlCLEVBQUUsb0JBQVksQ0FBQyxFQUFDLEVBQUcsRUFBRTtLQUMxSCxDQUFDO0lBQ0YsbUJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLG9CQUFZLGVBS3hCLENBQUEifQ==