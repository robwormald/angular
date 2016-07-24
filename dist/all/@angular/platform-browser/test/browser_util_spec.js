/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var collection_1 = require('../src/facade/collection');
var browser_util_1 = require('../testing/browser_util');
function main() {
    describe('BrowserDetection', function () {
        var browsers = [
            {
                name: 'Chrome',
                ua: 'Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.125 Safari/537.36',
                isFirefox: false,
                isAndroid: false,
                isEdge: false,
                isIE: false,
                isWebkit: true,
                isIOS7: false,
                isSlow: false,
                isChromeDesktop: true
            },
            {
                name: 'Chrome mobile',
                ua: 'Mozilla/5.0 (Linux; Android 5.1.1; D5803 Build/23.4.A.0.546) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.133 Mobile Safari/537.36',
                isFirefox: false,
                isAndroid: false,
                isEdge: false,
                isIE: false,
                isWebkit: true,
                isIOS7: false,
                isSlow: false,
                isChromeDesktop: false
            },
            {
                name: 'Firefox',
                ua: 'Mozilla/5.0 (X11; Linux i686; rv:40.0) Gecko/20100101 Firefox/40.0',
                isFirefox: true,
                isAndroid: false,
                isEdge: false,
                isIE: false,
                isWebkit: false,
                isIOS7: false,
                isSlow: false,
                isChromeDesktop: false
            },
            {
                name: 'IE9',
                ua: 'Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0; SLCC2; .NET CLR 2.0.50727)',
                isFirefox: false,
                isAndroid: false,
                isEdge: false,
                isIE: true,
                isWebkit: false,
                isIOS7: false,
                isSlow: true,
                isChromeDesktop: false
            },
            {
                name: 'IE10',
                ua: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; WOW64; Trident/6.0; .NET4.0E; .NET4.0C)',
                isFirefox: false,
                isAndroid: false,
                isEdge: false,
                isIE: true,
                isWebkit: false,
                isIOS7: false,
                isSlow: true,
                isChromeDesktop: false
            },
            {
                name: 'IE11',
                ua: 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; .NET4.0E; .NET4.0C; rv:11.0) like Gecko',
                isFirefox: false,
                isAndroid: false,
                isEdge: false,
                isIE: true,
                isWebkit: false,
                isIOS7: false,
                isSlow: true,
                isChromeDesktop: false
            },
            {
                name: 'Edge',
                ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10136',
                isFirefox: false,
                isAndroid: false,
                isEdge: true,
                isIE: false,
                isWebkit: false,
                isIOS7: false,
                isSlow: false,
                isChromeDesktop: false
            },
            {
                name: 'Android4.1',
                ua: 'Mozilla/5.0 (Linux; U; Android 4.1.1; en-us; Android SDK built for x86 Build/JRO03H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
                isFirefox: false,
                isAndroid: true,
                isEdge: false,
                isIE: false,
                isWebkit: true,
                isIOS7: false,
                isSlow: true,
                isChromeDesktop: false
            },
            {
                name: 'Android4.2',
                ua: 'Mozilla/5.0 (Linux; U; Android 4.2; en-us; Android SDK built for x86 Build/JOP40C) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
                isFirefox: false,
                isAndroid: true,
                isEdge: false,
                isIE: false,
                isWebkit: true,
                isIOS7: false,
                isSlow: true,
                isChromeDesktop: false
            },
            {
                name: 'Android4.3',
                ua: 'Mozilla/5.0 (Linux; U; Android 4.3; en-us; Android SDK built for x86 Build/JSS15J) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30',
                isFirefox: false,
                isAndroid: true,
                isEdge: false,
                isIE: false,
                isWebkit: true,
                isIOS7: false,
                isSlow: true,
                isChromeDesktop: false
            },
            {
                name: 'Android4.4',
                ua: 'Mozilla/5.0 (Linux; Android 4.4.2; Android SDK built for x86 Build/KK) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/30.0.0.0 Mobile Safari/537.36',
                isFirefox: false,
                isAndroid: false,
                isEdge: false,
                isIE: false,
                isWebkit: true,
                isIOS7: false,
                isSlow: false,
                isChromeDesktop: false
            },
            {
                name: 'Safari7',
                ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/600.7.12 (KHTML, like Gecko) Version/7.1.7 Safari/537.85.16',
                isFirefox: false,
                isAndroid: false,
                isEdge: false,
                isIE: false,
                isWebkit: true,
                isIOS7: false,
                isSlow: false,
                isChromeDesktop: false
            },
            {
                name: 'Safari8',
                ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/600.7.12 (KHTML, like Gecko) Version/8.0.7 Safari/600.7.12',
                isFirefox: false,
                isAndroid: false,
                isEdge: false,
                isIE: false,
                isWebkit: true,
                isIOS7: false,
                isSlow: false,
                isChromeDesktop: false
            },
            {
                name: 'iOS7',
                ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_1 like Mac OS X) AppleWebKit/537.51.2 (KHTML, like Gecko) Version/7.0 Mobile/11D167 Safari/9537.53',
                isFirefox: false,
                isAndroid: false,
                isEdge: false,
                isIE: false,
                isWebkit: true,
                isIOS7: true,
                isSlow: true,
                isChromeDesktop: false
            },
            {
                name: 'iOS8',
                ua: 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_4 like Mac OS X) AppleWebKit/600.1.4 (KHTML, like Gecko) Version/8.0 Mobile/12H141 Safari/600.1.4',
                isFirefox: false,
                isAndroid: false,
                isEdge: false,
                isIE: false,
                isWebkit: true,
                isIOS7: false,
                isSlow: false,
                isChromeDesktop: false
            }
        ];
        browsers.forEach(function (browser) {
            it("should detect " + collection_1.StringMapWrapper.get(browser, 'name'), function () {
                var bd = new browser_util_1.BrowserDetection(collection_1.StringMapWrapper.get(browser, 'ua'));
                expect(bd.isFirefox).toBe(collection_1.StringMapWrapper.get(browser, 'isFirefox'));
                expect(bd.isAndroid).toBe(collection_1.StringMapWrapper.get(browser, 'isAndroid'));
                expect(bd.isEdge).toBe(collection_1.StringMapWrapper.get(browser, 'isEdge'));
                expect(bd.isIE).toBe(collection_1.StringMapWrapper.get(browser, 'isIE'));
                expect(bd.isWebkit).toBe(collection_1.StringMapWrapper.get(browser, 'isWebkit'));
                expect(bd.isIOS7).toBe(collection_1.StringMapWrapper.get(browser, 'isIOS7'));
                expect(bd.isSlow).toBe(collection_1.StringMapWrapper.get(browser, 'isSlow'));
                expect(bd.isChromeDesktop).toBe(collection_1.StringMapWrapper.get(browser, 'isChromeDesktop'));
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl91dGlsX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdC9icm93c2VyX3V0aWxfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsMkJBQStCLDBCQUEwQixDQUFDLENBQUE7QUFDMUQsNkJBQStCLHlCQUF5QixDQUFDLENBQUE7QUFFekQ7SUFDRSxRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFFM0IsSUFBSSxRQUFRLEdBQUc7WUFDYjtnQkFDRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxFQUFFLEVBQUUseUdBQXlHO2dCQUM3RyxTQUFTLEVBQUUsS0FBSztnQkFDaEIsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLElBQUksRUFBRSxLQUFLO2dCQUNYLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE1BQU0sRUFBRSxLQUFLO2dCQUNiLE1BQU0sRUFBRSxLQUFLO2dCQUNiLGVBQWUsRUFBRSxJQUFJO2FBQ3RCO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLEVBQUUsRUFBRSwrSUFBK0k7Z0JBQ25KLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixTQUFTLEVBQUUsS0FBSztnQkFDaEIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsZUFBZSxFQUFFLEtBQUs7YUFDdkI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixFQUFFLEVBQUUsb0VBQW9FO2dCQUN4RSxTQUFTLEVBQUUsSUFBSTtnQkFDZixTQUFTLEVBQUUsS0FBSztnQkFDaEIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsUUFBUSxF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