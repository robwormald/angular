/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var util_1 = require('./util');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var aux_route_spec_impl_1 = require('./impl/aux_route_spec_impl');
function main() {
    testing_internal_1.describe('auxiliary route spec', function () {
        testing_internal_1.beforeEachProviders(function () { return util_1.TEST_ROUTER_PROVIDERS; });
        aux_route_spec_impl_1.registerSpecs();
        util_1.describeRouter('aux routes', function () {
            util_1.itShouldRoute();
            util_1.describeWith('a primary route', util_1.itShouldRoute);
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV4aWxpYXJ5X3JvdXRlX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3JvdXRlci1kZXByZWNhdGVkL3Rlc3QvaW50ZWdyYXRpb24vYXV4aWxpYXJ5X3JvdXRlX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUEySSxRQUFRLENBQUMsQ0FBQTtBQUVwSixpQ0FBNkMsd0NBQXdDLENBQUMsQ0FBQTtBQUV0RixvQ0FBNEIsNEJBQTRCLENBQUMsQ0FBQTtBQUV6RDtJQUNFLDJCQUFRLENBQUMsc0JBQXNCLEVBQUU7UUFFL0Isc0NBQW1CLENBQUMsY0FBTSxPQUFBLDRCQUFxQixFQUFyQixDQUFxQixDQUFDLENBQUM7UUFFakQsbUNBQWEsRUFBRSxDQUFDO1FBRWhCLHFCQUFjLENBQUMsWUFBWSxFQUFFO1lBQzNCLG9CQUFhLEVBQUUsQ0FBQztZQUNoQixtQkFBWSxDQUFDLGlCQUFpQixFQUFFLG9CQUFhLENBQUMsQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVplLFlBQUksT0FZbkIsQ0FBQSJ9