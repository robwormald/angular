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
var router_1 = require('./router');
var router_config_loader_1 = require('./router_config_loader');
var router_outlet_map_1 = require('./router_outlet_map');
var router_state_1 = require('./router_state');
var url_tree_1 = require('./url_tree');
exports.ROUTER_CONFIGURATION = new core_1.OpaqueToken('ROUTER_CONFIGURATION');
function setupRouter(ref, resolver, urlSerializer, outletMap, location, injector, loader, config, opts) {
    if (ref.componentTypes.length == 0) {
        throw new Error('Bootstrap at least one component before injecting Router.');
    }
    var componentType = ref.componentTypes[0];
    var r = new router_1.Router(componentType, resolver, urlSerializer, outletMap, location, injector, loader, config);
    ref.registerDisposeListener(function () { return r.dispose(); });
    if (opts.enableTracing) {
        r.events.subscribe(function (e) {
            console.group("Router Event: " + e.constructor.name);
            console.log(e.toString());
            console.log(e);
            console.groupEnd();
        });
    }
    return r;
}
exports.setupRouter = setupRouter;
function setupRouterInitializer(injector) {
    // https://github.com/angular/angular/issues/9101
    // Delay the router instantiation to avoid circular dependency (ApplicationRef ->
    // APP_INITIALIZER -> Router)
    setTimeout(function () {
        var appRef = injector.get(core_1.ApplicationRef);
        if (appRef.componentTypes.length == 0) {
            appRef.registerBootstrapListener(function () { injector.get(router_1.Router).initialNavigation(); });
        }
        else {
            injector.get(router_1.Router).initialNavigation();
        }
    }, 0);
    return function () { return null; };
}
exports.setupRouterInitializer = setupRouterInitializer;
/**
 * An array of {@link Provider}s. To use the router, you must add this to your application.
 *
 * ### Example
 *
 * ```
 * @Component({directives: [ROUTER_DIRECTIVES]})
 * class AppCmp {
 *   // ...
 * }
 *
 * const config = [
 *   {path: 'home', component: Home}
 * ];
 *
 * bootstrap(AppCmp, [provideRouter(config)]);
 * ```
 *
 * @deprecated use RouterModule instead
 */
function provideRouter(routes, config) {
    return [
        { provide: core_1.ANALYZE_FOR_PRECOMPILE, multi: true, useValue: routes },
        { provide: router_config_loader_1.ROUTES, useExisting: router_config_loader_1.ROUTER_CONFIG }, { provide: router_config_loader_1.ROUTER_CONFIG, useValue: routes },
        { provide: exports.ROUTER_CONFIGURATION, useValue: config }, common_1.Location,
        { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy },
        { provide: url_tree_1.UrlSerializer, useClass: url_tree_1.DefaultUrlSerializer },
        {
            provide: router_1.Router,
            useFactory: setupRouter,
            deps: [
                core_1.ApplicationRef, core_1.ComponentResolver, url_tree_1.UrlSerializer, router_outlet_map_1.RouterOutletMap, common_1.Location, core_1.Injector,
                core_1.NgModuleFactoryLoader, router_config_loader_1.ROUTES, exports.ROUTER_CONFIGURATION
            ]
        },
        router_outlet_map_1.RouterOutletMap,
        { provide: router_state_1.ActivatedRoute, useFactory: function (r) { return r.routerState.root; }, deps: [router_1.Router] },
        // Trigger initial navigation
        { provide: core_1.APP_INITIALIZER, multi: true, useFactory: setupRouterInitializer, deps: [core_1.Injector] },
        { provide: core_1.NgModuleFactoryLoader, useClass: core_1.SystemJsNgModuleLoader }
    ];
}
exports.provideRouter = provideRouter;
/**
 * Router configuration.
 *
 * ### Example
 *
 * ```
 * @NgModule({providers: [
 *   provideRoutes([{path: 'home', component: Home}])
 * ]})
 * class LazyLoadedModule {
 *   // ...
 * }
 * ```
 *
 * @experimental
 */
function provideRoutes(routes) {
    return [
        { provide: core_1.ANALYZE_FOR_PRECOMPILE, multi: true, useValue: routes },
        { provide: router_config_loader_1.ROUTES, useValue: routes }
    ];
}
exports.provideRoutes = provideRoutes;
/**
 * Router configuration.
 *
 * ### Example
 *
 * ```
 * @NgModule({providers: [
 *   provideRouterOptions({enableTracing: true})
 * ]})
 * class LazyLoadedModule {
 *   // ...
 * }
 * ```
 *
 * @experimental
 */
function provideRouterConfig(config) {
    return { provide: exports.ROUTER_CONFIGURATION, useValue: config };
}
exports.provideRouterConfig = provideRouterConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX3JvdXRlcl9wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci9zcmMvY29tbW9uX3JvdXRlcl9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHVCQUErRCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2pGLHFCQUErSixlQUFlLENBQUMsQ0FBQTtBQUcvSyx1QkFBcUIsVUFBVSxDQUFDLENBQUE7QUFDaEMscUNBQW9DLHdCQUF3QixDQUFDLENBQUE7QUFDN0Qsa0NBQThCLHFCQUFxQixDQUFDLENBQUE7QUFDcEQsNkJBQTZCLGdCQUFnQixDQUFDLENBQUE7QUFDOUMseUJBQWtELFlBQVksQ0FBQyxDQUFBO0FBRWxELDRCQUFvQixHQUFHLElBQUksa0JBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBTzVFLHFCQUNJLEdBQW1CLEVBQUUsUUFBMkIsRUFBRSxhQUE0QixFQUM5RSxTQUEwQixFQUFFLFFBQWtCLEVBQUUsUUFBa0IsRUFDbEUsTUFBNkIsRUFBRSxNQUFjLEVBQUUsSUFBa0I7SUFDbkUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNELElBQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUMsSUFBTSxDQUFDLEdBQUcsSUFBSSxlQUFNLENBQ2hCLGFBQWEsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMzRixHQUFHLENBQUMsdUJBQXVCLENBQUMsY0FBTSxPQUFBLENBQUMsQ0FBQyxP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