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
var NoteCmp = (function () {
    function NoteCmp(params) {
        this.id = params.get('id');
    }
    NoteCmp.prototype.routerCanDeactivate = function (next, prev) {
        return confirm('Are you sure you want to leave?');
    };
    /** @nocollapse */
    NoteCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'note-cmp',
                    template: "\n    <div>\n      <h2>id: {{id}}</h2>\n      <textarea cols=\"40\" rows=\"10\"></textarea>\n    </div>"
                },] },
    ];
    /** @nocollapse */
    NoteCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return NoteCmp;
}());
var NoteIndexCmp = (function () {
    function NoteIndexCmp() {
    }
    /** @nocollapse */
    NoteIndexCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'note-index-cmp',
                    template: "\n    <h1>Your Notes</h1>\n    <div>\n      Edit <a [routerLink]=\"['/NoteCmp', {id: 1}]\" id=\"note-1-link\">Note 1</a> |\n      Edit <a [routerLink]=\"['/NoteCmp', {id: 2}]\" id=\"note-2-link\">Note 2</a>\n    </div>\n  ",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES]
                },] },
    ];
    return NoteIndexCmp;
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
                    { path: '/note/:id', component: NoteCmp, name: 'NoteCmp' },
                    { path: '/', component: NoteIndexCmp, name: 'NoteIndexCmp' }
                ],] },
    ];
    return AppCmp;
}());
exports.AppCmp = AppCmp;
function main() {
    return platform_browser_dynamic_1.bootstrap(AppCmp, [{ provide: common_1.APP_BASE_HREF, useValue: '/@angular/examples/router/ts/can_deactivate' }]);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FuX2RlYWN0aXZhdGVfZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZXhhbXBsZXMvcm91dGVyX2RlcHJlY2F0ZWQvdHMvY2FuX2RlYWN0aXZhdGUvY2FuX2RlYWN0aXZhdGVfZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUJBQTRCLGlCQUFpQixDQUFDLENBQUE7QUFDOUMscUJBQStDLGVBQWUsQ0FBQyxDQUFBO0FBQy9ELHlDQUF3QixtQ0FBbUMsQ0FBQyxDQUFBO0FBQzVELGtDQUErRiw0QkFBNEIsQ0FBQyxDQUFBO0FBQzVIO0lBR0UsaUJBQVksTUFBbUI7UUFBSSxJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFBQyxDQUFDO0lBRWhFLHFDQUFtQixHQUFuQixVQUFvQixJQUEwQixFQUFFLElBQTBCO1FBQ3hFLE1BQU0sQ0FBQyxPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsa0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFFBQVEsRUFBRSx5R0FJRDtpQkFDVixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsc0JBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsK0JBQVcsR0FBRztLQUNwQixDQUFDO0lBQ0YsY0FBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUFDRDtJQUFBO0lBZUEsQ0FBQztJQWRELGtCQUFrQjtJQUNYLHVCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLFFBQVEsRUFBRSxnT0FNVDtvQkFDRCxVQUFVLEVBQUUsQ0FBQyxxQ0FBaUIsQ0FBQztpQkFDaEMsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLG1CQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFDRDtJQUFBO0lBZ0JBLENBQUM7SUFmRCxrQkFBa0I7SUFDWCxpQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLGdFQUdUO29CQUNELFVBQVUsRUFBRSxDQUFDLHFDQUFpQixDQUFDO2lCQUNoQyxFQUFHLEVBQUU7UUFDTixFQUFFLElBQUksRUFBRSwrQkFBVyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUMxQixFQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDO29CQUN4RCxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFDO2lCQUMzRCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0YsYUFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFoQlksY0FBTSxTQWdCbEIsQ0FBQTtBQUdEO0lBQ0UsTUFBTSxDQUFDLG9DQUFTLENBQ1osTUFBTSxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsc0JBQWEsRUFBRSxRQUFRLEVBQUUsNkNBQTZDLEVBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkcsQ0FBQztBQUhlLFlBQUksT0FHbkIsQ0FBQSJ9