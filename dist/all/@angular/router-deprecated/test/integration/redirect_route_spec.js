/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var router_deprecated_1 = require('@angular/router-deprecated');
var route_config_decorator_1 = require('../../src/route_config/route_config_decorator');
var fixture_components_1 = require('./impl/fixture_components');
var util_1 = require('./util');
var cmpInstanceCount;
var childCmpInstanceCount;
function main() {
    testing_internal_1.describe('redirects', function () {
        var tcb;
        var rootTC;
        var rtr;
        testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
        testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router], function (tcBuilder /** TODO #9100 */, router /** TODO #9100 */) {
            tcb = tcBuilder;
            rtr = router;
            childCmpInstanceCount = 0;
            cmpInstanceCount = 0;
        }));
        testing_internal_1.it('should apply when navigating by URL', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
            util_1.compile(tcb)
                .then(function (rtc) { rootTC = rtc; })
                .then(function (_) { return rtr.config([
                new route_config_decorator_1.Redirect({ path: '/original', redirectTo: ['Hello'] }),
                new route_config_decorator_1.Route({ path: '/redirected', component: fixture_components_1.HelloCmp, name: 'Hello' })
            ]); })
                .then(function (_) { return rtr.navigateByUrl('/original'); })
                .then(function (_) {
                rootTC.detectChanges();
                matchers_1.expect(rootTC.debugElement.nativeElement).toHaveText('hello');
                matchers_1.expect(location.urlChanges).toEqual(['/redirected']);
                async.done();
            });
        }));
        testing_internal_1.it('should recognize and apply absolute redirects', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
            util_1.compile(tcb)
                .then(function (rtc) { rootTC = rtc; })
                .then(function (_) { return rtr.config([
                new route_config_decorator_1.Redirect({ path: '/original', redirectTo: ['/Hello'] }),
                new route_config_decorator_1.Route({ path: '/redirected', component: fixture_components_1.HelloCmp, name: 'Hello' })
            ]); })
                .then(function (_) { return rtr.navigateByUrl('/original'); })
                .then(function (_) {
                rootTC.detectChanges();
                matchers_1.expect(rootTC.debugElement.nativeElement).toHaveText('hello');
                matchers_1.expect(location.urlChanges).toEqual(['/redirected']);
                async.done();
            });
        }));
        testing_internal_1.it('should recognize and apply relative child redirects', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
            util_1.compile(tcb)
                .then(function (rtc) { rootTC = rtc; })
                .then(function (_) { return rtr.config([
                new route_config_decorator_1.Redirect({ path: '/original', redirectTo: ['./Hello'] }),
                new route_config_decorator_1.Route({ path: '/redirected', component: fixture_components_1.HelloCmp, name: 'Hello' })
            ]); })
                .then(function (_) { return rtr.navigateByUrl('/original'); })
                .then(function (_) {
                rootTC.detectChanges();
                matchers_1.expect(rootTC.debugElement.nativeElement).toHaveText('hello');
                matchers_1.expect(location.urlChanges).toEqual(['/redirected']);
                async.done();
            });
        }));
        testing_internal_1.it('should recognize and apply relative parent redirects', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
            util_1.compile(tcb)
                .then(function (rtc) { rootTC = rtc; })
                .then(function (_) { return rtr.config([
                new route_config_decorator_1.Route({ path: '/original/...', component: fixture_components_1.RedirectToParentCmp }),
                new route_config_decorator_1.Route({ path: '/redirected', component: fixture_components_1.HelloCmp, name: 'HelloSib' })
            ]); })
                .then(function (_) { return rtr.navigateByUrl('/original/child-redirect'); })
                .then(function (_) {
                rootTC.detectChanges();
                matchers_1.expect(rootTC.debugElement.nativeElement).toHaveText('hello');
                matchers_1.expect(location.urlChanges).toEqual(['/redirected']);
                async.done();
            });
        }));
        testing_internal_1.it('should not redirect when redirect is less specific than other matching routes', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
            util_1.compile(tcb)
                .then(function (rtc) { rootTC = rtc; })
                .then(function (_) { return rtr.config([
                new route_config_decorator_1.Route({ path: '/foo', component: fixture_components_1.HelloCmp, name: 'Hello' }),
                new route_config_decorator_1.Route({ path: '/:param', component: fixture_components_1.GoodbyeCmp, name: 'Goodbye' }),
                new route_config_decorator_1.Redirect({ path: '/*rest', redirectTo: ['/Hello'] })
            ]); })
                .then(function (_) { return rtr.navigateByUrl('/bye'); })
                .then(function (_) {
                rootTC.detectChanges();
                matchers_1.expect(rootTC.debugElement.nativeElement).toHaveText('goodbye');
                matchers_1.expect(location.urlChanges).toEqual(['/bye']);
                async.done();
            });
        }));
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVkaXJlY3Rfcm91dGVfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyLWRlcHJlY2F0ZWQvdGVzdC9pbnRlZ3JhdGlvbi9yZWRpcmVjdF9yb3V0ZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx1QkFBdUIsaUJBQWlCLENBQUMsQ0FBQTtBQUN6Qyx3QkFBcUQsdUJBQXVCLENBQUMsQ0FBQTtBQUM3RSxpQ0FBd0gsd0NBQXdDLENBQUMsQ0FBQTtBQUNqSyx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUNsRSxrQ0FBdUUsNEJBQTRCLENBQUMsQ0FBQTtBQUVwRyx1Q0FBaUUsK0NBQStDLENBQUMsQ0FBQTtBQUVqSCxtQ0FBd0QsMkJBQTJCLENBQUMsQ0FBQTtBQUNwRixxQkFBc0QsUUFBUSxDQUFDLENBQUE7QUFFL0QsSUFBSSxnQkFBcUIsQ0FBbUI7QUFDNUMsSUFBSSxxQkFBMEIsQ0FBbUI7QUFFakQ7SUFDRSwyQkFBUSxDQUFDLFdBQVcsRUFBRTtRQUVwQixJQUFJLEdBQXlCLENBQUM7UUFDOUIsSUFBSSxNQUE2QixDQUFDO1FBQ2xDLElBQUksR0FBUSxDQUFtQjtRQUUvQixzQ0FBbUIsQ0FBQyxjQUFNLE9BQUEsNEJBQXFCLEVBQXJCLENBQXFCLENBQUMsQ0FBQztRQUVqRCw2QkFBVSxDQUFDLHlCQUFNLENBQ2IsQ0FBQyw4QkFBb0IsRUFBRSwwQkFBTSxDQUFDLEVBQzlCLFVBQUMsU0FBYyxDQUFDLGlCQUFpQixFQUFFLE1BQVcsQ0FBQyxpQkFBaUI7WUFDOUQsR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUNoQixHQUFHLEdBQUcsTUFBTSxDQUFDO1lBQ2IscUJBQXFCLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLGdCQUFnQixHQUFHLENBQUMsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBR1IscUJBQUUsQ0FB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