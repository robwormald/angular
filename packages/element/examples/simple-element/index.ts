import {NgElement, NgHostElement} from '@angular/element'


@NgElement({
  selector: 'simple-element',
  observedAttributes: ['name']
})
export class SimpleElement extends NgHostElement {

}

customElements.define('simple-element', SimpleElement)
