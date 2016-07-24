export declare class TreeDiffer {
    private label;
    private rootPath;
    private fingerprints;
    private nextFingerprints;
    private rootDirName;
    private include;
    private exclude;
    constructor(label: string, rootPath: string, includeExtensions?: string[], excludeExtensions?: string[]);
    diffTree(): DiffResult;
    private dirtyCheckPath(rootDir, result);
    private isFileDirty(path, stat);
    private detectDeletionsAndUpdateFingerprints(result);
}
export declare class DiffResult {
    label: string;
    addedPaths: string[];
    changedPaths: string[];
    removedPaths: string[];
    constructor(label?: string);
    log(verbose: boolean): void;
    toString(): string;
}
