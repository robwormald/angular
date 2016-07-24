/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var async_1 = require('@angular/core/src/facade/async');
var Zippy = (function () {
    function Zippy() {
        this.visible = true;
        this.title = '';
        this.open = new core_1.EventEmitter();
        this.close = new core_1.EventEmitter();
    }
    Zippy.prototype.toggle = function () {
        this.visible = !this.visible;
        if (this.visible) {
            async_1.ObservableWrapper.callEmit(this.open, null);
        }
        else {
            async_1.ObservableWrapper.callEmit(this.close, null);
        }
    };
    /** @nocollapse */
    Zippy.decorators = [
        { type: core_1.Component, args: [{ selector: 'zippy', templateUrl: 'app/zippy.html' },] },
    ];
    /** @nocollapse */
    Zippy.propDecorators = {
        'title': [{ type: core_1.Input },],
        'open': [{ type: core_1.Output },],
        'close': [{ type: core_1.Output },],
    };
    return Zippy;
}());
exports.Zippy = Zippy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemlwcHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL3ppcHB5X2NvbXBvbmVudC9hcHAvemlwcHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUFxRCxlQUFlLENBQUMsQ0FBQTtBQUNyRSxzQkFBZ0MsZ0NBQWdDLENBQUMsQ0FBQTtBQUNqRTtJQUFBO1FBQ0UsWUFBTyxHQUFZLElBQUksQ0FBQztRQUFDLFVBQUssR0FBVyxFQUFFLENBQUM7UUFBQyxTQUFJLEdBQXNCLElBQUksbUJBQVksRUFBRSxDQUFDO1FBQUMsVUFBSyxHQUFzQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztJQW9CM0ksQ0FBQztJQWxCQyxzQkFBTSxHQUFOO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIseUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04seUJBQWlCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0MsQ0FBQztJQUNILENBQUM7SUFDSCxrQkFBa0I7SUFDWCxnQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsZ0JBQWdCLEVBQUMsRUFBRyxFQUFFO0tBQ2hGLENBQUM7SUFDRixrQkFBa0I7SUFDWCxvQkFBYyxHQUEyQztRQUNoRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxZQUFLLEVBQUUsRUFBRTtRQUMzQixNQUFNLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtRQUMzQixPQUFPLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxhQUFNLEVBQUUsRUFBRTtLQUMzQixDQUFDO0lBQ0YsWUFBQztBQUFELENBQUMsQUFyQkQsSUFxQkM7QUFyQlksYUFBSyxRQXFCakIsQ0FBQSJ9