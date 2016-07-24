/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var SvgGroup = (function () {
    function SvgGroup() {
    }
    /** @nocollapse */
    SvgGroup.decorators = [
        { type: core_1.Component, args: [{ selector: '[svg-group]', template: "<svg:text x=\"20\" y=\"20\">Hello</svg:text>" },] },
    ];
    return SvgGroup;
}());
var SvgApp = (function () {
    function SvgApp() {
    }
    /** @nocollapse */
    SvgApp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'svg-app',
                    template: "<svg>\n    <g svg-group></g>\n  </svg>",
                    directives: [SvgGroup]
                },] },
    ];
    return SvgApp;
}());
function main() {
    platform_browser_dynamic_1.bootstrap(SvgApp);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL3N2Zy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgseUNBQXdCLG1DQUFtQyxDQUFDLENBQUE7QUFDNUQscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDO0lBQUE7SUFLQSxDQUFDO0lBSkQsa0JBQWtCO0lBQ1gsbUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLDhDQUEwQyxFQUFDLEVBQUcsRUFBRTtLQUM3RyxDQUFDO0lBQ0YsZUFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBQ0Q7SUFBQTtJQVdBLENBQUM7SUFWRCxrQkFBa0I7SUFDWCxpQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsU0FBUztvQkFDbkIsUUFBUSxFQUFFLHdDQUVIO29CQUNQLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQztpQkFDdkIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQUdEO0lBQ0Usb0NBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBRmUsWUFBSSxPQUVuQixDQUFBIn0=