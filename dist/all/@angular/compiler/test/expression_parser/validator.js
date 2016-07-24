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
var ast_1 = require('../../src/expression_parser/ast');
var unparser_1 = require('./unparser');
var ASTValidator = (function (_super) {
    __extends(ASTValidator, _super);
    function ASTValidator() {
        _super.apply(this, arguments);
    }
    ASTValidator.prototype.visit = function (ast) {
        this.parentSpan = undefined;
        ast.visit(this);
    };
    ASTValidator.prototype.validate = function (ast, cb) {
        if (!inSpan(ast.span, this.parentSpan)) {
            throw Error("Invalid AST span [expected (" + ast.span.start + ", " + ast.span.end + ") to be in (" + this.parentSpan.start + ",  " + this.parentSpan.end + ") for " + unparser_1.unparse(ast));
        }
        var oldParent = this.parentSpan;
        this.parentSpan = ast.span;
        cb();
        this.parentSpan = oldParent;
    };
    ASTValidator.prototype.visitBinary = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitBinary.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitChain = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitChain.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitConditional = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitConditional.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitFunctionCall = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitFunctionCall.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitImplicitReceiver = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitImplicitReceiver.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitInterpolation = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitInterpolation.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitKeyedRead = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitKeyedRead.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitKeyedWrite = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitKeyedWrite.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitLiteralArray = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitLiteralArray.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitLiteralMap = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitLiteralMap.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitLiteralPrimitive = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitLiteralPrimitive.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitMethodCall = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitMethodCall.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitPipe = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitPipe.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitPrefixNot = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitPrefixNot.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitPropertyRead = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitPropertyRead.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitPropertyWrite = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitPropertyWrite.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitQuote = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitQuote.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitSafeMethodCall = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitSafeMethodCall.call(_this, ast, context); });
    };
    ASTValidator.prototype.visitSafePropertyRead = function (ast, context) {
        var _this = this;
        this.validate(ast, function () { return _super.prototype.visitSafePropertyRead.call(_this, ast, context); });
    };
    return ASTValidator;
}(ast_1.RecursiveAstVisitor));
function inSpan(span, parentSpan) {
    return !parentSpan || (span.start >= parentSpan.start && span.end <= parentSpan.end);
}
var sharedValidator = new ASTValidator();
function validate(ast) {
    sharedValidator.visit(ast);
    return ast;
}
exports.validate = validate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L2V4cHJlc3Npb25fcGFyc2VyL3ZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCxvQkFBcVQsaUNBQWlDLENBQUMsQ0FBQTtBQUV2Vix5QkFBc0IsWUFBWSxDQUFDLENBQUE7QUFFbkM7SUFBMkIsZ0NBQW1CO0lBQTlDO1FBQTJCLDhCQUFtQjtJQThGOUMsQ0FBQztJQTNGQyw0QkFBSyxHQUFMLFVBQU0sR0FBUTtRQUNaLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBQzVCLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsQ0FBQztJQUVELCtCQUFRLEdBQVIsVUFBUyxHQUFRLEVBQUUsRUFBYztRQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsTUFBTSxLQUFLLENBQ1AsaUNBQStCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxVQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxvQkFBZSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssV0FBTSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsY0FBUyxrQkFBTyxDQUFDLEdBQUcsQ0FBRyxDQUFDLENBQUM7UUFDMUosQ0FBQztRQUNELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDbEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO1FBQzNCLEVBQUUsRUFBRSxDQUFDO1FBQ0wsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7SUFDOUIsQ0FBQztJQUVELGtDQUFXLEdBQVgsVUFB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