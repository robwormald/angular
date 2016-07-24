/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var lang_1 = require('../src/facade/lang');
var exceptions_1 = require('../src/facade/exceptions');
function _isComponentMetadata(obj) {
    return obj instanceof core_1.ComponentMetadata;
}
var ViewResolver = (function () {
    function ViewResolver(_reflector) {
        if (_reflector === void 0) { _reflector = core_private_1.reflector; }
        this._reflector = _reflector;
    }
    ViewResolver.prototype.resolve = function (component, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var compMeta = this._reflector.annotations(component).find(_isComponentMetadata);
        if (lang_1.isPresent(compMeta)) {
            if (lang_1.isBlank(compMeta.template) && lang_1.isBlank(compMeta.templateUrl)) {
                throw new exceptions_1.BaseException("Component '" + lang_1.stringify(component) + "' must have either 'template' or 'templateUrl' set.");
            }
            else {
                return new core_1.ViewMetadata({
                    templateUrl: compMeta.templateUrl,
                    template: compMeta.template,
                    directives: compMeta.directives,
                    pipes: compMeta.pipes,
                    encapsulation: compMeta.encapsulation,
                    styles: compMeta.styles,
                    styleUrls: compMeta.styleUrls,
                    animations: compMeta.animations,
                    interpolation: compMeta.interpolation
                });
            }
        }
        else {
            if (throwIfNotFound) {
                throw new exceptions_1.BaseException("Could not compile '" + lang_1.stringify(component) + "' because it is not a component.");
            }
            return null;
        }
    };
    /** @nocollapse */
    ViewResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    ViewResolver.ctorParameters = [
        { type: core_private_1.ReflectorReader, },
    ];
    return ViewResolver;
}());
exports.ViewResolver = ViewResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld19yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL3ZpZXdfcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUEyRCxlQUFlLENBQUMsQ0FBQTtBQUMzRSw2QkFBeUMsaUJBQWlCLENBQUMsQ0FBQTtBQUMzRCxxQkFBa0Qsb0JBQW9CLENBQUMsQ0FBQTtBQUN2RSwyQkFBNEIsMEJBQTBCLENBQUMsQ0FBQTtBQUV2RCw4QkFBOEIsR0FBUTtJQUNwQyxNQUFNLENBQUMsR0FBRyxZQUFZLHdCQUFpQixDQUFDO0FBQzFDLENBQUM7QUFDRDtJQUNFLHNCQUFvQixVQUF1QztRQUEvQywwQkFBK0MsR0FBL0MscUNBQStDO1FBQXZDLGVBQVUsR0FBVixVQUFVLENBQTZCO0lBQUcsQ0FBQztJQUUvRCw4QkFBTyxHQUFQLFVBQVEsU0FBZSxFQUFFLGVBQXNCO1FBQXRCLCtCQUFzQixHQUF0QixzQkFBc0I7UUFDN0MsSUFBTSxRQUFRLEdBQ1YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFFdEUsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxjQUFPLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsTUFBTSxJQUFJLDBCQUFhLENBQ25CLGdCQUFjLGdCQUFTLENBQUMsU0FBUyxDQUFDLHdEQUFxRCxDQUFDLENBQUM7WUFFL0YsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNOLE1BQU0sQ0FBQyxJQUFJLG1CQUFZLENBQUM7b0JBQ3RCLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVztvQkFDakMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxRQUFRO29CQUMzQixVQUFVLEVBQUUsUUFBUSxDQUFDLFVBQVU7b0JBQy9CLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSztvQkFDckIsYUFBYSxFQUFFLFFBQVEsQ0FBQyxhQUFhO29CQUNyQyxNQUFNLEVBQUUsUUFBUSxDQUFDLE1BQU07b0JBQ3ZCLFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUztvQkFDN0IsVUFBVSxFQUFFLFFBQVEsQ0FBQyxVQUFVO29CQUMvQixhQUFhLEVBQUUsUUFBUSxDQUFDLGFBQWE7aUJBQ3RDLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixFQUFFLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUNwQixNQUFNLElBQUksMEJBQWEsQ0FDbkIsd0JBQXNCLGdCQUFTLENBQUMsU0FBUyxDQUFDLHFDQUFrQyxDQUFDLENBQUM7WUFDcEYsQ0FBQztZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQztJQUNILGtCQUFrQjtJQUNYLHVCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGlCQUFVLEVBQUU7S0FDbkIsQ0FBQztJQUNGLGtCQUFrQjtJQUNYLDJCQUFjLEdBQTJEO1FBQ2hGLEVBQUMsSUFBSSxFQUFFLDhCQUFlLEdBQUc7S0FDeEIsQ0FBQztJQUNGLG1CQUFDO0FBQUQsQ0FBQyxBQXpDRCxJQXlDQztBQXpDWSxvQkFBWSxlQXlDeEIsQ0FBQSJ9