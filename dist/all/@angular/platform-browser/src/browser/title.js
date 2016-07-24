/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var dom_adapter_1 = require('../dom/dom_adapter');
/**
 * A service that can be used to get and set the title of a current HTML document.
 *
 * Since an Angular 2 application can't be bootstrapped on the entire HTML document (`<html>` tag)
 * it is not possible to bind to the `text` property of the `HTMLTitleElement` elements
 * (representing the `<title>` tag). Instead, this service can be used to set and get the current
 * title value.
 *
 * @experimental
 */
var Title = (function () {
    function Title() {
    }
    /**
     * Get the title of the current HTML document.
     * @returns {string}
     */
    Title.prototype.getTitle = function () { return dom_adapter_1.getDOM().getTitle(); };
    /**
     * Set the title of the current HTML document.
     * @param newTitle
     */
    Title.prototype.setTitle = function (newTitle) { dom_adapter_1.getDOM().setTitle(newTitle); };
    return Title;
}());
exports.Title = Title;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2Jyb3dzZXIvdGl0bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILDRCQUFxQixvQkFBb0IsQ0FBQyxDQUFBO0FBQzFDOzs7Ozs7Ozs7R0FTRztBQUNIO0lBQUE7SUFZQSxDQUFDO0lBWEM7OztPQUdHO0lBQ0gsd0JBQVEsR0FBUixjQUFxQixNQUFNLENBQUMsb0JBQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUVsRDs7O09BR0c7SUFDSCx3QkFBUSxHQUFSLFVBQVMsUUFBZ0IsSUFBSSxvQkFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RCxZQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFaWSxhQUFLLFFBWWpCLENBQUEifQ==