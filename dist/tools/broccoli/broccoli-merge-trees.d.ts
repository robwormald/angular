import { DiffingBroccoliPlugin, DiffResult } from './diffing-broccoli-plugin';
export interface MergeTreesOptions {
    overwrite?: boolean;
}
export declare class MergeTrees implements DiffingBroccoliPlugin {
    inputPaths: string[];
    cachePath: string;
    private pathCache;
    options: MergeTreesOptions;
    private firstBuild;
    constructor(inputPaths: string[], cachePath: string, options?: MergeTreesOptions);
    rebuild(treeDiffs: DiffResult[]): void;
}
declare var _default: (inputTrees: BroccoliTree | BroccoliTree[], options?: any) => BroccoliTree;
export default _default;
