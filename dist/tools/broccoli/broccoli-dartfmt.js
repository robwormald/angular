"use strict";
var fse = require('fs-extra');
var path = require('path');
var diffing_broccoli_plugin_1 = require('./diffing-broccoli-plugin');
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
function processToPromise(process) {
    return new Promise(function (resolve, reject) {
        process.on('close', function (code) {
            if (code) {
                reject(code);
            }
            else {
                resolve();
            }
        });
    });
}
var DartFormatter = (function () {
    function DartFormatter(inputPath, cachePath, options) {
        this.inputPath = inputPath;
        this.cachePath = cachePath;
        this.firstBuild = true;
        if (!options.dartSDK)
            throw new Error('Missing Dart SDK');
        this.DARTFMT = options.dartSDK.DARTFMT;
        this.verbose = options.logs.dartfmt;
    }
    DartFormatter.prototype.rebuild = function (treeDiff) {
        var _this = this;
        var args = ['-w'];
        var argsLength = 2;
        var argPackages = [];
        var firstBuild = this.firstBuild;
        treeDiff.addedPaths.concat(treeDiff.changedPaths).forEach(function (changedFile) {
            var sourcePath = path.join(_this.inputPath, changedFile);
            var destPath = path.join(_this.cachePath, changedFile);
            if (!firstBuild && /\.dart$/.test(changedFile)) {
                if ((argsLength + destPath.length + 2) >= 0x2000) {
                    // Win32 command line arguments length
                    argPackages.push(args);
                    args = ['-w'];
                    argsLength = 2;
                }
                args.push(destPath);
                argsLength += destPath.length + 2;
            }
            fse.copySync(sourcePath, destPath);
        });
        treeDiff.removedPaths.forEach(function (removedFile) {
            var destPath = path.join(_this.cachePath, removedFile);
            fse.removeSync(destPath);
        });
        if (!firstBuild && args.length > 1) {
            argPackages.push(args);
        }
        var execute = function (args) {
            if (args.length < 2)
                return Promise.resolve();
            return new Promise(function (resolve, reject) {
                exec(_this.DARTFMT + ' ' + args.join(' '), function (err, stdout, stderr) {
                    if (_this.verbose) {
                        console.log(stdout);
                    }
                    if (err) {
                        console.error(shortenFormatterOutput(stderr));
                        reject('Formatting failed.');
                    }
                    else {
                        resolve();
                    }
                });
            });
        };
        if (firstBuild) {
            // On firstBuild, format the entire cachePath
            this.firstBuild = false;
            return execute(['-w', this.cachePath]);
        }
        return Promise.all(argPackages.map(execute));
    };
    return DartFormatter;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = diffing_broccoli_plugin_1.wrapDiffingPlugin(DartFormatter);
var ARROW_LINE = /^(\s+)\^+/;
var BEFORE_CHARS = 15;
var stripAnsi = require('strip-ansi');
function shortenFormatterOutput(formatterOutput) {
    var lines = formatterOutput.split('\n');
    var match, line;
    for (var i = 0; i < lines.length; i += 1) {
        line = lines[i];
        if (match = stripAnsi(line).match(ARROW_LINE)) {
            var leadingWhitespace = match[1].length;
            var leadingCodeChars = Math.min(leadingWhitespace, BEFORE_CHARS);
            lines[i] = line.substr(leadingWhitespace - leadingCodeChars);
            lines[i - 1] = lines[i - 1].substr(leadingWhitespace - leadingCodeChars, 80) + '…';
        }
    }
    return lines.join('\n');
}
//# sourceMappingURL=broccoli-dartfmt.js.map