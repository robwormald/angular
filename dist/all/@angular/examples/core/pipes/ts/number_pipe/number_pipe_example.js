/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var NumberPipeExample = (function () {
    function NumberPipeExample() {
        this.pi = 3.141;
        this.e = 2.718281828459045;
    }
    /** @nocollapse */
    NumberPipeExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'number-example',
                    template: "<div>\n    <p>e (no formatting): {{e}}</p>\n    <p>e (3.1-5): {{e | number:'3.1-5'}}</p>\n    <p>pi (no formatting): {{pi}}</p>\n    <p>pi (3.5-5): {{pi | number:'3.5-5'}}</p>\n  </div>"
                },] },
    ];
    return NumberPipeExample;
}());
exports.NumberPipeExample = NumberPipeExample;
var PercentPipeExample = (function () {
    function PercentPipeExample() {
        this.a = 0.259;
        this.b = 1.3495;
    }
    /** @nocollapse */
    PercentPipeExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'percent-example',
                    template: "<div>\n    <p>A: {{a | percent}}</p>\n    <p>B: {{b | percent:'4.3-5'}}</p>\n  </div>"
                },] },
    ];
    return PercentPipeExample;
}());
exports.PercentPipeExample = PercentPipeExample;
var CurrencyPipeExample = (function () {
    function CurrencyPipeExample() {
        this.a = 0.259;
        this.b = 1.3495;
    }
    /** @nocollapse */
    CurrencyPipeExample.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'currency-example',
                    template: "<div>\n    <p>A: {{a | currency:'USD':false}}</p>\n    <p>B: {{b | currency:'USD':true:'4.2-2'}}</p>\n  </div>"
                },] },
    ];
    return CurrencyPipeExample;
}());
exports.CurrencyPipeExample = CurrencyPipeExample;
var AppCmp = (function () {
    function AppCmp() {
    }
    /** @nocollapse */
    AppCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'example-app',
                    directives: [NumberPipeExample, PercentPipeExample, CurrencyPipeExample],
                    template: "\n    <h1>Numeric Pipe Examples</h1>\n    <h2>NumberPipe Example</h2>\n    <number-example></number-example>\n    <h2>PercentPipe Example</h2>\n    <percent-example></percent-example>\n    <h2>CurrencyPipeExample</h2>\n    <currency-example></currency-example>\n  "
                },] },
    ];
    return AppCmp;
}());
exports.AppCmp = AppCmp;
function main() {
    platform_browser_dynamic_1.bootstrap(AppCmp);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibnVtYmVyX3BpcGVfZXhhbXBsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZXhhbXBsZXMvY29yZS9waXBlcy90cy9udW1iZXJfcGlwZS9udW1iZXJfcGlwZV9leGFtcGxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMseUNBQXdCLG1DQUFtQyxDQUFDLENBQUE7QUFDNUQ7SUFBQTtRQUNFLE9BQUUsR0FBVyxLQUFLLENBQUM7UUFDbkIsTUFBQyxHQUFXLGlCQUFpQixDQUFDO0lBYWhDLENBQUM7SUFaRCxrQkFBa0I7SUFDWCw0QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixRQUFRLEVBQUUsMkxBS0g7aUJBQ1IsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLHdCQUFDO0FBQUQsQ0FBQyxBQWZELElBZUM7QUFmWSx5QkFBaUIsb0JBZTdCLENBQUE7QUFDRDtJQUFBO1FBQ0UsTUFBQyxHQUFXLEtBQUssQ0FBQztRQUNsQixNQUFDLEdBQVcsTUFBTSxDQUFDO0lBV3JCLENBQUM7SUFWRCxrQkFBa0I7SUFDWCw2QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsdUZBR0g7aUJBQ1IsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLHlCQUFDO0FBQUQsQ0FBQyxBQWJELElBYUM7QUFiWSwwQkFBa0IscUJBYTlCLENBQUE7QUFDRDtJQUFBO1FBQ0UsTUFBQyxHQUFXLEtBQUssQ0FBQztRQUNsQixNQUFDLEdBQVcsTUFBTSxDQUFDO0lBV3JCLENBQUM7SUFWRCxrQkFBa0I7SUFDWCw4QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixRQUFRLEVBQUUsZ0hBR0g7aUJBQ1IsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLDBCQUFDO0FBQUQsQ0FBQyxBQWJELElBYUM7QUFiWSwyQkFBbUIsc0JBYS9CLENBQUE7QUFDRDtJQUFBO0lBaUJBLENBQUM7SUFoQkQsa0JBQWtCO0lBQ1gsaUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFVBQVUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixDQUFDO29CQUN4RSxRQUFRLEVBQUUsMFFBUVQ7aUJBQ0YsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLGFBQUM7QUFBRCxDQUFDLEFBakJELElBaUJDO0FBakJZLGNBQU0sU0FpQmxCLENBQUE7QUFFRDtJQUNFLG9DQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsQ0FBQztBQUZlLFlBQUksT0FFbkIsQ0FBQSJ9