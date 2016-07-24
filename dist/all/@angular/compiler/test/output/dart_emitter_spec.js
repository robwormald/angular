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
var dart_emitter_1 = require('@angular/compiler/src/output/dart_emitter');
var compile_metadata_1 = require('@angular/compiler/src/compile_metadata');
var o = require('@angular/compiler/src/output/output_ast');
var dart_imports_1 = require('@angular/compiler/src/output/dart_imports');
var someModuleUrl = 'asset:somePackage/lib/somePath';
var anotherModuleUrl = 'asset:somePackage/lib/someOtherPath';
var sameModuleIdentifier = new compile_metadata_1.CompileIdentifierMetadata({ name: 'someLocalId', moduleUrl: someModuleUrl });
var externalModuleIdentifier = new compile_metadata_1.CompileIdentifierMetadata({ name: 'someExternalId', moduleUrl: anotherModuleUrl });
function main() {
    // Not supported features of our OutputAst in Dart:
    // - declaring what should be exported via a special statement like `export`.
    //   Dart exports everything that has no `_` in its name.
    // - declaring private fields via a statement like `private`.
    //   Dart exports everything that has no `_` in its name.
    // - return types for function expressions
    testing_internal_1.describe('DartEmitter', function () {
        var emitter;
        var someVar;
        testing_internal_1.beforeEach(function () {
            emitter = new dart_emitter_1.DartEmitter(new dart_imports_1.DartImportGenerator());
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
            testing_internal_1.expect(emitStmt(someVar.set(o.literal(1)).toDeclStmt(null, [o.StmtModifier.Final])))
                .toEqual("final someVar = 1;");
            testing_internal_1.expect(emitStmt(someVar
                .set(o.literal(1, new o.BuiltinType(o.BuiltinTypeName.Int, [o.TypeModifier.Const])))
                .toDeclStmt(null, [o.StmtModifier.Final])))
                .toEqual("const int someVar = 1;");
            testing_internal_1.expect(emitStmt(someVar.set(o.literal(1)).toDeclStmt(), ['someVar']))
                .toEqual("var someVar = 1;");
            testing_internal_1.expect(emitStmt(someVar.set(o.literal(1)).toDeclStmt(o.INT_TYPE)))
                .toEqual("int someVar = 1;");
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
                .toEqual('arr1..addAll(arr2);');
            testing_internal_1.expect(emitStmt(o.variable('observable')
                .callMethod(o.BuiltinMethod.SubscribeObservable, [o.variable('listener')])
                .toStmt()))
                .toEqual('observable.listen(listener);');
            testing_internal_1.expect(emitStmt(o.variable('fn').callMethod(o.BuiltinMethod.bind, [o.variable('someObj')]).toStmt()))
                .toEqual('fn;');
        });
        testing_internal_1.it('should support literals', function () {
            testing_internal_1.expect(emitStmt(o.literal(0).toStmt())).toEqual('0;');
            testing_internal_1.expect(emitStmt(o.literal(true).toStmt())).toEqual('true;');
            testing_internal_1.expect(emitStmt(o.literal('someStr').toStmt())).toEqual("'someStr';");
            testing_internal_1.expect(emitStmt(o.literal('$a').toStmt())).toEqual("'\\$a';");
            testing_internal_1.expect(emitStmt(o.literalArr([o.literal(1)]).toStmt())).toEqual("[1];");
            testing_internal_1.expect(emitStmt(o.literalMap([['someKey', o.literal(1)]]).toStmt()))
                .toEqual("{'someKey': 1};");
            testing_internal_1.expect(emitStmt(o.literalMap([['someKey', o.literal(1)]], new o.MapType(o.NUMBER_TYPE)).toStmt()))
                .toEqual("<String, num>{'someKey': 1};");
        });
        testing_internal_1.it('should support external identifiers', function () {
            testing_internal_1.expect(emitStmt(o.importExpr(sameModuleIdentifier).toStmt())).toEqual('someLocalId;');
            testing_internal_1.expect(emitStmt(o.importExpr(externalModuleIdentifier).toStmt())).toEqual([
                "import 'someOtherPath' as import0;", "import0.someExternalId;"
            ].join('\n'));
        });
        testing_internal_1.it('should support operators', function () {
            var lhs = o.variable('lhs');
            var rhs = o.variable('rhs');
            testing_internal_1.expect(emitStmt(someVar.cast(o.INT_TYPE).toStmt())).toEqual('(someVar as int);');
            testing_internal_1.expect(emitStmt(o.not(someVar).toStmt())).toEqual('!someVar;');
            testing_internal_1.expect(emitStmt(someVar.conditional(o.variable('trueCase'), o.variable('falseCase')).toStmt()))
                .toEqual('(someVar? trueCase: falseCase);');
            testing_internal_1.expect(emitStmt(lhs.equals(rhs).toStmt())).toEqual('(lhs == rhs);');
            testing_internal_1.expect(emitStmt(lhs.notEquals(rhs).toStmt())).toEqual('(lhs != rhs);');
            testing_internal_1.expect(emitStmt(lhs.identical(rhs).toStmt())).toEqual('identical(lhs, rhs);');
            testing_internal_1.expect(emitStmt(lhs.notIdentical(rhs).toStmt())).toEqual('!identical(lhs, rhs);');
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
            testing_internal_1.expect(emitStmt(o.fn([], []).toStmt())).toEqual(['() {', '};'].join('\n'));
            testing_internal_1.expect(emitStmt(o.fn([new o.FnParam('param1', o.INT_TYPE)], []).toStmt())).toEqual([
                '(int param1) {', '};'
            ].join('\n'));
        });
        testing_internal_1.it('should support function statements', function () {
            testing_internal_1.expect(emitStmt(new o.DeclareFunctionStmt('someFn', [], []))).toEqual(['void someFn() {', '}'].join('\n'));
            testing_internal_1.expect(emitStmt(new o.DeclareFunctionStmt('someFn', [], [new o.ReturnStatement(o.literal(1))], o.INT_TYPE)))
                .toEqual(['int someFn() {', '  return 1;', '}'].join('\n'));
            testing_internal_1.expect(emitStmt(new o.DeclareFunctionStmt('someFn', [new o.FnParam('param1', o.INT_TYPE)], []))).toEqual(['void someFn(int param1) {', '}'].join('\n'));
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
                'try {', '  body();', '} catch (error, stack) {', '  catchFn(error,stack);', '}'
            ].join('\n'));
        });
        testing_internal_1.it('should support support throwing', function () { testing_internal_1.expect(emitStmt(new o.ThrowStmt(someVar))).toEqual('throw someVar;'); });
        testing_internal_1.describe('classes', function () {
            var callSomeMethod;
            testing_internal_1.beforeEach(function () { callSomeMethod = o.THIS_EXPR.callMethod('someMethod', []).toStmt(); });
            testing_internal_1.it('should support declaring classes', function () {
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, []))).toEqual(['class SomeClass {', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', o.variable('SomeSuperClass'), [], [], null, []))).toEqual(['class SomeClass extends SomeSuperClass {', '}'].join('\n'));
            });
            testing_internal_1.it('should support declaring constructors', function () {
                var superCall = o.SUPER_EXPR.callFn([o.variable('someParam')]).toStmt();
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], new o.ClassMethod(null, [], []), [])))
                    .toEqual(['class SomeClass {', '  SomeClass() {', '  }', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], new o.ClassMethod(null, [new o.FnParam('someParam', o.INT_TYPE)], []), [])))
                    .toEqual(['class SomeClass {', '  SomeClass(int someParam) {', '  }', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], new o.ClassMethod(null, [], [superCall]), [])))
                    .toEqual(['class SomeClass {', '  SomeClass(): super(someParam) {', '  }', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], new o.ClassMethod(null, [], [callSomeMethod]), [])))
                    .toEqual([
                    'class SomeClass {', '  SomeClass() {', '    this.someMethod();', '  }', '}'
                ].join('\n'));
            });
            testing_internal_1.it('should support declaring fields', function () {
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [new o.ClassField('someField')], [], null, [])))
                    .toEqual(['class SomeClass {', '  var someField;', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [new o.ClassField('someField', o.INT_TYPE)], [], null, [])))
                    .toEqual(['class SomeClass {', '  int someField;', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [new o.ClassField('someField', o.INT_TYPE, [o.StmtModifier.Final])], [], null, [])))
                    .toEqual(['class SomeClass {', '  final int someField;', '}'].join('\n'));
            });
            testing_internal_1.it('should support declaring getters', function () {
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [new o.ClassGetter('someGetter', [])], null, [])))
                    .toEqual(['class SomeClass {', '  get someGetter {', '  }', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [new o.ClassGetter('someGetter', [], o.INT_TYPE)], null, [])))
                    .toEqual(['class SomeClass {', '  int get someGetter {', '  }', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [new o.ClassGetter('someGetter', [callSomeMethod])], null, [])))
                    .toEqual([
                    'class SomeClass {', '  get someGetter {', '    this.someMethod();', '  }', '}'
                ].join('\n'));
            });
            testing_internal_1.it('should support methods', function () {
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, [
                    new o.ClassMethod('someMethod', [], [])
                ]))).toEqual(['class SomeClass {', '  void someMethod() {', '  }', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, [
                    new o.ClassMethod('someMethod', [], [], o.INT_TYPE)
                ]))).toEqual(['class SomeClass {', '  int someMethod() {', '  }', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, [new o.ClassMethod('someMethod', [new o.FnParam('someParam', o.INT_TYPE)], [])])))
                    .toEqual(['class SomeClass {', '  void someMethod(int someParam) {', '  }', '}'].join('\n'));
                testing_internal_1.expect(emitStmt(new o.ClassStmt('SomeClass', null, [], [], null, [new o.ClassMethod('someMethod', [], [callSomeMethod])])))
                    .toEqual([
                    'class SomeClass {', '  void someMethod() {', '    this.someMethod();', '  }', '}'
                ].join('\n'));
            });
        });
        testing_internal_1.it('should support builtin types', function () {
            var writeVarExpr = o.variable('a').set(o.NULL_EXPR);
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.DYNAMIC_TYPE))).toEqual('dynamic a = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.BOOL_TYPE))).toEqual('bool a = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.INT_TYPE))).toEqual('int a = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.NUMBER_TYPE))).toEqual('num a = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.STRING_TYPE))).toEqual('String a = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.FUNCTION_TYPE))).toEqual('Function a = null;');
        });
        testing_internal_1.it('should support external types', function () {
            var writeVarExpr = o.variable('a').set(o.NULL_EXPR);
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.importType(sameModuleIdentifier))))
                .toEqual('someLocalId a = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(o.importType(externalModuleIdentifier)))).toEqual([
                "import 'someOtherPath' as import0;", "import0.someExternalId a = null;"
            ].join('\n'));
        });
        testing_internal_1.it('should support combined types', function () {
            var writeVarExpr = o.variable('a').set(o.NULL_EXPR);
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(new o.ArrayType(null))))
                .toEqual('List<dynamic> a = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(new o.ArrayType(o.INT_TYPE))))
                .toEqual('List<int> a = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(new o.MapType(null))))
                .toEqual('Map<String, dynamic> a = null;');
            testing_internal_1.expect(emitStmt(writeVarExpr.toDeclStmt(new o.MapType(o.INT_TYPE))))
                .toEqual('Map<String, int> a = null;');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFydF9lbWl0dGVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3Qvb3V0cHV0L2RhcnRfZW1pdHRlcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBNkUsd0NBQXdDLENBQUMsQ0FBQTtBQUV0SCxxQkFBc0IsdUJBQXVCLENBQUMsQ0FBQTtBQUM5Qyw2QkFBMEIsMkNBQTJDLENBQUMsQ0FBQTtBQUN0RSxpQ0FBd0Msd0NBQXdDLENBQUMsQ0FBQTtBQUNqRixJQUFZLENBQUMsV0FBTSx5Q0FBeUMsQ0FBQyxDQUFBO0FBQzdELDZCQUFrQywyQ0FBMkMsQ0FBQyxDQUFBO0FBRTlFLElBQUksYUFBYSxHQUFHLGdDQUFnQyxDQUFDO0FBQ3JELElBQUksZ0JBQWdCLEdBQUcscUNBQXFDLENBQUM7QUFFN0QsSUFBSSxvQkFBb0IsR0FDcEIsSUFBSSw0Q0FBeUIsQ0FBQyxFQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLGFBQWEsRUFBQyxDQUFDLENBQUM7QUFFbkYsSUFBSSx3QkFBd0IsR0FDeEIsSUFBSSw0Q0FBeUIsQ0FBQyxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLEVBQUUsZ0JBQWdCLEVBQUMsQ0FBQyxDQUFDO0FBRXpGO0lBQ0UsbURBQW1EO0lBQ25ELDZFQUE2RTtJQUM3RSx5REFBeUQ7SUFDekQsNkRBQTZEO0lBQzdELHlEQUF5RDtJQUN6RCwwQ0FBMEM7SUFFMUMsMkJBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDdEIsSUFBSSxPQUFvQixDQUFDO1FBQ3pCLElBQUksT0FBc0IsQ0FBQztRQUUzQiw2QkFBVSxDQUFDO1lBQ1QsT0FBTyxHQUFHLElBQUksMEJBQVcsQ0FBQyxJQUFJLGtDQUFtQixFQUFFLENBQUMsQ0FBQztZQUNyRCxPQUFPLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUVILGtCQUFrQixJQUFpQixFQUFFLFlBQTZCO1lBQTdCLDRCQUE2QixHQUE3QixtQkFBNkI7WUFDaEUsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsWUFBWSxHQUFHLEVBQUUsQ0FBQztZQUNwQixDQUFDO1lBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDckUsQ0FBQztRQUVELHFCQUFFLENBQUMsMEJBQTBCLEVBQUU7WUFDN0IseUJBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3JGLHlCQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDL0UsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDbkMseUJBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTztpQkFDRixHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FDVixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3hFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDMUQsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDdkMseUJBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2lCQUNoRSxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNqQyx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQzdELE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyxpQ0FBaUMsRUFBRTtZQUNwQyx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2RCx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzdFLHlCQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDL0UsT0FBTyxDQUFDLCtCQUErQixDQUFDLENBQUM7UUFDaEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLDRCQUE0QixFQUFFO1lBQy9CLHlCQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUN0RSxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNsQyx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUN4RixPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsa0NBQWtDLEVBQUU7WUFDckMseUJBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDNUQsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDbEMseUJBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUM5RSxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsc0RBQXNELEVBQUU7WUFDekQseUJBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzdGLHlCQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7aUJBQ3BGLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQ3ZDLHlCQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDekUsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLGdDQUFnQyxFQUFFO1lBQ25DLHlCQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO2lCQUNiLFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztpQkFDN0QsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDMUIsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFFcEMseUJBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7aUJBQ25CLFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLG1CQUFtQixFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2lCQUN6RSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUMxQixPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztZQUU3Qyx5QkFBTSxDQUNGLFFBQVEsQ0FDSixDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7aUJBQ3hGLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMseUJBQXlCLEVBQUU7WUFDNUIseUJBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RELHlCQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM1RCx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDdEUseUJBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlELHlCQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hFLHlCQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7aUJBQy9ELE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQ2hDLHlCQUFNLENBQUMsUUFBUSxDQUNKLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztpQkFDeEYsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLHFDQUFxQyxFQUFFO1lBQ3hDLHlCQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3RGLHlCQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUN4RSxvQ0FBb0MsRUFBRSx5QkFBeUI7YUFDaEUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNoQixDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsMEJBQTBCLEVBQUU7WUFDN0IsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM1QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVCLHlCQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQztZQUNqRix5QkFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDL0QseUJBQU0sQ0FDRixRQUFRLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUN2RixPQUFPLENBQUMsaUNBQWlDLENBQUMsQ0FBQztZQUVoRCx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDcEUseUJBQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZFLHlCQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1lBQzlFLHlCQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1lBQ2xGLHlCQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNsRSx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDakUseUJBQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ25FLHlCQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyRSx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbkUseUJBQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ2pFLHlCQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNoRSx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDbEUseUJBQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3pFLHlCQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNuRSx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLHFDQUFxQyxFQUFFO1lBQ3hDLHlCQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDM0UseUJBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDakYsZ0JBQWdCLEVBQUUsSUFBSTthQUN2QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyxvQ0FBb0MsRUFBRTtZQUN2Qyx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxFQUFFLEVBQ3ZELENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsaUJBQWlCLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEQseUJBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsbUJBQW1CLENBQzlCLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ3hFLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNoRSx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQzFGLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLHlCQUF5QixFQUFFO1lBQzVCLHlCQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25GLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyx3QkFBd0IsRUFBRTtZQUMzQixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxRCxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM1RCx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDckUsMkJBQTJCO2FBQzVCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDZCx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNsRixhQUFhLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxHQUFHO2FBQ2xFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLDBCQUEwQixFQUFFO1lBQzdCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3RELElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUM5Rix5QkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSwwQkFBMEIsRUFBRSx5QkFBeUIsRUFBRSxHQUFHO2FBQ2pGLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDaEIsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLGlDQUFpQyxFQUNqQyxjQUFRLHlCQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwRiwyQkFBUSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLGNBQTJCLENBQUM7WUFFaEMsNkJBQVUsQ0FBQyxjQUFRLGNBQWMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUUxRixxQkFBRSxDQUFDLGtDQUFrQyxFQUFFO2dCQUNyQyx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUNoRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLG1CQUFtQixFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNwRCx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUN4RixDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLDBDQUEwQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQyxDQUFDO1lBRUgscUJBQUUsQ0FBQyx1Q0FBdUMsRUFBRTtnQkFDMUMsSUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDeEUseUJBQU0sQ0FBQyxRQUFRLENBQ0osSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUN2RixPQUFPLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzlFLHlCQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDcEIsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUN6QixJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNsRixPQUFPLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSw4QkFBOEIsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNGLHlCQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDcEIsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNoRixPQUFPLENBQ0osQ0FBQyxtQkFBbUIsRUFBRSxtQ0FBbUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNGLHlCQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDcEIsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNyRixPQUFPLENBQUM7b0JBQ1AsbUJBQW1CLEVBQUUsaUJBQWlCLEVBQUUsd0JBQXdCLEVBQUUsS0FBSyxFQUFFLEdBQUc7aUJBQzdFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLGlDQUFpQyxFQUFFO2dCQUNwQyx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQ3BCLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ3pFLE9BQU8sQ0FBQyxDQUFDLG1CQUFtQixFQUFFLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4RSx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQ3BCLFdBQVcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDckYsT0FBTyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3hFLHlCQUFNLENBQ0YsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FDcEIsV0FBVyxFQUFFLElBQUksRUFDakIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ3ZGLE9BQU8sQ0FBQyxDQUFDLG1CQUFtQixFQUFFLHdCQUF3QixFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLENBQUMsQ0FBQyxDQUFDO1lBRUgscUJBQUUsQ0FBQyxrQ0FBa0MsRUFBRTtnQkFDckMseUJBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUNwQixXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDL0UsT0FBTyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNqRix5QkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQ3BCLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUM5RSxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNYLE9BQU8sQ0FBQyxDQUFDLG1CQUFtQixFQUFFLHdCQUF3QixFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDckYseUJBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUNwQixXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUNoRixFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNYLE9BQU8sQ0FBQztvQkFDUCxtQkFBbUIsRUFBRSxvQkFBb0IsRUFBRSx3QkFBd0IsRUFBRSxLQUFLLEVBQUUsR0FBRztpQkFDaEYsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQztZQUVILHFCQUFFLENBQUMsd0JBQXdCLEVBQUU7Z0JBQzNCLHlCQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFO29CQUMvRCxJQUFJLENBQUMsQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUM7aUJBQ3hDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsdUJBQXVCLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNwRix5QkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRTtvQkFDL0QsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUM7aUJBQ3BELENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsbUJBQW1CLEVBQUUsc0JBQXNCLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUNuRix5QkFBTSxDQUNGLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQ3BCLFdBQVcsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQy9CLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3JGLE9BQU8sQ0FDSixDQUFDLG1CQUFtQixFQUFFLG9DQUFvQyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDNUYseUJBQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUNwQixXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUMvQixDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDaEUsT0FBTyxDQUFDO29CQUNQLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLHdCQUF3QixFQUFFLEtBQUssRUFBRSxHQUFHO2lCQUNuRixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLDhCQUE4QixFQUFFO1lBQ2pDLElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNwRCx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDdkYseUJBQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2pGLHlCQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDL0UseUJBQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUNsRix5QkFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDckYseUJBQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQzNGLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQywrQkFBK0IsRUFBRTtZQUNsQyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEQseUJBQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN4RSxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUN0Qyx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3hGLG9DQUFvQyxFQUFFLGtDQUFrQzthQUN6RSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQywrQkFBK0IsRUFBRTtZQUNsQyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEQseUJBQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMzRCxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUN4Qyx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqRSxPQUFPLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUVwQyx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3pELE9BQU8sQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1lBQy9DLHlCQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQy9ELE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBbFNlLFlBQUksT0FrU25CLENBQUEifQ==