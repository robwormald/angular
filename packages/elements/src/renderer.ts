import {ɵrenderComponent as renderComponent, ɵdetectChanges as detectChanges, ɵComponentType as ComponentType} from '@angular/core';



export function withNgComponent<T>(componentType:ComponentType<T>, options: {extends: typeof HTMLElement}){

  const NgComponentHost = class extends (options.extends ? options.extends : HTMLElement){
    component?:T;
    constructor(){
      super();
    }

    render(){
      if(!this.component){
        this.component = renderComponent(componentType, {host: this});
      } else {
        detectChanges(this.component);
      }

    }

  }

  return NgComponentHost;
}
