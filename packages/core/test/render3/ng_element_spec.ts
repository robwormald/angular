/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { registerComponent } from '../../src/render3/ng_element';
import { E, getHostElement, p , a, P ,T, b, L, b1, e,  markDirty, t, defineComponent, renderComponent, m, V, v, r, s, ComponentDef} from '../../src/render3/index';
import { DirectiveType } from '../../src/render3/interfaces/definition';

interface Todo {
  text: string;
  completed: false;
}

describe('angular elements:', () => {

  class TodoApp {
    appTodos:Todo[];
    constructor(){}
    static ngComponentDef = defineComponent({
      type: TodoApp,
      tag: 'todo-app',
      //<h3>Todo App</h3>
      //<todo-list [todos]="appTodos"></todo-list>
      template(ctx:TodoApp, cm:boolean){
        if(cm){
          E(0, 'h3');
          {
            T(1, 'Todo App');
          }
          e();

          E(2, 'todo-list');
          e();
        }
        p(2, 'todos', b(ctx.appTodos))
      },
      factory(){
        return new TodoApp();
      }
    });
  }


  class TodoList {
    todos: Todo[]
    static ngComponentDef = defineComponent({
      type: TodoList,
      tag: 'todo-list',
      template(ctx:TodoList, cm:boolean){

      },
      factory(){
        return new TodoList();
      }
    })
  }

  [TodoList, TodoApp].forEach(type => {
    const Comp = registerComponent(type as any);
    customElements.define(Comp.is, Comp);
  });

  let container:HTMLElement | null
  let TodoAppEl:any;


  beforeEach(() => {
    container = document.createElement('some-box');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container!);
    container = null
  });

  describe('NgElement Todo App', () => {
    let app:HTMLElement;
    fit('should create a new instance of the TodoApp', () => {
      const TodoAppCtor = customElements.get('todo-app');

      app = new TodoAppCtor();
      container!.appendChild(app);

    });

  });
});
