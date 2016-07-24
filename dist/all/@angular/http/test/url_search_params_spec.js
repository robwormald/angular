/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var url_search_params_1 = require('../src/url_search_params');
function main() {
    testing_internal_1.describe('URLSearchParams', function () {
        testing_internal_1.it('should conform to spec', function () {
            var paramsString = 'q=URLUtils.searchParams&topic=api';
            var searchParams = new url_search_params_1.URLSearchParams(paramsString);
            // Tests borrowed from example at
            // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
            // Compliant with spec described at https://url.spec.whatwg.org/#urlsearchparams
            testing_internal_1.expect(searchParams.has('topic')).toBe(true);
            testing_internal_1.expect(searchParams.has('foo')).toBe(false);
            testing_internal_1.expect(searchParams.get('topic')).toEqual('api');
            testing_internal_1.expect(searchParams.getAll('topic')).toEqual(['api']);
            testing_internal_1.expect(searchParams.get('foo')).toBe(null);
            searchParams.append('topic', 'webdev');
            testing_internal_1.expect(searchParams.getAll('topic')).toEqual(['api', 'webdev']);
            testing_internal_1.expect(searchParams.toString()).toEqual('q=URLUtils.searchParams&topic=api&topic=webdev');
            searchParams.delete('topic');
            testing_internal_1.expect(searchParams.toString()).toEqual('q=URLUtils.searchParams');
            // Test default constructor
            testing_internal_1.expect(new url_search_params_1.URLSearchParams().toString()).toBe('');
        });
        testing_internal_1.it('should optionally accept a custom parser', function () {
            var fooEveryThingParser = {
                encodeKey: function () { return 'I AM KEY'; },
                encodeValue: function () { return 'I AM VALUE'; }
            };
            var params = new url_search_params_1.URLSearchParams('', fooEveryThingParser);
            params.set('myKey', 'myValue');
            testing_internal_1.expect(params.toString()).toBe('I AM KEY=I AM VALUE');
        });
        testing_internal_1.it('should encode special characters in params', function () {
            var searchParams = new url_search_params_1.URLSearchParams();
            searchParams.append('a', '1+1');
            searchParams.append('b c', '2');
            searchParams.append('d%', '3$');
            testing_internal_1.expect(searchParams.toString()).toEqual('a=1+1&b%20c=2&d%25=3$');
        });
        testing_internal_1.it('should not encode allowed characters', function () {
            /*
             * https://tools.ietf.org/html/rfc3986#section-3.4
             * Allowed: ( pchar / "/" / "?" )
             * pchar: unreserved / pct-encoded / sub-delims / ":" / "@"
             * unreserved: ALPHA / DIGIT / "-" / "." / "_" / "~"
             * pct-encoded: "%" HEXDIG HEXDIG
             * sub-delims: "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="
             *
             * & and = are excluded and should be encoded inside keys and values
             * because URLSearchParams is responsible for inserting this.
             **/
            var params = new url_search_params_1.URLSearchParams();
            '! $ \' ( ) * + , ; A 9 - . _ ~ ? /'.split(' ').forEach(function (char, idx) { params.set("a" + idx, char); });
            testing_internal_1.expect(params.toString())
                .toBe("a0=!&a1=$&a2='&a3=(&a4=)&a5=*&a6=+&a7=,&a8=;&a9=A&a10=9&a11=-&a12=.&a13=_&a14=~&a15=?&a16=/"
                .replace(/\s/g, ''));
            // Original example from https://github.com/angular/angular/issues/9348 for posterity
            params = new url_search_params_1.URLSearchParams();
            params.set('q', 'repo:janbaer/howcani+type:issue');
            params.set('sort', 'created');
            params.set('order', 'desc');
            params.set('page', '1');
            testing_internal_1.expect(params.toString())
                .toBe('q=repo:janbaer/howcani+type:issue&sort=created&order=desc&page=1');
        });
        testing_internal_1.it('should support map-like merging operation via setAll()', function () {
            var mapA = new url_search_params_1.URLSearchParams('a=1&a=2&a=3&c=8');
            var mapB = new url_search_params_1.URLSearchParams('a=4&a=5&a=6&b=7');
            mapA.setAll(mapB);
            testing_internal_1.expect(mapA.has('a')).toBe(true);
            testing_internal_1.expect(mapA.has('b')).toBe(true);
            testing_internal_1.expect(mapA.has('c')).toBe(true);
            testing_internal_1.expect(mapA.getAll('a')).toEqual(['4']);
            testing_internal_1.expect(mapA.getAll('b')).toEqual(['7']);
            testing_internal_1.expect(mapA.getAll('c')).toEqual(['8']);
            testing_internal_1.expect(mapA.toString()).toEqual('a=4&c=8&b=7');
        });
        testing_internal_1.it('should support multimap-like merging operation via appendAll()', function () {
            var mapA = new url_search_params_1.URLSearchParams('a=1&a=2&a=3&c=8');
            var mapB = new url_search_params_1.URLSearchParams('a=4&a=5&a=6&b=7');
            mapA.appendAll(mapB);
            testing_internal_1.expect(mapA.has('a')).toBe(true);
            testing_internal_1.expect(mapA.has('b')).toBe(true);
            testing_internal_1.expect(mapA.has('c')).toBe(true);
            testing_internal_1.expect(mapA.getAll('a')).toEqual(['1', '2', '3', '4', '5', '6']);
            testing_internal_1.expect(mapA.getAll('b')).toEqual(['7']);
            testing_internal_1.expect(mapA.getAll('c')).toEqual(['8']);
            testing_internal_1.expect(mapA.toString()).toEqual('a=1&a=2&a=3&a=4&a=5&a=6&c=8&b=7');
        });
        testing_internal_1.it('should support multimap-like merging operation via replaceAll()', function () {
            var mapA = new url_search_params_1.URLSearchParams('a=1&a=2&a=3&c=8');
            var mapB = new url_search_params_1.URLSearchParams('a=4&a=5&a=6&b=7');
            mapA.replaceAll(mapB);
            testing_internal_1.expect(mapA.has('a')).toBe(true);
            testing_internal_1.expect(mapA.has('b')).toBe(true);
            testing_internal_1.expect(mapA.has('c')).toBe(true);
            testing_internal_1.expect(mapA.getAll('a')).toEqual(['4', '5', '6']);
            testing_internal_1.expect(mapA.getAll('b')).toEqual(['7']);
            testing_internal_1.expect(mapA.getAll('c')).toEqual(['8']);
            testing_internal_1.expect(mapA.toString()).toEqual('a=4&a=5&a=6&c=8&b=7');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3NlYXJjaF9wYXJhbXNfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvaHR0cC90ZXN0L3VybF9zZWFyY2hfcGFyYW1zX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUE0RSx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3JILGtDQUE4QiwwQkFBMEIsQ0FBQyxDQUFBO0FBRXpEO0lBQ0UsMkJBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixxQkFBRSxDQUFDLHdCQUF3QixFQUFFO1lBQzNCLElBQUksWUFBWSxHQUFHLG1DQUFtQyxDQUFDO1lBQ3ZELElBQUksWUFBWSxHQUFHLElBQUksbUNBQWUsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUVyRCxpQ0FBaUM7WUFDakMsbUVBQW1FO1lBQ25FLGdGQUFnRjtZQUNoRix5QkFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MseUJBQU0sQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVDLHlCQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNqRCx5QkFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3RELHlCQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQyxZQUFZLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FB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