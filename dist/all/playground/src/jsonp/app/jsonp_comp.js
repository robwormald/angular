/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var JsonpCmp = (function () {
    function JsonpCmp(jsonp) {
        var _this = this;
        jsonp.get('./people.json?callback=JSONP_CALLBACK').subscribe(function (res) { return _this.people = res.json(); });
    }
    /** @nocollapse */
    JsonpCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'jsonp-app',
                    template: "\n    <h1>people</h1>\n    <ul class=\"people\">\n      <li *ngFor=\"let person of people\">\n        hello, {{person['name']}}\n      </li>\n    </ul>\n  "
                },] },
    ];
    /** @nocollapse */
    JsonpCmp.ctorParameters = [
        { type: http_1.Jsonp, },
    ];
    return JsonpCmp;
}());
exports.JsonpCmp = JsonpCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbnBfY29tcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvcGxheWdyb3VuZC9zcmMvanNvbnAvYXBwL2pzb25wX2NvbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4QyxxQkFBb0IsZUFBZSxDQUFDLENBQUE7QUFDcEM7SUFFRSxrQkFBWSxLQUFZO1FBRjFCLGlCQXVCQztRQXBCRyxLQUFLLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsS0FBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQXhCLENBQXdCLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsbUJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSw2SkFPVDtpQkFDRixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsdUJBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsWUFBSyxHQUFHO0tBQ2QsQ0FBQztJQUNGLGVBQUM7QUFBRCxDQUFDLEFBdkJELElBdUJDO0FBdkJZLGdCQUFRLFdBdUJwQixDQUFBIn0=