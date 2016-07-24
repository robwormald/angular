/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var lang_1 = require('../facade/lang');
var _DOM = null;
function getDOM() {
    return _DOM;
}
exports.getDOM = getDOM;
function setDOM(adapter) {
    _DOM = adapter;
}
exports.setDOM = setDOM;
function setRootDomAdapter(adapter) {
    if (lang_1.isBlank(_DOM)) {
        _DOM = adapter;
    }
}
exports.setRootDomAdapter = setRootDomAdapter;
/* tslint:disable:requireParameterType */
/**
 * Provides DOM operations in an environment-agnostic way.
 */
var DomAdapter = (function () {
    function DomAdapter() {
        this.xhrType = null;
    }
    /** @deprecated */
    DomAdapter.prototype.getXHR = function () { return this.xhrType; };
    Object.defineProperty(DomAdapter.prototype, "attrToPropMap", {
        /**
         * Maps attribute names to their corresponding property names for cases
         * where attribute name doesn't match property name.
         */
        get: function () { return this._attrToPropMap; },
        set: function (value) { this._attrToPropMap = value; },
        enumerable: true,
        configurable: true
    });
    ;
    ;
    return DomAdapter;
}());
exports.DomAdapter = DomAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvc3JjL2RvbS9kb21fYWRhcHRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQTRCLGdCQUFnQixDQUFDLENBQUE7QUFFN0MsSUFBSSxJQUFJLEdBQWUsSUFBSSxDQUFDO0FBRTVCO0lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNkLENBQUM7QUFGZSxjQUFNLFNBRXJCLENBQUE7QUFFRCxnQkFBdUIsT0FBbUI7SUFDeEMsSUFBSSxHQUFHLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBRmUsY0FBTSxTQUVyQixDQUFBO0FBRUQsMkJBQWtDLE9BQW1CO0lBQ25ELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBSSxHQUFHLE9BQU8sQ0FBQztJQUNqQixDQUFDO0FBQ0gsQ0FBQztBQUplLHlCQUFpQixvQkFJaEMsQ0FBQTtBQUVELHlDQUF5QztBQUN6Qzs7R0FFRztBQUNIO0lBQUE7UUFDUyxZQUFPLEdBQVMsSUFBSSxDQUFDO0lBNko5QixDQUFDO0lBbEpDLGtCQUFrQjtJQUNsQiwyQkFBTSxHQUFOLGNBQWlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQU12QyxzQkFBSSxxQ0FBYTtRQUpqQjs7O1dBR0c7YUFDSCxjQUErQyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7YUFDNUUsVUFBa0IsS0FBOEIsSUFBSSxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7OztPQUROOzs7SUEySTlFLGlCQUFDO0FBQUQsQ0FBQyxBQTlKRCxJQThKQztBQTlKcUIsa0JBQVUsYUE4Si9CLENBQUEifQ==