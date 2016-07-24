/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var testing_1 = require('@angular/core/testing');
var spies_1 = require('../spies');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var router_deprecated_1 = require('@angular/router-deprecated');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var instruction_1 = require('@angular/router-deprecated/src/instruction');
var by_1 = require('@angular/platform-browser/src/dom/debug/by');
var dummyInstruction = new instruction_1.ResolvedInstruction(new router_deprecated_1.ComponentInstruction('detail', [], null, null, true, '0', null, 'Detail'), null, {});
function main() {
    testing_internal_1.describe('routerLink directive', function () {
        var tcb;
        testing_internal_1.beforeEachProviders(function () { return [{ provide: common_1.Location, useValue: makeDummyLocation() }, {
                provide: router_deprecated_1.Router,
                useValue: makeDummyRouter()
            }]; });
        testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcBuilder /** TODO #9100 */) { tcb = tcBuilder; }));
        testing_internal_1.it('should update a[href] attribute', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
            tcb.createAsync(TestComponent).then(function (testComponent) {
                testComponent.detectChanges();
                var anchorElement = testComponent.debugElement.query(by_1.By.css('a.detail-view')).nativeElement;
                testing_internal_1.expect(dom_adapter_1.getDOM().getAttribute(anchorElement, 'href')).toEqual('detail');
                async.done();
            });
        }));
        testing_internal_1.it('should call router.navigate when a link is clicked', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, router_deprecated_1.Router], function (async, router /** TODO #9100 */) {
            tcb.createAsync(TestComponent).then(function (testComponent) {
                testComponent.detectChanges();
                // TODO: shouldn't this be just 'click' rather than '^click'?
                testComponent.debugElement.query(by_1.By.css('a.detail-view'))
                    .triggerEventHandler('click', null);
                testing_internal_1.expect(router.spy('navigateByInstruction')).toHaveBeenCalledWith(dummyInstruction);
                async.done();
            });
        }));
        testing_internal_1.it('should call router.navigate when a link is clicked if target is _self', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, router_deprecated_1.Router], function (async, router /** TODO #9100 */) {
            tcb.createAsync(TestComponent).then(function (testComponent) {
                testComponent.detectChanges();
                testComponent.debugElement.query(by_1.By.css('a.detail-view-self'))
                    .triggerEventHandler('click', null);
                testing_internal_1.expect(router.spy('navigateByInstruction')).toHaveBeenCalledWith(dummyInstruction);
                async.done();
            });
        }));
        testing_internal_1.it('should NOT call router.navigate when a link is clicked if target is set to other than _self', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, router_deprecated_1.Router], function (async, router /** TODO #9100 */) {
            tcb.createAsync(TestComponent).then(function (testComponent) {
                testComponent.detectChanges();
                testComponent.debugElement.query(by_1.By.css('a.detail-view-blank'))
                    .triggerEventHandler('click', null);
                testing_internal_1.expect(router.spy('navigateByInstruction')).not.toHaveBeenCalled();
                async.done();
            });
        }));
    });
}
exports.main = main;
var UserCmp = (function () {
    function UserCmp(params) {
        this.user = params.get('name');
    }
    /** @nocollapse */
    UserCmp.decorators = [
        { type: core_1.Component, args: [{ selector: 'user-cmp', template: 'hello {{user}}' },] },
    ];
    /** @nocollapse */
    UserCmp.ctorParameters = [
        { type: router_deprecated_1.RouteParams, },
    ];
    return UserCmp;
}());
var TestComponent = (function () {
    function TestComponent() {
    }
    /** @nocollapse */
    TestComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'test-component',
                    template: "\n    <div>\n      <a [routerLink]=\"['/Detail']\"\n         class=\"detail-view\">\n           detail view\n      </a>\n      <a [routerLink]=\"['/Detail']\"\n         class=\"detail-view-self\"\n         target=\"_self\">\n           detail view with _self target\n      </a>\n      <a [routerLink]=\"['/Detail']\"\n         class=\"detail-view-blank\"\n         target=\"_blank\">\n           detail view with _blank target\n      </a>\n    </div>",
                    directives: [router_deprecated_1.RouterLink]
                },] },
    ];
    return TestComponent;
}());
function makeDummyLocation() {
    var dl = new spies_1.SpyLocation();
    dl.spy('prepareExternalUrl').andCallFake(function (url /** TODO #9100 */) { return url; });
    return dl;
}
function makeDummyRouter() {
    var dr = new spies_1.SpyRouter();
    dr.spy('generate').andCallFake(function (routeParams /** TODO #9100 */) { return dummyInstruction; });
    dr.spy('isRouteActive').andCallFake(function (_ /** TODO #9100 */) { return false; });
    dr.spy('navigateInstruction');
    return dr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyX2xpbmtfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyLWRlcHJlY2F0ZWQvdGVzdC9kaXJlY3RpdmVzL3JvdXRlcl9saW5rX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUFpSSx3Q0FBd0MsQ0FBQyxDQUFBO0FBQzFLLHdCQUFtQyx1QkFBdUIsQ0FBQyxDQUFBO0FBRTNELHNCQUFxQyxVQUFVLENBQUMsQ0FBQTtBQUNoRCxxQkFBd0IsZUFBZSxDQUFDLENBQUE7QUFDeEMsdUJBQXVCLGlCQUFpQixDQUFDLENBQUE7QUFDekMsa0NBQXdHLDRCQUE0QixDQUFDLENBQUE7QUFDckksNEJBQXFCLCtDQUErQyxDQUFDLENBQUE7QUFDckUsNEJBQWtDLDRDQUE0QyxDQUFDLENBQUE7QUFDL0UsbUJBQWlCLDRDQUE0QyxDQUFDLENBQUE7QUFFOUQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLGlDQUFtQixDQUMxQyxJQUFJLHdDQUFvQixDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFFN0Y7SUFDRSwyQkFBUSxDQUFDLHNCQUFzQixFQUFFO1FBQy9CLElBQUksR0FBeUIsQ0FBQztRQUU5QixzQ0FBbUIsQ0FBQyxjQUFNLE9BQUEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxpQkFBUSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxFQUFDLEVBQUU7Z0JBQ3pELE9BQU8sRUFBRSwwQkFBTTtnQkFDZixRQUFRLEVBQUUsZUFBZSxFQUFFO2FBQzVCLENBQUMsRUFISSxDQUdKLENBQUMsQ0FBQztRQUV4Qiw2QkFBVSxDQUNOLHlCQUFNLENBQUMsQ0FBQyw4QkFBb0Is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