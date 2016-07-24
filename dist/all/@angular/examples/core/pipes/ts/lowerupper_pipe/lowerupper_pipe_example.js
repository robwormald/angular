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
var LowerUpperPipeExample = (function () {
    function LowerUpperPipeExample() {
    }
    LowerUpperPipeExample.prototype.change = function (value) { this.value = value; };
    /** @nocollapse */
    LowerUpperPipeExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'lowerupper-example',
                    template: "<div>\n    <label>Name: </label><input #name (keyup)=\"change(name.value)\" type=\"text\">\n    <p>In lowercase: <pre>'{{value | lowercase}}'</pre></p>\n    <p>In uppercase: <pre>'{{value | uppercase}}'</pre></p>\n  </div>"
                },] },
    ];
    return LowerUpperPipeExample;
}());
exports.LowerUpperPipeExample = LowerUpperPipeExample;
var AppCmp = (function () {
    function AppCmp() {
    }
    /** @nocollapse */
    AppCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'example-app',
                    directives: [LowerUpperPipeExample],
                    template: "\n    <h1>LowercasePipe &amp; UppercasePipe Example</h1>\n    <lowerupper-example></lowerupper-example>\n  "
                },] },
    ];
    return AppCmp;
}());
exports.AppCmp = AppCmp;
function main() {
    platform_browser_dynamic_1.bootstrap(AppCmp);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG93ZXJ1cHBlcl9waXBlX2V4YW1wbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2V4YW1wbGVzL2NvcmUvcGlwZXMvdHMvbG93ZXJ1cHBlcl9waXBlL2xvd2VydXBwZXJfcGlwZV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUNBQXdCLG1DQUFtQyxDQUFDLENBQUE7QUFDNUQ7SUFBQTtJQWNBLENBQUM7SUFaQyxzQ0FBTSxHQUFOLFVBQU8sS0FBYSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUMvQyxrQkFBa0I7SUFDWCxnQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixRQUFRLEVBQUUsZ09BSUg7aUJBQ1IsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLDRCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFkWSw2QkFBcUIsd0JBY2pDLENBQUE7QUFDRDtJQUFBO0lBWUEsQ0FBQztJQVhELGtCQUFrQjtJQUNYLGlCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixVQUFVLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQztvQkFDbkMsUUFBUSxFQUFFLDZHQUdUO2lCQUNGLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixhQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFaWSxjQUFNLFNBWWxCLENBQUE7QUFFRDtJQUNFLG9DQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUZlLFlBQUksT0FFbkIsQ0FBQSJ9