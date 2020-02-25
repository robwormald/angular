/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as o from '../../output/output_ast';
import {R3Reference} from '../util';

export interface R3NgElementMetadata {
  /**
   * The HTML tag name associated with this NgElement. Must be a (valid Custom Element selector)[]
   */
  selector: string;

  /**
   * Attributes in this list are watched by the browser and fire the `attributeChangedCallback` lifecycle method
   * On upgrade, the spec guarantees all initial attribute values are reported before the `connectedCallback` fires
     */
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
