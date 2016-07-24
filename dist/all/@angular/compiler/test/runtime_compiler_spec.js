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
var core_1 = require('@angular/core');
var lang_1 = require('../src/facade/lang');
var testing_1 = require('@angular/core/testing');
var compiler_1 = require('@angular/compiler');
var spies_1 = require('./spies');
var ChildComp = (function () {
    function ChildComp() {
    }
    /** @nocollapse */
    ChildComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'child-cmp', template: 'childComp' },] },
    ];
    return ChildComp;
}());
var SomeComp = (function () {
    function SomeComp() {
    }
    /** @nocollapse */
    SomeComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'some-cmp', template: 'someComp' },] },
    ];
    return SomeComp;
}());
var SomeCompWithUrlTemplate = (function () {
    function SomeCompWithUrlTemplate() {
    }
    /** @nocollapse */
    SomeCompWithUrlTemplate.decorators = [
        { type: core_1.Component, args: [{ selector: 'some-cmp', templateUrl: './someTpl' },] },
    ];
    return SomeCompWithUrlTemplate;
}());
function main() {
    testing_internal_1.describe('RuntimeCompiler', function () {
        var compiler;
        var xhr;
        var tcb;
        var viewResolver;
        var injector;
        testing_internal_1.beforeEach(function () { testing_1.configureCompiler({ providers: [{ provide: compiler_1.XHR, useClass: spies_1.SpyXHR }] }); });
        testing_internal_1.beforeEach(testing_internal_1.inject([core_1.Compiler, testing_1.TestComponentBuilder, compiler_1.XHR, compiler_1.ViewResolver, core_1.Injector], function (_compiler, _tcb, _xhr, _viewResolver, _injector) {
            compiler = _compiler;
            tcb = _tcb;
            xhr = _xhr;
            viewResolver = _viewResolver;
            injector = _injector;
        }));
        testing_internal_1.describe('clearCacheFor', function () {
            testing_internal_1.it('should support changing the content of a template referenced via templateUrl', testing_1.fakeAsync(function () {
                xhr.spy('get').andCallFake(function () { return Promise.resolve('init'); });
                var compFixture = tcb.overrideView(SomeComp, new core_1.ViewMetadata({ templateUrl: '/myComp.html' }))
                    .createFakeAsync(SomeComp);
                matchers_1.expect(compFixture.nativeElement).toHaveText('init');
                xhr.spy('get').andCallFake(function () { return Promise.resolve('new content'); });
                // Note: overrideView is calling .clearCacheFor...
                compFixture = tcb.overrideView(SomeComp, new core_1.ViewMetadata({ templateUrl: '/myComp.html' }))
                    .createFakeAsync(SomeComp);
                matchers_1.expect(compFixture.nativeElement).toHaveText('new content');
            }));
            testing_internal_1.it('should support overwriting inline templates', function () {
                var componentFixture = tcb.createSync(SomeComp);
                matchers_1.expect(componentFixture.nativeElement).toHaveText('someComp');
                componentFixture = tcb.overrideTemplate(SomeComp, 'test').createSync(SomeComp);
                matchers_1.expect(componentFixture.nativeElement).toHaveText('test');
            });
            testing_internal_1.it('should not update existing compilation results', function () {
                viewResolver.setView(SomeComp, new core_1.ViewMetadata({ template: '<child-cmp></child-cmp>', directives: [ChildComp] }));
                viewResolver.setInlineTemplate(ChildComp, 'oldChild');
                var compFactory = compiler.compileComponentSync(SomeComp);
                viewResolver.setInlineTemplate(ChildComp, 'newChild');
                compiler.compileComponentSync(SomeComp);
                var compRef = compFactory.create(injector);
                matchers_1.expect(compRef.location.nativeElement).toHaveText('oldChild');
            });
        });
        testing_internal_1.describe('compileComponentSync', function () {
            testing_internal_1.it('should throw when using a templateUrl that has not been compiled before', function () {
                xhr.spy('get').andCallFake(function () { return Promise.resolve(''); });
                matchers_1.expect(function () { return tcb.createSync(SomeCompWithUrlTemplate); })
                    .toThrowError("Can't compile synchronously as " + lang_1.stringify(SomeCompWithUrlTemplate) + " is still being loaded!");
            });
            testing_internal_1.it('should throw when using a templateUrl in a nested component that has not been compiled before', function () {
                xhr.spy('get').andCallFake(function () { return Promise.resolve(''); });
                var localTcb = tcb.overrideView(SomeComp, new core_1.ViewMetadata({ template: '', directives: [ChildComp] }))
                    .overrideView(ChildComp, new core_1.ViewMetadata({ templateUrl: '/someTpl.html' }));
                matchers_1.expect(function () { return localTcb.createSync(SomeComp); })
                    .toThrowError("Can't compile synchronously as " + lang_1.stringify(ChildComp) + " is still being loaded!");
            });
            testing_internal_1.it('should allow to use templateUrl components that have been loaded before', testing_1.fakeAsync(function () {
                xhr.spy('get').andCallFake(function () { return Promise.resolve('hello'); });
                tcb.createFakeAsync(SomeCompWithUrlTemplate);
                var compFixture = tcb.createSync(SomeCompWithUrlTemplate);
                matchers_1.expect(compFixture.nativeElement).toHaveText('hello');
            }));
        });
        testing_internal_1.describe('compileNgModuleAsync', function () {
            testing_internal_1.it('should allow to use templateUrl components', testing_1.fakeAsync(function () {
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomeCompWithUrlTemplate], precompile: [SomeCompWithUrlTemplate] },] },
                    ];
                    return SomeModule;
                }());
                xhr.spy('get').andCallFake(function () { return Promise.resolve('hello'); });
                var ngModuleFactory;
                compiler.compileNgModuleAsync(SomeModule).then(function (f) { return ngModuleFactory = f; });
                testing_1.tick();
                matchers_1.expect(ngModuleFactory.moduleType).toBe(SomeModule);
            }));
        });
        testing_internal_1.describe('compileNgModuleSync', function () {
            testing_internal_1.it('should throw when using a templateUrl that has not been compiled before', function () {
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomeCompWithUrlTemplate], precompile: [SomeCompWithUrlTemplate] },] },
                    ];
                    return SomeModule;
                }());
                xhr.spy('get').andCallFake(function () { return Promise.resolve(''); });
                matchers_1.expect(function () { return compiler.compileNgModuleSync(SomeModule); })
                    .toThrowError("Can't compile synchronously as " + lang_1.stringify(SomeCompWithUrlTemplate) + " is still being loaded!");
            });
            testing_internal_1.it('should throw when using a templateUrl in a nested component that has not been compiled before', function () {
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomeComp], precompile: [SomeComp] },] },
                    ];
                    return SomeModule;
                }());
                xhr.spy('get').andCallFake(function () { return Promise.resolve(''); });
                viewResolver.setView(SomeComp, new core_1.ViewMetadata({ template: '', directives: [ChildComp] }));
                viewResolver.setView(ChildComp, new core_1.ViewMetadata({ templateUrl: '/someTpl.html' }));
                matchers_1.expect(function () { return compiler.compileNgModuleSync(SomeModule); })
                    .toThrowError("Can't compile synchronously as " + lang_1.stringify(ChildComp) + " is still being loaded!");
            });
            testing_internal_1.it('should allow to use templateUrl components that have been loaded before', testing_1.fakeAsync(function () {
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomeCompWithUrlTemplate], precompile: [SomeCompWithUrlTemplate] },] },
                    ];
                    return SomeModule;
                }());
                xhr.spy('get').andCallFake(function () { return Promise.resolve('hello'); });
                compiler.compileNgModuleAsync(SomeModule);
                testing_1.tick();
                var ngModuleFactory = compiler.compileNgModuleSync(SomeModule);
                matchers_1.expect(ngModuleFactory).toBeTruthy();
            }));
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnVudGltZV9jb21waWxlcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci90ZXN0L3J1bnRpbWVfY29tcGlsZXJfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsaUNBQXFHLHdDQUF3QyxDQUFDLENBQUE7QUFDOUkseUJBQXFCLDRDQUE0QyxDQUFDLENBQUE7QUFDbEUscUJBQTBILGVBQWUsQ0FBQyxDQUFBO0FBQzFJLHFCQUFzQyxvQkFBb0IsQ0FBQyxDQUFBO0FBQzNELHdCQUF5Rix1QkFBdUIsQ0FBQyxDQUFBO0FBQ2pILHlCQUFnQyxtQkFBbUIsQ0FBQyxDQUFBO0FBR3BELHNCQUFxQixTQUFTLENBQUMsQ0FBQTtBQUMvQjtJQUFBO0lBS0EsQ0FBQztJQUpELGtCQUFrQjtJQUNYLG9CQUFVLEdBQTBCO1FBQzNDLEVBQUUsSUFBSSxFQUFFLGdCQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxXQUFXLEVBQUMsRUFBRyxFQUFFO0tBQzVFLENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBQ0Q7SUFBQTtJQUtBLENBQUM7SUFKRCxrQkFBa0I7SUFDWCxtQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFDLEVBQUcsRUFBRTtLQUMxRSxDQUFDO0lBQ0YsZUFBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBQ0Q7SUFBQTtJQUtBLENBQUM7SUFKRCxrQkFBa0I7SUFDWCxrQ0FBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxnQkFBUyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxX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