/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

// We are temporarily importing the existing viewEngine from core so we can be sure we are
// correctly implementing its interfaces for backwards compatibility.
import {Injector} from '../di/injector';
import {ComponentRef as viewEngine_ComponentRef} from '../linker/component_factory';
import {EmbeddedViewRef as viewEngine_EmbeddedViewRef} from '../linker/view_ref';

import {assertNotNull} from './assert';
import {renderComponent} from './component'
import {NG_HOST_SYMBOL, createError, createLView, directiveCreate, enterView, hostElement, leaveView, locateHostElement, renderComponentOrTemplate, renderTemplate, container as C,
  containerRefreshStart as cR,
  containerRefreshEnd as cr,} from './instructions';
import {ComponentDef, ComponentType, TypedComponentDef} from './interfaces/definition';
import {LElementNode} from './interfaces/node';
import {RElement, Renderer3, RendererFactory3, domRendererFactory3} from './interfaces/renderer';
import {notImplemented, stringify} from './util';
import { defineComponent } from './definition';

export interface DefineNgElementOptions {
  is: string;
  shadow: boolean;
  template: any;
  type: any;
  factory: (a?:any) => {}
}

type NgElementConstructor<T = HTMLElement> = new (...args: any[]) => T;


function NgElementBase(def:DefineNgElementOptions){
  return class extends getBaseElement()  {
    static is = def.is;
  }
}

function createElementDef(){

}



// TODO: A hack to not pull in the NullInjector from @angular/core.
export const NULL_INJECTOR: Injector = {
  get: (token: any, notFoundValue?: any) => {
    throw new Error('NullInjector: Not found: ' + stringify(token));
  }
};



export interface NgElementDef {
  selector: string;
}

export function defineNgElement<T>(component:ComponentType<T>) {
  return defineNgHostElement(getBaseElement(), component);
}

let BaseElement:any;

function getBaseElement(): typeof HTMLElement {
  if(!BaseElement){
    BaseElement = HTMLElement;
  }
  return BaseElement as typeof HTMLElement
}
function setBaseElement(ctor:any){
  BaseElement = ctor;
}






function defineNgHostElement<T>(Base:typeof HTMLElement, componentType:ComponentType<T>){

  function componentTemplate(context:T, cm:boolean){

      componentType.ngComponentDef.template(context, cm);


  }

  const def = componentType.ngComponentDef;
  const attrs = Object.keys(def.inputs);

  return class NgHostElement extends Base {
    static is = def.tag;
    static observedAttributes =attrs
    component:T;
    hostNode:LElementNode;
    dirty = false
    _upgrade(){
      if(!this.hostNode){
        this.component = def.n();
        this.hostNode = renderTemplate(this, componentTemplate, this.component, domRendererFactory3, this.hostNode);
        this.dirty = false;
      }
    }
    _render(){
      if(this.dirty){
        renderTemplate(this, componentTemplate, this.component, domRendererFactory3, this.hostNode);
        this.dirty = false;
      }
    }
    _updateProp(key:string, value:any){
      (this.component as any)[key] = value;
      this.dirty = true;
    }
    _destroy(){}


    connectedCallback(){
      this._upgrade();
      this._render();
    }
    disconnectedCallback(){
      this._destroy();
    }
    attributeChangedCallback(key:string, oldValue:any, newValue:string, namespace?:string){
      if(!this.hostNode){
        this._upgrade();
      }
      this._updateProp(key, newValue);
    }
  }
}


/**
 * Bootstraps a Component into an existing host element and returns an instance
 * of the component.
 *
 * @param componentType Component to bootstrap
 * @param options Optional parameters which control bootstrapping
 */
// export function renderComponent<T>(
//     componentType: ComponentType<T>, opts: CreateComponentOptions = {}): T {
//   const rendererFactory = opts.rendererFactory || domRendererFactory3;
//   const componentDef = componentType.ngComponentDef as TypedComponentDef<T>;
//   if (componentDef.type != componentType) componentDef.type = componentType;
//   let component: T;
//   const hostNode = locateHostElement(rendererFactory, opts.host || componentDef.tag);
//   const oldView = enterView(
//       createLView(
//           -1, rendererFactory.createRenderer(hostNode, componentDef.rendererType), {data: []}),
//       null !);
//   try {
//     // Create element node at index 0 in data array
//     hostElement(hostNode, componentDef);
//     // Create directive instance with n() and store at index 1 in data array (el is 0)
//     component = directiveCreate(1, componentDef.n(), componentDef);
//   } finally {
//     leaveView(oldView);
//   }

//   opts.features && opts.features.forEach((feature) => feature(component, componentDef));
//   detectChanges(component);
//   return component;
// }

export function detectChanges<T>(component: T) {

  ngDevMode && assertNotNull(component, 'component');
  const hostNode = (component as any)[NG_HOST_SYMBOL] as LElementNode;
  ngDevMode && assertNotNull(hostNode.data, 'hostNode.data');
  //console.log(component)
 // renderTemplate(hostNode, hostNode.view, component, );
  isDirty = false;
}

let isDirty = false;
export function markDirty<T>(
    component: T, scheduler: (fn: () => void) => void = requestAnimationFrame) {
  ngDevMode && assertNotNull(component, 'component');
  if (!isDirty) {
    isDirty = true;
    scheduler(() => detectChanges(component));
  }
}

export function getHostElement<T>(component: T): RElement {
  return ((component as any)[NG_HOST_SYMBOL] as LElementNode).native;
}
