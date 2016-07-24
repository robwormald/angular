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
var compiler_1 = require('@angular/compiler');
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var lang_1 = require('../../http/src/facade/lang');
var promise_1 = require('../../http/src/facade/promise');
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
        { type: core_1.Component, args: [{ selector: 'my-if-comp', template: "MyIf(<span *ngIf=\"showMore\">More</span>)" },] },
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
var FancyService = (function () {
    function FancyService() {
        this.value = 'real value';
    }
    FancyService.prototype.getAsyncValue = function () { return Promise.resolve('async value'); };
    FancyService.prototype.getTimeoutValue = function () {
        return new Promise(function (resolve, reject) { setTimeout(function () { resolve('timeout value'); }, 10); });
    };
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
var TestProvidersComp = (function () {
    function TestProvidersComp(fancyService) {
        this.fancyService = fancyService;
    }
    /** @nocollapse */
    TestProvidersComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'my-service-comp',
                    providers: [FancyService],
                    template: "injected value: {{fancyService.value}}"
                },] },
    ];
    /** @nocollapse */
    TestProvidersComp.ctorParameters = [
        { type: FancyService, },
    ];
    return TestProvidersComp;
}());
var TestViewProvidersComp = (function () {
    function TestViewProvidersComp(fancyService) {
        this.fancyService = fancyService;
    }
    /** @nocollapse */
    TestViewProvidersComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'my-service-comp',
                    viewProviders: [FancyService],
                    template: "injected value: {{fancyService.value}}"
                },] },
    ];
    /** @nocollapse */
    TestViewProvidersComp.ctorParameters = [
        { type: FancyService, },
    ];
    return TestViewProvidersComp;
}());
var SomeDirective = (function () {
    function SomeDirective() {
    }
    /** @nocollapse */
    SomeDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[someDir]', host: { '[title]': 'someDir' } },] },
    ];
    /** @nocollapse */
    SomeDirective.propDecorators = {
        'someDir': [{ type: core_1.Input },],
    };
    return SomeDirective;
}());
var SomePipe = (function () {
    function SomePipe() {
    }
    SomePipe.prototype.transform = function (value) { return "transformed " + value; };
    /** @nocollapse */
    SomePipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'somePipe' },] },
    ];
    return SomePipe;
}());
var CompUsingModuleDirectiveAndPipe = (function () {
    function CompUsingModuleDirectiveAndPipe() {
    }
    /** @nocollapse */
    CompUsingModuleDirectiveAndPipe.decorators = [
        { type: core_1.Component, args: [{ selector: 'comp', template: "<div  [someDir]=\"'someValue' | somePipe\"></div>" },] },
    ];
    return CompUsingModuleDirectiveAndPipe;
}());
var SomeLibModule = (function () {
    function SomeLibModule() {
    }
    /** @nocollapse */
    SomeLibModule.decorators = [
        { type: core_1.NgModule },
    ];
    return SomeLibModule;
}());
var CompWithUrlTemplate = (function () {
    function CompWithUrlTemplate() {
    }
    /** @nocollapse */
    CompWithUrlTemplate.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'comp',
                    templateUrl: '/base/modules/@angular/platform-browser/test/static_assets/test.html'
                },] },
    ];
    return CompWithUrlTemplate;
}());
function main() {
    describe('using the async helper', function () {
        var actuallyDone;
        beforeEach(function () { actuallyDone = false; });
        afterEach(function () { matchers_1.expect(actuallyDone).toEqual(true); });
        it('should run normal tests', function () { actuallyDone = true; });
        it('should run normal async tests', function (done /** TODO #9100 */) {
            setTimeout(function () {
                actuallyDone = true;
                done();
            }, 0);
        });
        it('should run async tests with tasks', testing_1.async(function () { setTimeout(function () { actuallyDone = true; }, 0); }));
        it('should run async tests with promises', testing_1.async(function () {
            var p = new Promise(function (resolve, reject) { setTimeout(resolve, 10); });
            p.then(function () { actuallyDone = true; });
        }));
    });
    describe('using the test injector with the inject helper', function () {
        describe('setting up Providers', function () {
            beforeEach(function () { return testing_1.addProviders([{ provide: FancyService, useValue: new FancyService() }]); });
            it('should use set up providers', testing_1.inject([FancyService], function (service /** TODO #9100 */) {
                matchers_1.expect(service.value).toEqual('real value');
            }));
            it('should wait until returned promises', testing_1.async(testing_1.inject([FancyService], function (service /** TODO #9100 */) {
                service.getAsyncValue().then(function (value /** TODO #9100 */) { matchers_1.expect(value).toEqual('async value'); });
                service.getTimeoutValue().then(function (value /** TODO #9100 */) { matchers_1.expect(value).toEqual('timeout value'); });
            })));
            it('should allow the use of fakeAsync', testing_1.fakeAsync(testing_1.inject([FancyService], function (service /** TODO #9100 */) {
                var value;
                service.getAsyncValue().then(function (val /** TODO #9100 */) { value = val; });
                testing_1.tick();
                matchers_1.expect(value).toEqual('async value');
            })));
            it('should allow use of "done"', function (done /** TODO #9100 */) {
                testing_1.inject([FancyService], function (service /** TODO #9100 */) {
                    var count = 0;
                    var id = setInterval(function () {
                        count++;
                        if (count > 2) {
                            clearInterval(id);
                            done();
                        }
                    }, 5);
                })(); // inject needs to be invoked explicitly with ().
            });
            describe('using beforeEach', function () {
                beforeEach(testing_1.inject([FancyService], function (service /** TODO #9100 */) {
                    service.value = 'value modified in beforeEach';
                }));
                it('should use modified providers', testing_1.inject([FancyService], function (service /** TODO #9100 */) {
                    matchers_1.expect(service.value).toEqual('value modified in beforeEach');
                }));
            });
            describe('using async beforeEach', function () {
                beforeEach(testing_1.async(testing_1.inject([FancyService], function (service /** TODO #9100 */) {
                    service.getAsyncValue().then(function (value /** TODO #9100 */) { service.value = value; });
                })));
                it('should use asynchronously modified value', testing_1.inject([FancyService], function (service /** TODO #9100 */) {
                    matchers_1.expect(service.value).toEqual('async value');
                }));
            });
        });
        describe('per test providers', function () {
            it('should allow per test providers', testing_1.withProviders(function () { return [{ provide: FancyService, useValue: new FancyService() }]; })
                .inject([FancyService], function (service /** TODO #9100 */) {
                matchers_1.expect(service.value).toEqual('real value');
            }));
            it('should return value from inject', function () {
                var retval = testing_1.withProviders(function () { return [{ provide: FancyService, useValue: new FancyService() }]; })
                    .inject([FancyService], function (service /** TODO #9100 */) {
                    matchers_1.expect(service.value).toEqual('real value');
                    return 10;
                })();
                matchers_1.expect(retval).toBe(10);
            });
        });
    });
    describe('using the test injector with modules', function () {
        var moduleConfig;
        beforeEach(function () {
            moduleConfig = {
                providers: [FancyService],
                imports: [SomeLibModule],
                declarations: [SomeDirective, SomePipe, CompUsingModuleDirectiveAndPipe],
                precompile: [CompUsingModuleDirectiveAndPipe]
            };
        });
        describe('setting up a module', function () {
            beforeEach(function () { return testing_1.configureModule(moduleConfig); });
            it('should use set up providers', testing_1.inject([FancyService], function (service) {
                matchers_1.expect(service.value).toEqual('real value');
            }));
            it('should use set up directives and pipes', testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                var compFixture = tcb.createSync(CompUsingModuleDirectiveAndPipe);
                var el = compFixture.debugElement;
                compFixture.detectChanges();
                matchers_1.expect(el.children[0].properties['title']).toBe('transformed someValue');
            }));
            it('should use set up library modules', testing_1.inject([SomeLibModule], function (libModule) {
                matchers_1.expect(libModule).toBeAnInstanceOf(SomeLibModule);
            }));
            it('should use set up precompile components', testing_1.inject([core_1.ComponentFactoryResolver], function (resolver) {
                matchers_1.expect(resolver.resolveComponentFactory(CompUsingModuleDirectiveAndPipe).componentType)
                    .toBe(CompUsingModuleDirectiveAndPipe);
            }));
        });
        describe('per test modules', function () {
            it('should use set up providers', testing_1.withModule(function () { return moduleConfig; }).inject([FancyService], function (service) {
                matchers_1.expect(service.value).toEqual('real value');
            }));
            it('should use set up directives and pipes', testing_1.withModule(function () { return moduleConfig; })
                .inject([testing_1.TestComponentBuilder], function (tcb) {
                var compFixture = tcb.createSync(CompUsingModuleDirectiveAndPipe);
                var el = compFixture.debugElement;
                compFixture.detectChanges();
                matchers_1.expect(el.children[0].properties['title']).toBe('transformed someValue');
            }));
            it('should use set up library modules', testing_1.withModule(function () { return moduleConfig; }).inject([SomeLibModule], function (libModule) {
                matchers_1.expect(libModule).toBeAnInstanceOf(SomeLibModule);
            }));
            it('should use set up precompile components', testing_1.withModule(function () { return moduleConfig; })
                .inject([core_1.ComponentFactoryResolver], function (resolver) {
                matchers_1.expect(resolver.resolveComponentFactory(CompUsingModuleDirectiveAndPipe).componentType)
                    .toBe(CompUsingModuleDirectiveAndPipe);
            }));
        });
        describe('precompile components with template url', function () {
            beforeEach(testing_1.async(function () {
                testing_1.configureModule({ declarations: [CompWithUrlTemplate], precompile: [CompWithUrlTemplate] });
                testing_1.doAsyncPrecompilation();
            }));
            it('should allow to createSync components with templateUrl after async precompilation', testing_1.inject([testing_1.TestComponentBuilder], function (builder) {
                var fixture = builder.createSync(CompWithUrlTemplate);
                matchers_1.expect(fixture.nativeElement).toHaveText('from external template\n');
            }));
        });
        describe('setting up the compiler', function () {
            describe('providers', function () {
                beforeEach(function () {
                    var xhrGet = jasmine.createSpy('xhrGet').and.returnValue(Promise.resolve('Hello world!'));
                    testing_1.configureCompiler({ providers: [{ provide: compiler_1.XHR, useValue: { get: xhrGet } }] });
                });
                it('should use set up providers', testing_1.fakeAsync(testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                    var compFixture = tcb.createFakeAsync(CompWithUrlTemplate);
                    matchers_1.expect(compFixture.nativeElement).toHaveText('Hello world!');
                })));
            });
            describe('useJit true', function () {
                beforeEach(function () { testing_1.configureCompiler({ useJit: true }); });
                it('should set the value into CompilerConfig', testing_1.inject([compiler_1.CompilerConfig], function (config) {
                    matchers_1.expect(config.useJit).toBe(true);
                }));
            });
            describe('useJit false', function () {
                beforeEach(function () { testing_1.configureCompiler({ useJit: false }); });
                it('should set the value into CompilerConfig', testing_1.inject([compiler_1.CompilerConfig], function (config) {
                    matchers_1.expect(config.useJit).toBe(false);
                }));
            });
        });
    });
    describe('errors', function () {
        var originalJasmineIt;
        var originalJasmineBeforeEach;
        var patchJasmineIt = function () {
            var deferred = promise_1.PromiseWrapper.completer();
            originalJasmineIt = jasmine.getEnv().it;
            jasmine.getEnv().it = function (description, fn /** TODO #9100 */) {
                var done = function () { deferred.resolve(); };
                done.fail = function (err /** TODO #9100 */) { deferred.reject(err); };
                fn(done);
                return null;
            };
            return deferred.promise;
        };
        var restoreJasmineIt = function () { jasmine.getEnv().it = originalJasmineIt; };
        var patchJasmineBeforeEach = function () {
            var deferred = promise_1.PromiseWrapper.completer();
            originalJasmineBeforeEach = jasmine.getEnv().beforeEach;
            jasmine.getEnv().beforeEach = function (fn) {
                var done = function () { deferred.resolve(); };
                done.fail = function (err /** TODO #9100 */) { deferred.reject(err); };
                fn(done);
                return null;
            };
            return deferred.promise;
        };
        var restoreJasmineBeforeEach = function () { jasmine.getEnv().beforeEach = originalJasmineBeforeEach; };
        it('should fail when an asynchronous error is thrown', function (done /** TODO #9100 */) {
            var itPromise = patchJasmineIt();
            var barError = new Error('bar');
            it('throws an async error', testing_1.async(testing_1.inject([], function () { setTimeout(function () { throw barError; }, 0); })));
            itPromise.then(function () { done.fail('Expected test to fail, but it did not'); }, function (err) {
                matchers_1.expect(err).toEqual(barError);
                done();
            });
            restoreJasmineIt();
        });
        it('should fail when a returned promise is rejected', function (done /** TODO #9100 */) {
            var itPromise = patchJasmineIt();
            it('should fail with an error from a promise', testing_1.async(testing_1.inject([], function () {
                var deferred = promise_1.PromiseWrapper.completer();
                var p = deferred.promise.then(function () { matchers_1.expect(1).toEqual(2); });
                deferred.reject('baz');
                return p;
            })));
            itPromise.then(function () { done.fail('Expected test to fail, but it did not'); }, function (err) {
                matchers_1.expect(err.message).toEqual('Uncaught (in promise): baz');
                done();
            });
            restoreJasmineIt();
        });
        describe('using addProviders', function () {
            beforeEach(function () { return testing_1.addProviders([{ provide: FancyService, useValue: new FancyService() }]); });
            beforeEach(testing_1.inject([FancyService], function (service /** TODO #9100 */) {
                matchers_1.expect(service.value).toEqual('real value');
            }));
            describe('nested addProviders', function () {
                it('should fail when the injector has already been used', function () {
                    patchJasmineBeforeEach();
                    matchers_1.expect(function () {
                        beforeEach(function () { return testing_1.addProviders([{ provide: FancyService, useValue: new FancyService() }]); });
                    })
                        .toThrowError('addProviders can\'t be called after the injector has been already created for this test. ' +
                        'This is most likely because you\'ve already used the injector to inject a beforeEach or the ' +
                        'current `it` function.');
                    restoreJasmineBeforeEach();
                });
            });
        });
        describe('precompile', function () {
            var xhrGet;
            beforeEach(function () {
                xhrGet = jasmine.createSpy('xhrGet').and.returnValue(Promise.resolve('Hello world!'));
                testing_1.configureCompiler({ providers: [{ provide: compiler_1.XHR, useValue: { get: xhrGet } }] });
            });
            it('should report an error for precompile components with templateUrl which never call doAsyncPrecompile', function () {
                var itPromise = patchJasmineIt();
                matchers_1.expect(function () {
                    return it('should fail', testing_1.withModule(function () {
                        return {
                            declarations: [CompWithUrlTemplate],
                            precompile: [CompWithUrlTemplate]
                        };
                    })
                        .inject([core_1.ComponentFactoryResolver], function (resolver) {
                        matchers_1.expect(resolver.resolveComponentFactory(CompWithUrlTemplate)
                            .componentType)
                            .toBe(CompWithUrlTemplate);
                    }));
                })
                    .toThrowError(("This test module precompiles the component " + lang_1.stringify(CompWithUrlTemplate) + " which is using a \"templateUrl\", but precompilation was never done. ") +
                    'Please call "doAsyncPrecompilation" before "inject".');
                restoreJasmineIt();
            });
        });
    });
    describe('test component builder', function () {
        it('should instantiate a component with valid DOM', testing_1.async(testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            tcb.createAsync(ChildComp).then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.debugElement.nativeElement).toHaveText('Original Child');
            });
        })));
        it('should allow changing members of the component', testing_1.async(testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            tcb.createAsync(MyIfComp).then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.debugElement.nativeElement).toHaveText('MyIf()');
                componentFixture.debugElement.componentInstance.showMore = true;
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.debugElement.nativeElement).toHaveText('MyIf(More)');
            });
        })));
        it('should override a template', testing_1.async(testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            tcb.overrideTemplate(MockChildComp, '<span>Mock</span>')
                .createAsync(MockChildComp)
                .then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.debugElement.nativeElement).toHaveText('Mock');
            });
        })));
        it('should override a view', testing_1.async(testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            tcb.overrideView(ChildComp, new core_1.ViewMetadata({ template: '<span>Modified {{childBinding}}</span>' }))
                .createAsync(ChildComp)
                .then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.debugElement.nativeElement).toHaveText('Modified Child');
            });
        })));
        it('should override component dependencies', testing_1.async(testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            tcb.overrideDirective(ParentComp, ChildComp, MockChildComp)
                .createAsync(ParentComp)
                .then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.debugElement.nativeElement).toHaveText('Parent(Mock)');
            });
        })));
        it('should override child component\'s dependencies', testing_1.async(testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            tcb.overrideDirective(ParentComp, ChildComp, ChildWithChildComp)
                .overrideDirective(ChildWithChildComp, ChildChildComp, MockChildChildComp)
                .createAsync(ParentComp)
                .then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.debugElement.nativeElement)
                    .toHaveText('Parent(Original Child(ChildChild Mock))');
            });
        })));
        it('should override a provider', testing_1.async(testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            tcb.overrideProviders(TestProvidersComp, [{ provide: FancyService, useClass: MockFancyService }])
                .createAsync(TestProvidersComp)
                .then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.debugElement.nativeElement)
                    .toHaveText('injected value: mocked out value');
            });
        })));
        it('should override a viewProvider', testing_1.async(testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            tcb.overrideViewProviders(TestViewProvidersComp, [{ provide: FancyService, useClass: MockFancyService }])
                .createAsync(TestViewProvidersComp)
                .then(function (componentFixture) {
                componentFixture.detectChanges();
                matchers_1.expect(componentFixture.debugElement.nativeElement)
                    .toHaveText('injected value: mocked out value');
            });
        })));
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZ19wdWJsaWNfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci90ZXN0L3Rlc3RpbmdfcHVibGljX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBR0gseUJBQWtDLG1CQUFtQixDQUFDLENBQUE7QUFDdEQscUJBQXVILGVBQWUsQ0FBQyxDQUFBO0FBQ3ZJLHdCQUF1Syx1QkFBdUIsQ0FBQyxDQUFBO0FBQy9MLHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBRWxFLHFCQUF3Qiw0QkFBNEIsQ0FBQyxDQUFBO0FBQ3JELHdCQUE2QiwrQkFBK0IsQ0FBQyxDQUFBO0FBQzdEO0lBRUU7UUFBZ0IsSUFBSSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUM7SUFBQyxDQUFDO0lBQ2hELGtCQUFrQjtJQUNYLG9CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSx3Q0FBd0MsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFDLEVBQUcsRUFBRTtRQUMzSCxFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCx3QkFBYyxHQUEyRCxFQUMvRSxDQUFDO0lBQ0YsZ0JBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQUNEO0lBQUE7SUFNQSxDQUFDO0lBTEQsa0JBQWtCO0lBQ1gsd0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFDLEVBQUcsRUFBRTtRQUN0RixFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixv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