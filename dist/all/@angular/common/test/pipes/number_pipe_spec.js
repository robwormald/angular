/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var common_1 = require('@angular/common');
function main() {
    testing_internal_1.describe('Number pipes', function () {
        // TODO(mlaval): enable tests when Intl API is no longer used, see
        // https://github.com/angular/angular/issues/3333
        // Have to restrict to Chrome as IE uses a different formatting
        if (browser_util_1.browserDetection.supportsIntlApi && browser_util_1.browserDetection.isChromeDesktop) {
            testing_internal_1.describe('DecimalPipe', function () {
                var pipe;
                testing_internal_1.beforeEach(function () { pipe = new common_1.DecimalPipe(); });
                testing_internal_1.describe('transform', function () {
                    testing_internal_1.it('should return correct value for numbers', function () {
                        testing_internal_1.expect(pipe.transform(12345)).toEqual('12,345');
                        testing_internal_1.expect(pipe.transform(123, '.2')).toEqual('123.00');
                        testing_internal_1.expect(pipe.transform(1, '3.')).toEqual('001');
                        testing_internal_1.expect(pipe.transform(1.1, '3.4-5')).toEqual('001.1000');
                        testing_internal_1.expect(pipe.transform(1.123456, '3.4-5')).toEqual('001.12346');
                        testing_internal_1.expect(pipe.transform(1.1234)).toEqual('1.123');
                    });
                    testing_internal_1.it('should support strings', function () {
                        testing_internal_1.expect(pipe.transform('12345')).toEqual('12,345');
                        testing_internal_1.expect(pipe.transform('123', '.2')).toEqual('123.00');
                        testing_internal_1.expect(pipe.transform('1', '3.')).toEqual('001');
                        testing_internal_1.expect(pipe.transform('1.1', '3.4-5')).toEqual('001.1000');
                        testing_internal_1.expect(pipe.transform('1.123456', '3.4-5')).toEqual('001.12346');
                        testing_internal_1.expect(pipe.transform('1.1234')).toEqual('1.123');
                    });
                    testing_internal_1.it('should not support other objects', function () {
                        testing_internal_1.expect(function () { return pipe.transform(new Object()); }).toThrowError();
                        testing_internal_1.expect(function () { return pipe.transform('123abc'); }).toThrowError();
                    });
                });
            });
            testing_internal_1.describe('PercentPipe', function () {
                var pipe;
                testing_internal_1.beforeEach(function () { pipe = new common_1.PercentPipe(); });
                testing_internal_1.describe('transform', function () {
                    testing_internal_1.it('should return correct value for numbers', function () {
                        testing_internal_1.expect(pipe.transform(1.23)).toEqual('123%');
                        testing_internal_1.expect(pipe.transform(1.2, '.2')).toEqual('120.00%');
                    });
                    testing_internal_1.it('should not support other objects', function () { testing_internal_1.expect(function () { return pipe.transform(new Object()); }).toThrowError(); });
                });
            });
            testing_internal_1.describe('CurrencyPipe', function () {
                var pipe;
                testing_internal_1.beforeEach(function () { pipe = new common_1.CurrencyPipe(); });
                testing_internal_1.describe('transform', function () {
                    testing_internal_1.it('should return correct value for numbers', function () {
                        testing_internal_1.expect(pipe.transform(123)).toEqual('USD123.00');
                        testing_internal_1.expect(pipe.transform(12, 'EUR', false, '.1')).toEqual('EUR12.0');
                        testing_internal_1.expect(pipe.transform(5.1234, 'USD', false, '.0-3')).toEqual('USD5.123');
                    });
                    testing_internal_1.it('should not support other objects', function () { testing_internal_1.expect(function () { return pipe.transform(new Object()); }).toThrowError(); });
                });
            });
        }
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyX3BpcGVfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3Rlc3QvcGlwZXMvbnVtYmVyX3BpcGVfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQWdGLHdDQUF3QyxDQUFDLENBQUE7QUFDekgsNkJBQStCLGdEQUFnRCxDQUFDLENBQUE7QUFFaEYsdUJBQXFELGlCQUFpQixDQUFDLENBQUE7QUFFdkU7SUFDRSwyQkFBUSxDQUFDLGNBQWMsRUFBRTtRQUN2QixrRUFBa0U7UUFDbEUsaURBQWlEO1FBQ2pELCtEQUErRDtRQUMvRCxFQUFFLENBQUMsQ0FBQywrQkFBZ0IsQ0FBQyxlQUFlLElBQUksK0JBQWdCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztZQUN6RSwyQkFBUSxDQUFDLGFBQWEsRUFBRTtnQkFDdEIsSUFBSSxJQUFpQixDQUFDO2dCQUV0Qiw2QkFBVSxDQUFDLGNBQVEsSUFBSSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRWhELDJCQUFRLENBQUMsV0FBVyxFQUFFO29CQUNwQixxQkFBRSxDQUFDLHlDQUF5QyxFQUFFO3dCQUM1Qyx5QkFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ2hELHlCQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7d0JBQ3BELHlCQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7d0JBQy9DLHlCQUFNLENBQUMsSUFBSSxDQUFDLFNB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