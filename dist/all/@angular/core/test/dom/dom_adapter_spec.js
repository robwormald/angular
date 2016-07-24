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
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
function main() {
    testing_internal_1.describe('dom adapter', function () {
        testing_internal_1.it('should not coalesque text nodes', function () {
            var el1 = browser_util_1.el('<div>a</div>');
            var el2 = browser_util_1.el('<div>b</div>');
            dom_adapter_1.getDOM().appendChild(el2, dom_adapter_1.getDOM().firstChild(el1));
            testing_internal_1.expect(dom_adapter_1.getDOM().childNodes(el2).length).toBe(2);
            var el2Clone = dom_adapter_1.getDOM().clone(el2);
            testing_internal_1.expect(dom_adapter_1.getDOM().childNodes(el2Clone).length).toBe(2);
        });
        testing_internal_1.it('should clone correctly', function () {
            var el1 = browser_util_1.el('<div x="y">a<span>b</span></div>');
            var clone = dom_adapter_1.getDOM().clone(el1);
            testing_internal_1.expect(clone).not.toBe(el1);
            dom_adapter_1.getDOM().setAttribute(clone, 'test', '1');
            testing_internal_1.expect(browser_util_1.stringifyElement(clone)).toEqual('<div test="1" x="y">a<span>b</span></div>');
            testing_internal_1.expect(dom_adapter_1.getDOM().getAttribute(el1, 'test')).toBeFalsy();
            var cNodes = dom_adapter_1.getDOM().childNodes(clone);
            var firstChild = cNodes[0];
            var secondChild = cNodes[1];
            testing_internal_1.expect(dom_adapter_1.getDOM().parentElement(firstChild)).toBe(clone);
            testing_internal_1.expect(dom_adapter_1.getDOM().nextSibling(firstChild)).toBe(secondChild);
            testing_internal_1.expect(dom_adapter_1.getDOM().isTextNode(firstChild)).toBe(true);
            testing_internal_1.expect(dom_adapter_1.getDOM().parentElement(secondChild)).toBe(clone);
            testing_internal_1.expect(dom_adapter_1.getDOM().nextSibling(secondChild)).toBeFalsy();
            testing_internal_1.expect(dom_adapter_1.getDOM().isElementNode(secondChild)).toBe(true);
        });
        testing_internal_1.it('should be able to create text nodes and use them with the other APIs', function () {
            var t = dom_adapter_1.getDOM().createTextNode('hello');
            testing_internal_1.expect(dom_adapter_1.getDOM().isTextNode(t)).toBe(true);
            var d = dom_adapter_1.getDOM().createElement('div');
            dom_adapter_1.getDOM().appendChild(d, t);
            testing_internal_1.expect(dom_adapter_1.getDOM().getInnerHTML(d)).toEqual('hello');
        });
        testing_internal_1.it('should set className via the class attribute', function () {
            var d = dom_adapter_1.getDOM().createElement('div');
            dom_adapter_1.getDOM().setAttribute(d, 'class', 'class1');
            testing_internal_1.expect(d.className).toEqual('class1');
        });
        testing_internal_1.it('should allow to remove nodes without parents', function () {
            var d = dom_adapter_1.getDOM().createElement('div');
            testing_internal_1.expect(function () { return dom_adapter_1.getDOM().remove(d); }).not.toThrow();
        });
        if (dom_adapter_1.getDOM().supportsDOMEvents()) {
            testing_internal_1.describe('getBaseHref', function () {
                testing_internal_1.beforeEach(function () { return dom_adapter_1.getDOM().resetBaseElement(); });
                testing_internal_1.it('should return null if base element is absent', function () { testing_internal_1.expect(dom_adapter_1.getDOM().getBaseHref()).toBeNull(); });
                testing_internal_1.it('should return the value of the base element', function () {
                    var baseEl = dom_adapter_1.getDOM().createElement('base');
                    dom_adapter_1.getDOM().setAttribute(baseEl, 'href', '/drop/bass/connon/');
                    var headEl = dom_adapter_1.getDOM().defaultDoc().head;
                    dom_adapter_1.getDOM().appendChild(headEl, baseEl);
                    var baseHref = dom_adapter_1.getDOM().getBaseHref();
                    dom_adapter_1.getDOM().removeChild(headEl, baseEl);
                    dom_adapter_1.getDOM().resetBaseElement();
                    testing_internal_1.expect(baseHref).toEqual('/drop/bass/connon/');
                });
                testing_internal_1.it('should return a relative url', function () {
                    var baseEl = dom_adapter_1.getDOM().createElement('base');
                    dom_adapter_1.getDOM().setAttribute(baseEl, 'href', 'base');
                    var headEl = dom_adapter_1.getDOM().defaultDoc().head;
                    dom_adapter_1.getDOM().appendChild(headEl, baseEl);
                    var baseHref = dom_adapter_1.getDOM().getBaseHref();
                    dom_adapter_1.getDOM().removeChild(headEl, baseEl);
                    dom_adapter_1.getDOM().resetBaseElement();
                    testing_internal_1.expect(baseHref.endsWith('/base')).toBe(true);
                });
            });
        }
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2FkYXB0ZXJfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L2RvbS9kb21fYWRhcHRlcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBa0csd0NBQXdDLENBQUMsQ0FBQTtBQUUzSSw0QkFBcUIsK0NBQStDLENBQUMsQ0FBQTtBQUNyRSw2QkFBbUMsZ0RBQWdELENBQUMsQ0FBQTtBQUVwRjtJQUNFLDJCQUFRLENBQUMsYUFBYSxFQUFFO1FBQ3RCLHFCQUFFLENBQUMsaUNBQWlDLEVBQUU7WUFDcEMsSUFBSSxHQUFHLEdBQUcsaUJBQUUsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUM3QixJQUFJLEdBQUcsR0FBRyxpQkFBRSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzdCLG9CQUFNLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLG9CQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNwRCx5QkFBTSxDQUFDLG9CQUFNLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRWhELElBQUksUUFBUSxHQUFHLG9CQUFNLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkMseUJBQU0sQ0FBQyxvQkFBTSxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2RCxDQUFDLENBQUMsQ0FBQztRQUVILHFCQUFFLENBQUMsd0JBQXdCLEVBQUU7WUFDM0IsSUFBSSxHQUFHLEdBQUcsaUJBQUUsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO1lBQ2pELElBQUksS0FBSyxHQUFHLG9CQUFNLEVBQUUs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