/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var t = require('@angular/core/testing/testing_internal');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var dom_adapter_1 = require('../../src/dom/dom_adapter');
var html_sanitizer_1 = require('../../src/security/html_sanitizer');
function main() {
    t.describe('HTML sanitizer', function () {
        var originalLog = null;
        var logMsgs;
        t.beforeEach(function () {
            logMsgs = [];
            originalLog = dom_adapter_1.getDOM().log; // Monkey patch DOM.log.
            dom_adapter_1.getDOM().log = function (msg) { return logMsgs.push(msg); };
        });
        t.afterEach(function () { dom_adapter_1.getDOM().log = originalLog; });
        t.it('serializes nested structures', function () {
            t.expect(html_sanitizer_1.sanitizeHtml('<div alt="x"><p>a</p>b<b>c<a alt="more">d</a></b>e</div>'))
                .toEqual('<div alt="x"><p>a</p>b<b>c<a alt="more">d</a></b>e</div>');
            t.expect(logMsgs).toEqual([]);
        });
        t.it('serializes self closing elements', function () {
            t.expect(html_sanitizer_1.sanitizeHtml('<p>Hello <br> World</p>')).toEqual('<p>Hello <br> World</p>');
        });
        t.it('supports namespaced elements', function () {
            t.expect(html_sanitizer_1.sanitizeHtml('a<my:hr/><my:div>b</my:div>c')).toEqual('abc');
        });
        t.it('supports namespaced attributes', function () {
            t.expect(html_sanitizer_1.sanitizeHtml('<a xlink:href="something">t</a>'))
                .toEqual('<a xlink:href="something">t</a>');
            t.expect(html_sanitizer_1.sanitizeHtml('<a xlink:evil="something">t</a>')).toEqual('<a>t</a>');
            t.expect(html_sanitizer_1.sanitizeHtml('<a xlink:href="javascript:foo()">t</a>'))
                .toEqual('<a xlink:href="unsafe:javascript:foo()">t</a>');
        });
        t.it('supports HTML5 elements', function () {
            t.expect(html_sanitizer_1.sanitizeHtml('<main><summary>Works</summary></main>'))
                .toEqual('<main><summary>Works</summary></main>');
        });
        t.it('sanitizes srcset attributes', function () {
            t.expect(html_sanitizer_1.sanitizeHtml('<img srcset="/foo.png 400px, javascript:evil() 23px">'))
                .toEqual('<img srcset="/foo.png 400px, unsafe:javascript:evil() 23px">');
        });
        t.it('supports sanitizing plain text', function () {
            t.expect(html_sanitizer_1.sanitizeHtml('Hello, World')).toEqual('Hello, World');
        });
        t.it('ignores non-element, non-attribute nodes', function () {
            t.expect(html_sanitizer_1.sanitizeHtml('<!-- comments? -->no.')).toEqual('no.');
            t.expect(html_sanitizer_1.sanitizeHtml('<?pi nodes?>no.')).toEqual('no.');
            t.expect(logMsgs.join('\n')).toMatch(/sanitizing HTML stripped some content/);
        });
        t.it('supports sanitizing escaped entities', function () {
            t.expect(html_sanitizer_1.sanitizeHtml('&#128640;')).toEqual('&#128640;');
            t.expect(logMsgs).toEqual([]);
        });
        t.it('escapes entities', function () {
            t.expect(html_sanitizer_1.sanitizeHtml('<p>Hello &lt; World</p>')).toEqual('<p>Hello &lt; World</p>');
            t.expect(html_sanitizer_1.sanitizeHtml('<p>Hello < World</p>')).toEqual('<p>Hello &lt; World</p>');
            t.expect(html_sanitizer_1.sanitizeHtml('<p alt="% &amp; &quot; !">Hello</p>'))
                .toEqual('<p alt="% &amp; &#34; !">Hello</p>'); // NB: quote encoded as ASCII &#34;.
        });
        t.describe('should strip dangerous elements', function () {
            var dangerousTags = [
                'frameset', 'form', 'param', 'object', 'embed', 'textarea', 'input', 'button', 'option',
                'select', 'script', 'style', 'link', 'base', 'basefont'
            ];
            var _loop_1 = function(tag) {
                t.it("" + tag, function () { t.expect(html_sanitizer_1.sanitizeHtml("<" + tag + ">evil!</" + tag + ">")).toEqual('evil!'); });
            };
            for (var _i = 0, dangerousTags_1 = dangerousTags; _i < dangerousTags_1.length; _i++) {
                var tag = dangerousTags_1[_i];
                _loop_1(tag);
            }
            t.it("swallows frame entirely", function () {
                t.expect(html_sanitizer_1.sanitizeHtml("<frame>evil!</frame>")).not.toContain('<frame>');
            });
        });
        t.describe('should strip dangerous attributes', function () {
            var dangerousAttrs = ['id', 'name', 'style'];
            var _loop_2 = function(attr) {
                t.it("" + attr, function () {
                    t.expect(html_sanitizer_1.sanitizeHtml("<a " + attr + "=\"x\">evil!</a>")).toEqual('<a>evil!</a>');
                });
            };
            for (var _i = 0, dangerousAttrs_1 = dangerousAttrs; _i < dangerousAttrs_1.length; _i++) {
                var attr = dangerousAttrs_1[_i];
                _loop_2(attr);
            }
        });
        if (browser_util_1.browserDetection.isWebkit) {
            t.it('should prevent mXSS attacks', function () {
                t.expect(html_sanitizer_1.sanitizeHtml('<a href="&#x3000;javascript:alert(1)">CLICKME</a>'))
                    .toEqual('<a href="unsafe:javascript:alert(1)">CLICKME</a>');
            });
        }
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHRtbF9zYW5pdGl6ZXJfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci90ZXN0L3NlY3VyaXR5L2h0bWxfc2FuaXRpemVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILElBQVksQ0FBQyxXQUFNLHdDQUF3QyxDQUFDLENBQUE7QUFDNUQsNkJBQStCLGdEQUFnRCxDQUFDLENBQUE7QUFFaEYsNEJBQXFCLDJCQUEyQixDQUFDLENBQUE7QUFDakQsK0JBQTJCLG1DQUFtQyxDQUFDLENBQUE7QUFFL0Q7SUFDRSxDQUFDLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFO1FBQzNCLElBQUksV0FBVyxHQUFzQixJQUFJLENBQUM7UUFDMUMsSUFBSSxPQUFpQixDQUFDO1FBRXRCLENBQUMsQ0FBQyxVQUFVLENBQUM7WUFDWCxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2IsV0FBVyxHQUFHLG9CQUFNLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBRSx3QkFBd0I7WUFDckQsb0JBQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxVQUFDLEdBQUcsSUFBSyxPQUFBLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQWpCLENBQWlCLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFDSCxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQVEsb0JBQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVuRCxDQUFDLENBQUMsRUFBRSxDQUFDLDhCQUE4QixFQUFFO1lBQ25DLENBQUMsQ0FBQyxNQUFNLENBQUMsNkJBQVksQ0FBQywwREFBMEQsQ0FBQyxDQUFDO2lCQUM3RSxPQUFPLENBQUMsMERBQTBELENBQUMsQ0FBQztZQUN6RSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxD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