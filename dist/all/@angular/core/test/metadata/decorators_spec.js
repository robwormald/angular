/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var core_1 = require('@angular/core');
var reflection_1 = require('@angular/core/src/reflection/reflection');
function main() {
    testing_internal_1.describe('es5 decorators', function () {
        testing_internal_1.it('should declare directive class', function () {
            var MyDirective = core_1.Directive({}).Class({ constructor: function () { this.works = true; } });
            testing_internal_1.expect(new MyDirective().works).toEqual(true);
        });
        testing_internal_1.it('should declare Component class', function () {
            var MyComponent = core_1.Component({}).View({}).View({}).Class({ constructor: function () { this.works = true; } });
            testing_internal_1.expect(new MyComponent().works).toEqual(true);
        });
        testing_internal_1.it('should create type in ES5', function () {
            function MyComponent() { }
            ;
            var as;
            MyComponent.annotations = as = core_1.Component({}).View({});
            testing_internal_1.expect(reflection_1.reflector.annotations(MyComponent)).toEqual(as.annotations);
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9yc19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvbWV0YWRhdGEvZGVjb3JhdG9yc19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBNkUsd0NBQXdDLENBQUMsQ0FBQTtBQUV0SCxxQkFBbUMsZUFBZSxDQUFDLENBQUE7QUFDbkQsMkJBQXdCLHlDQUF5QyxDQUFDLENBQUE7QUFFbEU7SUFDRSwyQkFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQ3pCLHFCQUFFLENBQUMsZ0NBQWdDLEVBQUU7WUFDbkMsSUFBSSxXQUFXLEdBQUcsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBQyxXQUFXLEVBQUUsY0FBYSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7WUFDeEYseUJBQU0sQ0FBQyxJQUFJLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsZ0NBQWdDLEVBQUU7WUFDbkMsSUFBSSxXQUFXLEdBQ1gsZ0JBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFDLFdBQVcsRUFBRSxjQUFhLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQztZQUM1Rix5QkFBTSxDQUFDLElBQUksV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2hELENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQywyQkFBMkIsRUFBRTtZQUM5Qix5QkFBdUIsQ0FBQztZQUFBLENBQUM7WUFDekIsSUFBSSxFQUFPLENBQW1CO1lBQ3hCLFdBQVksQ0FBQyxXQUFXLEdBQUcsRUFBRSxHQUFHLGdCQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzdELHlCQUFNLENBQUMsc0JBQVMsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBcEJlLFlBQUksT0FvQm5CLENBQUEifQ==