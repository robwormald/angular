/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
// ATTENTION: This file will be overwritten with generated code by main()
var dart_emitter_1 = require('@angular/compiler/src/output/dart_emitter');
var dart_imports_1 = require('@angular/compiler/src/output/dart_imports');
var ts_emitter_1 = require('@angular/compiler/src/output/ts_emitter');
var exceptions_1 = require('../../src/facade/exceptions');
var lang_1 = require('../../src/facade/lang');
var util_1 = require('../../src/util');
var output_emitter_util_1 = require('./output_emitter_util');
function getExpressions() {
    return exceptions_1.unimplemented();
}
exports.getExpressions = getExpressions;
// Generator
function emit() {
    var emitter = lang_1.IS_DART ? new dart_emitter_1.DartEmitter(new dart_imports_1.DartImportGenerator()) :
        new ts_emitter_1.TypeScriptEmitter(new output_emitter_util_1.SimpleJsImportGenerator());
    var emittedCode = emitter.emitStatements(util_1.assetUrl('compiler', 'output/output_emitter_codegen_typed', 'test'), output_emitter_util_1.codegenStmts, output_emitter_util_1.codegenExportsVars);
    return emittedCode;
}
exports.emit = emit;
function main(args) {
    var emittedCode = emit();
    // debug: console.error(emittedCode);
    lang_1.print(emittedCode);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0X2VtaXR0ZXJfY29kZWdlbl90eXBlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdC9vdXRwdXQvb3V0cHV0X2VtaXR0ZXJfY29kZWdlbl90eXBlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgseUVBQXlFO0FBQ3pFLDZCQUEwQiwyQ0FBMkMsQ0FBQyxDQUFBO0FBQ3RFLDZCQUFrQywyQ0FBMkMsQ0FBQyxDQUFBO0FBRTlFLDJCQUFnQyx5Q0FBeUMsQ0FBQyxDQUFBO0FBRTFFLDJCQUE0Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBQzFELHFCQUE2Qix1QkFBdUIsQ0FBQyxDQUFBO0FBQ3JELHFCQUF1QixnQkFBZ0IsQ0FBQyxDQUFBO0FBRXhDLG9DQUF3RSx1QkFBdUIsQ0FBQyxDQUFBO0FBRWhHO0lBQ0UsTUFBTSxDQUFDLDBCQUFhLEVBQUUsQ0FBQztBQUN6QixDQUFDO0FBRmUsc0JBQWMsaUJBRTdCLENBQUE7QUFFRCxZQUFZO0FBQ1o7SUFDRSxJQUFJLE9BQU8sR0FBRyxjQUFPLEdBQUcsSUFBSSwwQkFBVyxDQUFDLElBQUksa0NBQW1CLEVBQUUsQ0FBQztRQUMxQyxJQUFJLDhCQUFpQixDQUFDLElBQUksNkNBQXVCLEVBQUUsQ0FBQyxDQUFDO0lBQzdFLElBQUksV0FBVyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQ3BDLGVBQVEsQ0FBQyxVQUFVLEVBQUUscUNBQXFDLEVBQUUsTUFBTSxDQUFDLEVBQUUsa0NBQVksRUFDakYsd0NBQWtCLENBQUMsQ0FBQztJQUN4QixNQUFNLENBQUMsV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFQZSxZQUFJLE9BT25CLENBQUE7QUFFRCxjQUFxQixJQUFjO0lBQ2pDLElBQUksV0FBVyxHQUFHLElBQUksRUFBRSxDQUFDO0lBQ3pCLHFDQUFxQztJQUNyQyxZQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckIsQ0FBQztBQUplLFlBQUksT0FJbkIsQ0FBQSJ9