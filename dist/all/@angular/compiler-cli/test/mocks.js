/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var ts = require('typescript');
var MockContext = (function () {
    function MockContext(currentDirectory, files) {
        this.currentDirectory = currentDirectory;
        this.files = files;
    }
    MockContext.prototype.fileExists = function (fileName) { return typeof this.getEntry(fileName) === 'string'; };
    MockContext.prototype.directoryExists = function (path) { return typeof this.getEntry(path) === 'object'; };
    MockContext.prototype.readFile = function (fileName) {
        var data = this.getEntry(fileName);
        if (typeof data === 'string') {
            return data;
        }
        return undefined;
    };
    MockContext.prototype.writeFile = function (fileName, data) {
        var parts = fileName.split('/');
        var name = parts.pop();
        var entry = this.getEntry(parts);
        if (entry && typeof entry !== 'string') {
            entry[name] = data;
        }
    };
    MockContext.prototype.assumeFileExists = function (fileName) { this.writeFile(fileName, ''); };
    MockContext.prototype.getEntry = function (fileName) {
        var parts = typeof fileName === 'string' ? fileName.split('/') : fileName;
        if (parts[0]) {
            parts = this.currentDirectory.split('/').concat(parts);
        }
        parts.shift();
        parts = normalize(parts);
        var current = this.files;
        while (parts.length) {
            var part = parts.shift();
            if (typeof current === 'string') {
                return undefined;
            }
            var next = current[part];
            if (next === undefined) {
                return undefined;
            }
            current = next;
        }
        return current;
    };
    return MockContext;
}());
exports.MockContext = MockContext;
function normalize(parts) {
    var result = [];
    while (parts.length) {
        var part = parts.shift();
        switch (part) {
            case '.':
                break;
            case '..':
                result.pop();
                break;
            default:
                result.push(part);
        }
    }
    return result;
}
var MockCompilerHost = (function () {
    function MockCompilerHost(context) {
        var _this = this;
        this.context = context;
        this.writeFile = function (fileName, text) { _this.context.writeFile(fileName, text); };
    }
    MockCompilerHost.prototype.fileExists = function (fileName) { return this.context.fileExists(fileName); };
    MockCompilerHost.prototype.readFile = function (fileName) { return this.context.readFile(fileName); };
    MockCompilerHost.prototype.directoryExists = function (directoryName) {
        return this.context.directoryExists(directoryName);
    };
    MockCompilerHost.prototype.getSourceFile = function (fileName, languageVersion, onError) {
        var sourceText = this.context.readFile(fileName);
        if (sourceText) {
            return ts.createSourceFile(fileName, sourceText, languageVersion);
        }
        else {
            return undefined;
        }
    };
    MockCompilerHost.prototype.getDefaultLibFileName = function (options) {
        return ts.getDefaultLibFileName(options);
    };
    MockCompilerHost.prototype.getCurrentDirectory = function () {
        return this.context.currentDirectory;
    };
    MockCompilerHost.prototype.getCanonicalFileName = function (fileName) { return fileName; };
    MockCompilerHost.prototype.useCaseSensitiveFileNames = function () { return false; };
    MockCompilerHost.prototype.getNewLine = function () { return '\n'; };
    return MockCompilerHost;
}());
exports.MockCompilerHost = MockCompilerHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS90ZXN0L21vY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxJQUFZLEVBQUUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQVFqQztJQUNFLHFCQUFtQixnQkFBd0IsRUFBVSxLQUFZO1FBQTlDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtRQUFVLFVBQUssR0FBTCxLQUFLLENBQU87SUFBRyxDQUFDO0lBRXJFLGdDQUFVLEdBQVYsVUFBVyxRQUFnQixJQUFhLE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztJQUU3RixxQ0FBZSxHQUFmLFVBQWdCLElBQVksSUFBYSxNQUFNLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFMUYsOEJBQVEsR0FBUixVQUFTLFFBQWdCO1FBQ3ZCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUM3QixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUVELCtCQUFTLEdBQVQsVUFBVSxRQUFnQixFQUFFLElBQVk7UUFDdEMsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNoQyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENB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