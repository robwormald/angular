/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var dom_adapter_1 = require('../src/dom/dom_adapter');
var collection_1 = require('../src/facade/collection');
var lang_1 = require('../src/facade/lang');
var _global = (typeof window === 'undefined' ? lang_1.global : window);
/**
 * Jasmine matching function with Angular matchers mixed in.
 *
 * ## Example
 *
 * {@example testing/ts/matchers.ts region='toHaveText'}
 */
exports.expect = _global.expect;
// Some Map polyfills don't polyfill Map.toString correctly, which
// gives us bad error messages in tests.
// The only way to do this in Jasmine is to monkey patch a method
// to the object :-(
Map.prototype['jasmineToString'] = function () {
    var m = this;
    if (!m) {
        return '' + m;
    }
    var res = [];
    m.forEach(function (v /** TODO #???? */, k /** TODO #???? */) { res.push(k + ":" + v); });
    return "{ " + res.join(',') + " }";
};
_global.beforeEach(function () {
    jasmine.addMatchers({
        // Custom handler for Map as Jasmine does not support it yet
        toEqual: function (util, customEqualityTesters) {
            return {
                compare: function (actual /** TODO #???? */, expected /** TODO #???? */) {
                    return { pass: util.equals(actual, expected, [compareMap]) };
                }
            };
            function compareMap(actual /** TODO #???? */, expected /** TODO #???? */) {
                if (actual instanceof Map) {
                    var pass = actual.size === expected.size;
                    if (pass) {
                        actual.forEach(function (v /** TODO #???? */, k /** TODO #???? */) {
                            pass = pass && util.equals(v, expected.get(k));
                        });
                    }
                    return pass;
                }
                else {
                    return undefined;
                }
            }
        },
        toBePromise: function () {
            return {
                compare: function (actual /** TODO #???? */, expectedClass /** TODO #???? */) {
                    var pass = typeof actual === 'object' && typeof actual.then === 'function';
                    return { pass: pass, get message() { return 'Expected ' + actual + ' to be a promise'; } };
                }
            };
        },
        toBeAnInstanceOf: function () {
            return {
                compare: function (actual /** TODO #???? */, expectedClass /** TODO #???? */) {
                    var pass = typeof actual === 'object' && actual instanceof expectedClass;
                    return {
                        pass: pass,
                        get message() {
                            return 'Expected ' + actual + ' to be an instance of ' + expectedClass;
                        }
                    };
                }
            };
        },
        toHaveText: function () {
            return {
                compare: function (actual /** TODO #???? */, expectedText /** TODO #???? */) {
                    var actualText = elementText(actual);
                    return {
                        pass: actualText == expectedText,
                        get message() { return 'Expected ' + actualText + ' to be equal to ' + expectedText; }
                    };
                }
            };
        },
        toHaveCssClass: function () {
            return { compare: buildError(false), negativeCompare: buildError(true) };
            function buildError(isNot /** TODO #???? */) {
                return function (actual /** TODO #???? */, className /** TODO #???? */) {
                    return {
                        pass: dom_adapter_1.getDOM().hasClass(actual, className) == !isNot,
                        get message() {
                            return "Expected " + actual.outerHTML + " " + (isNot ? 'not ' : '') + "to contain the CSS class \"" + className + "\"";
                        }
                    };
                };
            }
        },
        toHaveCssStyle: function () {
            return {
                compare: function (actual /** TODO #???? */, styles /** TODO #???? */) {
                    var allPassed;
                    if (lang_1.isString(styles)) {
                        allPassed = dom_adapter_1.getDOM().hasStyle(actual, styles);
                    }
                    else {
                        allPassed = !collection_1.StringMapWrapper.isEmpty(styles);
                        collection_1.StringMapWrapper.forEach(styles, function (style /** TODO #???? */, prop /** TODO #???? */) {
                            allPassed = allPassed && dom_adapter_1.getDOM().hasStyle(actual, prop, style);
                        });
                    }
                    return {
                        pass: allPassed,
                        get message() {
                            var expectedValueStr = lang_1.isString(styles) ? styles : JSON.stringify(styles);
                            return "Expected " + actual.outerHTML + " " + (!allPassed ? ' ' : 'not ') + "to contain the\n                      CSS " + (lang_1.isString(styles) ? 'property' : 'styles') + " \"" + expectedValueStr + "\"";
                        }
                    };
                }
            };
        },
        toContainError: function () {
            return {
                compare: function (actual /** TODO #???? */, expectedText /** TODO #???? */) {
                    var errorMessage = actual.toString();
                    return {
                        pass: errorMessage.indexOf(expectedText) > -1,
                        get message() { return 'Expected ' + errorMessage + ' to contain ' + expectedText; }
                    };
                }
            };
        },
        toImplement: function () {
            return {
                compare: function (actualObject /** TODO #???? */, expectedInterface /** TODO #???? */) {
                    var objProps = Object.keys(actualObject.constructor.prototype);
                    var intProps = Object.keys(expectedInterface.prototype);
                    var missedMethods = [];
                    intProps.forEach(function (k) {
                        if (!actualObject.constructor.prototype[k])
                            missedMethods.push(k);
                    });
                    return {
                        pass: missedMethods.length == 0,
                        get message() {
                            return 'Expected ' + actualObject + ' to have the following methods: ' +
                                missedMethods.join(', ');
                        }
                    };
                }
            };
        }
    });
});
function elementText(n /** TODO #???? */) {
    var hasNodes = function (n /** TODO #???? */) {
        var children = dom_adapter_1.getDOM().childNodes(n);
        return children && children.length > 0;
    };
    if (n instanceof Array) {
        return n.map(elementText).join('');
    }
    if (dom_adapter_1.getDOM().isCommentNode(n)) {
        return '';
    }
    if (dom_adapter_1.getDOM().isElementNode(n) && dom_adapter_1.getDOM().tagName(n) == 'CONTENT') {
        return elementText(Array.prototype.slice.apply(dom_adapter_1.getDOM().getDistributedNodes(n)));
    }
    if (dom_adapter_1.getDOM().hasShadowRoot(n)) {
        return elementText(dom_adapter_1.getDOM().childNodesAsList(dom_adapter_1.getDOM().getShadowRoot(n)));
    }
    if (hasNodes(n)) {
        return elementText(dom_adapter_1.getDOM().childNodesAsList(n));
    }
    return dom_adapter_1.getDOM().getText(n);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0Y2hlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdGluZy9tYXRjaGVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsNEJBQXFCLHdCQUF3QixDQUFDLENBQUE7QUFDOUMsMkJBQStCLDBCQUEwQixDQUFDLENBQUE7QUFDMUQscUJBQStCLG9CQUFvQixDQUFDLENBQUE7QUE0RXBELElBQUksT0FBTyxHQUFRLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxHQUFHLGFBQU0sR0FBRyxNQUFNLENBQUMsQ0FBQztBQUVyRTs7Ozs7O0dBTUc7QUFDUSxjQUFNLEdBQXFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFHckUsa0VBQWtFO0FBQ2xFLHdDQUF3QztBQUN4QyxpRUFBaUU7QUFDakUsb0JBQW9CO0FBQ25CLEdBQTZCLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEdBQUc7SUFDNUQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQ2IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsTUFBTSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDaEIsQ0FBQztJQUNELElBQUksR0FBRyxHQUE0QixFQUFFLENBQUM7SUFDdEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQU0sQ0FBQyxpQkFBaUIsRUFBRSxDQUFNLENBQUMsaUJBQWlCLElBQU8sR0FBRyxDQUFDLElBQUksQ0FBSSxDQUFDLFNBQUksQ0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RixNQUFNLENBQUMsT0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFJLENBQUM7QUFDaEMsQ0FBQyxDQUFDO0FBRUYsT0FBTyxDQUFDLFVBQVUsQ0FBQztJQUNqQixPQUFPLENBQUMsV0FB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