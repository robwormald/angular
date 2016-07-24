import { ImportGenerator } from './path_util';
export declare class DartImportGenerator implements ImportGenerator {
    getImportPath(moduleUrlStr: string, importedUrlStr: string): string;
}
export declare function getRelativePath(modulePath: string, importedPath: string): string;
export declare function getLongestPathSegmentPrefix(arr1: string[], arr2: string[]): number;
