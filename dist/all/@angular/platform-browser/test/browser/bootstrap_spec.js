/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var compiler_1 = require('@angular/compiler');
var core_1 = require('@angular/core');
var application_ref_1 = require('@angular/core/src/application_ref');
var console_1 = require('@angular/core/src/console');
var testability_1 = require('@angular/core/src/testability/testability');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var platform_browser_1 = require('@angular/platform-browser');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var dom_tokens_1 = require('@angular/platform-browser/src/dom/dom_tokens');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var async_1 = require('../../src/facade/async');
var lang_1 = require('../../src/facade/lang');
var HelloRootCmp = (function () {
    function HelloRootCmp() {
        this.greeting = 'hello';
    }
    /** @nocollapse */
    HelloRootCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'hello-app', template: '{{greeting}} world!' },] },
    ];
    /** @nocollapse */
    HelloRootCmp.ctorParameters = [];
    return HelloRootCmp;
}());
var HelloRootCmpContent = (function () {
    function HelloRootCmpContent() {
    }
    /** @nocollapse */
    HelloRootCmpContent.decorators = [
        { type: core_1.Component, args: [{ selector: 'hello-app', template: 'before: <ng-content></ng-content> after: done' },] },
    ];
    /** @nocollapse */
    HelloRootCmpContent.ctorParameters = [];
    return HelloRootCmpContent;
}());
var HelloRootCmp2 = (function () {
    function HelloRootCmp2() {
        this.greeting = 'hello';
    }
    /** @nocollapse */
    HelloRootCmp2.decorators = [
        { type: core_1.Component, args: [{ selector: 'hello-app-2', template: '{{greeting}} world, again!' },] },
    ];
    /** @nocollapse */
    HelloRootCmp2.ctorParameters = [];
    return HelloRootCmp2;
}());
var HelloRootCmp3 = (function () {
    function HelloRootCmp3(appBinding /** TODO #9100 */) {
        this.appBinding = appBinding;
    }
    /** @nocollapse */
    HelloRootCmp3.decorators = [
        { type: core_1.Component, args: [{ selector: 'hello-app', template: '' },] },
    ];
    /** @nocollapse */
    HelloRootCmp3.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: ['appBinding',] },] },
    ];
    return HelloRootCmp3;
}());
var HelloRootCmp4 = (function () {
    function HelloRootCmp4(appRef) {
        this.appRef = appRef;
    }
    /** @nocollapse */
    HelloRootCmp4.decorators = [
        { type: core_1.Component, args: [{ selector: 'hello-app', template: '' },] },
    ];
    /** @nocollapse */
    HelloRootCmp4.ctorParameters = [
        { type: application_ref_1.ApplicationRef, decorators: [{ type: core_1.Inject, args: [application_ref_1.ApplicationRef,] },] },
    ];
    return HelloRootCmp4;
}());
var HelloRootMissingTemplate = (function () {
    function HelloRootMissingTemplate() {
    }
    /** @nocollapse */
    HelloRootMissingTemplate.decorators = [
        { type: core_1.Component, args: [{ selector: 'hello-app' },] },
    ];
    return HelloRootMissingTemplate;
}());
var HelloRootDirectiveIsNotCmp = (function () {
    function HelloRootDirectiveIsNotCmp() {
    }
    /** @nocollapse */
    HelloRootDirectiveIsNotCmp.decorators = [
        { type: core_1.Directive, args: [{ selector: 'hello-app' },] },
    ];
    return HelloRootDirectiveIsNotCmp;
}());
var HelloOnDestroyTickCmp = (function () {
    function HelloOnDestroyTickCmp(appRef) {
        this.appRef = appRef;
    }
    HelloOnDestroyTickCmp.prototype.ngOnDestroy = function () { this.appRef.tick(); };
    /** @nocollapse */
    HelloOnDestroyTickCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'hello-app', template: '' },] },
    ];
    /** @nocollapse */
    HelloOnDestroyTickCmp.ctorParameters = [
        { type: application_ref_1.ApplicationRef, decorators: [{ type: core_1.Inject, args: [application_ref_1.ApplicationRef,] },] },
    ];
    return HelloOnDestroyTickCmp;
}());
var HelloUrlCmp = (function () {
    function HelloUrlCmp() {
        this.greeting = 'hello';
    }
    /** @nocollapse */
    HelloUrlCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'hello-app', templateUrl: './sometemplate.html' },] },
    ];
    return HelloUrlCmp;
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
var HelloCmpUsingPlatformDirectiveAndPipe = (function () {
    function HelloCmpUsingPlatformDirectiveAndPipe() {
        this.show = false;
    }
    /** @nocollapse */
    HelloCmpUsingPlatformDirectiveAndPipe.decorators = [
        { type: core_1.Component, args: [{ selector: 'hello-app', template: "<div  [someDir]=\"'someValue' | somePipe\"></div>" },] },
    ];
    return HelloCmpUsingPlatformDirectiveAndPipe;
}());
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
        this.warnings = [];
    }
    DummyConsole.prototype.log = function (message) { };
    DummyConsole.prototype.warn = function (message) { this.warnings.push(message); };
    return DummyConsole;
}());
function main() {
    var fakeDoc /** TODO #9100 */, el /** TODO #9100 */, el2 /** TODO #9100 */, testProviders /** TODO #9100 */, lightDom;
    testing_internal_1.describe('bootstrap factory method', function () {
        var compilerConsole;
        testing_internal_1.beforeEachProviders(function () { return [testing_internal_1.Log]; });
        testing_internal_1.beforeEach(function () {
            application_ref_1.disposePlatform();
            fakeDoc = dom_adapter_1.getDOM().createHtmlDocument();
            el = dom_adapter_1.getDOM().createElement('hello-app', fakeDoc);
            el2 = dom_adapter_1.getDOM().createElement('hello-app-2', fakeDoc);
            lightDom = dom_adapter_1.getDOM().createElement('light-dom-el', fakeDoc);
            dom_adapter_1.getDOM().appendChild(fakeDoc.body, el);
            dom_adapter_1.getDOM().appendChild(fakeDoc.body, el2);
            dom_adapter_1.getDOM().appendChild(el, lightDom);
            dom_adapter_1.getDOM().setText(lightDom, 'loading');
            compilerConsole = new DummyConsole();
            testProviders =
                [{ provide: dom_tokens_1.DOCUMENT, useValue: fakeDoc }, { provide: console_1.Console, useValue: compilerConsole }];
        });
        testing_internal_1.afterEach(application_ref_1.disposePlatform);
        testing_internal_1.it('should throw if bootstrapped Directive is not a Component', function () {
            matchers_1.expect(function () { return platform_browser_dynamic_1.bootstrap(HelloRootDirectiveIsNotCmp); })
                .toThrowError("Could not compile '" + lang_1.stringify(HelloRootDirectiveIsNotCmp) + "' because it is not a component.");
        });
        testing_internal_1.it('should throw if no element is found', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var logger = new _ArrayLogger();
            var exceptionHandler = new core_1.ExceptionHandler(logger, false);
            var refPromise = platform_browser_dynamic_1.bootstrap(HelloRootCmp, [{ provide: core_1.ExceptionHandler, useValue: exceptionHandler }]);
            async_1.PromiseWrapper.then(refPromise, null, function (reason) {
                matchers_1.expect(reason.message).toContain('The selector "hello-app" did not match any elements');
                async.done();
                return null;
            });
        }));
        if (dom_adapter_1.getDOM().supportsDOMEvents()) {
            testing_internal_1.it('should forward the error to promise when bootstrap fails', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                // Skip for dart since it causes a confusing error message in console when test passes.
                var logger = new _ArrayLogger();
                var exceptionHandler = new core_1.ExceptionHandler(logger, false);
                var refPromise = platform_browser_dynamic_1.bootstrap(HelloRootCmp, [{ provide: core_1.ExceptionHandler, useValue: exceptionHandler }]);
                async_1.PromiseWrapper.then(refPromise, null, function (reason) {
                    matchers_1.expect(reason.message)
                        .toContain('The selector "hello-app" did not match any elements');
                    async.done();
                });
            }));
            testing_internal_1.it('should invoke the default exception handler when bootstrap fails', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var logger = new _ArrayLogger();
                var exceptionHandler = new core_1.ExceptionHandler(logger, false);
                var refPromise = platform_browser_dynamic_1.bootstrap(HelloRootCmp, [{ provide: core_1.ExceptionHandler, useValue: exceptionHandler }]);
                async_1.PromiseWrapper.then(refPromise, null, function (reason) {
                    matchers_1.expect(logger.res.join(''))
                        .toContain('The selector "hello-app" did not match any elements');
                    async.done();
                    return null;
                });
            }));
        }
        testing_internal_1.it('should create an injector promise', function () {
            var refPromise = platform_browser_dynamic_1.bootstrap(HelloRootCmp, testProviders);
            matchers_1.expect(refPromise).not.toBe(null);
        });
        testing_internal_1.it('should display hello world', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var refPromise = platform_browser_dynamic_1.bootstrap(HelloRootCmp, testProviders);
            refPromise.then(function (ref) {
                matchers_1.expect(el).toHaveText('hello world!');
                async.done();
            });
        }));
        testing_internal_1.it('should support multiple calls to bootstrap', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var refPromise1 = platform_browser_dynamic_1.bootstrap(HelloRootCmp, testProviders);
            var refPromise2 = platform_browser_dynamic_1.bootstrap(HelloRootCmp2, testProviders);
            async_1.PromiseWrapper.all([refPromise1, refPromise2]).then(function (refs) {
                matchers_1.expect(el).toHaveText('hello world!');
                matchers_1.expect(el2).toHaveText('hello world, again!');
                async.done();
            });
        }));
        testing_internal_1.it('should not crash if change detection is invoked when the root component is disposed', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            platform_browser_dynamic_1.bootstrap(HelloOnDestroyTickCmp, testProviders).then(function (ref) {
                matchers_1.expect(function () { return ref.destroy(); }).not.toThrow();
                async.done();
            });
        }));
        testing_internal_1.it('should unregister change detectors when components are disposed', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            platform_browser_dynamic_1.bootstrap(HelloRootCmp, testProviders).then(function (ref) {
                var appRef = ref.injector.get(application_ref_1.ApplicationRef);
                ref.destroy();
                matchers_1.expect(function () { return appRef.tick(); }).not.toThrow();
                async.done();
            });
        }));
        testing_internal_1.it('should make the provided bindings available to the application component', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var refPromise = platform_browser_dynamic_1.bootstrap(HelloRootCmp3, [testProviders, { provide: 'appBinding', useValue: 'BoundValue' }]);
            refPromise.then(function (ref) {
                matchers_1.expect(ref.instance.appBinding).toEqual('BoundValue');
                async.done();
            });
        }));
        testing_internal_1.it('should avoid cyclic dependencies when root component requires Lifecycle through DI', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var refPromise = platform_browser_dynamic_1.bootstrap(HelloRootCmp4, testProviders);
            refPromise.then(function (ref) {
                matchers_1.expect(ref.instance.appRef).toBe(ref.injector.get(application_ref_1.ApplicationRef));
                async.done();
            });
        }));
        testing_internal_1.it('should run platform initializers', testing_internal_1.inject([testing_internal_1.Log, testing_internal_1.AsyncTestCompleter], function (log, async) {
            var p = core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate([
                platform_browser_dynamic_1.BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
                { provide: core_1.PLATFORM_INITIALIZER, useValue: log.fn('platform_init1'), multi: true },
                { provide: core_1.PLATFORM_INITIALIZER, useValue: log.fn('platform_init2'), multi: true }
            ]));
            var SomeModule = (function () {
                function SomeModule() {
                }
                /** @nocollapse */
                SomeModule.decorators = [
                    { type: core_1.NgModule, args: [{
                                imports: [platform_browser_1.BrowserModule],
                                providers: [
                                    { provide: core_1.APP_INITIALIZER, useValue: log.fn('app_init1'), multi: true },
                                    { provide: core_1.APP_INITIALIZER, useValue: log.fn('app_init2'), multi: true }
                                ]
                            },] },
                ];
                return SomeModule;
            }());
            matchers_1.expect(log.result()).toEqual('platform_init1; platform_init2');
            log.clear();
            core_1.bootstrapModule(SomeModule, p).then(function () {
                matchers_1.expect(log.result()).toEqual('app_init1; app_init2');
                async.done();
            });
        }));
        testing_internal_1.it('should register each application with the testability registry', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var refPromise1 = platform_browser_dynamic_1.bootstrap(HelloRootCmp, testProviders);
            var refPromise2 = platform_browser_dynamic_1.bootstrap(HelloRootCmp2, testProviders);
            async_1.PromiseWrapper.all([refPromise1, refPromise2]).then(function (refs) {
                var registry = refs[0].injector.get(testability_1.TestabilityRegistry);
                var testabilities = [refs[0].injector.get(testability_1.Testability), refs[1].injector.get(testability_1.Testability)];
                async_1.PromiseWrapper.all(testabilities).then(function (testabilities) {
                    matchers_1.expect(registry.findTestabilityInTree(el)).toEqual(testabilities[0]);
                    matchers_1.expect(registry.findTestabilityInTree(el2)).toEqual(testabilities[1]);
                    async.done();
                });
            });
        }));
        // Note: This will soon be deprecated as bootstrap creates a separate injector for the compiler,
        // i.e. such providers needs to go into that injecotr (when calling `browserCompiler`);
        testing_internal_1.it('should still allow to provide a custom xhr via the regular providers', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var spyXhr = { get: function (url) { return Promise.resolve('{{greeting}} world!'); } };
            platform_browser_dynamic_1.bootstrap(HelloUrlCmp, testProviders.concat([
                { provide: compiler_1.XHR, useValue: spyXhr }
            ])).then(function (compRef) {
                matchers_1.expect(el).toHaveText('hello world!');
                matchers_1.expect(compilerConsole.warnings).toEqual([
                    'Passing XHR as regular provider is deprecated. Pass the provider via "compilerOptions" instead.'
                ]);
                async.done();
            });
        }));
        // Note: This will soon be deprecated as bootstrap creates a separate injector for the compiler,
        // i.e. such providers needs to go into that injecotr (when calling `browserCompiler`);
        testing_internal_1.it('should still allow to provide platform directives/pipes via the regular providers', testing_internal_1.inject([console_1.Console, testing_internal_1.AsyncTestCompleter], function (console, async) {
            platform_browser_dynamic_1.bootstrap(HelloCmpUsingPlatformDirectiveAndPipe, testProviders.concat([
                { provide: core_1.PLATFORM_DIRECTIVES, useValue: [SomeDirective] },
                { provide: core_1.PLATFORM_PIPES, useValue: [SomePipe] }
            ])).then(function (compRef) {
                var compFixture = new testing_1.ComponentFixture(compRef, null, null);
                compFixture.detectChanges();
                matchers_1.expect(compFixture.debugElement.children[0].properties['title'])
                    .toBe('transformed someValue');
                matchers_1.expect(compilerConsole.warnings).toEqual([
                    ("The PLATFORM_DIRECTIVES provider and CompilerConfig.platformDirectives is deprecated. Add the directives to an NgModule instead! (Directives: " + lang_1.stringify(SomeDirective) + ")"),
                    ("The PLATFORM_PIPES provider and CompilerConfig.platformPipes is deprecated. Add the pipes to an NgModule instead! (Pipes: " + lang_1.stringify(SomePipe) + ")")
                ]);
                async.done();
            });
        }));
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9vdHN0cmFwX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdC9icm93c2VyL2Jvb3RzdHJhcF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFHSCx5QkFBa0IsbUJBQW1CLENBQUMsQ0FBQTtBQUN0QyxxQkFBeU8sZUFBZSxDQUFDLENBQUE7QUFDelAsZ0NBQThDLG1DQUFtQyxDQUFDLENBQUE7QUFDbEYsd0JBQXNCLDJCQUEyQixDQUFDLENBQUE7QUFFbEQsNEJBQStDLDJDQUEyQyxDQUFDLENBQUE7QUFDM0Ysd0JBQStCLHVCQUF1QixDQUFDLENBQUE7QUFDdkQsaUNBQXdILHdDQUF3QyxDQUFDLENBQUE7QUFDakssaUNBQTRCLDJCQUEyQixDQUFDLENBQUE7QUFDeEQseUNBQTRELG1DQUFtQyxDQUFDLENBQUE7QUFDaEcsNEJBQXFCLCtDQUErQyxDQUFDLENBQUE7QUFDckUsMkJBQXVCLDhDQUE4QyxDQUFDLENBQUE7QUFDdEUseUJBQXFCLDRDQUE0QyxDQUFDLENBQUE7QUFFbEUsc0JBQTZCLHdCQUF3QixDQUFDLENBQUE7QUFDdEQscUJBQXdCLHVCQUF1QixDQUFDLENBQUE7QUFDaEQ7SUFFRTtRQUFnQixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztJQUFDLENBQUM7SUFDNUMsa0JBQWtCO0lBQ1gsdUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFDLEVBQUcsRUFBRTtLQUN0RixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsMkJBQWMsR0FBMkQsRUFDL0UsQ0FBQztJQUNGLG1CQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFDRDtJQUNFO0lBQWUsQ0FB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