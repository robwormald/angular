/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var Rx_1 = require('rxjs/Rx');
var AsyncPipeExample = (function () {
    function AsyncPipeExample() {
        this.greeting = null;
        this.arrived = false;
        this.resolve = null;
        this.reset();
    }
    AsyncPipeExample.prototype.reset = function () {
        var _this = this;
        this.arrived = false;
        this.greeting = new Promise(function (resolve, reject) { _this.resolve = resolve; });
    };
    AsyncPipeExample.prototype.clicked = function () {
        if (this.arrived) {
            this.reset();
        }
        else {
            this.resolve('hi there!');
            this.arrived = true;
        }
    };
    /** @nocollapse */
    AsyncPipeExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'async-example',
                    template: "<div>\n    <p>Wait for it... {{ greeting | async }}</p>\n    <button (click)=\"clicked()\">{{ arrived ? 'Reset' : 'Resolve' }}</button>\n  </div>"
                },] },
    ];
    /** @nocollapse */
    AsyncPipeExample.ctorParameters = [];
    return AsyncPipeExample;
}());
exports.AsyncPipeExample = AsyncPipeExample;
var Task = (function () {
    function Task() {
        this.time = new Rx_1.Observable(function (observer) {
            setInterval(function () { return observer.next(new Date().getTime()); }, 500);
        });
    }
    /** @nocollapse */
    Task.decorators = [
        { type: core_1.Component, args: [{ selector: 'task-cmp', template: 'Time: {{ time | async }}' },] },
    ];
    return Task;
}());
var AppCmp = (function () {
    function AppCmp() {
    }
    /** @nocollapse */
    AppCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'example-app',
                    directives: [AsyncPipeExample],
                    template: "\n    <h1>AsyncPipe Example</h1>\n    <async-example></async-example>\n  "
                },] },
    ];
    return AppCmp;
}());
exports.AppCmp = AppCmp;
function main() {
    platform_browser_dynamic_1.bootstrap(AppCmp);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfcGlwZV9leGFtcGxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9leGFtcGxlcy9jb3JlL3BpcGVzL3RzL2FzeW5jX3BpcGUvYXN5bmNfcGlwZV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUNBQXdCLG1DQUFtQyxDQUFDLENBQUE7QUFDNUQsbUJBQXFDLFNBQVMsQ0FBQyxDQUFBO0FBQy9DO0lBTUU7UUFMQSxhQUFRLEdBQW9CLElBQUksQ0FBQztRQUNqQyxZQUFPLEdBQVksS0FBSyxDQUFDO1FBRWpCLFlBQU8sR0FBYSxJQUFJLENBQUM7UUFFakIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQUMsQ0FBQztJQUUvQixnQ0FBSyxHQUFMO1FBQUEsaUJBR0M7UUFGQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksT0FBTyxDQUFTLFVBQUMsT0FBTyxFQUFFLE1BQU0sSUFBTyxLQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hGLENBQUM7SUFFRCxrQ0FBTyxHQUFQO1FBQ0UsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDakIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDO0lBQ0gsQ0FBQztJQUNILGtCQUFrQjtJQUNYLDJCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxlQUFlO29CQUN6QixRQUFRLEVBQUUsbUpBR0g7aUJBQ1IsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLCtCQUFjLEdBQTJELEVBQy9FLENBQUM7SUFDRix1QkFBQztBQUFELENBQUMsQUFsQ0QsSUFrQ0M7QUFsQ1ksd0JBQWdCLG1CQWtDNUIsQ0FBQTtBQUNEO0lBQUE7UUFDRSxTQUFJLEdBQUcsSUFBSSxlQUFVLENBQVMsVUFBQyxRQUE0QjtZQUN6RCxXQUFXLENBQUMsY0FBTSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFuQyxDQUFtQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO0lBS0wsQ0FBQztJQUpELGtCQUFrQjtJQUNYLGVBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLDBCQUEwQixFQUFDLEVBQUcsRUFBRTtLQUMxRixDQUFDO0lBQ0YsV0FBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBQ0Q7SUFBQTtJQVlBLENBQUM7SUFYRCxrQkFBa0I7SUFDWCxpQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsYUFBYTtvQkFDdkIsVUFBVSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzlCLFFBQVEsRUFBRSwyRUFHVDtpQkFDRixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0YsYUFBQztBQUFELENBQUMsQUFaRCxJQVlDO0FBWlksY0FBTSxTQVlsQixDQUFBO0FBRUQ7SUFDRSxvQ0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3BCLENBQUM7QUFGZSxZQUFJLE9BRW5CLENBQUEifQ==