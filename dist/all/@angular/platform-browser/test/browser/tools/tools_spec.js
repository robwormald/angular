/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var platform_browser_1 = require('@angular/platform-browser');
var spies_1 = require('./spies');
function main() {
    testing_internal_1.describe('profiler', function () {
        testing_internal_1.beforeEach(function () { platform_browser_1.enableDebugTools((new spies_1.SpyComponentRef())); });
        testing_internal_1.afterEach(function () { platform_browser_1.disableDebugTools(); });
        testing_internal_1.it('should time change detection', function () { spies_1.callNgProfilerTimeChangeDetection(); });
        testing_internal_1.it('should time change detection with recording', function () { spies_1.callNgProfilerTimeChangeDetection({ 'record': true }); });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHNfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci90ZXN0L2Jyb3dzZXIvdG9vbHMvdG9vbHNfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQXVGLHdDQUF3QyxDQUFDLENBQUE7QUFDaEksaUNBQWtELDJCQUEyQixDQUFDLENBQUE7QUFFOUUsc0JBQWlFLFNBQVMsQ0FBQyxDQUFBO0FBRTNFO0lBQ0UsMkJBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDbkIsNkJBQVUsQ0FBQyxjQUFRLG1DQUFnQixDQUFDLENBQU0sSUFBSSx1QkFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEUsNEJBQVMsQ0FBQyxjQUFRLG9DQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUxQyxxQkFBRSxDQUFDLDhCQUE4QixFQUFFLGNBQVEseUNBQWlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5GLHFCQUFFLENBQUMsNkNBQTZDLEVBQzdDLGNBQVEseUNBQWlDLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVhlLFlBQUksT0FXbkIsQ0FBQSJ9