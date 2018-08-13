/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
//port of https://github.com/PolymerElements/iron-resizable-behavior/blob/master/iron-resizable-behavior.d.ts
import { NgCustomElementLifecycle, CustomElementConstructor } from '@angular/elements/platform';

const ROOT_RESIZABLES = new Set();

declare const ResizeObserver:any;


export function withResizeable<ElementBase extends CustomElementConstructor>(Base:ElementBase = HTMLElement as ElementBase){
  return class Resizeable extends Base implements NgCustomElementLifecycle {
    _parentResizeable?:Resizeable | null;
    _observer?:ResizeObserver;
    _observers = new WeakMap();
    _notifyingDescendants: boolean = false;

    connectedCallback(){
      super.connectedCallback && super.connectedCallback();
      console.log('requestin')
      this._requestResizeNotifications();
    }
    disconnectedCallback(){
      super.disconnectedCallback && super.disconnectedCallback();
      if(this._parentResizeable){
        this._parentResizeable.stopResizeNotificationsFor(this);
      } else {
        ROOT_RESIZABLES.delete(this);
        this._observer && this._observer.unobserve(this);
        this._observer && this._observer.disconnect();
      }
      this._parentResizeable = null;
    }

    assignParentResizeable(parentResizeable:Resizeable | null){
      if(this._parentResizeable){
        this._parentResizeable.stopResizeNotificationsFor(this);
      }
    }

    stopResizeNotificationsFor(resizeable:Resizeable){
      this._observer!.unobserve(resizeable);
    }

    cdkNotifyResize(resizeEntry:ResizeObserverEntry){
      console.log('resize', resizeEntry);
      this._emitResize(resizeEntry);
    }

    _emitResize(resizeEntry:ResizeObserverEntry){
      this.dispatchEvent(new CustomEvent('cdk-resize', { bubbles: false, detail: resizeEntry.contentRect }));
    }

    _onResizeObserverCallback(resizeEntries:ResizeObserverEntry[]){
      resizeEntries.forEach(entry => {
        (entry.target as Resizeable).cdkNotifyResize && (entry.target as Resizeable).cdkNotifyResize(entry);
      });
    }
    _emitRequestResizeNotifications(){


    }

    _requestResizeNotifications(){
      if(!this.ngIsConnected){
        return;
      }

      this._findParent();
      if(!this._parentResizeable){

        ROOT_RESIZABLES.forEach(resizable => resizable !== this && resizable._findParent());

        this._observer = new ResizeObserver((entries:ResizeObserverEntry[]) => this._onResizeObserverCallback(entries));
        this._observer!.observe(this);
      }
    }
    _findParent(){
      const requestEvent = new CustomEvent('cdk-request-resize-notifications', {bubbles: true, cancelable: true});
      this.dispatchEvent(requestEvent);
      if(!this._parentResizeable){
        ROOT_RESIZABLES.add(this);
      } else {
        ROOT_RESIZABLES.delete(this);
      }
    }
  };
}

