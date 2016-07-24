#!/usr/bin/env node
"use strict";
require('reflect-metadata');
var tsc = require('@angular/tsc-wrapped');
var path = require('path');
var compiler = require('@angular/compiler');
var core_1 = require('@angular/core');
var static_reflector_1 = require('./static_reflector');
var compiler_private_1 = require('./compiler_private');
var reflector_host_1 = require('./reflector_host');
var static_reflection_capabilities_1 = require('./static_reflection_capabilities');
function extract(ngOptions, program, host) {
    return Extractor.create(ngOptions, program, host).extract();
}
var _dirPaths = new Map();
var _GENERATED_FILES = /\.ngfactory\.ts$|\.css\.ts$|\.css\.shim\.ts$/;
var Extractor = (function () {
    function Extractor(_options, _program, host, staticReflector, _resolver, _normalizer, _reflectorHost, _extractor) {
        this._options = _options;
        this._program = _program;
        this.host = host;
        this.staticReflector = staticReflector;
        this._resolver = _resolver;
        this._normalizer = _normalizer;
        this._reflectorHost = _reflectorHost;
        this._extractor = _extractor;
    }
    Extractor.prototype._extractCmpMessages = function (components) {
        var _this = this;
        if (!components || !components.length) {
            return null;
        }
        var messages = [];
        var errors = [];
        components.forEach(function (metadata) {
            var url = _dirPaths.get(metadata);
            var result = _this._extractor.extract(metadata.template.template, url);
            errors = errors.concat(result.errors);
            messages = messages.concat(result.messages);
        });
        // Extraction Result might contain duplicate messages at this point
        return new compiler_private_1.ExtractionResult(messages, errors);
    };
    Extractor.prototype._readComponents = function (absSourcePath) {
        var result = [];
        var metadata = this.staticReflector.getModuleMetadata(absSourcePath);
        if (!metadata) {
            console.log("WARNING: no metadata found for " + absSourcePath);
            return result;
        }
        var symbols = Object.keys(metadata['metadata']);
        if (!symbols || !symbols.length) {
            return result;
        }
        for (var _i = 0, symbols_1 = symbols; _i < symbols_1.length; _i++) {
            var symbol = symbols_1[_i];
            var staticType = this._reflectorHost.findDeclaration(absSourcePath, symbol, absSourcePath);
            var directive = void 0;
            directive = this._resolver.getDirectiveMetadata(staticType, false);
            if (directive && directive.isComponent) {
                var promise = this._normalizer.normalizeDirective(directive).asyncResult;
                promise.then(function (md) { return _dirPaths.set(md, absSourcePath); });
                result.push(promise);
            }
        }
        return result;
    };
    Extractor.prototype.extract = function () {
        var _this = this;
        _dirPaths.clear();
        var promises = this._program.getSourceFiles()
            .map(function (sf) { return sf.fileName; })
            .filter(function (f) { return !_GENERATED_FILES.test(f); })
            .map(function (absSourcePath) {
            return Promise.all(_this._readComponents(absSourcePath))
                .then(function (metadatas) { return _this._extractCmpMessages(metadatas); })
                .catch(function (e) { return console.error(e.stack); });
        });
        var messages = [];
        var errors = [];
        return Promise.all(promises).then(function (extractionResults) {
            extractionResults.filter(function (result) { return !!result; }).forEach(function (result) {
                messages = messages.concat(result.messages);
                errors = errors.concat(result.errors);
            });
            if (errors.length) {
                throw new Error(errors.map(function (e) { return e.toString(); }).join('\n'));
            }
            messages = compiler_private_1.removeDuplicates(messages);
            var genPath = path.join(_this._options.genDir, 'messages.xmb');
            var msgBundle = compiler_private_1.serializeXmb(messages);
            _this.host.writeFile(genPath, msgBundle, false);
        });
    };
    Extractor.create = function (options, program, compilerHost) {
        var xhr = {
            get: function (s) {
                if (!compilerHost.fileExists(s)) {
                    // TODO: We should really have a test for error cases like this!
                    throw new Error("Compilation failed. Resource file not found: " + s);
                }
                return Promise.resolve(compilerHost.readFile(s));
            }
        };
        var urlResolver = compiler.createOfflineCompileUrlResolver();
        var reflectorHost = new reflector_host_1.ReflectorHost(program, compilerHost, options);
        var staticReflector = new static_reflector_1.StaticReflector(reflectorHost);
        static_reflection_capabilities_1.StaticAndDynamicReflectionCapabilities.install(staticReflector);
        var htmlParser = new compiler_private_1.HtmlParser();
        var config = new compiler.CompilerConfig({
            genDebugInfo: true,
            defaultEncapsulation: core_1.ViewEncapsulation.Emulated,
            logBindingUpdate: false,
            useJit: false
        });
        var normalizer = new compiler_private_1.DirectiveNormalizer(xhr, urlResolver, htmlParser, config);
        var expressionParser = new compiler_private_1.Parser(new compiler_private_1.Lexer());
        var resolver = new compiler_private_1.CompileMetadataResolver(new compiler.NgModuleResolver(staticReflector), new compiler.DirectiveResolver(staticReflector), new compiler.PipeResolver(staticReflector), new compiler.ViewResolver(staticReflector), config, /*console*/ null, staticReflector);
        // TODO(vicb): handle implicit
        var extractor = new compiler_private_1.MessageExtractor(htmlParser, expressionParser, [], {});
        return new Extractor(options, program, compilerHost, staticReflector, resolver, normalizer, reflectorHost, extractor);
    };
    return Extractor;
}());
// Entry point
if (require.main === module) {
    var args = require('minimist')(process.argv.slice(2));
    tsc.main(args.p || args.project || '.', args.basePath, extract)
        .then(function (exitCode) { return process.exit(exitCode); })
        .catch(function (e) {
        console.error(e.stack);
        console.error('Compilation failed');
        process.exit(1);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0cmFjdF9pMThuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci1jbGkvc3JjL2V4dHJhY3RfaTE4bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWVBLFFBQU8sa0JBQWtCLENBQUMsQ0FBQTtBQUcxQixJQUFZLEdBQUcsV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQzVDLElBQVksSUFBSSxXQUFNLE1BQU0sQ0FBQyxDQUFBO0FBQzdCLElBQVksUUFBUSxXQUFNLG1CQUFtQixDQUFDLENBQUE7QUFDOUMscUJBQWdDLGVBQWUsQ0FBQyxDQUFBO0FBRWhELGlDQUE4QixvQkFBb0IsQ0FBQyxDQUFBO0FBQ25ELGlDQUE2TixvQkFBb0IsQ0FBQyxDQUFBO0FBRWxQLCtCQUE0QixrQkFBa0IsQ0FBQyxDQUFBO0FBQy9DLCtDQUFxRCxrQ0FBa0MsQ0FBQyxDQUFBO0FBRXhGLGlCQUNJLFNBQXFDLEVBQUUsT0FBbUIsRUFBRSxJQUFxQjtJQUNuRixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzlELENBQUM7QUFFRCxJQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsRUFBNkMsQ0FBQztBQUV2RSxJQUFNLGdCQUFnQixHQUFHLDhDQUE4QyxDQUFDO0FBRXhFO0lBQ0UsbUJBQ1ksUUFBb0MsRUFBVSxRQUFvQixFQUNuRSxJQUFxQixFQUFVLGVBQWdDLEVBQzlELFNBQWtDLEVBQVUsV0FBZ0MsRUFDNUUsY0FBNkIsRUFBVSxVQUE0QjtRQUhuRSxhQUFRLEdBQVIsUUFBUSxDQUE0QjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDbkUsU0FBSSxHQUFKLElBQUksQ0FBaUI7UUFBVSxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDOUQsY0FBUyxHQUFULFNBQVMsQ0FBeUI7UUFBVSxn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