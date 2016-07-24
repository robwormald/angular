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
var testing_1 = require('@angular/core/testing');
var common_1 = require('@angular/common');
var util_1 = require('../util');
var router_deprecated_1 = require('@angular/router-deprecated');
var fixture_components_1 = require('./fixture_components');
var by_1 = require('../../../../platform-browser/src/dom/debug/by');
function getLinkElement(rtc) {
    return rtc.debugElement.query(by_1.By.css('a')).nativeElement;
}
function asyncRoutesWithoutChildrenWithRouteData() {
    var fixture;
    var tcb;
    var rtr;
    testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
    testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router], function (tcBuilder /** TODO #9100 */, router /** TODO #9100 */) {
        tcb = tcBuilder;
        rtr = router;
    }));
    testing_internal_1.it('should inject route data into the component', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb)
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/route-data', loader: fixture_components_1.asyncRouteDataCmp, data: { isAdmin: true } })]); })
            .then(function (_) { return rtr.navigateByUrl('/route-data'); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('true');
            async.done();
        });
    }));
    testing_internal_1.it('should inject empty object if the route has no data property', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb)
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/route-data-default', loader: fixture_components_1.asyncRouteDataCmp })]); })
            .then(function (_) { return rtr.navigateByUrl('/route-data-default'); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
            async.done();
        });
    }));
}
function asyncRoutesWithoutChildrenWithoutParams() {
    var fixture;
    var tcb;
    var rtr;
    testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
    testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router], function (tcBuilder /** TODO #9100 */, router /** TODO #9100 */) {
        tcb = tcBuilder;
        rtr = router;
    }));
    testing_internal_1.it('should navigate by URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb)
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/test', loader: fixture_components_1.helloCmpLoader, name: 'Hello' })]); })
            .then(function (_) { return rtr.navigateByUrl('/test'); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate by link DSL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb)
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/test', loader: fixture_components_1.helloCmpLoader, name: 'Hello' })]); })
            .then(function (_) { return rtr.navigate(['/Hello']); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello');
            async.done();
        });
    }));
    testing_internal_1.it('should generate a link URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "<a [routerLink]=\"['Hello']\">go to hello</a> | <router-outlet></router-outlet>")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/test', loader: fixture_components_1.helloCmpLoader, name: 'Hello' })]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(util_1.getHref(getLinkElement(fixture))).toEqual('/test');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate from a link click', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
        util_1.compile(tcb, "<a [routerLink]=\"['Hello']\">go to hello</a> | <router-outlet></router-outlet>")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/test', loader: fixture_components_1.helloCmpLoader, name: 'Hello' })]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('go to hello | ');
            rtr.subscribe(function (_ /** TODO #9100 */) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('go to hello | hello');
                matchers_1.expect(location.urlChanges).toEqual(['/test']);
                async.done();
            });
            util_1.clickOnElement(getLinkElement(fixture));
        });
    }));
}
function asyncRoutesWithoutChildrenWithParams() {
    var fixture;
    var tcb;
    var rtr;
    testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
    testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router], function (tcBuilder /** TODO #9100 */, router /** TODO #9100 */) {
        tcb = tcBuilder;
        rtr = router;
    }));
    testing_internal_1.it('should navigate by URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb)
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/user/:name', loader: fixture_components_1.userCmpLoader, name: 'User' })]); })
            .then(function (_) { return rtr.navigateByUrl('/user/igor'); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello igor');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate by link DSL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb)
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) {
            return rtr.config([new router_deprecated_1.Route({ path: '/user/:name', component: fixture_components_1.UserCmp, name: 'User' })]);
        })
            .then(function (_) { return rtr.navigate(['/User', { name: 'brian' }]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello brian');
            async.done();
        });
    }));
    testing_internal_1.it('should generate a link URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "<a [routerLink]=\"['User', {name: 'naomi'}]\">greet naomi</a> | <router-outlet></router-outlet>")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/user/:name', loader: fixture_components_1.userCmpLoader, name: 'User' })]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(util_1.getHref(getLinkElement(fixture))).toEqual('/user/naomi');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate from a link click', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
        util_1.compile(tcb, "<a [routerLink]=\"['User', {name: 'naomi'}]\">greet naomi</a> | <router-outlet></router-outlet>")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/user/:name', loader: fixture_components_1.userCmpLoader, name: 'User' })]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('greet naomi | ');
            rtr.subscribe(function (_ /** TODO #9100 */) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement)
                    .toHaveText('greet naomi | hello naomi');
                matchers_1.expect(location.urlChanges).toEqual(['/user/naomi']);
                async.done();
            });
            util_1.clickOnElement(getLinkElement(fixture));
        });
    }));
    testing_internal_1.it('should navigate between components with different parameters', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb)
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/user/:name', loader: fixture_components_1.userCmpLoader, name: 'User' })]); })
            .then(function (_) { return rtr.navigateByUrl('/user/brian'); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello brian');
        })
            .then(function (_) { return rtr.navigateByUrl('/user/igor'); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello igor');
            async.done();
        });
    }));
}
function asyncRoutesWithSyncChildrenWithoutDefaultRoutes() {
    var fixture;
    var tcb;
    var rtr;
    testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
    testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router], function (tcBuilder /** TODO #9100 */, router /** TODO #9100 */) {
        tcb = tcBuilder;
        rtr = router;
    }));
    testing_internal_1.it('should navigate by URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.parentCmpLoader, name: 'Parent' })]); })
            .then(function (_) { return rtr.navigateByUrl('/a/b'); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('outer [ inner [ hello ] ]');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate by link DSL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.parentCmpLoader, name: 'Parent' })]); })
            .then(function (_) { return rtr.navigate(['/Parent', 'Child']); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('outer [ inner [ hello ] ]');
            async.done();
        });
    }));
    testing_internal_1.it('should generate a link URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "<a [routerLink]=\"['Parent']\">nav to child</a> | outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.parentCmpLoader, name: 'Parent' })]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(util_1.getHref(getLinkElement(fixture))).toEqual('/a');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate from a link click', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
        util_1.compile(tcb, "<a [routerLink]=\"['Parent', 'Child']\">nav to child</a> | outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.parentCmpLoader, name: 'Parent' })]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('nav to child | outer [  ]');
            rtr.subscribe(function (_ /** TODO #9100 */) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement)
                    .toHaveText('nav to child | outer [ inner [ hello ] ]');
                matchers_1.expect(location.urlChanges).toEqual(['/a/b']);
                async.done();
            });
            util_1.clickOnElement(getLinkElement(fixture));
        });
    }));
}
function asyncRoutesWithSyncChildrenWithDefaultRoutes() {
    var fixture;
    var tcb;
    var rtr;
    testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
    testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router], function (tcBuilder /** TODO #9100 */, router /** TODO #9100 */) {
        tcb = tcBuilder;
        rtr = router;
    }));
    testing_internal_1.it('should navigate by URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.parentWithDefaultCmpLoader, name: 'Parent' })]); })
            .then(function (_) { return rtr.navigateByUrl('/a'); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('outer [ inner [ hello ] ]');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate by link DSL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.parentWithDefaultCmpLoader, name: 'Parent' })]); })
            .then(function (_) { return rtr.navigate(['/Parent']); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('outer [ inner [ hello ] ]');
            async.done();
        });
    }));
    testing_internal_1.it('should generate a link URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "<a [routerLink]=\"['/Parent']\">link to inner</a> | outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.parentWithDefaultCmpLoader, name: 'Parent' })]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(util_1.getHref(getLinkElement(fixture))).toEqual('/a');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate from a link click', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
        util_1.compile(tcb, "<a [routerLink]=\"['/Parent']\">link to inner</a> | outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.parentWithDefaultCmpLoader, name: 'Parent' })]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement)
                .toHaveText('link to inner | outer [  ]');
            rtr.subscribe(function (_ /** TODO #9100 */) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement)
                    .toHaveText('link to inner | outer [ inner [ hello ] ]');
                matchers_1.expect(location.urlChanges).toEqual(['/a/b']);
                async.done();
            });
            util_1.clickOnElement(getLinkElement(fixture));
        });
    }));
}
function asyncRoutesWithAsyncChildrenWithoutParamsWithoutDefaultRoutes() {
    var rootTC;
    var tcb;
    var rtr;
    testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
    testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router], function (tcBuilder /** TODO #9100 */, router /** TODO #9100 */) {
        tcb = tcBuilder;
        rtr = router;
    }));
    testing_internal_1.it('should navigate by URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { rootTC = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.asyncParentCmpLoader, name: 'Parent' })]); })
            .then(function (_) { return rtr.navigateByUrl('/a/b'); })
            .then(function (_) {
            rootTC.detectChanges();
            matchers_1.expect(rootTC.debugElement.nativeElement).toHaveText('outer [ inner [ hello ] ]');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate by link DSL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { rootTC = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.asyncParentCmpLoader, name: 'Parent' })]); })
            .then(function (_) { return rtr.navigate(['/Parent', 'Child']); })
            .then(function (_) {
            rootTC.detectChanges();
            matchers_1.expect(rootTC.debugElement.nativeElement).toHaveText('outer [ inner [ hello ] ]');
            async.done();
        });
    }));
    testing_internal_1.it('should generate a link URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "<a [routerLink]=\"['Parent', 'Child']\">nav to child</a> | outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { rootTC = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.asyncParentCmpLoader, name: 'Parent' })]); })
            .then(function (_) {
            rootTC.detectChanges();
            matchers_1.expect(util_1.getHref(getLinkElement(rootTC))).toEqual('/a');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate from a link click', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
        util_1.compile(tcb, "<a [routerLink]=\"['Parent', 'Child']\">nav to child</a> | outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { rootTC = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.asyncParentCmpLoader, name: 'Parent' })]); })
            .then(function (_) {
            rootTC.detectChanges();
            matchers_1.expect(rootTC.debugElement.nativeElement).toHaveText('nav to child | outer [  ]');
            rtr.subscribe(function (_ /** TODO #9100 */) {
                rootTC.detectChanges();
                matchers_1.expect(rootTC.debugElement.nativeElement)
                    .toHaveText('nav to child | outer [ inner [ hello ] ]');
                matchers_1.expect(location.urlChanges).toEqual(['/a/b']);
                async.done();
            });
            util_1.clickOnElement(getLinkElement(rootTC));
        });
    }));
}
function asyncRoutesWithAsyncChildrenWithoutParamsWithDefaultRoutes() {
    var rootTC;
    var tcb;
    var rtr;
    testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
    testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router], function (tcBuilder /** TODO #9100 */, router /** TODO #9100 */) {
        tcb = tcBuilder;
        rtr = router;
    }));
    testing_internal_1.it('should navigate by URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { rootTC = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.asyncDefaultParentCmpLoader, name: 'Parent' })]); })
            .then(function (_) { return rtr.navigateByUrl('/a'); })
            .then(function (_) {
            rootTC.detectChanges();
            matchers_1.expect(rootTC.debugElement.nativeElement).toHaveText('outer [ inner [ hello ] ]');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate by link DSL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { rootTC = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.asyncDefaultParentCmpLoader, name: 'Parent' })]); })
            .then(function (_) { return rtr.navigate(['/Parent']); })
            .then(function (_) {
            rootTC.detectChanges();
            matchers_1.expect(rootTC.debugElement.nativeElement).toHaveText('outer [ inner [ hello ] ]');
            async.done();
        });
    }));
    testing_internal_1.it('should generate a link URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "<a [routerLink]=\"['Parent']\">nav to child</a> | outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { rootTC = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.asyncDefaultParentCmpLoader, name: 'Parent' })]); })
            .then(function (_) {
            rootTC.detectChanges();
            matchers_1.expect(util_1.getHref(getLinkElement(rootTC))).toEqual('/a');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate from a link click', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
        util_1.compile(tcb, "<a [routerLink]=\"['Parent']\">nav to child</a> | outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { rootTC = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/a/...', loader: fixture_components_1.asyncDefaultParentCmpLoader, name: 'Parent' })]); })
            .then(function (_) {
            rootTC.detectChanges();
            matchers_1.expect(rootTC.debugElement.nativeElement).toHaveText('nav to child | outer [  ]');
            rtr.subscribe(function (_ /** TODO #9100 */) {
                rootTC.detectChanges();
                matchers_1.expect(rootTC.debugElement.nativeElement)
                    .toHaveText('nav to child | outer [ inner [ hello ] ]');
                matchers_1.expect(location.urlChanges).toEqual(['/a/b']);
                async.done();
            });
            util_1.clickOnElement(getLinkElement(rootTC));
        });
    }));
}
function asyncRoutesWithAsyncChildrenWithParamsWithoutDefaultRoutes() {
    var fixture;
    var tcb;
    var rtr;
    testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
    testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router], function (tcBuilder /** TODO #9100 */, router /** TODO #9100 */) {
        tcb = tcBuilder;
        rtr = router;
    }));
    testing_internal_1.it('should navigate by URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "[ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/team/:id/...', loader: fixture_components_1.asyncTeamLoader, name: 'Team' })]); })
            .then(function (_) { return rtr.navigateByUrl('/team/angular/user/matias'); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement)
                .toHaveText('[ team angular | user [ hello matias ] ]');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate by link DSL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "[ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/team/:id/...', loader: fixture_components_1.asyncTeamLoader, name: 'Team' })]); })
            .then(function (_) { return rtr.navigate(['/Team', { id: 'angular' }, 'User', { name: 'matias' }]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement)
                .toHaveText('[ team angular | user [ hello matias ] ]');
            async.done();
        });
    }));
    testing_internal_1.it('should generate a link URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "<a [routerLink]=\"['/Team', {id: 'angular'}, 'User', {name: 'matias'}]\">nav to matias</a> [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/team/:id/...', loader: fixture_components_1.asyncTeamLoader, name: 'Team' })]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(util_1.getHref(getLinkElement(fixture))).toEqual('/team/angular');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate from a link click', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
        util_1.compile(tcb, "<a [routerLink]=\"['/Team', {id: 'angular'}, 'User', {name: 'matias'}]\">nav to matias</a> [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.AsyncRoute({ path: '/team/:id/...', loader: fixture_components_1.asyncTeamLoader, name: 'Team' })]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('nav to matias [  ]');
            rtr.subscribe(function (_ /** TODO #9100 */) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement)
                    .toHaveText('nav to matias [ team angular | user [ hello matias ] ]');
                matchers_1.expect(location.urlChanges).toEqual(['/team/angular/user/matias']);
                async.done();
            });
            util_1.clickOnElement(getLinkElement(fixture));
        });
    }));
}
function registerSpecs() {
    util_1.specs['asyncRoutesWithoutChildrenWithRouteData'] =
        asyncRoutesWithoutChildrenWithRouteData;
    util_1.specs['asyncRoutesWithoutChildrenWithoutParams'] =
        asyncRoutesWithoutChildrenWithoutParams;
    util_1.specs['asyncRoutesWithoutChildrenWithParams'] =
        asyncRoutesWithoutChildrenWithParams;
    util_1.specs['asyncRoutesWithSyncChildrenWithoutDefaultRoutes'] =
        asyncRoutesWithSyncChildrenWithoutDefaultRoutes;
    util_1.specs['asyncRoutesWithSyncChildrenWithDefaultRoutes'] =
        asyncRoutesWithSyncChildrenWithDefaultRoutes;
    util_1.specs['asyncRoutesWithAsyncChildrenWithoutParamsWithoutDefaultRoutes'] =
        asyncRoutesWithAsyncChildrenWithoutParamsWithoutDefaultRoutes;
    util_1.specs['asyncRoutesWithAsyncChildrenWithoutParamsWithDefaultRoutes'] =
        asyncRoutesWithAsyncChildrenWithoutParamsWithDefaultRoutes;
    util_1.specs['asyncRoutesWithAsyncChildrenWithParamsWithoutDefaultRoutes'] =
        asyncRoutesWithAsyncChildrenWithParamsWithoutDefaultRoutes;
}
exports.registerSpecs = registerSpecs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfcm91dGVfc3BlY19pbXBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9yb3V0ZXItZGVwcmVjYXRlZC90ZXN0L2ludGVncmF0aW9uL2ltcGwvYXN5bmNfcm91dGVfc3BlY19pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBeUYsd0NBQXdDLENBQUMsQ0FBQTtBQUNsSSx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUNsRSx3QkFBcUQsdUJBQXVCLENBQUMsQ0FBQTtBQUU3RSx1QkFBdUIsaUJBQWlCLENBQUMsQ0FBQTtBQUV6QyxxQkFBNkUsU0FBUyxDQUFDLENBQUE7QUFFdkYsa0NBQXdDLDRCQUE0QixDQUFDLENBQUE7QUFFckUsbUNBQTZPLHNCQUFzQixDQUFDLENBQUE7QUFDcFEsbUJBQWlCLCtDQUErQyxDQUFDLENBQUE7QUFFakUsd0JBQXdCLEdBQTBCO0lBQ2hELE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxPQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDO0FBQzNELENBQUM7QUFFRDtJQUNFLElBQUksT0FBWSxDQUFtQjtJQUNuQyxJQUFJLEdBQVEsQ0FBbUI7SUFDL0IsSUFBSSxHQUFRLENBQW1CO0lBRS9CLHNDQUFtQixDQUFDLGNBQU0sT0FBQSw0QkFBcUIsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO0lBRWpELDZCQUFVLENBQUMseUJBQU0sQ0FDYixDQUFDLDhCQUFvQixFQUFFLDBCQUFNLENBQUMsRUFDOUIsVUFBQyxTQUFjLENBQUMsaUJBQWlCLEVBQUUsTUFBVyxDQUFDLGlCQUFpQjtRQUM5RCxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ2hCLEdBQUcsR0FBRyxNQUFNLENBQUM7SUFDZixDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRVIscUJB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