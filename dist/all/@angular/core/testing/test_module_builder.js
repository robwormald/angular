/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var index_1 = require('../index');
var async_1 = require('../src/facade/async');
var lang_1 = require('../src/facade/lang');
var fake_async_1 = require('./fake_async');
var TestModuleBuilder = (function () {
    function TestModuleBuilder(_injector) {
        this._injector = _injector;
    }
    /**
     * Overrides a module's {@link NgModuleMetadata}.
     */
    TestModuleBuilder.prototype.overrideNgModule = function (moduleType, metadata) {
        throw new Error('overrideNgModule is not supported in this implementation of TestComponentBuilder.');
    };
    TestModuleBuilder.prototype.createFromFactory = function (ngModuleFactory) {
        return ngModuleFactory.create(this._injector);
    };
    /**
     * Builds and returns a NgModuleRef.
     */
    TestModuleBuilder.prototype.createAsync = function (moduleType) {
        var _this = this;
        var compiler = this._injector.get(index_1.Compiler);
        return compiler.compileNgModuleAsync(moduleType)
            .then(function (moduleFactory) { return _this.createFromFactory(moduleFactory); });
    };
    /**
     * Builds and returns a NgModuleRef.
     */
    TestModuleBuilder.prototype.createFakeAsync = function (moduleType) {
        var result;
        var error;
        async_1.PromiseWrapper.then(this.createAsync(moduleType), function (_result) { result = _result; }, function (_error) { error = _error; });
        fake_async_1.tick();
        if (lang_1.isPresent(error)) {
            throw error;
        }
        return result;
    };
    /**
     * Builds and returns a NgModuleRef.
     */
    TestModuleBuilder.prototype.createSync = function (moduleType) {
        var compiler = this._injector.get(index_1.Compiler);
        return this.createFromFactory(compiler.compileNgModuleSync(moduleType));
    };
    /** @nocollapse */
    TestModuleBuilder.decorators = [
        { type: index_1.Injectable },
    ];
    /** @nocollapse */
    TestModuleBuilder.ctorParameters = [
        { type: index_1.Injector, },
    ];
    return TestModuleBuilder;
}());
exports.TestModuleBuilder = TestModuleBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9tb2R1bGVfYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0aW5nL3Rlc3RfbW9kdWxlX2J1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHNCQUE2RixVQUFVLENBQUMsQ0FBQTtBQUN4RyxzQkFBNkIscUJBQXFCLENBQUMsQ0FBQTtBQUNuRCxxQkFBNEMsb0JBQW9CLENBQUMsQ0FBQTtBQUVqRSwyQkFBbUIsY0FBYyxDQUFDLENBQUE7QUFDbEM7SUFDRSwyQkFBc0IsU0FBbUI7UUFBbkIsY0FBUyxHQUFULFNBQVMsQ0FBVTtJQUFHLENBQUM7SUFFN0M7O09BRUc7SUFDSCw0Q0FBZ0IsR0FBaEIsVUFBaUIsVUFBZ0IsRUFBRSxRQUEwQjtRQUMzRCxNQUFNLElBQUksS0FBSyxDQUNYLG1GQUFtRixDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVTLDZDQUFpQixHQUEzQixVQUErQixlQUFtQztRQUNoRSxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsdUNBQVcsR0FBWCxVQUFlLFVBQTJCO1FBQTFDLGlCQUlDO1FBSEMsSUFBTSxRQUFRLEdBQWEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQVEsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDO2FBQzNDLElBQUksQ0FBQyxVQUFDLGFBQWEsSUFBSyxPQUFBLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRDs7T0FFRztJQUNILDJDQUFlLEdBQWYsVUFBbUIsVUFBMkI7UUFDNUMsSUFBSSxNQUFzQixDQUFDO1FBQzNCLElBQUksS0FBVSxDQUFDO1FBQ2Ysc0JBQWMsQ0FBQyxJQUFJLENBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRSxVQUFDLE9BQU8sSUFBTyxNQUFNLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUNoRSxVQUFDLE1BQU0sSUFBTyxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsaUJBQUksRUFBRSxDQUFDO1FBQ1AsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxzQ0FBVSxHQUFWLFVBQWMsVUFBMkI7UUFDdkMsSUFBTSxRQUFRLEdBQWEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQVEsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUNILGtCQUFrQjtJQUNYLDRCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGtCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGdDQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLGdCQUFRLEdBQUc7S0FDakIsQ0FBQztJQUNGLHdCQUFDO0FBQUQsQ0FBQyxBQXZERCxJQXVEQztBQXZEWSx5QkFBaUIsb0JBdUQ3QixDQUFBIn0=