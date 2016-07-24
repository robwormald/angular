/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var async_1 = require('@angular/core/src/facade/async');
var AsyncApplication = (function () {
    function AsyncApplication() {
        this.val1 = 0;
        this.val2 = 0;
        this.val3 = 0;
        this.val4 = 0;
        this.timeoutId = null;
        this.multiTimeoutId = null;
        this.intervalId = null;
    }
    AsyncApplication.prototype.increment = function () { this.val1++; };
    ;
    AsyncApplication.prototype.delayedIncrement = function () {
        var _this = this;
        this.cancelDelayedIncrement();
        this.timeoutId = async_1.TimerWrapper.setTimeout(function () {
            _this.val2++;
            _this.timeoutId = null;
        }, 2000);
    };
    ;
    AsyncApplication.prototype.multiDelayedIncrements = function (i) {
        this.cancelMultiDelayedIncrements();
        var self = this;
        function helper(_i /** TODO #9100 */) {
            if (_i <= 0) {
                self.multiTimeoutId = null;
                return;
            }
            self.multiTimeoutId = async_1.TimerWrapper.setTimeout(function () {
                self.val3++;
                helper(_i - 1);
            }, 500);
        }
        helper(i);
    };
    ;
    AsyncApplication.prototype.periodicIncrement = function () {
        var _this = this;
        this.cancelPeriodicIncrement();
        this.intervalId = async_1.TimerWrapper.setInterval(function () { _this.val4++; }, 2000);
    };
    ;
    AsyncApplication.prototype.cancelDelayedIncrement = function () {
        if (this.timeoutId != null) {
            async_1.TimerWrapper.clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    };
    ;
    AsyncApplication.prototype.cancelMultiDelayedIncrements = function () {
        if (this.multiTimeoutId != null) {
            async_1.TimerWrapper.clearTimeout(this.multiTimeoutId);
            this.multiTimeoutId = null;
        }
    };
    ;
    AsyncApplication.prototype.cancelPeriodicIncrement = function () {
        if (this.intervalId != null) {
            async_1.TimerWrapper.clearInterval(this.intervalId);
            this.intervalId = null;
        }
    };
    ;
    /** @nocollapse */
    AsyncApplication.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'async-app',
                    template: "\n    <div id='increment'>\n      <span class='val'>{{val1}}</span>\n      <button class='action' (click)=\"increment()\">Increment</button>\n    </div>\n    <div id='delayedIncrement'>\n      <span class='val'>{{val2}}</span>\n      <button class='action' (click)=\"delayedIncrement()\">Delayed Increment</button>\n      <button class='cancel' *ngIf=\"timeoutId != null\" (click)=\"cancelDelayedIncrement()\">Cancel</button>\n    </div>\n    <div id='multiDelayedIncrements'>\n      <span class='val'>{{val3}}</span>\n      <button class='action' (click)=\"multiDelayedIncrements(10)\">10 Delayed Increments</button>\n      <button class='cancel' *ngIf=\"multiTimeoutId != null\" (click)=\"cancelMultiDelayedIncrements()\">Cancel</button>\n    </div>\n    <div id='periodicIncrement'>\n      <span class='val'>{{val4}}</span>\n      <button class='action' (click)=\"periodicIncrement()\">Periodic Increment</button>\n      <button class='cancel' *ngIf=\"intervalId != null\" (click)=\"cancelPeriodicIncrement()\">Cancel</button>\n    </div>\n  ",
                    directives: [common_1.NgIf]
                },] },
    ];
    return AsyncApplication;
}());
function main() {
    platform_browser_dynamic_1.bootstrap(AsyncApplication);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL2FzeW5jL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5Q0FBd0IsbUNBQW1DLENBQUMsQ0FBQTtBQUM1RCxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsdUJBQW1CLGlCQUFpQixDQUFDLENBQUE7QUFDckMsc0JBQTJCLGdDQUFnQyxDQUFDLENBQUE7QUFDNUQ7SUFBQTtRQUNFLFNBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsU0FBSSxHQUFXLENBQUMsQ0FBQztRQUNqQixTQUFJLEdBQVcsQ0FBQyxDQUFDO1FBQ2pCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFDakIsY0FBUyxHQUEwQixJQUFJLENBQUM7UUFDeEMsbUJBQWMsR0FBMEIsSUFBSSxDQUFDO1FBQzdDLGVBQVUsR0FBMEIsSUFBSSxDQUFDO0lBbUYzQyxDQUFDO0lBakZDLG9DQUFTLEdBQVQsY0FBb0IsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQzs7SUFFbEMsMkNBQWdCLEdBQWhCO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFZLENBQUMsVUFBVSxDQUFDO1lBQ3ZDLEtBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNaLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNYLENBQUM7O0lBRUQsaURBQXNCLEdBQXRCLFVBQXVCLENBQVM7UUFDOUIsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7UUFFcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLGdCQUFnQixFQUFPLENBQUMsaUJBQWlCO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNaLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUMzQixNQUFNLENBQUM7WUFDVCxDQUFDO1lBRUQsSUFBSSxDQUFDLGNBQWMsR0FBRyxvQkFBWSxDQUFDLFVBQVUsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNaLE1BQU0sQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1YsQ0FBQztRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNaLENBQUM7O0lBRUQsNENBQWlCLEdBQWpCO1FBQUEsaUJBR0M7UUFGQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLG9CQUFZLENBQUMsV0FBVyxDQUFDLGNBQVEsS0FBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzFFLENBQUM7O0lBRUQsaURBQXNCLEdBQXRCO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzNCLG9CQUFZLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN4QixDQUFDO0lBQ0gsQ0FBQzs7SUFFRCx1REFBNEIsR0FBNUI7UUFDRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEMsb0JBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDOztJQUVELGtEQUF1QixHQUF2QjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QixvQkFBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQztJQUNILENBQUM7O0lBQ0gsa0JBQWtCO0lBQ1gsMkJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSx1aENBb0JUO29CQUNELFVBQVUsRUFBRSxDQUFDLGFBQUksQ0FBQztpQkFDbkIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLHVCQUFDO0FBQUQsQ0FBQyxBQTFGRCxJQTBGQztBQUVEO0lBQ0Usb0NBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFGZSxZQUFJLE9BRW5CLENBQUEifQ==