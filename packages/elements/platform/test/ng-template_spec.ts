/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {defineNgTemplate} from '../src/ng_template';

describe('ng-element/ng-template ', () => {

    let testContainer:HTMLDivElement;

    beforeEach(() => {
      testContainer = document.createElement('div');
      document.body.appendChild(testContainer);
    });

    afterEach(() => {
      document.body.removeChild(testContainer);
    });

    describe('ngTemplateDef', () => {

      it('should build an empty static template factory', () => {
        const templateDef = defineNgTemplate({});
        expect(templateDef).toBeDefined();
      });

      it('should create an instance of a DocumentFragment', () => {
        const templateDef = defineNgTemplate({});
        const template = new templateDef();
        expect(template).toBeDefined();
        expect(template.content instanceof DocumentFragment).toBe(true);
      });

      it('should create a DocumentFragment with the given HTML', () => {
        const templateDef = defineNgTemplate({
          template: '<h1>Hello World!</h1>'
        });
        const template = templateDef.clone();

        testContainer.appendChild(template.content);
        const headerEl = testContainer.querySelector('h1');
        expect(headerEl).toBeDefined();
      });

      it('should create a DocumentFragment with the given styles', () => {
        const testStyles = [`:host { color: red; }`];
        const templateDef = defineNgTemplate({
          template: '<h1>Hello World!</h1>',
          styles: testStyles
        });
        const template = templateDef.clone();
        const styleEl = template.host.querySelector('style');
        expect(styleEl).toBeDefined();
        expect(styleEl!.textContent).toEqual(testStyles[0]);
      });

      it('should create a DocumentFragment with the given styles', () => {
        const testStyleUrls = ["foo.css"];
        const templateDef = defineNgTemplate({
          template: '<h1>Hello World!</h1>',
          styleUrls: testStyleUrls
        });
        const template = templateDef.clone();
        const styleEl = template.host.querySelector('link');
        expect(styleEl).toBeDefined();
        expect(styleEl!.getAttribute('href')).toEqual(testStyleUrls[0]);
        expect(styleEl!.getAttribute('type')).toEqual('text/css');
      });


    });

  });
