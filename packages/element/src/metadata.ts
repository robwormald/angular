/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {compileElementDef, NgElementMeta} from './defs';
import { NgHostElement } from './host_element';


export function NgElement(metadata: NgElementMeta){
  return function(elementConstructor: typeof NgHostElement){
    const def = compileElementDef(metadata);
    elementConstructor.ngElementDef = def;
  }
}
