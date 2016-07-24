/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var testing_1 = require('@angular/core/testing');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var metadata_1 = require('@angular/core/src/metadata');
var dom_sanitization_service_1 = require('@angular/platform-browser/src/security/dom_sanitization_service');
function main() {
    testing_internal_1.describe('jit', function () { declareTests({ useJit: true }); });
    testing_internal_1.describe('no jit', function () { declareTests({ useJit: false }); });
}
exports.main = main;
var SecuredComponent = (function () {
    function SecuredComponent() {
        this.ctxProp = 'some value';
    }
    /** @nocollapse */
    SecuredComponent.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'my-comp', template: '', directives: [] },] },
    ];
    /** @nocollapse */
    SecuredComponent.ctorParameters = [];
    return SecuredComponent;
}());
function itAsync(msg, f, fn) {
    if (f instanceof Function) {
        testing_internal_1.it(msg, testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], f));
    }
    else {
        var injections = f;
        testing_internal_1.it(msg, testing_internal_1.inject(injections, fn));
    }
}
function declareTests(_a) {
    var useJit = _a.useJit;
    testing_internal_1.describe('security integration tests', function () {
        testing_internal_1.beforeEach(function () { testing_1.configureCompiler({ useJit: useJit }); });
        var originalLog;
        testing_internal_1.beforeEach(function () {
            originalLog = dom_adapter_1.getDOM().log;
            dom_adapter_1.getDOM().log = function (msg) { };
        });
        testing_internal_1.afterEach(function () { dom_adapter_1.getDOM().log = originalLog; });
        itAsync('should disallow binding on*', function (tcb, async) {
            var tpl = "<div [attr.onclick]=\"ctxProp\"></div>";
            tcb.overrideTemplate(SecuredComponent, tpl)
                .createAsync(SecuredComponent)
                .then(function (v) { return async.done(new Error('unexpected success')); })
                .catch(function (e) {
                testing_internal_1.expect(e.message).toContain("Template parse errors:\n" +
                    "Binding to event attribute 'onclick' is disallowed " +
                    "for security reasons, please use (click)=... ");
                async.done();
                return null;
            });
        });
        testing_internal_1.describe('safe HTML values', function () {
            itAsync('should not escape values marked as trusted', [testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter, dom_sanitization_service_1.DomSanitizationService], function (tcb, async, sanitizer) {
                var tpl = "<a [href]=\"ctxProp\">Link Title</a>";
                tcb.overrideTemplate(SecuredComponent, tpl)
                    .createAsync(SecuredComponent)
                    .then(function (fixture) {
                    var e = fixture.debugElement.children[0].nativeElement;
                    var ci = fixture.debugElement.componentInstance;
                    var trusted = sanitizer.bypassSecurityTrustUrl('javascript:alert(1)');
                    ci.ctxProp = trusted;
                    fixture.detectChanges();
                    testing_internal_1.expect(dom_adapter_1.getDOM().getProperty(e, 'href')).toEqual('javascript:alert(1)');
                    async.done();
                });
            });
            itAsync('should error when using the wrong trusted value', [testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter, dom_sanitization_service_1.DomSanitizationService], function (tcb, async, sanitizer) {
                var tpl = "<a [href]=\"ctxProp\">Link Title</a>";
                tcb.overrideTemplate(SecuredComponent, tpl)
                    .createAsync(SecuredComponent)
                    .then(function (fixture) {
                    var trusted = sanitizer.bypassSecurityTrustScript('javascript:alert(1)');
                    var ci = fixture.debugElement.componentInstance;
                    ci.ctxProp = trusted;
                    testing_internal_1.expect(function () { return fixture.detectChanges(); })
                        .toThrowError(/Required a safe URL, got a Script/);
                    async.done();
                });
            });
            itAsync('should warn when using in string interpolation', [testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter, dom_sanitization_service_1.DomSanitizationService], function (tcb, async, sanitizer) {
                var tpl = "<a href=\"/foo/{{ctxProp}}\">Link Title</a>";
                tcb.overrideTemplate(SecuredComponent, tpl)
                    .createAsync(SecuredComponent)
                    .then(function (fixture) {
                    var e = fixture.debugElement.children[0].nativeElement;
                    var trusted = sanitizer.bypassSecurityTrustUrl('bar/baz');
                    var ci = fixture.debugElement.componentInstance;
                    ci.ctxProp = trusted;
                    fixture.detectChanges();
                    testing_internal_1.expect(dom_adapter_1.getDOM().getProperty(e, 'href')).toMatch(/SafeValue(%20| )must(%20| )use/);
                    async.done();
                });
            });
        });
        testing_internal_1.describe('sanitizing', function () {
            itAsync('should escape unsafe attributes', function (tcb, async) {
                var tpl = "<a [href]=\"ctxProp\">Link Title</a>";
                tcb.overrideTemplate(SecuredComponent, tpl)
                    .createAsync(SecuredComponent)
                    .then(function (fixture) {
                    var e = fixture.debugElement.children[0].nativeElement;
                    var ci = fixture.debugElement.componentInstance;
                    ci.ctxProp = 'hello';
                    fixture.detectChanges();
                    // In the browser, reading href returns an absolute URL. On the server side,
                    // it just echoes back the property.
                    testing_internal_1.expect(dom_adapter_1.getDOM().getProperty(e, 'href')).toMatch(/.*\/?hello$/);
                    ci.ctxProp = 'javascript:alert(1)';
                    fixture.detectChanges();
                    testing_internal_1.expect(dom_adapter_1.getDOM().getProperty(e, 'href')).toEqual('unsafe:javascript:alert(1)');
                    async.done();
                });
            });
            itAsync('should escape unsafe style values', function (tcb, async) {
                var tpl = "<div [style.background]=\"ctxProp\">Text</div>";
                tcb.overrideTemplate(SecuredComponent, tpl)
                    .createAsync(SecuredComponent)
                    .then(function (fixture) {
                    var e = fixture.debugElement.children[0].nativeElement;
                    var ci = fixture.debugElement.componentInstance;
                    // Make sure binding harmless values works.
                    ci.ctxProp = 'red';
                    fixture.detectChanges();
                    // In some browsers, this will contain the full background specification, not just
                    // the color.
                    testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(e, 'background')).toMatch(/red.*/);
                    ci.ctxProp = 'url(javascript:evil())';
                    fixture.detectChanges();
                    // Updated value gets rejected, no value change.
                    testing_internal_1.expect(dom_adapter_1.getDOM().getStyle(e, 'background')).not.toContain('javascript');
                    async.done();
                });
            });
            itAsync('should escape unsafe SVG attributes', function (tcb, async) {
                var tpl = "<svg:circle [xlink:href]=\"ctxProp\">Text</svg:circle>";
                tcb.overrideTemplate(SecuredComponent, tpl)
                    .createAsync(SecuredComponent)
                    .then(function (v) { return async.done(new Error('unexpected success')); })
                    .catch(function (e) {
                    testing_internal_1.expect(e.message).toContain("Can't bind to 'xlink:href'");
                    async.done();
                    return null;
                });
            });
            itAsync('should escape unsafe HTML values', function (tcb, async) {
                var tpl = "<div [innerHTML]=\"ctxProp\">Text</div>";
                tcb.overrideTemplate(SecuredComponent, tpl)
                    .createAsync(SecuredComponent)
                    .then(function (fixture) {
                    var e = fixture.debugElement.children[0].nativeElement;
                    var ci = fixture.debugElement.componentInstance;
                    // Make sure binding harmless values works.
                    ci.ctxProp = 'some <p>text</p>';
                    fixture.detectChanges();
                    testing_internal_1.expect(dom_adapter_1.getDOM().getInnerHTML(e)).toEqual('some <p>text</p>');
                    ci.ctxProp = 'ha <script>evil()</script>';
                    fixture.detectChanges();
                    testing_internal_1.expect(dom_adapter_1.getDOM().getInnerHTML(e)).toEqual('ha evil()');
                    ci.ctxProp = 'also <img src="x" onerror="evil()"> evil';
                    fixture.detectChanges();
                    testing_internal_1.expect(dom_adapter_1.getDOM().getInnerHTML(e)).toEqual('also <img src="x"> evil');
                    ci.ctxProp = 'also <iframe srcdoc="evil"> evil';
                    fixture.detectChanges();
                    testing_internal_1.expect(dom_adapter_1.getDOM().getInnerHTML(e)).toEqual('also  evil');
                    async.done();
                });
            });
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VjdXJpdHlfaW50ZWdyYXRpb25fc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0L2xpbmtlci9zZWN1cml0eV9pbnRlZ3JhdGlvbl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBdUgsd0NBQXdDLENBQUMsQ0FBQTtBQUNoSyx3QkFBc0QsdUJBQXVCLENBQUMsQ0FBQTtBQUM5RSw0QkFBcUIsK0NBQStDLENBQUMsQ0FBQTtBQUNyRSx5QkFBd0IsNEJBQTRCLENBQUMsQ0FBQTtBQUNyRCx5Q0FBcUMsaUVBQWlFLENBQUMsQ0FBQTtBQUd2RztJQUNFLDJCQUFRLENBQUMsS0FBSyxFQUFFLGNBQVEsWUFBWSxDQUFDLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUV6RCwyQkFBUSxDQUFDLFFBQVEsRUFBRSxjQUFRLFlBQVksQ0FBQyxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDL0QsQ0FBQztBQUplLFlBQUksT0FJbkIsQ0FBQTtBQUNEO0lBRUU7UUFBZ0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUM7SUFBQyxDQUFDO0lBQ2hELGtCQUFrQjtJQUNYLDJCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLG9CQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBQyxFQUFHLEVBQUU7S0FDakYsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLCtCQUFjLEdBQTJELEVBQy9FLENBQUM7SUFDRix1QkFBQztBQUFELENBQUMsQUFWRCxJQVVDO0FBS0QsaUJBQ0ksR0FBVyxFQUFFLENBQThFLEVB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