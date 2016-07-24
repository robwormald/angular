/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgZone } from '@angular/core/src/zone/ng_zone';
import { ClientMessageBroker, ClientMessageBrokerFactory_ } from '@angular/platform-browser/src/web_workers/shared/client_message_broker';
import { MessageBus, MessageBusSink, MessageBusSource } from '@angular/platform-browser/src/web_workers/shared/message_bus';
import { SpyMessageBroker } from '../worker/spies';
import { MockEventEmitter } from './mock_event_emitter';
/**
 * Returns two MessageBus instances that are attached to each other.
 * Such that whatever goes into one's sink comes out the others source.
 */
export declare function createPairedMessageBuses(): PairedMessageBuses;
/**
 * Spies on the given {@link SpyMessageBroker} and expects a call with the given methodName
 * andvalues.
 * If a handler is provided it will be called to handle the request.
 * Only intended to be called on a given broker instance once.
 */
export declare function expectBrokerCall(broker: SpyMessageBroker, methodName: string, vals?: Array<any>, handler?: (..._: any[]) => Promise<any> | void): void;
export declare class PairedMessageBuses {
    ui: MessageBus;
    worker: MessageBus;
    constructor(ui: MessageBus, worker: MessageBus);
}
export declare class MockMessageBusSource implements MessageBusSource {
    private _channels;
    constructor(_channels: {
        [key: string]: MockEventEmitter<any>;
    });
    initChannel(channel: string, runInZone?: boolean): void;
    from(channel: string): MockEventEmitter<any>;
    attachToZone(zone: NgZone): void;
}
export declare class MockMessageBusSink implements MessageBusSink {
    private _channels;
    constructor(_channels: {
        [key: string]: MockEventEmitter<any>;
    });
    initChannel(channel: string, runInZone?: boolean): void;
    to(channel: string): MockEventEmitter<any>;
    attachToZone(zone: NgZone): void;
}
/**
 * Mock implementation of the {@link MessageBus} for tests.
 * Runs syncronously, and does not support running within the zone.
 */
export declare class MockMessageBus extends MessageBus {
    sink: MockMessageBusSink;
    source: MockMessageBusSource;
    constructor(sink: MockMessageBusSink, source: MockMessageBusSource);
    initChannel(channel: string, runInZone?: boolean): void;
    to(channel: string): MockEventEmitter<any>;
    from(channel: string): MockEventEmitter<any>;
    attachToZone(zone: NgZone): void;
}
export declare class MockMessageBrokerFactory extends ClientMessageBrokerFactory_ {
    private _messageBroker;
    constructor(_messageBroker: ClientMessageBroker);
    createMessageBroker(channel: string, runInZone?: boolean): ClientMessageBroker;
}
