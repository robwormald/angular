/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var MyApp = (function () {
    function MyApp() {
    }
    return MyApp;
}());
var myValidator = null;
// #docregion ng_validators
platform_browser_dynamic_1.bootstrap(MyApp, [{ provide: common_1.NG_VALIDATORS, useValue: myValidator, multi: true }]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfdmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZXhhbXBsZXMvY29yZS9mb3Jtcy90cy9uZ192YWxpZGF0b3JzL25nX3ZhbGlkYXRvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHVCQUE0QixpQkFBaUIsQ0FBQyxDQUFBO0FBQzlDLHlDQUF3QixtQ0FBbUMsQ0FBQyxDQUFBO0FBRTVEO0lBQUE7SUFBYSxDQUFDO0lBQUQsWUFBQztBQUFELENBQUMsQUFBZCxJQUFjO0FBQ2QsSUFBSSxXQUFXLEdBQVEsSUFBSSxDQUFDO0FBRTVCLDJCQUEyQjtBQUMzQixvQ0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLHNCQUFhLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDIn0=