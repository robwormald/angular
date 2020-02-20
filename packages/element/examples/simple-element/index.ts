import {NgElement, NgHostElement} from '@angular/element'


@NgElement({
  selector: 'simple-element'
})
export class SimpleElement extends NgHostElement {
  static observedAttributes = ['name']
  constructor(){
    super();
    this.attachNgInternals();
  }
}

customElements.define(SimpleElement.ngElementDef.selector, SimpleElement);
