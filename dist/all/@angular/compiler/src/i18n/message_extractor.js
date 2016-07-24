/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var collection_1 = require('../facade/collection');
var lang_1 = require('../facade/lang');
var html_ast_1 = require('../html_ast');
var interpolation_config_1 = require('../interpolation_config');
var message_1 = require('./message');
var shared_1 = require('./shared');
/**
 * All messages extracted from a template.
 */
var ExtractionResult = (function () {
    function ExtractionResult(messages, errors) {
        this.messages = messages;
        this.errors = errors;
    }
    return ExtractionResult;
}());
exports.ExtractionResult = ExtractionResult;
/**
 * Removes duplicate messages.
 */
function removeDuplicates(messages) {
    var uniq = {};
    messages.forEach(function (m) {
        if (!collection_1.StringMapWrapper.contains(uniq, message_1.id(m))) {
            uniq[message_1.id(m)] = m;
        }
    });
    return collection_1.StringMapWrapper.values(uniq);
}
exports.removeDuplicates = removeDuplicates;
/**
 * Extracts all messages from a template.
 *
 * Algorithm:
 *
 * To understand the algorithm, you need to know how partitioning works.
 * Partitioning is required as we can use two i18n comments to group node siblings together.
 * That is why we cannot just use nodes.
 *
 * Partitioning transforms an array of HtmlAst into an array of Part.
 * A part can optionally contain a root element or a root text node. And it can also contain
 * children.
 * A part can contain i18n property, in which case it needs to be extracted.
 *
 * Example:
 *
 * The following array of nodes will be split into four parts:
 *
 * ```
 * <a>A</a>
 * <b i18n>B</b>
 * <!-- i18n -->
 * <c>C</c>
 * D
 * <!-- /i18n -->
 * E
 * ```
 *
 * Part 1 containing the a tag. It should not be translated.
 * Part 2 containing the b tag. It should be translated.
 * Part 3 containing the c tag and the D text node. It should be translated.
 * Part 4 containing the E text node. It should not be translated..
 *
 * It is also important to understand how we stringify nodes to create a message.
 *
 * We walk the tree and replace every element node with a placeholder. We also replace
 * all expressions in interpolation with placeholders. We also insert a placeholder element
 * to wrap a text node containing interpolation.
 *
 * Example:
 *
 * The following tree:
 *
 * ```
 * <a>A{{I}}</a><b>B</b>
 * ```
 *
 * will be stringified into:
 * ```
 * <ph name="e0"><ph name="t1">A<ph name="0"/></ph></ph><ph name="e2">B</ph>
 * ```
 *
 * This is what the algorithm does:
 *
 * 1. Use the provided html parser to get the html AST of the template.
 * 2. Partition the root nodes, and process each part separately.
 * 3. If a part does not have the i18n attribute, recurse to process children and attributes.
 * 4. If a part has the i18n attribute, stringify the nodes to create a Message.
 */
var MessageExtractor = (function () {
    function MessageExtractor(_htmlParser, _expressionParser, _implicitTags, _implicitAttrs) {
        this._htmlParser = _htmlParser;
        this._expressionParser = _expressionParser;
        this._implicitTags = _implicitTags;
        this._implicitAttrs = _implicitAttrs;
    }
    MessageExtractor.prototype.extract = function (template, sourceUrl, interpolationConfig) {
        if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
        this._messages = [];
        this._errors = [];
        var res = this._htmlParser.parse(template, sourceUrl, true, interpolationConfig);
        if (res.errors.length == 0) {
            this._recurse(res.rootNodes, interpolationConfig);
        }
        return new ExtractionResult(this._messages, this._errors.concat(res.errors));
    };
    MessageExtractor.prototype._extractMessagesFromPart = function (part, interpolationConfig) {
        if (part.hasI18n) {
            this._messages.push(part.createMessage(this._expressionParser, interpolationConfig));
            this._recurseToExtractMessagesFromAttributes(part.children, interpolationConfig);
        }
        else {
            this._recurse(part.children, interpolationConfig);
        }
        if (lang_1.isPresent(part.rootElement)) {
            this._extractMessagesFromAttributes(part.rootElement, interpolationConfig);
        }
    };
    MessageExtractor.prototype._recurse = function (nodes, interpolationConfig) {
        var _this = this;
        if (lang_1.isPresent(nodes)) {
            var parts = shared_1.partition(nodes, this._errors, this._implicitTags);
            parts.forEach(function (part) { return _this._extractMessagesFromPart(part, interpolationConfig); });
        }
    };
    MessageExtractor.prototype._recurseToExtractMessagesFromAttributes = function (nodes, interpolationConfig) {
        var _this = this;
        nodes.forEach(function (n) {
            if (n instanceof html_ast_1.HtmlElementAst) {
                _this._extractMessagesFromAttributes(n, interpolationConfig);
                _this._recurseToExtractMessagesFromAttributes(n.children, interpolationConfig);
            }
        });
    };
    MessageExtractor.prototype._extractMessagesFromAttributes = function (p, interpolationConfig) {
        var _this = this;
        var transAttrs = lang_1.isPresent(this._implicitAttrs[p.name]) ? this._implicitAttrs[p.name] : [];
        var explicitAttrs = [];
        // `i18n-` prefixed attributes should be translated
        p.attrs.filter(function (attr) { return attr.name.startsWith(shared_1.I18N_ATTR_PREFIX); }).forEach(function (attr) {
            try {
                explicitAttrs.push(attr.name.substring(shared_1.I18N_ATTR_PREFIX.length));
                _this._messages.push(shared_1.messageFromI18nAttribute(_this._expressionParser, interpolationConfig, p, attr));
            }
            catch (e) {
                if (e instanceof shared_1.I18nError) {
                    _this._errors.push(e);
                }
                else {
                    throw e;
                }
            }
        });
        // implicit attributes should also be translated
        p.attrs.filter(function (attr) { return !attr.name.startsWith(shared_1.I18N_ATTR_PREFIX); })
            .filter(function (attr) { return explicitAttrs.indexOf(attr.name) == -1; })
            .filter(function (attr) { return transAttrs.indexOf(attr.name) > -1; })
            .forEach(function (attr) { return _this._messages.push(shared_1.messageFromAttribute(_this._expressionParser, interpolationConfig, attr)); });
    };
    return MessageExtractor;
}());
exports.MessageExtractor = MessageExtractor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZV9leHRyYWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9pMThuL21lc3NhZ2VfZXh0cmFjdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFHSCwyQkFBK0Isc0JBQXNCLENBQUMsQ0FBQTtBQUN0RCxxQkFBd0IsZ0JBQWdCLENBQUMsQ0FBQTtBQUN6Qyx5QkFBc0MsYUFBYSxDQUFDLENBQUE7QUFFcEQscUNBQWdFLHlCQUF5QixDQUFDLENBQUE7QUFHMUYsd0JBQTBCLFdBQVcsQ0FBQyxDQUFBO0FBQ3RDLHVCQUEyRyxVQUFVLENBQUMsQ0FBQTtBQUl0SDs7R0FFRztBQUNIO0lBQ0UsMEJBQW1CLFFBQW1CLEVBQVMsTUFBb0I7UUFBaEQsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFTLFdBQU0sR0FBTixNQUFNLENBQWM7SUFBRyxDQUFDO0lBQ3pFLHVCQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSx3QkFBZ0IsbUJBRTVCLENBQUE7QUFFRDs7R0FFRztBQUNILDBCQUFpQyxRQUFtQjtJQUNsRCxJQUFJLElBQUksR0FBNkIsRUFBRSxDQUFDO0lBQ3hDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxDQUFDO1FBQ2hCLEVBQUUsQ0FBQyxDQUFDLENBQUMsNkJBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFlBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsQixDQUFDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsNkJBQWdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFSZSx3QkFBZ0IsbUJBUS9CLENBQUE7QUFFRDs7Ozs7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