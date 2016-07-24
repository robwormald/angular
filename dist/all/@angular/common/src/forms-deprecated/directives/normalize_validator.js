/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
function normalizeValidator(validator) {
    if (validator.validate !== undefined) {
        return function (c) { return validator.validate(c); };
    }
    else {
        return validator;
    }
}
exports.normalizeValidator = normalizeValidator;
function normalizeAsyncValidator(validator) {
    if (validator.validate !== undefined) {
        return function (c) { return validator.validate(c); };
    }
    else {
        return validator;
    }
}
exports.normalizeAsyncValidator = normalizeAsyncValidator;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsaXplX3ZhbGlkYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tbW9uL3NyYy9mb3Jtcy1kZXByZWNhdGVkL2RpcmVjdGl2ZXMvbm9ybWFsaXplX3ZhbGlkYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBTUgsNEJBQW1DLFNBQWtDO0lBQ25FLEVBQUUsQ0FBQyxDQUFhLFNBQVUsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsVUFBQyxDQUFrQixJQUFLLE9BQVksU0FBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQztJQUNwRSxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQWMsU0FBUyxDQUFDO0lBQ2hDLENBQUM7QUFDSCxDQUFDO0FBTmUsMEJBQWtCLHFCQU1qQyxDQUFBO0FBRUQsaUNBQXdDLFNBQXVDO0lBQzdFLEVBQUUsQ0FBQyxDQUFhLFNBQVUsQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsVUFBQyxDQUFrQixJQUFLLE9BQVksU0FBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBbEMsQ0FBa0MsQ0FBQztJQUNwRSxDQUFDO0lBQUMsSUFBSSxDQUFDLENBQUM7UUFDTixNQUFNLENBQW1CLFNBQVMsQ0FBQztJQUNyQyxDQUFDO0FBQ0gsQ0FBQztBQU5lLCtCQUF1QiwwQkFNdEMsQ0FBQSJ9