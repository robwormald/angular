/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var exceptions_1 = require('@angular/core/src/facade/exceptions');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var ErrorComponent = (function () {
    function ErrorComponent() {
    }
    ErrorComponent.prototype.createError = function () { throw new exceptions_1.BaseException('Sourcemap test'); };
    /** @nocollapse */
    ErrorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'error-app',
                    template: "\n           <button class=\"errorButton\" (click)=\"createError()\">create error</button>"
                },] },
    ];
    return ErrorComponent;
}());
exports.ErrorComponent = ErrorComponent;
function main() {
    platform_browser_dynamic_1.bootstrap(ErrorComponent);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL3NvdXJjZW1hcC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsMkJBQTRCLHFDQUFxQyxDQUFDLENBQUE7QUFDbEUseUNBQXdCLG1DQUFtQyxDQUFDLENBQUE7QUFDNUQscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDO0lBQUE7SUFVQSxDQUFDO0lBVEMsb0NBQVcsR0FBWCxjQUFzQixNQUFNLElBQUksMEJBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRSxrQkFBa0I7SUFDWCx5QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLDRGQUN5RTtpQkFDcEYsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLHFCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSxzQkFBYyxpQkFVMUIsQ0FBQTtBQUVEO0lBQ0Usb0NBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRmUsWUFBSSxPQUVuQixDQUFBIn0=