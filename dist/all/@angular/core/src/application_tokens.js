/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var lang_1 = require('../src/facade/lang');
var di_1 = require('./di');
/**
 * A DI Token representing a unique string id assigned to the application by Angular and used
 * primarily for prefixing application attributes and CSS styles when
 * {@link ViewEncapsulation#Emulated} is being used.
 *
 * If you need to avoid randomly generated value to be used as an application id, you can provide
 * a custom value via a DI provider <!-- TODO: provider --> configuring the root {@link Injector}
 * using this token.
 * @experimental
 */
exports.APP_ID = new di_1.OpaqueToken('AppId');
function _appIdRandomProviderFactory() {
    return "" + _randomChar() + _randomChar() + _randomChar();
}
exports._appIdRandomProviderFactory = _appIdRandomProviderFactory;
/**
 * Providers that will generate a random APP_ID_TOKEN.
 * @experimental
 */
exports.APP_ID_RANDOM_PROVIDER = 
/*@ts2dart_const*/ /* @ts2dart_Provider */ {
    provide: exports.APP_ID,
    useFactory: _appIdRandomProviderFactory,
    deps: []
};
function _randomChar() {
    return lang_1.StringWrapper.fromCharCode(97 + lang_1.Math.floor(lang_1.Math.random() * 25));
}
/**
 * A function that will be executed when a platform is initialized.
 * @experimental
 */
exports.PLATFORM_INITIALIZER = 
/*@ts2dart_const*/ new di_1.OpaqueToken('Platform Initializer');
/**
 * A function that will be executed when an application is initialized.
 * @experimental
 */
exports.APP_INITIALIZER = 
/*@ts2dart_const*/ new di_1.OpaqueToken('Application Initializer');
/**
 * A token which indicates the root directory of the application
 * @experimental
 */
exports.PACKAGE_ROOT_URL = 
/*@ts2dart_const*/ new di_1.OpaqueToken('Application Packages Root URL');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25fdG9rZW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3NyYy9hcHBsaWNhdGlvbl90b2tlbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUFrQyxvQkFBb0IsQ0FBQyxDQUFBO0FBRXZELG1CQUEwQixNQUFNLENBQUMsQ0FBQTtBQUdqQzs7Ozs7Ozs7O0dBU0c7QUFDVSxjQUFNLEdBQTJCLElBQUksZ0JBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUV2RTtJQUNFLE1BQU0sQ0FBQyxLQUFHLFdBQVcsRUFBRSxHQUFHLFdBQVcsRUFBRSxHQUFHLFdBQVcsRUFBSSxDQUFDO0FBQzVELENBQUM7QUFGZSxtQ0FBMkIsOEJBRTFDLENBQUE7QUFFRDs7O0dBR0c7QUFDVSw4QkFBc0I7QUFDL0Isa0JBQWtCLENBQUMsdUJBQXVCLENBQUM7SUFDekMsT0FBTyxFQUFFLGNBQU07SUFDZixVQUFVLEVBQUUsMkJBQTJCO0lBQ3ZDLElBQUksRUFBUyxFQUFFO0NBQ2hCLENBQUM7QUFFTjtJQUNFLE1BQU0sQ0FBQyxvQkFBYSxDQUFDLFlBQVksQ0FBQyxFQUFFLEdBQUcsV0FBSSxDQUFDLEtBQUssQ0FBQyxXQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBRUQ7OztHQUdHO0FBQ1UsNEJBQW9CO0FBQzdCLGtCQUFrQixDQUFDLElBQUksZ0JBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRS9EOzs7R0FHRztBQUNVLHVCQUFlO0FBQ3hCLGtCQUFrQixDQUFDLElBQUksZ0JBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRWxFOzs7R0FHRztBQUNVLHdCQUFnQjtBQUN6QixrQkFBa0IsQ0FBQyxJQUFJLGdCQUFXLENBQUMsK0JBQStCLENBQUMsQ0FBQyJ9