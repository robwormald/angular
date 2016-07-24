/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var matchers_1 = require('@angular/platform-browser/testing/matchers');
var testing_1 = require('@angular/core/testing');
var browser_util_1 = require('@angular/platform-browser/testing/browser_util');
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
function main() {
    testing_internal_1.describe('SlicePipe', function () {
        var list;
        var str;
        var pipe;
        testing_internal_1.beforeEach(function () {
            list = [1, 2, 3, 4, 5];
            str = 'tuvwxyz';
            pipe = new common_1.SlicePipe();
        });
        testing_internal_1.describe('supports', function () {
            testing_internal_1.it('should support strings', function () { matchers_1.expect(function () { return pipe.transform(str, 0); }).not.toThrow(); });
            testing_internal_1.it('should support lists', function () { matchers_1.expect(function () { return pipe.transform(list, 0); }).not.toThrow(); });
            testing_internal_1.it('should not support other objects', function () { matchers_1.expect(function () { return pipe.transform({}, 0); }).toThrow(); });
        });
        testing_internal_1.describe('transform', function () {
            testing_internal_1.it('should return null if the value is null', function () { matchers_1.expect(pipe.transform(null, 1)).toBe(null); });
            testing_internal_1.it('should return all items after START index when START is positive and END is omitted', function () {
                matchers_1.expect(pipe.transform(list, 3)).toEqual([4, 5]);
                matchers_1.expect(pipe.transform(str, 3)).toEqual('wxyz');
            });
            testing_internal_1.it('should return last START items when START is negative and END is omitted', function () {
                matchers_1.expect(pipe.transform(list, -3)).toEqual([3, 4, 5]);
                matchers_1.expect(pipe.transform(str, -3)).toEqual('xyz');
            });
            testing_internal_1.it('should return all items between START and END index when START and END are positive', function () {
                matchers_1.expect(pipe.transform(list, 1, 3)).toEqual([2, 3]);
                matchers_1.expect(pipe.transform(str, 1, 3)).toEqual('uv');
            });
            testing_internal_1.it('should return all items between START and END from the end when START and END are negative', function () {
                matchers_1.expect(pipe.transform(list, -4, -2)).toEqual([2, 3]);
                matchers_1.expect(pipe.transform(str, -4, -2)).toEqual('wx');
            });
            testing_internal_1.it('should return an empty value if START is greater than END', function () {
                matchers_1.expect(pipe.transform(list, 4, 2)).toEqual([]);
                matchers_1.expect(pipe.transform(str, 4, 2)).toEqual('');
            });
            testing_internal_1.it('should return an empty value if START greater than input length', function () {
                matchers_1.expect(pipe.transform(list, 99)).toEqual([]);
                matchers_1.expect(pipe.transform(str, 99)).toEqual('');
            });
            // Makes Edge to disconnect when running the full unit test campaign
            // TODO: remove when issue is solved: https://github.com/angular/angular/issues/4756
            if (!browser_util_1.browserDetection.isEdge) {
                testing_internal_1.it('should return entire input if START is negative and greater than input length', function () {
                    matchers_1.expect(pipe.transform(list, -99)).toEqual([1, 2, 3, 4, 5]);
                    matchers_1.expect(pipe.transform(str, -99)).toEqual('tuvwxyz');
                });
                testing_internal_1.it('should not modify the input list', function () {
                    matchers_1.expect(pipe.transform(list, 2)).toEqual([3, 4, 5]);
                    matchers_1.expect(list).toEqual([1, 2, 3, 4, 5]);
                });
            }
        });
        testing_internal_1.describe('integration', function () {
            testing_internal_1.it('should work with mutable arrays', testing_internal_1.inject([testing_1.TestComponentBuilder, testing_internal_1.AsyncTestCompleter], function (tcb, async) {
                tcb.createAsync(TestComp).then(function (fixture) {
                    var mutable = [1, 2];
                    fixture.debugElement.componentInstance.data = mutable;
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('2');
                    mutable.push(3);
                    fixture.detectChanges();
                    matchers_1.expect(fixture.debugElement.nativeElement).toHaveText('2,3');
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
var TestComp = (function () {
    function TestComp() {
    }
    /** @nocollapse */
    TestComp.decorators = [
        { type: core_1.Component, args: [{ selector: 'test-comp', template: '{{(data | slice:1).join(",") }}', pipes: [common_1.SlicePipe] },] },
    ];
    return TestComp;
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpY2VfcGlwZV9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb21tb24vdGVzdC9waXBlcy9zbGljZV9waXBlX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUFvRyx3Q0FBd0MsQ0FBQyxDQUFBO0FBQzdJLHlCQUFxQiw0Q0FBNEMsQ0FBQyxDQUFBO0FBQ2xFLHdCQUFtQyx1QkFBdUIsQ0FBQyxDQUFBO0FBQzNELDZCQUErQixnREFBZ0QsQ0FBQyxDQUFBO0FBRWhGLHFCQUF3QixlQUFlLENBQUMsQ0FBQTtBQUN4Qyx1QkFBd0IsaUJBQWlCLENBQUMsQ0FBQTtBQUUxQztJQUNFLDJCQUFRLENBQUMsV0FBVyxFQUFFO1FBQ3BCLElBQUksSUFBYyxDQUFDO1FBQ25CLElBQUksR0FBVyxDQUFDO1FBQ2hCLElBQUksSUFBZSxDQUFDO1FBRXBCLDZCQUFVLENBQUM7WUFDVCxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkIsR0FBRyxHQUFHLFNBQVMsQ0FBQztZQUNoQixJQUFJLEdBQUcsSUFBSSxrQkFBUyxFQUFFLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFFSCwyQkFBUSxDQUFDLFVBQVUsRUFBRTtZQUNuQixxQkFBRSxDQUFDLHdCQUF3QixFQUFFLGNBQVEsaUJBQU0sQ0FBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQXRCLENBQXNCLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RixxQkFBRSxDQUFDLHNCQUFzQixFQUFFLGNBQVEsaUJBQU0sQ0FBQyxjQUFNLE9BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVB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