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
var compiler_1 = require('@angular/compiler');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var MyApp;
// #docregion url_resolver
var MyUrlResolver = (function (_super) {
    __extends(MyUrlResolver, _super);
    function MyUrlResolver() {
        _super.apply(this, arguments);
    }
    MyUrlResolver.prototype.resolve = function (baseUrl, url) {
        // Serve CSS files from a special CDN.
        if (url.substr(-4) === '.css') {
            return _super.prototype.resolve.call(this, 'http://cdn.myapp.com/css/', url);
        }
        return _super.prototype.resolve.call(this, baseUrl, url);
    };
    return MyUrlResolver;
}(compiler_1.UrlResolver));
platform_browser_dynamic_1.bootstrap(MyApp, [{ provide: compiler_1.UrlResolver, useClass: MyUrlResolver }]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9leGFtcGxlcy9jb21waWxlci90cy91cmxfcmVzb2x2ZXIvdXJsX3Jlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILHlCQUEwQixtQkFBbUIsQ0FBQyxDQUFBO0FBRTlDLHlDQUF3QixtQ0FBbUMsQ0FBQyxDQUFBO0FBRTVELElBQUksS0FBVSxDQUFDO0FBRWYsMEJBQTBCO0FBQzFCO0lBQTRCLGlDQUFXO0lBQXZDO1FBQTRCLDhCQUFXO0lBUXZDLENBQUM7SUFQQywrQkFBTyxHQUFQLFVBQVEsT0FBZSxFQUFFLEdBQVc7UUFDbEMsc0NBQXNDO1FBQ3RDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzlCLE1BQU0sQ0FBQyxnQkFBSyxDQUFDLE9BQU8sWUFBQywyQkFBMkIsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUN6RCxDQUFDO1FBQ0QsTUFBTSxDQUFDLGdCQUFLLENBQUMsT0FBTyxZQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBUkQsQ0FBNEIsc0JBQVcsR0FRdEM7QUFFRCxvQ0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFFLHNCQUFXLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBQyxDQUFDLENBQUMsQ0FBQyJ9