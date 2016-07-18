/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Type} from '../src/facade/lang';

import {PlatformRef, PlatformRef_} from './application_ref';
import {Console} from './console';
import {Provider} from './di';
import {Reflector, reflector} from './reflection/reflection';
import {ReflectorReader} from './reflection/reflector_reader';
import {TestabilityRegistry} from './testability/testability';

function _reflector(): Reflector {
  return reflector;
}

var __unused: Type;  // prevent missing use Dart warning.

/**
 * A default set of providers which should be included in any Angular platform.
 * @experimental
 */
export const PLATFORM_CORE_PROVIDERS: Array<any|Type|Provider|any[]> = [
  PlatformRef_, {provide: PlatformRef, useExisting: PlatformRef_},
  {provide: Reflector, useFactory: _reflector, deps: []},
  {provide: ReflectorReader, useExisting: Reflector}, TestabilityRegistry, Console
];

/**
 * A default set of providers which should be included in any Angular platform.
 *
 * @deprecated Use PLATFORM_CORE_PROVIDERS instead!
 */
export const PLATFORM_COMMON_PROVIDERS = PLATFORM_CORE_PROVIDERS;
