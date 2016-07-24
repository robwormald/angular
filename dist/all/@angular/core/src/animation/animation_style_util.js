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
var animation_constants_1 = require('./animation_constants');
var metadata_1 = require('./metadata');
function prepareFinalAnimationStyles(previousStyles, newStyles, nullValue) {
    if (nullValue === void 0) { nullValue = null; }
    var finalStyles = {};
    collection_1.StringMapWrapper.forEach(newStyles, function (value, prop) {
        finalStyles[prop] = value == metadata_1.AUTO_STYLE ? nullValue : value.toString();
    });
    collection_1.StringMapWrapper.forEach(previousStyles, function (value, prop) {
        if (!lang_1.isPresent(finalStyles[prop])) {
            finalStyles[prop] = nullValue;
        }
    });
    return finalStyles;
}
exports.prepareFinalAnimationStyles = prepareFinalAnimationStyles;
function balanceAnimationKeyframes(collectedStyles, finalStateStyles, keyframes) {
    var limit = keyframes.length - 1;
    var firstKeyframe = keyframes[0];
    // phase 1: copy all the styles from the first keyframe into the lookup map
    var flatenedFirstKeyframeStyles = flattenStyles(firstKeyframe.styles.styles);
    var extraFirstKeyframeStyles = {};
    var hasExtraFirstStyles = false;
    collection_1.StringMapWrapper.forEach(collectedStyles, function (value, prop) {
        // if the style is already defined in the first keyframe then
        // we do not replace it.
        if (!flatenedFirstKeyframeStyles[prop]) {
            flatenedFirstKeyframeStyles[prop] = value;
            extraFirstKeyframeStyles[prop] = value;
            hasExtraFirstStyles = true;
        }
    });
    var keyframeCollectedStyles = collection_1.StringMapWrapper.merge({}, flatenedFirstKeyframeStyles);
    // phase 2: normalize the final keyframe
    var finalKeyframe = keyframes[limit];
    collection_1.ListWrapper.insert(finalKeyframe.styles.styles, 0, finalStateStyles);
    var flatenedFinalKeyframeStyles = flattenStyles(finalKeyframe.styles.styles);
    var extraFinalKeyframeStyles = {};
    var hasExtraFinalStyles = false;
    collection_1.StringMapWrapper.forEach(keyframeCollectedStyles, function (value, prop) {
        if (!lang_1.isPresent(flatenedFinalKeyframeStyles[prop])) {
            extraFinalKeyframeStyles[prop] = metadata_1.AUTO_STYLE;
            hasExtraFinalStyles = true;
        }
    });
    if (hasExtraFinalStyles) {
        finalKeyframe.styles.styles.push(extraFinalKeyframeStyles);
    }
    collection_1.StringMapWrapper.forEach(flatenedFinalKeyframeStyles, function (value, prop) {
        if (!lang_1.isPresent(flatenedFirstKeyframeStyles[prop])) {
            extraFirstKeyframeStyles[prop] = metadata_1.AUTO_STYLE;
            hasExtraFirstStyles = true;
        }
    });
    if (hasExtraFirstStyles) {
        firstKeyframe.styles.styles.push(extraFirstKeyframeStyles);
    }
    return keyframes;
}
exports.balanceAnimationKeyframes = balanceAnimationKeyframes;
function clearStyles(styles) {
    var finalStyles = {};
    collection_1.StringMapWrapper.keys(styles).forEach(function (key) { finalStyles[key] = null; });
    return finalStyles;
}
exports.clearStyles = clearStyles;
function collectAndResolveStyles(collection, styles) {
    return styles.map(function (entry) {
        var stylesObj = {};
        collection_1.StringMapWrapper.forEach(entry, function (value, prop) {
            if (value == animation_constants_1.FILL_STYLE_FLAG) {
                value = collection[prop];
                if (!lang_1.isPresent(value)) {
                    value = metadata_1.AUTO_STYLE;
                }
            }
            collection[prop] = value;
            stylesObj[prop] = value;
        });
        return stylesObj;
    });
}
exports.collectAndResolveStyles = collectAndResolveStyles;
function renderStyles(element, renderer, styles) {
    collection_1.StringMapWrapper.forEach(styles, function (value, prop) { renderer.setElementStyle(element, prop, value); });
}
exports.renderStyles = renderStyles;
function flattenStyles(styles) {
    var finalStyles = {};
    styles.forEach(function (entry) {
        collection_1.StringMapWrapper.forEach(entry, function (value, prop) { finalStyles[prop] = value; });
    });
    return finalStyles;
}
exports.flattenStyles = flattenStyles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3N0eWxlX3V0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvc3JjL2FuaW1hdGlvbi9hbmltYXRpb25fc3R5bGVfdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsMkJBQTRDLHNCQUFzQixDQUFDLENBQUE7QUFDbkUscUJBQWlDLGdCQUFnQixDQUFDLENBQUE7QUFFbEQsb0NBQThCLHVCQUF1QixDQUFDLENBQUE7QUFDdEQseUJBQXlCLFlBQVksQ0FBQyxDQUFBO0FBRXRDLHFDQUNJLGNBQWdELEVBQUUsU0FBMkMsRUFDN0YsU0FBd0I7SUFBeEIseUJBQXdCLEdBQXhCLGdCQUF3QjtJQUMxQixJQUFJLFdBQVcsR0FBNEIsRUFBRSxDQUFDO0lBRTlDLDZCQUFnQixDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBQyxLQUFhLEVBQUUsSUFBWTtRQUM5RCxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxJQUFJLHFCQUFVLEdBQUcsU0FBUyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6RSxDQUFDLENBQUMsQ0FBQztJQUVILDZCQUFnQixDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsVUFBQyxLQUFhLEVBQUUsSUFBWTtRQUNuRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDaEMsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBaEJlLG1DQUEyQiw4QkFnQjFDLENBQUE7QUFFRCxtQ0FDSSxlQUFpRCxFQUNqRCxnQkFBa0QsRUFBRSxTQUFnQjtJQUN0RSxJQUFJLEtBQUss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