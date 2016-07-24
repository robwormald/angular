/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var platform_browser_1 = require('@angular/platform-browser');
var common_router_providers_1 = require('./common_router_providers');
/**
 * A list of {@link Provider}s. To use the router, you must add this to your application.
 *
 * ### Example
 *
 * ```
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * class AppCmp {
 *   // ...
 * }
 *
 * const router = [
 *   {path: 'home', component: Home}
 * ];
 *
 * bootstrap(AppCmp, [provideRouter(router, {enableTracing: true})]);
 * ```
 *
 * @experimental
 */
function provideRouter(config, opts) {
    if (opts === void 0) { opts = {}; }
    return [
        { provide: common_1.PlatformLocation, useClass: platform_browser_1.BrowserPlatformLocation }
    ].concat(common_router_providers_1.provideRouter(config, opts));
}
exports.provideRouter = provideRouter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Byb3ZpZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyL3NyYy9yb3V0ZXJfcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx1QkFBK0IsaUJBQWlCLENBQUMsQ0FBQTtBQUNqRCxpQ0FBc0MsMkJBQTJCLENBQUMsQ0FBQTtBQUVsRSx3Q0FBNEQsMkJBQTJCLENBQUMsQ0FBQTtBQUl4Rjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILHVCQUE4QixNQUFjLEVBQUUsSUFBdUI7SUFBdkIsb0JBQXVCLEdBQXZCLFNBQXVCO0lBQ25FLE1BQU0sQ0FBQztRQUNMLEVBQUMsT0FBTyxFQUFFLHlCQUFnQixFQUFFLFFBQVEsRUFBRSwwQ0FBdUIsRUFBQzthQUFLLHVDQUFjLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUNoRyxDQUFDO0FBQ0osQ0FBQztBQUplLHFCQUFhLGdCQUk1QixDQUFBIn0=