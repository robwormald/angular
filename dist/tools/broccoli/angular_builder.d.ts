export declare type ProjectMap = {
    [key: string]: boolean;
};
export declare type Options = {
    projects: ProjectMap;
    noTypeChecks: boolean;
    generateEs6: boolean;
    useBundles: boolean;
};
export interface AngularBuilderOptions {
    outputPath: string;
    dartSDK?: any;
    logs?: any;
}
/**
 * BroccoliBuilder facade for all of our build pipelines.
 */
export declare class AngularBuilder {
    options: AngularBuilderOptions;
    private nodeBuilder;
    private browserDevBuilder;
    private browserProdBuilder;
    private dartBuilder;
    private outputPath;
    private firstResult;
    constructor(options: AngularBuilderOptions);
    rebuildBrowserDevTree(opts: Options): Promise<BuildResult>;
    rebuildBrowserProdTree(opts: Options): Promise<BuildResult>;
    rebuildNodeTree(opts: Options): Promise<BuildResult>;
    rebuildDartTree(projects: ProjectMap): Promise<BuildResult>;
    cleanup(): Promise<any>;
    private makeBrowserDevBuilder(opts);
    private makeBrowserProdBuilder(opts);
    private makeNodeBuilder(projects);
    private makeDartBuilder(projects);
    private rebuild(builder, name);
}
