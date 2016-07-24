/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AST } from '../../src/expression_parser/ast';
import { InterpolationConfig } from '../../src/interpolation_config';
export declare function unparse(ast: AST, interpolationConfig?: InterpolationConfig): string;
