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
    testing_internal_1.describe('LowerCasePipe', function () {
        var upper;
        var lower;
        var pipe;
        testing_internal_1.beforeEach(function () {
            lower = 'something';
            upper = 'SOMETHING';
            pipe = new common_1.LowerCasePipe();
        });
        testing_internal_1.describe('transform', function () {
            testing_internal_1.it('should return lowercase', function () {
                var val = pipe.transform(upper);
                testing_internal_1.expect(val).toEqual(lower);
            });
            testing_internal_1.it('should lowercase when there is a new value', function () {
                var val = pipe.transform(upper);
                testing_internal_1.expect(val).toEqual(lower);
                var val2 = pipe.transform('WAT');
                testing_internal_1.expect(val2).toEqual('wat');
            });
            testing_internal_1.it('should not support other objects', function () { testing_internal_1.expect(function () { return pipe.transform({}); }).toThrowError(); });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG93ZXJjYXNlX3BpcGVfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3Rlc3QvcGlwZXMvbG93ZXJjYXNlX3BpcGVfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUJBQTRCLGlCQUFpQixDQUFDLENBQUE7QUFDOUMsaUNBQStFLHdDQUF3QyxDQUFDLENBQUE7QUFFeEg7SUFDRSwyQkFBUSxDQUFDLGVBQWUsRUFBRTtRQUN4QixJQUFJLEtBQWEsQ0FBQztRQUNsQixJQUFJLEtBQWEsQ0FBQztRQUNsQixJQUFJLElBQW1CLENBQUM7UUFFeEIsNkJBQVUsQ0FBQztZQUNULEtBQUssR0FBRyxXQUFXLENBQUM7WUFDcEIsS0FBSyxHQUFHLFdBQVcsQ0FBQztZQUNwQixJQUFJLEdBQUcsSUFBSSxzQkFBYSxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwQixxQkFBRSxDQUFDLHlCQUF5QixFQUFFO2dCQUM1QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNoQyx5QkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztZQUVILHFCQUFFLENBQUMsNENBQTRDLEVBQUU7Z0JBQy9DLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hDLHlCQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNqQyx5QkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztZQUVILHFCQUFFLENBQUMsa0NBQWtDLEVBQ2xDLGNBQVEseUJBQU0sQ0FBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBTSxFQUFFLENBQUMsRUFBdkIsQ0FBdUIsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEUsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUE5QmUsWUFBSSxPQThCbkIsQ0FBQSJ9