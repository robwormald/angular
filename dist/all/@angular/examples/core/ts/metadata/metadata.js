/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var CustomDirective;
var Greet = (function () {
    function Greet() {
        this.name = 'World';
    }
    /** @nocollapse */
    Greet.decorators = [
        { type: core_1.Component, args: [{ selector: 'greet', template: 'Hello {{name}}!', directives: [CustomDirective] },] },
    ];
    return Greet;
}());
var Page = (function () {
    function Page(title) {
        this.title = title;
    }
    /** @nocollapse */
    Page.decorators = [
        { type: core_1.Component, args: [{ selector: 'page', template: 'Title: {{title}}' },] },
    ];
    /** @nocollapse */
    Page.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['title',] },] },
    ];
    return Page;
}());
var InputAttrDirective = (function () {
    function InputAttrDirective(type) {
        // type would be 'text' in this example
    }
    /** @nocollapse */
    InputAttrDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: 'input' },] },
    ];
    /** @nocollapse */
    InputAttrDirective.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['type',] },] },
    ];
    return InputAttrDirective;
}());
var InputDirective = (function () {
    function InputDirective() {
        // Add some logic.
    }
    /** @nocollapse */
    InputDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: 'input' },] },
    ];
    /** @nocollapse */
    InputDirective.ctorParameters = [];
    return InputDirective;
}());
var Lowercase = (function () {
    function Lowercase() {
    }
    Lowercase.prototype.transform = function (v, args) { return v.toLowerCase(); };
    /** @nocollapse */
    Lowercase.decorators = [
        { type: core_1.Pipe, args: [{ name: 'lowercase' },] },
    ];
    return Lowercase;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2V4YW1wbGVzL2NvcmUvdHMvbWV0YWRhdGEvbWV0YWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUFvRCxlQUFlLENBQUMsQ0FBQTtBQUVwRSxJQUFJLGVBQXlCLENBQUM7QUFDOUI7SUFBQTtRQUNFLFNBQUksR0FBVyxPQUFPLENBQUM7SUFLekIsQ0FBQztJQUpELGtCQUFrQjtJQUNYLGdCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxVQUFVLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBQyxFQUFHLEVBQUU7S0FDN0csQ0FBQztJQUNGLFlBQUM7QUFBRCxDQUFDLEFBTkQsSUFNQztBQUNEO0lBRUUsY0FBYSxLQUFhO1FBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFBQyxDQUFDO0lBQ3JELGtCQUFrQjtJQUNYLGVBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLGtCQUFrQixFQUFDLEVBQUcsRUFBRTtLQUM5RSxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsbUJBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFHLEVBQUUsRUFBRyxFQUFDO0tBQ3hFLENBQUM7SUFDRixXQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFDRDtJQUNFLDRCQUFhLElBQVk7UUFDdkIsdUNBQXVDO0lBQ3pDLENBQUM7SUFDSCxrQkFBa0I7SUFDWCw2QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLE9BQU8sRUFBQyxFQUFHLEVBQUU7S0FDakQsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLGlDQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRyxFQUFFLEVBQUcsRUFBQztLQUN2RSxDQUFDO0lBQ0YseUJBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQUNEO0lBQ0U7UUFDRSxrQkFBa0I7SUFDcEIsQ0FBQztJQUNILGtCQUFrQjtJQUNYLHlCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFDLEVBQUcsRUFBRTtLQUNqRCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNkJBQWMsR0FBMkQsRUFDL0UsQ0FBQztJQUNGLHFCQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFDRDtJQUFBO0lBTUEsQ0FBQztJQUxDLDZCQUFTLEdBQVQsVUFBVSxDQUFTLEVBQUUsSUFBVyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQy9ELGtCQUFrQjtJQUNYLG9CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLFdBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBRSxXQUFXLEVBQUMsRUFBRyxFQUFFO0tBQzVDLENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUFORCxJQU1DIn0=