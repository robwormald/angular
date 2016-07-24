/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('../../core/testing/testing_internal');
var css_lexer_1 = require('../src/css_lexer');
var lang_1 = require('../src/facade/lang');
function main() {
    function tokenize(code /** TODO #9100 */, trackComments, mode) {
        if (trackComments === void 0) { trackComments = false; }
        if (mode === void 0) { mode = css_lexer_1.CssLexerMode.ALL; }
        var scanner = new css_lexer_1.CssLexer().scan(code, trackComments);
        scanner.setMode(mode);
        var tokens = [];
        var output = scanner.scan();
        while (output != null) {
            var error = output.error;
            if (lang_1.isPresent(error)) {
                throw new css_lexer_1.CssScannerError(error.token, error.rawMessage);
            }
            tokens.push(output.token);
            output = scanner.scan();
        }
        return tokens;
    }
    testing_internal_1.describe('CssLexer', function () {
        testing_internal_1.it('should lex newline characters as whitespace when whitespace mode is on', function () {
            var newlines = ['\n', '\r\n', '\r', '\f'];
            newlines.forEach(function (line) {
                var token = tokenize(line, false, css_lexer_1.CssLexerMode.ALL_TRACK_WS)[0];
                testing_internal_1.expect(token.type).toEqual(css_lexer_1.CssTokenType.Whitespace);
            });
        });
        testing_internal_1.it('should combined newline characters as one newline token when whitespace mode is on', function () {
            var newlines = ['\n', '\r\n', '\r', '\f'].join('');
            var tokens = tokenize(newlines, false, css_lexer_1.CssLexerMode.ALL_TRACK_WS);
            testing_internal_1.expect(tokens.length).toEqual(1);
            testing_internal_1.expect(tokens[0].type).toEqual(css_lexer_1.CssTokenType.Whitespace);
        });
        testing_internal_1.it('should not consider whitespace or newline values at all when whitespace mode is off', function () {
            var newlines = ['\n', '\r\n', '\r', '\f'].join('');
            var tokens = tokenize(newlines);
            testing_internal_1.expect(tokens.length).toEqual(0);
        });
        testing_internal_1.it('should lex simple selectors and their inner properties', function () {
            var cssCode = '\n' +
                '  .selector { my-prop: my-value; }\n';
            var tokens = tokenize(cssCode);
            testing_internal_1.expect(tokens[0].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[0].strValue).toEqual('.');
            testing_internal_1.expect(tokens[1].type).toEqual(css_lexer_1.CssTokenType.Identifier);
            testing_internal_1.expect(tokens[1].strValue).toEqual('selector');
            testing_internal_1.expect(tokens[2].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[2].strValue).toEqual('{');
            testing_internal_1.expect(tokens[3].type).toEqual(css_lexer_1.CssTokenType.Identifier);
            testing_internal_1.expect(tokens[3].strValue).toEqual('my-prop');
            testing_internal_1.expect(tokens[4].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[4].strValue).toEqual(':');
            testing_internal_1.expect(tokens[5].type).toEqual(css_lexer_1.CssTokenType.Identifier);
            testing_internal_1.expect(tokens[5].strValue).toEqual('my-value');
            testing_internal_1.expect(tokens[6].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[6].strValue).toEqual(';');
            testing_internal_1.expect(tokens[7].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[7].strValue).toEqual('}');
        });
        testing_internal_1.it('should capture the column and line values for each token', function () {
            var cssCode = '#id {\n' +
                '  prop:value;\n' +
                '}';
            var tokens = tokenize(cssCode);
            // #
            testing_internal_1.expect(tokens[0].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[0].column).toEqual(0);
            testing_internal_1.expect(tokens[0].line).toEqual(0);
            // id
            testing_internal_1.expect(tokens[1].type).toEqual(css_lexer_1.CssTokenType.Identifier);
            testing_internal_1.expect(tokens[1].column).toEqual(1);
            testing_internal_1.expect(tokens[1].line).toEqual(0);
            // {
            testing_internal_1.expect(tokens[2].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[2].column).toEqual(4);
            testing_internal_1.expect(tokens[2].line).toEqual(0);
            // prop
            testing_internal_1.expect(tokens[3].type).toEqual(css_lexer_1.CssTokenType.Identifier);
            testing_internal_1.expect(tokens[3].column).toEqual(2);
            testing_internal_1.expect(tokens[3].line).toEqual(1);
            // :
            testing_internal_1.expect(tokens[4].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[4].column).toEqual(6);
            testing_internal_1.expect(tokens[4].line).toEqual(1);
            // value
            testing_internal_1.expect(tokens[5].type).toEqual(css_lexer_1.CssTokenType.Identifier);
            testing_internal_1.expect(tokens[5].column).toEqual(7);
            testing_internal_1.expect(tokens[5].line).toEqual(1);
            // ;
            testing_internal_1.expect(tokens[6].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[6].column).toEqual(12);
            testing_internal_1.expect(tokens[6].line).toEqual(1);
            // }
            testing_internal_1.expect(tokens[7].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[7].column).toEqual(0);
            testing_internal_1.expect(tokens[7].line).toEqual(2);
        });
        testing_internal_1.it('should lex quoted strings and escape accordingly', function () {
            var cssCode = 'prop: \'some { value } \\\' that is quoted\'';
            var tokens = tokenize(cssCode);
            testing_internal_1.expect(tokens[0].type).toEqual(css_lexer_1.CssTokenType.Identifier);
            testing_internal_1.expect(tokens[1].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[2].type).toEqual(css_lexer_1.CssTokenType.String);
            testing_internal_1.expect(tokens[2].strValue).toEqual('\'some { value } \\\' that is quoted\'');
        });
        testing_internal_1.it('should treat attribute operators as regular characters', function () {
            tokenize('^|~+*').forEach(function (token) { testing_internal_1.expect(token.type).toEqual(css_lexer_1.CssTokenType.Character); });
        });
        testing_internal_1.it('should lex numbers properly and set them as numbers', function () {
            var cssCode = '0 1 -2 3.0 -4.001';
            var tokens = tokenize(cssCode);
            testing_internal_1.expect(tokens[0].type).toEqual(css_lexer_1.CssTokenType.Number);
            testing_internal_1.expect(tokens[0].strValue).toEqual('0');
            testing_internal_1.expect(tokens[1].type).toEqual(css_lexer_1.CssTokenType.Number);
            testing_internal_1.expect(tokens[1].strValue).toEqual('1');
            testing_internal_1.expect(tokens[2].type).toEqual(css_lexer_1.CssTokenType.Number);
            testing_internal_1.expect(tokens[2].strValue).toEqual('-2');
            testing_internal_1.expect(tokens[3].type).toEqual(css_lexer_1.CssTokenType.Number);
            testing_internal_1.expect(tokens[3].strValue).toEqual('3.0');
            testing_internal_1.expect(tokens[4].type).toEqual(css_lexer_1.CssTokenType.Number);
            testing_internal_1.expect(tokens[4].strValue).toEqual('-4.001');
        });
        testing_internal_1.it('should lex @keywords', function () {
            var cssCode = '@import()@something';
            var tokens = tokenize(cssCode);
            testing_internal_1.expect(tokens[0].type).toEqual(css_lexer_1.CssTokenType.AtKeyword);
            testing_internal_1.expect(tokens[0].strValue).toEqual('@import');
            testing_internal_1.expect(tokens[1].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[1].strValue).toEqual('(');
            testing_internal_1.expect(tokens[2].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[2].strValue).toEqual(')');
            testing_internal_1.expect(tokens[3].type).toEqual(css_lexer_1.CssTokenType.AtKeyword);
            testing_internal_1.expect(tokens[3].strValue).toEqual('@something');
        });
        testing_internal_1.it('should still lex a number even if it has a dimension suffix', function () {
            var cssCode = '40% is 40 percent';
            var tokens = tokenize(cssCode);
            testing_internal_1.expect(tokens[0].type).toEqual(css_lexer_1.CssTokenType.Number);
            testing_internal_1.expect(tokens[0].strValue).toEqual('40');
            testing_internal_1.expect(tokens[1].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[1].strValue).toEqual('%');
            testing_internal_1.expect(tokens[2].type).toEqual(css_lexer_1.CssTokenType.Identifier);
            testing_internal_1.expect(tokens[2].strValue).toEqual('is');
            testing_internal_1.expect(tokens[3].type).toEqual(css_lexer_1.CssTokenType.Number);
            testing_internal_1.expect(tokens[3].strValue).toEqual('40');
        });
        testing_internal_1.it('should allow escaped character and unicode character-strings in CSS selectors', function () {
            var cssCode = '\\123456 .some\\thing \{\}';
            var tokens = tokenize(cssCode);
            testing_internal_1.expect(tokens[0].type).toEqual(css_lexer_1.CssTokenType.Identifier);
            testing_internal_1.expect(tokens[0].strValue).toEqual('\\123456');
            testing_internal_1.expect(tokens[1].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[2].type).toEqual(css_lexer_1.CssTokenType.Identifier);
            testing_internal_1.expect(tokens[2].strValue).toEqual('some\\thing');
        });
        testing_internal_1.it('should distinguish identifiers and numbers from special characters', function () {
            var cssCode = 'one*two=-4+three-4-equals_value$';
            var tokens = tokenize(cssCode);
            testing_internal_1.expect(tokens[0].type).toEqual(css_lexer_1.CssTokenType.Identifier);
            testing_internal_1.expect(tokens[0].strValue).toEqual('one');
            testing_internal_1.expect(tokens[1].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[1].strValue).toEqual('*');
            testing_internal_1.expect(tokens[2].type).toEqual(css_lexer_1.CssTokenType.Identifier);
            testing_internal_1.expect(tokens[2].strValue).toEqual('two');
            testing_internal_1.expect(tokens[3].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[3].strValue).toEqual('=');
            testing_internal_1.expect(tokens[4].type).toEqual(css_lexer_1.CssTokenType.Number);
            testing_internal_1.expect(tokens[4].strValue).toEqual('-4');
            testing_internal_1.expect(tokens[5].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[5].strValue).toEqual('+');
            testing_internal_1.expect(tokens[6].type).toEqual(css_lexer_1.CssTokenType.Identifier);
            testing_internal_1.expect(tokens[6].strValue).toEqual('three-4-equals_value');
            testing_internal_1.expect(tokens[7].type).toEqual(css_lexer_1.CssTokenType.Character);
            testing_internal_1.expect(tokens[7].strValue).toEqual('$');
        });
        testing_internal_1.it('should filter out comments and whitespace by default', function () {
            var cssCode = '.selector /* comment */ { /* value */ }';
            var tokens = tokenize(cssCode);
            testing_internal_1.expect(tokens[0].strValue).toEqual('.');
            testing_internal_1.expect(tokens[1].strValue).toEqual('selector');
            testing_internal_1.expect(tokens[2].strValue).toEqual('{');
            testing_internal_1.expect(tokens[3].strValue).toEqual('}');
        });
        testing_internal_1.it('should track comments when the flag is set to true', function () {
            var cssCode = '.selector /* comment */ { /* value */ }';
            var trackComments = true;
            var tokens = tokenize(cssCode, trackComments, css_lexer_1.CssLexerMode.ALL_TRACK_WS);
            testing_internal_1.expect(tokens[0].strValue).toEqual('.');
            testing_internal_1.expect(tokens[1].strValue).toEqual('selector');
            testing_internal_1.expect(tokens[2].strValue).toEqual(' ');
            testing_internal_1.expect(tokens[3].type).toEqual(css_lexer_1.CssTokenType.Comment);
            testing_internal_1.expect(tokens[3].strValue).toEqual('/* comment */');
            testing_internal_1.expect(tokens[4].strValue).toEqual(' ');
            testing_internal_1.expect(tokens[5].strValue).toEqual('{');
            testing_internal_1.expect(tokens[6].strValue).toEqual(' ');
            testing_internal_1.expect(tokens[7].type).toEqual(css_lexer_1.CssTokenType.Comment);
            testing_internal_1.expect(tokens[7].strValue).toEqual('/* value */');
        });
        testing_internal_1.describe('Selector Mode', function () {
            testing_internal_1.it('should throw an error if a selector is being parsed while in the wrong mode', function () {
                var cssCode = '.class > tag';
                var capturedMessage;
                try {
                    tokenize(cssCode, false, css_lexer_1.CssLexerMode.STYLE_BLOCK);
                }
                catch (e) {
                    capturedMessage = e.rawMessage;
                }
                testing_internal_1.expect(capturedMessage).toMatch(/Unexpected character \[\>\] at column 0:7 in expression/g);
                capturedMessage = null;
                try {
                    tokenize(cssCode, false, css_lexer_1.CssLexerMode.SELECTOR);
                }
                catch (e) {
                    capturedMessage = e.rawMessage;
                }
                testing_internal_1.expect(capturedMessage).toEqual(null);
            });
        });
        testing_internal_1.describe('Attribute Mode', function () {
            testing_internal_1.it('should consider attribute selectors as valid input and throw when an invalid modifier is used', function () {
                function tokenizeAttr(modifier /** TODO #9100 */) {
                    var cssCode = 'value' + modifier + '=\'something\'';
                    return tokenize(cssCode, false, css_lexer_1.CssLexerMode.ATTRIBUTE_SELECTOR);
                }
                testing_internal_1.expect(tokenizeAttr('*').length).toEqual(4);
                testing_internal_1.expect(tokenizeAttr('|').length).toEqual(4);
                testing_internal_1.expect(tokenizeAttr('^').length).toEqual(4);
                testing_internal_1.expect(tokenizeAttr('$').length).toEqual(4);
                testing_internal_1.expect(tokenizeAttr('~').length).toEqual(4);
                testing_internal_1.expect(tokenizeAttr('').length).toEqual(3);
                testing_internal_1.expect(function () { tokenizeAttr('+'); }).toThrow();
            });
        });
        testing_internal_1.describe('Media Query Mode', function () {
            testing_internal_1.it('should validate media queries with a reduced subset of valid characters', function () {
                function tokenizeQuery(code /** TODO #9100 */) {
                    return tokenize(code, false, css_lexer_1.CssLexerMode.MEDIA_QUERY);
                }
                // the reason why the numbers are so high is because MediaQueries keep
                // track of the whitespace values
                testing_internal_1.expect(tokenizeQuery('(prop: value)').length).toEqual(5);
                testing_internal_1.expect(tokenizeQuery('(prop: value) and (prop2: value2)').length).toEqual(11);
                testing_internal_1.expect(tokenizeQuery('tv and (prop: value)').length).toEqual(7);
                testing_internal_1.expect(tokenizeQuery('print and ((prop: value) or (prop2: value2))').length).toEqual(15);
                testing_internal_1.expect(tokenizeQuery('(content: \'something $ crazy inside &\')').length).toEqual(5);
                testing_internal_1.expect(function () { tokenizeQuery('(max-height: 10 + 20)'); }).toThrow();
                testing_internal_1.expect(function () { tokenizeQuery('(max-height: fifty < 100)'); }).toThrow();
            });
        });
        testing_internal_1.describe('Pseudo Selector Mode', function () {
            testing_internal_1.it('should validate pseudo selector identifiers with a reduced subset of valid characters', function () {
                function tokenizePseudo(code, withArgs) {
                    if (withArgs === void 0) { withArgs = false; }
                    var mode = withArgs ? css_lexer_1.CssLexerMode.PSEUDO_SELECTOR_WITH_ARGUMENTS :
                        css_lexer_1.CssLexerMode.PSEUDO_SELECTOR;
                    return tokenize(code, false, mode);
                }
                testing_internal_1.expect(tokenizePseudo('hover').length).toEqual(1);
                testing_internal_1.expect(tokenizePseudo('focus').length).toEqual(1);
                testing_internal_1.expect(tokenizePseudo('lang(en-us)', true).length).toEqual(4);
                testing_internal_1.expect(function () { tokenizePseudo('lang(something:broken)', true); }).toThrow();
                testing_internal_1.expect(function () { tokenizePseudo('not(.selector)', true); }).toThrow();
            });
        });
        testing_internal_1.describe('Style Block Mode', function () {
            testing_internal_1.it('should style blocks with a reduced subset of valid characters', function () {
                function tokenizeStyles(code /** TODO #9100 */) {
                    return tokenize(code, false, css_lexer_1.CssLexerMode.STYLE_BLOCK);
                }
                testing_internal_1.expect(tokenizeStyles("\n          key: value;\n          prop: 100;\n          style: value3!important;\n        ").length).toEqual(14);
                testing_internal_1.expect(function () { return tokenizeStyles(" key$: value; "); }).toThrow();
                testing_internal_1.expect(function () { return tokenizeStyles(" key: value$; "); }).toThrow();
                testing_internal_1.expect(function () { return tokenizeStyles(" key: value + 10; "); }).toThrow();
                testing_internal_1.expect(function () { return tokenizeStyles(" key: &value; "); }).toThrow();
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzX2xleGVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3QvY3NzX2xleGVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUErRSxxQ0FBcUMsQ0FBQyxDQUFBO0FBQ3JILDBCQUE4RSxrQkFBa0IsQ0FBQyxDQUFBO0FBQ2pHLHFCQUF3QixvQkFBb0IsQ0FBQyxDQUFBO0FBRTdDO0lBQ0Usa0JBQ0ksSUFBUyxDQUFDLGlCQUFpQixFQUFFLGFBQThCLEVBQzNELElBQXFDO1FBRFIsNkJBQThCLEdBQTlCLHFCQUE4QjtRQUMzRCxvQkFBcUMsR0FBckMsT0FBcUIsd0JBQVksQ0FBQyxHQUFHO1FBQ3ZDLElBQUksT0FBTyxHQUFHLElBQUksb0JBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFDdkQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV0QixJQUFJLE1BQU0sR0FBNEIsRUFBRSxDQUFDO1FBQ3pDLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM1QixPQUFPLE1BQU0sSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUN0QixJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO1lBQ3pCLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLElBQUksMkJBQWUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMzRCxDQUFDO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDMUIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBRUQsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBRUQsMkJBQVEsQ0FBQyxVQUFVLEVBQUU7UUFDbkIscUJBQUUsQ0FBQyx3RUFBd0UsRUFBRTtZQUMzRSxJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQyxJQUFJO2dCQUNwQixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSx3QkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyxvRkFBb0YsRUFBRTtZQUN2RixJQUFJLFFBQVEsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNuRCxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSx3QkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2xFLHlCQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMscUZBQXFGLEVBQ3JGO1lBQ0UsSUFBSSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbkQsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hDLHlCQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQyxDQUFDLENBQUMsQ0FBQztRQUVOLHFCQUFFLENBQUMsd0RBQXdELEVBQUU7WUFDM0QsSUFBSSxPQUFPLEdBQUcsSUFBSTtnQkFDZCxzQ0FBc0MsQ0FBQztZQUMzQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFL0IseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkQseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXhDLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUUvQyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFeEMseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEQseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTlDLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV4Qyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFFL0MseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkQseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXhDLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsMERBQTBELEVBQUU7WUFDN0QsSUFBSSxPQUFPLEdBQUcsU0FBUztnQkFDbkIsaUJBQWlCO2dCQUNqQixHQUFHLENBQUM7WUFFUixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFL0IsSUFBSTtZQUNKLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEMsS0FBSztZQUNMLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEMsSUFBSTtZQUNKLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEMsT0FBTztZQUNQLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEMsSUFBSTtZQUNKLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEMsUUFBUTtZQUNSLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEMsSUFBSTtZQUNKLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyQyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEMsSUFBSTtZQUNKLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLGtEQUFrRCxFQUFFO1lBQ3JELElBQUksT0FBTyxHQUFHLDhDQUE4QyxDQUFDO1lBQzdELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUvQix5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsd0NBQXdDLENBQUMsQ0FBQztRQUMvRSxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsd0RBQXdELEVBQUU7WUFDM0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssSUFBTyx5QkFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hHLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyxxREFBcUQsRUFBRTtZQUN4RCxJQUFJLE9BQU8sR0FBRyxtQkFBbUIsQ0FBQztZQUNsQyxJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7WUFFL0IseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXhDLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV4Qyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNwRCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFekMseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRTFDLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsc0JBQXNCLEVBQUU7WUFDekIsSUFBSSxPQUFPLEdBQUcscUJBQXFCLENBQUM7WUFDcEMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRS9CLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUU5Qyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFeEMseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkQseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXhDLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsNkRBQTZELEVBQUU7WUFDaEUsSUFBSSxPQUFPLEdBQUcsbUJBQW1CLENBQUM7WUFDbEMsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRS9CLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUV6Qyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFeEMseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEQseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXpDLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsK0VBQStFLEVBQUU7WUFDbEYsSUFBSSxPQUFPLEdBQUcsNEJBQTRCLENBQUM7WUFDM0MsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRS9CLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUUvQyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLG9FQUFvRSxFQUFFO1lBQ3ZFLElBQUksT0FBTyxHQUFHLGtDQUFrQyxDQUFDO1lBQ2pELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUvQix5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFMUMseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkQseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXhDLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3hELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUxQyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFeEMseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDcEQseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXpDLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3ZELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV4Qyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN4RCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUUzRCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUN2RCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLHNEQUFzRCxFQUFFO1lBQ3pELElBQUksT0FBTyxHQUFHLHlDQUF5QyxDQUFDO1lBQ3hELElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUUvQix5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQy9DLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4Qyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLG9EQUFvRCxFQUFFO1lBQ3ZELElBQUksT0FBTyxHQUFHLHlDQUF5QyxDQUFDO1lBQ3hELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQztZQUN6QixJQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxFQUFFLGFBQWEsRUFBRSx3QkFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBRXpFLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4Qyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDL0MseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXhDLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3JELHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUVwRCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDeEMseUJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3hDLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUV4Qyx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNyRCx5QkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBUSxDQUFDLGVBQWUsRUFBRTtZQUN4QixxQkFBRSxDQUFDLDZFQUE2RSxFQUFFO2dCQUNoRixJQUFJLE9BQU8sR0FBRyxjQUFjLENBQUM7Z0JBRTdCLElBQUksZUFBb0IsQ0FBbUI7Z0JBQzNDLElBQUksQ0FBQztvQkFDSCxRQUFRLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSx3QkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNyRCxDQUFFO2dCQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1gsZUFBZSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUM7Z0JBQ2pDLENBQUM7Z0JBRUQseUJBQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsMERBQTBELENBQUMsQ0FBQztnQkFDNUYsZUFBZSxHQUFHLElBQUksQ0FBQztnQkFFdkIsSUFBSSxDQUFDO29CQUNILFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLHdCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQ2xELENBQUU7Z0JBQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDWCxlQUFlLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQztnQkFDakMsQ0FBQztnQkFFRCx5QkFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsMkJBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtZQUN6QixxQkFBRSxDQUFDLCtGQUErRixFQUMvRjtnQkFDRSxzQkFBc0IsUUFBYSxDQUFDLGlCQUFpQjtvQkFDbkQsSUFBSSxPQUFPLEdBQUcsT0FBTyxHQUFHLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztvQkFDcEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLHdCQUFZLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDbkUsQ0FBQztnQkFFRCx5QkFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLHlCQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMseUJBQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1Qyx5QkFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLHlCQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMseUJBQU0sQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUUzQyx5QkFBTSxDQUFDLGNBQVEsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakQsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztRQUVILDJCQUFRLENBQUMsa0JBQWtCLEVBQUU7WUFDM0IscUJBQUUsQ0FBQyx5RUFBeUUsRUFBRTtnQkFDNUUsdUJBQXVCLElBQVMsQ0FBQyxpQkFBaUI7b0JBQ2hELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSx3QkFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUN6RCxDQUFDO2dCQUVELHNFQUFzRTtnQkFDdEUsaUNBQWlDO2dCQUNqQyx5QkFBTSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELHlCQUFNLENBQUMsYUFBYSxDQUFDLG1DQUFtQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RSx5QkFBTSxDQUFDLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEUseUJBQU0sQ0FBQyxhQUFhLENBQUMsOENBQThDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3pGLHlCQUFNLENBQUMsYUFBYSxDQUFDLDJDQUEyQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVyRix5QkFBTSxDQUFDLGNBQVEsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFFcEUseUJBQU0sQ0FBQyxjQUFRLGFBQWEsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUUsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILDJCQUFRLENBQUMsc0JBQXNCLEVBQUU7WUFDL0IscUJBQUUsQ0FBQyx1RkFBdUYsRUFDdkY7Z0JBQ0Usd0JBQXdCLElBQVksRUFBRSxRQUFnQjtvQkFBaEIsd0JBQWdCLEdBQWhCLGdCQUFnQjtvQkFDcEQsSUFBSSxJQUFJLEdBQUcsUUFBUSxHQUFHLHdCQUFZLENBQUMsOEJBQThCO3dCQUMzQyx3QkFBWSxDQUFDLGVBQWUsQ0FBQztvQkFDbkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUNyQyxDQUFDO2dCQUVELHlCQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEQseUJBQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCx5QkFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUU5RCx5QkFBTSxDQUFDLGNBQVEsY0FBYyxDQUFDLHdCQUF3QixFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRTVFLHlCQUFNLENBQUMsY0FBUSxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUN0RSxDQUFDLENBQUMsQ0FBQztRQUNSLENBQUMsQ0FBQyxDQUFDO1FBRUgsMkJBQVEsQ0FDSixrQkFBa0IsRUFBRTtZQUNsQixxQkFBRSxDQUFDLCtEQUErRCxFQUMvRDtnQkFDRSx3QkFBd0IsSUFBUyxDQUFDLGlCQUFpQjtvQkFDakQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLHdCQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3pELENBQUM7Z0JBRUQseUJBQU0sQ0FBQyxjQUFjLENBQUMsNkZBSTVCLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBRWhCLHlCQUFNLENBQUMsY0FBTSxPQUFBLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pELHlCQUFNLENBQUMsY0FBTSxPQUFBLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ3pELHlCQUFNLENBQUMsY0FBTSxPQUFBLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzdELHlCQUFNLENBQUMsY0FBTSxPQUFBLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDM0QsQ0FBQyxDQUFDLENBQUM7UUFDUixDQUFDLENBQUMsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTVXZSxZQUFJLE9BNFduQixDQUFBIn0=