/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
var path_util_1 = require('./path_util');
var _PATH_SEP = '/';
var _PATH_SEP_RE = /\//g;
var DartImportGenerator = (function () {
    function DartImportGenerator() {
    }
    DartImportGenerator.prototype.getImportPath = function (moduleUrlStr, importedUrlStr) {
        var moduleUrl = path_util_1.AssetUrl.parse(moduleUrlStr, false);
        var importedUrl = path_util_1.AssetUrl.parse(importedUrlStr, true);
        if (lang_1.isBlank(importedUrl)) {
            return importedUrlStr;
        }
        // Try to create a relative path first
        if (moduleUrl.firstLevelDir == importedUrl.firstLevelDir &&
            moduleUrl.packageName == importedUrl.packageName) {
            return getRelativePath(moduleUrl.modulePath, importedUrl.modulePath);
        }
        else if (importedUrl.firstLevelDir == 'lib') {
            return "package:" + importedUrl.packageName + "/" + importedUrl.modulePath;
        }
        throw new exceptions_1.BaseException("Can't import url " + importedUrlStr + " from " + moduleUrlStr);
    };
    /** @nocollapse */
    DartImportGenerator.decorators = [
        { type: core_1.Injectable },
    ];
    return DartImportGenerator;
}());
exports.DartImportGenerator = DartImportGenerator;
function getRelativePath(modulePath, importedPath) {
    var moduleParts = modulePath.split(_PATH_SEP_RE);
    var importedParts = importedPath.split(_PATH_SEP_RE);
    var longestPrefix = getLongestPathSegmentPrefix(moduleParts, importedParts);
    var resultParts = [];
    var goParentCount = moduleParts.length - 1 - longestPrefix;
    for (var i = 0; i < goParentCount; i++) {
        resultParts.push('..');
    }
    for (var i = longestPrefix; i < importedParts.length; i++) {
        resultParts.push(importedParts[i]);
    }
    return resultParts.join(_PATH_SEP);
}
exports.getRelativePath = getRelativePath;
function getLongestPathSegmentPrefix(arr1, arr2) {
    var prefixSize = 0;
    var minLen = lang_1.Math.min(arr1.length, arr2.length);
    while (prefixSize < minLen && arr1[prefixSize] == arr2[prefixSize]) {
        prefixSize++;
    }
    return prefixSize;
}
exports.getLongestPathSegmentPrefix = getLongestPathSegmentPrefix;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFydF9pbXBvcnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci9zcmMvb3V0cHV0L2RhcnRfaW1wb3J0cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQXlCLGVBQWUsQ0FBQyxDQUFBO0FBRXpDLDJCQUE0QixzQkFBc0IsQ0FBQyxDQUFBO0FBQ25ELHFCQUFzRCxnQkFBZ0IsQ0FBQyxDQUFBO0FBRXZFLDBCQUF3QyxhQUFhLENBQUMsQ0FBQTtBQUV0RCxJQUFJLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFDcEIsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDO0FBQ3pCO0lBQUE7SUFvQkEsQ0FBQztJQW5CQywyQ0FBYSxHQUFiLFVBQWMsWUFBb0IsRUFBRSxjQUFzQjtRQUN4RCxJQUFJLFNBQVMsR0FBRyxvQkFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDcEQsSUFBSSxXQUFXLEdBQUcsb0JBQVEsQ0FBQyxLQUFLLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZELEVBQUUsQ0FBQyxDQUFDLGNBQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUN4QixDQUFDO1FBQ0Qsc0NBQXNDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxhQUFhLElBQUksV0FBVyxDQUFDLGFBQWE7WUFDcEQsU0FBUyxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNyRCxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxhQUFXLFdBQVcsQ0FBQyxXQUFXLFNBQUksV0FBVyxDQUFDLFVBQVksQ0FBQztRQUN4RSxDQUFDO1FBQ0QsTUFBTSxJQUFJLDBCQUFhLENBQUMsc0JBQW9CLGNBQWMsY0FBUyxZQUFjLENBQUMsQ0FBQztJQUNyRixDQUFDO0lBQ0gsa0JBQWtCO0lBQ1gsOEJBQVUsR0FBMEI7UUFDM0MsRUFBRSxJQUFJLEVBQUUsaUJBQVUsRUFBRTtLQUNuQixDQUFDO0lBQ0YsMEJBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDO0FBcEJZLDJCQUFtQixzQkFvQi9CLENBQUE7QUFFRCx5QkFBZ0MsVUFBa0IsRUFBRSxZQUFvQjtJQUN0RSxJQUFJLFdBQVcsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ2pELElBQUksYUFBYSxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDckQsSUFBSSxhQUFhLEdBQUcsMkJBQTJCLENBQUMsV0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRTVFLElBQUksV0FBVyxHQUE0QixFQUFFLENBQUM7SUFDOUMsSUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDO0lBQzNELEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDdkMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBQ0QsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsYUFBYSxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDMUQsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQWRlLHVCQUFlLGtCQWM5QixDQUFBO0FBRUQscUNBQTRDLElBQWMsRUFBRSxJQUFjO0lBQ3hFLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNuQixJQUFJLE1BQU0sR0FBRyxXQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2hELE9BQU8sVUFBVSxHQUFHLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUM7UUFDbkUsVUFBVSxFQUFFLENBQUM7SUFDZixDQUFDO0lBQ0QsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUNwQixDQUFDO0FBUGUsbUNBQTJCLDhCQU8xQyxDQUFBIn0=