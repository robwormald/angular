import {defineComponent, renderComponent, detectChanges} from './private'



export interface NgElementDef<T> {
  selector: string;
  component?: any;
  componentFactory?: any;
  template?: any;
  deps?:string[]
}

function createComponentFactory(){

}


function defineTemplate<T>(def:NgElementDef<T>){

  return (context:T, cm:boolean) => {

  }
}

export function defineNgElement<T>(def:NgElementDef<T>){
  const Component = def.component as typeof Function;

  (Component as any).ngComponentDef = defineComponent({
    tag: def.selector,
    factory: def.componentFactory || function factory(){ return new Component() },
    template: def.template,
    hostBindings: (directiveIndex, elementIndex) => {
      console.log('host bindings', directiveIndex, elementIndex)
    },
  });

  return class extends HTMLElement {
    static is = def.selector;

    _component:T;

    constructor(){
      super();
      //this._upgrade();
    }

    connectedCallback(){
      this._upgrade();
      this._update();
    }

    _upgrade(){
      const host = this;
      if(!this._component){
        this._component = renderComponent(Component as any, {
          host: host
        });
      }
    }
    _update(){
      detectChanges(this._component);
    }
  }
}
