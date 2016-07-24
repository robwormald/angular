/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var lang_1 = require('../src/facade/lang');
var MockDomAnimatePlayer = (function () {
    function MockDomAnimatePlayer() {
        this.captures = {};
        this._position = 0;
        this._onfinish = function () { };
    }
    /** @internal */
    MockDomAnimatePlayer.prototype._capture = function (method, data) {
        if (!lang_1.isPresent(this.captures[method])) {
            this.captures[method] = [];
        }
        this.captures[method].push(data);
    };
    MockDomAnimatePlayer.prototype.cancel = function () { this._capture('cancel', null); };
    MockDomAnimatePlayer.prototype.play = function () { this._capture('play', null); };
    MockDomAnimatePlayer.prototype.pause = function () { this._capture('pause', null); };
    MockDomAnimatePlayer.prototype.finish = function () {
        this._capture('finish', null);
        this._onfinish();
    };
    Object.defineProperty(MockDomAnimatePlayer.prototype, "onfinish", {
        get: function () { return this._onfinish; },
        set: function (fn) {
            this._capture('onfinish', fn);
            this._onfinish = fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MockDomAnimatePlayer.prototype, "position", {
        get: function () { return this._position; },
        set: function (val) {
            this._capture('position', val);
            this._position = val;
        },
        enumerable: true,
        configurable: true
    });
    return MockDomAnimatePlayer;
}());
exports.MockDomAnimatePlayer = MockDomAnimatePlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19kb21fYW5pbWF0ZV9wbGF5ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdGluZy9tb2NrX2RvbV9hbmltYXRlX3BsYXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBR0gscUJBQXdCLG9CQUFvQixDQUFDLENBQUE7QUFFN0M7SUFBQTtRQUNTLGFBQVEsR0FBMkIsRUFBRSxDQUFDO1FBQ3JDLGNBQVMsR0FBVyxDQUFDLENBQUM7UUFDdEIsY0FBUyxHQUFhLGNBQU8sQ0FBQyxDQUFDO0lBNEJ6QyxDQUFDO0lBekJDLGdCQUFnQjtJQUNoQix1Q0FBUSxHQUFSLFVBQVMsTUFBYyxFQUFFLElBQVM7UUFDaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDN0IsQ0FBQztRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLENBQUM7SUFFRCxxQ0FBTSxHQUFOLGNBQWlCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRCxtQ0FBSSxHQUFKLGNBQWUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLG9DQUFLLEdBQUwsY0FBZ0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9DLHFDQUFNLEdBQU47UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDbkIsQ0FBQztJQUNELHNCQUFJLDBDQUFRO2FBSVosY0FBMkIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBSm5ELFVBQWEsRUFBWTtZQUN2QixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUN0QixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDBDQUFRO2FBSVosY0FBeUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBSmpELFVBQWEsR0FBVztZQUN0QixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUVILDJCQUFDO0FBQUQsQ0FBQyxBQS9CRCxJQStCQztBQS9CWSw0QkFBb0IsdUJBK0JoQyxDQUFBIn0=