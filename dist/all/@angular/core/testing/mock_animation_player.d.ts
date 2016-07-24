/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationPlayer } from '../src/animation/animation_player';
export declare class MockAnimationPlayer implements AnimationPlayer {
    private _subscriptions;
    private _finished;
    private _destroyed;
    private _started;
    parentPlayer: AnimationPlayer;
    log: any[];
    private _onfinish();
    init(): void;
    onDone(fn: Function): void;
    hasStarted(): boolean;
    play(): void;
    pause(): void;
    restart(): void;
    finish(): void;
    reset(): void;
    destroy(): void;
    setPosition(p: any): void;
    getPosition(): number;
}
