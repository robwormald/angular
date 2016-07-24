/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var animation_sequence_player_1 = require('../../src/animation/animation_sequence_player');
var testing_1 = require('../../testing');
var mock_animation_player_1 = require('../../testing/mock_animation_player');
var testing_internal_1 = require('../../testing/testing_internal');
function main() {
    testing_internal_1.describe('AnimationSequencePlayer', function () {
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
        testing_internal_1.it('should pause/play the active player', function () {
            var sequence = new animation_sequence_player_1.AnimationSequencePlayer(players);
            assertPlaying(players[0], false);
            assertPlaying(players[1], false);
            assertPlaying(players[2], false);
            sequence.play();
            assertPlaying(players[0], true);
            assertPlaying(players[1], false);
            assertPlaying(players[2], false);
            sequence.pause();
            assertPlaying(players[0], false);
            assertPlaying(players[1], false);
            assertPlaying(players[2], false);
            sequence.play();
            players[0].finish();
            assertPlaying(players[0], false);
            assertPlaying(players[1], true);
            assertPlaying(players[2], false);
            players[1].finish();
            assertPlaying(players[0], false);
            assertPlaying(players[1], false);
            assertPlaying(players[2], true);
            players[2].finish();
            sequence.pause();
            assertPlaying(players[0], false);
            assertPlaying(players[1], false);
            assertPlaying(players[2], false);
        });
        testing_internal_1.it('should finish when all players have finished', function () {
            var sequence = new animation_sequence_player_1.AnimationSequencePlayer(players);
            var completed = false;
            sequence.onDone(function () { return completed = true; });
            sequence.play();
            testing_internal_1.expect(completed).toBeFalsy();
            players[0].finish();
            testing_internal_1.expect(completed).toBeFalsy();
            players[1].finish();
            testing_internal_1.expect(completed).toBeFalsy();
            players[2].finish();
            testing_internal_1.expect(completed).toBeTruthy();
        });
        testing_internal_1.it('should restart all the players', function () {
            var sequence = new animation_sequence_player_1.AnimationSequencePlayer(players);
            sequence.play();
            assertPlaying(players[0], true);
            assertPlaying(players[1], false);
            assertPlaying(players[2], false);
            players[0].finish();
            assertPlaying(players[0], false);
            assertPlaying(players[1], true);
            assertPlaying(players[2], false);
            sequence.restart();
            assertLastStatus(players[0], 'restart', true);
            assertLastStatus(players[1], 'reset', true);
            assertLastStatus(players[2], 'reset', true);
        });
        testing_internal_1.it('should finish all the players', function () {
            var sequence = new animation_sequence_player_1.AnimationSequencePlayer(players);
            var completed = false;
            sequence.onDone(function () { return completed = true; });
            sequence.play();
            assertLastStatus(players[0], 'finish', false);
            assertLastStatus(players[1], 'finish', false);
            assertLastStatus(players[2], 'finish', false);
            sequence.finish();
            assertLastStatus(players[0], 'finish', true, -1);
            assertLastStatus(players[1], 'finish', true, -1);
            assertLastStatus(players[2], 'finish', true, -1);
            assertLastStatus(players[0], 'destroy', true);
            assertLastStatus(players[1], 'destroy', true);
            assertLastStatus(players[2], 'destroy', true);
            testing_internal_1.expect(completed).toBeTruthy();
        });
        testing_internal_1.it('should call destroy automatically when finished if no parent player is present', function () {
            var sequence = new animation_sequence_player_1.AnimationSequencePlayer(players);
            sequence.play();
            assertLastStatus(players[0], 'destroy', false);
            assertLastStatus(players[1], 'destroy', false);
            assertLastStatus(players[2], 'destroy', false);
            sequence.finish();
            assertLastStatus(players[0], 'destroy', true);
            assertLastStatus(players[1], 'destroy', true);
            assertLastStatus(players[2], 'destroy', true);
        });
        testing_internal_1.it('should not call destroy automatically when finished if a parent player is present', function () {
            var sequence = new animation_sequence_player_1.AnimationSequencePlayer(players);
            var parent = new animation_sequence_player_1.AnimationSequencePlayer([sequence, new mock_animation_player_1.MockAnimationPlayer()]);
            sequence.play();
            assertLastStatus(players[0], 'destroy', false);
            assertLastStatus(players[1], 'destroy', false);
            assertLastStatus(players[2], 'destroy', false);
            sequence.finish();
            assertLastStatus(players[0], 'destroy', false);
            assertLastStatus(players[1], 'destroy', false);
            assertLastStatus(players[2], 'destroy', false);
            parent.finish();
            assertLastStatus(players[0], 'destroy', true);
            assertLastStatus(players[1], 'destroy', true);
            assertLastStatus(players[2], 'destroy', true);
        });
        testing_internal_1.it('should function without any players', function () {
            var sequence = new animation_sequence_player_1.AnimationSequencePlayer([]);
            sequence.onDone(function () { });
            sequence.pause();
            sequence.play();
            sequence.finish();
            sequence.restart();
            sequence.destroy();
        });
        testing_internal_1.it('should call onDone after the next microtask if no players are provided', testing_1.fakeAsync(function () {
            var sequence = new animation_sequence_player_1.AnimationSequencePlayer([]);
            var completed = false;
            sequence.onDone(function () { return completed = true; });
            testing_internal_1.expect(completed).toEqual(false);
            testing_1.flushMicrotasks();
            testing_internal_1.expect(completed).toEqual(true);
        }));
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX3NlcXVlbmNlX3BsYXllcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvYW5pbWF0aW9uL2FuaW1hdGlvbl9zZXF1ZW5jZV9wbGF5ZXJfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsMENBQXNDLCtDQUErQyxDQUFDLENBQUE7QUFFdEYsd0JBQXlDLGVBQWUsQ0FBQyxDQUFBO0FBQ3pELHNDQUFrQyxxQ0FBcUMsQ0FBQyxDQUFBO0FBQ3hFLGlDQUEyRyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRTVJO0lBQ0UsMkJBQVEsQ0FBQyx5QkFBeUIsRUFBRTtRQUNsQyxJQUFJLE9BQVksQ0FBbUI7UUFDbkMsNkJBQVUsQ0FBQztZQUNULE9BQU8sR0FBRztnQkFDUixJQUFJLDJDQUFtQixFQUFFO2dCQUN6QixJQUFJLDJDQUFtQixFQUFFO2dCQUN6QixJQUFJLDJDQUFtQixFQUFFO2FBQzFCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksZ0JBQWdCLEdBQ2hCLFVBQUMsTUFBMkIsRUFBRSxNQUFjLEVBQUUsS0FBYyxFQUFFLE9BQW1CO1lBQW5CLHVCQUFtQixHQUFuQixXQUFtQjtZQUMvRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDO1lBQzVDLElBQUksTUFBTSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQztZQUM5RCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNWLHlCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pDLENBQUM7WUFB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