/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {analyzeAppProvidersForDeprecatedConfiguration} from '@angular/compiler';
import {CompilerFactory, NgModule, OpaqueToken, PLATFORM_CORE_PROVIDERS, PLATFORM_INITIALIZER, PlatformRef, ReflectiveInjector, assertPlatform, createPlatform, createPlatformFactory, getPlatform} from '@angular/core';
import {initTestEnvironment} from '@angular/core/testing';
import {BROWSER_DYNAMIC_TEST_COMPILER_FACTORY, BrowserDynamicTestModule, TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS} from '@angular/platform-browser-dynamic/testing';

import {Console} from '../core_private';
import {Parse5DomAdapter} from '../src/parse5_adapter';

function initServerTests() {
  Parse5DomAdapter.makeCurrent();
}

const SERVER_TEST_PLATFORM_PROVIDERS: Array<any /*Type | Provider | any[]*/> =
    /*@ts2dart_const*/[
      PLATFORM_CORE_PROVIDERS,
      /*@ts2dart_Provider*/ {provide: PLATFORM_INITIALIZER, useValue: initServerTests, multi: true},
      {provide: CompilerFactory, useValue: BROWSER_DYNAMIC_TEST_COMPILER_FACTORY},
    ];

/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
export const serverTestPlatform =
    createPlatformFactory('serverTest', SERVER_TEST_PLATFORM_PROVIDERS);

/**
 * NgModule for testing.
 *
 * @stable
 */
@NgModule({exports: [BrowserDynamicTestModule]})
export class ServerTestModule {
}

/**
 * @deprecated Use initTestEnvironment with serverTestPlatform instead.
 */
export const TEST_SERVER_PLATFORM_PROVIDERS: Array<any /*Type | Provider | any[]*/> =
    // Note: This is not a real provider but a hack to still support the deprecated
    // `setBaseTestProviders` method!
    [(appProviders: any[]) => {
      const deprecatedConfiguration = analyzeAppProvidersForDeprecatedConfiguration(appProviders);
      const platformRef = createPlatform(ReflectiveInjector.resolveAndCreate([
        SERVER_TEST_PLATFORM_PROVIDERS, {
          provide: CompilerFactory,
          useValue: BROWSER_DYNAMIC_TEST_COMPILER_FACTORY.withDefaults(
              deprecatedConfiguration.compilerOptions)
        }
      ]));

      @NgModule(
          {exports: [ServerTestModule], declarations: [deprecatedConfiguration.moduleDeclarations]})
      class DynamicTestModule {
      }

      const testInjector = initTestEnvironment(DynamicTestModule, platformRef);
      const console: Console = testInjector.get(Console);
      deprecatedConfiguration.deprecationMessages.forEach((msg) => console.warn(msg));
    }];

/**
 * @deprecated Use initTestEnvironment with ServerTestModule instead.
 */
export const TEST_SERVER_APPLICATION_PROVIDERS: Array<any /*Type | Provider | any[]*/> = [];
