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
function _isNgModuleMetadata(obj) {
    return obj instanceof core_1.NgModuleMetadata;
}
var NgModuleResolver = (function () {
    function NgModuleResolver(_reflector) {
        if (_reflector === void 0) { _reflector = core_private_1.reflector; }
        this._reflector = _reflector;
    }
    NgModuleResolver.prototype.resolve = function (type, throwIfNotFound) {
        if (throwIfNotFound === void 0) { throwIfNotFound = true; }
        var ngModuleMeta = this._reflector.annotations(type).find(_isNgModuleMetadata);
        if (lang_1.isPresent(ngModuleMeta)) {
            return ngModuleMeta;
        }
        else {
            if (throwIfNotFound) {
                throw new exceptions_1.BaseException("No NgModule metadata found for '" + lang_1.stringify(type) + "'.");
            }
            return null;
        }
    };
    /** @nocollapse */
    NgModuleResolver.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    NgModuleResolver.ctorParameters = [
        { type: core_private_1.ReflectorReader, },
    ];
    return NgModuleResolver;
}());
exports.NgModuleResolver = NgModuleResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlX3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci9zcmMvbmdfbW9kdWxlX3Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBMkMsZUFBZSxDQUFDLENBQUE7QUFFM0QsNkJBQXlDLGlCQUFpQixDQUFDLENBQUE7QUFDM0QsMkJBQTRCLDBCQUEwQixDQUFDLENBQUE7QUFDdkQscUJBQWtELG9CQUFvQixDQUFDLENBQUE7QUFFdkUsNkJBQTZCLEdBQVE7SUFDbkMsTUFBTSxDQUFDLEdBQUcsWUFBWSx1QkFBZ0IsQ0FBQztBQUN6QyxDQUFDO0FBQ0Q7SUFDRSwwQkFBb0IsVUFBdUM7UUFBL0MsMEJBQStDLEdBQS9DLHFDQUErQztRQUF2QyxlQUFVLEdBQVYsVUFBVSxDQUE2QjtJQUFHLENBQUM7SUFFL0Qsa0NBQU8sR0FBUCxVQUFRLElBQVUsRUFBRSxlQUFzQjtRQUF0QiwrQkFBc0IsR0FBdEIsc0JBQXNCO1FBQ3hDLElBQU0sWUFBWSxHQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRWhFLEVBQUUsQ0FBQyxDQUFDLGdCQUFTLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLE1BQU0sQ0FBQyxZQUFZLENBQUM7UUFDdEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztnQkFDcEIsTUFBTSxJQUFJLDBCQUFhLENBQUMscUNBQW1DLGdCQUFTLENBQUMsSUFBSSxDQUFDLE9BQUksQ0FBQyxDQUFDO1lBQ2xGLENBQUM7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFDSCxrQkFBa0I7SUFDWCwyQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCwrQkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSw4QkFBZSxHQUFHO0tBQ3hCLENBQUM7SUFDRix1QkFBQztBQUFELENBQUMsQUF4QkQsSUF3QkM7QUF4Qlksd0JBQWdCLG1CQXdCNUIsQ0FBQSJ9