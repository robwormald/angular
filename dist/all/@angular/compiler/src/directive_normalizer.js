/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var collection_1 = require('../src/facade/collection');
var exceptions_1 = require('../src/facade/exceptions');
var lang_1 = require('../src/facade/lang');
var compile_metadata_1 = require('./compile_metadata');
var config_1 = require('./config');
var html_ast_1 = require('./html_ast');
var html_parser_1 = require('./html_parser');
var interpolation_config_1 = require('./interpolation_config');
var style_url_resolver_1 = require('./style_url_resolver');
var template_preparser_1 = require('./template_preparser');
var url_resolver_1 = require('./url_resolver');
var util_1 = require('./util');
var xhr_1 = require('./xhr');
var DirectiveNormalizer = (function () {
    function DirectiveNormalizer(_xhr, _urlResolver, _htmlParser, _config) {
        this._xhr = _xhr;
        this._urlResolver = _urlResolver;
        this._htmlParser = _htmlParser;
        this._config = _config;
        this._xhrCache = new Map();
    }
    DirectiveNormalizer.prototype.clearCache = function () { this._xhrCache.clear(); };
    DirectiveNormalizer.prototype.clearCacheFor = function (normalizedDirective) {
        var _this = this;
        if (!normalizedDirective.isComponent) {
            return;
        }
        this._xhrCache.delete(normalizedDirective.template.templateUrl);
        normalizedDirective.template.externalStylesheets.forEach(function (stylesheet) { _this._xhrCache.delete(stylesheet.moduleUrl); });
    };
    DirectiveNormalizer.prototype._fetch = function (url) {
        var result = this._xhrCache.get(url);
        if (!result) {
            result = this._xhr.get(url);
            this._xhrCache.set(url, result);
        }
        return result;
    };
    DirectiveNormalizer.prototype.normalizeDirective = function (directive) {
        var _this = this;
        if (!directive.isComponent) {
            // For non components there is nothing to be normalized yet.
            return new util_1.SyncAsyncResult(directive, Promise.resolve(directive));
        }
        var normalizedTemplateSync = null;
        var normalizedTemplateAsync;
        if (lang_1.isPresent(directive.template.template)) {
            normalizedTemplateSync = this.normalizeTemplateSync(directive.type, directive.template);
            normalizedTemplateAsync = Promise.resolve(normalizedTemplateSync);
        }
        else if (directive.template.templateUrl) {
            normalizedTemplateAsync = this.normalizeTemplateAsync(directive.type, directive.template);
        }
        else {
            throw new exceptions_1.BaseException("No template specified for component " + directive.type.name);
        }
        if (normalizedTemplateSync && normalizedTemplateSync.styleUrls.length === 0) {
            // sync case
            var normalizedDirective = _cloneDirectiveWithTemplate(directive, normalizedTemplateSync);
            return new util_1.SyncAsyncResult(normalizedDirective, Promise.resolve(normalizedDirective));
        }
        else {
            // async case
            return new util_1.SyncAsyncResult(null, normalizedTemplateAsync
                .then(function (normalizedTemplate) { return _this.normalizeExternalStylesheets(normalizedTemplate); })
                .then(function (normalizedTemplate) {
                return _cloneDirectiveWithTemplate(directive, normalizedTemplate);
            }));
        }
    };
    DirectiveNormalizer.prototype.normalizeTemplateSync = function (directiveType, template) {
        return this.normalizeLoadedTemplate(directiveType, template, template.template, directiveType.moduleUrl);
    };
    DirectiveNormalizer.prototype.normalizeTemplateAsync = function (directiveType, template) {
        var _this = this;
        var templateUrl = this._urlResolver.resolve(directiveType.moduleUrl, template.templateUrl);
        return this._fetch(templateUrl)
            .then(function (value) { return _this.normalizeLoadedTemplate(directiveType, template, value, templateUrl); });
    };
    DirectiveNormalizer.prototype.normalizeLoadedTemplate = function (directiveType, templateMeta, template, templateAbsUrl) {
        var interpolationConfig = interpolation_config_1.InterpolationConfig.fromArray(templateMeta.interpolation);
        var rootNodesAndErrors = this._htmlParser.parse(template, directiveType.name, false, interpolationConfig);
        if (rootNodesAndErrors.errors.length > 0) {
            var errorString = rootNodesAndErrors.errors.join('\n');
            throw new exceptions_1.BaseException("Template parse errors:\n" + errorString);
        }
        var templateMetadataStyles = this.normalizeStylesheet(new compile_metadata_1.CompileStylesheetMetadata({
            styles: templateMeta.styles,
            styleUrls: templateMeta.styleUrls,
            moduleUrl: directiveType.moduleUrl
        }));
        var visitor = new TemplatePreparseVisitor();
        html_ast_1.htmlVisitAll(visitor, rootNodesAndErrors.rootNodes);
        var templateStyles = this.normalizeStylesheet(new compile_metadata_1.CompileStylesheetMetadata({ styles: visitor.styles, styleUrls: visitor.styleUrls, moduleUrl: templateAbsUrl }));
        var allStyles = templateMetadataStyles.styles.concat(templateStyles.styles);
        var allStyleUrls = templateMetadataStyles.styleUrls.concat(templateStyles.styleUrls);
        var encapsulation = templateMeta.encapsulation;
        if (lang_1.isBlank(encapsulation)) {
            encapsulation = this._config.defaultEncapsulation;
        }
        if (encapsulation === core_1.ViewEncapsulation.Emulated && allStyles.length === 0 &&
            allStyleUrls.length === 0) {
            encapsulation = core_1.ViewEncapsulation.None;
        }
        return new compile_metadata_1.CompileTemplateMetadata({
            encapsulation: encapsulation,
            template: template,
            templateUrl: templateAbsUrl,
            styles: allStyles,
            styleUrls: allStyleUrls,
            externalStylesheets: templateMeta.externalStylesheets,
            ngContentSelectors: visitor.ngContentSelectors,
            animations: templateMeta.animations,
            interpolation: templateMeta.interpolation
        });
    };
    DirectiveNormalizer.prototype.normalizeExternalStylesheets = function (templateMeta) {
        return this._loadMissingExternalStylesheets(templateMeta.styleUrls)
            .then(function (externalStylesheets) { return new compile_metadata_1.CompileTemplateMetadata({
            encapsulation: templateMeta.encapsulation,
            template: templateMeta.template,
            templateUrl: templateMeta.templateUrl,
            styles: templateMeta.styles,
            styleUrls: templateMeta.styleUrls,
            externalStylesheets: externalStylesheets,
            ngContentSelectors: templateMeta.ngContentSelectors,
            animations: templateMeta.animations,
            interpolation: templateMeta.interpolation
        }); });
    };
    DirectiveNormalizer.prototype._loadMissingExternalStylesheets = function (styleUrls, loadedStylesheets) {
        var _this = this;
        if (loadedStylesheets === void 0) { loadedStylesheets = new Map(); }
        return Promise
            .all(styleUrls.filter(function (styleUrl) { return !loadedStylesheets.has(styleUrl); })
            .map(function (styleUrl) { return _this._fetch(styleUrl).then(function (loadedStyle) {
            var stylesheet = _this.normalizeStylesheet(new compile_metadata_1.CompileStylesheetMetadata({ styles: [loadedStyle], moduleUrl: styleUrl }));
            loadedStylesheets.set(styleUrl, stylesheet);
            return _this._loadMissingExternalStylesheets(stylesheet.styleUrls, loadedStylesheets);
        }); }))
            .then(function (_) { return collection_1.MapWrapper.values(loadedStylesheets); });
    };
    DirectiveNormalizer.prototype.normalizeStylesheet = function (stylesheet) {
        var _this = this;
        var allStyleUrls = stylesheet.styleUrls.filter(style_url_resolver_1.isStyleUrlResolvable)
            .map(function (url) { return _this._urlResolver.resolve(stylesheet.moduleUrl, url); });
        var allStyles = stylesheet.styles.map(function (style) {
            var styleWithImports = style_url_resolver_1.extractStyleUrls(_this._urlResolver, stylesheet.moduleUrl, style);
            allStyleUrls.push.apply(allStyleUrls, styleWithImports.styleUrls);
            return styleWithImports.style;
        });
        return new compile_metadata_1.CompileStylesheetMetadata({ styles: allStyles, styleUrls: allStyleUrls, moduleUrl: stylesheet.moduleUrl });
    };
    /** @nocollapse */
    DirectiveNormalizer.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DirectiveNormalizer.ctorParameters = [
        { type: xhr_1.XHR, },
        { type: url_resolver_1.UrlResolver, },
        { type: html_parser_1.HtmlParser, },
        { type: config_1.CompilerConfig, },
    ];
    return DirectiveNormalizer;
}());
exports.DirectiveNormalizer = DirectiveNormalizer;
var TemplatePreparseVisitor = (function () {
    function TemplatePreparseVisitor() {
        this.ngContentSelectors = [];
        this.styles = [];
        this.styleUrls = [];
        this.ngNonBindableStackCount = 0;
    }
    TemplatePreparseVisitor.prototype.visitElement = function (ast, context) {
        var preparsedElement = template_preparser_1.preparseElement(ast);
        switch (preparsedElement.type) {
            case template_preparser_1.PreparsedElementType.NG_CONTENT:
                if (this.ngNonBindableStackCount === 0) {
                    this.ngContentSelectors.push(preparsedElement.selectAttr);
                }
                break;
            case template_preparser_1.PreparsedElementType.STYLE:
                var textContent = '';
                ast.children.forEach(function (child) {
                    if (child instanceof html_ast_1.HtmlTextAst) {
                        textContent += child.value;
                    }
                });
                this.styles.push(textContent);
                break;
            case template_preparser_1.PreparsedElementType.STYLESHEET:
                this.styleUrls.push(preparsedElement.hrefAttr);
                break;
            default:
                // DDC reports this as error. See:
                // https://github.com/dart-lang/dev_compiler/issues/428
                break;
        }
        if (preparsedElement.nonBindable) {
            this.ngNonBindableStackCount++;
        }
        html_ast_1.htmlVisitAll(this, ast.children);
        if (preparsedElement.nonBindable) {
            this.ngNonBindableStackCount--;
        }
        return null;
    };
    TemplatePreparseVisitor.prototype.visitComment = function (ast, context) { return null; };
    TemplatePreparseVisitor.prototype.visitAttr = function (ast, context) { return null; };
    TemplatePreparseVisitor.prototype.visitText = function (ast, context) { return null; };
    TemplatePreparseVisitor.prototype.visitExpansion = function (ast, context) { return null; };
    TemplatePreparseVisitor.prototype.visitExpansionCase = function (ast, context) { return null; };
    return TemplatePreparseVisitor;
}());
function _cloneDirectiveWithTemplate(directive, template) {
    return new compile_metadata_1.CompileDirectiveMetadata({
        type: directive.type,
        isComponent: directive.isComponent,
        selector: directive.selector,
        exportAs: directive.exportAs,
        changeDetection: directive.changeDetection,
        inputs: directive.inputs,
        outputs: directive.outputs,
        hostListeners: directive.hostListeners,
        hostProperties: directive.hostProperties,
        hostAttributes: directive.hostAttributes,
        lifecycleHooks: directive.lifecycleHooks,
        providers: directive.providers,
        viewProviders: directive.viewProviders,
        queries: directive.queries,
        viewQueries: directive.viewQueries,
        precompile: directive.precompile,
        template: template
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX25vcm1hbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9kaXJlY3RpdmVfbm9ybWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQTRDLGVBQWUsQ0FBQyxDQUFBO0FBQzVELDJCQUF5QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3BELDJCQUE0QiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ3ZELHFCQUFpQyxvQkFBb0IsQ0FBQyxDQUFBO0FBQ3RELGlDQUFnSCxvQkFBb0IsQ0FBQyxDQUFBO0FBQ3JJLHVCQUE2QixVQUFVLENBQUMsQ0FBQTtBQUN4Qyx5QkFBNkksWUFBWSxDQUFDLENBQUE7QUFDMUosNEJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBQ3pDLHFDQUFrQyx3QkFBd0IsQ0FBQyxDQUFBO0FBQzNELG1DQUFxRCxzQkFBc0IsQ0FBQyxDQUFBO0FBQzVFLG1DQUFvRCxzQkFBc0IsQ0FBQyxDQUFBO0FBQzNFLDZCQUEwQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQzNDLHFCQUE4QixRQUFRLENBQUMsQ0FBQTtBQUN2QyxvQkFBa0IsT0FBTyxDQUFDLENBQUE7QUFDMUI7SUFHRSw2QkFDWSxJQUFTLEVBQVUsWUFBeUIsRUFBVSxXQUF1QixFQUM3RSxPQUF1QjtRQUR2QixTQUFJLEdBQUosSUFBSSxDQUFLO1FBQVUsaUJBQVksR0FBWixZQUFZLENBQWE7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUM3RSxZQUFPLEdBQVAsT0FBTyxDQUFnQjtRQUozQixjQUFTLEdBQUcsSUFBSSxHQUFHLEVBQTJCLENBQUM7SUFJakIsQ0FBQztJQUV2Qyx3Q0FBVSxHQUFWLGNBQWUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFeEMsMkNBQWEsR0FBYixVQUFjLG1CQUE2QztRQUEz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