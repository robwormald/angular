/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var lang_1 = require('../facade/lang');
var ng_control_1 = require('./ng_control');
var NgControlStatus = (function () {
    function NgControlStatus(cd) {
        this._cd = cd;
    }
    Object.defineProperty(NgControlStatus.prototype, "ngClassUntouched", {
        get: function () {
            return lang_1.isPresent(this._cd.control) ? this._cd.control.untouched : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgControlStatus.prototype, "ngClassTouched", {
        get: function () {
            return lang_1.isPresent(this._cd.control) ? this._cd.control.touched : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgControlStatus.prototype, "ngClassPristine", {
        get: function () {
            return lang_1.isPresent(this._cd.control) ? this._cd.control.pristine : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgControlStatus.prototype, "ngClassDirty", {
        get: function () {
            return lang_1.isPresent(this._cd.control) ? this._cd.control.dirty : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgControlStatus.prototype, "ngClassValid", {
        get: function () {
            return lang_1.isPresent(this._cd.control) ? this._cd.control.valid : false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgControlStatus.prototype, "ngClassInvalid", {
        get: function () {
            return lang_1.isPresent(this._cd.control) ? !this._cd.control.valid : false;
        },
        enumerable: true,
        configurable: true
    });
    /** @nocollapse */
    NgControlStatus.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[formControlName],[ngModel],[formControl]',
                    host: {
                        '[class.ng-untouched]': 'ngClassUntouched',
                        '[class.ng-touched]': 'ngClassTouched',
                        '[class.ng-pristine]': 'ngClassPristine',
                        '[class.ng-dirty]': 'ngClassDirty',
                        '[class.ng-valid]': 'ngClassValid',
                        '[class.ng-invalid]': 'ngClassInvalid'
                    }
                },] },
    ];
    /** @nocollapse */
    NgControlStatus.ctorParameters = [
        { type: ng_control_1.NgControl, decorators: [{ type: core_1.Self },] },
    ];
    return NgControlStatus;
}());
exports.NgControlStatus = NgControlStatus;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfY29udHJvbF9zdGF0dXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2Zvcm1zL3NyYy9kaXJlY3RpdmVzL25nX2NvbnRyb2xfc3RhdHVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxxQkFBOEIsZUFBZSxDQUFDLENBQUE7QUFFOUMscUJBQXdCLGdCQUFnQixDQUFDLENBQUE7QUFFekMsMkJBQXdCLGNBQWMsQ0FBQyxDQUFBO0FBQ3ZDO0lBR0UseUJBQWEsRUFBYTtRQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0lBQUMsQ0FBQztJQUU5QyxzQkFBSSw2Q0FBZ0I7YUFBcEI7WUFDRSxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDMUUsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSwyQ0FBYzthQUFsQjtZQUNFLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN4RSxDQUFDOzs7T0FBQTtJQUNELHNCQUFJLDRDQUFlO2FBQW5CO1lBQ0UsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3pFLENBQUM7OztPQUFBO0lBQ0Qsc0JBQUkseUNBQVk7YUFBaEI7WUFDRSxNQUFNLENBQUMsZ0JBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdEUsQ0FBQzs7O09BQUE7SUFDRCxzQkFBSSx5Q0FBWTthQUFoQjtZQUNFLE1BQU0sQ0FBQyxnQkFBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUN0RSxDQUFDOzs7T0FBQTtJQUNELHNCQUFJLDJDQUFjO2FBQWxCO1lBQ0UsTUFBTSxDQUFDLGdCQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDdkUsQ0FBQzs7O09BQUE7SUFDSCxrQkFBa0I7SUFDWCwwQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsMkNBQTJDO29CQUNyRCxJQUFJLEVBQUU7d0JBQ0osc0JBQXNCLEVBQUUsa0JBQWtCO3dCQUMxQyxvQkFBb0IsRUFBRSxnQkFBZ0I7d0JBQ3RDLHFCQUFxQixFQUFFLGlCQUFpQjt3QkFDeEMsa0JBQWtCLEVBQUUsY0FBYzt3QkFDbEMsa0JBQWtCLEVBQUUsY0FBYzt3QkFDbEMsb0JBQW9CLEVBQUUsZ0JBQWdCO3FCQUN2QztpQkFDRixFQUFHLEVBQUU7S0FDTCxDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsOEJBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsc0JBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFJLEVBQUUsRUFBRyxFQUFDO0tBQ2hELENBQUM7SUFDRixzQkFBQztBQUFELENBQUMsQUF6Q0QsSUF5Q0M7QUF6Q1ksdUJBQWUsa0JBeUMzQixDQUFBIn0=