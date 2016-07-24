/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var style_url_resolver_1 = require('@angular/compiler/src/style_url_resolver');
var url_resolver_1 = require('@angular/compiler/src/url_resolver');
function main() {
    describe('extractStyleUrls', function () {
        var urlResolver;
        beforeEach(function () { urlResolver = new url_resolver_1.UrlResolver(); });
        it('should not resolve "url()" urls', function () {
            var css = "\n      .foo {\n        background-image: url(\"double.jpg\");\n        background-image: url('simple.jpg');\n        background-image: url(noquote.jpg);\n      }";
            var resolvedCss = style_url_resolver_1.extractStyleUrls(urlResolver, 'http://ng.io', css).style;
            expect(resolvedCss).toEqual(css);
        });
        it('should extract "@import" urls', function () {
            var css = "\n      @import '1.css';\n      @import \"2.css\";\n      ";
            var styleWithImports = style_url_resolver_1.extractStyleUrls(urlResolver, 'http://ng.io', css);
            expect(styleWithImports.style.trim()).toEqual('');
            expect(styleWithImports.styleUrls).toEqual(['http://ng.io/1.css', 'http://ng.io/2.css']);
        });
        it('should extract "@import url()" urls', function () {
            var css = "\n      @import url('3.css');\n      @import url(\"4.css\");\n      @import url(5.css);\n      ";
            var styleWithImports = style_url_resolver_1.extractStyleUrls(urlResolver, 'http://ng.io', css);
            expect(styleWithImports.style.trim()).toEqual('');
            expect(styleWithImports.styleUrls).toEqual([
                'http://ng.io/3.css', 'http://ng.io/4.css', 'http://ng.io/5.css'
            ]);
        });
        it('should extract "@import urls and keep rules in the same line', function () {
            var css = "@import url('some.css');div {color: red};";
            var styleWithImports = style_url_resolver_1.extractStyleUrls(urlResolver, 'http://ng.io', css);
            expect(styleWithImports.style.trim()).toEqual('div {color: red};');
            expect(styleWithImports.styleUrls).toEqual(['http://ng.io/some.css']);
        });
        it('should extract media query in "@import"', function () {
            var css = "\n      @import 'print1.css' print;\n      @import url(print2.css) print;\n      ";
            var styleWithImports = style_url_resolver_1.extractStyleUrls(urlResolver, 'http://ng.io', css);
            expect(styleWithImports.style.trim()).toEqual('');
            expect(styleWithImports.styleUrls).toEqual([
                'http://ng.io/print1.css', 'http://ng.io/print2.css'
            ]);
        });
        it('should leave absolute non-package @import urls intact', function () {
            var css = "@import url('http://server.com/some.css');";
            var styleWithImports = style_url_resolver_1.extractStyleUrls(urlResolver, 'http://ng.io', css);
            expect(styleWithImports.style.trim()).toEqual("@import url('http://server.com/some.css');");
            expect(styleWithImports.styleUrls).toEqual([]);
        });
        it('should resolve package @import urls', function () {
            var css = "@import url('package:a/b/some.css');";
            var styleWithImports = style_url_resolver_1.extractStyleUrls(new FakeUrlResolver(), 'http://ng.io', css);
            expect(styleWithImports.style.trim()).toEqual("");
            expect(styleWithImports.styleUrls).toEqual(['fake_resolved_url']);
        });
    });
    describe('isStyleUrlResolvable', function () {
        it('should resolve relative urls', function () { expect(style_url_resolver_1.isStyleUrlResolvable('someUrl.css')).toBe(true); });
        it('should resolve package: urls', function () { expect(style_url_resolver_1.isStyleUrlResolvable('package:someUrl.css')).toBe(true); });
        it('should resolve asset: urls', function () { expect(style_url_resolver_1.isStyleUrlResolvable('asset:someUrl.css')).toBe(true); });
        it('should not resolve empty urls', function () {
            expect(style_url_resolver_1.isStyleUrlResolvable(null)).toBe(false);
            expect(style_url_resolver_1.isStyleUrlResolvable('')).toBe(false);
        });
        it('should not resolve urls with other schema', function () { expect(style_url_resolver_1.isStyleUrlResolvable('http://otherurl')).toBe(false); });
        it('should not resolve urls with absolute paths', function () {
            expect(style_url_resolver_1.isStyleUrlResolvable('/otherurl')).toBe(false);
            expect(style_url_resolver_1.isStyleUrlResolvable('//otherurl')).toBe(false);
        });
    });
}
exports.main = main;
/// The real thing behaves differently between Dart and JS for package URIs.
var FakeUrlResolver = (function (_super) {
    __extends(FakeUrlResolver, _super);
    function FakeUrlResolver() {
        _super.call(this);
    }
    FakeUrlResolver.prototype.resolve = function (baseUrl, url) { return 'fake_resolved_url'; };
    return FakeUrlResolver;
}(url_resolver_1.UrlResolver));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3R5bGVfdXJsX3Jlc29sdmVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3Qvc3R5bGVfdXJsX3Jlc29sdmVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsbUNBQXFELDBDQUEwQyxDQUFDLENBQUE7QUFDaEcsNkJBQTBCLG9DQUFvQyxDQUFDLENBQUE7QUFFL0Q7SUFDRSxRQUFRLENBQUMsa0JBQWtCLEVBQUU7UUFDM0IsSUFBSSxXQUFnQixDQUFtQjtRQUV2QyxVQUFVLENBQUMsY0FBUSxXQUFXLEdBQUcsSUFBSSwwQkFBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RCxFQUFFLENBQUMsaUNBQWlDLEVBQUU7WUFDcEMsSUFBSSxHQUFHLEdBQUcsb0tBS1IsQ0FBQztZQUNILElBQUksV0FBVyxHQUFHLHFDQUFnQixDQUFDLFdBQVcsRUFBRSxjQUFjLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQzNFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsK0JBQStCLEVBQUU7WUFDbEMsSUFBSSxHQUFHLEdBQUcsNERBR1QsQ0FBQztZQUNGLElBQUksZ0JBQWdCLEdBQUcscUNBQWdCLENBQUMsV0FBVyxFQUFFLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMxRSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ2xELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7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