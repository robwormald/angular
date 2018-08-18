import {CompilePipeMetadata, identifierName} from '../compile_metadata';
import {CompileReflector} from '../compile_reflector';
import {DefinitionKind, ConstantPool} from '../constant_pool';
import * as o from '../output/output_ast';
import {OutputContext, error} from '../util';

import {R3DependencyMetadata, compileFactoryFunction, dependenciesFromGlobalMetadata} from './r3_factory';
import {Identifiers as R3, ElementIdentifiers as R3E} from './r3_identifiers';

export interface R3NgElementMetadata {
  selector: string;
  shadowRoot?: boolean;
  type: any;
  name: string;
}

export interface R3NgElementDef {
  expression: o.Expression;
  type: o.Type;
}

export function compileCustomElementFromMetadata(metadata: R3NgElementMetadata) {
  const definitionMapValues: {key: string, quoted: boolean, value: o.Expression}[] = [];

  // e.g. `selector: 'my-element'`
  definitionMapValues.push({key: 'selector', value: o.literal(metadata.selector), quoted: false});
  definitionMapValues.push({key: 'type', value: metadata.type, quoted: false});
  definitionMapValues.push({key: 'name', value: o.literal(metadata.name), quoted: false});

  // e.g. `shadowRoot: true`
  if(metadata.shadowRoot !== false){
    metadata.shadowRoot = true;
  }
  definitionMapValues.push({key: 'shadowRoot', value: o.literal(metadata.shadowRoot), quoted: false});

  definitionMapValues.push({key: 'upgrade', value: createNgElementUpgradeFunction(metadata)!, quoted: false})
  // const templateFactory = compileFactoryFunction({
  //   name: metadata.name,
  //   fnOrClass: metadata.type,
  //   deps: metadata.deps,
  //   useNew: true,
  //   injectFn: R3.directiveInject,
  // });
  //definitionMapValues.push({key: 'factory', value: templateFactory, quoted: false});

  // e.g. `pure: true`
  //definitionMapValues.push({key: 'pure', value: o.literal(metadata.pure), quoted: false});

  const expression = o.importExpr(R3E.defineNgElement).callFn([o.literalMap(definitionMapValues)]);
  const type = new o.ExpressionType(o.importExpr(R3E.NgElementDef, [
    new o.ExpressionType(o.literal(metadata.selector))
  ]));
  return {expression, type};
}

function compileShadowRoot(){}

function createNgElementUpgradeFunction(
  meta: R3NgElementMetadata): o.Expression|null {

  const typeName = meta.selector;
  const statements:o.Statement[] = [];
  const params:o.FnParam[] = [
    new o.FnParam('element', null),
    new o.FnParam('ngElementDef', null),
  ];

  if(meta.shadowRoot){
    statements.push(o.importExpr(R3E.attachShadowRoot).callFn([o.variable('element')]).toStmt())
  }

  return o.fn(params, statements , o.INFERRED_TYPE, null, `upgradeNgElement_${meta.name}`);
}
