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
var LogService = (function () {
    function LogService() {
        this.logs = [];
    }
    LogService.prototype.addLog = function (message) { this.logs.push(message); };
    /** @nocollapse */
    LogService.decorators = [
        { type: core_1.Injectable },
    ];
    return LogService;
}());
exports.LogService = LogService;
var MyCmp = (function () {
    function MyCmp(logService) {
        this.logService = logService;
    }
    MyCmp.prototype.routerOnDeactivate = function (next, prev) {
        this.logService.addLog("Navigating from \"" + (prev ? prev.urlPath : 'null') + "\" to \"" + next.urlPath + "\"");
    };
    /** @nocollapse */
    MyCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'my-cmp', template: "<div>hello</div>" },] },
    ];
    /** @nocollapse */
    MyCmp.ctorParameters = [
        { type: LogService, },
    ];
    return MyCmp;
}());
var AppCmp = (function () {
    function AppCmp(logService) {
        this.logService = logService;
    }
    /** @nocollapse */
    AppCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'example-app',
                    template: "\n    <h1>My App</h1>\n    <nav>\n      <a [routerLink]=\"['/HomeCmp']\" id=\"home-link\">Navigate Home</a> |\n      <a [routerLink]=\"['/ParamCmp', {param: 1}]\" id=\"param-link\">Navigate with a Param</a>\n    </nav>\n    <router-outlet></router-outlet>\n    <div id=\"log\">\n      <h2>Log:</h2>\n      <p *ngFor=\"let logItem of logService.logs\">{{ logItem }}</p>\n    </div>\n  ",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES]
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[
                    { path: '/', component: MyCmp, name: 'HomeCmp' },
                    { path: '/:param', component: MyCmp, name: 'ParamCmp' }
                ],] },
    ];
    /** @nocollapse */
    AppCmp.ctorParameters = [
        { type: LogService, },
    ];
    return AppCmp;
}());
exports.AppCmp = AppCmp;
function main() {
    return platform_browser_dynamic_1.bootstrap(AppCmp, [
        { provide: common_1.APP_BASE_HREF, useValue: '/@angular/examples/router/ts/on_deactivate' }, LogService
    ]);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib25fZGVhY3RpdmF0ZV9leGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9leGFtcGxlcy9yb3V0ZXJfZGVwcmVjYXRlZC90cy9vbl9kZWFjdGl2YXRlL29uX2RlYWN0aXZhdGVfZXhhbXBsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUJBQTRCLGlCQUFpQixDQUFDLENBQUE7QUFDOUMscUJBQWtELGVBQWUsQ0FBQyxDQUFBO0FBQ2xFLHlDQUF3QixtQ0FBbUMsQ0FBQyxDQUFBO0FBQzVELGtDQUFpRiw0QkFBNEIsQ0FBQyxDQUFBO0FBQzlHO0lBQUE7UUFDRSxTQUFJLEdBQWEsRUFBRSxDQUFDO0lBT3RCLENBQUM7SUFMQywyQkFBTSxHQUFOLFVBQU8sT0FBZSxJQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxrQkFBa0I7SUFDWCxxQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixpQkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBUlksa0JBQVUsYUFRdEIsQ0FBQTtBQUNEO0lBQ0UsZUFBb0IsVUFBc0I7UUFBdEIsZUFBVSxHQUFWLFVBQVUsQ0FBWTtJQUFHLENBQUM7SUFFOUMsa0NBQWtCLEdBQWxCLFVBQW1CLElBQTBCLEVBQUUsSUFBMEI7UUFDdkUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQ2xCLHdCQUFvQixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLGlCQUFTLElBQUksQ0FBQyxPQUFPLE9BQUcsQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFDSCxrQkFBa0I7SUFDWCxnQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsa0JBQWtCLEVBQUMsRUFBRyxFQUFFO0tBQ2hGLENBQUM7SUFDRixrQkFBa0I7SUFDWCxvQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7S0FDbkIsQ0FBQztJQUNGLFlBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQUNEO0lBQ0UsZ0JBQW1CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7SUFBRyxDQUFDO0lBQy9DLGtCQUFrQjtJQUNYLGlCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsa1lBV1Q7b0JBQ0QsVUFBVSxFQUFFLENBQUMscUNBQWlCLENBQUM7aUJBQ2hDLEVBQUcsRUFBRTtRQUNOLEVBQUUsSUFBSSxFQUFFLCtCQUFXLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQzFCLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUM7b0JBQzlDLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUM7aUJBQ3RELEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxxQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxVQUFVLEdBQUc7S0FDbkIsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQUFDLEFBN0JELElBNkJDO0FBN0JZLGNBQU0sU0E2QmxCLENBQUE7QUFHRDtJQUNFLE1BQU0sQ0FBQyxvQ0FBUyxDQUFDLE1BQU0sRUFBRTtRQUN2QixFQUFDLE9BQU8sRUFBRSxzQkFBYSxFQUFFLFFBQVEsRUFBRSw0Q0FBNEMsRUFBQyxFQUFFLFVBQVU7S0FDN0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUplLFlBQUksT0FJbkIsQ0FBQSJ9