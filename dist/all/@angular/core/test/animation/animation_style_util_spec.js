/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var animation_constants_1 = require('../../src/animation/animation_constants');
var animation_keyframe_1 = require('../../src/animation/animation_keyframe');
var animationUtils = require('../../src/animation/animation_style_util');
var animation_styles_1 = require('../../src/animation/animation_styles');
var metadata_1 = require('../../src/animation/metadata');
var testing_internal_1 = require('../../testing/testing_internal');
function main() {
    testing_internal_1.describe('Animation Style Utils', function () {
        testing_internal_1.describe('prepareFinalAnimationStyles', function () {
            testing_internal_1.it('should set all non-shared styles to the provided null value between the two sets of styles', function () {
                var styles = { opacity: 0, color: 'red' };
                var newStyles = { background: 'red' };
                var flag = '*';
                var result = animationUtils.prepareFinalAnimationStyles(styles, newStyles, flag);
                testing_internal_1.expect(result).toEqual({ opacity: flag, color: flag, background: 'red' });
            });
            testing_internal_1.it('should handle an empty set of styles', function () {
                var value = '*';
                testing_internal_1.expect(animationUtils.prepareFinalAnimationStyles({}, { opacity: '0' }, value)).toEqual({
                    opacity: '0'
                });
                testing_internal_1.expect(animationUtils.prepareFinalAnimationStyles({ opacity: '0' }, {}, value)).toEqual({
                    opacity: value
                });
            });
            testing_internal_1.it('should set all AUTO styles to the null value', function () {
                var styles = { opacity: 0 };
                var newStyles = { color: '*', border: '*' };
                var flag = '*';
                var result = animationUtils.prepareFinalAnimationStyles(styles, newStyles, null);
                testing_internal_1.expect(result).toEqual({ opacity: null, color: null, border: null });
            });
        });
        testing_internal_1.describe('balanceAnimationKeyframes', function () {
            testing_internal_1.it('should balance both the starting and final keyframes with thep provided styles', function () {
                var collectedStyles = { width: 100, height: 200 };
                var finalStyles = { background: 'red', border: '1px solid black' };
                var keyframes = [
                    new animation_keyframe_1.AnimationKeyframe(0, new animation_styles_1.AnimationStyles([{ height: 100, opacity: 1 }])),
                    new animation_keyframe_1.AnimationKeyframe(1, new animation_styles_1.AnimationStyles([{ background: 'blue', left: '100px', top: '100px' }]))
                ];
                var result = animationUtils.balanceAnimationKeyframes(collectedStyles, finalStyles, keyframes);
                testing_internal_1.expect(animationUtils.flattenStyles(result[0].styles.styles)).toEqual({
                    'width': 100,
                    'height': 100,
                    'opacity': 1,
                    'background': '*',
                    'border': '*',
                    'left': '*',
                    'top': '*'
                });
                testing_internal_1.expect(animationUtils.flattenStyles(result[1].styles.styles)).toEqual({
                    'width': '*',
                    'height': '*',
                    'opacity': '*',
                    'background': 'blue',
                    'border': '1px solid black',
                    'left': '100px',
                    'top': '100px'
                });
            });
            testing_internal_1.it('should perform balancing when no collected and final styles are provided', function () {
                var keyframes = [
                    new animation_keyframe_1.AnimationKeyframe(0, new animation_styles_1.AnimationStyles([{ height: 100, opacity: 1 }])),
                    new animation_keyframe_1.AnimationKeyframe(1, new animation_styles_1.AnimationStyles([{ width: 100 }]))
                ];
                var result = animationUtils.balanceAnimationKeyframes({}, {}, keyframes);
                testing_internal_1.expect(animationUtils.flattenStyles(result[0].styles.styles))
                    .toEqual({ 'height': 100, 'opacity': 1, 'width': '*' });
                testing_internal_1.expect(animationUtils.flattenStyles(result[1].styles.styles))
                    .toEqual({ 'width': 100, 'height': '*', 'opacity': '*' });
            });
        });
        testing_internal_1.describe('clearStyles', function () {
            testing_internal_1.it('should set all the style values to "null"', function () {
                var styles = { 'opacity': 0, 'width': 100, 'color': 'red' };
                var expectedResult = { 'opacity': null, 'width': null, 'color': null };
                testing_internal_1.expect(animationUtils.clearStyles(styles)).toEqual(expectedResult);
            });
            testing_internal_1.it('should handle an empty set of styles', function () { testing_internal_1.expect(animationUtils.clearStyles({})).toEqual({}); });
        });
        testing_internal_1.describe('collectAndResolveStyles', function () {
            testing_internal_1.it('should keep a record of the styles as they are called', function () {
                var styles1 = [{ 'opacity': 0, 'width': 100 }];
                var styles2 = [{ 'height': 999, 'opacity': 1 }];
                var collection = {};
                testing_internal_1.expect(animationUtils.collectAndResolveStyles(collection, styles1)).toEqual(styles1);
                testing_internal_1.expect(collection).toEqual({ 'opacity': 0, 'width': 100 });
                testing_internal_1.expect(animationUtils.collectAndResolveStyles(collection, styles2)).toEqual(styles2);
                testing_internal_1.expect(collection).toEqual({ 'opacity': 1, 'width': 100, 'height': 999 });
            });
            testing_internal_1.it('should resolve styles if they contain a FILL_STYLE_FLAG value', function () {
                var styles1 = [{ 'opacity': 0, 'width': animation_constants_1.FILL_STYLE_FLAG }];
                var styles2 = [{ 'height': 999, 'opacity': animation_constants_1.FILL_STYLE_FLAG }];
                var collection = {};
                testing_internal_1.expect(animationUtils.collectAndResolveStyles(collection, styles1)).toEqual([
                    { 'opacity': 0, 'width': metadata_1.AUTO_STYLE }
                ]);
                testing_internal_1.expect(animationUtils.collectAndResolveStyles(collection, styles2)).toEqual([
                    { 'opacity': 0, 'height': 999 }
                ]);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3N0eWxlX3V0aWxfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L2FuaW1hdGlvbi9hbmltYXRpb25fc3R5bGVfdXRpbF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxvQ0FBOEIseUNBQXlDLENBQUMsQ0FBQTtBQUN4RSxtQ0FBZ0Msd0NBQXdDLENBQUMsQ0FBQTtBQUN6RSxJQUFZLGNBQWMsV0FBTSwwQ0FBMEMsQ0FBQyxDQUFBO0FBQzNFLGlDQUE4QixzQ0FBc0MsQ0FBQyxDQUFBO0FBQ3JFLHlCQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELGlDQUEyRyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRTVJO0lBQ0UsMkJBQVEsQ0FBQyx1QkFBdUIsRUFBRTtRQUVoQywyQkFBUSxDQUFDLDZCQUE2QixFQUFFO1lBQ3RDLHFCQUFFLENBQUMsNEZBQTRGLEVBQzVGO2dCQUNFLElBQUksTUFBTSxHQUFHLEVBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFDLENBQUM7Z0JBQ3hDLElBQUksU0FBUyxHQUFHLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxDQUFDO2dCQUNwQyxJQUFJLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBQ2YsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLDJCQUEyQixDQUFDLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2pGLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO1lBQzFFLENBQUMsQ0FBQyxDQUFDO1lBRU4scUJBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtnQkFDekMsSUFBSSxLQUFL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