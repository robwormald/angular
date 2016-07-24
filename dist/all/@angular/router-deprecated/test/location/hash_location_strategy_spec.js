/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var common_1 = require('@angular/common');
var spies_1 = require('../spies');
function main() {
    testing_internal_1.describe('HashLocationStrategy', function () {
        var platformLocation;
        var locationStrategy;
        testing_internal_1.beforeEachProviders(function () { return [common_1.HashLocationStrategy, { provide: common_1.PlatformLocation, useClass: spies_1.SpyPlatformLocation }]; });
        testing_internal_1.describe('without APP_BASE_HREF', function () {
            testing_internal_1.beforeEach(testing_internal_1.inject([common_1.PlatformLocation, common_1.HashLocationStrategy], function (pl /** TODO #9100 */, ls /** TODO #9100 */) {
                platformLocation = pl;
                locationStrategy = ls;
                platformLocation.spy('pushState');
                platformLocation.pathname = '';
            }));
            testing_internal_1.it('should prepend urls with a hash for non-empty URLs', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo')).toEqual('#foo');
                locationStrategy.pushState(null, 'Title', 'foo', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', '#foo');
            });
            testing_internal_1.it('should prepend urls with a hash for URLs with query params', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo?bar')).toEqual('#foo?bar');
                locationStrategy.pushState(null, 'Title', 'foo', 'bar=baz');
                testing_internal_1.expect(platformLocation.spy('pushState'))
                    .toHaveBeenCalledWith(null, 'Title', '#foo?bar=baz');
            });
            testing_internal_1.it('should prepend urls with a hash for URLs with just query params', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('?bar')).toEqual('#?bar');
                locationStrategy.pushState(null, 'Title', '', 'bar=baz');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', '#?bar=baz');
            });
            testing_internal_1.it('should not prepend a hash to external urls for an empty internal URL', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('')).toEqual('');
                locationStrategy.pushState(null, 'Title', '', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', '');
            });
        });
        testing_internal_1.describe('with APP_BASE_HREF with neither leading nor trailing slash', function () {
            testing_internal_1.beforeEachProviders(function () { return [{ provide: common_1.APP_BASE_HREF, useValue: 'app' }]; });
            testing_internal_1.beforeEach(testing_internal_1.inject([common_1.PlatformLocation, common_1.HashLocationStrategy], function (pl /** TODO #9100 */, ls /** TODO #9100 */) {
                platformLocation = pl;
                locationStrategy = ls;
                platformLocation.spy('pushState');
                platformLocation.pathname = '';
            }));
            testing_internal_1.it('should prepend urls with a hash for non-empty URLs', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo')).toEqual('#app/foo');
                locationStrategy.pushState(null, 'Title', 'foo', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', '#app/foo');
            });
            testing_internal_1.it('should prepend urls with a hash for URLs with query params', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo?bar')).toEqual('#app/foo?bar');
                locationStrategy.pushState(null, 'Title', 'foo', 'bar=baz');
                testing_internal_1.expect(platformLocation.spy('pushState'))
                    .toHaveBeenCalledWith(null, 'Title', '#app/foo?bar=baz');
            });
            testing_internal_1.it('should not prepend a hash to external urls for an empty internal URL', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('')).toEqual('#app');
                locationStrategy.pushState(null, 'Title', '', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', '#app');
            });
        });
        testing_internal_1.describe('with APP_BASE_HREF with leading slash', function () {
            testing_internal_1.beforeEachProviders(function () { return [{ provide: common_1.APP_BASE_HREF, useValue: '/app' }]; });
            testing_internal_1.beforeEach(testing_internal_1.inject([common_1.PlatformLocation, common_1.HashLocationStrategy], function (pl /** TODO #9100 */, ls /** TODO #9100 */) {
                platformLocation = pl;
                locationStrategy = ls;
                platformLocation.spy('pushState');
                platformLocation.pathname = '';
            }));
            testing_internal_1.it('should prepend urls with a hash for non-empty URLs', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo')).toEqual('#/app/foo');
                locationStrategy.pushState(null, 'Title', 'foo', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', '#/app/foo');
            });
            testing_internal_1.it('should prepend urls with a hash for URLs with query params', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo?bar')).toEqual('#/app/foo?bar');
                locationStrategy.pushState(null, 'Title', 'foo', 'bar=baz');
                testing_internal_1.expect(platformLocation.spy('pushState'))
                    .toHaveBeenCalledWith(null, 'Title', '#/app/foo?bar=baz');
            });
            testing_internal_1.it('should not prepend a hash to external urls for an empty internal URL', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('')).toEqual('#/app');
                locationStrategy.pushState(null, 'Title', '', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', '#/app');
            });
        });
        testing_internal_1.describe('with APP_BASE_HREF with both leading and trailing slash', function () {
            testing_internal_1.beforeEachProviders(function () { return [{ provide: common_1.APP_BASE_HREF, useValue: '/app/' }]; });
            testing_internal_1.beforeEach(testing_internal_1.inject([common_1.PlatformLocation, common_1.HashLocationStrategy], function (pl /** TODO #9100 */, ls /** TODO #9100 */) {
                platformLocation = pl;
                locationStrategy = ls;
                platformLocation.spy('pushState');
                platformLocation.pathname = '';
            }));
            testing_internal_1.it('should prepend urls with a hash for non-empty URLs', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo')).toEqual('#/app/foo');
                locationStrategy.pushState(null, 'Title', 'foo', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', '#/app/foo');
            });
            testing_internal_1.it('should prepend urls with a hash for URLs with query params', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo?bar')).toEqual('#/app/foo?bar');
                locationStrategy.pushState(null, 'Title', 'foo', 'bar=baz');
                testing_internal_1.expect(platformLocation.spy('pushState'))
                    .toHaveBeenCalledWith(null, 'Title', '#/app/foo?bar=baz');
            });
            testing_internal_1.it('should not prepend a hash to external urls for an empty internal URL', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('')).toEqual('#/app/');
                locationStrategy.pushState(null, 'Title', '', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', '#/app/');
            });
        });
        testing_internal_1.describe('hashLocationStrategy bugs', function () {
            testing_internal_1.beforeEach(testing_internal_1.inject([common_1.PlatformLocation, common_1.HashLocationStrategy], function (pl /** TODO #9100 */, ls /** TODO #9100 */) {
                platformLocation = pl;
                locationStrategy = ls;
                platformLocation.spy('pushState');
                platformLocation.pathname = '';
            }));
            testing_internal_1.it('should not include platform search', function () {
                platformLocation.search = '?donotinclude';
                testing_internal_1.expect(locationStrategy.path()).toEqual('');
            });
            testing_internal_1.it('should not include platform search even with hash', function () {
                platformLocation.hash = '#hashPath';
                platformLocation.search = '?donotinclude';
                testing_internal_1.expect(locationStrategy.path()).toEqual('hashPath');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaF9sb2NhdGlvbl9zdHJhdGVneV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9yb3V0ZXItZGVwcmVjYXRlZC90ZXN0L2xvY2F0aW9uL2hhc2hfbG9jYXRpb25fc3RyYXRlZ3lfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQTZGLHdDQUF3QyxDQUFDLENBQUE7QUFJdEksdUJBQW9FLGlCQUFpQixDQUFDLENBQUE7QUFDdEYsc0JBQWtDLFVBQVUsQ0FBQyxDQUFBO0FBRTdDO0lBQ0UsMkJBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixJQUFJLGdCQUFxQyxDQUFDO1FBQzFDLElBQUksZ0JBQXNDLENBQUM7UUFFM0Msc0NBQW1CLENBQ2YsY0FBTSxPQUFBLENBQUMsNkJBQW9CLEVBQUUsRUFBQyxPQUFPLEVBQUUseUJBQWdCLEVBQUUsUUFBUSxFQUFFLDJCQUFtQixFQUFDLENBQUMsRUFBbEYsQ0FBa0YsQ0FBQyxDQUFDO1FBRTlGLDJCQUFRLENBQUMsdUJBQXVCLEVBQUU7WUFDaEMsNkJBQVUsQ0FBQyx5QkFBTSxDQUNiLENBQUMseUJBQWdCLEVBQUUsNkJBQW9CLENBQUMsRUFDeEMsVUFBQyxFQUFPLENBQUMsaUJBQWlCLEVBQUUsRUFBTyxDQUFDLGlCQUFpQjtnQkFDbkQsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO2dCQUN0QixnQkFBZ0IsR0FBRyxFQUFFLENBQUM7Z0JBQ3RCLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDbEMsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNqQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRVIscUJBQUUsQ0FBQyxvREFBb0QsRUFBRTtnQkFDdkQseUJBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFD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