"use strict";
var fs = require('fs');
var fse = require('fs-extra');
var path = require('path');
var ts = require('typescript');
var diffing_broccoli_plugin_1 = require('./diffing-broccoli-plugin');
var tsc_wrapped_1 = require('../@angular/tsc-wrapped');
var FS_OPTS = {
    encoding: 'utf-8'
};
// Sub-directory where the @internal typing files (.d.ts) are stored
exports.INTERNAL_TYPINGS_PATH = 'internal_typings';
// Monkey patch the TS compiler to be able to re-emit files with @internal symbols
var tsEmitInternal = false;
var originalEmitFiles = ts.emitFiles;
ts.emitFiles = function (resolver, host, targetSourceFile) {
    if (tsEmitInternal) {
        var orignalgetCompilerOptions_1 = host.getCompilerOptions;
        host.getCompilerOptions = function () {
            var options = clone(orignalgetCompilerOptions_1.call(host));
            options.stripInternal = false;
            options.outDir = options.outDir + "/" + exports.INTERNAL_TYPINGS_PATH;
            return options;
        };
    }
    return originalEmitFiles(resolver, host, targetSourceFile);
};
/**
 * Broccoli plugin that implements incremental Typescript compiler.
 *
 * It instantiates a typescript compiler instance that keeps all the state about the project and
 * can re-emit only the files that actually changed.
 *
 * Limitations: only files that map directly to the changed source file via naming conventions are
 * re-emitted. This primarily affects code that uses `const enum`s, because changing the enum value
 * requires global emit, which can affect many files.
 */
var DiffingTSCompiler = (function () {
    function DiffingTSCompiler(inputPath, cachePath, options) {
        this.inputPath = inputPath;
        this.cachePath = cachePath;
        this.options = options;
        this.fileRegistry = Object.create(null);
        this.firstRun = true;
        this.previousRunFailed = false;
        // Whether to generate the @internal typing files (they are only generated when `stripInternal` is
        // true)
        this.genInternalTypings = false;
        // TODO: define an interface for options
        if (options.rootFilePaths) {
            this.rootFilePaths = options.rootFilePaths.splice(0);
            delete options.rootFilePaths;
        }
        else {
            this.rootFilePaths = [];
        }
        if (options.internalTypings) {
            this.genInternalTypings = true;
            delete options.internalTypings;
        }
        // the conversion is a bit awkward, see https://github.com/Microsoft/TypeScript/issues/5276
        // in 1.8 use convertCompilerOptionsFromJson
        this.tsOpts =
            ts.parseJsonConfigFileContent({ compilerOptions: options, files: [] }, null, null).options;
        if (this.tsOpts.stripInternal === false) {
            // @internal are included in the generated .d.ts, do not generate them separately
            this.genInternalTypings = false;
        }
        this.tsOpts.rootDir = inputPath;
        this.tsOpts.baseUrl = inputPath;
        this.tsOpts.outDir = this.cachePath;
        this.tsServiceHost = new CustomLanguageServiceHost(this.tsOpts, this.rootFilePaths, this.fileRegistry, this.inputPath);
        this.tsService = ts.createLanguageService(this.tsServiceHost, ts.createDocumentRegistry());
        this.metadataCollector = new tsc_wrapped_1.MetadataCollector();
    }
    DiffingTSCompiler.prototype.rebuild = function (treeDiff) {
        var _this = this;
        var pathsToEmit = [];
        var pathsWithErrors = [];
        var errorMessages = [];
        treeDiff.addedPaths.concat(treeDiff.changedPaths).forEach(function (tsFilePath) {
            if (!_this.fileRegistry[tsFilePath]) {
                _this.fileRegistry[tsFilePath] = { version: 0 };
                _this.rootFilePaths.push(tsFilePath);
            }
            else {
                _this.fileRegistry[tsFilePath].version++;
            }
            pathsToEmit.push(path.join(_this.inputPath, tsFilePath));
        });
        treeDiff.removedPaths.forEach(function (tsFilePath) {
            console.log('removing outputs for', tsFilePath);
            _this.rootFilePaths.splice(_this.rootFilePaths.indexOf(tsFilePath), 1);
            _this.fileRegistry[tsFilePath] = null;
            _this.removeOutputFor(tsFilePath);
        });
        if (this.firstRun) {
            this.firstRun = false;
            this.doFullBuild();
        }
        else {
            var program_1 = this.tsService.getProgram();
            tsEmitInternal = false;
            pathsToEmit.forEach(function (tsFilePath) {
                var output = _this.tsService.getEmitOutput(tsFilePath);
                if (output.emitSkipped) {
                    var errorFound = _this.collectErrors(tsFilePath);
                    if (errorFound) {
                        pathsWithErrors.push(tsFilePath);
                        errorMessages.push(errorFound);
                    }
                }
                else {
                    output.outputFiles.forEach(function (o) {
                        var destDirPath = path.dirname(o.name);
                        fse.mkdirsSync(destDirPath);
                        fs.writeFileSync(o.name, _this.fixSourceMapSources(o.text), FS_OPTS);
                        if (endsWith(o.name, '.d.ts')) {
                            var sourceFile = program_1.getSourceFile(tsFilePath);
                            _this.emitMetadata(o.name, sourceFile);
                        }
                    });
                }
            });
            if (pathsWithErrors.length) {
                this.previousRunFailed = true;
                var error = new Error('Typescript found the following errors:\n' + errorMessages.join('\n'));
                error['showStack'] = false;
                throw error;
            }
            else if (this.previousRunFailed) {
                this.doFullBuild();
            }
            else if (this.genInternalTypings) {
                // serialize the .d.ts files containing @internal symbols
                tsEmitInternal = true;
                pathsToEmit.forEach(function (tsFilePath) {
                    var output = _this.tsService.getEmitOutput(tsFilePath);
                    if (!output.emitSkipped) {
                        output.outputFiles.forEach(function (o) {
                            if (endsWith(o.name, '.d.ts')) {
                                var destDirPath = path.dirname(o.name);
                                fse.mkdirsSync(destDirPath);
                                fs.writeFileSync(o.name, _this.fixSourceMapSources(o.text), FS_OPTS);
                            }
                        });
                    }
                });
                tsEmitInternal = false;
            }
        }
    };
    DiffingTSCompiler.prototype.collectErrors = function (tsFilePath) {
        var allDiagnostics = this.tsService.getCompilerOptionsDiagnostics()
            .concat(this.tsService.getSyntacticDiagnostics(tsFilePath))
            .concat(this.tsService.getSemanticDiagnostics(tsFilePath));
        var errors = [];
        allDiagnostics.forEach(function (diagnostic) {
            var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
            if (diagnostic.file) {
                var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
                errors.push("  " + diagnostic.file.fileName + " (" + (line + 1) + "," + (character + 1) + "): " + message);
            }
            else {
                errors.push("  Error: " + message);
            }
        });
        if (errors.length) {
            return errors.join('\n');
        }
    };
    DiffingTSCompiler.prototype.doFullBuild = function () {
        var _this = this;
        var program = this.tsService.getProgram();
        var typeChecker = program.getTypeChecker();
        var diagnostics = [];
        tsEmitInternal = false;
        var emitResult = program.emit(undefined, function (absoluteFilePath, fileContent) {
            fse.mkdirsSync(path.dirname(absoluteFilePath));
            fs.writeFileSync(absoluteFilePath, _this.fixSourceMapSources(fileContent), FS_OPTS);
            if (endsWith(absoluteFilePath, '.d.ts')) {
                // TODO: Use sourceFile from the callback if
                //   https://github.com/Microsoft/TypeScript/issues/7438
                // is taken
                var originalFile = absoluteFilePath.replace(_this.tsOpts.outDir, _this.tsOpts.rootDir)
                    .replace(/\.d\.ts$/, '.ts');
                var sourceFile = program.getSourceFile(originalFile);
                _this.emitMetadata(absoluteFilePath, sourceFile);
            }
        });
        if (this.genInternalTypings) {
            // serialize the .d.ts files containing @internal symbols
            tsEmitInternal = true;
            program.emit(undefined, function (absoluteFilePath, fileContent) {
                if (endsWith(absoluteFilePath, '.d.ts')) {
                    fse.mkdirsSync(path.dirname(absoluteFilePath));
                    fs.writeFileSync(absoluteFilePath, fileContent, FS_OPTS);
                }
            });
            tsEmitInternal = false;
        }
        if (emitResult.emitSkipped) {
            var allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
            var errorMessages_1 = [];
            allDiagnostics.forEach(function (diagnostic) {
                var pos = '';
                if (diagnostic.file) {
                    var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
                    pos = diagnostic.file.fileName + " (" + (line + 1) + ", " + (character + 1) + "): ";
                }
                var message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
                errorMessages_1.push("  " + pos + message);
            });
            if (errorMessages_1.length) {
                this.previousRunFailed = true;
                var error = new Error('Typescript found the following errors:\n' + errorMessages_1.join('\n'));
                error['showStack'] = false;
                throw error;
            }
            else {
                this.previousRunFailed = false;
            }
        }
    };
    /**
     * Emit a .metadata.json file to correspond to the .d.ts file if the module contains classes that
     * use decorators or exported constants.
     */
    DiffingTSCompiler.prototype.emitMetadata = function (dtsFileName, sourceFile) {
        if (sourceFile) {
            var metadata = this.metadataCollector.getMetadata(sourceFile);
            if (metadata && metadata.metadata) {
                var metadataText = JSON.stringify(metadata);
                var metadataFileName = dtsFileName.replace(/\.d.ts$/, '.metadata.json');
                fs.writeFileSync(metadataFileName, metadataText, FS_OPTS);
            }
        }
    };
    /**
     * There is a bug in TypeScript 1.6, where the sourceRoot and inlineSourceMap properties
     * are exclusive. This means that the sources property always contains relative paths
     * (e.g, ../../../../angular2/src/di/injector.ts).
     *
     * Here, we normalize the sources property and remove the ../../../
     *
     * This issue is fixed in https://github.com/Microsoft/TypeScript/pull/5620.
     * Once we switch to TypeScript 1.8, we can remove this method.
     */
    DiffingTSCompiler.prototype.fixSourceMapSources = function (content) {
        try {
            var marker = '//# sourceMappingURL=data:application/json;base64,';
            var index = content.indexOf(marker);
            if (index == -1)
                return content;
            var base = content.substring(0, index + marker.length);
            var sourceMapBit = new Buffer(content.substring(index + marker.length), 'base64').toString('utf8');
            var sourceMaps = JSON.parse(sourceMapBit);
            var source = sourceMaps.sources[0];
            sourceMaps.sources = [source.substring(source.lastIndexOf('../') + 3)];
            return "" + base + new Buffer(JSON.stringify(sourceMaps)).toString('base64');
        }
        catch (e) {
            return content;
        }
    };
    DiffingTSCompiler.prototype.removeOutputFor = function (tsFilePath) {
        var absoluteJsFilePath = path.join(this.cachePath, tsFilePath.replace(/\.ts$/, '.js'));
        var absoluteMapFilePath = path.join(this.cachePath, tsFilePath.replace(/.ts$/, '.js.map'));
        var absoluteDtsFilePath = path.join(this.cachePath, tsFilePath.replace(/\.ts$/, '.d.ts'));
        if (fs.existsSync(absoluteJsFilePath)) {
            fs.unlinkSync(absoluteJsFilePath);
            if (fs.existsSync(absoluteMapFilePath)) {
                // source map could be inline or not generated
                fs.unlinkSync(absoluteMapFilePath);
            }
            fs.unlinkSync(absoluteDtsFilePath);
        }
    };
    DiffingTSCompiler.includeExtensions = ['.ts'];
    return DiffingTSCompiler;
}());
var CustomLanguageServiceHost = (function () {
    function CustomLanguageServiceHost(compilerOptions, fileNames, fileRegistry, treeInputPath) {
        this.compilerOptions = compilerOptions;
        this.fileNames = fileNames;
        this.fileRegistry = fileRegistry;
        this.treeInputPath = treeInputPath;
        this.currentDirectory = process.cwd();
        this.defaultLibFilePath = ts.getDefaultLibFilePath(compilerOptions).replace(/\\/g, '/');
    }
    CustomLanguageServiceHost.prototype.getScriptFileNames = function () {
        var _this = this;
        return this.fileNames.map(function (f) { return path.join(_this.treeInputPath, f); });
    };
    CustomLanguageServiceHost.prototype.getScriptVersion = function (fileName) {
        if (startsWith(fileName, this.treeInputPath)) {
            var key = fileName.substr(this.treeInputPath.length + 1);
            return this.fileRegistry[key] && this.fileRegistry[key].version.toString();
        }
    };
    CustomLanguageServiceHost.prototype.getScriptSnapshot = function (tsFilePath) {
        // TypeScript seems to request lots of bogus paths during import path lookup and resolution,
        // so we we just return undefined when the path is not correct.
        // Ensure it is in the input tree or a lib.d.ts file.
        if (!startsWith(tsFilePath, this.treeInputPath) && !tsFilePath.match(/\/lib(\..*)*.d\.ts$/)) {
            if (fs.existsSync(tsFilePath)) {
                console.log('Rejecting', tsFilePath, '. File is not in the input tree.');
            }
            return undefined;
        }
        // Ensure it exists
        if (!fs.existsSync(tsFilePath)) {
            return undefined;
        }
        return ts.ScriptSnapshot.fromString(fs.readFileSync(tsFilePath, FS_OPTS));
    };
    CustomLanguageServiceHost.prototype.getCurrentDirectory = function () { return this.currentDirectory; };
    CustomLanguageServiceHost.prototype.getCompilationSettings = function () { return this.compilerOptions; };
    CustomLanguageServiceHost.prototype.getDefaultLibFileName = function (options) {
        // ignore options argument, options should not change during the lifetime of the plugin
        return this.defaultLibFilePath;
    };
    return CustomLanguageServiceHost;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = diffing_broccoli_plugin_1.wrapDiffingPlugin(DiffingTSCompiler);
function clone(object) {
    var result = {};
    for (var id in object) {
        result[id] = object[id];
    }
    return result;
}
function startsWith(str, substring) {
    return str.substring(0, substring.length) === substring;
}
function endsWith(str, substring) {
    return str.indexOf(substring, str.length - substring.length) !== -1;
}
//# sourceMappingURL=broccoli-typescript.js.map