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
var MockApplicationRef = (function (_super) {
    __extends(MockApplicationRef, _super);
    function MockApplicationRef() {
        _super.apply(this, arguments);
    }
    MockApplicationRef.prototype.registerBootstrapListener = function (listener) { };
    MockApplicationRef.prototype.registerDisposeListener = function (dispose) { };
    MockApplicationRef.prototype.bootstrap = function (componentFactory) { return null; };
    Object.defineProperty(MockApplicationRef.prototype, "injector", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(MockApplicationRef.prototype, "zone", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    ;
    MockApplicationRef.prototype.run = function (callback) { return null; };
    MockApplicationRef.prototype.waitForAsyncInitializers = function () { return null; };
    MockApplicationRef.prototype.dispose = function () { };
    MockApplicationRef.prototype.tick = function () { };
    Object.defineProperty(MockApplicationRef.prototype, "componentTypes", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    ;
    /** @nocollapse */
    MockApplicationRef.decorators = [
        { type: index_1.Injectable },
    ];
    return MockApplicationRef;
}(index_1.ApplicationRef));
exports.MockApplicationRef = MockApplicationRef;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19hcHBsaWNhdGlvbl9yZWYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvdGVzdGluZy9tb2NrX2FwcGxpY2F0aW9uX3JlZi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCxzQkFBaUcsVUFBVSxDQUFDLENBQUE7QUFDNUc7SUFBd0Msc0NBQWM7SUFBdEQ7UUFBd0MsOEJBQWM7SUF3QnRELENBQUM7SUF2QkMsc0RBQXlCLEdBQXpCLFVBQTBCLFFBQTBDLElBQVMsQ0FBQztJQUU5RSxvREFBdUIsR0FBdkIsVUFBd0IsT0FBbUIsSUFBUyxDQUFDO0lBRXJELHNDQUFTLEdBQVQsVUFBYSxnQkFBcUMsSUFBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFckYsc0JBQUksd0NBQVE7YUFBWixjQUEyQixNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7O0lBRXpDLHNCQUFJLG9DQUFJO2FBQVIsY0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztPQUFBOztJQUVuQyxnQ0FBRyxHQUFILFVBQUksUUFBa0IsSUFBUyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUU3QyxxREFBd0IsR0FBeEIsY0FBMkMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFekQsb0NBQU8sR0FBUCxjQUFpQixDQUFDO0lBRWxCLGlDQUFJLEdBQUosY0FBYyxDQUFDO0lBRWYsc0JBQUksOENBQWM7YUFBbEIsY0FBK0IsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztPQUFBOztJQUMvQyxrQkFBa0I7SUFDWCw2QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxrQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRix5QkFBQztBQUFELENBQUMsQUF4QkQsQ0FBd0Msc0JBQWMsR0F3QnJEO0FBeEJZLDBCQUFrQixxQkF3QjlCLENBQUEifQ==