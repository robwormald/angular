/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
function main() {
    testing_internal_1.describe('UpperCasePipe', function () {
        var upper;
        var lower;
        var pipe;
        testing_internal_1.beforeEach(function () {
            lower = 'something';
            upper = 'SOMETHING';
            pipe = new common_1.UpperCasePipe();
        });
        testing_internal_1.describe('transform', function () {
            testing_internal_1.it('should return uppercase', function () {
                var val = pipe.transform(lower);
                testing_internal_1.expect(val).toEqual(upper);
            });
            testing_internal_1.it('should uppercase when there is a new value', function () {
                var val = pipe.transform(lower);
                testing_internal_1.expect(val).toEqual(upper);
                var val2 = pipe.transform('wat');
                testing_internal_1.expect(val2).toEqual('WAT');
            });
            testing_internal_1.it('should not support other objects', function () { testing_internal_1.expect(function () { return pipe.transform({}); }).toThrowError(); });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBwZXJjYXNlX3BpcGVfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3Rlc3QvcGlwZXMvdXBwZXJjYXNlX3BpcGVfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUJBQTRCLGlCQUFpQixDQUFDLENBQUE7QUFDOUMsaUNBQStFLHdDQUF3QyxDQUFDLENBQUE7QUFFeEg7SUFDRSwyQkFBUSxDQUFDLGVBQWUsRUFBRTtRQUN4QixJQUFJLEtBQWEsQ0FBQztRQUNsQixJQUFJLEtBQWEsQ0FBQztRQUNsQixJQUFJLElBQW1CLENBQUM7UUFFeEIsNkJBQVUsQ0FBQztZQUNULEtBQUssR0FBRyxXQUFXLENBQUM7WUFDcEIsS0FBSyxHQUFHLFdBQVcsQ0FBQztZQUNwQixJQUFJLEdBQUcsSUFBSSxzQkFBYSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBUSxDQUFDLFdBQVcsRUFBRTtZQUVwQixxQkFBRSxDQUFDLHlCQUF5QixFQUFFO2dCQUM1QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQyx5QkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztZQUVILHFCQUFFLENBQUMsNENBQTRDLEVBQUU7Z0JBQy9DLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hDLHlCQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyx5QkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUVILHFCQUFFLENBQUMsa0NBQWtDLEVBQ2xDLGNBQVEseUJBQU0sQ0FBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBTSxFQUFFLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUEvQmUsWUFBSSxPQStCbkIsQ0FBQSJ9