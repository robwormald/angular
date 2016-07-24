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
var exceptions_1 = require('../src/facade/exceptions');
var route_registry_1 = require('./route_registry');
var router_1 = require('./router');
/**
 * The Platform agnostic ROUTER PROVIDERS
 */
exports.ROUTER_PROVIDERS_COMMON = [
    route_registry_1.RouteRegistry,
    /* @ts2dart_Provider */ { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy }, common_1.Location, {
        provide: router_1.Router,
        useFactory: routerFactory,
        deps: [route_registry_1.RouteRegistry, common_1.Location, route_registry_1.ROUTER_PRIMARY_COMPONENT, core_1.ApplicationRef]
    },
    {
        provide: route_registry_1.ROUTER_PRIMARY_COMPONENT,
        useFactory: routerPrimaryComponentFactory,
        deps: /*@ts2dart_const*/ ([core_1.ApplicationRef])
    }
];
function routerFactory(registry, location, primaryComponent, appRef) {
    var rootRouter = new router_1.RootRouter(registry, location, primaryComponent);
    appRef.registerDisposeListener(function () { return rootRouter.dispose(); });
    return rootRouter;
}
function routerPrimaryComponentFactory(app) {
    if (app.componentTypes.length == 0) {
        throw new exceptions_1.BaseException('Bootstrap at least one component before injecting Router.');
    }
    return app.componentTypes[0];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Byb3ZpZGVyc19jb21tb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci1kZXByZWNhdGVkL3NyYy9yb3V0ZXJfcHJvdmlkZXJzX2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUJBQStELGlCQUFpQixDQUFDLENBQUE7QUFDakYscUJBQTZCLGVBQWUsQ0FBQyxDQUFBO0FBRTdDLDJCQUE0QiwwQkFBMEIsQ0FBQyxDQUFBO0FBR3ZELCtCQUFzRCxrQkFBa0IsQ0FBQyxDQUFBO0FBQ3pFLHVCQUFpQyxVQUFVLENBQUMsQ0FBQTtBQUc1Qzs7R0FFRztBQUNVLCtCQUF1QixHQUE0QjtJQUM5RCw4QkFBYTtJQUNiLHVCQUF1QixDQUFDLEVBQUMsT0FBTyxFQUFFLHlCQUFnQixFQUFFLFFBQVEsRUFBRSw2QkFBb0IsRUFBQyxFQUFFLGlCQUFRLEVBQUU7UUFDN0YsT0FBTyxFQUFFLGVBQU07UUFDZixVQUFVLEVBQUUsYUFBYTtRQUN6QixJQUFJLEVBQUUsQ0FBQyw4QkFBYSxFQUFFLGlCQUFRLEVBQUUseUNBQXdCLEVBQUUscUJBQWMsQ0FBQztLQUMxRTtJQUNEO1FBQ0UsT0FBTyxFQUFFLHlDQUF3QjtRQUNqQyxVQUFVLEVBQUUsNkJBQTZCO1FBQ3pDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMscUJBQWMsQ0FBQyxDQUFDO0tBQzVDO0NBQ0YsQ0FBQztBQUVGLHVCQUNJLFFBQXVCLEVBQUUsUUFBa0IsRUFBRSxnQkFBc0IsRUFDbkUsTUFBc0I7SUFDeEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxtQkFBVSxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUN0RSxNQUFNLENBQUMsdUJBQXVCLENBQUMsY0FBTSxPQUFBLFVBQVUsQ0FBQyxPQUFPLEVBQUUsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDO0lBQzNELE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQUVELHVDQUF1QyxHQUFtQjtJQUN4RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sSUFBSSwwQkFBYSxDQUFDLDJEQUEyRCxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQy9CLENBQUMifQ==