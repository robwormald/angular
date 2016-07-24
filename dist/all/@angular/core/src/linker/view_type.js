/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
(function (ViewType) {
    // A view that contains the host element with bound component directive.
    // Contains a COMPONENT view
    ViewType[ViewType["HOST"] = 0] = "HOST";
    // The view of the component
    // Can contain 0 to n EMBEDDED views
    ViewType[ViewType["COMPONENT"] = 1] = "COMPONENT";
    // A view that is embedded into another View via a <template> element
    // inside of a COMPONENT view
    ViewType[ViewType["EMBEDDED"] = 2] = "EMBEDDED";
})(exports.ViewType || (exports.ViewType = {}));
var ViewType = exports.ViewType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld190eXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3NyYy9saW5rZXIvdmlld190eXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxXQUFZLFFBQVE7SUFDbEIsd0VBQXdFO0lBQ3hFLDRCQUE0QjtJQUM1Qix1Q0FBSSxDQUFBO0lBQ0osNEJBQTRCO0lBQzVCLG9DQUFvQztJQUNwQyxpREFBUyxDQUFBO0lBQ1QscUVBQXFFO0lBQ3JFLDZCQUE2QjtJQUM3QiwrQ0FBUSxDQUFBO0FBQ1YsQ0FBQyxFQVZXLGdCQUFRLEtBQVIsZ0JBQVEsUUFVbkI7QUFWRCxJQUFZLFFBQVEsR0FBUixnQkFVWCxDQUFBIn0=