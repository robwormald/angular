/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var mock_location_strategy_1 = require('@angular/common/testing/mock_location_strategy');
function main() {
    testing_internal_1.describe('Location', function () {
        var locationStrategy /** TODO #9100 */, location;
        function makeLocation(baseHref, provider) {
            if (baseHref === void 0) { baseHref = '/my/app'; }
            if (provider === void 0) { provider = []; }
            locationStrategy = new mock_location_strategy_1.MockLocationStrategy();
            locationStrategy.internalBaseHref = baseHref;
            var injector = core_1.ReflectiveInjector.resolveAndCreate([common_1.Location, { provide: common_1.LocationStrategy, useValue: locationStrategy }, provider]);
            return location = injector.get(common_1.Location);
        }
        testing_internal_1.beforeEach(makeLocation);
        testing_internal_1.it('should not prepend urls with starting slash when an empty URL is provided', function () { testing_internal_1.expect(location.prepareExternalUrl('')).toEqual(locationStrategy.getBaseHref()); });
        testing_internal_1.it('should not prepend path with an extra slash when a baseHref has a trailing slash', function () {
            var location = makeLocation('/my/slashed/app/');
            testing_internal_1.expect(location.prepareExternalUrl('/page')).toEqual('/my/slashed/app/page');
        });
        testing_internal_1.it('should not append urls with leading slash on navigate', function () {
            location.go('/my/app/user/btford');
            testing_internal_1.expect(locationStrategy.path()).toEqual('/my/app/user/btford');
        });
        testing_internal_1.it('should normalize urls on popstate', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            location.subscribe(function (ev /** TODO #9100 */) {
                testing_internal_1.expect(ev['url']).toEqual('/user/btford');
                async.done();
            });
            locationStrategy.simulatePopState('/my/app/user/btford');
        }));
        testing_internal_1.it('should revert to the previous path when a back() operation is executed', function () {
            var locationStrategy = new mock_location_strategy_1.MockLocationStrategy();
            var location = new common_1.Location(locationStrategy);
            function assertUrl(path /** TODO #9100 */) { testing_internal_1.expect(location.path()).toEqual(path); }
            location.go('/ready');
            assertUrl('/ready');
            location.go('/ready/set');
            assertUrl('/ready/set');
            location.go('/ready/set/go');
            assertUrl('/ready/set/go');
            location.back();
            assertUrl('/ready/set');
            location.back();
            assertUrl('/ready');
        });
        testing_internal_1.it('should incorporate the provided query values into the location change', function () {
            var locationStrategy = new mock_location_strategy_1.MockLocationStrategy();
            var location = new common_1.Location(locationStrategy);
            location.go('/home', 'key=value');
            testing_internal_1.expect(location.path()).toEqual('/home?key=value');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYXRpb25fc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyLWRlcHJlY2F0ZWQvdGVzdC9sb2NhdGlvbi9sb2NhdGlvbl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBaUgsd0NBQXdDLENBQUMsQ0FBQTtBQUUxSixxQkFBaUMsZUFBZSxDQUFDLENBQUE7QUFDakQsdUJBQXlDLGlCQUFpQixDQUFDLENBQUE7QUFDM0QsdUNBQW1DLGdEQUFnRCxDQUFDLENBQUE7QUFFcEY7SUFDRSwyQkFBUSxDQUFDLFVBQVUsRUFBRTtRQUVuQixJQUFJLGdCQUFxQixDQUFDLGlCQUFpQixFQUFFLFFBQWEsQ0FBbUI7UUFFN0Usc0JBQ0ksUUFBNEIsRUFBRSxRQUFvQztZQUFsRSx3QkFBNEIsR0FBNUIsb0JBQTRCO1lBQUUsd0JBQW9DLEdBQXBDLGFBQW9DO1lBQ3BFLGdCQUFnQixHQUFHLElBQUksNkNBQW9CLEVBQUUsQ0FBQztZQUM5QyxnQkFBZ0IsQ0FBQyxnQkFBZ0IsR0FBRyxRQUFRLENBQUM7WUFDN0MsSUFBSSxRQUFRLEdBQUcseUJBQWtCLENBQUMsZ0JBQWdCLENBQzlDLENBQUMsaUJBQVEsRUFBRSxFQUFDLE9BQU8sRUFBRSx5QkFBZ0IsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLEVBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ25GLE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxpQkFBUSxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVELDZCQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFekIscUJBQUUsQ0FBQywyRUFBMkUsRUFDM0UsY0FBUSx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxXQUFX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