/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * This indirection is needed to free up Component, etc symbols in the public API
 * to be used by the decorator versions of these annotations.
 */
var core_private_1 = require('../../core_private');
var lifecycle_annotations_impl_1 = require('./lifecycle_annotations_impl');
var lifecycle_annotations_impl_2 = require('./lifecycle_annotations_impl');
exports.routerCanDeactivate = lifecycle_annotations_impl_2.routerCanDeactivate;
exports.routerCanReuse = lifecycle_annotations_impl_2.routerCanReuse;
exports.routerOnActivate = lifecycle_annotations_impl_2.routerOnActivate;
exports.routerOnDeactivate = lifecycle_annotations_impl_2.routerOnDeactivate;
exports.routerOnReuse = lifecycle_annotations_impl_2.routerOnReuse;
/**
 * Defines route lifecycle hook `CanActivate`, which is called by the router to determine
 * if a component can be instantiated as part of a navigation.
 *
 * <aside class="is-right">
 * Note that unlike other lifecycle hooks, this one uses an annotation rather than an interface.
 * This is because the `CanActivate` function is called before the component is instantiated.
 * </aside>
 *
 * The `CanActivate` hook is called with two {@link ComponentInstruction}s as parameters, the first
 * representing the current route being navigated to, and the second parameter representing the
 * previous route or `null`.
 *
 * ```typescript
 * @CanActivate((next, prev) => boolean | Promise<boolean>)
 * ```
 *
 * If `CanActivate` returns or resolves to `false`, the navigation is cancelled.
 * If `CanActivate` throws or rejects, the navigation is also cancelled.
 * If `CanActivate` returns or resolves to `true`, navigation continues, the component is
 * instantiated, and the {@link OnActivate} hook of that component is called if implemented.
 *
 * ### Example
 *
 * {@example router_deprecated/ts/can_activate/can_activate_example.ts region='canActivate' }
 * @Annotation
 */
exports.CanActivate = core_private_1.makeDecorator(lifecycle_annotations_impl_1.CanActivate);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlmZWN5Y2xlX2Fubm90YXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9yb3V0ZXItZGVwcmVjYXRlZC9zcmMvbGlmZWN5Y2xlL2xpZmVjeWNsZV9hbm5vdGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUg7OztHQUdHO0FBRUgsNkJBQTRCLG9CQUFvQixDQUFDLENBQUE7QUFHakQsMkNBQW1ELDhCQUE4QixDQUFDLENBQUE7QUFFbEYsMkNBQXVHLDhCQUE4QixDQUFDO0FBQTlILCtFQUFtQjtBQUFFLHFFQUFjO0FBQUUseUVBQWdCO0FBQUUsNkVBQWtCO0FBQUUsbUVBQW1EO0FBR3RJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNRLG1CQUFXLEdBRUcsNEJBQWEsQ0FBQyx3Q0FBcUIsQ0FBQyxDQUFDIn0=