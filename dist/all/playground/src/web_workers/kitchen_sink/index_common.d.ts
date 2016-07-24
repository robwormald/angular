export declare class GreetingService {
    greeting: string;
}
export declare class HelloCmp {
    greeting: string;
    lastKey: string;
    constructor(service: GreetingService);
    changeGreeting(): void;
    onKeyDown(event: any): void;
}
