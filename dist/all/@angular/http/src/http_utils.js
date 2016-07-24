/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var exceptions_1 = require('../src/facade/exceptions');
var lang_1 = require('../src/facade/lang');
var enums_1 = require('./enums');
function normalizeMethodName(method) {
    if (lang_1.isString(method)) {
        var originalMethod = method;
        method = method
            .replace(/(\w)(\w*)/g, function (g0, g1, g2) { return g1.toUpperCase() + g2.toLowerCase(); });
        method = enums_1.RequestMethod[method];
        if (typeof method !== 'number')
            throw exceptions_1.makeTypeError("Invalid request method. The method \"" + originalMethod + "\" is not supported.");
    }
    return method;
}
exports.normalizeMethodName = normalizeMethodName;
exports.isSuccess = function (status) { return (status >= 200 && status < 300); };
function getResponseURL(xhr) {
    if ('responseURL' in xhr) {
        return xhr.responseURL;
    }
    if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
    }
    return;
}
exports.getResponseURL = getResponseURL;
function stringToArrayBuffer(input) {
    var view = new Uint16Array(input.length);
    for (var i = 0, strLen = input.length; i < strLen; i++) {
        view[i] = input.charCodeAt(i);
    }
    return view.buffer;
}
exports.stringToArrayBuffer = stringToArrayBuffer;
var lang_2 = require('../src/facade/lang');
exports.isJsObject = lang_2.isJsObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF91dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvaHR0cC9zcmMvaHR0cF91dGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsMkJBQTRCLDBCQUEwQixDQUFDLENBQUE7QUFDdkQscUJBQXVCLG9CQUFvQixDQUFDLENBQUE7QUFFNUMsc0JBQTRCLFNBQVMsQ0FBQyxDQUFBO0FBRXRDLDZCQUFvQyxNQUE4QjtJQUNoRSxFQUFFLENBQUMsQ0FBQyxlQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JCLElBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQztRQUM1QixNQUFNLEdBQVksTUFBTzthQUNYLE9BQU8sQ0FDSixZQUFZLEVBQ1osVUFBQyxFQUFVLEVBQUUsRUFBVSxFQUFFLEVBQVUsSUFBSyxPQUFBLEVBQUUsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFLENBQUMsV0FBVyxFQUFFLEVBQW5DLENBQW1DLENBQUMsQ0FBQztRQUM5RixNQUFNLEdBQWtDLHFCQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDL0QsRUFBRSxDQUFDLENBQUMsT0FBTyxNQUFNLEtBQUssUUFBUSxDQUFDO1lBQzdCLE1BQU0sMEJBQWEsQ0FDZiwwQ0FBdUMsY0FBYyx5QkFBcUIsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7SUFDRCxNQUFNLENBQWdCLE1BQU0sQ0FBQztBQUMvQixDQUFDO0FBYmUsMkJBQW1CLHNCQWFsQyxDQUFBO0FBRVksaUJBQVMsR0FBRyxVQUFDLE1BQWMsSUFBYyxPQUFBLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLEVBQS9CLENBQStCLENBQUM7QUFFdEYsd0JBQStCLEdBQVE7SUFDckMsRUFBRSxDQUFDLENBQUMsYUFBYSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUM7SUFDekIsQ0FBQztJQUNELEVBQUUsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2hELENBQUM7SUFDRCxNQUFNLENBQUM7QUFDVCxDQUFDO0FBUmUsc0JBQWMsaUJBUTdCLENBQUE7QUFFRCw2QkFBb0MsS0FBYTtJQUMvQyxJQUFJLElBQUksR0FBRyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDekMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUN2RCxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDckIsQ0FBQztBQU5lLDJCQUFtQixzQkFNbEMsQ0FBQTtBQUVELHFCQUF5QixvQkFBb0IsQ0FBQztBQUF0Qyx1Q0FBc0MifQ==