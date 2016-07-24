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
var validators_1 = require('../../validators');
var control_container_1 = require('../control_container');
var shared_1 = require('../shared');
exports.formArrayNameProvider = 
/*@ts2dart_const*/ /* @ts2dart_Provider */ {
    provide: control_container_1.ControlContainer,
    useExisting: core_1.forwardRef(function () { return FormArrayName; })
};
var FormArrayName = (function (_super) {
    __extends(FormArrayName, _super);
    function FormArrayName(parent, validators, asyncValidators) {
        _super.call(this);
        this._parent = parent;
        this._validators = validators;
        this._asyncValidators = asyncValidators;
    }
    FormArrayName.prototype.ngOnInit = function () { this.formDirective.addFormArray(this); };
    FormArrayName.prototype.ngOnDestroy = function () { this.formDirective.removeFormArray(this); };
    Object.defineProperty(FormArrayName.prototype, "control", {
        get: function () { return this.formDirective.getFormArray(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "formDirective", {
        get: function () { return this._parent.formDirective; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "path", {
        get: function () { return shared_1.controlPath(this.name, this._parent); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "validator", {
        get: function () { return shared_1.composeValidators(this._validators); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormArrayName.prototype, "asyncValidator", {
        get: function () { return shared_1.composeAsyncValidators(this._asyncValidators); },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    FormArrayName.decorators = [
        { type: core_1.Directive, args: [{ selector: '[formArrayName]', providers: [exports.formArrayNameProvider] },] },
    ];
    /** @nocollapse */
    FormArrayName.ctorParameters = [
        { type: control_container_1.ControlContainer, decorators: [{ type: core_1.Host }, { type: core_1.SkipSelf },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_VALIDATORS,] },] },
        { type: Array, decorators: [{ type: core_1.Optional }, { type: core_1.Self }, { type: core_1.Inject, args: [validators_1.NG_ASYNC_VALIDATORS,] },] },
    ];
    /** @nocollapse */
    FormArrayName.propDecorators = {
        'name': [{ type: core_1.Input, args: ['formArrayName',] },],
    };
    return FormArrayName;
}(control_container_1.ControlContainer));
exports.FormArrayName = FormArrayName;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9hcnJheV9uYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9mb3Jtcy9zcmMvZGlyZWN0aXZlcy9yZWFjdGl2ZV9kaXJlY3RpdmVzL2Zvcm1fYXJyYXlfbmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCxxQkFBc0csZUFBZSxDQUFDLENBQUE7QUFHdEgsMkJBQWlELGtCQUFrQixDQUFDLENBQUE7QUFDcEUsa0NBQStCLHNCQUFzQixDQUFDLENBQUE7QUFDdEQsdUJBQXFFLFdBQVcsQ0FBQyxDQUFBO0FBS3BFLDZCQUFxQjtBQUM5QixrQkFBa0IsQ0FBQyx1QkFBdUIsQ0FBQztJQUN6QyxPQUFPLEVBQUUsb0NBQWdCO0lBQ3pCLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxhQUFhLEVBQWIsQ0FBYSxDQUFDO0NBQzdDLENBQUM7QUFDTjtJQUFtQyxpQ0FBZ0I7SUFVakQsdUJBQWEsTUFBd0IsRUFBRSxVQUFpQixFQUFFLGVBQXNCO1FBQzlFLGlCQUFPLENBQUM7UUFDUixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZUFBZSxDQUFDO0lBQzFDLENBQUM7SUFFRCxnQ0FBUSxHQUFSLGNBQW1CLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUzRCxtQ0FBVyxHQUFYLGNBQXNCLElBQUksQ0FBQyxhQUFhLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVqRSxzQkFBSSxrQ0FBTzthQUFYLGNBQTJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRTFFLHNCQUFJLHdDQUFhO2FBQWpCLGNBQTBDLE1BQU0sQ0FBcUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVsRyxzQkFBSSwrQkFBSTthQUFSLGNBQXVCLE1BQU0sQ0FBQyxvQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFckUsc0JBQUksb0NBQVM7YUFBYixjQUErQixNQUFNLENBQUMsMEJBQWlCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFNUUsc0JBQUkseUNBQWM7YUFBbEIsY0FBeUMsTUFBTSxDQUFDLCtCQUFzQixDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDbEcsa0JBQWtCO0lBQ1gsd0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsQ0FBQyw2QkFBcUIsQ0FBQyxFQUFDLEVBQUcsRUFBRTtLQUMvRixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNEJBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsb0NBQWdCLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsV0FBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZUFBUSxFQUFFLEVBQUcsRUFBQztRQUM1RSxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBUSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBSSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLDBCQUFhLEVBQUcsRUFBRSxFQUFHLEVBQUM7UUFDNUcsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGVBQVEsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxnQ0FBbUIsRUFBRyxFQUFFLEVBQUcsRUFBQztLQUNqSCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsNEJBQWMsR0FBMkM7UUFDaEUsTUFBTSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsWUFBSyxFQUFFLElBQUksRUFBRSxDQUFDLGVBQWUsRUFBRyxFQUFFLEVBQUU7S0FDcEQsQ0FBQztJQUNGLG9CQUFDO0FBQUQsQ0FBQyxBQTVDRCxDQUFtQyxvQ0FBZ0IsR0E0Q2xEO0FBNUNZLHFCQUFhLGdCQTRDekIsQ0FBQSJ9