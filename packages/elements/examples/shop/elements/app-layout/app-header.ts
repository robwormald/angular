/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {withNgElement, NgElementDef, defineNgElement, defineNgTemplate } from '../../../../platform'
import styles from './app-header.css';

export class AppHeader extends withNgElement(){
  static ngElementDef = defineNgElement({
    selector: 'app-header',
    upgrade: (elDef:NgElementDef<AppHeader>, element:AppHeader, cb:any) => {
      element.attachShadow({mode: 'open'})
      AppHeader.ngTemplateDef.clone().attach(element.shadowRoot!);
      cb();
    }
  });
  static ngTemplateDef = defineNgTemplate({
    template: `
    <div id="contentContainer">
      <slot id="slot"></slot>
    </div>`,
    styles: [styles]
  });

  connectedCallback(){
    super.connectedCallback();
    console.log('connected')
  }
}


customElements.define(AppHeader.ngElementDef.selector, AppHeader);
