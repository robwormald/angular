/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injector, NgModuleFactory, NgModuleMetadata } from '@angular/core';
import { Console } from '../core_private';
import { ConcreteType, Type } from '../src/facade/lang';
import { StyleCompiler } from './style_compiler';
import { ViewCompiler } from './view_compiler/view_compiler';
import { NgModuleCompiler } from './ng_module_compiler';
import { TemplateParser } from './template_parser';
import { DirectiveNormalizer } from './directive_normalizer';
import { CompileMetadataResolver } from './metadata_resolver';
import { CompilerConfig } from './config';
/**
 * An internal module of the Angular compiler that begins with component types,
 * extracts templates, and eventually produces a compiled version of the component
 * ready for linking into an application.
 *
 * @security  When compiling templates at runtime, you must ensure that the entire template comes
 * from a trusted source. Attacker-controlled data introduced by a template could expose your
 * application to XSS risks.  For more detail, see the [Security Guide](http://g.co/ng/security).
 */
export declare class RuntimeCompiler {
    private _injector;
    private _metadataResolver;
    private _templateNormalizer;
    private _templateParser;
    private _styleCompiler;
    private _viewCompiler;
    private _ngModuleCompiler;
    private _compilerConfig;
    private _console;
    private _compiledTemplateCache;
    private _compiledHostTemplateCache;
    private _compiledNgModuleCache;
    constructor(_injector: Injector, _metadataResolver: CompileMetadataResolver, _templateNormalizer: DirectiveNormalizer, _templateParser: TemplateParser, _styleCompiler: StyleCompiler, _viewCompiler: ViewCompiler, _ngModuleCompiler: NgModuleCompiler, _compilerConfig: CompilerConfig, _console: Console);
    injector: Injector;
    compileNgModuleSync<T>(moduleType: ConcreteType<T>, metadata?: NgModuleMetadata): NgModuleFactory<T>;
    compileNgModuleAsync<T>(moduleType: ConcreteType<T>, metadata?: NgModuleMetadata): Promise<NgModuleFactory<T>>;
    private _compileNgModuleAndComponents<T>(moduleType, isSync);
    private _compileNgModule<T>(moduleType);
    clearCacheFor(type: Type): void;
    clearCache(): void;
    private _createCompiledHostTemplate(compType);
    private _createCompiledTemplate(compMeta, directives, pipes);
    private _assertComponentLoaded(compType, isHost);
    private _compileTemplate(template);
    private _resolveStylesCompileResult(result, externalStylesheetsByModuleUrl);
    private _resolveAndEvalStylesCompileResult(result, externalStylesheetsByModuleUrl);
}
