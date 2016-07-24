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
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var renderer_1 = require('@angular/platform-browser/src/web_workers/worker/renderer');
var client_message_broker_1 = require('@angular/platform-browser/src/web_workers/shared/client_message_broker');
var serializer_1 = require('@angular/platform-browser/src/web_workers/shared/serializer');
var api_1 = require('@angular/core/src/render/api');
var dom_renderer_1 = require('@angular/platform-browser/src/dom/dom_renderer');
var debug_renderer_1 = require('@angular/core/src/debug/debug_renderer');
var render_store_1 = require('@angular/platform-browser/src/web_workers/shared/render_store');
var renderer_2 = require('@angular/platform-browser/src/web_workers/ui/renderer');
var web_worker_test_util_1 = require('../shared/web_worker_test_util');
var service_message_broker_1 = require('@angular/platform-browser/src/web_workers/shared/service_message_broker');
var browser_util_1 = require('../../../../platform-browser/testing/browser_util');
var testing_2 = require('@angular/platform-browser/testing');
var testing_3 = require('@angular/platform-browser-dynamic/testing');
function main() {
    function createWebWorkerBrokerFactory(messageBuses, workerSerializer, uiSerializer, domRootRenderer, uiRenderStore) {
        var uiMessageBus = messageBuses.ui;
        var workerMessageBus = messageBuses.worker;
        // set up the worker side
        var webWorkerBrokerFactory = new client_message_broker_1.ClientMessageBrokerFactory_(workerMessageBus, workerSerializer);
        // set up the ui side
        var uiMessageBrokerFactory = new service_message_broker_1.ServiceMessageBrokerFactory_(uiMessageBus, uiSerializer);
        var renderer = new renderer_2.MessageBasedRenderer(uiMessageBrokerFactory, uiMessageBus, uiSerializer, uiRenderStore, domRootRenderer);
        renderer.start();
        return webWorkerBrokerFactory;
    }
    function createWorkerRenderer(workerSerializer, uiSerializer, domRootRenderer, uiRenderStore, workerRenderStore) {
        var messageBuses = web_worker_test_util_1.createPairedMessageBuses();
        var brokerFactory = createWebWorkerBrokerFactory(messageBuses, workerSerializer, uiSerializer, domRootRenderer, uiRenderStore);
        var workerRootRenderer = new renderer_1.WebWorkerRootRenderer(brokerFactory, messageBuses.worker, workerSerializer, workerRenderStore);
        return new debug_renderer_1.DebugDomRootRenderer(workerRootRenderer);
    }
    testing_internal_1.describe('Web Worker Renderer', function () {
        var uiInjector;
        var uiRenderStore;
        var workerRenderStore;
        testing_internal_1.beforeEach(function () {
            uiRenderStore = new render_store_1.RenderStore();
            var testUiInjector = new testing_1.TestBed();
            testUiInjector.platform = testing_3.browserDynamicTestPlatform();
            testUiInjector.ngModule = testing_2.BrowserTestModule;
            testUiInjector.configureModule({
                providers: [
                    serializer_1.Serializer, { provide: render_store_1.RenderStore, useValue: uiRenderStore },
                    { provide: dom_renderer_1.DomRootRenderer, useClass: dom_renderer_1.DomRootRenderer_ },
                    { provide: api_1.RootRenderer, useExisting: dom_renderer_1.DomRootRenderer }
                ]
            });
            testUiInjector.initTestNgModule();
            var uiSerializer = testUiInjector.get(serializer_1.Serializer);
            var domRootRenderer = testUiInjector.get(dom_renderer_1.DomRootRenderer);
            workerRenderStore = new render_store_1.RenderStore();
            testing_1.configureModule({
                providers: [
                    serializer_1.Serializer, { provide: render_store_1.RenderStore, useValue: workerRenderStore }, {
                        provide: api_1.RootRenderer,
                        useFactory: function (workerSerializer) {
                            return createWorkerRenderer(workerSerializer, uiSerializer, domRootRenderer, uiRenderStore, workerRenderStore);
                        },
                        deps: [serializer_1.Serializer]
                    }
                ]
            });
        });
        function getRenderElement(workerEl) {
            var id = workerRenderStore.serialize(workerEl);
            return uiRenderStore.deserialize(id);
        }
        function getRenderer(componentRef) {
            return componentRef.hostView.internalView.renderer;
        }
        testing_internal_1.it('should update text nodes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MyComp2, new core_1.ViewMetadata({ template: '<div>{{ctxProp}}</div>' }))
                .createAsync(MyComp2)
                .then(function (fixture) {
                var renderEl = getRenderElement(fixture.debugElement.nativeElement);
                matchers_1.expect(renderEl).toHaveText('');
                fixture.debugElement.componentInstance.ctxProp = 'Hello World!';
                fixture.detectChanges();
                matchers_1.expect(renderEl).toHaveText('Hello World!');
                async.done();
            });
        }));
        testing_internal_1.it('should update any element property/attributes/class/style(s) independent of the compilation on the root element and other elements', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MyComp2, new core_1.ViewMetadata({ template: '<input [title]="y" style="position:absolute">' }))
                .createAsync(MyComp2)
                .then(function (fixture) {
                var checkSetters = function (componentRef /** TODO #9100 */, workerEl /** TODO #9100 */) {
                    var renderer = getRenderer(componentRef);
                    var el = getRenderElement(workerEl);
                    renderer.setElementProperty(workerEl, 'tabIndex', 1);
                    matchers_1.expect(el.tabIndex).toEqual(1);
                    renderer.setElementClass(workerEl, 'a', true);
                    matchers_1.expect(dom_adapter_1.getDOM().hasClass(el, 'a')).toBe(true);
                    renderer.setElementClass(workerEl, 'a', false);
                    matchers_1.expect(dom_adapter_1.getDOM().hasClass(el, 'a')).toBe(false);
                    renderer.setElementStyle(workerEl, 'width', '10px');
                    matchers_1.expect(dom_adapter_1.getDOM().getStyle(el, 'width')).toEqual('10px');
                    renderer.setElementStyle(workerEl, 'width', null);
                    matchers_1.expect(dom_adapter_1.getDOM().getStyle(el, 'width')).toEqual('');
                    renderer.setElementAttribute(workerEl, 'someattr', 'someValue');
                    matchers_1.expect(dom_adapter_1.getDOM().getAttribute(el, 'someattr')).toEqual('someValue');
                };
                // root element
                checkSetters(fixture.componentRef, fixture.debugElement.nativeElement);
                // nested elements
                checkSetters(fixture.componentRef, fixture.debugElement.children[0].nativeElement);
                async.done();
            });
        }));
        testing_internal_1.it('should update any template comment property/attributes', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            var tpl = '<template [ngIf]="ctxBoolProp"></template>';
            tcb.overrideView(MyComp2, new core_1.ViewMetadata({ template: tpl, directives: [common_1.NgIf] }))
                .createAsync(MyComp2)
                .then(function (fixture) {
                fixture.debugElement.componentInstance.ctxBoolProp = true;
                fixture.detectChanges();
                var el = getRenderElement(fixture.debugElement.nativeElement);
                matchers_1.expect(dom_adapter_1.getDOM().getInnerHTML(el)).toContain('"ng-reflect-ng-if": "true"');
                async.done();
            });
        }));
        testing_internal_1.it('should add and remove fragments', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(MyComp2, new core_1.ViewMetadata({
                template: '<template [ngIf]="ctxBoolProp">hello</template>',
                directives: [common_1.NgIf]
            }))
                .createAsync(MyComp2)
                .then(function (fixture) {
                var rootEl = getRenderElement(fixture.debugElement.nativeElement);
                matchers_1.expect(rootEl).toHaveText('');
                fixture.debugElement.componentInstance.ctxBoolProp = true;
                fixture.detectChanges();
                matchers_1.expect(rootEl).toHaveText('hello');
                fixture.debugElement.componentInstance.ctxBoolProp = false;
                fixture.detectChanges();
                matchers_1.expect(rootEl).toHaveText('');
                async.done();
            });
        }));
        if (dom_adapter_1.getDOM().supportsDOMEvents()) {
            testing_internal_1.it('should call actions on the element', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp2, new core_1.ViewMetadata({ template: '<input [title]="y">' }))
                    .createAsync(MyComp2)
                    .then(function (fixture) {
                    var el = fixture.debugElement.children[0];
                    getRenderer(fixture.componentRef)
                        .invokeElementMethod(el.nativeElement, 'setAttribute', ['a', 'b']);
                    matchers_1.expect(dom_adapter_1.getDOM().getAttribute(getRenderElement(el.nativeElement), 'a'))
                        .toEqual('b');
                    async.done();
                });
            }));
            testing_internal_1.it('should listen to events', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideView(MyComp2, new core_1.ViewMetadata({ template: '<input (change)="ctxNumProp = 1">' }))
                    .createAsync(MyComp2)
                    .then(function (fixture) {
                    var el = fixture.debugElement.children[0];
                    browser_util_1.dispatchEvent(getRenderElement(el.nativeElement), 'change');
                    matchers_1.expect(fixture.componentInstance.ctxNumProp).toBe(1);
                    fixture.destroy();
                    async.done();
                });
            }));
        }
    });
}
exports.main = main;
var MyComp2 = (function () {
    function MyComp2() {
        this.ctxProp = 'initial value';
        this.ctxNumProp = 0;
        this.ctxBoolProp = false;
    }
    MyComp2.prototype.throwError = function () { throw 'boom'; };
    /** @nocollapse */
    MyComp2.decorators = [
        { type: core_1.Component, args: [{ selector: 'my-comp', directives: [] },] },
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    MyComp2.ctorParameters = [];
    return MyComp2;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyZXJfaW50ZWdyYXRpb25fc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlci90ZXN0L3dlYl93b3JrZXJzL3dvcmtlci9yZW5kZXJlcl9pbnRlZ3JhdGlvbl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBeUcsd0NBQXdDLENBQUMsQ0FBQTtBQUNsSix5QkFBcUIsNENBQTRDLENBQUMsQ0FBQTtBQUNsRSx3QkFBNkQsdUJBQXVCLENBQUMsQ0FBQTtBQUNyRiw0QkFBcUIsK0NBQStDLENBQUMsQ0FBQTtBQUNyRSxxQkFBMkcsZUFBZSxDQUFDLENBQUE7QUFDM0gsdUJBQW1CLGlCQUFpQixDQUFDLENBQUE7QUFDckMseUJBQW9DLDJEQUEyRCxDQUFDLENBQUE7QUFDaEcsc0NBQXNFLHdFQUF3RSxDQUFDLENBQUE7QUFDL0ksMkJBQXlCLDZEQUE2RCxDQUFDLENBQUE7QUFDdkYsb0JBQTJCLDhCQUE4QixDQUFDLENBQUE7QUFDMUQsNkJBQWdELGdEQUFnRCxDQUFDLENBQUE7QUFDakcsK0JBQW1DLHdDQUF3QyxDQUFDLENBQUE7QUFDNUUsNkJBQTBCLCtEQUErRCxDQUFDLENBQUE7QUFDMUYseUJBQW1DLHVEQUF1RCxDQUFDLENBQUE7QUFDM0YscUNBQTJELGdDQUFnQyxDQUFDLENBQUE7QUFDNUYsdUNBQTJDLHlFQUF5RSxDQUFDLENBQUE7QUFDckgsNkJBQTRCLG1EQUFtRCxDQUFDLENBQUE7QUFDaEYsd0JBQWdDLG1DQUFtQyxDQUFDLENBQUE7QUFDcEUsd0JBQXlDLDJDQUEyQyxDQUFDLENBQUE7QUFFckY7SUFDRSxzQ0FDSSxZQUFnQyxFQUFFLGdCQUE0QixFQUFFLFlBQXdCLEVBQ3hGLGVBQWdDLEVBQUUsYUFBMEI7UUFDOUQsSUFBSSxZQUFZLEdBQUcsWUFBWSxDQUFDLEVBQUUs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