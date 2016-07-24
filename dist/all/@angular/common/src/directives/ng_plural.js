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
var localization_1 = require('../localization');
var ng_switch_1 = require('./ng_switch');
var NgPlural = (function () {
    function NgPlural(_localization) {
        this._localization = _localization;
        this._caseViews = {};
    }
    Object.defineProperty(NgPlural.prototype, "ngPlural", {
        set: function (value) {
            this._switchValue = value;
            this._updateView();
        },
        enumerable: true,
        configurable: true
    });
    NgPlural.prototype.addCase = function (value, switchView) { this._caseViews[value] = switchView; };
    /** @internal */
    NgPlural.prototype._updateView = function () {
        this._clearViews();
        var key = localization_1.getPluralCategory(this._switchValue, Object.getOwnPropertyNames(this._caseViews), this._localization);
        this._activateView(this._caseViews[key]);
    };
    /** @internal */
    NgPlural.prototype._clearViews = function () {
        if (lang_1.isPresent(this._activeView))
            this._activeView.destroy();
    };
    /** @internal */
    NgPlural.prototype._activateView = function (view) {
        if (!lang_1.isPresent(view))
            return;
        this._activeView = view;
        this._activeView.create();
    };
    /** @nocollapse */
    NgPlural.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ngPlural]' },] },
    ];
    /** @nocollapse */
    NgPlural.ctorParameters = [
        { type: localization_1.NgLocalization, },
    ];
    /** @nocollapse */
    NgPlural.propDecorators = {
        'ngPlural': [{ type: core_1.Input },],
    };
    return NgPlural;
}());
exports.NgPlural = NgPlural;
var NgPluralCase = (function () {
    function NgPluralCase(value, template, viewContainer, ngPlural) {
        this.value = value;
        ngPlural.addCase(value, new ng_switch_1.SwitchView(viewContainer, template));
    }
    /** @nocollapse */
    NgPluralCase.decorators = [
        { type: core_1.Directive, args: [{ selector: '[ngPluralCase]' },] },
    ];
    /** @nocollapse */
    NgPluralCase.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['ngPluralCase',] },] },
        { type: core_1.TemplateRef, },
        { type: core_1.ViewContainerRef, },
        { type: NgPlural, decorators: [{ type: core_1.Host },] },
    ];
    return NgPluralCase;
}());
exports.NgPluralCase = NgPluralCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfcGx1cmFsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vc3JjL2RpcmVjdGl2ZXMvbmdfcGx1cmFsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBdUYsZUFBZSxDQUFDLENBQUE7QUFFdkcscUJBQXdCLGdCQUFnQixDQUFDLENBQUE7QUFDekMsNkJBQWdELGlCQUFpQixDQUFDLENBQUE7QUFFbEUsMEJBQXlCLGFBQWEsQ0FBQyxDQUFBO0FBQ3ZDO0lBS0Usa0JBQW9CLGFBQTZCO1FBQTdCLGtCQUFhLEdBQWIsYUFBYSxDQUFnQjtRQUZ6QyxlQUFVLEdBQThCLEVBQUUsQ0FBQztJQUVDLENBQUM7SUFDckQsc0JBQUksOEJBQVE7YUFBWixVQUFhLEtBQWE7WUFDeEIsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7WUFDMUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3JCLENBQUM7OztPQUFBO0lBRUQsMEJBQU8sR0FBUCxVQUFRLEtBQWEsRUFBRSxVQUFzQixJQUFVLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUU3RixnQkFBZ0I7SUFDaEIsOEJBQVcsR0FBWDtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUVuQixJQUFJLEdBQUcsR0FBRyxnQ0FBaUIsQ0FDdkIsSUFBSSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLDhCQUFXLEdBQVg7UUFDRSxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDOUQsQ0FBQztJQUVELGdCQUFnQjtJQUNoQixnQ0FBYSxHQUFiLFVBQWMsSUFBZ0I7UUFDNUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUNILGtCQUFrQjtJQUNYLG1CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsWUFBWSxFQUFDLEVBQUcsRUFBRTtLQUN0RCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsdUJBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsNkJBQWMsR0FBRztLQUN2QixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsdUJBQWMsR0FBMkM7UUFDaEUsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7S0FDN0IsQ0FBQztJQUNGLGVBQUM7QUFBRCxDQUFDLEFBN0NELElBNkNDO0FBN0NZLGdCQUFRLFdBNkNwQixDQUFBO0FBQ0Q7SUFDRSxzQkFBb0IsS0FBYSxFQUFFLFFBQTZCLEVBQzVELGFBQStCLEVBQUUsUUFBa0I7UUFEbkMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUUvQixRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLHNCQUFVLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUNILGtCQUFrQjtJQUNYLHVCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsZ0JBQWdCLEVBQUMsRUFBRyxFQUFFO0tBQzFELENBQUM7SUFDRixrQkFBa0I7SUFDWCwyQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxjQUFjLEVBQUcsRUFBRSxFQUFHLEVBQUM7UUFDaEYsRUFBQyxJQUFJLEVBQUUsa0JBQVcsR0FBRztRQUNyQixFQUFDLElBQUksRUFBRSx1QkFBZ0IsR0FBRztRQUMxQixFQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBSSxFQUFFLEVBQUcsRUFBQztLQUMvQyxDQUFDO0lBQ0YsbUJBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBaEJZLG9CQUFZLGVBZ0J4QixDQUFBIn0=