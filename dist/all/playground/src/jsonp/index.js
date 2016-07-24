/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var jsonp_comp_1 = require('./app/jsonp_comp');
function main() {
    platform_browser_dynamic_1.bootstrap(jsonp_comp_1.JsonpCmp, [http_1.JSONP_PROVIDERS]);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL2pzb25wL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5Q0FBd0IsbUNBQW1DLENBQUMsQ0FBQTtBQUM1RCxxQkFBOEIsZUFBZSxDQUFDLENBQUE7QUFDOUMsMkJBQXVCLGtCQUFrQixDQUFDLENBQUE7QUFFMUM7SUFDRSxvQ0FBUyxDQUFDLHFCQUFRLEVBQUUsQ0FBQyxzQkFBZSxDQUFDLENBQUMsQ0FBQztBQUN6QyxDQUFDO0FBRmUsWUFBSSxPQUVuQixDQUFBIn0=