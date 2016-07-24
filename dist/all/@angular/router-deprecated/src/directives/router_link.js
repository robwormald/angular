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
var lang_1 = require('../facade/lang');
var router_1 = require('../router');
var RouterLink = (function () {
    function RouterLink(_router, _location) {
        var _this = this;
        this._router = _router;
        this._location = _location;
        // we need to update the link whenever a route changes to account for aux routes
        this._router.subscribe(function (_) { return _this._updateLink(); });
    }
    // because auxiliary links take existing primary and auxiliary routes into account,
    // we need to update the link whenever params or other routes change.
    RouterLink.prototype._updateLink = function () {
        this._navigationInstruction = this._router.generate(this._routeParams);
        var navigationHref = this._navigationInstruction.toLinkUrl();
        this.visibleHref = this._location.prepareExternalUrl(navigationHref);
    };
    Object.defineProperty(RouterLink.prototype, "isRouteActive", {
        get: function () { return this._router.isRouteActive(this._navigationInstruction); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RouterLink.prototype, "routeParams", {
        set: function (changes) {
            this._routeParams = changes;
            this._updateLink();
        },
        enumerable: true,
        configurable: true
    });
    RouterLink.prototype.onClick = function () {
        // If no target, or if target is _self, prevent default browser behavior
        if (!lang_1.isString(this.target) || this.target == '_self') {
            this._router.navigateByInstruction(this._navigationInstruction);
            return false;
        }
        return true;
    };
    /** @nocollapse */
    RouterLink.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[routerLink]',
                    inputs: ['routeParams: routerLink', 'target'],
                    host: {
                        '(click)': 'onClick()',
                        '[attr.href]': 'visibleHref',
                        '[class.router-link-active]': 'isRouteActive'
                    }
                },] },
    ];
    /** @nocollapse */
    RouterLink.ctorParameters = [
        { type: router_1.Router, },
        { type: common_1.Location, },
    ];
    return RouterLink;
}());
exports.RouterLink = RouterLink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX2xpbmsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci1kZXByZWNhdGVkL3NyYy9kaXJlY3RpdmVzL3JvdXRlcl9saW5rLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx1QkFBdUIsaUJBQWlCLENBQUMsQ0FBQTtBQUN6QyxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFFeEMscUJBQXVCLGdCQUFnQixDQUFDLENBQUE7QUFFeEMsdUJBQXFCLFdBQVcsQ0FBQyxDQUFBO0FBQ2pDO0lBVUUsb0JBQW9CLE9BQWUsRUFBVSxTQUFtQjtRQVZsRSxpQkF1REM7UUE3Q3FCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQzlELGdGQUFnRjtRQUNoRixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEtBQUksQ0FBQyxXQUFXLEVBQUUsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFRCxtRkFBbUY7SUFDbkYscUVBQXFFO0lBQzdELGdDQUFXLEdBQW5CO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN2RSxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDN0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxzQkFBSSxxQ0FBYTthQUFqQixjQUErQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVoRyxzQkFBSSxtQ0FBVzthQUFmLFVBQWdCLE9BQWM7WUFDNUIsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7WUFDNUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBRUQsNEJBQU8sR0FBUDtRQUNFLHdFQUF3RTtRQUN4RSxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7WUFDaEUsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNILGtCQUFrQjtJQUNYLHFCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxjQUFjO29CQUN4QixNQUFNLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRSxRQUFRLENBQUM7b0JBQzdDLElBQUksRUFBRTt3QkFDSixTQUFTLEVBQUUsV0FBVzt3QkFDdEIsYUFBYSxFQUFFLGFBQWE7d0JBQzVCLDRCQUE0QixFQUFFLGVBQWU7cUJBQzlDO2lCQUNGLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCx5QkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxlQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUsaUJBQVEsR0FBRztLQUNqQixDQUFDO0lBQ0YsaUJBQUM7QUFBRCxDQUFDLEFBdkRELElBdURDO0FBdkRZLGtCQUFVLGFBdUR0QixDQUFBIn0=