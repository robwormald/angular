/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var async_1 = require('../../src/facade/async');
var xhr_impl_1 = require('../../src/xhr/xhr_impl');
function main() {
    testing_internal_1.describe('XHRImpl', function () {
        var xhr;
        // TODO(juliemr): This file currently won't work with dart unit tests run using
        // exclusive it or describe (iit or ddescribe). This is because when
        // pub run test is executed against this specific file the relative paths
        // will be relative to here, so url200 should look like
        // static_assets/200.html.
        // We currently have no way of detecting this.
        var url200 = '/base/modules/@angular/platform-browser/test/browser/static_assets/200.html';
        var url404 = '/bad/path/404.html';
        testing_internal_1.beforeEach(function () { xhr = new xhr_impl_1.XHRImpl(); });
        testing_internal_1.it('should resolve the Promise with the file content on success', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            xhr.get(url200).then(function (text) {
                testing_internal_1.expect(text.trim()).toEqual('<p>hey</p>');
                async.done();
            });
        }), 10000);
        testing_internal_1.it('should reject the Promise on failure', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            async_1.PromiseWrapper.catchError(xhr.get(url404), function (e) {
                testing_internal_1.expect(e).toEqual("Failed to load " + url404);
                async.done();
                return null;
            });
        }), 10000);
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGhyX2ltcGxfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci1keW5hbWljL3Rlc3QveGhyL3hocl9pbXBsX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUFnRyx3Q0FBd0MsQ0FBQyxDQUFBO0FBRXpJLHNCQUE2Qix3QkFBd0IsQ0FBQyxDQUFBO0FBQ3RELHlCQUFzQix3QkFBd0IsQ0FBQyxDQUFBO0FBRS9DO0lBQ0UsMkJBQVEsQ0FBQyxTQUFTLEVBQUU7UUFDbEIsSUFBSSxHQUFZLENBQUM7UUFFakIsK0VBQStFO1FBQy9FLG9FQUFvRTtRQUNwRSx5RUFBeUU7UUFDekUsdURBQXVEO1FBQ3ZELDBCQUEwQjtRQUMxQiw4Q0FBOEM7UUFDOUMsSUFBSSxNQUFNLEdBQUcsNkVBQTZFLENBQUM7UUFDM0YsSUFBSSxNQUFNLEdBQUcsb0JBQW9CLENBQUM7UUFFbEMsNkJBQVUsQ0FBQyxjQUFRLEdBQUcsR0FBRyxJQUFJLGtCQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTNDLHFCQUFFLENBQUMsNkRBQTZELEVBQzdELHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUFJO2dCQUN4Qix5QkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDMUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2YsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUVkLHFCQUFFLENBQUMsc0NBQXNDLEVBQ3RDLHlCQUFNLENBQUMsQ0FBQyxxQ0FBa0IsQ0FBQyxFQUFFLFVBQUMsS0FBeUI7WUFDckQsc0JBQWMsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxVQUFDLENBQUM7Z0JBQzNDLHlCQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLG9CQUFrQixNQUFRLENBQUMsQ0FBQztnQkFDOUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2hCLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWhDZSxZQUFJLE9BZ0NuQixDQUFBIn0=