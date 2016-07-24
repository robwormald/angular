/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var collection_1 = require('../../facade/collection');
var exceptions_1 = require('../../facade/exceptions');
/**
 * @stable
 */
exports.EVENT_MANAGER_PLUGINS = new core_1.OpaqueToken('EventManagerPlugins');
var EventManager = (function () {
    function EventManager(plugins, _zone) {
        var _this = this;
        this._zone = _zone;
        plugins.forEach(function (p) { return p.manager = _this; });
        this._plugins = collection_1.ListWrapper.reversed(plugins);
    }
    EventManager.prototype.addEventListener = function (element, eventName, handler) {
        var plugin = this._findPluginFor(eventName);
        return plugin.addEventListener(element, eventName, handler);
    };
    EventManager.prototype.addGlobalEventListener = function (target, eventName, handler) {
        var plugin = this._findPluginFor(eventName);
        return plugin.addGlobalEventListener(target, eventName, handler);
    };
    EventManager.prototype.getZone = function () { return this._zone; };
    /** @internal */
    EventManager.prototype._findPluginFor = function (eventName) {
        var plugins = this._plugins;
        for (var i = 0; i < plugins.length; i++) {
            var plugin = plugins[i];
            if (plugin.supports(eventName)) {
                return plugin;
            }
        }
        throw new exceptions_1.BaseException("No event manager plugin found for event " + eventName);
    };
    /** @nocollapse */
    EventManager.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    EventManager.ctorParameters = [
        { type: Array, decorators: [{ type: core_1.Inject, args: [exports.EVENT_MANAGER_PLUGINS,] },] },
        { type: core_1.NgZone, },
    ];
    return EventManager;
}());
exports.EventManager = EventManager;
var EventManagerPlugin = (function () {
    function EventManagerPlugin() {
    }
    // That is equivalent to having supporting $event.target
    EventManagerPlugin.prototype.supports = function (eventName) { return false; };
    EventManagerPlugin.prototype.addEventListener = function (element, eventName, handler) {
        throw 'not implemented';
    };
    EventManagerPlugin.prototype.addGlobalEventListener = function (element, eventName, handler) {
        throw 'not implemented';
    };
    return EventManagerPlugin;
}());
exports.EventManagerPlugin = EventManagerPlugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2V2ZW50cy9ldmVudF9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBc0QsZUFBZSxDQUFDLENBQUE7QUFFdEUsMkJBQTBCLHlCQUF5QixDQUFDLENBQUE7QUFDcEQsMkJBQTRCLHlCQUF5QixDQUFDLENBQUE7QUFHdEQ7O0dBRUc7QUFDVSw2QkFBcUIsR0FBZ0IsSUFBSSxrQkFBVyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDekY7SUFHRSxzQkFBYSxPQUE2QixFQUFVLEtBQWE7UUFIbkUsaUJBd0NDO1FBckNxRCxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQy9ELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxHQUFHLEtBQUksRUFBaEIsQ0FBZ0IsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLEdBQUcsd0JBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUVELHVDQUFnQixHQUFoQixVQUFpQixPQUFvQixFQUFFLFNBQWlCLEVBQUUsT0FBaUI7UUFDekUsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELDZDQUFzQixHQUF0QixVQUF1QixNQUFjLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUN6RSxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLE1BQU0sQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsOEJBQU8sR0FBUCxjQUFvQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFeEMsZ0JBQWdCO0lBQ2hCLHFDQUFjLEdBQWQsVUFBZSxTQUFpQjtRQUM5QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3hDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNoQixDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sSUFBSSwwQkFBYSxDQUFDLDZDQUEyQyxTQUFXLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsdUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsaUJBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsMkJBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyw2QkFBcUIsRUFBRyxFQUFFLEVBQUcsRUFBQztRQUNoRixFQUFDLElBQUksRUFBRSxhQUFNLEdBQUc7S0FDZixDQUFDO0lBQ0YsbUJBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDO0FBeENZLG9CQUFZLGVBd0N4QixDQUFBO0FBRUQ7SUFBQTtJQWFBLENBQUM7SUFWQyx3REFBd0Q7SUFDeEQscUNBQVEsR0FBUixVQUFTLFNBQWlCLElBQWEsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFdEQsNkNBQWdCLEdBQWhCLFVBQWlCLE9BQW9CLEVBQUUsU0FBaUIsRUFBRSxPQUFpQjtRQUN6RSxNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFFRCxtREFBc0IsR0FBdEIsVUFBdUIsT0FBZSxFQUFFLFNBQWlCLEVBQUUsT0FBaUI7UUFDMUUsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0gseUJBQUM7QUFBRCxDQUFDLEFBYkQsSUFhQztBQWJZLDBCQUFrQixxQkFhOUIsQ0FBQSJ9