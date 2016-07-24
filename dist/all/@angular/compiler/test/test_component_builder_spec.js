/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var testing_1 = require('@angular/core/testing');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var async_1 = require('../src/facade/async');
var promise_1 = require('../src/facade/promise');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var ChildComp = (function () {
    function ChildComp() {
        this.childBinding = 'Child';
    }
    /** @nocollapse */
    ChildComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'child-comp', template: "<span>Original {{childBinding}}</span>", directives: [] },] },
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ChildComp.ctorParameters = [];
    return ChildComp;
}());
var MockChildComp = (function () {
    function MockChildComp() {
    }
    /** @nocollapse */
    MockChildComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'child-comp', template: "<span>Mock</span>" },] },
        { type: core_1.Injectable },
    ];
    return MockChildComp;
}());
var ParentComp = (function () {
    function ParentComp() {
    }
    /** @nocollapse */
    ParentComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'parent-comp',
                    template: "Parent(<child-comp></child-comp>)",
                    directives: [ChildComp]
                },] },
        { type: core_1.Injectable },
    ];
    return ParentComp;
}());
var MyIfComp = (function () {
    function MyIfComp() {
        this.showMore = false;
    }
    /** @nocollapse */
    MyIfComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'my-if-comp',
                    template: "MyIf(<span *ngIf=\"showMore\">More</span>)",
                    directives: [common_1.NgIf]
                },] },
        { type: core_1.Injectable },
    ];
    return MyIfComp;
}());
var ChildChildComp = (function () {
    function ChildChildComp() {
    }
    /** @nocollapse */
    ChildChildComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'child-child-comp', template: "<span>ChildChild</span>" },] },
        { type: core_1.Injectable },
    ];
    return ChildChildComp;
}());
var ChildWithChildComp = (function () {
    function ChildWithChildComp() {
        this.childBinding = 'Child';
    }
    /** @nocollapse */
    ChildWithChildComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'child-comp',
                    template: "<span>Original {{childBinding}}(<child-child-comp></child-child-comp>)</span>",
                    directives: [ChildChildComp]
                },] },
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ChildWithChildComp.ctorParameters = [];
    return ChildWithChildComp;
}());
var MockChildChildComp = (function () {
    function MockChildChildComp() {
    }
    /** @nocollapse */
    MockChildChildComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'child-child-comp', template: "<span>ChildChild Mock</span>" },] },
        { type: core_1.Injectable },
    ];
    return MockChildChildComp;
}());
var AutoDetectComp = (function () {
    function AutoDetectComp() {
        this.text = '1';
    }
    AutoDetectComp.prototype.click = function () { this.text += '1'; };
    /** @nocollapse */
    AutoDetectComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'autodetect-comp', template: "<span (click)='click()'>{{text}}</span>" },] },
    ];
    return AutoDetectComp;
}());
var AsyncComp = (function () {
    function AsyncComp() {
        this.text = '1';
    }
    AsyncComp.prototype.click = function () {
        var _this = this;
        promise_1.PromiseWrapper.resolve(null).then(function (_) { _this.text += '1'; });
    };
    /** @nocollapse */
    AsyncComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'async-comp', template: "<span (click)='click()'>{{text}}</span>" },] },
    ];
    return AsyncComp;
}());
var AsyncChildComp = (function () {
    function AsyncChildComp() {
        this.localText = '';
    }
    Object.defineProperty(AsyncChildComp.prototype, "text", {
        set: function (value) {
            var _this = this;
            promise_1.PromiseWrapper.resolve(null).then(function (_) { _this.localText = value; });
        },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    AsyncChildComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'async-child-comp', template: '<span>{{localText}}</span>' },] },
    ];
    /** @nocollapse */
    AsyncChildComp.propDecorators = {
        'text': [{ type: core_1.Input },],
    };
    return AsyncChildComp;
}());
var AsyncChangeComp = (function () {
    function AsyncChangeComp() {
        this.text = '1';
    }
    AsyncChangeComp.prototype.click = function () { this.text += '1'; };
    /** @nocollapse */
    AsyncChangeComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'async-change-comp',
                    template: "<async-child-comp (click)='click()' [text]=\"text\"></async-child-comp>",
                    directives: [AsyncChildComp]
                },] },
    ];
    return AsyncChangeComp;
}());
var AsyncTimeoutComp = (function () {
    function AsyncTimeoutComp() {
        this.text = '1';
    }
    AsyncTimeoutComp.prototype.click = function () {
        var _this = this;
        async_1.TimerWrapper.setTimeout(function () { _this.text += '1'; }, 10);
    };
    /** @nocollapse */
    AsyncTimeoutComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'async-timeout-comp', template: "<span (click)='click()'>{{text}}</span>" },] },
    ];
    return AsyncTimeoutComp;
}());
var NestedAsyncTimeoutComp = (function () {
    function NestedAsyncTimeoutComp() {
        this.text = '1';
    }
    NestedAsyncTimeoutComp.prototype.click = function () {
        var _this = this;
        async_1.TimerWrapper.setTimeout(function () { async_1.TimerWrapper.setTimeout(function () { _this.text += '1'; }, 10); }, 10);
    };
    /** @nocollapse */
    NestedAsyncTimeoutComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'nested-async-timeout-comp', template: "<span (click)='click()'>{{text}}</span>" },] },
    ];
    return NestedAsyncTimeoutComp;
}());
var FancyService = (function () {
    function FancyService() {
        this.value = 'real value';
    }
    return FancyService;
}());
var MockFancyService = (function (_super) {
    __extends(MockFancyService, _super);
    function MockFancyService() {
        _super.apply(this, arguments);
        this.value = 'mocked out value';
    }
    return MockFancyService;
}(FancyService));
var TestBindingsComp = (function () {
    function TestBindingsComp(fancyService) {
        this.fancyService = fancyService;
    }
    /** @nocollapse */
    TestBindingsComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'my-service-comp',
                    providers: [FancyService],
                    template: "injected value: {{fancyService.value}}"
                },] },
    ];
    /** @nocollapse */
    TestBindingsComp.ctorParameters = [
        { type: FancyService, },
    ];
    return TestBindingsComp;
}());
var TestViewBindingsComp = (function () {
    function TestViewBindingsComp(fancyService) {
        this.fancyService = fancyService;
    }
    /** @nocollapse */
    TestViewBindingsComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'my-service-comp',
                    viewProviders: [FancyService],
                    template: "injected value: {{fancyService.value}}"
                },] },
    ];
    /** @nocollapse */
    TestViewBindingsComp.ctorParameters = [
        { type: FancyService, },
    ];
    return TestViewBindingsComp;
}());
var ListDir1 = (function () {
    function ListDir1() {
    }
    /** @nocollapse */
    ListDir1.decorators = [
        { type: core_1.Component, args: [{ selector: 'li1', template: "<span>One</span>" },] },
    ];
    return ListDir1;
}());
var ListDir1Alt = (function () {
    function ListDir1Alt() {
    }
    /** @nocollapse */
    ListDir1Alt.decorators = [
        { type: core_1.Component, args: [{ selector: 'li1', template: "<span>Alternate One</span>" },] },
    ];
    return ListDir1Alt;
}());
var ListDir2 = (function () {
    function ListDir2() {
    }
    /** @nocollapse */
    ListDir2.decorators = [
        { type: core_1.Component, args: [{ selector: 'li2', template: "<span>Two</span>" },] },
    ];
    return ListDir2;
}());
var LIST_CHILDREN = [ListDir1, ListDir2];
var DirectiveListComp = (function () {
    function DirectiveListComp() {
    }
    /** @nocollapse */
    DirectiveListComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'directive-list-comp',
                    template: "(<li1></li1>)(<li2></li2>)",
                    directives: [LIST_CHILDREN]
                },] },
    ];
    return DirectiveListComp;
}());
function main() {
    testing_internal_1.describe('test component builder', function () {
        testing_internal_1.it('should instantiate a component with valid DOM', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(ChildComp).then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.nativeElement).toHaveText('Original Child');
                async.done();
            });
        }));
        testing_internal_1.it('should allow changing members of the component', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(MyIfComp).then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.nativeElement).toHaveText('MyIf()');
                componentFixture.componentInstance.showMore = true;
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.nativeElement).toHaveText('MyIf(More)');
                async.done();
            });
        }));
        testing_internal_1.it('should override a template', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(MockChildComp, '<span>Mock</span>')
                .createAsync(MockChildComp)
                .then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.nativeElement).toHaveText('Mock');
                async.done();
            });
        }));
        testing_internal_1.it('should override a view', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(ChildComp, new core_1.ViewMetadata({ template: '<span>Modified {{childBinding}}</span>' }))
                .createAsync(ChildComp)
                .then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.nativeElement).toHaveText('Modified Child');
                async.done();
            });
        }));
        testing_internal_1.it('should override component dependencies', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideDirective(ParentComp, ChildComp, MockChildComp)
                .createAsync(ParentComp)
                .then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.nativeElement).toHaveText('Parent(Mock)');
                async.done();
            });
        }));
        testing_internal_1.it('should override items from a list', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideDirective(DirectiveListComp, ListDir1, ListDir1Alt)
                .createAsync(DirectiveListComp)
                .then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.nativeElement).toHaveText('(Alternate One)(Two)');
                async.done();
            });
        }));
        testing_internal_1.it('should override child component\'s dependencies', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideDirective(ParentComp, ChildComp, ChildWithChildComp)
                .overrideDirective(ChildWithChildComp, ChildChildComp, MockChildChildComp)
                .createAsync(ParentComp)
                .then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.nativeElement)
                    .toHaveText('Parent(Original Child(ChildChild Mock))');
                async.done();
            });
        }));
        testing_internal_1.it('should override a provider', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideProviders(TestBindingsComp, [{ provide: FancyService, useClass: MockFancyService }])
                .createAsync(TestBindingsComp)
                .then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.nativeElement)
                    .toHaveText('injected value: mocked out value');
                async.done();
            });
        }));
        testing_internal_1.it('should override a viewBinding', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideViewProviders(TestViewBindingsComp, [{ provide: FancyService, useClass: MockFancyService }])
                .createAsync(TestViewBindingsComp)
                .then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.nativeElement)
                    .toHaveText('injected value: mocked out value');
                async.done();
            });
        }));
        testing_internal_1.it('should create components synchronously', testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            var componentFixture = tcb.overrideTemplate(MockChildComp, '<span>Mock</span>').createSync(MockChildComp);
            componentFixture.detectChanges();
            matchers_1.expect(componentFixture.nativeElement).toHaveText('Mock');
        }));
        testing_internal_1.describe('ComponentFixture', function () {
            testing_internal_1.it('should auto detect changes if autoDetectChanges is called', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.createAsync(AutoDetectComp).then(function (componentFixture) {
                    matchers_1.expect(componentFixture.ngZone).not.toBeNull();
                    componentFixture.autoDetectChanges();
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                    var element = componentFixture.debugElement.children[0];
                    browser_util_1.dispatchEvent(element.nativeElement, 'click');
                    matchers_1.expect(componentFixture.isStable()).toBe(true);
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('11');
                    async.done();
                });
            }));
            testing_internal_1.it('should auto detect changes if ComponentFixtureAutoDetect is provided as true', testing_1.withProviders(function () { return [{ provide: testing_1.ComponentFixtureAutoDetect, useValue: true }]; })
                .inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.createAsync(AutoDetectComp).then(function (componentFixture) {
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                    var element = componentFixture.debugElement.children[0];
                    browser_util_1.dispatchEvent(element.nativeElement, 'click');
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('11');
                    async.done();
                });
            }));
            testing_internal_1.it('should signal through whenStable when the fixture is stable (autoDetectChanges)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.createAsync(AsyncComp).then(function (componentFixture) {
                    componentFixture.autoDetectChanges();
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                    var element = componentFixture.debugElement.children[0];
                    browser_util_1.dispatchEvent(element.nativeElement, 'click');
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                    // Component is updated asynchronously. Wait for the fixture to become stable
                    // before checking for new value.
                    matchers_1.expect(componentFixture.isStable()).toBe(false);
                    componentFixture.whenStable().then(function (waited) {
                        matchers_1.expect(waited).toBe(true);
                        matchers_1.expect(componentFixture.nativeElement).toHaveText('11');
                        async.done();
                    });
                });
            }));
            testing_internal_1.it('should signal through isStable when the fixture is stable (no autoDetectChanges)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.createAsync(AsyncComp).then(function (componentFixture) {
                    componentFixture.detectChanges();
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                    var element = componentFixture.debugElement.children[0];
                    browser_util_1.dispatchEvent(element.nativeElement, 'click');
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                    // Component is updated asynchronously. Wait for the fixture to become stable
                    // before checking.
                    componentFixture.whenStable().then(function (waited) {
                        matchers_1.expect(waited).toBe(true);
                        componentFixture.detectChanges();
                        matchers_1.expect(componentFixture.nativeElement).toHaveText('11');
                        async.done();
                    });
                });
            }));
            testing_internal_1.it('should wait for macroTask(setTimeout) while checking for whenStable ' +
                '(autoDetectChanges)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.createAsync(AsyncTimeoutComp).then(function (componentFixture) {
                    componentFixture.autoDetectChanges();
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                    var element = componentFixture.debugElement.children[0];
                    browser_util_1.dispatchEvent(element.nativeElement, 'click');
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                    // Component is updated asynchronously. Wait for the fixture to become
                    // stable before checking for new value.
                    matchers_1.expect(componentFixture.isStable()).toBe(false);
                    componentFixture.whenStable().then(function (waited) {
                        matchers_1.expect(waited).toBe(true);
                        matchers_1.expect(componentFixture.nativeElement).toHaveText('11');
                        async.done();
                    });
                });
            }));
            testing_internal_1.it('should wait for macroTask(setTimeout) while checking for whenStable ' +
                '(no autoDetectChanges)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.createAsync(AsyncTimeoutComp).then(function (componentFixture) {
                    componentFixture.detectChanges();
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                    var element = componentFixture.debugElement.children[0];
                    browser_util_1.dispatchEvent(element.nativeElement, 'click');
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                    // Component is updated asynchronously. Wait for the fixture to become
                    // stable before checking for new value.
                    matchers_1.expect(componentFixture.isStable()).toBe(false);
                    componentFixture.whenStable().then(function (waited) {
                        matchers_1.expect(waited).toBe(true);
                        componentFixture.detectChanges();
                        matchers_1.expect(componentFixture.nativeElement).toHaveText('11');
                        async.done();
                    });
                });
            }));
            testing_internal_1.it('should wait for nested macroTasks(setTimeout) while checking for whenStable ' +
                '(autoDetectChanges)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.createAsync(NestedAsyncTimeoutComp).then(function (componentFixture) {
                    componentFixture.autoDetectChanges();
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                    var element = componentFixture.debugElement.children[0];
                    browser_util_1.dispatchEvent(element.nativeElement, 'click');
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                    // Component is updated asynchronously. Wait for the fixture to become
                    // stable before checking for new value.
                    matchers_1.expect(componentFixture.isStable()).toBe(false);
                    componentFixture.whenStable().then(function (waited) {
                        matchers_1.expect(waited).toBe(true);
                        matchers_1.expect(componentFixture.nativeElement).toHaveText('11');
                        async.done();
                    });
                });
            }));
            testing_internal_1.it('should wait for nested macroTasks(setTimeout) while checking for whenStable ' +
                '(no autoDetectChanges)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.createAsync(NestedAsyncTimeoutComp).then(function (componentFixture) {
                    componentFixture.detectChanges();
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                    var element = componentFixture.debugElement.children[0];
                    browser_util_1.dispatchEvent(element.nativeElement, 'click');
                    matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                    // Component is updated asynchronously. Wait for the fixture to become
                    // stable before checking for new value.
                    matchers_1.expect(componentFixture.isStable()).toBe(false);
                    componentFixture.whenStable().then(function (waited) {
                        matchers_1.expect(waited).toBe(true);
                        componentFixture.detectChanges();
                        matchers_1.expect(componentFixture.nativeElement).toHaveText('11');
                        async.done();
                    });
                });
            }));
            testing_internal_1.it('should stabilize after async task in change detection (autoDetectChanges)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.createAsync(AsyncChangeComp).then(function (componentFixture) {
                    componentFixture.autoDetectChanges();
                    componentFixture.whenStable().then(function (_) {
                        matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                        var element = componentFixture.debugElement.children[0];
                        browser_util_1.dispatchEvent(element.nativeElement, 'click');
                        componentFixture.whenStable().then(function (_) {
                            matchers_1.expect(componentFixture.nativeElement).toHaveText('11');
                            async.done();
                        });
                    });
                });
            }));
            testing_internal_1.it('should stabilize after async task in change detection(no autoDetectChanges)', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.createAsync(AsyncChangeComp).then(function (componentFixture) {
                    componentFixture.detectChanges();
                    componentFixture.whenStable().then(function (_) {
                        // Run detectChanges again so that stabilized value is reflected in the
                        // DOM.
                        componentFixture.detectChanges();
                        matchers_1.expect(componentFixture.nativeElement).toHaveText('1');
                        var element = componentFixture.debugElement.children[0];
                        browser_util_1.dispatchEvent(element.nativeElement, 'click');
                        componentFixture.detectChanges();
                        componentFixture.whenStable().then(function (_) {
                            // Run detectChanges again so that stabilized value is reflected in
                            // the DOM.
                            componentFixture.detectChanges();
                            matchers_1.expect(componentFixture.nativeElement).toHaveText('11');
                            async.done();
                        });
                    });
                });
            }));
            testing_internal_1.describe('No NgZone', function () {
                testing_internal_1.beforeEachProviders(function () { return [{ provide: testing_1.ComponentFixtureNoNgZone, useValue: true }]; });
                testing_internal_1.it('calling autoDetectChanges raises an error', function () {
                    testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                        tcb.createAsync(ChildComp).then(function (componentFixture) {
                            matchers_1.expect(function () { componentFixture.autoDetectChanges(); })
                                .toThrow('Cannot call autoDetectChanges when ComponentFixtureNoNgZone is set!!');
                            async.done();
                        });
                    });
                });
                testing_internal_1.it('should instantiate a component with valid DOM', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.createAsync(ChildComp).then(function (componentFixture) {
                        matchers_1.expect(componentFixture.ngZone).toBeNull();
                        componentFixture.detectChanges();
                        matchers_1.expect(componentFixture.nativeElement).toHaveText('Original Child');
                        async.done();
                    });
                }));
                testing_internal_1.it('should allow changing members of the component', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                    tcb.createAsync(MyIfComp).then(function (componentFixture) {
                        componentFixture.detectChanges();
                        matchers_1.expect(componentFixture.nativeElement).toHaveText('MyIf()');
                        componentFixture.componentInstance.showMore = true;
                        componentFixture.detectChanges();
                        matchers_1.expect(componentFixture.nativeElement).toHaveText('MyIf(More)');
                        async.done();
                    });
                }));
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9jb21wb25lbnRfYnVpbGRlcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L3Rlc3RfY29tcG9uZW50X2J1aWxkZXJfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCxpQ0FBeUgsd0NBQXdDLENBQUMsQ0FBQTtBQUNsSyx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUNsRSx3QkFBd0csdUJBQXVCLENBQUMsQ0FBQTtBQUNoSSxxQkFBeUQsZUFBZSxDQUFDLENBQUE7QUFDekUsdUJBQW1CLGlCQUFpQixDQUFDLENBQUE7QUFDckMsc0JBQTJCLHFCQUFxQixDQUFDLENBQUE7QUFDakQsd0JBQTZCLHVCQUF1QixDQUFDLENBQUE7QUFDckQsNkJBQTRCLGdEQUFnRCxDQUFDLENBQUE7QUFDN0U7SUFFRTtRQUFnQixJQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztJQUFDLENBQUM7SUFDaEQsa0JBQWtCO0lBQ1gsb0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLHdDQUF3QyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUMsRUFBRyxFQUFFO1FBQzNILEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHdCQUFjLEdBQTJELEVBQy9FLENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBQ0Q7SUFBQTtJQU1BLENBQUM7SUFMRCxrQkFBa0I7SUFDWCx3QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsbUJB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