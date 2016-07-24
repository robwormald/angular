/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var lang_1 = require('../src/facade/lang');
var HtmlTextAst = (function () {
    function HtmlTextAst(value, sourceSpan) {
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    HtmlTextAst.prototype.visit = function (visitor, context) { return visitor.visitText(this, context); };
    return HtmlTextAst;
}());
exports.HtmlTextAst = HtmlTextAst;
var HtmlExpansionAst = (function () {
    function HtmlExpansionAst(switchValue, type, cases, sourceSpan, switchValueSourceSpan) {
        this.switchValue = switchValue;
        this.type = type;
        this.cases = cases;
        this.sourceSpan = sourceSpan;
        this.switchValueSourceSpan = switchValueSourceSpan;
    }
    HtmlExpansionAst.prototype.visit = function (visitor, context) {
        return visitor.visitExpansion(this, context);
    };
    return HtmlExpansionAst;
}());
exports.HtmlExpansionAst = HtmlExpansionAst;
var HtmlExpansionCaseAst = (function () {
    function HtmlExpansionCaseAst(value, expression, sourceSpan, valueSourceSpan, expSourceSpan) {
        this.value = value;
        this.expression = expression;
        this.sourceSpan = sourceSpan;
        this.valueSourceSpan = valueSourceSpan;
        this.expSourceSpan = expSourceSpan;
    }
    HtmlExpansionCaseAst.prototype.visit = function (visitor, context) {
        return visitor.visitExpansionCase(this, context);
    };
    return HtmlExpansionCaseAst;
}());
exports.HtmlExpansionCaseAst = HtmlExpansionCaseAst;
var HtmlAttrAst = (function () {
    function HtmlAttrAst(name, value, sourceSpan) {
        this.name = name;
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    HtmlAttrAst.prototype.visit = function (visitor, context) { return visitor.visitAttr(this, context); };
    return HtmlAttrAst;
}());
exports.HtmlAttrAst = HtmlAttrAst;
var HtmlElementAst = (function () {
    function HtmlElementAst(name, attrs, children, sourceSpan, startSourceSpan, endSourceSpan) {
        this.name = name;
        this.attrs = attrs;
        this.children = children;
        this.sourceSpan = sourceSpan;
        this.startSourceSpan = startSourceSpan;
        this.endSourceSpan = endSourceSpan;
    }
    HtmlElementAst.prototype.visit = function (visitor, context) { return visitor.visitElement(this, context); };
    return HtmlElementAst;
}());
exports.HtmlElementAst = HtmlElementAst;
var HtmlCommentAst = (function () {
    function HtmlCommentAst(value, sourceSpan) {
        this.value = value;
        this.sourceSpan = sourceSpan;
    }
    HtmlCommentAst.prototype.visit = function (visitor, context) { return visitor.visitComment(this, context); };
    return HtmlCommentAst;
}());
exports.HtmlCommentAst = HtmlCommentAst;
function htmlVisitAll(visitor, asts, context) {
    if (context === void 0) { context = null; }
    var result = [];
    asts.forEach(function (ast) {
        var astResult = ast.visit(visitor, context);
        if (lang_1.isPresent(astResult)) {
            result.push(astResult);
        }
    });
    return result;
}
exports.htmlVisitAll = htmlVisitAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbF9hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9odG1sX2FzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQXdCLG9CQUFvQixDQUFDLENBQUE7QUFTN0M7SUFDRSxxQkFBbUIsS0FBYSxFQUFTLFVBQTJCO1FBQWpELFVBQUssR0FBTCxLQUFLLENBQVE7UUFBUyxlQUFVLEdBQVYsVUFBVSxDQUFpQjtJQUFHLENBQUM7SUFDeEUsMkJBQUssR0FBTCxVQUFNLE9BQXVCLEVBQUUsT0FBWSxJQUFTLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDaEcsa0JBQUM7QUFBRCxDQUFDLEFBSEQsSUFHQztBQUhZLG1CQUFXLGNBR3ZCLENBQUE7QUFFRDtJQUNFLDBCQUNXLFdBQW1CLEVBQVMsSUFBWSxFQUFTLEtBQTZCLEVBQzlFLFVBQTJCLEVBQVMscUJBQXNDO1FBRDFFLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLFVBQUssR0FBTCxLQUFLLENBQXdCO1FBQzlFLGVBQVUsR0FBVixVQUFVLENBQWlCO1FBQVMsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFpQjtJQUFHLENBQUM7SUFDekYsZ0NBQUssR0FBTCxVQUFNLE9BQXVCLEVBQUUsT0FBWTtRQUN6QyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUNILHVCQUFDO0FBQUQsQ0FBQyxBQVBELElBT0M7QUFQWSx3QkFBZ0IsbUJBTzVCLENBQUE7QUFFRDtJQUNFLDhCQUNXLEtBQWEsRUFBUyxVQUFxQixFQUFTLFVBQTJCLEVBQy9FLGVBQWdDLEVBQVMsYUFBOEI7UUFEdkUsVUFB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