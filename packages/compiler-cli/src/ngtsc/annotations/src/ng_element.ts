/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {ConstantPool, CssSelector, DEFAULT_INTERPOLATION_CONFIG, DomElementSchemaRegistry, Expression, ExternalExpr, Identifiers, InterpolationConfig, LexerRange, ParseError, ParseSourceFile, ParseTemplateOptions, R3ComponentMetadata, R3FactoryTarget, R3TargetBinder, SchemaMetadata, SelectorMatcher, Statement, TmplAstNode, WrappedNodeExpr, compileNgElementFromMetadata, makeBindingParser, parseTemplate} from '@angular/compiler';
import * as ts from 'typescript';

import {CycleAnalyzer} from '../../cycles';
import {ErrorCode, FatalDiagnosticError} from '../../diagnostics';
import {absoluteFrom, relative} from '../../file_system';
import {DefaultImportRecorder, ModuleResolver, Reference, ReferenceEmitter} from '../../imports';
import {DependencyTracker} from '../../incremental/api';
import {IndexingContext} from '../../indexer';
import {DirectiveMeta, InjectableClassRegistry, MetadataReader, MetadataRegistry, extractDirectiveGuards} from '../../metadata';
import {flattenInheritedDirectiveMetadata} from '../../metadata/src/inheritance';
import {EnumValue, PartialEvaluator} from '../../partial_evaluator';
import {ClassDeclaration, CtorParameter, reflectObjectLiteral, Decorator, Import, ReflectionHost, TypeValueReference, isNamedClassDeclaration} from '../../reflection';

import {ComponentScopeReader, LocalModuleScopeRegistry} from '../../scope';
import {AnalysisOutput, CompileResult, DecoratorHandler, DetectResult, HandlerFlags, HandlerPrecedence, ResolveResult} from '../../transform';
import {TemplateSourceMapping, TypeCheckContext} from '../../typecheck';
import {tsSourceMapBug29300Fixed} from '../../util/src/ts_source_map_bug_29300';
import {SubsetOfKeys} from '../../util/src/typescript';

import {ResourceLoader} from './api';
import {getDirectiveDiagnostics, getProviderDiagnostics} from './diagnostics';
import {extractDirectiveMetadata, parseFieldArrayValue} from './directive';
import {compileNgFactoryDefField} from './factory';
import {generateSetClassMetadataCall} from './metadata';
import {findAngularDecorator, isAngularCoreReference, isExpressionForwardReference, makeDuplicateDeclarationError, readBaseClass, resolveProvidersRequiringFactory, unwrapExpression, wrapTypeReference, wrapFunctionExpressionsInParens} from './util';
import { R3NgElementMetadata } from '@angular/compiler/src/compiler';

export class NgElementDecoratorHandler implements DecoratorHandler<Decorator, any, any>{
  name = 'ngElement';
  precedence = HandlerPrecedence.PRIMARY;

  constructor(private reflector: ReflectionHost, private evaluator: PartialEvaluator){}
  detect(node: ClassDeclaration<ts.Declaration>, decorators: Decorator[] | null): DetectResult<Decorator> | undefined {

    if (!decorators) {
      return undefined;
    }
    const decorator = findElementDecorator(decorators, 'NgElement', true);
    if (decorator !== undefined) {
      return {
        trigger: decorator.node,
        decorator,
        metadata: decorator,
      };
    } else {
      return undefined;
    }
  }
  analyze(node: ClassDeclaration<ts.Declaration>, decorator: Readonly<Decorator>, handlerFlags?: HandlerFlags | undefined): AnalysisOutput<any> {
    const name = node.name.text;
    if (decorator.args === null || decorator.args.length > 1) {
      throw new FatalDiagnosticError(
          ErrorCode.DECORATOR_ARITY_WRONG, Decorator.nodeForError(decorator),
          `Incorrect number of arguments to @NgElement decorator`);
    }
    const type = wrapTypeReference(this.reflector, node);
    const internalType = new WrappedNodeExpr(this.reflector.getInternalNameOfClass(node));


    const meta = unwrapExpression(decorator.args[0]);
    if (!ts.isObjectLiteralExpression(meta)) {
      throw new FatalDiagnosticError(
          ErrorCode.DECORATOR_ARG_NOT_LITERAL, meta, '@NgElement must have a literal argument');
    }
    const ngElement = reflectObjectLiteral(meta);

    if(!ngElement.has('selector')){
      throw new FatalDiagnosticError(
        ErrorCode.NGELEMENT_MISSING_SELECTOR, meta, '@NgElement must have a selector');
    }
    const selector = ngElement.get('selector');
    let observedAttributes:string[] = [];
    if(ngElement.has('observedAttributes')){
      observedAttributes = parseFieldArrayValue(ngElement, 'observedAttributes', this.evaluator) || [];
    }

    return {
      analysis: {
        meta: {
          selector,
          type,
          observedAttributes
        }
      },
    }
  }
  compile(
    node: ClassDeclaration, analysis: Readonly<any>,
    resolution: Readonly<any>, pool: ConstantPool): CompileResult[] {
  const meta: R3NgElementMetadata = analysis.meta;
  const [attrs, res] = compileNgElementFromMetadata(meta);



  return [
    {
      name: 'observedAttributes',
      initializer: attrs.expression,
      statements: [],
      type: res.type
    },
    {
      name: 'ngElementDef',
      initializer: res.expression,
      statements: [],
      type: res.type,
    }
  ];
}


}

export function isAngularElement(decorator: Decorator): decorator is Decorator&{import: Import} {
  return decorator.import !== null && decorator.import.from === '@angular/element';
}
export function findElementDecorator(
  decorators: Decorator[], name: string, isCore: boolean): Decorator|undefined {
return decorators.find(decorator => isElementDecorator(decorator, name, isCore));
}

export function isElementDecorator(decorator: Decorator, name: string, isCore: boolean): boolean {
if (isCore) {
  return decorator.name === name;
} else if (isAngularElement(decorator)) {
  return decorator.import.name === name;
}
return false;
}

// Refer to https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name

const validElementName = /^[a-z](?:[\-\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*-(?:[\-\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;

const reservedNames = [
  'annotation-xml',
	'color-profile',
	'font-face',
	'font-face-src',
	'font-face-uri',
	'font-face-format',
	'font-face-name',
	'missing-glyph'
];

function validateSelector(selector: string){

}
