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
var component_fixture_1 = require('./component_fixture');
var fake_async_1 = require('./fake_async');
/**
 * An abstract class for inserting the root test component element in a platform independent way.
 *
 * @experimental
 */
var TestComponentRenderer = (function () {
    function TestComponentRenderer() {
    }
    TestComponentRenderer.prototype.insertRootElement = function (rootElementId) { };
    return TestComponentRenderer;
}());
exports.TestComponentRenderer = TestComponentRenderer;
/**
 * @experimental
 */
exports.ComponentFixtureAutoDetect = new index_1.OpaqueToken('ComponentFixtureAutoDetect');
/**
 * @experimental
 */
exports.ComponentFixtureNoNgZone = new index_1.OpaqueToken('ComponentFixtureNoNgZone');
var _nextRootElementId = 0;
var TestComponentBuilder = (function () {
    function TestComponentBuilder(_injector) {
        this._injector = _injector;
    }
    /**
     * Overrides only the html of a {@link ComponentMetadata}.
     * All the other properties of the component's {@link ViewMetadata} are preserved.
     */
    TestComponentBuilder.prototype.overrideTemplate = function (componentType, template) {
        throw new Error('overrideTemplate is not supported in this implementation of TestComponentBuilder.');
    };
    /**
     * Overrides a component's {@link ViewMetadata}.
     */
    TestComponentBuilder.prototype.overrideView = function (componentType, view) {
        throw new Error('overrideView is not supported in this implementation of TestComponentBuilder.');
    };
    /**
     * Overrides the directives from the component {@link ViewMetadata}.
     */
    TestComponentBuilder.prototype.overrideDirective = function (componentType, from, to) {
        throw new Error('overrideDirective is not supported in this implementation of TestComponentBuilder.');
    };
    /**
     * Overrides one or more injectables configured via `providers` metadata property of a directive
     * or
     * component.
     * Very useful when certain providers need to be mocked out.
     *
     * The providers specified via this method are appended to the existing `providers` causing the
     * duplicated providers to
     * be overridden.
     */
    TestComponentBuilder.prototype.overrideProviders = function (type, providers) {
        throw new Error('overrideProviders is not supported in this implementation of TestComponentBuilder.');
    };
    /**
     * Overrides one or more injectables configured via `providers` metadata property of a directive
     * or
     * component.
     * Very useful when certain providers need to be mocked out.
     *
     * The providers specified via this method are appended to the existing `providers` causing the
     * duplicated providers to
     * be overridden.
     */
    TestComponentBuilder.prototype.overrideViewProviders = function (type, providers) {
        throw new Error('overrideViewProviders is not supported in this implementation of TestComponentBuilder.');
    };
    TestComponentBuilder.prototype.overrideAnimations = function (componentType, animations) {
        throw new Error('overrideAnimations is not supported in this implementation of TestComponentBuilder.');
    };
    TestComponentBuilder.prototype.createFromFactory = function (ngZone, componentFactory) {
        var rootElId = "root" + _nextRootElementId++;
        var testComponentRenderer = this._injector.get(TestComponentRenderer);
        testComponentRenderer.insertRootElement(rootElId);
        var componentRef = componentFactory.create(this._injector, [], "#" + rootElId);
        var autoDetect = this._injector.get(exports.ComponentFixtureAutoDetect, false);
        return new component_fixture_1.ComponentFixture(componentRef, ngZone, autoDetect);
    };
    /**
     * Builds and returns a ComponentFixture.
     */
    TestComponentBuilder.prototype.createAsync = function (rootComponentType) {
        var _this = this;
        var noNgZone = lang_1.IS_DART || this._injector.get(exports.ComponentFixtureNoNgZone, false);
        var ngZone = noNgZone ? null : this._injector.get(index_1.NgZone, null);
        var compiler = this._injector.get(index_1.Compiler);
        var initComponent = function () {
            var promise = compiler.compileComponentAsync(rootComponentType);
            return promise.then(function (componentFactory) { return _this.createFromFactory(ngZone, componentFactory); });
        };
        return ngZone == null ? initComponent() : ngZone.run(initComponent);
    };
    TestComponentBuilder.prototype.createFakeAsync = function (rootComponentType) {
        var result;
        var error;
        async_1.PromiseWrapper.then(this.createAsync(rootComponentType), function (_result) { result = _result; }, function (_error) { error = _error; });
        fake_async_1.tick();
        if (lang_1.isPresent(error)) {
            throw error;
        }
        return result;
    };
    TestComponentBuilder.prototype.createSync = function (rootComponentType) {
        var _this = this;
        var noNgZone = lang_1.IS_DART || this._injector.get(exports.ComponentFixtureNoNgZone, false);
        var ngZone = noNgZone ? null : this._injector.get(index_1.NgZone, null);
        var compiler = this._injector.get(index_1.Compiler);
        var initComponent = function () {
            return _this.createFromFactory(ngZone, _this._injector.get(index_1.Compiler).compileComponentSync(rootComponentType));
        };
        return ngZone == null ? initComponent() : ngZone.run(initComponent);
    };
    /** @nocollapse */
    TestComponentBuilder.decorators = [
        { type: index_1.Injectable },
    ];
    /** @nocollapse */
    TestComponentBuilder.ctorParameters = [
        { type: index_1.Injector, },
    ];
    return TestComponentBuilder;
}());
exports.TestComponentBuilder = TestComponentBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9jb21wb25lbnRfYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0aW5nL3Rlc3RfY29tcG9uZW50X2J1aWxkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHNCQUEwSCxVQUFVLENBQUMsQ0FBQTtBQUNySSxzQkFBNkIscUJBQXFCLENBQUMsQ0FBQTtBQUNuRCxxQkFBcUQsb0JBQW9CLENBQUMsQ0FBQTtBQUUxRSxrQ0FBK0IscUJBQXFCLENBQUMsQ0FBQTtBQUNyRCwyQkFBbUIsY0FBYyxDQUFDLENBQUE7QUFJbEM7Ozs7R0FJRztBQUNIO0lBQUE7SUFFQSxDQUFDO0lBREMsaURBQWlCLEdBQWpCLFVBQWtCLGFBQXFCLElBQUcsQ0FBQztJQUM3Qyw0QkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksNkJBQXFCLHdCQUVqQyxDQUFBO0FBRUQ7O0dBRUc7QUFDUSxrQ0FBMEIsR0FBRyxJQUFJLG1CQUFXLENBQUMsNEJBQTRCLENBQUMsQ0FBQztBQUV0Rjs7R0FFRztBQUNRLGdDQUF3QixHQUFHLElBQUksbUJBQVcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBRWxGLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0FBQzNCO0lBQ0UsOEJBQXNCLFNBQW1CO1FBQW5CLGNBQVMsR0FBVCxTQUFTLENBQVU7SUFBRyxDQUFDO0lBRTdDOzs7T0FHRztJQUNILCtDQUFnQixHQUFoQixVQUFpQixhQUFtQixFQUFFLFFBQWdCO1FBQ3BELE1BQU0sSUFBSSxLQUFLLENBQ1gsbUZBQW1GLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBRUQ7O09BRUc7SUFDSCwyQ0FBWSxHQUFaLFVBQWEsYUFBbUIsRUFBRSxJQUFrQjtRQUNsRCxNQUFNLElBQUksS0FBSyxDQUNYLCtFQUErRSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVEOztPQUVH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