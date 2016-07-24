/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var Observable_1 = require('rxjs/Observable');
var base_response_options_1 = require('../base_response_options');
var enums_1 = require('../enums');
var lang_1 = require('../facade/lang');
var headers_1 = require('../headers');
var http_utils_1 = require('../http_utils');
var interfaces_1 = require('../interfaces');
var static_response_1 = require('../static_response');
var browser_xhr_1 = require('./browser_xhr');
var XSSI_PREFIX = /^\)\]\}',?\n/;
/**
 * Creates connections using `XMLHttpRequest`. Given a fully-qualified
 * request, an `XHRConnection` will immediately create an `XMLHttpRequest` object and send the
 * request.
 *
 * This class would typically not be created or interacted with directly inside applications, though
 * the {@link MockConnection} may be interacted with in tests.
 *
 * @experimental
 */
var XHRConnection = (function () {
    function XHRConnection(req, browserXHR, baseResponseOptions) {
        var _this = this;
        this.request = req;
        this.response = new Observable_1.Observable(function (responseObserver) {
            var _xhr = browserXHR.build();
            _xhr.open(enums_1.RequestMethod[req.method].toUpperCase(), req.url);
            if (lang_1.isPresent(req.withCredentials)) {
                _xhr.withCredentials = req.withCredentials;
            }
            // load event handler
            var onLoad = function () {
                // responseText is the old-school way of retrieving response (supported by IE8 & 9)
                // response/responseType properties were introduced in XHR Level2 spec (supported by
                // IE10)
                var body = lang_1.isPresent(_xhr.response) ? _xhr.response : _xhr.responseText;
                // Implicitly strip a potential XSSI prefix.
                if (lang_1.isString(body))
                    body = body.replace(XSSI_PREFIX, '');
                var headers = headers_1.Headers.fromResponseHeaderString(_xhr.getAllResponseHeaders());
                var url = http_utils_1.getResponseURL(_xhr);
                // normalize IE9 bug (http://bugs.jquery.com/ticket/1450)
                var status = _xhr.status === 1223 ? 204 : _xhr.status;
                // fix status code when it is 0 (0 status is undocumented).
                // Occurs when accessing file resources or on Android 4.1 stock browser
                // while retrieving files from application cache.
                if (status === 0) {
                    status = body ? 200 : 0;
                }
                var statusText = _xhr.statusText || 'OK';
                var responseOptions = new base_response_options_1.ResponseOptions({ body: body, status: status, headers: headers, statusText: statusText, url: url });
                if (lang_1.isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                var response = new static_response_1.Response(responseOptions);
                response.ok = http_utils_1.isSuccess(status);
                if (response.ok) {
                    responseObserver.next(response);
                    // TODO(gdi2290): defer complete if array buffer until done
                    responseObserver.complete();
                    return;
                }
                responseObserver.error(response);
            };
            // error event handler
            var onError = function (err) {
                var responseOptions = new base_response_options_1.ResponseOptions({
                    body: err,
                    type: enums_1.ResponseType.Error,
                    status: _xhr.status,
                    statusText: _xhr.statusText,
                });
                if (lang_1.isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new static_response_1.Response(responseOptions));
            };
            _this.setDetectedContentType(req, _xhr);
            if (lang_1.isPresent(req.headers)) {
                req.headers.forEach(function (values, name) { return _xhr.setRequestHeader(name, values.join(',')); });
            }
            // Select the correct buffer type to store the response
            if (lang_1.isPresent(req.responseType) && lang_1.isPresent(_xhr.responseType)) {
                switch (req.responseType) {
                    case enums_1.ResponseContentType.ArrayBuffer:
                        _xhr.responseType = 'arraybuffer';
                        break;
                    case enums_1.ResponseContentType.Json:
                        _xhr.responseType = 'json';
                        break;
                    case enums_1.ResponseContentType.Text:
                        _xhr.responseType = 'text';
                        break;
                    case enums_1.ResponseContentType.Blob:
                        _xhr.responseType = 'blob';
                        break;
                    default:
                        throw new Error('The selected responseType is not supported');
                }
            }
            _xhr.addEventListener('load', onLoad);
            _xhr.addEventListener('error', onError);
            _xhr.send(_this.request.getBody());
            return function () {
                _xhr.removeEventListener('load', onLoad);
                _xhr.removeEventListener('error', onError);
                _xhr.abort();
            };
        });
    }
    XHRConnection.prototype.setDetectedContentType = function (req /** TODO #9100 */, _xhr /** TODO #9100 */) {
        // Skip if a custom Content-Type header is provided
        if (lang_1.isPresent(req.headers) && lang_1.isPresent(req.headers.get('Content-Type'))) {
            return;
        }
        // Set the detected content type
        switch (req.contentType) {
            case enums_1.ContentType.NONE:
                break;
            case enums_1.ContentType.JSON:
                _xhr.setRequestHeader('Content-Type', 'application/json');
                break;
            case enums_1.ContentType.FORM:
                _xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
                break;
            case enums_1.ContentType.TEXT:
                _xhr.setRequestHeader('Content-Type', 'text/plain');
                break;
            case enums_1.ContentType.BLOB:
                var blob = req.blob();
                if (blob.type) {
                    _xhr.setRequestHeader('Content-Type', blob.type);
                }
                break;
        }
    };
    return XHRConnection;
}());
exports.XHRConnection = XHRConnection;
/**
 * `XSRFConfiguration` sets up Cross Site Request Forgery (XSRF) protection for the application
 * using a cookie. See {@link https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)}
 * for more information on XSRF.
 *
 * Applications can configure custom cookie and header names by binding an instance of this class
 * with different `cookieName` and `headerName` values. See the main HTTP documentation for more
 * details.
 *
 * @experimental
 */
var CookieXSRFStrategy = (function () {
    function CookieXSRFStrategy(_cookieName, _headerName) {
        if (_cookieName === void 0) { _cookieName = 'XSRF-TOKEN'; }
        if (_headerName === void 0) { _headerName = 'X-XSRF-TOKEN'; }
        this._cookieName = _cookieName;
        this._headerName = _headerName;
    }
    CookieXSRFStrategy.prototype.configureRequest = function (req) {
        var xsrfToken = platform_browser_1.__platform_browser_private__.getDOM().getCookie(this._cookieName);
        if (xsrfToken && !req.headers.has(this._headerName)) {
            req.headers.set(this._headerName, xsrfToken);
        }
    };
    return CookieXSRFStrategy;
}());
exports.CookieXSRFStrategy = CookieXSRFStrategy;
var XHRBackend = (function () {
    function XHRBackend(_browserXHR, _baseResponseOptions, _xsrfStrategy) {
        this._browserXHR = _browserXHR;
        this._baseResponseOptions = _baseResponseOptions;
        this._xsrfStrategy = _xsrfStrategy;
    }
    XHRBackend.prototype.createConnection = function (request) {
        this._xsrfStrategy.configureRequest(request);
        return new XHRConnection(request, this._browserXHR, this._baseResponseOptions);
    };
    /** @nocollapse */
    XHRBackend.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    XHRBackend.ctorParameters = [
        { type: browser_xhr_1.BrowserXhr, },
        { type: base_response_options_1.ResponseOptions, },
        { type: interfaces_1.XSRFStrategy, },
    ];
    return XHRBackend;
}());
exports.XHRBackend = XHRBackend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyX2JhY2tlbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2h0dHAvc3JjL2JhY2tlbmRzL3hocl9iYWNrZW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsaUNBQTJDLDJCQUEyQixDQUFDLENBQUE7QUFDdkUsMkJBQXlCLGlCQUFpQixDQUFDLENBQUE7QUFHM0Msc0NBQThCLDBCQUEwQixDQUFDLENBQUE7QUFDekQsc0JBQXdGLFVBQVUsQ0FBQyxDQUFBO0FBQ25HLHFCQUFrQyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ25ELHdCQUFzQixZQUFZLENBQUMsQ0FBQTtBQUNuQywyQkFBd0MsZUFBZSxDQUFDLENBQUE7QUFDeEQsMkJBQTBELGVBQWUsQ0FBQyxDQUFBO0FBRTFFLGdDQUF1QixvQkFBb0IsQ0FBQyxDQUFBO0FBRTVDLDRCQUF5QixlQUFlLENBQUMsQ0FBQTtBQUV6QyxJQUFNLFdBQVcsR0FBRyxjQUFjLENBQUM7QUFFbkM7Ozs7Ozs7OztHQVNHO0FBQ0g7SUFRRSx1QkFBWSxHQUFZLEVBQUUsVUFBc0IsRUFBRSxtQkFBcUM7UUFSekYsaUJBc0lDO1FBN0hHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ25CLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx1QkFBVSxDQUFXLFVBQUMsZ0JBQW9DO1lBQzVFLElBQUksSUFBSSxHQUFtQixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxD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