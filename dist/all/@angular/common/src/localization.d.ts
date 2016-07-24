/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @experimental
 */
export declare abstract class NgLocalization {
    abstract getPluralCategory(value: any): string;
}
/**
 * Returns the plural category for a given value.
 * - "=value" when the case exists,
 * - the plural category otherwise
 *
 * @internal
 */
export declare function getPluralCategory(value: number, cases: string[], ngLocalization: NgLocalization): string;
