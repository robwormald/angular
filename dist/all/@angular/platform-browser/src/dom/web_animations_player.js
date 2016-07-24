/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var collection_1 = require('../facade/collection');
var lang_1 = require('../facade/lang');
var dom_adapter_1 = require('./dom_adapter');
var WebAnimationsPlayer = (function () {
    function WebAnimationsPlayer(element, keyframes, options) {
        this.element = element;
        this.keyframes = keyframes;
        this.options = options;
        this._subscriptions = [];
        this._finished = false;
        this._initialized = false;
        this._started = false;
        this.parentPlayer = null;
        this._duration = options['duration'];
    }
    WebAnimationsPlayer.prototype._onFinish = function () {
        if (!this._finished) {
            this._finished = true;
            if (!lang_1.isPresent(this.parentPlayer)) {
                this.destroy();
            }
            this._subscriptions.forEach(function (fn) { return fn(); });
            this._subscriptions = [];
        }
    };
    WebAnimationsPlayer.prototype.init = function () {
        var _this = this;
        if (this._initialized)
            return;
        this._initialized = true;
        var keyframes = this.keyframes.map(function (styles) {
            var formattedKeyframe = {};
            collection_1.StringMapWrapper.forEach(styles, function (value, prop) {
                formattedKeyframe[prop] = value == core_1.AUTO_STYLE ? _computeStyle(_this.element, prop) : value;
            });
            return formattedKeyframe;
        });
        this._player = this._triggerWebAnimation(this.element, keyframes, this.options);
        // this is required so that the player doesn't start to animate right away
        this.reset();
        this._player.onfinish = function () { return _this._onFinish(); };
    };
    /** @internal */
    WebAnimationsPlayer.prototype._triggerWebAnimation = function (element, keyframes, options) {
        return element.animate(keyframes, options);
    };
    WebAnimationsPlayer.prototype.onDone = function (fn) { this._subscriptions.push(fn); };
    WebAnimationsPlayer.prototype.play = function () {
        this.init();
        this._player.play();
    };
    WebAnimationsPlayer.prototype.pause = function () {
        this.init();
        this._player.pause();
    };
    WebAnimationsPlayer.prototype.finish = function () {
        this.init();
        this._onFinish();
        this._player.finish();
    };
    WebAnimationsPlayer.prototype.reset = function () { this._player.cancel(); };
    WebAnimationsPlayer.prototype.restart = function () {
        this.reset();
        this.play();
    };
    WebAnimationsPlayer.prototype.hasStarted = function () { return this._started; };
    WebAnimationsPlayer.prototype.destroy = function () {
        this.reset();
        this._onFinish();
    };
    Object.defineProperty(WebAnimationsPlayer.prototype, "totalTime", {
        get: function () { return this._duration; },
        enumerable: true,
        configurable: true
    });
    WebAnimationsPlayer.prototype.setPosition = function (p) { this._player.currentTime = p * this.totalTime; };
    WebAnimationsPlayer.prototype.getPosition = function () { return this._player.currentTime / this.totalTime; };
    return WebAnimationsPlayer;
}());
exports.WebAnimationsPlayer = WebAnimationsPlayer;
function _computeStyle(element, prop) {
    return dom_adapter_1.getDOM().getComputedStyle(element)[prop];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViX2FuaW1hdGlvbnNfcGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3NyYy9kb20vd2ViX2FuaW1hdGlvbnNfcGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFHekMsMkJBQStCLHNCQUFzQixDQUFDLENBQUE7QUFDdEQscUJBQXdCLGdCQUFnQixDQUFDLENBQUE7QUFFekMsNEJBQXFCLGVBQWUsQ0FBQyxDQUFBO0FBR3JDO0lBVUUsNkJBQ1csT0FBWSxFQUFTLFNBQTZDLEVBQ2xFLE9BQXlDO1FBRHpDLFlBQU8sR0FBUCxPQUFPLENBQUs7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUFvQztRQUNsRSxZQUFPLEdBQVAsT0FBTyxDQUFrQztRQVg1QyxtQkFBYyxHQUFlLEVBQUUsQ0FBQztRQUNoQyxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLGlCQUFZLEdBQUcsS0FBSyxDQUFDO1FBRXJCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFHM0IsaUJBQVksR0FBb0IsSUFBSSxDQUFDO1FBSzFDLElBQUksQ0FBQyxTQUFTLEdBQVcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFTyx1Q0FBUyxHQUFqQjtRQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQixDQUFDO1lBQ0QsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQSxF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