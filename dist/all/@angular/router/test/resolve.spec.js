/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var recognize_1 = require('../src/recognize');
var resolve_1 = require('../src/resolve');
var url_tree_1 = require('../src/url_tree');
describe('resolve', function () {
    it('should resolve components', function () {
        checkResolve([{ path: 'a', component: 'ComponentA' }], 'a', { ComponentA: 'ResolvedComponentA' }, function (resolved) {
            expect(resolved.firstChild(resolved.root)._resolvedComponentFactory)
                .toEqual('ResolvedComponentA');
        });
    });
    it('should not resolve componentless routes', function () {
        checkResolve([{ path: 'a', children: [] }], 'a', {}, function (resolved) {
            expect(resolved.firstChild(resolved.root)._resolvedComponentFactory).toEqual(null);
        });
    });
});
function checkResolve(config, url, resolved, callback) {
    var resolver = {
        resolveComponent: function (component) {
            if (resolved[component]) {
                return Promise.resolve(resolved[component]);
            }
            else {
                return Promise.reject('unknown component');
            }
        }
    };
    recognize_1.recognize(RootComponent, config, tree(url), url)
        .mergeMap(function (s) { return resolve_1.resolve(resolver, s); })
        .subscribe(callback, function (e) { throw e; });
}
function tree(url) {
    return new url_tree_1.DefaultUrlSerializer().parse(url);
}
var RootComponent = (function () {
    function RootComponent() {
    }
    return RootComponent;
}());
var ComponentA = (function () {
    function ComponentA() {
    }
    return ComponentA;
}());
var ComponentB = (function () {
    function ComponentB() {
    }
    return ComponentB;
}());
var ComponentC = (function () {
    function ComponentC() {
    }
    return ComponentC;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzb2x2ZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9yb3V0ZXIvdGVzdC9yZXNvbHZlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUdILDBCQUF3QixrQkFBa0IsQ0FBQyxDQUFBO0FBQzNDLHdCQUFzQixnQkFBZ0IsQ0FBQyxDQUFBO0FBRXZDLHlCQUF3RCxpQkFBaUIsQ0FBQyxDQUFBO0FBRTFFLFFBQVEsQ0FBQyxTQUFTLEVBQUU7SUFDbEIsRUFBRSxDQUFDLDJCQUEyQixFQUFFO1FBQzlCLFlBQVksQ0FDUixDQUFDLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsRUFBQyxVQUFVLEVBQUUsb0JBQW9CLEVBQUMsRUFDL0UsVUFBQyxRQUE2QjtZQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMseUJBQXlCLENBQUM7aUJBQy9ELE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMseUNBQXlDLEVBQUU7UUFDNUMsWUFBWSxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsVUFBQyxRQUE2QjtZQUMvRSxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDckYsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDO0FBRUgsc0JBQ0ksTUFBYyxFQUFFLEdBQVcsRUFBRSxRQUErQixFQUFFLFFBQWE7SUFDN0UsSUFBTSxRQUFRLEdBQUc7UUFDZixnQkFBZ0IsRUFBRSxVQUFDLFNBQWlCO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzlDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQzdDLENBQUM7UUFDSCxDQUFDO0tBQ0YsQ0FBQztJQUVGLHFCQUFTLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDO1NBQzNDLFFBQVEsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLGlCQUFPLENBQU0sUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUF6QixDQUF5QixDQUFDO1NBQ3hDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsVUFBQSxDQUFDLElBQU0sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRUQsY0FBYyxHQUFXO0lBQ3ZCLE1BQU0sQ0FBQyxJQUFJLCtCQUFvQixFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9DLENBQUM7QUFFRDtJQUFBO0lBQXFCLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFBdEIsSUFBc0I7QUFDdEI7SUFBQTtJQUFrQixDQUFDO0lBQUQsaUJBQUM7QUFBRCxDQUFDLEFBQW5CLElBQW1CO0FBQ25CO0lBQUE7SUFBa0IsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FBQyxBQUFuQixJQUFtQjtBQUNuQjtJQUFBO0lBQWtCLENBQUM7SUFBRCxpQkFBQztBQUFELENBQUMsQUFBbkIsSUFBbUIifQ==