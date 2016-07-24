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
var dom_adapter_1 = require('../dom/dom_adapter');
var collection_1 = require('../facade/collection');
var lang_1 = require('../facade/lang');
/**
 * Provides DOM operations in any browser environment.
 */
var GenericBrowserDomAdapter = (function (_super) {
    __extends(GenericBrowserDomAdapter, _super);
    function GenericBrowserDomAdapter() {
        var _this = this;
        _super.call(this);
        this._animationPrefix = null;
        this._transitionEnd = null;
        try {
            var element = this.createElement('div', this.defaultDoc());
            if (lang_1.isPresent(this.getStyle(element, 'animationName'))) {
                this._animationPrefix = '';
            }
            else {
                var domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
                for (var i = 0; i < domPrefixes.length; i++) {
                    if (lang_1.isPresent(this.getStyle(element, domPrefixes[i] + 'AnimationName'))) {
                        this._animationPrefix = '-' + domPrefixes[i].toLowerCase() + '-';
                        break;
                    }
                }
            }
            var transEndEventNames = {
                WebkitTransition: 'webkitTransitionEnd',
                MozTransition: 'transitionend',
                OTransition: 'oTransitionEnd otransitionend',
                transition: 'transitionend'
            };
            collection_1.StringMapWrapper.forEach(transEndEventNames, function (value, key) {
                if (lang_1.isPresent(_this.getStyle(element, key))) {
                    _this._transitionEnd = value;
                }
            });
        }
        catch (e) {
            this._animationPrefix = null;
            this._transitionEnd = null;
        }
    }
    GenericBrowserDomAdapter.prototype.getDistributedNodes = function (el) { return el.getDistributedNodes(); };
    GenericBrowserDomAdapter.prototype.resolveAndSetHref = function (el, baseUrl, href) {
        el.href = href == null ? baseUrl : baseUrl + '/../' + href;
    };
    GenericBrowserDomAdapter.prototype.supportsDOMEvents = function () { return true; };
    GenericBrowserDomAdapter.prototype.supportsNativeShadowDOM = function () {
        return lang_1.isFunction(this.defaultDoc().body.createShadowRoot);
    };
    GenericBrowserDomAdapter.prototype.getAnimationPrefix = function () {
        return lang_1.isPresent(this._animationPrefix) ? this._animationPrefix : '';
    };
    GenericBrowserDomAdapter.prototype.getTransitionEnd = function () { return lang_1.isPresent(this._transitionEnd) ? this._transitionEnd : ''; };
    GenericBrowserDomAdapter.prototype.supportsAnimation = function () {
        return lang_1.isPresent(this._animationPrefix) && lang_1.isPresent(this._transitionEnd);
    };
    return GenericBrowserDomAdapter;
}(dom_adapter_1.DomAdapter));
exports.GenericBrowserDomAdapter = GenericBrowserDomAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJpY19icm93c2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIvZ2VuZXJpY19icm93c2VyX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsNEJBQXlCLG9CQUFvQixDQUFDLENBQUE7QUFDOUMsMkJBQStCLHNCQUFzQixDQUFDLENBQUE7QUFDdEQscUJBQTBDLGdCQUFnQixDQUFDLENBQUE7QUFJM0Q7O0dBRUc7QUFDSDtJQUF1RCw0Q0FBVTtJQUcvRDtRQUhGLGlCQWtEQztRQTlDRyxpQkFBTyxDQUFDO1FBSEYscUJBQWdCLEdBQVcsSUFBSSxDQUFDO1FBQ2hDLG1CQUFjLEdBQVcsSUFBSSxDQUFDO1FBR3BDLElBQUksQ0FBQztZQUNILElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQzNELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7WUFDN0IsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLElBQUksV0FBVyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUM1QyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMs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