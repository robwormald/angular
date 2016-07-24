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
var DatePipeExample = (function () {
    function DatePipeExample() {
        this.today = Date.now();
    }
    /** @nocollapse */
    DatePipeExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'date-example',
                    template: "<div>\n    <p>Today is {{today | date}}</p>\n    <p>Or if you prefer, {{today | date:'fullDate'}}</p>\n    <p>The time is {{today | date:'jmZ'}}</p>\n  </div>"
                },] },
    ];
    return DatePipeExample;
}());
exports.DatePipeExample = DatePipeExample;
var AppCmp = (function () {
    function AppCmp() {
    }
    /** @nocollapse */
    AppCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'example-app',
                    directives: [DatePipeExample],
                    template: "\n    <h1>DatePipe Example</h1>\n    <date-example></date-example>\n  "
                },] },
    ];
    return AppCmp;
}());
exports.AppCmp = AppCmp;
function main() {
    platform_browser_dynamic_1.bootstrap(AppCmp);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZV9waXBlX2V4YW1wbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2V4YW1wbGVzL2NvcmUvcGlwZXMvdHMvZGF0ZV9waXBlL2RhdGVfcGlwZV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUNBQXdCLG1DQUFtQyxDQUFDLENBQUE7QUFDNUQ7SUFBQTtRQUNFLFVBQUssR0FBVyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7SUFZN0IsQ0FBQztJQVhELGtCQUFrQjtJQUNYLDBCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUsZ0tBSUg7aUJBQ1IsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLHNCQUFDO0FBQUQsQ0FBQyxBQWJELElBYUM7QUFiWSx1QkFBZSxrQkFhM0IsQ0FBQTtBQUNEO0lBQUE7SUFZQSxDQUFDO0lBWEQsa0JBQWtCO0lBQ1gsaUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFVBQVUsRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDN0IsUUFBUSxFQUFFLHdFQUdUO2lCQUNGLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixhQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFaWSxjQUFNLFNBWWxCLENBQUE7QUFFRDtJQUNFLG9DQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUZlLFlBQUksT0FFbkIsQ0FBQSJ9