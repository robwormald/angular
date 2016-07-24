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
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var common_1 = require('@angular/common');
var metadata_1 = require('@angular/core/src/metadata');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var console_1 = require('@angular/core/src/console');
var core_1 = require('@angular/core');
var dom_tokens_1 = require('@angular/platform-browser/src/dom/dom_tokens');
var router_deprecated_1 = require('@angular/router-deprecated');
var mock_location_strategy_1 = require('@angular/common/testing/mock_location_strategy');
var _ArrayLogger = (function () {
    function _ArrayLogger() {
        this.res = [];
    }
    _ArrayLogger.prototype.log = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logError = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logGroup = function (s) { this.res.push(s); };
    _ArrayLogger.prototype.logGroupEnd = function () { };
    ;
    return _ArrayLogger;
}());
var DummyConsole = (function () {
    function DummyConsole() {
    }
    DummyConsole.prototype.log = function (message /** TODO #9100 */) { };
    DummyConsole.prototype.warn = function (message /** TODO #9100 */) { };
    return DummyConsole;
}());
function main() {
    testing_internal_1.describe('RouteConfig with POJO arguments', function () {
        var fakeDoc /** TODO #9100 */, el /** TODO #9100 */, testBindings;
        testing_internal_1.beforeEach(function () {
            core_1.disposePlatform();
            fakeDoc = dom_adapter_1.getDOM().createHtmlDocument();
            el = dom_adapter_1.getDOM().createElement('app-cmp', fakeDoc);
            dom_adapter_1.getDOM().appendChild(fakeDoc.body, el);
            var logger = new _ArrayLogger();
            var exceptionHandler = new core_1.ExceptionHandler(logger, false);
            testBindings = [
                router_deprecated_1.ROUTER_PROVIDERS, { provide: common_1.LocationStrategy, useClass: mock_location_strategy_1.MockLocationStrategy },
                { provide: dom_tokens_1.DOCUMENT, useValue: fakeDoc },
                { provide: core_1.ExceptionHandler, useValue: exceptionHandler },
                { provide: console_1.Console, useClass: DummyConsole }
            ];
        });
        afterEach(function () { return core_1.disposePlatform(); });
        testing_internal_1.it('should bootstrap an app with a hierarchy', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            platform_browser_dynamic_1.bootstrap(HierarchyAppCmp, testBindings).then(function (applicationRef) {
                var router = applicationRef.instance.router;
                router.subscribe(function (_ /** TODO #9100 */) {
                    matchers_1.expect(el).toHaveText('root [ parent [ hello ] ]');
                    matchers_1.expect(applicationRef.instance.location.path()).toEqual('/parent/child');
                    async.done();
                });
                router.navigateByUrl('/parent/child');
            });
        }));
        testing_internal_1.it('should work in an app with redirects', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            platform_browser_dynamic_1.bootstrap(RedirectAppCmp, testBindings).then(function (applicationRef) {
                var router = applicationRef.instance.router;
                router.subscribe(function (_ /** TODO #9100 */) {
                    matchers_1.expect(el).toHaveText('root [ hello ]');
                    matchers_1.expect(applicationRef.instance.location.path()).toEqual('/after');
                    async.done();
                });
                router.navigateByUrl('/before');
            });
        }));
        testing_internal_1.it('should work in an app with async components', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            platform_browser_dynamic_1.bootstrap(AsyncAppCmp, testBindings).then(function (applicationRef) {
                var router = applicationRef.instance.router;
                router.subscribe(function (_ /** TODO #9100 */) {
                    matchers_1.expect(el).toHaveText('root [ hello ]');
                    matchers_1.expect(applicationRef.instance.location.path()).toEqual('/hello');
                    async.done();
                });
                router.navigateByUrl('/hello');
            });
        }));
        testing_internal_1.it('should work in an app with aux routes', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            platform_browser_dynamic_1.bootstrap(AuxAppCmp, testBindings).then(function (applicationRef) {
                var router = applicationRef.instance.router;
                router.subscribe(function (_ /** TODO #9100 */) {
                    matchers_1.expect(el).toHaveText('root [ hello ] aside [ hello ]');
                    matchers_1.expect(applicationRef.instance.location.path()).toEqual('/hello(aside)');
                    async.done();
                });
                router.navigateByUrl('/hello(aside)');
            });
        }));
        testing_internal_1.it('should work in an app with async components defined with "loader"', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            platform_browser_dynamic_1.bootstrap(ConciseAsyncAppCmp, testBindings).then(function (applicationRef) {
                var router = applicationRef.instance.router;
                router.subscribe(function (_ /** TODO #9100 */) {
                    matchers_1.expect(el).toHaveText('root [ hello ]');
                    matchers_1.expect(applicationRef.instance.location.path()).toEqual('/hello');
                    async.done();
                });
                router.navigateByUrl('/hello');
            });
        }));
        testing_internal_1.it('should work in an app with a constructor component', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            platform_browser_dynamic_1.bootstrap(ExplicitConstructorAppCmp, testBindings).then(function (applicationRef) {
                var router = applicationRef.instance.router;
                router.subscribe(function (_ /** TODO #9100 */) {
                    matchers_1.expect(el).toHaveText('root [ hello ]');
                    matchers_1.expect(applicationRef.instance.location.path()).toEqual('/hello');
                    async.done();
                });
                router.navigateByUrl('/hello');
            });
        }));
        testing_internal_1.it('should throw if a config is missing a target', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            platform_browser_dynamic_1.bootstrap(WrongConfigCmp, testBindings).catch(function (e) {
                matchers_1.expect(e.originalException)
                    .toContainError('Route config should contain exactly one "component", "loader", or "redirectTo" property.');
                async.done();
                return null;
            });
        }));
        testing_internal_1.it('should throw if a config has an invalid component type', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            platform_browser_dynamic_1.bootstrap(WrongComponentTypeCmp, testBindings).catch(function (e) {
                matchers_1.expect(e.originalException)
                    .toContainError('Invalid component type "intentionallyWrongComponentType". Valid types are "constructor" and "loader".');
                async.done();
                return null;
            });
        }));
        testing_internal_1.it('should throw if a config has an invalid alias name', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            platform_browser_dynamic_1.bootstrap(BadAliasNameCmp, testBindings).catch(function (e) {
                matchers_1.expect(e.originalException)
                    .toContainError("Route \"/child\" with name \"child\" does not begin with an uppercase letter. Route names should be PascalCase like \"Child\".");
                async.done();
                return null;
            });
        }));
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
var RedirectAppCmp = (function () {
    function RedirectAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    /** @nocollapse */
    RedirectAppCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'app-cmp',
                    template: "root [ <router-outlet></router-outlet> ]",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[
                    { path: '/before', redirectTo: ['Hello'] }, { path: '/after', component: HelloCmp, name: 'Hello' }
                ],] },
    ];
    /** @nocollapse */
    RedirectAppCmp.ctorParameters = [
        { type: router_deprecated_1.Router, },
        { type: common_1.LocationStrategy, },
    ];
    return RedirectAppCmp;
}());
function HelloLoader() {
    return Promise.resolve(HelloCmp);
}
var AsyncAppCmp = (function () {
    function AsyncAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    /** @nocollapse */
    AsyncAppCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'app-cmp',
                    template: "root [ <router-outlet></router-outlet> ]",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[
                    { path: '/hello', component: { type: 'loader', loader: HelloLoader } },
                ],] },
    ];
    /** @nocollapse */
    AsyncAppCmp.ctorParameters = [
        { type: router_deprecated_1.Router, },
        { type: common_1.LocationStrategy, },
    ];
    return AsyncAppCmp;
}());
var ConciseAsyncAppCmp = (function () {
    function ConciseAsyncAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    /** @nocollapse */
    ConciseAsyncAppCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'app-cmp',
                    template: "root [ <router-outlet></router-outlet> ]",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[
                    { path: '/hello', loader: HelloLoader },
                ],] },
    ];
    /** @nocollapse */
    ConciseAsyncAppCmp.ctorParameters = [
        { type: router_deprecated_1.Router, },
        { type: common_1.LocationStrategy, },
    ];
    return ConciseAsyncAppCmp;
}());
var AuxAppCmp = (function () {
    function AuxAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    /** @nocollapse */
    AuxAppCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'app-cmp',
                    template: "root [ <router-outlet></router-outlet> ] aside [ <router-outlet name=\"aside\"></router-outlet> ]",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[{ path: '/hello', component: HelloCmp }, { aux: 'aside', component: HelloCmp }],] },
    ];
    /** @nocollapse */
    AuxAppCmp.ctorParameters = [
        { type: router_deprecated_1.Router, },
        { type: common_1.LocationStrategy, },
    ];
    return AuxAppCmp;
}());
var ExplicitConstructorAppCmp = (function () {
    function ExplicitConstructorAppCmp(router, location) {
        this.router = router;
        this.location = location;
    }
    /** @nocollapse */
    ExplicitConstructorAppCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'app-cmp',
                    template: "root [ <router-outlet></router-outlet> ]",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[
                    { path: '/hello', component: { type: 'constructor', constructor: HelloCmp } },
                ],] },
    ];
    /** @nocollapse */
    ExplicitConstructorAppCmp.ctorParameters = [
        { type: router_deprecated_1.Router, },
        { type: common_1.LocationStrategy, },
    ];
    return ExplicitConstructorAppCmp;
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
        { type: router_deprecated_1.RouteConfig, args: [[{ path: '/child', component: HelloCmp }],] },
    ];
    return ParentCmp;
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
        { type: router_deprecated_1.RouteConfig, args: [[{ path: '/parent/...', component: ParentCmp }],] },
    ];
    /** @nocollapse */
    HierarchyAppCmp.ctorParameters = [
        { type: router_deprecated_1.Router, },
        { type: common_1.LocationStrategy, },
    ];
    return HierarchyAppCmp;
}());
var WrongConfigCmp = (function () {
    function WrongConfigCmp() {
    }
    /** @nocollapse */
    WrongConfigCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'app-cmp',
                    template: "root [ <router-outlet></router-outlet> ]",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[{ path: '/hello' }],] },
    ];
    return WrongConfigCmp;
}());
var BadAliasNameCmp = (function () {
    function BadAliasNameCmp() {
    }
    /** @nocollapse */
    BadAliasNameCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'app-cmp',
                    template: "root [ <router-outlet></router-outlet> ]",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[{ path: '/child', component: HelloCmp, name: 'child' }],] },
    ];
    return BadAliasNameCmp;
}());
var WrongComponentTypeCmp = (function () {
    function WrongComponentTypeCmp() {
    }
    /** @nocollapse */
    WrongComponentTypeCmp.decorators = [
        { type: metadata_1.Component, args: [{
                    selector: 'app-cmp',
                    template: "root [ <router-outlet></router-outlet> ]",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[
                    { path: '/hello', component: { type: 'intentionallyWrongComponentType', constructor: HelloCmp } },
                ],] },
    ];
    return WrongComponentTypeCmp;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVfY29uZmlnX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci1kZXByZWNhdGVkL3Rlc3Qvcm91dGVfY29uZmlnL3JvdXRlX2NvbmZpZ19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBb0csd0NBQXdDLENBQUMsQ0FBQTtBQUM3SSx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUVsRSx5Q0FBd0IsbUNBQW1DLENBQUMsQ0FBQTtBQUM1RCx1QkFBK0IsaUJBQWlCLENBQUMsQ0FBQTtBQUNqRCx5QkFBbUMsNEJBQTRCLENBQUMsQ0FBQTtBQUNoRSw0QkFBcUIsK0NBQStDLENBQUMsQ0FBQTtBQUNyRSx3QkFBc0IsMkJBQTJCLENBQUMsQ0FBQTtBQUNsRCxxQkFBZ0QsZUFBZSxDQUFDLENBQUE7QUFDaEUsMkJBQXVCLDhDQUE4QyxDQUFDLENBQUE7QUFDdEUsa0NBQXVFLDRCQUE0QixDQUFDLENBQUE7QUFDcEcsdUNBQW1DLGdEQUFnRCxDQUFDLENBQUE7QUFFcEY7SUFBQTtRQUNFLFFBQUcsR0FBVSxFQUFFLENBQUM7SUFLbEIsQ0FBQztJQUpDLDBCQUFHLEdBQUgsVUFBSSxDQUFNLElBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLCtCQUFRLEdBQVIsVUFBUyxDQUFNLElBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLCtCQUFRLEdBQVIsVUFBUyxDQUFNLElBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLGtDQUFXLEdBQVgsY0FBYyxDQUFDOztJQUNqQixtQkFBQztBQUFELENBQUMsQUFORCxJQU1DO0FBRUQ7SUFBQTtJQUdBLENBQUM7SUFGQywwQkFBRyxHQUFILFVBQUksT0FBWSxDQUFDLGlCQUFpQixJQUFHLENBQUM7SUFDdEMsMkJBQUksR0FBSixVQUFLLE9BQVksQ0FBQyxpQkFBaUIsSUFBRyxDQUFDO0lBQ3pDLG1CQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFFRDtJQUNFLDJCQUFRLENBQUMsaUNBQWlDLEVBQUU7UUFDMUMsSUFBSSxPQUFZLENBQUMsaUJBQWlCLEVBQUUsRUFBTyxDQUFDLGlCQUFpQixFQUN6RCxZQUFpQixDQUFtQjtRQUN4Qyw2QkFBVSxDQUFDO1lBQ1Qsc0JBQWUsRUFBRSxDQUFDO1lBQ2xCLE9BQU8sR0FBRyxvQkFBTSxFQUFFLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUN4QyxFQUFFLEdBQUcsb0JBQU0sRUFBRSxDQUFDLGFBQWEsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDaEQsb0JBQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZDLElBQUksTUFBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFDaEMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLHVCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMzRCxZQUFZLEdBQUc7Z0JBQ2Isb0NBQWdCLEVBQUUsRUFBQyxPQUFPLEVBQUUseUJBQWdCLEVBQUUsUUFBUSxFQUFFLDZDQUFvQixFQUFDO2dCQUM3RSxFQUFDLE9BQU8sRUFBRSxxQkFBUSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUM7Z0JBQ3RDLEVBQUMsT0FBTyxFQUFFLHVCQUFnQixFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBQztnQkFDdkQsRUFBQyxPQUFPLEVBQUUsaUJBQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFDO2FBQzNDLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILFNBQVMsQ0FBQyxjQUFNLE9BQUEsc0JBQWUsRUFBRSxFQUFqQixDQUFpQixDQUFDLENBQUM7UUFFbkMscUJBQUUsQ0FBQywwQ0FBMEMsRUFDMUMseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxvQ0FBUyxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxjQUFjO2dCQUMzRCxJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDNUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLENBQU0sQ0FBQyxpQkFBaUI7b0JBQ3hDLGlCQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLDJCQUEyQixDQUFDLENBQUM7b0JBQ25ELGlCQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ3pFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDZixDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUdQLHFCQUFFLENBQUMsc0NBQXNDLEVBQ3RDLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsb0NBQVMsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsY0FBYztnQkFDMUQsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBQyxDQUFNLENBQUMsaUJBQWlCO29CQUN4QyxpQkFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUN4QyxpQkFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNsRSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2YsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHUCxxQkFBRSxDQUFDLDZDQUE2QyxFQUM3Qyx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ3JELG9DQUFTLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLGNBQWM7Z0JBQ3ZELElBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUM1QyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBTSxDQUFDLGlCQUFpQjtvQkFDeEMsaUJBQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDeEMsaUJBQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbEUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNmLENBQUMsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBR1AscUJBQUUsQ0FBQyx1Q0FBdUMsRUFDdkMseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxvQ0FBUyxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxjQUFjO2dCQUNyRCxJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDNUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLENBQU0sQ0FBQyxpQkFBaUI7b0JBQ3hDLGlCQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7b0JBQ3hELGlCQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7b0JBQ3pFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDZixDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUdQLHFCQUFFLENBQUMsbUVBQW1FLEVBQ25FLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsb0NBQVMsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxjQUFjO2dCQUM5RCxJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDNUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLENBQU0sQ0FBQyxpQkFBaUI7b0JBQ3hDLGlCQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQ3hDLGlCQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2xFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDZixDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUdQLHFCQUFFLENBQUMsb0RBQW9ELEVBQ3BELHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsb0NBQVMsQ0FBQyx5QkFBeUIsRUFBRSxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxjQUFjO2dCQUNyRSxJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztnQkFDNUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFDLENBQU0sQ0FBQyxpQkFBaUI7b0JBQ3hDLGlCQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQ3hDLGlCQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ2xFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDZixDQUFDLENBQUMsQ0FBQztnQkFDSCxNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVQLHFCQUFFLENBQUMsOENBQThDLEVBQzlDLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsb0NBQVMsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUMsQ0FBQztnQkFDOUMsaUJBQU0sQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7cUJBQ3RCLGNBQWMsQ0FDWCwwRkFBMEYsQ0FBQyxDQUFDO2dCQUNwRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVQLHFCQUFFLENBQUMsd0RBQXdELEVBQ3hELHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsb0NBQVMsQ0FBQyxxQkFBcUIsRUFBRSxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDO2dCQUNyRCxpQkFBTSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztxQkFDdEIsY0FBYyxDQUNYLHVHQUF1RyxDQUFDLENBQUM7Z0JBQ2pILEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDYixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRVAscUJBQUUsQ0FBQyxvREFBb0QsRUFDcEQseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxvQ0FBUyxDQUFDLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQyxDQUFDO2dCQUMvQyxpQkFBTSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQztxQkFDdEIsY0FBYyxDQUNYLGdJQUEwSCxDQUFDLENBQUM7Z0JBQ3BJLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDYixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRVQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBMUllLFlBQUksT0EwSW5CLENBQUE7QUFDRDtJQUFBO0lBS0EsQ0FBQztJQUpELGtCQUFrQjtJQUNYLG1CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUMsRUFBRyxFQUFFO0tBQ3hFLENBQUM7SUFDRixlQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFDRDtJQUNFLHdCQUFtQixNQUFjLEVBQVMsUUFBMEI7UUFBakQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQztJQUMxRSxrQkFBa0I7SUFDWCx5QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxvQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsU0FBUztvQkFDbkIsUUFBUSxFQUFFLDBDQUEwQztvQkFDcEQsVUFBVSxFQUFFLHFDQUFpQjtpQkFDOUIsRUFBRyxFQUFFO1FBQ04sRUFBRSxJQUFJLEVBQUUsK0JBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDMUIsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFDLEVBQUUsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBQztpQkFDL0YsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDZCQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLDBCQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUseUJBQWdCLEdBQUc7S0FDekIsQ0FBQztJQUNGLHFCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQUVEO0lBQ0UsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUNEO0lBQ0UscUJBQW1CLE1BQWMsRUFBUyxRQUEwQjtRQUFqRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDO0lBQzFFLGtCQUFrQjtJQUNYLHNCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxTQUFTO29CQUNuQixRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxVQUFVLEVBQUUscUNBQWlCO2lCQUM5QixFQUFHLEVBQUU7UUFDTixFQUFFLElBQUksRUFBRSwrQkFBVyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUMxQixFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFDLEVBQUM7aUJBQ25FLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwwQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSwwQkFBTSxHQUFHO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLHlCQUFnQixHQUFHO0tBQ3pCLENBQUM7SUFDRixrQkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFDRDtJQUNFLDRCQUFtQixNQUFjLEVBQVMsUUFBMEI7UUFBakQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQztJQUMxRSxrQkFBa0I7SUFDWCw2QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxvQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsU0FBUztvQkFDbkIsUUFBUSxFQUFFLDBDQUEwQztvQkFDcEQsVUFBVSxFQUFFLHFDQUFpQjtpQkFDOUIsRUFBRyxFQUFFO1FBQ04sRUFBRSxJQUFJLEVBQUUsK0JBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDMUIsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUM7aUJBQ3RDLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCxpQ0FBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSwwQkFBTSxHQUFHO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLHlCQUFnQixHQUFHO0tBQ3pCLENBQUM7SUFDRix5QkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFDRDtJQUNFLG1CQUFtQixNQUFjLEVBQVMsUUFBMEI7UUFBakQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQztJQUMxRSxrQkFBa0I7SUFDWCxvQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxvQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsU0FBUztvQkFDbkIsUUFBUSxFQUNKLG1HQUFpRztvQkFDckcsVUFBVSxFQUFFLHFDQUFpQjtpQkFDOUIsRUFBRyxFQUFFO1FBQ04sRUFBRSxJQUFJLEVBQUUsK0JBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsQ0FBQyxFQUFHLEVBQUU7S0FDNUcsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHdCQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLDBCQUFNLEdBQUc7UUFDaEIsRUFBQyxJQUFJLEVBQUUseUJBQWdCLEdBQUc7S0FDekIsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxBQWpCRCxJQWlCQztBQUNEO0lBQ0UsbUNBQW1CLE1BQWMsRUFBUyxRQUEwQjtRQUFqRCxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7SUFBRyxDQUFDO0lBQzFFLGtCQUFrQjtJQUNYLG9DQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxTQUFTO29CQUNuQixRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxVQUFVLEVBQUUscUNBQWlCO2lCQUM5QixFQUFHLEVBQUU7UUFDTixFQUFFLElBQUksRUFBRSwrQkFBVyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUMxQixFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFDLEVBQUM7aUJBQzFFLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCx3Q0FBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSwwQkFBTSxHQUFHO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLHlCQUFnQixHQUFHO0tBQ3pCLENBQUM7SUFDRixnQ0FBQztBQUFELENBQUMsQUFsQkQsSUFrQkM7QUFDRDtJQUFBO0lBVUEsQ0FBQztJQVRELGtCQUFrQjtJQUNYLG9CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxZQUFZO29CQUN0QixRQUFRLEVBQUUsNENBQTRDO29CQUN0RCxVQUFVLEVBQUUscUNBQWlCO2lCQUM5QixFQUFHLEVBQUU7UUFDTixFQUFFLElBQUksRUFBRSwrQkFBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUMsQ0FBQyxFQUFHLEVBQUU7S0FDdkUsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFDRDtJQUNFLHlCQUFtQixNQUFjLEVBQVMsUUFBMEI7UUFBakQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQWtCO0lBQUcsQ0FBQztJQUMxRSxrQkFBa0I7SUFDWCwwQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxvQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsU0FBUztvQkFDbkIsUUFBUSxFQUFFLDBDQUEwQztvQkFDcEQsVUFBVSxFQUFFLHFDQUFpQjtpQkFDOUIsRUFBRyxFQUFFO1FBQ04sRUFBRSxJQUFJLEVBQUUsK0JBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLENBQUMsRUFBRyxFQUFFO0tBQzdFLENBQUM7SUFDRixrQkFBa0I7SUFDWCw4QkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSwwQkFBTSxHQUFHO1FBQ2hCLEVBQUMsSUFBSSxFQUFFLHlCQUFnQixHQUFHO0tBQ3pCLENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFDRDtJQUFBO0lBVUEsQ0FBQztJQVRELGtCQUFrQjtJQUNYLHlCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxTQUFTO29CQUNuQixRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxVQUFVLEVBQUUscUNBQWlCO2lCQUM5QixFQUFHLEVBQUU7UUFDTixFQUFFLElBQUksRUFBRSwrQkFBVyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUMsRUFBRyxFQUFFO0tBQ2xELENBQUM7SUFDRixxQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBQ0Q7SUFBQTtJQVVBLENBQUM7SUFURCxrQkFBa0I7SUFDWCwwQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxvQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsU0FBUztvQkFDbkIsUUFBUSxFQUFFLDBDQUEwQztvQkFDcEQsVUFBVSxFQUFFLHFDQUFpQjtpQkFDOUIsRUFBRyxFQUFFO1FBQ04sRUFBRSxJQUFJLEVBQUUsK0JBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQyxFQUFHLEVBQUU7S0FDdEYsQ0FBQztJQUNGLHNCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFDRDtJQUFBO0lBWUEsQ0FBQztJQVhELGtCQUFrQjtJQUNYLGdDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxTQUFTO29CQUNuQixRQUFRLEVBQUUsMENBQTBDO29CQUNwRCxVQUFVLEVBQUUscUNBQWlCO2lCQUM5QixFQUFHLEVBQUU7UUFDTixFQUFFLElBQUksRUFBRSwrQkFBVyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUMxQixFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEVBQUMsSUFBSSxFQUFFLGlDQUFpQyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUMsRUFBQztpQkFDOUYsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLDRCQUFDO0FBQUQsQ0FBQyxBQVpELElBWUMifQ==