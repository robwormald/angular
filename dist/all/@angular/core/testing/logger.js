/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var index_1 = require('../index');
var Log = (function () {
    function Log() {
        this.logItems = [];
    }
    Log.prototype.add = function (value /** TODO #9100 */) { this.logItems.push(value); };
    Log.prototype.fn = function (value /** TODO #9100 */) {
        var _this = this;
        return function (a1, a2, a3, a4, a5) {
            if (a1 === void 0) { a1 = null; }
            if (a2 === void 0) { a2 = null; }
            if (a3 === void 0) { a3 = null; }
            if (a4 === void 0) { a4 = null; }
            if (a5 === void 0) { a5 = null; }
            _this.logItems.push(value);
        };
    };
    Log.prototype.clear = function () { this.logItems = []; };
    Log.prototype.result = function () { return this.logItems.join('; '); };
    /** @nocollapse */
    Log.decorators = [
        { type: index_1.Injectable },
    ];
    /** @nocollapse */
    Log.ctorParameters = [];
    return Log;
}());
exports.Log = Log;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3RpbmcvbG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxzQkFBeUIsVUFBVSxDQUFDLENBQUE7QUFDcEM7SUFHRTtRQUFnQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUFDLENBQUM7SUFFckMsaUJBQUcsR0FBSCxVQUFJLEtBQVUsQ0FBQyxpQkFBaUIsSUFBVSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFdEUsZ0JBQUUsR0FBRixVQUFHLEtBQVUsQ0FBQyxpQkFBaUI7UUFBL0IsaUJBSUM7UUFIQyxNQUFNLENBQUMsVUFBQyxFQUFjLEVBQUUsRUFBYyxFQUFFLEVBQWMsRUFBRSxFQUFjLEVBQUUsRUFBYztZQUE5RSxrQkFBYyxHQUFkLFNBQWM7WUFBRSxrQkFBYyxHQUFkLFNBQWM7WUFBRSxrQkFBYyxHQUFkLFNBQWM7WUFBRSxrQkFBYyxHQUFkLFNBQWM7WUFBRSxrQkFBYyxHQUFkLFNBQWM7WUFDcEYsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUVELG1CQUFLLEdBQUwsY0FBZ0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXJDLG9CQUFNLEdBQU4sY0FBbUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN2RCxrQkFBa0I7SUFDWCxjQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGtCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGtCQUFjLEdBQTJELEVBQy9FLENBQUM7SUFDRixVQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXZCWSxXQUFHLE1BdUJmLENBQUEifQ==