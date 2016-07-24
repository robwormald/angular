/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../facade/lang');
var _nextRequestId = 0;
exports.JSONP_HOME = '__ng_jsonp__';
var _jsonpConnections = null;
function _getJsonpConnections() {
    if (_jsonpConnections === null) {
        _jsonpConnections = lang_1.global[exports.JSONP_HOME] = {};
    }
    return _jsonpConnections;
}
var BrowserJsonp = (function () {
    function BrowserJsonp() {
    }
    // Construct a <script> element with the specified URL
    BrowserJsonp.prototype.build = function (url) {
        var node = document.createElement('script');
        node.src = url;
        return node;
    };
    BrowserJsonp.prototype.nextRequestID = function () { return "__req" + _nextRequestId++; };
    BrowserJsonp.prototype.requestCallback = function (id) { return exports.JSONP_HOME + "." + id + ".finished"; };
    BrowserJsonp.prototype.exposeConnection = function (id, connection) {
        var connections = _getJsonpConnections();
        connections[id] = connection;
    };
    BrowserJsonp.prototype.removeConnection = function (id) {
        var connections = _getJsonpConnections();
        connections[id] = null;
    };
    // Attach the <script> element to the DOM
    BrowserJsonp.prototype.send = function (node) { document.body.appendChild((node)); };
    // Remove <script> element from the DOM
    BrowserJsonp.prototype.cleanup = function (node) {
        if (node.parentNode) {
            node.parentNode.removeChild((node));
        }
    };
    /** @nocollapse */
    BrowserJsonp.decorators = [
        { type: core_1.Injectable },
    ];
    return BrowserJsonp;
}());
exports.BrowserJsonp = BrowserJsonp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9qc29ucC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvaHR0cC9zcmMvYmFja2VuZHMvYnJvd3Nlcl9qc29ucC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBQ3pDLHFCQUFxQixnQkFBZ0IsQ0FBQyxDQUFBO0FBRXRDLElBQUksY0FBYyxHQUFHLENBQUMsQ0FBQztBQUNWLGtCQUFVLEdBQUcsY0FBYyxDQUFDO0FBQ3pDLElBQUksaUJBQWlCLEdBQXlCLElBQUksQ0FBQztBQUVuRDtJQUNFLEVBQUUsQ0FBQyxDQUFDLGlCQUFpQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0IsaUJBQWlCLEdBQTBCLGFBQU8sQ0FBQyxrQkFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3RFLENBQUM7SUFDRCxNQUFNLENBQUMsaUJBQWlCLENBQUM7QUFDM0IsQ0FBQztBQUNEO0lBQUE7SUFtQ0EsQ0FBQztJQWxDQyxzREFBc0Q7SUFDdEQsNEJBQUssR0FBTCxVQUFNLEdBQVc7UUFDZixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxvQ0FBYSxHQUFiLGNBQTBCLE1BQU0sQ0FBQyxVQUFRLGNBQWMsRUFBSSxDQUFDLENBQUMsQ0FBQztJQUU5RCxzQ0FBZSxHQUFmLFVBQWdCLEVBQVUsSUFBWSxNQUFNLENBQUksa0JBQVUsU0FBSSxFQUFFLGNBQVcsQ0FBQyxDQUFDLENBQUM7SUFFOUUsdUNBQWdCLEdBQWhCLFVBQWlCLEVBQVUsRUFBRSxVQUFlO1FBQzFDLElBQUksV0FBVyxHQUFHLG9CQUFvQixFQUFFLENBQUM7UUFDekMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRUQsdUNBQWdCLEdBQWhCLFVBQWlCLEVBQVU7UUFDekIsSUFBSSxXQUFXLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQztRQUN6QyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ3pCLENBQUM7SUFFRCx5Q0FBeUM7SUFDekMsMkJBQUksR0FBSixVQUFLLElBQVMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTVELHVDQUF1QztJQUN2Qyw4QkFBTyxHQUFQLFVBQVEsSUFBUztRQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUM1QyxDQUFDO0lBQ0gsQ0FBQztJQUNILGtCQUFrQjtJQUNYLHVCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLG1CQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQztBQW5DWSxvQkFBWSxlQW1DeEIsQ0FBQSJ9