/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
function stringify(obj) {
    if (typeof obj == 'function')
        return obj.name || obj.toString();
    return '' + obj;
}
exports.stringify = stringify;
function onError(e) {
    // TODO: (misko): We seem to not have a stack trace here!
    console.log(e, e.stack);
    throw e;
}
exports.onError = onError;
function controllerKey(name) {
    return '$' + name + 'Controller';
}
exports.controllerKey = controllerKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvdXBncmFkZS9zcmMvdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBR0gsbUJBQTBCLEdBQVE7SUFDaEMsRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksVUFBVSxDQUFDO1FBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2hFLE1BQU0sQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLENBQUM7QUFIZSxpQkFBUyxZQUd4QixDQUFBO0FBR0QsaUJBQXdCLENBQU07SUFDNUIseURBQXlEO0lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixNQUFNLENBQUMsQ0FBQztBQUNWLENBQUM7QUFKZSxlQUFPLFVBSXRCLENBQUE7QUFFRCx1QkFBOEIsSUFBWTtJQUN4QyxNQUFNLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxZQUFZLENBQUM7QUFDbkMsQ0FBQztBQUZlLHFCQUFhLGdCQUU1QixDQUFBIn0=