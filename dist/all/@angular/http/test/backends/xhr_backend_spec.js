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
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var browser_xhr_1 = require('../../src/backends/browser_xhr');
var lang_1 = require('../../src/facade/lang');
var interfaces_1 = require('../../src/interfaces');
var xhr_backend_1 = require('../../src/backends/xhr_backend');
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var static_request_1 = require('../../src/static_request');
var headers_1 = require('../../src/headers');
var collection_1 = require('../../src/facade/collection');
var base_request_options_1 = require('../../src/base_request_options');
var base_response_options_1 = require('../../src/base_response_options');
var enums_1 = require('../../src/enums');
var url_search_params_1 = require('../../src/url_search_params');
var abortSpy;
var sendSpy;
var openSpy;
var setRequestHeaderSpy;
var addEventListenerSpy;
var existingXHRs = [];
var unused;
var MockBrowserXHR = (function (_super) {
    __extends(MockBrowserXHR, _super);
    function MockBrowserXHR() {
        _super.call(this);
        this.callbacks = new collection_1.Map();
        var spy = new testing_internal_1.SpyObject();
        this.abort = abortSpy = spy.spy('abort');
        this.send = sendSpy = spy.spy('send');
        this.open = openSpy = spy.spy('open');
        this.setRequestHeader = setRequestHeaderSpy = spy.spy('setRequestHeader');
        // If responseType is supported by the browser, then it should be set to an empty string.
        // (https://www.w3.org/TR/XMLHttpRequest/#the-responsetype-attribute)
        this.responseType = '';
    }
    MockBrowserXHR.prototype.setStatusCode = function (status) { this.status = status; };
    MockBrowserXHR.prototype.setStatusText = function (statusText) { this.statusText = statusText; };
    MockBrowserXHR.prototype.setResponse = function (value) { this.response = value; };
    MockBrowserXHR.prototype.setResponseText = function (value) { this.responseText = value; };
    MockBrowserXHR.prototype.setResponseURL = function (value) { this.responseURL = value; };
    MockBrowserXHR.prototype.setResponseHeaders = function (value) { this.responseHeaders = value; };
    MockBrowserXHR.prototype.getAllResponseHeaders = function () { return this.responseHeaders || ''; };
    MockBrowserXHR.prototype.getResponseHeader = function (key) {
        return headers_1.Headers.fromResponseHeaderString(this.responseHeaders).get(key);
    };
    MockBrowserXHR.prototype.addEventListener = function (type, cb) { this.callbacks.set(type, cb); };
    MockBrowserXHR.prototype.removeEventListener = function (type, cb) { this.callbacks.delete(type); };
    MockBrowserXHR.prototype.dispatchEvent = function (type) { this.callbacks.get(type)({}); };
    MockBrowserXHR.prototype.build = function () {
        var xhr = new MockBrowserXHR();
        existingXHRs.push(xhr);
        return xhr;
    };
    return MockBrowserXHR;
}(browser_xhr_1.BrowserXhr));
function main() {
    testing_internal_1.describe('XHRBackend', function () {
        var backend;
        var sampleRequest;
        testing_internal_1.beforeEachProviders(function () {
            return [{ provide: base_response_options_1.ResponseOptions, useClass: base_response_options_1.BaseResponseOptions },
                { provide: browser_xhr_1.BrowserXhr, useClass: MockBrowserXHR }, xhr_backend_1.XHRBackend,
                { provide: interfaces_1.XSRFStrategy, useValue: new xhr_backend_1.CookieXSRFStrategy() },
            ];
        });
        testing_internal_1.beforeEach(testing_internal_1.inject([xhr_backend_1.XHRBackend], function (be) {
            backend = be;
            var base = new base_request_options_1.BaseRequestOptions();
            sampleRequest = new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ url: 'https://google.com' })));
        }));
        testing_internal_1.afterEach(function () { existingXHRs = []; });
        testing_internal_1.describe('creating a connection', function () {
            var NoopXsrfStrategy = (function () {
                function NoopXsrfStrategy() {
                }
                NoopXsrfStrategy.prototype.configureRequest = function (req) { };
                /** @nocollapse */
                NoopXsrfStrategy.decorators = [
                    { type: core_1.Injectable },
                ];
                return NoopXsrfStrategy;
            }());
            testing_internal_1.beforeEachProviders(function () { return [{ provide: interfaces_1.XSRFStrategy, useClass: NoopXsrfStrategy }]; });
            testing_internal_1.it('succeeds', function () { testing_internal_1.expect(function () { return backend.createConnection(sampleRequest); }).not.toThrow(); });
        });
        var getDOM = platform_browser_1.__platform_browser_private__.getDOM;
        if (getDOM().supportsCookies()) {
            testing_internal_1.describe('XSRF support', function () {
                testing_internal_1.it('sets an XSRF header by default', function () {
                    getDOM().setCookie('XSRF-TOKEN', 'magic XSRF value');
                    backend.createConnection(sampleRequest);
                    testing_internal_1.expect(sampleRequest.headers.get('X-XSRF-TOKEN')).toBe('magic XSRF value');
                });
                testing_internal_1.it('respects existing headers', function () {
                    getDOM().setCookie('XSRF-TOKEN', 'magic XSRF value');
                    sampleRequest.headers.set('X-XSRF-TOKEN', 'already set');
                    backend.createConnection(sampleRequest);
                    testing_internal_1.expect(sampleRequest.headers.get('X-XSRF-TOKEN')).toBe('already set');
                });
                testing_internal_1.describe('configuration', function () {
                    testing_internal_1.beforeEachProviders(function () { return [{
                            provide: interfaces_1.XSRFStrategy,
                            useValue: new xhr_backend_1.CookieXSRFStrategy('my cookie', 'X-MY-HEADER')
                        }]; });
                    testing_internal_1.it('uses the configured names', function () {
                        getDOM().setCookie('my cookie', 'XSRF value');
                        backend.createConnection(sampleRequest);
                        testing_internal_1.expect(sampleRequest.headers.get('X-MY-HEADER')).toBe('XSRF value');
                    });
                });
            });
        }
        testing_internal_1.describe('XHRConnection', function () {
            testing_internal_1.it('should use the injected BaseResponseOptions to create the response', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ type: enums_1.ResponseType.Error }));
                connection.response.subscribe(function (res) {
                    testing_internal_1.expect(res.type).toBe(enums_1.ResponseType.Error);
                    async.done();
                });
                existingXHRs[0].setStatusCode(200);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should complete a request', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ type: enums_1.ResponseType.Error }));
                connection.response.subscribe(function (res) { testing_internal_1.expect(res.type).toBe(enums_1.ResponseType.Error); }, null, function () { async.done(); });
                existingXHRs[0].setStatusCode(200);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should call abort when disposed', function () {
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR());
                var request = connection.response.subscribe();
                request.unsubscribe();
                testing_internal_1.expect(abortSpy).toHaveBeenCalled();
            });
            testing_internal_1.it('should create an error Response on error', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ type: enums_1.ResponseType.Error }));
                connection.response.subscribe(null, function (res) {
                    testing_internal_1.expect(res.type).toBe(enums_1.ResponseType.Error);
                    async.done();
                });
                existingXHRs[0].dispatchEvent('error');
            }));
            testing_internal_1.it('should set the status text and status code on error', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ type: enums_1.ResponseType.Error }));
                connection.response.subscribe(null, function (res) {
                    testing_internal_1.expect(res.type).toBe(enums_1.ResponseType.Error);
                    testing_internal_1.expect(res.status).toEqual(0);
                    testing_internal_1.expect(res.statusText).toEqual('');
                    async.done();
                });
                var xhr = existingXHRs[0];
                // status=0 with a text='' is common for CORS errors
                xhr.setStatusCode(0);
                xhr.setStatusText('');
                xhr.dispatchEvent('error');
            }));
            testing_internal_1.it('should call open with method and url when subscribed to', function () {
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR());
                testing_internal_1.expect(openSpy).not.toHaveBeenCalled();
                connection.response.subscribe();
                testing_internal_1.expect(openSpy).toHaveBeenCalledWith('GET', sampleRequest.url);
            });
            testing_internal_1.it('should call send on the backend with request body when subscribed to', function () {
                var body = 'Some body to love';
                var base = new base_request_options_1.BaseRequestOptions();
                var connection = new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ body: body }))), new MockBrowserXHR());
                testing_internal_1.expect(sendSpy).not.toHaveBeenCalled();
                connection.response.subscribe();
                testing_internal_1.expect(sendSpy).toHaveBeenCalledWith(body);
            });
            testing_internal_1.it('should attach headers to the request', function () {
                var headers = new headers_1.Headers({ 'Content-Type': 'text/xml', 'Breaking-Bad': '<3', 'X-Multi': ['a', 'b'] });
                var base = new base_request_options_1.BaseRequestOptions();
                var connection = new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ headers: headers }))), new MockBrowserXHR());
                connection.response.subscribe();
                testing_internal_1.expect(setRequestHeaderSpy).toHaveBeenCalledWith('Content-Type', 'text/xml');
                testing_internal_1.expect(setRequestHeaderSpy).toHaveBeenCalledWith('Breaking-Bad', '<3');
                testing_internal_1.expect(setRequestHeaderSpy).toHaveBeenCalledWith('X-Multi', 'a,b');
            });
            testing_internal_1.it('should skip content type detection if custom content type header is set', function () {
                var headers = new headers_1.Headers({ 'Content-Type': 'text/plain' });
                var body = { test: 'val' };
                var base = new base_request_options_1.BaseRequestOptions();
                var connection = new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ body: body, headers: headers }))), new MockBrowserXHR());
                connection.response.subscribe();
                testing_internal_1.expect(setRequestHeaderSpy).toHaveBeenCalledWith('Content-Type', 'text/plain');
                testing_internal_1.expect(setRequestHeaderSpy).not.toHaveBeenCalledWith('Content-Type', 'application/json');
            });
            testing_internal_1.it('should use object body and detect content type header to the request', function () {
                var body = { test: 'val' };
                var base = new base_request_options_1.BaseRequestOptions();
                var connection = new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ body: body }))), new MockBrowserXHR());
                connection.response.subscribe();
                testing_internal_1.expect(sendSpy).toHaveBeenCalledWith(lang_1.Json.stringify(body));
                testing_internal_1.expect(setRequestHeaderSpy).toHaveBeenCalledWith('Content-Type', 'application/json');
            });
            testing_internal_1.it('should use number body and detect content type header to the request', function () {
                var body = 23;
                var base = new base_request_options_1.BaseRequestOptions();
                var connection = new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ body: body }))), new MockBrowserXHR());
                connection.response.subscribe();
                testing_internal_1.expect(sendSpy).toHaveBeenCalledWith('23');
                testing_internal_1.expect(setRequestHeaderSpy).toHaveBeenCalledWith('Content-Type', 'text/plain');
            });
            testing_internal_1.it('should use string body and detect content type header to the request', function () {
                var body = 'some string';
                var base = new base_request_options_1.BaseRequestOptions();
                var connection = new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ body: body }))), new MockBrowserXHR());
                connection.response.subscribe();
                testing_internal_1.expect(sendSpy).toHaveBeenCalledWith(body);
                testing_internal_1.expect(setRequestHeaderSpy).toHaveBeenCalledWith('Content-Type', 'text/plain');
            });
            testing_internal_1.it('should use URLSearchParams body and detect content type header to the request', function () {
                var body = new url_search_params_1.URLSearchParams();
                body.set('test1', 'val1');
                body.set('test2', 'val2');
                var base = new base_request_options_1.BaseRequestOptions();
                var connection = new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ body: body }))), new MockBrowserXHR());
                connection.response.subscribe();
                testing_internal_1.expect(sendSpy).toHaveBeenCalledWith('test1=val1&test2=val2');
                testing_internal_1.expect(setRequestHeaderSpy)
                    .toHaveBeenCalledWith('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
            });
            if (global['Blob']) {
                testing_internal_1.it('should use FormData body and detect content type header to the request', function () {
                    var body = new FormData();
                    body.append('test1', 'val1');
                    body.append('test2', 123456);
                    var blob = new Blob(['body { color: red; }'], { type: 'text/css' });
                    body.append('userfile', blob);
                    var base = new base_request_options_1.BaseRequestOptions();
                    var connection = new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ body: body }))), new MockBrowserXHR());
                    connection.response.subscribe();
                    testing_internal_1.expect(sendSpy).toHaveBeenCalledWith(body);
                    testing_internal_1.expect(setRequestHeaderSpy).not.toHaveBeenCalledWith();
                });
                testing_internal_1.it('should use blob body and detect content type header to the request', function () {
                    var body = new Blob(['body { color: red; }'], { type: 'text/css' });
                    var base = new base_request_options_1.BaseRequestOptions();
                    var connection = new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ body: body }))), new MockBrowserXHR());
                    connection.response.subscribe();
                    testing_internal_1.expect(sendSpy).toHaveBeenCalledWith(body);
                    testing_internal_1.expect(setRequestHeaderSpy).toHaveBeenCalledWith('Content-Type', 'text/css');
                });
                testing_internal_1.it('should use blob body without type to the request', function () {
                    var body = new Blob(['body { color: red; }']);
                    var base = new base_request_options_1.BaseRequestOptions();
                    var connection = new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ body: body }))), new MockBrowserXHR());
                    connection.response.subscribe();
                    testing_internal_1.expect(sendSpy).toHaveBeenCalledWith(body);
                    testing_internal_1.expect(setRequestHeaderSpy).not.toHaveBeenCalledWith();
                });
                testing_internal_1.it('should use blob body without type with custom content type header to the request', function () {
                    var headers = new headers_1.Headers({ 'Content-Type': 'text/css' });
                    var body = new Blob(['body { color: red; }']);
                    var base = new base_request_options_1.BaseRequestOptions();
                    var connection = new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ body: body, headers: headers }))), new MockBrowserXHR());
                    connection.response.subscribe();
                    testing_internal_1.expect(sendSpy).toHaveBeenCalledWith(body);
                    testing_internal_1.expect(setRequestHeaderSpy).toHaveBeenCalledWith('Content-Type', 'text/css');
                });
                testing_internal_1.it('should use array buffer body to the request', function () {
                    var body = new ArrayBuffer(512);
                    var longInt8View = new Uint8Array(body);
                    for (var i = 0; i < longInt8View.length; i++) {
                        longInt8View[i] = i % 255;
                    }
                    var base = new base_request_options_1.BaseRequestOptions();
                    var connection = new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ body: body }))), new MockBrowserXHR());
                    connection.response.subscribe();
                    testing_internal_1.expect(sendSpy).toHaveBeenCalledWith(body);
                    testing_internal_1.expect(setRequestHeaderSpy).not.toHaveBeenCalledWith();
                });
                testing_internal_1.it('should use array buffer body without type with custom content type header to the request', function () {
                    var headers = new headers_1.Headers({ 'Content-Type': 'text/css' });
                    var body = new ArrayBuffer(512);
                    var longInt8View = new Uint8Array(body);
                    for (var i = 0; i < longInt8View.length; i++) {
                        longInt8View[i] = i % 255;
                    }
                    var base = new base_request_options_1.BaseRequestOptions();
                    var connection = new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ body: body, headers: headers }))), new MockBrowserXHR());
                    connection.response.subscribe();
                    testing_internal_1.expect(sendSpy).toHaveBeenCalledWith(body);
                    testing_internal_1.expect(setRequestHeaderSpy).toHaveBeenCalledWith('Content-Type', 'text/css');
                });
            }
            testing_internal_1.it('should return the correct status code', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var statusCode = 418;
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ status: statusCode }));
                connection.response.subscribe(function (res) {
                }, function (errRes) {
                    testing_internal_1.expect(errRes.status).toBe(statusCode);
                    async.done();
                });
                existingXHRs[0].setStatusCode(statusCode);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should call next and complete on 200 codes', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var nextCalled = false;
                var errorCalled = false;
                var statusCode = 200;
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ status: statusCode }));
                connection.response.subscribe(function (res) {
                    nextCalled = true;
                    testing_internal_1.expect(res.status).toBe(statusCode);
                }, function (errRes) { errorCalled = true; }, function () {
                    testing_internal_1.expect(nextCalled).toBe(true);
                    testing_internal_1.expect(errorCalled).toBe(false);
                    async.done();
                });
                existingXHRs[0].setStatusCode(statusCode);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should set ok to true on 200 return', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var statusCode = 200;
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ status: statusCode }));
                connection.response.subscribe(function (res) {
                    testing_internal_1.expect(res.ok).toBe(true);
                    async.done();
                });
                existingXHRs[0].setStatusCode(statusCode);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should set ok to false on 300 return', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var statusCode = 300;
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ status: statusCode }));
                connection.response.subscribe(function (res) { throw 'should not be called'; }, function (errRes) {
                    testing_internal_1.expect(errRes.ok).toBe(false);
                    async.done();
                });
                existingXHRs[0].setStatusCode(statusCode);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should call error and not complete on 300+ codes', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var nextCalled = false;
                var errorCalled = false;
                var statusCode = 301;
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ status: statusCode }));
                connection.response.subscribe(function (res) { nextCalled = true; }, function (errRes) {
                    testing_internal_1.expect(errRes.status).toBe(statusCode);
                    testing_internal_1.expect(nextCalled).toBe(false);
                    async.done();
                }, function () { throw 'should not be called'; });
                existingXHRs[0].setStatusCode(statusCode);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should normalize IE\'s 1223 status code into 204', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var statusCode = 1223;
                var normalizedCode = 204;
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ status: statusCode }));
                connection.response.subscribe(function (res) {
                    testing_internal_1.expect(res.status).toBe(normalizedCode);
                    async.done();
                });
                existingXHRs[0].setStatusCode(statusCode);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should normalize responseText and response', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var responseBody = 'Doge';
                var connection1 = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions());
                var connection2 = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions());
                connection1.response.subscribe(function (res) {
                    testing_internal_1.expect(res.text()).toBe(responseBody);
                    connection2.response.subscribe(function (ress) {
                        testing_internal_1.expect(ress.text()).toBe(responseBody);
                        async.done();
                    });
                    existingXHRs[1].setStatusCode(200);
                    existingXHRs[1].setResponse(responseBody);
                    existingXHRs[1].dispatchEvent('load');
                });
                existingXHRs[0].setStatusCode(200);
                existingXHRs[0].setResponseText(responseBody);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should strip XSSI prefixes', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var conn = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions());
                conn.response.subscribe(function (res) {
                    testing_internal_1.expect(res.text()).toBe('{json: "object"}');
                    async.done();
                });
                existingXHRs[0].setStatusCode(200);
                existingXHRs[0].setResponseText(')]}\'\n{json: "object"}');
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should strip XSSI prefixes', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var conn = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions());
                conn.response.subscribe(function (res) {
                    testing_internal_1.expect(res.text()).toBe('{json: "object"}');
                    async.done();
                });
                existingXHRs[0].setStatusCode(200);
                existingXHRs[0].setResponseText(')]}\',\n{json: "object"}');
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should strip XSSI prefix from errors', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var conn = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions());
                conn.response.subscribe(null, function (res) {
                    testing_internal_1.expect(res.text()).toBe('{json: "object"}');
                    async.done();
                });
                existingXHRs[0].setStatusCode(404);
                existingXHRs[0].setResponseText(')]}\'\n{json: "object"}');
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should parse response headers and add them to the response', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var statusCode = 200;
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ status: statusCode }));
                var responseHeaderString = "Date: Fri, 20 Nov 2015 01:45:26 GMT\n               Content-Type: application/json; charset=utf-8\n               Transfer-Encoding: chunked\n               Connection: keep-alive";
                connection.response.subscribe(function (res) {
                    testing_internal_1.expect(res.headers.get('Date')).toEqual('Fri, 20 Nov 2015 01:45:26 GMT');
                    testing_internal_1.expect(res.headers.get('Content-Type')).toEqual('application/json; charset=utf-8');
                    testing_internal_1.expect(res.headers.get('Transfer-Encoding')).toEqual('chunked');
                    testing_internal_1.expect(res.headers.get('Connection')).toEqual('keep-alive');
                    async.done();
                });
                existingXHRs[0].setResponseHeaders(responseHeaderString);
                existingXHRs[0].setStatusCode(statusCode);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should add the responseURL to the response', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var statusCode = 200;
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ status: statusCode }));
                connection.response.subscribe(function (res) {
                    testing_internal_1.expect(res.url).toEqual('http://google.com');
                    async.done();
                });
                existingXHRs[0].setResponseURL('http://google.com');
                existingXHRs[0].setStatusCode(statusCode);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should add use the X-Request-URL in CORS situations', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var statusCode = 200;
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR(), new base_response_options_1.ResponseOptions({ status: statusCode }));
                var responseHeaders = "X-Request-URL: http://somedomain.com\n           Foo: Bar";
                connection.response.subscribe(function (res) {
                    testing_internal_1.expect(res.url).toEqual('http://somedomain.com');
                    async.done();
                });
                existingXHRs[0].setResponseHeaders(responseHeaders);
                existingXHRs[0].setStatusCode(statusCode);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should set the status text property from the XMLHttpRequest instance if present', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var statusText = 'test';
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR());
                connection.response.subscribe(function (res) {
                    testing_internal_1.expect(res.statusText).toBe(statusText);
                    async.done();
                });
                existingXHRs[0].setStatusText(statusText);
                existingXHRs[0].setStatusCode(200);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should set status text to "OK" if it is not present in XMLHttpRequest instance', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, new MockBrowserXHR());
                connection.response.subscribe(function (res) {
                    testing_internal_1.expect(res.statusText).toBe('OK');
                    async.done();
                });
                existingXHRs[0].setStatusCode(200);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should set withCredentials to true when defined in request options for CORS situations', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var statusCode = 200;
                sampleRequest.withCredentials = true;
                var mockXhr = new MockBrowserXHR();
                var connection = new xhr_backend_1.XHRConnection(sampleRequest, mockXhr, new base_response_options_1.ResponseOptions({ status: statusCode }));
                var responseHeaders = "X-Request-URL: http://somedomain.com\n           Foo: Bar";
                connection.response.subscribe(function (res) {
                    testing_internal_1.expect(res.url).toEqual('http://somedomain.com');
                    testing_internal_1.expect(existingXHRs[0].withCredentials).toBeTruthy();
                    async.done();
                });
                existingXHRs[0].setResponseHeaders(responseHeaders);
                existingXHRs[0].setStatusCode(statusCode);
                existingXHRs[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should set the responseType attribute to blob when the corresponding response content type is present', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var statusCode = 200;
                var base = new base_request_options_1.BaseRequestOptions();
                var connection = new xhr_backend_1.XHRConnection(new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ responseType: enums_1.ResponseContentType.Blob }))), new MockBrowserXHR());
                connection.response.subscribe(function (res) {
                    testing_internal_1.expect(existingXHRs[0].responseType).toBe('blob');
                    async.done();
                });
                existingXHRs[0].setStatusCode(statusCode);
                existingXHRs[0].dispatchEvent('load');
            }));
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyX2JhY2tlbmRfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvaHR0cC90ZXN0L2JhY2tlbmRzL3hocl9iYWNrZW5kX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsaUNBQTRJLHdDQUF3QyxDQUFDLENBQUE7QUFDckwsNEJBQXlCLGdDQUFnQyxDQUFDLENBQUE7QUFDMUQscUJBQW1CLHVCQUF1QixDQUFDLENBQUE7QUFDM0MsMkJBQTJCLHNCQUFzQixDQUFDLENBQUE7QUFDbEQsNEJBQTRELGdDQUFnQyxDQUFDLENBQUE7QUFDN0YscUJBQTBCLGVBQWUsQ0FBQyxDQUFBO0FBQzFDLGlDQUEyQywyQkFBMkIsQ0FBQyxDQUFBO0FBQ3ZFLCtCQUFzQiwwQkFBMEIsQ0FBQyxDQUFBO0FBRWpELHdCQUFzQixtQkFBbUIsQ0FBQyxDQUFBO0FBQzFDLDJCQUFrQiw2QkFBNkIsQ0FBQyxDQUFBO0FBQ2hELHFDQUFpRCxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ2xGLHNDQUFtRCxpQ0FBaUMsQ0FBQyxDQUFBO0FBQ3JGLHNCQUFnRCxpQkFBaUIsQ0FBQyxDQUFBO0FBQ2xFLGtDQUE4Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBRTVELElBQUksUUFBYSxDQUFDO0FBQ2xCLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksT0FBWSxDQUFDO0FBQ2pCLElBQUksbUJBQXdCLENBQUM7QUFDN0IsSUFBSSxtQkFBd0IsQ0FBQztBQUM3QixJQUFJLFlBQVksR0FBcUIsRUFBRSxDQUFDO0FBQ3hDLElBQUksTUFBZ0IsQ0FBQztBQUVyQjtJQUE2QixrQ0FBVTtJQWVyQztRQUNFLGlCQUFPLENBQUM7UUFSVixjQUFTLEdBQUcsSUFBSSxnQkFBRyxFQUFvQixDQUFDO1FBU3RDLElBQUksR0FBRyxHQUFHLElBQUksNEJBQVMsRUFBRSxDQUFDO1FBQzFCLElBQUks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