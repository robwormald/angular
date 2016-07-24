/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * Supported http methods.
 * @experimental
 */
(function (RequestMethod) {
    RequestMethod[RequestMethod["Get"] = 0] = "Get";
    RequestMethod[RequestMethod["Post"] = 1] = "Post";
    RequestMethod[RequestMethod["Put"] = 2] = "Put";
    RequestMethod[RequestMethod["Delete"] = 3] = "Delete";
    RequestMethod[RequestMethod["Options"] = 4] = "Options";
    RequestMethod[RequestMethod["Head"] = 5] = "Head";
    RequestMethod[RequestMethod["Patch"] = 6] = "Patch";
})(exports.RequestMethod || (exports.RequestMethod = {}));
var RequestMethod = exports.RequestMethod;
/**
 * All possible states in which a connection can be, based on
 * [States](http://www.w3.org/TR/XMLHttpRequest/#states) from the `XMLHttpRequest` spec, but with an
 * additional "CANCELLED" state.
 * @experimental
 */
(function (ReadyState) {
    ReadyState[ReadyState["Unsent"] = 0] = "Unsent";
    ReadyState[ReadyState["Open"] = 1] = "Open";
    ReadyState[ReadyState["HeadersReceived"] = 2] = "HeadersReceived";
    ReadyState[ReadyState["Loading"] = 3] = "Loading";
    ReadyState[ReadyState["Done"] = 4] = "Done";
    ReadyState[ReadyState["Cancelled"] = 5] = "Cancelled";
})(exports.ReadyState || (exports.ReadyState = {}));
var ReadyState = exports.ReadyState;
/**
 * Acceptable response types to be associated with a {@link Response}, based on
 * [ResponseType](https://fetch.spec.whatwg.org/#responsetype) from the Fetch spec.
 * @experimental
 */
(function (ResponseType) {
    ResponseType[ResponseType["Basic"] = 0] = "Basic";
    ResponseType[ResponseType["Cors"] = 1] = "Cors";
    ResponseType[ResponseType["Default"] = 2] = "Default";
    ResponseType[ResponseType["Error"] = 3] = "Error";
    ResponseType[ResponseType["Opaque"] = 4] = "Opaque";
})(exports.ResponseType || (exports.ResponseType = {}));
var ResponseType = exports.ResponseType;
/**
 * Supported content type to be automatically associated with a {@link Request}.
 * @experimental
 */
(function (ContentType) {
    ContentType[ContentType["NONE"] = 0] = "NONE";
    ContentType[ContentType["JSON"] = 1] = "JSON";
    ContentType[ContentType["FORM"] = 2] = "FORM";
    ContentType[ContentType["FORM_DATA"] = 3] = "FORM_DATA";
    ContentType[ContentType["TEXT"] = 4] = "TEXT";
    ContentType[ContentType["BLOB"] = 5] = "BLOB";
    ContentType[ContentType["ARRAY_BUFFER"] = 6] = "ARRAY_BUFFER";
})(exports.ContentType || (exports.ContentType = {}));
var ContentType = exports.ContentType;
/**
 * Define which buffer to use to store the response
 * @experimental
 */
(function (ResponseContentType) {
    ResponseContentType[ResponseContentType["Text"] = 0] = "Text";
    ResponseContentType[ResponseContentType["Json"] = 1] = "Json";
    ResponseContentType[ResponseContentType["ArrayBuffer"] = 2] = "ArrayBuffer";
    ResponseContentType[ResponseContentType["Blob"] = 3] = "Blob";
})(exports.ResponseContentType || (exports.ResponseContentType = {}));
var ResponseContentType = exports.ResponseContentType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2h0dHAvc3JjL2VudW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSDs7O0dBR0c7QUFDSCxXQUFZLGFBQWE7SUFDdkIsK0NBQUcsQ0FBQTtJQUNILGlEQUFJLENBQUE7SUFDSiwrQ0FBRyxDQUFBO0lBQ0gscURBQU0sQ0FBQTtJQUNOLHVEQUFPLENBQUE7SUFDUCxpREFBSSxDQUFBO0lBQ0osbURBQUssQ0FBQTtBQUNQLENBQUMsRUFSVyxxQkFBYSxLQUFiLHFCQUFhLFFBUXhCO0FBUkQsSUFBWSxhQUFhLEdBQWIscUJBUVgsQ0FBQTtBQUVEOzs7OztHQUtHO0FBQ0gsV0FBWSxVQUFVO0lBQ3BCLCtDQUFNLENBQUE7SUFDTiwyQ0FBSSxDQUFBO0lBQ0osaUVBQWUsQ0FBQTtJQUNmLGlEQUFPLENBQUE7SUFDUCwyQ0FBSSxDQUFBO0lBQ0oscURBQVMsQ0FBQTtBQUNYLENBQUMsRUFQVyxrQkFBVSxLQUFWLGtCQUFVLFFBT3JCO0FBUEQsSUFBWSxVQUFVLEdBQVYsa0JBT1gsQ0FBQTtBQUVEOzs7O0dBSUc7QUFDSCxXQUFZLFlBQVk7SUFDdEIsaURBQUssQ0FBQTtJQUNMLCtDQUFJLENBQUE7SUFDSixxREFBTyxDQUFBO0lBQ1AsaURBQUssQ0FBQTtJQUNMLG1EQUFNLENBQUE7QUFDUixDQUFDLEVBTlcsb0JBQVksS0FBWixvQkFBWSxRQU12QjtBQU5ELElBQVksWUFBWSxHQUFaLG9CQU1YLENBQUE7QUFFRDs7O0dBR0c7QUFDSCxXQUFZLFdBQVc7SUFDckIsNkNBQUksQ0FBQTtJQUNKLDZDQUFJLENBQUE7SUFDSiw2Q0FBSSxDQUFBO0lBQ0osdURBQVMsQ0FBQTtJQUNULDZDQUFJLENBQUE7SUFDSiw2Q0FBSSxDQUFBO0lBQ0osNkRBQVksQ0FBQTtBQUNkLENBQUMsRUFSVyxtQkFBVyxLQUFYLG1CQUFXLFFBUXRCO0FBUkQsSUFBWSxXQUFXLEdBQVgsbUJBUVgsQ0FBQTtBQUVEOzs7R0FHRztBQUNILFdBQVksbUJBQW1CO0lBQzdCLDZEQUFJLENBQUE7SUFDSiw2REFBSSxDQUFBO0lBQ0osMkVBQVcsQ0FBQTtJQUNYLDZEQUFJLENBQUE7QUFDTixDQUFDLEVBTFcsMkJBQW1CLEtBQW5CLDJCQUFtQixRQUs5QjtBQUxELElBQVksbUJBQW1CLEdBQW5CLDJCQUtYLENBQUEifQ==