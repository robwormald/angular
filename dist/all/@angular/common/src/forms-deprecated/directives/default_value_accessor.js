/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../../facade/lang');
var control_value_accessor_1 = require('./control_value_accessor');
exports.DEFAULT_VALUE_ACCESSOR = 
/* @ts2dart_Provider */ {
    provide: control_value_accessor_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DefaultValueAccessor; }),
    multi: true
};
var DefaultValueAccessor = (function () {
    function DefaultValueAccessor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this.onChange = function (_) { };
        this.onTouched = function () { };
    }
    DefaultValueAccessor.prototype.writeValue = function (value) {
        var normalizedValue = lang_1.isBlank(value) ? '' : value;
        this._renderer.setElementProperty(this._elementRef.nativeElement, 'value', normalizedValue);
    };
    DefaultValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    DefaultValueAccessor.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
    /** @nocollapse */
    DefaultValueAccessor.decorators = [
        { type: core_1.Directive, args: [{
                    selector: 'input:not([type=checkbox])[ngControl],textarea[ngControl],input:not([type=checkbox])[ngFormControl],textarea[ngFormControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]',
                    // TODO: vsavkin replace the above selector with the one below it once
                    // https://github.com/angular/angular/issues/3011 is implemented
                    // selector: '[ngControl],[ngModel],[ngFormControl]',
                    host: { '(input)': 'onChange($event.target.value)', '(blur)': 'onTouched()' },
                    providers: [exports.DEFAULT_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DefaultValueAccessor.ctorParameters = [
        { type: core_1.Renderer, },
        { type: core_1.ElementRef, },
    ];
    return DefaultValueAccessor;
}());
exports.DefaultValueAccessor = DefaultValueAccessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdF92YWx1ZV9hY2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3NyYy9mb3Jtcy1kZXByZWNhdGVkL2RpcmVjdGl2ZXMvZGVmYXVsdF92YWx1ZV9hY2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQTBELGVBQWUsQ0FBQyxDQUFBO0FBRTFFLHFCQUFzQixtQkFBbUIsQ0FBQyxDQUFBO0FBRTFDLHVDQUFzRCwwQkFBMEIsQ0FBQyxDQUFBO0FBRXBFLDhCQUFzQjtBQUMvQix1QkFBdUIsQ0FBQztJQUN0QixPQUFPLEVBQUUsMENBQWlCO0lBQzFCLFdBQVcsRUFBRSxpQkFBVSxDQUFDLGNBQU0sT0FBQSxvQkFBb0IsRUFBcEIsQ0FBb0IsQ0FBQztJQUNuRCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFDTjtJQUlFLDhCQUFvQixTQUFtQixFQUFVLFdBQXVCO1FBQXBELGNBQVMsR0FBVCxTQUFTLENBQVU7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUh4RSxhQUFRLEdBQUcsVUFBQyxDQUFNLElBQU0sQ0FBQyxDQUFDO1FBQzFCLGNBQVMsR0FBRyxjQUFPLENBQUMsQ0FBQztJQUVzRCxDQUFDO0lBRTVFLHlDQUFVLEdBQVYsVUFBVyxLQUFVO1FBQ25CLElBQUksZUFBZSxHQUFHLGNBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCwrQ0FBZ0IsR0FBaEIsVUFBaUIsRUFBb0IsSUFBVSxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEUsZ0RBQWlCLEdBQWpCLFVBQWtCLEVBQWMsSUFBVSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbEUsa0JBQWtCO0lBQ1gsK0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUNKLHNNQUFzTTtvQkFDMU0sc0VBQXNFO29CQUN0RSxnRUFBZ0U7b0JBQ2hFLHFEQUFxRDtvQkFDckQsSUFBSSxFQUFFLEVBQUMsU0FBUyxFQUFFLCtCQUErQixFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUM7b0JBQzNFLFNBQVMsRUFBRSxDQUFDLDhCQUFzQixDQUFDO2lCQUNwQyxFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsbUNBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsZUFBUSxHQUFHO1FBQ2xCLEVBQUMsSUFBSSxFQUFFLGlCQUFVLEdBQUc7S0FDbkIsQ0FBQztJQUNGLDJCQUFDO0FBQUQsQ0FBQyxBQTlCRCxJQThCQztBQTlCWSw0QkFBb0IsdUJBOEJoQyxDQUFBIn0=