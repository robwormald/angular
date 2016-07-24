/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var static_reflector_1 = require('@angular/compiler-cli/src/static_reflector');
var core_1 = require('@angular/core');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var collection_1 = require('@angular/facade/src/collection');
var lang_1 = require('@angular/facade/src/lang');
var tsc_wrapped_1 = require('@angular/tsc-wrapped');
var ts = require('typescript');
// This matches .ts files but not .d.ts files.
var TS_EXT = /(^.|(?!\.d)..)\.ts$/;
testing_internal_1.describe('StaticReflector', function () {
    var noContext = new static_reflector_1.StaticSymbol('', '');
    var host;
    var reflector;
    testing_internal_1.beforeEach(function () {
        host = new MockReflectorHost();
        reflector = new static_reflector_1.StaticReflector(host);
    });
    function simplify(context, value) {
        return reflector.simplify(context, value);
    }
    testing_internal_1.it('should get annotations for NgFor', function () {
        var NgFor = host.findDeclaration('angular2/src/common/directives/ng_for', 'NgFor');
        var annotations = reflector.annotations(NgFor);
        testing_internal_1.expect(annotations.length).toEqual(1);
        var annotation = annotations[0];
        testing_internal_1.expect(annotation.selector).toEqual('[ngFor][ngForOf]');
        testing_internal_1.expect(annotation.inputs).toEqual(['ngForTrackBy', 'ngForOf', 'ngForTemplate']);
    });
    testing_internal_1.it('should get constructor for NgFor', function () {
        var NgFor = host.findDeclaration('angular2/src/common/directives/ng_for', 'NgFor');
        var ViewContainerRef = host.findDeclaration('angular2/src/core/linker/view_container_ref', 'ViewContainerRef');
        var TemplateRef = host.findDeclaration('angular2/src/core/linker/template_ref', 'TemplateRef');
        var IterableDiffers = host.findDeclaration('angular2/src/core/change_detection/differs/iterable_differs', 'IterableDiffers');
        var ChangeDetectorRef = host.findDeclaration('angular2/src/core/change_detection/change_detector_ref', 'ChangeDetectorRef');
        var parameters = reflector.parameters(NgFor);
        testing_internal_1.expect(parameters).toEqual([
            [ViewContainerRef], [TemplateRef], [IterableDiffers], [ChangeDetectorRef]
        ]);
    });
    testing_internal_1.it('should get annotations for HeroDetailComponent', function () {
        var HeroDetailComponent = host.findDeclaration('src/app/hero-detail.component', 'HeroDetailComponent');
        var annotations = reflector.annotations(HeroDetailComponent);
        testing_internal_1.expect(annotations.length).toEqual(1);
        var annotation = annotations[0];
        testing_internal_1.expect(annotation.selector).toEqual('my-hero-detail');
        testing_internal_1.expect(annotation.directives).toEqual([[host.findDeclaration('angular2/src/common/directives/ng_for', 'NgFor')]]);
        testing_internal_1.expect(annotation.animations).toEqual([core_1.trigger('myAnimation', [
                core_1.state('state1', core_1.style({ 'background': 'white' })),
                core_1.transition('* => *', core_1.sequence([core_1.group([core_1.animate('1s 0.5s', core_1.keyframes([core_1.style({ 'background': 'blue' }), core_1.style({ 'background': 'red' })]))])]))
            ])]);
    });
    testing_internal_1.it('should throw and exception for unsupported metadata versions', function () {
        var e = host.findDeclaration('src/version-error', 'e');
        testing_internal_1.expect(function () { return reflector.annotations(e); })
            .toThrow(new Error('Metadata version mismatch for module /tmp/src/version-error.d.ts, found version 100, expected 1'));
    });
    testing_internal_1.it('should get and empty annotation list for an unknown class', function () {
        var UnknownClass = host.findDeclaration('src/app/app.component', 'UnknownClass');
        var annotations = reflector.annotations(UnknownClass);
        testing_internal_1.expect(annotations).toEqual([]);
    });
    testing_internal_1.it('should get propMetadata for HeroDetailComponent', function () {
        var HeroDetailComponent = host.findDeclaration('src/app/hero-detail.component', 'HeroDetailComponent');
        var props = reflector.propMetadata(HeroDetailComponent);
        testing_internal_1.expect(props['hero']).toBeTruthy();
    });
    testing_internal_1.it('should get an empty object from propMetadata for an unknown class', function () {
        var UnknownClass = host.findDeclaration('src/app/app.component', 'UnknownClass');
        var properties = reflector.propMetadata(UnknownClass);
        testing_internal_1.expect(properties).toEqual({});
    });
    testing_internal_1.it('should get empty parameters list for an unknown class ', function () {
        var UnknownClass = host.findDeclaration('src/app/app.component', 'UnknownClass');
        var parameters = reflector.parameters(UnknownClass);
        testing_internal_1.expect(parameters).toEqual([]);
    });
    testing_internal_1.it('should provide context for errors reported by the collector', function () {
        var SomeClass = host.findDeclaration('src/error-reporting', 'SomeClass');
        testing_internal_1.expect(function () { return reflector.annotations(SomeClass); })
            .toThrow(new Error('Error encountered resolving symbol values statically. A reasonable error message (position 13:34 in the original .ts file), resolving symbol ErrorSym in /tmp/src/error-references.d.ts, resolving symbol Link2 in /tmp/src/error-references.d.ts, resolving symbol Link1 in /tmp/src/error-references.d.ts, resolving symbol SomeClass in /tmp/src/error-reporting.d.ts, resolving symbol SomeClass in /tmp/src/error-reporting.d.ts'));
    });
    testing_internal_1.it('should simplify primitive into itself', function () {
        testing_internal_1.expect(simplify(noContext, 1)).toBe(1);
        testing_internal_1.expect(simplify(noContext, true)).toBe(true);
        testing_internal_1.expect(simplify(noContext, 'some value')).toBe('some value');
    });
    testing_internal_1.it('should simplify an array into a copy of the array', function () {
        testing_internal_1.expect(simplify(noContext, [1, 2, 3])).toEqual([1, 2, 3]);
    });
    testing_internal_1.it('should simplify an object to a copy of the object', function () {
        var expr = { a: 1, b: 2, c: 3 };
        testing_internal_1.expect(simplify(noContext, expr)).toEqual(expr);
    });
    testing_internal_1.it('should simplify &&', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '&&', left: true, right: true })))
            .toBe(true);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '&&', left: true, right: false })))
            .toBe(false);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '&&', left: false, right: true })))
            .toBe(false);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '&&', left: false, right: false })))
            .toBe(false);
    });
    testing_internal_1.it('should simplify ||', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '||', left: true, right: true })))
            .toBe(true);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '||', left: true, right: false })))
            .toBe(true);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '||', left: false, right: true })))
            .toBe(true);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '||', left: false, right: false })))
            .toBe(false);
    });
    testing_internal_1.it('should simplify &', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '&', left: 0x22, right: 0x0F })))
            .toBe(0x22 & 0x0F);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '&', left: 0x22, right: 0xF0 })))
            .toBe(0x22 & 0xF0);
    });
    testing_internal_1.it('should simplify |', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '|', left: 0x22, right: 0x0F })))
            .toBe(0x22 | 0x0F);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '|', left: 0x22, right: 0xF0 })))
            .toBe(0x22 | 0xF0);
    });
    testing_internal_1.it('should simplify ^', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '|', left: 0x22, right: 0x0F })))
            .toBe(0x22 | 0x0F);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '|', left: 0x22, right: 0xF0 })))
            .toBe(0x22 | 0xF0);
    });
    testing_internal_1.it('should simplify ==', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '==', left: 0x22, right: 0x22 })))
            .toBe(0x22 == 0x22);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '==', left: 0x22, right: 0xF0 })))
            .toBe(0x22 == 0xF0);
    });
    testing_internal_1.it('should simplify !=', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '!=', left: 0x22, right: 0x22 })))
            .toBe(0x22 != 0x22);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '!=', left: 0x22, right: 0xF0 })))
            .toBe(0x22 != 0xF0);
    });
    testing_internal_1.it('should simplify ===', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '===', left: 0x22, right: 0x22 })))
            .toBe(0x22 === 0x22);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '===', left: 0x22, right: 0xF0 })))
            .toBe(0x22 === 0xF0);
    });
    testing_internal_1.it('should simplify !==', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '!==', left: 0x22, right: 0x22 })))
            .toBe(0x22 !== 0x22);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '!==', left: 0x22, right: 0xF0 })))
            .toBe(0x22 !== 0xF0);
    });
    testing_internal_1.it('should simplify >', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '>', left: 1, right: 1 })))
            .toBe(1 > 1);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '>', left: 1, right: 0 })))
            .toBe(1 > 0);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '>', left: 0, right: 1 })))
            .toBe(0 > 1);
    });
    testing_internal_1.it('should simplify >=', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '>=', left: 1, right: 1 })))
            .toBe(1 >= 1);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '>=', left: 1, right: 0 })))
            .toBe(1 >= 0);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '>=', left: 0, right: 1 })))
            .toBe(0 >= 1);
    });
    testing_internal_1.it('should simplify <=', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '<=', left: 1, right: 1 })))
            .toBe(1 <= 1);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '<=', left: 1, right: 0 })))
            .toBe(1 <= 0);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '<=', left: 0, right: 1 })))
            .toBe(0 <= 1);
    });
    testing_internal_1.it('should simplify <', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '<', left: 1, right: 1 })))
            .toBe(1 < 1);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '<', left: 1, right: 0 })))
            .toBe(1 < 0);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '<', left: 0, right: 1 })))
            .toBe(0 < 1);
    });
    testing_internal_1.it('should simplify <<', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '<<', left: 0x55, right: 2 })))
            .toBe(0x55 << 2);
    });
    testing_internal_1.it('should simplify >>', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '>>', left: 0x55, right: 2 })))
            .toBe(0x55 >> 2);
    });
    testing_internal_1.it('should simplify +', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '+', left: 0x55, right: 2 })))
            .toBe(0x55 + 2);
    });
    testing_internal_1.it('should simplify -', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '-', left: 0x55, right: 2 })))
            .toBe(0x55 - 2);
    });
    testing_internal_1.it('should simplify *', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '*', left: 0x55, right: 2 })))
            .toBe(0x55 * 2);
    });
    testing_internal_1.it('should simplify /', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '/', left: 0x55, right: 2 })))
            .toBe(0x55 / 2);
    });
    testing_internal_1.it('should simplify %', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'binop', operator: '%', left: 0x55, right: 2 })))
            .toBe(0x55 % 2);
    });
    testing_internal_1.it('should simplify prefix -', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'pre', operator: '-', operand: 2 }))).toBe(-2);
    });
    testing_internal_1.it('should simplify prefix ~', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'pre', operator: '~', operand: 2 }))).toBe(~2);
    });
    testing_internal_1.it('should simplify prefix !', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'pre', operator: '!', operand: true }))).toBe(!true);
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'pre', operator: '!', operand: false }))).toBe(!false);
    });
    testing_internal_1.it('should simplify an array index', function () {
        testing_internal_1.expect(simplify(noContext, ({ __symbolic: 'index', expression: [1, 2, 3], index: 2 }))).toBe(3);
    });
    testing_internal_1.it('should simplify an object index', function () {
        var expr = { __symbolic: 'select', expression: { a: 1, b: 2, c: 3 }, member: 'b' };
        testing_internal_1.expect(simplify(noContext, expr)).toBe(2);
    });
    testing_internal_1.it('should simplify a module reference', function () {
        testing_internal_1.expect(simplify(new static_reflector_1.StaticSymbol('/src/cases', ''), ({ __symbolic: 'reference', module: './extern', name: 's' })))
            .toEqual('s');
    });
    testing_internal_1.it('should simplify a non existing reference as a static symbol', function () {
        testing_internal_1.expect(simplify(new static_reflector_1.StaticSymbol('/src/cases', ''), ({ __symbolic: 'reference', module: './extern', name: 'nonExisting' })))
            .toEqual(host.getStaticSymbol('/src/extern.d.ts', 'nonExisting'));
    });
    testing_internal_1.it('should simplify a function reference as a static symbol', function () {
        testing_internal_1.expect(simplify(new static_reflector_1.StaticSymbol('/src/cases', 'myFunction'), ({ __symbolic: 'function', parameters: ['a'], value: [] })))
            .toEqual(host.getStaticSymbol('/src/cases', 'myFunction'));
    });
    testing_internal_1.it('should simplify values initialized with a function call', function () {
        testing_internal_1.expect(simplify(new static_reflector_1.StaticSymbol('/tmp/src/function-reference.ts', ''), {
            __symbolic: 'reference',
            name: 'one'
        })).toEqual(['some-value']);
        testing_internal_1.expect(simplify(new static_reflector_1.StaticSymbol('/tmp/src/function-reference.ts', ''), {
            __symbolic: 'reference',
            name: 'two'
        })).toEqual(2);
    });
    testing_internal_1.it('should error on direct recursive calls', function () {
        testing_internal_1.expect(function () { return simplify(new static_reflector_1.StaticSymbol('/tmp/src/function-reference.ts', ''), { __symbolic: 'reference', name: 'recursion' }); })
            .toThrow(new Error('Recursion not supported, resolving symbol recursion in /tmp/src/function-reference.ts, resolving symbol  in /tmp/src/function-reference.ts'));
    });
    testing_internal_1.it('should error on indirect recursive calls', function () {
        testing_internal_1.expect(function () { return simplify(new static_reflector_1.StaticSymbol('/tmp/src/function-reference.ts', ''), { __symbolic: 'reference', name: 'indirectRecursion' }); })
            .toThrow(new Error('Recursion not supported, resolving symbol indirectRecursion in /tmp/src/function-reference.ts, resolving symbol  in /tmp/src/function-reference.ts'));
    });
    testing_internal_1.it('should simplify a spread expression', function () {
        testing_internal_1.expect(simplify(new static_reflector_1.StaticSymbol('/tmp/src/spread.ts', ''), {
            __symbolic: 'reference',
            name: 'spread'
        })).toEqual([0, 1, 2, 3, 4, 5]);
    });
    testing_internal_1.it('should be able to get metadata from a ts file', function () {
        var metadata = reflector.getModuleMetadata('/tmp/src/custom-decorator-reference.ts');
        testing_internal_1.expect(metadata).toEqual({
            __symbolic: 'module',
            version: 1,
            metadata: {
                Foo: {
                    __symbolic: 'class',
                    decorators: [{
                            __symbolic: 'call',
                            expression: { __symbolic: 'reference', module: './custom-decorator', name: 'CustomDecorator' }
                        }],
                    members: {
                        foo: [{
                                __symbolic: 'property',
                                decorators: [{
                                        __symbolic: 'call',
                                        expression: {
                                            __symbolic: 'reference',
                                            module: './custom-decorator',
                                            name: 'CustomDecorator'
                                        }
                                    }]
                            }]
                    }
                }
            }
        });
    });
    testing_internal_1.it('should be able to get metadata for a class containing a custom decorator', function () {
        var props = reflector.propMetadata(host.getStaticSymbol('/tmp/src/custom-decorator-reference.ts', 'Foo'));
        testing_internal_1.expect(props).toEqual({ foo: [] });
    });
    testing_internal_1.it('should report an error for invalid function calls', function () {
        testing_internal_1.expect(function () {
            return reflector.annotations(host.getStaticSymbol('/tmp/src/invalid-calls.ts', 'MyComponent'));
        })
            .toThrow(new Error("Error encountered resolving symbol values statically. Calling function 'someFunction', function calls are not supported. Consider replacing the function or lambda with a reference to an exported function, resolving symbol MyComponent in /tmp/src/invalid-calls.ts, resolving symbol MyComponent in /tmp/src/invalid-calls.ts"));
    });
});
var MockReflectorHost = (function () {
    function MockReflectorHost() {
        this.staticTypeCache = new Map();
        this.collector = new tsc_wrapped_1.MetadataCollector();
    }
    MockReflectorHost.prototype.angularImportLocations = function () {
        return {
            coreDecorators: 'angular2/src/core/metadata',
            diDecorators: 'angular2/src/core/di/decorators',
            diMetadata: 'angular2/src/core/di/metadata',
            diOpaqueToken: 'angular2/src/core/di/opaque_token',
            animationMetadata: 'angular2/src/core/animation/metadata',
            provider: 'angular2/src/core/di/provider'
        };
    };
    MockReflectorHost.prototype.getStaticSymbol = function (declarationFile, name) {
        var cacheKey = declarationFile + ":" + name;
        var result = this.staticTypeCache.get(cacheKey);
        if (lang_1.isBlank(result)) {
            result = new static_reflector_1.StaticSymbol(declarationFile, name);
            this.staticTypeCache.set(cacheKey, result);
        }
        return result;
    };
    // In tests, assume that symbols are not re-exported
    MockReflectorHost.prototype.findDeclaration = function (modulePath, symbolName, containingFile) {
        function splitPath(path) { return path.split(/\/|\\/g); }
        function resolvePath(pathParts) {
            var result = [];
            collection_1.ListWrapper.forEachWithIndex(pathParts, function (part, index) {
                switch (part) {
                    case '':
                    case '.':
                        if (index > 0)
                            return;
                        break;
                    case '..':
                        if (index > 0 && result.length != 0)
                            result.pop();
                        return;
                }
                result.push(part);
            });
            return result.join('/');
        }
        function pathTo(from, to) {
            var result = to;
            if (to.startsWith('.')) {
                var fromParts = splitPath(from);
                fromParts.pop(); // remove the file name.
                var toParts = splitPath(to);
                result = resolvePath(fromParts.concat(toParts));
            }
            return result;
        }
        if (modulePath.indexOf('.') === 0) {
            return this.getStaticSymbol(pathTo(containingFile, modulePath) + '.d.ts', symbolName);
        }
        return this.getStaticSymbol('/tmp/' + modulePath + '.d.ts', symbolName);
    };
    MockReflectorHost.prototype.getMetadataFor = function (moduleId) {
        var data = {
            '/tmp/angular2/src/common/forms-deprecated/directives.d.ts': [{
                    '__symbolic': 'module',
                    'version': 1,
                    'metadata': {
                        'FORM_DIRECTIVES': [
                            {
                                '__symbolic': 'reference',
                                'name': 'NgFor',
                                'module': 'angular2/src/common/directives/ng_for'
                            }
                        ]
                    }
                }],
            '/tmp/angular2/src/common/directives/ng_for.d.ts': {
                '__symbolic': 'module',
                'version': 1,
                'metadata': {
                    'NgFor': {
                        '__symbolic': 'class',
                        'decorators': [
                            {
                                '__symbolic': 'call',
                                'expression': {
                                    '__symbolic': 'reference',
                                    'name': 'Directive',
                                    'module': '../../core/metadata'
                                },
                                'arguments': [
                                    {
                                        'selector': '[ngFor][ngForOf]',
                                        'inputs': ['ngForTrackBy', 'ngForOf', 'ngForTemplate']
                                    }
                                ]
                            }
                        ],
                        'members': {
                            '__ctor__': [
                                {
                                    '__symbolic': 'constructor',
                                    'parameters': [
                                        {
                                            '__symbolic': 'reference',
                                            'module': '../../core/linker/view_container_ref',
                                            'name': 'ViewContainerRef'
                                        },
                                        {
                                            '__symbolic': 'reference',
                                            'module': '../../core/linker/template_ref',
                                            'name': 'TemplateRef'
                                        },
                                        {
                                            '__symbolic': 'reference',
                                            'module': '../../core/change_detection/differs/iterable_differs',
                                            'name': 'IterableDiffers'
                                        },
                                        {
                                            '__symbolic': 'reference',
                                            'module': '../../core/change_detection/change_detector_ref',
                                            'name': 'ChangeDetectorRef'
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            '/tmp/angular2/src/core/linker/view_container_ref.d.ts': { version: 1, 'metadata': { 'ViewContainerRef': { '__symbolic': 'class' } } },
            '/tmp/angular2/src/core/linker/template_ref.d.ts': { version: 1, 'module': './template_ref', 'metadata': { 'TemplateRef': { '__symbolic': 'class' } } },
            '/tmp/angular2/src/core/change_detection/differs/iterable_differs.d.ts': { version: 1, 'metadata': { 'IterableDiffers': { '__symbolic': 'class' } } },
            '/tmp/angular2/src/core/change_detection/change_detector_ref.d.ts': { version: 1, 'metadata': { 'ChangeDetectorRef': { '__symbolic': 'class' } } },
            '/tmp/src/app/hero-detail.component.d.ts': {
                '__symbolic': 'module',
                'version': 1,
                'metadata': {
                    'HeroDetailComponent': {
                        '__symbolic': 'class',
                        'decorators': [
                            {
                                '__symbolic': 'call',
                                'expression': {
                                    '__symbolic': 'reference',
                                    'name': 'Component',
                                    'module': 'angular2/src/core/metadata'
                                },
                                'arguments': [
                                    {
                                        'selector': 'my-hero-detail',
                                        'template': '\n  <div *ngIf="hero">\n    <h2>{{hero.name}} details!</h2>\n    <div><label>id: </label>{{hero.id}}</div>\n    <div>\n      <label>name: </label>\n      <input [(ngModel)]="hero.name" placeholder="name"/>\n    </div>\n  </div>\n',
                                        'directives': [
                                            {
                                                '__symbolic': 'reference',
                                                'name': 'FORM_DIRECTIVES',
                                                'module': 'angular2/src/common/forms-deprecated/directives'
                                            }
                                        ],
                                        'animations': [{
                                                '__symbolic': 'call',
                                                'expression': {
                                                    '__symbolic': 'reference',
                                                    'name': 'trigger',
                                                    'module': 'angular2/src/core/animation/metadata'
                                                },
                                                'arguments': [
                                                    'myAnimation',
                                                    [{ '__symbolic': 'call',
                                                            'expression': {
                                                                '__symbolic': 'reference',
                                                                'name': 'state',
                                                                'module': 'angular2/src/core/animation/metadata'
                                                            },
                                                            'arguments': [
                                                                'state1',
                                                                { '__symbolic': 'call',
                                                                    'expression': {
                                                                        '__symbolic': 'reference',
                                                                        'name': 'style',
                                                                        'module': 'angular2/src/core/animation/metadata'
                                                                    },
                                                                    'arguments': [
                                                                        { 'background': 'white' }
                                                                    ]
                                                                }
                                                            ]
                                                        }, {
                                                            '__symbolic': 'call',
                                                            'expression': {
                                                                '__symbolic': 'reference',
                                                                'name': 'transition',
                                                                'module': 'angular2/src/core/animation/metadata'
                                                            },
                                                            'arguments': [
                                                                '* => *',
                                                                {
                                                                    '__symbolic': 'call',
                                                                    'expression': {
                                                                        '__symbolic': 'reference',
                                                                        'name': 'sequence',
                                                                        'module': 'angular2/src/core/animation/metadata'
                                                                    },
                                                                    'arguments': [[{ '__symbolic': 'call',
                                                                                'expression': {
                                                                                    '__symbolic': 'reference',
                                                                                    'name': 'group',
                                                                                    'module': 'angular2/src/core/animation/metadata'
                                                                                },
                                                                                'arguments': [[{
                                                                                            '__symbolic': 'call',
                                                                                            'expression': {
                                                                                                '__symbolic': 'reference',
                                                                                                'name': 'animate',
                                                                                                'module': 'angular2/src/core/animation/metadata'
                                                                                            },
                                                                                            'arguments': [
                                                                                                '1s 0.5s',
                                                                                                { '__symbolic': 'call',
                                                                                                    'expression': {
                                                                                                        '__symbolic': 'reference',
                                                                                                        'name': 'keyframes',
                                                                                                        'module': 'angular2/src/core/animation/metadata'
                                                                                                    },
                                                                                                    'arguments': [[{ '__symbolic': 'call',
                                                                                                                'expression': {
                                                                                                                    '__symbolic': 'reference',
                                                                                                                    'name': 'style',
                                                                                                                    'module': 'angular2/src/core/animation/metadata'
                                                                                                                },
                                                                                                                'arguments': [{ 'background': 'blue' }]
                                                                                                            }, {
                                                                                                                '__symbolic': 'call',
                                                                                                                'expression': {
                                                                                                                    '__symbolic': 'reference',
                                                                                                                    'name': 'style',
                                                                                                                    'module': 'angular2/src/core/animation/metadata'
                                                                                                                },
                                                                                                                'arguments': [{ 'background': 'red' }]
                                                                                                            }]]
                                                                                                }
                                                                                            ]
                                                                                        }]]
                                                                            }]]
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                ]
                                            }]
                                    }]
                            }],
                        'members': {
                            'hero': [
                                {
                                    '__symbolic': 'property',
                                    'decorators': [
                                        {
                                            '__symbolic': 'call',
                                            'expression': {
                                                '__symbolic': 'reference',
                                                'name': 'Input',
                                                'module': 'angular2/src/core/metadata'
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    }
                }
            },
            '/src/extern.d.ts': { '__symbolic': 'module', 'version': 1, metadata: { s: 's' } },
            '/tmp/src/version-error.d.ts': { '__symbolic': 'module', 'version': 100, metadata: { e: 's' } },
            '/tmp/src/error-reporting.d.ts': {
                __symbolic: 'module',
                version: 1,
                metadata: {
                    SomeClass: {
                        __symbolic: 'class',
                        decorators: [
                            {
                                __symbolic: 'call',
                                expression: {
                                    __symbolic: 'reference',
                                    name: 'Component',
                                    module: 'angular2/src/core/metadata'
                                },
                                arguments: [
                                    {
                                        directives: [
                                            {
                                                __symbolic: 'reference',
                                                module: 'src/error-references',
                                                name: 'Link1',
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                    }
                }
            },
            '/tmp/src/error-references.d.ts': {
                __symbolic: 'module',
                version: 1,
                metadata: {
                    Link1: {
                        __symbolic: 'reference',
                        module: 'src/error-references',
                        name: 'Link2'
                    },
                    Link2: {
                        __symbolic: 'reference',
                        module: 'src/error-references',
                        name: 'ErrorSym'
                    },
                    ErrorSym: {
                        __symbolic: 'error',
                        message: 'A reasonable error message',
                        line: 12,
                        character: 33
                    }
                }
            },
            '/tmp/src/function-declaration.d.ts': {
                __symbolic: 'module',
                version: 1,
                metadata: {
                    one: {
                        __symbolic: 'function',
                        parameters: ['a'],
                        value: [
                            { __symbolic: 'reference', name: 'a' }
                        ]
                    },
                    add: {
                        __symbolic: 'function',
                        parameters: ['a', 'b'],
                        value: {
                            __symbolic: 'binop',
                            operator: '+',
                            left: { __symbolic: 'reference', name: 'a' },
                            right: { __symbolic: 'reference', name: 'b' }
                        }
                    }
                }
            },
            '/tmp/src/function-reference.ts': {
                __symbolic: 'module',
                version: 1,
                metadata: {
                    one: {
                        __symbolic: 'call',
                        expression: {
                            __symbolic: 'reference',
                            module: './function-declaration',
                            name: 'one'
                        },
                        arguments: ['some-value']
                    },
                    two: {
                        __symbolic: 'call',
                        expression: {
                            __symbolic: 'reference',
                            module: './function-declaration',
                            name: 'add'
                        },
                        arguments: [1, 1]
                    },
                    recursion: {
                        __symbolic: 'call',
                        expression: {
                            __symbolic: 'reference',
                            module: './function-recursive',
                            name: 'recursive'
                        },
                        arguments: [1]
                    },
                    indirectRecursion: {
                        __symbolic: 'call',
                        expression: {
                            __symbolic: 'reference',
                            module: './function-recursive',
                            name: 'indirectRecursion1'
                        },
                        arguments: [1]
                    }
                }
            },
            '/tmp/src/function-recursive.d.ts': {
                __symbolic: 'modules',
                version: 1,
                metadata: {
                    recursive: {
                        __symbolic: 'function',
                        parameters: ['a'],
                        value: {
                            __symbolic: 'call',
                            expression: {
                                __symbolic: 'reference',
                                module: './function-recursive',
                                name: 'recursive',
                            },
                            arguments: [
                                {
                                    __symbolic: 'reference',
                                    name: 'a'
                                }
                            ]
                        }
                    },
                    indirectRecursion1: {
                        __symbolic: 'function',
                        parameters: ['a'],
                        value: {
                            __symbolic: 'call',
                            expression: {
                                __symbolic: 'reference',
                                module: './function-recursive',
                                name: 'indirectRecursion2',
                            },
                            arguments: [
                                {
                                    __symbolic: 'reference',
                                    name: 'a'
                                }
                            ]
                        }
                    },
                    indirectRecursion2: {
                        __symbolic: 'function',
                        parameters: ['a'],
                        value: {
                            __symbolic: 'call',
                            expression: {
                                __symbolic: 'reference',
                                module: './function-recursive',
                                name: 'indirectRecursion1',
                            },
                            arguments: [
                                {
                                    __symbolic: 'reference',
                                    name: 'a'
                                }
                            ]
                        }
                    }
                },
            },
            '/tmp/src/spread.ts': {
                __symbolic: 'module',
                version: 1,
                metadata: {
                    spread: [0, { __symbolic: 'spread', expression: [1, 2, 3, 4] }, 5]
                }
            },
            '/tmp/src/custom-decorator.ts': "\n        export function CustomDecorator(): any {\n          return () => {};\n        }\n      ",
            '/tmp/src/custom-decorator-reference.ts': "\n        import {CustomDecorator} from './custom-decorator';\n\n        @CustomDecorator()\n        export class Foo {\n          @CustomDecorator() get foo(): string { return ''; }\n        }\n      ",
            '/tmp/src/invalid-calll-definitions.ts': "\n        export function someFunction(a: any) {\n          if (Array.isArray(a)) {\n            return a;\n          }\n          return undefined;\n        }\n      ",
            '/tmp/src/invalid-calls.ts': "\n        import {someFunction} from './nvalid-calll-definitions.ts';\n        import {Component} from 'angular2/src/core/metadata';\n        import {NgIf} from 'angular2/common';\n\n        @Component({\n          selector: 'my-component',\n          directives: [someFunction([NgIf])]\n        })\n        export class MyComponent {}\n\n        @someFunction()\n        @Component({\n          selector: 'my-component',\n          directives: [NgIf]\n        })\n        export class MyOtherComponent { }\n      "
        };
        if (data[moduleId] && moduleId.match(TS_EXT)) {
            var text = data[moduleId];
            if (typeof text === 'string') {
                var sf = ts.createSourceFile(moduleId, data[moduleId], ts.ScriptTarget.ES5);
                var diagnostics = sf.parseDiagnostics;
                if (diagnostics && diagnostics.length) {
                    throw Error("Error encountered during parse of file " + moduleId);
                }
                return this.collector.getMetadata(sf);
            }
        }
        return data[moduleId];
    };
    return MockReflectorHost;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3JlZmxlY3Rvcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci1jbGkvdGVzdC9zdGF0aWNfcmVmbGVjdG9yX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUFpRSw0Q0FBNEMsQ0FBQyxDQUFBO0FBQzlHLHFCQUFxRixlQUFlLENBQUMsQ0FBQTtBQUNyRyxpQ0FBK0Qsd0NBQXdDLENBQUMsQ0FBQTtBQUN4RywyQkFBMEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUMzRCxxQkFBc0IsMEJBQTBCLENBQUMsQ0FBQTtBQUNqRCw0QkFBZ0Msc0JBQXNCLENBQUMsQ0FBQTtBQUN2RCxJQUFZLEVBQUUsV0FBTSxZQUFZLENBQUMsQ0FBQTtBQUdqQyw4Q0FBOEM7QUFDOUMsSUFBTSxNQUFNLEdBQUcscUJBQXFCLENBQUM7QUFFckMsMkJBQVEsQ0FBQyxpQkFBaUIsRUFBRTtJQUMxQixJQUFJLFNBQVMsR0FBRyxJQUFJLCtCQUFZLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLElBQUksSUFBeUIsQ0FBQztJQUM5QixJQUFJLFNBQTBCLENBQUM7SUFFL0IsNkJBQVUsQ0FBQztRQUNULElBQUksR0FBRyxJQUFJLGlCQUFpQixFQUFFLENBQUM7UUFDL0IsU0FBUyxHQUFHLElBQUksa0NBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDLENBQUMsQ0FBQztJQUVILGtCQUFrQixPQUFxQixFQUFFLEtBQVU7UUFDakQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxxQkFBRSxDQUFDLGtDQUFrQyxFQUFFO1FBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsdUNBQXVDLEVBQUUsT0FBTyxDQUFDLENB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QVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEYsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQix5QkFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEYsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQix5QkFBTSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7YUFDbEYsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNwQixDQUFDLENBQUMsQ0FBQztJQUVILHFCQUFFLENBQUMsb0JBQW9CLEVBQUU7UUFDdkIseUJBQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2xGLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIseUJBQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxD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