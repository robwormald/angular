/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var fake_async_1 = require('@angular/core/testing/fake_async');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var util_1 = require('../src/util');
function main() {
    testing_internal_1.describe('util', function () {
        testing_internal_1.describe('SyncAsyncResult', function () {
            testing_internal_1.it('async value should default to Promise.resolve(syncValue)', fake_async_1.fakeAsync(function () {
                var syncValue = {};
                var sar = new util_1.SyncAsyncResult(syncValue);
                sar.asyncResult.then(function (v) { return testing_internal_1.expect(v).toBe(syncValue); });
            }));
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbF9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L3V0aWxfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsMkJBQXdCLGtDQUFrQyxDQUFDLENBQUE7QUFDM0QsaUNBQWlHLHdDQUF3QyxDQUFDLENBQUE7QUFFMUkscUJBQThCLGFBQWEsQ0FBQyxDQUFBO0FBRTVDO0lBQ0UsMkJBQVEsQ0FBQyxNQUFNLEVBQUU7UUFDZiwyQkFBUSxDQUFDLGlCQUFpQixFQUFFO1lBQzFCLHFCQUFFLENBQUMsMERBQTBELEVBQUUsc0JBQVMsQ0FBQztnQkFDcEUsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO2dCQUNyQixJQUFNLEdBQUcsR0FBRyxJQUFJLHNCQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzNDLEdBQUcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBTSxJQUFLLE9BQUEseUJBQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQXpCLENBQXlCLENBQUMsQ0FBQztZQUM5RCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1QsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFWZSxZQUFJLE9BVW5CLENBQUEifQ==