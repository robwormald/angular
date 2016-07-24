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
var url_sanitizer_1 = require('../../src/security/url_sanitizer');
function main() {
    t.describe('URL sanitizer', function () {
        var logMsgs;
        var originalLog;
        t.beforeEach(function () {
            logMsgs = [];
            originalLog = dom_adapter_1.getDOM().log; // Monkey patch DOM.log.
            dom_adapter_1.getDOM().log = function (msg) { return logMsgs.push(msg); };
        });
        t.afterEach(function () { dom_adapter_1.getDOM().log = originalLog; });
        t.it('reports unsafe URLs', function () {
            t.expect(url_sanitizer_1.sanitizeUrl('javascript:evil()')).toBe('unsafe:javascript:evil()');
            t.expect(logMsgs.join('\n')).toMatch(/sanitizing unsafe URL value/);
        });
        t.describe('valid URLs', function () {
            var validUrls = [
                '',
                'http://abc',
                'HTTP://abc',
                'https://abc',
                'HTTPS://abc',
                'ftp://abc',
                'FTP://abc',
                'mailto:me@example.com',
                'MAILTO:me@example.com',
                'tel:123-123-1234',
                'TEL:123-123-1234',
                '#anchor',
                '/page1.md',
                'http://JavaScript/my.js',
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/',
                'data:video/webm;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/',
                'data:audio/opus;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/',
            ];
            var _loop_1 = function(url) {
                t.it("valid " + url, function () { return t.expect(url_sanitizer_1.sanitizeUrl(url)).toEqual(url); });
            };
            for (var _i = 0, validUrls_1 = validUrls; _i < validUrls_1.length; _i++) {
                var url = validUrls_1[_i];
                _loop_1(url);
            }
        });
        t.describe('invalid URLs', function () {
            var invalidUrls = [
                'javascript:evil()',
                'JavaScript:abc',
                'evilNewProtocol:abc',
                ' \n Java\n Script:abc',
                '&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;',
                '&#106&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;',
                '&#106 &#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;',
                '&#0000106&#0000097&#0000118&#0000097&#0000115&#0000099&#0000114&#0000105&#0000112&#0000116&#0000058',
                '&#x6A&#x61&#x76&#x61&#x73&#x63&#x72&#x69&#x70&#x74&#x3A;',
                'jav&#x09;ascript:alert();',
                'jav\u0000ascript:alert();',
                'data:;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/',
                'data:,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/',
                'data:iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/',
                'data:text/javascript;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/',
                'data:application/x-msdownload;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/',
            ];
            var _loop_2 = function(url) {
                t.it("valid " + url, function () { return t.expect(url_sanitizer_1.sanitizeUrl(url)).toMatch(/^unsafe:/); });
            };
            for (var _i = 0, invalidUrls_1 = invalidUrls; _i < invalidUrls_1.length; _i++) {
                var url = invalidUrls_1[_i];
                _loop_2(url);
            }
        });
        t.describe('valid srcsets', function () {
            var validSrcsets = [
                '',
                'http://angular.io/images/test.png',
                'http://angular.io/images/test.png, http://angular.io/images/test.png',
                'http://angular.io/images/test.png, http://angular.io/images/test.png, http://angular.io/images/test.png',
                'http://angular.io/images/test.png 2x',
                'http://angular.io/images/test.png 2x, http://angular.io/images/test.png 3x',
                'http://angular.io/images/test.png 1.5x',
                'http://angular.io/images/test.png 1.25x',
                'http://angular.io/images/test.png 200w, http://angular.io/images/test.png 300w',
                'https://angular.io/images/test.png, http://angular.io/images/test.png',
                'http://angular.io:80/images/test.png, http://angular.io:8080/images/test.png',
                'http://www.angular.io:80/images/test.png, http://www.angular.io:8080/images/test.png',
                'https://angular.io/images/test.png, https://angular.io/images/test.png',
                '//angular.io/images/test.png, //angular.io/images/test.png',
                '/images/test.png, /images/test.png',
                'images/test.png, images/test.png',
                'http://angular.io/images/test.png?12345, http://angular.io/images/test.png?12345',
                'http://angular.io/images/test.png?maxage, http://angular.io/images/test.png?maxage',
                'http://angular.io/images/test.png?maxage=234, http://angular.io/images/test.png?maxage=234',
            ];
            var _loop_3 = function(srcset) {
                t.it("valid " + srcset, function () { return t.expect(url_sanitizer_1.sanitizeSrcset(srcset)).toEqual(srcset); });
            };
            for (var _i = 0, validSrcsets_1 = validSrcsets; _i < validSrcsets_1.length; _i++) {
                var srcset = validSrcsets_1[_i];
                _loop_3(srcset);
            }
        });
        t.describe('invalid srcsets', function () {
            var invalidSrcsets = [
                'ht:tp://angular.io/images/test.png',
                'http://angular.io/images/test.png, ht:tp://angular.io/images/test.png',
            ];
            var _loop_4 = function(srcset) {
                t.it("valid " + srcset, function () { return t.expect(url_sanitizer_1.sanitizeSrcset(srcset)).toMatch(/unsafe:/); });
            };
            for (var _i = 0, invalidSrcsets_1 = invalidSrcsets; _i < invalidSrcsets_1.length; _i++) {
                var srcset = invalidSrcsets_1[_i];
                _loop_4(srcset);
            }
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3Nhbml0aXplcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3Rlc3Qvc2VjdXJpdHkvdXJsX3Nhbml0aXplcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxJQUFZLENBQUMsV0FBTSx3Q0FBd0MsQ0FBQyxDQUFBO0FBRTVELDRCQUFxQiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ2pELDhCQUEwQyxrQ0FBa0MsQ0FBQyxDQUFBO0FBRTdFO0lBQ0UsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUU7UUFDMUIsSUFBSSxPQUFpQixDQUFDO1FBQ3RCLElBQUksV0FBOEIsQ0FBQztRQUVuQyxDQUFDLENBQUMsVUFBVSxDQUFDO1lBQ1gsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNiLFdBQVcsR0FBRyxvQkFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUUsd0JBQXdCO1lBQ3JELG9CQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsVUFBQyxHQUFHLElBQUssT0FBQSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFqQixDQUFpQixDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFRLG9CQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtZQUMxQixDQUFDLENBQUMsTUFBTSxDQUFDLDJCQUFXLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQzVFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyw2QkFBNkIs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