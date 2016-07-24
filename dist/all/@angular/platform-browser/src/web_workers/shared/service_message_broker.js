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
var async_1 = require('../../facade/async');
var collection_1 = require('../../facade/collection');
var lang_1 = require('../../facade/lang');
var message_bus_1 = require('../shared/message_bus');
var serializer_1 = require('../shared/serializer');
/**
 * @experimental WebWorker support in Angular is currently experimental.
 */
var ServiceMessageBrokerFactory = (function () {
    function ServiceMessageBrokerFactory() {
    }
    return ServiceMessageBrokerFactory;
}());
exports.ServiceMessageBrokerFactory = ServiceMessageBrokerFactory;
var ServiceMessageBrokerFactory_ = (function (_super) {
    __extends(ServiceMessageBrokerFactory_, _super);
    function ServiceMessageBrokerFactory_(_messageBus, _serializer) {
        _super.call(this);
        this._messageBus = _messageBus;
        this._serializer = _serializer;
    }
    ServiceMessageBrokerFactory_.prototype.createMessageBroker = function (channel, runInZone) {
        if (runInZone === void 0) { runInZone = true; }
        this._messageBus.initChannel(channel, runInZone);
        return new ServiceMessageBroker_(this._messageBus, this._serializer, channel);
    };
    /** @nocollapse */
    ServiceMessageBrokerFactory_.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ServiceMessageBrokerFactory_.ctorParameters = [
        { type: message_bus_1.MessageBus, },
        { type: serializer_1.Serializer, },
    ];
    return ServiceMessageBrokerFactory_;
}(ServiceMessageBrokerFactory));
exports.ServiceMessageBrokerFactory_ = ServiceMessageBrokerFactory_;
/**
 * Helper class for UIComponents that allows components to register methods.
 * If a registered method message is received from the broker on the worker,
 * the UIMessageBroker deserializes its arguments and calls the registered method.
 * If that method returns a promise, the UIMessageBroker returns the result to the worker.
 *
 * @experimental WebWorker support in Angular is currently experimental.
 */
var ServiceMessageBroker = (function () {
    function ServiceMessageBroker() {
    }
    return ServiceMessageBroker;
}());
exports.ServiceMessageBroker = ServiceMessageBroker;
var ServiceMessageBroker_ = (function (_super) {
    __extends(ServiceMessageBroker_, _super);
    function ServiceMessageBroker_(messageBus, _serializer, channel /** TODO #9100 */) {
        var _this = this;
        _super.call(this);
        this._serializer = _serializer;
        this.channel = channel;
        this._methods = new collection_1.Map();
        this._sink = messageBus.to(channel);
        var source = messageBus.from(channel);
        async_1.ObservableWrapper.subscribe(source, function (message) { return _this._handleMessage(message); });
    }
    ServiceMessageBroker_.prototype.registerMethod = function (methodName, signature, method, returnType) {
        var _this = this;
        this._methods.set(methodName, function (message) {
            var serializedArgs = message.args;
            var numArgs = signature === null ? 0 : signature.length;
            var deserializedArgs = collection_1.ListWrapper.createFixedSize(numArgs);
            for (var i = 0; i < numArgs; i++) {
                var serializedArg = serializedArgs[i];
                deserializedArgs[i] = _this._serializer.deserialize(serializedArg, signature[i]);
            }
            var promise = lang_1.FunctionWrapper.apply(method, deserializedArgs);
            if (lang_1.isPresent(returnType) && lang_1.isPresent(promise)) {
                _this._wrapWebWorkerPromise(message.id, promise, returnType);
            }
        });
    };
    ServiceMessageBroker_.prototype._handleMessage = function (map) {
        var message = new ReceivedMessage(map);
        if (this._methods.has(message.method)) {
            this._methods.get(message.method)(message);
        }
    };
    ServiceMessageBroker_.prototype._wrapWebWorkerPromise = function (id, promise, type) {
        var _this = this;
        async_1.PromiseWrapper.then(promise, function (result) {
            async_1.ObservableWrapper.callEmit(_this._sink, { 'type': 'result', 'value': _this._serializer.serialize(result, type), 'id': id });
        });
    };
    return ServiceMessageBroker_;
}(ServiceMessageBroker));
exports.ServiceMessageBroker_ = ServiceMessageBroker_;
/**
 * @experimental WebWorker support in Angular is currently experimental.
 */
var ReceivedMessage = (function () {
    function ReceivedMessage(data) {
        this.method = data['method'];
        this.args = data['args'];
        this.id = data['id'];
        this.type = data['type'];
    }
    return ReceivedMessage;
}());
exports.ReceivedMessage = ReceivedMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZV9tZXNzYWdlX2Jyb2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9zcmMvd2ViX3dvcmtlcnMvc2hhcmVkL3NlcnZpY2VfbWVzc2FnZV9icm9rZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBRXpDLHNCQUE4RCxvQkFBb0IsQ0FBQyxDQUFBO0FBQ25GLDJCQUErQix5QkFBeUIsQ0FBQyxDQUFBO0FBQ3pELHFCQUErQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ25FLDRCQUF5Qix1QkFBdUIsQ0FBQyxDQUFBO0FBQ2pELDJCQUF5QixzQkFBc0IsQ0FBQyxDQUFBO0FBRWhEOztHQUVHO0FBQ0g7SUFBQTtJQUtBLENBQUM7SUFBRCxrQ0FBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTHFCLG1DQUEyQiw4QkFLaEQsQ0FBQTtBQUNEO0lBQWtELGdEQUEyQjtJQUkzRSxzQ0FBb0IsV0FBdUIsRUFBRSxXQUF1QjtRQUNsRSxpQkFBTyxDQUFDO1FBRFUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7UUFFekMsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQztJQUVELDBEQUFtQixHQUFuQixVQUFvQixPQUFlLEVBQUUsU0FBeUI7UUFBekIseUJBQXlCLEdBQXpCLGdCQUF5QjtRQUM1RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ2hGLENBQUM7SUFDSCxrQkFBa0I7SUFDWCx1Q0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUks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