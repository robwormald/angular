/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {withNgElement, NgElementDef, defineNgElement, defineNgTemplate } from '../../../../platform'
import styles from './app-header-layout.css';

export class AppHeaderLayout extends withNgElement(){
  static ngElementDef = defineNgElement({
    selector: 'app-header-layout',
    upgrade: (elDef:NgElementDef<AppHeaderLayout>, element:AppHeaderLayout) => {
      element.attachShadow({mode: 'open'})
      AppHeaderLayout.ngTemplateDef.clone().attach(element.shadowRoot!);
    }
  });
  static ngTemplateDef = defineNgTemplate({
    template: `
      <div id="wrapper">
        <slot id="headerSlot" name="header"></slot>

        <div id="contentContainer">
          <slot></slot>
        </div>
      </div>`
    ,

    styles: [styles]
  });

  connectedCallback(){
    super.connectedCallback();
    console.log('connected')
  }
}


customElements.define(AppHeaderLayout.ngElementDef.selector, AppHeaderLayout);
