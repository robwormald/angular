/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var t = require('@angular/core/testing/testing_internal');
var dom_sanitization_service_1 = require('../../src/security/dom_sanitization_service');
function main() {
    t.describe('DOM Sanitization Service', function () {
        t.it('accepts resource URL values for resource contexts', function () {
            var svc = new dom_sanitization_service_1.DomSanitizationServiceImpl();
            var resourceUrl = svc.bypassSecurityTrustResourceUrl('http://hello/world');
            t.expect(svc.sanitize(core_1.SecurityContext.URL, resourceUrl)).toBe('http://hello/world');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdC9zZWN1cml0eS9kb21fc2FuaXRpemF0aW9uX3NlcnZpY2Vfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQThCLGVBQWUsQ0FBQyxDQUFBO0FBQzlDLElBQVksQ0FBQyxXQUFNLHdDQUF3QyxDQUFDLENBQUE7QUFFNUQseUNBQXlDLDZDQUE2QyxDQUFDLENBQUE7QUFFdkY7SUFDRSxDQUFDLENBQUMsUUFBUSxDQUFDLDBCQUEwQixFQUFFO1FBQ3JDLENBQUMsQ0FBQyxFQUFFLENBQUMsbURBQW1ELEVBQUU7WUFDeEQsSUFBTSxHQUFHLEdBQUcsSUFBSSxxREFBMEIsRUFBRSxDQUFDO1lBQzdDLElBQU0sV0FBVyxHQUFHLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxzQkFBZSxDQUFDLEdBQUcsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBQ3RGLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBUmUsWUFBSSxPQVFuQixDQUFBIn0=