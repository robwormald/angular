/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var promise_1 = require('../src/facade/promise');
/**
 * Injectable completer that allows signaling completion of an asynchronous test. Used internally.
 */
var AsyncTestCompleter = (function () {
    function AsyncTestCompleter() {
        this._completer = new promise_1.PromiseCompleter();
    }
    AsyncTestCompleter.prototype.done = function (value) { this._completer.resolve(value); };
    AsyncTestCompleter.prototype.fail = function (error, stackTrace) { this._completer.reject(error, stackTrace); };
    Object.defineProperty(AsyncTestCompleter.prototype, "promise", {
        get: function () { return this._completer.promise; },
        enumerable: true,
        configurable: true
    });
    return AsyncTestCompleter;
}());
exports.AsyncTestCompleter = AsyncTestCompleter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfdGVzdF9jb21wbGV0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvdGVzdGluZy9hc3luY190ZXN0X2NvbXBsZXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsd0JBQStCLHVCQUF1QixDQUFDLENBQUE7QUFFdkQ7O0dBRUc7QUFDSDtJQUFBO1FBQ1UsZUFBVSxHQUFHLElBQUksMEJBQWdCLEVBQU8sQ0FBQztJQU1uRCxDQUFDO0lBTEMsaUNBQUksR0FBSixVQUFLLEtBQVcsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFckQsaUNBQUksR0FBSixVQUFLLEtBQVcsRUFBRSxVQUFtQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFckYsc0JBQUksdUNBQU87YUFBWCxjQUE4QixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUNqRSx5QkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBUFksMEJBQWtCLHFCQU85QixDQUFBIn0=