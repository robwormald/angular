/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var view_animation_map_1 = require('../../src/animation/view_animation_map');
var mock_animation_player_1 = require('../../testing/mock_animation_player');
var testing_internal_1 = require('../../testing/testing_internal');
function main() {
    testing_internal_1.describe('ActiveAnimationsPlayersMap', function () {
        var playersMap;
        var elementNode;
        var animationName = 'animationName';
        testing_internal_1.beforeEach(function () {
            playersMap = new view_animation_map_1.ViewAnimationMap();
            elementNode = browser_util_1.el('<div></div>');
        });
        afterEach(function () {
            dom_adapter_1.getDOM().remove(elementNode);
            elementNode = null;
        });
        testing_internal_1.it('should register a player an allow it to be accessed', function () {
            var player = new mock_animation_player_1.MockAnimationPlayer();
            playersMap.set(elementNode, animationName, player);
            testing_internal_1.expect(playersMap.find(elementNode, animationName)).toBe(player);
            testing_internal_1.expect(playersMap.findAllPlayersByElement(elementNode)).toEqual([player]);
            testing_internal_1.expect(playersMap.getAllPlayers()).toEqual([player]);
            testing_internal_1.expect(playersMap.length).toEqual(1);
        });
        testing_internal_1.it('should remove a registered player when remove() is called', function () {
            var player = new mock_animation_player_1.MockAnimationPlayer();
            playersMap.set(elementNode, animationName, player);
            testing_internal_1.expect(playersMap.find(elementNode, animationName)).toBe(player);
            testing_internal_1.expect(playersMap.length).toEqual(1);
            playersMap.remove(elementNode, animationName);
            testing_internal_1.expect(playersMap.find(elementNode, animationName)).not.toBe(player);
            testing_internal_1.expect(playersMap.length).toEqual(0);
        });
        testing_internal_1.it('should allow multiple players to be registered on the same element', function () {
            var player1 = new mock_animation_player_1.MockAnimationPlayer();
            var player2 = new mock_animation_player_1.MockAnimationPlayer();
            playersMap.set(elementNode, 'myAnimation1', player1);
            playersMap.set(elementNode, 'myAnimation2', player2);
            testing_internal_1.expect(playersMap.length).toEqual(2);
            testing_internal_1.expect(playersMap.findAllPlayersByElement(elementNode)).toEqual([player1, player2]);
        });
        testing_internal_1.it('should only allow one player to be set for a given element/animationName pair', function () {
            var player1 = new mock_animation_player_1.MockAnimationPlayer();
            var player2 = new mock_animation_player_1.MockAnimationPlayer();
            playersMap.set(elementNode, animationName, player1);
            testing_internal_1.expect(playersMap.find(elementNode, animationName)).toBe(player1);
            testing_internal_1.expect(playersMap.length).toEqual(1);
            playersMap.set(elementNode, animationName, player2);
            testing_internal_1.expect(playersMap.find(elementNode, animationName)).toBe(player2);
            testing_internal_1.expect(playersMap.length).toEqual(1);
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZlX2FuaW1hdGlvbnNfcGxheWVyc19tYXBfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L2FuaW1hdGlvbi9hY3RpdmVfYW5pbWF0aW9uc19wbGF5ZXJzX21hcF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCw0QkFBcUIsK0NBQStDLENBQUMsQ0FBQTtBQUNyRSw2QkFBaUIsZ0RBQWdELENBQUMsQ0FBQTtBQUVsRSxtQ0FBK0Isd0NBQXdDLENBQUMsQ0FBQTtBQUd4RSxzQ0FBa0MscUNBQXFDLENBQUMsQ0FBQTtBQUN4RSxpQ0FBMkcsZ0NBQWdDLENBQUMsQ0FBQTtBQUU1STtJQUNFLDJCQUFRLENBQUMsNEJBQTRCLEVBQUU7UUFDckMsSUFBSSxVQUFlLENBQW1CO1FBQ3RDLElBQUksV0FBZ0IsQ0FBbUI7UUFDdkMsSUFBSSxhQUFhLEdBQUcsZUFBZSxDQUFDO1FBRXBDLDZCQUFVLENBQUM7WUFDVCxVQUFVLEdBQUcsSUFBSSxxQ0FBZ0IsRUFBRSxDQUFDO1lBQ3BDLFdBQVcsR0FBRyxpQkFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBRUgsU0FBUyxDQUFDO1lBQ1Isb0JBQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QixXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyxxREFBcUQsRUFBRTtZQUN4RCxJQUFJLE1BQU0sR0FBRyxJQUFJLDJDQUFtQixFQUFFLENBQUM7WUFDdkMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRW5ELHlCQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUMs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