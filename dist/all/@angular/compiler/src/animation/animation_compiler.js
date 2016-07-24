/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_private_1 = require('../../core_private');
var collection_1 = require('../facade/collection');
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
var identifiers_1 = require('../identifiers');
var o = require('../output/output_ast');
var t = require('../template_ast');
var animation_ast_1 = require('./animation_ast');
var animation_parser_1 = require('./animation_parser');
var CompiledAnimation = (function () {
    function CompiledAnimation(name, statesMapStatement, statesVariableName, fnStatement, fnVariable) {
        this.name = name;
        this.statesMapStatement = statesMapStatement;
        this.statesVariableName = statesVariableName;
        this.fnStatement = fnStatement;
        this.fnVariable = fnVariable;
    }
    return CompiledAnimation;
}());
exports.CompiledAnimation = CompiledAnimation;
var AnimationCompiler = (function () {
    function AnimationCompiler() {
    }
    AnimationCompiler.prototype.compileComponent = function (component, template) {
        var compiledAnimations = [];
        var groupedErrors = [];
        var triggerLookup = {};
        var componentName = component.type.name;
        component.template.animations.forEach(function (entry) {
            var result = animation_parser_1.parseAnimationEntry(entry);
            var triggerName = entry.name;
            if (result.errors.length > 0) {
                var errorMessage = "Unable to parse the animation sequence for \"" + triggerName + "\" due to the following errors:";
                result.errors.forEach(function (error) { errorMessage += '\n-- ' + error.msg; });
                groupedErrors.push(errorMessage);
            }
            if (triggerLookup[triggerName]) {
                groupedErrors.push("The animation trigger \"" + triggerName + "\" has already been registered on \"" + componentName + "\"");
            }
            else {
                var factoryName = componentName + "_" + entry.name;
                var visitor = new _AnimationBuilder(triggerName, factoryName);
                var compileResult = visitor.build(result.ast);
                compiledAnimations.push(compileResult);
                triggerLookup[entry.name] = compileResult;
            }
        });
        _validateAnimationProperties(compiledAnimations, template).forEach(function (entry) {
            groupedErrors.push(entry.msg);
        });
        if (groupedErrors.length > 0) {
            var errorMessageStr = "Animation parsing for " + component.type.name + " has failed due to the following errors:";
            groupedErrors.forEach(function (error) { return errorMessageStr += "\n- " + error; });
            throw new exceptions_1.BaseException(errorMessageStr);
        }
        return compiledAnimations;
    };
    return AnimationCompiler;
}());
exports.AnimationCompiler = AnimationCompiler;
var _ANIMATION_FACTORY_ELEMENT_VAR = o.variable('element');
var _ANIMATION_DEFAULT_STATE_VAR = o.variable('defaultStateStyles');
var _ANIMATION_FACTORY_VIEW_VAR = o.variable('view');
var _ANIMATION_FACTORY_RENDERER_VAR = _ANIMATION_FACTORY_VIEW_VAR.prop('renderer');
var _ANIMATION_CURRENT_STATE_VAR = o.variable('currentState');
var _ANIMATION_NEXT_STATE_VAR = o.variable('nextState');
var _ANIMATION_PLAYER_VAR = o.variable('player');
var _ANIMATION_START_STATE_STYLES_VAR = o.variable('startStateStyles');
var _ANIMATION_END_STATE_STYLES_VAR = o.variable('endStateStyles');
var _ANIMATION_COLLECTED_STYLES = o.variable('collectedStyles');
var EMPTY_MAP = o.literalMap([]);
var _AnimationBuilder = (function () {
    function _AnimationBuilder(animationName, factoryName) {
        this.animationName = animationName;
        this._fnVarName = factoryName + '_factory';
        this._statesMapVarName = factoryName + '_states';
        this._statesMapVar = o.variable(this._statesMapVarName);
    }
    _AnimationBuilder.prototype.visitAnimationStyles = function (ast, context) {
        var stylesArr = [];
        if (context.isExpectingFirstStyleStep) {
            stylesArr.push(_ANIMATION_START_STATE_STYLES_VAR);
            context.isExpectingFirstStyleStep = false;
        }
        ast.styles.forEach(function (entry) {
            stylesArr.push(o.literalMap(collection_1.StringMapWrapper.keys(entry).map(function (key) { return [key, o.literal(entry[key])]; })));
        });
        return o.importExpr(identifiers_1.Identifiers.AnimationStyles).instantiate([
            o.importExpr(identifiers_1.Identifiers.collectAndResolveStyles).callFn([
                _ANIMATION_COLLECTED_STYLES, o.literalArr(stylesArr)
            ])
        ]);
    };
    _AnimationBuilder.prototype.visitAnimationKeyframe = function (ast, context) {
        return o.importExpr(identifiers_1.Identifiers.AnimationKeyframe).instantiate([
            o.literal(ast.offset), ast.styles.visit(this, context)
        ]);
    };
    _AnimationBuilder.prototype.visitAnimationStep = function (ast, context) {
        var _this = this;
        if (context.endStateAnimateStep === ast) {
            return this._visitEndStateAnimation(ast, context);
        }
        var startingStylesExpr = ast.startingStyles.visit(this, context);
        var keyframeExpressions = ast.keyframes.map(function (keyframeEntry) { return keyframeEntry.visit(_this, context); });
        return this._callAnimateMethod(ast, startingStylesExpr, o.literalArr(keyframeExpressions));
    };
    /** @internal */
    _AnimationBuilder.prototype._visitEndStateAnimation = function (ast, context) {
        var _this = this;
        var startingStylesExpr = ast.startingStyles.visit(this, context);
        var keyframeExpressions = ast.keyframes.map(function (keyframe) { return keyframe.visit(_this, context); });
        var keyframesExpr = o.importExpr(identifiers_1.Identifiers.balanceAnimationKeyframes).callFn([
            _ANIMATION_COLLECTED_STYLES, _ANIMATION_END_STATE_STYLES_VAR,
            o.literalArr(keyframeExpressions)
        ]);
        return this._callAnimateMethod(ast, startingStylesExpr, keyframesExpr);
    };
    /** @internal */
    _AnimationBuilder.prototype._callAnimateMethod = function (ast, startingStylesExpr, keyframesExpr) {
        return _ANIMATION_FACTORY_RENDERER_VAR.callMethod('animate', [
            _ANIMATION_FACTORY_ELEMENT_VAR, startingStylesExpr, keyframesExpr, o.literal(ast.duration),
            o.literal(ast.delay), o.literal(ast.easing)
        ]);
    };
    _AnimationBuilder.prototype.visitAnimationSequence = function (ast, context) {
        var _this = this;
        var playerExprs = ast.steps.map(function (step) { return step.visit(_this, context); });
        return o.importExpr(identifiers_1.Identifiers.AnimationSequencePlayer).instantiate([o.literalArr(playerExprs)]);
    };
    _AnimationBuilder.prototype.visitAnimationGroup = function (ast, context) {
        var _this = this;
        var playerExprs = ast.steps.map(function (step) { return step.visit(_this, context); });
        return o.importExpr(identifiers_1.Identifiers.AnimationGroupPlayer).instantiate([o.literalArr(playerExprs)]);
    };
    _AnimationBuilder.prototype.visitAnimationStateDeclaration = function (ast, context) {
        var flatStyles = {};
        _getStylesArray(ast).forEach(function (entry) {
            collection_1.StringMapWrapper.forEach(entry, function (value, key) { flatStyles[key] = value; });
        });
        context.stateMap.registerState(ast.stateName, flatStyles);
    };
    _AnimationBuilder.prototype.visitAnimationStateTransition = function (ast, context) {
        var steps = ast.animation.steps;
        var lastStep = steps[steps.length - 1];
        if (_isEndStateAnimateStep(lastStep)) {
            context.endStateAnimateStep = lastStep;
        }
        context.isExpectingFirstStyleStep = true;
        var stateChangePreconditions = [];
        ast.stateChanges.forEach(function (stateChange) {
            stateChangePreconditions.push(_compareToAnimationStateExpr(_ANIMATION_CURRENT_STATE_VAR, stateChange.fromState)
                .and(_compareToAnimationStateExpr(_ANIMATION_NEXT_STATE_VAR, stateChange.toState)));
            if (stateChange.fromState != core_private_1.ANY_STATE) {
                context.stateMap.registerState(stateChange.fromState);
            }
            if (stateChange.toState != core_private_1.ANY_STATE) {
                context.stateMap.registerState(stateChange.toState);
            }
        });
        var animationPlayerExpr = ast.animation.visit(this, context);
        var reducedStateChangesPrecondition = stateChangePreconditions.reduce(function (a, b) { return a.or(b); });
        var precondition = _ANIMATION_PLAYER_VAR.equals(o.NULL_EXPR).and(reducedStateChangesPrecondition);
        return new o.IfStmt(precondition, [_ANIMATION_PLAYER_VAR.set(animationPlayerExpr).toStmt()]);
    };
    _AnimationBuilder.prototype.visitAnimationEntry = function (ast, context) {
        var _this = this;
        // visit each of the declarations first to build the context state map
        ast.stateDeclarations.forEach(function (def) { return def.visit(_this, context); });
        // this should always be defined even if the user overrides it
        context.stateMap.registerState(core_private_1.DEFAULT_STATE, {});
        var statements = [];
        statements.push(_ANIMATION_FACTORY_VIEW_VAR
            .callMethod('cancelActiveAnimation', [
            _ANIMATION_FACTORY_ELEMENT_VAR, o.literal(this.animationName),
            _ANIMATION_NEXT_STATE_VAR.equals(o.literal(core_private_1.EMPTY_STATE))
        ])
            .toStmt());
        statements.push(_ANIMATION_COLLECTED_STYLES.set(EMPTY_MAP).toDeclStmt());
        statements.push(_ANIMATION_PLAYER_VAR.set(o.NULL_EXPR).toDeclStmt());
        statements.push(_ANIMATION_DEFAULT_STATE_VAR.set(this._statesMapVar.key(o.literal(core_private_1.DEFAULT_STATE)))
            .toDeclStmt());
        statements.push(_ANIMATION_START_STATE_STYLES_VAR.set(this._statesMapVar.key(_ANIMATION_CURRENT_STATE_VAR))
            .toDeclStmt());
        statements.push(new o.IfStmt(_ANIMATION_START_STATE_STYLES_VAR.equals(o.NULL_EXPR), [_ANIMATION_START_STATE_STYLES_VAR.set(_ANIMATION_DEFAULT_STATE_VAR).toStmt()]));
        statements.push(_ANIMATION_END_STATE_STYLES_VAR.set(this._statesMapVar.key(_ANIMATION_NEXT_STATE_VAR))
            .toDeclStmt());
        statements.push(new o.IfStmt(_ANIMATION_END_STATE_STYLES_VAR.equals(o.NULL_EXPR), [_ANIMATION_END_STATE_STYLES_VAR.set(_ANIMATION_DEFAULT_STATE_VAR).toStmt()]));
        var RENDER_STYLES_FN = o.importExpr(identifiers_1.Identifiers.renderStyles);
        // before we start any animation we want to clear out the starting
        // styles from the element's style property (since they were placed
        // there at the end of the last animation
        statements.push(RENDER_STYLES_FN
            .callFn([
            _ANIMATION_FACTORY_ELEMENT_VAR, _ANIMATION_FACTORY_RENDERER_VAR,
            o.importExpr(identifiers_1.Identifiers.clearStyles).callFn([_ANIMATION_START_STATE_STYLES_VAR])
        ])
            .toStmt());
        ast.stateTransitions.forEach(function (transAst) { return statements.push(transAst.visit(_this, context)); });
        // this check ensures that the animation factory always returns a player
        // so that the onDone callback can be used for tracking
        statements.push(new o.IfStmt(_ANIMATION_PLAYER_VAR.equals(o.NULL_EXPR), [_ANIMATION_PLAYER_VAR.set(o.importExpr(identifiers_1.Identifiers.NoOpAnimationPlayer).instantiate([]))
                .toStmt()]));
        // once complete we want to apply the styles on the element
        // since the destination state's values should persist once
        // the animation sequence has completed.
        statements.push(_ANIMATION_PLAYER_VAR
            .callMethod('onDone', [o.fn([], [RENDER_STYLES_FN
                    .callFn([
                    _ANIMATION_FACTORY_ELEMENT_VAR, _ANIMATION_FACTORY_RENDERER_VAR,
                    o.importExpr(identifiers_1.Identifiers.prepareFinalAnimationStyles).callFn([
                        _ANIMATION_START_STATE_STYLES_VAR, _ANIMATION_END_STATE_STYLES_VAR
                    ])
                ])
                    .toStmt()])])
            .toStmt());
        statements.push(_ANIMATION_FACTORY_VIEW_VAR
            .callMethod('queueAnimation', [
            _ANIMATION_FACTORY_ELEMENT_VAR, o.literal(this.animationName),
            _ANIMATION_PLAYER_VAR
        ])
            .toStmt());
        return o.fn([
            new o.FnParam(_ANIMATION_FACTORY_VIEW_VAR.name, o.importType(identifiers_1.Identifiers.AppView, [o.DYNAMIC_TYPE])),
            new o.FnParam(_ANIMATION_FACTORY_ELEMENT_VAR.name, o.DYNAMIC_TYPE),
            new o.FnParam(_ANIMATION_CURRENT_STATE_VAR.name, o.DYNAMIC_TYPE),
            new o.FnParam(_ANIMATION_NEXT_STATE_VAR.name, o.DYNAMIC_TYPE)
        ], statements);
    };
    _AnimationBuilder.prototype.build = function (ast) {
        var context = new _AnimationBuilderContext();
        var fnStatement = ast.visit(this, context).toDeclStmt(this._fnVarName);
        var fnVariable = o.variable(this._fnVarName);
        var lookupMap = [];
        collection_1.StringMapWrapper.forEach(context.stateMap.states, function (value, stateName) {
            var variableValue = EMPTY_MAP;
            if (lang_1.isPresent(value)) {
                var styleMap_1 = [];
                collection_1.StringMapWrapper.forEach(value, function (value, key) {
                    styleMap_1.push([key, o.literal(value)]);
                });
                variableValue = o.literalMap(styleMap_1);
            }
            lookupMap.push([stateName, variableValue]);
        });
        var compiledStatesMapExpr = this._statesMapVar.set(o.literalMap(lookupMap)).toDeclStmt();
        return new CompiledAnimation(this.animationName, compiledStatesMapExpr, this._statesMapVarName, fnStatement, fnVariable);
    };
    return _AnimationBuilder;
}());
var _AnimationBuilderContext = (function () {
    function _AnimationBuilderContext() {
        this.stateMap = new _AnimationBuilderStateMap();
        this.endStateAnimateStep = null;
        this.isExpectingFirstStyleStep = false;
    }
    return _AnimationBuilderContext;
}());
var _AnimationBuilderStateMap = (function () {
    function _AnimationBuilderStateMap() {
        this._states = {};
    }
    Object.defineProperty(_AnimationBuilderStateMap.prototype, "states", {
        get: function () { return this._states; },
        enumerable: true,
        configurable: true
    });
    _AnimationBuilderStateMap.prototype.registerState = function (name, value) {
        if (value === void 0) { value = null; }
        var existingEntry = this._states[name];
        if (lang_1.isBlank(existingEntry)) {
            this._states[name] = value;
        }
    };
    return _AnimationBuilderStateMap;
}());
function _compareToAnimationStateExpr(value, animationState) {
    var emptyStateLiteral = o.literal(core_private_1.EMPTY_STATE);
    switch (animationState) {
        case core_private_1.EMPTY_STATE:
            return value.equals(emptyStateLiteral);
        case core_private_1.ANY_STATE:
            return o.literal(true);
        default:
            return value.equals(o.literal(animationState));
    }
}
function _isEndStateAnimateStep(step) {
    // the final animation step is characterized by having only TWO
    // keyframe values and it must have zero styles for both keyframes
    if (step instanceof animation_ast_1.AnimationStepAst && step.duration > 0 && step.keyframes.length == 2) {
        var styles1 = _getStylesArray(step.keyframes[0])[0];
        var styles2 = _getStylesArray(step.keyframes[1])[0];
        return collection_1.StringMapWrapper.isEmpty(styles1) && collection_1.StringMapWrapper.isEmpty(styles2);
    }
    return false;
}
function _getStylesArray(obj) {
    return obj.styles.styles;
}
function _validateAnimationProperties(compiledAnimations, template) {
    var visitor = new _AnimationTemplatePropertyVisitor(compiledAnimations);
    t.templateVisitAll(visitor, template);
    return visitor.errors;
}
var _AnimationTemplatePropertyVisitor = (function () {
    function _AnimationTemplatePropertyVisitor(animations) {
        var _this = this;
        this._animationRegistry = {};
        this.errors = [];
        animations.forEach(function (entry) { _this._animationRegistry[entry.name] = true; });
    }
    _AnimationTemplatePropertyVisitor.prototype.visitElement = function (ast, ctx) {
        var _this = this;
        ast.inputs.forEach(function (input) {
            if (input.type == t.PropertyBindingType.Animation) {
                var animationName = input.name;
                if (!lang_1.isPresent(_this._animationRegistry[animationName])) {
                    _this.errors.push(new animation_parser_1.AnimationParseError("couldn't find an animation entry for " + animationName));
                }
            }
        });
        t.templateVisitAll(this, ast.children);
    };
    _AnimationTemplatePropertyVisitor.prototype.visitBoundText = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitText = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitEmbeddedTemplate = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitNgContent = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitAttr = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitDirective = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitEvent = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitReference = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitVariable = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitDirectiveProperty = function (ast, ctx) { };
    _AnimationTemplatePropertyVisitor.prototype.visitElementProperty = function (ast, ctx) { };
    return _AnimationTemplatePropertyVisitor;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2NvbXBpbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci9zcmMvYW5pbWF0aW9uL2FuaW1hdGlvbl9jb21waWxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBSUgsNkJBQW9ELG9CQUFvQixDQUFDLENBQUE7QUFFekUsMkJBQWlELHNCQUFzQixDQUFDLENBQUE7QUFDeEUsMkJBQTRCLHNCQUFzQixDQUFDLENBQUE7QUFDbkQscUJBQTBDLGdCQUFnQixDQUFDLENBQUE7QUFDM0QsNEJBQTBCLGdCQUFnQixDQUFDLENBQUE7QUFDM0MsSUFBWSxDQUFDLFdBQU0sc0JBQXNCLENBQUMsQ0FBQTtBQUMxQyxJQUFZLENBQUMsV0FBTSxpQkFBaUIsQ0FBQyxDQUFBO0FBRXJDLDhCQUFzUCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3hRLGlDQUE4RSxvQkFBb0IsQ0FBQyxDQUFBO0FBRW5HO0lBQ0UsMkJBQ1csSUFBWSxFQUFTLGtCQUErQixFQUNwRCxrQkFBMEIsRUFBUyxXQUF3QixFQUMzRCxVQUF3QjtRQUZ4QixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFhO1FBQ3BELHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBUTtRQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQzNELGVBQVUsR0FBVixVQUFVLENBQWM7SUFBRyxDQUFDO0lBQ3pDLHdCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0M7QUFMWSx5QkFBaUIsb0JBSzdCLENBQUE7QUFFRDtJQUFBO0lBNENBLENBQUM7SUEzQ0MsNENBQWdCLEdBQWhCLFVBQWlCLFNBQW1DLEVBQUUsUUFBeUI7UUFFN0UsSUFBSSxrQkFBa0IsR0FBd0IsRUFBRSxDQUFDO1FBQ2pELElBQUksYUFBYSxHQUFhLEVBQUUsQ0FBQztRQUNqQyxJQUFJLGFBQWEsR0FB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