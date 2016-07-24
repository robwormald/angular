/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
function main() {
    testing_internal_1.describe('Injector.NULL', function () {
        testing_internal_1.it('should throw if no arg is given', function () {
            testing_internal_1.expect(function () { return core_1.Injector.NULL.get('someToken'); }).toThrowError('No provider for someToken!');
        });
        testing_internal_1.it('should throw if THROW_IF_NOT_FOUND is given', function () {
            testing_internal_1.expect(function () { return core_1.Injector.NULL.get('someToken', core_1.Injector.THROW_IF_NOT_FOUND); })
                .toThrowError('No provider for someToken!');
        });
        testing_internal_1.it('should return the default value', function () { testing_internal_1.expect(core_1.Injector.NULL.get('someToken', 'notFound')).toEqual('notFound'); });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0b3Jfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L2RpL2luamVjdG9yX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUdILHFCQUF1QixlQUFlLENBQUMsQ0FBQTtBQUN2QyxpQ0FBK0Qsd0NBQXdDLENBQUMsQ0FBQTtBQUl4RztJQUNFLDJCQUFRLENBQUMsZUFBZSxFQUFFO1FBQ3hCLHFCQUFFLENBQUMsaUNBQWlDLEVBQUU7WUFDcEMseUJBQU0sQ0FBQyxjQUFNLE9BQUEsZUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQTlCLENBQThCLENBQUMsQ0FBQyxZQUFZLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUMxRixDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsNkNBQTZDLEVBQUU7WUFDaEQseUJBQU0sQ0FBQyxjQUFNLE9BQUEsZUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLGVBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxFQUEzRCxDQUEyRCxDQUFDO2lCQUNwRSxZQUFZLENBQUMsNEJBQTRCLENBQUMsQ0FBQztRQUNsRCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsaUNBQWlDLEVBQ2pDLGNBQVEseUJBQU0sQ0FBQyxlQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFkZSxZQUFJLE9BY25CLENBQUEifQ==