/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @module
 * @description
 * Entry point for all public APIs of the `elements` package.
 */
export {NgElement, NgElementConfig, NgElementConstructor, WithProperties, createCustomElement} from './src/create-custom-element';
export {NgElementStrategy, NgElementStrategyEvent, NgElementStrategyFactory} from './src/element-strategy';
export {withNgComponent} from './src/renderer';
export {VERSION} from './src/version';
export {withNgElement, defineNgElement} from './src/render3/index';
// This file only reexports content of the `src` folder. Keep it that way.
