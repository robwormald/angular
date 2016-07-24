/// <reference path="../../../tools/broccoli/broccoli-writer.d.ts" />
import Writer = require('broccoli-writer');
export interface MultiCopyOptions {
    /** The path of the file to copy. */
    srcPath: string;
    /** A list of glob patterns of folders to copy to, matched against the input tree. */
    targetPatterns: string[];
    /** List of glob patterns to *not* copy to, matched against the matches from `targetPatterns`. */
    exclude?: string[];
}
/**
 * A writer that copies an input file from an input path into (potentially many) output locations
 * given by glob patterns, .
 */
export declare class MultiCopy extends Writer {
    private inputTree;
    private options;
    constructor(inputTree: BroccoliTree, options: MultiCopyOptions);
    write(readTree: (tree: BroccoliTree) => Promise<string>, destDir: string): Promise<any>;
}
