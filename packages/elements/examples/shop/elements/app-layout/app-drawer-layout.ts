/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {withNgElement, NgElementDef, defineNgElement, defineNgTemplate, ngHtml as html, importNgStyles } from '@angular/elements/platform'
import {withResizeable} from '../cdk/resizeable-behavior';

export class AppDrawerLayout extends withResizeable(withNgElement()){

  static ngElementDef = defineNgElement({
    selector: 'app-header-layout',
    upgrade: (elDef:NgElementDef<AppDrawerLayout>, element:AppDrawerLayout) => {

      element.attachShadow({mode: 'open'})
      AppDrawerLayout.ngTemplateDef.clone().attach(element.shadowRoot!);
    }
  });

  static ngTemplateDef = defineNgTemplate({
    template: html`
      <div id="wrapper">
        <slot id="headerSlot" name="header"></slot>
        <div id="contentContainer">
          <slot></slot>
        </div>
      </div>`
    ,
  });

  connectedCallback(){
    super.connectedCallback();
  }
}


customElements.define(AppDrawerLayout.ngElementDef.selector, AppDrawerLayout);
