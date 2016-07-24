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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci1kZXByZWNhdGVkL3NyYy9mYWNhZGUvYXN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBR0gsd0JBQXNCLGNBQWMsQ0FBQyxDQUFBO0FBQ3JDLGtDQUFnQyxtQ0FBbUMsQ0FBQyxDQUFBO0FBQ3BFLDBCQUF3Qix5QkFBeUIsQ0FBQyxDQUFBO0FBRWxELHFCQUEyQixRQUFRLENBQUMsQ0FBQTtBQUVwQywyQkFBeUIsaUJBQWlCLENBQUM7QUFBbkMsNkNBQW1DO0FBQzNDLHdCQUFzQixjQUFjLENBQUM7QUFBN0Isb0NBQTZCO0FBQ3JDLHdCQUErQyxXQUFXLENBQUM7QUFBbkQsc0RBQWdCO0FBQUUsa0RBQWlDO0FBRTNEO0lBQUE7SUFVQSxDQUFDO0lBVFEsdUJBQVUsR0FBakIsVUFBa0IsRUFBNEIsRUFBRSxNQUFjO1FBQzVELE1BQU0sQ0FBQyxhQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ00seUJBQVksR0FBbkIsVUFBb0IsRUFBVSxJQUFVLGFBQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTNELHdCQUFXLEdBQWxCLFVBQW1CLEVBQTRCLEVBQUUsTUFBYztRQUM3RCxNQUFNLENBQUMsYUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDeEMsQ0FBQztJQUNNLDBCQUFhLEdBQXBCLFVBQXFCLEVBQVUsSUFBVSxhQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN0RSxtQkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBVlksb0JBQVksZUFVeEIsQ0FBQTtBQUVEO0lBQUE7SUFtQ0EsQ0FBQztJQWxDQyx1RkFB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