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
var index_1 = require('../index');
var async_1 = require('../src/facade/async');
var MockNgZone = (function (_super) {
    __extends(MockNgZone, _super);
    function MockNgZone() {
        _super.call(this, { enableLongStackTrace: false });
        this._mockOnStable = new async_1.EventEmitter(false);
    }
    Object.defineProperty(MockNgZone.prototype, "onStable", {
        get: function () { return this._mockOnStable; },
        enumerable: true,
        configurable: true
    });
    MockNgZone.prototype.run = function (fn) { return fn(); };
    MockNgZone.prototype.runOutsideAngular = function (fn) { return fn(); };
    MockNgZone.prototype.simulateZoneExit = function () { async_1.ObservableWrapper.callNext(this.onStable, null); };
    /** @nocollapse */
    MockNgZone.decorators = [
        { type: index_1.Injectable },
    ];
    /** @nocollapse */
    MockNgZone.ctorParameters = [];
    return MockNgZone;
}(index_1.NgZone));
exports.MockNgZone = MockNgZone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfem9uZV9tb2NrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3Rpbmcvbmdfem9uZV9tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILHNCQUFpQyxVQUFVLENBQUMsQ0FBQTtBQUM1QyxzQkFBOEMscUJBQXFCLENBQUMsQ0FBQTtBQUNwRTtJQUFnQyw4QkFBTTtJQUdwQztRQUFnQixrQkFBTSxFQUFDLG9CQUFvQixFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFGN0Msa0JBQWEsR0FBc0IsSUFBSSxvQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWIsQ0FBQztJQUV2RCxzQkFBSSxnQ0FBUTthQUFaLGNBQWlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFN0Msd0JBQUcsR0FBSCxVQUFJLEVBQVksSUFBUyxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXZDLHNDQUFpQixHQUFqQixVQUFrQixFQUFZLElBQVMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVyRCxxQ0FBZ0IsR0FBaEIsY0FBMkIseUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLGtCQUFrQjtJQUNYLHFCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGtCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHlCQUFjLEdBQTJELEVBQy9FLENBQUM7SUFDRixpQkFBQztBQUFELENBQUMsQUFuQkQsQ0FBZ0MsY0FBTSxHQW1CckM7QUFuQlksa0JBQVUsYUFtQnRCLENBQUEifQ==