/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var shadow_css_1 = require('@angular/compiler/src/shadow_css');
var lang_1 = require('../src/facade/lang');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
function main() {
    testing_internal_1.describe('ShadowCss', function () {
        function s(css, contentAttr, hostAttr) {
            if (hostAttr === void 0) { hostAttr = ''; }
            var shadowCss = new shadow_css_1.ShadowCss();
            var shim = shadowCss.shimCssText(css, contentAttr, hostAttr);
            var nlRegexp = /\n/g;
            return browser_util_1.normalizeCSS(lang_1.StringWrapper.replaceAll(shim, nlRegexp, ''));
        }
        testing_internal_1.it('should handle empty string', function () { testing_internal_1.expect(s('', 'a')).toEqual(''); });
        testing_internal_1.it('should add an attribute to every rule', function () {
            var css = 'one {color: red;}two {color: red;}';
            var expected = 'one[a] {color:red;}two[a] {color:red;}';
            testing_internal_1.expect(s(css, 'a')).toEqual(expected);
        });
        testing_internal_1.it('should handle invalid css', function () {
            var css = 'one {color: red;}garbage';
            var expected = 'one[a] {color:red;}garbage';
            testing_internal_1.expect(s(css, 'a')).toEqual(expected);
        });
        testing_internal_1.it('should add an attribute to every selector', function () {
            var css = 'one, two {color: red;}';
            var expected = 'one[a], two[a] {color:red;}';
            testing_internal_1.expect(s(css, 'a')).toEqual(expected);
        });
        testing_internal_1.it('should support newlines in the selector and content ', function () {
            var css = 'one, \ntwo {\ncolor: red;}';
            var expected = 'one[a], two[a] {color:red;}';
            testing_internal_1.expect(s(css, 'a')).toEqual(expected);
        });
        testing_internal_1.it('should handle media rules', function () {
            var css = '@media screen and (max-width:800px, max-height:100%) {div {font-size:50px;}}';
            var expected = '@media screen and (max-width:800px, max-height:100%) {div[a] {font-size:50px;}}';
            testing_internal_1.expect(s(css, 'a')).toEqual(expected);
        });
        testing_internal_1.it('should handle media rules with simple rules', function () {
            var css = '@media screen and (max-width: 800px) {div {font-size: 50px;}} div {}';
            var expected = '@media screen and (max-width:800px) {div[a] {font-size:50px;}} div[a] {}';
            testing_internal_1.expect(s(css, 'a')).toEqual(expected);
        });
        testing_internal_1.it('should handle support rules', function () {
            var css = '@supports (display: flex) {section {display: flex;}}';
            var expected = '@supports (display:flex) {section[a] {display:flex;}}';
            testing_internal_1.expect(s(css, 'a')).toEqual(expected);
        });
        // Check that the browser supports unprefixed CSS animation
        testing_internal_1.it('should handle keyframes rules', function () {
            var css = '@keyframes foo {0% {transform:translate(-50%) scaleX(0);}}';
            testing_internal_1.expect(s(css, 'a')).toEqual(css);
        });
        testing_internal_1.it('should handle -webkit-keyframes rules', function () {
            var css = '@-webkit-keyframes foo {0% {-webkit-transform:translate(-50%) scaleX(0);}}';
            testing_internal_1.expect(s(css, 'a')).toEqual(css);
        });
        testing_internal_1.it('should handle complicated selectors', function () {
            testing_internal_1.expect(s('one::before {}', 'a')).toEqual('one[a]::before {}');
            testing_internal_1.expect(s('one two {}', 'a')).toEqual('one[a] two[a] {}');
            testing_internal_1.expect(s('one > two {}', 'a')).toEqual('one[a] > two[a] {}');
            testing_internal_1.expect(s('one + two {}', 'a')).toEqual('one[a] + two[a] {}');
            testing_internal_1.expect(s('one ~ two {}', 'a')).toEqual('one[a] ~ two[a] {}');
            var res = s('.one.two > three {}', 'a'); // IE swap classes
            testing_internal_1.expect(res == '.one.two[a] > three[a] {}' || res == '.two.one[a] > three[a] {}')
                .toEqual(true);
            testing_internal_1.expect(s('one[attr="value"] {}', 'a')).toEqual('one[attr="value"][a] {}');
            testing_internal_1.expect(s('one[attr=value] {}', 'a')).toEqual('one[attr="value"][a] {}');
            testing_internal_1.expect(s('one[attr^="value"] {}', 'a')).toEqual('one[attr^="value"][a] {}');
            testing_internal_1.expect(s('one[attr$="value"] {}', 'a')).toEqual('one[attr$="value"][a] {}');
            testing_internal_1.expect(s('one[attr*="value"] {}', 'a')).toEqual('one[attr*="value"][a] {}');
            testing_internal_1.expect(s('one[attr|="value"] {}', 'a')).toEqual('one[attr|="value"][a] {}');
            testing_internal_1.expect(s('one[attr] {}', 'a')).toEqual('one[attr][a] {}');
            testing_internal_1.expect(s('[is="one"] {}', 'a')).toEqual('[is="one"][a] {}');
        });
        testing_internal_1.it('should handle :host', function () {
            testing_internal_1.expect(s(':host {}', 'a', 'a-host')).toEqual('[a-host] {}');
            testing_internal_1.expect(s(':host(.x,.y) {}', 'a', 'a-host')).toEqual('[a-host].x, [a-host].y {}');
            testing_internal_1.expect(s(':host(.x,.y) > .z {}', 'a', 'a-host'))
                .toEqual('[a-host].x > .z, [a-host].y > .z {}');
        });
        testing_internal_1.it('should handle :host-context', function () {
            testing_internal_1.expect(s(':host-context(.x) {}', 'a', 'a-host')).toEqual('[a-host].x, .x [a-host] {}');
            testing_internal_1.expect(s(':host-context(.x) > .y {}', 'a', 'a-host'))
                .toEqual('[a-host].x > .y, .x [a-host] > .y {}');
        });
        testing_internal_1.it('should support polyfill-next-selector', function () {
            var css = s('polyfill-next-selector {content: \'x > y\'} z {}', 'a');
            testing_internal_1.expect(css).toEqual('x[a] > y[a]{}');
            css = s('polyfill-next-selector {content: "x > y"} z {}', 'a');
            testing_internal_1.expect(css).toEqual('x[a] > y[a]{}');
        });
        testing_internal_1.it('should support polyfill-unscoped-rule', function () {
            var css = s('polyfill-unscoped-rule {content: \'#menu > .bar\';color: blue;}', 'a');
            testing_internal_1.expect(lang_1.StringWrapper.contains(css, '#menu > .bar {;color:blue;}')).toBeTruthy();
            css = s('polyfill-unscoped-rule {content: "#menu > .bar";color: blue;}', 'a');
            testing_internal_1.expect(lang_1.StringWrapper.contains(css, '#menu > .bar {;color:blue;}')).toBeTruthy();
        });
        testing_internal_1.it('should support multiple instances polyfill-unscoped-rule', function () {
            var css = s('polyfill-unscoped-rule {content: \'foo\';color: blue;}' +
                'polyfill-unscoped-rule {content: \'bar\';color: blue;}', 'a');
            testing_internal_1.expect(lang_1.StringWrapper.contains(css, 'foo {;color:blue;}')).toBeTruthy();
            testing_internal_1.expect(lang_1.StringWrapper.contains(css, 'bar {;color:blue;}')).toBeTruthy();
        });
        testing_internal_1.it('should support polyfill-rule', function () {
            var css = s('polyfill-rule {content: \':host.foo .bar\';color: blue;}', 'a', 'a-host');
            testing_internal_1.expect(css).toEqual('[a-host].foo .bar {;color:blue;}');
            css = s('polyfill-rule {content: ":host.foo .bar";color:blue;}', 'a', 'a-host');
            testing_internal_1.expect(css).toEqual('[a-host].foo .bar {;color:blue;}');
        });
        testing_internal_1.it('should handle ::shadow', function () {
            var css = s('x::shadow > y {}', 'a');
            testing_internal_1.expect(css).toEqual('x[a] > y[a] {}');
        });
        testing_internal_1.it('should handle /deep/', function () {
            var css = s('x /deep/ y {}', 'a');
            testing_internal_1.expect(css).toEqual('x[a] y {}');
        });
        testing_internal_1.it('should handle >>>', function () {
            var css = s('x >>> y {}', 'a');
            testing_internal_1.expect(css).toEqual('x[a] y {}');
        });
        testing_internal_1.it('should pass through @import directives', function () {
            var styleStr = '@import url("https://fonts.googleapis.com/css?family=Roboto");';
            var css = s(styleStr, 'a');
            testing_internal_1.expect(css).toEqual(styleStr);
        });
        testing_internal_1.it('should shim rules after @import', function () {
            var styleStr = '@import url("a"); div {}';
            var css = s(styleStr, 'a');
            testing_internal_1.expect(css).toEqual('@import url("a"); div[a] {}');
        });
        testing_internal_1.it('should leave calc() unchanged', function () {
            var styleStr = 'div {height:calc(100% - 55px);}';
            var css = s(styleStr, 'a');
            testing_internal_1.expect(css).toEqual('div[a] {height:calc(100% - 55px);}');
        });
        testing_internal_1.it('should strip comments', function () { testing_internal_1.expect(s('/* x */b {c}', 'a')).toEqual('b[a] {c}'); });
        testing_internal_1.it('should ignore special characters in comments', function () { testing_internal_1.expect(s('/* {;, */b {c}', 'a')).toEqual('b[a] {c}'); });
        testing_internal_1.it('should support multiline comments', function () { testing_internal_1.expect(s('/* \n */b {c}', 'a')).toEqual('b[a] {c}'); });
    });
    testing_internal_1.describe('processRules', function () {
        testing_internal_1.describe('parse rules', function () {
            function captureRules(input) {
                var result = [];
                shadow_css_1.processRules(input, function (cssRule /** TODO #9100 */) {
                    result.push(cssRule);
                    return cssRule;
                });
                return result;
            }
            testing_internal_1.it('should work with empty css', function () { testing_internal_1.expect(captureRules('')).toEqual([]); });
            testing_internal_1.it('should capture a rule without body', function () { testing_internal_1.expect(captureRules('a;')).toEqual([new shadow_css_1.CssRule('a', '')]); });
            testing_internal_1.it('should capture css rules with body', function () { testing_internal_1.expect(captureRules('a {b}')).toEqual([new shadow_css_1.CssRule('a', 'b')]); });
            testing_internal_1.it('should capture css rules with nested rules', function () {
                testing_internal_1.expect(captureRules('a {b {c}} d {e}')).toEqual([
                    new shadow_css_1.CssRule('a', 'b {c}'), new shadow_css_1.CssRule('d', 'e')
                ]);
            });
            testing_internal_1.it('should capture multiple rules where some have no body', function () {
                testing_internal_1.expect(captureRules('@import a ; b {c}')).toEqual([
                    new shadow_css_1.CssRule('@import a', ''), new shadow_css_1.CssRule('b', 'c')
                ]);
            });
        });
        testing_internal_1.describe('modify rules', function () {
            testing_internal_1.it('should allow to change the selector while preserving whitespaces', function () {
                testing_internal_1.expect(shadow_css_1.processRules('@import a; b {c {d}} e {f}', function (cssRule /** TODO #9100 */) { return new shadow_css_1.CssRule(cssRule.selector + '2', cssRule.content); }))
                    .toEqual('@import a2; b2 {c {d}} e2 {f}');
            });
            testing_internal_1.it('should allow to change the content', function () {
                testing_internal_1.expect(shadow_css_1.processRules('a {b}', function (cssRule /** TODO #9100 */) {
                    return new shadow_css_1.CssRule(cssRule.selector, cssRule.content + '2');
                }))
                    .toEqual('a {b2}');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhZG93X2Nzc19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L3NoYWRvd19jc3Nfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQWdFLHdDQUF3QyxDQUFDLENBQUE7QUFDekcsMkJBQStDLGtDQUFrQyxDQUFDLENBQUE7QUFFbEYscUJBQXNELG9CQUFvQixDQUFDLENBQUE7QUFDM0UsNkJBQTJCLGdEQUFnRCxDQUFDLENBQUE7QUFFNUU7SUFDRSwyQkFBUSxDQUFDLFdBQVcsRUFBRTtRQUVwQixXQUFXLEdBQVcsRUFBRSxXQUFtQixFQUFFLFFBQXFCO1lBQXJCLHdCQUFxQixHQUFyQixhQUFxQjtZQUNoRSxJQUFJLFNBQVMsR0FBRyxJQUFJLHNCQUFTLEVBQUUsQ0FBQztZQUNoQyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDN0QsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLE1BQU0sQ0FBQywyQkFBWSxDQUFDLG9CQUFhLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNwRSxDQUFDO1FBRUQscUJBQUUsQ0FBQyw0QkFBNEIsRUFBRSxjQUFRLHlCQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVFLHFCQUFFLENBQUMsdUNBQXVDLEVBQUU7WUFDMUMsSUFBSSxHQUFHLEdBQUcsb0NBQW9DLENBQUM7WUFDL0MsSUFBSSxRQUFRLEdBQUcsd0NBQXdDLENBQUM7WUFDeEQseUJBQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQywyQkFBMkIsRUFBRTtZQUM5QixJQUFJLEdBQUcsR0FBRywwQkFBMEIsQ0FBQztZQUNyQyxJQUFJLFFBQVEsR0FBRyw0QkFBNEIsQ0FBQztZQUM1Qyx5QkFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLDJDQUEyQyxFQUFFO1lBQzlDLElBQUksR0FBRyxHQUFHLHdCQUF3QixDQUFDO1lBQ25DLElBQUksUUFBUSxHQUFHLDZCQUE2QixDQUFDO1lBQzdDLHlCQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsc0RBQXNELEVBQUU7WUFDekQsSUFBSSxHQUFHLEdBQUcsNEJBQTRCLENBQUM7WUFDdkMsSUFBSSxRQUFRLEdBQUcsNkJBQTZCLENBQUM7WUFDN0MseUJBQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQywyQkFBMkIsRUFBRTtZQUM5QixJQUFJLEdBQUcsR0FBRyw4RUFBOEUsQ0FBQztZQUN6RixJQUFJLFFBQVEsR0FDUixpRkFBaUYsQ0FBQztZQUN0Rix5QkFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLDZDQUE2QyxFQUFFO1lBQ2hELElBQUksR0FBRyxHQUFHLHNFQUFzRSxDQUFDO1lBQ2pGLElBQUksUUFBUSxHQUFHLDBFQUEwRSxDQUFDO1lBQzFGLHlCQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsNkJBQTZCLEVBQUU7WUFDaEMsSUFBSSxHQUFHLEdBQUcsc0RBQXNELENBQUM7WUFDakUsSUFBSSxRQUFRLEdBQUcsdURBQXVELENBQUM7WUFDdkUseUJBQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBRUgsMkRBQTJEO1FBQzNELHFCQUFFLENBQUMsK0JBQStCLEVBQUU7WUFDbEMsSUFBSSxHQUFHLEdBQUcsNERBQTRELENBQUM7WUFDdkUseUJBQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ25DLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyx1Q0FBdUMsRUFBRTtZQUMxQyxJQUFJLEdBQUcsR0FBRyw0RUFBNEUsQ0FBQztZQUN2Rix5QkFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLHFDQUFxQyxFQUFFO1lBQ3hDLHlCQUFNLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7WUFDOUQseUJBQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDekQseUJBQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDN0QseUJBQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDN0QseUJBQU0sQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFDN0QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUUsa0JBQWtCO1lBQzVELHlCQUFNLENBQUMsR0FBRyxJQUFJLDJCQUEyQixJQUFJLEdBQUcsSUFBSSwyQkFBMkIsQ0FBQztpQkFDM0UsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25CLHlCQUFNLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7WUFDMUUseUJBQU0sQ0FBQyxDQUFDLENBQUMsb0JBQW9CLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMseUJBQXlCLENBQUMsQ0FBQztZQUN4RSx5QkFBTSxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQzVFLHlCQUFNLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLDBCQUEwQixDQUFDLENBQUM7WUFDNUUseUJBQU0sQ0FBQyxDQUFDLENBQUMsdUJBQXVCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsMEJBQTBCLENBQUMsQ0FBQztZQUM1RSx5QkFBTSxDQUFDLENBQUMsQ0FBQyx1QkFBdUIsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1lBQzVFLHlCQUFNLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzFELHlCQUFNLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyxxQkFBcUIsRUFBRTtZQUN4Qix5QkFBTSxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzVELHlCQUFNLENBQUMsQ0FBQyxDQUFDLGlCQUFpQixFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDO1lBQ2pGLHlCQUFNLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDM0MsT0FBTyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7UUFDdEQsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLDZCQUE2QixFQUFFO1lBQ2hDLHlCQUFNLENBQUMsQ0FBQyxDQUFDLHNCQUFzQixFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ3ZGLHlCQUFNLENBQUMsQ0FBQyxDQUFDLDJCQUEyQixFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDaEQsT0FBTyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLHVDQUF1QyxFQUFFO1lBQzFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxrREFBa0QsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNyRSx5QkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUVyQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLGdEQUFnRCxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQy9ELHlCQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyx1Q0FBdUMsRUFBRTtZQUMxQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsaUVBQWlFLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDcEYseUJBQU0sQ0FBQyxvQkFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBRWhGLEdBQUcsR0FBRyxDQUFDLENBQUMsK0RBQStELEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDOUUseUJBQU0sQ0FBQyxvQkFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsNkJBQTZCLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ2xGLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQywwREFBMEQsRUFBRTtZQUM3RCxJQUFJLEdBQUcsR0FDSCxDQUFDLENBQUMsd0RBQXdEO2dCQUNwRCx3REFBd0QsRUFDNUQsR0FBRyxDQUFDLENBQUM7WUFDWCx5QkFBTSxDQUFDLG9CQUFhLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDdkUseUJBQU0sQ0FBQyxvQkFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQ3pFLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyw4QkFBOEIsRUFBRTtZQUNqQyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsMERBQTBELEVBQUUsR0FBRyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZGLHlCQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFFeEQsR0FBRyxHQUFHLENBQUMsQ0FBQyx1REFBdUQsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDaEYseUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsa0NBQWtDLENBQUMsQ0FBQztRQUMxRCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsd0JBQXdCLEVBQUU7WUFDM0IsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3JDLHlCQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLHNCQUFzQixFQUFFO1lBQ3pCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDbEMseUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLG1CQUFtQixFQUFFO1lBQ3RCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDL0IseUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLHdDQUF3QyxFQUFFO1lBQzNDLElBQUksUUFBUSxHQUFHLGdFQUFnRSxDQUFDO1lBQ2hGLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDM0IseUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLGlDQUFpQyxFQUFFO1lBQ3BDLElBQUksUUFBUSxHQUFHLDBCQUEwQixDQUFDO1lBQzFDLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDM0IseUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUNyRCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsK0JBQStCLEVBQUU7WUFDbEMsSUFBSSxRQUFRLEdBQUcsaUNBQWlDLENBQUM7WUFDakQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUMzQix5QkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO1FBQzVELENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyx1QkFBdUIsRUFBRSxjQUFRLHlCQUFNLENBQUMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTNGLHFCQUFFLENBQUMsOENBQThDLEVBQzlDLGNBQVEseUJBQU0sQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVwRSxxQkFBRSxDQUFDLG1DQUFtQyxFQUNuQyxjQUFRLHlCQUFNLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3JFLENBQUMsQ0FBQyxDQUFDO0lBRUgsMkJBQVEsQ0FBQyxjQUFjLEVBQUU7UUFDdkIsMkJBQVEsQ0FBQyxhQUFhLEVBQUU7WUFDdEIsc0JBQXNCLEtBQWE7Z0JBQ2pDLElBQUksTUFBTSxHQUE0QixFQUFFLENBQUM7Z0JBQ3pDLHlCQUFZLENBQUMsS0FBSyxFQUFFLFVBQUMsT0FBWSxDQUFDLGlCQUFpQjtvQkFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDckIsTUFBTSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNoQixDQUFDO1lBRUQscUJBQUUsQ0FBQyw0QkFBNEIsRUFBRSxjQUFRLHlCQUFNLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbEYscUJBQUUsQ0FBQyxvQ0FBb0MsRUFDcEMsY0FBUSx5QkFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksb0JBQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFMUUscUJBQUUsQ0FBQyxvQ0FBb0MsRUFDcEMsY0FBUSx5QkFBTSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksb0JBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFOUUscUJBQUUsQ0FBQyw0Q0FBNEMsRUFBRTtnQkFDL0MseUJBQU0sQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztvQkFDOUMsSUFBSSxvQkFBTyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsRUFBRSxJQUFJLG9CQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDakQsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLHVEQUF1RCxFQUFFO2dCQUMxRCx5QkFBTSxDQUFDLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO29CQUNoRCxJQUFJLG9CQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksb0JBQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUNwRCxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsMkJBQVEsQ0FBQyxjQUFjLEVBQUU7WUFDdkIscUJBQUUsQ0FBQyxrRUFBa0UsRUFBRTtnQkFDckUseUJBQU0sQ0FBQyx5QkFBWSxDQUNSLDRCQUE0QixFQUFFLFVBQUMsT0FBWSxDQUFDLGlCQUFpQixJQUFLLE9BQUEsSUFBSSxvQkFBTyxDQUMzQyxPQUFPLENBQUMsUUFBUSxHQUFHLEdBQUcsRUFBRSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBRFIsQ0FDUSxDQUFDLENBQUM7cUJBQ2xGLE9BQU8sQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1lBQ2hELENBQUMsQ0FBQyxDQUFDO1lBRUgscUJBQUUsQ0FBQyxvQ0FBb0MsRUFBRTtnQkFDdkMseUJBQU0sQ0FBQyx5QkFBWSxDQUNSLE9BQU8sRUFBRSxVQUFDLE9BQVksQ0FBQyxpQkFBaUI7b0JBQzNCLE9BQUEsSUFBSSxvQkFBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7Z0JBQXBELENBQW9ELENBQUMsQ0FBQztxQkFDekUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUE3TmUsWUFBSSxPQTZObkIsQ0FBQSJ9