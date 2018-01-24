
declare global {
  interface Window {
    ngTemplateRegistry: TemplateTypeRegistry
  }
  interface TemplateTypeRegistry {
    define(name:string, templateType:TemplateTypeInit):void;
    get(name:string): TemplateTypeInit;
    has(name:string): boolean;
  }
  interface HTMLTemplateElement<T = {}> {
    createInstance():HTMLTemplateInstance<T>
  }
}

export interface TemplateTypeInit {
  processCallback():void;
  createCallback():void;

}

export class HTMLTemplateInstance <T = {}> {
  constructor(public node:Node, private options:TemplateTypeInit){

  }
  update(state:T){}
}

class TemplateTypeRegistry {
  _types = new Map<string, any>()
  define(name:string,templateType: TemplateTypeInit){
    this._types.set(name, templateType);
  }
  get(name:string):TemplateTypeInit { return this._types.get(name); }
  has(name:string):boolean { return this._types.has(name); }
}

function parseTemplateString(template:string){

}


function instantiate<T>(this:HTMLTemplateElement<T>, state:T = {} as T){
  const node = this.content.cloneNode(true);
  const templateTypeKey = this.getAttribute('type');

  const templateType = window.ngTemplateRegistry.get( templateTypeKey && templateTypeKey.length ? templateTypeKey : 'ng-template');
  console.log(templateType)
  templateType.processCallback();
  return new HTMLTemplateInstance(node, templateType);
}

const defaultTemplateType = {
  processCallback(){
    console.log('process');
  },
  createCallback(){
    console.log('create');
  }
}



window.ngTemplateRegistry = new TemplateTypeRegistry();

window.ngTemplateRegistry.define('ng-template', defaultTemplateType);
HTMLTemplateElement.prototype.createInstance = instantiate;

export {}
