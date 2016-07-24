/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var animation_player_1 = require('../../src/animation/animation_player');
var testing_1 = require('../../testing');
var testing_internal_1 = require('../../testing/testing_internal');
function main() {
    testing_internal_1.describe('NoOpAnimationPlayer', function () {
        testing_internal_1.it('should call onDone after the next microtask when constructed', testing_1.fakeAsync(function () {
            var player = new animation_player_1.NoOpAnimationPlayer();
            var completed = false;
            player.onDone(function () { return completed = true; });
            testing_internal_1.expect(completed).toEqual(false);
            testing_1.flushMicrotasks();
            testing_internal_1.expect(completed).toEqual(true);
        }));
        testing_internal_1.it('should be able to run each of the player methods', testing_1.fakeAsync(function () {
            var player = new animation_player_1.NoOpAnimationPlayer();
            player.pause();
            player.play();
            player.finish();
            player.restart();
            player.destroy();
        }));
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3BsYXllcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvYW5pbWF0aW9uL2FuaW1hdGlvbl9wbGF5ZXJfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQW1ELHNDQUFzQyxDQUFDLENBQUE7QUFDMUYsd0JBQXlDLGVBQWUsQ0FBQyxDQUFBO0FBQ3pELGlDQUEyRyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRTVJO0lBQ0UsMkJBQVEsQ0FBQyxxQkFBcUIsRUFBRTtRQUM5QixxQkFBRSxDQUFDLDhEQUE4RCxFQUFFLG1CQUFTLENBQUM7WUFDeEUsSUFBSSxNQUFNLEdBQUcsSUFBSSxzQ0FBbUIsRUFBRSxDQUFDO1lBQ3ZDLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN0QixNQUFNLENBQUMsTUFBTSxDQUFDLGNBQU0sT0FBQSxTQUFTLEdBQUcsSUFBSSxFQUFoQixDQUFnQixDQUFDLENBQUM7WUFDdEMseUJBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDakMseUJBQWUsRUFBRSxDQUFDO1lBQ2xCLHlCQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFUCxxQkFBRSxDQUFDLGtEQUFrRCxFQUFFLG1CQUFTLENBQUM7WUFDNUQsSUFBSSxNQUFNLEdBQUcsSUFBSSxzQ0FBbUIsRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNmLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNkLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakIsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDVCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFwQmUsWUFBSSxPQW9CbkIsQ0FBQSJ9