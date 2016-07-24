/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var compiler_1 = require('@angular/compiler');
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var router_deprecated_1 = require('@angular/router-deprecated');
var promise_1 = require('../src/facade/promise');
var xhr_impl_1 = require('../src/xhr/xhr_impl');
// Components for the tests.
var FancyService = (function () {
    function FancyService() {
        this.value = 'real value';
    }
    FancyService.prototype.getAsyncValue = function () { return Promise.resolve('async value'); };
    FancyService.prototype.getTimeoutValue = function () {
        return new Promise(function (resolve, reject) { setTimeout(function () { resolve('timeout value'); }, 10); });
    };
    return FancyService;
}());
var ExternalTemplateComp = (function () {
    function ExternalTemplateComp() {
    }
    /** @nocollapse */
    ExternalTemplateComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'external-template-comp',
                    templateUrl: '/base/modules/@angular/platform-browser/test/static_assets/test.html'
                },] },
    ];
    return ExternalTemplateComp;
}());
var BadTemplateUrl = (function () {
    function BadTemplateUrl() {
    }
    /** @nocollapse */
    BadTemplateUrl.decorators = [
        { type: core_1.Component, args: [{ selector: 'bad-template-comp', templateUrl: 'non-existant.html' },] },
    ];
    return BadTemplateUrl;
}());
var TestRouterComponent = (function () {
    function TestRouterComponent() {
    }
    /** @nocollapse */
    TestRouterComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'test-router-cmp',
                    template: "<a [routerLink]=\"['One']\">one</a> <a [routerLink]=\"['Two']\">two</a><router-outlet></router-outlet>",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES]
                },] },
    ];
    return TestRouterComponent;
}());
// Tests for angular2/testing bundle specific to the browser environment.
// For general tests, see test/testing/testing_public_spec.ts.
function main() {
    describe('test APIs for the browser', function () {
        describe('using the async helper', function () {
            var actuallyDone;
            beforeEach(function () { actuallyDone = false; });
            afterEach(function () { expect(actuallyDone).toEqual(true); });
            it('should run async tests with XHRs', testing_1.async(function () {
                var xhr = new xhr_impl_1.XHRImpl();
                xhr.get('/base/modules/@angular/platform-browser/test/static_assets/test.html')
                    .then(function () { actuallyDone = true; });
            }), 10000); // Long timeout here because this test makes an actual XHR.
        });
        describe('using the test injector with the inject helper', function () {
            describe('setting up Providers', function () {
                beforeEach(function () { return testing_1.addProviders([{ provide: FancyService, useValue: new FancyService() }]); });
                it('provides a real XHR instance', testing_1.inject([compiler_1.XHR], function (xhr) { expect(xhr instanceof xhr_impl_1.XHRImpl).toBeTruthy(); }));
                it('should allow the use of fakeAsync', testing_1.fakeAsync(testing_1.inject([FancyService], function (service /** TODO #9100 */) {
                    var value;
                    service.getAsyncValue().then(function (val /** TODO #9100 */) { value = val; });
                    testing_1.tick();
                    expect(value).toEqual('async value');
                })));
            });
        });
        describe('errors', function () {
            var originalJasmineIt;
            var patchJasmineIt = function () {
                var deferred = promise_1.PromiseWrapper.completer();
                originalJasmineIt = jasmine.getEnv().it;
                jasmine.getEnv().it = function (description, fn /** TODO #9100 */) {
                    var done = function () { deferred.resolve(); };
                    done.fail = function (err /** TODO #9100 */) { deferred.reject(err); };
                    fn(done);
                    return null;
                };
                return deferred.promise;
            };
            var restoreJasmineIt = function () { jasmine.getEnv().it = originalJasmineIt; };
            it('should fail when an XHR fails', function (done /** TODO #9100 */) {
                var itPromise = patchJasmineIt();
                it('should fail with an error from a promise', testing_1.async(testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                    return tcb.createAsync(BadTemplateUrl);
                })));
                itPromise.then(function () { done.fail('Expected test to fail, but it did not'); }, function (err) {
                    expect(err.message)
                        .toEqual('Uncaught (in promise): Failed to load non-existant.html');
                    done();
                });
                restoreJasmineIt();
            }, 10000);
        });
        describe('test component builder', function () {
            it('should allow an external templateUrl', testing_1.async(testing_1.inject([testing_1.TestComponentBuilder], function (tcb) {
                tcb.createAsync(ExternalTemplateComp).then(function (componentFixture) {
                    componentFixture.detectChanges();
                    expect(componentFixture.debugElement.nativeElement.textContent)
                        .toEqual('from external template\n');
                });
            })), 10000); // Long timeout here because this test makes an actual XHR, and is slow on Edge.
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZ19wdWJsaWNfYnJvd3Nlcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyLWR5bmFtaWMvdGVzdC90ZXN0aW5nX3B1YmxpY19icm93c2VyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHlCQUFrQixtQkFBbUIsQ0FBQyxDQUFBO0FBQ3RDLHFCQUE4QixlQUFlLENBQUMsQ0FBQTtBQUM5Qyx3QkFBa0csdUJBQXVCLENBQUMsQ0FBQTtBQUMxSCxrQ0FBdUMsNEJBQTRCLENBQUMsQ0FBQTtBQUVwRSx3QkFBNkIsdUJBQXVCLENBQUMsQ0FBQTtBQUNyRCx5QkFBc0IscUJBQXFCLENBQUMsQ0FBQTtBQUk1Qyw0QkFBNEI7QUFDNUI7SUFBQTtRQUNFLFVBQUssR0FBVyxZQUFZLENBQUM7SUFNL0IsQ0FBQztJQUxDLG9DQUFhLEdBQWIsY0FBa0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFELHNDQUFlLEdBQWY7UUFDRSxNQUFNLENBQUMsSUFBSSxPQUFPLENBQ2QsVUFBQyxPQUFPLEVBQUUsTUFBTSxJQUFPLFVBQVUsQ0FBQyxjQUFRLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JGLENBQUM7SUFDSCxtQkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBQ0Q7SUFBQTtJQVFBLENBQUM7SUFQRCxrQkFBa0I7SUFDWCwrQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsd0JBQXdCO29CQUNsQyxXQUFXLEVBQUUsc0VBQXNFO2lCQUNwRixFQUFHLEVBQUU7S0FDTCxD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