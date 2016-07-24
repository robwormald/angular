/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var dynamic_component_loader_1 = require('@angular/core/src/linker/dynamic_component_loader');
var router_deprecated_1 = require('@angular/router-deprecated');
var async_1 = require('../../../src/facade/async');
var lang_1 = require('../../../src/facade/lang');
var GoodbyeCmp = (function () {
    function GoodbyeCmp() {
        this.farewell = 'goodbye';
    }
    /** @nocollapse */
    GoodbyeCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'goodbye-cmp', template: "{{farewell}}" },] },
    ];
    /** @nocollapse */
    GoodbyeCmp.ctorParameters = [];
    return GoodbyeCmp;
}());
exports.GoodbyeCmp = GoodbyeCmp;
var HelloCmp = (function () {
    function HelloCmp() {
        this.greeting = 'hello';
    }
    /** @nocollapse */
    HelloCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'hello-cmp', template: "{{greeting}}" },] },
    ];
    /** @nocollapse */
    HelloCmp.ctorParameters = [];
    return HelloCmp;
}());
exports.HelloCmp = HelloCmp;
function helloCmpLoader() {
    return async_1.PromiseWrapper.resolve(HelloCmp);
}
exports.helloCmpLoader = helloCmpLoader;
var UserCmp = (function () {
    function UserCmp(params) {
        this.user = params.get('name');
    }
    /** @nocollapse */
    UserCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'user-cmp', template: "hello {{user}}" },] },
    ];
    /** @nocollapse */
    UserCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return UserCmp;
}());
exports.UserCmp = UserCmp;
function userCmpLoader() {
    return async_1.PromiseWrapper.resolve(UserCmp);
}
exports.userCmpLoader = userCmpLoader;
var ParentCmp = (function () {
    function ParentCmp() {
    }
    /** @nocollapse */
    ParentCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'parent-cmp',
                    template: "inner [ <router-outlet></router-outlet> ]",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES],
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[new router_deprecated_1.Route({ path: '/b', component: HelloCmp, name: 'Child' })],] },
    ];
    return ParentCmp;
}());
exports.ParentCmp = ParentCmp;
function parentCmpLoader() {
    return async_1.PromiseWrapper.resolve(ParentCmp);
}
exports.parentCmpLoader = parentCmpLoader;
var AsyncParentCmp = (function () {
    function AsyncParentCmp() {
    }
    /** @nocollapse */
    AsyncParentCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'parent-cmp',
                    template: "inner [ <router-outlet></router-outlet> ]",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES],
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[new router_deprecated_1.AsyncRoute({ path: '/b', loader: helloCmpLoader, name: 'Child' })],] },
    ];
    return AsyncParentCmp;
}());
exports.AsyncParentCmp = AsyncParentCmp;
function asyncParentCmpLoader() {
    return async_1.PromiseWrapper.resolve(AsyncParentCmp);
}
exports.asyncParentCmpLoader = asyncParentCmpLoader;
var AsyncDefaultParentCmp = (function () {
    function AsyncDefaultParentCmp() {
    }
    /** @nocollapse */
    AsyncDefaultParentCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'parent-cmp',
                    template: "inner [ <router-outlet></router-outlet> ]",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES],
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[new router_deprecated_1.AsyncRoute({ path: '/b', loader: helloCmpLoader, name: 'Child', useAsDefault: true })],] },
    ];
    return AsyncDefaultParentCmp;
}());
exports.AsyncDefaultParentCmp = AsyncDefaultParentCmp;
function asyncDefaultParentCmpLoader() {
    return async_1.PromiseWrapper.resolve(AsyncDefaultParentCmp);
}
exports.asyncDefaultParentCmpLoader = asyncDefaultParentCmpLoader;
var ParentWithDefaultCmp = (function () {
    function ParentWithDefaultCmp() {
    }
    /** @nocollapse */
    ParentWithDefaultCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'parent-cmp',
                    template: "inner [ <router-outlet></router-outlet> ]",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES],
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[new router_deprecated_1.Route({ path: '/b', component: HelloCmp, name: 'Child', useAsDefault: true })],] },
    ];
    return ParentWithDefaultCmp;
}());
exports.ParentWithDefaultCmp = ParentWithDefaultCmp;
function parentWithDefaultCmpLoader() {
    return async_1.PromiseWrapper.resolve(ParentWithDefaultCmp);
}
exports.parentWithDefaultCmpLoader = parentWithDefaultCmpLoader;
var TeamCmp = (function () {
    function TeamCmp(params) {
        this.id = params.get('id');
    }
    /** @nocollapse */
    TeamCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'team-cmp',
                    template: "team {{id}} | user [ <router-outlet></router-outlet> ]",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES],
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[new router_deprecated_1.Route({ path: '/user/:name', component: UserCmp, name: 'User' })],] },
    ];
    /** @nocollapse */
    TeamCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return TeamCmp;
}());
exports.TeamCmp = TeamCmp;
var AsyncTeamCmp = (function () {
    function AsyncTeamCmp(params) {
        this.id = params.get('id');
    }
    /** @nocollapse */
    AsyncTeamCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'team-cmp',
                    template: "team {{id}} | user [ <router-outlet></router-outlet> ]",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES],
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[new router_deprecated_1.AsyncRoute({ path: '/user/:name', loader: userCmpLoader, name: 'User' })],] },
    ];
    /** @nocollapse */
    AsyncTeamCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return AsyncTeamCmp;
}());
exports.AsyncTeamCmp = AsyncTeamCmp;
function asyncTeamLoader() {
    return async_1.PromiseWrapper.resolve(AsyncTeamCmp);
}
exports.asyncTeamLoader = asyncTeamLoader;
var RouteDataCmp = (function () {
    function RouteDataCmp(data) {
        this.myData = data.get('isAdmin');
    }
    /** @nocollapse */
    RouteDataCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'data-cmp', template: "{{myData}}" },] },
    ];
    /** @nocollapse */
    RouteDataCmp.ctorParameters = [
        { type: router_deprecated_1.RouteData, },
    ];
    return RouteDataCmp;
}());
exports.RouteDataCmp = RouteDataCmp;
function asyncRouteDataCmp() {
    return async_1.PromiseWrapper.resolve(RouteDataCmp);
}
exports.asyncRouteDataCmp = asyncRouteDataCmp;
var RedirectToParentCmp = (function () {
    function RedirectToParentCmp() {
    }
    /** @nocollapse */
    RedirectToParentCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'redirect-to-parent-cmp', template: 'redirect-to-parent' },] },
        { type: router_deprecated_1.RouteConfig, args: [[new router_deprecated_1.Redirect({ path: '/child-redirect', redirectTo: ['../HelloSib'] })],] },
    ];
    return RedirectToParentCmp;
}());
exports.RedirectToParentCmp = RedirectToParentCmp;
var DynamicLoaderCmp = (function () {
    function DynamicLoaderCmp(_dynamicComponentLoader) {
        this._dynamicComponentLoader = _dynamicComponentLoader;
        this._componentRef = null;
    }
    DynamicLoaderCmp.prototype.onSomeAction = function () {
        var _this = this;
        if (lang_1.isPresent(this._componentRef)) {
            this._componentRef.destroy();
            this._componentRef = null;
        }
        return this._dynamicComponentLoader
            .loadNextToLocation(DynamicallyLoadedComponent, this.viewport)
            .then(function (cmp) { _this._componentRef = cmp; });
    };
    /** @nocollapse */
    DynamicLoaderCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'dynamic-loader-cmp', template: "[ <div #viewport></div> ]" },] },
        { type: router_deprecated_1.RouteConfig, args: [[new router_deprecated_1.Route({ path: '/', component: HelloCmp })],] },
    ];
    /** @nocollapse */
    DynamicLoaderCmp.ctorParameters = [
        { type: dynamic_component_loader_1.DynamicComponentLoader, },
    ];
    /** @nocollapse */
    DynamicLoaderCmp.propDecorators = {
        'viewport': [{ type: core_1.ViewChild, args: ['viewport', { read: core_1.ViewContainerRef },] },],
    };
    return DynamicLoaderCmp;
}());
exports.DynamicLoaderCmp = DynamicLoaderCmp;
var DynamicallyLoadedComponent = (function () {
    function DynamicallyLoadedComponent() {
    }
    /** @nocollapse */
    DynamicallyLoadedComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'loaded-cmp',
                    template: '<router-outlet></router-outlet>',
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES]
                },] },
    ];
    return DynamicallyLoadedComponent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml4dHVyZV9jb21wb25lbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9yb3V0ZXItZGVwcmVjYXRlZC90ZXN0L2ludGVncmF0aW9uL2ltcGwvZml4dHVyZV9jb21wb25lbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBbUUsZUFBZSxDQUFDLENBQUE7QUFDbkYseUNBQXFDLG1EQUFtRCxDQUFDLENBQUE7QUFDekYsa0NBQWtHLDRCQUE0QixDQUFDLENBQUE7QUFFL0gsc0JBQTZCLDJCQUEyQixDQUFDLENBQUE7QUFDekQscUJBQXdCLDBCQUEwQixDQUFDLENBQUE7QUFDbkQ7SUFFRTtRQUFnQixJQUFJLENBQUMsUUFBUSxHQUFHLFNBQVMsQ0FBQztJQUFDLENBQUM7SUFDOUMsa0JBQWtCO0lBQ1gscUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQyxFQUFHLEVBQUU7S0FDakYsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHlCQUFjLEdBQTJELEVBQy9FLENBQUM7SUFDRixpQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksa0JBQVUsYUFVdEIsQ0FBQTtBQUNEO0lBRUU7UUFBZ0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7SUFBQyxDQUFDO0lBQzVDLGtCQUFrQjtJQUNYLG1CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUMsRUFBRyxFQUFFO0tBQy9FLENBQUM7SUFDRixrQkFBa0I7SUFDWCx1QkFBYyxHQUEyRCxFQUMvRSxDQUFDO0lBQ0YsZUFB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