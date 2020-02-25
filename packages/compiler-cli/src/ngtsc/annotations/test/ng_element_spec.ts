/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ts from 'typescript';
import {absoluteFrom, getSourceFileOrError} from '../../file_system';
import {TestFile, runInEachFileSystem} from '../../file_system/testing';
import {NOOP_DEFAULT_IMPORT_RECORDER, NoopImportRewriter} from '../../imports';
import {TypeScriptReflectionHost} from '../../reflection';
import {getDeclaration, makeProgram} from '../../testing';
import {ImportManager, translateStatement} from '../../translator';
import {generateSetClassMetadataCall} from '../src/metadata';

runInEachFileSystem(() => {
  describe('ng_element_compiler', () => {
    it('should convert decorated class metadata', () => {
      const res = compileAndPrint(`
    import {NgElement, NgHostElement} from '@angular/element';

    @NgElement({
      selector: 'test-element'
    }) class TestElement extends NgHostElement  {}
    `);
      expect(res).toEqual(
          `/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Target, [{ type: Component, args: ['metadata'] }], null, null); })();`);
    });


  });

  function compileAndPrint(contents: string): string {
    const _ = absoluteFrom;
    const CORE: TestFile = {
      name: _('/node_modules/@angular/core/index.d.ts'),
      contents: `
      export declare function Input(...args: any[]): any;
      export declare function Inject(...args: any[]): any;
      export declare function Component(...args: any[]): any;
      export declare class Injector {}
    `
    };

    const ELEMENT: TestFile = {
      name: _('/node_modules/@angular/element/index.d.ts'),
      contents: `
      export declare function NgElement(...args: any[]): any;
      export declare function Prop(...args: any[]): any;
      export declare class NgHostElement {}
    `
    };

    const {program} = makeProgram(
        [
          CORE, ELEMENT, {
            name: _('/index.ts'),
            contents,
          }
        ],
        {target: ts.ScriptTarget.ES2015});
    const host = new TypeScriptReflectionHost(program.getTypeChecker());
    const target = getDeclaration(program, _('/index.ts'), 'TestElement', ts.isClassDeclaration);
    const call = generateSetClassMetadataCall(target, host, NOOP_DEFAULT_IMPORT_RECORDER, false);
    if (call === null) {
      return '';
    }
    const sf = getSourceFileOrError(program, _('/index.ts'));
    const im = new ImportManager(new NoopImportRewriter(), 'i');
    const tsStatement =
        translateStatement(call, im, NOOP_DEFAULT_IMPORT_RECORDER, ts.ScriptTarget.ES2015);
    const res = ts.createPrinter().printNode(ts.EmitHint.Unspecified, tsStatement, sf);
    return res.replace(/\s+/g, ' ');
  }
});
