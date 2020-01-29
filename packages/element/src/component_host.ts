/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {NgHostElement} from './host_element';
import {validateSelector} from './utils';
import {ComponentDef} from './private_imports';




export function fromComponent<T>(ngComponent: T, options?:any): typeof NgHostElement {
  const componentDef = readComponentDef(ngComponent);

  if(!componentDef){
    throw new Error('not an ngComponent!')
  }

  //dev only check
  ngDevMode && validateComponentDef(componentDef);



  return class ComponentHost extends NgHostElement {
    static ngComponent = ngComponent;
    constructor(){
      super();
      const internals = this.attachNgInternals();
    }
  }
}

function readComponentDef<T>(ngComponent: any): ComponentDef<T>{
  return ngComponent.ɵcmp;
}

function validateComponentDef<T>(ngComponentDef: ComponentDef<T>){
  console.log('validating', ngComponentDef);
}
