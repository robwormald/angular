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
var html_parser_1 = require('../html_parser');
var parse_util_1 = require('../parse_util');
var message_1 = require('./message');
var _PLACEHOLDER_REGEXP = lang_1.RegExpWrapper.create("\\<ph(\\s)+name=(\"(\\w)+\")\\/\\>");
var _ID_ATTR = 'id';
var _MSG_ELEMENT = 'msg';
var _BUNDLE_ELEMENT = 'message-bundle';
function serializeXmb(messages) {
    var ms = messages.map(function (m) { return _serializeMessage(m); }).join('');
    return "<message-bundle>" + ms + "</message-bundle>";
}
exports.serializeXmb = serializeXmb;
var XmbDeserializationResult = (function () {
    function XmbDeserializationResult(content, messages, errors) {
        this.content = content;
        this.messages = messages;
        this.errors = errors;
    }
    return XmbDeserializationResult;
}());
exports.XmbDeserializationResult = XmbDeserializationResult;
var XmbDeserializationError = (function (_super) {
    __extends(XmbDeserializationError, _super);
    function XmbDeserializationError(span, msg) {
        _super.call(this, span, msg);
    }
    return XmbDeserializationError;
}(parse_util_1.ParseError));
exports.XmbDeserializationError = XmbDeserializationError;
function deserializeXmb(content, url) {
    var normalizedContent = _expandPlaceholder(content.trim());
    var parsed = new html_parser_1.HtmlParser().parse(normalizedContent, url);
    if (parsed.errors.length > 0) {
        return new XmbDeserializationResult(null, {}, parsed.errors);
    }
    if (_checkRootElement(parsed.rootNodes)) {
        return new XmbDeserializationResult(null, {}, [new XmbDeserializationError(null, "Missing element \"" + _BUNDLE_ELEMENT + "\"")]);
    }
    var bundleEl = parsed.rootNodes[0]; // test this
    var errors = [];
    var messages = {};
    _createMessages(bundleEl.children, messages, errors);
    return (errors.length == 0) ?
        new XmbDeserializationResult(normalizedContent, messages, []) :
        new XmbDeserializationResult(null, {}, errors);
}
exports.deserializeXmb = deserializeXmb;
function _checkRootElement(nodes) {
    return nodes.length < 1 || !(nodes[0] instanceof html_ast_1.HtmlElementAst) ||
        nodes[0].name != _BUNDLE_ELEMENT;
}
function _createMessages(nodes, messages, errors) {
    nodes.forEach(function (node) {
        if (node instanceof html_ast_1.HtmlElementAst) {
            var msg = node;
            if (msg.name != _MSG_ELEMENT) {
                errors.push(new XmbDeserializationError(node.sourceSpan, "Unexpected element \"" + msg.name + "\""));
                return;
            }
            var idAttr = msg.attrs.find(function (a) { return a.name == _ID_ATTR; });
            if (idAttr) {
                messages[idAttr.value] = msg.children;
            }
            else {
                errors.push(new XmbDeserializationError(node.sourceSpan, "\"" + _ID_ATTR + "\" attribute is missing"));
            }
        }
    });
}
function _serializeMessage(m) {
    var desc = lang_1.isPresent(m.description) ? " desc='" + _escapeXml(m.description) + "'" : '';
    var meaning = lang_1.isPresent(m.meaning) ? " meaning='" + _escapeXml(m.meaning) + "'" : '';
    return "<msg id='" + message_1.id(m) + "'" + desc + meaning + ">" + m.content + "</msg>";
}
function _expandPlaceholder(input) {
    return lang_1.RegExpWrapper.replaceAll(_PLACEHOLDER_REGEXP, input, function (match) {
        var nameWithQuotes = match[2];
        return "<ph name=" + nameWithQuotes + "></ph>";
    });
}
var _XML_ESCAPED_CHARS = [
    [/&/g, '&amp;'],
    [/"/g, '&quot;'],
    [/'/g, '&apos;'],
    [/</g, '&lt;'],
    [/>/g, '&gt;'],
];
function _escapeXml(value) {
    return _XML_ESCAPED_CHARS.reduce(function (value, escape) { return value.replace(escape[0], escape[1]); }, value);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieG1iX3NlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9pMThuL3htYl9zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILHFCQUFnRCxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ2pFLHlCQUFzQyxhQUFhLENBQUMsQ0FBQTtBQUNwRCw0QkFBeUIsZ0JBQWdCLENBQUMsQ0FBQTtBQUMxQywyQkFBMEMsZUFBZSxDQUFDLENBQUE7QUFFMUQsd0JBQTBCLFdBQVcsQ0FBQyxDQUFBO0FBRXRDLElBQUksbUJBQW1CLEdBQUcsb0JBQWEsQ0FBQyxNQUFNLENBQUMsb0NBQWtDLENBQUMsQ0FBQztBQUNuRixJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDdEIsSUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQzNCLElBQU0sZUFBZSxHQUFHLGdCQUFnQixDQUFDO0FBRXpDLHNCQUE2QixRQUFtQjtJQUM5QyxJQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDNUQsTUFBTSxDQUFDLHFCQUFtQixFQUFFLHNCQUFtQixDQUFDO0FBQ2xELENBQUM7QUFIZSxvQkFBWSxlQUczQixDQUFBO0FBRUQ7SUFDRSxrQ0FDVyxPQUFlLEVBQVMsUUFBb0MsRUFDNUQsTUFBb0I7UUFEcEIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQTRCO1FBQzVELFdBQU0sR0FBTixNQUFNLENBQWM7SUFBRyxDQUFDO0lBQ3JDLCtCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFKWSxnQ0FBd0IsMkJBSXBDLENBQUE7QUFFRDtJ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