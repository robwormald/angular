/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * NgElementMetadata
 */
export interface NgElementMetadata {
  selector: string;
  properties?: any;
  listeners?: any;
  shadowRoot?: boolean;
}


export function NgElement(ngElementMetadata:NgElementMetadata){
  return function decorateNgElementBase(clz:any){
    customElements.define(ngElementMetadata.selector, clz);
    return clz;
  }
}
