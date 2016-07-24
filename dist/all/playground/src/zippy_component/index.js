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
var zippy_1 = require('./app/zippy');
var ZippyApp = (function () {
    function ZippyApp() {
        this.logs = [];
    }
    ZippyApp.prototype.pushLog = function (log) { this.logs.push(log); };
    /** @nocollapse */
    ZippyApp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'zippy-app',
                    template: "\n    <zippy (open)=\"pushLog('open')\" (close)=\"pushLog('close')\" title=\"Details\">\n      This is some content.\n    </zippy>\n    <ul>\n      <li *ngFor=\"let  log of logs\">{{log}}</li>\n    </ul>\n  ",
                    directives: [zippy_1.Zippy]
                },] },
    ];
    return ZippyApp;
}());
function main() {
    platform_browser_dynamic_1.bootstrap(ZippyApp);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL3ppcHB5X2NvbXBvbmVudC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgseUNBQXdCLG1DQUFtQyxDQUFDLENBQUE7QUFDNUQscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHNCQUFvQixhQUFhLENBQUMsQ0FBQTtBQUNsQztJQUFBO1FBQ0UsU0FBSSxHQUFhLEVBQUUsQ0FBQztJQWtCdEIsQ0FBQztJQWhCQywwQkFBTyxHQUFQLFVBQVEsR0FBVyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQyxrQkFBa0I7SUFDWCxtQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLGlOQU9UO29CQUNELFVBQVUsRUFBRSxDQUFDLGFBQUssQ0FBQztpQkFDcEIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGVBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBRUQ7SUFDRSxvQ0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3RCLENBQUM7QUFGZSxZQUFJLE9BRW5CLENBQUEifQ==