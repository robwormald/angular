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
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
/**
 * Indicates that a component is still being loaded in a synchronous compile.
 *
 * @stable
 */
var ComponentStillLoadingError = (function (_super) {
    __extends(ComponentStillLoadingError, _super);
    function ComponentStillLoadingError(compType) {
        _super.call(this, "Can't compile synchronously as " + lang_1.stringify(compType) + " is still being loaded!");
        this.compType = compType;
    }
    return ComponentStillLoadingError;
}(exceptions_1.BaseException));
exports.ComponentStillLoadingError = ComponentStillLoadingError;
/**
 * Low-level service for running the angular compiler duirng runtime
 * to create {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * Each `@NgModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the ng module for compilation
 * of components.
 * @stable
 */
var Compiler = (function () {
    function Compiler() {
    }
    Object.defineProperty(Compiler.prototype, "injector", {
        /**
         * Returns the injector with which the compiler has been created.
         *
         * @internal
         */
        get: function () {
            throw new exceptions_1.BaseException("Runtime compiler is not loaded. Tried to read the injector.");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Loads the template and styles of a component and returns the associated `ComponentFactory`.
     */
    Compiler.prototype.compileComponentAsync = function (component) {
        throw new exceptions_1.BaseException("Runtime compiler is not loaded. Tried to compile " + lang_1.stringify(component));
    };
    /**
     * Compiles the given component. All templates have to be either inline or compiled via
     * `compileComponentAsync` before. Otherwise throws a {@link ComponentStillLoadingError}.
     */
    Compiler.prototype.compileComponentSync = function (component) {
        throw new exceptions_1.BaseException("Runtime compiler is not loaded. Tried to compile " + lang_1.stringify(component));
    };
    /**
     * Compiles the given NgModule. All templates of the components listed in `precompile`
     * have to be either inline or compiled before via `compileComponentAsync` /
     * `compileNgModuleAsync`. Otherwise throws a {@link ComponentStillLoadingError}.
     */
    Compiler.prototype.compileNgModuleSync = function (moduleType, metadata) {
        if (metadata === void 0) { metadata = null; }
        throw new exceptions_1.BaseException("Runtime compiler is not loaded. Tried to compile " + lang_1.stringify(moduleType));
    };
    Compiler.prototype.compileNgModuleAsync = function (moduleType, metadata) {
        if (metadata === void 0) { metadata = null; }
        throw new exceptions_1.BaseException("Runtime compiler is not loaded. Tried to compile " + lang_1.stringify(moduleType));
    };
    /**
     * Clears all caches
     */
    Compiler.prototype.clearCache = function () { };
    /**
     * Clears the cache for the given component/ngModule.
     */
    Compiler.prototype.clearCacheFor = function (type) { };
    return Compiler;
}());
exports.Compiler = Compiler;
/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
var CompilerFactory = (function () {
    function CompilerFactory() {
    }
    CompilerFactory.mergeOptions = function (defaultOptions, newOptions) {
        if (defaultOptions === void 0) { defaultOptions = {}; }
        if (newOptions === void 0) { newOptions = {}; }
        return {
            useDebug: _firstDefined(newOptions.useDebug, defaultOptions.useDebug),
            useJit: _firstDefined(newOptions.useJit, defaultOptions.useJit),
            defaultEncapsulation: _firstDefined(newOptions.defaultEncapsulation, defaultOptions.defaultEncapsulation),
            providers: _mergeArrays(defaultOptions.providers, newOptions.providers)
        };
    };
    CompilerFactory.prototype.withDefaults = function (options) {
        if (options === void 0) { options = {}; }
        return new _DefaultApplyingCompilerFactory(this, options);
    };
    return CompilerFactory;
}());
exports.CompilerFactory = CompilerFactory;
var _DefaultApplyingCompilerFactory = (function (_super) {
    __extends(_DefaultApplyingCompilerFactory, _super);
    function _DefaultApplyingCompilerFactory(_delegate, _options) {
        _super.call(this);
        this._delegate = _delegate;
        this._options = _options;
    }
    _DefaultApplyingCompilerFactory.prototype.createCompiler = function (options) {
        if (options === void 0) { options = {}; }
        return this._delegate.createCompiler(CompilerFactory.mergeOptions(this._options, options));
    };
    return _DefaultApplyingCompilerFactory;
}(CompilerFactory));
function _firstDefined() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    for (var i = 0; i < args.length; i++) {
        if (args[i] !== undefined) {
            return args[i];
        }
    }
    return undefined;
}
function _mergeArrays() {
    var parts = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        parts[_i - 0] = arguments[_i];
    }
    var result = [];
    parts.forEach(function (part) { return result.push.apply(result, part); });
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvc3JjL2xpbmtlci9jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFHSCwyQkFBNEIsc0JBQXNCLENBQUMsQ0FBQTtBQUNuRCxxQkFBNEMsZ0JBQWdCLENBQUMsQ0FBQTtBQVM3RDs7OztHQUlHO0FBQ0g7SUFBZ0QsOENBQWE7SUFDM0Qsb0NBQW1CLFFBQWM7UUFDL0Isa0JBQU0sb0NBQWtDLGdCQUFTLENBQUMsUUFBUSxDQUFDLDRCQUF5QixDQUFDLENBQUM7UUFEckUsYUFBUSxHQUFSLFFBQVEsQ0FBTTtJQUVqQyxDQUFDO0lBQ0gsaUNBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBZ0QsMEJBQWEsR0FJNUQ7QUFKWSxrQ0FBMEIsNkJBSXRDLENBQUE7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSDtJQUFBO0lBbURBLENBQUM7SUE3Q0Msc0JBQUksOEJBQVE7UUFMWjs7OztXQUlHO2FBQ0g7WUFDRSxNQUFNLElBQUksMEJBQWEsQ0FBQyw2REFBNkQsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7OztPQUFBO0lBRUQ7O09BRUc7SUFDSCx3Q0FBcUIsR0FBckIsVUFBeUIsU0FBMEI7UUFDakQsTUFBTSxJQUFJLDBCQUFhLENBQ25CLHNEQUFvRCxnQkFBUyxDQUFDLFNBQVMsQ0FBRyxDQUFDLENBQUM7SUFDbEYsQ0FBQztJQUNEOzs7T0FHRztJQUNILHVDQUFvQixHQUFwQixVQUF3QixTQUEwQjtRQUNoRCxNQUFNLElBQUksMEJBQWEsQ0FDbkIsc0RBQW9ELGdCQUFTLENBQUMsU0FBUyxDQUFHLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBQ0Q7Ozs7T0FJRztJQUNILHNDQUFtQixHQUFuQixVQUF1QixVQUEyQixFQUFFLFFBQWlDO1FBQWpDLHdCQUFpQyxHQUFqQyxlQUFpQztRQUVuRixN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