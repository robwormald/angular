/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as ts from 'typescript';
import { ReflectorHostContext } from '../src/reflector_host';
export declare type Entry = string | Directory;
export interface Directory {
    [name: string]: Entry;
}
export declare class MockContext implements ReflectorHostContext {
    currentDirectory: string;
    private files;
    constructor(currentDirectory: string, files: Entry);
    fileExists(fileName: string): boolean;
    directoryExists(path: string): boolean;
    readFile(fileName: string): string | undefined;
    writeFile(fileName: string, data: string): void;
    assumeFileExists(fileName: string): void;
    getEntry(fileName: string | string[]): Entry | undefined;
}
export declare class MockCompilerHost implements ts.CompilerHost {
    private context;
    constructor(context: MockContext);
    fileExists(fileName: string): boolean;
    readFile(fileName: string): string;
    directoryExists(directoryName: string): boolean;
    getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void): ts.SourceFile;
    getDefaultLibFileName(options: ts.CompilerOptions): string;
    writeFile: ts.WriteFileCallback;
    getCurrentDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
}
