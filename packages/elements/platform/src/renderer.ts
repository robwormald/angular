/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgElementDef } from './defs';

export const enum RenderActions {
  Create = 0,
  Update = 1,
  Destroy = 2
}

export type RenderFn = (type:RenderActions, ...args:any[]) => void;



export interface NgElementRenderer<C = {}> {

  upgradeElement(ngElementDef:NgElementDef<C>, element:HTMLElement, cb:any): void;

}

export class NgStaticTemplateRenderer<C> implements NgElementRenderer {
  ngRenderRoot!:HTMLElement | ShadowRoot;
  ngDetectChanges(): void {
    this.ngRender(RenderActions.Update);
  }
  ngCreateRenderer(rootNode: HTMLElement | ShadowRoot): RenderFn {
    return this.ngRender.bind(this);
  }
  ngRender(type:RenderActions, ...data:any[]): void {

  }

  upgradeElement(ngElementDef:NgElementDef<C>, element:HTMLElement, cb:any){}
  ngUpgrade(upgraded:() => void){
    this.ngRender = this.ngCreateRenderer(this.ngRenderRoot);
    this.ngRender(RenderActions.Create);
    upgraded();
  }


}
