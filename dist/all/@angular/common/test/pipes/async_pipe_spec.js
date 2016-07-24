/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var spies_1 = require('../spies');
var lang_1 = require('../../src/facade/lang');
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var async_1 = require('../../src/facade/async');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
function main() {
    testing_internal_1.describe('AsyncPipe', function () {
        testing_internal_1.describe('Observable', function () {
            var emitter;
            var pipe;
            var ref;
            var message = {};
            testing_internal_1.beforeEach(function () {
                emitter = new async_1.EventEmitter();
                ref = new spies_1.SpyChangeDetectorRef();
                pipe = new common_1.AsyncPipe(ref);
            });
            testing_internal_1.describe('transform', function () {
                testing_internal_1.it('should return null when subscribing to an observable', function () { testing_internal_1.expect(pipe.transform(emitter)).toBe(null); });
                testing_internal_1.it('should return the latest available value wrapped', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    pipe.transform(emitter);
                    async_1.ObservableWrapper.callEmit(emitter, message);
                    async_1.TimerWrapper.setTimeout(function () {
                        testing_internal_1.expect(pipe.transform(emitter)).toEqual(new core_1.WrappedValue(message));
                        async.done();
                    }, 0);
                }));
                testing_internal_1.it('should return same value when nothing has changed since the last call', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    pipe.transform(emitter);
                    async_1.ObservableWrapper.callEmit(emitter, message);
                    async_1.TimerWrapper.setTimeout(function () {
                        pipe.transform(emitter);
                        testing_internal_1.expect(pipe.transform(emitter)).toBe(message);
                        async.done();
                    }, 0);
                }));
                testing_internal_1.it('should dispose of the existing subscription when subscribing to a new observable', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    pipe.transform(emitter);
                    var newEmitter = new async_1.EventEmitter();
                    testing_internal_1.expect(pipe.transform(newEmitter)).toBe(null);
                    // this should not affect the pipe
                    async_1.ObservableWrapper.callEmit(emitter, message);
                    async_1.TimerWrapper.setTimeout(function () {
                        testing_internal_1.expect(pipe.transform(newEmitter)).toBe(null);
                        async.done();
                    }, 0);
                }));
                testing_internal_1.it('should request a change detection check upon receiving a new value', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    pipe.transform(emitter);
                    async_1.ObservableWrapper.callEmit(emitter, message);
                    async_1.TimerWrapper.setTimeout(function () {
                        testing_internal_1.expect(ref.spy('markForCheck')).toHaveBeenCalled();
                        async.done();
                    }, 10);
                }));
            });
            testing_internal_1.describe('ngOnDestroy', function () {
                testing_internal_1.it('should do nothing when no subscription', function () { testing_internal_1.expect(function () { return pipe.ngOnDestroy(); }).not.toThrow(); });
                testing_internal_1.it('should dispose of the existing subscription', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    pipe.transform(emitter);
                    pipe.ngOnDestroy();
                    async_1.ObservableWrapper.callEmit(emitter, message);
                    async_1.TimerWrapper.setTimeout(function () {
                        testing_internal_1.expect(pipe.transform(emitter)).toBe(null);
                        async.done();
                    }, 0);
                }));
            });
        });
        testing_internal_1.describe('Promise', function () {
            var message = new Object();
            var pipe;
            var completer;
            var ref;
            // adds longer timers for passing tests in IE
            var timer = (!lang_1.isBlank(dom_adapter_1.getDOM()) && browser_util_1.browserDetection.isIE) ? 50 : 10;
            testing_internal_1.beforeEach(function () {
                completer = async_1.PromiseWrapper.completer();
                ref = new spies_1.SpyChangeDetectorRef();
                pipe = new common_1.AsyncPipe(ref);
            });
            testing_internal_1.describe('transform', function () {
                testing_internal_1.it('should return null when subscribing to a promise', function () { testing_internal_1.expect(pipe.transform(completer.promise)).toBe(null); });
                testing_internal_1.it('should return the latest available value', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    pipe.transform(completer.promise);
                    completer.resolve(message);
                    async_1.TimerWrapper.setTimeout(function () {
                        testing_internal_1.expect(pipe.transform(completer.promise)).toEqual(new core_1.WrappedValue(message));
                        async.done();
                    }, timer);
                }));
                testing_internal_1.it('should return unwrapped value when nothing has changed since the last call', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    pipe.transform(completer.promise);
                    completer.resolve(message);
                    async_1.TimerWrapper.setTimeout(function () {
                        pipe.transform(completer.promise);
                        testing_internal_1.expect(pipe.transform(completer.promise)).toBe(message);
                        async.done();
                    }, timer);
                }));
                testing_internal_1.it('should dispose of the existing subscription when subscribing to a new promise', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    pipe.transform(completer.promise);
                    var newCompleter = async_1.PromiseWrapper.completer();
                    testing_internal_1.expect(pipe.transform(newCompleter.promise)).toBe(null);
                    // this should not affect the pipe, so it should return WrappedValue
                    completer.resolve(message);
                    async_1.TimerWrapper.setTimeout(function () {
                        testing_internal_1.expect(pipe.transform(newCompleter.promise)).toBe(null);
                        async.done();
                    }, timer);
                }));
                testing_internal_1.it('should request a change detection check upon receiving a new value', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                    var markForCheck = ref.spy('markForCheck');
                    pipe.transform(completer.promise);
                    completer.resolve(message);
                    async_1.TimerWrapper.setTimeout(function () {
                        testing_internal_1.expect(markForCheck).toHaveBeenCalled();
                        async.done();
                    }, timer);
                }));
                testing_internal_1.describe('ngOnDestroy', function () {
                    testing_internal_1.it('should do nothing when no source', function () { testing_internal_1.expect(function () { return pipe.ngOnDestroy(); }).not.toThrow(); });
                    testing_internal_1.it('should dispose of the existing source', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                        pipe.transform(completer.promise);
                        testing_internal_1.expect(pipe.transform(completer.promise)).toBe(null);
                        completer.resolve(message);
                        async_1.TimerWrapper.setTimeout(function () {
                            testing_internal_1.expect(pipe.transform(completer.promise)).toEqual(new core_1.WrappedValue(message));
                            pipe.ngOnDestroy();
                            testing_internal_1.expect(pipe.transform(completer.promise)).toBe(null);
                            async.done();
                        }, timer);
                    }));
                });
            });
        });
        testing_internal_1.describe('null', function () {
            testing_internal_1.it('should return null when given null', function () {
                var pipe = new common_1.AsyncPipe(null);
                testing_internal_1.expect(pipe.transform(null)).toEqual(null);
            });
        });
        testing_internal_1.describe('other types', function () {
            testing_internal_1.it('should throw when given an invalid object', function () {
                var pipe = new common_1.AsyncPipe(null);
                testing_internal_1.expect(function () { return pipe.transform('some bogus object'); }).toThrowError();
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfcGlwZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vdGVzdC9waXBlcy9hc3luY19waXBlX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUE0Ryx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3JKLHNCQUFtQyxVQUFVLENBQUMsQ0FBQTtBQUM5QyxxQkFBc0IsdUJBQXVCLENBQUMsQ0FBQTtBQUM5Qyx1QkFBd0IsaUJBQWlCLENBQUMsQ0FBQTtBQUMxQyxxQkFBMkIsZUFBZSxDQUFDLENBQUE7QUFDM0Msc0JBQTRFLHdCQUF3QixDQUFDLENBQUE7QUFDckcsNEJBQXFCLCtDQUErQyxDQUFDLENBQUE7QUFFckUsNkJBQStCLGdEQUFnRCxDQUFDLENBQUE7QUFFaEY7SUFDRSwyQkFBUSxDQUFDLFdBQVcsRUFBRTtRQUVwQiwyQkFBUSxDQUFDLFlBQVksRUFBRTtZQUNyQixJQUFJLE9BQTBCLENBQUM7WUFDL0IsSUFBSSxJQUFlLENBQUM7WUFDcEIsSUFBSSxHQUFRLENBQUM7WUFDYixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFFakIsNkJBQVUsQ0FBQztnQkFDVCxPQUFPLEdBQUcsSUFBSSxvQkFBWSxFQUFFLENBQUM7Z0JBQzdCLEdBQUcsR0FBRyxJQUFJLDRCQUFvQixFQUFFLENBQUM7Z0JBQ2pDLElBQUksR0FBRyxJQUFJLGtCQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7WUFFSCwyQkFBUSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIscUJBQUUsQ0FBQyxzREFBc0QsRUFDdEQsY0FBUSx5QkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFMUQscUJBQUUsQ0FBQyxrREFBa0QsRUFDbEQseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtvQkFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFeEIseUJBQWlCLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFFN0Msb0JBQVksQ0FBQyxVQUFVLENBQUM7d0JBQ3RCLHlCQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLG1CQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzt3QkFDbkUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNmLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDUixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUdQLHFCQUFFLENBQUMsdUVBQXVFLEVBQ3ZFLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7b0JBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3hCLHlCQUFpQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBRTdDLG9CQUFZLENBQUMsVUFBVSxDQUFDO3dCQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN4Qix5QkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQzlDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDZixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUCxxQkFBRSxDQUFDLGtGQUFrRixFQUNsRix5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO29CQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUV4QixJQUFJLFVBQVUsR0FBRyxJQUFJLG9CQUFZLEVBQUUsQ0FBQztvQkFDcEMseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUU5QyxrQ0FBa0M7b0JBQ2xDLHlCQUFpQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBRTdDLG9CQUFZLENBQUMsVUFBVSxDQUFDO3dCQUN0Qix5QkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzlDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDZixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ1IsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUCxxQkFBRSxDQUFDLG9FQUFvRSxFQUNwRSx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO29CQUNyRCxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN4Qix5QkFBaUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUU3QyxvQkFBWSxDQUFDLFVBQVUsQ0FBQzt3QkFDdEIseUJBQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzt3QkFDbkQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNmLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDVCxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ1QsQ0FBQyxDQUFDLENBQUM7WUFFSCwyQkFBUSxDQUFDLGFBQWEsRUFBRTtnQkFDdEIscUJBQUUsQ0FBQyx3Q0FBd0MsRUFDeEMsY0FBUSx5QkFBTSxDQUFDLGNBQU0sT0FBQSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFOUQscUJBQUUsQ0FBQyw2Q0FBNkMsRUFDN0MseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtvQkFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDeEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUVuQix5QkFBaUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUU3QyxvQkFBWSxDQUFDLFVBQVUsQ0FBQzt3QkFDdEIseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMzQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2YsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNSLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDVCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsMkJBQVEsQ0FBQyxTQUFTLEVBQUU7WUFDbEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUMzQixJQUFJLElBQWUsQ0FBQztZQUNwQixJQUFJLFNBQWdDLENBQUM7WUFDckMsSUFBSSxHQUF5QixDQUFDO1lBQzlCLDZDQUE2QztZQUM3QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsY0FBTyxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxJQUFJLCtCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7WUFFcEUsNkJBQVUsQ0FBQztnQkFDVCxTQUFTLEdBQUcsc0JBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztnQkFDdkMsR0FBRyxHQUFHLElBQUksNEJBQW9CLEVBQUUsQ0FBQztnQkFDakMsSUFBSSxHQUFHLElBQUksa0JBQVMsQ0FBTSxHQUFHLENBQUMsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQztZQUVILDJCQUFRLENBQUMsV0FBVyxFQUFFO2dCQUNwQixxQkFBRSxDQUFDLGtEQUFrRCxFQUNsRCxjQUFRLHlCQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFcEUscUJBQUUsQ0FBQywwQ0FBMEMsRUFDMUMseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtvQkFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRWxDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRTNCLG9CQUFZLENBQUMsVUFBVSxDQUFDO3dCQUN0Qix5QkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksbUJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUM3RSxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNaLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRVAscUJBQUUsQ0FBQyw0RUFBNEUsRUFDNUUseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtvQkFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2xDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRTNCLG9CQUFZLENBQUMsVUFBVSxDQUFDO3dCQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDbEMseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDeEQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO29CQUNmLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDWixDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVQLHFCQUFFLENBQUMsK0VBQStFLEVBQy9FLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7b0JBQ3JELElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUVsQyxJQUFJLFlBQVksR0FBRyxzQkFBYyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUM5Qyx5QkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUV4RCxvRUFBb0U7b0JBQ3BFLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRTNCLG9CQUFZLENBQUMsVUFBVSxDQUFDO3dCQUN0Qix5QkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUN4RCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNaLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRVAscUJBQUUsQ0FBQyxvRUFBb0UsRUFDcEUseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtvQkFDckQsSUFBSSxZQUFZLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ2xDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRTNCLG9CQUFZLENBQUMsVUFBVSxDQUFDO3dCQUN0Qix5QkFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLGdCQUFnQixFQUFFLENBQUM7d0JBQ3hDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDZixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ1osQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFUCwyQkFBUSxDQUFDLGFBQWEsRUFBRTtvQkFDdEIscUJBQUUsQ0FBQyxrQ0FBa0MsRUFDbEMsY0FBUSx5QkFBTSxDQUFDLGNBQU0sT0FBQSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFOUQscUJBQUUsQ0FBQyx1Q0FBdUMsRUFDdkMseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5Qjt3QkFDckQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ2xDLHlCQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3JELFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBRzNCLG9CQUFZLENBQUMsVUFBVSxDQUFDOzRCQUN0Qix5QkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksbUJBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzRCQUM3RSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7NEJBQ25CLHlCQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ3JELEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQzt3QkFDZixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7b0JBQ1osQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDVCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBUSxDQUFDLE1BQU0sRUFBRTtZQUNmLHFCQUFFLENBQUMsb0NBQW9DLEVBQUU7Z0JBQ3ZDLElBQUksSUFBSSxHQUFHLElBQUksa0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0IseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBUSxDQUFDLGFBQWEsRUFBRTtZQUN0QixxQkFBRSxDQUFDLDJDQUEyQyxFQUFFO2dCQUM5QyxJQUFJLElBQUksR0FBRyxJQUFJLGtCQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLHlCQUFNLENBQUMsY0FBTSxPQUFBLElBQUksQ0FBQyxTQUFTLENBQU0sbUJBQW1CLENBQUMsRUFBeEMsQ0FBd0MsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3hFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFyTWUsWUFBSSxPQXFNbkIsQ0FBQSJ9