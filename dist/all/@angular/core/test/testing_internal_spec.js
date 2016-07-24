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
var testing_internal_1 = require('@angular/core/testing/testing_internal');
var collection_1 = require('../../platform-browser/src/facade/collection');
var TestObj = (function () {
    function TestObj(prop) {
        this.prop = prop;
    }
    TestObj.prototype.someFunc = function () { return -1; };
    TestObj.prototype.someComplexFunc = function (a) { return a; };
    return TestObj;
}());
var SpyTestObj = (function (_super) {
    __extends(SpyTestObj, _super);
    function SpyTestObj() {
        _super.call(this, TestObj);
    }
    return SpyTestObj;
}(testing_internal_1.SpyObject));
function main() {
    describe('testing', function () {
        describe('equality', function () {
            it('should structurally compare objects', function () {
                var expected = new TestObj(new TestObj({ 'one': [1, 2] }));
                var actual = new TestObj(new TestObj({ 'one': [1, 2] }));
                var falseActual = new TestObj(new TestObj({ 'one': [1, 3] }));
                expect(actual).toEqual(expected);
                expect(falseActual).not.toEqual(expected);
            });
        });
        describe('toEqual for Maps', function () {
            it('should detect equality for same reference', function () {
                var m1 = collection_1.MapWrapper.createFromStringMap({ 'a': 1 });
                expect(m1).toEqual(m1);
            });
            it('should detect equality for same content', function () {
                expect(collection_1.MapWrapper.createFromStringMap({ 'a': 1 })).toEqual(collection_1.MapWrapper.createFromStringMap({
                    'a': 1
                }));
            });
            it('should detect missing entries', function () {
                expect(collection_1.MapWrapper.createFromStringMap({
                    'a': 1
                })).not.toEqual(collection_1.MapWrapper.createFromStringMap({}));
            });
            it('should detect different values', function () {
                expect(collection_1.MapWrapper.createFromStringMap({
                    'a': 1
                })).not.toEqual(collection_1.MapWrapper.createFromStringMap({ 'a': 2 }));
            });
            it('should detect additional entries', function () {
                expect(collection_1.MapWrapper.createFromStringMap({
                    'a': 1
                })).not.toEqual(collection_1.MapWrapper.createFromStringMap({ 'a': 1, 'b': 1 }));
            });
        });
        describe('spy objects', function () {
            var spyObj;
            beforeEach(function () { spyObj = new SpyTestObj(); });
            it('should return a new spy func with no calls', function () { expect(spyObj.spy('someFunc')).not.toHaveBeenCalled(); });
            it('should record function calls', function () {
                spyObj.spy('someFunc').andCallFake(function (a, b) { return a + b; });
                expect(spyObj.someFunc(1, 2)).toEqual(3);
                expect(spyObj.spy('someFunc')).toHaveBeenCalledWith(1, 2);
            });
            it('should match multiple function calls', function () {
                spyObj.someFunc(1, 2);
                spyObj.someFunc(3, 4);
                expect(spyObj.spy('someFunc')).toHaveBeenCalledWith(1, 2);
                expect(spyObj.spy('someFunc')).toHaveBeenCalledWith(3, 4);
            });
            it('should match null arguments', function () {
                spyObj.someFunc(null, 'hello');
                expect(spyObj.spy('someFunc')).toHaveBeenCalledWith(null, 'hello');
            });
            it('should match using deep equality', function () {
                spyObj.someComplexFunc([1]);
                expect(spyObj.spy('someComplexFunc')).toHaveBeenCalledWith([1]);
            });
            it('should support stubs', function () {
                var s = testing_internal_1.SpyObject.stub({ 'a': 1 }, { 'b': 2 });
                expect(s.a()).toEqual(1);
                expect(s.b()).toEqual(2);
            });
            it('should create spys for all methods', function () { expect(function () { return spyObj.someFunc(); }).not.toThrow(); });
            it('should create a default spy that does not fail for numbers', function () {
                // Previously needed for rtts_assert. Revisit this behavior.
                expect(spyObj.someFunc()).toBe(null);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdGluZ19pbnRlcm5hbF9zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vbW9kdWxlcy9AYW5ndWxhci9jb3JlL3Rlc3QvdGVzdGluZ19pbnRlcm5hbF9zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7OztBQUVILGlDQUF3Qix3Q0FBd0MsQ0FBQyxDQUFBO0FBRWpFLDJCQUF5Qiw4Q0FBOEMsQ0FBQyxDQUFBO0FBRXhFO0lBRUUsaUJBQVksSUFBUztRQUFJLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQUMsQ0FBQztJQUM1QywwQkFBUSxHQUFSLGNBQXFCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsaUNBQWUsR0FBZixVQUFnQixDQUFNLElBQUksTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdkMsY0FBQztBQUFELENBQUMsQUFMRCxJQUtDO0FBRUQ7SUFBeUIsOEJBQVM7SUFDaEM7UUFBZ0Isa0JBQU0sT0FBTyxDQUFDLENBQUM7SUFBQyxDQUFDO0lBQ25DLGlCQUFDO0FBQUQsQ0FBQyxBQUZELENBQXlCLDRCQUFTLEdBRWpDO0FBRUQ7SUFDRSxRQUFRLENBQUMsU0FBUyxFQUFFO1FBQ2xCLFFBQVEsQ0FBQyxVQUFVLEVBQUU7WUFDbkIsRUFBRSxDQUFDLHFDQUFxQyxFQUFFO2dCQUN4QyxJQUFJLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztnQkFDekQsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxPQUFPLENBQUMsRUFBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZELElBQUksV0FBVyxHQUFH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