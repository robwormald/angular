/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var async_1 = require('@angular/core/src/facade/async');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var ECHO_CHANNEL = "ECHO";
var App = (function () {
    function App(_serviceBrokerFactory) {
        this._serviceBrokerFactory = _serviceBrokerFactory;
        var broker = _serviceBrokerFactory.createMessageBroker(ECHO_CHANNEL, false);
        broker.registerMethod("echo", [platform_browser_1.PRIMITIVE], this._echo, platform_browser_1.PRIMITIVE);
    }
    App.prototype._echo = function (val) {
        return async_1.PromiseWrapper.wrap(function () { return val; });
    };
    /** @nocollapse */
    App.decorators = [
        { type: core_1.Component, args: [{ selector: 'app', template: "<h1>WebWorker MessageBroker Test</h1>" },] },
    ];
    /** @nocollapse */
    App.ctorParameters = [
        { type: platform_browser_1.ServiceMessageBrokerFactory, },
    ];
    return App;
}());
exports.App = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhfY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL3NyYy93ZWJfd29ya2Vycy9tZXNzYWdlX2Jyb2tlci9pbmRleF9jb21tb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHNCQUE2QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzlELHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4QyxpQ0FBcUQsMkJBQTJCLENBQUMsQ0FBQTtBQUVqRixJQUFNLFlBQVksR0FBRyxNQUFNLENBQUM7QUFDNUI7SUFDRSxhQUFvQixxQkFBa0Q7UUFBbEQsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUE2QjtRQUNwRSxJQUFJLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxtQkFBbUIsQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDNUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyw0QkFBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSw0QkFBUyxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUVPLG1CQUFLLEdBQWIsVUFBYyxHQUFXO1FBQ3ZCLE1BQU0sQ0FBQyxzQkFBYyxDQUFDLElBQUksQ0FBQyxjQUFRLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsY0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsdUNBQXVDLEVBQUMsRUFBRyxFQUFFO0tBQ2xHLENBQUM7SUFDRixrQkFBa0I7SUFDWCxrQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSw4Q0FBMkIsR0FBRztLQUNwQyxDQUFDO0lBQ0YsVUFBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFqQlksV0FBRyxNQWlCZixDQUFBIn0=