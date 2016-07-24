/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
"use strict";
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var render_store_1 = require('@angular/platform-browser/src/web_workers/shared/render_store');
function main() {
    testing_internal_1.describe('RenderStoreSpec', function () {
        var store;
        testing_internal_1.beforeEach(function () { store = new render_store_1.RenderStore(); });
        testing_internal_1.it('should allocate ids', function () {
            testing_internal_1.expect(store.allocateId()).toBe(0);
            testing_internal_1.expect(store.allocateId()).toBe(1);
        });
        testing_internal_1.it('should serialize objects', function () {
            var id = store.allocateId();
            var obj = 'testObject';
            store.store(obj, id);
            testing_internal_1.expect(store.serialize(obj)).toBe(id);
        });
        testing_internal_1.it('should deserialize objects', function () {
            var id = store.allocateId();
            var obj = 'testObject';
            store.store(obj, id);
            testing_internal_1.expect(store.deserialize(id)).toBe(obj);
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyX3N0b3JlX3NwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9tb2R1bGVzL0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXIvdGVzdC93ZWJfd29ya2Vycy9zaGFyZWQvcmVuZGVyX3N0b3JlX3NwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOztBQUVILGlDQUFrRSx3Q0FBd0MsQ0FBQyxDQUFBO0FBQzNHLDZCQUEwQiwrREFBK0QsQ0FBQyxDQUFBO0FBRTFGO0lBQ0UsMkJBQVEsQ0FBQyxpQkFBaUIsRUFBRTtRQUMxQixJQUFJLEtBQWtCLENBQUM7UUFDdkIsNkJBQVUsQ0FBQyxjQUFRLEtBQUssR0FBRyxJQUFJLDBCQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRWpELHFCQUFFLENBQUMscUJBQXFCLEVBQUU7WUFDeEIseUJBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMseUJBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDckMsQ0FBQyxDQUFDLENBQUM7UUFFSCxxQkFBRSxDQUFDLDBCQUEwQixFQUFFO1lBQzdCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUM1QixJQUFJLEdBQUcsR0FBRyxZQUFZLENBQUM7WUFDdkIsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDckIseUJBQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBRUgscUJBQUUsQ0FBQyw0QkFBNEIsRUFBRTtZQUMvQixJQUFJLEVBQUUsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDNUIsSUFBSSxHQUFHLEdBQUcsWUFBWSxDQUFDO1lBQ3ZCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3JCLHlCQUFNLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQXpCZSxZQUFJLE9BeUJuQixDQUFBIn0=