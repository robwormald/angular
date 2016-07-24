/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var core_private_1 = require('../../core_private');
var compile_metadata_1 = require('../compile_metadata');
var lang_1 = require('../facade/lang');
var identifiers_1 = require('../identifiers');
var o = require('../output/output_ast');
function _enumExpression(classIdentifier, value) {
    if (lang_1.isBlank(value))
        return o.NULL_EXPR;
    var name = lang_1.resolveEnumToken(classIdentifier.runtime, value);
    return o.importExpr(new compile_metadata_1.CompileIdentifierMetadata({
        name: classIdentifier.name + "." + name,
        moduleUrl: classIdentifier.moduleUrl,
        runtime: value
    }));
}
var ViewTypeEnum = (function () {
    function ViewTypeEnum() {
    }
    ViewTypeEnum.fromValue = function (value) {
        return _enumExpression(identifiers_1.Identifiers.ViewType, value);
    };
    ViewTypeEnum.HOST = ViewTypeEnum.fromValue(core_private_1.ViewType.HOST);
    ViewTypeEnum.COMPONENT = ViewTypeEnum.fromValue(core_private_1.ViewType.COMPONENT);
    ViewTypeEnum.EMBEDDED = ViewTypeEnum.fromValue(core_private_1.ViewType.EMBEDDED);
    return ViewTypeEnum;
}());
exports.ViewTypeEnum = ViewTypeEnum;
var ViewEncapsulationEnum = (function () {
    function ViewEncapsulationEnum() {
    }
    ViewEncapsulationEnum.fromValue = function (value) {
        return _enumExpression(identifiers_1.Identifiers.ViewEncapsulation, value);
    };
    ViewEncapsulationEnum.Emulated = ViewEncapsulationEnum.fromValue(core_1.ViewEncapsulation.Emulated);
    ViewEncapsulationEnum.Native = ViewEncapsulationEnum.fromValue(core_1.ViewEncapsulation.Native);
    ViewEncapsulationEnum.None = ViewEncapsulationEnum.fromValue(core_1.ViewEncapsulation.None);
    return ViewEncapsulationEnum;
}());
exports.ViewEncapsulationEnum = ViewEncapsulationEnum;
var ChangeDetectionStrategyEnum = (function () {
    function ChangeDetectionStrategyEnum() {
    }
    ChangeDetectionStrategyEnum.fromValue = function (value) {
        return _enumExpression(identifiers_1.Identifiers.ChangeDetectionStrategy, value);
    };
    ChangeDetectionStrategyEnum.OnPush = ChangeDetectionStrategyEnum.fromValue(core_1.ChangeDetectionStrategy.OnPush);
    ChangeDetectionStrategyEnum.Default = ChangeDetectionStrategyEnum.fromValue(core_1.ChangeDetectionStrategy.Default);
    return ChangeDetectionStrategyEnum;
}());
exports.ChangeDetectionStrategyEnum = ChangeDetectionStrategyEnum;
var ChangeDetectorStatusEnum = (function () {
    function ChangeDetectorStatusEnum() {
    }
    ChangeDetectorStatusEnum.fromValue = function (value) {
        return _enumExpression(identifiers_1.Identifiers.ChangeDetectorStatus, value);
    };
    ChangeDetectorStatusEnum.CheckOnce = ChangeDetectorStatusEnum.fromValue(core_private_1.ChangeDetectorStatus.CheckOnce);
    ChangeDetectorStatusEnum.Checked = ChangeDetectorStatusEnum.fromValue(core_private_1.ChangeDetectorStatus.Checked);
    ChangeDetectorStatusEnum.CheckAlways = ChangeDetectorStatusEnum.fromValue(core_private_1.ChangeDetectorStatus.CheckAlways);
    ChangeDetectorStatusEnum.Detached = ChangeDetectorStatusEnum.fromValue(core_private_1.ChangeDetectorStatus.Detached);
    ChangeDetectorStatusEnum.Errored = ChangeDetectorStatusEnum.fromValue(core_private_1.ChangeDetectorStatus.Errored);
    ChangeDetectorStatusEnum.Destroyed = ChangeDetectorStatusEnum.fromValue(core_private_1.ChangeDetectorStatus.Destroyed);
    return ChangeDetectorStatusEnum;
}());
exports.ChangeDetectorStatusEnum = ChangeDetectorStatusEnum;
var ViewConstructorVars = (function () {
    function ViewConstructorVars() {
    }
    ViewConstructorVars.viewUtils = o.variable('viewUtils');
    ViewConstructorVars.parentInjector = o.variable('parentInjector');
    ViewConstructorVars.declarationEl = o.variable('declarationEl');
    return ViewConstructorVars;
}());
exports.ViewConstructorVars = ViewConstructorVars;
var ViewProperties = (function () {
    function ViewProperties() {
    }
    ViewProperties.renderer = o.THIS_EXPR.prop('renderer');
    ViewProperties.projectableNodes = o.THIS_EXPR.prop('projectableNodes');
    ViewProperties.viewUtils = o.THIS_EXPR.prop('viewUtils');
    return ViewProperties;
}());
exports.ViewProperties = ViewProperties;
var EventHandlerVars = (function () {
    function EventHandlerVars() {
    }
    EventHandlerVars.event = o.variable('$event');
    return EventHandlerVars;
}());
exports.EventHandlerVars = EventHandlerVars;
var InjectMethodVars = (function () {
    function InjectMethodVars() {
    }
    InjectMethodVars.token = o.variable('token');
    InjectMethodVars.requestNodeIndex = o.variable('requestNodeIndex');
    InjectMethodVars.notFoundResult = o.variable('notFoundResult');
    return InjectMethodVars;
}());
exports.InjectMethodVars = InjectMethodVars;
var DetectChangesVars = (function () {
    function DetectChangesVars() {
    }
    DetectChangesVars.throwOnChange = o.variable("throwOnChange");
    DetectChangesVars.changes = o.variable("changes");
    DetectChangesVars.changed = o.variable("changed");
    DetectChangesVars.valUnwrapper = o.variable("valUnwrapper");
    return DetectChangesVars;
}());
exports.DetectChangesVars = DetectChangesVars;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci9zcmMvdmlld19jb21waWxlci9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILHFCQUF5RCxlQUFlLENBQUMsQ0FBQTtBQUV6RSw2QkFBNkMsb0JBQW9CLENBQUMsQ0FBQTtBQUNsRSxpQ0FBd0MscUJBQXFCLENBQUMsQ0FBQTtBQUM5RCxxQkFBd0MsZ0JBQWdCLENBQUMsQ0FBQTtBQUN6RCw0QkFBMEIsZ0JBQWdCLENBQUMsQ0FBQTtBQUMzQyxJQUFZLENBQUMsV0FBTSxzQkFBc0IsQ0FBQyxDQUFBO0FBRTFDLHlCQUF5QixlQUEwQyxFQUFFLEtBQVU7SUFDN0UsRUFBRSxDQUFDLENBQUMsY0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDdkMsSUFBSSxJQUFJLEdBQUcsdUJBQWdCLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUM1RCxNQUFNLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLDRDQUF5QixDQUFDO1FBQ2hELElBQUksRUFBSyxlQUFlLENBQUMsSUFBSSxTQUFJLElBQU07UUFDdkMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxTQUFTO1FBQ3BDLE9BQU8sRUFBRSxLQUFLO0tBQ2YsQ0FBQyxDQUFDLENBQUM7QUFDTixDQUFDO0FBRUQ7SUFBQTtJQU9BLENBQUM7SUFOUSxzQkFBUyxHQUFoQixVQUFpQixLQUFlO1FBQzlCLE1BQU0sQ0FBQyxlQUFlLENBQUMseUJBQVcsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUNNLGlCQUFJLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyx1QkFBUSxDQUFDLElBQUksQ0FBQyxDQUFD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