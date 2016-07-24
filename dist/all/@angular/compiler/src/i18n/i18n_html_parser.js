/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var collection_1 = require('../facade/collection');
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
var html_ast_1 = require('../html_ast');
var html_parser_1 = require('../html_parser');
var interpolation_config_1 = require('../interpolation_config');
var message_1 = require('./message');
var shared_1 = require('./shared');
var _PLACEHOLDER_ELEMENT = 'ph';
var _NAME_ATTR = 'name';
var _PLACEHOLDER_EXPANDED_REGEXP = /<ph\s+name="(\w+)"><\/ph>/gi;
/**
 * Creates an i18n-ed version of the parsed template.
 *
 * Algorithm:
 *
 * See `message_extractor.ts` for details on the partitioning algorithm.
 *
 * This is how the merging works:
 *
 * 1. Use the stringify function to get the message id. Look up the message in the map.
 * 2. Get the translated message. At this point we have two trees: the original tree
 * and the translated tree, where all the elements are replaced with placeholders.
 * 3. Use the original tree to create a mapping Index:number -> HtmlAst.
 * 4. Walk the translated tree.
 * 5. If we encounter a placeholder element, get its name property.
 * 6. Get the type and the index of the node using the name property.
 * 7. If the type is 'e', which means element, then:
 *     - translate the attributes of the original element
 *     - recurse to merge the children
 *     - create a new element using the original element name, original position,
 *     and translated children and attributes
 * 8. If the type if 't', which means text, then:
 *     - get the list of expressions from the original node.
 *     - get the string version of the interpolation subtree
 *     - find all the placeholders in the translated message, and replace them with the
 *     corresponding original expressions
 */
var I18nHtmlParser = (function () {
    function I18nHtmlParser(_htmlParser, _expressionParser, _messagesContent, _messages, _implicitTags, _implicitAttrs) {
        this._htmlParser = _htmlParser;
        this._expressionParser = _expressionParser;
        this._messagesContent = _messagesContent;
        this._messages = _messages;
        this._implicitTags = _implicitTags;
        this._implicitAttrs = _implicitAttrs;
    }
    I18nHtmlParser.prototype.parse = function (sourceContent, sourceUrl, parseExpansionForms, interpolationConfig) {
        if (parseExpansionForms === void 0) { parseExpansionForms = false; }
        if (interpolationConfig === void 0) { interpolationConfig = interpolation_config_1.DEFAULT_INTERPOLATION_CONFIG; }
        this._errors = [];
        this._interpolationConfig = interpolationConfig;
        var res = this._htmlParser.parse(sourceContent, sourceUrl, true, interpolationConfig);
        if (res.errors.length > 0) {
            return res;
        }
        var nodes = this._recurse(res.rootNodes);
        return this._errors.length > 0 ? new html_parser_1.HtmlParseTreeResult([], this._errors) :
            new html_parser_1.HtmlParseTreeResult(nodes, []);
    };
    // Merge the translation recursively
    I18nHtmlParser.prototype._processI18nPart = function (part) {
        try {
            return part.hasI18n ? this._mergeI18Part(part) : this._recurseIntoI18nPart(part);
        }
        catch (e) {
            if (e instanceof shared_1.I18nError) {
                this._errors.push(e);
                return [];
            }
            else {
                throw e;
            }
        }
    };
    I18nHtmlParser.prototype._recurseIntoI18nPart = function (p) {
        // we found an element without an i18n attribute
        // we need to recurse in case its children may have i18n set
        // we also need to translate its attributes
        if (lang_1.isPresent(p.rootElement)) {
            var root = p.rootElement;
            var children = this._recurse(p.children);
            var attrs = this._i18nAttributes(root);
            return [new html_ast_1.HtmlElementAst(root.name, attrs, children, root.sourceSpan, root.startSourceSpan, root.endSourceSpan)];
        }
        if (lang_1.isPresent(p.rootTextNode)) {
            // a text node without i18n or interpolation, nothing to do
            return [p.rootTextNode];
        }
        return this._recurse(p.children);
    };
    I18nHtmlParser.prototype._recurse = function (nodes) {
        var _this = this;
        var parts = shared_1.partition(nodes, this._errors, this._implicitTags);
        return collection_1.ListWrapper.flatten(parts.map(function (p) { return _this._processI18nPart(p); }));
    };
    // Look for the translated message and merge it back to the tree
    I18nHtmlParser.prototype._mergeI18Part = function (part) {
        var message = part.createMessage(this._expressionParser, this._interpolationConfig);
        var messageId = message_1.id(message);
        if (!collection_1.StringMapWrapper.contains(this._messages, messageId)) {
            throw new shared_1.I18nError(part.sourceSpan, "Cannot find message for id '" + messageId + "', content '" + message.content + "'.");
        }
        var translation = this._messages[messageId];
        return this._mergeTrees(part, translation);
    };
    I18nHtmlParser.prototype._mergeTrees = function (part, translation) {
        if (lang_1.isPresent(part.rootTextNode)) {
            // this should never happen with a part. Parts that have root text node should not be merged.
            throw new exceptions_1.BaseException('should not be reached');
        }
        var visitor = new _NodeMappingVisitor();
        html_ast_1.htmlVisitAll(visitor, part.children);
        // merge the translated tree with the original tree.
        // we do it by preserving the source code position of the original tree
        var translatedAst = this._expandPlaceholders(translation, visitor.mapping);
        // if the root element is present, we need to create a new root element with its attributes
        // translated
        if (part.rootElement) {
            var root = part.rootElement;
            var attrs = this._i18nAttributes(root);
            return [new html_ast_1.HtmlElementAst(root.name, attrs, translatedAst, root.sourceSpan, root.startSourceSpan, root.endSourceSpan)];
        }
        return translatedAst;
    };
    /**
     * The translation AST is composed on text nodes and placeholder elements
     */
    I18nHtmlParser.prototype._expandPlaceholders = function (translation, mapping) {
        var _this = this;
        return translation.map(function (node) {
            if (node instanceof html_ast_1.HtmlElementAst) {
                // This node is a placeholder, replace with the original content
                return _this._expandPlaceholdersInNode(node, mapping);
            }
            if (node instanceof html_ast_1.HtmlTextAst) {
                return node;
            }
            throw new exceptions_1.BaseException('should not be reached');
        });
    };
    I18nHtmlParser.prototype._expandPlaceholdersInNode = function (node, mapping) {
        var name = this._getName(node);
        var index = lang_1.NumberWrapper.parseInt(name.substring(1), 10);
        var originalNode = mapping[index];
        if (originalNode instanceof html_ast_1.HtmlTextAst) {
            return this._mergeTextInterpolation(node, originalNode);
        }
        if (originalNode instanceof html_ast_1.HtmlElementAst) {
            return this._mergeElement(node, originalNode, mapping);
        }
        throw new exceptions_1.BaseException('should not be reached');
    };
    // Extract the value of a <ph> name attribute
    I18nHtmlParser.prototype._getName = function (node) {
        if (node.name != _PLACEHOLDER_ELEMENT) {
            throw new shared_1.I18nError(node.sourceSpan, "Unexpected tag \"" + node.name + "\". Only \"" + _PLACEHOLDER_ELEMENT + "\" tags are allowed.");
        }
        var nameAttr = node.attrs.find(function (a) { return a.name == _NAME_ATTR; });
        if (nameAttr) {
            return nameAttr.value;
        }
        throw new shared_1.I18nError(node.sourceSpan, "Missing \"" + _NAME_ATTR + "\" attribute.");
    };
    I18nHtmlParser.prototype._mergeTextInterpolation = function (node, originalNode) {
        var split = this._expressionParser.splitInterpolation(originalNode.value, originalNode.sourceSpan.toString(), this._interpolationConfig);
        var exps = split ? split.expressions : [];
        var messageSubstring = this._messagesContent.substring(node.startSourceSpan.end.offset, node.endSourceSpan.start.offset);
        var translated = this._replacePlaceholdersWithInterpolations(messageSubstring, exps, originalNode.sourceSpan);
        return new html_ast_1.HtmlTextAst(translated, originalNode.sourceSpan);
    };
    I18nHtmlParser.prototype._mergeElement = function (node, originalNode, mapping) {
        var children = this._expandPlaceholders(node.children, mapping);
        return new html_ast_1.HtmlElementAst(originalNode.name, this._i18nAttributes(originalNode), children, originalNode.sourceSpan, originalNode.startSourceSpan, originalNode.endSourceSpan);
    };
    I18nHtmlParser.prototype._i18nAttributes = function (el) {
        var _this = this;
        var res = [];
        var implicitAttrs = lang_1.isPresent(this._implicitAttrs[el.name]) ? this._implicitAttrs[el.name] : [];
        el.attrs.forEach(function (attr) {
            if (attr.name.startsWith(shared_1.I18N_ATTR_PREFIX) || attr.name == shared_1.I18N_ATTR)
                return;
            var message;
            var i18nAttr = el.attrs.find(function (a) { return a.name == "" + shared_1.I18N_ATTR_PREFIX + attr.name; });
            if (!i18nAttr) {
                if (implicitAttrs.indexOf(attr.name) == -1) {
                    res.push(attr);
                    return;
                }
                message = shared_1.messageFromAttribute(_this._expressionParser, _this._interpolationConfig, attr);
            }
            else {
                message = shared_1.messageFromI18nAttribute(_this._expressionParser, _this._interpolationConfig, el, i18nAttr);
            }
            var messageId = message_1.id(message);
            if (collection_1.StringMapWrapper.contains(_this._messages, messageId)) {
                var updatedMessage = _this._replaceInterpolationInAttr(attr, _this._messages[messageId]);
                res.push(new html_ast_1.HtmlAttrAst(attr.name, updatedMessage, attr.sourceSpan));
            }
            else {
                throw new shared_1.I18nError(attr.sourceSpan, "Cannot find message for id '" + messageId + "', content '" + message.content + "'.");
            }
        });
        return res;
    };
    I18nHtmlParser.prototype._replaceInterpolationInAttr = function (attr, msg) {
        var split = this._expressionParser.splitInterpolation(attr.value, attr.sourceSpan.toString(), this._interpolationConfig);
        var exps = lang_1.isPresent(split) ? split.expressions : [];
        var first = msg[0];
        var last = msg[msg.length - 1];
        var start = first.sourceSpan.start.offset;
        var end = last instanceof html_ast_1.HtmlElementAst ? last.endSourceSpan.end.offset : last.sourceSpan.end.offset;
        var messageSubstring = this._messagesContent.substring(start, end);
        return this._replacePlaceholdersWithInterpolations(messageSubstring, exps, attr.sourceSpan);
    };
    ;
    I18nHtmlParser.prototype._replacePlaceholdersWithInterpolations = function (message, exps, sourceSpan) {
        var _this = this;
        var expMap = this._buildExprMap(exps);
        return message.replace(_PLACEHOLDER_EXPANDED_REGEXP, function (_, name) { return _this._convertIntoExpression(name, expMap, sourceSpan); });
    };
    I18nHtmlParser.prototype._buildExprMap = function (exps) {
        var expMap = new Map();
        var usedNames = new Map();
        for (var i = 0; i < exps.length; i++) {
            var phName = shared_1.extractPhNameFromInterpolation(exps[i], i);
            expMap.set(shared_1.dedupePhName(usedNames, phName), exps[i]);
        }
        return expMap;
    };
    I18nHtmlParser.prototype._convertIntoExpression = function (name, expMap, sourceSpan) {
        if (expMap.has(name)) {
            return "" + this._interpolationConfig.start + expMap.get(name) + this._interpolationConfig.end;
        }
        throw new shared_1.I18nError(sourceSpan, "Invalid interpolation name '" + name + "'");
    };
    return I18nHtmlParser;
}());
exports.I18nHtmlParser = I18nHtmlParser;
// Creates a list of elements and text nodes in the AST
// The indexes match the placeholders indexes
var _NodeMappingVisitor = (function () {
    function _NodeMappingVisitor() {
        this.mapping = [];
    }
    _NodeMappingVisitor.prototype.visitElement = function (ast, context) {
        this.mapping.push(ast);
        html_ast_1.htmlVisitAll(this, ast.children);
    };
    _NodeMappingVisitor.prototype.visitText = function (ast, context) { this.mapping.push(ast); };
    _NodeMappingVisitor.prototype.visitAttr = function (ast, context) { };
    _NodeMappingVisitor.prototype.visitExpansion = function (ast, context) { };
    _NodeMappingVisitor.prototype.visitExpansionCase = function (ast, context) { };
    _NodeMappingVisitor.prototype.visitComment = function (ast, context) { };
    return _NodeMappingVisitor;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9odG1sX3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2kxOG4vaTE4bl9odG1sX3BhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBR0gsMkJBQTRDLHNCQUFzQixDQUFDLENBQUE7QUFDbkUsMkJBQTRCLHNCQUFzQixDQUFDLENBQUE7QUFDbkQscUJBQXNELGdCQUFnQixDQUFDLENBQUE7QUFDdkUseUJBQXNKLGFBQWEsQ0FBQyxDQUFBO0FBQ3BLLDRCQUE4QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQy9ELHFDQUFnRSx5QkFBeUIsQ0FBQyxDQUFBO0FBRTFGLHdCQUEwQixXQUFXLENBQUMsQ0FBQTtBQUN0Qyx1QkFBb0ssVUFBVSxDQUFDLENBQUE7QUFFL0ssSUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUM7QUFDbEMsSUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDO0FBQzFCLElBQU0sNEJBQTRCLEdBQUcsNkJBQTZCLENBQUM7QUFFbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBQ0g7SUFJRSx3QkFDWSxXQUF1QixFQUFTLGlCQUFtQyxFQUNuRSxnQkFBd0IsRUFBVSxTQUFxQyxFQUN2RSxhQUF1QixFQUFVLGNBQXVDO1FBRnhFLGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuRSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQVE7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUE0QjtRQUN2RSxrQkFBYSxHQUFiLGFBQWEsQ0FBVTtRQUFVLG1CQUFjLEdBQWQsY0FBYyxDQUF5QjtJQUFHLENBQUM7SUFFeEYsOEJBQUssR0FBTCxVQUNJLGFBQXFCLEVBQUUsU0FBaUIsRUFBRSxtQkFBb0MsRUFDOUUsbUJBQXVFO1FBRDdCLG1DQUFvQyxHQUFwQywyQkFB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