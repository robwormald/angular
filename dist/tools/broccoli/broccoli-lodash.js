"use strict";
var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var _ = require('lodash');
var diffing_broccoli_plugin_1 = require('./diffing-broccoli-plugin');
var kDefaultOptions = {
    encoding: 'utf-8',
    context: {},
    files: []
};
/**
 * Intercepts each changed file and replaces its contents with
 * the associated changes.
 */
var LodashRenderer = (function () {
    function LodashRenderer(inputPath, cachePath, options) {
        if (options === void 0) { options = kDefaultOptions; }
        this.inputPath = inputPath;
        this.cachePath = cachePath;
        this.options = options;
    }
    LodashRenderer.prototype.rebuild = function (treeDiff) {
        var _this = this;
        var _a = this.options, _b = _a.encoding, encoding = _b === void 0 ? 'utf-8' : _b, _c = _a.context, context = _c === void 0 ? {} : _c;
        var processFile = function (relativePath) {
            var sourceFilePath = path.join(_this.inputPath, relativePath);
            var destFilePath = path.join(_this.cachePath, relativePath);
            var content = fs.readFileSync(sourceFilePath, { encoding: encoding });
            var transformedContent = _.template(content)(context);
            fse.outputFileSync(destFilePath, transformedContent);
        };
        var removeFile = function (relativePath) {
            var destFilePath = path.join(_this.cachePath, relativePath);
            fs.unlinkSync(destFilePath);
        };
        treeDiff.addedPaths.concat(treeDiff.changedPaths).forEach(processFile);
        treeDiff.removedPaths.forEach(removeFile);
    };
    return LodashRenderer;
}());
exports.LodashRenderer = LodashRenderer;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = diffing_broccoli_plugin_1.wrapDiffingPlugin(LodashRenderer);
//# sourceMappingURL=broccoli-lodash.js.map