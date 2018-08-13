/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

 export interface NgTemplateInstance {
   parentNode: DocumentFragment | ShadowRoot | HTMLElement;
   attach(parentNode:DocumentFragment | ShadowRoot | HTMLElement):void;
 }

 export function ngHtml(parts:TemplateStringsArray, ...values:any[]){
  const template = document.createElement('template');
  template.innerHTML = values.reduce((acc, value, idx) => acc + htmlValue(value) + parts[idx + 1] + `
  `, parts[0]);
  return template;
}

export function ngStyle(parts:TemplateStringsArray, ...values:any[]){
  const template = document.createElement('template');
  template.innerHTML = `<style>${values.reduce((acc, value, idx) => acc + htmlValue(value) + parts[idx + 1], parts[0])}</style>`;
  return template;
}

export function importNgStyles(ngStyleTemplates:HTMLTemplateElement[]){
  return ngStyleTemplates.reduce((acc, styleTemplate) => {
    const styleEl = styleTemplate.content.querySelector('style')!;
    return acc + styleEl.textContent;
  }, '');
}


function htmlValue(value:HTMLTemplateElement | string) {
 if (value instanceof HTMLTemplateElement) {
   return /** @type {!HTMLTemplateElement } */(value).innerHTML;
 } else {
   return value;
 }
}


 export interface NgTemplateDefInit {
  template?: string | HTMLTemplateElement;
  styles?:string[];
  styleUrls?: string[];
}

export class NgHTMLTemplate {
  finalized = false;
  templateEl:HTMLTemplateElement;
  host!: DocumentFragment | HTMLElement | ShadowRoot;
  constructor(templateDefInit: NgTemplateDefInit){
    if(templateDefInit.template instanceof HTMLTemplateElement){
      this.templateEl = templateDefInit.template;
    } else {
      this.templateEl = ngHtml`${templateDefInit.template || ''}`
    }
  }

  clone(): DocumentFragment {

    return this.templateEl!.content.cloneNode(true) as DocumentFragment;
  }
}


 const prepareStyles = (styleUrls:string[]) => styleUrls.map(style => {
  const styleEl = document.createElement('style');
  styleEl.textContent = style;
  return styleEl;
});

 const prepareStyleUrls = (styleUrls:string[]) => styleUrls.map(styleUrl => {
   const styleEl = document.createElement('link');
   styleEl.setAttribute('rel', 'stylesheet');
   styleEl.setAttribute('type', 'text/css');
   styleEl.setAttribute('href', styleUrl);
   return styleEl;
 });

 export interface NgTemplateDef {
   ngTemplate: typeof NgHTMLTemplate;
 }

 export function defineNgTemplate(templateDefInit:NgTemplateDefInit) {

   return class NgTpl extends NgHTMLTemplate {
     content: DocumentFragment;
     static clone(){
       return new this();
     }
     constructor(){
       super(templateDefInit);
       this.content = this.clone();
       this.host = this.content;
     }
     attach(node:Node){
       node.appendChild(this.content);
       this.host = node as any;
     }
     query$ = (selector:string) => () => this.host.querySelector(selector);
     queryAll$ = (selector:string) => () => this.host.querySelectorAll(selector);

   };
 }
