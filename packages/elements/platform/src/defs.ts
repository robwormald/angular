/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export interface ShadowRootDef {
  mode: 'open' | 'closed';
  //TODO(robwormald) registry?
}

export const enum NgElementRenderType {
  Static,
  NgTemplate,
  NgComponent,
  CustomRenderer
}

export const enum NgElementRenderFlags {
  /* Whether to run the creation block upgrade ) */
  Upgrade = 0b01,

  /* Whether to run the update block (e.g. refresh bindings) */
  Update = 0b10
}

export interface NgElementRef {

}

export interface NgElementDef<E> {
  type: any ;
  selector: string;
  name: string;
  shadowRoot:ShadowRootDef | false;
  upgrade(element:HTMLElement, elementDef:NgElementDef<E>):void;
}

export interface AsyncNgElementDef<C> extends NgElementDef<C> {
  resolve(element:HTMLElement):Promise<NgElementDef<C>>;
}

export function defineNgElement<E>(ngElementDef:{
  selector:string;
  type?:any;
  name?:string;
  upgrade?:any;
}): NgElementDef<E> {

  return ngElementDef as NgElementDef<E>;
}
