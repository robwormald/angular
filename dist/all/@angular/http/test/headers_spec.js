/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var collection_1 = require('../src/facade/collection');
var lang_1 = require('../src/facade/lang');
var headers_1 = require('../src/headers');
function main() {
    testing_internal_1.describe('Headers', function () {
        testing_internal_1.it('should conform to spec', function () {
            // Examples borrowed from https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers
            // Spec at https://fetch.spec.whatwg.org/#dom-headers
            var firstHeaders = new headers_1.Headers(); // Currently empty
            firstHeaders.append('Content-Type', 'image/jpeg');
            testing_internal_1.expect(firstHeaders.get('Content-Type')).toBe('image/jpeg');
            var httpHeaders = collection_1.StringMapWrapper.create();
            collection_1.StringMapWrapper.set(httpHeaders, 'Content-Type', 'image/jpeg');
            collection_1.StringMapWrapper.set(httpHeaders, 'Accept-Charset', 'utf-8');
            collection_1.StringMapWrapper.set(httpHeaders, 'X-My-Custom-Header', 'Zeke are cool');
            var secondHeaders = new headers_1.Headers(httpHeaders);
            var secondHeadersObj = new headers_1.Headers(secondHeaders);
            testing_internal_1.expect(secondHeadersObj.get('Content-Type')).toBe('image/jpeg');
        });
        testing_internal_1.describe('initialization', function () {
            testing_internal_1.it('should merge values in provided dictionary', function () {
                var map = collection_1.StringMapWrapper.create();
                collection_1.StringMapWrapper.set(map, 'foo', 'bar');
                var headers = new headers_1.Headers(map);
                testing_internal_1.expect(headers.get('foo')).toBe('bar');
                testing_internal_1.expect(headers.getAll('foo')).toEqual(['bar']);
            });
        });
        testing_internal_1.describe('.set()', function () {
            testing_internal_1.it('should clear all values and re-set for the provided key', function () {
                var map = collection_1.StringMapWrapper.create();
                collection_1.StringMapWrapper.set(map, 'foo', 'bar');
                var headers = new headers_1.Headers(map);
                testing_internal_1.expect(headers.get('foo')).toBe('bar');
                testing_internal_1.expect(headers.getAll('foo')).toEqual(['bar']);
                headers.set('foo', 'baz');
                testing_internal_1.expect(headers.get('foo')).toBe('baz');
                testing_internal_1.expect(headers.getAll('foo')).toEqual(['baz']);
            });
            testing_internal_1.it('should convert input array to string', function () {
                var headers = new headers_1.Headers();
                var inputArr = ['bar', 'baz'];
                headers.set('foo', inputArr);
                testing_internal_1.expect(/bar, ?baz/g.test(headers.get('foo'))).toBe(true);
                testing_internal_1.expect(/bar, ?baz/g.test(headers.getAll('foo')[0])).toBe(true);
            });
        });
        testing_internal_1.describe('.toJSON()', function () {
            var headers = null;
            var inputArr = null;
            var obj = null;
            testing_internal_1.beforeEach(function () {
                headers = new headers_1.Headers();
                inputArr = ['application/jeisen', 'application/jason', 'application/patrickjs'];
                obj = { 'Accept': inputArr };
                headers.set('Accept', inputArr);
            });
            testing_internal_1.it('should be serializable with toJSON', function () {
                var stringifed = lang_1.Json.stringify(obj);
                var serializedHeaders = lang_1.Json.stringify(headers);
                testing_internal_1.expect(serializedHeaders).toEqual(stringifed);
            });
            testing_internal_1.it('should be able to parse serialized header', function () {
                var stringifed = lang_1.Json.stringify(obj);
                var serializedHeaders = lang_1.Json.stringify(headers);
                testing_internal_1.expect(lang_1.Json.parse(serializedHeaders)).toEqual(lang_1.Json.parse(stringifed));
            });
            testing_internal_1.it('should be able to recreate serializedHeaders', function () {
                var serializedHeaders = lang_1.Json.stringify(headers);
                var parsedHeaders = lang_1.Json.parse(serializedHeaders);
                var recreatedHeaders = new headers_1.Headers(parsedHeaders);
                testing_internal_1.expect(lang_1.Json.stringify(parsedHeaders)).toEqual(lang_1.Json.stringify(recreatedHeaders));
            });
        });
    });
    testing_internal_1.describe('.fromResponseHeaderString()', function () {
        testing_internal_1.it('should parse a response header string', function () {
            var responseHeaderString = "Date: Fri, 20 Nov 2015 01:45:26 GMT\n        Content-Type: application/json; charset=utf-8\n        Transfer-Encoding: chunked\n        Connection: keep-alive";
            var responseHeaders = headers_1.Headers.fromResponseHeaderString(responseHeaderString);
            testing_internal_1.expect(responseHeaders.get('Date')).toEqual('Fri, 20 Nov 2015 01:45:26 GMT');
            testing_internal_1.expect(responseHeaders.get('Content-Type')).toEqual('application/json; charset=utf-8');
            testing_internal_1.expect(responseHeaders.get('Transfer-Encoding')).toEqual('chunked');
            testing_internal_1.expect(responseHeaders.get('Connection')).toEqual('keep-alive');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyc19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9odHRwL3Rlc3QvaGVhZGVyc19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBNEUsd0NBQXdDLENBQUMsQ0FBQTtBQUVySCwyQkFBb0MsMEJBQTBCLENBQUMsQ0FBQTtBQUMvRCxxQkFBbUIsb0JBQW9CLENBQUMsQ0FBQTtBQUN4Qyx3QkFBc0IsZ0JBQWdCLENBQUMsQ0FBQTtBQUV2QztJQUNFLDJCQUFRLENBQUMsU0FBUyxFQUFFO1FBQ2xCLHFCQUFFLENBQUMsd0JBQXdCLEVBQUU7WUFDM0IsMEZBQTBGO1lBQzFGLHFEQUFxRDtZQUNyRCxJQUFJLFlBQVksR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQyxDQUFFLGtCQUFrQjtZQUNyRCxZQUFZLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUNsRCx5QkFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDNUQsSUFBSSxXQUFXLEdBQUcsNkJBQWdCLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDNUMsNkJBQWdCLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDaEUsNkJBQWdCLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUM3RCw2QkFBZ0IsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLG9CQUFvQixFQUFFLGVBQWUsQ0FBQyxDQUFDO1lBQ3pFLElBQUksYUFBYSxHQUFHLElBQUksaUJBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QyxJQUFJLGdCQUFnQixHQUFHLElBQUksaUJBQU8sQ0FBQyxhQUFhLENBQUMs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