/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_private_1 = require('../../core_private');
var route_config_impl_1 = require('./route_config_impl');
var route_config_impl_2 = require('./route_config_impl');
exports.AsyncRoute = route_config_impl_2.AsyncRoute;
exports.AuxRoute = route_config_impl_2.AuxRoute;
exports.Redirect = route_config_impl_2.Redirect;
exports.Route = route_config_impl_2.Route;
// Copied from RouteConfig in route_config_impl.
/**
 * The `RouteConfig` decorator defines routes for a given component.
 *
 * It takes an array of {@link RouteDefinition}s.
 * @Annotation
 */
exports.RouteConfig = core_private_1.makeDecorator(route_config_impl_1.RouteConfig);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVfY29uZmlnX2RlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyLWRlcHJlY2F0ZWQvc3JjL3JvdXRlX2NvbmZpZy9yb3V0ZV9jb25maWdfZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCw2QkFBNEIsb0JBQW9CLENBQUMsQ0FBQTtBQUVqRCxrQ0FBb0UscUJBQXFCLENBQUMsQ0FBQTtBQUUxRixrQ0FBcUUscUJBQXFCLENBQUM7QUFBbkYsb0RBQVU7QUFBRSxnREFBUTtBQUFFLGdEQUFRO0FBQUUsMENBQW1EO0FBRzNGLGdEQUFnRDtBQUNoRDs7Ozs7R0FLRztBQUNRLG1CQUFXLEdBQ2xCLDRCQUFhLENBQUMsK0JBQXFCLENBQUMsQ0FBQyJ9