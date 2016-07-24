/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var platform_browser_1 = require('@angular/platform-browser');
var debugElement;
var MyDirective = (function () {
    function MyDirective() {
    }
    return MyDirective;
}());
// #docregion by_all
debugElement.query(platform_browser_1.By.all());
// #enddocregion
// #docregion by_css
debugElement.query(platform_browser_1.By.css('[attribute]'));
// #enddocregion
// #docregion by_directive
debugElement.query(platform_browser_1.By.directive(MyDirective));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2V4YW1wbGVzL3BsYXRmb3JtLWJyb3dzZXIvZG9tL2RlYnVnL3RzL2J5L2J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFHSCxpQ0FBaUIsMkJBQTJCLENBQUMsQ0FBQTtBQUU3QyxJQUFJLFlBQTBCLENBQUM7QUFDL0I7SUFBQTtJQUFtQixDQUFDO0lBQUQsa0JBQUM7QUFBRCxDQUFDLEFBQXBCLElBQW9CO0FBRXBCLG9CQUFvQjtBQUNwQixZQUFZLENBQUMsS0FBSyxDQUFDLHFCQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUM3QixnQkFBZ0I7QUFFaEIsb0JBQW9CO0FBQ3BCLFlBQVksQ0FBQyxLQUFLLENBQUMscUJBQUUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztBQUMxQyxnQkFBZ0I7QUFFaEIsMEJBQTBCO0FBQzFCLFlBQVksQ0FBQyxLQUFLLENBQUMscUJBQUUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyJ9