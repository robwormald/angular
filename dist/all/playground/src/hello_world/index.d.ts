import { Renderer, ElementRef } from '@angular/core';
export declare function main(): void;
export declare class GreetingService {
    greeting: string;
}
export declare class RedDec {
    constructor(el: ElementRef, renderer: Renderer);
}
export declare class HelloCmp {
    greeting: string;
    constructor(service: GreetingService);
    changeGreeting(): void;
}
