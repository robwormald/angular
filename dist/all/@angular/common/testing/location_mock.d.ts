/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { EventEmitter } from '@angular/core';
import { Location } from '../index';
import { LocationStrategy } from '../src/location/location_strategy';
/**
 * A spy for {@link Location} that allows tests to fire simulated location events.
 *
 * @experimental
 */
export declare class SpyLocation implements Location {
    urlChanges: string[];
    /** @internal */
    private _history;
    /** @internal */
    private _historyIndex;
    /** @internal */
    _subject: EventEmitter<any>;
    /** @internal */
    _baseHref: string;
    /** @internal */
    _platformStrategy: LocationStrategy;
    setInitialPath(url: string): void;
    setBaseHref(url: string): void;
    path(): string;
    isCurrentPathEqualTo(path: string, query?: string): boolean;
    simulateUrlPop(pathname: string): void;
    simulateHashChange(pathname: string): void;
    prepareExternalUrl(url: string): string;
    go(path: string, query?: string): void;
    replaceState(path: string, query?: string): void;
    forward(): void;
    back(): void;
    subscribe(onNext: (value: any) => void, onThrow?: (error: any) => void, onReturn?: () => void): Object;
    normalize(url: string): string;
}
