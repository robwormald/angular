/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var upgrade_1 = require('@angular/upgrade');
var styles = [
    "\n    .border {\n      border: solid 2px DodgerBlue;\n    }\n    .title {\n      background-color: LightSkyBlue;\n      padding: .2em 1em;\n      font-size: 1.2em;\n    }\n    .content {\n      padding: 1em;\n    }\n  "
];
var adapter = new upgrade_1.UpgradeAdapter();
var ng1module = angular.module('myExample', []);
ng1module.controller('Index', function ($scope /** TODO #9100 */) { $scope.name = 'World'; });
ng1module.directive('user', function () {
    return {
        scope: { handle: '@', reset: '&' },
        template: "\n      User: {{handle}}\n      <hr>\n      <button ng-click=\"reset()\">clear</button>"
    };
});
var Pane = (function () {
    function Pane() {
    }
    /** @nocollapse */
    Pane.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'pane',
                    template: "<div class=\"border\">\n    <div class=\"title\">{{title}}</div>\n    <div class=\"content\"><ng-content></ng-content></div>\n    </div>",
                    styles: styles
                },] },
    ];
    /** @nocollapse */
    Pane.propDecorators = {
        'title': [{ type: core_1.Input },],
    };
    return Pane;
}());
var UpgradeApp = (function () {
    function UpgradeApp() {
        this.reset = new core_1.EventEmitter();
    }
    /** @nocollapse */
    UpgradeApp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'upgrade-app',
                    template: "<div class=\"border\">\n      <pane title=\"Title: {{user}}\">\n        <table cellpadding=\"3\">\n          <tr>\n            <td><ng-content></ng-content></td>\n            <td><user [handle]=\"user\" (reset)=\"reset.emit()\"></user></td>\n          </tr>\n        </table>\n      </pane>\n    </div>",
                    styles: styles,
                    directives: [Pane, adapter.upgradeNg1Component('user')]
                },] },
    ];
    /** @nocollapse */
    UpgradeApp.ctorParameters = [];
    /** @nocollapse */
    UpgradeApp.propDecorators = {
        'user': [{ type: core_1.Input },],
        'reset': [{ type: core_1.Output },],
    };
    return UpgradeApp;
}());
ng1module.directive('upgradeApp', adapter.downgradeNg2Component(UpgradeApp));
function main() {
    adapter.bootstrap(document.body, ['myExample']);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL3VwZ3JhZGUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUFxRCxlQUFlLENBQUMsQ0FBQTtBQUNyRSx3QkFBNkIsa0JBQWtCLENBQUMsQ0FBQTtBQUtoRCxJQUFJLE1BQU0sR0FBRztJQUNYLDROQVlDO0NBQ0YsQ0FBQztBQUVGLElBQUksT0FBTyxHQUFtQixJQUFJLHdCQUFjLEVBQUUsQ0FBQztBQUVuRCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUVoRCxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxVQUFTLE1BQVcsQ0FBQyxpQkFBaUIsSUFBSSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBRWxHLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO0lBQzFCLE1BQU0sQ0FBQztRQUNMLEtBQUssRUFBRSxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBQztRQUNoQyxRQUFRLEVBQUUseUZBR2tDO0tBQzdDLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQztBQUNIO0lBQUE7SUFnQkEsQ0FBQztJQWZELGtCQUFrQjtJQUNYLGVBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLE1BQU07b0JBQ2hCLFFBQVEsRUFBRSwwSUFHRDtvQkFDVCxNQUFNLEVBQUUsTUFBTTtpQkFDZixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsbUJBQWMsR0FBMkM7UUFDaEUsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7S0FDMUIsQ0FBQztJQUNGLFdBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBQ0Q7SUFDRTtRQUQrQixVQUFLLEdBQUcsSUFBSSxtQkFBWSxFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUNsQixrQkFBa0I7SUFDWCxxQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsUUFBUSxFQUFFLGdUQVNEO29CQUNULE1BQU0sRUFBRSxNQUFNO29CQUNkLFVBQVUsRUFBRSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3hELEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCx5QkFBYyxHQUEyRCxFQUMvRSxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gseUJBQWMsR0FBMkM7UUFDaEUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7UUFDMUIsT0FBTyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBTSxFQUFFLEVBQUU7S0FDM0IsQ0FBQztJQUNGLGlCQUFDO0FBQUQsQ0FBQyxBQTVCRCxJQTRCQztBQUVELFNBQVMsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBRTdFO0lBQ0UsT0FBTyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBRmUsWUFBSSxPQUVuQixDQUFBIn0=