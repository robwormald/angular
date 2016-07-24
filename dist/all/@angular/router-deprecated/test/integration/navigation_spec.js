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
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var router_deprecated_1 = require('@angular/router-deprecated');
var async_1 = require('../../src/facade/async');
var route_config_decorator_1 = require('../../src/route_config/route_config_decorator');
var util_1 = require('./util');
var cmpInstanceCount;
var childCmpInstanceCount;
function main() {
    testing_internal_1.describe('navigation', function () {
        var tcb;
        var fixture;
        var rtr;
        testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
        testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router], function (tcBuilder /** TODO #9100 */, router /** TODO #9100 */) {
            tcb = tcBuilder;
            rtr = router;
            childCmpInstanceCount = 0;
            cmpInstanceCount = 0;
        }));
        testing_internal_1.it('should work in a simple case', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/test', component: HelloCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/test'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello');
                async.done();
            });
        }));
        testing_internal_1.it('should navigate between components with different parameters', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/user/:name', component: UserCmp })]); })
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
        testing_internal_1.it('should navigate to child routes', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb, 'outer [ <router-outlet></router-outlet> ]')
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/a/...', component: ParentCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/a/b'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('outer [ inner [ hello ] ]');
                async.done();
            });
        }));
        testing_internal_1.it('should navigate to child routes that capture an empty path', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb, 'outer [ <router-outlet></router-outlet> ]')
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/a/...', component: ParentCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/a'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('outer [ inner [ hello ] ]');
                async.done();
            });
        }));
        testing_internal_1.it('should navigate to child routes when the root component has an empty path', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
            util_1.compile(tcb, 'outer [ <router-outlet></router-outlet> ]')
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: ParentCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/b'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement)
                    .toHaveText('outer [ inner [ hello ] ]');
                matchers_1.expect(location.urlChanges).toEqual(['/b']);
                async.done();
            });
        }));
        testing_internal_1.it('should navigate to child routes of async routes', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb, 'outer [ <router-outlet></router-outlet> ]')
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.AsyncRoute({ path: '/a/...', loader: parentLoader })]); })
                .then(function (_) { return rtr.navigateByUrl('/a/b'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('outer [ inner [ hello ] ]');
                async.done();
            });
        }));
        testing_internal_1.it('should replace state when normalized paths are equal', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, common_1.Location], function (async, location /** TODO #9100 */) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return location.setInitialPath('/test/'); })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/test', component: HelloCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/test'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('hello');
                matchers_1.expect(location.urlChanges).toEqual(['replace: /test']);
                async.done();
            });
        }));
        testing_internal_1.it('should reuse common parent components', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/team/:id/...', component: TeamCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/team/angular/user/rado'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(cmpInstanceCount).toBe(1);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('team angular [ hello rado ]');
            })
                .then(function (_) { return rtr.navigateByUrl('/team/angular/user/victor'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(cmpInstanceCount).toBe(1);
                matchers_1.expect(fixture.debugElement.nativeElement)
                    .toHaveText('team angular [ hello victor ]');
                async.done();
            });
        }));
        testing_internal_1.it('should not reuse children when parent components change', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/team/:id/...', component: TeamCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/team/angular/user/rado'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(cmpInstanceCount).toBe(1);
                matchers_1.expect(childCmpInstanceCount).toBe(1);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('team angular [ hello rado ]');
            })
                .then(function (_) { return rtr.navigateByUrl('/team/dart/user/rado'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(cmpInstanceCount).toBe(2);
                matchers_1.expect(childCmpInstanceCount).toBe(2);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('team dart [ hello rado ]');
                async.done();
            });
        }));
        testing_internal_1.it('should inject route data into component', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/route-data', component: RouteDataCmp, data: { isAdmin: true } })]); })
                .then(function (_) { return rtr.navigateByUrl('/route-data'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('true');
                async.done();
            });
        }));
        testing_internal_1.it('should inject route data into component with AsyncRoute', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.AsyncRoute({ path: '/route-data', loader: asyncRouteDataCmp, data: { isAdmin: true } })]); })
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
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/route-data-default', component: RouteDataCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/route-data-default'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
                async.done();
            });
        }));
        testing_internal_1.it('should fire an event for each activated component', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb, '<router-outlet (activate)="activatedCmp = $event"></router-outlet>')
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/test', component: HelloCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/test'); })
                .then(function (_) {
                // Note: need a timeout so that all promises are flushed
                var completer = async_1.PromiseWrapper.completer();
                async_1.TimerWrapper.setTimeout(function () { completer.resolve(null); }, 0);
                return completer.promise;
            })
                .then(function (_) {
                matchers_1.expect(fixture.componentInstance.activatedCmp).toBeAnInstanceOf(HelloCmp);
                async.done();
            });
        }));
    });
}
exports.main = main;
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
function asyncRouteDataCmp() {
    return async_1.PromiseWrapper.resolve(RouteDataCmp);
}
var RouteDataCmp = (function () {
    function RouteDataCmp(data) {
        this.myData = data.get('isAdmin');
    }
    /** @nocollapse */
    RouteDataCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'data-cmp', template: "{{myData}}" },] },
    ];
    /** @nocollapse */
    RouteDataCmp.ctorParameters = [
        { type: router_deprecated_1.RouteData, },
    ];
    return RouteDataCmp;
}());
var UserCmp = (function () {
    function UserCmp(params) {
        childCmpInstanceCount += 1;
        this.user = params.get('name');
    }
    /** @nocollapse */
    UserCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'user-cmp', template: "hello {{user}}" },] },
    ];
    /** @nocollapse */
    UserCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return UserCmp;
}());
function parentLoader() {
    return async_1.PromiseWrapper.resolve(ParentCmp);
}
var ParentCmp = (function () {
    function ParentCmp() {
    }
    /** @nocollapse */
    ParentCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'parent-cmp',
                    template: "inner [ <router-outlet></router-outlet> ]",
                    directives: [router_deprecated_1.RouterOutlet],
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[
                    new route_config_decorator_1.Route({ path: '/b', component: HelloCmp }),
                    new route_config_decorator_1.Route({ path: '/', component: HelloCmp }),
                ],] },
    ];
    return ParentCmp;
}());
var TeamCmp = (function () {
    function TeamCmp(params) {
        this.id = params.get('id');
        cmpInstanceCount += 1;
    }
    /** @nocollapse */
    TeamCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'team-cmp',
                    template: "team {{id}} [ <router-outlet></router-outlet> ]",
                    directives: [router_deprecated_1.RouterOutlet],
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/user/:name', component: UserCmp })],] },
    ];
    /** @nocollapse */
    TeamCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return TeamCmp;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9yb3V0ZXItZGVwcmVjYXRlZC90ZXN0L2ludGVncmF0aW9uL25hdmlnYXRpb25fc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUJBQXVCLGlCQUFpQixDQUFDLENBQUE7QUFDekMscUJBQW1ELGVBQWUsQ0FBQyxDQUFBO0FBQ25FLHdCQUFxRCx1QkFBdUIsQ0FBQyxDQUFBO0FBQzdFLGlDQUF3SCx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ2pLLHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ2xFLGtDQUF1RSw0QkFBNEIsQ0FBQyxDQUFBO0FBRXBHLHNCQUEyQyx3QkFBd0IsQ0FBQyxDQUFBO0FBQ3BFLHVDQUFpRSwrQ0FBK0MsQ0FBQyxDQUFBO0FBRWpILHFCQUFzRCxRQUFRLENBQUMsQ0FBQTtBQUUvRCxJQUFJLGdCQUFxQixDQUFtQjtBQUM1QyxJQUFJLHFCQUEwQixDQUFtQjtBQUVqRDtJQUNFLDJCQUFRLENBQUMsWUFBWSxFQUFFO1FBRXJCLElBQUksR0FBeUIsQ0FBQztRQUM5QixJQUFJLE9BQThCLENBQUM7UUFDbkMsSUFBSSxHQUFRLENBQW1CO1FBRS9CLHNDQUFtQixDQUFDLGNBQU0sT0FBQSw0QkFBcUIsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO1FBRWpELDZCQUFVLENBQUMseUJBQU0sQ0FDYixDQUFDLDhCQUFvQixFQUFFLDBCQUFNLENBQUMsRUFDOUIsVUFBQyxTQUFjLENBQUMsaUJBQWlCLEVBQUUsTUFBVyxDQUFDLGlCQUFpQjtZQUM5RCxHQUFHLEdBQUcsU0FBUyxDQUFDO1lBQ2hCLEdBQUcsR0FBRyxNQUFNLENBQUM7WUFDYixxQkFBcUIsR0FBRyxDQUFDLENBQUM7WUFDMUIsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFUixxQkFBRSxDQUFDLDhCQUE4QixFQUFFLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckYsY0FBTyxDQUFDLEdBQUcsQ0FBQztpQkFDUCxJQUFJLENBQUMsVUFBQyxHQUFHLElBQU8sT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksOEJBQUssQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUE3RCxDQUE2RCxDQUFDO2lCQUMxRSxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUExQixDQUEwQixDQUFDO2lCQUN2QyxJQUFJLENBQUMsVUFBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEIsaUJBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDL0QsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBR1AscUJBQUUsQ0FBQyw4REFBOEQsRUFDOUQseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxjQUFPLENBQUMsR0FBRyxDQUFDO2lCQUNQLElBQUksQ0FBQyxVQUFDLEdBQUcsSUFBTyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqQyxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSw4QkFBSyxDQUFDLEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQWxFLENBQWtFLENBQUM7aUJBQy9FLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEVBQWhDLENBQWdDLENBQUM7aUJBQzdDLElBQUksQ0FBQyxVQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QixpQkFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxHQUFHLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUEvQixDQUErQixDQUFDO2lCQUM1QyxJQUFJLENBQUMsVUFBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEIsaUJBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDcEUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRVAscUJBQUUsQ0FBQyxpQ0FBaUMsRUFDakMseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxjQUFPLENBQUMsR0FBRyxFQUFFLDJDQUEyQyxDQUFDO2lCQUNwRCxJQUFJLENBQUMsVUFBQyxHQUFHLElBQU8sT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksOEJBQUssQ0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUEvRCxDQUErRCxDQUFDO2lCQUM1RSxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUF6QixDQUF5QixDQUFDO2lCQUN0QyxJQUFJLENBQUMsVUFBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEIsaUJBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUNuRixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFUCxxQkFBRSxDQUFDLDREQUE0RCxFQUM1RCx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBRXJELGNBQU8sQ0FBQyxHQUFHLEVBQUUsMkNBQTJDLENBQUM7aUJBQ3BELElBQUksQ0FBQyxVQUFDLEdBQUcsSUFBTyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqQyxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSw4QkFBSyxDQUFDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQS9ELENBQStELENBQUM7aUJBQzVFLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQXZCLENBQXVCLENBQUM7aUJBQ3BDLElBQUksQ0FBQyxVQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QixpQkFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLDJCQUEyQixDQUFDLENBQUM7Z0JBQ25GLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVQLHFCQUFFLENBQUMsMkVBQTJFLEVBQzNFLHlCQUFNLENBQ0YsQ0FBQyxxQ0FBa0IsRUFBRSxpQkFBUSxDQUFDLEVBQzlCLFVBQUMsS0FBeUIsRUFBRSxRQUFhLENBQUMsaUJBQWlCO1lBQ3pELGNBQU8sQ0FBQyxHQUFHLEVBQUUsMkNBQTJDLENBQUM7aUJBQ3BELElBQUksQ0FBQyxVQUFDLEdBQUcsSUFBTyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqQyxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSw4QkFBSyxDQUFDLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQTdELENBQTZELENBQUM7aUJBQzFFLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQXZCLENBQXVCLENBQUM7aUJBQ3BDLElBQUksQ0FBQyxVQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QixpQkFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO3FCQUNyQyxVQUFVLENBQUMsMkJBQTJCLENBQUMsQ0FBQztnQkFDN0MsaUJBQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDNUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRVgscUJBQUUsQ0FBQyxpREFBaUQsRUFDakQseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxjQUFPLENBQUMsR0FBRyxFQUFFLDJDQUEyQyxDQUFDO2lCQUNwRCxJQUFJLENBQUMsVUFBQyxHQUFHLElBQU8sT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksbUNBQVUsQ0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFwRSxDQUFvRSxDQUFDO2lCQUNqRixJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxFQUF6QixDQUF5QixDQUFDO2lCQUN0QyxJQUFJLENBQUMsVUFBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEIsaUJBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO2dCQUNuRixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDLENBQUM7UUFHUCxxQkFBRSxDQUFDLHNEQUFzRCxFQUN0RCx5QkFBTSxDQUNGLENBQUMscUNBQWtCLEVBQUUsaUJBQVEsQ0FBQyxFQUM5QixVQUFDLEtBQXlCLEVBQUUsUUFBYSxDQUFDLGlCQUFpQjtZQUN6RCxjQUFPLENBQUMsR0FBRyxDQUFDO2lCQUNQLElBQUksQ0FBQyxVQUFDLEdBQUcsSUFBTyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqQyxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFqQyxDQUFpQyxDQUFDO2lCQUM5QyxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSw4QkFBSyxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQTdELENBQTZELENBQUM7aUJBQzFFLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQTFCLENBQTBCLENBQUM7aUJBQ3ZDLElBQUksQ0FBQyxVQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QixpQkFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMvRCxpQkFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hELEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVYLHFCQUFFLENBQUMsdUNBQXVDLEVBQ3ZDLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsY0FBTyxDQUFDLEdBQUcsQ0FBQztpQkFDUCxJQUFJLENBQUMsVUFBQyxHQUFHLElBQU8sT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksOEJBQUssQ0FBQyxFQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFwRSxDQUFvRSxDQUFDO2lCQUNqRixJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxHQUFHLENBQUMsYUFBYSxDQUFDLHlCQUF5QixDQUFDLEVBQTVDLENBQTRDLENBQUM7aUJBQ3pELElBQUksQ0FBQyxVQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QixpQkFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxpQkFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLDZCQUE2QixDQUFDLENBQUM7WUFDdkYsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLENBQUMsRUFBOUMsQ0FBOEMsQ0FBQztpQkFDM0QsSUFBSSxDQUFDLFVBQUMsQ0FBQztnQkFDTixPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3hCLGlCQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLGlCQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUM7cUJBQ3JDLFVBQVUsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO2dCQUNqRCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFUCxxQkFBRSxDQUFDLHlEQUF5RCxFQUN6RCx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ3JELGNBQU8sQ0FBQyxHQUFHLENBQUM7aUJBQ1AsSUFBSSxDQUFDLFVBQUMsR0FBRyxJQUFPLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pDLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLDhCQUFLLENBQUMsRUFBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBcEUsQ0FBb0UsQ0FBQztpQkFDakYsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsR0FBRyxDQUFDLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxFQUE1QyxDQUE0QyxDQUFDO2lCQUN6RCxJQUFJLENBQUMsVUFBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEIsaUJBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsaUJBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsaUJBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1lBQ3ZGLENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxHQUFHLENBQUMsYUFBYSxDQUFDLHNCQUFzQixDQUFDLEVBQXpDLENBQXlDLENBQUM7aUJBQ3RELElBQUksQ0FBQyxVQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QixpQkFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxpQkFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxpQkFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLDBCQUEwQixDQUFDLENBQUM7Z0JBQ2xGLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVQLHFCQUFFLENBQUMseUNBQXlDLEVBQ3pDLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsY0FBTyxDQUFDLEdBQUcsQ0FBQztpQkFDUCxJQUFJLENBQUMsVUFBQyxHQUFHLElBQU8sT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksOEJBQUssQ0FDeEIsRUFBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBRHJFLENBQ3FFLENBQUM7aUJBQ2xGLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEVBQWhDLENBQWdDLENBQUM7aUJBQzdDLElBQUksQ0FBQyxVQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QixpQkFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5RCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFUCxxQkFBRSxDQUFDLHlEQUF5RCxFQUN6RCx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ3JELGNBQU8sQ0FBQyxHQUFHLENBQUM7aUJBQ1AsSUFBSSxDQUFDLFVBQUMsR0FBRyxJQUFPLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pDLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLG1DQUFVLENBQzdCLEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxNQUFNLEVBQUUsaUJBQWlCLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBRHZFLENBQ3VFLENBQUM7aUJBQ3BGLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLEVBQWhDLENBQWdDLENBQUM7aUJBQzdDLElBQUksQ0FBQyxVQUFDLENBQUM7Z0JBQ04sT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN4QixpQkFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUM5RCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFUCxxQkFBRSxDQUFDLDhEQUE4RCxFQUM5RCx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ3JELGNBQU8sQ0FBQyxHQUFHLENBQUM7aUJBQ1AsSUFBSSxDQUFDLFVBQUMsR0FBRyxJQUFPLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2pDLElBQUksQ0FBQyxVQUFDLENBQUMsSUFBSyxPQUFBLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLDhCQUFLLENBQ3hCLEVBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFEdEQsQ0FDc0QsQ0FBQztpQkFDbkUsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsR0FBRyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxFQUF4QyxDQUF3QyxDQUFDO2lCQUNyRCxJQUFJLENBQUMsVUFBQyxDQUFDO2dCQUNOLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDeEIsaUJBQU0sQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDMUQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRVAscUJBQUUsQ0FBQyxtREFBbUQsRUFDbkQseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxjQUFPLENBQUMsR0FBRyxFQUFFLG9FQUFvRSxDQUFDO2lCQUM3RSxJQUFJLENBQUMsVUFBQyxHQUFHLElBQU8sT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDakMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksOEJBQUssQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUE3RCxDQUE2RCxDQUFDO2lCQUMxRSxJQUFJLENBQUMsVUFBQyxDQUFDLElBQUssT0FBQSxHQUFHLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUExQixDQUEwQixDQUFDO2lCQUN2QyxJQUFJLENBQUMsVUFBQyxDQUFDO2dCQUNOLHdEQUF3RDtnQkFDeEQsSUFBSSxTQUFTLEdBQUcsc0JBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDM0Msb0JBQVksQ0FBQyxVQUFVLENBQUMsY0FBUSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUMzQixDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDLFVBQUMsQ0FBQztnQkFDTixpQkFBTSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDMUUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ1QsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBbk9lLFlBQUksT0FtT25CLENBQUE7QUFDRDtJQUVFO1FBQWdCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDO0lBQUMsQ0FBQztJQUM1QyxrQkFBa0I7SUFDWCxtQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDLEVBQUcsRUFBRTtLQUMvRSxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsdUJBQWMsR0FBMkQsRUFDL0UsQ0FBQztJQUNGLGVBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQUdEO0lBQ0UsTUFBTSxDQUFDLHNCQUFjLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFDRDtJQUVFLHNCQUFZLElBQWU7UUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFBQyxDQUFDO0lBQ3JFLGtCQUFrQjtJQUNYLHVCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUMsRUFBRyxFQUFFO0tBQzVFLENBQUM7SUFDRixrQkFBa0I7SUFDWCwyQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSw2QkFBUyxHQUFHO0tBQ2xCLENBQUM7SUFDRixtQkFBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBQ0Q7SUFFRSxpQkFBWSxNQUFtQjtRQUM3QixxQkFBcUIsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDSCxrQkFBa0I7SUFDWCxrQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUMsRUFBRyxFQUFFO0tBQ2hGLENBQUM7SUFDRixrQkFBa0I7SUFDWCxzQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSwrQkFBVyxHQUFHO0tBQ3BCLENBQUM7SUFDRixjQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFHRDtJQUNFLE1BQU0sQ0FBQyxzQkFBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMzQyxDQUFDO0FBQ0Q7SUFBQTtJQWFBLENBQUM7SUFaRCxrQkFBa0I7SUFDWCxvQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsWUFBWTtvQkFDdEIsUUFBUSxFQUFFLDJDQUEyQztvQkFDckQsVUFBVSxFQUFFLENBQUMsZ0NBQVksQ0FBQztpQkFDM0IsRUFBRyxFQUFFO1FBQ04sRUFBRSxJQUFJLEVBQUUsb0NBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDMUIsSUFBSSw4QkFBSyxDQUFDLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFDLENBQUM7b0JBQzVDLElBQUksOEJBQUssQ0FBQyxFQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBQyxDQUFDO2lCQUM1QyxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0YsZ0JBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztBQUNEO0lBRUUsaUJBQVksTUFBbUI7UUFDN0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLGdCQUFnQixJQUFJLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsa0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFFBQVEsRUFBRSxpREFBaUQ7b0JBQzNELFVBQVUsRUFBRSxDQUFDLGdDQUFZLENBQUM7aUJBQzNCLEVBQUcsRUFBRTtRQUNOLEVBQUUsSUFBSSxFQUFFLG9DQUFXLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJLDhCQUFLLENBQUMsRUFBQyxJQUFJLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDLEVBQUcsRUFBRTtLQUN0RixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsc0JBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsK0JBQVcsR0FBRztLQUNwQixDQUFDO0lBQ0YsY0FBQztBQUFELENBQUMsQUFuQkQsSUFtQkMifQ==