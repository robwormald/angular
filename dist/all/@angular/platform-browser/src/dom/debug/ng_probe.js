/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../../../core_private');
var dom_adapter_1 = require('../dom_adapter');
var dom_renderer_1 = require('../dom_renderer');
var CORE_TOKENS = {
    'ApplicationRef': core_1.ApplicationRef,
    'NgZone': core_1.NgZone
};
var INSPECT_GLOBAL_NAME = 'ng.probe';
var CORE_TOKENS_GLOBAL_NAME = 'ng.coreTokens';
/**
 * Returns a {@link DebugElement} for the given native DOM element, or
 * null if the given native element does not have an Angular view associated
 * with it.
 */
function inspectNativeElement(element /** TODO #9100 */) {
    return core_1.getDebugNode(element);
}
exports.inspectNativeElement = inspectNativeElement;
function _createConditionalRootRenderer(rootRenderer /** TODO #9100 */) {
    if (core_1.isDevMode()) {
        return _createRootRenderer(rootRenderer);
    }
    return rootRenderer;
}
exports._createConditionalRootRenderer = _createConditionalRootRenderer;
function _createRootRenderer(rootRenderer /** TODO #9100 */) {
    dom_adapter_1.getDOM().setGlobalVar(INSPECT_GLOBAL_NAME, inspectNativeElement);
    dom_adapter_1.getDOM().setGlobalVar(CORE_TOKENS_GLOBAL_NAME, CORE_TOKENS);
    return new core_private_1.DebugDomRootRenderer(rootRenderer);
}
/**
 * Providers which support debugging Angular applications (e.g. via `ng.probe`).
 */
exports.ELEMENT_PROBE_PROVIDERS = [{ provide: core_1.RootRenderer, useFactory: _createConditionalRootRenderer, deps: [dom_renderer_1.DomRootRenderer] }];
exports.ELEMENT_PROBE_PROVIDERS_PROD_MODE = [{ provide: core_1.RootRenderer, useFactory: _createRootRenderer, deps: [dom_renderer_1.DomRootRenderer] }];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfcHJvYmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9kZWJ1Zy9uZ19wcm9iZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQXVGLGVBQWUsQ0FBQyxDQUFBO0FBRXZHLDZCQUFtQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQzNELDRCQUFxQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3RDLDZCQUE4QixpQkFBaUIsQ0FBQyxDQUFBO0FBR2hELElBQU0sV0FBVyxHQUFHO0lBQ2xCLGdCQUFnQixFQUFFLHFCQUFjO0lBQ2hDLFFBQVEsRUFBRSxhQUFNO0NBQ2pCLENBQUM7QUFFRixJQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQztBQUN2QyxJQUFNLHVCQUF1QixHQUFHLGVBQWUsQ0FBQztBQUVoRDs7OztHQUlHO0FBQ0gsOEJBQXFDLE9BQVksQ0FBQyxpQkFBaUI7SUFDakUsTUFBTSxDQUFDLG1CQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQUZlLDRCQUFvQix1QkFFbkMsQ0FBQTtBQUVELHdDQUErQyxZQUFpQixDQUFDLGlCQUFpQjtJQUNoRixFQUFFLENBQUMsQ0FBQyxnQkFBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLFlBQVksQ0FBQztBQUN0QixDQUFDO0FBTGUsc0NBQThCLGlDQUs3QyxDQUFBO0FBRUQsNkJBQTZCLFlBQWlCLENBQUMsaUJBQWlCO0lBQzlELG9CQUFNLEVBQUUsQ0FBQyxZQUFZLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztJQUNqRSxvQkFBTSxFQUFFLENBQUMsWUFBWSxDQUFDLHVCQUF1QixFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQzVELE1BQU0sQ0FBQyxJQUFJLG1DQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFFRDs7R0FFRztBQUNVLCtCQUF1QixHQUNoQyxDQUFDLEVBQUMsT0FBTyxFQUFFLG1CQUFZLEVBQUUsVUFBVSxFQUFFLDhCQUE4QixFQUFFLElBQUksRUFBRSxDQUFDLDhCQUFlLENBQUMsRUFBQyxDQUFDLENBQUM7QUFFdEYseUNBQWlDLEdBQzFDLENBQUMsRUFBQyxPQUFPLEVBQUUsbUJBQVksRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxFQUFFLENBQUMsOEJBQWUsQ0FBQyxFQUFDLENBQUMsQ0FBQyJ9