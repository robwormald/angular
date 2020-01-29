/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {ComponentDef} from './private_imports'
import {validateSelector} from './utils';

 export interface NgElementDef<Props = {}> {
   resolved: boolean;
   selector: string;
   shadowRoot: boolean | ShadowRootInit;
   stylesheets: CSSStyleSheet[];
   observedAttributes: string[];
   props: NgElementProps<Props>
 }

export type NgElementProps<T> = {
  [index in keyof T]: NgPropDef;
};
 export type NgElementMeta<T = {}> = Partial<NgElementDef<T>> & {
   selector: string;
   styles?: string[];
   styleUrls: string[];

 }


 export interface NgPropDef {
   name: string;
   attrName: string;
   watch: boolean;
   reflect: boolean;
 }

const shadowRootDefaults: ShadowRootInit = {
  mode: 'open'
}

export function compileElementDef<T>(elementMeta: NgElementMeta<T>): NgElementDef<T> {

  ngDevMode && validateElementMeta(elementMeta);

  const selector = elementMeta.selector;

  const shadowRoot = elementMeta.shadowRoot ?
    (elementMeta.shadowRoot === true ?
      shadowRootDefaults :
      elementMeta.shadowRoot
    ) :
      false;

  const props = elementMeta.props || {} as NgElementProps<T>;
  const observedAttributes = readObservedAttributes(props);

   return {
     resolved: true,
     selector,
     shadowRoot,
     props,
     observedAttributes,
     stylesheets: [],

    }
 }

export function linkElementDef(){}



function validateElementMeta<T>(componentMeta: NgElementMeta<T>){
  const [validSelector, error] = validateSelector(componentMeta.selector);

  if(!validSelector) throw new Error(error!);

}

function readObservedAttributes<T>(props: NgElementProps<T>): string[] {
  return Object.keys(props).reduce((attrs, propName) => {
    return attrs;
  },[]);
}
