/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {NgElement, withNgElement, NgElementDef, defineNgElement} from '@angular/elements/platform';

@NgElement({
  selector: 'hello-world'
})
export class HelloWorld extends withNgElement(){
  ngOnConnected(){
    this.innerHTML = 'Hello World';
  }
}


customElements.define(HelloWorld.ngElementDef.selector, HelloWorld);
