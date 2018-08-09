/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

const globals = {};

module.exports = {
  entry: '../../../dist/packages-dist/elements/fesm2015/platform.js',
  dest: '../../../dist/packages-dist/elements/bundles/platform.umd.js',
  format: 'umd',
  exports: 'named',
  amd: {id: '@angular/elements/platform'},
  moduleName: 'ng.elements.platform',
  external: Object.keys(globals),
  globals: globals
};
