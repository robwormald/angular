/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var core_private_1 = require('../../core_private');
var animation_parser_1 = require('../../src/animation/animation_parser');
var collection_1 = require('../../src/facade/collection');
var metadata_resolver_1 = require('../../src/metadata_resolver');
function main() {
    testing_internal_1.describe('parseAnimationEntry', function () {
        var combineStyles = function (styles) {
            var flatStyles = {};
            styles.styles.forEach(function (entry) { return collection_1.StringMapWrapper.forEach(entry, function (val /** TODO #9100 */, prop /** TODO #9100 */) {
                flatStyles[prop] = val;
            }); });
            return flatStyles;
        };
        var collectKeyframeStyles = function (keyframe) { return combineStyles(keyframe.styles); };
        var collectStepStyles = function (step) {
            var keyframes = step.keyframes;
            var styles = [];
            if (step.startingStyles.styles.length > 0) {
                styles.push(combineStyles(step.startingStyles));
            }
            keyframes.forEach(function (keyframe) { return styles.push(collectKeyframeStyles(keyframe)); });
            return styles;
        };
        var resolver;
        testing_internal_1.beforeEach(testing_internal_1.inject([metadata_resolver_1.CompileMetadataResolver], function (res) { resolver = res; }));
        var parseAnimation = function (data) {
            var entry = core_1.trigger('myAnimation', [core_1.transition('state1 => state2', core_1.sequence(data))]);
            var compiledAnimationEntry = resolver.getAnimationEntryMetadata(entry);
            return animation_parser_1.parseAnimationEntry(compiledAnimationEntry);
        };
        var getAnimationAstFromEntryAst = function (ast) { return ast.stateTransitions[0].animation; };
        var parseAnimationAst = function (data) {
            return getAnimationAstFromEntryAst(parseAnimation(data).ast);
        };
        var parseAnimationAndGetErrors = function (data) { return parseAnimation(data).errors; };
        testing_internal_1.it('should merge repeated style steps into a single style ast step entry', function () {
            var ast = parseAnimationAst([
                core_1.style({ 'color': 'black' }), core_1.style({ 'background': 'red' }), core_1.style({ 'opacity': 0 }),
                core_1.animate(1000, core_1.style({ 'color': 'white', 'background': 'black', 'opacity': 1 }))
            ]);
            matchers_1.expect(ast.steps.length).toEqual(1);
            var step = ast.steps[0];
            matchers_1.expect(step.startingStyles.styles[0])
                .toEqual({ 'color': 'black', 'background': 'red', 'opacity': 0 });
            matchers_1.expect(step.keyframes[0].styles.styles[0])
                .toEqual({ 'color': 'black', 'background': 'red', 'opacity': 0 });
            matchers_1.expect(step.keyframes[1].styles.styles[0])
                .toEqual({ 'color': 'white', 'background': 'black', 'opacity': 1 });
        });
        testing_internal_1.it('should animate only the styles requested within an animation step', function () {
            var ast = parseAnimationAst([
                core_1.style({ 'color': 'black', 'background': 'blue' }),
                core_1.animate(1000, core_1.style({ 'background': 'orange' }))
            ]);
            matchers_1.expect(ast.steps.length).toEqual(1);
            var animateStep = ast.steps[0];
            var fromKeyframe = animateStep.keyframes[0].styles.styles[0];
            var toKeyframe = animateStep.keyframes[1].styles.styles[0];
            matchers_1.expect(fromKeyframe).toEqual({ 'background': 'blue' });
            matchers_1.expect(toKeyframe).toEqual({ 'background': 'orange' });
        });
        testing_internal_1.it('should populate the starting and duration times propertly', function () {
            var ast = parseAnimationAst([
                core_1.style({ 'color': 'black', 'opacity': 1 }),
                core_1.animate(1000, core_1.style({ 'color': 'red' })),
                core_1.animate(4000, core_1.style({ 'color': 'yellow' })),
                core_1.sequence([core_1.animate(1000, core_1.style({ 'color': 'blue' })), core_1.animate(1000, core_1.style({ 'color': 'grey' }))]),
                core_1.group([core_1.animate(500, core_1.style({ 'color': 'pink' })), core_1.animate(1000, core_1.style({ 'opacity': '0.5' }))]),
                core_1.animate(300, core_1.style({ 'color': 'black' })),
            ]);
            matchers_1.expect(ast.steps.length).toEqual(5);
            var step1 = ast.steps[0];
            matchers_1.expect(step1.playTime).toEqual(1000);
            matchers_1.expect(step1.startTime).toEqual(0);
            var step2 = ast.steps[1];
            matchers_1.expect(step2.playTime).toEqual(4000);
            matchers_1.expect(step2.startTime).toEqual(1000);
            var seq = ast.steps[2];
            matchers_1.expect(seq.playTime).toEqual(2000);
            matchers_1.expect(seq.startTime).toEqual(5000);
            var step4 = seq.steps[0];
            matchers_1.expect(step4.playTime).toEqual(1000);
            matchers_1.expect(step4.startTime).toEqual(5000);
            var step5 = seq.steps[1];
            matchers_1.expect(step5.playTime).toEqual(1000);
            matchers_1.expect(step5.startTime).toEqual(6000);
            var grp = ast.steps[3];
            matchers_1.expect(grp.playTime).toEqual(1000);
            matchers_1.expect(grp.startTime).toEqual(7000);
            var step6 = grp.steps[0];
            matchers_1.expect(step6.playTime).toEqual(500);
            matchers_1.expect(step6.startTime).toEqual(7000);
            var step7 = grp.steps[1];
            matchers_1.expect(step7.playTime).toEqual(1000);
            matchers_1.expect(step7.startTime).toEqual(7000);
            var step8 = ast.steps[4];
            matchers_1.expect(step8.playTime).toEqual(300);
            matchers_1.expect(step8.startTime).toEqual(8000);
        });
        testing_internal_1.it('should apply the correct animate() styles when parallel animations are active and use the same properties', function () {
            var details = parseAnimation([
                core_1.style({ 'opacity': 0, 'color': 'red' }), core_1.group([
                    core_1.sequence([
                        core_1.animate(2000, core_1.style({ 'color': 'black' })),
                        core_1.animate(2000, core_1.style({ 'opacity': 0.5 })),
                    ]),
                    core_1.sequence([
                        core_1.animate(2000, core_1.style({ 'opacity': 0.8 })),
                        core_1.animate(2000, core_1.style({ 'color': 'blue' }))
                    ])
                ])
            ]);
            var errors = details.errors;
            matchers_1.expect(errors.length).toEqual(0);
            var ast = getAnimationAstFromEntryAst(details.ast);
            var g1 = ast.steps[1];
            var sq1 = g1.steps[0];
            var sq2 = g1.steps[1];
            var sq1a1 = sq1.steps[0];
            matchers_1.expect(collectStepStyles(sq1a1)).toEqual([{ 'color': 'red' }, { 'color': 'black' }]);
            var sq1a2 = sq1.steps[1];
            matchers_1.expect(collectStepStyles(sq1a2)).toEqual([{ 'opacity': 0.8 }, { 'opacity': 0.5 }]);
            var sq2a1 = sq2.steps[0];
            matchers_1.expect(collectStepStyles(sq2a1)).toEqual([{ 'opacity': 0 }, { 'opacity': 0.8 }]);
            var sq2a2 = sq2.steps[1];
            matchers_1.expect(collectStepStyles(sq2a2)).toEqual([{ 'color': 'black' }, { 'color': 'blue' }]);
        });
        testing_internal_1.it('should throw errors when animations animate a CSS property at the same time', function () {
            var animation1 = parseAnimation([
                core_1.style({ 'opacity': 0 }),
                core_1.group([core_1.animate(1000, core_1.style({ 'opacity': 1 })), core_1.animate(2000, core_1.style({ 'opacity': 0.5 }))])
            ]);
            var errors1 = animation1.errors;
            matchers_1.expect(errors1.length).toEqual(1);
            matchers_1.expect(errors1[0].msg)
                .toContainError('The animated CSS property "opacity" unexpectedly changes between steps "0ms" and "2000ms" at "1000ms"');
            var animation2 = parseAnimation([
                core_1.style({ 'color': 'red' }),
                core_1.group([core_1.animate(5000, core_1.style({ 'color': 'blue' })), core_1.animate(2500, core_1.style({ 'color': 'black' }))])
            ]);
            var errors2 = animation2.errors;
            matchers_1.expect(errors2.length).toEqual(1);
            matchers_1.expect(errors2[0].msg)
                .toContainError('The animated CSS property "color" unexpectedly changes between steps "0ms" and "5000ms" at "2500ms"');
        });
        testing_internal_1.it('should return an error when an animation style contains an invalid timing value', function () {
            var errors = parseAnimationAndGetErrors([core_1.style({ 'opacity': 0 }), core_1.animate('one second', core_1.style({ 'opacity': 1 }))]);
            matchers_1.expect(errors[0].msg).toContainError("The provided timing value \"one second\" is invalid.");
        });
        testing_internal_1.it('should collect and return any errors collected when parsing the metadata', function () {
            var errors = parseAnimationAndGetErrors([
                core_1.style({ 'opacity': 0 }), core_1.animate('one second', core_1.style({ 'opacity': 1 })), core_1.style({ 'opacity': 0 }),
                core_1.animate('one second', null), core_1.style({ 'background': 'red' })
            ]);
            matchers_1.expect(errors.length).toBeGreaterThan(1);
        });
        testing_internal_1.it('should normalize a series of keyframe styles into a list of offset steps', function () {
            var ast = parseAnimationAst([core_1.animate(1000, core_1.keyframes([
                    core_1.style({ 'width': 0 }), core_1.style({ 'width': 25 }),
                    core_1.style({ 'width': 50 }), core_1.style({ 'width': 75 })
                ]))]);
            var step = ast.steps[0];
            matchers_1.expect(step.keyframes.length).toEqual(4);
            matchers_1.expect(step.keyframes[0].offset).toEqual(0);
            matchers_1.expect(step.keyframes[1].offset).toMatch(/^0\.33/);
            matchers_1.expect(step.keyframes[2].offset).toMatch(/^0\.66/);
            matchers_1.expect(step.keyframes[3].offset).toEqual(1);
        });
        testing_internal_1.it('should use an existing collection of offset steps if provided', function () {
            var ast = parseAnimationAst([core_1.animate(1000, core_1.keyframes([
                    core_1.style({ 'height': 0, 'offset': 0 }), core_1.style({ 'height': 25, 'offset': 0.6 }),
                    core_1.style({ 'height': 50, 'offset': 0.7 }), core_1.style({ 'height': 75, 'offset': 1 })
                ]))]);
            var step = ast.steps[0];
            matchers_1.expect(step.keyframes.length).toEqual(4);
            matchers_1.expect(step.keyframes[0].offset).toEqual(0);
            matchers_1.expect(step.keyframes[1].offset).toEqual(0.6);
            matchers_1.expect(step.keyframes[2].offset).toEqual(0.7);
            matchers_1.expect(step.keyframes[3].offset).toEqual(1);
        });
        testing_internal_1.it('should sort the provided collection of steps that contain offsets', function () {
            var ast = parseAnimationAst([core_1.animate(1000, core_1.keyframes([
                    core_1.style({ 'opacity': 0, 'offset': 0.9 }), core_1.style({ 'opacity': .25, 'offset': 0 }),
                    core_1.style({ 'opacity': .50, 'offset': 1 }), core_1.style({ 'opacity': .75, 'offset': 0.91 })
                ]))]);
            var step = ast.steps[0];
            matchers_1.expect(step.keyframes.length).toEqual(4);
            matchers_1.expect(step.keyframes[0].offset).toEqual(0);
            matchers_1.expect(step.keyframes[0].styles.styles[0]['opacity']).toEqual(.25);
            matchers_1.expect(step.keyframes[1].offset).toEqual(0.9);
            matchers_1.expect(step.keyframes[1].styles.styles[0]['opacity']).toEqual(0);
            matchers_1.expect(step.keyframes[2].offset).toEqual(0.91);
            matchers_1.expect(step.keyframes[2].styles.styles[0]['opacity']).toEqual(.75);
            matchers_1.expect(step.keyframes[3].offset).toEqual(1);
            matchers_1.expect(step.keyframes[3].styles.styles[0]['opacity']).toEqual(.50);
        });
        testing_internal_1.it('should throw an error if a partial amount of keyframes contain an offset', function () {
            var errors = parseAnimationAndGetErrors([core_1.animate(1000, core_1.keyframes([
                    core_1.style({ 'z-index': 0, 'offset': 0 }), core_1.style({ 'z-index': 1 }),
                    core_1.style({ 'z-index': 2, 'offset': 1 })
                ]))]);
            matchers_1.expect(errors.length).toEqual(1);
            var error = errors[0];
            matchers_1.expect(error.msg).toMatch(/Not all style\(\) entries contain an offset/);
        });
        testing_internal_1.it('should use an existing style used earlier in the animation sequence if not defined in the first keyframe', function () {
            var ast = parseAnimationAst([core_1.animate(1000, core_1.keyframes([core_1.style({ 'color': 'red' }), core_1.style({ 'background': 'blue', 'color': 'white' })]))]);
            var keyframesStep = ast.steps[0];
            var kf1 = keyframesStep.keyframes[0];
            var kf2 = keyframesStep.keyframes[1];
            matchers_1.expect(core_private_1.flattenStyles(kf1.styles.styles))
                .toEqual({ 'color': 'red', 'background': core_private_1.FILL_STYLE_FLAG });
        });
        testing_internal_1.it('should copy over any missing styles to the final keyframe if not already defined', function () {
            var ast = parseAnimationAst([core_1.animate(1000, core_1.keyframes([
                    core_1.style({ 'color': 'white', 'border-color': 'white' }),
                    core_1.style({ 'color': 'red', 'background': 'blue' }), core_1.style({ 'background': 'blue' })
                ]))]);
            var keyframesStep = ast.steps[0];
            var kf1 = keyframesStep.keyframes[0];
            var kf2 = keyframesStep.keyframes[1];
            var kf3 = keyframesStep.keyframes[2];
            matchers_1.expect(core_private_1.flattenStyles(kf3.styles.styles))
                .toEqual({ 'background': 'blue', 'color': 'red', 'border-color': 'white' });
        });
        testing_internal_1.it('should create an initial keyframe if not detected and place all keyframes styles there', function () {
            var ast = parseAnimationAst([core_1.animate(1000, core_1.keyframes([
                    core_1.style({ 'color': 'white', 'background': 'black', 'offset': 0.5 }), core_1.style({
                        'color': 'orange',
                        'background': 'red',
                        'font-size': '100px',
                        'offset': 1
                    })
                ]))]);
            var keyframesStep = ast.steps[0];
            matchers_1.expect(keyframesStep.keyframes.length).toEqual(3);
            var kf1 = keyframesStep.keyframes[0];
            var kf2 = keyframesStep.keyframes[1];
            var kf3 = keyframesStep.keyframes[2];
            matchers_1.expect(kf1.offset).toEqual(0);
            matchers_1.expect(core_private_1.flattenStyles(kf1.styles.styles)).toEqual({
                'font-size': core_private_1.FILL_STYLE_FLAG,
                'background': core_private_1.FILL_STYLE_FLAG,
                'color': core_private_1.FILL_STYLE_FLAG
            });
        });
        testing_internal_1.it('should create an destination keyframe if not detected and place all keyframes styles there', function () {
            var ast = parseAnimationAst([core_1.animate(1000, core_1.keyframes([
                    core_1.style({
                        'color': 'white',
                        'background': 'black',
                        'transform': 'rotate(360deg)',
                        'offset': 0
                    }),
                    core_1.style({
                        'color': 'orange',
                        'background': 'red',
                        'font-size': '100px',
                        'offset': 0.5
                    })
                ]))]);
            var keyframesStep = ast.steps[0];
            matchers_1.expect(keyframesStep.keyframes.length).toEqual(3);
            var kf1 = keyframesStep.keyframes[0];
            var kf2 = keyframesStep.keyframes[1];
            var kf3 = keyframesStep.keyframes[2];
            matchers_1.expect(kf3.offset).toEqual(1);
            matchers_1.expect(core_private_1.flattenStyles(kf3.styles.styles)).toEqual({
                'color': 'orange',
                'background': 'red',
                'transform': 'rotate(360deg)',
                'font-size': '100px'
            });
        });
        testing_internal_1.describe('easing / duration / delay', function () {
            testing_internal_1.it('should parse simple string-based values', function () {
                var ast = parseAnimationAst([core_1.animate('1s .5s ease-out', core_1.style({ 'opacity': 1 }))]);
                var step = ast.steps[0];
                matchers_1.expect(step.duration).toEqual(1000);
                matchers_1.expect(step.delay).toEqual(500);
                matchers_1.expect(step.easing).toEqual('ease-out');
            });
            testing_internal_1.it('should parse a numeric duration value', function () {
                var ast = parseAnimationAst([core_1.animate(666, core_1.style({ 'opacity': 1 }))]);
                var step = ast.steps[0];
                matchers_1.expect(step.duration).toEqual(666);
                matchers_1.expect(step.delay).toEqual(0);
                matchers_1.expect(step.easing).toBeFalsy();
            });
            testing_internal_1.it('should parse an easing value without a delay', function () {
                var ast = parseAnimationAst([core_1.animate('5s linear', core_1.style({ 'opacity': 1 }))]);
                var step = ast.steps[0];
                matchers_1.expect(step.duration).toEqual(5000);
                matchers_1.expect(step.delay).toEqual(0);
                matchers_1.expect(step.easing).toEqual('linear');
            });
            testing_internal_1.it('should parse a complex easing value', function () {
                var ast = parseAnimationAst([core_1.animate('30ms cubic-bezier(0, 0,0, .69)', core_1.style({ 'opacity': 1 }))]);
                var step = ast.steps[0];
                matchers_1.expect(step.duration).toEqual(30);
                matchers_1.expect(step.delay).toEqual(0);
                matchers_1.expect(step.easing).toEqual('cubic-bezier(0, 0,0, .69)');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3BhcnNlcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L2FuaW1hdGlvbi9hbmltYXRpb25fcGFyc2VyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUF5TyxlQUFlLENBQUMsQ0FBQTtBQUN6UCxpQ0FBd0gsd0NBQXdDLENBQUMsQ0FBQTtBQUNqSyx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUVsRSw2QkFBNkMsb0JBQW9CLENBQUMsQ0FBQTtBQUVsRSxpQ0FBa0Msc0NBQXNDLENBQUMsQ0FBQTtBQUN6RSwyQkFBK0IsNkJBQTZCLENBQUMsQ0FBQTtBQUM3RCxrQ0FBc0MsNkJBQTZCLENBQUMsQ0FBQTtBQUVwRTtJQUNFLDJCQUFRLENBQUMscUJBQXFCLEVBQUU7UUFDOUIsSUFBSSxhQUFhLEdBQUcsVUFBQyxNQUEwQjtZQUM3QyxJQUFJLFVBQVUsR0FBcUMsRUFBRSxDQUFDO1lBQ3RELE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUNqQixVQUFBLEtBQUssSUFBSSxPQUFBLDZCQUFnQixDQUFDLE9BQU8sQ0FDN0IsS0FBSyxFQUFFLFVBQUMsR0FBUSxDQUFDLGlCQUFpQixFQUFFLElBQVMsQ0FBQyxpQkFBaUI7Z0JBQzdELFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDekIsQ0FBQyxDQUFDLEVBSEcsQ0FHSCxDQUFDLENBQUM7WUFDWixNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3BCLENBQUMsQ0FBQztRQUVGLElBQUkscUJBQXFCLEdBQUcsVUFBQyxRQUE4QixJQUNqQixNQUFNLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRixJQUFJLGlCQUFpQixHQUFHLFVBQUMsSUFBc0I7WUFDN0MsSUFB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