/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var t = require('@angular/core/testing/testing_internal');
var dom_adapter_1 = require('../../src/dom/dom_adapter');
var style_sanitizer_1 = require('../../src/security/style_sanitizer');
function main() {
    t.describe('Style sanitizer', function () {
        var logMsgs;
        var originalLog;
        t.beforeEach(function () {
            logMsgs = [];
            originalLog = dom_adapter_1.getDOM().log; // Monkey patch DOM.log.
            dom_adapter_1.getDOM().log = function (msg) { return logMsgs.push(msg); };
        });
        t.afterEach(function () { dom_adapter_1.getDOM().log = originalLog; });
        function expectSanitize(v) { return t.expect(style_sanitizer_1.sanitizeStyle(v)); }
        t.it('sanitizes values', function () {
            expectSanitize('').toEqual('');
            expectSanitize('abc').toEqual('abc');
            expectSanitize('50px').toEqual('50px');
            expectSanitize('rgb(255, 0, 0)').toEqual('rgb(255, 0, 0)');
            expectSanitize('expression(haha)').toEqual('unsafe');
        });
        t.it('rejects unblanaced quotes', function () { expectSanitize('"value" "').toEqual('unsafe'); });
        t.it('accepts transform functions', function () {
            expectSanitize('rotate(90deg)').toEqual('rotate(90deg)');
            expectSanitize('rotate(javascript:evil())').toEqual('unsafe');
            expectSanitize('translateX(12px, -5px)').toEqual('translateX(12px, -5px)');
            expectSanitize('scale3d(1, 1, 2)').toEqual('scale3d(1, 1, 2)');
        });
        t.it('sanitizes URLs', function () {
            expectSanitize('url(foo/bar.png)').toEqual('url(foo/bar.png)');
            expectSanitize('url( foo/bar.png\n )').toEqual('url( foo/bar.png\n )');
            expectSanitize('url(javascript:evil())').toEqual('unsafe');
            expectSanitize('url(strangeprotocol:evil)').toEqual('unsafe');
        });
        t.it('accepts quoted URLs', function () {
            expectSanitize('url("foo/bar.png")').toEqual('url("foo/bar.png")');
            expectSanitize("url('foo/bar.png')").toEqual("url('foo/bar.png')");
            expectSanitize("url(  'foo/bar.png'\n )").toEqual("url(  'foo/bar.png'\n )");
            expectSanitize('url("javascript:evil()")').toEqual('unsafe');
            expectSanitize('url( " javascript:evil() " )').toEqual('unsafe');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVfc2FuaXRpemVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdC9zZWN1cml0eS9zdHlsZV9zYW5pdGl6ZXJfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsSUFBWSxDQUFDLFdBQU0sd0NBQXdDLENBQUMsQ0FBQTtBQUU1RCw0QkFBcUIsMkJBQTJCLENBQUMsQ0FBQTtBQUNqRCxnQ0FBNEIsb0NBQW9DLENBQUMsQ0FBQTtBQUVqRTtJQUNFLENBQUMsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDNUIsSUFBSSxPQUFpQixDQUFDO1FBQ3RCLElBQUksV0FBOEIsQ0FBQztRQUVuQyxDQUFDLENBQUMsVUFBVSxDQUFDO1lBQ1gsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLFdBQVcsR0FBRyxvQkFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUUsd0JBQXdCO1lBQ3JELG9CQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsVUFBQyxHQUFHLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFqQixDQUFpQixDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFRLG9CQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkQsd0JBQXdCLENBQVMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQywrQkFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXpFLENBQUMsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUU7WUFDdkIsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUMvQixjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3JDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDdkMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0QsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZELENBQUMsQ0FBQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxjQUFRLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RixDQUFDLENBQUMsRUFBRSxDQUFDLDZCQUE2QixFQUFFO1lBQ2xDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekQsY0FBYyxDQUFDLDJCQUEyQixDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlELGNBQWMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzNFLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRTtZQUNyQixjQUFjLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUMvRCxjQUFjLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztZQUN2RSxjQUFjLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDM0QsY0FBYyxDQUFDLDJCQUEyQixDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtZQUMxQixjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNuRSxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUNuRSxjQUFjLENBQUMseUJBQXlCLENBQUMsQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUM3RSxjQUFjLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0QsY0FBYyxDQUFDLDhCQUE4QixDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25FLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBMUNlLFlBQUksT0EwQ25CLENBQUEifQ==