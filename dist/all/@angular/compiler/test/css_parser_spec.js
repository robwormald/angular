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
function assertTokens(tokens, valuesArr) {
    for (var i = 0; i < tokens.length; i++) {
        testing_internal_1.expect(tokens[i].strValue == valuesArr[i]);
    }
}
exports.assertTokens = assertTokens;
function main() {
    testing_internal_1.describe('CssParser', function () {
        function parse(css) {
            return new css_parser_1.CssParser().parse(css, 'some-fake-css-file.css');
        }
        function makeAst(css) {
            var output = parse(css);
            var errors = output.errors;
            if (errors.length > 0) {
                throw new exceptions_1.BaseException(errors.map(function (error) { return error.msg; }).join(', '));
            }
            return output.ast;
        }
        testing_internal_1.it('should parse CSS into a stylesheet Ast', function () {
            var styles = '.selector { prop: value123; }';
            var ast = makeAst(styles);
            testing_internal_1.expect(ast.rules.length).toEqual(1);
            var rule = ast.rules[0];
            var selector = rule.selectors[0];
            testing_internal_1.expect(selector.strValue).toEqual('.selector');
            var block = rule.block;
            testing_internal_1.expect(block.entries.length).toEqual(1);
            var definition = block.entries[0];
            testing_internal_1.expect(definition.property.strValue).toEqual('prop');
            var value = definition.value;
            testing_internal_1.expect(value.tokens[0].strValue).toEqual('value123');
        });
        testing_internal_1.it('should parse multiple CSS selectors sharing the same set of styles', function () {
            var styles = "\n        .class, #id, tag, [attr], key + value, * value, :-moz-any-link {\n          prop: value123;\n        }\n      ";
            var ast = makeAst(styles);
            testing_internal_1.expect(ast.rules.length).toEqual(1);
            var rule = ast.rules[0];
            testing_internal_1.expect(rule.selectors.length).toBe(7);
            var classRule = rule.selectors[0];
            var idRule = rule.selectors[1];
            var tagRule = rule.selectors[2];
            var attrRule = rule.selectors[3];
            var plusOpRule = rule.selectors[4];
            var starOpRule = rule.selectors[5];
            var mozRule = rule.selectors[6];
            assertTokens(classRule.selectorParts[0].tokens, ['.', 'class']);
            assertTokens(idRule.selectorParts[0].tokens, ['.', 'class']);
            assertTokens(attrRule.selectorParts[0].tokens, ['[', 'attr', ']']);
            assertTokens(plusOpRule.selectorParts[0].tokens, ['key']);
            testing_internal_1.expect(plusOpRule.selectorParts[0].operator.strValue).toEqual('+');
            assertTokens(plusOpRule.selectorParts[1].tokens, ['value']);
            assertTokens(starOpRule.selectorParts[0].tokens, ['*']);
            assertTokens(starOpRule.selectorParts[1].tokens, ['value']);
            assertTokens(mozRule.selectorParts[0].pseudoSelectors[0].tokens, [':', '-moz-any-link']);
            var style1 = rule.block.entries[0];
            testing_internal_1.expect(style1.property.strValue).toEqual('prop');
            assertTokens(style1.value.tokens, ['value123']);
        });
        testing_internal_1.it('should parse keyframe rules', function () {
            var styles = "\n        @keyframes rotateMe {\n          from {\n            transform: rotate(-360deg);\n          }\n          50% {\n            transform: rotate(0deg);\n          }\n          to {\n            transform: rotate(360deg);\n          }\n        }\n      ";
            var ast = makeAst(styles);
            testing_internal_1.expect(ast.rules.length).toEqual(1);
            var rule = ast.rules[0];
            testing_internal_1.expect(rule.name.strValue).toEqual('rotateMe');
            var block = rule.block;
            var fromRule = block.entries[0];
            testing_internal_1.expect(fromRule.name.strValue).toEqual('from');
            var fromStyle = fromRule.block.entries[0];
            testing_internal_1.expect(fromStyle.property.strValue).toEqual('transform');
            assertTokens(fromStyle.value.tokens, ['rotate', '(', '-360', 'deg', ')']);
            var midRule = block.entries[1];
            testing_internal_1.expect(midRule.name.strValue).toEqual('50%');
            var midStyle = midRule.block.entries[0];
            testing_internal_1.expect(midStyle.property.strValue).toEqual('transform');
            assertTokens(midStyle.value.tokens, ['rotate', '(', '0', 'deg', ')']);
            var toRule = block.entries[2];
            testing_internal_1.expect(toRule.name.strValue).toEqual('to');
            var toStyle = toRule.block.entries[0];
            testing_internal_1.expect(toStyle.property.strValue).toEqual('transform');
            assertTokens(toStyle.value.tokens, ['rotate', '(', '360', 'deg', ')']);
        });
        testing_internal_1.it('should parse media queries into a stylesheet Ast', function () {
            var styles = "\n        @media all and (max-width:100px) {\n          .selector {\n            prop: value123;\n          }\n        }\n      ";
            var ast = makeAst(styles);
            testing_internal_1.expect(ast.rules.length).toEqual(1);
            var rule = ast.rules[0];
            assertTokens(rule.query.tokens, ['all', 'and', '(', 'max-width', ':', '100', 'px', ')']);
            var block = rule.block;
            testing_internal_1.expect(block.entries.length).toEqual(1);
            var rule2 = block.entries[0];
            testing_internal_1.expect(rule2.selectors[0].strValue).toEqual('.selector');
            var block2 = rule2.block;
            testing_internal_1.expect(block2.entries.length).toEqual(1);
        });
        testing_internal_1.it('should parse inline CSS values', function () {
            var styles = "\n        @import url('remote.css');\n        @charset \"UTF-8\";\n        @namespace ng url(http://angular.io/namespace/ng);\n      ";
            var ast = makeAst(styles);
            var importRule = ast.rules[0];
            testing_internal_1.expect(importRule.type).toEqual(css_parser_1.BlockType.Import);
            assertTokens(importRule.value.tokens, ['url', '(', 'remote', '.', 'css', ')']);
            var charsetRule = ast.rules[1];
            testing_internal_1.expect(charsetRule.type).toEqual(css_parser_1.BlockType.Charset);
            assertTokens(charsetRule.value.tokens, ['UTF-8']);
            var namespaceRule = ast.rules[2];
            testing_internal_1.expect(namespaceRule.type).toEqual(css_parser_1.BlockType.Namespace);
            assertTokens(namespaceRule.value.tokens, ['ng', 'url', '(', 'http://angular.io/namespace/ng', ')']);
        });
        testing_internal_1.it('should parse CSS values that contain functions and leave the inner function data untokenized', function () {
            var styles = "\n        .class {\n          background: url(matias.css);\n          animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n          height: calc(100% - 50px);\n          background-image: linear-gradient( 45deg, rgba(100, 0, 0, 0.5), black );\n        }\n      ";
            var ast = makeAst(styles);
            testing_internal_1.expect(ast.rules.length).toEqual(1);
            var defs = ast.rules[0].block.entries;
            testing_internal_1.expect(defs.length).toEqual(4);
            assertTokens(defs[0].value.tokens, ['url', '(', 'matias.css', ')']);
            assertTokens(defs[1].value.tokens, ['cubic-bezier', '(', '0.755, 0.050, 0.855, 0.060', ')']);
            assertTokens(defs[2].value.tokens, ['calc', '(', '100% - 50px', ')']);
            assertTokens(defs[3].value.tokens, ['linear-gradient', '(', '45deg, rgba(100, 0, 0, 0.5), black', ')']);
        });
        testing_internal_1.it('should parse un-named block-level CSS values', function () {
            var styles = "\n        @font-face {\n          font-family: \"Matias\";\n          font-weight: bold;\n          src: url(font-face.ttf);\n        }\n        @viewport {\n          max-width: 100px;\n          min-height: 1000px;\n        }\n      ";
            var ast = makeAst(styles);
            var fontFaceRule = ast.rules[0];
            testing_internal_1.expect(fontFaceRule.type).toEqual(css_parser_1.BlockType.FontFace);
            testing_internal_1.expect(fontFaceRule.block.entries.length).toEqual(3);
            var viewportRule = ast.rules[1];
            testing_internal_1.expect(viewportRule.type).toEqual(css_parser_1.BlockType.Viewport);
            testing_internal_1.expect(viewportRule.block.entries.length).toEqual(2);
        });
        testing_internal_1.it('should parse multiple levels of semicolons', function () {
            var styles = "\n        ;;;\n        @import url('something something')\n        ;;;;;;;;\n        ;;;;;;;;\n        ;@font-face {\n          ;src   :   url(font-face.ttf);;;;;;;;\n          ;;;-webkit-animation:my-animation\n        };;;\n        @media all and (max-width:100px)\n        {;\n          .selector {prop: value123;};\n          ;.selector2{prop:1}}\n      ";
            var ast = makeAst(styles);
            var importRule = ast.rules[0];
            testing_internal_1.expect(importRule.type).toEqual(css_parser_1.BlockType.Import);
            assertTokens(importRule.value.tokens, ['url', '(', 'something something', ')']);
            var fontFaceRule = ast.rules[1];
            testing_internal_1.expect(fontFaceRule.type).toEqual(css_parser_1.BlockType.FontFace);
            testing_internal_1.expect(fontFaceRule.block.entries.length).toEqual(2);
            var mediaQueryRule = ast.rules[2];
            assertTokens(mediaQueryRule.query.tokens, ['all', 'and', '(', 'max-width', ':', '100', 'px', ')']);
            testing_internal_1.expect(mediaQueryRule.block.entries.length).toEqual(2);
        });
        testing_internal_1.it('should throw an error if an unknown @value block rule is parsed', function () {
            var styles = "\n        @matias { hello: there; }\n      ";
            testing_internal_1.expect(function () {
                makeAst(styles);
            }).toThrowError(/^CSS Parse Error: The CSS "at" rule "@matias" is not allowed to used here/g);
        });
        testing_internal_1.it('should parse empty rules', function () {
            var styles = "\n        .empty-rule { }\n        .somewhat-empty-rule { /* property: value; */ }\n        .non-empty-rule { property: value; }\n      ";
            var ast = makeAst(styles);
            var rules = ast.rules;
            testing_internal_1.expect(rules[0].block.entries.length).toEqual(0);
            testing_internal_1.expect(rules[1].block.entries.length).toEqual(0);
            testing_internal_1.expect(rules[2].block.entries.length).toEqual(1);
        });
        testing_internal_1.it('should parse the @document rule', function () {
            var styles = "\n        @document url(http://www.w3.org/),\n                       url-prefix(http://www.w3.org/Style/),\n                       domain(mozilla.org),\n                       regexp(\"https:.*\")\n        {\n          /* CSS rules here apply to:\n             - The page \"http://www.w3.org/\".\n             - Any page whose URL begins with \"http://www.w3.org/Style/\"\n             - Any page whose URL's host is \"mozilla.org\" or ends with\n               \".mozilla.org\"\n             - Any page whose URL starts with \"https:\" */\n\n          /* make the above-mentioned pages really ugly */\n          body {\n            color: purple;\n            background: yellow;\n          }\n        }\n      ";
            var ast = makeAst(styles);
            var rules = ast.rules;
            var documentRule = rules[0];
            testing_internal_1.expect(documentRule.type).toEqual(css_parser_1.BlockType.Document);
            var rule = documentRule.block.entries[0];
            testing_internal_1.expect(rule.strValue).toEqual('body');
        });
        testing_internal_1.it('should parse the @page rule', function () {
            var styles = "\n        @page one {\n          .selector { prop: value; }\n        }\n        @page two {\n          .selector2 { prop: value2; }\n        }\n      ";
            var ast = makeAst(styles);
            var rules = ast.rules;
            var pageRule1 = rules[0];
            testing_internal_1.expect(pageRule1.query.strValue).toEqual('@page one');
            testing_internal_1.expect(pageRule1.query.tokens[0].strValue).toEqual('one');
            testing_internal_1.expect(pageRule1.type).toEqual(css_parser_1.BlockType.Page);
            var pageRule2 = rules[1];
            testing_internal_1.expect(pageRule2.query.strValue).toEqual('@page two');
            testing_internal_1.expect(pageRule2.query.tokens[0].strValue).toEqual('two');
            testing_internal_1.expect(pageRule2.type).toEqual(css_parser_1.BlockType.Page);
            var selectorOne = pageRule1.block.entries[0];
            testing_internal_1.expect(selectorOne.strValue).toEqual('.selector');
            var selectorTwo = pageRule2.block.entries[0];
            testing_internal_1.expect(selectorTwo.strValue).toEqual('.selector2');
        });
        testing_internal_1.it('should parse the @supports rule', function () {
            var styles = "\n        @supports (animation-name: \"rotate\") {\n          a:hover { animation: rotate 1s; }\n        }\n      ";
            var ast = makeAst(styles);
            var rules = ast.rules;
            var supportsRule = rules[0];
            assertTokens(supportsRule.query.tokens, ['(', 'animation-name', ':', 'rotate', ')']);
            testing_internal_1.expect(supportsRule.type).toEqual(css_parser_1.BlockType.Supports);
            var selectorOne = supportsRule.block.entries[0];
            testing_internal_1.expect(selectorOne.strValue).toEqual('a:hover');
        });
        testing_internal_1.it('should collect multiple errors during parsing', function () {
            var styles = "\n        .class$value { something: something }\n        @custom { something: something }\n        #id { cool^: value }\n      ";
            var output = parse(styles);
            testing_internal_1.expect(output.errors.length).toEqual(3);
        });
        testing_internal_1.it('should recover from selector errors and continue parsing', function () {
            var styles = "\n        tag& { key: value; }\n        .%tag { key: value; }\n        #tag$ { key: value; }\n      ";
            var output = parse(styles);
            var errors = output.errors;
            var ast = output.ast;
            testing_internal_1.expect(errors.length).toEqual(3);
            testing_internal_1.expect(ast.rules.length).toEqual(3);
            var rule1 = ast.rules[0];
            testing_internal_1.expect(rule1.selectors[0].strValue).toEqual('tag&');
            testing_internal_1.expect(rule1.block.entries.length).toEqual(1);
            var rule2 = ast.rules[1];
            testing_internal_1.expect(rule2.selectors[0].strValue).toEqual('.%tag');
            testing_internal_1.expect(rule2.block.entries.length).toEqual(1);
            var rule3 = ast.rules[2];
            testing_internal_1.expect(rule3.selectors[0].strValue).toEqual('#tag$');
            testing_internal_1.expect(rule3.block.entries.length).toEqual(1);
        });
        testing_internal_1.it('should throw an error when parsing invalid CSS Selectors', function () {
            var styles = '.class[[prop%=value}] { style: val; }';
            var output = parse(styles);
            var errors = output.errors;
            testing_internal_1.expect(errors.length).toEqual(3);
            testing_internal_1.expect(errors[0].msg).toMatch(/Unexpected character \[\[\] at column 0:7/g);
            testing_internal_1.expect(errors[1].msg).toMatch(/Unexpected character \[%\] at column 0:12/g);
            testing_internal_1.expect(errors[2].msg).toMatch(/Unexpected character \[}\] at column 0:19/g);
        });
        testing_internal_1.it('should throw an error if an attribute selector is not closed properly', function () {
            var styles = '.class[prop=value { style: val; }';
            var output = parse(styles);
            var errors = output.errors;
            testing_internal_1.expect(errors[0].msg).toMatch(/Unbalanced CSS attribute selector at column 0:12/g);
        });
        testing_internal_1.it('should throw an error if a pseudo function selector is not closed properly', function () {
            var styles = 'body:lang(en { key:value; }';
            var output = parse(styles);
            var errors = output.errors;
            testing_internal_1.expect(errors[0].msg)
                .toMatch(/Character does not match expected Character value \("{" should match "\)"\)/);
        });
        testing_internal_1.it('should raise an error when a semi colon is missing from a CSS style/pair that isn\'t the last entry', function () {
            var styles = ".class {\n        color: red\n        background: blue\n      }";
            var output = parse(styles);
            var errors = output.errors;
            testing_internal_1.expect(errors.length).toEqual(1);
            testing_internal_1.expect(errors[0].msg)
                .toMatch(/The CSS key\/value definition did not end with a semicolon at column 1:15/g);
        });
        testing_internal_1.it('should parse the inner value of a :not() pseudo-selector as a CSS selector', function () {
            var styles = "div:not(.ignore-this-div) {\n        prop: value;\n      }";
            var output = parse(styles);
            var errors = output.errors;
            var ast = output.ast;
            testing_internal_1.expect(errors.length).toEqual(0);
            var rule1 = ast.rules[0];
            testing_internal_1.expect(rule1.selectors.length).toEqual(1);
            var simpleSelector = rule1.selectors[0].selectorParts[0];
            assertTokens(simpleSelector.tokens, ['div']);
            var pseudoSelector = simpleSelector.pseudoSelectors[0];
            testing_internal_1.expect(pseudoSelector.name).toEqual('not');
            assertTokens(pseudoSelector.tokens, ['.', 'ignore-this-div']);
        });
        testing_internal_1.it('should parse the inner selectors of a :host-context selector', function () {
            var styles = "body > :host-context(.a, .b, .c:hover) {\n        prop: value;\n      }";
            var output = parse(styles);
            var errors = output.errors;
            var ast = output.ast;
            testing_internal_1.expect(errors.length).toEqual(0);
            var rule1 = ast.rules[0];
            testing_internal_1.expect(rule1.selectors.length).toEqual(1);
            var simpleSelector = rule1.selectors[0].selectorParts[1];
            var innerSelectors = simpleSelector.pseudoSelectors[0].innerSelectors;
            assertTokens(innerSelectors[0].selectorParts[0].tokens, ['.', 'a']);
            assertTokens(innerSelectors[1].selectorParts[0].tokens, ['.', 'b']);
            var finalSelector = innerSelectors[2].selectorParts[0];
            assertTokens(finalSelector.tokens, ['.', 'c', ':', 'hover']);
            assertTokens(finalSelector.pseudoSelectors[0].tokens, [':', 'hover']);
        });
        testing_internal_1.it('should raise parse errors when CSS key/value pairs are invalid', function () {
            var styles = ".class {\n        background color: value;\n        color: value\n        font-size;\n        font-weight\n      }";
            var output = parse(styles);
            var errors = output.errors;
            testing_internal_1.expect(errors.length).toEqual(4);
            testing_internal_1.expect(errors[0].msg)
                .toMatch(/Identifier does not match expected Character value \("color" should match ":"\) at column 1:19/g);
            testing_internal_1.expect(errors[1].msg)
                .toMatch(/The CSS key\/value definition did not end with a semicolon at column 2:15/g);
            testing_internal_1.expect(errors[2].msg)
                .toMatch(/The CSS property was not paired with a style value at column 3:8/g);
            testing_internal_1.expect(errors[3].msg)
                .toMatch(/The CSS property was not paired with a style value at column 4:8/g);
        });
        testing_internal_1.it('should recover from CSS key/value parse errors', function () {
            var styles = "\n        .problem-class { background color: red; color: white; }\n        .good-boy-class { background-color: red; color: white; }\n       ";
            var output = parse(styles);
            var ast = output.ast;
            testing_internal_1.expect(ast.rules.length).toEqual(2);
            var rule1 = ast.rules[0];
            testing_internal_1.expect(rule1.block.entries.length).toEqual(2);
            var style1 = rule1.block.entries[0];
            testing_internal_1.expect(style1.property.strValue).toEqual('background color');
            assertTokens(style1.value.tokens, ['red']);
            var style2 = rule1.block.entries[1];
            testing_internal_1.expect(style2.property.strValue).toEqual('color');
            assertTokens(style2.value.tokens, ['white']);
        });
        testing_internal_1.describe('location offsets', function () {
            var styles;
            function assertMatchesOffsetAndChar(location, expectedOffset, expectedChar) {
                testing_internal_1.expect(location.offset).toEqual(expectedOffset);
                testing_internal_1.expect(styles[expectedOffset]).toEqual(expectedChar);
            }
            testing_internal_1.it('should collect the source span location of each AST node with regular selectors', function () {
                styles = '.problem-class { border-top-right: 1px; color: white; }\n';
                styles += '#good-boy-rule_ { background-color: #fe4; color: teal; }';
                var output = parse(styles);
                var ast = output.ast;
                assertMatchesOffsetAndChar(ast.location.start, 0, '.');
                assertMatchesOffsetAndChar(ast.location.end, 111, '}');
                var rule1 = ast.rules[0];
                assertMatchesOffsetAndChar(rule1.location.start, 0, '.');
                assertMatchesOffsetAndChar(rule1.location.end, 54, '}');
                var rule2 = ast.rules[1];
                assertMatchesOffsetAndChar(rule2.location.start, 56, '#');
                assertMatchesOffsetAndChar(rule2.location.end, 111, '}');
                var selector1 = rule1.selectors[0];
                assertMatchesOffsetAndChar(selector1.location.start, 0, '.');
                assertMatchesOffsetAndChar(selector1.location.end, 1, 'p'); // problem-class
                var selector2 = rule2.selectors[0];
                assertMatchesOffsetAndChar(selector2.location.start, 56, '#');
                assertMatchesOffsetAndChar(selector2.location.end, 57, 'g'); // good-boy-rule_
                var block1 = rule1.block;
                assertMatchesOffsetAndChar(block1.location.start, 15, '{');
                assertMatchesOffsetAndChar(block1.location.end, 54, '}');
                var block2 = rule2.block;
                assertMatchesOffsetAndChar(block2.location.start, 72, '{');
                assertMatchesOffsetAndChar(block2.location.end, 111, '}');
                var block1def1 = block1.entries[0];
                assertMatchesOffsetAndChar(block1def1.location.start, 17, 'b'); // border-top-right
                assertMatchesOffsetAndChar(block1def1.location.end, 36, 'p'); // px
                var block1def2 = block1.entries[1];
                assertMatchesOffsetAndChar(block1def2.location.start, 40, 'c'); // color
                assertMatchesOffsetAndChar(block1def2.location.end, 47, 'w'); // white
                var block2def1 = block2.entries[0];
                assertMatchesOffsetAndChar(block2def1.location.start, 74, 'b'); // background-color
                assertMatchesOffsetAndChar(block2def1.location.end, 93, 'f'); // fe4
                var block2def2 = block2.entries[1];
                assertMatchesOffsetAndChar(block2def2.location.start, 98, 'c'); // color
                assertMatchesOffsetAndChar(block2def2.location.end, 105, 't'); // teal
                var block1value1 = block1def1.value;
                assertMatchesOffsetAndChar(block1value1.location.start, 35, '1');
                assertMatchesOffsetAndChar(block1value1.location.end, 36, 'p');
                var block1value2 = block1def2.value;
                assertMatchesOffsetAndChar(block1value2.location.start, 47, 'w');
                assertMatchesOffsetAndChar(block1value2.location.end, 47, 'w');
                var block2value1 = block2def1.value;
                assertMatchesOffsetAndChar(block2value1.location.start, 92, '#');
                assertMatchesOffsetAndChar(block2value1.location.end, 93, 'f');
                var block2value2 = block2def2.value;
                assertMatchesOffsetAndChar(block2value2.location.start, 105, 't');
                assertMatchesOffsetAndChar(block2value2.location.end, 105, 't');
            });
            testing_internal_1.it('should collect the source span location of each AST node with media query data', function () {
                styles = '@media (all and max-width: 100px) { a { display:none; } }';
                var output = parse(styles);
                var ast = output.ast;
                var mediaQuery = ast.rules[0];
                assertMatchesOffsetAndChar(mediaQuery.location.start, 0, '@');
                assertMatchesOffsetAndChar(mediaQuery.location.end, 56, '}');
                var predicate = mediaQuery.query;
                assertMatchesOffsetAndChar(predicate.location.start, 0, '@');
                assertMatchesOffsetAndChar(predicate.location.end, 32, ')');
                var rule = mediaQuery.block.entries[0];
                assertMatchesOffsetAndChar(rule.location.start, 36, 'a');
                assertMatchesOffsetAndChar(rule.location.end, 54, '}');
            });
            testing_internal_1.it('should collect the source span location of each AST node with keyframe data', function () {
                styles = '@keyframes rotateAndZoomOut { ';
                styles += 'from { transform: rotate(0deg); } ';
                styles += '100% { transform: rotate(360deg) scale(2); }';
                styles += '}';
                var output = parse(styles);
                var ast = output.ast;
                var keyframes = ast.rules[0];
                assertMatchesOffsetAndChar(keyframes.location.start, 0, '@');
                assertMatchesOffsetAndChar(keyframes.location.end, 108, '}');
                var step1 = keyframes.block.entries[0];
                assertMatchesOffsetAndChar(step1.location.start, 30, 'f');
                assertMatchesOffsetAndChar(step1.location.end, 62, '}');
                var step2 = keyframes.block.entries[1];
                assertMatchesOffsetAndChar(step2.location.start, 64, '1');
                assertMatchesOffsetAndChar(step2.location.end, 107, '}');
            });
            testing_internal_1.it('should collect the source span location of each AST node with an inline rule', function () {
                styles = '@import url(something.css)';
                var output = parse(styles);
                var ast = output.ast;
                var rule = ast.rules[0];
                assertMatchesOffsetAndChar(rule.location.start, 0, '@');
                assertMatchesOffsetAndChar(rule.location.end, 25, ')');
                var value = rule.value;
                assertMatchesOffsetAndChar(value.location.start, 8, 'u');
                assertMatchesOffsetAndChar(value.location.end, 25, ')');
            });
            testing_internal_1.it('should property collect the start/end locations with an invalid stylesheet', function () {
                styles = '#id { something: value';
                var output = parse(styles);
                var ast = output.ast;
                assertMatchesOffsetAndChar(ast.location.start, 0, '#');
                assertMatchesOffsetAndChar(ast.location.end, 22, undefined);
            });
        });
        testing_internal_1.it('should parse minified CSS content properly', function () {
            // this code was taken from the angular.io webpage's CSS code
            var styles = "\n.is-hidden{display:none!important}\n.is-visible{display:block!important}\n.is-visually-hidden{height:1px;width:1px;overflow:hidden;opacity:0.01;position:absolute;bottom:0;right:0;z-index:1}\n.grid-fluid,.grid-fixed{margin:0 auto}\n.grid-fluid .c1,.grid-fixed .c1,.grid-fluid .c2,.grid-fixed .c2,.grid-fluid .c3,.grid-fixed .c3,.grid-fluid .c4,.grid-fixed .c4,.grid-fluid .c5,.grid-fixed .c5,.grid-fluid .c6,.grid-fixed .c6,.grid-fluid .c7,.grid-fixed .c7,.grid-fluid .c8,.grid-fixed .c8,.grid-fluid .c9,.grid-fixed .c9,.grid-fluid .c10,.grid-fixed .c10,.grid-fluid .c11,.grid-fixed .c11,.grid-fluid .c12,.grid-fixed .c12{display:inline;float:left}\n.grid-fluid .c1.grid-right,.grid-fixed .c1.grid-right,.grid-fluid .c2.grid-right,.grid-fixed .c2.grid-right,.grid-fluid .c3.grid-right,.grid-fixed .c3.grid-right,.grid-fluid .c4.grid-right,.grid-fixed .c4.grid-right,.grid-fluid .c5.grid-right,.grid-fixed .c5.grid-right,.grid-fluid .c6.grid-right,.grid-fixed .c6.grid-right,.grid-fluid .c7.grid-right,.grid-fixed .c7.grid-right,.grid-fluid .c8.grid-right,.grid-fixed .c8.grid-right,.grid-fluid .c9.grid-right,.grid-fixed .c9.grid-right,.grid-fluid .c10.grid-right,.grid-fixed .c10.grid-right,.grid-fluid .c11.grid-right,.grid-fixed .c11.grid-right,.grid-fluid .c12.grid-right,.grid-fixed .c12.grid-right{float:right}\n.grid-fluid .c1.nb,.grid-fixed .c1.nb,.grid-fluid .c2.nb,.grid-fixed .c2.nb,.grid-fluid .c3.nb,.grid-fixed .c3.nb,.grid-fluid .c4.nb,.grid-fixed .c4.nb,.grid-fluid .c5.nb,.grid-fixed .c5.nb,.grid-fluid .c6.nb,.grid-fixed .c6.nb,.grid-fluid .c7.nb,.grid-fixed .c7.nb,.grid-fluid .c8.nb,.grid-fixed .c8.nb,.grid-fluid .c9.nb,.grid-fixed .c9.nb,.grid-fluid .c10.nb,.grid-fixed .c10.nb,.grid-fluid .c11.nb,.grid-fixed .c11.nb,.grid-fluid .c12.nb,.grid-fixed .c12.nb{margin-left:0}\n.grid-fluid .c1.na,.grid-fixed .c1.na,.grid-fluid .c2.na,.grid-fixed .c2.na,.grid-fluid .c3.na,.grid-fixed .c3.na,.grid-fluid .c4.na,.grid-fixed .c4.na,.grid-fluid .c5.na,.grid-fixed .c5.na,.grid-fluid .c6.na,.grid-fixed .c6.na,.grid-fluid .c7.na,.grid-fixed .c7.na,.grid-fluid .c8.na,.grid-fixed .c8.na,.grid-fluid .c9.na,.grid-fixed .c9.na,.grid-fluid .c10.na,.grid-fixed .c10.na,.grid-fluid .c11.na,.grid-fixed .c11.na,.grid-fluid .c12.na,.grid-fixed .c12.na{margin-right:0}\n       ";
            var output = parse(styles);
            var errors = output.errors;
            testing_internal_1.expect(errors.length).toEqual(0);
            var ast = output.ast;
            testing_internal_1.expect(ast.rules.length).toEqual(8);
        });
        testing_internal_1.it('should parse a snippet of keyframe code from animate.css properly', function () {
            // this code was taken from the angular.io webpage's CSS code
            var styles = "\n@charset \"UTF-8\";\n\n/*!\n * animate.css -http://daneden.me/animate\n * Version - 3.5.1\n * Licensed under the MIT license - http://opensource.org/licenses/MIT\n *\n * Copyright (c) 2016 Daniel Eden\n */\n\n.animated {\n  -webkit-animation-duration: 1s;\n  animation-duration: 1s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both;\n}\n\n.animated.infinite {\n  -webkit-animation-iteration-count: infinite;\n  animation-iteration-count: infinite;\n}\n\n.animated.hinge {\n  -webkit-animation-duration: 2s;\n  animation-duration: 2s;\n}\n\n.animated.flipOutX,\n.animated.flipOutY,\n.animated.bounceIn,\n.animated.bounceOut {\n  -webkit-animation-duration: .75s;\n  animation-duration: .75s;\n}\n\n@-webkit-keyframes bounce {\n  from, 20%, 53%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\n    -webkit-transform: translate3d(0,0,0);\n    transform: translate3d(0,0,0);\n  }\n\n  40%, 43% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    -webkit-transform: translate3d(0, -30px, 0);\n    transform: translate3d(0, -30px, 0);\n  }\n\n  70% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    animation-timing-function: cubic-bezier(0.755, 0.050, 0.855, 0.060);\n    -webkit-transform: translate3d(0, -15px, 0);\n    transform: translate3d(0, -15px, 0);\n  }\n\n  90% {\n    -webkit-transform: translate3d(0,-4px,0);\n    transform: translate3d(0,-4px,0);\n  }\n}\n       ";
            var output = parse(styles);
            var errors = output.errors;
            testing_internal_1.expect(errors.length).toEqual(0);
            var ast = output.ast;
            testing_internal_1.expect(ast.rules.length).toEqual(6);
            var finalRule = ast.rules[ast.rules.length - 1];
            testing_internal_1.expect(finalRule.type).toEqual(css_parser_1.BlockType.Keyframes);
            testing_internal_1.expect(finalRule.block.entries.length).toEqual(4);
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzX3BhcnNlcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L2Nzc19wYXJzZXJfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQStFLHFDQUFxQyxDQUFDLENBQUE7QUFFckgsMkJBQTZFLG1CQUFtQixDQUFDLENBQUE7QUFDakcsMkJBQTRCLDBCQUEwQixDQUFDLENBQUE7QUFHdkQsc0JBQTZCLE1BQWtCLEVBQUUsU0FBbUI7SUFDbEUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDdkMseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7QUFDSCxDQUFDO0FBSmUsb0JBQVksZUFJM0IsQ0FBQTtBQUVEO0lBQ0UsMkJBQVEsQ0FBQyxXQUFXLEVBQUU7UUFDcEIsZUFBZSxHQUFXO1lBQ3hCLE1BQU0sQ0FBQyxJQUFJLHNCQUFTLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLENBQUM7UUFDOUQsQ0FBQztRQUVELGlCQUFpQixHQUFXO1lBQzFCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1lBQzNCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxJQUFJLDBCQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFDLEtBQW9CLElBQUssT0FBQSxLQUFLLENBQUMsR0FBRyxFQUFU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