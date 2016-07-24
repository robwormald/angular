/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var async_1 = require('../../facade/async');
var lang_1 = require('../../facade/lang');
var instruction_1 = require('../../instruction');
var SyncRouteHandler = (function () {
    function SyncRouteHandler(componentType, data) {
        this.componentType = componentType;
        /** @internal */
        this._resolvedComponent = null;
        this._resolvedComponent = async_1.PromiseWrapper.resolve(componentType);
        this.data = lang_1.isPresent(data) ? new instruction_1.RouteData(data) : instruction_1.BLANK_ROUTE_DATA;
    }
    SyncRouteHandler.prototype.resolveComponentType = function () { return this._resolvedComponent; };
    return SyncRouteHandler;
}());
exports.SyncRouteHandler = SyncRouteHandler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY19yb3V0ZV9oYW5kbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9yb3V0ZXItZGVwcmVjYXRlZC9zcmMvcnVsZXMvcm91dGVfaGFuZGxlcnMvc3luY19yb3V0ZV9oYW5kbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxzQkFBNkIsb0JBQW9CLENBQUMsQ0FBQTtBQUNsRCxxQkFBOEIsbUJBQW1CLENBQUMsQ0FBQTtBQUNsRCw0QkFBMEMsbUJBQW1CLENBQUMsQ0FBQTtBQUs5RDtJQU1FLDBCQUFtQixhQUFtQixFQUFFLElBQTJCO1FBQWhELGtCQUFhLEdBQWIsYUFBYSxDQUFNO1FBSHRDLGdCQUFnQjtRQUNoQix1QkFBa0IsR0FBaUIsSUFBSSxDQUFDO1FBR3RDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRSxJQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSx1QkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLDhCQUFnQixDQUFDO0lBQ3ZFLENBQUM7SUFFRCwrQ0FBb0IsR0FBcEIsY0FBdUMsTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7SUFDMUUsdUJBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLHdCQUFnQixtQkFZNUIsQ0FBQSJ9