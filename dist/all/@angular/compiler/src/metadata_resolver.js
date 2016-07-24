/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var collection_1 = require('../src/facade/collection');
var exceptions_1 = require('../src/facade/exceptions');
var lang_1 = require('../src/facade/lang');
var assertions_1 = require('./assertions');
var cpl = require('./compile_metadata');
var config_1 = require('./config');
var directive_lifecycle_reflector_1 = require('./directive_lifecycle_reflector');
var directive_resolver_1 = require('./directive_resolver');
var identifiers_1 = require('./identifiers');
var ng_module_resolver_1 = require('./ng_module_resolver');
var pipe_resolver_1 = require('./pipe_resolver');
var url_resolver_1 = require('./url_resolver');
var util_1 = require('./util');
var view_resolver_1 = require('./view_resolver');
var CompileMetadataResolver = (function () {
    function CompileMetadataResolver(_ngModuleResolver, _directiveResolver, _pipeResolver, _viewResolver, _config, _console, _reflector) {
        if (_reflector === void 0) { _reflector = core_private_1.reflector; }
        this._ngModuleResolver = _ngModuleResolver;
        this._directiveResolver = _directiveResolver;
        this._pipeResolver = _pipeResolver;
        this._viewResolver = _viewResolver;
        this._config = _config;
        this._console = _console;
        this._reflector = _reflector;
        this._directiveCache = new Map();
        this._pipeCache = new Map();
        this._ngModuleCache = new Map();
        this._ngModuleOfTypes = new Map();
        this._anonymousTypes = new Map();
        this._anonymousTypeIndex = 0;
    }
    CompileMetadataResolver.prototype.sanitizeTokenName = function (token) {
        var identifier = lang_1.stringify(token);
        if (identifier.indexOf('(') >= 0) {
            // case: anonymous functions!
            var found = this._anonymousTypes.get(token);
            if (lang_1.isBlank(found)) {
                this._anonymousTypes.set(token, this._anonymousTypeIndex++);
                found = this._anonymousTypes.get(token);
            }
            identifier = "anonymous_token_" + found + "_";
        }
        return util_1.sanitizeIdentifier(identifier);
    };
    CompileMetadataResolver.prototype.clearCacheFor = function (type) {
        this._directiveCache.delete(type);
        this._pipeCache.delete(type);
        this._ngModuleOfTypes.delete(type);
        // Clear all of the NgModuleMetadata as they contain transitive information!
        this._ngModuleCache.clear();
    };
    CompileMetadataResolver.prototype.clearCache = function () {
        this._directiveCache.clear();
        this._pipeCache.clear();
        this._ngModuleCache.clear();
        this._ngModuleOfTypes.clear();
    };
    CompileMetadataResolver.prototype.getAnimationEntryMetadata = function (entry) {
        var _this = this;
        var defs = entry.definitions.map(function (def) { return _this.getAnimationStateMetadata(def); });
        return new cpl.CompileAnimationEntryMetadata(entry.name, defs);
    };
    CompileMetadataResolver.prototype.getAnimationStateMetadata = function (value) {
        if (value instanceof core_1.AnimationStateDeclarationMetadata) {
            var styles = this.getAnimationStyleMetadata(value.styles);
            return new cpl.CompileAnimationStateDeclarationMetadata(value.stateNameExpr, styles);
        }
        else if (value instanceof core_1.AnimationStateTransitionMetadata) {
            return new cpl.CompileAnimationStateTransitionMetadata(value.stateChangeExpr, this.getAnimationMetadata(value.steps));
        }
        return null;
    };
    CompileMetadataResolver.prototype.getAnimationStyleMetadata = function (value) {
        return new cpl.CompileAnimationStyleMetadata(value.offset, value.styles);
    };
    CompileMetadataResolver.prototype.getAnimationMetadata = function (value) {
        var _this = this;
        if (value instanceof core_1.AnimationStyleMetadata) {
            return this.getAnimationStyleMetadata(value);
        }
        else if (value instanceof core_1.AnimationKeyframesSequenceMetadata) {
            return new cpl.CompileAnimationKeyframesSequenceMetadata(value.steps.map(function (entry) { return _this.getAnimationStyleMetadata(entry); }));
        }
        else if (value instanceof core_1.AnimationAnimateMetadata) {
            var animateData = this
                .getAnimationMetadata(value.styles);
            return new cpl.CompileAnimationAnimateMetadata(value.timings, animateData);
        }
        else if (value instanceof core_1.AnimationWithStepsMetadata) {
            var steps = value.steps.map(function (step) { return _this.getAnimationMetadata(step); });
            if (value instanceof core_1.AnimationGroupMetadata) {
                return new cpl.CompileAnimationGroupMetadata(steps);
            }
            else {
                return new cpl.CompileAnimationSequenceMetadata(steps);
            }
        }
        return null;
    };
    CompileMetadataResolver.prototype.getDirectiveMetadata = function (directiveType, throwIfNotFound) {
        var _this = this;
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        directiveType = core_1.resolveForwardRef(directiveType);
        var meta = this._directiveCache.get(directiveType);
        if (lang_1.isBlank(meta)) {
            var dirMeta = this._directiveResolver.resolve(directiveType, throwIfNotFound);
            if (!dirMeta) {
                return null;
            }
            var templateMeta = null;
            var changeDetectionStrategy = null;
            var viewProviders = [];
            var moduleUrl = staticTypeModuleUrl(directiveType);
            var precompileTypes = [];
            if (dirMeta instanceof core_1.ComponentMetadata) {
                var cmpMeta = dirMeta;
                var viewMeta = this._viewResolver.resolve(directiveType);
                assertions_1.assertArrayOfStrings('styles', viewMeta.styles);
                assertions_1.assertInterpolationSymbols('interpolation', viewMeta.interpolation);
                var animations = lang_1.isPresent(viewMeta.animations) ?
                    viewMeta.animations.map(function (e) { return _this.getAnimationEntryMetadata(e); }) :
                    null;
                assertions_1.assertArrayOfStrings('styles', viewMeta.styles);
                assertions_1.assertArrayOfStrings('styleUrls', viewMeta.styleUrls);
                templateMeta = new cpl.CompileTemplateMetadata({
                    encapsulation: viewMeta.encapsulation,
                    template: viewMeta.template,
                    templateUrl: viewMeta.templateUrl,
                    styles: viewMeta.styles,
                    styleUrls: viewMeta.styleUrls,
                    animations: animations,
                    interpolation: viewMeta.interpolation
                });
                changeDetectionStrategy = cmpMeta.changeDetection;
                if (lang_1.isPresent(dirMeta.viewProviders)) {
                    viewProviders = this.getProvidersMetadata(verifyNonBlankProviders(directiveType, dirMeta.viewProviders, 'viewProviders'), []);
                }
                moduleUrl = componentModuleUrl(this._reflector, directiveType, cmpMeta);
                if (cmpMeta.precompile) {
                    precompileTypes = flattenArray(cmpMeta.precompile)
                        .map(function (cmp) { return _this.getTypeMetadata(cmp, staticTypeModuleUrl(cmp)); });
                }
            }
            var providers = [];
            if (lang_1.isPresent(dirMeta.providers)) {
                providers = this.getProvidersMetadata(verifyNonBlankProviders(directiveType, dirMeta.providers, 'providers'), precompileTypes);
            }
            var queries = [];
            var viewQueries = [];
            if (lang_1.isPresent(dirMeta.queries)) {
                queries = this.getQueriesMetadata(dirMeta.queries, false, directiveType);
                viewQueries = this.getQueriesMetadata(dirMeta.queries, true, directiveType);
            }
            meta = cpl.CompileDirectiveMetadata.create({
                selector: dirMeta.selector,
                exportAs: dirMeta.exportAs,
                isComponent: lang_1.isPresent(templateMeta),
                type: this.getTypeMetadata(directiveType, moduleUrl),
                template: templateMeta,
                changeDetection: changeDetectionStrategy,
                inputs: dirMeta.inputs,
                outputs: dirMeta.outputs,
                host: dirMeta.host,
                lifecycleHooks: core_private_1.LIFECYCLE_HOOKS_VALUES.filter(function (hook) { return directive_lifecycle_reflector_1.hasLifecycleHook(hook, directiveType); }),
                providers: providers,
                viewProviders: viewProviders,
                queries: queries,
                viewQueries: viewQueries,
                precompile: precompileTypes
            });
            this._directiveCache.set(directiveType, meta);
        }
        return meta;
    };
    CompileMetadataResolver.prototype.getNgModuleMetadata = function (moduleType, throwIfNotFound) {
        var _this = this;
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        moduleType = core_1.resolveForwardRef(moduleType);
        var compileMeta = this._ngModuleCache.get(moduleType);
        if (!compileMeta) {
            var meta = this._ngModuleResolver.resolve(moduleType, throwIfNotFound);
            if (!meta) {
                return null;
            }
            var declaredDirectives_1 = [];
            var exportedDirectives_1 = [];
            var declaredPipes_1 = [];
            var exportedPipes_1 = [];
            var importedModules_1 = [];
            var exportedModules_1 = [];
            if (meta.imports) {
                flattenArray(meta.imports).forEach(function (importedType) {
                    if (!isValidType(importedType)) {
                        throw new exceptions_1.BaseException("Unexpected value '" + lang_1.stringify(importedType) + "' imported by the module '" + lang_1.stringify(moduleType) + "'");
                    }
                    var importedModuleMeta;
                    if (importedModuleMeta = _this.getNgModuleMetadata(importedType, false)) {
                        importedModules_1.push(importedModuleMeta);
                    }
                    else {
                        throw new exceptions_1.BaseException("Unexpected value '" + lang_1.stringify(importedType) + "' imported by the module '" + lang_1.stringify(moduleType) + "'");
                    }
                });
            }
            if (meta.exports) {
                flattenArray(meta.exports).forEach(function (exportedType) {
                    if (!isValidType(exportedType)) {
                        throw new exceptions_1.BaseException("Unexpected value '" + lang_1.stringify(exportedType) + "' exported by the module '" + lang_1.stringify(moduleType) + "'");
                    }
                    var exportedDirMeta;
                    var exportedPipeMeta;
                    var exportedModuleMeta;
                    if (exportedDirMeta = _this.getDirectiveMetadata(exportedType, false)) {
                        exportedDirectives_1.push(exportedDirMeta);
                    }
                    else if (exportedPipeMeta = _this.getPipeMetadata(exportedType, false)) {
                        exportedPipes_1.push(exportedPipeMeta);
                    }
                    else if (exportedModuleMeta = _this.getNgModuleMetadata(exportedType, false)) {
                        exportedModules_1.push(exportedModuleMeta);
                    }
                    else {
                        throw new exceptions_1.BaseException("Unexpected value '" + lang_1.stringify(exportedType) + "' exported by the module '" + lang_1.stringify(moduleType) + "'");
                    }
                });
            }
            // Note: This will be modified later, so we rely on
            // getting a new instance every time!
            var transitiveModule_1 = this._getTransitiveNgModuleMetadata(importedModules_1, exportedModules_1);
            if (meta.declarations) {
                flattenArray(meta.declarations).forEach(function (declaredType) {
                    if (!isValidType(declaredType)) {
                        throw new exceptions_1.BaseException("Unexpected value '" + lang_1.stringify(declaredType) + "' declared by the module '" + lang_1.stringify(moduleType) + "'");
                    }
                    var declaredDirMeta;
                    var declaredPipeMeta;
                    if (declaredDirMeta = _this.getDirectiveMetadata(declaredType, false)) {
                        _this._addDirectiveToModule(declaredDirMeta, moduleType, transitiveModule_1, declaredDirectives_1, true);
                        // Collect @Component.directives/pipes/precompile into our declared directives/pipes.
                        _this._getTransitiveViewDirectivesAndPipes(declaredDirMeta, moduleType, transitiveModule_1, declaredDirectives_1, declaredPipes_1);
                    }
                    else if (declaredPipeMeta = _this.getPipeMetadata(declaredType, false)) {
                        _this._addPipeToModule(declaredPipeMeta, moduleType, transitiveModule_1, declaredPipes_1, true);
                    }
                    else {
                        throw new exceptions_1.BaseException("Unexpected value '" + lang_1.stringify(declaredType) + "' declared by the module '" + lang_1.stringify(moduleType) + "'");
                    }
                });
            }
            var providers = [];
            var precompile = [];
            if (meta.providers) {
                providers.push.apply(providers, this.getProvidersMetadata(meta.providers, precompile));
            }
            if (meta.precompile) {
                precompile.push.apply(precompile, flattenArray(meta.precompile)
                    .map(function (type) { return _this.getTypeMetadata(type, staticTypeModuleUrl(type)); }));
            }
            (_a = transitiveModule_1.precompile).push.apply(_a, precompile);
            (_b = transitiveModule_1.providers).push.apply(_b, providers);
            compileMeta = new cpl.CompileNgModuleMetadata({
                type: this.getTypeMetadata(moduleType, staticTypeModuleUrl(moduleType)),
                providers: providers,
                precompile: precompile,
                declaredDirectives: declaredDirectives_1,
                exportedDirectives: exportedDirectives_1,
                declaredPipes: declaredPipes_1,
                exportedPipes: exportedPipes_1,
                importedModules: importedModules_1,
                exportedModules: exportedModules_1,
                transitiveModule: transitiveModule_1
            });
            transitiveModule_1.modules.push(compileMeta);
            this._verifyModule(compileMeta);
            this._ngModuleCache.set(moduleType, compileMeta);
        }
        return compileMeta;
        var _a, _b;
    };
    CompileMetadataResolver.prototype.addComponentToModule = function (moduleType, compType) {
        var moduleMeta = this.getNgModuleMetadata(moduleType);
        // Collect @Component.directives/pipes/precompile into our declared directives/pipes.
        var compMeta = this.getDirectiveMetadata(compType, false);
        this._addDirectiveToModule(compMeta, moduleMeta.type.runtime, moduleMeta.transitiveModule, moduleMeta.declaredDirectives);
        this._getTransitiveViewDirectivesAndPipes(compMeta, moduleMeta.type.runtime, moduleMeta.transitiveModule, moduleMeta.declaredDirectives, moduleMeta.declaredPipes);
        moduleMeta.transitiveModule.precompile.push(compMeta.type);
        moduleMeta.precompile.push(compMeta.type);
        this._verifyModule(moduleMeta);
    };
    CompileMetadataResolver.prototype._verifyModule = function (moduleMeta) {
        moduleMeta.exportedDirectives.forEach(function (dirMeta) {
            if (!moduleMeta.transitiveModule.directivesSet.has(dirMeta.type.runtime)) {
                throw new exceptions_1.BaseException("Can't export directive " + lang_1.stringify(dirMeta.type.runtime) + " from " + lang_1.stringify(moduleMeta.type.runtime) + " as it was neither declared nor imported!");
            }
        });
        moduleMeta.exportedPipes.forEach(function (pipeMeta) {
            if (!moduleMeta.transitiveModule.pipesSet.has(pipeMeta.type.runtime)) {
                throw new exceptions_1.BaseException("Can't export pipe " + lang_1.stringify(pipeMeta.type.runtime) + " from " + lang_1.stringify(moduleMeta.type.runtime) + " as it was neither declared nor imported!");
            }
        });
        moduleMeta.declaredDirectives.forEach(function (dirMeta) {
            dirMeta.precompile.forEach(function (precompileComp) {
                if (!moduleMeta.transitiveModule.directivesSet.has(precompileComp.runtime)) {
                    throw new exceptions_1.BaseException("Component " + lang_1.stringify(dirMeta.type.runtime) + " in NgModule " + lang_1.stringify(moduleMeta.type.runtime) + " uses " + lang_1.stringify(precompileComp.runtime) + " via \"precompile\" but it was neither declared nor imported into the module!");
                }
            });
        });
        moduleMeta.precompile.forEach(function (precompileType) {
            if (!moduleMeta.transitiveModule.directivesSet.has(precompileType.runtime)) {
                throw new exceptions_1.BaseException("NgModule " + lang_1.stringify(moduleMeta.type.runtime) + " uses " + lang_1.stringify(precompileType.runtime) + " via \"precompile\" but it was neither declared nor imported!");
            }
        });
    };
    CompileMetadataResolver.prototype._addTypeToModule = function (type, moduleType) {
        var oldModule = this._ngModuleOfTypes.get(type);
        if (oldModule && oldModule !== moduleType) {
            throw new exceptions_1.BaseException("Type " + lang_1.stringify(type) + " is part of the declarations of 2 modules: " + lang_1.stringify(oldModule) + " and " + lang_1.stringify(moduleType) + "!");
        }
        this._ngModuleOfTypes.set(type, moduleType);
    };
    CompileMetadataResolver.prototype._getTransitiveViewDirectivesAndPipes = function (compMeta, moduleType, transitiveModule, declaredDirectives, declaredPipes) {
        var _this = this;
        if (!compMeta.isComponent) {
            return;
        }
        var addPipe = function (pipeType) {
            if (!pipeType) {
                throw new exceptions_1.BaseException("Unexpected pipe value '" + pipeType + "' on the View of component '" + lang_1.stringify(compMeta.type.runtime) + "'");
            }
            var pipeMeta = _this.getPipeMetadata(pipeType);
            _this._addPipeToModule(pipeMeta, moduleType, transitiveModule, declaredPipes);
        };
        var addDirective = function (dirType) {
            if (!dirType) {
                throw new exceptions_1.BaseException("Unexpected directive value '" + dirType + "' on the View of component '" + lang_1.stringify(compMeta.type.runtime) + "'");
            }
            var dirMeta = _this.getDirectiveMetadata(dirType);
            if (_this._addDirectiveToModule(dirMeta, moduleType, transitiveModule, declaredDirectives)) {
                _this._getTransitiveViewDirectivesAndPipes(dirMeta, moduleType, transitiveModule, declaredDirectives, declaredPipes);
            }
        };
        var view = this._viewResolver.resolve(compMeta.type.runtime);
        if (view.pipes) {
            flattenArray(view.pipes).forEach(addPipe);
        }
        if (view.directives) {
            flattenArray(view.directives).forEach(addDirective);
        }
    };
    CompileMetadataResolver.prototype._getTransitiveNgModuleMetadata = function (importedModules, exportedModules) {
        // collect `providers` / `precompile` from all imported and all exported modules
        var transitiveModules = getTransitiveModules(importedModules.concat(exportedModules), true);
        var providers = flattenArray(transitiveModules.map(function (ngModule) { return ngModule.providers; }));
        var precompile = flattenArray(transitiveModules.map(function (ngModule) { return ngModule.precompile; }));
        var transitiveExportedModules = getTransitiveModules(importedModules, false);
        var directives = flattenArray(transitiveExportedModules.map(function (ngModule) { return ngModule.exportedDirectives; }));
        var pipes = flattenArray(transitiveExportedModules.map(function (ngModule) { return ngModule.exportedPipes; }));
        return new cpl.TransitiveCompileNgModuleMetadata(transitiveModules, providers, precompile, directives, pipes);
    };
    CompileMetadataResolver.prototype._addDirectiveToModule = function (dirMeta, moduleType, transitiveModule, declaredDirectives, force) {
        if (force === void 0) { force = false; }
        if (force || !transitiveModule.directivesSet.has(dirMeta.type.runtime)) {
            transitiveModule.directivesSet.add(dirMeta.type.runtime);
            transitiveModule.directives.push(dirMeta);
            declaredDirectives.push(dirMeta);
            this._addTypeToModule(dirMeta.type.runtime, moduleType);
            return true;
        }
        return false;
    };
    CompileMetadataResolver.prototype._addPipeToModule = function (pipeMeta, moduleType, transitiveModule, declaredPipes, force) {
        if (force === void 0) { force = false; }
        if (force || !transitiveModule.pipesSet.has(pipeMeta.type.runtime)) {
            transitiveModule.pipesSet.add(pipeMeta.type.runtime);
            transitiveModule.pipes.push(pipeMeta);
            declaredPipes.push(pipeMeta);
            this._addTypeToModule(pipeMeta.type.runtime, moduleType);
            return true;
        }
        return false;
    };
    CompileMetadataResolver.prototype.getTypeMetadata = function (type, moduleUrl, dependencies) {
        if (dependencies === void 0) { dependencies = null; }
        type = core_1.resolveForwardRef(type);
        return new cpl.CompileTypeMetadata({
            name: this.sanitizeTokenName(type),
            moduleUrl: moduleUrl,
            runtime: type,
            diDeps: this.getDependenciesMetadata(type, dependencies)
        });
    };
    CompileMetadataResolver.prototype.getFactoryMetadata = function (factory, moduleUrl, dependencies) {
        if (dependencies === void 0) { dependencies = null; }
        factory = core_1.resolveForwardRef(factory);
        return new cpl.CompileFactoryMetadata({
            name: this.sanitizeTokenName(factory),
            moduleUrl: moduleUrl,
            runtime: factory,
            diDeps: this.getDependenciesMetadata(factory, dependencies)
        });
    };
    CompileMetadataResolver.prototype.getPipeMetadata = function (pipeType, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        pipeType = core_1.resolveForwardRef(pipeType);
        var meta = this._pipeCache.get(pipeType);
        if (lang_1.isBlank(meta)) {
            var pipeMeta = this._pipeResolver.resolve(pipeType, throwIfNotFound);
            if (!pipeMeta) {
                return null;
            }
            meta = new cpl.CompilePipeMetadata({
                type: this.getTypeMetadata(pipeType, staticTypeModuleUrl(pipeType)),
                name: pipeMeta.name,
                pure: pipeMeta.pure,
                lifecycleHooks: core_private_1.LIFECYCLE_HOOKS_VALUES.filter(function (hook) { return directive_lifecycle_reflector_1.hasLifecycleHook(hook, pipeType); }),
            });
            this._pipeCache.set(pipeType, meta);
        }
        return meta;
    };
    CompileMetadataResolver.prototype.getDependenciesMetadata = function (typeOrFunc, dependencies) {
        var _this = this;
        var hasUnknownDeps = false;
        var params = lang_1.isPresent(dependencies) ? dependencies : this._reflector.parameters(typeOrFunc);
        if (lang_1.isBlank(params)) {
            params = [];
        }
        var dependenciesMetadata = params.map(function (param) {
            var isAttribute = false;
            var isHost = false;
            var isSelf = false;
            var isSkipSelf = false;
            var isOptional = false;
            var query = null;
            var viewQuery = null;
            var token = null;
            if (lang_1.isArray(param)) {
                param.forEach(function (paramEntry) {
                    if (paramEntry instanceof core_1.HostMetadata) {
                        isHost = true;
                    }
                    else if (paramEntry instanceof core_1.SelfMetadata) {
                        isSelf = true;
                    }
                    else if (paramEntry instanceof core_1.SkipSelfMetadata) {
                        isSkipSelf = true;
                    }
                    else if (paramEntry instanceof core_1.OptionalMetadata) {
                        isOptional = true;
                    }
                    else if (paramEntry instanceof core_1.AttributeMetadata) {
                        isAttribute = true;
                        token = paramEntry.attributeName;
                    }
                    else if (paramEntry instanceof core_1.QueryMetadata) {
                        if (paramEntry.isViewQuery) {
                            viewQuery = paramEntry;
                        }
                        else {
                            query = paramEntry;
                        }
                    }
                    else if (paramEntry instanceof core_1.InjectMetadata) {
                        token = paramEntry.token;
                    }
                    else if (isValidType(paramEntry) && lang_1.isBlank(token)) {
                        token = paramEntry;
                    }
                });
            }
            else {
                token = param;
            }
            if (lang_1.isBlank(token)) {
                hasUnknownDeps = true;
                return null;
            }
            return new cpl.CompileDiDependencyMetadata({
                isAttribute: isAttribute,
                isHost: isHost,
                isSelf: isSelf,
                isSkipSelf: isSkipSelf,
                isOptional: isOptional,
                query: lang_1.isPresent(query) ? _this.getQueryMetadata(query, null, typeOrFunc) : null,
                viewQuery: lang_1.isPresent(viewQuery) ? _this.getQueryMetadata(viewQuery, null, typeOrFunc) : null,
                token: _this.getTokenMetadata(token)
            });
        });
        if (hasUnknownDeps) {
            var depsTokens = dependenciesMetadata.map(function (dep) { return dep ? lang_1.stringify(dep.token) : '?'; })
                .join(', ');
            throw new exceptions_1.BaseException("Can't resolve all parameters for " + lang_1.stringify(typeOrFunc) + ": (" + depsTokens + ").");
        }
        return dependenciesMetadata;
    };
    CompileMetadataResolver.prototype.getTokenMetadata = function (token) {
        token = core_1.resolveForwardRef(token);
        var compileToken;
        if (lang_1.isString(token)) {
            compileToken = new cpl.CompileTokenMetadata({ value: token });
        }
        else {
            compileToken = new cpl.CompileTokenMetadata({
                identifier: new cpl.CompileIdentifierMetadata({
                    runtime: token,
                    name: this.sanitizeTokenName(token),
                    moduleUrl: staticTypeModuleUrl(token)
                })
            });
        }
        return compileToken;
    };
    CompileMetadataResolver.prototype.getProvidersMetadata = function (providers, targetPrecompileComponents) {
        var _this = this;
        var compileProviders = [];
        providers.forEach(function (provider) {
            provider = core_1.resolveForwardRef(provider);
            if (core_private_1.isProviderLiteral(provider)) {
                provider = core_private_1.createProvider(provider);
            }
            var compileProvider;
            if (lang_1.isArray(provider)) {
                compileProvider = _this.getProvidersMetadata(provider, targetPrecompileComponents);
            }
            else if (provider instanceof core_1.Provider) {
                var tokenMeta = _this.getTokenMetadata(provider.token);
                if (tokenMeta.equalsTo(identifiers_1.identifierToken(identifiers_1.Identifiers.ANALYZE_FOR_PRECOMPILE))) {
                    targetPrecompileComponents.push.apply(targetPrecompileComponents, _this.getPrecompileComponentsFromProvider(provider));
                }
                else {
                    compileProvider = _this.getProviderMetadata(provider);
                }
            }
            else if (isValidType(provider)) {
                compileProvider = _this.getTypeMetadata(provider, staticTypeModuleUrl(provider));
            }
            else {
                throw new exceptions_1.BaseException("Invalid provider - only instances of Provider and Type are allowed, got: " + lang_1.stringify(provider));
            }
            if (compileProvider) {
                compileProviders.push(compileProvider);
            }
        });
        return compileProviders;
    };
    CompileMetadataResolver.prototype.getPrecompileComponentsFromProvider = function (provider) {
        var _this = this;
        var components = [];
        var collectedIdentifiers = [];
        if (provider.useFactory || provider.useExisting || provider.useClass) {
            throw new exceptions_1.BaseException("The ANALYZE_FOR_PRECOMPILE token only supports useValue!");
        }
        if (!provider.multi) {
            throw new exceptions_1.BaseException("The ANALYZE_FOR_PRECOMPILE token only supports 'multi = true'!");
        }
        convertToCompileValue(provider.useValue, collectedIdentifiers);
        collectedIdentifiers.forEach(function (identifier) {
            var dirMeta = _this.getDirectiveMetadata(identifier.runtime, false);
            if (dirMeta) {
                components.push(dirMeta.type);
            }
        });
        return components;
    };
    CompileMetadataResolver.prototype.getProviderMetadata = function (provider) {
        var compileDeps;
        var compileTypeMetadata = null;
        var compileFactoryMetadata = null;
        if (lang_1.isPresent(provider.useClass)) {
            compileTypeMetadata = this.getTypeMetadata(provider.useClass, staticTypeModuleUrl(provider.useClass), provider.dependencies);
            compileDeps = compileTypeMetadata.diDeps;
        }
        else if (lang_1.isPresent(provider.useFactory)) {
            compileFactoryMetadata = this.getFactoryMetadata(provider.useFactory, staticTypeModuleUrl(provider.useFactory), provider.dependencies);
            compileDeps = compileFactoryMetadata.diDeps;
        }
        return new cpl.CompileProviderMetadata({
            token: this.getTokenMetadata(provider.token),
            useClass: compileTypeMetadata,
            useValue: convertToCompileValue(provider.useValue, []),
            useFactory: compileFactoryMetadata,
            useExisting: lang_1.isPresent(provider.useExisting) ? this.getTokenMetadata(provider.useExisting) :
                null,
            deps: compileDeps,
            multi: provider.multi
        });
    };
    CompileMetadataResolver.prototype.getQueriesMetadata = function (queries, isViewQuery, directiveType) {
        var _this = this;
        var res = [];
        collection_1.StringMapWrapper.forEach(queries, function (query, propertyName) {
            if (query.isViewQuery === isViewQuery) {
                res.push(_this.getQueryMetadata(query, propertyName, directiveType));
            }
        });
        return res;
    };
    CompileMetadataResolver.prototype.getQueryMetadata = function (q, propertyName, typeOrFunc) {
        var _this = this;
        var selectors;
        if (q.isVarBindingQuery) {
            selectors = q.varBindings.map(function (varName) { return _this.getTokenMetadata(varName); });
        }
        else {
            if (!lang_1.isPresent(q.selector)) {
                throw new exceptions_1.BaseException("Can't construct a query for the property \"" + propertyName + "\" of \"" + lang_1.stringify(typeOrFunc) + "\" since the query selector wasn't defined.");
            }
            selectors = [this.getTokenMetadata(q.selector)];
        }
        return new cpl.CompileQueryMetadata({
            selectors: selectors,
            first: q.first,
            descendants: q.descendants,
            propertyName: propertyName,
            read: lang_1.isPresent(q.read) ? this.getTokenMetadata(q.read) : null
        });
    };
    /** @nocollapse */
    CompileMetadataResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    CompileMetadataResolver.ctorParameters = [
        { type: ng_module_resolver_1.NgModuleResolver, },
        { type: directive_resolver_1.DirectiveResolver, },
        { type: pipe_resolver_1.PipeResolver, },
        { type: view_resolver_1.ViewResolver, },
        { type: config_1.CompilerConfig, },
        { type: core_private_1.Console, },
        { type: core_private_1.ReflectorReader, },
    ];
    return CompileMetadataResolver;
}());
exports.CompileMetadataResolver = CompileMetadataResolver;
function getTransitiveModules(modules, includeImports, targetModules, visitedModules) {
    if (targetModules === void 0) { targetModules = []; }
    if (visitedModules === void 0) { visitedModules = new Set(); }
    modules.forEach(function (ngModule) {
        if (!visitedModules.has(ngModule.type.runtime)) {
            visitedModules.add(ngModule.type.runtime);
            var nestedModules = includeImports ?
                ngModule.importedModules.concat(ngModule.exportedModules) :
                ngModule.exportedModules;
            getTransitiveModules(nestedModules, includeImports, targetModules, visitedModules);
            // Add after recursing so imported/exported modules are before the module itself.
            // This is important for overwriting providers of imported modules!
            targetModules.push(ngModule);
        }
    });
    return targetModules;
}
function flattenArray(tree, out) {
    if (out === void 0) { out = []; }
    if (tree) {
        for (var i = 0; i < tree.length; i++) {
            var item = core_1.resolveForwardRef(tree[i]);
            if (lang_1.isArray(item)) {
                flattenArray(item, out);
            }
            else {
                out.push(item);
            }
        }
    }
    return out;
}
function verifyNonBlankProviders(directiveType, providersTree, providersType) {
    var flat = [];
    var errMsg;
    flattenArray(providersTree, flat);
    for (var i = 0; i < flat.length; i++) {
        if (lang_1.isBlank(flat[i])) {
            errMsg = flat.map(function (provider) { return lang_1.isBlank(provider) ? '?' : lang_1.stringify(provider); }).join(', ');
            throw new exceptions_1.BaseException("One or more of " + providersType + " for \"" + lang_1.stringify(directiveType) + "\" were not defined: [" + errMsg + "].");
        }
    }
    return providersTree;
}
function isValidType(value) {
    return cpl.isStaticSymbol(value) || (value instanceof lang_1.Type);
}
function staticTypeModuleUrl(value) {
    return cpl.isStaticSymbol(value) ? value.filePath : null;
}
function componentModuleUrl(reflector, type, cmpMetadata) {
    if (cpl.isStaticSymbol(type)) {
        return staticTypeModuleUrl(type);
    }
    if (lang_1.isPresent(cmpMetadata.moduleId)) {
        var moduleId = cmpMetadata.moduleId;
        var scheme = url_resolver_1.getUrlScheme(moduleId);
        return lang_1.isPresent(scheme) && scheme.length > 0 ? moduleId :
            "package:" + moduleId + util_1.MODULE_SUFFIX;
    }
    return reflector.importUri(type);
}
function convertToCompileValue(value, targetIdentifiers) {
    return util_1.visitValue(value, new _CompileValueConverter(), targetIdentifiers);
}
var _CompileValueConverter = (function (_super) {
    __extends(_CompileValueConverter, _super);
    function _CompileValueConverter() {
        _super.apply(this, arguments);
    }
    _CompileValueConverter.prototype.visitOther = function (value, targetIdentifiers) {
        var identifier;
        if (cpl.isStaticSymbol(value)) {
            identifier = new cpl.CompileIdentifierMetadata({ name: value.name, moduleUrl: value.filePath, runtime: value });
        }
        else {
            identifier = new cpl.CompileIdentifierMetadata({ runtime: value });
        }
        targetIdentifiers.push(identifier);
        return identifier;
    };
    return _CompileValueConverter;
}(util_1.ValueTransformer));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGFfcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9tZXRhZGF0YV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCxxQkFBcWpCLGVBQWUsQ0FBQyxDQUFBO0FBRXJrQiw2QkFBNkcsaUJBQWlCLENBQUMsQ0FBQTtBQUMvSCwyQkFBMkMsMEJBQTBCLENBQUMsQ0FBQTtBQUN0RSwyQkFBNEIsMEJBQTBCLENBQUMsQ0FBQTtBQUN2RCxxQkFBa0Ysb0JBQW9CLENBQUMsQ0FBQTtBQUV2RywyQkFBK0QsY0FBYyxDQUFDLENBQUE7QUFDOUUsSUFBWSxHQUFHLFdBQU0sb0JBQW9CLENBQUMsQ0FBQTtBQUMxQyx1QkFBNkIsVUFBVSxDQUFDLENBQUE7QUFDeEMsOENBQStCLGlDQUFpQyxDQUFDLENBQUE7QUFDakUsbUNBQWdDLHNCQUFzQixDQUFDLENBQUE7QUFDdkQsNEJBQTJDLGVBQWUsQ0FBQyxDQUFBO0FBQzNELG1DQUErQixzQkFBc0IsQ0FBQyxDQUFBO0FBQ3RELDhCQUEyQixpQkFBaUIsQ0FBQyxDQUFBO0FBQzdDLDZCQUEyQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQzVDLHFCQUE4RSxRQUFRLENBQUMsQ0FBQTtBQUN2Riw4QkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQUM3QztJQVFFLGlDQUNZLGlCQUFtQyxFQUFVLGtCQUFxQyxFQUNsRixhQUEyQixFQUFVLGFBQTJCLEVBQ2hFLE9BQXVCLEVBQVUsUUFBaUIsRUFDbEQsVUFBdUM7UUFBL0MsMEJBQStDLEdBQS9DLHFDQUErQztRQUh2QyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQVUsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUNsRixrQkFBYSxHQUFiLGFBQWEsQ0FBYztRQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUFjO1FBQ2hFLFlBQU8sR0FBUCxPQUFPLENBQWdCO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNsRCxlQUFVLEdBQVYsVUFBVSxDQUE2QjtRQVgzQyxvQkFBZSxHQUFHLElBQUksR0FBRyxFQUFzQyxDQUFDO1FBQ2hFLGVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBaUMsQ0FBQztRQUN0RCxtQkFBYyxHQUFHLElBQUksR0FBRyxFQUFxQyxDQUFDO1FBQzlELHFCQUFnQixHQUFHLElBQUksR0FBRyxFQUFjLENBQUM7UUFDekMsb0JBQWUsR0FBRyxJQUFJLEdBQUcsRUFBa0IsQ0FBQztRQUM1Qyx3QkFBbUIsR0FBRyxDQUFDLENBQUM7SUFNc0IsQ0FBQztJQUUvQyxtREFBaUIsR0FBekIsVUFBMEIsS0FBVTtRQUNsQyxJQUFJLFVBQVUsR0FBRyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyw2QkFBNkI7WUFDN0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDNUMsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLENBQUM7Z0JBQzVELEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQ0QsVUFBVSxHQUFHLHFCQUFtQixLQUFLLE1BQUcsQ0FBQztRQUMzQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLHlCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFFRCwrQ0FBYSxHQUFiLFVBQWMsSUFBVTtRQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLDRFQUE0RTtRQUM1RSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCw0Q0FBVSxHQUFWO1FBQ0UsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCwyREFBeUIsR0FBekIsVUFBMEIsS0FBNkI7UUFBdkQsaUJBR0M7UUFGQyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO1FBQzdFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCwyREFBeUIsR0FBekIsVUFBMEIsS0FBNkI7UUFDckQsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLHdDQUFpQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzFELE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxLQUFLLENBQUMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZGLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLHVDQUFnQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsdUNBQXVDLENBQ2xELEtBQUssQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELDJEQUF5QixHQUF6QixVQUEwQixLQUE2QjtRQUNyRCxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsNkJBQTZCLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0UsQ0FBQztJQUVELHNEQUFvQixHQUFwQixVQUFxQixLQUF3QjtRQUE3QyxpQkFvQkM7UUFuQkMsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLDZCQUFzQixDQUFDLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxZQUFZLHlDQUFrQyxDQUFDLENBQUMsQ0FBQztZQUMvRCxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMseUNBQXlDLENBQ3BELEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSSxDQUFDLHlCQUF5QixDQUFDLEtBQUssQ0FBQyxFQUFyQyxDQUFxQyxDQUFDLENBQUMsQ0FBQztRQUN2RSxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSwrQkFBd0IsQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxXQUFXLEdBQ3NFLElBQUk7aUJBQ2hGLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsK0JBQStCLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUM3RSxDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSxpQ0FBMEIsQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztZQUNyRSxFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksNkJBQXNCLENBQUMsQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsNkJBQTZCLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEQsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6RCxDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsc0RBQW9CLEdBQXBCLFVBQXFCLGFBQW1CLEVBQUUsZUFBc0I7UUFBaEUsaUJBOEVDO1FBOUV5QywrQkFBc0IsR0FBdEIsc0JBQXNCO1FBQzlELGFBQWEsR0FBRyx3QkFBaUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNuRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQzlFLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDYixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELElBQUksWUFBWSxHQUFnQyxJQUFJLENBQUM7WUFDckQsSUFBSSx1QkFBdUIsR0FBNEIsSUFBSSxDQUFDO1lBQzVELElBQUksYUFBYSxHQUFxRSxFQUFFLENBQUM7WUFDekYsSUFBSSxTQUFTLEdBQUcsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbkQsSUFBSSxlQUFlLEdBQThCLEVBQUUsQ0FBQztZQUNwRCxFQUFFLENBQUMsQ0FBQyxPQUFPLFlBQVksd0JBQWlCLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLE9BQU8sR0FBc0IsT0FBTyxDQUFDO2dCQUN6QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDekQsaUNBQW9CLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDaEQsdUNBQTBCLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxVQUFVLEdBQUcsZ0JBQVMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDO29CQUMzQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsRUFBakMsQ0FBaUMsQ0FBQztvQkFDL0QsSUFBSSxDQUFDO2dCQUNULGlDQUFvQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2hELGlDQUFvQixDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBRXRELFlBQVksR0FBRyxJQUFJLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztvQkFDN0MsYUFBYSxFQUFFLFFBQVEsQ0FBQyxhQUFhO29CQUNyQyxRQUFRLEVBQUUsUUFBUSxDQUFDLFFBQVE7b0JBQzNCLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVztvQkFDakMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxNQUFNO29CQUN2QixTQUFTLEVBQUUsUUFBUSxDQUFDLFNBQVM7b0JBQzdCLFVBQVUsRUFBRSxVQUFVO29CQUN0QixhQUFhLEVBQUUsUUFBUSxDQUFDLGFBQWE7aUJBQ3RDLENBQUMsQ0FBQztnQkFDSCx1QkFBdUIsR0FBRyxPQUFPLENBQUMsZUFBZSxDQUFDO2dCQUNsRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JDLGFBQWEsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQ3JDLHVCQUF1QixDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsYUFBYSxFQUFFLGVBQWUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUMxRixDQUFDO2dCQUNELFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDeEUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7b0JBQ3ZCLGVBQWUsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQzt5QkFDM0IsR0FBRyxDQUFDLFVBQUMsR0FBRyxJQUFLLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLEVBQUUsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBbkQsQ0FBbUQsQ0FBQyxDQUFDO2dCQUMzRixDQUFDO1lBQ0gsQ0FBQztZQUVELElBQUksU0FBUyxHQUFxRSxFQUFFLENBQUM7WUFDckYsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqQyxTQUFTLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUNqQyx1QkFBdUIsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsRUFDdEUsZUFBZSxDQUFDLENBQUM7WUFDdkIsQ0FBQztZQUNELElBQUksT0FBTyxHQUErQixFQUFFLENBQUM7WUFDN0MsSUFBSSxXQUFXLEdBQStCLEVBQUUsQ0FBQztZQUNqRCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLE9BQU8sR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ3pFLFdBQVcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDOUUsQ0FBQztZQUNELElBQUksR0FBRyxHQUFHLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDO2dCQUN6QyxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVE7Z0JBQzFCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtnQkFDMUIsV0FBVyxFQUFFLGdCQUFTLENBQUMsWUFBWSxDQUFDO2dCQUNwQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDO2dCQUNwRCxRQUFRLEVBQUUsWUFBWTtnQkFDdEIsZUFBZSxFQUFFLHVCQUF1QjtnQkFDeEMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO2dCQUN0QixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87Z0JBQ3hCLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtnQkFDbEIsY0FBYyxFQUNWLHFDQUFzQixDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLGdEQUFnQixDQUFDLElBQUksRUFBRSxhQUFhLENBQUMsRUFBckMsQ0FBcUMsQ0FBQztnQkFDaEYsU0FBUyxFQUFFLFNBQVM7Z0JBQ3BCLGFBQWEsRUFBRSxhQUFhO2dCQUM1QixPQUFPLEVBQUUsT0FBTztnQkFDaEIsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLFVBQVUsRUFBRSxlQUFlO2FBQzVCLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxxREFBbUIsR0FBbkIsVUFBb0IsVUFBZSxFQUFFLGVBQXNCO1FBQTNELGlCQStHQztRQS9Hb0MsK0JBQXNCLEdBQXRCLHNCQUFzQjtRQUN6RCxVQUFVLEdBQUcsd0JBQWlCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDM0MsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDdEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ3pFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDVixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELElBQU0sb0JBQWtCLEdBQW1DLEVBQUUsQ0FBQztZQUM5RCxJQUFNLG9CQUFrQixHQUFtQyxFQUFFLENBQUM7WUFDOUQsSUFBTSxlQUFhLEdBQThCLEVBQUUsQ0FBQztZQUNwRCxJQUFNLGVBQWEsR0FBOEIsRUFBRSxDQUFDO1lBQ3BELElBQU0saUJBQWUsR0FBa0MsRUFBRSxDQUFDO1lBQzFELElBQU0saUJBQWUsR0FBa0MsRUFBRSxDQUFDO1lBRTFELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFlBQVk7b0JBQzlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDL0IsTUFBTSxJQUFJLDBCQUFhLENBQ25CLHVCQUFxQixnQkFBUyxDQUFDLFlBQVksQ0FBQyxrQ0FBNkIsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsTUFBRyxDQUFDLENBQUM7b0JBQ3pHLENBQUM7b0JBQ0QsSUFBSSxrQkFBK0MsQ0FBQztvQkFDcEQsRUFBRSxDQUFDLENBQUMsa0JBQWtCLEdBQUcsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZFLGlCQUFlLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7b0JBQzNDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxJQUFJLDBCQUFhLENBQ25CLHVCQUFxQixnQkFBUyxDQUFDLFlBQVksQ0FBQyxrQ0FBNkIsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsTUFBRyxDQUFDLENBQUM7b0JBQ3pHLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtvQkFDOUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixNQUFNLElBQUksMEJBQWEsQ0FDbkIsdUJBQXFCLGdCQUFTLENBQUMsWUFBWSxDQUFDLGtDQUE2QixnQkFBUyxDQUFDLFVBQVUsQ0FBQyxNQUFHLENBQUMsQ0FBQztvQkFDekcsQ0FBQztvQkFDRCxJQUFJLGVBQTZDLENBQUM7b0JBQ2xELElBQUksZ0JBQXlDLENBQUM7b0JBQzlDLElBQUksa0JBQStDLENBQUM7b0JBQ3BELEVBQUUsQ0FBQyxDQUFDLGVBQWUsR0FBRyxLQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckUsb0JBQWtCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUMzQyxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3hFLGVBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDdkMsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsa0JBQWtCLEdBQUcsS0FBSSxDQUFDLG1CQUFtQixDQUFDLFlBQVksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzlFLGlCQUFlLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7b0JBQzNDLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxJQUFJLDBCQUFhLENBQ25CLHVCQUFxQixnQkFBUyxDQUFDLFlBQVksQ0FBQyxrQ0FBNkIsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsTUFBRyxDQUFDLENBQUM7b0JBQ3pHLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBRUQsbURBQW1EO1lBQ25ELHFDQUFxQztZQUNyQyxJQUFNLGtCQUFnQixHQUNsQixJQUFJLENBQUMsOEJBQThCLENBQUMsaUJBQWUsRUFBRSxpQkFBZSxDQUFDLENBQUM7WUFDMUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsWUFBWTtvQkFDbkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixNQUFNLElBQUksMEJBQWEsQ0FDbkIsdUJBQXFCLGdCQUFTLENBQUMsWUFBWSxDQUFDLGtDQUE2QixnQkFBUyxDQUFDLFVBQVUsQ0FBQyxNQUFHLENBQUMsQ0FBQztvQkFDekcsQ0FBQztvQkFDRCxJQUFJLGVBQTZDLENBQUM7b0JBQ2xELElBQUksZ0JBQXlDLENBQUM7b0JBQzlDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsR0FBRyxLQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckUsS0FBSSxDQUFDLHFCQUFxQixDQUN0QixlQUFlLEVBQUUsVUFBVSxFQUFFLGtCQUFnQixFQUFFLG9CQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO3dCQUM3RSxxRkFBcUY7d0JBQ3JGLEtBQUksQ0FBQyxvQ0FBb0MsQ0FDckMsZUFBZSxFQUFFLFVBQVUsRUFBRSxrQkFBZ0IsRUFBRSxvQkFBa0IsRUFBRSxlQUFhLENBQUMsQ0FBQztvQkFDeEYsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN4RSxLQUFJLENBQUMsZ0JBQWdCLENBQ2pCLGdCQUFnQixFQUFFLFVBQVUsRUFBRSxrQkFBZ0IsRUFBRSxlQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQzNFLENBQUM7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ04sTUFBTSxJQUFJLDBCQUFhLENBQ25CLHVCQUFxQixnQkFBUyxDQUFDLFlBQVksQ0FBQyxrQ0FBNkIsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsTUFBRyxDQUFDLENBQUM7b0JBQ3pHLENBQUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBRUQsSUFBTSxTQUFTLEdBQVUsRUFBRSxDQUFDO1lBQzVCLElBQU0sVUFBVSxHQUE4QixFQUFFLENBQUM7WUFDakQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25CLFNBQVMsQ0FBQyxJQUFJLE9BQWQsU0FBUyxFQUFTLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDM0UsQ0FBQztZQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixVQUFVLENBQUMsSUFBSSxPQUFmLFVBQVUsRUFBUyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztxQkFDM0IsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBckQsQ0FBcUQsQ0FBQyxDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUVELE1BQUEsa0JBQWdCLENBQUMsVUFBVSxFQUFDLElBQUksV0FBSSxVQUFVLENBQUMsQ0FBQztZQUNoRCxNQUFBLGtCQUFnQixDQUFDLFNBQVMsRUFBQyxJQUFJLFdBQUksU0FBUyxDQUFDLENBQUM7WUFFOUMsV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLHVCQUF1QixDQUFDO2dCQUM1QyxJQUFJLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3ZFLFNBQVMsRUFBRSxTQUFTO2dCQUNwQixVQUFVLEVBQUUsVUFBVTtnQkFDdEIsa0JBQWtCLEVBQUUsb0JBQWtCO2dCQUN0QyxrQkFBa0IsRUFBRSxvQkFBa0I7Z0JBQ3RDLGFBQWEsRUFBRSxlQUFhO2dCQUM1QixhQUFhLEVBQUUsZUFBYTtnQkFDNUIsZUFBZSxFQUFFLGlCQUFlO2dCQUNoQyxlQUFlLEVBQUUsaUJBQWU7Z0JBQ2hDLGdCQUFnQixFQUFFLGtCQUFnQjthQUNuQyxDQUFDLENBQUM7WUFDSCxrQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ25ELENBQUM7UUFDRCxNQUFNLENBQUMsV0FBVyxDQUFDOztJQUNyQixDQUFDO0lBRUQsc0RBQW9CLEdBQXBCLFVBQXFCLFVBQWdCLEVBQUUsUUFBYztRQUNuRCxJQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEQscUZBQXFGO1FBQ3JGLElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUQsSUFBSSxDQUFDLHFCQUFxQixDQUN0QixRQUFRLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLGdCQUFnQixFQUM5RCxVQUFVLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsb0NBQW9DLENBQ3JDLFFBQVEsRUFBRSxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsZ0JBQWdCLEVBQzlELFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFN0QsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNELFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUUxQyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTywrQ0FBYSxHQUFyQixVQUFzQixVQUF1QztRQUMzRCxVQUFVLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztZQUM1QyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6RSxNQUFNLElBQUksMEJBQWEsQ0FDbkIsNEJBQTBCLGdCQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBUyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLDhDQUEyQyxDQUFDLENBQUM7WUFDdkosQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO1lBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JFLE1BQU0sSUFBSSwwQkFBYSxDQUNuQix1QkFBcUIsZ0JBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFTLGdCQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsOENBQTJDLENBQUMsQ0FBQztZQUNuSixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLFVBQUMsT0FBTztZQUM1QyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLGNBQWM7Z0JBQ3hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0UsTUFBTSxJQUFJLDBCQUFhLENBQ25CLGVBQWEsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBZ0IsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFTLGdCQUFTLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxrRkFBNkUsQ0FBQyxDQUFDO2dCQUM3TixDQUFDO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUMsY0FBYztZQUMzQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNFLE1BQU0sSUFBSSwwQkFBYSxDQUNuQixjQUFZLGdCQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBUyxnQkFBUyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsa0VBQTZELENBQUMsQ0FBQztZQUM3SixDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU8sa0RBQWdCLEdBQXhCLFVBQXlCLElBQVUsRUFBRSxVQUFnQjtRQUNuRCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxTQUFTLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUMxQyxNQUFNLElBQUksMEJBQWEsQ0FDbkIsVUFBUSxnQkFBUyxDQUFDLElBQUksQ0FBQyxtREFBOEMsZ0JBQVMsQ0FBQyxTQUFTLENBQUMsYUFBUSxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxNQUFHLENBQUMsQ0FBQztRQUNqSSxDQUFDO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUdPLHNFQUFvQyxHQUE1QyxVQUNJLFFBQXNDLEVBQUUsVUFBZSxFQUN2RCxnQkFBdUQsRUFDdkQsa0JBQWtELEVBQ2xELGFBQXdDO1FBSjVDLGlCQW1DQztRQTlCQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzFCLE1BQU0sQ0FBQztRQUNULENBQUM7UUFDRCxJQUFNLE9BQU8sR0FBRyxVQUFDLFFBQWM7WUFDN0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNkLE1BQU0sSUFBSSwwQkFBYSxDQUNuQiw0QkFBMEIsUUFBUSxvQ0FBK0IsZ0JBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFHLENBQUMsQ0FBQztZQUM1RyxDQUFDO1lBQ0QsSUFBTSxRQUFRLEdBQUcsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRCxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsQ0FBQztRQUMvRSxDQUFDLENBQUM7UUFFRixJQUFNLFlBQVksR0FBRyxVQUFDLE9BQWE7WUFDakMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNiLE1BQU0sSUFBSSwwQkFBYSxDQUNuQixpQ0FBK0IsT0FBTyxvQ0FBK0IsZ0JBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFHLENBQUMsQ0FBQztZQUNoSCxDQUFDO1lBQ0QsSUFBTSxPQUFPLEdBQUcsS0FBSSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ25ELEVBQUUsQ0FBQyxDQUFDLEtBQUksQ0FBQyxxQkFBcUIsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLGdCQUFnQixFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMxRixLQUFJLENBQUMsb0NBQW9DLENBQ3JDLE9BQU8sRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsa0JBQWtCLEVBQUUsYUFBYSxDQUFDLENBQUM7WUFDaEYsQ0FBQztRQUNILENBQUMsQ0FBQztRQUNGLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZixZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsWUFBWSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDdEQsQ0FBQztJQUNILENBQUM7SUFFTyxnRUFBOEIsR0FBdEMsVUFDSSxlQUE4QyxFQUM5QyxlQUE4QztRQUNoRCxnRkFBZ0Y7UUFDaEYsSUFBTSxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlGLElBQU0sU0FBUyxHQUFHLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsVUFBQyxRQUFRLElBQUssT0FBQSxRQUFRLENBQUMsU0FBUyxFQUFsQixDQUFrQixDQUFDLENBQUMsQ0FBQztRQUN4RixJQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLFVBQUMsUUFBUSxJQUFLLE9BQUEsUUFBUSxDQUFDLFVBQVUsRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDLENBQUM7UUFFMUYsSUFBTSx5QkFBeUIsR0FBRyxvQkFBb0IsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0UsSUFBTSxVQUFVLEdBQ1osWUFBWSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLFFBQVEsQ0FBQyxrQkFBa0IsRUFBM0IsQ0FBMkIsQ0FBQyxDQUFDLENBQUM7UUFDM0YsSUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLHlCQUF5QixDQUFDLEdBQUcsQ0FBQyxVQUFDLFFBQVEsSUFBSyxPQUFBLFFBQVEsQ0FBQyxhQUFhLEVBQXRCLENBQXNCLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxpQ0FBaUMsQ0FDNUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVPLHVEQUFxQixHQUE3QixVQUNJLE9BQXFDLEVBQUUsVUFBZSxFQUN0RCxnQkFBdUQsRUFDdkQsa0JBQWtELEVBQUUsS0FBc0I7UUFBdEIscUJBQXNCLEdBQXRCLGFBQXNCO1FBQzVFLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkUsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3pELGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDMUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRU8sa0RBQWdCLEdBQXhCLFVBQ0ksUUFBaUMsRUFBRSxVQUFlLEVBQ2xELGdCQUF1RCxFQUN2RCxhQUF3QyxFQUFFLEtBQXNCO1FBQXRCLHFCQUFzQixHQUF0QixhQUFzQjtRQUNsRSxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25FLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyRCxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQ3pELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxpREFBZSxHQUFmLFVBQWdCLElBQVUsRUFBRSxTQUFpQixFQUFFLFlBQTBCO1FBQTFCLDRCQUEwQixHQUExQixtQkFBMEI7UUFFdkUsSUFBSSxHQUFHLHdCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztZQUNqQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQztZQUNsQyxTQUFTLEVBQUUsU0FBUztZQUNwQixPQUFPLEVBQUUsSUFBSTtZQUNiLE1BQU0sRUFBRSxJQUFJLENBQUMsdUJBQXVCLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQztTQUN6RCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsb0RBQWtCLEdBQWxCLFVBQW1CLE9BQWlCLEVBQUUsU0FBaUIsRUFBRSxZQUEwQjtRQUExQiw0QkFBMEIsR0FBMUIsbUJBQTBCO1FBRWpGLE9BQU8sR0FBRyx3QkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNyQyxNQUFNLENBQUMsSUFBSSxHQUFHLENBQUMsc0JBQXNCLENBQUM7WUFDcEMsSUFBSSxFQUFFLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFDckMsU0FBUyxFQUFFLFNBQVM7WUFDcEIsT0FBTyxFQUFFLE9BQU87WUFDaEIsTUFBTSxFQUFFLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDO1NBQzVELENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxpREFBZSxHQUFmLFVBQWdCLFFBQWMsRUFBRSxlQUFzQjtRQUF0QiwrQkFBc0IsR0FBdEIsc0JBQXNCO1FBQ3BELFFBQVEsR0FBRyx3QkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN6QyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxlQUFlLENBQUMsQ0FBQztZQUNyRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUM7WUFDRCxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsbUJBQW1CLENBQUM7Z0JBQ2pDLElBQUksRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDbkUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2dCQUNuQixJQUFJLEVBQUUsUUFBUSxDQUFDLElBQUk7Z0JBQ25CLGNBQWMsRUFBRSxxQ0FBc0IsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxnREFBZ0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLEVBQWhDLENBQWdDLENBQUM7YUFDeEYsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELHlEQUF1QixHQUF2QixVQUF3QixVQUF5QixFQUFFLFlBQW1CO1FBQXRFLGlCQXNFQztRQXBFQyxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUM7UUFDM0IsSUFBSSxNQUFNLEdBQUcsZ0JBQVMsQ0FBQyxZQUFZLENBQUMsR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0YsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2QsQ0FBQztRQUNELElBQUksb0JBQW9CLEdBQXNDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLO1lBQzdFLElBQUksV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbkIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxLQUFLLEdBQWtCLElBQUksQ0FBQztZQUNoQyxJQUFJLFNBQVMsR0FBc0IsSUFBSSxDQUFDO1lBQ3hDLElBQUksS0FBSyxHQUFRLElBQUksQ0FBQztZQUN0QixFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFVO29CQUNoQyxFQUFFLENBQUMsQ0FBQyxVQUFVLFlBQVksbUJBQVksQ0FBQyxDQUFDLENBQUM7d0JBQ3ZDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ2hCLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsWUFBWSxtQkFBWSxDQUFDLENBQUMsQ0FBQzt3QkFDOUMsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDaEIsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxZQUFZLHVCQUFnQixDQUFDLENBQUMsQ0FBQzt3QkFDbEQsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDcEIsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxZQUFZLHVCQUFnQixDQUFDLENBQUMsQ0FBQzt3QkFDbEQsVUFBVSxHQUFHLElBQUksQ0FBQztvQkFDcEIsQ0FBQztvQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsVUFBVSxZQUFZLHdCQUFpQixDQUFDLENBQUMsQ0FBQzt3QkFDbkQsV0FBVyxHQUFHLElBQUksQ0FBQzt3QkFDbkIsS0FBSyxHQUFHLFVBQVUsQ0FBQyxhQUFhLENBQUM7b0JBQ25DLENBQUM7b0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFVBQVUsWUFBWSxvQkFBYSxDQUFDLENBQUMsQ0FBQzt3QkFDL0MsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7NEJBQzNCLFNBQVMsR0FBRyxVQUFVLENBQUM7d0JBQ3pCLENBQUM7d0JBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ04sS0FBSyxHQUFHLFVBQVUsQ0FBQzt3QkFDckIsQ0FBQztvQkFDSCxDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLFlBQVkscUJBQWMsQ0FBQyxDQUFDLENBQUM7d0JBQ2hELEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO29CQUMzQixDQUFDO29CQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLElBQUksY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDckQsS0FBSyxHQUFHLFVBQVUsQ0FBQztvQkFDckIsQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQixjQUFjLEdBQUcsSUFBSSxDQUFDO2dCQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztnQkFDekMsV0FBVyxFQUFFLFdBQVc7Z0JBQ3hCLE1BQU0sRUFBRSxNQUFNO2dCQUNkLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFVBQVUsRUFBRSxVQUFVO2dCQUN0QixVQUFVLEVBQUUsVUFBVTtnQkFDdEIsS0FBSyxFQUFFLGdCQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLEdBQUcsSUFBSTtnQkFDL0UsU0FBUyxFQUFFLGdCQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLEdBQUcsSUFBSTtnQkFDM0YsS0FBSyxFQUFFLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUM7YUFDcEMsQ0FBQyxDQUFDO1FBRUwsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksVUFBVSxHQUNWLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxVQUFDLEdBQUcsSUFBTyxNQUFNLENBQUMsR0FBRyxHQUFHLGdCQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDMUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLE1BQU0sSUFBSSwwQkFBYSxDQUNuQixzQ0FBb0MsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsV0FBTSxVQUFVLE9BQUksQ0FBQyxDQUFDO1FBQ3JGLENBQUM7UUFFRCxNQUFNLENBQUMsb0JBQW9CLENBQUM7SUFDOUIsQ0FBQztJQUVELGtEQUFnQixHQUFoQixVQUFpQixLQUFVO1FBQ3pCLEtBQUssR0FBRyx3QkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNqQyxJQUFJLFlBQWlCLENBQW1CO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLGVBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsWUFBWSxHQUFHLElBQUksR0FBRyxDQUFDLG9CQUFvQixDQUFDLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sWUFBWSxHQUFHLElBQUksR0FBRyxDQUFDLG9CQUFvQixDQUFDO2dCQUMxQyxVQUFVLEVBQUUsSUFBSSxHQUFHLENBQUMseUJBQXlCLENBQUM7b0JBQzVDLE9BQU8sRUFBRSxLQUFLO29CQUNkLElBQUksRUFBRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO29CQUNuQyxTQUFTLEVBQUUsbUJBQW1CLENBQUMsS0FBSyxDQUFDO2lCQUN0QyxDQUFDO2FBQ0gsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUNELE1BQU0sQ0FBQyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVELHNEQUFvQixHQUFwQixVQUFxQixTQUFnQixFQUFFLDBCQUFxRDtRQUE1RixpQkE2QkM7UUEzQkMsSUFBTSxnQkFBZ0IsR0FBcUUsRUFBRSxDQUFDO1FBQzlGLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO1lBQ3pCLFFBQVEsR0FBRyx3QkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2QyxFQUFFLENBQUMsQ0FBQyxnQ0FBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLFFBQVEsR0FBRyw2QkFBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RDLENBQUM7WUFDRCxJQUFJLGVBQTBFLENBQUM7WUFDL0UsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsZUFBZSxHQUFHLEtBQUksQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztZQUNwRixDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsWUFBWSxlQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxJQUFJLFNBQVMsR0FBRyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN0RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLDZCQUFlLENBQUMseUJBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1RSwwQkFBMEIsQ0FBQyxJQUFJLE9BQS9CLDBCQUEwQixFQUFTLEtBQUksQ0FBQyxtQ0FBbUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUN6RixDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLGVBQWUsR0FBRyxLQUFJLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3ZELENBQUM7WUFDSCxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLGVBQWUsR0FBRyxLQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLElBQUksMEJBQWEsQ0FDbkIsOEVBQTRFLGdCQUFTLENBQUMsUUFBUSxDQUFHLENBQUMsQ0FBQztZQUN6RyxDQUFDO1lBQ0QsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3pDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0lBRUQscUVBQW1DLEdBQW5DLFVBQW9DLFFBQWtCO1FBQXRELGlCQWlCQztRQWhCQyxJQUFJLFVBQVUsR0FBOEIsRUFBRSxDQUFDO1FBQy9DLElBQUksb0JBQW9CLEdBQW9DLEVBQUUsQ0FBQztRQUMvRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsVUFBVSxJQUFJLFFBQVEsQ0FBQyxXQUFXLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckUsTUFBTSxJQUFJLDBCQUFhLENBQUMsMERBQTBELENBQUMsQ0FBQztRQUN0RixDQUFDO1FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNwQixNQUFNLElBQUksMEJBQWEsQ0FBQyxnRUFBZ0UsQ0FBQyxDQUFDO1FBQzVGLENBQUM7UUFDRCxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDL0Qsb0JBQW9CLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBVTtZQUN0QyxJQUFJLE9BQU8sR0FBRyxLQUFJLENBQUMsb0JBQW9CLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNuRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNaLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUVELHFEQUFtQixHQUFuQixVQUFvQixRQUFrQjtRQUNwQyxJQUFJLFdBQThDLENBQUM7UUFDbkQsSUFBSSxtQkFBbUIsR0FBNEIsSUFBSSxDQUFDO1FBQ3hELElBQUksc0JBQXNCLEdBQStCLElBQUksQ0FBQztRQUU5RCxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FDdEMsUUFBUSxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3RGLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQyxNQUFNLENBQUM7UUFDM0MsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUM1QyxRQUFRLENBQUMsVUFBVSxFQUFFLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDMUYsV0FBVyxHQUFHLHNCQUFzQixDQUFDLE1BQU0sQ0FBQztRQUM5QyxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLHVCQUF1QixDQUFDO1lBQ3JDLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztZQUM1QyxRQUFRLEVBQUUsbUJBQW1CO1lBQzdCLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQztZQUN0RCxVQUFVLEVBQUUsc0JBQXNCO1lBQ2xDLFdBQVcsRUFBRSxnQkFBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQztnQkFDM0MsSUFBSTtZQUNuRCxJQUFJLEVBQUUsV0FBVztZQUNqQixLQUFLLEVBQUUsUUFBUSxDQUFDLEtBQUs7U0FDdEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9EQUFrQixHQUFsQixVQUNJLE9BQXVDLEVBQUUsV0FBb0IsRUFDN0QsYUFBbUI7UUFGdkIsaUJBVUM7UUFQQyxJQUFJLEdBQUcsR0FBK0IsRUFBRSxDQUFDO1FBQ3pDLDZCQUFnQixDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFvQixFQUFFLFlBQW9CO1lBQzNFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQztnQkFDdEMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3RFLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQsa0RBQWdCLEdBQWhCLFVBQWlCLENBQWdCLEVBQUUsWUFBb0IsRUFBRSxVQUF5QjtRQUFsRixpQkFtQkM7UUFqQkMsSUFBSSxTQUFxQyxDQUFDO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDeEIsU0FBUyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUE5QixDQUE4QixDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLE1BQU0sSUFBSSwwQkFBYSxDQUNuQixnREFBNkMsWUFBWSxnQkFBUyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxnREFBNEMsQ0FBQyxDQUFDO1lBQzNJLENBQUM7WUFDRCxTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztZQUNsQyxTQUFTLEVBQUUsU0FBUztZQUNwQixLQUFLLEVBQUUsQ0FBQyxDQUFDLEtBQUs7WUFDZCxXQUFXLEVBQUUsQ0FBQyxDQUFDLFdBQVc7WUFDMUIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsSUFBSSxFQUFFLGdCQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSTtTQUMvRCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsa0NBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsaUJBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsc0NBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUscUNBQWdCLEdBQUc7UUFDMUIsRUFBQyxJQUFJLEVBQUUsc0NBQWlCLEdBQUc7UUFDM0IsRUFBQyxJQUFJLEVBQUUsNEJBQVksR0FBRztRQUN0QixFQUFDLElBQUksRUFBRSw0QkFBWSxHQUFHO1FBQ3RCLEVBQUMsSUFBSSxFQUFFLHVCQUFjLEdBQUc7UUFDeEIsRUFBQyxJQUFJLEVBQUUsc0JBQU8sR0FBRztRQUNqQixFQUFDLElBQUksRUFBRSw4QkFBZSxHQUFHO0tBQ3hCLENBQUM7SUFDRiw4QkFBQztBQUFELENBQUMsQUE1cEJELElBNHBCQztBQTVwQlksK0JBQXVCLDBCQTRwQm5DLENBQUE7QUFFRCw4QkFDSSxPQUFzQyxFQUFFLGNBQXVCLEVBQy9ELGFBQWlELEVBQ2pELGNBQWdDO0lBRGhDLDZCQUFpRCxHQUFqRCxrQkFBaUQ7SUFDakQsOEJBQWdDLEdBQWhDLHFCQUFxQixHQUFHLEVBQVE7SUFDbEMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLFFBQVE7UUFDdkIsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLGNBQWMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQyxJQUFNLGFBQWEsR0FBRyxjQUFjO2dCQUNoQyxRQUFRLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDO2dCQUN6RCxRQUFRLENBQUMsZUFBZSxDQUFDO1lBQzdCLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxjQUFjLEVBQUUsYUFBYSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBQ25GLGlGQUFpRjtZQUNqRixtRUFBbUU7WUFDbkUsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFHRCxzQkFBc0IsSUFBVyxFQUFFLEdBQW9CO0lBQXBCLG1CQUFvQixHQUFwQixRQUFvQjtJQUNyRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ1QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDckMsSUFBSSxJQUFJLEdBQUcsd0JBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEMsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsWUFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELGlDQUNJLGFBQW1CLEVBQUUsYUFBb0IsRUFBRSxhQUFxQjtJQUNsRSxJQUFJLElBQUksR0FBVSxFQUFFLENBQUM7SUFDckIsSUFBSSxNQUFjLENBQUM7SUFFbkIsWUFBWSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNsQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNyQyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFVBQUEsUUFBUSxJQUFJLE9BQUEsY0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxnQkFBUyxDQUFDLFFBQVEsQ0FBQyxFQUE3QyxDQUE2QyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3hGLE1BQU0sSUFBSSwwQkFBYSxDQUNuQixvQkFBa0IsYUFBYSxlQUFTLGdCQUFTLENBQUMsYUFBYSxDQUFDLDhCQUF3QixNQUFNLE9BQUksQ0FBQyxDQUFDO1FBQzFHLENBQUM7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLGFBQWEsQ0FBQztBQUN2QixDQUFDO0FBRUQscUJBQXFCLEtBQVU7SUFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVksV0FBSSxDQUFDLENBQUM7QUFDOUQsQ0FBQztBQUVELDZCQUE2QixLQUFVO0lBQ3JDLE1BQU0sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQzNELENBQUM7QUFFRCw0QkFDSSxTQUEwQixFQUFFLElBQVMsRUFBRSxXQUE4QjtJQUN2RSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDO1FBQ3BDLElBQUksTUFBTSxHQUFHLDJCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsUUFBUTtZQUNSLGFBQVcsUUFBUSxHQUFHLG9CQUFlLENBQUM7SUFDeEYsQ0FBQztJQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFFRCwrQkFDSSxLQUFVLEVBQUUsaUJBQWtEO0lBQ2hFLE1BQU0sQ0FBQyxpQkFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLHNCQUFzQixFQUFFLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztBQUM1RSxDQUFDO0FBRUQ7SUFBcUMsMENBQWdCO0lBQXJEO1FBQXFDLDhCQUFnQjtJQVlyRCxDQUFDO0lBWEMsMkNBQVUsR0FBVixVQUFXLEtBQVUsRUFBRSxpQkFBa0Q7UUFDdkUsSUFBSSxVQUF5QyxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyx5QkFBeUIsQ0FDMUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNyRSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixVQUFVLEdBQUcsSUFBSSxHQUFHLENBQUMseUJBQXlCLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUNuRSxDQUFDO1FBQ0QsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sQ0FBQyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQUNILDZCQUFDO0FBQUQsQ0FBQyxBQVpELENBQXFDLHVCQUFnQixHQVlwRCJ9