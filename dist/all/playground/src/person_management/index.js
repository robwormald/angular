/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
/**
 * You can find the Angular 1 implementation of this example here:
 * https://github.com/wardbell/ng1DataBinding
 */
// ---- model
var _nextId = 1;
var Person = (function () {
    function Person(firstName, lastName, yearOfBirth) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.yearOfBirth = yearOfBirth;
        this.personId = _nextId++;
        this.firstName = firstName;
        this.lastName = lastName;
        this.mom = null;
        this.dad = null;
        this.friends = [];
        this.personId = _nextId++;
    }
    Object.defineProperty(Person.prototype, "age", {
        get: function () { return 2015 - this.yearOfBirth; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "fullName", {
        get: function () { return this.firstName + " " + this.lastName; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "friendNames", {
        get: function () { return this.friends.map(function (f) { return f.fullName; }).join(', '); },
        enumerable: true,
        configurable: true
    });
    return Person;
}());
var DataService = (function () {
    function DataService() {
        var _this = this;
        this.persons = [
            new Person('Victor', 'Savkin', 1930),
            new Person('Igor', 'Minar', 1920),
            new Person('John', 'Papa', 1910),
            new Person('Nancy', 'Duarte', 1910),
            new Person('Jack', 'Papa', 1910),
            new Person('Jill', 'Papa', 1910),
            new Person('Ward', 'Bell', 1910),
            new Person('Robert', 'Bell', 1910),
            new Person('Tracy', 'Ward', 1910),
            new Person('Dan', 'Wahlin', 1910)
        ];
        this.persons[0].friends = [0, 1, 2, 6, 9].map(function (_) { return _this.persons[_]; });
        this.persons[1].friends = [0, 2, 6, 9].map(function (_) { return _this.persons[_]; });
        this.persons[2].friends = [0, 1, 6, 9].map(function (_) { return _this.persons[_]; });
        this.persons[6].friends = [0, 1, 2, 9].map(function (_) { return _this.persons[_]; });
        this.persons[9].friends = [0, 1, 2, 6].map(function (_) { return _this.persons[_]; });
        this.persons[2].mom = this.persons[5];
        this.persons[2].dad = this.persons[4];
        this.persons[6].mom = this.persons[8];
        this.persons[6].dad = this.persons[7];
        this.currentPerson = this.persons[0];
    }
    /** @nocollapse */
    DataService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    DataService.ctorParameters = [];
    return DataService;
}());
var FullNameComponent = (function () {
    function FullNameComponent(_service) {
        this._service = _service;
    }
    Object.defineProperty(FullNameComponent.prototype, "person", {
        get: function () { return this._service.currentPerson; },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    FullNameComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'full-name-cmp',
                    template: "\n    <h1>Edit Full Name</h1>\n    <div>\n      <form>\n          <div>\n            <label>\n              First: <input [(ngModel)]=\"person.firstName\" type=\"text\" placeholder=\"First name\">\n            </label>\n          </div>\n\n          <div>\n            <label>\n              Last: <input [(ngModel)]=\"person.lastName\" type=\"text\" placeholder=\"Last name\">\n            </label>\n          </div>\n\n          <div>\n            <label>{{person.fullName}}</label>\n          </div>\n      </form>\n    </div>\n  ",
                    directives: [common_1.FORM_DIRECTIVES]
                },] },
    ];
    /** @nocollapse */
    FullNameComponent.ctorParameters = [
        { type: DataService, },
    ];
    return FullNameComponent;
}());
var PersonsDetailComponent = (function () {
    function PersonsDetailComponent(_service) {
        this._service = _service;
    }
    Object.defineProperty(PersonsDetailComponent.prototype, "person", {
        get: function () { return this._service.currentPerson; },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    PersonsDetailComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'person-detail-cmp',
                    template: "\n    <h2>{{person.fullName}}</h2>\n\n    <div>\n      <form>\n        <div>\n\t\t\t\t\t<label>First: <input [(ngModel)]=\"person.firstName\" type=\"text\" placeholder=\"First name\"></label>\n\t\t\t\t</div>\n\n        <div>\n\t\t\t\t\t<label>Last: <input [(ngModel)]=\"person.lastName\" type=\"text\" placeholder=\"Last name\"></label>\n\t\t\t\t</div>\n\n        <div>\n\t\t\t\t\t<label>Year of birth: <input [(ngModel)]=\"person.yearOfBirth\" type=\"number\" placeholder=\"Year of birth\"></label>\n          Age: {{person.age}}\n\t\t\t\t</div>\n        <div *ngIf=\"person.mom != null\">\n\t\t\t\t\t<label>Mom:</label>\n          <input [(ngModel)]=\"person.mom.firstName\" type=\"text\" placeholder=\"Mom's first name\">\n          <input [(ngModel)]=\"person.mom.lastName\" type=\"text\" placeholder=\"Mom's last name\">\n          {{person.mom.fullName}}\n\t\t\t\t</div>\n\n        <div *ngIf=\"person.dad != null\">\n\t\t\t\t\t<label>Dad:</label>\n          <input [(ngModel)]=\"person.dad.firstName\" type=\"text\" placeholder=\"Dad's first name\">\n          <input [(ngModel)]=\"person.dad.lastName\" type=\"text\" placeholder=\"Dad's last name\">\n          {{person.dad.fullName}}\n\t\t\t\t</div>\n\n        <div *ngIf=\"person.friends.length > 0\">\n\t\t\t\t\t<label>Friends:</label>\n          {{person.friendNames}}\n\t\t\t\t</div>\n      </form>\n    </div>\n  ",
                    directives: [common_1.FORM_DIRECTIVES, common_1.NgIf]
                },] },
    ];
    /** @nocollapse */
    PersonsDetailComponent.ctorParameters = [
        { type: DataService, },
    ];
    return PersonsDetailComponent;
}());
var PersonsComponent = (function () {
    function PersonsComponent(_service) {
        this._service = _service;
        this.persons = _service.persons;
    }
    PersonsComponent.prototype.select = function (person) { this._service.currentPerson = person; };
    /** @nocollapse */
    PersonsComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'persons-cmp',
                    template: "\n    <h1>FullName Demo</h1>\n    <div>\n      <ul>\n  \t\t  <li *ngFor=\"let person of persons\">\n  \t\t\t  <label (click)=\"select(person)\">{{person.fullName}}</label>\n  \t\t\t</li>\n  \t </ul>\n\n     <person-detail-cmp></person-detail-cmp>\n    </div>\n  ",
                    directives: [common_1.FORM_DIRECTIVES, PersonsDetailComponent, common_1.NgFor]
                },] },
    ];
    /** @nocollapse */
    PersonsComponent.ctorParameters = [
        { type: DataService, },
    ];
    return PersonsComponent;
}());
var PersonManagementApplication = (function () {
    function PersonManagementApplication() {
    }
    PersonManagementApplication.prototype.switchToEditName = function () { this.mode = 'editName'; };
    PersonManagementApplication.prototype.switchToPersonList = function () { this.mode = 'personList'; };
    /** @nocollapse */
    PersonManagementApplication.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'person-management-app',
                    viewProviders: [DataService],
                    template: "\n    <button (click)=\"switchToEditName()\">Edit Full Name</button>\n    <button (click)=\"switchToPersonList()\">Person Array</button>\n\n    <full-name-cmp *ngIf=\"mode == 'editName'\"></full-name-cmp>\n    <persons-cmp *ngIf=\"mode == 'personList'\"></persons-cmp>\n  ",
                    directives: [FullNameComponent, PersonsComponent, common_1.NgIf]
                },] },
    ];
    return PersonManagementApplication;
}());
function main() {
    platform_browser_dynamic_1.bootstrap(PersonManagementApplication);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL3BlcnNvbl9tYW5hZ2VtZW50L2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5Q0FBd0IsbUNBQW1DLENBQUMsQ0FBQTtBQUM1RCxxQkFBb0MsZUFBZSxDQUFDLENBQUE7QUFDcEQsdUJBQTJDLGlCQUFpQixDQUFDLENBQUE7QUFFN0Q7OztHQUdHO0FBRUgsYUFBYTtBQUViLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNoQjtJQU1FLGdCQUFtQixTQUFpQixFQUFTLFFBQWdCLEVBQVMsV0FBbUI7UUFBdEUsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFTLGFBQVEsR0FBUixRQUFRLENBQVE7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUN2RixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELHNCQUFJLHVCQUFHO2FBQVAsY0FBb0IsTUFBTSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDckQsc0JBQUksNEJBQVE7YUFBWixjQUF5QixNQUFNLENBQUksSUFBSSxDQUFDLFNBQVMsU0FBSSxJQUFJLENBQUMsUUFBVSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDdkUsc0JBQUksK0JBQVc7YUFBZixjQUE0QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsUUFBUSxFQUFWLENBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ3BGLGFBQUM7QUFBRCxDQUFDLEFBbkJELElBbUJDO0FBQ0Q7SUFJRTtRQUpGLGlCQXNDQztRQWpDRyxJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUM7WUFDcEMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7WUFDakMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDaEMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUM7WUFDbkMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDaEMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDaEMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDaEMsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDbEMsSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7WUFDakMsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUM7U0FDbEMsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQWYsQ0FBZSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFmLENBQWUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBZixDQUFlLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLEtBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQWYsQ0FBZSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFmLENBQWUsQ0FBQyxDQUFDO1FBRWpFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFDSCxrQkFBa0I7SUFDWCxzQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCwwQkFBYyxHQUEyRCxFQUMvRSxDQUFDO0lBQ0Ysa0JBQUM7QUFBRCxDQUFDLEFBdENELElBc0NDO0FBQ0Q7SUFDRSwyQkFBb0IsUUFBcUI7UUFBckIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtJQUFHLENBQUM7SUFDN0Msc0JBQUkscUNBQU07YUFBVixjQUF1QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUM5RCxrQkFBa0I7SUFDWCw0QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsZUFBZTtvQkFDekIsUUFBUSxFQUFFLHVoQkFxQlQ7b0JBQ0QsVUFBVSxFQUFFLENBQUMsd0JBQWUsQ0FBQztpQkFDOUIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGdDQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztLQUNwQixDQUFDO0lBQ0Ysd0JBQUM7QUFBRCxDQUFDLEFBcENELElBb0NDO0FBQ0Q7SUFDRSxnQ0FBb0IsUUFBcUI7UUFBckIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtJQUFHLENBQUM7SUFDN0Msc0JBQUksMENBQU07YUFBVixjQUF1QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUM5RCxrQkFBa0I7SUFDWCxpQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsbTJDQXNDVDtvQkFDRCxVQUFVLEVBQUUsQ0FBQyx3QkFBZSxFQUFFLGFBQUksQ0FBQztpQkFDcEMsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHFDQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLFdBQVcsR0FBRztLQUNwQixDQUFDO0lBQ0YsNkJBQUM7QUFBRCxDQUFDLEFBckRELElBcURDO0FBQ0Q7SUFHRSwwQkFBb0IsUUFBcUI7UUFBckIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUFDLENBQUM7SUFFL0UsaUNBQU0sR0FBTixVQUFPLE1BQWMsSUFBVSxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLGtCQUFrQjtJQUNYLDJCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxhQUFhO29CQUN2QixRQUFRLEVBQUUsd1FBV1Q7b0JBQ0QsVUFBVSxFQUFFLENBQUMsd0JBQWUsRUFBRSxzQkFBc0IsRUFBRSxjQUFLLENBQUM7aUJBQzdELEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCwrQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxXQUFXLEdBQUc7S0FDcEIsQ0FBQztJQUNGLHVCQUFDO0FBQUQsQ0FBQyxBQTdCRCxJQTZCQztBQUNEO0lBQUE7SUFvQkEsQ0FBQztJQWpCQyxzREFBZ0IsR0FBaEIsY0FBMkIsSUFBSSxDQUFDLElBQUksR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBQ3BELHdEQUFrQixHQUFsQixjQUE2QixJQUFJLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDMUQsa0JBQWtCO0lBQ1gsc0NBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsYUFBYSxFQUFFLENBQUMsV0FBVyxDQUFDO29CQUM1QixRQUFRLEVBQUUsa1JBTVQ7b0JBQ0QsVUFBVSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsYUFBSSxDQUFDO2lCQUN4RCxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0NBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDO0FBRUQ7SUFDRSxvQ0FBUyxDQUFDLDJCQUEyQixDQUFDLENBQUM7QUFDekMsQ0FBQztBQUZlLFlBQUksT0FFbkIsQ0FBQSJ9