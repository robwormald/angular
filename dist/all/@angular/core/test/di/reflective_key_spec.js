/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var reflective_key_1 = require('@angular/core/src/di/reflective_key');
function main() {
    describe('key', function () {
        var registry;
        beforeEach(function () { registry = new reflective_key_1.KeyRegistry(); });
        it('should be equal to another key if type is the same', function () { expect(registry.get('car')).toBe(registry.get('car')); });
        it('should not be equal to another key if types are different', function () { expect(registry.get('car')).not.toBe(registry.get('porsche')); });
        it('should return the passed in key', function () { expect(registry.get(registry.get('car'))).toBe(registry.get('car')); });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdGl2ZV9rZXlfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L2RpL3JlZmxlY3RpdmVfa2V5X3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILCtCQUF5QyxxQ0FBcUMsQ0FBQyxDQUFBO0FBRS9FO0lBQ0UsUUFBUSxDQUFDLEtBQUssRUFBRTtRQUNkLElBQUksUUFBcUIsQ0FBQztRQUUxQixVQUFVLENBQUMsY0FBYSxRQUFRLEdBQUcsSUFBSSw0QkFBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV6RCxFQUFFLENBQUMsb0RBQW9ELEVBQ3BELGNBQWEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFMUUsRUFBRSxDQUFDLDJEQUEyRCxFQUMzRCxjQUFhLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRixFQUFFLENBQUMsaUNBQWlDLEVBQ2pDLGNBQWEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTFGLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWhCZSxZQUFJLE9BZ0JuQixDQUFBIn0=