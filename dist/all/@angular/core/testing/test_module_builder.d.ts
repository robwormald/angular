/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injector, NgModuleFactory, NgModuleMetadata, NgModuleRef } from '../index';
import { ConcreteType, Type } from '../src/facade/lang';
/**
 * Builds a NgModuleRef for use in tests.
 *
 * @experimenta;
 */
export declare class TestModuleBuilder {
    protected _injector: Injector;
    constructor(_injector: Injector);
    /**
     * Overrides a module's {@link NgModuleMetadata}.
     */
    overrideNgModule(moduleType: Type, metadata: NgModuleMetadata): TestModuleBuilder;
    protected createFromFactory<C>(ngModuleFactory: NgModuleFactory<C>): NgModuleRef<C>;
    /**
     * Builds and returns a NgModuleRef.
     */
    createAsync<T>(moduleType: ConcreteType<T>): Promise<NgModuleRef<T>>;
    /**
     * Builds and returns a NgModuleRef.
     */
    createFakeAsync<T>(moduleType: ConcreteType<T>): NgModuleRef<T>;
    /**
     * Builds and returns a NgModuleRef.
     */
    createSync<T>(moduleType: ConcreteType<T>): NgModuleRef<T>;
}
