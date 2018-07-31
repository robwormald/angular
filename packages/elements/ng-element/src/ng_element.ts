/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { NgElementDef } from './defs';

export type NgElementRendererFactory  = {
  createRenderer():any;
};

export interface NgElementRenderer<T> {
  ngRenderer(renderRoot:HTMLElement | ShadowRoot | DocumentFragment, renderFn:any): void;
  ngRender(context?:any): any;
}

export interface NgCustomElementLifecycle extends HTMLElement {
  new(...args: any[]): NgCustomElementLifecycle;
  connectedCallback(): void;
  disconnectedCallback(): void;
  attributeChangedCallback(attr: string, oldValue: string | null, newValue: string | null, namespace: string): void;
  adoptedCallback(): void;

  ngOnUpgrade(): void;
  ngOnUpgraded(): void;

  ngOnConnected(): void;
  ngOnDisconnected(): void;

  __ngUpgrade(): void;
}

export type CustomElementConstructor<T = HTMLElement> = new (...args: any[]) => T;

export const enum ElementActions {
  Upgrade,
  Upgraded,
  Connected,
  Disconnected,
  AttributeChanged,
  Adopted
}

export const enum ElementFlags {
  Upgraded = 1,
  Upgrading = 2,
  Connected = 4,
  NeedsCheck = 8,
  ShouldRender = 16
}

export interface NgUpgradeable {
  __ngUpgrade(): Promise<any> | undefined;
}



/**
 * Abstract NgCustomElement class
 *
 * exposes the [Custom Element lifecycle](https://developers.google.com/web/fundamentals/web-components/customelements#Actions) methods
 */

export function withNgElement<CEBase extends CustomElementConstructor<NgCustomElementLifecycle>>(BaseElement: CEBase = HTMLElement as CEBase) {
  return class NgElement extends BaseElement {

    static observedAttributes: string[] = [];
    /**
     * The (theoretically) generated ngElementDef from the @CustomElement
     */
    static ngElementDef: NgElementDef<NgElement>;

    /**
     * @internal
     * */
    _ngFlags: ElementFlags = 0;

    /**
     * @internal
     * */
    _ngViewData = [];

    get renderRoot(){
      return this.shadowRoot || this;
    }

    constructor(...args: any[]) {
      super(args);
      this.__ngUpgrade();
    }
    connectedCallback() {
      (this._ngFlags |= ElementFlags.Connected);
      super.connectedCallback && super.connectedCallback();
      this.__ngOnAction(ElementActions.Connected);
    }
    disconnectedCallback() {
      (this._ngFlags &= ~ElementFlags.Connected);
      super.disconnectedCallback && super.disconnectedCallback();
      this.__ngOnAction(ElementActions.Disconnected);
    }

    attributeChangedCallback(attr: string, oldValue: string | null, newValue: string | null, namespace: string) {
      super.attributeChangedCallback && super.attributeChangedCallback(attr, oldValue, newValue, namespace);
      this.__ngOnAction(ElementActions.AttributeChanged, [attr, oldValue, newValue, namespace]);
    }

    ngDetectChanges(){
      this.__ngDetectChanges(); //TODO(scheduler)
    }

    /**
     * @internal
     */
    __ngDetectChanges(){
      this.ngRenderer(this.renderRoot, (ctx:any) => this.ngRender && this.ngRender(ctx));
    }


    ngRenderer(renderRoot:HTMLElement | ShadowRoot | DocumentFragment, detectChanges:any): void{
      const renderResult = detectChanges();
    }
    ngRender(renderFlagctx:any){
      return this as any;
    }



    /**
     * @internal
     */
    __ngUpgrade() {
      //return early if the element is already upgraded
      if ((this._ngFlags & ElementFlags.Upgraded)) return;
      if (super.__ngUpgrade) {
        super.__ngUpgrade();
      } else {
        const elementDef = (this.constructor as typeof NgElement).ngElementDef;
        if (!elementDef) {
          this._ngFlags |= ElementFlags.Upgraded;
          this.__ngOnAction(ElementActions.Upgrade);
          return;
        }
        //upgrade the element
        this._ngFlags |= ElementFlags.Upgrading;
        elementDef.upgrade && elementDef.upgrade(elementDef, this, () => this.__ngUpgraded && this.__ngUpgraded());
      }
    }
    /**
     * @internal
     */
    __ngUpgraded(){
      this._ngFlags &= ~ElementFlags.Upgrading;
      this._ngFlags |= ElementFlags.Upgraded;
      this.__ngOnAction(ElementActions.Upgrade);
    }

    /**
     * @internal
     */
    __ngOnAction(type: ElementActions, data: any[] = []) {

    }
  };
}
