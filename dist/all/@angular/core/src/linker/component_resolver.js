/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
/**
 * Low-level service for loading {@link ComponentFactory}s, which
 * can later be used to create and render a Component instance.
 *
 * @deprecated Use {@link ComponentFactoryResolver} together with {@link
 * NgModule}.precompile}/{@link Component}.precompile or
 * {@link ANALYZE_FOR_PRECOMPILE} provider for dynamic component creation.
 * Use {@link NgModuleFactoryLoader} for lazy loading.
 */
var ComponentResolver = (function () {
    function ComponentResolver() {
    }
    ComponentResolver.DynamicCompilationDeprecationMsg = 'ComponentResolver is deprecated for dynamic compilation. Use ComponentFactoryResolver together with @NgModule/@Component.precompile or ANALYZE_FOR_PRECOMPILE provider instead. For runtime compile only, you can also use Compiler.compileComponentSync/Async.';
    ComponentResolver.LazyLoadingDeprecationMsg = 'ComponentResolver is deprecated for lazy loading. Use NgModuleFactoryLoader instead.';
    return ComponentResolver;
}());
exports.ComponentResolver = ComponentResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50X3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3NyYy9saW5rZXIvY29tcG9uZW50X3Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFLSDs7Ozs7Ozs7R0FRRztBQUNIO0lBQUE7SUFTQSxDQUFDO0lBUlEsa0RBQWdDLEdBQ25DLGlRQUFpUSxDQUFDO0lBQy9QLDJDQUF5QixHQUM1QixzRkFBc0YsQ0FBQztJQUs3Rix3QkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVHFCLHlCQUFpQixvQkFTdEMsQ0FBQSJ9