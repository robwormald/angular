/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var url_resolver_1 = require('@angular/compiler/src/url_resolver');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var lang_1 = require('../src/facade/lang');
function main() {
    testing_internal_1.describe('UrlResolver', function () {
        var resolver = new url_resolver_1.UrlResolver();
        testing_internal_1.describe('absolute base url', function () {
            testing_internal_1.it('should add a relative path to the base url', function () {
                testing_internal_1.expect(resolver.resolve('http://www.foo.com', 'bar')).toEqual('http://www.foo.com/bar');
                testing_internal_1.expect(resolver.resolve('http://www.foo.com/', 'bar')).toEqual('http://www.foo.com/bar');
                testing_internal_1.expect(resolver.resolve('http://www.foo.com', './bar')).toEqual('http://www.foo.com/bar');
                testing_internal_1.expect(resolver.resolve('http://www.foo.com/', './bar')).toEqual('http://www.foo.com/bar');
            });
            testing_internal_1.it('should replace the base path', function () {
                testing_internal_1.expect(resolver.resolve('http://www.foo.com/baz', 'bar')).toEqual('http://www.foo.com/bar');
                testing_internal_1.expect(resolver.resolve('http://www.foo.com/baz', './bar'))
                    .toEqual('http://www.foo.com/bar');
            });
            testing_internal_1.it('should append to the base path', function () {
                testing_internal_1.expect(resolver.resolve('http://www.foo.com/baz/', 'bar'))
                    .toEqual('http://www.foo.com/baz/bar');
                testing_internal_1.expect(resolver.resolve('http://www.foo.com/baz/', './bar'))
                    .toEqual('http://www.foo.com/baz/bar');
            });
            testing_internal_1.it('should support ".." in the path', function () {
                testing_internal_1.expect(resolver.resolve('http://www.foo.com/baz/', '../bar'))
                    .toEqual('http://www.foo.com/bar');
                testing_internal_1.expect(resolver.resolve('http://www.foo.com/1/2/3/', '../../bar'))
                    .toEqual('http://www.foo.com/1/bar');
                testing_internal_1.expect(resolver.resolve('http://www.foo.com/1/2/3/', '../biz/bar'))
                    .toEqual('http://www.foo.com/1/2/biz/bar');
                testing_internal_1.expect(resolver.resolve('http://www.foo.com/1/2/baz', '../../bar'))
                    .toEqual('http://www.foo.com/bar');
            });
            testing_internal_1.it('should ignore the base path when the url has a scheme', function () {
                testing_internal_1.expect(resolver.resolve('http://www.foo.com', 'http://www.bar.com'))
                    .toEqual('http://www.bar.com');
            });
            testing_internal_1.it('should support absolute urls', function () {
                testing_internal_1.expect(resolver.resolve('http://www.foo.com', '/bar')).toEqual('http://www.foo.com/bar');
                testing_internal_1.expect(resolver.resolve('http://www.foo.com/', '/bar')).toEqual('http://www.foo.com/bar');
                testing_internal_1.expect(resolver.resolve('http://www.foo.com/baz', '/bar'))
                    .toEqual('http://www.foo.com/bar');
                testing_internal_1.expect(resolver.resolve('http://www.foo.com/baz/', '/bar'))
                    .toEqual('http://www.foo.com/bar');
            });
        });
        testing_internal_1.describe('relative base url', function () {
            testing_internal_1.it('should add a relative path to the base url', function () {
                testing_internal_1.expect(resolver.resolve('foo/', './bar')).toEqual('foo/bar');
                testing_internal_1.expect(resolver.resolve('foo/baz', './bar')).toEqual('foo/bar');
                testing_internal_1.expect(resolver.resolve('foo/baz', 'bar')).toEqual('foo/bar');
            });
            testing_internal_1.it('should support ".." in the path', function () {
                testing_internal_1.expect(resolver.resolve('foo/baz', '../bar')).toEqual('bar');
                testing_internal_1.expect(resolver.resolve('foo/baz', '../biz/bar')).toEqual('biz/bar');
            });
            testing_internal_1.it('should support absolute urls', function () {
                testing_internal_1.expect(resolver.resolve('foo/baz', '/bar')).toEqual('/bar');
                testing_internal_1.expect(resolver.resolve('foo/baz/', '/bar')).toEqual('/bar');
            });
            testing_internal_1.it('should not resolve urls against the baseUrl when the url contains a scheme', function () {
                resolver = new url_resolver_1.UrlResolver('my_packages_dir');
                testing_internal_1.expect(resolver.resolve('base/', 'package:file')).toEqual('my_packages_dir/file');
                testing_internal_1.expect(resolver.resolve('base/', 'http:super_file')).toEqual('http:super_file');
                testing_internal_1.expect(resolver.resolve('base/', './mega_file')).toEqual('base/mega_file');
            });
        });
        testing_internal_1.describe('packages', function () {
            testing_internal_1.it('should resolve a url based on the application package', function () {
                resolver = new url_resolver_1.UrlResolver('my_packages_dir');
                testing_internal_1.expect(resolver.resolve(null, 'package:some/dir/file.txt'))
                    .toEqual('my_packages_dir/some/dir/file.txt');
                testing_internal_1.expect(resolver.resolve(null, 'some/dir/file.txt')).toEqual('some/dir/file.txt');
            });
            testing_internal_1.it('should contain a default value of "/packages" when nothing is provided for DART', testing_internal_1.inject([url_resolver_1.UrlResolver], function (resolver) {
                if (lang_1.IS_DART) {
                    testing_internal_1.expect(resolver.resolve(null, 'package:file')).toEqual('/packages/file');
                }
            }));
            testing_internal_1.it('should contain a default value of "/" when nothing is provided for TS/ESM', testing_internal_1.inject([url_resolver_1.UrlResolver], function (resolver) {
                if (!lang_1.IS_DART) {
                    testing_internal_1.expect(resolver.resolve(null, 'package:file')).toEqual('/file');
                }
            }));
            testing_internal_1.it('should resolve a package value when present within the baseurl', function () {
                resolver = new url_resolver_1.UrlResolver('/my_special_dir');
                testing_internal_1.expect(resolver.resolve('package:some_dir/', 'matias.html'))
                    .toEqual('/my_special_dir/some_dir/matias.html');
            });
        });
        testing_internal_1.describe('asset urls', function () {
            var resolver;
            testing_internal_1.beforeEach(function () { resolver = url_resolver_1.createOfflineCompileUrlResolver(); });
            testing_internal_1.it('should resolve package: urls into asset: urls', function () {
                testing_internal_1.expect(resolver.resolve(null, 'package:somePkg/somePath'))
                    .toEqual('asset:somePkg/lib/somePath');
            });
        });
        testing_internal_1.describe('corner and error cases', function () {
            testing_internal_1.it('should encode URLs before resolving', function () {
                testing_internal_1.expect(resolver.resolve('foo/baz', "<p #p>Hello\n        </p>")).toEqual('foo/%3Cp%20#p%3EHello%0A%20%20%20%20%20%20%20%20%3C/p%3E');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXJsX3Jlc29sdmVyX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL2NvbXBpbGVyL3Rlc3QvdXJsX3Jlc29sdmVyX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILDZCQUEyRCxvQ0FBb0MsQ0FBQyxDQUFBO0FBQ2hHLGlDQUE0RSx3Q0FBd0MsQ0FBQyxDQUFBO0FBRXJILHFCQUFzQixvQkFBb0IsQ0FBQyxDQUFBO0FBRTNDO0lBQ0UsMkJBQVEsQ0FBQyxhQUFhLEVBQUU7UUFDdEIsSUFBSSxRQUFRLEdBQUcsSUFBSSwwQkFBVyxFQUFFLENBQUM7UUFFakMsMkJBQVEsQ0FBQyxtQkFBbUIsRUFBRTtZQUM1QixxQkFBRSxDQUFDLDRDQUE0QyxFQUFFO2dCQUMvQyx5QkFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztnQkFDeEYseUJBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7Z0JBQ3pGLHlCQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO2dCQUMxRix5QkFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLENBQUMsQ0FBQztZQUM3RixDQUFDLENBQUMsQ0FBQztZQUVILHFCQUFFLENBQUMsOEJBQThCLEVBQUU7Z0JBQ2pDLHlCQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyx3QkFBd0IsRUFBRSxLQUFLLENBQUMsQ0FB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