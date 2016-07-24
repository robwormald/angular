/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var platform_location_1 = require('./platform_location');
/**
 * Those providers should be added when the router is used in a worker context in addition to the
 * {@link ROUTER_PROVIDERS} and after them.
 * @experimental
 */
exports.WORKER_APP_LOCATION_PROVIDERS = [
    { provide: common_1.PlatformLocation, useClass: platform_location_1.WebWorkerPlatformLocation }, {
        provide: core_1.APP_INITIALIZER,
        useFactory: appInitFnFactory,
        multi: true,
        deps: [common_1.PlatformLocation, core_1.NgZone]
    }
];
function appInitFnFactory(platformLocation, zone) {
    return function () { return zone.runGuarded(function () { return platformLocation.init(); }); };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3NyYy93ZWJfd29ya2Vycy93b3JrZXIvbG9jYXRpb25fcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx1QkFBK0IsaUJBQWlCLENBQUMsQ0FBQTtBQUNqRCxxQkFBc0MsZUFBZSxDQUFDLENBQUE7QUFFdEQsa0NBQXdDLHFCQUFxQixDQUFDLENBQUE7QUFHOUQ7Ozs7R0FJRztBQUNVLHFDQUE2QixHQUFHO0lBQzNDLEVBQUMsT0FBTyxFQUFFLHlCQUFnQixFQUFFLFFBQVEsRUFBRSw2Q0FBeUIsRUFBQyxFQUFFO1FBQ2hFLE9BQU8sRUFBRSxzQkFBZTtRQUN4QixVQUFVLEVBQUUsZ0JBQWdCO1FBQzVCLEtBQUssRUFBRSxJQUFJO1FBQ1gsSUFBSSxFQUFFLENBQUMseUJBQWdCLEVBQUUsYUFBTSxDQUFDO0tBQ2pDO0NBQ0YsQ0FBQztBQUVGLDBCQUEwQixnQkFBMkMsRUFBRSxJQUFZO0lBRWpGLE1BQU0sQ0FBQyxjQUFRLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQU0sT0FBQSxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFFLENBQUMifQ==