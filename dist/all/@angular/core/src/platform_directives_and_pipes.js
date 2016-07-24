/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var di_1 = require('./di');
/**
  * A token that can be provided when bootstrapping an application to make an array of directives
  * available in every component of the application.
  *
  * ### Example
  *
  * ```typescript
  * import {PLATFORM_DIRECTIVES} from '@angular/core';
  * import {OtherDirective} from './myDirectives';
  *
  * @Component({
  *   selector: 'my-component',
  *   template: `
  *     <!-- can use other directive even though the component does not list it in `directives` -->
  *     <other-directive></other-directive>
  *   `
  * })
  * export class MyComponent {
  *   ...
  * }
  *
  * bootstrap(MyComponent, [{provide: PLATFORM_DIRECTIVES, useValue: [OtherDirective],
  multi:true}]);
  * ```
  *
  * @deprecated Providing platform directives via a provider is deprecated. Provide platform
  * directives via an {@link NgModule} instead.
  */
exports.PLATFORM_DIRECTIVES = 
/*@ts2dart_const*/ new di_1.OpaqueToken('Platform Directives');
/**
  * A token that can be provided when bootstraping an application to make an array of pipes
  * available in every component of the application.
  *
  * ### Example
  *
  * ```typescript
  * import {PLATFORM_PIPES} from '@angular/core';
  * import {OtherPipe} from './myPipe';
  *
  * @Component({
  *   selector: 'my-component',
  *   template: `
  *     {{123 | other-pipe}}
  *   `
  * })
  * export class MyComponent {
  *   ...
  * }
  *
  * bootstrap(MyComponent, [{provide: PLATFORM_PIPES, useValue: [OtherPipe], multi:true}]);
  * ```
  *
  * @deprecated Providing platform pipes via a provider is deprecated. Provide platform pipes via an
  * {@link NgModule} instead.
  */
exports.PLATFORM_PIPES = new di_1.OpaqueToken('Platform Pipes');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGxhdGZvcm1fZGlyZWN0aXZlc19hbmRfcGlwZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvc3JjL3BsYXRmb3JtX2RpcmVjdGl2ZXNfYW5kX3BpcGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxtQkFBMEIsTUFBTSxDQUFDLENBQUE7QUFFakM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTJCSTtBQUNTLDJCQUFtQjtBQUM1QixrQkFBa0IsQ0FBQyxJQUFJLGdCQUFXLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUU5RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXlCSTtBQUNTLHNCQUFjLEdBQW1DLElBQUksZ0JBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDIn0=