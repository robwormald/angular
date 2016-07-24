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
var lang_1 = require('../../src/facade/lang');
function main() {
    testing_internal_1.describe('ReplacePipe', function () {
        var someNumber;
        var str;
        var pipe;
        testing_internal_1.beforeEach(function () {
            someNumber = 42;
            str = 'Douglas Adams';
            pipe = new common_1.ReplacePipe();
        });
        testing_internal_1.describe('transform', function () {
            testing_internal_1.it('should not support input other than strings and numbers', function () {
                testing_internal_1.expect(function () { return pipe.transform({}, 'Douglas', 'Hugh'); }).toThrow();
                testing_internal_1.expect(function () { return pipe.transform([1, 2, 3], 'Douglas', 'Hugh'); }).toThrow();
            });
            testing_internal_1.it('should not support patterns other than strings and regular expressions', function () {
                testing_internal_1.expect(function () { return pipe.transform(str, {}, 'Hugh'); }).toThrow();
                testing_internal_1.expect(function () { return pipe.transform(str, null, 'Hugh'); }).toThrow();
                testing_internal_1.expect(function () { return pipe.transform(str, 123, 'Hugh'); }).toThrow();
            });
            testing_internal_1.it('should not support replacements other than strings and functions', function () {
                testing_internal_1.expect(function () { return pipe.transform(str, 'Douglas', {}); }).toThrow();
                testing_internal_1.expect(function () { return pipe.transform(str, 'Douglas', null); }).toThrow();
                testing_internal_1.expect(function () { return pipe.transform(str, 'Douglas', 123); }).toThrow();
            });
            testing_internal_1.it('should return a new string with the pattern replaced', function () {
                var result1 = pipe.transform(str, 'Douglas', 'Hugh');
                var result2 = pipe.transform(str, lang_1.RegExpWrapper.create('a'), '_');
                var result3 = pipe.transform(str, lang_1.RegExpWrapper.create('a', 'i'), '_');
                var f = (function (x) { return 'Adams!'; });
                var result4 = pipe.transform(str, 'Adams', f);
                var result5 = pipe.transform(someNumber, '2', '4');
                testing_internal_1.expect(result1).toEqual('Hugh Adams');
                testing_internal_1.expect(result2).toEqual('Dougl_s Ad_ms');
                testing_internal_1.expect(result3).toEqual('Dougl_s _d_ms');
                testing_internal_1.expect(result4).toEqual('Douglas Adams!');
                testing_internal_1.expect(result5).toEqual('44');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwbGFjZV9waXBlX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbW1vbi90ZXN0L3BpcGVzL3JlcGxhY2VfcGlwZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBd0Ysd0NBQXdDLENBQUMsQ0FBQTtBQUVqSSx1QkFBMEIsaUJBQWlCLENBQUMsQ0FBQTtBQUM1QyxxQkFBMEMsdUJBQXVCLENBQUMsQ0FBQTtBQUVsRTtJQUNFLDJCQUFRLENBQUMsYUFBYSxFQUFFO1FBQ3RCLElBQUksVUFBa0IsQ0FBQztRQUN2QixJQUFJLEdBQVcsQ0FBQztRQUNoQixJQUFJLElBQWlCLENBQUM7UUFFdEIsNkJBQVUsQ0FBQztZQUNULFVBQVUsR0FBRyxFQUFFLENBQUM7WUFDaEIsR0FBRyxHQUFHLGVBQWUsQ0FBQztZQUN0QixJQUFJLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBUSxDQUFDLFdBQVcsRUFBRTtZQUVwQixxQkFBRSxDQUFDLHlEQUF5RCxFQUFFO2dCQUM1RCx5QkFBTSxDQUFDLGNBQU0sT0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQXJDLENBQXFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDOUQseUJBQU0sQ0FBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDdkUsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLHdFQUF3RSxFQUFFO2dCQUMzRSx5QkFBTSxDQUFDLGNBQU0sT0FBQSxJQUFJLENBQUMs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