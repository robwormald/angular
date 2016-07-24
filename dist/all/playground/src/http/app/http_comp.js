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
require('rxjs/add/operator/map');
var HttpCmp = (function () {
    function HttpCmp(http) {
        var _this = this;
        http.get('./people.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (people) { return _this.people = people; });
    }
    /** @nocollapse */
    HttpCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'http-app',
                    template: "\n    <h1>people</h1>\n    <ul class=\"people\">\n      <li *ngFor=\"let person of people\">\n        hello, {{person['name']}}\n      </li>\n    </ul>\n  "
                },] },
    ];
    /** @nocollapse */
    HttpCmp.ctorParameters = [
        { type: http_1.Http, },
    ];
    return HttpCmp;
}());
exports.HttpCmp = HttpCmp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cF9jb21wLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL3NyYy9odHRwL2FwcC9odHRwX2NvbXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4QyxxQkFBNkIsZUFBZSxDQUFDLENBQUE7QUFDN0MsUUFBTyx1QkFBdUIsQ0FBQyxDQUFBO0FBQy9CO0lBRUUsaUJBQVksSUFBVTtRQUZ4QixpQkF5QkM7UUF0QkcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7YUFDcEIsR0FBRyxDQUFDLFVBQUMsR0FBYSxJQUFLLE9BQUEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFWLENBQVUsQ0FBQzthQUNsQyxTQUFTLENBQUMsVUFBQyxNQUFxQixJQUFLLE9BQUEsS0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQXBCLENBQW9CLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsa0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZ0JBQVMsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDeEIsUUFBUSxFQUFFLFVBQVU7b0JBQ3BCLFFBQVEsRUFBRSw2SkFPVDtpQkFDRixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsc0JBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsV0FBSSxHQUFHO0tBQ2IsQ0FBQztJQUNGLGNBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDO0FBekJZLGVBQU8sVUF5Qm5CLENBQUEifQ==