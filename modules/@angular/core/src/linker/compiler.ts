/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injector} from '../di';
import {BaseException} from '../facade/exceptions';
import {ConcreteType, Type, stringify} from '../facade/lang';
import {ViewEncapsulation} from '../metadata';
import {NgModuleMetadata} from '../metadata/ng_module';

import {ComponentFactory} from './component_factory';
import {ComponentResolver} from './component_resolver';
import {NgModuleFactory} from './ng_module_factory';


/**
 * Indicates that a component is still being loaded in a synchronous compile.
 *
 * @stable
 */
export class ComponentStillLoadingError extends BaseException {
  constructor(public compType: Type) {
    super(`Can't compile synchronously as ${stringify(compType)} is still being loaded!`);
  }
}

/**
 * Low-level service for running the angular compiler duirng runtime
 * to create {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * Each `@NgModule` provides an own `Compiler` to its injector,
 * that will use the directives/pipes of the ng module for compilation
 * of components.
 * @stable
 */
export class Compiler {
  /**
   * Returns the injector with which the compiler has been created.
   *
   * @internal
   */
  get injector(): Injector {
    throw new BaseException(`Runtime compiler is not loaded. Tried to read the injector.`);
  }

  /**
   * Loads the template and styles of a component and returns the associated `ComponentFactory`.
   */
  compileComponentAsync<T>(component: ConcreteType<T>): Promise<ComponentFactory<T>> {
    throw new BaseException(
        `Runtime compiler is not loaded. Tried to compile ${stringify(component)}`);
  }
  /**
   * Compiles the given component. All templates have to be either inline or compiled via
   * `compileComponentAsync` before. Otherwise throws a {@link ComponentStillLoadingError}.
   */
  compileComponentSync<T>(component: ConcreteType<T>): ComponentFactory<T> {
    throw new BaseException(
        `Runtime compiler is not loaded. Tried to compile ${stringify(component)}`);
  }
  /**
   * Compiles the given NgModule. All templates of the components listed in `precompile`
   * have to be either inline or compiled before via `compileComponentAsync` /
   * `compileNgModuleAsync`. Otherwise throws a {@link ComponentStillLoadingError}.
   */
  compileNgModuleSync<T>(moduleType: ConcreteType<T>, metadata: NgModuleMetadata = null):
      NgModuleFactory<T> {
    throw new BaseException(
        `Runtime compiler is not loaded. Tried to compile ${stringify(moduleType)}`);
  }

  compileNgModuleAsync<T>(moduleType: ConcreteType<T>, metadata: NgModuleMetadata = null):
      Promise<NgModuleFactory<T>> {
    throw new BaseException(
        `Runtime compiler is not loaded. Tried to compile ${stringify(moduleType)}`);
  }

  /**
   * Clears all caches
   */
  clearCache(): void {}

  /**
   * Clears the cache for the given component/ngModule.
   */
  clearCacheFor(type: Type) {}
}

/**
 * Options for creating a compiler
 *
 * @experimental
 */
export type CompilerOptions = {
  useDebug?: boolean,
  useJit?: boolean,
  defaultEncapsulation?: ViewEncapsulation,
  providers?: any[],
}

/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
export abstract class CompilerFactory {
  static mergeOptions(defaultOptions: CompilerOptions = {}, newOptions: CompilerOptions = {}):
      CompilerOptions {
    return {
      useDebug: _firstDefined(newOptions.useDebug, defaultOptions.useDebug),
      useJit: _firstDefined(newOptions.useJit, defaultOptions.useJit),
      defaultEncapsulation:
          _firstDefined(newOptions.defaultEncapsulation, defaultOptions.defaultEncapsulation),
      providers: _mergeArrays(defaultOptions.providers, newOptions.providers)
    };
  }

  withDefaults(options: CompilerOptions = {}): CompilerFactory {
    return new _DefaultApplyingCompilerFactory(this, options);
  }
  abstract createCompiler(options?: CompilerOptions): Compiler;
}

class _DefaultApplyingCompilerFactory extends CompilerFactory {
  constructor(private _delegate: CompilerFactory, private _options: CompilerOptions) { super(); }

  createCompiler(options: CompilerOptions = {}): Compiler {
    return this._delegate.createCompiler(CompilerFactory.mergeOptions(this._options, options));
  }
}

function _firstDefined<T>(...args: T[]): T {
  for (var i = 0; i < args.length; i++) {
    if (args[i] !== undefined) {
      return args[i];
    }
  }
  return undefined;
}

function _mergeArrays(...parts: any[][]): any[] {
  let result: any[] = [];
  parts.forEach((part) => result.push.apply(result, part));
  return result;
}
