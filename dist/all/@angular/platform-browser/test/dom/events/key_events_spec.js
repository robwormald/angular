/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var key_events_1 = require('@angular/platform-browser/src/dom/events/key_events');
function main() {
    testing_internal_1.describe('KeyEvents', function () {
        testing_internal_1.it('should ignore unrecognized events', function () {
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keydown')).toEqual(null);
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup')).toEqual(null);
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.unknownmodifier.enter')).toEqual(null);
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.unknownmodifier.enter')).toEqual(null);
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('unknownevent.control.shift.enter')).toEqual(null);
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('unknownevent.enter')).toEqual(null);
        });
        testing_internal_1.it('should correctly parse event names', function () {
            // key with no modifier
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.enter'))
                .toEqual({ 'domEventName': 'keydown', 'fullKey': 'enter' });
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.enter'))
                .toEqual({ 'domEventName': 'keyup', 'fullKey': 'enter' });
            // key with modifiers:
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.control.shift.enter'))
                .toEqual({ 'domEventName': 'keydown', 'fullKey': 'control.shift.enter' });
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.shift.enter'))
                .toEqual({ 'domEventName': 'keyup', 'fullKey': 'control.shift.enter' });
            // key with modifiers in a different order:
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.shift.control.enter'))
                .toEqual({ 'domEventName': 'keydown', 'fullKey': 'control.shift.enter' });
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.shift.control.enter'))
                .toEqual({ 'domEventName': 'keyup', 'fullKey': 'control.shift.enter' });
            // key that is also a modifier:
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.shift.control'))
                .toEqual({ 'domEventName': 'keydown', 'fullKey': 'shift.control' });
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.shift.control'))
                .toEqual({ 'domEventName': 'keyup', 'fullKey': 'shift.control' });
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.control.shift'))
                .toEqual({ 'domEventName': 'keydown', 'fullKey': 'control.shift' });
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.shift'))
                .toEqual({ 'domEventName': 'keyup', 'fullKey': 'control.shift' });
        });
        testing_internal_1.it('should alias esc to escape', function () {
            testing_internal_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.esc'))
                .toEqual(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.escape'));
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5X2V2ZW50c19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3Rlc3QvZG9tL2V2ZW50cy9rZXlfZXZlbnRzX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUFnRix3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3pILDJCQUE4QixxREFBcUQsQ0FBQyxDQUFBO0FBRXBGO0lBQ0UsMkJBQVEsQ0FBQyxXQUFXLEVBQUU7UUFFcEIscUJBQUUsQ0FBQyxtQ0FBbUMsRUFBRTtZQUN0Qyx5QkFBTSxDQUFDLDRCQUFlLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hFLHlCQUFNLENBQUMsNEJBQWUsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDOUQseUJBQU0sQ0FBQyw0QkFBZSxDQUFDLGNBQWMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RGLHlCQUFNLENBQUMsNEJBQWUsQ0FBQyxjQUFjLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwRix5QkFBTSxDQUFDLDRCQUFlLENBQUMsY0FBYyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekYseUJBQU0sQ0FBQyw0QkFBZSxDQUFDLGNBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdFLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyxvQ0FBb0MsRUFBRTtZQUN2Qyx1QkFBdUI7WUFDdkIseUJBQU0s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