import { Predicate } from '@angular/core/src/facade/collection';
export declare class KeyModel {
    key: number;
    constructor(key: number);
}
export declare class Todo extends KeyModel {
    title: string;
    completed: boolean;
    editTitle: string;
    constructor(key: number, title: string, completed: boolean);
}
export declare class TodoFactory {
    _uid: number;
    nextUid(): number;
    create(title: string, isCompleted: boolean): Todo;
}
export declare class Store {
    list: KeyModel[];
    add(record: KeyModel): void;
    remove(record: KeyModel): void;
    removeBy(callback: Predicate<KeyModel>): void;
    private _spliceOut(record);
    private _indexFor(record);
}
