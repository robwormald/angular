/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { HtmlAst } from '@angular/compiler/src/html_ast';
import { HtmlParseTreeResult } from '@angular/compiler/src/html_parser';
import { ParseLocation } from '@angular/compiler/src/parse_util';
export declare function humanizeDom(parseResult: HtmlParseTreeResult, addSourceSpan?: boolean): any[];
export declare function humanizeDomSourceSpans(parseResult: HtmlParseTreeResult): any[];
export declare function humanizeNodes(nodes: HtmlAst[], addSourceSpan?: boolean): any[];
export declare function humanizeLineColumn(location: ParseLocation): string;
