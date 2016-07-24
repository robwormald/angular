/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var async_1 = require('../facade/async');
var exceptions_1 = require('../facade/exceptions');
var ng_zone_impl_1 = require('./ng_zone_impl');
var ng_zone_impl_2 = require('./ng_zone_impl');
exports.NgZoneError = ng_zone_impl_2.NgZoneError;
/**
 * An injectable service for executing work inside or outside of the Angular zone.
 *
 * The most common use of this service is to optimize performance when starting a work consisting of
 * one or more asynchronous tasks that don't require UI updates or error handling to be handled by
 * Angular. Such tasks can be kicked off via {@link #runOutsideAngular} and if needed, these tasks
 * can reenter the Angular zone via {@link #run}.
 *
 * <!-- TODO: add/fix links to:
 *   - docs explaining zones and the use of zones in Angular and change-detection
 *   - link to runOutsideAngular/run (throughout this file!)
 *   -->
 *
 * ### Example ([live demo](http://plnkr.co/edit/lY9m8HLy7z06vDoUaSN2?p=preview))
 * ```
 * import {Component, View, NgZone} from '@angular/core';
 * import {NgIf} from '@angular/common';
 *
 * @Component({
 *   selector: 'ng-zone-demo'.
 *   template: `
 *     <h2>Demo: NgZone</h2>
 *
 *     <p>Progress: {{progress}}%</p>
 *     <p *ngIf="progress >= 100">Done processing {{label}} of Angular zone!</p>
 *
 *     <button (click)="processWithinAngularZone()">Process within Angular zone</button>
 *     <button (click)="processOutsideOfAngularZone()">Process outside of Angular zone</button>
 *   `,
 *   directives: [NgIf]
 * })
 * export class NgZoneDemo {
 *   progress: number = 0;
 *   label: string;
 *
 *   constructor(private _ngZone: NgZone) {}
 *
 *   // Loop inside the Angular zone
 *   // so the UI DOES refresh after each setTimeout cycle
 *   processWithinAngularZone() {
 *     this.label = 'inside';
 *     this.progress = 0;
 *     this._increaseProgress(() => console.log('Inside Done!'));
 *   }
 *
 *   // Loop outside of the Angular zone
 *   // so the UI DOES NOT refresh after each setTimeout cycle
 *   processOutsideOfAngularZone() {
 *     this.label = 'outside';
 *     this.progress = 0;
 *     this._ngZone.runOutsideAngular(() => {
 *       this._increaseProgress(() => {
 *       // reenter the Angular zone and display done
 *       this._ngZone.run(() => {console.log('Outside Done!') });
 *     }}));
 *   }
 *
 *
 *   _increaseProgress(doneCallback: () => void) {
 *     this.progress += 1;
 *     console.log(`Current progress: ${this.progress}%`);
 *
 *     if (this.progress < 100) {
 *       window.setTimeout(() => this._increaseProgress(doneCallback)), 10)
 *     } else {
 *       doneCallback();
 *     }
 *   }
 * }
 * ```
 * @experimental
 */
var NgZone = (function () {
    function NgZone(_a) {
        var _this = this;
        var _b = _a.enableLongStackTrace, enableLongStackTrace = _b === void 0 ? false : _b;
        this._hasPendingMicrotasks = false;
        this._hasPendingMacrotasks = false;
        /** @internal */
        this._isStable = true;
        /** @internal */
        this._nesting = 0;
        /** @internal */
        this._onUnstable = new async_1.EventEmitter(false);
        /** @internal */
        this._onMicrotaskEmpty = new async_1.EventEmitter(false);
        /** @internal */
        this._onStable = new async_1.EventEmitter(false);
        /** @internal */
        this._onErrorEvents = new async_1.EventEmitter(false);
        this._zoneImpl = new ng_zone_impl_1.NgZoneImpl({
            trace: enableLongStackTrace,
            onEnter: function () {
                // console.log('ZONE.enter', this._nesting, this._isStable);
                _this._nesting++;
                if (_this._isStable) {
                    _this._isStable = false;
                    _this._onUnstable.emit(null);
                }
            },
            onLeave: function () {
                _this._nesting--;
                // console.log('ZONE.leave', this._nesting, this._isStable);
                _this._checkStable();
            },
            setMicrotask: function (hasMicrotasks) {
                _this._hasPendingMicrotasks = hasMicrotasks;
                _this._checkStable();
            },
            setMacrotask: function (hasMacrotasks) { _this._hasPendingMacrotasks = hasMacrotasks; },
            onError: function (error) { return _this._onErrorEvents.emit(error); }
        });
    }
    NgZone.isInAngularZone = function () { return ng_zone_impl_1.NgZoneImpl.isInAngularZone(); };
    NgZone.assertInAngularZone = function () {
        if (!ng_zone_impl_1.NgZoneImpl.isInAngularZone()) {
            throw new exceptions_1.BaseException('Expected to be in Angular Zone, but it is not!');
        }
    };
    NgZone.assertNotInAngularZone = function () {
        if (ng_zone_impl_1.NgZoneImpl.isInAngularZone()) {
            throw new exceptions_1.BaseException('Expected to not be in Angular Zone, but it is!');
        }
    };
    NgZone.prototype._checkStable = function () {
        var _this = this;
        if (this._nesting == 0) {
            if (!this._hasPendingMicrotasks && !this._isStable) {
                try {
                    // console.log('ZONE.microtaskEmpty');
                    this._nesting++;
                    this._onMicrotaskEmpty.emit(null);
                }
                finally {
                    this._nesting--;
                    if (!this._hasPendingMicrotasks) {
                        try {
                            // console.log('ZONE.stable', this._nesting, this._isStable);
                            this.runOutsideAngular(function () { return _this._onStable.emit(null); });
                        }
                        finally {
                            this._isStable = true;
                        }
                    }
                }
            }
        }
    };
    ;
    Object.defineProperty(NgZone.prototype, "onUnstable", {
        /**
         * Notifies when code enters Angular Zone. This gets fired first on VM Turn.
         */
        get: function () { return this._onUnstable; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onMicrotaskEmpty", {
        /**
         * Notifies when there is no more microtasks enqueue in the current VM Turn.
         * This is a hint for Angular to do change detection, which may enqueue more microtasks.
         * For this reason this event can fire multiple times per VM Turn.
         */
        get: function () { return this._onMicrotaskEmpty; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onStable", {
        /**
         * Notifies when the last `onMicrotaskEmpty` has run and there are no more microtasks, which
         * implies we are about to relinquish VM turn.
         * This event gets called just once.
         */
        get: function () { return this._onStable; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "onError", {
        /**
         * Notify that an error has been delivered.
         */
        get: function () { return this._onErrorEvents; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "isStable", {
        /**
         * Whether there are no outstanding microtasks or microtasks.
         */
        get: function () { return this._isStable; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "hasPendingMicrotasks", {
        /**
         * Whether there are any outstanding microtasks.
         */
        get: function () { return this._hasPendingMicrotasks; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgZone.prototype, "hasPendingMacrotasks", {
        /**
         * Whether there are any outstanding microtasks.
         */
        get: function () { return this._hasPendingMacrotasks; },
        enumerable: true,
        configurable: true
    });
    /**
     * Executes the `fn` function synchronously within the Angular zone and returns value returned by
     * the function.
     *
     * Running functions via `run` allows you to reenter Angular zone from a task that was executed
     * outside of the Angular zone (typically started via {@link #runOutsideAngular}).
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * within the Angular zone.
     *
     * If a synchronous error happens it will be rethrown and not reported via `onError`.
     */
    NgZone.prototype.run = function (fn) { return this._zoneImpl.runInner(fn); };
    /**
     * Same as #run, except that synchronous errors are caught and forwarded
     * via `onError` and not rethrown.
     */
    NgZone.prototype.runGuarded = function (fn) { return this._zoneImpl.runInnerGuarded(fn); };
    /**
     * Executes the `fn` function synchronously in Angular's parent zone and returns value returned by
     * the function.
     *
     * Running functions via `runOutsideAngular` allows you to escape Angular's zone and do work that
     * doesn't trigger Angular change-detection or is subject to Angular's error handling.
     *
     * Any future tasks or microtasks scheduled from within this function will continue executing from
     * outside of the Angular zone.
     *
     * Use {@link #run} to reenter the Angular zone and do work that updates the application model.
     */
    NgZone.prototype.runOutsideAngular = function (fn) { return this._zoneImpl.runOuter(fn); };
    return NgZone;
}());
exports.NgZone = NgZone;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfem9uZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS9zcmMvem9uZS9uZ196b25lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxzQkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQUM3QywyQkFBNEIsc0JBQXNCLENBQUMsQ0FBQTtBQUVuRCw2QkFBc0MsZ0JBQWdCLENBQUMsQ0FBQTtBQUV2RCw2QkFBMEIsZ0JBQWdCLENBQUM7QUFBbkMsaURBQW1DO0FBSTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVFRztBQUNIO0lBK0JFLGdCQUFZLEVBQThCO1FBL0I1QyxpQkFzSkM7WUF2SGMsNEJBQTRCLEVBQTVCLGlEQUE0QjtRQWhCakMsMEJBQXFCLEdBQVksS0FBSyxDQUFDO1FBQ3ZDLDBCQUFxQixHQUFZLEtBQUssQ0FBQztRQUUvQyxnQkFBZ0I7UUFDUixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLGdCQUFnQjtRQUNSLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDckIsZ0JBQWdCO1FBQ1IsZ0JBQVcsR0FBc0IsSUFBSSxvQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLGdCQUFnQjtRQUNSLHNCQUFpQixHQUFzQixJQUFJLG9CQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkUsZ0JBQWdCO1FBQ1IsY0FBUyxHQUFzQixJQUFJLG9CQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0QsZ0JBQWdCO1FBQ1IsbUJBQWMsR0FBc0IsSUFBSSxvQkFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBR2xFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSx5QkFBVSxDQUFDO1lBQzlCLEtBQUssRUFBRSxvQkFBb0I7WUFDM0IsT0FBTyxFQUFFO2dCQUNQLDRE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