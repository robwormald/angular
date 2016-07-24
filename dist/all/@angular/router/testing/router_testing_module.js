/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var testing_1 = require('@angular/common/testing');
var core_1 = require('@angular/core');
var index_1 = require('../index');
var router_config_loader_1 = require('../src/router_config_loader');
var router_module_1 = require('../src/router_module');
var SpyNgModuleFactoryLoader = (function () {
    function SpyNgModuleFactoryLoader(compiler) {
        this.compiler = compiler;
        this.stubbedModules = {};
    }
    SpyNgModuleFactoryLoader.prototype.load = function (path) {
        if (this.stubbedModules[path]) {
            return this.compiler.compileNgModuleAsync(this.stubbedModules[path]);
        }
        else {
            return Promise.reject(new Error("Cannot find module " + path));
        }
    };
    /** @nocollapse */
    SpyNgModuleFactoryLoader.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    SpyNgModuleFactoryLoader.ctorParameters = [
        { type: core_1.Compiler, },
    ];
    return SpyNgModuleFactoryLoader;
}());
exports.SpyNgModuleFactoryLoader = SpyNgModuleFactoryLoader;
var RouterTestingModule = (function () {
    function RouterTestingModule() {
    }
    /** @nocollapse */
    RouterTestingModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [router_module_1.RouterModule],
                    providers: [
                        { provide: common_1.Location, useClass: testing_1.SpyLocation },
                        { provide: common_1.LocationStrategy, useClass: testing_1.MockLocationStrategy },
                        { provide: core_1.NgModuleFactoryLoader, useClass: SpyNgModuleFactoryLoader },
                        {
                            provide: index_1.Router,
                            useFactory: function (resolver, urlSerializer, outletMap, location, loader, injector, routes) {
                                return new index_1.Router(null, resolver, urlSerializer, outletMap, location, injector, loader, routes);
                            },
                            deps: [
                                core_1.ComponentResolver, index_1.UrlSerializer, index_1.RouterOutletMap, common_1.Location, core_1.NgModuleFactoryLoader,
                                core_1.Injector, router_config_loader_1.ROUTES
                            ]
                        },
                    ]
                },] },
    ];
    return RouterTestingModule;
}());
exports.RouterTestingModule = RouterTestingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3Rlc3RpbmdfbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9yb3V0ZXIvdGVzdGluZy9yb3V0ZXJfdGVzdGluZ19tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHVCQUF5QyxpQkFBaUIsQ0FBQyxDQUFBO0FBQzNELHdCQUFnRCx5QkFBeUIsQ0FBQyxDQUFBO0FBQzFFLHFCQUFrSCxlQUFlLENBQUMsQ0FBQTtBQUVsSSxzQkFBNkQsVUFBVSxDQUFDLENBQUE7QUFDeEUscUNBQXFCLDZCQUE2QixDQUFDLENBQUE7QUFDbkQsOEJBQTJCLHNCQUFzQixDQUFDLENBQUE7QUFDbEQ7SUFHRSxrQ0FBb0IsUUFBa0I7UUFBbEIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUYvQixtQkFBYyxHQUEwQixFQUFFLENBQUM7SUFFVCxDQUFDO0lBRTFDLHVDQUFJLEdBQUosVUFBSyxJQUFZO1FBQ2YsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sQ0FBTSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLHdCQUFzQixJQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7SUFDSCxDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsbUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsaUJBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsdUNBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsZUFBUSxHQUFHO0tBQ2pCLENBQUM7SUFDRiwrQkFBQztBQUFELENBQUMsQUFwQkQsSUFvQkM7QUFwQlksZ0NBQXdCLDJCQW9CcEMsQ0FBQTtBQUNEO0lBQUE7SUF5QkEsQ0FBQztJQXhCRCxrQkFBa0I7SUFDWCw4QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxlQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLDRCQUFZLENBQUM7b0JBQ3ZCLFNBQVMsRUFBRTt3QkFDVCxFQUFDLE9BQU8sRUFBRSxpQkFBUSxFQUFFLFFBQVEsRUFBRSxxQkFBVyxFQUFDO3dCQUMxQyxFQUFDLE9BQU8sRUFBRSx5QkFBZ0IsRUFBRSxRQUFRLEVBQUUsOEJBQW9CLEVBQUM7d0JBQzNELEVBQUMsT0FBTyxFQUFFLDRCQUFxQixFQUFFLFFBQVEsRUFBRSx3QkFBd0IsRUFBQzt3QkFDcEU7NEJBQ0UsT0FBTyxFQUFFLGNBQU07NEJBQ2YsVUFBVSxFQUFFLFVBQUMsUUFBMkIsRUFBRSxhQUE0QixFQUN6RCxTQUEwQixFQUFFLFFBQWtCLEVBQUUsTUFBNkIsRUFDN0UsUUFBa0IsRUFBRSxNQUFjO2dDQUM3QyxNQUFNLENBQUMsSUFBSSxjQUFNLENBQ2IsSUFBSSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOzRCQUNwRixDQUFDOzRCQUNELElBQUksRUFBRTtnQ0FDSix3QkFBaUIsRUFBRSxxQkFBYSxFQUFFLHVCQUFlLEVBQUUsaUJBQVEsRUFBRSw0QkFBcUI7Z0NBQ2xGLGVBQVEsRUFBRSw2QkFBTTs2QkFDakI7eUJBQ0Y7cUJBQ0Y7aUJBQ0YsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLDBCQUFDO0FBQUQsQ0FBQyxBQXpCRCxJQXlCQztBQXpCWSwyQkFBbUIsc0JBeUIvQixDQUFBIn0=