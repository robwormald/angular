/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_private_1 = require('./core_private');
var StaticAndDynamicReflectionCapabilities = (function () {
    function StaticAndDynamicReflectionCapabilities(staticDelegate) {
        this.staticDelegate = staticDelegate;
        this.dynamicDelegate = new core_private_1.ReflectionCapabilities();
    }
    StaticAndDynamicReflectionCapabilities.install = function (staticDelegate) {
        core_private_1.reflector.updateCapabilities(new StaticAndDynamicReflectionCapabilities(staticDelegate));
    };
    StaticAndDynamicReflectionCapabilities.prototype.isReflectionEnabled = function () { return true; };
    StaticAndDynamicReflectionCapabilities.prototype.factory = function (type) { return this.dynamicDelegate.factory(type); };
    StaticAndDynamicReflectionCapabilities.prototype.interfaces = function (type) { return this.dynamicDelegate.interfaces(type); };
    StaticAndDynamicReflectionCapabilities.prototype.hasLifecycleHook = function (type, lcInterface, lcProperty) {
        return isStaticType(type) ?
            this.staticDelegate.hasLifecycleHook(type, lcInterface, lcProperty) :
            this.dynamicDelegate.hasLifecycleHook(type, lcInterface, lcProperty);
    };
    StaticAndDynamicReflectionCapabilities.prototype.parameters = function (type) {
        return isStaticType(type) ? this.staticDelegate.parameters(type) :
            this.dynamicDelegate.parameters(type);
    };
    StaticAndDynamicReflectionCapabilities.prototype.annotations = function (type) {
        return isStaticType(type) ? this.staticDelegate.annotations(type) :
            this.dynamicDelegate.annotations(type);
    };
    StaticAndDynamicReflectionCapabilities.prototype.propMetadata = function (typeOrFunc) {
        return isStaticType(typeOrFunc) ? this.staticDelegate.propMetadata(typeOrFunc) :
            this.dynamicDelegate.propMetadata(typeOrFunc);
    };
    StaticAndDynamicReflectionCapabilities.prototype.getter = function (name) { return this.dynamicDelegate.getter(name); };
    StaticAndDynamicReflectionCapabilities.prototype.setter = function (name) { return this.dynamicDelegate.setter(name); };
    StaticAndDynamicReflectionCapabilities.prototype.method = function (name) { return this.dynamicDelegate.method(name); };
    StaticAndDynamicReflectionCapabilities.prototype.importUri = function (type) { return this.staticDelegate.importUri(type); };
    return StaticAndDynamicReflectionCapabilities;
}());
exports.StaticAndDynamicReflectionCapabilities = StaticAndDynamicReflectionCapabilities;
function isStaticType(type) {
    return typeof type === 'object' && type.name && type.filePath;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljX3JlZmxlY3Rpb25fY2FwYWJpbGl0aWVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci1jbGkvc3JjL3N0YXRpY19yZWZsZWN0aW9uX2NhcGFiaWxpdGllcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgsNkJBQWdELGdCQUFnQixDQUFDLENBQUE7QUFHakU7SUFPRSxnREFBb0IsY0FBK0I7UUFBL0IsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBRjNDLG9CQUFlLEdBQUcsSUFBSSxxQ0FBc0IsRUFBRSxDQUFDO0lBRUQsQ0FBQztJQU5oRCw4Q0FBTyxHQUFkLFVBQWUsY0FBK0I7UUFDNUMsd0JBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLHNDQUFzQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQU1ELG9FQUFtQixHQUFuQixjQUFpQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQyx3REFBTyxHQUFQLFVBQVEsSUFBUyxJQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsMkRBQVUsR0FBVixVQUFXLElBQVMsSUFBVyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLGlFQUFnQixHQUFoQixVQUFpQixJQUFTLEVBQUUsV0FBeUIsRUFBRSxVQUFrQjtRQUN2RSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsVUFBVSxDQUFDO1lBQ25FLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBQ0QsMkRBQVUsR0FBVixVQUFXLElBQVM7UUFDbEIsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDcEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEUsQ0FBQztJQUNELDREQUFXLEdBQVgsVUFBWSxJQUFTO1FBQ25CLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3JFLENBQUM7SUFDRCw2REFBWSxHQUFaLFVBQWEsVUFBZTtRQUMxQixNQUFNLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQztZQUM1QyxJQUFJLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBQ0QsdURBQU0sR0FBTixVQUFPLElBQVksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xFLHVEQUFNLEdBQU4sVUFBTyxJQUFZLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRSx1REFBTSxHQUFOLFVBQU8sSUFBWSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsMERBQVMsR0FBVCxVQUFVLElBQVMsSUFBWSxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzlFLDZDQUFDO0FBQUQsQ0FBQyxBQWpDRCxJQWlDQztBQWpDWSw4Q0FBc0MseUNBaUNsRCxDQUFBO0FBRUQsc0JBQXNCLElBQVM7SUFDN0IsTUFBTSxDQUFDLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUM7QUFDaEUsQ0FBQyJ9