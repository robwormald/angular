/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var default_keyvalue_differ_1 = require('@angular/core/src/change_detection/differs/default_keyvalue_differ');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var util_1 = require('../../change_detection/util');
// todo(vicb): Update the code & tests for object equality
function main() {
    testing_internal_1.describe('keyvalue differ', function () {
        testing_internal_1.describe('DefaultKeyValueDiffer', function () {
            var differ;
            var m;
            testing_internal_1.beforeEach(function () {
                differ = new default_keyvalue_differ_1.DefaultKeyValueDiffer();
                m = new Map();
            });
            testing_internal_1.afterEach(function () { differ = null; });
            testing_internal_1.it('should detect additions', function () {
                differ.check(m);
                m.set('a', 1);
                differ.check(m);
                testing_internal_1.expect(differ.toString())
                    .toEqual(util_1.kvChangesAsString({ map: ['a[null->1]'], additions: ['a[null->1]'] }));
                m.set('b', 2);
                differ.check(m);
                testing_internal_1.expect(differ.toString())
                    .toEqual(util_1.kvChangesAsString({ map: ['a', 'b[null->2]'], previous: ['a'], additions: ['b[null->2]'] }));
            });
            testing_internal_1.it('should handle changing key/values correctly', function () {
                m.set(1, 10);
                m.set(2, 20);
                differ.check(m);
                m.set(2, 10);
                m.set(1, 20);
                differ.check(m);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.kvChangesAsString({
                    map: ['1[10->20]', '2[20->10]'],
                    previous: ['1[10->20]', '2[20->10]'],
                    changes: ['1[10->20]', '2[20->10]']
                }));
            });
            testing_internal_1.it('should expose previous and current value', function () {
                var previous /** TODO #9100 */, current;
                m.set(1, 10);
                differ.check(m);
                m.set(1, 20);
                differ.check(m);
                differ.forEachChangedItem(function (record /** TODO #9100 */) {
                    previous = record.previousValue;
                    current = record.currentValue;
                });
                testing_internal_1.expect(previous).toEqual(10);
                testing_internal_1.expect(current).toEqual(20);
            });
            testing_internal_1.it('should do basic map watching', function () {
                differ.check(m);
                m.set('a', 'A');
                differ.check(m);
                testing_internal_1.expect(differ.toString())
                    .toEqual(util_1.kvChangesAsString({ map: ['a[null->A]'], additions: ['a[null->A]'] }));
                m.set('b', 'B');
                differ.check(m);
                testing_internal_1.expect(differ.toString())
                    .toEqual(util_1.kvChangesAsString({ map: ['a', 'b[null->B]'], previous: ['a'], additions: ['b[null->B]'] }));
                m.set('b', 'BB');
                m.set('d', 'D');
                differ.check(m);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.kvChangesAsString({
                    map: ['a', 'b[B->BB]', 'd[null->D]'],
                    previous: ['a', 'b[B->BB]'],
                    additions: ['d[null->D]'],
                    changes: ['b[B->BB]']
                }));
                m.delete('b');
                differ.check(m);
                testing_internal_1.expect(differ.toString())
                    .toEqual(util_1.kvChangesAsString({ map: ['a', 'd'], previous: ['a', 'b[BB->null]', 'd'], removals: ['b[BB->null]'] }));
                m.clear();
                differ.check(m);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.kvChangesAsString({
                    previous: ['a[A->null]', 'd[D->null]'],
                    removals: ['a[A->null]', 'd[D->null]']
                }));
            });
            testing_internal_1.it('should not see a NaN value as a change', function () {
                m.set('foo', Number.NaN);
                differ.check(m);
                differ.check(m);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.kvChangesAsString({ map: ['foo'], previous: ['foo'] }));
            });
            testing_internal_1.it('should work regardless key order', function () {
                m.set('a', 0);
                m.set('b', 0);
                differ.check(m);
                m = new Map();
                m.set('b', 1);
                m.set('a', 1);
                differ.check(m);
                testing_internal_1.expect(differ.toString()).toEqual(util_1.kvChangesAsString({
                    map: ['b[0->1]', 'a[0->1]'],
                    previous: ['a[0->1]', 'b[0->1]'],
                    changes: ['b[0->1]', 'a[0->1]']
                }));
            });
            testing_internal_1.describe('JsObject changes', function () {
                testing_internal_1.it('should support JS Object', function () {
                    var f = new default_keyvalue_differ_1.DefaultKeyValueDifferFactory();
                    testing_internal_1.expect(f.supports({})).toBeTruthy();
                    testing_internal_1.expect(f.supports('not supported')).toBeFalsy();
                    testing_internal_1.expect(f.supports(0)).toBeFalsy();
                    testing_internal_1.expect(f.supports(null)).toBeFalsy();
                });
                testing_internal_1.it('should do basic object watching', function () {
                    var m = {};
                    differ.check(m);
                    m['a'] = 'A';
                    differ.check(m);
                    testing_internal_1.expect(differ.toString())
                        .toEqual(util_1.kvChangesAsString({ map: ['a[null->A]'], additions: ['a[null->A]'] }));
                    m['b'] = 'B';
                    differ.check(m);
                    testing_internal_1.expect(differ.toString())
                        .toEqual(util_1.kvChangesAsString({ map: ['a', 'b[null->B]'], previous: ['a'], additions: ['b[null->B]'] }));
                    m['b'] = 'BB';
                    m['d'] = 'D';
                    differ.check(m);
                    testing_internal_1.expect(differ.toString()).toEqual(util_1.kvChangesAsString({
                        map: ['a', 'b[B->BB]', 'd[null->D]'],
                        previous: ['a', 'b[B->BB]'],
                        additions: ['d[null->D]'],
                        changes: ['b[B->BB]']
                    }));
                    m = {};
                    m['a'] = 'A';
                    m['d'] = 'D';
                    differ.check(m);
                    testing_internal_1.expect(differ.toString()).toEqual(util_1.kvChangesAsString({
                        map: ['a', 'd'],
                        previous: ['a', 'b[BB->null]', 'd'],
                        removals: ['b[BB->null]']
                    }));
                    m = {};
                    differ.check(m);
                    testing_internal_1.expect(differ.toString()).toEqual(util_1.kvChangesAsString({
                        previous: ['a[A->null]', 'd[D->null]'],
                        removals: ['a[A->null]', 'd[D->null]']
                    }));
                });
                testing_internal_1.it('should work regardless key order', function () {
                    differ.check({ a: 0, b: 0 });
                    differ.check({ b: 1, a: 1 });
                    testing_internal_1.expect(differ.toString()).toEqual(util_1.kvChangesAsString({
                        map: ['b[0->1]', 'a[0->1]'],
                        previous: ['a[0->1]', 'b[0->1]'],
                        changes: ['b[0->1]', 'a[0->1]']
                    }));
                });
            });
            testing_internal_1.describe('diff', function () {
                testing_internal_1.it('should return self when there is a change', function () {
                    m.set('a', 'A');
                    testing_internal_1.expect(differ.diff(m)).toBe(differ);
                });
                testing_internal_1.it('should return null when there is no change', function () {
                    m.set('a', 'A');
                    differ.diff(m);
                    testing_internal_1.expect(differ.diff(m)).toEqual(null);
                });
                testing_internal_1.it('should treat null as an empty list', function () {
                    m.set('a', 'A');
                    differ.diff(m);
                    testing_internal_1.expect(differ.diff(null).toString())
                        .toEqual(util_1.kvChangesAsString({ previous: ['a[A->null]'], removals: ['a[A->null]'] }));
                });
                testing_internal_1.it('should throw when given an invalid collection', function () {
                    testing_internal_1.expect(function () { return differ.diff('invalid'); })
                        .toThrowError('Error trying to diff \'invalid\'');
                });
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdF9rZXl2YWx1ZV9kaWZmZXJfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L2NoYW5nZV9kZXRlY3Rpb24vZGlmZmVycy9kZWZhdWx0X2tleXZhbHVlX2RpZmZlcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx3Q0FBa0Usb0VBQW9FLENBQUMsQ0FBQTtBQUN2SSxpQ0FBK0Usd0NBQXdDLENBQUMsQ0FBQTtBQUN4SCxxQkFBZ0MsNkJBQTZCLENBQUMsQ0FBQTtBQUU5RCwwREFBMEQ7QUFDMUQ7SUFDRSwyQkFBUSxDQUFDLGlCQUFpQixFQUFFO1FBQzFCLDJCQUFRLENBQUMsdUJBQXVCLEVBQUU7WUFDaEMsSUFBSSxNQUE2QixDQUFDO1lBQ2xDLElBQUksQ0FBZ0IsQ0FBQztZQUVyQiw2QkFBVSxDQUFDO2dCQUNULE1BQU0sR0FBRyxJQUFJLCtDQUFxQixFQUFFLENBQUM7Z0JBQ3JDLENBQUMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1lBRUgsNEJBQVMsQ0FBQyxjQUFRLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVwQyxxQkFBRSxDQUFDLHlCQUF5QixFQUFFO2dCQUM1QixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVoQixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDZCxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQix5QkFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDcEIsT0FBTyxDQUFDLHdCQUFpQixDQUFDLEVBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLEVBQUUsU0FBUyxFQUFFLENBQUMsWUFB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