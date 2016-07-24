/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EventEmitter } from '../../../src/facade/async';
export declare class MockEventEmitter<T> extends EventEmitter<T> {
    private _nextFns;
    constructor();
    subscribe(generator: any): any;
    emit(value: any): void;
}
