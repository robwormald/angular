/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../../facade/lang');
var message_bus_1 = require('../shared/message_bus');
var messaging_api_1 = require('../shared/messaging_api');
var render_store_1 = require('../shared/render_store');
var serializer_1 = require('../shared/serializer');
var service_message_broker_1 = require('../shared/service_message_broker');
var event_dispatcher_1 = require('../ui/event_dispatcher');
var MessageBasedRenderer = (function () {
    function MessageBasedRenderer(_brokerFactory, _bus, _serializer, _renderStore, _rootRenderer) {
        this._brokerFactory = _brokerFactory;
        this._bus = _bus;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this._rootRenderer = _rootRenderer;
    }
    MessageBasedRenderer.prototype.start = function () {
        var broker = this._brokerFactory.createMessageBroker(messaging_api_1.RENDERER_CHANNEL);
        this._bus.initChannel(messaging_api_1.EVENT_CHANNEL);
        this._eventDispatcher = new event_dispatcher_1.EventDispatcher(this._bus.to(messaging_api_1.EVENT_CHANNEL), this._serializer);
        broker.registerMethod('renderComponent', [core_1.RenderComponentType, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._renderComponent, this));
        broker.registerMethod('selectRootElement', [serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._selectRootElement, this));
        broker.registerMethod('createElement', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._createElement, this));
        broker.registerMethod('createViewRoot', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._createViewRoot, this));
        broker.registerMethod('createTemplateAnchor', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._createTemplateAnchor, this));
        broker.registerMethod('createText', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._createText, this));
        broker.registerMethod('projectNodes', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], lang_1.FunctionWrapper.bind(this._projectNodes, this));
        broker.registerMethod('attachViewAfter', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], lang_1.FunctionWrapper.bind(this._attachViewAfter, this));
        broker.registerMethod('detachView', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], lang_1.FunctionWrapper.bind(this._detachView, this));
        broker.registerMethod('destroyView', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], lang_1.FunctionWrapper.bind(this._destroyView, this));
        broker.registerMethod('setElementProperty', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._setElementProperty, this));
        broker.registerMethod('setElementAttribute', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._setElementAttribute, this));
        broker.registerMethod('setBindingDebugInfo', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._setBindingDebugInfo, this));
        broker.registerMethod('setElementClass', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._setElementClass, this));
        broker.registerMethod('setElementStyle', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._setElementStyle, this));
        broker.registerMethod('invokeElementMethod', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._invokeElementMethod, this));
        broker.registerMethod('setText', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._setText, this));
        broker.registerMethod('listen', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._listen, this));
        broker.registerMethod('listenGlobal', [serializer_1.RenderStoreObject, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE, serializer_1.PRIMITIVE], lang_1.FunctionWrapper.bind(this._listenGlobal, this));
        broker.registerMethod('listenDone', [serializer_1.RenderStoreObject, serializer_1.RenderStoreObject], lang_1.FunctionWrapper.bind(this._listenDone, this));
    };
    MessageBasedRenderer.prototype._renderComponent = function (renderComponentType, rendererId) {
        var renderer = this._rootRenderer.renderComponent(renderComponentType);
        this._renderStore.store(renderer, rendererId);
    };
    MessageBasedRenderer.prototype._selectRootElement = function (renderer, selector, elId) {
        this._renderStore.store(renderer.selectRootElement(selector, null), elId);
    };
    MessageBasedRenderer.prototype._createElement = function (renderer, parentElement, name, elId) {
        this._renderStore.store(renderer.createElement(parentElement, name, null), elId);
    };
    MessageBasedRenderer.prototype._createViewRoot = function (renderer, hostElement, elId) {
        var viewRoot = renderer.createViewRoot(hostElement);
        if (this._renderStore.serialize(hostElement) !== elId) {
            this._renderStore.store(viewRoot, elId);
        }
    };
    MessageBasedRenderer.prototype._createTemplateAnchor = function (renderer, parentElement, elId) {
        this._renderStore.store(renderer.createTemplateAnchor(parentElement, null), elId);
    };
    MessageBasedRenderer.prototype._createText = function (renderer, parentElement, value, elId) {
        this._renderStore.store(renderer.createText(parentElement, value, null), elId);
    };
    MessageBasedRenderer.prototype._projectNodes = function (renderer, parentElement, nodes) {
        renderer.projectNodes(parentElement, nodes);
    };
    MessageBasedRenderer.prototype._attachViewAfter = function (renderer, node, viewRootNodes) {
        renderer.attachViewAfter(node, viewRootNodes);
    };
    MessageBasedRenderer.prototype._detachView = function (renderer, viewRootNodes) {
        renderer.detachView(viewRootNodes);
    };
    MessageBasedRenderer.prototype._destroyView = function (renderer, hostElement, viewAllNodes) {
        renderer.destroyView(hostElement, viewAllNodes);
        for (var i = 0; i < viewAllNodes.length; i++) {
            this._renderStore.remove(viewAllNodes[i]);
        }
    };
    MessageBasedRenderer.prototype._setElementProperty = function (renderer, renderElement, propertyName, propertyValue) {
        renderer.setElementProperty(renderElement, propertyName, propertyValue);
    };
    MessageBasedRenderer.prototype._setElementAttribute = function (renderer, renderElement, attributeName, attributeValue) {
        renderer.setElementAttribute(renderElement, attributeName, attributeValue);
    };
    MessageBasedRenderer.prototype._setBindingDebugInfo = function (renderer, renderElement, propertyName, propertyValue) {
        renderer.setBindingDebugInfo(renderElement, propertyName, propertyValue);
    };
    MessageBasedRenderer.prototype._setElementClass = function (renderer, renderElement, className, isAdd) {
        renderer.setElementClass(renderElement, className, isAdd);
    };
    MessageBasedRenderer.prototype._setElementStyle = function (renderer, renderElement, styleName, styleValue) {
        renderer.setElementStyle(renderElement, styleName, styleValue);
    };
    MessageBasedRenderer.prototype._invokeElementMethod = function (renderer, renderElement, methodName, args) {
        renderer.invokeElementMethod(renderElement, methodName, args);
    };
    MessageBasedRenderer.prototype._setText = function (renderer, renderNode, text) {
        renderer.setText(renderNode, text);
    };
    MessageBasedRenderer.prototype._listen = function (renderer, renderElement, eventName, unlistenId) {
        var _this = this;
        var unregisterCallback = renderer.listen(renderElement, eventName, function (event /** TODO #9100 */) {
            return _this._eventDispatcher.dispatchRenderEvent(renderElement, null, eventName, event);
        });
        this._renderStore.store(unregisterCallback, unlistenId);
    };
    MessageBasedRenderer.prototype._listenGlobal = function (renderer, eventTarget, eventName, unlistenId) {
        var _this = this;
        var unregisterCallback = renderer.listenGlobal(eventTarget, eventName, function (event /** TODO #9100 */) {
            return _this._eventDispatcher.dispatchRenderEvent(null, eventTarget, eventName, event);
        });
        this._renderStore.store(unregisterCallback, unlistenId);
    };
    MessageBasedRenderer.prototype._listenDone = function (renderer, unlistenCallback) { unlistenCallback(); };
    /** @nocollapse */
    MessageBasedRenderer.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MessageBasedRenderer.ctorParameters = [
        { type: service_message_broker_1.ServiceMessageBrokerFactory, },
        { type: message_bus_1.MessageBus, },
        { type: serializer_1.Serializer, },
        { type: render_store_1.RenderStore, },
        { type: core_1.RootRenderer, },
    ];
    return MessageBasedRenderer;
}());
exports.MessageBasedRenderer = MessageBasedRenderer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvc3JjL3dlYl93b3JrZXJzL3VpL3JlbmRlcmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBc0UsZUFBZSxDQUFDLENBQUE7QUFFdEYscUJBQThCLG1CQUFtQixDQUFDLENBQUE7QUFDbEQsNEJBQXlCLHVCQUF1QixDQUFDLENBQUE7QUFDakQsOEJBQThDLHlCQUF5QixDQUFDLENBQUE7QUFDeEUsNkJBQTBCLHdCQUF3QixDQUFDLENBQUE7QUFDbkQsMkJBQXVELHNCQUFzQixDQUFDLENBQUE7QUFDOUUsdUNBQTBDLGtDQUFrQyxDQUFDLENBQUE7QUFDN0UsaUNBQThCLHdCQUF3QixDQUFDLENBQUE7QUFDdkQ7SUFHRSw4QkFDWSxjQUEyQyxFQUFVLElBQWdCLEVBQ3JFLFdBQXVCLEVBQVUsWUFBeUIsRUFDMUQsYUFBMkI7UUFGM0IsbUJBQWMsR0FBZCxjQUFjLENBQTZCO1FBQVUsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNyRSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQzFELGtCQUFhLEdBQWIsYUFBYSxDQUFjO0lBQUcsQ0FBQztJQUUzQyxvQ0FBSyxHQUFMO1FBQ0UsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxnQ0FBZ0IsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLDZCQUFhLENBQUMsQ0FBQztRQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDZCQUFhLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFM0YsTUFB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