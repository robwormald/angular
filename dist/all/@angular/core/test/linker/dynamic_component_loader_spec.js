/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var testing_1 = require('@angular/core/testing');
var core_1 = require('@angular/core');
var metadata_1 = require('@angular/core/src/metadata');
var dynamic_component_loader_1 = require('@angular/core/src/linker/dynamic_component_loader');
var element_ref_1 = require('@angular/core/src/linker/element_ref');
var dom_tokens_1 = require('@angular/platform-browser/src/dom/dom_tokens');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var exceptions_1 = require('../../src/facade/exceptions');
var promise_1 = require('../../src/facade/promise');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
function main() {
    testing_internal_1.describe('DynamicComponentLoader', function () {
        testing_internal_1.describe('loading next to a location', function () {
            testing_internal_1.it('should work', testing_internal_1.inject([dynamic_component_loader_1.DynamicComponentLoader, testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (loader, tcb, async) {
                tcb.createAsync(MyComp3).then(function (tc) {
                    tc.detectChanges();
                    loader.loadNextToLocation(DynamicallyLoaded, tc.componentInstance.viewContainerRef)
                        .then(function (ref) {
                        matchers_1.expect(tc.debugElement.nativeElement).toHaveText('DynamicallyLoaded;');
                        async.done();
                    });
                });
            }));
            testing_internal_1.it('should return a disposable component ref', testing_internal_1.inject([dynamic_component_loader_1.DynamicComponentLoader, testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (loader, tcb, async) {
                tcb.createAsync(MyComp3).then(function (tc) {
                    tc.detectChanges();
                    loader.loadNextToLocation(DynamicallyLoaded, tc.componentInstance.viewContainerRef)
                        .then(function (ref) {
                        loader
                            .loadNextToLocation(DynamicallyLoaded2, tc.componentInstance.viewContainerRef)
                            .then(function (ref2) {
                            matchers_1.expect(tc.debugElement.nativeElement)
                                .toHaveText('DynamicallyLoaded;DynamicallyLoaded2;');
                            ref2.destroy();
                            matchers_1.expect(tc.debugElement.nativeElement).toHaveText('DynamicallyLoaded;');
                            async.done();
                        });
                    });
                });
            }));
            testing_internal_1.it('should update host properties', testing_internal_1.inject([dynamic_component_loader_1.DynamicComponentLoader, testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (loader, tcb, async) {
                tcb.createAsync(MyComp3).then(function (tc) {
                    tc.detectChanges();
                    loader
                        .loadNextToLocation(DynamicallyLoadedWithHostProps, tc.componentInstance.viewContainerRef)
                        .then(function (ref) {
                        ref.instance.id = 'new value';
                        tc.detectChanges();
                        var newlyInsertedElement = tc.debugElement.childNodes[1].nativeNode;
                        matchers_1.expect(newlyInsertedElement.id).toEqual('new value');
                        async.done();
                    });
                });
            }));
            testing_internal_1.it('should leave the view tree in a consistent state if hydration fails', testing_internal_1.inject([dynamic_component_loader_1.DynamicComponentLoader, testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (loader, tcb, async) {
                tcb.createAsync(MyComp3).then(function (tc) {
                    tc.detectChanges();
                    promise_1.PromiseWrapper.catchError(loader.loadNextToLocation(DynamicallyLoadedThrows, tc.componentInstance.viewContainerRef), function (error) {
                        matchers_1.expect(error.message).toContain('ThrownInConstructor');
                        matchers_1.expect(function () { return tc.detectChanges(); }).not.toThrow();
                        async.done();
                        return null;
                    });
                });
            }));
            testing_internal_1.it('should allow to pass projectable nodes', testing_internal_1.inject([dynamic_component_loader_1.DynamicComponentLoader, testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (loader, tcb, async) {
                tcb.createAsync(MyComp3).then(function (tc) {
                    tc.detectChanges();
                    loader
                        .loadNextToLocation(DynamicallyLoadedWithNgContent, tc.componentInstance.viewContainerRef, null, [[dom_adapter_1.getDOM().createTextNode('hello')]])
                        .then(function (ref) {
                        tc.detectChanges();
                        var newlyInsertedElement = tc.debugElement.childNodes[1].nativeNode;
                        matchers_1.expect(newlyInsertedElement).toHaveText('dynamic(hello)');
                        async.done();
                    });
                });
            }));
            testing_internal_1.it('should not throw if not enough projectable nodes are passed in', testing_internal_1.inject([dynamic_component_loader_1.DynamicComponentLoader, testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (loader, tcb, async) {
                tcb.createAsync(MyComp3).then(function (tc) {
                    tc.detectChanges();
                    loader
                        .loadNextToLocation(DynamicallyLoadedWithNgContent, tc.componentInstance.viewContainerRef, null, [])
                        .then(function (_) { async.done(); });
                });
            }));
        });
        testing_internal_1.describe('loadAsRoot', function () {
            testing_internal_1.it('should allow to create, update and destroy components', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, dynamic_component_loader_1.DynamicComponentLoader, dom_tokens_1.DOCUMENT, core_1.Injector], function (async, loader, doc /** TODO #9100 */, injector) {
                var rootEl = createRootElement(doc, 'child-cmp');
                dom_adapter_1.getDOM().appendChild(doc.body, rootEl);
                loader.loadAsRoot(ChildComp, null, injector).then(function (componentRef) {
                    var el = new testing_1.ComponentFixture(componentRef, null, false);
                    matchers_1.expect(rootEl.parentNode).toBe(doc.body);
                    el.detectChanges();
                    matchers_1.expect(rootEl).toHaveText('hello');
                    componentRef.instance.ctxProp = 'new';
                    el.detectChanges();
                    matchers_1.expect(rootEl).toHaveText('new');
                    componentRef.destroy();
                    matchers_1.expect(rootEl.parentNode).toBeFalsy();
                    async.done();
                });
            }));
            testing_internal_1.it('should allow to pass projectable nodes', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter, dynamic_component_loader_1.DynamicComponentLoader, dom_tokens_1.DOCUMENT, core_1.Injector], function (async, loader, doc /** TODO #9100 */, injector) {
                var rootEl = createRootElement(doc, 'dummy');
                dom_adapter_1.getDOM().appendChild(doc.body, rootEl);
                loader
                    .loadAsRoot(DynamicallyLoadedWithNgContent, null, injector, null, [[dom_adapter_1.getDOM().createTextNode('hello')]])
                    .then(function (_) {
                    matchers_1.expect(rootEl).toHaveText('dynamic(hello)');
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
function createRootElement(doc, name) {
    var nodes = dom_adapter_1.getDOM().querySelectorAll(doc, name);
    for (var i = 0; i < nodes.length; i++) {
        dom_adapter_1.getDOM().remove(nodes[i]);
    }
    var rootEl = browser_util_1.el("<" + name + "></" + name + ">");
    dom_adapter_1.getDOM().appendChild(doc.body, rootEl);
    return rootEl;
}
function filterByDirective(type) {
    return function (debugElement) { return debugElement.providerTokens.indexOf(type) !== -1; };
}
var ChildComp = (function () {
    function ChildComp(elementRef) {
        this.elementRef = elementRef;
        this.ctxProp = 'hello';
    }
    /** @nocollapse */
    ChildComp.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'child-cmp', template: '{{ctxProp}}' },] },
    ];
    /** @nocollapse */
    ChildComp.ctorParameters = [
        { type: element_ref_1.ElementRef, },
    ];
    return ChildComp;
}());
var DynamicallyLoaded = (function () {
    function DynamicallyLoaded() {
    }
    /** @nocollapse */
    DynamicallyLoaded.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'dummy', template: 'DynamicallyLoaded;' },] },
    ];
    return DynamicallyLoaded;
}());
var DynamicallyLoadedThrows = (function () {
    function DynamicallyLoadedThrows() {
        throw new exceptions_1.BaseException('ThrownInConstructor');
    }
    /** @nocollapse */
    DynamicallyLoadedThrows.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'dummy', template: 'DynamicallyLoaded;' },] },
    ];
    /** @nocollapse */
    DynamicallyLoadedThrows.ctorParameters = [];
    return DynamicallyLoadedThrows;
}());
var DynamicallyLoaded2 = (function () {
    function DynamicallyLoaded2() {
    }
    /** @nocollapse */
    DynamicallyLoaded2.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'dummy', template: 'DynamicallyLoaded2;' },] },
    ];
    return DynamicallyLoaded2;
}());
var DynamicallyLoadedWithHostProps = (function () {
    function DynamicallyLoadedWithHostProps() {
        this.id = 'default';
    }
    /** @nocollapse */
    DynamicallyLoadedWithHostProps.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'dummy', host: { '[id]': 'id' }, template: 'DynamicallyLoadedWithHostProps;' },] },
    ];
    /** @nocollapse */
    DynamicallyLoadedWithHostProps.ctorParameters = [];
    return DynamicallyLoadedWithHostProps;
}());
var DynamicallyLoadedWithNgContent = (function () {
    function DynamicallyLoadedWithNgContent() {
        this.id = 'default';
    }
    /** @nocollapse */
    DynamicallyLoadedWithNgContent.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'dummy', template: 'dynamic(<ng-content></ng-content>)' },] },
    ];
    /** @nocollapse */
    DynamicallyLoadedWithNgContent.ctorParameters = [];
    return DynamicallyLoadedWithNgContent;
}());
var MyComp3 = (function () {
    function MyComp3() {
        this.ctxBoolProp = false;
    }
    /** @nocollapse */
    MyComp3.decorators = [
        { type: metadata_1.Component, args: [{ selector: 'my-comp', directives: [], template: '<div #loc></div>' },] },
    ];
    /** @nocollapse */
    MyComp3.ctorParameters = [];
    /** @nocollapse */
    MyComp3.propDecorators = {
        'viewContainerRef': [{ type: core_1.ViewChild, args: ['loc', { read: core_1.ViewContainerRef },] },],
    };
    return MyComp3;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHluYW1pY19jb21wb25lbnRfbG9hZGVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvdGVzdC9saW5rZXIvZHluYW1pY19jb21wb25lbnRfbG9hZGVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUF5SCx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ2xLLHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ2xFLHdCQUFxRCx1QkFBdUIsQ0FBQyxDQUFBO0FBRTdFLHFCQUF3RSxlQUFlLENBQUMsQ0FBQTtBQUN4Rix5QkFBd0IsNEJBQTRCLENBQUMsQ0FBQTtBQUNyRCx5Q0FBcUMsbURBQW1ELENBQUMsQ0FBQTtBQUN6Riw0QkFBeUIsc0NBQXNDLENBQUMsQ0FBQTtBQUNoRSwyQkFBdUIsOENBQThDLENBQUMsQ0FBQTtBQUN0RSw0QkFBcUIsK0NBQStDLENBQUMsQ0FBQTtBQUNyRSwyQkFBNEIsNkJBQTZCLENBQUMsQ0FBQTtBQUMxRCx3QkFBNkIsMEJBQTBCLENBQUMsQ0FBQTtBQUN4RCw2QkFBaUIsZ0RBQWdELENBQUMsQ0FBQTtBQUVsRTtJQUNFLDJCQUFRLENBQUMsd0JBQXdCLEVBQUU7UUFDakMsMkJBQVEsQ0FBQyw0QkFBNEIsRUFBRTtZQUNyQyxxQkFBRSxDQUFDLGFBQWEsRUFDYix5QkFBTSxDQUNGLENBQUMsaURBQXNCLEVBQUUsOEJBQW9CLEVBQUUscUNBQWtCLENBQUMsRUFDbEUsVUFBQyxNQUE4QixFQUFFLEdBQXlCLEVBQ3pELEtBQXlCO2dCQUN4QixHQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLEVBQUU7b0JBQy9CLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztvQkFDbkIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxpQkFBaUIs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