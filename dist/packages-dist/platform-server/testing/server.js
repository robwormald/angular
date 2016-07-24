/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var compiler_1 = require('@angular/compiler');
var core_1 = require('@angular/core');
var testing_1 = require('@angular/core/testing');
var testing_2 = require('@angular/platform-browser-dynamic/testing');
var core_private_1 = require('../core_private');
var parse5_adapter_1 = require('../src/parse5_adapter');
function initServerTests() {
    parse5_adapter_1.Parse5DomAdapter.makeCurrent();
}
var SERVER_TEST_PLATFORM_PROVIDERS = 
/*@ts2dart_const*/ [
    core_1.PLATFORM_CORE_PROVIDERS,
    /*@ts2dart_Provider*/ { provide: core_1.PLATFORM_INITIALIZER, useValue: initServerTests, multi: true },
    { provide: core_1.CompilerFactory, useValue: testing_2.BROWSER_DYNAMIC_TEST_COMPILER_FACTORY },
];
/**
 * Platform for testing
 *
 * @experimental API related to bootstrapping are still under review.
 */
exports.serverTestPlatform = core_1.createPlatformFactory('serverTest', SERVER_TEST_PLATFORM_PROVIDERS);
var ServerTestModule = (function () {
    function ServerTestModule() {
    }
    /** @nocollapse */
    ServerTestModule.decorators = [
        { type: core_1.NgModule, args: [{ exports: [testing_2.BrowserDynamicTestModule] },] },
    ];
    return ServerTestModule;
}());
exports.ServerTestModule = ServerTestModule;
/**
 * @deprecated Use initTestEnvironment with serverTestPlatform instead.
 */
exports.TEST_SERVER_PLATFORM_PROVIDERS = 
// Note: This is not a real provider but a hack to still support the deprecated
// `setBaseTestProviders` method!
[function (appProviders) {
        var deprecatedConfiguration = compiler_1.analyzeAppProvidersForDeprecatedConfiguration(appProviders);
        var platformRef = core_1.createPlatform(core_1.ReflectiveInjector.resolveAndCreate([
            SERVER_TEST_PLATFORM_PROVIDERS, {
                provide: core_1.CompilerFactory,
                useValue: testing_2.BROWSER_DYNAMIC_TEST_COMPILER_FACTORY.withDefaults(deprecatedConfiguration.compilerOptions)
            }
        ]));
        var DynamicTestModule = (function () {
            function DynamicTestModule() {
            }
            /** @nocollapse */
            DynamicTestModule.decorators = [
                { type: core_1.NgModule, args: [{ exports: [ServerTestModule], declarations: [deprecatedConfiguration.moduleDeclarations] },] },
            ];
            return DynamicTestModule;
        }());
        var testInjector = testing_1.initTestEnvironment(DynamicTestModule, platformRef);
        var console = testInjector.get(core_private_1.Console);
        deprecatedConfiguration.deprecationMessages.forEach(function (msg) { return console.warn(msg); });
    }];
/**
 * @deprecated Use initTestEnvironment with ServerTestModule instead.
 */
exports.TEST_SERVER_APPLICATION_PROVIDERS = [];
//# sourceMappingURL=server.js.map