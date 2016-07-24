/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var compiler_1 = require('@angular/compiler');
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var exceptions_1 = require('../../src/facade/exceptions');
var xhr_cache_1 = require('../../src/xhr/xhr_cache');
var xhr_cache_setter_1 = require('./xhr_cache_setter');
function main() {
    testing_internal_1.describe('CachedXHR', function () {
        var xhr;
        function createCachedXHR() {
            xhr_cache_setter_1.setTemplateCache({ 'test.html': '<div>Hello</div>' });
            return new xhr_cache_1.CachedXHR();
        }
        testing_internal_1.beforeEach(function () {
            testing_1.configureCompiler({
                providers: [
                    { provide: compiler_1.UrlResolver, useClass: TestUrlResolver },
                    { provide: compiler_1.XHR, useFactory: createCachedXHR }
                ]
            });
        });
        testing_internal_1.it('should throw exception if $templateCache is not found', function () {
            xhr_cache_setter_1.setTemplateCache(null);
            matchers_1.expect(function () {
                xhr = new xhr_cache_1.CachedXHR();
            }).toThrowError('CachedXHR: Template cache was not found in $templateCache.');
        });
        testing_internal_1.it('should resolve the Promise with the cached file content on success', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            xhr_cache_setter_1.setTemplateCache({ 'test.html': '<div>Hello</div>' });
            xhr = new xhr_cache_1.CachedXHR();
            xhr.get('test.html').then(function (text) {
                matchers_1.expect(text).toEqual('<div>Hello</div>');
                async.done();
            });
        }));
        testing_internal_1.it('should reject the Promise on failure', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            xhr = new xhr_cache_1.CachedXHR();
            xhr.get('unknown.html')
                .then(function (text) { throw new exceptions_1.BaseException('Not expected to succeed.'); })
                .catch(function (error) { async.done(); });
        }));
        testing_internal_1.it('should allow fakeAsync Tests to load components with templateUrl synchronously', testing_1.fakeAsync(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            var fixture = tcb.createFakeAsync(TestComponent);
            // This should initialize the fixture.
            testing_1.tick();
            matchers_1.expect(fixture.debugElement.children[0].nativeElement).toHaveText('Hello');
        })));
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
    }
    /** @nocollapse */
    TestComponent.decorators = [
        { type: core_1.Component, args: [{ selector: 'test-cmp', templateUrl: 'test.html' },] },
    ];
    return TestComponent;
}());
var TestUrlResolver = (function (_super) {
    __extends(TestUrlResolver, _super);
    function TestUrlResolver() {
        _super.apply(this, arguments);
    }
    TestUrlResolver.prototype.resolve = function (baseUrl, url) {
        // Don't use baseUrl to get the same URL as templateUrl.
        // This is to remove any difference between Dart and TS tests.
        return url;
    };
    return TestUrlResolver;
}(compiler_1.UrlResolver));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyX2NhY2hlX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXItZHluYW1pYy90ZXN0L3hoci94aHJfY2FjaGVfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCx5QkFBK0IsbUJBQW1CLENBQUMsQ0FBQTtBQUNuRCxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsd0JBQXdGLHVCQUF1QixDQUFDLENBQUE7QUFDaEgsaUNBQTZHLHdDQUF3QyxDQUFDLENBQUE7QUFDdEoseUJBQXFCLDRDQUE0QyxDQUFDLENBQUE7QUFFbEUsMkJBQTRCLDZCQUE2QixDQUFDLENBQUE7QUFDMUQsMEJBQXdCLHlCQUF5QixDQUFDLENBQUE7QUFFbEQsaUNBQStCLG9CQUFvQixDQUFDLENBQUE7QUFFcEQ7SUFDRSwyQkFBUSxDQUFDLFdBQVcsRUFBRTtRQUNwQixJQUFJLEdBQWMsQ0FBQztRQUVuQjtZQUNFLG1DQUFnQixDQUFDLEVBQUMsV0FBVyxFQUFFLGtCQUFrQixFQUFDLENBQUMsQ0FBQztZQUNwRCxNQUFNLENBQUMsSUFBSSxxQkFBUyxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUNELDZCQUFVLENBQUM7WUFDVCwyQkFBaUIsQ0FBQztnQkFDaEIsU0FBUyxFQUFFO29CQUNULEVBQUMsT0FBTyxFQUFFLHNCQUFXLEVBQUUsUUFBUSxFQUFFLGVBQWUsRUFBQztvQkFDakQsRUFBQyxPQUFPLEVBQUUsY0FBRyxFQUFFLFVBQVUsRUFBRSxlQUFlLEVBQUM7aUJBQzVDO2FBQ0YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLHVEQUF1RCxFQUFFO1lBQzFELG1DQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLGlCQUFNLENBQUM7Z0JBQ0wsR0FBRyxHQUFHLElBQUkscUJBQVMs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