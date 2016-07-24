/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var router_outlet_map_1 = require('../router_outlet_map');
var shared_1 = require('../shared');
var RouterOutlet = (function () {
    function RouterOutlet(parentOutletMap, location, resolver, name) {
        this.location = location;
        this.resolver = resolver;
        this.activateEvents = new core_1.EventEmitter();
        this.deactivateEvents = new core_1.EventEmitter();
        parentOutletMap.registerOutlet(name ? name : shared_1.PRIMARY_OUTLET, this);
    }
    Object.defineProperty(RouterOutlet.prototype, "isActivated", {
        get: function () { return !!this.activated; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet.prototype, "component", {
        get: function () {
            if (!this.activated)
                throw new Error('Outlet is not activated');
            return this.activated.instance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterOutlet.prototype, "activatedRoute", {
        get: function () {
            if (!this.activated)
                throw new Error('Outlet is not activated');
            return this._activatedRoute;
        },
        enumerable: true,
        configurable: true
    });
    RouterOutlet.prototype.deactivate = function () {
        if (this.activated) {
            var c = this.component;
            this.activated.destroy();
            this.activated = null;
            this.deactivateEvents.emit(c);
        }
    };
    RouterOutlet.prototype.activate = function (activatedRoute, loadedResolver, loadedInjector, providers, outletMap) {
        this.outletMap = outletMap;
        this._activatedRoute = activatedRoute;
        var snapshot = activatedRoute._futureSnapshot;
        var component = snapshot._routeConfig.component;
        var factory;
        try {
            if (typeof component === 'string') {
                factory = snapshot._resolvedComponentFactory;
            }
            else if (loadedResolver) {
                factory = loadedResolver.resolveComponentFactory(component);
            }
            else {
                factory = this.resolver.resolveComponentFactory(component);
            }
        }
        catch (e) {
            if (!(e instanceof core_1.NoComponentFactoryError))
                throw e;
            var componentName = component ? component.name : null;
            console.warn("'" + componentName + "' not found in precompile array.  To ensure all components referred\n          to by the Routes are compiled, you must add '" + componentName + "' to the\n          'precompile' array of your application component. This will be required in a future\n          release of the router.");
            factory = snapshot._resolvedComponentFactory;
        }
        var injector = loadedInjector ? loadedInjector : this.location.parentInjector;
        var inj = core_1.ReflectiveInjector.fromResolvedProviders(providers, injector);
        this.activated = this.location.createComponent(factory, this.location.length, inj, []);
        this.activated.changeDetectorRef.detectChanges();
        this.activateEvents.emit(this.activated.instance);
    };
    /** @nocollapse */
    RouterOutlet.decorators = [
        { type: core_1.Directive, args: [{ selector: 'router-outlet' },] },
    ];
    /** @nocollapse */
    RouterOutlet.ctorParameters = [
        { type: router_outlet_map_1.RouterOutletMap, },
        { type: core_1.ViewContainerRef, },
        { type: core_1.ComponentFactoryResolver, },
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['name',] },] },
    ];
    /** @nocollapse */
    RouterOutlet.propDecorators = {
        'activateEvents': [{ type: core_1.Output, args: ['activate',] },],
        'deactivateEvents': [{ type: core_1.Output, args: ['deactivate',] },],
    };
    return RouterOutlet;
}());
exports.RouterOutlet = RouterOutlet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX291dGxldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyL3NyYy9kaXJlY3RpdmVzL3JvdXRlcl9vdXRsZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUF3TixlQUFlLENBQUMsQ0FBQTtBQUV4TyxrQ0FBOEIsc0JBQXNCLENBQUMsQ0FBQTtBQUVyRCx1QkFBNkIsV0FBVyxDQUFDLENBQUE7QUFDekM7SUFLRSxzQkFDSSxlQUFnQyxFQUFVLFFBQTBCLEVBQzVELFFBQWtDLEVBQUUsSUFBWTtRQURkLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQzVELGFBQVEsR0FBUixRQUFRLENBQTBCO1FBSlgsbUJBQWMsR0FBRyxJQUFJLG1CQUFZLEVBQU8sQ0FBQztRQUFDLHFCQUFnQixHQUFHLElBQUksbUJBQVksRUFBTyxDQUFDO1FBS3RILGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyx1QkFBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFFRCxzQkFBSSxxQ0FBVzthQUFmLGNBQTZCLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ3ZELHNCQUFJLG1DQUFTO2FBQWI7WUFDRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1lBQ2hFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztRQUNqQyxDQUFDOzs7T0FBQTtJQUNELHNCQUFJLHdDQUFjO2FBQWxCO1lBQ0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLENBQUMs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