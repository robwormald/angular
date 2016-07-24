/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var core_1 = require('@angular/core');
var iterable_differs_1 = require('@angular/core/src/change_detection/differs/iterable_differs');
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var spies_1 = require('../../spies');
function main() {
    testing_internal_1.describe('IterableDiffers', function () {
        var factory1;
        var factory2;
        var factory3;
        testing_internal_1.beforeEach(function () {
            factory1 = new spies_1.SpyIterableDifferFactory();
            factory2 = new spies_1.SpyIterableDifferFactory();
            factory3 = new spies_1.SpyIterableDifferFactory();
        });
        testing_internal_1.it('should throw when no suitable implementation found', function () {
            var differs = new iterable_differs_1.IterableDiffers([]);
            testing_internal_1.expect(function () { return differs.find('some object'); })
                .toThrowError(/Cannot find a differ supporting object 'some object'/);
        });
        testing_internal_1.it('should return the first suitable implementation', function () {
            factory1.spy('supports').andReturn(false);
            factory2.spy('supports').andReturn(true);
            factory3.spy('supports').andReturn(true);
            var differs = iterable_differs_1.IterableDiffers.create([factory1, factory2, factory3]);
            testing_internal_1.expect(differs.find('some object')).toBe(factory2);
        });
        testing_internal_1.it('should copy over differs from the parent repo', function () {
            factory1.spy('supports').andReturn(true);
            factory2.spy('supports').andReturn(false);
            var parent = iterable_differs_1.IterableDiffers.create([factory1]);
            var child = iterable_differs_1.IterableDiffers.create([factory2], parent);
            testing_internal_1.expect(child.factories).toEqual([factory2, factory1]);
        });
        testing_internal_1.describe('.extend()', function () {
            testing_internal_1.it('should throw if calling extend when creating root injector', function () {
                var injector = core_1.ReflectiveInjector.resolveAndCreate([iterable_differs_1.IterableDiffers.extend([])]);
                testing_internal_1.expect(function () { return injector.get(iterable_differs_1.IterableDiffers); })
                    .toThrowError(/Cannot extend IterableDiffers without a parent injector/);
            });
            testing_internal_1.it('should extend di-inherited diffesr', function () {
                var parent = new iterable_differs_1.IterableDiffers([factory1]);
                var injector = core_1.ReflectiveInjector.resolveAndCreate([{ provide: iterable_differs_1.IterableDiffers, useValue: parent }]);
                var childInjector = injector.resolveAndCreateChild([iterable_differs_1.IterableDiffers.extend([factory2])]);
                testing_internal_1.expect(injector.get(iterable_differs_1.IterableDiffers).factories).toEqual([factory1]);
                testing_internal_1.expect(childInjector.get(iterable_differs_1.IterableDiffers).factories).toEqual([factory2, factory1]);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlcmFibGVfZGlmZmVyc19zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvY2hhbmdlX2RldGVjdGlvbi9kaWZmZXJzL2l0ZXJhYmxlX2RpZmZlcnNfc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7O0FBRUgscUJBQW9ELGVBQWUsQ0FBQyxDQUFBO0FBQ3BFLGlDQUE4Qiw2REFBNkQsQ0FBQyxDQUFBO0FBQzVGLGlDQUErRSx3Q0FBd0MsQ0FBQyxDQUFBO0FBRXhILHNCQUF1QyxhQUFhLENBQUMsQ0FBQTtBQUVyRDtJQUNFLDJCQUFRLENBQUMsaUJBQWlCLEVBQUU7UUFDMUIsSUFBSSxRQUFhLENBQW1CO1FBQ3BDLElBQUksUUFBYSxDQUFtQjtRQUNwQyxJQUFJLFFBQWEsQ0FBbUI7UUFFcEMsNkJBQVUsQ0FBQztZQUNULFFBQVEsR0FBRyxJQUFJLGdDQUF3QixFQUFFLENBQUM7WUFDMUMsUUFBUSxHQUFHLElBQUksZ0NBQXdCLEVBQUUsQ0FBQztZQUMxQyxRQUFRLEdBQUcsSUFBSSxnQ0FBd0IsRUFBRSxDQUFDO1FBQzVDLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyxvREFBb0QsRUFBRTtZQUN2RCxJQUFJLE9BQU8sR0FBRyxJQUFJLGtDQUFlLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDdEMseUJBQU0sQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBM0IsQ0FBMkIsQ0FBQztpQkFDcEMsWUFBWSxDQUFDLHNEQUFzRCxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLGlEQUFpRCxFQUFFO1lBQ3BELFFBQVEsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLFFBQVEsQ0FBQyxH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