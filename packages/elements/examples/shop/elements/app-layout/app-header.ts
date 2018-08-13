/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {withNgElement, NgElementDef, defineNgElement, defineNgTemplate, ngHtml as html, importNgStyles } from '@angular/elements/platform'

const AppHeaderTemplate = html`
  <style>
    :host {
    position: relative;
    display: block;
    transition-timing-function: linear;
    transition-property: -webkit-transform;
    transition-property: transform;
    background-color: var(--primary-color);
    }
    :host::before {
    position: absolute;
    right: 0px;
    bottom: -5px;
    left: 0px;
    width: 100%;
    height: 5px;
    content: "";
    transition: opacity 0.4s;
    pointer-events: none;
    opacity: 0;
    box-shadow: inset 0px 5px 6px -3px rgba(0, 0, 0, 0.4);
    will-change: opacity;
    box-shadow: var(--app-header-shadow);
    }
    :host([shadow])::before {
    opacity: 1;
    }
    #background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    }
    #backgroundFrontLayer,
    #backgroundRearLayer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    pointer-events: none;
    background-size: cover;
    }
    #backgroundFrontLayer {

    }
    #backgroundRearLayer {
    opacity: 0;

    }
    #contentContainer {
    position: relative;
    width: 100%;
    height: 100%;
    }
    :host([disabled]),
    :host([disabled])::after,
    :host([disabled]) #backgroundFrontLayer,
    :host([disabled]) #backgroundRearLayer,
    /* Silent scrolling should not run CSS transitions */
    :host([silent-scroll]),
    :host([silent-scroll])::after,
    :host([silent-scroll]) #backgroundFrontLayer,
    :host([silent-scroll]) #backgroundRearLayer {
    transition: none !important;
    }
    :host([disabled]) ::slotted(app-toolbar:first-of-type),
    :host([disabled]) ::slotted([sticky]),
    /* Silent scrolling should not run CSS transitions */
    :host([silent-scroll]) ::slotted(app-toolbar:first-of-type),
    :host([silent-scroll]) ::slotted([sticky]) {
    transition: none !important;
    }
  </style>
  <div id="contentContainer">
  <slot id="slot"></slot>
  </div>
`


export class AppHeader extends withNgElement(){
  static ngElementDef = defineNgElement({
    selector: 'app-header',
    upgrade: (elDef:NgElementDef<AppHeader>, element:AppHeader) => {
      element.attachShadow({mode: 'open'})
      AppHeader.ngTemplateDef.clone().attach(element.shadowRoot!);
    }
  });
  static ngTemplateDef = defineNgTemplate({
    template: AppHeaderTemplate
  });;;

  connectedCallback(){
    super.connectedCallback();
  }
}


customElements.define(AppHeader.ngElementDef.selector, AppHeader);
