/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {withNgElement, NgElementDef, defineNgElement, defineNgTemplate, ngHtml as html, importNgStyles, ngHtml } from '@angular/elements/platform'
import {withResizeable} from '../cdk/resizeable-behavior';

const AppHeaderLayoutTemplate = html`
  <style>
  :host {
    display: flex;
    position: relative;
    z-index: 0;
  }
  #wrapper ::slotted([slot=header]) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  #wrapper.initializing ::slotted([slot=header]) {
    position: relative;
  }
  :host([has-scrolling-region]) {
    height: 100%;
  }
  :host([has-scrolling-region]) #wrapper ::slotted([slot=header]) {
    position: absolute;
  }
  :host([has-scrolling-region]) #wrapper.initializing ::slotted([slot=header]) {
    position: relative;
  }
  :host([has-scrolling-region]) #wrapper #contentContainer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
  :host([has-scrolling-region]) #wrapper.initializing #contentContainer {
    position: relative;
  }
  :host([fullbleed]) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  :host([fullbleed]) #wrapper,
  :host([fullbleed]) #wrapper #contentContainer {
    display:flex;
    flex-direction:column;
  }
  #contentContainer {
    position: relative;
    z-index: 0;
  }
  @media print {
    :host([has-scrolling-region]) #wrapper #contentContainer {
      overflow-y: visible;
    }
  }
  </style>

  <div id="wrapper">
    <slot id="headerSlot" name="header"></slot>
    <div id="contentContainer">
      <slot></slot>
    </div>
  </div>
`;

export class AppHeaderLayout extends withResizeable(withNgElement()){
  static ngElementDef = defineNgElement({
    selector: 'app-header-layout',
    upgrade: (elDef:NgElementDef<AppHeaderLayout>, element:AppHeaderLayout) => {
      element.attachShadow({mode: 'open'})
      AppHeaderLayout.ngTemplateDef.clone().attach(element.shadowRoot!);
      element.addEventListener('cdk-resize', (e:CustomEvent) => {
        console.log('resized!', e.detail);
      });
    }
  });
  static ngTemplateDef = defineNgTemplate({
    template: AppHeaderLayoutTemplate
  });

  connectedCallback(){
    super.connectedCallback();
    console.log('connected')
  }
}


customElements.define(AppHeaderLayout.ngElementDef.selector, AppHeaderLayout);
