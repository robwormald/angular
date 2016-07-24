/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var collection_1 = require('../src/facade/collection');
var lang_1 = require('../src/facade/lang');
var async_test_completer_1 = require('./async_test_completer');
var test_bed_1 = require('./test_bed');
var async_test_completer_2 = require('./async_test_completer');
exports.AsyncTestCompleter = async_test_completer_2.AsyncTestCompleter;
var mock_animation_player_1 = require('./mock_animation_player');
exports.MockAnimationPlayer = mock_animation_player_1.MockAnimationPlayer;
var test_bed_2 = require('./test_bed');
exports.inject = test_bed_2.inject;
__export(require('./logger'));
__export(require('./ng_zone_mock'));
__export(require('./mock_application_ref'));
exports.proxy = function (t /** TODO #9100 */) { return t; };
var _global = (typeof window === 'undefined' ? lang_1.global : window);
exports.afterEach = _global.afterEach;
exports.expect = _global.expect;
var jsmBeforeEach = _global.beforeEach;
var jsmDescribe = _global.describe;
var jsmDDescribe = _global.fdescribe;
var jsmXDescribe = _global.xdescribe;
var jsmIt = _global.it;
var jsmIIt = _global.fit;
var jsmXIt = _global.xit;
var runnerStack = [];
var inIt = false;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;
var globalTimeOut = jasmine.DEFAULT_TIMEOUT_INTERVAL;
var testBed = test_bed_1.getTestBed();
/**
 * Mechanism to run `beforeEach()` functions of Angular tests.
 *
 * Note: Jasmine own `beforeEach` is used by this library to handle DI providers.
 */
var BeforeEachRunner = (function () {
    function BeforeEachRunner(_parent) {
        this._parent = _parent;
        this._fns = [];
    }
    BeforeEachRunner.prototype.beforeEach = function (fn) { this._fns.push(fn); };
    BeforeEachRunner.prototype.run = function () {
        if (this._parent)
            this._parent.run();
        this._fns.forEach(function (fn) { fn(); });
    };
    return BeforeEachRunner;
}());
// Reset the test providers before each test
jsmBeforeEach(function () { testBed.reset(); });
function _describe(jsmFn /** TODO #9100 */) {
    var args = []; /** TODO #9100 */
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var parentRunner = runnerStack.length === 0 ? null : runnerStack[runnerStack.length - 1];
    var runner = new BeforeEachRunner(parentRunner);
    runnerStack.push(runner);
    var suite = jsmFn.apply(void 0, args);
    runnerStack.pop();
    return suite;
}
function describe() {
    var args = []; /** TODO #9100 */
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return _describe.apply(void 0, [jsmDescribe].concat(args));
}
exports.describe = describe;
function ddescribe() {
    var args = []; /** TODO #9100 */
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return _describe.apply(void 0, [jsmDDescribe].concat(args));
}
exports.ddescribe = ddescribe;
function xdescribe() {
    var args = []; /** TODO #9100 */
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return _describe.apply(void 0, [jsmXDescribe].concat(args));
}
exports.xdescribe = xdescribe;
function beforeEach(fn) {
    if (runnerStack.length > 0) {
        // Inside a describe block, beforeEach() uses a BeforeEachRunner
        runnerStack[runnerStack.length - 1].beforeEach(fn);
    }
    else {
        // Top level beforeEach() are delegated to jasmine
        jsmBeforeEach(fn);
    }
}
exports.beforeEach = beforeEach;
/**
 * Allows overriding default providers defined in test_injector.js.
 *
 * The given function must return a list of DI providers.
 *
 * Example:
 *
 *   beforeEachProviders(() => [
 *     {provide: Compiler, useClass: MockCompiler},
 *     {provide: SomeToken, useValue: myValue},
 *   ]);
 */
function beforeEachProviders(fn /** TODO #9100 */) {
    jsmBeforeEach(function () {
        var providers = fn();
        if (!providers)
            return;
        testBed.configureModule({ providers: providers });
    });
}
exports.beforeEachProviders = beforeEachProviders;
/**
 * @deprecated
 */
function beforeEachBindings(fn /** TODO #9100 */) {
    beforeEachProviders(fn);
}
exports.beforeEachBindings = beforeEachBindings;
function _it(jsmFn, name, testFn, testTimeOut) {
    if (runnerStack.length == 0) {
        // This left here intentionally, as we should never get here, and it aids debugging.
        debugger;
        throw new Error('Empty Stack!');
    }
    var runner = runnerStack[runnerStack.length - 1];
    var timeOut = lang_1.Math.max(globalTimeOut, testTimeOut);
    jsmFn(name, function (done /** TODO #9100 */) {
        var completerProvider = {
            provide: async_test_completer_1.AsyncTestCompleter,
            useFactory: function () {
                // Mark the test as async when an AsyncTestCompleter is injected in an it()
                return new async_test_completer_1.AsyncTestCompleter();
            }
        };
        testBed.configureModule({ providers: [completerProvider] });
        runner.run();
        inIt = true;
        if (testFn.length == 0) {
            var retVal = testFn();
            if (lang_1.isPromise(retVal)) {
                // Asynchronous test function that returns a Promise - wait for completion.
                retVal.then(done, done.fail);
            }
            else {
                // Synchronous test function - complete immediately.
                done();
            }
        }
        else {
            // Asynchronous test function that takes in 'done' parameter.
            testFn(done);
        }
        inIt = false;
    }, timeOut);
}
function it(name /** TODO #9100 */, fn /** TODO #9100 */, timeOut) {
    if (timeOut === void 0) { timeOut = null; }
    return _it(jsmIt, name, fn, timeOut);
}
exports.it = it;
function xit(name /** TODO #9100 */, fn /** TODO #9100 */, timeOut) {
    if (timeOut === void 0) { timeOut = null; }
    return _it(jsmXIt, name, fn, timeOut);
}
exports.xit = xit;
function iit(name /** TODO #9100 */, fn /** TODO #9100 */, timeOut) {
    if (timeOut === void 0) { timeOut = null; }
    return _it(jsmIIt, name, fn, timeOut);
}
exports.iit = iit;
var SpyObject = (function () {
    function SpyObject(type) {
        if (type === void 0) { type = null; }
        if (type) {
            for (var prop in type.prototype) {
                var m = null;
                try {
                    m = type.prototype[prop];
                }
                catch (e) {
                }
                if (typeof m === 'function') {
                    this.spy(prop);
                }
            }
        }
    }
    // Noop so that SpyObject has the same interface as in Dart
    SpyObject.prototype.noSuchMethod = function (args /** TODO #9100 */) { };
    SpyObject.prototype.spy = function (name /** TODO #9100 */) {
        if (!this[name]) {
            this[name] = this._createGuinnessCompatibleSpy(name);
        }
        return this[name];
    };
    SpyObject.prototype.prop = function (name /** TODO #9100 */, value /** TODO #9100 */) {
        this[name] = value;
    };
    SpyObject.stub = function (object, config, overrides) {
        if (object === void 0) { object = null; }
        if (config === void 0) { config = null; }
        if (overrides === void 0) { overrides = null; }
        if (!(object instanceof SpyObject)) {
            overrides = config;
            config = object;
            object = new SpyObject();
        }
        var m = collection_1.StringMapWrapper.merge(config, overrides);
        collection_1.StringMapWrapper.forEach(m, function (value /** TODO #9100 */, key /** TODO #9100 */) {
            object.spy(key).andReturn(value);
        });
        return object;
    };
    /** @internal */
    SpyObject.prototype._createGuinnessCompatibleSpy = function (name /** TODO #9100 */) {
        var newSpy = jasmine.createSpy(name);
        newSpy.andCallFake = newSpy.and.callFake;
        newSpy.andReturn = newSpy.and.returnValue;
        newSpy.reset = newSpy.calls.reset;
        // revisit return null here (previously needed for rtts_assert).
        newSpy.and.returnValue(null);
        return newSpy;
    };
    return SpyObject;
}());
exports.SpyObject = SpyObject;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZ19pbnRlcm5hbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0aW5nL3Rlc3RpbmdfaW50ZXJuYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7OztBQUdILDJCQUErQiwwQkFBMEIsQ0FBQyxDQUFBO0FBQzFELHFCQUFrRCxvQkFBb0IsQ0FBQyxDQUFBO0FBRXZFLHFDQUFpQyx3QkFBd0IsQ0FBQyxDQUFBO0FBQzFELHlCQUFpQyxZQUFZLENBQUMsQ0FBQTtBQUU5QyxxQ0FBaUMsd0JBQXdCLENBQUM7QUFBbEQsdUVBQWtEO0FBQzFELHNDQUFrQyx5QkFBeUIsQ0FBQztBQUFwRCwwRUFBb0Q7QUFDNUQseUJBQXFCLFlBQVksQ0FBQztBQUExQixtQ0FBMEI7QUFDbEMsaUJBQWMsVUFBVSxDQUFDLEVBQUE7QUFDekIsaUJBQWMsZ0JBQWdCLENBQUMsRUFBQTtBQUMvQixpQkFBYyx3QkFBd0IsQ0FBQyxFQUFBO0FBRTVCLGFBQUssR0FBbUIsVUFBQyxDQUFNLENBQUMsaUJBQWlCLElBQUssT0FBQSxDQUFDLEVBQUQsQ0FBQyxDQUFDO0FBRW5FLElBQUksT0FBTyxHQUFRLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxHQUFHLGFBQU0sR0FBRyxNQUFNLENBQUMsQ0FBQztBQUUxRCxpQkFBUyxHQUFhLE9BQU8sQ0FBQyxTQUFTLENBQUM7QUFDeEMsY0FBTSxHQUFzQyxPQUFPLENBQUMsTUFBTSxDQUFDO0FBRXRFLElBQUksYUFBYSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUM7QUFDdkMsSUFBSSxXQUFXLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztBQUNuQyxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDO0FBQ3JDLElBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7QUFDckMsSUFBSSxLQUFLLEdBQUcsT0FB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