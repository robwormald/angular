/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var inbox_app_1 = require('./app/inbox-app');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var common_1 = require('@angular/common');
var router_deprecated_1 = require('@angular/router-deprecated');
function main() {
    platform_browser_dynamic_1.bootstrap(inbox_app_1.InboxApp, [router_deprecated_1.ROUTER_PROVIDERS, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }]);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL3JvdXRpbmdfZGVwcmVjYXRlZC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsMEJBQXVCLGlCQUFpQixDQUFDLENBQUE7QUFDekMseUNBQXdCLG1DQUFtQyxDQUFDLENBQUE7QUFDNUQsdUJBQXFELGlCQUFpQixDQUFDLENBQUE7QUFDdkUsa0NBQStCLDRCQUE0QixDQUFDLENBQUE7QUFFNUQ7SUFDRSxvQ0FBUyxDQUFDLG9CQUFRLEVBQ1IsQ0FBQyxvQ0FBZ0IsRUFBRSxFQUFDLE9BQU8sRUFBRSx5QkFBZ0IsRUFBRSxRQUFRLEVBQUUsNkJBQW9CLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0YsQ0FBQztBQUhlLFlBQUksT0FHbkIsQ0FBQSJ9