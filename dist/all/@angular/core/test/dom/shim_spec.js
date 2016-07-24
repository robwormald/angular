/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
function main() {
    testing_internal_1.describe('Shim', function () {
        testing_internal_1.it('should provide correct function.name ', function () {
            var functionWithoutName = identity(function () { return function (_ /** TODO #9100 */) { }; });
            function foo(_ /** TODO #9100 */) { }
            ;
            testing_internal_1.expect(functionWithoutName.name).toBeFalsy();
            testing_internal_1.expect(foo.name).toEqual('foo');
        });
    });
}
exports.main = main;
function identity(a /** TODO #9100 */) {
    return a;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpbV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvZG9tL3NoaW1fc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQTRFLHdDQUF3QyxDQUFDLENBQUE7QUFFckg7SUFDRSwyQkFBUSxDQUFDLE1BQU0sRUFBRTtRQUVmLHFCQUFFLENBQUMsdUNBQXVDLEVBQUU7WUFDMUMsSUFBSSxtQkFBbUIsR0FBRyxRQUFRLENBQUMsY0FBTSxPQUFBLFVBQVMsQ0FBTSxDQUFDLGlCQUFpQixJQUFHLENBQUMsRUFBckMsQ0FBcUMsQ0FBQyxDQUFDO1lBQ2hGLGFBQWEsQ0FBTSxDQUFDLGlCQUFpQixJQUFFLENBQUM7WUFBQSxDQUFDO1lBRXpDLHlCQUFNLENBQU8sbUJBQW9CLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDcEQseUJBQU0sQ0FBTyxHQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBWmUsWUFBSSxPQVluQixDQUFBO0FBRUQsa0JBQWtCLENBQU0sQ0FBQyxpQkFBaUI7SUFDeEMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNYLENBQUMifQ==