/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../facade/lang');
var NgIf = (function () {
    function NgIf(_viewContainer, _templateRef) {
        this._viewContainer = _viewContainer;
        this._templateRef = _templateRef;
        this._prevCondition = null;
    }
    Object.defineProperty(NgIf.prototype, "ngIf", {
        set: function (newCondition) {
            if (newCondition && (lang_1.isBlank(this._prevCondition) || !this._prevCondition)) {
                this._prevCondition = true;
                this._viewContainer.createEmbeddedView(this._templateRef);
            }
            else if (!newCondition && (lang_1.isBlank(this._prevCondition) || this._prevCondition)) {
                this._prevCondition = false;
                this._viewContainer.clear();
            }
        },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    NgIf.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ngIf]' },] },
    ];
    /** @nocollapse */
    NgIf.ctorParameters = [
        { type: core_1.ViewContainerRef, },
        { type: core_1.TemplateRef, },
    ];
    /** @nocollapse */
    NgIf.propDecorators = {
        'ngIf': [{ type: core_1.Input },],
    };
    return NgIf;
}());
exports.NgIf = NgIf;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfaWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbW1vbi9zcmMvZGlyZWN0aXZlcy9uZ19pZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQThELGVBQWUsQ0FBQyxDQUFBO0FBRTlFLHFCQUFzQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3ZDO0lBR0UsY0FBb0IsY0FBZ0MsRUFBVSxZQUFpQztRQUEzRSxtQkFBYyxHQUFkLGNBQWMsQ0FBa0I7UUFBVSxpQkFBWSxHQUFaLFlBQVksQ0FBcUI7UUFGdkYsbUJBQWMsR0FBWSxJQUFJLENBQUM7SUFHdkMsQ0FBQztJQUNELHNCQUFJLHNCQUFJO2FBQVIsVUFBUyxZQUFpQjtZQUN4QixFQUFFLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0UsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzVELENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxZQUFZLElBQUksQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xGLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO2dCQUM1QixJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzlCLENBQUM7UUFDSCxDQUFDOzs7T0FBQTtJQUNILGtCQUFrQjtJQUNYLGVBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUMsRUFBRyxFQUFFO0tBQ2xELENBQUM7SUFDRixrQkFBa0I7SUFDWCxtQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSx1QkFBZ0IsR0FBRztRQUMxQixFQUFDLElBQUksRUFBRSxrQkFBVyxHQUFHO0tBQ3BCLENBQUM7SUFDRixrQkFBa0I7SUFDWCxtQkFBYyxHQUEyQztRQUNoRSxNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtLQUN6QixDQUFDO0lBQ0YsV0FBQztBQUFELENBQUMsQUEzQkQsSUEyQkM7QUEzQlksWUFBSSxPQTJCaEIsQ0FBQSJ9