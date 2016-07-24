/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var ast_1 = require('@angular/compiler/src/expression_parser/ast');
var lexer_1 = require('@angular/compiler/src/expression_parser/lexer');
var parser_1 = require('@angular/compiler/src/expression_parser/parser');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var lang_1 = require('../../src/facade/lang');
var unparser_1 = require('./unparser');
var validator_1 = require('./validator');
function main() {
    function createParser() { return new parser_1.Parser(new lexer_1.Lexer()); }
    function parseAction(text, location) {
        if (location === void 0) { location = null; }
        return createParser().parseAction(text, location);
    }
    function parseBinding(text, location) {
        if (location === void 0) { location = null; }
        return createParser().parseBinding(text, location);
    }
    function parseTemplateBindingsResult(text, location) {
        if (location === void 0) { location = null; }
        return createParser().parseTemplateBindings(text, location);
    }
    function parseTemplateBindings(text, location) {
        if (location === void 0) { location = null; }
        return parseTemplateBindingsResult(text, location).templateBindings;
    }
    function parseInterpolation(text, location) {
        if (location === void 0) { location = null; }
        return createParser().parseInterpolation(text, location);
    }
    function parseSimpleBinding(text, location) {
        if (location === void 0) { location = null; }
        return createParser().parseSimpleBinding(text, location);
    }
    function checkInterpolation(exp, expected) {
        var ast = parseInterpolation(exp);
        if (lang_1.isBlank(expected))
            expected = exp;
        matchers_1.expect(unparser_1.unparse(ast)).toEqual(expected);
        validator_1.validate(ast);
    }
    function checkBinding(exp, expected) {
        var ast = parseBinding(exp);
        if (lang_1.isBlank(expected))
            expected = exp;
        matchers_1.expect(unparser_1.unparse(ast)).toEqual(expected);
        validator_1.validate(ast);
    }
    function checkAction(exp, expected) {
        var ast = parseAction(exp);
        if (lang_1.isBlank(expected))
            expected = exp;
        matchers_1.expect(unparser_1.unparse(ast)).toEqual(expected);
        validator_1.validate(ast);
    }
    function expectError(ast, message) {
        for (var _i = 0, _a = ast.errors; _i < _a.length; _i++) {
            var error = _a[_i];
            if (error.message.indexOf(message) >= 0) {
                return;
            }
        }
        throw Error("Expected an error containing \"" + message + "\" to be reported");
    }
    function expectActionError(text, message) {
        expectError(validator_1.validate(parseAction(text)), message);
    }
    function expectBindingError(text, message) {
        expectError(validator_1.validate(parseBinding(text)), message);
    }
    describe('parser', function () {
        describe('parseAction', function () {
            it('should parse numbers', function () { checkAction('1'); });
            it('should parse strings', function () {
                checkAction('\'1\'', '"1"');
                checkAction('"1"');
            });
            it('should parse null', function () { checkAction('null'); });
            it('should parse unary - expressions', function () {
                checkAction('-1', '0 - 1');
                checkAction('+1', '1');
            });
            it('should parse unary ! expressions', function () {
                checkAction('!true');
                checkAction('!!true');
                checkAction('!!!true');
            });
            it('should parse multiplicative expressions', function () { checkAction('3*4/2%5', '3 * 4 / 2 % 5'); });
            it('should parse additive expressions', function () { checkAction('3 + 6 - 2'); });
            it('should parse relational expressions', function () {
                checkAction('2 < 3');
                checkAction('2 > 3');
                checkAction('2 <= 2');
                checkAction('2 >= 2');
            });
            it('should parse equality expressions', function () {
                checkAction('2 == 3');
                checkAction('2 != 3');
            });
            it('should parse strict equality expressions', function () {
                checkAction('2 === 3');
                checkAction('2 !== 3');
            });
            it('should parse expressions', function () {
                checkAction('true && true');
                checkAction('true || false');
            });
            it('should parse grouped expressions', function () { checkAction('(1 + 2) * 3', '1 + 2 * 3'); });
            it('should ignore comments in expressions', function () { checkAction('a //comment', 'a'); });
            it('should retain // in string literals', function () { checkAction("\"http://www.google.com\"", "\"http://www.google.com\""); });
            it('should parse an empty string', function () { checkAction(''); });
            describe('literals', function () {
                it('should parse array', function () {
                    checkAction('[1][0]');
                    checkAction('[[1]][0][0]');
                    checkAction('[]');
                    checkAction('[].length');
                    checkAction('[1, 2].length');
                });
                it('should parse map', function () {
                    checkAction('{}');
                    checkAction('{a: 1}[2]');
                    checkAction('{}["a"]');
                });
                it('should only allow identifier, string, or keyword as map key', function () {
                    expectActionError('{(:0}', 'expected identifier, keyword, or string');
                    expectActionError('{1234:0}', 'expected identifier, keyword, or string');
                });
            });
            describe('member access', function () {
                it('should parse field access', function () {
                    checkAction('a');
                    checkAction('a.a');
                });
                it('should only allow identifier or keyword as member names', function () {
                    expectActionError('x.(', 'identifier or keyword');
                    expectActionError('x. 1234', 'identifier or keyword');
                    expectActionError('x."foo"', 'identifier or keyword');
                });
                it('should parse safe field access', function () {
                    checkAction('a?.a');
                    checkAction('a.a?.a');
                });
            });
            describe('method calls', function () {
                it('should parse method calls', function () {
                    checkAction('fn()');
                    checkAction('add(1, 2)');
                    checkAction('a.add(1, 2)');
                    checkAction('fn().add(1, 2)');
                });
            });
            describe('functional calls', function () {
                it('should parse function calls', function () { checkAction('fn()(1, 2)'); });
            });
            describe('conditional', function () {
                it('should parse ternary/conditional expressions', function () {
                    checkAction('7 == 3 + 4 ? 10 : 20');
                    checkAction('false ? 10 : 20');
                });
                it('should report incorrect ternary operator syntax', function () {
                    expectActionError('true?1', 'Conditional expression true?1 requires all 3 expressions');
                });
            });
            describe('assignment', function () {
                it('should support field assignments', function () {
                    checkAction('a = 12');
                    checkAction('a.a.a = 123');
                    checkAction('a = 123; b = 234;');
                });
                it('should report on safe field assignments', function () { expectActionError('a?.a = 123', 'cannot be used in the assignment'); });
                it('should support array updates', function () { checkAction('a[0] = 200'); });
            });
            it('should error when using pipes', function () { expectActionError('x|blah', 'Cannot have a pipe'); });
            it('should store the source in the result', function () { matchers_1.expect(parseAction('someExpr', 'someExpr')); });
            it('should store the passed-in location', function () { matchers_1.expect(parseAction('someExpr', 'location').location).toBe('location'); });
            it('should report when encountering interpolation', function () {
                expectActionError('{{a()}}', 'Got interpolation ({{}}) where expression was expected');
            });
        });
        describe('general error handling', function () {
            it('should report an unexpected token', function () { expectActionError('[1,2] trac', 'Unexpected token \'trac\''); });
            it('should report reasonable error for unconsumed tokens', function () { expectActionError(')', 'Unexpected token ) at column 1 in [)]'); });
            it('should report a missing expected token', function () {
                expectActionError('a(b', 'Missing expected ) at the end of the expression [a(b]');
            });
        });
        describe('parseBinding', function () {
            describe('pipes', function () {
                it('should parse pipes', function () {
                    checkBinding('a(b | c)', 'a((b | c))');
                    checkBinding('a.b(c.d(e) | f)', 'a.b((c.d(e) | f))');
                    checkBinding('[1, 2, 3] | a', '([1, 2, 3] | a)');
                    checkBinding('{a: 1} | b', '({a: 1} | b)');
                    checkBinding('a[b] | c', '(a[b] | c)');
                    checkBinding('a?.b | c', '(a?.b | c)');
                    checkBinding('true | a', '(true | a)');
                    checkBinding('a | b:c | d', '((a | b:c) | d)');
                    checkBinding('a | b:(c | d)', '(a | b:(c | d))');
                });
                it('should only allow identifier or keyword as formatter names', function () {
                    expectBindingError('"Foo"|(', 'identifier or keyword');
                    expectBindingError('"Foo"|1234', 'identifier or keyword');
                    expectBindingError('"Foo"|"uppercase"', 'identifier or keyword');
                });
                it('should parse quoted expressions', function () { checkBinding('a:b', 'a:b'); });
                it('should not crash when prefix part is not tokenizable', function () { checkBinding('"a:b"', '"a:b"'); });
                it('should ignore whitespace around quote prefix', function () { checkBinding(' a :b', 'a:b'); });
                it('should refuse prefixes that are not single identifiers', function () {
                    expectBindingError('a + b:c', '');
                    expectBindingError('1:c', '');
                });
            });
            it('should store the source in the result', function () { matchers_1.expect(parseBinding('someExpr').source).toBe('someExpr'); });
            it('should store the passed-in location', function () { matchers_1.expect(parseBinding('someExpr', 'location').location).toBe('location'); });
            it('should report chain expressions', function () { expectError(parseBinding('1;2'), 'contain chained expression'); });
            it('should report assignment', function () { expectError(parseBinding('a=2'), 'contain assignments'); });
            it('should report when encountering interpolation', function () {
                expectBindingError('{{a.b}}', 'Got interpolation ({{}}) where expression was expected');
            });
            it('should parse conditional expression', function () { checkBinding('a < b ? a : b'); });
            it('should ignore comments in bindings', function () { checkBinding('a //comment', 'a'); });
            it('should retain // in string literals', function () { checkBinding("\"http://www.google.com\"", "\"http://www.google.com\""); });
            it('should retain // in : microsyntax', function () { checkBinding('one:a//b', 'one:a//b'); });
        });
        describe('parseTemplateBindings', function () {
            function keys(templateBindings) {
                return templateBindings.map(function (binding) { return binding.key; });
            }
            function keyValues(templateBindings) {
                return templateBindings.map(function (binding) {
                    if (binding.keyIsVar) {
                        return 'let ' + binding.key + (lang_1.isBlank(binding.name) ? '=null' : '=' + binding.name);
                    }
                    else {
                        return binding.key + (lang_1.isBlank(binding.expression) ? '' : "=" + binding.expression);
                    }
                });
            }
            function exprSources(templateBindings) {
                return templateBindings.map(function (binding) { return lang_1.isPresent(binding.expression) ? binding.expression.source : null; });
            }
            it('should parse an empty string', function () { matchers_1.expect(parseTemplateBindings('')).toEqual([]); });
            it('should parse a string without a value', function () { matchers_1.expect(keys(parseTemplateBindings('a'))).toEqual(['a']); });
            it('should only allow identifier, string, or keyword including dashes as keys', function () {
                var bindings = parseTemplateBindings('a:\'b\'');
                matchers_1.expect(keys(bindings)).toEqual(['a']);
                bindings = parseTemplateBindings('\'a\':\'b\'');
                matchers_1.expect(keys(bindings)).toEqual(['a']);
                bindings = parseTemplateBindings('"a":\'b\'');
                matchers_1.expect(keys(bindings)).toEqual(['a']);
                bindings = parseTemplateBindings('a-b:\'c\'');
                matchers_1.expect(keys(bindings)).toEqual(['a-b']);
                expectError(parseTemplateBindingsResult('(:0'), 'expected identifier, keyword, or string');
                expectError(parseTemplateBindingsResult('1234:0'), 'expected identifier, keyword, or string');
            });
            it('should detect expressions as value', function () {
                var bindings = parseTemplateBindings('a:b');
                matchers_1.expect(exprSources(bindings)).toEqual(['b']);
                bindings = parseTemplateBindings('a:1+1');
                matchers_1.expect(exprSources(bindings)).toEqual(['1+1']);
            });
            it('should detect names as value', function () {
                var bindings = parseTemplateBindings('a:let b');
                matchers_1.expect(keyValues(bindings)).toEqual(['a', 'let b=\$implicit']);
            });
            it('should allow space and colon as separators', function () {
                var bindings = parseTemplateBindings('a:b');
                matchers_1.expect(keys(bindings)).toEqual(['a']);
                matchers_1.expect(exprSources(bindings)).toEqual(['b']);
                bindings = parseTemplateBindings('a b');
                matchers_1.expect(keys(bindings)).toEqual(['a']);
                matchers_1.expect(exprSources(bindings)).toEqual(['b']);
            });
            it('should allow multiple pairs', function () {
                var bindings = parseTemplateBindings('a 1 b 2');
                matchers_1.expect(keys(bindings)).toEqual(['a', 'aB']);
                matchers_1.expect(exprSources(bindings)).toEqual(['1 ', '2']);
            });
            it('should store the sources in the result', function () {
                var bindings = parseTemplateBindings('a 1,b 2');
                matchers_1.expect(bindings[0].expression.source).toEqual('1');
                matchers_1.expect(bindings[1].expression.source).toEqual('2');
            });
            it('should store the passed-in location', function () {
                var bindings = parseTemplateBindings('a 1,b 2', 'location');
                matchers_1.expect(bindings[0].expression.location).toEqual('location');
            });
            it('should support var notation with a deprecation warning', function () {
                var bindings = createParser().parseTemplateBindings('var i', null);
                matchers_1.expect(keyValues(bindings.templateBindings)).toEqual(['let i=\$implicit']);
                matchers_1.expect(bindings.warnings).toEqual([
                    '"var" inside of expressions is deprecated. Use "let" instead!'
                ]);
            });
            it('should support # notation with a deprecation warning', function () {
                var bindings = createParser().parseTemplateBindings('#i', null);
                matchers_1.expect(keyValues(bindings.templateBindings)).toEqual(['let i=\$implicit']);
                matchers_1.expect(bindings.warnings).toEqual([
                    '"#" inside of expressions is deprecated. Use "let" instead!'
                ]);
            });
            it('should support let notation', function () {
                var bindings = parseTemplateBindings('let i');
                matchers_1.expect(keyValues(bindings)).toEqual(['let i=\$implicit']);
                bindings = parseTemplateBindings('let i');
                matchers_1.expect(keyValues(bindings)).toEqual(['let i=\$implicit']);
                bindings = parseTemplateBindings('let a; let b');
                matchers_1.expect(keyValues(bindings)).toEqual(['let a=\$implicit', 'let b=\$implicit']);
                bindings = parseTemplateBindings('let a; let b;');
                matchers_1.expect(keyValues(bindings)).toEqual(['let a=\$implicit', 'let b=\$implicit']);
                bindings = parseTemplateBindings('let i-a = k-a');
                matchers_1.expect(keyValues(bindings)).toEqual(['let i-a=k-a']);
                bindings = parseTemplateBindings('keyword let item; let i = k');
                matchers_1.expect(keyValues(bindings)).toEqual(['keyword', 'let item=\$implicit', 'let i=k']);
                bindings = parseTemplateBindings('keyword: let item; let i = k');
                matchers_1.expect(keyValues(bindings)).toEqual(['keyword', 'let item=\$implicit', 'let i=k']);
                bindings = parseTemplateBindings('directive: let item in expr; let a = b', 'location');
                matchers_1.expect(keyValues(bindings)).toEqual([
                    'directive', 'let item=\$implicit', 'directiveIn=expr in location', 'let a=b'
                ]);
            });
            it('should parse pipes', function () {
                var bindings = parseTemplateBindings('key value|pipe');
                var ast = bindings[0].expression.ast;
                matchers_1.expect(ast).toBeAnInstanceOf(ast_1.BindingPipe);
            });
        });
        describe('parseInterpolation', function () {
            it('should return null if no interpolation', function () { matchers_1.expect(parseInterpolation('nothing')).toBe(null); });
            it('should parse no prefix/suffix interpolation', function () {
                var ast = parseInterpolation('{{a}}').ast;
                matchers_1.expect(ast.strings).toEqual(['', '']);
                matchers_1.expect(ast.expressions.length).toEqual(1);
                matchers_1.expect(ast.expressions[0].name).toEqual('a');
            });
            it('should parse prefix/suffix with multiple interpolation', function () {
                var originalExp = 'before {{ a }} middle {{ b }} after';
                var ast = parseInterpolation(originalExp).ast;
                matchers_1.expect(unparser_1.unparse(ast)).toEqual(originalExp);
                validator_1.validate(ast);
            });
            it('should report empty interpolation expressions', function () {
                expectError(parseInterpolation('{{}}'), 'Blank expressions are not allowed in interpolated strings');
                expectError(parseInterpolation('foo {{  }}'), 'Parser Error: Blank expressions are not allowed in interpolated strings');
            });
            it('should parse conditional expression', function () { checkInterpolation('{{ a < b ? a : b }}'); });
            it('should parse expression with newline characters', function () {
                checkInterpolation("{{ 'foo' +\n 'bar' +\r 'baz' }}", "{{ \"foo\" + \"bar\" + \"baz\" }}");
            });
            it('should support custom interpolation', function () {
                var parser = new parser_1.Parser(new lexer_1.Lexer());
                var ast = parser.parseInterpolation('{% a %}', null, { start: '{%', end: '%}' }).ast;
                matchers_1.expect(ast.strings).toEqual(['', '']);
                matchers_1.expect(ast.expressions.length).toEqual(1);
                matchers_1.expect(ast.expressions[0].name).toEqual('a');
            });
            describe('comments', function () {
                it('should ignore comments in interpolation expressions', function () { checkInterpolation('{{a //comment}}', '{{ a }}'); });
                it('should retain // in single quote strings', function () {
                    checkInterpolation("{{ 'http://www.google.com' }}", "{{ \"http://www.google.com\" }}");
                });
                it('should retain // in double quote strings', function () {
                    checkInterpolation("{{ \"http://www.google.com\" }}", "{{ \"http://www.google.com\" }}");
                });
                it('should ignore comments after string literals', function () { checkInterpolation("{{ \"a//b\" //comment }}", "{{ \"a//b\" }}"); });
                it('should retain // in complex strings', function () {
                    checkInterpolation("{{\"//a'//b`//c`//d'//e\" //comment}}", "{{ \"//a'//b`//c`//d'//e\" }}");
                });
                it('should retain // in nested, unterminated strings', function () { checkInterpolation("{{ \"a'b`\" //comment}}", "{{ \"a'b`\" }}"); });
            });
        });
        describe('parseSimpleBinding', function () {
            it('should parse a field access', function () {
                var p = parseSimpleBinding('name');
                matchers_1.expect(unparser_1.unparse(p)).toEqual('name');
                validator_1.validate(p);
            });
            it('should parse a constant', function () {
                var p = parseSimpleBinding('[1, 2]');
                matchers_1.expect(unparser_1.unparse(p)).toEqual('[1, 2]');
                validator_1.validate(p);
            });
            it('should report when the given expression is not just a field name', function () {
                expectError(validator_1.validate(parseSimpleBinding('name + 1')), 'Host binding expression can only contain field access and constants');
            });
            it('should report when encountering interpolation', function () {
                expectError(validator_1.validate(parseSimpleBinding('{{exp}}')), 'Got interpolation ({{}}) where expression was expected');
            });
        });
        describe('wrapLiteralPrimitive', function () {
            it('should wrap a literal primitive', function () {
                matchers_1.expect(unparser_1.unparse(validator_1.validate(createParser().wrapLiteralPrimitive('foo', null))))
                    .toEqual('"foo"');
            });
        });
        describe('error recovery', function () {
            function recover(text, expected) {
                var expr = validator_1.validate(parseAction(text));
                matchers_1.expect(unparser_1.unparse(expr)).toEqual(expected || text);
            }
            it('should be able to recover from an extra paren', function () { return recover('((a)))', 'a'); });
            it('should be able to recover from an extra bracket', function () { return recover('[[a]]]', '[[a]]'); });
            it('should be able to recover from a missing )', function () { return recover('(a;b', 'a; b;'); });
            it('should be able to recover from a missing ]', function () { return recover('[a,b', '[a, b]'); });
            it('should be able to recover from a missing selector', function () { return recover('a.'); });
            it('should be able to recover from a missing selector in a array literal', function () { return recover('[[a.], b, c]'); });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2VyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3QvZXhwcmVzc2lvbl9wYXJzZXIvcGFyc2VyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILG9CQUE2Ryw2Q0FBNkMsQ0FBQyxDQUFBO0FBQzNKLHNCQUFvQiwrQ0FBK0MsQ0FBQyxDQUFBO0FBQ3BFLHVCQUFpRCxnREFBZ0QsQ0FBQyxDQUFBO0FBQ2xHLHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBRWxFLHFCQUFpQyx1QkFBdUIsQ0FBQyxDQUFBO0FBRXpELHlCQUFzQixZQUFZLENBQUMsQ0FBQTtBQUNuQywwQkFBdUIsYUFBYSxDQUFDLENBQUE7QUFFckM7SUFDRSwwQkFBMEIsTUFBTSxDQUFDLElBQUksZUFBTSxDQUFDLElBQUksYUFBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFM0QscUJBQXFCLElBQVksRUFBRSxRQUFvQjtRQUFwQix3QkFBb0IsR0FBcEIsZUFBb0I7UUFDckQsTUFBTSxDQUFDLFlBQVksRUFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELHNCQUFzQixJQUFZLEVBQUUsUUFBb0I7UUFBcEIsd0JBQW9CLEdBQXBCLGVBQW9CO1FBQ3RELE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFRCxxQ0FDSSxJQUFZLEVBQUUsUUFBb0I7UUFBcEIsd0JBQW9CLEdBQXBCLGVBQW9CO1FBQ3BDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUNELCtCQUErQixJQUFZLEVBQUUsUUFBb0I7UUFBcEIsd0JB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