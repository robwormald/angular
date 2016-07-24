/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
function main() {
    // Bootstrapping only requires specifying a root component.
    // The boundary between the Angular application and the rest of the page is
    // the shadowDom of this root component.
    // The selector of the component passed in is used to find where to insert the
    // application.
    // You can use the light dom of the <hello-app> tag as temporary content (for
    // example 'Loading...') before the application is ready.
    platform_browser_dynamic_1.bootstrap(HelloCmp);
}
exports.main = main;
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
exports.RedDec = RedDec;
var HelloCmp = (function () {
    function HelloCmp(service) {
        this.greeting = service.greeting;
    }
    HelloCmp.prototype.changeGreeting = function () { this.greeting = 'howdy'; };
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
                    // Expressions in the template (like {{greeting}}) are evaluated in the
                    // context of the HelloCmp class below.
                    template: "<div class=\"greeting\">{{greeting}} <span red>world</span>!</div>\n           <button class=\"changeButton\" (click)=\"changeGreeting()\">change greeting</button>",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL2hlbGxvX3dvcmxkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5Q0FBd0IsbUNBQW1DLENBQUMsQ0FBQTtBQUM1RCxxQkFBcUUsZUFBZSxDQUFDLENBQUE7QUFFckY7SUFDRSwyREFBMkQ7SUFDM0QsMkVBQTJFO0lBQzNFLHdDQUF3QztJQUN4Qyw4RUFBOEU7SUFDOUUsZUFBZTtJQUNmLDZFQUE2RTtJQUM3RSx5REFBeUQ7SUFDekQsb0NBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN0QixDQUFDO0FBVGUsWUFBSSxPQVNuQixDQUFBO0FBQ0Q7SUFBQTtRQUNFLGFBQVEsR0FBVyxPQUFPLENBQUM7SUFLN0IsQ0FBQztJQUpELGtCQUFrQjtJQUNYLDBCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLHNCQUFDO0FBQUQsQ0FBQyxBQU5ELElBTUM7QUFOWSx1QkFBZSxrQkFNM0IsQ0FBQTtBQUNEO0lBQ0Usd0VBQXdFO0lBQ3hFLHVDQUF1QztJQUN2QyxnQkFBWSxFQUFjLEVBQUUsUUFBa0I7UUFDNUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsaUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUMsRUFBRyxFQUFFO0tBQ2pELENBQUM7SUFDRixrQkFBa0I7SUFDWCxxQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxpQkFBVSxHQUFHO1FBQ3BCLEVBQUMsSUFBSSxFQUFFLGVBQVEsR0FBRztLQUNqQixDQUFDO0lBQ0YsYUFBQztBQUFELENBQUMsQUFmRCxJQWVDO0FBZlksY0FBTSxTQWVsQixDQUFBO0FBQ0Q7SUFHRSxrQkFBWSxPQUF3QjtRQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztJQUFDLENBQUM7SUFFM0UsaUNBQWMsR0FBZCxjQUF5QixJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDckQsa0JBQWtCO0lBQ1gsbUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsd0VBQXdFO29CQUN4RSw4RUFBOEU7b0JBQzlFLHlDQUF5QztvQkFDekMsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLHlFQUF5RTtvQkFDekUsaUNBQWlDO29CQUNqQyxhQUFhLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQ2hDLHVFQUF1RTtvQkFDdkUsdUNBQXVDO29CQUN2QyxRQUFRLEVBQUUscUtBQ2dGO29CQUMxRiw0RUFBNEU7b0JBQzVFLHdEQUF3RDtvQkFDeEQsMEVBQTBFO29CQUMxRSxlQUFlO29CQUNmLFVBQVUsRUFBRSxDQUFDLE1BQU0sQ0FBQztpQkFDckIsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLHVCQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLGVBQWUsR0FBRztLQUN4QixDQUFDO0lBQ0YsZUFBQztBQUFELENBQUMsQUEvQkQsSUErQkM7QUEvQlksZ0JBQVEsV0ErQnBCLENBQUEifQ==