/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import '../app-layout';
import { NgElement, withNgElement, NgElementDef, defineNgElement, defineNgTemplate, ngHtml as html, importNgStyles } from '../../../../platform';

@NgElement({
  selector: 'shop-app'
})
export class ShopApp extends withNgElement(){

  static ngElementDef = defineNgElement({
    selector: 'shop-app',
    upgrade: (elDef:NgElementDef<ShopApp>, element:ShopApp) => {
      element.attachShadow({mode: 'open'});
      ShopApp.ngTemplateDef.clone().attach(element.renderRoot);
    }
  });



  static ngTemplateDef = defineNgTemplate({
    template: html`
    <style>
      :host {
        display: flex;
        flex-direction: column;
      }
      app-header {
        color: var(--primary-text-color);
      }
    </style>
    <app-header-layout fullbleed>
      <app-header slot="header" fixed>
        <app-toolbar>
          <div main-title>Angular</div>
        </app-toolbar>
      </app-header>
      <div size="100">
      main content
      </div>
    </app-header-layout>
    `,
  });
}
