/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * Public Test Library for unit testing Angular2 Applications. Assumes that you are running
 * with Jasmine, Mocha, or a similar framework which exports a beforeEach function and
 * allows tests to be asynchronous by either returning a promise or using a 'done' parameter.
 */
var test_bed_1 = require('./test_bed');
var _global = (typeof window === 'undefined' ? global : window);
var testBed = test_bed_1.getTestBed();
// Reset the test providers before each test.
if (_global.beforeEach) {
    _global.beforeEach(function () { testBed.reset(); });
}
/**
 * Allows overriding default providers of the test injector,
 * which are defined in test_injector.js
 *
 * @stable
 */
function addProviders(providers) {
    if (!providers)
        return;
    try {
        testBed.configureModule({ providers: providers });
    }
    catch (e) {
        throw new Error('addProviders can\'t be called after the injector has been already created for this test. ' +
            'This is most likely because you\'ve already used the injector to inject a beforeEach or the ' +
            'current `it` function.');
    }
}
exports.addProviders = addProviders;
/**
 * Allows overriding default providers, directives, pipes, modules of the test injector,
 * which are defined in test_injector.js
 *
 * @stable
 */
function configureModule(moduleDef) {
    if (!moduleDef)
        return;
    try {
        testBed.configureModule(moduleDef);
    }
    catch (e) {
        throw new Error('configureModule can\'t be called after the injector has been already created for this test. ' +
            'This is most likely because you\'ve already used the injector to inject a beforeEach or the ' +
            'current `it` function.');
    }
}
exports.configureModule = configureModule;
/**
 * Allows overriding default compiler providers and settings
 * which are defined in test_injector.js
 *
 * @stable
 */
function configureCompiler(config) {
    if (!config)
        return;
    try {
        testBed.configureCompiler(config);
    }
    catch (e) {
        throw new Error('configureCompiler can\'t be called after the injector has been already created for this test. ' +
            'This is most likely because you\'ve already used the injector to inject a beforeEach or the ' +
            'current `it` function.');
    }
}
exports.configureCompiler = configureCompiler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS90ZXN0aW5nL3Rlc3RpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVIOzs7O0dBSUc7QUFFSCx5QkFBa0MsWUFBWSxDQUFDLENBQUE7QUFJL0MsSUFBSSxPQUFPLEdBQVEsQ0FBQyxPQUFPLE1BQU0sS0FBSyxXQUFXLEdBQUcsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0FBRXJFLElBQUksT0FBTyxHQUFZLHFCQUFVLEVBQUUsQ0FBQztBQUVwQyw2Q0FBNkM7QUFDN0MsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7SUFDdkIsT0FBTyxDQUFDLFVBQVUsQ0FBQyxjQUFRLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILHNCQUE2QixTQUFxQjtJQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUFDLE1BQU0sQ0FBQztJQUN2QixJQUFJLENBQUM7UUFDSCxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7SUFDbEQsQ0FBRTtJQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxNQUFNLElBQUksS0FBSyxDQUNYLDJGQUEyRjtZQUMzRiw4RkFBOEY7WUFDOUYsd0JBQXdCLENBQUMsQ0FBQztJQUNoQyxDQUFDO0FBQ0gsQ0FBQztBQVZlLG9CQUFZLGVBVTNCLENBQUE7QUFFRDs7Ozs7R0FLRztBQUNILHlCQUNJLFNBQXlGO0lBRTNGLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQUMsTUFBTSxDQUFDO0lBQ3ZCLElBQUksQ0FBQztRQUNILE9BQU8sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDckMsQ0FBRTtJQUFBLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxNQUFNLElBQUksS0FBSyxDQUNYLDhGQUE4RjtZQUM5Riw4RkFBOEY7WUFDOUYsd0JBQXdCLENBQUMsQ0FBQztJQUNoQyxDQUFDO0FBQ0gsQ0FBQztBQVplLHVCQUFlLGtCQVk5QixDQUFBO0FBRUQ7Ozs7O0dBS0c7QUFDSCwyQkFBa0MsTUFBNkM7SUFDN0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFBQyxNQUFNLENBQUM7SUFDcEIsSUFBSSxDQUFDO1FBQ0gsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BDLENBQUU7SUFBQSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ1gsTUFBTSxJQUFJLEtBQUssQ0FDWCxnR0FBZ0c7WUFDaEcsOEZBQThGO1lBQzlGLHdCQUF3QixDQUFDLENBQUM7SUFDaEMsQ0FBQztBQUNILENBQUM7QUFWZSx5QkFBaUIsb0JBVWhDLENBQUEifQ==