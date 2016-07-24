/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var exceptions_1 = require('../facade/exceptions');
var lang_1 = require('../facade/lang');
// asset:<package-name>/<realm>/<path-to-module>
var _ASSET_URL_RE = /asset:([^\/]+)\/([^\/]+)\/(.+)/g;
/**
 * Interface that defines how import statements should be generated.
 */
var ImportGenerator = (function () {
    function ImportGenerator() {
    }
    ImportGenerator.parseAssetUrl = function (url) { return AssetUrl.parse(url); };
    return ImportGenerator;
}());
exports.ImportGenerator = ImportGenerator;
var AssetUrl = (function () {
    function AssetUrl(packageName, firstLevelDir, modulePath) {
        this.packageName = packageName;
        this.firstLevelDir = firstLevelDir;
        this.modulePath = modulePath;
    }
    AssetUrl.parse = function (url, allowNonMatching) {
        if (allowNonMatching === void 0) { allowNonMatching = true; }
        var match = lang_1.RegExpWrapper.firstMatch(_ASSET_URL_RE, url);
        if (lang_1.isPresent(match)) {
            return new AssetUrl(match[1], match[2], match[3]);
        }
        if (allowNonMatching) {
            return null;
        }
        throw new exceptions_1.BaseException("Url " + url + " is not a valid asset: url");
    };
    return AssetUrl;
}());
exports.AssetUrl = AssetUrl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aF91dGlsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21waWxlci9zcmMvb3V0cHV0L3BhdGhfdXRpbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBSUgsMkJBQTRCLHNCQUFzQixDQUFDLENBQUE7QUFDbkQscUJBQXNELGdCQUFnQixDQUFDLENBQUE7QUFHdkUsZ0RBQWdEO0FBQ2hELElBQUksYUFBYSxHQUFHLGlDQUFpQyxDQUFDO0FBRXREOztHQUVHO0FBQ0g7SUFBQTtJQUlBLENBQUM7SUFIUSw2QkFBYSxHQUFwQixVQUFxQixHQUFXLElBQWMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRzdFLHNCQUFDO0FBQUQsQ0FBQyxBQUpELElBSUM7QUFKcUIsdUJBQWUsa0JBSXBDLENBQUE7QUFFRDtJQVlFLGtCQUFtQixXQUFtQixFQUFTLGFBQXFCLEVBQVMsVUFBa0I7UUFBNUUsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFBUyxrQkFBYSxHQUFiLGFBQWEsQ0FBUTtRQUFTLGVBQVUsR0FBVixVQUFVLENBQVE7SUFDL0YsQ0FBQztJQVpNLGNBQUssR0FBWixVQUFhLEdBQVcsRUFBRSxnQkFBZ0M7UUFBaEMsZ0NBQWdDLEdBQWhDLHVCQUFnQztRQUN4RCxJQUFJLEtBQUssR0FBRyxvQkFBYSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDekQsRUFBRSxDQUFDLENBQUMsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsTUFBTSxDQUFDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUNELE1BQU0sSUFBSSwwQkFBYSxDQUFDLFNBQU8sR0FBRywrQkFBNEIsQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFJSCxlQUFDO0FBQUQsQ0FBQyxBQWRELElBY0M7QUFkWSxnQkFBUSxXQWNwQixDQUFBIn0=