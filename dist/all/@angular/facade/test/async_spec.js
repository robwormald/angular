/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var async_1 = require('../src/async');
function main() {
    testing_internal_1.describe('EventEmitter', function () {
        var emitter;
        testing_internal_1.beforeEach(function () { emitter = new async_1.EventEmitter(); });
        testing_internal_1.it('should call the next callback', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            async_1.ObservableWrapper.subscribe(emitter, function (value) {
                testing_internal_1.expect(value).toEqual(99);
                async.done();
            });
            async_1.ObservableWrapper.callEmit(emitter, 99);
        }));
        testing_internal_1.it('should call the throw callback', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            async_1.ObservableWrapper.subscribe(emitter, function (_) { }, function (error) {
                testing_internal_1.expect(error).toEqual('Boom');
                async.done();
            });
            async_1.ObservableWrapper.callError(emitter, 'Boom');
        }));
        testing_internal_1.it('should work when no throw callback is provided', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            async_1.ObservableWrapper.subscribe(emitter, function (_) { }, function (_) { async.done(); });
            async_1.ObservableWrapper.callError(emitter, 'Boom');
        }));
        testing_internal_1.it('should call the return callback', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            async_1.ObservableWrapper.subscribe(emitter, function (_) { }, function (_) { }, function () { async.done(); });
            async_1.ObservableWrapper.callComplete(emitter);
        }));
        testing_internal_1.it('should subscribe to the wrapper synchronously', function () {
            var called = false;
            async_1.ObservableWrapper.subscribe(emitter, function (value) { called = true; });
            async_1.ObservableWrapper.callEmit(emitter, 99);
            testing_internal_1.expect(called).toBe(true);
        });
        // Makes Edge to disconnect when running the full unit test campaign
        // TODO: remove when issue is solved: https://github.com/angular/angular/issues/4756
        if (!browser_util_1.browserDetection.isEdge) {
            testing_internal_1.it('delivers next and error events synchronously', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var log = [];
                async_1.ObservableWrapper.subscribe(emitter, function (x) {
                    log.push(x);
                    testing_internal_1.expect(log).toEqual([1, 2]);
                }, function (err) {
                    log.push(err);
                    testing_internal_1.expect(log).toEqual([1, 2, 3, 4]);
                    async.done();
                });
                log.push(1);
                async_1.ObservableWrapper.callEmit(emitter, 2);
                log.push(3);
                async_1.ObservableWrapper.callError(emitter, 4);
                log.push(5);
            }));
            testing_internal_1.it('delivers next and complete events synchronously', function () {
                var log = [];
                async_1.ObservableWrapper.subscribe(emitter, function (x) {
                    log.push(x);
                    testing_internal_1.expect(log).toEqual([1, 2]);
                }, null, function () {
                    log.push(4);
                    testing_internal_1.expect(log).toEqual([1, 2, 3, 4]);
                });
                log.push(1);
                async_1.ObservableWrapper.callEmit(emitter, 2);
                log.push(3);
                async_1.ObservableWrapper.callComplete(emitter);
                log.push(5);
                testing_internal_1.expect(log).toEqual([1, 2, 3, 4, 5]);
            });
        }
        testing_internal_1.it('delivers events asynchronously when forced to async mode', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var e = new async_1.EventEmitter(true);
            var log = [];
            async_1.ObservableWrapper.subscribe(e, function (x) {
                log.push(x);
                testing_internal_1.expect(log).toEqual([1, 3, 2]);
                async.done();
            });
            log.push(1);
            async_1.ObservableWrapper.callEmit(e, 2);
            log.push(3);
        }));
        testing_internal_1.it('reports whether it has subscribers', function () {
            var e = new async_1.EventEmitter(false);
            testing_internal_1.expect(async_1.ObservableWrapper.hasSubscribers(e)).toBe(false);
            async_1.ObservableWrapper.subscribe(e, function (_) { });
            testing_internal_1.expect(async_1.ObservableWrapper.hasSubscribers(e)).toBe(true);
        });
        // TODO: vsavkin: add tests cases
        // should call dispose on the subscription if generator returns {done:true}
        // should call dispose on the subscription on throw
        // should call dispose on the subscription on return
    });
    testing_internal_1.describe('ObservableWrapper', function () {
        testing_internal_1.it('should correctly check isObservable for EventEmitter', function () {
            var e = new async_1.EventEmitter(false);
            testing_internal_1.expect(async_1.ObservableWrapper.isObservable(e)).toBe(true);
        });
        testing_internal_1.it('should correctly check isObservable for Subject', function () {
            var e = new async_1.Subject();
            testing_internal_1.expect(async_1.ObservableWrapper.isObservable(e)).toBe(true);
        });
        testing_internal_1.it('should subscribe to EventEmitters', function () {
            var e = new async_1.EventEmitter(false);
            async_1.ObservableWrapper.subscribe(e, function (val) { });
            async_1.ObservableWrapper.callEmit(e, 1);
            async_1.ObservableWrapper.callComplete(e);
        });
    });
    // See ECMAScript 6 Spec 25.4.4.1
    testing_internal_1.describe('PromiseWrapper', function () {
        testing_internal_1.describe('#all', function () {
            testing_internal_1.it('should combine lists of Promises', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var one = async_1.PromiseWrapper.completer();
                var two = async_1.PromiseWrapper.completer();
                var all = async_1.PromiseWrapper.all([one.promise, two.promise]);
                var allCalled = false;
                async_1.PromiseWrapper.then(one.promise, function (_) {
                    testing_internal_1.expect(allCalled).toBe(false);
                    two.resolve('two');
                    return null;
                });
                async_1.PromiseWrapper.then(all, function (_) {
                    allCalled = true;
                    async.done();
                    return null;
                });
                one.resolve('one');
            }));
            [null, true, false, 10, 'thing', {}, []].forEach(function (abruptCompletion) {
                testing_internal_1.it("should treat \"" + abruptCompletion + "\" as an \"abrupt completion\"", testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    var one = async_1.PromiseWrapper.completer();
                    var all = async_1.PromiseWrapper.all([one.promise, abruptCompletion]);
                    async_1.PromiseWrapper.then(all, function (val) {
                        testing_internal_1.expect(val[1]).toEqual(abruptCompletion);
                        async.done();
                    });
                    one.resolve('one');
                }));
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZmFjYWRlL3Rlc3QvYXN5bmNfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQWlHLHdDQUF3QyxDQUFDLENBQUE7QUFDMUksNkJBQStCLGdEQUFnRCxDQUFDLENBQUE7QUFDaEYsc0JBQW1GLGNBQWMsQ0FBQyxDQUFBO0FBRWxHO0lBQ0UsMkJBQVEsQ0FBQyxjQUFjLEVBQUU7UUFDdkIsSUFBSSxPQUEwQixDQUFDO1FBRS9CLDZCQUFVLENBQUMsY0FBUSxPQUFPLEdBQUcsSUFBSSxvQkFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwRCxxQkFBRSxDQUFDLCtCQUErQixFQUMvQix5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ3JELHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFLO2dCQUN6Qyx5QkFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDMUIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7WUFFSCx5QkFBaUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFUCxxQkFBRSxDQUFDLGdDQUFnQyxFQUNoQyx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ3JELHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsVUFBQyxDQUFDLElBQU0sQ0FBQyxFQUFFLFVBQUMsS0FBSztnQkFDcEQseUJBQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzlCLEtB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