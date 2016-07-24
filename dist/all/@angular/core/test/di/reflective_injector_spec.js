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
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var exceptions_1 = require('../../src/facade/exceptions');
var lang_1 = require('../../src/facade/lang');
var core_1 = require('@angular/core');
var reflective_injector_1 = require('@angular/core/src/di/reflective_injector');
var metadata_1 = require('@angular/core/src/di/metadata');
var reflective_provider_1 = require('@angular/core/src/di/reflective_provider');
var CustomDependencyMetadata = (function (_super) {
    __extends(CustomDependencyMetadata, _super);
    function CustomDependencyMetadata() {
        _super.apply(this, arguments);
    }
    return CustomDependencyMetadata;
}(metadata_1.DependencyMetadata));
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
function main() {
    var dynamicProviders = [
        { provide: 'provider0', useValue: 1 }, { provide: 'provider1', useValue: 1 },
        { provide: 'provider2', useValue: 1 }, { provide: 'provider3', useValue: 1 },
        { provide: 'provider4', useValue: 1 }, { provide: 'provider5', useValue: 1 },
        { provide: 'provider6', useValue: 1 }, { provide: 'provider7', useValue: 1 },
        { provide: 'provider8', useValue: 1 }, { provide: 'provider9', useValue: 1 },
        { provide: 'provider10', useValue: 1 }
    ];
    [{ strategy: 'inline', providers: [], strategyClass: reflective_injector_1.ReflectiveInjectorInlineStrategy }, {
            strategy: 'dynamic',
            providers: dynamicProviders,
            strategyClass: reflective_injector_1.ReflectiveInjectorDynamicStrategy
        }].forEach(function (context) {
        function createInjector(providers, parent) {
            if (parent === void 0) { parent = null; }
            var resolvedProviders = core_1.ReflectiveInjector.resolve(providers.concat(context['providers']));
            if (lang_1.isPresent(parent)) {
                return parent.createChildFromResolved(resolvedProviders);
            }
            else {
                return core_1.ReflectiveInjector.fromResolvedProviders(resolvedProviders);
            }
        }
        describe("injector " + context['strategy'], function () {
            it('should use the right strategy', function () {
                var injector = createInjector([]);
                matchers_1.expect(injector.internalStrategy).toBeAnInstanceOf(context['strategyClass']);
            });
            it('should instantiate a class without dependencies', function () {
                var injector = createInjector([Engine]);
                var engine = injector.get(Engine);
                matchers_1.expect(engine).toBeAnInstanceOf(Engine);
            });
            it('should resolve dependencies based on type information', function () {
                var injector = createInjector([Engine, Car]);
                var car = injector.get(Car);
                matchers_1.expect(car).toBeAnInstanceOf(Car);
                matchers_1.expect(car.engine).toBeAnInstanceOf(Engine);
            });
            it('should resolve dependencies based on @Inject annotation', function () {
                var injector = createInjector([TurboEngine, Engine, CarWithInject]);
                var car = injector.get(CarWithInject);
                matchers_1.expect(car).toBeAnInstanceOf(CarWithInject);
                matchers_1.expect(car.engine).toBeAnInstanceOf(TurboEngine);
            });
            it('should throw when no type and not @Inject (class case)', function () {
                matchers_1.expect(function () { return createInjector([NoAnnotations]); })
                    .toThrowError('Cannot resolve all parameters for \'NoAnnotations\'(?). ' +
                    'Make sure that all the parameters are decorated with Inject or have valid type annotations ' +
                    'and that \'NoAnnotations\' is decorated with Injectable.');
            });
            it('should throw when no type and not @Inject (factory case)', function () {
                matchers_1.expect(function () { return createInjector([{ provide: 'someToken', useFactory: factoryFn }]); })
                    .toThrowError('Cannot resolve all parameters for \'factoryFn\'(?). ' +
                    'Make sure that all the parameters are decorated with Inject or have valid type annotations ' +
                    'and that \'factoryFn\' is decorated with Injectable.');
            });
            it('should cache instances', function () {
                var injector = createInjector([Engine]);
                var e1 = injector.get(Engine);
                var e2 = injector.get(Engine);
                matchers_1.expect(e1).toBe(e2);
            });
            it('should provide to a value', function () {
                var injector = createInjector([{ provide: Engine, useValue: 'fake engine' }]);
                var engine = injector.get(Engine);
                matchers_1.expect(engine).toEqual('fake engine');
            });
            it('should provide to a factory', function () {
                function sportsCarFactory(e /** TODO #9100 */) { return new SportsCar(e); }
                var injector = createInjector([Engine, { provide: Car, useFactory: sportsCarFactory, deps: [Engine] }]);
                var car = injector.get(Car);
                matchers_1.expect(car).toBeAnInstanceOf(SportsCar);
                matchers_1.expect(car.engine).toBeAnInstanceOf(Engine);
            });
            it('should throw when using a factory with more than 20 dependencies', function () {
                function factoryWithTooManyArgs() { return new Car(null); }
                var injector = createInjector([
                    Engine, {
                        provide: Car,
                        useFactory: factoryWithTooManyArgs,
                        deps: [
                            Engine, Engine, Engine, Engine, Engine, Engine, Engine,
                            Engine, Engine, Engine, Engine, Engine, Engine, Engine,
                            Engine, Engine, Engine, Engine, Engine, Engine, Engine
                        ]
                    }
                ]);
                try {
                    injector.get(Car);
                    throw 'Must throw';
                }
                catch (e) {
                    matchers_1.expect(e.message).toContain("Cannot instantiate 'Car' because it has more than 20 dependencies");
                }
            });
            it('should supporting provider to null', function () {
                var injector = createInjector([{ provide: Engine, useValue: null }]);
                var engine = injector.get(Engine);
                matchers_1.expect(engine).toBeNull();
            });
            it('should provide to an alias', function () {
                var injector = createInjector([
                    Engine, { provide: SportsCar, useClass: SportsCar },
                    { provide: Car, useExisting: SportsCar }
                ]);
                var car = injector.get(Car);
                var sportsCar = injector.get(SportsCar);
                matchers_1.expect(car).toBeAnInstanceOf(SportsCar);
                matchers_1.expect(car).toBe(sportsCar);
            });
            it('should support multiProviders', function () {
                var injector = createInjector([
                    Engine, { provide: Car, useClass: SportsCar, multi: true },
                    { provide: Car, useClass: CarWithOptionalEngine, multi: true }
                ]);
                var cars = injector.get(Car);
                matchers_1.expect(cars.length).toEqual(2);
                matchers_1.expect(cars[0]).toBeAnInstanceOf(SportsCar);
                matchers_1.expect(cars[1]).toBeAnInstanceOf(CarWithOptionalEngine);
            });
            it('should support multiProviders that are created using useExisting', function () {
                var injector = createInjector([Engine, SportsCar, { provide: Car, useExisting: SportsCar, multi: true }]);
                var cars = injector.get(Car);
                matchers_1.expect(cars.length).toEqual(1);
                matchers_1.expect(cars[0]).toBe(injector.get(SportsCar));
            });
            it('should throw when the aliased provider does not exist', function () {
                var injector = createInjector([{ provide: 'car', useExisting: SportsCar }]);
                var e = "No provider for " + lang_1.stringify(SportsCar) + "! (car -> " + lang_1.stringify(SportsCar) + ")";
                matchers_1.expect(function () { return injector.get('car'); }).toThrowError(e);
            });
            it('should handle forwardRef in useExisting', function () {
                var injector = createInjector([
                    { provide: 'originalEngine', useClass: core_1.forwardRef(function () { return Engine; }) },
                    { provide: 'aliasedEngine', useExisting: core_1.forwardRef(function () { return 'originalEngine'; }) }
                ]);
                matchers_1.expect(injector.get('aliasedEngine')).toBeAnInstanceOf(Engine);
            });
            it('should support overriding factory dependencies', function () {
                var injector = createInjector([Engine, { provide: Car, useFactory: function (e) { return new SportsCar(e); }, deps: [Engine] }]);
                var car = injector.get(Car);
                matchers_1.expect(car).toBeAnInstanceOf(SportsCar);
                matchers_1.expect(car.engine).toBeAnInstanceOf(Engine);
            });
            it('should support optional dependencies', function () {
                var injector = createInjector([CarWithOptionalEngine]);
                var car = injector.get(CarWithOptionalEngine);
                matchers_1.expect(car.engine).toEqual(null);
            });
            it('should flatten passed-in providers', function () {
                var injector = createInjector([[[Engine, Car]]]);
                var car = injector.get(Car);
                matchers_1.expect(car).toBeAnInstanceOf(Car);
            });
            it('should use the last provider when there are multiple providers for same token', function () {
                var injector = createInjector([{ provide: Engine, useClass: Engine }, { provide: Engine, useClass: TurboEngine }]);
                matchers_1.expect(injector.get(Engine)).toBeAnInstanceOf(TurboEngine);
            });
            it('should use non-type tokens', function () {
                var injector = createInjector([{ provide: 'token', useValue: 'value' }]);
                matchers_1.expect(injector.get('token')).toEqual('value');
            });
            it('should throw when given invalid providers', function () {
                matchers_1.expect(function () { return createInjector(['blah']); })
                    .toThrowError('Invalid provider - only instances of Provider and Type are allowed, got: blah');
            });
            it('should provide itself', function () {
                var parent = createInjector([]);
                var child = parent.resolveAndCreateChild([]);
                matchers_1.expect(child.get(core_1.Injector)).toBe(child);
            });
            it('should throw when no provider defined', function () {
                var injector = createInjector([]);
                matchers_1.expect(function () { return injector.get('NonExisting'); }).toThrowError('No provider for NonExisting!');
            });
            it('should show the full path when no provider', function () {
                var injector = createInjector([CarWithDashboard, Engine, Dashboard]);
                matchers_1.expect(function () { return injector.get(CarWithDashboard); })
                    .toThrowError("No provider for DashboardSoftware! (" + lang_1.stringify(CarWithDashboard) + " -> " + lang_1.stringify(Dashboard) + " -> DashboardSoftware)");
            });
            it('should throw when trying to instantiate a cyclic dependency', function () {
                var injector = createInjector([Car, { provide: Engine, useClass: CyclicEngine }]);
                matchers_1.expect(function () { return injector.get(Car); })
                    .toThrowError("Cannot instantiate cyclic dependency! (" + lang_1.stringify(Car) + " -> " + lang_1.stringify(Engine) + " -> " + lang_1.stringify(Car) + ")");
            });
            it('should show the full path when error happens in a constructor', function () {
                var providers = core_1.ReflectiveInjector.resolve([Car, { provide: Engine, useClass: BrokenEngine }]);
                var proto = new reflective_injector_1.ReflectiveProtoInjector([providers[0], providers[1]]);
                var injector = new reflective_injector_1.ReflectiveInjector_(proto);
                try {
                    injector.get(Car);
                    throw 'Must throw';
                }
                catch (e) {
                    matchers_1.expect(e.message).toContain("Error during instantiation of Engine! (" + lang_1.stringify(Car) + " -> Engine)");
                    matchers_1.expect(e.originalException instanceof exceptions_1.BaseException).toBeTruthy();
                    matchers_1.expect(e.causeKey.token).toEqual(Engine);
                }
            });
            it('should provide context when throwing an exception ', function () {
                var engineProvider = core_1.ReflectiveInjector.resolve([{ provide: Engine, useClass: BrokenEngine }])[0];
                var protoParent = new reflective_injector_1.ReflectiveProtoInjector([engineProvider]);
                var carProvider = core_1.ReflectiveInjector.resolve([Car])[0];
                var protoChild = new reflective_injector_1.ReflectiveProtoInjector([carProvider]);
                var parent = new reflective_injector_1.ReflectiveInjector_(protoParent, null, function () { return 'parentContext'; });
                var child = new reflective_injector_1.ReflectiveInjector_(protoChild, parent, function () { return 'childContext'; });
                try {
                    child.get(Car);
                    throw 'Must throw';
                }
                catch (e) {
                    matchers_1.expect(e.context).toEqual('childContext');
                }
            });
            it('should instantiate an object after a failed attempt', function () {
                var isBroken = true;
                var injector = createInjector([
                    Car,
                    { provide: Engine, useFactory: (function () { return isBroken ? new BrokenEngine() : new Engine(); }) }
                ]);
                matchers_1.expect(function () { return injector.get(Car); }).toThrowError(new RegExp('Error'));
                isBroken = false;
                matchers_1.expect(injector.get(Car)).toBeAnInstanceOf(Car);
            });
            it('should support null values', function () {
                var injector = createInjector([{ provide: 'null', useValue: null }]);
                matchers_1.expect(injector.get('null')).toBe(null);
            });
        });
        describe('child', function () {
            it('should load instances from parent injector', function () {
                var parent = core_1.ReflectiveInjector.resolveAndCreate([Engine]);
                var child = parent.resolveAndCreateChild([]);
                var engineFromParent = parent.get(Engine);
                var engineFromChild = child.get(Engine);
                matchers_1.expect(engineFromChild).toBe(engineFromParent);
            });
            it('should not use the child providers when resolving the dependencies of a parent provider', function () {
                var parent = core_1.ReflectiveInjector.resolveAndCreate([Car, Engine]);
                var child = parent.resolveAndCreateChild([{ provide: Engine, useClass: TurboEngine }]);
                var carFromChild = child.get(Car);
                matchers_1.expect(carFromChild.engine).toBeAnInstanceOf(Engine);
            });
            it('should create new instance in a child injector', function () {
                var parent = core_1.ReflectiveInjector.resolveAndCreate([Engine]);
                var child = parent.resolveAndCreateChild([{ provide: Engine, useClass: TurboEngine }]);
                var engineFromParent = parent.get(Engine);
                var engineFromChild = child.get(Engine);
                matchers_1.expect(engineFromParent).not.toBe(engineFromChild);
                matchers_1.expect(engineFromChild).toBeAnInstanceOf(TurboEngine);
            });
            it('should give access to parent', function () {
                var parent = core_1.ReflectiveInjector.resolveAndCreate([]);
                var child = parent.resolveAndCreateChild([]);
                matchers_1.expect(child.parent).toBe(parent);
            });
        });
        describe('resolveAndInstantiate', function () {
            it('should instantiate an object in the context of the injector', function () {
                var inj = core_1.ReflectiveInjector.resolveAndCreate([Engine]);
                var car = inj.resolveAndInstantiate(Car);
                matchers_1.expect(car).toBeAnInstanceOf(Car);
                matchers_1.expect(car.engine).toBe(inj.get(Engine));
            });
            it('should not store the instantiated object in the injector', function () {
                var inj = core_1.ReflectiveInjector.resolveAndCreate([Engine]);
                inj.resolveAndInstantiate(Car);
                matchers_1.expect(function () { return inj.get(Car); }).toThrowError();
            });
        });
        describe('instantiate', function () {
            it('should instantiate an object in the context of the injector', function () {
                var inj = core_1.ReflectiveInjector.resolveAndCreate([Engine]);
                var car = inj.instantiateResolved(core_1.ReflectiveInjector.resolve([Car])[0]);
                matchers_1.expect(car).toBeAnInstanceOf(Car);
                matchers_1.expect(car.engine).toBe(inj.get(Engine));
            });
        });
        describe('depedency resolution', function () {
            describe('@Self()', function () {
                it('should return a dependency from self', function () {
                    var inj = core_1.ReflectiveInjector.resolveAndCreate([
                        Engine, {
                            provide: Car,
                            useFactory: function (e) { return new Car(e); },
                            deps: [[Engine, new core_1.SelfMetadata()]]
                        }
                    ]);
                    matchers_1.expect(inj.get(Car)).toBeAnInstanceOf(Car);
                });
                it('should throw when not requested provider on self', function () {
                    var parent = core_1.ReflectiveInjector.resolveAndCreate([Engine]);
                    var child = parent.resolveAndCreateChild([{
                            provide: Car,
                            useFactory: function (e) { return new Car(e); },
                            deps: [[Engine, new core_1.SelfMetadata()]]
                        }]);
                    matchers_1.expect(function () { return child.get(Car); })
                        .toThrowError("No provider for Engine! (" + lang_1.stringify(Car) + " -> " + lang_1.stringify(Engine) + ")");
                });
            });
            describe('default', function () {
                it('should not skip self', function () {
                    var parent = core_1.ReflectiveInjector.resolveAndCreate([Engine]);
                    var child = parent.resolveAndCreateChild([
                        { provide: Engine, useClass: TurboEngine },
                        { provide: Car, useFactory: function (e) { return new Car(e); }, deps: [Engine] }
                    ]);
                    matchers_1.expect(child.get(Car).engine).toBeAnInstanceOf(TurboEngine);
                });
            });
        });
        describe('resolve', function () {
            it('should resolve and flatten', function () {
                var providers = core_1.ReflectiveInjector.resolve([Engine, [BrokenEngine]]);
                providers.forEach(function (b) {
                    if (lang_1.isBlank(b))
                        return; // the result is a sparse array
                    matchers_1.expect(b instanceof reflective_provider_1.ResolvedReflectiveProvider_).toBe(true);
                });
            });
            it('should support multi providers', function () {
                var provider = core_1.ReflectiveInjector.resolve([
                    { provide: Engine, useClass: BrokenEngine, multi: true },
                    { provide: Engine, useClass: TurboEngine, multi: true }
                ])[0];
                matchers_1.expect(provider.key.token).toBe(Engine);
                matchers_1.expect(provider.multiProvider).toEqual(true);
                matchers_1.expect(provider.resolvedFactories.length).toEqual(2);
            });
            it('should support providers as hash', function () {
                var provider = core_1.ReflectiveInjector.resolve([
                    { provide: Engine, useClass: BrokenEngine, multi: true },
                    { provide: Engine, useClass: TurboEngine, multi: true }
                ])[0];
                matchers_1.expect(provider.key.token).toBe(Engine);
                matchers_1.expect(provider.multiProvider).toEqual(true);
                matchers_1.expect(provider.resolvedFactories.length).toEqual(2);
            });
            it('should support multi providers with only one provider', function () {
                var provider = core_1.ReflectiveInjector.resolve([{ provide: Engine, useClass: BrokenEngine, multi: true }])[0];
                matchers_1.expect(provider.key.token).toBe(Engine);
                matchers_1.expect(provider.multiProvider).toEqual(true);
                matchers_1.expect(provider.resolvedFactories.length).toEqual(1);
            });
            it('should throw when mixing multi providers with regular providers', function () {
                matchers_1.expect(function () {
                    core_1.ReflectiveInjector.resolve([{ provide: Engine, useClass: BrokenEngine, multi: true }, Engine]);
                }).toThrowError(/Cannot mix multi providers and regular providers/);
                matchers_1.expect(function () {
                    core_1.ReflectiveInjector.resolve([Engine, { provide: Engine, useClass: BrokenEngine, multi: true }]);
                }).toThrowError(/Cannot mix multi providers and regular providers/);
            });
            it('should resolve forward references', function () {
                var providers = core_1.ReflectiveInjector.resolve([
                    core_1.forwardRef(function () { return Engine; }),
                    [{ provide: core_1.forwardRef(function () { return BrokenEngine; }), useClass: core_1.forwardRef(function () { return Engine; }) }], {
                        provide: core_1.forwardRef(function () { return String; }),
                        useFactory: function () { return 'OK'; },
                        deps: [core_1.forwardRef(function () { return Engine; })]
                    }
                ]);
                var engineProvider = providers[0];
                var brokenEngineProvider = providers[1];
                var stringProvider = providers[2];
                matchers_1.expect(engineProvider.resolvedFactories[0].factory() instanceof Engine).toBe(true);
                matchers_1.expect(brokenEngineProvider.resolvedFactories[0].factory() instanceof Engine).toBe(true);
                matchers_1.expect(stringProvider.resolvedFactories[0].dependencies[0].key)
                    .toEqual(core_1.ReflectiveKey.get(Engine));
            });
            it('should support overriding factory dependencies with dependency annotations', function () {
                var providers = core_1.ReflectiveInjector.resolve([{
                        provide: 'token',
                        useFactory: function (e /** TODO #9100 */) { return 'result'; },
                        deps: [[new core_1.InjectMetadata('dep'), new CustomDependencyMetadata()]]
                    }]);
                var provider = providers[0];
                matchers_1.expect(provider.resolvedFactories[0].dependencies[0].key.token).toEqual('dep');
                matchers_1.expect(provider.resolvedFactories[0].dependencies[0].properties).toEqual([
                    new CustomDependencyMetadata()
                ]);
            });
            it('should allow declaring dependencies with flat arrays', function () {
                var resolved = core_1.ReflectiveInjector.resolve([{ provide: 'token', useFactory: function (e) { return e; }, deps: [new core_1.InjectMetadata('dep')] }]);
                var nestedResolved = core_1.ReflectiveInjector.resolve([{ provide: 'token', useFactory: function (e) { return e; }, deps: [[new core_1.InjectMetadata('dep')]] }]);
                matchers_1.expect(resolved[0].resolvedFactories[0].dependencies[0].key.token)
                    .toEqual(nestedResolved[0].resolvedFactories[0].dependencies[0].key.token);
            });
        });
        describe('displayName', function () {
            it('should work', function () {
                matchers_1.expect(core_1.ReflectiveInjector.resolveAndCreate([Engine, BrokenEngine])
                    .displayName)
                    .toEqual('ReflectiveInjector(providers: [ "Engine" ,  "BrokenEngine" ])');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdGl2ZV9pbmplY3Rvcl9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvZGkvcmVmbGVjdGl2ZV9pbmplY3Rvcl9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBRWxFLDJCQUE0Qiw2QkFBNkIsQ0FBQyxDQUFBO0FBQzFELHFCQUE0Qyx1QkFBdUIsQ0FBQyxDQUFBO0FBRXBFLHFCQUFtSSxlQUFlLENBQUMsQ0FBQTtBQUNuSixvQ0FBZ0ksMENBQTBDLENBQUMsQ0FBQTtBQUMzSyx5QkFBaUMsK0JBQStCLENBQUMsQ0FBQTtBQUNqRSxvQ0FBMEMsMENBQTBDLENBQUMsQ0FBQTtBQUVyRjtJQUF1Qyw0Q0FBa0I7SUFBekQ7UUFBdUMsOEJBQWtCO0lBQUUsQ0FBQztJQUFELCtCQUFDO0FBQUQsQ0FBQyxBQUE1RCxDQUF1Qyw2QkFBa0IsR0FBRztBQUU1RDtJQUFBO0lBQWMsQ0FBQztJQUFELGFBQUM7QUFBRCxDQUFDLEFBQWYsSUFBZTtBQUVmO0lBQ0U7UUFBZ0IsTUFBTSxJQUFJLDBCQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7SUFBQyxDQUFDO0lBQzdELG1CQUFDO0FBQUQsQ0FBQyxBQUZELElBRUM7QUFFRDtJQUFBO0lBQXlCLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFBMUIsSUFBMEI7QUFDMUI7SUFDRSxtQkFBWSxRQUEyQjtJQUFHLENBQUM7SUFDN0Msa0JBQWtCO0lBQ1gsb0JBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsaUJBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0Ysa0JBQWtCO0lBQ1gsd0JBQWMsR0FBMkQ7UUFDaEYsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEdBQUc7S0FDMUIsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxB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