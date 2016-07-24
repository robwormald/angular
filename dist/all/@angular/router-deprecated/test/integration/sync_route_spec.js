/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var sync_route_spec_impl_1 = require('./impl/sync_route_spec_impl');
var util_1 = require('./util');
function main() {
    testing_internal_1.describe('sync route spec', function () {
        testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
        sync_route_spec_impl_1.registerSpecs();
        util_1.describeRouter('sync routes', function () {
            util_1.describeWithout('children', function () { util_1.describeWithAndWithout('params', util_1.itShouldRoute); });
            util_1.describeWith('sync children', function () {
                util_1.describeWithout('default routes', function () { util_1.describeWithAndWithout('params', util_1.itShouldRoute); });
                util_1.describeWith('default routes', function () { util_1.describeWithout('params', util_1.itShouldRoute); });
            });
            util_1.describeWith('dynamic components', util_1.itShouldRoute);
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luY19yb3V0ZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9yb3V0ZXItZGVwcmVjYXRlZC90ZXN0L2ludGVncmF0aW9uL3N5bmNfcm91dGVfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQXVELHdDQUF3QyxDQUFDLENBQUE7QUFFaEcscUNBQTRCLDZCQUE2QixDQUFDLENBQUE7QUFDMUQscUJBQTJJLFFBQVEsQ0FBQyxDQUFBO0FBRXBKO0lBQ0UsMkJBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUUxQixzQ0FBbUIsQ0FBQyxjQUFNLE9BQUEsNEJBQXFCLEVBQXJCLENBQXFCLENBQUMsQ0FBQztRQUVqRCxvQ0FBYSxFQUFFLENBQUM7UUFFaEIscUJBQWMsQ0FBQyxhQUFhLEVBQUU7WUFDNUIsc0JBQWUsQ0FBQyxVQUFVLEVBQUUsY0FBUSw2QkFBc0IsQ0FBQyxRQUFRLEVBQUUsb0JBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFeEYsbUJBQVksQ0FBQyxlQUFlLEVBQUU7Z0JBQzVCLHNCQUFlLENBQ1gsZ0JBQWdCLEVBQUUsY0FBUSw2QkFBc0IsQ0FBQyxRQUFRLEVBQUUsb0JBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xGLG1CQUFZLENBQUMsZ0JBQWdCLEVBQUUsY0FBUSxzQkFBZSxDQUFDLFFBQVEsRUFBRSxvQkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV0RixDQUFDLENBQUMsQ0FBQztZQUVILG1CQUFZLENBQUMsb0JBQW9CLEVBQUUsb0JBQWEsQ0FBQyxDQUFDO1FBQ3BELENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBckJlLFlBQUksT0FxQm5CLENBQUEifQ==