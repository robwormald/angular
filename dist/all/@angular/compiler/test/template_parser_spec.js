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
var compile_metadata_1 = require('@angular/compiler/src/compile_metadata');
var dom_element_schema_registry_1 = require('@angular/compiler/src/schema/dom_element_schema_registry');
var element_schema_registry_1 = require('@angular/compiler/src/schema/element_schema_registry');
var template_ast_1 = require('@angular/compiler/src/template_ast');
var template_parser_1 = require('@angular/compiler/src/template_parser');
var testing_1 = require('@angular/compiler/testing');
var core_1 = require('@angular/core');
var console_1 = require('@angular/core/src/console');
var testing_2 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var identifiers_1 = require('../src/identifiers');
var interpolation_config_1 = require('../src/interpolation_config');
var unparser_1 = require('./expression_parser/unparser');
var test_bindings_1 = require('./test_bindings');
var someModuleUrl = 'package:someModule';
var MOCK_SCHEMA_REGISTRY = [{
        provide: element_schema_registry_1.ElementSchemaRegistry,
        useValue: new testing_1.MockSchemaRegistry({ 'invalidProp': false }, { 'mappedAttr': 'mappedProp' })
    }];
function main() {
    var ngIf;
    var parse;
    var console;
    function commonBeforeEach() {
        testing_internal_1.beforeEach(function () {
            console = new ArrayConsole();
            testing_2.configureCompiler({ providers: [{ provide: console_1.Console, useValue: console }] });
        });
        testing_internal_1.beforeEach(testing_internal_1.inject([template_parser_1.TemplateParser], function (parser) {
            var component = compile_metadata_1.CompileDirectiveMetadata.create({
                selector: 'root',
                type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'Root' }),
                isComponent: true
            });
            ngIf = compile_metadata_1.CompileDirectiveMetadata.create({
                selector: '[ngIf]',
                type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'NgIf' }),
                inputs: ['ngIf']
            });
            parse =
                function (template, directives, pipes) {
                    if (pipes === void 0) { pipes = null; }
                    if (pipes === null) {
                        pipes = [];
                    }
                    return parser.parse(component, template, directives, pipes, 'TestComp');
                };
        }));
    }
    testing_internal_1.describe('TemplateParser template transform', function () {
        testing_internal_1.beforeEach(function () { testing_2.configureCompiler({ providers: test_bindings_1.TEST_COMPILER_PROVIDERS }); });
        testing_internal_1.beforeEach(function () {
            testing_2.configureCompiler({
                providers: [{ provide: template_parser_1.TEMPLATE_TRANSFORMS, useValue: new FooAstTransformer(), multi: true }]
            });
        });
        testing_internal_1.describe('single', function () {
            commonBeforeEach();
            testing_internal_1.it('should transform TemplateAST', function () {
                testing_internal_1.expect(humanizeTplAst(parse('<div>', []))).toEqual([[template_ast_1.ElementAst, 'foo']]);
            });
        });
        testing_internal_1.describe('multiple', function () {
            testing_internal_1.beforeEach(function () {
                testing_2.configureCompiler({
                    providers: [{ provide: template_parser_1.TEMPLATE_TRANSFORMS, useValue: new BarAstTransformer(), multi: true }]
                });
            });
            commonBeforeEach();
            testing_internal_1.it('should compose transformers', function () {
                testing_internal_1.expect(humanizeTplAst(parse('<div>', []))).toEqual([[template_ast_1.ElementAst, 'bar']]);
            });
        });
    });
    testing_internal_1.describe('TemplateParser Security', function () {
        // Semi-integration test to make sure TemplateParser properly sets the security context.
        // Uses the actual DomElementSchemaRegistry.
        testing_internal_1.beforeEach(function () {
            testing_2.configureCompiler({
                providers: [
                    test_bindings_1.TEST_COMPILER_PROVIDERS,
                    { provide: element_schema_registry_1.ElementSchemaRegistry, useClass: dom_element_schema_registry_1.DomElementSchemaRegistry }
                ]
            });
        });
        commonBeforeEach();
        testing_internal_1.describe('security context', function () {
            function secContext(tpl) {
                var ast = parse(tpl, []);
                var propBinding = ast[0].inputs[0];
                return propBinding.securityContext;
            }
            testing_internal_1.it('should set for properties', function () {
                testing_internal_1.expect(secContext('<div [title]="v">')).toBe(core_1.SecurityContext.NONE);
                testing_internal_1.expect(secContext('<div [innerHTML]="v">')).toBe(core_1.SecurityContext.HTML);
            });
            testing_internal_1.it('should set for property value bindings', function () { testing_internal_1.expect(secContext('<div innerHTML="{{v}}">')).toBe(core_1.SecurityContext.HTML); });
            testing_internal_1.it('should set for attributes', function () {
                testing_internal_1.expect(secContext('<a [attr.href]="v">')).toBe(core_1.SecurityContext.URL);
                // NB: attributes below need to change case.
                testing_internal_1.expect(secContext('<a [attr.innerHtml]="v">')).toBe(core_1.SecurityContext.HTML);
                testing_internal_1.expect(secContext('<a [attr.formaction]="v">')).toBe(core_1.SecurityContext.URL);
            });
            testing_internal_1.it('should set for style', function () {
                testing_internal_1.expect(secContext('<a [style.backgroundColor]="v">')).toBe(core_1.SecurityContext.STYLE);
            });
        });
    });
    testing_internal_1.describe('TemplateParser', function () {
        testing_internal_1.beforeEach(function () {
            testing_2.configureCompiler({ providers: [test_bindings_1.TEST_COMPILER_PROVIDERS, MOCK_SCHEMA_REGISTRY] });
        });
        commonBeforeEach();
        testing_internal_1.describe('parse', function () {
            testing_internal_1.describe('nodes without bindings', function () {
                testing_internal_1.it('should parse text nodes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('a', []))).toEqual([[template_ast_1.TextAst, 'a']]);
                });
                testing_internal_1.it('should parse elements with attributes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div a=b>', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.AttrAst, 'a', 'b']]);
                });
            });
            testing_internal_1.it('should parse ngContent', function () {
                var parsed = parse('<ng-content select="a">', []);
                testing_internal_1.expect(humanizeTplAst(parsed)).toEqual([[template_ast_1.NgContentAst]]);
            });
            testing_internal_1.it('should parse ngContent regardless the namespace', function () {
                var parsed = parse('<svg><ng-content></ng-content></svg>', []);
                testing_internal_1.expect(humanizeTplAst(parsed)).toEqual([
                    [template_ast_1.ElementAst, ':svg:svg'],
                    [template_ast_1.NgContentAst],
                ]);
            });
            testing_internal_1.it('should parse bound text nodes', function () {
                testing_internal_1.expect(humanizeTplAst(parse('{{a}}', []))).toEqual([[template_ast_1.BoundTextAst, '{{ a }}']]);
            });
            testing_internal_1.it('should parse with custom interpolation config', testing_internal_1.inject([template_parser_1.TemplateParser], function (parser) {
                var component = compile_metadata_1.CompileDirectiveMetadata.create({
                    selector: 'test',
                    type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'Test' }),
                    isComponent: true,
                    template: new compile_metadata_1.CompileTemplateMetadata({ interpolation: ['{%', '%}'] })
                });
                testing_internal_1.expect(humanizeTplAst(parser.parse(component, '{%a%}', [], [], 'TestComp'), {
                    start: '{%',
                    end: '%}'
                })).toEqual([[template_ast_1.BoundTextAst, '{% a %}']]);
            }));
            testing_internal_1.describe('bound properties', function () {
                testing_internal_1.it('should parse mixed case bound properties', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div [someProp]="v">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Property, 'someProp', 'v', null]
                    ]);
                });
                testing_internal_1.it('should parse dash case bound properties', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div [some-prop]="v">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Property, 'some-prop', 'v', null]
                    ]);
                });
                testing_internal_1.it('should normalize property names via the element schema', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div [mappedAttr]="v">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Property, 'mappedProp', 'v', null]
                    ]);
                });
                testing_internal_1.it('should parse mixed case bound attributes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div [attr.someAttr]="v">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Attribute, 'someAttr', 'v', null]
                    ]);
                });
                testing_internal_1.it('should parse and dash case bound classes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div [class.some-class]="v">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Class, 'some-class', 'v', null]
                    ]);
                });
                testing_internal_1.it('should parse mixed case bound classes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div [class.someClass]="v">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Class, 'someClass', 'v', null]
                    ]);
                });
                testing_internal_1.it('should parse mixed case bound styles', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div [style.someStyle]="v">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Style, 'someStyle', 'v', null]
                    ]);
                });
                testing_internal_1.it('should report invalid prefixes', function () {
                    testing_internal_1.expect(function () { return parse('<p [atTr.foo]>', []); })
                        .toThrowError("Template parse errors:\nInvalid property name 'atTr.foo' (\"<p [ERROR ->][atTr.foo]>\"): TestComp@0:3");
                    testing_internal_1.expect(function () { return parse('<p [sTyle.foo]>', []); })
                        .toThrowError("Template parse errors:\nInvalid property name 'sTyle.foo' (\"<p [ERROR ->][sTyle.foo]>\"): TestComp@0:3");
                    testing_internal_1.expect(function () { return parse('<p [Class.foo]>', []); })
                        .toThrowError("Template parse errors:\nInvalid property name 'Class.foo' (\"<p [ERROR ->][Class.foo]>\"): TestComp@0:3");
                    testing_internal_1.expect(function () { return parse('<p [bar.foo]>', []); })
                        .toThrowError("Template parse errors:\nInvalid property name 'bar.foo' (\"<p [ERROR ->][bar.foo]>\"): TestComp@0:3");
                });
                testing_internal_1.it('should parse bound properties via [...] and not report them as attributes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div [prop]="v">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Property, 'prop', 'v', null]
                    ]);
                });
                testing_internal_1.it('should parse bound properties via bind- and not report them as attributes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div bind-prop="v">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Property, 'prop', 'v', null]
                    ]);
                });
                testing_internal_1.it('should parse bound properties via {{...}} and not report them as attributes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div prop="{{v}}">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Property, 'prop', '{{ v }}', null]
                    ]);
                });
                testing_internal_1.it('should parse bound properties via animate- and not report them as attributes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div animate-something="value2">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Animation, 'something', 'value2', null]
                    ]);
                });
                testing_internal_1.it('should parse bound properties via @ and not report them as attributes and also report a deprecation warning', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div @something="value2">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [
                            template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Animation, 'something', 'value2', null
                        ]
                    ]);
                    testing_internal_1.expect(console.warnings).toEqual([[
                            'Template parse warnings:',
                            "Assigning animation triggers via @prop=\"exp\" attributes with an expression is deprecated. Use [@prop]=\"exp\" instead! (\"<div [ERROR ->]@something=\"value2\">\"): TestComp@0:5"
                        ].join('\n')]);
                });
                testing_internal_1.it('should issue a warning when host attributes contain a non property-bound animation trigger', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: 'div',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                        host: { '@prop': 'expr' }
                    });
                    humanizeTplAst(parse('<div></div>', [dirA]));
                    testing_internal_1.expect(console.warnings).toEqual([[
                            'Template parse warnings:',
                            "Assigning animation triggers within host data as attributes such as \"@prop\": \"exp\" is deprecated. Use \"[@prop]\": \"exp\" instead! (\"[ERROR ->]<div></div>\"): TestComp@0:0"
                        ].join('\n')]);
                });
                testing_internal_1.it('should not issue a warning when an animation property is bound without an expression', function () {
                    humanizeTplAst(parse('<div @something>', []));
                    testing_internal_1.expect(console.warnings.length).toEqual(0);
                });
                testing_internal_1.it('should parse bound properties via [@] and not report them as attributes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div [@something]="value2">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Animation, 'something', 'value2', null]
                    ]);
                });
            });
            testing_internal_1.describe('events', function () {
                testing_internal_1.it('should parse bound events with a target', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div (window:event)="v">', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.BoundEventAst, 'event', 'window', 'v']]);
                });
                testing_internal_1.it('should parse bound events via (...) and not report them as attributes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div (event)="v">', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.BoundEventAst, 'event', null, 'v']]);
                });
                testing_internal_1.it('should parse event names case sensitive', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div (some-event)="v">', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.BoundEventAst, 'some-event', null, 'v']]);
                    testing_internal_1.expect(humanizeTplAst(parse('<div (someEvent)="v">', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.BoundEventAst, 'someEvent', null, 'v']]);
                });
                testing_internal_1.it('should parse bound events via on- and not report them as attributes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div on-event="v">', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.BoundEventAst, 'event', null, 'v']]);
                });
                testing_internal_1.it('should allow events on explicit embedded templates that are emitted by a directive', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: 'template',
                        outputs: ['e'],
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' })
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<template (e)="f"></template>', [dirA]))).toEqual([
                        [template_ast_1.EmbeddedTemplateAst],
                        [template_ast_1.BoundEventAst, 'e', null, 'f'],
                        [template_ast_1.DirectiveAst, dirA],
                    ]);
                });
            });
            testing_internal_1.describe('bindon', function () {
                testing_internal_1.it('should parse bound events and properties via [(...)] and not report them as attributes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div [(prop)]="v">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Property, 'prop', 'v', null],
                        [template_ast_1.BoundEventAst, 'propChange', null, 'v = $event']
                    ]);
                });
                testing_internal_1.it('should parse bound events and properties via bindon- and not report them as attributes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div bindon-prop="v">', []))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Property, 'prop', 'v', null],
                        [template_ast_1.BoundEventAst, 'propChange', null, 'v = $event']
                    ]);
                });
            });
            testing_internal_1.describe('directives', function () {
                testing_internal_1.it('should order directives by the directives array in the View and match them only once', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: '[a]',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' })
                    });
                    var dirB = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: '[b]',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirB' })
                    });
                    var dirC = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: '[c]',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirC' })
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<div a c b a b>', [dirA, dirB, dirC]))).toEqual([
                        [template_ast_1.ElementAst, 'div'], [template_ast_1.AttrAst, 'a', ''], [template_ast_1.AttrAst, 'c', ''], [template_ast_1.AttrAst, 'b', ''],
                        [template_ast_1.AttrAst, 'a', ''], [template_ast_1.AttrAst, 'b', ''], [template_ast_1.DirectiveAst, dirA], [template_ast_1.DirectiveAst, dirB],
                        [template_ast_1.DirectiveAst, dirC]
                    ]);
                });
                testing_internal_1.it('should locate directives in property bindings', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: '[a=b]',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' })
                    });
                    var dirB = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: '[b]',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirB' })
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<div [a]="b">', [dirA, dirB]))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Property, 'a', 'b', null],
                        [template_ast_1.DirectiveAst, dirA]
                    ]);
                });
                testing_internal_1.it('should locate directives in event bindings', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: '[a]',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirB' })
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<div (a)="b">', [dirA]))).toEqual([
                        [template_ast_1.ElementAst, 'div'], [template_ast_1.BoundEventAst, 'a', null, 'b'], [template_ast_1.DirectiveAst, dirA]
                    ]);
                });
                testing_internal_1.it('should parse directive host properties', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: 'div',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                        host: { '[a]': 'expr' }
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<div></div>', [dirA]))).toEqual([
                        [template_ast_1.ElementAst, 'div'], [template_ast_1.DirectiveAst, dirA],
                        [template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Property, 'a', 'expr', null]
                    ]);
                });
                testing_internal_1.it('should parse directive host listeners', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: 'div',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                        host: { '(a)': 'expr' }
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<div></div>', [dirA]))).toEqual([
                        [template_ast_1.ElementAst, 'div'], [template_ast_1.DirectiveAst, dirA], [template_ast_1.BoundEventAst, 'a', null, 'expr']
                    ]);
                });
                testing_internal_1.it('should parse directive properties', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: 'div',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                        inputs: ['aProp']
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<div [aProp]="expr"></div>', [dirA]))).toEqual([
                        [template_ast_1.ElementAst, 'div'], [template_ast_1.DirectiveAst, dirA],
                        [template_ast_1.BoundDirectivePropertyAst, 'aProp', 'expr']
                    ]);
                });
                testing_internal_1.it('should parse renamed directive properties', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: 'div',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                        inputs: ['b:a']
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<div [a]="expr"></div>', [dirA]))).toEqual([
                        [template_ast_1.ElementAst, 'div'], [template_ast_1.DirectiveAst, dirA], [template_ast_1.BoundDirectivePropertyAst, 'b', 'expr']
                    ]);
                });
                testing_internal_1.it('should parse literal directive properties', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: 'div',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                        inputs: ['a']
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<div a="literal"></div>', [dirA]))).toEqual([
                        [template_ast_1.ElementAst, 'div'], [template_ast_1.AttrAst, 'a', 'literal'], [template_ast_1.DirectiveAst, dirA],
                        [template_ast_1.BoundDirectivePropertyAst, 'a', '"literal"']
                    ]);
                });
                testing_internal_1.it('should favor explicit bound properties over literal properties', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: 'div',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                        inputs: ['a']
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<div a="literal" [a]="\'literal2\'"></div>', [dirA])))
                        .toEqual([
                        [template_ast_1.ElementAst, 'div'], [template_ast_1.AttrAst, 'a', 'literal'], [template_ast_1.DirectiveAst, dirA],
                        [template_ast_1.BoundDirectivePropertyAst, 'a', '"literal2"']
                    ]);
                });
                testing_internal_1.it('should support optional directive properties', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: 'div',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                        inputs: ['a']
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<div></div>', [dirA]))).toEqual([
                        [template_ast_1.ElementAst, 'div'], [template_ast_1.DirectiveAst, dirA]
                    ]);
                });
            });
            testing_internal_1.describe('providers', function () {
                var nextProviderId;
                function createToken(value) {
                    var token;
                    if (value.startsWith('type:')) {
                        token = new compile_metadata_1.CompileTokenMetadata({
                            identifier: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: value.substring(5) })
                        });
                    }
                    else {
                        token = new compile_metadata_1.CompileTokenMetadata({ value: value });
                    }
                    return token;
                }
                function createDep(value) {
                    var isOptional = false;
                    if (value.startsWith('optional:')) {
                        isOptional = true;
                        value = value.substring(9);
                    }
                    var isSelf = false;
                    if (value.startsWith('self:')) {
                        isSelf = true;
                        value = value.substring(5);
                    }
                    var isHost = false;
                    if (value.startsWith('host:')) {
                        isHost = true;
                        value = value.substring(5);
                    }
                    return new compile_metadata_1.CompileDiDependencyMetadata({ token: createToken(value), isOptional: isOptional, isSelf: isSelf, isHost: isHost });
                }
                function createProvider(token, _a) {
                    var _b = _a === void 0 ? {} : _a, _c = _b.multi, multi = _c === void 0 ? false : _c, _d = _b.deps, deps = _d === void 0 ? [] : _d;
                    return new compile_metadata_1.CompileProviderMetadata({
                        token: createToken(token),
                        multi: multi,
                        useClass: new compile_metadata_1.CompileTypeMetadata({ name: "provider" + nextProviderId++ }),
                        deps: deps.map(createDep)
                    });
                }
                function createDir(selector, _a) {
                    var _b = _a === void 0 ? {} : _a, _c = _b.providers, providers = _c === void 0 ? null : _c, _d = _b.viewProviders, viewProviders = _d === void 0 ? null : _d, _e = _b.deps, deps = _e === void 0 ? [] : _e, _f = _b.queries, queries = _f === void 0 ? [] : _f;
                    var isComponent = !selector.startsWith('[');
                    return compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: selector,
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: selector, diDeps: deps.map(createDep) }),
                        isComponent: isComponent,
                        template: new compile_metadata_1.CompileTemplateMetadata({ ngContentSelectors: [] }),
                        providers: providers,
                        viewProviders: viewProviders,
                        queries: queries.map(function (value) { return new compile_metadata_1.CompileQueryMetadata({ selectors: [createToken(value)] }); })
                    });
                }
                testing_internal_1.beforeEach(function () { nextProviderId = 0; });
                testing_internal_1.it('should provide a component', function () {
                    var comp = createDir('my-comp');
                    var elAst = parse('<my-comp>', [comp])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(1);
                    testing_internal_1.expect(elAst.providers[0].providerType).toBe(template_ast_1.ProviderAstType.Component);
                    testing_internal_1.expect(elAst.providers[0].providers[0].useClass).toBe(comp.type);
                });
                testing_internal_1.it('should provide a directive', function () {
                    var dirA = createDir('[dirA]');
                    var elAst = parse('<div dirA>', [dirA])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(1);
                    testing_internal_1.expect(elAst.providers[0].providerType).toBe(template_ast_1.ProviderAstType.Directive);
                    testing_internal_1.expect(elAst.providers[0].providers[0].useClass).toBe(dirA.type);
                });
                testing_internal_1.it('should use the public providers of a directive', function () {
                    var provider = createProvider('service');
                    var dirA = createDir('[dirA]', { providers: [provider] });
                    var elAst = parse('<div dirA>', [dirA])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(2);
                    testing_internal_1.expect(elAst.providers[1].providerType).toBe(template_ast_1.ProviderAstType.PublicService);
                    testing_internal_1.expect(elAst.providers[1].providers).toEqual([provider]);
                });
                testing_internal_1.it('should use the private providers of a component', function () {
                    var provider = createProvider('service');
                    var comp = createDir('my-comp', { viewProviders: [provider] });
                    var elAst = parse('<my-comp>', [comp])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(2);
                    testing_internal_1.expect(elAst.providers[1].providerType).toBe(template_ast_1.ProviderAstType.PrivateService);
                    testing_internal_1.expect(elAst.providers[1].providers).toEqual([provider]);
                });
                testing_internal_1.it('should support multi providers', function () {
                    var provider0 = createProvider('service0', { multi: true });
                    var provider1 = createProvider('service1', { multi: true });
                    var provider2 = createProvider('service0', { multi: true });
                    var dirA = createDir('[dirA]', { providers: [provider0, provider1] });
                    var dirB = createDir('[dirB]', { providers: [provider2] });
                    var elAst = parse('<div dirA dirB>', [dirA, dirB])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(4);
                    testing_internal_1.expect(elAst.providers[2].providers).toEqual([provider0, provider2]);
                    testing_internal_1.expect(elAst.providers[3].providers).toEqual([provider1]);
                });
                testing_internal_1.it('should overwrite non multi providers', function () {
                    var provider1 = createProvider('service0');
                    var provider2 = createProvider('service1');
                    var provider3 = createProvider('service0');
                    var dirA = createDir('[dirA]', { providers: [provider1, provider2] });
                    var dirB = createDir('[dirB]', { providers: [provider3] });
                    var elAst = parse('<div dirA dirB>', [dirA, dirB])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(4);
                    testing_internal_1.expect(elAst.providers[2].providers).toEqual([provider3]);
                    testing_internal_1.expect(elAst.providers[3].providers).toEqual([provider2]);
                });
                testing_internal_1.it('should overwrite component providers by directive providers', function () {
                    var compProvider = createProvider('service0');
                    var dirProvider = createProvider('service0');
                    var comp = createDir('my-comp', { providers: [compProvider] });
                    var dirA = createDir('[dirA]', { providers: [dirProvider] });
                    var elAst = parse('<my-comp dirA>', [dirA, comp])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(3);
                    testing_internal_1.expect(elAst.providers[2].providers).toEqual([dirProvider]);
                });
                testing_internal_1.it('should overwrite view providers by directive providers', function () {
                    var viewProvider = createProvider('service0');
                    var dirProvider = createProvider('service0');
                    var comp = createDir('my-comp', { viewProviders: [viewProvider] });
                    var dirA = createDir('[dirA]', { providers: [dirProvider] });
                    var elAst = parse('<my-comp dirA>', [dirA, comp])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(3);
                    testing_internal_1.expect(elAst.providers[2].providers).toEqual([dirProvider]);
                });
                testing_internal_1.it('should overwrite directives by providers', function () {
                    var dirProvider = createProvider('type:my-comp');
                    var comp = createDir('my-comp', { providers: [dirProvider] });
                    var elAst = parse('<my-comp>', [comp])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(1);
                    testing_internal_1.expect(elAst.providers[0].providers).toEqual([dirProvider]);
                });
                testing_internal_1.it('should throw if mixing multi and non multi providers', function () {
                    var provider0 = createProvider('service0');
                    var provider1 = createProvider('service0', { multi: true });
                    var dirA = createDir('[dirA]', { providers: [provider0] });
                    var dirB = createDir('[dirB]', { providers: [provider1] });
                    testing_internal_1.expect(function () { return parse('<div dirA dirB>', [dirA, dirB]); })
                        .toThrowError("Template parse errors:\n" +
                        "Mixing multi and non multi provider is not possible for token service0 (\"[ERROR ->]<div dirA dirB>\"): TestComp@0:0");
                });
                testing_internal_1.it('should sort providers by their DI order', function () {
                    var provider0 = createProvider('service0', { deps: ['type:[dir2]'] });
                    var provider1 = createProvider('service1');
                    var dir2 = createDir('[dir2]', { deps: ['service1'] });
                    var comp = createDir('my-comp', { providers: [provider0, provider1] });
                    var elAst = parse('<my-comp dir2>', [comp, dir2])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(4);
                    testing_internal_1.expect(elAst.providers[0].providers[0].useClass).toEqual(comp.type);
                    testing_internal_1.expect(elAst.providers[1].providers).toEqual([provider1]);
                    testing_internal_1.expect(elAst.providers[2].providers[0].useClass).toEqual(dir2.type);
                    testing_internal_1.expect(elAst.providers[3].providers).toEqual([provider0]);
                });
                testing_internal_1.it('should sort directives by their DI order', function () {
                    var dir0 = createDir('[dir0]', { deps: ['type:my-comp'] });
                    var dir1 = createDir('[dir1]', { deps: ['type:[dir0]'] });
                    var dir2 = createDir('[dir2]', { deps: ['type:[dir1]'] });
                    var comp = createDir('my-comp');
                    var elAst = parse('<my-comp dir2 dir0 dir1>', [comp, dir2, dir0, dir1])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(4);
                    testing_internal_1.expect(elAst.directives[0].directive).toBe(comp);
                    testing_internal_1.expect(elAst.directives[1].directive).toBe(dir0);
                    testing_internal_1.expect(elAst.directives[2].directive).toBe(dir1);
                    testing_internal_1.expect(elAst.directives[3].directive).toBe(dir2);
                });
                testing_internal_1.it('should mark directives and dependencies of directives as eager', function () {
                    var provider0 = createProvider('service0');
                    var provider1 = createProvider('service1');
                    var dirA = createDir('[dirA]', { providers: [provider0, provider1], deps: ['service0'] });
                    var elAst = parse('<div dirA>', [dirA])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(3);
                    testing_internal_1.expect(elAst.providers[0].providers).toEqual([provider0]);
                    testing_internal_1.expect(elAst.providers[0].eager).toBe(true);
                    testing_internal_1.expect(elAst.providers[1].providers[0].useClass).toEqual(dirA.type);
                    testing_internal_1.expect(elAst.providers[1].eager).toBe(true);
                    testing_internal_1.expect(elAst.providers[2].providers).toEqual([provider1]);
                    testing_internal_1.expect(elAst.providers[2].eager).toBe(false);
                });
                testing_internal_1.it('should mark dependencies on parent elements as eager', function () {
                    var provider0 = createProvider('service0');
                    var provider1 = createProvider('service1');
                    var dirA = createDir('[dirA]', { providers: [provider0, provider1] });
                    var dirB = createDir('[dirB]', { deps: ['service0'] });
                    var elAst = parse('<div dirA><div dirB></div></div>', [dirA, dirB])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(3);
                    testing_internal_1.expect(elAst.providers[0].providers[0].useClass).toEqual(dirA.type);
                    testing_internal_1.expect(elAst.providers[0].eager).toBe(true);
                    testing_internal_1.expect(elAst.providers[1].providers).toEqual([provider0]);
                    testing_internal_1.expect(elAst.providers[1].eager).toBe(true);
                    testing_internal_1.expect(elAst.providers[2].providers).toEqual([provider1]);
                    testing_internal_1.expect(elAst.providers[2].eager).toBe(false);
                });
                testing_internal_1.it('should mark queried providers as eager', function () {
                    var provider0 = createProvider('service0');
                    var provider1 = createProvider('service1');
                    var dirA = createDir('[dirA]', { providers: [provider0, provider1], queries: ['service0'] });
                    var elAst = parse('<div dirA></div>', [dirA])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(3);
                    testing_internal_1.expect(elAst.providers[0].providers[0].useClass).toEqual(dirA.type);
                    testing_internal_1.expect(elAst.providers[0].eager).toBe(true);
                    testing_internal_1.expect(elAst.providers[1].providers).toEqual([provider0]);
                    testing_internal_1.expect(elAst.providers[1].eager).toBe(true);
                    testing_internal_1.expect(elAst.providers[2].providers).toEqual([provider1]);
                    testing_internal_1.expect(elAst.providers[2].eager).toBe(false);
                });
                testing_internal_1.it('should not mark dependencies accross embedded views as eager', function () {
                    var provider0 = createProvider('service0');
                    var dirA = createDir('[dirA]', { providers: [provider0] });
                    var dirB = createDir('[dirB]', { deps: ['service0'] });
                    var elAst = parse('<div dirA><div *ngIf dirB></div></div>', [dirA, dirB])[0];
                    testing_internal_1.expect(elAst.providers.length).toBe(2);
                    testing_internal_1.expect(elAst.providers[0].providers[0].useClass).toEqual(dirA.type);
                    testing_internal_1.expect(elAst.providers[0].eager).toBe(true);
                    testing_internal_1.expect(elAst.providers[1].providers).toEqual([provider0]);
                    testing_internal_1.expect(elAst.providers[1].eager).toBe(false);
                });
                testing_internal_1.it('should report missing @Self() deps as errors', function () {
                    var dirA = createDir('[dirA]', { deps: ['self:provider0'] });
                    testing_internal_1.expect(function () { return parse('<div dirA></div>', [dirA]); })
                        .toThrowError('Template parse errors:\nNo provider for provider0 ("[ERROR ->]<div dirA></div>"): TestComp@0:0');
                });
                testing_internal_1.it('should change missing @Self() that are optional to nulls', function () {
                    var dirA = createDir('[dirA]', { deps: ['optional:self:provider0'] });
                    var elAst = parse('<div dirA></div>', [dirA])[0];
                    testing_internal_1.expect(elAst.providers[0].providers[0].deps[0].isValue).toBe(true);
                    testing_internal_1.expect(elAst.providers[0].providers[0].deps[0].value).toBe(null);
                });
                testing_internal_1.it('should report missing @Host() deps as errors', function () {
                    var dirA = createDir('[dirA]', { deps: ['host:provider0'] });
                    testing_internal_1.expect(function () { return parse('<div dirA></div>', [dirA]); })
                        .toThrowError('Template parse errors:\nNo provider for provider0 ("[ERROR ->]<div dirA></div>"): TestComp@0:0');
                });
                testing_internal_1.it('should change missing @Host() that are optional to nulls', function () {
                    var dirA = createDir('[dirA]', { deps: ['optional:host:provider0'] });
                    var elAst = parse('<div dirA></div>', [dirA])[0];
                    testing_internal_1.expect(elAst.providers[0].providers[0].deps[0].isValue).toBe(true);
                    testing_internal_1.expect(elAst.providers[0].providers[0].deps[0].value).toBe(null);
                });
            });
            testing_internal_1.describe('references', function () {
                testing_internal_1.it('should parse references via #... and not report them as attributes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div #a>', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.ReferenceAst, 'a', null]]);
                });
                testing_internal_1.it('should parse references via ref-... and not report them as attributes', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div ref-a>', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.ReferenceAst, 'a', null]]);
                });
                testing_internal_1.it('should parse references via var-... and report them as deprecated', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div var-a>', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.ReferenceAst, 'a', null]]);
                    testing_internal_1.expect(console.warnings).toEqual([[
                            'Template parse warnings:',
                            '"var-" on non <template> elements is deprecated. Use "ref-" instead! ("<div [ERROR ->]var-a>"): TestComp@0:5'
                        ].join('\n')]);
                });
                testing_internal_1.it('should parse camel case references', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div ref-someA>', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.ReferenceAst, 'someA', null]]);
                });
                testing_internal_1.it('should assign references with empty value to the element', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div #a></div>', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.ReferenceAst, 'a', null]]);
                });
                testing_internal_1.it('should assign references to directives via exportAs', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: '[a]',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                        exportAs: 'dirA'
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<div a #a="dirA"></div>', [dirA]))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.AttrAst, 'a', ''],
                        [template_ast_1.ReferenceAst, 'a', identifiers_1.identifierToken(dirA.type)],
                        [template_ast_1.DirectiveAst, dirA],
                    ]);
                });
                testing_internal_1.it('should report references with values that dont match a directive as errors', function () {
                    testing_internal_1.expect(function () { return parse('<div #a="dirA"></div>', []); }).toThrowError("Template parse errors:\nThere is no directive with \"exportAs\" set to \"dirA\" (\"<div [ERROR ->]#a=\"dirA\"></div>\"): TestComp@0:5");
                });
                testing_internal_1.it('should report invalid reference names', function () {
                    testing_internal_1.expect(function () { return parse('<div #a-b></div>', []); }).toThrowError("Template parse errors:\n\"-\" is not allowed in reference names (\"<div [ERROR ->]#a-b></div>\"): TestComp@0:5");
                });
                testing_internal_1.it('should report variables as errors', function () {
                    testing_internal_1.expect(function () { return parse('<div let-a></div>', []); }).toThrowError("Template parse errors:\n\"let-\" is only supported on template elements. (\"<div [ERROR ->]let-a></div>\"): TestComp@0:5");
                });
                testing_internal_1.it('should report duplicate reference names', function () {
                    testing_internal_1.expect(function () { return parse('<div #a></div><div #a></div>', []); })
                        .toThrowError("Template parse errors:\nReference \"#a\" is defined several times (\"<div #a></div><div [ERROR ->]#a></div>\"): TestComp@0:19");
                });
                testing_internal_1.it('should not throw error when there is same reference name in different templates', function () {
                    testing_internal_1.expect(function () { return parse('<div #a><template #a><span>OK</span></template></div>', []); })
                        .not.toThrowError();
                });
                testing_internal_1.it('should assign references with empty value to components', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: '[a]',
                        isComponent: true,
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                        exportAs: 'dirA',
                        template: new compile_metadata_1.CompileTemplateMetadata({ ngContentSelectors: [] })
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<div a #a></div>', [dirA]))).toEqual([
                        [template_ast_1.ElementAst, 'div'],
                        [template_ast_1.AttrAst, 'a', ''],
                        [template_ast_1.ReferenceAst, 'a', identifiers_1.identifierToken(dirA.type)],
                        [template_ast_1.DirectiveAst, dirA],
                    ]);
                });
                testing_internal_1.it('should not locate directives in references', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: '[a]',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' })
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<div ref-a>', [dirA]))).toEqual([
                        [template_ast_1.ElementAst, 'div'], [template_ast_1.ReferenceAst, 'a', null]
                    ]);
                });
            });
            testing_internal_1.describe('explicit templates', function () {
                testing_internal_1.it('should create embedded templates for <template> elements', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<template></template>', []))).toEqual([[template_ast_1.EmbeddedTemplateAst]]);
                    testing_internal_1.expect(humanizeTplAst(parse('<TEMPLATE></TEMPLATE>', []))).toEqual([[template_ast_1.EmbeddedTemplateAst]]);
                });
                testing_internal_1.it('should create embedded templates for <template> elements regardless the namespace', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<svg><template></template></svg>', []))).toEqual([
                        [template_ast_1.ElementAst, ':svg:svg'],
                        [template_ast_1.EmbeddedTemplateAst],
                    ]);
                });
                testing_internal_1.it('should support references via #...', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<template #a>', []))).toEqual([
                        [template_ast_1.EmbeddedTemplateAst], [template_ast_1.ReferenceAst, 'a', identifiers_1.identifierToken(identifiers_1.Identifiers.TemplateRef)]
                    ]);
                });
                testing_internal_1.it('should support references via ref-...', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<template ref-a>', []))).toEqual([
                        [template_ast_1.EmbeddedTemplateAst], [template_ast_1.ReferenceAst, 'a', identifiers_1.identifierToken(identifiers_1.Identifiers.TemplateRef)]
                    ]);
                });
                testing_internal_1.it('should parse variables via let-...', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<template let-a="b">', []))).toEqual([[template_ast_1.EmbeddedTemplateAst], [template_ast_1.VariableAst, 'a', 'b']]);
                });
                testing_internal_1.it('should parse variables via var-... and report them as deprecated', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<template var-a="b">', []))).toEqual([[template_ast_1.EmbeddedTemplateAst], [template_ast_1.VariableAst, 'a', 'b']]);
                    testing_internal_1.expect(console.warnings).toEqual([[
                            'Template parse warnings:',
                            '"var-" on <template> elements is deprecated. Use "let-" instead! ("<template [ERROR ->]var-a="b">"): TestComp@0:10'
                        ].join('\n')]);
                });
                testing_internal_1.it('should not locate directives in variables', function () {
                    var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                        selector: '[a]',
                        type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' })
                    });
                    testing_internal_1.expect(humanizeTplAst(parse('<template let-a="b"></template>', [dirA]))).toEqual([
                        [template_ast_1.EmbeddedTemplateAst], [template_ast_1.VariableAst, 'a', 'b']
                    ]);
                });
            });
            testing_internal_1.describe('inline templates', function () {
                testing_internal_1.it('should wrap the element into an EmbeddedTemplateAST', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div template>', []))).toEqual([[template_ast_1.EmbeddedTemplateAst], [template_ast_1.ElementAst, 'div']]);
                });
                testing_internal_1.it('should wrap the element with data-template attribute into an EmbeddedTemplateAST ', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div data-template>', []))).toEqual([[template_ast_1.EmbeddedTemplateAst], [template_ast_1.ElementAst, 'div']]);
                });
                testing_internal_1.it('should parse bound properties', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div template="ngIf test">', [ngIf]))).toEqual([
                        [template_ast_1.EmbeddedTemplateAst], [template_ast_1.DirectiveAst, ngIf],
                        [template_ast_1.BoundDirectivePropertyAst, 'ngIf', 'test'], [template_ast_1.ElementAst, 'div']
                    ]);
                });
                testing_internal_1.it('should parse variables via #... and report them as deprecated', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div *ngIf="#a=b">', []))).toEqual([[template_ast_1.EmbeddedTemplateAst], [template_ast_1.VariableAst, 'a', 'b'], [template_ast_1.ElementAst, 'div']]);
                    testing_internal_1.expect(console.warnings).toEqual([[
                            'Template parse warnings:',
                            '"#" inside of expressions is deprecated. Use "let" instead! ("<div [ERROR ->]*ngIf="#a=b">"): TestComp@0:5'
                        ].join('\n')]);
                });
                testing_internal_1.it('should parse variables via var ... and report them as deprecated', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div *ngIf="var a=b">', []))).toEqual([[template_ast_1.EmbeddedTemplateAst], [template_ast_1.VariableAst, 'a', 'b'], [template_ast_1.ElementAst, 'div']]);
                    testing_internal_1.expect(console.warnings).toEqual([[
                            'Template parse warnings:',
                            '"var" inside of expressions is deprecated. Use "let" instead! ("<div [ERROR ->]*ngIf="var a=b">"): TestComp@0:5'
                        ].join('\n')]);
                });
                testing_internal_1.it('should parse variables via let ...', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div *ngIf="let a=b">', []))).toEqual([[template_ast_1.EmbeddedTemplateAst], [template_ast_1.VariableAst, 'a', 'b'], [template_ast_1.ElementAst, 'div']]);
                });
                testing_internal_1.describe('directives', function () {
                    testing_internal_1.it('should locate directives in property bindings', function () {
                        var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                            selector: '[a=b]',
                            type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                            inputs: ['a']
                        });
                        var dirB = compile_metadata_1.CompileDirectiveMetadata.create({
                            selector: '[b]',
                            type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirB' })
                        });
                        testing_internal_1.expect(humanizeTplAst(parse('<div template="a b" b>', [dirA, dirB]))).toEqual([
                            [template_ast_1.EmbeddedTemplateAst], [template_ast_1.DirectiveAst, dirA], [template_ast_1.BoundDirectivePropertyAst, 'a', 'b'],
                            [template_ast_1.ElementAst, 'div'], [template_ast_1.AttrAst, 'b', ''], [template_ast_1.DirectiveAst, dirB]
                        ]);
                    });
                    testing_internal_1.it('should not locate directives in variables', function () {
                        var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                            selector: '[a]',
                            type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' })
                        });
                        testing_internal_1.expect(humanizeTplAst(parse('<div template="let a=b">', [dirA]))).toEqual([
                            [template_ast_1.EmbeddedTemplateAst], [template_ast_1.VariableAst, 'a', 'b'], [template_ast_1.ElementAst, 'div']
                        ]);
                    });
                    testing_internal_1.it('should not locate directives in references', function () {
                        var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                            selector: '[a]',
                            type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' })
                        });
                        testing_internal_1.expect(humanizeTplAst(parse('<div ref-a>', [dirA]))).toEqual([
                            [template_ast_1.ElementAst, 'div'], [template_ast_1.ReferenceAst, 'a', null]
                        ]);
                    });
                });
                testing_internal_1.it('should work with *... and use the attribute name as property binding name', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div *ngIf="test">', [ngIf]))).toEqual([
                        [template_ast_1.EmbeddedTemplateAst], [template_ast_1.DirectiveAst, ngIf],
                        [template_ast_1.BoundDirectivePropertyAst, 'ngIf', 'test'], [template_ast_1.ElementAst, 'div']
                    ]);
                });
                testing_internal_1.it('should work with *... and empty value', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<div *ngIf>', [ngIf]))).toEqual([
                        [template_ast_1.EmbeddedTemplateAst], [template_ast_1.DirectiveAst, ngIf],
                        [template_ast_1.BoundDirectivePropertyAst, 'ngIf', 'null'], [template_ast_1.ElementAst, 'div']
                    ]);
                });
            });
        });
        testing_internal_1.describe('content projection', function () {
            var compCounter;
            testing_internal_1.beforeEach(function () { compCounter = 0; });
            function createComp(selector, ngContentSelectors) {
                return compile_metadata_1.CompileDirectiveMetadata.create({
                    selector: selector,
                    isComponent: true,
                    type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: "SomeComp" + compCounter++ }),
                    template: new compile_metadata_1.CompileTemplateMetadata({ ngContentSelectors: ngContentSelectors })
                });
            }
            function createDir(selector) {
                return compile_metadata_1.CompileDirectiveMetadata.create({
                    selector: selector,
                    type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: "SomeDir" + compCounter++ })
                });
            }
            testing_internal_1.describe('project text nodes', function () {
                testing_internal_1.it('should project text nodes with wildcard selector', function () {
                    testing_internal_1.expect(humanizeContentProjection(parse('<div>hello</div>', [createComp('div', ['*'])])))
                        .toEqual([['div', null], ['#text(hello)', 0]]);
                });
            });
            testing_internal_1.describe('project elements', function () {
                testing_internal_1.it('should project elements with wildcard selector', function () {
                    testing_internal_1.expect(humanizeContentProjection(parse('<div><span></span></div>', [
                        createComp('div', ['*'])
                    ]))).toEqual([['div', null], ['span', 0]]);
                });
                testing_internal_1.it('should project elements with css selector', function () {
                    testing_internal_1.expect(humanizeContentProjection(parse('<div><a x></a><b></b></div>', [
                        createComp('div', ['a[x]'])
                    ]))).toEqual([['div', null], ['a', 0], ['b', null]]);
                });
            });
            testing_internal_1.describe('embedded templates', function () {
                testing_internal_1.it('should project embedded templates with wildcard selector', function () {
                    testing_internal_1.expect(humanizeContentProjection(parse('<div><template></template></div>', [
                        createComp('div', ['*'])
                    ]))).toEqual([['div', null], ['template', 0]]);
                });
                testing_internal_1.it('should project embedded templates with css selector', function () {
                    testing_internal_1.expect(humanizeContentProjection(parse('<div><template x></template><template></template></div>', [createComp('div', ['template[x]'])])))
                        .toEqual([['div', null], ['template', 0], ['template', null]]);
                });
            });
            testing_internal_1.describe('ng-content', function () {
                testing_internal_1.it('should project ng-content with wildcard selector', function () {
                    testing_internal_1.expect(humanizeContentProjection(parse('<div><ng-content></ng-content></div>', [
                        createComp('div', ['*'])
                    ]))).toEqual([['div', null], ['ng-content', 0]]);
                });
                testing_internal_1.it('should project ng-content with css selector', function () {
                    testing_internal_1.expect(humanizeContentProjection(parse('<div><ng-content x></ng-content><ng-content></ng-content></div>', [createComp('div', ['ng-content[x]'])])))
                        .toEqual([['div', null], ['ng-content', 0], ['ng-content', null]]);
                });
            });
            testing_internal_1.it('should project into the first matching ng-content', function () {
                testing_internal_1.expect(humanizeContentProjection(parse('<div>hello<b></b><a></a></div>', [
                    createComp('div', ['a', 'b', '*'])
                ]))).toEqual([['div', null], ['#text(hello)', 2], ['b', 1], ['a', 0]]);
            });
            testing_internal_1.it('should project into wildcard ng-content last', function () {
                testing_internal_1.expect(humanizeContentProjection(parse('<div>hello<a></a></div>', [
                    createComp('div', ['*', 'a'])
                ]))).toEqual([['div', null], ['#text(hello)', 0], ['a', 1]]);
            });
            testing_internal_1.it('should only project direct child nodes', function () {
                testing_internal_1.expect(humanizeContentProjection(parse('<div><span><a></a></span><a></a></div>', [
                    createComp('div', ['a'])
                ]))).toEqual([['div', null], ['span', null], ['a', null], ['a', 0]]);
            });
            testing_internal_1.it('should project nodes of nested components', function () {
                testing_internal_1.expect(humanizeContentProjection(parse('<a><b>hello</b></a>', [
                    createComp('a', ['*']), createComp('b', ['*'])
                ]))).toEqual([['a', null], ['b', 0], ['#text(hello)', 0]]);
            });
            testing_internal_1.it('should project children of components with ngNonBindable', function () {
                testing_internal_1.expect(humanizeContentProjection(parse('<div ngNonBindable>{{hello}}<span></span></div>', [
                    createComp('div', ['*'])
                ]))).toEqual([['div', null], ['#text({{hello}})', 0], ['span', 0]]);
            });
            testing_internal_1.it('should match the element when there is an inline template', function () {
                testing_internal_1.expect(humanizeContentProjection(parse('<div><b *ngIf="cond"></b></div>', [
                    createComp('div', ['a', 'b']), ngIf
                ]))).toEqual([['div', null], ['template', 1], ['b', null]]);
            });
            testing_internal_1.describe('ngProjectAs', function () {
                testing_internal_1.it('should override elements', function () {
                    testing_internal_1.expect(humanizeContentProjection(parse('<div><a ngProjectAs="b"></a></div>', [
                        createComp('div', ['a', 'b'])
                    ]))).toEqual([['div', null], ['a', 1]]);
                });
                testing_internal_1.it('should override <ng-content>', function () {
                    testing_internal_1.expect(humanizeContentProjection(parse('<div><ng-content ngProjectAs="b"></ng-content></div>', [createComp('div', ['ng-content', 'b'])])))
                        .toEqual([['div', null], ['ng-content', 1]]);
                });
                testing_internal_1.it('should override <template>', function () {
                    testing_internal_1.expect(humanizeContentProjection(parse('<div><template ngProjectAs="b"></template></div>', [createComp('div', ['template', 'b'])])))
                        .toEqual([['div', null], ['template', 1]]);
                });
                testing_internal_1.it('should override inline templates', function () {
                    testing_internal_1.expect(humanizeContentProjection(parse('<div><a *ngIf="cond" ngProjectAs="b"></a></div>', [createComp('div', ['a', 'b']), ngIf])))
                        .toEqual([['div', null], ['template', 1], ['a', null]]);
                });
            });
            testing_internal_1.it('should support other directives before the component', function () {
                testing_internal_1.expect(humanizeContentProjection(parse('<div>hello</div>', [
                    createDir('div'), createComp('div', ['*'])
                ]))).toEqual([['div', null], ['#text(hello)', 0]]);
            });
        });
        testing_internal_1.describe('splitClasses', function () {
            testing_internal_1.it('should keep an empty class', function () { testing_internal_1.expect(template_parser_1.splitClasses('a')).toEqual(['a']); });
            testing_internal_1.it('should split 2 classes', function () { testing_internal_1.expect(template_parser_1.splitClasses('a b')).toEqual(['a', 'b']); });
            testing_internal_1.it('should trim classes', function () { testing_internal_1.expect(template_parser_1.splitClasses(' a  b ')).toEqual(['a', 'b']); });
        });
        testing_internal_1.describe('error cases', function () {
            testing_internal_1.it('should report when ng-content has content', function () {
                testing_internal_1.expect(function () { return parse('<ng-content>content</ng-content>', []); })
                    .toThrowError("Template parse errors:\n<ng-content> element cannot have content. <ng-content> must be immediately followed by </ng-content> (\"[ERROR ->]<ng-content>content</ng-content>\"): TestComp@0:0");
            });
            testing_internal_1.it('should treat *attr on a template element as valid', function () { testing_internal_1.expect(function () { return parse('<template *ngIf>', []); }).not.toThrowError(); });
            testing_internal_1.it('should treat template attribute on a template element as valid', function () { testing_internal_1.expect(function () { return parse('<template template="ngIf">', []); }).not.toThrowError(); });
            testing_internal_1.it('should report when mutliple *attrs are used on the same element', function () {
                testing_internal_1.expect(function () { return parse('<div *ngIf *ngFor>', []); }).toThrowError("Template parse errors:\nCan't have multiple template bindings on one element. Use only one attribute named 'template' or prefixed with * (\"<div *ngIf [ERROR ->]*ngFor>\"): TestComp@0:11");
            });
            testing_internal_1.it('should report when mix of template and *attrs are used on the same element', function () {
                testing_internal_1.expect(function () { return parse('<div template="ngIf" *ngFor>', []); }).toThrowError("Template parse errors:\nCan't have multiple template bindings on one element. Use only one attribute named 'template' or prefixed with * (\"<div template=\"ngIf\" [ERROR ->]*ngFor>\"): TestComp@0:21");
            });
            testing_internal_1.it('should report invalid property names', function () {
                testing_internal_1.expect(function () { return parse('<div [invalidProp]></div>', []); }).toThrowError("Template parse errors:\nCan't bind to 'invalidProp' since it isn't a known native property (\"<div [ERROR ->][invalidProp]></div>\"): TestComp@0:5");
            });
            testing_internal_1.it('should report errors in expressions', function () {
                testing_internal_1.expect(function () { return parse('<div [prop]="a b"></div>', []); }).toThrowError("Template parse errors:\nParser Error: Unexpected token 'b' at column 3 in [a b] in TestComp@0:5 (\"<div [ERROR ->][prop]=\"a b\"></div>\"): TestComp@0:5");
            });
            testing_internal_1.it('should not throw on invalid property names if the property is used by a directive', function () {
                var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                    selector: 'div',
                    type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                    inputs: ['invalidProp']
                });
                testing_internal_1.expect(function () { return parse('<div [invalid-prop]></div>', [dirA]); }).not.toThrow();
            });
            testing_internal_1.it('should not allow more than 1 component per element', function () {
                var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                    selector: 'div',
                    isComponent: true,
                    type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                    template: new compile_metadata_1.CompileTemplateMetadata({ ngContentSelectors: [] })
                });
                var dirB = compile_metadata_1.CompileDirectiveMetadata.create({
                    selector: 'div',
                    isComponent: true,
                    type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirB' }),
                    template: new compile_metadata_1.CompileTemplateMetadata({ ngContentSelectors: [] })
                });
                testing_internal_1.expect(function () { return parse('<div>', [dirB, dirA]); }).toThrowError("Template parse errors:\nMore than one component: DirB,DirA (\"[ERROR ->]<div>\"): TestComp@0:0");
            });
            testing_internal_1.it('should not allow components or element bindings nor dom events on explicit embedded templates', function () {
                var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                    selector: '[a]',
                    isComponent: true,
                    type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                    template: new compile_metadata_1.CompileTemplateMetadata({ ngContentSelectors: [] })
                });
                testing_internal_1.expect(function () { return parse('<template [a]="b" (e)="f"></template>', [dirA]); })
                    .toThrowError("Template parse errors:\nEvent binding e not emitted by any directive on an embedded template. Make sure that the event name is spelled correctly and all directives are listed in the \"directives\" section. (\"<template [a]=\"b\" [ERROR ->](e)=\"f\"></template>\"): TestComp@0:18\nComponents on an embedded template: DirA (\"[ERROR ->]<template [a]=\"b\" (e)=\"f\"></template>\"): TestComp@0:0\nProperty binding a not used by any directive on an embedded template. Make sure that the property name is spelled correctly and all directives are listed in the \"directives\" section. (\"[ERROR ->]<template [a]=\"b\" (e)=\"f\"></template>\"): TestComp@0:0");
            });
            testing_internal_1.it('should not allow components or element bindings on inline embedded templates', function () {
                var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                    selector: '[a]',
                    isComponent: true,
                    type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                    template: new compile_metadata_1.CompileTemplateMetadata({ ngContentSelectors: [] })
                });
                testing_internal_1.expect(function () { return parse('<div *a="b"></div>', [dirA]); }).toThrowError("Template parse errors:\nComponents on an embedded template: DirA (\"[ERROR ->]<div *a=\"b\"></div>\"): TestComp@0:0\nProperty binding a not used by any directive on an embedded template. Make sure that the property name is spelled correctly and all directives are listed in the \"directives\" section. (\"[ERROR ->]<div *a=\"b\"></div>\"): TestComp@0:0");
            });
        });
        testing_internal_1.describe('ignore elements', function () {
            testing_internal_1.it('should ignore <script> elements', function () {
                testing_internal_1.expect(humanizeTplAst(parse('<script></script>a', []))).toEqual([[template_ast_1.TextAst, 'a']]);
            });
            testing_internal_1.it('should ignore <style> elements', function () {
                testing_internal_1.expect(humanizeTplAst(parse('<style></style>a', []))).toEqual([[template_ast_1.TextAst, 'a']]);
            });
            testing_internal_1.describe('<link rel="stylesheet">', function () {
                testing_internal_1.it('should keep <link rel="stylesheet"> elements if they have an absolute non package: url', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<link rel="stylesheet" href="http://someurl">a', [])))
                        .toEqual([
                        [template_ast_1.ElementAst, 'link'], [template_ast_1.AttrAst, 'rel', 'stylesheet'],
                        [template_ast_1.AttrAst, 'href', 'http://someurl'], [template_ast_1.TextAst, 'a']
                    ]);
                });
                testing_internal_1.it('should keep <link rel="stylesheet"> elements if they have no uri', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<link rel="stylesheet">a', []))).toEqual([[template_ast_1.ElementAst, 'link'], [template_ast_1.AttrAst, 'rel', 'stylesheet'], [template_ast_1.TextAst, 'a']]);
                    testing_internal_1.expect(humanizeTplAst(parse('<link REL="stylesheet">a', []))).toEqual([[template_ast_1.ElementAst, 'link'], [template_ast_1.AttrAst, 'REL', 'stylesheet'], [template_ast_1.TextAst, 'a']]);
                });
                testing_internal_1.it('should ignore <link rel="stylesheet"> elements if they have a relative uri', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<link rel="stylesheet" href="./other.css">a', []))).toEqual([[template_ast_1.TextAst, 'a']]);
                    testing_internal_1.expect(humanizeTplAst(parse('<link rel="stylesheet" HREF="./other.css">a', []))).toEqual([[template_ast_1.TextAst, 'a']]);
                });
                testing_internal_1.it('should ignore <link rel="stylesheet"> elements if they have a package: uri', function () {
                    testing_internal_1.expect(humanizeTplAst(parse('<link rel="stylesheet" href="package:somePackage">a', []))).toEqual([[template_ast_1.TextAst, 'a']]);
                });
            });
            testing_internal_1.it('should ignore bindings on children of elements with ngNonBindable', function () {
                testing_internal_1.expect(humanizeTplAst(parse('<div ngNonBindable>{{b}}</div>', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.AttrAst, 'ngNonBindable', ''], [template_ast_1.TextAst, '{{b}}']]);
            });
            testing_internal_1.it('should keep nested children of elements with ngNonBindable', function () {
                testing_internal_1.expect(humanizeTplAst(parse('<div ngNonBindable><span>{{b}}</span></div>', []))).toEqual([
                    [template_ast_1.ElementAst, 'div'], [template_ast_1.AttrAst, 'ngNonBindable', ''], [template_ast_1.ElementAst, 'span'],
                    [template_ast_1.TextAst, '{{b}}']
                ]);
            });
            testing_internal_1.it('should ignore <script> elements inside of elements with ngNonBindable', function () {
                testing_internal_1.expect(humanizeTplAst(parse('<div ngNonBindable><script></script>a</div>', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.AttrAst, 'ngNonBindable', ''], [template_ast_1.TextAst, 'a']]);
            });
            testing_internal_1.it('should ignore <style> elements inside of elements with ngNonBindable', function () {
                testing_internal_1.expect(humanizeTplAst(parse('<div ngNonBindable><style></style>a</div>', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.AttrAst, 'ngNonBindable', ''], [template_ast_1.TextAst, 'a']]);
            });
            testing_internal_1.it('should ignore <link rel="stylesheet"> elements inside of elements with ngNonBindable', function () {
                testing_internal_1.expect(humanizeTplAst(parse('<div ngNonBindable><link rel="stylesheet">a</div>', []))).toEqual([[template_ast_1.ElementAst, 'div'], [template_ast_1.AttrAst, 'ngNonBindable', ''], [template_ast_1.TextAst, 'a']]);
            });
            testing_internal_1.it('should convert <ng-content> elements into regular elements inside of elements with ngNonBindable', function () {
                testing_internal_1.expect(humanizeTplAst(parse('<div ngNonBindable><ng-content></ng-content>a</div>', [])))
                    .toEqual([
                    [template_ast_1.ElementAst, 'div'], [template_ast_1.AttrAst, 'ngNonBindable', ''], [template_ast_1.ElementAst, 'ng-content'],
                    [template_ast_1.TextAst, 'a']
                ]);
            });
        });
        testing_internal_1.describe('source spans', function () {
            testing_internal_1.it('should support ng-content', function () {
                var parsed = parse('<ng-content select="a">', []);
                testing_internal_1.expect(humanizeTplAstSourceSpans(parsed)).toEqual([
                    [template_ast_1.NgContentAst, '<ng-content select="a">']
                ]);
            });
            testing_internal_1.it('should support embedded template', function () {
                testing_internal_1.expect(humanizeTplAstSourceSpans(parse('<template></template>', []))).toEqual([[template_ast_1.EmbeddedTemplateAst, '<template>']]);
            });
            testing_internal_1.it('should support element and attributes', function () {
                testing_internal_1.expect(humanizeTplAstSourceSpans(parse('<div key=value>', []))).toEqual([
                    [template_ast_1.ElementAst, 'div', '<div key=value>'], [template_ast_1.AttrAst, 'key', 'value', 'key=value']
                ]);
            });
            testing_internal_1.it('should support references', function () {
                testing_internal_1.expect(humanizeTplAstSourceSpans(parse('<div #a></div>', []))).toEqual([[template_ast_1.ElementAst, 'div', '<div #a>'], [template_ast_1.ReferenceAst, 'a', null, '#a']]);
            });
            testing_internal_1.it('should support variables', function () {
                testing_internal_1.expect(humanizeTplAstSourceSpans(parse('<template let-a="b"></template>', []))).toEqual([
                    [template_ast_1.EmbeddedTemplateAst, '<template let-a="b">'], [template_ast_1.VariableAst, 'a', 'b', 'let-a="b"']
                ]);
            });
            testing_internal_1.it('should support events', function () {
                testing_internal_1.expect(humanizeTplAstSourceSpans(parse('<div (window:event)="v">', []))).toEqual([
                    [template_ast_1.ElementAst, 'div', '<div (window:event)="v">'],
                    [template_ast_1.BoundEventAst, 'event', 'window', 'v', '(window:event)="v"']
                ]);
            });
            testing_internal_1.it('should support element property', function () {
                testing_internal_1.expect(humanizeTplAstSourceSpans(parse('<div [someProp]="v">', []))).toEqual([
                    [template_ast_1.ElementAst, 'div', '<div [someProp]="v">'],
                    [
                        template_ast_1.BoundElementPropertyAst, template_ast_1.PropertyBindingType.Property, 'someProp', 'v', null,
                        '[someProp]="v"'
                    ]
                ]);
            });
            testing_internal_1.it('should support bound text', function () {
                testing_internal_1.expect(humanizeTplAstSourceSpans(parse('{{a}}', []))).toEqual([[template_ast_1.BoundTextAst, '{{ a }}', '{{a}}']]);
            });
            testing_internal_1.it('should support text nodes', function () {
                testing_internal_1.expect(humanizeTplAstSourceSpans(parse('a', []))).toEqual([[template_ast_1.TextAst, 'a', 'a']]);
            });
            testing_internal_1.it('should support directive', function () {
                var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                    selector: '[a]',
                    type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' })
                });
                var comp = compile_metadata_1.CompileDirectiveMetadata.create({
                    selector: 'div',
                    isComponent: true,
                    type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'ZComp' }),
                    template: new compile_metadata_1.CompileTemplateMetadata({ ngContentSelectors: [] })
                });
                testing_internal_1.expect(humanizeTplAstSourceSpans(parse('<div a>', [dirA, comp]))).toEqual([
                    [template_ast_1.ElementAst, 'div', '<div a>'], [template_ast_1.AttrAst, 'a', '', 'a'], [template_ast_1.DirectiveAst, dirA, '<div a>'],
                    [template_ast_1.DirectiveAst, comp, '<div a>']
                ]);
            });
            testing_internal_1.it('should support directive in namespace', function () {
                var tagSel = compile_metadata_1.CompileDirectiveMetadata.create({
                    selector: 'circle',
                    type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'elDir' })
                });
                var attrSel = compile_metadata_1.CompileDirectiveMetadata.create({
                    selector: '[href]',
                    type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'attrDir' })
                });
                testing_internal_1.expect(humanizeTplAstSourceSpans(parse('<svg><circle /><use xlink:href="Port" /></svg>', [tagSel, attrSel])))
                    .toEqual([
                    [template_ast_1.ElementAst, ':svg:svg', '<svg>'],
                    [template_ast_1.ElementAst, ':svg:circle', '<circle />'],
                    [template_ast_1.DirectiveAst, tagSel, '<circle />'],
                    [template_ast_1.ElementAst, ':svg:use', '<use xlink:href="Port" />'],
                    [template_ast_1.AttrAst, ':xlink:href', 'Port', 'xlink:href="Port"'],
                    [template_ast_1.DirectiveAst, attrSel, '<use xlink:href="Port" />'],
                ]);
            });
            testing_internal_1.it('should support directive property', function () {
                var dirA = compile_metadata_1.CompileDirectiveMetadata.create({
                    selector: 'div',
                    type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' }),
                    inputs: ['aProp']
                });
                testing_internal_1.expect(humanizeTplAstSourceSpans(parse('<div [aProp]="foo"></div>', [dirA]))).toEqual([
                    [template_ast_1.ElementAst, 'div', '<div [aProp]="foo">'], [template_ast_1.DirectiveAst, dirA, '<div [aProp]="foo">'],
                    [template_ast_1.BoundDirectivePropertyAst, 'aProp', 'foo', '[aProp]="foo"']
                ]);
            });
        });
        testing_internal_1.describe('pipes', function () {
            testing_internal_1.it('should allow pipes that have been defined as dependencies', function () {
                var testPipe = new compile_metadata_1.CompilePipeMetadata({
                    name: 'test',
                    type: new compile_metadata_1.CompileTypeMetadata({ moduleUrl: someModuleUrl, name: 'DirA' })
                });
                testing_internal_1.expect(function () { return parse('{{a | test}}', [], [testPipe]); }).not.toThrow();
            });
            testing_internal_1.it('should report pipes as error that have not been defined as dependencies', function () {
                testing_internal_1.expect(function () { return parse('{{a | test}}', []); }).toThrowError("Template parse errors:\nThe pipe 'test' could not be found (\"[ERROR ->]{{a | test}}\"): TestComp@0:0");
            });
        });
        testing_internal_1.describe('ICU messages', function () {
            testing_internal_1.it('should expand plural messages', function () {
                var shortForm = '{ count, plural, =0 {small} many {big} }';
                var expandedForm = '<ng-container [ngPlural]="count">' +
                    '<template ngPluralCase="=0">small</template>' +
                    '<template ngPluralCase="many">big</template>' +
                    '</ng-container>';
                testing_internal_1.expect(humanizeTplAst(parse(shortForm, []))).toEqual(humanizeTplAst(parse(expandedForm, [])));
            });
            testing_internal_1.it('should expand other messages', function () {
                var shortForm = '{ sex, gender, =f {foo} other {bar} }';
                var expandedForm = '<ng-container [ngSwitch]="sex">' +
                    '<template ngSwitchCase="=f">foo</template>' +
                    '<template ngSwitchCase="other">bar</template>' +
                    '</ng-container>';
                testing_internal_1.expect(humanizeTplAst(parse(shortForm, []))).toEqual(humanizeTplAst(parse(expandedForm, [])));
            });
            testing_internal_1.it('should be possible to escape ICU messages', function () {
                var escapedForm = 'escaped {{ "{" }}  }';
                testing_internal_1.expect(humanizeTplAst(parse(escapedForm, []))).toEqual([
                    [template_ast_1.BoundTextAst, 'escaped {{ "{" }}  }'],
                ]);
            });
        });
    });
}
exports.main = main;
function humanizeTplAst(templateAsts, interpolationConfig) {
    var humanizer = new TemplateHumanizer(false, interpolationConfig);
    template_ast_1.templateVisitAll(humanizer, templateAsts);
    return humanizer.result;
}
function humanizeTplAstSourceSpans(templateAsts, interpolationConfig) {
    var humanizer = new TemplateHumanizer(true, interpolationConfig);
    template_ast_1.templateVisitAll(humanizer, templateAsts);
    return humanizer.result;
}
var TemplateHumanizer = (function () {
    function TemplateHumanizer(includeSourceSpan, interpolationConfig) {
        if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
        this.includeSourceSpan = includeSourceSpan;
        this.interpolationConfig = interpolationConfig;
        this.result = [];
    }
    ;
    TemplateHumanizer.prototype.visitNgContent = function (ast, context) {
        var res = [template_ast_1.NgContentAst];
        this.result.push(this._appendContext(ast, res));
        return null;
    };
    TemplateHumanizer.prototype.visitEmbeddedTemplate = function (ast, context) {
        var res = [template_ast_1.EmbeddedTemplateAst];
        this.result.push(this._appendContext(ast, res));
        template_ast_1.templateVisitAll(this, ast.attrs);
        template_ast_1.templateVisitAll(this, ast.outputs);
        template_ast_1.templateVisitAll(this, ast.references);
        template_ast_1.templateVisitAll(this, ast.variables);
        template_ast_1.templateVisitAll(this, ast.directives);
        template_ast_1.templateVisitAll(this, ast.children);
        return null;
    };
    TemplateHumanizer.prototype.visitElement = function (ast, context) {
        var res = [template_ast_1.ElementAst, ast.name];
        this.result.push(this._appendContext(ast, res));
        template_ast_1.templateVisitAll(this, ast.attrs);
        template_ast_1.templateVisitAll(this, ast.inputs);
        template_ast_1.templateVisitAll(this, ast.outputs);
        template_ast_1.templateVisitAll(this, ast.references);
        template_ast_1.templateVisitAll(this, ast.directives);
        template_ast_1.templateVisitAll(this, ast.children);
        return null;
    };
    TemplateHumanizer.prototype.visitReference = function (ast, context) {
        var res = [template_ast_1.ReferenceAst, ast.name, ast.value];
        this.result.push(this._appendContext(ast, res));
        return null;
    };
    TemplateHumanizer.prototype.visitVariable = function (ast, context) {
        var res = [template_ast_1.VariableAst, ast.name, ast.value];
        this.result.push(this._appendContext(ast, res));
        return null;
    };
    TemplateHumanizer.prototype.visitEvent = function (ast, context) {
        var res = [template_ast_1.BoundEventAst, ast.name, ast.target, unparser_1.unparse(ast.handler, this.interpolationConfig)];
        this.result.push(this._appendContext(ast, res));
        return null;
    };
    TemplateHumanizer.prototype.visitElementProperty = function (ast, context) {
        var res = [
            template_ast_1.BoundElementPropertyAst, ast.type, ast.name, unparser_1.unparse(ast.value, this.interpolationConfig),
            ast.unit
        ];
        this.result.push(this._appendContext(ast, res));
        return null;
    };
    TemplateHumanizer.prototype.visitAttr = function (ast, context) {
        var res = [template_ast_1.AttrAst, ast.name, ast.value];
        this.result.push(this._appendContext(ast, res));
        return null;
    };
    TemplateHumanizer.prototype.visitBoundText = function (ast, context) {
        var res = [template_ast_1.BoundTextAst, unparser_1.unparse(ast.value, this.interpolationConfig)];
        this.result.push(this._appendContext(ast, res));
        return null;
    };
    TemplateHumanizer.prototype.visitText = function (ast, context) {
        var res = [template_ast_1.TextAst, ast.value];
        this.result.push(this._appendContext(ast, res));
        return null;
    };
    TemplateHumanizer.prototype.visitDirective = function (ast, context) {
        var res = [template_ast_1.DirectiveAst, ast.directive];
        this.result.push(this._appendContext(ast, res));
        template_ast_1.templateVisitAll(this, ast.inputs);
        template_ast_1.templateVisitAll(this, ast.hostProperties);
        template_ast_1.templateVisitAll(this, ast.hostEvents);
        return null;
    };
    TemplateHumanizer.prototype.visitDirectiveProperty = function (ast, context) {
        var res = [
            template_ast_1.BoundDirectivePropertyAst, ast.directiveName, unparser_1.unparse(ast.value, this.interpolationConfig)
        ];
        this.result.push(this._appendContext(ast, res));
        return null;
    };
    TemplateHumanizer.prototype._appendContext = function (ast, input) {
        if (!this.includeSourceSpan)
            return input;
        input.push(ast.sourceSpan.toString());
        return input;
    };
    return TemplateHumanizer;
}());
function sourceInfo(ast) {
    return ast.sourceSpan + ": " + ast.sourceSpan.start;
}
function humanizeContentProjection(templateAsts) {
    var humanizer = new TemplateContentProjectionHumanizer();
    template_ast_1.templateVisitAll(humanizer, templateAsts);
    return humanizer.result;
}
var TemplateContentProjectionHumanizer = (function () {
    function TemplateContentProjectionHumanizer() {
        this.result = [];
    }
    TemplateContentProjectionHumanizer.prototype.visitNgContent = function (ast, context) {
        this.result.push(['ng-content', ast.ngContentIndex]);
        return null;
    };
    TemplateContentProjectionHumanizer.prototype.visitEmbeddedTemplate = function (ast, context) {
        this.result.push(['template', ast.ngContentIndex]);
        template_ast_1.templateVisitAll(this, ast.children);
        return null;
    };
    TemplateContentProjectionHumanizer.prototype.visitElement = function (ast, context) {
        this.result.push([ast.name, ast.ngContentIndex]);
        template_ast_1.templateVisitAll(this, ast.children);
        return null;
    };
    TemplateContentProjectionHumanizer.prototype.visitReference = function (ast, context) { return null; };
    TemplateContentProjectionHumanizer.prototype.visitVariable = function (ast, context) { return null; };
    TemplateContentProjectionHumanizer.prototype.visitEvent = function (ast, context) { return null; };
    TemplateContentProjectionHumanizer.prototype.visitElementProperty = function (ast, context) { return null; };
    TemplateContentProjectionHumanizer.prototype.visitAttr = function (ast, context) { return null; };
    TemplateContentProjectionHumanizer.prototype.visitBoundText = function (ast, context) {
        this.result.push([("#text(" + unparser_1.unparse(ast.value) + ")"), ast.ngContentIndex]);
        return null;
    };
    TemplateContentProjectionHumanizer.prototype.visitText = function (ast, context) {
        this.result.push([("#text(" + ast.value + ")"), ast.ngContentIndex]);
        return null;
    };
    TemplateContentProjectionHumanizer.prototype.visitDirective = function (ast, context) { return null; };
    TemplateContentProjectionHumanizer.prototype.visitDirectiveProperty = function (ast, context) { return null; };
    return TemplateContentProjectionHumanizer;
}());
var FooAstTransformer = (function () {
    function FooAstTransformer() {
    }
    FooAstTransformer.prototype.visitNgContent = function (ast, context) { throw 'not implemented'; };
    FooAstTransformer.prototype.visitEmbeddedTemplate = function (ast, context) { throw 'not implemented'; };
    FooAstTransformer.prototype.visitElement = function (ast, context) {
        if (ast.name != 'div')
            return ast;
        return new template_ast_1.ElementAst('foo', [], [], [], [], [], [], false, [], ast.ngContentIndex, ast.sourceSpan);
    };
    FooAstTransformer.prototype.visitReference = function (ast, context) { throw 'not implemented'; };
    FooAstTransformer.prototype.visitVariable = function (ast, context) { throw 'not implemented'; };
    FooAstTransformer.prototype.visitEvent = function (ast, context) { throw 'not implemented'; };
    FooAstTransformer.prototype.visitElementProperty = function (ast, context) { throw 'not implemented'; };
    FooAstTransformer.prototype.visitAttr = function (ast, context) { throw 'not implemented'; };
    FooAstTransformer.prototype.visitBoundText = function (ast, context) { throw 'not implemented'; };
    FooAstTransformer.prototype.visitText = function (ast, context) { throw 'not implemented'; };
    FooAstTransformer.prototype.visitDirective = function (ast, context) { throw 'not implemented'; };
    FooAstTransformer.prototype.visitDirectiveProperty = function (ast, context) {
        throw 'not implemented';
    };
    return FooAstTransformer;
}());
var BarAstTransformer = (function (_super) {
    __extends(BarAstTransformer, _super);
    function BarAstTransformer() {
        _super.apply(this, arguments);
    }
    BarAstTransformer.prototype.visitElement = function (ast, context) {
        if (ast.name != 'foo')
            return ast;
        return new template_ast_1.ElementAst('bar', [], [], [], [], [], [], false, [], ast.ngContentIndex, ast.sourceSpan);
    };
    return BarAstTransformer;
}(FooAstTransformer));
var ArrayConsole = (function () {
    function ArrayConsole() {
        this.logs = [];
        this.warnings = [];
    }
    ArrayConsole.prototype.log = function (msg) { this.logs.push(msg); };
    ArrayConsole.prototype.warn = function (msg) { this.warnings.push(msg); };
    return ArrayConsole;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVtcGxhdGVfcGFyc2VyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3QvdGVtcGxhdGVfcGFyc2VyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsaUNBQTRNLHdDQUF3QyxDQUFDLENBQUE7QUFDclAsNENBQXVDLDBEQUEwRCxDQUFDLENBQUE7QUFDbEcsd0NBQW9DLHNEQUFzRCxDQUFDLENBQUE7QUFDM0YsNkJBQWlTLG9DQUFvQyxDQUFDLENBQUE7QUFDdFUsZ0NBQWdFLHVDQUF1QyxDQUFDLENBQUE7QUFDeEcsd0JBQWlDLDJCQUEyQixDQUFDLENBQUE7QUFDN0QscUJBQThCLGVBQWUsQ0FBQyxDQUFBO0FBQzlDLHdCQUFzQiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ2xELHdCQUFnQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3hELGlDQUE0Ryx3Q0FBd0MsQ0FBQyxDQUFBO0FBRXJKLDRCQUEyQyxvQkFBb0IsQ0FBQyxDQUFBO0FBQ2hFLHFDQUFnRSw2QkFBNkIsQ0FBQyxDQUFBO0FBRTlGLHlCQUFzQiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3JELDhCQUFzQyxpQkFBaUIsQ0FBQyxDQUFBO0FBRXhELElBQUksYUFBYSxHQUFHLG9CQUFvQixDQUFDO0FBRXpDLElBQUksb0JBQW9CLEdBQUcsQ0FBQztRQUMxQixPQUFPLEVBQUUsK0NBQXFCO1FBQzlCLFFBQVEsRUFBRSxJQUFJLDRCQUFrQixDQUFDLEVBQUMsYUFBYSxFQUFFLEtBQUssRUFBQyxFQUFFLEVBQUMsWUFBWSxFQUFFLFlBQVksRUFBQyxDQUFDO0tBQ3ZGLENBQUMsQ0FBQztBQUVIO0lBQ0UsSUFBSSxJQUE4QixDQUFDO0lBQ25DLElBQUksS0FFaUIsQ0FBQztJQUN0QixJQUFJLE9BQXFCLENBQUM7SUFFMUI7UUFDRSw2QkFBVSxDQUFDO1lBQ1QsT0FB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QUM7b0JBQzNDLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBQyxTQUFTLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLEVBQUMsQ0FBQyxDQUFDO29CQUNwRSxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLEVBQUMsSUFBSSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUMsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLEtBQUssR0FDTyxLQUFLLENBQUMsa0NBQWtDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0UseUJBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkMseUJBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNwRSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1Qyx5QkFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDMUQseUJBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUMseUJBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQzFELHlCQUFNLENBQUMsS0FB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