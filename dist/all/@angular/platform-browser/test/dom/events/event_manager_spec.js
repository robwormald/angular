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
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var dom_events_1 = require('@angular/platform-browser/src/dom/events/dom_events');
var ng_zone_1 = require('@angular/core/src/zone/ng_zone');
var collection_1 = require('../../../src/facade/collection');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var event_manager_1 = require('@angular/platform-browser/src/dom/events/event_manager');
var browser_util_1 = require('../../../testing/browser_util');
function main() {
    var domEventPlugin;
    testing_internal_1.describe('EventManager', function () {
        testing_internal_1.beforeEach(function () { domEventPlugin = new dom_events_1.DomEventsPlugin(); });
        testing_internal_1.it('should delegate event bindings to plugins that are passed in from the most generic one to the most specific one', function () {
            var element = browser_util_1.el('<div></div>');
            var handler = function (e /** TODO #9100 */) { return e; };
            var plugin = new FakeEventManagerPlugin(['click']);
            var manager = new event_manager_1.EventManager([domEventPlugin, plugin], new FakeNgZone());
            manager.addEventListener(element, 'click', handler);
            testing_internal_1.expect(plugin._eventHandler.get('click')).toBe(handler);
        });
        testing_internal_1.it('should delegate event bindings to the first plugin supporting the event', function () {
            var element = browser_util_1.el('<div></div>');
            var clickHandler = function (e /** TODO #9100 */) { return e; };
            var dblClickHandler = function (e /** TODO #9100 */) { return e; };
            var plugin1 = new FakeEventManagerPlugin(['dblclick']);
            var plugin2 = new FakeEventManagerPlugin(['click', 'dblclick']);
            var manager = new event_manager_1.EventManager([plugin2, plugin1], new FakeNgZone());
            manager.addEventListener(element, 'click', clickHandler);
            manager.addEventListener(element, 'dblclick', dblClickHandler);
            testing_internal_1.expect(plugin1._eventHandler.has('click')).toBe(false);
            testing_internal_1.expect(plugin2._eventHandler.get('click')).toBe(clickHandler);
            testing_internal_1.expect(plugin2._eventHandler.has('dblclick')).toBe(false);
            testing_internal_1.expect(plugin1._eventHandler.get('dblclick')).toBe(dblClickHandler);
        });
        testing_internal_1.it('should throw when no plugin can handle the event', function () {
            var element = browser_util_1.el('<div></div>');
            var plugin = new FakeEventManagerPlugin(['dblclick']);
            var manager = new event_manager_1.EventManager([plugin], new FakeNgZone());
            testing_internal_1.expect(function () { return manager.addEventListener(element, 'click', null); })
                .toThrowError('No event manager plugin found for event click');
        });
        testing_internal_1.it('events are caught when fired from a child', function () {
            var element = browser_util_1.el('<div><div></div></div>');
            // Workaround for https://bugs.webkit.org/show_bug.cgi?id=122755
            dom_adapter_1.getDOM().appendChild(dom_adapter_1.getDOM().defaultDoc().body, element);
            var child = dom_adapter_1.getDOM().firstChild(element);
            var dispatchedEvent = dom_adapter_1.getDOM().createMouseEvent('click');
            var receivedEvent = null;
            var handler = function (e /** TODO #9100 */) { receivedEvent = e; };
            var manager = new event_manager_1.EventManager([domEventPlugin], new FakeNgZone());
            manager.addEventListener(element, 'click', handler);
            dom_adapter_1.getDOM().dispatchEvent(child, dispatchedEvent);
            testing_internal_1.expect(receivedEvent).toBe(dispatchedEvent);
        });
        testing_internal_1.it('should add and remove global event listeners', function () {
            var element = browser_util_1.el('<div><div></div></div>');
            dom_adapter_1.getDOM().appendChild(dom_adapter_1.getDOM().defaultDoc().body, element);
            var dispatchedEvent = dom_adapter_1.getDOM().createMouseEvent('click');
            var receivedEvent = null;
            var handler = function (e /** TODO #9100 */) { receivedEvent = e; };
            var manager = new event_manager_1.EventManager([domEventPlugin], new FakeNgZone());
            var remover = manager.addGlobalEventListener('document', 'click', handler);
            dom_adapter_1.getDOM().dispatchEvent(element, dispatchedEvent);
            testing_internal_1.expect(receivedEvent).toBe(dispatchedEvent);
            receivedEvent = null;
            remover();
            dom_adapter_1.getDOM().dispatchEvent(element, dispatchedEvent);
            testing_internal_1.expect(receivedEvent).toBe(null);
        });
    });
}
exports.main = main;
var FakeEventManagerPlugin = (function (_super) {
    __extends(FakeEventManagerPlugin, _super);
    function FakeEventManagerPlugin(_supports) {
        _super.call(this);
        this._supports = _supports;
        /** @internal */
        this._eventHandler = new collection_1.Map();
    }
    FakeEventManagerPlugin.prototype.supports = function (eventName) { return collection_1.ListWrapper.contains(this._supports, eventName); };
    FakeEventManagerPlugin.prototype.addEventListener = function (element /** TODO #9100 */, eventName, handler) {
        var _this = this;
        this._eventHandler.set(eventName, handler);
        return function () { _this._eventHandler.delete(eventName); };
    };
    return FakeEventManagerPlugin;
}(event_manager_1.EventManagerPlugin));
var FakeNgZone = (function (_super) {
    __extends(FakeNgZone, _super);
    function FakeNgZone() {
        _super.call(this, { enableLongStackTrace: false });
    }
    FakeNgZone.prototype.run = function (fn /** TODO #9100 */) { fn(); };
    FakeNgZone.prototype.runOutsideAngular = function (fn /** TODO #9100 */) { return fn(); };
    return FakeNgZone;
}(ng_zone_1.NgZone));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRfbWFuYWdlcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3Rlc3QvZG9tL2V2ZW50cy9ldmVudF9tYW5hZ2VyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsaUNBQWdGLHdDQUF3QyxDQUFDLENBQUE7QUFDekgsMkJBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEYsd0JBQXFCLGdDQUFnQyxDQUFDLENBQUE7QUFDdEQsMkJBQStCLGdDQUFnQyxDQUFDLENBQUE7QUFDaEUsNEJBQXFCLCtDQUErQyxDQUFDLENBQUE7QUFDckUsOEJBQStDLHdEQUF3RCxDQUFDLENBQUE7QUFDeEcsNkJBQWlCLCtCQUErQixDQUFDLENBQUE7QUFFakQ7SUFDRSxJQUFJLGNBQW1CLENBQW1CO0lBRTFDLDJCQUFRLENBQUMsY0FBYyxFQUFFO1FBRXZCLDZCQUFVLENBQUMsY0FBUSxjQUFjLEdBQUcsSUFBSSw0QkFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU5RCxxQkFBRSxDQUFDLGlIQUFpSCxFQUNqSDtZQUNFLElBQUksT0FBTyxHQUFHLGlCQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDaEMsSUFBSSxPQUFPLEdBQUcsVUFBQyxDQUFNLENBQUMsaUJBQWlCLElBQUssT0FBQSxDQUFDLEVBQUQsQ0FBQyxDQUFDO1lBQzlDLElBQUksTUFBTSxHQUFHLElBQUksc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ25ELElBQUksT0FBTyxHQUFHLElBQUksNEJBQVksQ0FBQyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsRUFBRSxJQUFJLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDM0UsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUs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