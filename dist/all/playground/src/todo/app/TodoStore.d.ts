import { Predicate } from '@angular/core/src/facade/collection';
export declare abstract class KeyModel {
    key: number;
    constructor(key: number);
}
export declare class Todo extends KeyModel {
    title: string;
    completed: boolean;
    constructor(key: number, title: string, completed: boolean);
}
export declare class TodoFactory {
    _uid: number;
    nextUid(): number;
    create(title: string, isCompleted: boolean): Todo;
}
export declare class Store<T extends KeyModel> {
    list: T[];
    add(record: T): void;
    remove(record: T): void;
    removeBy(callback: Predicate<T>): void;
    private _spliceOut(record);
    private _indexFor(record);
}
