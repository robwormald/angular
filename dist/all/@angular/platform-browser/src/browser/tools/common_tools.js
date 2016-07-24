/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var dom_adapter_1 = require('../../dom/dom_adapter');
var browser_1 = require('../../facade/browser');
var lang_1 = require('../../facade/lang');
var ChangeDetectionPerfRecord = (function () {
    function ChangeDetectionPerfRecord(msPerTick, numTicks) {
        this.msPerTick = msPerTick;
        this.numTicks = numTicks;
    }
    return ChangeDetectionPerfRecord;
}());
exports.ChangeDetectionPerfRecord = ChangeDetectionPerfRecord;
/**
 * Entry point for all Angular debug tools. This object corresponds to the `ng`
 * global variable accessible in the dev console.
 */
var AngularTools = (function () {
    function AngularTools(ref) {
        this.profiler = new AngularProfiler(ref);
    }
    return AngularTools;
}());
exports.AngularTools = AngularTools;
/**
 * Entry point for all Angular profiling-related debug tools. This object
 * corresponds to the `ng.profiler` in the dev console.
 */
var AngularProfiler = (function () {
    function AngularProfiler(ref) {
        this.appRef = ref.injector.get(core_1.ApplicationRef);
    }
    /**
     * Exercises change detection in a loop and then prints the average amount of
     * time in milliseconds how long a single round of change detection takes for
     * the current state of the UI. It runs a minimum of 5 rounds for a minimum
     * of 500 milliseconds.
     *
     * Optionally, a user may pass a `config` parameter containing a map of
     * options. Supported options are:
     *
     * `record` (boolean) - causes the profiler to record a CPU profile while
     * it exercises the change detector. Example:
     *
     * ```
     * ng.profiler.timeChangeDetection({record: true})
     * ```
     */
    AngularProfiler.prototype.timeChangeDetection = function (config) {
        var record = lang_1.isPresent(config) && config['record'];
        var profileName = 'Change Detection';
        // Profiler is not available in Android browsers, nor in IE 9 without dev tools opened
        var isProfilerAvailable = lang_1.isPresent(browser_1.window.console.profile);
        if (record && isProfilerAvailable) {
            browser_1.window.console.profile(profileName);
        }
        var start = dom_adapter_1.getDOM().performanceNow();
        var numTicks = 0;
        while (numTicks < 5 || (dom_adapter_1.getDOM().performanceNow() - start) < 500) {
            this.appRef.tick();
            numTicks++;
        }
        var end = dom_adapter_1.getDOM().performanceNow();
        if (record && isProfilerAvailable) {
            // need to cast to <any> because type checker thinks there's no argument
            // while in fact there is:
            //
            // https://developer.mozilla.org/en-US/docs/Web/API/Console/profileEnd
            browser_1.window.console.profileEnd(profileName);
        }
        var msPerTick = (end - start) / numTicks;
        browser_1.window.console.log("ran " + numTicks + " change detection cycles");
        browser_1.window.console.log(lang_1.NumberWrapper.toFixed(msPerTick, 2) + " ms per check");
        return new ChangeDetectionPerfRecord(msPerTick, numTicks);
    };
    return AngularProfiler;
}());
exports.AngularProfiler = AngularProfiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uX3Rvb2xzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL3Rvb2xzL2NvbW1vbl90b29scy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQTJDLGVBQWUsQ0FBQyxDQUFBO0FBRTNELDRCQUFxQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzdDLHdCQUFxQixzQkFBc0IsQ0FBQyxDQUFBO0FBQzVDLHFCQUF1QyxtQkFBbUIsQ0FBQyxDQUFBO0FBRzNEO0lBQ0UsbUNBQW1CLFNBQWlCLEVBQVMsUUFBZ0I7UUFBMUMsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7SUFBRyxDQUFDO0lBQ25FLGdDQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFGWSxpQ0FBeUIsNEJBRXJDLENBQUE7QUFFRDs7O0dBR0c7QUFDSDtJQUdFLHNCQUFZLEdBQXNCO1FBQUksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUFDLENBQUM7SUFDbkYsbUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUpZLG9CQUFZLGVBSXhCLENBQUE7QUFFRDs7O0dBR0c7QUFDSDtJQUdFLHlCQUFZLEdBQXNCO1FBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxxQkFBYyxDQUFDLENBQUM7SUFBQyxDQUFDO0lBRXZGOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILDZDQUFtQixHQUFuQixVQUFvQixNQUFXO1FBQzdCLElBQUksTUFBTSxHQUFHLGdCQUFTLENBQUMsTUFBTSxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELElBQUksV0FBVyxHQUFHLGtCQUFrQixDQUFDO1FBQ3JDLHNGQUFzRjtRQUN0RixJQUFJLG1CQUFtQixHQUFHLGdCQUFTLENBQUMsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUQsRUFBRSxDQUFDLENBQUMsTUFBTSxJQUFJLG1CQUFtQixDQUFDLENBQUMsQ0FBQztZQUNsQyxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUNELElBQUksS0FBSyxHQUFHLG9CQUFNLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN0QyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7UUFDakIsT0FBTyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0JBQU0sRUFBRSxDQUFDLGNBQWMsRUFBRSxHQUFHLEtBQUssQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2pFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDbkIsUUFBUSxFQUFFLENBQUM7UUFDYixDQUFDO1FBQ0QsSUFBSSxHQUFHLEdBQUcsb0JBQU0sRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7WUFDbEMsd0VBQXdFO1lBQ3hFLDBCQUEwQjtZQUMxQixFQUFFO1lBQ0Ysc0VBQXNFO1lBQ2hFLGdCQUFNLENBQUMsT0FBTyxDQUFDLFVBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBQ0QsSUFBSSxTQUFTLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQ3pDLGdCQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFPLFFBQVEsNkJBQTBCLENBQUMsQ0FBQztRQUM5RCxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUksb0JBQWEsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxrQkFBZSxDQUFDLENBQUM7UUFFMUUsTUFBTSxDQUFDLElBQUkseUJBQXlCLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFqREQsSUFpREM7QUFqRFksdUJBQWUsa0JBaUQzQixDQUFBIn0=