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
var async_1 = require('../../../src/facade/async');
var MockEventEmitter = (function (_super) {
    __extends(MockEventEmitter, _super);
    function MockEventEmitter() {
        _super.call(this);
        this._nextFns = [];
    }
    MockEventEmitter.prototype.subscribe = function (generator) {
        this._nextFns.push(generator.next);
        return new MockDisposable();
    };
    MockEventEmitter.prototype.emit = function (value) { this._nextFns.forEach(function (fn) { return fn(value); }); };
    return MockEventEmitter;
}(async_1.EventEmitter));
exports.MockEventEmitter = MockEventEmitter;
var MockDisposable = (function () {
    function MockDisposable() {
        this.isUnsubscribed = false;
    }
    MockDisposable.prototype.unsubscribe = function () { };
    return MockDisposable;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19ldmVudF9lbWl0dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3Rlc3Qvd2ViX3dvcmtlcnMvc2hhcmVkL21vY2tfZXZlbnRfZW1pdHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCxzQkFBMkIsMkJBQTJCLENBQUMsQ0FBQTtBQUV2RDtJQUF5QyxvQ0FBZTtJQUd0RDtRQUFnQixpQkFBTyxDQUFDO1FBRmhCLGFBQVEsR0FBZSxFQUFFLENBQUM7SUFFVCxDQUFDO0lBRTFCLG9DQUFTLEdBQVQsVUFBVSxTQUFjO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxNQUFNLENBQUMsSUFBSSxjQUFjLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsK0JBQUksR0FBSixVQUFLLEtBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUUsSUFBSSxPQUFBLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBVCxDQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsdUJBQUM7QUFBRCxDQUFDLEFBWEQsQ0FBeUMsb0JBQVksR0FXcEQ7QUFYWSx3QkFBZ0IsbUJBVzVCLENBQUE7QUFFRDtJQUFBO1FBQ0UsbUJBQWMsR0FBWSxLQUFLLENBQUM7SUFFbEMsQ0FBQztJQURDLG9DQUFXLEdBQVgsY0FBcUIsQ0FBQztJQUN4QixxQkFBQztBQUFELENBQUMsQUFIRCxJQUdDIn0=