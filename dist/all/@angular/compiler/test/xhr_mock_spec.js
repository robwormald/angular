/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var xhr_mock_1 = require('@angular/compiler/testing/xhr_mock');
var async_1 = require('../src/facade/async');
var lang_1 = require('../src/facade/lang');
function main() {
    testing_internal_1.describe('MockXHR', function () {
        var xhr;
        testing_internal_1.beforeEach(function () { xhr = new xhr_mock_1.MockXHR(); });
        function expectResponse(request, url, response, done) {
            if (done === void 0) { done = null; }
            function onResponse(text) {
                if (response === null) {
                    throw "Unexpected response " + url + " -> " + text;
                }
                else {
                    testing_internal_1.expect(text).toEqual(response);
                    if (lang_1.isPresent(done))
                        done();
                }
                return text;
            }
            function onError(error) {
                if (response !== null) {
                    throw "Unexpected error " + url;
                }
                else {
                    testing_internal_1.expect(error).toEqual("Failed to load " + url);
                    if (lang_1.isPresent(done))
                        done();
                }
                return error;
            }
            async_1.PromiseWrapper.then(request, onResponse, onError);
        }
        testing_internal_1.it('should return a response from the definitions', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var url = '/foo';
            var response = 'bar';
            xhr.when(url, response);
            expectResponse(xhr.get(url), url, response, function () { return async.done(); });
            xhr.flush();
        }));
        testing_internal_1.it('should return an error from the definitions', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var url = '/foo';
            var response = null;
            xhr.when(url, response);
            expectResponse(xhr.get(url), url, response, function () { return async.done(); });
            xhr.flush();
        }));
        testing_internal_1.it('should return a response from the expectations', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var url = '/foo';
            var response = 'bar';
            xhr.expect(url, response);
            expectResponse(xhr.get(url), url, response, function () { return async.done(); });
            xhr.flush();
        }));
        testing_internal_1.it('should return an error from the expectations', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var url = '/foo';
            var response = null;
            xhr.expect(url, response);
            expectResponse(xhr.get(url), url, response, function () { return async.done(); });
            xhr.flush();
        }));
        testing_internal_1.it('should not reuse expectations', function () {
            var url = '/foo';
            var response = 'bar';
            xhr.expect(url, response);
            xhr.get(url);
            xhr.get(url);
            testing_internal_1.expect(function () { xhr.flush(); }).toThrowError('Unexpected request /foo');
        });
        testing_internal_1.it('should return expectations before definitions', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var url = '/foo';
            xhr.when(url, 'when');
            xhr.expect(url, 'expect');
            expectResponse(xhr.get(url), url, 'expect');
            expectResponse(xhr.get(url), url, 'when', function () { return async.done(); });
            xhr.flush();
        }));
        testing_internal_1.it('should throw when there is no definitions or expectations', function () {
            xhr.get('/foo');
            testing_internal_1.expect(function () { xhr.flush(); }).toThrowError('Unexpected request /foo');
        });
        testing_internal_1.it('should throw when flush is called without any pending requests', function () { testing_internal_1.expect(function () { xhr.flush(); }).toThrowError('No pending requests to flush'); });
        testing_internal_1.it('should throw on unsatisfied expectations', function () {
            xhr.expect('/foo', 'bar');
            xhr.when('/bar', 'foo');
            xhr.get('/bar');
            testing_internal_1.expect(function () { xhr.flush(); }).toThrowError('Unsatisfied requests: /foo');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyX21vY2tfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdC94aHJfbW9ja19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBNEYsd0NBQXdDLENBQUMsQ0FBQTtBQUNySSx5QkFBc0Isb0NBQW9DLENBQUMsQ0FBQTtBQUMzRCxzQkFBNkIscUJBQXFCLENBQUMsQ0FBQTtBQUNuRCxxQkFBd0Isb0JBQW9CLENBQUMsQ0FBQTtBQUU3QztJQUNFLDJCQUFRLENBQUMsU0FBUyxFQUFFO1FBQ2xCLElBQUksR0FBWSxDQUFDO1FBRWpCLDZCQUFVLENBQUMsY0FBUSxHQUFHLEdBQUcsSUFBSSxrQkFBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUzQyx3QkFDSSxPQUF3QixFQUFFLEdBQVcsRUFBRSxRQUFnQixFQUFFLElBQXVCO1lBQXZCLG9CQUF1QixHQUF2QixXQUF1QjtZQUNsRixvQkFBb0IsSUFBWTtnQkFDOUIsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLE1BQU0seUJBQXVCLEdBQUcsWUFBTyxJQUFNLENBQUM7Z0JBQ2hELENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04seUJBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQy9CLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzlCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNkLENBQUM7WUFFRCxpQkFBaUIsS0FBYTtnQkFDNUIsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3RCLE1BQU0sc0JBQW9CLEdBQUss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