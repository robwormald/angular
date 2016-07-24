/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var lang_1 = require('../src/facade/lang');
var MockAnimationPlayer = (function () {
    function MockAnimationPlayer() {
        this._subscriptions = [];
        this._finished = false;
        this._destroyed = false;
        this._started = false;
        this.parentPlayer = null;
        this.log = [];
    }
    MockAnimationPlayer.prototype._onfinish = function () {
        if (!this._finished) {
            this._finished = true;
            this.log.push('finish');
            this._subscriptions.forEach(function (entry) { entry(); });
            this._subscriptions = [];
            if (!lang_1.isPresent(this.parentPlayer)) {
                this.destroy();
            }
        }
    };
    MockAnimationPlayer.prototype.init = function () { this.log.push('init'); };
    MockAnimationPlayer.prototype.onDone = function (fn) { this._subscriptions.push(fn); };
    MockAnimationPlayer.prototype.hasStarted = function () { return this._started; };
    MockAnimationPlayer.prototype.play = function () {
        this._started = true;
        this.log.push('play');
    };
    MockAnimationPlayer.prototype.pause = function () { this.log.push('pause'); };
    MockAnimationPlayer.prototype.restart = function () { this.log.push('restart'); };
    MockAnimationPlayer.prototype.finish = function () { this._onfinish(); };
    MockAnimationPlayer.prototype.reset = function () { this.log.push('reset'); };
    MockAnimationPlayer.prototype.destroy = function () {
        if (!this._destroyed) {
            this._destroyed = true;
            this.finish();
            this.log.push('destroy');
        }
    };
    MockAnimationPlayer.prototype.setPosition = function (p /** TODO #9100 */) { };
    MockAnimationPlayer.prototype.getPosition = function () { return 0; };
    return MockAnimationPlayer;
}());
exports.MockAnimationPlayer = MockAnimationPlayer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19hbmltYXRpb25fcGxheWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3RpbmcvbW9ja19hbmltYXRpb25fcGxheWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFHSCxxQkFBd0Isb0JBQW9CLENBQUMsQ0FBQTtBQUU3QztJQUFBO1FBQ1UsbUJBQWMsR0FBNEIsRUFBRSxDQUFDO1FBQzdDLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFDbEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRTNCLGlCQUFZLEdBQW9CLElBQUksQ0FBQztRQUVyQyxRQUFHLEdBQTRCLEVBQUUsQ0FBQztJQTRDM0MsQ0FBQztJQTFDUyx1Q0FBUyxHQUFqQjtRQUNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFFeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLElBQU8sS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsY0FBYyxHQUFHLEVBQUUsQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2pCLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELGtDQUFJLEdBQUosY0FBZSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdkMsb0NBQU0sR0FBTixVQUFPLEVBQVksSUFBVSxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUQsd0NBQVUsR0FBVixjQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUV0QyxrQ0FBSSxHQUFKO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQUVELG1DQUFLLEdBQUwsY0FBZ0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXpDLHFDQUFPLEdBQVAsY0FBa0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTdDLG9DQUFNLEdBQU4sY0FBaUIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVwQyxtQ0FBSyxHQUFMLGNBQWdCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV6QyxxQ0FBTyxHQUFQO1FBQ0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDZCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQixDQUFDO0lBQ0gsQ0FBQztJQUVELHlDQUFXLEdBQVgsVUFBWSxDQUFNLENBQUMsaUJBQWlCLElBQVMsQ0FBQztJQUM5Qyx5Q0FBVyxHQUFYLGNBQXdCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLDBCQUFDO0FBQUQsQ0FBQyxBQXBERCxJQW9EQztBQXBEWSwyQkFBbUIsc0JBb0QvQixDQUFBIn0=