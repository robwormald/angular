import { DiffingBroccoliPlugin, DiffResult } from './diffing-broccoli-plugin';
export interface LodashRendererOptions {
    encoding?: string;
    context?: any;
    files?: string[];
}
/**
 * Intercepts each changed file and replaces its contents with
 * the associated changes.
 */
export declare class LodashRenderer implements DiffingBroccoliPlugin {
    private inputPath;
    private cachePath;
    private options;
    constructor(inputPath: string, cachePath: string, options?: LodashRendererOptions);
    rebuild(treeDiff: DiffResult): void;
}
declare var _default: (inputTrees: BroccoliTree | BroccoliTree[], options?: any) => BroccoliTree;
export default _default;
