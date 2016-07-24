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
var injector_1 = require('../di/injector');
var exceptions_1 = require('../facade/exceptions');
var component_factory_resolver_1 = require('./component_factory_resolver');
/**
 * Represents an instance of an NgModule created via a {@link NgModuleFactory}.
 *
 * `NgModuleRef` provides access to the NgModule Instance as well other objects related to this
 * NgModule Instance.
 * @stable
 */
var NgModuleRef = (function () {
    function NgModuleRef() {
    }
    Object.defineProperty(NgModuleRef.prototype, "injector", {
        /**
         * The injector that contains all of the providers of the NgModule.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModuleRef.prototype, "componentFactoryResolver", {
        /**
         * The ComponentFactoryResolver to get hold of the ComponentFactories
         * delcared in the `precompile` property of the module.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModuleRef.prototype, "instance", {
        /**
         * The NgModule instance.
         */
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return NgModuleRef;
}());
exports.NgModuleRef = NgModuleRef;
/**
 * @stable
 */
var NgModuleFactory = (function () {
    function NgModuleFactory(_injectorClass, _moduleype) {
        this._injectorClass = _injectorClass;
        this._moduleype = _moduleype;
    }
    Object.defineProperty(NgModuleFactory.prototype, "moduleType", {
        get: function () { return this._moduleype; },
        enumerable: true,
        configurable: true
    });
    NgModuleFactory.prototype.create = function (parentInjector) {
        if (parentInjector === void 0) { parentInjector = null; }
        if (!parentInjector) {
            parentInjector = injector_1.Injector.NULL;
        }
        var instance = new this._injectorClass(parentInjector);
        instance.create();
        return instance;
    };
    return NgModuleFactory;
}());
exports.NgModuleFactory = NgModuleFactory;
var _UNDEFINED = new Object();
var NgModuleInjector = (function (_super) {
    __extends(NgModuleInjector, _super);
    function NgModuleInjector(parent, factories) {
        _super.call(this, factories, parent.get(component_factory_resolver_1.ComponentFactoryResolver, component_factory_resolver_1.ComponentFactoryResolver.NULL));
        this.parent = parent;
    }
    NgModuleInjector.prototype.create = function () { this.instance = this.createInternal(); };
    NgModuleInjector.prototype.get = function (token, notFoundValue) {
        if (notFoundValue === void 0) { notFoundValue = injector_1.THROW_IF_NOT_FOUND; }
        if (token === injector_1.Injector || token === component_factory_resolver_1.ComponentFactoryResolver) {
            return this;
        }
        var result = this.getInternal(token, _UNDEFINED);
        return result === _UNDEFINED ? this.parent.get(token, notFoundValue) : result;
    };
    Object.defineProperty(NgModuleInjector.prototype, "injector", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgModuleInjector.prototype, "componentFactoryResolver", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    return NgModuleInjector;
}(component_factory_resolver_1.CodegenComponentFactoryResolver));
exports.NgModuleInjector = NgModuleInjector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlX2ZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvc3JjL2xpbmtlci9uZ19tb2R1bGVfZmFjdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCx5QkFBMkMsZ0JBQWdCLENBQUMsQ0FBQTtBQUM1RCwyQkFBNEIsc0JBQXNCLENBQUMsQ0FBQTtBQUduRCwyQ0FBd0UsOEJBQThCLENBQUMsQ0FBQTtBQUd2Rzs7Ozs7O0dBTUc7QUFDSDtJQUFBO0lBZ0JBLENBQUM7SUFaQyxzQkFBSSxpQ0FBUTtRQUhaOztXQUVHO2FBQ0gsY0FBMkIsTUFBTSxDQUFDLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBTXBELHNCQUFJLGlEQUF3QjtRQUo1Qjs7O1dBR0c7YUFDSCxjQUEyRCxNQUFNLENBQUMsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFLcEYsc0JBQUksaUNBQVE7UUFIWjs7V0FFRzthQUNILGNBQW9CLE1BQU0sQ0FBQywwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUMvQyxrQkFBQztBQUFELENBQUMsQUFoQkQsSUFnQkM7QUFoQnFCLG1CQUFXLGNBZ0JoQyxDQUFBO0FBRUQ7O0dBRUc7QUFDSDtJQUNFLHlCQUNZLGNBQXFFLEVBQ3JFLFVBQTJCO1FBRDNCLG1CQUFjLEdBQWQsY0FBYyxDQUF1RDtRQUNyRSxlQUFVLEdBQVYsVUFBVSxDQUFpQjtJQUFHLENBQUM7SUFFM0Msc0JBQUksdUNBQVU7YUFBZCxjQUFvQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTdELGdDQUFNLEdBQU4sVUFBTyxjQUErQjtRQUEvQiw4QkFBK0IsR0FBL0IscUJBQStCO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztZQUNwQixjQUFjLEdBQUcsbUJBQVEsQ0FBQyxJQUFJLENBQUM7UUFDakMsQ0FBQztRQUNELElBQUksUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN2RCxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDbEIsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBQ0gsc0JBQUM7QUFBRCxDQUFDLEFBZkQsSUFlQztBQWZZLHVCQUFlLGtCQWUzQixDQUFBO0FBRUQsSUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztBQUVoQztJQUFrRCxvQ0FBK0I7SUFLL0UsMEJBQW1CLE1BQWdCLEVBQUUsU0FBa0M7UUFDckUsa0JBQU0sU0FBUyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMscURBQXdCLEVBQUUscURBQXdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQURyRSxXQUFNLEdBQU4sTUFBTSxDQUFVO0lBRW5DLENBQUM7SUFFRCxpQ0FBTSxHQUFOLGNBQVcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBSW5ELDhCQUFHLEdBQUgsVUFBSSxLQUFVLEVBQUUsYUFBdUM7UUFBdkMsNkJBQXVDLEdBQXZDLDZDQUF1QztRQUNyRCxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssbUJBQVEsSUFBSSxLQUFLLEtBQUsscURBQXdCLENBQUMsQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLE1BQU0sS0FBSyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUNoRixDQUFDO0lBSUQsc0JBQUksc0NBQVE7YUFBWixjQUEyQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFekMsc0JBQUksc0RBQXdCO2FBQTVCLGNBQTJELE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUMzRSx1QkFBQztBQUFELENBQUMsQUExQkQsQ0FBa0QsNERBQStCLEdBMEJoRjtBQTFCcUIsd0JBQWdCLG1CQTBCckMsQ0FBQSJ9