/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var MinLengthTestComponent = (function () {
    function MinLengthTestComponent() {
    }
    /** @nocollapse */
    MinLengthTestComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'min-cmp',
                    directives: [common_1.MinLengthValidator],
                    template: "\n<form>\n  <p>Year: <input ngControl=\"year\" minlength=\"2\"></p>\n</form>\n"
                },] },
    ];
    return MinLengthTestComponent;
}());
var MaxLengthTestComponent = (function () {
    function MaxLengthTestComponent() {
    }
    /** @nocollapse */
    MaxLengthTestComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'max-cmp',
                    directives: [common_1.MaxLengthValidator],
                    template: "\n<form>\n  <p>Year: <input ngControl=\"year\" maxlength=\"4\"></p>\n</form>\n"
                },] },
    ];
    return MaxLengthTestComponent;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZXhhbXBsZXMvY29tbW9uL2Zvcm1zL3RzL3ZhbGlkYXRvcnMvdmFsaWRhdG9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsdUJBQXFELGlCQUFpQixDQUFDLENBQUE7QUFDdkUscUJBQXdCLGVBQWUsQ0FBQyxDQUFBO0FBQ3hDO0lBQUE7SUFhQSxDQUFDO0lBWkQsa0JBQWtCO0lBQ1gsaUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLFNBQVM7b0JBQ25CLFVBQVUsRUFBRSxDQUFDLDJCQUFrQixDQUFDO29CQUNoQyxRQUFRLEVBQUUsZ0ZBSVg7aUJBQ0EsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLDZCQUFDO0FBQUQsQ0FBQyxBQWJELElBYUM7QUFDRDtJQUFBO0lBYUEsQ0FBQztJQVpELGtCQUFrQjtJQUNYLGlDQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUM7b0JBQ3hCLFFBQVEsRUFBRSxTQUFTO29CQUNuQixVQUFVLEVBQUUsQ0FBQywyQkFBa0IsQ0FBQztvQkFDaEMsUUFBUSxFQUFFLGdGQUlYO2lCQUNBLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRiw2QkFBQztBQUFELENBQUMsQUFiRCxJQWFDIn0=