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
var lang_1 = require('../../src/facade/lang');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var dom_adapter_1 = require('@angular/platform-browser/src/dom/dom_adapter');
var ALL_DIRECTIVES = [
    core_1.forwardRef(function () { return SimpleDirective; }),
    core_1.forwardRef(function () { return CycleDirective; }),
    core_1.forwardRef(function () { return SimpleComponent; }),
    core_1.forwardRef(function () { return SomeOtherDirective; }),
    core_1.forwardRef(function () { return NeedsDirectiveFromSelf; }),
    core_1.forwardRef(function () { return NeedsServiceComponent; }),
    core_1.forwardRef(function () { return OptionallyNeedsDirective; }),
    core_1.forwardRef(function () { return NeedsComponentFromHost; }),
    core_1.forwardRef(function () { return NeedsDirectiveFromHost; }),
    core_1.forwardRef(function () { return NeedsDirective; }),
    core_1.forwardRef(function () { return NeedsService; }),
    core_1.forwardRef(function () { return NeedsAppService; }),
    core_1.forwardRef(function () { return NeedsAttribute; }),
    core_1.forwardRef(function () { return NeedsAttributeNoType; }),
    core_1.forwardRef(function () { return NeedsElementRef; }),
    core_1.forwardRef(function () { return NeedsViewContainerRef; }),
    core_1.forwardRef(function () { return NeedsTemplateRef; }),
    core_1.forwardRef(function () { return OptionallyNeedsTemplateRef; }),
    core_1.forwardRef(function () { return DirectiveNeedsChangeDetectorRef; }),
    core_1.forwardRef(function () { return PushComponentNeedsChangeDetectorRef; }),
    core_1.forwardRef(function () { return NeedsServiceFromHost; }),
    core_1.forwardRef(function () { return NeedsAttribute; }),
    core_1.forwardRef(function () { return NeedsAttributeNoType; }),
    core_1.forwardRef(function () { return NeedsElementRef; }),
    core_1.forwardRef(function () { return NeedsViewContainerRef; }),
    core_1.forwardRef(function () { return NeedsTemplateRef; }),
    core_1.forwardRef(function () { return OptionallyNeedsTemplateRef; }),
    core_1.forwardRef(function () { return DirectiveNeedsChangeDetectorRef; }),
    core_1.forwardRef(function () { return PushComponentNeedsChangeDetectorRef; }),
    core_1.forwardRef(function () { return NeedsHostAppService; }),
    common_1.NgIf,
    common_1.NgFor
];
var ALL_PIPES = [
    core_1.forwardRef(function () { return PipeNeedsChangeDetectorRef; }),
    core_1.forwardRef(function () { return PipeNeedsService; }),
    core_1.forwardRef(function () { return PurePipe; }),
    core_1.forwardRef(function () { return ImpurePipe; }),
    core_1.forwardRef(function () { return DuplicatePipe1; }),
    core_1.forwardRef(function () { return DuplicatePipe2; }),
];
var SimpleDirective = (function () {
    function SimpleDirective() {
        this.value = null;
    }
    /** @nocollapse */
    SimpleDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[simpleDirective]' },] },
    ];
    /** @nocollapse */
    SimpleDirective.propDecorators = {
        'value': [{ type: core_1.Input, args: ['simpleDirective',] },],
    };
    return SimpleDirective;
}());
var SimpleComponent = (function () {
    function SimpleComponent() {
    }
    /** @nocollapse */
    SimpleComponent.decorators = [
        { type: core_1.Component, args: [{ selector: '[simpleComponent]', template: '', directives: ALL_DIRECTIVES },] },
    ];
    return SimpleComponent;
}());
var SomeOtherDirective = (function () {
    function SomeOtherDirective() {
    }
    /** @nocollapse */
    SomeOtherDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[someOtherDirective]' },] },
    ];
    return SomeOtherDirective;
}());
var CycleDirective = (function () {
    function CycleDirective(self) {
    }
    /** @nocollapse */
    CycleDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[cycleDirective]' },] },
    ];
    /** @nocollapse */
    CycleDirective.ctorParameters = [
        { type: CycleDirective, },
    ];
    return CycleDirective;
}());
var NeedsDirectiveFromSelf = (function () {
    function NeedsDirectiveFromSelf(dependency) {
        this.dependency = dependency;
    }
    /** @nocollapse */
    NeedsDirectiveFromSelf.decorators = [
        { type: core_1.Directive, args: [{ selector: '[needsDirectiveFromSelf]' },] },
    ];
    /** @nocollapse */
    NeedsDirectiveFromSelf.ctorParameters = [
        { type: SimpleDirective, decorators: [{ type: core_1.Self },] },
    ];
    return NeedsDirectiveFromSelf;
}());
var OptionallyNeedsDirective = (function () {
    function OptionallyNeedsDirective(dependency) {
        this.dependency = dependency;
    }
    /** @nocollapse */
    OptionallyNeedsDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[optionallyNeedsDirective]' },] },
    ];
    /** @nocollapse */
    OptionallyNeedsDirective.ctorParameters = [
        { type: SimpleDirective, decorators: [{ type: core_1.Self }, { type: core_1.Optional },] },
    ];
    return OptionallyNeedsDirective;
}());
var NeedsComponentFromHost = (function () {
    function NeedsComponentFromHost(dependency) {
        this.dependency = dependency;
    }
    /** @nocollapse */
    NeedsComponentFromHost.decorators = [
        { type: core_1.Directive, args: [{ selector: '[needsComponentFromHost]' },] },
    ];
    /** @nocollapse */
    NeedsComponentFromHost.ctorParameters = [
        { type: SimpleComponent, decorators: [{ type: core_1.Host },] },
    ];
    return NeedsComponentFromHost;
}());
var NeedsDirectiveFromHost = (function () {
    function NeedsDirectiveFromHost(dependency) {
        this.dependency = dependency;
    }
    /** @nocollapse */
    NeedsDirectiveFromHost.decorators = [
        { type: core_1.Directive, args: [{ selector: '[needsDirectiveFromHost]' },] },
    ];
    /** @nocollapse */
    NeedsDirectiveFromHost.ctorParameters = [
        { type: SimpleDirective, decorators: [{ type: core_1.Host },] },
    ];
    return NeedsDirectiveFromHost;
}());
var NeedsDirective = (function () {
    function NeedsDirective(dependency) {
        this.dependency = dependency;
    }
    /** @nocollapse */
    NeedsDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[needsDirective]' },] },
    ];
    /** @nocollapse */
    NeedsDirective.ctorParameters = [
        { type: SimpleDirective, },
    ];
    return NeedsDirective;
}());
var NeedsService = (function () {
    function NeedsService(service /** TODO #9100 */) {
        this.service = service;
    }
    /** @nocollapse */
    NeedsService.decorators = [
        { type: core_1.Directive, args: [{ selector: '[needsService]' },] },
    ];
    /** @nocollapse */
    NeedsService.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: ['service',] },] },
    ];
    return NeedsService;
}());
var NeedsAppService = (function () {
    function NeedsAppService(service /** TODO #9100 */) {
        this.service = service;
    }
    /** @nocollapse */
    NeedsAppService.decorators = [
        { type: core_1.Directive, args: [{ selector: '[needsAppService]' },] },
    ];
    /** @nocollapse */
    NeedsAppService.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: ['appService',] },] },
    ];
    return NeedsAppService;
}());
var NeedsHostAppService = (function () {
    function NeedsHostAppService(service /** TODO #9100 */) {
        this.service = service;
    }
    /** @nocollapse */
    NeedsHostAppService.decorators = [
        { type: core_1.Component, args: [{ selector: '[needsHostAppService]', template: '', directives: ALL_DIRECTIVES },] },
    ];
    /** @nocollapse */
    NeedsHostAppService.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Host }, { type: core_1.Inject, args: ['appService',] },] },
    ];
    return NeedsHostAppService;
}());
var NeedsServiceComponent = (function () {
    function NeedsServiceComponent(service /** TODO #9100 */) {
        this.service = service;
    }
    /** @nocollapse */
    NeedsServiceComponent.decorators = [
        { type: core_1.Component, args: [{ selector: '[needsServiceComponent]', template: '' },] },
    ];
    /** @nocollapse */
    NeedsServiceComponent.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: ['service',] },] },
    ];
    return NeedsServiceComponent;
}());
var NeedsServiceFromHost = (function () {
    function NeedsServiceFromHost(service /** TODO #9100 */) {
        this.service = service;
    }
    /** @nocollapse */
    NeedsServiceFromHost.decorators = [
        { type: core_1.Directive, args: [{ selector: '[needsServiceFromHost]' },] },
    ];
    /** @nocollapse */
    NeedsServiceFromHost.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Host }, { type: core_1.Inject, args: ['service',] },] },
    ];
    return NeedsServiceFromHost;
}());
var NeedsAttribute = (function () {
    function NeedsAttribute(typeAttribute, titleAttribute, fooAttribute) {
        this.typeAttribute = typeAttribute;
        this.titleAttribute = titleAttribute;
        this.fooAttribute = fooAttribute;
    }
    /** @nocollapse */
    NeedsAttribute.decorators = [
        { type: core_1.Directive, args: [{ selector: '[needsAttribute]' },] },
    ];
    /** @nocollapse */
    NeedsAttribute.ctorParameters = [
        { type: String, decorators: [{ type: core_1.Attribute, args: ['type',] },] },
        { type: String, decorators: [{ type: core_1.Attribute, args: ['title',] },] },
        { type: String, decorators: [{ type: core_1.Attribute, args: ['foo',] },] },
    ];
    return NeedsAttribute;
}());
var NeedsAttributeNoType = (function () {
    function NeedsAttributeNoType(fooAttribute /** TODO #9100 */) {
        this.fooAttribute = fooAttribute;
    }
    /** @nocollapse */
    NeedsAttributeNoType.decorators = [
        { type: core_1.Directive, args: [{ selector: '[needsAttributeNoType]' },] },
    ];
    /** @nocollapse */
    NeedsAttributeNoType.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Attribute, args: ['foo',] },] },
    ];
    return NeedsAttributeNoType;
}());
var NeedsElementRef = (function () {
    function NeedsElementRef(ref) {
        this.elementRef = ref;
    }
    /** @nocollapse */
    NeedsElementRef.decorators = [
        { type: core_1.Directive, args: [{ selector: '[needsElementRef]' },] },
    ];
    /** @nocollapse */
    NeedsElementRef.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    return NeedsElementRef;
}());
var NeedsViewContainerRef = (function () {
    function NeedsViewContainerRef(vc) {
        this.viewContainer = vc;
    }
    /** @nocollapse */
    NeedsViewContainerRef.decorators = [
        { type: core_1.Directive, args: [{ selector: '[needsViewContainerRef]' },] },
    ];
    /** @nocollapse */
    NeedsViewContainerRef.ctorParameters = [
        { type: core_1.ViewContainerRef, },
    ];
    return NeedsViewContainerRef;
}());
var NeedsTemplateRef = (function () {
    function NeedsTemplateRef(ref) {
        this.templateRef = ref;
    }
    /** @nocollapse */
    NeedsTemplateRef.decorators = [
        { type: core_1.Directive, args: [{ selector: '[needsTemplateRef]' },] },
    ];
    /** @nocollapse */
    NeedsTemplateRef.ctorParameters = [
        { type: core_1.TemplateRef, },
    ];
    return NeedsTemplateRef;
}());
var OptionallyNeedsTemplateRef = (function () {
    function OptionallyNeedsTemplateRef(ref) {
        this.templateRef = ref;
    }
    /** @nocollapse */
    OptionallyNeedsTemplateRef.decorators = [
        { type: core_1.Directive, args: [{ selector: '[optionallyNeedsTemplateRef]' },] },
    ];
    /** @nocollapse */
    OptionallyNeedsTemplateRef.ctorParameters = [
        { type: core_1.TemplateRef, decorators: [{ type: core_1.Optional },] },
    ];
    return OptionallyNeedsTemplateRef;
}());
var DirectiveNeedsChangeDetectorRef = (function () {
    function DirectiveNeedsChangeDetectorRef(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
    }
    /** @nocollapse */
    DirectiveNeedsChangeDetectorRef.decorators = [
        { type: core_1.Directive, args: [{ selector: '[directiveNeedsChangeDetectorRef]' },] },
    ];
    /** @nocollapse */
    DirectiveNeedsChangeDetectorRef.ctorParameters = [
        { type: core_1.ChangeDetectorRef, },
    ];
    return DirectiveNeedsChangeDetectorRef;
}());
var PushComponentNeedsChangeDetectorRef = (function () {
    function PushComponentNeedsChangeDetectorRef(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
        this.counter = 0;
    }
    /** @nocollapse */
    PushComponentNeedsChangeDetectorRef.decorators = [
        { type: core_1.Component, args: [{
                    selector: '[componentNeedsChangeDetectorRef]',
                    template: '{{counter}}',
                    directives: ALL_DIRECTIVES,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    PushComponentNeedsChangeDetectorRef.ctorParameters = [
        { type: core_1.ChangeDetectorRef, },
    ];
    return PushComponentNeedsChangeDetectorRef;
}());
var PurePipe = (function () {
    function PurePipe() {
    }
    PurePipe.prototype.transform = function (value) { return this; };
    /** @nocollapse */
    PurePipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'purePipe', pure: true },] },
    ];
    /** @nocollapse */
    PurePipe.ctorParameters = [];
    return PurePipe;
}());
var ImpurePipe = (function () {
    function ImpurePipe() {
    }
    ImpurePipe.prototype.transform = function (value) { return this; };
    /** @nocollapse */
    ImpurePipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'impurePipe', pure: false },] },
    ];
    /** @nocollapse */
    ImpurePipe.ctorParameters = [];
    return ImpurePipe;
}());
var PipeNeedsChangeDetectorRef = (function () {
    function PipeNeedsChangeDetectorRef(changeDetectorRef) {
        this.changeDetectorRef = changeDetectorRef;
    }
    PipeNeedsChangeDetectorRef.prototype.transform = function (value) { return this; };
    /** @nocollapse */
    PipeNeedsChangeDetectorRef.decorators = [
        { type: core_1.Pipe, args: [{ name: 'pipeNeedsChangeDetectorRef' },] },
    ];
    /** @nocollapse */
    PipeNeedsChangeDetectorRef.ctorParameters = [
        { type: core_1.ChangeDetectorRef, },
    ];
    return PipeNeedsChangeDetectorRef;
}());
var PipeNeedsService = (function () {
    function PipeNeedsService(service /** TODO #9100 */) {
        this.service = service;
    }
    PipeNeedsService.prototype.transform = function (value) { return this; };
    /** @nocollapse */
    PipeNeedsService.decorators = [
        { type: core_1.Pipe, args: [{ name: 'pipeNeedsService' },] },
    ];
    /** @nocollapse */
    PipeNeedsService.ctorParameters = [
        { type: undefined, decorators: [{ type: core_1.Inject, args: ['service',] },] },
    ];
    return PipeNeedsService;
}());
exports.PipeNeedsService = PipeNeedsService;
var DuplicatePipe1 = (function () {
    function DuplicatePipe1() {
    }
    DuplicatePipe1.prototype.transform = function (value) { return this; };
    /** @nocollapse */
    DuplicatePipe1.decorators = [
        { type: core_1.Pipe, args: [{ name: 'duplicatePipe' },] },
    ];
    return DuplicatePipe1;
}());
exports.DuplicatePipe1 = DuplicatePipe1;
var DuplicatePipe2 = (function () {
    function DuplicatePipe2() {
    }
    DuplicatePipe2.prototype.transform = function (value) { return this; };
    /** @nocollapse */
    DuplicatePipe2.decorators = [
        { type: core_1.Pipe, args: [{ name: 'duplicatePipe' },] },
    ];
    return DuplicatePipe2;
}());
exports.DuplicatePipe2 = DuplicatePipe2;
var TestComp = (function () {
    function TestComp() {
    }
    /** @nocollapse */
    TestComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'root' },] },
    ];
    return TestComp;
}());
function main() {
    var tcb;
    function createCompFixture(template, tcb, comp) {
        if (comp === void 0) { comp = null; }
        if (lang_1.isBlank(comp)) {
            comp = TestComp;
        }
        return tcb
            .overrideView(comp, new core_1.ViewMetadata({ template: template, directives: ALL_DIRECTIVES, pipes: ALL_PIPES }))
            .createFakeAsync(comp);
    }
    function createComp(template, tcb, comp) {
        if (comp === void 0) { comp = null; }
        var fixture = createCompFixture(template, tcb, comp);
        fixture.detectChanges();
        return fixture.debugElement;
    }
    testing_internal_1.describe('View Injector', function () {
        // On CJS fakeAsync is not supported...
        if (!dom_adapter_1.getDOM().supportsDOMEvents())
            return;
        testing_internal_1.beforeEachProviders(function () { return [{ provide: 'appService', useValue: 'appService' }]; });
        testing_internal_1.beforeEach(testing_internal_1.inject([testing_1.TestComponentBuilder], function (_tcb) { tcb = _tcb; }));
        testing_internal_1.describe('injection', function () {
            testing_internal_1.it('should instantiate directives that have no dependencies', testing_1.fakeAsync(function () {
                var el = createComp('<div simpleDirective>', tcb);
                matchers_1.expect(el.children[0].injector.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
            }));
            testing_internal_1.it('should instantiate directives that depend on another directive', testing_1.fakeAsync(function () {
                var el = createComp('<div simpleDirective needsDirective>', tcb);
                var d = el.children[0].injector.get(NeedsDirective);
                matchers_1.expect(d).toBeAnInstanceOf(NeedsDirective);
                matchers_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
            }));
            testing_internal_1.it('should support useValue with different values', testing_1.fakeAsync(function () {
                var el = createComp('', tcb.overrideProviders(TestComp, [
                    { provide: 'numLiteral', useValue: 0 },
                    { provide: 'boolLiteral', useValue: true },
                    { provide: 'strLiteral', useValue: 'a' },
                    { provide: 'null', useValue: null },
                    { provide: 'array', useValue: [1] },
                    { provide: 'map', useValue: { 'a': 1 } },
                    { provide: 'instance', useValue: new TestValue('a') },
                    { provide: 'nested', useValue: [{ 'a': [1] }, new TestValue('b')] },
                ]));
                matchers_1.expect(el.injector.get('numLiteral')).toBe(0);
                matchers_1.expect(el.injector.get('boolLiteral')).toBe(true);
                matchers_1.expect(el.injector.get('strLiteral')).toBe('a');
                matchers_1.expect(el.injector.get('null')).toBe(null);
                matchers_1.expect(el.injector.get('array')).toEqual([1]);
                matchers_1.expect(el.injector.get('map')).toEqual({ 'a': 1 });
                matchers_1.expect(el.injector.get('instance')).toEqual(new TestValue('a'));
                matchers_1.expect(el.injector.get('nested')).toEqual([{ 'a': [1] }, new TestValue('b')]);
            }));
            testing_internal_1.it('should instantiate providers that have dependencies with SkipSelf', testing_1.fakeAsync(function () {
                var el = createComp('<div simpleDirective><span someOtherDirective></span></div>', tcb.overrideProviders(SimpleDirective, [{ provide: 'injectable1', useValue: 'injectable1' }])
                    .overrideProviders(SomeOtherDirective, [
                    { provide: 'injectable1', useValue: 'new-injectable1' }, {
                        provide: 'injectable2',
                        useFactory: function (val /** TODO #9100 */) { return (val + "-injectable2"); },
                        deps: [[new core_1.InjectMetadata('injectable1'), new core_1.SkipSelfMetadata()]]
                    }
                ]));
                matchers_1.expect(el.children[0].children[0].injector.get('injectable2'))
                    .toEqual('injectable1-injectable2');
            }));
            testing_internal_1.it('should instantiate providers that have dependencies', testing_1.fakeAsync(function () {
                var providers = [
                    { provide: 'injectable1', useValue: 'injectable1' }, {
                        provide: 'injectable2',
                        useFactory: function (val /** TODO #9100 */) { return (val + "-injectable2"); },
                        deps: ['injectable1']
                    }
                ];
                var el = createComp('<div simpleDirective></div>', tcb.overrideProviders(SimpleDirective, providers));
                matchers_1.expect(el.children[0].injector.get('injectable2')).toEqual('injectable1-injectable2');
            }));
            testing_internal_1.it('should instantiate viewProviders that have dependencies', testing_1.fakeAsync(function () {
                var viewProviders = [
                    { provide: 'injectable1', useValue: 'injectable1' }, {
                        provide: 'injectable2',
                        useFactory: function (val /** TODO #9100 */) { return (val + "-injectable2"); },
                        deps: ['injectable1']
                    }
                ];
                var el = createComp('<div simpleComponent></div>', tcb.overrideViewProviders(SimpleComponent, viewProviders));
                matchers_1.expect(el.children[0].injector.get('injectable2')).toEqual('injectable1-injectable2');
            }));
            testing_internal_1.it('should instantiate components that depend on viewProviders providers', testing_1.fakeAsync(function () {
                var el = createComp('<div needsServiceComponent></div>', tcb.overrideViewProviders(NeedsServiceComponent, [{ provide: 'service', useValue: 'service' }]));
                matchers_1.expect(el.children[0].injector.get(NeedsServiceComponent).service).toEqual('service');
            }));
            testing_internal_1.it('should instantiate multi providers', testing_1.fakeAsync(function () {
                var providers = [
                    { provide: 'injectable1', useValue: 'injectable11', multi: true },
                    { provide: 'injectable1', useValue: 'injectable12', multi: true }
                ];
                var el = createComp('<div simpleDirective></div>', tcb.overrideProviders(SimpleDirective, providers));
                matchers_1.expect(el.children[0].injector.get('injectable1')).toEqual([
                    'injectable11', 'injectable12'
                ]);
            }));
            testing_internal_1.it('should instantiate providers lazily', testing_1.fakeAsync(function () {
                var created = false;
                var el = createComp('<div simpleDirective></div>', tcb.overrideProviders(SimpleDirective, [{ provide: 'service', useFactory: function () { return created = true; } }]));
                matchers_1.expect(created).toBe(false);
                el.children[0].injector.get('service');
                matchers_1.expect(created).toBe(true);
            }));
            testing_internal_1.it('should instantiate view providers lazily', testing_1.fakeAsync(function () {
                var created = false;
                var el = createComp('<div simpleComponent></div>', tcb.overrideViewProviders(SimpleComponent, [{ provide: 'service', useFactory: function () { return created = true; } }]));
                matchers_1.expect(created).toBe(false);
                el.children[0].injector.get('service');
                matchers_1.expect(created).toBe(true);
            }));
            testing_internal_1.it('should not instantiate other directives that depend on viewProviders providers (same element)', testing_1.fakeAsync(function () {
                matchers_1.expect(function () { return createComp('<div simpleComponent needsService></div>', tcb.overrideViewProviders(SimpleComponent, [{ provide: 'service', useValue: 'service' }])); })
                    .toThrowError(/No provider for service!/);
            }));
            testing_internal_1.it('should not instantiate other directives that depend on viewProviders providers (child element)', testing_1.fakeAsync(function () {
                matchers_1.expect(function () { return createComp('<div simpleComponent><div needsService></div></div>', tcb.overrideViewProviders(SimpleComponent, [{ provide: 'service', useValue: 'service' }])); })
                    .toThrowError(/No provider for service!/);
            }));
            testing_internal_1.it('should instantiate directives that depend on providers of other directives', testing_1.fakeAsync(function () {
                var el = createComp('<div simpleDirective><div needsService></div></div>', tcb.overrideProviders(SimpleDirective, [{ provide: 'service', useValue: 'parentService' }]));
                matchers_1.expect(el.children[0].children[0].injector.get(NeedsService).service)
                    .toEqual('parentService');
            }));
            testing_internal_1.it('should instantiate directives that depend on providers in a parent view', testing_1.fakeAsync(function () {
                var el = createComp('<div simpleDirective><template [ngIf]="true"><div *ngIf="true" needsService></div></template></div>', tcb.overrideProviders(SimpleDirective, [{ provide: 'service', useValue: 'parentService' }]));
                matchers_1.expect(el.children[0].children[0].injector.get(NeedsService).service)
                    .toEqual('parentService');
            }));
            testing_internal_1.it('should instantiate directives that depend on providers of a component', testing_1.fakeAsync(function () {
                var el = createComp('<div simpleComponent></div>', tcb.overrideTemplate(SimpleComponent, '<div needsService></div>')
                    .overrideProviders(SimpleComponent, [{ provide: 'service', useValue: 'hostService' }]));
                matchers_1.expect(el.children[0].children[0].injector.get(NeedsService).service)
                    .toEqual('hostService');
            }));
            testing_internal_1.it('should instantiate directives that depend on view providers of a component', testing_1.fakeAsync(function () {
                var el = createComp('<div simpleComponent></div>', tcb.overrideTemplate(SimpleComponent, '<div needsService></div>')
                    .overrideViewProviders(SimpleComponent, [{ provide: 'service', useValue: 'hostService' }]));
                matchers_1.expect(el.children[0].children[0].injector.get(NeedsService).service)
                    .toEqual('hostService');
            }));
            testing_internal_1.it('should instantiate directives in a root embedded view that depend on view providers of a component', testing_1.fakeAsync(function () {
                var el = createComp('<div simpleComponent></div>', tcb.overrideTemplate(SimpleComponent, '<div *ngIf="true" needsService></div>')
                    .overrideViewProviders(SimpleComponent, [{ provide: 'service', useValue: 'hostService' }]));
                matchers_1.expect(el.children[0].children[0].injector.get(NeedsService).service)
                    .toEqual('hostService');
            }));
            testing_internal_1.it('should instantiate directives that depend on instances in the app injector', testing_1.fakeAsync(function () {
                var el = createComp('<div needsAppService></div>', tcb);
                matchers_1.expect(el.children[0].injector.get(NeedsAppService).service).toEqual('appService');
            }));
            testing_internal_1.it('should not instantiate a directive with cyclic dependencies', testing_1.fakeAsync(function () {
                matchers_1.expect(function () { return createComp('<div cycleDirective></div>', tcb); })
                    .toThrowError('Template parse errors:\nCannot instantiate cyclic dependency! CycleDirective ("[ERROR ->]<div cycleDirective></div>"): TestComp@0:0');
            }));
            testing_internal_1.it('should not instantiate a directive in a view that has a host dependency on providers' +
                ' of the component', testing_1.fakeAsync(function () {
                matchers_1.expect(function () { return createComp('<div simpleComponent></div>', tcb.overrideProviders(SimpleComponent, [{ provide: 'service', useValue: 'hostService' }])
                    .overrideTemplate(SimpleComponent, '<div needsServiceFromHost><div>')); })
                    .toThrowError("Template parse errors:\nNo provider for service (\"[ERROR ->]<div needsServiceFromHost><div>\"): SimpleComponent@0:0");
            }));
            testing_internal_1.it('should not instantiate a directive in a view that has a host dependency on providers' +
                ' of a decorator directive', testing_1.fakeAsync(function () {
                matchers_1.expect(function () { return createComp('<div simpleComponent someOtherDirective></div>', tcb.overrideProviders(SomeOtherDirective, [{ provide: 'service', useValue: 'hostService' }])
                    .overrideTemplate(SimpleComponent, '<div needsServiceFromHost><div>')); })
                    .toThrowError("Template parse errors:\nNo provider for service (\"[ERROR ->]<div needsServiceFromHost><div>\"): SimpleComponent@0:0");
            }));
            testing_internal_1.it('should not instantiate a directive in a view that has a self dependency on a parent directive', testing_1.fakeAsync(function () {
                matchers_1.expect(function () {
                    return createComp('<div simpleDirective><div needsDirectiveFromSelf></div></div>', tcb);
                })
                    .toThrowError("Template parse errors:\nNo provider for SimpleDirective (\"<div simpleDirective>[ERROR ->]<div needsDirectiveFromSelf></div></div>\"): TestComp@0:21");
            }));
            testing_internal_1.it('should instantiate directives that depend on other directives', testing_1.fakeAsync(function () {
                var el = createComp('<div simpleDirective><div needsDirective></div></div>', tcb);
                var d = el.children[0].children[0].injector.get(NeedsDirective);
                matchers_1.expect(d).toBeAnInstanceOf(NeedsDirective);
                matchers_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
            }));
            testing_internal_1.it('should throw when a dependency cannot be resolved', testing_1.fakeAsync(function () {
                matchers_1.expect(function () { return createComp('<div needsService></div>', tcb); })
                    .toThrowError(/No provider for service!/);
            }));
            testing_internal_1.it('should inject null when an optional dependency cannot be resolved', testing_1.fakeAsync(function () {
                var el = createComp('<div optionallyNeedsDirective></div>', tcb);
                var d = el.children[0].injector.get(OptionallyNeedsDirective);
                matchers_1.expect(d.dependency).toEqual(null);
            }));
            testing_internal_1.it('should instantiate directives that depends on the host component', testing_1.fakeAsync(function () {
                var el = createComp('<div simpleComponent></div>', tcb.overrideTemplate(SimpleComponent, '<div needsComponentFromHost></div>'));
                var d = el.children[0].children[0].injector.get(NeedsComponentFromHost);
                matchers_1.expect(d.dependency).toBeAnInstanceOf(SimpleComponent);
            }));
            testing_internal_1.it('should instantiate host views for components that have a @Host dependency ', testing_1.fakeAsync(function () {
                var el = createComp('', tcb, NeedsHostAppService);
                matchers_1.expect(el.componentInstance.service).toEqual('appService');
            }));
            testing_internal_1.it('should not instantiate directives that depend on other directives on the host element', testing_1.fakeAsync(function () {
                matchers_1.expect(function () { return createComp('<div simpleComponent simpleDirective></div>', tcb.overrideTemplate(SimpleComponent, '<div needsDirectiveFromHost></div>')); })
                    .toThrowError("Template parse errors:\nNo provider for SimpleDirective (\"[ERROR ->]<div needsDirectiveFromHost></div>\"): SimpleComponent@0:0");
            }));
        });
        testing_internal_1.describe('static attributes', function () {
            testing_internal_1.it('should be injectable', testing_1.fakeAsync(function () {
                var el = createComp('<div needsAttribute type="text" title></div>', tcb);
                var needsAttribute = el.children[0].injector.get(NeedsAttribute);
                matchers_1.expect(needsAttribute.typeAttribute).toEqual('text');
                matchers_1.expect(needsAttribute.titleAttribute).toEqual('');
                matchers_1.expect(needsAttribute.fooAttribute).toEqual(null);
            }));
            testing_internal_1.it('should be injectable without type annotation', testing_1.fakeAsync(function () {
                var el = createComp('<div needsAttributeNoType foo="bar"></div>', tcb);
                var needsAttribute = el.children[0].injector.get(NeedsAttributeNoType);
                matchers_1.expect(needsAttribute.fooAttribute).toEqual('bar');
            }));
        });
        testing_internal_1.describe('refs', function () {
            testing_internal_1.it('should inject ElementRef', testing_1.fakeAsync(function () {
                var el = createComp('<div needsElementRef></div>', tcb);
                matchers_1.expect(el.children[0].injector.get(NeedsElementRef).elementRef.nativeElement)
                    .toBe(el.children[0].nativeElement);
            }));
            testing_internal_1.it('should inject ChangeDetectorRef of the component\'s view into the component via a proxy', testing_1.fakeAsync(function () {
                var cf = createCompFixture('<div componentNeedsChangeDetectorRef></div>', tcb);
                cf.detectChanges();
                var compEl = cf.debugElement.children[0];
                var comp = compEl.injector.get(PushComponentNeedsChangeDetectorRef);
                comp.counter = 1;
                cf.detectChanges();
                matchers_1.expect(compEl.nativeElement).toHaveText('0');
                comp.changeDetectorRef.markForCheck();
                cf.detectChanges();
                matchers_1.expect(compEl.nativeElement).toHaveText('1');
            }));
            testing_internal_1.it('should inject ChangeDetectorRef of the containing component into directives', testing_1.fakeAsync(function () {
                var cf = createCompFixture('<div componentNeedsChangeDetectorRef></div>', tcb.overrideTemplate(PushComponentNeedsChangeDetectorRef, '{{counter}}<div directiveNeedsChangeDetectorRef></div><div *ngIf="true" directiveNeedsChangeDetectorRef></div>'));
                cf.detectChanges();
                var compEl = cf.debugElement.children[0];
                var comp = compEl.injector.get(PushComponentNeedsChangeDetectorRef);
                comp.counter = 1;
                cf.detectChanges();
                matchers_1.expect(compEl.nativeElement).toHaveText('0');
                matchers_1.expect(compEl.children[0].injector.get(DirectiveNeedsChangeDetectorRef).changeDetectorRef)
                    .toBe(comp.changeDetectorRef);
                matchers_1.expect(compEl.children[1].injector.get(DirectiveNeedsChangeDetectorRef).changeDetectorRef)
                    .toBe(comp.changeDetectorRef);
                comp.changeDetectorRef.markForCheck();
                cf.detectChanges();
                matchers_1.expect(compEl.nativeElement).toHaveText('1');
            }));
            testing_internal_1.it('should inject ViewContainerRef', testing_1.fakeAsync(function () {
                var el = createComp('<div needsViewContainerRef></div>', tcb);
                matchers_1.expect(el.children[0]
                    .injector.get(NeedsViewContainerRef)
                    .viewContainer.element.nativeElement)
                    .toBe(el.children[0].nativeElement);
            }));
            testing_internal_1.it('should inject TemplateRef', testing_1.fakeAsync(function () {
                var el = createComp('<template needsViewContainerRef needsTemplateRef></template>', tcb);
                matchers_1.expect(el.childNodes[0].injector.get(NeedsTemplateRef).templateRef.elementRef)
                    .toEqual(el.childNodes[0].injector.get(NeedsViewContainerRef).viewContainer.element);
            }));
            testing_internal_1.it('should throw if there is no TemplateRef', testing_1.fakeAsync(function () {
                matchers_1.expect(function () { return createComp('<div needsTemplateRef></div>', tcb); })
                    .toThrowError(/No provider for TemplateRef!/);
            }));
            testing_internal_1.it('should inject null if there is no TemplateRef when the dependency is optional', testing_1.fakeAsync(function () {
                var el = createComp('<div optionallyNeedsTemplateRef></div>', tcb);
                var instance = el.children[0].injector.get(OptionallyNeedsTemplateRef);
                matchers_1.expect(instance.templateRef).toBeNull();
            }));
        });
        testing_internal_1.describe('pipes', function () {
            testing_internal_1.it('should instantiate pipes that have dependencies', testing_1.fakeAsync(function () {
                var el = createComp('<div [simpleDirective]="true | pipeNeedsService"></div>', tcb.overrideProviders(TestComp, [{ provide: 'service', useValue: 'pipeService' }]));
                matchers_1.expect(el.children[0].injector.get(SimpleDirective).value.service)
                    .toEqual('pipeService');
            }));
            testing_internal_1.it('should overwrite pipes with later entry in the pipes array', testing_1.fakeAsync(function () {
                var el = createComp('<div [simpleDirective]="true | duplicatePipe"></div>', tcb);
                matchers_1.expect(el.children[0].injector.get(SimpleDirective).value)
                    .toBeAnInstanceOf(DuplicatePipe2);
            }));
            testing_internal_1.it('should inject ChangeDetectorRef into pipes', testing_1.fakeAsync(function () {
                var el = createComp('<div [simpleDirective]="true | pipeNeedsChangeDetectorRef" directiveNeedsChangeDetectorRef></div>', tcb);
                var cdRef = el.children[0].injector.get(DirectiveNeedsChangeDetectorRef).changeDetectorRef;
                matchers_1.expect(el.children[0].injector.get(SimpleDirective).value.changeDetectorRef).toBe(cdRef);
            }));
            testing_internal_1.it('should cache pure pipes', testing_1.fakeAsync(function () {
                var el = createComp('<div [simpleDirective]="true | purePipe"></div><div [simpleDirective]="true | purePipe"></div>' +
                    '<div *ngFor="let x of [1,2]" [simpleDirective]="true | purePipe"></div>', tcb);
                var purePipe1 = el.children[0].injector.get(SimpleDirective).value;
                var purePipe2 = el.children[1].injector.get(SimpleDirective).value;
                var purePipe3 = el.children[2].injector.get(SimpleDirective).value;
                var purePipe4 = el.children[3].injector.get(SimpleDirective).value;
                matchers_1.expect(purePipe1).toBeAnInstanceOf(PurePipe);
                matchers_1.expect(purePipe2).toBe(purePipe1);
                matchers_1.expect(purePipe3).toBe(purePipe1);
                matchers_1.expect(purePipe4).toBe(purePipe1);
            }));
            testing_internal_1.it('should not cache impure pipes', testing_1.fakeAsync(function () {
                var el = createComp('<div [simpleDirective]="true | impurePipe"></div><div [simpleDirective]="true | impurePipe"></div>' +
                    '<div *ngFor="let x of [1,2]" [simpleDirective]="true | impurePipe"></div>', tcb);
                var purePipe1 = el.children[0].injector.get(SimpleDirective).value;
                var purePipe2 = el.children[1].injector.get(SimpleDirective).value;
                var purePipe3 = el.children[2].injector.get(SimpleDirective).value;
                var purePipe4 = el.children[3].injector.get(SimpleDirective).value;
                matchers_1.expect(purePipe1).toBeAnInstanceOf(ImpurePipe);
                matchers_1.expect(purePipe2).toBeAnInstanceOf(ImpurePipe);
                matchers_1.expect(purePipe2).not.toBe(purePipe1);
                matchers_1.expect(purePipe3).toBeAnInstanceOf(ImpurePipe);
                matchers_1.expect(purePipe3).not.toBe(purePipe1);
                matchers_1.expect(purePipe4).toBeAnInstanceOf(ImpurePipe);
                matchers_1.expect(purePipe4).not.toBe(purePipe1);
            }));
        });
    });
}
exports.main = main;
var TestValue = (function () {
    function TestValue(value) {
        this.value = value;
    }
    return TestValue;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld19pbmplY3Rvcl9pbnRlZ3JhdGlvbl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvbGlua2VyL3ZpZXdfaW5qZWN0b3JfaW50ZWdyYXRpb25fc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQXFHLHdDQUF3QyxDQUFDLENBQUE7QUFDOUkseUJBQXFCLDRDQUE0QyxDQUFDLENBQUE7QUFDbEUsd0JBQXVGLHVCQUF1QixDQUFDLENBQUE7QUFDL0cscUJBQW9DLHVCQUF1QixDQUFDLENBQUE7QUFDNUQscUJBQXdSLGVBQWUsQ0FBQyxDQUFBO0FBQ3hTLHVCQUEwQixpQkFBaUIsQ0FBQyxDQUFBO0FBQzVDLDRCQUFxQiwrQ0FBK0MsQ0FBQyxDQUFBO0FBRXJFLElBQU0sY0FBYyxHQUFxQjtJQUN2QyxpQkFBVSxDQUFDLGNBQU0sT0FBQSxlQUFlLEVBQWYsQ0FBZSxDQUFDO0lBQ2pDLGlCQUFVLENBQUMsY0FBTSxPQUFBLGNBQWMsRUFBZCxDQUFjLENBQUM7SUFDaEMsaUJBQVUsQ0FBQyxjQUFNLE9BQUEsZUFBZSxFQUFmLENBQWUsQ0FBQztJQUNqQyxpQkFBVSxDQUFDLGNBQU0sT0FBQSxrQkFBa0IsRUFBbEIsQ0FBa0IsQ0FBQztJQUNwQyxpQkFBVSxDQUFDLGNBQU0sT0FBQSxzQkFBc0IsRUFBdEIsQ0FBc0IsQ0FBQztJQUN4QyxpQkFBVSxDQUFDLGNBQU0sT0FBQSxxQkFBcUIsRUFBckIsQ0FBcUIsQ0FBQztJQUN2QyxpQkFBVSxDQUFDLGNBQU0sT0FBQSx3QkFBd0IsRUFBeEIsQ0FBd0IsQ0FBQztJQUMxQyxpQkFBVSxDQUFDLGNBQU0sT0FBQSxzQkFBc0IsRUFBdEIsQ0FBc0IsQ0FBQztJQUN4QyxpQkFBVSxDQUFDLGNBQU0sT0FBQSxzQkFBc0IsRUFBdEIsQ0FBc0IsQ0FBQztJQUN4QyxpQkFBVSxD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