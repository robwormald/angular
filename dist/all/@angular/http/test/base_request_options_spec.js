/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var base_request_options_1 = require('../src/base_request_options');
var enums_1 = require('../src/enums');
function main() {
    testing_internal_1.describe('BaseRequestOptions', function () {
        testing_internal_1.it('should create a new object when calling merge', function () {
            var options1 = new base_request_options_1.BaseRequestOptions();
            var options2 = options1.merge(new base_request_options_1.RequestOptions({ method: enums_1.RequestMethod.Delete }));
            testing_internal_1.expect(options2).not.toBe(options1);
            testing_internal_1.expect(options2.method).toBe(enums_1.RequestMethod.Delete);
        });
        testing_internal_1.it('should retain previously merged values when merging again', function () {
            var options1 = new base_request_options_1.BaseRequestOptions();
            var options2 = options1.merge(new base_request_options_1.RequestOptions({ method: enums_1.RequestMethod.Delete }));
            testing_internal_1.expect(options2.method).toBe(enums_1.RequestMethod.Delete);
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZV9yZXF1ZXN0X29wdGlvbnNfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvaHR0cC90ZXN0L2Jhc2VfcmVxdWVzdF9vcHRpb25zX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUE0RSx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3JILHFDQUFpRCw2QkFBNkIsQ0FBQyxDQUFBO0FBQy9FLHNCQUE0QixjQUFjLENBQUMsQ0FBQTtBQUUzQztJQUNFLDJCQUFRLENBQUMsb0JBQW9CLEVBQUU7UUFDN0IscUJBQUUsQ0FBQywrQ0FBK0MsRUFBRTtZQUNsRCxJQUFJLFFBQVEsR0FBRyxJQUFJLHlDQUFrQixFQUFFLENBQUM7WUFDeEMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLHFDQUFjLENBQUMsRUFBQyxNQUFNLEVBQUUscUJBQWEsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEYseUJBQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BDLHlCQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxxQkFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQywyREFBMkQsRUFBRTtZQUM5RCxJQUFJLFFBQVEsR0FBRyxJQUFJLHlDQUFrQixFQUFFLENBQUM7WUFDeEMsSUFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLHFDQUFjLENBQUMsRUFBQyxNQUFNLEVBQUUscUJBQWEsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEYseUJBQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLHFCQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckQsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFmZSxZQUFJLE9BZW5CLENBQUEifQ==