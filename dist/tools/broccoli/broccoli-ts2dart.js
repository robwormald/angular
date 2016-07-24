"use strict";
var fs = require('fs');
var path = require('path');
var diffing_broccoli_plugin_1 = require('./diffing-broccoli-plugin');
var TSToDartTranspiler = (function () {
    function TSToDartTranspiler(inputPath, cachePath, options /*ts2dart.TranspilerOptions*/) {
        this.inputPath = inputPath;
        this.cachePath = cachePath;
        this.options = options;
        options.basePath = inputPath;
        options.tsconfig = path.join(inputPath, options.tsconfig);
        // Workaround for https://github.com/dart-lang/dart_style/issues/493
        var ts2dart = require('ts2dart');
        this.transpiler = new ts2dart.Transpiler(options);
    }
    TSToDartTranspiler.prototype.rebuild = function (treeDiff) {
        var _this = this;
        var toEmit = [
            path.resolve(this.inputPath, 'angular2/manual_typings/globals.d.ts'),
            path.resolve(this.inputPath, 'angular2/typings/es6-promise/es6-promise.d.ts'),
            path.resolve(this.inputPath, 'angular2/typings/es6-collections/es6-collections.d.ts')
        ];
        var getDartFilePath = function (path) { return path.replace(/((\.js)|(\.ts))$/i, '.dart'); };
        treeDiff.addedPaths.concat(treeDiff.changedPaths).forEach(function (changedPath) {
            var inputFilePath = path.resolve(_this.inputPath, changedPath);
            // Ignore files which don't need to be transpiled to Dart
            var dartInputFilePath = getDartFilePath(inputFilePath);
            if (fs.existsSync(dartInputFilePath))
                return;
            // Prepare to rebuild
            toEmit.push(path.resolve(_this.inputPath, changedPath));
        });
        treeDiff.removedPaths.forEach(function (removedPath) {
            var absolutePath = path.resolve(_this.inputPath, removedPath);
            // Ignore files which don't need to be transpiled to Dart
            var dartInputFilePath = getDartFilePath(absolutePath);
            if (fs.existsSync(dartInputFilePath))
                return;
            var dartOutputFilePath = getDartFilePath(removedPath);
            fs.unlinkSync(path.join(_this.cachePath, dartOutputFilePath));
        });
        this.transpiler.transpile(toEmit, this.cachePath);
    };
    TSToDartTranspiler.includeExtensions = ['.ts'];
    return TSToDartTranspiler;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = diffing_broccoli_plugin_1.wrapDiffingPlugin(TSToDartTranspiler);
//# sourceMappingURL=broccoli-ts2dart.js.map