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
var validators_1 = require('../validators');
var control_value_accessor_1 = require('./control_value_accessor');
var ng_control_1 = require('./ng_control');
var shared_1 = require('./shared');
exports.formControlBinding = 
/*@ts2dart_const*/ /* @ts2dart_Provider */ {
    provide: ng_control_1.NgControl,
    useExisting: core_1.forwardRef(function () { return NgFormControl; })
};
var NgFormControl = (function (_super) {
    __extends(NgFormControl, _super);
    function NgFormControl(_validators, _asyncValidators, valueAccessors) {
        _super.call(this);
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        this.update = new async_1.EventEmitter();
        this.valueAccessor = shared_1.selectValueAccessor(this, valueAccessors);
    }
    NgFormControl.prototype.ngOnChanges = function (changes) {
        if (this._isControlChanged(changes)) {
            shared_1.setUpControl(this.form, this);
            this.form.updateValueAndValidity({ emitEvent: false });
        }
        if (shared_1.isPropertyUpdated(changes, this.viewModel)) {
            this.form.updateValue(this.model);
            this.viewModel = this.model;
        }
    };
    Object.defineProperty(NgFormControl.prototype, "path", {
        get: function () { return []; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgFormControl.prototype, "validator", {
        get: function () { return shared_1.composeValidators(this._validators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgFormControl.prototype, "asyncValidator", {
        get: function () {
            return shared_1.composeAsyncValidators(this._asyncValidators);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgFormControl.prototype, "control", {
        get: function () { return this.form; },
        enumerable: true,
        configurable: true
    });
    NgFormControl.prototype.viewToModelUpdate = function (newValue) {
        this.viewModel = newValue;
        async_1.ObservableWrapper.callEmit(this.update, newValue);
    };
    NgFormControl.prototype._isControlChanged = function (changes) {
        return collection_1.StringMapWrapper.contains(changes, 'form');
    };
    /** @nocollapse */
    NgFormControl.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[ngFormControl]',
                    providers: [exports.formControlBinding],
                    inputs: ['form: ngFormControl', 'model: ngModel'],
                    outputs: ['update: ngModelChange'],
                    exportAs: 'ngForm'
                },] },
    ];
    /** @nocollapse */
    NgFormControl.ctorParameters = [
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_ASYNC_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [control_value_accessor_1.NG_VALUE_ACCESSOR,] },] },
    ];
    return NgFormControl;
}(ng_control_1.NgControl));
exports.NgFormControl = NgFormControl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfZm9ybV9jb250cm9sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vc3JjL2Zvcm1zLWRlcHJlY2F0ZWQvZGlyZWN0aXZlcy9uZ19mb3JtX2NvbnRyb2wudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgscUJBQXNGLGVBQWUsQ0FBQyxDQUFBO0FBRXRHLHNCQUE4QyxvQkFBb0IsQ0FBQyxDQUFBO0FBQ25FLDJCQUErQix5QkFBeUIsQ0FBQyxDQUFBO0FBRXpELDJCQUFpRCxlQUFlLENBQUMsQ0FBQTtBQUVqRSx1Q0FBc0QsMEJBQTBCLENBQUMsQ0FBQTtBQUNqRiwyQkFBd0IsY0FBYyxDQUFDLENBQUE7QUFDdkMsdUJBQThHLFVBQVUsQ0FBQyxDQUFBO0FBRzVHLDBCQUFrQjtBQUMzQixrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQztJQUN6QyxPQUFPLEVBQUUsc0JBQVM7SUFDbEIsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLGFBQWEsRUFBYixDQUFhLENBQUM7Q0FDN0MsQ0FBQztBQUNOO0lBQW1DLGlDQUFTO0lBTTFDLHVCQUFxQixXQUNnQyxFQUFVLGdCQUNWLEVBQ3pDLGNBQXNDO1FBQ3BDLGlCQUFPLENBQUM7UUFKRCxnQkFBVyxHQUFYLFdBQVcsQ0FDcUI7UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQzFCO1FBTnJELFdBQU0sR0FBRyxJQUFJLG9CQUFZLEVBQUUsQ0FBQztRQVNkLElBQUksQ0FBQyxhQUFhLEdBQUcsNEJBQW1CLENBQUMsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxtQ0FBVyxHQUFYLFVBQVksT0FBc0I7UUFDaEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQyxxQkFBWSxDQUFD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