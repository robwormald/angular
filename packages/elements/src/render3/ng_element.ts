import {ComponentDef, ComponentType} from '../../core_render3_private_imports'




export const enum ElementFlags {
  Upgraded =  1,
  Connected = 2,
  Dirty = 4,
  ShadowRoot = 8
}

export abstract class NgElement extends HTMLElement {
  /**
   * @internal
   */
  _ngFlags!: ElementFlags;
  ngUpgrade?:() => void;
  ngConnected(){}
  constructor(){
    super();
  }
  connectedCallback(){}
  disconnectedCallback(){}
}

const NgCustomElement = HTMLElement as  any as typeof NgElement

export function withNgElement<T>(Base = NgCustomElement){
  return class NgElement extends Base {
    /**
     * @internal
     */
    _ngFlags!:number;
    constructor(){
      super();
      this._ngUpgrade();
    }
    connectedCallback(){
      (this._ngFlags |= ElementFlags.Connected);
      super.connectedCallback && super.connectedCallback();
    }
    disconnectedCallback(){
      (this._ngFlags &= ~ElementFlags.Connected);
      super.disconnectedCallback && super.disconnectedCallback();
    }
    /**
     * @internal
     */
    _ngUpgrade(){
      if((this._ngFlags & ElementFlags.Upgraded)) return;
      if(this._ngFlags & ElementFlags.ShadowRoot){
        if(!this.shadowRoot){
          this.attachShadow({mode: 'open'});
        }
      }
      this._ngFlags |= ElementFlags.Upgraded;
    }
  };
}
