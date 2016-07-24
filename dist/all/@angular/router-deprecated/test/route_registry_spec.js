/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var async_1 = require('../src/facade/async');
var lang_1 = require('../src/facade/lang');
var route_registry_1 = require('../src/route_registry');
var route_config_decorator_1 = require('../src/route_config/route_config_decorator');
function main() {
    testing_internal_1.describe('RouteRegistry', function () {
        var registry;
        testing_internal_1.beforeEach(function () { registry = new route_registry_1.RouteRegistry(RootHostCmp); });
        testing_internal_1.it('should match the full URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/', component: DummyCmpA }));
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/test', component: DummyCmpB }));
            registry.recognize('/test', []).then(function (instruction) {
                testing_internal_1.expect(instruction.component.componentType).toBe(DummyCmpB);
                async.done();
            });
        }));
        testing_internal_1.it('should generate URLs starting at the given component', function () {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first/...', component: DummyParentCmp, name: 'FirstCmp' }));
            var instr = registry.generate(['FirstCmp', 'SecondCmp'], []);
            testing_internal_1.expect(stringifyInstruction(instr)).toEqual('first/second');
            testing_internal_1.expect(stringifyInstruction(registry.generate(['SecondCmp'], [instr, instr.child])))
                .toEqual('first/second');
            testing_internal_1.expect(stringifyInstruction(registry.generate(['./SecondCmp'], [instr, instr.child])))
                .toEqual('first/second');
        });
        testing_internal_1.it('should generate URLs that account for default routes', function () {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first/...', component: ParentWithDefaultRouteCmp, name: 'FirstCmp' }));
            var instruction = registry.generate(['FirstCmp'], []);
            testing_internal_1.expect(instruction.toLinkUrl()).toEqual('first');
            testing_internal_1.expect(instruction.toRootUrl()).toEqual('first/second');
        });
        testing_internal_1.it('should generate URLs in a hierarchy of default routes', function () {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first/...', component: MultipleDefaultCmp, name: 'FirstCmp' }));
            var instruction = registry.generate(['FirstCmp'], []);
            testing_internal_1.expect(instruction.toLinkUrl()).toEqual('first');
            testing_internal_1.expect(instruction.toRootUrl()).toEqual('first/second/third');
        });
        testing_internal_1.it('should generate URLs with params', function () {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first/:param/...', component: DummyParentParamCmp, name: 'FirstCmp' }));
            var url = stringifyInstruction(registry.generate(['FirstCmp', { param: 'one' }, 'SecondCmp', { param: 'two' }], []));
            testing_internal_1.expect(url).toEqual('first/one/second/two');
        });
        testing_internal_1.it('should generate params as an empty StringMap when no params are given', function () {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/test', component: DummyCmpA, name: 'Test' }));
            var instruction = registry.generate(['Test'], []);
            testing_internal_1.expect(instruction.component.params).toEqual({});
        });
        testing_internal_1.it('should generate URLs with extra params in the query', function () {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first/second', component: DummyCmpA, name: 'FirstCmp' }));
            var instruction = registry.generate(['FirstCmp', { a: 'one' }], []);
            testing_internal_1.expect(instruction.toLinkUrl()).toEqual('first/second?a=one');
        });
        testing_internal_1.it('should generate URLs of loaded components after they are loaded', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            registry.config(RootHostCmp, new route_config_decorator_1.AsyncRoute({ path: '/first/...', loader: asyncParentLoader, name: 'FirstCmp' }));
            var instruction = registry.generate(['FirstCmp', 'SecondCmp'], []);
            testing_internal_1.expect(stringifyInstruction(instruction)).toEqual('first');
            registry.recognize('/first/second', []).then(function (_) {
                var instruction = registry.generate(['FirstCmp', 'SecondCmp'], []);
                testing_internal_1.expect(stringifyInstruction(instruction)).toEqual('first/second');
                async.done();
            });
        }));
        testing_internal_1.it('should throw when generating a url and a parent has no config', function () {
            testing_internal_1.expect(function () { return registry.generate(['FirstCmp', 'SecondCmp'], []); }).toThrowError('Component "RootHostCmp" has no route config.');
        });
        testing_internal_1.it('should generate URLs for aux routes', function () {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/primary', component: DummyCmpA, name: 'Primary' }));
            registry.config(RootHostCmp, new route_config_decorator_1.AuxRoute({ path: '/aux', component: DummyCmpB, name: 'Aux' }));
            testing_internal_1.expect(stringifyInstruction(registry.generate(['Primary', ['Aux']], []))).toEqual('primary(aux)');
        });
        testing_internal_1.it('should prefer static segments to dynamic', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/:site', component: DummyCmpB }));
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/home', component: DummyCmpA }));
            registry.recognize('/home', []).then(function (instruction) {
                testing_internal_1.expect(instruction.component.componentType).toBe(DummyCmpA);
                async.done();
            });
        }));
        testing_internal_1.it('should prefer dynamic segments to star', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/:site', component: DummyCmpA }));
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/*site', component: DummyCmpB }));
            registry.recognize('/home', []).then(function (instruction) {
                testing_internal_1.expect(instruction.component.componentType).toBe(DummyCmpA);
                async.done();
            });
        }));
        testing_internal_1.it('should prefer routes with more dynamic segments', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/:first/*rest', component: DummyCmpA }));
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/*all', component: DummyCmpB }));
            registry.recognize('/some/path', []).then(function (instruction) {
                testing_internal_1.expect(instruction.component.componentType).toBe(DummyCmpA);
                async.done();
            });
        }));
        testing_internal_1.it('should prefer routes with more static segments', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first/:second', component: DummyCmpA }));
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/:first/:second', component: DummyCmpB }));
            registry.recognize('/first/second', []).then(function (instruction) {
                testing_internal_1.expect(instruction.component.componentType).toBe(DummyCmpA);
                async.done();
            });
        }));
        testing_internal_1.it('should prefer routes with static segments before dynamic segments', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first/second/:third', component: DummyCmpB }));
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first/:second/third', component: DummyCmpA }));
            registry.recognize('/first/second/third', []).then(function (instruction) {
                testing_internal_1.expect(instruction.component.componentType).toBe(DummyCmpB);
                async.done();
            });
        }));
        testing_internal_1.it('should prefer routes with high specificity over routes with children with lower specificity', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first', component: DummyCmpA }));
            // terminates to DummyCmpB
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/:second/...', component: SingleSlashChildCmp }));
            registry.recognize('/first', []).then(function (instruction) {
                testing_internal_1.expect(instruction.component.componentType).toBe(DummyCmpA);
                async.done();
            });
        }));
        testing_internal_1.it('should match the full URL using child components', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first/...', component: DummyParentCmp }));
            registry.recognize('/first/second', []).then(function (instruction) {
                testing_internal_1.expect(instruction.component.componentType).toBe(DummyParentCmp);
                testing_internal_1.expect(instruction.child.component.componentType).toBe(DummyCmpB);
                async.done();
            });
        }));
        testing_internal_1.it('should match the URL using async child components', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first/...', component: DummyAsyncCmp }));
            registry.recognize('/first/second', []).then(function (instruction) {
                testing_internal_1.expect(instruction.component.componentType).toBe(DummyAsyncCmp);
                instruction.child.resolveComponent().then(function (childComponentInstruction) {
                    testing_internal_1.expect(childComponentInstruction.componentType).toBe(DummyCmpB);
                    async.done();
                });
            });
        }));
        testing_internal_1.it('should match the URL using an async parent component', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            registry.config(RootHostCmp, new route_config_decorator_1.AsyncRoute({ path: '/first/...', loader: asyncParentLoader }));
            registry.recognize('/first/second', []).then(function (instruction) {
                testing_internal_1.expect(instruction.component.componentType).toBe(DummyParentCmp);
                instruction.child.resolveComponent().then(function (childType) {
                    testing_internal_1.expect(childType.componentType).toBe(DummyCmpB);
                    async.done();
                });
            });
        }));
        testing_internal_1.it('should throw when a parent config is missing the `...` suffix any of its children add routes', function () {
            testing_internal_1.expect(function () { return registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/', component: DummyParentCmp })); })
                .toThrowError('Child routes are not allowed for "/". Use "..." on the parent\'s route path.');
        });
        testing_internal_1.it('should throw when a parent config uses `...` suffix before the end of the route', function () {
            testing_internal_1.expect(function () { return registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/home/.../fun/', component: DummyParentCmp })); })
                .toThrowError('Unexpected "..." before the end of the path for "home/.../fun/".');
        });
        testing_internal_1.it('should throw if a config has a component that is not defined', function () {
            testing_internal_1.expect(function () { return registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/', component: null })); })
                .toThrowError('Component for route "/" is not defined, or is not a class.');
            testing_internal_1.expect(function () { return registry.config(RootHostCmp, new route_config_decorator_1.AuxRoute({ path: '/', component: null })); })
                .toThrowError('Component for route "/" is not defined, or is not a class.');
            // This would never happen in Dart
            if (!lang_1.IS_DART) {
                testing_internal_1.expect(function () { return registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/', component: 4 })); })
                    .toThrowError('Component for route "/" is not defined, or is not a class.');
            }
        });
        testing_internal_1.it('should throw when linkParams are not terminal', function () {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first/...', component: DummyParentCmp, name: 'First' }));
            testing_internal_1.expect(function () {
                registry.generate(['First'], []);
            }).toThrowError(/Link "\["First"\]" does not resolve to a terminal instruction./);
        });
        testing_internal_1.it('should match matrix params on child components and query params on the root component', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first/...', component: DummyParentCmp }));
            registry.recognize('/first/second;filter=odd?comments=all', []).then(function (instruction) {
                testing_internal_1.expect(instruction.component.componentType).toBe(DummyParentCmp);
                testing_internal_1.expect(instruction.component.params).toEqual({ 'comments': 'all' });
                testing_internal_1.expect(instruction.child.component.componentType).toBe(DummyCmpB);
                testing_internal_1.expect(instruction.child.component.params).toEqual({ 'filter': 'odd' });
                async.done();
            });
        }));
        testing_internal_1.it('should match query params on the root component even when the next URL segment is null', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first/...', component: SingleSlashChildCmp }));
            registry.recognize('/first?comments=all', []).then(function (instruction) {
                testing_internal_1.expect(instruction.component.componentType).toBe(SingleSlashChildCmp);
                testing_internal_1.expect(instruction.component.params).toEqual({ 'comments': 'all' });
                testing_internal_1.expect(instruction.child.component.componentType).toBe(DummyCmpB);
                testing_internal_1.expect(instruction.child.component.params).toEqual({});
                async.done();
            });
        }));
        testing_internal_1.it('should generate URLs with matrix and query params', function () {
            registry.config(RootHostCmp, new route_config_decorator_1.Route({ path: '/first/:param/...', component: DummyParentParamCmp, name: 'FirstCmp' }));
            var url = stringifyInstruction(registry.generate([
                'FirstCmp', { param: 'one', query: 'cats' }, 'SecondCmp', {
                    param: 'two',
                    sort: 'asc',
                }
            ], []));
            testing_internal_1.expect(url).toEqual('first/one/second/two;sort=asc?query=cats');
        });
    });
}
exports.main = main;
function stringifyInstruction(instruction /** TODO #9100 */) {
    return instruction.toRootUrl();
}
function asyncParentLoader() {
    return async_1.PromiseWrapper.resolve(DummyParentCmp);
}
function asyncChildLoader() {
    return async_1.PromiseWrapper.resolve(DummyCmpB);
}
var RootHostCmp = (function () {
    function RootHostCmp() {
    }
    return RootHostCmp;
}());
var DummyAsyncCmp = (function () {
    function DummyAsyncCmp() {
    }
    /** @nocollapse */
    DummyAsyncCmp.decorators = [
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.AsyncRoute({ path: '/second', loader: asyncChildLoader })],] },
    ];
    return DummyAsyncCmp;
}());
var DummyCmpA = (function () {
    function DummyCmpA() {
    }
    return DummyCmpA;
}());
var DummyCmpB = (function () {
    function DummyCmpB() {
    }
    return DummyCmpB;
}());
var DefaultRouteCmp = (function () {
    function DefaultRouteCmp() {
    }
    /** @nocollapse */
    DefaultRouteCmp.decorators = [
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/third', component: DummyCmpB, name: 'ThirdCmp', useAsDefault: true })],] },
    ];
    return DefaultRouteCmp;
}());
var SingleSlashChildCmp = (function () {
    function SingleSlashChildCmp() {
    }
    /** @nocollapse */
    SingleSlashChildCmp.decorators = [
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/', component: DummyCmpB, name: 'ThirdCmp' })],] },
    ];
    return SingleSlashChildCmp;
}());
var MultipleDefaultCmp = (function () {
    function MultipleDefaultCmp() {
    }
    /** @nocollapse */
    MultipleDefaultCmp.decorators = [
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/second/...', component: DefaultRouteCmp, name: 'SecondCmp', useAsDefault: true })],] },
    ];
    return MultipleDefaultCmp;
}());
var ParentWithDefaultRouteCmp = (function () {
    function ParentWithDefaultRouteCmp() {
    }
    /** @nocollapse */
    ParentWithDefaultRouteCmp.decorators = [
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/second', component: DummyCmpB, name: 'SecondCmp', useAsDefault: true })],] },
    ];
    return ParentWithDefaultRouteCmp;
}());
var DummyParentCmp = (function () {
    function DummyParentCmp() {
    }
    /** @nocollapse */
    DummyParentCmp.decorators = [
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/second', component: DummyCmpB, name: 'SecondCmp' })],] },
    ];
    return DummyParentCmp;
}());
var DummyParentParamCmp = (function () {
    function DummyParentParamCmp() {
    }
    /** @nocollapse */
    DummyParentParamCmp.decorators = [
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/second/:param', component: DummyCmpB, name: 'SecondCmp' })],] },
    ];
    return DummyParentParamCmp;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVfcmVnaXN0cnlfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyLWRlcHJlY2F0ZWQvdGVzdC9yb3V0ZV9yZWdpc3RyeV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBNEYsd0NBQXdDLENBQUMsQ0FBQTtBQUVySSxzQkFBNkIscUJBQXFCLENBQUMsQ0FBQTtBQUNuRCxxQkFBNEIsb0JBQW9CLENBQUMsQ0FBQTtBQUVqRCwrQkFBNEIsdUJBQXVCLENBQUMsQ0FBQTtBQUNwRCx1Q0FBaUUsNENBQTRDLENBQUMsQ0FBQTtBQUc5RztJQUNFLDJCQUFRLENBQUMsZUFBZSxFQUFFO1FBQ3hCLElBQUksUUFBdUIsQ0FBQztRQUU1Qiw2QkFBVSxDQUFDLGNBQVEsUUFBUSxHQUFHLElBQUksOEJBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpFLHFCQUFFLENBQUMsMkJBQTJCLEVBQUUseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNsRixRQUFRLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxJQUFJLDhCQUFLLENBQUMsRUFBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0UsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSw4QkFBSyxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBRS9FLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFdBQVc7Z0JBQy9DLHlCQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxJ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