import { ComponentRef } from '@angular/core';
export declare class LogService {
    logs: string[];
    addLog(message: string): void;
}
export declare class AppCmp {
    logService: LogService;
    constructor(logService: LogService);
}
export declare function main(): Promise<ComponentRef<AppCmp>>;
