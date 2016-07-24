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
var async_1 = require('../../facade/async');
var collection_1 = require('../../facade/collection');
var validators_1 = require('../../validators');
var control_value_accessor_1 = require('../control_value_accessor');
var ng_control_1 = require('../ng_control');
var shared_1 = require('../shared');
exports.formControlBinding = 
/*@ts2dart_const*/ /* @ts2dart_Provider */ {
    provide: ng_control_1.NgControl,
    useExisting: core_1.forwardRef(function () { return FormControlDirective; })
};
var FormControlDirective = (function (_super) {
    __extends(FormControlDirective, _super);
    function FormControlDirective(_validators, _asyncValidators, valueAccessors) {
        _super.call(this);
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        this.update = new async_1.EventEmitter();
        this.valueAccessor = shared_1.selectValueAccessor(this, valueAccessors);
    }
    FormControlDirective.prototype.ngOnChanges = function (changes) {
        if (this._isControlChanged(changes)) {
            shared_1.setUpControl(this.form, this);
            this.form.updateValueAndValidity({ emitEvent: false });
        }
        if (shared_1.isPropertyUpdated(changes, this.viewModel)) {
            this.form.updateValue(this.model);
            this.viewModel = this.model;
        }
    };
    Object.defineProperty(FormControlDirective.prototype, "path", {
        get: function () { return []; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlDirective.prototype, "validator", {
        get: function () { return shared_1.composeValidators(this._validators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlDirective.prototype, "asyncValidator", {
        get: function () {
            return shared_1.composeAsyncValidators(this._asyncValidators);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormControlDirective.prototype, "control", {
        get: function () { return this.form; },
        enumerable: true,
        configurable: true
    });
    FormControlDirective.prototype.viewToModelUpdate = function (newValue) {
        this.viewModel = newValue;
        async_1.ObservableWrapper.callEmit(this.update, newValue);
    };
    FormControlDirective.prototype._isControlChanged = function (changes) {
        return collection_1.StringMapWrapper.contains(changes, 'form');
    };
    /** @nocollapse */
    FormControlDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[formControl]', providers: [exports.formControlBinding], exportAs: 'ngForm' },] },
    ];
    /** @nocollapse */
    FormControlDirective.ctorParameters = [
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_ASYNC_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [control_value_accessor_1.NG_VALUE_ACCESSOR,] },] },
    ];
    /** @nocollapse */
    FormControlDirective.propDecorators = {
        'form': [{ type: core_1.Input, args: ['formControl',] },],
        'model': [{ type: core_1.Input, args: ['ngModel',] },],
        'update': [{ type: core_1.Output, args: ['ngModelChange',] },],
    };
    return FormControlDirective;
}(ng_control_1.NgControl));
exports.FormControlDirective = FormControlDirective;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9jb250cm9sX2RpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvZm9ybXMvc3JjL2RpcmVjdGl2ZXMvcmVhY3RpdmVfZGlyZWN0aXZlcy9mb3JtX2NvbnRyb2xfZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILHFCQUFxRyxlQUFlLENBQUMsQ0FBQTtBQUVySCxzQkFBOEMsb0JBQW9CLENBQUMsQ0FBQTtBQUNuRSwyQkFBK0IseUJBQXlCLENBQUMsQ0FBQTtBQUV6RCwyQkFBaUQsa0JBQWtCLENBQUMsQ0FBQTtBQUVwRSx1Q0FBc0QsMkJBQTJCLENBQUMsQ0FBQTtBQUNsRiwyQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsdUJBQThHLFdBQVcsQ0FBQyxDQUFBO0FBRzdHLDBCQUFrQjtBQUMzQixrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQztJQUN6QyxPQUFPLEVBQUUsc0JBQVM7SUFDbEIsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLG9CQUFvQixFQUFwQixDQUFvQixDQUFDO0NBQ3BELENBQUM7QUFFTjtJQUEwQyx3Q0FBUztJQUdqRCw4QkFBcUIsV0FDZ0MsRUFBVSxnQkFDVixFQUN6QyxjQUFzQztRQUNwQyxpQkFBTyxDQUFDO1FBSkQsZ0JBQVcsR0FBWCxXQUFXLENBQ3FCO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUMxQjtRQUpOLFdBQU0sR0FBRyxJQUFJLG9CQUFZLEVBQUUsQ0FBQztRQU83RCxJQUFJLENBQUMsYUFBYSxHQUFHLDRCQUFtQixDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsMENBQVcsR0FBWCxVQUFZLE9BQXNCO1FBQ2hDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFD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