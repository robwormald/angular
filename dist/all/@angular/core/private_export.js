/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var animation_constants_1 = require('./src/animation/animation_constants');
var animation_group_player_1 = require('./src/animation/animation_group_player');
var animation_keyframe_1 = require('./src/animation/animation_keyframe');
var animation_player_1 = require('./src/animation/animation_player');
var animation_sequence_player_1 = require('./src/animation/animation_sequence_player');
var animationUtils = require('./src/animation/animation_style_util');
var animation_styles_1 = require('./src/animation/animation_styles');
var change_detection_util = require('./src/change_detection/change_detection_util');
var constants = require('./src/change_detection/constants');
var console = require('./src/console');
var debug = require('./src/debug/debug_renderer');
var provider_util = require('./src/di/provider_util');
var reflective_provider = require('./src/di/reflective_provider');
var component_factory_resolver = require('./src/linker/component_factory_resolver');
var debug_context = require('./src/linker/debug_context');
var element = require('./src/linker/element');
var ng_module_factory = require('./src/linker/ng_module_factory');
var template_ref = require('./src/linker/template_ref');
var view = require('./src/linker/view');
var view_type = require('./src/linker/view_type');
var view_utils = require('./src/linker/view_utils');
var lifecycle_hooks = require('./src/metadata/lifecycle_hooks');
var metadata_view = require('./src/metadata/view');
var wtf_init = require('./src/profile/wtf_init');
var reflection = require('./src/reflection/reflection');
var reflection_capabilities = require('./src/reflection/reflection_capabilities');
var reflector_reader = require('./src/reflection/reflector_reader');
var api = require('./src/render/api');
var decorators = require('./src/util/decorators');
exports.__core_private__ = {
    isDefaultChangeDetectionStrategy: constants.isDefaultChangeDetectionStrategy,
    ChangeDetectorStatus: constants.ChangeDetectorStatus,
    CHANGE_DETECTION_STRATEGY_VALUES: constants.CHANGE_DETECTION_STRATEGY_VALUES,
    constructDependencies: reflective_provider.constructDependencies,
    LifecycleHooks: lifecycle_hooks.LifecycleHooks,
    LIFECYCLE_HOOKS_VALUES: lifecycle_hooks.LIFECYCLE_HOOKS_VALUES,
    ReflectorReader: reflector_reader.ReflectorReader,
    CodegenComponentFactoryResolver: component_factory_resolver.CodegenComponentFactoryResolver,
    AppElement: element.AppElement,
    AppView: view.AppView,
    DebugAppView: view.DebugAppView,
    NgModuleInjector: ng_module_factory.NgModuleInjector,
    ViewType: view_type.ViewType,
    MAX_INTERPOLATION_VALUES: view_utils.MAX_INTERPOLATION_VALUES,
    checkBinding: view_utils.checkBinding,
    flattenNestedViewRenderNodes: view_utils.flattenNestedViewRenderNodes,
    interpolate: view_utils.interpolate,
    ViewUtils: view_utils.ViewUtils,
    VIEW_ENCAPSULATION_VALUES: metadata_view.VIEW_ENCAPSULATION_VALUES,
    DebugContext: debug_context.DebugContext,
    StaticNodeDebugInfo: debug_context.StaticNodeDebugInfo,
    devModeEqual: change_detection_util.devModeEqual,
    UNINITIALIZED: change_detection_util.UNINITIALIZED,
    ValueUnwrapper: change_detection_util.ValueUnwrapper,
    RenderDebugInfo: api.RenderDebugInfo,
    TemplateRef_: template_ref.TemplateRef_,
    wtfInit: wtf_init.wtfInit,
    ReflectionCapabilities: reflection_capabilities.ReflectionCapabilities,
    makeDecorator: decorators.makeDecorator,
    DebugDomRootRenderer: debug.DebugDomRootRenderer,
    createProvider: provider_util.createProvider,
    isProviderLiteral: provider_util.isProviderLiteral,
    EMPTY_ARRAY: view_utils.EMPTY_ARRAY,
    EMPTY_MAP: view_utils.EMPTY_MAP,
    pureProxy1: view_utils.pureProxy1,
    pureProxy2: view_utils.pureProxy2,
    pureProxy3: view_utils.pureProxy3,
    pureProxy4: view_utils.pureProxy4,
    pureProxy5: view_utils.pureProxy5,
    pureProxy6: view_utils.pureProxy6,
    pureProxy7: view_utils.pureProxy7,
    pureProxy8: view_utils.pureProxy8,
    pureProxy9: view_utils.pureProxy9,
    pureProxy10: view_utils.pureProxy10,
    castByValue: view_utils.castByValue,
    Console: console.Console,
    reflector: reflection.reflector,
    Reflector: reflection.Reflector,
    NoOpAnimationPlayer: animation_player_1.NoOpAnimationPlayer,
    AnimationPlayer: animation_player_1.AnimationPlayer,
    AnimationSequencePlayer: animation_sequence_player_1.AnimationSequencePlayer,
    AnimationGroupPlayer: animation_group_player_1.AnimationGroupPlayer,
    AnimationKeyframe: animation_keyframe_1.AnimationKeyframe,
    prepareFinalAnimationStyles: animationUtils.prepareFinalAnimationStyles,
    balanceAnimationKeyframes: animationUtils.balanceAnimationKeyframes,
    flattenStyles: animationUtils.flattenStyles,
    clearStyles: animationUtils.clearStyles,
    renderStyles: animationUtils.renderStyles,
    collectAndResolveStyles: animationUtils.collectAndResolveStyles,
    AnimationStyles: animation_styles_1.AnimationStyles,
    ANY_STATE: animation_constants_1.ANY_STATE,
    DEFAULT_STATE: animation_constants_1.DEFAULT_STATE,
    EMPTY_STATE: animation_constants_1.EMPTY_STATE,
    FILL_STYLE_FLAG: animation_constants_1.FILL_STYLE_FLAG
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpdmF0ZV9leHBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvcHJpdmF0ZV9leHBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUdILG9DQUF5SSxxQ0FBcUMsQ0FBQyxDQUFBO0FBQy9LLHVDQUE0RCx3Q0FBd0MsQ0FBQyxDQUFBO0FBQ3JHLG1DQUFzRCxvQ0FBb0MsQ0FBQyxDQUFBO0FBQzNGLGlDQUErRixrQ0FBa0MsQ0FBQyxDQUFBO0FBQ2xJLDBDQUFrRSwyQ0FBMkMsQ0FBQyxDQUFBO0FBQzlHLElBQVksY0FBYyxXQUFNLHNDQUFzQyxDQUFDLENBQUE7QUFDdkUsaUNBQWtELGtDQUFrQyxDQUFDLENBQUE7QUFDckYsSUFBWSxxQkFBcUIsV0FBTSw4Q0FBOEMsQ0FBQyxDQUFBO0FBQ3RGLElBQVksU0FBUyxXQUFNLGtDQUFrQyxDQUFDLENBQUE7QUFDOUQsSUFBWSxPQUFPLFdBQU0sZUFBZSxDQUFDLENBQUE7QUFDekMsSUFBWSxLQUFLLFdBQU0sNEJBQTRCLENBQUMsQ0FBQTtBQUNwRCxJQUFZLGFBQWEsV0FBTSx3QkFBd0IsQ0FBQyxDQUFBO0FBQ3hELElBQVksbUJBQW1CLFdBQU0sOEJBQThCLENBQUMsQ0FBQTtBQUNwRSxJQUFZLDBCQUEwQixXQUFNLHlDQUF5QyxDQUFDLENBQUE7QUFFdEYsSUFBWSxhQUFhLFdBQU0sNEJBQTRCLENBQUMsQ0FBQTtBQUM1RCxJQUFZLE9BQU8sV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBQ2hELElBQVksaUJBQWlCLFdBQU0sZ0NBQWdDLENBQUMsQ0FBQTtBQUNwRSxJQUFZLFlBQVksV0FBTSwyQkFBMkIsQ0FBQyxDQUFBO0FBQzFELElBQVksSUFBSSxXQUFNLG1CQUFtQixDQUFDLENBQUE7QUFDMUMsSUFBWSxTQUFTLFdBQU0sd0JBQXdCLENBQUMsQ0FBQTtBQUNwRCxJQUFZLFVBQVUsV0FBTSx5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