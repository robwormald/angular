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
var dom_adapter_1 = require('../dom/dom_adapter');
var collection_1 = require('../facade/collection');
var lang_1 = require('../facade/lang');
var generic_browser_adapter_1 = require('./generic_browser_adapter');
var _attrToPropMap = {
    'class': 'className',
    'innerHtml': 'innerHTML',
    'readonly': 'readOnly',
    'tabindex': 'tabIndex'
};
var DOM_KEY_LOCATION_NUMPAD = 3;
// Map to convert some key or keyIdentifier values to what will be returned by getEventKey
var _keyMap = {
    // The following values are here for cross-browser compatibility and to match the W3C standard
    // cf http://www.w3.org/TR/DOM-Level-3-Events-key/
    '\b': 'Backspace',
    '\t': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    'Del': 'Delete',
    'Esc': 'Escape',
    'Left': 'ArrowLeft',
    'Right': 'ArrowRight',
    'Up': 'ArrowUp',
    'Down': 'ArrowDown',
    'Menu': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'Win': 'OS'
};
// There is a bug in Chrome for numeric keypad keys:
// https://code.google.com/p/chromium/issues/detail?id=155654
// 1, 2, 3 ... are reported as A, B, C ...
var _chromeNumKeyPadMap = {
    'A': '1',
    'B': '2',
    'C': '3',
    'D': '4',
    'E': '5',
    'F': '6',
    'G': '7',
    'H': '8',
    'I': '9',
    'J': '*',
    'K': '+',
    'M': '-',
    'N': '.',
    'O': '/',
    '\x60': '0',
    '\x90': 'NumLock'
};
/**
 * A `DomAdapter` powered by full browser DOM APIs.
 */
/* tslint:disable:requireParameterType */
var BrowserDomAdapter = (function (_super) {
    __extends(BrowserDomAdapter, _super);
    function BrowserDomAdapter() {
        _super.apply(this, arguments);
    }
    BrowserDomAdapter.prototype.parse = function (templateHtml) { throw new Error('parse not implemented'); };
    BrowserDomAdapter.makeCurrent = function () { dom_adapter_1.setRootDomAdapter(new BrowserDomAdapter()); };
    BrowserDomAdapter.prototype.hasProperty = function (element /** TODO #9100 */, name) { return name in element; };
    BrowserDomAdapter.prototype.setProperty = function (el, name, value) { el[name] = value; };
    BrowserDomAdapter.prototype.getProperty = function (el, name) { return el[name]; };
    BrowserDomAdapter.prototype.invoke = function (el, methodName, args) {
        el[methodName].apply(el, args);
    };
    // TODO(tbosch): move this into a separate environment class once we have it
    BrowserDomAdapter.prototype.logError = function (error /** TODO #9100 */) {
        if (window.console.error) {
            window.console.error(error);
        }
        else {
            window.console.log(error);
        }
    };
    BrowserDomAdapter.prototype.log = function (error /** TODO #9100 */) { window.console.log(error); };
    BrowserDomAdapter.prototype.logGroup = function (error /** TODO #9100 */) {
        if (window.console.group) {
            window.console.group(error);
            this.logError(error);
        }
        else {
            window.console.log(error);
        }
    };
    BrowserDomAdapter.prototype.logGroupEnd = function () {
        if (window.console.groupEnd) {
            window.console.groupEnd();
        }
    };
    Object.defineProperty(BrowserDomAdapter.prototype, "attrToPropMap", {
        get: function () { return _attrToPropMap; },
        enumerable: true,
        configurable: true
    });
    BrowserDomAdapter.prototype.query = function (selector) { return document.querySelector(selector); };
    BrowserDomAdapter.prototype.querySelector = function (el /** TODO #9100 */, selector) {
        return el.querySelector(selector);
    };
    BrowserDomAdapter.prototype.querySelectorAll = function (el /** TODO #9100 */, selector) {
        return el.querySelectorAll(selector);
    };
    BrowserDomAdapter.prototype.on = function (el /** TODO #9100 */, evt /** TODO #9100 */, listener /** TODO #9100 */) {
        el.addEventListener(evt, listener, false);
    };
    BrowserDomAdapter.prototype.onAndCancel = function (el /** TODO #9100 */, evt /** TODO #9100 */, listener /** TODO #9100 */) {
        el.addEventListener(evt, listener, false);
        // Needed to follow Dart's subscription semantic, until fix of
        // https://code.google.com/p/dart/issues/detail?id=17406
        return function () { el.removeEventListener(evt, listener, false); };
    };
    BrowserDomAdapter.prototype.dispatchEvent = function (el /** TODO #9100 */, evt /** TODO #9100 */) { el.dispatchEvent(evt); };
    BrowserDomAdapter.prototype.createMouseEvent = function (eventType) {
        var evt = document.createEvent('MouseEvent');
        evt.initEvent(eventType, true, true);
        return evt;
    };
    BrowserDomAdapter.prototype.createEvent = function (eventType /** TODO #9100 */) {
        var evt = document.createEvent('Event');
        evt.initEvent(eventType, true, true);
        return evt;
    };
    BrowserDomAdapter.prototype.preventDefault = function (evt) {
        evt.preventDefault();
        evt.returnValue = false;
    };
    BrowserDomAdapter.prototype.isPrevented = function (evt) {
        return evt.defaultPrevented || lang_1.isPresent(evt.returnValue) && !evt.returnValue;
    };
    BrowserDomAdapter.prototype.getInnerHTML = function (el /** TODO #9100 */) { return el.innerHTML; };
    BrowserDomAdapter.prototype.getTemplateContent = function (el /** TODO #9100 */) {
        return 'content' in el && el instanceof HTMLTemplateElement ? el.content : null;
    };
    BrowserDomAdapter.prototype.getOuterHTML = function (el /** TODO #9100 */) { return el.outerHTML; };
    BrowserDomAdapter.prototype.nodeName = function (node) { return node.nodeName; };
    BrowserDomAdapter.prototype.nodeValue = function (node) { return node.nodeValue; };
    BrowserDomAdapter.prototype.type = function (node) { return node.type; };
    BrowserDomAdapter.prototype.content = function (node) {
        if (this.hasProperty(node, 'content')) {
            return node.content;
        }
        else {
            return node;
        }
    };
    BrowserDomAdapter.prototype.firstChild = function (el /** TODO #9100 */) { return el.firstChild; };
    BrowserDomAdapter.prototype.nextSibling = function (el /** TODO #9100 */) { return el.nextSibling; };
    BrowserDomAdapter.prototype.parentElement = function (el /** TODO #9100 */) { return el.parentNode; };
    BrowserDomAdapter.prototype.childNodes = function (el /** TODO #9100 */) { return el.childNodes; };
    BrowserDomAdapter.prototype.childNodesAsList = function (el /** TODO #9100 */) {
        var childNodes = el.childNodes;
        var res = collection_1.ListWrapper.createFixedSize(childNodes.length);
        for (var i = 0; i < childNodes.length; i++) {
            res[i] = childNodes[i];
        }
        return res;
    };
    BrowserDomAdapter.prototype.clearNodes = function (el /** TODO #9100 */) {
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }
    };
    BrowserDomAdapter.prototype.appendChild = function (el /** TODO #9100 */, node /** TODO #9100 */) { el.appendChild(node); };
    BrowserDomAdapter.prototype.removeChild = function (el /** TODO #9100 */, node /** TODO #9100 */) { el.removeChild(node); };
    BrowserDomAdapter.prototype.replaceChild = function (el, newChild /** TODO #9100 */, oldChild /** TODO #9100 */) {
        el.replaceChild(newChild, oldChild);
    };
    BrowserDomAdapter.prototype.remove = function (node /** TODO #9100 */) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
        return node;
    };
    BrowserDomAdapter.prototype.insertBefore = function (el /** TODO #9100 */, node /** TODO #9100 */) {
        el.parentNode.insertBefore(node, el);
    };
    BrowserDomAdapter.prototype.insertAllBefore = function (el /** TODO #9100 */, nodes /** TODO #9100 */) {
        nodes.forEach(function (n /** TODO #9100 */) { return el.parentNode.insertBefore(n, el); });
    };
    BrowserDomAdapter.prototype.insertAfter = function (el /** TODO #9100 */, node /** TODO #9100 */) {
        el.parentNode.insertBefore(node, el.nextSibling);
    };
    BrowserDomAdapter.prototype.setInnerHTML = function (el /** TODO #9100 */, value /** TODO #9100 */) { el.innerHTML = value; };
    BrowserDomAdapter.prototype.getText = function (el /** TODO #9100 */) { return el.textContent; };
    // TODO(vicb): removed Element type because it does not support StyleElement
    BrowserDomAdapter.prototype.setText = function (el /** TODO #9100 */, value) { el.textContent = value; };
    BrowserDomAdapter.prototype.getValue = function (el /** TODO #9100 */) { return el.value; };
    BrowserDomAdapter.prototype.setValue = function (el /** TODO #9100 */, value) { el.value = value; };
    BrowserDomAdapter.prototype.getChecked = function (el /** TODO #9100 */) { return el.checked; };
    BrowserDomAdapter.prototype.setChecked = function (el /** TODO #9100 */, value) { el.checked = value; };
    BrowserDomAdapter.prototype.createComment = function (text) { return document.createComment(text); };
    BrowserDomAdapter.prototype.createTemplate = function (html /** TODO #9100 */) {
        var t = document.createElement('template');
        t.innerHTML = html;
        return t;
    };
    BrowserDomAdapter.prototype.createElement = function (tagName /* TODO #9100 */, doc) {
        if (doc === void 0) { doc = document; }
        return doc.createElement(tagName);
    };
    BrowserDomAdapter.prototype.createElementNS = function (ns /* TODO #9100 */, tagName /* TODO #9100 */, doc) {
        if (doc === void 0) { doc = document; }
        return doc.createElementNS(ns, tagName);
    };
    BrowserDomAdapter.prototype.createTextNode = function (text, doc) {
        if (doc === void 0) { doc = document; }
        return doc.createTextNode(text);
    };
    BrowserDomAdapter.prototype.createScriptTag = function (attrName, attrValue, doc) {
        if (doc === void 0) { doc = document; }
        var el = doc.createElement('SCRIPT');
        el.setAttribute(attrName, attrValue);
        return el;
    };
    BrowserDomAdapter.prototype.createStyleElement = function (css, doc) {
        if (doc === void 0) { doc = document; }
        var style = doc.createElement('style');
        this.appendChild(style, this.createTextNode(css));
        return style;
    };
    BrowserDomAdapter.prototype.createShadowRoot = function (el) { return el.createShadowRoot(); };
    BrowserDomAdapter.prototype.getShadowRoot = function (el) { return el.shadowRoot; };
    BrowserDomAdapter.prototype.getHost = function (el) { return el.host; };
    BrowserDomAdapter.prototype.clone = function (node) { return node.cloneNode(true); };
    BrowserDomAdapter.prototype.getElementsByClassName = function (element /** TODO #9100 */, name) {
        return element.getElementsByClassName(name);
    };
    BrowserDomAdapter.prototype.getElementsByTagName = function (element /** TODO #9100 */, name) {
        return element.getElementsByTagName(name);
    };
    BrowserDomAdapter.prototype.classList = function (element /** TODO #9100 */) {
        return Array.prototype.slice.call(element.classList, 0);
    };
    BrowserDomAdapter.prototype.addClass = function (element /** TODO #9100 */, className) { element.classList.add(className); };
    BrowserDomAdapter.prototype.removeClass = function (element /** TODO #9100 */, className) {
        element.classList.remove(className);
    };
    BrowserDomAdapter.prototype.hasClass = function (element /** TODO #9100 */, className) {
        return element.classList.contains(className);
    };
    BrowserDomAdapter.prototype.setStyle = function (element /** TODO #9100 */, styleName, styleValue) {
        element.style[styleName] = styleValue;
    };
    BrowserDomAdapter.prototype.removeStyle = function (element /** TODO #9100 */, stylename) {
        element.style[stylename] = null;
    };
    BrowserDomAdapter.prototype.getStyle = function (element /** TODO #9100 */, stylename) {
        return element.style[stylename];
    };
    BrowserDomAdapter.prototype.hasStyle = function (element /** TODO #9100 */, styleName, styleValue) {
        if (styleValue === void 0) { styleValue = null; }
        var value = this.getStyle(element, styleName) || '';
        return styleValue ? value == styleValue : value.length > 0;
    };
    BrowserDomAdapter.prototype.tagName = function (element /** TODO #9100 */) { return element.tagName; };
    BrowserDomAdapter.prototype.attributeMap = function (element /** TODO #9100 */) {
        var res = new Map();
        var elAttrs = element.attributes;
        for (var i = 0; i < elAttrs.length; i++) {
            var attrib = elAttrs[i];
            res.set(attrib.name, attrib.value);
        }
        return res;
    };
    BrowserDomAdapter.prototype.hasAttribute = function (element /** TODO #9100 */, attribute) {
        return element.hasAttribute(attribute);
    };
    BrowserDomAdapter.prototype.hasAttributeNS = function (element /** TODO #9100 */, ns, attribute) {
        return element.hasAttributeNS(ns, attribute);
    };
    BrowserDomAdapter.prototype.getAttribute = function (element /** TODO #9100 */, attribute) {
        return element.getAttribute(attribute);
    };
    BrowserDomAdapter.prototype.getAttributeNS = function (element /** TODO #9100 */, ns, name) {
        return element.getAttributeNS(ns, name);
    };
    BrowserDomAdapter.prototype.setAttribute = function (element /** TODO #9100 */, name, value) {
        element.setAttribute(name, value);
    };
    BrowserDomAdapter.prototype.setAttributeNS = function (element /** TODO #9100 */, ns, name, value) {
        element.setAttributeNS(ns, name, value);
    };
    BrowserDomAdapter.prototype.removeAttribute = function (element /** TODO #9100 */, attribute) {
        element.removeAttribute(attribute);
    };
    BrowserDomAdapter.prototype.removeAttributeNS = function (element /** TODO #9100 */, ns, name) {
        element.removeAttributeNS(ns, name);
    };
    BrowserDomAdapter.prototype.templateAwareRoot = function (el /** TODO #9100 */) {
        return this.isTemplateElement(el) ? this.content(el) : el;
    };
    BrowserDomAdapter.prototype.createHtmlDocument = function () {
        return document.implementation.createHTMLDocument('fakeTitle');
    };
    BrowserDomAdapter.prototype.defaultDoc = function () { return document; };
    BrowserDomAdapter.prototype.getBoundingClientRect = function (el /** TODO #9100 */) {
        try {
            return el.getBoundingClientRect();
        }
        catch (e) {
            return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
        }
    };
    BrowserDomAdapter.prototype.getTitle = function () { return document.title; };
    BrowserDomAdapter.prototype.setTitle = function (newTitle) { document.title = newTitle || ''; };
    BrowserDomAdapter.prototype.elementMatches = function (n /** TODO #9100 */, selector) {
        var matches = false;
        if (n instanceof HTMLElement) {
            if (n.matches) {
                matches = n.matches(selector);
            }
            else if (n.msMatchesSelector) {
                matches = n.msMatchesSelector(selector);
            }
            else if (n.webkitMatchesSelector) {
                matches = n.webkitMatchesSelector(selector);
            }
        }
        return matches;
    };
    BrowserDomAdapter.prototype.isTemplateElement = function (el) {
        return el instanceof HTMLElement && el.nodeName == 'TEMPLATE';
    };
    BrowserDomAdapter.prototype.isTextNode = function (node) { return node.nodeType === Node.TEXT_NODE; };
    BrowserDomAdapter.prototype.isCommentNode = function (node) { return node.nodeType === Node.COMMENT_NODE; };
    BrowserDomAdapter.prototype.isElementNode = function (node) { return node.nodeType === Node.ELEMENT_NODE; };
    BrowserDomAdapter.prototype.hasShadowRoot = function (node /** TODO #9100 */) {
        return node instanceof HTMLElement && lang_1.isPresent(node.shadowRoot);
    };
    BrowserDomAdapter.prototype.isShadowRoot = function (node /** TODO #9100 */) { return node instanceof DocumentFragment; };
    BrowserDomAdapter.prototype.importIntoDoc = function (node) {
        var toImport = node;
        if (this.isTemplateElement(node)) {
            toImport = this.content(node);
        }
        return document.importNode(toImport, true);
    };
    BrowserDomAdapter.prototype.adoptNode = function (node) { return document.adoptNode(node); };
    BrowserDomAdapter.prototype.getHref = function (el) { return el.href; };
    BrowserDomAdapter.prototype.getEventKey = function (event /** TODO #9100 */) {
        var key = event.key;
        if (lang_1.isBlank(key)) {
            key = event.keyIdentifier;
            // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
            // Safari
            // cf
            // http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
            if (lang_1.isBlank(key)) {
                return 'Unidentified';
            }
            if (key.startsWith('U+')) {
                key = String.fromCharCode(parseInt(key.substring(2), 16));
                if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
                    // There is a bug in Chrome for numeric keypad keys:
                    // https://code.google.com/p/chromium/issues/detail?id=155654
                    // 1, 2, 3 ... are reported as A, B, C ...
                    key = _chromeNumKeyPadMap[key];
                }
            }
        }
        if (_keyMap.hasOwnProperty(key)) {
            key = _keyMap[key];
        }
        return key;
    };
    BrowserDomAdapter.prototype.getGlobalEventTarget = function (target) {
        if (target == 'window') {
            return window;
        }
        else if (target == 'document') {
            return document;
        }
        else if (target == 'body') {
            return document.body;
        }
    };
    BrowserDomAdapter.prototype.getHistory = function () { return window.history; };
    BrowserDomAdapter.prototype.getLocation = function () { return window.location; };
    BrowserDomAdapter.prototype.getBaseHref = function () {
        var href = getBaseElementHref();
        if (lang_1.isBlank(href)) {
            return null;
        }
        return relativePath(href);
    };
    BrowserDomAdapter.prototype.resetBaseElement = function () { baseElement = null; };
    BrowserDomAdapter.prototype.getUserAgent = function () { return window.navigator.userAgent; };
    BrowserDomAdapter.prototype.setData = function (element /** TODO #9100 */, name, value) {
        this.setAttribute(element, 'data-' + name, value);
    };
    BrowserDomAdapter.prototype.getData = function (element /** TODO #9100 */, name) {
        return this.getAttribute(element, 'data-' + name);
    };
    BrowserDomAdapter.prototype.getComputedStyle = function (element /** TODO #9100 */) { return getComputedStyle(element); };
    // TODO(tbosch): move this into a separate environment class once we have it
    BrowserDomAdapter.prototype.setGlobalVar = function (path, value) { lang_1.setValueOnPath(lang_1.global, path, value); };
    BrowserDomAdapter.prototype.requestAnimationFrame = function (callback /** TODO #9100 */) {
        return window.requestAnimationFrame(callback);
    };
    BrowserDomAdapter.prototype.cancelAnimationFrame = function (id) { window.cancelAnimationFrame(id); };
    BrowserDomAdapter.prototype.supportsWebAnimation = function () {
        return lang_1.isFunction(document.body['animate']);
    };
    BrowserDomAdapter.prototype.performanceNow = function () {
        // performance.now() is not available in all browsers, see
        // http://caniuse.com/#search=performance.now
        if (lang_1.isPresent(window.performance) && lang_1.isPresent(window.performance.now)) {
            return window.performance.now();
        }
        else {
            return lang_1.DateWrapper.toMillis(lang_1.DateWrapper.now());
        }
    };
    BrowserDomAdapter.prototype.supportsCookies = function () { return true; };
    BrowserDomAdapter.prototype.getCookie = function (name) { return parseCookieValue(document.cookie, name); };
    BrowserDomAdapter.prototype.setCookie = function (name, value) {
        // document.cookie is magical, assigning into it assigns/overrides one cookie value, but does
        // not clear other cookies.
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    };
    return BrowserDomAdapter;
}(generic_browser_adapter_1.GenericBrowserDomAdapter));
exports.BrowserDomAdapter = BrowserDomAdapter;
var baseElement = null;
function getBaseElementHref() {
    if (lang_1.isBlank(baseElement)) {
        baseElement = document.querySelector('base');
        if (lang_1.isBlank(baseElement)) {
            return null;
        }
    }
    return baseElement.getAttribute('href');
}
// based on urlUtils.js in AngularJS 1
var urlParsingNode = null;
function relativePath(url /** TODO #9100 */) {
    if (lang_1.isBlank(urlParsingNode)) {
        urlParsingNode = document.createElement('a');
    }
    urlParsingNode.setAttribute('href', url);
    return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
        '/' + urlParsingNode.pathname;
}
function parseCookieValue(cookie, name) {
    name = encodeURIComponent(name);
    var cookies = cookie.split(';');
    for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
        var cookie_1 = cookies_1[_i];
        var _a = cookie_1.split('=', 2), key = _a[0], value = _a[1];
        if (key.trim() === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
}
exports.parseCookieValue = parseCookieValue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlcl9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3NyYy9icm93c2VyL2Jyb3dzZXJfYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCw0QkFBZ0Msb0JBQW9CLENBQUMsQ0FBQTtBQUNyRCwyQkFBMEIsc0JBQXNCLENBQUMsQ0FBQTtBQUNqRCxxQkFBa0YsZ0JBQWdCLENBQUMsQ0FBQTtBQUVuRyx3Q0FBdUMsMkJBQTJCLENBQUMsQ0FBQTtBQUVuRSxJQUFJLGNBQWMsR0FBRztJQUNuQixPQUFPLEVBQUUsV0FBVztJQUNwQixXQUFXLEVBQUUsV0FBVztJQUN4QixVQUFVLEVBQUUsVUFBVTtJQUN0QixVQUFVLEVBQUUsVUFBVTtDQUN2QixDQUFDO0FBRUYsSUFBTSx1QkFBdUIsR0FBRyxDQUFDLENBQUM7QUFFbEMsMEZBQTBGO0FBQzFGLElBQUksT0FBTyxHQUFHO0lBQ1osOEZBQThGO0lBQzlGLGtEQUFrRDtJQUNsRCxJQUFJLEVBQUUsV0FBVztJQUNqQixJQUFJLEVBQUUsS0FBSztJQUNYLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLEtBQUssRUFBRSxRQUFRO0lBQ2YsS0FBSyxFQUFFLFFBQVE7SUFDZixNQUFNLEVBQUUsV0FBVztJQUNuQixPQUFPLEVBQUUsWUFBWTtJQUNyQixJQUFJLEVBQUUsU0FBUztJQUNmLE1BQU0sRUFBRSxXQUFXO0lBQ25CLE1BQU0sRUFBRSxhQUFhO0lBQ3JCLFFBQVEsRUFBRSxZQUFZO0lBQ3RCLEtBQUssRUFBRSxJQUFJO0NBQ1osQ0FBQztBQUVGLG9EQUFvRDtBQUNwRCw2REFBNkQ7QUFDN0QsMENBQTBDO0FBQzFDLElBQUksbUJBQW1CLEdBQUc7SUFDeEIsR0FBRyxFQUFFLEdBQUc7SUFDUixHQUFHLEVBQUUs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