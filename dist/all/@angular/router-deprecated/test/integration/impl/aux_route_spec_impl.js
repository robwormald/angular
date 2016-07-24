/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var by_1 = require('@angular/platform-browser/src/dom/debug/by');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var router_deprecated_1 = require('@angular/router-deprecated');
var exceptions_1 = require('../../../src/facade/exceptions');
var util_1 = require('../util');
function getLinkElement(rtc, linkIndex) {
    if (linkIndex === void 0) { linkIndex = 0; }
    return rtc.debugElement.queryAll(by_1.By.css('a'))[linkIndex].nativeElement;
}
function auxRoutes() {
    var tcb;
    var fixture;
    var rtr;
    testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router], function (tcBuilder /** TODO #9100 */, router /** TODO #9100 */) {
        tcb = tcBuilder;
        rtr = router;
    }));
    testing_internal_1.it('should recognize and navigate from the URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "main [<router-outlet></router-outlet>] | aux [<router-outlet name=\"modal\"></router-outlet>]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([
            new router_deprecated_1.Route({ path: '/hello', component: HelloCmp, name: 'Hello' }),
            new router_deprecated_1.AuxRoute({ path: '/modal', component: ModalCmp, name: 'Aux' })
        ]); })
            .then(function (_) { return rtr.navigateByUrl('/(modal)'); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('main [] | aux [modal]');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate via the link DSL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "main [<router-outlet></router-outlet>] | aux [<router-outlet name=\"modal\"></router-outlet>]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([
            new router_deprecated_1.Route({ path: '/hello', component: HelloCmp, name: 'Hello' }),
            new router_deprecated_1.AuxRoute({ path: '/modal', component: ModalCmp, name: 'Modal' })
        ]); })
            .then(function (_) { return rtr.navigate(['/', ['Modal']]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('main [] | aux [modal]');
            async.done();
        });
    }));
    testing_internal_1.it('should generate a link URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "<a [routerLink]=\"['/', ['Modal']]\">open modal</a> | main [<router-outlet></router-outlet>] | aux [<router-outlet name=\"modal\"></router-outlet>]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([
            new router_deprecated_1.Route({ path: '/hello', component: HelloCmp, name: 'Hello' }),
            new router_deprecated_1.AuxRoute({ path: '/modal', component: ModalCmp, name: 'Modal' })
        ]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(util_1.getHref(getLinkElement(fixture))).toEqual('/(modal)');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate from a link click', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
        util_1.compile(tcb, "<a [routerLink]=\"['/', ['Modal']]\">open modal</a> | <a [routerLink]=\"['/Hello']\">hello</a> | main [<router-outlet></router-outlet>] | aux [<router-outlet name=\"modal\"></router-outlet>]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([
            new router_deprecated_1.Route({ path: '/hello', component: HelloCmp, name: 'Hello' }),
            new router_deprecated_1.AuxRoute({ path: '/modal', component: ModalCmp, name: 'Modal' })
        ]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement)
                .toHaveText('open modal | hello | main [] | aux []');
            var navCount = 0;
            rtr.subscribe(function (_ /** TODO #9100 */) {
                navCount += 1;
                fixture.detectChanges();
                if (navCount == 1) {
                    matchers_1.expect(fixture.debugElement.nativeElement)
                        .toHaveText('open modal | hello | main [] | aux [modal]');
                    matchers_1.expect(location.urlChanges).toEqual(['/(modal)']);
                    matchers_1.expect(util_1.getHref(getLinkElement(fixture, 0))).toEqual('/(modal)');
                    matchers_1.expect(util_1.getHref(getLinkElement(fixture, 1))).toEqual('/hello(modal)');
                    // click on primary route link
                    util_1.clickOnElement(getLinkElement(fixture, 1));
                }
                else if (navCount == 2) {
                    matchers_1.expect(fixture.debugElement.nativeElement)
                        .toHaveText('open modal | hello | main [hello] | aux [modal]');
                    matchers_1.expect(location.urlChanges).toEqual(['/(modal)', '/hello(modal)']);
                    matchers_1.expect(util_1.getHref(getLinkElement(fixture, 0))).toEqual('/hello(modal)');
                    matchers_1.expect(util_1.getHref(getLinkElement(fixture, 1))).toEqual('/hello(modal)');
                    async.done();
                }
                else {
                    throw new exceptions_1.BaseException("Unexpected route change #" + navCount);
                }
            });
            util_1.clickOnElement(getLinkElement(fixture));
        });
    }));
}
function auxRoutesWithAPrimaryRoute() {
    var tcb;
    var fixture;
    var rtr;
    testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router], function (tcBuilder /** TODO #9100 */, router /** TODO #9100 */) {
        tcb = tcBuilder;
        rtr = router;
    }));
    testing_internal_1.it('should recognize and navigate from the URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "main [<router-outlet></router-outlet>] | aux [<router-outlet name=\"modal\"></router-outlet>]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([
            new router_deprecated_1.Route({ path: '/hello', component: HelloCmp, name: 'Hello' }),
            new router_deprecated_1.AuxRoute({ path: '/modal', component: ModalCmp, name: 'Aux' })
        ]); })
            .then(function (_) { return rtr.navigateByUrl('/hello(modal)'); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('main [hello] | aux [modal]');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate via the link DSL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "main [<router-outlet></router-outlet>] | aux [<router-outlet name=\"modal\"></router-outlet>]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([
            new router_deprecated_1.Route({ path: '/hello', component: HelloCmp, name: 'Hello' }),
            new router_deprecated_1.AuxRoute({ path: '/modal', component: ModalCmp, name: 'Modal' })
        ]); })
            .then(function (_) { return rtr.navigate(['/Hello', ['Modal']]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('main [hello] | aux [modal]');
            async.done();
        });
    }));
    testing_internal_1.it('should generate a link URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
        util_1.compile(tcb, "<a [routerLink]=\"['/Hello', ['Modal']]\">open modal</a> | main [<router-outlet></router-outlet>] | aux [<router-outlet name=\"modal\"></router-outlet>]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([
            new router_deprecated_1.Route({ path: '/hello', component: HelloCmp, name: 'Hello' }),
            new router_deprecated_1.AuxRoute({ path: '/modal', component: ModalCmp, name: 'Modal' })
        ]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(util_1.getHref(getLinkElement(fixture))).toEqual('/hello(modal)');
            async.done();
        });
    }));
    testing_internal_1.it('should navigate from a link click', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
        util_1.compile(tcb, "<a [routerLink]=\"['/Hello', ['Modal']]\">open modal</a> | main [<router-outlet></router-outlet>] | aux [<router-outlet name=\"modal\"></router-outlet>]")
            .then(function (rtc) { fixture = rtc; })
            .then(function (_) { return rtr.config([
            new router_deprecated_1.Route({ path: '/hello', component: HelloCmp, name: 'Hello' }),
            new router_deprecated_1.AuxRoute({ path: '/modal', component: ModalCmp, name: 'Modal' })
        ]); })
            .then(function (_) {
            fixture.detectChanges();
            matchers_1.expect(fixture.debugElement.nativeElement)
                .toHaveText('open modal | main [] | aux []');
            rtr.subscribe(function (_ /** TODO #9100 */) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement)
                    .toHaveText('open modal | main [hello] | aux [modal]');
                matchers_1.expect(location.urlChanges).toEqual(['/hello(modal)']);
                async.done();
            });
            util_1.clickOnElement(getLinkElement(fixture));
        });
    }));
}
function registerSpecs() {
    util_1.specs['auxRoutes'] = auxRoutes;
    util_1.specs['auxRoutesWithAPrimaryRoute'] = auxRoutesWithAPrimaryRoute;
}
exports.registerSpecs = registerSpecs;
var HelloCmp = (function () {
    function HelloCmp() {
        this.greeting = 'hello';
    }
    /** @nocollapse */
    HelloCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'hello-cmp', template: "{{greeting}}" },] },
    ];
    /** @nocollapse */
    HelloCmp.ctorParameters = [];
    return HelloCmp;
}());
var ModalCmp = (function () {
    function ModalCmp() {
    }
    /** @nocollapse */
    ModalCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'modal-cmp', template: "modal" },] },
    ];
    return ModalCmp;
}());
var AuxCmp = (function () {
    function AuxCmp() {
    }
    /** @nocollapse */
    AuxCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'aux-cmp',
                    template: 'main [<router-outlet></router-outlet>] | ' +
                        'aux [<router-outlet name="modal"></router-outlet>]',
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES],
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[
                    new router_deprecated_1.Route({ path: '/hello', component: HelloCmp, name: 'Hello' }),
                    new router_deprecated_1.AuxRoute({ path: '/modal', component: ModalCmp, name: 'Aux' })
                ],] },
    ];
    return AuxCmp;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV4X3JvdXRlX3NwZWNfaW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyLWRlcHJlY2F0ZWQvdGVzdC9pbnRlZ3JhdGlvbi9pbXBsL2F1eF9yb3V0ZV9zcGVjX2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHVCQUF1QixpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pDLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyx3QkFBcUQsdUJBQXVCLENBQUMsQ0FBQTtBQUM3RSxpQ0FBd0gsd0NBQXdDLENBQUMsQ0FBQTtBQUNqSyxtQkFBaUIsNENBQTRDLENBQUMsQ0FBQTtBQUM5RCx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUNsRSxrQ0FBc0UsNEJBQTRCLENBQUMsQ0FBQTtBQUVuRywyQkFBNEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUM3RCxxQkFBc0QsU0FBUyxDQUFDLENBQUE7QUFFaEUsd0JBQXdCLEdBQTBCLEVBQUUsU0FBcUI7SUFBckIseUJBQXFCLEdBQXJCLGFBQXFCO0lBQ3ZFLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsYUFBYSxDQUFDO0FBQ3pFLENBQUM7QUFFRDtJQUNFLElBQUksR0FBeUIsQ0FBQztJQUM5QixJQUFJLE9BQThCLENBQUM7SUFDbkMsSUFBSSxHQUFRLENBQW1CO0lBRS9CLDZCQUFVLENBQUMseUJBQU0sQ0FDYixDQUFDLDhCQUFvQixFQUFFLDBCQUFNLENBQUMsRUFDOUIsVUFBQyxTQUFjLENBQUMsaUJBQWlCLEVBQUUsTUFBVyxDQUFDLGlCQUFpQjtRQUM5RCxHQUFHLEdBQUcsU0FBUyxDQUFDO1FBQ2hCLEdBQUcsR0FBRyxNQUFNLENBQUM7SUFDZixDQUFDLENBQUMs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