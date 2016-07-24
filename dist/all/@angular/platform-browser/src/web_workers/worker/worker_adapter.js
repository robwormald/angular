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
var dom_adapter_1 = require('../../dom/dom_adapter');
/**
 * This adapter is required to log error messages.
 *
 * Note: other methods all throw as the DOM is not accessible directly in web worker context.
 */
var WorkerDomAdapter = (function (_super) {
    __extends(WorkerDomAdapter, _super);
    function WorkerDomAdapter() {
        _super.apply(this, arguments);
    }
    WorkerDomAdapter.makeCurrent = function () { dom_adapter_1.setRootDomAdapter(new WorkerDomAdapter()); };
    WorkerDomAdapter.prototype.logError = function (error /** TODO #9100 */) {
        if (console.error) {
            console.error(error);
        }
        else {
            console.log(error);
        }
    };
    WorkerDomAdapter.prototype.log = function (error /** TODO #9100 */) { console.log(error); };
    WorkerDomAdapter.prototype.logGroup = function (error /** TODO #9100 */) {
        if (console.group) {
            console.group(error);
            this.logError(error);
        }
        else {
            console.log(error);
        }
    };
    WorkerDomAdapter.prototype.logGroupEnd = function () {
        if (console.groupEnd) {
            console.groupEnd();
        }
    };
    WorkerDomAdapter.prototype.hasProperty = function (element /** TODO #9100 */, name) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setProperty = function (el, name, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getProperty = function (el, name) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.invoke = function (el, methodName, args) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getXHR = function () { throw 'not implemented'; };
    Object.defineProperty(WorkerDomAdapter.prototype, "attrToPropMap", {
        get: function () { throw 'not implemented'; },
        set: function (value) { throw 'not implemented'; },
        enumerable: true,
        configurable: true
    });
    WorkerDomAdapter.prototype.parse = function (templateHtml) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.query = function (selector) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.querySelector = function (el /** TODO #9100 */, selector) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.querySelectorAll = function (el /** TODO #9100 */, selector) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.on = function (el /** TODO #9100 */, evt /** TODO #9100 */, listener /** TODO #9100 */) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.onAndCancel = function (el /** TODO #9100 */, evt /** TODO #9100 */, listener /** TODO #9100 */) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.dispatchEvent = function (el /** TODO #9100 */, evt /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createMouseEvent = function (eventType /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createEvent = function (eventType) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.preventDefault = function (evt /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isPrevented = function (evt /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getInnerHTML = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getTemplateContent = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getOuterHTML = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.nodeName = function (node /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.nodeValue = function (node /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.type = function (node /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.content = function (node /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.firstChild = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.nextSibling = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.parentElement = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.childNodes = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.childNodesAsList = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.clearNodes = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.appendChild = function (el /** TODO #9100 */, node /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.removeChild = function (el /** TODO #9100 */, node /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.replaceChild = function (el /** TODO #9100 */, newNode /** TODO #9100 */, oldNode /** TODO #9100 */) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.remove = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.insertBefore = function (el /** TODO #9100 */, node /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.insertAllBefore = function (el /** TODO #9100 */, nodes /** TODO #9100 */) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.insertAfter = function (el /** TODO #9100 */, node /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setInnerHTML = function (el /** TODO #9100 */, value /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getText = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setText = function (el /** TODO #9100 */, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getValue = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setValue = function (el /** TODO #9100 */, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getChecked = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setChecked = function (el /** TODO #9100 */, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createComment = function (text) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createTemplate = function (html /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createElement = function (tagName /** TODO #9100 */, doc /** TODO #9100 */) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.createElementNS = function (ns, tagName, doc /** TODO #9100 */) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.createTextNode = function (text, doc /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createScriptTag = function (attrName, attrValue, doc /** TODO #9100 */) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.createStyleElement = function (css, doc /** TODO #9100 */) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.createShadowRoot = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getShadowRoot = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getHost = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getDistributedNodes = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.clone = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getElementsByClassName = function (element /** TODO #9100 */, name) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.getElementsByTagName = function (element /** TODO #9100 */, name) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.classList = function (element /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.addClass = function (element /** TODO #9100 */, className) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.removeClass = function (element /** TODO #9100 */, className) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.hasClass = function (element /** TODO #9100 */, className) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setStyle = function (element /** TODO #9100 */, styleName, styleValue) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.removeStyle = function (element /** TODO #9100 */, styleName) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getStyle = function (element /** TODO #9100 */, styleName) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.hasStyle = function (element /** TODO #9100 */, styleName, styleValue) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.tagName = function (element /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.attributeMap = function (element /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.hasAttribute = function (element /** TODO #9100 */, attribute) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.hasAttributeNS = function (element /** TODO #9100 */, ns, attribute) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.getAttribute = function (element /** TODO #9100 */, attribute) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.getAttributeNS = function (element /** TODO #9100 */, ns, attribute) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.setAttribute = function (element /** TODO #9100 */, name, value) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.setAttributeNS = function (element /** TODO #9100 */, ns, name, value) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.removeAttribute = function (element /** TODO #9100 */, attribute) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.removeAttributeNS = function (element /** TODO #9100 */, ns, attribute) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.templateAwareRoot = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.createHtmlDocument = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.defaultDoc = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getBoundingClientRect = function (el /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getTitle = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setTitle = function (newTitle) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.elementMatches = function (n /** TODO #9100 */, selector) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isTemplateElement = function (el) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isTextNode = function (node /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isCommentNode = function (node /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isElementNode = function (node /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.hasShadowRoot = function (node /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.isShadowRoot = function (node /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.importIntoDoc = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.adoptNode = function (node) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getHref = function (element /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getEventKey = function (event /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.resolveAndSetHref = function (element /** TODO #9100 */, baseUrl, href) {
        throw 'not implemented';
    };
    WorkerDomAdapter.prototype.supportsDOMEvents = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.supportsNativeShadowDOM = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getGlobalEventTarget = function (target) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getHistory = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getLocation = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getBaseHref = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.resetBaseElement = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getUserAgent = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setData = function (element /** TODO #9100 */, name, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getComputedStyle = function (element /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getData = function (element /** TODO #9100 */, name) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setGlobalVar = function (name, value) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.requestAnimationFrame = function (callback /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.cancelAnimationFrame = function (id /** TODO #9100 */) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.performanceNow = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getAnimationPrefix = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.getTransitionEnd = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.supportsAnimation = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.supportsWebAnimation = function () { throw 'not implemented'; };
    WorkerDomAdapter.prototype.supportsCookies = function () { return false; };
    WorkerDomAdapter.prototype.getCookie = function (name) { throw 'not implemented'; };
    WorkerDomAdapter.prototype.setCookie = function (name, value) { throw 'not implemented'; };
    return WorkerDomAdapter;
}(dom_adapter_1.DomAdapter));
exports.WorkerDomAdapter = WorkerDomAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2VyX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvc3JjL3dlYl93b3JrZXJzL3dvcmtlci93b3JrZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCw0QkFBNEMsdUJBQXVCLENBQUMsQ0FBQTtBQUlwRTs7OztHQUlHO0FBQ0g7SUFBc0Msb0NBQVU7SUFBaEQ7UUFBc0MsOEJBQVU7SUFrTWhELENBQUM7SUFqTVEsNEJBQVcsR0FBbEIsY0FBdUIsK0JBQWlCLENBQUMsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRW5FLG1DQUFRLEdBQVIsVUFBUyxLQUFVLENBQUMsaUJBQWlCO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyQixDQUFDO0lBQ0gsQ0FBQztJQUVELDhCQUFHLEdBQUgsVUFBSSxLQUFVLENBQUMsaUJBQWlCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFekQsbUNBQVEsR0FBUixVQUFTLEtBQVUsQ0FBQyxpQkFBaUI7UUFDbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEIsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsQ0FBQztJQUNILENBQUM7SUFFRCxzQ0FBVyxHQUFYO1FBQ0UsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JCLENBQUM7SUFDSCxDQUFDO0lBRUQsc0NBQVcsR0FBWCxVQUFZLE9BQVksQ0FBQyxpQkFBaUIsRUFBRSxJQUFZLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDL0Ysc0NBQVcsR0FBWCxVQUFZLEVBQVcsRUFBRSxJQUFZLEVBQUUsS0FBVSxJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQy9FLHNDQUFXLEdBQVgsVUFBWSxFQUFXLEVBQUUsSUFBWSxJQUFTLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLGlDQUFNLEdBQU4sVUFBTyxFQUFXLEVBQUUsVUFBa0IsRUFBRSxJQUFXLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFFdEYsaUNBQU0sR0FBTixjQUFpQixNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUUzQyxzQkFBSSwyQ0FBYTthQUFqQixjQUErQyxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQzthQUN6RSxVQUFrQixLQUE4QixJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDOzs7T0FETDtJQUd6RSxnQ0FBSyxHQUFMLFVBQU0sWUFBb0IsSUFBSSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUN4RCxnQ0FBSyxHQUFMLFVBQU0sUUFBZ0IsSUFBUyxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUN6RCx3Q0FBYSxHQUFiLFVBQWMsRUFBTyxDQUFDLGlCQUFpQixFQUFFLFFBQWdCO1FBQ3ZELE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELDJDQUFnQixHQUFoQixVQUFpQixFQUFPLENBQUMsaUJBQWlCLEVBQUUsUUFBZ0IsSUFBVyxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNqRyw2QkFBRSxHQUFGLFVBQUcsRUFBTyxDQUFDLGlCQUFpQixFQUFFLEdBQVEsQ0FBQyxpQkFBaUIsRUFBRSxRQUFhLENBQUMsaUJBQWlCO1FBQ3ZGLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELHNDQUFXLEdBQVgsVUFDSSxFQUFPLENBQUMsaUJBQWlCLEVBQUUsR0FBUSxDQUFDLGlCQUFpQixFQUNyRCxRQUFhLENBQUMsaUJBQWlCO1FBQ2pDLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELHdDQUFhLEdBQWIsVUFBYyxFQUFPLENBQUMsaUJBQWlCLEVBQUUsR0FBUSxDQUFDLGlCQUFpQixJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLDJDQUFnQixHQUFoQixVQUFpQixTQUFjLENBQUMsaUJBQWlCLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDcEYsc0NBQVcsR0FBWCxVQUFZLFNBQWlCLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDaEUseUNBQWMsR0FBZCxVQUFlLEdBQVEsQ0FBQyxpQkFBaUIsSUFBSSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUN2RSxzQ0FBVyxHQUFYLFVBQVksR0FBUSxDQUFDLGlCQUFpQixJQUFhLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzdFLHVDQUFZLEdBQVosVUFBYSxFQUFPLENBQUMsaUJBQWlCLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDNUUsNkNBQWtCLEdBQWxCLFVBQW1CLEVBQU8sQ0FBQyxpQkFBaUIsSUFBUyxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUMvRSx1Q0FBWSxHQUFaLFVBQWEsRUFBTyxDQUFDLGlCQUFpQixJQUFZLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzVFLG1DQUFRLEdBQVIsVUFBUyxJQUFTLENBQUMsaUJBQWlCLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDMUUsb0NBQVMsR0FBVCxVQUFVLElBQVMsQ0FBQyxpQkFBaUIsSUFBWSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUMzRSwrQkFBSSxHQUFKLFVBQUssSUFBUyxDQUFDLGlCQUFpQixJQUFZLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLGtDQUFPLEdBQVAsVUFBUSxJQUFTLENBQUMsaUJBQWlCLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDdEUscUNBQVUsR0FBVixVQUFXLEVBQU8sQ0FBQyxpQkFBaUIsSUFBVSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUN4RSxzQ0FBVyxHQUFYLFVBQVksRUFBTyxDQUFDLGlCQUFpQixJQUFVLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3pFLHdDQUFhLEdBQWIsVUFBYyxFQUFPLENBQUMsaUJBQWlCLElBQVUsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDM0UscUNBQVUsR0FBVixVQUFXLEVBQU8sQ0FBQyxpQkFBaUIsSUFBWSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUMxRSwyQ0FBZ0IsR0FBaEIsVUFBaUIsRUFBTyxDQUFDLGlCQUFpQixJQUFZLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLHFDQUFVLEdBQVYsVUFBVyxFQUFPLENBQUMsaUJBQWlCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDbEUsc0NBQVcsR0FBWCxVQUFZLEVBQU8sQ0FBQyxpQkFBaUIsRUFBRSxJQUFTLENBQUMsaUJBQWlCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDaEcsc0NBQVcsR0FBWCxVQUFZLEVBQU8sQ0FBQyxpQkFBaUIsRUFBRSxJQUFTLENBQUMsaUJBQWlCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDaEcsdUNBQVksR0FBWixVQUNJLEVBQU8sQ0FBQyxpQkFBaUIsRUFBRSxPQUFZLENBQUMsaUJBQWlCLEVBQUUsT0FBWSxDQUFDLGlCQUFpQjtRQUMzRixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCxpQ0FBTSxHQUFOLFVBQU8sRUFBTyxDQUFDLGlCQUFpQixJQUFVLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLHVDQUFZLEdBQVosVUFBYSxFQUFPLENBQUMsaUJBQWlCLEVBQUUsSUFBUyxDQUFDLGlCQUFpQixJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2pHLDBDQUFlLEdBQWYsVUFBZ0IsRUFBTyxDQUFDLGlCQUFpQixFQUFFLEtBQVUsQ0FBQyxpQkFBaUI7UUFDckUsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0Qsc0NBQVcsR0FBWCxVQUFZLEVBQU8sQ0FBQyxpQkFBaUIsRUFBRSxJQUFTLENBQUMsaUJBQWlCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDaEcsdUNBQVksR0FBWixVQUFhLEVBQU8sQ0FBQyxpQkFBaUIsRUFBRSxLQUFVLENBQUMsaUJBQWlCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDbEcsa0NBQU8sR0FBUCxVQUFRLEVBQU8sQ0FBQyxpQkFBaUIsSUFBWSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUN2RSxrQ0FBTyxHQUFQLFVBQVEsRUFBTyxDQUFDLGlCQUFpQixFQUFFLEtBQWEsSUFBSSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM5RSxtQ0FBUSxHQUFSLFVBQVMsRUFBTyxDQUFDLGlCQUFpQixJQUFZLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLG1DQUFRLEdBQVIsVUFBUyxFQUFPLENBQUMsaUJBQWlCLEVBQUUsS0FBYSxJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQy9FLHFDQUFVLEdBQVYsVUFBVyxFQUFPLENBQUMsaUJBQWlCLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDM0UscUNBQVUsR0FBVixVQUFXLEVBQU8sQ0FBQyxpQkFBaUIsRUFBRSxLQUFjLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDbEYsd0NBQWEsR0FBYixVQUFjLElBQVksSUFBUyxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM3RCx5Q0FBYyxHQUFkLFVBQWUsSUFBUyxDQUFDLGlCQUFpQixJQUFpQixNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNyRix3Q0FBYSxHQUFiLFVBQWMsT0FBWSxDQUFDLGlCQUFpQixFQUFFLEdBQVMsQ0FBQyxpQkFBaUI7UUFDdkUsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsMENBQWUsR0FBZixVQUFnQixFQUFVLEVBQUUsT0FBZSxFQUFFLEdBQVMsQ0FBQyxpQkFBaUI7UUFDdEUsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QseUNBQWMsR0FBZCxVQUFlLElBQVksRUFBRSxHQUFTLENBQUMsaUJBQWlCLElBQVUsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDNUYsMENBQWUsR0FBZixVQUFnQixRQUFnQixFQUFFLFNBQWlCLEVBQUUsR0FBUyxDQUFDLGlCQUFpQjtRQUM5RSxNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCw2Q0FBa0IsR0FBbEIsVUFBbUIsR0FBVyxFQUFFLEdBQVMsQ0FBQyxpQkFBaUI7UUFDekQsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsMkNBQWdCLEdBQWhCLFVBQWlCLEVBQU8sQ0FBQyxpQkFBaUIsSUFBUyxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM3RSx3Q0FBYSxHQUFiLFVBQWMsRUFBTyxDQUFDLGlCQUFpQixJQUFTLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzFFLGtDQUFPLEdBQVAsVUFBUSxFQUFPLENBQUMsaUJBQWlCLElBQVMsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDcEUsOENBQW1CLEdBQW5CLFVBQW9CLEVBQU8sQ0FBQyxpQkFBaUIsSUFBWSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNuRixnQ0FBSyxHQUFMLFVBQU0sSUFBVSxJQUFVLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3BELGlEQUFzQixHQUF0QixVQUF1QixPQUFZLENBQUMsaUJBQWlCLEVBQUUsSUFBWTtRQUNqRSxNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCwrQ0FBb0IsR0FBcEIsVUFBcUIsT0FBWSxDQUFDLGlCQUFpQixFQUFFLElBQVk7UUFDL0QsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0Qsb0NBQVMsR0FBVCxVQUFVLE9BQVksQ0FBQyxpQkFBaUIsSUFBVyxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM3RSxtQ0FBUSxHQUFSLFVBQVMsT0FBWSxDQUFDLGlCQUFpQixFQUFFLFNBQWlCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDeEYsc0NBQVcsR0FBWCxVQUFZLE9BQVksQ0FBQyxpQkFBaUIsRUFBRSxTQUFpQixJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzNGLG1DQUFRLEdBQVIsVUFBUyxPQUFZLENBQUMsaUJBQWlCLEVBQUUsU0FBaUIsSUFBYSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNqRyxtQ0FBUSxHQUFSLFVBQVMsT0FBWSxDQUFDLGlCQUFpQixFQUFFLFNBQWlCLEVBQUUsVUFBa0I7UUFDNUUsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0Qsc0NBQVcsR0FBWCxVQUFZLE9BQVksQ0FBQyxpQkFBaUIsRUFBRSxTQUFpQixJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzNGLG1DQUFRLEdBQVIsVUFBUyxPQUFZLENBQUMsaUJBQWlCLEVBQUUsU0FBaUIsSUFBWSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNoRyxtQ0FBUSxHQUFSLFVBQVMsT0FBWSxDQUFDLGlCQUFpQixFQUFFLFNBQWlCLEVBQUUsVUFBbUI7UUFDN0UsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0Qsa0NBQU8sR0FBUCxVQUFRLE9BQVksQ0FBQyxpQkFBaUIsSUFBWSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM1RSx1Q0FBWSxHQUFaLFVBQWEsT0FBWSxDQUFDLGlCQUFpQixJQUF5QixNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM5Rix1Q0FBWSxHQUFaLFVBQWEsT0FBWSxDQUFDLGlCQUFpQixFQUFFLFNBQWlCO1FBQzVELE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELHlDQUFjLEdBQWQsVUFBZSxPQUFZLENBQUMsaUJBQWlCLEVBQUUsRUFBVSxFQUFFLFNBQWlCO1FBQzFFLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELHVDQUFZLEdBQVosVUFBYSxPQUFZLENBQUMsaUJBQWlCLEVBQUUsU0FBaUI7UUFDNUQsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QseUNBQWMsR0FBZCxVQUFlLE9BQVksQ0FBQyxpQkFBaUIsRUFBRSxFQUFVLEVBQUUsU0FBaUI7UUFDMUUsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsdUNBQVksR0FBWixVQUFhLE9BQVksQ0FBQyxpQkFBaUIsRUFBRSxJQUFZLEVBQUUsS0FBYTtRQUN0RSxNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCx5Q0FBYyxHQUFkLFVBQWUsT0FBWSxDQUFDLGlCQUFpQixFQUFFLEVBQVUsRUFBRSxJQUFZLEVBQUUsS0FBYTtRQUNwRixNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7SUFDRCwwQ0FBZSxHQUFmLFVBQWdCLE9BQVksQ0FBQyxpQkFBaUIsRUFBRSxTQUFpQixJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQy9GLDRDQUFpQixHQUFqQixVQUFrQixPQUFZLENBQUMsaUJBQWlCLEVBQUUsRUFBVSxFQUFFLFNBQWlCO1FBQzdFLE1BQU0saUJBQWlCLENBQUM7SUFDMUIsQ0FBQztJQUNELDRDQUFpQixHQUFqQixVQUFrQixFQUFPLENBQUMsaUJBQWlCLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDekUsNkNBQWtCLEdBQWxCLGNBQXFDLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQy9ELHFDQUFVLEdBQVYsY0FBNkIsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDdkQsZ0RBQXFCLEdBQXJCLFVBQXNCLEVBQU8sQ0FBQyxpQkFBaUIsSUFBSSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM3RSxtQ0FBUSxHQUFSLGNBQXFCLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQy9DLG1DQUFRLEdBQVIsVUFBUyxRQUFnQixJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3ZELHlDQUFjLEdBQWQsVUFBZSxDQUFNLENBQUMsaUJBQWlCLEVBQUUsUUFBZ0IsSUFBYSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNoRyw0Q0FBaUIsR0FBakIsVUFBa0IsRUFBTyxJQUFhLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2hFLHFDQUFVLEdBQVYsVUFBVyxJQUFTLENBQUMsaUJBQWlCLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDN0Usd0NBQWEsR0FBYixVQUFjLElBQVMsQ0FBQyxpQkFBaUIsSUFBYSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNoRix3Q0FBYSxHQUFiLFVBQWMsSUFBUyxDQUFDLGlCQUFpQixJQUFhLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2hGLHdDQUFhLEdBQWIsVUFBYyxJQUFTLENBQUMsaUJBQWlCLElBQWEsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDaEYsdUNBQVksR0FBWixVQUFhLElBQVMsQ0FBQyxpQkFBaUIsSUFBYSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUMvRSx3Q0FBYSxHQUFiLFVBQWMsSUFBVSxJQUFVLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzVELG9DQUFTLEdBQVQsVUFBVSxJQUFVLElBQVUsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDeEQsa0NBQU8sR0FBUCxVQUFRLE9BQVksQ0FBQyxpQkFBaUIsSUFBWSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM1RSxzQ0FBVyxHQUFYLFVBQVksS0FBVSxDQUFDLGlCQUFpQixJQUFZLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzlFLDRDQUFpQixHQUFqQixVQUFrQixPQUFZLENBQUMsaUJBQWlCLEVBQUUsT0FBZSxFQUFFLElBQVk7UUFDN0UsTUFBTSxpQkFBaUIsQ0FBQztJQUMxQixDQUFDO0lBQ0QsNENBQWlCLEdBQWpCLGNBQStCLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3pELGtEQUF1QixHQUF2QixjQUFxQyxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUMvRCwrQ0FBb0IsR0FBcEIsVUFBcUIsTUFBYyxJQUFTLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLHFDQUFVLEdBQVYsY0FBd0IsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDbEQsc0NBQVcsR0FBWCxjQUEwQixNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNwRCxzQ0FBVyxHQUFYLGNBQXdCLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2xELDJDQUFnQixHQUFoQixjQUEyQixNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNyRCx1Q0FBWSxHQUFaLGNBQXlCLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ25ELGtDQUFPLEdBQVAsVUFBUSxPQUFZLENBQUMsaUJBQWlCLEVBQUUsSUFBWSxFQUFFLEtBQWEsSUFBSSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUNqRywyQ0FBZ0IsR0FBaEIsVUFBaUIsT0FBWSxDQUFDLGlCQUFpQixJQUFTLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ2xGLGtDQUFPLEdBQVAsVUFBUSxPQUFZLENBQUMsaUJBQWlCLEVBQUUsSUFBWSxJQUFZLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQzFGLHVDQUFZLEdBQVosVUFBYSxJQUFZLEVBQUUsS0FBVSxJQUFJLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ25FLGdEQUFxQixHQUFyQixVQUFzQixRQUFhLENBQUMsaUJBQWlCLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDM0YsK0NBQW9CLEdBQXBCLFVBQXFCLEVBQU8sQ0FBQyxpQkFBaUIsSUFBSSxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUM1RSx5Q0FBYyxHQUFkLGNBQTJCLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3JELDZDQUFrQixHQUFsQixjQUErQixNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUN6RCwyQ0FBZ0IsR0FBaEIsY0FBNkIsTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDdkQsNENBQWlCLEdBQWpCLGNBQStCLE1BQU0saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBQ3pELCtDQUFvQixHQUFwQixjQUFrQyxNQUFNLGlCQUFpQixDQUFDLENBQUMsQ0FBQztJQUU1RCwwQ0FBZSxHQUFmLGNBQTZCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzVDLG9DQUFTLEdBQVQsVUFBVSxJQUFZLElBQVksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDNUQsb0NBQVMsR0FBVCxVQUFVLElBQVksRUFBRSxLQUFhLElBQUksTUFBTSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFDckUsdUJBQUM7QUFBRCxDQUFDLEFBbE1ELENBQXNDLHdCQUFVLEdBa00vQztBQWxNWSx3QkFBZ0IsbUJBa001QixDQUFBIn0=