import { NgHostElement } from "./host_element";

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */


// Refer to https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name

const validElementName = /^[a-z](?:[\-\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*-(?:[\-\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;

const reservedNames = [
  'annotation-xml',
	'color-profile',
	'font-face',
	'font-face-src',
	'font-face-uri',
	'font-face-format',
	'font-face-name',
	'missing-glyph'
];


export function validateSelector(selector: string): [boolean, string | undefined | null]{

  if(!selector.includes('-')){
    return [
     false, `
      ${selector} is an invalid selector, selectors must contain a hyphen!
      ✅ <my-element></my-element>
      🚫 <${selector}></${selector}>
    `]
  }
  return [true, undefined];
}

export function defineCustomElement(elementConstructor: typeof HTMLElement, waitFor?:Promise<any>){
  const def = getElementDef(elementConstructor);
  if(def && def.selector){
    customElements.define(def.selector, elementConstructor);
  }
}

export function getElementDef(elementConstructor: typeof HTMLElement){
  return (elementConstructor as typeof NgHostElement).ngElementDef || null;
}
