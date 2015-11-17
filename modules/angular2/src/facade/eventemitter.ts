import {Map} from './collection';

/**
 * Idiomatic Javascript EventEmitter
 * 
 * Handles multiple named events
 * 
 */
export class EventEmitter <T> {
  private _listeners:Map<any,any> = new Map();
  
  constructor(){}
  
  protected addEventListener(eventName:string, listener:(data: T) => void): void {
    this._listeners.has(eventName) || this._listeners.set(eventName, []);
    this._listeners.get(eventName).push(listener);
  }
  
  protected removeEventListener(label:string, listener:(data: T) => void): boolean {
    let listeners = this._listeners.get(label);
    let index;
    
    if(listeners && listeners.length) {
      for(var i = 0; i < listeners.length; i++){
        if(listeners[i] === listener){
          index = i;
          break;
        }
      }
      if(index > -1){
        listeners.splice(index, 1);
        this._listeners.set(label, listeners);
        return true;
      }
    }
    return false;
  }
  
  emit(eventName:string, data: T ):boolean{
    let listeners = this._listeners.get(eventName);
    
    if(listeners && listeners.length) {
      for(var i = 0; i < listeners.length; i++){
        listeners[i](data);
      }
      return true;
    }
    return false;
  }
  
}

/**
 * ComponentEmitter - for custom component events
 * 
 * Works with a single (optionally) named event.
 */

export class ComponentEmitter <T> extends EventEmitter <T> {
  constructor(public eventName: string = '__default'){
    super();
  }
  
  addListener(listener:(data: T) => void) {
    super.addEventListener(this.eventName, listener);
  }
  
  removeListener(listener:(data: T) => void) {
    return super.removeEventListener(this.eventName, listener);
  }
  
  //override
  emit(data:any):boolean;
  emit(data:T):boolean {
    return super.emit(this.eventName, data);
  }
}
