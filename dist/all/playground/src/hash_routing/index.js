/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var router_deprecated_1 = require('@angular/router-deprecated');
var common_1 = require('@angular/common');
var HelloCmp = (function () {
    function HelloCmp() {
    }
    /** @nocollapse */
    HelloCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'hello-cmp', template: "hello" },] },
    ];
    return HelloCmp;
}());
var GoodByeCmp = (function () {
    function GoodByeCmp() {
    }
    /** @nocollapse */
    GoodByeCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'goodbye-cmp', template: "goodbye" },] },
    ];
    return GoodByeCmp;
}());
var AppCmp = (function () {
    function AppCmp() {
    }
    /** @nocollapse */
    AppCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'example-app',
                    template: "\n    <h1>My App</h1>\n    <nav>\n      <a href=\"#/\" id=\"hello-link\">Navigate via href</a> |\n      <a [routerLink]=\"['/GoodbyeCmp']\" id=\"goodbye-link\">Navigate with Link DSL</a>\n      <a [routerLink]=\"['/GoodbyeCmp']\" id=\"goodbye-link-blank\" target=\"_blank\">\n        Navigate with Link DSL _blank target\n      </a>\n    </nav>\n    <router-outlet></router-outlet>\n  ",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES]
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[
                    new router_deprecated_1.Route({ path: '/', component: HelloCmp, name: 'HelloCmp' }),
                    new router_deprecated_1.Route({ path: '/bye', component: GoodByeCmp, name: 'GoodbyeCmp' })
                ],] },
    ];
    return AppCmp;
}());
function main() {
    platform_browser_dynamic_1.bootstrap(AppCmp, [router_deprecated_1.ROUTER_PROVIDERS, { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }]);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL2hhc2hfcm91dGluZy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHlDQUF3QixtQ0FBbUMsQ0FBQyxDQUFBO0FBQzVELGtDQUFzRSw0QkFBNEIsQ0FBQyxDQUFBO0FBQ25HLHVCQUFxRCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3ZFO0lBQUE7SUFLQSxDQUFDO0lBSkQsa0JBQWtCO0lBQ1gsbUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxFQUFHLEVBQUU7S0FDeEUsQ0FBQztJQUNGLGVBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUNEO0lBQUE7SUFLQSxDQUFDO0lBSkQsa0JBQWtCO0lBQ1gscUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxFQUFHLEVBQUU7S0FDNUUsQ0FBQztJQUNGLGlCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFDRDtJQUFBO0lBdUJBLENBQUM7SUF0QkQsa0JBQWtCO0lBQ1gsaUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSxtWUFVVDtvQkFDRCxVQUFVLEVBQUUsQ0FBQyxxQ0FBaUIsQ0FBQztpQkFDaEMsRUFBRyxFQUFFO1FBQ04sRUFBRSxJQUFJLEVBQUUsK0JBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDMUIsSUFBSSx5QkFBSyxDQUFDLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQztvQkFDN0QsSUFBSSx5QkFBSyxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUMsQ0FBQztpQkFDckUsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDO0FBR0Q7SUFDRSxvQ0FBUyxDQUFDLE1BQU0sRUFDTixDQUFDLG9DQUFnQixFQUFFLEVBQUMsT0FBTyxFQUFFLHlCQUFnQixFQUFFLFFBQVEsRUFBRSw2QkFBb0IsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUM3RixDQUFDO0FBSGUsWUFBSSxPQUduQixDQUFBIn0=