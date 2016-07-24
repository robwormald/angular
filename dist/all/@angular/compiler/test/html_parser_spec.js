/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var html_ast_1 = require('@angular/compiler/src/html_ast');
var html_lexer_1 = require('@angular/compiler/src/html_lexer');
var html_parser_1 = require('@angular/compiler/src/html_parser');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var html_ast_spec_utils_1 = require('./html_ast_spec_utils');
function main() {
    testing_internal_1.describe('HtmlParser', function () {
        var parser;
        testing_internal_1.beforeEach(function () { parser = new html_parser_1.HtmlParser(); });
        testing_internal_1.describe('parse', function () {
            testing_internal_1.describe('text nodes', function () {
                testing_internal_1.it('should parse root level text nodes', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('a', 'TestComp'))).toEqual([[html_ast_1.HtmlTextAst, 'a', 0]]);
                });
                testing_internal_1.it('should parse text nodes inside regular elements', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<div>a</div>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, 'div', 0], [html_ast_1.HtmlTextAst, 'a', 1]
                    ]);
                });
                testing_internal_1.it('should parse text nodes inside template elements', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<template>a</template>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, 'template', 0], [html_ast_1.HtmlTextAst, 'a', 1]
                    ]);
                });
                testing_internal_1.it('should parse CDATA', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<![CDATA[text]]>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlTextAst, 'text', 0]
                    ]);
                });
            });
            testing_internal_1.describe('elements', function () {
                testing_internal_1.it('should parse root level elements', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<div></div>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, 'div', 0]
                    ]);
                });
                testing_internal_1.it('should parse elements inside of regular elements', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<div><span></span></div>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, 'div', 0], [html_ast_1.HtmlElementAst, 'span', 1]
                    ]);
                });
                testing_internal_1.it('should parse elements inside of template elements', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<template><span></span></template>', 'TestComp')))
                        .toEqual([[html_ast_1.HtmlElementAst, 'template', 0], [html_ast_1.HtmlElementAst, 'span', 1]]);
                });
                testing_internal_1.it('should support void elements', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<link rel="author license" href="/about">', 'TestComp')))
                        .toEqual([
                        [html_ast_1.HtmlElementAst, 'link', 0],
                        [html_ast_1.HtmlAttrAst, 'rel', 'author license'],
                        [html_ast_1.HtmlAttrAst, 'href', '/about'],
                    ]);
                });
                testing_internal_1.it('should not error on void elements from HTML5 spec', function () {
                    // <base> - it can be present in head only
                    // <meta> - it can be present in head only
                    // <command> - obsolete
                    // <keygen> - obsolete
                    ['<map><area></map>', '<div><br></div>', '<colgroup><col></colgroup>',
                        '<div><embed></div>', '<div><hr></div>', '<div><img></div>', '<div><input></div>',
                        '<object><param>/<object>', '<audio><source></audio>', '<audio><track></audio>',
                        '<p><wbr></p>',
                    ].forEach(function (html) { testing_internal_1.expect(parser.parse(html, 'TestComp').errors).toEqual([]); });
                });
                testing_internal_1.it('should close void elements on text nodes', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<p>before<br>after</p>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, 'p', 0],
                        [html_ast_1.HtmlTextAst, 'before', 1],
                        [html_ast_1.HtmlElementAst, 'br', 1],
                        [html_ast_1.HtmlTextAst, 'after', 1],
                    ]);
                });
                testing_internal_1.it('should support optional end tags', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<div><p>1<p>2</div>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, 'div', 0],
                        [html_ast_1.HtmlElementAst, 'p', 1],
                        [html_ast_1.HtmlTextAst, '1', 2],
                        [html_ast_1.HtmlElementAst, 'p', 1],
                        [html_ast_1.HtmlTextAst, '2', 2],
                    ]);
                });
                testing_internal_1.it('should support nested elements', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<ul><li><ul><li></li></ul></li></ul>', 'TestComp')))
                        .toEqual([
                        [html_ast_1.HtmlElementAst, 'ul', 0],
                        [html_ast_1.HtmlElementAst, 'li', 1],
                        [html_ast_1.HtmlElementAst, 'ul', 2],
                        [html_ast_1.HtmlElementAst, 'li', 3],
                    ]);
                });
                testing_internal_1.it('should add the requiredParent', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<table><thead><tr head></tr></thead><tr noparent></tr><tbody><tr body></tr></tbody><tfoot><tr foot></tr></tfoot></table>', 'TestComp')))
                        .toEqual([
                        [html_ast_1.HtmlElementAst, 'table', 0],
                        [html_ast_1.HtmlElementAst, 'thead', 1],
                        [html_ast_1.HtmlElementAst, 'tr', 2],
                        [html_ast_1.HtmlAttrAst, 'head', ''],
                        [html_ast_1.HtmlElementAst, 'tbody', 1],
                        [html_ast_1.HtmlElementAst, 'tr', 2],
                        [html_ast_1.HtmlAttrAst, 'noparent', ''],
                        [html_ast_1.HtmlElementAst, 'tbody', 1],
                        [html_ast_1.HtmlElementAst, 'tr', 2],
                        [html_ast_1.HtmlAttrAst, 'body', ''],
                        [html_ast_1.HtmlElementAst, 'tfoot', 1],
                        [html_ast_1.HtmlElementAst, 'tr', 2],
                        [html_ast_1.HtmlAttrAst, 'foot', ''],
                    ]);
                });
                testing_internal_1.it('should append the required parent considering ng-container', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<table><ng-container><tr></tr></ng-container></table>', 'TestComp')))
                        .toEqual([
                        [html_ast_1.HtmlElementAst, 'table', 0],
                        [html_ast_1.HtmlElementAst, 'tbody', 1],
                        [html_ast_1.HtmlElementAst, 'ng-container', 2],
                        [html_ast_1.HtmlElementAst, 'tr', 3],
                    ]);
                });
                testing_internal_1.it('should special case ng-container when adding a required parent', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<table><thead><ng-container><tr></tr></ng-container></thead></table>', 'TestComp')))
                        .toEqual([
                        [html_ast_1.HtmlElementAst, 'table', 0],
                        [html_ast_1.HtmlElementAst, 'thead', 1],
                        [html_ast_1.HtmlElementAst, 'ng-container', 2],
                        [html_ast_1.HtmlElementAst, 'tr', 3],
                    ]);
                });
                testing_internal_1.it('should not add the requiredParent when the parent is a template', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<template><tr></tr></template>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, 'template', 0],
                        [html_ast_1.HtmlElementAst, 'tr', 1],
                    ]);
                });
                // https://github.com/angular/angular/issues/5967
                testing_internal_1.it('should not add the requiredParent to a template root element', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<tr></tr>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, 'tr', 0],
                    ]);
                });
                testing_internal_1.it('should support explicit mamespace', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<myns:div></myns:div>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, ':myns:div', 0]
                    ]);
                });
                testing_internal_1.it('should support implicit mamespace', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<svg></svg>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, ':svg:svg', 0]
                    ]);
                });
                testing_internal_1.it('should propagate the namespace', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<myns:div><p></p></myns:div>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, ':myns:div', 0], [html_ast_1.HtmlElementAst, ':myns:p', 1]
                    ]);
                });
                testing_internal_1.it('should match closing tags case sensitive', function () {
                    var errors = parser.parse('<DiV><P></p></dIv>', 'TestComp').errors;
                    testing_internal_1.expect(errors.length).toEqual(2);
                    testing_internal_1.expect(humanizeErrors(errors)).toEqual([
                        ['p', 'Unexpected closing tag "p"', '0:8'],
                        ['dIv', 'Unexpected closing tag "dIv"', '0:12'],
                    ]);
                });
                testing_internal_1.it('should support self closing void elements', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<input />', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, 'input', 0]
                    ]);
                });
                testing_internal_1.it('should support self closing foreign elements', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<math />', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, ':math:math', 0]
                    ]);
                });
                testing_internal_1.it('should ignore LF immediately after textarea, pre and listing', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<p>\n</p><textarea>\n</textarea><pre>\n\n</pre><listing>\n\n</listing>', 'TestComp')))
                        .toEqual([
                        [html_ast_1.HtmlElementAst, 'p', 0],
                        [html_ast_1.HtmlTextAst, '\n', 1],
                        [html_ast_1.HtmlElementAst, 'textarea', 0],
                        [html_ast_1.HtmlElementAst, 'pre', 0],
                        [html_ast_1.HtmlTextAst, '\n', 1],
                        [html_ast_1.HtmlElementAst, 'listing', 0],
                        [html_ast_1.HtmlTextAst, '\n', 1],
                    ]);
                });
            });
            testing_internal_1.describe('attributes', function () {
                testing_internal_1.it('should parse attributes on regular elements case sensitive', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<div kEy="v" key2=v2></div>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, 'div', 0],
                        [html_ast_1.HtmlAttrAst, 'kEy', 'v'],
                        [html_ast_1.HtmlAttrAst, 'key2', 'v2'],
                    ]);
                });
                testing_internal_1.it('should parse attributes without values', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<div k></div>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, 'div', 0], [html_ast_1.HtmlAttrAst, 'k', '']
                    ]);
                });
                testing_internal_1.it('should parse attributes on svg elements case sensitive', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<svg viewBox="0"></svg>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, ':svg:svg', 0], [html_ast_1.HtmlAttrAst, 'viewBox', '0']
                    ]);
                });
                testing_internal_1.it('should parse attributes on template elements', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<template k="v"></template>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, 'template', 0], [html_ast_1.HtmlAttrAst, 'k', 'v']
                    ]);
                });
                testing_internal_1.it('should support namespace', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<svg:use xlink:href="Port" />', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlElementAst, ':svg:use', 0], [html_ast_1.HtmlAttrAst, ':xlink:href', 'Port']
                    ]);
                });
            });
            testing_internal_1.describe('comments', function () {
                testing_internal_1.it('should preserve comments', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parser.parse('<!-- comment --><div></div>', 'TestComp'))).toEqual([
                        [html_ast_1.HtmlCommentAst, 'comment', 0], [html_ast_1.HtmlElementAst, 'div', 0]
                    ]);
                });
            });
            testing_internal_1.describe('expansion forms', function () {
                testing_internal_1.it('should parse out expansion forms', function () {
                    var parsed = parser.parse("<div>before{messages.length, plural, =0 {You have <b>no</b> messages} =1 {One {{message}}}}after</div>", 'TestComp', true);
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parsed)).toEqual([
                        [html_ast_1.HtmlElementAst, 'div', 0],
                        [html_ast_1.HtmlTextAst, 'before', 1],
                        [html_ast_1.HtmlExpansionAst, 'messages.length', 'plural', 1],
                        [html_ast_1.HtmlExpansionCaseAst, '=0', 2],
                        [html_ast_1.HtmlExpansionCaseAst, '=1', 2],
                        [html_ast_1.HtmlTextAst, 'after', 1],
                    ]);
                    var cases = parsed.rootNodes[0].children[1].cases;
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(new html_parser_1.HtmlParseTreeResult(cases[0].expression, []))).toEqual([
                        [html_ast_1.HtmlTextAst, 'You have ', 0],
                        [html_ast_1.HtmlElementAst, 'b', 0],
                        [html_ast_1.HtmlTextAst, 'no', 1],
                        [html_ast_1.HtmlTextAst, ' messages', 0],
                    ]);
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(new html_parser_1.HtmlParseTreeResult(cases[1].expression, []))).toEqual([[html_ast_1.HtmlTextAst, 'One {{message}}', 0]]);
                });
                testing_internal_1.it('should parse out nested expansion forms', function () {
                    var parsed = parser.parse("{messages.length, plural, =0 { {p.gender, gender, =m {m}} }}", 'TestComp', true);
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(parsed)).toEqual([
                        [html_ast_1.HtmlExpansionAst, 'messages.length', 'plural', 0],
                        [html_ast_1.HtmlExpansionCaseAst, '=0', 1],
                    ]);
                    var firstCase = parsed.rootNodes[0].cases[0];
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDom(new html_parser_1.HtmlParseTreeResult(firstCase.expression, []))).toEqual([
                        [html_ast_1.HtmlExpansionAst, 'p.gender', 'gender', 0],
                        [html_ast_1.HtmlExpansionCaseAst, '=m', 1],
                        [html_ast_1.HtmlTextAst, ' ', 0],
                    ]);
                });
                testing_internal_1.it('should error when expansion form is not closed', function () {
                    var p = parser.parse("{messages.length, plural, =0 {one}", 'TestComp', true);
                    testing_internal_1.expect(humanizeErrors(p.errors)).toEqual([
                        [null, 'Invalid expansion form. Missing \'}\'.', '0:34']
                    ]);
                });
                testing_internal_1.it('should error when expansion case is not closed', function () {
                    var p = parser.parse("{messages.length, plural, =0 {one", 'TestComp', true);
                    testing_internal_1.expect(humanizeErrors(p.errors)).toEqual([
                        [null, 'Invalid expansion form. Missing \'}\'.', '0:29']
                    ]);
                });
                testing_internal_1.it('should error when invalid html in the case', function () {
                    var p = parser.parse("{messages.length, plural, =0 {<b/>}", 'TestComp', true);
                    testing_internal_1.expect(humanizeErrors(p.errors)).toEqual([
                        ['b', 'Only void and foreign elements can be self closed "b"', '0:30']
                    ]);
                });
            });
            testing_internal_1.describe('source spans', function () {
                testing_internal_1.it('should store the location', function () {
                    testing_internal_1.expect(html_ast_spec_utils_1.humanizeDomSourceSpans(parser.parse('<div [prop]="v1" (e)="do()" attr="v2" noValue>\na\n</div>', 'TestComp')))
                        .toEqual([
                        [html_ast_1.HtmlElementAst, 'div', 0, '<div [prop]="v1" (e)="do()" attr="v2" noValue>'],
                        [html_ast_1.HtmlAttrAst, '[prop]', 'v1', '[prop]="v1"'],
                        [html_ast_1.HtmlAttrAst, '(e)', 'do()', '(e)="do()"'],
                        [html_ast_1.HtmlAttrAst, 'attr', 'v2', 'attr="v2"'],
                        [html_ast_1.HtmlAttrAst, 'noValue', '', 'noValue'],
                        [html_ast_1.HtmlTextAst, '\na\n', 1, '\na\n'],
                    ]);
                });
                testing_internal_1.it('should set the start and end source spans', function () {
                    var node = parser.parse('<div>a</div>', 'TestComp').rootNodes[0];
                    testing_internal_1.expect(node.startSourceSpan.start.offset).toEqual(0);
                    testing_internal_1.expect(node.startSourceSpan.end.offset).toEqual(5);
                    testing_internal_1.expect(node.endSourceSpan.start.offset).toEqual(6);
                    testing_internal_1.expect(node.endSourceSpan.end.offset).toEqual(12);
                });
            });
            testing_internal_1.describe('errors', function () {
                testing_internal_1.it('should report unexpected closing tags', function () {
                    var errors = parser.parse('<div></p></div>', 'TestComp').errors;
                    testing_internal_1.expect(errors.length).toEqual(1);
                    testing_internal_1.expect(humanizeErrors(errors)).toEqual([['p', 'Unexpected closing tag "p"', '0:5']]);
                });
                testing_internal_1.it('should report subsequent open tags without proper close tag', function () {
                    var errors = parser.parse('<div</div>', 'TestComp').errors;
                    testing_internal_1.expect(errors.length).toEqual(1);
                    testing_internal_1.expect(humanizeErrors(errors)).toEqual([['div', 'Unexpected closing tag "div"', '0:4']]);
                });
                testing_internal_1.it('should report closing tag for void elements', function () {
                    var errors = parser.parse('<input></input>', 'TestComp').errors;
                    testing_internal_1.expect(errors.length).toEqual(1);
                    testing_internal_1.expect(humanizeErrors(errors)).toEqual([
                        ['input', 'Void elements do not have end tags "input"', '0:7']
                    ]);
                });
                testing_internal_1.it('should report self closing html element', function () {
                    var errors = parser.parse('<p />', 'TestComp').errors;
                    testing_internal_1.expect(errors.length).toEqual(1);
                    testing_internal_1.expect(humanizeErrors(errors)).toEqual([
                        ['p', 'Only void and foreign elements can be self closed "p"', '0:0']
                    ]);
                });
                testing_internal_1.it('should report self closing custom element', function () {
                    var errors = parser.parse('<my-cmp />', 'TestComp').errors;
                    testing_internal_1.expect(errors.length).toEqual(1);
                    testing_internal_1.expect(humanizeErrors(errors)).toEqual([
                        ['my-cmp', 'Only void and foreign elements can be self closed "my-cmp"', '0:0']
                    ]);
                });
                testing_internal_1.it('should also report lexer errors', function () {
                    var errors = parser.parse('<!-err--><div></p></div>', 'TestComp').errors;
                    testing_internal_1.expect(errors.length).toEqual(2);
                    testing_internal_1.expect(humanizeErrors(errors)).toEqual([
                        [html_lexer_1.HtmlTokenType.COMMENT_START, 'Unexpected character "e"', '0:3'],
                        ['p', 'Unexpected closing tag "p"', '0:14']
                    ]);
                });
            });
        });
    });
}
exports.main = main;
function humanizeErrors(errors) {
    return errors.map(function (e) {
        if (e instanceof html_parser_1.HtmlTreeError) {
            // Parser errors
            return [e.elementName, e.msg, html_ast_spec_utils_1.humanizeLineColumn(e.span.start)];
        }
        // Tokenizer errors
        return [e.tokenType, e.msg, html_ast_spec_utils_1.humanizeLineColumn(e.span.start)];
    });
}
exports.humanizeErrors = humanizeErrors;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbF9wYXJzZXJfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdC9odG1sX3BhcnNlcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBK0csZ0NBQWdDLENBQUMsQ0FBQTtBQUNoSiwyQkFBNEIsa0NBQWtDLENBQUMsQ0FBQTtBQUMvRCw0QkFBNkQsbUNBQW1DLENBQUMsQ0FBQTtBQUVqRyxpQ0FBK0Usd0NBQXdDLENBQUMsQ0FBQTtBQUV4SCxvQ0FBc0UsdUJBQXVCLENBQUMsQ0FBQTtBQUU5RjtJQUNFLDJCQUFRLENBQUMsWUFBWSxFQUFFO1FBQ3JCLElBQUksTUFBa0IsQ0FBQztRQUV2Qiw2QkFBVSxDQUFDLGNBQVEsTUFBTSxHQUFHLElBQUksd0JBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakQsMkJBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDaEIsMkJBQVEsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JCLHFCQUFFLENBQUMsb0NBQW9DLEVBQUU7b0JBQ3ZDLHlCQUFNLENBQUMsaUNBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxzQkFBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RGLENBQUMsQ0FBQyxDQUFDO2dCQUVILHFCQUFFLENBQUMsaURBQWlELEVBQUU7b0JBQ3BELHlCQUFNLENBQUMsaUNBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO3dCQUNwRSxDQUFDLHlCQUFjLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsc0JBQVcsRUFBRSxHQUFH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