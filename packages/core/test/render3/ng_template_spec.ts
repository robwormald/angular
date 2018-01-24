
import '../../src/render3/ng_template';
// import {E, getHostElement, p , a, P ,T, b, b1, e,  markDirty, t, defineComponent, renderComponent, m, V, v, r, s} from '../../src/render3/index';
// import { DirectiveType } from '../../src/render3/interfaces/definition';




describe('ng template integration test', () => {
  let testTemplate:HTMLTemplateElement;
  beforeEach(() => {
    testTemplate = document.createElement('template');
    testTemplate.innerHTML = `<h1>Hello {{name}}</h1>`
  })
  it('should create a template instance', () => {
    expect(testTemplate).toBeDefined();
  });
  it('should have an createInstance() method', () => {
    expect(testTemplate.createInstance).toBeDefined();
  });

  it('should return a template instance', () => {
    expect(testTemplate.createInstance()).toBeDefined();
  });

  it('should be updateable', () => {
    const instance = testTemplate.createInstance();
    expect(instance.update).toBeDefined();
  });
})
