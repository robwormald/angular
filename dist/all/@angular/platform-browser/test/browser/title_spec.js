/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var platform_browser_1 = require('@angular/platform-browser');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
function main() {
    describe('title service', function () {
        var initialTitle = dom_adapter_1.getDOM().getTitle();
        var titleService = new platform_browser_1.Title();
        afterEach(function () { dom_adapter_1.getDOM().setTitle(initialTitle); });
        it('should allow reading initial title', function () { expect(titleService.getTitle()).toEqual(initialTitle); });
        it('should set a title on the injected document', function () {
            titleService.setTitle('test title');
            expect(dom_adapter_1.getDOM().getTitle()).toEqual('test title');
            expect(titleService.getTitle()).toEqual('test title');
        });
        it('should reset title to empty string if title not provided', function () {
            titleService.setTitle(null);
            expect(dom_adapter_1.getDOM().getTitle()).toEqual('');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGl0bGVfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci90ZXN0L2Jyb3dzZXIvdGl0bGVfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQW9CLDJCQUEyQixDQUFDLENBQUE7QUFDaEQsNEJBQXFCLCtDQUErQyxDQUFDLENBQUE7QUFFckU7SUFDRSxRQUFRLENBQUMsZUFBZSxFQUFFO1FBQ3hCLElBQUksWUFBWSxHQUFHLG9CQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2QyxJQUFJLFlBQVksR0FBRyxJQUFJLHdCQUFLLEVBQUUsQ0FBQztRQUUvQixTQUFTLENBQUMsY0FBUSxvQkFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdEQsRUFBRSxDQUFDLG9DQUFvQyxFQUNwQyxjQUFRLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVyRSxFQUFFLENBQUMsNkNBQTZDLEVBQUU7WUFDaEQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNwQyxNQUFNLENBQUMsb0JBQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsMERBQTBELEVBQUU7WUFDN0QsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM1QixNQUFNLENBQUMsb0JBQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBdEJlLFlBQUksT0FzQm5CLENBQUEifQ==