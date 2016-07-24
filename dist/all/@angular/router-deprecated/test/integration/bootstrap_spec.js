/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var mock_location_strategy_1 = require('@angular/common/testing/mock_location_strategy');
var core_1 = require('@angular/core');
var application_ref_1 = require('@angular/core/src/application_ref');
var console_1 = require('@angular/core/src/console');
var metadata_1 = require('@angular/core/src/metadata');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var dom_tokens_1 = require('@angular/platform-browser/src/dom/dom_tokens');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var router_deprecated_1 = require('@angular/router-deprecated');
var async_1 = require('../../src/facade/async');
var exceptions_1 = require('../../src/facade/exceptions');
var route_config_decorator_1 = require('../../src/route_config/route_config_decorator');
// noinspection JSAnnotator
var DummyConsole = (function () {
    function DummyConsole() {
    }
    DummyConsole.prototype.log = function (message /** TODO #9100 */) { };
    DummyConsole.prototype.warn = function (message /** TODO #9100 */) { };
    return DummyConsole;
}());
function main() {
    testing_internal_1.describe('router bootstrap', function () {
        testing_internal_1.beforeEachProviders(function () { return [router_deprecated_1.ROUTER_PROVIDERS, { provide: common_1.LocationStrategy, useClass: mock_location_strategy_1.MockLocationStrategy }, {
                provide: application_ref_1.ApplicationRef,
                useClass: testing_internal_1.MockApplicationRef
            }]; });
        testing_internal_1.beforeEach(function () { return core_1.disposePlatform(); });
        afterEach(function () { return core_1.disposePlatform(); });
        // do not refactor out the `bootstrap` functionality. We still want to
        // keep this test around so we can ensure that bootstrap a router works
        testing_internal_1.it('should bootstrap a simple app', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var fakeDoc = dom_adapter_1.getDOM().createHtmlDocument();
            var el = dom_adapter_1.getDOM().createElement('app-cmp', fakeDoc);
            dom_adapter_1.getDOM().appendChild(fakeDoc.body, el);
            platform_browser_dynamic_1.bootstrap(AppCmp, [
                router_deprecated_1.ROUTER_PROVIDERS, { provide: router_deprecated_1.ROUTER_PRIMARY_COMPONENT, useValue: AppCmp },
                { provide: common_1.LocationStrategy, useClass: mock_location_strategy_1.MockLocationStrategy },
                { provide: dom_tokens_1.DOCUMENT, useValue: fakeDoc }, { provide: console_1.Console, useClass: DummyConsole }
            ]).then(function (applicationRef) {
                var router = applicationRef.instance.router;
                router.subscribe(function (_ /** TODO #9100 */) {
                    matchers_1.expect(el).toHaveText('outer [ hello ]');
                    matchers_1.expect(applicationRef.instance.location.path()).toEqual('');
                    async.done();
                });
            });
        }));
        testing_internal_1.describe('broken app', function () {
            testing_internal_1.beforeEachProviders(function () { return [{ provide: router_deprecated_1.ROUTER_PRIMARY_COMPONENT, useValue: BrokenAppCmp }]; });
            testing_internal_1.it('should rethrow exceptions from component constructors', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, testing_1.TestComponentBuilder], function (async, tcb) {
                tcb.createAsync(AppCmp).then(function (fixture) {
                    var router = fixture.debugElement.componentInstance.router;
                    async_1.PromiseWrapper.catchError(router.navigateByUrl('/cause-error'), function (error) {
                        matchers_1.expect(error).toContainError('oops!');
                        async.done();
                    });
                });
            }));
        });
        testing_internal_1.describe('back button app', function () {
            testing_internal_1.beforeEachProviders(function () { return [{ provide: router_deprecated_1.ROUTER_PRIMARY_COMPONENT, useValue: HierarchyAppCmp }]; });
            testing_internal_1.it('should change the url without pushing a new history state for back navigations', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, testing_1.TestComponentBuilder], function (async, tcb) {
                tcb.createAsync(HierarchyAppCmp).then(function (fixture) {
                    var router = fixture.debugElement.componentInstance.router;
                    var position = 0;
                    var flipped = false;
                    var history = [
                        ['/parent/child', 'root [ parent [ hello ] ]', '/super-parent/child'],
                        ['/super-parent/child', 'root [ super-parent [ hello2 ] ]', '/parent/child'],
                        ['/parent/child', 'root [ parent [ hello ] ]', false]
                    ];
                    router.subscribe(function (_ /** TODO #9100 */) {
                        var location = fixture.debugElement.componentInstance.location;
                        var element = fixture.debugElement.nativeElement;
                        var path = location.path();
                        var entry = history[position];
                        matchers_1.expect(path).toEqual(entry[0]);
                        matchers_1.expect(element).toHaveText(entry[1]);
                        var nextUrl = entry[2];
                        if (nextUrl == false) {
                            flipped = true;
                        }
                        if (flipped && position == 0) {
                            async.done();
                            return;
                        }
                        position = position + (flipped ? -1 : 1);
                        if (flipped) {
                            location.back();
                        }
                        else {
                            router.navigateByUrl(nextUrl);
                        }
                    });
                    router.navigateByUrl(history[0][0]);
                });
            }), 1000);
        });
        testing_internal_1.describe('hierarchical app', function () {
            testing_internal_1.beforeEachProviders(function () { return [{ provide: router_deprecated_1.ROUTER_PRIMARY_COMPONENT, useValue: HierarchyAppCmp }]; });
            testing_internal_1.it('should bootstrap an app with a hierarchy', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, testing_1.TestComponentBuilder], function (async, tcb) {
                tcb.createAsync(HierarchyAppCmp).then(function (fixture) {
                    var router = fixture.debugElement.componentInstance.router;
                    router.subscribe(function (_ /** TODO #9100 */) {
                        matchers_1.expect(fixture.debugElement.nativeElement)
                            .toHaveText('root [ parent [ hello ] ]');
                        matchers_1.expect(fixture.debugElement.componentInstance.location.path())
                            .toEqual('/parent/child');
                        async.done();
                    });
                    router.navigateByUrl('/parent/child');
                });
            }));
            // TODO(btford): mock out level lower than LocationStrategy once that level exists
            testing_internal_1.xdescribe('custom app base ref', function () {
                testing_internal_1.beforeEachProviders(function () { return [{ provide: common_1.APP_BASE_HREF, useValue: '/my/app' }]; });
                testing_internal_1.it('should bootstrap', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, testing_1.TestComponentBuilder], function (async, tcb) {
                    tcb.createAsync(HierarchyAppCmp).then(function (fixture) {
                        var router = fixture.debugElement.componentInstance.router;
                        router.subscribe(function (_ /** TODO #9100 */) {
                            matchers_1.expect(fixture.debugElement.nativeElement)
                                .toHaveText('root [ parent [ hello ] ]');
                            matchers_1.expect(fixture.debugElement.componentInstance.location.path())
                                .toEqual('/my/app/parent/child');
                            async.done();
                        });
                        router.navigateByUrl('/parent/child');
                    });
                }));
            });
        });
        testing_internal_1.describe('querystring params app', function () {
            testing_internal_1.beforeEachProviders(function () { return [{ provide: router_deprecated_1.ROUTER_PRIMARY_COMPONENT, useValue: QueryStringAppCmp }]; });
            testing_internal_1.it('should recognize and return querystring params with the injected RouteParams', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, testing_1.TestComponentBuilder], function (async, tcb) {
                tcb.createAsync(QueryStringAppCmp).then(function (fixture) {
                    var router = fixture.debugElement.componentInstance.router;
                    router.subscribe(function (_ /** TODO #9100 */) {
                        fixture.detectChanges();
                        matchers_1.expect(fixture.debugElement.nativeElement)
                            .toHaveText('qParam = search-for-something');
                        /*
                        expect(applicationRef.hostComponent.location.path())
                            .toEqual('/qs?q=search-for-something');*/
                        async.done();
                    });
                    router.navigateByUrl('/qs?q=search-for-something');
                    fixture.detectChanges();
                });
            }));
        });
        testing_internal_1.describe('activate event on outlet', function () {
            var tcb = null;
            testing_internal_1.beforeEachProviders(function () { return [{ provide: router_deprecated_1.ROUTER_PRIMARY_COMPONENT, useValue: AppCmp }]; });
            testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder], function (testComponentBuilder /** TODO #9100 */) {
                tcb = testComponentBuilder;
            }));
            testing_internal_1.it('should get a reference and pass data to components loaded inside of outlets', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                tcb.createAsync(AppWithOutletListeners).then(function (fixture) {
                    var appInstance = fixture.debugElement.componentInstance;
                    var router = appInstance.router;
                    router.subscribe(function (_ /** TODO #9100 */) {
                        fixture.detectChanges();
                        matchers_1.expect(appInstance.helloCmp).toBeAnInstanceOf(HelloCmp);
                        matchers_1.expect(appInstance.helloCmp.message).toBe('Ahoy');
                        async.done();
                    });
                    // TODO(juliemr): This isn't necessary for the test to pass - figure
                    // out what's going on.
                    // router.navigateByUrl('/rainbow(pony)');
                });
            }));
        });
    });
}
exports.main = main;
var HelloCmp = (function () {
    function HelloCmp() {
    }
    /** @nocollapse */
    HelloCmp.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'hello-cmp', template: 'hello' },] },
    ];
    return HelloCmp;
}());
var Hello2Cmp = (function () {
    function Hello2Cmp() {
    }
    /** @nocollapse */
    Hello2Cmp.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'hello2-cmp', template: 'hello2' },] },
    ];
    return Hello2Cmp;
}());
var AppCmp = (function () {
    function AppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    /** @nocollapse */
    AppCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'app-cmp',
                    template: "outer [ <router-outlet></router-outlet> ]",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/', component: HelloCmp })],] },
    ];
    /** @nocollapse */
    AppCmp.ctorParameters = [
        { type: router_deprecated_1.Router, },
        { type: common_1.LocationStrategy, },
    ];
    return AppCmp;
}());
var AppWithOutletListeners = (function () {
    function AppWithOutletListeners(router, location) {
        this.router = router;
        this.location = location;
    }
    AppWithOutletListeners.prototype.activateHello = function (cmp) {
        this.helloCmp = cmp;
        this.helloCmp.message = 'Ahoy';
    };
    AppWithOutletListeners.prototype.activateHello2 = function (cmp) { this.hello2Cmp = cmp; };
    /** @nocollapse */
    AppWithOutletListeners.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'app-cmp',
                    template: "\n    Hello routing!\n    <router-outlet (activate)=\"activateHello($event)\"></router-outlet>\n    <router-outlet (activate)=\"activateHello2($event)\" name=\"pony\"></router-outlet>",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[
                    new route_config_decorator_1.Route({ path: '/rainbow', component: HelloCmp }),
                    new route_config_decorator_1.AuxRoute({ name: 'pony', path: 'pony', component: Hello2Cmp })
                ],] },
    ];
    /** @nocollapse */
    AppWithOutletListeners.ctorParameters = [
        { type: router_deprecated_1.Router, },
        { type: common_1.LocationStrategy, },
    ];
    return AppWithOutletListeners;
}());
var ParentCmp = (function () {
    function ParentCmp() {
    }
    /** @nocollapse */
    ParentCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'parent-cmp',
                    template: "parent [ <router-outlet></router-outlet> ]",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/child', component: HelloCmp })],] },
    ];
    return ParentCmp;
}());
var SuperParentCmp = (function () {
    function SuperParentCmp() {
    }
    /** @nocollapse */
    SuperParentCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'super-parent-cmp',
                    template: "super-parent [ <router-outlet></router-outlet> ]",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/child', component: Hello2Cmp })],] },
    ];
    return SuperParentCmp;
}());
var HierarchyAppCmp = (function () {
    function HierarchyAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    /** @nocollapse */
    HierarchyAppCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'app-cmp',
                    template: "root [ <router-outlet></router-outlet> ]",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[
                    new route_config_decorator_1.Route({ path: '/parent/...', component: ParentCmp }),
                    new route_config_decorator_1.Route({ path: '/super-parent/...', component: SuperParentCmp })
                ],] },
    ];
    /** @nocollapse */
    HierarchyAppCmp.ctorParameters = [
        { type: router_deprecated_1.Router, },
        { type: common_1.LocationStrategy, },
    ];
    return HierarchyAppCmp;
}());
var QSCmp = (function () {
    function QSCmp(params) {
        this.q = params.get('q');
    }
    /** @nocollapse */
    QSCmp.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'qs-cmp', template: "qParam = {{q}}" },] },
    ];
    /** @nocollapse */
    QSCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return QSCmp;
}());
var QueryStringAppCmp = (function () {
    function QueryStringAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    /** @nocollapse */
    QueryStringAppCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'app-cmp',
                    template: "<router-outlet></router-outlet>",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/qs', component: QSCmp })],] },
    ];
    /** @nocollapse */
    QueryStringAppCmp.ctorParameters = [
        { type: router_deprecated_1.Router, },
        { type: common_1.LocationStrategy, },
    ];
    return QueryStringAppCmp;
}());
var BrokenCmp = (function () {
    function BrokenCmp() {
        throw new exceptions_1.BaseException('oops!');
    }
    /** @nocollapse */
    BrokenCmp.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'oops-cmp', template: 'oh no' },] },
    ];
    /** @nocollapse */
    BrokenCmp.ctorParameters = [];
    return BrokenCmp;
}());
var BrokenAppCmp = (function () {
    function BrokenAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    /** @nocollapse */
    BrokenAppCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'app-cmp',
                    template: "outer [ <router-outlet></router-outlet> ]",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/cause-error', component: BrokenCmp })],] },
    ];
    /** @nocollapse */
    BrokenAppCmp.ctorParameters = [
        { type: router_deprecated_1.Router, },
        { type: common_1.LocationStrategy, },
    ];
    return BrokenAppCmp;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci1kZXByZWNhdGVkL3Rlc3QvaW50ZWdyYXRpb24vYm9vdHN0cmFwX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHVCQUE4QyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2hFLHVDQUFtQyxnREFBZ0QsQ0FBQyxDQUFBO0FBQ3BGLHFCQUE4QixlQUFlLENBQUMsQ0FBQTtBQUM5QyxnQ0FBNkIsbUNBQW1DLENBQUMsQ0FBQTtBQUNqRSx3QkFBc0IsMkJBQTJCLENBQUMsQ0FBQTtBQUNsRCx5QkFBd0IsNEJBQTRCLENBQUMsQ0FBQTtBQUNyRCx3QkFBbUMsdUJBQXVCLENBQUMsQ0FBQTtBQUMzRCxpQ0FBNEksd0NBQXdDLENBQUMsQ0FBQTtBQUNyTCx5Q0FBd0IsbUNBQW1DLENBQUMsQ0FBQTtBQUM1RCw0QkFBcUIsK0NBQStDLENBQUMsQ0FBQTtBQUNyRSwyQkFBdUIsOENBQThDLENBQUMsQ0FBQTtBQUN0RSx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUNsRSxrQ0FBaUcsNEJBQTRCLENBQUMsQ0FBQTtBQUU5SCxzQkFBNkIsd0JBQXdCLENBQUMsQ0FBQTtBQUN0RCwyQkFBNEIsNkJBQTZCLENBQUMsQ0FBQTtBQUMxRCx1Q0FBMkMsK0NBQStDLENBQUMsQ0FBQTtBQUkzRiwyQkFBMkI7QUFDM0I7SUFBQTtJQUdBLENBQUM7SUFGQywwQkFBRyxHQUFILFVBQUksT0FBWSxDQUFDLGlCQUFpQixJQUFHLENBQUM7SUFDdEMsMkJBQUksR0FBSixVQUFLLE9BQVksQ0FBQyxpQkFBaUIsSUFBRyxDQUFDO0lBQ3pDLG1CQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFFRDtJQUNFLDJCQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDM0Isc0NBQW1CLENBQ2YsY0FBTSxPQUFBLENB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