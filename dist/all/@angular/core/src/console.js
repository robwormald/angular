/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var decorators_1 = require('./di/decorators');
var lang_1 = require('./facade/lang');
// Note: Need to rename warn as in Dart
// class members and imports can't use the same name.
var _warnImpl = lang_1.warn;
var Console = (function () {
    function Console() {
    }
    Console.prototype.log = function (message) { lang_1.print(message); };
    // Note: for reporting errors use `DOM.logError()` as it is platform specific
    Console.prototype.warn = function (message) { _warnImpl(message); };
    /** @nocollapse */
    Console.decorators = [
        { type: decorators_1.Injectable },
    ];
    return Console;
}());
exports.Console = Console;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS9zcmMvY29uc29sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsMkJBQXlCLGlCQUFpQixDQUFDLENBQUE7QUFDM0MscUJBQTBCLGVBQWUsQ0FBQyxDQUFBO0FBRzFDLHVDQUF1QztBQUN2QyxxREFBcUQ7QUFDckQsSUFBSSxTQUFTLEdBQUcsV0FBSSxDQUFDO0FBQ3JCO0lBQUE7SUFRQSxDQUFDO0lBUEMscUJBQUcsR0FBSCxVQUFJLE9BQWUsSUFBVSxZQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlDLDZFQUE2RTtJQUM3RSxzQkFBSSxHQUFKLFVBQUssT0FBZSxJQUFVLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDckQsa0JBQWtCO0lBQ1gsa0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsdUJBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0YsY0FBQztBQUFELENBQUMsQUFSRCxJQVFDO0FBUlksZUFBTyxVQVFuQixDQUFBIn0=