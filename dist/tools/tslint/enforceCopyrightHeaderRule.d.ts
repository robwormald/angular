import { RuleFailure } from 'tslint/lib/lint';
import { AbstractRule } from 'tslint/lib/rules';
import * as ts from 'typescript';
export declare class Rule extends AbstractRule {
    static FAILURE_STRING: string;
    apply(sourceFile: ts.SourceFile): RuleFailure[];
}
