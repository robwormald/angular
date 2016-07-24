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
var ts_emitter_1 = require('@angular/compiler/src/output/ts_emitter');
var compile_metadata_1 = require('@angular/compiler/src/compile_metadata');
var o = require('@angular/compiler/src/output/output_ast');
var output_emitter_util_1 = require('./output_emitter_util');
var someModuleUrl = 'asset:somePackage/lib/somePath';
var anotherModuleUrl = 'asset:somePackage/lib/someOtherPath';
var sameModuleIdentifier = new compile_metadata_1.CompileIdentifierMetadata({ name: 'someLocalId', moduleUrl: someModuleUrl });
var externalModuleIdentifier = new compile_metadata_1.CompileIdentifierMetadata({ name: 'someExternalId', moduleUrl: anotherModuleUrl });
function main() {
    // Note supported features of our OutputAstin TS:
    // - real `const` like in Dart
    // - final fields
    testing_internal_1.describe('TypeScriptEmitter', function () {
        var emitter;
        var someVar;
        testing_internal_1.beforeEach(function () {
            emitter = new ts_emitter_1.TypeScriptEmitter(new output_emitter_util_1.SimpleJsImportGenerator());
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
            testing_internal_1.expect(emitStmt(someVar.set(o.literal(1)).toDeclStmt())).toEqual("var someVar:any = 1;");
            testing_internal_1.expect(emitStmt(someVar.set(o.literal(1)).toDeclStmt(null, [o.StmtModifier.Final])))
                .toEqual("const someVar:any = 1;");
            testing_internal_1.expect(emitStmt(someVar.set(o.literal(1)).toDeclStmt(), ['someVar']))
                .toEqual("export var someVar:any = 1;");
            testing_internal_1.expect(emitStmt(someVar.set(o.literal(1)).toDeclStmt(o.INT_TYPE)))
                .toEqual("var someVar:number = 1;");
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
                "import * as import0 from 'somePackage/someOtherPath';", "import0.someExternalId;"
            ].join('\n'));
        });
        testing_internal_1.it('should support operators', function () {
            var lhs = o.variable('lhs');
            var rhs = o.variable('rhs');
            testing_internal_1.expect(emitStmt(someVar.cast(o.INT_TYPE).toStmt())).toEqual('(<number>someVar);');
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
            testing_internal_1.expect(emitStmt(o.fn([], []).toStmt())).toEqual(['():void => {', '};'].join('\n'));
            testing_internal_1.expect(emitStmt(o.fn([], [new o.ReturnStatement(o.literal(1))], o.INT_TYPE).toStmt()))
                .toEqual(['():number => {', '  return 1;\n};'].join('\n'));
            testing_internal_1.expect(emitStmt(o.fn([new o.FnParam('param1', o.INT_TYPE)], []).toStmt())).toEqual([
                '(param1:number):void => {', '};'
            ].join('\n'));
        });
        testing_internal_1.it('should support function statements', function () {
            testing_internal_1.expect(emitStmt(new o.DeclareFunctionStmt('someFn', [], []))).toEqual(['function someFn():void {', '}'].join('\n'));
            testing_internal_1.expect(emitStmt(new o.DeclareFunctionStmt('someFn', [], []), ['someFn'])).toEqual([
                'export function someFn():void {', '}'
            ].join('\n'));
            testing_internal_1.expect(emitStmt(new o.DeclareFunctionStmt('someFn', [], [new o.ReturnStatement(o.literal(1))], o.INT_TYPE)))
                .toEqual(['function someFn():number {', '  return 1;', '}'].join('\n'));
            testing_internal_1.expect(emitStmt(new o.DeclareFunctionStmt('someFn', [new o.FnParam('param1', o.INT_TYPE)], []))).toEqual(['function someFn(param1:number):void {', '}'].join('\n'));
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
                'try {', '  body();', '} catch (error) {', '  const stack:any = error.stack;',
                '  catchFn(error,stack);', '}'
            ].join('\n'));
        });
        testing_internal_1.it('should support support throwing', function () { testing_internal_1.expect(emitStmt(new o.ThrowStmt(someVar))).toEqual('throw someVar;'); });
        testing_internal_1.describe('classes', function () {
            var callSomeMethod;
            testing_internal_1.beforeEach(function () { callSomeMethod = o.THIS_EXPR.callMethod('someMethod', []).toStmt(); });
            testing_internal_1.it('should support declaring classes', function () {
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, []))).toEqual(['class SomeClass {', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, []), ['SomeClass']))
                    .toEqual(['export class SomeClass {', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', o.variable('SomeSuperClass'), [], [], null, []))).toEqual(['class SomeClass extends SomeSuperClass {', '}'].join('\n'));
            });
            testing_internal_1.it('should support declaring constructors', function () {
                var superCall = o.SUPER_EXPR.callFn([o.variable('someParam')]).toStmt();
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], new o.ClassMethod(null, [], []), [])))
                    .toEqual(['class SomeClass {', '  constructor() {', '  }', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], new o.ClassMethod(null, [new o.FnParam('someParam', o.INT_TYPE)], []), [])))
                    .toEqual(['class SomeClass {', '  constructor(someParam:number) {', '  }', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], new o.ClassMethod(null, [], [superCall]), [])))
                    .toEqual([
                    'class SomeClass {', '  constructor() {', '    super(someParam);', '  }', '}'
                ].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], new o.ClassMethod(null, [], [callSomeMethod]), [])))
                    .toEqual([
                    'class SomeClass {', '  constructor() {', '    this.someMethod();', '  }', '}'
                ].join('\n'));
            });
            testing_internal_1.it('should support declaring fields', function () {
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [new o.ClassField('someField')], [], null, [])))
                    .toEqual(['class SomeClass {', '  someField:any;', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [new o.ClassField('someField', o.INT_TYPE)], [], null, [])))
                    .toEqual(['class SomeClass {', '  someField:number;', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [new o.ClassField('someField', o.INT_TYPE, [o.StmtModifier.Private])], [], null, [])))
                    .toEqual(['class SomeClass {', '  private someField:number;', '}'].join('\n'));
            });
            testing_internal_1.it('should support declaring getters', function () {
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [new o.ClassGetter('someGetter', [])], null, [])))
                    .toEqual(['class SomeClass {', '  get someGetter():any {', '  }', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [new o.ClassGetter('someGetter', [], o.INT_TYPE)], null, [])))
                    .toEqual(['class SomeClass {', '  get someGetter():number {', '  }', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [new o.ClassGetter('someGetter', [callSomeMethod])], null, [])))
                    .toEqual([
                    'class SomeClass {', '  get someGetter():any {', '    this.someMethod();', '  }', '}'
                ].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [new o.ClassGetter('someGetter', [], null, [o.StmtModifier.Private])], null, [])))
                    .toEqual(['class SomeClass {', '  private get someGetter():any {', '  }', '}'].join('\n'));
            });
            testing_internal_1.it('should support methods', function () {
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, [
                    new o.ClassMethod('someMethod', [], [])
                ]))).toEqual(['class SomeClass {', '  someMethod():void {', '  }', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, [
                    new o.ClassMethod('someMethod', [], [], o.INT_TYPE)
                ]))).toEqual(['class SomeClass {', '  someMethod():number {', '  }', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, [new o.ClassMethod('someMethod', [new o.FnParam('someParam', o.INT_TYPE)], [])])))
                    .toEqual([
                    'class SomeClass {', '  someMethod(someParam:number):void {', '  }', '}'
                ].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, [new o.ClassMethod('someMethod', [], [callSomeMethod])])))
                    .toEqual([
                    'class SomeClass {', '  someMethod():void {', '    this.someMethod();', '  }', '}'
                ].join('\n'));
            });
        });
        testing_internal_1.it('should support builtin types', function () {
            var writeVarExpr = o.variable('a').set(o.NULL_EXPR);
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.DYNAMIC_TYPE))).toEqual('var a:any = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.BOOL_TYPE))).toEqual('var a:boolean = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.INT_TYPE))).toEqual('var a:number = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.NUMBER_TYPE))).toEqual('var a:number = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.STRING_TYPE))).toEqual('var a:string = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.FUNCTION_TYPE))).toEqual('var a:Function = null;');
        });
        testing_internal_1.it('should support external types', function () {
            var writeVarExpr = o.variable('a').set(o.NULL_EXPR);
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.importType(sameModuleIdentifier))))
                .toEqual('var a:someLocalId = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.importType(externalModuleIdentifier)))).toEqual([
                "import * as import0 from 'somePackage/someOtherPath';",
                "var a:import0.someExternalId = null;"
            ].join('\n'));
        });
        testing_internal_1.it('should support combined types', function () {
            var writeVarExpr = o.variable('a').set(o.NULL_EXPR);
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(new o.ArrayType(null))))
                .toEqual('var a:any[] = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(new o.ArrayType(o.INT_TYPE))))
                .toEqual('var a:number[] = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(new o.MapType(null))))
                .toEqual('var a:{[key: string]:any} = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(new o.MapType(o.INT_TYPE))))
                .toEqual('var a:{[key: string]:number} = null;');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNfZW1pdHRlcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L291dHB1dC90c19lbWl0dGVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUE2RSx3Q0FBd0MsQ0FBQyxDQUFBO0FBRXRILHFCQUFzQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzlDLDJCQUFnQyx5Q0FBeUMsQ0FBQyxDQUFBO0FBQzFFLGlDQUF3Qyx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ2pGLElBQVksQ0FBQyxXQUFNLHlDQUF5QyxDQUFDLENBQUE7QUFDN0Qsb0NBQXNDLHVCQUF1QixDQUFDLENBQUE7QUFFOUQsSUFBSSxhQUFhLEdBQUcsZ0NBQWdDLENBQUM7QUFDckQsSUFBSSxnQkFBZ0IsR0FBRyxxQ0FBcUMsQ0FBQztBQUU3RCxJQUFJLG9CQUFvQixHQUNwQixJQUFJLDRDQUF5QixDQUFDLEVBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFDLENBQUMsQ0FBQztBQUVuRixJQUFJLHdCQUF3QixHQUN4QixJQUFJLDRDQUF5QixDQUFDLEVBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7QUFFekY7SUFDRSxpREFBaUQ7SUFDakQsOEJBQThCO0lBQzlCLGlCQUFpQjtJQUVqQiwyQkFBUSxDQUFDLG1CQUFtQixFQUFFO1FBQzVCLElBQUksT0FBMEIsQ0FBQztRQUMvQixJQUFJLE9BQXNCLENBQUM7UUFFM0IsNkJBQVUsQ0FBQztZQUNULE9BQU8sR0FBRyxJQUFJLDhCQUFpQixDQUFDLElBQUksNkNBQXVCLEVBQUUsQ0FBQyxDQUFDO1lBQy9ELE9BQU8sR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFD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