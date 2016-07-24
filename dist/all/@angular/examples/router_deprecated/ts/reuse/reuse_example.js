/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var router_deprecated_1 = require('@angular/router-deprecated');
var MyCmp = (function () {
    function MyCmp(params) {
        this.name = params.get('name') || 'NOBODY';
    }
    MyCmp.prototype.routerCanReuse = function (next, prev) { return true; };
    MyCmp.prototype.routerOnReuse = function (next, prev) {
        this.name = next.params['name'];
    };
    /** @nocollapse */
    MyCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'my-cmp',
                    template: "\n    <div>hello {{name}}!</div>\n    <div>message: <input id=\"message\"></div>\n  "
                },] },
    ];
    /** @nocollapse */
    MyCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return MyCmp;
}());
var AppCmp = (function () {
    function AppCmp() {
    }
    /** @nocollapse */
    AppCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'example-app',
                    template: "\n    <h1>Say hi to...</h1>\n    <a [routerLink]=\"['/HomeCmp', {name: 'naomi'}]\" id=\"naomi-link\">Naomi</a> |\n    <a [routerLink]=\"['/HomeCmp', {name: 'brad'}]\" id=\"brad-link\">Brad</a>\n    <router-outlet></router-outlet>\n  ",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES]
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[
                    { path: '/', component: MyCmp, name: 'HomeCmp' },
                    { path: '/:name', component: MyCmp, name: 'HomeCmp' }
                ],] },
    ];
    return AppCmp;
}());
exports.AppCmp = AppCmp;
function main() {
    return platform_browser_dynamic_1.bootstrap(AppCmp, [{ provide: common_1.APP_BASE_HREF, useValue: '/@angular/examples/router/ts/reuse' }]);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV1c2VfZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZXhhbXBsZXMvcm91dGVyX2RlcHJlY2F0ZWQvdHMvcmV1c2UvcmV1c2VfZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUJBQTRCLGlCQUFpQixDQUFDLENBQUE7QUFDOUMscUJBQXNDLGVBQWUsQ0FBQyxDQUFBO0FBQ3RELHlDQUF3QixtQ0FBbUMsQ0FBQyxDQUFBO0FBQzVELGtDQUFtRyw0QkFBNEIsQ0FBQyxDQUFBO0FBQ2hJO0lBR0UsZUFBWSxNQUFtQjtRQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUM7SUFBQyxDQUFDO0lBRWhGLDhCQUFjLEdBQWQsVUFBZSxJQUEwQixFQUFFLElBQTBCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFdkYsNkJBQWEsR0FBYixVQUFjLElBQTBCLEVBQUUsSUFBMEI7UUFDbEUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDSCxrQkFBa0I7SUFDWCxnQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsUUFBUTtvQkFDbEIsUUFBUSxFQUFFLHNGQUdUO2lCQUNGLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxvQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSwrQkFBVyxHQUFHO0tBQ3BCLENBQUM7SUFDRixZQUFDO0FBQUQsQ0FBQyxBQXhCRCxJQXdCQztBQUNEO0lBQUE7SUFrQkEsQ0FBQztJQWpCRCxrQkFBa0I7SUFDWCxpQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLDJPQUtUO29CQUNELFVBQVUsRUFBRSxDQUFDLHFDQUFpQixDQUFDO2lCQUNoQyxFQUFHLEVBQUU7UUFDTixFQUFFLElBQUksRUFBRSwrQkFBVyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUMxQixFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDO29CQUM5QyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDO2lCQUNwRCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0YsYUFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFsQlksY0FBTSxTQWtCbEIsQ0FBQTtBQUdEO0lBQ0UsTUFBTSxDQUFDLG9DQUFTLENBQ1osTUFBTSxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsc0JBQWEsRUFBRSxRQUFRLEVBQUUsb0NBQW9DLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDMUYsQ0FBQztBQUhlLFlBQUksT0FHbkIsQ0FBQSJ9