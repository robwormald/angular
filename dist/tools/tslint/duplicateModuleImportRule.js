"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var walker_1 = require('tslint/lib/language/walker');
var rules_1 = require('tslint/lib/rules');
var ts = require('typescript');
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        var typedefWalker = new ModuleImportWalker(sourceFile, this.getOptions());
        return this.applyWithWalker(typedefWalker);
    };
    Rule.FAILURE_STRING = 'duplicate module import';
    return Rule;
}(rules_1.AbstractRule));
exports.Rule = Rule;
var ModuleImportWalker = (function (_super) {
    __extends(ModuleImportWalker, _super);
    function ModuleImportWalker() {
        _super.apply(this, arguments);
        this.importModulesSeen = [];
    }
    ModuleImportWalker.prototype.visitImportDeclaration = function (node) {
        this.visitModuleSpecifier(node.moduleSpecifier);
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    ModuleImportWalker.prototype.visitImportEqualsDeclaration = function (node) {
        this.visitModuleSpecifier(node.moduleReference);
        _super.prototype.visitImportEqualsDeclaration.call(this, node);
    };
    ModuleImportWalker.prototype.checkTypeAnnotation = function (location, typeAnnotation, name) {
        if (typeAnnotation == null) {
            var ns = '<name missing>';
            if (name != null && name.kind === ts.SyntaxKind.Identifier) {
                ns = name.text;
            }
            if (ns.charAt(0) === '_')
                return;
            var failure = this.createFailure(location, 1, 'expected parameter ' + ns + ' to have a type');
            this.addFailure(failure);
        }
    };
    ModuleImportWalker.prototype.visitModuleSpecifier = function (moduleSpecifier) {
        var text = moduleSpecifier.getText();
        if (this.importModulesSeen.indexOf(text) >= 0) {
            var failure = this.createFailure(moduleSpecifier.getEnd(), 1, 'Duplicate imports from module ' + text);
            this.addFailure(failure);
        }
        this.importModulesSeen.push(text);
    };
    return ModuleImportWalker;
}(walker_1.RuleWalker));
//# sourceMappingURL=duplicateModuleImportRule.js.map