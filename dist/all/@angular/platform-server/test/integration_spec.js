/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var platform_browser_1 = require('@angular/platform-browser');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var platform_server_1 = require('@angular/platform-server');
function writeBody(html) {
    var dom = dom_adapter_1.getDOM();
    var doc = dom.defaultDoc();
    var body = dom.querySelector(doc, 'body');
    dom.setInnerHTML(body, html);
    return body;
}
function main() {
    if (dom_adapter_1.getDOM().supportsDOMEvents())
        return; // NODE only
    describe('platform-server integration', function () {
        beforeEach(function () { return core_1.disposePlatform(); });
        afterEach(function () { return core_1.disposePlatform(); });
        it('should bootstrap', testing_1.async(function () {
            var body = writeBody('<app></app>');
            platform_server_1.serverBootstrap(MyServerApp, [
                platform_browser_1.BROWSER_APP_PROVIDERS, platform_browser_dynamic_1.BROWSER_APP_COMPILER_PROVIDERS
            ]).then(function () { expect(dom_adapter_1.getDOM().getText(body)).toEqual('Works!'); });
        }));
    });
}
exports.main = main;
var MyServerApp = (function () {
    function MyServerApp() {
    }
    /** @nocollapse */
    MyServerApp.decorators = [
        { type: core_1.Component, args: [{ selector: 'app', template: "Works!" },] },
    ];
    return MyServerApp;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdyYXRpb25fc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tc2VydmVyL3Rlc3QvaW50ZWdyYXRpb25fc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQXlDLGVBQWUsQ0FBQyxDQUFBO0FBQ3pELHdCQUFvQix1QkFBdUIsQ0FBQyxDQUFBO0FBQzVDLGlDQUFvQywyQkFBMkIsQ0FBQyxDQUFBO0FBQ2hFLHlDQUE2QyxtQ0FBbUMsQ0FBQyxDQUFBO0FBQ2pGLDRCQUFxQiwrQ0FBK0MsQ0FBQyxDQUFBO0FBQ3JFLGdDQUE4QiwwQkFBMEIsQ0FBQyxDQUFBO0FBRXpELG1CQUFtQixJQUFZO0lBQzdCLElBQUksR0FBRyxHQUFHLG9CQUFNLEVBQUUsQ0FBQztJQUNuQixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDM0IsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDMUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0IsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRDtJQUNFLEVBQUUsQ0FBQyxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQUMsTUFBTSxDQUFDLENBQUUsWUFBWTtJQUV2RCxRQUFRLENBQUMsNkJBQTZCLEVBQUU7UUFFdEMsVUFBVSxDQUFDLGNBQU0sT0FBQSxzQkFBZSxFQUFFLEVBQWpCLENBQWlCLENBQUMsQ0FBQztRQUNwQyxTQUFTLENBQUMsY0FBTSxPQUFBLHNCQUFlLEVBQUUsRUFBakIsQ0FBaUIsQ0FBQyxDQUFDO1FBRW5DLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxlQUFLLENBQUM7WUFDeEIsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3BDLGlDQUFlLENBQUMsV0FBVyxFQUFFO2dCQUMzQix3Q0FBcUIsRUFBRSx5REFBOEI7YUFDdEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFRLE1BQU0sQ0FBQyxvQkFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNULENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWZlLFlBQUksT0FlbkIsQ0FBQTtBQUNEO0lBQUE7SUFLQSxDQUFDO0lBSkQsa0JBQWtCO0lBQ1gsc0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQyxFQUFHLEVBQUU7S0FDbkUsQ0FBQztJQUNGLGtCQUFDO0FBQUQsQ0FBQyxBQUxELElBS0MifQ==