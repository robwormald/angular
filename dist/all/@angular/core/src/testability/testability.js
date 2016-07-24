/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var decorators_1 = require('../di/decorators');
var async_1 = require('../facade/async');
var collection_1 = require('../facade/collection');
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
var ng_zone_1 = require('../zone/ng_zone');
var Testability = (function () {
    function Testability(_ngZone) {
        this._ngZone = _ngZone;
        /** @internal */
        this._pendingCount = 0;
        /** @internal */
        this._isZoneStable = true;
        /**
         * Whether any work was done since the last 'whenStable' callback. This is
         * useful to detect if this could have potentially destabilized another
         * component while it is stabilizing.
         * @internal
         */
        this._didWork = false;
        /** @internal */
        this._callbacks = [];
        this._watchAngularEvents();
    }
    /** @internal */
    Testability.prototype._watchAngularEvents = function () {
        var _this = this;
        async_1.ObservableWrapper.subscribe(this._ngZone.onUnstable, function (_) {
            _this._didWork = true;
            _this._isZoneStable = false;
        });
        this._ngZone.runOutsideAngular(function () {
            async_1.ObservableWrapper.subscribe(_this._ngZone.onStable, function (_) {
                ng_zone_1.NgZone.assertNotInAngularZone();
                lang_1.scheduleMicroTask(function () {
                    _this._isZoneStable = true;
                    _this._runCallbacksIfReady();
                });
            });
        });
    };
    Testability.prototype.increasePendingRequestCount = function () {
        this._pendingCount += 1;
        this._didWork = true;
        return this._pendingCount;
    };
    Testability.prototype.decreasePendingRequestCount = function () {
        this._pendingCount -= 1;
        if (this._pendingCount < 0) {
            throw new exceptions_1.BaseException('pending async requests below zero');
        }
        this._runCallbacksIfReady();
        return this._pendingCount;
    };
    Testability.prototype.isStable = function () {
        return this._isZoneStable && this._pendingCount == 0 && !this._ngZone.hasPendingMacrotasks;
    };
    /** @internal */
    Testability.prototype._runCallbacksIfReady = function () {
        var _this = this;
        if (this.isStable()) {
            // Schedules the call backs in a new frame so that it is always async.
            lang_1.scheduleMicroTask(function () {
                while (_this._callbacks.length !== 0) {
                    (_this._callbacks.pop())(_this._didWork);
                }
                _this._didWork = false;
            });
        }
        else {
            // Not Ready
            this._didWork = true;
        }
    };
    Testability.prototype.whenStable = function (callback) {
        this._callbacks.push(callback);
        this._runCallbacksIfReady();
    };
    Testability.prototype.getPendingRequestCount = function () { return this._pendingCount; };
    Testability.prototype.findBindings = function (using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    };
    Testability.prototype.findProviders = function (using, provider, exactMatch) {
        // TODO(juliemr): implement.
        return [];
    };
    /** @nocollapse */
    Testability.decorators = [
        { type: decorators_1.Injectable },
    ];
    /** @nocollapse */
    Testability.ctorParameters = [
        { type: ng_zone_1.NgZone, },
    ];
    return Testability;
}());
exports.Testability = Testability;
var TestabilityRegistry = (function () {
    function TestabilityRegistry() {
        /** @internal */
        this._applications = new collection_1.Map();
        _testabilityGetter.addToWindow(this);
    }
    TestabilityRegistry.prototype.registerApplication = function (token, testability) {
        this._applications.set(token, testability);
    };
    TestabilityRegistry.prototype.getTestability = function (elem) { return this._applications.get(elem); };
    TestabilityRegistry.prototype.getAllTestabilities = function () { return collection_1.MapWrapper.values(this._applications); };
    TestabilityRegistry.prototype.getAllRootElements = function () { return collection_1.MapWrapper.keys(this._applications); };
    TestabilityRegistry.prototype.findTestabilityInTree = function (elem, findInAncestors) {
        if (findInAncestors === void 0) { findInAncestors = true; }
        return _testabilityGetter.findTestabilityInTree(this, elem, findInAncestors);
    };
    /** @nocollapse */
    TestabilityRegistry.decorators = [
        { type: decorators_1.Injectable },
    ];
    /** @nocollapse */
    TestabilityRegistry.ctorParameters = [];
    return TestabilityRegistry;
}());
exports.TestabilityRegistry = TestabilityRegistry;
/* @ts2dart_const */
var _NoopGetTestability = (function () {
    function _NoopGetTestability() {
    }
    _NoopGetTestability.prototype.addToWindow = function (registry) { };
    _NoopGetTestability.prototype.findTestabilityInTree = function (registry, elem, findInAncestors) {
        return null;
    };
    return _NoopGetTestability;
}());
/**
 * Set the {@link GetTestability} implementation used by the Angular testing framework.
 * @experimental
 */
function setTestabilityGetter(getter) {
    _testabilityGetter = getter;
}
exports.setTestabilityGetter = setTestabilityGetter;
var _testabilityGetter = new _NoopGetTestability();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGFiaWxpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvc3JjL3Rlc3RhYmlsaXR5L3Rlc3RhYmlsaXR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCwyQkFBeUIsa0JBQWtCLENBQUMsQ0FBQTtBQUM1QyxzQkFBZ0MsaUJBQWlCLENBQUMsQ0FBQTtBQUNsRCwyQkFBOEIsc0JBQXNCLENBQUMsQ0FBQTtBQUNyRCwyQkFBNEIsc0JBQXNCLENBQUMsQ0FBQTtBQUNuRCxxQkFBZ0MsZ0JBQWdCLENBQUMsQ0FBQTtBQUNqRCx3QkFBcUIsaUJBQWlCLENBQUMsQ0FBQTtBQUN2QztJQWNFLHFCQUFvQixPQUFlO1FBQWYsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQWJuQyxnQkFBZ0I7UUFDaEIsa0JBQWEsR0FBVyxDQUFDLENBQUM7UUFDMUIsZ0JBQWdCO1FBQ2hCLGtCQUFhLEdBQVksSUFBSSxDQUFDO1FBQzlCOzs7OztXQUtHO1FBQ0gsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixnQkFBZ0I7UUFDaEIsZUFBVSxHQUFlLEVBQUUsQ0FBQztRQUNXLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQUMsQ0FBQztJQUVwRSxnQkFBZ0I7SUFDaEIseUNBQW1CLEdBQW5CO1FBQUEsaUJBZUM7UUFkQyx5QkFBaUIsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBQyxDQUFDO1lBQ3JELEtBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLEtBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQzdCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztZQUM3Qix5QkFBaUIsQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBQyxDQUFDO2dCQUNuRCxnQkFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUM7Z0JBQ2hDLHdCQUFpQixDQUFDO29CQUNoQixLQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFDMUIsS0FBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxpREFBMkIsR0FBM0I7UUFDRSxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBRUQsaURBQTJCLEdBQTNCO1FBQ0UsSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLENBQUM7UUFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sSUFBSSwwQkFBYSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7UUFDL0QsQ0FBQztRQUNELElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFFRCw4QkFBUSxHQUFSO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDO0lBQzdGLENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsMENBQW9CLEdBQXBCO1FBQUEsaUJBYUM7UUFaQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLHNFQUFzRTtZQUN0RSx3QkFBaUIsQ0FBQztnQkFDaEIsT0FBTyxLQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsQ0FBQztvQkFDcEMsQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO2dCQUNELEtBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sWUFBWTtZQUNaLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUM7SUFDSCxDQUFDO0lBRUQsZ0NBQVUsR0FBVixVQUFXLFFBQWtCO1FBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCw0Q0FBc0IsR0FBdEIsY0FBbUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBRS9ELGtDQUFZLEdBQVosVUFBYSxLQUFVLEVBQUUsUUFBZ0IsRUFBRSxVQUFtQjtRQUM1RCw0QkFBNEI7UUFDNUIsTUFBTSxDQUFDLEVBQUUsQ0FBQztJQUNaLENBQUM7SUFFRCxtQ0FBYSxHQUFiLFVBQWMsS0FBVSxFQUFFLFFBQWdCLEVBQUUsVUFBbUI7UUFDN0QsNEJBQTRCO1FBQzVCLE1BQU0sQ0FBQyxFQUFFLENBQUM7SUFDWixDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsc0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsdUJBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsMEJBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsZ0JBQU0sR0FBRztLQUNmLENBQUM7SUFDRixrQkFBQztBQUFELENBQUMsQUE3RkQsSUE2RkM7QUE3RlksbUJBQVcsY0E2RnZCLENBQUE7QUFDRDtJQUlFO1FBSEEsZ0JBQWdCO1FBQ2hCLGtCQUFhLEdBQUcsSUFBSSxnQkFBRyxFQUFvQixDQUFDO1FBRTVCLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUFDLENBQUM7SUFFdkQsaURBQW1CLEdBQW5CLFVBQW9CLEtBQVUsRUFBRSxXQUF3QjtRQUN0RCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELDRDQUFjLEdBQWQsVUFBZSxJQUFTLElBQWlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFL0UsaURBQW1CLEdBQW5CLGNBQXVDLE1BQU0sQ0FBQyx1QkFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRXRGLGdEQUFrQixHQUFsQixjQUE4QixNQUFNLENBQUMsdUJBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUzRSxtREFBcUIsR0FBckIsVUFBc0IsSUFBVSxFQUFFLGVBQStCO1FBQS9CLCtCQUErQixHQUEvQixzQkFBK0I7UUFDL0QsTUFBTSxDQUFDLGtCQUFrQixDQUFDLHFCQUFxQixDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7SUFDL0UsQ0FBQztJQUNILGtCQUFrQjtJQUNYLDhCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLHVCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGtDQUFjLEdBQTJELEVBQy9FLENBQUM7SUFDRiwwQkFBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUExQlksMkJBQW1CLHNCQTBCL0IsQ0FBQTtBQWVELG9CQUFvQjtBQUNwQjtJQUFBO0lBTUEsQ0FBQztJQUxDLHlDQUFXLEdBQVgsVUFBWSxRQUE2QixJQUFTLENBQUM7SUFDbkQsbURBQXFCLEdBQXJCLFVBQXNCLFFBQTZCLEVBQUUsSUFBUyxFQUFFLGVBQXdCO1FBRXRGLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQUVEOzs7R0FHRztBQUNILDhCQUFxQyxNQUFzQjtJQUN6RCxrQkFBa0IsR0FBRyxNQUFNLENBQUM7QUFDOUIsQ0FBQztBQUZlLDRCQUFvQix1QkFFbkMsQ0FBQTtBQUVELElBQUksa0JBQWtCLEdBQXNDLElBQUksbUJBQW1CLEVBQUUsQ0FBQyJ9