/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var console_1 = require('../console');
var di_1 = require('../di');
var lang_1 = require('../facade/lang');
var component_resolver_1 = require('./component_resolver');
var _SEPARATOR = '#';
var SystemJsComponentResolver = (function () {
    function SystemJsComponentResolver(_resolver, _console) {
        this._resolver = _resolver;
        this._console = _console;
    }
    SystemJsComponentResolver.prototype.resolveComponent = function (componentType) {
        var _this = this;
        if (lang_1.isString(componentType)) {
            this._console.warn(component_resolver_1.ComponentResolver.LazyLoadingDeprecationMsg);
            var _a = componentType.split(_SEPARATOR), module_1 = _a[0], component_1 = _a[1];
            if (component_1 === void (0)) {
                // Use the default export when no component is specified
                component_1 = 'default';
            }
            return lang_1.global
                .System.import(module_1)
                .then(function (module) { return _this._resolver.resolveComponent(module[component_1]); });
        }
        return this._resolver.resolveComponent(componentType);
    };
    SystemJsComponentResolver.prototype.clearCache = function () { };
    /** @nocollapse */
    SystemJsComponentResolver.decorators = [
        { type: di_1.Injectable },
    ];
    /** @nocollapse */
    SystemJsComponentResolver.ctorParameters = [
        { type: component_resolver_1.ComponentResolver, },
        { type: console_1.Console, },
    ];
    return SystemJsComponentResolver;
}());
exports.SystemJsComponentResolver = SystemJsComponentResolver;
var FACTORY_MODULE_SUFFIX = '.ngfactory';
var FACTORY_CLASS_SUFFIX = 'NgFactory';
var SystemJsCmpFactoryResolver = (function () {
    function SystemJsCmpFactoryResolver(_console) {
        this._console = _console;
    }
    SystemJsCmpFactoryResolver.prototype.resolveComponent = function (componentType) {
        if (lang_1.isString(componentType)) {
            this._console.warn(component_resolver_1.ComponentResolver.LazyLoadingDeprecationMsg);
            var _a = componentType.split(_SEPARATOR), module_2 = _a[0], factory_1 = _a[1];
            return lang_1.global
                .System.import(module_2 + FACTORY_MODULE_SUFFIX)
                .then(function (module) { return module[factory_1 + FACTORY_CLASS_SUFFIX]; });
        }
        return Promise.resolve(null);
    };
    SystemJsCmpFactoryResolver.prototype.clearCache = function () { };
    /** @nocollapse */
    SystemJsCmpFactoryResolver.decorators = [
        { type: di_1.Injectable },
    ];
    /** @nocollapse */
    SystemJsCmpFactoryResolver.ctorParameters = [
        { type: console_1.Console, },
    ];
    return SystemJsCmpFactoryResolver;
}());
exports.SystemJsCmpFactoryResolver = SystemJsCmpFactoryResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzdGVtanNfY29tcG9uZW50X3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3NyYy9saW5rZXIvc3lzdGVtanNfY29tcG9uZW50X3Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx3QkFBc0IsWUFBWSxDQUFDLENBQUE7QUFDbkMsbUJBQXlCLE9BQU8sQ0FBQyxDQUFBO0FBQ2pDLHFCQUFxQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBR3RELG1DQUFnQyxzQkFBc0IsQ0FBQyxDQUFBO0FBRXZELElBQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQztBQUN2QjtJQUNFLG1DQUFvQixTQUE0QixFQUFVLFFBQWlCO1FBQXZELGNBQVMsR0FBVCxTQUFTLENBQW1CO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBUztJQUFHLENBQUM7SUFFL0Usb0RBQWdCLEdBQWhCLFVBQWlCLGFBQTBCO1FBQTNDLGlCQWdCQztRQWZDLEVBQUUsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsc0NBQWlCLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUNoRSxJQUFBLG9DQUF5RCxFQUFwRCxnQkFBTSxFQUFFLG1CQUFTLENBQW9DO1lBRTFELEVBQUUsQ0FBQyxDQUFDLFdBQVMsS0FBSyxLQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxQix3REFBd0Q7Z0JBQ3hELFdBQVMsR0FBRyxTQUFTLENBQUM7WUFDeEIsQ0FBQztZQUVELE1BQU0sQ0FBTyxhQUFPO2lCQUNmLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBTSxDQUFDO2lCQUNyQixJQUFJLENBQUMsVUFBQyxNQUFXLElBQUssT0FBQSxLQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxXQUFTLENBQUMsQ0FBQyxFQUFsRCxDQUFrRCxDQUFDLENBQUM7UUFDakYsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCw4Q0FBVSxHQUFWLGNBQW9CLENBQUM7SUFDdkIsa0JBQWtCO0lBQ1gsb0NBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCx3Q0FBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxzQ0FBaUIsR0FBRztRQUMzQixFQUFDLElBQUksRUFBRSxpQkFBTyxHQUFHO0tBQ2hCLENBQUM7SUFDRixnQ0FBQztBQUFELENBQUMsQUEvQkQsSUErQkM7QUEvQlksaUNBQXlCLDRCQStCckMsQ0FBQTtBQUVELElBQU0scUJBQXFCLEdBQUcsWUFBWSxDQUFDO0FBQzNDLElBQU0sb0JBQW9CLEdBQUcsV0FBVyxDQUFDO0FBQ3pDO0lBQ0Usb0NBQW9CLFFBQWlCO1FBQWpCLGFBQVEsR0FBUixRQUFRLENBQVM7SUFBRyxDQUFDO0lBQ3pDLHFEQUFnQixHQUFoQixVQUFpQixhQUEwQjtRQUN6QyxFQUFFLENBQUMsQ0FBQyxlQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLHNDQUFpQixDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDaEUsSUFBQSxvQ0FBdUQsRUFBbEQsZ0JBQU0sRUFBRSxpQkFBTyxDQUFvQztZQUN4RCxNQUFNLENBQU8sYUFBTztpQkFDZixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQU0sR0FBRyxxQkFBcUIsQ0FBQztpQkFDN0MsSUFBSSxDQUFDLFVBQUMsTUFBVyxJQUFLLE9BQUEsTUFBTSxDQUFDLFNBQU8sR0FBRyxvQkFBb0IsQ0FBQyxFQUF0QyxDQUFzQyxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCwrQ0FBVSxHQUFWLGNBQW9CLENBQUM7SUFDdkIsa0JBQWtCO0lBQ1gscUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCx5Q0FBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxpQkFBTyxHQUFHO0tBQ2hCLENBQUM7SUFDRixpQ0FBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7QUF2Qlksa0NBQTBCLDZCQXVCdEMsQ0FBQSJ9