/**
 * RxJS Observable implementation from github.com/reactivex/rxjs
 */
import {global as _global, isPresent} from './lang';
import {Promise} from './promise';

declare var Symbol;

if (isPresent(Symbol)) {
  if (typeof Symbol.for === 'function') {
    Symbol.observable = Symbol.for ('observable');
  } else {
    Symbol.observable = '@@observable';
  }
}

const $$observable = Symbol.observable;
const noop = () => {};
const throwError = err => {
  throw err;
};

function tryOrOnError(target: Function): (x?: any) => any {
  function tryCatcher() {
    try {
      (<any>tryCatcher).target.apply(this, arguments);
    } catch (e) {
      this.error(e);
    }
  }
  (<any>tryCatcher).target = target;
  return tryCatcher;
}


export interface Observer<T> {
  next?: (value: T) => void;
  error?: (err?: any) => void;
  complete?: () => void;
  isUnsubscribed?: boolean;
}


export class Subscription<T> {
  public static EMPTY: Subscription<void> = (function(empty) {
    empty.isUnsubscribed = true;
    return empty;
  }(new Subscription<void>()));

  isUnsubscribed: boolean = false;

  _subscriptions: Subscription<any>[];

  _unsubscribe(): void { noop(); }

  constructor(_unsubscribe?: () => void) {
    if (_unsubscribe) {
      this._unsubscribe = _unsubscribe;
    }
  }

  unsubscribe(): void {
    if (this.isUnsubscribed) {
      return;
    }

    this.isUnsubscribed = true;

    const unsubscribe = this._unsubscribe;
    const subscriptions = this._subscriptions;

    this._subscriptions = void 0;

    if (unsubscribe) {
      unsubscribe.call(this);
    }

    if (subscriptions != null) {
      let index = -1;
      const len = subscriptions.length;

      while (++index < len) {
        subscriptions[index].unsubscribe();
      }
    }
  }

  add(subscription: Subscription<T>| Function | void): void {
    // return early if:
    //  1. the subscription is null
    //  2. we're attempting to add our this
    //  3. we're attempting to add the static `empty` Subscription
    if (!subscription || (subscription === this) || (subscription === Subscription.EMPTY)) {
      return;
    }

    let sub = (<Subscription<T>>subscription);

    switch (typeof subscription) {
      case 'function':
        sub = new Subscription<void>(<(() => void)>subscription);
      case 'object':
        if (sub.isUnsubscribed || typeof sub.unsubscribe !== 'function') {
          break;
        } else if (this.isUnsubscribed) {
          sub.unsubscribe();
        } else {
          const subscriptions = this._subscriptions || (this._subscriptions = []);
          subscriptions.push(sub);
        }
        break;
      default:
        throw new Error('Unrecognized subscription ' + subscription + ' added to Subscription.');
    }
  }

  remove(subscription: Subscription<T>): void {
    // return early if:
    //  1. the subscription is null
    //  2. we're attempting to remove ourthis
    //  3. we're attempting to remove the static `empty` Subscription
    if (subscription == null || (subscription === this) || (subscription === Subscription.EMPTY)) {
      return;
    }

    const subscriptions = this._subscriptions;

    if (subscriptions) {
      const subscriptionIndex = subscriptions.indexOf(subscription);
      if (subscriptionIndex !== -1) {
        subscriptions.splice(subscriptionIndex, 1);
      }
    }
  }
}

/**
 * Subscriber
 */
export class Subscriber<T> extends Subscription<T> implements Observer<T> {
  protected _subscription: Subscription<T>;
  protected _isUnsubscribed: boolean = false;

  get isUnsubscribed(): boolean {
    const subscription = this._subscription;
    if (subscription) {
      // route to the shared Subscription if it exists
      return this._isUnsubscribed || subscription.isUnsubscribed;
    } else {
      return this._isUnsubscribed;
    }
  }

  set isUnsubscribed(value: boolean) {
    const subscription = this._subscription;
    if (subscription) {
      // route to the shared Subscription if it exists
      subscription.isUnsubscribed = Boolean(value);
    } else {
      this._isUnsubscribed = Boolean(value);
    }
  }

  static create<T>(next?: (x?: T) => void, error?: (e?: any) => void,
                   complete?: () => void): Subscriber<T> {
    const subscriber = new Subscriber<T>();
    subscriber._next = (typeof next === 'function') && tryOrOnError(next) || noop;
    subscriber._error = (typeof error === 'function') && error || throwError;
    subscriber._complete = (typeof complete === 'function') && complete || noop;
    return subscriber;
  }

  constructor(protected destination?: Observer<any>) {
    super();

    if (!this.destination) {
      return;
    }
    const subscription = (<any>destination)._subscription;
    if (subscription) {
      this._subscription = subscription;
    } else if (destination instanceof Subscriber) {
      this._subscription = (<Subscription<T>>destination);
    }
  }

  add(sub: Subscription<T>| Function | void): void {
    // route add to the shared Subscription if it exists
    const _subscription = this._subscription;
    if (_subscription) {
      _subscription.add(sub);
    } else {
      super.add(sub);
    }
  }

  remove(sub: Subscription<T>): void {
    // route remove to the shared Subscription if it exists
    if (this._subscription) {
      this._subscription.remove(sub);
    } else {
      super.remove(sub);
    }
  }

  unsubscribe(): void {
    if (this._isUnsubscribed) {
      return;
    } else if (this._subscription) {
      this._isUnsubscribed = true;
    } else {
      super.unsubscribe();
    }
  }

  _next(value: T): void {
    const destination = this.destination;
    if (destination.next) {
      destination.next(value);
    }
  }

  _error(err: any): void {
    const destination = this.destination;
    if (destination.error) {
      destination.error(err);
    }
  }

  _complete(): void {
    const destination = this.destination;
    if (destination.complete) {
      destination.complete();
    }
  }

  next(value?: T): void {
    if (!this.isUnsubscribed) {
      this._next(value);
    }
  }

  error(err?: any): void {
    if (!this.isUnsubscribed) {
      this._error(err);
      this.unsubscribe();
    }
  }

  complete(): void {
    if (!this.isUnsubscribed) {
      this._complete();
      this.unsubscribe();
    }
  }
}


export interface Operator<T, R> { call<T, R>(subscriber: Subscriber<R>): Subscriber<T>; }

/**
 * A representation of any set of values over any amount of time. This the most basic building block
 * of RxJS.
 *
 * @class Observable<T>
 */
export class Observable<T> {
  source: Observable<any>;
  operator: Operator<any, T>;
  _isScalar: boolean = false;

  static create(subscribe): Observable<any> { return new Observable(subscribe); }

  static fromEvent(emitter: any, eventName: string, selector?: any) {
    return new Observable(observer => {

      function onEvent(ev) {
        if (selector) {
          ev = selector(ev);
        }
        observer.next(ev);
      }

      emitter.addEventListener(eventName, onEvent);
      return () => { emitter.removeEventListener(eventName, onEvent); }

    });
  }
  
  static fromPromise(thenable:Promise<any>){
    return new Observable(observer => {
      thenable.then((result) => {
        observer.next(result);
        observer.complete();
      }, (err) => {
        observer.error(err);
      });
    });
  }
  /**
   * @constructor
   * @param {Function} subscribe the function that is
   * called when the Observable is initially subscribed to. This function is given a Subscriber, to
   * which new values
   * can be `next`ed, or an `error` method can be called to raise an error, or `complete` can be
   * called to notify
   * of a successful completion.
   */
  constructor(subscribe?:<R>(subscriber: Subscriber<R>) => Subscription<T>| Function | void) {
    this._isScalar = false;
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }
  /**
   * @method lift
   * @param {Operator} operator the operator defining the operation to take on the observable
   * @returns {Observable} a new observable with the Operator applied
   * @description creates a new Observable, with this Observable as the source, and the passed
   * operator defined as the new observable's operator.
   */
  lift(operator) {
    const observable = new Observable();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }
  /**
   * @method Symbol.observable
   * @returns {Observable} this instance of the observable
   * @description an interop point defined by the es7-observable spec
   * https://github.com/zenparsing/es-observable
   */
  [$$observable]() { return this; }
  /**
   * @method subscribe
   * @param {Observer|Function} observerOrNext (optional) either an observer defining all functions
   * to be called,
   *  or the first of three possible handlers, which is the handler for each value emitted from the
   * observable.
   * @param {Function} error (optional) a handler for a terminal event resulting from an error. If
   * no error handler is provided,
   *  the error will be thrown as unhandled
   * @param {Function} complete (optional) a handler for a terminal event resulting from successful
   * completion.
   * @returns {Subscription} a subscription reference to the registered handlers
   * @description registers handlers for handling emitted values, error and completions from the
   * observable, and
   *  executes the observable's subscriber function, which will take action to set up the underlying
   * data stream
   */
  subscribe(observerOrNext, error, complete) {
    let subscriber;
    if (observerOrNext && typeof observerOrNext === 'object') {
      if (observerOrNext instanceof Subscriber) {
        subscriber = observerOrNext;
      } else {
        subscriber = new Subscriber(observerOrNext);
      }
    } else {
      const next = observerOrNext;
      subscriber = Subscriber.create(next, error, complete);
    }
    subscriber.add(this._subscribe(subscriber));
    return subscriber;
  }
  /**
   * @method forEach
   * @param {Function} next a handler for each value emitted by the observable
   * @param {PromiseConstructor} PromiseCtor? a constructor function used to instantiate the Promise
   * @returns {Promise} a promise that either resolves on observable completion or
   *  rejects with the handled error
   */
  forEach(next) {
    return new Promise((resolve, reject) => { this.subscribe(next, reject, resolve); });
  }
  _subscribe(subscriber) { return this.source._subscribe(this.operator.call(subscriber)); }
}