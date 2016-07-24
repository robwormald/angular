/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var ng_zone_1 = require('@angular/core/src/zone/ng_zone');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var async_1 = require('../../src/facade/async');
var exceptions_1 = require('../../src/facade/exceptions');
var lang_1 = require('../../src/facade/lang');
var needsLongerTimers = browser_util_1.browserDetection.isSlow || browser_util_1.browserDetection.isEdge;
var resultTimer = 1000;
var testTimeout = browser_util_1.browserDetection.isEdge ? 1200 : 500;
// Schedules a macrotask (using a timer)
function macroTask(fn, timer) {
    if (timer === void 0) { timer = 1; }
    // adds longer timers for passing tests in IE and Edge
    async_1.TimerWrapper.setTimeout(fn, needsLongerTimers ? timer : 1);
}
var _log;
var _errors;
var _traces;
var _zone;
function logOnError() {
    async_1.ObservableWrapper.subscribe(_zone.onError, function (ngErr) {
        _errors.push(ngErr.error);
        _traces.push(ngErr.stackTrace);
    });
}
function logOnUnstable() {
    async_1.ObservableWrapper.subscribe(_zone.onUnstable, _log.fn('onUnstable'));
}
function logOnMicrotaskEmpty() {
    async_1.ObservableWrapper.subscribe(_zone.onMicrotaskEmpty, _log.fn('onMicrotaskEmpty'));
}
function logOnStable() {
    async_1.ObservableWrapper.subscribe(_zone.onStable, _log.fn('onStable'));
}
function runNgZoneNoLog(fn) {
    var length = _log.logItems.length;
    try {
        return _zone.run(fn);
    }
    finally {
        // delete anything which may have gotten logged.
        _log.logItems.length = length;
    }
}
function main() {
    testing_internal_1.describe('NgZone', function () {
        function createZone(enableLongStackTrace) {
            return new ng_zone_1.NgZone({ enableLongStackTrace: enableLongStackTrace });
        }
        testing_internal_1.beforeEach(function () {
            _log = new testing_internal_1.Log();
            _errors = [];
            _traces = [];
        });
        testing_internal_1.describe('long stack trace', function () {
            testing_internal_1.beforeEach(function () {
                _zone = createZone(true);
                logOnUnstable();
                logOnMicrotaskEmpty();
                logOnStable();
                logOnError();
            });
            commonTests();
            testing_internal_1.it('should produce long stack traces', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                macroTask(function () {
                    var c = async_1.PromiseWrapper.completer();
                    _zone.run(function () {
                        async_1.TimerWrapper.setTimeout(function () {
                            async_1.TimerWrapper.setTimeout(function () {
                                c.resolve(null);
                                throw new exceptions_1.BaseException('ccc');
                            }, 0);
                        }, 0);
                    });
                    c.promise.then(function (_) {
                        testing_internal_1.expect(_traces.length).toBe(1);
                        testing_internal_1.expect(_traces[0].length).toBeGreaterThan(1);
                        async.done();
                    });
                });
            }), testTimeout);
            testing_internal_1.it('should produce long stack traces (when using microtasks)', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                macroTask(function () {
                    var c = async_1.PromiseWrapper.completer();
                    _zone.run(function () {
                        lang_1.scheduleMicroTask(function () {
                            lang_1.scheduleMicroTask(function () {
                                c.resolve(null);
                                throw new exceptions_1.BaseException('ddd');
                            });
                        });
                    });
                    c.promise.then(function (_) {
                        testing_internal_1.expect(_traces.length).toBe(1);
                        testing_internal_1.expect(_traces[0].length).toBeGreaterThan(1);
                        async.done();
                    });
                });
            }), testTimeout);
        });
        testing_internal_1.describe('short stack trace', function () {
            testing_internal_1.beforeEach(function () {
                _zone = createZone(false);
                logOnUnstable();
                logOnMicrotaskEmpty();
                logOnStable();
                logOnError();
            });
            commonTests();
            testing_internal_1.it('should disable long stack traces', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                macroTask(function () {
                    var c = async_1.PromiseWrapper.completer();
                    _zone.run(function () {
                        async_1.TimerWrapper.setTimeout(function () {
                            async_1.TimerWrapper.setTimeout(function () {
                                c.resolve(null);
                                throw new exceptions_1.BaseException('ccc');
                            }, 0);
                        }, 0);
                    });
                    c.promise.then(function (_) {
                        testing_internal_1.expect(_traces.length).toBe(1);
                        if (lang_1.isPresent(_traces[0])) {
                            // some browsers don't have stack traces.
                            testing_internal_1.expect(_traces[0].indexOf('---')).toEqual(-1);
                        }
                        async.done();
                    });
                });
            }), testTimeout);
        });
    });
}
exports.main = main;
function commonTests() {
    testing_internal_1.describe('hasPendingMicrotasks', function () {
        testing_internal_1.it('should be false', function () { testing_internal_1.expect(_zone.hasPendingMicrotasks).toBe(false); });
        testing_internal_1.it('should be true', function () {
            runNgZoneNoLog(function () { lang_1.scheduleMicroTask(function () { }); });
            testing_internal_1.expect(_zone.hasPendingMicrotasks).toBe(true);
        });
    });
    testing_internal_1.describe('hasPendingTimers', function () {
        testing_internal_1.it('should be false', function () { testing_internal_1.expect(_zone.hasPendingMacrotasks).toBe(false); });
        testing_internal_1.it('should be true', function () {
            runNgZoneNoLog(function () { async_1.TimerWrapper.setTimeout(function () { }, 0); });
            testing_internal_1.expect(_zone.hasPendingMacrotasks).toBe(true);
        });
    });
    testing_internal_1.describe('hasPendingAsyncTasks', function () {
        testing_internal_1.it('should be false', function () { testing_internal_1.expect(_zone.hasPendingMicrotasks).toBe(false); });
        testing_internal_1.it('should be true when microtask is scheduled', function () {
            runNgZoneNoLog(function () { lang_1.scheduleMicroTask(function () { }); });
            testing_internal_1.expect(_zone.hasPendingMicrotasks).toBe(true);
        });
        testing_internal_1.it('should be true when timer is scheduled', function () {
            runNgZoneNoLog(function () { async_1.TimerWrapper.setTimeout(function () { }, 0); });
            testing_internal_1.expect(_zone.hasPendingMacrotasks).toBe(true);
        });
    });
    testing_internal_1.describe('isInInnerZone', function () {
        testing_internal_1.it('should return whether the code executes in the inner zone', function () {
            testing_internal_1.expect(ng_zone_1.NgZone.isInAngularZone()).toEqual(false);
            runNgZoneNoLog(function () { testing_internal_1.expect(ng_zone_1.NgZone.isInAngularZone()).toEqual(true); });
        }, testTimeout);
    });
    testing_internal_1.describe('run', function () {
        testing_internal_1.it('should return the body return value from run', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            macroTask(function () { testing_internal_1.expect(_zone.run(function () { return 6; })).toEqual(6); });
            macroTask(function () { async.done(); });
        }), testTimeout);
        testing_internal_1.it('should call onUnstable and onMicrotaskEmpty', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            runNgZoneNoLog(function () { return macroTask(_log.fn('run')); });
            macroTask(function () {
                testing_internal_1.expect(_log.result()).toEqual('onUnstable; run; onMicrotaskEmpty; onStable');
                async.done();
            });
        }), testTimeout);
        testing_internal_1.it('should call onStable once at the end of event', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            // The test is set up in a way that causes the zone loop to run onMicrotaskEmpty twice
            // then verified that onStable is only called once at the end
            runNgZoneNoLog(function () { return macroTask(_log.fn('run')); });
            var times = 0;
            async_1.ObservableWrapper.subscribe(_zone.onMicrotaskEmpty, function (_) {
                times++;
                _log.add("onMicrotaskEmpty " + times);
                if (times < 2) {
                    // Scheduling a microtask causes a second digest
                    runNgZoneNoLog(function () { lang_1.scheduleMicroTask(function () { }); });
                }
            });
            macroTask(function () {
                testing_internal_1.expect(_log.result())
                    .toEqual('onUnstable; run; onMicrotaskEmpty; onMicrotaskEmpty 1; ' +
                    'onMicrotaskEmpty; onMicrotaskEmpty 2; onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.it('should call standalone onStable', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            runNgZoneNoLog(function () { return macroTask(_log.fn('run')); });
            macroTask(function () {
                testing_internal_1.expect(_log.result()).toEqual('onUnstable; run; onMicrotaskEmpty; onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.xit('should run subscriber listeners in the subscription zone (outside)', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            // Each subscriber fires a microtask outside the Angular zone. The test
            // then verifies that those microtasks do not cause additional digests.
            var turnStart = false;
            async_1.ObservableWrapper.subscribe(_zone.onUnstable, function (_) {
                if (turnStart)
                    throw 'Should not call this more than once';
                _log.add('onUnstable');
                lang_1.scheduleMicroTask(function () { });
                turnStart = true;
            });
            var turnDone = false;
            async_1.ObservableWrapper.subscribe(_zone.onMicrotaskEmpty, function (_) {
                if (turnDone)
                    throw 'Should not call this more than once';
                _log.add('onMicrotaskEmpty');
                lang_1.scheduleMicroTask(function () { });
                turnDone = true;
            });
            var eventDone = false;
            async_1.ObservableWrapper.subscribe(_zone.onStable, function (_) {
                if (eventDone)
                    throw 'Should not call this more than once';
                _log.add('onStable');
                lang_1.scheduleMicroTask(function () { });
                eventDone = true;
            });
            macroTask(function () { _zone.run(_log.fn('run')); });
            macroTask(function () {
                testing_internal_1.expect(_log.result()).toEqual('onUnstable; run; onMicrotaskEmpty; onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.it('should run subscriber listeners in the subscription zone (inside)', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            runNgZoneNoLog(function () { return macroTask(_log.fn('run')); });
            // the only practical use-case to run a callback inside the zone is
            // change detection after "onMicrotaskEmpty". That's the only case tested.
            var turnDone = false;
            async_1.ObservableWrapper.subscribe(_zone.onMicrotaskEmpty, function (_) {
                _log.add('onMyMicrotaskEmpty');
                if (turnDone)
                    return;
                _zone.run(function () { lang_1.scheduleMicroTask(function () { }); });
                turnDone = true;
            });
            macroTask(function () {
                testing_internal_1.expect(_log.result())
                    .toEqual('onUnstable; run; onMicrotaskEmpty; onMyMicrotaskEmpty; ' +
                    'onMicrotaskEmpty; onMyMicrotaskEmpty; onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.it('should run async tasks scheduled inside onStable outside Angular zone', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            runNgZoneNoLog(function () { return macroTask(_log.fn('run')); });
            async_1.ObservableWrapper.subscribe(_zone.onStable, function (_) {
                ng_zone_1.NgZone.assertNotInAngularZone();
                _log.add('onMyTaskDone');
            });
            macroTask(function () {
                testing_internal_1.expect(_log.result())
                    .toEqual('onUnstable; run; onMicrotaskEmpty; onStable; onMyTaskDone');
                async.done();
            });
        }), testTimeout);
        testing_internal_1.it('should call onUnstable once before a turn and onMicrotaskEmpty once after the turn', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            runNgZoneNoLog(function () {
                macroTask(function () {
                    _log.add('run start');
                    lang_1.scheduleMicroTask(_log.fn('async'));
                    _log.add('run end');
                });
            });
            macroTask(function () {
                // The microtask (async) is executed after the macrotask (run)
                testing_internal_1.expect(_log.result())
                    .toEqual('onUnstable; run start; run end; async; onMicrotaskEmpty; onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.it('should not run onUnstable and onMicrotaskEmpty for nested Zone.run', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            runNgZoneNoLog(function () {
                macroTask(function () {
                    _log.add('start run');
                    _zone.run(function () {
                        _log.add('nested run');
                        lang_1.scheduleMicroTask(_log.fn('nested run microtask'));
                    });
                    _log.add('end run');
                });
            });
            macroTask(function () {
                testing_internal_1.expect(_log.result())
                    .toEqual('onUnstable; start run; nested run; end run; nested run microtask; onMicrotaskEmpty; onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.it('should not run onUnstable and onMicrotaskEmpty for nested Zone.run invoked from onMicrotaskEmpty', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            runNgZoneNoLog(function () { return macroTask(_log.fn('start run')); });
            async_1.ObservableWrapper.subscribe(_zone.onMicrotaskEmpty, function (_) {
                _log.add('onMicrotaskEmpty:started');
                _zone.run(function () { return _log.add('nested run'); });
                _log.add('onMicrotaskEmpty:finished');
            });
            macroTask(function () {
                testing_internal_1.expect(_log.result())
                    .toEqual('onUnstable; start run; onMicrotaskEmpty; onMicrotaskEmpty:started; nested run; onMicrotaskEmpty:finished; onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.it('should call onUnstable and onMicrotaskEmpty before and after each top-level run', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            runNgZoneNoLog(function () { return macroTask(_log.fn('run1')); });
            runNgZoneNoLog(function () { return macroTask(_log.fn('run2')); });
            macroTask(function () {
                testing_internal_1.expect(_log.result())
                    .toEqual('onUnstable; run1; onMicrotaskEmpty; onStable; onUnstable; run2; onMicrotaskEmpty; onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.it('should call onUnstable and onMicrotaskEmpty before and after each turn', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var a;
            var b;
            runNgZoneNoLog(function () {
                macroTask(function () {
                    a = async_1.PromiseWrapper.completer();
                    b = async_1.PromiseWrapper.completer();
                    _log.add('run start');
                    a.promise.then(_log.fn('a then'));
                    b.promise.then(_log.fn('b then'));
                });
            });
            runNgZoneNoLog(function () {
                macroTask(function () {
                    a.resolve('a');
                    b.resolve('b');
                });
            });
            macroTask(function () {
                testing_internal_1.expect(_log.result())
                    .toEqual('onUnstable; run start; onMicrotaskEmpty; onStable; onUnstable; a then; b then; onMicrotaskEmpty; onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.it('should run a function outside of the angular zone', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            macroTask(function () { _zone.runOutsideAngular(_log.fn('run')); });
            macroTask(function () {
                testing_internal_1.expect(_log.result()).toEqual('run');
                async.done();
            });
        }), testTimeout);
        testing_internal_1.it('should call onUnstable and onMicrotaskEmpty when an inner microtask is scheduled from outside angular', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var completer;
            macroTask(function () {
                ng_zone_1.NgZone.assertNotInAngularZone();
                completer = async_1.PromiseWrapper.completer();
            });
            runNgZoneNoLog(function () {
                macroTask(function () {
                    ng_zone_1.NgZone.assertInAngularZone();
                    completer.promise.then(_log.fn('executedMicrotask'));
                });
            });
            macroTask(function () {
                ng_zone_1.NgZone.assertNotInAngularZone();
                _log.add('scheduling a microtask');
                completer.resolve(null);
            });
            macroTask(function () {
                testing_internal_1.expect(_log.result())
                    .toEqual(
                // First VM turn => setup Promise then
                'onUnstable; onMicrotaskEmpty; onStable; ' +
                    // Second VM turn (outside of angular)
                    'scheduling a microtask; onUnstable; ' +
                    // Third VM Turn => execute the microtask (inside angular)
                    // No onUnstable;  because we don't own the task which started the turn.
                    'executedMicrotask; onMicrotaskEmpty; onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.it('should call onUnstable only before executing a microtask scheduled in onMicrotaskEmpty ' +
            'and not onMicrotaskEmpty after executing the task', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            runNgZoneNoLog(function () { return macroTask(_log.fn('run')); });
            var ran = false;
            async_1.ObservableWrapper.subscribe(_zone.onMicrotaskEmpty, function (_) {
                _log.add('onMicrotaskEmpty(begin)');
                if (!ran) {
                    _zone.run(function () {
                        lang_1.scheduleMicroTask(function () {
                            ran = true;
                            _log.add('executedMicrotask');
                        });
                    });
                }
                _log.add('onMicrotaskEmpty(end)');
            });
            macroTask(function () {
                testing_internal_1.expect(_log.result())
                    .toEqual(
                // First VM turn => 'run' macrotask
                'onUnstable; run; onMicrotaskEmpty; onMicrotaskEmpty(begin); onMicrotaskEmpty(end); ' +
                    // Second microtaskDrain Turn => microtask enqueued from onMicrotaskEmpty
                    'executedMicrotask; onMicrotaskEmpty; onMicrotaskEmpty(begin); onMicrotaskEmpty(end); onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.it('should call onUnstable and onMicrotaskEmpty for a scheduleMicroTask in onMicrotaskEmpty triggered by ' +
            'a scheduleMicroTask in run', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            runNgZoneNoLog(function () {
                macroTask(function () {
                    _log.add('scheduleMicroTask');
                    lang_1.scheduleMicroTask(_log.fn('run(executeMicrotask)'));
                });
            });
            var ran = false;
            async_1.ObservableWrapper.subscribe(_zone.onMicrotaskEmpty, function (_) {
                _log.add('onMicrotaskEmpty(begin)');
                if (!ran) {
                    _log.add('onMicrotaskEmpty(scheduleMicroTask)');
                    _zone.run(function () {
                        lang_1.scheduleMicroTask(function () {
                            ran = true;
                            _log.add('onMicrotaskEmpty(executeMicrotask)');
                        });
                    });
                }
                _log.add('onMicrotaskEmpty(end)');
            });
            macroTask(function () {
                testing_internal_1.expect(_log.result())
                    .toEqual(
                // First VM Turn => a macrotask + the microtask it enqueues
                'onUnstable; scheduleMicroTask; run(executeMicrotask); onMicrotaskEmpty; onMicrotaskEmpty(begin); onMicrotaskEmpty(scheduleMicroTask); onMicrotaskEmpty(end); ' +
                    // Second VM Turn => the microtask enqueued from onMicrotaskEmpty
                    'onMicrotaskEmpty(executeMicrotask); onMicrotaskEmpty; onMicrotaskEmpty(begin); onMicrotaskEmpty(end); onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.it('should execute promises scheduled in onUnstable before promises scheduled in run', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            runNgZoneNoLog(function () {
                macroTask(function () {
                    _log.add('run start');
                    async_1.PromiseWrapper.resolve(null)
                        .then(function (_) {
                        _log.add('promise then');
                        async_1.PromiseWrapper.resolve(null).then(_log.fn('promise foo'));
                        return async_1.PromiseWrapper.resolve(null);
                    })
                        .then(_log.fn('promise bar'));
                    _log.add('run end');
                });
            });
            var donePromiseRan = false;
            var startPromiseRan = false;
            async_1.ObservableWrapper.subscribe(_zone.onUnstable, function (_) {
                _log.add('onUnstable(begin)');
                if (!startPromiseRan) {
                    _log.add('onUnstable(schedulePromise)');
                    _zone.run(function () { lang_1.scheduleMicroTask(_log.fn('onUnstable(executePromise)')); });
                    startPromiseRan = true;
                }
                _log.add('onUnstable(end)');
            });
            async_1.ObservableWrapper.subscribe(_zone.onMicrotaskEmpty, function (_) {
                _log.add('onMicrotaskEmpty(begin)');
                if (!donePromiseRan) {
                    _log.add('onMicrotaskEmpty(schedulePromise)');
                    _zone.run(function () { lang_1.scheduleMicroTask(_log.fn('onMicrotaskEmpty(executePromise)')); });
                    donePromiseRan = true;
                }
                _log.add('onMicrotaskEmpty(end)');
            });
            macroTask(function () {
                testing_internal_1.expect(_log.result())
                    .toEqual(
                // First VM turn: enqueue a microtask in onUnstable
                'onUnstable; onUnstable(begin); onUnstable(schedulePromise); onUnstable(end); ' +
                    // First VM turn: execute the macrotask which enqueues microtasks
                    'run start; run end; ' +
                    // First VM turn: execute enqueued microtasks
                    'onUnstable(executePromise); promise then; promise foo; promise bar; onMicrotaskEmpty; ' +
                    // First VM turn: onTurnEnd, enqueue a microtask
                    'onMicrotaskEmpty(begin); onMicrotaskEmpty(schedulePromise); onMicrotaskEmpty(end); ' +
                    // Second VM turn: execute the microtask from onTurnEnd
                    'onMicrotaskEmpty(executePromise); onMicrotaskEmpty; onMicrotaskEmpty(begin); onMicrotaskEmpty(end); onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.it('should call onUnstable and onMicrotaskEmpty before and after each turn, respectively', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var completerA;
            var completerB;
            runNgZoneNoLog(function () {
                macroTask(function () {
                    completerA = async_1.PromiseWrapper.completer();
                    completerB = async_1.PromiseWrapper.completer();
                    completerA.promise.then(_log.fn('a then'));
                    completerB.promise.then(_log.fn('b then'));
                    _log.add('run start');
                });
            });
            runNgZoneNoLog(function () { macroTask(function () { completerA.resolve(null); }, 10); });
            runNgZoneNoLog(function () { macroTask(function () { completerB.resolve(null); }, 20); });
            macroTask(function () {
                testing_internal_1.expect(_log.result())
                    .toEqual(
                // First VM turn
                'onUnstable; run start; onMicrotaskEmpty; onStable; ' +
                    // Second VM turn
                    'onUnstable; a then; onMicrotaskEmpty; onStable; ' +
                    // Third VM turn
                    'onUnstable; b then; onMicrotaskEmpty; onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.it('should call onUnstable and onMicrotaskEmpty before and after (respectively) all turns in a chain', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            runNgZoneNoLog(function () {
                macroTask(function () {
                    _log.add('run start');
                    lang_1.scheduleMicroTask(function () {
                        _log.add('async1');
                        lang_1.scheduleMicroTask(_log.fn('async2'));
                    });
                    _log.add('run end');
                });
            });
            macroTask(function () {
                testing_internal_1.expect(_log.result())
                    .toEqual('onUnstable; run start; run end; async1; async2; onMicrotaskEmpty; onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
        testing_internal_1.it('should call onUnstable and onMicrotaskEmpty for promises created outside of run body', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var promise;
            runNgZoneNoLog(function () {
                macroTask(function () {
                    _zone.runOutsideAngular(function () {
                        promise = async_1.PromiseWrapper.resolve(4).then(function (x) { return async_1.PromiseWrapper.resolve(x); });
                    });
                    promise.then(_log.fn('promise then'));
                    _log.add('zone run');
                });
            });
            macroTask(function () {
                testing_internal_1.expect(_log.result())
                    .toEqual('onUnstable; zone run; onMicrotaskEmpty; onStable; ' +
                    'onUnstable; promise then; onMicrotaskEmpty; onStable');
                async.done();
            }, resultTimer);
        }), testTimeout);
    });
    testing_internal_1.describe('exceptions', function () {
        testing_internal_1.it('should call the on error callback when it is invoked via zone.runGuarded', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            macroTask(function () {
                var exception = new exceptions_1.BaseException('sync');
                _zone.runGuarded(function () { throw exception; });
                testing_internal_1.expect(_errors.length).toBe(1);
                testing_internal_1.expect(_errors[0]).toBe(exception);
                async.done();
            });
        }), testTimeout);
        testing_internal_1.it('should not call the on error callback but rethrow when it is invoked via zone.run', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            macroTask(function () {
                var exception = new exceptions_1.BaseException('sync');
                testing_internal_1.expect(function () { return _zone.run(function () { throw exception; }); }).toThrowError('sync');
                testing_internal_1.expect(_errors.length).toBe(0);
                async.done();
            });
        }), testTimeout);
        testing_internal_1.it('should call onError for errors from microtasks', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            var exception = new exceptions_1.BaseException('async');
            macroTask(function () { _zone.run(function () { lang_1.scheduleMicroTask(function () { throw exception; }); }); });
            macroTask(function () {
                testing_internal_1.expect(_errors.length).toBe(1);
                testing_internal_1.expect(_errors[0]).toEqual(exception);
                async.done();
            }, resultTimer);
        }), testTimeout);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfem9uZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3Qvem9uZS9uZ196b25lX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUFpSCx3Q0FBd0MsQ0FBQyxDQUFBO0FBRTFKLHdCQUFrQyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQ25FLDZCQUErQixnREFBZ0QsQ0FBQyxDQUFBO0FBRWhGLHNCQUFnRix3QkFBd0IsQ0FBQyxDQUFBO0FBQ3pHLDJCQUE0Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBQzFELHFCQUEyQyx1QkFBdUIsQ0FBQyxDQUFBO0FBRW5FLElBQUksaUJBQWlCLEdBQUcsK0JBQWdCLENBQUMsTUFBTSxJQUFJLCtCQUFnQixDQUFDLE1BQU0sQ0FBQztBQUMzRSxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7QUFDdkIsSUFBSSxXQUFXLEdBQUcsK0JBQWdCLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7QUFDdkQsd0NBQXdDO0FBQ3hDLG1CQUFtQixFQUE0QixFQUFFLEtBQVM7SUFBVCxxQkFBUyxHQUFULFNBQVM7SUFDeEQsc0RBQXNEO0lBQ3RELG9CQUFZLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxpQkFBaUIsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDN0QsQ0FBQztBQUVELElBQUksSUFBUyxDQUFDO0FBQ2QsSUFBSSxPQUFjLENBQUM7QUFDbkIsSUFBSSxPQUFjLENBQUM7QUFDbkIsSUFBSSxLQUFhLENBQUM7QUFFbEI7SUFDRSx5QkFBaUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFDLEtBQWtCO1FBQzVELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQUVEO0lBQ0UseUJBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFFRDtJQUNFLHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDbkYsQ0FBQztBQUVEO0lBQ0UseUJBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ25FLENBQUM7QUFFRCx3QkFBd0IsRUFBYTtJQUNuQyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztJQUNsQyxJQUFJLENBQUM7UUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2QixDQUFDO1lBQVMsQ0FBQztRQUNULGdEQUFnRDtRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDaEMsQ0FBQztBQUNILENBQUM7QUFFRDtJQUNFLDJCQUFRLENBQUMsUUFBUSxFQUFFO1FBRWpCLG9CQUFvQixvQkFBNkI7WUFDL0MsTUFBTSxDQUFDLElBQUksZ0JBQU0sQ0FBQyxFQUFDLG9CQUFvQixFQUFFLG9CQUFvQixFQUFDLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBRUQsNkJBQVUsQ0FBQztZQUNULElBQUksR0FBRyxJQUFJLHNCQUFHLEVBQUUsQ0FBQztZQUNqQixPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2IsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO1FBRUgsMkJBQVEsQ0FBQyxrQkFBa0IsRUFBRTtZQUMzQiw2QkFBVSxDQUFDO2dCQUNULEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3pCLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixtQkFBbUIsRUFBRSxDQUFDO2dCQUN0QixXQUFXLEVBQUUsQ0FBQztnQkFDZCxVQUFVLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1lBRUgsV0FBVyxFQUFFLENBQUM7WUFFZCxxQkFBRSxDQUFDLGtDQUFrQyxFQUNsQyx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO2dCQUNyRCxTQUFTLENBQUM7b0JBQ1IsSUFBSSxDQUFDLEdBQTBCLHNCQUFjLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBRTFELEtBQUssQ0FBQyxHQUFHLENBQUM7d0JBQ1Isb0JBQVksQ0FBQyxVQUFVLENBQUM7NEJBQ3RCLG9CQUFZLENBQUMsVUFBVSxDQUFDO2dDQUN0QixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNoQixNQUFNLElBQUksMEJBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDakMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNSLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDUixDQUFDLENBQUMsQ0FBQztvQkFFSCxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUM7d0JBQ2YseUJBQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQix5QkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDZixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1lBRXBCLHFCQUFFLENBQUMsMERBQTBELEVBQzFELHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7Z0JBQ3JELFNBQVMsQ0FBQztvQkFDUixJQUFJLENBQUMsR0FBMEIsc0JBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFFMUQsS0FBSyxDQUFDLEdBQUcsQ0FBQzt3QkFDUix3QkFBaUIsQ0FBQzs0QkFDaEIsd0JBQWlCLENBQUM7Z0NBQ2hCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7Z0NBQ2hCLE1BQU0sSUFBSSwwQkFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNqQyxDQUFDLENBQUMsQ0FBQzt3QkFDTCxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztvQkFFSCxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUM7d0JBQ2YseUJBQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQix5QkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzdDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDZixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRUgsMkJBQVEsQ0FBQyxtQkFBbUIsRUFBRTtZQUM1Qiw2QkFBVSxDQUFDO2dCQUNULEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFCLGFBQWEsRUFBRSxDQUFDO2dCQUNoQixtQkFBbUIsRUFBRSxDQUFDO2dCQUN0QixXQUFXLEVBQUUsQ0FBQztnQkFDZCxVQUFVLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1lBRUgsV0FBVyxFQUFFLENBQUM7WUFFZCxxQkFBRSxDQUFDLGtDQUFrQyxFQUNsQyx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO2dCQUNyRCxTQUFTLENBQUM7b0JBQ1IsSUFBSSxDQUFDLEdBQTBCLHNCQUFjLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBRTFELEtBQUssQ0FBQyxHQUFHLENBQUM7d0JBQ1Isb0JBQVksQ0FBQyxVQUFVLENBQUM7NEJBQ3RCLG9CQUFZLENBQUMsVUFBVSxDQUFDO2dDQUN0QixDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2dDQUNoQixNQUFNLElBQUksMEJBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDakMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO3dCQUNSLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDUixDQUFDLENBQUMsQ0FBQztvQkFFSCxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUM7d0JBQ2YseUJBQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMvQixFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDMUIseUNBQXlDOzRCQUN6Qyx5QkFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEQsQ0FBQzt3QkFDRCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ2YsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN0QixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQTFHZSxZQUFJLE9BMEduQixDQUFBO0FBRUQ7SUFDRSwyQkFBUSxDQUFDLHNCQUFzQixFQUFFO1FBQy9CLHFCQUFFLENBQUMsaUJBQWlCLEVBQUUsY0FBUSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpGLHFCQUFFLENBQUMsZ0JBQWdCLEVBQUU7WUFDbkIsY0FBYyxDQUFDLGNBQVEsd0JBQWlCLENBQUMsY0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELHlCQUFNLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCwyQkFBUSxDQUFDLGtCQUFrQixFQUFFO1FBQzNCLHFCQUFFLENBQUMsaUJBQWlCLEVBQUUsY0FBUSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpGLHFCQUFFLENBQUMsZ0JBQWdCLEVBQUU7WUFDbkIsY0FBYyxDQUFDLGNBQVEsb0JBQVksQ0FBQyxVQUFVLENBQUMsY0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsMkJBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixxQkFBRSxDQUFDLGlCQUFpQixFQUFFLGNBQVEseUJBQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVqRixxQkFBRSxDQUFDLDRDQUE0QyxFQUFFO1lBQy9DLGNBQWMsQ0FBQyxjQUFRLHdCQUFpQixDQUFDLGNBQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCx5QkFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsd0NBQXdDLEVBQUU7WUFDM0MsY0FBYyxDQUFDLGNBQVEsb0JBQVksQ0FBQyxVQUFVLENBQUMsY0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRSx5QkFBTSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsMkJBQVEsQ0FBQyxlQUFlLEVBQUU7UUFDeEIscUJBQUUsQ0FBQywyREFBMkQsRUFBRTtZQUM5RCx5QkFBTSxDQUFDLGdCQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDaEQsY0FBYyxDQUFDLGNBQVEseUJBQU0sQ0FBQyxnQkFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2xCLENBQUMsQ0FBQyxDQUFDO0lBRUgsMkJBQVEsQ0FBQyxLQUFLLEVBQUU7UUFDZCxxQkFBRSxDQUFDLDhDQUE4QyxFQUM5Qyx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ3JELFNBQVMsQ0FBQyxjQUFRLHlCQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxjQUFRLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRXhFLFNBQVMsQ0FBQyxjQUFRLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXBCLHFCQUFFLENBQUMsNkNBQTZDLEVBQzdDLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsY0FBYyxDQUFDLGNBQU0sT0FBQSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7WUFDaEQsU0FBUyxDQUFDO2dCQUNSLHlCQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7Z0JBQzdFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFcEIscUJBQUUsQ0FBQywrQ0FBK0MsRUFDL0MseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxzRkFBc0Y7WUFDdEYsNkRBQTZEO1lBRTdELGNBQWMsQ0FBQyxjQUFNLE9BQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1lBRWhELElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUNkLHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxDQUFDO2dCQUNwRCxLQUFLLEVBQUUsQ0FBQztnQkFDUixJQUFJLENBQUMsR0FBRyxDQUFDLHNCQUFvQixLQUFPLENBQUMsQ0FBQztnQkFDdEMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2QsZ0RBQWdEO29CQUNoRCxjQUFjLENBQUMsY0FBUSx3QkFBaUIsQ0FBQyxjQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pELENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILFNBQVMsQ0FBQztnQkFDUix5QkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDaEIsT0FBTyxDQUNKLHlEQUF5RDtvQkFDekQsZ0RBQWdELENBQUMsQ0FBQztnQkFDMUQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXBCLHFCQUFFLENBQUMsaUNBQWlDLEVBQ2pDLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsY0FBYyxDQUFDLGNBQU0sT0FBQSxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUF6QixDQUF5QixDQUFDLENBQUM7WUFFaEQsU0FBUyxDQUFDO2dCQUNSLHlCQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7Z0JBQzdFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVwQixzQkFBRyxDQUFDLG9FQUFvRSxFQUNwRSx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ3JELHVFQUF1RTtZQUN2RSx1RUFBdUU7WUFFdkUsSUFBSSxTQUFTLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLFVBQUMsQ0FBQztnQkFDOUMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDO29CQUFDLE1BQU0scUNBQXFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3ZCLHdCQUFpQixDQUFDLGNBQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLFNBQVMsR0FBRyxJQUFJLENBQUM7WUFDbkIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDckIseUJBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxVQUFDLENBQUM7Z0JBQ3BELEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztvQkFBQyxNQUFNLHFDQUFxQyxDQUFDO2dCQUMxRCxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQzdCLHdCQUFpQixDQUFDLGNBQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzVCLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdEIseUJBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBQyxDQUFDO2dCQUM1QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQUMsTUFBTSxxQ0FBcUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDckIsd0JBQWlCLENBQUMsY0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsU0FBUyxHQUFHLElBQUksQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztZQUVILFNBQVMsQ0FBQyxjQUFRLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFaEQsU0FBUyxDQUFDO2dCQUNSLHlCQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7Z0JBQzdFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVyQixxQkFBRSxDQUFDLG1FQUFtRSxFQUNuRSx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ3JELGNBQWMsQ0FBQyxjQUFNLE9BQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1lBRWhELG1FQUFtRTtZQUNuRSwwRUFBMEU7WUFDMUUsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7Z0JBQy9CLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztvQkFBQyxNQUFNLENBQUM7Z0JBQ3JCLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBUSx3QkFBaUIsQ0FBQyxjQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDbEIsQ0FBQyxDQUFDLENBQUM7WUFFSCxTQUFTLENBQUM7Z0JBQ1IseUJBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ2hCLE9BQU8sQ0FDSix5REFBeUQ7b0JBQ3pELGdEQUFnRCxDQUFDLENBQUM7Z0JBQzFELEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVwQixxQkFBRSxDQUFDLHVFQUF1RSxFQUN2RSx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ3JELGNBQWMsQ0FBQyxjQUFNLE9BQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDO1lBRWhELHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLFVBQUMsQ0FBQztnQkFDNUMsZ0JBQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1lBRUgsU0FBUyxDQUFDO2dCQUNSLHlCQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUNoQixPQUFPLENBQUMsMkRBQTJELENBQUMsQ0FBQztnQkFDMUUsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVwQixxQkFBRSxDQUFDLG9GQUFvRixFQUNwRix5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ3JELGNBQWMsQ0FBQztnQkFDYixTQUFTLENBQUM7b0JBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDdEIsd0JBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUNwQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsU0FBUyxDQUFDO2dCQUNSLDhEQUE4RDtnQkFDOUQseUJBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ2hCLE9BQU8sQ0FBQyxtRUFBbUUsQ0FBQyxDQUFDO2dCQUNsRixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFcEIscUJBQUUsQ0FBQyxvRUFBb0UsRUFDcEUseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxjQUFjLENBQUM7Z0JBQ2IsU0FBUyxDQUFDO29CQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3RCLEtBQUssQ0FBQyxHQUFHLENBQUM7d0JBQ1IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQzt3QkFDdkIsd0JBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7b0JBQ3JELENBQUMsQ0FBQyxDQUFDO29CQUNILElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3RCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxTQUFTLENBQUM7Z0JBQ1IseUJBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ2hCLE9BQU8sQ0FDSiw4RkFBOEYsQ0FBQyxDQUFDO2dCQUN4RyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFcEIscUJBQUUsQ0FBQyxrR0FBa0csRUFDbEcseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxjQUFjLENBQUMsY0FBTSxPQUFBLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEVBQS9CLENBQStCLENBQUMsQ0FBQztZQUV0RCx5QkFBaUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLFVBQUMsQ0FBQztnQkFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2dCQUNyQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxJQUFJLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztZQUVILFNBQVMsQ0FBQztnQkFDUix5QkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDaEIsT0FBTyxDQUNKLG9IQUFvSCxDQUFDLENBQUM7Z0JBQzlILEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVwQixxQkFBRSxDQUFDLGlGQUFpRixFQUNqRix5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ3JELGNBQWMsQ0FBQyxjQUFNLE9BQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO1lBQ2pELGNBQWMsQ0FBQyxjQUFNLE9BQUEsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO1lBRWpELFNBQVMsQ0FBQztnQkFDUix5QkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDaEIsT0FBTyxDQUNKLDRGQUE0RixDQUFDLENBQUM7Z0JBQ3RHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVwQixxQkFBRSxDQUFDLHdFQUF3RSxFQUN4RSx5QkFBTSxDQUFDLENBQUMscUNBQWtCLENBQUMsRUFBRSxVQUFDLEtBQXlCO1lBQ3JELElBQUksQ0FBMkIsQ0FBQztZQUNoQyxJQUFJLENBQTJCLENBQUM7WUFFaEMsY0FBYyxDQUFDO2dCQUNiLFNBQVMsQ0FBQztvQkFDUixDQUFDLEdBQUcsc0JBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDL0IsQ0FBQyxHQUFHLHNCQUFjLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBRS9CLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3RCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztvQkFDbEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsY0FBYyxDQUFDO2dCQUNiLFNBQVMsQ0FBQztvQkFDUixDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNmLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxTQUFTLENBQUM7Z0JBQ1IseUJBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ2hCLE9BQU8sQ0FDSiwyR0FBMkcsQ0FBQyxDQUFDO2dCQUNySCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFcEIscUJBQUUsQ0FBQyxtREFBbUQsRUFDbkQseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxTQUFTLENBQUMsY0FBUSxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFOUQsU0FBUyxDQUFDO2dCQUNSLHlCQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNyQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXBCLHFCQUFFLENBQUMsdUdBQXVHLEVBQ3ZHLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsSUFBSSxTQUFnQyxDQUFDO1lBRXJDLFNBQVMsQ0FBQztnQkFDUixnQkFBTSxDQUFDLHNCQUFzQixFQUFFLENBQUM7Z0JBQ2hDLFNBQVMsR0FBRyxzQkFBYyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3pDLENBQUMsQ0FBQyxDQUFDO1lBRUgsY0FBYyxDQUFDO2dCQUNiLFNBQVMsQ0FBQztvQkFDUixnQkFBTSxDQUFDLG1CQUFtQixFQUFFLENBQUM7b0JBQzdCLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUN2RCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsU0FBUyxDQUFDO2dCQUNSLGdCQUFNLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztnQkFDaEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUNuQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1lBRUgsU0FBUyxDQUFDO2dCQUNSLHlCQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUNoQixPQUFPO2dCQUNKLHNDQUFzQztnQkFDdEMsMENBQTBDO29CQUMxQyxzQ0FBc0M7b0JBQ3RDLHNDQUFzQztvQkFDdEMsMERBQTBEO29CQUMxRCx3RUFBd0U7b0JBQ3hFLCtDQUErQyxDQUFDLENBQUM7Z0JBQ3pELEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUVwQixxQkFBRSxDQUFDLHlGQUF5RjtZQUNyRixtREFBbUQsRUFDdkQseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxjQUFjLENBQUMsY0FBTSxPQUFBLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztZQUVoRCxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7WUFDaEIseUJBQWlCLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxVQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxHQUFHLENBQUMseUJBQXlCLENBQUMsQ0FBQztnQkFFcEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUNULEtBQUssQ0FBQyxHQUFHLENBQUM7d0JBQ1Isd0JBQWlCLENBQUM7NEJBQ2hCLEdBQUcsR0FBRyxJQUFJLENBQUM7NEJBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO3dCQUNoQyxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUVELElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztZQUVILFNBQVMsQ0FBQztnQkFDUix5QkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDaEIsT0FBTztnQkFDSixtQ0FBbUM7Z0JBQ25DLHFGQUFxRjtvQkFDckYseUVBQXlFO29CQUN6RSwrRkFBK0YsQ0FBQyxDQUFDO2dCQUN6RyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFcEIscUJBQUUsQ0FBQyx1R0FBdUc7WUFDbkcsNEJBQTRCLEVBQ2hDLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsY0FBYyxDQUFDO2dCQUNiLFNBQVMsQ0FBQztvQkFDUixJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBQzlCLHdCQUFpQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUFDO2dCQUN0RCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBQ2hCLHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7Z0JBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDVCxJQUFJLENBQUMsR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7b0JBQ2hELEtBQUssQ0FBQyxHQUFHLENBQUM7d0JBQ1Isd0JBQWlCLENBQUM7NEJBQ2hCLEdBQUcsR0FBRyxJQUFJLENBQUM7NEJBQ1gsSUFBSSxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO3dCQUNqRCxDQUFDLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDO2dCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztZQUVILFNBQVMsQ0FBQztnQkFDUix5QkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDaEIsT0FBTztnQkFDSiwyREFBMkQ7Z0JBQzNELCtKQUErSjtvQkFDL0osaUVBQWlFO29CQUNqRSxnSEFBZ0gsQ0FBQyxDQUFDO2dCQUMxSCxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFcEIscUJBQUUsQ0FBQyxrRkFBa0YsRUFDbEYseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxjQUFjLENBQUM7Z0JBQ2IsU0FBUyxDQUFDO29CQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ3RCLHNCQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzt5QkFDdkIsSUFBSSxDQUFDLFVBQUMsQ0FBQzt3QkFDTixJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDO3dCQUN6QixzQkFBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO3dCQUMxRCxNQUFNLENBQUMsc0JBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3RDLENBQUMsQ0FBQzt5QkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxjQUFjLEdBQUcsS0FBSyxDQUFDO1lBQzNCLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztZQUU1Qix5QkFBaUIsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxVQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztnQkFDOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO29CQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7b0JBQ3hDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBUSx3QkFBaUIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLDRCQUE0QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMvRSxlQUFlLEdBQUcsSUFBSSxDQUFDO2dCQUN6QixDQUFDO2dCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUVILHlCQUFpQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUUsVUFBQyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7Z0JBQ3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO29CQUM5QyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQVEsd0JBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckYsY0FBYyxHQUFHLElBQUksQ0FBQztnQkFDeEIsQ0FBQztnQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDcEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxTQUFTLENBQUM7Z0JBQ1IseUJBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ2hCLE9BQU87Z0JBQ0osbURBQW1EO2dCQUNuRCwrRUFBK0U7b0JBQy9FLGlFQUFpRTtvQkFDakUsc0JBQXNCO29CQUN0Qiw2Q0FBNkM7b0JBQzdDLHdGQUF3RjtvQkFDeEYsZ0RBQWdEO29CQUNoRCxxRkFBcUY7b0JBQ3JGLHVEQUF1RDtvQkFDdkQsOEdBQThHLENBQUMsQ0FBQztnQkFDeEgsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXBCLHFCQUFFLENBQUMsc0ZBQXNGLEVBQ3RGLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsSUFBSSxVQUFpQyxDQUFDO1lBQ3RDLElBQUksVUFBaUMsQ0FBQztZQUV0QyxjQUFjLENBQUM7Z0JBQ2IsU0FBUyxDQUFDO29CQUNSLFVBQVUsR0FBRyxzQkFBYyxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUN4QyxVQUFVLEdBQUcsc0JBQWMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDeEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzNDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ3hCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxjQUFjLENBQUMsY0FBUSxTQUFTLENBQUMsY0FBUSxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFOUUsY0FBYyxDQUFDLGNBQVEsU0FBUyxDQUFDLGNBQVEsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTlFLFNBQVMsQ0FBQztnQkFDUix5QkFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDaEIsT0FBTztnQkFDSixnQkFBZ0I7Z0JBQ2hCLHFEQUFxRDtvQkFDckQsaUJBQWlCO29CQUNqQixrREFBa0Q7b0JBQ2xELGdCQUFnQjtvQkFDaEIsZ0RBQWdELENBQUMsQ0FBQztnQkFDMUQsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXBCLHFCQUFFLENBQUMsa0dBQWtHLEVBQ2xHLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsY0FBYyxDQUFDO2dCQUNiLFNBQVMsQ0FBQztvQkFDUixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUN0Qix3QkFBaUIsQ0FBQzt3QkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzt3QkFDbkIsd0JBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO29CQUN2QyxDQUFDLENBQUMsQ0FBQztvQkFDSCxJQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN0QixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsU0FBUyxDQUFDO2dCQUNSLHlCQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUNoQixPQUFPLENBQ0osNEVBQTRFLENBQUMsQ0FBQztnQkFDdEYsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXBCLHFCQUFFLENBQUMsc0ZBQXNGLEVBQ3RGLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsSUFBSSxPQUFxQixDQUFDO1lBRTFCLGNBQWMsQ0FBQztnQkFDYixTQUFTLENBQUM7b0JBQ1IsS0FBSyxDQUFDLGlCQUFpQixDQUFDO3dCQUN0QixPQUFPLEdBQUcsc0JBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsc0JBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztvQkFDN0UsQ0FBQyxDQUFDLENBQUM7b0JBRUgsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7b0JBQ3RDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxTQUFTLENBQUM7Z0JBQ1IseUJBQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ2hCLE9BQU8sQ0FDSixvREFBb0Q7b0JBQ3BELHNEQUFzRCxDQUFDLENBQUM7Z0JBQ2hFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNsQixDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztJQUVILDJCQUFRLENBQUMsWUFBWSxFQUFFO1FBQ3JCLHFCQUFFLENBQUMsMEVBQTBFLEVBQzFFLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsU0FBUyxDQUFDO2dCQUNSLElBQUksU0FBUyxHQUFHLElBQUksMEJBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFMUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxjQUFRLE1BQU0sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTdDLHlCQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IseUJBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ25DLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFcEIscUJBQUUsQ0FBQyxtRkFBbUYsRUFDbkYseUJBQU0sQ0FBQyxDQUFDLHFDQUFrQixDQUFDLEVBQUUsVUFBQyxLQUF5QjtZQUNyRCxTQUFTLENBQUM7Z0JBQ1IsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyx5QkFBTSxDQUFDLGNBQU0sT0FBQSxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQVEsTUFBTSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFFekUseUJBQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXBCLHFCQUFFLENBQUMsZ0RBQWdELEVBQ2hELHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsSUFBSSxTQUFTLEdBQUcsSUFBSSwwQkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRTNDLFNBQVMsQ0FBQyxjQUFRLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBUSx3QkFBaUIsQ0FBQyxjQUFRLE1BQU0sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTFGLFNBQVMsQ0FBQztnQkFDUix5QkFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9CLHlCQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN0QyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDZixDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDIn0=