/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {NgElementDef} from "./defs";


class NgElementHostInternals {
  constructor(){}
  upgradeElement(){}
}

type NgElementInternals = [
  ElementFlags,
  NgElementDef,
  any[]
];

const enum ElementFlags {
  Upgraded = 1
}


export class NgHostElement<Props = {}> extends HTMLElement {

  static observedAttributes? : string[];
  static ngElementDef: NgElementDef<{}>;

  private static __ngElementDef: NgElementDef<{}>

  protected connectedCallback(){}
  protected disconnectedCallback(){}
  protected attributeChangedCallback(attr: string, oldValue: string | null, newValue: string | null, ns: string | null){}

  protected attachNgInternals(){

  }

  private __ngInternals = allocateNgInternals(this);

  private _ngOnConnected(){}
  private _ngOnDisconnected(){}
}

function allocateNgInternals(element: NgHostElement): NgElementInternals {
  const elementDef = (element.constructor as typeof NgHostElement).ngElementDef;

  return [
    0x0000,
    elementDef,
    []
  ];
}
