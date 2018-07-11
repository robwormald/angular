import {ComponentDef, ComponentType} from '../../core_render3_private_imports'

const templateCache = new Map<string, HTMLTemplateElement>();

function createStaticTemplate(htmlString:string, styles:string[] = []){
  const templateElement = document.createElement('template');
  templateElement.innerHTML = htmlString;
  styles.forEach(styleString => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = styleString;
    templateElement.appendChild(styleEl);
  });
  return templateElement;
}

export interface NgElementDef {
  template: HTMLTemplateElement;
  selector: string;
  shadowRoot?: boolean;
}

export function defineNgElement(ngElementDef:{
  selector:string;
  styles?:string[];
  template?: string;
  shadowRoot?: boolean;
}){
  const staticTemplate = createStaticTemplate(ngElementDef.template || '', ngElementDef.styles);


  return ({
    selector: ngElementDef.selector,
    template: staticTemplate,
    shadowRoot: ngElementDef.shadowRoot
  })
}

export const enum ElementFlags {
  Upgraded =  1,
  Connected = 2,
  Dirty = 4,
  ShadowRoot = 8
}

export abstract class NgElement extends HTMLElement {
  _flags!: ElementFlags;
  _upgrade(){}
  constructor(){
    super();
  }
  connectedCallback(){}
  disconnectedCallback(){}
}

const NgCustomElement = HTMLElement as  any as typeof NgElement

export function withNgElement<T>(Base = NgCustomElement){
  return class NgElement extends Base {
    _flags!:number;
    constructor(){
      super();
      this._upgrade();
    }
    connectedCallback(){
      (this._flags |= ElementFlags.Connected);
      super.connectedCallback && super.connectedCallback();
    }
    disconnectedCallback(){
      (this._flags &= ~ElementFlags.Connected);
      super.disconnectedCallback && super.disconnectedCallback();
    }
    _upgrade(){
      if((this._flags & ElementFlags.Upgraded)) return;
      if(this._flags & ElementFlags.ShadowRoot){
        if(!this.shadowRoot){
          this.attachShadow({mode: 'open'});
        }
      }
      this._flags |= ElementFlags.Upgraded;
    }
  }
}

export abstract class NgElementRenderer extends HTMLElement {
  protected _updated(...args:any[]){}
  protected _renderer(root:HTMLElement | ShadowRoot, renderFn:RenderFn){}
}

export type RenderFn = (flags:ElementFlags, ctx:any) => void;


export function withStaticTemplate(Base = NgCustomElement){
  return class NgStaticTemplateElement extends Base {
    _flags = ElementFlags.ShadowRoot;
    constructor(){
      super();
      this._upgrade();

    }
    _upgrade(){
      super._upgrade && super._upgrade();
      this._render();
    }
    static ngStaticTemplate: string;

    _render = () => {
      const templateString = (this.constructor as typeof NgStaticTemplateElement).ngStaticTemplate;
      if(!templateString){
        console.log('template string not found')
        throw new Error('ngStaticTemplate not found!');
      }
      let protoTemplate = templateCache.get(templateString);
      if(!protoTemplate){

        protoTemplate = createStaticTemplate(templateString);
        templateCache.set(templateString, protoTemplate);
      }
      const staticTemplateFragment = protoTemplate.content.cloneNode(true);
      console.log(protoTemplate)
      if(this.shadowRoot){
        this.shadowRoot.appendChild(staticTemplateFragment);
      } else {
        this.appendChild(staticTemplateFragment);
      }
    }
  }
}
