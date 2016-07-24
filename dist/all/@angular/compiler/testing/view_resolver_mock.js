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
var core_1 = require('@angular/core');
var index_1 = require('../index');
var collection_1 = require('../src/facade/collection');
var lang_1 = require('../src/facade/lang');
var MockViewResolver = (function (_super) {
    __extends(MockViewResolver, _super);
    function MockViewResolver(_injector) {
        _super.call(this);
        this._injector = _injector;
        /** @internal */
        this._views = new collection_1.Map();
        /** @internal */
        this._inlineTemplates = new collection_1.Map();
        /** @internal */
        this._animations = new collection_1.Map();
        /** @internal */
        this._directiveOverrides = new collection_1.Map();
    }
    Object.defineProperty(MockViewResolver.prototype, "_compiler", {
        get: function () { return this._injector.get(core_1.Compiler); },
        enumerable: true,
        configurable: true
    });
    MockViewResolver.prototype._clearCacheFor = function (component) { this._compiler.clearCacheFor(component); };
    /**
     * Overrides the {@link ViewMetadata} for a component.
     */
    MockViewResolver.prototype.setView = function (component, view) {
        this._views.set(component, view);
        this._clearCacheFor(component);
    };
    /**
     * Overrides the inline template for a component - other configuration remains unchanged.
     */
    MockViewResolver.prototype.setInlineTemplate = function (component, template) {
        this._inlineTemplates.set(component, template);
        this._clearCacheFor(component);
    };
    MockViewResolver.prototype.setAnimations = function (component, animations) {
        this._animations.set(component, animations);
        this._clearCacheFor(component);
    };
    /**
     * Overrides a directive from the component {@link ViewMetadata}.
     */
    MockViewResolver.prototype.overrideViewDirective = function (component, from, to) {
        var overrides = this._directiveOverrides.get(component);
        if (lang_1.isBlank(overrides)) {
            overrides = new collection_1.Map();
            this._directiveOverrides.set(component, overrides);
        }
        overrides.set(from, to);
        this._clearCacheFor(component);
    };
    /**
     * Returns the {@link ViewMetadata} for a component:
     * - Set the {@link ViewMetadata} to the overridden view when it exists or fallback to the default
     * `ViewResolver`,
     *   see `setView`.
     * - Override the directives, see `overrideViewDirective`.
     * - Override the @View definition, see `setInlineTemplate`.
     */
    MockViewResolver.prototype.resolve = function (component, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var view = this._views.get(component);
        if (lang_1.isBlank(view)) {
            view = _super.prototype.resolve.call(this, component, throwIfNotFound);
            if (!view) {
                return null;
            }
        }
        var directives = [];
        if (lang_1.isPresent(view.directives)) {
            flattenArray(view.directives, directives);
        }
        var animations = view.animations;
        var templateUrl = view.templateUrl;
        var overrides = this._directiveOverrides.get(component);
        var inlineAnimations = this._animations.get(component);
        if (lang_1.isPresent(inlineAnimations)) {
            animations = inlineAnimations;
        }
        var inlineTemplate = this._inlineTemplates.get(component);
        if (lang_1.isPresent(inlineTemplate)) {
            templateUrl = null;
        }
        else {
            inlineTemplate = view.template;
        }
        if (lang_1.isPresent(overrides) && lang_1.isPresent(view.directives)) {
            overrides.forEach(function (to, from) {
                var srcIndex = directives.indexOf(from);
                if (srcIndex == -1) {
                    throw new core_1.BaseException("Overriden directive " + lang_1.stringify(from) + " not found in the template of " + lang_1.stringify(component));
                }
                directives[srcIndex] = to;
            });
        }
        view = new core_1.ViewMetadata({
            template: inlineTemplate,
            templateUrl: templateUrl,
            directives: directives.length > 0 ? directives : null,
            animations: animations,
            styles: view.styles,
            styleUrls: view.styleUrls,
            pipes: view.pipes,
            encapsulation: view.encapsulation,
            interpolation: view.interpolation
        });
        return view;
    };
    /** @nocollapse */
    MockViewResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MockViewResolver.ctorParameters = [
        { type: core_1.Injector, },
    ];
    return MockViewResolver;
}(index_1.ViewResolver));
exports.MockViewResolver = MockViewResolver;
function flattenArray(tree, out) {
    if (!lang_1.isPresent(tree))
        return;
    for (var i = 0; i < tree.length; i++) {
        var item = core_1.resolveForwardRef(tree[i]);
        if (lang_1.isArray(item)) {
            flattenArray(item, out);
        }
        else {
            out.push(item);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld19yZXNvbHZlcl9tb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0aW5nL3ZpZXdfcmVzb2x2ZXJfbW9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCxxQkFBMkgsZUFBZSxDQUFDLENBQUE7QUFFM0ksc0JBQTJCLFVBQVUsQ0FBQyxDQUFBO0FBQ3RDLDJCQUFrQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQzdDLHFCQUFxRCxvQkFBb0IsQ0FBQyxDQUFBO0FBQzFFO0lBQXNDLG9DQUFZO0lBVWhELDBCQUFvQixTQUFtQjtRQUFJLGlCQUFPLENBQUM7UUFBL0IsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQVR2QyxnQkFBZ0I7UUFDaEIsV0FBTSxHQUFHLElBQUksZ0JBQUcsRUFBc0IsQ0FBQztRQUN2QyxnQkFBZ0I7UUFDaEIscUJBQWdCLEdBQUcsSUFBSSxnQkFBRyxFQUFnQixDQUFDO1FBQzNDLGdCQUFnQjtRQUNoQixnQkFBVyxHQUFHLElBQUksZ0JBQUcsRUFBa0MsQ0FBQztRQUN4RCxnQkFBZ0I7UUFDaEIsd0JBQW1CLEdBQUcsSUFBSSxnQkFBRyxFQUF5QixDQUFDO0lBRUgsQ0FBQztJQUVyRCxzQkFBWSx1Q0FBUzthQUFyQixjQUFvQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVsRSx5Q0FBYyxHQUF0QixVQUF1QixTQUFlLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBGOztPQUVHO0lBQ0gsa0NBQU8sR0FBUCxVQUFRLFNBQWUsRUFBRSxJQUFrQjtRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENB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