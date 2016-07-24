/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var testing_1 = require('@angular/common/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var async_1 = require('../src/facade/async');
var collection_1 = require('../src/facade/collection');
var route_config_decorator_1 = require('../src/route_config/route_config_decorator');
var route_registry_1 = require('../src/route_registry');
var router_1 = require('../src/router');
var spies_1 = require('./spies');
function main() {
    testing_internal_1.describe('Router', function () {
        var router;
        var location;
        testing_internal_1.beforeEachProviders(function () {
            return [route_registry_1.RouteRegistry, { provide: common_1.Location, useClass: testing_1.SpyLocation },
                { provide: route_registry_1.ROUTER_PRIMARY_COMPONENT, useValue: AppCmp },
                { provide: router_1.Router, useClass: router_1.RootRouter }];
        });
        testing_internal_1.beforeEach(testing_internal_1.inject([router_1.Router, common_1.Location], function (rtr, loc) {
            router = rtr;
            location = loc;
        }));
        testing_internal_1.it('should navigate based on the initial URL state', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.config([new route_config_decorator_1.Route({ path: '/', component: DummyComponent })])
                .then(function (_) { return router.registerPrimaryOutlet(outlet); })
                .then(function (_) {
                testing_internal_1.expect(outlet.spy('activate')).toHaveBeenCalled();
                testing_internal_1.expect(location.urlChanges).toEqual([]);
                async.done();
            });
        }));
        testing_internal_1.it('should activate viewports and update URL on navigate', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.registerPrimaryOutlet(outlet)
                .then(function (_) { return router.config([new route_config_decorator_1.Route({ path: '/a', component: DummyComponent })]); })
                .then(function (_) { return router.navigateByUrl('/a'); })
                .then(function (_) {
                testing_internal_1.expect(outlet.spy('activate')).toHaveBeenCalled();
                testing_internal_1.expect(location.urlChanges).toEqual(['/a']);
                async.done();
            });
        }));
        testing_internal_1.it('should activate viewports and update URL when navigating via DSL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.registerPrimaryOutlet(outlet)
                .then(function (_) {
                return router.config([new route_config_decorator_1.Route({ path: '/a', component: DummyComponent, name: 'A' })]);
            })
                .then(function (_) { return router.navigate(['/A']); })
                .then(function (_) {
                testing_internal_1.expect(outlet.spy('activate')).toHaveBeenCalled();
                testing_internal_1.expect(location.urlChanges).toEqual(['/a']);
                async.done();
            });
        }));
        testing_internal_1.it('should not push a history change on when navigate is called with skipUrlChange', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.registerPrimaryOutlet(outlet)
                .then(function (_) { return router.config([new route_config_decorator_1.Route({ path: '/b', component: DummyComponent })]); })
                .then(function (_) { return router.navigateByUrl('/b', true); })
                .then(function (_) {
                testing_internal_1.expect(outlet.spy('activate')).toHaveBeenCalled();
                testing_internal_1.expect(location.urlChanges).toEqual([]);
                async.done();
            });
        }));
        // See https://github.com/angular/angular/issues/5590
        // This test is disabled because it is flaky.
        // TODO: bford. make this test not flaky and reenable it.
        testing_internal_1.xit('should replace history when triggered by a hashchange with a redirect', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.registerPrimaryOutlet(outlet)
                .then(function (_) { return router.config([
                new route_config_decorator_1.Redirect({ path: '/a', redirectTo: ['B'] }),
                new route_config_decorator_1.Route({ path: '/b', component: DummyComponent, name: 'B' })
            ]); })
                .then(function (_) {
                router.subscribe(function (_) {
                    testing_internal_1.expect(location.urlChanges).toEqual(['hash: a', 'replace: /b']);
                    async.done();
                });
                location.simulateHashChange('a');
            });
        }));
        testing_internal_1.it('should push history when triggered by a hashchange without a redirect', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.registerPrimaryOutlet(outlet)
                .then(function (_) { return router.config([new route_config_decorator_1.Route({ path: '/a', component: DummyComponent })]); })
                .then(function (_) {
                router.subscribe(function (_) {
                    testing_internal_1.expect(location.urlChanges).toEqual(['hash: a']);
                    async.done();
                });
                location.simulateHashChange('a');
            });
        }));
        testing_internal_1.it('should pass an object containing the component instruction to the router change subscription after a successful navigation', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.registerPrimaryOutlet(outlet)
                .then(function (_) { return router.config([new route_config_decorator_1.Route({ path: '/a', component: DummyComponent })]); })
                .then(function (_) {
                router.subscribe(function (_a) {
                    var status = _a.status, instruction = _a.instruction;
                    testing_internal_1.expect(status).toEqual('success');
                    testing_internal_1.expect(instruction)
                        .toEqual(jasmine.objectContaining({ urlPath: 'a', urlParams: [] }));
                    async.done();
                });
                location.simulateHashChange('a');
            });
        }));
        testing_internal_1.it('should pass an object containing the bad url to the router change subscription after a failed navigation', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.registerPrimaryOutlet(outlet)
                .then(function (_) { return router.config([new route_config_decorator_1.Route({ path: '/a', component: DummyComponent })]); })
                .then(function (_) {
                router.subscribe(function (_a) {
                    var status = _a.status, url = _a.url;
                    testing_internal_1.expect(status).toEqual('fail');
                    testing_internal_1.expect(url).toEqual('b');
                    async.done();
                });
                location.simulateHashChange('b');
            });
        }));
        testing_internal_1.it('should navigate after being configured', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.registerPrimaryOutlet(outlet)
                .then(function (_) { return router.navigateByUrl('/a'); })
                .then(function (_) {
                testing_internal_1.expect(outlet.spy('activate')).not.toHaveBeenCalled();
                return router.config([new route_config_decorator_1.Route({ path: '/a', component: DummyComponent })]);
            })
                .then(function (_) {
                testing_internal_1.expect(outlet.spy('activate')).toHaveBeenCalled();
                async.done();
            });
        }));
        testing_internal_1.it('should throw when linkParams does not include a route name', function () {
            testing_internal_1.expect(function () { return router.generate(['./']); })
                .toThrowError("Link \"" + collection_1.ListWrapper.toJSON(['./']) + "\" must include a route name.");
            testing_internal_1.expect(function () { return router.generate(['/']); })
                .toThrowError("Link \"" + collection_1.ListWrapper.toJSON(['/']) + "\" must include a route name.");
        });
        testing_internal_1.it('should, when subscribed to, return a disposable subscription', function () {
            testing_internal_1.expect(function () {
                var subscription = router.subscribe(function (_) { });
                async_1.ObservableWrapper.dispose(subscription);
            }).not.toThrow();
        });
        testing_internal_1.it('should generate URLs from the root component when the path starts with /', function () {
            router.config([new route_config_decorator_1.Route({ path: '/first/...', component: DummyParentComp, name: 'FirstCmp' })]);
            var instruction = router.generate(['/FirstCmp', 'SecondCmp']);
            testing_internal_1.expect(stringifyInstruction(instruction)).toEqual('first/second');
            instruction = router.generate(['/FirstCmp/SecondCmp']);
            testing_internal_1.expect(stringifyInstruction(instruction)).toEqual('first/second');
        });
        testing_internal_1.it('should generate an instruction with terminal async routes', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.registerPrimaryOutlet(outlet);
            router.config([new route_config_decorator_1.AsyncRoute({ path: '/first', loader: loader, name: 'FirstCmp' })]);
            var instruction = router.generate(['/FirstCmp']);
            router.navigateByInstruction(instruction).then(function (_) {
                testing_internal_1.expect(outlet.spy('activate')).toHaveBeenCalled();
                async.done();
            });
        }));
        testing_internal_1.it('should return whether a given instruction is active with isRouteActive', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.registerPrimaryOutlet(outlet)
                .then(function (_) { return router.config([
                new route_config_decorator_1.Route({ path: '/a', component: DummyComponent, name: 'A' }),
                new route_config_decorator_1.Route({ path: '/b', component: DummyComponent, name: 'B' })
            ]); })
                .then(function (_) { return router.navigateByUrl('/a'); })
                .then(function (_) {
                var instruction = router.generate(['/A']);
                var otherInstruction = router.generate(['/B']);
                testing_internal_1.expect(router.isRouteActive(instruction)).toEqual(true);
                testing_internal_1.expect(router.isRouteActive(otherInstruction)).toEqual(false);
                async.done();
            });
        }));
        testing_internal_1.it('should provide the current instruction', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var outlet = makeDummyOutlet();
            router.registerPrimaryOutlet(outlet)
                .then(function (_) { return router.config([
                new route_config_decorator_1.Route({ path: '/a', component: DummyComponent, name: 'A' }),
                new route_config_decorator_1.Route({ path: '/b', component: DummyComponent, name: 'B' })
            ]); })
                .then(function (_) { return router.navigateByUrl('/a'); })
                .then(function (_) {
                var instruction = router.generate(['/A']);
                testing_internal_1.expect(router.currentInstruction).toEqual(instruction);
                async.done();
            });
        }));
        testing_internal_1.it('should provide the root level router from child routers', function () {
            var childRouter = router.childRouter(DummyComponent);
            testing_internal_1.expect(childRouter.root).toBe(router);
        });
        testing_internal_1.describe('query string params', function () {
            testing_internal_1.it('should use query string params for the root route', function () {
                router.config([new route_config_decorator_1.Route({ path: '/hi/how/are/you', component: DummyComponent, name: 'GreetingUrl' })]);
                var instruction = router.generate(['/GreetingUrl', { 'name': 'brad' }]);
                var path = stringifyInstruction(instruction);
                testing_internal_1.expect(path).toEqual('hi/how/are/you?name=brad');
            });
            testing_internal_1.it('should preserve the number 1 as a query string value', function () {
                router.config([new route_config_decorator_1.Route({ path: '/hi/how/are/you', component: DummyComponent, name: 'GreetingUrl' })]);
                var instruction = router.generate(['/GreetingUrl', { 'name': 1 }]);
                var path = stringifyInstruction(instruction);
                testing_internal_1.expect(path).toEqual('hi/how/are/you?name=1');
            });
            testing_internal_1.it('should serialize parameters that are not part of the route definition as query string params', function () {
                router.config([new route_config_decorator_1.Route({ path: '/one/two/:three', component: DummyComponent, name: 'NumberUrl' })]);
                var instruction = router.generate(['/NumberUrl', { 'three': 'three', 'four': 'four' }]);
                var path = stringifyInstruction(instruction);
                testing_internal_1.expect(path).toEqual('one/two/three?four=four');
            });
        });
        testing_internal_1.describe('matrix params', function () {
            testing_internal_1.it('should generate matrix params for each non-root component', function () {
                router.config([new route_config_decorator_1.Route({ path: '/first/...', component: DummyParentComp, name: 'FirstCmp' })]);
                var instruction = router.generate(['/FirstCmp', { 'key': 'value' }, 'SecondCmp', { 'project': 'angular' }]);
                var path = stringifyInstruction(instruction);
                testing_internal_1.expect(path).toEqual('first/second;project=angular?key=value');
            });
            testing_internal_1.it('should work with named params', function () {
                router.config([new route_config_decorator_1.Route({ path: '/first/:token/...', component: DummyParentComp, name: 'FirstCmp' })]);
                var instruction = router.generate(['/FirstCmp', { 'token': 'min' }, 'SecondCmp', { 'author': 'max' }]);
                var path = stringifyInstruction(instruction);
                testing_internal_1.expect(path).toEqual('first/min/second;author=max');
            });
        });
    });
}
exports.main = main;
function stringifyInstruction(instruction /** TODO #9100 */) {
    return instruction.toRootUrl();
}
function loader() {
    return async_1.PromiseWrapper.resolve(DummyComponent);
}
var DummyComponent = (function () {
    function DummyComponent() {
    }
    return DummyComponent;
}());
var DummyParentComp = (function () {
    function DummyParentComp() {
    }
    /** @nocollapse */
    DummyParentComp.decorators = [
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/second', component: DummyComponent, name: 'SecondCmp' })],] },
    ];
    return DummyParentComp;
}());
function makeDummyOutlet() {
    var ref = new spies_1.SpyRouterOutlet();
    ref.spy('canActivate').andCallFake(function (_ /** TODO #9100 */) { return async_1.PromiseWrapper.resolve(true); });
    ref.spy('routerCanReuse')
        .andCallFake(function (_ /** TODO #9100 */) { return async_1.PromiseWrapper.resolve(false); });
    ref.spy('routerCanDeactivate')
        .andCallFake(function (_ /** TODO #9100 */) { return async_1.PromiseWrapper.resolve(true); });
    ref.spy('activate').andCallFake(function (_ /** TODO #9100 */) { return async_1.PromiseWrapper.resolve(true); });
    return ref;
}
var AppCmp = (function () {
    function AppCmp() {
    }
    return AppCmp;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci1kZXByZWNhdGVkL3Rlc3Qvcm91dGVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHVCQUF1QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pDLHdCQUEwQix5QkFBeUIsQ0FBQyxDQUFBO0FBRXBELGlDQUFxSCx3Q0FBd0MsQ0FBQyxDQUFBO0FBRzlKLHNCQUFnRCxxQkFBcUIsQ0FBQyxDQUFBO0FBQ3RFLDJCQUEwQiwwQkFBMEIsQ0FBQyxDQUFBO0FBRXJELHVDQUF1RCw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ3BHLCtCQUFzRCx1QkFBdUIsQ0FBQyxDQUFBO0FBQzlFLHVCQUFpQyxlQUFlLENBQUMsQ0FBQTtBQUVqRCxzQkFBOEIsU0FBUyxDQUFDLENBQUE7QUFFeEM7SUFDRSwyQkFBUSxDQUFDLFFBQVEsRUFBRTtRQUNqQixJQUFJLE1BQWMsQ0FBQztRQUNuQixJQUFJLFFBQWtCLENBQUM7UUFFdkIsc0NBQW1CLENBQ2Y7WUFDSSxPQUFBLENBQUMsOEJBQWEsRUFBRSxFQUFDLE9BQU8sRUFBRSxpQkFBUSxFQUFFLFFBQVEsRUFBRSxxQkFBVyxFQUFDO2dCQUN6RCxFQUFDLE9BQU8sRUFBRSx5Q0FBd0IsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFDO2dCQUNyRCxFQUFDLE9BQU8sRUFBRSxlQUFNLEVBQUUsUUFBUSxFQUFFLG1CQUFVLEVBQUMsQ0FBQztRQUZ6QyxDQUV5QyxDQUFDLENBQUM7UUFHbkQsNkJBQVUsQ0FBQyx5QkFBTSxDQUFDLENBQUMsZUFBTSxFQUFFLGlCQUFRLENBQUMsRUFBRSxVQUFDLEdBQVcsRUFBRSxHQUFhO1lBQy9ELE1BQU0sR0FBRyxHQUFHLENBQUM7WUFDYixRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ2pCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFH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