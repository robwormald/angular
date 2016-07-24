/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_private_1 = require('../../core_private');
var lang_1 = require('../facade/lang');
var identifiers_1 = require('../identifiers');
var o = require('../output/output_ast');
var constants_1 = require('./constants');
var template_ast_1 = require('../template_ast');
var util_1 = require('../util');
var expression_converter_1 = require('./expression_converter');
var compile_binding_1 = require('./compile_binding');
var core_1 = require('@angular/core');
function createBindFieldExpr(exprIndex) {
    return o.THIS_EXPR.prop("_expr_" + exprIndex);
}
function createCurrValueExpr(exprIndex) {
    return o.variable("currVal_" + exprIndex); // fix syntax highlighting: `
}
var _animationViewCheckedFlagMap = new Map();
function bind(view, currValExpr, fieldExpr, parsedExpression, context, actions, method) {
    var checkExpression = expression_converter_1.convertCdExpressionToIr(view, context, parsedExpression, constants_1.DetectChangesVars.valUnwrapper);
    if (lang_1.isBlank(checkExpression.expression)) {
        // e.g. an empty expression was given
        return;
    }
    // private is fine here as no child view will reference the cached value...
    view.fields.push(new o.ClassField(fieldExpr.name, null, [o.StmtModifier.Private]));
    view.createMethod.addStmt(o.THIS_EXPR.prop(fieldExpr.name).set(o.importExpr(identifiers_1.Identifiers.UNINITIALIZED)).toStmt());
    if (checkExpression.needsValueUnwrapper) {
        var initValueUnwrapperStmt = constants_1.DetectChangesVars.valUnwrapper.callMethod('reset', []).toStmt();
        method.addStmt(initValueUnwrapperStmt);
    }
    method.addStmt(currValExpr.set(checkExpression.expression).toDeclStmt(null, [o.StmtModifier.Final]));
    var condition = o.importExpr(identifiers_1.Identifiers.checkBinding).callFn([
        constants_1.DetectChangesVars.throwOnChange, fieldExpr, currValExpr
    ]);
    if (checkExpression.needsValueUnwrapper) {
        condition = constants_1.DetectChangesVars.valUnwrapper.prop('hasWrappedValue').or(condition);
    }
    method.addStmt(new o.IfStmt(condition, actions.concat([o.THIS_EXPR.prop(fieldExpr.name).set(currValExpr).toStmt()])));
}
function bindRenderText(boundText, compileNode, view) {
    var bindingIndex = view.bindings.length;
    view.bindings.push(new compile_binding_1.CompileBinding(compileNode, boundText));
    var currValExpr = createCurrValueExpr(bindingIndex);
    var valueField = createBindFieldExpr(bindingIndex);
    view.detectChangesRenderPropertiesMethod.resetDebugInfo(compileNode.nodeIndex, boundText);
    bind(view, currValExpr, valueField, boundText.value, view.componentContext, [o.THIS_EXPR.prop('renderer')
            .callMethod('setText', [compileNode.renderNode, currValExpr])
            .toStmt()], view.detectChangesRenderPropertiesMethod);
}
exports.bindRenderText = bindRenderText;
function bindAndWriteToRenderer(boundProps, context, compileElement, isHostProp) {
    var view = compileElement.view;
    var renderNode = compileElement.renderNode;
    boundProps.forEach(function (boundProp) {
        var bindingIndex = view.bindings.length;
        view.bindings.push(new compile_binding_1.CompileBinding(compileElement, boundProp));
        view.detectChangesRenderPropertiesMethod.resetDebugInfo(compileElement.nodeIndex, boundProp);
        var fieldExpr = createBindFieldExpr(bindingIndex);
        var currValExpr = createCurrValueExpr(bindingIndex);
        var renderMethod;
        var oldRenderValue = sanitizedValue(boundProp, fieldExpr);
        var renderValue = sanitizedValue(boundProp, currValExpr);
        var updateStmts = [];
        switch (boundProp.type) {
            case template_ast_1.PropertyBindingType.Property:
                if (view.genConfig.logBindingUpdate) {
                    updateStmts.push(logBindingUpdateStmt(renderNode, boundProp.name, renderValue));
                }
                updateStmts.push(o.THIS_EXPR.prop('renderer')
                    .callMethod('setElementProperty', [renderNode, o.literal(boundProp.name), renderValue])
                    .toStmt());
                break;
            case template_ast_1.PropertyBindingType.Attribute:
                renderValue =
                    renderValue.isBlank().conditional(o.NULL_EXPR, renderValue.callMethod('toString', []));
                updateStmts.push(o.THIS_EXPR.prop('renderer')
                    .callMethod('setElementAttribute', [renderNode, o.literal(boundProp.name), renderValue])
                    .toStmt());
                break;
            case template_ast_1.PropertyBindingType.Class:
                updateStmts.push(o.THIS_EXPR.prop('renderer')
                    .callMethod('setElementClass', [renderNode, o.literal(boundProp.name), renderValue])
                    .toStmt());
                break;
            case template_ast_1.PropertyBindingType.Style:
                var strValue = renderValue.callMethod('toString', []);
                if (lang_1.isPresent(boundProp.unit)) {
                    strValue = strValue.plus(o.literal(boundProp.unit));
                }
                renderValue = renderValue.isBlank().conditional(o.NULL_EXPR, strValue);
                updateStmts.push(o.THIS_EXPR.prop('renderer')
                    .callMethod('setElementStyle', [renderNode, o.literal(boundProp.name), renderValue])
                    .toStmt());
                break;
            case template_ast_1.PropertyBindingType.Animation:
                var animationName = boundProp.name;
                var targetViewExpr = o.THIS_EXPR;
                if (isHostProp) {
                    targetViewExpr = compileElement.appElement.prop('componentView');
                }
                var animationFnExpr = targetViewExpr.prop('componentType').prop('animations').key(o.literal(animationName));
                // it's important to normalize the void value as `void` explicitly
                // so that the styles data can be obtained from the stringmap
                var emptyStateValue = o.literal(core_private_1.EMPTY_STATE);
                // void => ...
                var oldRenderVar = o.variable('oldRenderVar');
                updateStmts.push(oldRenderVar.set(oldRenderValue).toDeclStmt());
                updateStmts.push(new o.IfStmt(oldRenderVar.equals(o.importExpr(identifiers_1.Identifiers.UNINITIALIZED)), [oldRenderVar.set(emptyStateValue).toStmt()]));
                // ... => void
                var newRenderVar = o.variable('newRenderVar');
                updateStmts.push(newRenderVar.set(renderValue).toDeclStmt());
                updateStmts.push(new o.IfStmt(newRenderVar.equals(o.importExpr(identifiers_1.Identifiers.UNINITIALIZED)), [newRenderVar.set(emptyStateValue).toStmt()]));
                updateStmts.push(animationFnExpr.callFn([o.THIS_EXPR, renderNode, oldRenderVar, newRenderVar]).toStmt());
                view.detachMethod.addStmt(animationFnExpr.callFn([o.THIS_EXPR, renderNode, oldRenderValue, emptyStateValue])
                    .toStmt());
                if (!_animationViewCheckedFlagMap.get(view)) {
                    _animationViewCheckedFlagMap.set(view, true);
                    var triggerStmt = o.THIS_EXPR.callMethod('triggerQueuedAnimations', []).toStmt();
                    view.afterViewLifecycleCallbacksMethod.addStmt(triggerStmt);
                    view.detachMethod.addStmt(triggerStmt);
                }
                break;
        }
        bind(view, currValExpr, fieldExpr, boundProp.value, context, updateStmts, view.detectChangesRenderPropertiesMethod);
    });
}
function sanitizedValue(boundProp, renderValue) {
    var enumValue;
    switch (boundProp.securityContext) {
        case core_1.SecurityContext.NONE:
            return renderValue; // No sanitization needed.
        case core_1.SecurityContext.HTML:
            enumValue = 'HTML';
            break;
        case core_1.SecurityContext.STYLE:
            enumValue = 'STYLE';
            break;
        case core_1.SecurityContext.SCRIPT:
            enumValue = 'SCRIPT';
            break;
        case core_1.SecurityContext.URL:
            enumValue = 'URL';
            break;
        case core_1.SecurityContext.RESOURCE_URL:
            enumValue = 'RESOURCE_URL';
            break;
        default:
            throw new Error("internal error, unexpected SecurityContext " + boundProp.securityContext + ".");
    }
    var ctx = constants_1.ViewProperties.viewUtils.prop('sanitizer');
    var args = [o.importExpr(identifiers_1.Identifiers.SecurityContext).prop(enumValue), renderValue];
    return ctx.callMethod('sanitize', args);
}
function bindRenderInputs(boundProps, compileElement) {
    bindAndWriteToRenderer(boundProps, compileElement.view.componentContext, compileElement, false);
}
exports.bindRenderInputs = bindRenderInputs;
function bindDirectiveHostProps(directiveAst, directiveInstance, compileElement) {
    bindAndWriteToRenderer(directiveAst.hostProperties, directiveInstance, compileElement, true);
}
exports.bindDirectiveHostProps = bindDirectiveHostProps;
function bindDirectiveInputs(directiveAst, directiveInstance, compileElement) {
    if (directiveAst.inputs.length === 0) {
        return;
    }
    var view = compileElement.view;
    var detectChangesInInputsMethod = view.detectChangesInInputsMethod;
    detectChangesInInputsMethod.resetDebugInfo(compileElement.nodeIndex, compileElement.sourceAst);
    var lifecycleHooks = directiveAst.directive.lifecycleHooks;
    var calcChangesMap = lifecycleHooks.indexOf(core_private_1.LifecycleHooks.OnChanges) !== -1;
    var isOnPushComp = directiveAst.directive.isComponent &&
        !core_private_1.isDefaultChangeDetectionStrategy(directiveAst.directive.changeDetection);
    if (calcChangesMap) {
        detectChangesInInputsMethod.addStmt(constants_1.DetectChangesVars.changes.set(o.NULL_EXPR).toStmt());
    }
    if (isOnPushComp) {
        detectChangesInInputsMethod.addStmt(constants_1.DetectChangesVars.changed.set(o.literal(false)).toStmt());
    }
    directiveAst.inputs.forEach(function (input) {
        var bindingIndex = view.bindings.length;
        view.bindings.push(new compile_binding_1.CompileBinding(compileElement, input));
        detectChangesInInputsMethod.resetDebugInfo(compileElement.nodeIndex, input);
        var fieldExpr = createBindFieldExpr(bindingIndex);
        var currValExpr = createCurrValueExpr(bindingIndex);
        var statements = [directiveInstance.prop(input.directiveName).set(currValExpr).toStmt()];
        if (calcChangesMap) {
            statements.push(new o.IfStmt(constants_1.DetectChangesVars.changes.identical(o.NULL_EXPR), [constants_1.DetectChangesVars.changes
                    .set(o.literalMap([], new o.MapType(o.importType(identifiers_1.Identifiers.SimpleChange))))
                    .toStmt()]));
            statements.push(constants_1.DetectChangesVars.changes.key(o.literal(input.directiveName))
                .set(o.importExpr(identifiers_1.Identifiers.SimpleChange).instantiate([fieldExpr, currValExpr]))
                .toStmt());
        }
        if (isOnPushComp) {
            statements.push(constants_1.DetectChangesVars.changed.set(o.literal(true)).toStmt());
        }
        if (view.genConfig.logBindingUpdate) {
            statements.push(logBindingUpdateStmt(compileElement.renderNode, input.directiveName, currValExpr));
        }
        bind(view, currValExpr, fieldExpr, input.value, view.componentContext, statements, detectChangesInInputsMethod);
    });
    if (isOnPushComp) {
        detectChangesInInputsMethod.addStmt(new o.IfStmt(constants_1.DetectChangesVars.changed, [
            compileElement.appElement.prop('componentView').callMethod('markAsCheckOnce', []).toStmt()
        ]));
    }
}
exports.bindDirectiveInputs = bindDirectiveInputs;
function logBindingUpdateStmt(renderNode, propName, value) {
    var tryStmt = o.THIS_EXPR.prop('renderer')
        .callMethod('setBindingDebugInfo', [
        renderNode, o.literal("ng-reflect-" + util_1.camelCaseToDashCase(propName)),
        value.isBlank().conditional(o.NULL_EXPR, value.callMethod('toString', []))
    ])
        .toStmt();
    var catchStmt = o.THIS_EXPR.prop('renderer')
        .callMethod('setBindingDebugInfo', [
        renderNode, o.literal("ng-reflect-" + util_1.camelCaseToDashCase(propName)),
        o.literal('[ERROR] Exception while trying to serialize the value')
    ])
        .toStmt();
    return new o.TryCatchStmt([tryStmt], [catchStmt]);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvcGVydHlfYmluZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci9zcmMvdmlld19jb21waWxlci9wcm9wZXJ0eV9iaW5kZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILDZCQUFxRyxvQkFBb0IsQ0FBQyxDQUFBO0FBRTFILHFCQUFpQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ2xELDRCQUEwQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQzNDLElBQVksQ0FBQyxXQUFNLHNCQUFzQixDQUFDLENBQUE7QUFDMUMsMEJBQWdELGFBQWEsQ0FBQyxDQUFBO0FBQzlELDZCQUF3RixpQkFBaUIsQ0FBQyxDQUFBO0FBSTFHLHFCQUFrQyxTQUFTLENBQUMsQ0FBQTtBQUM1QyxxQ0FBc0Msd0JBQXdCLENBQUMsQ0FBQTtBQUMvRCxnQ0FBNkIsbUJBQW1CLENBQUMsQ0FBQTtBQUNqRCxxQkFBOEIsZUFBZSxDQUFDLENBQUE7QUFFOUMsNkJBQTZCLFNBQWlCO0lBQzVDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFTLFNBQVcsQ0FBQyxDQUFDO0FBQ2hELENBQUM7QUFFRCw2QkFBNkIsU0FBaUI7SUFDNUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBVyxTQUFXLENBQUMsQ0FBQyxDQUFFLDZCQUE2QjtBQUMzRSxDQUFDO0FBRUQsSUFBTSw0QkFBNEIsR0FBRyxJQUFJLEdBQUcsRUFBd0IsQ0FBQztBQUVyRSxjQUNJLElBQWlCLEVBQUUsV0FBMEIsRUFBRSxTQUF5QixFQUN4RSxnQkFBMkIsRUFBRSxPQUFxQixFQUFFLE9BQXNCLEVBQzFFLE1BQXFCO0lBQ3ZCLElBQUksZUFBZSxHQUNmLDhDQUF1QixDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsNkJBQWlCLENBQUMsWUFBWSxDQUFD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