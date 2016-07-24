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
var core_private_1 = require('../../core_private');
var web_animations_driver_1 = require('../../src/dom/web_animations_driver');
var collection_1 = require('../../src/facade/collection');
var mock_dom_animate_player_1 = require('../../testing/mock_dom_animate_player');
var ExtendedWebAnimationsDriver = (function (_super) {
    __extends(ExtendedWebAnimationsDriver, _super);
    function ExtendedWebAnimationsDriver() {
        _super.call(this);
        this.log = [];
    }
    /** @internal */
    ExtendedWebAnimationsDriver.prototype._triggerWebAnimation = function (elm, keyframes, options) {
        this.log.push({ 'elm': elm, 'keyframes': keyframes, 'options': options });
        return new mock_dom_animate_player_1.MockDomAnimatePlayer();
    };
    return ExtendedWebAnimationsDriver;
}(web_animations_driver_1.WebAnimationsDriver));
function _makeStyles(styles) {
    return new core_private_1.AnimationStyles([styles]);
}
function _makeKeyframe(offset, styles) {
    return new core_private_1.AnimationKeyframe(offset, _makeStyles(styles));
}
function main() {
    testing_internal_1.describe('WebAnimationsDriver', function () {
        var driver;
        var elm;
        testing_internal_1.beforeEach(function () {
            driver = new ExtendedWebAnimationsDriver();
            elm = browser_util_1.el('<div></div>');
        });
        testing_internal_1.it('should convert all styles to camelcase', function () {
            var startingStyles = _makeStyles({ 'border-top-right': '40px' });
            var styles = [
                _makeKeyframe(0, { 'max-width': '100px', 'height': '200px' }),
                _makeKeyframe(1, { 'font-size': '555px' })
            ];
            var player = driver.animate(elm, startingStyles, styles, 0, 0, 'linear');
            var details = _formatOptions(player);
            var startKeyframe = details['keyframes'][0];
            var firstKeyframe = details['keyframes'][1];
            var lastKeyframe = details['keyframes'][2];
            testing_internal_1.expect(startKeyframe['borderTopRight']).toEqual('40px');
            testing_internal_1.expect(firstKeyframe['maxWidth']).toEqual('100px');
            testing_internal_1.expect(firstKeyframe['max-width']).toBeFalsy();
            testing_internal_1.expect(firstKeyframe['height']).toEqual('200px');
            testing_internal_1.expect(lastKeyframe['fontSize']).toEqual('555px');
            testing_internal_1.expect(lastKeyframe['font-size']).toBeFalsy();
        });
        testing_internal_1.it('should auto prefix numeric properties with a `px` value', function () {
            var startingStyles = _makeStyles({ 'borderTopWidth': 40 });
            var styles = [_makeKeyframe(0, { 'font-size': 100 }), _makeKeyframe(1, { 'height': '555em' })];
            var player = driver.animate(elm, startingStyles, styles, 0, 0, 'linear');
            var details = _formatOptions(player);
            var startKeyframe = details['keyframes'][0];
            var firstKeyframe = details['keyframes'][1];
            var lastKeyframe = details['keyframes'][2];
            testing_internal_1.expect(startKeyframe['borderTopWidth']).toEqual('40px');
            testing_internal_1.expect(firstKeyframe['fontSize']).toEqual('100px');
            testing_internal_1.expect(lastKeyframe['height']).toEqual('555em');
        });
        testing_internal_1.it('should use a fill mode of `both`', function () {
            var startingStyles = _makeStyles({});
            var styles = [_makeKeyframe(0, { 'color': 'green' }), _makeKeyframe(1, { 'color': 'red' })];
            var player = driver.animate(elm, startingStyles, styles, 1000, 1000, 'linear');
            var details = _formatOptions(player);
            var options = details['options'];
            testing_internal_1.expect(options['fill']).toEqual('both');
        });
        testing_internal_1.it('should apply the provided easing', function () {
            var startingStyles = _makeStyles({});
            var styles = [_makeKeyframe(0, { 'color': 'green' }), _makeKeyframe(1, { 'color': 'red' })];
            var player = driver.animate(elm, startingStyles, styles, 1000, 1000, 'ease-out');
            var details = _formatOptions(player);
            var options = details['options'];
            testing_internal_1.expect(options['easing']).toEqual('ease-out');
        });
        testing_internal_1.it('should only apply the provided easing if present', function () {
            var startingStyles = _makeStyles({});
            var styles = [_makeKeyframe(0, { 'color': 'green' }), _makeKeyframe(1, { 'color': 'red' })];
            var player = driver.animate(elm, startingStyles, styles, 1000, 1000, null);
            var details = _formatOptions(player);
            var options = details['options'];
            var keys = collection_1.StringMapWrapper.keys(options);
            testing_internal_1.expect(keys.indexOf('easing')).toEqual(-1);
        });
    });
}
exports.main = main;
function _formatOptions(player) {
    return { 'element': player.element, 'keyframes': player.keyframes, 'options': player.options };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViX2FuaW1hdGlvbnNfZHJpdmVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdC9kb20vd2ViX2FuaW1hdGlvbnNfZHJpdmVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsaUNBQTRHLHdDQUF3QyxDQUFDLENBQUE7QUFDckosNkJBQWlCLGdEQUFnRCxDQUFDLENBQUE7QUFFbEUsNkJBQWlELG9CQUFvQixDQUFDLENBQUE7QUFFdEUsc0NBQWtDLHFDQUFxQyxDQUFDLENBQUE7QUFFeEUsMkJBQStCLDZCQUE2QixDQUFDLENBQUE7QUFDN0Qsd0NBQW1DLHVDQUF1QyxDQUFDLENBQUE7QUFFM0U7SUFBMEMsK0NBQW1CO0lBRzNEO1FBQWdCLGlCQUFPLENBQUM7UUFGakIsUUFBRyxHQUEyQixFQUFFLENBQUM7SUFFZixDQUFDO0lBRTFCLGdCQUFnQjtJQUNoQiwwREFBb0IsR0FBcEIsVUFBcUIsR0FBUSxFQUFFLFNBQWdCLEVBQUUsT0FBWTtRQUMzRCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFDLENBQUMsQ0FBQztRQUN4RSxNQUFNLENBQUMsSUFBSSw4Q0FBb0IsRUFBRSxDQUFDO0lBQ3BDLENBQUM7SUFDSCxrQ0FBQztBQUFELENBQUMsQUFWRCxDQUEwQywyQ0FBbUIsR0FVNUQ7QUFFRCxxQkFBcUIsTUFBd0M7SUFDM0QsTUFBTSxDQUFDLElBQUksOEJBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDdkMsQ0FBQztBQUVELHVCQUNJLE1BQWMsRUFBRSxNQUF3QztJQUMxRCxNQUFNLENBQUMsSUFBSSxnQ0FBaUIsQ0FBQyxNQUFNLEVBQUUs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