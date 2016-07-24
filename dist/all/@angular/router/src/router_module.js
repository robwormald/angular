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
var common_router_providers_1 = require('./common_router_providers');
var router_link_1 = require('./directives/router_link');
var router_link_active_1 = require('./directives/router_link_active');
var router_outlet_1 = require('./directives/router_outlet');
var router_1 = require('./router');
var router_config_loader_1 = require('./router_config_loader');
var router_outlet_map_1 = require('./router_outlet_map');
var router_state_1 = require('./router_state');
var url_tree_1 = require('./url_tree');
/**
 * @stable
 */
exports.ROUTER_DIRECTIVES = [router_outlet_1.RouterOutlet, router_link_1.RouterLink, router_link_1.RouterLinkWithHref, router_link_active_1.RouterLinkActive];
exports.ROUTER_PROVIDERS = [
    common_1.Location, { provide: common_1.LocationStrategy, useClass: common_1.PathLocationStrategy },
    { provide: url_tree_1.UrlSerializer, useClass: url_tree_1.DefaultUrlSerializer }, {
        provide: router_1.Router,
        useFactory: common_router_providers_1.setupRouter,
        deps: [
            core_1.ApplicationRef, core_1.ComponentResolver, url_tree_1.UrlSerializer, router_outlet_map_1.RouterOutletMap, common_1.Location, core_1.Injector,
            core_1.NgModuleFactoryLoader, router_config_loader_1.ROUTES, common_router_providers_1.ROUTER_CONFIGURATION
        ]
    },
    router_outlet_map_1.RouterOutletMap,
    { provide: router_state_1.ActivatedRoute, useFactory: function (r) { return r.routerState.root; }, deps: [router_1.Router] },
    { provide: core_1.NgModuleFactoryLoader, useClass: core_1.SystemJsNgModuleLoader },
    { provide: common_router_providers_1.ROUTER_CONFIGURATION, useValue: { enableTracing: false } }
];
var RouterModuleWithoutProviders = (function () {
    function RouterModuleWithoutProviders() {
    }
    /** @nocollapse */
    RouterModuleWithoutProviders.decorators = [
        { type: core_1.NgModule, args: [{ declarations: exports.ROUTER_DIRECTIVES, exports: exports.ROUTER_DIRECTIVES },] },
    ];
    return RouterModuleWithoutProviders;
}());
exports.RouterModuleWithoutProviders = RouterModuleWithoutProviders;
var RouterModule = (function () {
    function RouterModule(injector) {
        this.injector = injector;
        setTimeout(function () {
            var appRef = injector.get(core_1.ApplicationRef);
            if (appRef.componentTypes.length == 0) {
                appRef.registerBootstrapListener(function () { injector.get(router_1.Router).initialNavigation(); });
            }
            else {
                injector.get(router_1.Router).initialNavigation();
            }
        }, 0);
    }
    /** @nocollapse */
    RouterModule.decorators = [
        { type: core_1.NgModule, args: [{ exports: [RouterModuleWithoutProviders], providers: exports.ROUTER_PROVIDERS },] },
    ];
    /** @nocollapse */
    RouterModule.ctorParameters = [
        { type: core_1.Injector, },
    ];
    return RouterModule;
}());
exports.RouterModule = RouterModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX21vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyL3NyYy9yb3V0ZXJfbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx1QkFBK0QsaUJBQWlCLENBQUMsQ0FBQTtBQUNqRixxQkFBZ0ksZUFBZSxDQUFDLENBQUE7QUFFaEosd0NBQWdELDJCQUEyQixDQUFDLENBQUE7QUFDNUUsNEJBQTZDLDBCQUEwQixDQUFDLENBQUE7QUFDeEUsbUNBQStCLGlDQUFpQyxDQUFDLENBQUE7QUFDakUsOEJBQTJCLDRCQUE0QixDQUFDLENBQUE7QUFDeEQsdUJBQXFCLFVBQVUsQ0FBQyxDQUFBO0FBQ2hDLHFDQUFxQix3QkFBd0IsQ0FBQyxDQUFBO0FBQzlDLGtDQUE4QixxQkFBcUIsQ0FBQyxDQUFBO0FBQ3BELDZCQUE2QixnQkFBZ0IsQ0FBQyxDQUFBO0FBQzlDLHlCQUFrRCxZQUFZLENBQUMsQ0FBQTtBQUkvRDs7R0FFRztBQUNVLHlCQUFpQixHQUFHLENBQUMsNEJBQVksRUFBRSx3QkFBVSxFQUFFLGdDQUFrQixFQUFFLHFDQUFnQixDQUFDLENBQUM7QUFFckYsd0JBQWdCLEdBQVU7SUFDckMsaUJBQVEsRUFBRSxFQUFDLE9BQU8sRUFBRSx5QkFBZ0IsRUFBRSxRQUFRLEVBQUUsNkJBQW9CLEVBQUM7SUFDckUsRUFBQyxPQUFPLEVBQUUsd0JBQWEsRUFBRSxRQUFRLEVBQUUsK0JBQW9CLEVBQUMsRUFBRTtRQUN4RCxPQUFPLEVBQUUsZUFBTTtRQUNmLFVBQVUsRUFBRSxxQ0FBVztRQUN2QixJQUFJLEVBQUU7WUFDSixxQkFBYyxFQUFFLHdCQUFpQixFQUFFLHdCQUFhLEVBQUUsbUNBQWUsRUFBRSxpQkFBUSxFQUFFLGVBQVE7WUFDckYsNEJBQXFCLEVBQUUsNkJBQU0sRUFBRSw4Q0FBb0I7U0FDcEQ7S0FDRjtJQUNELG1DQUFlO0lBQ2YsRUFBQyxPQUFPLEVBQUUsNkJBQWMsRUFBRSxVQUFVLEVBQUUsVUFBQyxDQUFTLElBQUssT0FBQSxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksRUFBbEIsQ0FBa0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxlQUFNLENBQUMsRUFBQztJQUN4RixFQUFDLE9BQU8sRUFBRSw0QkFBcUIsRUFBRSxRQUFRLEVBQUUsNkJBQXNCLEVBQUM7SUFDbEUsRUFBQyxPQUFPLEVBQUUsOENBQW9CLEVBQUUsUUFBUSxFQUFFLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBQyxFQUFDO0NBQ2xFLENBQUM7QUFDRjtJQUFBO0lBS0EsQ0FBQztJQUpELGtCQUFrQjtJQUNYLHVDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGVBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFlBQVksRUFBRSx5QkFBaUIsRUFBRSxPQUFPLEVBQUUseUJBQWlCLEVBQUMsRUFBRyxFQUFFO0tBQzFGLENBQUM7SUFDRixtQ0FBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTFksb0NBQTRCLCtCQUt4QyxDQUFBO0FBQ0Q7SUFDRSxzQkFBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNwQyxVQUFVLENBQUM7WUFDVCxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLHFCQUFjLENBQUMsQ0FBQztZQUM1QyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLENBQUMseUJBQXlCLENBQUMsY0FBUSxRQUFRLENBQUMsR0FBRyxDQUFDLGVBQU0sQ0FBQyxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4RixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sUUFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFNLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNDLENBQUM7UUFDSCxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDUixDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsdUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZUFBUSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsNEJBQTRCLENBQUMsRUFBRSxTQUFTLEVBQUUsd0JBQWdCLEVBQUMsRUFBRyxFQUFFO0tBQ25HLENBQUM7SUFDRixrQkFBa0I7SUFDWCwyQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxlQUFRLEdBQUc7S0FDakIsQ0FBQztJQUNGLG1CQUFDO0FBQUQsQ0FBQyxBQW5CRCxJQW1CQztBQW5CWSxvQkFBWSxlQW1CeEIsQ0FBQSJ9