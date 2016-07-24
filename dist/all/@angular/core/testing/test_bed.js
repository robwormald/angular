/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var index_1 = require('../index');
var collection_1 = require('../src/facade/collection');
var exceptions_1 = require('../src/facade/exceptions');
var lang_1 = require('../src/facade/lang');
var async_test_completer_1 = require('./async_test_completer');
var UNDEFINED = new Object();
/**
 * @experimental
 */
var TestBed = (function () {
    function TestBed() {
        this._instantiated = false;
        this._compiler = null;
        this._moduleRef = null;
        this._ngModuleFactory = null;
        this._compilerProviders = [];
        this._compilerUseJit = true;
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._precompile = [];
        this.platform = null;
        this.ngModule = null;
    }
    TestBed.prototype.reset = function () {
        this._compiler = null;
        this._moduleRef = null;
        this._ngModuleFactory = null;
        this._compilerProviders = [];
        this._compilerUseJit = true;
        this._providers = [];
        this._declarations = [];
        this._imports = [];
        this._precompile = [];
        this._instantiated = false;
    };
    TestBed.prototype.configureCompiler = function (config) {
        if (this._instantiated) {
            throw new exceptions_1.BaseException('Cannot add configuration after test injector is instantiated');
        }
        if (config.providers) {
            this._compilerProviders = collection_1.ListWrapper.concat(this._compilerProviders, config.providers);
        }
        if (config.useJit !== undefined) {
            this._compilerUseJit = config.useJit;
        }
    };
    TestBed.prototype.configureModule = function (moduleDef) {
        if (this._instantiated) {
            throw new exceptions_1.BaseException('Cannot add configuration after test injector is instantiated');
        }
        if (moduleDef.providers) {
            this._providers = collection_1.ListWrapper.concat(this._providers, moduleDef.providers);
        }
        if (moduleDef.declarations) {
            this._declarations = collection_1.ListWrapper.concat(this._declarations, moduleDef.declarations);
        }
        if (moduleDef.imports) {
            this._imports = collection_1.ListWrapper.concat(this._imports, moduleDef.imports);
        }
        if (moduleDef.precompile) {
            this._precompile = collection_1.ListWrapper.concat(this._precompile, moduleDef.precompile);
        }
    };
    TestBed.prototype.createAsyncNgModuleFactory = function () {
        var _this = this;
        if (this._instantiated) {
            throw new exceptions_1.BaseException('Cannot run precompilation when the test NgModule has already been instantiated. ' +
                'Make sure you are not using `inject` before `doAsyncPrecompilation`.');
        }
        if (this._ngModuleFactory) {
            return Promise.resolve(this._ngModuleFactory);
        }
        var moduleType = this._createCompilerAndModule();
        return this._compiler.compileNgModuleAsync(moduleType).then(function (ngModuleFactory) {
            _this._ngModuleFactory = ngModuleFactory;
            return ngModuleFactory;
        });
    };
    TestBed.prototype.initTestNgModule = function () {
        if (this._instantiated) {
            return;
        }
        if (this._ngModuleFactory) {
            this._createFromModuleFactory(this._ngModuleFactory);
        }
        else {
            var moduleType = this._createCompilerAndModule();
            this._createFromModuleFactory(this._compiler.compileNgModuleSync(moduleType));
        }
    };
    /**
     * @internal
     */
    TestBed.prototype._createInjectorAsync = function () {
        var _this = this;
        if (this._instantiated) {
            return Promise.resolve(this);
        }
        var ngModule = this._createCompilerAndModule();
        return this._compiler.compileNgModuleAsync(ngModule).then(function (ngModuleFactory) { return _this._createFromModuleFactory(ngModuleFactory); });
    };
    TestBed.prototype._createCompilerAndModule = function () {
        var providers = this._providers.concat([{ provide: TestBed, useValue: this }]);
        var declarations = this._declarations;
        var imports = [this.ngModule, this._imports];
        var precompile = this._precompile;
        var DynamicTestModule = (function () {
            function DynamicTestModule() {
            }
            /** @nocollapse */
            DynamicTestModule.decorators = [
                { type: index_1.NgModule, args: [{
                            providers: providers,
                            declarations: declarations,
                            imports: imports,
                            precompile: precompile
                        },] },
            ];
            return DynamicTestModule;
        }());
        var compilerFactory = this.platform.injector.get(index_1.CompilerFactory);
        this._compiler = compilerFactory.createCompiler({ providers: this._compilerProviders, useJit: this._compilerUseJit });
        return DynamicTestModule;
    };
    TestBed.prototype._createFromModuleFactory = function (ngModuleFactory) {
        this._moduleRef = ngModuleFactory.create(this.platform.injector);
        this._instantiated = true;
        return this;
    };
    TestBed.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = index_1.Injector.THROW_IF_NOT_FOUND; }
        if (!this._instantiated) {
            throw new exceptions_1.BaseException('Illegal state: The test bed\'s injector has not yet been created. Call initTestNgModule first!');
        }
        if (token === TestBed) {
            return this;
        }
        // Tests can inject things from the ng module and from the compiler,
        // but the ng module can't inject things from the compiler and vice versa.
        var result = this._moduleRef.injector.get(token, UNDEFINED);
        return result === UNDEFINED ? this._compiler.injector.get(token, notFoundValue) : result;
    };
    TestBed.prototype.execute = function (tokens, fn) {
        var _this = this;
        if (!this._instantiated) {
            throw new exceptions_1.BaseException('Illegal state: The test bed\'s injector has not yet been created. Call initTestNgModule first!');
        }
        var params = tokens.map(function (t) { return _this.get(t); });
        return lang_1.FunctionWrapper.apply(fn, params);
    };
    return TestBed;
}());
exports.TestBed = TestBed;
var _testBed = null;
/**
 * @experimental
 */
function getTestBed() {
    if (_testBed == null) {
        _testBed = new TestBed();
    }
    return _testBed;
}
exports.getTestBed = getTestBed;
/**
 * @deprecated use getTestBed instead.
 */
function getTestInjector() {
    return getTestBed();
}
exports.getTestInjector = getTestInjector;
/**
 * Set the providers that the test injector should use. These should be providers
 * common to every test in the suite.
 *
 * This may only be called once, to set up the common providers for the current test
 * suite on the current platform. If you absolutely need to change the providers,
 * first use `resetBaseTestProviders`.
 *
 * Test modules and platforms for individual platforms are available from
 * 'angular2/platform/testing/<platform_name>'.
 *
 * @deprecated Use initTestEnvironment instead
 */
function setBaseTestProviders(platformProviders, applicationProviders) {
    if (platformProviders.length === 1 && typeof platformProviders[0] === 'function') {
        platformProviders[0](applicationProviders);
    }
    else {
        throw new Error("setBaseTestProviders is deprecated and only supports platformProviders that are predefined by Angular. Use 'initTestEnvironment' instead.");
    }
}
exports.setBaseTestProviders = setBaseTestProviders;
/**
 * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
 * angular module. These are common to every test in the suite.
 *
 * This may only be called once, to set up the common providers for the current test
 * suite on the current platform. If you absolutely need to change the providers,
 * first use `resetTestEnvironment`.
 *
 * Test modules and platforms for individual platforms are available from
 * 'angular2/platform/testing/<platform_name>'.
 *
 * @experimental
 */
function initTestEnvironment(ngModule, platform) {
    var testBed = getTestBed();
    if (testBed.platform || testBed.ngModule) {
        throw new exceptions_1.BaseException('Cannot set base providers because it has already been called');
    }
    testBed.platform = platform;
    testBed.ngModule = ngModule;
    return testBed;
}
exports.initTestEnvironment = initTestEnvironment;
/**
 * Reset the providers for the test injector.
 *
 * @deprecated Use resetTestEnvironment instead.
 */
function resetBaseTestProviders() {
    resetTestEnvironment();
}
exports.resetBaseTestProviders = resetBaseTestProviders;
/**
 * Reset the providers for the test injector.
 *
 * @experimental
 */
function resetTestEnvironment() {
    var testBed = getTestBed();
    testBed.platform = null;
    testBed.ngModule = null;
    testBed.reset();
}
exports.resetTestEnvironment = resetTestEnvironment;
/**
 * Run asynchronous precompilation for the test's NgModule. It is necessary to call this function
 * if your test is using an NgModule which has precompiled components that require an asynchronous
 * call, such as an XHR. Should be called once before the test case.
 *
 * @experimental
 */
function doAsyncPrecompilation() {
    var testBed = getTestBed();
    return testBed.createAsyncNgModuleFactory();
}
exports.doAsyncPrecompilation = doAsyncPrecompilation;
/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass], (object) => {
 *   object.doSomething();
 *   expect(...);
 * })
 * ```
 *
 * Notes:
 * - inject is currently a function because of some Traceur limitation the syntax should
 * eventually
 *   becomes `it('...', @Inject (object: AClass, async: AsyncTestCompleter) => { ... });`
 *
 * @stable
 */
function inject(tokens, fn) {
    var testBed = getTestBed();
    if (tokens.indexOf(async_test_completer_1.AsyncTestCompleter) >= 0) {
        return function () {
            // Return an async test method that returns a Promise if AsyncTestCompleter is one of the
            // injected tokens.
            return testBed._createInjectorAsync().then(function () {
                var completer = testBed.get(async_test_completer_1.AsyncTestCompleter);
                testBed.execute(tokens, fn);
                return completer.promise;
            });
        };
    }
    else {
        return function () {
            try {
                testBed.initTestNgModule();
            }
            catch (e) {
                if (e instanceof index_1.ComponentStillLoadingError) {
                    throw new Error(("This test module precompiles the component " + lang_1.stringify(e.compType) + " which is using a \"templateUrl\", but precompilation was never done. ") +
                        "Please call \"doAsyncPrecompilation\" before \"inject\".");
                }
                else {
                    throw e;
                }
            }
            return testBed.execute(tokens, fn);
        };
    }
}
exports.inject = inject;
/**
 * @experimental
 */
var InjectSetupWrapper = (function () {
    function InjectSetupWrapper(_moduleDef) {
        this._moduleDef = _moduleDef;
    }
    InjectSetupWrapper.prototype._addModule = function () {
        var moduleDef = this._moduleDef();
        if (moduleDef) {
            getTestBed().configureModule(moduleDef);
        }
    };
    InjectSetupWrapper.prototype.inject = function (tokens, fn) {
        var _this = this;
        return function () {
            _this._addModule();
            return inject(tokens, fn)();
        };
    };
    return InjectSetupWrapper;
}());
exports.InjectSetupWrapper = InjectSetupWrapper;
/**
 * @experimental
 */
function withProviders(providers) {
    return new InjectSetupWrapper(function () { {
        return { providers: providers() };
    } });
}
exports.withProviders = withProviders;
/**
 * @experimental
 */
function withModule(moduleDef) {
    return new InjectSetupWrapper(moduleDef);
}
exports.withModule = withModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9iZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvdGVzdGluZy90ZXN0X2JlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsc0JBQXNPLFVBQVUsQ0FBQyxDQUFBO0FBQ2pQLDJCQUEwQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3JELDJCQUE0QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3ZELHFCQUFrRSxvQkFBb0IsQ0FBQyxDQUFBO0FBRXZGLHFDQUFpQyx3QkFBd0IsQ0FBQyxDQUFBO0FBRTFELElBQU0sU0FBUyxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFL0I7O0dBRUc7QUFDSDtJQUFBO1FBQ1Usa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFFL0IsY0FBUyxHQUFhLElBQUksQ0FBQztRQUMzQixlQUFVLEdBQXFCLElBQUksQ0FBQztRQUNwQyxxQkFBZ0IsR0FBeUIsSUFBSSxDQUFDO1FBRTlDLHVCQUFrQixHQUFtQyxFQUFFLENBQUM7UUFDeEQsb0JBQWUsR0FBWSxJQUFJLENBQUM7UUFFaEMsZUFBVSxHQUFtQyxFQUFFLENBQUM7UUFDaEQsa0JBQWEsR0FBMEIsRUFBRSxDQUFDO1FBQzFDLGFBQVEsR0FBMEIsRUFBRSxDQUFDO1FBQ3JDLGdCQUFXLEdBQTBCLEVBQUUsQ0FBQztRQWVoRCxhQUFRLEdBQWdCLElBQUksQ0FBQztRQUU3QixhQUFRLEdBQVMsSUFBSSxDQUFDO0lBZ0l4QixDQUFDO0lBL0lDLHVCQUFLLEdBQUw7UUFDRSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxJ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