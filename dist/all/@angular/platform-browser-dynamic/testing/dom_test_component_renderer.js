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
var platform_browser_1 = require('@angular/platform-browser');
var platform_browser_private_1 = require('../platform_browser_private');
var DOMTestComponentRenderer = (function (_super) {
    __extends(DOMTestComponentRenderer, _super);
    function DOMTestComponentRenderer(_doc /** TODO #9100 */) {
        _super.call(this);
        this._doc = _doc;
    }
    DOMTestComponentRenderer.prototype.insertRootElement = function (rootElId) {
        var rootEl = platform_browser_private_1.getDOM().firstChild(platform_browser_private_1.getDOM().content(platform_browser_private_1.getDOM().createTemplate("<div id=\"" + rootElId + "\"></div>")));
        // TODO(juliemr): can/should this be optional?
        var oldRoots = platform_browser_private_1.getDOM().querySelectorAll(this._doc, '[id^=root]');
        for (var i = 0; i < oldRoots.length; i++) {
            platform_browser_private_1.getDOM().remove(oldRoots[i]);
        }
        platform_browser_private_1.getDOM().appendChild(this._doc.body, rootEl);
    };
    /** @nocollapse */
    DOMTestComponentRenderer.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DOMTestComponentRenderer.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [platform_browser_1.DOCUMENT,] },] },
    ];
    return DOMTestComponentRenderer;
}(testing_1.TestComponentRenderer));
exports.DOMTestComponentRenderer = DOMTestComponentRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3Rlc3RfY29tcG9uZW50X3JlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMvdGVzdGluZy9kb21fdGVzdF9jb21wb25lbnRfcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgscUJBQWlDLGVBQWUsQ0FBQyxDQUFBO0FBQ2pELHdCQUFvQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQzVELGlDQUF1QiwyQkFBMkIsQ0FBQyxDQUFBO0FBRW5ELHlDQUFxQiw2QkFBNkIsQ0FBQyxDQUFBO0FBQ25EO0lBQThDLDRDQUFxQjtJQUNqRSxrQ0FBcUIsSUFBUyxDQUFDLGlCQUFpQjtRQUFJLGlCQUFPLENBQUM7UUFBdkMsU0FBSSxHQUFKLElBQUksQ0FBSztJQUErQixDQUFDO0lBRTlELG9EQUFpQixHQUFqQixVQUFrQixRQUFnQjtRQUNoQyxJQUFJLE1BQU0sR0FBZ0IsaUNBQU0sRUFBRSxDQUFDLFVBQVUsQ0FDekMsaUNBQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxpQ0FBTSxFQUFFLENBQUMsY0FBYyxDQUFDLGVBQVksUUFBUSxjQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFL0UsOENBQThDO1FBQzlDLElBQUksUUFBUSxHQUFHLGlDQUFNLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ2xFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3pDLGlDQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELGlDQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNILGtCQUFrQjtJQUNYLG1DQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHVDQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsMkJBQVEsRUFBRyxFQUFFLEVBQUcsRUFBQztLQUN0RSxDQUFDO0lBQ0YsK0JBQUM7QUFBRCxDQUFDLEFBdEJELENBQThDLCtCQUFxQixHQXNCbEU7QUF0QlksZ0NBQXdCLDJCQXNCcEMsQ0FBQSJ9