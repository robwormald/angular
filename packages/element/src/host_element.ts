/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

const internalsCache = new WeakMap<NgHostElement, NgElementInternals>();

class NgElementHostInternals {
  constructor(){}

}

type NgElementInternals = [
  ElementFlags,
  any,
  any[]
];

const enum ElementFlags {
  Upgrading = 0x0001,
  Upgraded = 0x0010,
  Connected = 0x0100,
  Detached = 0x1000
}


export class NgHostElement<Props = {}> extends HTMLElement {

  static observedAttributes? : string[];
  static ngElementDef: any;

  private static __ngElementDef: any;

  protected ngOnUpgrade?(): void;

  protected ngOnInit?(): void;
  protected ngOnChanges?(): void;

  protected ngDoCheck?(): boolean;

  constructor(){
    super();
    this._ngOnUpgrade();
  }

  protected connectedCallback(){
    runConnectedHooks(this);
  }
  protected disconnectedCallback(){
    runDisconnectedHooks(this);
  }
  protected attributeChangedCallback(attr: string, oldValue: string | null, newValue: string | null, ns: string | null){
    runAttrChangedHooks(this, attr, oldValue, newValue, ns);
  }

  protected attachNgInternals(){

    const internals = getElementInternals(this);

    if(internals[0] & ElementFlags.Upgraded){
      throw new Error('NgHostElement Internals already attached');
    }
    internals[0] |= ElementFlags.Upgrading;

  }

  private _ngOnUpgrade(){
    const internals = allocateNgInternals(this);
  }
}

function getElementInternals(element: NgHostElement): NgElementInternals {
  let internals = getCachedInternals(element);
  if(!internals){
    internals = allocateNgInternals(element);
  }
  setCachedInternals(element, internals);
  return internals;
}

function allocateNgInternals(element: NgHostElement): NgElementInternals {
  const elementDef = (element.constructor as typeof NgHostElement).ngElementDef;

  return [
    ElementFlags.Upgrading,
    elementDef,
    []
  ];
}

function getCachedInternals(element: NgHostElement){
  return internalsCache.get(element);
}
function setCachedInternals(element: NgHostElement, internals: NgElementInternals){
  internalsCache.set(element, internals);
}
function deleteCachedInternals(element: NgHostElement){
  internalsCache.delete(element);
}

function runConnectedHooks(element: NgHostElement){
  const internals = getElementInternals(element);
  internals[0] |= ElementFlags.Connected;
}

function runDisconnectedHooks(element: NgHostElement){
  const internals = getElementInternals(element);
  internals[0] &= ~ElementFlags.Connected;
}

function runAttrChangedHooks(element: NgHostElement, attr: string, oldValue: string | null, newValue: string | null, namespace: string | null){
  const internals = getElementInternals(element);


  if(internals[0] & ElementFlags.Connected){
    console.log('attr changed', attr, oldValue, newValue);
  }
}
