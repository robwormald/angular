/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
/**
 * @experimental Animation support is experimental.
 */
var AnimationPlayer = (function () {
    function AnimationPlayer() {
    }
    Object.defineProperty(AnimationPlayer.prototype, "parentPlayer", {
        get: function () { throw new exceptions_1.BaseException('NOT IMPLEMENTED: Base Class'); },
        set: function (player) {
            throw new exceptions_1.BaseException('NOT IMPLEMENTED: Base Class');
        },
        enumerable: true,
        configurable: true
    });
    return AnimationPlayer;
}());
exports.AnimationPlayer = AnimationPlayer;
var NoOpAnimationPlayer = (function () {
    function NoOpAnimationPlayer() {
        var _this = this;
        this._subscriptions = [];
        this._started = false;
        this.parentPlayer = null;
        lang_1.scheduleMicroTask(function () { return _this._onFinish(); });
    }
    /** @internal */
    NoOpAnimationPlayer.prototype._onFinish = function () {
        this._subscriptions.forEach(function (entry) { entry(); });
        this._subscriptions = [];
    };
    NoOpAnimationPlayer.prototype.onDone = function (fn) { this._subscriptions.push(fn); };
    NoOpAnimationPlayer.prototype.hasStarted = function () { return this._started; };
    NoOpAnimationPlayer.prototype.init = function () { };
    NoOpAnimationPlayer.prototype.play = function () { this._started = true; };
    NoOpAnimationPlayer.prototype.pause = function () { };
    NoOpAnimationPlayer.prototype.restart = function () { };
    NoOpAnimationPlayer.prototype.finish = function () { this._onFinish(); };
    NoOpAnimationPlayer.prototype.destroy = function () { };
    NoOpAnimationPlayer.prototype.reset = function () { };
    NoOpAnimationPlayer.prototype.setPosition = function (p /** TODO #9100 */) { };
    NoOpAnimationPlayer.prototype.getPosition = function () { return 0; };
    return NoOpAnimationPlayer;
}());
exports.NoOpAnimationPlayer = NoOpAnimationPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3BsYXllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS9zcmMvYW5pbWF0aW9uL2FuaW1hdGlvbl9wbGF5ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILDJCQUE0QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ25ELHFCQUFnQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBR2pEOztHQUVHO0FBQ0g7SUFBQTtJQWdCQSxDQUFDO0lBSkMsc0JBQUkseUNBQVk7YUFBaEIsY0FBc0MsTUFBTSxJQUFJLDBCQUFhLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDL0YsVUFBaUIsTUFBdUI7WUFDdEMsTUFBTSxJQUFJLDBCQUFhLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUN6RCxDQUFDOzs7T0FIOEY7SUFJakcsc0JBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBaEJxQix1QkFBZSxrQkFnQnBDLENBQUE7QUFFRDtJQUlFO1FBSkYsaUJBcUJDO1FBcEJTLG1CQUFjLEdBQTRCLEVBQUUsQ0FBQztRQUM3QyxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGlCQUFZLEdBQW9CLElBQUksQ0FBQztRQUM1Qix3QkFBaUIsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFNBQVMsRUFBRSxFQUFoQixDQUFnQixDQUFDLENBQUM7SUFBQyxDQUFDO0lBQzVELGdCQUFnQjtJQUNoQix1Q0FBUyxHQUFUO1FBQ0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQU0sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBQ0Qsb0NBQU0sR0FBTixVQUFPLEVBQVksSUFBVSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDNUQsd0NBQVUsR0FBVixjQUF3QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDL0Msa0NBQUksR0FBSixjQUFjLENBQUM7SUFDZixrQ0FBSSxHQUFKLGNBQWUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLG1DQUFLLEdBQUwsY0FBZSxDQUFDO0lBQ2hCLHFDQUFPLEdBQVAsY0FBaUIsQ0FBQztJQUNsQixvQ0FBTSxHQUFOLGNBQWlCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEMscUNBQU8sR0FBUCxjQUFpQixDQUFDO0lBQ2xCLG1DQUFLLEdBQUwsY0FBZSxDQUFDO0lBQ2hCLHlDQUFXLEdBQVgsVUFBWSxDQUFNLENBQUMsaUJBQWlCLElBQVMsQ0FBQztJQUM5Qyx5Q0FBVyxHQUFYLGNBQXdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLDBCQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQXJCWSwyQkFBbUIsc0JBcUIvQixDQUFBIn0=