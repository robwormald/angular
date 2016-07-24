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
var exceptions_1 = require('../src/facade/exceptions');
var lang_1 = require('../src/facade/lang');
function _isPipeMetadata(type) {
    return type instanceof core_1.PipeMetadata;
}
var PipeResolver = (function () {
    function PipeResolver(_reflector) {
        if (_reflector === void 0) { _reflector = core_private_1.reflector; }
        this._reflector = _reflector;
    }
    /**
     * Return {@link PipeMetadata} for a given `Type`.
     */
    PipeResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var metas = this._reflector.annotations(core_1.resolveForwardRef(type));
        if (lang_1.isPresent(metas)) {
            var annotation = metas.find(_isPipeMetadata);
            if (lang_1.isPresent(annotation)) {
                return annotation;
            }
        }
        if (throwIfNotFound) {
            throw new exceptions_1.BaseException("No Pipe decorator found on " + lang_1.stringify(type));
        }
        return null;
    };
    /** @nocollapse */
    PipeResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    PipeResolver.ctorParameters = [
        { type: core_private_1.ReflectorReader, },
    ];
    return PipeResolver;
}());
exports.PipeResolver = PipeResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZV9yZXNvbHZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvc3JjL3BpcGVfcmVzb2x2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUEwRCxlQUFlLENBQUMsQ0FBQTtBQUUxRSw2QkFBeUMsaUJBQWlCLENBQUMsQ0FBQTtBQUMzRCwyQkFBNEIsMEJBQTBCLENBQUMsQ0FBQTtBQUN2RCxxQkFBeUMsb0JBQW9CLENBQUMsQ0FBQTtBQUU5RCx5QkFBeUIsSUFBUztJQUNoQyxNQUFNLENBQUMsSUFBSSxZQUFZLG1CQUFZLENBQUM7QUFDdEMsQ0FBQztBQUNEO0lBQ0Usc0JBQW9CLFVBQXVDO1FBQS9DLDBCQUErQyxHQUEvQyxxQ0FBK0M7UUFBdkMsZUFBVSxHQUFWLFVBQVUsQ0FBNkI7SUFBRyxDQUFDO0lBRS9EOztPQUVHO0lBQ0gsOEJBQU8sR0FBUCxVQUFRLElBQVUsRUFBRSxlQUFzQjtRQUF0QiwrQkFBc0IsR0FBdEIsc0JBQXNCO1FBQ3hDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLHdCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakUsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUM3QyxFQUFFLENBQUMsQ0FBQyxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUNwQixDQUFDO1FBQ0gsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7WUFDcEIsTUFBTSxJQUFJLDBCQUFhLENBQUMsZ0NBQThCLGdCQUFTLENBQUMsSUFBSSxDQUFHLENBQUMsQ0FBQztRQUMzRSxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFDSCxrQkFBa0I7SUFDWCx1QkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCwyQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSw4QkFBZSxHQUFHO0tBQ3hCLENBQUM7SUFDRixtQkFBQztBQUFELENBQUMsQUEzQkQsSUEyQkM7QUEzQlksb0JBQVksZUEyQnhCLENBQUEifQ==