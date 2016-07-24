/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var rules_1 = require('../../src/rules/rules');
var rule_set_1 = require('../../src/rules/rule_set');
var route_path_1 = require('../../src/rules/route_paths/route_path');
var route_config_decorator_1 = require('../../src/route_config/route_config_decorator');
var url_parser_1 = require('../../src/url_parser');
var promise_1 = require('../../src/facade/promise');
function main() {
    testing_internal_1.describe('RuleSet', function () {
        var recognizer;
        testing_internal_1.beforeEach(function () { recognizer = new rule_set_1.RuleSet(); });
        testing_internal_1.it('should recognize a static segment', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            recognizer.config(new route_config_decorator_1.Route({ path: '/test', component: DummyCmpA }));
            recognize(recognizer, '/test').then(function (solutions) {
                matchers_1.expect(solutions.length).toBe(1);
                matchers_1.expect(getComponentType(solutions[0])).toEqual(DummyCmpA);
                async.done();
            });
        }));
        testing_internal_1.it('should recognize a single slash', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            recognizer.config(new route_config_decorator_1.Route({ path: '/', component: DummyCmpA }));
            recognize(recognizer, '/').then(function (solutions) {
                matchers_1.expect(solutions.length).toBe(1);
                matchers_1.expect(getComponentType(solutions[0])).toEqual(DummyCmpA);
                async.done();
            });
        }));
        testing_internal_1.it('should recognize a dynamic segment', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            recognizer.config(new route_config_decorator_1.Route({ path: '/user/:name', component: DummyCmpA }));
            recognize(recognizer, '/user/brian').then(function (solutions) {
                matchers_1.expect(solutions.length).toBe(1);
                matchers_1.expect(getComponentType(solutions[0])).toEqual(DummyCmpA);
                matchers_1.expect(getParams(solutions[0])).toEqual({ 'name': 'brian' });
                async.done();
            });
        }));
        testing_internal_1.it('should recognize a star segment', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            recognizer.config(new route_config_decorator_1.Route({ path: '/first/*rest', component: DummyCmpA }));
            recognize(recognizer, '/first/second/third').then(function (solutions) {
                matchers_1.expect(solutions.length).toBe(1);
                matchers_1.expect(getComponentType(solutions[0])).toEqual(DummyCmpA);
                matchers_1.expect(getParams(solutions[0])).toEqual({ 'rest': 'second/third' });
                async.done();
            });
        }));
        testing_internal_1.it('should recognize a regex', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            function emptySerializer(params /** TODO #9100 */) {
                return new route_path_1.GeneratedUrl('', {});
            }
            recognizer.config(new route_config_decorator_1.Route({ regex: '^(.+)/(.+)$', serializer: emptySerializer, component: DummyCmpA }));
            recognize(recognizer, '/first/second').then(function (solutions) {
                matchers_1.expect(solutions.length).toBe(1);
                matchers_1.expect(getComponentType(solutions[0])).toEqual(DummyCmpA);
                matchers_1.expect(getParams(solutions[0]))
                    .toEqual({ '0': 'first/second', '1': 'first', '2': 'second' });
                async.done();
            });
        }));
        testing_internal_1.it('should recognize a regex with named_groups', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            function emptySerializer(params /** TODO #9100 */) {
                return new route_path_1.GeneratedUrl('', {});
            }
            recognizer.config(new route_config_decorator_1.Route({
                regex: '^(.+)/(.+)$',
                regex_group_names: ['cc', 'a', 'b'],
                serializer: emptySerializer,
                component: DummyCmpA
            }));
            recognize(recognizer, '/first/second').then(function (solutions) {
                matchers_1.expect(solutions.length).toBe(1);
                matchers_1.expect(getComponentType(solutions[0])).toEqual(DummyCmpA);
                matchers_1.expect(getParams(solutions[0]))
                    .toEqual({ 'cc': 'first/second', 'a': 'first', 'b': 'second' });
                async.done();
            });
        }));
        testing_internal_1.it('should throw when given two routes that start with the same static segment', function () {
            recognizer.config(new route_config_decorator_1.Route({ path: '/hello', component: DummyCmpA }));
            matchers_1.expect(function () { return recognizer.config(new route_config_decorator_1.Route({ path: '/hello', component: DummyCmpB })); })
                .toThrowError('Configuration \'/hello\' conflicts with existing route \'/hello\'');
        });
        testing_internal_1.it('should throw when given two routes that have dynamic segments in the same order', function () {
            recognizer.config(new route_config_decorator_1.Route({ path: '/hello/:person/how/:doyoudou', component: DummyCmpA }));
            matchers_1.expect(function () { return recognizer.config(new route_config_decorator_1.Route({ path: '/hello/:friend/how/:areyou', component: DummyCmpA })); })
                .toThrowError('Configuration \'/hello/:friend/how/:areyou\' conflicts with existing route \'/hello/:person/how/:doyoudou\'');
            matchers_1.expect(function () { return recognizer.config(new route_config_decorator_1.Redirect({ path: '/hello/:pal/how/:goesit', redirectTo: ['/Foo'] })); })
                .toThrowError('Configuration \'/hello/:pal/how/:goesit\' conflicts with existing route \'/hello/:person/how/:doyoudou\'');
        });
        testing_internal_1.it('should recognize redirects', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            recognizer.config(new route_config_decorator_1.Route({ path: '/b', component: DummyCmpA }));
            recognizer.config(new route_config_decorator_1.Redirect({ path: '/a', redirectTo: ['B'] }));
            recognize(recognizer, '/a').then(function (solutions) {
                matchers_1.expect(solutions.length).toBe(1);
                var solution = solutions[0];
                matchers_1.expect(solution).toBeAnInstanceOf(rules_1.RedirectMatch);
                if (solution instanceof rules_1.RedirectMatch) {
                    matchers_1.expect(solution.redirectTo).toEqual(['B']);
                }
                async.done();
            });
        }));
        testing_internal_1.it('should generate URLs with params', function () {
            recognizer.config(new route_config_decorator_1.Route({ path: '/app/user/:name', component: DummyCmpA, name: 'User' }));
            var instruction = recognizer.generate('User', { 'name': 'misko' });
            matchers_1.expect(instruction.urlPath).toEqual('app/user/misko');
        });
        testing_internal_1.it('should generate URLs with numeric params', function () {
            recognizer.config(new route_config_decorator_1.Route({ path: '/app/page/:number', component: DummyCmpA, name: 'Page' }));
            matchers_1.expect(recognizer.generate('Page', { 'number': 42 }).urlPath).toEqual('app/page/42');
        });
        testing_internal_1.it('should generate using a serializer', function () {
            function simpleSerializer(params /** TODO #9100 */) {
                var extra = { c: params['c'] };
                return new route_path_1.GeneratedUrl("/" + params['a'] + "/" + params['b'], extra);
            }
            recognizer.config(new route_config_decorator_1.Route({
                name: 'Route1',
                regex: '^(.+)/(.+)$',
                serializer: simpleSerializer,
                component: DummyCmpA
            }));
            var params = { a: 'first', b: 'second', c: 'third' };
            var result = recognizer.generate('Route1', params);
            matchers_1.expect(result.urlPath).toEqual('/first/second');
            matchers_1.expect(result.urlParams).toEqual(['c=third']);
        });
        testing_internal_1.it('should throw in the absence of required params URLs', function () {
            recognizer.config(new route_config_decorator_1.Route({ path: 'app/user/:name', component: DummyCmpA, name: 'User' }));
            matchers_1.expect(function () { return recognizer.generate('User', {}); })
                .toThrowError('Route generator for \'name\' was not included in parameters passed.');
        });
        testing_internal_1.it('should throw if the route alias is not TitleCase', function () {
            matchers_1.expect(function () { return recognizer.config(new route_config_decorator_1.Route({ path: 'app/user/:name', component: DummyCmpA, name: 'user' })); })
                .toThrowError("Route \"app/user/:name\" with name \"user\" does not begin with an uppercase letter. Route names should be PascalCase like \"User\".");
        });
        testing_internal_1.describe('params', function () {
            testing_internal_1.it('should recognize parameters within the URL path', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                recognizer.config(new route_config_decorator_1.Route({ path: 'profile/:name', component: DummyCmpA, name: 'User' }));
                recognize(recognizer, '/profile/matsko?comments=all').then(function (solutions) {
                    matchers_1.expect(solutions.length).toBe(1);
                    matchers_1.expect(getParams(solutions[0])).toEqual({ 'name': 'matsko', 'comments': 'all' });
                    async.done();
                });
            }));
            testing_internal_1.it('should generate and populate the given static-based route with querystring params', function () {
                recognizer.config(new route_config_decorator_1.Route({ path: 'forum/featured', component: DummyCmpA, name: 'ForumPage' }));
                var params = { 'start': 10, 'end': 100 };
                var result = recognizer.generate('ForumPage', params);
                matchers_1.expect(result.urlPath).toEqual('forum/featured');
                matchers_1.expect(result.urlParams).toEqual(['start=10', 'end=100']);
            });
            testing_internal_1.it('should prefer positional params over query params', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                recognizer.config(new route_config_decorator_1.Route({ path: 'profile/:name', component: DummyCmpA, name: 'User' }));
                recognize(recognizer, '/profile/yegor?name=igor').then(function (solutions) {
                    matchers_1.expect(solutions.length).toBe(1);
                    matchers_1.expect(getParams(solutions[0])).toEqual({ 'name': 'yegor' });
                    async.done();
                });
            }));
            testing_internal_1.it('should ignore matrix params for the top-level component', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                recognizer.config(new route_config_decorator_1.Route({ path: '/home/:subject', component: DummyCmpA, name: 'User' }));
                recognize(recognizer, '/home;sort=asc/zero;one=1?two=2')
                    .then(function (solutions) {
                    matchers_1.expect(solutions.length).toBe(1);
                    matchers_1.expect(getParams(solutions[0])).toEqual({ 'subject': 'zero', 'two': '2' });
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
function recognize(recognizer, url) {
    var parsedUrl = url_parser_1.parser.parse(url);
    return promise_1.PromiseWrapper.all(recognizer.recognize(parsedUrl));
}
function getComponentType(routeMatch) {
    if (routeMatch instanceof rules_1.PathMatch) {
        return routeMatch.instruction.componentType;
    }
    return null;
}
function getParams(routeMatch) {
    if (routeMatch instanceof rules_1.PathMatch) {
        return routeMatch.instruction.params;
    }
    return null;
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZV9zZXRfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyLWRlcHJlY2F0ZWQvdGVzdC9ydWxlcy9ydWxlX3NldF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBb0Ysd0NBQXdDLENBQUMsQ0FBQTtBQUM3SCx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUNsRSxzQkFBbUQsdUJBQXVCLENBQUMsQ0FBQTtBQUMzRSx5QkFBc0IsMEJBQTBCLENBQUMsQ0FBQTtBQUNqRCwyQkFBMkIsd0NBQXdDLENBQUMsQ0FBQTtBQUNwRSx1Q0FBOEIsK0NBQStDLENBQUMsQ0FBQTtBQUM5RSwyQkFBcUIsc0JBQXNCLENBQUMsQ0FBQTtBQUM1Qyx3QkFBNkIsMEJBQTBCLENBQUMsQ0FBQTtBQUd4RDtJQUNFLDJCQUFRLENBQUMsU0FBUyxFQUFFO1FBQ2xCLElBQUksVUFBbUIsQ0FBQztRQUV4Qiw2QkFBVSxDQUFDLGNBQVEsVUFBVSxHQUFHLElBQUksa0JBQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHbEQscUJBQUUsQ0FBQyxtQ0FBbUMsRUFDbkMseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksOEJBQUssQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQztZQUNwRSxTQUFTLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLFNBQXVCO2dCQUMxRCxpQkFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLGlCQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFD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