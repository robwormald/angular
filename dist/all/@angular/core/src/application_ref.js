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
var async_1 = require('../src/facade/async');
var collection_1 = require('../src/facade/collection');
var exceptions_1 = require('../src/facade/exceptions');
var lang_1 = require('../src/facade/lang');
var application_tokens_1 = require('./application_tokens');
var console_1 = require('./console');
var di_1 = require('./di');
var compiler_1 = require('./linker/compiler');
var component_factory_1 = require('./linker/component_factory');
var component_factory_resolver_1 = require('./linker/component_factory_resolver');
var profile_1 = require('./profile/profile');
var testability_1 = require('./testability/testability');
var ng_zone_1 = require('./zone/ng_zone');
var _devMode = true;
var _runModeLocked = false;
var _platform;
var _inPlatformCreate = false;
/**
 * Disable Angular's development mode, which turns off assertions and other
 * checks within the framework.
 *
 * One important assertion this disables verifies that a change detection pass
 * does not result in additional changes to any bindings (also known as
 * unidirectional data flow).
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function enableProdMode() {
    if (_runModeLocked) {
        // Cannot use BaseException as that ends up importing from facade/lang.
        throw new exceptions_1.BaseException('Cannot enable prod mode after platform setup.');
    }
    _devMode = false;
}
exports.enableProdMode = enableProdMode;
/**
 * Locks the run mode of Angular. After this has been called,
 * it can't be changed any more. I.e. `isDevMode()` will always
 * return the same value.
 *
 * @deprecated This is a noop now. {@link isDevMode} automatically locks the run mode on first call.
 */
function lockRunMode() {
    console.warn('lockRunMode() is deprecated and not needed any more.');
}
exports.lockRunMode = lockRunMode;
/**
 * Returns whether Angular is in development mode. After called once,
 * the value is locked and won't change any more.
 *
 * By default, this is true, unless a user calls `enableProdMode` before calling this.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function isDevMode() {
    _runModeLocked = true;
    return _devMode;
}
exports.isDevMode = isDevMode;
/**
 * Creates a platform.
 * Platforms have to be eagerly created via this function.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function createPlatform(injector) {
    if (_inPlatformCreate) {
        throw new exceptions_1.BaseException('Already creating a platform...');
    }
    if (lang_1.isPresent(_platform) && !_platform.disposed) {
        throw new exceptions_1.BaseException('There can be only one platform. Destroy the previous one to create a new one.');
    }
    _inPlatformCreate = true;
    try {
        _platform = injector.get(PlatformRef);
    }
    finally {
        _inPlatformCreate = false;
    }
    return _platform;
}
exports.createPlatform = createPlatform;
/**
 * Creates a fatory for a platform
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function createPlatformFactory(name, providers) {
    var marker = new di_1.OpaqueToken("Platform: " + name);
    return function (extraProviders) {
        if (extraProviders === void 0) { extraProviders = []; }
        if (!getPlatform()) {
            createPlatform(di_1.ReflectiveInjector.resolveAndCreate(providers.concat(extraProviders).concat({ provide: marker, useValue: true })));
        }
        return assertPlatform(marker);
    };
}
exports.createPlatformFactory = createPlatformFactory;
/**
 * Checks that there currently is a platform
 * which contains the given token as a provider.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function assertPlatform(requiredToken) {
    var platform = getPlatform();
    if (lang_1.isBlank(platform)) {
        throw new exceptions_1.BaseException('No platform exists!');
    }
    if (lang_1.isPresent(platform) && lang_1.isBlank(platform.injector.get(requiredToken, null))) {
        throw new exceptions_1.BaseException('A platform with a different configuration has been created. Please destroy it first.');
    }
    return platform;
}
exports.assertPlatform = assertPlatform;
/**
 * Dispose the existing platform.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function disposePlatform() {
    if (lang_1.isPresent(_platform) && !_platform.disposed) {
        _platform.dispose();
    }
}
exports.disposePlatform = disposePlatform;
/**
 * Returns the current platform.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function getPlatform() {
    return lang_1.isPresent(_platform) && !_platform.disposed ? _platform : null;
}
exports.getPlatform = getPlatform;
/**
 * Creates an instance of an `@NgModule` for the given platform
 * for offline compilation.
 *
 * ## Simple Example
 *
 * ```typescript
 * my_module.ts:
 *
 * @NgModule({
 *   imports: [BrowserModule]
 * })
 * class MyModule {}
 *
 * main.ts:
 * import {MyModuleNgFactory} from './my_module.ngfactory';
 * import {bootstrapModuleFactory} from '@angular/core';
 * import {browserPlatform} from '@angular/platform-browser';
 *
 * let moduleRef = bootstrapModuleFactory(MyModuleNgFactory, browserPlatform());
 * ```
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
function bootstrapModuleFactory(moduleFactory, platform) {
    // Note: We need to create the NgZone _before_ we instantiate the module,
    // as instantiating the module creates some providers eagerly.
    // So we create a mini parent injector that just contains the new NgZone and
    // pass that as parent to the NgModuleFactory.
    var ngZone = new ng_zone_1.NgZone({ enableLongStackTrace: isDevMode() });
    var ngZoneInjector = di_1.ReflectiveInjector.resolveAndCreate([{ provide: ng_zone_1.NgZone, useValue: ngZone }], platform.injector);
    return ngZone.run(function () { return moduleFactory.create(ngZoneInjector); });
}
exports.bootstrapModuleFactory = bootstrapModuleFactory;
/**
 * Creates an instance of an `@NgModule` for a given platform using the given runtime compiler.
 *
 * ## Simple Example
 *
 * ```typescript
 * @NgModule({
 *   imports: [BrowserModule]
 * })
 * class MyModule {}
 *
 * let moduleRef = bootstrapModule(MyModule, browserPlatform());
 * ```
 * @stable
 */
function bootstrapModule(moduleType, platform, compilerOptions) {
    if (compilerOptions === void 0) { compilerOptions = {}; }
    var compilerFactory = platform.injector.get(compiler_1.CompilerFactory);
    var compiler = compilerFactory.createCompiler(compilerOptions);
    return compiler.compileNgModuleAsync(moduleType)
        .then(function (moduleFactory) { return bootstrapModuleFactory(moduleFactory, platform); })
        .then(function (moduleRef) {
        var appRef = moduleRef.injector.get(ApplicationRef);
        return appRef.waitForAsyncInitializers().then(function () { return moduleRef; });
    });
}
exports.bootstrapModule = bootstrapModule;
/**
 * Shortcut for ApplicationRef.bootstrap.
 * Requires a platform to be created first.
 *
 * @deprecated Use {@link bootstrapModuleFactory} instead.
 */
function coreBootstrap(componentFactory, injector) {
    throw new Error('coreBootstrap is deprecated. Use bootstrapModuleFactory instead.');
}
exports.coreBootstrap = coreBootstrap;
/**
 * Resolves the componentFactory for the given component,
 * waits for asynchronous initializers and bootstraps the component.
 * Requires a platform to be created first.
 *
 * @deprecated Use {@link bootstrapModule} instead.
 */
function coreLoadAndBootstrap(componentType, injector) {
    throw new Error('coreLoadAndBootstrap is deprecated. Use bootstrapModule instead.');
}
exports.coreLoadAndBootstrap = coreLoadAndBootstrap;
/**
 * The Angular platform is the entry point for Angular on a web page. Each page
 * has exactly one platform, and services (such as reflection) which are common
 * to every Angular application running on the page are bound in its scope.
 *
 * A page's platform is initialized implicitly when {@link bootstrap}() is called, or
 * explicitly by calling {@link createPlatform}().
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
var PlatformRef = (function () {
    function PlatformRef() {
    }
    Object.defineProperty(PlatformRef.prototype, "injector", {
        /**
         * Retrieve the platform {@link Injector}, which is the parent injector for
         * every Angular application on the page and provides singleton providers.
         */
        get: function () { throw exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(PlatformRef.prototype, "disposed", {
        get: function () { throw exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return PlatformRef;
}());
exports.PlatformRef = PlatformRef;
var PlatformRef_ = (function (_super) {
    __extends(PlatformRef_, _super);
    function PlatformRef_(_injector) {
        _super.call(this);
        this._injector = _injector;
        /** @internal */
        this._applications = [];
        /** @internal */
        this._disposeListeners = [];
        this._disposed = false;
        if (!_inPlatformCreate) {
            throw new exceptions_1.BaseException('Platforms have to be created via `createPlatform`!');
        }
        var inits = _injector.get(application_tokens_1.PLATFORM_INITIALIZER, null);
        if (lang_1.isPresent(inits))
            inits.forEach(function (init) { return init(); });
    }
    PlatformRef_.prototype.registerDisposeListener = function (dispose) { this._disposeListeners.push(dispose); };
    Object.defineProperty(PlatformRef_.prototype, "injector", {
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlatformRef_.prototype, "disposed", {
        get: function () { return this._disposed; },
        enumerable: true,
        configurable: true
    });
    PlatformRef_.prototype.addApplication = function (appRef) { this._applications.push(appRef); };
    PlatformRef_.prototype.dispose = function () {
        collection_1.ListWrapper.clone(this._applications).forEach(function (app) { return app.dispose(); });
        this._disposeListeners.forEach(function (dispose) { return dispose(); });
        this._disposed = true;
    };
    /** @internal */
    PlatformRef_.prototype._applicationDisposed = function (app) { collection_1.ListWrapper.remove(this._applications, app); };
    /** @nocollapse */
    PlatformRef_.decorators = [
        { type: di_1.Injectable },
    ];
    /** @nocollapse */
    PlatformRef_.ctorParameters = [
        { type: di_1.Injector, },
    ];
    return PlatformRef_;
}(PlatformRef));
exports.PlatformRef_ = PlatformRef_;
/**
 * A reference to an Angular application running on a page.
 *
 * For more about Angular applications, see the documentation for {@link bootstrap}.
 *
 * @experimental APIs related to application bootstrap are currently under review.
 */
var ApplicationRef = (function () {
    function ApplicationRef() {
    }
    Object.defineProperty(ApplicationRef.prototype, "injector", {
        /**
         * Retrieve the application {@link Injector}.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ApplicationRef.prototype, "zone", {
        /**
         * Retrieve the application {@link NgZone}.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ApplicationRef.prototype, "componentTypes", {
        /**
         * Get a list of component types registered to this application.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    ;
    return ApplicationRef;
}());
exports.ApplicationRef = ApplicationRef;
var ApplicationRef_ = (function (_super) {
    __extends(ApplicationRef_, _super);
    function ApplicationRef_(_platform, _zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _testabilityRegistry, _testability, inits) {
        var _this = this;
        _super.call(this);
        this._platform = _platform;
        this._zone = _zone;
        this._console = _console;
        this._injector = _injector;
        this._exceptionHandler = _exceptionHandler;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._testabilityRegistry = _testabilityRegistry;
        this._testability = _testability;
        /** @internal */
        this._bootstrapListeners = [];
        /** @internal */
        this._disposeListeners = [];
        /** @internal */
        this._rootComponents = [];
        /** @internal */
        this._rootComponentTypes = [];
        /** @internal */
        this._changeDetectorRefs = [];
        /** @internal */
        this._runningTick = false;
        /** @internal */
        this._enforceNoNewChanges = false;
        this._enforceNoNewChanges = isDevMode();
        this._asyncInitDonePromise = this.run(function () {
            var asyncInitResults = [];
            var asyncInitDonePromise;
            if (lang_1.isPresent(inits)) {
                for (var i = 0; i < inits.length; i++) {
                    var initResult = inits[i]();
                    if (lang_1.isPromise(initResult)) {
                        asyncInitResults.push(initResult);
                    }
                }
            }
            if (asyncInitResults.length > 0) {
                asyncInitDonePromise =
                    async_1.PromiseWrapper.all(asyncInitResults).then(function (_) { return _this._asyncInitDone = true; });
                _this._asyncInitDone = false;
            }
            else {
                _this._asyncInitDone = true;
                asyncInitDonePromise = async_1.PromiseWrapper.resolve(true);
            }
            return asyncInitDonePromise;
        });
        async_1.ObservableWrapper.subscribe(this._zone.onError, function (error) {
            _this._exceptionHandler.call(error.error, error.stackTrace);
        });
        async_1.ObservableWrapper.subscribe(this._zone.onMicrotaskEmpty, function (_) { _this._zone.run(function () { _this.tick(); }); });
    }
    ApplicationRef_.prototype.registerBootstrapListener = function (listener) {
        this._bootstrapListeners.push(listener);
    };
    ApplicationRef_.prototype.registerDisposeListener = function (dispose) { this._disposeListeners.push(dispose); };
    ApplicationRef_.prototype.registerChangeDetector = function (changeDetector) {
        this._changeDetectorRefs.push(changeDetector);
    };
    ApplicationRef_.prototype.unregisterChangeDetector = function (changeDetector) {
        collection_1.ListWrapper.remove(this._changeDetectorRefs, changeDetector);
    };
    ApplicationRef_.prototype.waitForAsyncInitializers = function () { return this._asyncInitDonePromise; };
    ApplicationRef_.prototype.run = function (callback) {
        var _this = this;
        var result;
        // Note: Don't use zone.runGuarded as we want to know about
        // the thrown exception!
        // Note: the completer needs to be created outside
        // of `zone.run` as Dart swallows rejected promises
        // via the onError callback of the promise.
        var completer = async_1.PromiseWrapper.completer();
        this._zone.run(function () {
            try {
                result = callback();
                if (lang_1.isPromise(result)) {
                    async_1.PromiseWrapper.then(result, function (ref) { completer.resolve(ref); }, function (err, stackTrace) {
                        completer.reject(err, stackTrace);
                        _this._exceptionHandler.call(err, stackTrace);
                    });
                }
            }
            catch (e) {
                _this._exceptionHandler.call(e, e.stack);
                throw e;
            }
        });
        return lang_1.isPromise(result) ? completer.promise : result;
    };
    ApplicationRef_.prototype.bootstrap = function (componentOrFactory) {
        var _this = this;
        if (!this._asyncInitDone) {
            throw new exceptions_1.BaseException('Cannot bootstrap as there are still asynchronous initializers running. Wait for them using waitForAsyncInitializers().');
        }
        return this.run(function () {
            var componentFactory;
            if (componentOrFactory instanceof component_factory_1.ComponentFactory) {
                componentFactory = componentOrFactory;
            }
            else {
                componentFactory =
                    _this._componentFactoryResolver.resolveComponentFactory(componentOrFactory);
            }
            _this._rootComponentTypes.push(componentFactory.componentType);
            var compRef = componentFactory.create(_this._injector, [], componentFactory.selector);
            compRef.onDestroy(function () { _this._unloadComponent(compRef); });
            var testability = compRef.injector.get(testability_1.Testability, null);
            if (lang_1.isPresent(testability)) {
                compRef.injector.get(testability_1.TestabilityRegistry)
                    .registerApplication(compRef.location.nativeElement, testability);
            }
            _this._loadComponent(compRef);
            if (isDevMode()) {
                var prodDescription = lang_1.IS_DART ? 'Production mode is disabled in Dart.' :
                    'Call enableProdMode() to enable the production mode.';
                _this._console.log("Angular 2 is running in the development mode. " + prodDescription);
            }
            return compRef;
        });
    };
    /** @internal */
    ApplicationRef_.prototype._loadComponent = function (componentRef) {
        this._changeDetectorRefs.push(componentRef.changeDetectorRef);
        this.tick();
        this._rootComponents.push(componentRef);
        this._bootstrapListeners.forEach(function (listener) { return listener(componentRef); });
    };
    /** @internal */
    ApplicationRef_.prototype._unloadComponent = function (componentRef) {
        if (!collection_1.ListWrapper.contains(this._rootComponents, componentRef)) {
            return;
        }
        this.unregisterChangeDetector(componentRef.changeDetectorRef);
        collection_1.ListWrapper.remove(this._rootComponents, componentRef);
    };
    Object.defineProperty(ApplicationRef_.prototype, "injector", {
        get: function () { return this._injector; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationRef_.prototype, "zone", {
        get: function () { return this._zone; },
        enumerable: true,
        configurable: true
    });
    ApplicationRef_.prototype.tick = function () {
        if (this._runningTick) {
            throw new exceptions_1.BaseException('ApplicationRef.tick is called recursively');
        }
        var s = ApplicationRef_._tickScope();
        try {
            this._runningTick = true;
            this._changeDetectorRefs.forEach(function (detector) { return detector.detectChanges(); });
            if (this._enforceNoNewChanges) {
                this._changeDetectorRefs.forEach(function (detector) { return detector.checkNoChanges(); });
            }
        }
        finally {
            this._runningTick = false;
            profile_1.wtfLeave(s);
        }
    };
    ApplicationRef_.prototype.dispose = function () {
        // TODO(alxhub): Dispose of the NgZone.
        collection_1.ListWrapper.clone(this._rootComponents).forEach(function (ref) { return ref.destroy(); });
        this._disposeListeners.forEach(function (dispose) { return dispose(); });
        this._platform._applicationDisposed(this);
    };
    Object.defineProperty(ApplicationRef_.prototype, "componentTypes", {
        get: function () { return this._rootComponentTypes; },
        enumerable: true,
        configurable: true
    });
    /** @internal */
    ApplicationRef_._tickScope = profile_1.wtfCreateScope('ApplicationRef#tick()');
    /** @nocollapse */
    ApplicationRef_.decorators = [
        { type: di_1.Injectable },
    ];
    /** @nocollapse */
    ApplicationRef_.ctorParameters = [
        { type: PlatformRef_, },
        { type: ng_zone_1.NgZone, },
        { type: console_1.Console, },
        { type: di_1.Injector, },
        { type: exceptions_1.ExceptionHandler, },
        { type: component_factory_resolver_1.ComponentFactoryResolver, },
        { type: testability_1.TestabilityRegistry, decorators: [{ type: di_1.Optional },] },
        { type: testability_1.Testability, decorators: [{ type: di_1.Optional },] },
        { type: Array, decorators: [{ type: di_1.Optional }, { type: di_1.Inject, args: [application_tokens_1.APP_INITIALIZER,] },] },
    ];
    return ApplicationRef_;
}(ApplicationRef));
exports.ApplicationRef_ = ApplicationRef_;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25fcmVmLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3NyYy9hcHBsaWNhdGlvbl9yZWYudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsc0JBQWdELHFCQUFxQixDQUFDLENBQUE7QUFDdEUsMkJBQTBCLDBCQUEwQixDQUFDLENBQUE7QUFDckQsMkJBQTZELDBCQUEwQixDQUFDLENBQUE7QUFDeEYscUJBQXlFLG9CQUFvQixDQUFDLENBQUE7QUFFOUYsbUNBQW9ELHNCQUFzQixDQUFDLENBQUE7QUFFM0Usd0JBQXNCLFdBQVcsQ0FBQyxDQUFBO0FBQ2xDLG1CQUE0RyxNQUFNLENBQUMsQ0FBQTtBQUNuSCx5QkFBeUQsbUJBQW1CLENBQUMsQ0FBQTtBQUM3RSxrQ0FBNkMsNEJBQTRCLENBQUMsQ0FBQTtBQUMxRSwyQ0FBdUMscUNBQXFDLENBQUMsQ0FBQTtBQUc3RSx3QkFBbUQsbUJBQW1CLENBQUMsQ0FBQTtBQUN2RSw0QkFBK0MsMkJBQTJCLENBQUMsQ0FBQTtBQUMzRSx3QkFBa0MsZ0JBQWdCLENBQUMsQ0FBQTtBQUVuRCxJQUFJLFFBQVEsR0FBWSxJQUFJLENBQUM7QUFDN0IsSUFBSSxjQUFjLEdBQVksS0FBSyxDQUFDO0FBQ3BDLElBQUksU0FBc0IsQ0FBQztBQUMzQixJQUFJLGlCQUFpQixHQUFZLEtBQUssQ0FBQztBQUV2Qzs7Ozs7Ozs7O0dBU0c7QUFDSDtJQUNFLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsdUVBQXVFO1FBQ3ZFLE1BQU0sSUFBSSwwQkFBYSxDQUFDLCtDQUErQyxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUNELFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDbkIsQ0FBQztBQU5lLHNCQUFjLGlCQU03QixDQUFBO0FBRUQ7Ozs7OztHQU1HO0FBQ0g7SUFDRSxPQUFPLENB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