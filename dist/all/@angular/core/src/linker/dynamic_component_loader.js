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
var di_1 = require('../di');
var lang_1 = require('../facade/lang');
var compiler_1 = require('./compiler');
/**
 * Use ComponentFactoryResolver and ViewContainerRef directly.
 *
 * @deprecated
 */
var DynamicComponentLoader = (function () {
    function DynamicComponentLoader() {
    }
    return DynamicComponentLoader;
}());
exports.DynamicComponentLoader = DynamicComponentLoader;
var DynamicComponentLoader_ = (function (_super) {
    __extends(DynamicComponentLoader_, _super);
    function DynamicComponentLoader_(_compiler) {
        _super.call(this);
        this._compiler = _compiler;
    }
    DynamicComponentLoader_.prototype.loadAsRoot = function (type, overrideSelectorOrNode, injector, onDispose, projectableNodes) {
        return this._compiler.compileComponentAsync(type).then(function (componentFactory) {
            var componentRef = componentFactory.create(injector, projectableNodes, lang_1.isPresent(overrideSelectorOrNode) ? overrideSelectorOrNode : componentFactory.selector);
            if (lang_1.isPresent(onDispose)) {
                componentRef.onDestroy(onDispose);
            }
            return componentRef;
        });
    };
    DynamicComponentLoader_.prototype.loadNextToLocation = function (type, location, providers, projectableNodes) {
        if (providers === void 0) { providers = null; }
        if (projectableNodes === void 0) { projectableNodes = null; }
        return this._compiler.compileComponentAsync(type).then(function (componentFactory) {
            var contextInjector = location.parentInjector;
            var childInjector = lang_1.isPresent(providers) && providers.length > 0 ?
                di_1.ReflectiveInjector.fromResolvedProviders(providers, contextInjector) :
                contextInjector;
            return location.createComponent(componentFactory, location.length, childInjector, projectableNodes);
        });
    };
    /** @nocollapse */
    DynamicComponentLoader_.decorators = [
        { type: di_1.Injectable },
    ];
    /** @nocollapse */
    DynamicComponentLoader_.ctorParameters = [
        { type: compiler_1.Compiler, },
    ];
    return DynamicComponentLoader_;
}(DynamicComponentLoader));
exports.DynamicComponentLoader_ = DynamicComponentLoader_;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY19jb21wb25lbnRfbG9hZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3NyYy9saW5rZXIvZHluYW1pY19jb21wb25lbnRfbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILG1CQUFtRixPQUFPLENBQUMsQ0FBQTtBQUMzRixxQkFBOEIsZ0JBQWdCLENBQUMsQ0FBQTtBQUUvQyx5QkFBdUIsWUFBWSxDQUFDLENBQUE7QUFNcEM7Ozs7R0FJRztBQUNIO0lBQUE7SUFpR0EsQ0FBQztJQUFELDZCQUFDO0FBQUQsQ0FBQyxBQWpHRCxJQWlHQztBQWpHcUIsOEJBQXNCLHlCQWlHM0MsQ0FBQTtBQUNEO0lBQTZDLDJDQUFzQjtJQUNqRSxpQ0FBb0IsU0FBbUI7UUFBSSxpQkFBTyxDQUFDO1FBQS9CLGNBQVMsR0FBVCxTQUFTLENBQVU7SUFBYSxDQUFDO0lBRXJELDRDQUFVLEdBQVYsVUFDSSxJQUFVLEVBQUUsc0JBQWtDLEVBQUUsUUFBa0IsRUFBRSxTQUFzQixFQUMxRixnQkFBMEI7UUFDNUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQU0sSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsZ0JBQWdCO1lBQzFFLElBQUksWUFBWSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FDdEMsUUFBUSxFQUFFLGdCQUFnQixFQUMxQixnQkFBUyxDQUFDLHNCQUFzQixDQUFDLEdBQUcsc0JBQXNCLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUYsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLFlBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEMsQ0FBQztZQUNELE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0RBQWtCLEdBQWxCLFVBQ0ksSUFBVSxFQUFFLFFBQTBCLEVBQUUsU0FBOEMsRUFDdEYsZ0JBQWdDO1FBRFEseUJBQThDLEdBQTlDLGdCQUE4QztRQUN0RixnQ0FBZ0MsR0FBaEMsdUJBQWdDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFNLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLGdCQUFnQjtZQUMxRSxJQUFJLGVBQWUsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDO1lBQzlDLElBQUksYUFBYSxHQUFHLGdCQUFTLENBQUMsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUM1RCx1QkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDO2dCQUNwRSxlQUFlLENBQUM7WUFDcEIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQzNCLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFDMUUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsa0NBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCxzQ0FBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxtQkFBUSxHQUFHO0tBQ2pCLENBQUM7SUFDRiw4QkFBQztBQUFELENBQUMsQUFyQ0QsQ0FBNkMsc0JBQXNCLEdBcUNsRTtBQXJDWSwrQkFBdUIsMEJBcUNuQyxDQUFBIn0=