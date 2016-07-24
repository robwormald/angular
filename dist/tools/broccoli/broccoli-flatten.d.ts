import { DiffingBroccoliPlugin, DiffResult } from './diffing-broccoli-plugin';
import { AngularBuilderOptions } from './angular_builder';
/**
 * Intercepts each changed file and replaces its contents with
 * the associated changes.
 */
export declare class DiffingFlatten implements DiffingBroccoliPlugin {
    private inputPath;
    private cachePath;
    private options;
    constructor(inputPath: string, cachePath: string, options: AngularBuilderOptions);
    rebuild(treeDiff: DiffResult): void;
}
declare var _default: (inputTrees: BroccoliTree | BroccoliTree[], options?: any) => BroccoliTree;
export default _default;
