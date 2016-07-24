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
var my_cmp_1 = require('./app/my_cmp');
function main() {
    platform_browser_dynamic_1.bootstrap(RelativeApp);
}
exports.main = main;
var RelativeApp = (function () {
    function RelativeApp() {
    }
    /** @nocollapse */
    RelativeApp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'relative-app',
                    directives: [my_cmp_1.MyCmp],
                    template: "component = <my-cmp></my-cmp>",
                },] },
    ];
    return RelativeApp;
}());
exports.RelativeApp = RelativeApp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL3JlbGF0aXZlX2Fzc2V0cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgseUNBQXdCLG1DQUFtQyxDQUFDLENBQUE7QUFDNUQscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDLHVCQUFvQixjQUFjLENBQUMsQ0FBQTtBQUVuQztJQUNFLG9DQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDekIsQ0FBQztBQUZlLFlBQUksT0FFbkIsQ0FBQTtBQUNEO0lBQUE7SUFTQSxDQUFDO0lBUkQsa0JBQWtCO0lBQ1gsc0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLFVBQVUsRUFBRSxDQUFDLGNBQUssQ0FBQztvQkFDbkIsUUFBUSxFQUFFLCtCQUErQjtpQkFDMUMsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFUWSxtQkFBVyxjQVN2QixDQUFBIn0=