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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvc3JjL2ZhY2FkZS9hc3luYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFHSCx3QkFBc0IsY0FBYyxDQUFDLENBQUE7QUFDckMsa0NBQWdDLG1DQUFtQyxDQUFDLENBQUE7QUFDcEUsMEJBQXdCLHlCQUF5QixDQUFDLENBQUE7QUFFbEQscUJBQTJCLFFBQVEsQ0FBQyxDQUFBO0FBRXBDLDJCQUF5QixpQkFBaUIsQ0FBQztBQUFuQyw2Q0FBbUM7QUFDM0Msd0JBQXNCLGNBQWMsQ0FBQztBQUE3QixvQ0FBNkI7QUFDckMsd0JBQStDLFdBQVcsQ0FBQztBQUFuRCxzREFBZ0I7QUFBRSxrREFBaUM7QUFFM0Q7SUFBQTtJQVVBLENBQUM7SUFUUSx1QkFBVSxHQUFqQixVQUFrQixFQUE0QixFQUFFLE1BQWM7UUFDNUQsTUFBTSxDQUFDLGFBQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDTSx5QkFBWSxHQUFuQixVQUFvQixFQUFVLElBQVUsYUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFM0Qsd0JBQVcsR0FBbEIsVUFBbUIsRUFBNEIsRUFBRSxNQUFjO1FBQzdELE1BQU0sQ0FBQyxhQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ00sMEJBQWEsR0FBcEIsVUFBcUIsRUFBVSxJQUFVLGFBQU0sQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLG1CQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSxvQkFBWSxlQVV4QixDQUFBO0FBRUQ7SUFBQTtJQW1DQSxDQUFDO0lBbENDLHVGQUF1RjtJQUNoRiwyQkFB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