/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ConstantPool, Expression, R3ComponentMetadata, R3NgElementMetadata, R3DirectiveMetadata, WrappedNodeExpr, compileComponentFromMetadata, makeBindingParser, parseTemplate, compileCustomElementFromMetadata} from '@angular/compiler';
import * as path from 'path';
import * as ts from 'typescript';

import {Decorator, ReflectionHost, ClassMember, ClassMemberKind} from '../../host';
import {filterToMembersWithDecorator, reflectObjectLiteral, staticallyResolve} from '../../metadata';
import {AnalysisOutput, CompileResult, DecoratorHandler} from '../../transform';

import {ResourceLoader} from './api';
import {extractDirectiveMetadata, extractQueriesFromDecorator, queriesFromFields} from './directive';
import {SelectorScopeRegistry} from './selector_scope';
import {isAngularCore, unwrapExpression} from './util';

const EMPTY_MAP = new Map<string, Expression>();



/**
 * `DecoratorHandler` which handles the `@NgElement` annotation.
 */
export class NgElementDecoratorHandler implements DecoratorHandler<R3NgElementMetadata> {
  constructor(
      private checker: ts.TypeChecker, private reflector: ReflectionHost,
      private scopeRegistry: SelectorScopeRegistry, private isCore: boolean,
      private resourceLoader: ResourceLoader) {}

  private literalCache = new Map<Decorator, ts.ObjectLiteralExpression>();


  detect(decorators: Decorator[]): Decorator|undefined {
    return decorators.find(
        decorator => decorator.name === 'NgElement');
  }

  preanalyze(node: ts.ClassDeclaration, decorator: Decorator): Promise<void>|undefined {
    console.log('preanalzying')
    //TODO(robwormald): doesn't seem to run?
    // const meta = this._resolveLiteral(decorator);
    // const element = reflectObjectLiteral(meta);
    // const selector = staticallyResolve(element.get('selector') !, this.reflector, this.checker);
    // validateCustomElementSelector(selector as string);
    // // [...component.keys()].forEach(key => console.log(key));

    // // if (this.resourceLoader.preload !== undefined && component.has('templateUrl')) {
    // //   const templateUrl =
    // //       staticallyResolve(component.get('templateUrl') !, this.reflector, this.checker);
    // //   if (typeof templateUrl !== 'string') {
    // //     throw new Error(`templateUrl should be a string`);
    // //   }
    // //   const url = path.posix.resolve(path.dirname(node.getSourceFile().fileName), templateUrl);
    // //   return this.resourceLoader.preload(url);
    // }
    return undefined;
  }

  analyze(node: ts.ClassDeclaration, decorator: Decorator): AnalysisOutput<R3NgElementMetadata> {

    const meta = this._resolveLiteral(decorator);
    this.literalCache.delete(decorator);
    // @Component inherits @Directive, so begin by extracting the @Directive metadata and building
    // on it.
    const elementResult  =
        extractNgElementMetadata(node, decorator, this.checker, this.reflector, this.isCore);
    if (elementResult === undefined) {
      // `extractDirectiveMetadata` returns undefined when the @Directive has `jit: true`. In this
      // case, compilation of the decorator is skipped. Returning an empty object signifies
      // that no analysis was produced.
      return {};
    }

    // Next, read the `@Component`-specific fields.
    const {decoratedElements, decorator: elementDef, metadata} = elementResult;
    if(!elementDef.has('selector')){
      throw new Error('NgElements must have a selector defined!')
    }
    const name = node.name!.text;
    const type = new WrappedNodeExpr(node.name);

    const selector = staticallyResolve(elementDef.get('selector') !, this.reflector, this.checker) as string;

    validateCustomElementSelector(selector);


    // let templateStr: string|null = null;
    // if (component.has('templateUrl')) {
    //   const templateUrl =
    //       staticallyResolve(component.get('templateUrl') !, this.reflector, this.checker);
    //   if (typeof templateUrl !== 'string') {
    //     throw new Error(`templateUrl should be a string`);
    //   }
    //   const url = path.posix.resolve(path.dirname(node.getSourceFile().fileName), templateUrl);
    //   templateStr = this.resourceLoader.load(url);
    // } else if (component.has('template')) {
    //   const templateExpr = component.get('template') !;
    //   const resolvedTemplate = staticallyResolve(templateExpr, this.reflector, this.checker);
    //   if (typeof resolvedTemplate !== 'string') {
    //     throw new Error(`Template must statically resolve to a string: ${node.name!.text}`);
    //   }
    //   templateStr = resolvedTemplate;
    // } else {
    //   throw new Error(`Component has no template or templateUrl`);
    // }

    // let preserveWhitespaces: boolean = false;
    // if (component.has('preserveWhitespaces')) {
    //   const value =
    //       staticallyResolve(component.get('preserveWhitespaces') !, this.reflector, this.checker);
    //   if (typeof value !== 'boolean') {
    //     throw new Error(`preserveWhitespaces must resolve to a boolean if present`);
    //   }
    //   preserveWhitespaces = value;
    // }

    // const template = parseTemplate(
    //     templateStr, `${node.getSourceFile().fileName}#${node.name!.text}/template.html`,
    //     {preserveWhitespaces});
    // if (template.errors !== undefined) {
    //   throw new Error(
    //       `Errors parsing template: ${template.errors.map(e => e.toString()).join(', ')}`);
    // }

    // // If the component has a selector, it should be registered with the `SelectorScopeRegistry` so
    // // when this component appears in an `@NgModule` scope, its selector can be determined.
    // if (metadata.selector !== null) {
    //   this.scopeRegistry.registerSelector(node, metadata.selector);
    // }

    // // Construct the list of view queries.
    // const coreModule = this.isCore ? undefined : '@angular/core';
    // const viewChildFromFields = queriesFromFields(
    //     filterToMembersWithDecorator(decoratedElements, 'ViewChild', coreModule), this.reflector,
    //     this.checker);
    // const viewChildrenFromFields = queriesFromFields(
    //     filterToMembersWithDecorator(decoratedElements, 'ViewChildren', coreModule), this.reflector,
    //     this.checker);
    // const viewQueries = [...viewChildFromFields, ...viewChildrenFromFields];

    // if (component.has('queries')) {
    //   const queriesFromDecorator = extractQueriesFromDecorator(
    //       component.get('queries') !, this.reflector, this.checker, this.isCore);
    //   viewQueries.push(...queriesFromDecorator.view);
    // }

    return {
      analysis: {
        selector,
        type,
        name
      }
    };
  }

  compile(node: ts.ClassDeclaration, analysis: R3NgElementMetadata): CompileResult {
    const pool = new ConstantPool();

    // Check whether this component was registered with an NgModule. If so, it should be compiled
    // under that module's compilation scope.
    //const scope = this.scopeRegistry.lookupCompilationScope(node);
   // if (scope !== null) {
      // Replace the empty components and directives from the analyze() step with a fully expanded
      // scope. This is possible now because during compile() the whole compilation unit has been
      // fully analyzed.
      //analysis = {...analysis, ...scope};


    const res = compileCustomElementFromMetadata(analysis);
    return {
      name: 'ngElementDef',
      initializer: res.expression,
      statements: pool.statements,
      type: res.type,
    };
  }

  private _resolveLiteral(decorator: Decorator): ts.ObjectLiteralExpression {
    if (this.literalCache.has(decorator)) {
      return this.literalCache.get(decorator) !;
    }
    if (decorator.args === null || decorator.args.length !== 1) {
      throw new Error(`Incorrect number of arguments to @Component decorator`);
    }
    const meta = unwrapExpression(decorator.args[0]);

    if (!ts.isObjectLiteralExpression(meta)) {
      throw new Error(`Decorator argument must be literal.`);
    }

    this.literalCache.set(decorator, meta);
    return meta;
  }
}

//TODO(robwormald): full validation: https://github.com/sindresorhus/validate-element-name/blob/master/index.js
function validateCustomElementSelector(selector:string){
  if(selector.indexOf('-') < 1){
    throw new Error('custom elements must have a dash in their name')
  }
}

/**
 * Helper function to extract metadata from an `NgElement `.
 */
export function extractNgElementMetadata(
  clazz: ts.ClassDeclaration, decorator: Decorator, checker: ts.TypeChecker,
  reflector: ReflectionHost, isCore: boolean): {
decorator: Map<string, ts.Expression>,
metadata: R3NgElementMetadata,
decoratedElements: ClassMember[],
}|undefined {

if (decorator.args === null || decorator.args.length !== 1) {
  throw new Error(`Incorrect number of arguments to @${decorator.name} decorator`);
}
const meta = unwrapExpression(decorator.args[0]);
if (!ts.isObjectLiteralExpression(meta)) {
  throw new Error(`Decorator argument must be literal.`);
}
const elementDef = reflectObjectLiteral(meta);

const members = reflector.getMembersOfClass(clazz);

// Precompute a list of ts.ClassElements that have decorators. This includes things like @Input,
// @Output, @HostBinding, etc.
const decoratedElements =
    members.filter(member => !member.isStatic && member.decorators !== null);

const coreModule = isCore ? undefined : '@angular/core';

// Construct the map of inputs both from the @Directive/@Component
// decorator, and the decorated
// fields.
//const propsFromMeta = parseFieldToPropertyMapping(elementDef, 'inputs', reflector, checker);
// const inputsFromFields = parseDecoratedFields(
//     filterToMembersWithDecorator(decoratedElements, 'Input', coreModule), reflector, checker);

// // And outputs.
// const outputsFromMeta = parseFieldToPropertyMapping(directive, 'outputs', reflector, checker);
// const outputsFromFields = parseDecoratedFields(
//     filterToMembersWithDecorator(decoratedElements, 'Output', coreModule), reflector, checker);
// // Construct the list of queries.
// const contentChildFromFields = queriesFromFields(
//     filterToMembersWithDecorator(decoratedElements, 'ContentChild', coreModule), reflector,
//     checker);
// const contentChildrenFromFields = queriesFromFields(
//     filterToMembersWithDecorator(decoratedElements, 'ContentChildren', coreModule), reflector,
//     checker);

// const queries = [...contentChildFromFields, ...contentChildrenFromFields];

// if (directive.has('queries')) {
//   const queriesFromDecorator =
//       extractQueriesFromDecorator(directive.get('queries') !, reflector, checker, isCore);
//   queries.push(...queriesFromDecorator.content);
// }

// Parse the selector.
let selector = '';
if (elementDef.has('selector')) {
  const resolved = staticallyResolve(elementDef.get('selector') !, reflector, checker);
  if (typeof resolved !== 'string') {
    throw new Error(`Selector must be a string`);
  }
  selector = resolved;
}

//const host = extractHostBindings(directive, decoratedElements, reflector, checker, coreModule);

// Determine if `ngOnChanges` is a lifecycle hook defined on the component.
const usesOnChanges = members.some(
    member => !member.isStatic && member.kind === ClassMemberKind.Method &&
        member.name === 'ngOnChanges');

// Detect if the component inherits from another class
const usesInheritance = clazz.heritageClauses !== undefined &&
    clazz.heritageClauses.some(hc => hc.token === ts.SyntaxKind.ExtendsKeyword);
const metadata = {
  selector,
  name: clazz.name !.text,
  // deps: getConstructorDependencies(clazz, reflector, isCore), host,
  // lifecycle: {
  //     usesOnChanges,
  // },
  // inputs: {...inputsFromMeta, ...inputsFromFields},
  // outputs: {...outputsFromMeta, ...outputsFromFields}, queries, selector,
  type: new WrappedNodeExpr(clazz.name !),
  // typeArgumentCount: (clazz.typeParameters || []).length,
  // typeSourceSpan: null !, usesInheritance,
};
return {decoratedElements, decorator: elementDef, metadata};
}

function parseFieldToPropertyMapping(){}
