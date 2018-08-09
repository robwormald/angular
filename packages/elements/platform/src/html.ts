/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

 export function ngHtml(parts:TemplateStringsArray, ...values:any[]){
   const template = document.createElement('template');
   template.innerHTML = values.reduce((acc, value, idx) => acc + htmlValue(value) + parts[idx + 1], parts[0]);
   return template;
 }


 function htmlValue(value:HTMLTemplateElement | string) {
  if (value instanceof HTMLTemplateElement) {
    return /** @type {!HTMLTemplateElement } */(value).innerHTML;
  } else {
    return value;
  }
}
