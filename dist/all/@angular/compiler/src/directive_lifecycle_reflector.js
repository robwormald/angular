/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var collection_1 = require('../src/facade/collection');
var LIFECYCLE_INTERFACES = collection_1.MapWrapper.createFromPairs([
    [core_private_1.LifecycleHooks.OnInit, core_1.OnInit],
    [core_private_1.LifecycleHooks.OnDestroy, core_1.OnDestroy],
    [core_private_1.LifecycleHooks.DoCheck, core_1.DoCheck],
    [core_private_1.LifecycleHooks.OnChanges, core_1.OnChanges],
    [core_private_1.LifecycleHooks.AfterContentInit, core_1.AfterContentInit],
    [core_private_1.LifecycleHooks.AfterContentChecked, core_1.AfterContentChecked],
    [core_private_1.LifecycleHooks.AfterViewInit, core_1.AfterViewInit],
    [core_private_1.LifecycleHooks.AfterViewChecked, core_1.AfterViewChecked],
]);
var LIFECYCLE_PROPS = collection_1.MapWrapper.createFromPairs([
    [core_private_1.LifecycleHooks.OnInit, 'ngOnInit'],
    [core_private_1.LifecycleHooks.OnDestroy, 'ngOnDestroy'],
    [core_private_1.LifecycleHooks.DoCheck, 'ngDoCheck'],
    [core_private_1.LifecycleHooks.OnChanges, 'ngOnChanges'],
    [core_private_1.LifecycleHooks.AfterContentInit, 'ngAfterContentInit'],
    [core_private_1.LifecycleHooks.AfterContentChecked, 'ngAfterContentChecked'],
    [core_private_1.LifecycleHooks.AfterViewInit, 'ngAfterViewInit'],
    [core_private_1.LifecycleHooks.AfterViewChecked, 'ngAfterViewChecked'],
]);
function hasLifecycleHook(hook, token) {
    var lcInterface = LIFECYCLE_INTERFACES.get(hook);
    var lcProp = LIFECYCLE_PROPS.get(hook);
    return core_private_1.reflector.hasLifecycleHook(token, lcInterface, lcProp);
}
exports.hasLifecycleHook = hasLifecycleHook;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX2xpZmVjeWNsZV9yZWZsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9kaXJlY3RpdmVfbGlmZWN5Y2xlX3JlZmxlY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQTZILGVBQWUsQ0FBQyxDQUFBO0FBQzdJLDZCQUF3QyxpQkFBaUIsQ0FBQyxDQUFBO0FBRzFELDJCQUF5QiwwQkFBMEIsQ0FBQyxDQUFBO0FBRXBELElBQU0sb0JBQW9CLEdBQW1CLHVCQUFVLENBQUMsZUFBZSxDQUFDO0lBQ3RFLENBQUMsNkJBQWMsQ0FBQyxNQUFNLEVBQUUsYUFBTSxDQUFDO0lBQy9CLENBQUMsNkJBQWMsQ0FBQyxTQUFTLEVBQUUsZ0JBQVMsQ0FBQztJQUNyQyxDQUFDLDZCQUFjLENBQUMsT0FBTyxFQUFFLGNBQU8sQ0FBQztJQUNqQyxDQUFDLDZCQUFjLENBQUMsU0FBUyxFQUFFLGdCQUFTLENBQUM7SUFDckMsQ0FBQyw2QkFBYyxDQUFDLGdCQUFnQixFQUFFLHVCQUFnQixDQUFDO0lBQ25ELENBQUMsNkJBQWMsQ0FBQyxtQkFBbUIsRUFBRSwwQkFBbUIsQ0FBQztJQUN6RCxDQUFDLDZCQUFjLENBQUMsYUFBYSxFQUFFLG9CQUFhLENBQUM7SUFDN0MsQ0FBQyw2QkFBYyxDQUFDLGdCQUFnQixFQUFFLHVCQUFnQixDQUFDO0NBQ3BELENBQUMsQ0FBQztBQUVILElBQU0sZUFBZSxHQUFxQix1QkFBVSxDQUFDLGVBQWUsQ0FBQztJQUNuRSxDQUFDLDZCQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQztJQUNuQyxDQUFDLDZCQUFjLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQztJQUN6QyxDQUFDLDZCQUFjLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQztJQUNyQyxDQUFDLDZCQUFjLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQztJQUN6QyxDQUFDLDZCQUFjLENBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUM7SUFDdkQsQ0FBQyw2QkFBYyxDQUFDLG1CQUFtQixFQUFFLHVCQUF1QixDQUFDO0lBQzdELENBQUMsNkJBQWMsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLENBQUM7SUFDakQsQ0FBQyw2QkFBYyxDQUFDLGdCQUFnQixFQUFFLG9CQUFvQixDQUFDO0NBQ3hELENBQUMsQ0FBQztBQUVILDBCQUFpQyxJQUFvQixFQUFFLEtBQVU7SUFDL0QsSUFBSSxXQUFXLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pELElBQUksTUFBTSxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkMsTUFBTSxDQUFDLHdCQUFTLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNoRSxDQUFDO0FBSmUsd0JBQWdCLG1CQUkvQixDQUFBIn0=