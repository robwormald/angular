/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var async_route_spec_impl_1 = require('./impl/async_route_spec_impl');
var util_1 = require('./util');
function main() {
    testing_internal_1.describe('async route spec', function () {
        testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
        async_route_spec_impl_1.registerSpecs();
        util_1.describeRouter('async routes', function () {
            util_1.describeWithout('children', function () {
                util_1.describeWith('route data', util_1.itShouldRoute);
                util_1.describeWithAndWithout('params', util_1.itShouldRoute);
            });
            util_1.describeWith('sync children', function () { util_1.describeWithAndWithout('default routes', util_1.itShouldRoute); });
            util_1.describeWith('async children', function () {
                util_1.describeWithAndWithout('params', function () { util_1.describeWithout('default routes', util_1.itShouldRoute); });
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNfcm91dGVfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyLWRlcHJlY2F0ZWQvdGVzdC9pbnRlZ3JhdGlvbi9hc3luY19yb3V0ZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBNEMsd0NBQXdDLENBQUMsQ0FBQTtBQUVyRixzQ0FBNEIsOEJBQThCLENBQUMsQ0FBQTtBQUMzRCxxQkFBMkksUUFBUSxDQUFDLENBQUE7QUFFcEo7SUFDRSwyQkFBUSxDQUFDLGtCQUFrQixFQUFFO1FBRTNCLHNDQUFtQixDQUFDLGNBQU0sT0FBQSw0QkFBcUIsRUFBckIsQ0FBcUIsQ0FBQyxDQUFDO1FBRWpELHFDQUFhLEVBQUUsQ0FBQztRQUVoQixxQkFBYyxDQUFDLGNBQWMsRUFBRTtZQUM3QixzQkFBZSxDQUFDLFVBQVUsRUFBRTtnQkFDMUIsbUJBQVksQ0FBQyxZQUFZLEVBQUUsb0JBQWEsQ0FBQyxDQUFDO2dCQUMxQyw2QkFBc0IsQ0FBQyxRQUFRLEVBQUUsb0JBQWEsQ0FBQyxDQUFDO1lBQ2xELENBQUMsQ0FBQyxDQUFDO1lBRUgsbUJBQVksQ0FDUixlQUFlLEVBQUUsY0FBUSw2QkFBc0IsQ0FBQyxnQkFBZ0IsRUFBRSxvQkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV6RixtQkFBWSxDQUFDLGdCQUFnQixFQUFFO2dCQUM3Qiw2QkFBc0IsQ0FDbEIsUUFBUSxFQUFFLGNBQVEsc0JBQWUsQ0FBQyxnQkFBZ0IsRUFBRSxvQkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdEJlLFlBQUksT0FzQm5CLENBQUEifQ==