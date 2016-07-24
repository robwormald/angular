/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var browser_platform_location_1 = require('../../browser/location/browser_platform_location');
var platform_location_1 = require('./platform_location');
/**
 * A list of {@link Provider}s. To use the router in a Worker enabled application you must
 * include these providers when setting up the render thread.
 * @experimental
 */
exports.WORKER_UI_LOCATION_PROVIDERS = [
    platform_location_1.MessageBasedPlatformLocation, browser_platform_location_1.BrowserPlatformLocation,
    { provide: core_1.PLATFORM_INITIALIZER, useFactory: initUiLocation, multi: true, deps: [core_1.Injector] }
];
function initUiLocation(injector) {
    return function () {
        var zone = injector.get(core_1.NgZone);
        zone.runGuarded(function () { return injector.get(platform_location_1.MessageBasedPlatformLocation).start(); });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fcHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3NyYy93ZWJfd29ya2Vycy91aS9sb2NhdGlvbl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUFxRCxlQUFlLENBQUMsQ0FBQTtBQUVyRSwwQ0FBc0Msa0RBQWtELENBQUMsQ0FBQTtBQUV6RixrQ0FBMkMscUJBQXFCLENBQUMsQ0FBQTtBQUlqRTs7OztHQUlHO0FBQ1Usb0NBQTRCLEdBQUc7SUFDMUMsZ0RBQTRCLEVBQUUsbURBQXVCO0lBQ3JELEVBQUMsT0FBTyxFQUFFLDJCQUFvQixFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFRLENBQUMsRUFBQztDQUMzRixDQUFDO0FBRUYsd0JBQXdCLFFBQWtCO0lBQ3hDLE1BQU0sQ0FBQztRQUNMLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsYUFBTSxDQUFDLENBQUM7UUFFaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxnREFBNEIsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFsRCxDQUFrRCxDQUFDLENBQUM7SUFDNUUsQ0FBQyxDQUFDO0FBQ0osQ0FBQyJ9