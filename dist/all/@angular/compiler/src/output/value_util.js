/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var compile_metadata_1 = require('../compile_metadata');
var collection_1 = require('../facade/collection');
var exceptions_1 = require('../facade/exceptions');
var util_1 = require('../util');
var o = require('./output_ast');
function convertValueToOutputAst(value, type) {
    if (type === void 0) { type = null; }
    return util_1.visitValue(value, new _ValueOutputAstTransformer(), type);
}
exports.convertValueToOutputAst = convertValueToOutputAst;
var _ValueOutputAstTransformer = (function () {
    function _ValueOutputAstTransformer() {
    }
    _ValueOutputAstTransformer.prototype.visitArray = function (arr, type) {
        var _this = this;
        return o.literalArr(arr.map(function (value) { return util_1.visitValue(value, _this, null); }), type);
    };
    _ValueOutputAstTransformer.prototype.visitStringMap = function (map, type) {
        var _this = this;
        var entries = [];
        collection_1.StringMapWrapper.forEach(map, function (value, key) {
            entries.push([key, util_1.visitValue(value, _this, null)]);
        });
        return o.literalMap(entries, type);
    };
    _ValueOutputAstTransformer.prototype.visitPrimitive = function (value, type) { return o.literal(value, type); };
    _ValueOutputAstTransformer.prototype.visitOther = function (value, type) {
        if (value instanceof compile_metadata_1.CompileIdentifierMetadata) {
            return o.importExpr(value);
        }
        else if (value instanceof o.Expression) {
            return value;
        }
        else {
            throw new exceptions_1.BaseException("Illegal state: Don't now how to compile value " + value);
        }
    };
    return _ValueOutputAstTransformer;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsdWVfdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL291dHB1dC92YWx1ZV91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBd0MscUJBQXFCLENBQUMsQ0FBQTtBQUM5RCwyQkFBK0Isc0JBQXNCLENBQUMsQ0FBQTtBQUN0RCwyQkFBNEIsc0JBQXNCLENBQUMsQ0FBQTtBQUNuRCxxQkFBMkMsU0FBUyxDQUFDLENBQUE7QUFFckQsSUFBWSxDQUFDLFdBQU0sY0FBYyxDQUFDLENBQUE7QUFFbEMsaUNBQXdDLEtBQVUsRUFBRSxJQUFtQjtJQUFuQixvQkFBbUIsR0FBbkIsV0FBbUI7SUFDckUsTUFBTSxDQUFDLGlCQUFVLENBQUMsS0FBSyxFQUFFLElBQUksMEJBQTBCLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuRSxDQUFDO0FBRmUsK0JBQXVCLDBCQUV0QyxDQUFBO0FBRUQ7SUFBQTtJQXFCQSxDQUFDO0lBcEJDLCtDQUFVLEdBQVYsVUFBVyxHQUFVLEVBQUUsSUFBWTtRQUFuQyxpQkFFQztRQURDLE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxpQkFBVSxDQUFDLEtBQUssRUFBRSxLQUFJLEVBQUUsSUFBSSxDQUFDLEVBQTdCLENBQTZCLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBQ0QsbURBQWMsR0FBZCxVQUFlLEdBQXlCLEVBQUUsSUFBZTtRQUF6RCxpQkFNQztRQUxDLElBQUksT0FBTyxHQUFpQyxFQUFFLENBQUM7UUFDL0MsNkJBQWdCLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxVQUFDLEtBQVUsRUFBRSxHQUFXO1lBQ3BELE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsaUJBQVUsQ0FBQyxLQUFLLEVBQUUsS0FBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsbURBQWMsR0FBZCxVQUFlLEtBQVUsRUFBRSxJQUFZLElBQWtCLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekYsK0NBQVUsR0FBVixVQUFXLEtBQVUsRUFBRSxJQUFZO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLEtBQUssWUFBWSw0Q0FBeUIsQ0FBQyxDQUFDLENBQUM7WUFDL0MsTUFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUNmLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sSUFBSSwwQkFBYSxDQUFDLG1EQUFpRCxLQUFPLENBQUMsQ0FBQztRQUNwRixDQUFDO0lBQ0gsQ0FBQztJQUNILGlDQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQyJ9