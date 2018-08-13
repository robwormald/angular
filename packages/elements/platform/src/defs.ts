/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {defineNgTemplate} from './ng_template';
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

export function upgradeNgElement<T extends HTMLElement>(ngElementDef:NgElementDef<T>, element:T){
  if(ngElementDef.shadowRoot && !element.shadowRoot){
    element.attachShadow({ mode: 'open' });
  }
}

export interface NgElementDef<C> {
  type: NgElementRenderType;
  selector: string;
  shadowRoot:ShadowRootDef | false;
  template?:(rf:any, ctx:C) => void;
  directiveDefs?:any[];
  pipeDefs?:any[];
  upgrade(elementDef:NgElementDef<C>, element:HTMLElement):void;
}

export interface AsyncNgElementDef<C> extends NgElementDef<C> {
  resolve(element:HTMLElement):Promise<NgElementDef<C>>;
}

export function defineNgElement<C>(ngElementDefInit:{
  selector:string;
  type?: NgElementRenderType;
  shadowRoot?: boolean | null;
  directives?: any[];
  pipes?:any[],
  staticTemplate?:string | HTMLTemplateElement;
  styles?: string[];
  styleUrls?: string[];
  upgrade?:any;
  resolve?: (element:HTMLElement) => Promise<NgElementDef<C>>
}): NgElementDef<C> {

  return ({
    selector: ngElementDefInit.selector,
    type: ngElementDefInit.type || NgElementRenderType.Static,
    shadowRoot: !!ngElementDefInit.shadowRoot,
    resolve: ngElementDefInit.resolve || false,
    directiveDefs: ngElementDefInit.directives || [],
    pipeDefs: ngElementDefInit.pipes || [],
    styles: ngElementDefInit.styles || [],
    styleUrls: ngElementDefInit.styleUrls || [],
    upgrade: ngElementDefInit.upgrade || upgradeNgElement,
  }) as NgElementDef<C> & AsyncNgElementDef<C>;
}
