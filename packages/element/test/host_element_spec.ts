import {NgElement, NgHostElement} from '@angular/element';

@NgElement({
  selector: 'xxx-defaults-test'
})
class HostDefaultsTestElement extends NgHostElement {}

@NgElement({
  selector: 'xxx-hello-world',
  observedAttributes: ['name'],
  styles: [
    `:host {
      display: block;
    }`
  ]
})
class HelloWorldTestElement extends NgHostElement {}

describe('@angular/element', () => {

  describe('defaults', () => {
    it('should contain an ngElementDef as expected', () => {
      expect(HostDefaultsTestElement.ngElementDef).toBeDefined();
    });
    it('should have a selector', () => {
      expect(HostDefaultsTestElement.ngElementDef.selector).toBeDefined();
    });
    it('should have a static observedAttributes array', () => {
      expect(HostDefaultsTestElement.observedAttributes?.length).toEqual(0);
    });
    it('should define successfully', () => {
      expect(() =>
        customElements.define(HostDefaultsTestElement.ngElementDef.selector, HostDefaultsTestElement)
      ).not.toThrow();
      expect(customElements.get(HostDefaultsTestElement.ngElementDef.selector)).toEqual(HostDefaultsTestElement)
    });
  });

});

export {}
