/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var animation_group_player_1 = require('../../src/animation/animation_group_player');
var testing_1 = require('../../testing');
var mock_animation_player_1 = require('../../testing/mock_animation_player');
var testing_internal_1 = require('../../testing/testing_internal');
function main() {
    testing_internal_1.describe('AnimationGroupPlayer', function () {
        var players;
        testing_internal_1.beforeEach(function () {
            players = [
                new mock_animation_player_1.MockAnimationPlayer(),
                new mock_animation_player_1.MockAnimationPlayer(),
                new mock_animation_player_1.MockAnimationPlayer(),
            ];
        });
        var assertLastStatus = function (player, status, match, iOffset) {
            if (iOffset === void 0) { iOffset = 0; }
            var index = player.log.length - 1 + iOffset;
            var actual = player.log.length > 0 ? player.log[index] : null;
            if (match) {
                testing_internal_1.expect(actual).toEqual(status);
            }
            else {
                testing_internal_1.expect(actual).not.toEqual(status);
            }
        };
        var assertPlaying = function (player, isPlaying) {
            assertLastStatus(player, 'play', isPlaying);
        };
        testing_internal_1.it('should play and pause all players in parallel', function () {
            var group = new animation_group_player_1.AnimationGroupPlayer(players);
            assertPlaying(players[0], false);
            assertPlaying(players[1], false);
            assertPlaying(players[2], false);
            group.play();
            assertPlaying(players[0], true);
            assertPlaying(players[1], true);
            assertPlaying(players[2], true);
            group.pause();
            assertPlaying(players[0], false);
            assertPlaying(players[1], false);
            assertPlaying(players[2], false);
        });
        testing_internal_1.it('should finish when all players have finished', function () {
            var group = new animation_group_player_1.AnimationGroupPlayer(players);
            var completed = false;
            group.onDone(function () { return completed = true; });
            group.play();
            testing_internal_1.expect(completed).toBeFalsy();
            players[0].finish();
            testing_internal_1.expect(completed).toBeFalsy();
            players[1].finish();
            testing_internal_1.expect(completed).toBeFalsy();
            players[2].finish();
            testing_internal_1.expect(completed).toBeTruthy();
        });
        testing_internal_1.it('should restart all the players', function () {
            var group = new animation_group_player_1.AnimationGroupPlayer(players);
            group.play();
            assertLastStatus(players[0], 'restart', false);
            assertLastStatus(players[1], 'restart', false);
            assertLastStatus(players[2], 'restart', false);
            group.restart();
            assertLastStatus(players[0], 'restart', true);
            assertLastStatus(players[1], 'restart', true);
            assertLastStatus(players[2], 'restart', true);
        });
        testing_internal_1.it('should finish all the players', function () {
            var group = new animation_group_player_1.AnimationGroupPlayer(players);
            var completed = false;
            group.onDone(function () { return completed = true; });
            testing_internal_1.expect(completed).toBeFalsy();
            group.play();
            assertLastStatus(players[0], 'finish', false);
            assertLastStatus(players[1], 'finish', false);
            assertLastStatus(players[2], 'finish', false);
            testing_internal_1.expect(completed).toBeFalsy();
            group.finish();
            assertLastStatus(players[0], 'finish', true, -1);
            assertLastStatus(players[1], 'finish', true, -1);
            assertLastStatus(players[2], 'finish', true, -1);
            assertLastStatus(players[0], 'destroy', true);
            assertLastStatus(players[1], 'destroy', true);
            assertLastStatus(players[2], 'destroy', true);
            testing_internal_1.expect(completed).toBeTruthy();
        });
        testing_internal_1.it('should call destroy automatically when finished if no parent player is present', function () {
            var group = new animation_group_player_1.AnimationGroupPlayer(players);
            group.play();
            assertLastStatus(players[0], 'destroy', false);
            assertLastStatus(players[1], 'destroy', false);
            assertLastStatus(players[2], 'destroy', false);
            group.finish();
            assertLastStatus(players[0], 'destroy', true);
            assertLastStatus(players[1], 'destroy', true);
            assertLastStatus(players[2], 'destroy', true);
        });
        testing_internal_1.it('should not call destroy automatically when finished if a parent player is present', function () {
            var group = new animation_group_player_1.AnimationGroupPlayer(players);
            var parent = new animation_group_player_1.AnimationGroupPlayer([group, new mock_animation_player_1.MockAnimationPlayer()]);
            group.play();
            assertLastStatus(players[0], 'destroy', false);
            assertLastStatus(players[1], 'destroy', false);
            assertLastStatus(players[2], 'destroy', false);
            group.finish();
            assertLastStatus(players[0], 'destroy', false);
            assertLastStatus(players[1], 'destroy', false);
            assertLastStatus(players[2], 'destroy', false);
            parent.finish();
            assertLastStatus(players[0], 'destroy', true);
            assertLastStatus(players[1], 'destroy', true);
            assertLastStatus(players[2], 'destroy', true);
        });
        testing_internal_1.it('should function without any players', function () {
            var group = new animation_group_player_1.AnimationGroupPlayer([]);
            group.onDone(function () { });
            group.pause();
            group.play();
            group.finish();
            group.restart();
            group.destroy();
        });
        testing_internal_1.it('should call onDone after the next microtask if no players are provided', testing_1.fakeAsync(function () {
            var group = new animation_group_player_1.AnimationGroupPlayer([]);
            var completed = false;
            group.onDone(function () { return completed = true; });
            testing_internal_1.expect(completed).toEqual(false);
            testing_1.flushMicrotasks();
            testing_internal_1.expect(completed).toEqual(true);
        }));
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2dyb3VwX3BsYXllcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvYW5pbWF0aW9uL2FuaW1hdGlvbl9ncm91cF9wbGF5ZXJfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUNBQW1DLDRDQUE0QyxDQUFDLENBQUE7QUFDaEYsd0JBQXlDLGVBQWUsQ0FBQyxDQUFBO0FBQ3pELHNDQUFrQyxxQ0FBcUMsQ0FBQyxDQUFBO0FBQ3hFLGlDQUEyRyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRTVJO0lBQ0UsMkJBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixJQUFJLE9BQVksQ0FBbUI7UUFDbkMsNkJBQVUsQ0FBQztZQUNULE9BQU8sR0FBRztnQkFDUixJQUFJLDJDQUFtQixFQUFFO2dCQUN6QixJQUFJLDJDQUFtQixFQUFFO2dCQUN6QixJQUFJLDJDQUFtQixFQUFFO2FBQzFCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksZ0JBQWdCLEdBQ2hCLFVBQUMsTUFBMkIsRUFBRSxNQUFjLEVBQUUsS0FBYyxFQUFFLE9BQW1CO1lBQW5CLHVCQUFtQixHQUFuQixXQUFtQjtZQUMvRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBQzVDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztZQUM5RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNWLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFBQyxJQUFJ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