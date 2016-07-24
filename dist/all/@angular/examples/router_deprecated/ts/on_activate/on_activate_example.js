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
var ChildCmp = (function () {
    function ChildCmp() {
    }
    /** @nocollapse */
    ChildCmp.decorators = [
        { type: core_1.Component, args: [{ template: "Child" },] },
    ];
    return ChildCmp;
}());
var ParentCmp = (function () {
    function ParentCmp() {
        this.log = '';
    }
    ParentCmp.prototype.routerOnActivate = function (next, prev) {
        this.log = "Finished navigating from \"" + (prev ? prev.urlPath : 'null') + "\" to \"" + next.urlPath + "\"";
        return new Promise(function (resolve) {
            // The ChildCmp gets instantiated only when the Promise is resolved
            setTimeout(function () { return resolve(null); }, 1000);
        });
    };
    /** @nocollapse */
    ParentCmp.decorators = [
        { type: core_1.Component, args: [{
                    template: "\n    <h2>Parent</h2> (<router-outlet></router-outlet>)\n    <p>{{log}}</p>",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES]
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[{ path: '/child', name: 'Child', component: ChildCmp }],] },
    ];
    return ParentCmp;
}());
var AppCmp = (function () {
    function AppCmp() {
    }
    /** @nocollapse */
    AppCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'example-app',
                    template: "\n    <h1>My app</h1>\n\n    <nav>\n      <a [routerLink]=\"['Parent', 'Child']\">Child</a>\n    </nav>\n    <router-outlet></router-outlet>\n  ",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES]
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[{ path: '/parent/...', name: 'Parent', component: ParentCmp }],] },
    ];
    return AppCmp;
}());
exports.AppCmp = AppCmp;
function main() {
    return platform_browser_dynamic_1.bootstrap(AppCmp, [{ provide: common_1.APP_BASE_HREF, useValue: '/@angular/examples/router/ts/on_activate' }]);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25fYWN0aXZhdGVfZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZXhhbXBsZXMvcm91dGVyX2RlcHJlY2F0ZWQvdHMvb25fYWN0aXZhdGUvb25fYWN0aXZhdGVfZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUJBQTRCLGlCQUFpQixDQUFDLENBQUE7QUFDOUMscUJBQStDLGVBQWUsQ0FBQyxDQUFBO0FBQy9ELHlDQUF3QixtQ0FBbUMsQ0FBQyxDQUFBO0FBQzVELGtDQUErRSw0QkFBNEIsQ0FBQyxDQUFBO0FBQzVHO0lBQUE7SUFLQSxDQUFDO0lBSkQsa0JBQWtCO0lBQ1gsbUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUMsRUFBRyxFQUFFO0tBQ2pELENBQUM7SUFDRixlQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFDRDtJQUFBO1FBQ0UsUUFBRyxHQUFXLEVBQUUsQ0FBQztJQW9CbkIsQ0FBQztJQWxCQyxvQ0FBZ0IsR0FBaEIsVUFBaUIsSUFBMEIsRUFBRSxJQUEwQjtRQUNyRSxJQUFJLENBQUMsR0FBRyxHQUFHLGlDQUE2QixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLGlCQUFTLElBQUksQ0FBQyxPQUFPLE9BQUcsQ0FBQztRQUU3RixNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQ3hCLG1FQUFtRTtZQUNuRSxVQUFVLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBYixDQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsb0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLDZFQUVPO29CQUNqQixVQUFVLEVBQUUsQ0FBQyxxQ0FBaUIsQ0FBQztpQkFDaEMsRUFBRyxFQUFFO1FBQ04sRUFBRSxJQUFJLEVBQUUsK0JBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsQ0FBQyxFQUFHLEVBQUU7S0FDdEYsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQUNEO0lBQUE7SUFpQkEsQ0FBQztJQWhCRCxrQkFBa0I7SUFDWCxpQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLGtKQU9UO29CQUNELFVBQVUsRUFBRSxDQUFDLHFDQUFpQixDQUFDO2lCQUNoQyxFQUFHLEVBQUU7UUFDTixFQUFFLElBQUksRUFBRSwrQkFBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxDQUFDLEVBQUcsRUFBRTtLQUM3RixDQUFDO0lBQ0YsYUFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFqQlksY0FBTSxTQWlCbEIsQ0FBQTtBQUVEO0lBQ0UsTUFBTSxDQUFDLG9DQUFTLENBQ1osTUFBTSxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsc0JBQWEsRUFBRSxRQUFRLEVBQUUsMENBQTBDLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEcsQ0FBQztBQUhlLFlBQUksT0FHbkIsQ0FBQSJ9