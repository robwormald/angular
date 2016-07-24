/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('../../core/testing/testing_internal');
var expander_1 = require('../src/expander');
var html_ast_1 = require('../src/html_ast');
var html_parser_1 = require('../src/html_parser');
var html_ast_spec_utils_1 = require('./html_ast_spec_utils');
function main() {
    testing_internal_1.describe('Expander', function () {
        function expand(template) {
            var htmlParser = new html_parser_1.HtmlParser();
            var res = htmlParser.parse(template, 'url', true);
            return expander_1.expandNodes(res.rootNodes);
        }
        testing_internal_1.it('should handle the plural expansion form', function () {
            var res = expand("{messages.length, plural,=0 {zero<b>bold</b>}}");
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeNodes(res.nodes)).toEqual([
                [html_ast_1.HtmlElementAst, 'ng-container', 0],
                [html_ast_1.HtmlAttrAst, '[ngPlural]', 'messages.length'],
                [html_ast_1.HtmlElementAst, 'template', 1],
                [html_ast_1.HtmlAttrAst, 'ngPluralCase', '=0'],
                [html_ast_1.HtmlTextAst, 'zero', 2],
                [html_ast_1.HtmlElementAst, 'b', 2],
                [html_ast_1.HtmlTextAst, 'bold', 3],
            ]);
        });
        testing_internal_1.it('should handle nested expansion forms', function () {
            var res = expand("{messages.length, plural, =0 { {p.gender, gender, =m {m}} }}");
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeNodes(res.nodes)).toEqual([
                [html_ast_1.HtmlElementAst, 'ng-container', 0],
                [html_ast_1.HtmlAttrAst, '[ngPlural]', 'messages.length'],
                [html_ast_1.HtmlElementAst, 'template', 1],
                [html_ast_1.HtmlAttrAst, 'ngPluralCase', '=0'],
                [html_ast_1.HtmlElementAst, 'ng-container', 2],
                [html_ast_1.HtmlAttrAst, '[ngSwitch]', 'p.gender'],
                [html_ast_1.HtmlElementAst, 'template', 3],
                [html_ast_1.HtmlAttrAst, 'ngSwitchCase', '=m'],
                [html_ast_1.HtmlTextAst, 'm', 4],
                [html_ast_1.HtmlTextAst, ' ', 2],
            ]);
        });
        testing_internal_1.it('should correctly set source code positions', function () {
            var nodes = expand("{messages.length, plural,=0 {<b>bold</b>}}").nodes;
            var container = nodes[0];
            testing_internal_1.expect(container.sourceSpan.start.col).toEqual(0);
            testing_internal_1.expect(container.sourceSpan.end.col).toEqual(42);
            testing_internal_1.expect(container.startSourceSpan.start.col).toEqual(0);
            testing_internal_1.expect(container.startSourceSpan.end.col).toEqual(42);
            testing_internal_1.expect(container.endSourceSpan.start.col).toEqual(0);
            testing_internal_1.expect(container.endSourceSpan.end.col).toEqual(42);
            var switchExp = container.attrs[0];
            testing_internal_1.expect(switchExp.sourceSpan.start.col).toEqual(1);
            testing_internal_1.expect(switchExp.sourceSpan.end.col).toEqual(16);
            var template = container.children[0];
            testing_internal_1.expect(template.sourceSpan.start.col).toEqual(25);
            testing_internal_1.expect(template.sourceSpan.end.col).toEqual(41);
            var switchCheck = template.attrs[0];
            testing_internal_1.expect(switchCheck.sourceSpan.start.col).toEqual(25);
            testing_internal_1.expect(switchCheck.sourceSpan.end.col).toEqual(28);
            var b = template.children[0];
            testing_internal_1.expect(b.sourceSpan.start.col).toEqual(29);
            testing_internal_1.expect(b.endSourceSpan.end.col).toEqual(40);
        });
        testing_internal_1.it('should handle other special forms', function () {
            var res = expand("{person.gender, gender,=male {m}}");
            testing_internal_1.expect(html_ast_spec_utils_1.humanizeNodes(res.nodes)).toEqual([
                [html_ast_1.HtmlElementAst, 'ng-container', 0],
                [html_ast_1.HtmlAttrAst, '[ngSwitch]', 'person.gender'],
                [html_ast_1.HtmlElementAst, 'template', 1],
                [html_ast_1.HtmlAttrAst, 'ngSwitchCase', '=male'],
                [html_ast_1.HtmlTextAst, 'm', 2],
            ]);
        });
        testing_internal_1.describe('errors', function () {
            testing_internal_1.it('should error on unknown plural cases', function () {
                testing_internal_1.expect(humanizeErrors(expand('{n, plural, unknown {-}}').errors)).toEqual([
                    "Plural cases should be \"=<number>\" or one of zero, one, two, few, many, other",
                ]);
            });
        });
    });
}
exports.main = main;
function humanizeErrors(errors) {
    return errors.map(function (error) { return error.msg; });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kZXJfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdC9leHBhbmRlcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBbUQscUNBQXFDLENBQUMsQ0FBQTtBQUN6Rix5QkFBMkMsaUJBQWlCLENBQUMsQ0FBQTtBQUM3RCx5QkFBdUQsaUJBQWlCLENBQUMsQ0FBQTtBQUN6RSw0QkFBeUIsb0JBQW9CLENBQUMsQ0FBQTtBQUc5QyxvQ0FBNEIsdUJBQXVCLENBQUMsQ0FBQTtBQUVwRDtJQUNFLDJCQUFRLENBQUMsVUFBVSxFQUFFO1FBQ25CLGdCQUFnQixRQUFnQjtZQUM5QixJQUFNLFVBQVUsR0FBRyxJQUFJLHdCQUFVLEVBQUUsQ0FBQztZQUNwQyxJQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLHNCQUFXLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRCxxQkFBRSxDQUFDLHlDQUF5QyxFQUFFO1lBQzVDLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxnREFBZ0QsQ0FBQyxDQUFDO1lBRXJFLHlCQUFNLENBQUMsbUNBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3ZDLENBQUMseUJBQWMsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLHNCQUFXLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixDQUFDO2dCQUM5QyxDQUFDLHlCQUFjLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDL0IsQ0FBQyxzQkFBVyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUM7Z0JBQ25DLENBQUMsc0JBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2dCQUN4QixDQUFDLHlCQUFjLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDeEIsQ0FBQyxzQkFBVyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDekIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLHNDQUFzQyxFQUFFO1lBQ3pDLElBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1lBRW5GLHlCQUFNLENBQUMsbUNBQWEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQ3ZDLENBQUMseUJBQWMsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLHNCQUFXLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixDQUFDO2dCQUM5QyxDQUFDLHlCQUFjLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDL0IsQ0FBQyxzQkFBVyxFQUFFLGNBQWMsRUFBRSxJQUFJLENBQUM7Z0JBQ25DLENBQUMseUJBQWMsRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLHNCQUFXLEVBQUUsWUFBWSxFQUFFLFVBQVUsQ0FBQztnQkFDdkMsQ0FBQyx5QkFBYyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQy9CLENBQUMsc0JBQVcsRUFBRSxjQUFjLEVBQUUsSUFBSSxDQUFDO2dCQUNuQyxDQUFDLHNCQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztnQkFDckIsQ0FBQyxzQkFBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7YUFDdEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLDRDQUE0QyxFQUFFO1lBQy9DLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUV6RSxJQUFNLFNBQVMsR0FBbUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNELHlCQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xELHlCQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2pELHlCQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELHlCQUFNLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELHlCQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JELHlCQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXBELElBQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckMseUJBQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEQseUJBQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFakQsSUFBTSxRQUFRLEdBQW1DLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkUseUJBQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDbEQseUJBQU0sQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFaEQsSUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0Qyx5QkFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNyRCx5QkFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUVuRCxJQUFNLENBQUMsR0FBbUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMvRCx5QkFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMzQyx5QkFBTSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsbUNBQW1DLEVBQUU7WUFDdEMsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLG1DQUFtQyxDQUFDLENBQUM7WUFFeEQseUJBQU0sQ0FBQyxtQ0FBYSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDdkMsQ0FBQyx5QkFBYyxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUM7Z0JBQ25DLENBQUMsc0JBQVcsRUFBRSxZQUFZLEVBQUUsZUFBZSxDQUFDO2dCQUM1QyxDQUFDLHlCQUFjLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDL0IsQ0FBQyxzQkFBVyxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUM7Z0JBQ3RDLENBQUMsc0JBQVcsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO2FBQ3RCLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsMkJBQVEsQ0FBQyxRQUFRLEVBQUU7WUFDakIscUJBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtnQkFDekMseUJBQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7b0JBQ3hFLGlGQUErRTtpQkFDaEYsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXZGZSxZQUFJLE9BdUZuQixDQUFBO0FBRUQsd0JBQXdCLE1BQW9CO0lBQzFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsS0FBSyxDQUFDLEdBQUcsRUFBVCxDQUFTLENBQUMsQ0FBQztBQUN4QyxDQUFDIn0=