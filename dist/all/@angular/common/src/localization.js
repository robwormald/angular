/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * @experimental
 */
var NgLocalization = (function () {
    function NgLocalization() {
    }
    return NgLocalization;
}());
exports.NgLocalization = NgLocalization;
/**
 * Returns the plural category for a given value.
 * - "=value" when the case exists,
 * - the plural category otherwise
 *
 * @internal
 */
function getPluralCategory(value, cases, ngLocalization) {
    var nbCase = "=" + value;
    return cases.indexOf(nbCase) > -1 ? nbCase : ngLocalization.getPluralCategory(value);
}
exports.getPluralCategory = getPluralCategory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vc3JjL2xvY2FsaXphdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUg7O0dBRUc7QUFDSDtJQUFBO0lBQXVGLENBQUM7SUFBRCxxQkFBQztBQUFELENBQUMsQUFBeEYsSUFBd0Y7QUFBbEUsc0JBQWMsaUJBQW9ELENBQUE7QUFFeEY7Ozs7OztHQU1HO0FBQ0gsMkJBQ0ksS0FBYSxFQUFFLEtBQWUsRUFBRSxjQUE4QjtJQUNoRSxJQUFNLE1BQU0sR0FBRyxNQUFJLEtBQU8sQ0FBQztJQUUzQixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZGLENBQUM7QUFMZSx5QkFBaUIsb0JBS2hDLENBQUEifQ==