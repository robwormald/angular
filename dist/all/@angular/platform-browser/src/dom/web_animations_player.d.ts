import { AnimationPlayer } from '../../core_private';
import { DomAnimatePlayer } from './dom_animate_player';
export declare class WebAnimationsPlayer implements AnimationPlayer {
    element: any;
    keyframes: {
        [key: string]: string | number;
    }[];
    options: {
        [key: string]: string | number;
    };
    private _subscriptions;
    private _finished;
    private _initialized;
    private _player;
    private _started;
    private _duration;
    parentPlayer: AnimationPlayer;
    constructor(element: any, keyframes: {
        [key: string]: string | number;
    }[], options: {
        [key: string]: string | number;
    });
    private _onFinish();
    init(): void;
    /** @internal */
    _triggerWebAnimation(element: any, keyframes: any[], options: any): DomAnimatePlayer;
    onDone(fn: Function): void;
    play(): void;
    pause(): void;
    finish(): void;
    reset(): void;
    restart(): void;
    hasStarted(): boolean;
    destroy(): void;
    readonly totalTime: number;
    setPosition(p: number): void;
    getPosition(): number;
}
