/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
require('rxjs/add/operator/map');
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var of_1 = require('rxjs/observable/of');
var index_1 = require('../index');
var testing_2 = require('../testing');
describe('Integration', function () {
    beforeEach(function () {
        testing_1.configureModule({
            imports: [testing_2.RouterTestingModule],
            providers: [index_1.provideRoutes([{ path: '', component: BlankCmp }, { path: 'simple', component: SimpleCmp }])],
            declarations: [
                BlankCmp, SimpleCmp, TeamCmp, UserCmp, StringLinkCmp, DummyLinkCmp, AbsoluteLinkCmp,
                RelativeLinkCmp, DummyLinkWithParentCmp, LinkWithQueryParamsAndFragment, CollectParamsCmp,
                QueryParamsAndFragmentCmp, StringLinkButtonCmp, WrapperCmp, LinkInNgIf,
                ComponentRecordingQueryParams, ComponentRecordingRoutePathAndUrl, RouteCmp
            ]
        });
    });
    it('should navigate with a provided config', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.navigateByUrl('/simple');
        advance(fixture);
        matchers_1.expect(location.path()).toEqual('/simple');
    })));
    it('should work when an outlet is in an ngIf', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([{
                path: 'child',
                component: LinkInNgIf,
                children: [{ path: 'simple', component: SimpleCmp }]
            }]);
        router.navigateByUrl('/child/simple');
        advance(fixture);
        matchers_1.expect(location.path()).toEqual('/child/simple');
    })));
    it('should update location when navigating', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([{ path: 'team/:id', component: TeamCmp }]);
        router.navigateByUrl('/team/22');
        advance(fixture);
        matchers_1.expect(location.path()).toEqual('/team/22');
        router.navigateByUrl('/team/33');
        advance(fixture);
        matchers_1.expect(location.path()).toEqual('/team/33');
    })));
    it('should navigate back and forward', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([{
                path: 'team/:id',
                component: TeamCmp,
                children: [
                    { path: 'simple', component: SimpleCmp }, { path: 'user/:name', component: UserCmp }
                ]
            }]);
        router.navigateByUrl('/team/33/simple');
        advance(fixture);
        matchers_1.expect(location.path()).toEqual('/team/33/simple');
        router.navigateByUrl('/team/22/user/victor');
        advance(fixture);
        location.back();
        advance(fixture);
        matchers_1.expect(location.path()).toEqual('/team/33/simple');
        location.forward();
        advance(fixture);
        matchers_1.expect(location.path()).toEqual('/team/22/user/victor');
    })));
    it('should navigate when locations changes', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([{
                path: 'team/:id',
                component: TeamCmp,
                children: [{ path: 'user/:name', component: UserCmp }]
            }]);
        var recordedEvents = [];
        router.events.forEach(function (e) { return recordedEvents.push(e); });
        router.navigateByUrl('/team/22/user/victor');
        advance(fixture);
        location.simulateHashChange('/team/22/user/fedor');
        advance(fixture);
        location.simulateUrlPop('/team/22/user/fedor');
        advance(fixture);
        matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('team 22 [ user fedor, right:  ]');
        expectEvents(recordedEvents, [
            [index_1.NavigationStart, '/team/22/user/victor'], [index_1.RoutesRecognized, '/team/22/user/victor'],
            [index_1.NavigationEnd, '/team/22/user/victor'],
            [index_1.NavigationStart, '/team/22/user/fedor'], [index_1.RoutesRecognized, '/team/22/user/fedor'],
            [index_1.NavigationEnd, '/team/22/user/fedor']
        ]);
    })));
    it('should update the location when the matched route does not change', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([{ path: '**', component: CollectParamsCmp }]);
        router.navigateByUrl('/one/two');
        advance(fixture);
        var cmp = fixture.debugElement.children[1].componentInstance;
        matchers_1.expect(location.path()).toEqual('/one/two');
        matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('collect-params');
        matchers_1.expect(cmp.recordedUrls()).toEqual(['one/two']);
        router.navigateByUrl('/three/four');
        advance(fixture);
        matchers_1.expect(location.path()).toEqual('/three/four');
        matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('collect-params');
        matchers_1.expect(cmp.recordedUrls()).toEqual(['one/two', 'three/four']);
    })));
    it('should support secondary routes', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([{
                path: 'team/:id',
                component: TeamCmp,
                children: [
                    { path: 'user/:name', component: UserCmp },
                    { path: 'simple', component: SimpleCmp, outlet: 'right' }
                ]
            }]);
        router.navigateByUrl('/team/22/(user/victor//right:simple)');
        advance(fixture);
        matchers_1.expect(fixture.debugElement.nativeElement)
            .toHaveText('team 22 [ user victor, right: simple ]');
    })));
    it('should deactivate outlets', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([{
                path: 'team/:id',
                component: TeamCmp,
                children: [
                    { path: 'user/:name', component: UserCmp },
                    { path: 'simple', component: SimpleCmp, outlet: 'right' }
                ]
            }]);
        router.navigateByUrl('/team/22/(user/victor//right:simple)');
        advance(fixture);
        router.navigateByUrl('/team/22/user/victor');
        advance(fixture);
        matchers_1.expect(fixture.debugElement.nativeElement)
            .toHaveText('team 22 [ user victor, right:  ]');
    })));
    it('should deactivate nested outlets', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([
            {
                path: 'team/:id',
                component: TeamCmp,
                children: [
                    { path: 'user/:name', component: UserCmp },
                    { path: 'simple', component: SimpleCmp, outlet: 'right' }
                ]
            },
            { path: '', component: BlankCmp }
        ]);
        router.navigateByUrl('/team/22/(user/victor//right:simple)');
        advance(fixture);
        router.navigateByUrl('/');
        advance(fixture);
        matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
    })));
    it('should set query params and fragment', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([{ path: 'query', component: QueryParamsAndFragmentCmp }]);
        router.navigateByUrl('/query?name=1#fragment1');
        advance(fixture);
        matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('query: 1 fragment: fragment1');
        router.navigateByUrl('/query?name=2#fragment2');
        advance(fixture);
        matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('query: 2 fragment: fragment2');
    })));
    it('should not push query params into components that will be deactivated', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
        router.resetConfig([
            { path: '', component: ComponentRecordingQueryParams },
            { path: 'simple', component: SimpleCmp }
        ]);
        var fixture = createRoot(tcb, router, RootCmp);
        router.navigateByUrl('/?a=v1');
        advance(fixture);
        var c = fixture.debugElement.children[1].componentInstance;
        matchers_1.expect(c.recordedQueryParams).toEqual([{}, { a: 'v1' }]);
        router.navigateByUrl('/simple?a=v2');
        advance(fixture);
        matchers_1.expect(c.recordedQueryParams).toEqual([{}, { a: 'v1' }]);
    })));
    it('should push params only when they change', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([{
                path: 'team/:id',
                component: TeamCmp,
                children: [{ path: 'user/:name', component: UserCmp }]
            }]);
        router.navigateByUrl('/team/22/user/victor');
        advance(fixture);
        var team = fixture.debugElement.children[1].componentInstance;
        var user = fixture.debugElement.children[1].children[1].componentInstance;
        matchers_1.expect(team.recordedParams).toEqual([{ id: '22' }]);
        matchers_1.expect(user.recordedParams).toEqual([{ name: 'victor' }]);
        router.navigateByUrl('/team/22/user/fedor');
        advance(fixture);
        matchers_1.expect(team.recordedParams).toEqual([{ id: '22' }]);
        matchers_1.expect(user.recordedParams).toEqual([{ name: 'victor' }, { name: 'fedor' }]);
    })));
    it('should work when navigating to /', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([
            { path: '', pathMatch: 'full', component: SimpleCmp },
            { path: 'user/:name', component: UserCmp }
        ]);
        router.navigateByUrl('/user/victor');
        advance(fixture);
        matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('user victor');
        router.navigateByUrl('/');
        advance(fixture);
        matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('simple');
    })));
    it('should cancel in-flight navigations', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([{ path: 'user/:name', component: UserCmp }]);
        var recordedEvents = [];
        router.events.forEach(function (e) { return recordedEvents.push(e); });
        router.navigateByUrl('/user/init');
        advance(fixture);
        var user = fixture.debugElement.children[1].componentInstance;
        var r1, r2;
        router.navigateByUrl('/user/victor').then(function (_) { return r1 = _; });
        router.navigateByUrl('/user/fedor').then(function (_) { return r2 = _; });
        advance(fixture);
        matchers_1.expect(r1).toEqual(false); // returns false because it was canceled
        matchers_1.expect(r2).toEqual(true); // returns true because it was successful
        matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('user fedor');
        matchers_1.expect(user.recordedParams).toEqual([{ name: 'init' }, { name: 'fedor' }]);
        expectEvents(recordedEvents, [
            [index_1.NavigationStart, '/user/init'], [index_1.RoutesRecognized, '/user/init'],
            [index_1.NavigationEnd, '/user/init'],
            [index_1.NavigationStart, '/user/victor'], [index_1.NavigationStart, '/user/fedor'],
            [index_1.NavigationCancel, '/user/victor'], [index_1.RoutesRecognized, '/user/fedor'],
            [index_1.NavigationEnd, '/user/fedor']
        ]);
    })));
    it('should handle failed navigations gracefully', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([{ path: 'user/:name', component: UserCmp }]);
        var recordedEvents = [];
        router.events.forEach(function (e) { return recordedEvents.push(e); });
        var e;
        router.navigateByUrl('/invalid').catch(function (_) { return e = _; });
        advance(fixture);
        matchers_1.expect(e.message).toContain('Cannot match any routes');
        router.navigateByUrl('/user/fedor');
        advance(fixture);
        matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('user fedor');
        expectEvents(recordedEvents, [
            [index_1.NavigationStart, '/invalid'], [index_1.NavigationError, '/invalid'],
            [index_1.NavigationStart, '/user/fedor'], [index_1.RoutesRecognized, '/user/fedor'],
            [index_1.NavigationEnd, '/user/fedor']
        ]);
    })));
    it('should replace state when path is equal to current path', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([{
                path: 'team/:id',
                component: TeamCmp,
                children: [
                    { path: 'simple', component: SimpleCmp }, { path: 'user/:name', component: UserCmp }
                ]
            }]);
        router.navigateByUrl('/team/33/simple');
        advance(fixture);
        router.navigateByUrl('/team/22/user/victor');
        advance(fixture);
        router.navigateByUrl('/team/22/user/victor');
        advance(fixture);
        location.back();
        advance(fixture);
        matchers_1.expect(location.path()).toEqual('/team/33/simple');
    })));
    it('should handle componentless paths', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
        var fixture = createRoot(tcb, router, RootCmpWithTwoOutlets);
        router.resetConfig([
            {
                path: 'parent/:id',
                children: [
                    { path: 'simple', component: SimpleCmp },
                    { path: 'user/:name', component: UserCmp, outlet: 'right' }
                ]
            },
            { path: 'user/:name', component: UserCmp }
        ]);
        // navigate to a componentless route
        router.navigateByUrl('/parent/11/(simple//right:user/victor)');
        advance(fixture);
        matchers_1.expect(location.path()).toEqual('/parent/11/(simple//right:user/victor)');
        matchers_1.expect(fixture.debugElement.nativeElement)
            .toHaveText('primary [simple] right [user victor]');
        // navigate to the same route with different params (reuse)
        router.navigateByUrl('/parent/22/(simple//right:user/fedor)');
        advance(fixture);
        matchers_1.expect(location.path()).toEqual('/parent/22/(simple//right:user/fedor)');
        matchers_1.expect(fixture.debugElement.nativeElement)
            .toHaveText('primary [simple] right [user fedor]');
        // navigate to a normal route (check deactivation)
        router.navigateByUrl('/user/victor');
        advance(fixture);
        matchers_1.expect(location.path()).toEqual('/user/victor');
        matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('primary [user victor] right []');
        // navigate back to a componentless route
        router.navigateByUrl('/parent/11/(simple//right:user/victor)');
        advance(fixture);
        matchers_1.expect(location.path()).toEqual('/parent/11/(simple//right:user/victor)');
        matchers_1.expect(fixture.debugElement.nativeElement)
            .toHaveText('primary [simple] right [user victor]');
    })));
    it('should emit an event when an outlet gets activated', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
        var Container = (function () {
            function Container() {
                this.activations = [];
                this.deactivations = [];
            }
            Container.prototype.recordActivate = function (component) { this.activations.push(component); };
            Container.prototype.recordDeactivate = function (component) { this.deactivations.push(component); };
            /** @nocollapse */
            Container.decorators = [
                { type: core_1.Component, args: [{
                            selector: 'container',
                            template: "<router-outlet (activate)=\"recordActivate($event)\" (deactivate)=\"recordDeactivate($event)\"></router-outlet>"
                        },] },
            ];
            return Container;
        }());
        var fixture = createRoot(tcb, router, Container);
        var cmp = fixture.debugElement.componentInstance;
        router.resetConfig([{ path: 'blank', component: BlankCmp }, { path: 'simple', component: SimpleCmp }]);
        cmp.activations = [];
        cmp.deactivations = [];
        router.navigateByUrl('/blank');
        advance(fixture);
        matchers_1.expect(cmp.activations.length).toEqual(1);
        matchers_1.expect(cmp.activations[0] instanceof BlankCmp).toBe(true);
        router.navigateByUrl('/simple');
        advance(fixture);
        matchers_1.expect(cmp.activations.length).toEqual(2);
        matchers_1.expect(cmp.activations[1] instanceof SimpleCmp).toBe(true);
        matchers_1.expect(cmp.deactivations.length).toEqual(2);
        matchers_1.expect(cmp.deactivations[1] instanceof BlankCmp).toBe(true);
    })));
    it('should update url and router state before activating components', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
        var fixture = createRoot(tcb, router, RootCmp);
        router.resetConfig([{ path: 'cmp', component: ComponentRecordingRoutePathAndUrl }]);
        router.navigateByUrl('/cmp');
        advance(fixture);
        var cmp = fixture.debugElement.children[1].componentInstance;
        matchers_1.expect(cmp.url).toBe('/cmp');
        matchers_1.expect(cmp.path.length).toEqual(2);
    })));
    describe('data', function () {
        var ResolveSix = (function () {
            function ResolveSix() {
            }
            ResolveSix.prototype.resolve = function (route, state) { return 6; };
            return ResolveSix;
        }());
        beforeEach(function () {
            testing_1.addProviders([
                { provide: 'resolveTwo', useValue: function (a, b) { return 2; } },
                { provide: 'resolveFour', useValue: function (a, b) { return 4; } },
                { provide: 'resolveSix', useClass: ResolveSix }
            ]);
        });
        it('should provide resolved data', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
            var fixture = createRoot(tcb, router, RootCmpWithTwoOutlets);
            router.resetConfig([{
                    path: 'parent/:id',
                    data: { one: 1 },
                    resolve: { two: 'resolveTwo' },
                    children: [
                        { path: '', data: { three: 3 }, resolve: { four: 'resolveFour' }, component: RouteCmp },
                        {
                            path: '',
                            data: { five: 5 },
                            resolve: { six: 'resolveSix' },
                            component: RouteCmp,
                            outlet: 'right'
                        }
                    ]
                }]);
            router.navigateByUrl('/parent/1');
            advance(fixture);
            var primaryCmp = fixture.debugElement.children[1].componentInstance;
            var rightCmp = fixture.debugElement.children[3].componentInstance;
            matchers_1.expect(primaryCmp.route.snapshot.data).toEqual({ one: 1, two: 2, three: 3, four: 4 });
            matchers_1.expect(rightCmp.route.snapshot.data).toEqual({ one: 1, two: 2, five: 5, six: 6 });
            var primaryRecorded = [];
            primaryCmp.route.data.forEach(function (rec) { return primaryRecorded.push(rec); });
            var rightRecorded = [];
            rightCmp.route.data.forEach(function (rec) { return rightRecorded.push(rec); });
            router.navigateByUrl('/parent/2');
            advance(fixture);
            matchers_1.expect(primaryRecorded).toEqual([
                { one: 1, three: 3, two: 2, four: 4 }, { one: 1, three: 3, two: 2, four: 4 }
            ]);
            matchers_1.expect(rightRecorded).toEqual([
                { one: 1, five: 5, two: 2, six: 6 }, { one: 1, five: 5, two: 2, six: 6 }
            ]);
        })));
    });
    describe('router links', function () {
        it('should support string router links', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
            var fixture = createRoot(tcb, router, RootCmp);
            router.resetConfig([{
                    path: 'team/:id',
                    component: TeamCmp,
                    children: [
                        { path: 'link', component: StringLinkCmp },
                        { path: 'simple', component: SimpleCmp }
                    ]
                }]);
            router.navigateByUrl('/team/22/link');
            advance(fixture);
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('team 22 [ link, right:  ]');
            var native = fixture.debugElement.nativeElement.querySelector('a');
            matchers_1.expect(native.getAttribute('href')).toEqual('/team/33/simple');
            native.click();
            advance(fixture);
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('team 33 [ simple, right:  ]');
        })));
        it('should not preserve query params and fragment by default', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
            var RootCmpWithLink = (function () {
                function RootCmpWithLink() {
                }
                /** @nocollapse */
                RootCmpWithLink.decorators = [
                    { type: core_1.Component, args: [{
                                selector: 'someRoot',
                                template: "<router-outlet></router-outlet><a routerLink=\"/home\">Link</a>",
                                directives: index_1.ROUTER_DIRECTIVES
                            },] },
                ];
                return RootCmpWithLink;
            }());
            var fixture = createRoot(tcb, router, RootCmpWithLink);
            router.resetConfig([{ path: 'home', component: SimpleCmp }]);
            var native = fixture.debugElement.nativeElement.querySelector('a');
            router.navigateByUrl('/home?q=123#fragment');
            advance(fixture);
            matchers_1.expect(native.getAttribute('href')).toEqual('/home');
        })));
        it('should update hrefs when query params or fragment change', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
            var RootCmpWithLink = (function () {
                function RootCmpWithLink() {
                }
                /** @nocollapse */
                RootCmpWithLink.decorators = [
                    { type: core_1.Component, args: [{
                                selector: 'someRoot',
                                template: "<router-outlet></router-outlet><a routerLink=\"/home\" preserveQueryParams preserveFragment>Link</a>",
                                directives: index_1.ROUTER_DIRECTIVES
                            },] },
                ];
                return RootCmpWithLink;
            }());
            var fixture = createRoot(tcb, router, RootCmpWithLink);
            router.resetConfig([{ path: 'home', component: SimpleCmp }]);
            var native = fixture.debugElement.nativeElement.querySelector('a');
            router.navigateByUrl('/home?q=123');
            advance(fixture);
            matchers_1.expect(native.getAttribute('href')).toEqual('/home?q=123');
            router.navigateByUrl('/home?q=456');
            advance(fixture);
            matchers_1.expect(native.getAttribute('href')).toEqual('/home?q=456');
            router.navigateByUrl('/home?q=456#1');
            advance(fixture);
            matchers_1.expect(native.getAttribute('href')).toEqual('/home?q=456#1');
        })));
        it('should support using links on non-a tags', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
            var fixture = createRoot(tcb, router, RootCmp);
            router.resetConfig([{
                    path: 'team/:id',
                    component: TeamCmp,
                    children: [
                        { path: 'link', component: StringLinkButtonCmp },
                        { path: 'simple', component: SimpleCmp }
                    ]
                }]);
            router.navigateByUrl('/team/22/link');
            advance(fixture);
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('team 22 [ link, right:  ]');
            var native = fixture.debugElement.nativeElement.querySelector('button');
            native.click();
            advance(fixture);
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('team 33 [ simple, right:  ]');
        })));
        it('should support absolute router links', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
            var fixture = createRoot(tcb, router, RootCmp);
            router.resetConfig([{
                    path: 'team/:id',
                    component: TeamCmp,
                    children: [
                        { path: 'link', component: AbsoluteLinkCmp },
                        { path: 'simple', component: SimpleCmp }
                    ]
                }]);
            router.navigateByUrl('/team/22/link');
            advance(fixture);
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('team 22 [ link, right:  ]');
            var native = fixture.debugElement.nativeElement.querySelector('a');
            matchers_1.expect(native.getAttribute('href')).toEqual('/team/33/simple');
            native.click();
            advance(fixture);
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('team 33 [ simple, right:  ]');
        })));
        it('should support relative router links', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
            var fixture = createRoot(tcb, router, RootCmp);
            router.resetConfig([{
                    path: 'team/:id',
                    component: TeamCmp,
                    children: [
                        { path: 'link', component: RelativeLinkCmp },
                        { path: 'simple', component: SimpleCmp }
                    ]
                }]);
            router.navigateByUrl('/team/22/link');
            advance(fixture);
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('team 22 [ link, right:  ]');
            var native = fixture.debugElement.nativeElement.querySelector('a');
            matchers_1.expect(native.getAttribute('href')).toEqual('/team/22/simple');
            native.click();
            advance(fixture);
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('team 22 [ simple, right:  ]');
        })));
        it('should support top-level link', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder], function (router, tcb) {
            var fixture = createRoot(tcb, router, RelativeLinkInIfCmp);
            advance(fixture);
            router.resetConfig([{ path: 'simple', component: SimpleCmp }, { path: '', component: BlankCmp }]);
            router.navigateByUrl('/');
            advance(fixture);
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText(' ');
            var cmp = fixture.debugElement.componentInstance;
            cmp.show = true;
            advance(fixture);
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('link ');
            var native = fixture.debugElement.nativeElement.querySelector('a');
            matchers_1.expect(native.getAttribute('href')).toEqual('/simple');
            native.click();
            advance(fixture);
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('link simple');
        })));
        it('should support query params and fragments', testing_1.fakeAsync(testing_1.inject([index_1.Router, common_1.Location, testing_1.TestComponentBuilder], function (router, location, tcb) {
            var fixture = createRoot(tcb, router, RootCmp);
            router.resetConfig([{
                    path: 'team/:id',
                    component: TeamCmp,
                    children: [
                        { path: 'link', component: LinkWithQueryParamsAndFragment },
                        { path: 'simple', component: SimpleCmp }
                    ]
                }]);
            router.navigateByUrl('/team/22/link');
            advance(fixture);
            var native = fixture.debugElement.nativeElement.querySelector('a');
            matchers_1.expect(native.getAttribute('href')).toEqual('/team/22/simple?q=1#f');
            native.click();
            advance(fixture);
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('team 22 [ simple, right:  ]');
            matchers_1.expect(location.path()).toEqual('/team/22/simple?q=1#f');
        })));
    });
    describe('redirects', function () {
        it('should work', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
            var fixture = createRoot(tcb, router, RootCmp);
            router.resetConfig([
                { path: 'old/team/:id', redirectTo: 'team/:id' },
                { path: 'team/:id', component: TeamCmp }
            ]);
            router.navigateByUrl('old/team/22');
            advance(fixture);
            matchers_1.expect(location.path()).toEqual('/team/22');
        })));
    });
    describe('guards', function () {
        describe('CanActivate', function () {
            describe('should not activate a route when CanActivate returns false', function () {
                beforeEach(function () {
                    testing_1.addProviders([{ provide: 'alwaysFalse', useValue: function (a, b) { return false; } }]);
                });
                it('works', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
                    var fixture = createRoot(tcb, router, RootCmp);
                    router.resetConfig([{ path: 'team/:id', component: TeamCmp, canActivate: ['alwaysFalse'] }]);
                    router.navigateByUrl('/team/22');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/');
                })));
            });
            describe('should not activate a route when CanActivate returns false (componentless route)', function () {
                beforeEach(function () {
                    testing_1.addProviders([{ provide: 'alwaysFalse', useValue: function (a, b) { return false; } }]);
                });
                it('works', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
                    var fixture = createRoot(tcb, router, RootCmp);
                    router.resetConfig([{
                            path: 'parent',
                            canActivate: ['alwaysFalse'],
                            children: [{ path: 'team/:id', component: TeamCmp }]
                        }]);
                    router.navigateByUrl('parent/team/22');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/');
                })));
            });
            describe('should activate a route when CanActivate returns true', function () {
                beforeEach(function () {
                    testing_1.addProviders([{
                            provide: 'alwaysTrue',
                            useValue: function (a, s) { return true; }
                        }]);
                });
                it('works', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
                    var fixture = createRoot(tcb, router, RootCmp);
                    router.resetConfig([{ path: 'team/:id', component: TeamCmp, canActivate: ['alwaysTrue'] }]);
                    router.navigateByUrl('/team/22');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/team/22');
                })));
            });
            describe('should work when given a class', function () {
                var AlwaysTrue = (function () {
                    function AlwaysTrue() {
                    }
                    AlwaysTrue.prototype.canActivate = function (route, state) {
                        return true;
                    };
                    return AlwaysTrue;
                }());
                beforeEach(function () { testing_1.addProviders([AlwaysTrue]); });
                it('works', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
                    var fixture = createRoot(tcb, router, RootCmp);
                    router.resetConfig([{ path: 'team/:id', component: TeamCmp, canActivate: [AlwaysTrue] }]);
                    router.navigateByUrl('/team/22');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/team/22');
                })));
            });
            describe('should work when returns an observable', function () {
                beforeEach(function () {
                    testing_1.addProviders([{
                            provide: 'CanActivate',
                            useValue: function (a, b) { return of_1.of(false); }
                        }]);
                });
                it('works', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
                    var fixture = createRoot(tcb, router, RootCmp);
                    router.resetConfig([{ path: 'team/:id', component: TeamCmp, canActivate: ['CanActivate'] }]);
                    router.navigateByUrl('/team/22');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/');
                })));
            });
            describe('should work when returns a promise', function () {
                beforeEach(function () {
                    testing_1.addProviders([{
                            provide: 'CanActivate',
                            useValue: function (a, b) {
                                if (a.params['id'] == '22') {
                                    return Promise.resolve(true);
                                }
                                else {
                                    return Promise.resolve(false);
                                }
                            }
                        }]);
                });
                it('works', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
                    var fixture = createRoot(tcb, router, RootCmp);
                    router.resetConfig([{ path: 'team/:id', component: TeamCmp, canActivate: ['CanActivate'] }]);
                    router.navigateByUrl('/team/22');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/team/22');
                    router.navigateByUrl('/team/33');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/team/22');
                })));
            });
        });
        describe('CanDeactivate', function () {
            describe('should not deactivate a route when CanDeactivate returns false', function () {
                beforeEach(function () {
                    testing_1.addProviders([
                        {
                            provide: 'CanDeactivateParent',
                            useValue: function (c, a, b) {
                                return a.params['id'] === '22';
                            }
                        },
                        {
                            provide: 'CanDeactivateTeam',
                            useValue: function (c, a, b) {
                                return c.route.snapshot.params['id'] === '22';
                            }
                        },
                        {
                            provide: 'CanDeactivateUser',
                            useValue: function (c, a, b) {
                                return a.params['name'] === 'victor';
                            }
                        }
                    ]);
                });
                it('works', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
                    var fixture = createRoot(tcb, router, RootCmp);
                    router.resetConfig([
                        { path: 'team/:id', component: TeamCmp, canDeactivate: ['CanDeactivateTeam'] }
                    ]);
                    router.navigateByUrl('/team/22');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/team/22');
                    var successStatus;
                    router.navigateByUrl('/team/33').then(function (res) { return successStatus = res; });
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/team/33');
                    matchers_1.expect(successStatus).toEqual(true);
                    var canceledStatus;
                    router.navigateByUrl('/team/44').then(function (res) { return canceledStatus = res; });
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/team/33');
                    matchers_1.expect(canceledStatus).toEqual(false);
                })));
                it('works (componentless route)', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
                    var fixture = createRoot(tcb, router, RootCmp);
                    router.resetConfig([{
                            path: 'parent/:id',
                            canDeactivate: ['CanDeactivateParent'],
                            children: [{ path: 'simple', component: SimpleCmp }]
                        }]);
                    router.navigateByUrl('/parent/22/simple');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/parent/22/simple');
                    router.navigateByUrl('/parent/33/simple');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/parent/33/simple');
                    router.navigateByUrl('/parent/44/simple');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/parent/33/simple');
                })));
                it('works with a nested route', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
                    var fixture = createRoot(tcb, router, RootCmp);
                    router.resetConfig([{
                            path: 'team/:id',
                            component: TeamCmp,
                            children: [
                                { path: '', pathMatch: 'full', component: SimpleCmp }, {
                                    path: 'user/:name',
                                    component: UserCmp,
                                    canDeactivate: ['CanDeactivateUser']
                                }
                            ]
                        }]);
                    router.navigateByUrl('/team/22/user/victor');
                    advance(fixture);
                    // this works because we can deactivate victor
                    router.navigateByUrl('/team/33');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/team/33');
                    router.navigateByUrl('/team/33/user/fedor');
                    advance(fixture);
                    // this doesn't work cause we cannot deactivate fedor
                    router.navigateByUrl('/team/44');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/team/33/user/fedor');
                })));
            });
            describe('should work when given a class', function () {
                var AlwaysTrue = (function () {
                    function AlwaysTrue() {
                    }
                    AlwaysTrue.prototype.canDeactivate = function (component, route, state) {
                        return true;
                    };
                    return AlwaysTrue;
                }());
                beforeEach(function () { testing_1.addProviders([AlwaysTrue]); });
                it('works', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
                    var fixture = createRoot(tcb, router, RootCmp);
                    router.resetConfig([{ path: 'team/:id', component: TeamCmp, canDeactivate: [AlwaysTrue] }]);
                    router.navigateByUrl('/team/22');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/team/22');
                    router.navigateByUrl('/team/33');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/team/33');
                })));
            });
        });
        describe('CanActivateChild', function () {
            describe('should be invoked when activating a child', function () {
                beforeEach(function () {
                    testing_1.addProviders([{
                            provide: 'alwaysFalse',
                            useValue: function (a, b) { return a.params.id === '22'; }
                        }]);
                });
                it('works', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
                    var fixture = createRoot(tcb, router, RootCmp);
                    router.resetConfig([{
                            path: '',
                            canActivateChild: ['alwaysFalse'],
                            children: [{ path: 'team/:id', component: TeamCmp }]
                        }]);
                    router.navigateByUrl('/team/22');
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/team/22');
                    router.navigateByUrl('/team/33').catch(function () { });
                    advance(fixture);
                    matchers_1.expect(location.path()).toEqual('/team/22');
                })));
            });
        });
        describe('should work when returns an observable', function () {
            beforeEach(function () {
                testing_1.addProviders([{
                        provide: 'CanDeactivate',
                        useValue: function (c, a, b) {
                            return of_1.of(false);
                        }
                    }]);
            });
            it('works', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
                var fixture = createRoot(tcb, router, RootCmp);
                router.resetConfig([{ path: 'team/:id', component: TeamCmp, canDeactivate: ['CanDeactivate'] }]);
                router.navigateByUrl('/team/22');
                advance(fixture);
                matchers_1.expect(location.path()).toEqual('/team/22');
                router.navigateByUrl('/team/33');
                advance(fixture);
                matchers_1.expect(location.path()).toEqual('/team/22');
            })));
        });
    });
    describe('routerActiveLink', function () {
        it('should set the class when the link is active (a tag)', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
            var fixture = createRoot(tcb, router, RootCmp);
            router.resetConfig([{
                    path: 'team/:id',
                    component: TeamCmp,
                    children: [{
                            path: 'link',
                            component: DummyLinkCmp,
                            children: [{ path: 'simple', component: SimpleCmp }, { path: '', component: BlankCmp }]
                        }]
                }]);
            router.navigateByUrl('/team/22/link;exact=true');
            advance(fixture);
            matchers_1.expect(location.path()).toEqual('/team/22/link;exact=true');
            var nativeLink = fixture.debugElement.nativeElement.querySelector('a');
            var nativeButton = fixture.debugElement.nativeElement.querySelector('button');
            matchers_1.expect(nativeLink.className).toEqual('active');
            matchers_1.expect(nativeButton.className).toEqual('active');
            router.navigateByUrl('/team/22/link/simple');
            advance(fixture);
            matchers_1.expect(location.path()).toEqual('/team/22/link/simple');
            matchers_1.expect(nativeLink.className).toEqual('');
            matchers_1.expect(nativeButton.className).toEqual('');
        })));
        it('should not set the class until the first navigation succeeds', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
            var RootCmpWithLink = (function () {
                function RootCmpWithLink() {
                }
                /** @nocollapse */
                RootCmpWithLink.decorators = [
                    { type: core_1.Component, args: [{
                                template: '<router-outlet></router-outlet><a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}" >'
                            },] },
                ];
                return RootCmpWithLink;
            }());
            var f = tcb.createFakeAsync(RootCmpWithLink);
            advance(f);
            var link = f.debugElement.nativeElement.querySelector('a');
            matchers_1.expect(link.className).toEqual('');
            router.initialNavigation();
            advance(f);
            matchers_1.expect(link.className).toEqual('active');
        })));
        it('should set the class on a parent element when the link is active', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
            var fixture = createRoot(tcb, router, RootCmp);
            router.resetConfig([{
                    path: 'team/:id',
                    component: TeamCmp,
                    children: [{
                            path: 'link',
                            component: DummyLinkWithParentCmp,
                            children: [{ path: 'simple', component: SimpleCmp }, { path: '', component: BlankCmp }]
                        }]
                }]);
            router.navigateByUrl('/team/22/link;exact=true');
            advance(fixture);
            matchers_1.expect(location.path()).toEqual('/team/22/link;exact=true');
            var native = fixture.debugElement.nativeElement.querySelector('link-parent');
            matchers_1.expect(native.className).toEqual('active');
            router.navigateByUrl('/team/22/link/simple');
            advance(fixture);
            matchers_1.expect(location.path()).toEqual('/team/22/link/simple');
            matchers_1.expect(native.className).toEqual('');
        })));
        it('should set the class when the link is active', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location], function (router, tcb, location) {
            var fixture = createRoot(tcb, router, RootCmp);
            router.resetConfig([{
                    path: 'team/:id',
                    component: TeamCmp,
                    children: [{
                            path: 'link',
                            component: DummyLinkCmp,
                            children: [{ path: 'simple', component: SimpleCmp }, { path: '', component: BlankCmp }]
                        }]
                }]);
            router.navigateByUrl('/team/22/link');
            advance(fixture);
            matchers_1.expect(location.path()).toEqual('/team/22/link');
            var native = fixture.debugElement.nativeElement.querySelector('a');
            matchers_1.expect(native.className).toEqual('active');
            router.navigateByUrl('/team/22/link/simple');
            advance(fixture);
            matchers_1.expect(location.path()).toEqual('/team/22/link/simple');
            matchers_1.expect(native.className).toEqual('active');
        })));
    });
    describe('lazy loading', function () {
        it('works', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location, core_1.NgModuleFactoryLoader], function (router, tcb, location, loader) {
            var ParentLazyLoadedComponent = (function () {
                function ParentLazyLoadedComponent() {
                }
                /** @nocollapse */
                ParentLazyLoadedComponent.decorators = [
                    { type: core_1.Component, args: [{
                                selector: 'lazy',
                                template: 'lazy-loaded-parent [<router-outlet></router-outlet>]',
                                directives: index_1.ROUTER_DIRECTIVES
                            },] },
                ];
                return ParentLazyLoadedComponent;
            }());
            var ChildLazyLoadedComponent = (function () {
                function ChildLazyLoadedComponent() {
                }
                /** @nocollapse */
                ChildLazyLoadedComponent.decorators = [
                    { type: core_1.Component, args: [{ selector: 'lazy', template: 'lazy-loaded-child' },] },
                ];
                return ChildLazyLoadedComponent;
            }());
            var LoadedModule = (function () {
                function LoadedModule() {
                }
                /** @nocollapse */
                LoadedModule.decorators = [
                    { type: core_1.NgModule, args: [{
                                declarations: [ParentLazyLoadedComponent, ChildLazyLoadedComponent],
                                providers: [index_1.provideRoutes([{
                                            path: 'loaded',
                                            component: ParentLazyLoadedComponent,
                                            children: [{ path: 'child', component: ChildLazyLoadedComponent }]
                                        }])],
                                imports: [index_1.RouterModuleWithoutProviders],
                                precompile: [ParentLazyLoadedComponent, ChildLazyLoadedComponent]
                            },] },
                ];
                return LoadedModule;
            }());
            loader.stubbedModules = { expected: LoadedModule };
            var fixture = createRoot(tcb, router, RootCmp);
            router.resetConfig([{ path: 'lazy', loadChildren: 'expected' }]);
            router.navigateByUrl('/lazy/loaded/child');
            advance(fixture);
            matchers_1.expect(location.path()).toEqual('/lazy/loaded/child');
            matchers_1.expect(fixture.debugElement.nativeElement)
                .toHaveText('lazy-loaded-parent [lazy-loaded-child]');
        })));
        it('should use the injector of the lazily-loaded configuration', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location, core_1.NgModuleFactoryLoader], function (router, tcb, location, loader) {
            var LazyLoadedService = (function () {
                function LazyLoadedService() {
                }
                return LazyLoadedService;
            }());
            var LazyLoadedComponent = (function () {
                function LazyLoadedComponent(service) {
                }
                /** @nocollapse */
                LazyLoadedComponent.decorators = [
                    { type: core_1.Component, args: [{ selector: 'lazy', template: 'lazy-loaded', directives: index_1.ROUTER_DIRECTIVES },] },
                ];
                /** @nocollapse */
                LazyLoadedComponent.ctorParameters = [
                    { type: LazyLoadedService, },
                ];
                return LazyLoadedComponent;
            }());
            var LoadedModule = (function () {
                function LoadedModule() {
                }
                /** @nocollapse */
                LoadedModule.decorators = [
                    { type: core_1.NgModule, args: [{
                                precompile: [LazyLoadedComponent],
                                declarations: [LazyLoadedComponent],
                                imports: [index_1.RouterModuleWithoutProviders],
                                providers: [
                                    LazyLoadedService, index_1.provideRoutes([{
                                            path: '',
                                            canActivate: ['alwaysTrue'],
                                            children: [{ path: 'loaded', component: LazyLoadedComponent }]
                                        }]),
                                    { provide: 'alwaysTrue', useValue: function () { return true; } }
                                ]
                            },] },
                ];
                return LoadedModule;
            }());
            loader.stubbedModules = { expected: LoadedModule };
            var fixture = createRoot(tcb, router, RootCmp);
            router.resetConfig([{ path: 'lazy', loadChildren: 'expected' }]);
            router.navigateByUrl('/lazy/loaded');
            advance(fixture);
            matchers_1.expect(location.path()).toEqual('/lazy/loaded');
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('lazy-loaded');
        })));
        it('error emit an error when cannot load a config', testing_1.fakeAsync(testing_1.inject([index_1.Router, testing_1.TestComponentBuilder, common_1.Location, core_1.NgModuleFactoryLoader], function (router, tcb, location, loader) {
            loader.stubbedModules = {};
            var fixture = createRoot(tcb, router, RootCmp);
            router.resetConfig([{ path: 'lazy', loadChildren: 'invalid' }]);
            var recordedEvents = [];
            router.events.forEach(function (e) { return recordedEvents.push(e); });
            router.navigateByUrl('/lazy/loaded').catch(function (s) { });
            advance(fixture);
            matchers_1.expect(location.path()).toEqual('/');
            expectEvents(recordedEvents, [[index_1.NavigationStart, '/lazy/loaded'], [index_1.NavigationError, '/lazy/loaded']]);
        })));
    });
});
function expectEvents(events, pairs) {
    for (var i = 0; i < events.length; ++i) {
        matchers_1.expect(events[i].constructor.name).toBe(pairs[i][0].name);
        matchers_1.expect(events[i].url).toBe(pairs[i][1]);
    }
}
var StringLinkCmp = (function () {
    function StringLinkCmp() {
    }
    /** @nocollapse */
    StringLinkCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'link-cmp',
                    template: "<a routerLink=\"/team/33/simple\">link</a>",
                    directives: index_1.ROUTER_DIRECTIVES
                },] },
    ];
    return StringLinkCmp;
}());
var StringLinkButtonCmp = (function () {
    function StringLinkButtonCmp() {
    }
    /** @nocollapse */
    StringLinkButtonCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'link-cmp',
                    template: "<button routerLink\n=\"/team/33/simple\">link</button>",
                    directives: index_1.ROUTER_DIRECTIVES
                },] },
    ];
    return StringLinkButtonCmp;
}());
var AbsoluteLinkCmp = (function () {
    function AbsoluteLinkCmp() {
    }
    /** @nocollapse */
    AbsoluteLinkCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'link-cmp',
                    template: "<router-outlet></router-outlet><a [routerLink]=\"['/team/33/simple']\">link</a>",
                    directives: index_1.ROUTER_DIRECTIVES
                },] },
    ];
    return AbsoluteLinkCmp;
}());
var DummyLinkCmp = (function () {
    function DummyLinkCmp(route) {
        this.exact = route.snapshot.params.exact === 'true';
    }
    /** @nocollapse */
    DummyLinkCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'link-cmp',
                    template: "<router-outlet></router-outlet><a routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: exact}\" [routerLink]=\"['./']\">link</a>\n<button routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: exact}\" [routerLink]=\"['./']\">button</button>\n",
                    directives: index_1.ROUTER_DIRECTIVES
                },] },
    ];
    /** @nocollapse */
    DummyLinkCmp.ctorParameters = [
        { type: index_1.ActivatedRoute, },
    ];
    return DummyLinkCmp;
}());
var RelativeLinkCmp = (function () {
    function RelativeLinkCmp() {
    }
    /** @nocollapse */
    RelativeLinkCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'link-cmp',
                    template: "<a [routerLink]=\"['../simple']\">link</a>",
                    directives: index_1.ROUTER_DIRECTIVES
                },] },
    ];
    return RelativeLinkCmp;
}());
var LinkWithQueryParamsAndFragment = (function () {
    function LinkWithQueryParamsAndFragment() {
    }
    /** @nocollapse */
    LinkWithQueryParamsAndFragment.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'link-cmp',
                    template: "<a [routerLink]=\"['../simple']\" [queryParams]=\"{q: '1'}\" fragment=\"f\">link</a>",
                    directives: index_1.ROUTER_DIRECTIVES
                },] },
    ];
    return LinkWithQueryParamsAndFragment;
}());
var SimpleCmp = (function () {
    function SimpleCmp() {
    }
    /** @nocollapse */
    SimpleCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'simple-cmp', template: "simple", directives: index_1.ROUTER_DIRECTIVES },] },
    ];
    return SimpleCmp;
}());
var CollectParamsCmp = (function () {
    function CollectParamsCmp(a) {
        var _this = this;
        this.params = [];
        this.urls = [];
        a.params.forEach(function (p) { return _this.params.push(p); });
        a.url.forEach(function (u) { return _this.urls.push(u); });
    }
    CollectParamsCmp.prototype.recordedUrls = function () {
        return this.urls.map(function (a) { return a.map(function (p) { return p.path; }).join('/'); });
    };
    /** @nocollapse */
    CollectParamsCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'collect-params-cmp', template: "collect-params", directives: index_1.ROUTER_DIRECTIVES },] },
    ];
    /** @nocollapse */
    CollectParamsCmp.ctorParameters = [
        { type: index_1.ActivatedRoute, },
    ];
    return CollectParamsCmp;
}());
var BlankCmp = (function () {
    function BlankCmp() {
    }
    /** @nocollapse */
    BlankCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'blank-cmp', template: "", directives: index_1.ROUTER_DIRECTIVES },] },
    ];
    return BlankCmp;
}());
var TeamCmp = (function () {
    function TeamCmp(route) {
        var _this = this;
        this.route = route;
        this.recordedParams = [];
        this.id = route.params.map(function (p) { return p['id']; });
        route.params.forEach(function (_) { return _this.recordedParams.push(_); });
    }
    /** @nocollapse */
    TeamCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'team-cmp',
                    template: "team {{id | async}} [ <router-outlet></router-outlet>, right: <router-outlet name=\"right\"></router-outlet> ]",
                    directives: index_1.ROUTER_DIRECTIVES
                },] },
    ];
    /** @nocollapse */
    TeamCmp.ctorParameters = [
        { type: index_1.ActivatedRoute, },
    ];
    return TeamCmp;
}());
var UserCmp = (function () {
    function UserCmp(route) {
        var _this = this;
        this.recordedParams = [];
        this.name = route.params.map(function (p) { return p['name']; });
        route.params.forEach(function (_) { return _this.recordedParams.push(_); });
    }
    /** @nocollapse */
    UserCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'user-cmp', template: "user {{name | async}}", directives: [index_1.ROUTER_DIRECTIVES] },] },
    ];
    /** @nocollapse */
    UserCmp.ctorParameters = [
        { type: index_1.ActivatedRoute, },
    ];
    return UserCmp;
}());
var WrapperCmp = (function () {
    function WrapperCmp() {
    }
    /** @nocollapse */
    WrapperCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'wrapper',
                    template: "<router-outlet></router-outlet>",
                    directives: [index_1.ROUTER_DIRECTIVES]
                },] },
    ];
    return WrapperCmp;
}());
var QueryParamsAndFragmentCmp = (function () {
    function QueryParamsAndFragmentCmp(router) {
        this.name = router.routerState.queryParams.map(function (p) { return p['name']; });
        this.fragment = router.routerState.fragment;
    }
    /** @nocollapse */
    QueryParamsAndFragmentCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'query-cmp',
                    template: "query: {{name | async}} fragment: {{fragment | async}}",
                    directives: [index_1.ROUTER_DIRECTIVES]
                },] },
    ];
    /** @nocollapse */
    QueryParamsAndFragmentCmp.ctorParameters = [
        { type: index_1.Router, },
    ];
    return QueryParamsAndFragmentCmp;
}());
var RouteCmp = (function () {
    function RouteCmp(route) {
        this.route = route;
    }
    /** @nocollapse */
    RouteCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'route-cmp', template: "route", directives: index_1.ROUTER_DIRECTIVES },] },
    ];
    /** @nocollapse */
    RouteCmp.ctorParameters = [
        { type: index_1.ActivatedRoute, },
    ];
    return RouteCmp;
}());
var RelativeLinkInIfCmp = (function () {
    function RelativeLinkInIfCmp() {
        this.show = false;
    }
    /** @nocollapse */
    RelativeLinkInIfCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'link-cmp',
                    template: "<div *ngIf=\"show\"><a [routerLink]=\"['./simple']\">link</a></div> <router-outlet></router-outlet>",
                    directives: index_1.ROUTER_DIRECTIVES,
                    precompile: [BlankCmp, SimpleCmp]
                },] },
    ];
    return RelativeLinkInIfCmp;
}());
var LinkInNgIf = (function () {
    function LinkInNgIf() {
        this.alwaysTrue = true;
    }
    /** @nocollapse */
    LinkInNgIf.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'child',
                    template: '<div *ngIf="alwaysTrue"><router-outlet></router-outlet></div>',
                    directives: index_1.ROUTER_DIRECTIVES
                },] },
    ];
    return LinkInNgIf;
}());
var DummyLinkWithParentCmp = (function () {
    function DummyLinkWithParentCmp(route) {
        this.exact = route.snapshot.params.exact === 'true';
    }
    /** @nocollapse */
    DummyLinkWithParentCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'link-cmp',
                    template: "<router-outlet></router-outlet>\n                    <link-parent routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: exact}\">\n                      <div ngClass=\"{one: 'true'}\"><a [routerLink]=\"['./']\">link</a></div>\n                    </link-parent>",
                    directives: index_1.ROUTER_DIRECTIVES
                },] },
    ];
    /** @nocollapse */
    DummyLinkWithParentCmp.ctorParameters = [
        { type: index_1.ActivatedRoute, },
    ];
    return DummyLinkWithParentCmp;
}());
var ComponentRecordingQueryParams = (function () {
    function ComponentRecordingQueryParams(r) {
        var _this = this;
        this.recordedQueryParams = [];
        this.subscription = r.routerState.queryParams.subscribe(function (r) { return _this.recordedQueryParams.push(r); });
    }
    ComponentRecordingQueryParams.prototype.ngOnDestroy = function () { this.subscription.unsubscribe(); };
    /** @nocollapse */
    ComponentRecordingQueryParams.decorators = [
        { type: core_1.Component, args: [{ template: '' },] },
    ];
    /** @nocollapse */
    ComponentRecordingQueryParams.ctorParameters = [
        { type: index_1.Router, },
    ];
    return ComponentRecordingQueryParams;
}());
var ComponentRecordingRoutePathAndUrl = (function () {
    function ComponentRecordingRoutePathAndUrl(router, route) {
        this.path = router.routerState.pathFromRoot(route);
        this.url = router.url.toString();
    }
    /** @nocollapse */
    ComponentRecordingRoutePathAndUrl.decorators = [
        { type: core_1.Component, args: [{ selector: 'cmp', template: '' },] },
    ];
    /** @nocollapse */
    ComponentRecordingRoutePathAndUrl.ctorParameters = [
        { type: index_1.Router, },
        { type: index_1.ActivatedRoute, },
    ];
    return ComponentRecordingRoutePathAndUrl;
}());
var RootCmp = (function () {
    function RootCmp() {
    }
    /** @nocollapse */
    RootCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'root-cmp',
                    template: "<router-outlet></router-outlet>",
                    directives: [index_1.ROUTER_DIRECTIVES],
                    precompile: [
                        BlankCmp, SimpleCmp, TeamCmp, UserCmp, StringLinkCmp, DummyLinkCmp, AbsoluteLinkCmp,
                        RelativeLinkCmp, DummyLinkWithParentCmp, LinkWithQueryParamsAndFragment, CollectParamsCmp,
                        QueryParamsAndFragmentCmp, StringLinkButtonCmp, WrapperCmp, LinkInNgIf,
                        ComponentRecordingQueryParams, ComponentRecordingRoutePathAndUrl
                    ]
                },] },
    ];
    return RootCmp;
}());
var RootCmpWithTwoOutlets = (function () {
    function RootCmpWithTwoOutlets() {
    }
    /** @nocollapse */
    RootCmpWithTwoOutlets.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'root-cmp',
                    template: "primary [<router-outlet></router-outlet>] right [<router-outlet name=\"right\"></router-outlet>]",
                    directives: [index_1.ROUTER_DIRECTIVES],
                    precompile: [BlankCmp, SimpleCmp, RouteCmp, UserCmp]
                },] },
    ];
    return RootCmpWithTwoOutlets;
}());
function advance(fixture) {
    testing_1.tick();
    fixture.detectChanges();
}
function createRoot(tcb, router, type) {
    var f = tcb.createFakeAsync(type);
    advance(f);
    router.initialNavigation();
    advance(f);
    return f;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci90ZXN0L3JvdXRlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxRQUFPLHVCQUF1QixDQUFDLENBQUE7QUFFL0IsdUJBQXVCLGlCQUFpQixDQUFDLENBQUE7QUFDekMscUJBQXlELGVBQWUsQ0FBQyxDQUFBO0FBQ3pFLHdCQUE2Ryx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3JJLHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBRWxFLG1CQUFrQixvQkFBb0IsQ0FBQyxDQUFBO0FBRXZDLHNCQUEyUixVQUFVLENBQUMsQ0FBQTtBQUN0Uyx3QkFBNEQsWUFBWSxDQUFDLENBQUE7QUFFekUsUUFBUSxDQUFDLGFBQWEsRUFBRTtJQUN0QixVQUFVLENBQUM7UUFDVCx5QkFBZSxDQUFDO1lBQ2QsT0FBTyxFQUFFLENBQUMsNkJBQW1CLENBQUM7WUFDOUIsU0FBUyxFQUFFLENBQUMscUJBQWEsQ0FDckIsQ0FBQyxFQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBQyxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9FLFlBQVksRUFBRTtnQkFDWixRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxlQUFlO2dCQUNuRixlQUFlLEVBQUUsc0JBQXNCLEVBQUUsOEJBQThCLEVBQUUsZ0JBQWdCO2dCQUN6Rix5QkFBeUIsRUFBRSxtQkFBbUIsRUFBRSxVQUFVLEVBQUUsVUFBVTtnQkFDdEUsNkJBQTZCLEVBQUUsaUNBQWlDLEVBQUUsUUFBUTthQUMzRTtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFB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