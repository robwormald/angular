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
var util_1 = require('../util');
var common_1 = require('@angular/common');
var router_deprecated_1 = require('@angular/router-deprecated');
var fixture_components_1 = require('./fixture_components');
var async_1 = require('../../../src/facade/async');
var by_1 = require('@angular/platform-browser/src/dom/debug/by');
function getLinkElement(rtc) {
    return rtc.debugElement.query(by_1.By.css('a')).nativeElement;
}
function syncRoutesWithoutChildrenWithoutParams() {
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
            .then(function (_) { return rtr.config([new router_deprecated_1.Route({ path: '/test', component: fixture_components_1.HelloCmp, name: 'Hello' })]); })
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
            .then(function (_) { return rtr.config([new router_deprecated_1.Route({ path: '/test', component: fixture_components_1.HelloCmp, name: 'Hello' })]); })
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
            .then(function (_) { return rtr.config([new router_deprecated_1.Route({ path: '/test', component: fixture_components_1.HelloCmp, name: 'Hello' })]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(util_1.getHref(getLinkElement(fixture))).toEqual('/test');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate from a link click', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
        util_1.compile(tcb, "<a [routerLink]=\"['Hello']\">go to hello</a> | <router-outlet></router-outlet>")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) {
            return rtr.config([new router_deprecated_1.Route({ path: '/test', component: fixture_components_1.HelloCmp, name: 'Hello' })]);
        })
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
function syncRoutesWithoutChildrenWithParams() {
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
            .then(function (_) {
            return rtr.config([new router_deprecated_1.Route({ path: '/user/:name', component: fixture_components_1.UserCmp, name: 'User' })]);
        })
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
            .then(function (_) {
            return rtr.config([new router_deprecated_1.Route({ path: '/user/:name', component: fixture_components_1.UserCmp, name: 'User' })]);
        })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(util_1.getHref(getLinkElement(fixture))).toEqual('/user/naomi');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate from a link click', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
        util_1.compile(tcb, "<a [routerLink]=\"['User', {name: 'naomi'}]\">greet naomi</a> | <router-outlet></router-outlet>")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.Route({ path: '/user/:name', component: fixture_components_1.UserCmp, name: 'User' })]); })
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
            .then(function (_) {
            return rtr.config([new router_deprecated_1.Route({ path: '/user/:name', component: fixture_components_1.UserCmp, name: 'User' })]);
        })
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
function syncRoutesWithSyncChildrenWithoutDefaultRoutesWithoutParams() {
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
            .then(function (_) {
            return rtr.config([new router_deprecated_1.Route({ path: '/a/...', component: fixture_components_1.ParentCmp, name: 'Parent' })]);
        })
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
            .then(function (_) {
            return rtr.config([new router_deprecated_1.Route({ path: '/a/...', component: fixture_components_1.ParentCmp, name: 'Parent' })]);
        })
            .then(function (_) { return rtr.navigate(['/Parent', 'Child']); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('outer [ inner [ hello ] ]');
            async.done();
        });
    }));
    testing_internal_1.it('should generate a link URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "<a [routerLink]=\"['Parent', 'Child']\">nav to child</a> | outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) {
            return rtr.config([new router_deprecated_1.Route({ path: '/a/...', component: fixture_components_1.ParentCmp, name: 'Parent' })]);
        })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(util_1.getHref(getLinkElement(fixture))).toEqual('/a/b');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate from a link click', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
        util_1.compile(tcb, "<a [routerLink]=\"['Parent', 'Child']\">nav to child</a> | outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.Route({ path: '/a/...', component: fixture_components_1.ParentCmp, name: 'Parent' })]); })
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
function syncRoutesWithSyncChildrenWithoutDefaultRoutesWithParams() {
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
            .then(function (_) { return rtr.config([new router_deprecated_1.Route({ path: '/team/:id/...', component: fixture_components_1.TeamCmp, name: 'Team' })]); })
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
            .then(function (_) { return rtr.config([new router_deprecated_1.Route({ path: '/team/:id/...', component: fixture_components_1.TeamCmp, name: 'Team' })]); })
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
            .then(function (_) { return rtr.config([new router_deprecated_1.Route({ path: '/team/:id/...', component: fixture_components_1.TeamCmp, name: 'Team' })]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(util_1.getHref(getLinkElement(fixture))).toEqual('/team/angular/user/matias');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate from a link click', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
        util_1.compile(tcb, "<a [routerLink]=\"['/Team', {id: 'angular'}, 'User', {name: 'matias'}]\">nav to matias</a> [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.Route({ path: '/team/:id/...', component: fixture_components_1.TeamCmp, name: 'Team' })]); })
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
function syncRoutesWithSyncChildrenWithDefaultRoutesWithoutParams() {
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
            .then(function (_) { return rtr.config([new router_deprecated_1.Route({ path: '/a/...', component: fixture_components_1.ParentWithDefaultCmp, name: 'Parent' })]); })
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
            .then(function (_) { return rtr.config([new router_deprecated_1.Route({ path: '/a/...', component: fixture_components_1.ParentWithDefaultCmp, name: 'Parent' })]); })
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
            .then(function (_) { return rtr.config([new router_deprecated_1.Route({ path: '/a/...', component: fixture_components_1.ParentWithDefaultCmp, name: 'Parent' })]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(util_1.getHref(getLinkElement(fixture))).toEqual('/a');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate from a link click', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
        util_1.compile(tcb, "<a [routerLink]=\"['/Parent']\">link to inner</a> | outer [ <router-outlet></router-outlet> ]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.Route({ path: '/a/...', component: fixture_components_1.ParentWithDefaultCmp, name: 'Parent' })]); })
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
function syncRoutesWithDynamicComponents() {
    var fixture;
    var tcb;
    var rtr;
    testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
    testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router], function (tcBuilder /** TODO #9100 */, router /** TODO #9100 */) {
        tcb = tcBuilder;
        rtr = router;
    }));
    testing_internal_1.it('should work', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        tcb.createAsync(fixture_components_1.DynamicLoaderCmp)
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([new router_deprecated_1.Route({ path: '/', component: fixture_components_1.HelloCmp })]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('[  ]');
            return fixture.componentInstance.onSomeAction();
        })
            .then(function (_) {
            fixture.detectChanges();
            return rtr.navigateByUrl('/');
        })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('[ hello ]');
            return fixture.componentInstance.onSomeAction();
        })
            .then(function (_) {
            // TODO(i): This should be rewritten to use NgZone#onStable or
            // something
            // similar basically the assertion needs to run when the world is
            // stable and we don't know when that is, only zones know.
            async_1.PromiseWrapper.resolve(null).then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('[ hello ]');
                async.done();
            });
        });
    }));
}
function registerSpecs() {
    util_1.specs['syncRoutesWithoutChildrenWithoutParams'] =
        syncRoutesWithoutChildrenWithoutParams;
    util_1.specs['syncRoutesWithoutChildrenWithParams'] =
        syncRoutesWithoutChildrenWithParams;
    util_1.specs['syncRoutesWithSyncChildrenWithoutDefaultRoutesWithoutParams'] =
        syncRoutesWithSyncChildrenWithoutDefaultRoutesWithoutParams;
    util_1.specs['syncRoutesWithSyncChildrenWithoutDefaultRoutesWithParams'] =
        syncRoutesWithSyncChildrenWithoutDefaultRoutesWithParams;
    util_1.specs['syncRoutesWithSyncChildrenWithDefaultRoutesWithoutParams'] =
        syncRoutesWithSyncChildrenWithDefaultRoutesWithoutParams;
    util_1.specs['syncRoutesWithDynamicComponents'] =
        syncRoutesWithDynamicComponents;
}
exports.registerSpecs = registerSpecs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY19yb3V0ZV9zcGVjX2ltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci1kZXByZWNhdGVkL3Rlc3QvaW50ZWdyYXRpb24vaW1wbC9zeW5jX3JvdXRlX3NwZWNfaW1wbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQXlGLHdDQUF3QyxDQUFDLENBQUE7QUFDbEkseUJBQXFCLDRDQUE0QyxDQUFDLENBQUE7QUFDbEUsd0JBQXFELHVCQUF1QixDQUFDLENBQUE7QUFFN0UscUJBQTZFLFNBQVMsQ0FBQyxDQUFBO0FBQ3ZGLHVCQUF1QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pDLGtDQUE0Qiw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3pELG1DQUE0RixzQkFBc0IsQ0FBQyxDQUFBO0FBQ25ILHNCQUE2QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ3pELG1CQUFpQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBRzlELHdCQUF3QixHQUEwQjtJQUNoRCxNQUFNLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsT0FBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztBQUMzRCxDQUFDO0FBRUQ7SUFDRSxJQUFJLE9BQVksQ0FBbUI7SUFDbkMsSUFBSSxHQUFRLENBQW1CO0lBQy9CLElBQUksR0FBUSxDQUFtQjtJQUUvQixzQ0FBbUIsQ0FBQyxjQUFNLE9BQUEsNEJBQXFCLEVBQXJCLENBQXFCLENBQUMsQ0FBQztJQUVqRCw2QkFBVSxDQUFDLHlCQUFNLENBQ2IsQ0FBQyw4QkFBb0IsRUFBRSwwQkFBTSxDQUFDLEVBQzlCLFVBQUMsU0FBYyxDQUFDLGlCQUFpQixFQUFFLE1BQVcsQ0FBQyxpQkFBaUI7UUFDOUQsR0FBRyxHQUFHLFNBQVMsQ0FBQztRQUNoQixHQUFHLEdBQUcsTUFBTSxDQUFDO0lBQ2Ys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