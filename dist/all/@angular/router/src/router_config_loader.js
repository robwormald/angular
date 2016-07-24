/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var fromPromise_1 = require('rxjs/observable/fromPromise');
/**
 * @deprecated use Routes
 */
exports.ROUTER_CONFIG = new core_1.OpaqueToken('ROUTER_CONFIG');
exports.ROUTES = new core_1.OpaqueToken('ROUTES');
var LoadedRouterConfig = (function () {
    function LoadedRouterConfig(routes, injector, factoryResolver) {
        this.routes = routes;
        this.injector = injector;
        this.factoryResolver = factoryResolver;
    }
    return LoadedRouterConfig;
}());
exports.LoadedRouterConfig = LoadedRouterConfig;
var RouterConfigLoader = (function () {
    function RouterConfigLoader(loader) {
        this.loader = loader;
    }
    RouterConfigLoader.prototype.load = function (parentInjector, path) {
        return fromPromise_1.fromPromise(this.loader.load(path).then(function (r) {
            var ref = r.create(parentInjector);
            return new LoadedRouterConfig(ref.injector.get(exports.ROUTES), ref.injector, ref.componentFactoryResolver);
        }));
    };
    return RouterConfigLoader;
}());
exports.RouterConfigLoader = RouterConfigLoader;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX2NvbmZpZ19sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci9zcmMvcm91dGVyX2NvbmZpZ19sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUFxRixlQUFlLENBQUMsQ0FBQTtBQUVyRyw0QkFBMEIsNkJBQTZCLENBQUMsQ0FBQTtBQU14RDs7R0FFRztBQUNVLHFCQUFhLEdBQUcsSUFBSSxrQkFBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ2pELGNBQU0sR0FBRyxJQUFJLGtCQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFaEQ7SUFDRSw0QkFDVyxNQUFlLEVBQVMsUUFBa0IsRUFDMUMsZUFBeUM7UUFEekMsV0FBTSxHQUFOLE1BQU0sQ0FBUztRQUFTLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDMUMsb0JBQWUsR0FBZixlQUFlLENBQTBCO0lBQUcsQ0FBQztJQUMxRCx5QkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksMEJBQWtCLHFCQUk5QixDQUFBO0FBRUQ7SUFDRSw0QkFBb0IsTUFBNkI7UUFBN0IsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7SUFBRyxDQUFDO0lBRXJELGlDQUFJLEdBQUosVUFBSyxjQUF3QixFQUFFLElBQVk7UUFDekMsTUFBTSxDQUFDLHlCQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQztZQUM5QyxJQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JDLE1BQU0sQ0FBQyxJQUFJLGtCQUFrQixDQUN6QixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxjQUFNLENBQUMsRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZZLDBCQUFrQixxQkFVOUIsQ0FBQSJ9