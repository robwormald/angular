/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {withNgElement, defineNgElement, NgElementDef, ElementFlags} from '../src/render3/index';

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
            (this._ngFlags |= ElementFlags.ShadowRoot);
          }
        });
        const el = document.createElement('no-shadow-element') as TestElement;
        expect(el).toBeDefined();
        expect(el.shadowRoot).toBeDefined();
      });

      it('should set the upgraded flag', () => {
        const el = document.createElement('simple-ng-element') as TestElement;
        expect(el._ngFlags & ElementFlags.Upgraded).toBeTruthy();
      });

      it('should set the connected flag when added to the DOM', () => {
        const el = document.createElement('simple-ng-element') as TestElement;
        expect(el._ngFlags & ElementFlags.Connected).toBeFalsy();
        testContainer.appendChild(el);
        expect(el._ngFlags & ElementFlags.Connected).toBeTruthy();
      });

      it('should unset the connected flag when removed from the DOM', () => {
        const el = document.createElement('simple-ng-element') as TestElement;
        expect(el._ngFlags & ElementFlags.Connected).toBeFalsy();
        testContainer.appendChild(el);
        expect(el._ngFlags & ElementFlags.Connected).toBeTruthy();
        testContainer.removeChild(el);
        expect(el._ngFlags & ElementFlags.Connected).toBeFalsy();
      });
    });
  });
