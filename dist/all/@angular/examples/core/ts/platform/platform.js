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
var appProviders = [];
var MyApp = (function () {
    function MyApp() {
    }
    /** @nocollapse */
    MyApp.decorators = [
        { type: core_1.Component, args: [{ selector: 'my-app', template: 'Hello World' },] },
    ];
    return MyApp;
}());
var platform = core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate(platform_browser_dynamic_1.BROWSER_DYNAMIC_PLATFORM_PROVIDERS));
core_1.bootstrapModule(MyApp, platform);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2V4YW1wbGVzL2NvcmUvdHMvcGxhdGZvcm0vcGxhdGZvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUE2RSxlQUFlLENBQUMsQ0FBQTtBQUU3Rix5Q0FBaUQsbUNBQW1DLENBQUMsQ0FBQTtBQUVyRixJQUFJLFlBQVksR0FBVSxFQUFFLENBQUM7QUFDN0I7SUFBQTtJQUtBLENBQUM7SUFKRCxrQkFBa0I7SUFDWCxnQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFDLEVBQUcsRUFBRTtLQUMzRSxDQUFDO0lBQ0YsWUFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBRUQsSUFBSSxRQUFRLEdBQ1IscUJBQWMsQ0FBQyx5QkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyw2REFBa0MsQ0FBQyxDQUFDLENBQUM7QUFDNUYsc0JBQWUsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMifQ==