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
 * Entry point for all public APIs of the `element` package.
 */
export {NgHostElement} from './src/host_element';
export * from './src/metadata';
export {defineNgElement} from './src/defs';
export * from './src/component_host';
export {defineCustomElement}from './src/utils';
// This file only reexports content of the `src` folder. Keep it that way.
