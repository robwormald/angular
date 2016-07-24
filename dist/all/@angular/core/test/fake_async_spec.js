/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var testing_1 = require('@angular/core/testing');
var async_1 = require('../../router-deprecated/src/facade/async');
var exceptions_1 = require('../../router-deprecated/src/facade/exceptions');
var parser_1 = require('../../compiler/src/expression_parser/parser');
function main() {
    testing_internal_1.describe('fake async', function () {
        testing_internal_1.it('should run synchronous code', function () {
            var ran = false;
            testing_1.fakeAsync(function () { ran = true; })();
            matchers_1.expect(ran).toEqual(true);
        });
        testing_internal_1.it('should pass arguments to the wrapped function', function () {
            testing_1.fakeAsync(function (foo /** TODO #9100 */, bar /** TODO #9100 */) {
                matchers_1.expect(foo).toEqual('foo');
                matchers_1.expect(bar).toEqual('bar');
            })('foo', 'bar');
        });
        testing_internal_1.it('should work with inject()', testing_1.fakeAsync(testing_internal_1.inject([parser_1.Parser], function (parser /** TODO #9100 */) {
            matchers_1.expect(parser).toBeAnInstanceOf(parser_1.Parser);
        })));
        testing_internal_1.it('should throw on nested calls', function () {
            matchers_1.expect(function () {
                testing_1.fakeAsync(function () { testing_1.fakeAsync(function () { return null; })(); })();
            }).toThrowError('fakeAsync() calls can not be nested');
        });
        testing_internal_1.it('should flush microtasks before returning', function () {
            var thenRan = false;
            testing_1.fakeAsync(function () { async_1.PromiseWrapper.resolve(null).then(function (_) { thenRan = true; }); })();
            matchers_1.expect(thenRan).toEqual(true);
        });
        testing_internal_1.it('should propagate the return value', function () { matchers_1.expect(testing_1.fakeAsync(function () { return 'foo'; })()).toEqual('foo'); });
        testing_internal_1.describe('Promise', function () {
            testing_internal_1.it('should run asynchronous code', testing_1.fakeAsync(function () {
                var thenRan = false;
                async_1.PromiseWrapper.resolve(null).then(function (_) { thenRan = true; });
                matchers_1.expect(thenRan).toEqual(false);
                testing_1.flushMicrotasks();
                matchers_1.expect(thenRan).toEqual(true);
            }));
            testing_internal_1.it('should run chained thens', testing_1.fakeAsync(function () {
                var log = new testing_internal_1.Log();
                async_1.PromiseWrapper.resolve(null).then(function (_) { return log.add(1); }).then(function (_) { return log.add(2); });
                matchers_1.expect(log.result()).toEqual('');
                testing_1.flushMicrotasks();
                matchers_1.expect(log.result()).toEqual('1; 2');
            }));
            testing_internal_1.it('should run Promise created in Promise', testing_1.fakeAsync(function () {
                var log = new testing_internal_1.Log();
                async_1.PromiseWrapper.resolve(null).then(function (_) {
                    log.add(1);
                    async_1.PromiseWrapper.resolve(null).then(function (_) { return log.add(2); });
                });
                matchers_1.expect(log.result()).toEqual('');
                testing_1.flushMicrotasks();
                matchers_1.expect(log.result()).toEqual('1; 2');
            }));
            testing_internal_1.it('should complain if the test throws an exception during async calls', function () {
                matchers_1.expect(function () {
                    testing_1.fakeAsync(function () {
                        async_1.PromiseWrapper.resolve(null).then(function (_) { throw new exceptions_1.BaseException('async'); });
                        testing_1.flushMicrotasks();
                    })();
                }).toThrowError('Uncaught (in promise): async');
            });
            testing_internal_1.it('should complain if a test throws an exception', function () {
                matchers_1.expect(function () {
                    testing_1.fakeAsync(function () { throw new exceptions_1.BaseException('sync'); })();
                }).toThrowError('sync');
            });
        });
        testing_internal_1.describe('timers', function () {
            testing_internal_1.it('should run queued zero duration timer on zero tick', testing_1.fakeAsync(function () {
                var ran = false;
                async_1.TimerWrapper.setTimeout(function () { ran = true; }, 0);
                matchers_1.expect(ran).toEqual(false);
                testing_1.tick();
                matchers_1.expect(ran).toEqual(true);
            }));
            testing_internal_1.it('should run queued timer after sufficient clock ticks', testing_1.fakeAsync(function () {
                var ran = false;
                async_1.TimerWrapper.setTimeout(function () { ran = true; }, 10);
                testing_1.tick(6);
                matchers_1.expect(ran).toEqual(false);
                testing_1.tick(6);
                matchers_1.expect(ran).toEqual(true);
            }));
            testing_internal_1.it('should run queued timer only once', testing_1.fakeAsync(function () {
                var cycles = 0;
                async_1.TimerWrapper.setTimeout(function () { cycles++; }, 10);
                testing_1.tick(10);
                matchers_1.expect(cycles).toEqual(1);
                testing_1.tick(10);
                matchers_1.expect(cycles).toEqual(1);
                testing_1.tick(10);
                matchers_1.expect(cycles).toEqual(1);
            }));
            testing_internal_1.it('should not run cancelled timer', testing_1.fakeAsync(function () {
                var ran = false;
                var id = async_1.TimerWrapper.setTimeout(function () { ran = true; }, 10);
                async_1.TimerWrapper.clearTimeout(id);
                testing_1.tick(10);
                matchers_1.expect(ran).toEqual(false);
            }));
            testing_internal_1.it('should throw an error on dangling timers', function () {
                matchers_1.expect(function () {
                    testing_1.fakeAsync(function () { async_1.TimerWrapper.setTimeout(function () { }, 10); })();
                }).toThrowError('1 timer(s) still in the queue.');
            });
            testing_internal_1.it('should throw an error on dangling periodic timers', function () {
                matchers_1.expect(function () {
                    testing_1.fakeAsync(function () { async_1.TimerWrapper.setInterval(function () { }, 10); })();
                }).toThrowError('1 periodic timer(s) still in the queue.');
            });
            testing_internal_1.it('should run periodic timers', testing_1.fakeAsync(function () {
                var cycles = 0;
                var id = async_1.TimerWrapper.setInterval(function () { cycles++; }, 10);
                testing_1.tick(10);
                matchers_1.expect(cycles).toEqual(1);
                testing_1.tick(10);
                matchers_1.expect(cycles).toEqual(2);
                testing_1.tick(10);
                matchers_1.expect(cycles).toEqual(3);
                async_1.TimerWrapper.clearInterval(id);
            }));
            testing_internal_1.it('should not run cancelled periodic timer', testing_1.fakeAsync(function () {
                var ran = false;
                var id = async_1.TimerWrapper.setInterval(function () { ran = true; }, 10);
                async_1.TimerWrapper.clearInterval(id);
                testing_1.tick(10);
                matchers_1.expect(ran).toEqual(false);
            }));
            testing_internal_1.it('should be able to cancel periodic timers from a callback', testing_1.fakeAsync(function () {
                var cycles = 0;
                var id;
                id = async_1.TimerWrapper.setInterval(function () {
                    cycles++;
                    async_1.TimerWrapper.clearInterval(id);
                }, 10);
                testing_1.tick(10);
                matchers_1.expect(cycles).toEqual(1);
                testing_1.tick(10);
                matchers_1.expect(cycles).toEqual(1);
            }));
            testing_internal_1.it('should clear periodic timers', testing_1.fakeAsync(function () {
                var cycles = 0;
                var id = async_1.TimerWrapper.setInterval(function () { cycles++; }, 10);
                testing_1.tick(10);
                matchers_1.expect(cycles).toEqual(1);
                testing_1.discardPeriodicTasks();
                // Tick once to clear out the timer which already started.
                testing_1.tick(10);
                matchers_1.expect(cycles).toEqual(2);
                testing_1.tick(10);
                // Nothing should change
                matchers_1.expect(cycles).toEqual(2);
            }));
            testing_internal_1.it('should process microtasks before timers', testing_1.fakeAsync(function () {
                var log = new testing_internal_1.Log();
                async_1.PromiseWrapper.resolve(null).then(function (_) { return log.add('microtask'); });
                async_1.TimerWrapper.setTimeout(function () { return log.add('timer'); }, 9);
                var id = async_1.TimerWrapper.setInterval(function () { return log.add('periodic timer'); }, 10);
                matchers_1.expect(log.result()).toEqual('');
                testing_1.tick(10);
                matchers_1.expect(log.result()).toEqual('microtask; timer; periodic timer');
                async_1.TimerWrapper.clearInterval(id);
            }));
            testing_internal_1.it('should process micro-tasks created in timers before next timers', testing_1.fakeAsync(function () {
                var log = new testing_internal_1.Log();
                async_1.PromiseWrapper.resolve(null).then(function (_) { return log.add('microtask'); });
                async_1.TimerWrapper.setTimeout(function () {
                    log.add('timer');
                    async_1.PromiseWrapper.resolve(null).then(function (_) { return log.add('t microtask'); });
                }, 9);
                var id = async_1.TimerWrapper.setInterval(function () {
                    log.add('periodic timer');
                    async_1.PromiseWrapper.resolve(null).then(function (_) { return log.add('pt microtask'); });
                }, 10);
                testing_1.tick(10);
                matchers_1.expect(log.result())
                    .toEqual('microtask; timer; t microtask; periodic timer; pt microtask');
                testing_1.tick(10);
                matchers_1.expect(log.result())
                    .toEqual('microtask; timer; t microtask; periodic timer; pt microtask; periodic timer; pt microtask');
                async_1.TimerWrapper.clearInterval(id);
            }));
        });
        testing_internal_1.describe('outside of the fakeAsync zone', function () {
            testing_internal_1.it('calling flushMicrotasks should throw', function () {
                matchers_1.expect(function () {
                    testing_1.flushMicrotasks();
                }).toThrowError('The code should be running in the fakeAsync zone to call this function');
            });
            testing_internal_1.it('calling tick should throw', function () {
                matchers_1.expect(function () {
                    testing_1.tick();
                }).toThrowError('The code should be running in the fakeAsync zone to call this function');
            });
            testing_internal_1.it('calling discardPeriodicTasks should throw', function () {
                matchers_1.expect(function () {
                    testing_1.discardPeriodicTasks();
                }).toThrowError('The code should be running in the fakeAsync zone to call this function');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFrZV9hc3luY19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvZmFrZV9hc3luY19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBeUUsd0NBQXdDLENBQUMsQ0FBQTtBQUNsSCx5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUNsRSx3QkFBc0UsdUJBQXVCLENBQUMsQ0FBQTtBQUM5RixzQkFBMkMsMENBQTBDLENBQUMsQ0FBQTtBQUN0RiwyQkFBNEIsK0NBQStDLENBQUMsQ0FBQTtBQUM1RSx1QkFBcUIsNkNBQTZDLENBQUMsQ0FBQTtBQUVuRTtJQUNFLDJCQUFRLENBQUMsWUFBWSxFQUFFO1FBQ3JCLHFCQUFFLENBQUMsNkJBQTZCLEVBQUU7WUFDaEMsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLG1CQUFTLENBQUMsY0FBUSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVuQyxpQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsK0NBQStDLEVBQUU7WUFDbEQsbUJBQVMsQ0FBQyxVQUFDLEdBQVEsQ0FBQyxpQkFBaUIsRUFBRSxHQUFRLENBQUMsaUJBQWlCO2dCQUMvRCxpQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDM0IsaUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ25CLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQywyQkFBMkIsRUFBRSxtQkFBUyxDQUFDLHlC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