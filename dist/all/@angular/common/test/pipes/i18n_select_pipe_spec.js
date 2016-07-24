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
function main() {
    testing_internal_1.describe('I18nSelectPipe', function () {
        var pipe;
        var mapping = { 'male': 'Invite him.', 'female': 'Invite her.', 'other': 'Invite them.' };
        testing_internal_1.beforeEach(function () { pipe = new common_1.I18nSelectPipe(); });
        testing_internal_1.it('should be marked as pure', function () { testing_internal_1.expect(new pipe_resolver_1.PipeResolver().resolve(common_1.I18nSelectPipe).pure).toEqual(true); });
        testing_internal_1.describe('transform', function () {
            testing_internal_1.it('should return male text if value is male', function () {
                var val = pipe.transform('male', mapping);
                testing_internal_1.expect(val).toEqual('Invite him.');
            });
            testing_internal_1.it('should return female text if value is female', function () {
                var val = pipe.transform('female', mapping);
                testing_internal_1.expect(val).toEqual('Invite her.');
            });
            testing_internal_1.it('should return "" if value is anything other than male or female', function () {
                var val = pipe.transform('Anything else', mapping);
                testing_internal_1.expect(val).toEqual('');
            });
            testing_internal_1.it('should use "" if value is undefined', function () {
                var val = pipe.transform(void (0), mapping);
                testing_internal_1.expect(val).toEqual('');
            });
            testing_internal_1.it('should not support bad arguments', function () { testing_internal_1.expect(function () { return pipe.transform('male', 'hey'); }).toThrowError(); });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaTE4bl9zZWxlY3RfcGlwZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vdGVzdC9waXBlcy9pMThuX3NlbGVjdF9waXBlX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHVCQUE2QixpQkFBaUIsQ0FBQyxDQUFBO0FBQy9DLDhCQUEyQixxQ0FBcUMsQ0FBQyxDQUFBO0FBQ2pFLGlDQUErRSx3Q0FBd0MsQ0FBQyxDQUFBO0FBRXhIO0lBQ0UsMkJBQVEsQ0FBQyxnQkFBZ0IsRUFBRTtRQUN6QixJQUFJLElBQW9CLENBQUM7UUFDekIsSUFBSSxPQUFPLEdBQUcsRUFBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLGNBQWMsRUFBQyxDQUFDO1FBRXhGLDZCQUFVLENBQUMsY0FBUSxJQUFJLEdBQUcsSUFBSSx1QkFBYyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRCxxQkFBRSxDQUFDLDBCQUEwQixFQUMxQixjQUFRLHlCQUFNLENBQUMsSUFBSSw0QkFBWSxFQUFFLENBQUMsT0FBTyxDQUFDLHVCQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRiwyQkFBUSxDQUFDLFdBQVcsRUFBRTtZQUNwQixxQkFBRSxDQUFDLDBDQUEwQyxFQUFFO2dCQUM3QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDMUMseUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLDhDQUE4QyxFQUFFO2dCQUNqRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDNUMseUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDckMsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLGlFQUFpRSxFQUFFO2dCQUNwRSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDbkQseUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLHFDQUFxQyxFQUFFO2dCQUN4QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDM0MseUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLGtDQUFrQyxFQUNsQyxjQUFRLHlCQUFNLENBQUMsY0FBTSxPQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFPLEtBQUssQ0FBQyxFQUFsQyxDQUFrQyxDQUFDLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRixDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXBDZSxZQUFJLE9Bb0NuQixDQUFBIn0=