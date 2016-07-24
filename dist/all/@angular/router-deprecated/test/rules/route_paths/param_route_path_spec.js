/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var param_route_path_1 = require('../../../src/rules/route_paths/param_route_path');
var url_parser_1 = require('../../../src/url_parser');
function main() {
    testing_internal_1.describe('PathRecognizer', function () {
        testing_internal_1.it('should throw when given an invalid path', function () {
            testing_internal_1.expect(function () { return new param_route_path_1.ParamRoutePath('/hi#'); })
                .toThrowError("Path \"/hi#\" should not include \"#\". Use \"HashLocationStrategy\" instead.");
            testing_internal_1.expect(function () { return new param_route_path_1.ParamRoutePath('hi?'); })
                .toThrowError("Path \"hi?\" contains \"?\" which is not allowed in a route config.");
            testing_internal_1.expect(function () { return new param_route_path_1.ParamRoutePath('hi;'); })
                .toThrowError("Path \"hi;\" contains \";\" which is not allowed in a route config.");
            testing_internal_1.expect(function () { return new param_route_path_1.ParamRoutePath('hi='); })
                .toThrowError("Path \"hi=\" contains \"=\" which is not allowed in a route config.");
            testing_internal_1.expect(function () { return new param_route_path_1.ParamRoutePath('hi('); })
                .toThrowError("Path \"hi(\" contains \"(\" which is not allowed in a route config.");
            testing_internal_1.expect(function () { return new param_route_path_1.ParamRoutePath('hi)'); })
                .toThrowError("Path \"hi)\" contains \")\" which is not allowed in a route config.");
            testing_internal_1.expect(function () { return new param_route_path_1.ParamRoutePath('hi//there'); })
                .toThrowError("Path \"hi//there\" contains \"//\" which is not allowed in a route config.");
        });
        testing_internal_1.describe('querystring params', function () {
            testing_internal_1.it('should parse querystring params so long as the recognizer is a root', function () {
                var rec = new param_route_path_1.ParamRoutePath('/hello/there');
                var url = url_parser_1.parser.parse('/hello/there?name=igor');
                var match = rec.matchUrl(url);
                testing_internal_1.expect(match.allParams).toEqual({ 'name': 'igor' });
            });
            testing_internal_1.it('should return a combined map of parameters with the param expected in the URL path', function () {
                var rec = new param_route_path_1.ParamRoutePath('/hello/:name');
                var url = url_parser_1.parser.parse('/hello/paul?topic=success');
                var match = rec.matchUrl(url);
                testing_internal_1.expect(match.allParams).toEqual({ 'name': 'paul', 'topic': 'success' });
            });
        });
        testing_internal_1.describe('dynamic segments', function () {
            testing_internal_1.it('should parse parameters', function () {
                var rec = new param_route_path_1.ParamRoutePath('/test/:id');
                var url = new url_parser_1.Url('test', new url_parser_1.Url('abc'));
                var match = rec.matchUrl(url);
                testing_internal_1.expect(match.allParams).toEqual({ 'id': 'abc' });
            });
            testing_internal_1.it('should decode special characters when parsing', function () {
                var rec = new param_route_path_1.ParamRoutePath('/test/:id');
                var url = new url_parser_1.Url('test', new url_parser_1.Url('abc%25%2F%2f%28%29%3B'));
                var match = rec.matchUrl(url);
                testing_internal_1.expect(match.allParams).toEqual({ 'id': 'abc%//();' });
            });
            testing_internal_1.it('should generate url', function () {
                var rec = new param_route_path_1.ParamRoutePath('/test/:id');
                testing_internal_1.expect(rec.generateUrl({ 'id': 'abc' }).urlPath).toEqual('test/abc');
            });
            testing_internal_1.it('should encode special characters when generating', function () {
                var rec = new param_route_path_1.ParamRoutePath('/test/:id');
                testing_internal_1.expect(rec.generateUrl({ 'id': 'abc/def/%();' }).urlPath)
                    .toEqual('test/abc%2Fdef%2F%25%28%29%3B');
            });
        });
        testing_internal_1.describe('matrix params', function () {
            testing_internal_1.it('should be parsed along with dynamic paths', function () {
                var rec = new param_route_path_1.ParamRoutePath('/hello/:id');
                var url = new url_parser_1.Url('hello', new url_parser_1.Url('matias', null, null, { 'key': 'value' }));
                var match = rec.matchUrl(url);
                testing_internal_1.expect(match.allParams).toEqual({ 'id': 'matias', 'key': 'value' });
            });
            testing_internal_1.it('should be parsed on a static path', function () {
                var rec = new param_route_path_1.ParamRoutePath('/person');
                var url = new url_parser_1.Url('person', null, null, { 'name': 'dave' });
                var match = rec.matchUrl(url);
                testing_internal_1.expect(match.allParams).toEqual({ 'name': 'dave' });
            });
            testing_internal_1.it('should be ignored on a wildcard segment', function () {
                var rec = new param_route_path_1.ParamRoutePath('/wild/*everything');
                var url = url_parser_1.parser.parse('/wild/super;variable=value');
                var match = rec.matchUrl(url);
                testing_internal_1.expect(match.allParams).toEqual({ 'everything': 'super;variable=value' });
            });
            testing_internal_1.it('should set matrix param values to true when no value is present', function () {
                var rec = new param_route_path_1.ParamRoutePath('/path');
                var url = new url_parser_1.Url('path', null, null, { 'one': true, 'two': true, 'three': '3' });
                var match = rec.matchUrl(url);
                testing_internal_1.expect(match.allParams).toEqual({ 'one': true, 'two': true, 'three': '3' });
            });
            testing_internal_1.it('should be parsed on the final segment of the path', function () {
                var rec = new param_route_path_1.ParamRoutePath('/one/two/three');
                var three = new url_parser_1.Url('three', null, null, { 'c': '3' });
                var two = new url_parser_1.Url('two', three, null, { 'b': '2' });
                var one = new url_parser_1.Url('one', two, null, { 'a': '1' });
                var match = rec.matchUrl(one);
                testing_internal_1.expect(match.allParams).toEqual({ 'c': '3' });
            });
        });
        testing_internal_1.describe('wildcard segment', function () {
            testing_internal_1.it('should return a url path which matches the original url path', function () {
                var rec = new param_route_path_1.ParamRoutePath('/wild/*everything');
                var url = url_parser_1.parser.parse('/wild/super;variable=value/anotherPartAfterSlash');
                var match = rec.matchUrl(url);
                testing_internal_1.expect(match.urlPath).toEqual('wild/super;variable=value/anotherPartAfterSlash');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW1fcm91dGVfcGF0aF9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9yb3V0ZXItZGVwcmVjYXRlZC90ZXN0L3J1bGVzL3JvdXRlX3BhdGhzL3BhcmFtX3JvdXRlX3BhdGhfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQXdFLHdDQUF3QyxDQUFDLENBQUE7QUFFakgsaUNBQTZCLGlEQUFpRCxDQUFDLENBQUE7QUFDL0UsMkJBQTBCLHlCQUF5QixDQUFDLENBQUE7QUFFcEQ7SUFDRSwyQkFBUSxDQUFDLGdCQUFnQixFQUFFO1FBRXpCLHFCQUFFLENBQUMseUNBQXlDLEVBQUU7WUFDNUMseUJBQU0sQ0FBQyxjQUFNLE9BQUEsSUFBSSxpQ0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUExQixDQUEwQixDQUFDO2lCQUNuQyxZQUFZLENBQUMsK0VBQXlFLENBQUMsQ0FBQztZQUM3Rix5QkFBTSxDQUFDLGNBQU0sT0FBQSxJQUFJLGlDQUFjLENBQUMsS0FBSyxDQUFDLEVBQXpCLENBQXlCLENBQUM7aUJBQ2xDLFlBQVksQ0FBQyxxRUFBaUUsQ0FBQyxDQUFDO1lBQ3JGLHlCQUFNLENBQUMsY0FBTSxPQUFBLElBQUksaUNBQWMsQ0FBQyxLQUFLLENBQUMsRUFBekIsQ0FBeUIsQ0FBQztpQkFDbEMsWUFBWSxDQUFDLHFFQUFpRSxDQUFDLENBQUM7WUFDckYseUJBQU0sQ0FBQyxjQUFNLE9BQUEsSUFBSSxpQ0FBYyxDQUFDLEtBQUssQ0FBQyxFQUF6QixDQUF5QixDQUFDO2lCQUNsQyxZQUFZLENBQUMscUVBQWlFLENBQUMsQ0FBQztZQUNyRix5QkFBTSxDQUFDLGNBQU0sT0FBQSxJQUFJLGlDQUFjLENBQUMsS0FBSyxDQUFDLEVBQXpCLENBQXlCLENBQUM7aUJBQ2xDLFlBQVksQ0FBQyxxRUFBaUUsQ0FBQyxDQUFDO1lBQ3JGLHlC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