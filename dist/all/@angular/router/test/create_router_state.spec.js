/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var create_router_state_1 = require('../src/create_router_state');
var recognize_1 = require('../src/recognize');
var router_state_1 = require('../src/router_state');
var shared_1 = require('../src/shared');
var url_tree_1 = require('../src/url_tree');
describe('create router state', function () {
    var emptyState = function () {
        return router_state_1.createEmptyState(new url_tree_1.UrlTree(new url_tree_1.UrlSegment([], {}), {}, null), RootComponent);
    };
    it('should work create new state', function () {
        var state = create_router_state_1.createRouterState(createState([
            { path: 'a', component: ComponentA },
            { path: 'b', component: ComponentB, outlet: 'left' },
            { path: 'c', component: ComponentC, outlet: 'right' }
        ], 'a(left:b//right:c)'), emptyState());
        checkActivatedRoute(state.root, RootComponent);
        var c = state.children(state.root);
        checkActivatedRoute(c[0], ComponentA);
        checkActivatedRoute(c[1], ComponentB, 'left');
        checkActivatedRoute(c[2], ComponentC, 'right');
    });
    it('should reuse existing nodes when it can', function () {
        var config = [
            { path: 'a', component: ComponentA }, { path: 'b', component: ComponentB, outlet: 'left' },
            { path: 'c', component: ComponentC, outlet: 'left' }
        ];
        var prevState = create_router_state_1.createRouterState(createState(config, 'a(left:b)'), emptyState());
        advanceState(prevState);
        var state = create_router_state_1.createRouterState(createState(config, 'a(left:c)'), prevState);
        expect(prevState.root).toBe(state.root);
        var prevC = prevState.children(prevState.root);
        var currC = state.children(state.root);
        expect(prevC[0]).toBe(currC[0]);
        expect(prevC[1]).not.toBe(currC[1]);
        checkActivatedRoute(currC[1], ComponentC, 'left');
    });
    it('should handle componentless routes', function () {
        var config = [{
                path: 'a/:id',
                children: [
                    { path: 'b', component: ComponentA }, { path: 'c', component: ComponentB, outlet: 'right' }
                ]
            }];
        var prevState = create_router_state_1.createRouterState(createState(config, 'a/1;p=11/(b//right:c)'), emptyState());
        advanceState(prevState);
        var state = create_router_state_1.createRouterState(createState(config, 'a/2;p=22/(b//right:c)'), prevState);
        expect(prevState.root).toBe(state.root);
        var prevP = prevState.firstChild(prevState.root);
        var currP = state.firstChild(state.root);
        expect(prevP).toBe(currP);
        var prevC = prevState.children(prevP);
        var currC = state.children(currP);
        expect(currP._futureSnapshot.params).toEqual({ id: '2', p: '22' });
        checkActivatedRoute(currC[0], ComponentA);
        checkActivatedRoute(currC[1], ComponentB, 'right');
    });
});
function advanceState(state) {
    advanceNode(state._root);
}
function advanceNode(node) {
    router_state_1.advanceActivatedRoute(node.value);
    node.children.forEach(advanceNode);
}
function createState(config, url) {
    var res;
    recognize_1.recognize(RootComponent, config, tree(url), url).forEach(function (s) { return res = s; });
    return res;
}
function checkActivatedRoute(actual, cmp, outlet) {
    if (outlet === void 0) { outlet = shared_1.PRIMARY_OUTLET; }
    if (actual === null) {
        expect(actual).toBeDefined();
    }
    else {
        expect(actual.component).toBe(cmp);
        expect(actual.outlet).toEqual(outlet);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX3JvdXRlcl9zdGF0ZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9yb3V0ZXIvdGVzdC9jcmVhdGVfcm91dGVyX3N0YXRlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUdILG9DQUFnQyw0QkFBNEIsQ0FBQyxDQUFBO0FBQzdELDBCQUF3QixrQkFBa0IsQ0FBQyxDQUFBO0FBQzNDLDZCQUF3RyxxQkFBcUIsQ0FBQyxDQUFBO0FBQzlILHVCQUFxQyxlQUFlLENBQUMsQ0FBQTtBQUNyRCx5QkFBd0QsaUJBQWlCLENBQUMsQ0FBQTtBQUcxRSxRQUFRLENBQUMscUJBQXFCLEVBQUU7SUFDOUIsSUFBTSxVQUFVLEdBQUc7UUFDZixPQUFBLCtCQUFnQixDQUFDLElBQUksa0JBQU8sQ0FBQyxJQUFJLHFCQUFVLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRSxhQUFhLENBQUM7SUFBOUUsQ0FBOEUsQ0FBQztJQUVuRixFQUFFLENBQUMsOEJBQThCLEVBQUU7UUFDakMsSUFBTSxLQUFLLEdBQUcsdUNBQWlCLENBQzNCLFdBQVcsQ0FDUDtZQUNFLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFDO1lBQ2xDLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUM7WUFDbEQsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQztTQUNwRCxFQUNELG9CQUFvQixDQUFDLEVBQ3pCLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFFbEIsbUJBQW1CLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsQ0FBQztRQUUvQyxJQUFNLENBQUMs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