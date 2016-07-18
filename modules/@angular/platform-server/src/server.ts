/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {PlatformLocation} from '@angular/common';
import {analyzeAppProvidersForDeprecatedConfiguration} from '@angular/compiler';
import {ApplicationRef, CompilerFactory, ComponentRef, NgModule, OpaqueToken, PLATFORM_CORE_PROVIDERS, PLATFORM_INITIALIZER, PlatformRef, ReflectiveInjector, Type, assertPlatform, bootstrapModule, createPlatform, createPlatformFactory, getPlatform} from '@angular/core';
import {BROWSER_DYNAMIC_TEST_COMPILER_FACTORY, BrowserDynamicTestModule} from '@angular/platform-browser-dynamic/testing';

import {Console, ReflectionCapabilities, reflector, wtfInit} from '../core_private';

import {ConcreteType} from './facade/lang';
import {Parse5DomAdapter} from './parse5_adapter';

function notSupported(feature: string): Error {
  throw new Error(`platform-server does not support '${feature}'.`);
}

class ServerPlatformLocation extends PlatformLocation {
  getBaseHrefFromDOM(): string { throw notSupported('getBaseHrefFromDOM'); };
  onPopState(fn: any): void { notSupported('onPopState'); };
  onHashChange(fn: any): void { notSupported('onHashChange'); };
  get pathname(): string { throw notSupported('pathname'); }
  get search(): string { throw notSupported('search'); }
  get hash(): string { throw notSupported('hash'); }
  replaceState(state: any, title: string, url: string): void { notSupported('replaceState'); };
  pushState(state: any, title: string, url: string): void { notSupported('pushState'); };
  forward(): void { notSupported('forward'); };
  back(): void { notSupported('back'); };
}

/**
 * A set of providers to initialize the Angular platform in a server.
 *
 * Used automatically by `serverBootstrap`, or can be passed to `platform`.
 * @experimental
 */
export const SERVER_PLATFORM_PROVIDERS: Array<any /*Type | Provider | any[]*/> = [
  PLATFORM_CORE_PROVIDERS,
  {provide: PLATFORM_INITIALIZER, useValue: initParse5Adapter, multi: true},
  {provide: PlatformLocation, useClass: ServerPlatformLocation},
];

const SERVER_DYNAMIC_PROVIDERS: any[] = [
  SERVER_PLATFORM_PROVIDERS,
  {provide: CompilerFactory, useValue: BROWSER_DYNAMIC_TEST_COMPILER_FACTORY},
];


function initParse5Adapter() {
  Parse5DomAdapter.makeCurrent();
  wtfInit();
}

/**
 * @experimental
 */
export const serverPlatform = createPlatformFactory('server', SERVER_PLATFORM_PROVIDERS);

/**
 * The server platform that supports the runtime compiler.
 *
 * @experimental
 */
export const serverDynamicPlatform =
    createPlatformFactory('serverDynamic', SERVER_DYNAMIC_PROVIDERS);

/**
 * Used to bootstrap Angular in server environment (such as node).
 *
 * This version of bootstrap only creates platform injector and does not define anything for
 * application injector. It is expected that application providers are imported from other
 * packages such as `@angular/platform-browser` or `@angular/platform-browser-dynamic`.
 *
 * ```
 * import {BROWSER_APP_PROVIDERS} from '@angular/platform-browser';
 * import {BROWSER_APP_COMPILER_PROVIDERS} from '@angular/platform-browser-dynamic';
 *
 * serverBootstrap(..., [BROWSER_APP_PROVIDERS, BROWSER_APP_COMPILER_PROVIDERS])
 * ```
 *
 * @deprecated create an {@link NgModule} and use {@link bootstrapModule} with the {@link
 * serverDynamicPlatform}()
 * instead.
 */
export function serverBootstrap<T>(
    appComponentType: ConcreteType<T>,
    customProviders: Array<any /*Type | Provider | any[]*/>): Promise<ComponentRef<T>> {
  console.warn(
      'serverBootstrap is deprecated. Create an @NgModule and use `bootstrapModule` with the `serverDynamicPlatform()` instead.');
  reflector.reflectionCapabilities = new ReflectionCapabilities();

  const deprecatedConfiguration = analyzeAppProvidersForDeprecatedConfiguration(customProviders);
  const compilerOptions = CompilerFactory.mergeOptions(deprecatedConfiguration.compilerOptions);
  const declarations = [deprecatedConfiguration.moduleDeclarations.concat([appComponentType])];

  @NgModule({
    providers: customProviders,
    declarations: declarations,
    imports: [BrowserDynamicTestModule],
    precompile: [appComponentType]
  })
  class DynamicModule {
  }

  return bootstrapModule(DynamicModule, serverDynamicPlatform(), compilerOptions)
      .then((moduleRef) => {
        const console = moduleRef.injector.get(Console);
        deprecatedConfiguration.deprecationMessages.forEach((msg) => console.warn(msg));
        const appRef: ApplicationRef = moduleRef.injector.get(ApplicationRef);
        return appRef.bootstrap(appComponentType);
      });
}
