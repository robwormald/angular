import { OutputEmitter } from './abstract_emitter';
import * as o from './output_ast';
import { ImportGenerator } from './path_util';
export declare class JavaScriptEmitter implements OutputEmitter {
    private _importGenerator;
    constructor(_importGenerator: ImportGenerator);
    emitStatements(moduleUrl: string, stmts: o.Statement[], exportedVars: string[]): string;
}
