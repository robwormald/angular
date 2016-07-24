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
var core_1 = require('@angular/core');
exports.SecurityContext = core_1.SecurityContext;
var html_sanitizer_1 = require('./html_sanitizer');
var style_sanitizer_1 = require('./style_sanitizer');
var url_sanitizer_1 = require('./url_sanitizer');
/**
 * DomSanitizationService helps preventing Cross Site Scripting Security bugs (XSS) by sanitizing
 * values to be safe to use in the different DOM contexts.
 *
 * For example, when binding a URL in an `<a [href]="someValue">` hyperlink, `someValue` will be
 * sanitized so that an attacker cannot inject e.g. a `javascript:` URL that would execute code on
 * the website.
 *
 * In specific situations, it might be necessary to disable sanitization, for example if the
 * application genuinely needs to produce a `javascript:` style link with a dynamic value in it.
 * Users can bypass security by constructing a value with one of the `bypassSecurityTrust...`
 * methods, and then binding to that value from the template.
 *
 * These situations should be very rare, and extraordinary care must be taken to avoid creating a
 * Cross Site Scripting (XSS) security bug!
 *
 * When using `bypassSecurityTrust...`, make sure to call the method as early as possible and as
 * close as possible to the source of the value, to make it easy to verify no security bug is
 * created by its use.
 *
 * It is not required (and not recommended) to bypass security if the value is safe, e.g. a URL that
 * does not start with a suspicious protocol, or an HTML snippet that does not contain dangerous
 * code. The sanitizer leaves safe values intact.
 *
 * @security Calling any of the `bypassSecurityTrust...` APIs disables Angular's built-in
 * sanitization for the value passed in. Carefully check and audit all values and code paths going
 * into this call. Make sure any user data is appropriately escaped for this security context.
 * For more detail, see the [Security Guide](http://g.co/ng/security).
 *
 * @stable
 */
var DomSanitizationService = (function () {
    function DomSanitizationService() {
    }
    return DomSanitizationService;
}());
exports.DomSanitizationService = DomSanitizationService;
var DomSanitizationServiceImpl = (function (_super) {
    __extends(DomSanitizationServiceImpl, _super);
    function DomSanitizationServiceImpl() {
        _super.apply(this, arguments);
    }
    DomSanitizationServiceImpl.prototype.sanitize = function (ctx, value) {
        if (value == null)
            return null;
        switch (ctx) {
            case core_1.SecurityContext.NONE:
                return value;
            case core_1.SecurityContext.HTML:
                if (value instanceof SafeHtmlImpl)
                    return value.changingThisBreaksApplicationSecurity;
                this.checkNotSafeValue(value, 'HTML');
                return html_sanitizer_1.sanitizeHtml(String(value));
            case core_1.SecurityContext.STYLE:
                if (value instanceof SafeStyleImpl)
                    return value.changingThisBreaksApplicationSecurity;
                this.checkNotSafeValue(value, 'Style');
                return style_sanitizer_1.sanitizeStyle(value);
            case core_1.SecurityContext.SCRIPT:
                if (value instanceof SafeScriptImpl)
                    return value.changingThisBreaksApplicationSecurity;
                this.checkNotSafeValue(value, 'Script');
                throw new Error('unsafe value used in a script context');
            case core_1.SecurityContext.URL:
                if (value instanceof SafeResourceUrlImpl || value instanceof SafeUrlImpl) {
                    // Allow resource URLs in URL contexts, they are strictly more trusted.
                    return value.changingThisBreaksApplicationSecurity;
                }
                this.checkNotSafeValue(value, 'URL');
                return url_sanitizer_1.sanitizeUrl(String(value));
            case core_1.SecurityContext.RESOURCE_URL:
                if (value instanceof SafeResourceUrlImpl) {
                    return value.changingThisBreaksApplicationSecurity;
                }
                this.checkNotSafeValue(value, 'ResourceURL');
                throw new Error('unsafe value used in a resource URL context (see http://g.co/ng/security#xss)');
            default:
                throw new Error("Unexpected SecurityContext " + ctx + " (see http://g.co/ng/security#xss)");
        }
    };
    DomSanitizationServiceImpl.prototype.checkNotSafeValue = function (value, expectedType) {
        if (value instanceof SafeValueImpl) {
            throw new Error(("Required a safe " + expectedType + ", got a " + value.getTypeName() + " ") +
                "(see http://g.co/ng/security#xss)");
        }
    };
    DomSanitizationServiceImpl.prototype.bypassSecurityTrustHtml = function (value) { return new SafeHtmlImpl(value); };
    DomSanitizationServiceImpl.prototype.bypassSecurityTrustStyle = function (value) { return new SafeStyleImpl(value); };
    DomSanitizationServiceImpl.prototype.bypassSecurityTrustScript = function (value) { return new SafeScriptImpl(value); };
    DomSanitizationServiceImpl.prototype.bypassSecurityTrustUrl = function (value) { return new SafeUrlImpl(value); };
    DomSanitizationServiceImpl.prototype.bypassSecurityTrustResourceUrl = function (value) {
        return new SafeResourceUrlImpl(value);
    };
    /** @nocollapse */
    DomSanitizationServiceImpl.decorators = [
        { type: core_1.Injectable },
    ];
    return DomSanitizationServiceImpl;
}(DomSanitizationService));
exports.DomSanitizationServiceImpl = DomSanitizationServiceImpl;
var SafeValueImpl = (function () {
    function SafeValueImpl(changingThisBreaksApplicationSecurity) {
        this.changingThisBreaksApplicationSecurity = changingThisBreaksApplicationSecurity;
        // empty
    }
    SafeValueImpl.prototype.toString = function () {
        return ("SafeValue must use [property]=binding: " + this.changingThisBreaksApplicationSecurity) +
            " (see http://g.co/ng/security#xss)";
    };
    return SafeValueImpl;
}());
var SafeHtmlImpl = (function (_super) {
    __extends(SafeHtmlImpl, _super);
    function SafeHtmlImpl() {
        _super.apply(this, arguments);
    }
    SafeHtmlImpl.prototype.getTypeName = function () { return 'HTML'; };
    return SafeHtmlImpl;
}(SafeValueImpl));
var SafeStyleImpl = (function (_super) {
    __extends(SafeStyleImpl, _super);
    function SafeStyleImpl() {
        _super.apply(this, arguments);
    }
    SafeStyleImpl.prototype.getTypeName = function () { return 'Style'; };
    return SafeStyleImpl;
}(SafeValueImpl));
var SafeScriptImpl = (function (_super) {
    __extends(SafeScriptImpl, _super);
    function SafeScriptImpl() {
        _super.apply(this, arguments);
    }
    SafeScriptImpl.prototype.getTypeName = function () { return 'Script'; };
    return SafeScriptImpl;
}(SafeValueImpl));
var SafeUrlImpl = (function (_super) {
    __extends(SafeUrlImpl, _super);
    function SafeUrlImpl() {
        _super.apply(this, arguments);
    }
    SafeUrlImpl.prototype.getTypeName = function () { return 'URL'; };
    return SafeUrlImpl;
}(SafeValueImpl));
var SafeResourceUrlImpl = (function (_super) {
    __extends(SafeResourceUrlImpl, _super);
    function SafeResourceUrlImpl() {
        _super.apply(this, arguments);
    }
    SafeResourceUrlImpl.prototype.getTypeName = function () { return 'ResourceURL'; };
    return SafeResourceUrlImpl;
}(SafeValueImpl));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3Nhbml0aXphdGlvbl9zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyL3NyYy9zZWN1cml0eS9kb21fc2FuaXRpemF0aW9uX3NlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgscUJBQStELGVBQWUsQ0FBQyxDQUFBO0FBTXZFLHVCQUFlO0FBSnZCLCtCQUEyQixrQkFBa0IsQ0FBQyxDQUFBO0FBQzlDLGdDQUE0QixtQkFBbUIsQ0FBQyxDQUFBO0FBQ2hELDhCQUEwQixpQkFBaUIsQ0FBQyxDQUFBO0FBK0M1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBQ0g7SUFBQTtJQXNEQSxDQUFDO0lBQUQsNkJBQUM7QUFBRCxDQUFDLEFBdERELElBc0RDO0FBdERxQiw4QkFBc0IseUJBc0QzQyxDQUFBO0FBQ0Q7SUFBZ0QsOENBQXNCO0lBQXRFO1FBQWdELDhCQUFzQjtJQXdEdEUsQ0FBQztJQXZEQyw2Q0FBUSxHQUFSLFVBQVMsR0FBb0IsRUFBRSxLQUFVO1FBQ3ZDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUM7WUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDWixLQUFLLHNCQUFlLENBQUMsSUFBSTtnQkFDdkIsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUNmLEtBQUssc0JBQWUsQ0FBQyxJQUFJO2dCQUN2QixFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksWUFBWSxDQUFDO29CQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUM7Z0JBQ3RGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3RDLE1BQU0sQ0FBQyw2QkFBWSxD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