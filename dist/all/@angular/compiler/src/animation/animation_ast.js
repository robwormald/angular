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
var AnimationAst = (function () {
    function AnimationAst() {
        this.startTime = 0;
        this.playTime = 0;
    }
    return AnimationAst;
}());
exports.AnimationAst = AnimationAst;
var AnimationStateAst = (function (_super) {
    __extends(AnimationStateAst, _super);
    function AnimationStateAst() {
        _super.apply(this, arguments);
    }
    return AnimationStateAst;
}(AnimationAst));
exports.AnimationStateAst = AnimationStateAst;
var AnimationEntryAst = (function (_super) {
    __extends(AnimationEntryAst, _super);
    function AnimationEntryAst(name, stateDeclarations, stateTransitions) {
        _super.call(this);
        this.name = name;
        this.stateDeclarations = stateDeclarations;
        this.stateTransitions = stateTransitions;
    }
    AnimationEntryAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationEntry(this, context);
    };
    return AnimationEntryAst;
}(AnimationAst));
exports.AnimationEntryAst = AnimationEntryAst;
var AnimationStateDeclarationAst = (function (_super) {
    __extends(AnimationStateDeclarationAst, _super);
    function AnimationStateDeclarationAst(stateName, styles) {
        _super.call(this);
        this.stateName = stateName;
        this.styles = styles;
    }
    AnimationStateDeclarationAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationStateDeclaration(this, context);
    };
    return AnimationStateDeclarationAst;
}(AnimationStateAst));
exports.AnimationStateDeclarationAst = AnimationStateDeclarationAst;
var AnimationStateTransitionExpression = (function () {
    function AnimationStateTransitionExpression(fromState, toState) {
        this.fromState = fromState;
        this.toState = toState;
    }
    return AnimationStateTransitionExpression;
}());
exports.AnimationStateTransitionExpression = AnimationStateTransitionExpression;
var AnimationStateTransitionAst = (function (_super) {
    __extends(AnimationStateTransitionAst, _super);
    function AnimationStateTransitionAst(stateChanges, animation) {
        _super.call(this);
        this.stateChanges = stateChanges;
        this.animation = animation;
    }
    AnimationStateTransitionAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationStateTransition(this, context);
    };
    return AnimationStateTransitionAst;
}(AnimationStateAst));
exports.AnimationStateTransitionAst = AnimationStateTransitionAst;
var AnimationStepAst = (function (_super) {
    __extends(AnimationStepAst, _super);
    function AnimationStepAst(startingStyles, keyframes, duration, delay, easing) {
        _super.call(this);
        this.startingStyles = startingStyles;
        this.keyframes = keyframes;
        this.duration = duration;
        this.delay = delay;
        this.easing = easing;
    }
    AnimationStepAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationStep(this, context);
    };
    return AnimationStepAst;
}(AnimationAst));
exports.AnimationStepAst = AnimationStepAst;
var AnimationStylesAst = (function (_super) {
    __extends(AnimationStylesAst, _super);
    function AnimationStylesAst(styles) {
        _super.call(this);
        this.styles = styles;
    }
    AnimationStylesAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationStyles(this, context);
    };
    return AnimationStylesAst;
}(AnimationAst));
exports.AnimationStylesAst = AnimationStylesAst;
var AnimationKeyframeAst = (function (_super) {
    __extends(AnimationKeyframeAst, _super);
    function AnimationKeyframeAst(offset, styles) {
        _super.call(this);
        this.offset = offset;
        this.styles = styles;
    }
    AnimationKeyframeAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationKeyframe(this, context);
    };
    return AnimationKeyframeAst;
}(AnimationAst));
exports.AnimationKeyframeAst = AnimationKeyframeAst;
var AnimationWithStepsAst = (function (_super) {
    __extends(AnimationWithStepsAst, _super);
    function AnimationWithStepsAst(steps) {
        _super.call(this);
        this.steps = steps;
    }
    return AnimationWithStepsAst;
}(AnimationAst));
exports.AnimationWithStepsAst = AnimationWithStepsAst;
var AnimationGroupAst = (function (_super) {
    __extends(AnimationGroupAst, _super);
    function AnimationGroupAst(steps) {
        _super.call(this, steps);
    }
    AnimationGroupAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationGroup(this, context);
    };
    return AnimationGroupAst;
}(AnimationWithStepsAst));
exports.AnimationGroupAst = AnimationGroupAst;
var AnimationSequenceAst = (function (_super) {
    __extends(AnimationSequenceAst, _super);
    function AnimationSequenceAst(steps) {
        _super.call(this, steps);
    }
    AnimationSequenceAst.prototype.visit = function (visitor, context) {
        return visitor.visitAnimationSequence(this, context);
    };
    return AnimationSequenceAst;
}(AnimationWithStepsAst));
exports.AnimationSequenceAst = AnimationSequenceAst;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2FzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL2FuaW1hdGlvbi9hbmltYXRpb25fYXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVIO0lBQUE7UUFDUyxjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLGFBQVEsR0FBVyxDQUFDLENBQUM7SUFFOUIsQ0FBQztJQUFELG1CQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFKcUIsb0JBQVksZUFJakMsQ0FBQTtBQUVEO0lBQWdELHFDQUFZO0lBQTVEO1FBQWdELDhCQUFZO0lBRTVELENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFGRCxDQUFnRCxZQUFZLEdBRTNEO0FBRnFCLHlCQUFpQixvQkFFdEMsQ0FBQTtBQWFEO0lBQXVDLHFDQUFZO0lBQ2pELDJCQUNXLElBQVksRUFBUyxpQkFBaUQsRUFDdEUsZ0JBQStDO1FBQ3hELGlCQUFPLENBQUM7UUFGQyxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFnQztRQUN0RSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQStCO0lBRTFELENBQUM7SUFDRCxpQ0FBSyxHQUFMLFVBQU0sT0FBNEIsRUFBRSxPQUFZO1FBQzlDLE1BQU0sQ0FBQyxPQUFPLENBQUMsbUJBQW1CLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFDSCx3QkFBQztBQUFELENBQUMsQUFURCxDQUF1QyxZQUFZLEdBU2xEO0FBVFkseUJBQWlCLG9CQVM3QixDQUFBO0FBRUQ7SUFBa0QsZ0RBQWlCO0lBQ2pFLHNDQUFtQixTQUFpQixFQUFTLE1BQTBCO1FBQUksaUJBQU8sQ0FBQztRQUFoRSxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7SUFB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