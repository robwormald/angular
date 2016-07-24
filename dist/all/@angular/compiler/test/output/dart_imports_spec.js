/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var dart_imports_1 = require('@angular/compiler/src/output/dart_imports');
function main() {
    testing_internal_1.describe('DartImportGenerator', function () {
        testing_internal_1.describe('getImportPath', function () {
            var generator;
            testing_internal_1.beforeEach(function () { generator = new dart_imports_1.DartImportGenerator(); });
            testing_internal_1.it('should calculate relative paths Dart', function () {
                testing_internal_1.expect(generator.getImportPath('asset:somePkg/lib/modPath', 'asset:somePkg/lib/impPath'))
                    .toEqual('impPath');
            });
            testing_internal_1.it('should calculate relative paths for different constellations', function () {
                testing_internal_1.expect(generator.getImportPath('asset:somePkg/test/modPath', 'asset:somePkg/test/impPath'))
                    .toEqual('impPath');
                testing_internal_1.expect(generator.getImportPath('asset:somePkg/lib/modPath', 'asset:somePkg/lib/dir2/impPath'))
                    .toEqual('dir2/impPath');
                testing_internal_1.expect(generator.getImportPath('asset:somePkg/lib/dir1/modPath', 'asset:somePkg/lib/impPath'))
                    .toEqual('../impPath');
                testing_internal_1.expect(generator.getImportPath('asset:somePkg/lib/dir1/modPath', 'asset:somePkg/lib/dir2/impPath'))
                    .toEqual('../dir2/impPath');
            });
            testing_internal_1.it('should calculate absolute paths', function () {
                testing_internal_1.expect(generator.getImportPath('asset:somePkg/lib/modPath', 'asset:someOtherPkg/lib/impPath'))
                    .toEqual('package:someOtherPkg/impPath');
            });
            testing_internal_1.it('should not allow absolute imports of non lib modules', function () {
                testing_internal_1.expect(function () {
                    return generator.getImportPath('asset:somePkg/lib/modPath', 'asset:somePkg/test/impPath');
                })
                    .toThrowError("Can't import url asset:somePkg/test/impPath from asset:somePkg/lib/modPath");
            });
            testing_internal_1.it('should not allow non asset urls as base url', function () {
                testing_internal_1.expect(function () { return generator.getImportPath('http:somePkg/lib/modPath', 'asset:somePkg/test/impPath'); })
                    .toThrowError("Url http:somePkg/lib/modPath is not a valid asset: url");
            });
            testing_internal_1.it('should allow non asset urls as import urls and pass them through', function () {
                testing_internal_1.expect(generator.getImportPath('asset:somePkg/lib/modPath', 'dart:html'))
                    .toEqual('dart:html');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFydF9pbXBvcnRzX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3Qvb3V0cHV0L2RhcnRfaW1wb3J0c19zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7QUFFSCxpQ0FBNkUsd0NBQXdDLENBQUMsQ0FBQTtBQUV0SCw2QkFBa0MsMkNBQTJDLENBQUMsQ0FBQTtBQUU5RTtJQUNFLDJCQUFRLENBQUMscUJBQXFCLEVBQUU7UUFDOUIsMkJBQVEsQ0FBQyxlQUFlLEVBQUU7WUFDeEIsSUFBSSxTQUE4QixDQUFDO1lBQ25DLDZCQUFVLENBQUMsY0FBUSxTQUFTLEdBQUcsSUFBSSxrQ0FBbUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFN0QscUJBQUUsQ0FBQyxzQ0FBc0MsRUFBRTtnQkFDekMseUJBQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLDJCQUEyQixFQUFFLDJCQUEyQixDQUFDLENBQUM7cUJBQ3BGLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxQixDQUFDLENBQUMsQ0FBQztZQUVILHFCQUFFLENBQUMsOERBQThELEVBQUU7Z0JBQ2pFLHlCQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyw0QkFBNEIsRUFBRSw0QkFBNEIsQ0FBQyxDQUFDO3FCQUN0RixPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3hCLHlCQUFNLENBQ0YsU0FBUyxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsRUFBRSxnQ0FBZ0MsQ0FBQyxDQUFDO3FCQUN0RixPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQzdCLHlCQUFNLENBQ0YsU0FBUyxDQUFDLGFBQWEsQ0FBQyxnQ0FBZ0MsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO3FCQUN0RixPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzNCLHlCQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FDbkIsZ0NBQWdDLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztxQkFDMUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLGlDQUFpQyxFQUFFO2dCQUNwQyx5QkFBTSxDQUNGLFNBQVMsQ0FBQyxhQUFhLENBQUMsMkJBQTJCLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQztxQkFDdEYsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7WUFDL0MsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLHNEQUFzRCxFQUFFO2dCQUN6RCx5QkFBTSxDQUNGO29CQUNJLE9BQUEsU0FBUyxDQUFDLGFBQWEsQ0FBQywyQkFBMkIsRUFBRSw0QkFBNEIsQ0FBQztnQkFBbEYsQ0FBa0YsQ0FBQztxQkFDdEYsWUFBWSxDQUNULDRFQUE0RSxDQUFDLENBQUM7WUFDeEYsQ0FBQyxDQUFDLENBQUM7WUFFSCxxQkFBRSxDQUFDLDZDQUE2QyxFQUFFO2dCQUNoRCx5QkFBTSxDQUNGLGNBQU0sT0FBQSxTQUFTLENBQUMsYUFBYSxDQUFDLDBCQUEwQixFQUFFLDRCQUE0QixDQUFDLEVBQWpGLENBQWlGLENBQUM7cUJBQ3ZGLFlBQVksQ0FBQyx3REFBd0QsQ0FBQyxDQUFDO1lBQzlFLENBQUMsQ0FBQyxDQUFDO1lBRUgscUJBQUUsQ0FBQyxrRUFBa0UsRUFBRTtnQkFDckUseUJBQU0sQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLDJCQUEyQixFQUFFLFdBQVcsQ0FBQyxDQUFDO3FCQUNwRSxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQW5EZSxZQUFJLE9BbURuQixDQUFBIn0=