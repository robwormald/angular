/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var collection_1 = require('./facade/collection');
var lang_1 = require('./facade/lang');
var model_1 = require('./model');
var FormBuilder = (function () {
    function FormBuilder() {
    }
    /**
     * Construct a new {@link FormGroup} with the given map of configuration.
     * Valid keys for the `extra` parameter map are `optionals` and `validator`.
     *
     * See the {@link FormGroup} constructor for more details.
     */
    FormBuilder.prototype.group = function (controlsConfig, extra) {
        if (extra === void 0) { extra = null; }
        var controls = this._reduceControls(controlsConfig);
        var optionals = (lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, 'optionals') : null);
        var validator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, 'validator') : null;
        var asyncValidator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, 'asyncValidator') : null;
        return new model_1.FormGroup(controls, optionals, validator, asyncValidator);
    };
    /**
     * Construct a new {@link FormControl} with the given `value`,`validator`, and `asyncValidator`.
     */
    FormBuilder.prototype.control = function (value, validator, asyncValidator) {
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        return new model_1.FormControl(value, validator, asyncValidator);
    };
    /**
     * Construct an array of {@link FormControl}s from the given `controlsConfig` array of
     * configuration, with the given optional `validator` and `asyncValidator`.
     */
    FormBuilder.prototype.array = function (controlsConfig, validator, asyncValidator) {
        var _this = this;
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        var controls = controlsConfig.map(function (c) { return _this._createControl(c); });
        return new model_1.FormArray(controls, validator, asyncValidator);
    };
    /** @internal */
    FormBuilder.prototype._reduceControls = function (controlsConfig) {
        var _this = this;
        var controls = {};
        collection_1.StringMapWrapper.forEach(controlsConfig, function (controlConfig, controlName) {
            controls[controlName] = _this._createControl(controlConfig);
        });
        return controls;
    };
    /** @internal */
    FormBuilder.prototype._createControl = function (controlConfig) {
        if (controlConfig instanceof model_1.FormControl || controlConfig instanceof model_1.FormGroup ||
            controlConfig instanceof model_1.FormArray) {
            return controlConfig;
        }
        else if (lang_1.isArray(controlConfig)) {
            var value = controlConfig[0];
            var validator = controlConfig.length > 1 ? controlConfig[1] : null;
            var asyncValidator = controlConfig.length > 2 ? controlConfig[2] : null;
            return this.control(value, validator, asyncValidator);
        }
        else {
            return this.control(controlConfig);
        }
    };
    /** @nocollapse */
    FormBuilder.decorators = [
        { type: core_1.Injectable },
    ];
    return FormBuilder;
}());
exports.FormBuilder = FormBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9mb3Jtcy9zcmMvZm9ybV9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFHekMsMkJBQStCLHFCQUFxQixDQUFDLENBQUE7QUFDckQscUJBQWlDLGVBQWUsQ0FBQyxDQUFBO0FBQ2pELHNCQUFpRSxTQUFTLENBQUMsQ0FBQTtBQUMzRTtJQUFBO0lBaUVBLENBQUM7SUFoRUM7Ozs7O09BS0c7SUFDSCwyQkFBSyxHQUFMLFVBQU0sY0FBb0MsRUFBRSxLQUFrQztRQUFsQyxxQkFBa0MsR0FBbEMsWUFBa0M7UUFDNUUsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUNwRCxJQUFJLFNBQVMsR0FBNkIsQ0FDdEMsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyw2QkFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ3hFLElBQUksU0FBUyxHQUFnQixnQkFBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLDZCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ2hHLElBQUksY0FBYyxHQUNkLGdCQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsNkJBQWdCLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxnQkFBZ0IsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUM1RSxNQUFNLENBQUMsSUFBSSxpQkFBUyxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUFDRDs7T0FFRztJQUNILDZCQUFPLEdBQVAsVUFDSSxLQUFhLEVBQUUsU0FBMkMsRUFDMUQsY0FBMEQ7UUFEM0MseUJBQTJDLEdBQTNDLGdCQUEyQztRQUMxRCw4QkFBMEQsR0FBMUQscUJBQTBEO1FBQzVELE1BQU0sQ0FBQyxJQUFJLG1CQUFXLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUMzRCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsMkJBQUssR0FBTCxVQUNJLGNBQXFCLEVBQUUsU0FBNkIsRUFDcEQsY0FBdUM7UUFGM0MsaUJBS0M7UUFKMEIseUJBQTZCLEdBQTdCLGdCQUE2QjtRQUNwRCw4QkFBdUMsR0FBdkMscUJBQXVDO1FBQ3pDLElBQUksUUFBUSxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxLQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUF0QixDQUFzQixDQUFDLENBQUM7UUFDL0QsTUFBTSxDQUFDLElBQUksaUJBQVMsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIscUNBQWUsR0FBZixVQUFnQixjQUFrQztRQUFsRCxpQkFNQztRQUxDLElBQUksUUFBUSxHQUFxQyxFQUFFLENBQUM7UUFDcEQsNkJBQWdCLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxVQUFDLGFBQWtCLEVBQUUsV0FBbUI7WUFDL0UsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQ2xCLENBQUM7SUFFRCxnQkFBZ0I7SUFDaEIsb0NBQWMsR0FBZCxVQUFlLGFBQWtCO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLGFBQWEsWUFBWSxtQkFBVyxJQUFJLGFBQWEsWUFBWSxpQkFBUztZQUMxRSxhQUFhLFlBQVksaUJBQVMsQ0FBQyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUV2QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksU0FBUyxHQUFnQixhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQ2hGLElBQUksY0FBYyxHQUFxQixhQUFhLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzFGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFFeEQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckMsQ0FBQztJQUNILENBQUM7SUFDSCxrQkFBa0I7SUFDWCxzQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBQztBQUFELENBQUMsQUFqRUQsSUFpRUM7QUFqRVksbUJBQVcsY0FpRXZCLENBQUEifQ==