/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var exceptions_1 = require('../src/facade/exceptions');
var identifiers_1 = require('./identifiers');
var CompilerConfig = (function () {
    function CompilerConfig(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.renderTypes, renderTypes = _c === void 0 ? new DefaultRenderTypes() : _c, _d = _b.defaultEncapsulation, defaultEncapsulation = _d === void 0 ? core_1.ViewEncapsulation.Emulated : _d, genDebugInfo = _b.genDebugInfo, logBindingUpdate = _b.logBindingUpdate, _e = _b.useJit, useJit = _e === void 0 ? true : _e, _f = _b.deprecatedPlatformDirectives, deprecatedPlatformDirectives = _f === void 0 ? [] : _f, _g = _b.deprecatedPlatformPipes, deprecatedPlatformPipes = _g === void 0 ? [] : _g;
        this.renderTypes = renderTypes;
        this.defaultEncapsulation = defaultEncapsulation;
        this._genDebugInfo = genDebugInfo;
        this._logBindingUpdate = logBindingUpdate;
        this.useJit = useJit;
        this.platformDirectives = deprecatedPlatformDirectives;
        this.platformPipes = deprecatedPlatformPipes;
    }
    Object.defineProperty(CompilerConfig.prototype, "genDebugInfo", {
        get: function () {
            return this._genDebugInfo === void 0 ? core_1.isDevMode() : this._genDebugInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompilerConfig.prototype, "logBindingUpdate", {
        get: function () {
            return this._logBindingUpdate === void 0 ? core_1.isDevMode() : this._logBindingUpdate;
        },
        enumerable: true,
        configurable: true
    });
    return CompilerConfig;
}());
exports.CompilerConfig = CompilerConfig;
/**
 * Types used for the renderer.
 * Can be replaced to specialize the generated output to a specific renderer
 * to help tree shaking.
 */
var RenderTypes = (function () {
    function RenderTypes() {
    }
    Object.defineProperty(RenderTypes.prototype, "renderer", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTypes.prototype, "renderText", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTypes.prototype, "renderElement", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTypes.prototype, "renderComment", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTypes.prototype, "renderNode", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderTypes.prototype, "renderEvent", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return RenderTypes;
}());
exports.RenderTypes = RenderTypes;
var DefaultRenderTypes = (function () {
    function DefaultRenderTypes() {
        this.renderer = identifiers_1.Identifiers.Renderer;
        this.renderText = null;
        this.renderElement = null;
        this.renderComment = null;
        this.renderNode = null;
        this.renderEvent = null;
    }
    return DefaultRenderTypes;
}());
exports.DefaultRenderTypes = DefaultRenderTypes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci9zcmMvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBMkMsZUFBZSxDQUFDLENBQUE7QUFFM0QsMkJBQTRCLDBCQUEwQixDQUFDLENBQUE7QUFHdkQsNEJBQTBCLGVBQWUsQ0FBQyxDQUFBO0FBRTFDO0lBaUJFLHdCQUNJLEVBVU07WUFWTiw0QkFVTSxFQVZMLG1CQUFzQyxFQUF0QywyREFBc0MsRUFBRSw0QkFBaUQsRUFBakQsNkVBQWlELEVBQ3pGLDhCQUFZLEVBQUUsc0NBQWdCLEVBQUUsY0FBYSxFQUFiLGtDQUFhLEVBQUUsb0NBQWlDLEVBQWpDLHNEQUFpQyxFQUNoRiwrQkFBNEIsRUFBNUIsaURBQTRCO1FBUy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztRQUNqRCxJQUFJLENBQUMsYUFBYSxHQUFHLFlBQVksQ0FBQztRQUNsQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7UUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLDRCQUE0QixDQUFDO1FBQ3ZELElBQUksQ0FBQyxhQUFhLEdBQUcsdUJBQXVCLENBQUM7SUFDL0MsQ0FBQztJQUVELHNCQUFJLHdDQUFZO2FBQWhCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssS0FBSyxDQUFDLEdBQUcsZ0JBQVMsRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDMUUsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSw0Q0FBZ0I7YUFBcEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixLQUFLLEtBQUssQ0FBQyxHQUFHLGdCQUFTLEVBQUUsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDbEYsQ0FBQzs7O09BQUE7SUFDSCxxQkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0M7QUE1Q1ksc0JBQWMsaUJBNEMxQixDQUFBO0FBRUQ7Ozs7R0FJRztBQUNIO0lBQUE7SUFPQSxDQUFDO0lBTkMsc0JBQUksaUNBQVE7YUFBWixjQUE0QyxNQUFNLENBQUMsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDckUsc0JBQUksbUNBQVU7YUFBZCxjQUE4QyxNQUFNLENBQUMsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDdkUsc0JBQUksc0NBQWE7YUFBakIsY0FBaUQsTUFBTSxDQUFDLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQzFFLHNCQUFJLHNDQUFhO2FBQWpCLGNBQWlELE1BQU0sQ0FBQywwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUMxRSxzQkFBSSxtQ0FBVTthQUFkLGNBQThDLE1BQU0sQ0FBQywwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUN2RSxzQkFBSSxvQ0FBVzthQUFmLGNBQStDLE1BQU0sQ0FBQywwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUMxRSxrQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBUHFCLG1CQUFXLGNBT2hDLENBQUE7QUFFRDtJQUFBO1FBQ0UsYUFBUSxHQUFHLHlCQUFXLENBQUMsUUFBUSxDQUFDO1FBQ2hDLGVBQVUsR0FBUSxJQUFJLENBQUM7UUFDdkIsa0JBQWEsR0FBUSxJQUFJLENBQUM7UUFDMUIsa0JBQWEsR0FBUSxJQUFJLENBQUM7UUFDMUIsZUFBVSxHQUFRLElBQUksQ0FBQztRQUN2QixnQkFBVyxHQUFRLElBQUksQ0FBQztJQUMxQixDQUFDO0lBQUQseUJBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQVBZLDBCQUFrQixxQkFPOUIsQ0FBQSJ9