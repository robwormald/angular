/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var common_1 = require('@angular/common');
var core_1 = require('@angular/core');
var lang_1 = require('@angular/core/src/facade/lang');
/**
 * Custom validator.
 */
function creditCardValidator(c) {
    if (lang_1.isPresent(c.value) && lang_1.RegExpWrapper.test(/^\d{16}$/g, c.value)) {
        return null;
    }
    else {
        return { "invalidCreditCard": true };
    }
}
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
        { type: common_1.NgFormModel, decorators: [{ type: core_1.Host },] },
    ];
    return ShowError;
}());
var ModelDrivenForms = (function () {
    function ModelDrivenForms(fb) {
        this.countries = ['US', 'Canada'];
        this.form = fb.group({
            "firstName": ["", common_1.Validators.required],
            "middleName": [""],
            "lastName": ["", common_1.Validators.required],
            "country": ["Canada", common_1.Validators.required],
            "creditCard": ["", common_1.Validators.compose([common_1.Validators.required, creditCardValidator])],
            "amount": [0, common_1.Validators.required],
            "email": ["", common_1.Validators.required],
            "comments": [""]
        });
    }
    ModelDrivenForms.prototype.onSubmit = function () {
        lang_1.print("Submitting:");
        lang_1.print(this.form.value);
    };
    /** @nocollapse */
    ModelDrivenForms.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'model-driven-forms',
                    viewProviders: [common_1.FormBuilder],
                    template: "\n    <h1>Checkout Form (Model Driven)</h1>\n\n    <form (ngSubmit)=\"onSubmit()\" [ngFormModel]=\"form\" #f=\"ngForm\">\n      <p>\n        <label for=\"firstName\">First Name</label>\n        <input type=\"text\" id=\"firstName\" ngControl=\"firstName\">\n        <show-error control=\"firstName\" [errors]=\"['required']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"middleName\">Middle Name</label>\n        <input type=\"text\" id=\"middleName\" ngControl=\"middleName\">\n      </p>\n\n      <p>\n        <label for=\"lastName\">Last Name</label>\n        <input type=\"text\" id=\"lastName\" ngControl=\"lastName\">\n        <show-error control=\"lastName\" [errors]=\"['required']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"country\">Country</label>\n        <select id=\"country\" ngControl=\"country\">\n          <option *ngFor=\"let c of countries\" [value]=\"c\">{{c}}</option>\n        </select>\n      </p>\n\n      <p>\n        <label for=\"creditCard\">Credit Card</label>\n        <input type=\"text\" id=\"creditCard\" ngControl=\"creditCard\">\n        <show-error control=\"creditCard\" [errors]=\"['required', 'invalidCreditCard']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"amount\">Amount</label>\n        <input type=\"number\" id=\"amount\" ngControl=\"amount\">\n        <show-error control=\"amount\" [errors]=\"['required']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"email\">Email</label>\n        <input type=\"email\" id=\"email\" ngControl=\"email\">\n        <show-error control=\"email\" [errors]=\"['required']\"></show-error>\n      </p>\n\n      <p>\n        <label for=\"comments\">Comments</label>\n        <textarea id=\"comments\" ngControl=\"comments\">\n        </textarea>\n      </p>\n\n      <button type=\"submit\" [disabled]=\"!f.form.valid\">Submit</button>\n    </form>\n  ",
                    directives: [common_1.FORM_DIRECTIVES, common_1.NgFor, ShowError]
                },] },
    ];
    /** @nocollapse */
    ModelDrivenForms.ctorParameters = [
        { type: common_1.FormBuilder, },
    ];
    return ModelDrivenForms;
}());
function main() {
    platform_browser_dynamic_1.bootstrap(ModelDrivenForms);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL3BsYXlncm91bmQvc3JjL21vZGVsX2RyaXZlbl9mb3Jtcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgseUNBQXdCLG1DQUFtQyxDQUFDLENBQUE7QUFDNUQsdUJBUU8saUJBQWlCLENBQUMsQ0FBQTtBQUN6QixxQkFBeUMsZUFBZSxDQUFDLENBQUE7QUFFekQscUJBQThDLCtCQUErQixDQUFDLENBQUE7QUFHOUU7O0dBRUc7QUFDSCw2QkFBNkIsQ0FBa0I7SUFDN0MsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksb0JBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbkUsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFBQyxJQUFJLENBQUMsQ0FBQztRQUNOLE1BQU0sQ0FBQyxFQUFDLG1CQUFtQixFQUFFLElBQUksRUFBQyxDQUFDO0lBQ3JDLENBQUM7QUFDSCxDQUFDO0FBQ0Q7SUFLRSxtQkFBYSxPQUFvQjtRQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQUMsQ0FBQztJQUU5RCxzQkFBSSxtQ0FBWTthQUFoQjtZQUNFLElBQUksSUFBSSxHQUFpQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUMzQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMxQyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMxQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFH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