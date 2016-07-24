/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var lang_1 = require('../../src/facade/lang');
var TestIterable = (function () {
    function TestIterable() {
        this.list = [];
    }
    TestIterable.prototype[lang_1.getSymbolIterator()] = function () { return this.list[lang_1.getSymbolIterator()](); };
    return TestIterable;
}());
exports.TestIterable = TestIterable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlcmFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvdGVzdC9jaGFuZ2VfZGV0ZWN0aW9uL2l0ZXJhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBZ0MsdUJBQXVCLENBQUMsQ0FBQTtBQUV4RDtJQUVFO1FBQWdCLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0lBQUMsQ0FBQztJQUVqQyx1QkFBQyx3QkFBaUIsRUFBRSxDQUFDLEdBQXJCLGNBQTBCLE1BQU0sQ0FBRSxJQUFJLENBQUMsSUFBWSxDQUFDLHdCQUFpQixFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMvRSxtQkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBTFksb0JBQVksZUFLeEIsQ0FBQSJ9