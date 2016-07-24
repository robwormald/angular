/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BehaviorSubject_1 = require('rxjs/BehaviorSubject');
var shared_1 = require('./shared');
var url_tree_1 = require('./url_tree');
var collection_1 = require('./utils/collection');
var tree_1 = require('./utils/tree');
/**
 * The state of the router.
 *
 * ### Usage
 *
 * ```
 * class MyComponent {
 *   constructor(router: Router) {
 *     const state = router.routerState;
 *     const id: Observable<string> = state.firstChild(state.root).params.map(p => p.id);
 *     const isDebug: Observable<string> = state.queryParams.map(q => q.debug);
 *   }
 * }
 * ```
 *
 * @stable
 */
var RouterState = (function (_super) {
    __extends(RouterState, _super);
    /**
     * @internal
     */
    function RouterState(root, queryParams, fragment, snapshot) {
        _super.call(this, root);
        this.queryParams = queryParams;
        this.fragment = fragment;
        this.snapshot = snapshot;
    }
    RouterState.prototype.toString = function () { return this.snapshot.toString(); };
    return RouterState;
}(tree_1.Tree));
exports.RouterState = RouterState;
function createEmptyState(urlTree, rootComponent) {
    var snapshot = createEmptyStateSnapshot(urlTree, rootComponent);
    var emptyUrl = new BehaviorSubject_1.BehaviorSubject([new url_tree_1.UrlPathWithParams('', {})]);
    var emptyParams = new BehaviorSubject_1.BehaviorSubject({});
    var emptyData = new BehaviorSubject_1.BehaviorSubject({});
    var emptyQueryParams = new BehaviorSubject_1.BehaviorSubject({});
    var fragment = new BehaviorSubject_1.BehaviorSubject('');
    var activated = new ActivatedRoute(emptyUrl, emptyParams, emptyData, shared_1.PRIMARY_OUTLET, rootComponent, snapshot.root);
    activated.snapshot = snapshot.root;
    return new RouterState(new tree_1.TreeNode(activated, []), emptyQueryParams, fragment, snapshot);
}
exports.createEmptyState = createEmptyState;
function createEmptyStateSnapshot(urlTree, rootComponent) {
    var emptyParams = {};
    var emptyData = {};
    var emptyQueryParams = {};
    var fragment = '';
    var activated = new ActivatedRouteSnapshot([], emptyParams, emptyData, shared_1.PRIMARY_OUTLET, rootComponent, null, urlTree.root, -1, InheritedResolve.empty);
    return new RouterStateSnapshot('', new tree_1.TreeNode(activated, []), emptyQueryParams, fragment);
}
/**
 * Contains the information about a component loaded in an outlet. The information is provided
 * through the params, urlSegments, and data observables.
 *
 * ### Usage
 *
 * ```
 * class MyComponent {
 *   constructor(route: ActivatedRoute) {
 *     const id: Observable<string> = route.params.map(p => p.id);
 *     const data = route.data.map(d => d.user); //includes `data` and `resolve`
 *   }
 * }
 * ```
 *
 * @stable
 */
var ActivatedRoute = (function () {
    /**
     * @internal
     */
    function ActivatedRoute(url, params, data, outlet, component, futureSnapshot) {
        this.url = url;
        this.params = params;
        this.data = data;
        this.outlet = outlet;
        this.component = component;
        this._futureSnapshot = futureSnapshot;
    }
    ActivatedRoute.prototype.toString = function () {
        return this.snapshot ? this.snapshot.toString() : "Future(" + this._futureSnapshot + ")";
    };
    return ActivatedRoute;
}());
exports.ActivatedRoute = ActivatedRoute;
/**
 * @internal
 */
var InheritedResolve = (function () {
    function InheritedResolve(parent, current) {
        this.parent = parent;
        this.current = current;
        /**
         * @internal
         */
        this.resolvedData = {};
    }
    Object.defineProperty(InheritedResolve.prototype, "flattenedResolvedData", {
        /**
         * @internal
         */
        get: function () {
            return this.parent ? collection_1.merge(this.parent.flattenedResolvedData, this.resolvedData) :
                this.resolvedData;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InheritedResolve, "empty", {
        get: function () { return new InheritedResolve(null, {}); },
        enumerable: true,
        configurable: true
    });
    return InheritedResolve;
}());
exports.InheritedResolve = InheritedResolve;
/**
 * Contains the information about a component loaded in an outlet at a particular moment in time.
 *
 * ### Usage
 *
 * ```
 * class MyComponent {
 *   constructor(route: ActivatedRoute) {
 *     const id: string = route.snapshot.params.id;
 *     const data = route.snapshot.data;
 *   }
 * }
 * ```
 *
 * @stable
 */
var ActivatedRouteSnapshot = (function () {
    /**
     * @internal
     */
    function ActivatedRouteSnapshot(url, params, data, outlet, component, routeConfig, urlSegment, lastPathIndex, resolve) {
        this.url = url;
        this.params = params;
        this.data = data;
        this.outlet = outlet;
        this.component = component;
        this._routeConfig = routeConfig;
        this._urlSegment = urlSegment;
        this._lastPathIndex = lastPathIndex;
        this._resolve = resolve;
    }
    ActivatedRouteSnapshot.prototype.toString = function () {
        var url = this.url.map(function (s) { return s.toString(); }).join('/');
        var matched = this._routeConfig ? this._routeConfig.path : '';
        return "Route(url:'" + url + "', path:'" + matched + "')";
    };
    return ActivatedRouteSnapshot;
}());
exports.ActivatedRouteSnapshot = ActivatedRouteSnapshot;
/**
 * The state of the router at a particular moment in time.
 *
 * ### Usage
 *
 * ```
 * class MyComponent {
 *   constructor(router: Router) {
 *     const snapshot = router.routerState.snapshot;
 *   }
 * }
 * ```
 *
 * @stable
 */
var RouterStateSnapshot = (function (_super) {
    __extends(RouterStateSnapshot, _super);
    /**
     * @internal
     */
    function RouterStateSnapshot(url, root, queryParams, fragment) {
        _super.call(this, root);
        this.url = url;
        this.queryParams = queryParams;
        this.fragment = fragment;
    }
    RouterStateSnapshot.prototype.toString = function () { return serializeNode(this._root); };
    return RouterStateSnapshot;
}(tree_1.Tree));
exports.RouterStateSnapshot = RouterStateSnapshot;
function serializeNode(node) {
    var c = node.children.length > 0 ? " { " + node.children.map(serializeNode).join(", ") + " } " : '';
    return "" + node.value + c;
}
/**
 * The expectation is that the activate route is created with the right set of parameters.
 * So we push new values into the observables only when they are not the initial values.
 * And we detect that by checking if the snapshot field is set.
 */
function advanceActivatedRoute(route) {
    if (route.snapshot) {
        if (!collection_1.shallowEqual(route.snapshot.params, route._futureSnapshot.params)) {
            route.params.next(route._futureSnapshot.params);
            route.data.next(route._futureSnapshot.data);
        }
        if (!collection_1.shallowEqualArrays(route.snapshot.url, route._futureSnapshot.url)) {
            route.url.next(route._futureSnapshot.url);
        }
        route.snapshot = route._futureSnapshot;
    }
    else {
        route.snapshot = route._futureSnapshot;
        route.data.next(route._futureSnapshot.data);
    }
}
exports.advanceActivatedRoute = advanceActivatedRoute;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3N0YXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9yb3V0ZXIvc3JjL3JvdXRlcl9zdGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFHSCxnQ0FBOEIsc0JBQXNCLENBQUMsQ0FBQTtBQUlyRCx1QkFBcUMsVUFBVSxDQUFDLENBQUE7QUFDaEQseUJBQXFELFlBQVksQ0FBQyxDQUFBO0FBQ2xFLDJCQUFzRCxvQkFBb0IsQ0FBQyxDQUFBO0FBQzNFLHFCQUE2QixjQUFjLENBQUMsQ0FBQTtBQUc1Qzs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNIO0lBQWlDLCtCQUFvQjtJQUNuRDs7T0FFRztJQUNILHFCQUNJLElBQThCLEVBQVMsV0FBK0IsRUFDL0QsUUFBNEIsRUFBUyxRQUE2QjtRQUMzRSxrQkFBTSxJQUFJLENBQUMsQ0FBQztRQUY2QixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0QsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFxQjtJQUU3RSxDQUFDO0lBRUQsOEJBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDekQsa0JBQUM7QUFBRCxDQUFDLEFBWEQsQ0FBaUMsV0FBSSxHQVdwQztBQVhZLG1CQUFXLGNBV3ZCLENBQUE7QUFFRCwwQkFBaUMsT0FBZ0IsRUFBRSxhQUFtQjtJQUNwRSxJQUFNLFFBQVEsR0FBRyx3QkFBd0IsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDbEUsSUFBTSxRQUFRLEdBQUcsSUFBSSxpQ0FBZSxDQUFDLENBQUMsSUFBSSw0QkFBaUIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLElBQU0sV0FBVyxHQUFHLElBQUksaUNBQWUsQ0FB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