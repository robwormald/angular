/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {withNgElement, defineNgElement, NgElementDef, ElementFlags} from '../src';
import { truncate } from 'fs';

describe('elements render3_spec', () => {

    let testContainer:HTMLDivElement;

    beforeEach(() => {
      testContainer = document.createElement('div');
      document.body.appendChild(testContainer);
    });

    afterEach(() => {
      document.body.removeChild(testContainer);
    });

    describe('NgElement', () => {

      class TestElement extends withNgElement() {}

      TestElement.observedAttributes = ['test-name'];

      customElements.define('simple-ng-element', TestElement);

      it('should work', () => {
        expect(customElements.get('simple-ng-element')).toBeDefined();
      });


      it('should not create a shadow root by default', () => {
        const el = document.createElement('simple-ng-element') as TestElement;
        expect(el).toBeDefined();
        expect(el.shadowRoot).toBeNull();
      });

      it('should set the upgraded flag', () => {
        const el = document.createElement('simple-ng-element') as any;
        expect(el._ngFlags & ElementFlags.Upgraded).toBeTruthy();
      });

      it('should set the connected flag when added to the DOM', () => {
        const el = document.createElement('simple-ng-element') as any;
        expect(el._ngFlags & ElementFlags.Connected).toBeFalsy();
        testContainer.appendChild(el);
        expect(el._ngFlags & ElementFlags.Connected).toBeTruthy();
      });

      it('should unset the connected flag when removed from the DOM', () => {
        const el = document.createElement('simple-ng-element') as any;
        expect(el._ngFlags & ElementFlags.Connected).toBeFalsy();
        testContainer.appendChild(el);
        expect(el._ngFlags & ElementFlags.Connected).toBeTruthy();
        testContainer.removeChild(el);
        expect(el._ngFlags & ElementFlags.Connected).toBeFalsy();
      });
    });

    describe('ngElementDef', () => {

      class TestDefElement extends withNgElement() {
        static ngElementDef = defineNgElement({
          selector: 'simple-ng-def-element'
        });
      }

      class ShadowTestDefElement extends withNgElement() {
        static ngElementDef = defineNgElement({
          selector: 'simple-shadow-ng-def-element',
          shadowRoot: true
        });
      }

      TestDefElement.observedAttributes = ['test-name'];

      customElements.define(TestDefElement.ngElementDef.selector, TestDefElement);
      customElements.define(ShadowTestDefElement.ngElementDef.selector, ShadowTestDefElement);

      it('should define an NgElement', () => {
        expect(customElements.get(TestDefElement.ngElementDef.selector)).toBeDefined();
      });
      it('should define an NgElement with a Shadow Root', () => {
        expect(customElements.get(ShadowTestDefElement.ngElementDef.selector)).toBeDefined();
        const shadowEl = document.createElement(ShadowTestDefElement.ngElementDef.selector);
        expect(shadowEl.shadowRoot).not.toBeNull();
      });
    });

  });
