/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var default_iterable_differ_1 = require('@angular/core/src/change_detection/differs/default_iterable_differ');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var collection_1 = require('../../../src/facade/collection');
var lang_1 = require('../../../src/facade/lang');
var iterable_1 = require('../../change_detection/iterable');
var util_1 = require('../../change_detection/util');
var ItemWithId = (function () {
    function ItemWithId(id) {
        this.id = id;
    }
    ItemWithId.prototype.toString = function () { return "{id: " + this.id + "}"; };
    return ItemWithId;
}());
var ComplexItem = (function () {
    function ComplexItem(id, color) {
        this.id = id;
        this.color = color;
    }
    ComplexItem.prototype.toString = function () { return "{id: " + this.id + ", color: " + this.color + "}"; };
    return ComplexItem;
}());
// todo(vicb): UnmodifiableListView / frozen object when implemented
function main() {
    testing_internal_1.describe('iterable differ', function () {
        testing_internal_1.describe('DefaultIterableDiffer', function () {
            var differ;
            testing_internal_1.beforeEach(function () { differ = new default_iterable_differ_1.DefaultIterableDiffer(); });
            testing_internal_1.it('should support list and iterables', function () {
                var f = new default_iterable_differ_1.DefaultIterableDifferFactory();
                testing_internal_1.expect(f.supports([])).toBeTruthy();
                testing_internal_1.expect(f.supports(new iterable_1.TestIterable())).toBeTruthy();
                testing_internal_1.expect(f.supports(new Map())).toBeFalsy();
                testing_internal_1.expect(f.supports(null)).toBeFalsy();
            });
            testing_internal_1.it('should support iterables', function () {
                var l = new iterable_1.TestIterable();
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({ collection: [] }));
                l.list = [1];
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['1[null->0]'],
                    additions: ['1[null->0]']
                }));
                l.list = [2, 1];
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['2[null->0]', '1[0->1]'],
                    previous: ['1[0->1]'],
                    additions: ['2[null->0]'],
                    moves: ['1[0->1]']
                }));
            });
            testing_internal_1.it('should detect additions', function () {
                var l = [];
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({ collection: [] }));
                l.push('a');
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['a[null->0]'],
                    additions: ['a[null->0]']
                }));
                l.push('b');
                differ.check(l);
                testing_internal_1.expect(differ.toString())
                    .toEqual(util_1.iterableChangesAsString({ collection: ['a', 'b[null->1]'], previous: ['a'], additions: ['b[null->1]'] }));
            });
            testing_internal_1.it('should support changing the reference', function () {
                var l = [0];
                differ.check(l);
                l = [1, 0];
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['1[null->0]', '0[0->1]'],
                    previous: ['0[0->1]'],
                    additions: ['1[null->0]'],
                    moves: ['0[0->1]']
                }));
                l = [2, 1, 0];
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['2[null->0]', '1[0->1]', '0[1->2]'],
                    previous: ['1[0->1]', '0[1->2]'],
                    additions: ['2[null->0]'],
                    moves: ['1[0->1]', '0[1->2]']
                }));
            });
            testing_internal_1.it('should handle swapping element', function () {
                var l = [1, 2];
                differ.check(l);
                collection_1.ListWrapper.clear(l);
                l.push(2);
                l.push(1);
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['2[1->0]', '1[0->1]'],
                    previous: ['1[0->1]', '2[1->0]'],
                    moves: ['2[1->0]', '1[0->1]']
                }));
            });
            testing_internal_1.it('should handle incremental swapping element', function () {
                var l = ['a', 'b', 'c'];
                differ.check(l);
                collection_1.ListWrapper.removeAt(l, 1);
                collection_1.ListWrapper.insert(l, 0, 'b');
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['b[1->0]', 'a[0->1]', 'c'],
                    previous: ['a[0->1]', 'b[1->0]', 'c'],
                    moves: ['b[1->0]', 'a[0->1]']
                }));
                collection_1.ListWrapper.removeAt(l, 1);
                l.push('a');
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['b', 'c[2->1]', 'a[1->2]'],
                    previous: ['b', 'a[1->2]', 'c[2->1]'],
                    moves: ['c[2->1]', 'a[1->2]']
                }));
            });
            testing_internal_1.it('should detect changes in list', function () {
                var l = [];
                differ.check(l);
                l.push('a');
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['a[null->0]'],
                    additions: ['a[null->0]']
                }));
                l.push('b');
                differ.check(l);
                testing_internal_1.expect(differ.toString())
                    .toEqual(util_1.iterableChangesAsString({ collection: ['a', 'b[null->1]'], previous: ['a'], additions: ['b[null->1]'] }));
                l.push('c');
                l.push('d');
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['a', 'b', 'c[null->2]', 'd[null->3]'],
                    previous: ['a', 'b'],
                    additions: ['c[null->2]', 'd[null->3]']
                }));
                collection_1.ListWrapper.removeAt(l, 2);
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['a', 'b', 'd[3->2]'],
                    previous: ['a', 'b', 'c[2->null]', 'd[3->2]'],
                    moves: ['d[3->2]'],
                    removals: ['c[2->null]']
                }));
                collection_1.ListWrapper.clear(l);
                l.push('d');
                l.push('c');
                l.push('b');
                l.push('a');
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['d[2->0]', 'c[null->1]', 'b[1->2]', 'a[0->3]'],
                    previous: ['a[0->3]', 'b[1->2]', 'd[2->0]'],
                    additions: ['c[null->1]'],
                    moves: ['d[2->0]', 'b[1->2]', 'a[0->3]']
                }));
            });
            testing_internal_1.it('should test string by value rather than by reference (Dart)', function () {
                var l = ['a', 'boo'];
                differ.check(l);
                var b = 'b';
                var oo = 'oo';
                l[1] = b + oo;
                differ.check(l);
                testing_internal_1.expect(differ.toString())
                    .toEqual(util_1.iterableChangesAsString({ collection: ['a', 'boo'], previous: ['a', 'boo'] }));
            });
            testing_internal_1.it('should ignore [NaN] != [NaN] (JS)', function () {
                var l = [lang_1.NumberWrapper.NaN];
                differ.check(l);
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: [lang_1.NumberWrapper.NaN],
                    previous: [lang_1.NumberWrapper.NaN]
                }));
            });
            testing_internal_1.it('should detect [NaN] moves', function () {
                var l = [lang_1.NumberWrapper.NaN, lang_1.NumberWrapper.NaN];
                differ.check(l);
                collection_1.ListWrapper.insert(l, 0, 'foo');
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['foo[null->0]', 'NaN[0->1]', 'NaN[1->2]'],
                    previous: ['NaN[0->1]', 'NaN[1->2]'],
                    additions: ['foo[null->0]'],
                    moves: ['NaN[0->1]', 'NaN[1->2]']
                }));
            });
            testing_internal_1.it('should remove and add same item', function () {
                var l = ['a', 'b', 'c'];
                differ.check(l);
                collection_1.ListWrapper.removeAt(l, 1);
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['a', 'c[2->1]'],
                    previous: ['a', 'b[1->null]', 'c[2->1]'],
                    moves: ['c[2->1]'],
                    removals: ['b[1->null]']
                }));
                collection_1.ListWrapper.insert(l, 1, 'b');
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['a', 'b[null->1]', 'c[1->2]'],
                    previous: ['a', 'c[1->2]'],
                    additions: ['b[null->1]'],
                    moves: ['c[1->2]']
                }));
            });
            testing_internal_1.it('should support duplicates', function () {
                var l = ['a', 'a', 'a', 'b', 'b'];
                differ.check(l);
                collection_1.ListWrapper.removeAt(l, 0);
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['a', 'a', 'b[3->2]', 'b[4->3]'],
                    previous: ['a', 'a', 'a[2->null]', 'b[3->2]', 'b[4->3]'],
                    moves: ['b[3->2]', 'b[4->3]'],
                    removals: ['a[2->null]']
                }));
            });
            testing_internal_1.it('should support insertions/moves', function () {
                var l = ['a', 'a', 'b', 'b'];
                differ.check(l);
                collection_1.ListWrapper.insert(l, 0, 'b');
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['b[2->0]', 'a[0->1]', 'a[1->2]', 'b', 'b[null->4]'],
                    previous: ['a[0->1]', 'a[1->2]', 'b[2->0]', 'b'],
                    additions: ['b[null->4]'],
                    moves: ['b[2->0]', 'a[0->1]', 'a[1->2]']
                }));
            });
            testing_internal_1.it('should not report unnecessary moves', function () {
                var l = ['a', 'b', 'c'];
                differ.check(l);
                collection_1.ListWrapper.clear(l);
                l.push('b');
                l.push('a');
                l.push('c');
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['b[1->0]', 'a[0->1]', 'c'],
                    previous: ['a[0->1]', 'b[1->0]', 'c'],
                    moves: ['b[1->0]', 'a[0->1]']
                }));
            });
            testing_internal_1.describe('diff', function () {
                testing_internal_1.it('should return self when there is a change', function () {
                    testing_internal_1.expect(differ.diff(['a', 'b'])).toBe(differ);
                });
                testing_internal_1.it('should return null when there is no change', function () {
                    differ.diff(['a', 'b']);
                    testing_internal_1.expect(differ.diff(['a', 'b'])).toEqual(null);
                });
                testing_internal_1.it('should treat null as an empty list', function () {
                    differ.diff(['a', 'b']);
                    testing_internal_1.expect(differ.diff(null).toString()).toEqual(util_1.iterableChangesAsString({
                        previous: ['a[0->null]', 'b[1->null]'],
                        removals: ['a[0->null]', 'b[1->null]']
                    }));
                });
                testing_internal_1.it('should throw when given an invalid collection', function () {
                    testing_internal_1.expect(function () { return differ.diff('invalid'); }).toThrowError('Error trying to diff \'invalid\'');
                });
            });
        });
        testing_internal_1.describe('trackBy function by id', function () {
            var differ;
            var trackByItemId = function (index, item) { return item.id; };
            var buildItemList = function (list) { return list.map(function (val) { return new ItemWithId(val); }); };
            testing_internal_1.beforeEach(function () { differ = new default_iterable_differ_1.DefaultIterableDiffer(trackByItemId); });
            testing_internal_1.it('should treat the collection as dirty if identity changes', function () {
                differ.diff(buildItemList(['a']));
                testing_internal_1.expect(differ.diff(buildItemList(['a']))).toBe(differ);
            });
            testing_internal_1.it('should treat seen records as identity changes, not additions', function () {
                var l = buildItemList(['a', 'b', 'c']);
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ["{id: a}[null->0]", "{id: b}[null->1]", "{id: c}[null->2]"],
                    additions: ["{id: a}[null->0]", "{id: b}[null->1]", "{id: c}[null->2]"]
                }));
                l = buildItemList(['a', 'b', 'c']);
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ["{id: a}", "{id: b}", "{id: c}"],
                    identityChanges: ["{id: a}", "{id: b}", "{id: c}"],
                    previous: ["{id: a}", "{id: b}", "{id: c}"]
                }));
            });
            testing_internal_1.it('should have updated properties in identity change collection', function () {
                var l = [new ComplexItem('a', 'blue'), new ComplexItem('b', 'yellow')];
                differ.check(l);
                l = [new ComplexItem('a', 'orange'), new ComplexItem('b', 'red')];
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ["{id: a, color: orange}", "{id: b, color: red}"],
                    identityChanges: ["{id: a, color: orange}", "{id: b, color: red}"],
                    previous: ["{id: a, color: orange}", "{id: b, color: red}"]
                }));
            });
            testing_internal_1.it('should track moves normally', function () {
                var l = buildItemList(['a', 'b', 'c']);
                differ.check(l);
                l = buildItemList(['b', 'a', 'c']);
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['{id: b}[1->0]', '{id: a}[0->1]', '{id: c}'],
                    identityChanges: ['{id: b}[1->0]', '{id: a}[0->1]', '{id: c}'],
                    previous: ['{id: a}[0->1]', '{id: b}[1->0]', '{id: c}'],
                    moves: ['{id: b}[1->0]', '{id: a}[0->1]']
                }));
            });
            testing_internal_1.it('should track duplicate reinsertion normally', function () {
                var l = buildItemList(['a', 'a']);
                differ.check(l);
                l = buildItemList(['b', 'a', 'a']);
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['{id: b}[null->0]', '{id: a}[0->1]', '{id: a}[1->2]'],
                    identityChanges: ['{id: a}[0->1]', '{id: a}[1->2]'],
                    previous: ['{id: a}[0->1]', '{id: a}[1->2]'],
                    moves: ['{id: a}[0->1]', '{id: a}[1->2]'],
                    additions: ['{id: b}[null->0]']
                }));
            });
            testing_internal_1.it('should track removals normally', function () {
                var l = buildItemList(['a', 'b', 'c']);
                differ.check(l);
                collection_1.ListWrapper.removeAt(l, 2);
                differ.check(l);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['{id: a}', '{id: b}'],
                    previous: ['{id: a}', '{id: b}', '{id: c}[2->null]'],
                    removals: ['{id: c}[2->null]']
                }));
            });
        });
        testing_internal_1.describe('trackBy function by index', function () {
            var differ;
            var trackByIndex = function (index, item) { return index; };
            testing_internal_1.beforeEach(function () { differ = new default_iterable_differ_1.DefaultIterableDiffer(trackByIndex); });
            testing_internal_1.it('should track removals normally', function () {
                differ.check(['a', 'b', 'c', 'd']);
                differ.check(['e', 'f', 'g', 'h']);
                differ.check(['e', 'f', 'h']);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.iterableChangesAsString({
                    collection: ['e', 'f', 'h'],
                    previous: ['e', 'f', 'h', 'h[3->null]'],
                    removals: ['h[3->null]'],
                    identityChanges: ['h']
                }));
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdF9pdGVyYWJsZV9kaWZmZXJfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L2NoYW5nZV9kZXRlY3Rpb24vZGlmZmVycy9kZWZhdWx0X2l0ZXJhYmxlX2RpZmZlcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx3Q0FBa0Usb0VBQW9FLENBQUMsQ0FBQTtBQUN2SSxpQ0FBK0Usd0NBQXdDLENBQUMsQ0FBQTtBQUV4SCwyQkFBMEIsZ0NBQWdDLENBQUMsQ0FBQTtBQUMzRCxxQkFBNEIsMEJBQTBCLENBQUMsQ0FBQTtBQUN2RCx5QkFBMkIsaUNBQWlDLENBQUMsQ0FBQTtBQUM3RCxxQkFBc0MsNkJBQTZCLENBQUMsQ0FBQTtBQUVwRTtJQUNFLG9CQUFvQixFQUFVO1FBQVYsT0FBRSxHQUFGLEVBQUUsQ0FBUTtJQUFHLENBQUM7SUFFbEMsNkJBQVEsR0FBUixjQUFhLE1BQU0sQ0FBQyxVQUFRLElBQUksQ0FBQyxFQUFFLE1BQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0MsaUJBQUM7QUFBRCxDQUFDLEFBSkQsSUFJQztBQUVEO0lBQ0UscUJBQW9CLEVBQVUsRUFBVSxLQUFhO1FBQWpDLE9BQUUsR0FBRixFQUFFLENBQVE7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQUcsQ0FBQztJQUV6RCw4QkFBUSxHQUFSLGNBQWEsTUFBTSxDQUFDLFVBQVEsSUFBSSxDQUFDLEVBQUUsaUJBQVksSUFBSSxDQUFDLEtBQUssTUFBRyxDQUFDLENBQUMsQ0FBQztJQUNqRSxrQkFBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBRUQsb0VBQW9FO0FBQ3BFO0lBQ0UsMkJBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQiwyQkFBUSxDQUFDLHVCQUF1QixFQUFFO1lBQ2hDLElBQUksTUFBVyxDQUFtQjtZQUVsQyw2QkFBVSxDQUFD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