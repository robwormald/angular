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
var lang_1 = require('../../src/facade/lang');
var async_1 = require('../../src/facade/async');
var collection_1 = require('../../src/facade/collection');
var core_1 = require('@angular/core');
var router_deprecated_1 = require('@angular/router-deprecated');
var router_1 = require('@angular/router-deprecated/src/router');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var by_1 = require('@angular/platform-browser/src/dom/debug/by');
var testing_2 = require('@angular/common/testing');
function main() {
    testing_internal_1.describe('routerLink directive', function () {
        var tcb;
        var fixture;
        var router;
        var location;
        testing_internal_1.beforeEachProviders(function () {
            return [router_deprecated_1.RouteRegistry, { provide: common_1.Location, useClass: testing_2.SpyLocation },
                { provide: router_deprecated_1.ROUTER_PRIMARY_COMPONENT, useValue: MyComp7 },
                { provide: router_deprecated_1.Router, useClass: router_1.RootRouter },
            ];
        });
        testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, router_deprecated_1.Router, common_1.Location], function (tcBuilder, rtr, loc) {
            tcb = tcBuilder;
            router = rtr;
            location = loc;
        }));
        function compile(template) {
            if (template === void 0) { template = '<router-outlet></router-outlet>'; }
            return tcb.overrideTemplate(MyComp7, ('<div>' + template + '</div>'))
                .createAsync(MyComp7)
                .then(function (tc) { fixture = tc; });
        }
        testing_internal_1.it('should generate absolute hrefs that include the base href', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            location.setBaseHref('/my/base');
            compile('<a href="hello" [routerLink]="[\'./User\']"></a>')
                .then(function (_) {
                return router.config([new router_deprecated_1.Route({ path: '/user', component: UserCmp, name: 'User' })]);
            })
                .then(function (_) { return router.navigateByUrl('/a/b'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(getHref(fixture)).toEqual('/my/base/user');
                async.done();
            });
        }));
        testing_internal_1.it('should generate link hrefs without params', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            compile('<a href="hello" [routerLink]="[\'./User\']"></a>')
                .then(function (_) {
                return router.config([new router_deprecated_1.Route({ path: '/user', component: UserCmp, name: 'User' })]);
            })
                .then(function (_) { return router.navigateByUrl('/a/b'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(getHref(fixture)).toEqual('/user');
                async.done();
            });
        }));
        testing_internal_1.it('should generate link hrefs with params', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            compile('<a href="hello" [routerLink]="[\'./User\', {name: name}]">{{name}}</a>')
                .then(function (_) { return router.config([new router_deprecated_1.Route({ path: '/user/:name', component: UserCmp, name: 'User' })]); })
                .then(function (_) { return router.navigateByUrl('/a/b'); })
                .then(function (_) {
                fixture.debugElement.componentInstance.name = 'brian';
                fixture.detectChanges();
                matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('brian');
                matchers_1.expect(getHref(fixture)).toEqual('/user/brian');
                async.done();
            });
        }));
        testing_internal_1.it('should generate link hrefs from a child to its sibling', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return router.config([new router_deprecated_1.Route({ path: '/page/:number', component: SiblingPageCmp, name: 'Page' })]); })
                .then(function (_) { return router.navigateByUrl('/page/1'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(getHref(fixture)).toEqual('/page/2');
                async.done();
            });
        }));
        testing_internal_1.it('should generate link hrefs from a child to its sibling with no leading slash', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return router.config([new router_deprecated_1.Route({ path: '/page/:number', component: NoPrefixSiblingPageCmp, name: 'Page' })]); })
                .then(function (_) { return router.navigateByUrl('/page/1'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(getHref(fixture)).toEqual('/page/2');
                async.done();
            });
        }));
        testing_internal_1.it('should generate link hrefs to a child with no leading slash', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return router.config([new router_deprecated_1.Route({ path: '/book/:title/...', component: NoPrefixBookCmp, name: 'Book' })]); })
                .then(function (_) { return router.navigateByUrl('/book/1984/page/1'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(getHref(fixture)).toEqual('/book/1984/page/100');
                async.done();
            });
        }));
        testing_internal_1.it('should throw when links without a leading slash are ambiguous', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return router.config([new router_deprecated_1.Route({ path: '/book/:title/...', component: AmbiguousBookCmp, name: 'Book' })]); })
                .then(function (_) { return router.navigateByUrl('/book/1984/page/1'); })
                .then(function (_) {
                var link = collection_1.ListWrapper.toJSON(['Book', { number: 100 }]);
                matchers_1.expect(function () { return fixture.detectChanges(); })
                    .toThrowError(new RegExp(lang_1.escapeRegExp("Link \"" + link + "\" is ambiguous, use \"./\" or \"../\" to disambiguate.")));
                async.done();
            });
        }));
        testing_internal_1.it('should generate link hrefs when asynchronously loaded', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return router.config([new router_deprecated_1.AsyncRoute({
                    path: '/child-with-grandchild/...',
                    loader: parentCmpLoader,
                    name: 'ChildWithGrandchild'
                })]); })
                .then(function (_) { return router.navigateByUrl('/child-with-grandchild/grandchild'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(getHref(fixture)).toEqual('/child-with-grandchild/grandchild');
                async.done();
            });
        }));
        testing_internal_1.it('should generate relative links preserving the existing parent route', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return router.config([new router_deprecated_1.Route({ path: '/book/:title/...', component: BookCmp, name: 'Book' })]); })
                .then(function (_) { return router.navigateByUrl('/book/1984/page/1'); })
                .then(function (_) {
                fixture.detectChanges();
                // TODO(juliemr): This should be one By.css('book-cmp a') query, but the parse5
                // adapter
                // can't handle css child selectors.
                matchers_1.expect(dom_adapter_1.getDOM().getAttribute(fixture.debugElement.query(by_1.By.css('book-cmp'))
                    .query(by_1.By.css('a'))
                    .nativeElement, 'href'))
                    .toEqual('/book/1984/page/100');
                matchers_1.expect(dom_adapter_1.getDOM().getAttribute(fixture.debugElement.query(by_1.By.css('page-cmp'))
                    .query(by_1.By.css('a'))
                    .nativeElement, 'href'))
                    .toEqual('/book/1984/page/2');
                async.done();
            });
        }));
        testing_internal_1.it('should generate links to auxiliary routes', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            compile()
                .then(function (_) { return router.config([new router_deprecated_1.Route({ path: '/...', component: AuxLinkCmp })]); })
                .then(function (_) { return router.navigateByUrl('/'); })
                .then(function (_) {
                fixture.detectChanges();
                matchers_1.expect(getHref(fixture)).toEqual('/(aside)');
                async.done();
            });
        }));
        testing_internal_1.describe('router-link-active CSS class', function () {
            testing_internal_1.it('should be added to the associated element', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                router
                    .config([
                    new router_deprecated_1.Route({ path: '/child', component: HelloCmp, name: 'Child' }),
                    new router_deprecated_1.Route({ path: '/better-child', component: Hello2Cmp, name: 'BetterChild' })
                ])
                    .then(function (_) { return compile("<a [routerLink]=\"['./Child']\" class=\"child-link\">Child</a>\n                                <a [routerLink]=\"['./BetterChild']\" class=\"better-child-link\">Better Child</a>\n                                <router-outlet></router-outlet>"); })
                    .then(function (_) {
                    var element = fixture.debugElement.nativeElement;
                    fixture.detectChanges();
                    var link1 = dom_adapter_1.getDOM().querySelector(element, '.child-link');
                    var link2 = dom_adapter_1.getDOM().querySelector(element, '.better-child-link');
                    matchers_1.expect(link1).not.toHaveCssClass('router-link-active');
                    matchers_1.expect(link2).not.toHaveCssClass('router-link-active');
                    router.subscribe(function (_) {
                        fixture.detectChanges();
                        matchers_1.expect(link1).not.toHaveCssClass('router-link-active');
                        matchers_1.expect(link2).toHaveCssClass('router-link-active');
                        async.done();
                    });
                    router.navigateByUrl('/better-child?extra=0');
                });
            }));
            testing_internal_1.it('should be added to links in child routes', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                router
                    .config([
                    new router_deprecated_1.Route({ path: '/child', component: HelloCmp, name: 'Child' }), new router_deprecated_1.Route({
                        path: '/child-with-grandchild/...',
                        component: ParentCmp,
                        name: 'ChildWithGrandchild'
                    })
                ])
                    .then(function (_) { return compile("<a [routerLink]=\"['./Child']\" class=\"child-link\">Child</a>\n                                <a [routerLink]=\"['./ChildWithGrandchild/Grandchild']\" class=\"child-with-grandchild-link\">Better Child</a>\n                                <router-outlet></router-outlet>"); })
                    .then(function (_) {
                    var element = fixture.debugElement.nativeElement;
                    fixture.detectChanges();
                    var link1 = dom_adapter_1.getDOM().querySelector(element, '.child-link');
                    var link2 = dom_adapter_1.getDOM().querySelector(element, '.child-with-grandchild-link');
                    matchers_1.expect(link1).not.toHaveCssClass('router-link-active');
                    matchers_1.expect(link2).not.toHaveCssClass('router-link-active');
                    router.subscribe(function (_) {
                        fixture.detectChanges();
                        matchers_1.expect(link1).not.toHaveCssClass('router-link-active');
                        matchers_1.expect(link2).toHaveCssClass('router-link-active');
                        var link3 = dom_adapter_1.getDOM().querySelector(element, '.grandchild-link');
                        var link4 = dom_adapter_1.getDOM().querySelector(element, '.better-grandchild-link');
                        matchers_1.expect(link3).toHaveCssClass('router-link-active');
                        matchers_1.expect(link4).not.toHaveCssClass('router-link-active');
                        async.done();
                    });
                    router.navigateByUrl('/child-with-grandchild/grandchild?extra=0');
                });
            }));
            testing_internal_1.it('should not be added to links in other child routes', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                router
                    .config([
                    new router_deprecated_1.Route({ path: '/child', component: HelloCmp, name: 'Child' }), new router_deprecated_1.Route({
                        path: '/child-with-grandchild/...',
                        component: ParentCmp,
                        name: 'ChildWithGrandchild'
                    }),
                    new router_deprecated_1.Route({
                        path: '/child-with-other-grandchild/...',
                        component: ParentCmp,
                        name: 'ChildWithOtherGrandchild'
                    })
                ])
                    .then(function (_) { return compile("<a [routerLink]=\"['./Child']\" class=\"child-link\">Child</a>\n                                <a [routerLink]=\"['./ChildWithGrandchild/Grandchild']\" class=\"child-with-grandchild-link\">Better Child</a>\n                                <a [routerLink]=\"['./ChildWithOtherGrandchild/Grandchild']\" class=\"child-with-other-grandchild-link\">Better Child</a>\n                                <router-outlet></router-outlet>"); })
                    .then(function (_) {
                    var element = fixture.debugElement.nativeElement;
                    fixture.detectChanges();
                    var link1 = dom_adapter_1.getDOM().querySelector(element, '.child-link');
                    var link2 = dom_adapter_1.getDOM().querySelector(element, '.child-with-grandchild-link');
                    var link3 = dom_adapter_1.getDOM().querySelector(element, '.child-with-other-grandchild-link');
                    matchers_1.expect(link1).not.toHaveCssClass('router-link-active');
                    matchers_1.expect(link2).not.toHaveCssClass('router-link-active');
                    matchers_1.expect(link3).not.toHaveCssClass('router-link-active');
                    router.subscribe(function (_) {
                        fixture.detectChanges();
                        matchers_1.expect(link1).not.toHaveCssClass('router-link-active');
                        matchers_1.expect(link2).toHaveCssClass('router-link-active');
                        matchers_1.expect(link3).not.toHaveCssClass('router-link-active');
                        async.done();
                    });
                    router.navigateByUrl('/child-with-grandchild/grandchild?extra=0');
                });
            }));
        });
        testing_internal_1.describe('when clicked', function () {
            var clickOnElement = function (view /** TODO #9100 */) {
                var anchorEl = fixture.debugElement.query(by_1.By.css('a')).nativeElement;
                var dispatchedEvent = dom_adapter_1.getDOM().createMouseEvent('click');
                dom_adapter_1.getDOM().dispatchEvent(anchorEl, dispatchedEvent);
                return dispatchedEvent;
            };
            testing_internal_1.it('should navigate to link hrefs without params', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                compile('<a href="hello" [routerLink]="[\'./User\']"></a>')
                    .then(function (_) { return router.config([new router_deprecated_1.Route({ path: '/user', component: UserCmp, name: 'User' })]); })
                    .then(function (_) { return router.navigateByUrl('/a/b'); })
                    .then(function (_) {
                    fixture.detectChanges();
                    var dispatchedEvent = clickOnElement(fixture);
                    matchers_1.expect(dom_adapter_1.getDOM().isPrevented(dispatchedEvent)).toBe(true);
                    // router navigation is async.
                    router.subscribe(function (_) {
                        matchers_1.expect(location.urlChanges).toEqual(['/user']);
                        async.done();
                    });
                });
            }));
            testing_internal_1.it('should navigate to link hrefs in presence of base href', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                location.setBaseHref('/base');
                compile('<a href="hello" [routerLink]="[\'./User\']"></a>')
                    .then(function (_) { return router.config([new router_deprecated_1.Route({ path: '/user', component: UserCmp, name: 'User' })]); })
                    .then(function (_) { return router.navigateByUrl('/a/b'); })
                    .then(function (_) {
                    fixture.detectChanges();
                    var dispatchedEvent = clickOnElement(fixture);
                    matchers_1.expect(dom_adapter_1.getDOM().isPrevented(dispatchedEvent)).toBe(true);
                    // router navigation is async.
                    router.subscribe(function (_) {
                        matchers_1.expect(location.urlChanges).toEqual(['/base/user']);
                        async.done();
                    });
                });
            }));
        });
    });
}
exports.main = main;
function getHref(tc) {
    return dom_adapter_1.getDOM().getAttribute(tc.debugElement.query(by_1.By.css('a')).nativeElement, 'href');
}
var MyComp7 = (function () {
    function MyComp7() {
    }
    /** @nocollapse */
    MyComp7.decorators = [
        { type: core_1.Component, args: [{ selector: 'my-comp', template: '', directives: [router_deprecated_1.ROUTER_DIRECTIVES] },] },
    ];
    return MyComp7;
}());
var UserCmp = (function () {
    function UserCmp(params) {
        this.user = params.get('name');
    }
    /** @nocollapse */
    UserCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'user-cmp', template: 'hello {{user}}' },] },
    ];
    /** @nocollapse */
    UserCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return UserCmp;
}());
var SiblingPageCmp = (function () {
    function SiblingPageCmp(params) {
        this.pageNumber = lang_1.NumberWrapper.parseInt(params.get('number'), 10);
        this.nextPage = this.pageNumber + 1;
    }
    /** @nocollapse */
    SiblingPageCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'page-cmp',
                    template: "page #{{pageNumber}} | <a href=\"hello\" [routerLink]=\"['../Page', {number: nextPage}]\">next</a>",
                    directives: [router_deprecated_1.RouterLink]
                },] },
    ];
    /** @nocollapse */
    SiblingPageCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return SiblingPageCmp;
}());
var NoPrefixSiblingPageCmp = (function () {
    function NoPrefixSiblingPageCmp(params) {
        this.pageNumber = lang_1.NumberWrapper.parseInt(params.get('number'), 10);
        this.nextPage = this.pageNumber + 1;
    }
    /** @nocollapse */
    NoPrefixSiblingPageCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'page-cmp',
                    template: "page #{{pageNumber}} | <a href=\"hello\" [routerLink]=\"['Page', {number: nextPage}]\">next</a>",
                    directives: [router_deprecated_1.RouterLink]
                },] },
    ];
    /** @nocollapse */
    NoPrefixSiblingPageCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return NoPrefixSiblingPageCmp;
}());
var HelloCmp = (function () {
    function HelloCmp() {
    }
    /** @nocollapse */
    HelloCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'hello-cmp', template: 'hello' },] },
    ];
    return HelloCmp;
}());
var Hello2Cmp = (function () {
    function Hello2Cmp() {
    }
    /** @nocollapse */
    Hello2Cmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'hello2-cmp', template: 'hello2' },] },
    ];
    return Hello2Cmp;
}());
function parentCmpLoader() {
    return async_1.PromiseWrapper.resolve(ParentCmp);
}
var ParentCmp = (function () {
    function ParentCmp() {
    }
    /** @nocollapse */
    ParentCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'parent-cmp',
                    template: "[ <a [routerLink]=\"['./Grandchild']\" class=\"grandchild-link\">Grandchild</a>\n               <a [routerLink]=\"['./BetterGrandchild']\" class=\"better-grandchild-link\">Better Grandchild</a>\n               <router-outlet></router-outlet> ]",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[
                    new router_deprecated_1.Route({ path: '/grandchild', component: HelloCmp, name: 'Grandchild' }),
                    new router_deprecated_1.Route({ path: '/better-grandchild', component: Hello2Cmp, name: 'BetterGrandchild' })
                ],] },
    ];
    return ParentCmp;
}());
var BookCmp = (function () {
    function BookCmp(params) {
        this.title = params.get('title');
    }
    /** @nocollapse */
    BookCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'book-cmp',
                    template: "<a href=\"hello\" [routerLink]=\"['./Page', {number: 100}]\">{{title}}</a> |\n    <router-outlet></router-outlet>",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[new router_deprecated_1.Route({ path: '/page/:number', component: SiblingPageCmp, name: 'Page' })],] },
    ];
    /** @nocollapse */
    BookCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return BookCmp;
}());
var NoPrefixBookCmp = (function () {
    function NoPrefixBookCmp(params) {
        this.title = params.get('title');
    }
    /** @nocollapse */
    NoPrefixBookCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'book-cmp',
                    template: "<a href=\"hello\" [routerLink]=\"['Page', {number: 100}]\">{{title}}</a> |\n    <router-outlet></router-outlet>",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[new router_deprecated_1.Route({ path: '/page/:number', component: SiblingPageCmp, name: 'Page' })],] },
    ];
    /** @nocollapse */
    NoPrefixBookCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return NoPrefixBookCmp;
}());
var AmbiguousBookCmp = (function () {
    function AmbiguousBookCmp(params) {
        this.title = params.get('title');
    }
    /** @nocollapse */
    AmbiguousBookCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'book-cmp',
                    template: "<a href=\"hello\" [routerLink]=\"['Book', {number: 100}]\">{{title}}</a> |\n    <router-outlet></router-outlet>",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[new router_deprecated_1.Route({ path: '/page/:number', component: SiblingPageCmp, name: 'Book' })],] },
    ];
    /** @nocollapse */
    AmbiguousBookCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return AmbiguousBookCmp;
}());
var AuxLinkCmp = (function () {
    function AuxLinkCmp() {
    }
    /** @nocollapse */
    AuxLinkCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'aux-cmp',
                    template: "<a [routerLink]=\"['./Hello', [ 'Aside' ] ]\">aside</a> |\n    <router-outlet></router-outlet> | aside <router-outlet name=\"aside\"></router-outlet>",
                    directives: router_deprecated_1.ROUTER_DIRECTIVES
                },] },
        { type: router_deprecated_1.RouteConfig, args: [[
                    new router_deprecated_1.Route({ path: '/', component: HelloCmp, name: 'Hello' }),
                    new router_deprecated_1.AuxRoute({ path: '/aside', component: Hello2Cmp, name: 'Aside' })
                ],] },
    ];
    return AuxLinkCmp;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX2xpbmtfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyLWRlcHJlY2F0ZWQvdGVzdC9pbnRlZ3JhdGlvbi9yb3V0ZXJfbGlua19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBeUgsd0NBQXdDLENBQUMsQ0FBQTtBQUNsSyx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUNsRSx3QkFBcUQsdUJBQXVCLENBQUMsQ0FBQTtBQUM3RSx1QkFBdUIsaUJBQWlCLENBQUMsQ0FBQTtBQUN6QyxxQkFBMEMsdUJBQXVCLENBQUMsQ0FBQTtBQUNsRSxzQkFBNkIsd0JBQXdCLENBQUMsQ0FBQTtBQUN0RCwyQkFBMEIsNkJBQTZCLENBQUMsQ0FBQTtBQUN4RCxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsa0NBQW9KLDRCQUE0QixDQUFDLENBQUE7QUFDakwsdUJBQXlCLHVDQUF1QyxDQUFDLENBQUE7QUFDakUsNEJBQXFCLCtDQUErQyxDQUFDLENBQUE7QUFDckUsbUJBQWlCLDRDQUE0QyxDQUFDLENBQUE7QUFDOUQsd0JBQTBCLHlCQUF5QixDQUFDLENBQUE7QUFFcEQ7SUFDRSwyQkFBUSxDQUFDLHNCQUFzQixFQUFFO1FBQy9CLElBQUksR0FBeUIsQ0FBQztRQUM5QixJQUFJLE9BQThCLENBQUM7UUFDbkMsSUFBSSxNQUFjLENBQUM7UUFDbkIsSUFBSSxRQUFrQixDQUFDO1FBRXZCLHNDQUFtQixDQUNmO1lBQ0ksT0FBQSxDQUFDLGlDQUFhLEVBQUUsRUFBQyxPQUFPLEVBQUUsaUJBQVEsRUFBRSxRQUFRLEVBQUUscUJBQVcsRUFBQztnQkFDekQsRUFBQyxPQUFPLEVBQUUsNENBQXdCLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQztnQkFDdEQsRUFBQyxPQUFPLEVBQUUsMEJBQU0sRUFBRSxRQUFRLEVBQUUsbUJB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