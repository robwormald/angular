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
var MockNgModuleResolver = (function (_super) {
    __extends(MockNgModuleResolver, _super);
    function MockNgModuleResolver(_injector) {
        _super.call(this);
        this._injector = _injector;
        /** @internal */
        this._ngModules = new collection_1.Map();
    }
    Object.defineProperty(MockNgModuleResolver.prototype, "_compiler", {
        get: function () { return this._injector.get(core_1.Compiler); },
        enumerable: true,
        configurable: true
    });
    MockNgModuleResolver.prototype._clearCacheFor = function (component) { this._compiler.clearCacheFor(component); };
    /**
     * Overrides the {@link NgModuleMetadata} for a module.
     */
    MockNgModuleResolver.prototype.setNgModule = function (type, metadata) {
        this._ngModules.set(type, metadata);
        this._clearCacheFor(type);
    };
    /**
     * Returns the {@link NgModuleMetadata} for a module:
     * - Set the {@link NgModuleMetadata} to the overridden view when it exists or fallback to the
     * default
     * `NgModuleResolver`, see `setNgModule`.
     */
    MockNgModuleResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var metadata = this._ngModules.get(type);
        if (!metadata) {
            metadata = _super.prototype.resolve.call(this, type, throwIfNotFound);
        }
        return metadata;
    };
    /** @nocollapse */
    MockNgModuleResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MockNgModuleResolver.ctorParameters = [
        { type: core_1.Injector, },
    ];
    return MockNgModuleResolver;
}(index_1.NgModuleResolver));
exports.MockNgModuleResolver = MockNgModuleResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlX3Jlc29sdmVyX21vY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3RpbmcvbmdfbW9kdWxlX3Jlc29sdmVyX21vY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgscUJBQXFFLGVBQWUsQ0FBQyxDQUFBO0FBRXJGLHNCQUErQixVQUFVLENBQUMsQ0FBQTtBQUMxQywyQkFBa0IsMEJBQTBCLENBQUMsQ0FBQTtBQUM3QztJQUEwQyx3Q0FBZ0I7SUFJeEQsOEJBQW9CLFNBQW1CO1FBQUksaUJBQU8sQ0FBQztRQUEvQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBSHZDLGdCQUFnQjtRQUNoQixlQUFVLEdBQUcsSUFBSSxnQkFBRyxFQUEwQixDQUFDO0lBRUssQ0FBQztJQUVyRCxzQkFBWSwyQ0FBUzthQUFyQixjQUFvQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVsRSw2Q0FBYyxHQUF0QixVQUF1QixTQUFlLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXBGOztPQUVHO0lBQ0gsMENBQVcsR0FBWCxVQUFZLElBQVUsRUFBRSxRQUEwQjtRQUNoRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCxzQ0FBTyxHQUFQLFVBQVEsSUFBVSxFQUFFLGVBQXNCO1FBQXRCLCtCQUFzQixHQUF0QixzQkFBc0I7UUFDeEMsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2QsUUFBUSxHQUFHLGdCQUFLLENBQUMsT0FBTyxZQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztRQUNsRCxDQUFDO1FBQ0QsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsK0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsaUJBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsbUNBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsZUFBUSxHQUFHO0tBQ2pCLENBQUM7SUFDRiwyQkFBQztBQUFELENBQUMsQUF2Q0QsQ0FBMEMsd0JBQWdCLEdBdUN6RDtBQXZDWSw0QkFBb0IsdUJBdUNoQyxDQUFBIn0=