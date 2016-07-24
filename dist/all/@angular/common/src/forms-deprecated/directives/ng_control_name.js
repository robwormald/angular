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
var validators_1 = require('../validators');
var control_container_1 = require('./control_container');
var control_value_accessor_1 = require('./control_value_accessor');
var ng_control_1 = require('./ng_control');
var shared_1 = require('./shared');
exports.controlNameBinding = 
/*@ts2dart_const*/ /* @ts2dart_Provider */ {
    provide: ng_control_1.NgControl,
    useExisting: core_1.forwardRef(function () { return NgControlName; })
};
var NgControlName = (function (_super) {
    __extends(NgControlName, _super);
    function NgControlName(_parent, _validators, _asyncValidators, valueAccessors) {
        _super.call(this);
        this._parent = _parent;
        this._validators = _validators;
        this._asyncValidators = _asyncValidators;
        /** @internal */
        this.update = new async_1.EventEmitter();
        this._added = false;
        this.valueAccessor = shared_1.selectValueAccessor(this, valueAccessors);
    }
    NgControlName.prototype.ngOnChanges = function (changes) {
        if (!this._added) {
            this.formDirective.addControl(this);
            this._added = true;
        }
        if (shared_1.isPropertyUpdated(changes, this.viewModel)) {
            this.viewModel = this.model;
            this.formDirective.updateModel(this, this.model);
        }
    };
    NgControlName.prototype.ngOnDestroy = function () { this.formDirective.removeControl(this); };
    NgControlName.prototype.viewToModelUpdate = function (newValue) {
        this.viewModel = newValue;
        async_1.ObservableWrapper.callEmit(this.update, newValue);
    };
    Object.defineProperty(NgControlName.prototype, "path", {
        get: function () { return shared_1.controlPath(this.name, this._parent); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgControlName.prototype, "formDirective", {
        get: function () { return this._parent.formDirective; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgControlName.prototype, "validator", {
        get: function () { return shared_1.composeValidators(this._validators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgControlName.prototype, "asyncValidator", {
        get: function () {
            return shared_1.composeAsyncValidators(this._asyncValidators);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgControlName.prototype, "control", {
        get: function () { return this.formDirective.getControl(this); },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    NgControlName.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[ngControl]',
                    providers: [exports.controlNameBinding],
                    inputs: ['name: ngControl', 'model: ngModel'],
                    outputs: ['update: ngModelChange'],
                    exportAs: 'ngForm'
                },] },
    ];
    /** @nocollapse */
    NgControlName.ctorParameters = [
        { type: control_container_1.ControlContainer, decorators: [{ type: core_1.Host }, { type: core_1.SkipSelf },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_ASYNC_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [control_value_accessor_1.NG_VALUE_ACCESSOR,] },] },
    ];
    return NgControlName;
}(ng_control_1.NgControl));
exports.NgControlName = NgControlName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfY29udHJvbF9uYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vc3JjL2Zvcm1zLWRlcHJlY2F0ZWQvZGlyZWN0aXZlcy9uZ19jb250cm9sX25hbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgscUJBQWlILGVBQWUsQ0FBQyxDQUFBO0FBRWpJLHNCQUE4QyxvQkFBb0IsQ0FBQyxDQUFBO0FBRW5FLDJCQUFpRCxlQUFlLENBQUMsQ0FBQTtBQUVqRSxrQ0FBK0IscUJBQXFCLENBQUMsQ0FBQTtBQUNyRCx1Q0FBc0QsMEJBQTBCLENBQUMsQ0FBQTtBQUNqRiwyQkFBd0IsY0FBYyxDQUFDLENBQUE7QUFDdkMsdUJBQTZHLFVBQVUsQ0FBQyxDQUFBO0FBSTNHLDBCQUFrQjtBQUMzQixrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQztJQUN6QyxPQUFPLEVBQUUsc0JBQVM7SUFDbEIsV0FBVyxFQUFFLGlCQUFVLENBQUMsY0FBTSxPQUFBLGFBQWEsRUFBYixDQUFhLENBQUM7Q0FDN0MsQ0FBQztBQUNOO0lBQW1DLGlDQUFTO0lBUTFDLHVCQUFxQixPQUF5QixFQUFVLFdBQ0gsRUFBVSxnQkFDVixFQUN6QyxjQUFzQztRQUNwQyxpQkFBTyxDQUFDO1FBSkQsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FDZDtRQUFVLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FDMUI7UUFSckQsZ0JBQWdCO1FBQ2hCLFdBQU0sR0FBRyxJQUFJLG9CQUFZLEVBQUUsQ0FBQztRQUdwQixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBT1QsSUFBSSxDQUFDLGFBQWEsR0FBRyw0QkFBbUIsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUVELG1DQUFXLEdBQVgsVUFBWSxPQUFzQjtRQUNoQyxFQUFF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