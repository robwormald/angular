/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgElementMetadata } from './defs';
import { NgHostElement } from './host_element';


export function NgElement(metadata: NgElementMetadata){
  return function(elementConstructor: typeof NgHostElement){

  }
}

export function Prop(){}
