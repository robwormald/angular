import { ComponentFixture, TestComponentBuilder } from '@angular/core/testing';
/**
 * Router test helpers and fixtures
 */
export declare class RootCmp {
    name: string;
    activatedCmp: any;
}
export declare function compile(tcb: TestComponentBuilder, template?: string): Promise<ComponentFixture<RootCmp>>;
export declare var TEST_ROUTER_PROVIDERS: any[];
export declare function clickOnElement(anchorEl: any): any;
export declare function getHref(elt: any): string;
export declare var specs: {};
export declare function describeRouter(description: string, fn: Function, exclusive?: boolean): void;
export declare function ddescribeRouter(description: string, fn: Function, exclusive?: boolean): void;
export declare function describeWithAndWithout(description: string, fn: Function): void;
export declare function describeWith(description: string, fn: Function): void;
export declare function describeWithout(description: string, fn: Function): void;
export declare function itShouldRoute(): void;
