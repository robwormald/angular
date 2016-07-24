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
var common_1 = require('@angular/common');
var lang_1 = require('@angular/core/src/facade/lang');
/**
 * A domain model we are binding the form controls to.
 */
var CheckoutModel = (function () {
    function CheckoutModel() {
        this.country = "Canada";
    }
    return CheckoutModel;
}());
/**
 * Custom validator.
 */
function creditCardValidator(c /** TODO #9100 */) {
    if (lang_1.isPresent(c.value) && lang_1.RegExpWrapper.test(/^\d{16}$/g, c.value)) {
        return null;
    }
    else {
        return { "invalidCreditCard": true };
    }
}
var creditCardValidatorBinding = {
    provide: common_1.NG_VALIDATORS,
    useValue: creditCardValidator,
    multi: true
};
var CreditCardValidator = (function () {
    function CreditCardValidator() {
    }
    /** @nocollapse */
    CreditCardValidator.decorators = [
        { type: core_1.Directive, args: [{ selector: '[credit-card]', providers: [creditCardValidatorBinding] },] },
    ];
    return CreditCardValidator;
}());
var ShowError = (function () {
    function ShowError(formDir) {
        this.formDir = formDir;
    }
    Object.defineProperty(ShowError.prototype, "errorMessage", {
        get: function () {
            var form = this.formDir.form;
            var control = form.find(this.controlPath);
            if (lang_1.isPresent(control) && control.touched) {
                for (var i = 0; i < this.errorTypes.length; ++i) {
                    if (control.hasError(this.errorTypes[i])) {
                        return this._errorMessage(this.errorTypes[i]);
                    }
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    ShowError.prototype._errorMessage = function (code) {
        var config = { 'required': 'is required', 'invalidCreditCard': 'is invalid credit card number' };
        return config[code];
    };
    /** @nocollapse */
    ShowError.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'show-error',
                    inputs: ['controlPath: control', 'errorTypes: errors'],
                    template: "\n    <span *ngIf=\"errorMessage !== null\">{{errorMessage}}</span>\n  ",
                    directives: [common_1.NgIf]
                },] },
    ];
    /** @nocollapse */
    ShowError.ctorParameters = [
        { type: common_1.NgForm, decorators: [{ type: core_1.Host },] },
    ];
    return ShowError;
}());
var TemplateDrivenForms = (function () {
    function TemplateDrivenForms() {
        this.model = new CheckoutModel();
        this.countries = ['US', 'Canada'];
    }
    TemplateDrivenForms.prototype.onSubmit = function () {
        lang_1.print("Submitting:");
        lang_1.print(this.model);
    };
    /** @nocollapse */
    TemplateDrivenForms.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'template-driven-forms',
                    template: "\n    <h1>Checkout Form</h1>\n\n    <form (ngSubmit)=\"onSubmit()\" #f=\"ngForm\">\n      <p>\n        <label for=\"firstName\">First Name</label>\n        <input type=\"text\" id=\"firstName\" ngControl=\"firstName\" [(ngModel)]=\"model.firstName\" required>\n        <show-error control=\"firstName\" [errors]=\"['required']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"middleName\">Middle Name</label>\n        <input type=\"text\" id=\"middleName\" ngControl=\"middleName\" [(ngModel)]=\"model.middleName\">\n      </p>\n\n      <p>\n        <label for=\"lastName\">Last Name</label>\n        <input type=\"text\" id=\"lastName\" ngControl=\"lastName\" [(ngModel)]=\"model.lastName\" required>\n        <show-error control=\"lastName\" [errors]=\"['required']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"country\">Country</label>\n        <select id=\"country\" ngControl=\"country\" [(ngModel)]=\"model.country\">\n          <option *ngFor=\"let c of countries\" [value]=\"c\">{{c}}</option>\n        </select>\n      </p>\n\n      <p>\n        <label for=\"creditCard\">Credit Card</label>\n        <input type=\"text\" id=\"creditCard\" ngControl=\"creditCard\" [(ngModel)]=\"model.creditCard\" required credit-card>\n        <show-error control=\"creditCard\" [errors]=\"['required', 'invalidCreditCard']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"amount\">Amount</label>\n        <input type=\"number\" id=\"amount\" ngControl=\"amount\" [(ngModel)]=\"model.amount\" required>\n        <show-error control=\"amount\" [errors]=\"['required']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"email\">Email</label>\n        <input type=\"email\" id=\"email\" ngControl=\"email\" [(ngModel)]=\"model.email\" required>\n        <show-error control=\"email\" [errors]=\"['required']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"comments\">Comments</label>\n        <textarea id=\"comments\" ngControl=\"comments\" [(ngModel)]=\"model.comments\">\n        </textarea>\n      </p>\n\n      <button type=\"submit\" [disabled]=\"!f.form.valid\">Submit</button>\n    </form>\n  ",
                    directives: [common_1.FORM_DIRECTIVES, common_1.NgFor, CreditCardValidator, ShowError]
                },] },
    ];
    return TemplateDrivenForms;
}());
function main() {
    platform_browser_dynamic_1.bootstrap(TemplateDrivenForms);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL3RlbXBsYXRlX2RyaXZlbl9mb3Jtcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgseUNBQXdCLG1DQUFtQyxDQUFDLENBQUE7QUFDNUQscUJBQXlDLGVBQWUsQ0FBQyxDQUFBO0FBQ3pELHVCQVNPLGlCQUFpQixDQUFDLENBQUE7QUFFekIscUJBQThDLCtCQUErQixDQUFDLENBQUE7QUFFOUU7O0dBRUc7QUFDSDtJQUFBO1FBSUUsWUFBTyxHQUFXLFFBQVEsQ0FBQztJQU03QixDQUFDO0lBQUQsb0JBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQUVEOztHQUVHO0FBQ0gsNkJBQTZCLENBQU0sQ0FBQyxpQkFBaUI7SUFDbkQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksb0JBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkUsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxFQUFDLG1CQUFtQixFQUFFLElBQUksRUFBQyxDQUFDO0lBQ3JDLENBQUM7QUFDSCxDQUFDO0FBRUQsSUFBTSwwQkFBMEIsR0FBa0Q7SUFDaEYsT0FBTyxFQUFFLHNCQUFhO0lBQ3RCLFFBQVEsRUFBRSxtQkFBbUI7SUFDN0IsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBQ0Y7SUFBQTtJQUtBLENBQUM7SUFKRCxrQkFBa0I7SUFDWCw4QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBRSxTQUFTLEVBQUUsQ0FBQywwQkFB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