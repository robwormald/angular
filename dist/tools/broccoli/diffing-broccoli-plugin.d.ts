/// <reference path="../../../tools/broccoli/broccoli.d.ts" />
import { DiffResult } from './tree-differ';
export { DiffResult } from './tree-differ';
export declare type PluginClass = any;
/**
 * Makes writing diffing plugins easy.
 *
 * Factory method that takes a class that implements the DiffingBroccoliPlugin interface and returns
 * an instance of BroccoliTree.
 */
export declare function wrapDiffingPlugin(pluginClass: PluginClass): DiffingPluginWrapperFactory;
export interface DiffingBroccoliPlugin {
    rebuild(diff: (DiffResult | DiffResult[])): (Promise<DiffResult | void> | DiffResult | void);
    cleanup?(): void;
}
export declare type DiffingPluginWrapperFactory = (inputTrees: (BroccoliTree | BroccoliTree[]), options?: any) => BroccoliTree;
