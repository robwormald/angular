/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
/**
 * @module
 * @description
 * The `di` module provides dependency injection container services.
 */
var metadata_1 = require('./di/metadata');
exports.HostMetadata = metadata_1.HostMetadata;
exports.InjectMetadata = metadata_1.InjectMetadata;
exports.InjectableMetadata = metadata_1.InjectableMetadata;
exports.OptionalMetadata = metadata_1.OptionalMetadata;
exports.SelfMetadata = metadata_1.SelfMetadata;
exports.SkipSelfMetadata = metadata_1.SkipSelfMetadata;
// we have to reexport * because Dart and TS export two different sets of types
__export(require('./di/decorators'));
var forward_ref_1 = require('./di/forward_ref');
exports.forwardRef = forward_ref_1.forwardRef;
exports.resolveForwardRef = forward_ref_1.resolveForwardRef;
var injector_1 = require('./di/injector');
exports.Injector = injector_1.Injector;
var reflective_injector_1 = require('./di/reflective_injector');
exports.ReflectiveInjector = reflective_injector_1.ReflectiveInjector;
var provider_1 = require('./di/provider');
exports.Binding = provider_1.Binding;
exports.ProviderBuilder = provider_1.ProviderBuilder;
exports.bind = provider_1.bind;
exports.Provider = provider_1.Provider;
exports.provide = provider_1.provide;
var reflective_provider_1 = require('./di/reflective_provider');
exports.ResolvedReflectiveFactory = reflective_provider_1.ResolvedReflectiveFactory;
var reflective_key_1 = require('./di/reflective_key');
exports.ReflectiveKey = reflective_key_1.ReflectiveKey;
var reflective_exceptions_1 = require('./di/reflective_exceptions');
exports.NoProviderError = reflective_exceptions_1.NoProviderError;
exports.AbstractProviderError = reflective_exceptions_1.AbstractProviderError;
exports.CyclicDependencyError = reflective_exceptions_1.CyclicDependencyError;
exports.InstantiationError = reflective_exceptions_1.InstantiationError;
exports.InvalidProviderError = reflective_exceptions_1.InvalidProviderError;
exports.NoAnnotationError = reflective_exceptions_1.NoAnnotationError;
exports.OutOfBoundsError = reflective_exceptions_1.OutOfBoundsError;
var opaque_token_1 = require('./di/opaque_token');
exports.OpaqueToken = opaque_token_1.OpaqueToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvc3JjL2RpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7QUFFSDs7OztHQUlHO0FBRUgseUJBQWlILGVBQWUsQ0FBQztBQUF6SCwrQ0FBWTtBQUFFLG1EQUFjO0FBQUUsMkRBQWtCO0FBQUUsdURBQWdCO0FBQUUsK0NBQVk7QUFBRSx1REFBdUM7QUFHakksK0VBQStFO0FBQy9FLGlCQUFjLGlCQUFpQixDQUFDLEVBQUE7QUFFaEMsNEJBQTBELGtCQUFrQixDQUFDO0FBQXJFLDhDQUFVO0FBQUUsNERBQXlEO0FBRTdFLHlCQUF1QixlQUFlLENBQUM7QUFBL0IsdUNBQStCO0FBQ3ZDLG9DQUFpQywwQkFBMEIsQ0FBQztBQUFwRCxzRUFBb0Q7QUFDNUQseUJBQWdFLGVBQWUsQ0FBQztBQUF4RSxxQ0FBTztBQUFFLHFEQUFlO0FBQUUsK0JBQUk7QUFBRSx1Q0FBUTtBQUFFLHFDQUE4QjtBQUNoRixvQ0FBK0YsMEJBQTBCLENBQUM7QUFBdkYsb0ZBQXVGO0FBQzFILCtCQUE0QixxQkFBcUIsQ0FBQztBQUExQyx1REFBMEM7QUFDbEQsc0NBQTJKLDRCQUE0QixDQUFDO0FBQWhMLGtFQUFlO0FBQUUsOEVBQXFCO0FBQUUsOEVBQXFCO0FBQUUsd0VBQWtCO0FBQUUsNEVBQW9CO0FBQUUsc0VBQWlCO0FBQUUsb0VBQW9EO0FBQ3hMLDZCQUEwQixtQkFBbUIsQ0FBQztBQUF0QyxpREFBc0MifQ==