/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var compile_metadata_1 = require('./compile_metadata');
var o = require('./output/output_ast');
var shadow_css_1 = require('./shadow_css');
var url_resolver_1 = require('./url_resolver');
var COMPONENT_VARIABLE = '%COMP%';
var HOST_ATTR = "_nghost-" + COMPONENT_VARIABLE;
var CONTENT_ATTR = "_ngcontent-" + COMPONENT_VARIABLE;
var StylesCompileDependency = (function () {
    function StylesCompileDependency(moduleUrl, isShimmed, valuePlaceholder) {
        this.moduleUrl = moduleUrl;
        this.isShimmed = isShimmed;
        this.valuePlaceholder = valuePlaceholder;
    }
    return StylesCompileDependency;
}());
exports.StylesCompileDependency = StylesCompileDependency;
var StylesCompileResult = (function () {
    function StylesCompileResult(componentStylesheet, externalStylesheets) {
        this.componentStylesheet = componentStylesheet;
        this.externalStylesheets = externalStylesheets;
    }
    return StylesCompileResult;
}());
exports.StylesCompileResult = StylesCompileResult;
var CompiledStylesheet = (function () {
    function CompiledStylesheet(statements, stylesVar, dependencies, isShimmed, meta) {
        this.statements = statements;
        this.stylesVar = stylesVar;
        this.dependencies = dependencies;
        this.isShimmed = isShimmed;
        this.meta = meta;
    }
    return CompiledStylesheet;
}());
exports.CompiledStylesheet = CompiledStylesheet;
var StyleCompiler = (function () {
    function StyleCompiler(_urlResolver) {
        this._urlResolver = _urlResolver;
        this._shadowCss = new shadow_css_1.ShadowCss();
    }
    StyleCompiler.prototype.compileComponent = function (comp) {
        var _this = this;
        var externalStylesheets = [];
        var componentStylesheet = this._compileStyles(comp, new compile_metadata_1.CompileStylesheetMetadata({
            styles: comp.template.styles,
            styleUrls: comp.template.styleUrls,
            moduleUrl: comp.type.moduleUrl
        }), true);
        comp.template.externalStylesheets.forEach(function (stylesheetMeta) {
            var compiledStylesheet = _this._compileStyles(comp, stylesheetMeta, false);
            externalStylesheets.push(compiledStylesheet);
        });
        return new StylesCompileResult(componentStylesheet, externalStylesheets);
    };
    StyleCompiler.prototype._compileStyles = function (comp, stylesheet, isComponentStylesheet) {
        var _this = this;
        var shim = comp.template.encapsulation === core_1.ViewEncapsulation.Emulated;
        var styleExpressions = stylesheet.styles.map(function (plainStyle) { return o.literal(_this._shimIfNeeded(plainStyle, shim)); });
        var dependencies = [];
        for (var i = 0; i < stylesheet.styleUrls.length; i++) {
            var identifier = new compile_metadata_1.CompileIdentifierMetadata({ name: getStylesVarName(null) });
            dependencies.push(new StylesCompileDependency(stylesheet.styleUrls[i], shim, identifier));
            styleExpressions.push(new o.ExternalExpr(identifier));
        }
        // styles variable contains plain strings and arrays of other styles arrays (recursive),
        // so we set its type to dynamic.
        var stylesVar = getStylesVarName(isComponentStylesheet ? comp : null);
        var stmt = o.variable(stylesVar)
            .set(o.literalArr(styleExpressions, new o.ArrayType(o.DYNAMIC_TYPE, [o.TypeModifier.Const])))
            .toDeclStmt(null, [o.StmtModifier.Final]);
        return new CompiledStylesheet([stmt], stylesVar, dependencies, shim, stylesheet);
    };
    StyleCompiler.prototype._shimIfNeeded = function (style, shim) {
        return shim ? this._shadowCss.shimCssText(style, CONTENT_ATTR, HOST_ATTR) : style;
    };
    /** @nocollapse */
    StyleCompiler.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    StyleCompiler.ctorParameters = [
        { type: url_resolver_1.UrlResolver, },
    ];
    return StyleCompiler;
}());
exports.StyleCompiler = StyleCompiler;
function getStylesVarName(component) {
    var result = "styles";
    if (component) {
        result += "_" + component.type.name;
    }
    return result;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVfY29tcGlsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9zdHlsZV9jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQTRDLGVBQWUsQ0FBQyxDQUFBO0FBQzVELGlDQUE2RixvQkFBb0IsQ0FBQyxDQUFBO0FBQ2xILElBQVksQ0FBQyxXQUFNLHFCQUFxQixDQUFDLENBQUE7QUFDekMsMkJBQXdCLGNBQWMsQ0FBQyxDQUFBO0FBQ3ZDLDZCQUEwQixnQkFBZ0IsQ0FBQyxDQUFBO0FBRTNDLElBQU0sa0JBQWtCLEdBQUcsUUFBUSxDQUFDO0FBQ3BDLElBQU0sU0FBUyxHQUFHLGFBQVcsa0JBQW9CLENBQUM7QUFDbEQsSUFBTSxZQUFZLEdBQUcsZ0JBQWMsa0JBQW9CLENBQUM7QUFFeEQ7SUFDRSxpQ0FDVyxTQUFpQixFQUFTLFNBQWtCLEVBQzVDLGdCQUEyQztRQUQzQyxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBUztRQUM1QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQTJCO0lBQUcsQ0FBQztJQUM1RCw4QkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBSlksK0JBQXVCLDBCQUluQyxDQUFBO0FBRUQ7SUFDRSw2QkFDVyxtQkFBdUMsRUFDdkMsbUJBQXlDO1FBRHpDLHdCQUFtQixHQUFuQixtQkFBbUIsQ0FBb0I7UUFDdkMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFzQjtJQUFHLENBQUM7SUFDMUQsMEJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLDJCQUFtQixzQkFJL0IsQ0FBQTtBQUVEO0lBQ0UsNEJBQ1csVUFBeUIsRUFBUyxTQUFpQixFQUNuRCxZQUF1QyxFQUFTLFNBQWtCLEVBQ2xFLElBQStCO1FBRi9CLGVBQVUsR0FBVixVQUFVLENBQWU7UUFBUyxjQUFT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