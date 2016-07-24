/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
// ATTENTION: This file will be overwritten with generated code by main()
var js_emitter_1 = require('@angular/compiler/src/output/js_emitter');
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
    var emitter = new js_emitter_1.JavaScriptEmitter(new output_emitter_util_1.SimpleJsImportGenerator());
    var emittedCode = emitter.emitStatements(util_1.assetUrl('compiler', 'output/output_emitter_codegen_untyped', 'test'), output_emitter_util_1.codegenStmts, output_emitter_util_1.codegenExportsVars);
    return emittedCode;
}
exports.emit = emit;
function main(args) {
    var emittedCode = emit();
    // debug: console.error(emittedCode);
    lang_1.print(emittedCode);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0cHV0X2VtaXR0ZXJfY29kZWdlbl91bnR5cGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L291dHB1dC9vdXRwdXRfZW1pdHRlcl9jb2RlZ2VuX3VudHlwZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHlFQUF5RTtBQUN6RSwyQkFBZ0MseUNBQXlDLENBQUMsQ0FBQTtBQUUxRSwyQkFBNEIsNkJBQTZCLENBQUMsQ0FBQTtBQUMxRCxxQkFBb0IsdUJBQXVCLENBQUMsQ0FBQTtBQUM1QyxxQkFBdUIsZ0JBQWdCLENBQUMsQ0FBQTtBQUV4QyxvQ0FBd0UsdUJBQXVCLENBQUMsQ0FBQTtBQUVoRztJQUNFLE1BQU0sQ0FBQywwQkFBYSxFQUFFLENBQUM7QUFDekIsQ0FBQztBQUZlLHNCQUFjLGlCQUU3QixDQUFBO0FBRUQsWUFBWTtBQUNaO0lBQ0UsSUFBSSxPQUFPLEdBQUcsSUFBSSw4QkFBaUIsQ0FBQyxJQUFJLDZDQUF1QixFQUFFLENBQUMsQ0FBQztJQUNuRSxJQUFJLFdBQVcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUNwQyxlQUFRLENBQUMsVUFBVSxFQUFFLHVDQUF1QyxFQUFFLE1BQU0sQ0FBQyxFQUFFLGtDQUFZLEVBQ25GLHdDQUFrQixDQUFDLENBQUM7SUFDeEIsTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBTmUsWUFBSSxPQU1uQixDQUFBO0FBRUQsY0FBcUIsSUFBYztJQUNqQyxJQUFJLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQztJQUN6QixxQ0FBcUM7SUFDckMsWUFBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JCLENBQUM7QUFKZSxZQUFJLE9BSW5CLENBQUEifQ==