const node = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const buildOptimizer = require('@angular-devkit/build-optimizer/src/build-optimizer/rollup-plugin.js');

module.exports = {
  plugins: [
    node({
      mainFields: ['browser', 'es2015', 'module', 'jsnext:main', 'main'],
    }),
    commonjs(),
    buildOptimizer.default({
      sideEffectFreeModules: [
        '.esm2015/packages/core/src',
        '.esm2015/packages/common/src',
        '.esm2015/packages/compiler/src',
        '.esm2015/packages/platform-browser/src',
      ]
    })
  ],
};

