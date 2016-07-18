/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Compiler, Injectable, Injector, NgModuleFactory, NgModuleMetadata, NgModuleRef} from '../index';
import {PromiseWrapper} from '../src/facade/async';
import {ConcreteType, Type, isPresent} from '../src/facade/lang';

import {tick} from './fake_async';


/**
 * Builds a NgModuleRef for use in tests.
 *
 * @experimenta;
 */
@Injectable()
export class TestModuleBuilder {
  constructor(protected _injector: Injector) {}

  /**
   * Overrides a module's {@link NgModuleMetadata}.
   */
  overrideNgModule(moduleType: Type, metadata: NgModuleMetadata): TestModuleBuilder {
    throw new Error(
        'overrideNgModule is not supported in this implementation of TestComponentBuilder.');
  }

  protected createFromFactory<C>(ngModuleFactory: NgModuleFactory<C>): NgModuleRef<C> {
    return ngModuleFactory.create(this._injector);
  }

  /**
   * Builds and returns a NgModuleRef.
   */
  createAsync<T>(moduleType: ConcreteType<T>): Promise<NgModuleRef<T>> {
    const compiler: Compiler = this._injector.get(Compiler);
    return compiler.compileNgModuleAsync(moduleType)
        .then((moduleFactory) => this.createFromFactory(moduleFactory));
  }

  /**
   * Builds and returns a NgModuleRef.
   */
  createFakeAsync<T>(moduleType: ConcreteType<T>): NgModuleRef<T> {
    let result: NgModuleRef<T>;
    let error: any;
    PromiseWrapper.then(
        this.createAsync(moduleType), (_result) => { result = _result; },
        (_error) => { error = _error; });
    tick();
    if (isPresent(error)) {
      throw error;
    }
    return result;
  }

  /**
   * Builds and returns a NgModuleRef.
   */
  createSync<T>(moduleType: ConcreteType<T>): NgModuleRef<T> {
    const compiler: Compiler = this._injector.get(Compiler);
    return this.createFromFactory(compiler.compileNgModuleSync(moduleType));
  }
}
