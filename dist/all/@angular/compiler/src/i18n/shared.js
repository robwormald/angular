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
var lang_1 = require('../facade/lang');
var html_ast_1 = require('../html_ast');
var parse_util_1 = require('../parse_util');
var message_1 = require('./message');
exports.I18N_ATTR = 'i18n';
exports.I18N_ATTR_PREFIX = 'i18n-';
var _CUSTOM_PH_EXP = /\/\/[\s\S]*i18n[\s\S]*\([\s\S]*ph[\s\S]*=[\s\S]*"([\s\S]*?)"[\s\S]*\)/g;
/**
 * An i18n error.
 */
var I18nError = (function (_super) {
    __extends(I18nError, _super);
    function I18nError(span, msg) {
        _super.call(this, span, msg);
    }
    return I18nError;
}(parse_util_1.ParseError));
exports.I18nError = I18nError;
function partition(nodes, errors, implicitTags) {
    var parts = [];
    for (var i = 0; i < nodes.length; ++i) {
        var node = nodes[i];
        var msgNodes = [];
        // Nodes between `<!-- i18n -->` and `<!-- /i18n -->`
        if (_isOpeningComment(node)) {
            var i18n = node.value.replace(/^i18n:?/, '').trim();
            while (++i < nodes.length && !_isClosingComment(nodes[i])) {
                msgNodes.push(nodes[i]);
            }
            if (i === nodes.length) {
                errors.push(new I18nError(node.sourceSpan, 'Missing closing \'i18n\' comment.'));
                break;
            }
            parts.push(new Part(null, null, msgNodes, i18n, true));
        }
        else if (node instanceof html_ast_1.HtmlElementAst) {
            // Node with an `i18n` attribute
            var i18n = _findI18nAttr(node);
            var hasI18n = lang_1.isPresent(i18n) || implicitTags.indexOf(node.name) > -1;
            parts.push(new Part(node, null, node.children, lang_1.isPresent(i18n) ? i18n.value : null, hasI18n));
        }
        else if (node instanceof html_ast_1.HtmlTextAst) {
            parts.push(new Part(null, node, null, null, false));
        }
    }
    return parts;
}
exports.partition = partition;
var Part = (function () {
    function Part(rootElement, rootTextNode, children, i18n, hasI18n) {
        this.rootElement = rootElement;
        this.rootTextNode = rootTextNode;
        this.children = children;
        this.i18n = i18n;
        this.hasI18n = hasI18n;
    }
    Object.defineProperty(Part.prototype, "sourceSpan", {
        get: function () {
            if (lang_1.isPresent(this.rootElement)) {
                return this.rootElement.sourceSpan;
            }
            if (lang_1.isPresent(this.rootTextNode)) {
                return this.rootTextNode.sourceSpan;
            }
            return new parse_util_1.ParseSourceSpan(this.children[0].sourceSpan.start, this.children[this.children.length - 1].sourceSpan.end);
        },
        enumerable: true,
        configurable: true
    });
    Part.prototype.createMessage = function (parser, interpolationConfig) {
        return new message_1.Message(stringifyNodes(this.children, parser, interpolationConfig), meaning(this.i18n), description(this.i18n));
    };
    return Part;
}());
exports.Part = Part;
function _isOpeningComment(n) {
    return n instanceof html_ast_1.HtmlCommentAst && lang_1.isPresent(n.value) && n.value.startsWith('i18n');
}
function _isClosingComment(n) {
    return n instanceof html_ast_1.HtmlCommentAst && lang_1.isPresent(n.value) && n.value === '/i18n';
}
function _findI18nAttr(p) {
    var attrs = p.attrs;
    for (var i = 0; i < attrs.length; i++) {
        if (attrs[i].name === exports.I18N_ATTR) {
            return attrs[i];
        }
    }
    return null;
}
function meaning(i18n) {
    if (lang_1.isBlank(i18n) || i18n == '')
        return null;
    return i18n.split('|')[0];
}
exports.meaning = meaning;
function description(i18n) {
    if (lang_1.isBlank(i18n) || i18n == '')
        return null;
    var parts = i18n.split('|', 2);
    return parts.length > 1 ? parts[1] : null;
}
exports.description = description;
/**
 * Extract a translation string given an `i18n-` prefixed attribute.
 *
 * @internal
 */
function messageFromI18nAttribute(parser, interpolationConfig, p, i18nAttr) {
    var expectedName = i18nAttr.name.substring(5);
    var attr = p.attrs.find(function (a) { return a.name == expectedName; });
    if (attr) {
        return messageFromAttribute(parser, interpolationConfig, attr, meaning(i18nAttr.value), description(i18nAttr.value));
    }
    throw new I18nError(p.sourceSpan, "Missing attribute '" + expectedName + "'.");
}
exports.messageFromI18nAttribute = messageFromI18nAttribute;
function messageFromAttribute(parser, interpolationConfig, attr, meaning, description) {
    if (meaning === void 0) { meaning = null; }
    if (description === void 0) { description = null; }
    var value = removeInterpolation(attr.value, attr.sourceSpan, parser, interpolationConfig);
    return new message_1.Message(value, meaning, description);
}
exports.messageFromAttribute = messageFromAttribute;
/**
 * Replace interpolation in the `value` string with placeholders
 */
function removeInterpolation(value, source, expressionParser, interpolationConfig) {
    try {
        var parsed = expressionParser.splitInterpolation(value, source.toString(), interpolationConfig);
        var usedNames = new Map();
        if (lang_1.isPresent(parsed)) {
            var res = '';
            for (var i = 0; i < parsed.strings.length; ++i) {
                res += parsed.strings[i];
                if (i != parsed.strings.length - 1) {
                    var customPhName = extractPhNameFromInterpolation(parsed.expressions[i], i);
                    customPhName = dedupePhName(usedNames, customPhName);
                    res += "<ph name=\"" + customPhName + "\"/>";
                }
            }
            return res;
        }
        return value;
    }
    catch (e) {
        return value;
    }
}
exports.removeInterpolation = removeInterpolation;
/**
 * Extract the placeholder name from the interpolation.
 *
 * Use a custom name when specified (ie: `{{<expression> //i18n(ph="FIRST")}}`) otherwise generate a
 * unique name.
 */
function extractPhNameFromInterpolation(input, index) {
    var customPhMatch = lang_1.StringWrapper.split(input, _CUSTOM_PH_EXP);
    return customPhMatch.length > 1 ? customPhMatch[1] : "INTERPOLATION_" + index;
}
exports.extractPhNameFromInterpolation = extractPhNameFromInterpolation;
/**
 * Return a unique placeholder name based on the given name
 */
function dedupePhName(usedNames, name) {
    var duplicateNameCount = usedNames.get(name);
    if (duplicateNameCount) {
        usedNames.set(name, duplicateNameCount + 1);
        return name + "_" + duplicateNameCount;
    }
    usedNames.set(name, 1);
    return name;
}
exports.dedupePhName = dedupePhName;
/**
 * Convert a list of nodes to a string message.
 *
 */
function stringifyNodes(nodes, expressionParser, interpolationConfig) {
    var visitor = new _StringifyVisitor(expressionParser, interpolationConfig);
    return html_ast_1.htmlVisitAll(visitor, nodes).join('');
}
exports.stringifyNodes = stringifyNodes;
var _StringifyVisitor = (function () {
    function _StringifyVisitor(_parser, _interpolationConfig) {
        this._parser = _parser;
        this._interpolationConfig = _interpolationConfig;
        this._index = 0;
    }
    _StringifyVisitor.prototype.visitElement = function (ast, context) {
        var name = this._index++;
        var children = this._join(html_ast_1.htmlVisitAll(this, ast.children), '');
        return "<ph name=\"e" + name + "\">" + children + "</ph>";
    };
    _StringifyVisitor.prototype.visitAttr = function (ast, context) { return null; };
    _StringifyVisitor.prototype.visitText = function (ast, context) {
        var index = this._index++;
        var noInterpolation = removeInterpolation(ast.value, ast.sourceSpan, this._parser, this._interpolationConfig);
        if (noInterpolation != ast.value) {
            return "<ph name=\"t" + index + "\">" + noInterpolation + "</ph>";
        }
        return ast.value;
    };
    _StringifyVisitor.prototype.visitComment = function (ast, context) { return ''; };
    _StringifyVisitor.prototype.visitExpansion = function (ast, context) { return null; };
    _StringifyVisitor.prototype.visitExpansionCase = function (ast, context) { return null; };
    _StringifyVisitor.prototype._join = function (strs, str) {
        return strs.filter(function (s) { return s.length > 0; }).join(str);
    };
    return _StringifyVisitor;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci9zcmMvaTE4bi9zaGFyZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBR0gscUJBQWdELGdCQUFnQixDQUFDLENBQUE7QUFDakUseUJBQXNKLGFBQWEsQ0FBQyxDQUFBO0FBRXBLLDJCQUEwQyxlQUFlLENBQUMsQ0FBQTtBQUMxRCx3QkFBc0IsV0FBVyxDQUFDLENBQUE7QUFFckIsaUJBQVMsR0FBRyxNQUFNLENBQUM7QUFDbkIsd0JBQWdCLEdBQUcsT0FBTyxDQUFDO0FBQ3hDLElBQU0sY0FBYyxHQUFHLHdFQUF3RSxDQUFDO0FBRWhHOztHQUVHO0FBQ0g7SUFBK0IsNkJBQVU7SUFDdkMsbUJBQVksSUFBcUIsRUFBRSxHQUFXO1FBQUksa0JBQU0sSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQUMsQ0FBQztJQUN2RSxnQkFBQztBQUFELENBQUMsQUFGRCxDQUErQix1QkFBVSxHQUV4QztBQUZZLGlCQUFTLFlBRXJCLENBQUE7QUFFRCxtQkFBMEIsS0FBZ0IsRUFBRSxNQUFvQixFQUFFLFlBQXNCO0lBQ3RGLElBQUksS0FBSyxHQUFXLEVBQUUsQ0FBQztJQUV2QixHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztRQUN0QyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEIsSUFBSSxRQUFRLEdBQWMsRUFBRSxDQUFDO1FBQzdCLHFEQUFxRDtRQUNyRCxFQUFFLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxJQUFJLEdBQW9CLElBQUssQ0FBQyxLQUFLLENBQUMsT0FB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