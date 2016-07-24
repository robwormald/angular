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
var router_1 = require('@angular/router');
function main() {
    platform_browser_dynamic_1.bootstrap(inbox_app_1.InboxApp, {
        providers: [
            router_1.provideRoutes(inbox_app_1.ROUTER_CONFIG),
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
        ],
        declarations: [inbox_app_1.InboxCmp, inbox_app_1.DraftsCmp],
        imports: [router_1.RouterModule]
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL3JvdXRpbmcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILDBCQUEyRCxpQkFBaUIsQ0FBQyxDQUFBO0FBQzdFLHlDQUF3QixtQ0FBbUMsQ0FBQyxDQUFBO0FBQzVELHVCQUFxRCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3ZFLHVCQUEwQyxpQkFBaUIsQ0FBQyxDQUFBO0FBRTVEO0lBQ0Usb0NBQVMsQ0FBQyxvQkFBUSxFQUFFO1FBQ2xCLFNBQVMsRUFBRTtZQUNULHNCQUFhLENBQUMseUJBQWEsQ0FBQztZQUM1QixFQUFDLE9BQU8sRUFBRSx5QkFBZ0IsRUFBRSxRQUFRLEVBQUUsNkJBQW9CLEVBQUM7U0FDNUQ7UUFDRCxZQUFZLEVBQUUsQ0FBQyxvQkFBUSxFQUFFLHFCQUFTLENBQUM7UUFDbkMsT0FBTyxFQUFFLENBQUMscUJBQVksQ0FBQztLQUN4QixDQUFDLENBQUM7QUFDTCxDQUFDO0FBVGUsWUFBSSxPQVNuQixDQUFBIn0=