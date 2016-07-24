/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var testing_1 = require('../testing');
var core_1 = require('@angular/core');
function main() {
    testing_internal_1.describe('MockNgModuleResolver', function () {
        var ngModuleResolver;
        testing_internal_1.beforeEach(testing_internal_1.inject([core_1.Injector], function (injector) {
            ngModuleResolver = new testing_1.MockNgModuleResolver(injector);
        }));
        testing_internal_1.describe('NgModule overriding', function () {
            testing_internal_1.it('should fallback to the default NgModuleResolver when templates are not overridden', function () {
                var ngModule = ngModuleResolver.resolve(SomeNgModule);
                testing_internal_1.expect(ngModule.declarations).toEqual([SomeDirective]);
            });
            testing_internal_1.it('should allow overriding the @NgModule', function () {
                ngModuleResolver.setNgModule(SomeNgModule, new core_1.NgModuleMetadata({ declarations: [SomeOtherDirective] }));
                var ngModule = ngModuleResolver.resolve(SomeNgModule);
                testing_internal_1.expect(ngModule.declarations).toEqual([SomeOtherDirective]);
            });
        });
    });
}
exports.main = main;
var SomeDirective = (function () {
    function SomeDirective() {
    }
    return SomeDirective;
}());
var SomeOtherDirective = (function () {
    function SomeOtherDirective() {
    }
    return SomeOtherDirective;
}());
var SomeNgModule = (function () {
    function SomeNgModule() {
    }
    /** @nocollapse */
    SomeNgModule.decorators = [
        { type: core_1.NgModule, args: [{ declarations: [SomeDirective] },] },
    ];
    return SomeNgModule;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlX3Jlc29sdmVyX21vY2tfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdC9uZ19tb2R1bGVfcmVzb2x2ZXJfbW9ja19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBd0Usd0NBQXdDLENBQUMsQ0FBQTtBQUdqSCx3QkFBbUMsWUFBWSxDQUFDLENBQUE7QUFDaEQscUJBQW1ELGVBQWUsQ0FBQyxDQUFBO0FBRW5FO0lBQ0UsMkJBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUMvQixJQUFJLGdCQUFzQyxDQUFDO1FBRTNDLDZCQUFVLENBQUMseUJBQU0sQ0FBQyxDQUFDLGVBQVEsQ0FBQyxFQUFFLFVBQUMsUUFBa0I7WUFDL0MsZ0JBQWdCLEdBQUcsSUFBSSw4QkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RCxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRUosMkJBQVEsQ0FBQyxxQkFBcUIsRUFBRTtZQUM5QixxQkFBRSxDQUFDLG1GQUFtRixFQUNuRjtnQkFDRSxJQUFJLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ3RELHlCQUFNLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUM7WUFFTixxQkFBRSxDQUFDLHVDQUF1QyxFQUFFO2dCQUMxQyxnQkFBZ0IsQ0FBQyxXQUFXLENBQ3hCLFlBQVksRUFBRSxJQUFJLHVCQUFnQixDQUFDLEVBQUMsWUFBWSxFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUUsSUFBSSxRQUFRLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUN0RCx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDOUQsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXZCZSxZQUFJLE9BdUJuQixDQUFBO0FBRUQ7SUFBQTtJQUFxQixDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBQXRCLElBQXNCO0FBRXRCO0lBQUE7SUFBMEIsQ0FBQztJQUFELHlCQUFDO0FBQUQsQ0FBQyxBQUEzQixJQUEyQjtBQUMzQjtJQUFBO0lBS0EsQ0FBQztJQUpELGtCQUFrQjtJQUNYLHVCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGVBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFDLEVBQUcsRUFBRTtLQUM1RCxDQUFDO0lBQ0YsbUJBQUM7QUFBRCxDQUFDLEFBTEQsSUFLQyJ9