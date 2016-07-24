/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var html_ast_1 = require('@angular/compiler/src/html_ast');
var exceptions_1 = require('../src/facade/exceptions');
function humanizeDom(parseResult, addSourceSpan) {
    if (addSourceSpan === void 0) { addSourceSpan = false; }
    if (parseResult.errors.length > 0) {
        var errorString = parseResult.errors.join('\n');
        throw new exceptions_1.BaseException("Unexpected parse errors:\n" + errorString);
    }
    return humanizeNodes(parseResult.rootNodes, addSourceSpan);
}
exports.humanizeDom = humanizeDom;
function humanizeDomSourceSpans(parseResult) {
    return humanizeDom(parseResult, true);
}
exports.humanizeDomSourceSpans = humanizeDomSourceSpans;
function humanizeNodes(nodes, addSourceSpan) {
    if (addSourceSpan === void 0) { addSourceSpan = false; }
    var humanizer = new _Humanizer(addSourceSpan);
    html_ast_1.htmlVisitAll(humanizer, nodes);
    return humanizer.result;
}
exports.humanizeNodes = humanizeNodes;
function humanizeLineColumn(location) {
    return location.line + ":" + location.col;
}
exports.humanizeLineColumn = humanizeLineColumn;
var _Humanizer = (function () {
    function _Humanizer(includeSourceSpan) {
        this.includeSourceSpan = includeSourceSpan;
        this.result = [];
        this.elDepth = 0;
    }
    ;
    _Humanizer.prototype.visitElement = function (ast, context) {
        var res = this._appendContext(ast, [html_ast_1.HtmlElementAst, ast.name, this.elDepth++]);
        this.result.push(res);
        html_ast_1.htmlVisitAll(this, ast.attrs);
        html_ast_1.htmlVisitAll(this, ast.children);
        this.elDepth--;
    };
    _Humanizer.prototype.visitAttr = function (ast, context) {
        var res = this._appendContext(ast, [html_ast_1.HtmlAttrAst, ast.name, ast.value]);
        this.result.push(res);
    };
    _Humanizer.prototype.visitText = function (ast, context) {
        var res = this._appendContext(ast, [html_ast_1.HtmlTextAst, ast.value, this.elDepth]);
        this.result.push(res);
    };
    _Humanizer.prototype.visitComment = function (ast, context) {
        var res = this._appendContext(ast, [html_ast_1.HtmlCommentAst, ast.value, this.elDepth]);
        this.result.push(res);
    };
    _Humanizer.prototype.visitExpansion = function (ast, context) {
        var res = this._appendContext(ast, [html_ast_1.HtmlExpansionAst, ast.switchValue, ast.type, this.elDepth++]);
        this.result.push(res);
        html_ast_1.htmlVisitAll(this, ast.cases);
        this.elDepth--;
    };
    _Humanizer.prototype.visitExpansionCase = function (ast, context) {
        var res = this._appendContext(ast, [html_ast_1.HtmlExpansionCaseAst, ast.value, this.elDepth]);
        this.result.push(res);
    };
    _Humanizer.prototype._appendContext = function (ast, input) {
        if (!this.includeSourceSpan)
            return input;
        input.push(ast.sourceSpan.toString());
        return input;
    };
    return _Humanizer;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbF9hc3Rfc3BlY191dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdC9odG1sX2FzdF9zcGVjX3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBc0osZ0NBQWdDLENBQUMsQ0FBQTtBQUl2TCwyQkFBNEIsMEJBQTBCLENBQUMsQ0FBQTtBQUV2RCxxQkFDSSxXQUFnQyxFQUFFLGFBQThCO0lBQTlCLDZCQUE4QixHQUE5QixxQkFBOEI7SUFDbEUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxJQUFJLFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxNQUFNLElBQUksMEJBQWEsQ0FBQywrQkFBNkIsV0FBYSxDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUVELE1BQU0sQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBUmUsbUJBQVcsY0FRMUIsQ0FBQTtBQUVELGdDQUF1QyxXQUFnQztJQUNyRSxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRmUsOEJBQXNCLHlCQUVyQyxDQUFBO0FBRUQsdUJBQThCLEtBQWdCLEVBQUUsYUFBOEI7SUFBOUIsNkJBQThCLEdBQTlCLHFCQUE4QjtJQUM1RSxJQUFJLFNBQVMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUM5Qyx1QkFBWSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUMvQixNQUFNLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUMxQixDQUFDO0FBSmUscUJBQWEsZ0JB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