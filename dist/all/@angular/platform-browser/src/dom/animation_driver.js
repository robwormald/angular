/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_private_1 = require('../../core_private');
var _NoOpAnimationDriver = (function () {
    function _NoOpAnimationDriver() {
    }
    _NoOpAnimationDriver.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing) {
        return new core_private_1.NoOpAnimationPlayer();
    };
    return _NoOpAnimationDriver;
}());
/**
 * @experimental
 */
var AnimationDriver = (function () {
    function AnimationDriver() {
    }
    AnimationDriver.NOOP = new _NoOpAnimationDriver();
    return AnimationDriver;
}());
exports.AnimationDriver = AnimationDriver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX2RyaXZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci9zcmMvZG9tL2FuaW1hdGlvbl9kcml2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUlILDZCQUFzRSxvQkFBb0IsQ0FBQyxDQUFBO0FBRTNGO0lBQUE7SUFNQSxDQUFDO0lBTEMsc0NBQU8sR0FBUCxVQUNJLE9BQVksRUFBRSxjQUErQixFQUFFLFNBQThCLEVBQzdFLFFBQWdCLEVBQUUsS0FBYSxFQUFFLE1BQWM7UUFDakQsTUFBTSxDQUFDLElBQUksa0NBQW1CLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQUVEOztHQUVHO0FBQ0g7SUFBQTtJQUtBLENBQUM7SUFKUSxvQkFBSSxHQUFvQixJQUFJLG9CQUFvQixFQUFFLENBQUM7SUFJNUQsc0JBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQztBQUxxQix1QkFBZSxrQkFLcEMsQ0FBQSJ9