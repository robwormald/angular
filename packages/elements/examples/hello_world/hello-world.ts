/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {withNgElement, NgElementDef, defineNgElement} from '../../ng-element';


export class HelloWorld extends withNgElement(){
  static ngElementDef = defineNgElement({
    selector: 'hello-world',
    upgrade: (elDef:NgElementDef<HelloWorld>, element:HelloWorld) => {
      const tpl = document.querySelector('template[ng-id=hello-world]');
      console.log(tpl);
    }
  });
  ngOnConnected(){
    this.innerHTML = 'Hello World';
  }
}


customElements.define(HelloWorld.ngElementDef.selector, HelloWorld);
