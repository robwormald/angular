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
var SlicePipeStringExample = (function () {
    function SlicePipeStringExample() {
        this.str = 'abcdefghij';
    }
    /** @nocollapse */
    SlicePipeStringExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'slice-string-example',
                    template: "<div>\n    <p>{{str}}[0:4]: '{{str | slice:0:4}}' - output is expected to be 'abcd'</p>\n    <p>{{str}}[4:0]: '{{str | slice:4:0}}' - output is expected to be ''</p>\n    <p>{{str}}[-4]: '{{str | slice:-4}}' - output is expected to be 'ghij'</p>\n    <p>{{str}}[-4:-2]: '{{str | slice:-4:-2}}' - output is expected to be 'gh'</p>\n    <p>{{str}}[-100]: '{{str | slice:-100}}' - output is expected to be 'abcdefghij'</p>\n    <p>{{str}}[100]: '{{str | slice:100}}' - output is expected to be ''</p>\n  </div>"
                },] },
    ];
    return SlicePipeStringExample;
}());
exports.SlicePipeStringExample = SlicePipeStringExample;
var SlicePipeListExample = (function () {
    function SlicePipeListExample() {
        this.collection = ['a', 'b', 'c', 'd'];
    }
    /** @nocollapse */
    SlicePipeListExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'slice-list-example',
                    template: "<div>\n    <li *ngFor=\"let  i of collection | slice:1:3\">{{i}}</li>\n  </div>"
                },] },
    ];
    return SlicePipeListExample;
}());
exports.SlicePipeListExample = SlicePipeListExample;
var AppCmp = (function () {
    function AppCmp() {
    }
    /** @nocollapse */
    AppCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'example-app',
                    directives: [SlicePipeListExample, SlicePipeStringExample],
                    template: "\n    <h1>SlicePipe Examples</h1>\n    <slice-list-example></slice-list-example>\n    <slice-string-example></slice-string-example>\n  "
                },] },
    ];
    return AppCmp;
}());
exports.AppCmp = AppCmp;
function main() {
    platform_browser_dynamic_1.bootstrap(AppCmp);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpY2VfcGlwZV9leGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9leGFtcGxlcy9jb3JlL3BpcGVzL3RzL3NsaWNlX3BpcGUvc2xpY2VfcGlwZV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUNBQXdCLG1DQUFtQyxDQUFDLENBQUE7QUFDNUQ7SUFBQTtRQUNFLFFBQUcsR0FBVyxZQUFZLENBQUM7SUFlN0IsQ0FBQztJQWRELGtCQUFrQjtJQUNYLGlDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSw2ZkFPSDtpQkFDUixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0YsNkJBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBaEJZLDhCQUFzQix5QkFnQmxDLENBQUE7QUFDRDtJQUFBO1FBQ0UsZUFBVSxHQUFhLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFVOUMsQ0FBQztJQVRELGtCQUFrQjtJQUNYLCtCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxpRkFFSDtpQkFDUixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0YsMkJBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQVhZLDRCQUFvQix1QkFXaEMsQ0FBQTtBQUNEO0lBQUE7SUFhQSxDQUFDO0lBWkQsa0JBQWtCO0lBQ1gsaUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFVBQVUsRUFBRSxDQUFDLG9CQUFvQixFQUFFLHNCQUFzQixDQUFDO29CQUMxRCxRQUFRLEVBQUUseUlBSVQ7aUJBQ0YsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztBQWJZLGNBQU0sU0FhbEIsQ0FBQTtBQUVEO0lBQ0Usb0NBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQixDQUFDO0FBRmUsWUFBSSxPQUVuQixDQUFBIn0=