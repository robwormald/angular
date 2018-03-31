/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * Defines template and style encapsulation options available for Component's {@link Component}.
 *
 * See {@link Component#encapsulation encapsulation}.
 * @stable
 */
export enum ViewEncapsulation {
  /**
   * Emulate `Native` scoping of styles by adding an attribute containing surrogate id to the Host
   * Element and pre-processing the style rules provided via {@link Component#styles styles} or
   * {@link Component#styleUrls styleUrls}, and adding the new Host Element attribute to all
   * selectors.
   *
   * This is the default option.
   */
  Emulated = 0,
  /**
   * @deprecated Use ViewEncapsulation.ShadowDom instead
   */
  Native = 1,
  /**
   * Don't provide any template or style encapsulation.
   */
  None = 2,

  /**
   * Use [Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/) to create
   * a ShadowRoot for Component's Host Element.
   */
  ShadowDom = 3
}
