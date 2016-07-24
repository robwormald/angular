/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var application_ref_1 = require('./application_ref');
var console_1 = require('./console');
var reflection_1 = require('./reflection/reflection');
var reflector_reader_1 = require('./reflection/reflector_reader');
var testability_1 = require('./testability/testability');
function _reflector() {
    return reflection_1.reflector;
}
var __unused; // prevent missing use Dart warning.
/**
 * A default set of providers which should be included in any Angular platform.
 * @experimental
 */
exports.PLATFORM_CORE_PROVIDERS = [
    application_ref_1.PlatformRef_, { provide: application_ref_1.PlatformRef, useExisting: application_ref_1.PlatformRef_ },
    { provide: reflection_1.Reflector, useFactory: _reflector, deps: [] },
    { provide: reflector_reader_1.ReflectorReader, useExisting: reflection_1.Reflector }, testability_1.TestabilityRegistry, console_1.Console
];
/**
 * A default set of providers which should be included in any Angular platform.
 *
 * @deprecated Use PLATFORM_CORE_PROVIDERS instead!
 */
exports.PLATFORM_COMMON_PROVIDERS = exports.PLATFORM_CORE_PROVIDERS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fY29yZV9wcm92aWRlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvc3JjL3BsYXRmb3JtX2NvcmVfcHJvdmlkZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFJSCxnQ0FBd0MsbUJBQW1CLENBQUMsQ0FBQTtBQUM1RCx3QkFBc0IsV0FBVyxDQUFDLENBQUE7QUFFbEMsMkJBQW1DLHlCQUF5QixDQUFDLENBQUE7QUFDN0QsaUNBQThCLCtCQUErQixDQUFDLENBQUE7QUFDOUQsNEJBQWtDLDJCQUEyQixDQUFDLENBQUE7QUFFOUQ7SUFDRSxNQUFNLENBQUMsc0JBQVMsQ0FBQztBQUNuQixDQUFDO0FBRUQsSUFBSSxRQUFjLENBQUMsQ0FBRSxvQ0FBb0M7QUFFekQ7OztHQUdHO0FBQ1UsK0JBQXVCLEdBQW1DO0lBQ3JFLDhCQUFZLEVBQUUsRUFBQyxPQUFPLEVBQUUsNkJBQVcsRUFBRSxXQUFXLEVBQUUsOEJBQVksRUFBQztJQUMvRCxFQUFDLE9BQU8sRUFBRSxzQkFBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQztJQUN0RCxFQUFDLE9BQU8sRUFBRSxrQ0FBZSxFQUFFLFdBQVcsRUFBRSxzQkFBUyxFQUFDLEVBQUUsaUNBQW1CLEVBQUUsaUJBQU87Q0FDakYsQ0FBQztBQUVGOzs7O0dBSUc7QUFDVSxpQ0FBeUIsR0FBRywrQkFBdUIsQ0FBQyJ9