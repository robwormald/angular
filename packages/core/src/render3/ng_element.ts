export type CustomElementLifecycle = HTMLElement & {
  connectedCallback():void;
  disconnectedCallback():void;
  attributeChangedCallback?():void;
}

export const enum NgElementActions {
  Upgrade = 1,
  Connect = 2,
  Disconnect = ~2,
  AttributeChange = 4

}

export const enum NgElementFlags {
  Upgraded = 1,
  Connected = 2
}

export type NgCustomElementConstructor = typeof HTMLElement & {
  new():HTMLElement;
  connectedCallback():void;
}
export function withNgElement<T>(BaseElement = HTMLElement as NgCustomElementConstructor){
  return class NgElement extends BaseElement {
    _flags = 0x0000;
    _data = [];

    connectedCallback(){
      this._next(NgElementActions.Connect);
    }
    disconnectedCallback(){
      this._next(NgElementActions.Disconnect);
    }

    ngOnUpgrade?:() => void;
    ngOnConnected?:() => void;
    ngOnUpdate?:() => void;
    constructor(){
      super();
      this._upgrade();
    }
    _upgrade(){
      if(this._flags & NgElementFlags.Upgraded) return;
      this.ngOnUpgrade && this.ngOnUpgrade();
      this._next(NgElementActions.Upgrade);
    }
    _next(action:NgElementActions){
      switch(action){
        case NgElementActions.Upgrade:
          (this._flags |= NgElementFlags.Upgraded);
          break;
        case NgElementActions.Connect:
          (this._flags |= NgElementFlags.Connected);
          break;
        case NgElementActions.Disconnect:
          (this._flags &= ~NgElementFlags.Connected);
          break;
      }
    }
  }
}
