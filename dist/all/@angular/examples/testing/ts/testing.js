/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var db;
var MyService = (function () {
    function MyService() {
    }
    return MyService;
}());
var MyMockService = (function () {
    function MyMockService() {
    }
    return MyMockService;
}());
// #docregion describeIt
testing_internal_1.describe('some component', function () {
    testing_internal_1.it('does something', function () {
        // This is a test.
    });
});
// #enddocregion
// #docregion fdescribe
fdescribe('some component', function () {
    testing_internal_1.it('has a test', function () {
        // This test will run.
    });
});
testing_internal_1.describe('another component', function () {
    testing_internal_1.it('also has a test', function () { throw 'This test will not run.'; });
});
// #enddocregion
// #docregion xdescribe
testing_internal_1.xdescribe('some component', function () { testing_internal_1.it('has a test', function () { throw 'This test will not run.'; }); });
testing_internal_1.describe('another component', function () {
    testing_internal_1.it('also has a test', function () {
        // This test will run.
    });
});
// #enddocregion
// #docregion fit
testing_internal_1.describe('some component', function () {
    fit('has a test', function () {
        // This test will run.
    });
    testing_internal_1.it('has another test', function () { throw 'This test will not run.'; });
});
// #enddocregion
// #docregion xit
testing_internal_1.describe('some component', function () {
    testing_internal_1.xit('has a test', function () { throw 'This test will not run.'; });
    testing_internal_1.it('has another test', function () {
        // This test will run.
    });
});
// #enddocregion
// #docregion beforeEach
testing_internal_1.describe('some component', function () {
    testing_internal_1.beforeEach(function () { db.connect(); });
    testing_internal_1.it('uses the db', function () {
        // Database is connected.
    });
});
// #enddocregion
// #docregion beforeEachProviders
testing_internal_1.describe('some component', function () {
    testing_internal_1.beforeEachProviders(function () { return [{ provide: MyService, useClass: MyMockService }]; });
    testing_internal_1.it('uses MyService', testing_internal_1.inject([MyService], function (service) {
        // service is an instance of MyMockService.
    }));
});
// #enddocregion
// #docregion afterEach
testing_internal_1.describe('some component', function () {
    testing_internal_1.afterEach(function (done) { db.reset().then(function (_) { return done(); }); });
    testing_internal_1.it('uses the db', function () {
        // This test can leave the database in a dirty state.
        // The afterEach will ensure it gets reset.
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZXhhbXBsZXMvdGVzdGluZy90cy90ZXN0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBK0Ysd0NBQXdDLENBQUMsQ0FBQTtBQUV4SSxJQUFJLEVBQU8sQ0FBQztBQUNaO0lBQUE7SUFBaUIsQ0FBQztJQUFELGdCQUFDO0FBQUQsQ0FBQyxBQUFsQixJQUFrQjtBQUNsQjtJQUFBO0lBQTBDLENBQUM7SUFBRCxvQkFBQztBQUFELENBQUMsQUFBM0MsSUFBMkM7QUFFM0Msd0JBQXdCO0FBQ3hCLDJCQUFRLENBQUMsZ0JBQWdCLEVBQUU7SUFDekIscUJBQUUsQ0FBQyxnQkFBZ0IsRUFBRTtRQUNJLGtCQUFrQjtJQUN0QixDQUFDLENBQUMsQ0FBQztBQUMxQixDQUFDLENBQUMsQ0FBQztBQUNILGdCQUFnQjtBQUVoQix1QkFBdUI7QUFDdkIsU0FBUyxDQUFDLGdCQUFnQixFQUFFO0lBQzFCLHFCQUFFLENBQUMsWUFBWSxFQUFFO1FBQ0ksc0JBQXNCO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsMkJBQVEsQ0FBQyxtQkFBbUIsRUFBRTtJQUM1QixxQkFBRSxDQUFDLGlCQUFpQixFQUFFLGNBQVEsTUFBTSx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BFLENBQUMsQ0FBQyxDQUFDO0FBQ0gsZ0JBQWdCO0FBRWhCLHVCQUF1QjtBQUN2Qiw0QkFBUyxDQUNMLGdCQUFnQixFQUFFLGNBQVEscUJBQUUsQ0FBQyxZQUFZLEVBQUUsY0FBUSxNQUFNLHlCQUF5QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRiwyQkFBUSxDQUFDLG1CQUFtQixFQUFFO0lBQzVCLHFCQUFFLENBQUMsaUJBQWlCLEVBQUU7UUFDSSxzQkFBc0I7SUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFDM0IsQ0FBQyxDQUFDLENBQUM7QUFDSCxnQkFBZ0I7QUFFaEIsaUJBQWlCO0FBQ2pCLDJCQUFRLENBQUMsZ0JBQWdCLEVBQUU7SUFDekIsR0FBRyxDQUFDLFlBQVksRUFBRTtRQUNJLHNCQUFzQjtJQUMxQixDQUFDLENBQUMsQ0FBQztJQUNyQixxQkFBRSxDQUFDLGtCQUFrQixFQUFFLGNBQVEsTUFBTSx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLENBQUMsQ0FBQyxDQUFDO0FBQ0gsZ0JBQWdCO0FBRWhCLGlCQUFpQjtBQUNqQiwyQkFBUSxDQUFDLGdCQUFnQixFQUFFO0lBQ3pCLHNCQUFHLENBQUMsWUFBWSxFQUFFLGNBQVEsTUFBTSx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlELHFCQUFFLENBQUMsa0JBQWtCLEVBQUU7UUFDSSxzQkFBc0I7SUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFDNUIsQ0FBQyxDQUFDLENBQUM7QUFDSCxnQkFBZ0I7QUFFaEIsd0JBQXdCO0FBQ3hCLDJCQUFRLENBQUMsZ0JBQWdCLEVBQUU7SUFDekIsNkJBQVUsQ0FBQyxjQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BDLHFCQUFFLENBQUMsYUFBYSxFQUFFO1FBQ0kseUJBQXlCO0lBQzdCLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLENBQUMsQ0FBQyxDQUFDO0FBQ0gsZ0JBQWdCO0FBRWhCLGlDQUFpQztBQUNqQywyQkFBUSxDQUFDLGdCQUFnQixFQUFFO0lBQ3pCLHNDQUFtQixDQUFDLGNBQU0sT0FBQSxDQUFDLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFDLENBQUMsRUFBL0MsQ0FBK0MsQ0FBQyxDQUFDO0lBQzNFLHFCQUFFLENBQUMsZ0JBQWdCLEVBQUUseUJBQU0sQ0FDRixDQUFDLFNBQVMsQ0FBQyxFQUFFLFVBQUMsT0FBc0I7UUFDbkIsMkNBQTJDO0lBQy9DLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUMsQ0FBQyxDQUFDLENBQUM7QUFDSCxnQkFBZ0I7QUFFaEIsdUJBQXVCO0FBQ3ZCLDJCQUFRLENBQUMsZ0JBQWdCLEVBQUU7SUFDekIsNEJBQVMsQ0FBQyxVQUFDLElBQWMsSUFBTyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsQ0FBTSxJQUFLLE9BQUEsSUFBSSxFQUFFLEVBQU4sQ0FBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN4RSxxQkFBRSxDQUFDLGFBQWEsRUFBRTtRQUNJLHFEQUFxRDtRQUNyRCwyQ0FBMkM7SUFDL0MsQ0FBQyxDQUFDLENBQUM7QUFDdkIsQ0FBQyxDQUFDLENBQUMifQ==