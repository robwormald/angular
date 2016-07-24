"use strict";
var fs = require('fs');
var path = require('path');
var diffing_broccoli_plugin_1 = require('./diffing-broccoli-plugin');
/**
 * Checks that modules do not import files that are not supposed to import.
 *
 * This guarantees that platform-independent modules remain platoform-independent.
 */
var CheckImports = (function () {
    function CheckImports(inputPath, cachePath, options) {
        this.inputPath = inputPath;
        this.cachePath = cachePath;
        this.options = options;
        this.initRun = true;
    }
    CheckImports.prototype.rebuild = function (treeDiff) {
        var errors = this.checkAllPaths(treeDiff);
        if (errors.length > 0) {
            throw new Error("The following imports are not allowed because they break barrel boundaries:\n" + errors.join("\n"));
        }
        this.symlinkInputAndCacheIfNeeded();
        return treeDiff;
    };
    CheckImports.prototype.checkAllPaths = function (treeDiff) {
        var _this = this;
        var changesFiles = treeDiff.addedPaths.concat(treeDiff.changedPaths);
        return flatMap(changesFiles, function (_) { return _this.checkFilePath(_); });
    };
    CheckImports.prototype.symlinkInputAndCacheIfNeeded = function () {
        if (this.initRun) {
            fs.rmdirSync(this.cachePath);
            fs.symlinkSync(this.inputPath, this.cachePath);
        }
        this.initRun = false;
    };
    CheckImports.prototype.checkFilePath = function (filePath) {
        var _this = this;
        var sourceFilePath = path.join(this.inputPath, filePath);
        if (endsWith(sourceFilePath, '.ts') && fs.existsSync(sourceFilePath)) {
            var content = fs.readFileSync(sourceFilePath, 'UTF-8');
            var imports = content.match(CheckImports.IMPORT_DECL_REGEXP);
            if (imports) {
                return imports.filter(function (i) { return !_this.isAllowedImport(filePath, i); })
                    .map(function (i) { return _this.formatError(filePath, i); });
            }
            else {
                return [];
            }
        }
        return [];
    };
    CheckImports.prototype.isAllowedImport = function (sourceFile, importDecl) {
        var res = CheckImports.IMPORT_PATH_REGEXP.exec(importDecl);
        if (!res || res.length < 2)
            return true; // non-es6 import
        var importPath = res[1];
        if (startsWith(importPath, './') || startsWith(importPath, '../'))
            return true;
        var c = CheckImports.ALLOWED_IMPORTS;
        for (var prop in c) {
            if (c.hasOwnProperty(prop) && startsWith(sourceFile, prop)) {
                var allowedPaths = c[prop];
                return startsWith(importPath, prop) ||
                    allowedPaths.filter(function (p) { return startsWith(importPath, p); }).length > 0;
            }
        }
        return true;
    };
    CheckImports.prototype.formatError = function (filePath, importPath) {
        var i = importPath.replace(new RegExp("\n", 'g'), '\\n');
        return filePath + ": " + i;
    };
    CheckImports.IMPORT_DECL_REGEXP = new RegExp("^import[^;]+;", 'mg');
    CheckImports.IMPORT_PATH_REGEXP = new RegExp("['\"]([^'\"]+)+['\"]", 'm');
    CheckImports.ALLOWED_IMPORTS = {
        'angular2/src/core': ['angular2/src/facade'],
        'angular2/src/facade': ['rxjs'],
        'angular2/src/common': ['angular2/core', 'angular2/src/facade'],
        'angular2/src/http': ['angular2/core', 'angular2/src/facade', 'rxjs'],
        'angular2/src/upgrade': ['angular2/core', 'angular2/src/facade', 'angular2/platform/browser', 'angular2/compiler']
    };
    return CheckImports;
}());
function startsWith(str, substring) {
    return str.substring(0, substring.length) === substring;
}
function endsWith(str, substring) {
    return str.indexOf(substring, str.length - substring.length) !== -1;
}
function flatMap(arr, fn) {
    return (_a = []).concat.apply(_a, arr.map(fn));
    var _a;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = diffing_broccoli_plugin_1.wrapDiffingPlugin(CheckImports);
//# sourceMappingURL=broccoli-check-imports.js.map