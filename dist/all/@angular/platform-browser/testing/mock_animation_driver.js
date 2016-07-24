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
var animation_driver_1 = require('../src/dom/animation_driver');
var collection_1 = require('../src/facade/collection');
var MockAnimationDriver = (function (_super) {
    __extends(MockAnimationDriver, _super);
    function MockAnimationDriver() {
        _super.apply(this, arguments);
        this.log = [];
    }
    MockAnimationDriver.prototype.animate = function (element, startingStyles, keyframes, duration, delay, easing) {
        var player = new testing_internal_1.MockAnimationPlayer();
        this.log.push({
            'element': element,
            'startingStyles': _serializeStyles(startingStyles),
            'keyframes': keyframes,
            'keyframeLookup': _serializeKeyframes(keyframes),
            'duration': duration,
            'delay': delay,
            'easing': easing,
            'player': player
        });
        return player;
    };
    return MockAnimationDriver;
}(animation_driver_1.AnimationDriver));
exports.MockAnimationDriver = MockAnimationDriver;
function _serializeKeyframes(keyframes) {
    return keyframes.map(function (keyframe) { return [keyframe.offset, _serializeStyles(keyframe.styles)]; });
}
function _serializeStyles(styles) {
    var flatStyles = {};
    styles.styles.forEach(function (entry) { return collection_1.StringMapWrapper.forEach(entry, function (val, prop) {
        flatStyles[prop] = val;
    }); });
    return flatStyles;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19hbmltYXRpb25fZHJpdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3Rlc3RpbmcvbW9ja19hbmltYXRpb25fZHJpdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUdILGlDQUFrQyx3Q0FBd0MsQ0FBQyxDQUFBO0FBRzNFLGlDQUE4Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBQzVELDJCQUErQiwwQkFBMEIsQ0FBQyxDQUFBO0FBRTFEO0lBQXlDLHVDQUFlO0lBQXhEO1FBQXlDLDhCQUFlO1FBQy9DLFFBQUcsR0FBMkIsRUFBRSxDQUFDO0lBaUIxQyxDQUFDO0lBaEJDLHFDQUFPLEdBQVAsVUFDSSxPQUFZLEVBQUUsY0FBK0IsRUFBRSxTQUE4QixFQUM3RSxRQUFnQixFQUFFLEtBQWEsRUFBRSxNQUFjO1FBQ2pELElBQUksTUFBTSxHQUFHLElBQUksc0NBQW1CLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQztZQUNaLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLGdCQUFnQixFQUFFLGdCQUFnQixDQUFDLGNBQWMsQ0FBQztZQUNsRCxXQUFXLEVBQUUsU0FBUztZQUN0QixnQkFBZ0IsRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLENBQUM7WUFDaEQsVUFBVSxFQUFFLFFBQVE7WUFDcEIsT0FBTyxFQUFFLEtBQUs7WUFDZCxRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsTUFBTTtTQUNqQixDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDSCwwQkFBQztBQUFELENBQUMsQUFsQkQsQ0FBeUMsa0NBQWUsR0FrQnZEO0FBbEJZLDJCQUFtQixzQkFrQi9CLENBQUE7QUFFRCw2QkFBNkIsU0FBOEI7SUFDekQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQSxRQUFRLElBQUksT0FBQSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQXBELENBQW9ELENBQUMsQ0FBQztBQUN6RixDQUFDO0FBRUQsMEJBQTBCLE1BQXVCO0lBQy9DLElBQUksVUFBVSxHQUF5QixFQUFFLENBQUM7SUFDMUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSw2QkFBZ0IsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFVBQUMsR0FBUSxFQUFFLElBQVk7UUFDcEYsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUN6QixDQUFDLENBQUMsRUFGNkIsQ0FFN0IsQ0FBQyxDQUFDO0lBQ0osTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUNwQixDQUFDIn0=