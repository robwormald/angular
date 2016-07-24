/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var url_parser_1 = require('../src/url_parser');
function main() {
    testing_internal_1.describe('ParsedUrl', function () {
        var urlParser;
        testing_internal_1.beforeEach(function () { urlParser = new url_parser_1.UrlParser(); });
        testing_internal_1.it('should work in a simple case', function () {
            var url = urlParser.parse('hello/there');
            testing_internal_1.expect(url.toString()).toEqual('hello/there');
        });
        testing_internal_1.it('should remove the leading slash', function () {
            var url = urlParser.parse('/hello/there');
            testing_internal_1.expect(url.toString()).toEqual('hello/there');
        });
        testing_internal_1.it('should parse an empty URL', function () {
            var url = urlParser.parse('');
            testing_internal_1.expect(url.toString()).toEqual('');
        });
        testing_internal_1.it('should work with a single aux route', function () {
            var url = urlParser.parse('hello/there(a)');
            testing_internal_1.expect(url.toString()).toEqual('hello/there(a)');
        });
        testing_internal_1.it('should work with multiple aux routes', function () {
            var url = urlParser.parse('hello/there(a//b)');
            testing_internal_1.expect(url.toString()).toEqual('hello/there(a//b)');
        });
        testing_internal_1.it('should work with children after an aux route', function () {
            var url = urlParser.parse('hello/there(a//b)/c/d');
            testing_internal_1.expect(url.toString()).toEqual('hello/there(a//b)/c/d');
        });
        testing_internal_1.it('should work when aux routes have children', function () {
            var url = urlParser.parse('hello(aa/bb//bb/cc)');
            testing_internal_1.expect(url.toString()).toEqual('hello(aa/bb//bb/cc)');
        });
        testing_internal_1.it('should parse an aux route with an aux route', function () {
            var url = urlParser.parse('hello(aa(bb))');
            testing_internal_1.expect(url.toString()).toEqual('hello(aa(bb))');
        });
        testing_internal_1.it('should simplify an empty aux route definition', function () {
            var url = urlParser.parse('hello()/there');
            testing_internal_1.expect(url.toString()).toEqual('hello/there');
        });
        testing_internal_1.it('should parse a key-value matrix param', function () {
            var url = urlParser.parse('hello/friend;name=bob');
            testing_internal_1.expect(url.toString()).toEqual('hello/friend;name=bob');
        });
        testing_internal_1.it('should parse multiple key-value matrix params', function () {
            var url = urlParser.parse('hello/there;greeting=hi;whats=up');
            testing_internal_1.expect(url.toString()).toEqual('hello/there;greeting=hi;whats=up');
        });
        testing_internal_1.it('should ignore matrix params on the first segment', function () {
            var url = urlParser.parse('profile;a=1/hi');
            testing_internal_1.expect(url.toString()).toEqual('profile/hi');
        });
        testing_internal_1.it('should parse a key-only matrix param', function () {
            var url = urlParser.parse('hello/there;hi');
            testing_internal_1.expect(url.toString()).toEqual('hello/there;hi');
        });
        testing_internal_1.it('should parse a URL with just a query param', function () {
            var url = urlParser.parse('?name=bob');
            testing_internal_1.expect(url.toString()).toEqual('?name=bob');
        });
        testing_internal_1.it('should parse a key-value query param', function () {
            var url = urlParser.parse('hello/friend?name=bob');
            testing_internal_1.expect(url.toString()).toEqual('hello/friend?name=bob');
        });
        testing_internal_1.it('should parse multiple key-value query params', function () {
            var url = urlParser.parse('hello/there?greeting=hi&whats=up');
            testing_internal_1.expect(url.params).toEqual({ 'greeting': 'hi', 'whats': 'up' });
            testing_internal_1.expect(url.toString()).toEqual('hello/there?greeting=hi&whats=up');
        });
        testing_internal_1.it('should parse a key-only query param', function () {
            var url = urlParser.parse('hello/there?hi');
            testing_internal_1.expect(url.toString()).toEqual('hello/there?hi');
        });
        testing_internal_1.it('should parse a route with matrix and query params', function () {
            var url = urlParser.parse('hello/there;sort=asc;unfiltered?hi&friend=true');
            testing_internal_1.expect(url.toString()).toEqual('hello/there;sort=asc;unfiltered?hi&friend=true');
        });
        testing_internal_1.it('should parse a route with matrix params and aux routes', function () {
            var url = urlParser.parse('hello/there;sort=asc(modal)');
            testing_internal_1.expect(url.toString()).toEqual('hello/there;sort=asc(modal)');
        });
        testing_internal_1.it('should parse an aux route with matrix params', function () {
            var url = urlParser.parse('hello/there(modal;sort=asc)');
            testing_internal_1.expect(url.toString()).toEqual('hello/there(modal;sort=asc)');
        });
        testing_internal_1.it('should parse a route with matrix params, aux routes, and query params', function () {
            var url = urlParser.parse('hello/there;sort=asc(modal)?friend=true');
            testing_internal_1.expect(url.toString()).toEqual('hello/there;sort=asc(modal)?friend=true');
        });
        testing_internal_1.it('should allow slashes within query parameters', function () {
            var url = urlParser.parse('hello?code=4/B8o0n_Y7XZTb-pVKBw5daZyGAUbMljyLf7uNgTy6ja8&scope=https://www.googleapis.com/auth/analytics');
            testing_internal_1.expect(url.toString())
                .toEqual('hello?code=4/B8o0n_Y7XZTb-pVKBw5daZyGAUbMljyLf7uNgTy6ja8&scope=https://www.googleapis.com/auth/analytics');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3BhcnNlcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9yb3V0ZXItZGVwcmVjYXRlZC90ZXN0L3VybF9wYXJzZXJfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQXdFLHdDQUF3QyxDQUFDLENBQUE7QUFFakgsMkJBQTZCLG1CQUFtQixDQUFDLENBQUE7QUFHakQ7SUFDRSwyQkFBUSxDQUFDLFdBQVcsRUFBRTtRQUNwQixJQUFJLFNBQW9CLENBQUM7UUFFekIsNkJBQVUsQ0FBQyxjQUFRLFNBQVMsR0FBRyxJQUFJLHNCQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5ELHFCQUFFLENBQUMsOEJBQThCLEVBQUU7WUFDakMsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN6Qyx5QkFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsaUNBQWlDLEVBQUU7WUFDcEMsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUMxQyx5QkFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsMkJBQTJCLEVBQUU7WUFDOUIsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUM5Qix5QkFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FB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