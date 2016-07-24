/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var ast_1 = require('../../src/expression_parser/ast');
var lang_1 = require('../../src/facade/lang');
var interpolation_config_1 = require('../../src/interpolation_config');
var Unparser = (function () {
    function Unparser() {
    }
    Unparser.prototype.unparse = function (ast, interpolationConfig) {
        this._expression = '';
        this._interpolationConfig = interpolationConfig;
        this._visit(ast);
        return this._expression;
    };
    Unparser.prototype.visitPropertyRead = function (ast, context) {
        this._visit(ast.receiver);
        this._expression += ast.receiver instanceof ast_1.ImplicitReceiver ? "" + ast.name : "." + ast.name;
    };
    Unparser.prototype.visitPropertyWrite = function (ast, context) {
        this._visit(ast.receiver);
        this._expression +=
            ast.receiver instanceof ast_1.ImplicitReceiver ? ast.name + " = " : "." + ast.name + " = ";
        this._visit(ast.value);
    };
    Unparser.prototype.visitBinary = function (ast, context) {
        this._visit(ast.left);
        this._expression += " " + ast.operation + " ";
        this._visit(ast.right);
    };
    Unparser.prototype.visitChain = function (ast, context) {
        var len = ast.expressions.length;
        for (var i = 0; i < len; i++) {
            this._visit(ast.expressions[i]);
            this._expression += i == len - 1 ? ';' : '; ';
        }
    };
    Unparser.prototype.visitConditional = function (ast, context) {
        this._visit(ast.condition);
        this._expression += ' ? ';
        this._visit(ast.trueExp);
        this._expression += ' : ';
        this._visit(ast.falseExp);
    };
    Unparser.prototype.visitPipe = function (ast, context) {
        var _this = this;
        this._expression += '(';
        this._visit(ast.exp);
        this._expression += " | " + ast.name;
        ast.args.forEach(function (arg) {
            _this._expression += ':';
            _this._visit(arg);
        });
        this._expression += ')';
    };
    Unparser.prototype.visitFunctionCall = function (ast, context) {
        var _this = this;
        this._visit(ast.target);
        this._expression += '(';
        var isFirst = true;
        ast.args.forEach(function (arg) {
            if (!isFirst)
                _this._expression += ', ';
            isFirst = false;
            _this._visit(arg);
        });
        this._expression += ')';
    };
    Unparser.prototype.visitImplicitReceiver = function (ast, context) { };
    Unparser.prototype.visitInterpolation = function (ast, context) {
        for (var i = 0; i < ast.strings.length; i++) {
            this._expression += ast.strings[i];
            if (i < ast.expressions.length) {
                this._expression += this._interpolationConfig.start + " ";
                this._visit(ast.expressions[i]);
                this._expression += " " + this._interpolationConfig.end;
            }
        }
    };
    Unparser.prototype.visitKeyedRead = function (ast, context) {
        this._visit(ast.obj);
        this._expression += '[';
        this._visit(ast.key);
        this._expression += ']';
    };
    Unparser.prototype.visitKeyedWrite = function (ast, context) {
        this._visit(ast.obj);
        this._expression += '[';
        this._visit(ast.key);
        this._expression += '] = ';
        this._visit(ast.value);
    };
    Unparser.prototype.visitLiteralArray = function (ast, context) {
        var _this = this;
        this._expression += '[';
        var isFirst = true;
        ast.expressions.forEach(function (expression) {
            if (!isFirst)
                _this._expression += ', ';
            isFirst = false;
            _this._visit(expression);
        });
        this._expression += ']';
    };
    Unparser.prototype.visitLiteralMap = function (ast, context) {
        this._expression += '{';
        var isFirst = true;
        for (var i = 0; i < ast.keys.length; i++) {
            if (!isFirst)
                this._expression += ', ';
            isFirst = false;
            this._expression += ast.keys[i] + ": ";
            this._visit(ast.values[i]);
        }
        this._expression += '}';
    };
    Unparser.prototype.visitLiteralPrimitive = function (ast, context) {
        if (lang_1.isString(ast.value)) {
            this._expression += "\"" + lang_1.StringWrapper.replaceAll(ast.value, Unparser._quoteRegExp, '\"') + "\"";
        }
        else {
            this._expression += "" + ast.value;
        }
    };
    Unparser.prototype.visitMethodCall = function (ast, context) {
        var _this = this;
        this._visit(ast.receiver);
        this._expression += ast.receiver instanceof ast_1.ImplicitReceiver ? ast.name + "(" : "." + ast.name + "(";
        var isFirst = true;
        ast.args.forEach(function (arg) {
            if (!isFirst)
                _this._expression += ', ';
            isFirst = false;
            _this._visit(arg);
        });
        this._expression += ')';
    };
    Unparser.prototype.visitPrefixNot = function (ast, context) {
        this._expression += '!';
        this._visit(ast.expression);
    };
    Unparser.prototype.visitSafePropertyRead = function (ast, context) {
        this._visit(ast.receiver);
        this._expression += "?." + ast.name;
    };
    Unparser.prototype.visitSafeMethodCall = function (ast, context) {
        var _this = this;
        this._visit(ast.receiver);
        this._expression += "?." + ast.name + "(";
        var isFirst = true;
        ast.args.forEach(function (arg) {
            if (!isFirst)
                _this._expression += ', ';
            isFirst = false;
            _this._visit(arg);
        });
        this._expression += ')';
    };
    Unparser.prototype.visitQuote = function (ast, context) {
        this._expression += ast.prefix + ":" + ast.uninterpretedExpression;
    };
    Unparser.prototype._visit = function (ast) { ast.visit(this); };
    Unparser._quoteRegExp = /"/g;
    return Unparser;
}());
var sharedUnparser = new Unparser();
function unparse(ast, interpolationConfig) {
    if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
    return sharedUnparser.unparse(ast, interpolationConfig);
}
exports.unparse = unparse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5wYXJzZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3QvZXhwcmVzc2lvbl9wYXJzZXIvdW5wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILG9CQUFpUyxpQ0FBaUMsQ0FBQyxDQUFBO0FBQ25VLHFCQUFpRCx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3pFLHFDQUFnRSxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRWpHO0lBQUE7SUF5S0EsQ0FBQztJQXBLQywwQkFBTyxHQUFQLFVBQVEsR0FBUSxFQUFFLG1CQUF3QztRQUN4RCxJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsbUJBQW1CLENBQUM7UUFDaEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNqQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBRUQsb0NBQWlCLEdBQWpCLFVBQWtCLEdBQWlCLEVBQUUsT0FBWTtRQUMvQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxRQUFRLFlBQVksc0JBQWdCLEdBQUcsS0FBRyxHQUFHLENBQUMsSUFBTSxHQUFHLE1BQUksR0FBRyxDQUFDLElBQU0sQ0FBQztJQUNoRyxDQUFDO0lBRUQscUNBQWtCLEdBQWxCLFVBQW1CLEdBQWtCLEVBQUUsT0FBWTtRQUNqRCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsV0FBVztZQUNaLEdBQUcsQ0FBQyxRQUFRLFlBQVksc0JBQWdCLEdBQU0sR0FBRyxDQUFDLElBQUksUUFBSyxHQUFHLE1BQUksR0FBRyxDQUFDLElBQUksUUFBSyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFRCw4QkFBVyxHQUFYLFVBQVksR0FBVyxFQUFFLE9BQVk7UUFDbkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFJLEdBQUcsQ0FBQyxTQUFTLE1BQUcsQ0FBQztRQUN6QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsNkJBQVUsR0FBVixVQUFXLEdBQVUsRUFBRSxPQUFZO1FBQ2pDLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDO1FBQ2pDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2hELENBQUM7SUFDSCxDQUFDO0lBRUQsbUNBQWdCLEdBQWhCLFVBQWlCLEdBQWdCLEVBQUUsT0FBWTtRQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN6QixJQUFJLENBQUMsV0FBVyxJQUFJLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsNEJBQVMsR0FBVCxVQUFVLEdBQWdCLEVBQUUsT0FBWTtRQUF4QyxpQkFTQztRQVJDLElBQUksQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxXQUFXLElBQUksUUFBTSxHQUFHLENBQUMsSUFBTSxDQUFDO1FBQ3JDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUNsQixLQUFJLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQztZQUN4QixLQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUM7SUFDMUIsQ0FBQztJQUVELG9DQUFpQixHQUFqQixVQUFrQixHQUFpQixFQUFFLE9BQVk7UUFBakQsaUJBVUM7UUFUQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQztRQUN4QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDO1lBQ3ZDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDaEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDO0lBQzFCLENBQUM7SUFFRCx3Q0FBcUIsR0FBckIsVUFBc0IsR0FBcUIsRUFBRSxPQUFZLElBQUcsQ0FBQztJQUU3RCxxQ0FBa0IsR0FBbEIsVUFBbUIsR0FBa0IsRUFBRSxPQUFZO1FBQ2pELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUM1QyxJQUFJLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFdBQVcsSUFBTyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxNQUFHLENBQUM7Z0JBQzFELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsV0FBVyxJQUFJLE1BQUksSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUssQ0FBQztZQUMxRCxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxpQ0FBYyxHQUFkLFVBQWUsR0FBYyxFQUFFLE9BQVk7UUFDekMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUM7SUFDMUIsQ0FBQztJQUVELGtDQUFlLEdBQWYsVUFBZ0IsR0FBZSxFQUFFLE9BQVk7UUFDM0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUM7UUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELG9DQUFpQixHQUFqQixVQUFrQixHQUFpQixFQUFFLE9BQVk7UUFBakQsaUJBVUM7UUFUQyxJQUFJLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQztRQUN4QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkIsR0FBRyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsVUFBQSxVQUFVO1lBQ2hDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDO1lBQ3ZDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDaEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDO0lBQzFCLENBQUM7SUFFRCxrQ0FBZSxHQUFmLFVBQWdCLEdBQWUsRUFBRSxPQUFZO1FBQzNDLElBQUksQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDO1FBQ3hCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztRQUNuQixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDekMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUM7WUFDdkMsT0FBTyxHQUFHLEtBQUssQ0FBQztZQUNoQixJQUFJLENBQUMsV0FBVyxJQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQUksQ0FBQztZQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsSUFBSSxDQUFDLFdBQVcsSUFBSSxHQUFHLENBQUM7SUFDMUIsQ0FBQztJQUVELHdDQUFxQixHQUFyQixVQUFzQixHQUFxQixFQUFFLE9BQVk7UUFDdkQsRUFBRSxDQUFDLENBQUMsZUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsSUFBSSxPQUFJLG9CQUFhLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsT0FBRyxDQUFDO1FBQzlGLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxXQUFXLElBQUksS0FBRyxHQUFHLENBQUMsS0FBTyxDQUFDO1FBQ3JDLENBQUM7SUFDSCxDQUFDO0lBRUQsa0NBQWUsR0FBZixVQUFnQixHQUFlLEVBQUUsT0FBWTtRQUE3QyxpQkFVQztRQVRDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLFFBQVEsWUFBWSxzQkFBZ0IsR0FBTSxHQUFHLENBQUMsSUFBSSxNQUFHLEdBQUcsTUFBSSxHQUFHLENBQUMsSUFBSSxNQUFHLENBQUM7UUFDaEcsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ25CLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRztZQUNsQixFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFBQyxLQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQztZQUN2QyxPQUFPLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLEtBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkIsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxJQUFJLEdBQUcsQ0FBQztJQUMxQixDQUFDO0lBRUQsaUNBQWMsR0FBZCxVQUFlLEdBQWMsRUFBRSxPQUFZO1FBQ3pDLElBQUksQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCx3Q0FBcUIsR0FBckIsVUFBc0IsR0FBcUIsRUFBRSxPQUFZO1FBQ3ZELElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxXQUFXLElBQUksT0FBSyxHQUFHLENBQUMsSUFBTSxDQUFDO0lBQ3RDLENBQUM7SUFFRCxzQ0FBbUIsR0FBbkIsVUFBb0IsR0FBbUIsRUFBRSxPQUFZO1FBQXJELGlCQVVDO1FBVEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsSUFBSSxPQUFLLEdBQUcsQ0FBQyxJQUFJLE1BQUcsQ0FBQztRQUNyQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkIsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBQSxHQUFHO1lBQ2xCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUFDLEtBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDO1lBQ3ZDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDaEIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQixDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDO0lBQzFCLENBQUM7SUFFRCw2QkFBVSxHQUFWLFVBQVcsR0FBVSxFQUFFLE9BQVk7UUFDakMsSUFBSSxDQUFDLFdBQVcsSUFBTyxHQUFHLENBQUMsTUFBTSxTQUFJLEdBQUcsQ0FBQyx1QkFBeUIsQ0FBQztJQUNyRSxDQUFDO0lBRU8seUJBQU0sR0FBZCxVQUFlLEdBQVEsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQXZLOUIscUJBQVksR0FBRyxJQUFJLENBQUM7SUF3S3JDLGVBQUM7QUFBRCxDQUFDLEFBektELElBeUtDO0FBRUQsSUFBTSxjQUFjLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztBQUV0QyxpQkFDSSxHQUFRLEVBQUUsbUJBQXVFO0lBQXZFLG1DQUF1RSxHQUF2RSx5RUFBdUU7SUFDbkYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLG1CQUFtQixDQUFDLENBQUM7QUFDMUQsQ0FBQztBQUhlLGVBQU8sVUFHdEIsQ0FBQSJ9