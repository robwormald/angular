/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {withNgElement, ElementFlags, defineNgElement, defineNgTemplate} from '@angular/elements/ng-element';

const MDCCardTemplate = defineNgTemplate({
  template: `<slot></slot>`,
  styleUrls: [`mdc-card.css`],
  styles: [``]
});


export class MDCCard extends withNgElement(){
  static ngElementDef = defineNgElement({
    selector: 'mdc-card',
    upgrade: (el:MDCCard, cb:() => void) => {
      el.attachShadow({mode: 'open'});
      const template = MDCCardTemplate.clone();
      template.attach(el.shadowRoot!);
      cb();
    }
  });
}


customElements.define(MDCCard.ngElementDef.selector, MDCCard);
