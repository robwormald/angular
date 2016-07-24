/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
// TODO: remove deep import by reimplementing the event name serialization
var key_events_1 = require("@angular/platform-browser/src/dom/events/key_events");
var KeyEventsApp = (function () {
    function KeyEventsApp() {
        this.lastKey = '(none)';
        this.shiftEnter = false;
    }
    KeyEventsApp.prototype.onKeyDown = function (event /** TODO #9100 */) {
        this.lastKey = key_events_1.KeyEventsPlugin.getEventFullKey(event);
        event.preventDefault();
    };
    KeyEventsApp.prototype.onShiftEnter = function (event /** TODO #9100 */) {
        this.shiftEnter = true;
        event.preventDefault();
    };
    KeyEventsApp.prototype.resetShiftEnter = function () { this.shiftEnter = false; };
    /** @nocollapse */
    KeyEventsApp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'key-events-app',
                    template: "Click in the following area and press a key to display its name:<br>\n  <div (keydown)=\"onKeyDown($event)\" class=\"sample-area\" tabindex=\"0\">{{lastKey}}</div><br>\n  Click in the following area and press shift.enter:<br>\n  <div\n    (keydown.shift.enter)=\"onShiftEnter($event)\"\n    (click)=\"resetShiftEnter()\"\n    class=\"sample-area\"\n    tabindex=\"0\"\n  >{{shiftEnter ? 'You pressed shift.enter!' : ''}}</div>"
                },] },
    ];
    return KeyEventsApp;
}());
function main() {
    platform_browser_dynamic_1.bootstrap(KeyEventsApp);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL2tleV9ldmVudHMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHlDQUF3QixtQ0FBbUMsQ0FBQyxDQUFBO0FBQzVELHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4QywwRUFBMEU7QUFDMUUsMkJBQThCLHFEQUFxRCxDQUFDLENBQUE7QUFDcEY7SUFBQTtRQUNFLFlBQU8sR0FBVyxRQUFRLENBQUM7UUFDM0IsZUFBVSxHQUFZLEtBQUssQ0FBQztJQTRCOUIsQ0FBQztJQTFCQyxnQ0FBUyxHQUFULFVBQVUsS0FBVSxDQUFDLGlCQUFpQjtRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLDRCQUFlLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RELEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRUQsbUNBQVksR0FBWixVQUFhLEtBQVUsQ0FBQyxpQkFBaUI7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxzQ0FBZSxHQUFmLGNBQTBCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN0RCxrQkFBa0I7SUFDWCx1QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsNGFBUThDO2lCQUN6RCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0YsbUJBQUM7QUFBRCxDQUFDLEFBOUJELElBOEJDO0FBRUQ7SUFDRSxvQ0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFGZSxZQUFJLE9BRW5CLENBQUEifQ==