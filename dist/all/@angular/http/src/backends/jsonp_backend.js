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
var Observable_1 = require('rxjs/Observable');
var base_response_options_1 = require('../base_response_options');
var enums_1 = require('../enums');
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
var interfaces_1 = require('../interfaces');
var static_response_1 = require('../static_response');
var browser_jsonp_1 = require('./browser_jsonp');
var JSONP_ERR_NO_CALLBACK = 'JSONP injected script did not invoke callback.';
var JSONP_ERR_WRONG_METHOD = 'JSONP requests must use GET request method.';
/**
 * Abstract base class for an in-flight JSONP request.
 *
 * @experimental
 */
var JSONPConnection = (function () {
    function JSONPConnection() {
    }
    return JSONPConnection;
}());
exports.JSONPConnection = JSONPConnection;
var JSONPConnection_ = (function (_super) {
    __extends(JSONPConnection_, _super);
    function JSONPConnection_(req, _dom, baseResponseOptions) {
        var _this = this;
        _super.call(this);
        this._dom = _dom;
        this.baseResponseOptions = baseResponseOptions;
        this._finished = false;
        if (req.method !== enums_1.RequestMethod.Get) {
            throw exceptions_1.makeTypeError(JSONP_ERR_WRONG_METHOD);
        }
        this.request = req;
        this.response = new Observable_1.Observable(function (responseObserver) {
            _this.readyState = enums_1.ReadyState.Loading;
            var id = _this._id = _dom.nextRequestID();
            _dom.exposeConnection(id, _this);
            // Workaround Dart
            // url = url.replace(/=JSONP_CALLBACK(&|$)/, `generated method`);
            var callback = _dom.requestCallback(_this._id);
            var url = req.url;
            if (url.indexOf('=JSONP_CALLBACK&') > -1) {
                url = lang_1.StringWrapper.replace(url, '=JSONP_CALLBACK&', "=" + callback + "&");
            }
            else if (url.lastIndexOf('=JSONP_CALLBACK') === url.length - '=JSONP_CALLBACK'.length) {
                url = url.substring(0, url.length - '=JSONP_CALLBACK'.length) + ("=" + callback);
            }
            var script = _this._script = _dom.build(url);
            var onLoad = function (event) {
                if (_this.readyState === enums_1.ReadyState.Cancelled)
                    return;
                _this.readyState = enums_1.ReadyState.Done;
                _dom.cleanup(script);
                if (!_this._finished) {
                    var responseOptions_1 = new base_response_options_1.ResponseOptions({ body: JSONP_ERR_NO_CALLBACK, type: enums_1.ResponseType.Error, url: url });
                    if (lang_1.isPresent(baseResponseOptions)) {
                        responseOptions_1 = baseResponseOptions.merge(responseOptions_1);
                    }
                    responseObserver.error(new static_response_1.Response(responseOptions_1));
                    return;
                }
                var responseOptions = new base_response_options_1.ResponseOptions({ body: _this._responseData, url: url });
                if (lang_1.isPresent(_this.baseResponseOptions)) {
                    responseOptions = _this.baseResponseOptions.merge(responseOptions);
                }
                responseObserver.next(new static_response_1.Response(responseOptions));
                responseObserver.complete();
            };
            var onError = function (error) {
                if (_this.readyState === enums_1.ReadyState.Cancelled)
                    return;
                _this.readyState = enums_1.ReadyState.Done;
                _dom.cleanup(script);
                var responseOptions = new base_response_options_1.ResponseOptions({ body: error.message, type: enums_1.ResponseType.Error });
                if (lang_1.isPresent(baseResponseOptions)) {
                    responseOptions = baseResponseOptions.merge(responseOptions);
                }
                responseObserver.error(new static_response_1.Response(responseOptions));
            };
            script.addEventListener('load', onLoad);
            script.addEventListener('error', onError);
            _dom.send(script);
            return function () {
                _this.readyState = enums_1.ReadyState.Cancelled;
                script.removeEventListener('load', onLoad);
                script.removeEventListener('error', onError);
                if (lang_1.isPresent(script)) {
                    _this._dom.cleanup(script);
                }
            };
        });
    }
    JSONPConnection_.prototype.finished = function (data) {
        // Don't leak connections
        this._finished = true;
        this._dom.removeConnection(this._id);
        if (this.readyState === enums_1.ReadyState.Cancelled)
            return;
        this._responseData = data;
    };
    return JSONPConnection_;
}(JSONPConnection));
exports.JSONPConnection_ = JSONPConnection_;
/**
 * A {@link ConnectionBackend} that uses the JSONP strategy of making requests.
 *
 * @experimental
 */
var JSONPBackend = (function (_super) {
    __extends(JSONPBackend, _super);
    function JSONPBackend() {
        _super.apply(this, arguments);
    }
    return JSONPBackend;
}(interfaces_1.ConnectionBackend));
exports.JSONPBackend = JSONPBackend;
var JSONPBackend_ = (function (_super) {
    __extends(JSONPBackend_, _super);
    function JSONPBackend_(_browserJSONP, _baseResponseOptions) {
        _super.call(this);
        this._browserJSONP = _browserJSONP;
        this._baseResponseOptions = _baseResponseOptions;
    }
    JSONPBackend_.prototype.createConnection = function (request) {
        return new JSONPConnection_(request, this._browserJSONP, this._baseResponseOptions);
    };
    /** @nocollapse */
    JSONPBackend_.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    JSONPBackend_.ctorParameters = [
        { type: browser_jsonp_1.BrowserJsonp, },
        { type: base_response_options_1.ResponseOptions, },
    ];
    return JSONPBackend_;
}(JSONPBackend));
exports.JSONPBackend_ = JSONPBackend_;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnBfYmFja2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvaHR0cC9zcmMvYmFja2VuZHMvanNvbnBfYmFja2VuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFDekMsMkJBQXlCLGlCQUFpQixDQUFDLENBQUE7QUFHM0Msc0NBQW1ELDBCQUEwQixDQUFDLENBQUE7QUFDOUUsc0JBQXNELFVBQVUsQ0FBQyxDQUFBO0FBQ2pFLDJCQUE0QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ25ELHFCQUF1QyxnQkFBZ0IsQ0FBQyxDQUFBO0FBQ3hELDJCQUE0QyxlQUFlLENBQUMsQ0FBQTtBQUU1RCxnQ0FBdUIsb0JBQW9CLENBQUMsQ0FBQTtBQUU1Qyw4QkFBMkIsaUJBQWlCLENBQUMsQ0FBQTtBQUU3QyxJQUFNLHFCQUFxQixHQUFHLGdEQUFnRCxDQUFDO0FBQy9FLElBQU0sc0JBQXNCLEdBQUcsNkNBQTZDLENBQUM7QUFFN0U7Ozs7R0FJRztBQUNIO0lBQUE7SUFxQkEsQ0FBQztJQUFELHNCQUFDO0FBQUQsQ0FBQyxBQXJCRCxJQXFCQztBQXJCcUIsdUJBQWUsa0JBcUJwQyxDQUFBO0FBRUQ7SUFBc0Msb0NBQWU7SUFNbkQsMEJBQ0ksR0FBWSxFQUFVLElBQWtCLEVBQVUsbUJBQXFDO1FBUDdGLGlCQTBGQztRQWxGRyxpQkFBTyxDQUFDO1FBRGdCLFNBQUksR0FBSixJQUFJLENBQWM7UUFBVSx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQWtCO1FBSG5GLGNBQVMsR0FBWSxLQUFLLENBQUM7UUFLakMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxxQkFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSwwQkFBYSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDOUMsQ0FB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