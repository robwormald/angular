/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
// Public API for compiler
var compiler_1 = require('./linker/compiler');
exports.Compiler = compiler_1.Compiler;
exports.CompilerFactory = compiler_1.CompilerFactory;
exports.ComponentStillLoadingError = compiler_1.ComponentStillLoadingError;
var component_factory_1 = require('./linker/component_factory');
exports.ComponentFactory = component_factory_1.ComponentFactory;
exports.ComponentRef = component_factory_1.ComponentRef;
var component_factory_resolver_1 = require('./linker/component_factory_resolver');
exports.ComponentFactoryResolver = component_factory_resolver_1.ComponentFactoryResolver;
exports.NoComponentFactoryError = component_factory_resolver_1.NoComponentFactoryError;
var component_resolver_1 = require('./linker/component_resolver');
exports.ComponentResolver = component_resolver_1.ComponentResolver;
var dynamic_component_loader_1 = require('./linker/dynamic_component_loader');
exports.DynamicComponentLoader = dynamic_component_loader_1.DynamicComponentLoader;
var element_ref_1 = require('./linker/element_ref');
exports.ElementRef = element_ref_1.ElementRef;
var exceptions_1 = require('./linker/exceptions');
exports.ExpressionChangedAfterItHasBeenCheckedException = exceptions_1.ExpressionChangedAfterItHasBeenCheckedException;
var ng_module_factory_1 = require('./linker/ng_module_factory');
exports.NgModuleFactory = ng_module_factory_1.NgModuleFactory;
exports.NgModuleRef = ng_module_factory_1.NgModuleRef;
var ng_module_factory_loader_1 = require('./linker/ng_module_factory_loader');
exports.NgModuleFactoryLoader = ng_module_factory_loader_1.NgModuleFactoryLoader;
var query_list_1 = require('./linker/query_list');
exports.QueryList = query_list_1.QueryList;
var system_js_ng_module_factory_loader_1 = require('./linker/system_js_ng_module_factory_loader');
exports.SystemJsNgModuleLoader = system_js_ng_module_factory_loader_1.SystemJsNgModuleLoader;
var systemjs_component_resolver_1 = require('./linker/systemjs_component_resolver');
exports.SystemJsCmpFactoryResolver = systemjs_component_resolver_1.SystemJsCmpFactoryResolver;
exports.SystemJsComponentResolver = systemjs_component_resolver_1.SystemJsComponentResolver;
var template_ref_1 = require('./linker/template_ref');
exports.TemplateRef = template_ref_1.TemplateRef;
var view_container_ref_1 = require('./linker/view_container_ref');
exports.ViewContainerRef = view_container_ref_1.ViewContainerRef;
var view_ref_1 = require('./linker/view_ref');
exports.EmbeddedViewRef = view_ref_1.EmbeddedViewRef;
exports.ViewRef = view_ref_1.ViewRef;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3NyYy9saW5rZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILDBCQUEwQjtBQUMxQix5QkFBcUYsbUJBQW1CLENBQUM7QUFBakcsdUNBQVE7QUFBRSxxREFBZTtBQUFtQiwyRUFBcUQ7QUFDekcsa0NBQTZDLDRCQUE0QixDQUFDO0FBQWxFLGdFQUFnQjtBQUFFLHdEQUFnRDtBQUMxRSwyQ0FBZ0UscUNBQXFDLENBQUM7QUFBOUYseUZBQXdCO0FBQUUsdUZBQW9FO0FBQ3RHLG1DQUFnQyw2QkFBNkIsQ0FBQztBQUF0RCxtRUFBc0Q7QUFDOUQseUNBQXFDLG1DQUFtQyxDQUFDO0FBQWpFLG1GQUFpRTtBQUN6RSw0QkFBeUIsc0JBQXNCLENBQUM7QUFBeEMsOENBQXdDO0FBQ2hELDJCQUE4RCxxQkFBcUIsQ0FBQztBQUE1RSx1SEFBNEU7QUFDcEYsa0NBQTJDLDRCQUE0QixDQUFDO0FBQWhFLDhEQUFlO0FBQUUsc0RBQStDO0FBQ3hFLHlDQUFvQyxtQ0FBbUMsQ0FBQztBQUFoRSxpRkFBZ0U7QUFDeEUsMkJBQXdCLHFCQUFxQixDQUFDO0FBQXRDLDJDQUFzQztBQUM5QyxtREFBcUMsNkNBQTZDLENBQUM7QUFBM0UsNkZBQTJFO0FBQ25GLDRDQUFvRSxzQ0FBc0MsQ0FBQztBQUFuRyw4RkFBMEI7QUFBRSw0RkFBdUU7QUFDM0csNkJBQTBCLHVCQUF1QixDQUFDO0FBQTFDLGlEQUEwQztBQUNsRCxtQ0FBK0IsNkJBQTZCLENBQUM7QUFBckQsaUVBQXFEO0FBQzdELHlCQUF1QyxtQkFBbUIsQ0FBQztBQUFuRCxxREFBZTtBQUFFLHFDQUFrQyJ9