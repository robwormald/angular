/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ApplicationRef } from '@angular/core';
import { Start } from './components/start';
import { Router } from '@angular/router';
export declare class App {
    constructor(router: Router);
}
export declare const ROUTES: {
    path: string;
    component: typeof Start;
}[];
export declare class AppModule {
    constructor(appRef: ApplicationRef);
}
