/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var exceptions_1 = require('../facade/exceptions');
/**
 * @experimental
 */
// TODO (matsko): add typing for the animation function
var RenderComponentType = (function () {
    function RenderComponentType(id, templateUrl, slotCount, encapsulation, styles, animations) {
        this.id = id;
        this.templateUrl = templateUrl;
        this.slotCount = slotCount;
        this.encapsulation = encapsulation;
        this.styles = styles;
        this.animations = animations;
    }
    return RenderComponentType;
}());
exports.RenderComponentType = RenderComponentType;
var RenderDebugInfo = (function () {
    function RenderDebugInfo() {
    }
    Object.defineProperty(RenderDebugInfo.prototype, "injector", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "component", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "providerTokens", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "references", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "context", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RenderDebugInfo.prototype, "source", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    return RenderDebugInfo;
}());
exports.RenderDebugInfo = RenderDebugInfo;
/**
 * @experimental
 */
var Renderer = (function () {
    function Renderer() {
    }
    return Renderer;
}());
exports.Renderer = Renderer;
/**
 * Injectable service that provides a low-level interface for modifying the UI.
 *
 * Use this service to bypass Angular's templating and make custom UI changes that can't be
 * expressed declaratively. For example if you need to set a property or an attribute whose name is
 * not statically known, use {@link #setElementProperty} or {@link #setElementAttribute}
 * respectively.
 *
 * If you are implementing a custom renderer, you must implement this interface.
 *
 * The default Renderer implementation is `DomRenderer`. Also available is `WebWorkerRenderer`.
 * @experimental
 */
var RootRenderer = (function () {
    function RootRenderer() {
    }
    return RootRenderer;
}());
exports.RootRenderer = RootRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3NyYy9yZW5kZXIvYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFNSCwyQkFBNEIsc0JBQXNCLENBQUMsQ0FBQTtBQUduRDs7R0FFRztBQUNILHVEQUF1RDtBQUN2RDtJQUNFLDZCQUNXLEVBQVUsRUFBUyxXQUFtQixFQUFTLFNBQWlCLEVBQ2hFLGFBQWdDLEVBQVMsTUFBMkIsRUFDcEUsVUFBcUM7UUFGckMsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUNoRSxrQkFBYSxHQUFiLGFBQWEsQ0FBbUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFxQjtRQUNwRSxlQUFVLEdBQVYsVUFBVSxDQUEyQjtJQUFHLENBQUM7SUFDdEQsMEJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxZLDJCQUFtQixzQkFLL0IsQ0FBQTtBQUVEO0lBQUE7SUFPQSxDQUFDO0lBTkMsc0JBQUkscUNBQVE7YUFBWixjQUEyQixNQUFNLENBQUMsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDcEQsc0JBQUksc0NBQVM7YUFBYixjQUF1QixNQUFNLENBQUMsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDaEQsc0JBQUksMkNBQWM7YUFBbEIsY0FBOEIsTUFBTSxDQUFDLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ3ZELHNCQUFJLHVDQUFVO2FBQWQsY0FBeUMsTUFBTSxDQUFDLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2xFLHNCQUFJLG9DQUFPO2FBQVgsY0FBcUIsTUFBTSxDQUFDLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQzlDLHNCQUFJLG1DQUFNO2FBQVYsY0FBdUIsTUFBTSxDQUFDLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2xELHNCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFQcUIsdUJBQWUsa0JBT3BDLENBQUE7QUFFRDs7R0FFRztBQUNIO0lBQUE7SUE2Q0EsQ0FBQztJQUFELGVBQUM7QUFBRCxDQUFDLEFBN0NELElBNkNDO0FBN0NxQixnQkFBUSxXQTZDN0IsQ0FBQTtBQUVEOzs7Ozs7Ozs7Ozs7R0FZRztBQUNIO0lBQUE7SUFFQSxDQUFDO0lBQUQsbUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZxQixvQkFBWSxlQUVqQyxDQUFBIn0=