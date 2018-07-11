/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {withNgElement, withStaticTemplate, defineNgElement, NgElementDef, ElementFlags} from '../src/render3/index'

describe('elements render3_spec', () => {

    let testContainer:HTMLDivElement;

    beforeEach(() => {
      testContainer = document.createElement('div');
      document.body.appendChild(testContainer);
    });

    afterEach(() => {
      document.body.removeChild(testContainer);
    });

    describe('withNgElement mixin', () => {

      class TestElement extends withNgElement(){}

      customElements.define('simple-ng-element', TestElement);

      it('should work', () => {
        expect(customElements.get('simple-ng-element')).toBeDefined();
      });


      it('should not create a shadow root by default', () => {
        const el = document.createElement('simple-ng-element') as TestElement;
        expect(el).toBeDefined();
        expect(el.shadowRoot).toBeFalsy();
      });

      it('should allow a overriding the flags by inheritance', () => {
        customElements.define('no-shadow-element', class extends withNgElement() {
          constructor(){
            super();
            (this._flags |= ElementFlags.ShadowRoot);
          }
        })
        const el = document.createElement('no-shadow-element') as TestElement;
        expect(el).toBeDefined();
        expect(el.shadowRoot).toBeDefined();
      });

      it('should set the upgraded flag', () => {
        const el = document.createElement('simple-ng-element') as TestElement;
        expect(el._flags & ElementFlags.Upgraded).toBeTruthy();;;
      });

      it('should set the connected flag when added to the DOM', () => {
        const el = document.createElement('simple-ng-element') as TestElement;
        expect(el._flags & ElementFlags.Connected).toBeFalsy();
        testContainer.appendChild(el);
        expect(el._flags & ElementFlags.Connected).toBeTruthy();
      });

      it('should unset the connected flag when removed from the DOM', () => {
        const el = document.createElement('simple-ng-element') as TestElement;
        expect(el._flags & ElementFlags.Connected).toBeFalsy();
        testContainer.appendChild(el);
        expect(el._flags & ElementFlags.Connected).toBeTruthy();
        testContainer.removeChild(el);
        expect(el._flags & ElementFlags.Connected).toBeFalsy();
      });
    });

    describe('withStaticTemplate mixin', () => {

      class TestStaticTemplateElement extends withNgElement(withStaticTemplate()){
        static ngStaticTemplate = '<div>Hello World!</div>';
        _upgrade(){
          (this._flags |= ElementFlags.ShadowRoot);
          super._upgrade();
        }
      }

      class TestStaticTemplateElementNoShadow extends withNgElement(withStaticTemplate()) {
        static ngStaticTemplate = '<div>Hello World!</div>';
        _upgrade(){
          (this._flags |= ~ElementFlags.ShadowRoot);
          super._upgrade();
        }
      }

      customElements.define('static-template-test', TestStaticTemplateElement);
      customElements.define('static-template-test-no-shadow', TestStaticTemplateElementNoShadow);
      beforeAll(() => {

      })

      it('should create a static view from a HTML string into the shadow root', () => {
        const el = document.createElement('static-template-test');
        expect(el.shadowRoot).toBeDefined();
        expect(el.shadowRoot!.querySelector('div')!.textContent).toEqual('Hello World!')
      });

      it('should create a static view from a HTML string into the light DOM', () => {
        const el = document.createElement('static-template-test-no-shadow');

        expect(el.shadowRoot).toBeFalsy()
      });



    });









    });
