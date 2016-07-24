/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var abstract_emitter_1 = require('@angular/compiler/src/output/abstract_emitter');
function main() {
    testing_internal_1.describe('AbstractEmitter', function () {
        testing_internal_1.describe('escapeSingleQuoteString', function () {
            testing_internal_1.it('should escape single quotes', function () { testing_internal_1.expect(abstract_emitter_1.escapeSingleQuoteString("'", false)).toEqual("'\\''"); });
            testing_internal_1.it('should escape backslash', function () { testing_internal_1.expect(abstract_emitter_1.escapeSingleQuoteString('\\', false)).toEqual("'\\\\'"); });
            testing_internal_1.it('should escape newlines', function () { testing_internal_1.expect(abstract_emitter_1.escapeSingleQuoteString('\n', false)).toEqual("'\\n'"); });
            testing_internal_1.it('should escape carriage returns', function () { testing_internal_1.expect(abstract_emitter_1.escapeSingleQuoteString('\r', false)).toEqual("'\\r'"); });
            testing_internal_1.it('should escape $', function () { testing_internal_1.expect(abstract_emitter_1.escapeSingleQuoteString('$', true)).toEqual("'\\$'"); });
            testing_internal_1.it('should not escape $', function () { testing_internal_1.expect(abstract_emitter_1.escapeSingleQuoteString('$', false)).toEqual("'$'"); });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3RfZW1pdHRlcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L291dHB1dC9hYnN0cmFjdF9lbWl0dGVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUE2RSx3Q0FBd0MsQ0FBQyxDQUFBO0FBRXRILGlDQUFzQywrQ0FBK0MsQ0FBQyxDQUFBO0FBRXRGO0lBQ0UsMkJBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQiwyQkFBUSxDQUFDLHlCQUF5QixFQUFFO1lBQ2xDLHFCQUFFLENBQUMsNkJBQTZCLEVBQzdCLGNBQVEseUJBQU0sQ0FBQywwQ0FBdUIsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU1RSxxQkFBRSxDQUFDLHlCQUF5QixFQUN6QixjQUFRLHlCQUFNLENBQUMsMENBQXVCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFOUUscUJBQUUsQ0FBQyx3QkFBd0IsRUFDeEIsY0FBUSx5QkFBTSxDQUFDLDBDQUF1QixDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdFLHFCQUFFLENBQUMsZ0NBQWdDLEVBQ2hDLGNBQVEseUJBQU0sQ0FBQywwQ0FBdUIsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU3RSxxQkFBRSxDQUFDLGlCQUFpQixFQUFFLGNBQVEseUJBQU0sQ0FBQywwQ0FBdUIsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM5RixxQkFBRSxDQUFDLHFCQUFxQixFQUNyQixjQUFRLHlCQUFNLENBQUMsMENBQXVCLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFyQmUsWUFBSSxPQXFCbkIsQ0FBQSJ9