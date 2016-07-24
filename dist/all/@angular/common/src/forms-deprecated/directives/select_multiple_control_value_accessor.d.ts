/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementRef, OnDestroy, Renderer } from '@angular/core';
import { ControlValueAccessor } from './control_value_accessor';
/**
 * The accessor for writing a value and listening to changes on a select element.
 */
export declare class SelectMultipleControlValueAccessor implements ControlValueAccessor {
    value: any;
    /** @internal */
    _optionMap: Map<string, NgSelectMultipleOption>;
    /** @internal */
    _idCounter: number;
    onChange: (_: any) => void;
    onTouched: () => void;
    constructor();
    writeValue(value: any): void;
    registerOnChange(fn: (value: any) => any): void;
    registerOnTouched(fn: () => any): void;
    /** @internal */
    _registerOption(value: NgSelectMultipleOption): string;
    /** @internal */
    _getOptionId(value: any): string;
    /** @internal */
    _getOptionValue(valueString: string): any;
}
/**
 * Marks `<option>` as dynamic, so Angular can be notified when options change.
 *
 * ### Example
 *
 * ```
 * <select multiple ngControl="city">
 *   <option *ngFor="let c of cities" [value]="c"></option>
 * </select>
 * ```
 */
export declare class NgSelectMultipleOption implements OnDestroy {
    private _element;
    private _renderer;
    private _select;
    id: string;
    /** @internal */
    _value: any;
    constructor(_element: ElementRef, _renderer: Renderer, _select: SelectMultipleControlValueAccessor);
    ngValue: any;
    value: any;
    /** @internal */
    _setElementValue(value: string): void;
    /** @internal */
    _setSelected(selected: boolean): void;
    ngOnDestroy(): void;
}
export declare const SELECT_DIRECTIVES: (typeof SelectMultipleControlValueAccessor | typeof NgSelectMultipleOption)[];
