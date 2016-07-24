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
var animation_compiler_1 = require('../../src/animation/animation_compiler');
var compile_metadata_1 = require('../../src/compile_metadata');
var metadata_resolver_1 = require('../../src/metadata_resolver');
function main() {
    testing_internal_1.describe('RuntimeAnimationCompiler', function () {
        var resolver;
        testing_internal_1.beforeEach(testing_internal_1.inject([metadata_resolver_1.CompileMetadataResolver], function (res) { resolver = res; }));
        var compiler = new animation_compiler_1.AnimationCompiler();
        var compileAnimations = function (component) {
            return compiler.compileComponent(component, [])[0];
        };
        var compileTriggers = function (input) {
            var entries = input.map(function (entry) {
                var animationTriggerData = core_1.trigger(entry[0], entry[1]);
                return resolver.getAnimationEntryMetadata(animationTriggerData);
            });
            var component = compile_metadata_1.CompileDirectiveMetadata.create({
                type: new compile_metadata_1.CompileTypeMetadata({ name: 'myCmp' }),
                template: new compile_metadata_1.CompileTemplateMetadata({ animations: entries })
            });
            return compileAnimations(component);
        };
        var compileSequence = function (seq) {
            return compileTriggers([['myAnimation', [core_1.transition('state1 => state2', seq)]]]);
        };
        testing_internal_1.it('should throw an exception containing all the inner animation parser errors', function () {
            var animation = core_1.sequence([
                core_1.style({ 'color': 'red' }), core_1.animate(1000, core_1.style({ 'font-size': '100px' })),
                core_1.style({ 'color': 'blue' }), core_1.animate(1000, core_1.style(':missing_state')), core_1.style({ 'color': 'gold' }),
                core_1.animate(1000, core_1.style('broken_state'))
            ]);
            var capturedErrorMessage;
            try {
                compileSequence(animation);
            }
            catch (e) {
                capturedErrorMessage = e.message;
            }
            testing_internal_1.expect(capturedErrorMessage)
                .toMatch(/Unable to apply styles due to missing a state: "missing_state"/g);
            testing_internal_1.expect(capturedErrorMessage)
                .toMatch(/Animation states via styles must be prefixed with a ":"/);
        });
        testing_internal_1.it('should throw an error when two or more animation triggers contain the same name', function () {
            var t1Data = [];
            var t2Data = [];
            testing_internal_1.expect(function () {
                compileTriggers([['myTrigger', t1Data], ['myTrigger', t2Data]]);
            }).toThrowError(/The animation trigger "myTrigger" has already been registered on "myCmp"/);
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2NvbXBpbGVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3QvYW5pbWF0aW9uL2FuaW1hdGlvbl9jb21waWxlcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBc0YsZUFBZSxDQUFDLENBQUE7QUFDdEcsaUNBQWdJLHdDQUF3QyxDQUFDLENBQUE7QUFHekssbUNBQW1ELHdDQUF3QyxDQUFDLENBQUE7QUFDNUYsaUNBQW9ILDRCQUE0QixDQUFDLENBQUE7QUFDakosa0NBQXNDLDZCQUE2QixDQUFDLENBQUE7QUFFcEU7SUFDRSwyQkFBUSxDQUFDLDBCQUEwQixFQUFFO1FBQ25DLElBQUksUUFBYSxDQUFtQjtRQUNwQyw2QkFBVSxDQUNOLHlCQUFNLENBQUMsQ0FBQywyQ0FBdUIsQ0FBQyxFQUFFLFVBQUMsR0FBNEIsSUFBTyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUU5RixJQUFJLFFBQVEsR0FBRyxJQUFJLHNDQUFpQixFQUFFLENBQUM7UUFFdkMsSUFBSSxpQkFBaUIsR0FBRyxVQUFDLFNBQW1DO1lBQzFELE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQztRQUVGLElBQUksZUFBZSxHQUFHLFVBQUMsS0FBWTtZQUNqQyxJQUFJLE9BQU8sR0FBb0MsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEtBQUs7Z0JBQzVELElBQUksb0JBQW9CLEdBQUcsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkQsTUFBTSxDQUFDLFFBQVEsQ0FBQyx5QkFBeUIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQ2xFLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxTQUFTLEdBQUcsMkNBQXdCLENBQUMsTUFBTSxDQUFDO2dCQUM5QyxJQUFJLEVBQUUsSUFBSSxzQ0FBbUIsQ0FBQyxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQztnQkFDOUMsUUFBUSxFQUFFLElBQUksMENBQXVCLENBQUMsRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFDLENBQUM7YUFDN0QsQ0FBQyxDQUFDO1lBRUgsTUFBTSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQztRQUVGLElBQUksZUFBZSxHQUFHLFVBQUMsR0FBc0I7WUFDM0MsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsYUFBYSxFQUFFLENBQUMsaUJBQVUsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25GLENBQUMsQ0FBQztRQUVGLHFCQUFFLENBQUMsNEVBQTRFLEVBQUU7WUFDL0UsSUFBSSxTQUFTLEdBQUcsZUFBUSxDQUFDO2dCQUN2QixZQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBRSxjQUFPLENBQUMsSUFBSSxFQUFFLFlBQUssQ0FBQyxFQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO2dCQUNyRSxZQUFLLENBQUMsRUFBQyxPQUFPLEVBQUUsTUFBTSxFQUFDLENBQUMsRUFBRSxjQUFPLENBQUMsSUFBSSxFQUFFLFlBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEVBQUUsWUFBSyxDQUFDLEVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBQyxDQUFDO2dCQUMxRixjQUFPLENBQUMsSUFBSSxFQUFFLFlBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUNyQyxDQUFDLENBQUM7WUFFSCxJQUFJLG9CQUE0QixDQUFDO1lBQ2pDLElBQUksQ0FBQztnQkFDSCxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDN0IsQ0FBRTtZQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUNuQyxDQUFDO1lBRUQseUJBQU0sQ0FBQyxvQkFBb0IsQ0FBQztpQkFDdkIsT0FBTyxDQUFDLGlFQUFpRSxDQUFDLENBQUM7WUFFaEYseUJBQU0sQ0FBQyxvQkFBb0IsQ0FBQztpQkFDdkIsT0FBTyxDQUFDLHlEQUF5RCxDQUFDLENBQUM7UUFDMUUsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLGlGQUFpRixFQUFFO1lBQ3BGLElBQUksTUFBTSxHQUFVLEVBQUUsQ0FBQztZQUN2QixJQUFJLE1BQU0sR0FBVSxFQUFFLENBQUM7WUFFdkIseUJBQU0sQ0FBQztnQkFDTCxlQUFlLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLDBFQUEwRSxDQUFDLENBQUM7UUFDOUYsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUE1RGUsWUFBSSxPQTREbkIsQ0FBQSJ9