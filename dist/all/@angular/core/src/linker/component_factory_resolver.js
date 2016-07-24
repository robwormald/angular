/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
/**
 * @stable
 */
var NoComponentFactoryError = (function (_super) {
    __extends(NoComponentFactoryError, _super);
    function NoComponentFactoryError(component) {
        _super.call(this, "No component factory found for " + lang_1.stringify(component));
        this.component = component;
    }
    return NoComponentFactoryError;
}(exceptions_1.BaseException));
exports.NoComponentFactoryError = NoComponentFactoryError;
var _NullComponentFactoryResolver = (function () {
    function _NullComponentFactoryResolver() {
    }
    _NullComponentFactoryResolver.prototype.resolveComponentFactory = function (component) {
        throw new NoComponentFactoryError(component);
    };
    return _NullComponentFactoryResolver;
}());
/**
 * @stable
 */
var ComponentFactoryResolver = (function () {
    function ComponentFactoryResolver() {
    }
    ComponentFactoryResolver.NULL = new _NullComponentFactoryResolver();
    return ComponentFactoryResolver;
}());
exports.ComponentFactoryResolver = ComponentFactoryResolver;
var CodegenComponentFactoryResolver = (function () {
    function CodegenComponentFactoryResolver(factories, _parent) {
        this._parent = _parent;
        this._factories = new Map();
        for (var i = 0; i < factories.length; i++) {
            var factory = factories[i];
            this._factories.set(factory.componentType, factory);
        }
    }
    CodegenComponentFactoryResolver.prototype.resolveComponentFactory = function (component) {
        var result = this._factories.get(component);
        if (!result) {
            result = this._parent.resolveComponentFactory(component);
        }
        return result;
    };
    return CodegenComponentFactoryResolver;
}());
exports.CodegenComponentFactoryResolver = CodegenComponentFactoryResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50X2ZhY3RvcnlfcmVzb2x2ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvcmUvc3JjL2xpbmtlci9jb21wb25lbnRfZmFjdG9yeV9yZXNvbHZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7QUFFSCwyQkFBNEIsc0JBQXNCLENBQUMsQ0FBQTtBQUNuRCxxQkFBc0MsZ0JBQWdCLENBQUMsQ0FBQTtBQUd2RDs7R0FFRztBQUNIO0lBQTZDLDJDQUFhO0lBQ3hELGlDQUFtQixTQUFtQjtRQUNwQyxrQkFBTSxvQ0FBa0MsZ0JBQVMsQ0FBQyxTQUFTLENBQUcsQ0FBQyxDQUFDO1FBRC9DLGNBQVMsR0FBVCxTQUFTLENBQVU7SUFFdEMsQ0FBQztJQUNILDhCQUFDO0FBQUQsQ0FBQyxBQUpELENBQTZDLDBCQUFhLEdBSXpEO0FBSlksK0JBQXVCLDBCQUluQyxDQUFBO0FBRUQ7SUFBQTtJQUlBLENBQUM7SUFIQywrREFBdUIsR0FBdkIsVUFBMkIsU0FBb0M7UUFDN0QsTUFBTSxJQUFJLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDSCxvQ0FBQztBQUFELENBQUMsQUFKRCxJQUlDO0FBRUQ7O0dBRUc7QUFDSDtJQUFBO0lBR0EsQ0FBQztJQUZRLDZCQUFJLEdBQTZCLElBQUksNkJBQTZCLEVBQUUsQ0FBQztJQUU5RSwrQkFBQztBQUFELENBQUMsQUFIRCxJQUdDO0FBSHFCLGdDQUF3QiwyQkFHN0MsQ0FBQTtBQUVEO0lBR0UseUNBQVksU0FBa0MsRUFBVSxPQUFpQztRQUFqQyxZQUFPLEdBQVAsT0FBTyxDQUEwQjtRQUZqRixlQUFVLEdBQUcsSUFBSSxHQUFHLEVBQThCLENBQUM7UUFHekQsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDMUMsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDdEQsQ0FBQztJQUNILENBQUM7SUFFRCxpRUFBdUIsR0FBdkIsVUFBMkIsU0FBb0M7UUFDN0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDNUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUNELE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNILHNDQUFDO0FBQUQsQ0FBQyxBQWpCRCxJQWlCQztBQWpCWSx1Q0FBK0Isa0NBaUIzQyxDQUFBIn0=