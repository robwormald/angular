/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var Observable_1 = require('rxjs/Observable');
var of_1 = require('rxjs/observable/of');
var apply_redirects_1 = require('../src/apply_redirects');
var router_config_loader_1 = require('../src/router_config_loader');
var url_tree_1 = require('../src/url_tree');
describe('applyRedirects', function () {
    it('should return the same url tree when no redirects', function () {
        checkRedirect([{ path: 'a', component: ComponentA, children: [{ path: 'b', component: ComponentB }] }], '/a/b', function (t) { compareTrees(t, tree('/a/b')); });
    });
    it('should add new segments when needed', function () {
        checkRedirect([{ path: 'a/b', redirectTo: 'a/b/c' }, { path: '**', component: ComponentC }], '/a/b', function (t) { compareTrees(t, tree('/a/b/c')); });
    });
    it('should handle positional parameters', function () {
        checkRedirect([
            { path: 'a/:aid/b/:bid', redirectTo: 'newa/:aid/newb/:bid' },
            { path: '**', component: ComponentC }
        ], '/a/1/b/2', function (t) { compareTrees(t, tree('/newa/1/newb/2')); });
    });
    it('should throw when cannot handle a positional parameter', function () {
        apply_redirects_1.applyRedirects(null, null, tree('/a/1'), [
            { path: 'a/:id', redirectTo: 'a/:other' }
        ]).subscribe(function () { }, function (e) {
            expect(e.message).toEqual('Cannot redirect to \'a/:other\'. Cannot find \':other\'.');
        });
    });
    it('should pass matrix parameters', function () {
        checkRedirect([{ path: 'a/:id', redirectTo: 'd/a/:id/e' }, { path: '**', component: ComponentC }], '/a;p1=1/1;p2=2', function (t) { compareTrees(t, tree('/d/a;p1=1/1;p2=2/e')); });
    });
    it('should handle preserve secondary routes', function () {
        checkRedirect([
            { path: 'a/:id', redirectTo: 'd/a/:id/e' },
            { path: 'c/d', component: ComponentA, outlet: 'aux' }, { path: '**', component: ComponentC }
        ], '/a/1(aux:c/d)', function (t) { compareTrees(t, tree('/d/a/1/e(aux:c/d)')); });
    });
    it('should redirect secondary routes', function () {
        checkRedirect([
            { path: 'a/:id', component: ComponentA },
            { path: 'c/d', redirectTo: 'f/c/d/e', outlet: 'aux' },
            { path: '**', component: ComponentC, outlet: 'aux' }
        ], '/a/1(aux:c/d)', function (t) { compareTrees(t, tree('/a/1(aux:f/c/d/e)')); });
    });
    it('should use the configuration of the route redirected to', function () {
        checkRedirect([
            {
                path: 'a',
                component: ComponentA,
                children: [
                    { path: 'b', component: ComponentB },
                ]
            },
            { path: 'c', redirectTo: 'a' }
        ], 'c/b', function (t) { compareTrees(t, tree('a/b')); });
    });
    it('should support redirects with both main and aux', function () {
        checkRedirect([{
                path: 'a',
                children: [
                    { path: 'bb', component: ComponentB }, { path: 'b', redirectTo: 'bb' },
                    { path: 'cc', component: ComponentC, outlet: 'aux' },
                    { path: 'b', redirectTo: 'cc', outlet: 'aux' }
                ]
            }], 'a/(b//aux:b)', function (t) { compareTrees(t, tree('a/(bb//aux:cc)')); });
    });
    it('should support redirects with both main and aux (with a nested redirect)', function () {
        checkRedirect([{
                path: 'a',
                children: [
                    { path: 'bb', component: ComponentB }, { path: 'b', redirectTo: 'bb' },
                    {
                        path: 'cc',
                        component: ComponentC,
                        outlet: 'aux',
                        children: [{ path: 'dd', component: ComponentC }, { path: 'd', redirectTo: 'dd' }]
                    },
                    { path: 'b', redirectTo: 'cc/d', outlet: 'aux' }
                ]
            }], 'a/(b//aux:b)', function (t) { compareTrees(t, tree('a/(bb//aux:cc/dd)')); });
    });
    it('should redirect wild cards', function () {
        checkRedirect([
            { path: '404', component: ComponentA },
            { path: '**', redirectTo: '/404' },
        ], '/a/1(aux:c/d)', function (t) { compareTrees(t, tree('/404')); });
    });
    it('should support absolute redirects', function () {
        checkRedirect([
            {
                path: 'a',
                component: ComponentA,
                children: [{ path: 'b/:id', redirectTo: '/absolute/:id' }]
            },
            { path: '**', component: ComponentC }
        ], '/a/b/1', function (t) { compareTrees(t, tree('/absolute/1')); });
    });
    describe('lazy loading', function () {
        it('should load config on demand', function () {
            var loadedConfig = new router_config_loader_1.LoadedRouterConfig([{ path: 'b', component: ComponentB }], 'stubInjector', 'stubFactoryResolver');
            var loader = {
                load: function (injector, p) {
                    if (injector !== 'providedInjector')
                        throw 'Invalid Injector';
                    return of_1.of(loadedConfig);
                }
            };
            var config = [{ path: 'a', component: ComponentA, loadChildren: 'children' }];
            apply_redirects_1.applyRedirects('providedInjector', loader, tree('a/b'), config).forEach(function (r) {
                compareTrees(r, tree('/a/b'));
                expect(config[0]._loadedConfig).toBe(loadedConfig);
            });
        });
        it('should handle the case when the loader errors', function () {
            var loader = {
                load: function (p) { return new Observable_1.Observable(function (obs) { return obs.error(new Error('Loading Error')); }); }
            };
            var config = [{ path: 'a', component: ComponentA, loadChildren: 'children' }];
            apply_redirects_1.applyRedirects(null, loader, tree('a/b'), config).subscribe(function () { }, function (e) {
                expect(e.message).toEqual('Loading Error');
            });
        });
    });
    describe('empty paths', function () {
        it('redirect from an empty path should work (local redirect)', function () {
            checkRedirect([
                {
                    path: 'a',
                    component: ComponentA,
                    children: [
                        { path: 'b', component: ComponentB },
                    ]
                },
                { path: '', redirectTo: 'a' }
            ], 'b', function (t) { compareTrees(t, tree('a/b')); });
        });
        it('redirect from an empty path should work (absolute redirect)', function () {
            checkRedirect([
                {
                    path: 'a',
                    component: ComponentA,
                    children: [
                        { path: 'b', component: ComponentB },
                    ]
                },
                { path: '', redirectTo: '/a/b' }
            ], '', function (t) { compareTrees(t, tree('a/b')); });
        });
        it('should redirect empty path route only when terminal', function () {
            var config = [
                {
                    path: 'a',
                    component: ComponentA,
                    children: [
                        { path: 'b', component: ComponentB },
                    ]
                },
                { path: '', redirectTo: 'a', pathMatch: 'full' }
            ];
            apply_redirects_1.applyRedirects(null, null, tree('b'), config)
                .subscribe(function (_) { throw 'Should not be reached'; }, function (e) { expect(e.message).toEqual('Cannot match any routes: \'b\''); });
        });
        it('redirect from an empty path should work (nested case)', function () {
            checkRedirect([
                {
                    path: 'a',
                    component: ComponentA,
                    children: [{ path: 'b', component: ComponentB }, { path: '', redirectTo: 'b' }]
                },
                { path: '', redirectTo: 'a' }
            ], '', function (t) { compareTrees(t, tree('a/b')); });
        });
        it('redirect to an empty path should work', function () {
            checkRedirect([
                { path: '', component: ComponentA, children: [{ path: 'b', component: ComponentB }] },
                { path: 'a', redirectTo: '' }
            ], 'a/b', function (t) { compareTrees(t, tree('b')); });
        });
        describe('aux split is in the middle', function () {
            it('should create a new url segment (non-terminal)', function () {
                checkRedirect([{
                        path: 'a',
                        children: [
                            { path: 'b', component: ComponentB },
                            { path: 'c', component: ComponentC, outlet: 'aux' },
                            { path: '', redirectTo: 'c', outlet: 'aux' }
                        ]
                    }], 'a/b', function (t) { compareTrees(t, tree('a/(b//aux:c)')); });
            });
            it('should create a new url segment (terminal)', function () {
                checkRedirect([{
                        path: 'a',
                        children: [
                            { path: 'b', component: ComponentB },
                            { path: 'c', component: ComponentC, outlet: 'aux' },
                            { path: '', pathMatch: 'full', redirectTo: 'c', outlet: 'aux' }
                        ]
                    }], 'a/b', function (t) { compareTrees(t, tree('a/b')); });
            });
        });
        describe('split at the end (no right child)', function () {
            it('should create a new child (non-terminal)', function () {
                checkRedirect([{
                        path: 'a',
                        children: [
                            { path: 'b', component: ComponentB }, { path: '', redirectTo: 'b' },
                            { path: 'c', component: ComponentC, outlet: 'aux' },
                            { path: '', redirectTo: 'c', outlet: 'aux' }
                        ]
                    }], 'a', function (t) { compareTrees(t, tree('a/(b//aux:c)')); });
            });
            it('should create a new child (terminal)', function () {
                checkRedirect([{
                        path: 'a',
                        children: [
                            { path: 'b', component: ComponentB }, { path: '', redirectTo: 'b' },
                            { path: 'c', component: ComponentC, outlet: 'aux' },
                            { path: '', terminal: true, redirectTo: 'c', outlet: 'aux' }
                        ]
                    }], 'a', function (t) { compareTrees(t, tree('a/(b//aux:c)')); });
            });
            it('should work only only primary outlet', function () {
                checkRedirect([{
                        path: 'a',
                        children: [
                            { path: 'b', component: ComponentB }, { path: '', redirectTo: 'b' },
                            { path: 'c', component: ComponentC, outlet: 'aux' }
                        ]
                    }], 'a/(aux:c)', function (t) { compareTrees(t, tree('a/(b//aux:c)')); });
            });
        });
        describe('split at the end (right child)', function () {
            it('should create a new child (non-terminal)', function () {
                checkRedirect([{
                        path: 'a',
                        children: [
                            { path: 'b', component: ComponentB, children: [{ path: 'd', component: ComponentB }] },
                            { path: '', redirectTo: 'b' }, {
                                path: 'c',
                                component: ComponentC,
                                outlet: 'aux',
                                children: [{ path: 'e', component: ComponentC }]
                            },
                            { path: '', redirectTo: 'c', outlet: 'aux' }
                        ]
                    }], 'a/(d//aux:e)', function (t) { compareTrees(t, tree('a/(b/d//aux:c/e)')); });
            });
            it('should not create a new child (terminal)', function () {
                var config = [{
                        path: 'a',
                        children: [
                            { path: 'b', component: ComponentB, children: [{ path: 'd', component: ComponentB }] },
                            { path: '', redirectTo: 'b' }, {
                                path: 'c',
                                component: ComponentC,
                                outlet: 'aux',
                                children: [{ path: 'e', component: ComponentC }]
                            },
                            { path: '', pathMatch: 'full', redirectTo: 'c', outlet: 'aux' }
                        ]
                    }];
                apply_redirects_1.applyRedirects(null, null, tree('a/(d//aux:e)'), config)
                    .subscribe(function (_) { throw 'Should not be reached'; }, function (e) { expect(e.message).toEqual('Cannot match any routes: \'a\''); });
            });
        });
    });
});
function checkRedirect(config, url, callback) {
    apply_redirects_1.applyRedirects(null, null, tree(url), config).subscribe(callback, function (e) { throw e; });
}
function tree(url) {
    return new url_tree_1.DefaultUrlSerializer().parse(url);
}
function compareTrees(actual, expected) {
    var serializer = new url_tree_1.DefaultUrlSerializer();
    var error = "\"" + serializer.serialize(actual) + "\" is not equal to \"" + serializer.serialize(expected) + "\"";
    compareSegments(actual.root, expected.root, error);
}
function compareSegments(actual, expected, error) {
    expect(actual).toBeDefined(error);
    expect(url_tree_1.equalPathsWithParams(actual.pathsWithParams, expected.pathsWithParams))
        .toEqual(true, error);
    expect(Object.keys(actual.children).length).toEqual(Object.keys(expected.children).length, error);
    Object.keys(expected.children).forEach(function (key) {
        compareSegments(actual.children[key], expected.children[key], error);
    });
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbHlfcmVkaXJlY3RzLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci90ZXN0L2FwcGx5X3JlZGlyZWN0cy5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCwyQkFBeUIsaUJBQWlCLENBQUMsQ0FBQTtBQUMzQyxtQkFBa0Isb0JBQW9CLENBQUMsQ0FBQTtBQUV2QyxnQ0FBNkIsd0JBQXdCLENBQUMsQ0FBQTtBQUV0RCxxQ0FBaUMsNkJBQTZCLENBQUMsQ0FBQTtBQUMvRCx5QkFBOEUsaUJBQWlCLENBQUMsQ0FBQTtBQUVoRyxRQUFRLENBQUMsZ0JBQWdCLEVBQUU7SUFFekIsRUFBRSxDQUFDLG1EQUFtRCxFQUFFO1FBQ3RELGFBQWEsQ0FDVCxDQUFDLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQ3BGLE1BQU0sRUFBRSxVQUFDLENBQVUsSUFBTyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMscUNBQXFDLEVBQUU7UUFDeEMsYUFBYSxDQUNULENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUMsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBQyxDQUFDLEVBQUUsTUFBTSxFQUNqRixVQUFDLENBQVUsSUFBTyxZQUFZLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7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