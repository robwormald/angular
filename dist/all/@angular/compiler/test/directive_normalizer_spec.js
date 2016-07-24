/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var compile_metadata_1 = require('@angular/compiler/src/compile_metadata');
var config_1 = require('@angular/compiler/src/config');
var directive_normalizer_1 = require('@angular/compiler/src/directive_normalizer');
var xhr_1 = require('@angular/compiler/src/xhr');
var view_1 = require('@angular/core/src/metadata/view');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var spies_1 = require('./spies');
var test_bindings_1 = require('./test_bindings');
function main() {
    testing_internal_1.describe('DirectiveNormalizer', function () {
        var dirType;
        var dirTypeWithHttpUrl;
        testing_internal_1.beforeEach(function () { testing_1.configureCompiler({ providers: test_bindings_1.TEST_COMPILER_PROVIDERS }); });
        testing_internal_1.beforeEach(function () {
            dirType = new compile_metadata_1.CompileTypeMetadata({ moduleUrl: 'package:some/module/a.js', name: 'SomeComp' });
            dirTypeWithHttpUrl =
                new compile_metadata_1.CompileTypeMetadata({ moduleUrl: 'http://some/module/a.js', name: 'SomeComp' });
        });
        testing_internal_1.describe('normalizeDirective', function () {
            testing_internal_1.it('should throw if no template was specified', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                testing_internal_1.expect(function () { return normalizer.normalizeDirective(new compile_metadata_1.CompileDirectiveMetadata({
                    type: dirType,
                    isComponent: true,
                    template: new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] })
                })); }).toThrowError('No template specified for component SomeComp');
            }));
        });
        testing_internal_1.describe('normalizeTemplateSync', function () {
            testing_internal_1.it('should store the template', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeTemplateSync(dirType, new compile_metadata_1.CompileTemplateMetadata({
                    encapsulation: null,
                    template: 'a',
                    templateUrl: null,
                    styles: [],
                    styleUrls: []
                }));
                testing_internal_1.expect(template.template).toEqual('a');
                testing_internal_1.expect(template.templateUrl).toEqual('package:some/module/a.js');
            }));
            testing_internal_1.it('should resolve styles on the annotation against the moduleUrl', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeTemplateSync(dirType, new compile_metadata_1.CompileTemplateMetadata({
                    encapsulation: null,
                    template: '',
                    templateUrl: null,
                    styles: [],
                    styleUrls: ['test.css']
                }));
                testing_internal_1.expect(template.styleUrls).toEqual(['package:some/module/test.css']);
            }));
            testing_internal_1.it('should resolve styles in the template against the moduleUrl', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeTemplateSync(dirType, new compile_metadata_1.CompileTemplateMetadata({
                    encapsulation: null,
                    template: '<style>@import test.css</style>',
                    templateUrl: null,
                    styles: [],
                    styleUrls: []
                }));
                testing_internal_1.expect(template.styleUrls).toEqual(['package:some/module/test.css']);
            }));
            testing_internal_1.it('should use ViewEncapsulation.Emulated by default', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeTemplateSync(dirType, new compile_metadata_1.CompileTemplateMetadata({
                    encapsulation: null,
                    template: '',
                    templateUrl: null,
                    styles: [],
                    styleUrls: ['test.css']
                }));
                testing_internal_1.expect(template.encapsulation).toEqual(view_1.ViewEncapsulation.Emulated);
            }));
            testing_internal_1.it('should use default encapsulation provided by CompilerConfig', testing_internal_1.inject([config_1.CompilerConfig, directive_normalizer_1.DirectiveNormalizer], function (config, normalizer) {
                config.defaultEncapsulation = view_1.ViewEncapsulation.None;
                var template = normalizer.normalizeTemplateSync(dirType, new compile_metadata_1.CompileTemplateMetadata({
                    encapsulation: null,
                    template: '',
                    templateUrl: null,
                    styles: [],
                    styleUrls: ['test.css']
                }));
                testing_internal_1.expect(template.encapsulation).toEqual(view_1.ViewEncapsulation.None);
            }));
        });
        testing_internal_1.describe('templateUrl', function () {
            testing_internal_1.it('should load a template from a url that is resolved against moduleUrl', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, directive_normalizer_1.DirectiveNormalizer, xhr_1.XHR], function (async, normalizer, xhr) {
                xhr.expect('package:some/module/sometplurl.html', 'a');
                normalizer
                    .normalizeTemplateAsync(dirType, new compile_metadata_1.CompileTemplateMetadata({
                    encapsulation: null,
                    template: null,
                    templateUrl: 'sometplurl.html',
                    styles: [],
                    styleUrls: ['test.css']
                }))
                    .then(function (template) {
                    testing_internal_1.expect(template.template).toEqual('a');
                    testing_internal_1.expect(template.templateUrl).toEqual('package:some/module/sometplurl.html');
                    async.done();
                });
                xhr.flush();
            }));
            testing_internal_1.it('should resolve styles on the annotation against the moduleUrl', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, directive_normalizer_1.DirectiveNormalizer, xhr_1.XHR], function (async, normalizer, xhr) {
                xhr.expect('package:some/module/tpl/sometplurl.html', '');
                normalizer
                    .normalizeTemplateAsync(dirType, new compile_metadata_1.CompileTemplateMetadata({
                    encapsulation: null,
                    template: null,
                    templateUrl: 'tpl/sometplurl.html',
                    styles: [],
                    styleUrls: ['test.css']
                }))
                    .then(function (template) {
                    testing_internal_1.expect(template.styleUrls).toEqual(['package:some/module/test.css']);
                    async.done();
                });
                xhr.flush();
            }));
            testing_internal_1.it('should resolve styles in the template against the templateUrl', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, directive_normalizer_1.DirectiveNormalizer, xhr_1.XHR], function (async, normalizer, xhr) {
                xhr.expect('package:some/module/tpl/sometplurl.html', '<style>@import test.css</style>');
                normalizer
                    .normalizeTemplateAsync(dirType, new compile_metadata_1.CompileTemplateMetadata({
                    encapsulation: null,
                    template: null,
                    templateUrl: 'tpl/sometplurl.html',
                    styles: [],
                    styleUrls: []
                }))
                    .then(function (template) {
                    testing_internal_1.expect(template.styleUrls).toEqual(['package:some/module/tpl/test.css']);
                    async.done();
                });
                xhr.flush();
            }));
        });
        testing_internal_1.describe('normalizeExternalStylesheets', function () {
            testing_internal_1.beforeEach(function () { testing_1.configureCompiler({ providers: [{ provide: xhr_1.XHR, useClass: spies_1.SpyXHR }] }); });
            testing_internal_1.it('should load an external stylesheet', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, directive_normalizer_1.DirectiveNormalizer, xhr_1.XHR], function (async, normalizer, xhr) {
                programXhrSpy(xhr, { 'package:some/module/test.css': 'a' });
                normalizer
                    .normalizeExternalStylesheets(new compile_metadata_1.CompileTemplateMetadata({
                    template: '',
                    templateUrl: '',
                    styleUrls: ['package:some/module/test.css']
                }))
                    .then(function (template) {
                    testing_internal_1.expect(template.externalStylesheets.length).toBe(1);
                    testing_internal_1.expect(template.externalStylesheets[0]).toEqual(new compile_metadata_1.CompileStylesheetMetadata({
                        moduleUrl: 'package:some/module/test.css',
                        styles: ['a'],
                        styleUrls: []
                    }));
                    async.done();
                });
            }));
            testing_internal_1.it('should load stylesheets referenced by external stylesheets', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, directive_normalizer_1.DirectiveNormalizer, xhr_1.XHR], function (async, normalizer, xhr) {
                programXhrSpy(xhr, {
                    'package:some/module/test.css': 'a@import "test2.css"',
                    'package:some/module/test2.css': 'b'
                });
                normalizer
                    .normalizeExternalStylesheets(new compile_metadata_1.CompileTemplateMetadata({
                    template: '',
                    templateUrl: '',
                    styleUrls: ['package:some/module/test.css']
                }))
                    .then(function (template) {
                    testing_internal_1.expect(template.externalStylesheets.length).toBe(2);
                    testing_internal_1.expect(template.externalStylesheets[0]).toEqual(new compile_metadata_1.CompileStylesheetMetadata({
                        moduleUrl: 'package:some/module/test.css',
                        styles: ['a'],
                        styleUrls: ['package:some/module/test2.css']
                    }));
                    testing_internal_1.expect(template.externalStylesheets[1]).toEqual(new compile_metadata_1.CompileStylesheetMetadata({
                        moduleUrl: 'package:some/module/test2.css',
                        styles: ['b'],
                        styleUrls: []
                    }));
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('caching', function () {
            testing_internal_1.it('should work for templateUrl', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, directive_normalizer_1.DirectiveNormalizer, xhr_1.XHR], function (async, normalizer, xhr) {
                xhr.expect('package:some/module/cmp.html', 'a');
                var templateMeta = new compile_metadata_1.CompileTemplateMetadata({
                    templateUrl: 'cmp.html',
                });
                Promise
                    .all([
                    normalizer.normalizeTemplateAsync(dirType, templateMeta),
                    normalizer.normalizeTemplateAsync(dirType, templateMeta)
                ])
                    .then(function (templates) {
                    testing_internal_1.expect(templates[0].template).toEqual('a');
                    testing_internal_1.expect(templates[1].template).toEqual('a');
                    async.done();
                });
                xhr.flush();
            }));
        });
        testing_internal_1.describe('normalizeLoadedTemplate', function () {
            testing_internal_1.it('should store the viewEncapsulationin the result', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var viewEncapsulation = view_1.ViewEncapsulation.Native;
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: viewEncapsulation, styles: [], styleUrls: [] }), '', 'package:some/module/');
                testing_internal_1.expect(template.encapsulation).toBe(viewEncapsulation);
            }));
            testing_internal_1.it('should keep the template as html', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), 'a', 'package:some/module/');
                testing_internal_1.expect(template.template).toEqual('a');
            }));
            testing_internal_1.it('should collect ngContent', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<ng-content select="a"></ng-content>', 'package:some/module/');
                testing_internal_1.expect(template.ngContentSelectors).toEqual(['a']);
            }));
            testing_internal_1.it('should normalize ngContent wildcard selector', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<ng-content></ng-content><ng-content select></ng-content><ng-content select="*"></ng-content>', 'package:some/module/');
                testing_internal_1.expect(template.ngContentSelectors).toEqual(['*', '*', '*']);
            }));
            testing_internal_1.it('should collect top level styles in the template', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<style>a</style>', 'package:some/module/');
                testing_internal_1.expect(template.styles).toEqual(['a']);
            }));
            testing_internal_1.it('should collect styles inside in elements', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<div><style>a</style></div>', 'package:some/module/');
                testing_internal_1.expect(template.styles).toEqual(['a']);
            }));
            testing_internal_1.it('should collect styleUrls in the template', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<link rel="stylesheet" href="aUrl">', 'package:some/module/');
                testing_internal_1.expect(template.styleUrls).toEqual(['package:some/module/aUrl']);
            }));
            testing_internal_1.it('should collect styleUrls in elements', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<div><link rel="stylesheet" href="aUrl"></div>', 'package:some/module/');
                testing_internal_1.expect(template.styleUrls).toEqual(['package:some/module/aUrl']);
            }));
            testing_internal_1.it('should ignore link elements with non stylesheet rel attribute', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<link href="b" rel="a">', 'package:some/module/');
                testing_internal_1.expect(template.styleUrls).toEqual([]);
            }));
            testing_internal_1.it('should ignore link elements with absolute urls but non package: scheme', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<link href="http://some/external.css" rel="stylesheet">', 'package:some/module/');
                testing_internal_1.expect(template.styleUrls).toEqual([]);
            }));
            testing_internal_1.it('should extract @import style urls into styleAbsUrl', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: ['@import "test.css";'], styleUrls: [] }), '', 'package:some/module/id');
                testing_internal_1.expect(template.styles).toEqual(['']);
                testing_internal_1.expect(template.styleUrls).toEqual(['package:some/module/test.css']);
            }));
            testing_internal_1.it('should not resolve relative urls in inline styles', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({
                    encapsulation: null,
                    styles: ['.foo{background-image: url(\'double.jpg\');'],
                    styleUrls: []
                }), '', 'package:some/module/id');
                testing_internal_1.expect(template.styles).toEqual(['.foo{background-image: url(\'double.jpg\');']);
            }));
            testing_internal_1.it('should resolve relative style urls in styleUrls', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: ['test.css'] }), '', 'package:some/module/id');
                testing_internal_1.expect(template.styles).toEqual([]);
                testing_internal_1.expect(template.styleUrls).toEqual(['package:some/module/test.css']);
            }));
            testing_internal_1.it('should resolve relative style urls in styleUrls with http directive url', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirTypeWithHttpUrl, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: ['test.css'] }), '', 'http://some/module/id');
                testing_internal_1.expect(template.styles).toEqual([]);
                testing_internal_1.expect(template.styleUrls).toEqual(['http://some/module/test.css']);
            }));
            testing_internal_1.it('should normalize ViewEncapsulation.Emulated to ViewEncapsulation.None if there are no styles nor stylesheets', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: view_1.ViewEncapsulation.Emulated, styles: [], styleUrls: [] }), '', 'package:some/module/id');
                testing_internal_1.expect(template.encapsulation).toEqual(view_1.ViewEncapsulation.None);
            }));
            testing_internal_1.it('should ignore ng-content in elements with ngNonBindable', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<div ngNonBindable><ng-content select="a"></ng-content></div>', 'package:some/module/');
                testing_internal_1.expect(template.ngContentSelectors).toEqual([]);
            }));
            testing_internal_1.it('should still collect <style> in elements with ngNonBindable', testing_internal_1.inject([directive_normalizer_1.DirectiveNormalizer], function (normalizer) {
                var template = normalizer.normalizeLoadedTemplate(dirType, new compile_metadata_1.CompileTemplateMetadata({ encapsulation: null, styles: [], styleUrls: [] }), '<div ngNonBindable><style>div {color:red}</style></div>', 'package:some/module/');
                testing_internal_1.expect(template.styles).toEqual(['div {color:red}']);
            }));
        });
    });
}
exports.main = main;
function programXhrSpy(spy, results) {
    spy.spy('get').andCallFake(function (url) {
        var result = results[url];
        if (result) {
            return Promise.resolve(result);
        }
        else {
            return Promise.reject("Unknown mock url " + url);
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX25vcm1hbGl6ZXJfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdC9kaXJlY3RpdmVfbm9ybWFsaXplcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBZ0gsd0NBQXdDLENBQUMsQ0FBQTtBQUN6Six1QkFBNkIsOEJBQThCLENBQUMsQ0FBQTtBQUM1RCxxQ0FBa0MsNENBQTRDLENBQUMsQ0FBQTtBQUMvRSxvQkFBa0IsMkJBQTJCLENBQUMsQ0FBQTtBQUU5QyxxQkFBZ0MsaUNBQWlDLENBQUMsQ0FBQTtBQUNsRSx3QkFBZ0MsdUJBQXVCLENBQUMsQ0FBQTtBQUN4RCxpQ0FBcUgsd0NBQXdDLENBQUMsQ0FBQTtBQUU5SixzQkFBcUIsU0FBUyxDQUFDLENBQUE7QUFDL0IsOEJBQXNDLGlCQUFpQixDQUFDLENBQUE7QUFFeEQ7SUFDRSwyQkFBUSxDQUFDLHFCQUFxQixFQUFFO1FBQzlCLElBQUksT0FBNEIsQ0FBQztRQUNqQyxJQUFJLGtCQUF1QyxDQUFDO1FBRTVDLDZCQUFVLENBQUMsY0FBUSwyQkFBaUIsQ0FBQyxFQUFDLFNBQVMsRUFBRSx1Q0FBdUIsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvRSw2QkFBVSxDQUFDO1lBQ1QsT0FBTyxHQUFHLElBQUksc0NBQW1CLENBQUMsRUFBQyxTQUFTLEVBQUUsMEJBQTBCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7WUFDN0Ysa0JBQWtCO2dCQUNkLElBQUksc0NBQW1CLENBQUMsRUFBQyxTQUFTLEVBQUUseUJBQXlCLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBQyxDQUFDLENBQUM7UUFDeEYsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBUSxDQUFDLG9CQUFvQixFQUFFO1lBQzdCLHFCQUFFLENBQUMsMkNB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