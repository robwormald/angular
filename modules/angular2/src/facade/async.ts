import {global, isPresent, isFunction} from 'angular2/src/facade/lang';
// We make sure promises are in a separate file so that we can use promises
// without depending on rxjs.
import {PromiseWrapper, Promise, PromiseCompleter} from 'angular2/src/facade/promise';
export {PromiseWrapper, Promise, PromiseCompleter} from 'angular2/src/facade/promise';
import {Observable} from './observable';
export {Observable} from './observable';
import {EventEmitter, ComponentEmitter} from './eventemitter';
export {EventEmitter, ComponentEmitter} from './eventemitter';

export namespace NodeJS {
  export interface Timer {}
}

export class TimerWrapper {
  static setTimeout(fn: (...args: any[]) => void, millis: number): NodeJS.Timer {
    return global.setTimeout(fn, millis);
  }
  static clearTimeout(id: NodeJS.Timer): void { global.clearTimeout(id); }

  static setInterval(fn: (...args: any[]) => void, millis: number): NodeJS.Timer {
    return global.setInterval(fn, millis);
  }
  static clearInterval(id: NodeJS.Timer): void { global.clearInterval(id); }
}

export class ObservableWrapper {
  // TODO(vsavkin): when we use rxnext, try inferring the generic type from the first arg
  static subscribe<T>(emitter: any, onNext: (value: T) => void, onError?: (exception: any) => void,
                      onComplete: () => void = () => {}): Object {
    return emitter.subscribe({next: onNext, error: onError, complete: onComplete});
  }

  static isObservable(obs: any): boolean { return  obs instanceof Observable || isFunction(obs.subscribe); }

  /**
   * Returns whether `obs` has any subscribers listening to events.
   */
  static hasSubscribers(obs: EventEmitter<any>): boolean { return obs.listeners.length > 0; }

  static dispose(subscription: any) { subscription.unsubscribe(); }

  static callEmit(emitter: EventEmitter<any>, name:string, value: any) { emitter.next(value); }

  static callError(emitter: EventEmitter<any>, error: any) { emitter.error(error); }

  static callComplete(emitter: EventEmitter<any>) { emitter.complete(); }

  static fromPromise(promise: Promise<any>): Observable<any> {
    return Observable.fromPromise(promise);
  }
  
  static fromEmitter(emitter: EventEmitter<any>, name:string): Observable<any> {
    return Observable.fromEvent(emitter, name);
  }

  static toPromise(obj: Observable<any>): Promise<any> { return (<any>obj).toPromise(); }
}

