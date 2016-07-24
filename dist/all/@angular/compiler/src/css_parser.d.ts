import { BlockType, CssAst, CssBlockAst, CssDefinitionAst, CssKeyframeDefinitionAst, CssPseudoSelectorAst, CssRuleAst, CssSelectorAst, CssSimpleSelectorAst, CssStyleSheetAst, CssStyleValueAst, CssStylesBlockAst } from './css_ast';
import { CssToken, CssTokenType } from './css_lexer';
import { ParseError, ParseSourceFile, ParseSourceSpan } from './parse_util';
export { CssToken } from './css_lexer';
export { BlockType } from './css_ast';
export declare class ParsedCssResult {
    errors: CssParseError[];
    ast: CssStyleSheetAst;
    constructor(errors: CssParseError[], ast: CssStyleSheetAst);
}
export declare class CssParser {
    private _errors;
    private _file;
    private _scanner;
    private _lastToken;
    /**
     * @param css the CSS code that will be parsed
     * @param url the name of the CSS file containing the CSS source code
     */
    parse(css: string, url: string): ParsedCssResult;
    /** @internal */
    _parseStyleSheet(delimiters: number): CssStyleSheetAst;
    /** @internal */
    _getSourceContent(): string;
    /** @internal */
    _extractSourceContent(start: number, end: number): string;
    /** @internal */
    _generateSourceSpan(start: CssToken | CssAst, end?: CssToken | CssAst): ParseSourceSpan;
    /** @internal */
    _resolveBlockType(token: CssToken): BlockType;
    /** @internal */
    _parseRule(delimiters: number): CssRuleAst;
    /** @internal */
    _parseAtRule(delimiters: number): CssRuleAst;
    /** @internal */
    _parseSelectorRule(delimiters: number): CssRuleAst;
    /** @internal */
    _parseSelectors(delimiters: number): CssSelectorAst[];
    /** @internal */
    _scan(): CssToken;
    /** @internal */
    _getScannerIndex(): number;
    /** @internal */
    _consume(type: CssTokenType, value?: string): CssToken;
    /** @internal */
    _parseKeyframeBlock(delimiters: number): CssBlockAst;
    /** @internal */
    _parseKeyframeDefinition(delimiters: number): CssKeyframeDefinitionAst;
    /** @internal */
    _parseKeyframeLabel(delimiters: number): CssToken;
    /** @internal */
    _parsePseudoSelector(delimiters: number): CssPseudoSelectorAst;
    /** @internal */
    _parseSimpleSelector(delimiters: number): CssSimpleSelectorAst;
    /** @internal */
    _parseSelector(delimiters: number): CssSelectorAst;
    /** @internal */
    _parseValue(delimiters: number): CssStyleValueAst;
    /** @internal */
    _collectUntilDelim(delimiters: number, assertType?: CssTokenType): CssToken[];
    /** @internal */
    _parseBlock(delimiters: number): CssBlockAst;
    /** @internal */
    _parseStyleBlock(delimiters: number): CssStylesBlockAst;
    /** @internal */
    _parseDefinition(delimiters: number): CssDefinitionAst;
    /** @internal */
    _assertCondition(status: boolean, errorMessage: string, problemToken: CssToken): boolean;
    /** @internal */
    _error(message: string, problemToken: CssToken): void;
}
export declare class CssParseError extends ParseError {
    static create(file: ParseSourceFile, offset: number, line: number, col: number, length: number, errMsg: string): CssParseError;
    constructor(span: ParseSourceSpan, message: string);
}
