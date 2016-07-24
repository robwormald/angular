/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var Observable_1 = require('rxjs/Observable');
var zip_1 = require('rxjs/observable/zip');
var http_1 = require('../http');
var lang_1 = require('../src/facade/lang');
var http_utils_1 = require('../src/http_utils');
var mock_backend_1 = require('../testing/mock_backend');
function main() {
    testing_internal_1.describe('injectables', function () {
        var url = 'http://foo.bar';
        var http;
        var parentInjector;
        var childInjector;
        var jsonpBackend;
        var xhrBackend;
        var jsonp;
        testing_internal_1.it('should allow using jsonpInjectables and httpInjectables in same injector', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            parentInjector = core_1.ReflectiveInjector.resolveAndCreate([
                { provide: http_1.XHRBackend, useClass: mock_backend_1.MockBackend },
                { provide: http_1.JSONPBackend, useClass: mock_backend_1.MockBackend }
            ]);
            childInjector = parentInjector.resolveAndCreateChild([
                http_1.HTTP_PROVIDERS, http_1.JSONP_PROVIDERS, { provide: http_1.XHRBackend, useClass: mock_backend_1.MockBackend },
                { provide: http_1.JSONPBackend, useClass: mock_backend_1.MockBackend }
            ]);
            http = childInjector.get(http_1.Http);
            jsonp = childInjector.get(http_1.Jsonp);
            jsonpBackend = childInjector.get(http_1.JSONPBackend);
            xhrBackend = childInjector.get(http_1.XHRBackend);
            var xhrCreatedConnections = 0;
            var jsonpCreatedConnections = 0;
            xhrBackend.connections.subscribe(function () {
                xhrCreatedConnections++;
                matchers_1.expect(xhrCreatedConnections).toEqual(1);
                if (jsonpCreatedConnections) {
                    async.done();
                }
            });
            http.get(url).subscribe(function () { });
            jsonpBackend.connections.subscribe(function () {
                jsonpCreatedConnections++;
                matchers_1.expect(jsonpCreatedConnections).toEqual(1);
                if (xhrCreatedConnections) {
                    async.done();
                }
            });
            jsonp.request(url).subscribe(function () { });
        }));
    });
    testing_internal_1.describe('http', function () {
        var url = 'http://foo.bar';
        var http;
        var injector;
        var backend;
        var baseResponse;
        var jsonp;
        testing_internal_1.beforeEach(function () {
            injector = core_1.ReflectiveInjector.resolveAndCreate([
                http_1.BaseRequestOptions, mock_backend_1.MockBackend, {
                    provide: http_1.Http,
                    useFactory: function (backend, defaultOptions) {
                        return new http_1.Http(backend, defaultOptions);
                    },
                    deps: [mock_backend_1.MockBackend, http_1.BaseRequestOptions]
                },
                {
                    provide: http_1.Jsonp,
                    useFactory: function (backend, defaultOptions) {
                        return new http_1.Jsonp(backend, defaultOptions);
                    },
                    deps: [mock_backend_1.MockBackend, http_1.BaseRequestOptions]
                }
            ]);
            http = injector.get(http_1.Http);
            jsonp = injector.get(http_1.Jsonp);
            backend = injector.get(mock_backend_1.MockBackend);
            baseResponse = new http_1.Response(new http_1.ResponseOptions({ body: 'base response' }));
        });
        testing_internal_1.afterEach(function () { return backend.verifyNoPendingRequests(); });
        testing_internal_1.describe('Http', function () {
            testing_internal_1.describe('.request()', function () {
                testing_internal_1.it('should return an Observable', function () { matchers_1.expect(http.request(url)).toBeAnInstanceOf(Observable_1.Observable); });
                testing_internal_1.it('should accept a fully-qualified request as its only parameter', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.url).toBe('https://google.com');
                        c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: 'Thank you' })));
                        async.done();
                    });
                    http.request(new http_1.Request(new http_1.RequestOptions({ url: 'https://google.com' })))
                        .subscribe(function (res) { });
                }));
                testing_internal_1.it('should accept a fully-qualified request as its only parameter', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.url).toBe('https://google.com');
                        matchers_1.expect(c.request.method).toBe(http_1.RequestMethod.Post);
                        c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: 'Thank you' })));
                        async.done();
                    });
                    http.request(new http_1.Request(new http_1.RequestOptions({ url: 'https://google.com', method: http_1.RequestMethod.Post })))
                        .subscribe(function (res) { });
                }));
                testing_internal_1.it('should perform a get request for given url if only passed a string', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) { return c.mockRespond(baseResponse); });
                    http.request('http://basic.connection').subscribe(function (res) {
                        matchers_1.expect(res.text()).toBe('base response');
                        async.done();
                    });
                }));
                testing_internal_1.it('should perform a post request for given url if options include a method', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.method).toEqual(http_1.RequestMethod.Post);
                        c.mockRespond(baseResponse);
                    });
                    var requestOptions = new http_1.RequestOptions({ method: http_1.RequestMethod.Post });
                    http.request('http://basic.connection', requestOptions).subscribe(function (res) {
                        matchers_1.expect(res.text()).toBe('base response');
                        async.done();
                    });
                }));
                testing_internal_1.it('should perform a post request for given url if options include a method', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.method).toEqual(http_1.RequestMethod.Post);
                        c.mockRespond(baseResponse);
                    });
                    var requestOptions = { method: http_1.RequestMethod.Post };
                    http.request('http://basic.connection', requestOptions).subscribe(function (res) {
                        matchers_1.expect(res.text()).toBe('base response');
                        async.done();
                    });
                }));
                testing_internal_1.it('should perform a get request and complete the response', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) { return c.mockRespond(baseResponse); });
                    http.request('http://basic.connection')
                        .subscribe(function (res) { matchers_1.expect(res.text()).toBe('base response'); }, null, function () { async.done(); });
                }));
                testing_internal_1.it('should perform multiple get requests and complete the responses', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) { return c.mockRespond(baseResponse); });
                    http.request('http://basic.connection').subscribe(function (res) {
                        matchers_1.expect(res.text()).toBe('base response');
                    });
                    http.request('http://basic.connection')
                        .subscribe(function (res) { matchers_1.expect(res.text()).toBe('base response'); }, null, function () { async.done(); });
                }));
                testing_internal_1.it('should throw if url is not a string or Request', function () {
                    var req = {};
                    matchers_1.expect(function () { return http.request(req); })
                        .toThrowError('First argument must be a url string or Request instance.');
                });
            });
            testing_internal_1.describe('.get()', function () {
                testing_internal_1.it('should perform a get request for given url', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.method).toBe(http_1.RequestMethod.Get);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.get(url).subscribe(function (res) { });
                }));
            });
            testing_internal_1.describe('.post()', function () {
                testing_internal_1.it('should perform a post request for given url', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.method).toBe(http_1.RequestMethod.Post);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.post(url, 'post me').subscribe(function (res) { });
                }));
                testing_internal_1.it('should attach the provided body to the request', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    var body = 'this is my post body';
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.text()).toBe(body);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.post(url, body).subscribe(function (res) { });
                }));
            });
            testing_internal_1.describe('.put()', function () {
                testing_internal_1.it('should perform a put request for given url', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.method).toBe(http_1.RequestMethod.Put);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.put(url, 'put me').subscribe(function (res) { });
                }));
                testing_internal_1.it('should attach the provided body to the request', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    var body = 'this is my put body';
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.text()).toBe(body);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.put(url, body).subscribe(function (res) { });
                }));
            });
            testing_internal_1.describe('.delete()', function () {
                testing_internal_1.it('should perform a delete request for given url', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.method).toBe(http_1.RequestMethod.Delete);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.delete(url).subscribe(function (res) { });
                }));
            });
            testing_internal_1.describe('.patch()', function () {
                testing_internal_1.it('should perform a patch request for given url', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.method).toBe(http_1.RequestMethod.Patch);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.patch(url, 'this is my patch body').subscribe(function (res) { });
                }));
                testing_internal_1.it('should attach the provided body to the request', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    var body = 'this is my patch body';
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.text()).toBe(body);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.patch(url, body).subscribe(function (res) { });
                }));
            });
            testing_internal_1.describe('.head()', function () {
                testing_internal_1.it('should perform a head request for given url', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.method).toBe(http_1.RequestMethod.Head);
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.head(url).subscribe(function (res) { });
                }));
            });
            testing_internal_1.describe('searchParams', function () {
                testing_internal_1.it('should append search params to url', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    var params = new http_1.URLSearchParams();
                    params.append('q', 'puppies');
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.url).toEqual('https://www.google.com?q=puppies');
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.get('https://www.google.com', new http_1.RequestOptions({ search: params }))
                        .subscribe(function (res) { });
                }));
                testing_internal_1.it('should append string search params to url', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.url).toEqual('https://www.google.com?q=piggies');
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.get('https://www.google.com', new http_1.RequestOptions({ search: 'q=piggies' }))
                        .subscribe(function (res) { });
                }));
                testing_internal_1.it('should produce valid url when url already contains a query', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    backend.connections.subscribe(function (c) {
                        matchers_1.expect(c.request.url).toEqual('https://www.google.com?q=angular&as_eq=1.x');
                        backend.resolveAllConnections();
                        async.done();
                    });
                    http.get('https://www.google.com?q=angular', new http_1.RequestOptions({ search: 'as_eq=1.x' }))
                        .subscribe(function (res) { });
                }));
            });
            testing_internal_1.describe('string method names', function () {
                testing_internal_1.it('should allow case insensitive strings for method names', function () {
                    testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                        backend.connections.subscribe(function (c) {
                            matchers_1.expect(c.request.method).toBe(http_1.RequestMethod.Post);
                            c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: 'Thank you' })));
                            async.done();
                        });
                        http.request(new http_1.Request(new http_1.RequestOptions({ url: 'https://google.com', method: 'PosT' })))
                            .subscribe(function (res) { });
                    });
                });
                testing_internal_1.it('should throw when invalid string parameter is passed for method name', function () {
                    matchers_1.expect(function () {
                        http.request(new http_1.Request(new http_1.RequestOptions({ url: 'https://google.com', method: 'Invalid' })));
                    }).toThrowError('Invalid request method. The method "Invalid" is not supported.');
                });
            });
        });
        testing_internal_1.describe('Jsonp', function () {
            testing_internal_1.describe('.request()', function () {
                testing_internal_1.it('should throw if url is not a string or Request', function () {
                    var req = {};
                    matchers_1.expect(function () { return jsonp.request(req); })
                        .toThrowError('First argument must be a url string or Request instance.');
                });
            });
        });
        testing_internal_1.describe('response buffer', function () {
            testing_internal_1.it('should attach the provided buffer to the response', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                backend.connections.subscribe(function (c) {
                    matchers_1.expect(c.request.responseType).toBe(http_1.ResponseContentType.ArrayBuffer);
                    c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: new ArrayBuffer(32) })));
                    async.done();
                });
                http.get('https://www.google.com', new http_1.RequestOptions({ responseType: http_1.ResponseContentType.ArrayBuffer }))
                    .subscribe(function (res) { });
            }));
            testing_internal_1.it('should be able to consume a buffer containing a String as any response type', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                backend.connections.subscribe(function (c) { return c.mockRespond(baseResponse); });
                http.get('https://www.google.com').subscribe(function (res) {
                    matchers_1.expect(res.arrayBuffer()).toBeAnInstanceOf(ArrayBuffer);
                    matchers_1.expect(res.text()).toBe('base response');
                    async.done();
                });
            }));
            testing_internal_1.it('should be able to consume a buffer containing an ArrayBuffer as any response type', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var arrayBuffer = http_utils_1.stringToArrayBuffer('{"response": "ok"}');
                backend.connections.subscribe(function (c) {
                    return c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: arrayBuffer })));
                });
                http.get('https://www.google.com').subscribe(function (res) {
                    matchers_1.expect(res.arrayBuffer()).toBe(arrayBuffer);
                    matchers_1.expect(res.text()).toEqual('{"response": "ok"}');
                    matchers_1.expect(res.json()).toEqual({ response: 'ok' });
                    async.done();
                });
            }));
            testing_internal_1.it('should be able to consume a buffer containing an Object as any response type', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var simpleObject = { 'content': 'ok' };
                backend.connections.subscribe(function (c) {
                    return c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: simpleObject })));
                });
                http.get('https://www.google.com').subscribe(function (res) {
                    matchers_1.expect(res.arrayBuffer()).toBeAnInstanceOf(ArrayBuffer);
                    matchers_1.expect(res.text()).toEqual(lang_1.Json.stringify(simpleObject));
                    matchers_1.expect(res.json()).toBe(simpleObject);
                    async.done();
                });
            }));
            testing_internal_1.it('should preserve encoding of ArrayBuffer response', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var message = 'é@θЂ';
                var arrayBuffer = http_utils_1.stringToArrayBuffer(message);
                backend.connections.subscribe(function (c) {
                    return c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: arrayBuffer })));
                });
                http.get('https://www.google.com').subscribe(function (res) {
                    matchers_1.expect(res.arrayBuffer()).toBeAnInstanceOf(ArrayBuffer);
                    matchers_1.expect(res.text()).toEqual(message);
                    async.done();
                });
            }));
            testing_internal_1.it('should preserve encoding of String response', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var message = 'é@θЂ';
                backend.connections.subscribe(function (c) {
                    return c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: message })));
                });
                http.get('https://www.google.com').subscribe(function (res) {
                    matchers_1.expect(res.arrayBuffer()).toEqual(http_utils_1.stringToArrayBuffer(message));
                    async.done();
                });
            }));
            testing_internal_1.it('should have an equivalent response independently of the buffer used', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var message = { 'param': 'content' };
                backend.connections.subscribe(function (c) {
                    var body = function () {
                        switch (c.request.responseType) {
                            case http_1.ResponseContentType.Text:
                                return lang_1.Json.stringify(message);
                            case http_1.ResponseContentType.Json:
                                return message;
                            case http_1.ResponseContentType.ArrayBuffer:
                                return http_utils_1.stringToArrayBuffer(lang_1.Json.stringify(message));
                        }
                    };
                    c.mockRespond(new http_1.Response(new http_1.ResponseOptions({ body: body() })));
                });
                zip_1.zip(http.get('https://www.google.com', new http_1.RequestOptions({ responseType: http_1.ResponseContentType.Text })), http.get('https://www.google.com', new http_1.RequestOptions({ responseType: http_1.ResponseContentType.Json })), http.get('https://www.google.com', new http_1.RequestOptions({ responseType: http_1.ResponseContentType.ArrayBuffer })))
                    .subscribe(function (res) {
                    matchers_1.expect(res[0].text()).toEqual(res[1].text());
                    matchers_1.expect(res[1].text()).toEqual(res[2].text());
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9odHRwL3Rlc3QvaHR0cF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBMkMsZUFBZSxDQUFDLENBQUE7QUFDM0QsaUNBQW1HLHdDQUF3QyxDQUFDLENBQUE7QUFDNUkseUJBQXFCLDRDQUE0QyxDQUFDLENBQUE7QUFDbEUsMkJBQXlCLGlCQUFpQixDQUFDLENBQUE7QUFDM0Msb0JBQWtCLHFCQUFxQixDQUFDLENBQUE7QUFFeEMscUJBQXFPLFNBQVMsQ0FBQyxDQUFBO0FBQy9PLHFCQUFtQixvQkFBb0IsQ0FBQyxDQUFBO0FBQ3hDLDJCQUFrQyxtQkFBbUIsQ0FBQyxDQUFBO0FBQ3RELDZCQUEwQyx5QkFBeUIsQ0FBQyxDQUFBO0FBRXBFO0lBQ0UsMkJBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDdEIsSUFBSSxHQUFHLEdBQUcsZ0JBQWdCLENBQUM7UUFDM0IsSUFBSSxJQUFVLENBQUM7UUFDZixJQUFJLGNBQWtDLENBQUM7UUFDdkMsSUFBSSxhQUFpQyxDQUFDO1FBQ3RDLElBQUksWUFBeUIsQ0FBQztRQUM5QixJQUFJLFVBQXVCLENBQUM7UUFDNUIsSUFBSSxLQUFZLENBQUM7UUFFakIscUJBQUUsQ0FBQywwRUFBMEUsRUFDMUUseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxjQUFjLEdBQUcseUJBQWtCLENBQUMsZ0JBQWdCLENBQUM7Z0JBQ25ELEVBQUMsT0FBTyxFQUFFLGlCQUFVLEVBQUUsUUFBUSxFQUFFLDBCQUFXLEVBQUM7Z0JBQzVDLEVBQUMsT0FBTyxFQUFFLG1CQUFZLEVBQUUsUUFBUSxFQUFFLDBCQUFXLEVBQUM7YUFDL0MsQ0FBQyxDQUFDO1lBRUgsYUFBYSxHQUFHLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQztnQkFDbkQs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