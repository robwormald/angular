/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var angular = require('./angular_js');
var constants_1 = require('./constants');
var downgrade_ng2_adapter_1 = require('./downgrade_ng2_adapter');
var metadata_1 = require('./metadata');
var upgrade_ng1_adapter_1 = require('./upgrade_ng1_adapter');
var util_1 = require('./util');
var upgradeCount = 0;
/**
 * Use `UpgradeAdapter` to allow AngularJS v1 and Angular v2 to coexist in a single application.
 *
 * The `UpgradeAdapter` allows:
 * 1. creation of Angular v2 component from AngularJS v1 component directive
 *    (See [UpgradeAdapter#upgradeNg1Component()])
 * 2. creation of AngularJS v1 directive from Angular v2 component.
 *    (See [UpgradeAdapter#downgradeNg2Component()])
 * 3. Bootstrapping of a hybrid Angular application which contains both of the frameworks
 *    coexisting in a single application.
 *
 * ## Mental Model
 *
 * When reasoning about how a hybrid application works it is useful to have a mental model which
 * describes what is happening and explains what is happening at the lowest level.
 *
 * 1. There are two independent frameworks running in a single application, each framework treats
 *    the other as a black box.
 * 2. Each DOM element on the page is owned exactly by one framework. Whichever framework
 *    instantiated the element is the owner. Each framework only updates/interacts with its own
 *    DOM elements and ignores others.
 * 3. AngularJS v1 directives always execute inside AngularJS v1 framework codebase regardless of
 *    where they are instantiated.
 * 4. Angular v2 components always execute inside Angular v2 framework codebase regardless of
 *    where they are instantiated.
 * 5. An AngularJS v1 component can be upgraded to an Angular v2 component. This creates an
 *    Angular v2 directive, which bootstraps the AngularJS v1 component directive in that location.
 * 6. An Angular v2 component can be downgraded to an AngularJS v1 component directive. This creates
 *    an AngularJS v1 directive, which bootstraps the Angular v2 component in that location.
 * 7. Whenever an adapter component is instantiated the host element is owned by the framework
 *    doing the instantiation. The other framework then instantiates and owns the view for that
 *    component. This implies that component bindings will always follow the semantics of the
 *    instantiation framework. The syntax is always that of Angular v2 syntax.
 * 8. AngularJS v1 is always bootstrapped first and owns the bottom most view.
 * 9. The new application is running in Angular v2 zone, and therefore it no longer needs calls to
 *    `$apply()`.
 *
 * ### Example
 *
 * ```
 * var adapter = new UpgradeAdapter();
 * var module = angular.module('myExample', []);
 * module.directive('ng2', adapter.downgradeNg2Component(Ng2));
 *
 * module.directive('ng1', function() {
 *   return {
 *      scope: { title: '=' },
 *      template: 'ng1[Hello {{title}}!](<span ng-transclude></span>)'
 *   };
 * });
 *
 *
 * @Component({
 *   selector: 'ng2',
 *   inputs: ['name'],
 *   template: 'ng2[<ng1 [title]="name">transclude</ng1>](<ng-content></ng-content>)',
 *   directives: [adapter.upgradeNg1Component('ng1')]
 * })
 * class Ng2 {
 * }
 *
 * document.body.innerHTML = '<ng2 name="World">project</ng2>';
 *
 * adapter.bootstrap(document.body, ['myExample']).ready(function() {
 *   expect(document.body.textContent).toEqual(
 *       "ng2[ng1[Hello World!](transclude)](project)");
 * });
 * ```
 *
 * @experimental
 */
var UpgradeAdapter = (function () {
    function UpgradeAdapter() {
        /* @internal */
        this.idPrefix = "NG2_UPGRADE_" + upgradeCount++ + "_";
        /* @internal */
        this.upgradedComponents = [];
        /* @internal */
        this.downgradedComponents = {};
        /* @internal */
        this.providers = [];
    }
    /**
     * Allows Angular v2 Component to be used from AngularJS v1.
     *
     * Use `downgradeNg2Component` to create an AngularJS v1 Directive Definition Factory from
     * Angular v2 Component. The adapter will bootstrap Angular v2 component from within the
     * AngularJS v1 template.
     *
     * ## Mental Model
     *
     * 1. The component is instantiated by being listed in AngularJS v1 template. This means that the
     *    host element is controlled by AngularJS v1, but the component's view will be controlled by
     *    Angular v2.
     * 2. Even thought the component is instantiated in AngularJS v1, it will be using Angular v2
     *    syntax. This has to be done, this way because we must follow Angular v2 components do not
     *    declare how the attributes should be interpreted.
     *
     * ## Supported Features
     *
     * - Bindings:
     *   - Attribute: `<comp name="World">`
     *   - Interpolation:  `<comp greeting="Hello {{name}}!">`
     *   - Expression:  `<comp [name]="username">`
     *   - Event:  `<comp (close)="doSomething()">`
     * - Content projection: yes
     *
     * ### Example
     *
     * ```
     * var adapter = new UpgradeAdapter();
     * var module = angular.module('myExample', []);
     * module.directive('greet', adapter.downgradeNg2Component(Greeter));
     *
     * @Component({
     *   selector: 'greet',
     *   template: '{{salutation}} {{name}}! - <ng-content></ng-content>'
     * })
     * class Greeter {
     *   @Input() salutation: string;
     *   @Input() name: string;
     * }
     *
     * document.body.innerHTML =
     *   'ng1 template: <greet salutation="Hello" [name]="world">text</greet>';
     *
     * adapter.bootstrap(document.body, ['myExample']).ready(function() {
     *   expect(document.body.textContent).toEqual("ng1 template: Hello world! - text");
     * });
     * ```
     */
    UpgradeAdapter.prototype.downgradeNg2Component = function (type) {
        this.upgradedComponents.push(type);
        var info = metadata_1.getComponentInfo(type);
        return ng1ComponentDirective(info, "" + this.idPrefix + info.selector + "_c");
    };
    /**
     * Allows AngularJS v1 Component to be used from Angular v2.
     *
     * Use `upgradeNg1Component` to create an Angular v2 component from AngularJS v1 Component
     * directive. The adapter will bootstrap AngularJS v1 component from within the Angular v2
     * template.
     *
     * ## Mental Model
     *
     * 1. The component is instantiated by being listed in Angular v2 template. This means that the
     *    host element is controlled by Angular v2, but the component's view will be controlled by
     *    AngularJS v1.
     *
     * ## Supported Features
     *
     * - Bindings:
     *   - Attribute: `<comp name="World">`
     *   - Interpolation:  `<comp greeting="Hello {{name}}!">`
     *   - Expression:  `<comp [name]="username">`
     *   - Event:  `<comp (close)="doSomething()">`
     * - Transclusion: yes
     * - Only some of the features of
     *   [Directive Definition Object](https://docs.angularjs.org/api/ng/service/$compile) are
     *   supported:
     *   - `compile`: not supported because the host element is owned by Angular v2, which does
     *     not allow modifying DOM structure during compilation.
     *   - `controller`: supported. (NOTE: injection of `$attrs` and `$transclude` is not supported.)
     *   - `controllerAs': supported.
     *   - `bindToController': supported.
     *   - `link': supported. (NOTE: only pre-link function is supported.)
     *   - `name': supported.
     *   - `priority': ignored.
     *   - `replace': not supported.
     *   - `require`: supported.
     *   - `restrict`: must be set to 'E'.
     *   - `scope`: supported.
     *   - `template`: supported.
     *   - `templateUrl`: supported.
     *   - `terminal`: ignored.
     *   - `transclude`: supported.
     *
     *
     * ### Example
     *
     * ```
     * var adapter = new UpgradeAdapter();
     * var module = angular.module('myExample', []);
     *
     * module.directive('greet', function() {
     *   return {
     *     scope: {salutation: '=', name: '=' },
     *     template: '{{salutation}} {{name}}! - <span ng-transclude></span>'
     *   };
     * });
     *
     * module.directive('ng2', adapter.downgradeNg2Component(Ng2));
     *
     * @Component({
     *   selector: 'ng2',
     *   template: 'ng2 template: <greet salutation="Hello" [name]="world">text</greet>'
     *   directives: [adapter.upgradeNg1Component('greet')]
     * })
     * class Ng2 {
     * }
     *
     * document.body.innerHTML = '<ng2></ng2>';
     *
     * adapter.bootstrap(document.body, ['myExample']).ready(function() {
     *   expect(document.body.textContent).toEqual("ng2 template: Hello world! - text");
     * });
     * ```
     */
    UpgradeAdapter.prototype.upgradeNg1Component = function (name) {
        if (this.downgradedComponents.hasOwnProperty(name)) {
            return this.downgradedComponents[name].type;
        }
        else {
            return (this.downgradedComponents[name] = new upgrade_ng1_adapter_1.UpgradeNg1ComponentAdapterBuilder(name)).type;
        }
    };
    /**
     * Bootstrap a hybrid AngularJS v1 / Angular v2 application.
     *
     * This `bootstrap` method is a direct replacement (takes same arguments) for AngularJS v1
     * [`bootstrap`](https://docs.angularjs.org/api/ng/function/angular.bootstrap) method. Unlike
     * AngularJS v1, this bootstrap is asynchronous.
     *
     * ### Example
     *
     * ```
     * var adapter = new UpgradeAdapter();
     * var module = angular.module('myExample', []);
     * module.directive('ng2', adapter.downgradeNg2Component(Ng2));
     *
     * module.directive('ng1', function() {
     *   return {
     *      scope: { title: '=' },
     *      template: 'ng1[Hello {{title}}!](<span ng-transclude></span>)'
     *   };
     * });
     *
     *
     * @Component({
     *   selector: 'ng2',
     *   inputs: ['name'],
     *   template: 'ng2[<ng1 [title]="name">transclude</ng1>](<ng-content></ng-content>)',
     *   directives: [adapter.upgradeNg1Component('ng1')]
     * })
     * class Ng2 {
     * }
     *
     * document.body.innerHTML = '<ng2 name="World">project</ng2>';
     *
     * adapter.bootstrap(document.body, ['myExample']).ready(function() {
     *   expect(document.body.textContent).toEqual(
     *       "ng2[ng1[Hello World!](transclude)](project)");
     * });
     * ```
     */
    UpgradeAdapter.prototype.bootstrap = function (element, modules, config) {
        var _this = this;
        var upgrade = new UpgradeAdapterRef();
        var ng1Injector = null;
        var platformRef = platform_browser_dynamic_1.browserDynamicPlatform();
        var providers = [
            { provide: constants_1.NG1_INJECTOR, useFactory: function () { return ng1Injector; } },
            { provide: constants_1.NG1_COMPILE, useFactory: function () { return ng1Injector.get(constants_1.NG1_COMPILE); } }, this.providers
        ];
        var DynamicModule = (function () {
            function DynamicModule() {
            }
            /** @nocollapse */
            DynamicModule.decorators = [
                { type: core_1.NgModule, args: [{ providers: providers, imports: [platform_browser_1.BrowserModule] },] },
            ];
            return DynamicModule;
        }());
        var compilerFactory = platformRef.injector.get(core_1.CompilerFactory);
        var moduleRef = core_1.bootstrapModuleFactory(compilerFactory.createCompiler().compileNgModuleSync(DynamicModule), platformRef);
        var boundCompiler = moduleRef.injector.get(core_1.Compiler);
        var applicationRef = moduleRef.injector.get(core_1.ApplicationRef);
        var injector = applicationRef.injector;
        var ngZone = injector.get(core_1.NgZone);
        var delayApplyExps = [];
        var original$applyFn;
        var rootScopePrototype;
        var rootScope;
        var componentFactoryRefMap = {};
        var ng1Module = angular.module(this.idPrefix, modules);
        var ng1BootstrapPromise = null;
        var ng1compilePromise = null;
        ng1Module.value(constants_1.NG2_INJECTOR, injector)
            .value(constants_1.NG2_ZONE, ngZone)
            .value(constants_1.NG2_COMPILER, boundCompiler)
            .value(constants_1.NG2_COMPONENT_FACTORY_REF_MAP, componentFactoryRefMap)
            .config([
            '$provide', '$injector',
            function (provide /** TODO #???? */, ng1Injector /** TODO #???? */) {
                provide.decorator(constants_1.NG1_ROOT_SCOPE, [
                    '$delegate',
                    function (rootScopeDelegate) {
                        rootScopePrototype = rootScopeDelegate.constructor.prototype;
                        if (rootScopePrototype.hasOwnProperty('$apply')) {
                            original$applyFn = rootScopePrototype.$apply;
                            rootScopePrototype.$apply = function (exp /** TODO #???? */) {
                                return delayApplyExps.push(exp);
                            };
                        }
                        else {
                            throw new Error('Failed to find \'$apply\' on \'$rootScope\'!');
                        }
                        return rootScope = rootScopeDelegate;
                    }
                ]);
                if (ng1Injector.has(constants_1.NG1_TESTABILITY)) {
                    provide.decorator(constants_1.NG1_TESTABILITY, [
                        '$delegate',
                        function (testabilityDelegate) {
                            var _this = this;
                            var ng2Testability = injector.get(core_1.Testability);
                            var origonalWhenStable = testabilityDelegate.whenStable;
                            var newWhenStable = function (callback) {
                                var whenStableContext = _this;
                                origonalWhenStable.call(_this, function () {
                                    if (ng2Testability.isStable()) {
                                        callback.apply(this, arguments);
                                    }
                                    else {
                                        ng2Testability.whenStable(newWhenStable.bind(whenStableContext, callback));
                                    }
                                });
                            };
                            testabilityDelegate.whenStable = newWhenStable;
                            return testabilityDelegate;
                        }
                    ]);
                }
            }
        ]);
        ng1compilePromise = new Promise(function (resolve, reject) {
            ng1Module.run([
                '$injector', '$rootScope',
                function (injector, rootScope) {
                    ng1Injector = injector;
                    ngZone.onMicrotaskEmpty.subscribe({
                        next: function (_ /** TODO #???? */) {
                            return ngZone.runOutsideAngular(function () { return rootScope.$evalAsync(); });
                        }
                    });
                    upgrade_ng1_adapter_1.UpgradeNg1ComponentAdapterBuilder.resolve(_this.downgradedComponents, injector)
                        .then(resolve, reject);
                }
            ]);
        });
        // Make sure resumeBootstrap() only exists if the current bootstrap is deferred
        var windowAngular = window['angular'];
        windowAngular.resumeBootstrap = undefined;
        angular.element(element).data(util_1.controllerKey(constants_1.NG2_INJECTOR), injector);
        ngZone.run(function () { angular.bootstrap(element, [_this.idPrefix], config); });
        ng1BootstrapPromise = new Promise(function (resolve, reject) {
            if (windowAngular.resumeBootstrap) {
                var originalResumeBootstrap = windowAngular.resumeBootstrap;
                windowAngular.resumeBootstrap = function () {
                    windowAngular.resumeBootstrap = originalResumeBootstrap;
                    windowAngular.resumeBootstrap.apply(this, arguments);
                    resolve();
                };
            }
            else {
                resolve();
            }
        });
        Promise
            .all([
            this.compileNg2Components(boundCompiler, componentFactoryRefMap), ng1BootstrapPromise,
            ng1compilePromise
        ])
            .then(function () {
            ngZone.run(function () {
                if (rootScopePrototype) {
                    rootScopePrototype.$apply = original$applyFn; // restore original $apply
                    while (delayApplyExps.length) {
                        rootScope.$apply(delayApplyExps.shift());
                    }
                    upgrade._bootstrapDone(applicationRef, ng1Injector);
                    rootScopePrototype = null;
                }
            });
        }, util_1.onError);
        return upgrade;
    };
    /**
     * Adds a provider to the top level environment of a hybrid AngularJS v1 / Angular v2 application.
     *
     * In hybrid AngularJS v1 / Angular v2 application, there is no one root Angular v2 component,
     * for this reason we provide an application global way of registering providers which is
     * consistent with single global injection in AngularJS v1.
     *
     * ### Example
     *
     * ```
     * class Greeter {
     *   greet(name) {
     *     alert('Hello ' + name + '!');
     *   }
     * }
     *
     * @Component({
     *   selector: 'app',
     *   template: ''
     * })
     * class App {
     *   constructor(greeter: Greeter) {
     *     this.greeter('World');
     *   }
     * }
     *
     * var adapter = new UpgradeAdapter();
     * adapter.addProvider(Greeter);
     *
     * var module = angular.module('myExample', []);
     * module.directive('app', adapter.downgradeNg2Component(App));
     *
     * document.body.innerHTML = '<app></app>'
     * adapter.bootstrap(document.body, ['myExample']);
     *```
     */
    UpgradeAdapter.prototype.addProvider = function (provider) { this.providers.push(provider); };
    /**
     * Allows AngularJS v1 service to be accessible from Angular v2.
     *
     *
     * ### Example
     *
     * ```
     * class Login { ... }
     * class Server { ... }
     *
     * @Injectable()
     * class Example {
     *   constructor(@Inject('server') server, login: Login) {
     *     ...
     *   }
     * }
     *
     * var module = angular.module('myExample', []);
     * module.service('server', Server);
     * module.service('login', Login);
     *
     * var adapter = new UpgradeAdapter();
     * adapter.upgradeNg1Provider('server');
     * adapter.upgradeNg1Provider('login', {asToken: Login});
     * adapter.addProvider(Example);
     *
     * adapter.bootstrap(document.body, ['myExample']).ready((ref) => {
     *   var example: Example = ref.ng2Injector.get(Example);
     * });
     *
     * ```
     */
    UpgradeAdapter.prototype.upgradeNg1Provider = function (name, options) {
        var token = options && options.asToken || name;
        this.providers.push({
            provide: token,
            useFactory: function (ng1Injector) { return ng1Injector.get(name); },
            deps: [constants_1.NG1_INJECTOR]
        });
    };
    /**
     * Allows Angular v2 service to be accessible from AngularJS v1.
     *
     *
     * ### Example
     *
     * ```
     * class Example {
     * }
     *
     * var adapter = new UpgradeAdapter();
     * adapter.addProvider(Example);
     *
     * var module = angular.module('myExample', []);
     * module.factory('example', adapter.downgradeNg2Provider(Example));
     *
     * adapter.bootstrap(document.body, ['myExample']).ready((ref) => {
     *   var example: Example = ref.ng1Injector.get('example');
     * });
     *
     * ```
     */
    UpgradeAdapter.prototype.downgradeNg2Provider = function (token) {
        var factory = function (injector) { return injector.get(token); };
        factory.$inject = [constants_1.NG2_INJECTOR];
        return factory;
    };
    /* @internal */
    UpgradeAdapter.prototype.compileNg2Components = function (compiler, componentFactoryRefMap) {
        var _this = this;
        var promises = [];
        var types = this.upgradedComponents;
        for (var i = 0; i < types.length; i++) {
            promises.push(compiler.compileComponentAsync(types[i]));
        }
        return Promise.all(promises).then(function (componentFactories) {
            var types = _this.upgradedComponents;
            for (var i = 0; i < componentFactories.length; i++) {
                componentFactoryRefMap[metadata_1.getComponentInfo(types[i]).selector] = componentFactories[i];
            }
            return componentFactoryRefMap;
        }, util_1.onError);
    };
    return UpgradeAdapter;
}());
exports.UpgradeAdapter = UpgradeAdapter;
function ng1ComponentDirective(info, idPrefix) {
    directiveFactory.$inject = [constants_1.NG1_INJECTOR, constants_1.NG2_COMPONENT_FACTORY_REF_MAP, constants_1.NG1_PARSE];
    function directiveFactory(ng1Injector, componentFactoryRefMap, parse) {
        var idCount = 0;
        return {
            restrict: 'E',
            require: constants_1.REQUIRE_INJECTOR,
            link: {
                post: function (scope, element, attrs, parentInjector, transclude) {
                    var componentFactory = componentFactoryRefMap[info.selector];
                    if (!componentFactory)
                        throw new Error('Expecting ComponentFactory for: ' + info.selector);
                    var domElement = element[0];
                    if (parentInjector === null) {
                        parentInjector = ng1Injector.get(constants_1.NG2_INJECTOR);
                    }
                    var facade = new downgrade_ng2_adapter_1.DowngradeNg2ComponentAdapter(idPrefix + (idCount++), info, element, attrs, scope, parentInjector, parse, componentFactory);
                    facade.setupInputs();
                    facade.bootstrapNg2();
                    facade.projectContent();
                    facade.setupOutputs();
                    facade.registerCleanup();
                }
            }
        };
    }
    return directiveFactory;
}
/**
 * Use `UgradeAdapterRef` to control a hybrid AngularJS v1 / Angular v2 application.
 *
 * @experimental
 */
var UpgradeAdapterRef = (function () {
    function UpgradeAdapterRef() {
        /* @internal */
        this._readyFn = null;
        this.ng1RootScope = null;
        this.ng1Injector = null;
        this.ng2ApplicationRef = null;
        this.ng2Injector = null;
    }
    /* @internal */
    UpgradeAdapterRef.prototype._bootstrapDone = function (applicationRef, ng1Injector) {
        this.ng2ApplicationRef = applicationRef;
        this.ng2Injector = applicationRef.injector;
        this.ng1Injector = ng1Injector;
        this.ng1RootScope = ng1Injector.get(constants_1.NG1_ROOT_SCOPE);
        this._readyFn && this._readyFn(this);
    };
    /**
     * Register a callback function which is notified upon successful hybrid AngularJS v1 / Angular v2
     * application has been bootstrapped.
     *
     * The `ready` callback function is invoked inside the Angular v2 zone, therefore it does not
     * require a call to `$apply()`.
     */
    UpgradeAdapterRef.prototype.ready = function (fn) { this._readyFn = fn; };
    /**
     * Dispose of running hybrid AngularJS v1 / Angular v2 application.
     */
    UpgradeAdapterRef.prototype.dispose = function () {
        this.ng1Injector.get(constants_1.NG1_ROOT_SCOPE).$destroy();
        this.ng2ApplicationRef.dispose();
    };
    return UpgradeAdapterRef;
}());
exports.UpgradeAdapterRef = UpgradeAdapterRef;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBncmFkZV9hZGFwdGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci91cGdyYWRlL3NyYy91cGdyYWRlX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUF3TixlQUFlLENBQUMsQ0FBQTtBQUN4TyxpQ0FBNEIsMkJBQTJCLENBQUMsQ0FBQTtBQUN4RCx5Q0FBcUMsbUNBQW1DLENBQUMsQ0FBQTtBQUV6RSxJQUFZLE9BQU8sV0FBTSxjQUFjLENBQUMsQ0FBQTtBQUN4QywwQkFBMkssYUFBYSxDQUFDLENBQUE7QUFDekwsc0NBQTJDLHlCQUF5QixDQUFDLENBQUE7QUFDckUseUJBQThDLFlBQVksQ0FBQyxDQUFBO0FBQzNELG9DQUFnRCx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3hFLHFCQUFxQyxRQUFRLENBQUMsQ0FBQTtBQUU5QyxJQUFJLFlBQVksR0FBVyxDQUFDLENBQUM7QUFFN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzRUc7QUFDSDtJQUFBO1FBQ0UsZUFBZTtRQUNQLGFBQVEsR0FBVyxpQkFBZSxZQUFZLEVBQUUsTUFBRyxDQUFDO1FBQzVELGVBQWU7UUFDUCx1QkFBa0IsR0FBVyxFQUFFLENBQUM7UUFDeEMsZUFBZTtRQUNQLHlCQUFvQixHQUF3RCxFQUFFLENBQUM7UUFDdkYsZUFBZTtRQUNQLGNBQVMsR0FBbUMsRUFBRSxDQUFDO0lBK2F6RCxDQUFDO0lBN2FDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnREc7SUFDSCw4Q0FBcUIsR0FBckIsVUFBc0IsSUFBVTtRQUM5QixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksSUFBSSxHQUFr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