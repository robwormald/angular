/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('@angular/core/src/facade/lang');
var GreetingService = (function () {
    function GreetingService() {
        this.greeting = 'hello';
    }
    /** @nocollapse */
    GreetingService.decorators = [
        { type: core_1.Injectable },
    ];
    return GreetingService;
}());
exports.GreetingService = GreetingService;
var RedDec = (function () {
    // ElementRef is always injectable and it wraps the element on which the
    // directive was found by the compiler.
    function RedDec(el, renderer) {
        renderer.setElementStyle(el.nativeElement, 'color', 'red');
    }
    // constructor(renderer: Renderer) {}
    /** @nocollapse */
    RedDec.decorators = [
        { type: core_1.Directive, args: [{ selector: '[red]' },] },
    ];
    /** @nocollapse */
    RedDec.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.Renderer, },
    ];
    return RedDec;
}());
var HelloCmp = (function () {
    function HelloCmp(service) {
        this.lastKey = '(none)';
        this.greeting = service.greeting;
    }
    HelloCmp.prototype.changeGreeting = function () { this.greeting = 'howdy'; };
    HelloCmp.prototype.onKeyDown = function (event /** TODO #9100 */) { this.lastKey = lang_1.StringWrapper.fromCharCode(event.keyCode); };
    /** @nocollapse */
    HelloCmp.decorators = [
        { type: core_1.Component, args: [{
                    // The Selector prop tells Angular on which elements to instantiate this
                    // class. The syntax supported is a basic subset of CSS selectors, for example
                    // 'element', '[attr]', [attr=foo]', etc.
                    selector: 'hello-app',
                    // These are services that would be created if a class in the component's
                    // template tries to inject them.
                    viewProviders: [GreetingService],
                    // The template for the component.
                    // Expressions in the template (like {{greeting}}) are evaluated in the
                    // context of the HelloCmp class below.
                    template: "<div class=\"greeting\">{{greeting}} <span red>world</span>!</div>\n           <button class=\"changeButton\" (click)=\"changeGreeting()\">change greeting</button>\n           <div (keydown)=\"onKeyDown($event)\" class=\"sample-area\" tabindex=\"0\">{{lastKey}}</div><br>",
                    // All directives used in the template need to be specified. This allows for
                    // modularity (RedDec can only be used in this template)
                    // and better tooling (the template can be invalidated if the attribute is
                    // misspelled).
                    directives: [RedDec]
                },] },
    ];
    /** @nocollapse */
    HelloCmp.ctorParameters = [
        { type: GreetingService, },
    ];
    return HelloCmp;
}());
exports.HelloCmp = HelloCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXhfY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL3NyYy93ZWJfd29ya2Vycy9raXRjaGVuX3NpbmsvaW5kZXhfY29tbW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBcUUsZUFBZSxDQUFDLENBQUE7QUFDckYscUJBQTRCLCtCQUErQixDQUFDLENBQUE7QUFDNUQ7SUFBQTtRQUNFLGFBQVEsR0FBVyxPQUFPLENBQUM7SUFLN0IsQ0FBQztJQUpELGtCQUFrQjtJQUNYLDBCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLHNCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSx1QkFBZSxrQkFNM0IsQ0FBQTtBQUNEO0lBQ0Usd0VBQXdFO0lBQ3hFLHVDQUF1QztJQUN2QyxnQkFBWSxFQUFjLEVBQUUsUUFBa0I7UUFDNUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0QscUNBQXFDO0lBQ3ZDLGtCQUFrQjtJQUNYLGlCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFDLEVBQUcsRUFBRTtLQUNqRCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gscUJBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsaUJBQVUsR0FBRztRQUNwQixFQUFDLElBQUksRUFBRSxlQUFRLEdBQUc7S0FDakIsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQUFDLEFBaEJELElBZ0JDO0FBQ0Q7SUFJRSxrQkFBWSxPQUF3QjtRQUZwQyxZQUFPLEdBQVcsUUFBUSxDQUFDO1FBRWEsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQUMsQ0FBQztJQUUzRSxpQ0FBYyxHQUFkLGNBQXlCLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUVuRCw0QkFBUyxHQUFULFVBQVUsS0FBVSxDQUFDLGlCQUFpQixJQUFVLElBQUksQ0FBQyxPQUFPLEdBQUcsb0JBQWEsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RyxrQkFBa0I7SUFDWCxtQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4Qix3RUFBd0U7b0JBQ3hFLDhFQUE4RTtvQkFDOUUseUNBQXlDO29CQUN6QyxRQUFRLEVBQUUsV0FBVztvQkFDckIseUVBQXlFO29CQUN6RSxpQ0FBaUM7b0JBQ2pDLGFBQWEsRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDaEMsa0NBQWtDO29CQUNsQyx1RUFBdUU7b0JBQ3ZFLHVDQUF1QztvQkFDdkMsUUFBUSxFQUFFLGlSQUV5RjtvQkFDbkcsNEVBQTRFO29CQUM1RSx3REFBd0Q7b0JBQ3hELDBFQUEwRTtvQkFDMUUsZUFBZTtvQkFDZixVQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUM7aUJBQ3JCLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixrQkFBa0I7SUFDWCx1QkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxlQUFlLEdBQUc7S0FDeEIsQ0FBQztJQUNGLGVBQUM7QUFBRCxDQUFDLEFBcENELElBb0NDO0FBcENZLGdCQUFRLFdBb0NwQixDQUFBIn0=