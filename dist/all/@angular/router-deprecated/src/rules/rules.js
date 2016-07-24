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
var collection_1 = require('../facade/collection');
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
var promise_1 = require('../facade/promise');
var instruction_1 = require('../instruction');
var url_parser_1 = require('../url_parser');
// RouteMatch objects hold information about a match between a rule and a URL
var RouteMatch = (function () {
    function RouteMatch() {
    }
    return RouteMatch;
}());
exports.RouteMatch = RouteMatch;
var PathMatch = (function (_super) {
    __extends(PathMatch, _super);
    function PathMatch(instruction, remaining, remainingAux) {
        _super.call(this);
        this.instruction = instruction;
        this.remaining = remaining;
        this.remainingAux = remainingAux;
    }
    return PathMatch;
}(RouteMatch));
exports.PathMatch = PathMatch;
var RedirectMatch = (function (_super) {
    __extends(RedirectMatch, _super);
    function RedirectMatch(redirectTo, specificity /** TODO #9100 */) {
        _super.call(this);
        this.redirectTo = redirectTo;
        this.specificity = specificity;
    }
    return RedirectMatch;
}(RouteMatch));
exports.RedirectMatch = RedirectMatch;
var RedirectRule = (function () {
    function RedirectRule(_pathRecognizer, redirectTo) {
        this._pathRecognizer = _pathRecognizer;
        this.redirectTo = redirectTo;
        this.hash = this._pathRecognizer.hash;
    }
    Object.defineProperty(RedirectRule.prototype, "path", {
        get: function () { return this._pathRecognizer.toString(); },
        set: function (val) { throw new exceptions_1.BaseException('you cannot set the path of a RedirectRule directly'); },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns `null` or a `ParsedUrl` representing the new path to match
     */
    RedirectRule.prototype.recognize = function (beginningSegment) {
        var match = null;
        if (lang_1.isPresent(this._pathRecognizer.matchUrl(beginningSegment))) {
            match = new RedirectMatch(this.redirectTo, this._pathRecognizer.specificity);
        }
        return promise_1.PromiseWrapper.resolve(match);
    };
    RedirectRule.prototype.generate = function (params) {
        throw new exceptions_1.BaseException("Tried to generate a redirect.");
    };
    return RedirectRule;
}());
exports.RedirectRule = RedirectRule;
// represents something like '/foo/:bar'
var RouteRule = (function () {
    // TODO: cache component instruction instances by params and by ParsedUrl instance
    function RouteRule(_routePath, handler, _routeName) {
        this._routePath = _routePath;
        this.handler = handler;
        this._routeName = _routeName;
        this._cache = new collection_1.Map();
        this.specificity = this._routePath.specificity;
        this.hash = this._routePath.hash;
        this.terminal = this._routePath.terminal;
    }
    Object.defineProperty(RouteRule.prototype, "path", {
        get: function () { return this._routePath.toString(); },
        set: function (val) { throw new exceptions_1.BaseException('you cannot set the path of a RouteRule directly'); },
        enumerable: true,
        configurable: true
    });
    RouteRule.prototype.recognize = function (beginningSegment) {
        var _this = this;
        var res = this._routePath.matchUrl(beginningSegment);
        if (lang_1.isBlank(res)) {
            return null;
        }
        return this.handler.resolveComponentType().then(function (_) {
            var componentInstruction = _this._getInstruction(res.urlPath, res.urlParams, res.allParams);
            return new PathMatch(componentInstruction, res.rest, res.auxiliary);
        });
    };
    RouteRule.prototype.generate = function (params) {
        var generated = this._routePath.generateUrl(params);
        var urlPath = generated.urlPath;
        var urlParams = generated.urlParams;
        return this._getInstruction(urlPath, url_parser_1.convertUrlParamsToArray(urlParams), params);
    };
    RouteRule.prototype.generateComponentPathValues = function (params) {
        return this._routePath.generateUrl(params);
    };
    RouteRule.prototype._getInstruction = function (urlPath, urlParams, params) {
        if (lang_1.isBlank(this.handler.componentType)) {
            throw new exceptions_1.BaseException("Tried to get instruction before the type was loaded.");
        }
        var hashKey = urlPath + '?' + urlParams.join('&');
        if (this._cache.has(hashKey)) {
            return this._cache.get(hashKey);
        }
        var instruction = new instruction_1.ComponentInstruction(urlPath, urlParams, this.handler.data, this.handler.componentType, this.terminal, this.specificity, params, this._routeName);
        this._cache.set(hashKey, instruction);
        return instruction;
    };
    return RouteRule;
}());
exports.RouteRule = RouteRule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVsZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci1kZXByZWNhdGVkL3NyYy9ydWxlcy9ydWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCwyQkFBa0Isc0JBQXNCLENBQUMsQ0FBQTtBQUN6QywyQkFBNEIsc0JBQXNCLENBQUMsQ0FBQTtBQUNuRCxxQkFBaUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUNsRCx3QkFBNkIsbUJBQW1CLENBQUMsQ0FBQTtBQUNqRCw0QkFBbUMsZ0JBQWdCLENBQUMsQ0FBQTtBQUNwRCwyQkFBMkMsZUFBZSxDQUFDLENBQUE7QUFPM0QsNkVBQTZFO0FBQzdFO0lBQUE7SUFBa0MsQ0FBQztJQUFELGlCQUFDO0FBQUQsQ0FBQyxBQUFuQyxJQUFtQztBQUFiLGtCQUFVLGFBQUcsQ0FBQTtBQUVuQztJQUErQiw2QkFBVTtJQUN2QyxtQkFDVyxXQUFpQyxFQUFTLFNBQWMsRUFBUyxZQUFtQjtRQUM3RixpQkFBTyxDQUFDO1FBREMsZ0JBQVcsR0FBWCxXQUFXLENBQXNCO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUFTLGlCQUFZLEdBQVosWUFBWSxDQUFPO0lBRS9GLENBQUM7SUFDSCxnQkFBQztBQUFELENBQUMsQUFMRCxDQUErQixVQUFVLEdBS3hDO0FBTFksaUJBQVMsWUFLckIsQ0FBQTtBQUVEO0lBQW1DLGlDQUFVO0lBQzNDLHVCQUFtQixVQUFpQixFQUFTLFdBQWdCLENBQUMsaUJBQWlCO1FBQUksaUJBQU8sQ0FBQztRQUF4RSxlQUFVLEdBQVYsVUFBVSxDQUFPO1FBQVMsZ0JBQVcsR0FBWCxXQUFXLENBQUs7SUFBK0IsQ0FBQztJQUMvRixvQkFBQztBQUFELENBQUMsQUFGRCxDQUFtQyxVQUFVLEdBRTVDO0FBRlkscUJBQWEsZ0JBRXpCLENBQUE7QUFVRDtJQUdFLHNCQUFvQixlQUEwQixF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