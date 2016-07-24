/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var post_message_bus_1 = require('@angular/platform-browser/src/web_workers/shared/post_message_bus');
/*
 * Returns a PostMessageBus thats sink is connected to its own source.
 * Useful for testing the sink and source.
 */
function createConnectedMessageBus() {
    var mockPostMessage = new MockPostMessage();
    var source = new post_message_bus_1.PostMessageBusSource(mockPostMessage);
    var sink = new post_message_bus_1.PostMessageBusSink(mockPostMessage);
    return new post_message_bus_1.PostMessageBus(sink, source);
}
exports.createConnectedMessageBus = createConnectedMessageBus;
var MockPostMessage = (function () {
    function MockPostMessage() {
    }
    MockPostMessage.prototype.addEventListener = function (type, listener, useCapture) {
        if (type === 'message') {
            this._listener = listener;
        }
    };
    MockPostMessage.prototype.postMessage = function (data, transfer) { this._listener({ data: data }); };
    return MockPostMessage;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9idXNfdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci90ZXN0L3dlYl93b3JrZXJzL3NoYXJlZC9tZXNzYWdlX2J1c191dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFHSCxpQ0FBdUUsbUVBQW1FLENBQUMsQ0FBQTtBQUczSTs7O0dBR0c7QUFDSDtJQUNFLElBQUksZUFBZSxHQUFHLElBQUksZUFBZSxFQUFFLENBQUM7SUFDNUMsSUFBSSxNQUFNLEdBQUcsSUFBSSx1Q0FBb0IsQ0FBTSxlQUFlLENBQUMsQ0FBQztJQUM1RCxJQUFJLElBQUksR0FBRyxJQUFJLHFDQUFrQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBRW5ELE1BQU0sQ0FBQyxJQUFJLGlDQUFjLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFOZSxpQ0FBeUIsNEJBTXhDLENBQUE7QUFFRDtJQUFBO0lBVUEsQ0FBQztJQVBDLDBDQUFnQixHQUFoQixVQUFpQixJQUFZLEVBQUUsUUFBdUIsRUFBRSxVQUFvQjtRQUMxRSxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQztJQUVELHFDQUFXLEdBQVgsVUFBWSxJQUFTLEVBQUUsUUFBd0IsSUFBVSxJQUFJLENBQUMsU0FBUyxDQUFNLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9GLHNCQUFDO0FBQUQsQ0FBQyxBQVZELElBVUMifQ==