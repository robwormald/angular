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
var testing_1 = require('@angular/core/testing');
var index_1 = require('../index');
var collection_1 = require('../src/facade/collection');
var lang_1 = require('../src/facade/lang');
var OverridingTestComponentBuilder = (function (_super) {
    __extends(OverridingTestComponentBuilder, _super);
    function OverridingTestComponentBuilder(injector) {
        _super.call(this, injector);
        /** @internal */
        this._bindingsOverrides = new Map();
        /** @internal */
        this._directiveOverrides = new Map();
        /** @internal */
        this._templateOverrides = new Map();
        /** @internal */
        this._animationOverrides = new Map();
        /** @internal */
        this._viewBindingsOverrides = new Map();
        /** @internal */
        this._viewOverrides = new Map();
    }
    /** @internal */
    OverridingTestComponentBuilder.prototype._clone = function () {
        var clone = new OverridingTestComponentBuilder(this._injector);
        clone._viewOverrides = collection_1.MapWrapper.clone(this._viewOverrides);
        clone._directiveOverrides = collection_1.MapWrapper.clone(this._directiveOverrides);
        clone._templateOverrides = collection_1.MapWrapper.clone(this._templateOverrides);
        clone._bindingsOverrides = collection_1.MapWrapper.clone(this._bindingsOverrides);
        clone._viewBindingsOverrides = collection_1.MapWrapper.clone(this._viewBindingsOverrides);
        return clone;
    };
    OverridingTestComponentBuilder.prototype.overrideTemplate = function (componentType, template) {
        var clone = this._clone();
        clone._templateOverrides.set(componentType, template);
        return clone;
    };
    OverridingTestComponentBuilder.prototype.overrideAnimations = function (componentType, animations) {
        var clone = this._clone();
        clone._animationOverrides.set(componentType, animations);
        return clone;
    };
    OverridingTestComponentBuilder.prototype.overrideView = function (componentType, view) {
        var clone = this._clone();
        clone._viewOverrides.set(componentType, view);
        return clone;
    };
    OverridingTestComponentBuilder.prototype.overrideDirective = function (componentType, from, to) {
        var clone = this._clone();
        var overridesForComponent = clone._directiveOverrides.get(componentType);
        if (!lang_1.isPresent(overridesForComponent)) {
            clone._directiveOverrides.set(componentType, new Map());
            overridesForComponent = clone._directiveOverrides.get(componentType);
        }
        overridesForComponent.set(from, to);
        return clone;
    };
    OverridingTestComponentBuilder.prototype.overrideProviders = function (type, providers) {
        var clone = this._clone();
        clone._bindingsOverrides.set(type, providers);
        return clone;
    };
    OverridingTestComponentBuilder.prototype.overrideViewProviders = function (type, providers) {
        var clone = this._clone();
        clone._viewBindingsOverrides.set(type, providers);
        return clone;
    };
    OverridingTestComponentBuilder.prototype.createAsync = function (rootComponentType) {
        this._applyMetadataOverrides();
        return _super.prototype.createAsync.call(this, rootComponentType);
    };
    OverridingTestComponentBuilder.prototype.createSync = function (rootComponentType) {
        this._applyMetadataOverrides();
        return _super.prototype.createSync.call(this, rootComponentType);
    };
    OverridingTestComponentBuilder.prototype._applyMetadataOverrides = function () {
        var mockDirectiveResolver = this._injector.get(index_1.DirectiveResolver);
        var mockViewResolver = this._injector.get(index_1.ViewResolver);
        this._viewOverrides.forEach(function (view, type) { mockViewResolver.setView(type, view); });
        this._templateOverrides.forEach(function (template, type) { return mockViewResolver.setInlineTemplate(type, template); });
        this._animationOverrides.forEach(function (animationsEntry, type) { return mockViewResolver.setAnimations(type, animationsEntry); });
        this._directiveOverrides.forEach(function (overrides, component) {
            overrides.forEach(function (to, from) { mockViewResolver.overrideViewDirective(component, from, to); });
        });
        this._bindingsOverrides.forEach(function (bindings, type) { return mockDirectiveResolver.setProvidersOverride(type, bindings); });
        this._viewBindingsOverrides.forEach(function (bindings, type) { return mockDirectiveResolver.setViewProvidersOverride(type, bindings); });
    };
    /** @nocollapse */
    OverridingTestComponentBuilder.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    OverridingTestComponentBuilder.ctorParameters = [
        { type: core_1.Injector, decorators: [{ type: core_1.Inject, args: [testing_1.TestBed,] },] },
    ];
    return OverridingTestComponentBuilder;
}(testing_1.TestComponentBuilder));
exports.OverridingTestComponentBuilder = OverridingTestComponentBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9jb21wb25lbnRfYnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdGluZy90ZXN0X2NvbXBvbmVudF9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILHFCQUFxSCxlQUFlLENBQUMsQ0FBQTtBQUNySSx3QkFBd0YsdUJBQXVCLENBQUMsQ0FBQTtBQUVoSCxzQkFBOEMsVUFBVSxDQUFDLENBQUE7QUFDekQsMkJBQXlCLDBCQUEwQixDQUFDLENBQUE7QUFDcEQscUJBQXFELG9CQUFvQixDQUFDLENBQUE7QUFDMUU7SUFBb0Qsa0RBQW9CO0lBY3RFLHdDQUFhLFFBQWtCO1FBQUksa0JBQU0sUUFBUSxDQUFDLENBQUM7UUFibkQsZ0JBQWdCO1FBQ2hCLHVCQUFrQixHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7UUFDNUMsZ0JBQWdCO1FBQ2hCLHdCQUFtQixHQUFHLElBQUksR0FBRyxFQUF5QixDQUFDO1FBQ3ZELGdCQUFnQjtRQUNoQix1QkFBa0IsR0FBRyxJQUFJLEdBQUcsRUFBZ0IsQ0FBQztRQUM3QyxnQkFBZ0I7UUFDaEIsd0JBQW1CLEdBQUcsSUFBSSxHQUFHLEVBQWtDLENBQUM7UUFDaEUsZ0JBQWdCO1FBQ2hCLDJCQUFzQixHQUFHLElBQUksR0FBRyxFQUFlLENBQUM7UUFDaEQsZ0JBQWdCO1FBQ2hCLG1CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQXNCLENBQUM7SUFFSyxDQUFDO0lBRXJELGdCQUFnQjtJQUNoQiwrQ0FBTSxHQUFOO1FBQ0UsSUFBSSxLQUFLLEdBQUcsSUFBSSw4QkFBOEIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0QsS0FBSyxDQUFDLGNBQWMsR0FBRyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDN0QsS0FBSyxDQUFDLG1CQUFtQixHQUFHLHVCQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ3ZFLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyx1QkFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNyRSxLQUFLLENBQUMsa0JBQWtCLEdBQUcsdUJBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDckUsS0FBSyxDQUFDLHNCQUFzQixHQUFHLHVCQUFVLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQzdFLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQseURBQWdCLEdBQWhCLFVBQWlCLGFBQW1CLEVBQUUsUUFBZ0I7UUFDcEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzFCLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsMkRBQWtCLEdBQWxCLFVBQW1CLGFBQW1CLEVBQUUsVUFBb0M7UUFFMUUsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzFCLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQscURBQVksR0FBWixVQUFhLGFBQW1CLEVBQUUsSUFBa0I7UUFDbEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzFCLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELDBEQUFpQixHQUFqQixVQUFrQixhQUFtQixFQUFFLElBQVUsRUFBRSxFQUFRO1FBQ3pELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQixJQUFJLHFCQUFxQixHQUFHLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDekUsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBUyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksR0FBRyxFQUFjLENBQUMsQ0FBQztZQUNwRSxxQkFBcUIsR0FBRyxLQUFLLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFDRCxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsMERBQWlCLEdBQWpCLFVBQWtCLElBQVUsRUFBRSxTQUFnQjtRQUM1QyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDMUIsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCw4REFBcUIsR0FBckIsVUFBc0IsSUFBVSxFQUFFLFNBQWdCO1FBQ2hELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUMxQixLQUFLLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELG9EQUFXLEdBQVgsVUFBZSxpQkFBa0M7UUFDL0MsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsTUFBTSxDQUFDLGdCQUFLLENBQUMsV0FBVyxZQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELG1EQUFVLEdBQVYsVUFBYyxpQkFBa0M7UUFDOUMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDL0IsTUFBTSxDQUFDLGdCQUFLLENBQUMsVUFBVSxZQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVPLGdFQUF1QixHQUEvQjtRQUNFLElBQUkscUJBQXFCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMseUJBQWlCLENBQUMsQ0FBQztRQUNsRSxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLG9CQUFZLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUksRUFBRSxJQUFJLElBQU8sZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQzNCLFVBQUMsUUFBUSxFQUFFLElBQUksSUFBSyxPQUFBLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsRUFBbEQsQ0FBa0QsQ0FBQyxDQUFDO1FBQzVFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLENBQzVCLFVBQUMsZUFBZSxFQUFFLElBQUksSUFBSyxPQUFBLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLEVBQXJELENBQXFELENBQUMsQ0FBQztRQUN0RixJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLFVBQUMsU0FBUyxFQUFFLFNBQVM7WUFDcEQsU0FBUyxDQUFDLE9BQU8sQ0FDYixVQUFDLEVBQUUsRUFBRSxJQUFJLElBQU8sZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FDM0IsVUFBQyxRQUFRLEVBQUUsSUFBSSxJQUFLLE9BQUEscUJBQXFCLENBQUMsb0JBQW9CLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUExRCxDQUEwRCxDQUFDLENBQUM7UUFDcEYsSUFBSSxDQUFDLHNCQUFzQixDQUFDLE9BQU8sQ0FDL0IsVUFBQyxRQUFRLEVBQUUsSUFBSSxJQUFLLE9BQUEscUJBQXFCLENBQUMsd0JBQXdCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxFQUE5RCxDQUE4RCxDQUFDLENBQUM7SUFDMUYsQ0FBQztJQUNILGtCQUFrQjtJQUNYLHlDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDZDQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLGVBQVEsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsaUJBQU8sRUFBRyxFQUFFLEVBQUcsRUFBQztLQUNwRSxDQUFDO0lBQ0YscUNBQUM7QUFBRCxDQUFDLEFBeEdELENBQW9ELDhCQUFvQixHQXdHdkU7QUF4R1ksc0NBQThCLGlDQXdHMUMsQ0FBQSJ9