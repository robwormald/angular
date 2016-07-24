/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ViewContainerRef } from '@angular/core';
import { DynamicComponentLoader } from '@angular/core/src/linker/dynamic_component_loader';
import { RouteData, RouteParams } from '@angular/router-deprecated';
export declare class GoodbyeCmp {
    farewell: string;
    constructor();
}
export declare class HelloCmp {
    greeting: string;
    constructor();
}
export declare function helloCmpLoader(): Promise<typeof HelloCmp>;
export declare class UserCmp {
    user: string;
    constructor(params: RouteParams);
}
export declare function userCmpLoader(): Promise<typeof UserCmp>;
export declare class ParentCmp {
}
export declare function parentCmpLoader(): Promise<typeof ParentCmp>;
export declare class AsyncParentCmp {
}
export declare function asyncParentCmpLoader(): Promise<typeof AsyncParentCmp>;
export declare class AsyncDefaultParentCmp {
}
export declare function asyncDefaultParentCmpLoader(): Promise<typeof AsyncDefaultParentCmp>;
export declare class ParentWithDefaultCmp {
}
export declare function parentWithDefaultCmpLoader(): Promise<typeof ParentWithDefaultCmp>;
export declare class TeamCmp {
    id: string;
    constructor(params: RouteParams);
}
export declare class AsyncTeamCmp {
    id: string;
    constructor(params: RouteParams);
}
export declare function asyncTeamLoader(): Promise<typeof AsyncTeamCmp>;
export declare class RouteDataCmp {
    myData: boolean;
    constructor(data: RouteData);
}
export declare function asyncRouteDataCmp(): Promise<typeof RouteDataCmp>;
export declare class RedirectToParentCmp {
}
export declare class DynamicLoaderCmp {
    private _dynamicComponentLoader;
    private _componentRef;
    viewport: ViewContainerRef;
    constructor(_dynamicComponentLoader: DynamicComponentLoader);
    onSomeAction(): Promise<any>;
}
