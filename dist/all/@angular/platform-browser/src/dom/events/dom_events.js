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
var dom_adapter_1 = require('../dom_adapter');
var event_manager_1 = require('./event_manager');
var DomEventsPlugin = (function (_super) {
    __extends(DomEventsPlugin, _super);
    function DomEventsPlugin() {
        _super.apply(this, arguments);
    }
    // This plugin should come last in the list of plugins, because it accepts all
    // events.
    DomEventsPlugin.prototype.supports = function (eventName) { return true; };
    DomEventsPlugin.prototype.addEventListener = function (element, eventName, handler) {
        var zone = this.manager.getZone();
        var outsideHandler = function (event /** TODO #9100 */) { return zone.runGuarded(function () { return handler(event); }); };
        return this.manager.getZone().runOutsideAngular(function () { return dom_adapter_1.getDOM().onAndCancel(element, eventName, outsideHandler); });
    };
    DomEventsPlugin.prototype.addGlobalEventListener = function (target, eventName, handler) {
        var element = dom_adapter_1.getDOM().getGlobalEventTarget(target);
        var zone = this.manager.getZone();
        var outsideHandler = function (event /** TODO #9100 */) { return zone.runGuarded(function () { return handler(event); }); };
        return this.manager.getZone().runOutsideAngular(function () { return dom_adapter_1.getDOM().onAndCancel(element, eventName, outsideHandler); });
    };
    /** @nocollapse */
    DomEventsPlugin.decorators = [
        { type: core_1.Injectable },
    ];
    return DomEventsPlugin;
}(event_manager_1.EventManagerPlugin));
exports.DomEventsPlugin = DomEventsPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2V2ZW50cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2V2ZW50cy9kb21fZXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUV6Qyw0QkFBcUIsZ0JBQWdCLENBQUMsQ0FBQTtBQUN0Qyw4QkFBaUMsaUJBQWlCLENBQUMsQ0FBQTtBQUNuRDtJQUFxQyxtQ0FBa0I7SUFBdkQ7UUFBcUMsOEJBQWtCO0lBdUJ2RCxDQUFDO0lBdEJDLDhFQUE4RTtJQUM5RSxVQUFVO0lBQ1Ysa0NBQVEsR0FBUixVQUFTLFNBQWlCLElBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFckQsMENBQWdCLEdBQWhCLFVBQWlCLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUN6RSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2xDLElBQUksY0FBYyxHQUFHLFVBQUMsS0FBVSxDQUFDLGlCQUFpQixJQUFLLE9BQUEsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFkLENBQWMsQ0FBQyxFQUFyQyxDQUFxQyxDQUFDO1FBQzdGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixDQUMzQyxjQUFNLE9BQUEsb0JBQU0sRUFBRSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxFQUF4RCxDQUF3RCxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELGdEQUFzQixHQUF0QixVQUF1QixNQUFjLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUN6RSxJQUFJLE9BQU8sR0FBRyxvQkFBTSxFQUFFLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNsQyxJQUFJLGNBQWMsR0FBRyxVQUFDLEtBQVUsQ0FBQyxpQkFBaUIsSUFBSyxPQUFBLElBQUksQ0FBQyxVQUFVLENBQUMsY0FBTSxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBZCxDQUFjLENBQUMsRUFBckMsQ0FBcUMsQ0FBQztRQUM3RixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsQ0FDM0MsY0FBTSxPQUFBLG9CQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsRUFBeEQsQ0FBd0QsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFDSCxrQkFBa0I7SUFDWCwwQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUF2QkQsQ0FBcUMsa0NBQWtCLEdBdUJ0RDtBQXZCWSx1QkFBZSxrQkF1QjNCLENBQUEifQ==