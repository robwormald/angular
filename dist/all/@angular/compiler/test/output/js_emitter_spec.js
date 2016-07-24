/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var lang_1 = require('../../src/facade/lang');
var js_emitter_1 = require('@angular/compiler/src/output/js_emitter');
var compile_metadata_1 = require('@angular/compiler/src/compile_metadata');
var o = require('@angular/compiler/src/output/output_ast');
var output_emitter_util_1 = require('./output_emitter_util');
var someModuleUrl = 'asset:somePackage/lib/somePath';
var anotherModuleUrl = 'asset:somePackage/lib/someOtherPath';
var sameModuleIdentifier = new compile_metadata_1.CompileIdentifierMetadata({ name: 'someLocalId', moduleUrl: someModuleUrl });
var externalModuleIdentifier = new compile_metadata_1.CompileIdentifierMetadata({ name: 'someExternalId', moduleUrl: anotherModuleUrl });
function main() {
    // Note supported features of our OutputAstin JavaScript / ES5:
    // - types
    // - declaring fields
    testing_internal_1.describe('JavaScriptEmitter', function () {
        var emitter;
        var someVar;
        testing_internal_1.beforeEach(function () {
            emitter = new js_emitter_1.JavaScriptEmitter(new output_emitter_util_1.SimpleJsImportGenerator());
            someVar = o.variable('someVar');
        });
        function emitStmt(stmt, exportedVars) {
            if (exportedVars === void 0) { exportedVars = null; }
            if (lang_1.isBlank(exportedVars)) {
                exportedVars = [];
            }
            return emitter.emitStatements(someModuleUrl, [stmt], exportedVars);
        }
        testing_internal_1.it('should declare variables', function () {
            testing_internal_1.expect(emitStmt(someVar.set(o.literal(1)).toDeclStmt())).toEqual("var someVar = 1;");
            testing_internal_1.expect(emitStmt(someVar.set(o.literal(1)).toDeclStmt(), ['someVar'])).toEqual([
                'var someVar = 1;',
                "Object.defineProperty(exports, 'someVar', { get: function() { return someVar; }});"
            ].join('\n'));
        });
        testing_internal_1.it('should read and write variables', function () {
            testing_internal_1.expect(emitStmt(someVar.toStmt())).toEqual("someVar;");
            testing_internal_1.expect(emitStmt(someVar.set(o.literal(1)).toStmt())).toEqual("someVar = 1;");
            testing_internal_1.expect(emitStmt(someVar.set(o.variable('someOtherVar').set(o.literal(1))).toStmt()))
                .toEqual("someVar = (someOtherVar = 1);");
        });
        testing_internal_1.it('should read and write keys', function () {
            testing_internal_1.expect(emitStmt(o.variable('someMap').key(o.variable('someKey')).toStmt()))
                .toEqual("someMap[someKey];");
            testing_internal_1.expect(emitStmt(o.variable('someMap').key(o.variable('someKey')).set(o.literal(1)).toStmt()))
                .toEqual("someMap[someKey] = 1;");
        });
        testing_internal_1.it('should read and write properties', function () {
            testing_internal_1.expect(emitStmt(o.variable('someObj').prop('someProp').toStmt()))
                .toEqual("someObj.someProp;");
            testing_internal_1.expect(emitStmt(o.variable('someObj').prop('someProp').set(o.literal(1)).toStmt()))
                .toEqual("someObj.someProp = 1;");
        });
        testing_internal_1.it('should invoke functions and methods and constructors', function () {
            testing_internal_1.expect(emitStmt(o.variable('someFn').callFn([o.literal(1)]).toStmt())).toEqual('someFn(1);');
            testing_internal_1.expect(emitStmt(o.variable('someObj').callMethod('someMethod', [o.literal(1)]).toStmt()))
                .toEqual('someObj.someMethod(1);');
            testing_internal_1.expect(emitStmt(o.variable('SomeClass').instantiate([o.literal(1)]).toStmt()))
                .toEqual('new SomeClass(1);');
        });
        testing_internal_1.it('should support builtin methods', function () {
            testing_internal_1.expect(emitStmt(o.variable('arr1')
                .callMethod(o.BuiltinMethod.ConcatArray, [o.variable('arr2')])
                .toStmt()))
                .toEqual('arr1.concat(arr2);');
            testing_internal_1.expect(emitStmt(o.variable('observable')
                .callMethod(o.BuiltinMethod.SubscribeObservable, [o.variable('listener')])
                .toStmt()))
                .toEqual('observable.subscribe(listener);');
            testing_internal_1.expect(emitStmt(o.variable('fn').callMethod(o.BuiltinMethod.bind, [o.variable('someObj')]).toStmt()))
                .toEqual('fn.bind(someObj);');
        });
        testing_internal_1.it('should support literals', function () {
            testing_internal_1.expect(emitStmt(o.literal(0).toStmt())).toEqual('0;');
            testing_internal_1.expect(emitStmt(o.literal(true).toStmt())).toEqual('true;');
            testing_internal_1.expect(emitStmt(o.literal('someStr').toStmt())).toEqual("'someStr';");
            testing_internal_1.expect(emitStmt(o.literalArr([o.literal(1)]).toStmt())).toEqual("[1];");
            testing_internal_1.expect(emitStmt(o.literalMap([['someKey', o.literal(1)]]).toStmt()))
                .toEqual("{'someKey': 1};");
        });
        testing_internal_1.it('should support external identifiers', function () {
            testing_internal_1.expect(emitStmt(o.importExpr(sameModuleIdentifier).toStmt())).toEqual('someLocalId;');
            testing_internal_1.expect(emitStmt(o.importExpr(externalModuleIdentifier).toStmt())).toEqual([
                "var import0 = re" +
                    "quire('somePackage/someOtherPath');",
                "import0.someExternalId;"
            ].join('\n'));
        });
        testing_internal_1.it('should support operators', function () {
            var lhs = o.variable('lhs');
            var rhs = o.variable('rhs');
            testing_internal_1.expect(emitStmt(o.not(someVar).toStmt())).toEqual('!someVar;');
            testing_internal_1.expect(emitStmt(someVar.conditional(o.variable('trueCase'), o.variable('falseCase')).toStmt()))
                .toEqual('(someVar? trueCase: falseCase);');
            testing_internal_1.expect(emitStmt(lhs.equals(rhs).toStmt())).toEqual('(lhs == rhs);');
            testing_internal_1.expect(emitStmt(lhs.notEquals(rhs).toStmt())).toEqual('(lhs != rhs);');
            testing_internal_1.expect(emitStmt(lhs.identical(rhs).toStmt())).toEqual('(lhs === rhs);');
            testing_internal_1.expect(emitStmt(lhs.notIdentical(rhs).toStmt())).toEqual('(lhs !== rhs);');
            testing_internal_1.expect(emitStmt(lhs.minus(rhs).toStmt())).toEqual('(lhs - rhs);');
            testing_internal_1.expect(emitStmt(lhs.plus(rhs).toStmt())).toEqual('(lhs + rhs);');
            testing_internal_1.expect(emitStmt(lhs.divide(rhs).toStmt())).toEqual('(lhs / rhs);');
            testing_internal_1.expect(emitStmt(lhs.multiply(rhs).toStmt())).toEqual('(lhs * rhs);');
            testing_internal_1.expect(emitStmt(lhs.modulo(rhs).toStmt())).toEqual('(lhs % rhs);');
            testing_internal_1.expect(emitStmt(lhs.and(rhs).toStmt())).toEqual('(lhs && rhs);');
            testing_internal_1.expect(emitStmt(lhs.or(rhs).toStmt())).toEqual('(lhs || rhs);');
            testing_internal_1.expect(emitStmt(lhs.lower(rhs).toStmt())).toEqual('(lhs < rhs);');
            testing_internal_1.expect(emitStmt(lhs.lowerEquals(rhs).toStmt())).toEqual('(lhs <= rhs);');
            testing_internal_1.expect(emitStmt(lhs.bigger(rhs).toStmt())).toEqual('(lhs > rhs);');
            testing_internal_1.expect(emitStmt(lhs.biggerEquals(rhs).toStmt())).toEqual('(lhs >= rhs);');
        });
        testing_internal_1.it('should support function expressions', function () {
            testing_internal_1.expect(emitStmt(o.fn([], []).toStmt())).toEqual(['function() {', '};'].join('\n'));
            testing_internal_1.expect(emitStmt(o.fn([], [new o.ReturnStatement(o.literal(1))]).toStmt())).toEqual([
                'function() {', '  return 1;\n};'
            ].join('\n'));
            testing_internal_1.expect(emitStmt(o.fn([new o.FnParam('param1')], []).toStmt())).toEqual([
                'function(param1) {', '};'
            ].join('\n'));
        });
        testing_internal_1.it('should support function statements', function () {
            testing_internal_1.expect(emitStmt(new o.DeclareFunctionStmt('someFn', [], []))).toEqual(['function someFn() {', '}'].join('\n'));
            testing_internal_1.expect(emitStmt(new o.DeclareFunctionStmt('someFn', [], []), ['someFn'])).toEqual([
                'function someFn() {', '}',
                "Object.defineProperty(exports, 'someFn', { get: function() { return someFn; }});"
            ].join('\n'));
            testing_internal_1.expect(emitStmt(new o.DeclareFunctionStmt('someFn', [], [
                new o.ReturnStatement(o.literal(1))
            ]))).toEqual(['function someFn() {', '  return 1;', '}'].join('\n'));
            testing_internal_1.expect(emitStmt(new o.DeclareFunctionStmt('someFn', [new o.FnParam('param1')], []))).toEqual(['function someFn(param1) {', '}'].join('\n'));
        });
        testing_internal_1.it('should support comments', function () {
            testing_internal_1.expect(emitStmt(new o.CommentStmt('a\nb'))).toEqual(['// a', '// b'].join('\n'));
        });
        testing_internal_1.it('should support if stmt', function () {
            var trueCase = o.variable('trueCase').callFn([]).toStmt();
            var falseCase = o.variable('falseCase').callFn([]).toStmt();
            testing_internal_1.expect(emitStmt(new o.IfStmt(o.variable('cond'), [trueCase]))).toEqual([
                'if (cond) { trueCase(); }'
            ].join('\n'));
            testing_internal_1.expect(emitStmt(new o.IfStmt(o.variable('cond'), [trueCase], [falseCase]))).toEqual([
                'if (cond) {', '  trueCase();', '} else {', '  falseCase();', '}'
            ].join('\n'));
        });
        testing_internal_1.it('should support try/catch', function () {
            var bodyStmt = o.variable('body').callFn([]).toStmt();
            var catchStmt = o.variable('catchFn').callFn([o.CATCH_ERROR_VAR, o.CATCH_STACK_VAR]).toStmt();
            testing_internal_1.expect(emitStmt(new o.TryCatchStmt([bodyStmt], [catchStmt]))).toEqual([
                'try {', '  body();', '} catch (error) {', '  var stack = error.stack;',
                '  catchFn(error,stack);', '}'
            ].join('\n'));
        });
        testing_internal_1.it('should support support throwing', function () { testing_internal_1.expect(emitStmt(new o.ThrowStmt(someVar))).toEqual('throw someVar;'); });
        testing_internal_1.describe('classes', function () {
            var callSomeMethod;
            testing_internal_1.beforeEach(function () { callSomeMethod = o.THIS_EXPR.callMethod('someMethod', []).toStmt(); });
            testing_internal_1.it('should support declaring classes', function () {
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, []))).toEqual(['function SomeClass() {', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, []), ['SomeClass']))
                    .toEqual([
                    'function SomeClass() {', '}',
                    "Object.defineProperty(exports, 'SomeClass', { get: function() { return SomeClass; }});"
                ].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', o.variable('SomeSuperClass'), [], [], null, [])))
                    .toEqual([
                    'function SomeClass() {', '}',
                    'SomeClass.prototype = Object.create(SomeSuperClass.prototype);'
                ].join('\n'));
            });
            testing_internal_1.it('should support declaring constructors', function () {
                var superCall = o.SUPER_EXPR.callFn([o.variable('someParam')]).toStmt();
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], new o.ClassMethod(null, [], []), [])))
                    .toEqual(['function SomeClass() {', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], new o.ClassMethod(null, [new o.FnParam('someParam')], []), [])))
                    .toEqual(['function SomeClass(someParam) {', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', o.variable('SomeSuperClass'), [], [], new o.ClassMethod(null, [], [superCall]), [])))
                    .toEqual([
                    'function SomeClass() {', '  var self = this;',
                    '  SomeSuperClass.call(this, someParam);', '}',
                    'SomeClass.prototype = Object.create(SomeSuperClass.prototype);'
                ].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], new o.ClassMethod(null, [], [callSomeMethod]), [])))
                    .toEqual([
                    'function SomeClass() {', '  var self = this;', '  self.someMethod();', '}'
                ].join('\n'));
            });
            testing_internal_1.it('should support declaring getters', function () {
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [new o.ClassGetter('someGetter', [])], null, [])))
                    .toEqual([
                    'function SomeClass() {', '}',
                    "Object.defineProperty(SomeClass.prototype, 'someGetter', { get: function() {", "}});"
                ].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [new o.ClassGetter('someGetter', [callSomeMethod])], null, [])))
                    .toEqual([
                    'function SomeClass() {', '}',
                    "Object.defineProperty(SomeClass.prototype, 'someGetter', { get: function() {",
                    "  var self = this;", "  self.someMethod();", "}});"
                ].join('\n'));
            });
            testing_internal_1.it('should support methods', function () {
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, [new o.ClassMethod('someMethod', [], [])])))
                    .toEqual([
                    'function SomeClass() {', '}', 'SomeClass.prototype.someMethod = function() {', '};'
                ].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, [new o.ClassMethod('someMethod', [new o.FnParam('someParam')], [])])))
                    .toEqual([
                    'function SomeClass() {', '}',
                    'SomeClass.prototype.someMethod = function(someParam) {', '};'
                ].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, [new o.ClassMethod('someMethod', [], [callSomeMethod])])))
                    .toEqual([
                    'function SomeClass() {', '}', 'SomeClass.prototype.someMethod = function() {',
                    '  var self = this;', '  self.someMethod();', '};'
                ].join('\n'));
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNfZW1pdHRlcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L291dHB1dC9qc19lbWl0dGVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUE2RSx3Q0FBd0MsQ0FBQyxDQUFBO0FBRXRILHFCQUFzQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzlDLDJCQUFnQyx5Q0FBeUMsQ0FBQyxDQUFBO0FBQzFFLGlDQUF3Qyx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ2pGLElBQVksQ0FBQyxXQUFNLHlDQUF5QyxDQUFDLENBQUE7QUFDN0Qsb0NBQXNDLHVCQUF1QixDQUFDLENBQUE7QUFFOUQsSUFBSSxhQUFhLEdBQUcsZ0NBQWdDLENBQUM7QUFDckQsSUFBSSxnQkFBZ0IsR0FBRyxxQ0FBcUMsQ0FBQztBQUU3RCxJQUFJLG9CQUFvQixHQUNwQixJQUFJLDRDQUF5QixDQUFDLEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFDLENBQUMsQ0FBQztBQUVuRixJQUFJLHdCQUF3QixHQUN4QixJQUFJLDRDQUF5QixDQUFDLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7QUFFekY7SUFDRSwrREFBK0Q7SUFDL0QsVUFBVTtJQUNWLHFCQUFxQjtJQUVyQiwyQkFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQzVCLElBQUksT0FBMEIsQ0FBQztRQUMvQixJQUFJLE9BQXNCLENBQUM7UUFFM0IsNkJBQVUsQ0FBQztZQUNULE9BQU8sR0FBRyxJQUFJLDhCQUFpQixDQUFDLElBQUksNkNBQXVCLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELE9BQU8sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FB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