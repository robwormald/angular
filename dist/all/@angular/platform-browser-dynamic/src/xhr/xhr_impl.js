"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var compiler_1 = require('@angular/compiler');
var core_1 = require('@angular/core');
var lang_1 = require('../facade/lang');
var promise_1 = require('../facade/promise');
var XHRImpl = (function (_super) {
    __extends(XHRImpl, _super);
    function XHRImpl() {
        _super.apply(this, arguments);
    }
    XHRImpl.prototype.get = function (url) {
        var completer = promise_1.PromiseWrapper.completer();
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'text';
        xhr.onload = function () {
            // responseText is the old-school way of retrieving response (supported by IE8 & 9)
            // response/responseType properties were introduced in XHR Level2 spec (supported by IE10)
            var response = lang_1.isPresent(xhr.response) ? xhr.response : xhr.responseText;
            // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
            var status = xhr.status === 1223 ? 204 : xhr.status;
            // fix status code when it is 0 (0 status is undocumented).
            // Occurs when accessing file resources or on Android 4.1 stock browser
            // while retrieving files from application cache.
            if (status === 0) {
                status = response ? 200 : 0;
            }
            if (200 <= status && status <= 300) {
                completer.resolve(response);
            }
            else {
                completer.reject("Failed to load " + url, null);
            }
        };
        xhr.onerror = function () { completer.reject("Failed to load " + url, null); };
        xhr.send();
        return completer.promise;
    };
    /** @nocollapse */
    XHRImpl.decorators = [
        { type: core_1.Injectable },
    ];
    return XHRImpl;
}(compiler_1.XHR));
exports.XHRImpl = XHRImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyX2ltcGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy9zcmMveGhyL3hocl9pbXBsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7R0FNRztBQUNILHlCQUFrQixtQkFBbUIsQ0FBQyxDQUFBO0FBQ3RDLHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUV6QyxxQkFBd0IsZ0JBQWdCLENBQUMsQ0FBQTtBQUN6Qyx3QkFBK0MsbUJBQW1CLENBQUMsQ0FBQTtBQUNuRTtJQUE2QiwyQkFBRztJQUFoQztRQUE2Qiw4QkFBRztJQXNDaEMsQ0FBQztJQXJDQyxxQkFBRyxHQUFILFVBQUksR0FBVztRQUNiLElBQUksU0FBUyxHQUE2Qix3QkFBYyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3JFLElBQUksR0FBRyxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDL0IsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNCLEdBQUcsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBRTFCLEdBQUcsQ0FBQyxNQUFNLEdBQUc7WUFDWCxtRkFBbUY7WUFDbkYsMEZBQTBGO1lBQzFGLElBQUksUUFBUSxHQUFHLGdCQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQztZQUV6RSx5REFBeUQ7WUFDekQsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sS0FBSyxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7WUFFcEQsMkRBQTJEO1lBQzNELHVFQUF1RTtZQUN2RSxpREFBaUQ7WUFDakQsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLE1BQU0sR0FBRyxRQUFRLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztZQUM5QixDQUFDO1lBRUQsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLE1BQU0sSUFBSSxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM5QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBa0IsR0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2xELENBQUM7UUFDSCxDQUFDLENBQUM7UUFFRixHQUFHLENBQUMsT0FBTyxHQUFHLGNBQWEsU0FBUyxDQUFDLE1BQU0sQ0FBQyxvQkFBa0IsR0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTlFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO0lBQzNCLENBQUM7SUFDSCxrQkFBa0I7SUFDWCxrQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixjQUFDO0FBQUQsQ0FBQyxBQXRDRCxDQUE2QixjQUFHLEdBc0MvQjtBQXRDWSxlQUFPLFVBc0NuQixDQUFBIn0=