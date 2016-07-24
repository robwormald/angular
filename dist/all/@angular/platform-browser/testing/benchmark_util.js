/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var browser_adapter_1 = require('../src/browser/browser_adapter');
var browser_1 = require('../src/facade/browser');
var exceptions_1 = require('../src/facade/exceptions');
var lang_1 = require('../src/facade/lang');
var DOM = new browser_adapter_1.BrowserDomAdapter();
function getIntParameter(name) {
    return lang_1.NumberWrapper.parseInt(getStringParameter(name), 10);
}
exports.getIntParameter = getIntParameter;
function getStringParameter(name) {
    var els = DOM.querySelectorAll(browser_1.document, "input[name=\"" + name + "\"]");
    var value;
    var el;
    for (var i = 0; i < els.length; i++) {
        el = els[i];
        var type = DOM.type(el);
        if ((type != 'radio' && type != 'checkbox') || DOM.getChecked(el)) {
            value = DOM.getValue(el);
            break;
        }
    }
    if (lang_1.isBlank(value)) {
        throw new exceptions_1.BaseException("Could not find and input field with name " + name);
    }
    return value;
}
exports.getStringParameter = getStringParameter;
function bindAction(selector, callback) {
    var el = DOM.querySelector(browser_1.document, selector);
    DOM.on(el, 'click', function (_ /** TODO #9100 */) { callback(); });
}
exports.bindAction = bindAction;
function microBenchmark(name /** TODO #9100 */, iterationCount /** TODO #9100 */, callback /** TODO #9100 */) {
    var durationName = name + "/" + iterationCount;
    browser_1.window.console.time(durationName);
    callback();
    browser_1.window.console.timeEnd(durationName);
}
exports.microBenchmark = microBenchmark;
function windowProfile(name) {
    browser_1.window.console.profile(name);
}
exports.windowProfile = windowProfile;
function windowProfileEnd(name) {
    browser_1.window.console.profileEnd(name);
}
exports.windowProfileEnd = windowProfileEnd;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmVuY2htYXJrX3V0aWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdGluZy9iZW5jaG1hcmtfdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsZ0NBQWdDLGdDQUFnQyxDQUFDLENBQUE7QUFDakUsd0JBQStCLHVCQUF1QixDQUFDLENBQUE7QUFDdkQsMkJBQTRCLDBCQUEwQixDQUFDLENBQUE7QUFDdkQscUJBQXFDLG9CQUFvQixDQUFDLENBQUE7QUFFMUQsSUFBSSxHQUFHLEdBQUcsSUFBSSxtQ0FBaUIsRUFBRSxDQUFDO0FBRWxDLHlCQUFnQyxJQUFZO0lBQzFDLE1BQU0sQ0FBQyxvQkFBYSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM5RCxDQUFDO0FBRmUsdUJBQWUsa0JBRTlCLENBQUE7QUFFRCw0QkFBbUMsSUFBWTtJQUM3QyxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsa0JBQVEsRUFBRSxrQkFBZSxJQUFJLFFBQUksQ0FBQyxDQUFDO0lBQ2xFLElBQUksS0FBVSxDQUFtQjtJQUNqQyxJQUFJLEVBQU8sQ0FBbUI7SUFFOUIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDcEMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNaLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEIsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksSUFBSSxVQUFVLENBQUMsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRSxLQUFLLEdBQUcsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN6QixLQUFLLENBQUM7UUFDUixDQUFDO0lBQ0gsQ0FBQztJQUVELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkIsTUFBTSxJQUFJLDBCQUFhLENBQUMsOENBQTRDLElBQU0sQ0FBQyxDQUFDO0lBQzlFLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQW5CZSwwQkFBa0IscUJBbUJqQyxDQUFBO0FBRUQsb0JBQTJCLFFBQWdCLEVBQUUsUUFBa0I7SUFDN0QsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxrQkFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQy9DLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFTLENBQU0sQ0FBQyxpQkFBaUIsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzFFLENBQUM7QUFIZSxrQkFBVSxhQUd6QixDQUFBO0FBRUQsd0JBQ0ksSUFBUyxDQUFDLGlCQUFpQixFQUFFLGNBQW1CLENBQUMsaUJBQWlCLEVBQ2xFLFFBQWEsQ0FBQyxpQkFBaUI7SUFDakMsSUFBSSxZQUFZLEdBQU0sSUFBSSxTQUFJLGNBQWdCLENBQUM7SUFDL0MsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2xDLFFBQVEsRUFBRSxDQUFDO0lBQ1gsZ0JBQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFQZSxzQkFBYyxpQkFPN0IsQ0FBQTtBQUVELHVCQUE4QixJQUFZO0lBQ2xDLGdCQUFNLENBQUMsT0FBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBRmUscUJBQWEsZ0JBRTVCLENBQUE7QUFFRCwwQkFBaUMsSUFBWTtJQUNyQyxnQkFBTSxDQUFDLE9BQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDekMsQ0FBQztBQUZlLHdCQUFnQixtQkFFL0IsQ0FBQSJ9