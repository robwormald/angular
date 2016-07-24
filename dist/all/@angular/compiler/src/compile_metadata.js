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
var selector_1 = require('./selector');
var url_resolver_1 = require('./url_resolver');
var util_1 = require('./util');
// group 0: "[prop] or (event) or @trigger"
// group 1: "prop" from "[prop]"
// group 2: "event" from "(event)"
// group 3: "@trigger" from "@trigger"
var HOST_REG_EXP = /^(?:(?:\[([^\]]+)\])|(?:\(([^\)]+)\)))|(\@[-\w]+)$/g;
var UNDEFINED = new Object();
var CompileMetadataWithIdentifier = (function () {
    function CompileMetadataWithIdentifier() {
    }
    Object.defineProperty(CompileMetadataWithIdentifier.prototype, "identifier", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileMetadataWithIdentifier.prototype, "runtimeCacheKey", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileMetadataWithIdentifier.prototype, "assetCacheKey", {
        get: function () { return exceptions_1.unimplemented(); },
        enumerable: true,
        configurable: true
    });
    CompileMetadataWithIdentifier.prototype.equalsTo = function (id2) { return exceptions_1.unimplemented(); };
    return CompileMetadataWithIdentifier;
}());
exports.CompileMetadataWithIdentifier = CompileMetadataWithIdentifier;
var CompileAnimationEntryMetadata = (function () {
    function CompileAnimationEntryMetadata(name, definitions) {
        if (name === void 0) { name = null; }
        if (definitions === void 0) { definitions = null; }
        this.name = name;
        this.definitions = definitions;
    }
    return CompileAnimationEntryMetadata;
}());
exports.CompileAnimationEntryMetadata = CompileAnimationEntryMetadata;
var CompileAnimationStateMetadata = (function () {
    function CompileAnimationStateMetadata() {
    }
    return CompileAnimationStateMetadata;
}());
exports.CompileAnimationStateMetadata = CompileAnimationStateMetadata;
var CompileAnimationStateDeclarationMetadata = (function (_super) {
    __extends(CompileAnimationStateDeclarationMetadata, _super);
    function CompileAnimationStateDeclarationMetadata(stateNameExpr, styles) {
        _super.call(this);
        this.stateNameExpr = stateNameExpr;
        this.styles = styles;
    }
    return CompileAnimationStateDeclarationMetadata;
}(CompileAnimationStateMetadata));
exports.CompileAnimationStateDeclarationMetadata = CompileAnimationStateDeclarationMetadata;
var CompileAnimationStateTransitionMetadata = (function (_super) {
    __extends(CompileAnimationStateTransitionMetadata, _super);
    function CompileAnimationStateTransitionMetadata(stateChangeExpr, steps) {
        _super.call(this);
        this.stateChangeExpr = stateChangeExpr;
        this.steps = steps;
    }
    return CompileAnimationStateTransitionMetadata;
}(CompileAnimationStateMetadata));
exports.CompileAnimationStateTransitionMetadata = CompileAnimationStateTransitionMetadata;
var CompileAnimationMetadata = (function () {
    function CompileAnimationMetadata() {
    }
    return CompileAnimationMetadata;
}());
exports.CompileAnimationMetadata = CompileAnimationMetadata;
var CompileAnimationKeyframesSequenceMetadata = (function (_super) {
    __extends(CompileAnimationKeyframesSequenceMetadata, _super);
    function CompileAnimationKeyframesSequenceMetadata(steps) {
        if (steps === void 0) { steps = []; }
        _super.call(this);
        this.steps = steps;
    }
    return CompileAnimationKeyframesSequenceMetadata;
}(CompileAnimationMetadata));
exports.CompileAnimationKeyframesSequenceMetadata = CompileAnimationKeyframesSequenceMetadata;
var CompileAnimationStyleMetadata = (function (_super) {
    __extends(CompileAnimationStyleMetadata, _super);
    function CompileAnimationStyleMetadata(offset, styles) {
        if (styles === void 0) { styles = null; }
        _super.call(this);
        this.offset = offset;
        this.styles = styles;
    }
    return CompileAnimationStyleMetadata;
}(CompileAnimationMetadata));
exports.CompileAnimationStyleMetadata = CompileAnimationStyleMetadata;
var CompileAnimationAnimateMetadata = (function (_super) {
    __extends(CompileAnimationAnimateMetadata, _super);
    function CompileAnimationAnimateMetadata(timings, styles) {
        if (timings === void 0) { timings = 0; }
        if (styles === void 0) { styles = null; }
        _super.call(this);
        this.timings = timings;
        this.styles = styles;
    }
    return CompileAnimationAnimateMetadata;
}(CompileAnimationMetadata));
exports.CompileAnimationAnimateMetadata = CompileAnimationAnimateMetadata;
var CompileAnimationWithStepsMetadata = (function (_super) {
    __extends(CompileAnimationWithStepsMetadata, _super);
    function CompileAnimationWithStepsMetadata(steps) {
        if (steps === void 0) { steps = null; }
        _super.call(this);
        this.steps = steps;
    }
    return CompileAnimationWithStepsMetadata;
}(CompileAnimationMetadata));
exports.CompileAnimationWithStepsMetadata = CompileAnimationWithStepsMetadata;
var CompileAnimationSequenceMetadata = (function (_super) {
    __extends(CompileAnimationSequenceMetadata, _super);
    function CompileAnimationSequenceMetadata(steps) {
        if (steps === void 0) { steps = null; }
        _super.call(this, steps);
    }
    return CompileAnimationSequenceMetadata;
}(CompileAnimationWithStepsMetadata));
exports.CompileAnimationSequenceMetadata = CompileAnimationSequenceMetadata;
var CompileAnimationGroupMetadata = (function (_super) {
    __extends(CompileAnimationGroupMetadata, _super);
    function CompileAnimationGroupMetadata(steps) {
        if (steps === void 0) { steps = null; }
        _super.call(this, steps);
    }
    return CompileAnimationGroupMetadata;
}(CompileAnimationWithStepsMetadata));
exports.CompileAnimationGroupMetadata = CompileAnimationGroupMetadata;
var CompileIdentifierMetadata = (function () {
    function CompileIdentifierMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, runtime = _b.runtime, name = _b.name, moduleUrl = _b.moduleUrl, prefix = _b.prefix, value = _b.value;
        this._assetCacheKey = UNDEFINED;
        this.runtime = runtime;
        this.name = name;
        this.prefix = prefix;
        this.moduleUrl = moduleUrl;
        this.value = value;
    }
    Object.defineProperty(CompileIdentifierMetadata.prototype, "identifier", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileIdentifierMetadata.prototype, "runtimeCacheKey", {
        get: function () { return this.identifier.runtime; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileIdentifierMetadata.prototype, "assetCacheKey", {
        get: function () {
            if (this._assetCacheKey === UNDEFINED) {
                if (lang_1.isPresent(this.moduleUrl) && lang_1.isPresent(url_resolver_1.getUrlScheme(this.moduleUrl))) {
                    var uri = core_private_1.reflector.importUri({ 'filePath': this.moduleUrl, 'name': this.name });
                    this._assetCacheKey = this.name + "|" + uri;
                }
                else {
                    this._assetCacheKey = null;
                }
            }
            return this._assetCacheKey;
        },
        enumerable: true,
        configurable: true
    });
    CompileIdentifierMetadata.prototype.equalsTo = function (id2) {
        var rk = this.runtimeCacheKey;
        var ak = this.assetCacheKey;
        return (lang_1.isPresent(rk) && rk == id2.runtimeCacheKey) ||
            (lang_1.isPresent(ak) && ak == id2.assetCacheKey);
    };
    return CompileIdentifierMetadata;
}());
exports.CompileIdentifierMetadata = CompileIdentifierMetadata;
var CompileDiDependencyMetadata = (function () {
    function CompileDiDependencyMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, isAttribute = _b.isAttribute, isSelf = _b.isSelf, isHost = _b.isHost, isSkipSelf = _b.isSkipSelf, isOptional = _b.isOptional, isValue = _b.isValue, query = _b.query, viewQuery = _b.viewQuery, token = _b.token, value = _b.value;
        this.isAttribute = lang_1.normalizeBool(isAttribute);
        this.isSelf = lang_1.normalizeBool(isSelf);
        this.isHost = lang_1.normalizeBool(isHost);
        this.isSkipSelf = lang_1.normalizeBool(isSkipSelf);
        this.isOptional = lang_1.normalizeBool(isOptional);
        this.isValue = lang_1.normalizeBool(isValue);
        this.query = query;
        this.viewQuery = viewQuery;
        this.token = token;
        this.value = value;
    }
    return CompileDiDependencyMetadata;
}());
exports.CompileDiDependencyMetadata = CompileDiDependencyMetadata;
var CompileProviderMetadata = (function () {
    function CompileProviderMetadata(_a) {
        var token = _a.token, useClass = _a.useClass, useValue = _a.useValue, useExisting = _a.useExisting, useFactory = _a.useFactory, deps = _a.deps, multi = _a.multi;
        this.token = token;
        this.useClass = useClass;
        this.useValue = useValue;
        this.useExisting = useExisting;
        this.useFactory = useFactory;
        this.deps = lang_1.normalizeBlank(deps);
        this.multi = lang_1.normalizeBool(multi);
    }
    return CompileProviderMetadata;
}());
exports.CompileProviderMetadata = CompileProviderMetadata;
var CompileFactoryMetadata = (function (_super) {
    __extends(CompileFactoryMetadata, _super);
    function CompileFactoryMetadata(_a) {
        var runtime = _a.runtime, name = _a.name, moduleUrl = _a.moduleUrl, prefix = _a.prefix, diDeps = _a.diDeps, value = _a.value;
        _super.call(this, { runtime: runtime, name: name, prefix: prefix, moduleUrl: moduleUrl, value: value });
        this.diDeps = _normalizeArray(diDeps);
    }
    return CompileFactoryMetadata;
}(CompileIdentifierMetadata));
exports.CompileFactoryMetadata = CompileFactoryMetadata;
var CompileTokenMetadata = (function () {
    function CompileTokenMetadata(_a) {
        var value = _a.value, identifier = _a.identifier, identifierIsInstance = _a.identifierIsInstance;
        this.value = value;
        this.identifier = identifier;
        this.identifierIsInstance = lang_1.normalizeBool(identifierIsInstance);
    }
    Object.defineProperty(CompileTokenMetadata.prototype, "runtimeCacheKey", {
        get: function () {
            if (lang_1.isPresent(this.identifier)) {
                return this.identifier.runtimeCacheKey;
            }
            else {
                return this.value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileTokenMetadata.prototype, "assetCacheKey", {
        get: function () {
            if (lang_1.isPresent(this.identifier)) {
                return this.identifier.assetCacheKey;
            }
            else {
                return this.value;
            }
        },
        enumerable: true,
        configurable: true
    });
    CompileTokenMetadata.prototype.equalsTo = function (token2) {
        var rk = this.runtimeCacheKey;
        var ak = this.assetCacheKey;
        return (lang_1.isPresent(rk) && rk == token2.runtimeCacheKey) ||
            (lang_1.isPresent(ak) && ak == token2.assetCacheKey);
    };
    Object.defineProperty(CompileTokenMetadata.prototype, "name", {
        get: function () {
            return lang_1.isPresent(this.value) ? util_1.sanitizeIdentifier(this.value) : this.identifier.name;
        },
        enumerable: true,
        configurable: true
    });
    return CompileTokenMetadata;
}());
exports.CompileTokenMetadata = CompileTokenMetadata;
/**
 * Note: We only need this in places where we need to support identifiers that
 * don't have a `runtime` value given by the `StaticReflector`. E.g. see the `identifiers`
 * file where we have some identifiers hard coded by name/module path.
 *
 * TODO(tbosch): Eventually, all of these places should go through the static reflector
 * as well, providing them with a valid `StaticSymbol` that is again a singleton.
 */
var CompileIdentifierMap = (function () {
    function CompileIdentifierMap() {
        this._valueMap = new Map();
        this._values = [];
        this._tokens = [];
    }
    CompileIdentifierMap.prototype.add = function (token, value) {
        var existing = this.get(token);
        if (lang_1.isPresent(existing)) {
            throw new exceptions_1.BaseException("Cannot overwrite in a CompileIdentifierMap! Token: " + token.identifier.name);
        }
        this._tokens.push(token);
        this._values.push(value);
        var rk = token.runtimeCacheKey;
        if (lang_1.isPresent(rk)) {
            this._valueMap.set(rk, value);
        }
        var ak = token.assetCacheKey;
        if (lang_1.isPresent(ak)) {
            this._valueMap.set(ak, value);
        }
    };
    CompileIdentifierMap.prototype.get = function (token) {
        var rk = token.runtimeCacheKey;
        var ak = token.assetCacheKey;
        var result;
        if (lang_1.isPresent(rk)) {
            result = this._valueMap.get(rk);
        }
        if (lang_1.isBlank(result) && lang_1.isPresent(ak)) {
            result = this._valueMap.get(ak);
        }
        return result;
    };
    CompileIdentifierMap.prototype.keys = function () { return this._tokens; };
    CompileIdentifierMap.prototype.values = function () { return this._values; };
    Object.defineProperty(CompileIdentifierMap.prototype, "size", {
        get: function () { return this._values.length; },
        enumerable: true,
        configurable: true
    });
    return CompileIdentifierMap;
}());
exports.CompileIdentifierMap = CompileIdentifierMap;
/**
 * Metadata regarding compilation of a type.
 */
var CompileTypeMetadata = (function (_super) {
    __extends(CompileTypeMetadata, _super);
    function CompileTypeMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, runtime = _b.runtime, name = _b.name, moduleUrl = _b.moduleUrl, prefix = _b.prefix, isHost = _b.isHost, value = _b.value, diDeps = _b.diDeps;
        _super.call(this, { runtime: runtime, name: name, moduleUrl: moduleUrl, prefix: prefix, value: value });
        this.isHost = lang_1.normalizeBool(isHost);
        this.diDeps = _normalizeArray(diDeps);
    }
    return CompileTypeMetadata;
}(CompileIdentifierMetadata));
exports.CompileTypeMetadata = CompileTypeMetadata;
var CompileQueryMetadata = (function () {
    function CompileQueryMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, selectors = _b.selectors, descendants = _b.descendants, first = _b.first, propertyName = _b.propertyName, read = _b.read;
        this.selectors = selectors;
        this.descendants = lang_1.normalizeBool(descendants);
        this.first = lang_1.normalizeBool(first);
        this.propertyName = propertyName;
        this.read = read;
    }
    return CompileQueryMetadata;
}());
exports.CompileQueryMetadata = CompileQueryMetadata;
/**
 * Metadata about a stylesheet
 */
var CompileStylesheetMetadata = (function () {
    function CompileStylesheetMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, moduleUrl = _b.moduleUrl, styles = _b.styles, styleUrls = _b.styleUrls;
        this.moduleUrl = moduleUrl;
        this.styles = _normalizeArray(styles);
        this.styleUrls = _normalizeArray(styleUrls);
    }
    return CompileStylesheetMetadata;
}());
exports.CompileStylesheetMetadata = CompileStylesheetMetadata;
/**
 * Metadata regarding compilation of a template.
 */
var CompileTemplateMetadata = (function () {
    function CompileTemplateMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, encapsulation = _b.encapsulation, template = _b.template, templateUrl = _b.templateUrl, styles = _b.styles, styleUrls = _b.styleUrls, externalStylesheets = _b.externalStylesheets, animations = _b.animations, ngContentSelectors = _b.ngContentSelectors, interpolation = _b.interpolation;
        this.encapsulation = encapsulation;
        this.template = template;
        this.templateUrl = templateUrl;
        this.styles = _normalizeArray(styles);
        this.styleUrls = _normalizeArray(styleUrls);
        this.externalStylesheets = _normalizeArray(externalStylesheets);
        this.animations = lang_1.isPresent(animations) ? collection_1.ListWrapper.flatten(animations) : [];
        this.ngContentSelectors = lang_1.isPresent(ngContentSelectors) ? ngContentSelectors : [];
        if (lang_1.isPresent(interpolation) && interpolation.length != 2) {
            throw new exceptions_1.BaseException("'interpolation' should have a start and an end symbol.");
        }
        this.interpolation = interpolation;
    }
    return CompileTemplateMetadata;
}());
exports.CompileTemplateMetadata = CompileTemplateMetadata;
/**
 * Metadata regarding compilation of a directive.
 */
var CompileDirectiveMetadata = (function () {
    function CompileDirectiveMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, type = _b.type, isComponent = _b.isComponent, selector = _b.selector, exportAs = _b.exportAs, changeDetection = _b.changeDetection, inputs = _b.inputs, outputs = _b.outputs, hostListeners = _b.hostListeners, hostProperties = _b.hostProperties, hostAttributes = _b.hostAttributes, lifecycleHooks = _b.lifecycleHooks, providers = _b.providers, viewProviders = _b.viewProviders, queries = _b.queries, viewQueries = _b.viewQueries, precompile = _b.precompile, template = _b.template;
        this.type = type;
        this.isComponent = isComponent;
        this.selector = selector;
        this.exportAs = exportAs;
        this.changeDetection = changeDetection;
        this.inputs = inputs;
        this.outputs = outputs;
        this.hostListeners = hostListeners;
        this.hostProperties = hostProperties;
        this.hostAttributes = hostAttributes;
        this.lifecycleHooks = _normalizeArray(lifecycleHooks);
        this.providers = _normalizeArray(providers);
        this.viewProviders = _normalizeArray(viewProviders);
        this.queries = _normalizeArray(queries);
        this.viewQueries = _normalizeArray(viewQueries);
        this.precompile = _normalizeArray(precompile);
        this.template = template;
    }
    CompileDirectiveMetadata.create = function (_a) {
        var _b = _a === void 0 ? {} : _a, type = _b.type, isComponent = _b.isComponent, selector = _b.selector, exportAs = _b.exportAs, changeDetection = _b.changeDetection, inputs = _b.inputs, outputs = _b.outputs, host = _b.host, lifecycleHooks = _b.lifecycleHooks, providers = _b.providers, viewProviders = _b.viewProviders, queries = _b.queries, viewQueries = _b.viewQueries, precompile = _b.precompile, template = _b.template;
        var hostListeners = {};
        var hostProperties = {};
        var hostAttributes = {};
        if (lang_1.isPresent(host)) {
            collection_1.StringMapWrapper.forEach(host, function (value, key) {
                var matches = lang_1.RegExpWrapper.firstMatch(HOST_REG_EXP, key);
                if (lang_1.isBlank(matches)) {
                    hostAttributes[key] = value;
                }
                else if (lang_1.isPresent(matches[1])) {
                    hostProperties[matches[1]] = value;
                }
                else if (lang_1.isPresent(matches[2])) {
                    hostListeners[matches[2]] = value;
                }
                else if (lang_1.isPresent(matches[3])) {
                    hostProperties[matches[3]] = value;
                }
            });
        }
        var inputsMap = {};
        if (lang_1.isPresent(inputs)) {
            inputs.forEach(function (bindConfig) {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var parts = util_1.splitAtColon(bindConfig, [bindConfig, bindConfig]);
                inputsMap[parts[0]] = parts[1];
            });
        }
        var outputsMap = {};
        if (lang_1.isPresent(outputs)) {
            outputs.forEach(function (bindConfig) {
                // canonical syntax: `dirProp: elProp`
                // if there is no `:`, use dirProp = elProp
                var parts = util_1.splitAtColon(bindConfig, [bindConfig, bindConfig]);
                outputsMap[parts[0]] = parts[1];
            });
        }
        return new CompileDirectiveMetadata({
            type: type,
            isComponent: lang_1.normalizeBool(isComponent), selector: selector, exportAs: exportAs, changeDetection: changeDetection,
            inputs: inputsMap,
            outputs: outputsMap, hostListeners: hostListeners, hostProperties: hostProperties, hostAttributes: hostAttributes,
            lifecycleHooks: lang_1.isPresent(lifecycleHooks) ? lifecycleHooks : [],
            providers: providers,
            viewProviders: viewProviders,
            queries: queries,
            viewQueries: viewQueries,
            precompile: precompile,
            template: template,
        });
    };
    Object.defineProperty(CompileDirectiveMetadata.prototype, "identifier", {
        get: function () { return this.type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileDirectiveMetadata.prototype, "runtimeCacheKey", {
        get: function () { return this.type.runtimeCacheKey; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileDirectiveMetadata.prototype, "assetCacheKey", {
        get: function () { return this.type.assetCacheKey; },
        enumerable: true,
        configurable: true
    });
    CompileDirectiveMetadata.prototype.equalsTo = function (other) {
        return this.type.equalsTo(other.identifier);
    };
    return CompileDirectiveMetadata;
}());
exports.CompileDirectiveMetadata = CompileDirectiveMetadata;
/**
 * Construct {@link CompileDirectiveMetadata} from {@link ComponentTypeMetadata} and a selector.
 */
function createHostComponentMeta(compMeta) {
    var template = selector_1.CssSelector.parse(compMeta.selector)[0].getMatchingElementTemplate();
    return CompileDirectiveMetadata.create({
        type: new CompileTypeMetadata({
            runtime: Object,
            name: compMeta.type.name + "_Host",
            moduleUrl: compMeta.type.moduleUrl,
            isHost: true
        }),
        template: new CompileTemplateMetadata({
            template: template,
            templateUrl: '',
            styles: [],
            styleUrls: [],
            ngContentSelectors: [],
            animations: []
        }),
        changeDetection: core_1.ChangeDetectionStrategy.Default,
        inputs: [],
        outputs: [],
        host: {},
        lifecycleHooks: [],
        isComponent: true,
        selector: '*',
        providers: [],
        viewProviders: [],
        queries: [],
        viewQueries: []
    });
}
exports.createHostComponentMeta = createHostComponentMeta;
var CompilePipeMetadata = (function () {
    function CompilePipeMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, type = _b.type, name = _b.name, pure = _b.pure, lifecycleHooks = _b.lifecycleHooks;
        this.type = type;
        this.name = name;
        this.pure = lang_1.normalizeBool(pure);
        this.lifecycleHooks = _normalizeArray(lifecycleHooks);
    }
    Object.defineProperty(CompilePipeMetadata.prototype, "identifier", {
        get: function () { return this.type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompilePipeMetadata.prototype, "runtimeCacheKey", {
        get: function () { return this.type.runtimeCacheKey; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompilePipeMetadata.prototype, "assetCacheKey", {
        get: function () { return this.type.assetCacheKey; },
        enumerable: true,
        configurable: true
    });
    CompilePipeMetadata.prototype.equalsTo = function (other) {
        return this.type.equalsTo(other.identifier);
    };
    return CompilePipeMetadata;
}());
exports.CompilePipeMetadata = CompilePipeMetadata;
/**
 * Metadata regarding compilation of a directive.
 */
var CompileNgModuleMetadata = (function () {
    function CompileNgModuleMetadata(_a) {
        var _b = _a === void 0 ? {} : _a, type = _b.type, providers = _b.providers, declaredDirectives = _b.declaredDirectives, exportedDirectives = _b.exportedDirectives, declaredPipes = _b.declaredPipes, exportedPipes = _b.exportedPipes, precompile = _b.precompile, importedModules = _b.importedModules, exportedModules = _b.exportedModules, transitiveModule = _b.transitiveModule;
        this.type = type;
        this.declaredDirectives = _normalizeArray(declaredDirectives);
        this.exportedDirectives = _normalizeArray(exportedDirectives);
        this.declaredPipes = _normalizeArray(declaredPipes);
        this.exportedPipes = _normalizeArray(exportedPipes);
        this.providers = _normalizeArray(providers);
        this.precompile = _normalizeArray(precompile);
        this.importedModules = _normalizeArray(importedModules);
        this.exportedModules = _normalizeArray(exportedModules);
        this.transitiveModule = transitiveModule;
    }
    Object.defineProperty(CompileNgModuleMetadata.prototype, "identifier", {
        get: function () { return this.type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileNgModuleMetadata.prototype, "runtimeCacheKey", {
        get: function () { return this.type.runtimeCacheKey; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompileNgModuleMetadata.prototype, "assetCacheKey", {
        get: function () { return this.type.assetCacheKey; },
        enumerable: true,
        configurable: true
    });
    CompileNgModuleMetadata.prototype.equalsTo = function (other) {
        return this.type.equalsTo(other.identifier);
    };
    return CompileNgModuleMetadata;
}());
exports.CompileNgModuleMetadata = CompileNgModuleMetadata;
var TransitiveCompileNgModuleMetadata = (function () {
    function TransitiveCompileNgModuleMetadata(modules, providers, precompile, directives, pipes) {
        var _this = this;
        this.modules = modules;
        this.providers = providers;
        this.precompile = precompile;
        this.directives = directives;
        this.pipes = pipes;
        this.directivesSet = new Set();
        this.pipesSet = new Set();
        directives.forEach(function (dir) { return _this.directivesSet.add(dir.type.runtime); });
        pipes.forEach(function (pipe) { return _this.pipesSet.add(pipe.type.runtime); });
    }
    return TransitiveCompileNgModuleMetadata;
}());
exports.TransitiveCompileNgModuleMetadata = TransitiveCompileNgModuleMetadata;
function removeIdentifierDuplicates(items) {
    var map = new CompileIdentifierMap();
    items.forEach(function (item) {
        if (!map.get(item)) {
            map.add(item, item);
        }
    });
    return map.keys();
}
exports.removeIdentifierDuplicates = removeIdentifierDuplicates;
function _normalizeArray(obj) {
    return lang_1.isPresent(obj) ? obj : [];
}
function isStaticSymbol(value) {
    return lang_1.isStringMap(value) && lang_1.isPresent(value['name']) && lang_1.isPresent(value['filePath']);
}
exports.isStaticSymbol = isStaticSymbol;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGlsZV9tZXRhZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2NvbXBpbGVfbWV0YWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgscUJBQXlELGVBQWUsQ0FBQyxDQUFBO0FBRXpFLDZCQUE2SCxpQkFBaUIsQ0FBQyxDQUFBO0FBQy9JLDJCQUE0QywwQkFBMEIsQ0FBQyxDQUFBO0FBQ3ZFLDJCQUEyQywwQkFBMEIsQ0FBQyxDQUFBO0FBQ3RFLHFCQUF3SyxvQkFBb0IsQ0FBQyxDQUFBO0FBRTdMLHlCQUEwQixZQUFZLENBQUMsQ0FBQTtBQUN2Qyw2QkFBMkIsZ0JBQWdCLENBQUMsQ0FBQTtBQUM1QyxxQkFBK0MsUUFBUSxDQUFDLENBQUE7QUFHeEQsMkNBQTJDO0FBQzNDLGdDQUFnQztBQUNoQyxrQ0FBa0M7QUFDbEMsc0NBQXNDO0FBQ3RDLElBQU0sWUFBWSxHQUFHLHFEQUFxRCxDQUFDO0FBQzNFLElBQU0sU0FBUyxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7QUFFL0I7SUFBQTtJQVFBLENBQUM7SUFQQyxzQkFBSSxxREFBVTthQUFkLGNBQThDLE1BQU0sQ0FBNEIsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFbEcsc0JBQUksMERBQWU7YUFBbkIsY0FBNkIsTUFBTSxDQUFDLDBCQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRXRELHNCQUFJLHdEQUFhO2FBQWpCLGNBQTJCLE1BQU0sQ0FBQywwQkFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVwRCxnREFBUSxHQUFSLFVBQVMsR0FBa0MsSUFBYSxNQUFNLENBQUMsMEJBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuRixvQ0FBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBUnFCLHFDQUE2QixnQ0FRbEQsQ0FBQTtBQUVEO0lBQ0UsdUNBQ1csSUFBbUIsRUFBUyxXQUFtRDtRQUF0RixvQkFBMEIsR0FBMUIsV0FBMEI7UUFBRSwyQkFBMEQsR0FBMUQsa0JBQTBEO1FBQS9FLFNBQUksR0FBSixJQUFJLENBQWU7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBd0M7SUFBRyxDQUFDO0lBQ2hHLG9DQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7QUFIWSxxQ0FBNkIsZ0NBR3pDLENBQUE7QUFFRDtJQUFBO0lBQXFELENBQUM7SUFBRCxvQ0FBQztBQUFELENBQUMsQUFBdEQsSUFBc0Q7QUFBaEMscUNBQTZCLGdDQUFHLENBQUE7QUFFdEQ7SUFBOEQsNERBQTZCO0lBQ3pGLGtEQUFtQixhQUFxQixFQUFTLE1BQXFDO1FBQ3BGLGlCQUFPLENBQUM7UUFEUyxrQkFBYSxHQUFiLGFBQWEsQ0FBUTtRQUFTLFdBQU0sR0FBTixNQUFNLENBQStCO0lBRXRGLENBQUM7SUFDSCwrQ0FBQztBQUFELENBQUMsQUFKRCxDQUE4RCw2QkFBNkIsR0FJMUY7QUFKWSxnREFBd0MsMkNBSXBELENBQUE7QUFFRDtJQUE2RCwyREFBNkI7SUFDeEYsaURBQW1CLGVBQXVCLEVBQVMsS0FBK0I7UUFBSSxpQkFBTyxDQUFDO1FBQTNFLG9CQUFlLEdBQWYsZUFBZSxDQUFRO1FBQVMsVUFBSyxHQUFMLEtBQUssQ0FBMEI7SUFBYSxDQUFDO0lBQ2xHLDhDQUFDO0FBQUQsQ0FBQyxBQUZELENBQTZELDZCQUE2QixHQUV6RjtBQUZZLCtDQUF1QywwQ0FFbkQsQ0FBQTtBQUVEO0lBQUE7SUFBZ0QsQ0FBQztJQUFELCtCQUFDO0FBQUQsQ0FBQyxBQUFqRCxJQUFpRDtBQUEzQixnQ0FBd0IsMkJBQUcsQ0FBQTtBQUVqRDtJQUErRCw2REFBd0I7SUFDckYsbURBQW1CLEtBQTJDO1FBQWxELHFCQUFrRCxHQUFsRCxVQUFrRDtRQUFJLGlCQUFPLENBQUM7UUFBdkQsVUFBSyxHQUFMLEtBQUssQ0FBc0M7SUFBYSxDQUFDO0lBQzlFLGdEQUFDO0FBQUQsQ0FBQyxBQUZELENBQStELHdCQUF3QixHQUV0RjtBQUZZLGlEQUF5Qyw0Q0FFckQsQ0FBQTtBQUVEO0lBQW1ELGlEQUF3QjtJQUN6RSx1Q0FDVyxNQUFjLEVBQVMsTUFBNkQ7UUFBcEUsc0JBQW9FLEdBQXBFLGFBQW9FO1FBQzdGLGlCQUFPLENBQUM7UUFEQyxXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBdUQ7SUFFL0YsQ0FBQztJQUNILG9DQUFDO0FBQUQsQ0FBQyxBQUxELENBQW1ELHdCQUF3QixHQUsxRTtBQUxZLHFDQUE2QixnQ0FLekMsQ0FBQTtBQUVEO0lBQXFELG1EQUF3QjtJQUMzRSx5Q0FDVyxPQUEwQixFQUFTLE1BQ007UUFEaEQsdUJBQWlDLEdBQWpDLFdBQWlDO1FBQUUsc0JBQ2EsR0FEYixhQUNhO1FBQ2xELGlCQUFPLENBQUM7UUFGQyxZQUFPLEdBQVAsT0FBTyxDQUFtQjtRQUFTLFdBQU0sR0FBTixNQUFNLENBQ0E7SUFFcEQsQ0FBQztJQUNILHNDQUFDO0FBQUQsQ0FBQyxBQU5ELENBQXFELHdCQUF3QixHQU01RTtBQU5ZLHVDQUErQixrQ0FNM0MsQ0FBQTtBQUVEO0lBQWdFLHFEQUF3QjtJQUN0RiwyQ0FBbUIsS0FBd0M7UUFBL0MscUJBQStDLEdBQS9DLFlBQStDO1FBQUksaUJBQU8sQ0FBQztRQUFwRCxVQUFLLEdBQUwsS0FBSyxDQUFtQztJQUFhLENBQUM7SUFDM0Usd0NBQUM7QUFBRCxDQUFDLEFBRkQsQ0FBZ0Usd0JBQXdCLEdBRXZGO0FBRnFCLHlDQUFpQyxvQ0FFdEQsQ0FBQTtBQUVEO0lBQXNELG9EQUFpQztJQUNyRiwwQ0FBWSxLQUF3QztRQUF4QyxxQkFBd0MsR0FBeEMsWUFBd0M7UUFBSSxrQkFBTSxLQUFLLENBQUMsQ0FBQztJQUFDLENBQUM7SUFDekUsdUNBQUM7QUFBRCxDQUFDLEFBRkQsQ0FBc0QsaUNBQWlDLEdBRXRGO0FBRlksd0NBQWdDLG1DQUU1QyxDQUFBO0FBRUQ7SUFBbUQsaURBQWlDO0lBQ2xGLHVDQUFZLEtBQXdDO1FBQXhDLHFCQUF3QyxHQUF4QyxZQUF3QztRQUFJLGtCQUFNLEtBQUssQ0FBQyxDQUFDO0lBQUMsQ0FBQztJQUN6RSxvQ0FBQztBQUFELENBQUMsQUFGRCxDQUFtRCxpQ0FBaUMsR0FFbkY7QUFGWSxxQ0FBNkIsZ0NBRXpDLENBQUE7QUFFRDtJQVFFLG1DQUNJLEVBQ3lGO1lBRHpGLDRCQUN5RixFQUR4RixvQkFBTyxFQUFFLGNBQUksRUFBRSx3QkFBUyxFQUFFLGtCQUFNLEVBQUUsZ0JBQUs7UUFIcEMsbUJBQWMsR0FBUSxTQUFTLENBQUM7UUFLdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVELHNCQUFJLGlEQUFVO2FBQWQsY0FBOEMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTVELHNCQUFJLHNEQUFlO2FBQW5CLGNBQTZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTlELHNCQUFJLG9EQUFhO2FBQWpCO1lBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxnQkFBUyxDQUFDLDJCQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6RSxJQUFJLEdBQUcsR0FBRyx3QkFBUyxDQUFDLFNBQVMsQ0FBQyxFQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztvQkFDL0UsSUFBSSxDQUFDLGNBQWMsR0FBTSxJQUFJLENBQUMsSUFBSSxTQUFJLEdBQUssQ0FBQztnQkFDOUMsQ0FBQztnQkFBQyxJQUFJLENBQUMsQ0FBQztvQkFDTixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDN0IsQ0FBQztZQUNILENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVELDRDQUFRLEdBQVIsVUFBUyxHQUE4QjtRQUNyQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzlCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsTUFBTSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLGVBQWUsQ0FBQztZQUMvQyxDQUFDLGdCQUFTLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQUFDLEFBeENELElBd0NDO0FBeENZLGlDQUF5Qiw0QkF3Q3JDLENBQUE7QUFFRDtJQVlFLHFDQUNJLEVBWU07WUFaTiw0QkFZTSxFQVpMLDRCQUFXLEVBQUUsa0JBQU0sRUFBRSxrQkFBTSxFQUFFLDBCQUFVLEVBQUUsMEJBQVUsRUFBRSxvQkFBTyxFQUFFLGdCQUFLLEVBQUUsd0JBQVMsRUFBRSxnQkFBSyxFQUNyRixnQkFBSztRQVlSLElBQUksQ0FBQyxXQUFXLEdBQUcsb0JBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLG9CQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsb0JBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsVUFBVSxHQUFHLG9CQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxvQkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFDSCxrQ0FBQztBQUFELENBQUMsQUFyQ0QsSUFxQ0M7QUFyQ1ksbUNBQTJCLDhCQXFDdkMsQ0FBQTtBQUVEO0lBU0UsaUNBQVksRUFRWDtZQVJZLGdCQUFLLEVBQUUsc0JBQVEsRUFBRSxzQkFBUSxFQUFFLDRCQUFXLEVBQUUsMEJBQVUsRUFBRSxjQUFJLEVBQUUsZ0JBQUs7UUFTMUUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsSUFBSSxDQUFDLElBQUksR0FBRyxxQkFBYyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0gsOEJBQUM7QUFBRCxDQUFDLEFBMUJELElBMEJDO0FBMUJZLCtCQUF1QiwwQkEwQm5DLENBQUE7QUFFRDtJQUE0QywwQ0FBeUI7SUFHbkUsZ0NBQVksRUFPWDtZQVBZLG9CQUFPLEVBQUUsY0FBSSxFQUFFLHdCQUFTLEVBQUUsa0JBQU0sRUFBRSxrQkFBTSxFQUFFLGdCQUFLO1FBUTFELGtCQUFNLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0gsNkJBQUM7QUFBRCxDQUFDLEFBZEQsQ0FBNEMseUJBQXlCLEdBY3BFO0FBZFksOEJBQXNCLHlCQWNsQyxDQUFBO0FBRUQ7SUFLRSw4QkFDSSxFQUN5RjtZQUR4RixnQkFBSyxFQUFFLDBCQUFVLEVBQUUsOENBQW9CO1FBRTFDLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxvQkFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVELHNCQUFJLGlEQUFlO2FBQW5CO1lBQ0UsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7WUFDekMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3BCLENBQUM7UUFDSCxDQUFDOzs7T0FBQTtJQUVELHNCQUFJLCtDQUFhO2FBQWpCO1lBQ0UsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDdkMsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3BCLENBQUM7UUFDSCxDQUFDOzs7T0FBQTtJQUVELHVDQUFRLEdBQVIsVUFBUyxNQUE0QjtRQUNuQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzlCLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7UUFDNUIsTUFBTSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksTUFBTSxDQUFDLGVBQWUsQ0FBQztZQUNsRCxDQUFDLGdCQUFTLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsc0JBQUksc0NBQUk7YUFBUjtZQUNFLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyx5QkFBa0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDdkYsQ0FBQzs7O09BQUE7SUFDSCwyQkFBQztBQUFELENBQUMsQUF2Q0QsSUF1Q0M7QUF2Q1ksNEJBQW9CLHVCQXVDaEMsQ0FBQTtBQUVEOzs7Ozs7O0dBT0c7QUFDSDtJQUFBO1FBQ1UsY0FBUyxHQUFHLElBQUksR0FBRyxFQUFjLENBQUM7UUFDbEMsWUFBTyxHQUFZLEVBQUUsQ0FBQztRQUN0QixZQUFPLEdBQVUsRUFBRSxDQUFDO0lBa0M5QixDQUFDO0lBaENDLGtDQUFHLEdBQUgsVUFBSSxLQUFVLEVBQUUsS0FBWTtRQUMxQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLE1BQU0sSUFBSSwwQkFBYSxDQUNuQix3REFBc0QsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFNLENBQUMsQ0FBQztRQUNyRixDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLGVBQWUsQ0FBQztRQUMvQixFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEMsQ0FBQztRQUNELElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDN0IsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDO0lBQ0Qsa0NBQUcsR0FBSCxVQUFJLEtBQVU7UUFDWixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDO1FBQy9CLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUM7UUFDN0IsSUFBSSxNQUFhLENBQUM7UUFDbEIsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFDRCxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsTUFBTSxDQUFDLElBQUksZ0JBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7UUFDRCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxtQ0FBSSxHQUFKLGNBQWdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUN0QyxxQ0FBTSxHQUFOLGNBQW9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUMxQyxzQkFBSSxzQ0FBSTthQUFSLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ3BELDJCQUFDO0FBQUQsQ0FBQyxBQXJDRCxJQXFDQztBQXJDWSw0QkFBb0IsdUJBcUNoQyxDQUFBO0FBRUQ7O0dBRUc7QUFDSDtJQUF5Qyx1Q0FBeUI7SUFJaEUsNkJBQVksRUFRTjtZQVJNLDRCQVFOLEVBUk8sb0JBQU8sRUFBRSxjQUFJLEVBQUUsd0JBQVMsRUFBRSxrQkFBTSxFQUFFLGtCQUFNLEVBQUUsZ0JBQUssRUFBRSxrQkFBTTtRQVNsRSxrQkFBTSxFQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLElBQUksQ0FBQyxNQUFNLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFqQkQsQ0FBeUMseUJBQXlCLEdBaUJqRTtBQWpCWSwyQkFBbUIsc0JBaUIvQixDQUFBO0FBRUQ7SUFPRSw4QkFBWSxFQU1OO1lBTk0sNEJBTU4sRUFOTyx3QkFBUyxFQUFFLDRCQUFXLEVBQUUsZ0JBQUssRUFBRSw4QkFBWSxFQUFFLGNBQUk7UUFPNUQsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxvQkFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxLQUFLLEdBQUcsb0JBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztRQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNuQixDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDO0FBcEJZLDRCQUFvQix1QkFvQmhDLENBQUE7QUFFRDs7R0FFRztBQUNIO0lBSUUsbUNBQ0ksRUFDK0U7WUFEL0UsNEJBQytFLEVBRDlFLHdCQUFTLEVBQUUsa0JBQU0sRUFDakIsd0JBQVM7UUFDWixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsTUFBTSxHQUFHLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0gsZ0NBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQztBQVhZLGlDQUF5Qiw0QkFXckMsQ0FBQTtBQUVEOztHQUVHO0FBQ0g7SUFVRSxpQ0FDSSxFQVdNO1lBWE4sNEJBV00sRUFYTCxnQ0FBYSxFQUFFLHNCQUFRLEVBQUUsNEJBQVcsRUFBRSxrQkFBTSxFQUFFLHdCQUFTLEVBQUUsNENBQW1CLEVBQUUsMEJBQVUsRUFDeEYsMENBQWtCLEVBQUUsZ0NBQWE7UUFXcEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyx3QkFBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDL0UsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGdCQUFTLENBQUMsa0JBQWtCLENBQUMsR0FBRyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDbEYsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxhQUFhLENBQUMsSUFBSSxhQUFhLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUQsTUFBTSxJQUFJLDBCQUFhLENBQUMsd0RBQXdELENBQUMsQ0FBQztRQUNwRixDQUFDO1FBQ0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7SUFDckMsQ0FBQztJQUNILDhCQUFDO0FBQUQsQ0FBQyxBQXBDRCxJQW9DQztBQXBDWSwrQkFBdUIsMEJBb0NuQyxDQUFBO0FBRUQ7O0dBRUc7QUFDSDtJQTJGRSxrQ0FDSSxFQXNCTTtZQXRCTiw0QkFzQk0sRUF0QkwsY0FBSSxFQUFFLDRCQUFXLEVBQUUsc0JBQVEsRUFBRSxzQkFBUSxFQUFFLG9DQUFlLEVBQUUsa0JBQU0sRUFBRSxvQkFBTyxFQUFFLGdDQUFhLEVBQ3RGLGtDQUFjLEVBQUUsa0NBQWMsRUFBRSxrQ0FBYyxFQUFFLHdCQUFTLEVBQUUsZ0NBQWEsRUFBRSxvQkFBTyxFQUNqRiw0QkFBVyxFQUFFLDBCQUFVLEVBQUUsc0JBQVE7UUFxQnBDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO1FBQy9CLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxjQUFjLEdBQUcsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxhQUFhLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFuSU0sK0JBQU0sR0FBYixVQUNJLEVBbUJNO1lBbkJOLDRCQW1CTSxFQW5CTCxjQUFJLEVBQUUsNEJBQVcsRUFBRSxzQkFBUSxFQUFFLHNCQUFRLEVBQUUsb0NBQWUsRUFBRSxrQkFBTSxFQUFFLG9CQUFPLEVBQUUsY0FBSSxFQUM3RSxrQ0FBYyxFQUFFLHdCQUFTLEVBQUUsZ0NBQWEsRUFBRSxvQkFBTyxFQUFFLDRCQUFXLEVBQUUsMEJBQVUsRUFBRSxzQkFBUTtRQW1CdkYsSUFBSSxhQUFhLEdBQTRCLEVBQUUsQ0FBQztRQUNoRCxJQUFJLGNBQWMsR0FBNEIsRUFBRSxDQUFDO1FBQ2pELElBQUksY0FBYyxHQUE0QixFQUFFLENBQUM7UUFDakQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsNkJBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxVQUFDLEtBQWEsRUFBRSxHQUFXO2dCQUN4RCxJQUFJLE9BQU8sR0FBRyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQzFELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLGNBQWMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQzlCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUNyQyxDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFDcEMsQ0FBQztnQkFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7Z0JBQ3JDLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFJLFNBQVMsR0FBNEIsRUFBRSxDQUFDO1FBQzVDLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxVQUFrQjtnQkFDaEMsc0NBQXNDO2dCQUN0QywyQ0FBMkM7Z0JBQzNDLElBQUksS0FBSyxHQUFHLG1CQUFZLENBQUMsVUFBVSxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBQ0QsSUFBSSxVQUFVLEdBQTRCLEVBQUUsQ0FBQztRQUM3QyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsVUFBa0I7Z0JBQ2pDLHNDQUFzQztnQkFDdEMsMkNBQTJDO2dCQUMzQyxJQUFJLEtBQUssR0FBRyxtQkFBWSxDQUFDLFVBQVUsRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLHdCQUF3QixDQUFDO1lBQ2xDLE1BQUEsSUFBSTtZQUNKLFdBQVcsRUFBRSxvQkFBYSxDQUFDLFdBQVcsQ0FBQyxFQUFFLFVBQUEsUUFBUSxFQUFFLFVBQUEsUUFBUSxFQUFFLGlCQUFBLGVBQWU7WUFDNUUsTUFBTSxFQUFFLFNBQVM7WUFDakIsT0FBTyxFQUFFLFVBQVUsRUFBRSxlQUFBLGFBQWEsRUFBRSxnQkFBQSxjQUFjLEVBQUUsZ0JBQUEsY0FBYztZQUNsRSxjQUFjLEVBQUUsZ0JBQVMsQ0FBQyxjQUFjLENBQUMsR0FBRyxjQUFjLEdBQUcsRUFBRTtZQUMvRCxXQUFBLFNBQVM7WUFDVCxlQUFBLGFBQWE7WUFDYixTQUFBLE9BQU87WUFDUCxhQUFBLFdBQVc7WUFDWCxZQUFBLFVBQVU7WUFDVixVQUFBLFFBQVE7U0FDVCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBK0RELHNCQUFJLGdEQUFVO2FBQWQsY0FBOEMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVqRSxzQkFBSSxxREFBZTthQUFuQixjQUE2QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVoRSxzQkFBSSxtREFBYTthQUFqQixjQUEyQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUU1RCwyQ0FBUSxHQUFSLFVBQVMsS0FBb0M7UUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0gsK0JBQUM7QUFBRCxDQUFDLEFBL0lELElBK0lDO0FBL0lZLGdDQUF3QiwyQkErSXBDLENBQUE7QUFFRDs7R0FFRztBQUNILGlDQUF3QyxRQUFrQztJQUV4RSxJQUFJLFFBQVEsR0FBRyxzQkFBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsMEJBQTBCLEVBQUUsQ0FBQztJQUNwRixNQUFNLENBQUMsd0JBQXdCLENBQUMsTUFBTSxDQUFDO1FBQ3JDLElBQUksRUFBRSxJQUFJLG1CQUFtQixDQUFDO1lBQzVCLE9BQU8sRUFBRSxNQUFNO1lBQ2YsSUFBSSxFQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxVQUFPO1lBQ2xDLFNBQVMsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVM7WUFDbEMsTUFBTSxFQUFFLElBQUk7U0FDYixDQUFDO1FBQ0YsUUFBUSxFQUFFLElBQUksdUJBQXVCLENBQUM7WUFDcEMsUUFBUSxFQUFFLFFBQVE7WUFDbEIsV0FBVyxFQUFFLEVBQUU7WUFDZixNQUFNLEVBQUUsRUFBRTtZQUNWLFNBQVMsRUFBRSxFQUFFO1lBQ2Isa0JBQWtCLEVBQUUsRUFBRTtZQUN0QixVQUFVLEVBQUUsRUFBRTtTQUNmLENBQUM7UUFDRixlQUFlLEVBQUUsOEJBQXVCLENBQUMsT0FBTztRQUNoRCxNQUFNLEVBQUUsRUFBRTtRQUNWLE9BQU8sRUFBRSxFQUFFO1FBQ1gsSUFBSSxFQUFFLEVBQUU7UUFDUixjQUFjLEVBQUUsRUFBRTtRQUNsQixXQUFXLEVBQUUsSUFBSTtRQUNqQixRQUFRLEVBQUUsR0FBRztRQUNiLFNBQVMsRUFBRSxFQUFFO1FBQ2IsYUFBYSxFQUFFLEVBQUU7UUFDakIsT0FBTyxFQUFFLEVBQUU7UUFDWCxXQUFXLEVBQUUsRUFBRTtLQUNoQixDQUFDLENBQUM7QUFDTCxDQUFDO0FBOUJlLCtCQUF1QiwwQkE4QnRDLENBQUE7QUFHRDtJQU1FLDZCQUFZLEVBS047WUFMTSw0QkFLTixFQUxPLGNBQUksRUFBRSxjQUFJLEVBQUUsY0FBSSxFQUFFLGtDQUFjO1FBTTNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsb0JBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsY0FBYyxHQUFHLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0Qsc0JBQUksMkNBQVU7YUFBZCxjQUE4QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2pFLHNCQUFJLGdEQUFlO2FBQW5CLGNBQTZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRWhFLHNCQUFJLDhDQUFhO2FBQWpCLGNBQTJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTVELHNDQUFRLEdBQVIsVUFBUyxLQUFvQztRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUF6QkQsSUF5QkM7QUF6QlksMkJBQW1CLHNCQXlCL0IsQ0FBQTtBQUVEOztHQUVHO0FBQ0g7SUFlRSxpQ0FDSSxFQWFNO1lBYk4sNEJBYU0sRUFiTCxjQUFJLEVBQUUsd0JBQVMsRUFBRSwwQ0FBa0IsRUFBRSwwQ0FBa0IsRUFBRSxnQ0FBYSxFQUFFLGdDQUFhLEVBQ3JGLDBCQUFVLEVBQUUsb0NBQWUsRUFBRSxvQ0FBZSxFQUFFLHNDQUFnQjtRQWFqRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsZUFBZSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDOUQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGVBQWUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxhQUFhLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxhQUFhLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztJQUMzQyxDQUFDO0lBRUQsc0JBQUksK0NBQVU7YUFBZCxjQUE4QyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2pFLHNCQUFJLG9EQUFlO2FBQW5CLGNBQTZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRWhFLHNCQUFJLGtEQUFhO2FBQWpCLGNBQTJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTVELDBDQUFRLEdBQVIsVUFBUyxLQUFvQztRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFDSCw4QkFBQztBQUFELENBQUMsQUFsREQsSUFrREM7QUFsRFksK0JBQXVCLDBCQWtEbkMsQ0FBQTtBQUVEO0lBR0UsMkNBQ1csT0FBa0MsRUFBUyxTQUFvQyxFQUMvRSxVQUFpQyxFQUFTLFVBQXNDLEVBQ2hGLEtBQTRCO1FBTnpDLGlCQVVDO1FBTlksWUFBTyxHQUFQLE9BQU8sQ0FBMkI7UUFBUyxjQUFTLEdBQVQsU0FBUyxDQUEyQjtRQUMvRSxlQUFVLEdBQVYsVUFBVSxDQUF1QjtRQUFTLGVBQVUsR0FBVixVQUFVLENBQTRCO1FBQ2hGLFVBQUssR0FBTCxLQUFLLENBQXVCO1FBTHZDLGtCQUFhLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztRQUNoQyxhQUFRLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztRQUt6QixVQUFVLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBeEMsQ0FBd0MsQ0FBQyxDQUFDO1FBQ3BFLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNILHdDQUFDO0FBQUQsQ0FBQyxBQVZELElBVUM7QUFWWSx5Q0FBaUMsb0NBVTdDLENBQUE7QUFFRCxvQ0FBb0YsS0FBVTtJQUU1RixJQUFNLEdBQUcsR0FBRyxJQUFJLG9CQUFvQixFQUFRLENBQUM7SUFDN0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFDLElBQUk7UUFDakIsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN0QixDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3BCLENBQUM7QUFUZSxrQ0FBMEIsNkJBU3pDLENBQUE7QUFFRCx5QkFBeUIsR0FBVTtJQUNqQyxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO0FBQ25DLENBQUM7QUFFRCx3QkFBK0IsS0FBVTtJQUN2QyxNQUFNLENBQUMsa0JBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxnQkFBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLGdCQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDeEYsQ0FBQztBQUZlLHNCQUFjLGlCQUU3QixDQUFBIn0=