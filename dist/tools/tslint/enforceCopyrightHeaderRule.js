"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var walker_1 = require('tslint/lib/language/walker');
var rules_1 = require('tslint/lib/rules');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var walker = new EnforceCopyrightHeaderWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(walker);
    };
    Rule.FAILURE_STRING = 'missing copyright header';
    return Rule;
}(rules_1.AbstractRule));
exports.Rule = Rule;
var EnforceCopyrightHeaderWalker = (function (_super) {
    __extends(EnforceCopyrightHeaderWalker, _super);
    function EnforceCopyrightHeaderWalker() {
        _super.apply(this, arguments);
        this.regex = /\/\*[\s\S]*?Copyright Google Inc\.[\s\S]*?\*\//;
    }
    EnforceCopyrightHeaderWalker.prototype.visitSourceFile = function (node) {
        // check for a shebang
        var text = node.getFullText();
        var offset = 0;
        if (text.indexOf('#!') === 0) {
            offset = text.indexOf('\n') + 1;
            text = text.substring(offset);
        }
        // look for the copyright header
        var match = text.match(this.regex);
        if (!match || match.index !== 0) {
            this.addFailure(this.createFailure(offset, offset + 1, Rule.FAILURE_STRING));
        }
    };
    return EnforceCopyrightHeaderWalker;
}(walker_1.RuleWalker));
//# sourceMappingURL=enforceCopyrightHeaderRule.js.map