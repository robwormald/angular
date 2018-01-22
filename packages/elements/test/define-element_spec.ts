import {defineNgElement} from '../src/define-ng-element'
import {E, T, t, b, b1} from '../src/private'


class HelloWorldComp {
  name = 'world'
}

describe('angular elements integration test', () => {

  describe('define', () => {

    let HelloWorldElement:any;

    it('should define a basic element', () => {
      HelloWorldElement = defineNgElement({
        selector: 'hello-world',
        component: HelloWorldComp,
        template:(ctx:HelloWorldComp, c:boolean) => {
          if(c){
            T(0);
          }
          t(0, b1('hello ', ctx.name, '!'))
        }
      });

      customElements.define(HelloWorldElement.is, HelloWorldElement);

      expect(customElements.get(HelloWorldElement.is)).toEqual(HelloWorldElement);

    });

    it('should create a newable element', () => {
      HelloWorldElement = customElements.get('hello-world');
      const el = new HelloWorldElement();
      expect(el).toBeDefined();
    });

    it('should render when added to the DOM', () => {
      HelloWorldElement = customElements.get('hello-world');
      const el = new HelloWorldElement();
      document.body.appendChild(el);

      expect(el.innerHTML).toEqual('hello world!');

    });

  });
});
