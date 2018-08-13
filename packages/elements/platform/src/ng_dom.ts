/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
export function shadowRoot(element:HTMLElement, options = {mode: "open"}){
  if(!element.shadowRoot){
    element.attachShadow(options as ShadowRootInit);
  }
  return element.shadowRoot;
}

function bindListener(element:HTMLElement, eventName:string, handler:any, options:any ){

}

function defineProperty(){}
