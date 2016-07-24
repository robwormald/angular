/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentFactory, Type } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Data, ResolveData, Route } from './config';
import { Params } from './shared';
import { UrlPathWithParams, UrlSegment, UrlTree } from './url_tree';
import { Tree, TreeNode } from './utils/tree';
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
export declare class RouterState extends Tree<ActivatedRoute> {
    queryParams: Observable<Params>;
    fragment: Observable<string>;
    snapshot: RouterStateSnapshot;
    /**
     * @internal
     */
    constructor(root: TreeNode<ActivatedRoute>, queryParams: Observable<Params>, fragment: Observable<string>, snapshot: RouterStateSnapshot);
    toString(): string;
}
export declare function createEmptyState(urlTree: UrlTree, rootComponent: Type): RouterState;
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
export declare class ActivatedRoute {
    url: Observable<UrlPathWithParams[]>;
    params: Observable<Params>;
    data: Observable<Data>;
    outlet: string;
    component: Type | string;
    /** @internal */
    _futureSnapshot: ActivatedRouteSnapshot;
    snapshot: ActivatedRouteSnapshot;
    /**
     * @internal
     */
    constructor(url: Observable<UrlPathWithParams[]>, params: Observable<Params>, data: Observable<Data>, outlet: string, component: Type | string, futureSnapshot: ActivatedRouteSnapshot);
    toString(): string;
}
/**
 * @internal
 */
export declare class InheritedResolve {
    parent: InheritedResolve;
    current: ResolveData;
    /**
     * @internal
     */
    resolvedData: {};
    constructor(parent: InheritedResolve, current: ResolveData);
    /**
     * @internal
     */
    readonly flattenedResolvedData: Data;
    static readonly empty: InheritedResolve;
}
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
export declare class ActivatedRouteSnapshot {
    url: UrlPathWithParams[];
    params: Params;
    data: Data;
    outlet: string;
    component: Type | string;
    /**
     * @internal
     */
    _resolvedComponentFactory: ComponentFactory<any>;
    /** @internal **/
    _routeConfig: Route;
    /** @internal **/
    _urlSegment: UrlSegment;
    /** @internal */
    _lastPathIndex: number;
    /** @internal */
    _resolve: InheritedResolve;
    /**
     * @internal
     */
    constructor(url: UrlPathWithParams[], params: Params, data: Data, outlet: string, component: Type | string, routeConfig: Route, urlSegment: UrlSegment, lastPathIndex: number, resolve: InheritedResolve);
    toString(): string;
}
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
export declare class RouterStateSnapshot extends Tree<ActivatedRouteSnapshot> {
    url: string;
    queryParams: Params;
    fragment: string;
    /**
     * @internal
     */
    constructor(url: string, root: TreeNode<ActivatedRouteSnapshot>, queryParams: Params, fragment: string);
    toString(): string;
}
/**
 * The expectation is that the activate route is created with the right set of parameters.
 * So we push new values into the observables only when they are not the initial values.
 * And we detect that by checking if the snapshot field is set.
 */
export declare function advanceActivatedRoute(route: ActivatedRoute): void;
