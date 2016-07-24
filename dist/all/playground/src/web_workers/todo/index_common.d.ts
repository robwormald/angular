import { Store, Todo, TodoFactory } from './services/TodoStore';
export declare class TodoApp {
    todoStore: Store;
    factory: TodoFactory;
    todoEdit: Todo;
    inputValue: string;
    hideActive: boolean;
    hideCompleted: boolean;
    isComplete: boolean;
    constructor(todoStore: Store, factory: TodoFactory);
    enterTodo(): void;
    doneEditing($event: any, todo: Todo): void;
    editTodo(todo: Todo): void;
    addTodo(newTitle: string): void;
    completeMe(todo: Todo): void;
    toggleCompleted(): void;
    toggleActive(): void;
    showAll(): void;
    deleteMe(todo: Todo): void;
    toggleAll($event: any): void;
    clearCompleted(): void;
}
