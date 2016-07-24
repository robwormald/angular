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
var core_private_1 = require('../../core_private');
var compile_metadata_1 = require('../compile_metadata');
var collection_1 = require('../facade/collection');
var lang_1 = require('../facade/lang');
var math_1 = require('../facade/math');
var parse_util_1 = require('../parse_util');
var animation_ast_1 = require('./animation_ast');
var styles_collection_1 = require('./styles_collection');
var _INITIAL_KEYFRAME = 0;
var _TERMINAL_KEYFRAME = 1;
var _ONE_SECOND = 1000;
var AnimationParseError = (function (_super) {
    __extends(AnimationParseError, _super);
    function AnimationParseError(message /** TODO #9100 */) {
        _super.call(this, null, message);
    }
    AnimationParseError.prototype.toString = function () { return "" + this.msg; };
    return AnimationParseError;
}(parse_util_1.ParseError));
exports.AnimationParseError = AnimationParseError;
var ParsedAnimationResult = (function () {
    function ParsedAnimationResult(ast, errors) {
        this.ast = ast;
        this.errors = errors;
    }
    return ParsedAnimationResult;
}());
exports.ParsedAnimationResult = ParsedAnimationResult;
function parseAnimationEntry(entry) {
    var errors = [];
    var stateStyles = {};
    var transitions = [];
    var stateDeclarationAsts = [];
    entry.definitions.forEach(function (def) {
        if (def instanceof compile_metadata_1.CompileAnimationStateDeclarationMetadata) {
            _parseAnimationDeclarationStates(def, errors).forEach(function (ast) {
                stateDeclarationAsts.push(ast);
                stateStyles[ast.stateName] = ast.styles;
            });
        }
        else {
            transitions.push(def);
        }
    });
    var stateTransitionAsts = transitions.map(function (transDef) { return _parseAnimationStateTransition(transDef, stateStyles, errors); });
    var ast = new animation_ast_1.AnimationEntryAst(entry.name, stateDeclarationAsts, stateTransitionAsts);
    return new ParsedAnimationResult(ast, errors);
}
exports.parseAnimationEntry = parseAnimationEntry;
function _parseAnimationDeclarationStates(stateMetadata, errors) {
    var styleValues = [];
    stateMetadata.styles.styles.forEach(function (stylesEntry) {
        // TODO (matsko): change this when we get CSS class integration support
        if (lang_1.isStringMap(stylesEntry)) {
            styleValues.push(stylesEntry);
        }
        else {
            errors.push(new AnimationParseError("State based animations cannot contain references to other states"));
        }
    });
    var defStyles = new animation_ast_1.AnimationStylesAst(styleValues);
    var states = stateMetadata.stateNameExpr.split(/\s*,\s*/);
    return states.map(function (state) { return new animation_ast_1.AnimationStateDeclarationAst(state, defStyles); });
}
function _parseAnimationStateTransition(transitionStateMetadata, stateStyles, errors) {
    var styles = new styles_collection_1.StylesCollection();
    var transitionExprs = [];
    var transitionStates = transitionStateMetadata.stateChangeExpr.split(/\s*,\s*/);
    transitionStates.forEach(function (expr) {
        _parseAnimationTransitionExpr(expr, errors).forEach(function (transExpr) {
            transitionExprs.push(transExpr);
        });
    });
    var entry = _normalizeAnimationEntry(transitionStateMetadata.steps);
    var animation = _normalizeStyleSteps(entry, stateStyles, errors);
    var animationAst = _parseTransitionAnimation(animation, 0, styles, stateStyles, errors);
    if (errors.length == 0) {
        _fillAnimationAstStartingKeyframes(animationAst, styles, errors);
    }
    var sequenceAst = (animationAst instanceof animation_ast_1.AnimationSequenceAst) ?
        animationAst :
        new animation_ast_1.AnimationSequenceAst([animationAst]);
    return new animation_ast_1.AnimationStateTransitionAst(transitionExprs, sequenceAst);
}
function _parseAnimationTransitionExpr(eventStr, errors) {
    var expressions = [];
    var match = eventStr.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
    if (!lang_1.isPresent(match) || match.length < 4) {
        errors.push(new AnimationParseError("the provided " + eventStr + " is not of a supported format"));
        return expressions;
    }
    var fromState = match[1];
    var separator = match[2];
    var toState = match[3];
    expressions.push(new animation_ast_1.AnimationStateTransitionExpression(fromState, toState));
    var isFullAnyStateExpr = fromState == core_private_1.ANY_STATE && toState == core_private_1.ANY_STATE;
    if (separator[0] == '<' && !isFullAnyStateExpr) {
        expressions.push(new animation_ast_1.AnimationStateTransitionExpression(toState, fromState));
    }
    return expressions;
}
function _fetchSylesFromState(stateName, stateStyles) {
    var entry = stateStyles[stateName];
    if (lang_1.isPresent(entry)) {
        var styles = entry.styles;
        return new compile_metadata_1.CompileAnimationStyleMetadata(0, styles);
    }
    return null;
}
function _normalizeAnimationEntry(entry) {
    return lang_1.isArray(entry) ? new compile_metadata_1.CompileAnimationSequenceMetadata(entry) :
        entry;
}
function _normalizeStyleMetadata(entry, stateStyles, errors) {
    var normalizedStyles = [];
    entry.styles.forEach(function (styleEntry) {
        if (lang_1.isString(styleEntry)) {
            collection_1.ListWrapper.addAll(normalizedStyles, _resolveStylesFromState(styleEntry, stateStyles, errors));
        }
        else {
            normalizedStyles.push(styleEntry);
        }
    });
    return normalizedStyles;
}
function _normalizeStyleSteps(entry, stateStyles, errors) {
    var steps = _normalizeStyleStepEntry(entry, stateStyles, errors);
    return new compile_metadata_1.CompileAnimationSequenceMetadata(steps);
}
function _mergeAnimationStyles(stylesList, newItem) {
    if (lang_1.isStringMap(newItem) && stylesList.length > 0) {
        var lastIndex = stylesList.length - 1;
        var lastItem = stylesList[lastIndex];
        if (lang_1.isStringMap(lastItem)) {
            stylesList[lastIndex] = collection_1.StringMapWrapper.merge(lastItem, newItem);
            return;
        }
    }
    stylesList.push(newItem);
}
function _normalizeStyleStepEntry(entry, stateStyles, errors) {
    var steps;
    if (entry instanceof compile_metadata_1.CompileAnimationWithStepsMetadata) {
        steps = entry.steps;
    }
    else {
        return [entry];
    }
    var newSteps = [];
    var combinedStyles;
    steps.forEach(function (step) {
        if (step instanceof compile_metadata_1.CompileAnimationStyleMetadata) {
            // this occurs when a style step is followed by a previous style step
            // or when the first style step is run. We want to concatenate all subsequent
            // style steps together into a single style step such that we have the correct
            // starting keyframe data to pass into the animation player.
            if (!lang_1.isPresent(combinedStyles)) {
                combinedStyles = [];
            }
            _normalizeStyleMetadata(step, stateStyles, errors)
                .forEach(function (entry) { _mergeAnimationStyles(combinedStyles, entry); });
        }
        else {
            // it is important that we create a metadata entry of the combined styles
            // before we go on an process the animate, sequence or group metadata steps.
            // This will ensure that the AST will have the previous styles painted on
            // screen before any further animations that use the styles take place.
            if (lang_1.isPresent(combinedStyles)) {
                newSteps.push(new compile_metadata_1.CompileAnimationStyleMetadata(0, combinedStyles));
                combinedStyles = null;
            }
            if (step instanceof compile_metadata_1.CompileAnimationAnimateMetadata) {
                // we do not recurse into CompileAnimationAnimateMetadata since
                // those style steps are not going to be squashed
                var animateStyleValue = step.styles;
                if (animateStyleValue instanceof compile_metadata_1.CompileAnimationStyleMetadata) {
                    animateStyleValue.styles =
                        _normalizeStyleMetadata(animateStyleValue, stateStyles, errors);
                }
                else if (animateStyleValue instanceof compile_metadata_1.CompileAnimationKeyframesSequenceMetadata) {
                    animateStyleValue.steps.forEach(function (step) { step.styles = _normalizeStyleMetadata(step, stateStyles, errors); });
                }
            }
            else if (step instanceof compile_metadata_1.CompileAnimationWithStepsMetadata) {
                var innerSteps = _normalizeStyleStepEntry(step, stateStyles, errors);
                step = step instanceof compile_metadata_1.CompileAnimationGroupMetadata ?
                    new compile_metadata_1.CompileAnimationGroupMetadata(innerSteps) :
                    new compile_metadata_1.CompileAnimationSequenceMetadata(innerSteps);
            }
            newSteps.push(step);
        }
    });
    // this happens when only styles were animated within the sequence
    if (lang_1.isPresent(combinedStyles)) {
        newSteps.push(new compile_metadata_1.CompileAnimationStyleMetadata(0, combinedStyles));
    }
    return newSteps;
}
function _resolveStylesFromState(stateName, stateStyles, errors) {
    var styles = [];
    if (stateName[0] != ':') {
        errors.push(new AnimationParseError("Animation states via styles must be prefixed with a \":\""));
    }
    else {
        var normalizedStateName = stateName.substring(1);
        var value = stateStyles[normalizedStateName];
        if (!lang_1.isPresent(value)) {
            errors.push(new AnimationParseError("Unable to apply styles due to missing a state: \"" + normalizedStateName + "\""));
        }
        else {
            value.styles.forEach(function (stylesEntry) {
                if (lang_1.isStringMap(stylesEntry)) {
                    styles.push(stylesEntry);
                }
            });
        }
    }
    return styles;
}
var _AnimationTimings = (function () {
    function _AnimationTimings(duration, delay, easing) {
        this.duration = duration;
        this.delay = delay;
        this.easing = easing;
    }
    return _AnimationTimings;
}());
function _parseAnimationKeyframes(keyframeSequence, currentTime, collectedStyles, stateStyles, errors) {
    var totalEntries = keyframeSequence.steps.length;
    var totalOffsets = 0;
    keyframeSequence.steps.forEach(function (step) { return totalOffsets += (lang_1.isPresent(step.offset) ? 1 : 0); });
    if (totalOffsets > 0 && totalOffsets < totalEntries) {
        errors.push(new AnimationParseError("Not all style() entries contain an offset for the provided keyframe()"));
        totalOffsets = totalEntries;
    }
    var limit = totalEntries - 1;
    var margin = totalOffsets == 0 ? (1 / limit) : 0;
    var rawKeyframes = [];
    var index = 0;
    var doSortKeyframes = false;
    var lastOffset = 0;
    keyframeSequence.steps.forEach(function (styleMetadata) {
        var offset = styleMetadata.offset;
        var keyframeStyles = {};
        styleMetadata.styles.forEach(function (entry) {
            collection_1.StringMapWrapper.forEach(entry, function (value /** TODO #9100 */, prop /** TODO #9100 */) {
                if (prop != 'offset') {
                    keyframeStyles[prop] = value;
                }
            });
        });
        if (lang_1.isPresent(offset)) {
            doSortKeyframes = doSortKeyframes || (offset < lastOffset);
        }
        else {
            offset = index == limit ? _TERMINAL_KEYFRAME : (margin * index);
        }
        rawKeyframes.push([offset, keyframeStyles]);
        lastOffset = offset;
        index++;
    });
    if (doSortKeyframes) {
        collection_1.ListWrapper.sort(rawKeyframes, function (a, b) { return a[0] <= b[0] ? -1 : 1; });
    }
    var i;
    var firstKeyframe = rawKeyframes[0];
    if (firstKeyframe[0] != _INITIAL_KEYFRAME) {
        collection_1.ListWrapper.insert(rawKeyframes, 0, firstKeyframe = [_INITIAL_KEYFRAME, {}]);
    }
    var firstKeyframeStyles = firstKeyframe[1];
    limit = rawKeyframes.length - 1;
    var lastKeyframe = rawKeyframes[limit];
    if (lastKeyframe[0] != _TERMINAL_KEYFRAME) {
        rawKeyframes.push(lastKeyframe = [_TERMINAL_KEYFRAME, {}]);
        limit++;
    }
    var lastKeyframeStyles = lastKeyframe[1];
    for (i = 1; i <= limit; i++) {
        var entry = rawKeyframes[i];
        var styles = entry[1];
        collection_1.StringMapWrapper.forEach(styles, function (value /** TODO #9100 */, prop /** TODO #9100 */) {
            if (!lang_1.isPresent(firstKeyframeStyles[prop])) {
                firstKeyframeStyles[prop] = core_private_1.FILL_STYLE_FLAG;
            }
        });
    }
    for (i = limit - 1; i >= 0; i--) {
        var entry = rawKeyframes[i];
        var styles = entry[1];
        collection_1.StringMapWrapper.forEach(styles, function (value /** TODO #9100 */, prop /** TODO #9100 */) {
            if (!lang_1.isPresent(lastKeyframeStyles[prop])) {
                lastKeyframeStyles[prop] = value;
            }
        });
    }
    return rawKeyframes.map(function (entry) { return new animation_ast_1.AnimationKeyframeAst(entry[0], new animation_ast_1.AnimationStylesAst([entry[1]])); });
}
function _parseTransitionAnimation(entry, currentTime, collectedStyles, stateStyles, errors) {
    var ast;
    var playTime = 0;
    var startingTime = currentTime;
    if (entry instanceof compile_metadata_1.CompileAnimationWithStepsMetadata) {
        var maxDuration = 0;
        var steps = [];
        var isGroup = entry instanceof compile_metadata_1.CompileAnimationGroupMetadata;
        var previousStyles;
        entry.steps.forEach(function (entry) {
            // these will get picked up by the next step...
            var time = isGroup ? startingTime : currentTime;
            if (entry instanceof compile_metadata_1.CompileAnimationStyleMetadata) {
                entry.styles.forEach(function (stylesEntry) {
                    // by this point we know that we only have stringmap values
                    var map = stylesEntry;
                    collection_1.StringMapWrapper.forEach(map, function (value /** TODO #9100 */, prop /** TODO #9100 */) {
                        collectedStyles.insertAtTime(prop, time, value);
                    });
                });
                previousStyles = entry.styles;
                return;
            }
            var innerAst = _parseTransitionAnimation(entry, time, collectedStyles, stateStyles, errors);
            if (lang_1.isPresent(previousStyles)) {
                if (entry instanceof compile_metadata_1.CompileAnimationWithStepsMetadata) {
                    var startingStyles = new animation_ast_1.AnimationStylesAst(previousStyles);
                    steps.push(new animation_ast_1.AnimationStepAst(startingStyles, [], 0, 0, ''));
                }
                else {
                    var innerStep = innerAst;
                    collection_1.ListWrapper.addAll(innerStep.startingStyles.styles, previousStyles);
                }
                previousStyles = null;
            }
            var astDuration = innerAst.playTime;
            currentTime += astDuration;
            playTime += astDuration;
            maxDuration = math_1.Math.max(astDuration, maxDuration);
            steps.push(innerAst);
        });
        if (lang_1.isPresent(previousStyles)) {
            var startingStyles = new animation_ast_1.AnimationStylesAst(previousStyles);
            steps.push(new animation_ast_1.AnimationStepAst(startingStyles, [], 0, 0, ''));
        }
        if (isGroup) {
            ast = new animation_ast_1.AnimationGroupAst(steps);
            playTime = maxDuration;
            currentTime = startingTime + playTime;
        }
        else {
            ast = new animation_ast_1.AnimationSequenceAst(steps);
        }
    }
    else if (entry instanceof compile_metadata_1.CompileAnimationAnimateMetadata) {
        var timings = _parseTimeExpression(entry.timings, errors);
        var styles = entry.styles;
        var keyframes;
        if (styles instanceof compile_metadata_1.CompileAnimationKeyframesSequenceMetadata) {
            keyframes =
                _parseAnimationKeyframes(styles, currentTime, collectedStyles, stateStyles, errors);
        }
        else {
            var styleData = styles;
            var offset = _TERMINAL_KEYFRAME;
            var styleAst = new animation_ast_1.AnimationStylesAst(styleData.styles);
            var keyframe = new animation_ast_1.AnimationKeyframeAst(offset, styleAst);
            keyframes = [keyframe];
        }
        ast = new animation_ast_1.AnimationStepAst(new animation_ast_1.AnimationStylesAst([]), keyframes, timings.duration, timings.delay, timings.easing);
        playTime = timings.duration + timings.delay;
        currentTime += playTime;
        keyframes.forEach(function (keyframe /** TODO #9100 */) { return keyframe.styles.styles.forEach(function (entry /** TODO #9100 */) { return collection_1.StringMapWrapper.forEach(entry, function (value /** TODO #9100 */, prop /** TODO #9100 */) {
            return collectedStyles.insertAtTime(prop, currentTime, value);
        }); }); });
    }
    else {
        // if the code reaches this stage then an error
        // has already been populated within the _normalizeStyleSteps()
        // operation...
        ast = new animation_ast_1.AnimationStepAst(null, [], 0, 0, '');
    }
    ast.playTime = playTime;
    ast.startTime = startingTime;
    return ast;
}
function _fillAnimationAstStartingKeyframes(ast, collectedStyles, errors) {
    // steps that only contain style will not be filled
    if ((ast instanceof animation_ast_1.AnimationStepAst) && ast.keyframes.length > 0) {
        var keyframes = ast.keyframes;
        if (keyframes.length == 1) {
            var endKeyframe = keyframes[0];
            var startKeyframe = _createStartKeyframeFromEndKeyframe(endKeyframe, ast.startTime, ast.playTime, collectedStyles, errors);
            ast.keyframes = [startKeyframe, endKeyframe];
        }
    }
    else if (ast instanceof animation_ast_1.AnimationWithStepsAst) {
        ast.steps.forEach(function (entry) { return _fillAnimationAstStartingKeyframes(entry, collectedStyles, errors); });
    }
}
function _parseTimeExpression(exp, errors) {
    var regex = /^([\.\d]+)(m?s)(?:\s+([\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?/gi;
    var duration;
    var delay = 0;
    var easing = null;
    if (lang_1.isString(exp)) {
        var matches = lang_1.RegExpWrapper.firstMatch(regex, exp);
        if (!lang_1.isPresent(matches)) {
            errors.push(new AnimationParseError("The provided timing value \"" + exp + "\" is invalid."));
            return new _AnimationTimings(0, 0, null);
        }
        var durationMatch = lang_1.NumberWrapper.parseFloat(matches[1]);
        var durationUnit = matches[2];
        if (durationUnit == 's') {
            durationMatch *= _ONE_SECOND;
        }
        duration = math_1.Math.floor(durationMatch);
        var delayMatch = matches[3];
        var delayUnit = matches[4];
        if (lang_1.isPresent(delayMatch)) {
            var delayVal = lang_1.NumberWrapper.parseFloat(delayMatch);
            if (lang_1.isPresent(delayUnit) && delayUnit == 's') {
                delayVal *= _ONE_SECOND;
            }
            delay = math_1.Math.floor(delayVal);
        }
        var easingVal = matches[5];
        if (!lang_1.isBlank(easingVal)) {
            easing = easingVal;
        }
    }
    else {
        duration = exp;
    }
    return new _AnimationTimings(duration, delay, easing);
}
function _createStartKeyframeFromEndKeyframe(endKeyframe, startTime, duration, collectedStyles, errors) {
    var values = {};
    var endTime = startTime + duration;
    endKeyframe.styles.styles.forEach(function (styleData) {
        collection_1.StringMapWrapper.forEach(styleData, function (val /** TODO #9100 */, prop /** TODO #9100 */) {
            if (prop == 'offset')
                return;
            var resultIndex = collectedStyles.indexOfAtOrBeforeTime(prop, startTime);
            var resultEntry /** TODO #9100 */, nextEntry /** TODO #9100 */, value;
            if (lang_1.isPresent(resultIndex)) {
                resultEntry = collectedStyles.getByIndex(prop, resultIndex);
                value = resultEntry.value;
                nextEntry = collectedStyles.getByIndex(prop, resultIndex + 1);
            }
            else {
                // this is a flag that the runtime code uses to pass
                // in a value either from the state declaration styles
                // or using the AUTO_STYLE value (e.g. getComputedStyle)
                value = core_private_1.FILL_STYLE_FLAG;
            }
            if (lang_1.isPresent(nextEntry) && !nextEntry.matches(endTime, val)) {
                errors.push(new AnimationParseError("The animated CSS property \"" + prop + "\" unexpectedly changes between steps \"" + resultEntry.time + "ms\" and \"" + endTime + "ms\" at \"" + nextEntry.time + "ms\""));
            }
            values[prop] = value;
        });
    });
    return new animation_ast_1.AnimationKeyframeAst(_INITIAL_KEYFRAME, new animation_ast_1.AnimationStylesAst([values]));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3BhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2FuaW1hdGlvbi9hbmltYXRpb25fcGFyc2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILDZCQUF5QyxvQkFBb0IsQ0FBQyxDQUFBO0FBQzlELGlDQUF3VyxxQkFBcUIsQ0FBQyxDQUFBO0FBQzlYLDJCQUE0QyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ25FLHFCQUErRixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ2hILHFCQUFtQixnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3BDLDJCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUV6Qyw4QkFBeVEsaUJBQWlCLENBQUMsQ0FBQTtBQUMzUixrQ0FBK0IscUJBQXFCLENBQUMsQ0FBQTtBQUVyRCxJQUFNLGlCQUFpQixHQUFHLENBQUMsQ0FBQztBQUM1QixJQUFNLGtCQUFrQixHQUFHLENBQUMsQ0FBQztBQUM3QixJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFFekI7SUFBeUMsdUNBQVU7SUFDakQsNkJBQVksT0FBWSxDQUFDLGlCQUFpQjtRQUFJLGtCQUFNLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUFDLENBQUM7SUFDckUsc0NBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsS0FBRyxJQUFJLENBQUMsR0FBSyxDQUFDLENBQUMsQ0FBQztJQUM5QywwQkFBQztBQUFELENBQUMsQUFIRCxDQUF5Qyx1QkFBVSxHQUdsRDtBQUhZLDJCQUFtQixzQkFHL0IsQ0FBQTtBQUVEO0lBQ0UsK0JBQW1CLEdBQXNCLEVBQVMsTUFBNkI7UUFBNUQsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFBUyxXQUFNLEdBQU4sTUFBTSxDQUF1QjtJQUFHLENBQUM7SUFDckYsNEJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUZZLDZCQUFxQix3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