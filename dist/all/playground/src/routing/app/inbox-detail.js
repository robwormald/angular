/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var async_1 = require('@angular/core/src/facade/async');
var inbox_app_1 = require('./inbox-app');
var InboxDetailCmp = (function () {
    function InboxDetailCmp(db, route) {
        var _this = this;
        this.record = new inbox_app_1.InboxRecord();
        this.ready = false;
        route.params.forEach(function (p) {
            async_1.PromiseWrapper.then(db.email(p['id']), function (data) { _this.record.setData(data); });
        });
    }
    /** @nocollapse */
    InboxDetailCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'inbox-detail', directives: router_1.ROUTER_DIRECTIVES, templateUrl: 'app/inbox-detail.html' },] },
    ];
    /** @nocollapse */
    InboxDetailCmp.ctorParameters = [
        { type: inbox_app_1.DbService, },
        { type: router_1.ActivatedRoute, },
    ];
    return InboxDetailCmp;
}());
exports.InboxDetailCmp = InboxDetailCmp;
var InboxDetailModule = (function () {
    function InboxDetailModule() {
    }
    InboxDetailModule.decorators = [
        { type: core_1.NgModule, args: [{
                    declarations: [InboxDetailCmp],
                    providers: [router_1.provideRoutes([{ path: ':id', component: InboxDetailCmp }])]
                },] },
    ];
    return InboxDetailModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InboxDetailModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5ib3gtZGV0YWlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9wbGF5Z3JvdW5kL3NyYy9yb3V0aW5nL2FwcC9pbmJveC1kZXRhaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUFrQyxlQUFlLENBQUMsQ0FBQTtBQUNsRCx1QkFBK0QsaUJBQWlCLENBQUMsQ0FBQTtBQUNqRixzQkFBNkIsZ0NBQWdDLENBQUMsQ0FBQTtBQUM5RCwwQkFBcUMsYUFBYSxDQUFDLENBQUE7QUFDbkQ7SUFJRSx3QkFBWSxFQUFhLEVBQUUsS0FBcUI7UUFKbEQsaUJBa0JDO1FBakJTLFdBQU0sR0FBZ0IsSUFBSSx1QkFBVyxFQUFFLENBQUM7UUFDeEMsVUFBSyxHQUFZLEtBQUssQ0FBQztRQUc3QixLQUFLLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFDcEIsc0JBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxVQUFDLElBQUksSUFBTyxLQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25GLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNILGtCQUFrQjtJQUNYLHlCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLFVBQVUsRUFBRSwwQkFBaUIsRUFBRSxXQUFXLEVBQUUsdUJBQXVCLEVBQUMsRUFBRyxFQUFFO0tBQzdILENBQUM7SUFDRixrQkFBa0I7SUFDWCw2QkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxxQkFBUyxHQUFHO1FBQ25CLEVBQUMsSUFBSSxFQUFFLHVCQUFjLEdBQUc7S0FDdkIsQ0FBQztJQUNGLHFCQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQWxCWSxzQkFBYyxpQkFrQjFCLENBQUE7QUFDRDtJQUFBO0lBT0EsQ0FBQztJQU5NLDRCQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGVBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdkIsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDO29CQUM5QixTQUFTLEVBQUUsQ0FBQyxzQkFBYSxDQUFDLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ3ZFLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRix3QkFBQztBQUFELENBQUMsQUFQRCxJQU9DO0FBUEQ7bUNBT0MsQ0FBQSJ9