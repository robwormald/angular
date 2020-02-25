/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {ComponentDef} from './private_imports'
import {validateSelector} from './utils';

 export interface NgElementMetadata<Props = {}> {
   selector: string;
   shadowRoot?: boolean | ShadowRootInit;
   styles?: string[];
   styleUrls?: string[];
   observedAttributes?: string[];
   props?: NgElementProps<Props>;
 }

 export interface NgElementDef {
   selector: string;
   observedAttributes: string[];
   stylesheets: CSSStyleSheet[];
   formAssociated: boolean;
 }

export type NgElementProps<T> = {
  [index in keyof T]: NgPropDef;
};

 export interface NgPropDef {
   name: string;
   attrName: string;
   watch: boolean;
   reflect: boolean;
 }

const shadowRootDefaults: ShadowRootInit = {
  mode: 'open'
}

export function defineNgElement(meta: any){
  return {...meta}
}

export function defineObservedAttributes(attrs: string[]){
  return attrs;
}
