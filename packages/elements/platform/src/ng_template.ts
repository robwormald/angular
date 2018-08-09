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


 export interface NgTemplateDefInit {
  template?: string;
  styles?:string[];
  styleUrls?: string[];
}

export class NgHTMLTemplate {
  static htmlTemplate:HTMLTemplateElement;
  finalized = false;
  htmlString:string;
  styles:string[];
  styleUrls:string[];
  host!: DocumentFragment | HTMLElement | ShadowRoot;
  constructor(templateDefInit: NgTemplateDefInit){
    this.htmlString = templateDefInit.template || '';
    this.styles = templateDefInit.styles || [];
    this.styleUrls = templateDefInit.styleUrls || [];
  }
  prepare(){
    const ctor = (this.constructor as typeof NgHTMLTemplate);


    ctor.htmlTemplate = document.createElement('template');
    ctor.htmlTemplate.innerHTML = this.htmlString;
    [...prepareStyles(this.styles), ...prepareStyleUrls(this.styleUrls)]
      .forEach(el => ctor.htmlTemplate!.content.appendChild(el));
    this.finalized = true;
  }
  addStyle(style:string){
    this.styles.push(style);
    this.finalized = false;
  }
  addStyleUrl(styleUrl:string){
    this.styleUrls.push(styleUrl);
    this.finalized = false;
  }
  clone(): DocumentFragment {
    if(!this.finalized){
      this.prepare();
    }
    return (this.constructor as typeof NgHTMLTemplate).htmlTemplate!.content.cloneNode(true) as DocumentFragment;
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
