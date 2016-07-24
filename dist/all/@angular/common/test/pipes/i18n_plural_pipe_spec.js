/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var common_1 = require('@angular/common');
var pipe_resolver_1 = require('@angular/compiler/src/pipe_resolver');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
function main() {
    testing_internal_1.describe('I18nPluralPipe', function () {
        var localization;
        var pipe;
        var mapping = {
            '=0': 'No messages.',
            '=1': 'One message.',
            'many': 'Many messages.',
            'other': 'There are # messages, that is #.',
        };
        testing_internal_1.beforeEach(function () {
            localization = new TestLocalization();
            pipe = new common_1.I18nPluralPipe(localization);
        });
        testing_internal_1.it('should be marked as pure', function () { testing_internal_1.expect(new pipe_resolver_1.PipeResolver().resolve(common_1.I18nPluralPipe).pure).toEqual(true); });
        testing_internal_1.describe('transform', function () {
            testing_internal_1.it('should return 0 text if value is 0', function () {
                var val = pipe.transform(0, mapping);
                testing_internal_1.expect(val).toEqual('No messages.');
            });
            testing_internal_1.it('should return 1 text if value is 1', function () {
                var val = pipe.transform(1, mapping);
                testing_internal_1.expect(val).toEqual('One message.');
            });
            testing_internal_1.it('should return category messages', function () {
                var val = pipe.transform(4, mapping);
                testing_internal_1.expect(val).toEqual('Many messages.');
            });
            testing_internal_1.it('should interpolate the value into the text where indicated', function () {
                var val = pipe.transform(6, mapping);
                testing_internal_1.expect(val).toEqual('There are 6 messages, that is 6.');
            });
            testing_internal_1.it('should use "" if value is undefined', function () {
                var val = pipe.transform(void (0), mapping);
                testing_internal_1.expect(val).toEqual('');
            });
            testing_internal_1.it('should not support bad arguments', function () { testing_internal_1.expect(function () { return pipe.transform(0, 'hey'); }).toThrowError(); });
        });
    });
}
exports.main = main;
var TestLocalization = (function (_super) {
    __extends(TestLocalization, _super);
    function TestLocalization() {
        _super.apply(this, arguments);
    }
    TestLocalization.prototype.getPluralCategory = function (value) { return value > 1 && value < 6 ? 'many' : 'other'; };
    return TestLocalization;
}(common_1.NgLocalization));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9wbHVyYWxfcGlwZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vdGVzdC9waXBlcy9pMThuX3BsdXJhbF9waXBlX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsdUJBQTZDLGlCQUFpQixDQUFDLENBQUE7QUFDL0QsOEJBQTJCLHFDQUFxQyxDQUFDLENBQUE7QUFDakUsaUNBQStFLHdDQUF3QyxDQUFDLENBQUE7QUFFeEg7SUFDRSwyQkFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQ3pCLElBQUksWUFBNEIsQ0FBQztRQUNqQyxJQUFJLElBQW9CLENBQUM7UUFFekIsSUFBSSxPQUFPLEdBQUc7WUFDWixJQUFJLEVBQUUsY0FBYztZQUNwQixJQUFJLEVBQUUsY0FBYztZQUNwQixNQUFNLEVBQUUsZ0JBQWdCO1lBQ3hCLE9BQU8sRUFBRSxrQ0FBa0M7U0FDNUMsQ0FBQztRQUVGLDZCQUFVLENBQUM7WUFDVCxZQUFZLEdBQUcsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3RDLElBQUksR0FBRyxJQUFJLHVCQUFjLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLDBCQUEwQixFQUMxQixjQUFRLHlCQUFNLENBQUMsSUFBSSw0QkFBWSxFQUFFLENBQUMsT0FBTyxDQUFDLHVCQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRiwyQkFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwQixxQkFBRSxDQUFDLG9DQUFvQyxFQUFFO2dCQUN2QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDckMseUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLG9DQUFvQyxFQUFFO2dCQUN2QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDckMseUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLGlDQUFpQyxFQUFFO2dCQUNwQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDckMseUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN4QyxDQUFDLENBQUMsQ0FBQztZQUVILHFCQUFFLENBQUMsNERBQTRELEVBQUU7Z0JBQy9ELElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNyQyx5QkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQzFELENBQUMsQ0FBQyxDQUFDO1lBRUgscUJBQUUsQ0FBQyxxQ0FBcUMsRUFBRTtnQkFDeEMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQzNDLHlCQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxDQUFDO1lBRUgscUJBQUUsQ0FBQyxrQ0FBa0MsRUFDbEMsY0FBUSx5QkFBTSxDQUFDLGNBQU0sT0FBQSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBTyxLQUFLLENBQUMsRUFBN0IsQ0FBNkIsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFuRGUsWUFBSSxPQW1EbkIsQ0FBQTtBQUVEO0lBQStCLG9DQUFjO0lBQTdDO1FBQStCLDhCQUFjO0lBRTdDLENBQUM7SUFEQyw0Q0FBaUIsR0FBakIsVUFBa0IsS0FBYSxJQUFZLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLEtBQUssR0FBRyxDQUFDLEdBQUcsTUFBTSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDaEcsdUJBQUM7QUFBRCxDQUFDLEFBRkQsQ0FBK0IsdUJBQWMsR0FFNUMifQ==