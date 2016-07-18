/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {LocationStrategy} from '@angular/common';
import {APP_ID, NgModule, NgZone, OpaqueToken, PLATFORM_CORE_PROVIDERS, PLATFORM_INITIALIZER, PlatformRef, ReflectiveInjector, assertPlatform, createPlatform, createPlatformFactory, getPlatform} from '@angular/core';

import {BrowserModule} from '../src/browser';
import {BrowserDomAdapter} from '../src/browser/browser_adapter';
import {AnimationDriver} from '../src/dom/animation_driver';
import {ELEMENT_PROBE_PROVIDERS} from '../src/dom/debug/ng_probe';

import {BrowserDetection} from './browser_util';

function initBrowserTests() {
  BrowserDomAdapter.makeCurrent();
  BrowserDetection.setup();
}

function createNgZone(): NgZone {
  return new NgZone({enableLongStackTrace: true});
}

/**
 * Providers for the browser test platform
 *
 * @experimental
 */
export const TEST_BROWSER_PLATFORM_PROVIDERS: Array<any /*Type | Provider | any[]*/> = [
  PLATFORM_CORE_PROVIDERS,
  {provide: PLATFORM_INITIALIZER, useValue: initBrowserTests, multi: true}
];

/**
 * @deprecated Use initTestEnvironment with BrowserTestModule instead.
 */
export const TEST_BROWSER_APPLICATION_PROVIDERS: Array<any /*Type | Provider | any[]*/> = [];

/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export const browserTestPlatform =
    createPlatformFactory('browserTest', TEST_BROWSER_PLATFORM_PROVIDERS);

/**
 * NgModule for testing.
 *
 * @stable
 */
@NgModule({
  exports: [BrowserModule],
  providers: [
    {provide: APP_ID, useValue: 'a'}, ELEMENT_PROBE_PROVIDERS,
    {provide: NgZone, useFactory: createNgZone},
    {provide: AnimationDriver, useValue: AnimationDriver.NOOP}
  ]
})
export class BrowserTestModule {
}
