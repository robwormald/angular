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
    testing_internal_1.describe('PathLocationStrategy', function () {
        var platformLocation /** TODO #9100 */, locationStrategy;
        testing_internal_1.beforeEachProviders(function () { return [common_1.PathLocationStrategy, {
                provide: common_1.PlatformLocation,
                useFactory: makeSpyPlatformLocation
            }]; });
        testing_internal_1.it('should throw without a base element or APP_BASE_HREF', function () {
            platformLocation = new spies_1.SpyPlatformLocation();
            platformLocation.pathname = '';
            platformLocation.spy('getBaseHrefFromDOM').andReturn(null);
            testing_internal_1.expect(function () { return new common_1.PathLocationStrategy(platformLocation); })
                .toThrowError('No base href set. Please provide a value for the APP_BASE_HREF token or add a base element to the document.');
        });
        testing_internal_1.describe('without APP_BASE_HREF', function () {
            testing_internal_1.beforeEach(testing_internal_1.inject([common_1.PlatformLocation, common_1.PathLocationStrategy], function (pl /** TODO #9100 */, ls /** TODO #9100 */) {
                platformLocation = pl;
                locationStrategy = ls;
            }));
            testing_internal_1.it('should prepend urls with a hash for non-empty URLs', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo')).toEqual('foo');
                locationStrategy.pushState(null, 'Title', 'foo', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', 'foo');
            });
            testing_internal_1.it('should prepend urls with a hash for URLs with query params', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo?bar')).toEqual('foo?bar');
                locationStrategy.pushState(null, 'Title', 'foo', 'bar=baz');
                testing_internal_1.expect(platformLocation.spy('pushState'))
                    .toHaveBeenCalledWith(null, 'Title', 'foo?bar=baz');
            });
            testing_internal_1.it('should not prepend a hash to external urls for an empty internal URL', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('')).toEqual('');
                locationStrategy.pushState(null, 'Title', '', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', '');
            });
        });
        testing_internal_1.describe('with APP_BASE_HREF with neither leading nor trailing slash', function () {
            testing_internal_1.beforeEachProviders(function () { return [{ provide: common_1.APP_BASE_HREF, useValue: 'app' }]; });
            testing_internal_1.beforeEach(testing_internal_1.inject([common_1.PlatformLocation, common_1.PathLocationStrategy], function (pl /** TODO #9100 */, ls /** TODO #9100 */) {
                platformLocation = pl;
                locationStrategy = ls;
                platformLocation.spy('pushState');
                platformLocation.pathname = '';
            }));
            testing_internal_1.it('should prepend urls with a hash for non-empty URLs', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo')).toEqual('app/foo');
                locationStrategy.pushState(null, 'Title', 'foo', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', 'app/foo');
            });
            testing_internal_1.it('should prepend urls with a hash for URLs with query params', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo?bar')).toEqual('app/foo?bar');
                locationStrategy.pushState(null, 'Title', 'foo', 'bar=baz');
                testing_internal_1.expect(platformLocation.spy('pushState'))
                    .toHaveBeenCalledWith(null, 'Title', 'app/foo?bar=baz');
            });
            testing_internal_1.it('should not prepend a hash to external urls for an empty internal URL', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('')).toEqual('app');
                locationStrategy.pushState(null, 'Title', '', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', 'app');
            });
        });
        testing_internal_1.describe('with APP_BASE_HREF with leading slash', function () {
            testing_internal_1.beforeEachProviders(function () { return [{ provide: common_1.APP_BASE_HREF, useValue: '/app' }]; });
            testing_internal_1.beforeEach(testing_internal_1.inject([common_1.PlatformLocation, common_1.PathLocationStrategy], function (pl /** TODO #9100 */, ls /** TODO #9100 */) {
                platformLocation = pl;
                locationStrategy = ls;
                platformLocation.spy('pushState');
                platformLocation.pathname = '';
            }));
            testing_internal_1.it('should prepend urls with a hash for non-empty URLs', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo')).toEqual('/app/foo');
                locationStrategy.pushState(null, 'Title', 'foo', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', '/app/foo');
            });
            testing_internal_1.it('should prepend urls with a hash for URLs with query params', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo?bar')).toEqual('/app/foo?bar');
                locationStrategy.pushState(null, 'Title', 'foo', 'bar=baz');
                testing_internal_1.expect(platformLocation.spy('pushState'))
                    .toHaveBeenCalledWith(null, 'Title', '/app/foo?bar=baz');
            });
            testing_internal_1.it('should not prepend a hash to external urls for an empty internal URL', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('')).toEqual('/app');
                locationStrategy.pushState(null, 'Title', '', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', '/app');
            });
        });
        testing_internal_1.describe('with APP_BASE_HREF with both leading and trailing slash', function () {
            testing_internal_1.beforeEachProviders(function () { return [{ provide: common_1.APP_BASE_HREF, useValue: '/app/' }]; });
            testing_internal_1.beforeEach(testing_internal_1.inject([common_1.PlatformLocation, common_1.PathLocationStrategy], function (pl /** TODO #9100 */, ls /** TODO #9100 */) {
                platformLocation = pl;
                locationStrategy = ls;
                platformLocation.spy('pushState');
                platformLocation.pathname = '';
            }));
            testing_internal_1.it('should prepend urls with a hash for non-empty URLs', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo')).toEqual('/app/foo');
                locationStrategy.pushState(null, 'Title', 'foo', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', '/app/foo');
            });
            testing_internal_1.it('should prepend urls with a hash for URLs with query params', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('foo?bar')).toEqual('/app/foo?bar');
                locationStrategy.pushState(null, 'Title', 'foo', 'bar=baz');
                testing_internal_1.expect(platformLocation.spy('pushState'))
                    .toHaveBeenCalledWith(null, 'Title', '/app/foo?bar=baz');
            });
            testing_internal_1.it('should not prepend a hash to external urls for an empty internal URL', function () {
                testing_internal_1.expect(locationStrategy.prepareExternalUrl('')).toEqual('/app/');
                locationStrategy.pushState(null, 'Title', '', '');
                testing_internal_1.expect(platformLocation.spy('pushState')).toHaveBeenCalledWith(null, 'Title', '/app/');
            });
        });
    });
}
exports.main = main;
function makeSpyPlatformLocation() {
    var platformLocation = new spies_1.SpyPlatformLocation();
    platformLocation.spy('getBaseHrefFromDOM').andReturn('');
    platformLocation.spy('pushState');
    platformLocation.pathname = '';
    return platformLocation;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aF9sb2NhdGlvbl9zdHJhdGVneV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9yb3V0ZXItZGVwcmVjYXRlZC90ZXN0L2xvY2F0aW9uL3BhdGhfbG9jYXRpb25fc3RyYXRlZ3lfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQTZGLHdDQUF3QyxDQUFDLENBQUE7QUFHdEksdUJBQXNGLGlCQUFpQixDQUFDLENBQUE7QUFDeEcsc0JBQWtDLFVBQVUsQ0FBQyxDQUFBO0FBRTdDO0lBQ0UsMkJBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixJQUFJLGdCQUFxQixDQUFDLGlCQUFpQixFQUFFLGdCQUFxQixDQUFtQjtRQUVyRixzQ0FBbUIsQ0FBQyxjQUFNLE9BQUEsQ0FBQyw2QkFBb0IsRUFBRTtnQkFDM0IsT0FBTyxFQUFFLHlCQUFnQjtnQkFDekIsVUFBVSxFQUFFLHVCQUF1QjthQUNwQyxDQUFDLEVBSEksQ0FHSixDQUFDLENBQUM7UUFFeEIscUJBQUUsQ0FBQyxzREFBc0QsRUFBRTtZQUN6RCxnQkFBZ0IsR0FBRyxJQUFJLDJCQUFtQixFQUFFLENBQUM7WUFDN0MsZ0JBQWdCLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUMvQixnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFM0QseUJBQU0sQ0FBQyxjQUFNLE9BQUEsSUFBSSw2QkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUExQyxDQUEwQyxDQUFDO2lCQUNuRCxZQUFZLENBQ1QsNkdBQTZHLENBQUMsQ0FBQztRQUN6SCxDQUFDLENBQUMsQ0FBQztRQUVILDJCQUFRLENBQUMsdUJBQXVCLEVBQUU7WUFDaEMsNkJBQVUsQ0FBQyx5QkFBTSxDQUNiLENBQUMseUJBQWdCLEVBQUUsNkJBQW9CLENB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