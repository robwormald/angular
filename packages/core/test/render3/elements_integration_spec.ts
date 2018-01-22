/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {defineNgElement} from '../../src/render3/ng_element';
import {E, getHostElement, p , a, P ,T, b, l, L, b1, e,  markDirty, t, defineComponent, renderComponent, m, V, v, r, s, ComponentDef} from '../../src/render3/index';
import { DirectiveType } from '../../src/render3/interfaces/definition';


//Todo App Fixture



describe('angular elements:', () => {

  class TodoApp {

    constructor(){
      console.log('todo app constructor')
    }

    createTodo(event:CustomEvent){
      console.log('creating!')
    }
    static ngComponentDef = defineComponent({
      tag: 'todo-app',
      //<h3>Todo App</h3>
      //<todo-input (create)="createTodo($event)"></todo-input>
      //<todo-list></todo-list>
      template(ctx:TodoApp, cm:boolean){
        if(cm){
          E(0, 'h3');
          {
            T(1, 'Todo App');
          }
          e();
          E(2, 'todo-input');
           L('create', ctx.createTodo.bind(ctx));
          e();
          E(3, 'todo-list');
          e();
          E(4, 'button');
            L('click', ctx.createTodo.bind(ctx));
          e();
        }

      },
      factory(){
        return new TodoApp();
      }
    });
  }

  class TodoInput {
    static ngComponentDef = defineComponent({
      tag: 'todo-input',
      template(ctx:TodoInput, cm:boolean){

      },
      factory(){
        return new TodoInput();
      }
    })
  }

  class TodoItem {
    static ngComponentDef = defineComponent({
      tag: 'todo-item',
      template(ctx:TodoInput, cm:boolean){

      },
      factory(){
        return new TodoInput();
      }
    })
  }

  class TodoList {
    static ngComponentDef = defineComponent({
      tag: 'todo-list',
      template(ctx:TodoList, cm:boolean){

      },
      factory(){
        return new TodoList();
      }
    })
  }

  [TodoInput, TodoList, TodoItem, TodoApp].forEach(type => {
    const Comp = defineNgElement(type as any);
    console.log(Comp.is)
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
    it('should create a new instance of the TodoApp', () => {
      const TodoAppCtor = customElements.get('todo-app');

      app = new TodoAppCtor();

      console.log(app)
      container!.appendChild(app);

      expect(app).toBeDefined();
     // expect(app.querySelector('todo-list')).toBeDefined();
    //expect(app.querySelector('button')).toBeDefined();
      //(app.querySelector('button') as HTMLButtonElement).click();

    });

  });
});
