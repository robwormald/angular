import { PipeTransform } from '@angular/core';
export declare class PipeNeedsService implements PipeTransform {
    service: any;
    constructor(service: any);
    transform(value: any): any;
}
export declare class DuplicatePipe1 implements PipeTransform {
    transform(value: any): any;
}
export declare class DuplicatePipe2 implements PipeTransform {
    transform(value: any): any;
}
export declare function main(): void;
