/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var pipe_resolver_1 = require('@angular/compiler/src/pipe_resolver');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var lang_1 = require('../../src/facade/lang');
function main() {
    testing_internal_1.describe('DatePipe', function () {
        var date;
        var pipe;
        testing_internal_1.beforeEach(function () {
            date = lang_1.DateWrapper.create(2015, 6, 15, 9, 3, 1);
            pipe = new common_1.DatePipe();
        });
        testing_internal_1.it('should be marked as pure', function () { testing_internal_1.expect(new pipe_resolver_1.PipeResolver().resolve(common_1.DatePipe).pure).toEqual(true); });
        // TODO(mlaval): enable tests when Intl API is no longer used, see
        // https://github.com/angular/angular/issues/3333
        // Have to restrict to Chrome as IE uses a different formatting
        if (browser_util_1.browserDetection.supportsIntlApi && browser_util_1.browserDetection.isChromeDesktop) {
            testing_internal_1.describe('supports', function () {
                testing_internal_1.it('should support date', function () { testing_internal_1.expect(function () { return pipe.transform(date); }).not.toThrow(); });
                testing_internal_1.it('should support int', function () { testing_internal_1.expect(function () { return pipe.transform(123456789); }).not.toThrow(); });
                testing_internal_1.it('should support numeric strings', function () { testing_internal_1.expect(function () { return pipe.transform('123456789'); }).not.toThrow(); });
                testing_internal_1.it('should support ISO string', function () { testing_internal_1.expect(function () { return pipe.transform('2015-06-15T21:43:11Z'); }).not.toThrow(); });
                testing_internal_1.it('should not support other objects', function () {
                    testing_internal_1.expect(function () { return pipe.transform({}); }).toThrow();
                    testing_internal_1.expect(function () { return pipe.transform(''); }).toThrow();
                });
            });
            testing_internal_1.describe('transform', function () {
                testing_internal_1.it('should format each component correctly', function () {
                    testing_internal_1.expect(pipe.transform(date, 'y')).toEqual('2015');
                    testing_internal_1.expect(pipe.transform(date, 'yy')).toEqual('15');
                    testing_internal_1.expect(pipe.transform(date, 'M')).toEqual('6');
                    testing_internal_1.expect(pipe.transform(date, 'MM')).toEqual('06');
                    testing_internal_1.expect(pipe.transform(date, 'MMM')).toEqual('Jun');
                    testing_internal_1.expect(pipe.transform(date, 'MMMM')).toEqual('June');
                    testing_internal_1.expect(pipe.transform(date, 'd')).toEqual('15');
                    testing_internal_1.expect(pipe.transform(date, 'E')).toEqual('Mon');
                    testing_internal_1.expect(pipe.transform(date, 'EEEE')).toEqual('Monday');
                    testing_internal_1.expect(pipe.transform(date, 'h')).toEqual('9');
                    testing_internal_1.expect(pipe.transform(date, 'hh')).toEqual('09');
                    testing_internal_1.expect(pipe.transform(date, 'HH')).toEqual('09');
                    testing_internal_1.expect(pipe.transform(date, 'j')).toEqual('9 AM');
                    testing_internal_1.expect(pipe.transform(date, 'm')).toEqual('3');
                    testing_internal_1.expect(pipe.transform(date, 's')).toEqual('1');
                    testing_internal_1.expect(pipe.transform(date, 'mm')).toEqual('03');
                    testing_internal_1.expect(pipe.transform(date, 'ss')).toEqual('01');
                    testing_internal_1.expect(pipe.transform(date, 'Z')).toBeDefined();
                });
                testing_internal_1.it('should format common multi component patterns', function () {
                    testing_internal_1.expect(pipe.transform(date, 'E, M/d/y')).toEqual('Mon, 6/15/2015');
                    testing_internal_1.expect(pipe.transform(date, 'E, M/d')).toEqual('Mon, 6/15');
                    testing_internal_1.expect(pipe.transform(date, 'MMM d')).toEqual('Jun 15');
                    testing_internal_1.expect(pipe.transform(date, 'dd/MM/yyyy')).toEqual('15/06/2015');
                    testing_internal_1.expect(pipe.transform(date, 'MM/dd/yyyy')).toEqual('06/15/2015');
                    testing_internal_1.expect(pipe.transform(date, 'yMEd')).toEqual('20156Mon15');
                    testing_internal_1.expect(pipe.transform(date, 'MEd')).toEqual('6Mon15');
                    testing_internal_1.expect(pipe.transform(date, 'MMMd')).toEqual('Jun15');
                    testing_internal_1.expect(pipe.transform(date, 'yMMMMEEEEd')).toEqual('Monday, June 15, 2015');
                    testing_internal_1.expect(pipe.transform(date, 'ms')).toEqual('31');
                    testing_internal_1.expect(pipe.transform(date, 'jm')).toEqual('9:03 AM');
                });
                testing_internal_1.it('should format with pattern aliases', function () {
                    testing_internal_1.expect(pipe.transform(date, 'medium')).toEqual('Jun 15, 2015, 9:03:01 AM');
                    testing_internal_1.expect(pipe.transform(date, 'short')).toEqual('6/15/2015, 9:03 AM');
                    testing_internal_1.expect(pipe.transform(date, 'dd/MM/yyyy')).toEqual('15/06/2015');
                    testing_internal_1.expect(pipe.transform(date, 'MM/dd/yyyy')).toEqual('06/15/2015');
                    testing_internal_1.expect(pipe.transform(date, 'fullDate')).toEqual('Monday, June 15, 2015');
                    testing_internal_1.expect(pipe.transform(date, 'longDate')).toEqual('June 15, 2015');
                    testing_internal_1.expect(pipe.transform(date, 'mediumDate')).toEqual('Jun 15, 2015');
                    testing_internal_1.expect(pipe.transform(date, 'shortDate')).toEqual('6/15/2015');
                    testing_internal_1.expect(pipe.transform(date, 'mediumTime')).toEqual('9:03:01 AM');
                    testing_internal_1.expect(pipe.transform(date, 'shortTime')).toEqual('9:03 AM');
                });
            });
        }
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZV9waXBlX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbW1vbi90ZXN0L3BpcGVzL2RhdGVfcGlwZV9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx1QkFBdUIsaUJBQWlCLENBQUMsQ0FBQTtBQUN6Qyw4QkFBMkIscUNBQXFDLENBQUMsQ0FBQTtBQUNqRSxpQ0FBK0Usd0NBQXdDLENBQUMsQ0FBQTtBQUN4SCw2QkFBK0IsZ0RBQWdELENBQUMsQ0FBQTtBQUVoRixxQkFBMEIsdUJBQXVCLENBQUMsQ0FBQTtBQUVsRDtJQUNFLDJCQUFRLENBQUMsVUFBVSxFQUFFO1FBQ25CLElBQUksSUFBVSxDQUFDO1FBQ2YsSUFBSSxJQUFjLENBQUM7UUFFbkIsNkJBQVUsQ0FBQztZQUNULElBQUksR0FBRyxrQkFBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2hELElBQUksR0FBRyxJQUFJLGlCQUFRLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsMEJBQTBCLEVBQzFCLGNBQVEseUJBQU0sQ0FBQyxJQUFJLDRCQUFZLEVBQUUsQ0FBQyxPQUFPLENBQUMsaUJBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9FLGtFQUFrRTtRQUNsRSxpREFBaUQ7UUFDakQsK0RBQStEO1FBQy9ELEVBQUUsQ0FBQyxDQUFDLCtCQUFnQixDQUFDLGVBQWUsSUFBSSwrQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1lBQ3pFLDJCQUFRLENBQUMsVUFBVSxFQUFFO2dCQUNuQixxQkFBRSxDQUFDLHFCQUFxQixFQUFFLGNBQVEseUJBQU0sQ0FBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBcEIsQ0FBb0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RixxQkFBRSxDQUFDLG9CQUFvQixFQUFFLGNBQVEseUJBQU0sQ0FBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBekIsQ0FBeUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRixxQkFBRSxDQUFDLGdDQUFnQyxFQUNoQyxjQUFRLHlCQUFNLENBQUMsY0FBTSxPQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLEVBQTNCLENBQTJCLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFdkUscUJBQUUsQ0FBQywyQkFBMkIsRUFDM0IsY0FBUSx5QkFBTSxDQUFDLGNBQU0sT0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLHNCQUFzQixDQUFDLEVBQXRDLENBQXNDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFbEYscUJBQUUsQ0FBQyxrQ0FBa0MsRUFBRTtvQkFDckMseUJBQU0sQ0FBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBbEIsQ0FBa0IsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO29CQUMzQyx5QkFBTSxDQUFDLGNBQU0sT0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxFQUFsQixDQUFrQixDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzdDLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCwyQkFBUSxDQUFDLFdBQVcsRUFBRTtnQkFDcEIscUJBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtvQkFDM0MseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbEQseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakQseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0MseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakQseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDbkQseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDckQseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDaEQseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDakQseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDdkQseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0MseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakQseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakQseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbEQseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0MseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0MseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakQseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDakQseUJBQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNsRCxDQUFDLENBQUMsQ0FBQztnQkFFSCxxQkFBRSxDQUFDLCtDQUErQyxFQUFFO29CQUNsRCx5QkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGdC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