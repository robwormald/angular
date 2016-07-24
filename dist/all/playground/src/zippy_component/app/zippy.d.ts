/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EventEmitter } from '@angular/core';
export declare class Zippy {
    visible: boolean;
    title: string;
    open: EventEmitter<any>;
    close: EventEmitter<any>;
    toggle(): void;
}
