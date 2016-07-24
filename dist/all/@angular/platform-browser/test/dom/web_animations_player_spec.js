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
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var web_animations_player_1 = require('../../src/dom/web_animations_player');
var mock_dom_animate_player_1 = require('../../testing/mock_dom_animate_player');
var ExtendedWebAnimationsPlayer = (function (_super) {
    __extends(ExtendedWebAnimationsPlayer, _super);
    function ExtendedWebAnimationsPlayer(element, keyframes, options) {
        _super.call(this, element, keyframes, options);
        this.element = element;
        this.keyframes = keyframes;
        this.options = options;
        this.domPlayer = new mock_dom_animate_player_1.MockDomAnimatePlayer();
    }
    /** @internal */
    ExtendedWebAnimationsPlayer.prototype._triggerWebAnimation = function (elm, keyframes, options) {
        return this.domPlayer;
    };
    return ExtendedWebAnimationsPlayer;
}(web_animations_player_1.WebAnimationsPlayer));
function main() {
    function makePlayer() {
        var someElm = browser_util_1.el('<div></div>');
        var player = new ExtendedWebAnimationsPlayer(someElm, [], {});
        player.init();
        return { 'captures': player.domPlayer.captures, 'player': player };
    }
    testing_internal_1.describe('WebAnimationsPlayer', function () {
        var player /** TODO #9100 */, captures;
        testing_internal_1.beforeEach(function () {
            var newPlayer = makePlayer();
            captures = newPlayer['captures'];
            player = newPlayer['player'];
        });
        testing_internal_1.it('should pause the animation', function () {
            testing_internal_1.expect(captures['pause']).toBeFalsy();
            player.pause();
            testing_internal_1.expect(captures['pause'].length).toEqual(1);
        });
        testing_internal_1.it('should play the animation', function () {
            testing_internal_1.expect(captures['play']).toBeFalsy();
            player.play();
            testing_internal_1.expect(captures['play'].length).toEqual(1);
        });
        testing_internal_1.it('should finish the animation', function () {
            testing_internal_1.expect(captures['finish']).toBeFalsy();
            player.finish();
            testing_internal_1.expect(captures['finish'].length).toEqual(1);
        });
        testing_internal_1.it('should make use of the onfinish function', function () { testing_internal_1.expect(captures['onfinish'].length).toEqual(1); });
        testing_internal_1.it('should trigger the subscribe functions when complete', function () {
            var count = 0;
            var method = function () { count++; };
            player.onDone(method);
            player.onDone(method);
            player.onDone(method);
            testing_internal_1.expect(count).toEqual(0);
            captures['onfinish'][0]();
            testing_internal_1.expect(count).toEqual(3);
        });
        testing_internal_1.it('should finish right away when finish is called directly', function () {
            var completed = false;
            player.onDone(function () { return completed = true; });
            testing_internal_1.expect(completed).toEqual(false);
            player.finish();
            testing_internal_1.expect(completed).toEqual(true);
            completed = false;
            player.finish();
            testing_internal_1.expect(completed).toEqual(false);
        });
        testing_internal_1.it('should trigger finish when destroy is called if the animation has not finished already', function () {
            var count = 0;
            var method = function () { count++; };
            player.onDone(method);
            testing_internal_1.expect(count).toEqual(0);
            player.destroy();
            testing_internal_1.expect(count).toEqual(1);
            var player2 = makePlayer()['player'];
            player2.onDone(method);
            testing_internal_1.expect(count).toEqual(1);
            player2.finish();
            testing_internal_1.expect(count).toEqual(2);
            player2.destroy();
            testing_internal_1.expect(count).toEqual(2);
        });
        testing_internal_1.it('should destroy itself automatically if a parent player is not present', function () {
            captures['cancel'] = [];
            player.finish();
            testing_internal_1.expect(captures['finish'].length).toEqual(1);
            testing_internal_1.expect(captures['cancel'].length).toEqual(1);
            var next = makePlayer();
            var player2 = next['player'];
            player2.parentPlayer = new testing_internal_1.MockAnimationPlayer();
            var captures2 = next['captures'];
            captures2['cancel'] = [];
            player2.finish();
            testing_internal_1.expect(captures2['finish'].length).toEqual(1);
            testing_internal_1.expect(captures2['cancel'].length).toEqual(0);
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViX2FuaW1hdGlvbnNfcGxheWVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdC9kb20vd2ViX2FuaW1hdGlvbnNfcGxheWVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsaUNBQXFKLHdDQUF3QyxDQUFDLENBQUE7QUFDOUwsNkJBQWlCLGdEQUFnRCxDQUFDLENBQUE7QUFHbEUsc0NBQWtDLHFDQUFxQyxDQUFDLENBQUE7QUFDeEUsd0NBQW1DLHVDQUF1QyxDQUFDLENBQUE7QUFFM0U7SUFBMEMsK0NBQW1CO0lBRzNELHFDQUNXLE9BQW9CLEVBQVMsU0FBNkMsRUFDMUUsT0FBeUM7UUFDbEQsa0JBQU0sT0FBTyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUYxQixZQUFPLEdBQVAsT0FBTyxDQUFhO1FBQVMsY0FBUyxHQUFULFNBQVMsQ0FBb0M7UUFDMUUsWUFBTyxHQUFQLE9BQU8sQ0FBa0M7UUFKN0MsY0FBUyxHQUFHLElBQUksOENBQW9CLEVBQUUsQ0FBQztJQU05QyxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLDBEQUFvQixHQUFwQixVQUFxQixHQUFRLEVBQUUsU0FBZ0IsRUFBRSxPQUFZO1FBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFDSCxrQ0FBQztBQUFELENBQUMsQUFiRCxDQUEwQywyQ0FBbUIsR0FhNUQ7QUFFRDtJQUNFO1FBQ0UsSUFBSSxPQUFPLEdBQUcsaUJBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoQyxJQUFJLE1BQU0sR0FBRyxJQUFJLDJCQUEyQixDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsTUFBTSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUMsQ0FBQztJQUNuRSxDQUFDO0lBRUQsMkJBQVEsQ0FBQyxxQkFBcUIsRUFBRTtRQUM5QixJQUFJLE1BQVcsQ0FBQyxpQkFBaUIsRUFBRSxRQUFhLENBQW1CO1FBQ25FLDZCQUFVLENBQUM7WUFDVCxJQUFJLFNBQVMsR0FBRyxVQUFVLEVBQUUsQ0FBQztZQUM3QixRQUFRLEdBQXlCLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2RCxNQUFNLEdBQXdCLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsNEJBQTRCLEVBQUU7WUFDL0IseUJBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUN0QyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDZix5QkFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLDJCQUEyQixFQUFFO1lBQzlCLHlCQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDckMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QseUJBQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzdDLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyw2QkFBNkIsRUFBRTtZQUNoQyx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUNoQix5QkFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLDBDQUEwQyxFQUMxQyxjQUFRLHlCQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlELHFCQUFFLENBQUMsc0RBQXNELEVBQUU7WUFDekQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxNQUFNLEdBQUcsY0FBUSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVoQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV0Qix5QkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMxQix5QkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMseURBQXlELEVBQUU7WUFDNUQsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLE1BQU0sQ0FBQyxNQUFNLENBQUMsY0FBTSxPQUFBLFNBQVMsR0FBRyxJQUFJLEVBQWhCLENBQWdCLENBQUMsQ0FBQztZQUN0Qyx5QkFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVqQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEIseUJBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFaEMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUNsQixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDaEIseUJBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLHdGQUF3RixFQUN4RjtZQUNFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLElBQUksTUFBTSxHQUFHLGNBQVEsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN0Qix5QkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDakIseUJBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFekIsSUFBSSxPQUFPLEdBQUcsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDckMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2Qix5QkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDakIseUJBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2xCLHlCQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBRU4scUJBQUUsQ0FBQyx1RUFBdUUsRUFBRTtZQUMxRSxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3hCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUVoQix5QkFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0MseUJBQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdDLElBQUksSUFBSSxHQUFHLFVBQVUsRUFBRSxDQUFDO1lBQ3hCLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsWUFBWSxHQUFHLElBQUksc0NBQW1CLEVBQUUsQ0FBQztZQUVqRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDakMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUV6QixPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDakIseUJBQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLHlCQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXJHZSxZQUFJLE9BcUduQixDQUFBIn0=