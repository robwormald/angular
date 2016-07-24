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
function main() {
    testing_internal_1.describe('provider', function () {
        testing_internal_1.describe('type errors', function () {
            testing_internal_1.it('should throw when trying to create a class provider and not passing a class', function () {
                testing_internal_1.expect(function () {
                    core_1.bind('foo').toClass(0);
                }).toThrowError('Trying to create a class provider but "0" is not a class!');
            });
            testing_internal_1.it('should throw when trying to create a factory provider and not passing a function', function () {
                testing_internal_1.expect(function () {
                    core_1.bind('foo').toFactory(0);
                }).toThrowError('Trying to create a factory provider but "0" is not a function!');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluZGluZ19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvZGkvYmluZGluZ19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBNkUsd0NBQXdDLENBQUMsQ0FBQTtBQUV0SCxxQkFBNEIsZUFBZSxDQUFDLENBQUE7QUFFNUM7SUFDRSwyQkFBUSxDQUFDLFVBQVUsRUFBRTtRQUVuQiwyQkFBUSxDQUFDLGFBQWEsRUFBRTtZQUV0QixxQkFBRSxDQUFDLDZFQUE2RSxFQUFFO2dCQUNoRix5QkFBTSxDQUFDO29CQUNMLFdBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1lBQy9FLENBQUMsQ0FBQyxDQUFDO1lBRUgscUJBQUUsQ0FBQyxrRkFBa0YsRUFBRTtnQkFDckYseUJBQU0sQ0FBQztvQkFDTCxXQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxDQUFNLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsZ0VBQWdFLENBQUMsQ0FBQztZQUNwRixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBbEJlLFlBQUksT0FrQm5CLENBQUEifQ==