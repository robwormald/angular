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
var Subject_1 = require('rxjs/Subject');
var PromiseObservable_1 = require('rxjs/observable/PromiseObservable');
var toPromise_1 = require('rxjs/operator/toPromise');
var lang_1 = require('./lang');
var Observable_1 = require('rxjs/Observable');
exports.Observable = Observable_1.Observable;
var Subject_2 = require('rxjs/Subject');
exports.Subject = Subject_2.Subject;
var promise_1 = require('./promise');
exports.PromiseCompleter = promise_1.PromiseCompleter;
exports.PromiseWrapper = promise_1.PromiseWrapper;
var TimerWrapper = (function () {
    function TimerWrapper() {
    }
    TimerWrapper.setTimeout = function (fn, millis) {
        return lang_1.global.setTimeout(fn, millis);
    };
    TimerWrapper.clearTimeout = function (id) { lang_1.global.clearTimeout(id); };
    TimerWrapper.setInterval = function (fn, millis) {
        return lang_1.global.setInterval(fn, millis);
    };
    TimerWrapper.clearInterval = function (id) { lang_1.global.clearInterval(id); };
    return TimerWrapper;
}());
exports.TimerWrapper = TimerWrapper;
var ObservableWrapper = (function () {
    function ObservableWrapper() {
    }
    // TODO(vsavkin): when we use rxnext, try inferring the generic type from the first arg
    ObservableWrapper.subscribe = function (emitter, onNext, onError, onComplete) {
        if (onComplete === void 0) { onComplete = function () { }; }
        onError = (typeof onError === 'function') && onError || lang_1.noop;
        onComplete = (typeof onComplete === 'function') && onComplete || lang_1.noop;
        return emitter.subscribe({ next: onNext, error: onError, complete: onComplete });
    };
    ObservableWrapper.isObservable = function (obs) { return !!obs.subscribe; };
    /**
     * Returns whether `obs` has any subscribers listening to events.
     */
    ObservableWrapper.hasSubscribers = function (obs) { return obs.observers.length > 0; };
    ObservableWrapper.dispose = function (subscription) { subscription.unsubscribe(); };
    /**
     * @deprecated - use callEmit() instead
     */
    ObservableWrapper.callNext = function (emitter, value) { emitter.emit(value); };
    ObservableWrapper.callEmit = function (emitter, value) { emitter.emit(value); };
    ObservableWrapper.callError = function (emitter, error) { emitter.error(error); };
    ObservableWrapper.callComplete = function (emitter) { emitter.complete(); };
    ObservableWrapper.fromPromise = function (promise) {
        return PromiseObservable_1.PromiseObservable.create(promise);
    };
    ObservableWrapper.toPromise = function (obj) { return toPromise_1.toPromise.call(obj); };
    return ObservableWrapper;
}());
exports.ObservableWrapper = ObservableWrapper;
/**
 * Use by directives and components to emit custom Events.
 *
 * ### Examples
 *
 * In the following example, `Zippy` alternatively emits `open` and `close` events when its
 * title gets clicked:
 *
 * ```
 * @Component({
 *   selector: 'zippy',
 *   template: `
 *   <div class="zippy">
 *     <div (click)="toggle()">Toggle</div>
 *     <div [hidden]="!visible">
 *       <ng-content></ng-content>
 *     </div>
 *  </div>`})
 * export class Zippy {
 *   visible: boolean = true;
 *   @Output() open: EventEmitter<any> = new EventEmitter();
 *   @Output() close: EventEmitter<any> = new EventEmitter();
 *
 *   toggle() {
 *     this.visible = !this.visible;
 *     if (this.visible) {
 *       this.open.emit(null);
 *     } else {
 *       this.close.emit(null);
 *     }
 *   }
 * }
 * ```
 *
 * The events payload can be accessed by the parameter `$event` on the components output event
 * handler:
 *
 * ```
 * <zippy (open)="onOpen($event)" (close)="onClose($event)"></zippy>
 * ```
 *
 * Uses Rx.Observable but provides an adapter to make it work as specified here:
 * https://github.com/jhusain/observable-spec
 *
 * Once a reference implementation of the spec is available, switch to it.
 * @stable
 */
var EventEmitter = (function (_super) {
    __extends(EventEmitter, _super);
    /**
     * Creates an instance of [EventEmitter], which depending on [isAsync],
     * delivers events synchronously or asynchronously.
     */
    function EventEmitter(isAsync) {
        if (isAsync === void 0) { isAsync = false; }
        _super.call(this);
        this.__isAsync = isAsync;
    }
    EventEmitter.prototype.emit = function (value) { _super.prototype.next.call(this, value); };
    /**
     * @deprecated - use .emit(value) instead
     */
    EventEmitter.prototype.next = function (value) { _super.prototype.next.call(this, value); };
    EventEmitter.prototype.subscribe = function (generatorOrNext, error, complete) {
        var schedulerFn;
        var errorFn = function (err) { return null; };
        var completeFn = function () { return null; };
        if (generatorOrNext && typeof generatorOrNext === 'object') {
            schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
                setTimeout(function () { return generatorOrNext.next(value); });
            } : function (value /** TODO #9100 */) { generatorOrNext.next(value); };
            if (generatorOrNext.error) {
                errorFn = this.__isAsync ? function (err) { setTimeout(function () { return generatorOrNext.error(err); }); } :
                    function (err) { generatorOrNext.error(err); };
            }
            if (generatorOrNext.complete) {
                completeFn = this.__isAsync ? function () { setTimeout(function () { return generatorOrNext.complete(); }); } :
                    function () { generatorOrNext.complete(); };
            }
        }
        else {
            schedulerFn = this.__isAsync ? function (value /** TODO #9100 */) {
                setTimeout(function () { return generatorOrNext(value); });
            } : function (value /** TODO #9100 */) { generatorOrNext(value); };
            if (error) {
                errorFn =
                    this.__isAsync ? function (err) { setTimeout(function () { return error(err); }); } : function (err) { error(err); };
            }
            if (complete) {
                completeFn =
                    this.__isAsync ? function () { setTimeout(function () { return complete(); }); } : function () { complete(); };
            }
        }
        return _super.prototype.subscribe.call(this, schedulerFn, errorFn, completeFn);
    };
    return EventEmitter;
}(Subject_1.Subject));
exports.EventEmitter = EventEmitter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy9zcmMvZmFjYWRlL2FzeW5jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUdILHdCQUFzQixjQUFjLENBQUMsQ0FBQTtBQUNyQyxrQ0FBZ0MsbUNBQW1DLENBQUMsQ0FBQTtBQUNwRSwwQkFBd0IseUJBQXlCLENBQUMsQ0FBQTtBQUVsRCxxQkFBMkIsUUFBUSxDQUFDLENBQUE7QUFFcEMsMkJBQXlCLGlCQUFpQixDQUFDO0FBQW5DLDZDQUFtQztBQUMzQyx3QkFBc0IsY0FBYyxDQUFDO0FBQTdCLG9DQUE2QjtBQUNyQyx3QkFBK0MsV0FBVyxDQUFDO0FBQW5ELHNEQUFnQjtBQUFFLGtEQUFpQztBQUUzRDtJQUFBO0lBVUEsQ0FBQztJQVRRLHVCQUFVLEdBQWpCLFVBQWtCLEVBQTRCLEVBQUUsTUFBYztRQUM1RCxNQUFNLENBQUMsYUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDdkMsQ0FBQztJQUNNLHlCQUFZLEdBQW5CLFVBQW9CLEVBQVUsSUFBVSxhQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUzRCx3QkFBVyxHQUFsQixVQUFtQixFQUE0QixFQUFFLE1BQWM7UUFDN0QsTUFBTSxDQUFDLGFBQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDTSwwQkFBYSxHQUFwQixVQUFxQixFQUFVLElBQVUsYUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEUsbUJBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZZLG9CQUFZLGVBVXhCLENBQUE7QUFFRDtJQUFBO0lBbUNBLENBQUM7SUFs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