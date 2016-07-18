/** @experimental */
export declare function bootstrap<C>(appComponentType: ConcreteType<C>, customProviders?: Array<any>): Promise<ComponentRef<C>>;

/** @deprecated */
export declare function bootstrapWorkerApp<T>(appComponentType: ConcreteType<T>, customProviders?: Array<any>): Promise<ComponentRef<T>>;

/** @deprecated */
export declare function bootstrapWorkerUi(workerScriptUri: string, customProviders?: Array<any>): Promise<PlatformRef>;

/** @deprecated */
export declare const BROWSER_APP_COMPILER_PROVIDERS: Array<any>;

/** @experimental */
export declare const BROWSER_DYNAMIC_COMPILER_FACTORY: CompilerFactory;

/** @experimental */
export declare const BROWSER_DYNAMIC_PLATFORM_PROVIDERS: Array<any>;

/** @experimental */
export declare const browserDynamicPlatform: (extraProviders?: any[]) => PlatformRef;

/** @experimental */
export declare const CACHED_TEMPLATE_PROVIDER: Array<any>;

/** @experimental */
export declare const workerAppDynamicPlatform: (extraProviders?: any[]) => PlatformRef;
