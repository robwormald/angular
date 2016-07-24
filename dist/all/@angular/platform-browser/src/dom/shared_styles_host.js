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
var collection_1 = require('../facade/collection');
var dom_adapter_1 = require('./dom_adapter');
var dom_tokens_1 = require('./dom_tokens');
var SharedStylesHost = (function () {
    function SharedStylesHost() {
        /** @internal */
        this._styles = [];
        /** @internal */
        this._stylesSet = new Set();
    }
    SharedStylesHost.prototype.addStyles = function (styles) {
        var _this = this;
        var additions = [];
        styles.forEach(function (style) {
            if (!collection_1.SetWrapper.has(_this._stylesSet, style)) {
                _this._stylesSet.add(style);
                _this._styles.push(style);
                additions.push(style);
            }
        });
        this.onStylesAdded(additions);
    };
    SharedStylesHost.prototype.onStylesAdded = function (additions) { };
    SharedStylesHost.prototype.getAllStyles = function () { return this._styles; };
    /** @nocollapse */
    SharedStylesHost.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    SharedStylesHost.ctorParameters = [];
    return SharedStylesHost;
}());
exports.SharedStylesHost = SharedStylesHost;
var DomSharedStylesHost = (function (_super) {
    __extends(DomSharedStylesHost, _super);
    function DomSharedStylesHost(doc) {
        _super.call(this);
        this._hostNodes = new Set();
        this._hostNodes.add(doc.head);
    }
    /** @internal */
    DomSharedStylesHost.prototype._addStylesToHost = function (styles, host) {
        for (var i = 0; i < styles.length; i++) {
            var style = styles[i];
            dom_adapter_1.getDOM().appendChild(host, dom_adapter_1.getDOM().createStyleElement(style));
        }
    };
    DomSharedStylesHost.prototype.addHost = function (hostNode) {
        this._addStylesToHost(this._styles, hostNode);
        this._hostNodes.add(hostNode);
    };
    DomSharedStylesHost.prototype.removeHost = function (hostNode) { collection_1.SetWrapper.delete(this._hostNodes, hostNode); };
    DomSharedStylesHost.prototype.onStylesAdded = function (additions) {
        var _this = this;
        this._hostNodes.forEach(function (hostNode) { _this._addStylesToHost(additions, hostNode); });
    };
    /** @nocollapse */
    DomSharedStylesHost.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DomSharedStylesHost.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: [dom_tokens_1.DOCUMENT,] },] },
    ];
    return DomSharedStylesHost;
}(SharedStylesHost));
exports.DomSharedStylesHost = DomSharedStylesHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3N0eWxlc19ob3N0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3NyYy9kb20vc2hhcmVkX3N0eWxlc19ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILHFCQUFpQyxlQUFlLENBQUMsQ0FBQTtBQUNqRCwyQkFBeUIsc0JBQXNCLENBQUMsQ0FBQTtBQUVoRCw0QkFBcUIsZUFBZSxDQUFDLENBQUE7QUFDckMsMkJBQXVCLGNBQWMsQ0FBQyxDQUFBO0FBQ3RDO0lBTUU7UUFMQSxnQkFBZ0I7UUFDaEIsWUFBTyxHQUFhLEVBQUUsQ0FBQztRQUN2QixnQkFBZ0I7UUFDaEIsZUFBVSxHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7SUFFaEIsQ0FBQztJQUVoQixvQ0FBUyxHQUFULFVBQVUsTUFBZ0I7UUFBMUIsaUJBVUM7UUFUQyxJQUFJLFNBQVMsR0FBNEIsRUFBRSxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsdUJBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLEtBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4QixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCx3Q0FBYSxHQUFiLFVBQWMsU0FBbUIsSUFBRyxDQUFDO0lBRXJDLHVDQUFZLEdBQVosY0FBMkIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ25ELGtCQUFrQjtJQUNYLDJCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLCtCQUFjLEdBQTJELEVBQy9FLENBQUM7SUFDRix1QkFBQztBQUFELENBQUMsQUE5QkQsSUE4QkM7QUE5Qlksd0JBQWdCLG1CQThCNUIsQ0FBQTtBQUNEO0lBQXlDLHVDQUFnQjtJQUV2RCw2QkFBYSxHQUFRO1FBQ25CLGlCQUFPLENBQUM7UUFGRixlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztRQUduQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUNELGdCQUFnQjtJQUNoQiw4Q0FBZ0IsR0FBaEIsVUFBaUIsTUFBZ0IsRUFBRSxJQUFVO1FBQzNDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3ZDLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0QixvQkFBTSxFQUFFLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxvQkFBTSxFQUFFLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDO0lBQ0gsQ0FBQztJQUNELHFDQUFPLEdBQVAsVUFBUSxRQUFjO1FBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFDRCx3Q0FBVSxHQUFWLFVBQVcsUUFBYyxJQUFJLHVCQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVFLDJDQUFhLEdBQWIsVUFBYyxTQUFtQjtRQUFqQyxpQkFFQztRQURDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUSxJQUFPLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6RixDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsOEJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsaUJBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsa0NBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxxQkFBUSxFQUFHLEVBQUUsRUFBRyxFQUFDO0tBQ3RFLENBQUM7SUFDRiwwQkFBQztBQUFELENBQUMsQUE5QkQsQ0FBeUMsZ0JBQWdCLEdBOEJ4RDtBQTlCWSwyQkFBbUIsc0JBOEIvQixDQUFBIn0=