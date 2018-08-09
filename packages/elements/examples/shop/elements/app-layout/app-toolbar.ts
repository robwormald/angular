/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {withNgElement, NgElementDef, defineNgElement, defineNgTemplate } from '../../../../platform'
import template from './app-toolbar.ng';

export class AppToolbar extends withNgElement(){
  static ngElementDef = defineNgElement({
    selector: 'app-toolbar',
    upgrade: (elDef:NgElementDef<AppToolbar>, element:AppToolbar) => {
      element.attachShadow({mode: 'open'})
      AppToolbar.ngTemplateDef.clone().attach(element.shadowRoot!);
    }
  });
  static ngTemplateDef = defineNgTemplate({
    template
  });

  connectedCallback(){
    super.connectedCallback();
    console.log('connected')
  }
}


customElements.define(AppToolbar.ngElementDef.selector, AppToolbar);
