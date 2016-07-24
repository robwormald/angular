/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var di_1 = require('../di');
var lang_1 = require('../facade/lang');
var compiler_1 = require('./compiler');
var _SEPARATOR = '#';
var FACTORY_MODULE_SUFFIX = '.ngfactory';
var FACTORY_CLASS_SUFFIX = 'NgFactory';
var SystemJsNgModuleLoader = (function () {
    function SystemJsNgModuleLoader(_compiler) {
        this._compiler = _compiler;
    }
    SystemJsNgModuleLoader.prototype.load = function (path) {
        return this._compiler ? this.loadAndCompile(path) : this.loadFactory(path);
    };
    SystemJsNgModuleLoader.prototype.loadAndCompile = function (path) {
        var _this = this;
        var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
        if (exportName === undefined)
            exportName = 'default';
        return lang_1.global
            .System.import(module)
            .then(function (module) { return module[exportName]; })
            .then(function (type) { return checkNotEmpty(type, module, exportName); })
            .then(function (type) { return _this._compiler.compileNgModuleAsync(type); });
    };
    SystemJsNgModuleLoader.prototype.loadFactory = function (path) {
        var _a = path.split(_SEPARATOR), module = _a[0], exportName = _a[1];
        if (exportName === undefined)
            exportName = 'default';
        return lang_1.global
            .System.import(module + FACTORY_MODULE_SUFFIX)
            .then(function (module) { return module[exportName + FACTORY_CLASS_SUFFIX]; })
            .then(function (factory) { return checkNotEmpty(factory, module, exportName); });
    };
    /** @nocollapse */
    SystemJsNgModuleLoader.decorators = [
        { type: di_1.Injectable },
    ];
    /** @nocollapse */
    SystemJsNgModuleLoader.ctorParameters = [
        { type: compiler_1.Compiler, decorators: [{ type: di_1.Optional },] },
    ];
    return SystemJsNgModuleLoader;
}());
exports.SystemJsNgModuleLoader = SystemJsNgModuleLoader;
function checkNotEmpty(value, modulePath, exportName) {
    if (!value) {
        throw new Error("Cannot find '" + exportName + "' in '" + modulePath + "'");
    }
    return value;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3lzdGVtX2pzX25nX21vZHVsZV9mYWN0b3J5X2xvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29yZS9zcmMvbGlua2VyL3N5c3RlbV9qc19uZ19tb2R1bGVfZmFjdG9yeV9sb2FkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUdILG1CQUFtQyxPQUFPLENBQUMsQ0FBQTtBQUMzQyxxQkFBcUIsZ0JBQWdCLENBQUMsQ0FBQTtBQUV0Qyx5QkFBdUIsWUFBWSxDQUFDLENBQUE7QUFJcEMsSUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDO0FBRXZCLElBQU0scUJBQXFCLEdBQUcsWUFBWSxDQUFDO0FBQzNDLElBQU0sb0JBQW9CLEdBQUcsV0FBVyxDQUFDO0FBQ3pDO0lBQ0UsZ0NBQXFCLFNBQW1CO1FBQW5CLGNBQVMsR0FBVCxTQUFTLENBQVU7SUFBRyxDQUFDO0lBRTVDLHFDQUFJLEdBQUosVUFBSyxJQUFZO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdFLENBQUM7SUFFTywrQ0FBYyxHQUF0QixVQUF1QixJQUFZO1FBQW5DLGlCQVNDO1FBUkMsSUFBQSwyQkFBaUQsRUFBNUMsY0FBTSxFQUFFLGtCQUFVLENBQTJCO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUM7WUFBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO1FBRXJELE1BQU0sQ0FBTyxhQUFPO2FBQ2YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7YUFDckIsSUFBSSxDQUFDLFVBQUMsTUFBVyxJQUFLLE9BQUEsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFsQixDQUFrQixDQUFDO2FBQ3pDLElBQUksQ0FBQyxVQUFDLElBQVMsSUFBSyxPQUFBLGFBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsQ0FBQyxFQUF2QyxDQUF1QyxDQUFDO2FBQzVELElBQUksQ0FBQyxVQUFDLElBQVMsSUFBSyxPQUFBLEtBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEVBQXpDLENBQXlDLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRU8sNENBQVcsR0FBbkIsVUFBb0IsSUFBWTtRQUM5QixJQUFBLDJCQUFpRCxFQUE1QyxjQUFNLEVBQUUsa0JBQVUsQ0FBMkI7UUFDbEQsRUFBRSxDQUFDLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQztZQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7UUFFckQsTUFBTSxDQUFPLGFBQU87YUFDZixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQzthQUM3QyxJQUFJLENBQUMsVUFBQyxNQUFXLElBQUssT0FBQSxNQUFNLENBQUMsVUFBVSxHQUFHLG9CQUFvQixDQUFDLEVBQXpDLENBQXlDLENBQUM7YUFDaEUsSUFBSSxDQUFDLFVBQUMsT0FBWSxJQUFLLE9BQUEsYUFBYSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLEVBQTFDLENBQTBDLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsaUNBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsZUFBVSxFQUFFO0tBQ25CLENBQUM7SUFDRixrQkFBa0I7SUFDWCxxQ0FBYyxHQUEyRDtRQUNoRixFQUFDLElBQUksRUFBRSxtQkFBUSxFQUFFLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGFBQVEsRUFBRSxFQUFHLEVBQUM7S0FDbkQsQ0FBQztJQUNGLDZCQUFDO0FBQUQsQ0FBQyxBQW5DRCxJQW1DQztBQW5DWSw4QkFBc0IseUJBbUNsQyxDQUFBO0FBRUQsdUJBQXVCLEtBQVUsRUFBRSxVQUFrQixFQUFFLFVBQWtCO0lBQ3ZFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNYLE1BQU0sSUFBSSxLQUFLLENBQUMsa0JBQWdCLFVBQVUsY0FBUyxVQUFVLE1BQUcsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFDRCxNQUFNLENBQUMsS0FBSyxDQUFDO0FBQ2YsQ0FBQyJ9