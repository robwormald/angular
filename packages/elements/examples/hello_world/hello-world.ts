/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {withNgElement, ElementFlags, defineNgElement} from '../../ng-element';


export class HelloWorld extends withNgElement(){
  static ngElementDef = defineNgElement({
    selector: 'hello-world'
  });
  ngOnConnected(){
    this.innerHTML = 'Hello World';
  }
}


customElements.define(HelloWorld.ngElementDef.selector, HelloWorld);
