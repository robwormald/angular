/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var tsc_wrapped_1 = require('@angular/tsc-wrapped');
var fs = require('fs');
var path = require('path');
var ts = require('typescript');
var compiler_private_1 = require('./compiler_private');
var static_reflector_1 = require('./static_reflector');
var EXT = /(\.ts|\.d\.ts|\.js|\.jsx|\.tsx)$/;
var DTS = /\.d\.ts$/;
var ReflectorHost = (function () {
    function ReflectorHost(program, compilerHost, options, context) {
        this.program = program;
        this.compilerHost = compilerHost;
        this.options = options;
        this.metadataCollector = new tsc_wrapped_1.MetadataCollector();
        this.typeCache = new Map();
        this.context = context || new NodeReflectorHostContext();
    }
    ReflectorHost.prototype.angularImportLocations = function () {
        return {
            coreDecorators: '@angular/core/src/metadata',
            diDecorators: '@angular/core/src/di/decorators',
            diMetadata: '@angular/core/src/di/metadata',
            diOpaqueToken: '@angular/core/src/di/opaque_token',
            animationMetadata: '@angular/core/src/animation/metadata',
            provider: '@angular/core/src/di/provider'
        };
    };
    ReflectorHost.prototype.resolve = function (m, containingFile) {
        var resolved = ts.resolveModuleName(m, containingFile, this.options, this.context).resolvedModule;
        return resolved ? resolved.resolvedFileName : null;
    };
    ;
    ReflectorHost.prototype.normalizeAssetUrl = function (url) {
        var assetUrl = compiler_private_1.AssetUrl.parse(url);
        return assetUrl ? assetUrl.packageName + "/" + assetUrl.modulePath : null;
    };
    ReflectorHost.prototype.resolveAssetUrl = function (url, containingFile) {
        var assetUrl = this.normalizeAssetUrl(url);
        if (assetUrl) {
            return this.resolve(assetUrl, containingFile);
        }
        return url;
    };
    /**
     * We want a moduleId that will appear in import statements in the generated code.
     * These need to be in a form that system.js can load, so absolute file paths don't work.
     * Relativize the paths by checking candidate prefixes of the absolute path, to see if
     * they are resolvable by the moduleResolution strategy from the CompilerHost.
     */
    ReflectorHost.prototype.getImportPath = function (containingFile, importedFile) {
        importedFile = this.resolveAssetUrl(importedFile, containingFile);
        containingFile = this.resolveAssetUrl(containingFile, '');
        // TODO(tbosch): if a file does not yet exist (because we compile it later),
        // we still need to create it so that the `resolve` method works!
        if (!this.compilerHost.fileExists(importedFile)) {
            if (this.options.trace) {
                console.log("Generating empty file " + importedFile + " to allow resolution of import");
            }
            this.context.assumeFileExists(importedFile);
        }
        var importModuleName = importedFile.replace(EXT, '');
        var parts = importModuleName.split(path.sep).filter(function (p) { return !!p; });
        for (var index = parts.length - 1; index >= 0; index--) {
            var candidate_1 = parts.slice(index, parts.length).join(path.sep);
            if (this.resolve('.' + path.sep + candidate_1, containingFile) === importedFile) {
                return "./" + candidate_1;
            }
            if (this.resolve(candidate_1, containingFile) === importedFile) {
                return candidate_1;
            }
        }
        // Try a relative import
        var candidate = path.relative(path.dirname(containingFile), importModuleName);
        if (this.resolve(candidate, containingFile) === importedFile) {
            return candidate;
        }
        throw new Error("Unable to find any resolvable import for " + importedFile + " relative to " + containingFile);
    };
    ReflectorHost.prototype.findDeclaration = function (module, symbolName, containingFile, containingModule) {
        if (!containingFile || !containingFile.length) {
            if (module.indexOf('.') === 0) {
                throw new Error('Resolution of relative paths requires a containing file.');
            }
            // Any containing file gives the same result for absolute imports
            containingFile = path.join(this.options.basePath, 'index.ts');
        }
        try {
            var assetUrl = this.normalizeAssetUrl(module);
            if (assetUrl) {
                module = assetUrl;
            }
            var filePath = this.resolve(module, containingFile);
            if (!filePath) {
                // If the file cannot be found the module is probably referencing a declared module
                // for which there is no disambiguating file and we also don't need to track
                // re-exports. Just use the module name.
                return this.getStaticSymbol(module, symbolName);
            }
            var tc = this.program.getTypeChecker();
            var sf = this.program.getSourceFile(filePath);
            if (!sf || !sf.symbol) {
                // The source file was not needed in the compile but we do need the values from
                // the corresponding .ts files stored in the .metadata.json file.  Just assume the
                // symbol and file we resolved to be correct as we don't need this to be the
                // cannonical reference as this reference could have only been generated by a
                // .metadata.json file resolving values.
                return this.getStaticSymbol(filePath, symbolName);
            }
            var symbol = tc.getExportsOfModule(sf.symbol).find(function (m) { return m.name === symbolName; });
            if (!symbol) {
                throw new Error("can't find symbol " + symbolName + " exported from module " + filePath);
            }
            if (symbol &&
                symbol.flags & ts.SymbolFlags.Alias) {
                symbol = tc.getAliasedSymbol(symbol);
            }
            var declaration = symbol.getDeclarations()[0];
            var declarationFile = declaration.getSourceFile().fileName;
            return this.getStaticSymbol(declarationFile, symbol.getName());
        }
        catch (e) {
            console.error("can't resolve module " + module + " from " + containingFile);
            throw e;
        }
    };
    /**
     * getStaticSymbol produces a Type whose metadata is known but whose implementation is not loaded.
     * All types passed to the StaticResolver should be pseudo-types returned by this method.
     *
     * @param declarationFile the absolute path of the file where the symbol is declared
     * @param name the name of the type.
     */
    ReflectorHost.prototype.getStaticSymbol = function (declarationFile, name) {
        var key = "\"" + declarationFile + "\"." + name;
        var result = this.typeCache.get(key);
        if (!result) {
            result = new static_reflector_1.StaticSymbol(declarationFile, name);
            this.typeCache.set(key, result);
        }
        return result;
    };
    ReflectorHost.prototype.getMetadataFor = function (filePath) {
        if (!this.context.fileExists(filePath)) {
            // If the file doesn't exists then we cannot return metadata for the file.
            // This will occur if the user refernced a declared module for which no file
            // exists for the module (i.e. jQuery or angularjs).
            return;
        }
        if (DTS.test(filePath)) {
            var metadataPath = filePath.replace(DTS, '.metadata.json');
            if (this.context.fileExists(metadataPath)) {
                return this.readMetadata(metadataPath);
            }
        }
        else {
            var sf = this.program.getSourceFile(filePath);
            if (!sf) {
                throw new Error("Source file " + filePath + " not present in program.");
            }
            return this.metadataCollector.getMetadata(sf);
        }
    };
    ReflectorHost.prototype.readMetadata = function (filePath) {
        try {
            var result = JSON.parse(this.context.readFile(filePath));
            return result;
        }
        catch (e) {
            console.error("Failed to read JSON file " + filePath);
            throw e;
        }
    };
    return ReflectorHost;
}());
exports.ReflectorHost = ReflectorHost;
var NodeReflectorHostContext = (function () {
    function NodeReflectorHostContext() {
        this.assumedExists = {};
    }
    NodeReflectorHostContext.prototype.fileExists = function (fileName) {
        return this.assumedExists[fileName] || fs.existsSync(fileName);
    };
    NodeReflectorHostContext.prototype.directoryExists = function (directoryName) {
        try {
            return fs.statSync(directoryName).isDirectory();
        }
        catch (e) {
            return false;
        }
    };
    NodeReflectorHostContext.prototype.readFile = function (fileName) { return fs.readFileSync(fileName, 'utf8'); };
    NodeReflectorHostContext.prototype.assumeFileExists = function (fileName) { this.assumedExists[fileName] = true; };
    return NodeReflectorHostContext;
}());
exports.NodeReflectorHostContext = NodeReflectorHostContext;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdG9yX2hvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyLWNsaS9zcmMvcmVmbGVjdG9yX2hvc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILDRCQUF3RSxzQkFBc0IsQ0FBQyxDQUFBO0FBQy9GLElBQVksRUFBRSxXQUFNLElBQUksQ0FBQyxDQUFBO0FBQ3pCLElBQVksSUFBSSxXQUFNLE1BQU0sQ0FBQyxDQUFBO0FBQzdCLElBQVksRUFBRSxXQUFNLFlBQVksQ0FBQyxDQUFBO0FBRWpDLGlDQUF3QyxvQkFBb0IsQ0FBQyxDQUFBO0FBQzdELGlDQUFnRCxvQkFBb0IsQ0FBQyxDQUFBO0FBRXJFLElBQU0sR0FBRyxHQUFHLGtDQUFrQyxDQUFDO0FBQy9DLElBQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQztBQVN2QjtJQUdFLHVCQUNZLE9BQW1CLEVBQVUsWUFBNkIsRUFDMUQsT0FBK0IsRUFBRSxPQUE4QjtRQUQvRCxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWlCO1FBQzFELFlBQU8sR0FBUCxPQUFPLENBQXdCO1FBSm5DLHNCQUFpQixHQUFHLElBQUksK0JBQWlCLEVBQUUsQ0FBQztRQXFJNUMsY0FBUyxHQUFHLElBQUksR0FBRyxFQUF3QixDQUFDO1FBaElsRCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxJQUFJLHdCQUF3QixFQUFFLENBQUM7SUFDM0QsQ0FBQztJQUVELDhDQUFzQixHQUF0QjtRQUNFLE1BQU0sQ0FBQztZQUNMLGNBQWMsRUFBRSw0QkFBNEI7WUFDNUMsWUFBWSxFQUFFLGlDQUFpQztZQUMvQyxVQUFVLEVBQUUsK0JBQStCO1lBQzNDLGFBQWEsRUFBRSxtQ0FBbUM7WUFDbEQsaUJBQWlCLEVBQUUsc0NBQXNDO1lBQ3pELFFBQVEsRUFBRSwrQkFBK0I7U0FDMUMs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