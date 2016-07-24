/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { DomAnimatePlayer } from '../src/dom/dom_animate_player';
export declare class MockDomAnimatePlayer implements DomAnimatePlayer {
    captures: {
        [key: string]: any[];
    };
    private _position;
    private _onfinish;
    currentTime: number;
    /** @internal */
    _capture(method: string, data: any): void;
    cancel(): void;
    play(): void;
    pause(): void;
    finish(): void;
    onfinish: Function;
    position: number;
}
