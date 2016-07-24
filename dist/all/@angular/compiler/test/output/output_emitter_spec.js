/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var typed = require('./output_emitter_codegen_typed');
var untyped = require('./output_emitter_codegen_untyped');
var output_jit_1 = require('@angular/compiler/src/output/output_jit');
var output_interpreter_1 = require('@angular/compiler/src/output/output_interpreter');
var output_emitter_util_1 = require('./output_emitter_util');
var core_1 = require('@angular/core');
var view_type_1 = require('@angular/core/src/linker/view_type');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
function main() {
    var outputDefs = [];
    outputDefs.push({
        'getExpressions': function () { return output_interpreter_1.interpretStatements(output_emitter_util_1.codegenStmts, 'getExpressions'); },
        'name': 'interpreted'
    });
    if (!dom_adapter_1.getDOM().supportsDOMEvents()) {
        // Our generator only works on node.js
        outputDefs.push({ 'getExpressions': function () { return typed.getExpressions; }, 'name': 'typed' });
    }
    else {
        // Our generator only works on node.js and Dart...
        if (!dom_adapter_1.getDOM().supportsDOMEvents()) {
            outputDefs.push({ 'getExpressions': function () { return untyped.getExpressions; }, 'name': 'untyped' });
        }
        outputDefs.push({
            'getExpressions': function () { return output_jit_1.jitStatements('output_emitter_spec', output_emitter_util_1.codegenStmts, 'getExpressions'); },
            'name': 'jit'
        });
    }
    testing_internal_1.describe('output emitter', function () {
        outputDefs.forEach(function (outputDef) {
            testing_internal_1.describe("" + outputDef['name'], function () {
                var expressions;
                testing_internal_1.beforeEach(function () { expressions = outputDef['getExpressions']()(); });
                testing_internal_1.it('should support literals', function () {
                    matchers_1.expect(expressions['stringLiteral']).toEqual('Hello World!');
                    matchers_1.expect(expressions['intLiteral']).toEqual(42);
                    matchers_1.expect(expressions['boolLiteral']).toEqual(true);
                    matchers_1.expect(expressions['arrayLiteral']).toEqual([0]);
                    matchers_1.expect(expressions['mapLiteral']).toEqual({ 'key0': 0 });
                });
                testing_internal_1.it('should support reading vars/keys/props', function () {
                    matchers_1.expect(expressions['readVar']).toEqual('someValue');
                    matchers_1.expect(expressions['readKey']).toEqual('someValue');
                    matchers_1.expect(expressions['readPropExternalInstance']).toEqual('someValue');
                    matchers_1.expect(expressions['readPropDynamicInstance']).toEqual('dynamicValue');
                    matchers_1.expect(expressions['readGetterDynamicInstance'])
                        .toEqual({ 'data': 'someValue', 'dynamicProp': 'dynamicValue' });
                });
                testing_internal_1.it('should support writing to vars / keys / props', function () {
                    matchers_1.expect(expressions['changedVar']).toEqual('changedValue');
                    matchers_1.expect(expressions['changedKey']).toEqual('changedValue');
                    matchers_1.expect(expressions['changedPropExternalInstance']).toEqual('changedValue');
                    matchers_1.expect(expressions['changedPropDynamicInstance']).toEqual('changedValue');
                });
                testing_internal_1.it('should support declaring functions with parameters and return', function () {
                    matchers_1.expect(expressions['fn']('someParam')).toEqual({ 'param': 'someParam' });
                    matchers_1.expect(expressions['closureInDynamicInstance']('someParam'))
                        .toEqual({ 'param': 'someParam', 'data': 'someValue', 'dynamicProp': 'dynamicValue' });
                });
                testing_internal_1.it('should support invoking functions and methods', function () {
                    matchers_1.expect(expressions['invokeFn']).toEqual({ 'param': 'someParam' });
                    matchers_1.expect(expressions['concatedArray']).toEqual([0, 1]);
                    matchers_1.expect(expressions['invokeMethodExternalInstance'])
                        .toEqual({ 'data': 'someValue', 'param': 'someParam' });
                    matchers_1.expect(expressions['invokeMethodExternalInstanceViaBind'])
                        .toEqual({ 'data': 'someValue', 'param': 'someParam' });
                    matchers_1.expect(expressions['invokeMethodDynamicInstance'])
                        .toEqual({ 'data': 'someValue', 'dynamicProp': 'dynamicValue', 'param': 'someParam' });
                    matchers_1.expect(expressions['invokeMethodDynamicInstanceViaBind'])
                        .toEqual({ 'data': 'someValue', 'dynamicProp': 'dynamicValue', 'param': 'someParam' });
                });
                testing_internal_1.it('should support conditionals', function () {
                    matchers_1.expect(expressions['conditionalTrue']).toEqual('true');
                    matchers_1.expect(expressions['conditionalFalse']).toEqual('false');
                });
                testing_internal_1.it('should support not', function () { matchers_1.expect(expressions['not']).toEqual(true); });
                testing_internal_1.it('should support reading external identifiers', function () {
                    matchers_1.expect(expressions['externalTestIdentifier']).toBe(output_emitter_util_1.ExternalClass);
                    matchers_1.expect(expressions['externalSrcIdentifier']).toBe(core_1.EventEmitter);
                    matchers_1.expect(expressions['externalEnumIdentifier']).toBe(view_type_1.ViewType.HOST);
                });
                testing_internal_1.it('should support instantiating classes', function () {
                    matchers_1.expect(expressions['externalInstance']).toBeAnInstanceOf(output_emitter_util_1.ExternalClass);
                    // Note: toBeAnInstanceOf does not check super classes in Dart...
                    matchers_1.expect(expressions['dynamicInstance'] instanceof output_emitter_util_1.ExternalClass).toBe(true);
                });
                testing_internal_1.describe('operators', function () {
                    var ops;
                    var aObj /** TODO #9100 */, bObj;
                    testing_internal_1.beforeEach(function () {
                        ops = expressions['operators'];
                        aObj = new Object();
                        bObj = new Object();
                    });
                    testing_internal_1.it('should support ==', function () {
                        matchers_1.expect(ops['=='](aObj, aObj)).toBe(true);
                        matchers_1.expect(ops['=='](aObj, bObj)).toBe(false);
                        matchers_1.expect(ops['=='](1, 1)).toBe(true);
                        matchers_1.expect(ops['=='](0, 1)).toBe(false);
                        matchers_1.expect(ops['==']('a', 'a')).toBe(true);
                        matchers_1.expect(ops['==']('a', 'b')).toBe(false);
                    });
                    testing_internal_1.it('should support !=', function () {
                        matchers_1.expect(ops['!='](aObj, aObj)).toBe(false);
                        matchers_1.expect(ops['!='](aObj, bObj)).toBe(true);
                        matchers_1.expect(ops['!='](1, 1)).toBe(false);
                        matchers_1.expect(ops['!='](0, 1)).toBe(true);
                        matchers_1.expect(ops['!=']('a', 'a')).toBe(false);
                        matchers_1.expect(ops['!=']('a', 'b')).toBe(true);
                    });
                    testing_internal_1.it('should support ===', function () {
                        matchers_1.expect(ops['==='](aObj, aObj)).toBe(true);
                        matchers_1.expect(ops['==='](aObj, bObj)).toBe(false);
                        matchers_1.expect(ops['==='](1, 1)).toBe(true);
                        matchers_1.expect(ops['==='](0, 1)).toBe(false);
                    });
                    testing_internal_1.it('should support !==', function () {
                        matchers_1.expect(ops['!=='](aObj, aObj)).toBe(false);
                        matchers_1.expect(ops['!=='](aObj, bObj)).toBe(true);
                        matchers_1.expect(ops['!=='](1, 1)).toBe(false);
                        matchers_1.expect(ops['!=='](0, 1)).toBe(true);
                    });
                    testing_internal_1.it('should support -', function () { matchers_1.expect(ops['-'](3, 2)).toEqual(1); });
                    testing_internal_1.it('should support +', function () { matchers_1.expect(ops['+'](1, 2)).toEqual(3); });
                    testing_internal_1.it('should support /', function () { matchers_1.expect(ops['/'](6, 2)).toEqual(3); });
                    testing_internal_1.it('should support *', function () { matchers_1.expect(ops['*'](2, 3)).toEqual(6); });
                    testing_internal_1.it('should support %', function () { matchers_1.expect(ops['%'](3, 2)).toEqual(1); });
                    testing_internal_1.it('should support &&', function () {
                        matchers_1.expect(ops['&&'](true, true)).toBe(true);
                        matchers_1.expect(ops['&&'](true, false)).toBe(false);
                    });
                    testing_internal_1.it('should support ||', function () {
                        matchers_1.expect(ops['||'](true, false)).toBe(true);
                        matchers_1.expect(ops['||'](false, false)).toBe(false);
                    });
                    testing_internal_1.it('should support <', function () {
                        matchers_1.expect(ops['<'](1, 2)).toBe(true);
                        matchers_1.expect(ops['<'](1, 1)).toBe(false);
                    });
                    testing_internal_1.it('should support <=', function () {
                        matchers_1.expect(ops['<='](1, 2)).toBe(true);
                        matchers_1.expect(ops['<='](1, 1)).toBe(true);
                    });
                    testing_internal_1.it('should support >', function () {
                        matchers_1.expect(ops['>'](2, 1)).toBe(true);
                        matchers_1.expect(ops['>'](1, 1)).toBe(false);
                    });
                    testing_internal_1.it('should support >=', function () {
                        matchers_1.expect(ops['>='](2, 1)).toBe(true);
                        matchers_1.expect(ops['>='](1, 1)).toBe(true);
                    });
                });
                testing_internal_1.it('should support throwing errors', function () { matchers_1.expect(expressions['throwError']).toThrowError('someError'); });
                testing_internal_1.it('should support catching errors', function () {
                    function someOperation() { throw new core_1.BaseException('Boom!'); }
                    var errorAndStack = expressions['catchError'](someOperation);
                    matchers_1.expect(errorAndStack[0].message).toEqual('Boom!');
                    // Somehow we don't get stacktraces on ios7...
                    if (!browser_util_1.browserDetection.isIOS7 && !browser_util_1.browserDetection.isIE) {
                        matchers_1.expect(errorAndStack[1].toString()).toContain('someOperation');
                    }
                });
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0X2VtaXR0ZXJfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdC9vdXRwdXQvb3V0cHV0X2VtaXR0ZXJfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQXFFLHdDQUF3QyxDQUFDLENBQUE7QUFDOUcseUJBQXFCLDRDQUE0QyxDQUFDLENBQUE7QUFFbEUsSUFBWSxLQUFLLFdBQU0sZ0NBQWdDLENBQUMsQ0FBQTtBQUN4RCxJQUFZLE9BQU8sV0FBTSxrQ0FBa0MsQ0FBQyxDQUFBO0FBQzVELDJCQUE0Qix5Q0FBeUMsQ0FBQyxDQUFBO0FBQ3RFLG1DQUFrQyxpREFBaUQsQ0FBQyxDQUFBO0FBQ3BGLG9DQUEwQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQ2xFLHFCQUEwQyxlQUFlLENBQUMsQ0FBQTtBQUMxRCwwQkFBdUIsb0NBQW9DLENBQUMsQ0FBQTtBQUM1RCw0QkFBcUIsK0NBQStDLENBQUMsQ0FBQTtBQUNyRSw2QkFBK0IsZ0RBQWdELENBQUMsQ0FBQTtBQUVoRjtJQUNFLElBQUksVUFBVSxHQUE0QixFQUFFLENBQUM7SUFDN0MsVUFBVSxDQUFDLElBQUksQ0FBQztRQUNkLGdCQUFnQixFQUFFLGNBQU0sT0FBQSx3Q0FBbUIsQ0FBQyxrQ0FBWSxFQUFFLGdCQUFnQixDQUFDLEVBQW5ELENBQW1EO1FBQzNFLE1BQU0sRUFBRSxhQUFhO0tBQ3RCLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxDQUFDLENBQUMsb0JBQU0sRUFBRSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLHNDQUFzQztRQUN0QyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUMsZ0JBQWdCLEVBQUUsY0FBTSxPQUFBLEtBQUssQ0FBQyxjQUFjLEVBQXBCLENBQW9CLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQyxDQUFD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