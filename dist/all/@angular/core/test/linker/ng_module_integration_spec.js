/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var compiler_1 = require('@angular/compiler');
var core_1 = require('@angular/core');
var console_1 = require('@angular/core/src/console');
var testing_1 = require('@angular/core/testing');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var exceptions_1 = require('../../src/facade/exceptions');
var lang_1 = require('../../src/facade/lang');
var Engine = (function () {
    function Engine() {
    }
    return Engine;
}());
var BrokenEngine = (function () {
    function BrokenEngine() {
        throw new exceptions_1.BaseException('Broken Engine');
    }
    return BrokenEngine;
}());
var DashboardSoftware = (function () {
    function DashboardSoftware() {
    }
    return DashboardSoftware;
}());
var Dashboard = (function () {
    function Dashboard(software) {
    }
    /** @nocollapse */
    Dashboard.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Dashboard.ctorParameters = [
        { type: DashboardSoftware, },
    ];
    return Dashboard;
}());
var TurboEngine = (function (_super) {
    __extends(TurboEngine, _super);
    function TurboEngine() {
        _super.apply(this, arguments);
    }
    return TurboEngine;
}(Engine));
var Car = (function () {
    function Car(engine) {
        this.engine = engine;
    }
    /** @nocollapse */
    Car.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    Car.ctorParameters = [
        { type: Engine, },
    ];
    return Car;
}());
var CarWithOptionalEngine = (function () {
    function CarWithOptionalEngine(engine) {
        this.engine = engine;
    }
    /** @nocollapse */
    CarWithOptionalEngine.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    CarWithOptionalEngine.ctorParameters = [
        { type: Engine, decorators: [{ type: core_1.Optional },] },
    ];
    return CarWithOptionalEngine;
}());
var CarWithDashboard = (function () {
    function CarWithDashboard(engine, dashboard) {
        this.engine = engine;
        this.dashboard = dashboard;
    }
    /** @nocollapse */
    CarWithDashboard.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    CarWithDashboard.ctorParameters = [
        { type: Engine, },
        { type: Dashboard, },
    ];
    return CarWithDashboard;
}());
var SportsCar = (function (_super) {
    __extends(SportsCar, _super);
    function SportsCar(engine) {
        _super.call(this, engine);
    }
    /** @nocollapse */
    SportsCar.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    SportsCar.ctorParameters = [
        { type: Engine, },
    ];
    return SportsCar;
}(Car));
var CarWithInject = (function () {
    function CarWithInject(engine) {
        this.engine = engine;
    }
    /** @nocollapse */
    CarWithInject.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    CarWithInject.ctorParameters = [
        { type: Engine, decorators: [{ type: core_1.Inject, args: [TurboEngine,] },] },
    ];
    return CarWithInject;
}());
var CyclicEngine = (function () {
    function CyclicEngine(car) {
    }
    /** @nocollapse */
    CyclicEngine.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    CyclicEngine.ctorParameters = [
        { type: Car, },
    ];
    return CyclicEngine;
}());
var NoAnnotations = (function () {
    function NoAnnotations(secretDependency) {
    }
    return NoAnnotations;
}());
function factoryFn(a) { }
var SomeComp = (function () {
    function SomeComp() {
    }
    /** @nocollapse */
    SomeComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'comp', template: '' },] },
    ];
    return SomeComp;
}());
var SomeDirective = (function () {
    function SomeDirective() {
    }
    /** @nocollapse */
    SomeDirective.decorators = [
        { type: core_1.Directive, args: [{ selector: '[someDir]' },] },
    ];
    /** @nocollapse */
    SomeDirective.propDecorators = {
        'someDir': [{ type: core_1.HostBinding, args: ['title',] }, { type: core_1.Input },],
    };
    return SomeDirective;
}());
var SomePipe = (function () {
    function SomePipe() {
    }
    SomePipe.prototype.transform = function (value) { return "transformed " + value; };
    /** @nocollapse */
    SomePipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'somePipe' },] },
    ];
    return SomePipe;
}());
var CompUsingModuleDirectiveAndPipe = (function () {
    function CompUsingModuleDirectiveAndPipe() {
    }
    /** @nocollapse */
    CompUsingModuleDirectiveAndPipe.decorators = [
        { type: core_1.Component, args: [{ selector: 'comp', template: "<div  [someDir]=\"'someValue' | somePipe\"></div>" },] },
    ];
    return CompUsingModuleDirectiveAndPipe;
}());
var DummyConsole = (function () {
    function DummyConsole() {
        this.warnings = [];
    }
    DummyConsole.prototype.log = function (message) { };
    DummyConsole.prototype.warn = function (message) { this.warnings.push(message); };
    return DummyConsole;
}());
function main() {
    if (lang_1.IS_DART) {
        declareTests({ useJit: false });
    }
    else {
        testing_internal_1.describe('jit', function () { declareTests({ useJit: true }); });
        testing_internal_1.describe('no jit', function () { declareTests({ useJit: false }); });
    }
}
exports.main = main;
function declareTests(_a) {
    var useJit = _a.useJit;
    testing_internal_1.describe('NgModule', function () {
        var compiler;
        var injector;
        var console;
        testing_internal_1.beforeEach(function () {
            console = new DummyConsole();
            testing_1.configureCompiler({ useJit: useJit, providers: [{ provide: console_1.Console, useValue: console }] });
        });
        testing_internal_1.beforeEach(testing_internal_1.inject([core_1.Compiler, core_1.Injector, compiler_1.ViewResolver], function (_compiler, _injector) {
            compiler = _compiler;
            injector = _injector;
        }));
        function createModule(moduleType, parentInjector) {
            if (parentInjector === void 0) { parentInjector = null; }
            return compiler.compileNgModuleSync(moduleType).create(parentInjector);
        }
        function createComp(compType, moduleType) {
            var ngModule = createModule(moduleType);
            var cf = ngModule.componentFactoryResolver.resolveComponentFactory(compType);
            return new testing_1.ComponentFixture(cf.create(injector), null, false);
        }
        testing_internal_1.describe('errors', function () {
            testing_internal_1.it('should error when exporting a directive that was neither declared nor imported', function () {
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule, args: [{ exports: [SomeDirective] },] },
                    ];
                    return SomeModule;
                }());
                matchers_1.expect(function () { return createModule(SomeModule); })
                    .toThrowError("Can't export directive " + lang_1.stringify(SomeDirective) + " from " + lang_1.stringify(SomeModule) + " as it was neither declared nor imported!");
            });
            testing_internal_1.it('should error when exporting a pipe that was neither declared nor imported', function () {
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule, args: [{ exports: [SomePipe] },] },
                    ];
                    return SomeModule;
                }());
                matchers_1.expect(function () { return createModule(SomeModule); })
                    .toThrowError("Can't export pipe " + lang_1.stringify(SomePipe) + " from " + lang_1.stringify(SomeModule) + " as it was neither declared nor imported!");
            });
            testing_internal_1.it('should error when precompiling a component that was neither declared nor imported', function () {
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule, args: [{ precompile: [SomeComp] },] },
                    ];
                    return SomeModule;
                }());
                matchers_1.expect(function () { return createModule(SomeModule); })
                    .toThrowError("NgModule " + lang_1.stringify(SomeModule) + " uses " + lang_1.stringify(SomeComp) + " via \"precompile\" but it was neither declared nor imported!");
            });
            testing_internal_1.it('should error if a directive is declared in more than 1 module', function () {
                var Module1 = (function () {
                    function Module1() {
                    }
                    /** @nocollapse */
                    Module1.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomeDirective] },] },
                    ];
                    return Module1;
                }());
                var Module2 = (function () {
                    function Module2() {
                    }
                    /** @nocollapse */
                    Module2.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomeDirective] },] },
                    ];
                    return Module2;
                }());
                createModule(Module1);
                matchers_1.expect(function () { return createModule(Module2); })
                    .toThrowError("Type " + lang_1.stringify(SomeDirective) + " is part of the declarations of 2 modules: " + lang_1.stringify(Module1) + " and " + lang_1.stringify(Module2) + "!");
            });
            testing_internal_1.it('should error if a directive is declared in more than 1 module also if the module declaring it is imported', function () {
                var Module1 = (function () {
                    function Module1() {
                    }
                    /** @nocollapse */
                    Module1.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomeDirective], exports: [SomeDirective] },] },
                    ];
                    return Module1;
                }());
                var Module2 = (function () {
                    function Module2() {
                    }
                    /** @nocollapse */
                    Module2.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomeDirective], imports: [Module1] },] },
                    ];
                    return Module2;
                }());
                matchers_1.expect(function () { return createModule(Module2); })
                    .toThrowError("Type " + lang_1.stringify(SomeDirective) + " is part of the declarations of 2 modules: " + lang_1.stringify(Module1) + " and " + lang_1.stringify(Module2) + "!");
            });
            testing_internal_1.it('should error if a pipe is declared in more than 1 module', function () {
                var Module1 = (function () {
                    function Module1() {
                    }
                    /** @nocollapse */
                    Module1.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomePipe] },] },
                    ];
                    return Module1;
                }());
                var Module2 = (function () {
                    function Module2() {
                    }
                    /** @nocollapse */
                    Module2.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomePipe] },] },
                    ];
                    return Module2;
                }());
                createModule(Module1);
                matchers_1.expect(function () { return createModule(Module2); })
                    .toThrowError("Type " + lang_1.stringify(SomePipe) + " is part of the declarations of 2 modules: " + lang_1.stringify(Module1) + " and " + lang_1.stringify(Module2) + "!");
            });
            testing_internal_1.it('should error if a pipe is declared in more than 1 module also if the module declaring it is imported', function () {
                var Module1 = (function () {
                    function Module1() {
                    }
                    /** @nocollapse */
                    Module1.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomePipe], exports: [SomePipe] },] },
                    ];
                    return Module1;
                }());
                var Module2 = (function () {
                    function Module2() {
                    }
                    /** @nocollapse */
                    Module2.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomePipe], imports: [Module1] },] },
                    ];
                    return Module2;
                }());
                matchers_1.expect(function () { return createModule(Module2); })
                    .toThrowError("Type " + lang_1.stringify(SomePipe) + " is part of the declarations of 2 modules: " + lang_1.stringify(Module1) + " and " + lang_1.stringify(Module2) + "!");
            });
        });
        testing_internal_1.describe('precompile', function () {
            testing_internal_1.it('should precompile ComponentFactories in root modules', function () {
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomeComp], precompile: [SomeComp] },] },
                    ];
                    return SomeModule;
                }());
                var ngModule = createModule(SomeModule);
                matchers_1.expect(ngModule.componentFactoryResolver.resolveComponentFactory(SomeComp).componentType)
                    .toBe(SomeComp);
                matchers_1.expect(ngModule.injector.get(core_1.ComponentFactoryResolver)
                    .resolveComponentFactory(SomeComp)
                    .componentType)
                    .toBe(SomeComp);
            });
            testing_internal_1.it('should precompile ComponentFactories via ANALYZE_FOR_PRECOMPILE', function () {
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule, args: [{
                                    declarations: [SomeComp],
                                    providers: [{
                                            provide: core_1.ANALYZE_FOR_PRECOMPILE,
                                            multi: true,
                                            useValue: [{ a: 'b', component: SomeComp }]
                                        }]
                                },] },
                    ];
                    return SomeModule;
                }());
                var ngModule = createModule(SomeModule);
                matchers_1.expect(ngModule.componentFactoryResolver.resolveComponentFactory(SomeComp).componentType)
                    .toBe(SomeComp);
                matchers_1.expect(ngModule.injector.get(core_1.ComponentFactoryResolver)
                    .resolveComponentFactory(SomeComp)
                    .componentType)
                    .toBe(SomeComp);
            });
            testing_internal_1.it('should precompile ComponentFactories in imported modules', function () {
                var SomeImportedModule = (function () {
                    function SomeImportedModule() {
                    }
                    /** @nocollapse */
                    SomeImportedModule.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomeComp], precompile: [SomeComp] },] },
                    ];
                    return SomeImportedModule;
                }());
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule, args: [{ imports: [SomeImportedModule] },] },
                    ];
                    return SomeModule;
                }());
                var ngModule = createModule(SomeModule);
                matchers_1.expect(ngModule.componentFactoryResolver.resolveComponentFactory(SomeComp).componentType)
                    .toBe(SomeComp);
                matchers_1.expect(ngModule.injector.get(core_1.ComponentFactoryResolver)
                    .resolveComponentFactory(SomeComp)
                    .componentType)
                    .toBe(SomeComp);
            });
            testing_internal_1.it('should precompile ComponentFactories if the component was imported', function () {
                var SomeImportedModule = (function () {
                    function SomeImportedModule() {
                    }
                    /** @nocollapse */
                    SomeImportedModule.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomeComp], exports: [SomeComp] },] },
                    ];
                    return SomeImportedModule;
                }());
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule, args: [{ imports: [SomeImportedModule], precompile: [SomeComp] },] },
                    ];
                    return SomeModule;
                }());
                var ngModule = createModule(SomeModule);
                matchers_1.expect(ngModule.componentFactoryResolver.resolveComponentFactory(SomeComp).componentType)
                    .toBe(SomeComp);
                matchers_1.expect(ngModule.injector.get(core_1.ComponentFactoryResolver)
                    .resolveComponentFactory(SomeComp)
                    .componentType)
                    .toBe(SomeComp);
            });
        });
        testing_internal_1.describe('directives and pipes', function () {
            testing_internal_1.describe('declarations', function () {
                testing_internal_1.it('should be supported in root modules', function () {
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{
                                        declarations: [CompUsingModuleDirectiveAndPipe, SomeDirective, SomePipe],
                                        precompile: [CompUsingModuleDirectiveAndPipe]
                                    },] },
                        ];
                        return SomeModule;
                    }());
                    var compFixture = createComp(CompUsingModuleDirectiveAndPipe, SomeModule);
                    compFixture.detectChanges();
                    matchers_1.expect(compFixture.debugElement.children[0].properties['title'])
                        .toBe('transformed someValue');
                });
                testing_internal_1.it('should be supported in imported modules', function () {
                    var SomeImportedModule = (function () {
                        function SomeImportedModule() {
                        }
                        /** @nocollapse */
                        SomeImportedModule.decorators = [
                            { type: core_1.NgModule, args: [{
                                        declarations: [CompUsingModuleDirectiveAndPipe, SomeDirective, SomePipe],
                                        precompile: [CompUsingModuleDirectiveAndPipe]
                                    },] },
                        ];
                        return SomeImportedModule;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{ imports: [SomeImportedModule] },] },
                        ];
                        return SomeModule;
                    }());
                    var compFixture = createComp(CompUsingModuleDirectiveAndPipe, SomeModule);
                    compFixture.detectChanges();
                    matchers_1.expect(compFixture.debugElement.children[0].properties['title'])
                        .toBe('transformed someValue');
                });
                testing_internal_1.it('should be supported in nested components', function () {
                    var ParentCompUsingModuleDirectiveAndPipe = (function () {
                        function ParentCompUsingModuleDirectiveAndPipe() {
                        }
                        /** @nocollapse */
                        ParentCompUsingModuleDirectiveAndPipe.decorators = [
                            { type: core_1.Component, args: [{
                                        selector: 'parent',
                                        template: '<comp></comp>',
                                    },] },
                        ];
                        return ParentCompUsingModuleDirectiveAndPipe;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{
                                        declarations: [
                                            ParentCompUsingModuleDirectiveAndPipe, CompUsingModuleDirectiveAndPipe, SomeDirective,
                                            SomePipe
                                        ],
                                        precompile: [ParentCompUsingModuleDirectiveAndPipe]
                                    },] },
                        ];
                        return SomeModule;
                    }());
                    var compFixture = createComp(ParentCompUsingModuleDirectiveAndPipe, SomeModule);
                    compFixture.detectChanges();
                    matchers_1.expect(compFixture.debugElement.children[0].children[0].properties['title'])
                        .toBe('transformed someValue');
                });
                testing_internal_1.it('should hoist @Component.directives/pipes into the module', function () {
                    var ParentCompUsingModuleDirectiveAndPipe = (function () {
                        function ParentCompUsingModuleDirectiveAndPipe() {
                        }
                        /** @nocollapse */
                        ParentCompUsingModuleDirectiveAndPipe.decorators = [
                            { type: core_1.Component, args: [{
                                        selector: 'parent',
                                        template: '<comp></comp>',
                                        directives: [CompUsingModuleDirectiveAndPipe, SomeDirective],
                                        pipes: [SomePipe]
                                    },] },
                        ];
                        return ParentCompUsingModuleDirectiveAndPipe;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{
                                        declarations: [ParentCompUsingModuleDirectiveAndPipe],
                                        precompile: [ParentCompUsingModuleDirectiveAndPipe]
                                    },] },
                        ];
                        return SomeModule;
                    }());
                    var compFixture = createComp(ParentCompUsingModuleDirectiveAndPipe, SomeModule);
                    compFixture.detectChanges();
                    matchers_1.expect(compFixture.debugElement.children[0].children[0].properties['title'])
                        .toBe('transformed someValue');
                });
                testing_internal_1.it('should allow to use directives/pipes via @Component.directives/pipes that were already imported from another module', function () {
                    var ParentCompUsingModuleDirectiveAndPipe = (function () {
                        function ParentCompUsingModuleDirectiveAndPipe() {
                        }
                        /** @nocollapse */
                        ParentCompUsingModuleDirectiveAndPipe.decorators = [
                            { type: core_1.Component, args: [{
                                        selector: 'parent',
                                        template: '<comp></comp>',
                                        directives: [CompUsingModuleDirectiveAndPipe, SomeDirective],
                                        pipes: [SomePipe]
                                    },] },
                        ];
                        return ParentCompUsingModuleDirectiveAndPipe;
                    }());
                    var SomeImportedModule = (function () {
                        function SomeImportedModule() {
                        }
                        /** @nocollapse */
                        SomeImportedModule.decorators = [
                            { type: core_1.NgModule, args: [{
                                        declarations: [SomeDirective, SomePipe, CompUsingModuleDirectiveAndPipe],
                                        exports: [SomeDirective, SomePipe, CompUsingModuleDirectiveAndPipe]
                                    },] },
                        ];
                        return SomeImportedModule;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{
                                        declarations: [ParentCompUsingModuleDirectiveAndPipe],
                                        imports: [SomeImportedModule],
                                        precompile: [ParentCompUsingModuleDirectiveAndPipe]
                                    },] },
                        ];
                        return SomeModule;
                    }());
                    var compFixture = createComp(ParentCompUsingModuleDirectiveAndPipe, SomeModule);
                    compFixture.detectChanges();
                    matchers_1.expect(compFixture.debugElement.children[0].children[0].properties['title'])
                        .toBe('transformed someValue');
                });
            });
            testing_internal_1.describe('import/export', function () {
                testing_internal_1.it('should support exported directives and pipes', function () {
                    var SomeImportedModule = (function () {
                        function SomeImportedModule() {
                        }
                        /** @nocollapse */
                        SomeImportedModule.decorators = [
                            { type: core_1.NgModule, args: [{ declarations: [SomeDirective, SomePipe], exports: [SomeDirective, SomePipe] },] },
                        ];
                        return SomeImportedModule;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{
                                        declarations: [CompUsingModuleDirectiveAndPipe],
                                        imports: [SomeImportedModule],
                                        precompile: [CompUsingModuleDirectiveAndPipe]
                                    },] },
                        ];
                        return SomeModule;
                    }());
                    var compFixture = createComp(CompUsingModuleDirectiveAndPipe, SomeModule);
                    compFixture.detectChanges();
                    matchers_1.expect(compFixture.debugElement.children[0].properties['title'])
                        .toBe('transformed someValue');
                });
                testing_internal_1.it('should support reexported modules', function () {
                    var SomeReexportedModule = (function () {
                        function SomeReexportedModule() {
                        }
                        /** @nocollapse */
                        SomeReexportedModule.decorators = [
                            { type: core_1.NgModule, args: [{ declarations: [SomeDirective, SomePipe], exports: [SomeDirective, SomePipe] },] },
                        ];
                        return SomeReexportedModule;
                    }());
                    var SomeImportedModule = (function () {
                        function SomeImportedModule() {
                        }
                        /** @nocollapse */
                        SomeImportedModule.decorators = [
                            { type: core_1.NgModule, args: [{ exports: [SomeReexportedModule] },] },
                        ];
                        return SomeImportedModule;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{
                                        declarations: [CompUsingModuleDirectiveAndPipe],
                                        imports: [SomeImportedModule],
                                        precompile: [CompUsingModuleDirectiveAndPipe]
                                    },] },
                        ];
                        return SomeModule;
                    }());
                    var compFixture = createComp(CompUsingModuleDirectiveAndPipe, SomeModule);
                    compFixture.detectChanges();
                    matchers_1.expect(compFixture.debugElement.children[0].properties['title'])
                        .toBe('transformed someValue');
                });
                testing_internal_1.it('should support exporting individual directives of an imported module', function () {
                    var SomeReexportedModule = (function () {
                        function SomeReexportedModule() {
                        }
                        /** @nocollapse */
                        SomeReexportedModule.decorators = [
                            { type: core_1.NgModule, args: [{ declarations: [SomeDirective, SomePipe], exports: [SomeDirective, SomePipe] },] },
                        ];
                        return SomeReexportedModule;
                    }());
                    var SomeImportedModule = (function () {
                        function SomeImportedModule() {
                        }
                        /** @nocollapse */
                        SomeImportedModule.decorators = [
                            { type: core_1.NgModule, args: [{ imports: [SomeReexportedModule], exports: [SomeDirective, SomePipe] },] },
                        ];
                        return SomeImportedModule;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{
                                        declarations: [CompUsingModuleDirectiveAndPipe],
                                        imports: [SomeImportedModule],
                                        precompile: [CompUsingModuleDirectiveAndPipe]
                                    },] },
                        ];
                        return SomeModule;
                    }());
                    var compFixture = createComp(CompUsingModuleDirectiveAndPipe, SomeModule);
                    compFixture.detectChanges();
                    matchers_1.expect(compFixture.debugElement.children[0].properties['title'])
                        .toBe('transformed someValue');
                });
                testing_internal_1.it('should not use non exported directives/pipes of an imported module', function () {
                    var SomeImportedModule = (function () {
                        function SomeImportedModule() {
                        }
                        /** @nocollapse */
                        SomeImportedModule.decorators = [
                            { type: core_1.NgModule, args: [{
                                        declarations: [SomeDirective, SomePipe],
                                    },] },
                        ];
                        return SomeImportedModule;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{
                                        declarations: [CompUsingModuleDirectiveAndPipe],
                                        imports: [SomeImportedModule],
                                        precompile: [CompUsingModuleDirectiveAndPipe]
                                    },] },
                        ];
                        return SomeModule;
                    }());
                    matchers_1.expect(function () { return createComp(SomeComp, SomeModule); })
                        .toThrowError(/The pipe 'somePipe' could not be found/);
                });
            });
        });
        testing_internal_1.describe('bound compiler', function () {
            testing_internal_1.it('should provide a Compiler instance that uses the directives/pipes of the module', function () {
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomeDirective, SomePipe] },] },
                    ];
                    return SomeModule;
                }());
                var ngModule = createModule(SomeModule);
                var boundCompiler = ngModule.injector.get(core_1.Compiler);
                var cf = boundCompiler.compileComponentSync(CompUsingModuleDirectiveAndPipe);
                var compFixture = new testing_1.ComponentFixture(cf.create(injector), null, false);
                compFixture.detectChanges();
                matchers_1.expect(compFixture.debugElement.children[0].properties['title'])
                    .toBe('transformed someValue');
                // compile again should produce the same result
                matchers_1.expect(boundCompiler.compileComponentSync(CompUsingModuleDirectiveAndPipe)).toBe(cf);
            });
            testing_internal_1.it('should provide a ComponentResolver instance that uses the directives/pipes of the module', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule, args: [{ declarations: [SomeDirective, SomePipe] },] },
                    ];
                    return SomeModule;
                }());
                var ngModule = createModule(SomeModule);
                var boundCompiler = ngModule.injector.get(core_1.ComponentResolver);
                boundCompiler.resolveComponent(CompUsingModuleDirectiveAndPipe).then(function (cf) {
                    var compFixture = new testing_1.ComponentFixture(cf.create(injector), null, false);
                    compFixture.detectChanges();
                    matchers_1.expect(compFixture.debugElement.children[0].properties['title'])
                        .toBe('transformed someValue');
                    async.done();
                });
            }));
            testing_internal_1.it('should provide a ComponentResolver instance that delegates to the parent ComponentResolver for strings', testing_internal_1.inject([testing_internal_1.AsyncTestCompleter], function (async) {
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule },
                    ];
                    return SomeModule;
                }());
                var parentResolver = jasmine.createSpyObj('resolver', ['resolveComponent', 'clearCache']);
                var ngModule = createModule(SomeModule, core_1.ReflectiveInjector.resolveAndCreate([{ provide: core_1.ComponentResolver, useValue: parentResolver }]));
                parentResolver.resolveComponent.and.returnValue(Promise.resolve('someFactoryFromParent'));
                var boundCompiler = ngModule.injector.get(core_1.ComponentResolver);
                boundCompiler.resolveComponent('someString').then(function (result) {
                    matchers_1.expect(parentResolver.resolveComponent).toHaveBeenCalledWith('someString');
                    matchers_1.expect(result).toBe('someFactoryFromParent');
                    async.done();
                });
            }));
        });
        testing_internal_1.describe('providers', function () {
            var moduleType = null;
            function createInjector(providers, parent) {
                if (parent === void 0) { parent = null; }
                var SomeModule = (function () {
                    function SomeModule() {
                    }
                    /** @nocollapse */
                    SomeModule.decorators = [
                        { type: core_1.NgModule, args: [{ providers: providers },] },
                    ];
                    return SomeModule;
                }());
                moduleType = SomeModule;
                return createModule(SomeModule, parent).injector;
            }
            testing_internal_1.it('should provide the module', function () { matchers_1.expect(createInjector([]).get(moduleType)).toBeAnInstanceOf(moduleType); });
            testing_internal_1.it('should instantiate a class without dependencies', function () {
                var injector = createInjector([Engine]);
                var engine = injector.get(Engine);
                matchers_1.expect(engine).toBeAnInstanceOf(Engine);
            });
            testing_internal_1.it('should resolve dependencies based on type information', function () {
                var injector = createInjector([Engine, Car]);
                var car = injector.get(Car);
                matchers_1.expect(car).toBeAnInstanceOf(Car);
                matchers_1.expect(car.engine).toBeAnInstanceOf(Engine);
            });
            testing_internal_1.it('should resolve dependencies based on @Inject annotation', function () {
                var injector = createInjector([TurboEngine, Engine, CarWithInject]);
                var car = injector.get(CarWithInject);
                matchers_1.expect(car).toBeAnInstanceOf(CarWithInject);
                matchers_1.expect(car.engine).toBeAnInstanceOf(TurboEngine);
            });
            testing_internal_1.it('should throw when no type and not @Inject (class case)', function () {
                matchers_1.expect(function () { return createInjector([NoAnnotations]); })
                    .toThrowError('Can\'t resolve all parameters for NoAnnotations: (?).');
            });
            testing_internal_1.it('should throw when no type and not @Inject (factory case)', function () {
                matchers_1.expect(function () { return createInjector([core_1.provide('someToken', { useFactory: factoryFn })]); })
                    .toThrowError('Can\'t resolve all parameters for factoryFn: (?).');
            });
            testing_internal_1.it('should cache instances', function () {
                var injector = createInjector([Engine]);
                var e1 = injector.get(Engine);
                var e2 = injector.get(Engine);
                matchers_1.expect(e1).toBe(e2);
            });
            testing_internal_1.it('should provide to a value', function () {
                var injector = createInjector([core_1.provide(Engine, { useValue: 'fake engine' })]);
                var engine = injector.get(Engine);
                matchers_1.expect(engine).toEqual('fake engine');
            });
            testing_internal_1.it('should provide to a factory', function () {
                function sportsCarFactory(e) { return new SportsCar(e); }
                var injector = createInjector([Engine, core_1.provide(Car, { useFactory: sportsCarFactory, deps: [Engine] })]);
                var car = injector.get(Car);
                matchers_1.expect(car).toBeAnInstanceOf(SportsCar);
                matchers_1.expect(car.engine).toBeAnInstanceOf(Engine);
            });
            testing_internal_1.it('should supporting provider to null', function () {
                var injector = createInjector([core_1.provide(Engine, { useValue: null })]);
                var engine = injector.get(Engine);
                matchers_1.expect(engine).toBeNull();
            });
            testing_internal_1.it('should provide to an alias', function () {
                var injector = createInjector([
                    Engine, core_1.provide(SportsCar, { useClass: SportsCar }),
                    core_1.provide(Car, { useExisting: SportsCar })
                ]);
                var car = injector.get(Car);
                var sportsCar = injector.get(SportsCar);
                matchers_1.expect(car).toBeAnInstanceOf(SportsCar);
                matchers_1.expect(car).toBe(sportsCar);
            });
            testing_internal_1.it('should support multiProviders', function () {
                var injector = createInjector([
                    Engine, core_1.provide(Car, { useClass: SportsCar, multi: true }),
                    core_1.provide(Car, { useClass: CarWithOptionalEngine, multi: true })
                ]);
                var cars = injector.get(Car);
                matchers_1.expect(cars.length).toEqual(2);
                matchers_1.expect(cars[0]).toBeAnInstanceOf(SportsCar);
                matchers_1.expect(cars[1]).toBeAnInstanceOf(CarWithOptionalEngine);
            });
            testing_internal_1.it('should support multiProviders that are created using useExisting', function () {
                var injector = createInjector([Engine, SportsCar, core_1.provide(Car, { useExisting: SportsCar, multi: true })]);
                var cars = injector.get(Car);
                matchers_1.expect(cars.length).toEqual(1);
                matchers_1.expect(cars[0]).toBe(injector.get(SportsCar));
            });
            testing_internal_1.it('should throw when the aliased provider does not exist', function () {
                var injector = createInjector([core_1.provide('car', { useExisting: SportsCar })]);
                var e = "No provider for " + lang_1.stringify(SportsCar) + "!";
                matchers_1.expect(function () { return injector.get('car'); }).toThrowError(e);
            });
            testing_internal_1.it('should handle forwardRef in useExisting', function () {
                var injector = createInjector([
                    core_1.provide('originalEngine', { useClass: core_1.forwardRef(function () { return Engine; }) }),
                    core_1.provide('aliasedEngine', { useExisting: core_1.forwardRef(function () { return 'originalEngine'; }) })
                ]);
                matchers_1.expect(injector.get('aliasedEngine')).toBeAnInstanceOf(Engine);
            });
            testing_internal_1.it('should support overriding factory dependencies', function () {
                var injector = createInjector([Engine, core_1.provide(Car, { useFactory: function (e) { return new SportsCar(e); }, deps: [Engine] })]);
                var car = injector.get(Car);
                matchers_1.expect(car).toBeAnInstanceOf(SportsCar);
                matchers_1.expect(car.engine).toBeAnInstanceOf(Engine);
            });
            testing_internal_1.it('should support optional dependencies', function () {
                var injector = createInjector([CarWithOptionalEngine]);
                var car = injector.get(CarWithOptionalEngine);
                matchers_1.expect(car.engine).toEqual(null);
            });
            testing_internal_1.it('should flatten passed-in providers', function () {
                var injector = createInjector([[[Engine, Car]]]);
                var car = injector.get(Car);
                matchers_1.expect(car).toBeAnInstanceOf(Car);
            });
            testing_internal_1.it('should use the last provider when there are multiple providers for same token', function () {
                var injector = createInjector([core_1.provide(Engine, { useClass: Engine }), core_1.provide(Engine, { useClass: TurboEngine })]);
                matchers_1.expect(injector.get(Engine)).toBeAnInstanceOf(TurboEngine);
            });
            testing_internal_1.it('should use non-type tokens', function () {
                var injector = createInjector([core_1.provide('token', { useValue: 'value' })]);
                matchers_1.expect(injector.get('token')).toEqual('value');
            });
            testing_internal_1.it('should throw when given invalid providers', function () {
                matchers_1.expect(function () { return createInjector(['blah']); })
                    .toThrowError('Invalid provider - only instances of Provider and Type are allowed, got: blah');
            });
            testing_internal_1.it('should provide itself', function () {
                var parent = createInjector([]);
                var child = createInjector([], parent);
                matchers_1.expect(child.get(core_1.Injector)).toBe(child);
            });
            testing_internal_1.it('should throw when no provider defined', function () {
                var injector = createInjector([]);
                matchers_1.expect(function () { return injector.get('NonExisting'); }).toThrowError('No provider for NonExisting!');
            });
            testing_internal_1.it('should throw when trying to instantiate a cyclic dependency', function () {
                matchers_1.expect(function () { return createInjector([Car, core_1.provide(Engine, { useClass: CyclicEngine })]); })
                    .toThrowError(/Cannot instantiate cyclic dependency! Car/g);
            });
            testing_internal_1.it('should support null values', function () {
                var injector = createInjector([core_1.provide('null', { useValue: null })]);
                matchers_1.expect(injector.get('null')).toBe(null);
            });
            testing_internal_1.describe('child', function () {
                testing_internal_1.it('should load instances from parent injector', function () {
                    var parent = createInjector([Engine]);
                    var child = createInjector([], parent);
                    var engineFromParent = parent.get(Engine);
                    var engineFromChild = child.get(Engine);
                    matchers_1.expect(engineFromChild).toBe(engineFromParent);
                });
                testing_internal_1.it('should not use the child providers when resolving the dependencies of a parent provider', function () {
                    var parent = createInjector([Car, Engine]);
                    var child = createInjector([core_1.provide(Engine, { useClass: TurboEngine })], parent);
                    var carFromChild = child.get(Car);
                    matchers_1.expect(carFromChild.engine).toBeAnInstanceOf(Engine);
                });
                testing_internal_1.it('should create new instance in a child injector', function () {
                    var parent = createInjector([Engine]);
                    var child = createInjector([core_1.provide(Engine, { useClass: TurboEngine })], parent);
                    var engineFromParent = parent.get(Engine);
                    var engineFromChild = child.get(Engine);
                    matchers_1.expect(engineFromParent).not.toBe(engineFromChild);
                    matchers_1.expect(engineFromChild).toBeAnInstanceOf(TurboEngine);
                });
            });
            testing_internal_1.describe('depedency resolution', function () {
                testing_internal_1.describe('@Self()', function () {
                    testing_internal_1.it('should return a dependency from self', function () {
                        var inj = createInjector([
                            Engine,
                            core_1.provide(Car, { useFactory: function (e) { return new Car(e); }, deps: [[Engine, new core_1.SelfMetadata()]] })
                        ]);
                        matchers_1.expect(inj.get(Car)).toBeAnInstanceOf(Car);
                    });
                    testing_internal_1.it('should throw when not requested provider on self', function () {
                        matchers_1.expect(function () { return createInjector([core_1.provide(Car, {
                                useFactory: function (e) { return new Car(e); },
                                deps: [[Engine, new core_1.SelfMetadata()]]
                            })]); })
                            .toThrowError(/No provider for Engine/g);
                    });
                });
                testing_internal_1.describe('default', function () {
                    testing_internal_1.it('should not skip self', function () {
                        var parent = createInjector([Engine]);
                        var child = createInjector([
                            core_1.provide(Engine, { useClass: TurboEngine }),
                            core_1.provide(Car, { useFactory: function (e) { return new Car(e); }, deps: [Engine] })
                        ], parent);
                        matchers_1.expect(child.get(Car).engine).toBeAnInstanceOf(TurboEngine);
                    });
                });
            });
            testing_internal_1.describe('imported and exported modules', function () {
                testing_internal_1.it('should add the providers of imported modules', function () {
                    var ImportedModule = (function () {
                        function ImportedModule() {
                        }
                        /** @nocollapse */
                        ImportedModule.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'imported' }] },] },
                        ];
                        return ImportedModule;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{ imports: [ImportedModule] },] },
                        ];
                        return SomeModule;
                    }());
                    var injector = createModule(SomeModule).injector;
                    matchers_1.expect(injector.get(SomeModule)).toBeAnInstanceOf(SomeModule);
                    matchers_1.expect(injector.get(ImportedModule)).toBeAnInstanceOf(ImportedModule);
                    matchers_1.expect(injector.get('token1')).toBe('imported');
                });
                testing_internal_1.it('should overwrite the providers of imported modules', function () {
                    var ImportedModule = (function () {
                        function ImportedModule() {
                        }
                        /** @nocollapse */
                        ImportedModule.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'imported' }] },] },
                        ];
                        return ImportedModule;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'direct' }], imports: [ImportedModule] },] },
                        ];
                        return SomeModule;
                    }());
                    var injector = createModule(SomeModule).injector;
                    matchers_1.expect(injector.get('token1')).toBe('direct');
                });
                testing_internal_1.it('should overwrite the providers of imported modules on the second import level', function () {
                    var ImportedModuleLevel2 = (function () {
                        function ImportedModuleLevel2() {
                        }
                        /** @nocollapse */
                        ImportedModuleLevel2.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'imported' }] },] },
                        ];
                        return ImportedModuleLevel2;
                    }());
                    var ImportedModuleLevel1 = (function () {
                        function ImportedModuleLevel1() {
                        }
                        /** @nocollapse */
                        ImportedModuleLevel1.decorators = [
                            { type: core_1.NgModule, args: [{
                                        providers: [{ provide: 'token1', useValue: 'direct' }],
                                        imports: [ImportedModuleLevel2]
                                    },] },
                        ];
                        return ImportedModuleLevel1;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{ imports: [ImportedModuleLevel1] },] },
                        ];
                        return SomeModule;
                    }());
                    var injector = createModule(SomeModule).injector;
                    matchers_1.expect(injector.get('token1')).toBe('direct');
                });
                testing_internal_1.it('should add the providers of exported modules', function () {
                    var ExportedValue = (function () {
                        function ExportedValue() {
                        }
                        /** @nocollapse */
                        ExportedValue.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'exported' }] },] },
                        ];
                        return ExportedValue;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{ exports: [ExportedValue] },] },
                        ];
                        return SomeModule;
                    }());
                    var injector = createModule(SomeModule).injector;
                    matchers_1.expect(injector.get(SomeModule)).toBeAnInstanceOf(SomeModule);
                    matchers_1.expect(injector.get(ExportedValue)).toBeAnInstanceOf(ExportedValue);
                    matchers_1.expect(injector.get('token1')).toBe('exported');
                });
                testing_internal_1.it('should overwrite the providers of exported modules', function () {
                    var ImportedModule = (function () {
                        function ImportedModule() {
                        }
                        /** @nocollapse */
                        ImportedModule.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'exported' }] },] },
                        ];
                        return ImportedModule;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'direct' }], exports: [ImportedModule] },] },
                        ];
                        return SomeModule;
                    }());
                    var injector = createModule(SomeModule).injector;
                    matchers_1.expect(injector.get('token1')).toBe('direct');
                });
                testing_internal_1.it('should overwrite the providers of imported modules by following imported modules', function () {
                    var ImportedModule1 = (function () {
                        function ImportedModule1() {
                        }
                        /** @nocollapse */
                        ImportedModule1.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'imported1' }] },] },
                        ];
                        return ImportedModule1;
                    }());
                    var ImportedModule2 = (function () {
                        function ImportedModule2() {
                        }
                        /** @nocollapse */
                        ImportedModule2.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'imported2' }] },] },
                        ];
                        return ImportedModule2;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{ imports: [ImportedModule1, ImportedModule2] },] },
                        ];
                        return SomeModule;
                    }());
                    var injector = createModule(SomeModule).injector;
                    matchers_1.expect(injector.get('token1')).toBe('imported2');
                });
                testing_internal_1.it('should overwrite the providers of exported modules by following exported modules', function () {
                    var ExportedModule1 = (function () {
                        function ExportedModule1() {
                        }
                        /** @nocollapse */
                        ExportedModule1.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'exported1' }] },] },
                        ];
                        return ExportedModule1;
                    }());
                    var ExportedModule2 = (function () {
                        function ExportedModule2() {
                        }
                        /** @nocollapse */
                        ExportedModule2.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'exported2' }] },] },
                        ];
                        return ExportedModule2;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{ exports: [ExportedModule1, ExportedModule2] },] },
                        ];
                        return SomeModule;
                    }());
                    var injector = createModule(SomeModule).injector;
                    matchers_1.expect(injector.get('token1')).toBe('exported2');
                });
                testing_internal_1.it('should overwrite the providers of imported modules by exported modules', function () {
                    var ImportedModule = (function () {
                        function ImportedModule() {
                        }
                        /** @nocollapse */
                        ImportedModule.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'imported' }] },] },
                        ];
                        return ImportedModule;
                    }());
                    var ExportedModule = (function () {
                        function ExportedModule() {
                        }
                        /** @nocollapse */
                        ExportedModule.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'exported' }] },] },
                        ];
                        return ExportedModule;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{ imports: [ImportedModule], exports: [ExportedModule] },] },
                        ];
                        return SomeModule;
                    }());
                    var injector = createModule(SomeModule).injector;
                    matchers_1.expect(injector.get('token1')).toBe('exported');
                });
                testing_internal_1.it('should not overwrite the providers if a module was already used on the same level', function () {
                    var ImportedModule1 = (function () {
                        function ImportedModule1() {
                        }
                        /** @nocollapse */
                        ImportedModule1.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'imported1' }] },] },
                        ];
                        return ImportedModule1;
                    }());
                    var ImportedModule2 = (function () {
                        function ImportedModule2() {
                        }
                        /** @nocollapse */
                        ImportedModule2.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'imported2' }] },] },
                        ];
                        return ImportedModule2;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{ imports: [ImportedModule1, ImportedModule2, ImportedModule1] },] },
                        ];
                        return SomeModule;
                    }());
                    var injector = createModule(SomeModule).injector;
                    matchers_1.expect(injector.get('token1')).toBe('imported2');
                });
                testing_internal_1.it('should not overwrite the providers if a module was already used on a child level', function () {
                    var ImportedModule1 = (function () {
                        function ImportedModule1() {
                        }
                        /** @nocollapse */
                        ImportedModule1.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'imported1' }] },] },
                        ];
                        return ImportedModule1;
                    }());
                    var ImportedModule3 = (function () {
                        function ImportedModule3() {
                        }
                        /** @nocollapse */
                        ImportedModule3.decorators = [
                            { type: core_1.NgModule, args: [{ imports: [ImportedModule1] },] },
                        ];
                        return ImportedModule3;
                    }());
                    var ImportedModule2 = (function () {
                        function ImportedModule2() {
                        }
                        /** @nocollapse */
                        ImportedModule2.decorators = [
                            { type: core_1.NgModule, args: [{ providers: [{ provide: 'token1', useValue: 'imported2' }] },] },
                        ];
                        return ImportedModule2;
                    }());
                    var SomeModule = (function () {
                        function SomeModule() {
                        }
                        /** @nocollapse */
                        SomeModule.decorators = [
                            { type: core_1.NgModule, args: [{ imports: [ImportedModule3, ImportedModule2, ImportedModule1] },] },
                        ];
                        return SomeModule;
                    }());
                    var injector = createModule(SomeModule).injector;
                    matchers_1.expect(injector.get('token1')).toBe('imported2');
                });
            });
        });
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfbW9kdWxlX2ludGVncmF0aW9uX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvdGVzdC9saW5rZXIvbmdfbW9kdWxlX2ludGVncmF0aW9uX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7O0FBR0gseUJBQTZELG1CQUFtQixDQUFDLENBQUE7QUFFakYscUJBQXFZLGVBQWUsQ0FBQyxDQUFBO0FBQ3JaLHdCQUFzQiwyQkFBMkIsQ0FBQyxDQUFBO0FBQ2xELHdCQUFrRCx1QkFBdUIsQ0FBQyxDQUFBO0FBQzFFLGlDQUF3SCx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ2pLLHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBRWxFLDJCQUE0Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBQzFELHFCQUFxRCx1QkFBdUIsQ0FBQyxDQUFBO0FBRTdFO0lBQUE7SUFBYyxDQUFDO0lBQUQsYUFBQztBQUFELENBQUMsQUFBZixJQUFlO0FBRWY7SUFDRTtRQUFnQixNQUFNLElBQUksMEJBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUFDLENBQUM7SUFDN0QsbUJBQUM7QUFBRCxDQUFDLEFBRkQsSUFFQztBQUVEO0lBQUE7SUFBeUIsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQUExQixJQUEwQjtBQUMxQjtJQUNFLG1CQUFZLFFBQTJCO0lBQUcsQ0FBQztJQUM3QyxrQkFBa0I7SUFDWCxvQkFBVSxHQUEwQjtRQUMzQyxFQUFFLElBQUksRUFBRSxpQkFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCx3QkFBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxpQkFBaUIsR0FBRztLQUMxQixDQUFDO0lBQ0YsZ0JBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQUVEO0lBQTBCLCtCQUFNO0lBQWhDO1FBQTBCLDhCQUFNO0lBQUUsQ0FBQztJ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