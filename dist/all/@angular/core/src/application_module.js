/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var application_ref_1 = require('./application_ref');
var application_tokens_1 = require('./application_tokens');
var change_detection_1 = require('./change_detection/change_detection');
var di_1 = require('./di');
var compiler_1 = require('./linker/compiler');
var component_factory_resolver_1 = require('./linker/component_factory_resolver');
var component_resolver_1 = require('./linker/component_resolver');
var dynamic_component_loader_1 = require('./linker/dynamic_component_loader');
var view_utils_1 = require('./linker/view_utils');
var metadata_1 = require('./metadata');
var ng_zone_1 = require('./zone/ng_zone');
var __unused; // avoid unused import when Type union types are erased
function _componentFactoryResolverFactory() {
    return component_factory_resolver_1.ComponentFactoryResolver.NULL;
}
exports._componentFactoryResolverFactory = _componentFactoryResolverFactory;
function _iterableDiffersFactory() {
    return change_detection_1.defaultIterableDiffers;
}
exports._iterableDiffersFactory = _iterableDiffersFactory;
function _keyValueDiffersFactory() {
    return change_detection_1.defaultKeyValueDiffers;
}
exports._keyValueDiffersFactory = _keyValueDiffersFactory;
function createNgZone(parent) {
    // If an NgZone is already present in the parent injector,
    // use that one. Creating the NgZone in the same injector as the
    // application is dangerous as some services might get created before
    // the NgZone has been created.
    // We keep the NgZone factory in the application providers for
    // backwards compatibility for now though.
    if (parent) {
        return parent;
    }
    return new ng_zone_1.NgZone({ enableLongStackTrace: application_ref_1.isDevMode() });
}
exports.createNgZone = createNgZone;
/**
 * A default set of providers which should be included in any Angular
 * application, regardless of the platform it runs onto.
 *
 * @deprecated Inlcude `ApplicationModule` instead.
 */
exports.APPLICATION_COMMON_PROVIDERS = [];
var ApplicationModule = (function () {
    function ApplicationModule() {
    }
    /** @nocollapse */
    ApplicationModule.decorators = [
        { type: metadata_1.NgModule, args: [{
                    providers: [
                        {
                            provide: ng_zone_1.NgZone,
                            useFactory: createNgZone,
                            deps: [[new di_1.SkipSelfMetadata(), new di_1.OptionalMetadata(), ng_zone_1.NgZone]]
                        },
                        application_ref_1.ApplicationRef_,
                        { provide: application_ref_1.ApplicationRef, useExisting: application_ref_1.ApplicationRef_ },
                        compiler_1.Compiler,
                        { provide: component_resolver_1.ComponentResolver, useExisting: compiler_1.Compiler },
                        { provide: component_factory_resolver_1.ComponentFactoryResolver, useFactory: _componentFactoryResolverFactory, deps: [] },
                        application_tokens_1.APP_ID_RANDOM_PROVIDER,
                        view_utils_1.ViewUtils,
                        { provide: change_detection_1.IterableDiffers, useFactory: _iterableDiffersFactory, deps: [] },
                        { provide: change_detection_1.KeyValueDiffers, useFactory: _keyValueDiffersFactory, deps: [] },
                        { provide: dynamic_component_loader_1.DynamicComponentLoader, useClass: dynamic_component_loader_1.DynamicComponentLoader_ },
                    ]
                },] },
    ];
    return ApplicationModule;
}());
exports.ApplicationModule = ApplicationModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwbGljYXRpb25fbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3NyYy9hcHBsaWNhdGlvbl9tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUlILGdDQUF5RCxtQkFBbUIsQ0FBQyxDQUFBO0FBQzdFLG1DQUFxQyxzQkFBc0IsQ0FBQyxDQUFBO0FBQzVELGlDQUErRixxQ0FBcUMsQ0FBQyxDQUFBO0FBQ3JJLG1CQUFpRCxNQUFNLENBQUMsQ0FBQTtBQUN4RCx5QkFBdUIsbUJBQW1CLENBQUMsQ0FBQTtBQUMzQywyQ0FBdUMscUNBQXFDLENBQUMsQ0FBQTtBQUM3RSxtQ0FBZ0MsNkJBQTZCLENBQUMsQ0FBQTtBQUM5RCx5Q0FBOEQsbUNBQW1DLENBQUMsQ0FBQTtBQUNsRywyQkFBd0IscUJBQXFCLENBQUMsQ0FBQTtBQUM5Qyx5QkFBdUIsWUFBWSxDQUFDLENBQUE7QUFDcEMsd0JBQXFCLGdCQUFnQixDQUFDLENBQUE7QUFFdEMsSUFBSSxRQUFjLENBQUMsQ0FBRSx1REFBdUQ7QUFFNUU7SUFDRSxNQUFNLENBQUMscURBQXdCLENBQUMsSUFBSSxDQUFDO0FBQ3ZDLENBQUM7QUFGZSx3Q0FBZ0MsbUNBRS9DLENBQUE7QUFFRDtJQUNFLE1BQU0sQ0FBQyx5Q0FBc0IsQ0FBQztBQUNoQyxDQUFDO0FBRmUsK0JBQXVCLDBCQUV0QyxDQUFBO0FBRUQ7SUFDRSxNQUFNLENBQUMseUNBQXNCLENBQUM7QUFDaEMsQ0FBQztBQUZlLCtCQUF1QiwwQkFFdEMsQ0FBQTtBQUVELHNCQUE2QixNQUFjO0lBQ3pDLDBEQUEwRDtJQUMxRCxnRUFBZ0U7SUFDaEUscUVBQXFFO0lBQ3JFLCtCQUErQjtJQUMvQiw4REFBOEQ7SUFDOUQsMENBQTBDO0lBQzFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDWCxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFDRCxNQUFNLENBQUMsSUFBSSxnQkFBTSxDQUFDLEVBQUMsb0JBQW9CLEVBQUUsMkJBQVMsRUFBRSxFQUFDLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBWGUsb0JBQVksZUFXM0IsQ0FBQTtBQUVEOzs7OztHQUtHO0FBQ1Usb0NBQTRCLEdBQXlDLEVBQUUsQ0FBQztBQUNyRjtJQUFBO0lBdUJBLENBQUM7SUF0QkQsa0JBQWtCO0lBQ1gsNEJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsbUJBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztvQkFDdkIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxnQkFBTTs0QkFDZixVQUFVLEVBQUUsWUFBWTs0QkFDeEIsSUFBSSxFQUFPLENBQUMsQ0FBQyxJQUFJLHFCQUFnQixFQUFFLEVBQUUsSUFBSSxxQkFBZ0IsRUFBRSxFQUFFLGdCQUFNLENBQUMsQ0FBQzt5QkFDdEU7d0JBQ0QsaUNBQWU7d0JBQ2YsRUFBQyxPQUFPLEVBQUUsZ0NBQWMsRUFBRSxXQUFXLEVBQUUsaUNBQWUsRUFBQzt3QkFDdkQsbUJBQVE7d0JBQ1IsRUFBQyxPQUFPLEVBQUUsc0NBQWlCLEVBQUUsV0FBVyxFQUFFLG1CQUFRLEVBQUM7d0JBQ25ELEVBQUMsT0FBTyxFQUFFLHFEQUF3QixFQUFFLFVBQVUsRUFBRSxnQ0FBZ0MsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFDO3dCQUMzRiwyQ0FBc0I7d0JBQ3RCLHNCQUFTO3dCQUNULEVBQUMsT0FBTyxFQUFFLGtDQUFlLEVBQUUsVUFBVSxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUM7d0JBQ3pFLEVBQUMsT0FBTyxFQUFFLGtDQUFlLEVBQUUsVUFBVSxFQUFFLHVCQUF1QixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUM7d0JBQ3pFLEVBQUMsT0FBTyxFQUFFLGlEQUFzQixFQUFFLFFBQVEsRUFBRSxrREFBdUIsRUFBQztxQkFDckU7aUJBQ0YsRUFBRyxFQUFFO0tBQ0wsQ0FBQztJQUNGLHdCQUFDO0FBQUQsQ0FBQyxBQXZCRCxJQXVCQztBQXZCWSx5QkFBaUIsb0JBdUI3QixDQUFBIn0=