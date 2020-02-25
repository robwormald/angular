/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {Identifiers as R3} from '../r3_identifiers';
import {R3Reference, typeWithParameters, wrapReference} from '../util';
import * as o from '../../output/output_ast';
import {R3NgElementMetadata} from './api'

export function compileNgElementFromMetadata(metadata: R3NgElementMetadata){
  const definitionMapValues: {key: string, quoted: boolean, value: o.Expression}[] = [];


  definitionMapValues.push({key: 'selector', value: o.literal(metadata.selector), quoted: true});

  const expression = o.importExpr(R3.defineNgElement).callFn([o.literalMap(definitionMapValues)]);
  const type = new o.ExpressionType(o.importExpr(R3.NgElementDefWithMeta, [
    typeWithParameters(metadata.type.type, metadata.typeArgumentCount),
    new o.ExpressionType(new o.LiteralExpr(metadata.selector)),
  ]));

  const observedAttrs = compileObservedAttributesFromMetadata(metadata);

  return [observedAttrs, {expression, type}];
 }

/**
 *
 * Compiles a static `observedAttribute` property to be added to the constructor
 */
function compileObservedAttributesFromMetadata(meta: R3NgElementMetadata){
  const expression = o.literalArr(meta.observedAttributes.map(attr => o.literal(attr)));
  const type = new o.ExpressionType(new o.LiteralArrayExpr([]));
  return {expression, type}
}

 export {R3NgElementMetadata}
