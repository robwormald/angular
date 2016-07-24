/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var router_deprecated_1 = require('@angular/router-deprecated');
var async_1 = require('../../src/facade/async');
var lang_1 = require('../../src/facade/lang');
var lifecycle_annotations_1 = require('../../src/lifecycle/lifecycle_annotations');
var route_config_decorator_1 = require('../../src/route_config/route_config_decorator');
var util_1 = require('./util');
var cmpInstanceCount;
var log;
var eventBus;
var completer;
function main() {
    testing_internal_1.describe('Router lifecycle hooks', function () {
        var tcb;
        var fixture;
        var rtr;
        testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
        testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router], function (tcBuilder, router) {
            tcb = tcBuilder;
            rtr = router;
            cmpInstanceCount = 0;
            log = [];
            eventBus = new async_1.EventEmitter();
        }));
        testing_internal_1.it('should call the routerOnActivate hook', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/on-activate'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('activate cmp');
                matchers_1.expect(log).toEqual(['activate: null -> /on-activate']);
                async.done();
            });
        }));
        testing_internal_1.it('should wait for a parent component\'s routerOnActivate hook to resolve before calling its child\'s', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) {
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('parent activate')) {
                        completer.resolve(true);
                    }
                });
                rtr.navigateByUrl('/parent-activate/child-activate').then(function (_) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('parent [activate cmp]');
                    matchers_1.expect(log).toEqual([
                        'parent activate: null -> /parent-activate', 'activate: null -> /child-activate'
                    ]);
                    async.done();
                });
            });
        }));
        testing_internal_1.it('should call the routerOnDeactivate hook', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/on-deactivate'); })
                .then(function (_) { return rtr.navigateByUrl('/a'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('A');
                matchers_1.expect(log).toEqual(['deactivate: /on-deactivate -> /a']);
                async.done();
            });
        }));
        testing_internal_1.it('should wait for a child component\'s routerOnDeactivate hook to resolve before calling its parent\'s', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/parent-deactivate/child-deactivate'); })
                .then(function (_) {
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('deactivate')) {
                        completer.resolve(true);
                        fixture.detectChanges();
                        matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('parent [deactivate cmp]');
                    }
                });
                rtr.navigateByUrl('/a').then(function (_) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('A');
                    matchers_1.expect(log).toEqual([
                        'deactivate: /child-deactivate -> null',
                        'parent deactivate: /parent-deactivate -> /a'
                    ]);
                    async.done();
                });
            });
        }));
        testing_internal_1.it('should reuse a component when the routerCanReuse hook returns true', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/on-reuse/1/a'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(log).toEqual([]);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('reuse [A]');
                matchers_1.expect(cmpInstanceCount).toBe(1);
            })
                .then(function (_) { return rtr.navigateByUrl('/on-reuse/2/b'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(log).toEqual(['reuse: /on-reuse/1 -> /on-reuse/2']);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('reuse [B]');
                matchers_1.expect(cmpInstanceCount).toBe(1);
                async.done();
            });
        }));
        testing_internal_1.it('should not reuse a component when the routerCanReuse hook returns false', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/never-reuse/1/a'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(log).toEqual([]);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('reuse [A]');
                matchers_1.expect(cmpInstanceCount).toBe(1);
            })
                .then(function (_) { return rtr.navigateByUrl('/never-reuse/2/b'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(log).toEqual([]);
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('reuse [B]');
                matchers_1.expect(cmpInstanceCount).toBe(2);
                async.done();
            });
        }));
        testing_internal_1.it('should navigate when routerCanActivate returns true', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) {
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('routerCanActivate')) {
                        completer.resolve(true);
                    }
                });
                rtr.navigateByUrl('/can-activate/a').then(function (_) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('routerCanActivate [A]');
                    matchers_1.expect(log).toEqual(['routerCanActivate: null -> /can-activate']);
                    async.done();
                });
            });
        }));
        testing_internal_1.it('should not navigate when routerCanActivate returns false', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) {
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('routerCanActivate')) {
                        completer.resolve(false);
                    }
                });
                rtr.navigateByUrl('/can-activate/a').then(function (_) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('');
                    matchers_1.expect(log).toEqual(['routerCanActivate: null -> /can-activate']);
                    async.done();
                });
            });
        }));
        testing_internal_1.it('should navigate away when routerCanDeactivate returns true', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/can-deactivate/a'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('routerCanDeactivate [A]');
                matchers_1.expect(log).toEqual([]);
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('routerCanDeactivate')) {
                        completer.resolve(true);
                    }
                });
                rtr.navigateByUrl('/a').then(function (_) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('A');
                    matchers_1.expect(log).toEqual(['routerCanDeactivate: /can-deactivate -> /a']);
                    async.done();
                });
            });
        }));
        testing_internal_1.it('should not navigate away when routerCanDeactivate returns false', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/can-deactivate/a'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('routerCanDeactivate [A]');
                matchers_1.expect(log).toEqual([]);
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('routerCanDeactivate')) {
                        completer.resolve(false);
                    }
                });
                rtr.navigateByUrl('/a').then(function (_) {
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('routerCanDeactivate [A]');
                    matchers_1.expect(log).toEqual(['routerCanDeactivate: /can-deactivate -> /a']);
                    async.done();
                });
            });
        }));
        testing_internal_1.it('should run activation and deactivation hooks in the correct order', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/activation-hooks/child'); })
                .then(function (_) {
                matchers_1.expect(log).toEqual([
                    'routerCanActivate child: null -> /child',
                    'routerCanActivate parent: null -> /activation-hooks',
                    'routerOnActivate parent: null -> /activation-hooks',
                    'routerOnActivate child: null -> /child'
                ]);
                log = [];
                return rtr.navigateByUrl('/a');
            })
                .then(function (_) {
                matchers_1.expect(log).toEqual([
                    'routerCanDeactivate parent: /activation-hooks -> /a',
                    'routerCanDeactivate child: /child -> null',
                    'routerOnDeactivate child: /child -> null',
                    'routerOnDeactivate parent: /activation-hooks -> /a'
                ]);
                async.done();
            });
        }));
        testing_internal_1.it('should only run reuse hooks when reusing', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (rtc) { fixture = rtc; })
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/reuse-hooks/1'); })
                .then(function (_) {
                matchers_1.expect(log).toEqual([
                    'routerCanActivate: null -> /reuse-hooks/1',
                    'routerOnActivate: null -> /reuse-hooks/1'
                ]);
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('routerCanReuse')) {
                        completer.resolve(true);
                    }
                });
                log = [];
                return rtr.navigateByUrl('/reuse-hooks/2');
            })
                .then(function (_) {
                matchers_1.expect(log).toEqual([
                    'routerCanReuse: /reuse-hooks/1 -> /reuse-hooks/2',
                    'routerOnReuse: /reuse-hooks/1 -> /reuse-hooks/2'
                ]);
                async.done();
            });
        }));
        testing_internal_1.it('should not run reuse hooks when not reusing', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            util_1.compile(tcb)
                .then(function (_) { return rtr.config([new route_config_decorator_1.Route({ path: '/...', component: LifecycleCmp })]); })
                .then(function (_) { return rtr.navigateByUrl('/reuse-hooks/1'); })
                .then(function (_) {
                matchers_1.expect(log).toEqual([
                    'routerCanActivate: null -> /reuse-hooks/1',
                    'routerOnActivate: null -> /reuse-hooks/1'
                ]);
                async_1.ObservableWrapper.subscribe(eventBus, function (ev) {
                    if (ev.startsWith('routerCanReuse')) {
                        completer.resolve(false);
                    }
                });
                log = [];
                return rtr.navigateByUrl('/reuse-hooks/2');
            })
                .then(function (_) {
                matchers_1.expect(log).toEqual([
                    'routerCanReuse: /reuse-hooks/1 -> /reuse-hooks/2',
                    'routerCanActivate: /reuse-hooks/1 -> /reuse-hooks/2',
                    'routerCanDeactivate: /reuse-hooks/1 -> /reuse-hooks/2',
                    'routerOnDeactivate: /reuse-hooks/1 -> /reuse-hooks/2',
                    'routerOnActivate: /reuse-hooks/1 -> /reuse-hooks/2'
                ]);
                async.done();
            });
        }));
    });
}
exports.main = main;
var A = (function () {
    function A() {
    }
    /** @nocollapse */
    A.decorators = [
        { type: core_1.Component, args: [{ selector: 'a-cmp', template: 'A' },] },
    ];
    return A;
}());
var B = (function () {
    function B() {
    }
    /** @nocollapse */
    B.decorators = [
        { type: core_1.Component, args: [{ selector: 'b-cmp', template: 'B' },] },
    ];
    return B;
}());
function logHook(name, next, prev) {
    var message = name + ': ' + (lang_1.isPresent(prev) ? ('/' + prev.urlPath) : 'null') + ' -> ' +
        (lang_1.isPresent(next) ? ('/' + next.urlPath) : 'null');
    log.push(message);
    async_1.ObservableWrapper.callEmit(eventBus, message);
}
var ActivateCmp = (function () {
    function ActivateCmp() {
    }
    ActivateCmp.prototype.routerOnActivate = function (next, prev) {
        logHook('activate', next, prev);
    };
    /** @nocollapse */
    ActivateCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'activate-cmp', template: 'activate cmp' },] },
    ];
    return ActivateCmp;
}());
var ParentActivateCmp = (function () {
    function ParentActivateCmp() {
    }
    ParentActivateCmp.prototype.routerOnActivate = function (next, prev) {
        completer = async_1.PromiseWrapper.completer();
        logHook('parent activate', next, prev);
        return completer.promise;
    };
    /** @nocollapse */
    ParentActivateCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'parent-activate-cmp',
                    template: "parent [<router-outlet></router-outlet>]",
                    directives: [router_deprecated_1.RouterOutlet]
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/child-activate', component: ActivateCmp })],] },
    ];
    return ParentActivateCmp;
}());
var DeactivateCmp = (function () {
    function DeactivateCmp() {
    }
    DeactivateCmp.prototype.routerOnDeactivate = function (next, prev) {
        logHook('deactivate', next, prev);
    };
    /** @nocollapse */
    DeactivateCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'deactivate-cmp', template: 'deactivate cmp' },] },
    ];
    return DeactivateCmp;
}());
var WaitDeactivateCmp = (function () {
    function WaitDeactivateCmp() {
    }
    WaitDeactivateCmp.prototype.routerOnDeactivate = function (next, prev) {
        completer = async_1.PromiseWrapper.completer();
        logHook('deactivate', next, prev);
        return completer.promise;
    };
    /** @nocollapse */
    WaitDeactivateCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'deactivate-cmp', template: 'deactivate cmp' },] },
    ];
    return WaitDeactivateCmp;
}());
var ParentDeactivateCmp = (function () {
    function ParentDeactivateCmp() {
    }
    ParentDeactivateCmp.prototype.routerOnDeactivate = function (next, prev) {
        logHook('parent deactivate', next, prev);
    };
    /** @nocollapse */
    ParentDeactivateCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'parent-deactivate-cmp',
                    template: "parent [<router-outlet></router-outlet>]",
                    directives: [router_deprecated_1.RouterOutlet]
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/child-deactivate', component: WaitDeactivateCmp })],] },
    ];
    return ParentDeactivateCmp;
}());
var ReuseCmp = (function () {
    function ReuseCmp() {
        cmpInstanceCount += 1;
    }
    ReuseCmp.prototype.routerCanReuse = function (next, prev) { return true; };
    ReuseCmp.prototype.routerOnReuse = function (next, prev) {
        logHook('reuse', next, prev);
    };
    /** @nocollapse */
    ReuseCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'reuse-cmp',
                    template: "reuse [<router-outlet></router-outlet>]",
                    directives: [router_deprecated_1.RouterOutlet]
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/a', component: A }), new route_config_decorator_1.Route({ path: '/b', component: B })],] },
    ];
    /** @nocollapse */
    ReuseCmp.ctorParameters = [];
    return ReuseCmp;
}());
var NeverReuseCmp = (function () {
    function NeverReuseCmp() {
        cmpInstanceCount += 1;
    }
    NeverReuseCmp.prototype.routerCanReuse = function (next, prev) { return false; };
    NeverReuseCmp.prototype.routerOnReuse = function (next, prev) {
        logHook('reuse', next, prev);
    };
    /** @nocollapse */
    NeverReuseCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'never-reuse-cmp',
                    template: "reuse [<router-outlet></router-outlet>]",
                    directives: [router_deprecated_1.RouterOutlet]
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/a', component: A }), new route_config_decorator_1.Route({ path: '/b', component: B })],] },
    ];
    /** @nocollapse */
    NeverReuseCmp.ctorParameters = [];
    return NeverReuseCmp;
}());
var CanActivateCmp = (function () {
    function CanActivateCmp() {
    }
    CanActivateCmp.routerCanActivate = function (next, prev) {
        completer = async_1.PromiseWrapper.completer();
        logHook('routerCanActivate', next, prev);
        return completer.promise;
    };
    /** @nocollapse */
    CanActivateCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'can-activate-cmp',
                    template: "routerCanActivate [<router-outlet></router-outlet>]",
                    directives: [router_deprecated_1.RouterOutlet]
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/a', component: A }), new route_config_decorator_1.Route({ path: '/b', component: B })],] },
        { type: lifecycle_annotations_1.CanActivate, args: [CanActivateCmp.routerCanActivate,] },
    ];
    return CanActivateCmp;
}());
var CanDeactivateCmp = (function () {
    function CanDeactivateCmp() {
    }
    CanDeactivateCmp.prototype.routerCanDeactivate = function (next, prev) {
        completer = async_1.PromiseWrapper.completer();
        logHook('routerCanDeactivate', next, prev);
        return completer.promise;
    };
    /** @nocollapse */
    CanDeactivateCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'can-deactivate-cmp',
                    template: "routerCanDeactivate [<router-outlet></router-outlet>]",
                    directives: [router_deprecated_1.RouterOutlet]
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/a', component: A }), new route_config_decorator_1.Route({ path: '/b', component: B })],] },
    ];
    return CanDeactivateCmp;
}());
var AllHooksChildCmp = (function () {
    function AllHooksChildCmp() {
    }
    AllHooksChildCmp.prototype.routerCanDeactivate = function (next, prev) {
        logHook('routerCanDeactivate child', next, prev);
        return true;
    };
    AllHooksChildCmp.prototype.routerOnDeactivate = function (next, prev) {
        logHook('routerOnDeactivate child', next, prev);
    };
    AllHooksChildCmp.routerCanActivate = function (next, prev) {
        logHook('routerCanActivate child', next, prev);
        return true;
    };
    AllHooksChildCmp.prototype.routerOnActivate = function (next, prev) {
        logHook('routerOnActivate child', next, prev);
    };
    /** @nocollapse */
    AllHooksChildCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'all-hooks-child-cmp', template: "child" },] },
        { type: lifecycle_annotations_1.CanActivate, args: [AllHooksChildCmp.routerCanActivate,] },
    ];
    return AllHooksChildCmp;
}());
var AllHooksParentCmp = (function () {
    function AllHooksParentCmp() {
    }
    AllHooksParentCmp.prototype.routerCanDeactivate = function (next, prev) {
        logHook('routerCanDeactivate parent', next, prev);
        return true;
    };
    AllHooksParentCmp.prototype.routerOnDeactivate = function (next, prev) {
        logHook('routerOnDeactivate parent', next, prev);
    };
    AllHooksParentCmp.routerCanActivate = function (next, prev) {
        logHook('routerCanActivate parent', next, prev);
        return true;
    };
    AllHooksParentCmp.prototype.routerOnActivate = function (next, prev) {
        logHook('routerOnActivate parent', next, prev);
    };
    /** @nocollapse */
    AllHooksParentCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'all-hooks-parent-cmp',
                    template: "<router-outlet></router-outlet>",
                    directives: [router_deprecated_1.RouterOutlet]
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[new route_config_decorator_1.Route({ path: '/child', component: AllHooksChildCmp })],] },
        { type: lifecycle_annotations_1.CanActivate, args: [AllHooksParentCmp.routerCanActivate,] },
    ];
    return AllHooksParentCmp;
}());
var ReuseHooksCmp = (function () {
    function ReuseHooksCmp() {
    }
    ReuseHooksCmp.prototype.routerCanReuse = function (next, prev) {
        completer = async_1.PromiseWrapper.completer();
        logHook('routerCanReuse', next, prev);
        return completer.promise;
    };
    ReuseHooksCmp.prototype.routerOnReuse = function (next, prev) {
        logHook('routerOnReuse', next, prev);
    };
    ReuseHooksCmp.prototype.routerCanDeactivate = function (next, prev) {
        logHook('routerCanDeactivate', next, prev);
        return true;
    };
    ReuseHooksCmp.prototype.routerOnDeactivate = function (next, prev) {
        logHook('routerOnDeactivate', next, prev);
    };
    ReuseHooksCmp.routerCanActivate = function (next, prev) {
        logHook('routerCanActivate', next, prev);
        return true;
    };
    ReuseHooksCmp.prototype.routerOnActivate = function (next, prev) {
        logHook('routerOnActivate', next, prev);
    };
    /** @nocollapse */
    ReuseHooksCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'reuse-hooks-cmp', template: 'reuse hooks cmp' },] },
        { type: lifecycle_annotations_1.CanActivate, args: [ReuseHooksCmp.routerCanActivate,] },
    ];
    return ReuseHooksCmp;
}());
var LifecycleCmp = (function () {
    function LifecycleCmp() {
    }
    /** @nocollapse */
    LifecycleCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'lifecycle-cmp',
                    template: "<router-outlet></router-outlet>",
                    directives: [router_deprecated_1.RouterOutlet]
                },] },
        { type: route_config_decorator_1.RouteConfig, args: [[
                    new route_config_decorator_1.Route({ path: '/a', component: A }), new route_config_decorator_1.Route({ path: '/on-activate', component: ActivateCmp }),
                    new route_config_decorator_1.Route({ path: '/parent-activate/...', component: ParentActivateCmp }),
                    new route_config_decorator_1.Route({ path: '/on-deactivate', component: DeactivateCmp }),
                    new route_config_decorator_1.Route({ path: '/parent-deactivate/...', component: ParentDeactivateCmp }),
                    new route_config_decorator_1.Route({ path: '/on-reuse/:number/...', component: ReuseCmp }),
                    new route_config_decorator_1.Route({ path: '/never-reuse/:number/...', component: NeverReuseCmp }),
                    new route_config_decorator_1.Route({ path: '/can-activate/...', component: CanActivateCmp }),
                    new route_config_decorator_1.Route({ path: '/can-deactivate/...', component: CanDeactivateCmp }),
                    new route_config_decorator_1.Route({ path: '/activation-hooks/...', component: AllHooksParentCmp }),
                    new route_config_decorator_1.Route({ path: '/reuse-hooks/:number', component: ReuseHooksCmp })
                ],] },
    ];
    return LifecycleCmp;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlmZWN5Y2xlX2hvb2tfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyLWRlcHJlY2F0ZWQvdGVzdC9pbnRlZ3JhdGlvbi9saWZlY3ljbGVfaG9va19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsd0JBQXFELHVCQUF1QixDQUFDLENBQUE7QUFDN0UsaUNBQXdILHdDQUF3QyxDQUFDLENBQUE7QUFDaksseUJBQXFCLDRDQUE0QyxDQUFDLENBQUE7QUFDbEUsa0NBQTRELDRCQUE0QixDQUFDLENBQUE7QUFFekYsc0JBQWdGLHdCQUF3QixDQUFDLENBQUE7QUFDekcscUJBQXdCLHVCQUF1QixDQUFDLENBQUE7QUFHaEQsc0NBQTBCLDJDQUEyQyxDQUFDLENBQUE7QUFDdEUsdUNBQWlFLCtDQUErQyxDQUFDLENBQUE7QUFFakgscUJBQTZDLFFBQVEsQ0FBQyxDQUFBO0FBRXRELElBQUksZ0JBQXFCLENBQW1CO0FBQzVDLElBQUksR0FBYSxDQUFDO0FBQ2xCLElBQUksUUFBMkIsQ0FBQztBQUNoQyxJQUFJLFNBQWdDLENBQUM7QUFFckM7SUFDRSwyQkFBUSxDQUFDLHdCQUF3QixFQUFFO1FBRWpDLElBQUksR0FBeUIsQ0FBQztRQUM5QixJQUFJLE9BQThCLENBQUM7UUFDbkMsSUFBSSxHQUFXLENBQUM7UUFFaEIsc0NBQW1CLENBQUMsY0FBTSxPQUFBLDRCQUFxQixFQUFyQixDQUFxQixDQUFDLENBQUM7UUFFakQsNkJBQVUsQ0FBQyx5QkFBTSxDQUNiLENBQUMsOEJBQW9CLEVBQUUsMEJBQU0sQ0FBQyxFQUFFLFVBQUMsU0FBK0IsRUFBRSxNQUFjO1lBQzlFLEdBQUcsR0FBRyxTQUFTLENBQUM7WUFDaEIsR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUNiLGdCQUFnQixHQUFHLENB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