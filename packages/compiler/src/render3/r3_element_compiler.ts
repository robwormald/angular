/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {CompileReflector} from '../compile_reflector';
import {DefinitionKind} from '../constant_pool';
import * as o from '../output/output_ast';
import {OutputContext, error} from '../util';

import {R3DependencyMetadata, R3FactoryTarget, compileFactoryFunction, dependenciesFromGlobalMetadata} from './r3_factory';
import {Identifiers as R3} from './r3_identifiers';
import {R3Reference, typeWithParameters, wrapReference} from './util';


 export interface R3NgElementMetadata {
   selector: string;
   observedAttributes: string[];
   shadowRoot: boolean | ShadowRootInit;
   type: R3Reference;

  /**
   * An expression representing the pipe being compiled, intended for use within a class definition
   * itself.
   *
   * This can differ from the outer `type` if the class is being compiled by ngcc and is inside an
   * IIFE structure that uses a different name internally.
   */
  internalType: o.Expression;

  /**
   * Number of generic type parameters of the type itself.
   */
  typeArgumentCount: number;

 }

 export function compileNgElementFromMetadata(metadata: R3NgElementMetadata){
  const definitionMapValues: {key: string, quoted: boolean, value: o.Expression}[] = [];
  const observedAttributeValues = []

  definitionMapValues.push({key: 'selector', value: o.literal(metadata.selector || 'fuck'), quoted: true});

  const expression = o.importExpr(R3.defineNgElement).callFn([o.literalMap(definitionMapValues)]);
  const type = new o.ExpressionType(o.importExpr(R3.NgElementDefWithMeta, [
    typeWithParameters(metadata.type.type, metadata.typeArgumentCount),
    new o.ExpressionType(new o.LiteralExpr(metadata.selector)),
  ]));

  const attrExpression = compileObservedAttributes(metadata.observedAttributes);

  return [attrExpression, {expression, type}];
 }

 function compileObservedAttributes(attrs: string[]){
   const expression = o.literalArr(attrs.map(attr => o.literal(attr)));
   const type = new o.ExpressionType(new o.LiteralArrayExpr([]));
   return {expression, type}
 }
