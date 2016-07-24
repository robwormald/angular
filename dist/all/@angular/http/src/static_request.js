/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lang_1 = require('../src/facade/lang');
var body_1 = require('./body');
var enums_1 = require('./enums');
var headers_1 = require('./headers');
var http_utils_1 = require('./http_utils');
var url_search_params_1 = require('./url_search_params');
// TODO(jeffbcross): properly implement body accessors
/**
 * Creates `Request` instances from provided values.
 *
 * The Request's interface is inspired by the Request constructor defined in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#request-class),
 * but is considered a static value whose body can be accessed many times. There are other
 * differences in the implementation, but this is the most significant.
 *
 * `Request` instances are typically created by higher-level classes, like {@link Http} and
 * {@link Jsonp}, but it may occasionally be useful to explicitly create `Request` instances.
 * One such example is when creating services that wrap higher-level services, like {@link Http},
 * where it may be useful to generate a `Request` with arbitrary headers and search params.
 *
 * ```typescript
 * import {Injectable, Injector} from '@angular/core';
 * import {HTTP_PROVIDERS, Http, Request, RequestMethod} from '@angular/http';
 *
 * @Injectable()
 * class AutoAuthenticator {
 *   constructor(public http:Http) {}
 *   request(url:string) {
 *     return this.http.request(new Request({
 *       method: RequestMethod.Get,
 *       url: url,
 *       search: 'password=123'
 *     }));
 *   }
 * }
 *
 * var injector = Injector.resolveAndCreate([HTTP_PROVIDERS, AutoAuthenticator]);
 * var authenticator = injector.get(AutoAuthenticator);
 * authenticator.request('people.json').subscribe(res => {
 *   //URL should have included '?password=123'
 *   console.log('people', res.json());
 * });
 * ```
 *
 * @experimental
 */
var Request = (function (_super) {
    __extends(Request, _super);
    function Request(requestOptions) {
        _super.call(this);
        // TODO: assert that url is present
        var url = requestOptions.url;
        this.url = requestOptions.url;
        if (lang_1.isPresent(requestOptions.search)) {
            var search = requestOptions.search.toString();
            if (search.length > 0) {
                var prefix = '?';
                if (lang_1.StringWrapper.contains(this.url, '?')) {
                    prefix = (this.url[this.url.length - 1] == '&') ? '' : '&';
                }
                // TODO: just delete search-query-looking string in url?
                this.url = url + prefix + search;
            }
        }
        this._body = requestOptions.body;
        this.method = http_utils_1.normalizeMethodName(requestOptions.method);
        // TODO(jeffbcross): implement behavior
        // Defaults to 'omit', consistent with browser
        // TODO(jeffbcross): implement behavior
        this.headers = new headers_1.Headers(requestOptions.headers);
        this.contentType = this.detectContentType();
        this.withCredentials = requestOptions.withCredentials;
        this.responseType = requestOptions.responseType;
    }
    /**
     * Returns the content type enum based on header options.
     */
    Request.prototype.detectContentType = function () {
        switch (this.headers.get('content-type')) {
            case 'application/json':
                return enums_1.ContentType.JSON;
            case 'application/x-www-form-urlencoded':
                return enums_1.ContentType.FORM;
            case 'multipart/form-data':
                return enums_1.ContentType.FORM_DATA;
            case 'text/plain':
            case 'text/html':
                return enums_1.ContentType.TEXT;
            case 'application/octet-stream':
                return enums_1.ContentType.BLOB;
            default:
                return this.detectContentTypeFromBody();
        }
    };
    /**
     * Returns the content type of request's body based on its type.
     */
    Request.prototype.detectContentTypeFromBody = function () {
        if (this._body == null) {
            return enums_1.ContentType.NONE;
        }
        else if (this._body instanceof url_search_params_1.URLSearchParams) {
            return enums_1.ContentType.FORM;
        }
        else if (this._body instanceof FormData) {
            return enums_1.ContentType.FORM_DATA;
        }
        else if (this._body instanceof Blob) {
            return enums_1.ContentType.BLOB;
        }
        else if (this._body instanceof ArrayBuffer) {
            return enums_1.ContentType.ARRAY_BUFFER;
        }
        else if (this._body && typeof this._body == 'object') {
            return enums_1.ContentType.JSON;
        }
        else {
            return enums_1.ContentType.TEXT;
        }
    };
    /**
     * Returns the request's body according to its type. If body is undefined, return
     * null.
     */
    Request.prototype.getBody = function () {
        switch (this.contentType) {
            case enums_1.ContentType.JSON:
                return this.text();
            case enums_1.ContentType.FORM:
                return this.text();
            case enums_1.ContentType.FORM_DATA:
                return this._body;
            case enums_1.ContentType.TEXT:
                return this.text();
            case enums_1.ContentType.BLOB:
                return this.blob();
            case enums_1.ContentType.ARRAY_BUFFER:
                return this.arrayBuffer();
            default:
                return null;
        }
    };
    return Request;
}(body_1.Body));
exports.Request = Request;
var noop = function () { };
var w = typeof window == 'object' ? window : noop;
var FormData = w['FormData'] || noop;
var Blob = w['Blob'] || noop;
var ArrayBuffer = w['ArrayBuffer'] || noop;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3JlcXVlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2h0dHAvc3JjL3N0YXRpY19yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILHFCQUF1QyxvQkFBb0IsQ0FBQyxDQUFBO0FBRTVELHFCQUFtQixRQUFRLENBQUMsQ0FBQTtBQUM1QixzQkFBOEQsU0FBUyxDQUFDLENBQUE7QUFDeEUsd0JBQXNCLFdBQVcsQ0FBQyxDQUFBO0FBQ2xDLDJCQUFrQyxjQUFjLENBQUMsQ0FBQTtBQUVqRCxrQ0FBOEIscUJBQXFCLENBQUMsQ0FBQTtBQUdwRCxzREFBc0Q7QUFDdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NHO0FBQ0g7SUFBNkIsMkJBQUk7SUFpQi9CLGlCQUFZLGNBQTJCO1FBQ3JDLGlCQUFPLENBQUM7UUFDUixtQ0FBbUM7UUFDbkMsSUFBSSxHQUFHLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUM7UUFDOUIsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksTUFBTSxHQUFHLGNBQWMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDOUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLE1BQU0sR0FBRyxHQUFHLENBQUM7Z0JBQ2pCLEVBQUUsQ0FBQyxDQUFDLG9CQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMxQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxD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