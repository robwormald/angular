/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var compiler_1 = require('@angular/compiler');
var url_resolver_1 = require('@angular/compiler/src/url_resolver');
var testing_1 = require('@angular/compiler/testing');
var xhr_mock_1 = require('@angular/compiler/testing/xhr_mock');
exports.TEST_COMPILER_PROVIDERS = [
    { provide: compiler_1.ElementSchemaRegistry, useValue: new testing_1.MockSchemaRegistry({}, {}) },
    { provide: compiler_1.XHR, useClass: xhr_mock_1.MockXHR },
    { provide: compiler_1.UrlResolver, useFactory: url_resolver_1.createUrlResolverWithoutPackagePrefix }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9iaW5kaW5ncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL21vZHVsZXMvQGFuZ3VsYXIvY29tcGlsZXIvdGVzdC90ZXN0X2JpbmRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCx5QkFBc0QsbUJBQW1CLENBQUMsQ0FBQTtBQUMxRSw2QkFBb0Qsb0NBQW9DLENBQUMsQ0FBQTtBQUN6Rix3QkFBaUMsMkJBQTJCLENBQUMsQ0FBQTtBQUM3RCx5QkFBc0Isb0NBQW9DLENBQUMsQ0FBQTtBQUVoRCwrQkFBdUIsR0FBVTtJQUMxQyxFQUFDLE9BQU8sRUFBRSxnQ0FBcUIsRUFBRSxRQUFRLEVBQUUsSUFBSSw0QkFBa0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUM7SUFDMUUsRUFBQyxPQUFPLEVBQUUsY0FBRyxFQUFFLFFBQVEsRUFBRSxrQkFBTyxFQUFDO0lBQ2pDLEVBQUMsT0FBTyxFQUFFLHNCQUFXLEVBQUUsVUFBVSxFQUFFLG9EQUFxQyxFQUFDO0NBQzFFLENBQUMifQ==