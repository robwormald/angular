/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var collection_1 = require('../facade/collection');
var lang_1 = require('../facade/lang');
var model_1 = require('./model');
var FormBuilder = (function () {
    function FormBuilder() {
    }
    /**
     * Construct a new {@link ControlGroup} with the given map of configuration.
     * Valid keys for the `extra` parameter map are `optionals` and `validator`.
     *
     * See the {@link ControlGroup} constructor for more details.
     */
    FormBuilder.prototype.group = function (controlsConfig, extra) {
        if (extra === void 0) { extra = null; }
        var controls = this._reduceControls(controlsConfig);
        var optionals = (lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, 'optionals') : null);
        var validator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, 'validator') : null;
        var asyncValidator = lang_1.isPresent(extra) ? collection_1.StringMapWrapper.get(extra, 'asyncValidator') : null;
        return new model_1.ControlGroup(controls, optionals, validator, asyncValidator);
    };
    /**
     * Construct a new {@link Control} with the given `value`,`validator`, and `asyncValidator`.
     */
    FormBuilder.prototype.control = function (value, validator, asyncValidator) {
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        return new model_1.Control(value, validator, asyncValidator);
    };
    /**
     * Construct an array of {@link Control}s from the given `controlsConfig` array of
     * configuration, with the given optional `validator` and `asyncValidator`.
     */
    FormBuilder.prototype.array = function (controlsConfig, validator, asyncValidator) {
        var _this = this;
        if (validator === void 0) { validator = null; }
        if (asyncValidator === void 0) { asyncValidator = null; }
        var controls = controlsConfig.map(function (c) { return _this._createControl(c); });
        return new model_1.ControlArray(controls, validator, asyncValidator);
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
        if (controlConfig instanceof model_1.Control || controlConfig instanceof model_1.ControlGroup ||
            controlConfig instanceof model_1.ControlArray) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybV9idWlsZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vc3JjL2Zvcm1zLWRlcHJlY2F0ZWQvZm9ybV9idWlsZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBeUIsZUFBZSxDQUFDLENBQUE7QUFFekMsMkJBQStCLHNCQUFzQixDQUFDLENBQUE7QUFDdEQscUJBQWlDLGdCQUFnQixDQUFDLENBQUE7QUFHbEQsc0JBQW1FLFNBQVMsQ0FBQyxDQUFBO0FBQzdFO0lBQUE7SUFnRUEsQ0FBQztJQS9EQzs7Ozs7T0FLRztJQUNILDJCQUFLLEdBQUwsVUFBTSxjQUFvQyxFQUFFLEtBQWtDO1FBQWxDLHFCQUFrQyxHQUFsQyxZQUFrQztRQUM1RSxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BELElBQUksU0FBUyxHQUE2QixDQUN0QyxnQkFBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLDZCQUFnQixDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDeEUsSUFBSSxTQUFTLEdBQWdCLGdCQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsNkJBQWdCLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDaEcsSUFBSSxjQUFjLEdBQ2QsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyw2QkFBZ0IsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLGdCQUFnQixDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzVFLE1BQU0sQ0FBQyxJQUFJLG9CQUFZLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUM7SUFDMUUsQ0FBQztJQUNEOztPQUVHO0lBQ0gsNkJBQU8sR0FBUCxV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