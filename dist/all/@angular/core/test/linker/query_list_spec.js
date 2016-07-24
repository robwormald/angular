/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var testing_1 = require('@angular/core/testing');
var collection_1 = require('../../src/facade/collection');
var lang_1 = require('../../src/facade/lang');
var async_1 = require('../../src/facade/async');
var query_list_1 = require('@angular/core/src/linker/query_list');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
function main() {
    testing_internal_1.describe('QueryList', function () {
        var queryList;
        var log;
        testing_internal_1.beforeEach(function () {
            queryList = new query_list_1.QueryList();
            log = '';
        });
        function logAppend(item /** TODO #9100 */) { log += (log.length == 0 ? '' : ', ') + item; }
        testing_internal_1.it('should support resetting and iterating over the new objects', function () {
            queryList.reset(['one']);
            queryList.reset(['two']);
            collection_1.iterateListLike(queryList, logAppend);
            testing_internal_1.expect(log).toEqual('two');
        });
        testing_internal_1.it('should support length', function () {
            queryList.reset(['one', 'two']);
            testing_internal_1.expect(queryList.length).toEqual(2);
        });
        testing_internal_1.it('should support map', function () {
            queryList.reset(['one', 'two']);
            testing_internal_1.expect(queryList.map(function (x) { return x; })).toEqual(['one', 'two']);
        });
        testing_internal_1.it('should support map with index', function () {
            queryList.reset(['one', 'two']);
            testing_internal_1.expect(queryList.map(function (x, i) { return (x + "_" + i); })).toEqual(['one_0', 'two_1']);
        });
        testing_internal_1.it('should support forEach', function () {
            queryList.reset(['one', 'two']);
            var join = '';
            queryList.forEach(function (x) { return join = join + x; });
            testing_internal_1.expect(join).toEqual('onetwo');
        });
        testing_internal_1.it('should support forEach with index', function () {
            queryList.reset(['one', 'two']);
            var join = '';
            queryList.forEach(function (x, i) { return join = join + x + i; });
            testing_internal_1.expect(join).toEqual('one0two1');
        });
        testing_internal_1.it('should support filter', function () {
            queryList.reset(['one', 'two']);
            testing_internal_1.expect(queryList.filter(function (x) { return x == 'one'; })).toEqual(['one']);
        });
        testing_internal_1.it('should support filter with index', function () {
            queryList.reset(['one', 'two']);
            testing_internal_1.expect(queryList.filter(function (x, i) { return i == 0; })).toEqual(['one']);
        });
        testing_internal_1.it('should support reduce', function () {
            queryList.reset(['one', 'two']);
            testing_internal_1.expect(queryList.reduce(function (a, x) { return a + x; }, 'start:'))
                .toEqual('start:onetwo');
        });
        testing_internal_1.it('should support reduce with index', function () {
            queryList.reset(['one', 'two']);
            testing_internal_1.expect(queryList
                .reduce(function (a, x, i) { return a + x + i; }, 'start:'))
                .toEqual('start:one0two1');
        });
        testing_internal_1.it('should support toArray', function () {
            queryList.reset(['one', 'two']);
            testing_internal_1.expect(queryList.reduce(function (a, x) { return a + x; }, 'start:'))
                .toEqual('start:onetwo');
        });
        testing_internal_1.it('should support toArray', function () {
            queryList.reset(['one', 'two']);
            testing_internal_1.expect(queryList.toArray()).toEqual(['one', 'two']);
        });
        testing_internal_1.it('should support toString', function () {
            queryList.reset(['one', 'two']);
            var listString = queryList.toString();
            testing_internal_1.expect(lang_1.StringWrapper.contains(listString, 'one')).toBeTruthy();
            testing_internal_1.expect(lang_1.StringWrapper.contains(listString, 'two')).toBeTruthy();
        });
        testing_internal_1.it('should support first and last', function () {
            queryList.reset(['one', 'two', 'three']);
            testing_internal_1.expect(queryList.first).toEqual('one');
            testing_internal_1.expect(queryList.last).toEqual('three');
        });
        testing_internal_1.it('should support some', function () {
            queryList.reset(['one', 'two', 'three']);
            testing_internal_1.expect(queryList.some(function (item) { return item === 'one'; })).toEqual(true);
            testing_internal_1.expect(queryList.some(function (item) { return item === 'four'; })).toEqual(false);
        });
        if (dom_adapter_1.getDOM().supportsDOMEvents()) {
            testing_internal_1.describe('simple observable interface', function () {
                testing_internal_1.it('should fire callbacks on change', testing_1.fakeAsync(function () {
                    var fires = 0;
                    async_1.ObservableWrapper.subscribe(queryList.changes, function (_) { fires += 1; });
                    queryList.notifyOnChanges();
                    testing_1.tick();
                    testing_internal_1.expect(fires).toEqual(1);
                    queryList.notifyOnChanges();
                    testing_1.tick();
                    testing_internal_1.expect(fires).toEqual(2);
                }));
                testing_internal_1.it('should provides query list as an argument', testing_1.fakeAsync(function () {
                    var recorded;
                    async_1.ObservableWrapper.subscribe(queryList.changes, function (v) { recorded = v; });
                    queryList.reset(['one']);
                    queryList.notifyOnChanges();
                    testing_1.tick();
                    testing_internal_1.expect(recorded).toBe(queryList);
                }));
            });
        }
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlfbGlzdF9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvbGlua2VyL3F1ZXJ5X2xpc3Rfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQXFFLHdDQUF3QyxDQUFDLENBQUE7QUFDOUcsd0JBQStCLHVCQUF1QixDQUFDLENBQUE7QUFDdkQsMkJBQThCLDZCQUE2QixDQUFDLENBQUE7QUFDNUQscUJBQTRCLHVCQUF1QixDQUFDLENBQUE7QUFDcEQsc0JBQWdDLHdCQUF3QixDQUFDLENBQUE7QUFDekQsMkJBQXdCLHFDQUFxQyxDQUFDLENBQUE7QUFDOUQsNEJBQXFCLCtDQUErQyxDQUFDLENBQUE7QUFRckU7SUFDRSwyQkFBUSxDQUFDLFdBQVcsRUFBRTtRQUNwQixJQUFJLFNBQTRCLENBQUM7UUFDakMsSUFBSSxHQUFXLENBQUM7UUFDaEIsNkJBQVUsQ0FBQztZQUNULFNBQVMsR0FBRyxJQUFJLHNCQUFTLEVBQVUsQ0FBQztZQUNwQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7UUFFSCxtQkFBbUIsSUFBUyxDQUFDLGlCQUFpQixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRWhHLHFCQUFFLENBQUMsNkRBQTZELEVBQUU7WUFDaEUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekIsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDekIsNEJBQWUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdEMseUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENB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