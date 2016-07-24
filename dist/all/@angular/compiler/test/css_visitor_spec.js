/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('../../core/testing/testing_internal');
var css_parser_1 = require('../src/css_parser');
var exceptions_1 = require('../src/facade/exceptions');
var lang_1 = require('../src/facade/lang');
function _assertTokens(tokens, valuesArr) {
    testing_internal_1.expect(tokens.length).toEqual(valuesArr.length);
    for (var i = 0; i < tokens.length; i++) {
        testing_internal_1.expect(tokens[i].strValue == valuesArr[i]);
    }
}
var MyVisitor = (function () {
    function MyVisitor(ast, context) {
        this.captures = {};
        ast.visit(this, context);
    }
    /**
     * @internal
     */
    MyVisitor.prototype._capture = function (method, ast, context) {
        this.captures[method] = lang_1.isPresent(this.captures[method]) ? this.captures[method] : [];
        this.captures[method].push([ast, context]);
    };
    MyVisitor.prototype.visitCssValue = function (ast, context) {
        this._capture('visitCssValue', ast, context);
    };
    MyVisitor.prototype.visitCssInlineRule = function (ast, context) {
        this._capture('visitCssInlineRule', ast, context);
    };
    MyVisitor.prototype.visitCssAtRulePredicate = function (ast, context) {
        this._capture('visitCssAtRulePredicate', ast, context);
    };
    MyVisitor.prototype.visitCssKeyframeRule = function (ast, context) {
        this._capture('visitCssKeyframeRule', ast, context);
        ast.block.visit(this, context);
    };
    MyVisitor.prototype.visitCssKeyframeDefinition = function (ast, context) {
        this._capture('visitCssKeyframeDefinition', ast, context);
        ast.block.visit(this, context);
    };
    MyVisitor.prototype.visitCssMediaQueryRule = function (ast, context) {
        this._capture('visitCssMediaQueryRule', ast, context);
        ast.query.visit(this, context);
        ast.block.visit(this, context);
    };
    MyVisitor.prototype.visitCssSelectorRule = function (ast, context) {
        var _this = this;
        this._capture('visitCssSelectorRule', ast, context);
        ast.selectors.forEach(function (selAst) { selAst.visit(_this, context); });
        ast.block.visit(this, context);
    };
    MyVisitor.prototype.visitCssSelector = function (ast, context) {
        var _this = this;
        this._capture('visitCssSelector', ast, context);
        ast.selectorParts.forEach(function (simpleAst) { simpleAst.visit(_this, context); });
    };
    MyVisitor.prototype.visitCssSimpleSelector = function (ast, context) {
        var _this = this;
        this._capture('visitCssSimpleSelector', ast, context);
        ast.pseudoSelectors.forEach(function (pseudoAst) { pseudoAst.visit(_this, context); });
    };
    MyVisitor.prototype.visitCssDefinition = function (ast, context) {
        this._capture('visitCssDefinition', ast, context);
        ast.value.visit(this, context);
    };
    MyVisitor.prototype.visitCssBlock = function (ast, context) {
        var _this = this;
        this._capture('visitCssBlock', ast, context);
        ast.entries.forEach(function (entryAst) { entryAst.visit(_this, context); });
    };
    MyVisitor.prototype.visitCssStylesBlock = function (ast, context) {
        var _this = this;
        this._capture('visitCssStylesBlock', ast, context);
        ast.definitions.forEach(function (definitionAst) { definitionAst.visit(_this, context); });
    };
    MyVisitor.prototype.visitCssStyleSheet = function (ast, context) {
        var _this = this;
        this._capture('visitCssStyleSheet', ast, context);
        ast.rules.forEach(function (ruleAst) { ruleAst.visit(_this, context); });
    };
    MyVisitor.prototype.visitCssUnknownRule = function (ast, context) {
        this._capture('visitCssUnknownRule', ast, context);
    };
    MyVisitor.prototype.visitCssUnknownTokenList = function (ast, context) {
        this._capture('visitCssUnknownTokenList', ast, context);
    };
    MyVisitor.prototype.visitCssPseudoSelector = function (ast, context) {
        this._capture('visitCssPseudoSelector', ast, context);
    };
    return MyVisitor;
}());
function _getCaptureAst(capture, index) {
    if (index === void 0) { index = 0; }
    return capture[index][0];
}
function main() {
    function parse(cssCode, ignoreErrors) {
        if (ignoreErrors === void 0) { ignoreErrors = false; }
        var output = new css_parser_1.CssParser().parse(cssCode, 'some-fake-css-file.css');
        var errors = output.errors;
        if (errors.length > 0 && !ignoreErrors) {
            throw new exceptions_1.BaseException(errors.map(function (error) { return error.msg; }).join(', '));
        }
        return output.ast;
    }
    testing_internal_1.describe('CSS parsing and visiting', function () {
        var ast;
        var context = {};
        testing_internal_1.beforeEach(function () {
            var cssCode = "\n        .rule1 { prop1: value1 }\n        .rule2 { prop2: value2 }\n\n        @media all (max-width: 100px) {\n          #id { prop3 :value3; }\n        }\n\n        @import url(file.css);\n\n        @keyframes rotate {\n          from {\n            prop4: value4;\n          }\n          50%, 100% {\n            prop5: value5;\n          }\n        }\n      ";
            ast = parse(cssCode);
        });
        testing_internal_1.it('should parse and visit a stylesheet', function () {
            var visitor = new MyVisitor(ast, context);
            var captures = visitor.captures['visitCssStyleSheet'];
            testing_internal_1.expect(captures.length).toEqual(1);
            var capture = captures[0];
            testing_internal_1.expect(capture[0]).toEqual(ast);
            testing_internal_1.expect(capture[1]).toEqual(context);
        });
        testing_internal_1.it('should parse and visit each of the stylesheet selectors', function () {
            var visitor = new MyVisitor(ast, context);
            var captures = visitor.captures['visitCssSelectorRule'];
            testing_internal_1.expect(captures.length).toEqual(3);
            var rule1 = _getCaptureAst(captures, 0);
            testing_internal_1.expect(rule1).toEqual(ast.rules[0]);
            var firstSelector = rule1.selectors[0];
            var firstSimpleSelector = firstSelector.selectorParts[0];
            _assertTokens(firstSimpleSelector.tokens, ['.', 'rule1']);
            var rule2 = _getCaptureAst(captures, 1);
            testing_internal_1.expect(rule2).toEqual(ast.rules[1]);
            var secondSelector = rule2.selectors[0];
            var secondSimpleSelector = secondSelector.selectorParts[0];
            _assertTokens(secondSimpleSelector.tokens, ['.', 'rule2']);
            var rule3 = _getCaptureAst(captures, 2);
            testing_internal_1.expect(rule3).toEqual(ast.rules[2].block.entries[0]);
            var thirdSelector = rule3.selectors[0];
            var thirdSimpleSelector = thirdSelector.selectorParts[0];
            _assertTokens(thirdSimpleSelector.tokens, ['#', 'rule3']);
        });
        testing_internal_1.it('should parse and visit each of the stylesheet style key/value definitions', function () {
            var visitor = new MyVisitor(ast, context);
            var captures = visitor.captures['visitCssDefinition'];
            testing_internal_1.expect(captures.length).toEqual(5);
            var def1 = _getCaptureAst(captures, 0);
            testing_internal_1.expect(def1.property.strValue).toEqual('prop1');
            testing_internal_1.expect(def1.value.tokens[0].strValue).toEqual('value1');
            var def2 = _getCaptureAst(captures, 1);
            testing_internal_1.expect(def2.property.strValue).toEqual('prop2');
            testing_internal_1.expect(def2.value.tokens[0].strValue).toEqual('value2');
            var def3 = _getCaptureAst(captures, 2);
            testing_internal_1.expect(def3.property.strValue).toEqual('prop3');
            testing_internal_1.expect(def3.value.tokens[0].strValue).toEqual('value3');
            var def4 = _getCaptureAst(captures, 3);
            testing_internal_1.expect(def4.property.strValue).toEqual('prop4');
            testing_internal_1.expect(def4.value.tokens[0].strValue).toEqual('value4');
            var def5 = _getCaptureAst(captures, 4);
            testing_internal_1.expect(def5.property.strValue).toEqual('prop5');
            testing_internal_1.expect(def5.value.tokens[0].strValue).toEqual('value5');
        });
        testing_internal_1.it('should parse and visit the associated media query values', function () {
            var visitor = new MyVisitor(ast, context);
            var captures = visitor.captures['visitCssMediaQueryRule'];
            testing_internal_1.expect(captures.length).toEqual(1);
            var query1 = _getCaptureAst(captures, 0);
            _assertTokens(query1.query.tokens, ['all', 'and', '(', 'max-width', '100', 'px', ')']);
            testing_internal_1.expect(query1.block.entries.length).toEqual(1);
        });
        testing_internal_1.it('should capture the media query predicate', function () {
            var visitor = new MyVisitor(ast, context);
            var captures = visitor.captures['visitCssAtRulePredicate'];
            testing_internal_1.expect(captures.length).toEqual(1);
            var predicate = _getCaptureAst(captures, 0);
            testing_internal_1.expect(predicate.strValue).toEqual('@media all (max-width: 100px)');
        });
        testing_internal_1.it('should parse and visit the associated "@inline" rule values', function () {
            var visitor = new MyVisitor(ast, context);
            var captures = visitor.captures['visitCssInlineRule'];
            testing_internal_1.expect(captures.length).toEqual(1);
            var inline1 = _getCaptureAst(captures, 0);
            testing_internal_1.expect(inline1.type).toEqual(css_parser_1.BlockType.Import);
            _assertTokens(inline1.value.tokens, ['url', '(', 'file.css', ')']);
        });
        testing_internal_1.it('should parse and visit the keyframe blocks', function () {
            var visitor = new MyVisitor(ast, context);
            var captures = visitor.captures['visitCssKeyframeRule'];
            testing_internal_1.expect(captures.length).toEqual(1);
            var keyframe1 = _getCaptureAst(captures, 0);
            testing_internal_1.expect(keyframe1.name.strValue).toEqual('rotate');
            testing_internal_1.expect(keyframe1.block.entries.length).toEqual(2);
        });
        testing_internal_1.it('should parse and visit the associated keyframe rules', function () {
            var visitor = new MyVisitor(ast, context);
            var captures = visitor.captures['visitCssKeyframeDefinition'];
            testing_internal_1.expect(captures.length).toEqual(2);
            var def1 = _getCaptureAst(captures, 0);
            _assertTokens(def1.steps, ['from']);
            testing_internal_1.expect(def1.block.entries.length).toEqual(1);
            var def2 = _getCaptureAst(captures, 1);
            _assertTokens(def2.steps, ['50%', '100%']);
            testing_internal_1.expect(def2.block.entries.length).toEqual(1);
        });
        testing_internal_1.it('should visit an unknown `@` rule', function () {
            var cssCode = "\n        @someUnknownRule param {\n          one two three\n        }\n      ";
            ast = parse(cssCode, true);
            var visitor = new MyVisitor(ast, context);
            var captures = visitor.captures['visitCssUnknownRule'];
            testing_internal_1.expect(captures.length).toEqual(1);
            var rule = _getCaptureAst(captures, 0);
            testing_internal_1.expect(rule.ruleName).toEqual('@someUnknownRule');
            _assertTokens(rule.tokens, ['param', '{', 'one', 'two', 'three', '}']);
        });
        testing_internal_1.it('should collect an invalid list of tokens before a valid selector', function () {
            var cssCode = 'one two three four five; selector { }';
            ast = parse(cssCode, true);
            var visitor = new MyVisitor(ast, context);
            var captures = visitor.captures['visitCssUnknownTokenList'];
            testing_internal_1.expect(captures.length).toEqual(1);
            var rule = _getCaptureAst(captures, 0);
            _assertTokens(rule.tokens, ['one', 'two', 'three', 'four', 'five']);
        });
        testing_internal_1.it('should collect an invalid list of tokens after a valid selector', function () {
            var cssCode = 'selector { } six seven eight';
            ast = parse(cssCode, true);
            var visitor = new MyVisitor(ast, context);
            var captures = visitor.captures['visitCssUnknownTokenList'];
            testing_internal_1.expect(captures.length).toEqual(1);
            var rule = _getCaptureAst(captures, 0);
            _assertTokens(rule.tokens, ['six', 'seven', 'eight']);
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzX3Zpc2l0b3Jfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdC9jc3NfdmlzaXRvcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBK0UscUNBQXFDLENBQUMsQ0FBQTtBQUVySCwyQkFBNEQsbUJBQW1CLENBQUMsQ0FBQTtBQUNoRiwyQkFBNEIsMEJBQTBCLENBQUMsQ0FBQTtBQUN2RCxxQkFBd0Isb0JBQW9CLENBQUMsQ0FBQTtBQUU3Qyx1QkFBdUIsTUFBa0IsRUFBRSxTQUFtQjtJQUM1RCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3ZDLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0FBQ0gsQ0FBQztBQUVEO0lBV0UsbUJBQVksR0FBcUIsRUFBRSxPQUFZO1FBVi9DLGFBQVEsR0FBMkIsRUFBRSxDQUFDO1FBVWEsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFBQyxDQUFDO0lBUjlFOztPQUVHO0lBQ0gsNEJBQVEsR0FBUixVQUFTLE1BQWMsRUFBRSxHQUFXLEVBQUUsT0FBWTtRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFD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