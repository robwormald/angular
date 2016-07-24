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
var JsonPipeExample = (function () {
    function JsonPipeExample() {
        this.object = { foo: 'bar', baz: 'qux', nested: { xyz: 3, numbers: [1, 2, 3, 4, 5] } };
    }
    /** @nocollapse */
    JsonPipeExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'json-example',
                    template: "<div>\n    <p>Without JSON pipe:</p>\n    <pre>{{object}}</pre>\n    <p>With JSON pipe:</p>\n    <pre>{{object | json}}</pre>\n  </div>"
                },] },
    ];
    return JsonPipeExample;
}());
exports.JsonPipeExample = JsonPipeExample;
var AppCmp = (function () {
    function AppCmp() {
    }
    /** @nocollapse */
    AppCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'example-app',
                    directives: [JsonPipeExample],
                    template: "\n    <h1>JsonPipe Example</h1>\n    <json-example></json-example>\n  "
                },] },
    ];
    return AppCmp;
}());
exports.AppCmp = AppCmp;
function main() {
    platform_browser_dynamic_1.bootstrap(AppCmp);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9waXBlX2V4YW1wbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2V4YW1wbGVzL2NvcmUvcGlwZXMvdHMvanNvbl9waXBlL2pzb25fcGlwZV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUNBQXdCLG1DQUFtQyxDQUFDLENBQUE7QUFDNUQ7SUFBQTtRQUNFLFdBQU0sR0FBVyxFQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFDLENBQUM7SUFheEYsQ0FBQztJQVpELGtCQUFrQjtJQUNYLDBCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUseUlBS0g7aUJBQ1IsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLHNCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFkWSx1QkFBZSxrQkFjM0IsQ0FBQTtBQUNEO0lBQUE7SUFZQSxDQUFDO0lBWEQsa0JBQWtCO0lBQ1gsaUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFVBQVUsRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDN0IsUUFBUSxFQUFFLHdFQUdUO2lCQUNGLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixhQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFaWSxjQUFNLFNBWWxCLENBQUE7QUFFRDtJQUNFLG9DQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUZlLFlBQUksT0FFbkIsQ0FBQSJ9