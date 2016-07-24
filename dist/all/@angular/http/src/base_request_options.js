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
var core_1 = require('@angular/core');
var lang_1 = require('../src/facade/lang');
var enums_1 = require('./enums');
var headers_1 = require('./headers');
var http_utils_1 = require('./http_utils');
var url_search_params_1 = require('./url_search_params');
/**
 * Creates a request options object to be optionally provided when instantiating a
 * {@link Request}.
 *
 * This class is based on the `RequestInit` description in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#requestinit).
 *
 * All values are null by default. Typical defaults can be found in the {@link BaseRequestOptions}
 * class, which sub-classes `RequestOptions`.
 *
 * ### Example ([live demo](http://plnkr.co/edit/7Wvi3lfLq41aQPKlxB4O?p=preview))
 *
 * ```typescript
 * import {RequestOptions, Request, RequestMethod} from '@angular/http';
 *
 * var options = new RequestOptions({
 *   method: RequestMethod.Post,
 *   url: 'https://google.com'
 * });
 * var req = new Request(options);
 * console.log('req.method:', RequestMethod[req.method]); // Post
 * console.log('options.url:', options.url); // https://google.com
 * ```
 *
 * @experimental
 */
var RequestOptions = (function () {
    function RequestOptions(_a) {
        var _b = _a === void 0 ? {} : _a, method = _b.method, headers = _b.headers, body = _b.body, url = _b.url, search = _b.search, withCredentials = _b.withCredentials, responseType = _b.responseType;
        this.method = lang_1.isPresent(method) ? http_utils_1.normalizeMethodName(method) : null;
        this.headers = lang_1.isPresent(headers) ? headers : null;
        this.body = lang_1.isPresent(body) ? body : null;
        this.url = lang_1.isPresent(url) ? url : null;
        this.search = lang_1.isPresent(search) ?
            (lang_1.isString(search) ? new url_search_params_1.URLSearchParams((search)) : (search)) :
            null;
        this.withCredentials = lang_1.isPresent(withCredentials) ? withCredentials : null;
        this.responseType = lang_1.isPresent(responseType) ? responseType : null;
    }
    /**
     * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
     * existing values. This method will not change the values of the instance on which it is being
     * called.
     *
     * Note that `headers` and `search` will override existing values completely if present in
     * the `options` object. If these values should be merged, it should be done prior to calling
     * `merge` on the `RequestOptions` instance.
     *
     * ### Example ([live demo](http://plnkr.co/edit/6w8XA8YTkDRcPYpdB9dk?p=preview))
     *
     * ```typescript
     * import {RequestOptions, Request, RequestMethod} from '@angular/http';
     *
     * var options = new RequestOptions({
     *   method: RequestMethod.Post
     * });
     * var req = new Request(options.merge({
     *   url: 'https://google.com'
     * }));
     * console.log('req.method:', RequestMethod[req.method]); // Post
     * console.log('options.url:', options.url); // null
     * console.log('req.url:', req.url); // https://google.com
     * ```
     */
    RequestOptions.prototype.merge = function (options) {
        return new RequestOptions({
            method: lang_1.isPresent(options) && lang_1.isPresent(options.method) ? options.method : this.method,
            headers: lang_1.isPresent(options) && lang_1.isPresent(options.headers) ? options.headers : this.headers,
            body: lang_1.isPresent(options) && lang_1.isPresent(options.body) ? options.body : this.body,
            url: lang_1.isPresent(options) && lang_1.isPresent(options.url) ? options.url : this.url,
            search: lang_1.isPresent(options) && lang_1.isPresent(options.search) ?
                (lang_1.isString(options.search) ? new url_search_params_1.URLSearchParams((options.search)) :
                    (options.search).clone()) :
                this.search,
            withCredentials: lang_1.isPresent(options) && lang_1.isPresent(options.withCredentials) ?
                options.withCredentials :
                this.withCredentials,
            responseType: lang_1.isPresent(options) && lang_1.isPresent(options.responseType) ? options.responseType :
                this.responseType
        });
    };
    return RequestOptions;
}());
exports.RequestOptions = RequestOptions;
var BaseRequestOptions = (function (_super) {
    __extends(BaseRequestOptions, _super);
    function BaseRequestOptions() {
        _super.call(this, { method: enums_1.RequestMethod.Get, headers: new headers_1.Headers() });
    }
    /** @nocollapse */
    BaseRequestOptions.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    BaseRequestOptions.ctorParameters = [];
    return BaseRequestOptions;
}(RequestOptions));
exports.BaseRequestOptions = BaseRequestOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9yZXF1ZXN0X29wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2h0dHAvc3JjL2Jhc2VfcmVxdWVzdF9vcHRpb25zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILHFCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUV6QyxxQkFBa0Msb0JBQW9CLENBQUMsQ0FBQTtBQUV2RCxzQkFBaUQsU0FBUyxDQUFDLENBQUE7QUFDM0Qsd0JBQXNCLFdBQVcsQ0FBQyxDQUFBO0FBQ2xDLDJCQUFrQyxjQUFjLENBQUMsQ0FBQTtBQUVqRCxrQ0FBOEIscUJBQXFCLENBQUMsQ0FBQTtBQUdwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNIO0lBK0JFLHdCQUNJLEVBQ3VDO1lBRHZDLDRCQUN1QyxFQUR0QyxrQkFBTSxFQUFFLG9CQUFPLEVBQUUsY0FBSSxFQUFFLFlBQUcsRUFBRSxrQkFBTSxFQUFFLG9DQUFlLEVBQ25ELDhCQUFZO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRyxnQkFBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLGdDQUFtQixDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNyRSxJQUFJLENBQUMsT0FBTyxHQUFHLGdCQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxHQUFHLGdCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztRQUMxQyxJQUFJLENBQUMsR0FBRyxHQUFHLGdCQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztRQUN2QyxJQUFJLENBQUMsTUFBTSxHQUFHLGdCQUFTLENBQUMsTUFBTSxDQUFDO1lBQzNCLENBQUMsZUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksbUNB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