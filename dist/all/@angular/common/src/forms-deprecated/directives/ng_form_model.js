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
var exceptions_1 = require('../../facade/exceptions');
var lang_1 = require('../../facade/lang');
var validators_1 = require('../validators');
var control_container_1 = require('./control_container');
var shared_1 = require('./shared');
exports.formDirectiveProvider = 
/*@ts2dart_const*/ /* @ts2dart_Provider */ {
    provide: control_container_1.ControlContainer,
    useExisting: core_1.forwardRef(function () { return NgFormModel; })
};
var _formModelWarningDisplayed = false;
var NgFormModel = (function (_super) {
    __extends(NgFormModel, _super);
    function NgFormModel(_validators, _asyncValidators) {
        _super.call(this);
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        this._submitted = false;
        this.form = null;
        this.directives = [];
        this.ngSubmit = new async_1.EventEmitter();
        this._displayWarning();
    }
    NgFormModel.prototype._displayWarning = function () {
        // TODO(kara): Update this when the new forms module becomes the default
        if (!_formModelWarningDisplayed) {
            _formModelWarningDisplayed = true;
            console.warn("\n      *It looks like you're using the old forms module. This will be opt-in in the next RC, and\n      will eventually be removed in favor of the new forms module. For more information, see:\n      https://docs.google.com/document/u/1/d/1RIezQqE4aEhBRmArIAS1mRIZtWFf6JxN_7B4meyWK0Y/pub\n    ");
        }
    };
    NgFormModel.prototype.ngOnChanges = function (changes) {
        this._checkFormPresent();
        if (collection_1.StringMapWrapper.contains(changes, 'form')) {
            var sync = shared_1.composeValidators(this._validators);
            this.form.validator = validators_1.Validators.compose([this.form.validator, sync]);
            var async = shared_1.composeAsyncValidators(this._asyncValidators);
            this.form.asyncValidator = validators_1.Validators.composeAsync([this.form.asyncValidator, async]);
            this.form.updateValueAndValidity({ onlySelf: true, emitEvent: false });
        }
        this._updateDomValue();
    };
    Object.defineProperty(NgFormModel.prototype, "submitted", {
        get: function () { return this._submitted; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgFormModel.prototype, "formDirective", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgFormModel.prototype, "control", {
        get: function () { return this.form; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgFormModel.prototype, "path", {
        get: function () { return []; },
        enumerable: true,
        configurable: true
    });
    NgFormModel.prototype.addControl = function (dir) {
        var ctrl = this.form.find(dir.path);
        shared_1.setUpControl(ctrl, dir);
        ctrl.updateValueAndValidity({ emitEvent: false });
        this.directives.push(dir);
    };
    NgFormModel.prototype.getControl = function (dir) { return this.form.find(dir.path); };
    NgFormModel.prototype.removeControl = function (dir) { collection_1.ListWrapper.remove(this.directives, dir); };
    NgFormModel.prototype.addControlGroup = function (dir) {
        var ctrl = this.form.find(dir.path);
        shared_1.setUpControlGroup(ctrl, dir);
        ctrl.updateValueAndValidity({ emitEvent: false });
    };
    NgFormModel.prototype.removeControlGroup = function (dir) { };
    NgFormModel.prototype.getControlGroup = function (dir) {
        return this.form.find(dir.path);
    };
    NgFormModel.prototype.updateModel = function (dir, value) {
        var ctrl = this.form.find(dir.path);
        ctrl.updateValue(value);
    };
    NgFormModel.prototype.onSubmit = function () {
        this._submitted = true;
        async_1.ObservableWrapper.callEmit(this.ngSubmit, null);
        return false;
    };
    /** @internal */
    NgFormModel.prototype._updateDomValue = function () {
        var _this = this;
        this.directives.forEach(function (dir) {
            var ctrl = _this.form.find(dir.path);
            dir.valueAccessor.writeValue(ctrl.value);
        });
    };
    NgFormModel.prototype._checkFormPresent = function () {
        if (lang_1.isBlank(this.form)) {
            throw new exceptions_1.BaseException("ngFormModel expects a form. Please pass one in. Example: <form [ngFormModel]=\"myCoolForm\">");
        }
    };
    /** @nocollapse */
    NgFormModel.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[ngFormModel]',
                    providers: [exports.formDirectiveProvider],
                    inputs: ['form: ngFormModel'],
                    host: { '(submit)': 'onSubmit()' },
                    outputs: ['ngSubmit'],
                    exportAs: 'ngForm'
                },] },
    ];
    /** @nocollapse */
    NgFormModel.ctorParameters = [
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_ASYNC_VALIDATORS,] },] },
    ];
    return NgFormModel;
}(control_container_1.ControlContainer));
exports.NgFormModel = NgFormModel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfZm9ybV9tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3NyYy9mb3Jtcy1kZXByZWNhdGVkL2RpcmVjdGl2ZXMvbmdfZm9ybV9tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCxxQkFBc0YsZUFBZSxDQUFDLENBQUE7QUFFdEcsc0JBQThDLG9CQUFvQixDQUFDLENBQUE7QUFDbkUsMkJBQTRDLHlCQUF5QixDQUFDLENBQUE7QUFDdEUsMkJBQTRCLHlCQUF5QixDQUFDLENBQUE7QUFDdEQscUJBQXNCLG1CQUFtQixDQUFDLENBQUE7QUFFMUMsMkJBQTZELGVBQWUsQ0FBQyxDQUFBO0FBRTdFLGtDQUErQixxQkFBcUIsQ0FBQyxDQUFBO0FBSXJELHVCQUF5RixVQUFVLENBQUMsQ0FBQTtBQUV2Riw2QkFBcUI7QUFDOUIsa0JBQWtCLENBQUMsdUJBQXVCLENBQUM7SUFDekMsT0FBTyxFQUFFLG9DQUFnQjtJQUN6QixXQUFXLEVBQUUsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsV0FBVyxFQUFYLENBQVcsQ0FBQztDQUMzQyxDQUFDO0FBRU4sSUFBSSwwQkFBMEIsR0FBWSxLQUFLLENBQUM7QUFDaEQ7SUFBaUMsK0JBQWdCO0lBUS9DLHFCQUFxQixXQUFrQixFQUFVLGdCQUF1QjtRQUN0RSxpQkFBTyxDQUFDO1FBRFcsZ0JBQVcsR0FBWCxXQUFXLENBQU87UUFBVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQU87UUFOaEUsZUFBVSxHQUFZLEtBQUssQ0FBQztRQUVwQyxTQUFJLEdBQWlCLElBQUksQ0FBQztRQUMxQixlQUFVLEdBQWdCLEVBQUUsQ0FBQztRQUM3QixhQUFRLEdBQUcsSUFBSSxvQkFBWSxFQUFFLENBQUM7UUFJNUIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pCLENBQUM7SUFFTyxxQ0FBZSxH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