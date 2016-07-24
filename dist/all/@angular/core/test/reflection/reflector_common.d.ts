export declare class ClassDecoratorMeta {
    value: any;
    constructor(value: any);
}
export declare class ParamDecoratorMeta {
    value: any;
    constructor(value: any);
}
export declare class PropDecoratorMeta {
    value: any;
    constructor(value: any);
}
export declare function classDecorator(value: any): ClassDecoratorMeta;
export declare function paramDecorator(value: any): ParamDecoratorMeta;
export declare function propDecorator(value: any): PropDecoratorMeta;
/** @Annotation */ export declare var ClassDecorator: (...args: any[]) => (cls: any) => any;
/** @Annotation */ export declare var ParamDecorator: any;
/** @Annotation */ export declare var PropDecorator: any;
export declare class HasGetterAndSetterDecorators {
}
