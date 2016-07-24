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
var common_1 = require('@angular/common');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var router_deprecated_1 = require('@angular/router-deprecated');
var SpyRouter = (function (_super) {
    __extends(SpyRouter, _super);
    function SpyRouter() {
        _super.call(this, router_deprecated_1.Router);
    }
    return SpyRouter;
}(testing_internal_1.SpyObject));
exports.SpyRouter = SpyRouter;
var SpyRouterOutlet = (function (_super) {
    __extends(SpyRouterOutlet, _super);
    function SpyRouterOutlet() {
        _super.call(this, router_deprecated_1.RouterOutlet);
    }
    return SpyRouterOutlet;
}(testing_internal_1.SpyObject));
exports.SpyRouterOutlet = SpyRouterOutlet;
var SpyLocation = (function (_super) {
    __extends(SpyLocation, _super);
    function SpyLocation() {
        _super.call(this, common_1.Location);
    }
    return SpyLocation;
}(testing_internal_1.SpyObject));
exports.SpyLocation = SpyLocation;
var SpyPlatformLocation = (function (_super) {
    __extends(SpyPlatformLocation, _super);
    function SpyPlatformLocation() {
        _super.call(this, SpyPlatformLocation);
        this.pathname = null;
        this.search = null;
        this.hash = null;
    }
    return SpyPlatformLocation;
}(testing_internal_1.SpyObject));
exports.SpyPlatformLocation = SpyPlatformLocation;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci1kZXByZWNhdGVkL3Rlc3Qvc3BpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsdUJBQXVCLGlCQUFpQixDQUFDLENBQUE7QUFDekMsaUNBQStCLHdDQUF3QyxDQUFDLENBQUE7QUFDeEUsa0NBQW1DLDRCQUE0QixDQUFDLENBQUE7QUFFaEU7SUFBK0IsNkJBQVM7SUFDdEM7UUFBZ0Isa0JBQU0sMEJBQU0sQ0FBQyxDQUFDO0lBQUMsQ0FBQztJQUNsQyxnQkFBQztBQUFELENBQUMsQUFGRCxDQUErQiw0QkFBUyxHQUV2QztBQUZZLGlCQUFTLFlBRXJCLENBQUE7QUFFRDtJQUFxQyxtQ0FBUztJQUM1QztRQUFnQixrQkFBTSxnQ0FBWSxDQUFDLENBQUM7SUFBQyxDQUFDO0lBQ3hDLHNCQUFDO0FBQUQsQ0FBQyxBQUZELENBQXFDLDRCQUFTLEdBRTdDO0FBRlksdUJBQWUsa0JBRTNCLENBQUE7QUFFRDtJQUFpQywrQkFBUztJQUN4QztRQUFnQixrQkFBTSxpQkFBUSxDQUFDLENBQUM7SUFBQyxDQUFDO0lBQ3BDLGtCQUFDO0FBQUQsQ0FBQyxBQUZELENBQWlDLDRCQUFTLEdBRXpDO0FBRlksbUJBQVcsY0FFdkIsQ0FBQTtBQUVEO0lBQXlDLHVDQUFTO0lBSWhEO1FBQWdCLGtCQUFNLG1CQUFtQixDQUFDLENBQUM7UUFIM0MsYUFBUSxHQUFXLElBQUksQ0FBQztRQUN4QixXQUFNLEdBQVcsSUFBSSxDQUFDO1FBQ3RCLFNBQUksR0FBVyxJQUFJLENBQUM7SUFDd0IsQ0FBQztJQUMvQywwQkFBQztBQUFELENBQUMsQUFMRCxDQUF5Qyw0QkFBUyxHQUtqRDtBQUxZLDJCQUFtQixzQkFLL0IsQ0FBQSJ9