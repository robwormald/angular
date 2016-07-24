/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var lifecycle_hooks_1 = require('@angular/core/src/metadata/lifecycle_hooks');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var lang_1 = require('../src/facade/lang');
var metadata_resolver_1 = require('../src/metadata_resolver');
var metadata_resolver_fixture_1 = require('./metadata_resolver_fixture');
var test_bindings_1 = require('./test_bindings');
function main() {
    testing_internal_1.describe('CompileMetadataResolver', function () {
        testing_internal_1.beforeEach(function () { testing_1.configureCompiler({ providers: test_bindings_1.TEST_COMPILER_PROVIDERS }); });
        testing_internal_1.describe('getDirectiveMetadata', function () {
            testing_internal_1.it('should read metadata', testing_internal_1.inject([metadata_resolver_1.CompileMetadataResolver], function (resolver) {
                var meta = resolver.getDirectiveMetadata(ComponentWithEverything);
                testing_internal_1.expect(meta.selector).toEqual('someSelector');
                testing_internal_1.expect(meta.exportAs).toEqual('someExportAs');
                testing_internal_1.expect(meta.isComponent).toBe(true);
                testing_internal_1.expect(meta.type.runtime).toBe(ComponentWithEverything);
                testing_internal_1.expect(meta.type.name).toEqual(lang_1.stringify(ComponentWithEverything));
                testing_internal_1.expect(meta.lifecycleHooks).toEqual(lifecycle_hooks_1.LIFECYCLE_HOOKS_VALUES);
                testing_internal_1.expect(meta.changeDetection).toBe(core_1.ChangeDetectionStrategy.Default);
                testing_internal_1.expect(meta.inputs).toEqual({ 'someProp': 'someProp' });
                testing_internal_1.expect(meta.outputs).toEqual({ 'someEvent': 'someEvent' });
                testing_internal_1.expect(meta.hostListeners).toEqual({ 'someHostListener': 'someHostListenerExpr' });
                testing_internal_1.expect(meta.hostProperties).toEqual({ 'someHostProp': 'someHostPropExpr' });
                testing_internal_1.expect(meta.hostAttributes).toEqual({ 'someHostAttr': 'someHostAttrValue' });
                testing_internal_1.expect(meta.template.encapsulation).toBe(core_1.ViewEncapsulation.Emulated);
                testing_internal_1.expect(meta.template.styles).toEqual(['someStyle']);
                testing_internal_1.expect(meta.template.styleUrls).toEqual(['someStyleUrl']);
                testing_internal_1.expect(meta.template.template).toEqual('someTemplate');
                testing_internal_1.expect(meta.template.templateUrl).toEqual('someTemplateUrl');
                testing_internal_1.expect(meta.template.interpolation).toEqual(['{{', '}}']);
            }));
            testing_internal_1.it('should use the moduleUrl from the reflector if none is given', testing_internal_1.inject([metadata_resolver_1.CompileMetadataResolver], function (resolver) {
                var value = resolver.getDirectiveMetadata(ComponentWithoutModuleId).type.moduleUrl;
                var expectedEndValue = lang_1.IS_DART ? 'test/compiler/metadata_resolver_spec.dart' : './ComponentWithoutModuleId';
                testing_internal_1.expect(value.endsWith(expectedEndValue)).toBe(true);
            }));
            testing_internal_1.it('should throw when metadata is incorrectly typed', testing_internal_1.inject([metadata_resolver_1.CompileMetadataResolver], function (resolver) {
                testing_internal_1.expect(function () { return resolver.getDirectiveMetadata(metadata_resolver_fixture_1.MalformedStylesComponent); })
                    .toThrowError("Expected 'styles' to be an array of strings.");
            }));
            testing_internal_1.it('should throw with descriptive error message when provider token can not be resolved', testing_internal_1.inject([metadata_resolver_1.CompileMetadataResolver], function (resolver) {
                testing_internal_1.expect(function () { return resolver.getDirectiveMetadata(MyBrokenComp1); })
                    .toThrowError("Can't resolve all parameters for MyBrokenComp1: (?).");
            }));
            testing_internal_1.it('should throw with descriptive error message when a param token of a dependency is undefined', testing_internal_1.inject([metadata_resolver_1.CompileMetadataResolver], function (resolver) {
                testing_internal_1.expect(function () { return resolver.getDirectiveMetadata(MyBrokenComp2); })
                    .toThrowError("Can't resolve all parameters for NonAnnotatedService: (?).");
            }));
            testing_internal_1.it('should throw with descriptive error message when one of providers is not present', testing_internal_1.inject([metadata_resolver_1.CompileMetadataResolver], function (resolver) {
                testing_internal_1.expect(function () { return resolver.getDirectiveMetadata(MyBrokenComp3); })
                    .toThrowError("One or more of providers for \"MyBrokenComp3\" were not defined: [?, SimpleService, ?].");
            }));
            testing_internal_1.it('should throw with descriptive error message when one of viewProviders is not present', testing_internal_1.inject([metadata_resolver_1.CompileMetadataResolver], function (resolver) {
                testing_internal_1.expect(function () { return resolver.getDirectiveMetadata(MyBrokenComp4); })
                    .toThrowError("One or more of viewProviders for \"MyBrokenComp4\" were not defined: [?, SimpleService, ?].");
            }));
            testing_internal_1.it('should throw an error when the interpolation config has invalid symbols', testing_internal_1.inject([metadata_resolver_1.CompileMetadataResolver], function (resolver) {
                testing_internal_1.expect(function () { return resolver.getDirectiveMetadata(ComponentWithInvalidInterpolation1); })
                    .toThrowError("[' ', ' '] contains unusable interpolation symbol.");
                testing_internal_1.expect(function () { return resolver.getDirectiveMetadata(ComponentWithInvalidInterpolation2); })
                    .toThrowError("['{', '}'] contains unusable interpolation symbol.");
                testing_internal_1.expect(function () { return resolver.getDirectiveMetadata(ComponentWithInvalidInterpolation3); })
                    .toThrowError("['<%', '%>'] contains unusable interpolation symbol.");
                testing_internal_1.expect(function () { return resolver.getDirectiveMetadata(ComponentWithInvalidInterpolation4); })
                    .toThrowError("['&#', '}}'] contains unusable interpolation symbol.");
                testing_internal_1.expect(function () { return resolver.getDirectiveMetadata(ComponentWithInvalidInterpolation5); })
                    .toThrowError("['&lbrace;', '}}'] contains unusable interpolation symbol.");
            }));
        });
    });
}
exports.main = main;
var ADirective = (function () {
    function ADirective() {
    }
    /** @nocollapse */
    ADirective.decorators = [
        { type: core_1.Directive, args: [{ selector: 'a-directive' },] },
    ];
    return ADirective;
}());
var SomeDirective = (function () {
    function SomeDirective() {
    }
    /** @nocollapse */
    SomeDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: 'someSelector' },] },
    ];
    return SomeDirective;
}());
var ComponentWithoutModuleId = (function () {
    function ComponentWithoutModuleId() {
    }
    /** @nocollapse */
    ComponentWithoutModuleId.decorators = [
        { type: core_1.Component, args: [{ selector: 'someComponent', template: '' },] },
    ];
    return ComponentWithoutModuleId;
}());
var ComponentWithEverything = (function () {
    function ComponentWithEverything() {
    }
    ComponentWithEverything.prototype.ngOnChanges = function (changes) { };
    ComponentWithEverything.prototype.ngOnInit = function () { };
    ComponentWithEverything.prototype.ngDoCheck = function () { };
    ComponentWithEverything.prototype.ngOnDestroy = function () { };
    ComponentWithEverything.prototype.ngAfterContentInit = function () { };
    ComponentWithEverything.prototype.ngAfterContentChecked = function () { };
    ComponentWithEverything.prototype.ngAfterViewInit = function () { };
    ComponentWithEverything.prototype.ngAfterViewChecked = function () { };
    /** @nocollapse */
    ComponentWithEverything.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'someSelector',
                    inputs: ['someProp'],
                    outputs: ['someEvent'],
                    host: {
                        '[someHostProp]': 'someHostPropExpr',
                        '(someHostListener)': 'someHostListenerExpr',
                        'someHostAttr': 'someHostAttrValue'
                    },
                    exportAs: 'someExportAs',
                    moduleId: 'someModuleId',
                    changeDetection: core_1.ChangeDetectionStrategy.Default,
                    template: 'someTemplate',
                    templateUrl: 'someTemplateUrl',
                    encapsulation: core_1.ViewEncapsulation.Emulated,
                    styles: ['someStyle'],
                    styleUrls: ['someStyleUrl'],
                    directives: [SomeDirective],
                    interpolation: ['{{', '}}']
                },] },
    ];
    return ComponentWithEverything;
}());
var MyBrokenComp1 = (function () {
    function MyBrokenComp1(dependency) {
        this.dependency = dependency;
    }
    /** @nocollapse */
    MyBrokenComp1.decorators = [
        { type: core_1.Component, args: [{ selector: 'my-broken-comp', template: '' },] },
    ];
    /** @nocollapse */
    MyBrokenComp1.ctorParameters = [
        null,
    ];
    return MyBrokenComp1;
}());
var NonAnnotatedService = (function () {
    function NonAnnotatedService(dep) {
    }
    return NonAnnotatedService;
}());
var MyBrokenComp2 = (function () {
    function MyBrokenComp2(dependency) {
    }
    /** @nocollapse */
    MyBrokenComp2.decorators = [
        { type: core_1.Component, args: [{ selector: 'my-broken-comp', template: '', providers: [NonAnnotatedService] },] },
    ];
    /** @nocollapse */
    MyBrokenComp2.ctorParameters = [
        { type: NonAnnotatedService, },
    ];
    return MyBrokenComp2;
}());
var SimpleService = (function () {
    function SimpleService() {
    }
    /** @nocollapse */
    SimpleService.decorators = [
        { type: core_1.Injectable },
    ];
    return SimpleService;
}());
var MyBrokenComp3 = (function () {
    function MyBrokenComp3() {
    }
    /** @nocollapse */
    MyBrokenComp3.decorators = [
        { type: core_1.Component, args: [{ selector: 'my-broken-comp', template: '', providers: [null, SimpleService, [null]] },] },
    ];
    return MyBrokenComp3;
}());
var MyBrokenComp4 = (function () {
    function MyBrokenComp4() {
    }
    /** @nocollapse */
    MyBrokenComp4.decorators = [
        { type: core_1.Component, args: [{ selector: 'my-broken-comp', template: '', viewProviders: [null, SimpleService, [null]] },] },
    ];
    return MyBrokenComp4;
}());
var ComponentWithInvalidInterpolation1 = (function () {
    function ComponentWithInvalidInterpolation1() {
    }
    /** @nocollapse */
    ComponentWithInvalidInterpolation1.decorators = [
        { type: core_1.Component, args: [{ selector: 'someSelector', template: '', interpolation: [' ', ' '] },] },
    ];
    return ComponentWithInvalidInterpolation1;
}());
var ComponentWithInvalidInterpolation2 = (function () {
    function ComponentWithInvalidInterpolation2() {
    }
    /** @nocollapse */
    ComponentWithInvalidInterpolation2.decorators = [
        { type: core_1.Component, args: [{ selector: 'someSelector', template: '', interpolation: ['{', '}'] },] },
    ];
    return ComponentWithInvalidInterpolation2;
}());
var ComponentWithInvalidInterpolation3 = (function () {
    function ComponentWithInvalidInterpolation3() {
    }
    /** @nocollapse */
    ComponentWithInvalidInterpolation3.decorators = [
        { type: core_1.Component, args: [{ selector: 'someSelector', template: '', interpolation: ['<%', '%>'] },] },
    ];
    return ComponentWithInvalidInterpolation3;
}());
var ComponentWithInvalidInterpolation4 = (function () {
    function ComponentWithInvalidInterpolation4() {
    }
    /** @nocollapse */
    ComponentWithInvalidInterpolation4.decorators = [
        { type: core_1.Component, args: [{ selector: 'someSelector', template: '', interpolation: ['&#', '}}'] },] },
    ];
    return ComponentWithInvalidInterpolation4;
}());
var ComponentWithInvalidInterpolation5 = (function () {
    function ComponentWithInvalidInterpolation5() {
    }
    /** @nocollapse */
    ComponentWithInvalidInterpolation5.decorators = [
        { type: core_1.Component, args: [{ selector: 'someSelector', template: '', interpolation: ['&lbrace;', '}}'] },] },
    ];
    return ComponentWithInvalidInterpolation5;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWV0YWRhdGFfcmVzb2x2ZXJfc3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdC9tZXRhZGF0YV9yZXNvbHZlcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFHSCxxQkFBeU4sZUFBZSxDQUFDLENBQUE7QUFDek8sZ0NBQXFDLDRDQUE0QyxDQUFDLENBQUE7QUFDbEYsd0JBQWdDLHVCQUF1QixDQUFDLENBQUE7QUFDeEQsaUNBQXVILHdDQUF3QyxDQUFDLENBQUE7QUFHaEsscUJBQWlDLG9CQUFvQixDQUFDLENBQUE7QUFDdEQsa0NBQXNDLDBCQUEwQixDQUFDLENBQUE7QUFFakUsMENBQXVDLDZCQUE2QixDQUFDLENBQUE7QUFDckUsOEJBQXNDLGlCQUFpQixDQUFDLENBQUE7QUFFeEQ7SUFDRSwyQkFBUSxDQUFDLHlCQUF5QixFQUFFO1FBQ2xDLDZCQUFVLENBQUMsY0FBUSwyQkFBaUIsQ0FBQyxFQUFDLFNBQVMsRUFBRSx1Q0FBdUIsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUvRSwyQkFBUSxDQUFDLHNCQUFzQixFQUFFO1lBQy9CLHFCQUFFLENBQUMsc0JBQXNCLEVBQ3RCLHlCQUFNLENBQUMsQ0FBQywyQ0FBdUIsQ0FBQyxFQUFFLFVBQUMsUUFBaUM7Z0JBQ2xFLElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO2dCQUNsRSx5QkFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzlDLHlCQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQztnQkFDOUMseUJBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxD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