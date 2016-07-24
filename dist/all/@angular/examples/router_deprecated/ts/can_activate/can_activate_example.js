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
function checkIfWeHavePermission(instruction) {
    return instruction.params['id'] == '1';
}
var ControlPanelCmp = (function () {
    function ControlPanelCmp() {
    }
    /** @nocollapse */
    ControlPanelCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'control-panel-cmp', template: "<div>Settings: ...</div>" },] },
        { type: router_deprecated_1.CanActivate, args: [checkIfWeHavePermission,] },
    ];
    return ControlPanelCmp;
}());
var HomeCmp = (function () {
    function HomeCmp() {
    }
    /** @nocollapse */
    HomeCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'home-cmp',
                    template: "\n    <h1>Welcome Home!</h1>\n    <div>\n      Edit <a [routerLink]=\"['/ControlPanelCmp', {id: 1}]\" id=\"user-1-link\">User 1</a> |\n      Edit <a [routerLink]=\"['/ControlPanelCmp', {id: 2}]\" id=\"user-2-link\">User 2</a>\n    </div>\n  ",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES]
                },] },
    ];
    return HomeCmp;
}());
var AppCmp = (function () {
    function AppCmp() {
    }
    /** @nocollapse */
    AppCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'example-app',
                    template: "\n    <h1>My App</h1>\n    <router-outlet></router-outlet>\n  ",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES]
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[
                    { path: '/user-settings/:id', component: ControlPanelCmp, name: 'ControlPanelCmp' },
                    { path: '/', component: HomeCmp, name: 'HomeCmp' }
                ],] },
    ];
    return AppCmp;
}());
exports.AppCmp = AppCmp;
function main() {
    return platform_browser_dynamic_1.bootstrap(AppCmp, [{ provide: common_1.APP_BASE_HREF, useValue: '/@angular/examples/router/ts/can_activate' }]);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuX2FjdGl2YXRlX2V4YW1wbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2V4YW1wbGVzL3JvdXRlcl9kZXByZWNhdGVkL3RzL2Nhbl9hY3RpdmF0ZS9jYW5fYWN0aXZhdGVfZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUJBQTRCLGlCQUFpQixDQUFDLENBQUE7QUFDOUMscUJBQXNDLGVBQWUsQ0FBQyxDQUFBO0FBQ3RELHlDQUF3QixtQ0FBbUMsQ0FBQyxDQUFBO0FBQzVELGtDQUFnRiw0QkFBNEIsQ0FBQyxDQUFBO0FBRTdHLGlDQUFpQyxXQUFpQztJQUNoRSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUM7QUFDekMsQ0FBQztBQUNEO0lBQUE7SUFNQSxDQUFDO0lBTEQsa0JBQWtCO0lBQ1gsMEJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsMEJBQTBCLEVBQUMsRUFBRyxFQUFFO1FBQ3BHLEVBQUUsSUFBSSxFQUFFLCtCQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsdUJBQXVCLEVBQUcsRUFBRTtLQUN2RCxDQUFDO0lBQ0Ysc0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQUNEO0lBQUE7SUFlQSxDQUFDO0lBZEQsa0JBQWtCO0lBQ1gsa0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFFBQVEsRUFBRSxtUEFNVDtvQkFDRCxVQUFVLEVBQUUsQ0FBQyxxQ0FBaUIsQ0FBQztpQkFDaEMsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGNBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQUNEO0lBQUE7SUFnQkEsQ0FBQztJQWZELGtCQUFrQjtJQUNYLGlCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsZ0VBR1Q7b0JBQ0QsVUFBVSxFQUFFLENBQUMscUNBQWlCLENBQUM7aUJBQ2hDLEVBQUcsRUFBRTtRQUNOLEVBQUUsSUFBSSxFQUFFLCtCQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQzFCLEVBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixFQUFDO29CQUNqRixFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDO2lCQUNqRCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0YsYUFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFoQlksY0FBTSxTQWdCbEIsQ0FBQTtBQUdEO0lBQ0UsTUFBTSxDQUFDLG9DQUFTLENBQ1osTUFBTSxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsc0JBQWEsRUFBRSxRQUFRLEVBQUUsMkNBQTJDLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakcsQ0FBQztBQUhlLFlBQUksT0FHbkIsQ0FBQSJ9