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
var core_1 = require('@angular/core');
var lang_1 = require('../../src/facade/lang');
function main() {
    testing_internal_1.describe('jit', function () { declareTests({ useJit: true }); });
    testing_internal_1.describe('no jit', function () { declareTests({ useJit: false }); });
}
exports.main = main;
function declareTests(_a) {
    var useJit = _a.useJit;
    testing_internal_1.describe('@Component.precompile', function () {
        testing_internal_1.beforeEach(function () { testing_1.configureModule({ declarations: [MainComp, ChildComp, NestedChildComp] }); });
        testing_internal_1.it('should error if the component was not declared nor imported by the module', testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            var ChildComp = (function () {
                function ChildComp() {
                }
                /** @nocollapse */
                ChildComp.decorators = [
                    { type: core_1.Component, args: [{ selector: 'child', template: '' },] },
                ];
                return ChildComp;
            }());
            var SomeComp = (function () {
                function SomeComp() {
                }
                /** @nocollapse */
                SomeComp.decorators = [
                    { type: core_1.Component, args: [{ template: 'comp', precompile: [ChildComp] },] },
                ];
                return SomeComp;
            }());
            testing_internal_1.expect(function () { return tcb.createSync(SomeComp); })
                .toThrowError("Component " + lang_1.stringify(SomeComp) + " in NgModule DynamicTestModule uses " + lang_1.stringify(ChildComp) + " via \"precompile\" but it was neither declared nor imported into the module!");
        }));
        testing_internal_1.it('should resolve ComponentFactories from the same component', testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            var compFixture = tcb.createSync(MainComp);
            var mainComp = compFixture.componentInstance;
            testing_internal_1.expect(compFixture.componentRef.injector.get(core_1.ComponentFactoryResolver)).toBe(mainComp.cfr);
            var cf = mainComp.cfr.resolveComponentFactory(ChildComp);
            testing_internal_1.expect(cf.componentType).toBe(ChildComp);
        }));
        testing_internal_1.it('should resolve ComponentFactories via ANALYZE_FOR_PRECOMPILE', testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            var compFixture = tcb.createSync(CompWithAnalyzePrecompileProvider);
            var mainComp = compFixture.componentInstance;
            var cfr = compFixture.componentRef.injector.get(core_1.ComponentFactoryResolver);
            testing_internal_1.expect(cfr.resolveComponentFactory(ChildComp).componentType).toBe(ChildComp);
            testing_internal_1.expect(cfr.resolveComponentFactory(NestedChildComp).componentType).toBe(NestedChildComp);
        }));
        testing_internal_1.it('should be able to get a component form a parent component (view hiearchy)', testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            var compFixture = tcb.overrideView(MainComp, new core_1.ViewMetadata({ template: '<child></child>', directives: [ChildComp] }))
                .createSync(MainComp);
            var childCompEl = compFixture.debugElement.children[0];
            var childComp = childCompEl.componentInstance;
            // declared on ChildComp directly
            testing_internal_1.expect(childComp.cfr.resolveComponentFactory(NestedChildComp).componentType)
                .toBe(NestedChildComp);
            // inherited from MainComp
            testing_internal_1.expect(childComp.cfr.resolveComponentFactory(ChildComp).componentType).toBe(ChildComp);
        }));
        testing_internal_1.it('should not be able to get components from a parent component (content hierarchy)', testing_internal_1.inject([testing_1.TestComponentBuilder], function (tcb) {
            var compFixture = tcb.overrideView(MainComp, new core_1.ViewMetadata({
                template: '<child><nested></nested></child>',
                directives: [ChildComp, NestedChildComp]
            }))
                .overrideTemplate(ChildComp, '<ng-content></ng-content>')
                .createSync(MainComp);
            var nestedChildCompEl = compFixture.debugElement.children[0].children[0];
            var nestedChildComp = nestedChildCompEl.componentInstance;
            testing_internal_1.expect(nestedChildComp.cfr.resolveComponentFactory(ChildComp).componentType)
                .toBe(ChildComp);
            testing_internal_1.expect(function () { return nestedChildComp.cfr.resolveComponentFactory(NestedChildComp); })
                .toThrow(new core_1.NoComponentFactoryError(NestedChildComp));
        }));
    });
}
var NestedChildComp = (function () {
    function NestedChildComp(cfr) {
        this.cfr = cfr;
    }
    /** @nocollapse */
    NestedChildComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'nested', template: '' },] },
    ];
    /** @nocollapse */
    NestedChildComp.ctorParameters = [
        { type: core_1.ComponentFactoryResolver, },
    ];
    return NestedChildComp;
}());
var ChildComp = (function () {
    function ChildComp(cfr) {
        this.cfr = cfr;
    }
    /** @nocollapse */
    ChildComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'child', precompile: [NestedChildComp], template: '' },] },
    ];
    /** @nocollapse */
    ChildComp.ctorParameters = [
        { type: core_1.ComponentFactoryResolver, },
    ];
    return ChildComp;
}());
var MainComp = (function () {
    function MainComp(cfr) {
        this.cfr = cfr;
    }
    /** @nocollapse */
    MainComp.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'main',
                    precompile: [ChildComp],
                    template: '',
                },] },
    ];
    /** @nocollapse */
    MainComp.ctorParameters = [
        { type: core_1.ComponentFactoryResolver, },
    ];
    return MainComp;
}());
var CompWithAnalyzePrecompileProvider = (function () {
    function CompWithAnalyzePrecompileProvider() {
    }
    /** @nocollapse */
    CompWithAnalyzePrecompileProvider.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'comp-with-analyze',
                    template: '',
                    providers: [{
                            provide: core_1.ANALYZE_FOR_PRECOMPILE,
                            multi: true,
                            useValue: [
                                { a: 'b', component: ChildComp },
                                { b: 'c', anotherComponent: NestedChildComp },
                            ]
                        }]
                },] },
    ];
    return CompWithAnalyzePrecompileProvider;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlY29tcGlsZV9pbnRlZ3JhdGlvbl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvbGlua2VyL3ByZWNvbXBpbGVfaW50ZWdyYXRpb25fc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQWlJLHdDQUF3QyxDQUFDLENBQUE7QUFDMUssd0JBQW9ELHVCQUF1QixDQUFDLENBQUE7QUFDNUUscUJBQTZILGVBQWUsQ0FBQyxDQUFBO0FBQzdJLHFCQUF3Qix1QkFBdUIsQ0FBQyxDQUFBO0FBRWhEO0lBQ0UsMkJBQVEsQ0FBQyxLQUFLLEVBQUUsY0FBUSxZQUFZLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3pELDJCQUFRLENBQUMsUUFBUSxFQUFFLGNBQVEsWUFBWSxDQUFDLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMvRCxDQUFDO0FBSGUsWUFBSSxPQUduQixDQUFBO0FBRUQsc0JBQXNCLEVBQTJCO1FBQTFCLGtCQUFNO0lBQzNCLDJCQUFRLENBQUMsdUJBQXVCLEVBQUU7UUFDaEMsNkJBQVUsQ0FBQyxjQUFRLHlCQUFlLENBQUMsRUFBQyxZQUFZLEVBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLGVBQWUsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRS9GLHFCQUFFLENBQUMsMkVBQTJFLEVBQzNFLHlCQUFNLENBQUMsQ0FBQyw4QkFBb0IsQ0FBQyxFQUFFLFVBQUMsR0FBeUI7WUFDdkQ7Z0JBQUE7Z0JBS1QsQ0FBQztnQkFKUSxrQkFBa0I7Z0JBQ3BCLG9CQUFVLEdBQTBCO29CQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFB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