/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var selector_1 = require('@angular/compiler/src/selector');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
function main() {
    describe('SelectorMatcher', function () {
        var matcher /** TODO #9100 */, selectableCollector /** TODO #9100 */, s1 /** TODO #9100 */, s2 /** TODO #9100 */, s3 /** TODO #9100 */, s4;
        var matched;
        function reset() { matched = []; }
        beforeEach(function () {
            reset();
            s1 = s2 = s3 = s4 = null;
            selectableCollector = function (selector /** TODO #9100 */, context /** TODO #9100 */) {
                matched.push(selector);
                matched.push(context);
            };
            matcher = new selector_1.SelectorMatcher();
        });
        it('should select by element name case sensitive', function () {
            matcher.addSelectables(s1 = selector_1.CssSelector.parse('someTag'), 1);
            expect(matcher.match(selector_1.CssSelector.parse('SOMEOTHERTAG')[0], selectableCollector))
                .toEqual(false);
            expect(matched).toEqual([]);
            expect(matcher.match(selector_1.CssSelector.parse('SOMETAG')[0], selectableCollector)).toEqual(false);
            expect(matched).toEqual([]);
            expect(matcher.match(selector_1.CssSelector.parse('someTag')[0], selectableCollector)).toEqual(true);
            expect(matched).toEqual([s1[0], 1]);
        });
        it('should select by class name case insensitive', function () {
            matcher.addSelectables(s1 = selector_1.CssSelector.parse('.someClass'), 1);
            matcher.addSelectables(s2 = selector_1.CssSelector.parse('.someClass.class2'), 2);
            expect(matcher.match(selector_1.CssSelector.parse('.SOMEOTHERCLASS')[0], selectableCollector))
                .toEqual(false);
            expect(matched).toEqual([]);
            expect(matcher.match(selector_1.CssSelector.parse('.SOMECLASS')[0], selectableCollector)).toEqual(true);
            expect(matched).toEqual([s1[0], 1]);
            reset();
            expect(matcher.match(selector_1.CssSelector.parse('.someClass.class2')[0], selectableCollector))
                .toEqual(true);
            expect(matched).toEqual([s1[0], 1, s2[0], 2]);
        });
        it('should select by attr name case sensitive independent of the value', function () {
            matcher.addSelectables(s1 = selector_1.CssSelector.parse('[someAttr]'), 1);
            matcher.addSelectables(s2 = selector_1.CssSelector.parse('[someAttr][someAttr2]'), 2);
            expect(matcher.match(selector_1.CssSelector.parse('[SOMEOTHERATTR]')[0], selectableCollector))
                .toEqual(false);
            expect(matched).toEqual([]);
            expect(matcher.match(selector_1.CssSelector.parse('[SOMEATTR]')[0], selectableCollector)).toEqual(false);
            expect(matched).toEqual([]);
            expect(matcher.match(selector_1.CssSelector.parse('[SOMEATTR=someValue]')[0], selectableCollector))
                .toEqual(false);
            expect(matched).toEqual([]);
            expect(matcher.match(selector_1.CssSelector.parse('[someAttr][someAttr2]')[0], selectableCollector))
                .toEqual(true);
            expect(matched).toEqual([s1[0], 1, s2[0], 2]);
            reset();
            expect(matcher.match(selector_1.CssSelector.parse('[someAttr=someValue][someAttr2]')[0], selectableCollector))
                .toEqual(true);
            expect(matched).toEqual([s1[0], 1, s2[0], 2]);
            reset();
            expect(matcher.match(selector_1.CssSelector.parse('[someAttr2][someAttr=someValue]')[0], selectableCollector))
                .toEqual(true);
            expect(matched).toEqual([s1[0], 1, s2[0], 2]);
            reset();
            expect(matcher.match(selector_1.CssSelector.parse('[someAttr2=someValue][someAttr]')[0], selectableCollector))
                .toEqual(true);
            expect(matched).toEqual([s1[0], 1, s2[0], 2]);
        });
        it('should select by attr name only once if the value is from the DOM', function () {
            matcher.addSelectables(s1 = selector_1.CssSelector.parse('[some-decor]'), 1);
            var elementSelector = new selector_1.CssSelector();
            var element = browser_util_1.el('<div attr></div>');
            var empty = dom_adapter_1.getDOM().getAttribute(element, 'attr');
            elementSelector.addAttribute('some-decor', empty);
            matcher.match(elementSelector, selectableCollector);
            expect(matched).toEqual([s1[0], 1]);
        });
        it('should select by attr name case sensitive and value case insensitive', function () {
            matcher.addSelectables(s1 = selector_1.CssSelector.parse('[someAttr=someValue]'), 1);
            expect(matcher.match(selector_1.CssSelector.parse('[SOMEATTR=SOMEOTHERATTR]')[0], selectableCollector))
                .toEqual(false);
            expect(matched).toEqual([]);
            expect(matcher.match(selector_1.CssSelector.parse('[SOMEATTR=SOMEVALUE]')[0], selectableCollector))
                .toEqual(false);
            expect(matched).toEqual([]);
            expect(matcher.match(selector_1.CssSelector.parse('[someAttr=SOMEVALUE]')[0], selectableCollector))
                .toEqual(true);
            expect(matched).toEqual([s1[0], 1]);
        });
        it('should select by element name, class name and attribute name with value', function () {
            matcher.addSelectables(s1 = selector_1.CssSelector.parse('someTag.someClass[someAttr=someValue]'), 1);
            expect(matcher.match(selector_1.CssSelector.parse('someOtherTag.someOtherClass[someOtherAttr]')[0], selectableCollector))
                .toEqual(false);
            expect(matched).toEqual([]);
            expect(matcher.match(selector_1.CssSelector.parse('someTag.someOtherClass[someOtherAttr]')[0], selectableCollector))
                .toEqual(false);
            expect(matched).toEqual([]);
            expect(matcher.match(selector_1.CssSelector.parse('someTag.someClass[someOtherAttr]')[0], selectableCollector))
                .toEqual(false);
            expect(matched).toEqual([]);
            expect(matcher.match(selector_1.CssSelector.parse('someTag.someClass[someAttr]')[0], selectableCollector))
                .toEqual(false);
            expect(matched).toEqual([]);
            expect(matcher.match(selector_1.CssSelector.parse('someTag.someClass[someAttr=someValue]')[0], selectableCollector))
                .toEqual(true);
            expect(matched).toEqual([s1[0], 1]);
        });
        it('should select by many attributes and independent of the value', function () {
            matcher.addSelectables(s1 = selector_1.CssSelector.parse('input[type=text][control]'), 1);
            var cssSelector = new selector_1.CssSelector();
            cssSelector.setElement('input');
            cssSelector.addAttribute('type', 'text');
            cssSelector.addAttribute('control', 'one');
            expect(matcher.match(cssSelector, selectableCollector)).toEqual(true);
            expect(matched).toEqual([s1[0], 1]);
        });
        it('should select independent of the order in the css selector', function () {
            matcher.addSelectables(s1 = selector_1.CssSelector.parse('[someAttr].someClass'), 1);
            matcher.addSelectables(s2 = selector_1.CssSelector.parse('.someClass[someAttr]'), 2);
            matcher.addSelectables(s3 = selector_1.CssSelector.parse('.class1.class2'), 3);
            matcher.addSelectables(s4 = selector_1.CssSelector.parse('.class2.class1'), 4);
            expect(matcher.match(selector_1.CssSelector.parse('[someAttr].someClass')[0], selectableCollector))
                .toEqual(true);
            expect(matched).toEqual([s1[0], 1, s2[0], 2]);
            reset();
            expect(matcher.match(selector_1.CssSelector.parse('.someClass[someAttr]')[0], selectableCollector))
                .toEqual(true);
            expect(matched).toEqual([s1[0], 1, s2[0], 2]);
            reset();
            expect(matcher.match(selector_1.CssSelector.parse('.class1.class2')[0], selectableCollector))
                .toEqual(true);
            expect(matched).toEqual([s3[0], 3, s4[0], 4]);
            reset();
            expect(matcher.match(selector_1.CssSelector.parse('.class2.class1')[0], selectableCollector))
                .toEqual(true);
            expect(matched).toEqual([s4[0], 4, s3[0], 3]);
        });
        it('should not select with a matching :not selector', function () {
            matcher.addSelectables(selector_1.CssSelector.parse('p:not(.someClass)'), 1);
            matcher.addSelectables(selector_1.CssSelector.parse('p:not([someAttr])'), 2);
            matcher.addSelectables(selector_1.CssSelector.parse(':not(.someClass)'), 3);
            matcher.addSelectables(selector_1.CssSelector.parse(':not(p)'), 4);
            matcher.addSelectables(selector_1.CssSelector.parse(':not(p[someAttr])'), 5);
            expect(matcher.match(selector_1.CssSelector.parse('p.someClass[someAttr]')[0], selectableCollector))
                .toEqual(false);
            expect(matched).toEqual([]);
        });
        it('should select with a non matching :not selector', function () {
            matcher.addSelectables(s1 = selector_1.CssSelector.parse('p:not(.someClass)'), 1);
            matcher.addSelectables(s2 = selector_1.CssSelector.parse('p:not(.someOtherClass[someAttr])'), 2);
            matcher.addSelectables(s3 = selector_1.CssSelector.parse(':not(.someClass)'), 3);
            matcher.addSelectables(s4 = selector_1.CssSelector.parse(':not(.someOtherClass[someAttr])'), 4);
            expect(matcher.match(selector_1.CssSelector.parse('p[someOtherAttr].someOtherClass')[0], selectableCollector))
                .toEqual(true);
            expect(matched).toEqual([s1[0], 1, s2[0], 2, s3[0], 3, s4[0], 4]);
        });
        it('should match with multiple :not selectors', function () {
            matcher.addSelectables(s1 = selector_1.CssSelector.parse('div:not([a]):not([b])'), 1);
            expect(matcher.match(selector_1.CssSelector.parse('div[a]')[0], selectableCollector)).toBe(false);
            expect(matcher.match(selector_1.CssSelector.parse('div[b]')[0], selectableCollector)).toBe(false);
            expect(matcher.match(selector_1.CssSelector.parse('div[c]')[0], selectableCollector)).toBe(true);
        });
        it('should select with one match in a list', function () {
            matcher.addSelectables(s1 = selector_1.CssSelector.parse('input[type=text], textbox'), 1);
            expect(matcher.match(selector_1.CssSelector.parse('textbox')[0], selectableCollector)).toEqual(true);
            expect(matched).toEqual([s1[1], 1]);
            reset();
            expect(matcher.match(selector_1.CssSelector.parse('input[type=text]')[0], selectableCollector))
                .toEqual(true);
            expect(matched).toEqual([s1[0], 1]);
        });
        it('should not select twice with two matches in a list', function () {
            matcher.addSelectables(s1 = selector_1.CssSelector.parse('input, .someClass'), 1);
            expect(matcher.match(selector_1.CssSelector.parse('input.someclass')[0], selectableCollector))
                .toEqual(true);
            expect(matched.length).toEqual(2);
            expect(matched).toEqual([s1[0], 1]);
        });
    });
    describe('CssSelector.parse', function () {
        it('should detect element names', function () {
            var cssSelector = selector_1.CssSelector.parse('sometag')[0];
            expect(cssSelector.element).toEqual('sometag');
            expect(cssSelector.toString()).toEqual('sometag');
        });
        it('should detect class names', function () {
            var cssSelector = selector_1.CssSelector.parse('.someClass')[0];
            expect(cssSelector.classNames).toEqual(['someclass']);
            expect(cssSelector.toString()).toEqual('.someclass');
        });
        it('should detect attr names', function () {
            var cssSelector = selector_1.CssSelector.parse('[attrname]')[0];
            expect(cssSelector.attrs).toEqual(['attrname', '']);
            expect(cssSelector.toString()).toEqual('[attrname]');
        });
        it('should detect attr values', function () {
            var cssSelector = selector_1.CssSelector.parse('[attrname=attrvalue]')[0];
            expect(cssSelector.attrs).toEqual(['attrname', 'attrvalue']);
            expect(cssSelector.toString()).toEqual('[attrname=attrvalue]');
        });
        it('should detect multiple parts', function () {
            var cssSelector = selector_1.CssSelector.parse('sometag[attrname=attrvalue].someclass')[0];
            expect(cssSelector.element).toEqual('sometag');
            expect(cssSelector.attrs).toEqual(['attrname', 'attrvalue']);
            expect(cssSelector.classNames).toEqual(['someclass']);
            expect(cssSelector.toString()).toEqual('sometag.someclass[attrname=attrvalue]');
        });
        it('should detect multiple attributes', function () {
            var cssSelector = selector_1.CssSelector.parse('input[type=text][control]')[0];
            expect(cssSelector.element).toEqual('input');
            expect(cssSelector.attrs).toEqual(['type', 'text', 'control', '']);
            expect(cssSelector.toString()).toEqual('input[type=text][control]');
        });
        it('should detect :not', function () {
            var cssSelector = selector_1.CssSelector.parse('sometag:not([attrname=attrvalue].someclass)')[0];
            expect(cssSelector.element).toEqual('sometag');
            expect(cssSelector.attrs.length).toEqual(0);
            expect(cssSelector.classNames.length).toEqual(0);
            var notSelector = cssSelector.notSelectors[0];
            expect(notSelector.element).toEqual(null);
            expect(notSelector.attrs).toEqual(['attrname', 'attrvalue']);
            expect(notSelector.classNames).toEqual(['someclass']);
            expect(cssSelector.toString()).toEqual('sometag:not(.someclass[attrname=attrvalue])');
        });
        it('should detect :not without truthy', function () {
            var cssSelector = selector_1.CssSelector.parse(':not([attrname=attrvalue].someclass)')[0];
            expect(cssSelector.element).toEqual('*');
            var notSelector = cssSelector.notSelectors[0];
            expect(notSelector.attrs).toEqual(['attrname', 'attrvalue']);
            expect(notSelector.classNames).toEqual(['someclass']);
            expect(cssSelector.toString()).toEqual('*:not(.someclass[attrname=attrvalue])');
        });
        it('should throw when nested :not', function () {
            expect(function () {
                selector_1.CssSelector.parse('sometag:not(:not([attrname=attrvalue].someclass))')[0];
            }).toThrowError('Nesting :not is not allowed in a selector');
        });
        it('should throw when multiple selectors in :not', function () {
            expect(function () {
                selector_1.CssSelector.parse('sometag:not(a,b)');
            }).toThrowError('Multiple selectors in :not are not supported');
        });
        it('should detect lists of selectors', function () {
            var cssSelectors = selector_1.CssSelector.parse('.someclass,[attrname=attrvalue], sometag');
            expect(cssSelectors.length).toEqual(3);
            expect(cssSelectors[0].classNames).toEqual(['someclass']);
            expect(cssSelectors[1].attrs).toEqual(['attrname', 'attrvalue']);
            expect(cssSelectors[2].element).toEqual('sometag');
        });
        it('should detect lists of selectors with :not', function () {
            var cssSelectors = selector_1.CssSelector.parse('input[type=text], :not(textarea), textbox:not(.special)');
            expect(cssSelectors.length).toEqual(3);
            expect(cssSelectors[0].element).toEqual('input');
            expect(cssSelectors[0].attrs).toEqual(['type', 'text']);
            expect(cssSelectors[1].element).toEqual('*');
            expect(cssSelectors[1].notSelectors[0].element).toEqual('textarea');
            expect(cssSelectors[2].element).toEqual('textbox');
            expect(cssSelectors[2].notSelectors[0].classNames).toEqual(['special']);
        });
    });
    describe('CssSelector.getMatchingElementTemplate', function () {
        it('should create an element with a tagName, classes, and attributes with the correct casing', function () {
            var selector = selector_1.CssSelector.parse('Blink.neon.hotpink[Sweet][Dismissable=false]')[0];
            var template = selector.getMatchingElementTemplate();
            expect(template).toEqual('<Blink class="neon hotpink" Sweet Dismissable="false"></Blink>');
        });
        it('should create an element without a tag name', function () {
            var selector = selector_1.CssSelector.parse('[fancy]')[0];
            var template = selector.getMatchingElementTemplate();
            expect(template).toEqual('<div fancy></div>');
        });
        it('should ignore :not selectors', function () {
            var selector = selector_1.CssSelector.parse('grape:not(.red)')[0];
            var template = selector.getMatchingElementTemplate();
            expect(template).toEqual('<grape></grape>');
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3Jfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdC9zZWxlY3Rvcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBMkMsZ0NBQWdDLENBQUMsQ0FBQTtBQUM1RSw0QkFBcUIsK0NBQStDLENBQUMsQ0FBQTtBQUNyRSw2QkFBaUIsZ0RBQWdELENBQUMsQ0FBQTtBQUVsRTtJQUNFLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixJQUFJLE9BQVksQ0FBQyxpQkFBaUIsRUFBRSxtQkFBd0IsQ0FBQyxpQkFBaUIsRUFDMUUsRUFBTyxDQUFDLGlCQUFpQixFQUFFLEVBQU8sQ0FBQyxpQkFBaUIsRUFBRSxFQUFPLENBQUMsaUJBQWlCLEVBQy9FLEVBQU8sQ0FBbUI7UUFDOUIsSUFBSSxPQUFjLENBQUM7UUFFbkIsbUJBQW1CLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWxDLFVBQVUsQ0FBQztZQUNULEtBQUssRUFBRSxDQUFDO1lBQ1IsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztZQUN6QixtQkFBbUIsR0FBRyxVQUFDLFFBQWEsQ0FBQyxpQkFBaUIsRUFBRSxPQUFZLENBQUMsaUJBQWlCO2dCQUNwRixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN2QixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3hCLENBQUMsQ0FBQztZQUNGLE9BQU8sR0FBRyxJQUFJLDBCQUFlLEVBQUUsQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyw4Q0FBOEMsRUFBRTtZQUNqRCxPQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsR0FBRyxzQkFBVyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFB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