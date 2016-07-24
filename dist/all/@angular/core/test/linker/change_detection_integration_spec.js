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
var common_1 = require('@angular/common');
var element_schema_registry_1 = require('@angular/compiler/src/schema/element_schema_registry');
var test_bindings_1 = require('@angular/compiler/test/test_bindings');
var core_1 = require('@angular/core');
var debug_renderer_1 = require('@angular/core/src/debug/debug_renderer');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var by_1 = require('@angular/platform-browser/src/dom/debug/by');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var dom_renderer_1 = require('@angular/platform-browser/src/dom/dom_renderer');
var async_1 = require('../../src/facade/async');
var collection_1 = require('../../src/facade/collection');
var exceptions_1 = require('../../src/facade/exceptions');
var lang_1 = require('../../src/facade/lang');
function main() {
    var tcb;
    var elSchema;
    var renderLog;
    var directiveLog;
    function createCompFixture(template, compType, _tcb) {
        if (compType === void 0) { compType = TestComponent; }
        if (_tcb === void 0) { _tcb = null; }
        if (lang_1.isBlank(_tcb)) {
            _tcb = tcb;
        }
        return _tcb
            .overrideView(compType, new core_1.ViewMetadata({ template: template, directives: ALL_DIRECTIVES, pipes: ALL_PIPES }))
            .createFakeAsync(compType);
    }
    function queryDirs(el, dirType) {
        var nodes = el.queryAllNodes(by_1.By.directive(dirType));
        return nodes.map(function (node) { return node.injector.get(dirType); });
    }
    function _bindSimpleProp(bindAttr, compType) {
        if (compType === void 0) { compType = TestComponent; }
        var template = "<div " + bindAttr + "></div>";
        return createCompFixture(template, compType);
    }
    function _bindSimpleValue(expression, compType) {
        if (compType === void 0) { compType = TestComponent; }
        return _bindSimpleProp("[someProp]='" + expression + "'", compType);
    }
    function _bindAndCheckSimpleValue(expression, compType) {
        if (compType === void 0) { compType = TestComponent; }
        var ctx = _bindSimpleValue(expression, compType);
        ctx.detectChanges(false);
        return renderLog.log;
    }
    testing_internal_1.describe("ChangeDetection", function () {
        // On CJS fakeAsync is not supported...
        if (!dom_adapter_1.getDOM().supportsDOMEvents())
            return;
        testing_internal_1.beforeEach(function () {
            testing_1.configureCompiler({ providers: test_bindings_1.TEST_COMPILER_PROVIDERS });
            testing_1.configureModule({
                providers: [RenderLog, DirectiveLog, { provide: core_1.RootRenderer, useClass: LoggingRootRenderer }]
            });
        });
        testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder, element_schema_registry_1.ElementSchemaRegistry, RenderLog, DirectiveLog], function (_tcb, _elSchema, _renderLog, _directiveLog) {
            tcb = _tcb;
            elSchema = _elSchema;
            renderLog = _renderLog;
            directiveLog = _directiveLog;
            elSchema.existingProperties['someProp'] = true;
        }));
        testing_internal_1.describe('expressions', function () {
            testing_internal_1.it('should support literals', testing_1.fakeAsync(function () { testing_internal_1.expect(_bindAndCheckSimpleValue(10)).toEqual(['someProp=10']); }));
            testing_internal_1.it('should strip quotes from literals', testing_1.fakeAsync(function () { testing_internal_1.expect(_bindAndCheckSimpleValue('"str"')).toEqual(['someProp=str']); }));
            testing_internal_1.it('should support newlines in literals', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('"a\n\nb"')).toEqual(['someProp=a\n\nb']);
            }));
            testing_internal_1.it('should support + operations', testing_1.fakeAsync(function () { testing_internal_1.expect(_bindAndCheckSimpleValue('10 + 2')).toEqual(['someProp=12']); }));
            testing_internal_1.it('should support - operations', testing_1.fakeAsync(function () { testing_internal_1.expect(_bindAndCheckSimpleValue('10 - 2')).toEqual(['someProp=8']); }));
            testing_internal_1.it('should support * operations', testing_1.fakeAsync(function () { testing_internal_1.expect(_bindAndCheckSimpleValue('10 * 2')).toEqual(['someProp=20']); }));
            testing_internal_1.it('should support / operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('10 / 2')).toEqual([("someProp=" + 5.0)]);
            })); // dart exp=5.0, js exp=5
            testing_internal_1.it('should support % operations', testing_1.fakeAsync(function () { testing_internal_1.expect(_bindAndCheckSimpleValue('11 % 2')).toEqual(['someProp=1']); }));
            testing_internal_1.it('should support == operations on identical', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('1 == 1')).toEqual(['someProp=true']);
            }));
            testing_internal_1.it('should support != operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('1 != 1')).toEqual(['someProp=false']);
            }));
            testing_internal_1.it('should support == operations on coerceible', testing_1.fakeAsync(function () {
                var expectedValue = lang_1.IS_DART ? 'false' : 'true';
                testing_internal_1.expect(_bindAndCheckSimpleValue('1 == true')).toEqual([("someProp=" + expectedValue)]);
            }));
            testing_internal_1.it('should support === operations on identical', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('1 === 1')).toEqual(['someProp=true']);
            }));
            testing_internal_1.it('should support !== operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('1 !== 1')).toEqual(['someProp=false']);
            }));
            testing_internal_1.it('should support === operations on coerceible', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('1 === true')).toEqual(['someProp=false']);
            }));
            testing_internal_1.it('should support true < operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('1 < 2')).toEqual(['someProp=true']);
            }));
            testing_internal_1.it('should support false < operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('2 < 1')).toEqual(['someProp=false']);
            }));
            testing_internal_1.it('should support false > operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('1 > 2')).toEqual(['someProp=false']);
            }));
            testing_internal_1.it('should support true > operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('2 > 1')).toEqual(['someProp=true']);
            }));
            testing_internal_1.it('should support true <= operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('1 <= 2')).toEqual(['someProp=true']);
            }));
            testing_internal_1.it('should support equal <= operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('2 <= 2')).toEqual(['someProp=true']);
            }));
            testing_internal_1.it('should support false <= operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('2 <= 1')).toEqual(['someProp=false']);
            }));
            testing_internal_1.it('should support true >= operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('2 >= 1')).toEqual(['someProp=true']);
            }));
            testing_internal_1.it('should support equal >= operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('2 >= 2')).toEqual(['someProp=true']);
            }));
            testing_internal_1.it('should support false >= operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('1 >= 2')).toEqual(['someProp=false']);
            }));
            testing_internal_1.it('should support true && operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('true && true')).toEqual(['someProp=true']);
            }));
            testing_internal_1.it('should support false && operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('true && false')).toEqual(['someProp=false']);
            }));
            testing_internal_1.it('should support true || operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('true || false')).toEqual(['someProp=true']);
            }));
            testing_internal_1.it('should support false || operations', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('false || false')).toEqual(['someProp=false']);
            }));
            testing_internal_1.it('should support negate', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('!true')).toEqual(['someProp=false']);
            }));
            testing_internal_1.it('should support double negate', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('!!true')).toEqual(['someProp=true']);
            }));
            testing_internal_1.it('should support true conditionals', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('1 < 2 ? 1 : 2')).toEqual(['someProp=1']);
            }));
            testing_internal_1.it('should support false conditionals', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('1 > 2 ? 1 : 2')).toEqual(['someProp=2']);
            }));
            testing_internal_1.it('should support keyed access to a list item', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('["foo", "bar"][0]')).toEqual(['someProp=foo']);
            }));
            testing_internal_1.it('should support keyed access to a map item', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('{"foo": "bar"}["foo"]')).toEqual(['someProp=bar']);
            }));
            testing_internal_1.it('should report all changes on the first run including uninitialized values', testing_1.fakeAsync(function () {
                testing_internal_1.expect(_bindAndCheckSimpleValue('value', Uninitialized)).toEqual(['someProp=null']);
            }));
            testing_internal_1.it('should report all changes on the first run including null values', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('a', TestData);
                ctx.componentInstance.a = null;
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.log).toEqual(['someProp=null']);
            }));
            testing_internal_1.it('should support simple chained property access', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('address.city', Person);
                ctx.componentInstance.name = 'Victor';
                ctx.componentInstance.address = new Address('Grenoble');
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.log).toEqual(['someProp=Grenoble']);
            }));
            testing_internal_1.describe('safe navigation operator', function () {
                testing_internal_1.it('should support reading properties of nulls', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('address?.city', Person);
                    ctx.componentInstance.address = null;
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.log).toEqual(['someProp=null']);
                }));
                testing_internal_1.it('should support calling methods on nulls', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('address?.toString()', Person);
                    ctx.componentInstance.address = null;
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.log).toEqual(['someProp=null']);
                }));
                testing_internal_1.it('should support reading properties on non nulls', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('address?.city', Person);
                    ctx.componentInstance.address = new Address('MTV');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.log).toEqual(['someProp=MTV']);
                }));
                testing_internal_1.it('should support calling methods on non nulls', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('address?.toString()', Person);
                    ctx.componentInstance.address = new Address('MTV');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.log).toEqual(['someProp=MTV']);
                }));
                testing_internal_1.it('should support short-circuting safe navigation', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('value?.address.city', PersonHolder);
                    ctx.componentInstance.value = null;
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.log).toEqual(['someProp=null']);
                }));
                testing_internal_1.it('should support nested short-circuting safe navigation', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('value.value?.address.city', PersonHolderHolder);
                    ctx.componentInstance.value = new PersonHolder();
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.log).toEqual(['someProp=null']);
                }));
                testing_internal_1.it('should support chained short-circuting safe navigation', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('value?.value?.address.city', PersonHolderHolder);
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.log).toEqual(['someProp=null']);
                }));
                testing_internal_1.it('should still throw if right-side would throw', testing_1.fakeAsync(function () {
                    testing_internal_1.expect(function () {
                        var ctx = _bindSimpleValue('value?.address.city', PersonHolder);
                        var person = new Person();
                        person.address = null;
                        ctx.componentInstance.value = person;
                        ctx.detectChanges(false);
                    }).toThrow();
                }));
            });
            testing_internal_1.it('should support method calls', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('sayHi("Jim")', Person);
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.log).toEqual(['someProp=Hi, Jim']);
            }));
            testing_internal_1.it('should support function calls', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('a()(99)', TestData);
                ctx.componentInstance.a = function () { return function (a) { return a; }; };
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.log).toEqual(['someProp=99']);
            }));
            testing_internal_1.it('should support chained method calls', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('address.toString()', Person);
                ctx.componentInstance.address = new Address('MTV');
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.log).toEqual(['someProp=MTV']);
            }));
            testing_internal_1.it('should support NaN', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('age', Person);
                ctx.componentInstance.age = lang_1.NumberWrapper.NaN;
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.log).toEqual(['someProp=NaN']);
                renderLog.clear();
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.log).toEqual([]);
            }));
            testing_internal_1.it('should do simple watching', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('name', Person);
                ctx.componentInstance.name = 'misko';
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.log).toEqual(['someProp=misko']);
                renderLog.clear();
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.log).toEqual([]);
                renderLog.clear();
                ctx.componentInstance.name = 'Misko';
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.log).toEqual(['someProp=Misko']);
            }));
            testing_internal_1.it('should support literal array made of literals', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('[1, 2]');
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.loggedValues).toEqual([[1, 2]]);
            }));
            testing_internal_1.it('should support empty literal array', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('[]');
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.loggedValues).toEqual([[]]);
            }));
            testing_internal_1.it('should support literal array made of expressions', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('[1, a]', TestData);
                ctx.componentInstance.a = 2;
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.loggedValues).toEqual([[1, 2]]);
            }));
            testing_internal_1.it('should not recreate literal arrays unless their content changed', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('[1, a]', TestData);
                ctx.componentInstance.a = 2;
                ctx.detectChanges(false);
                ctx.detectChanges(false);
                ctx.componentInstance.a = 3;
                ctx.detectChanges(false);
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.loggedValues).toEqual([[1, 2], [1, 3]]);
            }));
            testing_internal_1.it('should support literal maps made of literals', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('{z: 1}');
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.loggedValues[0]['z']).toEqual(1);
            }));
            testing_internal_1.it('should support empty literal map', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('{}');
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.loggedValues).toEqual([{}]);
            }));
            testing_internal_1.it('should support literal maps made of expressions', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('{z: a}');
                ctx.componentInstance.a = 1;
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.loggedValues[0]['z']).toEqual(1);
            }));
            testing_internal_1.it('should not recreate literal maps unless their content changed', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('{z: a}');
                ctx.componentInstance.a = 1;
                ctx.detectChanges(false);
                ctx.detectChanges(false);
                ctx.componentInstance.a = 2;
                ctx.detectChanges(false);
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.loggedValues.length).toBe(2);
                testing_internal_1.expect(renderLog.loggedValues[0]['z']).toEqual(1);
                testing_internal_1.expect(renderLog.loggedValues[1]['z']).toEqual(2);
            }));
            testing_internal_1.it('should support interpolation', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleProp('someProp="B{{a}}A"', TestData);
                ctx.componentInstance.a = 'value';
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.log).toEqual(['someProp=BvalueA']);
            }));
            testing_internal_1.it('should output empty strings for null values in interpolation', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleProp('someProp="B{{a}}A"', TestData);
                ctx.componentInstance.a = null;
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.log).toEqual(['someProp=BA']);
            }));
            testing_internal_1.it('should escape values in literals that indicate interpolation', testing_1.fakeAsync(function () { testing_internal_1.expect(_bindAndCheckSimpleValue('"$"')).toEqual(['someProp=$']); }));
            testing_internal_1.it('should read locals', testing_1.fakeAsync(function () {
                var ctx = createCompFixture('<template testLocals let-local="someLocal">{{local}}</template>');
                ctx.detectChanges(false);
                testing_internal_1.expect(renderLog.log).toEqual(['{{someLocalValue}}']);
            }));
            testing_internal_1.describe('pipes', function () {
                testing_internal_1.it('should use the return value of the pipe', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('name | countingPipe', Person);
                    ctx.componentInstance.name = 'bob';
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual(['bob state:0']);
                }));
                testing_internal_1.it('should support arguments in pipes', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('name | multiArgPipe:"one":address.city', Person);
                    ctx.componentInstance.name = 'value';
                    ctx.componentInstance.address = new Address('two');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual(['value one two default']);
                }));
                testing_internal_1.it('should associate pipes right-to-left', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('name | multiArgPipe:"a":"b" | multiArgPipe:0:1', Person);
                    ctx.componentInstance.name = 'value';
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual(['value a b default 0 1 default']);
                }));
                testing_internal_1.it('should support calling pure pipes with different number of arguments', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('name | multiArgPipe:"a":"b" | multiArgPipe:0:1:2', Person);
                    ctx.componentInstance.name = 'value';
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual(['value a b default 0 1 2']);
                }));
                testing_internal_1.it('should do nothing when no change', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('"Megatron" | identityPipe', Person);
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.log).toEqual(['someProp=Megatron']);
                    renderLog.clear();
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.log).toEqual([]);
                }));
                testing_internal_1.it('should unwrap the wrapped value', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('"Megatron" | wrappedPipe', Person);
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.log).toEqual(['someProp=Megatron']);
                    renderLog.clear();
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.log).toEqual(['someProp=Megatron']);
                }));
                testing_internal_1.it('should call pure pipes only if the arguments change', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('name | countingPipe', Person);
                    // change from undefined -> null
                    ctx.componentInstance.name = null;
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual(['null state:0']);
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual(['null state:0']);
                    // change from null -> some value
                    ctx.componentInstance.name = 'bob';
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual(['null state:0', 'bob state:1']);
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual(['null state:0', 'bob state:1']);
                    // change from some value -> some other value
                    ctx.componentInstance.name = 'bart';
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual([
                        'null state:0', 'bob state:1', 'bart state:2'
                    ]);
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual([
                        'null state:0', 'bob state:1', 'bart state:2'
                    ]);
                }));
                testing_internal_1.it('should call pure pipes that are used multiple times only when the arguments change', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture("<div [someProp]=\"name | countingPipe\"></div><div [someProp]=\"age | countingPipe\"></div>" +
                        '<div *ngFor="let x of [1,2]" [someProp]="address.city | countingPipe"></div>', Person);
                    ctx.componentInstance.name = 'a';
                    ctx.componentInstance.age = 10;
                    ctx.componentInstance.address = new Address('mtv');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual([
                        'mtv state:0', 'mtv state:1', 'a state:2', '10 state:3'
                    ]);
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual([
                        'mtv state:0', 'mtv state:1', 'a state:2', '10 state:3'
                    ]);
                    ctx.componentInstance.age = 11;
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual([
                        'mtv state:0', 'mtv state:1', 'a state:2', '10 state:3', '11 state:4'
                    ]);
                }));
                testing_internal_1.it('should call impure pipes on each change detection run', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleValue('name | countingImpurePipe', Person);
                    ctx.componentInstance.name = 'bob';
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual(['bob state:0']);
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual(['bob state:0', 'bob state:1']);
                }));
            });
            testing_internal_1.describe('event expressions', function () {
                testing_internal_1.it('should support field assignments', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleProp('(event)="b=a=$event"');
                    var childEl = ctx.debugElement.children[0];
                    var evt = 'EVENT';
                    childEl.triggerEventHandler('event', evt);
                    testing_internal_1.expect(ctx.componentInstance.a).toEqual(evt);
                    testing_internal_1.expect(ctx.componentInstance.b).toEqual(evt);
                }));
                testing_internal_1.it('should support keyed assignments', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleProp('(event)="a[0]=$event"');
                    var childEl = ctx.debugElement.children[0];
                    ctx.componentInstance.a = ['OLD'];
                    var evt = 'EVENT';
                    childEl.triggerEventHandler('event', evt);
                    testing_internal_1.expect(ctx.componentInstance.a).toEqual([evt]);
                }));
                testing_internal_1.it('should support chains', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleProp('(event)="a=a+1; a=a+1;"');
                    var childEl = ctx.debugElement.children[0];
                    ctx.componentInstance.a = 0;
                    childEl.triggerEventHandler('event', 'EVENT');
                    testing_internal_1.expect(ctx.componentInstance.a).toEqual(2);
                }));
                testing_internal_1.it('should throw when trying to assign to a local', testing_1.fakeAsync(function () {
                    testing_internal_1.expect(function () {
                        _bindSimpleProp('(event)="$event=1"');
                    }).toThrowError(new RegExp('Cannot assign to a reference or variable!'));
                }));
                testing_internal_1.it('should support short-circuiting', testing_1.fakeAsync(function () {
                    var ctx = _bindSimpleProp('(event)="true ? a = a + 1 : a = a + 1"');
                    var childEl = ctx.debugElement.children[0];
                    ctx.componentInstance.a = 0;
                    childEl.triggerEventHandler('event', 'EVENT');
                    testing_internal_1.expect(ctx.componentInstance.a).toEqual(1);
                }));
            });
        });
        testing_internal_1.describe('change notification', function () {
            testing_internal_1.describe('updating directives', function () {
                testing_internal_1.it('should happen without invoking the renderer', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective [a]="42"></div>');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.log).toEqual([]);
                    testing_internal_1.expect(queryDirs(ctx.debugElement, TestDirective)[0].a).toEqual(42);
                }));
            });
            testing_internal_1.describe('reading directives', function () {
                testing_internal_1.it('should read directive properties', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective [a]="42" ref-dir="testDirective" [someProp]="dir.a"></div>');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(renderLog.loggedValues).toEqual([42]);
                }));
            });
            testing_internal_1.describe('ngOnChanges', function () {
                testing_internal_1.it('should notify the directive when a group of records changes', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div [testDirective]="\'aName\'" [a]="1" [b]="2"></div><div [testDirective]="\'bName\'" [a]="4"></div>');
                    ctx.detectChanges(false);
                    var dirs = queryDirs(ctx.debugElement, TestDirective);
                    testing_internal_1.expect(dirs[0].changes).toEqual({ 'a': 1, 'b': 2, 'name': 'aName' });
                    testing_internal_1.expect(dirs[1].changes).toEqual({ 'a': 4, 'name': 'bName' });
                }));
            });
        });
        testing_internal_1.describe('lifecycle', function () {
            function createCompWithContentAndViewChild() {
                return createCompFixture('<div testDirective="parent"><div *ngIf="true" testDirective="contentChild"></div><other-cmp></other-cmp></div>', TestComponent, tcb.overrideTemplate(AnotherComponent, '<div testDirective="viewChild"></div>'));
            }
            testing_internal_1.describe('ngOnInit', function () {
                testing_internal_1.it('should be called after ngOnChanges', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="dir"></div>');
                    testing_internal_1.expect(directiveLog.filter(['ngOnInit', 'ngOnChanges'])).toEqual([]);
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngOnInit', 'ngOnChanges'])).toEqual([
                        'dir.ngOnChanges', 'dir.ngOnInit'
                    ]);
                    directiveLog.clear();
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngOnInit'])).toEqual([]);
                }));
                testing_internal_1.it('should only be called only once', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngOnInit'])).toEqual(['dir.ngOnInit']);
                    // reset directives
                    directiveLog.clear();
                    // Verify that checking should not call them.
                    ctx.checkNoChanges();
                    testing_internal_1.expect(directiveLog.filter(['ngOnInit'])).toEqual([]);
                    // re-verify that changes should not call them
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngOnInit'])).toEqual([]);
                }));
                testing_internal_1.it('should not call ngOnInit again if it throws', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="dir" throwOn="ngOnInit"></div>');
                    var errored = false;
                    // First pass fails, but ngOnInit should be called.
                    try {
                        ctx.detectChanges(false);
                    }
                    catch (e) {
                        errored = true;
                    }
                    testing_internal_1.expect(errored).toBe(true);
                    testing_internal_1.expect(directiveLog.filter(['ngOnInit'])).toEqual(['dir.ngOnInit']);
                    directiveLog.clear();
                    // Second change detection also fails, but this time ngOnInit should not be called.
                    try {
                        ctx.detectChanges(false);
                    }
                    catch (e) {
                        throw new exceptions_1.BaseException('Second detectChanges() should not have run detection.');
                    }
                    testing_internal_1.expect(directiveLog.filter(['ngOnInit'])).toEqual([]);
                }));
            });
            testing_internal_1.describe('ngDoCheck', function () {
                testing_internal_1.it('should be called after ngOnInit', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngDoCheck', 'ngOnInit'])).toEqual([
                        'dir.ngOnInit', 'dir.ngDoCheck'
                    ]);
                }));
                testing_internal_1.it('should be called on every detectChanges run, except for checkNoChanges', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngDoCheck'])).toEqual(['dir.ngDoCheck']);
                    // reset directives
                    directiveLog.clear();
                    // Verify that checking should not call them.
                    ctx.checkNoChanges();
                    testing_internal_1.expect(directiveLog.filter(['ngDoCheck'])).toEqual([]);
                    // re-verify that changes are still detected
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngDoCheck'])).toEqual(['dir.ngDoCheck']);
                }));
            });
            testing_internal_1.describe('ngAfterContentInit', function () {
                testing_internal_1.it('should be called after processing the content children but before the view children', testing_1.fakeAsync(function () {
                    var ctx = createCompWithContentAndViewChild();
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngDoCheck', 'ngAfterContentInit'])).toEqual([
                        'parent.ngDoCheck', 'contentChild.ngDoCheck', 'contentChild.ngAfterContentInit',
                        'parent.ngAfterContentInit', 'viewChild.ngDoCheck', 'viewChild.ngAfterContentInit'
                    ]);
                }));
                testing_internal_1.it('should only be called only once', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngAfterContentInit'])).toEqual([
                        'dir.ngAfterContentInit'
                    ]);
                    // reset directives
                    directiveLog.clear();
                    // Verify that checking should not call them.
                    ctx.checkNoChanges();
                    testing_internal_1.expect(directiveLog.filter(['ngAfterContentInit'])).toEqual([]);
                    // re-verify that changes should not call them
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngAfterContentInit'])).toEqual([]);
                }));
                testing_internal_1.it('should not call ngAfterContentInit again if it throws', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="dir" throwOn="ngAfterContentInit"></div>');
                    var errored = false;
                    // First pass fails, but ngAfterContentInit should be called.
                    try {
                        ctx.detectChanges(false);
                    }
                    catch (e) {
                        errored = true;
                    }
                    testing_internal_1.expect(errored).toBe(true);
                    testing_internal_1.expect(directiveLog.filter(['ngAfterContentInit'])).toEqual([
                        'dir.ngAfterContentInit'
                    ]);
                    directiveLog.clear();
                    // Second change detection also fails, but this time ngAfterContentInit should not be
                    // called.
                    try {
                        ctx.detectChanges(false);
                    }
                    catch (e) {
                        throw new exceptions_1.BaseException('Second detectChanges() should not have run detection.');
                    }
                    testing_internal_1.expect(directiveLog.filter(['ngAfterContentInit'])).toEqual([]);
                }));
            });
            testing_internal_1.describe('ngAfterContentChecked', function () {
                testing_internal_1.it('should be called after the content children but before the view children', testing_1.fakeAsync(function () {
                    var ctx = createCompWithContentAndViewChild();
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngDoCheck', 'ngAfterContentChecked'])).toEqual([
                        'parent.ngDoCheck', 'contentChild.ngDoCheck', 'contentChild.ngAfterContentChecked',
                        'parent.ngAfterContentChecked', 'viewChild.ngDoCheck',
                        'viewChild.ngAfterContentChecked'
                    ]);
                }));
                testing_internal_1.it('should be called on every detectChanges run, except for checkNoChanges', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngAfterContentChecked'])).toEqual([
                        'dir.ngAfterContentChecked'
                    ]);
                    // reset directives
                    directiveLog.clear();
                    // Verify that checking should not call them.
                    ctx.checkNoChanges();
                    testing_internal_1.expect(directiveLog.filter(['ngAfterContentChecked'])).toEqual([]);
                    // re-verify that changes are still detected
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngAfterContentChecked'])).toEqual([
                        'dir.ngAfterContentChecked'
                    ]);
                }));
                testing_internal_1.it('should be called in reverse order so the child is always notified before the parent', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="parent"><div testDirective="child"></div></div>');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngAfterContentChecked'])).toEqual([
                        'child.ngAfterContentChecked', 'parent.ngAfterContentChecked'
                    ]);
                }));
            });
            testing_internal_1.describe('ngAfterViewInit', function () {
                testing_internal_1.it('should be called after processing the view children', testing_1.fakeAsync(function () {
                    var ctx = createCompWithContentAndViewChild();
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngDoCheck', 'ngAfterViewInit'])).toEqual([
                        'parent.ngDoCheck', 'contentChild.ngDoCheck', 'contentChild.ngAfterViewInit',
                        'viewChild.ngDoCheck', 'viewChild.ngAfterViewInit', 'parent.ngAfterViewInit'
                    ]);
                }));
                testing_internal_1.it('should only be called only once', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngAfterViewInit'])).toEqual(['dir.ngAfterViewInit']);
                    // reset directives
                    directiveLog.clear();
                    // Verify that checking should not call them.
                    ctx.checkNoChanges();
                    testing_internal_1.expect(directiveLog.filter(['ngAfterViewInit'])).toEqual([]);
                    // re-verify that changes should not call them
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngAfterViewInit'])).toEqual([]);
                }));
                testing_internal_1.it('should not call ngAfterViewInit again if it throws', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="dir" throwOn="ngAfterViewInit"></div>');
                    var errored = false;
                    // First pass fails, but ngAfterViewInit should be called.
                    try {
                        ctx.detectChanges(false);
                    }
                    catch (e) {
                        errored = true;
                    }
                    testing_internal_1.expect(errored).toBe(true);
                    testing_internal_1.expect(directiveLog.filter(['ngAfterViewInit'])).toEqual(['dir.ngAfterViewInit']);
                    directiveLog.clear();
                    // Second change detection also fails, but this time ngAfterViewInit should not be
                    // called.
                    try {
                        ctx.detectChanges(false);
                    }
                    catch (e) {
                        throw new exceptions_1.BaseException('Second detectChanges() should not have run detection.');
                    }
                    testing_internal_1.expect(directiveLog.filter(['ngAfterViewInit'])).toEqual([]);
                }));
            });
            testing_internal_1.describe('ngAfterViewChecked', function () {
                testing_internal_1.it('should be called after processing the view children', testing_1.fakeAsync(function () {
                    var ctx = createCompWithContentAndViewChild();
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngDoCheck', 'ngAfterViewChecked'])).toEqual([
                        'parent.ngDoCheck', 'contentChild.ngDoCheck', 'contentChild.ngAfterViewChecked',
                        'viewChild.ngDoCheck', 'viewChild.ngAfterViewChecked', 'parent.ngAfterViewChecked'
                    ]);
                }));
                testing_internal_1.it('should be called on every detectChanges run, except for checkNoChanges', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngAfterViewChecked'])).toEqual([
                        'dir.ngAfterViewChecked'
                    ]);
                    // reset directives
                    directiveLog.clear();
                    // Verify that checking should not call them.
                    ctx.checkNoChanges();
                    testing_internal_1.expect(directiveLog.filter(['ngAfterViewChecked'])).toEqual([]);
                    // re-verify that changes are still detected
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngAfterViewChecked'])).toEqual([
                        'dir.ngAfterViewChecked'
                    ]);
                }));
                testing_internal_1.it('should be called in reverse order so the child is always notified before the parent', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="parent"><div testDirective="child"></div></div>');
                    ctx.detectChanges(false);
                    testing_internal_1.expect(directiveLog.filter(['ngAfterViewChecked'])).toEqual([
                        'child.ngAfterViewChecked', 'parent.ngAfterViewChecked'
                    ]);
                }));
            });
            testing_internal_1.describe('ngOnDestroy', function () {
                testing_internal_1.it('should be called on view destruction', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="dir"></div>');
                    ctx.detectChanges(false);
                    ctx.destroy();
                    testing_internal_1.expect(directiveLog.filter(['ngOnDestroy'])).toEqual(['dir.ngOnDestroy']);
                }));
                testing_internal_1.it('should be called after processing the content and view children', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="parent"><div *ngFor="let x of [0,1]" testDirective="contentChild{{x}}"></div>' +
                        '<other-cmp></other-cmp></div>', TestComponent, tcb.overrideTemplate(AnotherComponent, '<div testDirective="viewChild"></div>'));
                    ctx.detectChanges(false);
                    ctx.destroy();
                    testing_internal_1.expect(directiveLog.filter(['ngOnDestroy'])).toEqual([
                        'contentChild0.ngOnDestroy', 'contentChild1.ngOnDestroy', 'viewChild.ngOnDestroy',
                        'parent.ngOnDestroy'
                    ]);
                }));
                testing_internal_1.it('should be called in reverse order so the child is always notified before the parent', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('<div testDirective="parent"><div testDirective="child"></div></div>');
                    ctx.detectChanges(false);
                    ctx.destroy();
                    testing_internal_1.expect(directiveLog.filter(['ngOnDestroy'])).toEqual([
                        'child.ngOnDestroy', 'parent.ngOnDestroy'
                    ]);
                }));
                testing_internal_1.it('should call ngOnDestory on pipes', testing_1.fakeAsync(function () {
                    var ctx = createCompFixture('{{true | pipeWithOnDestroy }}');
                    ctx.detectChanges(false);
                    ctx.destroy();
                    testing_internal_1.expect(directiveLog.filter(['ngOnDestroy'])).toEqual([
                        'pipeWithOnDestroy.ngOnDestroy'
                    ]);
                }));
            });
        });
        testing_internal_1.describe('enforce no new changes', function () {
            testing_internal_1.it('should throw when a record gets changed after it has been checked', testing_1.fakeAsync(function () {
                var ctx = createCompFixture('<div [someProp]="a"></div>', TestData);
                ctx.componentInstance.a = 1;
                testing_internal_1.expect(function () { return ctx.checkNoChanges(); })
                    .toThrowError(/:0:5[\s\S]*Expression has changed after it was checked./g);
            }));
            testing_internal_1.it('should warn when the view has been created in a cd hook', testing_1.fakeAsync(function () {
                var ctx = createCompFixture('<div *gh9882>{{ a }}</div>', TestData);
                ctx.componentInstance.a = 1;
                testing_internal_1.expect(function () { return ctx.detectChanges(); })
                    .toThrowError(/It seems like the view has been created after its parent and its children have been dirty checked/);
            }));
            testing_internal_1.it('should not throw when two arrays are structurally the same', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('a', TestData);
                ctx.componentInstance.a = ['value'];
                ctx.detectChanges(false);
                ctx.componentInstance.a = ['value'];
                testing_internal_1.expect(function () { return ctx.checkNoChanges(); }).not.toThrow();
            }));
            testing_internal_1.it('should not break the next run', testing_1.fakeAsync(function () {
                var ctx = _bindSimpleValue('a', TestData);
                ctx.componentInstance.a = 'value';
                testing_internal_1.expect(function () { return ctx.checkNoChanges(); }).toThrow();
                ctx.detectChanges();
                testing_internal_1.expect(renderLog.loggedValues).toEqual(['value']);
            }));
        });
        testing_internal_1.describe('mode', function () {
            testing_internal_1.it('Detached', testing_1.fakeAsync(function () {
                var ctx = createCompFixture('<comp-with-ref></comp-with-ref>');
                var cmp = queryDirs(ctx.debugElement, CompWithRef)[0];
                cmp.value = 'hello';
                cmp.changeDetectorRef.detach();
                ctx.detectChanges();
                testing_internal_1.expect(renderLog.log).toEqual([]);
            }));
            testing_internal_1.it('Reattaches', testing_1.fakeAsync(function () {
                var ctx = createCompFixture('<comp-with-ref></comp-with-ref>');
                var cmp = queryDirs(ctx.debugElement, CompWithRef)[0];
                cmp.value = 'hello';
                cmp.changeDetectorRef.detach();
                ctx.detectChanges();
                testing_internal_1.expect(renderLog.log).toEqual([]);
                cmp.changeDetectorRef.reattach();
                ctx.detectChanges();
                testing_internal_1.expect(renderLog.log).toEqual(['{{hello}}']);
            }));
            testing_internal_1.it('Reattaches in the original cd mode', testing_1.fakeAsync(function () {
                var ctx = createCompFixture('<push-cmp></push-cmp>');
                var cmp = queryDirs(ctx.debugElement, PushComp)[0];
                cmp.changeDetectorRef.detach();
                cmp.changeDetectorRef.reattach();
                // renderCount should NOT be incremented with each CD as CD mode should be resetted to
                // on-push
                ctx.detectChanges();
                testing_internal_1.expect(cmp.renderCount).toBeGreaterThan(0);
                var count = cmp.renderCount;
                ctx.detectChanges();
                testing_internal_1.expect(cmp.renderCount).toBe(count);
            }));
        });
        testing_internal_1.describe('multi directive order', function () {
            testing_internal_1.it('should follow the DI order for the same element', testing_1.fakeAsync(function () {
                var ctx = createCompFixture('<div orderCheck2="2" orderCheck0="0" orderCheck1="1"></div>');
                ctx.detectChanges(false);
                ctx.destroy();
                testing_internal_1.expect(directiveLog.filter(['set'])).toEqual(['0.set', '1.set', '2.set']);
            }));
        });
    });
}
exports.main = main;
var ALL_DIRECTIVES = [
    core_1.forwardRef(function () { return TestDirective; }),
    core_1.forwardRef(function () { return TestComponent; }),
    core_1.forwardRef(function () { return AnotherComponent; }),
    core_1.forwardRef(function () { return TestLocals; }),
    core_1.forwardRef(function () { return CompWithRef; }),
    core_1.forwardRef(function () { return EmitterDirective; }),
    core_1.forwardRef(function () { return PushComp; }),
    core_1.forwardRef(function () { return OrderCheckDirective2; }),
    core_1.forwardRef(function () { return OrderCheckDirective0; }),
    core_1.forwardRef(function () { return OrderCheckDirective1; }),
    core_1.forwardRef(function () { return Gh9882; }),
    common_1.NgFor,
];
var ALL_PIPES = [
    core_1.forwardRef(function () { return CountingPipe; }),
    core_1.forwardRef(function () { return CountingImpurePipe; }),
    core_1.forwardRef(function () { return MultiArgPipe; }),
    core_1.forwardRef(function () { return PipeWithOnDestroy; }),
    core_1.forwardRef(function () { return IdentityPipe; }),
    core_1.forwardRef(function () { return WrappedPipe; }),
    common_1.AsyncPipe,
];
var RenderLog = (function () {
    function RenderLog() {
        this.log = [];
        this.loggedValues = [];
    }
    RenderLog.prototype.setElementProperty = function (el, propName, propValue) {
        this.log.push(propName + "=" + propValue);
        this.loggedValues.push(propValue);
    };
    RenderLog.prototype.setText = function (node, value) {
        this.log.push("{{" + value + "}}");
        this.loggedValues.push(value);
    };
    RenderLog.prototype.clear = function () {
        this.log = [];
        this.loggedValues = [];
    };
    /** @nocollapse */
    RenderLog.decorators = [
        { type: core_1.Injectable },
    ];
    return RenderLog;
}());
var LoggingRootRenderer = (function () {
    function LoggingRootRenderer(_delegate, _log) {
        this._delegate = _delegate;
        this._log = _log;
    }
    LoggingRootRenderer.prototype.renderComponent = function (componentProto) {
        return new LoggingRenderer(this._delegate.renderComponent(componentProto), this._log);
    };
    /** @nocollapse */
    LoggingRootRenderer.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    LoggingRootRenderer.ctorParameters = [
        { type: dom_renderer_1.DomRootRenderer, },
        { type: RenderLog, },
    ];
    return LoggingRootRenderer;
}());
var LoggingRenderer = (function (_super) {
    __extends(LoggingRenderer, _super);
    function LoggingRenderer(delegate, _log) {
        _super.call(this, delegate);
        this._log = _log;
    }
    LoggingRenderer.prototype.setElementProperty = function (renderElement, propertyName, propertyValue) {
        this._log.setElementProperty(renderElement, propertyName, propertyValue);
        _super.prototype.setElementProperty.call(this, renderElement, propertyName, propertyValue);
    };
    LoggingRenderer.prototype.setText = function (renderNode, value) { this._log.setText(renderNode, value); };
    return LoggingRenderer;
}(debug_renderer_1.DebugDomRenderer));
var DirectiveLogEntry = (function () {
    function DirectiveLogEntry(directiveName, method) {
        this.directiveName = directiveName;
        this.method = method;
    }
    return DirectiveLogEntry;
}());
var DirectiveLog = (function () {
    function DirectiveLog() {
        this.entries = [];
    }
    DirectiveLog.prototype.add = function (directiveName, method) {
        this.entries.push(new DirectiveLogEntry(directiveName, method));
    };
    DirectiveLog.prototype.clear = function () { this.entries = []; };
    DirectiveLog.prototype.filter = function (methods) {
        return this.entries.filter(function (entry) { return methods.indexOf(entry.method) !== -1; })
            .map(function (entry) { return (entry.directiveName + "." + entry.method); });
    };
    /** @nocollapse */
    DirectiveLog.decorators = [
        { type: core_1.Injectable },
    ];
    return DirectiveLog;
}());
var CountingPipe = (function () {
    function CountingPipe() {
        this.state = 0;
    }
    CountingPipe.prototype.transform = function (value) { return value + " state:" + this.state++; };
    /** @nocollapse */
    CountingPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'countingPipe' },] },
    ];
    return CountingPipe;
}());
var CountingImpurePipe = (function () {
    function CountingImpurePipe() {
        this.state = 0;
    }
    CountingImpurePipe.prototype.transform = function (value) { return value + " state:" + this.state++; };
    /** @nocollapse */
    CountingImpurePipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'countingImpurePipe', pure: false },] },
    ];
    return CountingImpurePipe;
}());
var PipeWithOnDestroy = (function () {
    function PipeWithOnDestroy(directiveLog) {
        this.directiveLog = directiveLog;
    }
    PipeWithOnDestroy.prototype.ngOnDestroy = function () { this.directiveLog.add('pipeWithOnDestroy', 'ngOnDestroy'); };
    PipeWithOnDestroy.prototype.transform = function (value) { return null; };
    /** @nocollapse */
    PipeWithOnDestroy.decorators = [
        { type: core_1.Pipe, args: [{ name: 'pipeWithOnDestroy' },] },
    ];
    /** @nocollapse */
    PipeWithOnDestroy.ctorParameters = [
        { type: DirectiveLog, },
    ];
    return PipeWithOnDestroy;
}());
var IdentityPipe = (function () {
    function IdentityPipe() {
    }
    IdentityPipe.prototype.transform = function (value) { return value; };
    /** @nocollapse */
    IdentityPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'identityPipe' },] },
    ];
    return IdentityPipe;
}());
var WrappedPipe = (function () {
    function WrappedPipe() {
    }
    WrappedPipe.prototype.transform = function (value) { return core_1.WrappedValue.wrap(value); };
    /** @nocollapse */
    WrappedPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'wrappedPipe' },] },
    ];
    return WrappedPipe;
}());
var MultiArgPipe = (function () {
    function MultiArgPipe() {
    }
    MultiArgPipe.prototype.transform = function (value, arg1, arg2, arg3) {
        if (arg3 === void 0) { arg3 = 'default'; }
        return value + " " + arg1 + " " + arg2 + " " + arg3;
    };
    /** @nocollapse */
    MultiArgPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'multiArgPipe' },] },
    ];
    return MultiArgPipe;
}());
var TestComponent = (function () {
    function TestComponent() {
    }
    /** @nocollapse */
    TestComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'test-cmp', template: '', directives: ALL_DIRECTIVES, pipes: ALL_PIPES },] },
    ];
    return TestComponent;
}());
var AnotherComponent = (function () {
    function AnotherComponent() {
    }
    /** @nocollapse */
    AnotherComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'other-cmp', directives: ALL_DIRECTIVES, pipes: ALL_PIPES, template: '' },] },
    ];
    return AnotherComponent;
}());
var CompWithRef = (function () {
    function CompWithRef(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
    }
    CompWithRef.prototype.noop = function () { };
    /** @nocollapse */
    CompWithRef.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'comp-with-ref',
                    template: '<div (event)="noop()" emitterDirective></div>{{value}}',
                    host: { 'event': 'noop()' },
                    directives: ALL_DIRECTIVES,
                    pipes: ALL_PIPES
                },] },
    ];
    /** @nocollapse */
    CompWithRef.ctorParameters = [
        { type: core_1.ChangeDetectorRef, },
    ];
    /** @nocollapse */
    CompWithRef.propDecorators = {
        'value': [{ type: core_1.Input },],
    };
    return CompWithRef;
}());
var PushComp = (function () {
    function PushComp(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.renderCount = 0;
    }
    Object.defineProperty(PushComp.prototype, "renderIncrement", {
        get: function () {
            this.renderCount++;
            return '';
        },
        enumerable: true,
        configurable: true
    });
    PushComp.prototype.noop = function () { };
    /** @nocollapse */
    PushComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'push-cmp',
                    template: '<div (event)="noop()" emitterDirective></div>{{value}}{{renderIncrement}}',
                    host: { '(event)': 'noop()' },
                    directives: ALL_DIRECTIVES,
                    pipes: ALL_PIPES,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    PushComp.ctorParameters = [
        { type: core_1.ChangeDetectorRef, },
    ];
    /** @nocollapse */
    PushComp.propDecorators = {
        'value': [{ type: core_1.Input },],
    };
    return PushComp;
}());
var EmitterDirective = (function () {
    function EmitterDirective() {
        this.emitter = new async_1.EventEmitter();
    }
    /** @nocollapse */
    EmitterDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[emitterDirective]' },] },
    ];
    /** @nocollapse */
    EmitterDirective.propDecorators = {
        'emitter': [{ type: core_1.Output, args: ['event',] },],
    };
    return EmitterDirective;
}());
var Gh9882 = (function () {
    function Gh9882(_viewContainer, _templateRef) {
        this._viewContainer = _viewContainer;
        this._templateRef = _templateRef;
    }
    Gh9882.prototype.ngAfterContentInit = function () { this._viewContainer.createEmbeddedView(this._templateRef); };
    /** @nocollapse */
    Gh9882.decorators = [
        { type: core_1.Directive, args: [{ selector: '[gh9882]' },] },
    ];
    /** @nocollapse */
    Gh9882.ctorParameters = [
        { type: core_1.ViewContainerRef, },
        { type: core_1.TemplateRef, },
    ];
    return Gh9882;
}());
var TestDirective = (function () {
    function TestDirective(log) {
        this.log = log;
        this.eventEmitter = new async_1.EventEmitter();
    }
    TestDirective.prototype.onEvent = function (event) { this.event = event; };
    TestDirective.prototype.ngDoCheck = function () { this.log.add(this.name, 'ngDoCheck'); };
    TestDirective.prototype.ngOnInit = function () {
        this.log.add(this.name, 'ngOnInit');
        if (this.throwOn == 'ngOnInit') {
            throw new exceptions_1.BaseException('Boom!');
        }
    };
    TestDirective.prototype.ngOnChanges = function (changes) {
        this.log.add(this.name, 'ngOnChanges');
        var r = {};
        collection_1.StringMapWrapper.forEach(changes, function (c, key) { return r[key] = c.currentValue; });
        this.changes = r;
        if (this.throwOn == 'ngOnChanges') {
            throw new exceptions_1.BaseException('Boom!');
        }
    };
    TestDirective.prototype.ngAfterContentInit = function () {
        this.log.add(this.name, 'ngAfterContentInit');
        if (this.throwOn == 'ngAfterContentInit') {
            throw new exceptions_1.BaseException('Boom!');
        }
    };
    TestDirective.prototype.ngAfterContentChecked = function () {
        this.log.add(this.name, 'ngAfterContentChecked');
        if (this.throwOn == 'ngAfterContentChecked') {
            throw new exceptions_1.BaseException('Boom!');
        }
    };
    TestDirective.prototype.ngAfterViewInit = function () {
        this.log.add(this.name, 'ngAfterViewInit');
        if (this.throwOn == 'ngAfterViewInit') {
            throw new exceptions_1.BaseException('Boom!');
        }
    };
    TestDirective.prototype.ngAfterViewChecked = function () {
        this.log.add(this.name, 'ngAfterViewChecked');
        if (this.throwOn == 'ngAfterViewChecked') {
            throw new exceptions_1.BaseException('Boom!');
        }
    };
    TestDirective.prototype.ngOnDestroy = function () {
        this.log.add(this.name, 'ngOnDestroy');
        if (this.throwOn == 'ngOnDestroy') {
            throw new exceptions_1.BaseException('Boom!');
        }
    };
    /** @nocollapse */
    TestDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[testDirective]', exportAs: 'testDirective' },] },
    ];
    /** @nocollapse */
    TestDirective.ctorParameters = [
        { type: DirectiveLog, },
    ];
    /** @nocollapse */
    TestDirective.propDecorators = {
        'a': [{ type: core_1.Input },],
        'b': [{ type: core_1.Input },],
        'name': [{ type: core_1.Input, args: ['testDirective',] },],
        'throwOn': [{ type: core_1.Input },],
    };
    return TestDirective;
}());
var OrderCheckDirective0 = (function () {
    function OrderCheckDirective0(log) {
        this.log = log;
    }
    Object.defineProperty(OrderCheckDirective0.prototype, "name", {
        set: function (value) {
            this._name = value;
            this.log.add(this._name, 'set');
        },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    OrderCheckDirective0.decorators = [
        { type: core_1.Directive, args: [{ selector: '[orderCheck0]' },] },
    ];
    /** @nocollapse */
    OrderCheckDirective0.ctorParameters = [
        { type: DirectiveLog, },
    ];
    /** @nocollapse */
    OrderCheckDirective0.propDecorators = {
        'name': [{ type: core_1.Input, args: ['orderCheck0',] },],
    };
    return OrderCheckDirective0;
}());
var OrderCheckDirective1 = (function () {
    function OrderCheckDirective1(log, _check0) {
        this.log = log;
    }
    Object.defineProperty(OrderCheckDirective1.prototype, "name", {
        set: function (value) {
            this._name = value;
            this.log.add(this._name, 'set');
        },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    OrderCheckDirective1.decorators = [
        { type: core_1.Directive, args: [{ selector: '[orderCheck1]' },] },
    ];
    /** @nocollapse */
    OrderCheckDirective1.ctorParameters = [
        { type: DirectiveLog, },
        { type: OrderCheckDirective0, },
    ];
    /** @nocollapse */
    OrderCheckDirective1.propDecorators = {
        'name': [{ type: core_1.Input, args: ['orderCheck1',] },],
    };
    return OrderCheckDirective1;
}());
var OrderCheckDirective2 = (function () {
    function OrderCheckDirective2(log, _check1) {
        this.log = log;
    }
    Object.defineProperty(OrderCheckDirective2.prototype, "name", {
        set: function (value) {
            this._name = value;
            this.log.add(this._name, 'set');
        },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    OrderCheckDirective2.decorators = [
        { type: core_1.Directive, args: [{ selector: '[orderCheck2]' },] },
    ];
    /** @nocollapse */
    OrderCheckDirective2.ctorParameters = [
        { type: DirectiveLog, },
        { type: OrderCheckDirective1, },
    ];
    /** @nocollapse */
    OrderCheckDirective2.propDecorators = {
        'name': [{ type: core_1.Input, args: ['orderCheck2',] },],
    };
    return OrderCheckDirective2;
}());
var TestLocalsContext = (function () {
    function TestLocalsContext(someLocal) {
        this.someLocal = someLocal;
    }
    return TestLocalsContext;
}());
var TestLocals = (function () {
    function TestLocals(templateRef, vcRef) {
        vcRef.createEmbeddedView(templateRef, new TestLocalsContext('someLocalValue'));
    }
    /** @nocollapse */
    TestLocals.decorators = [
        { type: core_1.Directive, args: [{ selector: '[testLocals]' },] },
    ];
    /** @nocollapse */
    TestLocals.ctorParameters = [
        { type: core_1.TemplateRef, },
        { type: core_1.ViewContainerRef, },
    ];
    return TestLocals;
}());
var Person = (function () {
    function Person() {
        this.address = null;
    }
    Person.prototype.init = function (name, address) {
        if (address === void 0) { address = null; }
        this.name = name;
        this.address = address;
    };
    Person.prototype.sayHi = function (m) { return "Hi, " + m; };
    Person.prototype.passThrough = function (val) { return val; };
    Person.prototype.toString = function () {
        var address = this.address == null ? '' : ' address=' + this.address.toString();
        return 'name=' + this.name + address;
    };
    /** @nocollapse */
    Person.decorators = [
        { type: core_1.Component, args: [{ selector: 'root' },] },
    ];
    return Person;
}());
var Address = (function () {
    function Address(_city, _zipcode) {
        if (_zipcode === void 0) { _zipcode = null; }
        this._city = _city;
        this._zipcode = _zipcode;
        this.cityGetterCalls = 0;
        this.zipCodeGetterCalls = 0;
    }
    Object.defineProperty(Address.prototype, "city", {
        get: function () {
            this.cityGetterCalls++;
            return this._city;
        },
        set: function (v) { this._city = v; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Address.prototype, "zipcode", {
        get: function () {
            this.zipCodeGetterCalls++;
            return this._zipcode;
        },
        set: function (v) { this._zipcode = v; },
        enumerable: true,
        configurable: true
    });
    Address.prototype.toString = function () { return this.city || '-'; };
    return Address;
}());
var Uninitialized = (function () {
    function Uninitialized() {
        this.value = null;
    }
    /** @nocollapse */
    Uninitialized.decorators = [
        { type: core_1.Component, args: [{ selector: 'root' },] },
    ];
    return Uninitialized;
}());
var TestData = (function () {
    function TestData() {
    }
    /** @nocollapse */
    TestData.decorators = [
        { type: core_1.Component, args: [{ selector: 'root' },] },
    ];
    return TestData;
}());
var TestDataWithGetter = (function () {
    function TestDataWithGetter() {
    }
    Object.defineProperty(TestDataWithGetter.prototype, "a", {
        get: function () { return this.fn(); },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    TestDataWithGetter.decorators = [
        { type: core_1.Component, args: [{ selector: 'root' },] },
    ];
    return TestDataWithGetter;
}());
var Holder = (function () {
    function Holder() {
    }
    return Holder;
}());
var PersonHolder = (function (_super) {
    __extends(PersonHolder, _super);
    function PersonHolder() {
        _super.apply(this, arguments);
    }
    /** @nocollapse */
    PersonHolder.decorators = [
        { type: core_1.Component, args: [{ selector: 'root' },] },
    ];
    return PersonHolder;
}(Holder));
var PersonHolderHolder = (function (_super) {
    __extends(PersonHolderHolder, _super);
    function PersonHolderHolder() {
        _super.apply(this, arguments);
    }
    /** @nocollapse */
    PersonHolderHolder.decorators = [
        { type: core_1.Component, args: [{ selector: 'root' },] },
    ];
    return PersonHolderHolder;
}(Holder));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlX2RldGVjdGlvbl9pbnRlZ3JhdGlvbl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvbGlua2VyL2NoYW5nZV9kZXRlY3Rpb25faW50ZWdyYXRpb25fc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCx1QkFBK0IsaUJBQWlCLENBQUMsQ0FBQTtBQUNqRCx3Q0FBb0Msc0RBQXNELENBQUMsQ0FBQTtBQUMzRiw4QkFBc0Msc0NBQXNDLENBQUMsQ0FBQTtBQUU3RSxxQkFBNlksZUFBZSxDQUFDLENBQUE7QUFDN1osK0JBQStCLHdDQUF3QyxDQUFDLENBQUE7QUFDeEUsd0JBQTJILHVCQUF1QixDQUFDLENBQUE7QUFDbkosaUNBQTRHLHdDQUF3QyxDQUFDLENBQUE7QUFDckosbUJBQWlCLDRDQUE0QyxDQUFDLENBQUE7QUFDOUQsNEJBQXFCLCtDQUErQyxDQUFDLENBQUE7QUFDckUsNkJBQThCLGdEQUFnRCxDQUFDLENBQUE7QUFFL0Usc0JBQTJCLHdCQUF3QixDQUFDLENBQUE7QUFDcEQsMkJBQStCLDZCQUE2QixDQUFDLENBQUE7QUFDN0QsMkJBQTRCLDZCQUE2QixDQUFDLENBQUE7QUFDMUQscUJBQWtFLHVCQUF1QixDQUFDLENBQUE7QUFFMUY7SUFDRSxJQUFJLEdBQXlCLENBQUM7SUFDOUIsSUFBSSxRQUE0QixDQUFDO0lBQ2pDLElBQUksU0FBb0IsQ0FBQztJQUN6QixJQUFJLFlBQTBCLENBQUM7SUFNL0IsMkJBQ0ksUUFBZ0IsRUFBRSxRQUE4QyxFQUNoRSxJQUFpQztRQURmLHdCQUE4QyxHQUE5QyxXQUFpQyxhQUFhO1FBQ2hFLG9CQUFpQyxHQUFqQyxXQUFpQztRQUNuQyxFQUFFLENBQUMsQ0FBQyxjQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLElBQUksR0FBRyxHQUFHLENBQUM7UUFDYixDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUk7YUFDTixZQUFZLENBQ1QsUUFBUSxFQUNSLElBQUksbUJBQVksQ0FBQyxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQzthQUN4RixlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVELG1CQUFtQixFQUFnQixFQUFFLE9BQWE7UUFDaEQsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxPQUFFLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDcEQsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFJRCx5QkFDSSxRQUFnQixFQUFFLFFBQThDO1FBQTlDLHdCQUE4QyxHQUE5QyxXQUFpQyxhQUFhO1FBQ2xFLElBQUksUUFBUSxHQUFHLFVBQVEsUUFBUSxZQUFTLENBQUM7UUFDekMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBSUQsMEJBQ0ksVUFBZSxFQUFFLFFBQThDO1FBQTlDLHdCQUE4QyxHQUE5QyxXQUFpQyxhQUFhO1FBQ2pFLE1BQU0sQ0FBQyxlQUFlLENBQUMsaUJBQWUsVUFBVSxNQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELGtDQUNJLFVBQWUsRUFBRSxRQUEyQztRQUEzQyx3QkFBMkMsR0FBM0Msd0JBQTJDO1FBQzlELElBQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNuRCxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCwyQkFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQzFCLHVDQUF1QztRQUN2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQUMsTUFBTSxDQUFDO1FBRTFDLDZCQUFVLENBQUM7WUFDVCwyQkFBaUIsQ0FBQyxFQUFDLFNBQVMsRUFBRSx1Q0FBdUIsRUFBQyxDQUFDLENBQUM7WUFDeEQseUJBQWUsQ0FBQztnQkFDZCxTQUFTLEVBQ0wsQ0FBQyxTQUFTLEVBQUUsWUFBWSxFQUFFLEVBQUMsT0FBTyxFQUFFLG1CQUFZLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFDLENBQUM7YUFDdEYsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCw2QkFBVSxDQUFDLHlCQUFNLENBQ2IsQ0FBQyw4QkFBb0IsRUFBRSwrQ0FBcUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxDQUFDLEVBQ3RFLFVBQUMsSUFBMEIsRUFBRSxTQUE2QixFQUFFLFVBQXFCLEVBQ2hGLGFBQTJCO1lBQzFCLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFDWCxRQUFRLEdBQUcsU0FBUyxDQUFDO1lBQ3JCLFNBQVMsR0FBRyxVQUFVLENBQUM7WUFDdkIsWUFBWSxHQUFHLGFBQWEsQ0FBQztZQUM3QixRQUFRLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2pELENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFUiwyQkFBUSxDQUFDLGFBQWEsRUFBRTtZQUV0QixxQkFBRSxDQUFDLHlCQUF5QixFQUN6QixtQkFBUyxDQUFDLGNBQVEseUJBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXhGLHFCQUFFLENBQUMsbUNBQW1DLEVBQ25DLG1CQUFTLENBQUMsY0FBUSx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFOUYscUJBQUUsQ0FBQyxxQ0FBcUMsRUFBRSxtQkFBUyxDQUFDO2dCQUMvQyx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO1lBQzVFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLDZCQUE2QixFQUM3QixtQkFBUyxDQUFDLGNBQVEseUJBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTlGLHFCQUFFLENBQUMsNkJBQTZCLEVBQzdCLG1CQUFTLENBQUMsY0FBUSx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0YscUJBQUUsQ0FBQyw2QkFBNkIsRUFDN0IsbUJBQVMsQ0FBQyxjQUFRLHlCQUFNLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU5RixxQkFBRSxDQUFDLDZCQUE2QixFQUFFLG1CQUFTLENBQUM7Z0JBQ3ZDLHlCQUFNLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFZLEdBQUcsQ0FBRSxDQUFDLENBQUMsQ0FBQztZQUMxRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUUseUJBQXlCO1lBRWxDLHFCQUFFLENBQUMsNkJBQTZCLEVBQzdCLG1CQUFTLENBQUMsY0FBUSx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0YscUJBQUUsQ0FBQywyQ0FBMkMsRUFBRSxtQkFBUyxDQUFDO2dCQUNyRCx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN4RSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyw4QkFBOEIsRUFBRSxtQkFBUyxDQUFDO2dCQUN4Qyx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLDRDQUE0QyxFQUFFLG1CQUFTLENBQUM7Z0JBQ3RELElBQUksYUFBYSxHQUFHLGNBQU8sR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDO2dCQUMvQyx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBWSxhQUFhLENBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkYsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsNENBQTRDLEVBQUUsbUJBQVMsQ0FBQztnQkFDdEQseUJBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDekUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsK0JBQStCLEVBQUUsbUJBQVMsQ0FBQztnQkFDekMseUJBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUMxRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyw2Q0FBNkMsRUFBRSxtQkFBUyxDQUFDO2dCQUN2RCx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLGtDQUFrQyxFQUFFLG1CQUFTLENBQUM7Z0JBQzVDLHlCQUFNLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLG1DQUFtQyxFQUFFLG1CQUFTLENBQUM7Z0JBQzdDLHlCQUFNLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDeEUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsbUNBQW1DLEVBQUUsbUJBQVMsQ0FBQztnQkFDN0MseUJBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUN4RSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxtQkFBUyxDQUFDO2dCQUM1Qyx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN2RSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyxtQ0FBbUMsRUFBRSxtQkFBUyxDQUFDO2dCQUM3Qyx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN4RSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyxvQ0FBb0MsRUFBRSxtQkFBUyxDQUFDO2dCQUM5Qyx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN4RSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyxvQ0FBb0MsRUFBRSxtQkFBUyxDQUFDO2dCQUM5Qyx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLG1DQUFtQyxFQUFFLG1CQUFTLENBQUM7Z0JBQzdDLHlCQUFNLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLG9DQUFvQyxFQUFFLG1CQUFTLENBQUM7Z0JBQzlDLHlCQUFNLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3hFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLG9DQUFvQyxFQUFFLG1CQUFTLENBQUM7Z0JBQzlDLHlCQUFNLENBQUMsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDekUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsbUNBQW1DLEVBQUUsbUJBQVMsQ0FBQztnQkFDN0MseUJBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDOUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsb0NBQW9DLEVBQUUsbUJBQVMsQ0FBQztnQkFDOUMseUJBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNoRixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyxtQ0FBbUMsRUFBRSxtQkFBUyxDQUFDO2dCQUM3Qyx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUMvRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyxvQ0FBb0MsRUFBRSxtQkFBUyxDQUFDO2dCQUM5Qyx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7WUFDakYsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsdUJBQXVCLEVBQUUsbUJBQVMsQ0FBQztnQkFDakMseUJBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUN4RSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyw4QkFBOEIsRUFBRSxtQkFBUyxDQUFDO2dCQUN4Qyx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN4RSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxtQkFBUyxDQUFDO2dCQUM1Qyx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUM1RSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyxtQ0FBbUMsRUFBRSxtQkFBUyxDQUFDO2dCQUM3Qyx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUM1RSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyw0Q0FBNEMsRUFBRSxtQkFBUyxDQUFDO2dCQUN0RCx5QkFBTSxDQUFDLHdCQUF3QixDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ2xGLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLDJDQUEyQyxFQUFFLG1CQUFTLENBQUM7Z0JBQ3JELHlCQUFNLENBQUMsd0JBQXdCLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDdEYsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsMkVBQTJFLEVBQzNFLG1CQUFTLENBQUM7Z0JBQ1IseUJBQU0sQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3RGLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLGtFQUFrRSxFQUFFLG1CQUFTLENBQUM7Z0JBQzVFLElBQUksR0FBRyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDMUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7Z0JBQy9CLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLHlCQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsK0NBQStDLEVBQUUsbUJBQVMsQ0FBQztnQkFDekQsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRCxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQztnQkFDdEMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDeEQsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCwyQkFBUSxDQUFDLDBCQUEwQixFQUFFO2dCQUNuQyxxQkFBRSxDQUFDLDRDQUE0QyxFQUFFLG1CQUFTLENBQUM7b0JBQ3RELElBQUksR0FBRyxHQUFHLGdCQUFnQixDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDcEQsR0FBRyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ3JDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLHlCQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRVAscUJBQUUsQ0FBQyx5Q0FBeUMsRUFBRSxtQkFBUyxDQUFDO29CQUNuRCxJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDMUQsR0FBRyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ3JDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLHlCQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRVAscUJBQUUsQ0FBQyxnREFBZ0QsRUFBRSxtQkFBUyxDQUFDO29CQUMxRCxJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3BELEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ25ELEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLHlCQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRVAscUJBQUUsQ0FBQyw2Q0FBNkMsRUFBRSxtQkFBUyxDQUFDO29CQUN2RCxJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDMUQsR0FBRyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkQsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUCxxQkFBRSxDQUFDLGdEQUFnRCxFQUFFLG1CQUFTLENBQUM7b0JBQzFELElBQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLFlBQVksQ0FBQyxDQUFDO29CQUNsRSxHQUFHLENBQUMsaUJBQWlCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztvQkFDbkMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUCxxQkFBRSxDQUFDLHVEQUF1RCxFQUFFLG1CQUFTLENBQUM7b0JBQ2pFLElBQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDLDJCQUEyQixFQUFFLGtCQUFrQixDQUFDLENBQUM7b0JBQzlFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztvQkFDakQsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDbkQsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUCxxQkFBRSxDQUFDLHdEQUF3RCxFQUFFLG1CQUFTLENBQUM7b0JBQ2xFLElBQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDLDRCQUE0QixFQUFFLGtCQUFrQixDQUFDLENBQUM7b0JBQy9FLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLHlCQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ25ELENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRVAscUJBQUUsQ0FBQyw4Q0FBOEMsRUFBRSxtQkFBUyxDQUFDO29CQUN4RCx5QkFBTSxDQUFDO3dCQUNMLElBQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLFlBQVksQ0FBQyxDQUFDO3dCQUNsRSxJQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO3dCQUM1QixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzt3QkFDdEIsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEtBQUssR0FBRyxNQUFNLENBQUM7d0JBQ3JDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzNCLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNmLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQztZQUVILHFCQUFFLENBQUMsNkJBQTZCLEVBQUUsbUJBQVMsQ0FBQztnQkFDdkMsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNuRCxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsK0JBQStCLEVBQUUsbUJBQVMsQ0FBQztnQkFDekMsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNoRCxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLGNBQU0sT0FBQSxVQUFDLENBQU0sSUFBSyxPQUFBLENBQUMsRUFBRCxDQUFDLEVBQWIsQ0FBYSxDQUFDO2dCQUM5QyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2pELENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLHFDQUFxQyxFQUFFLG1CQUFTLENBQUM7Z0JBQy9DLElBQUksR0FBRyxHQUFHLGdCQUFnQixDQUFDLG9CQUFvQixFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUN6RCxHQUFHLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNuRCxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLG9CQUFvQixFQUFFLG1CQUFTLENBQUM7Z0JBQzlCLElBQUksR0FBRyxHQUFHLGdCQUFnQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDMUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsR0FBRyxvQkFBYSxDQUFDLEdBQUcsQ0FBQztnQkFDOUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDaEQsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUVsQixHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsMkJBQTJCLEVBQUUsbUJBQVMsQ0FBQztnQkFDckMsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUMzQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztnQkFFckMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBRWxCLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLHlCQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDbEMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUVsQixHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztnQkFDckMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO1lBQ3BELENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLCtDQUErQyxFQUFFLG1CQUFTLENBQUM7Z0JBQ3pELElBQUksR0FBRyxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNyQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsb0NBQW9DLEVBQUUsbUJBQVMsQ0FBQztnQkFDOUMsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLHlCQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsa0RBQWtELEVBQUUsbUJBQVMsQ0FBQztnQkFDNUQsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUMvQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25ELENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLGlFQUFpRSxFQUFFLG1CQUFTLENBQUM7Z0JBQzNFLElBQUksR0FBRyxHQUFHLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztnQkFDL0MsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsOENBQThDLEVBQUUsbUJBQVMsQ0FBQztnQkFDeEQsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ3JDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLHlCQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxtQkFBUyxDQUFDO2dCQUM1QyxJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDakMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyxpREFBaUQsRUFBRSxtQkFBUyxDQUFDO2dCQUMzRCxJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDckMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLHlCQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQywrREFBK0QsRUFBRSxtQkFBUyxDQUFDO2dCQUN6RSxJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDckMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzVCLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QixHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5Qyx5QkFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELHlCQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBR1AscUJBQUUsQ0FBQyw4QkFBOEIsRUFBRSxtQkFBUyxDQUFDO2dCQUN4QyxJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsb0JBQW9CLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzFELEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDO2dCQUNsQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsOERBQThELEVBQUUsbUJBQVMsQ0FBQztnQkFDeEUsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUMxRCxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztnQkFDL0IsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNqRCxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyw4REFBOEQsRUFDOUQsbUJBQVMsQ0FBQyxjQUFRLHlCQUFNLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUxRixxQkFBRSxDQUFDLG9CQUFvQixFQUFFLG1CQUFTLENBQUM7Z0JBQzlCLElBQUksR0FBRyxHQUNILGlCQUFpQixDQUFDLGlFQUFpRSxDQUFDLENBQUM7Z0JBQ3pGLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXpCLHlCQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAsMkJBQVEsQ0FBQyxPQUFPLEVBQUU7Z0JBQ2hCLHFCQUFFLENBQUMseUNBQXlDLEVBQUUsbUJBQVMsQ0FBQztvQkFDbkQsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzFELEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO29CQUNuQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVQLHFCQUFFLENBQUMsbUNBQW1DLEVBQUUsbUJBQVMsQ0FBQztvQkFDN0MsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsd0NBQXdDLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQzdFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO29CQUNyQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNuRCxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRVAscUJBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxtQkFBUyxDQUFDO29CQUNoRCxJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxnREFBZ0QsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFDckYsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7b0JBQ3JDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLHlCQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLCtCQUErQixDQUFDLENBQUMsQ0FBQztnQkFDNUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUCxxQkFBRSxDQUFDLHNFQUFzRSxFQUFFLG1CQUFTLENBQUM7b0JBQ2hGLElBQUksR0FBRyxHQUFHLGdCQUFnQixDQUFDLGtEQUFrRCxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUN2RixHQUFHLENBQUMsaUJBQWlCLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztvQkFDckMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVQLHFCQUFFLENBQUMsa0NBQWtDLEVBQUUsbUJBQVMsQ0FBQztvQkFDNUMsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsMkJBQTJCLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBRWhFLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXpCLHlCQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztvQkFFckQsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNsQixHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUV6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRVAscUJBQUUsQ0FBQyxpQ0FBaUMsRUFBRSxtQkFBUyxDQUFDO29CQUMzQyxJQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQywwQkFBMEIsRUFBRSxNQUFNLENBQUMsQ0FBQztvQkFFL0QsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO29CQUVyRCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ2xCLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXpCLHlCQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQztnQkFDdkQsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUCxxQkFBRSxDQUFDLHFEQUFxRCxFQUFFLG1CQUFTLENBQUM7b0JBQy9ELElBQUksR0FBRyxHQUFHLGdCQUFnQixDQUFDLHFCQUFxQixFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUMxRCxnQ0FBZ0M7b0JBQ2hDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO29CQUNsQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUN6RCxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUV6RCxpQ0FBaUM7b0JBQ2pDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO29CQUNuQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDeEUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7b0JBRXhFLDZDQUE2QztvQkFDN0MsR0FBRyxDQUFDLGlCQUFpQixDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7b0JBQ3BDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLHlCQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQzt3QkFDckMsY0FBYyxFQUFFLGFBQWEsRUFBRSxjQUFjO3FCQUM5QyxDQUFDLENBQUM7b0JBQ0gsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUNyQyxjQUFjLEVBQUUsYUFBYSxFQUFFLGNBQWM7cUJBQzlDLENBQUMsQ0FBQztnQkFFTCxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVQLHFCQUFFLENBQUMsb0ZBQW9GLEVBQ3BGLG1CQUFTLENBQUM7b0JBQ1IsSUFBSSxHQUFHLEdBQUcsaUJBQWlCLENBQ3ZCLDZGQUF5Rjt3QkFDckYsOEVBQThFLEVBQ2xGLE1BQU0sQ0FBQyxDQUFDO29CQUNaLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO29CQUNqQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztvQkFDL0IsR0FBRyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkQsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUNyQyxhQUFhLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxZQUFZO3FCQUN4RCxDQUFDLENBQUM7b0JBQ0gsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUNyQyxhQUFhLEVBQUUsYUFBYSxFQUFFLFdBQVcsRUFBRSxZQUFZO3FCQUN4RCxDQUFDLENBQUM7b0JBQ0gsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7b0JBQy9CLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLHlCQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQzt3QkFDckMsYUFBYSxFQUFFLGFBQWEsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLFlBQVk7cUJBQ3RFLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVQLHFCQUFFLENBQUMsdURBQXVELEVBQUUsbUJBQVMsQ0FBQztvQkFDakUsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsMkJBQTJCLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ2hFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO29CQUNuQyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6Qix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDekUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDO1lBRUgsMkJBQVEsQ0FBQyxtQkFBbUIsRUFBRTtnQkFDNUIscUJBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxtQkFBUyxDQUFDO29CQUM1QyxJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsc0JBQXNCLENBQUMsQ0FBQztvQkFDbEQsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNDLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQztvQkFDbEIsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFFMUMseUJBQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUM3Qyx5QkFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQy9DLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRVAscUJBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxtQkFBUyxDQUFDO29CQUM1QyxJQUFJLEdBQUcsR0FBRyxlQUFlLENBQUMsdUJBQXVCLENBQUMsQ0FBQztvQkFDbkQsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDO29CQUNsQixPQUFPLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUMxQyx5QkFBTSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVQLHFCQUFFLENBQUMsdUJBQXVCLEVBQUUsbUJBQVMsQ0FBQztvQkFDakMsSUFBSSxHQUFHLEdBQUcsZUFBZSxDQUFDLHlCQUF5QixDQUFDLENBQUM7b0JBQ3JELElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDNUIsT0FBTyxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDOUMseUJBQU0sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVQLHFCQUFFLENBQUMsK0NBQStDLEVBQUUsbUJBQVMsQ0FBQztvQkFDekQseUJBQU0sQ0FBQzt3QkFDTCxlQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQztvQkFDeEMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksTUFBTSxDQUFDLDJDQUEyQyxDQUFDLENBQUMsQ0FBQztnQkFDM0UsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUCxxQkFBRSxDQUFDLGlDQUFpQyxFQUFFLG1CQUFTLENBQUM7b0JBQzNDLElBQUksR0FBRyxHQUFHLGVBQWUsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO29CQUNwRSxJQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0MsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQzVCLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQzlDLHlCQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDO1FBRUwsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBUSxDQUFDLHFCQUFxQixFQUFFO1lBQzlCLDJCQUFRLENBQUMscUJBQXFCLEVBQUU7Z0JBQzlCLHFCQUFFLENBQUMsNkNBQTZDLEVBQUUsbUJBQVMsQ0FBQztvQkFDdkQsSUFBSSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsb0NBQW9DLENBQUMsQ0FBQztvQkFDbEUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUNsQyx5QkFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDdEUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDO1lBRUgsMkJBQVEsQ0FBQyxvQkFBb0IsRUFBRTtnQkFDN0IscUJBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxtQkFBUyxDQUFDO29CQUM1QyxJQUFJLEdBQUcsR0FBRyxpQkFBaUIsQ0FDdkIsK0VBQStFLENBQUMsQ0FBQztvQkFDckYsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIseUJBQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDL0MsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDO1lBRUgsMkJBQVEsQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RCLHFCQUFFLENBQUMsNkRBQTZELEVBQUUsbUJBQVMsQ0FBQztvQkFDdkUsSUFBSSxHQUFHLEdBQUcsaUJBQWlCLENBQ3ZCLHdHQUF3RyxDQUFDLENBQUM7b0JBQzlHLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXpCLElBQUksSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO29CQUN0RCx5QkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7b0JBQ25FLHlCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQyxDQUFDLENBQUM7Z0JBQzdELENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsMkJBQVEsQ0FBQyxXQUFXLEVBQUU7WUFDcEI7Z0JBQ0UsTUFBTSxDQUFDLGlCQUFpQixDQUNwQixnSEFBZ0gsRUFDaEgsYUFBYSxFQUNiLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSx1Q0FBdUMsQ0FBQyxDQUFDLENBQUM7WUFDdkYsQ0FBQztZQUVELDJCQUFRLENBQUMsVUFBVSxFQUFFO2dCQUNuQixxQkFBRSxDQUFDLG9DQUFvQyxFQUFFLG1CQUFTLENBQUM7b0JBQzlDLElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFDLGlDQUFpQyxDQUFDLENBQUM7b0JBQy9ELHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUVyRSxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUV6Qix5QkFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzt3QkFDL0QsaUJBQWlCLEVBQUUsY0FBYztxQkFDbEMsQ0FBQyxDQUFDO29CQUNILFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFckIsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFekIseUJBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDeEQsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUCxxQkFBRSxDQUFDLGlDQUFpQyxFQUFFLG1CQUFTLENBQUM7b0JBQzNDLElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFDLGlDQUFpQyxDQUFDLENBQUM7b0JBRS9ELEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXpCLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUVwRSxtQkFBbUI7b0JBQ25CLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFckIsNkNBQTZDO29CQUM3QyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBRXJCLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBRXRELDhDQUE4QztvQkFDOUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFekIseUJBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDeEQsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUCxxQkFBRSxDQUFDLDZDQUE2QyxFQUFFLG1CQUFTLENBQUM7b0JBQ3ZELElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFDLG9EQUFvRCxDQUFDLENBQUM7b0JBRWxGLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztvQkFDcEIsbURBQW1EO29CQUNuRCxJQUFJLENBQUM7d0JBQ0gsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0IsQ0FBRTtvQkFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNYLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ2pCLENBQUM7b0JBQ0QseUJBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRTNCLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO29CQUNwRSxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRXJCLG1GQUFtRjtvQkFDbkYsSUFBSSxDQUFDO3dCQUNILEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzNCLENBQUU7b0JBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDWCxNQUFNLElBQUksMEJBQWEsQ0FBQyx1REFBdUQsQ0FBQyxDQUFDO29CQUNuRixDQUFDO29CQUNELHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3hELENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQztZQUVILDJCQUFRLENBQUMsV0FBVyxFQUFFO2dCQUNwQixxQkFBRSxDQUFDLGlDQUFpQyxFQUFFLG1CQUFTLENBQUM7b0JBQzNDLElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFDLGlDQUFpQyxDQUFDLENBQUM7b0JBRS9ELEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUM3RCxjQUFjLEVBQUUsZUFBZTtxQkFDaEMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRVAscUJBQUUsQ0FBQyx3RUFBd0UsRUFDeEUsbUJBQVMsQ0FBQztvQkFDUixJQUFJLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO29CQUUvRCxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUV6Qix5QkFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFFdEUsbUJBQW1CO29CQUNuQixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRXJCLDZDQUE2QztvQkFDN0MsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUVyQix5QkFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO29CQUV2RCw0Q0FBNEM7b0JBQzVDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXpCLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxDQUFDLENBQUM7WUFFSCwyQkFBUSxDQUFDLG9CQUFvQixFQUFFO2dCQUM3QixxQkFBRSxDQUFDLHFGQUFxRixFQUNyRixtQkFBUyxDQUFDO29CQUNSLElBQUksR0FBRyxHQUFHLGlDQUFpQyxFQUFFLENBQUM7b0JBRTlDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXpCLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQ3ZFLGtCQUFrQixFQUFFLHdCQUF3QixFQUFFLGlDQUFpQzt3QkFDL0UsMkJBQTJCLEVBQUUscUJBQXFCLEVBQUUsOEJBQThCO3FCQUNuRixDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUCxxQkFBRSxDQUFDLGlDQUFpQyxFQUFFLG1CQUFTLENBQUM7b0JBQzNDLElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFDLGlDQUFpQyxDQUFDLENBQUM7b0JBRS9ELEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXpCLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzt3QkFDMUQsd0JBQXdCO3FCQUN6QixDQUFDLENBQUM7b0JBRUgsbUJBQW1CO29CQUNuQixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRXJCLDZDQUE2QztvQkFDN0MsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUVyQix5QkFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBRWhFLDhDQUE4QztvQkFDOUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFekIseUJBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVQLHFCQUFFLENBQUMsdURBQXVELEVBQUUsbUJBQVMsQ0FBQztvQkFDakUsSUFBSSxHQUFHLEdBQ0gsaUJBQWlCLENBQUMsOERBQThELENBQUMsQ0FBQztvQkFFdEYsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO29CQUNwQiw2REFBNkQ7b0JBQzdELElBQUksQ0FBQzt3QkFDSCxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzQixDQUFFO29CQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDakIsQ0FBQztvQkFDRCx5QkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFM0IseUJBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUMxRCx3QkFBd0I7cUJBQ3pCLENBQUMsQ0FBQztvQkFDSCxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRXJCLHFGQUFxRjtvQkFDckYsVUFBVTtvQkFDVixJQUFJLENBQUM7d0JBQ0gsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0IsQ0FBRTtvQkFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNYLE1BQU0sSUFBSSwwQkFBYSxDQUFDLHVEQUF1RCxDQUFDLENBQUM7b0JBQ25GLENBQUM7b0JBQ0QseUJBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxDQUFDLENBQUM7WUFFSCwyQkFBUSxDQUFDLHVCQUF1QixFQUFFO2dCQUNoQyxxQkFBRSxDQUFDLDBFQUEwRSxFQUMxRSxtQkFBUyxDQUFDO29CQUNSLElBQUksR0FBRyxHQUFHLGlDQUFpQyxFQUFFLENBQUM7b0JBRTlDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXpCLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQzFFLGtCQUFrQixFQUFFLHdCQUF3QixFQUFFLG9DQUFvQzt3QkFDbEYsOEJBQThCLEVBQUUscUJBQXFCO3dCQUNyRCxpQ0FBaUM7cUJBQ2xDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVQLHFCQUFFLENBQUMsd0VBQXdFLEVBQ3hFLG1CQUFTLENBQUM7b0JBQ1IsSUFBSSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsaUNBQWlDLENBQUMsQ0FBQztvQkFFL0QsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFekIseUJBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUM3RCwyQkFBMkI7cUJBQzVCLENBQUMsQ0FBQztvQkFFSCxtQkFBbUI7b0JBQ25CLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFFckIsNkNBQTZDO29CQUM3QyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBRXJCLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztvQkFFbkUsNENBQTRDO29CQUM1QyxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUV6Qix5QkFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQzdELDJCQUEyQjtxQkFDNUIsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRVAscUJBQUUsQ0FBQyxxRkFBcUYsRUFDckYsbUJBQVMsQ0FBQztvQkFDUixJQUFJLEdBQUcsR0FBRyxpQkFBaUIsQ0FDdkIscUVBQXFFLENBQUMsQ0FBQztvQkFFM0UsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFekIseUJBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUM3RCw2QkFBNkIsRUFBRSw4QkFBOEI7cUJBQzlELENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxDQUFDLENBQUM7WUFHSCwyQkFBUSxDQUFDLGlCQUFpQixFQUFFO2dCQUMxQixxQkFBRSxDQUFDLHFEQUFxRCxFQUFFLG1CQUFTLENBQUM7b0JBQy9ELElBQUksR0FBRyxHQUFHLGlDQUFpQyxFQUFFLENBQUM7b0JBRTlDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXpCLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQ3BFLGtCQUFrQixFQUFFLHdCQUF3QixFQUFFLDhCQUE4Qjt3QkFDNUUscUJBQXFCLEVBQUUsMkJBQTJCLEVBQUUsd0JBQXdCO3FCQUM3RSxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUCxxQkFBRSxDQUFDLGlDQUFpQyxFQUFFLG1CQUFTLENBQUM7b0JBQzNDLElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFDLGlDQUFpQyxDQUFDLENBQUM7b0JBRS9ELEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXpCLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQztvQkFFbEYsbUJBQW1CO29CQUNuQixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRXJCLDZDQUE2QztvQkFDN0MsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUVyQix5QkFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBRTdELDhDQUE4QztvQkFDOUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFekIseUJBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRCxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVQLHFCQUFFLENBQUMsb0RBQW9ELEVBQUUsbUJBQVMsQ0FBQztvQkFDOUQsSUFBSSxHQUFHLEdBQ0gsaUJBQWlCLENBQUMsMkRBQTJELENBQUMsQ0FBQztvQkFFbkYsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO29CQUNwQiwwREFBMEQ7b0JBQzFELElBQUksQ0FBQzt3QkFDSCxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUMzQixDQUFFO29CQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ1gsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDakIsQ0FBQztvQkFDRCx5QkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFM0IseUJBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO29CQUNsRixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRXJCLGtGQUFrRjtvQkFDbEYsVUFBVTtvQkFDVixJQUFJLENBQUM7d0JBQ0gsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDM0IsQ0FBRTtvQkFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNYLE1BQU0sSUFBSSwwQkFBYSxDQUFDLHVEQUF1RCxDQUFDLENBQUM7b0JBQ25GLENBQUM7b0JBQ0QseUJBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMvRCxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxDQUFDLENBQUM7WUFFSCwyQkFBUSxDQUFDLG9CQUFvQixFQUFFO2dCQUM3QixxQkFBRSxDQUFDLHFEQUFxRCxFQUFFLG1CQUFTLENBQUM7b0JBQy9ELElBQUksR0FBRyxHQUFHLGlDQUFpQyxFQUFFLENBQUM7b0JBRTlDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXpCLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFdBQVcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQ3ZFLGtCQUFrQixFQUFFLHdCQUF3QixFQUFFLGlDQUFpQzt3QkFDL0UscUJBQXFCLEVBQUUsOEJBQThCLEVBQUUsMkJBQTJCO3FCQUNuRixDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUCxxQkFBRSxDQUFDLHdFQUF3RSxFQUN4RSxtQkFBUyxDQUFDO29CQUNSLElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFDLGlDQUFpQyxDQUFDLENBQUM7b0JBRS9ELEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXpCLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzt3QkFDMUQsd0JBQXdCO3FCQUN6QixDQUFDLENBQUM7b0JBRUgsbUJBQW1CO29CQUNuQixZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBRXJCLDZDQUE2QztvQkFDN0MsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUVyQix5QkFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBRWhFLDRDQUE0QztvQkFDNUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFekIseUJBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUMxRCx3QkFBd0I7cUJBQ3pCLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVQLHFCQUFFLENBQUMscUZBQXFGLEVBQ3JGLG1CQUFTLENBQUM7b0JBQ1IsSUFBSSxHQUFHLEdBQUcsaUJBQWlCLENBQ3ZCLHFFQUFxRSxDQUFDLENBQUM7b0JBRTNFLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRXpCLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzt3QkFDMUQsMEJBQTBCLEVBQUUsMkJBQTJCO3FCQUN4RCxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDO1lBRUgsMkJBQVEsQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RCLHFCQUFFLENBQUMsc0NBQXNDLEVBQUUsbUJBQVMsQ0FBQztvQkFDaEQsSUFBSSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsaUNBQWlDLENBQUMsQ0FBQztvQkFDL0QsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFFekIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUVkLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7Z0JBQzVFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRVAscUJBQUUsQ0FBQyxpRUFBaUUsRUFBRSxtQkFBUyxDQUFDO29CQUMzRSxJQUFJLEdBQUcsR0FBRyxpQkFBaUIsQ0FDdkIsbUdBQW1HO3dCQUMvRiwrQkFBK0IsRUFDbkMsYUFBYSxFQUNiLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsRUFBRSx1Q0FBdUMsQ0FBQyxDQUFDLENBQUM7b0JBRXJGLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3pCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFFZCx5QkFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUNuRCwyQkFBMkIsRUFBRSwyQkFBMkIsRUFBRSx1QkFBdUI7d0JBQ2pGLG9CQUFvQjtxQkFDckIsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRVAscUJBQUUsQ0FBQyxxRkFBcUYsRUFDckYsbUJBQVMsQ0FBQztvQkFDUixJQUFJLEdBQUcsR0FBRyxpQkFBaUIsQ0FDdkIscUVBQXFFLENBQUMsQ0FBQztvQkFFM0UsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUVkLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7d0JBQ25ELG1CQUFtQixFQUFFLG9CQUFvQjtxQkFDMUMsQ0FBQyxDQUFDO2dCQUNMLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRVAscUJBQUUsQ0FBQyxrQ0FBa0MsRUFBRSxtQkFBUyxDQUFDO29CQUM1QyxJQUFJLEdBQUcsR0FBRyxpQkFBaUIsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO29CQUU3RCxHQUFHLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUN6QixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBRWQseUJBQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzt3QkFDbkQsK0JBQStCO3FCQUNoQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNULENBQUMsQ0FBQyxDQUFDO1FBRUwsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBUSxDQUFDLHdCQUF3QixFQUFFO1lBQ2pDLHFCQUFFLENBQUMsbUVBQW1FLEVBQUUsbUJBQVMsQ0FBQztnQkFDN0UsSUFBTSxHQUFHLEdBQUcsaUJBQWlCLENBQUMsNEJBQTRCLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQ3RFLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUM1Qix5QkFBTSxDQUFDLGNBQU0sT0FBQSxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQXBCLENBQW9CLENBQUM7cUJBQzdCLFlBQVksQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1lBQ2hGLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLHlEQUF5RCxFQUFFLG1CQUFTLENBQUM7Z0JBQ25FLElBQU0sR0FBRyxHQUFHLGlCQUFpQixDQUFDLDRCQUE0QixFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUN0RSxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIseUJBQU0sQ0FBQyxjQUFNLE9BQUEsR0FBRyxDQUFDLGFBQWEsRUFBRSxFQUFuQixDQUFtQixDQUFDO3FCQUM1QixZQUFZLENBQ1QsbUdBQW1HLENBQUMsQ0FBQztZQUMvRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVAscUJBQUUsQ0FBQyw0REFBNEQsRUFBRSxtQkFBUyxDQUFDO2dCQUN0RSxJQUFNLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzVDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDcEMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNwQyx5QkFBTSxDQUFDLGNBQU0sT0FBQSxHQUFHLENBQUMsY0FBYyxFQUFFLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDbkQsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsK0JBQStCLEVBQUUsbUJBQVMsQ0FBQztnQkFDekMsSUFBTSxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUM1QyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztnQkFDbEMseUJBQU0sQ0FBQyxjQUFNLE9BQUEsR0FBRyxDQUFDLGNBQWMsRUFBRSxFQUFwQixDQUFvQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRTdDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDcEIseUJBQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNwRCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBUSxDQUFDLE1BQU0sRUFBRTtZQUNmLHFCQUFFLENBQUMsVUFBVSxFQUFFLG1CQUFTLENBQUM7Z0JBQ3BCLElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFDLGlDQUFpQyxDQUFDLENBQUM7Z0JBQy9ELElBQUksR0FBRyxHQUFnQixTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkUsR0FBRyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7Z0JBQ3BCLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFL0IsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUVwQix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVQLHFCQUFFLENBQUMsWUFBWSxFQUFFLG1CQUFTLENBQUM7Z0JBQ3RCLElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFDLGlDQUFpQyxDQUFDLENBQUM7Z0JBQy9ELElBQUksR0FBRyxHQUFnQixTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbkUsR0FBRyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUM7Z0JBQ3BCLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFL0IsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUVwQix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRWxDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFakMsR0FBRyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUVwQix5QkFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBRS9DLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFUCxxQkFBRSxDQUFDLG9DQUFvQyxFQUFFLG1CQUFTLENBQUM7Z0JBQzlDLElBQUksR0FBRyxHQUFHLGlCQUFpQixDQUFDLHVCQUF1QixDQUFDLENBQUM7Z0JBQ3JELElBQUksR0FBRyxHQUFhLFNBQVMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxHQUFHLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQy9CLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFakMsc0ZBQXNGO2dCQUN0RixVQUFVO2dCQUNWLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDcEIseUJBQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsV0FBVyxDQUFDO2dCQUU1QixHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3BCLHlCQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV0QyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRVQsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBUSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hDLHFCQUFFLENBQUMsaURBQWlELEVBQUUsbUJBQVMsQ0FBQztnQkFDM0QsSUFBSSxHQUFHLEdBQ0gsaUJBQWlCLENBQUMsNkRBQTZELENBQUMsQ0FBQztnQkFFckYsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDekIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUVkLHlCQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDNUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNULENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBaGxDZSxZQUFJLE9BZ2xDbkIsQ0FBQTtBQUVELElBQU0sY0FBYyxHQUFxQjtJQUN2QyxpQkFBVSxDQUFDLGNBQU0sT0FBQSxhQUFhLEVBQWIsQ0FBYSxDQUFDO0lBQy9CLGlCQUFVLENBQUMsY0FBTSxPQUFBLGFBQWEsRUFBYixDQUFhLENBQUM7SUFDL0IsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsZ0JBQWdCLEVBQWhCLENBQWdCLENBQUM7SUFDbEMsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsVUFBVSxFQUFWLENBQVUsQ0FBQztJQUM1QixpQkFBVSxDQUFDLGNBQU0sT0FBQSxXQUFXLEVBQVgsQ0FBVyxDQUFDO0lBQzdCLGlCQUFVLENBQUMsY0FBTSxPQUFBLGdCQUFnQixFQUFoQixDQUFnQixDQUFDO0lBQ2xDLGlCQUFVLENBQUMsY0FBTSxPQUFBLFFBQVEsRUFBUixDQUFRLENBQUM7SUFDMUIsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsb0JBQW9CLEVBQXBCLENBQW9CLENBQUM7SUFDdEMsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsb0JBQW9CLEVBQXBCLENBQW9CLENBQUM7SUFDdEMsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsb0JBQW9CLEVBQXBCLENBQW9CLENBQUM7SUFDdEMsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsTUFBTSxFQUFOLENBQU0sQ0FBQztJQUN4QixjQUFLO0NBQ04sQ0FBQztBQUVGLElBQU0sU0FBUyxHQUFxQjtJQUNsQyxpQkFBVSxDQUFDLGNBQU0sT0FBQSxZQUFZLEVBQVosQ0FBWSxDQUFDO0lBQzlCLGlCQUFVLENBQUMsY0FBTSxPQUFBLGtCQUFrQixFQUFsQixDQUFrQixDQUFDO0lBQ3BDLGlCQUFVLENBQUMsY0FBTSxPQUFBLFlBQVksRUFBWixDQUFZLENBQUM7SUFDOUIsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsaUJBQWlCLEVBQWpCLENBQWlCLENBQUM7SUFDbkMsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsWUFBWSxFQUFaLENBQVksQ0FBQztJQUM5QixpQkFBVSxDQUFDLGNBQU0sT0FBQSxXQUFXLEVBQVgsQ0FBVyxDQUFDO0lBQzdCLGtCQUFTO0NBQ1YsQ0FBQztBQUNGO0lBQUE7UUFDRSxRQUFHLEdBQWEsRUFBRSxDQUFDO1FBQ25CLGlCQUFZLEdBQVUsRUFBRSxDQUFDO0lBb0IzQixDQUFDO0lBbEJDLHNDQUFrQixHQUFsQixVQUFtQixFQUFPLEVBQUUsUUFBZ0IsRUFBRSxTQUFjO1FBQzFELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFJLFFBQVEsU0FBSSxTQUFXLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsMkJBQU8sR0FBUCxVQUFRLElBQVMsRUFBRSxLQUFhO1FBQzlCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQUssS0FBSyxPQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQseUJBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNILGtCQUFrQjtJQUNYLG9CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxBQXRCRCxJQXNCQztBQUNEO0lBQ0UsNkJBQW9CLFNBQTBCLEVBQVUsSUFBZTtRQUFuRCxjQUFTLEdBQVQsU0FBUyxDQUFpQjtRQUFVLFNBQUksR0FBSixJQUFJLENBQVc7SUFBRyxDQUFDO0lBRTNFLDZDQUFlLEdBQWYsVUFBZ0IsY0FBbUM7UUFDakQsTUFBTSxDQUFDLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RixDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsOEJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsaUJBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsa0NBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsOEJBQWUsR0FBRztRQUN6QixFQUFDLElBQUksRUFBRSxTQUFTLEdBQUc7S0FDbEIsQ0FBQztJQUNGLDBCQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFFRDtJQUE4QixtQ0FBZ0I7SUFDNUMseUJBQVksUUFBa0IsRUFBVSxJQUFlO1FBQUksa0JBQU0sUUFBUSxDQUFDLENBQUM7UUFBbkMsU0FBSSxHQUFKLElBQUksQ0FBVztJQUFxQixDQUFDO0lBRTdFLDRDQUFrQixHQUFsQixVQUFtQixhQUFrQixFQUFFLFlBQW9CLEVBQUUsYUFBa0I7UUFDN0UsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsWUFBWSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3pFLGdCQUFLLENBQUMsa0JBQWtCLFlBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsaUNBQU8sR0FBUCxVQUFRLFVBQWUsRUFBRSxLQUFhLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRixzQkFBQztBQUFELENBQUMsQUFURCxDQUE4QixpQ0FBZ0IsR0FTN0M7QUFFRDtJQUNFLDJCQUFtQixhQUFxQixFQUFTLE1BQWM7UUFBNUMsa0JBQWEsR0FBYixhQUFhLENBQVE7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFRO0lBQUcsQ0FBQztJQUNyRSx3QkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBQ0Q7SUFBQTtRQUNFLFlBQU8sR0FBd0IsRUFBRSxDQUFDO0lBZ0JwQyxDQUFDO0lBZEMsMEJBQUcsR0FBSCxVQUFJLGFBQXFCLEVBQUUsTUFBYztRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLGlCQUFpQixDQUFDLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCw0QkFBSyxHQUFMLGNBQVUsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRTlCLDZCQUFNLEdBQU4sVUFBTyxPQUFpQjtRQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsVUFBQyxLQUFLLElBQUssT0FBQSxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBcEMsQ0FBb0MsQ0FBQzthQUN0RSxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxDQUFHLEtBQUssQ0FBQyxhQUFhLFNBQUksS0FBSyxDQUFDLE1BQU0sQ0FBRSxFQUF4QyxDQUF3QyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNILGtCQUFrQjtJQUNYLHVCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLG1CQUFDO0FBQUQsQ0FBQyxBQWpCRCxJQWlCQztBQUNEO0lBQUE7UUFDRSxVQUFLLEdBQVcsQ0FBQyxDQUFDO0lBTXBCLENBQUM7SUFMQyxnQ0FBUyxHQUFULFVBQVUsS0FBVSxJQUFJLE1BQU0sQ0FBSSxLQUFLLGVBQVUsSUFBSSxDQUFDLEtBQUssRUFBSyxDQUFDLENBQUMsQ0FBQztJQUNyRSxrQkFBa0I7SUFDWCx1QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxXQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFDLEVBQUcsRUFBRTtLQUMvQyxDQUFDO0lBQ0YsbUJBQUM7QUFBRCxDQUFDLEFBUEQsSUFPQztBQUNEO0lBQUE7UUFDRSxVQUFLLEdBQVcsQ0FBQyxDQUFDO0lBTXBCLENBQUM7SUFMQyxzQ0FBUyxHQUFULFVBQVUsS0FBVSxJQUFJLE1BQU0sQ0FBSSxLQUFLLGVBQVUsSUFBSSxDQUFDLEtBQUssRUFBSyxDQUFDLENBQUMsQ0FBQztJQUNyRSxrQkFBa0I7SUFDWCw2QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxXQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBQyxFQUFHLEVBQUU7S0FDbEUsQ0FBQztJQUNGLHlCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFDRDtJQUNFLDJCQUFvQixZQUEwQjtRQUExQixpQkFBWSxHQUFaLFlBQVksQ0FBYztJQUFHLENBQUM7SUFFbEQsdUNBQVcsR0FBWCxjQUFnQixJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFNUUscUNBQVMsR0FBVCxVQUFVLEtBQVUsSUFBUyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM3QyxrQkFBa0I7SUFDWCw0QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxXQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUMsRUFBRyxFQUFFO0tBQ3BELENBQUM7SUFDRixrQkFBa0I7SUFDWCxnQ0FBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxZQUFZLEdBQUc7S0FDckIsQ0FBQztJQUNGLHdCQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFDRDtJQUFBO0lBTUEsQ0FBQztJQUxDLGdDQUFTLEdBQVQsVUFBVSxLQUFVLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDekMsa0JBQWtCO0lBQ1gsdUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsV0FBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLGNBQWMsRUFBQyxFQUFHLEVBQUU7S0FDL0MsQ0FBQztJQUNGLG1CQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFDRDtJQUFBO0lBTUEsQ0FBQztJQUxDLCtCQUFTLEdBQVQsVUFBVSxLQUFVLElBQUksTUFBTSxDQUFDLG1CQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxrQkFBa0I7SUFDWCxzQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxXQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUUsYUFBYSxFQUFDLEVBQUcsRUFBRTtLQUM5QyxDQUFDO0lBQ0Ysa0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQUNEO0lBQUE7SUFRQSxDQUFDO0lBUEMsZ0NBQVMsR0FBVCxVQUFVLEtBQVUsRUFBRSxJQUFTLEVBQUUsSUFBUyxFQUFFLElBQWdCO1FBQWhCLG9CQUFnQixHQUFoQixnQkFBZ0I7UUFDMUQsTUFBTSxDQUFJLEtBQUssU0FBSSxJQUFJLFNBQUksSUFBSSxTQUFJLElBQU0sQ0FBQztJQUM1QyxDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsdUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsV0FBSSxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLGNBQWMsRUFBQyxFQUFHLEVBQUU7S0FDL0MsQ0FBQztJQUNGLG1CQUFDO0FBQUQsQ0FBQyxBQVJELElBUUM7QUFDRDtJQUFBO0lBUUEsQ0FBQztJQUpELGtCQUFrQjtJQUNYLHdCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLEVBQUcsRUFBRTtLQUNoSCxDQUFDO0lBQ0Ysb0JBQUM7QUFBRCxDQUFDLEFBUkQsSUFRQztBQUNEO0lBQUE7SUFLQSxDQUFDO0lBSkQsa0JBQWtCO0lBQ1gsMkJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLGNBQWMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUMsRUFBRyxFQUFFO0tBQ2pILENBQUM7SUFDRix1QkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBQ0Q7SUFFRSxxQkFBbUIsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7SUFBRyxDQUFDO0lBRTNELDBCQUFJLEdBQUosY0FBUSxDQUFDO0lBQ1gsa0JBQWtCO0lBQ1gsc0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSx3REFBd0Q7b0JBQ2xFLElBQUksRUFBRSxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUM7b0JBQ3pCLFVBQVUsRUFBRSxjQUFjO29CQUMxQixLQUFLLEVBQUUsU0FBUztpQkFDakIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDBCQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLHdCQUFpQixHQUFHO0tBQzFCLENBQUM7SUFDRixrQkFBa0I7SUFDWCwwQkFBYyxHQUEyQztRQUNoRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtLQUMxQixDQUFDO0lBQ0Ysa0JBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDO0FBQ0Q7SUFRRSxrQkFBbUIsaUJBQW9DO1FBQXBDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBbUI7UUFQaEQsZ0JBQVcsR0FBUSxDQUFDLENBQUM7SUFPOEIsQ0FBQztJQUwzRCxzQkFBSSxxQ0FBZTthQUFuQjtZQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ1osQ0FBQzs7O09BQUE7SUFJRCx1QkFBSSxHQUFKLGNBQVEsQ0FBQztJQUNYLGtCQUFrQjtJQUNYLG1CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxVQUFVO29CQUNwQixRQUFRLEVBQUUsMkVBQTJFO29CQUNyRixJQUFJLEVBQUUsRUFBQyxTQUFTLEVBQUUsUUFBUSxFQUFDO29CQUMzQixVQUFVLEVBQUUsY0FBYztvQkFDMUIsS0FBSyxFQUFFLFNBQVM7b0JBQ2hCLGVBQWUsRUFBRSw4QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsdUJBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsd0JBQWlCLEdBQUc7S0FDMUIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHVCQUFjLEdBQTJDO1FBQ2hFLE9BQU8sRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLFlBQUssRUFBRSxFQUFFO0tBQzFCLENBQUM7SUFDRixlQUFDO0FBQUQsQ0FBQyxBQTlCRCxJQThCQztBQUNEO0lBQUE7UUFBeUIsWUFBTyxHQUFHLElBQUksb0JBQVksRUFBVSxDQUFDO0lBUzlELENBQUM7SUFSRCxrQkFBa0I7SUFDWCwyQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLG9CQUFvQixFQUFDLEVBQUcsRUFBRTtLQUM5RCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsK0JBQWMsR0FBMkM7UUFDaEUsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRyxFQUFFLEVBQUU7S0FDaEQsQ0FBQztJQUNGLHVCQUFDO0FBQUQsQ0FBQyxBQVRELElBU0M7QUFDRDtJQUNFLGdCQUFvQixjQUFnQyxFQUFVLFlBQWlDO1FBQTNFLG1CQUFjLEdBQWQsY0FBYyxDQUFrQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFxQjtJQUMvRixDQUFDO0lBRUQsbUNBQWtCLEdBQWxCLGNBQTRCLElBQUksQ0FBQyxjQUFjLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMxRixrQkFBa0I7SUFDWCxpQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBQyxFQUFHLEVBQUU7S0FDcEQsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHFCQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLHVCQUFnQixHQUFHO1FBQzFCLEVBQUMsSUFBSSxFQUFFLGtCQUFXLEdBQUc7S0FDcEIsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQUNEO0lBTUUsdUJBQW1CLEdBQWlCO1FBQWpCLFFBQUcsR0FBSCxHQUFHLENBQWM7UUFGcEMsaUJBQVksR0FBeUIsSUFBSSxvQkFBWSxFQUFVLENBQUM7SUFFekIsQ0FBQztJQUV4QywrQkFBTyxHQUFQLFVBQVEsS0FBVSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUUzQyxpQ0FBUyxHQUFULGNBQWMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFckQsZ0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7UUFDcEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sSUFBSSwwQkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLENBQUM7SUFDSCxDQUFDO0lBRUQsbUNBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDdkMsSUFBTSxDQUFDLEdBQTBCLEVBQUUsQ0FBQztRQUNwQyw2QkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQUMsQ0FBZSxFQUFFLEdBQVcsSUFBSyxPQUFBLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsWUFBWSxFQUF2QixDQUF1QixDQUFDLENBQUM7UUFDN0YsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7UUFDakIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sSUFBSSwwQkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLENBQUM7SUFDSCxDQUFDO0lBRUQsMENBQWtCLEdBQWxCO1FBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLE1BQU0sSUFBSSwwQkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLENBQUM7SUFDSCxDQUFDO0lBRUQsNkNBQXFCLEdBQXJCO1FBQ0UsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSx1QkFBdUIsQ0FBQyxDQUFDO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksdUJBQXVCLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sSUFBSSwwQkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25DLENBQUM7SUFDSCxDQUFDO0lBRUQsdUNBQWUsR0FBZjtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUMzQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLElBQUksMEJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxDQUFDO0lBQ0gsQ0FBQztJQUVELDBDQUFrQixHQUFsQjtRQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUM5QyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLG9CQUFvQixDQUFDLENBQUMsQ0FBQztZQUN6QyxNQUFNLElBQUksMEJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxDQUFDO0lBQ0gsQ0FBQztJQUVELG1DQUFXLEdBQVg7UUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLElBQUksYUFBYSxDQUFDLENBQUMsQ0FBQztZQUNsQyxNQUFNLElBQUksMEJBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuQyxDQUFDO0lBQ0gsQ0FBQztJQUNILGtCQUFrQjtJQUNYLHdCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBQyxFQUFHLEVBQUU7S0FDdEYsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDRCQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLFlBQVksR0FBRztLQUNyQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNEJBQWMsR0FBMkM7UUFDaEUsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7UUFDdkIsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7UUFDdkIsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRyxFQUFFLEVBQUU7UUFDckQsU0FBUyxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLEVBQUU7S0FDNUIsQ0FBQztJQUNGLG9CQUFDO0FBQUQsQ0FBQyxBQTlFRCxJQThFQztBQUNEO0lBT0UsOEJBQW1CLEdBQWlCO1FBQWpCLFFBQUcsR0FBSCxHQUFHLENBQWM7SUFBRyxDQUFDO0lBTHhDLHNCQUFJLHNDQUFJO2FBQVIsVUFBUyxLQUFhO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFHSCxrQkFBa0I7SUFDWCwrQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBQyxFQUFHLEVBQUU7S0FDekQsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG1DQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLFlBQVksR0FBRztLQUNyQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsbUNBQWMsR0FBMkM7UUFDaEUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRyxFQUFFLEVBQUU7S0FDbEQsQ0FBQztJQUNGLDJCQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQUNEO0lBT0UsOEJBQW1CLEdBQWlCLEVBQUUsT0FBNkI7UUFBaEQsUUFBRyxHQUFILEdBQUcsQ0FBYztJQUFrQyxDQUFDO0lBTHZFLHNCQUFJLHNDQUFJO2FBQVIsVUFBUyxLQUFhO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFHSCxrQkFBa0I7SUFDWCwrQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBQyxFQUFHLEVBQUU7S0FDekQsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG1DQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLFlBQVksR0FBRztRQUN0QixFQUFDLElBQUksRUFBRSxvQkFBb0IsR0FBRztLQUM3QixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsbUNBQWMsR0FBMkM7UUFDaEUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRyxFQUFFLEVBQUU7S0FDbEQsQ0FBQztJQUNGLDJCQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQUNEO0lBT0UsOEJBQW1CLEdBQWlCLEVBQUUsT0FBNkI7UUFBaEQsUUFBRyxHQUFILEdBQUcsQ0FBYztJQUFrQyxDQUFDO0lBTHZFLHNCQUFJLHNDQUFJO2FBQVIsVUFBUyxLQUFhO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQzs7O09BQUE7SUFHSCxrQkFBa0I7SUFDWCwrQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBQyxFQUFHLEVBQUU7S0FDekQsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLG1DQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLFlBQVksR0FBRztRQUN0QixFQUFDLElBQUksRUFBRSxvQkFBb0IsR0FBRztLQUM3QixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsbUNBQWMsR0FBMkM7UUFDaEUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLElBQUksRUFBRSxDQUFDLGFBQWEsRUFBRyxFQUFFLEVBQUU7S0FDbEQsQ0FBQztJQUNGLDJCQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQUVEO0lBQ0UsMkJBQW1CLFNBQWlCO1FBQWpCLGNBQVMsR0FBVCxTQUFTLENBQVE7SUFBRyxDQUFDO0lBQzFDLHdCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFDRDtJQUNFLG9CQUFZLFdBQTJDLEVBQUUsS0FBdUI7UUFDOUUsS0FBSyxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxJQUFJLGlCQUFpQixDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztJQUNqRixDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gscUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxjQUFjLEVBQUMsRUFBRyxFQUFFO0tBQ3hELENBQUM7SUFDRixrQkFBa0I7SUFDWCx5QkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxrQkFBVyxHQUFHO1FBQ3JCLEVBQUMsSUFBSSxFQUFFLHVCQUFnQixHQUFHO0tBQ3pCLENBQUM7SUFDRixpQkFBQztBQUFELENBQUMsQUFiRCxJQWFDO0FBQ0Q7SUFBQTtRQUdFLFlBQU8sR0FBWSxJQUFJLENBQUM7SUFvQjFCLENBQUM7SUFsQkMscUJBQUksR0FBSixVQUFLLElBQVksRUFBRSxPQUF1QjtRQUF2Qix1QkFBdUIsR0FBdkIsY0FBdUI7UUFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVELHNCQUFLLEdBQUwsVUFBTSxDQUFNLElBQVksTUFBTSxDQUFDLFNBQU8sQ0FBRyxDQUFDLENBQUMsQ0FBQztJQUU1Qyw0QkFBVyxHQUFYLFVBQVksR0FBUSxJQUFTLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRTFDLHlCQUFRLEdBQVI7UUFDRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksR0FBRyxFQUFFLEdBQUcsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFaEYsTUFBTSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztJQUN2QyxDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsaUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUMsRUFBRyxFQUFFO0tBQ2hELENBQUM7SUFDRixhQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQUVEO0lBSUUsaUJBQW1CLEtBQWEsRUFBUyxRQUFvQjtRQUEzQix3QkFBMkIsR0FBM0IsZUFBMkI7UUFBMUMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVk7UUFIN0Qsb0JBQWUsR0FBVyxDQUFDLENBQUM7UUFDNUIsdUJBQWtCLEdBQVcsQ0FBQyxDQUFDO0lBRWlDLENBQUM7SUFFakUsc0JBQUkseUJBQUk7YUFBUjtZQUNFLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDO2FBT0QsVUFBUyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FQOUI7SUFFRCxzQkFBSSw0QkFBTzthQUFYO1lBQ0UsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7WUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdkIsQ0FBQzthQUlELFVBQVksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BSnBDO0lBTUQsMEJBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ2pELGNBQUM7QUFBRCxDQUFDLEFBckJELElBcUJDO0FBQ0Q7SUFBQTtRQUNFLFVBQUssR0FBUSxJQUFJLENBQUM7SUFLcEIsQ0FBQztJQUpELGtCQUFrQjtJQUNYLHdCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFDLEVBQUcsRUFBRTtLQUNoRCxDQUFDO0lBQ0Ysb0JBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQUNEO0lBQUE7SUFNQSxDQUFDO0lBSkQsa0JBQWtCO0lBQ1gsbUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUMsRUFBRyxFQUFFO0tBQ2hELENBQUM7SUFDRixlQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFDRDtJQUFBO0lBUUEsQ0FBQztJQUxDLHNCQUFJLGlDQUFDO2FBQUwsY0FBVSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDL0Isa0JBQWtCO0lBQ1gsNkJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUMsRUFBRyxFQUFFO0tBQ2hELENBQUM7SUFDRix5QkFBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBRUQ7SUFBQTtJQUVBLENBQUM7SUFBRCxhQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFDRDtJQUEyQixnQ0FBYztJQUF6QztRQUEyQiw4QkFBYztJQUt6QyxDQUFDO0lBSkQsa0JBQWtCO0lBQ1gsdUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUMsRUFBRyxFQUFFO0tBQ2hELENBQUM7SUFDRixtQkFBQztBQUFELENBQUMsQUFMRCxDQUEyQixNQUFNLEdBS2hDO0FBQ0Q7SUFBaUMsc0NBQXNCO0lBQXZEO1FBQWlDLDhCQUFzQjtJQUt2RCxDQUFDO0lBSkQsa0JBQWtCO0lBQ1gsNkJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUMsRUFBRyxFQUFFO0tBQ2hELENBQUM7SUFDRix5QkFBQztBQUFELENBQUMsQUFMRCxDQUFpQyxNQUFNLEdBS3RDIn0=