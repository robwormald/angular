"use strict";
var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var childProcess = require('child_process');
var glob = require('glob');
var diffing_broccoli_plugin_1 = require('./diffing-broccoli-plugin');
/**
 * Intercepts each changed file and replaces its contents with
 * the output of the generator.
 */
var GeneratorForTest = (function () {
    function GeneratorForTest(inputPath, outputPath, options) {
        this.inputPath = inputPath;
        this.outputPath = outputPath;
        this.options = options;
        this.seenFiles = {};
    }
    GeneratorForTest.prototype.rebuild = function (treeDiff) {
        var _this = this;
        var matchedFiles = [];
        this.options.files.forEach(function (file) { matchedFiles = matchedFiles.concat(glob.sync(file, { cwd: _this.inputPath })); });
        return Promise
            .all(matchedFiles.map(function (matchedFile) {
            var inputFilePath = path.join(_this.inputPath, matchedFile);
            var outputFilePath = path.join(_this.outputPath, matchedFile);
            var outputDirPath = path.dirname(outputFilePath);
            if (!fs.existsSync(outputDirPath)) {
                fse.mkdirpSync(outputDirPath);
            }
            return _this.invokeGenerator(matchedFile, inputFilePath, outputFilePath);
        }))
            .then(function () {
            var result = new diffing_broccoli_plugin_1.DiffResult();
            matchedFiles.forEach(function (file) {
                if (!_this.seenFiles[file]) {
                    result.addedPaths.push(file);
                    _this.seenFiles[file] = true;
                }
                else {
                    result.changedPaths.push(file);
                }
            });
            return result;
        });
    };
    GeneratorForTest.prototype.invokeGenerator = function (file, inputFilePath, outputFilePath) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var args;
            var vmPath;
            var env;
            if (_this.options.dartPath) {
                vmPath = _this.options.dartPath;
                args = [("--package-root=" + _this.inputPath), '--checked', inputFilePath, file];
                env = {};
            }
            else {
                vmPath = process.execPath;
                var script = "require('reflect-metadata');require('" + inputFilePath + "').main(['" + file + "']);";
                args = ['-e', script];
                env = { 'NODE_PATH': _this.inputPath };
            }
            var stdoutStream = fs.createWriteStream(outputFilePath);
            var proc = childProcess.spawn(vmPath, args, {
                stdio: ['ignore', 'pipe', 'inherit'],
                env: Object['assign']({}, process.env, env)
            });
            proc.on('error', function (code) {
                console.error(code);
                reject(new Error('Failed while generating code. Please run manually: ' + vmPath + ' ' + args.join(' ')));
            });
            proc.on('close', function () {
                stdoutStream.close();
                resolve();
            });
            proc.stdout.pipe(stdoutStream);
        });
    };
    return GeneratorForTest;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = diffing_broccoli_plugin_1.wrapDiffingPlugin(GeneratorForTest);
//# sourceMappingURL=broccoli-generate-for-test.js.map