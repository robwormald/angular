/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import '../app-layout';

import {withNgElement, NgElementDef, defineNgElement, defineNgTemplate } from '../../../../platform';

export class ShopApp extends withNgElement(){

  static ngElementDef = defineNgElement({
    selector: 'shop-app',
    upgrade: (elDef:NgElementDef<ShopApp>, element:ShopApp) => {
      element.attachShadow({mode: 'open'});
      ShopApp.ngTemplateDef.clone().attach(element.shadowRoot!);
    }
  });

  static ngTemplateDef = defineNgTemplate({
    template: `
    <app-header-layout fullbleed>
      <app-header slot="header" fixed>
        <app-toolbar>
          <div main-title>App name</div>
        </app-toolbar>
      </app-header>
      <div size="100">
      main content
      </div>
    </app-header-layout>
    `,
    styleUrls: [
      'elements/shop-app/shop-app.css',
    ]
  });
}


customElements.define(ShopApp.ngElementDef.selector, ShopApp);
