/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var mock_backend_1 = require('../../testing/mock_backend');
var core_1 = require('@angular/core');
var static_request_1 = require('../../src/static_request');
var static_response_1 = require('../../src/static_response');
var base_request_options_1 = require('../../src/base_request_options');
var base_response_options_1 = require('../../src/base_response_options');
function main() {
    testing_internal_1.describe('MockBackend', function () {
        var backend;
        var sampleRequest1;
        var sampleResponse1;
        var sampleRequest2;
        var sampleResponse2;
        testing_internal_1.beforeEach(function () {
            var injector = core_1.ReflectiveInjector.resolveAndCreate([{ provide: base_response_options_1.ResponseOptions, useClass: base_response_options_1.BaseResponseOptions }, mock_backend_1.MockBackend]);
            backend = injector.get(mock_backend_1.MockBackend);
            var base = new base_request_options_1.BaseRequestOptions();
            sampleRequest1 = new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ url: 'https://google.com' })));
            sampleResponse1 = new static_response_1.Response(new base_response_options_1.ResponseOptions({ body: 'response1' }));
            sampleRequest2 = new static_request_1.Request(base.merge(new base_request_options_1.RequestOptions({ url: 'https://google.com' })));
            sampleResponse2 = new static_response_1.Response(new base_response_options_1.ResponseOptions({ body: 'response2' }));
        });
        testing_internal_1.it('should create a new MockBackend', function () { matchers_1.expect(backend).toBeAnInstanceOf(mock_backend_1.MockBackend); });
        testing_internal_1.it('should create a new MockConnection', function () {
            matchers_1.expect(backend.createConnection(sampleRequest1)).toBeAnInstanceOf(mock_backend_1.MockConnection);
        });
        testing_internal_1.it('should create a new connection and allow subscription', function () {
            var connection = backend.createConnection(sampleRequest1);
            connection.response.subscribe(function () { });
        });
        testing_internal_1.it('should allow responding after subscription', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var connection = backend.createConnection(sampleRequest1);
            connection.response.subscribe(function () { async.done(); });
            connection.mockRespond(sampleResponse1);
        }));
        testing_internal_1.it('should allow subscribing after responding', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var connection = backend.createConnection(sampleRequest1);
            connection.mockRespond(sampleResponse1);
            connection.response.subscribe(function () { async.done(); });
        }));
        testing_internal_1.it('should allow responding after subscription with an error', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var connection = backend.createConnection(sampleRequest1);
            connection.response.subscribe(null, function () { async.done(); });
            connection.mockError(new Error('nope'));
        }));
        testing_internal_1.it('should not throw when there are no unresolved requests', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var connection = backend.createConnection(sampleRequest1);
            connection.response.subscribe(function () { async.done(); });
            connection.mockRespond(sampleResponse1);
            backend.verifyNoPendingRequests();
        }));
        testing_internal_1.xit('should throw when there are unresolved requests', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var connection = backend.createConnection(sampleRequest1);
            connection.response.subscribe(function () { async.done(); });
            backend.verifyNoPendingRequests();
        }));
        testing_internal_1.it('should work when requests are resolved out of order', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var connection1 = backend.createConnection(sampleRequest1);
            var connection2 = backend.createConnection(sampleRequest1);
            connection1.response.subscribe(function () { async.done(); });
            connection2.response.subscribe(function () { });
            connection2.mockRespond(sampleResponse1);
            connection1.mockRespond(sampleResponse1);
            backend.verifyNoPendingRequests();
        }));
        testing_internal_1.xit('should allow double subscribing', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var responses = [sampleResponse1, sampleResponse2];
            backend.connections.subscribe(function (c) { return c.mockRespond(responses.shift()); });
            var responseObservable = backend.createConnection(sampleRequest1).response;
            responseObservable.subscribe(function (res) { return matchers_1.expect(res.text()).toBe('response1'); });
            responseObservable.subscribe(function (res) { return matchers_1.expect(res.text()).toBe('response2'); }, null, async.done);
        }));
        // TODO(robwormald): readyStates are leaving?
        testing_internal_1.it('should allow resolution of requests manually', function () {
            var connection1 = backend.createConnection(sampleRequest1);
            var connection2 = backend.createConnection(sampleRequest1);
            connection1.response.subscribe(function () { });
            connection2.response.subscribe(function () { });
            backend.resolveAllConnections();
            backend.verifyNoPendingRequests();
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9ja19iYWNrZW5kX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2h0dHAvdGVzdC9iYWNrZW5kcy9tb2NrX2JhY2tlbmRfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQW9HLHdDQUF3QyxDQUFDLENBQUE7QUFDN0kseUJBQXFCLDRDQUE0QyxDQUFDLENBQUE7QUFDbEUsNkJBQTBDLDRCQUE0QixDQUFDLENBQUE7QUFDdkUscUJBQWlDLGVBQWUsQ0FBQyxDQUFBO0FBQ2pELCtCQUFzQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQ2pELGdDQUF1QiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ25ELHFDQUFpRCxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ2xGLHNDQUFtRCxpQ0FBaUMsQ0FBQyxDQUFBO0FBR3JGO0lBQ0UsMkJBQVEsQ0FBQyxhQUFhLEVBQUU7UUFFdEIsSUFBSSxPQUFvQixDQUFDO1FBQ3pCLElBQUksY0FBdUIsQ0FBQztRQUM1QixJQUFJLGVBQXlCLENBQUM7UUFDOUIsSUFBSSxjQUF1QixDQUFDO1FBQzVCLElBQUksZUFBeUIsQ0FBQztRQUU5Qiw2QkFBVSxDQUFDO1lBQ1QsSUFBSSxRQUFRLEdBQUcseUJBQWtCLENBQUMsZ0JBQWdCLENBQzlDLENBQUMsRUFBQyxPQUFPLEVBQUUsdUNBQWUsRUFBRSxRQUFRLEVBQUUsMkNBQW1CLEVBQUMsRUFBRSwwQkFBVyxDQUFDLENBQUMsQ0FBQztZQUM5RSxPQUFPLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQywwQkFBVyxDQUFDLENBQUM7WUFDcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSx5Q0FBa0IsRUFBRSxDQUFDO1lBQ3BDLGNBQWMsR0FBRyxJQUFJLHdCQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLHFDQUFjLENBQUMsRUFBQyxHQUFHLEVBQUUsb0JBQW9CLEVBQUMsQ0FB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