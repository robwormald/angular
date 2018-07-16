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


export interface NgElementDef<C> {
  selector: string;
  shadowRoot:ShadowRootDef;
  template?:(rf:any, ctx:C) => void;
  directiveDefs:any[];
  pipeDefs:any[];
}

export function defineNgElement<C>(): NgElementDef<C> {
  return ({}) as NgElementDef<C>;
}
