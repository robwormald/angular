/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, ReflectiveInjector, bootstrapModule, createPlatform} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BROWSER_DYNAMIC_PLATFORM_PROVIDERS} from '@angular/platform-browser-dynamic';

var appProviders: any[] = [];

// #docregion longform
@Component({selector: 'my-app', template: 'Hello World'})
class MyApp {
}

var platform =
    createPlatform(ReflectiveInjector.resolveAndCreate(BROWSER_DYNAMIC_PLATFORM_PROVIDERS));
bootstrapModule(MyApp, platform);
// #enddocregion
