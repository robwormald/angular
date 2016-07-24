/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var base_response_options_1 = require('../src/base_response_options');
var static_response_1 = require('../src/static_response');
function main() {
    testing_internal_1.describe('Response', function () {
        testing_internal_1.it('should be ok for 200 statuses', function () {
            testing_internal_1.expect(new static_response_1.Response(new base_response_options_1.ResponseOptions({ status: 200 })).ok).toEqual(true);
            testing_internal_1.expect(new static_response_1.Response(new base_response_options_1.ResponseOptions({ status: 299 })).ok).toEqual(true);
        });
        testing_internal_1.it('should not be ok for non 200 statuses', function () {
            testing_internal_1.expect(new static_response_1.Response(new base_response_options_1.ResponseOptions({ status: 199 })).ok).toEqual(false);
            testing_internal_1.expect(new static_response_1.Response(new base_response_options_1.ResponseOptions({ status: 300 })).ok).toEqual(false);
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3Jlc3BvbnNlX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2h0dHAvdGVzdC9zdGF0aWNfcmVzcG9uc2Vfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQW9DLHdDQUF3QyxDQUFDLENBQUE7QUFFN0Usc0NBQThCLDhCQUE4QixDQUFDLENBQUE7QUFDN0QsZ0NBQXVCLHdCQUF3QixDQUFDLENBQUE7QUFJaEQ7SUFDRSwyQkFBUSxDQUFDLFVBQVUsRUFBRTtRQUNuQixxQkFBRSxDQUFDLCtCQUErQixFQUFFO1lBQ2xDLHlCQUFNLENBQUMsSUFBSSwwQkFBUSxDQUFDLElBQUksdUNBQWUsQ0FBQyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFFLHlCQUFNLENBQUMsSUFBSSwwQkFBUSxDQUFDLElBQUksdUNBQWUsQ0FBQyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyx1Q0FBdUMsRUFBRTtZQUMxQyx5QkFBTSxDQUFDLElBQUksMEJBQVEsQ0FBQyxJQUFJLHVDQUFlLENBQUMsRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUMzRSx5QkFBTSxDQUFDLElBQUksMEJBQVEsQ0FBQyxJQUFJLHVDQUFlLENBQUMsRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM3RSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQVplLFlBQUksT0FZbkIsQ0FBQSJ9