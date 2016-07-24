/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var lexer_1 = require('@angular/compiler/src/expression_parser/lexer');
var parser_1 = require('@angular/compiler/src/expression_parser/parser');
var html_ast_1 = require('@angular/compiler/src/html_ast');
var html_parser_1 = require('@angular/compiler/src/html_parser');
var i18n_html_parser_1 = require('@angular/compiler/src/i18n/i18n_html_parser');
var message_1 = require('@angular/compiler/src/i18n/message');
var xmb_serializer_1 = require('@angular/compiler/src/i18n/xmb_serializer');
var interpolation_config_1 = require('@angular/compiler/src/interpolation_config');
var html_ast_spec_utils_1 = require('@angular/compiler/test/html_ast_spec_utils');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var collection_1 = require('../../src/facade/collection');
function main() {
    testing_internal_1.describe('I18nHtmlParser', function () {
        function parse(template, messages, implicitTags, implicitAttrs, interpolation) {
            if (implicitTags === void 0) { implicitTags = []; }
            if (implicitAttrs === void 0) { implicitAttrs = {}; }
            var htmlParser = new html_parser_1.HtmlParser();
            var msgs = '';
            collection_1.StringMapWrapper.forEach(messages, function (v, k) { return msgs += "<msg id=\"" + k + "\">" + v + "</msg>"; });
            var res = xmb_serializer_1.deserializeXmb("<message-bundle>" + msgs + "</message-bundle>", 'someUrl');
            var expParser = new parser_1.Parser(new lexer_1.Lexer());
            return new i18n_html_parser_1.I18nHtmlParser(htmlParser, expParser, res.content, res.messages, implicitTags, implicitAttrs)
                .parse(template, 'someurl', true, interpolation);
        }
        testing_internal_1.it('should delegate to the provided parser when no i18n', function () {
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse('<div>a</div>', {}))).toEqual([
                [html_ast_1.HtmlElementAst, 'div', 0], [html_ast_1.HtmlTextAst, 'a', 1]
            ]);
        });
        testing_internal_1.it('should replace attributes', function () {
            var translations = {};
            translations[message_1.id(new message_1.Message('some message', 'meaning', null))] = 'another message';
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse('<div value=\'some message\' i18n-value=\'meaning|comment\'></div>', translations)))
                .toEqual([[html_ast_1.HtmlElementAst, 'div', 0], [html_ast_1.HtmlAttrAst, 'value', 'another message']]);
        });
        testing_internal_1.it('should replace elements with the i18n attr', function () {
            var translations = {};
            translations[message_1.id(new message_1.Message('message', 'meaning', null))] = 'another message';
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse('<div i18n=\'meaning|desc\'>message</div>', translations))).toEqual([
                [html_ast_1.HtmlElementAst, 'div', 0], [html_ast_1.HtmlTextAst, 'another message', 1]
            ]);
        });
        testing_internal_1.it('should handle interpolation', function () {
            var translations = {};
            translations[message_1.id(new message_1.Message('<ph name="INTERPOLATION_0"/> and <ph name="INTERPOLATION_1"/>', null, null))] =
                '<ph name="INTERPOLATION_1"/> or <ph name="INTERPOLATION_0"/>';
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse('<div value=\'{{a}} and {{b}}\' i18n-value></div>', translations)))
                .toEqual([[html_ast_1.HtmlElementAst, 'div', 0], [html_ast_1.HtmlAttrAst, 'value', '{{b}} or {{a}}']]);
        });
        testing_internal_1.it('should handle interpolation with config', function () {
            var translations = {};
            translations[message_1.id(new message_1.Message('<ph name="INTERPOLATION_0"/> and <ph name="INTERPOLATION_1"/>', null, null))] =
                '<ph name="INTERPOLATION_1"/> or <ph name="INTERPOLATION_0"/>';
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse('<div value=\'{%a%} and {%b%}\' i18n-value></div>', translations, [], {}, interpolation_config_1.InterpolationConfig.fromArray(['{%', '%}']))))
                .toEqual([
                [html_ast_1.HtmlElementAst, 'div', 0],
                [html_ast_1.HtmlAttrAst, 'value', '{%b%} or {%a%}'],
            ]);
        });
        testing_internal_1.it('should handle interpolation with custom placeholder names', function () {
            var translations = {};
            translations[message_1.id(new message_1.Message('<ph name="FIRST"/> and <ph name="SECOND"/>', null, null))] =
                '<ph name="SECOND"/> or <ph name="FIRST"/>';
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse("<div value='{{a //i18n(ph=\"FIRST\")}} and {{b //i18n(ph=\"SECOND\")}}' i18n-value></div>", translations)))
                .toEqual([
                [html_ast_1.HtmlElementAst, 'div', 0],
                [html_ast_1.HtmlAttrAst, 'value', '{{b //i18n(ph="SECOND")}} or {{a //i18n(ph="FIRST")}}']
            ]);
        });
        testing_internal_1.it('should handle interpolation with duplicate placeholder names', function () {
            var translations = {};
            translations[message_1.id(new message_1.Message('<ph name="FIRST"/> and <ph name="FIRST_1"/>', null, null))] =
                '<ph name="FIRST_1"/> or <ph name="FIRST"/>';
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse("<div value='{{a //i18n(ph=\"FIRST\")}} and {{b //i18n(ph=\"FIRST\")}}' i18n-value></div>", translations)))
                .toEqual([
                [html_ast_1.HtmlElementAst, 'div', 0],
                [html_ast_1.HtmlAttrAst, 'value', '{{b //i18n(ph="FIRST")}} or {{a //i18n(ph="FIRST")}}']
            ]);
        });
        testing_internal_1.it('should handle nested html', function () {
            var translations = {};
            translations[message_1.id(new message_1.Message('<ph name="e0">a</ph><ph name="e2">b</ph>', null, null))] =
                '<ph name="e2">B</ph><ph name="e0">A</ph>';
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse('<div i18n><a>a</a><b>b</b></div>', translations))).toEqual([
                [html_ast_1.HtmlElementAst, 'div', 0],
                [html_ast_1.HtmlElementAst, 'b', 1],
                [html_ast_1.HtmlTextAst, 'B', 2],
                [html_ast_1.HtmlElementAst, 'a', 1],
                [html_ast_1.HtmlTextAst, 'A', 2],
            ]);
        });
        testing_internal_1.it('should support interpolation', function () {
            var translations = {};
            translations[message_1.id(new message_1.Message('<ph name="e0">a</ph><ph name="e2"><ph name="t3">b<ph name="INTERPOLATION_0"/></ph></ph>', null, null))] =
                '<ph name="e2"><ph name="t3"><ph name="INTERPOLATION_0"/>B</ph></ph><ph name="e0">A</ph>';
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse('<div i18n><a>a</a><b>b{{i}}</b></div>', translations))).toEqual([
                [html_ast_1.HtmlElementAst, 'div', 0],
                [html_ast_1.HtmlElementAst, 'b', 1],
                [html_ast_1.HtmlTextAst, '{{i}}B', 2],
                [html_ast_1.HtmlElementAst, 'a', 1],
                [html_ast_1.HtmlTextAst, 'A', 2],
            ]);
        });
        testing_internal_1.it('should i18n attributes of placeholder elements', function () {
            var translations = {};
            translations[message_1.id(new message_1.Message('<ph name="e0">a</ph>', null, null))] = '<ph name="e0">A</ph>';
            translations[message_1.id(new message_1.Message('b', null, null))] = 'B';
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse('<div i18n><a value="b" i18n-value>a</a></div>', translations)))
                .toEqual([
                [html_ast_1.HtmlElementAst, 'div', 0],
                [html_ast_1.HtmlElementAst, 'a', 1],
                [html_ast_1.HtmlAttrAst, 'value', 'B'],
                [html_ast_1.HtmlTextAst, 'A', 2],
            ]);
        });
        testing_internal_1.it('should preserve non-i18n attributes', function () {
            var translations = {};
            translations[message_1.id(new message_1.Message('message', null, null))] = 'another message';
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse('<div i18n value="b">message</div>', translations))).toEqual([
                [html_ast_1.HtmlElementAst, 'div', 0], [html_ast_1.HtmlAttrAst, 'value', 'b'],
                [html_ast_1.HtmlTextAst, 'another message', 1]
            ]);
        });
        testing_internal_1.it('should extract from partitions', function () {
            var translations = {};
            translations[message_1.id(new message_1.Message('message1', 'meaning1', null))] = 'another message1';
            translations[message_1.id(new message_1.Message('message2', 'meaning2', null))] = 'another message2';
            var res = parse("<!-- i18n: meaning1|desc1 -->message1<!-- /i18n --><!-- i18n: meaning2|desc2 -->message2<!-- /i18n -->", translations);
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(res)).toEqual([
                [html_ast_1.HtmlTextAst, 'another message1', 0],
                [html_ast_1.HtmlTextAst, 'another message2', 0],
            ]);
        });
        testing_internal_1.it('should preserve original positions', function () {
            var translations = {};
            translations[message_1.id(new message_1.Message('<ph name="e0">a</ph><ph name="e2">b</ph>', null, null))] =
                '<ph name="e2">B</ph><ph name="e0">A</ph>';
            var res = parse('<div i18n><a>a</a><b>b</b></div>', translations).rootNodes[0].children;
            testing_internal_1.expect(res[0].sourceSpan.start.offset).toEqual(18);
            testing_internal_1.expect(res[1].sourceSpan.start.offset).toEqual(10);
        });
        testing_internal_1.describe('errors', function () {
            testing_internal_1.it('should error when giving an invalid template', function () {
                testing_internal_1.expect(humanizeErrors(parse('<a>a</b>', {}).errors)).toEqual([
                    'Unexpected closing tag "b"'
                ]);
            });
            testing_internal_1.it('should error when no matching message (attr)', function () {
                var mid = message_1.id(new message_1.Message('some message', null, null));
                testing_internal_1.expect(humanizeErrors(parse('<div value=\'some message\' i18n-value></div>', {}).errors))
                    .toEqual([("Cannot find message for id '" + mid + "', content 'some message'.")]);
            });
            testing_internal_1.it('should error when no matching message (text)', function () {
                var mid = message_1.id(new message_1.Message('some message', null, null));
                testing_internal_1.expect(humanizeErrors(parse('<div i18n>some message</div>', {}).errors)).toEqual([
                    ("Cannot find message for id '" + mid + "', content 'some message'.")
                ]);
            });
            testing_internal_1.it('should error when a non-placeholder element appears in translation', function () {
                var translations = {};
                translations[message_1.id(new message_1.Message('some message', null, null))] = '<a>a</a>';
                testing_internal_1.expect(humanizeErrors(parse('<div i18n>some message</div>', translations).errors)).toEqual([
                    "Unexpected tag \"a\". Only \"ph\" tags are allowed."
                ]);
            });
            testing_internal_1.it('should error when a placeholder element does not have the name attribute', function () {
                var translations = {};
                translations[message_1.id(new message_1.Message('some message', null, null))] = '<ph>a</ph>';
                testing_internal_1.expect(humanizeErrors(parse('<div i18n>some message</div>', translations).errors)).toEqual([
                    "Missing \"name\" attribute."
                ]);
            });
            testing_internal_1.it('should error when the translation refers to an invalid expression', function () {
                var translations = {};
                translations[message_1.id(new message_1.Message('hi <ph name="INTERPOLATION_0"/>', null, null))] =
                    'hi <ph name="INTERPOLATION_99"/>';
                testing_internal_1.expect(humanizeErrors(parse('<div value=\'hi {{a}}\' i18n-value></div>', translations).errors))
                    .toEqual(['Invalid interpolation name \'INTERPOLATION_99\'']);
            });
        });
        testing_internal_1.describe('implicit translation', function () {
            testing_internal_1.it('should support attributes', function () {
                var translations = {};
                translations[message_1.id(new message_1.Message('some message', null, null))] = 'another message';
                testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse('<i18n-el value=\'some message\'></i18n-el>', translations, [], {
                    'i18n-el': ['value']
                }))).toEqual([[html_ast_1.HtmlElementAst, 'i18n-el', 0], [html_ast_1.HtmlAttrAst, 'value', 'another message']]);
            });
            testing_internal_1.it('should support attributes with meaning and description', function () {
                var translations = {};
                translations[message_1.id(new message_1.Message('some message', 'meaning', 'description'))] = 'another message';
                testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse('<i18n-el value=\'some message\' i18n-value=\'meaning|description\'></i18n-el>', translations, [], { 'i18n-el': ['value'] })))
                    .toEqual([[html_ast_1.HtmlElementAst, 'i18n-el', 0], [html_ast_1.HtmlAttrAst, 'value', 'another message']]);
            });
            testing_internal_1.it('should support elements', function () {
                var translations = {};
                translations[message_1.id(new message_1.Message('message', null, null))] = 'another message';
                testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse('<i18n-el>message</i18n-el>', translations, ['i18n-el'])))
                    .toEqual([[html_ast_1.HtmlElementAst, 'i18n-el', 0], [html_ast_1.HtmlTextAst, 'another message', 1]]);
            });
            testing_internal_1.it('should support elements with meaning and description', function () {
                var translations = {};
                translations[message_1.id(new message_1.Message('message', 'meaning', 'description'))] = 'another message';
                testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parse('<i18n-el i18n=\'meaning|description\'>message</i18n-el>', translations, ['i18n-el'])))
                    .toEqual([[html_ast_1.HtmlElementAst, 'i18n-el', 0], [html_ast_1.HtmlTextAst, 'another message', 1]]);
            });
        });
    });
}
exports.main = main;
function humanizeErrors(errors) {
    return errors.map(function (error) { return error.msg; });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9odG1sX3BhcnNlcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L2kxOG4vaTE4bl9odG1sX3BhcnNlcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxzQkFBdUMsK0NBQStDLENBQUMsQ0FBQTtBQUN2Rix1QkFBeUMsZ0RBQWdELENBQUMsQ0FBQTtBQUMxRix5QkFBdUQsZ0NBQWdDLENBQUMsQ0FBQTtBQUN4Riw0QkFBOEMsbUNBQW1DLENBQUMsQ0FBQTtBQUNsRixpQ0FBNkIsNkNBQTZDLENBQUMsQ0FBQTtBQUMzRSx3QkFBMEIsb0NBQW9DLENBQUMsQ0FBQTtBQUMvRCwrQkFBNkIsMkNBQTJDLENBQUMsQ0FBQTtBQUN6RSxxQ0FBa0MsNENBQTRDLENBQUMsQ0FBQTtBQUUvRSxvQ0FBMEIsNENBQTRDLENBQUMsQ0FBQTtBQUN2RSxpQ0FBbUQsd0NBQXdDLENBQUMsQ0FBQTtBQUU1RiwyQkFBK0IsNkJBQTZCLENBQUMsQ0FBQTtBQUU3RDtJQUNFLDJCQUFRLENBQUMsZ0JBQWdCLEVBQUU7UUFDekIsZUFDSSxRQUFnQixFQUFFLFFBQWlDLEVBQUUsWUFBMkIsRUFDaEYsYUFBMkMsRUFDM0MsYUFBbUM7WUFGa0IsNEJBQTJCLEdBQTNCLGlCQUEyQjtZQUNoRiw2QkFBMkMsR0FBM0Msa0JBQTJDO1lBRTdDLElBQUksVUFBVSxHQUFHLElBQUksd0JBQVUsRUFBRSxDQUFDO1lBRWxDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztZQUNkLDZCQUFnQixDQUFDLE9BQU8sQ0FDcEIsUUFBUSxFQUFFLFVBQUMsQ0FBUyxFQUFFLENBQVMsSUFBSyxPQUFBLElBQUksSUFBSSxlQUFZLENBQUMsV0FBSyxDQUFDLFdBQVEsRUFBbkMsQ0FBbUMsQ0FBQyxDQUFDO1lBQzdFLElBQUksR0FBRyxHQUFHLCtCQUFjLENB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