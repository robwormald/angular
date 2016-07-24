/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
// =================================================================================================
// =================================================================================================
// =========== S T O P   -  S T O P   -  S T O P   -  S T O P   -  S T O P   -  S T O P  ===========
// =================================================================================================
// =================================================================================================
//
//        DO NOT EDIT THIS LIST OF SECURITY SENSITIVE PROPERTIES WITHOUT A SECURITY REVIEW!
//                               Reach out to mprobst for details.
//
// =================================================================================================
/** Map from tagName|propertyName SecurityContext. Properties applying to all tags use '*'. */
exports.SECURITY_SCHEMA = {};
function registerContext(ctx, specs) {
    for (var _i = 0, specs_1 = specs; _i < specs_1.length; _i++) {
        var spec = specs_1[_i];
        exports.SECURITY_SCHEMA[spec.toLowerCase()] = ctx;
    }
}
// Case is insignificant below, all element and attribute names are lower-cased for lookup.
registerContext(core_1.SecurityContext.HTML, [
    'iframe|srcdoc',
    '*|innerHTML',
    '*|outerHTML',
]);
registerContext(core_1.SecurityContext.STYLE, ['*|style']);
// NB: no SCRIPT contexts here, they are never allowed due to the parser stripping them.
registerContext(core_1.SecurityContext.URL, [
    '*|formAction', 'area|href', 'area|ping', 'audio|src', 'a|href',
    'a|ping', 'blockquote|cite', 'body|background', 'del|cite', 'form|action',
    'img|src', 'img|srcset', 'input|src', 'ins|cite', 'q|cite',
    'source|src', 'source|srcset', 'track|src', 'video|poster', 'video|src',
]);
registerContext(core_1.SecurityContext.RESOURCE_URL, [
    'applet|code',
    'applet|codebase',
    'base|href',
    'embed|src',
    'frame|src',
    'head|profile',
    'html|manifest',
    'iframe|src',
    'link|href',
    'media|src',
    'object|codebase',
    'object|data',
    'script|src',
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX3NlY3VyaXR5X3NjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL3NjaGVtYS9kb21fc2VjdXJpdHlfc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBOEIsZUFBZSxDQUFDLENBQUE7QUFFOUMsb0dBQW9HO0FBQ3BHLG9HQUFvRztBQUNwRyxvR0FBb0c7QUFDcEcsb0dBQW9HO0FBQ3BHLG9HQUFvRztBQUNwRyxFQUFFO0FBQ0YsMkZBQTJGO0FBQzNGLGtFQUFrRTtBQUNsRSxFQUFFO0FBQ0Ysb0dBQW9HO0FBRXBHLDhGQUE4RjtBQUNqRix1QkFBZSxHQUFtQyxFQUFFLENBQUM7QUFFbEUseUJBQXlCLEdBQW9CLEVBQUUsS0FBZTtJQUM1RCxHQUFHLENBQUMsQ0FBYSxVQUFLLEVBQUwsZUFBSyxFQUFMLG1CQUFLLEVBQUwsSUFBSyxDQUFDO1FBQWxCLElBQUksSUFBSSxjQUFBO1FBQVcsdUJBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7S0FBQTtBQUNwRSxDQUFDO0FBRUQsMkZBQTJGO0FBRTNGLGVBQWUsQ0FBQyxzQkFBZSxDQUFDLElBQUksRUFBRTtJQUNwQyxlQUFlO0lBQ2YsYUFBYTtJQUNiLGFBQWE7Q0FDZCxDQUFDLENBQUM7QUFDSCxlQUFlLENBQUMsc0JBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0FBQ3BELHdGQUF3RjtBQUN4RixlQUFlLENBQUMsc0JBQWUsQ0FBQyxHQUFHLEVBQUU7SUFDbkMsY0FBYyxFQUFFLFdBQVcsRUFBUSxXQUFXLEVBQVEsV0FBVyxFQUFLLFFBQVE7SUFDOUUsUUFBUSxFQUFRLGlCQUFpQixFQUFFLGlCQUFpQixFQUFFLFVBQVUsRUFBTSxhQUFhO0lBQ25GLFNBQVMsRUFBTyxZQUFZLEVBQU8sV0FBVyxFQUFRLFVBQVUsRUFBTSxRQUFRO0lBQzlFLFlBQVksRUFBSSxlQUFlLEVBQUksV0FBVyxFQUFRLGNBQWMsRUFBRSxXQUFXO0NBQ2xGLENBQUMsQ0FBQztBQUNILGVBQWUsQ0FBQyxzQkFBZSxDQUFDLFlBQVksRUFBRTtJQUM1QyxhQUFhO0lBQ2IsaUJBQWlCO0lBQ2pCLFdBQVc7SUFDWCxXQUFXO0lBQ1gsV0FBVztJQUNYLGNBQWM7SUFDZCxlQUFlO0lBQ2YsWUFBWTtJQUNaLFdBQVc7SUFDWCxXQUFXO0lBQ1gsaUJBQWlCO0lBQ2pCLGFBQWE7SUFDYixZQUFZO0NBQ2IsQ0FBQyxDQUFDIn0=