/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var GesturesCmp = (function () {
    function GesturesCmp() {
        this.swipeDirection = '-';
        this.pinchScale = 1;
        this.rotateAngle = 0;
    }
    GesturesCmp.prototype.onSwipe = function (event /** TODO #9100 */) { this.swipeDirection = event.deltaX > 0 ? 'right' : 'left'; };
    GesturesCmp.prototype.onPinch = function (event /** TODO #9100 */) { this.pinchScale = event.scale; };
    GesturesCmp.prototype.onRotate = function (event /** TODO #9100 */) { this.rotateAngle = event.rotation; };
    /** @nocollapse */
    GesturesCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'gestures-app', templateUrl: 'template.html' },] },
    ];
    return GesturesCmp;
}());
function main() {
    platform_browser_dynamic_1.bootstrap(GesturesCmp);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL2dlc3R1cmVzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5Q0FBd0IsbUNBQW1DLENBQUMsQ0FBQTtBQUM1RCxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEM7SUFBQTtRQUNFLG1CQUFjLEdBQVcsR0FBRyxDQUFDO1FBQzdCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFDdkIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7SUFXMUIsQ0FBQztJQVRDLDZCQUFPLEdBQVAsVUFBUSxLQUFVLENBQUMsaUJBQWlCLElBQVUsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUUxRyw2QkFBTyxHQUFQLFVBQVEsS0FBVSxDQUFDLGlCQUFpQixJQUFVLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFOUUsOEJBQVEsR0FBUixVQUFTLEtBQVUsQ0FBQyxpQkFBaUIsSUFBVSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLGtCQUFrQjtJQUNYLHNCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUMsRUFBRyxFQUFFO0tBQ3RGLENBQUM7SUFDRixrQkFBQztBQUFELENBQUMsQUFkRCxJQWNDO0FBRUQ7SUFDRSxvQ0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFGZSxZQUFJLE9BRW5CLENBQUEifQ==