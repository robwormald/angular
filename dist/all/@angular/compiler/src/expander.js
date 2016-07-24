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
var html_ast_1 = require('./html_ast');
var parse_util_1 = require('./parse_util');
// http://cldr.unicode.org/index/cldr-spec/plural-rules
var PLURAL_CASES = ['zero', 'one', 'two', 'few', 'many', 'other'];
/**
 * Expands special forms into elements.
 *
 * For example,
 *
 * ```
 * { messages.length, plural,
 *   =0 {zero}
 *   =1 {one}
 *   other {more than one}
 * }
 * ```
 *
 * will be expanded into
 *
 * ```
 * <ng-container [ngPlural]="messages.length">
 *   <template ngPluralCase="=0">zero</ng-container>
 *   <template ngPluralCase="=1">one</ng-container>
 *   <template ngPluralCase="other">more than one</ng-container>
 * </ng-container>
 * ```
 */
function expandNodes(nodes) {
    var expander = new _Expander();
    return new ExpansionResult(html_ast_1.htmlVisitAll(expander, nodes), expander.isExpanded, expander.errors);
}
exports.expandNodes = expandNodes;
var ExpansionResult = (function () {
    function ExpansionResult(nodes, expanded, errors) {
        this.nodes = nodes;
        this.expanded = expanded;
        this.errors = errors;
    }
    return ExpansionResult;
}());
exports.ExpansionResult = ExpansionResult;
var ExpansionError = (function (_super) {
    __extends(ExpansionError, _super);
    function ExpansionError(span, errorMsg) {
        _super.call(this, span, errorMsg);
    }
    return ExpansionError;
}(parse_util_1.ParseError));
exports.ExpansionError = ExpansionError;
/**
 * Expand expansion forms (plural, select) to directives
 *
 * @internal
 */
var _Expander = (function () {
    function _Expander() {
        this.isExpanded = false;
        this.errors = [];
    }
    _Expander.prototype.visitElement = function (ast, context) {
        return new html_ast_1.HtmlElementAst(ast.name, ast.attrs, html_ast_1.htmlVisitAll(this, ast.children), ast.sourceSpan, ast.startSourceSpan, ast.endSourceSpan);
    };
    _Expander.prototype.visitAttr = function (ast, context) { return ast; };
    _Expander.prototype.visitText = function (ast, context) { return ast; };
    _Expander.prototype.visitComment = function (ast, context) { return ast; };
    _Expander.prototype.visitExpansion = function (ast, context) {
        this.isExpanded = true;
        return ast.type == 'plural' ? _expandPluralForm(ast, this.errors) :
            _expandDefaultForm(ast, this.errors);
    };
    _Expander.prototype.visitExpansionCase = function (ast, context) {
        throw new Error('Should not be reached');
    };
    return _Expander;
}());
function _expandPluralForm(ast, errors) {
    var children = ast.cases.map(function (c) {
        if (PLURAL_CASES.indexOf(c.value) == -1 && !c.value.match(/^=\d+$/)) {
            errors.push(new ExpansionError(c.valueSourceSpan, "Plural cases should be \"=<number>\" or one of " + PLURAL_CASES.join(", ")));
        }
        var expansionResult = expandNodes(c.expression);
        errors.push.apply(errors, expansionResult.errors);
        return new html_ast_1.HtmlElementAst("template", [new html_ast_1.HtmlAttrAst('ngPluralCase', "" + c.value, c.valueSourceSpan)], expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan);
    });
    var switchAttr = new html_ast_1.HtmlAttrAst('[ngPlural]', ast.switchValue, ast.switchValueSourceSpan);
    return new html_ast_1.HtmlElementAst('ng-container', [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
}
function _expandDefaultForm(ast, errors) {
    var children = ast.cases.map(function (c) {
        var expansionResult = expandNodes(c.expression);
        errors.push.apply(errors, expansionResult.errors);
        return new html_ast_1.HtmlElementAst("template", [new html_ast_1.HtmlAttrAst('ngSwitchCase', "" + c.value, c.valueSourceSpan)], expansionResult.nodes, c.sourceSpan, c.sourceSpan, c.sourceSpan);
    });
    var switchAttr = new html_ast_1.HtmlAttrAst('[ngSwitch]', ast.switchValue, ast.switchValueSourceSpan);
    return new html_ast_1.HtmlElementAst('ng-container', [switchAttr], children, ast.sourceSpan, ast.sourceSpan, ast.sourceSpan);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9leHBhbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCx5QkFBc0osWUFBWSxDQUFDLENBQUE7QUFDbkssMkJBQTBDLGNBQWMsQ0FBQyxDQUFBO0FBRXpELHVEQUF1RDtBQUN2RCxJQUFNLFlBQVksR0FBYSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFFOUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFDSCxxQkFBNEIsS0FBZ0I7SUFDMUMsSUFBTSxRQUFRLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztJQUNqQyxNQUFNLENBQUMsSUFBSSxlQUFlLENBQUMsdUJBQVksQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUUsUUFBUSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbEcsQ0FBQztBQUhlLG1CQUFXLGNBRzFCLENBQUE7QUFFRDtJQUNFLHlCQUFtQixLQUFnQixFQUFTLFFBQWlCLEVBQVMsTUFBb0I7UUFBdkUsVUFBSyxHQUFMLEtBQUssQ0FBVztRQUFTLGFBQVEsR0FBUixRQUFRLENBQVM7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUFjO0lBQUcsQ0FBQztJQUNoRyxzQkFBQztBQUFELENBQUMsQUFGRCxJQUVDO0FBRlksdUJBQWUsa0JBRTNCLENBQUE7QUFFRDtJQUFvQyxrQ0FBVTtJQUM1Qyx3QkFBWSxJQUFxQixFQUFFLFFBQWdCO1FBQUksa0JBQU0sSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQUMsQ0FBQztJQUNqRixxQkFBQztBQUFELENBQUMsQUFGRCxDQUFvQyx1QkFBVSxHQUU3QztBQUZZLHNCQUFjLGlCQUUx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