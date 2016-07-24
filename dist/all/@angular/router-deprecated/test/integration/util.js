/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var common_1 = require('@angular/common');
var testing_1 = require('@angular/common/testing');
var core_1 = require('@angular/core');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var router_deprecated_1 = require('@angular/router-deprecated');
var route_registry_1 = require('@angular/router-deprecated/src/route_registry');
var router_1 = require('@angular/router-deprecated/src/router');
var exceptions_1 = require('../../src/facade/exceptions');
var lang_1 = require('../../src/facade/lang');
var RootCmp = (function () {
    function RootCmp() {
    }
    /** @nocollapse */
    RootCmp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'root-comp',
                    template: "<router-outlet></router-outlet>",
                    directives: [router_deprecated_1.ROUTER_DIRECTIVES]
                },] },
    ];
    return RootCmp;
}());
exports.RootCmp = RootCmp;
function compile(tcb, template) {
    if (template === void 0) { template = '<router-outlet></router-outlet>'; }
    return tcb.overrideTemplate(RootCmp, ('<div>' + template + '</div>')).createAsync(RootCmp);
}
exports.compile = compile;
exports.TEST_ROUTER_PROVIDERS = [
    route_registry_1.RouteRegistry, { provide: common_1.Location, useClass: testing_1.SpyLocation },
    { provide: router_deprecated_1.ROUTER_PRIMARY_COMPONENT, useValue: RootCmp }, { provide: router_deprecated_1.Router, useClass: router_1.RootRouter }
];
function clickOnElement(anchorEl /** TODO #9100 */) {
    var dispatchedEvent = dom_adapter_1.getDOM().createMouseEvent('click');
    dom_adapter_1.getDOM().dispatchEvent(anchorEl, dispatchedEvent);
    return dispatchedEvent;
}
exports.clickOnElement = clickOnElement;
function getHref(elt /** TODO #9100 */) {
    return dom_adapter_1.getDOM().getAttribute(elt, 'href');
}
exports.getHref = getHref;
/**
 * Router integration suite DSL
 */
var specNameBuilder = [];
// we add the specs themselves onto this map
exports.specs = {};
function describeRouter(description, fn, exclusive) {
    if (exclusive === void 0) { exclusive = false; }
    var specName = descriptionToSpecName(description);
    specNameBuilder.push(specName);
    if (exclusive) {
        testing_internal_1.ddescribe(description, fn);
    }
    else {
        testing_internal_1.describe(description, fn);
    }
    specNameBuilder.pop();
}
exports.describeRouter = describeRouter;
function ddescribeRouter(description, fn, exclusive) {
    if (exclusive === void 0) { exclusive = false; }
    describeRouter(description, fn, true);
}
exports.ddescribeRouter = ddescribeRouter;
function describeWithAndWithout(description, fn) {
    // the "without" case is usually simpler, so we opt to run this spec first
    describeWithout(description, fn);
    describeWith(description, fn);
}
exports.describeWithAndWithout = describeWithAndWithout;
function describeWith(description, fn) {
    var specName = 'with ' + description;
    specNameBuilder.push(specName);
    testing_internal_1.describe(specName, fn);
    specNameBuilder.pop();
}
exports.describeWith = describeWith;
function describeWithout(description, fn) {
    var specName = 'without ' + description;
    specNameBuilder.push(specName);
    testing_internal_1.describe(specName, fn);
    specNameBuilder.pop();
}
exports.describeWithout = describeWithout;
function descriptionToSpecName(description) {
    return spaceCaseToCamelCase(description);
}
// this helper looks up the suite registered from the "impl" folder in this directory
function itShouldRoute() {
    var specSuiteName = spaceCaseToCamelCase(specNameBuilder.join(' '));
    var spec = exports.specs[specSuiteName];
    if (lang_1.isBlank(spec)) {
        throw new exceptions_1.BaseException("Router integration spec suite \"" + specSuiteName + "\" was not found.");
    }
    else {
        // todo: remove spec from map, throw if there are extra left over??
        spec();
    }
}
exports.itShouldRoute = itShouldRoute;
function spaceCaseToCamelCase(str) {
    var words = str.split(' ');
    var first = words.shift();
    return first + words.map(title).join('');
}
function title(str) {
    return str[0].toUpperCase() + str.substring(1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyLWRlcHJlY2F0ZWQvdGVzdC9pbnRlZ3JhdGlvbi91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx1QkFBdUIsaUJBQWlCLENBQUMsQ0FBQTtBQUN6Qyx3QkFBMEIseUJBQXlCLENBQUMsQ0FBQTtBQUNwRCxxQkFBaUMsZUFBZSxDQUFDLENBQUE7QUFFakQsaUNBQStGLHdDQUF3QyxDQUFDLENBQUE7QUFDeEksNEJBQXFCLCtDQUErQyxDQUFDLENBQUE7QUFDckUsa0NBQWtFLDRCQUE0QixDQUFDLENBQUE7QUFDL0YsK0JBQTRCLCtDQUErQyxDQUFDLENBQUE7QUFDNUUsdUJBQXlCLHVDQUF1QyxDQUFDLENBQUE7QUFFakUsMkJBQTRCLDZCQUE2QixDQUFDLENBQUE7QUFDMUQscUJBQXNCLHVCQUF1QixDQUFDLENBQUE7QUFDOUM7SUFBQTtJQVdBLENBQUM7SUFSRCxrQkFBa0I7SUFDWCxrQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDO29CQUN4QixRQUFRLEVBQUUsV0FBVztvQkFDckIsUUFBUSxFQUFFLGlDQUFpQztvQkFDM0MsVUFBVSxFQUFFLENBQUMscUNBQWlCLENBQUM7aUJBQ2hDLEVBQUcsRUFBRTtLQUNMLENBQUM7SUFDRixjQUFDO0FBQUQsQ0FBQyxBQVhELElBV0M7QUFYWSxlQUFPLFVBV25CLENBQUE7QUFFRCxpQkFDSSxHQUF5QixFQUN6QixRQUFvRDtJQUFwRCx3QkFBb0QsR0FBcEQsNENBQW9EO0lBQ3RELE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxHQUFHLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FB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