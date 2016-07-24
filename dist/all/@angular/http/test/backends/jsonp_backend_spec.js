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
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var browser_jsonp_1 = require('../../src/backends/browser_jsonp');
var jsonp_backend_1 = require('../../src/backends/jsonp_backend');
var core_1 = require('@angular/core');
var lang_1 = require('../../src/facade/lang');
var async_1 = require('../../src/facade/async');
var static_request_1 = require('../../src/static_request');
var collection_1 = require('../../src/facade/collection');
var base_request_options_1 = require('../../src/base_request_options');
var base_response_options_1 = require('../../src/base_response_options');
var enums_1 = require('../../src/enums');
var existingScripts = [];
var unused;
var MockBrowserJsonp = (function (_super) {
    __extends(MockBrowserJsonp, _super);
    function MockBrowserJsonp() {
        _super.call(this);
        this.callbacks = new collection_1.Map();
    }
    MockBrowserJsonp.prototype.addEventListener = function (type, cb) { this.callbacks.set(type, cb); };
    MockBrowserJsonp.prototype.removeEventListener = function (type, cb) { this.callbacks.delete(type); };
    MockBrowserJsonp.prototype.dispatchEvent = function (type, argument) {
        if (!lang_1.isPresent(argument)) {
            argument = {};
        }
        var cb = this.callbacks.get(type);
        if (lang_1.isPresent(cb)) {
            cb(argument);
        }
    };
    MockBrowserJsonp.prototype.build = function (url) {
        var script = new MockBrowserJsonp();
        script.src = url;
        existingScripts.push(script);
        return script;
    };
    MockBrowserJsonp.prototype.send = function (node) {
    };
    MockBrowserJsonp.prototype.cleanup = function (node) {
    };
    return MockBrowserJsonp;
}(browser_jsonp_1.BrowserJsonp));
function main() {
    testing_internal_1.describe('JSONPBackend', function () {
        var backend;
        var sampleRequest;
        testing_internal_1.beforeEach(function () {
            var injector = core_1.ReflectiveInjector.resolveAndCreate([
                { provide: base_response_options_1.ResponseOptions, useClass: base_response_options_1.BaseResponseOptions },
                { provide: browser_jsonp_1.BrowserJsonp, useClass: MockBrowserJsonp },
                { provide: jsonp_backend_1.JSONPBackend, useClass: jsonp_backend_1.JSONPBackend_ }
            ]);
            backend = injector.get(jsonp_backend_1.JSONPBackend);
            var base = new base_request_options_1.BaseRequestOptions();
            sampleRequest = new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ url: 'https://google.com' })));
        });
        testing_internal_1.afterEach(function () { existingScripts = []; });
        testing_internal_1.it('should create a connection', function () {
            var instance;
            matchers_1.expect(function () { return instance = backend.createConnection(sampleRequest); }).not.toThrow();
            matchers_1.expect(instance).toBeAnInstanceOf(jsonp_backend_1.JSONPConnection);
        });
        testing_internal_1.describe('JSONPConnection', function () {
            testing_internal_1.it('should use the injected BaseResponseOptions to create the response', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var connection = new jsonp_backend_1.JSONPConnection_(sampleRequest, new MockBrowserJsonp(), new base_response_options_1.ResponseOptions({ type: enums_1.ResponseType.Error }));
                connection.response.subscribe(function (res) {
                    matchers_1.expect(res.type).toBe(enums_1.ResponseType.Error);
                    async.done();
                });
                connection.finished();
                existingScripts[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should ignore load/callback when disposed', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var connection = new jsonp_backend_1.JSONPConnection_(sampleRequest, new MockBrowserJsonp());
                var spy = new testing_internal_1.SpyObject();
                var loadSpy = spy.spy('load');
                var errorSpy = spy.spy('error');
                var returnSpy = spy.spy('cancelled');
                var request = connection.response.subscribe(loadSpy, errorSpy, returnSpy);
                request.unsubscribe();
                connection.finished('Fake data');
                existingScripts[0].dispatchEvent('load');
                async_1.TimerWrapper.setTimeout(function () {
                    matchers_1.expect(connection.readyState).toBe(enums_1.ReadyState.Cancelled);
                    matchers_1.expect(loadSpy).not.toHaveBeenCalled();
                    matchers_1.expect(errorSpy).not.toHaveBeenCalled();
                    matchers_1.expect(returnSpy).not.toHaveBeenCalled();
                    async.done();
                }, 10);
            }));
            testing_internal_1.it('should report error if loaded without invoking callback', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var connection = new jsonp_backend_1.JSONPConnection_(sampleRequest, new MockBrowserJsonp());
                connection.response.subscribe(function (res) {
                    matchers_1.expect('response listener called').toBe(false);
                    async.done();
                }, function (err) {
                    matchers_1.expect(err.text()).toEqual('JSONP injected script did not invoke callback.');
                    async.done();
                });
                existingScripts[0].dispatchEvent('load');
            }));
            testing_internal_1.it('should report error if script contains error', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var connection = new jsonp_backend_1.JSONPConnection_(sampleRequest, new MockBrowserJsonp());
                connection.response.subscribe(function (res) {
                    matchers_1.expect('response listener called').toBe(false);
                    async.done();
                }, function (err) {
                    matchers_1.expect(err.text()).toBe('Oops!');
                    async.done();
                });
                existingScripts[0].dispatchEvent('error', ({ message: 'Oops!' }));
            }));
            testing_internal_1.it('should throw if request method is not GET', function () {
                [enums_1.RequestMethod.Post, enums_1.RequestMethod.Put, enums_1.RequestMethod.Delete, enums_1.RequestMethod.Options,
                    enums_1.RequestMethod.Head, enums_1.RequestMethod.Patch]
                    .forEach(function (method) {
                    var base = new base_request_options_1.BaseRequestOptions();
                    var req = new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ url: 'https://google.com', method: method })));
                    matchers_1.expect(function () { return new jsonp_backend_1.JSONPConnection_(req, new MockBrowserJsonp()).response.subscribe(); })
                        .toThrowError();
                });
            });
            testing_internal_1.it('should respond with data passed to callback', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var connection = new jsonp_backend_1.JSONPConnection_(sampleRequest, new MockBrowserJsonp());
                connection.response.subscribe(function (res) {
                    matchers_1.expect(res.json()).toEqual(({ fake_payload: true, blob_id: 12345 }));
                    async.done();
                });
                connection.finished(({ fake_payload: true, blob_id: 12345 }));
                existingScripts[0].dispatchEvent('load');
            }));
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnBfYmFja2VuZF9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9odHRwL3Rlc3QvYmFja2VuZHMvanNvbnBfYmFja2VuZF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILGlDQUErRyx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3hKLHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ2xFLDhCQUEyQixrQ0FBa0MsQ0FBQyxDQUFBO0FBQzlELDhCQUE2RSxrQ0FBa0MsQ0FBQyxDQUFBO0FBQ2hILHFCQUFpQyxlQUFlLENBQUMsQ0FBQTtBQUNqRCxxQkFBeUIsdUJBQXVCLENBQUMsQ0FBQTtBQUNqRCxzQkFBMkIsd0JBQXdCLENBQUMsQ0FBQTtBQUNwRCwrQkFBc0IsMEJBQTBCLENBQUMsQ0FBQTtBQUVqRCwyQkFBa0IsNkJBQTZCLENBQUMsQ0FBQTtBQUNoRCxxQ0FBaUQsZ0NBQWdDLENBQUMsQ0FBQTtBQUNsRixzQ0FBbUQsaUNBQWlDLENBQUMsQ0FBQTtBQUNyRixzQkFBc0QsaUJBQWlCLENBQUMsQ0FBQTtBQUV4RSxJQUFJLGVBQWUsR0FBdUIsRUFBRSxDQUFDO0FBQzdDLElBQUksTUFBZ0IsQ0FBQztBQUVyQjtJQUErQixvQ0FBWTtJQUd6QztRQUFnQixpQkFBTyxDQUFDO1FBRHhCLGNBQVMsR0FBRyxJQUFJLGdCQUFHLEVBQThCLENBQUM7SUFDekIsQ0FBQztJQUUxQiwyQ0FBZ0IsR0FBaEIsVUFBaUIsSUFBWSxFQUFFLEVBQXNCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV4Riw4Q0FBbUIsR0FBbkIsVUFBb0IsSUFBWSxFQUFFLEVBQVksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFD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