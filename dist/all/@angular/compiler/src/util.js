/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var collection_1 = require('./facade/collection');
var lang_1 = require('./facade/lang');
var o = require('./output/output_ast');
exports.MODULE_SUFFIX = lang_1.IS_DART ? '.dart' : '';
var CAMEL_CASE_REGEXP = /([A-Z])/g;
function camelCaseToDashCase(input) {
    return lang_1.StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, function (m) { return '-' + m[1].toLowerCase(); });
}
exports.camelCaseToDashCase = camelCaseToDashCase;
function splitAtColon(input, defaultValues) {
    var parts = input.split(':', 2).map(function (s) { return s.trim(); });
    return parts.length > 1 ? parts : defaultValues;
}
exports.splitAtColon = splitAtColon;
function sanitizeIdentifier(name) {
    return lang_1.StringWrapper.replaceAll(name, /\W/g, '_');
}
exports.sanitizeIdentifier = sanitizeIdentifier;
function visitValue(value, visitor, context) {
    if (lang_1.isArray(value)) {
        return visitor.visitArray(value, context);
    }
    else if (lang_1.isStrictStringMap(value)) {
        return visitor.visitStringMap(value, context);
    }
    else if (lang_1.isBlank(value) || lang_1.isPrimitive(value)) {
        return visitor.visitPrimitive(value, context);
    }
    else {
        return visitor.visitOther(value, context);
    }
}
exports.visitValue = visitValue;
var ValueTransformer = (function () {
    function ValueTransformer() {
    }
    ValueTransformer.prototype.visitArray = function (arr, context) {
        var _this = this;
        return arr.map(function (value) { return visitValue(value, _this, context); });
    };
    ValueTransformer.prototype.visitStringMap = function (map, context) {
        var _this = this;
        var result = {};
        collection_1.StringMapWrapper.forEach(map, function (value /** TODO #9100 */, key /** TODO #9100 */) {
            result[key] = visitValue(value, _this, context);
        });
        return result;
    };
    ValueTransformer.prototype.visitPrimitive = function (value, context) { return value; };
    ValueTransformer.prototype.visitOther = function (value, context) { return value; };
    return ValueTransformer;
}());
exports.ValueTransformer = ValueTransformer;
function assetUrl(pkg, path, type) {
    if (path === void 0) { path = null; }
    if (type === void 0) { type = 'src'; }
    if (lang_1.IS_DART) {
        if (path == null) {
            return "asset:angular2/" + pkg + "/" + pkg + ".dart";
        }
        else {
            return "asset:angular2/lib/" + pkg + "/src/" + path + ".dart";
        }
    }
    else {
        if (path == null) {
            return "asset:@angular/lib/" + pkg + "/index";
        }
        else {
            return "asset:@angular/lib/" + pkg + "/src/" + path;
        }
    }
}
exports.assetUrl = assetUrl;
function createDiTokenExpression(token) {
    if (lang_1.isPresent(token.value)) {
        return o.literal(token.value);
    }
    else if (token.identifierIsInstance) {
        return o.importExpr(token.identifier)
            .instantiate([], o.importType(token.identifier, [], [o.TypeModifier.Const]));
    }
    else {
        return o.importExpr(token.identifier);
    }
}
exports.createDiTokenExpression = createDiTokenExpression;
var SyncAsyncResult = (function () {
    function SyncAsyncResult(syncResult, asyncResult) {
        if (asyncResult === void 0) { asyncResult = null; }
        this.syncResult = syncResult;
        this.asyncResult = asyncResult;
        if (!asyncResult) {
            this.asyncResult = Promise.resolve(syncResult);
        }
    }
    return SyncAsyncResult;
}());
exports.SyncAsyncResult = SyncAsyncResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL3V0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUdILDJCQUErQixxQkFBcUIsQ0FBQyxDQUFBO0FBQ3JELHFCQUFrRyxlQUFlLENBQUMsQ0FBQTtBQUNsSCxJQUFZLENBQUMsV0FBTSxxQkFBcUIsQ0FBQyxDQUFBO0FBRTlCLHFCQUFhLEdBQUcsY0FBTyxHQUFHLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFFbEQsSUFBSSxpQkFBaUIsR0FBRyxVQUFVLENBQUM7QUFFbkMsNkJBQW9DLEtBQWE7SUFDL0MsTUFBTSxDQUFDLG9CQUFhLENBQUMsZ0JBQWdCLENBQ2pDLEtBQUssRUFBRSxpQkFBaUIsRUFBRSxVQUFDLENBQVcsSUFBTyxNQUFNLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZGLENBQUM7QUFIZSwyQkFBbUIsc0JBR2xDLENBQUE7QUFFRCxzQkFBNkIsS0FBYSxFQUFFLGFBQXVCO0lBQ2pFLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFDLENBQVMsSUFBSyxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBUixDQUFRLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLGFBQWEsQ0FBQztBQUNsRCxDQUFDO0FBSGUsb0JBQVksZUFHM0IsQ0FBQTtBQUVELDRCQUFtQyxJQUFZO0lBQzdDLE1BQU0sQ0FBQyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3BELENBQUM7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