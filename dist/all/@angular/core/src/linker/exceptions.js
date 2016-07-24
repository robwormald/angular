/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var change_detection_util_1 = require('../change_detection/change_detection_util');
var exceptions_1 = require('../facade/exceptions');
/**
 * An error thrown if application changes model breaking the top-down data flow.
 *
 * This exception is only thrown in dev mode.
 *
 * <!-- TODO: Add a link once the dev mode option is configurable -->
 *
 * ### Example
 *
 * ```typescript
 * @Component({
 *   selector: 'parent',
 *   template: `
 *     <child [prop]="parentProp"></child>
 *   `,
 *   directives: [forwardRef(() => Child)]
 * })
 * class Parent {
 *   parentProp = "init";
 * }
 *
 * @Directive({selector: 'child', inputs: ['prop']})
 * class Child {
 *   constructor(public parent: Parent) {}
 *
 *   set prop(v) {
 *     // this updates the parent property, which is disallowed during change detection
 *     // this will result in ExpressionChangedAfterItHasBeenCheckedException
 *     this.parent.parentProp = "updated";
 *   }
 * }
 * ```
 * @stable
 */
var ExpressionChangedAfterItHasBeenCheckedException = (function (_super) {
    __extends(ExpressionChangedAfterItHasBeenCheckedException, _super);
    function ExpressionChangedAfterItHasBeenCheckedException(oldValue, currValue, context) {
        var msg = "Expression has changed after it was checked. Previous value: '" + oldValue + "'. Current value: '" + currValue + "'.";
        if (oldValue === change_detection_util_1.UNINITIALIZED) {
            msg +=
                " It seems like the view has been created after its parent and its children have been dirty checked." +
                    " Has it been created in a change detection hook ?";
        }
        _super.call(this, msg);
    }
    return ExpressionChangedAfterItHasBeenCheckedException;
}(exceptions_1.BaseException));
exports.ExpressionChangedAfterItHasBeenCheckedException = ExpressionChangedAfterItHasBeenCheckedException;
/**
 * Thrown when an exception was raised during view creation, change detection or destruction.
 *
 * This error wraps the original exception to attach additional contextual information that can
 * be useful for debugging.
 * @stable
 */
var ViewWrappedException = (function (_super) {
    __extends(ViewWrappedException, _super);
    function ViewWrappedException(originalException, originalStack, context) {
        _super.call(this, "Error in " + context.source, originalException, originalStack, context);
    }
    return ViewWrappedException;
}(exceptions_1.WrappedException));
exports.ViewWrappedException = ViewWrappedException;
/**
 * Thrown when a destroyed view is used.
 *
 * This error indicates a bug in the framework.
 *
 * This is an internal Angular error.
 * @stable
 */
var ViewDestroyedException = (function (_super) {
    __extends(ViewDestroyedException, _super);
    function ViewDestroyedException(details) {
        _super.call(this, "Attempt to use a destroyed view: " + details);
    }
    return ViewDestroyedException;
}(exceptions_1.BaseException));
exports.ViewDestroyedException = ViewDestroyedException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS9zcmMvbGlua2VyL2V4Y2VwdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBRUgsc0NBQTRCLDJDQUEyQyxDQUFDLENBQUE7QUFDeEUsMkJBQThDLHNCQUFzQixDQUFDLENBQUE7QUFHckU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQUNIO0lBQXFFLG1FQUFhO0lBQ2hGLHlEQUFZLFFBQWEsRUFBRSxTQUFjLEVBQUUsT0FBWTtRQUNyRCxJQUFJLEdBQUcsR0FDSCxtRUFBaUUsUUFBUSwyQkFBc0IsU0FBUyxPQUFJLENBQUM7UUFDakgsRUFBRSxDQUFDLENBQUMsUUFBUSxLQUFLLHFDQUFhLENBQUMsQ0FBQyxDQUFDO1lBQy9CLEdBQUc7Z0JBQ0MscUdBQXFHO29CQUNyRyxtREFBbUQsQ0FBQztRQUMxRCxDQUFDO1FBQ0Qsa0JBQU0sR0FBRyxDQUFDLENBQUM7SUFDYixDQUFDO0lBQ0gsc0RBQUM7QUFBRCxDQUFDLEFBWEQsQ0FBcUUsMEJBQWEsR0FXakY7QUFYWSx1REFBK0Msa0RBVzNELENBQUE7QUFFRDs7Ozs7O0dBTUc7QUFDSDtJQUEwQyx3Q0FBZ0I7SUFDeEQsOEJBQVksaUJBQXNCLEVBQUUsYUFBa0IsRUFBRSxPQUFZO1FBQ2xFLGtCQUFNLGNBQVksT0FBTyxDQUFDLE1BQVEsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakYsQ0FBQztJQUNILDJCQUFDO0FBQUQsQ0FBQyxBQUpELENBQTBDLDZCQUFnQixHQUl6RDtBQUpZLDRCQUFvQix1QkFJaEMsQ0FBQTtBQUVEOzs7Ozs7O0dBT0c7QUFDSDtJQUE0QywwQ0FBYTtJQUN2RCxnQ0FBWSxPQUFlO1FBQUksa0JBQU0sc0NBQW9DLE9BQVMsQ0FBQyxDQUFDO0lBQUMsQ0FBQztJQUN4Riw2QkFBQztBQUFELENBQUMsQUFGRCxDQUE0QywwQkFBYSxHQUV4RDtBQUZZLDhCQUFzQix5QkFFbEMsQ0FBQSJ9