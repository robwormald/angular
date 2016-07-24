/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var forkJoin_1 = require('rxjs/observable/forkJoin');
var fromPromise_1 = require('rxjs/observable/fromPromise');
function resolve(resolver, state) {
    return resolveNode(resolver, state._root).map(function (_) { return state; });
}
exports.resolve = resolve;
function resolveNode(resolver, node) {
    if (node.children.length === 0) {
        return fromPromise_1.fromPromise(resolveComponent(resolver, node.value).then(function (factory) {
            node.value._resolvedComponentFactory = factory;
            return node.value;
        }));
    }
    else {
        var c = node.children.map(function (c) { return resolveNode(resolver, c).toPromise(); });
        return forkJoin_1.forkJoin(c).map(function (_) { return resolveComponent(resolver, node.value).then(function (factory) {
            node.value._resolvedComponentFactory = factory;
            return node.value;
        }); });
    }
}
function resolveComponent(resolver, snapshot) {
    if (snapshot.component && snapshot._routeConfig && typeof snapshot.component === 'string') {
        return resolver.resolveComponent(snapshot.component);
    }
    else {
        return Promise.resolve(null);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyL3NyYy9yZXNvbHZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxRQUFPLHVCQUF1QixDQUFDLENBQUE7QUFDL0IsUUFBTyw2QkFBNkIsQ0FBQyxDQUFBO0FBSXJDLHlCQUF1QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ2xELDRCQUEwQiw2QkFBNkIsQ0FBQyxDQUFBO0FBS3hELGlCQUNJLFFBQTJCLEVBQUUsS0FBMEI7SUFDekQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUssRUFBTCxDQUFLLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBSGUsZUFBTyxVQUd0QixDQUFBO0FBRUQscUJBQ0ksUUFBMkIsRUFBRSxJQUFzQztJQUNyRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyx5QkFBVyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTztZQUN6RSxJQUFJLENBQUMsS0FBSyxDQUFDLHlCQUF5QixHQUFHLE9BQU8sQ0FBQztZQUMvQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRU4sQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sSUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFwQyxDQUFvQyxDQUFDLENBQUM7UUFDdkUsTUFBTSxDQUFDLG1CQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsZ0JBQWdCLENBQUMsUUFBUSxFQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxPQUFPO1lBQ2xGLElBQUksQ0FBQyxLQUFLLENBQUMseUJBQXlCLEdBQUcsT0FBTyxDQUFDO1lBQy9DLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxFQUgwQixDQUcxQixDQUFDLENBQUM7SUFDTixDQUFDO0FBQ0gsQ0FBQztBQUVELDBCQUNJLFFBQTJCLEVBQUUsUUFBZ0M7SUFDL0QsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsSUFBSSxRQUFRLENBQUMsWUFBWSxJQUFJLE9BQU8sUUFBUSxDQUFDLFNBQVMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzFGLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQU0sUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7QUFDSCxDQUFDIn0=