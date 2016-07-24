import * as o from '@angular/compiler/src/output/output_ast';
import { ImportGenerator } from '@angular/compiler/src/output/path_util';
export declare class ExternalClass {
    data: any;
    changeable: any;
    constructor(data: any);
    someMethod(a: any): {
        'param': any;
        'data': any;
    };
}
export declare var codegenExportsVars: string[];
export declare var codegenStmts: o.Statement[];
export declare class SimpleJsImportGenerator implements ImportGenerator {
    getImportPath(moduleUrlStr: string, importedUrlStr: string): string;
}
