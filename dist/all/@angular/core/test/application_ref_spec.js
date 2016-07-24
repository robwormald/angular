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
var compiler_1 = require('@angular/compiler');
var spies_1 = require('./spies');
var application_ref_1 = require('@angular/core/src/application_ref');
var core_1 = require('@angular/core');
var console_1 = require('@angular/core/src/console');
var exceptions_1 = require('../src/facade/exceptions');
var async_1 = require('../src/facade/async');
var component_factory_1 = require('@angular/core/src/linker/component_factory');
var exception_handler_1 = require('../src/facade/exception_handler');
function main() {
    testing_internal_1.describe('bootstrap', function () {
        var defaultPlatform;
        var errorLogger;
        var someCompFactory;
        var appProviders;
        testing_internal_1.beforeEach(function () {
            errorLogger = new _ArrayLogger();
            core_1.disposePlatform();
            defaultPlatform = core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate([
                core_1.PLATFORM_CORE_PROVIDERS, {
                    provide: core_1.CompilerFactory,
                    useValue: compiler_1.RUNTIME_COMPILER_FACTORY.withDefaults({ providers: [{ provide: compiler_1.XHR, useValue: null }] })
                }
            ]));
            someCompFactory =
                new _MockComponentFactory(new _MockComponentRef(core_1.ReflectiveInjector.resolveAndCreate([])));
            appProviders = [
                { provide: console_1.Console, useValue: new _MockConsole() },
                { provide: exception_handler_1.ExceptionHandler, useValue: new exception_handler_1.ExceptionHandler(errorLogger, false) },
                { provide: core_1.ComponentResolver, useValue: new _MockComponentResolver(someCompFactory) }
            ];
        });
        testing_internal_1.afterEach(function () { core_1.disposePlatform(); });
        function createApplication(providers, platform) {
            if (providers === void 0) { providers = []; }
            if (platform === void 0) { platform = defaultPlatform; }
            var MyModule = (function () {
                function MyModule() {
                }
                /** @nocollapse */
                MyModule.decorators = [
                    { type: core_1.NgModule, args: [{ providers: [appProviders, providers], imports: [core_1.ApplicationModule] },] },
                ];
                return MyModule;
            }());
            var compilerFactory = platform.injector.get(core_1.CompilerFactory);
            var compiler = compilerFactory.createCompiler();
            var appInjector = core_1.bootstrapModuleFactory(compiler.compileNgModuleSync(MyModule), platform).injector;
            return appInjector.get(application_ref_1.ApplicationRef);
        }
        testing_internal_1.describe('ApplicationRef', function () {
            testing_internal_1.it('should throw when reentering tick', function () {
                var cdRef = new spies_1.SpyChangeDetectorRef();
                var ref = createApplication();
                try {
                    ref.registerChangeDetector(cdRef);
                    cdRef.spy('detectChanges').andCallFake(function () { return ref.tick(); });
                    testing_internal_1.expect(function () { return ref.tick(); }).toThrowError('ApplicationRef.tick is called recursively');
                }
                finally {
                    ref.unregisterChangeDetector(cdRef);
                }
            });
            testing_internal_1.describe('run', function () {
                testing_internal_1.it('should rethrow errors even if the exceptionHandler is not rethrowing', function () {
                    var ref = createApplication();
                    testing_internal_1.expect(function () { return ref.run(function () { throw new exceptions_1.BaseException('Test'); }); }).toThrowError('Test');
                });
                testing_internal_1.it('should return a promise with rejected errors even if the exceptionHandler is not rethrowing', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, core_1.Injector], function (async, injector) {
                    var ref = createApplication();
                    var promise = ref.run(function () { return async_1.PromiseWrapper.reject('Test', null); });
                    async_1.PromiseWrapper.catchError(promise, function (e) {
                        testing_internal_1.expect(e).toEqual('Test');
                        async.done();
                    });
                }));
            });
        });
        testing_internal_1.describe('bootstrapModule', function () {
            testing_internal_1.it('should wait for asynchronous app initializers', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, core_1.Injector], function (async, injector) {
                var completer = async_1.PromiseWrapper.completer();
                var initializerDone = false;
                async_1.TimerWrapper.setTimeout(function () {
                    completer.resolve(true);
                    initializerDone = true;
                }, 1);
                var MyModule = (function () {
                    function MyModule() {
                    }
                    /** @nocollapse */
                    MyModule.decorators = [
                        { type: core_1.NgModule, args: [{
                                    providers: [
                                        appProviders,
                                        { provide: core_1.APP_INITIALIZER, useValue: function () { return completer.promise; }, multi: true }
                                    ],
                                    imports: [core_1.ApplicationModule]
                                },] },
                    ];
                    return MyModule;
                }());
                core_1.bootstrapModule(MyModule, defaultPlatform).then(function (_) {
                    testing_internal_1.expect(initializerDone).toBe(true);
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('ApplicationRef.bootstrap', function () {
            testing_internal_1.it('should throw if an APP_INITIIALIZER is not yet resolved', testing_internal_1.inject([core_1.Injector], function (injector) {
                var app = createApplication([{
                        provide: core_1.APP_INITIALIZER,
                        useValue: function () { return async_1.PromiseWrapper.completer().promise; },
                        multi: true
                    }]);
                testing_internal_1.expect(function () { return app.bootstrap(someCompFactory); })
                    .toThrowError('Cannot bootstrap as there are still asynchronous initializers running. Wait for them using waitForAsyncInitializers().');
            }));
        });
    });
}
exports.main = main;
var MyComp6 = (function () {
    function MyComp6() {
    }
    /** @nocollapse */
    MyComp6.decorators = [
        { type: core_1.Component, args: [{ selector: 'my-comp', template: '' },] },
    ];
    return MyComp6;
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
var _MockComponentFactory = (function (_super) {
    __extends(_MockComponentFactory, _super);
    function _MockComponentFactory(_compRef) {
        _super.call(this, null, null, null);
        this._compRef = _compRef;
    }
    _MockComponentFactory.prototype.create = function (injector, projectableNodes, rootSelectorOrNode) {
        if (projectableNodes === void 0) { projectableNodes = null; }
        if (rootSelectorOrNode === void 0) { rootSelectorOrNode = null; }
        return this._compRef;
    };
    return _MockComponentFactory;
}(component_factory_1.ComponentFactory));
var _MockComponentResolver = (function () {
    function _MockComponentResolver(_compFactory) {
        this._compFactory = _compFactory;
    }
    _MockComponentResolver.prototype.resolveComponent = function (type) {
        return async_1.PromiseWrapper.resolve(this._compFactory);
    };
    _MockComponentResolver.prototype.clearCache = function () { };
    return _MockComponentResolver;
}());
var _MockComponentRef = (function (_super) {
    __extends(_MockComponentRef, _super);
    function _MockComponentRef(_injector) {
        _super.call(this, null, null);
        this._injector = _injector;
    }
    Object.defineProperty(_MockComponentRef.prototype, "injector", {
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_MockComponentRef.prototype, "changeDetectorRef", {
        get: function () { return new spies_1.SpyChangeDetectorRef(); },
        enumerable: true,
        configurable: true
    });
    _MockComponentRef.prototype.onDestroy = function (cb) { };
    return _MockComponentRef;
}(component_factory_1.ComponentRef_));
var _MockConsole = (function () {
    function _MockConsole() {
    }
    _MockConsole.prototype.log = function (message) { };
    _MockConsole.prototype.warn = function (message) { };
    return _MockConsole;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25fcmVmX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvdGVzdC9hcHBsaWNhdGlvbl9yZWZfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCxpQ0FBNEcsd0NBQXdDLENBQUMsQ0FBQTtBQUNySix5QkFBNEMsbUJBQW1CLENBQUMsQ0FBQTtBQUNoRSxzQkFBbUMsU0FBUyxDQUFDLENBQUE7QUFDN0MsZ0NBQThDLG1DQUFtQyxDQUFDLENBQUE7QUFDbEYscUJBQTJTLGVBQWUsQ0FBQyxDQUFBO0FBQzNULHdCQUFzQiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ2xELDJCQUE0QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3ZELHNCQUE2RCxxQkFBcUIsQ0FBQyxDQUFBO0FBQ25GLGtDQUE0RCw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ3pHLGtDQUErQixpQ0FBaUMsQ0FBQyxDQUFBO0FBRWpFO0lBQ0UsMkJBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDcEIsSUFBSSxlQUE0QixDQUFDO1FBQ2pDLElBQUksV0FBeUIsQ0FBQztRQUM5QixJQUFJLGVBQXNDLENBQUM7UUFDM0MsSUFBSSxZQUFtQixDQUFDO1FBRXhCLDZCQUFVLENBQUM7WUFDVCxXQUFXLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztZQUNqQyxzQkFBZSxFQUFFLENBQUM7WUFDbEIsZUFBZSxHQUFHLHFCQUFjLENBQUMseUJBQWtCLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ25FLDhCQUF1QixFQUFFO29CQUN2QixPQUFPLEVBQUUsc0JBQWU7b0JBQ3hCLFFBQVEsRUFBRSxtQ0FBd0IsQ0FBQyxZQUFZLENBQzNDLEVBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsY0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUM7aUJBQ25EO2FBQ0Ys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