/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var shared_1 = require('../src/shared');
var url_tree_1 = require('../src/url_tree');
describe('url serializer', function () {
    var url = new url_tree_1.DefaultUrlSerializer();
    it('should parse the root url', function () {
        var tree = url.parse('/');
        expectSegment(tree.root, '');
        expect(url.serialize(tree)).toEqual('/');
    });
    it('should parse non-empty urls', function () {
        var tree = url.parse('one/two');
        expectSegment(tree.root.children[shared_1.PRIMARY_OUTLET], 'one/two');
        expect(url.serialize(tree)).toEqual('/one/two');
    });
    it('should parse multiple secondary segments', function () {
        var tree = url.parse('/one/two(left:three//right:four)');
        expectSegment(tree.root.children[shared_1.PRIMARY_OUTLET], 'one/two');
        expectSegment(tree.root.children['left'], 'three');
        expectSegment(tree.root.children['right'], 'four');
        expect(url.serialize(tree)).toEqual('/one/two(left:three//right:four)');
    });
    it('should parse top-level nodes with only secondary segment', function () {
        var tree = url.parse('/(left:one)');
        expect(tree.root.numberOfChildren).toEqual(1);
        expectSegment(tree.root.children['left'], 'one');
        expect(url.serialize(tree)).toEqual('/(left:one)');
    });
    it('should parse nodes with only secondary segment', function () {
        var tree = url.parse('/one/(left:two)');
        var one = tree.root.children[shared_1.PRIMARY_OUTLET];
        expectSegment(one, 'one', true);
        expect(one.numberOfChildren).toEqual(1);
        expectSegment(one.children['left'], 'two');
        expect(url.serialize(tree)).toEqual('/one/(left:two)');
    });
    it('should not parse empty path segments with params', function () {
        expect(function () { return url.parse('/one/two/(;a=1//right:;b=2)'); })
            .toThrowError(/Empty path url segment cannot have parameters/);
    });
    it('should parse scoped secondary segments', function () {
        var tree = url.parse('/one/(two//left:three)');
        var primary = tree.root.children[shared_1.PRIMARY_OUTLET];
        expectSegment(primary, 'one', true);
        expectSegment(primary.children[shared_1.PRIMARY_OUTLET], 'two');
        expectSegment(primary.children['left'], 'three');
        expect(url.serialize(tree)).toEqual('/one/(two//left:three)');
    });
    it('should parse scoped secondary segments with unscoped ones', function () {
        var tree = url.parse('/one/(two//left:three)(right:four)');
        var primary = tree.root.children[shared_1.PRIMARY_OUTLET];
        expectSegment(primary, 'one', true);
        expectSegment(primary.children[shared_1.PRIMARY_OUTLET], 'two');
        expectSegment(primary.children['left'], 'three');
        expectSegment(tree.root.children['right'], 'four');
        expect(url.serialize(tree)).toEqual('/one/(two//left:three)(right:four)');
    });
    it('should parse secondary segments that have children', function () {
        var tree = url.parse('/one(left:two/three)');
        expectSegment(tree.root.children[shared_1.PRIMARY_OUTLET], 'one');
        expectSegment(tree.root.children['left'], 'two/three');
        expect(url.serialize(tree)).toEqual('/one(left:two/three)');
    });
    it('should parse an empty secondary segment group', function () {
        var tree = url.parse('/one()');
        expectSegment(tree.root.children[shared_1.PRIMARY_OUTLET], 'one');
        expect(url.serialize(tree)).toEqual('/one');
    });
    it('should parse key-value matrix params', function () {
        var tree = url.parse('/one;a=11a;b=11b(left:two;c=22//right:three;d=33)');
        expectSegment(tree.root.children[shared_1.PRIMARY_OUTLET], 'one;a=11a;b=11b');
        expectSegment(tree.root.children['left'], 'two;c=22');
        expectSegment(tree.root.children['right'], 'three;d=33');
        expect(url.serialize(tree)).toEqual('/one;a=11a;b=11b(left:two;c=22//right:three;d=33)');
    });
    it('should parse key only matrix params', function () {
        var tree = url.parse('/one;a');
        expectSegment(tree.root.children[shared_1.PRIMARY_OUTLET], 'one;a=true');
        expect(url.serialize(tree)).toEqual('/one;a=true');
    });
    it('should parse query params (root)', function () {
        var tree = url.parse('/?a=1&b=2');
        expect(tree.root.children).toEqual({});
        expect(tree.queryParams).toEqual({ a: '1', b: '2' });
        expect(url.serialize(tree)).toEqual('/?a=1&b=2');
    });
    it('should parse query params', function () {
        var tree = url.parse('/one?a=1&b=2');
        expect(tree.queryParams).toEqual({ a: '1', b: '2' });
    });
    it('should parse query params when with parenthesis', function () {
        var tree = url.parse('/one?a=(11)&b=(22)');
        expect(tree.queryParams).toEqual({ a: '(11)', b: '(22)' });
    });
    it('should parse query params when with slashes', function () {
        var tree = url.parse('/one?a=1/2&b=3/4');
        expect(tree.queryParams).toEqual({ a: '1/2', b: '3/4' });
    });
    it('should parse key only query params', function () {
        var tree = url.parse('/one?a');
        expect(tree.queryParams).toEqual({ a: 'true' });
    });
    it('should serializer query params', function () {
        var tree = url.parse('/one?a');
        expect(url.serialize(tree)).toEqual('/one?a=true');
    });
    it('should parse fragment', function () {
        var tree = url.parse('/one#two');
        expect(tree.fragment).toEqual('two');
        expect(url.serialize(tree)).toEqual('/one#two');
    });
    it('should parse fragment (root)', function () {
        var tree = url.parse('/#one');
        expectSegment(tree.root, '');
        expect(url.serialize(tree)).toEqual('/#one');
    });
    it('should parse empty fragment', function () {
        var tree = url.parse('/one#');
        expect(tree.fragment).toEqual('');
        expect(url.serialize(tree)).toEqual('/one#');
    });
    describe('encoding/decoding', function () {
        it('should encode/decode path segments and parameters', function () {
            var u = "/" + encodeURIComponent("one two") + ";" + encodeURIComponent("p 1") + "=" + encodeURIComponent("v 1") + ";" + encodeURIComponent("p 2") + "=" + encodeURIComponent("v 2");
            var tree = url.parse(u);
            expect(tree.root.children[shared_1.PRIMARY_OUTLET].pathsWithParams[0].path).toEqual('one two');
            expect(tree.root.children[shared_1.PRIMARY_OUTLET].pathsWithParams[0].parameters)
                .toEqual((_a = {}, _a['p 1'] = 'v 1', _a['p 2'] = 'v 2', _a));
            expect(url.serialize(tree)).toEqual(u);
            var _a;
        });
        it('should encode/decode query params', function () {
            var u = "/one?" + encodeURIComponent("p 1") + "=" + encodeURIComponent("v 1") + "&" + encodeURIComponent("p 2") + "=" + encodeURIComponent("v 2");
            var tree = url.parse(u);
            expect(tree.queryParams).toEqual((_a = {}, _a['p 1'] = 'v 1', _a['p 2'] = 'v 2', _a));
            expect(url.serialize(tree)).toEqual(u);
            var _a;
        });
        it('should encode/decode fragment', function () {
            var u = "/one#" + encodeURIComponent("one two");
            var tree = url.parse(u);
            expect(tree.fragment).toEqual('one two');
            expect(url.serialize(tree)).toEqual(u);
        });
    });
    describe('error handling', function () {
        it('should throw when invalid characters inside children', function () {
            expect(function () { return url.parse('/one/(left#one)'); })
                .toThrowError('Cannot parse url \'/one/(left#one)\'');
        });
        it('should throw when missing closing )', function () {
            expect(function () { return url.parse('/one/(left'); }).toThrowError('Cannot parse url \'/one/(left\'');
        });
    });
});
function expectSegment(segment, expected, hasChildren) {
    if (hasChildren === void 0) { hasChildren = false; }
    if (segment.pathsWithParams.filter(function (s) { return s.path === ''; }).length > 0) {
        throw new Error("UrlPathWithParams cannot be empty " + segment.pathsWithParams);
    }
    var p = segment.pathsWithParams.map(function (p) { return url_tree_1.serializePath(p); }).join('/');
    expect(p).toEqual(expected);
    expect(Object.keys(segment.children).length > 0).toEqual(hasChildren);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3NlcmlhbGl6ZXIuc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyL3Rlc3QvdXJsX3NlcmlhbGl6ZXIuc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUJBQTZCLGVBQWUsQ0FBQyxDQUFBO0FBQzdDLHlCQUE4RCxpQkFBaUIsQ0FBQyxDQUFBO0FBRWhGLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtJQUN6QixJQUFNLEdBQUcsR0FBRyxJQUFJLCtCQUFvQixFQUFFLENBQUM7SUFFdkMsRUFBRSxDQUFDLDJCQUEyQixFQUFFO1FBQzlCLElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDNUIsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDN0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0MsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsNkJBQTZCLEVBQUU7UUFDaEMsSUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsdUJBQWMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzdELE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2xELENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLDBDQUEwQyxFQUFFO1FBQzdDLElBQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUUzRCxh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