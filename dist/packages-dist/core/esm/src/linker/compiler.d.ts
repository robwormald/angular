import { BaseException } from '../facade/exceptions';
import { ConcreteType, Type } from '../facade/lang';
import { ViewEncapsulation } from '../metadata';
import { NgModuleMetadata } from '../metadata/ng_module';
import { ComponentFactory } from './component_factory';
import { NgModuleFactory } from './ng_module_factory';
/**
 * Indicates that a component is still being loaded in a synchronous compile.
 *
 * @stable
 */
export declare class ComponentStillLoadingError extends BaseException {
    compType: Type;
    constructor(compType: Type);
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
export declare class Compiler {
    /**
     * Loads the template and styles of a component and returns the associated `ComponentFactory`.
     */
    compileComponentAsync<T>(component: ConcreteType<T>): Promise<ComponentFactory<T>>;
    /**
     * Compiles the given component. All templates have to be either inline or compiled via
     * `compileComponentAsync` before. Otherwise throws a {@link ComponentStillLoadingError}.
     */
    compileComponentSync<T>(component: ConcreteType<T>): ComponentFactory<T>;
    /**
     * Compiles the given NgModule. All templates of the components listed in `precompile`
     * have to be either inline or compiled before via `compileComponentAsync` /
     * `compileNgModuleAsync`. Otherwise throws a {@link ComponentStillLoadingError}.
     */
    compileNgModuleSync<T>(moduleType: ConcreteType<T>, metadata?: NgModuleMetadata): NgModuleFactory<T>;
    compileNgModuleAsync<T>(moduleType: ConcreteType<T>, metadata?: NgModuleMetadata): Promise<NgModuleFactory<T>>;
    /**
     * Clears all caches
     */
    clearCache(): void;
    /**
     * Clears the cache for the given component/ngModule.
     */
    clearCacheFor(type: Type): void;
}
/**
 * Options for creating a compiler
 *
 * @experimental
 */
export declare type CompilerOptions = {
    useDebug?: boolean;
    useJit?: boolean;
    defaultEncapsulation?: ViewEncapsulation;
    providers?: any[];
};
/**
 * A factory for creating a Compiler
 *
 * @experimental
 */
export declare abstract class CompilerFactory {
    static mergeOptions(defaultOptions?: CompilerOptions, newOptions?: CompilerOptions): CompilerOptions;
    withDefaults(options?: CompilerOptions): CompilerFactory;
    abstract createCompiler(options?: CompilerOptions): Compiler;
}
