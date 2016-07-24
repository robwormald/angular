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
var css_lexer_1 = require('./css_lexer');
(function (BlockType) {
    BlockType[BlockType["Import"] = 0] = "Import";
    BlockType[BlockType["Charset"] = 1] = "Charset";
    BlockType[BlockType["Namespace"] = 2] = "Namespace";
    BlockType[BlockType["Supports"] = 3] = "Supports";
    BlockType[BlockType["Keyframes"] = 4] = "Keyframes";
    BlockType[BlockType["MediaQuery"] = 5] = "MediaQuery";
    BlockType[BlockType["Selector"] = 6] = "Selector";
    BlockType[BlockType["FontFace"] = 7] = "FontFace";
    BlockType[BlockType["Page"] = 8] = "Page";
    BlockType[BlockType["Document"] = 9] = "Document";
    BlockType[BlockType["Viewport"] = 10] = "Viewport";
    BlockType[BlockType["Unsupported"] = 11] = "Unsupported";
})(exports.BlockType || (exports.BlockType = {}));
var BlockType = exports.BlockType;
var CssAst = (function () {
    function CssAst(location) {
        this.location = location;
    }
    Object.defineProperty(CssAst.prototype, "start", {
        get: function () { return this.location.start; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CssAst.prototype, "end", {
        get: function () { return this.location.end; },
        enumerable: true,
        configurable: true
    });
    return CssAst;
}());
exports.CssAst = CssAst;
var CssStyleValueAst = (function (_super) {
    __extends(CssStyleValueAst, _super);
    function CssStyleValueAst(location, tokens, strValue) {
        _super.call(this, location);
        this.tokens = tokens;
        this.strValue = strValue;
    }
    CssStyleValueAst.prototype.visit = function (visitor, context) { return visitor.visitCssValue(this); };
    return CssStyleValueAst;
}(CssAst));
exports.CssStyleValueAst = CssStyleValueAst;
var CssRuleAst = (function (_super) {
    __extends(CssRuleAst, _super);
    function CssRuleAst(location) {
        _super.call(this, location);
    }
    return CssRuleAst;
}(CssAst));
exports.CssRuleAst = CssRuleAst;
var CssBlockRuleAst = (function (_super) {
    __extends(CssBlockRuleAst, _super);
    function CssBlockRuleAst(location, type, block, name) {
        if (name === void 0) { name = null; }
        _super.call(this, location);
        this.location = location;
        this.type = type;
        this.block = block;
        this.name = name;
    }
    CssBlockRuleAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssBlock(this.block, context);
    };
    return CssBlockRuleAst;
}(CssRuleAst));
exports.CssBlockRuleAst = CssBlockRuleAst;
var CssKeyframeRuleAst = (function (_super) {
    __extends(CssKeyframeRuleAst, _super);
    function CssKeyframeRuleAst(location, name, block) {
        _super.call(this, location, BlockType.Keyframes, block, name);
    }
    CssKeyframeRuleAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssKeyframeRule(this, context);
    };
    return CssKeyframeRuleAst;
}(CssBlockRuleAst));
exports.CssKeyframeRuleAst = CssKeyframeRuleAst;
var CssKeyframeDefinitionAst = (function (_super) {
    __extends(CssKeyframeDefinitionAst, _super);
    function CssKeyframeDefinitionAst(location, steps, block) {
        _super.call(this, location, BlockType.Keyframes, block, mergeTokens(steps, ','));
        this.steps = steps;
    }
    CssKeyframeDefinitionAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssKeyframeDefinition(this, context);
    };
    return CssKeyframeDefinitionAst;
}(CssBlockRuleAst));
exports.CssKeyframeDefinitionAst = CssKeyframeDefinitionAst;
var CssBlockDefinitionRuleAst = (function (_super) {
    __extends(CssBlockDefinitionRuleAst, _super);
    function CssBlockDefinitionRuleAst(location, strValue, type, query, block) {
        _super.call(this, location, type, block);
        this.strValue = strValue;
        this.query = query;
        var firstCssToken = query.tokens[0];
        this.name = new css_lexer_1.CssToken(firstCssToken.index, firstCssToken.column, firstCssToken.line, css_lexer_1.CssTokenType.Identifier, this.strValue);
    }
    CssBlockDefinitionRuleAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssBlock(this.block, context);
    };
    return CssBlockDefinitionRuleAst;
}(CssBlockRuleAst));
exports.CssBlockDefinitionRuleAst = CssBlockDefinitionRuleAst;
var CssMediaQueryRuleAst = (function (_super) {
    __extends(CssMediaQueryRuleAst, _super);
    function CssMediaQueryRuleAst(location, strValue, query, block) {
        _super.call(this, location, strValue, BlockType.MediaQuery, query, block);
    }
    CssMediaQueryRuleAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssMediaQueryRule(this, context);
    };
    return CssMediaQueryRuleAst;
}(CssBlockDefinitionRuleAst));
exports.CssMediaQueryRuleAst = CssMediaQueryRuleAst;
var CssAtRulePredicateAst = (function (_super) {
    __extends(CssAtRulePredicateAst, _super);
    function CssAtRulePredicateAst(location, strValue, tokens) {
        _super.call(this, location);
        this.strValue = strValue;
        this.tokens = tokens;
    }
    CssAtRulePredicateAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssAtRulePredicate(this, context);
    };
    return CssAtRulePredicateAst;
}(CssAst));
exports.CssAtRulePredicateAst = CssAtRulePredicateAst;
var CssInlineRuleAst = (function (_super) {
    __extends(CssInlineRuleAst, _super);
    function CssInlineRuleAst(location, type, value) {
        _super.call(this, location);
        this.type = type;
        this.value = value;
    }
    CssInlineRuleAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssInlineRule(this, context);
    };
    return CssInlineRuleAst;
}(CssRuleAst));
exports.CssInlineRuleAst = CssInlineRuleAst;
var CssSelectorRuleAst = (function (_super) {
    __extends(CssSelectorRuleAst, _super);
    function CssSelectorRuleAst(location, selectors, block) {
        _super.call(this, location, BlockType.Selector, block);
        this.selectors = selectors;
        this.strValue = selectors.map(function (selector) { return selector.strValue; }).join(',');
    }
    CssSelectorRuleAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssSelectorRule(this, context);
    };
    return CssSelectorRuleAst;
}(CssBlockRuleAst));
exports.CssSelectorRuleAst = CssSelectorRuleAst;
var CssDefinitionAst = (function (_super) {
    __extends(CssDefinitionAst, _super);
    function CssDefinitionAst(location, property, value) {
        _super.call(this, location);
        this.property = property;
        this.value = value;
    }
    CssDefinitionAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssDefinition(this, context);
    };
    return CssDefinitionAst;
}(CssAst));
exports.CssDefinitionAst = CssDefinitionAst;
var CssSelectorPartAst = (function (_super) {
    __extends(CssSelectorPartAst, _super);
    function CssSelectorPartAst(location) {
        _super.call(this, location);
    }
    return CssSelectorPartAst;
}(CssAst));
exports.CssSelectorPartAst = CssSelectorPartAst;
var CssSelectorAst = (function (_super) {
    __extends(CssSelectorAst, _super);
    function CssSelectorAst(location, selectorParts) {
        _super.call(this, location);
        this.selectorParts = selectorParts;
        this.strValue = selectorParts.map(function (part) { return part.strValue; }).join('');
    }
    CssSelectorAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssSelector(this, context);
    };
    return CssSelectorAst;
}(CssSelectorPartAst));
exports.CssSelectorAst = CssSelectorAst;
var CssSimpleSelectorAst = (function (_super) {
    __extends(CssSimpleSelectorAst, _super);
    function CssSimpleSelectorAst(location, tokens, strValue, pseudoSelectors, operator) {
        _super.call(this, location);
        this.tokens = tokens;
        this.strValue = strValue;
        this.pseudoSelectors = pseudoSelectors;
        this.operator = operator;
    }
    CssSimpleSelectorAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssSimpleSelector(this, context);
    };
    return CssSimpleSelectorAst;
}(CssSelectorPartAst));
exports.CssSimpleSelectorAst = CssSimpleSelectorAst;
var CssPseudoSelectorAst = (function (_super) {
    __extends(CssPseudoSelectorAst, _super);
    function CssPseudoSelectorAst(location, strValue, name, tokens, innerSelectors) {
        _super.call(this, location);
        this.strValue = strValue;
        this.name = name;
        this.tokens = tokens;
        this.innerSelectors = innerSelectors;
    }
    CssPseudoSelectorAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssPseudoSelector(this, context);
    };
    return CssPseudoSelectorAst;
}(CssSelectorPartAst));
exports.CssPseudoSelectorAst = CssPseudoSelectorAst;
var CssBlockAst = (function (_super) {
    __extends(CssBlockAst, _super);
    function CssBlockAst(location, entries) {
        _super.call(this, location);
        this.entries = entries;
    }
    CssBlockAst.prototype.visit = function (visitor, context) { return visitor.visitCssBlock(this, context); };
    return CssBlockAst;
}(CssAst));
exports.CssBlockAst = CssBlockAst;
/*
 a style block is different from a standard block because it contains
 css prop:value definitions. A regular block can contain a list of Ast entries.
 */
var CssStylesBlockAst = (function (_super) {
    __extends(CssStylesBlockAst, _super);
    function CssStylesBlockAst(location, definitions) {
        _super.call(this, location, definitions);
        this.definitions = definitions;
    }
    CssStylesBlockAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssStylesBlock(this, context);
    };
    return CssStylesBlockAst;
}(CssBlockAst));
exports.CssStylesBlockAst = CssStylesBlockAst;
var CssStyleSheetAst = (function (_super) {
    __extends(CssStyleSheetAst, _super);
    function CssStyleSheetAst(location, rules) {
        _super.call(this, location);
        this.rules = rules;
    }
    CssStyleSheetAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssStyleSheet(this, context);
    };
    return CssStyleSheetAst;
}(CssAst));
exports.CssStyleSheetAst = CssStyleSheetAst;
var CssUnknownRuleAst = (function (_super) {
    __extends(CssUnknownRuleAst, _super);
    function CssUnknownRuleAst(location, ruleName, tokens) {
        _super.call(this, location);
        this.ruleName = ruleName;
        this.tokens = tokens;
    }
    CssUnknownRuleAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssUnknownRule(this, context);
    };
    return CssUnknownRuleAst;
}(CssRuleAst));
exports.CssUnknownRuleAst = CssUnknownRuleAst;
var CssUnknownTokenListAst = (function (_super) {
    __extends(CssUnknownTokenListAst, _super);
    function CssUnknownTokenListAst(location, name, tokens) {
        _super.call(this, location);
        this.name = name;
        this.tokens = tokens;
    }
    CssUnknownTokenListAst.prototype.visit = function (visitor, context) {
        return visitor.visitCssUnknownTokenList(this, context);
    };
    return CssUnknownTokenListAst;
}(CssRuleAst));
exports.CssUnknownTokenListAst = CssUnknownTokenListAst;
function mergeTokens(tokens, separator) {
    if (separator === void 0) { separator = ''; }
    var mainToken = tokens[0];
    var str = mainToken.strValue;
    for (var i = 1; i < tokens.length; i++) {
        str += separator + tokens[i].strValue;
    }
    return new css_lexer_1.CssToken(mainToken.index, mainToken.column, mainToken.line, mainToken.type, str);
}
exports.mergeTokens = mergeTokens;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NzX2FzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2Nzc19hc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsMEJBQXFDLGFBQWEsQ0FBQyxDQUFBO0FBR25ELFdBQVksU0FBUztJQUNuQiw2Q0FBTSxDQUFBO0lBQ04sK0NBQU8sQ0FBQTtJQUNQLG1EQUFTLENBQUE7SUFDVCxpREFBUSxDQUFBO0lBQ1IsbURBQVMsQ0FBQTtJQUNULHFEQUFVLENBQUE7SUFDVixpREFBUSxDQUFBO0lBQ1IsaURBQVEsQ0FBQTtJQUNSLHlDQUFJLENBQUE7SUFDSixpREFBUSxDQUFBO0lBQ1Isa0RBQVEsQ0FBQTtJQUNSLHdEQUFXLENBQUE7QUFDYixDQUFDLEVBYlcsaUJBQVMsS0FBVCxpQkFBUyxRQWFwQjtBQWJELElBQVksU0FBUyxHQUFULGlCQWFYLENBQUE7QUFxQkQ7SUFDRSxnQkFBbUIsUUFBeUI7UUFBekIsYUFBUSxHQUFSLFFBQVEsQ0FBaUI7SUFBRyxDQUFDO0lBQ2hELHNCQUFJLHlCQUFLO2FBQVQsY0FBNkIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDMUQsc0JBQUksdUJBQUc7YUFBUCxjQUEyQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUV4RCxhQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFMcUIsY0FBTSxTQUszQixDQUFBO0FBRUQ7SUFBc0Msb0NBQU07SUFDMUMsMEJBQVksUUFBeUIsRUFBUyxNQUFrQixFQUFTLFFBQWdCO1FBQ3ZGLGtCQUFNLFFBQVEsQ0FBQyxDQUFDO1FBRDRCLFdBQU0sR0FBTixNQUFNLENBQVk7UUFBUyxhQUFRLEdBQVIsUUFBUSxDQUFRO0lBRXpGLENBQUM7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