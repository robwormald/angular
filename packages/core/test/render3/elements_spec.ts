/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {defineNgElement} from '../../src/render3/ng_element';
import {E, getHostElement, p , a, P ,T, b, b1, e,  markDirty, t, defineComponent, renderComponent, m, V, v, r, s} from '../../src/render3/index';
import { DirectiveType } from '../../src/render3/interfaces/definition';




describe('angular elements integration test', () => {

  class HelloWorldComp {
    name = 'world'
    static ngComponentDef = defineComponent({
      tag: 'hello-world',
      template:(ctx:HelloWorldComp, cm:boolean) => {
        if(cm){
          T(0);
        }
        t(0, b1('hello ', ctx.name, '!'))
      },
      factory: () => new HelloWorldComp(),
      // hostBindings: (directiveIndex:number, elementIndex:number) => {
      //   const x = m<HelloWorldComp>(directiveIndex)


      //   a(elementIndex, 'name', b('fpp'));
      // }
    })
  }

  class HelloWorldComp2 {
    name = 'world'
    static ngComponentDef = defineComponent({
      tag: 'hello-world2',
      template:(ctx:HelloWorldComp2, cm:boolean) => {
        if(cm){
          T(0);
        }
        t(0, b1('hello ', ctx.name, '!'))
      },
      factory: () => new HelloWorldComp()
    })
  }
  let HelloWorldElement = defineNgElement(HelloWorldComp);

  customElements.define(HelloWorldElement.is, HelloWorldElement);

  let container:HTMLDivElement;


  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  })

  describe('define', () => {



    //it('should define a basic element', () => {})


    it('should create a newable element', () => {
      HelloWorldElement = customElements.get('hello-world');
      const el = new HelloWorldElement();
      expect(el).toBeDefined();
    });

    it('should also work with document.createElement', () => {
      const el = document.createElement('hello-world');
      expect(el).toBeDefined();
    });

    it('should render when added to the DOM', () => {
      HelloWorldElement = customElements.get('hello-world');
      const el = new HelloWorldElement();
      container.appendChild(el);
      expect(el.innerHTML).toEqual('hello world!');

    });

    it('should render 500 of em', () => {
      const start = performance.now();
      for(let i = 0; i < 500; i++){
        const el = new HelloWorldElement();
        container.appendChild(el);
      }
      console.log(performance.now() - start);
    });

    it('should render 500 of em', () => {
      const start = performance.now();
      for(let i = 0; i < 500; i++){
        const el = document.createElement('hello-world2');
        renderComponent(HelloWorldComp2, {host: el});

        container.appendChild(el);
      }
      console.log(performance.now() - start);
    });

  });
});
