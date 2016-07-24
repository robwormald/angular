/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/* @ts2dart_const */
var RouteLifecycleHook = (function () {
    function RouteLifecycleHook(name) {
        this.name = name;
    }
    return RouteLifecycleHook;
}());
exports.RouteLifecycleHook = RouteLifecycleHook;
/* @ts2dart_const */
var CanActivate = (function () {
    function CanActivate(fn) {
        this.fn = fn;
    }
    return CanActivate;
}());
exports.CanActivate = CanActivate;
exports.routerCanReuse = 
/*@ts2dart_const*/ new RouteLifecycleHook('routerCanReuse');
exports.routerCanDeactivate = 
/*@ts2dart_const*/ new RouteLifecycleHook('routerCanDeactivate');
exports.routerOnActivate = 
/*@ts2dart_const*/ new RouteLifecycleHook('routerOnActivate');
exports.routerOnReuse = 
/*@ts2dart_const*/ new RouteLifecycleHook('routerOnReuse');
exports.routerOnDeactivate = 
/*@ts2dart_const*/ new RouteLifecycleHook('routerOnDeactivate');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlmZWN5Y2xlX2Fubm90YXRpb25zX2ltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci1kZXByZWNhdGVkL3NyYy9saWZlY3ljbGUvbGlmZWN5Y2xlX2Fubm90YXRpb25zX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUdILG9CQUFvQjtBQUNwQjtJQUNFLDRCQUFtQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtJQUFHLENBQUM7SUFDckMseUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLDBCQUFrQixxQkFFOUIsQ0FBQTtBQUVELG9CQUFvQjtBQUNwQjtJQUNFLHFCQUFtQixFQUFZO1FBQVosT0FBRSxHQUFGLEVBQUUsQ0FBVTtJQUFHLENBQUM7SUFDckMsa0JBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLG1CQUFXLGNBRXZCLENBQUE7QUFFWSxzQkFBYztBQUN2QixrQkFBa0IsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDbkQsMkJBQW1CO0FBQzVCLGtCQUFrQixDQUFDLElBQUksa0JBQWtCLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUN4RCx3QkFBZ0I7QUFDekIsa0JBQWtCLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3JELHFCQUFhO0FBQ3RCLGtCQUFrQixDQUFDLElBQUksa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDbEQsMEJBQWtCO0FBQzNCLGtCQUFrQixDQUFDLElBQUksa0JBQWtCLENBQUMsb0JBQW9CLENBQUMsQ0FBQyJ9