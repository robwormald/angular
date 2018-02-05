import {ComponentDef, ComponentType} from './interfaces/definition';
import {renderComponent, detectChanges} from './component'

export abstract class NgElementCtor extends HTMLElement {
  static is:string;
  static observedAttributes:string[];
}

export function registerComponent<T>(componentType: ComponentType<T>): typeof NgElementCtor {

  const def = componentType.ngComponentDef;
  const is = def.tag;
  const observedAttributes = Object.keys(def.inputs);

  return class extends NgElementCtor {
    static observedAttributes = observedAttributes;
    static is = is;
    instance:T;
    constructor(){
      super();
    }

    //fires when connected to DOM
    connectedCallback(){
      if(!this.instance){
        this.instance = renderComponent(componentType, {
          host: this
        });
      }
    }

    //fires when disconnected from DOM
    disconnectedCallback(){
      //how to destroy?
    }

    //fires when an observedAttribute is changed
    //TODO: type this to keyof T
    attributeChangedCallback(key:string, oldValue:any, newValue:any){
      if(this.instance){
        (this.instance as any)[key] = newValue;
      }
      detectChanges(this.instance);
    }
  }
}
