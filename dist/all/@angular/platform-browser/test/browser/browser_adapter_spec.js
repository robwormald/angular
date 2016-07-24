/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var browser_adapter_1 = require('../../src/browser/browser_adapter');
function main() {
    testing_internal_1.describe('cookies', function () {
        testing_internal_1.it('parses cookies', function () {
            var cookie = 'other-cookie=false; xsrf-token=token-value; is_awesome=true; ffo=true;';
            testing_internal_1.expect(browser_adapter_1.parseCookieValue(cookie, 'xsrf-token')).toBe('token-value');
        });
        testing_internal_1.it('handles encoded keys', function () {
            testing_internal_1.expect(browser_adapter_1.parseCookieValue('whitespace%20token=token-value', 'whitespace token'))
                .toBe('token-value');
        });
        testing_internal_1.it('handles encoded values', function () {
            testing_internal_1.expect(browser_adapter_1.parseCookieValue('token=whitespace%20', 'token')).toBe('whitespace ');
            testing_internal_1.expect(browser_adapter_1.parseCookieValue('token=whitespace%0A', 'token')).toBe('whitespace\n');
        });
        testing_internal_1.it('sets cookie values', function () {
            dom_adapter_1.getDOM().setCookie('my test cookie', 'my test value');
            dom_adapter_1.getDOM().setCookie('my other cookie', 'my test value 2');
            testing_internal_1.expect(dom_adapter_1.getDOM().getCookie('my test cookie')).toBe('my test value');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9hZGFwdGVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdC9icm93c2VyL2Jyb3dzZXJfYWRhcHRlcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBc0csd0NBQXdDLENBQUMsQ0FBQTtBQUMvSSw0QkFBcUIsK0NBQStDLENBQUMsQ0FBQTtBQUVyRSxnQ0FBK0IsbUNBQW1DLENBQUMsQ0FBQTtBQUVuRTtJQUNFLDJCQUFRLENBQUMsU0FBUyxFQUFFO1FBQ2xCLHFCQUFFLENBQUMsZ0JBQWdCLEVBQUU7WUFDbkIsSUFBSSxNQUFNLEdBQUcsd0VBQXdFLENBQUM7WUFDdEYseUJBQU0sQ0FBQyxrQ0FBZ0IsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7UUFDSCxxQkFBRSxDQUFDLHNCQUFzQixFQUFFO1lBQ3pCLHlCQUFNLENBQUMsa0NBQWdCLENBQUMsZ0NBQWdDLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztpQkFDekUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ0gscUJBQUUsQ0FBQyx3QkFBd0IsRUFBRTtZQUMzQix5QkFBTSxDQUFDLGtDQUFnQixDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzdFLHlCQUFNLENBQUMsa0NBQWdCLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDaEYsQ0FBQyxDQUFDLENBQUM7UUFDSCxxQkFBRSxDQUFDLG9CQUFvQixFQUFFO1lBQ3ZCLG9CQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDdEQsb0JBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1lBQ3pELHlCQUFNLENBQUMsb0JBQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3JFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBcEJlLFlBQUksT0FvQm5CLENBQUEifQ==