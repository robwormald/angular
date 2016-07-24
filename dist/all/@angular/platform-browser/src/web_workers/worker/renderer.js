/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var async_1 = require('../../facade/async');
var collection_1 = require('../../facade/collection');
var lang_1 = require('../../facade/lang');
var client_message_broker_1 = require('../shared/client_message_broker');
var message_bus_1 = require('../shared/message_bus');
var messaging_api_1 = require('../shared/messaging_api');
var render_store_1 = require('../shared/render_store');
var serializer_1 = require('../shared/serializer');
var event_deserializer_1 = require('./event_deserializer');
var WebWorkerRootRenderer = (function () {
    function WebWorkerRootRenderer(messageBrokerFactory, bus, _serializer, _renderStore) {
        var _this = this;
        this._serializer = _serializer;
        this._renderStore = _renderStore;
        this.globalEvents = new NamedEventEmitter();
        this._componentRenderers = new Map();
        this._messageBroker = messageBrokerFactory.createMessageBroker(messaging_api_1.RENDERER_CHANNEL);
        bus.initChannel(messaging_api_1.EVENT_CHANNEL);
        var source = bus.from(messaging_api_1.EVENT_CHANNEL);
        async_1.ObservableWrapper.subscribe(source, function (message) { return _this._dispatchEvent(message); });
    }
    WebWorkerRootRenderer.prototype._dispatchEvent = function (message) {
        var eventName = message['eventName'];
        var target = message['eventTarget'];
        var event = event_deserializer_1.deserializeGenericEvent(message['event']);
        if (lang_1.isPresent(target)) {
            this.globalEvents.dispatchEvent(eventNameWithTarget(target, eventName), event);
        }
        else {
            var element = this._serializer.deserialize(message['element'], serializer_1.RenderStoreObject);
            element.events.dispatchEvent(eventName, event);
        }
    };
    WebWorkerRootRenderer.prototype.renderComponent = function (componentType) {
        var result = this._componentRenderers.get(componentType.id);
        if (lang_1.isBlank(result)) {
            result = new WebWorkerRenderer(this, componentType);
            this._componentRenderers.set(componentType.id, result);
            var id = this._renderStore.allocateId();
            this._renderStore.store(result, id);
            this.runOnService('renderComponent', [
                new client_message_broker_1.FnArg(componentType, core_1.RenderComponentType),
                new client_message_broker_1.FnArg(result, serializer_1.RenderStoreObject),
            ]);
        }
        return result;
    };
    WebWorkerRootRenderer.prototype.runOnService = function (fnName, fnArgs) {
        var args = new client_message_broker_1.UiArguments(fnName, fnArgs);
        this._messageBroker.runOnService(args, null);
    };
    WebWorkerRootRenderer.prototype.allocateNode = function () {
        var result = new WebWorkerRenderNode();
        var id = this._renderStore.allocateId();
        this._renderStore.store(result, id);
        return result;
    };
    WebWorkerRootRenderer.prototype.allocateId = function () { return this._renderStore.allocateId(); };
    WebWorkerRootRenderer.prototype.destroyNodes = function (nodes) {
        for (var i = 0; i < nodes.length; i++) {
            this._renderStore.remove(nodes[i]);
        }
    };
    /** @nocollapse */
    WebWorkerRootRenderer.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    WebWorkerRootRenderer.ctorParameters = [
        { type: client_message_broker_1.ClientMessageBrokerFactory, },
        { type: message_bus_1.MessageBus, },
        { type: serializer_1.Serializer, },
        { type: render_store_1.RenderStore, },
    ];
    return WebWorkerRootRenderer;
}());
exports.WebWorkerRootRenderer = WebWorkerRootRenderer;
var WebWorkerRenderer = (function () {
    function WebWorkerRenderer(_rootRenderer, _componentType) {
        this._rootRenderer = _rootRenderer;
        this._componentType = _componentType;
    }
    WebWorkerRenderer.prototype._runOnService = function (fnName, fnArgs) {
        var fnArgsWithRenderer = [new client_message_broker_1.FnArg(this, serializer_1.RenderStoreObject)].concat(fnArgs);
        this._rootRenderer.runOnService(fnName, fnArgsWithRenderer);
    };
    WebWorkerRenderer.prototype.selectRootElement = function (selectorOrNode, debugInfo) {
        var node = this._rootRenderer.allocateNode();
        this._runOnService('selectRootElement', [new client_message_broker_1.FnArg(selectorOrNode, null), new client_message_broker_1.FnArg(node, serializer_1.RenderStoreObject)]);
        return node;
    };
    WebWorkerRenderer.prototype.createElement = function (parentElement, name, debugInfo) {
        var node = this._rootRenderer.allocateNode();
        this._runOnService('createElement', [
            new client_message_broker_1.FnArg(parentElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(name, null),
            new client_message_broker_1.FnArg(node, serializer_1.RenderStoreObject)
        ]);
        return node;
    };
    WebWorkerRenderer.prototype.createViewRoot = function (hostElement) {
        var viewRoot = this._componentType.encapsulation === core_1.ViewEncapsulation.Native ?
            this._rootRenderer.allocateNode() :
            hostElement;
        this._runOnService('createViewRoot', [new client_message_broker_1.FnArg(hostElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(viewRoot, serializer_1.RenderStoreObject)]);
        return viewRoot;
    };
    WebWorkerRenderer.prototype.createTemplateAnchor = function (parentElement, debugInfo) {
        var node = this._rootRenderer.allocateNode();
        this._runOnService('createTemplateAnchor', [new client_message_broker_1.FnArg(parentElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(node, serializer_1.RenderStoreObject)]);
        return node;
    };
    WebWorkerRenderer.prototype.createText = function (parentElement, value, debugInfo) {
        var node = this._rootRenderer.allocateNode();
        this._runOnService('createText', [
            new client_message_broker_1.FnArg(parentElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(value, null),
            new client_message_broker_1.FnArg(node, serializer_1.RenderStoreObject)
        ]);
        return node;
    };
    WebWorkerRenderer.prototype.projectNodes = function (parentElement, nodes) {
        this._runOnService('projectNodes', [new client_message_broker_1.FnArg(parentElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(nodes, serializer_1.RenderStoreObject)]);
    };
    WebWorkerRenderer.prototype.attachViewAfter = function (node, viewRootNodes) {
        this._runOnService('attachViewAfter', [new client_message_broker_1.FnArg(node, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(viewRootNodes, serializer_1.RenderStoreObject)]);
    };
    WebWorkerRenderer.prototype.detachView = function (viewRootNodes) {
        this._runOnService('detachView', [new client_message_broker_1.FnArg(viewRootNodes, serializer_1.RenderStoreObject)]);
    };
    WebWorkerRenderer.prototype.destroyView = function (hostElement, viewAllNodes) {
        this._runOnService('destroyView', [new client_message_broker_1.FnArg(hostElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(viewAllNodes, serializer_1.RenderStoreObject)]);
        this._rootRenderer.destroyNodes(viewAllNodes);
    };
    WebWorkerRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
        this._runOnService('setElementProperty', [
            new client_message_broker_1.FnArg(renderElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(propertyName, null),
            new client_message_broker_1.FnArg(propertyValue, null)
        ]);
    };
    WebWorkerRenderer.prototype.setElementAttribute = function (renderElement, attributeName, attributeValue) {
        this._runOnService('setElementAttribute', [
            new client_message_broker_1.FnArg(renderElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(attributeName, null),
            new client_message_broker_1.FnArg(attributeValue, null)
        ]);
    };
    WebWorkerRenderer.prototype.setBindingDebugInfo = function (renderElement, propertyName, propertyValue) {
        this._runOnService('setBindingDebugInfo', [
            new client_message_broker_1.FnArg(renderElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(propertyName, null),
            new client_message_broker_1.FnArg(propertyValue, null)
        ]);
    };
    WebWorkerRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
        this._runOnService('setElementClass', [
            new client_message_broker_1.FnArg(renderElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(className, null),
            new client_message_broker_1.FnArg(isAdd, null)
        ]);
    };
    WebWorkerRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
        this._runOnService('setElementStyle', [
            new client_message_broker_1.FnArg(renderElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(styleName, null),
            new client_message_broker_1.FnArg(styleValue, null)
        ]);
    };
    WebWorkerRenderer.prototype.invokeElementMethod = function (renderElement, methodName, args) {
        this._runOnService('invokeElementMethod', [
            new client_message_broker_1.FnArg(renderElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(methodName, null),
            new client_message_broker_1.FnArg(args, null)
        ]);
    };
    WebWorkerRenderer.prototype.setText = function (renderNode, text) {
        this._runOnService('setText', [new client_message_broker_1.FnArg(renderNode, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(text, null)]);
    };
    WebWorkerRenderer.prototype.listen = function (renderElement, name, callback) {
        var _this = this;
        renderElement.events.listen(name, callback);
        var unlistenCallbackId = this._rootRenderer.allocateId();
        this._runOnService('listen', [
            new client_message_broker_1.FnArg(renderElement, serializer_1.RenderStoreObject), new client_message_broker_1.FnArg(name, null),
            new client_message_broker_1.FnArg(unlistenCallbackId, null)
        ]);
        return function () {
            renderElement.events.unlisten(name, callback);
            _this._runOnService('listenDone', [new client_message_broker_1.FnArg(unlistenCallbackId, null)]);
        };
    };
    WebWorkerRenderer.prototype.listenGlobal = function (target, name, callback) {
        var _this = this;
        this._rootRenderer.globalEvents.listen(eventNameWithTarget(target, name), callback);
        var unlistenCallbackId = this._rootRenderer.allocateId();
        this._runOnService('listenGlobal', [new client_message_broker_1.FnArg(target, null), new client_message_broker_1.FnArg(name, null), new client_message_broker_1.FnArg(unlistenCallbackId, null)]);
        return function () {
            _this._rootRenderer.globalEvents.unlisten(eventNameWithTarget(target, name), callback);
            _this._runOnService('listenDone', [new client_message_broker_1.FnArg(unlistenCallbackId, null)]);
        };
    };
    WebWorkerRenderer.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing) {
        // TODO
        return null;
    };
    return WebWorkerRenderer;
}());
exports.WebWorkerRenderer = WebWorkerRenderer;
var NamedEventEmitter = (function () {
    function NamedEventEmitter() {
    }
    NamedEventEmitter.prototype._getListeners = function (eventName) {
        if (lang_1.isBlank(this._listeners)) {
            this._listeners = new Map();
        }
        var listeners = this._listeners.get(eventName);
        if (lang_1.isBlank(listeners)) {
            listeners = [];
            this._listeners.set(eventName, listeners);
        }
        return listeners;
    };
    NamedEventEmitter.prototype.listen = function (eventName, callback) { this._getListeners(eventName).push(callback); };
    NamedEventEmitter.prototype.unlisten = function (eventName, callback) {
        collection_1.ListWrapper.remove(this._getListeners(eventName), callback);
    };
    NamedEventEmitter.prototype.dispatchEvent = function (eventName, event) {
        var listeners = this._getListeners(eventName);
        for (var i = 0; i < listeners.length; i++) {
            listeners[i](event);
        }
    };
    return NamedEventEmitter;
}());
exports.NamedEventEmitter = NamedEventEmitter;
function eventNameWithTarget(target, eventName) {
    return target + ":" + eventName;
}
var WebWorkerRenderNode = (function () {
    function WebWorkerRenderNode() {
        this.events = new NamedEventEmitter();
    }
    return WebWorkerRenderNode;
}());
exports.WebWorkerRenderNode = WebWorkerRenderNode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci9yZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQXlGLGVBQWUsQ0FBQyxDQUFBO0FBR3pHLHNCQUFnQyxvQkFBb0IsQ0FBQyxDQUFBO0FBQ3JELDJCQUEwQix5QkFBeUIsQ0FBQyxDQUFBO0FBQ3BELHFCQUFpQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3JELHNDQUE2RCxpQ0FBaUMsQ0FBQyxDQUFBO0FBQy9GLDRCQUF5Qix1QkFBdUIsQ0FBQyxDQUFBO0FBQ2pELDhCQUE4Qyx5QkFBeUIsQ0FBQyxDQUFBO0FBQ3hFLDZCQUEwQix3QkFBd0IsQ0FBQyxDQUFBO0FBQ25ELDJCQUE0QyxzQkFBc0IsQ0FBQyxDQUFBO0FBRW5FLG1DQUFzQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQzdEO0lBTUUsK0JBQ0ksb0JBQWdELEVBQUUsR0FBZSxFQUN6RCxXQUF1QixFQUFVLFlBQXlCO1FBUnhFLGlCQXlFQztRQWpFYSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBTi9ELGlCQUFZLEdBQXNCLElBQUksaUJBQWlCLEVBQUUsQ0FBQztRQUN6RCx3QkFBbUIsR0FDdkIsSUFBSSxHQUFHLEVBQTZCLENBQUM7UUFLdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQyxtQkFBbUIsQ0FBQyxnQ0FBZ0IsQ0FBQyxDQUFDO1FBQ2pGLEdBQUcsQ0FBQyxXQUFXLENBQUMsNkJBQWEsQ0FBQyxDQUFDO1FBQy9CLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsNkJBQWEsQ0FBQyxDQUFDO1FBQ3JDLHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsVUFB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