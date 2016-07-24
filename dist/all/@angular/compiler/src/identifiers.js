/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../core_private');
var compile_metadata_1 = require('./compile_metadata');
var util_1 = require('./util');
var APP_VIEW_MODULE_URL = util_1.assetUrl('core', 'linker/view');
var VIEW_UTILS_MODULE_URL = util_1.assetUrl('core', 'linker/view_utils');
var CD_MODULE_URL = util_1.assetUrl('core', 'change_detection/change_detection');
// Reassign the imports to different variables so we can
// define static variables with the name of the import.
// (only needed for Dart).
var impViewUtils = core_private_1.ViewUtils;
var impAppView = core_private_1.AppView;
var impDebugAppView = core_private_1.DebugAppView;
var impDebugContext = core_private_1.DebugContext;
var impAppElement = core_private_1.AppElement;
var impElementRef = core_1.ElementRef;
var impViewContainerRef = core_1.ViewContainerRef;
var impChangeDetectorRef = core_1.ChangeDetectorRef;
var impRenderComponentType = core_1.RenderComponentType;
var impQueryList = core_1.QueryList;
var impTemplateRef = core_1.TemplateRef;
var impTemplateRef_ = core_private_1.TemplateRef_;
var impValueUnwrapper = core_private_1.ValueUnwrapper;
var impInjector = core_1.Injector;
var impViewEncapsulation = core_1.ViewEncapsulation;
var impViewType = core_private_1.ViewType;
var impChangeDetectionStrategy = core_1.ChangeDetectionStrategy;
var impStaticNodeDebugInfo = core_private_1.StaticNodeDebugInfo;
var impRenderer = core_1.Renderer;
var impSimpleChange = core_1.SimpleChange;
var impUNINITIALIZED = core_private_1.UNINITIALIZED;
var impChangeDetectorStatus = core_private_1.ChangeDetectorStatus;
var impFlattenNestedViewRenderNodes = core_private_1.flattenNestedViewRenderNodes;
var impDevModeEqual = core_private_1.devModeEqual;
var impInterpolate = core_private_1.interpolate;
var impCheckBinding = core_private_1.checkBinding;
var impCastByValue = core_private_1.castByValue;
var impEMPTY_ARRAY = core_private_1.EMPTY_ARRAY;
var impEMPTY_MAP = core_private_1.EMPTY_MAP;
var impAnimationGroupPlayer = core_private_1.AnimationGroupPlayer;
var impAnimationSequencePlayer = core_private_1.AnimationSequencePlayer;
var impAnimationKeyframe = core_private_1.AnimationKeyframe;
var impAnimationStyles = core_private_1.AnimationStyles;
var impNoOpAnimationPlayer = core_private_1.NoOpAnimationPlayer;
var ANIMATION_STYLE_UTIL_ASSET_URL = util_1.assetUrl('core', 'animation/animation_style_util');
var Identifiers = (function () {
    function Identifiers() {
    }
    Identifiers.ANALYZE_FOR_PRECOMPILE = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ANALYZE_FOR_PRECOMPILE',
        moduleUrl: util_1.assetUrl('core', 'metadata/di'),
        runtime: core_1.ANALYZE_FOR_PRECOMPILE
    });
    Identifiers.ViewUtils = new compile_metadata_1.CompileIdentifierMetadata({ name: 'ViewUtils', moduleUrl: util_1.assetUrl('core', 'linker/view_utils'), runtime: impViewUtils });
    Identifiers.AppView = new compile_metadata_1.CompileIdentifierMetadata({ name: 'AppView', moduleUrl: APP_VIEW_MODULE_URL, runtime: impAppView });
    Identifiers.DebugAppView = new compile_metadata_1.CompileIdentifierMetadata({ name: 'DebugAppView', moduleUrl: APP_VIEW_MODULE_URL, runtime: impDebugAppView });
    Identifiers.AppElement = new compile_metadata_1.CompileIdentifierMetadata({ name: 'AppElement', moduleUrl: util_1.assetUrl('core', 'linker/element'), runtime: impAppElement });
    Identifiers.ElementRef = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ElementRef',
        moduleUrl: util_1.assetUrl('core', 'linker/element_ref'),
        runtime: impElementRef
    });
    Identifiers.ViewContainerRef = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ViewContainerRef',
        moduleUrl: util_1.assetUrl('core', 'linker/view_container_ref'),
        runtime: impViewContainerRef
    });
    Identifiers.ChangeDetectorRef = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ChangeDetectorRef',
        moduleUrl: util_1.assetUrl('core', 'change_detection/change_detector_ref'),
        runtime: impChangeDetectorRef
    });
    Identifiers.RenderComponentType = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'RenderComponentType',
        moduleUrl: util_1.assetUrl('core', 'render/api'),
        runtime: impRenderComponentType
    });
    Identifiers.QueryList = new compile_metadata_1.CompileIdentifierMetadata({ name: 'QueryList', moduleUrl: util_1.assetUrl('core', 'linker/query_list'), runtime: impQueryList });
    Identifiers.TemplateRef = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'TemplateRef',
        moduleUrl: util_1.assetUrl('core', 'linker/template_ref'),
        runtime: impTemplateRef
    });
    Identifiers.TemplateRef_ = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'TemplateRef_',
        moduleUrl: util_1.assetUrl('core', 'linker/template_ref'),
        runtime: impTemplateRef_
    });
    Identifiers.CodegenComponentFactoryResolver = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'CodegenComponentFactoryResolver',
        moduleUrl: util_1.assetUrl('core', 'linker/component_factory_resolver'),
        runtime: core_private_1.CodegenComponentFactoryResolver
    });
    Identifiers.ComponentFactoryResolver = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ComponentFactoryResolver',
        moduleUrl: util_1.assetUrl('core', 'linker/component_factory_resolver'),
        runtime: core_1.ComponentFactoryResolver
    });
    Identifiers.ComponentFactory = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ComponentFactory',
        runtime: core_1.ComponentFactory,
        moduleUrl: util_1.assetUrl('core', 'linker/component_factory')
    });
    Identifiers.NgModuleFactory = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'NgModuleFactory',
        runtime: core_1.NgModuleFactory,
        moduleUrl: util_1.assetUrl('core', 'linker/ng_module_factory')
    });
    Identifiers.NgModuleInjector = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'NgModuleInjector',
        runtime: core_private_1.NgModuleInjector,
        moduleUrl: util_1.assetUrl('core', 'linker/ng_module_factory')
    });
    Identifiers.ValueUnwrapper = new compile_metadata_1.CompileIdentifierMetadata({ name: 'ValueUnwrapper', moduleUrl: CD_MODULE_URL, runtime: impValueUnwrapper });
    Identifiers.Injector = new compile_metadata_1.CompileIdentifierMetadata({ name: 'Injector', moduleUrl: util_1.assetUrl('core', 'di/injector'), runtime: impInjector });
    Identifiers.ViewEncapsulation = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ViewEncapsulation',
        moduleUrl: util_1.assetUrl('core', 'metadata/view'),
        runtime: impViewEncapsulation
    });
    Identifiers.ViewType = new compile_metadata_1.CompileIdentifierMetadata({ name: 'ViewType', moduleUrl: util_1.assetUrl('core', 'linker/view_type'), runtime: impViewType });
    Identifiers.ChangeDetectionStrategy = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'ChangeDetectionStrategy',
        moduleUrl: CD_MODULE_URL,
        runtime: impChangeDetectionStrategy
    });
    Identifiers.StaticNodeDebugInfo = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'StaticNodeDebugInfo',
        moduleUrl: util_1.assetUrl('core', 'linker/debug_context'),
        runtime: impStaticNodeDebugInfo
    });
    Identifiers.DebugContext = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'DebugContext',
        moduleUrl: util_1.assetUrl('core', 'linker/debug_context'),
        runtime: impDebugContext
    });
    Identifiers.Renderer = new compile_metadata_1.CompileIdentifierMetadata({ name: 'Renderer', moduleUrl: util_1.assetUrl('core', 'render/api'), runtime: impRenderer });
    Identifiers.SimpleChange = new compile_metadata_1.CompileIdentifierMetadata({ name: 'SimpleChange', moduleUrl: CD_MODULE_URL, runtime: impSimpleChange });
    Identifiers.UNINITIALIZED = new compile_metadata_1.CompileIdentifierMetadata({ name: 'UNINITIALIZED', moduleUrl: CD_MODULE_URL, runtime: impUNINITIALIZED });
    Identifiers.ChangeDetectorStatus = new compile_metadata_1.CompileIdentifierMetadata({ name: 'ChangeDetectorStatus', moduleUrl: CD_MODULE_URL, runtime: impChangeDetectorStatus });
    Identifiers.checkBinding = new compile_metadata_1.CompileIdentifierMetadata({ name: 'checkBinding', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impCheckBinding });
    Identifiers.flattenNestedViewRenderNodes = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'flattenNestedViewRenderNodes',
        moduleUrl: VIEW_UTILS_MODULE_URL,
        runtime: impFlattenNestedViewRenderNodes
    });
    Identifiers.devModeEqual = new compile_metadata_1.CompileIdentifierMetadata({ name: 'devModeEqual', moduleUrl: CD_MODULE_URL, runtime: impDevModeEqual });
    Identifiers.interpolate = new compile_metadata_1.CompileIdentifierMetadata({ name: 'interpolate', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impInterpolate });
    Identifiers.castByValue = new compile_metadata_1.CompileIdentifierMetadata({ name: 'castByValue', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impCastByValue });
    Identifiers.EMPTY_ARRAY = new compile_metadata_1.CompileIdentifierMetadata({ name: 'EMPTY_ARRAY', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impEMPTY_ARRAY });
    Identifiers.EMPTY_MAP = new compile_metadata_1.CompileIdentifierMetadata({ name: 'EMPTY_MAP', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: impEMPTY_MAP });
    Identifiers.pureProxies = [
        null,
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy1', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy1 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy2', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy2 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy3', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy3 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy4', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy4 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy5', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy5 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy6', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy6 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy7', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy7 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy8', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy8 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy9', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy9 }),
        new compile_metadata_1.CompileIdentifierMetadata({ name: 'pureProxy10', moduleUrl: VIEW_UTILS_MODULE_URL, runtime: core_private_1.pureProxy10 }),
    ];
    Identifiers.SecurityContext = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'SecurityContext',
        moduleUrl: util_1.assetUrl('core', 'security'),
        runtime: core_1.SecurityContext,
    });
    Identifiers.AnimationKeyframe = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'AnimationKeyframe',
        moduleUrl: util_1.assetUrl('core', 'animation/animation_keyframe'),
        runtime: impAnimationKeyframe
    });
    Identifiers.AnimationStyles = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'AnimationStyles',
        moduleUrl: util_1.assetUrl('core', 'animation/animation_styles'),
        runtime: impAnimationStyles
    });
    Identifiers.NoOpAnimationPlayer = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'NoOpAnimationPlayer',
        moduleUrl: util_1.assetUrl('core', 'animation/animation_player'),
        runtime: impNoOpAnimationPlayer
    });
    Identifiers.AnimationGroupPlayer = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'AnimationGroupPlayer',
        moduleUrl: util_1.assetUrl('core', 'animation/animation_group_player'),
        runtime: impAnimationGroupPlayer
    });
    Identifiers.AnimationSequencePlayer = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'AnimationSequencePlayer',
        moduleUrl: util_1.assetUrl('core', 'animation/animation_sequence_player'),
        runtime: impAnimationSequencePlayer
    });
    Identifiers.prepareFinalAnimationStyles = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'prepareFinalAnimationStyles',
        moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL,
        runtime: core_private_1.prepareFinalAnimationStyles
    });
    Identifiers.balanceAnimationKeyframes = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'balanceAnimationKeyframes',
        moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL,
        runtime: core_private_1.balanceAnimationKeyframes
    });
    Identifiers.clearStyles = new compile_metadata_1.CompileIdentifierMetadata({ name: 'clearStyles', moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL, runtime: core_private_1.clearStyles });
    Identifiers.renderStyles = new compile_metadata_1.CompileIdentifierMetadata({ name: 'renderStyles', moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL, runtime: core_private_1.renderStyles });
    Identifiers.collectAndResolveStyles = new compile_metadata_1.CompileIdentifierMetadata({
        name: 'collectAndResolveStyles',
        moduleUrl: ANIMATION_STYLE_UTIL_ASSET_URL,
        runtime: core_private_1.collectAndResolveStyles
    });
    return Identifiers;
}());
exports.Identifiers = Identifiers;
function identifierToken(identifier) {
    return new compile_metadata_1.CompileTokenMetadata({ identifier: identifier });
}
exports.identifierToken = identifierToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlbnRpZmllcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3NyYy9pZGVudGlmaWVycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQStSLGVBQWUsQ0FBQyxDQUFBO0FBRS9TLDZCQUE4NEIsaUJBQWlCLENBQUMsQ0FBQTtBQUVoNkIsaUNBQThELG9CQUFvQixDQUFDLENBQUE7QUFDbkYscUJBQXVCLFFBQVEsQ0FBQyxDQUFBO0FBRWhDLElBQUksbUJBQW1CLEdBQUcsZUFBUSxDQUFDLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQztBQUMxRCxJQUFJLHFCQUFxQixHQUFHLGVBQVEsQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUNsRSxJQUFJLGFBQWEsR0FBRyxlQUFRLENBQUMsTUFBTSxFQUFFLG1DQUFtQyxDQUFDLENBQUM7QUFFMUUsd0RBQXdEO0FBQ3hELHVEQUF1RDtBQUN2RCwwQkFBMEI7QUFDMUIsSUFBSSxZQUFZLEdBQUcsd0JBQVMsQ0FBQztBQUM3QixJQUFJLFVBQVUsR0FBRyxzQkFBTyxDQUFDO0FBQ3pCLElBQUksZUFBZSxHQUFHLDJCQUFZLENBQUM7QUFDbkMsSUFBSSxlQUFlLEdBQUcsMkJBQVksQ0FBQztBQUNuQyxJQUFJLGFBQWEsR0FBRyx5QkFBVSxDQUFDO0FBQy9CLElBQUksYUFBYSxHQUFHLGlCQUFVLENBQUM7QUFDL0IsSUFBSSxtQkFBbUIsR0FBRyx1QkFBZ0IsQ0FBQztBQUMzQyxJQUFJLG9CQUFvQixHQUFHLHdCQUFpQixDQUFDO0FBQzdDLElBQUksc0JBQXNCLEdBQUcsMEJBQW1CLENBQUM7QUFDakQsSUFBSSxZQUFZLEdBQUcsZ0JBQVMsQ0FBQztBQUM3QixJQUFJLGNBQWMsR0FBRyxrQkFBVyxDQUFDO0FBQ2pDLElBQUksZUFBZSxHQUFHLDJCQUFZLENBQUM7QUFDbkMsSUFB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